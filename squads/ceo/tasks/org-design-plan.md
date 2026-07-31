---
task: Organisation Design Plan
owner: "@org-designer"
owner_type: agent
atomic_layer: task
Input: |
  - guiding_policy: The current diagnosis and guiding policy from @strategy-lead (required)
  - roles_in_scope: The management roles and teams the design covers (required)
  - calendar_data: Two to four weeks of observed calendar and meeting data (required for the leverage and cadence steps)
  - decision_log: Last quarter of decisions, escalations or tickets, used to derive real decision rights (required)
  - key_processes: The work processes to be modelled as production (optional)
  - existing_structure: Current org chart and reporting lines, if documented (optional)
Output: |
  - output_definitions: Per management role, the team output plus the neighbouring output influenced
  - limiting_steps: Per key process, the limiting step with its evidence
  - indicator_set: Paired indicators with owner, frequency and the action each movement triggers
  - decision_rights: Table of recurring decisions with current level, proposed level and reason
  - cadence: The meeting portfolio with purpose, chair, input, output and what each replaces
  - objectives: Objectives in the two-question form with in-period review points
  - control_mode: The chosen mode with the environment assessment behind it
  - structure: Position on the mission-functional range and the dual-reporting specification
  - transition_cost: The budgeted period of degraded output
  - org_plan_path: Path of the captured org plan
Checklist:
  - "[ ] Criterion confirmed: the diagnosis and guiding policy this design serves"
  - "[ ] Manager output defined as team output plus neighbouring output, not activity"
  - "[ ] Leverage audit run on observed calendar data, not recalled time"
  - "[ ] Negative-leverage activities flagged explicitly"
  - "[ ] Limiting step named with evidence for every key process"
  - "[ ] Every indicator paired with a counter-indicator and tested for gaming"
  - "[ ] Every indicator has an owner, a frequency and a triggered action"
  - "[ ] Every recurring decision has all six decision questions answered"
  - "[ ] Over-escalated and orphaned decisions identified from the decision log"
  - "[ ] Every new or retained meeting states what it replaces"
  - "[ ] One-on-one frequency derived from task-relevant maturity, not seniority"
  - "[ ] Objectives paced by in-period key results and not mechanically coupled to compensation"
  - "[ ] Dual reporting specified decision by decision where a hybrid is chosen"
  - "[ ] Transition cost budgeted as a line item rather than listed as a risk"
  - "[ ] No assessment of any named individual appears in the output"
---

# Organisation Design Plan

Materializes `@org-designer *org-plan`. Produces the organisation design as one captured
artifact: output definitions, limiting steps, paired indicators, decision rights, cadence,
objectives, control mode, structure and the transition cost.

## Purpose

Managerial busyness is not evidence of managerial output. This task asks, for every hour of a
manager's time, how many people's output it changed — and treats a large answer and a negative
answer as equally important findings. It designs the system: where decisions sit, what is
measured, what the calendar is for, and what the change costs while it is happening.

## Attribution

The framework applied here is the one Andrew S. Grove published in *High Output Management*
(1983): a manager's output is the output of the organisation under their supervision plus the
output of neighbouring organisations under their influence; any work process can be modelled as
production with a limiting step and paired indicators; meetings are the medium of managerial
work; decisions are made through free discussion, a clear decision and full support; objectives
answer where we are going and how we will pace ourselves; the mode of control follows from the
environment; and management style follows task-relevant maturity rather than seniority.

The executing agent applies this documented framework. It is not Andrew Grove. It designs
systems, roles and patterns only — never an assessment of a named individual, which belongs to
qualified human management with HR counsel.

## Pre-conditions

- A current guiding policy exists from `@strategy-lead`. Structure follows the policy; an
  organisation designed before the policy is chosen gets redesigned.
- Observed calendar data and a decision log are available. Recalled time and org charts are not
  acceptable substitutes — the design is derived from what the organisation actually does.
- Where any element touches an individual's role or employment, that thread stops here and is
  routed to qualified human management.

## Procedure

### 1. Confirm the criterion

Record the diagnosis and guiding policy this design serves, with dates. If the structure under
review was built for a previous policy, say so — that is the finding, and it changes what the
rest of this task is repairing.

### 2. Define output per role

For each management role in scope: name the organisation under supervision and what it produces
in units an outsider would recognise as output; name the neighbouring organisations the role
influences without supervising, and their output; state the measure for each with a
counter-measure. List what the role currently reports as its accomplishments and, where those are
activities rather than output, say so plainly and without contempt — the confusion is structural.

### 3. Audit leverage

Classify two to four weeks of observed calendar blocks as information gathering, decision making,
nudging, role modelling, or individual production work. Estimate leverage per block: how many
people's output is affected, and how much, per hour of the manager's time. Use ranges.

Flag negative leverage explicitly: decisions left open, interference in work already well
handled, meetings attended without a role, mood transmitted at scale.

Rank by leverage, compare against time actually spent, and recommend three shifts — each stating
what stops to make room. A recommendation that adds without removing is not implementable.

### 4. Model the key processes

For each: map the stages with observed durations; identify the limiting step; test whether
improving any other stage would change the total. If it would not, effort elsewhere is currently
wasted. State what building the process around the limiting step would require. Cross-check
against any chain-link analysis from `@strategy-lead`; if the two disagree, one of them is
looking at the wrong process.

Where a process is opaque, list what is observable today, identify the cheapest existing windows,
and state what each window would change about a decision. A window that changes no decision is
not worth cutting. New instrumentation is specified here and implemented by `@data-engineer`,
never here.

### 5. Design the indicator set

Choose leading indicators where possible. Pair every indicator with a counter-indicator so that
optimising the first exposes damage to the second — volume with defect rate, speed with rework,
throughput with backlog age, utilisation with queue time. For each, state source, collection
cost, frequency, owner, and the action a movement triggers; an indicator nobody acts on is a
report. Test each for gameability: describe how a reasonable person under pressure would move it
without improving output, and confirm the counter-indicator catches that. Keep the set small —
more indicators means less attention per indicator.

### 6. Place the decision rights

Take the recurring decisions from the decision log, not from the org chart. For each, ask where
the knowledge sits and where the responsibility sits. Where they are in different places,
decisions slow; name the mechanism that brings them together — delegated authority, a standing
forum, or an escalation with a clock.

Apply the six questions to each decision class: what is decided, by when (a date, not a quarter),
who decides, who is consulted, who ratifies or can veto and on what stated grounds, who is
informed and through what channel. A question that cannot be answered is why the decision is
stuck; report it as the finding rather than building structure around it.

Identify over-escalated decisions (made above the level where knowledge and responsibility meet)
and orphaned decisions (currently resolved by whoever is most persistent). Where a peer group
decides, name the senior person present to call the decision.

### 7. Design the cadence

Inventory recurring meetings from actual calendars with attendee count and duration; cost each in
manager-hours per month; classify each as process-oriented or mission-oriented. For every
mission-oriented meeting, confirm there is a chair, a stated decision and a pre-circulated
purpose — and count how many in the last quarter produced only further meetings.

Cadence follows decisions: start from the decisions the organisation must make and the frequency
at which the work generates them. Every meeting retained or created states what it replaces.
One-on-one frequency is derived from task-relevant maturity for the specific work, never from
seniority, and the meeting belongs to the person being managed.

### 8. Set objectives, control mode and structure

- **Objectives** in the two-question form — where are we going, and how will we pace ourselves —
  over a horizon short enough to steer by, with in-period review points. Do not couple them
  mechanically to compensation.
- **Control mode** — free-market forces, contractual obligations, or cultural values — selected
  from the complexity, uncertainty and ambiguity of the environment, with that assessment shown.
- **Structure** — place the organisation on the range between mission-oriented (responsive,
  duplicated effort) and functional (scale, less responsive), state honestly what the chosen
  point gives up, and where a hybrid is chosen, specify dual reporting decision by decision.
  Unspecified dual reporting is the failure mode, not dual reporting itself.

### 9. Test any proposed structural change

Which decisions does it move, and where? If it moves no decision, it is a chart change. What
problem does it solve, expressed as a decision that is currently slow or unowned? Could a cadence
or decision-rights change achieve the same result — those are cheaper and reversible, so test
them first and say so. Estimate the transition cost as a budgeted period of degraded output.

### 10. Capture

Sections: CRITERION, OUTPUT DEFINITIONS, LIMITING STEPS, INDICATORS, DECISION RIGHTS, CADENCE,
OBJECTIVES, CONTROL MODE, STRUCTURE, TRANSITION COST, UNVERIFIED, OWNER, REVIEW DATE.

Use `.aexos-core/development/tasks/create-doc.md` as the generation driver and apply
`.aexos-core/development/checklists/self-critique-checklist.md` before release. Default output
path: `docs/executive/org-plan.md` (create the directory if it does not exist).

## Acceptance criteria

- Every management role in scope has an output definition, not an activity list.
- The limiting step is named with evidence for every key process.
- Every indicator is paired, gameability-tested, owned, and attached to a triggered action.
- Every recurring decision has all six questions answered, or the unanswerable one is reported as
  the reason it is stuck.
- No decision sits above the level where knowledge and responsibility meet without a stated
  reason.
- Every meeting in the cadence states what it replaces.
- The transition cost appears as a budgeted line item, not as a risk.
- Claims about how the organisation works trace to calendar data, decision logs or another
  artifact; the rest is marked UNVERIFIED.
- The output contains no assessment of any named individual.

## Handoff

| Destination | What it receives |
|---|---|
| `@strategy-lead` | A structure that follows a superseded guiding policy, or a limiting step that contradicts the chain-link analysis. |
| `@capital-allocator` | The headcount, capacity and transition costs implied by the design, for funding against the hurdle. This task does not decide whether headcount is the right use of capital. |
| `@stakeholder-lead` | The announcement of any structural or cadence change. This task does not draft it. |
| `@ceo-chief` | Conflicts with another specialist's recommendation, for arbitration. |
| `@data-engineer` | Instrumentation specified in step 4 that requires implementation. |
| Qualified human management and HR or legal counsel | Anything affecting an individual's role or employment, before any announcement. |
| `@pm` | Design changes that become delivery work, for epic framing. Story drafting is `@sm` exclusively; implementation `@dev`; quality gates `@qa`; push and release `@devops` exclusively. |
