# Constraint Analysis — [VALUE_STREAM_NAME]

**Template ID:** OPS-TMPL-003
**Produced by:** `@ops:flow-lead` (Throat) — `*find-constraint`, `*queue-map`, `*exploit`, `*elevate-case`
**Artifact type:** Diagnosis. Versioned markdown in the repository.
**Owner:** [named person] · **Date:** [date] · **Re-check trigger:** [stated in Section 8]

[[LLM: FILLING THIS TEMPLATE

Section 2 is the whole document. Everything after it is worthless if the constraint is named wrong,
and naming it wrong is easy — the loudest complaint and the narrowest step are rarely the same place.

Do NOT fill Section 5 (elevation) before Section 4 (exploitation) is complete and quantified.
Elevating an unexploited constraint spends money to preserve the waste inside it.

A constraint claim requires queue evidence, state-time evidence, or a documented policy. Intuition
is not evidence. Constitution Article IV — No Invention.

If the constraint turns out to be the build, the pipeline or the release path, this document states
the finding and the exploit rule and stops. Every change to those is @devops.]]

---

## 0. Boundary — this document diagnoses, it does not operate

| This document produces | Who performs the resulting action |
|---|---|
| Constraint identification and evidence | — (a finding is not an action) |
| Exploitation rules | Implementation → `@dev` |
| Subordination and buffer rules | Working agreements → `@sm` · Backlog order → `@po` |
| Findings about build, CI, pipeline, release cadence or deploy path | **`@devops`, exclusive — decision and execution both** |
| Findings about a quality gate | Gate redesign → `@qa`. **Never** grounds for weakening or bypassing it. |
| Elevation case with cost and expected gain | Hiring and budget → the humans who own them |

Constraint analysis is persuasive precisely because it justifies changing things. That makes this
boundary more load-bearing here, not less.

---

## 1. System boundary

| Field | Value |
|---|---|
| Value stream analysed | [from → to, e.g. "story ready → released to users"] |
| Explicitly outside the boundary | [e.g. discovery, procurement, upstream partner delivery] |
| Observation window | [dates] |
| Data source | [ticket state history / commit and branch history / direct observation] |
| Items observed | [n] |

> If no queue appears anywhere in the stream and throughput is still low, the constraint is outside
> this boundary — an external dependency, an approval, or demand itself. Redraw and re-run.

---

## 2. Evidence — where work waits

| Stage | Items waiting | Age of oldest | Work time (median) | Wait time (median) | Ever starves? |
|---|---|---|---|---|---|
| [stage] | [n] | [d] | [d] | [d] | yes / no |
| | | | | | |

**Totals:** lead time [n]d, of which work time [n]d — value-adding fraction [n]%.

### 2.1 Candidates and elimination

| Candidate | Queue in front | Starves? | Verdict |
|---|---|---|---|
| [stage A] | [n items] | [yes — clears in half a day] | Not the constraint. The queue is arrival variability, not capacity. |
| [stage B] | [n items] | no | **Constraint** |

**A genuine constraint never starves.** A stage that is sometimes idle waiting for input has
capacity that arrival variation is failing to use — that is a release-rule problem upstream, not a
capacity problem here.

### 2.2 The named constraint

| Field | Value |
|---|---|
| **Constraint** | [one step] |
| **Type** | capacity / policy / skill / dependency / market |
| **Evidence** | [queue counts, state times, or the documented policy text] |
| **Confidence** | measured / partly self-reported (**UNVERIFIED**) |

> Exactly one. Two claimed constraints usually means the downstream one is a queue caused by the
> upstream one, or the system boundary was drawn wrong. [SOURCE: Goldratt, *The Goal*, 1984, with
> Jeff Cox.]

---

## 3. What the constraint costs

| Measure | Current | Note |
|---|---|---|
| **Throughput** | [finished, delivered items per window] | Started or finished-but-undelivered work does not count |
| **Inventory** | [items started and not delivered] | Open branches, unreleased changes, pending reviews |
| **Operating expense** | [what it costs to convert one into the other] | State the unit used |

**Cost of one hour lost at the constraint:** [derived from throughput]. An hour lost here is lost by
the entire system; an hour saved anywhere else is worth nothing. [SOURCE: Goldratt.]

---

## 4. Exploitation — recover what is already there, at no capital cost

Fill this completely before Section 5 exists.

| Consumption inside the constraint | Share of its capacity | Recoverable? | Removal rule | Implemented by |
|---|---|---|---|---|
| [work that should have been stopped upstream] | [n]% | yes | [rule] | `@dev` builds the check · **`@devops`** wires it into the pipeline |
| [rework caused upstream] | [n]% | partly | [rule] | `@dev` |
| [oversized batches arriving] | [n]% | partly | [batch policy] | Working agreement → `@sm` |
| [interruption and context switching] | [n]% (**UNVERIFIED** if self-reported) | yes | [sequencing rule] | Team agreement |
| [idle, starved of input] | [n]% | yes | [buffer and release rule, Section 6] | — |
| **Actual first-pass work only it can do** | [n]% | no | — | — |

**Recoverable capacity: [n]% of the constraint.** Effective capacity after exploitation:
approximately [n]× current, at zero capital cost.

> Exploit before you elevate. Exploitation costs a decision; elevation costs money. [SOURCE:
> Goldratt, five focusing steps 2 and 4.]

---

## 5. Elevation case — only if Section 4 is exhausted

| Field | Value |
|---|---|
| Is exploitation exhausted? | yes / **no — stop here** |
| Proposed added capacity | [what] |
| Cost | [amount, over what period] |
| Expected throughput gain | [units per window, with the arithmetic] |
| **Where the constraint moves next** | [named stage, with the evidence that suggests it] |
| Decision owner | [human — this is a budget and staffing decision] |

Predicting the next constraint before the change is made is mandatory. Organizations that skip it
discover the new constraint by surprise, usually after committing capacity that is now in the
wrong place.

---

## 6. Subordination and buffer

See `subordination-rules-tmpl.md` for the full artifact. Summary here:

| Field | Value |
|---|---|
| Buffer target in front of the constraint | [n items — below this it can starve; above this the buffer is hiding an upstream problem] |
| Release rule that feeds it | [rule] |
| Local metrics being explicitly abandoned | [list] |

---

## 7. Proposal scoring

Every proposal on the table, scored on all three measures. A proposal that cannot state its effect
on all three has not been evaluated.

| Proposal | Throughput | Inventory | Operating expense | Verdict |
|---|---|---|---|---|
| [proposal] | [+/0/−, with reasoning] | [+/0/−] | [+/0/−] | accept / reject / reclassify |
| [an improvement at a non-constraint] | 0 | ↑ | ↑ | Reject — or reclassify as a waste question for `@ops:lean-lead` |

---

## 8. Re-check trigger

| Field | Value |
|---|---|
| This analysis expires when | [the constraint is broken, or after N windows, whichever first] |
| On expiry, run | `*inertia-check` — audit every rule created to protect the constraint named above |
| Why | Step 5 of the five focusing steps is the one that gets skipped. When a constraint breaks, the rules invented to protect it become the next constraint, and they are invisible because they were once correct. [SOURCE: Goldratt.] |

---

## 9. Findings routed outside this squad

| Finding | Routed to | As |
|---|---|---|
| [release cadence is the queue] | **`@devops`** | Evidence for their decision — never an instruction |
| [quality gate is the constraint] | `@qa` | A redesign question — never permission to weaken it |
| [sequencing would keep the constraint fed] | `@po`, `@sm` | The flow argument for their decision |
| [structural coupling no policy change relieves] | `@architect` | — |

---

## Attribution

The Theory of Constraints — one constraint at a time, the five focusing steps, and the throughput /
inventory / operating expense measures — is published by Eliyahu M. Goldratt in *The Goal: A Process
of Ongoing Improvement* (1984, written with Jeff Cox) and developed across his subsequent work on
ongoing improvement. `@ops:flow-lead` applies that framework with attribution.

Later flow conventions used in this template — work-in-progress limits, cumulative flow diagrams,
queueing arguments drawn from other schools — are **convention** and are not attributed to Goldratt.

## Related

- Subordination artifact: `squads/ops/templates/subordination-rules-tmpl.md`
- Evidence bar before publishing: `squads/ops/checklists/constraint-evidence-checklist.md`
- Identification signatures and exploitation levers: `squads/ops/data/constraint-signatures.yaml`
- Task: `squads/ops/tasks/flow-find-constraint.md`
