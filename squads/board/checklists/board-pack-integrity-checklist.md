# Board Pack Integrity Checklist

**Checklist ID:** BRD-CL-001
**Referenced by:** board-chief
**Applied to:** any board pack, agenda or minute before it is circulated
**Purpose:** Verify that a board artifact is traceable, classified, disposed and bounded — before
anyone relies on it.

[[LLM: INITIALIZATION — BOARD PACK INTEGRITY

Run this against the completed artifact, not against the intention to produce one.

Mark each item:
  [x] satisfied — and name the evidence in the artifact that satisfies it
  [ ] not satisfied — and name what is missing
  [N/A] not applicable — and state why

Any item marked BLOCKING that is not satisfied stops circulation. A pack that fails a blocking
item is not "mostly ready"; it is an artifact that will be relied upon for something it cannot
support.

This checklist reads and reports. It changes nothing.]]

---

## 1. Classification — before any content is assessed

- [ ] **BLOCKING.** The matter is classified RESERVED / DELEGATED WITH OVERSIGHT / NOT A BOARD MATTER / UNDEFINED before any of its merits are discussed in the pack
- [ ] All three boundary tests are shown with their results, not summarized into a conclusion
- [ ] `UNDEFINED` (no delegation covers the matter) is reported as a finding in its own right and routed to governance-counsel, not quietly resolved as "reserved"
- [ ] The item type (DECISION / OVERSIGHT / INFORMATION / STANDING) is stated and matches what the pack actually asks for

## 2. Traceability — Constitution Article IV, No Invention

- [ ] **BLOCKING.** Every substantive statement names its source artifact and that artifact's date
- [ ] **BLOCKING.** No statement originates in the pack itself; Chair generated nothing
- [ ] Specialist findings are transcribed, not paraphrased into a softer or more confident form
- [ ] Where a discipline produced no view, the pack says so explicitly and states the consequence — an absent view is reported as a finding, never as a blank section
- [ ] Dates are present on every artifact reference, so a reader can tell which view is stale

## 3. The existence-versus-operation distinction

This is the test the method actually applies, and it is the one most often skipped.

- [ ] **BLOCKING.** For every structure, policy, control or plan the pack relies on, the pack states separately whether it **exists** (a document says so) and whether it **operated** (there is evidence it was used in the period)
- [ ] A structure that exists with no evidence of use is reported as ASSERTED, not as PRESENT — a committee with terms of reference and no minutes, a reserved-matters schedule no decision was ever tested against, an emergency succession plan nobody has walked through
- [ ] The two states are never merged into a single status word such as "in place"
- [ ] Where operation cannot be evidenced, the pack says which evidence would settle it and who holds it

## 4. Evidence discipline on decision items

- [ ] **BLOCKING.** Every DECISION item names the evidence supporting it
- [ ] Every DECISION item names its falsifier — the observation that would show the position to be wrong. An assertion with no possible falsifier is a characterization, and is labelled as one
- [ ] A decision item with no evidence has been reclassified as INFORMATION or deferred with an owner and a date — it has not been left in the pack as a decision
- [ ] Where the board is being asked to decide under acknowledged uncertainty, the pack states the assumption being relied on, in one sentence, with an owner and the earliest date evidence arrives

## 5. Coherence chain

- [ ] All six links are present as rows: mandate, appetite, control, evidence, capacity, accountability
- [ ] Each link is marked CONSISTENT / BREAK / BREAK-INHERITED / NO ARTIFACT
- [ ] Inherited breaks are distinguished from independent ones
- [ ] The repair order runs upstream first, and no repair is proposed for an inherited break directly
- [ ] Where the stale artifact might be the upstream one rather than the downstream one, the pack says so and names the decision that settles it

## 6. Contradiction handling

- [ ] Every contradiction between specialist views is surfaced, with the **unshared assumption** named
- [ ] **BLOCKING.** No contradiction has been resolved by averaging the two positions. A compromise supported by neither body of evidence is a new unevidenced claim
- [ ] Where both sides hold evidence about different populations or periods, this is reported as a scope split rather than as a contradiction
- [ ] Where neither side holds evidence, the output is an evidence request, not a decision
- [ ] Where the disagreement is about values or risk tolerance, it is surfaced as a decision for the humans and is not resolved silently

## 7. Dissent and disposition

- [ ] Dissent is recorded verbatim with the dissenter named, or the section states `No dissent recorded.`
- [ ] **BLOCKING.** No split view has been minuted as unanimous or as "the board agreed"
- [ ] Every item closes with a disposition, or is explicitly named as unresolved with an owner and a date
- [ ] Conditions attached to any decision each carry an owner and a date
- [ ] A review date is set, together with the trigger that would reopen the matter early

## 8. Professional limit — mandatory, no exceptions

- [ ] **BLOCKING.** The professional-limit block is reproduced verbatim in the artifact
- [ ] The artifact states that it is **input for review by the directors and by licensed professionals**, never the final decision instrument
- [ ] The artifact states that **no agent issues an audit opinion of any kind**
- [ ] **BLOCKING.** Every question turning on statute, listing rule, contract, tax treatment, statutory audit, accounting-policy determination or employment law is listed as REFERRED OUT — none is answered, and none is approximated
- [ ] Items blocked by an outstanding referral are marked NOT READY rather than decided around
- [ ] No sentence in the artifact would read, to a non-specialist, as a legal or audit conclusion

## 9. Attribution

- [ ] Every framework applied is named with its correct title and year
- [ ] COSO *Enterprise Risk Management — Integrating with Strategy and Performance* (2017) is kept distinct from COSO *Internal Control — Integrated Framework* (1992, updated 2013) — they are different publications with different purposes
- [ ] Charan, Carey & Useem, *Boards That Lead* (2013) is kept distinct from Charan, Drotter & Noel, *The Leadership Pipeline* (2001) — different books, different co-authors, never cited for each other's content
- [ ] Audit committee material states that the discipline has **no single canonical work**, and attributes each provision to its named source or marks it `DISCIPLINE`
- [ ] The three-lines model is attributed to the Institute of Internal Auditors **with the caveat that its formulation has changed between versions**
- [ ] **BLOCKING.** No citation, title, year, author or provision has been invented. Where the precise wording of a provision was uncertain, the pack describes the principle and instructs the reader to consult the source, rather than paraphrasing text it did not verify
- [ ] Anything not traceable to a named source is marked `DERIVED` (established practice) or `CONSTRUCTION` (this squad's own test)
- [ ] Where a framework is applied outside its original scope, the **adaptation is declared in the body** of the artifact, not in a footnote

## 10. Squad boundary

- [ ] Nothing in the artifact drafts an epic or a PRD — that is `@pm`
- [ ] Nothing drafts a story — that is `@sm`
- [ ] Nothing validates a story or reprioritizes a backlog — that is `@po`
- [ ] Nothing implements — that is `@dev`
- [ ] Nothing runs a quality gate or produces test evidence — that is `@qa`
- [ ] Nothing pushes, opens a PR, configures MCP or touches CI/CD — that is `@devops`, exclusively, and a board resolution is not an exception
- [ ] Any allegation of fraud, misconduct or retaliation is surfaced in the open and routed to the whistleblowing channel via audit-lead — **never** summarized into a caveat or a footnote

---

## Disposition

| Result | Condition | Action |
|---|---|---|
| **CIRCULATE** | All blocking items satisfied; no more than two non-blocking gaps, each named in a cover note | Issue the pack |
| **RETURN** | Any non-blocking gap that changes what a reader would conclude | Return to the owning specialist with the specific gap |
| **HOLD** | Any blocking item unsatisfied | Do not circulate. Fix, then re-run this checklist in full |

A HOLD is not a delay. A pack circulated with a blocking gap is relied upon exactly as if the gap
were not there, which is the failure mode this checklist exists to prevent.
