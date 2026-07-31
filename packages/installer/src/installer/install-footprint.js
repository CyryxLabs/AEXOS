/**
 * What an install actually puts on disk, and how to recognise an older one.
 *
 * Two defects share this gap. Installing over a previous AIOX install left it
 * entirely in place, so both frameworks registered slash commands and the user
 * saw the old one; and `aexos uninstall` removed the core, the squads and the
 * project data while leaving every IDE surface behind, so the commands survived
 * an uninstall.
 *
 * Both happen because the IDE projection was never described anywhere as part
 * of the install. It is described here, once, and both paths read it.
 *
 * @module packages/installer/src/installer/install-footprint
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Directories and files this framework owns inside a project.
 *
 * Paths are relative to the project root. Anything listed here is created by an
 * install and is safe to remove on uninstall — user content never lands in
 * these locations.
 */
const AEXOS_FOOTPRINT = [
  { path: '.aexos-core', label: 'Framework core' },
  { path: 'squads', label: 'Squad definitions' },
  { path: '.aexos', label: 'Project data and settings' },
  { path: '.claude/commands/AEXOS', label: 'Claude Code commands' },
  { path: '.claude/skills/AEXOS', label: 'Claude Code skills' },
  { path: '.gemini/rules/AEXOS', label: 'Gemini rules' },
  { path: '.kimi/skills', label: 'Kimi skills' },
  { path: '.antigravity', label: 'Antigravity rules' },
];

/**
 * The same surfaces, as an earlier generation of this framework wrote them.
 *
 * AEXOS is derived from AIOX, which was derived from something branded CYRYX.
 * A project that has been through those installs carries directories the
 * current installer neither writes nor reads — and the editors do read them,
 * which is why a migrated project keeps offering the old commands.
 */
const LEGACY_FOOTPRINT = [
  // AIOX
  { path: '.aiox-core', label: 'AIOX framework core', brand: 'AIOX' },
  { path: '.claude/commands/AIOX', label: 'AIOX Claude commands', brand: 'AIOX' },
  { path: '.claude/skills/AIOX', label: 'AIOX Claude skills', brand: 'AIOX' },
  { path: '.gemini/rules/AIOX', label: 'AIOX Gemini rules', brand: 'AIOX' },
  // CYRYX, when it was the product name rather than the company
  { path: '.cyryx-core', label: 'CYRYX framework core', brand: 'CYRYX' },
  { path: '.claude/commands/CYRYX', label: 'CYRYX Claude commands', brand: 'CYRYX' },
  { path: '.claude/skills/CYRYX', label: 'CYRYX Claude skills', brand: 'CYRYX' },
  { path: '.gemini/rules/CYRYX', label: 'CYRYX Gemini rules', brand: 'CYRYX' },
];

/** Skill directories are per-agent and prefixed, so they are matched, not listed. */
const LEGACY_SKILL_PREFIXES = [
  { dir: '.codex/skills', prefixes: ['aiox-', 'cyryx-'], label: 'Codex skills' },
  { dir: '.grok/skills', prefixes: ['aiox-', 'cyryx-'], label: 'Grok skills' },
  { dir: '.claude/skills', prefixes: ['aiox-', 'cyryx-'], label: 'Claude skills' },
];

function exists(root, rel) {
  return fs.existsSync(path.join(root, rel));
}

/**
 * Everything this framework owns that is currently present.
 *
 * @param {string} projectRoot
 * @returns {Array<{path: string, label: string}>}
 */
function findAexosFootprint(projectRoot) {
  return AEXOS_FOOTPRINT.filter((item) => exists(projectRoot, item.path));
}

/**
 * Installs from an earlier generation that are still on disk.
 *
 * @param {string} projectRoot
 * @returns {{items: Array<{path: string, label: string, brand: string}>, brands: string[]}}
 */
function findLegacyInstalls(projectRoot) {
  const items = LEGACY_FOOTPRINT.filter((item) => exists(projectRoot, item.path)).map((i) => ({
    ...i,
  }));

  for (const { dir, prefixes, label } of LEGACY_SKILL_PREFIXES) {
    const full = path.join(projectRoot, dir);
    if (!fs.existsSync(full)) continue;

    let entries;
    try {
      entries = fs.readdirSync(full);
    } catch {
      continue;
    }

    for (const entry of entries) {
      const prefix = prefixes.find((p) => entry.startsWith(p));
      if (!prefix) continue;
      items.push({
        path: `${dir}/${entry}`,
        label: `${label} (${entry})`,
        brand: prefix.replace('-', '').toUpperCase(),
      });
    }
  }

  const brands = [...new Set(items.map((i) => i.brand))].sort();
  return { items, brands };
}

/**
 * Remove a list of footprint entries.
 *
 * @param {string} projectRoot
 * @param {Array<{path: string}>} items
 * @param {object} [options]
 * @param {boolean} [options.dryRun=false]
 * @returns {{removed: string[], failed: Array<{path: string, message: string}>}}
 */
function removeFootprint(projectRoot, items, options = {}) {
  const { dryRun = false } = options;
  const removed = [];
  const failed = [];

  for (const item of items) {
    const full = path.join(projectRoot, item.path);
    if (!fs.existsSync(full)) continue;

    if (dryRun) {
      removed.push(item.path);
      continue;
    }

    try {
      fs.rmSync(full, { recursive: true, force: true });
      removed.push(item.path);
    } catch (error) {
      failed.push({ path: item.path, message: error.message });
    }
  }

  return { removed, failed };
}

module.exports = {
  AEXOS_FOOTPRINT,
  LEGACY_FOOTPRINT,
  LEGACY_SKILL_PREFIXES,
  findAexosFootprint,
  findLegacyInstalls,
  removeFootprint,
};
