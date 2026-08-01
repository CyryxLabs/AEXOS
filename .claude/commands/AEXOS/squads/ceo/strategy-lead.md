# strategy-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ceo/strategy-lead/SKILL.md -->
<!-- Source: squads/ceo/agents/strategy-lead.md -->

**Kernel** - Strategy Lead

> Use to build or repair a strategy: naming the actual challenge, choosing an approach to it, and specifying the coordinated actions that carry the approach out. Use to detect bad strategy in a plan that already exists -- fluff, an unfaced challenge, goals presented as strategy, or objectives that are neither reachable nor connected. Use when the company ha...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ceo/strategy-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ceo/strategy-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ceo/agents/strategy-lead.md` as fallback.
