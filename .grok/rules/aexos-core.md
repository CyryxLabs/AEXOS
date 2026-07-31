# AEXOS × Grok — Compact Rules

These rules apply in every Grok session in this repo. Full constitution: `.aexos-core/constitution.md`.

## Authority (non-negotiable)

| Operation | Exclusive agent | Skill |
|-----------|-----------------|-------|
| `git push`, PR create/merge, releases | devops (Polaris) | `/aexos-devops` |
| Story draft/create | sm (Chronos) | `/aexos-sm` |
| Story validate → Ready | po (Themis) | `/aexos-po` |
| Implementation | dev (Vulcan) | `/aexos-dev` |
| QA gate verdict | qa (Argus) | `/aexos-qa` |
| Architecture decisions | architect (Vega) | `/aexos-architect` |
| Schema/migrations/RLS | data-engineer (Ceres) | `/aexos-data-engineer` |

## Story lifecycle

`Draft → Ready → InProgress → InReview → Done`

SDC: `/aexos-full-sdc` (lean) or `/aexos-sdc` (index). Atomics: `/aexos-validate-story-draft`, `/aexos-develop-story`, `/aexos-review-story`, `/aexos-apply-qa-fixes`, `/aexos-close-story`.

## Quality gates

```bash
npm run lint && npm run typecheck && npm test
```

## Layers (do not corrupt)

- **L1/L2** framework core & templates under `.aexos-core/` — extend carefully; frameworkProtection may deny edits
- **L4** work: `docs/stories/` (project) and/or `docs/framework/epics/` (framework OSS), `packages/`, `squads/`, `tests/`

## Grok entry points

- Agents: `.grok/agents/` (also spawnable as `subagent_type`)
- Skills: `/aexos-*` under `.grok/skills/`
- Source of truth agents: `.aexos-core/development/agents/`

## Portable paths

Never commit machine-specific absolute paths. Use repo-relative paths.
