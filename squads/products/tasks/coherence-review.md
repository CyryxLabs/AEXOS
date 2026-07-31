---
task: Coherence Review
owner: "@products-chief"
owner_type: agent
atomic_layer: task
Input: |
  - initiative: The initiative or product area whose artifacts are being audited (required)
  - artifacts: Paths to every squad artifact written for this initiative, with the date each was last revised (required, minimum 2 — a single artifact cannot contradict anything)
  - current_strategy: Path to the strategy artifact that is currently in force (required — it is the baseline the chain is read against)
  - decision_pending: The decision this audit must unblock, if any (optional, default: none)
  - output_dir: Directory for the coherence report (optional, default: docs/product/coherence/)
Output: |
  - coherence_report: Versioned markdown file with the chain table, every break classified, the repair order, and the repair direction verdict
  - breaks: List of chain breaks, each classified INDEPENDENT or INHERITED, with the link it occurs at
  - repair_order: Ordered repair list, upstream-first, with the parallel-safe items flagged
  - direction_verdict: Whether the repair runs downstream (upstream artifact is correct) or upstream (upstream artifact is the stale one)
  - routing: One owning specialist per repair, in the order they must be engaged
Checklist:
  - "[ ] Collect every artifact for the initiative and date each one"
  - "[ ] Map each artifact to exactly one chain link, and record links with no artifact"
  - "[ ] Record orphan artifacts that map to no link in the current strategy"
  - "[ ] Run all six contradiction checks (PRD-CL-011) and record the result of each"
  - "[ ] Classify every break as INDEPENDENT or INHERITED using the inheritance test"
  - "[ ] Apply the propagation rule: mark everything downstream of the earliest break as suspect"
  - "[ ] Decide the repair direction — is the upstream artifact correct, or is it the stale one?"
  - "[ ] Emit the repair order upstream-first, with parallel-safe repairs flagged"
  - "[ ] Name exactly one owning specialist per repair"
  - "[ ] Write the coherence report to the repository"
  - "[ ] Produce no strategy, positioning, pricing, job, discovery or experiment content while repairing"
---

# *coherence-check — Audit the Squad's Artifacts Against the Coherence Chain

Materializes `@products-chief *coherence-check`.

## Purpose

Six specialists write artifacts weeks apart. Each one is defensible on its own. The failure this
task exists to catch is that together they no longer describe the same product: the strategy
targets one segment, the positioning addresses a different buyer, the pricing assumes a third,
and the experiment measures a population that matches none of them.

This task reads the artifacts against the chain:

```text
segment -> job -> outcome -> solution -> narrative -> price -> measure
```

and reports where the chain breaks, whether each break is the artifact's own fault or inherited
from upstream, and in which order the repairs must run.

This task repairs nothing. It produces a finding and a routing order. The repairs belong to the
specialists that own the broken links.

## Preconditions

1. At least two squad artifacts exist for the same initiative. One artifact cannot contradict
   anything; if only one exists, record `audit: not applicable — single artifact` and stop.
2. The artifact currently in force as the strategy is identified. Everything else is read against
   it. If two strategy artifacts exist and neither is marked superseded, stop and route to
   `@products:product-strategist` to declare which is in force — the audit has no baseline until
   then.
3. Each artifact carries a date. If an artifact is undated, use the last commit date from git
   (read-only) and mark the date as `inferred`.
4. `squads/products/squad.yaml` is readable — it carries the agent registry used for routing the
   repairs.

## Procedure

### Step 1 — Collect and date

List every artifact written for the initiative, including artifacts that appear obsolete. Do not
filter yet: an artifact that looks irrelevant is a candidate orphan, which is one of the six
checks.

Record per artifact: path, chain link it claims, owning specialist, date last revised, and whether
the date is stated or inferred.

Dates matter more than they look. The repair direction in step 7 turns on which artifact reflects
the most recent decision, and that is not always the one furthest downstream.

### Step 2 — Map to links

Build the chain table. One row per link, in chain order.

| Link | Owner | Question the link answers | Artifact | Date | What it says |
|---|---|---|---|---|---|
| Segment | product-strategist | Who exactly is this for? | | | |
| Job | jobs-analyst | What are they hiring it to do, and what are they firing? | | | |
| Outcome | product-strategist | What measurable change are we accountable for? | | | |
| Solution | discovery-lead | Which solution, validated against which assumptions? | | | |
| Narrative | positioning-lead | Against which alternative, in which category, described how? | | | |
| Price | pricing-strategist | What value metric, what packaging, what level? | | | |
| Measure | experimentation-lead | How do we know it worked, with what confidence? | | | |

Two special cases:

- **Empty link.** No artifact fills the link. This is a gap, not a break. Record it as
  `MISSING` — it is a routing finding (the link needs to be produced), not a contradiction.
- **Contested link.** Two artifacts claim the same link and disagree. Do not arbitrate here.
  Record it and route to `*conflict-resolve` — the audit does not resolve conflicts, it locates
  them.

### Step 3 — Run the six contradiction checks

Execute `squads/products/checklists/coherence-checklist.md` (PRD-CL-011). Record a result for
every check, including the ones that pass. A check recorded as "not run" is a hole in the audit.

| # | Check | What it compares |
|---|---|---|
| 1 | Segment drift | Strategy segment vs positioning target customer vs pricing assumed buyer vs experiment population |
| 2 | Job mismatch | The job in the JTBD analysis vs the competitive alternative named in the positioning |
| 3 | Outcome and measure divergence | The experiment's primary metric vs the outcome in the team objective |
| 4 | Value metric conflict | The pricing value metric vs the value described in the positioning and delivered by the solution |
| 5 | Evidence inversion | Confidence of each artifact vs the strength of the evidence upstream of it |
| 6 | Orphan artifact | Every artifact vs the named problems in the current strategy |

### Step 4 — Classify every break

For each break, apply the **inheritance test**:

> If the nearest upstream break were repaired, would this break disappear on its own?

| Answer | Classification | Meaning |
|---|---|---|
| Yes | **INHERITED** | The artifact is a correct answer to a broken input. Do not touch it yet. Repairing it now produces a second rewrite when the upstream repair lands. |
| No | **INDEPENDENT** | The artifact is wrong on its own terms. It can be repaired now, in parallel with upstream work. |

Worked distinction, using the example the agent carries: if the strategy targets mid-market ops
teams and the positioning addresses enterprise platform teams, then a per-seat enterprise-only
price is a *correct* answer to the positioning as written — INHERITED. But an experiment whose
primary metric is marketplace page views does not measure the share-and-reuse outcome under any
segment — INDEPENDENT, and fixable in parallel starting now.

Getting this wrong is expensive in both directions. Calling an INHERITED break independent burns a
specialist cycle on an artifact that will be rewritten anyway. Calling an INDEPENDENT break
inherited leaves a real defect parked behind a repair it does not depend on.

### Step 5 — Apply the propagation rule

> A break in any link invalidates every link downstream of it, not only the adjacent one.

Find the **earliest** break in chain order. Mark every link downstream of it as `SUSPECT` even
where the individual check passed, and say so explicitly in the report. A downstream artifact that
happens to be consistent with a broken upstream link is consistent with something that is not
true.

Do not narrate over this. Reporting artifacts as consistent by talking around a contradiction is
coherence smoothing: the break propagates anyway and surfaces later at higher cost.

### Step 6 — Sanity-check against evidence, not tidiness

Before ordering repairs, confirm each break is a real contradiction and not a vocabulary
difference. Two artifacts using different words for the same population is a naming problem; two
artifacts describing different populations is a break. The test is whether a customer could
belong to one description and not the other.

If the difference is vocabulary only, record it as `TERMINOLOGY` with the canonical term proposed,
and route it as a low-cost edit rather than a repair.

### Step 7 — Decide the repair direction

**This is the step most audits skip, and the one that most often inverts the answer.**

The default assumption is that upstream is correct and downstream drifted: repair the narrative
against the strategy, then re-derive pricing. But the opposite happens routinely — the segment
genuinely changed, the downstream specialists worked from the new reality, and the *strategy* is
the stale artifact. In that case, repairing downstream to match upstream propagates a decision
nobody currently holds.

Run the direction test:

| Signal | Points to |
|---|---|
| Downstream artifact is newer and cites evidence gathered after the upstream artifact was written | Upstream may be stale |
| Downstream artifacts *independently* converge on a different segment or job than upstream | Upstream may be stale |
| Upstream artifact was revised most recently and downstream artifacts predate the revision | Downstream drifted — default direction |
| Upstream carries named, checkable evidence and downstream carries assertion | Downstream drifted — default direction |
| A decision was taken outside the artifacts (a strategy change agreed and never written down) | Upstream is stale **and** unwritten — this is the finding |

Verdicts:

- **DOWNSTREAM REPAIR (default).** Upstream stands. Repair downstream links in chain order.
- **UPSTREAM REPAIR (inverted).** The upstream artifact is the stale one. Do **not** rewrite the
  downstream artifacts to match it. Route the upstream link to its owner first, with the question
  stated as a decision, not as a correction: *"three downstream artifacts assume segment X; the
  strategy names segment Y; which is in force this cycle?"* Every downstream artifact is held —
  neither repaired nor accepted — until that answer exists.
- **UNDECIDABLE.** The evidence does not settle which direction is correct. Do not pick one.
  Record both readings, name the decision, and route it to the upstream link owner as a decision
  to be made and written down. An audit that guesses the direction manufactures a strategy.

Note also that the direction verdict can differ per break. A stale strategy and an independently
broken metric can coexist; classify each break on its own.

### Step 8 — Emit the repair order

Order repairs upstream-first, in chain order, with INHERITED repairs sequenced strictly after the
break they inherit from. INDEPENDENT repairs are flagged as parallel-safe and start immediately.

| # | Link | Break | Class | Owner | Blocked by | Start |
|---|---|---|---|---|---|---|
| 1 | | | | `@products:{agent-id}` | — | now |
| 2 | | | INHERITED | `@products:{agent-id}` | #1 | after #1 |
| P1 | | | INDEPENDENT | `@products:{agent-id}` | — | now, parallel |

Every repair gets exactly one owner. Do not send the same repair to several specialists.

For each repair, state what the owner receives as input and what would be wasted if they ran
earlier — a positioning repair run before the segment question is settled is a rewrite waiting to
happen.

### Step 9 — Write the coherence report

Create `output_dir` if it does not exist. Write
`coherence-{initiative-slug}-{YYYY-MM-DD}.md`:

```markdown
# Coherence audit — {initiative}

**Date:** {YYYY-MM-DD}
**Baseline strategy artifact:** {path} ({date})
**Decision pending:** {decision or "none stated"}

## Chain

| Link | Artifact | Date | Says | Status |
|---|---|---|---|---|
| Segment | | | | baseline / consistent / BREAK / MISSING / SUSPECT |
| Job | | | | |
| Outcome | | | | |
| Solution | | | | |
| Narrative | | | | |
| Price | | | | |
| Measure | | | | |

## Contradiction checks

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Segment drift | PASS / FAIL | |
| 2 | Job mismatch | PASS / FAIL | |
| 3 | Outcome and measure divergence | PASS / FAIL | |
| 4 | Value metric conflict | PASS / FAIL | |
| 5 | Evidence inversion | PASS / FAIL | |
| 6 | Orphan artifact | PASS / FAIL | |

## Findings

1. **{Break name} at the {link} link.** {plain statement of the contradiction}
   Class: INDEPENDENT | INHERITED (from {link})

## Repair direction

**Verdict:** DOWNSTREAM REPAIR | UPSTREAM REPAIR | UNDECIDABLE
{the signals that produced the verdict, and — if UPSTREAM or UNDECIDABLE — the decision being
routed and who owns it}

## Repair order

| # | Link | Break | Class | Owner | Blocked by | Start |
|---|---|---|---|---|---|---|

## Orphans and gaps

| Artifact or link | Orphan / Missing | Disposition |
|---|---|---|

## Ethical concerns raised

{stated here, before the repair order is acted on, or "none raised"}

## Not covered by this audit

{links with no artifact, artifacts whose evidence could not be checked, contested links routed to
*conflict-resolve}
```

### Step 10 — Route

Activate the owner of repair #1 and pass the report path. Do not paraphrase the findings into
chat — the report is the handoff.

If any link is contested (two artifacts, genuine disagreement), route it to
`squads/products/tasks/resolve-specialist-conflict.md` before the repair order proceeds past that
link.

## Acceptance Criteria

- Every artifact for the initiative appears in the report, including ones that looked obsolete.
- Every one of the six contradiction checks has a recorded result; none is left "not run".
- Every break is classified INDEPENDENT or INHERITED, and the inheritance test is stated for each.
- The propagation rule is applied: everything downstream of the earliest break is marked SUSPECT,
  including links whose own check passed.
- The repair direction verdict is explicit, and the inverted case (stale upstream artifact) is
  reported as a decision routed to the upstream owner, never resolved by the audit.
- An UNDECIDABLE direction is recorded as undecidable, not resolved by preference.
- The repair order is upstream-first, one owner per repair, with parallel-safe repairs flagged.
- No contradiction is narrated as consistency.
- Ethical concerns surfaced by any artifact appear before the repair order, not appended after it.
- The report exists in the repository as a versioned markdown file.
- The audit produced no strategy, positioning, pricing, job, discovery or experiment content.
- No routing decision overrides Agent Authority: git push, PRs, MCP and CI/CD go to `@devops`;
  story creation goes to `@sm`; story validation and backlog go to `@po`; epics and PRDs go to
  `@pm`.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` | The segment or outcome link is broken, or the direction verdict is UPSTREAM REPAIR and the strategy must be ratified or revised |
| `@jobs-analyst` | The job link is broken, or the positioning names a competitive alternative the job does not explain |
| `@discovery-lead` | The solution link is broken, or a solution is more confident than the assumptions tested under it |
| `@positioning-lead` | The narrative link is broken, or the target customer does not match the strategy segment |
| `@pricing-strategist` | The price link is broken independently, or the value metric does not scale with the delivered value |
| `@experimentation-lead` | The measure link is broken, or the primary metric does not measure the named outcome |
| `@products-chief` (`*conflict-resolve`) | Two artifacts claim the same link and genuinely disagree |
| `@pm` | The chain is coherent and the evidenced problem is ready for epic framing |
| `@po` | A repair changed the evidence enough to require backlog reprioritization |
| `@analyst` | Resolving a break needs market or competitive research beyond a squad cycle |
| `@devops` | Git push, PRs, MCP, CI/CD — exclusive authority, no exceptions |

## Method attribution

`@products-chief` (Helm) carries no external product methodology. The coherence chain, the
inheritance test and the repair-order procedure in this task are original AEXOS orchestration
mechanics and are not attributed to any author. The published methods live in the specialists this
task routes repairs to, and are attributed in their own agent files and tasks: Marty Cagan
(product-strategist), Teresa Torres (discovery-lead), April Dunford (positioning-lead),
Clayton M. Christensen with Taddy Hall, Karen Dillon and David S. Duncan (jobs-analyst),
Madhavan Ramanujam and Georg Tacke (pricing-strategist), and Ron Kohavi, Diane Tang and Ya Xu
(experimentation-lead).

## Related

- Agent: `squads/products/agents/products-chief.md`
- Squad registry: `squads/products/squad.yaml`
- Checklist: `squads/products/checklists/coherence-checklist.md` (PRD-CL-011)
- Routing data: `squads/products/data/product-squad-routing.yaml`
- Sibling task (routing): `squads/products/tasks/triage-product-request.md`
- Sibling task (arbitration): `squads/products/tasks/resolve-specialist-conflict.md`
- Consolidated brief template: `squads/products/templates/product-brief-tmpl.yaml`
