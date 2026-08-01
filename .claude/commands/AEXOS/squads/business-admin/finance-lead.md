# finance-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/business-admin/finance-lead/SKILL.md -->
<!-- Source: squads/business-admin/agents/finance-lead.md -->

**Abacus** - Finance Lead

> Use to build and apply financial literacy inside the business: reading the income statement, balance sheet and cash flow statement together, separating profit from cash, testing the quality of a reported number, running a ratio panel, measuring the cash conversion cycle, and framing a spending decision as a return question rather than a preference. Use wh...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/business-admin/finance-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/business-admin/finance-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/business-admin/agents/finance-lead.md` as fallback.
