#!/usr/bin/env node
/**
 * Version Lockstep Sync
 *
 * The publish safety gate (bin/utils/validate-publish.js → Check 5 /
 * scripts/validate-aexos-core-namespace.js) requires `.aexos-core/package.json`
 * to match the root package.json version. semantic-release only bumps the
 * root manifest (in the release working tree), so every release was blocked
 * at prepublishOnly with version drift. This script is the missing `prepare`
 * step: it syncs the internal manifest AND the legacy compat wrapper
 * (`compat/aexos-core/`) — version + its `@aexos/core` dependency pin —
 * to the target version.
 *
 * Wired into .releaserc.json via @semantic-release/exec:
 *   prepareCmd: node scripts/sync-version-lockstep.js ${nextRelease.version}
 *
 * Also usable standalone (release-bump PRs, e.g. chore(release) commits):
 *   node scripts/sync-version-lockstep.js           # target = root version
 *   node scripts/sync-version-lockstep.js 5.3.0     # explicit target
 *
 * Exit codes: 0 = synced (or already in sync), 1 = invalid input / IO error
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

/** Current name of the core package the compat wrapper re-exports. */
const CORE_DEP_NAME = '@aexos/core';
/**
 * Names the core package shipped under before the scope was consolidated.
 * Deliberately NOT rewritten to the current scope — these are the stale keys
 * this script has to find and remove.
 */
const LEGACY_CORE_DEP_NAMES = ['@cyryxlabs/aexos', '@aexos-squads/core', '@cyryx/aexos-core'];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, `${JSON.stringify(obj, null, 2)}\n`);
}

function main() {
  const rootPkg = readJson(path.join(ROOT, 'package.json'));
  const version = process.argv[2] || rootPkg.version;

  if (!SEMVER_RE.test(version)) {
    console.error(`FAIL: invalid semver target "${version}"`);
    process.exit(1);
  }

  // 1. .aexos-core/package.json — version lockstep with root
  //    (validate-aexos-core-namespace.js rule 4: root is SOT)
  const internalPath = path.join(ROOT, '.aexos-core', 'package.json');
  const internal = readJson(internalPath);
  if (internal.version !== version) {
    internal.version = version;
    writeJson(internalPath, internal);
    console.log(`synced: .aexos-core/package.json -> ${version}`);
  } else {
    console.log(`ok: .aexos-core/package.json already ${version}`);
  }

  // 2. compat/aexos-core/package.json — legacy wrapper version + exact
  //    dependency pin on the scoped package (published by npm-publish.yml)
  const compatPath = path.join(ROOT, 'compat', 'aexos-core', 'package.json');
  const compat = readJson(compatPath);
  let compatChanged = false;
  if (compat.version !== version) {
    compat.version = version;
    compatChanged = true;
  }
  if (compat.dependencies) {
    // Drop any dependency pin left behind by an earlier scope. Writing the
    // current key without removing the old one is how the wrapper ended up
    // depending on a package name that was never published.
    for (const legacy of LEGACY_CORE_DEP_NAMES) {
      if (legacy in compat.dependencies) {
        delete compat.dependencies[legacy];
        compatChanged = true;
      }
    }
    if (compat.dependencies[CORE_DEP_NAME] !== version) {
      compat.dependencies[CORE_DEP_NAME] = version;
      compatChanged = true;
    }
  }
  if (compatChanged) {
    writeJson(compatPath, compat);
    console.log(`synced: compat/aexos-core/package.json -> ${version} (version + dependency pin)`);
  } else {
    console.log(`ok: compat/aexos-core/package.json already ${version}`);
  }

  console.log(`PASS: version lockstep at ${version}`);
}

main();
