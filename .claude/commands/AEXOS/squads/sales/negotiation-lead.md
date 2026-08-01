# negotiation-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/sales/negotiation-lead/SKILL.md -->
<!-- Source: squads/sales/agents/negotiation-lead.md -->

**Tether** - Negotiation Lead

> Use to prepare and run a commercial negotiation: mapping what the counterparty actually needs beneath what they are asking for, designing labels and calibrated questions that surface it, structuring concessions so each one buys something, reading deadlines and leverage honestly, handling procurement, and defining the walk-away before the conversation rath...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/sales/negotiation-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/sales/negotiation-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/sales/agents/negotiation-lead.md` as fallback.
