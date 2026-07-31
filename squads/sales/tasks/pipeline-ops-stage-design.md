---
task: Design Pipeline Stages
owner: "@pipeline-ops"
owner_type: agent
atomic_layer: task
Input: |
  - buyer_journey: How the buyer experiences the purchase, as the buyer experiences it (required)
  - current_stages: The stage model in use today, with its advance rules (required)
  - open_pipeline: Current open deals with their stage, close date and attached evidence (required)
  - qualification_standard: The evidence standard used by @qualification-lead, for alignment (required)
  - historical_conversion: Our own stage-to-stage conversion and cycle time, with deal counts (optional)
Output: |
  - stage_model: Each stage named after buyer action, with its buyer-side exit criterion
  - exit_criteria: The buyer-produced artifact that evidences each stage, and where it lives
  - field_test_results: Per criterion, whether a rep could satisfy it by updating a CRM field
  - remap_report: How many open deals move backwards under the new model, by stage
  - evidence_alignment: Confirmation that stage criteria and the qualification record use the same standard
  - instrumentation_requirements: What must be captured for the model to run, as a specification only
  - unverified_rates: Any conversion rate computed from too few deals, marked UNVERIFIED with its count
  - record_path: Dated stage model specification written under squads/sales/
Checklist:
  - "[ ] Write the buyer journey first, as the buyer experiences it"
  - "[ ] Name every stage after what the buyer has done, not what we delivered"
  - "[ ] Define each exit criterion as a buyer-side artifact"
  - "[ ] Run the field test on every criterion and reject any that a CRM update could satisfy"
  - "[ ] Define what evidence must be attached to advance, and where it lives"
  - "[ ] Align the evidence standard with @qualification-lead"
  - "[ ] Map the current open pipeline onto the new stages"
  - "[ ] Report deals moving backwards as the finding, not as an error"
  - "[ ] State the deal count next to every conversion rate"
  - "[ ] Mark UNVERIFIED any rate computed from too few deals"
  - "[ ] Label any borrowed benchmark as an external hypothesis, never as our number"
  - "[ ] Screen rep-level data for proportionality and disclosure"
  - "[ ] Produce the model as a specification, not an implementation"
  - "[ ] Write the specification under squads/sales/ with its date"
---

# *stage-design — Define Or Repair Pipeline Stages

Materializes the `*stage-design` command of `@pipeline-ops` (Conveyor, Tier 2), defined in
`squads/sales/agents/pipeline-ops.md`.

## Method Attribution

The framework applied here is published by **Mark Roberge** in *The Sales Acceleration Formula:
Using Data, Technology, and Inbound Selling to go from $0 to $100 Million* (2015), written from his
experience building the HubSpot sales organization. Its central claim is the operating premise of
this task: sales scaling can be approached as an engineering problem with formulas — for hiring,
training, management and demand generation — rather than as an art dependent on individual talent.

A boundary the methodology itself insists on, and which this task enforces: **the formulas are
built from the organization's own data.** There is no universal ideal representative, no universal
ramp period, and no universal stage model. Any published list, including the one in the book, is a
hypothesis to validate against local outcomes, never a conclusion to adopt.

This task applies a documented framework with attribution.

## Purpose

If a stage can be advanced by updating a field, it will be, and the funnel becomes a record of
optimism. This task rebuilds the stage model so that advancement costs something the buyer had to
do — which is the only thing that predicts anything downstream.

The output is a **specification**. This task designs and evidences the system; it does not build
it. CRM configuration, instrumentation and reporting code belong to `@dev` and `@data-engineer`.

## Pre-conditions

| Condition | Blocker | Check |
|---|---|---|
| The buyer journey can be described as the buyer experiences it | yes | If it can only be described as our activity sequence, that is the first defect to fix |
| The current stage model and its advance rules are available | yes | `current_stages` is present |
| Open pipeline is available with stage and attached evidence | yes | Step 5 remaps it; without it the change ships blind |
| The qualification evidence standard is known | yes | Stage criteria and the qualification record must use one standard, not two |
| Historical conversion data exists | no | If absent, the model ships without rates and the instrumentation spec defines what to capture |

## Procedure

### Step 1 — Write the buyer journey first (elicitation required)

Describe the purchase as the buyer experiences it: what they realize, who they involve, what they
have to get approved, and in what order.

Stages are named after **what the buyer has done**. "Demo delivered" is something we did. "Buyer
named the decision process and the approvers" is something they did. Only the second predicts
anything.

### Step 2 — Define one buyer-side exit criterion per stage

For each stage, the exit criterion is a buyer-side artifact:

- a decision process stated by the buyer, with owners and dates
- a written confirmation from the buyer
- an introduction granted to the economic buyer
- a document the buyer produced — an evaluation sheet, a security questionnaire, a requirements list
- a stated number in the buyer's units, in their own words

### Step 3 — Run the field test on every criterion (blocking)

Ask of each criterion: **can a rep satisfy this by updating a CRM field?**

If yes, it is not a criterion. Rewrite it against an artifact that has to come from outside our own
system, or delete the stage.

### Step 4 — Align the evidence standard with qualification

Coordinate with `@qualification-lead` so that stage exit criteria and the qualification record use
the same evidence standard. Two standards produce two truths, and the forecast consumes both
without distinguishing them.

Where the qualification record uses a 0-to-3 evidence scale, state the minimum score each stage
requires rather than inventing a parallel vocabulary here.

### Step 5 — Remap the open pipeline

Map every open deal onto the new stages.

Report how many deals move **backwards**, by stage. A large backwards movement is **the finding,
not an error** — it is the measurement of how much of the current pipeline was advanced on seller
activity. Present it as such, before anyone reads it as a performance report.

State the deal count next to every rate you compute. Mark **UNVERIFIED** any rate computed from
fewer deals than could support a conclusion, and say so plainly rather than implying significance.
Label any borrowed industry benchmark as an external hypothesis; it is never presented as our
number.

### Step 6 — Forecast honesty check

Under the new model, list every deal whose stage exceeds its evidence.

Check **both** directions. Sandbagging is a misrepresentation as much as inflation is, and both
destroy the ability to plan. Never adjust a forecast to a desired number — adjust the evidence
standard and let the number follow.

A close date is derived from the buyer's decision process. A close date derived from our quarter
boundary is a wish with a calendar entry, and it is the single largest source of forecast error.

### Step 7 — Integrity and proportionality screen (blocking)

| Test | Blocking condition |
|---|---|
| Pressure by design | A stage rule rewards pushing a buyer past their own decision process, or creates end-of-period pressure on buyers |
| Fabricated urgency incentive | An advance rule pays off when urgency is manufactured rather than buyer-owned |
| Surveillance | Rep-level data is specified that cannot be justified as a coaching input |
| Non-disclosure | Data is collected about a person and not disclosed to that person |
| Borrowed number presented as ours | An external benchmark appears in the model without the external label |

Any failure removes the mechanic from the specification. Metrics diagnose; they do not judge.
Anything collected about a rep is disclosed to that rep.

### Step 8 — Specify the instrumentation, do not build it

List the decisions the model must support: stage advance, coaching diagnosis, forecast, capacity.
For each, specify the minimum data required — anything not tied to a decision is not specified.
Define events, fields, ownership and the point of capture. Data captured by nobody in particular is
captured by nobody.

Hand the specification to `@dev` and `@data-engineer`. This task specifies; it does not implement,
and it never touches release or git push.

### Step 9 — Write the specification

Write to `squads/sales/` with the date. Include the stage model, exit criteria with their
artifacts, the field-test results, the remap report, the forecast honesty findings, the integrity
screen result, the instrumentation requirements, and every UNVERIFIED rate with its count.

## Acceptance Criteria

- [ ] The buyer journey is written as the buyer experiences it, before any stage is named
- [ ] Every stage is named after buyer action, not seller activity
- [ ] Every stage has exactly one buyer-side exit criterion with a named artifact
- [ ] The field test was run on every criterion, and any field-satisfiable criterion was rewritten or deleted
- [ ] Where the evidence lives is defined for each criterion
- [ ] The evidence standard is aligned with `@qualification-lead`, not parallel to it
- [ ] The open pipeline was remapped and backwards movement is reported as the finding
- [ ] Every rate carries its deal count, and thin rates are marked UNVERIFIED
- [ ] Borrowed benchmarks are labelled external hypotheses, never presented as our numbers
- [ ] Forecast error was checked in both directions, including sandbagging
- [ ] No mechanic survives that rewards pressuring a buyer past their own decision process
- [ ] Rep-level data is proportionate, coaching-justified, and disclosed to the rep it describes
- [ ] The output is a specification; no CRM change, code or release was made by this task
- [ ] The specification is written under `squads/sales/` with its date

## Handoff

| To | When |
|---|---|
| `@qualification-lead` | The evidence standard needs agreeing, or the remap shows a systematic qualification gap |
| `@method-lead` | The leak is a conversation defect — no insight, or the insight is not landing |
| `@negotiation-lead` | The leak is deal-level commercial behaviour — concessions or terms |
| `@sales-chief` | The stage model contradicts another specialist's artifact, or arbitration is needed |
| `@products:pricing-strategist` | The leak concentrates at price, as a pattern across the funnel |
| `@products:positioning-lead` | Deals repeatedly lose to an alternative nobody tracked |
| `@dev` / `@data-engineer` | CRM configuration, instrumentation and reporting implementation |
| `@devops` | Git push, PRs and CI/CD — exclusive authority, no exceptions |

## References

- `squads/sales/agents/pipeline-ops.md` — agent definition, four formulas, stage design rules
- `squads/sales/squad.yaml` — squad manifest and handoff matrix
- `.claude/CLAUDE.md` — AEXOS project instructions and agent authority
- `.aexos-core/development/tasks/advanced-elicitation.md` — optional accelerant for Step 1
- `.aexos-core/development/checklists/self-critique-checklist.md` — optional, applied before the model drives forecast decisions
