# discovery-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/products/discovery-lead/SKILL.md -->
<!-- Source: squads/products/agents/discovery-lead.md -->

**Sonar** - Continuous Discovery Lead

> Use for structuring continuous product discovery: opportunity solution trees, weekly customer interview cadence, story-based interviewing, experience mapping, opportunity mapping and sizing, assumption mapping, and small fast assumption tests before build. Use when a team is about to build something with no evidence, when a roadmap is a list of features i...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/products/discovery-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/products/discovery-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/products/agents/discovery-lead.md` as fallback.
