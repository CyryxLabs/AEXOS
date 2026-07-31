/**
 * Guards the squad routing chain end to end.
 *
 * The orchestrator can only route to a squad it can find in
 * `.aexos-core/data/squad-registry.yaml`. Nothing else fails when that chain
 * breaks: the squad still works when a user addresses its chief by name, so a
 * missing or stale registry is invisible until someone asks the orchestrator to
 * delegate and it quietly uses a core agent instead.
 *
 * This asserts the three ways that chain can break silently:
 *   - a squad on disk that never made it into the registry (stale registry)
 *   - a registry entry whose entry_agent has no definition (dead front door)
 *   - the discovery module and the codex skill bootstrap disagreeing about
 *     which squads exist, which would make a squad visible in one surface and
 *     invisible in the other
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const REGISTRY = path.join(REPO_ROOT, '.aexos-core', 'data', 'squad-registry.yaml');
const { discoverSquads } = require(
  path.join(REPO_ROOT, '.aexos-core', 'core', 'squads', 'squad-discovery.js'),
);

const discovered = discoverSquads(REPO_ROOT).squads;

describe('squad registry', () => {
  test('exists', () => {
    if (!fs.existsSync(REGISTRY)) {
      throw new Error(
        'squad-registry.yaml is missing, so @aexos-master cannot route to any squad.\n' +
          'Run: node scripts/generate-squad-registry.js',
      );
    }
  });

  const registry = fs.existsSync(REGISTRY) ? yaml.load(fs.readFileSync(REGISTRY, 'utf8')) : null;

  test('lists every squad found on disk', () => {
    const listed = new Set((registry.squads || []).map((s) => s.name));
    const missing = discovered.map((s) => s.name).filter((n) => !listed.has(n));
    if (missing.length) {
      throw new Error(
        'These squads exist on disk but are not in the registry, so the orchestrator ' +
          `cannot route to them: ${missing.join(', ')}\n` +
          'Run: node scripts/generate-squad-registry.js',
      );
    }
    expect(listed.size).toBe(discovered.length);
  });

  test('every entry_agent has a definition on disk', () => {
    const dead = [];
    for (const squad of registry.squads || []) {
      const file = path.join(REPO_ROOT, 'squads', squad.name, 'agents', `${squad.entry_agent}.md`);
      if (!fs.existsSync(file)) dead.push(`${squad.name} -> ${squad.entry_agent}`);
    }
    if (dead.length) {
      throw new Error(
        'Registry points at entry agents that do not exist — routing would dead-end:\n  ' +
          dead.join('\n  '),
      );
    }
    expect(dead).toHaveLength(0);
  });

  test('every squad carries the metadata routing needs', () => {
    const thin = [];
    for (const squad of registry.squads || []) {
      const hasSignal =
        (squad.domain && squad.domain.trim()) ||
        (Array.isArray(squad.keywords) && squad.keywords.length);
      if (!hasSignal) thin.push(squad.name);
    }
    if (thin.length) {
      throw new Error(
        'These squads declare neither a domain nor keywords, so nothing can be matched ' +
          `against a request: ${thin.join(', ')}`,
      );
    }
    expect(thin).toHaveLength(0);
  });

  test('discovery agrees with the codex skill bootstrap about which squads exist', () => {
    // The bootstrap performs its own scan for skill generation. If the two ever
    // disagree, a squad becomes visible in one surface and invisible in the
    // other — worse than being uniformly absent, because it looks installed.
    const squadsDir = path.join(REPO_ROOT, 'squads');
    const onDisk = fs.existsSync(squadsDir)
      ? fs
        .readdirSync(squadsDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .filter((name) =>
          ['squad.yaml', 'config.yaml'].some((f) =>
            fs.existsSync(path.join(squadsDir, name, f)),
          ),
        )
      : [];

    const byDiscovery = discovered.map((s) => s.name).sort();
    expect(onDisk.sort()).toEqual(byDiscovery);
  });

  test('the orchestrator is told to read the registry', () => {
    const master = path.join(REPO_ROOT, '.aexos-core', 'development', 'agents', 'aexos-master.md');
    const src = fs.readFileSync(master, 'utf8');
    if (!src.includes('squad-registry.yaml')) {
      throw new Error(
        '@aexos-master does not reference squad-registry.yaml, so the registry is generated ' +
          'but never consulted and squads stay unroutable.',
      );
    }
    expect(src).toContain('entry_agent');
  });
});
