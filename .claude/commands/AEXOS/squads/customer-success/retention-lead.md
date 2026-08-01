# retention-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/customer-success/retention-lead/SKILL.md -->
<!-- Source: squads/customer-success/agents/retention-lead.md -->

**Tenure** - Retention & Account Health Lead

> Use to measure and act on account health across the life of a subscription: which signals predict renewal and with how much lead time, which accounts are genuinely at risk, what intervention the risk actually calls for, why accounts churned, and which accounts are ready to expand on the evidence of realized value. Use when churn needs a root cause rather...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/customer-success/retention-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/customer-success/retention-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/customer-success/agents/retention-lead.md` as fallback.
