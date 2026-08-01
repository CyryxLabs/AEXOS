# capital-allocator

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ceo/capital-allocator/SKILL.md -->
<!-- Source: squads/ceo/agents/capital-allocator.md -->

**Ledger** - Capital Allocator

> Use to decide where cash goes and what it must return: reinvestment in existing operations, acquisitions, dividends, debt paydown, or repurchasing the company's own shares -- compared against each other at the same hurdle rate rather than evaluated one at a time. Use when a budget is being set, when cash has accumulated with no stated destination, when an...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ceo/capital-allocator/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ceo/capital-allocator/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ceo/agents/capital-allocator.md` as fallback.
