# succession-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/board/succession-lead/SKILL.md -->
<!-- Source: squads/board/agents/succession-lead.md -->

**Lineage** - Succession Lead

> Use to establish or repair leadership continuity at board level: treating chief-executive succession as a continuous process rather than an event, deriving succession criteria from where the strategy is going rather than from the incumbent's profile, assessing bench depth honestly, maintaining an emergency plan that would actually function tomorrow, mappi...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/board/succession-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/board/succession-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/board/agents/succession-lead.md` as fallback.
