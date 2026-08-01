# advocacy-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/customer-success/advocacy-lead/SKILL.md -->
<!-- Source: squads/customer-success/agents/advocacy-lead.md -->

**Chorus** - Advocacy & Loyalty Lead

> Use to measure willingness to recommend, operate the closed loop on what promoters and detractors actually said, build a reference and referral program on accounts that have really realized value, and state honestly what a loyalty score can and cannot support. Use when a score has moved and nobody can explain why, when survey results are being read as a v...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/customer-success/advocacy-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/customer-success/advocacy-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/customer-success/agents/advocacy-lead.md` as fallback.
