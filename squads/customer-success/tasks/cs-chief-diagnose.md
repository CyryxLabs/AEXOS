---
task: Diagnose And Route A Customer Success Request
responsavel: "@cs-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - request: The request in the requester's own words (required)
  - symptom_date: When the symptom was first noticed and what changed before it (required)
  - population: One account, one cohort, one segment, or the whole base (required - do not proceed while ambiguous)
  - existing_evidence: Instrumented facts, dated records or dated interviews already available, with dates (optional)
  - pending_decision: The decision at stake and the human who makes it (optional)
Saida: |
  - triage_record: Request as stated, request as owned, origin lifecycle stage, population, dated (persisted)
  - owner: Exactly one owning specialist id, with the excluded near misses and the reason for each
  - provisional_answer: A two-minute usable answer, explicitly labelled provisional
  - handoff_brief: Symptom, date, population, evidence inventory and the open question the specialist must answer
  - data_constraints: What may be referenced in artifacts and what must stay in the system of record
Checklist:
  - "[ ] Request restated in lifecycle vocabulary and confirmed with the requester"
  - "[ ] Symptom dated, with the change that preceded it named or marked UNKNOWN"
  - "[ ] Population named as account, cohort, segment or base before any routing decision"
  - "[ ] Origin lifecycle stage attributed and distinguished from the stage where the symptom surfaced"
  - "[ ] Exactly one owning specialist named from squad.yaml, with excluded near misses and reasons"
  - "[ ] Boundary checked: job discovery, commercial negotiation and core-agent work routed out, not absorbed"
  - "[ ] Provisional answer given and labelled provisional"
  - "[ ] Data constraints recorded: account or cohort level by default, records referenced not reproduced"
  - "[ ] Handoff brief written so the specialist does not re-elicit context"
  - "[ ] Triage record written to squads/customer-success/data/ and dated"
---

# *diagnose

Materializes `@customer-success:cs-chief *diagnose`.

Triage a customer success request: restate it in lifecycle terms, attribute the stage where it
originated, name exactly one owner, give a short usable answer, and route it with a written brief.

## Purpose

The most common customer success failure is misattribution. A problem is assigned to the stage
where it was noticed rather than the stage where it was caused, so the intervention lands after
the loss was already determined and the real defect goes unfunded. This task produces an
attribution and a single owner before any specialist method is applied.

## Pre-conditions

- The request exists in the requester's own words. If it arrives as a proposed remedy
  ("we need a save play"), convert it back to a symptom before starting.
- `squads/customer-success/squad.yaml` is readable - it is the source of agent ids, tiers and the
  handoff matrix, and it is not modified by this task.
- The population is answerable. If the requester cannot say whether this is one account or the
  whole base, stop and elicit it; every downstream step changes with the answer.

## Procedure

### Step 1 - Restate in lifecycle vocabulary

Rewrite the request using the chain: promise -> activation -> adoption -> realized value ->
health -> renewal -> advocacy. Name the link the symptom appears on. Read the request back to the
requester in this form and get confirmation before continuing.

### Step 2 - Date the symptom

Record when it was first noticed, by whom, and what changed in the preceding period (a release, a
pricing change, a segment entering the base, a process change). If nothing is known to have
changed, write UNKNOWN rather than inventing a cause.

### Step 3 - Name the population

Classify as one account, a named cohort, a segment, or the whole base. Record the size. Refuse to
proceed while this is ambiguous - an account question and a cohort question have different owners
and different remedies.

### Step 4 - Attribute the origin stage

The stage where a symptom surfaces is rarely the stage where it originated. Apply the attribution
rules:

| Observed | Likely origin | Route implication |
|---|---|---|
| Losses concentrated before first value or in the first 90 days | Activation | `onboarding-lead` owns it |
| Losses after a period of healthy use, following a champion or workflow change | Health / drift | `retention-lead` owns it |
| Losses at renewal, no prior behaviour change, heavy price focus | Promise | `retention-lead` supplies value evidence; the negotiation is the sales squad's |
| Low adoption of one capability while overall health is fine | Demand signal | `voice-lead` owns the capture and routing |
| A score moved with no behaviour movement | Measurement instrument | `advocacy-lead` owns it |

State the origin stage and the evidence that supports the attribution. If there is none, say so
and mark the attribution PROVISIONAL.

### Step 5 - Select exactly one owner

Choose one specialist id from `squads/customer-success/squad.yaml`: `onboarding-lead`,
`retention-lead`, `advocacy-lead` or `voice-lead`. Then list the near misses that were excluded
and the reason for each, taken from that specialist's own NOT-list in
`squads/customer-success/agents/<id>.md`.

Never broadcast one request to several specialists. If the situation genuinely spans disciplines,
order them from the earliest broken link and name the input each one needs from the previous.

### Step 6 - Boundary check

Confirm the request is still adoption, realized value, retention or customer voice. Route out
without absorbing when it is not:

- What job the customer hires the product to do, or the causal account of a switch ->
  `@products:jobs-analyst`
- A structured discovery program or assumption testing -> `@products:discovery-lead`
- Renewal negotiation, discounting, contract terms, expansion offers -> the `sales` squad
- Epic framing or PRD -> `@pm`; story drafting -> `@sm`; story validation and backlog -> `@po`
- Implementation -> `@dev`; quality gates -> `@qa`; git push, PRs, CI/CD -> `@devops` (exclusive)

This task produces no story, no epic, no code, no test and no release.

### Step 7 - Give the provisional answer

Write the two-minute usable version and label it provisional. It must be short enough that nobody
mistakes it for the specialist's output, and honest about what would change it.

### Step 8 - Record data constraints

State what the specialist may carry into artifacts and what must stay in the system of record.
Default to account and cohort level. See the customer data rules below.

### Step 9 - Write the triage record and the handoff brief

Write both to `squads/customer-success/data/triage-<yyyy-mm-dd>-<slug>.md`. Use
`.aexos-core/development/tasks/create-doc.md` if a driver is wanted. The handoff brief must carry
symptom, date, population, evidence inventory with dates, data constraints, and the single open
question the specialist must answer.

### Step 10 - Self-critique before release

Run `.aexos-core/development/checklists/self-critique-checklist.md` against the record via
`.aexos-core/development/tasks/execute-checklist.md`. Confirm every statement traces to a named
source, a dated record or an explicit UNKNOWN.

## Customer Data Rules

Mandatory, because this task touches accounts and feedback.

- Work at account and cohort level. Individual identity is almost never required for a routing
  decision.
- Do not request or store personal data beyond what the routing decision requires.
- Reference records; do not reproduce them. No contact records, support transcripts, contract
  terms or identified survey verbatims in the triage record - cite the record id in the authorized
  system of record and carry only the finding.
- Never re-identify anonymous feedback, and never instruct a specialist to.
- If the request requires health, financial, credential or other special-category personal data,
  stop and escalate to the human owner instead of proceeding.

## Acceptance Criteria

- The routed specialist accepts the request as theirs without re-routing.
- The origin stage is stated and is distinguishable from the stage where the symptom surfaced.
- Exactly one owner is named; the excluded near misses each carry a reason.
- The population is named with a size before any owner is named.
- The provisional answer is present and labelled.
- No statement in the record lacks a source, a date or an explicit UNKNOWN marker.
- No personal data beyond account-level references appears anywhere in the record.
- The record exists as a versioned file in the repository, not only in the session transcript.

## Handoff

| Destination | When |
|---|---|
| `@customer-success:onboarding-lead` | Origin is activation, first value, adoption path or early-life friction |
| `@customer-success:retention-lead` | Origin is account health, churn signal, intervention or expansion readiness |
| `@customer-success:advocacy-lead` | Origin is the loyalty instrument, promoters and detractors, or references |
| `@customer-success:voice-lead` | Origin is feedback capture, theme extraction or signal routing |
| `@products:jobs-analyst`, `@products:discovery-lead` | The question is customer job discovery or needs a research program |
| `sales` squad | The question is renewal negotiation, discount, contract terms or an offer |
| `@pm` | A customer problem is evidenced and chosen, and needs epic framing |

## References

Verified paths only:

- `squads/customer-success/squad.yaml`
- `squads/customer-success/agents/cs-chief.md`
- `.claude/CLAUDE.md`
- `.aexos-core/core-config.yaml`
- `.aexos-core/data/entity-registry.yaml`
- `.aexos-core/data/workflow-chains.yaml`
- `.aexos-core/development/tasks/advanced-elicitation.md`
- `.aexos-core/development/tasks/create-doc.md`
- `.aexos-core/development/tasks/execute-checklist.md`
- `.aexos-core/development/checklists/self-critique-checklist.md`
- `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`
