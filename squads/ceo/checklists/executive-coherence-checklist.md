# Executive Coherence Checklist

**Checklist ID:** CEO-CL-005
**Referenced by:** ceo-chief (Regent)
**Method source:** Original. This checklist is an orchestration instrument and applies no
published methodology. The specialist methods it routes to are attributed in their own agent
files: Richard Rumelt (*Good Strategy Bad Strategy*, 2011) for strategy, William Thorndike
(*The Outsiders*, 2012) for capital allocation, Andrew Grove (*High Output Management*, 1983)
for organisation, and the documented discipline of shareholder and board communication — which
has no single canonical work — for stakeholder reporting. Nothing on this checklist is
attributed to any of them.

**Purpose:** Three jobs. (1) Test whether a request was routed to the discipline that owns it.
(2) Test whether the executive artifacts describe the same company. (3) Test whether a decision
record, an arbitration or a consolidated brief is complete enough to be acted on.

[[LLM: INITIALIZATION — COHERENCE AND ROUTING AUDIT

Run the sections that apply to what is in front of you:

- Routing a new request → Sections 1, 2, 8
- Auditing artifacts across a period → Sections 3, 4, 8
- Arbitrating a contradiction → Sections 4, 5, 8
- Closing a decision record → Sections 2, 6, 8
- Releasing a consolidated brief → Sections 7, 8

Section 4 findings must be classified INDEPENDENT or INHERITED before any repair is
proposed. An inherited break repaired where it surfaced gets repaired again.]]

---

## 1. Routing

- [ ] The request has been **restated** in the vocabulary of the discipline that owns it, and the restatement was confirmed with the requester
- [ ] The reframe, if any, was stated **out loud** — not answered silently. A silent reframe means the requester takes the answer as a response to their actual question
- [ ] Exactly **one** owning specialist is named. Not two, not "we'll ask everyone"
- [ ] The **NOT-list** of the two nearest disciplines was checked, and the reason each was excluded is stated
- [ ] The request was **not** broadcast to several specialists in parallel — that produces partial answers built on different unstated assumptions and no decision
- [ ] Where several specialists are genuinely needed, they are **sequenced** rather than parallelised, with the reason
- [ ] The boundary was checked: this is still an executive question, not epic framing (`@pm`), story drafting (`@sm`), backlog (`@po`), implementation (`@dev`), testing (`@qa`) or push/CI (`@devops`)
- [ ] No squad command routes around Agent Authority. Git push, PRs, MCP and CI/CD are `@devops` exclusive, without exception
- [ ] A short usable answer was given before the handoff, **labelled as the usable version rather than the defensible one**
- [ ] A written handoff brief exists so the specialist starts with context instead of re-eliciting it
- [ ] No deep domain answer was produced here that a specialist owns

---

## 2. Decision quality

- [ ] Reversibility is classified **before** evidence effort was committed: reversible and cheap / reversible but costly / irreversible
- [ ] The evidence gathered matches the class:
  - reversible and cheap → judgement plus a recorded reversal trigger is sufficient
  - reversible but costly → at least one checkable data point per option
  - irreversible → named evidence per option, a stated downside case, dissent recorded
- [ ] **Irreversible decision with thin evidence is BLOCKED**, and the missing evidence is named rather than the record being completed
- [ ] At least two **real** options are recorded, each with its cost. A single option with a straw alternative is not a comparison
- [ ] The do-nothing option is present, or its absence is explained
- [ ] **What is given up is named.** If nothing is foreclosed, the record says the decision was an announcement, in those words
- [ ] The decision is distinguished from the forecast — the decision is a commitment under uncertainty; the forecast is an estimate. Confusing them makes the plan look more certain than the evidence
- [ ] A single named **human** owner exists. Not an agent
- [ ] A review date exists, revisited regardless of outcome
- [ ] A reversal trigger is written **now**, not reconstructed later
- [ ] Dissent is recorded **verbatim**, not summarised into a closing caveat
- [ ] The record is written to the repository. A decision that lives only in a transcript did not happen

---

## 3. Coherence chain — completeness

*Collect the current artifact for each link. A link with no artifact is recorded MISSING — that
is itself a finding, not an absence of data.*

| Link | Owner | Artifact present? | Dated? | Consistent with upstream? |
|---|---|---|---|---|
| Diagnosis | strategy-lead | | | — |
| Guiding policy | strategy-lead | | | |
| Coherent action | strategy-lead | | | |
| Capital | capital-allocator | | | |
| Organisation | org-designer | | | |
| Promise | stakeholder-lead | | | |
| Account | stakeholder-lead | | | |

- [ ] Every link has been checked, including links with no artifact
- [ ] Each artifact carries a date, so staleness is detectable
- [ ] Each link is compared against the link **above** it, not merely against the strategy document

---

## 4. Contradiction checks

Run every test. Record the result even where it passes — a passing test is evidence next period.

- [ ] **Budget–strategy divergence.** Does the capital plan concentrate spend on the actions the guiding policy names, or spread evenly across everything?
  *Typical cause: strategy revised without reopening the budget.*
  *Rule: the budget is what the company is actually doing. When the two disagree, report that as the finding rather than repeating the stated strategy.*
- [ ] **Structure–policy mismatch.** Do the decision rights place each decision where the information is?
  *Typical cause: org designed for the previous guiding policy and never revisited.*
- [ ] **Promise inflation.** Is the promise made to the board more confident than the evidence behind the diagnosis?
  *Typical cause: the update was written to reassure rather than to inform, so downside cases were dropped.*
- [ ] **Goals-as-strategy.** Does the stated strategy contain a diagnosis, or only targets and aspirations?
  *Route to `@ceo:strategy-lead` and the bad-strategy checklist; do not adjudicate here.*
- [ ] **Unfunded coherent action.** Does every action the strategy calls coherent have capital and an owner attached?
  *Typical cause: the action list was written by one function and the budget by another.*
- [ ] **Orphan spend.** Does every material line of capital trace to a named action in the **current** strategy?
  *Typical cause: spend that outlived the strategy revision that made it irrelevant.*
- [ ] **Accountability gap.** For every promise made in the last four reporting periods, is there a written account of what happened?
  *Typical cause: reporting on wins only, so misses never enter the record and never get diagnosed.*

### Classification and repair order — required before any repair is proposed

- [ ] Each break is classified **INDEPENDENT** (originates at this link) or **INHERITED** (propagated from upstream)
- [ ] **No inherited break is repaired at the point where it surfaced.** Repairing it there means repairing it twice
- [ ] The repair order runs upstream-most independent break first
- [ ] Parallelisable independent breaks are flagged as such
- [ ] Where two artifacts conflict, the audit states explicitly which is stale — or says that the answer requires a decision by the upstream owner, and names that owner
- [ ] Propagation is stated: a break invalidates every link downstream of it, not only the adjacent one

---

## 5. Arbitration

- [ ] Both recommendations are stated in one sentence each, **without softening either**
- [ ] An assumption table exists: assumed challenge, assumed time horizon, assumed binding constraint, evidence with date and sample, and cost if wrong — for each side
- [ ] The **unshared assumption** is named. Two specialists disagreeing usually means an unstated assumption differs
- [ ] Exactly one of four outcomes is selected and stated:
  - evidence wins this round
  - not a conflict but a scope or horizon split
  - genuine conflict requiring a named test or diagnostic
  - values or risk-appetite decision belonging to the human principal
- [ ] Arbitration is decided on **named evidence**, not on seniority or volume
- [ ] Where neither side has evidence, the output is a **diagnostic or a test specification**, not a decision
- [ ] **Averaging was rejected explicitly, and the rejection is recorded.** Averaging two evidenced positions manufactures a third that no evidence supports
- [ ] The artifact that must now be revised is named, and a review date is attached to it
- [ ] The arbitration is written to the repository

---

## 6. Sequencing

- [ ] Every specialist the situation genuinely touches is listed
- [ ] For each, what it needs as **input** and produces as **output** is written down
- [ ] The order places each specialist's inputs upstream of it
- [ ] Deviation from the default dependency order (strategy-lead → capital-allocator → org-designer → stakeholder-lead) carries a stated reason
- [ ] For each step, what would be **wasted** if it ran early is named — specifically, the artifact that would be rewritten
- [ ] Steps that consume no upstream output are marked as parallelisable
- [ ] A checkpoint is named between steps: what must be true before the next specialist starts
- [ ] Capital is not allocated before the diagnosis is made, and the org is not designed before the guiding policy is chosen — both guarantee a rewritten downstream artifact
- [ ] Where a cash-runway constraint binds first, the inversion is stated explicitly rather than silently applied

---

## 7. Consolidated brief

- [ ] Assembled from **specialist artifacts**, not from opinions
- [ ] Ordered along the coherence chain, one section per link
- [ ] **Every sentence carries its source artifact.** Any sentence that cannot be sourced is **deleted, not softened** (Constitution Article IV, No Invention)
- [ ] No new claim appears anywhere. If the brief needs a claim nobody made, the item is routed to the specialist rather than written
- [ ] An OPEN QUESTIONS section lists what no artifact answers
- [ ] An UNRETIRED RISKS section lists what is known and not yet mitigated, including anything a specialist flagged as dissent
- [ ] A CONFIDENCE line states the **weakest link** in the chain — the brief is only as strong as that link
- [ ] Nothing in the brief crosses into epic framing, story drafting or implementation

---

## 8. Boundary and escalation — applies to everything

- [ ] `@devops` exclusivity respected: git push, PRs, MCP, CI/CD, release. No exceptions, no squad workaround
- [ ] Story creation routed to `@sm`; story validation and backlog to `@po`; epic framing and PRDs to `@pm`
- [ ] Deep market, competitive or industry research routed to `@analyst`
- [ ] System design, technology selection and feasibility routed to `@architect`
- [ ] Instrumentation and query implementation routed to `@data-engineer`
- [ ] The squad output stops at the **evidenced decision**, packaged as a record and a brief
- [ ] `*handoff-to-delivery` states explicitly what this squad did **NOT** decide, so `@pm` does not assume it was settled
- [ ] Any **ethical, legal or safety concern** raised by any specialist is surfaced explicitly **before** the decision proceeds — never summarised into a footnote
- [ ] Any output touching fiscal, legal, employment, securities or corporate matters is marked as an **input to review by a qualified human adviser**, never as a determination
- [ ] Handoffs that cross an agent boundary produced a handoff record under `.aexos/handoffs/`
- [ ] Nothing attributes a method to this orchestrator that belongs to a specialist, and nothing attributes to Rumelt, Thorndike or Grove anything their published work does not contain

---

## Verdict

| Outcome | Condition | Next step |
|---|---|---|
| **MIS-ROUTED** | Section 1 fails | Re-route before any content is produced. A confident answer from the wrong discipline is worse than a routing decision |
| **BLOCKED** | Section 2 blocks an irreversible decision on thin evidence, or Section 8 surfaces an unaddressed ethical, legal or safety concern | Name the missing evidence or the concern. The decision does not proceed |
| **INCOHERENT** | Section 4 records an unrepaired independent break upstream of the decision | Repair upstream first. Do not proceed on a downstream link |
| **FINDINGS RECORDED** | No blocking failure; residual findings elsewhere | Proceed with each residual finding explicitly accepted and the reason stated |
| **CLEAN** | No failures | Proceed |

**Findings may be accepted. Findings may not be smoothed.** Reporting artifacts as consistent by
narrating over a contradiction propagates the break downstream, where it surfaces later at higher
cost — usually in front of the board.
