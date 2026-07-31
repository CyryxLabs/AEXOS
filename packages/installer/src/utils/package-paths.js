'use strict';

const fs = require('node:fs');
const path = require('node:path');

/**
 * The package is named for the company that owns it and the product it is —
 * `@cyryxlabs/aexos`. That also makes `npx github:CyryxLabs/AEXOS <command>`
 * resolve, because npm infers the binary from the unscoped name and `aexos` is
 * a real bin; the previous name inferred `core`, which is not.
 *
 * Every earlier name stays recognised. A project installed under an older name
 * still has that name in its own node_modules, and refusing to see it would
 * break the very upgrade path that renames it.
 */
const CORE_PACKAGE_NAME = '@cyryxlabs/aexos';
const LEGACY_CORE_PACKAGE_NAMES = ['@aexos-squads/core', 'aexos-core', '@cyryx/aexos-core'];
const CORE_PACKAGE_NAMES = new Set([CORE_PACKAGE_NAME, ...LEGACY_CORE_PACKAGE_NAMES]);

function isCorePackageRoot(candidate) {
  if (!candidate) return false;

  try {
    const packageJsonPath = path.join(candidate, 'package.json');
    const cyryxCorePath = path.join(candidate, '.aexos-core');

    if (!fs.existsSync(packageJsonPath) || !fs.existsSync(cyryxCorePath)) {
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return CORE_PACKAGE_NAMES.has(packageJson.name);
  } catch {
    return false;
  }
}

function resolvePackageJsonRoot(packageName) {
  try {
    return path.dirname(require.resolve(`${packageName}/package.json`));
  } catch {
    return null;
  }
}

function getLocalRepoRoot() {
  return path.resolve(__dirname, '..', '..', '..', '..');
}

function getCyryxCorePackageRoot() {
  const candidates = [
    process.env.AEXOS_CORE_PACKAGE_ROOT,
    getLocalRepoRoot(),
    // Every name the package has shipped under, current first. A project
    // installed before the rename resolves through its own recorded name.
    ...[CORE_PACKAGE_NAME, ...LEGACY_CORE_PACKAGE_NAMES].map(resolvePackageJsonRoot),
  ];

  const packageRoot = candidates.find(isCorePackageRoot);
  if (!packageRoot) {
    throw new Error(
      `AEXOS core package root not found. Install ${CORE_PACKAGE_NAME} or set ` +
        'AEXOS_CORE_PACKAGE_ROOT.',
    );
  }

  return packageRoot;
}

function resolveCyryxCorePath(...segments) {
  return path.join(getCyryxCorePackageRoot(), ...segments);
}

function requireCyryxCoreModule(...segments) {
  return require(resolveCyryxCorePath(...segments));
}

function getCyryxCoreVersion() {
  const packageJson = require(resolveCyryxCorePath('package.json'));
  return packageJson.version;
}

module.exports = {
  getCyryxCorePackageRoot,
  resolveCyryxCorePath,
  requireCyryxCoreModule,
  getCyryxCoreVersion,
  // Exported so the other resolvers agree on one list instead of each carrying
  // its own copy, which is how a rename leaves half the code behind.
  CORE_PACKAGE_NAME,
  LEGACY_CORE_PACKAGE_NAMES,
  CORE_PACKAGE_NAMES,
};
