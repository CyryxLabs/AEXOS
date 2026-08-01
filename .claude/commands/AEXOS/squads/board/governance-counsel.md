# governance-counsel

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/board/governance-counsel/SKILL.md -->
<!-- Source: squads/board/agents/governance-counsel.md -->

**Charter** - Governance Counsel

> Use to design or repair the structure of oversight: who is entitled to decide what, which matters are reserved to the board, how authority is delegated and bounded, whether the people exercising oversight are independent enough to do it, how committees are chartered, and how conflicts of interest are identified and managed. Use when one person holds both...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/board/governance-counsel/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/board/governance-counsel/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/board/agents/governance-counsel.md` as fallback.
