#!/usr/bin/env node
/**
 * Run the framework's own SquadValidator over every installed squad.
 *
 * The validator, the schema and the task format specification all existed and
 * nothing ever ran them against the squads. Every squad in the repository —
 * including the oldest one — failed on the same two schema errors
 * for as long as they had existed, because everything that reads a manifest
 * (discovery, the registry, the codex bootstrap) was written against the shape
 * the files happened to have rather than the shape the schema declares.
 *
 * A contract with no gate stops being a contract. This is the gate.
 *
 * Usage: node scripts/validate-squads.js [--warnings-as-errors]
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SQUADS_DIR = path.join(REPO_ROOT, 'squads');

/** Not squads: a template for authors and a scratch directory. */
const NOT_SQUADS = new Set(['_example', '.designs']);

const yaml = require('js-yaml');

const { SquadValidator } = require(
  path.join(REPO_ROOT, '.aexos-core', 'development', 'scripts', 'squad', 'squad-validator.js'),
);

/**
 * Resolve every file an agent's `dependencies` block names.
 *
 * SquadValidator does not do this. `validateConfigReferences` checks only the
 * three `config` fields in the manifest, and `validateStructure` only the files
 * listed under `components`. An agent can therefore declare a template, a
 * checklist or a data file that does not exist and the squad still validates
 * clean — which is how `products` came to ship fifty dangling references while
 * passing every gate.
 *
 * It matters because the reference squad's whole design is that the agent is a
 * router and the expertise lives in these files. A dependency that resolves to
 * nothing is an agent that claims expertise it cannot reach.
 *
 * The framework validator is L2 (extend-only), so this lives here rather than
 * being patched into it.
 */
function checkAgentDependencies(squadPath, squadName) {
  const problems = [];
  const agentsDir = path.join(squadPath, 'agents');
  if (!fs.existsSync(agentsDir)) return problems;

  // Directories a bare filename may resolve against, by dependency kind.
  const searchRoots = (kind) => [
    path.join(squadPath, kind),
    path.join(squadPath, 'tasks'),
    path.join(REPO_ROOT, '.aexos-core', 'development', kind),
    path.join(REPO_ROOT, '.aexos-core', 'development', 'tasks'),
  ];

  for (const file of fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'))) {
    const block = fs.readFileSync(path.join(agentsDir, file), 'utf8').match(/```yaml\n([\s\S]*?)\n```/);
    if (!block) continue;

    let agent;
    try {
      agent = yaml.load(block[1]);
    } catch {
      continue; // the framework validator owns parse failures
    }

    const deps = (agent && agent.dependencies) || {};
    for (const [kind, list] of Object.entries(deps)) {
      if (!Array.isArray(list)) continue;

      for (const entry of list) {
        // Entries carry trailing "# comment" annotations, and tool entries are
        // bare names (git, context7) rather than files.
        const ref = String(entry).split('#')[0].trim();
        if (!/\.(md|ya?ml|js|json)$/.test(ref)) continue;

        const candidates = ref.includes('/')
          ? [path.resolve(REPO_ROOT, ref), path.resolve(squadPath, ref)]
          : searchRoots(kind).map((root) => path.join(root, ref));

        if (!candidates.some((c) => fs.existsSync(c))) {
          problems.push(`${squadName}/agents/${file} declares ${kind}: ${ref} — no such file`);
        }
      }
    }
  }

  return problems;
}

/**
 * Parse every YAML file a squad ships.
 *
 * The dependency check above proves a file exists. It does not prove the file
 * loads. `data/` holds reference knowledge as YAML and nothing parsed it: an
 * author shipped five data files with a scalar and a sequence at the same node
 * and the gate stayed green, because a declared-and-present dependency is all
 * it was measuring. An agent that routes to an unparseable reference has the
 * same problem as one routing to a missing file, and it is harder to notice.
 *
 * Workflows are excluded — the framework's own WorkflowValidator owns those and
 * reports better errors for them.
 */
function checkSquadYaml(squadPath, squadName) {
  const problems = [];

  for (const dir of ['data', 'templates', 'checklists', 'config']) {
    const full = path.join(squadPath, dir);
    if (!fs.existsSync(full)) continue;

    for (const file of fs.readdirSync(full).filter((f) => /\.ya?ml$/.test(f))) {
      try {
        yaml.load(fs.readFileSync(path.join(full, file), 'utf8'));
      } catch (error) {
        const where = error.mark ? ` at line ${error.mark.line + 1}` : '';
        problems.push(`${squadName}/${dir}/${file} does not parse${where} — ${error.reason || error.message}`);
      }
    }
  }

  return problems;
}

async function main() {
  const strict = !process.argv.includes('--allow-warnings');

  if (!fs.existsSync(SQUADS_DIR)) {
    console.log('No squads/ directory — nothing to validate.');
    return;
  }

  const names = fs
    .readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !NOT_SQUADS.has(e.name))
    .map((e) => e.name)
    .sort();

  if (names.length === 0) {
    console.log('No squads found.');
    return;
  }

  const validator = new SquadValidator();
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const name of names) {
    const squadPath = path.join(SQUADS_DIR, name);
    let result;
    try {
      result = await validator.validate(squadPath);
    } catch (error) {
      console.error(`✗ ${name}: validator threw — ${error.message}`);
      totalErrors++;
      continue;
    }

    const errors = result.errors || [];
    const warnings = result.warnings || [];

    // Dangling agent dependencies are errors, not warnings: the agent names a
    // capability it cannot load, so the command that needs it cannot run.
    for (const problem of checkAgentDependencies(squadPath, name)) {
      errors.push({ code: 'AGENT_DEPENDENCY_NOT_FOUND', message: problem });
    }
    for (const problem of checkSquadYaml(squadPath, name)) {
      errors.push({ code: 'SQUAD_YAML_UNPARSEABLE', message: problem });
    }

    totalErrors += errors.length;
    totalWarnings += warnings.length;

    const mark = errors.length === 0 && warnings.length === 0 ? '✓' : errors.length ? '✗' : '!';
    console.log(`${mark} ${name.padEnd(22)} ${errors.length} error(s), ${warnings.length} warning(s)`);

    for (const e of errors) {
      console.log(`    ERROR   [${e.code || '?'}] ${e.file ? `${e.file}: ` : ''}${e.message}`);
    }
    // Warnings are printed in full: every one of them turned out to name a real
    // gap when this was first run, not noise to be scrolled past.
    for (const w of warnings) {
      console.log(`    warning [${w.code || '?'}] ${w.file ? `${w.file}: ` : ''}${w.message}`);
    }
  }

  console.log(
    `\n${names.length} squad(s): ${totalErrors} error(s), ${totalWarnings} warning(s)`,
  );

  if (totalErrors > 0) {
    console.error('\nSquad validation failed. Fix the errors above.');
    process.exit(1);
  }
  if (strict && totalWarnings > 0) {
    console.error(
      '\nSquad validation produced warnings, which this gate treats as failures.\n' +
        'Every warning here names a missing field, a stale reference or a deprecated\n' +
        'shape. Pass --allow-warnings only to inspect, never in CI.',
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`validate-squads failed: ${error.stack || error.message}`);
  process.exit(1);
});
