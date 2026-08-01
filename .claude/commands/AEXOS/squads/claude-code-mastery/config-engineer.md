# config-engineer

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/claude-code-mastery/config-engineer/SKILL.md -->
<!-- Source: squads/claude-code-mastery/agents/config-engineer.md -->

**Sigil** - Claude Code Configuration Engineer

> Use for Claude Code configuration architecture: settings.json hierarchy design, permission rule engineering (allow/ask/deny with Tool(specifier) syntax), CLAUDE.md optimization and @import structuring, .claude/rules/ conditional rule design with paths: frontmatter, sandbox policy definition (filesystem/network), managed/enterprise settings deployment, con...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/claude-code-mastery/config-engineer/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/claude-code-mastery/config-engineer/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/claude-code-mastery/agents/config-engineer.md` as fallback.
