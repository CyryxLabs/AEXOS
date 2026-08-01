# qualification-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/sales/qualification-lead/SKILL.md -->
<!-- Source: squads/sales/agents/qualification-lead.md -->

**Sieve** - Qualification Lead

> Use to establish whether a deal is real and, if it is, what is missing before it can close: quantifying the metric the buyer cares about, reaching the economic buyer, surfacing the decision criteria the buyer will actually score against, mapping the decision process step by step, identifying pain the buyer states in their own words, and testing whether th...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/sales/qualification-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/sales/qualification-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/sales/agents/qualification-lead.md` as fallback.
