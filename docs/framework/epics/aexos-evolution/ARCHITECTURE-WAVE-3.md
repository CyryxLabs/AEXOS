# Architecture — Wave 3: Proof, Learning, Memory, Swarm

**Epic:** [EPIC-AEXOS-EVOLUTION](./EPIC-AEXOS-EVOLUTION.md) · **Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md)
**ADRs:** [005 Proof Layer](./adr/ADR-AEX-005-PROOF-LAYER.md) · [006 Self-Improvement](./adr/ADR-AEX-006-SELF-IMPROVEMENT-LOOP.md)
**Blocked by:** Wave 1.

---

## Thesis

> **AEXOS does not need new subsystems. It needs to close the loops between the
> thirty-two it already has.**

The dormant assets *are* the roadmap. Verified against the tree:

| Asset | Built | Consumers |
|---|---|---|
| `development/scripts/pattern-learner.js` | ✅ | **0** |
| `development/scripts/metrics-tracker.js` | ✅ | **0** |
| `core/memory/gotchas-memory.js` (1,184 LOC) | ✅ | 2 methods tested |
| `improvement-engine` / `improvement-validator` | ✅ | 1 |
| `workflow-intelligence/engine/wave-analyzer.js` | ✅ | plans DAGs nothing executes |
| `core/orchestration/epic-context-accumulator.js` | ✅ | unreachable |
| `core/permissions/dispatch-governance.js` | ✅ | 2 cold entrypoints |
| `core/synapse/diagnostics/` (13 collectors) | ✅ | diagnosis only |
| `infrastructure/integrations/ai-providers/` (1,554 LOC) | ✅ | own index + test |

Nine subsystems, built and tested, wired to nothing. Wave 3 is an **integration
wave**, not a construction wave.

---

## V2 — The Proof Layer · AEX-3.1

Full rationale: [ADR-AEX-005](./adr/ADR-AEX-005-PROOF-LAYER.md).

Today a story closes on ticked checkboxes and a self-reported QA verdict. The
reporter and the actor are the same party, so "Done" is an assertion.

`AgentRuntime.execute()` (AEX-1.2) emits an `EvidenceRecord` — produced by the
runtime, not by the agent describing itself. Produced-file hashes are computed
from the filesystem against the `produces` declaration (AEX-1.1), which makes the
record adversarial to the agent: a claimed write that did not happen contradicts
its own record.

Story closure then requires an `EvidenceBundle` satisfying every acceptance
criterion, and records hash-chain into `.cyryx/ledger/{yyyy-mm}.jsonl` for
tamper-evidence. `cyryx verify {story}` re-runs the assertions against the
current tree — evidence that cannot be reproduced has expired.

**Why this is the pivotal story of the whole epic:** it converts Articles III and
V from advisory prose into mechanical gates, and it is the precondition for V3.

**Sequencing warning.** The prior roadmap placed the cryptographic ledger in
Phase 2, ahead of a runtime. Signing a stream of fabricated successes (D2) would
have converted unverified claims into auditable-looking ones — strictly worse
than no ledger. It belongs here, after V1.

---

## V3 — The Self-Improvement Loop · AEX-3.2

Full rationale: [ADR-AEX-006](./adr/ADR-AEX-006-SELF-IMPROVEMENT-LOOP.md).

```
EvidenceRecord ──▶ signal extraction ──▶ pattern candidate ──▶ FrameworkProposal
   (V2)            metrics-tracker         pattern-learner       improvement-engine
                   gotchas-memory                                       │
                                                                        ▼
                                          corpus amendment  ◀──  governance pipeline
                                          (task/checklist/                (human)
                                           template/constitution)
```

`governance/evolution-pipeline.md` is well designed and has produced **2
proposals in 14 months, both PENDING**, with **zero approved patterns**. It is
not underused because it is badly built — it is underused because nothing feeds
it. V2 supplies the feed.

Three constraints make this safe:

1. **Signals are aggregate.** N distinct stories, never a single incident.
2. **The loop proposes; humans approve.** It never edits the corpus directly.
   Only advisory gotcha data is auto-accepted.
3. **Rejections suppress.** A repeatedly rejected pattern class turns itself off,
   so the loop cannot degrade into nagging.

**Prerequisite, not optional:** AEX-2.5's replacement of the single named
approver with a *role*. A loop that generates proposals faster than one person
can review them stalls again, more expensively.

**Why this is the moat.** A competitor can fork 215 task files. They cannot fork
the failure history that shaped them. Every incident the framework survives makes
the process specification better, and that compounds.

---

## V4 — Real Memory · AEX-3.3

The architecture *assumes* a memory layer that does not exist.

- `core/memory/` contains exactly one module.
- `core/execution/subagent-dispatcher.js:26` requires `../memory/memory-query` —
  **that file does not exist**, so `MemoryQuery` is permanently `null` and
  `enrichContext()` silently skips the memory branch.
- `workflow-intelligence/learning/semantic-search.js` exists in no wired path.
- SYNAPSE L3–L7 are disabled with the note *"require session context that never
  exists"*.

The last point is the connection. L3–L7 were not disabled because layered context
is a bad idea; they produced zero rules because there was nothing to retrieve
from. Project-scoped semantic memory over decisions, gotchas and accepted
patterns gives them something to return.

Scope: a retrieval interface over the ledger (V2) and the gotcha store, consumed
by `enrichContext()` and by SYNAPSE L3–L7. **Re-enabling the layers without this
would reproduce the NOG-17 result** — which is why AEX-0.8 only reconciled the
documentation and deferred the behavioural decision to here.

Also in scope: repairing the `.synapse/manifest` wiring
(`runtime/hook-runtime.js:81-83` constructs `SynapseEngine` without passing
`manifest`, so `layers/l2-agent.js` can never match an `agentTrigger`), and
merging `_active-agent.json` into the session so agent-scoped context resolves.

---

## V5 — Swarm with Contracts · AEX-3.4

AEX-1.3 delivers lane parallelism: DAG → worktree → runtime → fan-in, with
conflict detection from declared `produces`.

V5 extends it from *partitioned* to *cooperative*:

- **Planning-time negotiation.** Two lanes declaring the same path is currently a
  planning error. With contracts it can become a resolution: sequence them, split
  the artifact, or escalate — decided before execution, not at merge.
- **Cross-lane context.** `epic-context-accumulator` already implements
  token-budgeted compression (8,000-token limit, 600 hard cap per story,
  progressive levels) and is unreachable. Lanes sharing an epic should share
  compressed context rather than each rediscovering it.
- **Result selection on evidence.** `subagent-dispatcher.js:617-624` currently
  picks the **longer string** for "best-of". With V2 it compares `verify`
  outcomes and cost.

---

## The layout question

Three distinct readings, all valid, all constitutionally clean.

### (a) Structural — the one that matters most

`.cyryx-core/` is a 1,211-file monolith. Nothing can consume a part without
taking the whole. This is why the provider abstraction, the wave analyser and the
governance guards are individually excellent and collectively unusable from
outside.

Target: a workspace of publishable packages.

```
@aexos/core         runtime interface, execution kernel        (V1)
@aexos/governance   constitution, guards, budget, ledger       (V2)
@aexos/agents       personas + task corpus + contracts         (the moat)
@aexos/synapse      context engine                             (V4)
@aexos/intelligence wave analyser, patterns, improvement loop  (V3, V5)
@aexos/cli          the CLI surface
```

`packages/*` workspaces already exist in `package.json`. This is a
re-partitioning, not a rewrite, and it is the precondition for the embedding
story in ADR-AEX-004.

Sequence it **after** V1 and V2 — moving files while the execution seam is still
being defined would churn twice.

### (b) Surface — plugin + MCP

Covered by [ADR-AEX-004](./adr/ADR-AEX-004-DISTRIBUTION-PLUGIN-MCP.md). One
protocol replaces seven per-IDE projections.

### (c) Visual — the cockpit

Article I forbids UI as a *requirement*; it explicitly permits observation
(*"Dashboards apenas observam"*). A read-only SSE cockpit is constitutionally
clean:

- waves in flight, lanes, and their DAG position
- active agents and current task contract
- budget burn against the Article XII-A ceiling
- gate status per story
- the evidence ledger as a live feed

`core/graph-dashboard/` and `core/events/dashboard-emitter.js` already exist for
this. The CLI remains the source of truth; the cockpit subscribes.

**This is where "layout diferente" should land.** Not a control panel — a mission
view. It is also the most legible demonstration of the product's thesis: you can
*watch* governance being enforced and evidence accumulating.

---

## Reach — beyond software delivery

The squad system already generalises: `config.yaml` declares tiers, handoff
matrices, `cross_squad` dependencies with `never_owns`, and stage gates with exit
criteria. Nothing in it is software-specific.

Two natural extensions, recorded but not planned:

- **Multi-repo orchestration.** A wave spanning repositories, with the ledger as
  the join key.
- **Team mode.** Multiple humans and agents against a shared ledger, where
  Article II authority maps to real identities rather than an env var.

---

## Dependency order

```
V1 kernel ──▶ V2 proof ──▶ V3 learning ──▶ V4 memory ──▶ V5 swarm
                 │                             ▲
                 └── layout (a) packages ──────┘
                            layout (c) cockpit ─▶ (any time after V2)
```

V2 cannot precede V1: proof of fabricated execution is worse than none.
V3 cannot precede V2: there is nothing to learn from without evidence.
V4 amplifies V3 and is what makes re-enabling SYNAPSE L3–L7 legitimate.
Layout (a) can start once the execution seam is stable.

## Wave 3 exit gate

1. No story closes without an `EvidenceBundle` satisfying every acceptance
   criterion; `cyryx ledger verify` reports an unbroken chain.
2. `cyryx verify {story}` reproduces the evidence of a closed story, or reports
   precise drift.
3. `cyryx improve status` shows a non-zero signal flow and a measurable proposal
   acceptance rate — and the approver is a role, not a person.
4. `memory-query` exists, is consumed by `enrichContext()`, and SYNAPSE L3–L7
   return a non-zero rule count under a repeat of the NOG-17 audit — or the
   layers stay disabled with that audit as the recorded justification.
5. Assertion strength (count and specificity of `verify` conditions) has not
   declined since Wave 1 — the guard against the loop gaming its own metric.
