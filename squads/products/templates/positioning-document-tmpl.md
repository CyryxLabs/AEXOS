# Positioning — [PRODUCT_NAME] (v[N])

**Template ID:** PRD-TMPL-POSITIONING-DOCUMENT
**Owner agent:** `@positioning-lead` (Datum)
**Produced by:** `*positioning-statement`, or as the final output of `*ten-step`
**Input:** a canvas that has passed `checklists/positioning-quality-checklist.md` (PRD-CL-005)
**Suggested path:** `docs/product/positioning/positioning-{product-slug}-v{n}.md`

> **What this document is.** The captured position, written once and shipped to the whole company.
> Four functions execute from this file. If a claim is not in here, it is not the position.
> Positioning that lives in one person's head is not positioning.

> **What this document is not.** It is not campaign copy, a tagline, a product name, a pricing
> page, interface copy, a story, an epic or a PRD. Positioning is the input to those.
> Copy and campaigns are downstream messaging work; interface copy is `@ux-design-expert`; price
> and packaging are `@pricing-strategist`; stories are `@sm`; epics and PRDs are `@pm`;
> implementation is `@dev`; publishing and push are `@devops` (exclusive).

> **Method attribution.** Framework published by April Dunford in *Obviously Awesome: How to Nail
> Product Positioning so Customers Get It, Buy It, Love It* (2019) — positioning as context
> setting, the five components, the ten-step process, the three market category styles, positioning
> baggage. Sales narrative built on a settled position: *Sales Pitch* (2023). Applied with
> attribution by `@positioning-lead`.

> **Constitution Article IV — No Invention.** Nothing enters this document without an evidence
> reference resolving to the canvas Evidence Ledger. `UNVERIFIED` claims stay on the canvas.
> A statement here with no `[E#]` reference is a defect, not a style choice.

---

## 1. Header

| Field | Value |
|---|---|
| Product | [PRODUCT_NAME] |
| Version | v[N] |
| Date | [YYYY-MM-DD] |
| Owner | `@positioning-lead` — accountable human: [NAME] |
| Review date | [YYYY-MM-DD] (default +90 days) |
| Supersedes | [v[N-1] or "first captured position"] |
| Source canvas | [PATH TO CANVAS v[N]] |
| Quality gate | PRD-CL-005 — score [ ] / verdict [PASS / PASS WITH CONDITIONS] |
| Positioning team | Product: [NAME] · Marketing: [NAME] · Sales: [NAME] · Success: [NAME] |
| Agreed by | [NAME, DATE] × 4 functions |

**How to fill it.** The owner is an agent plus a named human, because a review date with no human
against it does not get honoured. If a function did not agree, do not average the disagreement into
the text — record it in section 9. Positioning is a decision, and a decision excludes.

**Bad answer:** review date left blank, or set so far out that the document outlives the evidence
window behind it.

---

## 2. The Position

> For **[SEGMENT CHARACTERISTICS]** who **[CIRCUMSTANCE]**, **[PRODUCT]** is
> **[MARKET CATEGORY]** that **[PRIMARY VALUE THEME]** — unlike **[TOP ALTERNATIVES BY DEAL
> FREQUENCY]**, where **[THE CONTRAST, IN THE CUSTOMER'S WORDS]**.

**How to fill it.** Every bracket comes from a numbered canvas row. Write in the customer's
vocabulary, quoted from evidence, never in internal shorthand. Keep it one sentence; if it needs
two, one of the components is undecided.

**Bad answer:** a sentence a competitor could paste their own name into and still have be true;
any adjective without a proof point in section 3; anything that reads as a tagline. This is a frame
of reference, not copy.

**Category style:** [Head to Head / Big Fish Small Pond / Create a New Game]
**Cost accepted:** [FROM CANVAS COMPONENT 5]
**Proof burden accepted:** [FROM CANVAS COMPONENT 5]

---

## 3. The Five Components (summary, with evidence references)

Full working detail lives in the source canvas. This section carries enough for a reader outside
the positioning team to act without opening it.

### 3.1 Competitive alternatives

| Rank | Alternative | Type | Frequency in real deals | Evidence |
|---|---|---|---|---|
| 1 | | do-nothing / manual / internal build / adjacent tool / service provider / direct competitor | [N of M] | [E#] |
| 2 | | | | |
| 3 | | | | |

**One-line read:** [WHAT THIS RANKING MEANS FOR WHERE THE GO-TO-MARKET IS AIMED]

*How to fill it:* carry the top rows by real deal frequency, including do-nothing and non-vendor
alternatives. *Bad answer:* the funded-competitor list reordered.

### 3.2 Unique attributes

| Attribute | Alternatives that lack it | How verified | Evidence |
|---|---|---|---|
| | | | [E#] |

**Struck out as table stakes:** ~~[ATTRIBUTE]~~, ~~[ATTRIBUTE]~~ — these belong to the category
definition and must not be led with.

*Bad answer:* an attribute whose "verified" column says "known" or names no alternative.

### 3.3 Value themes and proof

| # | Value theme | Attributes behind it | Proof point | Evidence |
|---|---|---|---|---|
| V1 | | | | [E#] |
| V2 | | | | [E#] |

*How to fill it:* two or three themes. Two themes with proof beats six themes with adjectives.
*Bad answer:* a theme with no proof column filled — that is a claim, and it does not ship.

### 3.4 Best-fit segment characteristics

| # | Characteristic | Pre-contact signal sales can use | Evidence |
|---|---|---|---|
| S1 | | | [E#] |
| S2 | | | [E#] |

*Bad answer:* an industry code or headcount band standing in for the characteristic that predicts
caring. Firmographics may be the proxy used to find the segment; say so explicitly if they are.

### 3.5 Market category and style

| Style considered | Candidate category | Cost | Proof burden | Verdict |
|---|---|---|---|---|
| Head to Head | | Low education, high competition | Match or beat incumbents on the category's own criteria | reject / choose |
| Big Fish Small Pond | | Moderate | Prove dominance inside the subsegment | reject / choose |
| Create a New Game | | Highest — you fund market education | Prove the problem exists before the solution works | reject / choose |

**Chosen:** [STYLE] — [CATEGORY]
**Assumptions this category triggers, and why they are acceptable:** [ANSWER]

### 3.6 Trend layer

**Decision: [OMITTED / INCLUDED]**
If included: trend [TREND], connected to [V#] because [EXPLICIT CONNECTION], evidenced by [E#].
If omitted: this is the default and requires no defence.

---

## 4. Rationale — Why This Frame

Three to six sentences. State what the position buys and what it gives up.

> [WHY THIS FRAME PLACES THE VALUE THEMES WHERE THEY DECIDE THE OUTCOME RATHER THAN WHERE THEY
> ARE NICE-TO-HAVES. WHAT THE REJECTED FRAMES WOULD HAVE COST. WHAT THIS POSITION DELIBERATELY
> GIVES UP.]

**How to fill it.** Name the trade explicitly. A rationale that describes only upside means the
position excludes nothing, which means it is not a decision.

**Bad answer:** a restatement of the position in different words; a rationale that appeals to
internal preference ("this is who we have always been") rather than to evidence.

---

## 5. What Changed and Why

Skip the diff columns only if this is v1; in that case state what the informal position was before
and that it was never captured.

| Component | Previous (v[N-1]) | Now (v[N]) | Why it changed | Evidence that forced the change |
|---|---|---|---|---|
| Competitive alternatives | | | | [E#] |
| Unique attributes | | | | |
| Value themes | | | | |
| Segment | | | | |
| Category / style | | | | |
| Trend | | | | |

**Trigger for this revision:** [WHICH REPOSITIONING TRIGGER FIRED — prospects mis-categorizing on
first contact / sales cycles lengthening without price or product change / churn concentrated in
fast-closing accounts / losses to untracked alternatives / a new capability shifted where we win /
the category itself shifted, split or collapsed]

**How to fill it.** Attach the evidence that forced each change, not the meeting where it was
decided. A change with no evidence column is a preference and belongs in section 9.

---

## 6. Positioning Baggage Set Down

| Baggage | Present? | Disposition | Why | Who is most likely to pick it back up |
|---|---|---|---|---|
| The founding story | yes / no | keep / **set down** | | |
| The original market category | | | | |
| Legacy naming | | | | |
| The investor narrative | | | | |
| [OTHER] | | | | |

**How to fill it.** The founding story describes where the product came from; positioning describes
where it wins now. Name the baggage explicitly so the team can set it down deliberately instead of
defending it unconsciously in every review. The last column is not a jab — it names where the
position will erode first, so the owner knows where to look at the review date.

**Bad answer:** "no baggage". Baggage is usually invisible to the people carrying it; a blank table
means the check was skipped.

---

## 7. What Each Function Does Differently

The test of this section: someone in each function can act on Monday without asking a follow-up
question. Write actions, not principles.

### Sales
- **Lead with:** [VALUE THEME / PROOF POINT]
- **Stop leading with:** [WHAT IS BEING RETIRED — usually a struck-out table stake]
- **Qualify on:** [SEGMENT CHARACTERISTIC, AS A QUESTION A REP CAN ASK]
- **Compare against:** [TOP ALTERNATIVE BY FREQUENCY — often not a vendor]
- **Assets to change:** [DECK SECTION, DISCOVERY SCRIPT, BATTLECARD] — owner [NAME], by [DATE]

### Marketing
- **Category frame to use:** [CATEGORY]
- **Framing to retire:** [OLD CATEGORY / OLD FRAME], from [SURFACES]
- **Comparison content targets:** [ALTERNATIVE], not [PREVIOUS TARGET]
- **Assets to change:** [PAGES, SEARCH TERMS, NURTURE] — owner [NAME], by [DATE]
- **Not in scope here:** the words themselves. This document sets the frame; copy is downstream
  messaging work and interface copy is `@ux-design-expert`.

### Product
- **Ranking consequence:** [WHAT MOVES UP OR DOWN, GIVEN THE NARROWED SEGMENT AND VALUE THEMES]
- **Attribute to protect:** [THE UNIQUE ATTRIBUTE THE POSITION RESTS ON]
- **Table stakes to maintain, not market:** [LIST]
- **Handoff:** roadmap and portfolio consequences go to `@product-strategist`; this document does
  not create stories, epics or PRDs.

### Customer Success
- **Onboarding now measures:** [THE METRIC THAT IS ALSO A PROOF POINT]
- **Best-fit signal to flag at handover:** [SEGMENT CHARACTERISTIC]
- **Wrong-fit signal to escalate:** [THE CHARACTERISTIC WHOSE ABSENCE PREDICTS CHURN]
- **Renewal notes should capture:** [THE OUTCOME LANGUAGE THAT FEEDS THE NEXT PROOF POINT]

**Bad answer for any function:** "align messaging with the new positioning". That is not an action;
nobody can tell on the review date whether it happened.

---

## 8. Falsifiable Hypotheses for `@experimentation-lead`

At least one is mandatory. A positioning claim that cannot be stated as a testable hypothesis is
being defended by argument rather than by evidence.

### H1 (required)

| Field | Value |
|---|---|
| Claim under test | [THE POSITIONING CLAIM, e.g. "the subsegment frame converts better than the platform frame"] |
| Hypothesis | If [CHANGE, e.g. the homepage above-the-fold frame moves from [OLD CATEGORY] to [NEW CATEGORY]], then [OUTCOME] will [DIRECTION] for [POPULATION]. |
| Population | [WHO IT APPLIES TO — must match the best-fit segment characteristics, not all traffic] |
| Expected direction | [INCREASE / DECREASE] |
| Falsified if | [THE RESULT THAT WOULD MAKE US ABANDON THE CLAIM — state it before running] |
| Proposed OEC | [PROPOSED — `@experimentation-lead` owns the final choice] |
| Still needed before it runs | OEC confirmation, power calculation, guardrail metrics — owned by `@experimentation-lead` |

### H2 (optional)

| Field | Value |
|---|---|
| Claim under test | |
| Hypothesis | |
| Population | |
| Falsified if | |

**How to fill it.** Write the falsification condition first; it is the part that makes the rest
honest. **Bad answer:** a hypothesis with no stated falsification condition, or one whose
population is "everyone" — that tests traffic, not the position.

---

## 9. Open Disagreements and Known Gaps

Recorded rather than averaged away. Positioning by committee consensus produces a position that
offends nobody and describes nothing.

| # | Disagreement or gap | Held by | What would settle it | Owner | Due |
|---|---|---|---|---|---|
| 1 | | | | | |

**Unverified claims excluded from this document:** [LIST WITH CANVAS REFS] — these remain on the
canvas and are excluded here under Article IV.

---

## 10. Review and Revision

| Field | Value |
|---|---|
| Review date | [YYYY-MM-DD] |
| Reviewer | `@positioning-lead` + [NAMED HUMAN] |
| Review inputs to gather | Win/loss since [DATE]; churn by segment characteristic; results of H1; the surfaces listed in section 7 |
| Early-revision triggers | Any repositioning trigger from section 5 firing before the review date |

**At review, check in this order:** did the per-function actions in section 7 actually happen; did
the alternatives ranking move; did H1 resolve; did any baggage from section 6 get picked back up.

---

## 11. Handoffs

| Destination | Condition |
|---|---|
| `@pricing-strategist` | Segment and value themes are settled; packaging, willingness to pay and value-based segmentation are next |
| `@product-strategist` | The position implies roadmap or portfolio changes — a narrowed segment reprioritizes the backlog |
| `@discovery-lead` | Section 9 gaps need structured customer research |
| `@jobs-analyst` | A value theme must be grounded in the job the customer hires the product to do |
| `@experimentation-lead` | Section 8 hypotheses become controlled experiments |
| `@products-chief` | The position conflicts with squad-level direction and needs arbitration |
| `@pm` | The position is captured and an evidenced problem now needs epic framing |

---

## Distinctions (for readers new to this document)

| This is not | Because |
|---|---|
| Messaging | Positioning is the strategic context decision; messaging is the words used to express it. Messaging cannot repair broken positioning. |
| Branding | Branding is identity and perception over time. Positioning is the frame of reference for evaluation right now. |
| Segmentation | Segmentation divides the market. Positioning selects the frame in which one segment finds you obviously correct. |
| Category creation | Category creation is one of three positioning styles, not a synonym for positioning. |

---

*AEXOS — products squad — `@positioning-lead` (Datum). Framework: April Dunford, Obviously
Awesome (2019); Sales Pitch (2023). Applied with attribution.*
