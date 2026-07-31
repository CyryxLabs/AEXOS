# ADR-AEX-005: The Proof Layer — Evidence-Bound Story Closure

## Status

Proposed. Wave 3, story AEX-3.1. **Hard dependency on
[ADR-AEX-001](./ADR-AEX-001-AGENT-RUNTIME-INTERFACE.md) and
[ADR-AEX-002](./ADR-AEX-002-TASK-IO-CONTRACT.md).**

## Context

AEXOS's quality apparatus produces **claims**, not **evidence**.

A story closes when checkboxes are ticked and a QA gate file records a verdict.
`.cyryx-core/development/checklists/story-dod-checklist.md` is executed by an
agent reading markdown and asserting compliance. The gate file
(`docs/qa/*.yml`) records `verdict: PASS` with a `reviewed_revision` field. None
of it is bound to what actually executed.

Concretely, nothing in the system can answer:

- Which commands ran, with which exit codes, against which commit?
- Which files did the agent actually modify, versus which it claimed to?
- Which model produced this code, at what token cost, under whose budget?
- Was the governance check performed before dispatch, or asserted afterwards?

The evidence exists in fragments and is discarded. `core/events/` emits
dashboard events. `.cyryx/sdc/{story-id}/state.json` records phase completion.
`dispatch-governance` logs rejections. `gotchas.json` has a versioned schema.
None of them are joined, none are tamper-evident, and none gate closure.

The prior roadmap proposed a "Cryptographic Mission Ledger" at
`.cyryx/mission-ledger.jsonl` with SHA-256 signatures, framed for SOC2/ISO27001.
The instinct is right and the sequencing was wrong: with the execution kernel
missing (DIAGNOSTIC D2), a ledger would have cryptographically signed a stream of
fabricated successes. **An append-only log of lies is worse than no log** — it
converts an unverified claim into an auditable-looking one.

With ADR-AEX-001 supplying a real runtime and ADR-AEX-002 supplying
machine-checkable `verify` post-conditions, the substrate finally exists.

## Decision

**1. Every `AgentRuntime.execute()` emits an `EvidenceRecord`.**

Not a log line — a structured, hashable record produced by the runtime itself,
never by the agent describing its own work:

```
EvidenceRecord {
  taskContract   { id, version, inputsResolved }
  produced       [ { path, sha256, bytes } ]        // observed, not claimed
  verify         [ { assertion, outcome, detail } ] // from ADR-AEX-002
  commands       [ { argv, exitCode, durationMs } ]
  model          { provider, id, inputTokens, outputTokens, costUsd }
  governance     { decisionId, budgetBefore, budgetAfter, storyId }
  agent          { id, sessionId }
  repo           { commit, dirty }
  timing         { startedAt, endedAt }
}
```

The `produced` hashes are computed by the runtime from the filesystem. This is
what makes the record adversarial to the agent: an agent that claims to have
written a file it did not write produces a record that contradicts it.

**2. Story closure requires an `EvidenceBundle`.**

`aexos sdc close {story}` no longer accepts checkbox state as sufficient. It
requires a bundle — the set of `EvidenceRecord`s for the story — that satisfies:

- every acceptance criterion maps to at least one passing `verify` outcome
- every file in the story's File List appears in some record's `produced`
- no record carries a failed `verify` without a subsequent passing record
- the closing commit matches `repo.commit` of the final record

Failure to satisfy is a **hard block**, not a warning. This makes Article III
("no code without a story") and Article V ("Quality First") mechanically
enforceable rather than advisory.

**3. Records are hash-chained into an append-only ledger.**

`.cyryx/ledger/{yyyy-mm}.jsonl`. Each entry carries `prevHash` — the SHA-256 of
the previous entry — so any deletion or edit of history is detectable by
replaying the chain. `cyryx ledger verify` walks it and reports the first break.

Signing keys are **out of scope**. A hash chain gives tamper-evidence, which is
what an audit needs; signatures add attribution and require key management that
should be its own decision.

**4. Independent re-verification.**

`cyryx verify {story}` re-runs the `verify` assertions of every record in the
bundle against the current tree and reports drift. Evidence that cannot be
reproduced is evidence that has expired — which is exactly what a reviewer,
an auditor, or a future maintainer needs to know.

**5. Prompts are referenced, not embedded.**

Records store the SHA-256 of the dispatched intent and context, not their text.
The bytes live under `.cyryx/intents/` and are gitignored by default. This keeps
the ledger committable and small, and keeps potentially sensitive prompt content
out of version control, while preserving the binding that ADR-AEX-003's
governance token already establishes.

## Consequences

### Positive

- **"Done" acquires a definition that cannot be asserted into existence.** This
  is the single largest correctness gain available to the framework.
- Provides the auditable substrate the enterprise/SOC2 narrative needs — grounded
  in observed execution rather than in a policy document.
- Supplies the failure signal that [ADR-AEX-006](./ADR-AEX-006-SELF-IMPROVEMENT-LOOP.md)
  requires. Learning without evidence is not possible.
- Cost and latency per task become measurable, which is what Article XII-B's
  routing authority needs in order to route on anything but guesswork. The
  prior roadmap's "60% cost reduction" claim becomes testable.
- Rework becomes visible: repeated records for the same acceptance criterion are
  a direct measure of first-pass quality.

### Negative

- **Storage growth.** Records are small (~1–2 KB) but continuous. Monthly
  rotation plus a retention policy is required from day one, not later.
- **Hashing sits on the execution path.** Hashing produced files after every
  dispatch costs I/O. Mitigate by hashing only paths declared in `produces`
  (ADR-AEX-002) rather than scanning the tree.
- **Bundle validation will block closures that today succeed.** Expected and
  intended, but it changes the felt experience of finishing work and must be
  announced before it lands.
- **The ledger inherits the runtime's honesty.** If `AgentRuntime` is bypassed,
  the record is absent rather than false — so a missing record must itself be
  treated as a failure, or the guarantee is void.
- A second durable store joins the six already catalogued in the diagnostic.
  Consolidation of the existing state stores should be scoped alongside this,
  not deferred indefinitely.

### Neutral

- Article I satisfied: entirely CLI-driven; the ledger is read by dashboards,
  never written by them.
- No constitutional amendment required — this implements Articles III and V.

## Alternatives considered

**Extend the existing QA gate files with more fields.** Rejected: the gate file
is written by the QA agent, so it remains self-reported. The defect is not
insufficient detail, it is that the reporter and the actor are the same party.

**Emit evidence from agent output parsing.** Rejected for the reason
ADR-AEX-002 documents: parsing prose with regex is how the current system infers
modified files, and it is a guess. Evidence must be observed by the runtime.

**Full cryptographic signing with per-developer keys.** Deferred. Tamper-evidence
via hash chain delivers the audit property; attribution via signatures adds key
distribution, rotation and revocation, which deserves a separate decision.

**Store the ledger in git.** Rejected as the primary mechanism: a chain that
lives only in git is rewritable by `git push --force` and by history rewrites.
The chain must be verifiable independently of the VCS. Committing periodic
checkpoints of the chain head is a reasonable addition.
