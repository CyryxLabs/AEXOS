'use strict';

const fs = require('fs');
const path = require('path');

const {
  getCyryxCorePackageRoot,
  getCyryxCoreVersion,
  resolveCyryxCorePath,
  CORE_PACKAGE_NAME,
  CORE_PACKAGE_NAMES,
} = require('../../src/utils/package-paths');

describe('installer package path resolution', () => {
  test('resolves an AEXOS core package root with .aexos-core assets', () => {
    const packageRoot = getCyryxCorePackageRoot();
    const packageJson = require(path.join(packageRoot, 'package.json'));

    // Asserted against the resolver's own list rather than a literal, so the
    // test states the contract — "this root is a recognised core package" —
    // instead of restating one spelling that a rename then has to chase.
    expect(CORE_PACKAGE_NAMES.has(packageJson.name)).toBe(true);
    expect(fs.existsSync(path.join(packageRoot, '.aexos-core'))).toBe(true);
  });

  test('this repository is the current name, not a legacy one', () => {
    // The list above accepts old names on purpose, for projects installed
    // before a rename. This repository should never be one of those.
    const packageJson = require(path.join(getCyryxCorePackageRoot(), 'package.json'));
    expect(packageJson.name).toBe(CORE_PACKAGE_NAME);
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
