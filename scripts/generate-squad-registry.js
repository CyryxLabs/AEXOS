#!/usr/bin/env node
/**
 * Generate `.aexos-core/data/squad-registry.yaml` from the installed squads.
 *
 * The orchestrator knows the twelve core agents because they are written into
 * its own definition by hand. That does not scale to squads: every new squad
 * would need someone to remember to edit @aexos-master, and forgetting is
 * silent — the squad works when invoked directly and is simply never routed to.
 *
 * This derives the routing table instead. Creating a squad is what registers it.
 *
 * Byte-idempotent by the same rule as the entity registry: the generated_at
 * stamp only advances when the routing content actually changes, so a
 * regeneration that finds nothing new does not invalidate the install manifest.
 *
 * Usage: node scripts/generate-squad-registry.js [--check]
 *   --check  exit 1 if the file on disk is not what would be generated
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(REPO_ROOT, '.aexos-core', 'data', 'squad-registry.yaml');

/** Where a given project keeps its registry. */
function registryPathFor(projectRoot) {
  return path.join(projectRoot, '.aexos-core', 'data', 'squad-registry.yaml');
}

/**
 * Resolve the discovery module.
 *
 * Always this script's own copy, never the target project's. `discoverSquads`
 * takes the root to scan as an argument, so it is pure logic — loading the
 * project's copy would gain nothing and would make registry generation depend
 * on the project having resolvable dependencies, which fails on a fresh install
 * before `npm install` has run.
 *
 * The project's copy is only a fallback for a tree where this script was
 * relocated away from its own `.aexos-core`.
 */
function loadDiscovery(projectRoot) {
  const own = path.join(REPO_ROOT, '.aexos-core', 'core', 'squads', 'squad-discovery.js');
  if (fs.existsSync(own)) return require(own);
  return require(path.join(projectRoot, '.aexos-core', 'core', 'squads', 'squad-discovery.js'));
}

function buildRegistry(generatedAt, projectRoot = REPO_ROOT) {
  const { discoverSquads } = loadDiscovery(projectRoot);
  // The root to scan is always the project — only the code comes from here.
  const { squads, warnings } = discoverSquads(projectRoot);

  return {
    registry: {
      version: '1.0.0',
      generated_at: generatedAt,
      generator: 'scripts/generate-squad-registry.js',
      note:
        'Generated from squads/*/{squad,config}.yaml. Do not hand-edit — create a ' +
        'squad and regenerate. @aexos-master reads this to route by domain.',
      squad_count: squads.length,
    },
    squads: squads.map((s) => ({
      name: s.name,
      display_name: s.display_name,
      domain: s.domain,
      description: s.description,
      keywords: s.keywords,
      // The front door. Route here; the chief distributes internally.
      entry_agent: s.entry_agent,
      agent_count: s.agents.length,
      agents: s.agents.map((a) => ({
        id: a.id,
        name: a.name,
        title: a.title,
        based_on: a.based_on || null,
      })),
    })),
    warnings,
  };
}

function dump(registry) {
  return (
    '# GENERATED FILE — do not hand-edit.\n' +
    '# Source: squads/*/{squad,config}.yaml via scripts/generate-squad-registry.js\n' +
    yaml.dump(registry, { lineWidth: 100, noRefs: true })
  );
}

/**
 * Write a project's registry, preserving the byte-idempotence rule.
 *
 * This is what the installer calls after scaffolding squads into a project: the
 * squads are only reachable once the orchestrator can find them here.
 *
 * @param {string} projectRoot
 * @returns {object} The registry that was written.
 */
function generateSquadRegistry(projectRoot) {
  const outPath = registryPathFor(projectRoot);
  const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;

  let previousStamp = null;
  if (existing) {
    try {
      const parsed = yaml.load(existing);
      previousStamp = parsed && parsed.registry && parsed.registry.generated_at;
    } catch {
      previousStamp = null;
    }
  }

  const candidate = dump(buildRegistry(previousStamp || new Date().toISOString(), projectRoot));
  const output =
    candidate === existing
      ? candidate
      : dump(buildRegistry(new Date().toISOString(), projectRoot));

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  return yaml.load(output);
}

function main() {
  const check = process.argv.includes('--check');
  const existing = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, 'utf8') : null;

  // Reuse the previous timestamp first; only advance it if the content differs.
  let previousStamp = null;
  if (existing) {
    try {
      const parsed = yaml.load(existing);
      previousStamp = parsed && parsed.registry && parsed.registry.generated_at;
    } catch {
      previousStamp = null;
    }
  }

  const candidate = dump(buildRegistry(previousStamp || new Date().toISOString()));
  const output = candidate === existing ? candidate : dump(buildRegistry(new Date().toISOString()));

  if (check) {
    if (existing === null) {
      console.error('squad-registry.yaml is missing. Run: node scripts/generate-squad-registry.js');
      process.exit(1);
    }
    if (candidate !== existing) {
      console.error(
        'squad-registry.yaml is stale — a squad was added, removed or changed without ' +
          'regenerating.\nRun: node scripts/generate-squad-registry.js',
      );
      process.exit(1);
    }
    console.log('squad-registry.yaml is up to date.');
    return;
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, output);

  const parsed = yaml.load(output);
  console.log(`squad-registry.yaml written — ${parsed.registry.squad_count} squad(s)`);
  for (const s of parsed.squads) {
    console.log(`  ${s.name} -> @${s.entry_agent} (${s.agent_count} agents)`);
  }
  for (const w of parsed.warnings || []) console.log(`  note: ${w}`);
}

if (require.main === module) main();

module.exports = { buildRegistry, generateSquadRegistry, registryPathFor, OUT_PATH };
