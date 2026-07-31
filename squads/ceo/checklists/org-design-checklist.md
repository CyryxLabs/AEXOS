# Organisation Design Checklist

**Checklist ID:** CEO-CL-003
**Referenced by:** org-designer (Lattice)
**Method source:** Andrew S. Grove, *High Output Management* (1983). The definition of managerial
output, managerial leverage, the production view and its limiting step, paired indicators, the
six decision questions, the free-discussion / clear-decision / full-support sequence, the
process-oriented and mission-oriented meeting distinction, the two-question form of management by
objectives, the three modes of control, and task-relevant maturity are from that work and are
marked as such. The procedures, blocking rules and thresholds below are this squad's operating
detail and are not attributed to Grove.

**Purpose:** Test an organisation design, a cadence, a decision-rights table or a proposed
reorganisation before it is adopted.

> **Hard stop.** No item on this checklist may be answered with an assessment of a named
> individual. If the analysis narrows to a person, stop, remove the passage, and route to a
> qualified human manager with HR or legal counsel. Section 10 verifies this.

[[LLM: INITIALIZATION — ORG DESIGN AUDIT

Report FAILURES, not a score.

Section 5 (structure last) is BLOCKING and is the most frequently violated. A design that
starts from a chart has already decided the answer, and the decisions it must produce get
retrofitted to it.

Every claim about how the organisation currently works must cite an observed artifact.
Where a claim rests on assertion, mark it UNVERIFIED rather than accepting or rejecting it.]]

---

## 1. Output, not activity

- [ ] Each management role's output is defined as the output of the organisation supervised, in units an outsider would recognise
- [ ] Neighbouring organisations influenced-but-not-supervised are named, and their output is counted toward the role's output [SOURCE: Grove]
- [ ] Personal activity is treated as an input, never as the output
- [ ] The gap between what each role reports as its accomplishments and what its output actually is has been named
- [ ] The gap is stated plainly and without contempt — it is structural, not personal
- [ ] No role's output definition consists of a list of meetings attended, documents produced, or hours worked

---

## 2. Leverage

- [ ] Time data is **observed** (two to four weeks of actual calendar and task data), not recalled
- [ ] Each block is classified into one of Grove's four managerial activities — information gathering, decision making, nudging, role modelling — or into individual production work
- [ ] Leverage is estimated per block: how many people's output is affected, and how much, per hour of managerial time
- [ ] Estimates are stated as ranges and look like estimates
- [ ] **Negative leverage is flagged explicitly**: decisions left open, interference in work already well handled, meetings attended without a role, mood transmitted at scale [SOURCE: Grove]
- [ ] The ranking by leverage is compared against time actually spent — the gap is the finding
- [ ] Every recommended shift states **what stops** to make room. A recommendation that adds without removing is not implementable
- [ ] High activity is nowhere treated as evidence of positive leverage

### Delegation
- [ ] For each delegated area, it is clear whether the **task** or the **outcome** was delegated
- [ ] Monitoring exists — delegation without follow-through is abdication [SOURCE: Grove]
- [ ] Monitoring samples the work at a low-value stage rather than reviewing the finished result
- [ ] Monitoring frequency matches task-relevant maturity for that specific task
- [ ] Accountability for the outcome is still held by the delegator

---

## 3. Production view

- [ ] Each key process is mapped as stages with input, output and **observed** duration
- [ ] Durations are observed, not intended
- [ ] The limiting step is identified — the longest, most expensive, or least flexible stage [SOURCE: Grove]
- [ ] The confirmation test ran: would improving any other stage change the total? If not, effort elsewhere is currently wasted and that is reported as the finding
- [ ] What building the process around the limiting step would require is stated: reordering, staging work earlier, or accepting idle capacity elsewhere
- [ ] Cross-checked against any chain-link analysis from `@ceo:strategy-lead`; disagreement is reported rather than reconciled silently
- [ ] **No proposal to add people to a non-limiting step survives.** Capacity added where the constraint is not produces cost and no throughput

### Early detection
- [ ] Where each defect class is currently detected is traced
- [ ] Defect cost is estimated per stage, reflecting that it rises downstream [SOURCE: Grove]
- [ ] The earliest stage at which each defect class is in principle detectable is identified
- [ ] Proposed checks state what is inspected, by whom, how often, and at what cost
- [ ] Where inspection would cost more than the defects it catches, the document says so and leaves it alone

---

## 4. Indicators

- [ ] Every indicator is **paired with a counter-indicator** [SOURCE: Grove]
- [ ] The pairing is real: optimising the first would visibly damage the second (volume with defect rate; speed with rework; throughput with backlog age; utilisation with queue time)
- [ ] Leading indicators are preferred where available, and each is labelled leading or lagging
- [ ] Every indicator has a source, a collection cost, a frequency and an owner
- [ ] **Every indicator has an action its movement triggers.** An indicator nobody acts on is a report, not an indicator
- [ ] The gaming test ran for each pair: how would a reasonable person under pressure move this without improving the output, and does the counter-indicator catch it?
- [ ] The set is limited, with a stated reason for its size — more indicators means less attention per indicator
- [ ] Black-box windows are specified only where no existing system already records something correlated with the unknown
- [ ] New instrumentation is routed to `@data-engineer`, not implemented here
- [ ] Each proposed window states what decision it would change; windows that change no decision are removed

---

## 5. Decisions before structure — BLOCKING

- [ ] The decisions the organisation must produce are named **before** any structure is proposed
- [ ] The decision-rights table is built from the last quarter of decision logs, tickets or escalations — **not** from the org chart
- [ ] For each recurring decision, where the knowledge sits and where the responsibility sits are both stated
- [ ] Where they sit in different places, the mechanism that brings them together is named: delegated authority, a standing forum, or an escalation with a clock [SOURCE: Grove]
- [ ] Over-escalated decisions are identified — those made above the level where both knowledge and responsibility exist
- [ ] Orphaned decisions are identified — those with no assigned decider, currently resolved by whoever is most persistent

**FAIL → the design is a chart with decisions retrofitted to it.** Return to the decisions.

### Six questions
- [ ] **What** decision is to be made, stated so a reader could tell whether it has been
- [ ] **By when** — a date, not a quarter
- [ ] **Who decides** — one named person or one named body
- [ ] **Who must be consulted** before, because they hold knowledge that would change it
- [ ] **Who ratifies or can veto**, and on what grounds, stated in advance
- [ ] **Who must be informed** after, and through what channel
- [ ] Any unanswerable question is reported as the reason the decision is stalled, rather than being designed around [SOURCE: Grove]

### Decision process
- [ ] The **mechanism** by which dissent is surfaced is stated, not the intention to welcome it
- [ ] Who has spoken least in recent instances of this decision is noted
- [ ] A decider and a date exist as the fallback if consensus does not emerge — without one, the process defaults to the status quo, which is a decision made by nobody
- [ ] **Full support** is specified as behaviour expected of those who disagreed, stated explicitly, and is not confused with assent [SOURCE: Grove]
- [ ] Where the deciding body is a group of equals, a senior person present to call the decision is named [SOURCE: Grove, peer-group syndrome and the peer-plus-one arrangement]
- [ ] The process is recorded where participants can see it

---

## 6. Cadence

- [ ] Recurring meetings are inventoried from **actual calendars**, with attendee count and duration
- [ ] Each is costed in manager-hours per month
- [ ] Each is classified process-oriented (regular: one-on-ones, staff meetings, operation reviews) or mission-oriented (ad hoc, existing to produce one decision) [SOURCE: Grove]
- [ ] Every mission-oriented meeting has a chair, a stated decision, and a pre-circulated purpose
- [ ] Meetings in the last quarter whose only output was a further meeting are counted
- [ ] The process-to-mission ratio is reported; a calendar dominated by ad hoc meetings is treated as evidence that the regular ones are missing or failing, and the repair is sought upstream rather than by culling the ad hoc ones
- [ ] Cadence is derived from the decisions the work generates, not the reverse
- [ ] **Every new meeting states what it replaces** — a cadence that only adds will be abandoned
- [ ] Each meeting specifies purpose, chair, attendees, frequency, required input, required output and time-box
- [ ] A review point exists where the cadence itself is examined against whether decisions are being made faster
- [ ] Removals are recommended only alongside what replaces the function they served

### One-on-ones
- [ ] The one-on-one belongs to the subordinate, who sets and circulates the agenda [SOURCE: Grove]
- [ ] Frequency is derived from **task-relevant maturity for the current work**, not from seniority or tenure
- [ ] Frequency increases when the work changes or maturity drops
- [ ] Content is specified as what the manager needs to hear, not what the manager wants to say
- [ ] It is explicitly not a status report a document could carry, not a performance review, and not a substitute for a decision forum
- [ ] Follow-up is held where both can see it
- [ ] The document designs the practice and evaluates no individual's one-on-one

---

## 7. Objectives

- [ ] Each objective answers **where are we going** and is directional, with arrival recognisable
- [ ] Key results answer **how will we pace ourselves**, and are milestones and measures rather than a restatement of the objective [SOURCE: Grove]
- [ ] The horizon is short enough to steer by — a first signal arriving at the end of the period cannot correct anything during it
- [ ] An in-period review point exists, with a named owner
- [ ] Nesting works: each level's objectives are derivable from the level above without being a mechanical copy
- [ ] **Objectives are not mechanically coupled to compensation** [SOURCE: Grove] — coupling converts objective-setting into target negotiation
- [ ] No compensation recommendation appears anywhere in this document

---

## 8. Control mode

- [ ] The environment is assessed on complexity, uncertainty and ambiguity
- [ ] Whether individual and group interests align for this work is assessed
- [ ] A mode is selected from the three: free-market forces, contractual obligations, cultural values [SOURCE: Grove]
- [ ] The selection follows the assessment rather than preceding it
- [ ] The cost of the chosen mode is stated — in particular, that cultural values are the only mode that functions under high uncertainty, take a long time to establish, and are easily damaged
- [ ] **Mismatch is flagged:** contractual control applied to genuinely uncertain work produces compliance with the letter and failure of the outcome

---

## 9. Structure and transition

- [ ] The organisation's position on the mission-oriented / functional range is stated, with the reason [SOURCE: Grove — most useful organisations are hybrids]
- [ ] What that position gives up is stated honestly — every position gives something up
- [ ] For each unit, the decisions it must be able to make alone to be responsive are named
- [ ] Functions where scale genuinely pays are distinguished from functions centralised out of habit
- [ ] **Dual reporting is specified decision by decision** — for every dual-reported role, which decisions belong to each line, and the conflict-resolution route [SOURCE: Grove]
- [ ] Unspecified dual reporting appears nowhere

### If a reorganisation is proposed
- [ ] It moves at least one named decision to a named place. **If it moves no decision, it is a chart change** and is reported as such
- [ ] The problem it solves is expressed as a decision that is currently slow or unowned
- [ ] A cadence change and a decision-rights change were tested first, and the document says they were — both are far cheaper and reversible
- [ ] The transition cost is **budgeted** as a period of degraded output, not listed as a risk
- [ ] The proposed structure follows the **current** guiding policy from `@ceo:strategy-lead`, not the previous one
- [ ] People consequences are routed to qualified human management and HR or legal counsel
- [ ] The announcement is routed to `@ceo:stakeholder-lead` and is not drafted here

---

## 10. Individuals — HARD STOP

- [ ] No named individual is assessed anywhere in the document
- [ ] Task-relevant maturity is applied to **tasks**, precisely named ("designs the cutover plan", not "owns the migration"), and never as a rating of a person [SOURCE: Grove]
- [ ] The reset rule is stated: a capable person moved to a new task returns to low maturity for that task, and this is expected rather than a judgement
- [ ] Where a capability question arose, it was handled at the level of a role or a repeating team pattern, and framed as *cannot do* (a training gap) versus *will not do* (a motivation gap) [SOURCE: Grove]
- [ ] Where *cannot do*: the remedy specified is training, delivered by whom, with how its effect will be observed — training being the manager's own job and one of the highest-leverage activities available [SOURCE: Grove]
- [ ] Where *will not do*: the remedy addresses the design of the work, its measures and its consequences
- [ ] Anything that narrowed to a named individual was removed and routed out, and the routing is recorded
- [ ] No compensation, discipline, employment or accommodation determination appears

---

## 11. Evidence and boundary

- [ ] Every claim about how the organisation currently works cites an observed artifact: a calendar, a decision log, a ticket queue, an indicator series, a documented process
- [ ] Assertions about culture with no observable referent are marked UNVERIFIED (Constitution Article IV)
- [ ] A diagnosis and guiding policy exist as the criterion — without them the design has no criterion and the work returns to `@ceo:strategy-lead`
- [ ] No strategy diagnosis is produced here
- [ ] No budget, hurdle rate or per-share arithmetic appears (that is `@ceo:capital-allocator`)
- [ ] No board, investor or all-hands narrative appears (that is `@ceo:stakeholder-lead`)
- [ ] Nothing is attributed to Grove that *High Output Management* does not contain, and this squad's operating detail is labelled as this squad's

---

## Verdict

| Outcome | Condition | Next step |
|---|---|---|
| **CHART CHANGE, NOT A DESIGN** | Section 5 fails, or a proposed reorganisation moves no decision | Return to the decisions. Do not adopt |
| **INDIVIDUAL CONTENT PRESENT** | Section 10 fails | Remove the passage and route out **before** any further review |
| **DEFECTS RECORDED** | Sections 5 and 10 pass; residual failures elsewhere | Adopt with each residual failure explicitly accepted and the reason stated |
| **CLEAN** | No failures | Adopt |
