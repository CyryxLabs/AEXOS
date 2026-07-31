---
metadata:
  short-description: "AEXOS workflow: aexos-full-sdc"
name: aexos-full-sdc
description: >
  EXECUTE lean Full Story Development Cycle for one story: plan via CLI,
  run validate → develop → review (QG loop) → close with Sequence Lock,
  durable progress under .aexos/sdc/. Use when: full-sdc, full cycle, SDC, run story end-to-end.
user-invocable: true
argument-hint: "{story-path} [yolo|interactive]"
agent: aexos-master
---

# full-sdc (lean EXECUTE)

Orchestrator that **runs** the SDC for one story. Atomic skills + task files do phase work; CLI owns plan/verify/progress.

**Not in scope:** hub full-sdc (~2k LOC), worktree product registry, hub conductor adapters, product harvest trees, product deploy hosts.

## Invocation

```
/full-sdc {story-path} [yolo|interactive]
# or
aexos sdc plan {story-path} --mode yolo
```

Default mode: `interactive`.

Automated/yolo dispatch additionally requires a positive explicit
`AEXOS_MODEL_BUDGET_CEILING_USD`; the story path and full child intent are
validated before every model call.

Before each direct subagent/model spawn, materialize the exact outgoing prompt
and context in isolated files and run this mandatory mechanical gate:

```bash
aexos sdc preflight "{story-path}" \
  --task "{phase-task}" \
  --budget-usd "$AEXOS_MODEL_BUDGET_CEILING_USD" \
  --intent-file "{exact-child-intent-file}" \
  --context-file "{exact-child-context-file}"
```

Continue only on exit `0`. Exit `5` is a governance rejection and the model or
subagent must not be invoked. Pass the same bytes from these files to the child;
never rebuild or enrich the prompt after preflight.

## CLI (mechanical — always use)

```bash
# 1) Init / resume durable state
aexos sdc plan {story-path} --mode {yolo|interactive}

# 2) What to run next
aexos sdc next {story-path}

# 3) After each phase completes
aexos sdc verify {story-path} {phase} --mark

# 4) Inspect
aexos sdc status {story-id}
```

State file: `.aexos/sdc/{story-id}/state.json` (runtime, gitignored under `.aexos/`).

Phases: `validate` → `develop` → `review` → `apply_qa_fixes` (loop) → `close`

## Phase map

| # | Phase | Skill | Agent | Task SOT |
|---|-------|-------|-------|----------|
| 1 | validate | `validate-story-draft` | @po | `validate-next-story.md` |
| 2 | develop | `develop-story` | @dev / executor | `dev-develop-story.md` |
| 3 | review | `review-story` | @qa / quality_gate | `qa-gate.md` |
| 3b | apply_qa_fixes | `apply-qa-fixes` | @dev | `apply-qa-fixes.md` |
| 4 | deploy | — | — | **skip** (no deploy config) |
| 5 | close | `close-story` | @po | `po-close-story.md` (administrative only) |

Skill SOT: `.aexos-core/development/skills/<name>/SKILL.md`

## EXECUTE loop (orchestrator MUST follow)

```
0. aexos sdc plan {story} --mode {mode}
1. LOOP:
   a. aexos sdc next {story}  → phase + skill path
   b. IF no next phase → DONE (status completed)
   c. Load skill SKILL.md + its task SOT without executing phase work
   d. Materialize the exact payload for inline or spawned phase execution
   e. Run `aexos sdc preflight` over that exact payload; HALT on failure
   f. Execute inline or spawn the phase only after preflight succeeds
   g. IF yolo: autonomous; IF interactive: report + pause on decisions
   h. aexos sdc verify {story} {phase} --mark
   i. IF phase=review and verdict FAIL:
        IF mode=interactive and no explicit fix approval:
             report FAIL and pause (do not invoke apply-qa-fixes)
        IF mode=yolo or explicit fix approval:
             CLI selects apply_qa_fixes automatically
             run apply-qa-fixes skill → verify apply_qa_fixes --mark
             IF apply_qa_fixes verify FAIL:
                  HALT and escalate human without returning to review or incrementing qgIterations
             IF apply_qa_fixes verify PASS:
                  CLI returns to review and increments qgIterations
                  IF the third re-review fails → HALT and escalate human
   j. ELSE IF verify FAIL → HALT (do not advance)
   k. ELSE continue loop
2. QA sets Done on PASS/CONCERNS/WAIVED; close-story only finalizes bookkeeping
3. Push/PR: hand off @devops — never push from this skill
```

### Grok / multi-agent dispatch (preferred when available)

For each phase, spawn the matching persona (or run inline if spawn unavailable):

| Phase | `spawn_subagent` type (Grok) | Prompt seed |
|-------|------------------------------|-------------|
| validate | `aexos-po` | Execute skill validate-story-draft on {path}; mode={mode} |
| develop | `aexos-dev` | Execute skill develop-story on {path}; mode={mode} |
| review | `aexos-qa` | Execute skill review-story on {path} |
| apply_qa_fixes | `aexos-dev` | Execute skill apply-qa-fixes on {path} |
| close | `aexos-po` | Execute skill close-story on {path} |

Before dispatch, declare the shared budget ceiling, bind `{path}`, materialize
the exact child prompt/context, and run the `aexos sdc preflight` command above
against those exact files. Pass those same bytes to the child; never rebuild or
enrich the payload after preflight. After each subagent returns: run
`aexos sdc verify … --mark` in the **main** session (orchestrator owns the lock).

## Sequence Lock (soft + CLI)

1. Phases **in order**. No N+1 until verify of N passes (or skip).
2. **Only QA review sets Status Done.**
3. Close requires the approved QA verdict and an already-Done story.
4. QG loop max **3** (`maxQgIterations` in state).
5. Anti-self-validation: executor ≠ quality_gate.

## Post-phase verification (CLI-enforced)

| Phase | On disk |
|-------|---------|
| validate | Status Ready+ |
| develop | work evidence; not Done |
| review | QA verdict or gate file; approved → Done, FAIL → InProgress |
| apply_qa_fixes | not Done |
| close | Status already Done; administrative finalization only |

## Modes

| Mode | Behavior |
|------|----------|
| `interactive` | Report between phases; stop on blockers |
| `yolo` | Autonomous between phases; stop only on absolute blockers / circuit breaker |

## Explicitly non-ported

- Worktree auto-spawn / registry / GC
- Full auto-ACK matrix (v1 = CLI state + checklists)
- Product deploy targets

## Strip checklist

- [x] Skills invoke tasks only
- [x] CLI First progress/verify
- [x] No product harvest trees in protocol
