'use strict';

const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
// One shared list of every name the core package has shipped under, so a rename
// cannot leave this detector recognising only the old one.
const { CORE_PACKAGE_NAMES } = require('../utils/package-paths');

const IDE_SURFACES = [
  { id: 'claude', path: '.claude' },
  { id: 'codex', path: '.codex' },
  { id: 'gemini', path: '.gemini' },
  { id: 'agents', path: '.agents' },
  { id: 'cursor', path: '.cursor' },
  { id: 'windsurf', path: '.windsurf' },
];

const ENTERPRISE_REQUIRED_MARKERS = [
  'enterprise-config.yaml',
  '.aexos-sync.yaml',
  'package.json:aexos-enterprise',
  'scripts/hub-sync.js',
];

function toAbsolute(inputPath, fallback = process.cwd()) {
  return path.resolve(inputPath || fallback);
}

function toPortablePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function toRelativePath(baseDir, filePath) {
  return toPortablePath(path.relative(baseDir, filePath));
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return fs.readJsonSync(filePath);
  } catch (error) {
    return { __readError: error.message };
  }
}

function readYamlIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8')) || {};
  } catch (error) {
    return { __readError: error.message };
  }
}

function resolvePackageJson(targetDir, packageName) {
  const scopedPath = path.join(targetDir, 'node_modules', ...packageName.split('/'), 'package.json');
  if (fs.existsSync(scopedPath)) {
    return scopedPath;
  }

  try {
    const resolved = require.resolve(`${packageName}/package.json`, { paths: [targetDir] });

    // `paths` does not stop Node's self-reference: a process running inside the
    // package resolves the package's own name from anywhere, so an empty target
    // directory came back reporting the framework as installed in it. The
    // question here is whether the package lives under targetDir, so answer
    // that question instead of trusting the resolver's reach.
    const inside = path.relative(toAbsolute(targetDir), resolved);
    if (inside.startsWith('..') || path.isAbsolute(inside)) {
      return null;
    }

    return resolved;
  } catch {
    return null;
  }
}

function valueAt(source, keys) {
  for (const keyPath of keys) {
    const parts = keyPath.split('.');
    let current = source;
    for (const part of parts) {
      current = current && typeof current === 'object' ? current[part] : undefined;
    }
    if (typeof current === 'string' && current.trim()) {
      return current.trim();
    }
  }
  return null;
}

function pushMarker(markers, baseDir, type, markerPath, metadata = {}) {
  markers.push({
    type,
    path: toRelativePath(baseDir, markerPath),
    ...metadata,
  });
}

function detectCoreInstallation(targetDir = process.cwd()) {
  const root = toAbsolute(targetDir);
  const markers = [];
  const coreDir = path.join(root, '.aexos-core');
  const manifestPath = path.join(coreDir, '.installed-manifest.yaml');
  const versionJsonPath = path.join(coreDir, 'version.json');
  const rootPackagePath = path.join(root, 'package.json');
  const corePackagePath = [...CORE_PACKAGE_NAMES]
    .map((name) => resolvePackageJson(root, name))
    .find(Boolean) || null;
  const binPath = path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'aexos-core.cmd' : 'aexos-core');

  const manifest = readYamlIfExists(manifestPath);
  const versionJson = readJsonIfExists(versionJsonPath);
  const rootPackageJson = readJsonIfExists(rootPackagePath);
  const packageJson = corePackagePath ? readJsonIfExists(corePackagePath) : null;

  if (fs.existsSync(coreDir)) {
    pushMarker(markers, root, 'core-directory', coreDir);
  }
  if (manifest) {
    pushMarker(markers, root, 'installed-manifest', manifestPath);
  }
  if (versionJson) {
    pushMarker(markers, root, 'version-json', versionJsonPath);
  }
  if (rootPackageJson && CORE_PACKAGE_NAMES.has(rootPackageJson.name)) {
    pushMarker(markers, root, 'root-package', rootPackagePath);
  }
  if (packageJson && !packageJson.__readError) {
    pushMarker(markers, root, 'node-package', corePackagePath);
  }
  if (fs.existsSync(binPath)) {
    pushMarker(markers, root, 'bin', binPath);
  }

  const version = valueAt(manifest, [
    'version',
    'installedVersion',
    'installed_version',
    'core.version',
    'package.version',
  ]) || valueAt(versionJson, [
    'version',
    'coreVersion',
    'package.version',
  ]) || valueAt(rootPackageJson, ['version'])
    || valueAt(packageJson, ['version']);

  let source = 'none';
  if (markers.find(marker => marker.type === 'installed-manifest')) {
    source = 'installed-manifest';
  } else if (markers.find(marker => marker.type === 'root-package')) {
    source = 'root-package';
  } else if (markers.find(marker => marker.type === 'node-package')) {
    source = 'node-package';
  } else if (markers.find(marker => marker.type === 'bin')) {
    source = 'bin';
  } else if (markers.find(marker => marker.type === 'core-directory')) {
    source = 'core-directory';
  }

  return {
    detected: markers.length > 0,
    source,
    version,
    manifestPath: manifest ? toRelativePath(root, manifestPath) : null,
    rootPackagePath: rootPackageJson && CORE_PACKAGE_NAMES.has(rootPackageJson.name)
      ? toRelativePath(root, rootPackagePath)
      : null,
    packagePath: packageJson && !packageJson.__readError ? toRelativePath(root, corePackagePath) : null,
    binPath: fs.existsSync(binPath) ? toRelativePath(root, binPath) : null,
    markers,
  };
}

function detectProInstallation(targetDir = process.cwd()) {
  const root = toAbsolute(targetDir);
  const markers = [];
  const manifestPath = path.join(root, 'pro-installed-manifest.yaml');
  const versionJsonPath = path.join(root, 'pro-version.json');
  const proConfigPath = path.join(root, '.aexos-core', 'pro-config.yaml');
  const featureRegistryPath = path.join(root, '.aexos-core', 'feature-registry.yaml');
  const proPackagePath = resolvePackageJson(root, '@aexos/pro');
  const submodulePackagePath = path.join(root, 'pro', 'package.json');

  const manifest = readYamlIfExists(manifestPath);
  const versionJson = readJsonIfExists(versionJsonPath);
  const proConfig = readYamlIfExists(proConfigPath);
  const packageJson = proPackagePath ? readJsonIfExists(proPackagePath) : null;
  const submodulePackageJson = readJsonIfExists(submodulePackagePath);

  if (manifest) {
    pushMarker(markers, root, 'pro-installed-manifest', manifestPath);
  }
  if (versionJson) {
    pushMarker(markers, root, 'pro-version-json', versionJsonPath);
  }
  if (proConfig) {
    pushMarker(markers, root, 'pro-config', proConfigPath);
  }
  if (fs.existsSync(featureRegistryPath)) {
    pushMarker(markers, root, 'feature-registry', featureRegistryPath);
  }
  if (packageJson && !packageJson.__readError) {
    pushMarker(markers, root, 'node-package', proPackagePath);
  }
  if (submodulePackageJson && !submodulePackageJson.__readError) {
    pushMarker(markers, root, 'submodule', submodulePackagePath);
  }

  const version = valueAt(versionJson, [
    'proVersion',
    'version',
    'package.version',
  ]) || valueAt(manifest, [
    'version',
    'proVersion',
    'installedVersion',
    'installed_version',
    'pro.version',
  ]) || valueAt(packageJson, ['version'])
    || valueAt(submodulePackageJson, ['version'])
    || valueAt(proConfig, ['pro.version', 'version']);

  const source = markers.find(marker => marker.type === 'node-package') ? 'node-package'
    : markers.find(marker => marker.type === 'submodule') ? 'submodule'
      : markers.find(marker => marker.type === 'pro-installed-manifest') ? 'installed-manifest'
        : markers.find(marker => marker.type === 'pro-config') ? 'project-config'
          : markers.find(marker => marker.type === 'pro-version-json') ? 'version-json'
            : 'none';

  return {
    detected: markers.length > 0,
    source,
    version,
    manifestPath: manifest ? toRelativePath(root, manifestPath) : null,
    packagePath: packageJson && !packageJson.__readError ? toRelativePath(root, proPackagePath) : null,
    submodulePath: submodulePackageJson && !submodulePackageJson.__readError ? 'pro' : null,
    markers,
  };
}

function detectEnterpriseSource(enterpriseSourceDir) {
  const root = toAbsolute(enterpriseSourceDir);
  const markers = [];
  const missingMarkers = [];
  const configPath = path.join(root, 'enterprise-config.yaml');
  const syncPath = path.join(root, '.aexos-sync.yaml');
  const packageJsonPath = path.join(root, 'package.json');
  const hubSyncPath = path.join(root, 'scripts', 'hub-sync.js');

  const config = readYamlIfExists(configPath);
  const syncConfig = readYamlIfExists(syncPath);
  const packageJson = readJsonIfExists(packageJsonPath);

  if (config) {
    pushMarker(markers, root, 'enterprise-config', configPath);
  } else {
    missingMarkers.push('enterprise-config.yaml');
  }

  if (syncConfig) {
    pushMarker(markers, root, 'ide-sync-config', syncPath);
  } else {
    missingMarkers.push('.aexos-sync.yaml');
  }

  const packageName = valueAt(packageJson, ['name']);
  if (packageName && packageName.includes('aexos-enterprise')) {
    pushMarker(markers, root, 'package-json', packageJsonPath, { packageName });
  } else {
    missingMarkers.push('package.json:aexos-enterprise');
  }

  if (fs.existsSync(hubSyncPath)) {
    pushMarker(markers, root, 'hub-sync-script', hubSyncPath);
  } else {
    missingMarkers.push('scripts/hub-sync.js');
  }

  const enterpriseConfig = config && !config.__readError ? config.enterprise || config : {};
  const version = valueAt(enterpriseConfig, ['version']) || valueAt(packageJson, ['version']);
  const product = valueAt(enterpriseConfig, ['product', 'name']) || packageName || null;
  const source = valueAt(enterpriseConfig, ['source', 'repository']) || valueAt(packageJson, [
    'repository.url',
    'repository',
  ]);

  return {
    detected: markers.length > 0,
    valid: missingMarkers.length === 0,
    path: root,
    product,
    version,
    source,
    missingMarkers,
    requiredMarkers: ENTERPRISE_REQUIRED_MARKERS,
    markers,
  };
}

function detectActiveIdes(targetDir = process.cwd()) {
  const root = toAbsolute(targetDir);

  return IDE_SURFACES
    .map(surface => ({
      id: surface.id,
      path: surface.path,
      active: fs.existsSync(path.join(root, surface.path)),
    }))
    .filter(surface => surface.active);
}

function detectEnterpriseUpgradeContext(options = {}) {
  const targetDir = toAbsolute(options.targetDir);
  const enterpriseSourceDir = options.enterpriseSource ? toAbsolute(options.enterpriseSource) : null;
  const emptyEnterpriseContext = {
    detected: false,
    valid: false,
    path: null,
    product: null,
    version: null,
    source: null,
    missingMarkers: ENTERPRISE_REQUIRED_MARKERS,
    requiredMarkers: ENTERPRISE_REQUIRED_MARKERS,
    markers: [],
  };

  return {
    targetDir,
    enterpriseSourceDir,
    core: detectCoreInstallation(targetDir),
    pro: detectProInstallation(targetDir),
    enterprise: enterpriseSourceDir
      ? detectEnterpriseSource(enterpriseSourceDir)
      : emptyEnterpriseContext,
    activeIdes: detectActiveIdes(targetDir),
  };
}

module.exports = {
  ENTERPRISE_REQUIRED_MARKERS,
  IDE_SURFACES,
  detectActiveIdes,
  detectCoreInstallation,
  detectEnterpriseSource,
  detectEnterpriseUpgradeContext,
  detectProInstallation,
  toPortablePath,
};
