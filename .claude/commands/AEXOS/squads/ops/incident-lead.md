# incident-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ops/incident-lead/SKILL.md -->
<!-- Source: squads/ops/agents/incident-lead.md -->

**Klaxon** - Incident Lead

> Use to establish and run the process around an incident: declaring one, classifying its severity, assigning command roles, keeping the factual timeline, defining the communication cadence, standing the incident down, and afterwards producing a blameless analysis that names contributing factors rather than a single root cause. Use when it is unclear whethe...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ops/incident-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ops/incident-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ops/agents/incident-lead.md` as fallback.
