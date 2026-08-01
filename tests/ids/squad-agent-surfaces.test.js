/**
 * Every squad agent must be reachable from Claude.
 *
 * The squads shipped 52 agents that were installed to disk but never exposed:
 * ide-sync reads one source directory, `.aexos-core/development/agents`, so
 * typing `/` listed the twelve core agents and nothing else. These tests hold
 * the two halves of the fix — that a surface exists for every squad agent, and
 * that the namespacing keeps those surfaces from colliding.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SQUADS_DIR = path.join(ROOT, 'squads');
const COMMANDS_ROOT = path.join(ROOT, '.claude', 'commands', 'AEXOS', 'squads');
const SKILLS_ROOT = path.join(ROOT, '.claude', 'skills', 'AEXOS', 'squads');

/** @returns {Array<{squad: string, id: string}>} every agent shipped by a squad */
function squadAgents() {
  if (!fs.existsSync(SQUADS_DIR)) return [];
  const out = [];
  for (const entry of fs.readdirSync(SQUADS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const agentsDir = path.join(SQUADS_DIR, entry.name, 'agents');
    if (!fs.existsSync(agentsDir)) continue;
    for (const file of fs.readdirSync(agentsDir)) {
      if (!file.endsWith('.md') || file.startsWith('test-')) continue;
      out.push({ squad: entry.name, id: path.basename(file, '.md') });
    }
  }
  return out;
}

const AGENTS = squadAgents();

describe('squad agent Claude surfaces', () => {
  it('finds squads that ship agents', () => {
    expect(AGENTS.length).toBeGreaterThan(0);
  });

  // Read every surface once, up front, rather than per assertion. As
  // `describe.each` this was 159 cases each re-reading the disk, and that I/O
  // ran concurrently with the rest of the suite — enough extra contention to
  // push unrelated wall-clock assertions elsewhere over their thresholds.
  // One pass, then assert over the collected result.
  const surfaces = AGENTS.map(({ squad, id }) => {
    const commandPath = path.join(COMMANDS_ROOT, squad, `${id}.md`);
    const skillPath = path.join(SKILLS_ROOT, squad, id, 'SKILL.md');
    const command = fs.existsSync(commandPath) ? fs.readFileSync(commandPath, 'utf8') : null;
    const skill = fs.existsSync(skillPath) ? fs.readFileSync(skillPath, 'utf8') : null;
    return { squad, id, command, skill };
  });

  it('gives every squad agent a slash command', () => {
    const missing = surfaces.filter((s) => s.command === null).map((s) => `${s.squad}/${s.id}`);
    expect(missing).toEqual([]);
  });

  it('gives every squad agent a skill named for its squad', () => {
    const wrong = [];
    for (const { squad, id, skill } of surfaces) {
      if (skill === null) {
        wrong.push(`${squad}/${id}: skill ausente`);
        continue;
      }
      const name = skill.match(/^name:\s*(.+)$/m);
      const actual = name && name[1].trim();
      if (actual !== `aexos-${squad}-${id}`) {
        wrong.push(`${squad}/${id}: name=${actual}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('points every command at a skill that exists', () => {
    const broken = [];
    for (const { squad, id, command } of surfaces) {
      if (command === null) continue; // already reported above
      const declared = command.match(/Canonical Skill:\s*(\S+)/);
      if (!declared) {
        broken.push(`${squad}/${id}: sem "Canonical Skill"`);
      } else if (!fs.existsSync(path.join(ROOT, declared[1]))) {
        broken.push(`${squad}/${id} -> ${declared[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('gives every skill in the project a unique name', () => {
    // Claude resolves skills by name, so a duplicate silently shadows an agent.
    const skillsRoot = path.join(ROOT, '.claude', 'skills');
    const names = new Map();
    (function walk(dir) {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.name === 'SKILL.md') {
          const m = fs.readFileSync(full, 'utf8').match(/^name:\s*(.+)$/m);
          if (!m) continue;
          const name = m[1].trim();
          names.set(name, [...(names.get(name) || []), path.relative(ROOT, full)]);
        }
      }
    })(skillsRoot);

    const duplicates = [...names.entries()].filter(([, files]) => files.length > 1);
    expect(duplicates).toEqual([]);
  });

  it('leaves no surface behind for an agent no squad ships', () => {
    const expected = new Set(AGENTS.map(({ squad, id }) => `${squad}/${id}`));
    const orphans = [];
    if (fs.existsSync(COMMANDS_ROOT)) {
      for (const squad of fs.readdirSync(COMMANDS_ROOT)) {
        const dir = path.join(COMMANDS_ROOT, squad);
        if (!fs.statSync(dir).isDirectory()) continue;
        for (const file of fs.readdirSync(dir)) {
          const id = path.basename(file, '.md');
          if (!expected.has(`${squad}/${id}`)) orphans.push(`${squad}/${id}`);
        }
      }
    }
    expect(orphans).toEqual([]);
  });
});
