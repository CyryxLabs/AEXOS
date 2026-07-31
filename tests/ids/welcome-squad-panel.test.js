/**
 * Guards the squad panel on the welcome screen.
 *
 * `readSquads` parses the registry by hand rather than pulling in a YAML
 * dependency on the welcome path. That is the right trade for startup cost, but
 * it means the panel's correctness depends on a format the generator owns and
 * this parser only assumes. Both failure directions are silent:
 *
 *   - the parser is wrapped in try/catch and returns [] on any error, so a
 *     format change makes the panel disappear rather than crash
 *   - a row that parses but misreads a field renders a handle that does not
 *     resolve, which reads as a broken install
 *
 * So this asserts the parser against the generator's real output, not a fixture.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const REGISTRY = path.join(REPO_ROOT, '.aexos-core', 'data', 'squad-registry.yaml');
const { readSquads, renderSquads, visibleWidth } = require(
  path.join(REPO_ROOT, 'packages', 'installer', 'src', 'utils', 'aexos-banner.js'),
);

const truth = fs.existsSync(REGISTRY)
  ? (yaml.load(fs.readFileSync(REGISTRY, 'utf8')) || {}).squads || []
  : [];

describe('welcome squad panel', () => {
  test('the registry it reads exists', () => {
    expect(fs.existsSync(REGISTRY)).toBe(true);
    expect(truth.length).toBeGreaterThan(0);
  });

  test('reads every squad a YAML parser finds', () => {
    const parsed = readSquads(REGISTRY);
    if (parsed.length !== truth.length) {
      throw new Error(
        `readSquads found ${parsed.length} squad(s) but the registry holds ${truth.length}. ` +
          'The hand-rolled parser has drifted from the generator format, and because it ' +
          'swallows errors the panel would just silently shrink.',
      );
    }
    expect(parsed.map((s) => s.name).sort()).toEqual(truth.map((s) => s.name).sort());
  });

  test('reads the entry agent and domain each squad actually declares', () => {
    const byName = new Map(readSquads(REGISTRY).map((s) => [s.name, s]));
    const wrong = [];
    for (const squad of truth) {
      const got = byName.get(squad.name);
      if (!got) continue; // reported above
      if (got.entry !== squad.entry_agent) {
        wrong.push(`${squad.name}: entry "${got.entry}" but registry says "${squad.entry_agent}"`);
      }
      if ((squad.domain || '') && got.domain !== squad.domain) {
        wrong.push(`${squad.name}: domain misread as "${got.domain}"`);
      }
    }
    if (wrong.length) {
      throw new Error(
        'The panel would render handles that do not resolve:\n  ' + wrong.join('\n  '),
      );
    }
    expect(wrong).toHaveLength(0);
  });

  test('counts agents per squad', () => {
    const byName = new Map(readSquads(REGISTRY).map((s) => [s.name, s]));
    for (const squad of truth) {
      const got = byName.get(squad.name);
      if (!got) continue;
      expect(got.count).toBe((squad.agents || []).length);
    }
  });

  test('renders a frame whose rows all hold one width', () => {
    const out = renderSquads(undefined, { registryPath: REGISTRY, width: 80 });
    expect(out).not.toBe('');
    const lines = out.split('\n');
    const widths = new Set(lines.map((l) => visibleWidth(l)));
    if (widths.size !== 1) {
      throw new Error(
        `Panel rows render at ${[...widths].join(', ')} columns — a ragged frame means the ` +
          'width accounting is off, usually an emoji or ANSI escape counted wrong.',
      );
    }
    expect(widths.has(80)).toBe(true);
  });

  test('returns empty rather than throwing when the registry is absent', () => {
    // The welcome screen runs before install completes, so a missing registry is
    // an ordinary state and must degrade to no panel, never to a crash.
    expect(readSquads(path.join(REPO_ROOT, 'does-not-exist.yaml'))).toEqual([]);
    expect(renderSquads(undefined, { registryPath: path.join(REPO_ROOT, 'nope.yaml') })).toBe('');
  });
});
