# method-lead

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/sales/method-lead/SKILL.md -->
<!-- Source: squads/sales/agents/method-lead.md -->

**Forge** - Sales Method Lead

> Use to design the selling conversation itself: the commercial insight that reframes how the buyer understands their own situation, the teaching sequence that delivers it, the tailoring that makes it land with each stakeholder, and the constructive tension that keeps the conversation on the buyer's problem rather than on our feature list. Use when the buye...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/sales/method-lead/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/sales/method-lead/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/sales/agents/method-lead.md` as fallback.
