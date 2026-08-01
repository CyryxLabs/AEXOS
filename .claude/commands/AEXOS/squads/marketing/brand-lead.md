# brand-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/marketing/brand-lead/SKILL.md -->
<!-- Source: squads/marketing/agents/brand-lead.md -->

**Salience** - Brand Lead

> Use to decide how the brand grows: mental availability (being thought of in more buying situations, by more category buyers), physical availability (being easy to find and easy to buy), penetration before loyalty, and the distinctive assets that let advertising get credited to the right brand. Use when growth plans assume loyalty will do the work, when ta...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/marketing/brand-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/marketing/brand-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/marketing/agents/brand-lead.md` as fallback.
