/**
 * GreetingPreferenceManager — durable config writes
 *
 * Defect: `_saveConfig` replaced core-config.yaml with a bare
 * `fs.writeFileSync`. A plain writeFileSync opens the target with O_TRUNC, so
 * between the truncate and the completed write the file is empty on disk. Any
 * interruption in that window — a killed process, a concurrent agent
 * activation snapshotting the file into `core-config.yaml.backup` and then
 * restoring it — leaves the config permanently mangled. That is how the file
 * was once reduced to six lines of garbage.
 *
 * Unlike the sibling suite, this one runs against a REAL filesystem in a temp
 * directory. `fs` is not mocked, because the property under test (there is no
 * moment at which core-config.yaml is empty) is only observable on real files.
 *
 * @author @dev (Vulcan)
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const lockfile = require('proper-lockfile');

const ORIGINAL_CONFIG = [
  'agentIdentity:',
  '  greeting:',
  '    preference: auto',
  '    contextDetection: true',
  'markdownExploder: true',
  'slashPrefix: AEXOS',
  '',
].join('\n');

/**
 * Create a temp project, chdir into it, and load a fresh manager module.
 * CONFIG_PATH is captured from process.cwd() at require time, so the module
 * must be re-required after the chdir.
 */
function setupProject() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'greeting-pref-'));
  const coreDir = path.join(root, '.aexos-core');
  fs.mkdirSync(coreDir, { recursive: true });

  const configPath = path.join(coreDir, 'core-config.yaml');
  const lockPath = path.join(coreDir, 'core-config.yaml.lock');
  fs.writeFileSync(configPath, ORIGINAL_CONFIG, 'utf8');

  const previousCwd = process.cwd();
  process.chdir(root);

  let Manager;
  jest.isolateModules(() => {
    Manager = require('../../.aexos-core/development/scripts/greeting-preference-manager');
  });

  return {
    root,
    configPath,
    lockPath,
    manager: new Manager(),
    cleanup() {
      process.chdir(previousCwd);
      fs.rmSync(root, { recursive: true, force: true });
    },
  };
}

describe('GreetingPreferenceManager — durable config writes', () => {
  let project;

  beforeEach(() => {
    project = setupProject();
  });

  afterEach(() => {
    project.cleanup();
    jest.restoreAllMocks();
  });

  it('persists the new preference and leaves the rest of the config intact', () => {
    const result = project.manager.setPreference('archetypal');

    expect(result).toEqual({ success: true, preference: 'archetypal' });

    const written = yaml.load(fs.readFileSync(project.configPath, 'utf8'));
    expect(written.agentIdentity.greeting.preference).toBe('archetypal');
    expect(written.agentIdentity.greeting.contextDetection).toBe(true);
    expect(written.markdownExploder).toBe(true);
    expect(written.slashPrefix).toBe('AEXOS');
  });

  it('never leaves core-config.yaml empty while the write is in progress', () => {
    const realWriteFileSync = fs.writeFileSync.bind(fs);
    const observed = [];

    // Emulate the two phases a real writeFileSync performs on its target:
    // truncate, then write the payload. Between the two we snapshot whatever
    // is on disk at CONFIG_PATH.
    jest.spyOn(fs, 'writeFileSync').mockImplementation((target, data, encoding) => {
      realWriteFileSync(target, '', encoding);
      observed.push(fs.readFileSync(project.configPath, 'utf8'));
      realWriteFileSync(target, data, encoding);
    });

    project.manager.setPreference('minimal');

    expect(observed.length).toBeGreaterThan(0);

    // Fails against the old implementation: it wrote straight to CONFIG_PATH,
    // so the snapshot taken mid-write was the empty string — exactly the
    // window in which a crash or a concurrent backup corrupts the file.
    for (const snapshot of observed) {
      expect(snapshot).not.toBe('');
      expect(yaml.load(snapshot)).toBeTruthy();
    }
  });

  it('writes to a temporary file and swaps it in with a rename', () => {
    const writeTargets = [];
    const renameTargets = [];

    const realWriteFileSync = fs.writeFileSync.bind(fs);
    const realRenameSync = fs.renameSync.bind(fs);

    jest.spyOn(fs, 'writeFileSync').mockImplementation((target, data, encoding) => {
      writeTargets.push(target);
      return realWriteFileSync(target, data, encoding);
    });
    jest.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      renameTargets.push(to);
      return realRenameSync(from, to);
    });

    project.manager.setPreference('named');

    // Old implementation: writeTargets === [CONFIG_PATH] and renameTargets === [].
    expect(writeTargets).not.toContain(project.configPath);
    expect(renameTargets).toContain(project.configPath);

    // And no temporary file is left behind.
    const strays = fs
      .readdirSync(path.dirname(project.configPath))
      .filter((entry) => entry.includes('.tmp.'));
    expect(strays).toEqual([]);
  });

  it('holds an advisory lock across the read-modify-write and releases it', () => {
    const heldDuringWrite = [];
    const realWriteFileSync = fs.writeFileSync.bind(fs);

    jest.spyOn(fs, 'writeFileSync').mockImplementation((target, data, encoding) => {
      heldDuringWrite.push(
        lockfile.checkSync(project.configPath, {
          lockfilePath: project.lockPath,
          realpath: false,
        }),
      );
      return realWriteFileSync(target, data, encoding);
    });

    project.manager.setPreference('minimal');

    // Old implementation: no lock was ever taken, so this was [false].
    expect(heldDuringWrite).toContain(true);

    // Released afterwards, so the next writer is not blocked.
    expect(
      lockfile.checkSync(project.configPath, {
        lockfilePath: project.lockPath,
        realpath: false,
      }),
    ).toBe(false);
  });

  it('releases the lock even when the write fails', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('disk on fire');
    });

    expect(() => project.manager.setPreference('minimal')).toThrow(/Failed to set preference/);

    expect(
      lockfile.checkSync(project.configPath, {
        lockfilePath: project.lockPath,
        realpath: false,
      }),
    ).toBe(false);

    // The original config survived the failed write.
    const survivor = yaml.load(fs.readFileSync(project.configPath, 'utf8'));
    expect(survivor.agentIdentity.greeting.preference).toBe('auto');
    expect(survivor.slashPrefix).toBe('AEXOS');
  });

  it('rejects invalid preferences without touching the file', () => {
    const before = fs.readFileSync(project.configPath, 'utf8');

    expect(() => project.manager.setPreference('nonsense')).toThrow(/Invalid preference/);

    expect(fs.readFileSync(project.configPath, 'utf8')).toBe(before);
    expect(fs.existsSync(project.lockPath)).toBe(false);
  });
});
