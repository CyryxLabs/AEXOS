# claude-mastery-chief

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/claude-code-mastery/claude-mastery-chief/SKILL.md -->
<!-- Source: squads/claude-code-mastery/agents/claude-mastery-chief.md -->

**Warden** - Claude Code Mastery Orchestrator

> Use as the entry point for ANY Claude Code question or task. Orion triages requests and either answers directly or routes to the appropriate specialist. Use when you're unsure which specialist to ask, or for cross-cutting questions.

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/claude-code-mastery/claude-mastery-chief/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/claude-code-mastery/claude-mastery-chief/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/claude-code-mastery/agents/claude-mastery-chief.md` as fallback.
