---
task: Design And Validate The Account Health Model
responsavel: "@retention-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - activation_inputs: First-value definitions, activation milestones and the habit criterion from @onboarding-lead (required)
  - candidate_signals: Proposed signals with the data that backs each one (required)
  - completed_period: A closed renewal period with known outcomes, for backward validation (required)
  - intervention_window: The time each touch model needs for an intervention to change anything (required)
  - instrumentation_inventory: Which candidate inputs are instrumented, proxied or unavailable (optional)
Saida: |
  - health_model: Four dimensions kept separate, with the admitted signals per dimension (persisted)
  - signal_table: Per signal - measured lead time, hit rate, loss coverage, segment validity, verdict
  - backward_validation: Renewal rate by health state over the completed period, with the separation reported
  - states_and_triggers: Each state with its owner, action, time bound and exit condition
  - instrumentation_gaps: Inputs marked UNMEASURED or proxied, with named requirements for @data-engineer
  - revalidation_date: When the model is re-tested, and what forces an early re-test
Checklist:
  - "[ ] Activation milestones and habit criterion taken from @onboarding-lead, not reinvented here"
  - "[ ] Candidate signals enumerated across value realization, adoption breadth, relationship depth and commercial posture"
  - "[ ] Lead time measured for every candidate signal against a completed period"
  - "[ ] Every signal firing inside the intervention window excluded from the register and the exclusion stated"
  - "[ ] Hit rate compared against the base rate, not against zero"
  - "[ ] Backward validation run: renewal rate by health state over the completed period, separation reported"
  - "[ ] Dimensions kept separate; any collapse into one score justified explicitly"
  - "[ ] Each state names owner, action, time bound and exit condition"
  - "[ ] Every input marked INSTRUMENTED, PROXIED or UNMEASURED, with gaps raised to @data-engineer"
  - "[ ] No price, discount or contract-term recommendation anywhere in the output"
  - "[ ] No named individual characterized and no customer record reproduced"
  - "[ ] Model written to squads/customer-success/data/ with a revalidation date"
---

# *health-model

Materializes `@customer-success:retention-lead *health-model`.

Design or revise the account health model: four dimensions, signals with measured lead time,
backward validation against a completed period, and states that name an owner and a trigger.

## Purpose

A health score that was never tested against a completed period is decorative. It produces
confident colour codes that do not separate renewers from churners, and it displaces the signals
that would have. This task builds a model that is validated backwards before it is deployed
forwards, and that gives enough lead time for a value intervention rather than only a commercial
one.

## Pre-conditions

- `@customer-success:onboarding-lead` has supplied segmented first-value definitions, activation
  milestones and the habit criterion. Building without them guarantees convenience metrics; if
  they do not exist, run `onboarding-lead-define-first-value.md` first.
- A completed renewal period with known outcomes is available. Without it, backward validation is
  impossible and no model may be published.
- The intervention window per touch model is stated. A signal cannot be qualified without it.

## Procedure

### Step 1 - Take the activation inputs

Import first-value definitions, activation milestones and the habit criterion. Do not restate or
redefine them here; if they are wrong, that is a finding routed back to `@onboarding-lead`, not a
local correction.

### Step 2 - Enumerate candidate signals in four dimensions

Keep the dimensions separate at this stage:

| Dimension | Question | Typical strength |
|---|---|---|
| Value realization | Is the account demonstrating the outcome it bought? | Primary - closest to what determines renewal |
| Adoption breadth | How many distinct users and teams depend on it? | Strong - predicts resilience to personnel change |
| Relationship depth | Is there an engaged sponsor, and a successor if the champion leaves? | Moderate, often segment-specific, frequently poorly instrumented |
| Commercial posture | How is the account behaving commercially? | Late - usually inside the intervention window |

### Step 3 - Measure lead time for every candidate

Against the completed period, compute the median interval between the signal firing and the
renewal outcome. State it in days. A signal without a measured lead time is an opinion with a
colour code.

### Step 4 - Compute hit rate and loss coverage

Hit rate: the proportion of firings that preceded a loss, compared against the base rate rather
than against zero. Coverage: the proportion of losses the signal fired for. A precise signal that
catches five per cent of losses is not a monitoring system.

### Step 5 - Discard signals inside the intervention window

Any signal whose lead time is shorter than the intervention window reports the loss rather than
warning of it. Exclude it from the risk register, and state the exclusion - a model built on late
signals produces nothing but discount requests, and the sales squad owns those.

Remove convenience metrics that predict barely better than chance, and say why they are being
removed.

### Step 6 - Validate backwards

Score the previous completed cohort with the proposed model and report the renewal rate for each
health state. If healthy and at-risk states do not separate materially, stop and revise. Publish
the separation figures, including for the model being replaced.

### Step 7 - Define states with triggers

Each state names: the owner, the action, the time bound, and the exit condition. A score with no
owner and no trigger is reporting, not a model.

### Step 8 - Mark instrumentation and set a revalidation date

Per input: INSTRUMENTED, PROXIED (label the proxy at every use) or UNMEASURED. Raise named
requirements to `@data-engineer`. Set a revalidation date, and state that the model is re-tested
immediately if the activation model changes.

### Step 9 - Record and self-critique

Write to `squads/customer-success/data/health-model-<yyyy-mm-dd>.md` using
`.aexos-core/development/tasks/create-doc.md` if a driver is wanted, then run
`.aexos-core/development/checklists/self-critique-checklist.md` through
`.aexos-core/development/tasks/execute-checklist.md`. Anything not traced to instrumented data, a
dated customer record or a dated interview is marked UNVERIFIED and does not enter the model.

## Customer Data Rules

Mandatory, because this task touches accounts and feedback-derived signals.

- Health is a property of an account. Never characterize a named individual in a health artifact -
  "the champion is disengaged" is a personal-data liability with almost no predictive value
  compared to "a contact role change occurred with no successor engaged in 30 days".
- Work at account and cohort level; store no personal data beyond what the retention question
  requires.
- Reference records; do not reproduce them. Contacts, contract terms, support transcripts and
  identified survey verbatims stay in the authorized system of record.
- Never re-identify anonymous feedback used as a signal input.
- Sensitive or special-category personal data is out of scope - escalate to the human owner.

## Boundaries

This task recommends no price, no discount and no contract term - that boundary is absolute and
belongs to the `sales` squad, which this task supplies with evidence only. It does not design
activation milestones (`@onboarding-lead`), does not own the loyalty instrument
(`@advocacy-lead`), does not own feedback taxonomy and routing (`@voice-lead`), does not answer
why customers switch causally (`@products:jobs-analyst`), does not implement telemetry
(`@data-engineer`), and produces no story, code, test or release (`@sm`, `@dev`, `@qa`,
`@devops`).

Retention by obstruction is refused outright: no cancellation friction, no data withholding, no
auto-renewal exploitation, no matter how the request is framed.

## Acceptance Criteria

- Every admitted signal carries a measured lead time, a hit rate against the base rate, and stated
  loss coverage.
- No signal inside the intervention window appears in the risk register.
- Backward validation is reported with renewal rates by state, including a negative result if that
  is what the data shows.
- Dimensions remain separate unless a collapse is explicitly justified.
- Every state names an owner, an action, a time bound and an exit condition.
- Activation inputs are cited as inputs from `@onboarding-lead`, not restated as local definitions.
- No individual is characterized and no customer record is reproduced.
- The model is versioned in the repository with a revalidation date.

## Handoff

| Destination | What is handed over |
|---|---|
| `@customer-success:onboarding-lead` | Early-tenure accounts the model cannot score, and losses concentrated before first value |
| `@customer-success:advocacy-lead` | Confirmation of realized value before an account is used as a reference; open detractor loops that block expansion |
| `@customer-success:voice-lead` | Unresolved-issue patterns behind unhappy classifications, for cross-channel aggregation |
| `@customer-success:cs-chief` | Repeated causes, cross-discipline patterns, and conflicting reads of the same account |
| `@data-engineer` | Instrumentation requirements for proxied and unmeasured inputs |
| `sales` squad | Value evidence and readiness signals only - never a price, a discount or a term |
| `@pm` | A repeated churn cause that is an evidenced product problem needing epic framing |

## References

Verified paths only:

- `squads/customer-success/squad.yaml`
- `squads/customer-success/agents/retention-lead.md`
- `squads/customer-success/tasks/onboarding-lead-define-first-value.md`
- `.claude/CLAUDE.md`
- `.aexos-core/core-config.yaml`
- `.aexos-core/development/tasks/advanced-elicitation.md`
- `.aexos-core/development/tasks/create-doc.md`
- `.aexos-core/development/tasks/ux-user-research.md`
- `.aexos-core/development/tasks/execute-checklist.md`
- `.aexos-core/development/checklists/self-critique-checklist.md`
- `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`

## Method Attribution

The framework applied here is published by Nick Mehta, Dan Steinman and Lincoln Murphy in
*Customer Success: How Innovative Companies Are Reducing Churn and Growing Recurring Revenue*
(Wiley, 2016). The constructs used are continuous health management, touch-model segmentation,
time-to-value reduction, the product as the scalable mechanism, company-wide ownership, and drift
as the default state. This task applies that framework with attribution.

Attribution limits, carried from the agent and binding on this task:

- The source organizes its guidance as a set of laws of customer success. Do NOT reproduce the
  canonical wording, numbering or ordering of those laws from memory. VERIFY against the book
  before publishing any quotation, law number or page reference. A wrong attribution is worse than
  none.
- Statements restating a construct in this task's own words are paraphrase, not quotation, and are
  labelled as such.
- Retention metrics - gross revenue retention, net revenue retention, logo churn, cohort retention
  curves - are standard industry measures and are not attributed to this or any other source.
- Lead-time validation of signals, backward validation against a completed period, the unserved /
  unhappy / unfit / drift split, and deferred-risk logging of discount-only saves are this agent's
  operating conventions, consistent with the source's premise but not presented as its content.
