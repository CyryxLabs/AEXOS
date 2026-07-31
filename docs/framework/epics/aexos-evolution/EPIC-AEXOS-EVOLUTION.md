# EPIC — AEXOS Evolution: The Execution Kernel

**Status:** Proposed — awaiting approval
**Baseline:** `f2e559c`
**Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md)
**Roadmap:** [ROADMAP.md](./ROADMAP.md)
**Architecture:** [Wave 0](./ARCHITECTURE-WAVE-0.md) · [Wave 1](./ARCHITECTURE-WAVE-1.md) · [Wave 2](./ARCHITECTURE-WAVE-2.md)

---

## Thesis

> **AEXOS describes how agents should work. It does not execute any of it.**
>
> The evolution is not more features. It is closing the loop between the
> deterministic layer and the execution layer.

AEXOS has built the harder half correctly: 215 task specifications, 12 personas
with explicit authority boundaries, a versioned constitution with enforced gate
severities, a DAG wave planner with cycle detection, a durable SDC state machine,
and a diagnostics suite deep enough to detect its own faults.

What it lacks is a body. The Node.js layer plans, validates, records state and
emits governance — but the single line where deterministic code hands work to a
model (`workflow-orchestrator.js:577`) calls a callback that is never supplied
outside tests. Every executor below it defaults to reporting success.

The result is a framework that can produce a green pipeline report having done
nothing, while its three constitutional enforcement points are inert.

This epic turns AEXOS from *a framework that specifies how agents should work*
into *a runtime that guarantees they did*.

---

## Positioning consequence

The repository currently names no competitor. Its only stated differentiator —
"DNA Mental™" — is proprietary and therefore invisible to anyone evaluating the
open-source artifact. The direct comparator, BMAD-METHOD, is never mentioned,
though the agent roster, the `*command` convention and the YAML-in-markdown agent
format visibly derive from it.

The defensible position is the one the existing assets already point at:

> **BMAD tells agents what to do. AEXOS guarantees they did it.**

Enforced governance plus verifiable execution. Delivering this epic is what makes
that claim true rather than aspirational.

---

## Scope

### In scope

| Wave | Theme | Outcome |
|---|---|---|
| **0** ✅ | Integrity restore | Every enforcement point works; lint green; 9 of 10 gates pass |
| **1** | Execution kernel | Typed task contract, `AgentRuntime`, real parallelism, governance on the hot path |
| **2** | Distribution & identity | Plugin + MCP surface, squad registry, brand and version unification |
| **3** | Proof · Learning · Memory · Swarm | Evidence-bound closure, a corpus that learns, real memory, cooperative lanes, new layout |

### Out of scope (explicitly deferred)

| Item | Rationale |
|---|---|
| Interactive control UI | Article I — UI is tertiary and must never gate operation. A **read-only** cockpit is in scope as AEX-3.6 |
| Squad marketplace API (`api.cyryx.dev`) | Depends on Wave 2 registry; no demand signal yet |
| "DNA Mental™" / mind-clone features | Proprietary; out of the OSS artifact by design |
| Rewriting the task corpus | The corpus is the moat — it gets a schema (AEX-1.1) and governed amendments (AEX-3.2), never a rewrite |
| Cryptographic signing keys | Hash-chain tamper-evidence ships in AEX-3.1; attribution via signatures needs key management and its own decision |

Re-enabling SYNAPSE L3–L7 moved **into** scope as AEX-3.3 — Wave 0 reconciled
the documentation only, deferring the behavioural decision until real memory
exists to retrieve from.

---

## Non-negotiable constraints

Inherited from `.cyryx-core/constitution.md`; this epic must not violate them.

1. **Article I — CLI First.** Every capability must work fully via CLI before any
   UI. Dashboards observe; they never control.
2. **Article II — Agent Authority.** `git push`, PR creation and releases remain
   exclusive to `@devops`. Wave 0 exists largely because this is currently
   unenforced.
3. **Article XI — Squad-First Portability.** `squads/` is canonical; `.claude/`,
   `.codex/`, `.gemini/` are derived projections, never sources of truth.
4. **Article XII — Model Governance.** Budget ceilings declared before the first
   model call; routing owned by `@devops`; no anonymous dispatch without a story;
   automated intents scanned for injection.

**Additional constraint introduced by this epic:** the knowledge corpus
(`development/tasks/`, `development/agents/`) is append-and-annotate only.
Wave 1 adds frontmatter; it does not rewrite task bodies.

---

## Wave 0 — Integrity Restore

**Gate: nothing in Wave 1 begins until Wave 0 is green.**

The project's own standard is that nothing ships imperfect. That standard is
currently not met by the framework itself. Wave 0 is the smallest change set that
makes the repository honest about its own state.

| ID | Story | Evidence |
|---|---|---|
| AEX-0.1 | Repair the two hook `SyntaxError`s and the `.cyryx-labs-core` path resolution | D1 |
| AEX-0.2 | Correct exit-code semantics in `enforce-git-push-authority` (block = exit 2) | D1 |
| AEX-0.3 | Repair `.synapse/manifest` keys and the remaining `Cyryx Labs_` identifiers (10 files) | D1, D6 |
| AEX-0.4 | Add `node --check` over `.claude/hooks/**` + an end-to-end hook smoke test to CI | D1 |
| AEX-0.5 | Bring `npm run lint` to exit 0 | D3 |
| AEX-0.6 | Unify version identity across the four sources; write the 5.3.0 CHANGELOG entry | D10, D6 |
| AEX-0.7 | Refresh the model registry to the current generation; remove stale routing tables | D8 |
| AEX-0.8 | Reconcile SYNAPSE documentation with `DEFAULT_ACTIVE_LAYERS = [0,1,2]` | D4 |

**Definition of done:** a clean clone passes `node --check` on every hook, the
git-push guard blocks a non-`@devops` push in a live test, `npm run lint` exits
0, and CI would have caught each of these had it existed.

**Estimated size:** days, not weeks. No architectural change.

---

## Wave 1 — The Execution Kernel

The actual evolution. Four stories in strict dependency order.

### AEX-1.1 — Task I/O Contract · *keystone*

See [ADR-AEX-002](./adr/ADR-AEX-002-TASK-IO-CONTRACT.md).

Add a machine-checkable frontmatter schema — `inputs`, `produces`, `verify` — to
all 215 task files, validated by a JSON Schema in `.cyryx-core/schemas/`.

This is the keystone: retry semantics, caching, dependency resolution,
verification and safe parallel file partitioning all require knowing what a task
consumes and produces. Today that is inferred by regex over free-form English
(D5). Nothing else in Wave 1 is sound without it.

Backfill is mechanical and parallelisable across the corpus. Task bodies are not
edited.

### AEX-1.2 — `AgentRuntime` interface

See [ADR-AEX-001](./adr/ADR-AEX-001-AGENT-RUNTIME-INTERFACE.md).

Promote the executor from an optional injected callback to a **required
constructor argument**. Delete every `simulated` / stub / unconditional
`success: true` default (D2) and fail loudly instead.

Reuse the dormant provider abstraction (D9, 1,554 LOC already written and tested)
as the first concrete backend.

### AEX-1.3 — Real parallelism

Connect `wave-analyzer`'s DAG output to the runtime, with git-worktree isolation
per lane. Fix the non-functional concurrency limiter (D11) — the current
implementation starts every promise before the throttle sees it.

File-ownership partitioning becomes sound only once AEX-1.1 declares `produces`.

### AEX-1.4 — Governance on the hot path

`dispatch-governance.js` — budget ceilings, story binding, injection scanning —
is genuinely good and reachable only from `pm.sh` and `aexos sdc preflight`. It
sits on the road nobody travels. Move it onto the Claude Code path, where all
real work happens.

See [ADR-AEX-003](./adr/ADR-AEX-003-GOVERNANCE-HOT-PATH.md).

---

## Wave 2 — Distribution & Identity

| ID | Story | Evidence |
|---|---|---|
| AEX-2.1 | Ship as a Claude Code plugin + MCP server (`aexosd`) alongside the file-copy installer | D7 |
| AEX-2.2 | Resolve the npm identity: publish under a real name or remove the install instruction | D7 |
| AEX-2.3 | Squad registry with enforced `minVersion` compatibility | D6 |
| AEX-2.4 | Complete the CYRYX→AEXOS migration; invert the semantic linter to enforce the new brand | D6 |
| AEX-2.5 | Merge the duplicate roadmaps; close the governance loop (Articles VII–X, PENDING proposals, approver role) | D13, D14 |

See [ADR-AEX-004](./adr/ADR-AEX-004-DISTRIBUTION-PLUGIN-MCP.md).

---

## Wave 3 — Proof, Learning, Memory, Swarm

Architecture: [ARCHITECTURE-WAVE-3.md](./ARCHITECTURE-WAVE-3.md).

**An integration wave, not a construction wave.** Nine subsystems are already
built and tested with zero or near-zero consumers: `pattern-learner` (0),
`metrics-tracker` (0), `gotchas-memory` (1,184 LOC), `improvement-engine` (1),
`wave-analyzer`, `epic-context-accumulator`, `dispatch-governance`, the 13
diagnostic collectors, and the 1,554-LOC provider abstraction. **The dormant
assets are the roadmap.**

| ID | Story | ADR |
|---|---|---|
| AEX-3.1 | **Proof Layer** — the runtime emits observed evidence; story closure requires a bundle; hash-chained ledger | [005](./adr/ADR-AEX-005-PROOF-LAYER.md) |
| AEX-3.2 | **Self-improvement loop** — evidence → aggregate signal → pattern → proposal → governed amendment | [006](./adr/ADR-AEX-006-SELF-IMPROVEMENT-LOOP.md) |
| AEX-3.3 | **Real memory** — `memory-query` (a require that resolves to nothing today), retrieval over ledger + gotchas, SYNAPSE L3–L7 decision | — |
| AEX-3.4 | **Swarm with contracts** — planning-time conflict negotiation, shared compressed epic context, evidence-based result selection | — |
| AEX-3.5 | **Layout (a)** — repartition the 1,211-file core monolith into publishable packages | — |
| AEX-3.6 | **Layout (c)** — read-only SSE cockpit; Article I compliant (dashboards observe, never control) | — |

**AEX-3.1 is the pivotal story of the epic.** It converts Article III ("no code
without a story") and Article V ("Quality First") from advisory prose into
mechanical gates, because for the first time the actor and the reporter are not
the same party.

**AEX-3.2 is the moat.** A competitor can fork 215 task files; they cannot fork
the failure history that shaped them. It requires AEX-2.5 (approver as a role)
as a hard prerequisite — otherwise the proposal flow stalls on one person,
exactly as it does today.

---

## Success criteria

The epic is complete when all of the following hold on a clean clone:

1. A non-`@devops` `git push` is **blocked** (exit 2) in a live test.
2. `UserPromptSubmit` injects non-empty context, asserted by a CI smoke test.
3. `npm run lint`, `npm run typecheck` and `npm test` all exit 0 in CI.
4. Every task file validates against the task-contract schema.
5. A workflow run with no runtime configured **fails loudly**; it cannot report
   success.
6. An epic of N independent stories executes in measurably less wall-clock time
   than N sequential runs, with file-conflict detection derived from declared
   `produces`.
7. Every model call is preceded by a governance check on the path actually used.
8. `git grep -il cyryx | wc -l` is bounded by an agreed allowlist, and the
   semantic linter enforces AEXOS terminology.

---

## Risks

| Risk | Mitigation |
|---|---|
| Backfilling 215 task contracts is large and error-prone | Schema-validate in CI from story one; backfill incrementally with a permissive→strict flag; parallelise across the corpus |
| Deleting silent-success defaults surfaces failures that were previously hidden | Expected and desired. Land behind a flag for one release; the alternative is trusting green reports that mean nothing |
| Wave 1 could drift into rewriting the knowledge corpus | Hard constraint: frontmatter only, task bodies untouched. Enforced by review |
| Re-enabling SYNAPSE L3–L7 could reintroduce the 0-rule regression | Wave 0 only reconciles docs. Any re-enable is a separate ADR with the NOG-17 audit repeated as evidence |
| Scope pressure to build the Studio GUI | Article I forbids UI as a requirement. Deferred explicitly above |

---

## Open decisions

These require the orchestrator's ruling before Wave 1 planning is final.

1. **SYNAPSE: document-down or build-up?** Either restate the engine as 3-layer
   (honest, cheap) or repair the manifest wiring and re-enable L2–L7 (recovers
   the squad-context extension surface). Wave 0 must not silently pick one.
2. **Runtime backend priority.** Reuse the `claude` CLI spawn path (fastest,
   already written) or target the programmatic Agent SDK (more capable, and
   conflicts with the CLI-First reading of Article I)?
3. **Article I amendment.** A library/MCP surface for embedding AEXOS in other
   products is arguably foreclosed by "CLI First". Wave 2 needs a ruling on
   whether MCP counts as CLI-equivalent or requires a constitutional amendment.
4. **Governance approver.** Replacing the single named approver with a role is
   a prerequisite for OSS contribution scale and enterprise due diligence.
