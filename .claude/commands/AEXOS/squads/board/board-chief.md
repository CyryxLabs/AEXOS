# board-chief

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/board/board-chief/SKILL.md -->
<!-- Source: squads/board/agents/board-chief.md -->

**Chair** - Board Squad Chief

> Use as the entry point for ANY board-level question when the right specialist is not obvious. Chair triages the request, names which oversight discipline actually owns it, routes to the specialist, and keeps the board's outputs coherent with each other. Use to set a board or committee agenda, to decide whether a matter belongs to the board at all or to ma...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/board/board-chief/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/board/board-chief/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/board/agents/board-chief.md` as fallback.
