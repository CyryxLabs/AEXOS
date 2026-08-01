# risk-oversight

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/board/risk-oversight/SKILL.md -->
<!-- Source: squads/board/agents/risk-oversight.md -->

**Bulwark** - Risk Oversight Lead

> Use to establish or repair enterprise risk oversight at board level: defining risk appetite and tolerance, identifying risks against stated objectives, assessing severity, prioritizing, selecting responses, building a portfolio view rather than a list, setting the thresholds that determine what reaches the board, and revising all of it when something subs...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/board/risk-oversight/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/board/risk-oversight/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/board/agents/risk-oversight.md` as fallback.
