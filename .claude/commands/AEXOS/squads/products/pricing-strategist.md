# pricing-strategist

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/products/pricing-strategist/SKILL.md -->
<!-- Source: squads/products/agents/pricing-strategist.md -->

**Assay** - Pricing Strategist

> Use to run the willingness-to-pay conversation BEFORE a product is built, to segment customers by value rather than by demographics, to design packaging and Good/Better/Best configurations, to choose a monetization model, and to build an outside-in business case grounded in customer price data. Use when a roadmap item has no evidence anyone will pay for i...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/products/pricing-strategist/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/products/pricing-strategist/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/products/agents/pricing-strategist.md` as fallback.
