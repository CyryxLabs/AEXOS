/**
 * Guards what an install owns, and what an uninstall therefore has to remove.
 *
 * Two failures shared one cause — nothing described the IDE projection as part
 * of the install:
 *
 *   - installing over a previous AIOX install left it entirely in place, so the
 *     editor registered both frameworks and offered the old commands. The user
 *     read that as "the new install did not work".
 *   - `aexos uninstall` removed the core, the squads and the project data and
 *     left every IDE surface behind, so the slash commands outlived the
 *     uninstall and pointed at agents that were no longer there.
 *
 * The footprint is now declared once and read by both paths. This asserts that
 * the declaration stays true, because a surface added to the installer and not
 * added here would reintroduce exactly the second failure.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const {
  AEXOS_FOOTPRINT,
  findAexosFootprint,
  findLegacyInstalls,
  removeFootprint,
} = require(path.join(REPO_ROOT, 'packages/installer/src/installer/install-footprint.js'));

function project(layout) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'footprint-'));
  for (const rel of layout) {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, 'x');
  }
  return dir;
}

describe('install footprint', () => {
  const temps = [];
  const make = (layout) => {
    const d = project(layout);
    temps.push(d);
    return d;
  };

  afterAll(() => {
    for (const d of temps) fs.rmSync(d, { recursive: true, force: true });
  });

  test('claims the IDE surfaces, not only the core', () => {
    // This is the specific regression: an uninstall that removes .aexos-core
    // and squads while leaving .claude/ behind looks complete and is not.
    const owned = AEXOS_FOOTPRINT.map((i) => i.path);
    expect(owned).toContain('.aexos-core');
    expect(owned).toContain('squads');
    expect(owned).toContain('.claude/commands/AEXOS');
    expect(owned).toContain('.claude/skills/AEXOS');
  });

  test('every entry is namespaced, so removal cannot take a user directory', () => {
    // `.claude` holds the user's own commands and skills next to ours. An entry
    // naming the bare directory would delete their work on uninstall.
    const bare = new Set(['.claude', '.codex', '.gemini', '.cursor', '.github']);
    for (const item of AEXOS_FOOTPRINT) {
      expect(bare.has(item.path)).toBe(false);
    }
  });

  test('reports only what is present', () => {
    const dir = make(['.aexos-core/x', '.claude/skills/AEXOS/y']);
    const found = findAexosFootprint(dir).map((i) => i.path);

    expect(found).toEqual(expect.arrayContaining(['.aexos-core', '.claude/skills/AEXOS']));
    expect(found).not.toContain('squads');
  });
});

describe('legacy detection', () => {
  const temps = [];
  const make = (layout) => {
    const d = project(layout);
    temps.push(d);
    return d;
  };

  afterAll(() => {
    for (const d of temps) fs.rmSync(d, { recursive: true, force: true });
  });

  test('finds an AIOX install by directory and by skill prefix', () => {
    const dir = make([
      '.aiox-core/marker',
      '.claude/commands/AIOX/agents/dev.md',
      '.codex/skills/aiox-dev/SKILL.md',
    ]);

    const { items, brands } = findLegacyInstalls(dir);
    const paths = items.map((i) => i.path);

    expect(brands).toContain('AIOX');
    expect(paths).toContain('.aiox-core');
    expect(paths).toContain('.claude/commands/AIOX');
    // Per-agent skill directories are prefixed, so they are matched not listed.
    expect(paths).toContain('.codex/skills/aiox-dev');
  });

  test('does not mistake this framework for a legacy one', () => {
    const dir = make(['.aexos-core/marker', '.claude/skills/AEXOS/agents/dev/SKILL.md']);
    expect(findLegacyInstalls(dir).items).toHaveLength(0);
  });

  test('a clean project reports nothing', () => {
    expect(findLegacyInstalls(make(['package.json'])).items).toHaveLength(0);
  });

  test('removing the legacy install leaves this one standing', () => {
    // The migration case. Removing both and starting over was the only route
    // before, which is not what someone asking to stop seeing the old commands
    // wants to happen to their working install.
    const dir = make([
      '.aiox-core/marker',
      '.claude/commands/AIOX/dev.md',
      '.aexos-core/marker',
      '.claude/commands/AEXOS/dev.md',
    ]);

    const { items } = findLegacyInstalls(dir);
    const { removed, failed } = removeFootprint(dir, items);

    expect(failed).toEqual([]);
    expect(removed.length).toBeGreaterThan(0);
    expect(findLegacyInstalls(dir).items).toHaveLength(0);
    expect(fs.existsSync(path.join(dir, '.aexos-core'))).toBe(true);
    expect(fs.existsSync(path.join(dir, '.claude/commands/AEXOS'))).toBe(true);
  });

  test('dry run reports without deleting', () => {
    const dir = make(['.aiox-core/marker']);
    const { items } = findLegacyInstalls(dir);

    const { removed } = removeFootprint(dir, items, { dryRun: true });
    expect(removed).toContain('.aiox-core');
    expect(fs.existsSync(path.join(dir, '.aiox-core'))).toBe(true);
  });
});
