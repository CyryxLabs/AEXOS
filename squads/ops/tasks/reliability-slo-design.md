---
task: Design Service Level Objectives
responsavel: "@reliability-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - service: The service the objective is being set for (required)
  - critical_journeys: The user journeys that matter, named as journeys not components (required)
  - measured_history: Observed performance data over at least one full window (optional; absence forces a provisional target)
  - contractual_floor: Any SLA, regulatory or contractual availability floor (optional)
  - dependency_chain: Hard dependencies and their documented failure and recovery behaviour (optional)
  - business_context: Who pays for the reliability and what they will fund (optional)
Saida: |
  - sli_table: One row per indicator with event definition, valid-event denominator, data source, current value
  - slo_table: Target, measurement window, and a perceptibility or cost justification per objective
  - error_budget: The objective's complement, expressed over the window in time or events
  - unreachable_findings: Objectives that architecture caps rather than effort, routed to @architect
  - instrumentation_requests: Indicators not computable today, packaged as a request for @dev
  - unverified_register: Every figure not traced to measured data, explicitly marked UNVERIFIED with a review date
  - slo_document: Versioned markdown file in the repository, with owner and review date
Checklist:
  - "[ ] Name the critical user journeys before any component is discussed"
  - "[ ] Define one SLI per journey with event definition, valid-event denominator and data source"
  - "[ ] Reject any proposed objective that has no measurable indicator behind it"
  - "[ ] Set a target and a measurement window for each objective"
  - "[ ] State a perceptibility or cost justification for each chosen level"
  - "[ ] Test the target against the dependency chain and flag anything only architecture can reach"
  - "[ ] Derive the error budget arithmetically from the objective over the window"
  - "[ ] Mark every figure not traced to measured data as UNVERIFIED with a review date"
  - "[ ] Name the owner and the review date for the document"
  - "[ ] Confirm no monitoring, pipeline, gate, release or push action is performed or instructed"
  - "[ ] Persist the SLO document as a versioned file in the repository"
---

# Design Service Level Objectives

Materializes `@reliability-lead` `*slo-design`, with `*sli-select` as its mandatory first half —
an objective without an indicator is a slogan with a percentage sign.

## Purpose

Convert "it should be reliable" into a number, a window, and an indicator that can be computed from
data. Reliability is an engineering quantity with a cost curve, not an aspiration. The job is to
find the level at which the next failure stops being perceptible to the user or costly to the
business, and stop there deliberately.

## Boundary — read before executing

This task sets **policy**. It operates nothing.

| This task produces | Who does the rest |
|---|---|
| SLI and SLO specification | Instrumentation code → `@dev` |
| Error budget derived from the objective | Gates, freezes, pipeline changes → **`@devops`, exclusive** |
| Signal and threshold specification | Monitoring, alert routing and paging configuration → **`@devops`, exclusive** |
| Non-functional criteria | Test evidence and quality gate → `@qa` |
| Findings that only architecture can satisfy | Redundancy and failure-domain decisions → `@architect` |

Where an objective implies a change to a running system, this task writes the **specification** and
names **@devops** as the executor. If a recommendation from this task ever reads as authorization to
configure monitoring, change a pipeline, cut a release or push, it is being misread.

## Pre-conditions

| # | Condition | Blocking | How to check |
|---|---|---|---|
| 1 | The service has a named owner who can accept the target | Yes | Ask; an unowned target is not a commitment |
| 2 | At least one critical user journey can be named | Yes | "Users experience X completing" — not "the process is up" |
| 3 | It is known whether measured history exists | Yes | Check the data source directly, do not assume |
| 4 | Any contractual or regulatory floor is on the table | No | A floor is a floor, not a target |
| 5 | Hard dependencies and their documented failover behaviour are listed | No | Missing detail becomes an UNVERIFIED entry, not a guess |

## Procedure

### Step 1 — Journeys, not components

Write down what users are doing when they experience failure. *Submit order. Load the dashboard.
Receive the confirmation.* Component uptime that does not map to a user journey measures the wrong
thing accurately. [SOURCE: *Site Reliability Engineering*, O'Reilly 2016.]

Refuse to proceed on "the API is up" as a journey.

### Step 2 — Select indicators

For each journey define one indicator in the form **good events / valid events, over a window**.

| Form | Event definition |
|---|---|
| Availability | Successful requests / valid requests |
| Latency | Requests served under a threshold / valid requests |
| Quality | Correct or complete responses / valid responses |
| Freshness | Data younger than a threshold / data served |
| Durability | Records retained / records written |

Every indicator must state three things or it is not an indicator yet:

1. **Event definition** — what counts as a good event
2. **Valid-event denominator** — what counts as an attempt; without it the ratio is meaningless
3. **Data source** — the log, stream or metric it is computed from

Qualification tests:

- Does it move when users suffer, and stay still when they do not? → good indicator
- Does it require a human to interpret before it means anything? → not an indicator yet
- Is it computable from data that exists today? → if not, it becomes an instrumentation request for `@dev`, and any objective on it is provisional until the data exists

### Step 3 — Set the target and the window

Every objective is a target **and** a measurement window **and** a justification.

| Situation | Rule |
|---|---|
| Users cannot perceive the difference between the current and the proposed level | Do not buy it |
| A contractual or regulatory floor exists | It is a floor; set the internal objective above it so the internal signal fires first |
| The dependency chain already caps achievable reliability | The objective cannot exceed the weakest hard dependency without redundancy work — say so explicitly and route to `@architect` |
| Measured history exists | Set the first objective near observed performance, then tighten deliberately |
| No measured history at all | Declare a provisional objective, mark it UNVERIFIED, set a review date after one full window |

**100% is the wrong target.** [SOURCE: *Site Reliability Engineering*, O'Reilly 2016, Ch. 3
"Embracing Risk".] Past a point the user cannot perceive the difference, and the cost of the next
nine is paid entirely by you. Users cannot reach you at 100% anyway — their networks, devices and
intermediaries fail below whatever you achieve.

### Step 4 — Derive the error budget

The budget is the objective's complement over the window. [SOURCE: SRE book, Ch. 3.]

| Objective | Budget over a 30-day window |
|---|---|
| 99.0% | approximately 7h 12m |
| 99.5% | approximately 3h 36m |
| 99.9% | approximately 43m 12s |
| 99.95% | approximately 21m 36s |
| 99.99% | approximately 4m 19s |

The budget is the release, migration, experiment and drill allowance. It is not a shameful residue
to be driven to zero — treating it that way converts a velocity mechanism into a fear mechanism.

Report burn **rate against window**, never remaining balance alone. A budget half spent in one hour
and half spent over a quarter are different situations with different responses.

### Step 5 — State what is not being proposed

Name the objective you are declining and why. A target that architecture caps rather than effort
is an `@architect` conversation, not a target-setting one. Say that in the document rather than
quietly setting a number nobody can hold.

### Step 6 — Mark provenance

Constitution Article IV — No Invention. Every number traces to measured data, a stated business
commitment, or a named assumption marked **UNVERIFIED** with a review date. An SLO document where
measured and assumed figures are indistinguishable is worse than no document, because it will be
quoted in a contract.

### Step 7 — Name the executing authority for every downstream consequence

If this objective will feed an error budget policy, state now — in the document — that every gate,
freeze and release consequence is executed by `@devops` under their exclusive authority. A policy
whose consequences do not name their executor leads directly to someone outside `@devops` reaching
for a pipeline they do not hold.

### Step 8 — Persist

Write the SLO document to a versioned file in the repository, with an owner and a review date. A
reliability target that lives in a dashboard configuration nobody can review is not a policy
(Constitution Article I — CLI First).

## Acceptance criteria

- [ ] Critical user journeys are named before any component appears in the document
- [ ] Every SLI has an event definition, a valid-event denominator, and a named data source
- [ ] Every SLO has a target, a measurement window, and a perceptibility or cost justification
- [ ] No objective exists without a measurable indicator behind it
- [ ] The error budget is derived arithmetically from the objective over the stated window
- [ ] Objectives unreachable without architectural change are named as such and routed to `@architect`
- [ ] Indicators not computable today are packaged as instrumentation requests for `@dev`, with the objective marked provisional
- [ ] Every figure is traced to measured data or explicitly marked UNVERIFIED with a review date
- [ ] Any downstream gate, freeze or release consequence names `@devops` as its executor
- [ ] The document has a named owner and a review date
- [ ] No monitoring, alerting, pipeline, release or push action was performed or instructed by this task
- [ ] The document is a versioned file in the repository

## Handoff

| To | When |
|---|---|
| `@ops:ops-chief` | The reliability question turns out to be a flow, waste or incident question, or the target conflicts with another operational policy and needs arbitration |
| `@ops:flow-lead` | The objective is limited by where work piles up rather than by the service — the constraint decides throughput before any target does |
| `@ops:lean-lead` | The operational load behind the target is process waste rather than technical toil |
| `@ops:incident-lead` | Budget burn indicates an active incident, or a postmortem must feed targets and accepted risks |
| `@architect` | The objective is unreachable without redundancy, failover or dependency isolation |
| `@dev` | Instrumentation, exporters or automation must be implemented before an indicator is computable |
| `@qa` | The target must be expressed as verifiable non-functional acceptance criteria with evidence |
| `@devops` | Every pipeline, gate, freeze, release, monitoring configuration and push action — **exclusive authority, no exceptions** |
| `@pm` | The target implies scope or roadmap consequences that need epic framing |

## Attribution

The framework applied here is published as *Site Reliability Engineering: How Google Runs Production
Systems* (O'Reilly, 2016), edited by Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard
Murphy, with practical extension in *The Site Reliability Workbook* (O'Reilly, 2018).

`@reliability-lead` applies that framework with attribution. Where a practice is common industry
convention rather than a documented position from those volumes, it is labelled as convention and is
not attributed to the book.

## Related

- **Agent:** `squads/ops/agents/reliability-lead.md` (Keel)
- **Elicitation for the objective workshop:** `.aexos-core/development/tasks/advanced-elicitation.md`
- **Document generation:** `.aexos-core/development/tasks/create-doc.md`
- **Non-functional assessment, consumed when handing targets to `@qa`:** `.aexos-core/development/tasks/qa-nfr-assess.md`
- **Latency input:** `.aexos-core/development/tasks/analyze-performance.md`
- **Self-critique before publication:** `.aexos-core/development/checklists/self-critique-checklist.md`
- **Base document structure:** `.aexos-core/development/templates/aexos-doc-template.md`
