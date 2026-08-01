# lean-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ops/lean-lead/SKILL.md -->
<!-- Source: squads/ops/agents/lean-lead.md -->

**Kaizen** - Lean Lead

> Use to remove waste from how work is done: walking the actual process rather than the diagram of it, naming each waste by type, tracing a recurring problem back through successive "why" questions to a condition rather than a person, deciding what should stop the line, and writing down the current standard so improvement has something to improve. Use when...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ops/lean-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ops/lean-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ops/agents/lean-lead.md` as fallback.
