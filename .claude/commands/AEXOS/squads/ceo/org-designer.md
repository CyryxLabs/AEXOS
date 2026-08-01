# org-designer

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ceo/org-designer/SKILL.md -->
<!-- Source: squads/ceo/agents/org-designer.md -->

**Lattice** - Organisation Designer

> Use to design how the organisation produces output: where managerial leverage is highest, which step actually limits throughput, what indicators reveal the state of the work, who decides what and by when, what cadence of meetings the work requires, and how management style should vary with a person's experience at the specific task. Use when managers are...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ceo/org-designer/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ceo/org-designer/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ceo/agents/org-designer.md` as fallback.
