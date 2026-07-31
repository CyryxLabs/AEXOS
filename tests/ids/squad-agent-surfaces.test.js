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

  describe.each(AGENTS)('$squad/$id', ({ squad, id }) => {
    it('has a slash command', () => {
      expect(fs.existsSync(path.join(COMMANDS_ROOT, squad, `${id}.md`))).toBe(true);
    });

    it('has a skill whose name is namespaced by squad', () => {
      const skill = path.join(SKILLS_ROOT, squad, id, 'SKILL.md');
      expect(fs.existsSync(skill)).toBe(true);
      const name = fs.readFileSync(skill, 'utf8').match(/^name:\s*(.+)$/m);
      expect(name).not.toBeNull();
      expect(name[1].trim()).toBe(`aexos-${squad}-${id}`);
    });

    it('points its command at the skill that exists', () => {
      const command = fs.readFileSync(path.join(COMMANDS_ROOT, squad, `${id}.md`), 'utf8');
      const declared = command.match(/Canonical Skill:\s*(\S+)/);
      expect(declared).not.toBeNull();
      expect(fs.existsSync(path.join(ROOT, declared[1]))).toBe(true);
    });
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
