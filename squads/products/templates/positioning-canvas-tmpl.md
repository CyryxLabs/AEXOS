# Positioning Canvas — [PRODUCT_NAME]

**Template ID:** PRD-TMPL-POSITIONING-CANVAS
**Owner agent:** `@positioning-lead` (Datum)
**Produced by:** `*positioning-canvas`, or as the working artifact of `*ten-step`
**Feeds:** `templates/positioning-document-tmpl.md` (capture), `checklists/positioning-quality-checklist.md` (gate before capture)

> **Method attribution.** The five components, the ten-step process and the three market
> category styles applied in this canvas are published by April Dunford in *Obviously Awesome:
> How to Nail Product Positioning so Customers Get It, Buy It, Love It* (2019). The sales
> narrative built on top of a settled position is treated in *Sales Pitch* (2023).
> `@positioning-lead` applies that framework with attribution; it is not April Dunford and does
> not speak as her.

> **Scope boundary.** This canvas decides the frame of reference. It does not write campaign
> copy or taglines (downstream messaging), does not write interface copy (`@ux-design-expert`),
> does not set price or packaging (`@pricing-strategist`), does not implement (`@dev`), does not
> create stories (`@sm`) or epics/PRDs (`@pm`), and does not push anything (`@devops`).

> **Constitution Article IV — No Invention.** Every alternative, attribute, value claim and
> segment characteristic on this canvas must carry an evidence source: a customer interview, a
> win/loss or no-decision record, a usage datum, or a cited document. Anything without one is
> written into the row and tagged `UNVERIFIED`. `UNVERIFIED` rows may stay on the canvas as work
> in progress; they **must not** cross into the positioning document. See the Evidence Ledger at
> the end of this file.

---

## Header

| Field | Value | How to fill it | Bad answer looks like |
|---|---|---|---|
| Product | [PRODUCT_NAME] | The thing being positioned, at the granularity the buyer buys. | The whole company when only one module is under discussion. |
| Canvas version | v[N] | Increment per revision; never overwrite a prior version. | Reusing v1 after a material change, so no one can see what moved. |
| Date | [YYYY-MM-DD] | Date this version was agreed. | Blank — an undated canvas cannot be reviewed. |
| Positioning team | Product: [NAME] · Marketing: [NAME] · Sales: [NAME] · Success: [NAME] | Name a person per function. A missing function is a named evidence gap, not a scheduling detail. | "Marketing" with no name, or one function filling in all four. |
| Evidence window | [DATE_RANGE] | The period the win/loss and interview evidence covers. | Evidence older than the last major product or market change. |
| Best-fit customer set | [N] accounts: [LIST] | Accounts that already love the product, with why each was selected. | An aspirational logo list. Positioning derived from aspiration instead of from happy customers is fiction. |
| Baggage carried in | [FOUNDING STORY / ORIGINAL CATEGORY / LEGACY NAME / INVESTOR NARRATIVE] | Name what the team is defending before it distorts the components. | "None" declared without asking. Baggage is usually invisible to the people carrying it. |

**Failure mode for this section:** filling in the components before naming the team and the
baggage. The founding story then quietly wins every disputed row and nobody can see where it did.

---

## Component 1 — Competitive Alternatives

**Definition.** What the customer would do if this product did not exist. Not the funded-competitor
list. Alternatives come first because everything below is measured against them.

**How to fill it.** Build from win/loss records, no-decision reasons, and best-fit interviews.
For each row ask the four identification questions: what did they use before us; what did lost
deals go to, including no-decision; what would they build or do manually; which budget line funds
the purchase, and who is the incumbent on that line.

| # | Alternative | Type | Frequency in real deals | Why customers pick it (their words) | Evidence source | Status |
|---|---|---|---|---|---|---|
| 1 | [ALTERNATIVE] | do-nothing / manual / internal build / adjacent tool off-label / service provider / direct competitor | [N of M deals, or %] | "[VERBATIM QUOTE]" | [Win/loss record ID, interview ID, CRM field, date] | VERIFIED / UNVERIFIED |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

**Mandatory coverage.** Each type below is either present in the table or has a recorded reason
for absence. Leaving a type silently missing is the single most common way this component fails.

| Type | Present? | If absent, why | Evidence checked |
|---|---|---|---|
| Do nothing / defer | [ ] | [REASON] | [SOURCE] |
| Manual process (spreadsheet, email, shared drive) | [ ] | | |
| Internal build | [ ] | | |
| Adjacent tool used off-label | [ ] | | |
| Service provider or agency | [ ] | | |
| Direct competitor | [ ] | | |

**Ranking read.** State in one sentence what the ranking implies about where the go-to-market is
currently aimed:

> [e.g. "The direct competitor the sales deck is built against sits fourth by frequency; the
> spreadsheet sits first. The comparison the buyer is actually making is not the one we answer."]

**How to fill the frequency column.** Count occurrences in the evidence window and show the
denominator (`8 of 34`), not an impression. If the denominator is small, say so — a small
denominator is a finding, not a defect to hide.

**Failure mode:** listing only funded competitors and missing the alternatives that actually win
most deals. Second failure mode: ranking by how threatening an alternative feels internally rather
than by how often it appears in real deals. If "we have no competitors" was said in the room, the
frame of reference is being set by something else, and probably badly — do-nothing is the most
common competitor and the hardest to beat, because it has no procurement cycle.

---

## Component 2 — Unique Attributes

**Definition.** Features and capabilities the alternatives listed in Component 1 do not have.
An attribute is unique only relative to that list. Change the list, and this section changes.

**How to fill it.** One row per candidate attribute. Name which alternatives lack it — by name,
from the Component 1 table, not "the competition" — and state how absence was verified.

| # | Attribute | Alternatives that lack it (by name) | How absence was verified | Qualification verdict | Evidence source | Status |
|---|---|---|---|---|---|---|
| A1 | [ATTRIBUTE, in customer vocabulary] | [ALT 1, ALT 3] | [Public docs dated X / evaluated in bake-off Y / customer stated in interview Z] | unique / weak differentiator / trivia | [ID] | VERIFIED / UNVERIFIED |
| A2 | | | | | | |
| A3 | | | | | | |

**Qualification rule (apply to every row).**

| Situation | Verdict | What to do |
|---|---|---|
| All alternatives have it | Table stakes | Move to the struck-through section below; it belongs in the category definition, not the differentiation |
| Some alternatives have it | Weak differentiator | Survives only if it carries a value theme in Component 3; otherwise drop |
| No alternative has it, and it can be proven | Unique attribute | Keep |
| No alternative has it and nobody cares | Trivia | Drop, and record that it was dropped |

**How absence was verified — acceptable forms.** A dated public capability page or documentation;
a head-to-head evaluation the customer ran and described; a customer statement that they could not
do it with the alternative; an analyst or audit document. Unacceptable: "everyone knows", a sales
rep's impression, or a competitor comparison page written by us.

### Table stakes — struck out, kept visible

Strike these through rather than deleting them, so the decision stays auditable and does not get
relitigated every quarter.

| Attribute | Present in | Why it is table stakes | Where it goes instead |
|---|---|---|---|
| ~~[ATTRIBUTE]~~ | All listed alternatives | [ONE LINE] | Category definition (Component 5) |
| ~~[ATTRIBUTE]~~ | | | |

**Failure mode:** treating a well-executed table-stakes feature as a differentiator. The buyer
hears nothing distinguishing and falls back to price. Being *better at* a table-stakes feature is
not uniqueness — it is a claim that needs proof in Component 3 and usually loses to the buyer's
assumption that everyone says that. Second failure mode: writing attributes in internal vocabulary
the customer does not use.

---

## Component 3 — Value and Proof

**Definition.** The outcome each unique attribute enables for the customer, grouped into themes,
each theme carrying at least one proof point. Attributes are not value.

**How to fill it.** Trace every row back to an attribute ID from Component 2. A value theme with
no attribute behind it is an adjective. A value theme with no proof is a claim.

| Unique attribute (ID) | Outcome it enables | Value theme | Proof point | Proof type | Evidence source | Status |
|---|---|---|---|---|---|---|
| A1 | [WHAT CHANGES FOR THE CUSTOMER] | [THEME NAME] | [THE SPECIFIC PROOF] | usage metric / customer-stated outcome / third-party or audit result / benchmark vs a named alternative | [ID] | VERIFIED / UNVERIFIED |
| A2 | | | | | | |

### Value themes, consolidated

| # | Value theme | Attributes behind it | Proof | Which alternative it beats, and on what |
|---|---|---|---|---|
| V1 | [THEME] | A1, A3 | [PROOF] | [ALTERNATIVE] on [DIMENSION] |
| V2 | | | | |

**Target: two to three themes.** Two themes with proof beats six themes with adjectives. If you
have more than three, they are either duplicates or you have not decided.

**How to write a proof point.** Name the measure, the population, and the source
(`median time-to-first-report across 31 accounts, Q2 usage export`). A proof point that cannot be
checked by someone outside the room is not proof.

**Failure mode:** value themes stated as adjectives — "powerful", "seamless", "enterprise-grade" —
with nothing attached. Second failure mode: proof that measures our activity rather than the
customer's outcome. Third: a theme whose proof exists but whose attribute traceability is missing,
so nobody can tell whether the theme survives if the attribute is matched by an alternative.

---

## Component 4 — Best-Fit Segment Characteristics

**Definition.** The characteristics of customers who care a lot about the value themes above.
The segment is defined by who cares, not by firmographics.

**How to fill it.** Derive characteristics from the best-fit customers named in the header — the
ones who already love the product — then test each against the three qualification questions.

| # | Characteristic | Why it predicts caring | Predicts fast close / low churn? | Identifiable before first contact? | How sales spots it pre-contact | Evidence source | Verdict |
|---|---|---|---|---|---|---|---|
| S1 | [CHARACTERISTIC, e.g. "is audited by an external party at a fixed cadence"] | [CAUSAL STORY] | yes / no / untested | yes / no | [PUBLIC SIGNAL, JOB POSTING, FILING, TECH FOOTPRINT] | [ID] | keep / test / drop |
| S2 | | | | | | | |
| S3 | | | | | | | |

**Qualification tests.**

| Test | If yes | If no |
|---|---|---|
| Does this characteristic predict who buys fast and stays? | Keep | Likely correlation — mark for testing, do not build the position on it |
| Is it merely descriptive of current customers? | Correlation, not a driver — test it | Good, it has a causal story |
| Is the segment large enough to sustain the business at current pricing? | Proceed | Finding for `@pricing-strategist` and `@product-strategist` — not a reason to widen the claim |
| Can sales identify a prospect in this segment before the first call? | Usable | Unusable in practice however true it is — find an observable proxy or drop it |

**Segment statement (one sentence, customer vocabulary):**

> [SEGMENT] — companies that [CHARACTERISTIC S1] and [CHARACTERISTIC S2], typically at the moment
> when [TRIGGERING CIRCUMSTANCE].

**Failure mode:** substituting firmographics — industry code, headcount band, region — for the
characteristics that actually drive caring. Firmographics may be the *proxy* used to find the
segment, but they are not the definition, and the canvas must show which is which. Second failure
mode: an aspirational segment drawn from the market you want rather than from customers who
already love the product; nobody can execute against it.

---

## Component 5 — Market Category and Style

**Definition.** The market frame of reference that makes the value obvious. The category is a
shortcut into the customer's head: it triggers a set of assumptions before you say anything.

**How to fill it.** Fill all three rows even for the styles you reject. The rejected rows are the
record of why the choice was made, and they are what a future reader needs when the decision is
revisited. Reference: `data/market-category-styles.yaml`.

| Style | Candidate category name | Assumptions it triggers | Assumptions correct? | Assumptions favourable? | Cost | Proof burden | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|
| Head to Head | [CATEGORY] | [WHAT THE BUYER ASSUMES ON HEARING IT] | mostly / partly / no | mostly / partly / no | Low education, high competition | Match or beat incumbents on the category's own criteria | Compared on criteria you did not choose | reject / choose |
| Big Fish Small Pond | [CATEGORY] | | | | Moderate — familiar frame, must be narrowed credibly | Prove dominance inside the subsegment | Perceived ceiling on market size | reject / choose |
| Create a New Game | [CATEGORY] | | | | Highest — you fund the market education | Prove the problem exists before the solution works | Buyers who cannot categorize you default to the nearest familiar frame anyway | reject / choose |

**Category test.** Are the assumptions the category triggers mostly correct and mostly favourable?
If they must be corrected during the sales cycle, it is the wrong category.

**Decision:** [CHOSEN STYLE] — [CHOSEN CATEGORY NAME]

**Rationale (three sentences maximum, naming what each rejected option costs):**

> [WHY THIS FRAME PLACES THE VALUE THEMES WHERE THEY DECIDE THE OUTCOME]

**Education budget available:** [AMOUNT / NONE] — this gates Create a New Game. Category creation
requires teaching the market that the problem exists before the solution can be sold, and that
education is funded by you alone.

**Reversibility:** [HOW EXPENSIVE IS IT TO CHANGE THIS LATER]

**Default when undecided:** Big Fish Small Pond. It is the cheapest defensible position and the
pond can be widened later from a position of proof.

**Failure mode:** choosing a category whose assumptions you then spend the whole sales cycle
undoing. Second failure mode: proposing a category without stating its style, cost and proof
burden — which makes it an aesthetic preference rather than a decision. Third: choosing Create a
New Game with no budget line for market education.

---

## Component 6 (optional) — Relevant Trend

**Default: OMITTED.** Fill this section only to record a decision, and expect that decision to be
omission. A trend helps only when it is genuinely connected to a value theme.

| Field | Value |
|---|---|
| Decision | **OMITTED** / included |
| Trend | [TREND] |
| Which value theme it amplifies | [V1 / V2] |
| The connection, stated explicitly | [WHY THIS TREND MAKES THIS SPECIFIC VALUE MORE URGENT FOR THIS SPECIFIC SEGMENT] |
| What happens to the position when the trend passes | [ANSWER] |
| Evidence that the segment already talks about this trend | [SOURCE — buyer's words, not the trade press] |

**How to fill it.** If the connection sentence needs the word "and" to join the trend to the value,
there is no connection — there are two claims sitting next to each other.

**Failure mode:** trend tourism. A bolted-on trend signals that you are a visitor to the buyer's
problem, dilutes the frame, and dates the positioning to the quarter it was written.

---

## Assembled Position (draft — not yet captured)

> For **[SEGMENT CHARACTERISTICS from Component 4]** who **[CIRCUMSTANCE]**, **[PRODUCT]** is
> **[CATEGORY from Component 5]** that **[VALUE THEME from Component 3]** — unlike
> **[TOP ALTERNATIVES from Component 1]**, where **[CONTRAST]**.

**Self-check before this leaves the canvas:**

- [ ] Every bracket above is filled from a numbered row of this canvas, not from a fresh idea
- [ ] The sentence contains no adjective that is not backed by a proof point in Component 3
- [ ] The vocabulary is the customer's, taken from quoted evidence, not internal shorthand
- [ ] A competitor could not paste their own name into this sentence and have it still be true
- [ ] Nothing in the sentence is a tagline; this is a frame of reference, not copy

---

## Evidence Ledger (Constitution Article IV gate)

Every row in every component above resolves to an entry here. This is the gate: a component row
whose ledger entry is `UNVERIFIED` blocks that row from entering the positioning document.

| Ref | Component / row | Claim | Evidence type | Source identifier | Date | Status |
|---|---|---|---|---|---|---|
| E1 | C1 / row 1 | [CLAIM] | interview / win-loss record / usage datum / cited document | [ID OR PATH] | [YYYY-MM-DD] | VERIFIED |
| E2 | | | | | | UNVERIFIED — [WHAT WOULD VERIFY IT, AND WHO OWNS GETTING IT] |

**Unverified register.**

| Ref | Claim | What evidence would settle it | Owner | Due |
|---|---|---|---|---|
| | | | | |

**Rule.** `UNVERIFIED` rows stay visible on the canvas and are excluded from the positioning
document. They are not deleted — deleting them loses the record that the question was asked. If a
whole component depends on unverified rows, the canvas is not ready and the gap goes to
`@discovery-lead` as a research request.

---

## Canvas Status

| Gate | State |
|---|---|
| All five components filled with at least one VERIFIED row | [ ] |
| Table stakes struck out visibly rather than silently dropped | [ ] |
| Trend decision recorded (omission counts) | [ ] |
| `checklists/positioning-quality-checklist.md` (PRD-CL-005) run | [ ] — score: [ ] verdict: [ ] |
| Cleared for capture into `positioning-document-tmpl.md` | [ ] |

**Next:** run PRD-CL-005, then capture. Positioning that lives in one person's head is not
positioning — within a quarter of an uncaptured workshop, each function is executing a different
position.

---

## Worked Example (illustrative only)

> **All numbers below are invented placeholders showing the shape of a filled row. They are not
> findings, not benchmarks, and not drawn from any published source.**

| Alternative | Type | Frequency in real deals | Why customers pick it | Evidence source |
|---|---|---|---|---|
| Spreadsheet + shared drive | manual process | 16 of 34 deals *(illustrative)* | "It is free and nobody has to approve it" | WL-2026-004..019 |
| Do nothing / defer | do-nothing | 7 of 34 *(illustrative)* | "Painful, not yet urgent" | CRM no-decision reasons |
| Named competitor | direct competitor | 2 of 34 *(illustrative)* | Parity on the primary workflow | WL-2026-021, WL-2026-030 |

Read: the deck is built against the row with the smallest count. That is the finding, and it is
what changes which attributes in Component 2 count as differentiators at all.

---

*AEXOS — products squad — `@positioning-lead` (Datum). Framework: April Dunford, Obviously
Awesome (2019); Sales Pitch (2023). Applied with attribution.*
