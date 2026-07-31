'use strict';

const fs = require('fs');
const path = require('path');

const {
  getCyryxCorePackageRoot,
  getCyryxCoreVersion,
  resolveCyryxCorePath,
} = require('../../src/utils/package-paths');

describe('installer package path resolution', () => {
  test('resolves an AEXOS core package root with .aexos-core assets', () => {
    const packageRoot = getCyryxCorePackageRoot();
    const packageJson = require(path.join(packageRoot, 'package.json'));

    expect(packageJson.name).toBe('@aexos-squads/core');
    expect(fs.existsSync(path.join(packageRoot, '.aexos-core'))).toBe(true);
  });

  test('resolves .aexos-core paths from the core package root', () => {
    const coreConfigPath = resolveCyryxCorePath('.aexos-core', 'core-config.yaml');

    expect(fs.existsSync(coreConfigPath)).toBe(true);
  });

  test('reads the AEXOS core package version', () => {
    const packageRoot = getCyryxCorePackageRoot();
    const packageJson = require(path.join(packageRoot, 'package.json'));

    expect(getCyryxCoreVersion()).toBe(packageJson.version);
  });
});
