'use strict';

const fs = require('node:fs');
const path = require('node:path');

function isCorePackageRoot(candidate) {
  if (!candidate) return false;

  try {
    const packageJsonPath = path.join(candidate, 'package.json');
    const cyryxCorePath = path.join(candidate, '.aexos-core');

    if (!fs.existsSync(packageJsonPath) || !fs.existsSync(cyryxCorePath)) {
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.name === '@aexos-squads/core';
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
    resolvePackageJsonRoot('@aexos-squads/core'),
  ];

  const packageRoot = candidates.find(isCorePackageRoot);
  if (!packageRoot) {
    throw new Error(
      'CYRYX core package root not found. Install @aexos-squads/core or set AEXOS_CORE_PACKAGE_ROOT.',
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
};
