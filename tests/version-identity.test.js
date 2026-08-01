/**
 * Version Identity Guard
 *
 * `package.json` is the single source of truth for the framework version.
 * Every other declaration of "the framework version" must either equal it or
 * derive from it at runtime.
 *
 * This test exists because five sources drifted apart (package.json 5.3.0,
 * framework-config.yaml 4.0.0, core-config.yaml 2.1.0, the config-split CLI
 * 3.12.0, the installer template 2.1.0) with nothing to catch it.
 *
 * @story AEX-0.6 — Unify version identity + CHANGELOG
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..');

const readText = (...segments) => fs.readFileSync(path.join(REPO_ROOT, ...segments), 'utf8');

const packageVersion = JSON.parse(readText('package.json')).version;

describe('version identity', () => {
  test('package.json declares a semantic version', () => {
    expect(packageVersion).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('every published manifest declares the same version', () => {
    const compat = JSON.parse(readText('compat', 'aexos-core', 'package.json'));
    const internal = JSON.parse(readText('.aexos-core', 'package.json'));

    expect(internal.version).toBe(packageVersion);
    expect(compat.version).toBe(packageVersion);

    // The compat wrapper exists only to re-point the old name at the current
    // release, so whatever it depends on must be pinned to this version.
    // Asserted by value rather than by key: the dependency still names
    // `@aexos-squads/core` while the root package is `@cyryxlabs/aexos`, which
    // is a separate defect and not this guard's business to bless.
    expect(Object.values(compat.dependencies)).toEqual([packageVersion]);
  });

  test('framework-config.yaml framework_version matches package.json', () => {
    const frameworkConfig = yaml.load(readText('.aexos-core', 'framework-config.yaml'));

    expect(frameworkConfig.metadata.framework_version).toBe(packageVersion);
  });

  test('the install manifest declares the same version', () => {
    const manifest = yaml.load(readText('.aexos-core', 'install-manifest.yaml'));

    expect(String(manifest.version)).toBe(packageVersion);
  });

  test('CHANGELOG.md documents the current package version', () => {
    const changelog = readText('CHANGELOG.md');

    expect(changelog).toContain(`## [${packageVersion}]`);
  });

  test('the config-split CLI derives framework_version instead of hardcoding it', () => {
    const source = readText('.aexos-core', 'cli', 'commands', 'config', 'index.js');

    expect(source).toContain('resolveFrameworkVersion()');
    expect(source).not.toMatch(/framework_version:\s*'\d+\.\d+\.\d+'/);
  });

  test('the installer core-config template derives the version instead of hardcoding it', () => {
    const source = readText(
      'packages',
      'installer',
      'src',
      'config',
      'templates',
      'core-config-template.js',
    );

    expect(source).toContain('resolveFrameworkVersion()');
    expect(source).not.toMatch(/cyryxVersion\s*=\s*'\d+\.\d+\.\d+'/);
  });

  test('the installer wizard derives the version instead of hardcoding it', () => {
    const source = readText('packages', 'installer', 'src', 'wizard', 'ide-config-generator.js');

    expect(source).toContain('resolveFrameworkVersion()');
    expect(source).not.toMatch(/cyryxVersion:\s*'\d+\.\d+\.\d+'/);
  });

  test('core-config.yaml records an install-time snapshot under an unambiguous key', () => {
    const coreConfig = yaml.load(readText('.aexos-core', 'core-config.yaml'));

    // `project.version` meant three different things across the installer, the
    // L2 override guide and this file. It was renamed rather than aligned.
    expect(coreConfig.project).not.toHaveProperty('version');
    expect(coreConfig.project.installedFrameworkVersion).toBeDefined();
  });
});
