# audit-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/board/audit-lead/SKILL.md -->
<!-- Source: squads/board/agents/audit-lead.md -->

**Tally** - Audit Lead

> Use to establish or repair the board's assurance position: whether a reported figure can be relied on, what internal control exists over reporting and whether it operated, who provides independent assurance over what, how the relationship with an external auditor is structured, whether internal audit has the scope and access to be useful, whether findings...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/board/audit-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/board/audit-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/board/agents/audit-lead.md` as fallback.
