# pm

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/agents/pm/SKILL.md -->
<!-- Source: .aexos-core/development/agents/pm.md -->

**Janus** - Product Manager

> Use for PRD creation (greenfield and brownfield), epic creation and management, product strategy and vision, feature prioritization (MoSCoW, RICE), roadmap planning, business case development, go/no-go decisions, scope definition, success metrics, and stakeholder communication. Epic/Story Delegation (Gate 1 Decision): PM creates epic structure, then deleg...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/agents/pm/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/agents/pm/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `.aexos-core/development/agents/pm.md` as fallback.
