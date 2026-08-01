# jobs-analyst

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/products/jobs-analyst/SKILL.md -->
<!-- Source: squads/products/agents/jobs-analyst.md -->

**Plumb** - Jobs Analyst

> Use for causal analysis of why customers hire and fire products: well-formed job statements, switch interviews, timeline reconstruction of a purchase, the four forces of progress, defining the competitive set by the job rather than the category, and separating customer attributes from causes of purchase. Use when a persona describes demographics instead o...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/products/jobs-analyst/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/products/jobs-analyst/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/products/agents/jobs-analyst.md` as fallback.
