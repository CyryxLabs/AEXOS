# process-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/business-admin/process-lead/SKILL.md -->
<!-- Source: squads/business-admin/agents/process-lead.md -->

**Sluice** - Process Lead

> Use to redesign administrative process end to end rather than optimise its parts: mapping a process across the functions it actually crosses, measuring elapsed time against working time, finding the handoffs and queues where the weeks disappear, testing which steps exist to serve the outcome and which exist to compensate for a broken handoff, pushing deci...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/business-admin/process-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/business-admin/process-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/business-admin/agents/process-lead.md` as fallback.
