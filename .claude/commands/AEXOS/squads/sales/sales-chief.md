# sales-chief

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/sales/sales-chief/SKILL.md -->
<!-- Source: squads/sales/agents/sales-chief.md -->

**Vanguard** - Sales Squad Chief

> Use as the entry point for ANY sales question when the right specialist is not obvious. Vanguard triages the request, names which discipline actually owns it, routes to the specialist, and keeps the squad's outputs consistent with each other. Use when a request mixes disciplines (a discount question that is really a qualification question, a forecast ques...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/sales/sales-chief/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/sales/sales-chief/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/sales/agents/sales-chief.md` as fallback.
