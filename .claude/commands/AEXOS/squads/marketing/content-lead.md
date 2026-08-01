# content-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/marketing/content-lead/SKILL.md -->
<!-- Source: squads/marketing/agents/content-lead.md -->

**Quill** - Content Lead

> Use to decide what gets published, in what form, on what cadence, and how it reaches anyone: defining beats rather than one-off topics, commissioning against a brief, choosing format for the job rather than for the channel, planning distribution as part of the work instead of after it, and maintaining the archive so published work stays true. Use when the...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/marketing/content-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/marketing/content-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/marketing/agents/content-lead.md` as fallback.
