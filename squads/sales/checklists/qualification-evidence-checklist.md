# Qualification Evidence Checklist

**Checklist ID:** SALES-CL-003
**Referenced by:** qualification-lead (`*qualify`, `*pressure-test`, `*deal-inspection`)
**Purpose:** Apply the evidence test to a qualification record before it informs a forecast, a concession, or a stage advance. This checklist does not ask whether the deal was qualified. It asks whether each letter carries **dated evidence from a named buyer-side source**, and it downgrades every field that does not.

[[LLM: EXECUTION INSTRUCTIONS — QUALIFICATION EVIDENCE

1. Work letter by letter. Do not accept a summary of the record; read the record.
2. For every item, the passing condition is a SOURCE and a DATE, both named. "The rep knows" is not
   a source. "Recently" is not a date.
3. Apply the written-confirmation test to every field: if we emailed the buyer today asking them to
   confirm this in writing, would they? Fields that would not survive that email are downgraded to
   score 1 immediately, whatever the record currently says.
4. A failed item is not a comment. It changes the score, and the score changes the verdict.
5. Do not soften an outcome because the deal is large or well-liked.]]

**Evidence scale used throughout:** 0 absent · 1 asserted by the seller · 2 stated by the buyer verbally, dated · 3 confirmed in writing by the buyer, or evidenced by an artifact the buyer produced.

---

## 0. Record hygiene

- [ ] Every letter has a row; none is blank or omitted
- [ ] Every finding carries a **named source** — a person, a document, or a message, not "our notes"
- [ ] Every finding carries a **date**
- [ ] Pain and decision criteria are recorded **verbatim in the buyer's words**, not paraphrased
- [ ] Buyer-stated figures and seller-constructed models appear in separate, labelled fields
- [ ] Every field below score 2 also appears in the UNVERIFIED block, visibly

## 1. M — Metrics

- [ ] A **current** number and a **target** number are both present, in the buyer's units
- [ ] The number was stated by the buyer, not computed by us — a model we built is a **proposal**, recorded as ours and scored 1
- [ ] The person inside the buyer who owns that number is named
- [ ] What happens to that person if the number does not move is recorded
- [ ] Written-confirmation test: would the buyer repeat this figure in writing today? *(no → score 2 at most)*
- [ ] If no number exists at all, the record says so and states plainly that the business case cannot be written yet *(score 0)*

## 2. E — Economic buyer

- [ ] Requester, approver and **releaser** are distinguished; only the releaser is recorded as the economic buyer
- [ ] Their approval limit is recorded, and whether this deal crosses it
- [ ] What they are personally measured on this year is recorded, or explicitly marked UNKNOWN as the gap
- [ ] Access is stated honestly using one of: never met / met once / in regular contact / has stated their own criteria to us
- [ ] **A name from an org chart with no conversation scores 1, regardless of confidence in the name**
- [ ] A forwarded email is not counted as access
- [ ] If access is absent, the path to it is designed: who introduces us, what makes it worth their while, what we bring that the requester cannot deliver on our behalf

## 3. D — Decision criteria

- [ ] Criteria are recorded in the **buyer's formulation**, not translated into our feature names
- [ ] Criteria are grouped: technical, business, relationship or risk
- [ ] Each criterion has a buyer-side owner and a stated scoring or evidencing method
- [ ] Any criterion we authored or heavily influenced is **flagged as influenced** — influence is legitimate; counting it as independent buyer evidence is not
- [ ] **Any criterion we cannot satisfy is stated plainly.** Concealing one is a material omission and a disqualification signal, not a gap to manage *(this item BLOCKS: an unstated unmet criterion fails the record)*
- [ ] Score 3 requires a buyer-produced artifact — an evaluation sheet, an RFP section, a written scoring rubric

## 4. D — Decision process

- [ ] The sequence from today to signature is recorded step by step, with a buyer-side owner per step
- [ ] Every step carries a date or an expected duration — **a process without dates is a wish**
- [ ] The paper process is mapped explicitly (security, legal, privacy, procurement, insurance, PO) and flagged as the MEDDPICC extension
- [ ] Which steps run in parallel and which are strictly sequential is stated
- [ ] The signature authority threshold is recorded and whether this deal crosses it
- [ ] The end date implied by the process is compared to the forecast close date, and any difference is reported as a **forecast** defect
- [ ] **The close date is derived from the buyer's decision process, never from our quarter boundary** *(this item BLOCKS)*
- [ ] The step most likely to slip is named, with who could pre-empt it

## 5. I — Identify pain

- [ ] The consequence is recorded verbatim, attributed to a named buyer-side speaker, with a date
- [ ] A **specific recent instance** with its own date is recorded, not a general condition
- [ ] The cost is recorded: money, time, risk, or a missed commitment
- [ ] The person inside the buyer who feels the consequence personally is named — pain with no owner does not fund projects
- [ ] What changed recently to make this urgent now is recorded. If nothing changed, the record says so and forecasts a no-decision outcome
- [ ] Any seller-identified problem the buyer has never named is recorded as a **hypothesis**, in its own field, never as pain

## 6. C — Champion

- [ ] All three tests are recorded with **results and dates**, not impressions
- [ ] **Influence:** a concrete instance where they convened or moved the people who matter — for us, ideally
- [ ] **Personal benefit:** what changes for them, in their own words, quoted
- [ ] **Willingness:** a concrete action taken on our behalf when we were not in the room. **Agreement is not the test; action is**
- [ ] An untested contact is classified as a **contact**, not as a champion *(this item BLOCKS a champion classification)*
- [ ] If the willingness test has failed twice, the record says so and the next step is a second relationship rather than escalating pressure on the first
- [ ] No claim was handed to the champion to advocate that we have not verified — their credibility is not ours to spend

## 7. Pressure test — the whole record

- [ ] Each field has been asked: *would the buyer confirm this in writing today?* Fields that would not are downgraded to 1 in the revised score
- [ ] The single person whose departure would collapse the deal is identified; if it is our only champion, that single point of failure is recorded
- [ ] What would have to be true for this deal to close on the forecast date is written out, and any of it that is currently unevidenced is named
- [ ] The revised score and the delta against the original record are both shown

## 8. Integrity

- [ ] No qualification answer was obtained using fabricated urgency, invented scarcity or manufactured consequence. If the buyer declined to name a decision process, that silence is recorded as qualification data and was **not** converted into a deadline *(BLOCKS)*
- [ ] No material limitation, integration gap or total cost is being withheld in order to keep this deal qualified *(BLOCKS)*
- [ ] The buyer was, throughout, in a position to know why a question was being asked and to decline to answer it
- [ ] Nothing in this record sets or implies a price, a discount, a package or a competitive frame — those are `@products:pricing-strategist` and `@products:positioning-lead`

## 9. Gaps and verdict

- [ ] Every letter at 0 or 1 has **exactly one** verification step, with an owner and a date
- [ ] The two highest-yield verification steps are named and ranked by decision impact against cost
- [ ] The verdict follows the rules in `data/qualification-evidence-standards.yaml` and was not softened for deal size
- [ ] If the verdict is DISQUALIFIED, an observable re-entry condition exists *(BLOCKS a disqualification without one)*
- [ ] Any gap that also appears across other deals is routed to `@sales:pipeline-ops` as a process finding rather than recorded as an individual failure

---

## Outcome

| Field | Entry |
|---|---|
| Letters at score 3 / 2 / 1 / 0 | |
| Blocking items failed | {{list — any blocking failure invalidates the verdict until resolved}} |
| Revised verdict after this checklist | |
| Delta against the record as written | |
| Cheapest next verification step | |

**Pass condition:** no blocking item failed, every letter sourced and dated, the close date derived from the buyer's process, and every field below score 2 visible in the UNVERIFIED block.

---

*MEDDIC is applied here as a named discipline originated at PTC and credited to Dick Dunkel and Jack Napoli, with no canonical work by its originators; MEDDICC and MEDDPICC are practitioner extensions and are flagged as such. Nothing in this checklist quotes a text or attributes a phrasing to an individual.*
