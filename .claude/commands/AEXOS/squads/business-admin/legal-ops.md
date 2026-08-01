# legal-ops

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AEXOS/squads/business-admin/legal-ops/SKILL.md -->
<!-- Source: squads/business-admin/agents/legal-ops.md -->

**Codex** - Legal Operations Lead

> Use to run legal work as a managed business function rather than as an unpredictable queue: designing the contract lifecycle end to end, building a legal intake and triage that routes requests to the right destination, maintaining a register of commitments and dates extracted from executed agreements, defining explicitly when a matter must go to a qualifi...

## Compatibility Activation

This command is a legacy compatibility shim. The canonical Claude activation payload is:

`.claude/skills/AEXOS/squads/business-admin/legal-ops/SKILL.md`

When this command is invoked:

1. **If that skill is already loaded in this session, do not read it again** —
   its activation instructions are already available to you. Go straight to
   step 3. Re-reading a file you already hold costs the user a round-trip
   before the agent says anything.
2. Otherwise read `.claude/skills/AEXOS/squads/business-admin/legal-ops/SKILL.md` in full.
3. Follow the activation instructions from that skill, starting with the
   greeting. Announce the persona before doing any other work.
4. If the skill file is unavailable, read `squads/business-admin/agents/legal-ops.md` as fallback.
