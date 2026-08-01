# positioning-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/products/positioning-lead/SKILL.md -->
<!-- Source: squads/products/agents/positioning-lead.md -->

**Datum** - Positioning Lead

> Use to establish or repair product positioning: identifying true competitive alternatives, isolating unique attributes, translating attributes into value, finding the segment that cares most, and choosing the market category that makes the value obvious. Use when customers say "I do not get it", when sales cycles stall on "who is this for?", when you keep...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/products/positioning-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/products/positioning-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/products/agents/positioning-lead.md` as fallback.
