/**
 * Regression tests for installProArtifactIntoTarget npm hijack scenarios.
 *
 * Background:
 *   `aexos install` (Pro flow) downloads an `@aexos/pro` tarball and runs
 *   `npm install <tgz>` inside the user's chosen target directory. Without
 *   `--prefix` and `--workspaces=false`, npm 10+/11 walks up the directory tree
 *   looking for the first ancestor with a package.json — when it finds one, it
 *   installs node_modules there instead of in the target. The post-install
 *   integrity check (`node_modules/@aexos/pro/package.json` exists at
 *   targetDir) then fails with the user-facing error
 *
 *     Pro activation failed: Installed Pro artifact did not create
 *     node_modules/@aexos/pro.
 *
 *   even though npm exited 0 and a copy of @aexos/pro now lives one
 *   directory up.
 *
 * These tests reproduce the four real-world install topologies students hit
 * in cohorts and assert the fix prevents npm from escaping the target dir.
 *
 * Tests build a minimal `@aexos/pro` tarball at runtime (via npm pack)
 * so the fixture is self-contained and does not require the private Pro
 * artifact bucket.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const proSetup = require('../../packages/installer/src/wizard/pro-setup');

const NPM_INSTALL_TIMEOUT_MS = 60 * 1000;

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function removeDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    // best effort
  }
}

function writePackageJson(dir, body) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(body, null, 2));
}

/**
 * Build a minimal `@aexos/pro` tarball at runtime. Smaller than the
 * private artifact and adequate to exercise the npm install codepath. Cached
 * across tests in the suite via module-level memoization.
 */
let cachedFixtureTarball = null;
let cachedFixtureBuildDir = null;
function buildFixtureTarball() {
  if (cachedFixtureTarball) {
    return cachedFixtureTarball;
  }

  const buildDir = makeTempDir('aexos-pro-fixture-');
  cachedFixtureBuildDir = buildDir;

  const pkg = {
    name: '@aexos/pro',
    version: '0.0.0-test-fixture',
    description: 'Minimal @aexos/pro fixture for installer regression tests',
    private: false,
    files: ['squads/index.js', 'license/license-cache.js'],
  };
  writePackageJson(buildDir, pkg);
  fs.mkdirSync(path.join(buildDir, 'squads'), { recursive: true });
  fs.writeFileSync(
    path.join(buildDir, 'squads', 'index.js'),
    'module.exports = { fixture: true };\n',
  );
  fs.mkdirSync(path.join(buildDir, 'license'), { recursive: true });
  fs.writeFileSync(
    path.join(buildDir, 'license', 'license-cache.js'),
    'module.exports = { writeLicenseCache: () => ({ success: true }) };\n',
  );

  const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const packOutput = execFileSync(npmBin, ['pack', '--json'], {
    cwd: buildDir,
    timeout: NPM_INSTALL_TIMEOUT_MS,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  const packed = JSON.parse(packOutput)[0];
  cachedFixtureTarball = path.join(buildDir, packed.filename);
  return cachedFixtureTarball;
}

afterAll(() => {
  if (cachedFixtureBuildDir) {
    removeDir(cachedFixtureBuildDir);
    cachedFixtureBuildDir = null;
    cachedFixtureTarball = null;
  }
});

describe('installProArtifactIntoTarget — npm hijack regression (Story PRO-13.6 hotfix)', () => {
  let artifactPath;

  beforeAll(() => {
    artifactPath = buildFixtureTarball();
  }, NPM_INSTALL_TIMEOUT_MS);

  test('installs into targetDir when no ancestor has package.json', async () => {
    const root = makeTempDir('aexos-pro-target-empty-');
    try {
      const proSourceDir = await proSetup._testing.installProArtifactIntoTarget(
        artifactPath,
        root,
      );

      expect(proSourceDir).toBe(path.join(root, 'node_modules', '@aexos', 'pro'));
      expect(fs.existsSync(path.join(proSourceDir, 'package.json'))).toBe(true);
    } finally {
      removeDir(root);
    }
  }, NPM_INSTALL_TIMEOUT_MS);

  test('installs into targetDir when an ancestor declares workspaces (the cohort bug)', async () => {
    const wsRoot = makeTempDir('aexos-pro-target-ws-');
    const target = path.join(wsRoot, 'projects', 'aexos-install');
    fs.mkdirSync(target, { recursive: true });

    writePackageJson(wsRoot, {
      name: 'cohort-workspace-root',
      private: true,
      workspaces: ['projects/*'],
    });

    try {
      const proSourceDir = await proSetup._testing.installProArtifactIntoTarget(
        artifactPath,
        target,
      );

      expect(proSourceDir).toBe(path.join(target, 'node_modules', '@aexos', 'pro'));
      expect(fs.existsSync(path.join(proSourceDir, 'package.json'))).toBe(true);
      expect(
        fs.existsSync(path.join(wsRoot, 'node_modules', '@aexos', 'pro', 'package.json')),
      ).toBe(false);
    } finally {
      removeDir(wsRoot);
    }
  }, NPM_INSTALL_TIMEOUT_MS);

  test('installs into targetDir when an ancestor has a plain package.json (no workspaces)', async () => {
    const parentRoot = makeTempDir('aexos-pro-target-parent-');
    const target = path.join(parentRoot, 'subdir');
    fs.mkdirSync(target, { recursive: true });

    writePackageJson(parentRoot, {
      name: 'unrelated-parent-project',
      version: '1.0.0',
      dependencies: { 'left-pad': '^1.0.0' },
    });

    try {
      const proSourceDir = await proSetup._testing.installProArtifactIntoTarget(
        artifactPath,
        target,
      );

      expect(proSourceDir).toBe(path.join(target, 'node_modules', '@aexos', 'pro'));
      expect(fs.existsSync(path.join(proSourceDir, 'package.json'))).toBe(true);
      expect(
        fs.existsSync(path.join(parentRoot, 'node_modules', '@aexos', 'pro', 'package.json')),
      ).toBe(false);
    } finally {
      removeDir(parentRoot);
    }
  }, NPM_INSTALL_TIMEOUT_MS);

  test('installs into targetDir when targetDir itself has a package.json', async () => {
    const target = makeTempDir('aexos-pro-target-local-');
    writePackageJson(target, { name: 'students-existing-project', version: '1.0.0' });

    try {
      const proSourceDir = await proSetup._testing.installProArtifactIntoTarget(
        artifactPath,
        target,
      );

      expect(proSourceDir).toBe(path.join(target, 'node_modules', '@aexos', 'pro'));
      expect(fs.existsSync(path.join(proSourceDir, 'package.json'))).toBe(true);

      const pkg = JSON.parse(fs.readFileSync(path.join(target, 'package.json'), 'utf8'));
      expect(pkg.name).toBe('students-existing-project');
    } finally {
      removeDir(target);
    }
  }, NPM_INSTALL_TIMEOUT_MS);

  test('does not leave the synthetic anchor package.json behind when targetDir starts empty', async () => {
    const target = makeTempDir('aexos-pro-target-cleanup-');

    try {
      await proSetup._testing.installProArtifactIntoTarget(artifactPath, target);
      expect(fs.existsSync(path.join(target, 'package.json'))).toBe(false);
    } finally {
      removeDir(target);
    }
  }, NPM_INSTALL_TIMEOUT_MS);
});

describe('findAncestorNodeModulesPro — diagnostic helper', () => {
  test('returns the ancestor directory when an upstream node_modules holds @aexos/pro', async () => {
    const root = makeTempDir('aexos-pro-ancestor-');
    const proDir = path.join(root, 'node_modules', '@aexos', 'pro');
    fs.mkdirSync(proDir, { recursive: true });
    fs.writeFileSync(path.join(proDir, 'package.json'), '{"name":"@aexos/pro"}');

    const target = path.join(root, 'projects', 'leaf');
    fs.mkdirSync(target, { recursive: true });

    try {
      const hit = await proSetup._testing.findAncestorNodeModulesPro(target);
      expect(hit).toBe(proDir);
    } finally {
      removeDir(root);
    }
  });

  test('returns null when no ancestor has @aexos/pro installed', async () => {
    const root = makeTempDir('aexos-pro-no-ancestor-');
    try {
      const hit = await proSetup._testing.findAncestorNodeModulesPro(root);
      expect(hit).toBeNull();
    } finally {
      removeDir(root);
    }
  });
});

describe('acquireProArtifactSourceDir — graceful fallback when target install rejects', () => {
  let originalInstall;
  let artifactPath;

  beforeAll(() => {
    artifactPath = buildFixtureTarball();
  }, NPM_INSTALL_TIMEOUT_MS);

  beforeEach(() => {
    originalInstall = proSetup._testing.installProArtifactIntoTarget;
  });

  afterEach(() => {
    proSetup._testing.installProArtifactIntoTarget = originalInstall;
  });

  test('falls back to the verified temp source and surfaces a warning', async () => {
    const target = makeTempDir('aexos-pro-acq-target-');
    const hijackError = new Error(
      'Installed Pro artifact did not create /fake/path. npm appears to have installed it at /elsewhere instead.',
    );
    hijackError.code = 'PRO_INSTALL_TARGET_HIJACKED';

    proSetup._testing.installProArtifactIntoTarget = jest
      .fn()
      .mockRejectedValue(hijackError);

    const tarballBuffer = require('fs').readFileSync(artifactPath);
    const tarballSha256 = require('crypto')
      .createHash('sha256')
      .update(tarballBuffer)
      .digest('hex');

    const originalGetUrl = proSetup._testing.InlineLicenseClient.prototype.getProArtifactUrl;
    proSetup._testing.InlineLicenseClient.prototype.getProArtifactUrl = jest
      .fn()
      .mockResolvedValue({
        package: '@aexos/pro',
        version: proSetup._testing.DEFAULT_PRO_ARTIFACT_VERSION,
        artifactUrl: 'https://aexos-fixture.test.invalid/pro.tgz',
        sha256: tarballSha256,
        sizeBytes: tarballBuffer.length,
        expiresAt: new Date(Date.now() + 60000).toISOString(),
      });

    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () =>
        tarballBuffer.buffer.slice(
          tarballBuffer.byteOffset,
          tarballBuffer.byteOffset + tarballBuffer.byteLength,
        ),
    });

    try {
      const result = await proSetup._testing.acquireProArtifactSourceDir(
        target,
        { accessToken: 'fake-access-token', cyryxCoreVersion: '5.2.5', machineId: 'a'.repeat(64) },
        { proArtifactVersion: proSetup._testing.DEFAULT_PRO_ARTIFACT_VERSION },
      );

      expect(result.success).toBe(true);
      expect(result.installedProSourceDir).toBeNull();
      expect(result.proSourceDir).toBeTruthy();
      expect(result.proSourceDir).toContain('node_modules');
      expect(result.proSourceDir).toContain('@aexos');
      expect(result.targetInstallWarning).toBeTruthy();
      expect(result.targetInstallWarning).toContain('did not create');

      const fs = require('fs');
      const path = require('path');
      expect(fs.existsSync(path.join(result.proSourceDir, 'package.json'))).toBe(true);
    } finally {
      proSetup._testing.InlineLicenseClient.prototype.getProArtifactUrl = originalGetUrl;
      global.fetch = originalFetch;
      removeDir(target);
    }
  }, NPM_INSTALL_TIMEOUT_MS);
});
