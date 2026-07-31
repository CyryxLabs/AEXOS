# ACORE Claude Skills Migration Preflight — 2026-05-01

## Summary

This preflight prepares the controlled port of the `sinkra-hub` patterns to `aexos-core`:

- EPIC-109: `commands -> skills`.
- EPIC-117: `agent.md -> SKILL.md` and deterministic activation.

The initial scope is restricted to the 12 AEXOS core agents. Claude command surfaces that are not agent activators remain out of scope.

## Worktree State

| Item | Value |
|------|-------|
| Repo | `<repo-root>/aexos-core` |
| Branch | `feat/story-123.9-codex-skills-bootstrap` |
| HEAD | `94842cd0` |
| Pre-existing changes | `.aexos-core/data/entity-registry.yaml`, `.claude/settings.local.json` |

The pre-existing changes do not belong to this migration and must not be reverted or overwritten.

## Quantitative Baseline

| Metric | Value |
|--------|-------|
| Source-of-truth core agents | 12 |
| Memory files of core agents | 10 |
| Claude AEXOS agent commands | 12 |
| Claude skill directories with `SKILL.md` | 7 |
| Files under `.claude/commands` | 35 |
| References to `.claude/commands` in the repo | 196 |
| References to `activation_type` in the repo | 0 |

## Core Agents

- `aexos-master`
- `analyst`
- `architect`
- `data-engineer`
- `dev`
- `devops`
- `pm`
- `po`
- `qa`
- `sm`
- `squad-creator`
- `ux-design-expert`

## Target Contract

| Role | Path |
|------|------|
| Source of truth | `.aexos-core/development/agents/<agent-id>.md` |
| Canonical Claude skill | `.claude/skills/AEXOS/agents/<agent-id>/SKILL.md` |
| Legacy Claude command | `.claude/commands/AEXOS/agents/<agent-id>.md` |
| Existing Codex skill | `.codex/skills/aexos-<agent-id>/SKILL.md` |

## Out-of-Scope Surfaces

These surfaces remain valid as commands and must not be migrated in this first phase:

- `.claude/commands/synapse/**`
- `.claude/commands/greet.md`
- `.claude/commands/design-system/**`
- `.claude/commands/cohort-squad/**`

## Main Consumers to Adapt in Future Stories

| Area | Files |
|------|-------|
| Sync config | `.aexos-core/core-config.yaml`, `.aexos-core/framework-config.yaml` |
| Sync orchestrator | `.aexos-core/infrastructure/scripts/ide-sync/index.js` |
| Claude transformer | `.aexos-core/infrastructure/scripts/ide-sync/transformers/claude-code.js` |
| Claude validation | `.aexos-core/infrastructure/scripts/validate-claude-integration.js` |
| Doctor | `.aexos-core/core/doctor/checks/ide-sync.js`, `.aexos-core/core/doctor/checks/commands-count.js`, `.aexos-core/core/doctor/checks/skills-count.js` |
| Runtime hook | `.claude/hooks/synapse-engine.cjs`, `.aexos-core/core/synapse/runtime/hook-runtime.js` |
| Activation | `.aexos-core/development/scripts/unified-activation-pipeline.js`, `.aexos-core/development/scripts/agent-config-loader.js` |
| Docs and integration | `docs/ide-integration.md`, `docs/guides/ide-sync-guide.md`, `docs/aexos-agent-flows/*` |

## Recommended Order

1. `ACORE-SKILLS.2`: dual-write of Claude agent skills without removing commands. Completed on 2026-05-01.
2. `ACORE-SKILLS.3`: validators and doctor accepting skills as the canonical surface. Completed on 2026-05-01.
3. `ACORE-SKILLS.4`: `activation_type: pipeline` and a deterministic gate. Completed on 2026-05-01.
4. `ACORE-SKILLS.5`: semantic cleanup of the legacy AEXOS agent commands. Completed on 2026-05-01.
5. `ACORE-SKILLS.6`: evaluate an optional expansion to `squads/*/agents`. Completed on 2026-05-01.

## ACORE-SKILLS.2 Result

- `npm run sync:ide:claude` generates 12 legacy commands and 12 skills in `.claude/skills/AEXOS/agents/<agent-id>/SKILL.md`.
- `.claude/commands/AEXOS/agents/*.md` remains in place as transitional compatibility.
- `.gitignore` opens a narrow exception to version only the new AEXOS Claude agent skills.
- `validate:codex-skills` was adjusted so that generated and valid squad-chief skills are not treated as orphans, while still failing for real orphans.

## ACORE-SKILLS.3 Result

- `validate:claude-sync` validates 24 expected files: 12 legacy commands and 12 Claude skills.
- `validate:claude-integration` requires agent skills and keeps commands as a legacy surface with a warning if they are missing.
- The `ide-sync` doctor check reports skills and commands separately.
- The `skills-count` doctor check counts `SKILL.md` recursively and confirms `12/12` AEXOS agent skills.

## ACORE-SKILLS.4 Result

- The 12 Claude agent skills declare `activation_type: pipeline`.
- `validate:claude-integration` fails if the field is missing from any core agent skill.
- The `UserPromptSubmit` hook was audited and left unchanged because it does not receive a structured skill activation event.

## ACORE-SKILLS.5 Result

- The 12 commands in `.claude/commands/AEXOS/agents/*.md` are compatibility shims.
- Each shim points to the canonical `SKILL.md` and keeps a fallback to `.aexos-core/development/agents/<agent-id>.md`.
- The full-payload transformer remains available for targets that do not use the Claude skills-first surface.

## ACORE-SKILLS.6 Result

- Squad scope audited: 1 local squad and 8 squad agent files.
- The expansion to squads was not implemented in this migration because there is still no Claude namespace contract for `squads/*/agents`.
- Recommendation: create a separate `ACORE-SQUAD-SKILLS` epic if the intent is to project Claude squad skills beyond the 12 core agents.

## Final Gates Re-run on 2026-05-03

- `npm run sync:ide:claude` — 12 agents, 12 skills, 24 files synced.
- `npm run validate:claude-sync` — PASS, 24 expected / 24 synced.
- `node .aexos-core/infrastructure/scripts/validate-claude-integration.js` — PASS, 12 skills + 12 legacy commands.
- `npm run sync:skills:codex` — generated 12 local Codex skills.
- `npm run validate:codex-skills` — PASS, 12 skills checked.
- `git diff --check` — PASS.

## Recommended Next Epic

If the intent is to expand the same pattern to `squads/*/agents`, open a separate `ACORE-SQUAD-SKILLS` epic before implementing. That epic must decide the Claude namespace, coverage across all agents vs entry chiefs, source validation and the relationship between `bootstrap.js`, `sync:skills:codex` and `sync:ide:claude`.
