# Funnel Stage Specification — {{motion_or_segment}}

<!--
TEMPLATE: funnel-stage-specification-tmpl.md
Squad: sales | Produced by: pipeline-ops (Conveyor) via *stage-design
Framework: Mark Roberge, "The Sales Acceleration Formula: Using Data, Technology, and Inbound
Selling to go from $0 to $100 Million" (2015). This agent applies the framework with attribution.

THE METHODOLOGY'S OWN WARNING, ENFORCED HERE
There is no universal ideal representative, ramp period or stage model. Figures reported in the
source describe one organization's data. Every rate, ramp figure and coverage ratio in this
specification comes from OUR instrumented data, or is labelled an external hypothesis. Nothing
borrowed is presented as our number.

THIS DOCUMENT IS A SPECIFICATION, NOT AN IMPLEMENTATION
CRM configuration, field changes, workflow automation and reporting go to @dev and
@data-engineer. @qa holds quality gates. @devops holds release and push, exclusively.
-->

**Spec ID:** STAGE-{{YYYY-MM-DD}}-{{motion-slug}}
**Motion / segment:** {{name}}
**Date:** {{date}}
**Supersedes:** {{prior spec ID, or "none"}}

---

## 1. The buyer journey, written first

Stages are named after what the **buyer** has done, never after what we delivered.

| # | What the buyer is doing at this point | In their terms |
|---|---|---|
| 1 | | |
| 2 | | |

## 2. Current stages and why they fail — only if repairing an existing model

| Current stage | Exit criterion today | Is it seller activity? | Problem |
|---|---|---|---|
| {{e.g. Demo}} | {{Demo delivered}} | **yes** | Something we did. A deal can reach the next stage with the buyer having done nothing. |

## 3. Proposed stages

| Stage | Buyer-side exit criterion | Evidence artifact that proves it | Where the artifact lives |
|---|---|---|---|
| | {{something the buyer did, said or produced}} | {{meeting note with a verbatim quote / buyer email / buyer-produced document / calendar record / redline exchange}} | |

### The four tests, applied to every criterion

| Stage | Field test: can a rep satisfy it by updating a CRM field? | Buyer-produced? | Observable by someone not on the call? | Same evidence standard as the qualification record? |
|---|---|---|---|---|
| | **must be NO** | must be YES | must be YES | must be YES |

> **The field test is the one that does the work.** If a stage can be advanced by updating a field, it will be, and the funnel becomes a record of optimism.

### Evidence standard alignment

- **Aligned with:** `data/qualification-evidence-standards.yaml` (evidence scale 0–3)
- **Minimum score required to enter each stage:** {{per stage}}
- **Coordinated with `@sales:qualification-lead` on:** {{date}}

> Two standards produce two truths and a monthly argument about which one is real.

## 4. What a rep cannot advance without

| Stage | Blocking requirement | Who can waive it | On what documented basis |
|---|---|---|---|
| | | {{named role — not the rep under quota pressure}} | |

## 5. Migration impact

| Metric | Value |
|---|---|
| Open deals mapped onto the new model | {{n}} |
| Deals that move **backwards** | {{n}} |
| Of those, out of the top forecast category | {{n}} |
| Value that was in the top category without buyer-side evidence | {{amount}} |

> **A large backwards movement is the finding, not a migration error.** It is the size of the gap between what the pipeline claimed and what it could evidence.

## 6. Close date rule

- [ ] The close date is derived from the buyer's mapped decision process
- [ ] No stage advance accepts a close date taken from our quarter boundary
- [ ] Where the process end date and the forecast close date differ, **the forecast is corrected, not the process**

> A close date derived from our fiscal boundary is a wish with a calendar entry, and it is the single largest source of forecast error in most organizations.

## 7. Instrumentation required

Specification for `@dev` and `@data-engineer`. Nothing here is implemented in this squad.

| Decision this supports | Minimum data required | Event / field | Owner of capture | Point of capture |
|---|---|---|---|---|
| Stage advance | | | | |
| Coaching diagnosis | | | | |
| Forecast | | | | |
| Capacity model | | | | |
| Ramp cohort comparison | | | | |

- [ ] Anything not tied to a decision above is **not specified**. An over-measured process cannot be worked.
- [ ] **Proportionality screen:** every rep-level datum specified is justifiable as a coaching input and is disclosed to the person it describes. Anything failing this is removed from the spec.

**Reports, and who reads each:**

| Report | Audience | Decision it drives |
|---|---|---|

## 8. Rates recorded against this model

| Transition | Conversion | **Denominator (n)** | Median cycle time | Status |
|---|---|---|---|---|
| | {{%}} | {{n}} | | verified / **UNVERIFIED — sample too small to distinguish from noise** |

- [ ] **Every rate is reported with its count.** A 40% conversion on five deals is a rumour.
- [ ] Any figure borrowed from a published source is labelled an **external hypothesis**, never presented as ours

## 9. Ethics of measurement

- [ ] Rep-level metrics exist to **diagnose a coachable skill**, not to rank
- [ ] Everything collected about a person is disclosed to that person, without them having to ask
- [ ] The output of a rep-level funnel is one development focus with a review date, never a leaderboard
- [ ] No stage criterion or field requirement creates an incentive to pressure a buyer, pull a deal forward against their process, or record something the buyer did not do

## 10. Handoffs

| Condition | Route to |
|---|---|
| CRM configuration, workflow, reporting implementation | `@dev` |
| Instrumentation, schema, event capture, queries | `@data-engineer` |
| Quality gates on delivered reporting | `@qa` |
| Release and push | `@devops` — exclusive |
| Per-deal application of the evidence standard | `@sales:qualification-lead` |
| A leak tracing to the selling conversation | `@sales:method-lead` |
| A pattern of end-of-period discounting or late procurement | `@sales:negotiation-lead` |
| Deal size collapsing at close as a pattern | `@products:pricing-strategist` |
| Conversion varying sharply by segment (a fit problem, not a skill problem) | `@products:positioning-lead` |
| A system change that must enter the delivery pipeline | `@pm` for epic framing |

---

## Specification self-check

- [ ] Every stage is named after a buyer action
- [ ] Every exit criterion survives the field test
- [ ] Every criterion has a named buyer-produced evidence artifact
- [ ] The evidence standard matches the qualification record's, and was coordinated
- [ ] Migration impact is reported, including deals moving backwards
- [ ] Close dates derive from the buyer's decision process
- [ ] Every rate carries its denominator; small samples are marked UNVERIFIED
- [ ] No borrowed benchmark is presented as our number
- [ ] Rep-level data is proportionate, coaching-justified and disclosed
- [ ] This document specifies; it does not implement
