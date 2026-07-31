---
task: Identify The System Constraint
owner: "@flow-lead"
owner_type: agent
atomic_layer: task
Input: |
  - value_stream: The stages from work entering the system to value being delivered (required)
  - queue_evidence: Items waiting per stage and the age of the oldest item (required; anecdote is not evidence)
  - state_times: Median work time and median wait time per stage (optional but strongly preferred)
  - proposal_on_table: Any improvement, hire or investment already being proposed (optional)
  - existing_policies: Approval rules, batch rules, release windows and handoff agreements in force (optional)
Output: |
  - constraint: Exactly one named step that sets throughput, with the evidence behind the claim
  - constraint_type: Capacity, policy, skill, dependency or market
  - excluded_candidates: Other candidates with the reason each was excluded
  - exploit_options: Capacity recoverable inside the constraint at no capital cost, quantified
  - subordination_rules: How every non-constraint must operate, and the local metrics being abandoned
  - next_constraint_prediction: Where the constraint moves if this one is relieved
  - throughput_verdict: Any proposal on the table scored against throughput, inventory and operating expense
  - constraint_document: Versioned markdown file in the repository
Checklist:
  - "[ ] Map the value stream stage by stage, from entry to delivered value"
  - "[ ] Collect queue evidence per stage: items waiting and age of the oldest"
  - "[ ] Compare wait time to work time per stage and record the ratio"
  - "[ ] Name exactly one constraint, with queue or state-time evidence behind it"
  - "[ ] Test each rival candidate for starvation; a real constraint is never idle waiting for input"
  - "[ ] Classify the constraint as capacity, policy, skill, dependency or market"
  - "[ ] Enumerate and quantify exploitation options before any elevation is discussed"
  - "[ ] State subordination rules and the local metrics being deliberately abandoned"
  - "[ ] Predict where the constraint moves next before any change is proposed"
  - "[ ] Score any proposal on the table against throughput, inventory and operating expense"
  - "[ ] Route findings that touch build or release to @devops, gate findings to @qa, sequencing to @po and @sm"
  - "[ ] Mark any figure not measured as UNVERIFIED"
  - "[ ] Persist the constraint analysis as a versioned file in the repository"
---

# Identify The System Constraint

Materializes `@flow-lead` `*find-constraint`, with `*queue-map` as its evidence-gathering half and
`*policy-constraint` as its mandatory alternative hypothesis.

## Purpose

Name the one step that sets the throughput of the whole system, from evidence rather than from
complaint. Until that is named, no improvement proposal is a decision — it is a preference. An
improvement made away from the constraint produces excellent local numbers and changes the system's
output by nothing.

## Boundary — read before executing

This task **diagnoses flow policy**. It operates nothing.

| This task produces | Who does the rest |
|---|---|
| Constraint identification and the evidence for it | Any implementation → `@dev` |
| Exploit and subordination rules | Build, CI, pipeline and release changes → **`@devops`, exclusive** |
| Buffer and release-rule specification | Deployment and release execution → **`@devops`, exclusive** |
| Gate findings when verification is the constraint | Gate redesign → `@qa`, **never bypass** |
| The flow argument for a sequencing decision | Backlog order → `@po`; story creation → `@sm` |
| Elevation case with cost and expected gain | Hiring and budget decisions → the humans who own them |

Constraint analysis is powerful precisely because it justifies changing things. That makes the
authority boundary more important here, not less. Where a finding implies a change to a running
system, this task writes the **finding and the exploit rule** and names **@devops** as the executor.
It never edits a pipeline, weakens a gate or reorders a backlog.

## Pre-conditions

| # | Condition | Blocking | How to check |
|---|---|---|---|
| 1 | The value stream's boundaries are agreed — where work enters and where value is delivered | Yes | If the boundary is unclear, the constraint may sit outside it |
| 2 | Queue evidence exists or can be gathered per stage | Yes | Items waiting and age of oldest; a board, a tracker or repository history |
| 3 | The definition of "delivered" is agreed | Yes | Started work and finished-but-undelivered work are inventory, not throughput |
| 4 | Existing approval, batch and release policies are listed | No | Policy constraints are the cheapest to elevate and the hardest to see |

## Procedure

### Step 1 — Map the stream

List every stage from entry to delivered value, including the waiting states between them. Waiting
states are stages. Most of the elapsed time lives in them.

### Step 2 — Gather queue evidence

Per stage record: items waiting, age of the oldest item, median work time, median wait time. Where
a figure is self-reported rather than measured, mark it **UNVERIFIED** and say so in the table.

Constitution Article IV — No Invention. A constraint asserted from intuition is a guess wearing a
framework.

### Step 3 — Identify, by signature

| Signature | Weight |
|---|---|
| Work accumulates in front of it and downstream stages idle | Strongest |
| It never starves — there is always something waiting | Strong |
| Longest ratio of waiting time to working time in the stream | Strong |
| Every expedite request routes through it | Moderate |
| Improvements made elsewhere produced no change in delivered output | Confirming |
| People complain about it | Anecdotal — verify against queue data |

**There is one constraint at a time.** [SOURCE: Goldratt, *The Goal*.] Two claimed constraints
usually means one of three things:

- The downstream candidate is a queue caused by the upstream one — check whether it ever starves; a genuine constraint is never idle waiting for input
- The system boundary was drawn too narrowly and the real constraint is outside it, typically an external dependency or an approval
- Batch sizes and arrival variation are large enough that the constraint moves between steps, which is itself the finding

If no queue exists anywhere and throughput is still low, the constraint is external or it is a
policy.

### Step 4 — Test the policy hypothesis

Before accepting a capacity answer, test whether the constraint is a **rule**: an approval, a batch
size, a release window, a handoff agreement, or a protective rule left over from an older
bottleneck. Policy constraints are usually free to remove and usually invisible, because they were
correct when they were written.

### Step 5 — Classify

| Type | Exploit | Elevate |
|---|---|---|
| Capacity | Remove misrouted work, rework, interruption | Add capacity |
| Policy | Removal itself — and it is free | Not applicable |
| Skill | Delegate, document, pair | Teach |
| Dependency | Buffer against it, batch differently | Redraw the system boundary and re-identify |
| Market | Not internal — stop optimizing internals | Demand work, not operations work |

### Step 6 — Exploit before you elevate

Elevation costs money; exploitation costs a decision. Enumerate and quantify what the constraint's
own capacity is currently spent on:

- Work reaching it that should have been stopped upstream
- Rework caused by upstream quality problems
- Setup, context switching and interruption
- Work another step could perform
- Idle time from starvation — a buffer and release-rule problem, not a capacity problem
- Large arriving batches that could absorb variation earlier

**An hour lost at the constraint is an hour lost by the whole system. An hour saved at a
non-constraint is worth nothing.** [SOURCE: Goldratt.] That single sentence decides where effort is
worth spending.

### Step 7 — Subordinate

Define how every other stage must operate so the constraint is never starved and never buried, and
name the local metric each stage must **explicitly abandon** in writing. Non-constraints will look
underutilized. That is the design, not a failure of the rule: dependent events with variable
durations cannot be run at full utilization at every step without accumulating queues at every step.

Subordination is not permission to weaken a quality gate. Throughput counts **delivered** value; a
faster path that ships defects has reduced throughput while raising every local speed metric. If
verification is genuinely the constraint, exploit it and take the redesign question to `@qa`.

### Step 8 — Predict where it moves

State where the constraint will move if this one is relieved, **before** the change is made.
Organizations that skip this discover the next constraint by surprise, usually after committing to
capacity that is now in the wrong place.

### Step 9 — Score any proposal on the table

Judge every proposal against all three measures. [SOURCE: Goldratt.]

| Measure | Definition |
|---|---|
| Throughput | The rate at which the system generates finished, **delivered** value |
| Inventory | Everything tied up in work not yet delivered — open branches, unreleased changes, pending reviews |
| Operating expense | What it costs to turn inventory into throughput |

A proposal that cannot state its effect on all three has not been evaluated. Adding capacity away
from the constraint raises inventory and operating expense with no throughput gain — that is a
rejection, not a neutral result.

### Step 10 — Route and persist

Route findings that touch build, CI, pipeline or release to `@devops`. Route gate findings to
`@qa`. Route sequencing arguments to `@po` and `@sm` as **evidence for their decision**, never as a
priority order issued from here. Write the analysis to a versioned file in the repository.

## Acceptance criteria

- [ ] Exactly one constraint is named, with queue or state-time evidence behind the claim
- [ ] Rival candidates are listed with the reason each was excluded, including the starvation test
- [ ] The constraint is classified as capacity, policy, skill, dependency or market
- [ ] The policy hypothesis was tested explicitly, not assumed away
- [ ] Exploitation options are enumerated and quantified before elevation is discussed
- [ ] Subordination rules are stated for every non-constraint stage, including the local metrics abandoned
- [ ] Where the constraint moves next is predicted before any change is proposed
- [ ] Every proposal is scored against throughput, inventory and operating expense
- [ ] No proposal weakens or bypasses a quality gate; gate findings go to `@qa` as a redesign question
- [ ] No pipeline, build, release or push action is performed or instructed by this task
- [ ] Sequencing arguments are handed to `@po` and `@sm` as evidence, not as a decree
- [ ] Unmeasured figures are marked UNVERIFIED
- [ ] The analysis is a versioned file in the repository

## Handoff

| To | When |
|---|---|
| `@ops:ops-chief` | The finding needs arbitration against reliability or waste priorities, or the request was not a flow question |
| `@ops:reliability-lead` | The constraint is caused by instability — rework from incidents, unreliable dependencies — and the target or budget is the real lever |
| `@ops:lean-lead` | The constraint's own capacity is being consumed by waste inside the step |
| `@ops:incident-lead` | The throughput collapse is an active incident rather than a chronic condition |
| `@qa` | A quality gate is the constraint and the gate needs redesign — **never** for permission to weaken it |
| `@dev` | Exploitation requires implementation: automated checks, splitting work, removing a serialization |
| `@devops` | Every build, pipeline, CI, release and push change — **exclusive authority, no exceptions** |
| `@po` | The flow argument should inform backlog order and work-in-progress limits — as evidence; the decision stays with `@po` |
| `@sm` | Subordination implies changes to story sizing, drafting cadence or working agreements |
| `@architect` | The constraint is structural coupling that no policy change can relieve |

## Attribution

The framework applied here is the Theory of Constraints as published by Eliyahu M. Goldratt in
*The Goal: A Process of Ongoing Improvement* (1984, written with Jeff Cox) and developed in his
subsequent work.

`@flow-lead` applies that framework with attribution. Later flow conventions — work-in-progress
limits, cumulative flow diagrams, queueing arguments from other schools — are used where useful and
are labelled as **convention**, not attributed to Goldratt.

## Related

- **Agent:** `squads/ops/agents/flow-lead.md` (Throat)
- **Elicitation for the value-stream walkthrough:** `.aexos-core/development/tasks/advanced-elicitation.md`
- **Document generation:** `.aexos-core/development/tasks/create-doc.md`
- **Structural input when the constraint is architectural coupling:** `.aexos-core/development/tasks/analyze-project-structure.md`
- **Work-in-progress snapshot:** `.aexos-core/development/tasks/project-status.md`
- **Self-critique before the claim is published:** `.aexos-core/development/checklists/self-critique-checklist.md`
- **Base document structure:** `.aexos-core/development/templates/aexos-doc-template.md`
