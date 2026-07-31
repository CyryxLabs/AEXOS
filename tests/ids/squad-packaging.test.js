/**
 * Guards that the squads actually reach an installed project.
 *
 * They did not. `squads/` was absent from package.json `files`, so nothing under
 * it was ever published; and `installCyryxCore` walks `.aexos-core` folders
 * only, so even an unpacked copy would not have been placed into a project.
 * Every squad AEXOS ships existed in this repository and in no install of it.
 *
 * Neither half fails loudly. A missing `files` entry produces a smaller tarball,
 * not an error; a scaffolder that is never called produces a project with no
 * `squads/` directory, which looks exactly like a project that has not created
 * any squads yet. So this asserts the whole path: packaged, copied, registered.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SQUADS_DIR = path.join(REPO_ROOT, 'squads');

const {
  scaffoldCoreSquads,
  listSquads,
  NOT_SQUADS,
} = require(path.join(REPO_ROOT, 'packages/installer/src/installer/squad-scaffolder.js'));
const { generateSquadRegistry } = require(
  path.join(REPO_ROOT, 'scripts/generate-squad-registry.js'),
);

/** Squads on disk, by the same rule the scaffolder uses. */
const shipped = listSquads(SQUADS_DIR);

describe('squad packaging', () => {
  test('the repository has squads to ship', () => {
    expect(shipped.length).toBeGreaterThan(0);
  });

  test('package.json publishes squads/', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));
    const publishes = (pkg.files || []).some((f) => f.replace(/\/$/, '') === 'squads');
    if (!publishes) {
      throw new Error(
        'package.json "files" does not include "squads/", so no squad is published to npm ' +
          'and no installed project can ever receive one.',
      );
    }
    expect(publishes).toBe(true);
  });

  test('the installer wires the scaffolder into the install flow', () => {
    // Shipping the files is half of it: something has to place them.
    const wizard = fs.readFileSync(
      path.join(REPO_ROOT, 'packages/installer/src/wizard/index.js'),
      'utf8',
    );
    expect(wizard).toContain('scaffoldCoreSquads');
    expect(wizard).toContain('regenerateSquadRegistry');
  });
});

describe('installing into a project', () => {
  let project;

  beforeEach(() => {
    project = fs.mkdtempSync(path.join(os.tmpdir(), 'aexos-squad-install-'));
  });

  afterEach(() => {
    fs.rmSync(project, { recursive: true, force: true });
  });

  test('every shipped squad lands with its agent definitions', async () => {
    const result = await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });

    expect(result.errors).toEqual([]);
    expect(result.copied.sort()).toEqual([...shipped].sort());

    // Directories are not enough — the definitions have to arrive with them.
    for (const squad of shipped) {
      const agentsDir = path.join(project, 'squads', squad, 'agents');
      expect(fs.existsSync(agentsDir)).toBe(true);
      const agents = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
      expect(agents.length).toBeGreaterThan(0);
    }
  });

  test('the orchestrator can route to them afterwards', async () => {
    // Copying alone leaves the squads unreachable: @aexos-master routes by
    // reading the registry, so an install that skips this step ships squads
    // that exist and cannot be reached.
    await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });

    const registry = generateSquadRegistry(project);
    expect(registry.registry.squad_count).toBe(shipped.length);

    for (const squad of registry.squads) {
      expect(typeof squad.entry_agent).toBe('string');
      expect(squad.entry_agent.length).toBeGreaterThan(0);
      const entryFile = path.join(
        project,
        'squads',
        squad.name,
        'agents',
        `${squad.entry_agent}.md`,
      );
      expect(fs.existsSync(entryFile)).toBe(true);
    }

    expect(fs.existsSync(path.join(project, '.aexos-core/data/squad-registry.yaml'))).toBe(true);
  });

  test('reinstalling preserves squads already in the project', async () => {
    // `squads/` is shared with the user's own private squads, and a shipped one
    // may have been edited deliberately. A second install must not sweep either.
    await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });

    const marker = path.join(project, 'squads', shipped[0], 'LOCAL-EDIT.md');
    fs.writeFileSync(marker, 'edited by the user');

    const second = await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });

    expect(second.copied).toEqual([]);
    expect(second.skipped.sort()).toEqual([...shipped].sort());
    expect(fs.existsSync(marker)).toBe(true);
  });

  test("a user's own squad is left alone and still gets registered", async () => {
    await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });

    const mine = path.join(project, 'squads', 'my-private-squad');
    fs.mkdirSync(path.join(mine, 'agents'), { recursive: true });
    fs.writeFileSync(
      path.join(mine, 'squad.yaml'),
      'name: my-private-squad\nversion: 1.0.0\nsquad:\n  entry_agent: my-chief\n',
    );
    fs.writeFileSync(
      path.join(mine, 'agents', 'my-chief.md'),
      '```yaml\nagent:\n  id: my-chief\n  name: Mine\n  title: My Chief\n```\n',
    );

    const registry = generateSquadRegistry(project);
    const names = registry.squads.map((s) => s.name);
    expect(names).toContain('my-private-squad');
    expect(names.length).toBe(shipped.length + 1);
  });

  test('non-squad directories are never scaffolded', async () => {
    // `_example` is a template for authors. Installing it would put a
    // non-working squad in front of every user.
    const result = await scaffoldCoreSquads(project, { sourceDir: SQUADS_DIR });
    for (const excluded of NOT_SQUADS) {
      expect(result.copied).not.toContain(excluded);
      expect(fs.existsSync(path.join(project, 'squads', excluded))).toBe(false);
    }
  });

  test('an install with no squads in the package still succeeds', async () => {
    // A stripped or partial package legitimately ships none, and that must not
    // fail the install.
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'aexos-empty-src-'));
    try {
      const result = await scaffoldCoreSquads(project, { sourceDir: empty });
      expect(result.success).toBe(true);
      expect(result.copied).toEqual([]);
    } finally {
      fs.rmSync(empty, { recursive: true, force: true });
    }
  });
});
