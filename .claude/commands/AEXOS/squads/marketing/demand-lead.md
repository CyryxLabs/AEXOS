# demand-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/marketing/demand-lead/SKILL.md -->
<!-- Source: squads/marketing/agents/demand-lead.md -->

**Cadence** - Demand Lead

> Use to decide how demand is created and funded over time: the split between brand building and sales activation, share of voice against competitors, the effect window over which each kind of spend pays back, and the diagnosis of short-termism when activation metrics look healthy while the business does not. Use when a budget is being set or cut, when perf...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/marketing/demand-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/marketing/demand-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/marketing/agents/demand-lead.md` as fallback.
