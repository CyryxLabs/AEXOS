/**
 * Core Squad Scaffolder
 *
 * Copies the squads that ship with AEXOS from the installed package into the
 * user's project, then regenerates the squad registry so the orchestrator can
 * route to them.
 *
 * Squads live at the package root (`squads/`), not inside `.aexos-core/`, so
 * `installCyryxCore` never saw them: it walks `.aexos-core` folders only. The
 * result was that every squad AEXOS ships existed in the repository and reached
 * no installed project at all. Pro squads had a scaffolder for exactly this
 * reason; the core's own squads did not.
 *
 * A project's `squads/` directory is shared with the user's private squads,
 * which are deliberately gitignored. So this adds and never sweeps: an existing
 * directory is left untouched unless `force` is passed, because the user may
 * have edited a shipped squad and a silent overwrite would discard that.
 *
 * @module packages/installer/src/installer/squad-scaffolder
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { resolveCyryxCorePath } = require('../utils/package-paths');

/**
 * Directories under `squads/` that are not squads and must not be scaffolded.
 * `_example` is a template for authors, not a working squad; the registry
 * generator skips it for the same reason.
 */
const NOT_SQUADS = new Set(['_example', '.designs']);

/** A directory is a squad only if it carries a manifest. */
const MANIFEST_NAMES = ['squad.yaml', 'config.yaml'];

/**
 * Locate the `squads/` directory inside the installed AEXOS package.
 *
 * @returns {string|null} Absolute path, or null when the package has none.
 */
function getSquadSourcePath() {
  try {
    const resolved = resolveCyryxCorePath('squads');
    return resolved && fs.existsSync(resolved) ? resolved : null;
  } catch {
    return null;
  }
}

/**
 * List the squads a source directory actually contains.
 *
 * @param {string} sourceDir
 * @returns {string[]} Squad directory names, sorted.
 */
function listSquads(sourceDir) {
  if (!sourceDir || !fs.existsSync(sourceDir)) return [];
  return fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !NOT_SQUADS.has(entry.name))
    .filter((entry) =>
      MANIFEST_NAMES.some((name) => fs.existsSync(path.join(sourceDir, entry.name, name))),
    )
    .map((entry) => entry.name)
    .sort();
}

/**
 * Copy the shipped squads into a project.
 *
 * @param {string} targetDir - Project root.
 * @param {object} [options]
 * @param {string} [options.sourceDir] - Override the package squad directory.
 * @param {boolean} [options.force=false] - Replace squads that already exist.
 * @param {Function} [options.onProgress] - Called with ({squad, status}).
 * @returns {Promise<{success:boolean, copied:string[], skipped:string[], errors:Array}>}
 */
async function scaffoldCoreSquads(targetDir, options = {}) {
  const { sourceDir = getSquadSourcePath(), force = false, onProgress = null } = options;

  const result = { success: false, copied: [], skipped: [], errors: [] };

  if (!sourceDir) {
    // Not an error: a stripped or partial package legitimately has no squads,
    // and the install must still complete.
    result.success = true;
    return result;
  }

  const squads = listSquads(sourceDir);
  if (squads.length === 0) {
    result.success = true;
    return result;
  }

  const targetSquadsDir = path.join(targetDir, 'squads');
  await fs.ensureDir(targetSquadsDir);

  for (const squad of squads) {
    const from = path.join(sourceDir, squad);
    const to = path.join(targetSquadsDir, squad);

    try {
      if ((await fs.pathExists(to)) && !force) {
        result.skipped.push(squad);
        if (onProgress) onProgress({ squad, status: 'skipped' });
        continue;
      }

      await fs.copy(from, to, { overwrite: true, errorOnExist: false });
      result.copied.push(squad);
      if (onProgress) onProgress({ squad, status: 'copied' });
    } catch (error) {
      result.errors.push({ squad, message: error.message });
      if (onProgress) onProgress({ squad, status: 'failed', message: error.message });
    }
  }

  result.success = result.errors.length === 0;
  return result;
}

/**
 * Regenerate `.aexos-core/data/squad-registry.yaml` for a project.
 *
 * Copying the squads is not enough on its own. @aexos-master routes by reading
 * the registry, so a project whose registry still lists whatever shipped in the
 * package would be unable to reach a squad the user later added, and would
 * advertise one they removed.
 *
 * @param {string} targetDir - Project root.
 * @returns {Promise<{success:boolean, count:number, error:string|null}>}
 */
async function regenerateSquadRegistry(targetDir) {
  const out = { success: false, count: 0, error: null };

  try {
    const generator = resolveCyryxCorePath('scripts', 'generate-squad-registry.js');
    if (!generator || !fs.existsSync(generator)) {
      out.error = 'generate-squad-registry.js not found in package';
      return out;
    }

    // Run in-process rather than spawning: the wizard already owns this
    // working directory, and a spawn here would inherit whatever cwd the shell
    // happened to have.
    const { generateSquadRegistry } = require(generator);
    if (typeof generateSquadRegistry !== 'function') {
      out.error = 'generate-squad-registry.js exports no generateSquadRegistry';
      return out;
    }

    const registry = generateSquadRegistry(targetDir);
    out.count = (registry && registry.squads && registry.squads.length) || 0;
    out.success = true;
  } catch (error) {
    out.error = error.message;
  }

  return out;
}

module.exports = {
  scaffoldCoreSquads,
  regenerateSquadRegistry,
  getSquadSourcePath,
  listSquads,
  NOT_SQUADS,
};
