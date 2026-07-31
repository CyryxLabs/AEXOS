/**
 * Guards the manifest against the definitions it claims to describe.
 *
 * A squad has two records of the same fact: the manifest (`squad.yaml`) and the
 * agent definitions it lists. Nothing forced them to agree, and they did not:
 * the Products manifest shipped with four icons that no agent actually used, and
 * one of those phantom icons collided with an agent in another squad. The squad
 * still worked — every surface that matters reads the definition — so the drift
 * was invisible.
 *
 * That is the failure mode this covers. The manifest is what the orchestrator,
 * the installer and the registry read when deciding what exists; the definition
 * is what the user actually meets. When they disagree, a squad is advertised as
 * one thing and behaves as another, and no existing check looks.
 *
 * The definition is authoritative for an agent's own identity. The manifest must
 * follow it.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SQUADS_DIR = path.join(REPO_ROOT, 'squads');
const MANIFEST_NAMES = ['squad.yaml', 'config.yaml'];

function extractYaml(content) {
  const m = content.match(/```yaml\n([\s\S]*?)\n```/);
  return m ? m[1] : null;
}

function loadDefinition(file) {
  if (!fs.existsSync(file)) return null;
  const block = extractYaml(fs.readFileSync(file, 'utf8'));
  if (!block) return null;
  try {
    return (yaml.load(block) || {}).agent || null;
  } catch {
    return null; // squad-agent-definitions.test.js owns parse failures
  }
}

function collectSquads() {
  if (!fs.existsSync(SQUADS_DIR)) return [];
  return fs
    .readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const dir = path.join(SQUADS_DIR, e.name);
      const manifestPath = MANIFEST_NAMES.map((n) => path.join(dir, n)).find((p) =>
        fs.existsSync(p),
      );
      if (!manifestPath) return null;
      let manifest;
      try {
        manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
      } catch {
        return null; // reported by the registry test
      }
      return { name: e.name, dir, manifest: manifest || {} };
    })
    .filter(Boolean);
}

const squads = collectSquads();

describe('squad manifest agreement', () => {
  test('squads were found', () => {
    expect(squads.length).toBeGreaterThan(0);
  });

  describe.each(squads.map((s) => [s.name, s]))('%s', (_label, squad) => {
    const entries = Object.entries(squad.manifest.agents || {});

    test('every agent the manifest lists exists on disk', () => {
      const missing = entries
        .filter(([id, meta]) => {
          const rel = (meta && meta.file) || path.join('agents', `${id}.md`);
          return !fs.existsSync(path.join(squad.dir, rel));
        })
        .map(([id]) => id);

      if (missing.length) {
        throw new Error(
          `${squad.name}: the manifest advertises agents with no definition on disk, so ` +
            `anything routing from the manifest dead-ends: ${missing.join(', ')}`,
        );
      }
      expect(missing).toHaveLength(0);
    });

    test('every definition on disk is listed in the manifest', () => {
      const agentsDir = path.join(squad.dir, 'agents');
      if (!fs.existsSync(agentsDir)) return;
      const listed = new Set(entries.map(([id]) => id));
      const orphans = fs
        .readdirSync(agentsDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => path.basename(f, '.md'))
        .filter((id) => !listed.has(id));

      if (orphans.length) {
        throw new Error(
          `${squad.name}: these agents exist but the manifest does not list them, so they ` +
            `ship without ever being discoverable: ${orphans.join(', ')}`,
        );
      }
      expect(orphans).toHaveLength(0);
    });

    test('manifest persona, icon and citation match the definition', () => {
      const drift = [];
      for (const [id, meta] of entries) {
        const rel = (meta && meta.file) || path.join('agents', `${id}.md`);
        const def = loadDefinition(path.join(squad.dir, rel));
        if (!def) continue; // absence is the previous test's failure to report

        if (meta.persona && def.name && meta.persona !== def.name) {
          drift.push(`${id}: manifest persona "${meta.persona}" vs definition "${def.name}"`);
        }
        if (meta.icon && def.icon && meta.icon !== def.icon) {
          drift.push(`${id}: manifest icon ${meta.icon} vs definition ${def.icon}`);
        }
        // `based_on` is the attribution the squads are built on, and it drifted
        // in both directions: the manifest carried Portuguese where the agent
        // carried English, and four manifest citations had dropped a co-author
        // the agent file named. A citation that disagrees with itself is worse
        // than a missing one — it looks checked.
        if (meta.based_on && def.based_on && meta.based_on !== def.based_on) {
          drift.push(
            `${id}: manifest cites "${meta.based_on}" but the agent cites "${def.based_on}"`,
          );
        }
      }

      if (drift.length) {
        throw new Error(
          `${squad.name}: the manifest describes an identity the agent does not have. The ` +
            'definition is authoritative — update the manifest to follow it:\n  ' +
            drift.join('\n  '),
        );
      }
      expect(drift).toHaveLength(0);
    });

    test('the entry_agent is one of the squad agents', () => {
      const entry = (squad.manifest.squad || {}).entry_agent;
      if (!entry) return; // the registry test owns entry_agent presence
      const ids = entries.map(([id]) => id);
      if (!ids.includes(entry)) {
        throw new Error(
          `${squad.name}: entry_agent "${entry}" is not among the squad's agents ` +
            `(${ids.join(', ')}), so the front door opens onto nothing.`,
        );
      }
      expect(ids).toContain(entry);
    });
  });

  test('icons are unique across every squad', () => {
    // The icon is how an agent is recognised in a greeting and in the roster.
    // Two agents sharing one is not fatal, but it makes the roster ambiguous at
    // exactly the moment a user is trying to tell them apart.
    const seen = new Map();
    const clashes = [];
    for (const squad of squads) {
      for (const [id, meta] of Object.entries(squad.manifest.agents || {})) {
        if (!meta || !meta.icon) continue;
        const where = `${squad.name}/${id}`;
        if (seen.has(meta.icon)) clashes.push(`${meta.icon}: ${seen.get(meta.icon)} and ${where}`);
        else seen.set(meta.icon, where);
      }
    }

    if (clashes.length) {
      throw new Error('Two agents share one icon, making the roster ambiguous:\n  ' + clashes.join('\n  '));
    }
    expect(clashes).toHaveLength(0);
  });

  test('every cross-squad boundary points at something that exists', () => {
    // These references are written by hand and never executed, so a typo in one
    // is invisible: the squad still works, and the boundary it was supposed to
    // record simply is not there. The first draft of this data referenced
    // "@board:governance-lead", which does not exist — the real id is
    // governance-counsel.
    const byName = new Map(
      squads.map((s) => [s.name, new Set(Object.keys(s.manifest.agents || {}))]),
    );
    const coreDir = path.join(REPO_ROOT, '.aexos-core', 'development', 'agents');
    const coreAgents = fs.existsSync(coreDir)
      ? new Set(
        fs
          .readdirSync(coreDir)
          .filter((f) => f.endsWith('.md'))
          .map((f) => path.basename(f, '.md')),
      )
      : new Set();

    const dangling = [];
    for (const squad of squads) {
      const boundary = ((squad.manifest.cross_cutting || {}).cross_squad_boundary || {}).defers_to;
      if (!boundary) continue;

      for (const ref of Object.keys(boundary)) {
        const target = ref.replace(/^@/, '');
        const [squadName, agentId] = target.split(':');

        if (!agentId) {
          // A bare "@name" is either a whole squad or a core agent.
          if (!byName.has(squadName) && !coreAgents.has(squadName)) {
            dangling.push(`${squad.name}: "${ref}" is neither a squad nor a core agent`);
          }
          continue;
        }
        if (!byName.has(squadName)) {
          dangling.push(`${squad.name}: "${ref}" names squad "${squadName}", which does not exist`);
        } else if (!byName.get(squadName).has(agentId)) {
          dangling.push(
            `${squad.name}: "${ref}" — squad "${squadName}" has no agent "${agentId}" ` +
              `(has: ${[...byName.get(squadName)].join(', ')})`,
          );
        }
      }
    }

    if (dangling.length) {
      throw new Error(
        'A declared boundary points at nothing, so it records no constraint at all:\n  ' +
          dangling.join('\n  '),
      );
    }
    expect(dangling).toHaveLength(0);
  });

  test('icons are unique across every definition, squads and core alike', () => {
    // The manifest check above cannot see this: a squad icon can agree with its
    // own manifest and still collide with a core agent, which is where the
    // ambiguity actually bites — the core roster and the squad roster render
    // side by side on the welcome screen. Two collisions were live when this was
    // written, both between a squad agent and an agent it never shares a
    // manifest with.
    const seen = new Map();
    const clashes = [];

    const record = (file, where) => {
      const block = extractYaml(fs.readFileSync(file, 'utf8'));
      if (!block) return;
      let agent;
      try {
        agent = (yaml.load(block) || {}).agent;
      } catch {
        return; // parse failures belong to squad-agent-definitions.test.js
      }
      if (!agent || !agent.icon) return;
      if (seen.has(agent.icon)) clashes.push(`${agent.icon}: ${seen.get(agent.icon)} and ${where}`);
      else seen.set(agent.icon, where);
    };

    const coreDir = path.join(REPO_ROOT, '.aexos-core', 'development', 'agents');
    if (fs.existsSync(coreDir)) {
      for (const file of fs.readdirSync(coreDir).filter((f) => f.endsWith('.md'))) {
        record(path.join(coreDir, file), `core/${path.basename(file, '.md')}`);
      }
    }

    for (const squad of squads) {
      const agentsDir = path.join(squad.dir, 'agents');
      if (!fs.existsSync(agentsDir)) continue;
      for (const file of fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'))) {
        record(path.join(agentsDir, file), `${squad.name}/${path.basename(file, '.md')}`);
      }
    }

    if (clashes.length) {
      throw new Error(
        'Two agents render with the same icon on the same screen:\n  ' + clashes.join('\n  '),
      );
    }
    expect(clashes).toHaveLength(0);
  });
});
