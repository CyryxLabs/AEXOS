# onboarding-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/customer-success/onboarding-lead/SKILL.md -->
<!-- Source: squads/customer-success/agents/onboarding-lead.md -->

**Threshold** - Onboarding & Activation Lead

> Use to define, design, measure or repair the path from signature to first realized value: what first value actually is for this product, which milestones mark the way to it, how long it takes today, where accounts stall, and what the handover from the sale must guarantee. Use when new accounts go quiet after kickoff, when churn concentrates in the first m...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/customer-success/onboarding-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/customer-success/onboarding-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/customer-success/agents/onboarding-lead.md` as fallback.
