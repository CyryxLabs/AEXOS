# ADR-AEX-006: The Self-Improvement Loop — A Process Corpus That Learns

## Status

Proposed. Wave 3, story AEX-3.2. Depends on
[ADR-AEX-002](./ADR-AEX-002-TASK-IO-CONTRACT.md) and
[ADR-AEX-005](./ADR-AEX-005-PROOF-LAYER.md).

## Context

AEXOS's moat is not its orchestration code. It is the corpus: 215 task
specifications and 12 personas encoding years of process design, plus a
versioned constitution with enforced gate severities. Competing frameworks ship
orchestration; none ship organisational process as a first-class, governed
artifact.

That corpus is currently **static**. It improves only when a human notices a
recurring problem and edits a file. Meanwhile the framework already contains
every component required to make it improve itself — all of them disconnected:

| Component | State (verified) |
|---|---|
| `development/scripts/pattern-learner.js` | **0 consumers** outside its own file |
| `development/scripts/metrics-tracker.js` | **0 consumers** |
| `core/memory/gotchas-memory.js` | 1,184 LOC, ~15 public methods, 2 behaviourally tested |
| `improvement-engine` / `improvement-validator` | 1 consumer |
| `core/synapse/diagnostics/` | 13 collectors, used for diagnosis only |
| `governance/evolution-pipeline.md` | audit → finding → proposal → approval → PR |

The governance pipeline is the most telling. It is well designed — YAML
`AuditFinding` and `FrameworkProposal` schemas, an approval stage, a PR stage —
and it has produced **2 proposals in 14 months**.

Both were **approved the same day they were written** (`approver_decision:
"APPROVED"`, `2026-05-07T19:15:00Z`). Neither was delivered: the approved
vocabulary-contract proposal created Article VII, and the constitution still
jumps from Article VI to Article XI. `governance/patterns/` holds only a README —
zero catalogued patterns despite two approvals.

So the pipeline has **two independent failures, at opposite ends**:

| End | Failure |
|---|---|
| **Input** | Nothing feeds it. Findings arrive only when a human writes one — hence 2 in 14 months |
| **Output** | Nothing tracks delivery. Approved proposals silently never ship, and no artifact notices |

This ADR addresses the input. The output gap is AEX-2.5's `implementation:
{ pr, merged_at, verified_by }` stage, and it is a **hard prerequisite** —
feeding a pipeline whose output end is unmonitored converts a trickle of
undelivered proposals into a flood of them.

ADR-AEX-002 introduces `verify` post-conditions, which produce a machine-readable
failure signal. ADR-AEX-005 records every execution as evidence. Together they
supply, for the first time, a continuous stream of "this task, under these
inputs, failed this assertion" — which is exactly the input the dormant
components were built to consume.

## Decision

**Close the loop: evidence → signal → pattern → proposal → governed amendment.**

```
EvidenceRecord (ADR-005)
      │  failed verify / rework / repeated gotcha
      ▼
  signal extraction        ← metrics-tracker, gotchas-memory
      │  aggregated across stories, not single incidents
      ▼
  pattern candidate        ← pattern-learner
      │  "task X fails assertion Y in context Z, N times"
      ▼
  FrameworkProposal        ← improvement-engine (existing schema)
      │
      ▼
  governance pipeline      ← human approval, existing process
      │
      ▼
  corpus amendment          (task, checklist, template, or constitution)
```

**1. Signals are aggregate, never single-incident.**

A proposal requires a threshold — the same failure across N distinct stories, or
a rework rate above a configured bound. One failure is noise; a pattern is
signal. `improvement.signalThreshold` in `core-config.yaml`, defaulting
conservatively.

**2. The loop proposes. Humans approve. Always.**

The loop writes a `FrameworkProposal` into the existing governance pipeline and
stops. It never edits `development/tasks/`, `checklists/`, or `constitution.md`
directly.

This is non-negotiable for three reasons: the corpus is the moat and must not be
degraded by an automated process optimising a proxy metric; Article XII-C forbids
unattended mutation of governed artifacts; and a framework that silently rewrites
its own rules cannot be audited.

**3. Proposals carry their evidence.**

Every proposal references the `EvidenceRecord` hashes that produced it. A
reviewer can reproduce the finding rather than take it on trust — and can reject
it with a reason that itself becomes a signal (see 5).

**4. Four amendment classes, ordered by blast radius.**

| Class | Target | Review |
|---|---|---|
| Gotcha | `.cyryx/gotchas.json` | auto-accept (advisory data only) |
| Task refinement | a single task's `verify` or notes | 1 approver |
| Checklist / template | shared artifact | 2 approvers |
| Constitutional | `constitution.md` | full amendment process (Article XII) |

Only the first is automatic, and it writes to a store that is already advisory
and never gates anything.

**5. Rejections are signals too.**

A rejected proposal records its reason. Repeated rejection of the same pattern
indicates the detector is wrong, and suppresses that pattern class. Without this,
the loop nags — and a nagging loop gets disabled, which is the failure mode that
killed the pipeline in its current form.

**6. The loop is observable and killable.**

`cyryx improve status` reports signals collected, proposals open, acceptance
rate. `improvement.enabled: false` disables it entirely. A learning system that
cannot be inspected or stopped will not be trusted with a corpus this valuable.

## Consequences

### Positive

- **The corpus becomes an appreciating asset.** Every failure the framework
  survives makes the process specification better. This compounds, and it is the
  one advantage a competitor cannot copy by reading the repository — they can
  fork the 215 tasks, but not the failure history that shaped them.
- Revives four dormant subsystems into load-bearing roles rather than building
  new ones.
- Gives the governance pipeline the input it was designed for. Two proposals in
  fourteen months becomes a measurable flow with an acceptance rate.
- Produces exactly the operational metrics needed elsewhere: which tasks are
  fragile, which agents generate rework, which gates actually catch defects.
- Makes AEXOS's positioning defensible in a way orchestration never is:
  competitors ship static process; this ships process that learns.

### Negative

- **Overfitting to recent failures.** Aggregate thresholds and time-decay on
  signals mitigate, but the risk is real: a corpus tuned to last month's
  incidents can lose generality. Periodic human review of accepted amendments is
  required, not optional.
- **Proposal volume outruns delivery capacity.** The evidence shows approval is
  fast (same-day) and *delivery* is where proposals die — Article VII was
  approved 14 months ago and never written. A loop that manufactures proposals
  without a tracked implementation stage produces a growing set of
  approved-but-absent policy, which reads as complete and is therefore worse
  than a visible backlog. AEX-2.5's delivery-tracking stage is a **hard
  prerequisite**, ahead of the approver-role change.
- **Bus-factor 1 on approval** remains a real risk for OSS contribution scale,
  and the loop increases the load on that single approver — but it is a
  secondary concern, not the immediate blocker the earlier analysis assumed.
- Metric gaming: if the loop optimises "fewer failed verifies", the cheapest path
  is weaker assertions. Guard by tracking assertion strength (count and
  specificity) as a first-class metric that must not decline.
- New surface for prompt injection — evidence text flows into proposal text.
  Article XII-D scanning must apply to the proposal pipeline, not only to
  dispatch.

### Neutral

- No constitutional amendment required. This implements the existing
  `governance/evolution-pipeline.md` rather than replacing it.
- Article I satisfied: fully CLI-driven (`cyryx improve status|propose|review`).

## Alternatives considered

**Let a model periodically read the corpus and suggest improvements.** Rejected
as the primary mechanism: suggestions unanchored to observed failure are
plausible-sounding and unfalsifiable — the same defect ADR-AEX-002 rejects for
task contracts. Useful as a *drafting* aid once a signal exists.

**Auto-apply low-risk amendments without review.** Rejected beyond the gotcha
class. The corpus is the product; the cost of a bad automatic edit is
asymmetrically higher than the cost of a human reading a proposal.

**Track metrics only, without proposals.** This is effectively today's state —
`metrics-tracker` exists with zero consumers. Metrics that no process consumes
are not observability; they are unread files.

**Build a new learning subsystem.** Rejected. Four relevant components already
exist and are tested to varying degrees. The gap is wiring, not capability —
which is the thesis of this entire epic.
