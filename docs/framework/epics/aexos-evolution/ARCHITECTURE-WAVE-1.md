# Architecture — Wave 1: The Execution Kernel

**Epic:** [EPIC-AEXOS-EVOLUTION](./EPIC-AEXOS-EVOLUTION.md) · **Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md)
**ADRs:** [001 Runtime](./adr/ADR-AEX-001-AGENT-RUNTIME-INTERFACE.md) · [002 Task contract](./adr/ADR-AEX-002-TASK-IO-CONTRACT.md) · [003 Governance](./adr/ADR-AEX-003-GOVERNANCE-HOT-PATH.md)
**Blocked by:** Wave 0.

---

## The gap in one diagram

Today:

```
  CLI / skills          deterministic layer                   execution
  ────────────          ───────────────────                   ─────────
  cyryx sdc plan   →    state machine, DAG, gates    →    ✗ callback never supplied
  cyryx wave plan  →    wave-analyzer partitions     →    ✗ nothing consumes lanes
  /full-sdc        →    preflight, budget, binding   →    ✗ model reads markdown,
                                                             unobserved by any of it
```

The left and middle columns are built and correct. The right column does not
exist, and the seam defaults to reporting success.

Target:

```
  CLI / skills / MCP  →  deterministic layer  →  governance gate  →  AgentRuntime
                                    ↑                                     │
                                    └────── structured AgentResult ───────┘
```

Four stories, strict order. Each is unsound without its predecessor.

---

## AEX-1.1 — Task I/O contract · keystone

Full rationale in [ADR-AEX-002](./adr/ADR-AEX-002-TASK-IO-CONTRACT.md).

Add `inputs` / `produces` / `verify` frontmatter to 215 task files; formalise
`.cyryx-core/schemas/task-contract.schema.json`; validate in CI with `ajv`
(already a dependency).

**Why first.** Everything downstream needs it:

| Capability | Requires |
|---|---|
| Retry | knowing what to re-run and what it consumed |
| Caching | knowing what invalidates a result |
| Parallel scheduling | `produces` — declared file ownership |
| Verification | `verify` — falsifiable post-conditions |
| Squad compatibility (AEX-2.3) | contracts a squad claims to satisfy |

Today file ownership is inferred by regex over English prose
(`subagent-dispatcher.js:790-810`). Wave partitioning and merge safety rest on
that guess.

**Migration.** `taskContract.enforcement: warn | strict`, defaulting to `warn`
for one release. CI validates any task that carries the blocks from day one and
reports coverage per build. Flip to `strict` at 100%.

**Hard constraint.** Frontmatter only. Task body prose is the moat and is not
edited under this story. A model may *draft* the 215 blocks for human review —
that is a bootstrap aid, not the authority.

---

## AEX-1.2 — `AgentRuntime`

Full rationale in [ADR-AEX-001](./adr/ADR-AEX-001-AGENT-RUNTIME-INTERFACE.md).

```
interface AgentRuntime {
  execute(request: AgentRequest): Promise<AgentResult>
  capabilities(): RuntimeCapabilities
}
```

`AgentRequest` — resolved task contract, assembled context, acting agent id,
governance token (AEX-1.4).
`AgentResult` — `produced` paths, `verify` outcomes, token/cost accounting.
Structured. Never prose to be re-parsed.

**Three changes, not one.**

1. **Required, not optional.** Orchestrators take `runtime` at construction or
   throw. `options.dispatchSubagent` is removed.
2. **Silent-success defaults deleted.** Five sites (DIAGNOSTIC D2):
   `autonomous-build-loop.js:538-555`, `epic-3-executor.js:163-182`,
   `epic-4-executor.js:157-231`, `agent-invoker.js:404-414`,
   `master-orchestrator.js:1592-1620`. Absence of a runtime becomes a
   construction error; a phase that cannot execute throws.
3. **First backend is salvage.** `AiProviderRuntime` adapts the dormant
   1,554-LOC provider abstraction (DIAGNOSTIC D9) — already written, already
   tested, currently referenced only by its own index.

**Also in scope:** `agent-invoker.js:32-75` hardcodes a 7-agent allowlist while
12 personas exist (D12). `sm`, `ux-design-expert`, `data-engineer`,
`cyryx-master` and `squad-creator` return `Unknown agent`, yet
`subagent-dispatcher.js:58-81` routes `database → @data-engineer`. The registry
derives from `development/agents/` rather than a literal.

**Expect red.** Pipelines that report green today will fail once fake success is
removed. That is the correction, not a regression — but it must be announced
before it lands.

---

## AEX-1.3 — Real parallelism

`workflow-intelligence/engine/wave-analyzer.js` already performs correct DAG
construction with cycle detection and produces valid wave partitions. Nothing
consumes them concurrently: `cyryx wave` only plans, saves and marks status.

**Fix the limiter first.** `core/orchestration/parallel-executor.js:92-111` does
not limit anything. The caller at line 37 does `phases.map(async ...)`, starting
every promise before `_executeWithConcurrencyLimit` sees it; wrapping already-
running promises in `Promise.resolve().then(() => task)` makes the
`Promise.race(executing)` throttle inert. All phases run at once regardless of
`maxConcurrency`. This is a latent cost and rate-limit hazard the moment a real
runtime is attached — it must be fixed **before** AEX-1.2 lands, not after.

**Then connect the pipeline.**

```
wave-analyzer (DAG)
   → lane partition by declared `produces`   ← AEX-1.1
   → git worktree per lane                    ← isolation
   → AgentRuntime.execute per task            ← AEX-1.2
   → fan-in, conflict check, merge by @devops ← Article II
```

Reuse what exists: `core/sdc/dispatch-adapter.js:106-132` is already a correct
order-preserving promise pool (defaulting to `sequential`, `worker` never
supplied) — supply the worker. `core/execution/wave-executor.js:150-199` has
correct `Promise.allSettled` chunking with a no-op `defaultExecutor` — supply
the executor. Worktree management already exists under `autoClaude.worktree` in
`core-config.yaml`.

**Distinguish the two "parallel" concepts.** `core/execution/parallel-executor.js`
is dual-*provider* execution of one prompt (race / consensus / best-of / merge) —
one logical agent, two models. That is a different feature and keeps its name
only if renamed to avoid confusion with lane parallelism. Note that its
"best-of" selection picks the longer string (`subagent-dispatcher.js:617-624`);
with AEX-1.1 it can compare `verify` outcomes instead.

**Conflict detection** derives from declared `produces`. Two lanes declaring the
same path is a planning-time error, not a merge-time surprise.

---

## AEX-1.4 — Governance on the hot path

Full rationale in [ADR-AEX-003](./adr/ADR-AEX-003-GOVERNANCE-HOT-PATH.md).

`dispatch-governance.js` — budget ceilings, story binding, injection scanning —
is reachable only from `pm.sh:362-377` and `cyryx sdc preflight`. Neither is
where work happens.

**Governance becomes a precondition of `execute()`**, inside the runtime
boundary so a new caller cannot bypass it. `evaluate(request)` returns a
rejection or a short-lived token bound to an intent hash; `execute()` requires a
token matching the request it received.

This mechanises what `full-sdc` currently states as an instruction: *"Pass the
same bytes from these files to the child; never rebuild or enrich the prompt
after preflight."*

**Layer split** — neither layer is asked to do what it cannot:

| Layer | Enforces | Mechanism |
|---|---|---|
| `.claude/hooks/` `PreToolUse` | Article II — who may run which tool | exit 2 |
| `AgentRuntime` | Article XII — budget, story binding, intent scan | token or rejection |

`cyryx sdc preflight` keeps its exit contract (0 proceed / 5 governance
rejection) as a thin CLI wrapper over the same evaluation.

**Record approvals, not only rejections.** Without approval records the audit
trail is a log of refusals, and the deferred cryptographic ledger has nothing
truthful to sign.

**Performance constraint.** Evaluation sits on the latency path of every
dispatch. Budget state needs an in-process cache with periodic flush; no
per-call disk I/O. A slow gate gets disabled, which is worse than no gate.

---

## Wave 1 exit gate

1. Every task file validates against `task-contract.schema.json`;
   `taskContract.enforcement: strict`.
2. Constructing an orchestrator without a runtime **throws**. No code path
   returns `success: true` without execution.
3. `grep -rn "simulated\|StubEpicExecutor\|// Default: simulate"` over
   `.cyryx-core/core/` returns nothing outside tests.
4. N independent stories complete in measurably less wall-clock time than N
   sequential runs, with lane conflicts detected at planning time from declared
   `produces`.
5. Every model call on the Claude Code path is preceded by a governance
   evaluation, with both approvals and rejections recorded.
6. `maxConcurrency` demonstrably bounds in-flight work.
