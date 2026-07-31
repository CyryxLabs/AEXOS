# Organisation Design Plan — [COMPANY / UNIT], [PERIOD]

**Template ID:** CEO-TM-003
**Owned by:** org-designer (Lattice)
**Method source:** Andrew S. Grove, *High Output Management* (1983).

> **This document designs systems of work. It contains no assessment of any named individual.**
> Anything touching a specific person's performance, compensation, standing, employment or
> accommodation belongs to a qualified human manager with HR or legal counsel, and is routed
> there rather than written here.

[[LLM: TEMPLATE INSTRUCTIONS — ORG DESIGN PLAN

Rules:

1. STRUCTURE IS THE LAST SECTION, NOT THE FIRST. Do not draw a chart until the decisions
   the structure must produce have been named. Section 7 exists to make that ordering
   physical.
2. EVERY CLAIM ABOUT HOW THE ORGANISATION CURRENTLY WORKS TRACES TO AN OBSERVED ARTIFACT:
   a calendar, a decision log, a ticket queue, an indicator series, a documented process.
   Assertions about "the culture" with no observable referent are written UNVERIFIED
   (Constitution Article IV).
3. USE OBSERVED DURATIONS, NOT INTENDED ONES. A process map built from how the process is
   supposed to run measures the intention, not the organisation.
4. IF THE ANALYSIS NARROWS TO A NAMED INDIVIDUAL, STOP and route out. Delete the passage;
   do not soften it.]]

---

## 1. Criterion

> Structure follows the guiding policy. Without a diagnosis and a policy, the design has no
> criterion and the work returns to `@ceo:strategy-lead`.

- **Diagnosis being served:** [from the strategy kernel]
- **Guiding policy:** [from the strategy kernel]
- **Kernel artifact and date:** [path, date]
- **Coherent actions this organisation must be able to execute:** [list]
- **Inertia budget handed over by strategy-lead:** [what resistance was priced, and over what period]

---

## 2. Output definitions

> A manager's output is the output of the organisation under their supervision, plus the output
> of the neighbouring organisations they influence. Personal activity is an input.
> [SOURCE: Grove]

| Role | Organisation supervised | What it produces (in units an outsider would recognise) | Neighbouring organisations influenced | Their output | Measure | Counter-measure |
|---|---|---|---|---|---|---|
| | | | | | | |

**Activity-versus-output gap.** What each role currently reports as its accomplishments, and
where those are activities rather than output. State it plainly and without contempt — the
confusion is structural, not personal.

| Role | Currently reported as accomplishment | Is it output? | What the output actually is |
|---|---|---|---|
| | | | |

---

## 3. Leverage

> Managerial leverage is output produced per unit of managerial time invested. Leverage can be
> negative. [SOURCE: Grove]

**Source of time data:** [two to four weeks of *observed* calendar and task data. Recalled time
allocation is not admissible — the gap between recalled and observed is itself a common finding.]

| Time block / recurring commitment | Activity class | People affected | Estimated leverage (range) | Time actually spent |
|---|---|---|---|---|
| | information gathering / decision making / nudging / role modelling / individual production | | | |

**Activity classes are Grove's four managerial activities.** Individual production work is
included as a fifth line because managers do some, and the point is to see how much.

**Negative leverage, named explicitly:**

| Instance | Mechanism | Scale |
|---|---|---|
| | decision left open / interference in work already well handled / meeting attended without a role / mood transmitted at scale | |

**Three recommended shifts.** Each states what **stops** to make room. A recommendation that
adds without removing is not implementable.

| Shift | What it adds | What stops |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

---

## 4. Production view — limiting steps

> Any work process can be viewed as production. Find the limiting step and build the process
> around it. [SOURCE: Grove]

For each key process:

**Process:** [name]

| Stage | Input | Output | Observed duration | Source of the observation |
|---|---|---|---|---|
| | | | | |

- **Limiting step:** [the longest, most expensive, or least flexible stage]
- **Confirmation test:** would improving any other stage change the total? [answer] If no, effort elsewhere is currently wasted, and that is the finding.
- **Restructuring required to build around it:** [reordering / staging work earlier / accepting idle capacity elsewhere]
- **Cross-check against `@ceo:strategy-lead` chain-link analysis:** [agree / disagree — if they disagree, one of the two is looking at the wrong process]

### Early detection

> Detect and fix problems at the lowest-value stage possible; the cost of a defect rises as work
> moves downstream. [SOURCE: Grove]

| Defect class | Where detected today | Cost at that stage | Earliest stage detectable | Proposed check | Inspection cost vs avoided cost |
|---|---|---|---|---|---|
| | | | | | |

*Where inspection costs more than the defects it catches, say so and leave it alone.*

---

## 5. Indicators

> Indicators are how you see inside the black box. Pair every indicator with a counter-indicator,
> so that optimising one exposes damage to the other. [SOURCE: Grove]

| Indicator | Counter-indicator | Leading or lagging | Source | Collection cost | Frequency | Owner | Action a movement triggers |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

**Gaming test.** For each pair, describe how a reasonable person under pressure would move the
indicator without improving the output. If the counter-indicator does not catch that, the pair
is wrong.

| Indicator | How it would be moved without improving output | Does the counter-indicator catch it? |
|---|---|---|
| | | |

**Set size:** [count]. More indicators means less attention per indicator. State why this many.

**An indicator nobody acts on is a report, not an indicator.** Any row above with a blank
"action triggered" column is removed or given an action.

### Black box windows

| Currently unobservable | Decisions being made blind because of it | Cheapest existing window | New instrumentation needed? | What decision the window changes |
|---|---|---|---|---|
| | | | route to `@data-engineer` — not implemented here | |

*A window that changes no decision is not worth cutting.*

---

## 6. Decisions

### 6a. Decision map — the six questions

> Ambiguity in any one of the six is the usual cause of a stalled decision. [SOURCE: Grove]

| # | Question | Answer |
|---|---|---|
| 1 | What decision is to be made — stated so a reader could tell whether it has been? | |
| 2 | By when — a date, not a quarter? | |
| 3 | Who decides — one named person or one named body? | |
| 4 | Who must be consulted before, because they hold knowledge that would change it? | |
| 5 | Who ratifies or can veto, and on what grounds, stated in advance? | |
| 6 | Who must be informed after, through what channel? | |

*Any question that cannot be answered is the reason the decision is stalled. Report it as the
finding rather than proposing a structure around it.*

### 6b. Decision process for recurring classes

> Free discussion, then a clear decision, then full support. Full support does not require
> agreement; it requires that the decision is executed as if it were one's own. [SOURCE: Grove]

| Element | Specification |
|---|---|
| Free discussion — the **mechanism** by which dissent is surfaced (not the intention) | |
| Who has spoken least in the last several instances of this decision | |
| Clear decision — who calls it, and by when, if consensus does not emerge | |
| Fallback | *A process with no fallback to a decider defaults to the status quo, which is a decision made by nobody.* |
| Full support — what is expected of those who disagreed, stated explicitly | |
| Peer-group guard — if the deciding body is a group of equals, the senior person present to call the decision [SOURCE: Grove, peer-group syndrome and the peer-plus-one arrangement] | |
| Where the process is recorded, visible to participants | |

### 6c. Decision rights

> Decisions belong at the lowest level where knowledge and responsibility meet.
> [SOURCE: Grove]

**Source:** the last quarter of decision logs, tickets or escalations — **not** the org chart.

| Recurring decision | Where knowledge sits | Where responsibility sits | Current level | Proposed level | Mechanism bringing them together | Reason |
|---|---|---|---|---|---|---|
| | | | | | delegated authority / standing forum / escalation with a clock | |

- **Over-escalated decisions** (made above the level where both exist): [list]
- **Orphaned decisions** (no assigned decider; currently resolved by whoever is most persistent): [list]

---

## 7. Cadence

> Meetings are the medium of managerial work, not a symptom of its failure. The question is
> never whether to meet but which kind the work requires. [SOURCE: Grove]

**Cadence follows decisions.** Start from the decisions the organisation must make and the
frequency at which the work generates them.

| Meeting | Kind | Purpose | Chair | Attendees | Frequency | Required input | Required output | Time-box | What it REPLACES |
|---|---|---|---|---|---|---|---|---|---|
| | process-oriented (regular) / mission-oriented (ad hoc, one decision) | | | | | | | | |

*A cadence that only adds will be abandoned. Every new meeting states what it replaces.*

**Audit of the current portfolio:**

| Metric | Value |
|---|---|
| Recurring meetings inventoried from actual calendars | |
| Cost in manager-hours per month | |
| Process-oriented : mission-oriented ratio | |
| Mission-oriented meetings lacking a chair, a stated decision, or a pre-circulated purpose | |
| Meetings in the last quarter whose only output was a further meeting | |

*A calendar dominated by ad hoc meetings usually indicates the regular ones are absent or not
doing their job. The repair is upstream of the ad hoc meetings, not a cull of them.*

### One-on-ones

| Field | Specification |
|---|---|
| Whose meeting | The subordinate's. They set the agenda and circulate it in advance. [SOURCE: Grove] |
| Frequency, derived from task-relevant maturity for the **current** work — not from seniority | |
| Content: what the manager needs to hear, not what the manager wants to say | |
| What it is not | Not a status report a document could carry; not a performance review; not a substitute for a decision forum |
| Follow-up, held where both can see it | |

*This section designs the practice. It does not conduct or evaluate any individual's one-on-one.*

---

## 8. Objectives

> An objective answers *where do I want to go*; key results answer *how will I pace myself to
> know whether I am getting there*. [SOURCE: Grove]

| Objective (directional; arriving is recognisable) | Key results (milestones and measures, not a restatement) | Horizon | In-period review point | Owner |
|---|---|---|---|---|
| | | | | |

- **Horizon test:** is it short enough to steer by? If the first signal arrives at the end of the period, the system cannot correct during it.
- **Nesting:** each level's objectives are derivable from the level above without being a mechanical copy of it.
- **Compensation guard:** these are **not** mechanically coupled to pay. [SOURCE: Grove] Coupling turns objective-setting into target negotiation. Compensation decisions themselves are outside this agent entirely and belong to human management.

---

## 9. Control mode

> Three modes of control: free-market forces, contractual obligations, cultural values. The right
> mode depends on the complexity, uncertainty and ambiguity of the environment and on whether
> individual and group interests align. [SOURCE: Grove]

| Assessment | Value |
|---|---|
| Complexity of the environment | low / moderate / high |
| Uncertainty and ambiguity | low / moderate / high |
| Are individual and group interests aligned for this work? | |

**Selected mode:** free-market forces / contractual obligations / cultural values

| Mode | Fits when | Cost |
|---|---|---|
| Free-market forces (price, transaction) | Low complexity, interests self-serving | Requires a definable unit and a price for it |
| Contractual obligations (rules, specifications, defined scope) | Moderate complexity, interests mixed | Cannot anticipate situations outside the specification |
| Cultural values (shared aims) | High complexity and uncertainty, shared interests | The only mode that functions under high uncertainty, and it takes a long time to establish and is easily damaged |

**Mismatch flag:** contractual control applied to genuinely uncertain work produces compliance
with the letter and failure of the outcome. Is that happening anywhere here? [answer]

---

## 10. Structure — LAST, not first

> Organisations sit between mission-oriented (responsive, duplicated effort) and functional
> (scale, less responsive). Most useful ones are hybrids. [SOURCE: Grove]

- **Position chosen on the range:** [where, and why]
- **What this position gives up:** [every position gives something up — state it]

| Unit | Decisions it must be able to make alone to be responsive | Functions where scale genuinely pays | Functions centralised out of habit rather than for scale |
|---|---|---|---|
| | | | |

### Dual reporting specification

> Dual reporting is the price of a hybrid organisation. It is uncomfortable and it works,
> provided both lines are explicit about which decisions each one owns. [SOURCE: Grove]

| Dual-reported role | Line A | Decisions owned by A | Line B | Decisions owned by B | Conflict resolution route |
|---|---|---|---|---|---|
| | | | | | |

*Unspecified dual reporting is the failure mode, not dual reporting itself.*

---

## 11. Task-relevant maturity — by task, not by person

> Task-relevant maturity is a property of experience **at a specific task**, not a rating of a
> person. A capable person moved to a new task returns to low maturity for that task.
> [SOURCE: Grove]

| Task (precise: "designs the cutover plan", not "owns the migration") | Observable evidence of maturity | Level | Derived style | Transition trigger |
|---|---|---|---|---|
| | prior instances completed, decisions made unaided, errors and their type | low / medium / high | structured and task-oriented / two-way communication and support / involvement with minimal intervention | what evidence moves it up |

**Reset rule:** a capable person moved to a new task returns to low maturity for that task. This
is expected and is not a judgement about them.

---

## 12. Reorganisation test — only if a structural change is proposed

| Test | Answer |
|---|---|
| Which decisions does it move, and to where? | *If it moves no decision, it is a chart change.* |
| What problem does it solve, expressed as a decision that is currently slow or unowned? | |
| Could a **cadence** or **decision-rights** change achieve the same result? | *Test these first — they are far cheaper and reversible. Say that they were tested.* |
| Transition cost: the period of degraded output while relationships, context and ownership are re-established | *Budgeted explicitly, not listed as a risk.* |
| Does the proposed structure follow the **current** guiding policy, or the previous one? | |
| People consequences | *Handed to qualified human management and HR or legal counsel. Not designed here.* |
| Announcement | *Routed to `@ceo:stakeholder-lead`. Not drafted here.* |

---

## 13. Transition cost

| Change | Period of degraded output | Estimated magnitude | Who absorbs it |
|---|---|---|---|
| | | | |

*Budgeted, not listed as a risk. A risk might happen; a transition cost will.*

---

## 14. UNVERIFIED

Claims about how the organisation currently works that could not be traced to an observed
artifact.

| Claim | Why it could not be traced | What would verify it |
|---|---|---|
| | | |

---

## 15. Ownership and boundary

- **Owner:** [named human principal — not an agent]
- **Review date:** [date]
- **Individual matters routed out:** [list of anything that narrowed to a named person, and where it went. If none, write NONE.]

**Confirm before release:** this document contains no assessment of any named individual, no
compensation recommendation, and no employment determination.

---

## Release gate

Do not release until `checklists/org-design-checklist.md` has been run and every failure is
repaired or explicitly accepted with a stated reason.
