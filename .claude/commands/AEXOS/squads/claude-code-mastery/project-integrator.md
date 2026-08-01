# project-integrator

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/claude-code-mastery/project-integrator/SKILL.md -->
<!-- Source: squads/claude-code-mastery/agents/project-integrator.md -->

**Conduit** - Project Integration Architect

> Use for integrating Claude Code and AEXOS into new or existing repositories. Setting up CLAUDE.md files, repository structure optimization, CI/CD headless mode configuration, git workflow integration, brownfield project onboarding, multi-project management, and external tool integration via MCP. NOT for: Code implementation -> Use @dev. Database design ->...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/claude-code-mastery/project-integrator/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/claude-code-mastery/project-integrator/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/claude-code-mastery/agents/project-integrator.md` as fallback.
