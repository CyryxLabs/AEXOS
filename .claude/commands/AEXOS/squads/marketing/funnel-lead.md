# funnel-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/marketing/funnel-lead/SKILL.md -->
<!-- Source: squads/marketing/agents/funnel-lead.md -->

**Weir** - Funnel Lead

> Use to decide where a buying path leaks and which step is responsible: the funnel decomposition, per-step readings segmented by traffic source, the leak classification, the value ladder and ascension, the follow-up sequence, and the origin of the traffic itself. Use when conversion is discussed as one number, when a step is about to be rewritten because s...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/marketing/funnel-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/marketing/funnel-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/marketing/agents/funnel-lead.md` as fallback.
