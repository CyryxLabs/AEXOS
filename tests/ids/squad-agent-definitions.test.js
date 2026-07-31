/**
 * Guards the agent definitions that ship inside squads.
 *
 * `validate-agents.js` scans only `.aexos-core/development/agents` — squads are
 * outside its reach. That gap is not theoretical: `claude-code-mastery`'s
 * swarm-orchestrator shipped with an unparseable YAML block (a `- "term" (gloss)`
 * sequence entry, which is invalid because nothing may follow a closing quote),
 * and it had been present since that squad was written. Nothing caught it because
 * nothing looked.
 *
 * A squad agent whose YAML does not parse cannot be activated at all, so this is
 * the cheapest possible guard for the most total failure.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SQUADS_DIR = path.join(REPO_ROOT, 'squads');

/** Same extraction the framework validator uses. */
function extractYaml(content) {
  const m = content.match(/```yaml\n([\s\S]*?)\n```/);
  return m ? m[1] : null;
}

function collectSquadAgents() {
  if (!fs.existsSync(SQUADS_DIR)) return [];
  const found = [];
  for (const squad of fs.readdirSync(SQUADS_DIR)) {
    const agentsDir = path.join(SQUADS_DIR, squad, 'agents');
    if (!fs.existsSync(agentsDir)) continue;
    for (const file of fs.readdirSync(agentsDir)) {
      if (!file.endsWith('.md')) continue;
      found.push({ squad, file, full: path.join(agentsDir, file) });
    }
  }
  return found;
}

const agents = collectSquadAgents();

describe('squad agent definitions', () => {
  test('at least one squad ships agents', () => {
    expect(agents.length).toBeGreaterThan(0);
  });

  describe.each(agents.map((a) => [`${a.squad}/${a.file}`, a]))('%s', (_label, agent) => {
    const content = fs.readFileSync(agent.full, 'utf8');
    const block = extractYaml(content);

    test('carries a fenced YAML definition block', () => {
      expect(block).not.toBeNull();
    });

    test('the YAML block parses', () => {
      let parsed;
      try {
        parsed = yaml.load(block);
      } catch (error) {
        throw new Error(
          `${agent.squad}/${agent.file}: YAML block does not parse — the agent cannot be ` +
            `activated at all.\n  ${error.reason} at line ${error.mark && error.mark.line}`,
        );
      }
      expect(parsed).toBeTruthy();
    });

    test('declares agent.id matching its filename, plus name and title', () => {
      const parsed = yaml.load(block);
      const expectedId = path.basename(agent.file, '.md');
      expect(parsed.agent).toBeTruthy();
      expect(parsed.agent.id).toBe(expectedId);
      expect(typeof parsed.agent.name).toBe('string');
      expect(parsed.agent.name.length).toBeGreaterThan(0);
      expect(typeof parsed.agent.title).toBe('string');
      expect(parsed.agent.title.length).toBeGreaterThan(0);
    });
  });

  test('persona names are unique across every squad and the core', () => {
    const names = new Map();
    const clashes = [];

    const record = (name, where) => {
      if (!name) return;
      if (names.has(name)) clashes.push(`${name}: ${names.get(name)} and ${where}`);
      else names.set(name, where);
    };

    const coreDir = path.join(REPO_ROOT, '.aexos-core', 'development', 'agents');
    if (fs.existsSync(coreDir)) {
      for (const file of fs.readdirSync(coreDir).filter((f) => f.endsWith('.md'))) {
        const block = extractYaml(fs.readFileSync(path.join(coreDir, file), 'utf8'));
        if (!block) continue;
        let parsed;
        try {
          parsed = yaml.load(block);
        } catch {
          continue; // validate-agents.js owns the core; not this test's failure to report
        }
        record(parsed.agent && parsed.agent.name, `core/${file}`);
      }
    }

    for (const agent of agents) {
      const block = extractYaml(fs.readFileSync(agent.full, 'utf8'));
      if (!block) continue;
      let parsed;
      try {
        parsed = yaml.load(block);
      } catch {
        continue; // reported by the per-agent test above
      }
      record(parsed.agent && parsed.agent.name, `${agent.squad}/${agent.file}`);
    }

    if (clashes.length) {
      throw new Error(
        'Two agents answer to the same persona name, so a user addressing one cannot be ' +
          'routed unambiguously:\n  ' +
          clashes.join('\n  '),
      );
    }
    expect(clashes).toHaveLength(0);
  });
});
