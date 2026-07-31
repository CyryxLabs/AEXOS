---
name: wave-execute
description: >
  EXECUTE a lean wave — plan story DAG + file-ownership batches via CLI,
  dispatch full-sdc per story, fan-in check, hand off merge to @devops.
  Use when: wave-execute, run wave, epic wave, parallel stories SDC.
user-invocable: true
argument-hint: "{wave-id} --stories s1.md,s2.md [yolo|interactive] [--dry-run] [--no-confirm]"
agent: aexos-master
depends_on: ["full-sdc"]
---

# wave-execute (lean EXECUTE)

Run a **wave of stories**: deterministic plan (DAG + file partition) → dispatch
`/full-sdc` (or `aexos sdc` + skills) per story → fan-in → `@devops` merge-back.

**Not in scope:** cockpit `wave launch`, conductor loops, product worktree WL registry, companion spawn surface.

Depends on skill **full-sdc** and CLI `aexos wave` / `aexos sdc`.

## Invocation

```
/wave-execute {wave-id} --stories path1.md,path2.md [yolo|interactive] [--dry-run] [--no-confirm]

# pure CLI plan
aexos wave plan --stories path1.md,path2.md --wave-id {wave-id} --mode yolo --save
aexos wave next {wave-id}
```

Yolo/parallel dispatch requires a positive explicit
`AEXOS_MODEL_BUDGET_CEILING_USD`. Each child intent is scanned and bound to its
existing story before a model executor is invoked.

## CLI (mechanical)

```bash
# From epic directory (C3) — preferred
aexos wave from-epic --epic-dir docs/framework/epics/core-super-update \
  --filter 'CORE-SU.C' --wave-id CORE-SU-C --mode yolo

# Or explicit paths
aexos wave plan --stories a.md,b.md,c.md --wave-id WAVE-1 --mode yolo --save

# Advance / next batch (auto-completes stories already Done / sdc completed)
aexos wave advance WAVE-1
aexos wave next WAVE-1

# After a child full-sdc finishes or fails
aexos wave mark WAVE-1 {story-id} --status completed
aexos wave mark WAVE-1 {story-id} --status failed --notes "qg breaker"

# Report
aexos wave report WAVE-1
aexos wave status WAVE-1

# Per story (child full-sdc)
aexos sdc plan {story} --mode yolo
aexos sdc next {story}
# … run skill for phase …
aexos sdc verify {story} {phase} --mark
```

State: `.aexos/waves/{wave-id}/state.json`  
Controller: `wave-run.js` + `dispatch-adapter.js` (C2) + `epic-glue.js` (C3)

## EXECUTE stages

### Stage 1 — Preflight (CLI computes)

1. Resolve story paths (must exist).
2. Before automated dispatch, validate the shared budget ceiling and scan each
   story-bound child intent; any rejection blocks that child before model use.
3. `aexos wave plan … --save` — do **not** re-invent the DAG by grepping in prose.
4. Judge the plan: Ready stories only for develop-heavy waves; flag Draft that still need validate; halt if `executor == quality_gate` when those fields exist.
5. `--dry-run` → print plan and **stop**.

### Stage 2 — Confirm

Show batches (parallel vs sequenced by file ownership). Get human OK unless `--no-confirm` or mode `yolo`.

### Stage 3 — Dispatch batches

For each batch **in order**:

1. For **each story in the batch** (parallel when multi-agent available):
   - Provide the exact outgoing child intent/context to `runWaveBatch`; its dispatch adapter must return governance evidence before the worker is invoked
   - Run **full-sdc** execute protocol (skill `full-sdc` / `/aexos-full-sdc`)
   - Preferred: `spawn_subagent` with `aexos-master` (or dedicated coordinator) prompt:
     `Execute full-sdc on {story-path} mode={mode}. Use aexos sdc plan/next/verify. Do not git push.`
   - Sequential fallback: run full-sdc inline one story at a time
2. Wait for all stories in the batch to reach SDC `completed` (or HALT).
3. On a blocked/failed story: do **not** dispatch dependents still waiting on it; continue independent later batches only if their deps are satisfied.
4. Cascade: if story B `dependsOn` A and A failed → mark B blocked in the wave report (do not fake green).

### Stage 4 — Fan-in

Before merge:

- Re-check File List overlap across branches/stories that ran in parallel (partition should prevent; verify).
- Surface conflicts to human + `@devops`; never silent overwrite.

### Stage 5 — Merge-back

Hand off to **`@devops` only** (push/PR/merge exclusive). Provide handoff:

```yaml
handoff:
  from: wave-execute
  to: devops
  wave_id: "{wave-id}"
  stories: ["…"]
  branches: ["feat/…"]
  next_action: "create/merge PRs per repo policy"
```

## Partition rules (same as CLI)

- Topological sort on `depends_on` (deps outside the wave = already satisfied).
- Within a ready set: max non-overlapping File List subset runs in one batch; overlapping remainder in later batches.
- Empty File List → treated as non-conflicting (still may be sequential by deps).

## Modes

| Mode | Behavior |
|------|----------|
| `interactive` | Confirm plan; pause between batches |
| `yolo` | Auto-confirm plan; autonomous full-sdc children |
| `--dry-run` | Plan only |

## Blocking conditions

- Wave plan `errors` non-empty (cycle)
- Story path missing
- full-sdc integrity HALT (Done before close)
- QG circuit breaker on a story
- Fan-in conflict unresolved

## Strip checklist

- [x] No cockpit-only spawn commands required
- [x] CLI First plan/partition
- [x] full-sdc children only (no invented parallel AC)
- [x] @devops exclusive merge
