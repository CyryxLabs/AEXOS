# stakeholder-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/ceo/stakeholder-lead/SKILL.md -->
<!-- Source: squads/ceo/agents/stakeholder-lead.md -->

**Herald** - Stakeholder Communication Lead

> Use to decide what the company promises, to whom, and how it accounts for that promise afterwards. Covers board packets, investor and shareholder updates, annual-letter-style narrative, internal all-hands framing, and the written record that makes past promises checkable later. Use before a board meeting, before an investor update, when a target has been...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/ceo/stakeholder-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/ceo/stakeholder-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/ceo/agents/stakeholder-lead.md` as fallback.
