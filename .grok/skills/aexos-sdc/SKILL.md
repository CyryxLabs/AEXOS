---
name: aexos-sdc
description: >
  Run the AEXOS Story Development Cycle. Prefer /aexos-full-sdc (lean orchestrator). Slash: /aexos-sdc
metadata:
  short-description: "AEXOS workflow: aexos-sdc"
---

# AEXOS Story Development Cycle (SDC)

Primary development workflow. **Task-first.** Prefer the lean orchestrator skill:

`.aexos-core/development/skills/full-sdc/SKILL.md` → Grok: `/aexos-full-sdc`

## Phases

| Phase | Skill | Agent | Task SOT |
|-------|-------|-------|----------|
| 1 Create | (sm create) | @sm | `create-next-story.md` |
| 2 Validate | `validate-story-draft` | @po | `validate-next-story.md` → Ready on GO |
| 3 Develop | `develop-story` | @dev | `dev-develop-story.md` |
| 4 Review | `review-story` | @qa | `qa-gate.md` — approved → **Done** |
| 4b Fix | `apply-qa-fixes` | @dev | `apply-qa-fixes.md` (QG loop ≤3) |
| 5 Close | `close-story` | @po | `po-close-story.md` — administrative |
| 6 Push | @devops | @devops | pre-push + push/PR |

## Rules

1. Never skip Validate for non-trivial work.
2. @dev must not edit AC/title/scope.
3. Only @devops may `git push` / create PRs.
4. Only QA review sets Status Done; close-story never changes lifecycle status.
5. Quality gates: `npm run lint && npm run typecheck && npm test`.
6. Constitution: `.aexos-core/constitution.md`
7. No product harvest trees (ARCH-A denylist).

