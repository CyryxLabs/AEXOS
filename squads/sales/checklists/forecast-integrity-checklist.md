# Forecast Integrity Checklist

**Checklist ID:** SALES-CL-006
**Referenced by:** pipeline-ops (`*forecast-discipline`, `*funnel-analysis`, `*capacity-model`, `*system-diagnosis`, `*incentive-review`)
**Purpose:** Test a forecast, a funnel analysis or a capacity model before it is presented to the business or used to make a decision about people. Failures here are not stylistic — each one changes the number or invalidates the conclusion.

[[LLM: EXECUTION INSTRUCTIONS — FORECAST INTEGRITY

1. Never adjust a forecast toward a desired number. Adjust the EVIDENCE STANDARD and let the number
   follow. A blanket haircut or uplift makes the error untraceable and guarantees the same
   adjustment next quarter.
2. Every rate is reported with its denominator. State the count next to every percentage, every time.
3. Run the cohort test before any conclusion about a person.
4. Sandbagging and inflation are the same offence in opposite directions. Check both.
5. Attribution: Mark Roberge, The Sales Acceleration Formula (2015). The methodology's own warning
   applies — there is no universal ideal representative, ramp period or stage model. Figures from
   the book describe one organization; ours come from our own instrumented data.]]

---

## 1. Stage evidence

- [ ] Every deal's stage is checked against the exit criterion in the stage specification
- [ ] Every criterion in force survives the **field test** — a rep cannot satisfy it by updating a CRM field
- [ ] Every stage advance is backed by a **buyer-produced artifact**, not by rep confidence
- [ ] Every deal whose stage exceeds its evidence is **listed by name**
- [ ] Those deals are **moved backwards** at review — the total is not adjusted instead
- [ ] The evidence standard used matches the one `@sales:qualification-lead` applies per deal

> This is usually most of the error. A stage defined by seller activity lets a deal reach the top forecast category having done nothing observable on the buyer's side.

## 2. Close dates

- [ ] Every close date is derived from the buyer's **mapped decision process**
- [ ] No close date sits on a quarter boundary without a buyer-side reason for that date
- [ ] Deals with no mapped decision process are flagged: their close date is a **placeholder** and is reported as one
- [ ] Where the process end date and the forecast close date differ, the forecast is corrected

> A close date derived from our fiscal boundary is a wish with a calendar entry, and it is the single largest source of forecast error.

## 3. Error history

- [ ] Forecast versus actual is recorded by period, with **direction and magnitude**
- [ ] There is a history, not a fresh opinion restated each quarter
- [ ] Each miss is classified by source:
  - [ ] Close date not derived from the buyer process
  - [ ] Stage exceeded evidence
  - [ ] Deal size changed at close → route the pattern to `@products:pricing-strategist`
  - [ ] Genuine external event → recorded, **not generalized from a single instance**
- [ ] **Both directions checked.** Systematic under-forecasting is sandbagging: the same misrepresentation to the business, opposite sign, equal damage to planning
- [ ] The recommended change is the **smallest** one that reduces the dominant error source, with a stated way to tell next quarter whether it worked

## 4. Rates and counts

- [ ] **Every conversion rate is reported with its denominator** *(a 40% rate on five deals reads identically to one on five hundred and supports entirely different decisions)*
- [ ] Rates computed on samples too small to distinguish from noise are marked **UNVERIFIED**, with the count stated
- [ ] Nothing is decided on an UNVERIFIED rate alone
- [ ] Median cycle time is reported alongside conversion — a conversion problem and a cycle time problem have different causes and different fixes

## 5. Segmentation before conclusion

- [ ] The analysis is segmented by **at least two dimensions** before any conclusion is drawn — typically rep cohort by tenure, and source or segment
- [ ] Aggregate rates are not used to explain a cause *(an aggregate can hide an entire story: 22% overall can be 41% for one cohort and 9% for another)*
- [ ] Confounds are named where they exist *(e.g. a tenure split that is also a territory split — checkable, and checked before anyone concludes anything about the cohort)*
- [ ] Recoverable value per transition is computed as volume entering × the gap to the best-performing cohort, and transitions are ranked by **that**, not by the worst percentage

## 6. The cohort test — before any conclusion about a person

- [ ] Applied: does the problem appear across multiple reps, cohorts or segments, or is it isolated to one?
  - [ ] **Across many** → system defect. The design produced it, and replacing people leaves the design intact
  - [ ] **Isolated, others clear the same transition** → coaching case, one skill
  - [ ] **Across many but only since a change** → the change is the hypothesis; check its date against the metric break
  - [ ] **Only in one segment** → not a people problem; check fit and positioning (`@products:positioning-lead`)
- [ ] The diagnosis states **what would disconfirm it**. A diagnosis nothing could refute is a preference

## 7. Borrowed numbers

- [ ] Every conversion rate, ramp figure, coverage ratio and trait correlation traces to **our own instrumented data**, or is marked UNVERIFIED
- [ ] Any benchmark from another company or a published source is labelled an **external hypothesis** and is never presented as our number
- [ ] Coverage ratios are **derived from actual conversion**, not assumed from a conventional multiple
- [ ] Capacity model assumptions are listed with their sensitivity *(a model with one conversion rate wrong by five points is wrong by a quarter)*
- [ ] Rep capacity is **ramp-adjusted** using a curve from our own cohorts; a rep hired mid-period does not contribute a full period
- [ ] Hiring lead time is stated, with the date by which a hire must start to contribute to the target

## 8. Coaching output

- [ ] Each rep's plan has **one** skill, one practice, one metric and one review date
- [ ] The skill was diagnosed from that rep's **own funnel** against the team median and their own prior period
- [ ] The method for the diagnosed skill is routed to its owning specialist — prospecting/qualification to `@sales:qualification-lead`, insight delivery to `@sales:method-lead`, concessions to `@sales:negotiation-lead`
- [ ] No plan carries four focus areas *(a coaching plan with four focus areas has none)*

## 9. Incentive mechanics

Run for any proposed or existing plan mechanic. Each item **BLOCKS** the mechanic.

- [ ] **(BLOCK)** Does it pay more when a buyer is misled?
- [ ] **(BLOCK)** Does it pay more for pulling a deal forward against the buyer's own process?
- [ ] **(BLOCK)** Does it pay more for overselling scope?
- [ ] **(BLOCK)** Does it pay for commitments delivery cannot meet?
- [ ] Can a rep compute their own earnings on a deal **without a spreadsheet**? *(a plan nobody understands cannot direct behaviour)*
- [ ] Churn and delivery risk of any accelerator are modelled **before** it is recommended, using our own data with counts stated
- [ ] Every flagged mechanic is reported with the specific behaviour it produces, the measured cost of that behaviour, and a **compliant alternative** that pursues the same legitimate goal

> Incentives design behaviour. A mechanic that pays more for end-of-period signatures prices manufactured urgency — the precise move `@sales:negotiation-lead` prohibits — and the plan becomes the cause of the behaviour it later punishes. A compliant alternative rewards the behaviour that actually shortens cycles: pay on deals closed with a documented buyer-side decision process on file, regardless of which week the signature lands.

- [ ] **Boundary stated:** plan level, total spend and compensation philosophy are a human business decision. This review provides the behavioural consequence and its measured cost, nothing more.

## 10. Measurement ethics

- [ ] Every rep-level datum collected is justifiable as a **coaching input** — anything that is not, is not specified
- [ ] Everything collected is **disclosed to the person it describes**, without them having to ask
- [ ] The output of a rep-level funnel is a development plan with a review date, **never a leaderboard**
- [ ] Metrics are used to diagnose, not to rank *(a conversion gap producing a coaching plan is diagnosis; the same gap producing a ranking email is surveillance, and it reliably produces data manipulation rather than improvement)*
- [ ] The instrumentation specified collects only what changes a decision — an over-measured process cannot be worked

## 11. Boundary

- [ ] This output **specifies**; it does not implement. CRM configuration, instrumentation and reporting go to `@dev` and `@data-engineer`; `@qa` gates; `@devops` releases and pushes, exclusively
- [ ] Individual deal qualification is `@sales:qualification-lead`; only the repeated gap belongs here
- [ ] Price level, packaging and discount policy are `@products:pricing-strategist`
- [ ] Market category, competitive alternatives and fit are `@products:positioning-lead`
- [ ] A system change entering the delivery pipeline is framed by `@pm`, not here

---

## Outcome

| Field | Entry |
|---|---|
| Deals moved backwards at review | {{n}}, value {{amount}} |
| Dominant error source | |
| Smallest change recommended | |
| How next quarter shows whether it worked | |
| Rates marked UNVERIFIED (with counts) | |
| Cohort test result | system defect / coaching case / change-related / segment issue |
| What would disconfirm the diagnosis | |
| Incentive mechanics blocked, with compliant alternatives | |
| Verdict | PASS / **REWORK** |

**Pass condition:** no deal's stage exceeds its evidence, every close date derives from a buyer process, every rate carries its count, the cohort test was run before any conclusion about a person, no borrowed benchmark is presented as ours, no incentive mechanic prices pressure, and no rep-level datum is collected that is not coaching-justified and disclosed.
