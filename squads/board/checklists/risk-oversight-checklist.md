# Risk Oversight Checklist

**Checklist ID:** BRD-CL-003
**Referenced by:** risk-oversight
**Applied to:** any appetite statement, risk register, severity assessment, prioritization,
portfolio view, tail scan, response plan, escalation-threshold set or risk report before it goes to
the board
**Purpose:** Enforce the distinctions that make a risk artifact usable — **appetite versus
tolerance**, **inherent versus residual**, **control described versus control evidenced**, **risk
versus issue** — and stop any artifact that implies assurance it does not have.

[[LLM: INITIALIZATION — RISK OVERSIGHT QUALITY BAR

Run this against the finished artifact.

Mark each item:
  [x] satisfied — name the passage that satisfies it
  [ ] not satisfied — name what is missing
  [N/A] not applicable — state why

BLOCKING items stop the artifact. A risk artifact circulated with a blocking gap is read as
coverage, which is the specific harm this checklist exists to prevent.]]

---

## 1. Objectives precondition

- [ ] **BLOCKING.** The strategy and business objectives are stated, with an artifact path and date
- [ ] Where they are absent, the artifact **stopped** and reported a mandate-link break upstream, rather than proceeding on an implied objective
- [ ] Every risk entry names the **objective it threatens**. Entries with no objective attached are rejected as anxieties — mixing them in is what makes registers unusable
- [ ] **Risk is separated from issue.** Something already occurring is an issue with an owner and a remediation date; it does not sit in the register as a possibility

## 2. Appetite and tolerance — the distinction most often collapsed

- [ ] Appetite is expressed per **risk type**, not per individual risk
- [ ] Each appetite statement names both what the organization **is** willing to accept and the **named class of outcome it is not**
- [ ] **BLOCKING.** The **forbidden-decision test** was applied to every appetite statement: a concrete, plausible proposal is named that the statement would cause the board to reject. Any statement failing it was rewritten or deleted — not annotated and kept
- [ ] **BLOCKING.** Every appetite carries a **tolerance**: a measurable band around a named performance measure, with the breach point stated. Appetite without tolerance cannot be breached, and an unbreachable boundary cannot be monitored
- [ ] Where no measure exists for a type, this is reported as a **measurement gap** and the appetite is marked unmonitorable — no proxy is substituted without being labelled a proxy
- [ ] The breach consequence is stated in advance: who is told, how fast, what happens
- [ ] The forbidden-decision test is marked `CONSTRUCTION`, not attributed to COSO

## 3. Severity — nothing stated without its basis

- [ ] **Impact** is described at the objective level, in the organization's own units where possible, with its basis named: measured / computed / estimated (with the estimator named) / explicitly assumed
- [ ] **BLOCKING.** Every likelihood carries a **horizon**. "Unlikely" over a month and over five years are different claims, and a likelihood without a horizon is not a claim at all
- [ ] **Velocity** is stated: time from onset to full impact — this determines whether any response exists
- [ ] **Persistence** is stated: how long impact lasts, and whether recovery is possible or the effect is permanent
- [ ] **BLOCKING.** Both **inherent** (before responses) and **residual** (after current responses) are reported. Never residual alone
- [ ] **BLOCKING.** For every residual figure, the control or response it depends on is named, **and marked EVIDENCED or ASSUMED**
- [ ] Where a dependency is ASSUMED, the artifact states in those words that **residual is a hypothesis**
- [ ] Anything with no stated basis is marked `UNVERIFIED` and is excluded from the portfolio view — it may be discussed, but it does not enter the position
- [ ] Velocity and persistence as explicit dimensions are marked `DERIVED` (general risk-management discipline), not attributed to COSO

## 4. The control-described versus control-evidenced boundary

This is where risk oversight stops and audit evidence begins. Crossing it silently is how a board
comes to believe a policy document is a control.

- [ ] **BLOCKING.** The artifact never asserts that a control **operated**. That is evidence, and it belongs to **audit-lead**
- [ ] Every control the board relies on for a material exposure is marked as **described** (a document says it exists) or **evidenced** (audit-lead has named assurance behind it)
- [ ] The **evidence penalty** was applied: where residual depends on an unevidenced control, the risk is ranked on its **inherent** severity, because the organization does not currently know the control works
- [ ] Controls whose operation matters and whose evidence is absent are routed to audit-lead with a named request, not left as a caveat
- [ ] The evidence penalty is marked `CONSTRUCTION`

## 5. Prioritization — the overrides that stop expected value from hiding the board's business

- [ ] Residual severity was used as a **first pass only**
- [ ] **BLOCKING.** The **survivability override** was applied: any exposure whose worst plausible case is non-survivable or unrecoverable moves to the top regardless of likelihood. Sorting by expected value systematically demotes exactly the exposures a board exists to consider
- [ ] The **velocity override** was applied: between two exposures of equal severity, the one leaving less time to respond ranks higher
- [ ] Entries were **grouped by shared cause and shared dependency** before presentation — five entries with one common single point of failure are one exposure, not five
- [ ] Each item in the top set carries: objective threatened, severity basis, response, owner, and what would move it
- [ ] All three overrides are marked `CONSTRUCTION`

## 6. Portfolio view — not a sum of the register

- [ ] The artifact starts from the **entity and its objectives**, not from totalling register entries
- [ ] **Correlation:** risks grouped by shared cause — common supplier, technology, funding source, or a common assumption about demand
- [ ] **Concentration:** single points of failure enumerated explicitly, one line each — supplier, customer, person, region, platform, data store, regulatory permission. A concentration is an exposure whether or not anything is currently wrong with it
- [ ] **Accumulation:** exposure totalled per appetite type and compared to the stated appetite, reporting where individually acceptable decisions combined into a position outside appetite that **no single decision breached**
- [ ] **Interaction:** where a response to one risk increases another, both are reported. Consolidating suppliers reduces operational variance *and* increases concentration; both are true
- [ ] Entity-level position per appetite type is stated as INSIDE / AT BOUNDARY / OUTSIDE, with the driver named

## 7. Tail and emerging

- [ ] **BLOCKING.** The artifact **declares at the start** that scenario analysis, stress testing and tail-risk reasoning are general risk-management discipline, that COSO ERM provides the structure in which they are used, and that it is **not their source**
- [ ] Worst plausible cases are written as **narratives with a sequence**, not as scores. Plausible means a chain of events each of which has happened somewhere — not a physically conceivable maximum
- [ ] The survivability question is answered explicitly in terms of cash, licence, key relationships, key people and data
- [ ] Correlation between adverse cases is examined — adverse events arrive together far more often than registers assume, because they share causes
- [ ] **Emerging** exposures are listed separately and are **not scored**; each carries a trigger, an owner and a review date
- [ ] The artifact states explicitly **which exposures currently have no response at all**

## 8. Breach handling

- [ ] A breach is confirmed **against the stated tolerance**, with the measurement and its date. A suspected breach with no measurement is an escalation, not a breach
- [ ] The breach is classified: ONE-OFF / DRIFT / DEFINITIONAL (never measured) / APPETITE TOO TIGHT (operating outside for a long time with no consequence)
- [ ] The output matches the class — drift is routed to the portfolio view, not treated as a single-risk problem
- [ ] **BLOCKING.** No breach was resolved by silently restating the appetite. Any appetite change is an explicit board decision with a reason, on the record

## 9. Escalation thresholds

- [ ] Thresholds cover magnitude **and** velocity, reputational exposure, regulatory exposure and concentration
- [ ] **BLOCKING.** Thresholds were **backtested** against the last three matters the board learned of later than it should have. A threshold that would have caught none of them is reported as untested
- [ ] Each threshold names who measures it, how often, and who is told on a trigger

## 10. Professional limit — mandatory, no exceptions

- [ ] **BLOCKING.** The professional-limit block appears verbatim in the artifact
- [ ] **BLOCKING.** The artifact states it is **not legal, tax, actuarial, capital or insurance advice**, not a statutory-audit instrument and not a regulatory filing, and that **no audit opinion of any kind is issued**
- [ ] The artifact states that **COSO ERM is not a quantitative model** — no loss distributions, capital requirements, actuarial estimates or pricing
- [ ] Any figure present is attributed to management with its basis named; none is produced or validated by this agent
- [ ] **BLOCKING.** The artifact states that it is **input for review by the directors and by licensed professionals** before adoption, and that adoption is a human board decision
- [ ] Every question turning on statute, regulation, contract, tax or insurance obligation is REFERRED OUT — none answered, none approximated
- [ ] The human-review clause closes the artifact

## 11. Attribution

- [ ] **BLOCKING.** COSO *Enterprise Risk Management — Integrating with Strategy and Performance* (**2017**) is cited by its full title, and is kept **distinct from COSO *Internal Control — Integrated Framework*** (originally 1992, updated 2013), which belongs to audit-lead
- [ ] Where relevant, the 2017 framework is identified as updating *Enterprise Risk Management — Integrated Framework* (2004)
- [ ] COSO is expanded correctly: the Committee of Sponsoring Organizations of the Treadway Commission
- [ ] Components are named correctly where cited: Governance and Culture; Strategy and Objective-Setting; Performance; Review and Revision; Information, Communication and Reporting
- [ ] **BLOCKING.** No principle number, provision, title or year has been invented. Where the exact text or numbering matters to a decision, the artifact instructs the reader to consult the source rather than paraphrasing unverified text
- [ ] General risk-management techniques used within the framework are marked `DERIVED`, never presented as COSO methods
- [ ] This agent's own tests are marked `CONSTRUCTION`
- [ ] Sibling frameworks are not appropriated: Cadbury (1992) belongs to governance-counsel; the audit-committee material and COSO *Internal Control* belong to audit-lead; *Boards That Lead* (Charan, Carey & Useem, 2013) belongs to succession-lead

## 12. Boundary

- [ ] Nothing in the artifact designs or implements a control — design recommendations are stated as board **expectations**, and implementation is `@dev`
- [ ] Nothing asserts that a control operated — `audit-lead`
- [ ] Nothing rules on board composition, delegation or independence — `governance-counsel`
- [ ] Nothing assesses individual leaders beyond naming key-person exposure — `succession-lead`
- [ ] Nothing drafts an epic (`@pm`), a story (`@sm`), a test (`@qa`) or a release (`@devops`)

---

## Disposition

| Result | Condition | Action |
|---|---|---|
| **ISSUE** | Every blocking item satisfied | Write to `squads/board/data/` as a versioned file so movement between periods is diffable |
| **REWORK** | A non-blocking gap that changes the priority order or the entity-level position | Fix and re-run sections 3, 5 and 6 |
| **HOLD** | Any blocking item unsatisfied | Do not issue. The two commonest causes are an appetite statement that fails the forbidden-decision test, and a residual figure resting on an unevidenced control |

---

## The question that outranks the contents

Before issuing any register: **when was this register last used to change a decision?** If the
answer is never, that is the first finding, and it outranks everything in the table.
