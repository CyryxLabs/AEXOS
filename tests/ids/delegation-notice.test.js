/**
 * Guards the Delegation Notice rule.
 *
 * Highlighting delegated agent names was never a framework behaviour — neither
 * this repository nor the design it derives from instructed it anywhere. It
 * happened when the model chose to format that way and did not happen when it
 * did not, which made the most important line in an orchestration run the least
 * reliable one: the record of who picked up the work.
 *
 * The rule now lives in @aexos-master's definition, with the canonical format,
 * and as a principle on every squad chief. Both halves are load-bearing. A
 * master that announces while chiefs route silently is worse than neither,
 * because the user learns that a squad took the request and never learns which
 * of its five agents is answerable for it.
 *
 * This asserts both, and that nobody quietly drops the rule while editing an
 * agent for some unrelated reason.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const MASTER = path.join(REPO_ROOT, '.aexos-core/development/agents/aexos-master.md');
const REGISTRY = path.join(REPO_ROOT, '.aexos-core/data/squad-registry.yaml');

const MARKER = 'MANDATORY DELEGATION NOTICE';

function agentBlock(file) {
  const m = fs.readFileSync(file, 'utf8').match(/```yaml\n([\s\S]*?)\n```/);
  return m ? yaml.load(m[1]) : null;
}

describe('delegation notice', () => {
  describe('@aexos-master', () => {
    const raw = fs.readFileSync(MASTER, 'utf8');
    const def = agentBlock(MASTER);

    test('carries the rule as a core principle', () => {
      const principles = (def.persona || {}).core_principles || [];
      const found = principles.filter((p) => String(p).includes(MARKER));
      if (found.length === 0) {
        throw new Error(
          'The orchestrator no longer requires a delegation notice. Without it, work is ' +
            'handed to agents silently and the user cannot tell who owns what.',
        );
      }
      expect(found).toHaveLength(1);
    });

    test('specifies the format, not just the obligation', () => {
      // A principle saying "announce delegations" without a shape produces a
      // different shape every run, which is the problem it was meant to fix.
      expect(raw).toContain('Delegation Notice — announce every hand-off');
      expect(raw).toContain('▸ **@{agent-id}** · {Persona} {icon}');
    });

    test('requires persona and icon to be read, not recalled', () => {
      // The twelve personas were renamed once already. An agent quoting a
      // remembered name would announce a hand-off to someone who no longer
      // exists under that name.
      expect(raw).toMatch(/never from memory|rather than from memory/i);
    });

    test('covers the case where nothing is delegated', () => {
      // Silence is ambiguous: it reads identically to a delegation that failed.
      expect(raw).toMatch(/Say when you are NOT delegating|silence reads as/i);
    });
  });

  describe('squad chiefs', () => {
    const registry = yaml.load(fs.readFileSync(REGISTRY, 'utf8'));
    const chiefs = (registry.squads || []).map((s) => [
      `${s.name}/${s.entry_agent}`,
      path.join(REPO_ROOT, 'squads', s.name, 'agents', `${s.entry_agent}.md`),
    ]);

    test('every squad has a chief on disk to check', () => {
      expect(chiefs.length).toBeGreaterThan(0);
      for (const [label, file] of chiefs) {
        if (!fs.existsSync(file)) throw new Error(`${label}: chief definition missing`);
      }
    });

    test.each(chiefs)('%s announces its routing', (label, file) => {
      const def = agentBlock(file);
      const principles = (def.persona || {}).core_principles || [];
      const found = principles.filter((p) => String(p).includes(MARKER));

      if (found.length === 0) {
        throw new Error(
          `${label} routes to its specialists without announcing them. The squad would take ` +
            'a request and never say which of its agents holds it — the one case where naming ' +
            'the owner matters most.',
        );
      }
      expect(found).toHaveLength(1);
    });
  });
});
