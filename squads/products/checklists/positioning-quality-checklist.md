# Positioning Quality Checklist

**Checklist ID:** PRD-CL-005
**Squad:** products
**Referenced by:** `@positioning-lead` (Datum)
**Runs against:** `templates/positioning-canvas-tmpl.md` (a filled canvas)
**Gates:** capture into `templates/positioning-document-tmpl.md`
**Purpose:** Pre-capture quality gate. A position that fails here is not captured, because a
captured position that is wrong is executed by four functions for a quarter before anyone notices.

> **Method attribution.** The quality criteria below express the framework published by April
> Dunford in *Obviously Awesome: How to Nail Product Positioning so Customers Get It, Buy It, Love
> It* (2019) — the five components, the ten-step process, the three market category styles,
> positioning baggage. Applied with attribution by `@positioning-lead`.

> **Boundary.** This checklist audits the frame of reference only. It does not review copy, price,
> packaging, interface text, code, stories or epics. It reads and reports; it changes nothing and
> pushes nothing.

[[LLM: INITIALIZATION INSTRUCTIONS — POSITIONING QUALITY GATE

Run this against a filled canvas, not against a conversation.

EXECUTION APPROACH:
1. For each item, check the canvas itself. Do not accept a verbal assurance in place of a row.
2. Mark [x] present and correct, [ ] missing or incorrect, [N/A] genuinely not applicable.
3. [N/A] requires a written reason on the line. "[N/A]" with no reason counts as [ ].
4. Items marked (CRITICAL) failing means NO-GO regardless of total score.
5. Total the score, take the verdict from the table, and produce the fix list in the priority
   order given at the end.
6. Report the specific canvas row that failed, not just the item number.

This gate is adversarial by design. The question at every line is "what is the evidence",
not "does this sound right".]]

---

## 1. Competitive Alternatives — Sourced From Win/Loss, Not a Competitor Grid

- [ ] The alternatives list is built from win/loss records, no-decision reasons and best-fit interviews (CRITICAL)
- [ ] No alternative appears whose only source is a competitor grid, an analyst quadrant, or internal impression
- [ ] Do-nothing / defer is present as a row, or its absence is justified with evidence (CRITICAL)
- [ ] At least one non-vendor alternative is present: manual process, internal build, adjacent tool off-label, or service provider (CRITICAL)
- [ ] Every mandatory alternative type is either present or has a recorded reason for absence
- [ ] Each row is ranked by frequency in real deals, with the denominator shown (`N of M`), not by internal threat perception
- [ ] Each row names an evidence source with an identifier and a date
- [ ] "Why customers pick it" is in the customer's words, quoted, not paraphrased into company vocabulary
- [ ] The ranking read is written: one sentence on what the ranking implies about where the go-to-market is aimed
- [ ] The evidence window is stated and postdates the last material product or market change

**Fails this section if:** the list is the funded-competitor list reordered. The most common
positioning defect is a go-to-market aimed at a competitor that appears in a small fraction of
deals while a spreadsheet or a deferral decides most of them.

## 2. Unique Attributes — Verified Absent in the Listed Alternatives

- [ ] Every attribute names the specific alternatives that lack it, by name from section 1 (CRITICAL)
- [ ] Every attribute states how absence was verified, and the method is checkable (CRITICAL)
- [ ] Verification methods are acceptable forms: dated public documentation, a customer-run evaluation, a customer statement, or a third-party/audit document
- [ ] No attribute is verified by "everyone knows", a rep's impression, or our own comparison page
- [ ] The qualification rule was applied to every candidate, with a verdict recorded per row
- [ ] Table stakes are struck through and kept visible, not silently deleted (CRITICAL)
- [ ] Each struck-out table stake names where it goes instead (the category definition)
- [ ] Weak differentiators — present in some alternatives — either carry a value theme or were dropped, and the decision is recorded
- [ ] Trivia — absent in all alternatives, cared about by nobody — was dropped, and the drop is recorded
- [ ] Attributes are written in the customer's vocabulary, not internal shorthand
- [ ] No attribute rests on being *better at* a table stake without a proof point in section 3

**Fails this section if:** a favourite feature survives as a differentiator because no one wanted
to say it is table stakes. The buyer hears nothing distinguishing and falls back to price.

## 3. Value Themes — Every Theme Has a Proof Point

- [ ] Every value theme traces to at least one attribute ID from section 2 (CRITICAL)
- [ ] Every value theme carries at least one proof point (CRITICAL)
- [ ] Each proof point is one of: usage metric, customer-stated outcome in an interview or renewal note, third-party validation or audit result, or benchmark against a named alternative
- [ ] Each proof point names the measure, the population and the source, so it can be checked from outside the room
- [ ] Proof measures the customer's outcome, not our activity
- [ ] Themes are outcomes, not capabilities restated
- [ ] No theme is carried by an adjective alone ("powerful", "seamless", "enterprise-grade")
- [ ] Theme count is three or fewer; more means duplicates or an undecided position
- [ ] Each theme names which alternative it beats, and on what dimension
- [ ] Any theme whose proof is pending is marked UNVERIFIED and excluded from capture

**Fails this section if:** the themes would survive unchanged if the product changed. That means
they describe an aspiration rather than what the attributes enable.

## 4. Segment — Characteristics Identifiable Before First Contact

- [ ] Segment characteristics are derived from customers who already love the product, not from the market wanted (CRITICAL)
- [ ] Each characteristic has a causal story for why it predicts caring about the value themes
- [ ] Each characteristic is assessed for whether it predicts fast close and low churn
- [ ] Each characteristic is identifiable before the first call, with the pre-contact signal named (CRITICAL)
- [ ] Characteristics that merely describe current customers are marked as correlation and flagged for testing, not built upon
- [ ] Firmographics are not substituted for the characteristics that drive caring; where a firmographic is used as a proxy, it is labelled as a proxy
- [ ] Segment size at current pricing was assessed, and if it is insufficient that is recorded as a finding for `@pricing-strategist` and `@product-strategist` rather than resolved by widening the claim
- [ ] The one-sentence segment statement is written in customer vocabulary
- [ ] Any characteristic sales cannot detect pre-contact is either replaced by an observable proxy or dropped

**Fails this section if:** the segment is true but unusable — nobody can tell whether a prospect
is in it until after the deal is lost.

## 5. Category — Assumptions Mostly Correct and Mostly Favourable

- [ ] All three styles are filled in, including the rejected ones, with cost, proof burden and risk (CRITICAL)
- [ ] The assumptions each candidate category triggers are written out explicitly
- [ ] The chosen category's assumptions are assessed as mostly correct and mostly favourable (CRITICAL)
- [ ] No assumption triggered by the chosen category has to be corrected during the sales cycle
- [ ] The chosen style is named explicitly: Head to Head, Big Fish Small Pond, or Create a New Game
- [ ] Cost and proof burden for the chosen style are stated and accepted, not implied
- [ ] If Create a New Game is chosen, an education budget is identified and named (CRITICAL when applicable)
- [ ] If Create a New Game is chosen, the canvas states why no existing frame carries the strengths without misleading the buyer
- [ ] Reversibility is assessed: what it costs to change this category later
- [ ] Where the decision was close, the default was applied — Big Fish Small Pond, the cheapest defensible position, widenable later from a position of proof

**Fails this section if:** the category was chosen because it sounds ambitious. The category is a
shortcut into the customer's head; if its assumptions must be corrected, it is the wrong category.

## 6. Trend — Absent, or Genuinely Connected

- [ ] A trend decision is recorded; omission counts and is the default
- [ ] If a trend is included, it names the specific value theme it amplifies
- [ ] If included, the connection is stated as a mechanism, not as adjacency — the sentence does not merely place trend and value side by side
- [ ] If included, there is evidence the segment itself talks about this trend, in the buyer's words rather than the trade press
- [ ] If included, the canvas states what happens to the position when the trend passes

**Fails this section if:** the trend was added because it is in every deck this quarter. Bolted-on
trends signal tourism, dilute the frame, and date the positioning.

## 7. Cross-Functional Agreement

- [ ] The positioning team names a participant from product, marketing, sales and customer success (CRITICAL)
- [ ] Any missing function is recorded as a named evidence gap, not treated as a scheduling detail
- [ ] Sales contributed the alternatives and lost-deal reasons
- [ ] Customer success contributed the churn pattern and the best-fit profile
- [ ] Product contributed the attribute truth — what the product does that alternatives do not
- [ ] Marketing contributed the category signal
- [ ] Positioning baggage was checked explicitly, with a disposition per item (founding story, original category, legacy naming, investor narrative) (CRITICAL)
- [ ] The baggage table is not blank; "no baggage" without a recorded check counts as a fail
- [ ] Open disagreements are recorded as disagreements, not averaged into text that offends nobody and describes nothing
- [ ] Each function's representative can state the position without contradicting another's

**Fails this section if:** one function ran the exercise. A position built by one function is a
position only that function will execute.

## 8. Evidence and Article IV Compliance

- [ ] Every canvas row resolves to an entry in the Evidence Ledger (CRITICAL)
- [ ] Every ledger entry names evidence type, source identifier and date
- [ ] Claims without evidence are tagged UNVERIFIED rather than softened into vaguer language (CRITICAL)
- [ ] The unverified register names, per claim, what evidence would settle it, who owns getting it and by when
- [ ] No UNVERIFIED row is carried into the positioning document
- [ ] No component depends entirely on UNVERIFIED rows; if one does, the gap is routed to `@discovery-lead`
- [ ] Evidence is inside the stated evidence window
- [ ] No number appears without its denominator and source

## 9. Capture Completeness

- [ ] The assembled position is one sentence and every bracket traces to a numbered canvas row (CRITICAL)
- [ ] A competitor could not substitute their own name into the position sentence and have it remain true
- [ ] Per-function actions exist for sales, marketing, product and customer success (CRITICAL)
- [ ] Each per-function action is executable on Monday without a follow-up question — no "align messaging with the new positioning"
- [ ] Each per-function action names an owner and a date
- [ ] A review date is set, with a named human alongside the owning agent (CRITICAL)
- [ ] At least one claim is expressed as a falsifiable hypothesis for `@experimentation-lead`, including its falsification condition (CRITICAL)
- [ ] The hypothesis population matches the best-fit segment rather than all traffic
- [ ] What changed and why is recorded against the previous version, with the evidence that forced each change
- [ ] The repositioning trigger that prompted this version is named
- [ ] Handoffs are identified: `@pricing-strategist`, `@product-strategist`, `@discovery-lead`, `@jobs-analyst`, `@experimentation-lead`, `@products-chief`, `@pm` as applicable
- [ ] No campaign copy, tagline, product name, price, package or interface text was produced by this exercise

---

## Scoring

**Calculation:** (Checked items) / (Total items − justified N/A items) × 100

| Grade | Score | Verdict | Meaning |
|---|---|---|---|
| A | 90–100% | **GO** | Capture it. Remaining gaps go to the review date. |
| B | 80–89% | **GO WITH CONDITIONS** | Capture only after the listed conditions are closed. Name the conditions and their owners in the document's Open Gaps section. |
| C | 70–79% | **NO-GO — repair** | The position is directionally right and evidentially thin. Return to the failing components before capture. |
| D | 60–69% | **NO-GO — rerun components** | At least one component is unsourced or built on the wrong input. Rerun those components from evidence. |
| F | < 60% | **NO-GO — restart from alternatives** | The chain is broken at the base. Rerun from competitive alternatives; everything downstream is measured against them. |

**Override rule.** Any (CRITICAL) item unchecked forces **NO-GO** regardless of the percentage.
Record which critical item failed and what evidence would clear it. A high score with a failed
critical means the exercise was thorough about the wrong things.

**Verdict record:**

| Field | Value |
|---|---|
| Canvas reviewed | [PATH, v[N]] |
| Date | [YYYY-MM-DD] |
| Score | [ ] / [ ] = [ ]% |
| Critical failures | [LIST OR NONE] |
| Verdict | GO / GO WITH CONDITIONS / NO-GO |
| Conditions to close before capture | [LIST WITH OWNERS AND DATES] |

---

## Priority Fix Order

Fix in this order. The chain is sequential — repairing a downstream component against a wrong
upstream one wastes the work.

1. **Competitive alternatives (section 1).** Everything else is measured against this list. If it
   came from a competitor grid, every attribute verdict below it is suspect and must be rerun.
2. **Article IV evidence failures (section 8).** An unsourced claim that reaches the document gets
   executed as fact by four functions. Tag or remove before anything else is polished.
3. **Attribute verification (section 2).** Unverified uniqueness produces differentiation that
   collapses on first contact with an informed buyer.
4. **Proof points (section 3).** A theme without proof is a claim; claims lose to the buyer's
   assumption that everyone says that.
5. **Segment usability (section 4).** A correct but undetectable characteristic cannot be executed
   by sales, so the position cannot be aimed.
6. **Category assumptions and style cost (section 5).** Wrong category assumptions are paid for in
   every sales cycle until the position is redone.
7. **Cross-functional agreement and baggage (section 7).** Unnamed baggage returns and unresolved
   disagreement re-emerges as four different positions within a quarter.
8. **Capture completeness (section 9).** Per-function actions, review date and the falsifiable
   hypothesis. Last, because there is no point capturing a position that fails 1–7.
9. **Trend (section 6).** Cheapest to fix — the correct fix is usually deletion.

---

## Symptom Cross-Reference

If the audit was triggered by an observed symptom, start at the section named here.

| Symptom | Likely cause | Start at |
|---|---|---|
| Prospects say they do not get it | Wrong or missing market category — no frame of reference | Section 5 |
| Sales cycles lengthening without product or price change | Category triggers assumptions that must be corrected mid-cycle | Section 5 |
| Churn concentrated in fast-closing accounts | Segment definition attracts customers who do not care about the value | Section 4 |
| Losing to alternatives not tracked as competitors | Alternatives list built from a competitor grid | Section 1 |
| Internal functions describe the product differently | Positioning never captured, or captured and not rolled out | Sections 7 and 9 |
| Every deal comes down to price | Differentiation is table stakes; buyer sees interchangeable options | Section 2 |

---

*AEXOS — products squad — `@positioning-lead` (Datum). Framework: April Dunford, Obviously
Awesome (2019); Sales Pitch (2023). Applied with attribution.*
