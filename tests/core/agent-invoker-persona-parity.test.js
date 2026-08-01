/**
 * Agent Invoker — persona registry parity (D12)
 *
 * Defect: "Agent registry recognises 7 of 12 personas".
 *
 * `.aexos-core/development/agents/*.md` is the canonical persona roster.
 * `SUPPORTED_AGENTS` in agent-invoker.js is a hand-maintained literal. Before
 * this test the literal listed 7 of the 12 personas, so `sm`, `data-engineer`,
 * `ux-design-expert`, `aexos-master` and `squad-creator` returned
 * "Unknown agent" — including agents that `subagent-dispatcher.js` actively
 * routes work to.
 *
 * This test makes the literal a checked invariant instead of an assumption:
 * adding a persona file without registering it fails the suite.
 *
 * @author @dev (Vulcan)
 */

const path = require('path');
const fs = require('fs');

const {
  AgentInvoker,
  SUPPORTED_AGENTS,
} = require('../../.aexos-core/core/orchestration/agent-invoker');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const AGENTS_DIR = path.join(PROJECT_ROOT, '.aexos-core', 'development', 'agents');

/**
 * Extract the persona `id` from an agent definition file.
 * The id lives under the `agent:` block of the embedded YAML activation notice.
 * @param {string} content - Raw file content
 * @returns {string|null} Persona id, or null if the file declares none
 */
function extractAgentId(content) {
  const match = content.match(/^agent:[\s\S]*?^ {2}id:\s*['"]?([^'"\n]+?)['"]?\s*$/m);
  return match ? match[1].trim() : null;
}

/**
 * Read every canonical persona from disk.
 * @returns {Array<{id: string, file: string}>}
 */
function readCanonicalPersonas() {
  return fs
    .readdirSync(AGENTS_DIR)
    .filter((entry) => entry.endsWith('.md'))
    .map((file) => ({
      file,
      id: extractAgentId(fs.readFileSync(path.join(AGENTS_DIR, file), 'utf8')),
    }));
}

describe('AgentInvoker persona parity with development/agents/ (D12)', () => {
  const personas = readCanonicalPersonas();
  const invoker = new AgentInvoker({ projectRoot: PROJECT_ROOT });

  it('finds persona definition files on disk', () => {
    expect(personas.length).toBeGreaterThan(0);
  });

  it('declares an id in every persona file', () => {
    const missing = personas.filter((persona) => !persona.id).map((persona) => persona.file);
    expect(missing).toEqual([]);
  });

  it('registers every canonical persona in SUPPORTED_AGENTS', () => {
    const registered = Object.keys(SUPPORTED_AGENTS).sort();
    const canonical = personas.map((persona) => persona.id).sort();

    // Fails against the pre-D12 literal: sm, data-engineer, ux-design-expert,
    // aexos-master and squad-creator were absent.
    expect(registered).toEqual(canonical);
  });

  it('accepts every canonical persona via isAgentSupported()', () => {
    const rejected = personas
      .map((persona) => persona.id)
      .filter((id) => !invoker.isAgentSupported(id));

    expect(rejected).toEqual([]);
  });

  it('accepts every canonical persona with the @ prefix', () => {
    const rejected = personas
      .map((persona) => persona.id)
      .filter((id) => !invoker.isAgentSupported(`@${id}`));

    expect(rejected).toEqual([]);
  });

  it('points each registry entry at an existing agent file', () => {
    const broken = Object.values(SUPPORTED_AGENTS).filter(
      (agent) => !fs.existsSync(path.join(AGENTS_DIR, agent.file)),
    );

    expect(broken.map((agent) => agent.file)).toEqual([]);
  });

  it('keeps registry keys, entry names and file basenames aligned', () => {
    for (const [key, agent] of Object.entries(SUPPORTED_AGENTS)) {
      expect(agent.name).toBe(key);
      expect(agent.file).toBe(`${key}.md`);
      expect(typeof agent.displayName).toBe('string');
      expect(agent.displayName.length).toBeGreaterThan(0);
      expect(Array.isArray(agent.capabilities)).toBe(true);
      expect(agent.capabilities.length).toBeGreaterThan(0);
    }
  });

  it('loads every canonical persona definition through _loadAgent()', async () => {
    for (const persona of personas) {
      const agent = await invoker._loadAgent(persona.id);

      expect(agent).not.toBeNull();
      expect(agent.name).toBe(persona.id);
      expect(agent.loaded).toBe(true);
      expect(agent.content.length).toBeGreaterThan(0);
    }
  });

  it('routes the agents that subagent-dispatcher maps work to', () => {
    // subagent-dispatcher.js maps database/db/migration → @data-engineer.
    // That agent used to be rejected by the invoker.
    expect(invoker.isAgentSupported('@data-engineer')).toBe(true);
    // sm owns Phase 1 of the Story Development Cycle (*draft / *create-story).
    expect(invoker.isAgentSupported('@sm')).toBe(true);
  });

  it('still rejects an agent that does not exist', () => {
    expect(invoker.isAgentSupported('nonexistent-agent')).toBe(false);
  });
});
