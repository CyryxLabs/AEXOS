---
task: Run Positioning Process
responsavel: "@positioning-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - product: The product or capability being positioned (required)
  - best_fit_customers: Accounts that already love the product, with why they were selected (required)
  - win_loss_records: Win, loss and no-decision records available, with dates (required)
  - positioning_team: Named participants from product, marketing, sales and customer success (required)
  - current_position: The position in market today, however informal (optional, default: elicit)
  - education_budget: Budget available for market education, which gates category creation (optional)
  - output_dir: Directory for positioning artifacts (optional, default: docs/product/positioning/)
Saida: |
  - positioning_document: Captured position with all five components sourced, per-function actions and a review date
  - alternatives_table: True competitive alternatives ranked by frequency in real deals, including do-nothing
  - attribute_table: Unique attributes with the alternatives that lack each, and the table stakes struck out
  - value_themes: Value themes traced to attributes, each with a proof point
  - category_decision: Chosen market category and style, with cost and proof burden per option considered
  - baggage_record: The positioning baggage named and its disposition
  - testable_claim: At least one positioning claim expressed as a falsifiable hypothesis
Checklist:
  - "[ ] Assemble the cross-functional positioning team"
  - "[ ] Analyse the customers who already love the product"
  - "[ ] Align vocabulary and name the positioning baggage explicitly"
  - "[ ] List true competitive alternatives from win/loss, including do-nothing"
  - "[ ] Isolate unique attributes and strike the table stakes"
  - "[ ] Map attributes to value themes and attach proof to each theme"
  - "[ ] Determine the characteristics that predict who cares a lot"
  - "[ ] Choose the market category and state its style, cost and proof burden"
  - "[ ] Decide the trend layer, defaulting to omission"
  - "[ ] Capture the positioning with per-function actions and a review date"
  - "[ ] Express at least one claim as a falsifiable hypothesis"
---

# *ten-step — Run the Full Positioning Process

Materializes `@positioning-lead *ten-step`, and produces the artifacts behind
`*positioning-canvas` and `*positioning-statement` as its outputs.

## Purpose

Set the context in which the product's strengths are obvious. Positioning is context setting: the
same product reads as brilliant or pointless depending on what the customer compares it to. This
task fills all five components from evidence, chooses the market frame deliberately, and captures
the result so four functions can execute the same position.

This task does not write campaign copy, name the product, design the pricing page, or set prices.
Positioning is the input to all of those.

## Preconditions

1. `best_fit_customers` is non-empty. Positioning derived from aspiration instead of from happy
   customers is fiction — the customers who already love the product are the empirical evidence
   of where it actually wins.
2. `win_loss_records` includes no-decision outcomes. A competitor grid is not an alternatives
   list; no-decision is usually the largest single alternative and it only appears here.
3. `positioning_team` names participants from all four functions. Sales holds the alternatives
   and the lost-deal reasons, success holds the churn pattern, product holds the attribute truth,
   marketing holds the category signal. A position built by one function is a position only that
   function will execute.

## Procedure

### Step 1 — Understand the customers who love the product

For each best-fit customer, record what they use it for, what they replaced, and what they say in
renewal notes or interviews. Find the pattern that makes them best-fit. Output: the best-fit
customer list plus the shared characteristic.

### Step 2 — Form the cross-functional team

Confirm the named participants and their commitment to the sessions. Record who is missing; a
missing function is a known gap in the evidence, not a scheduling detail.

### Step 3 — Align vocabulary and name the baggage

Agree shared definitions for the terms in dispute. Then run the baggage check explicitly:

| Baggage | Present? | Disposition |
|---|---|---|
| The founding story | | keep / set down |
| The original market category | | keep / set down |
| Legacy naming | | keep / set down |
| The investor narrative | | keep / set down |

The founding story describes where the product came from; positioning describes where it wins
now. Name the baggage so the team can set it down deliberately instead of defending it
unconsciously in every review.

### Step 4 — List true competitive alternatives

An alternative is what the customer would do if the product did not exist. Build the list from
win/loss records and best-fit interviews, never from a competitor grid.

| Alternative | Frequency in deals | Type | Why customers pick it | Evidence source |
|---|---|---|---|---|

Include, at minimum, each of these categories or record why it does not apply: do nothing / defer,
manual process (spreadsheet, email, shared drive), internal build, an adjacent tool used
off-label, a service provider or agency, and direct competitors.

Rank by frequency in real deals. If the most-cited direct competitor appears in a small fraction
of deals while a spreadsheet appears in half, the go-to-market is aimed at the wrong frame.

### Step 5 — Isolate unique attributes

| Attribute | Alternatives that lack it | How that was verified | Verdict |
|---|---|---|---|

Apply the qualification rule:

- All alternatives have it → table stakes. It belongs in the category definition, not in the
  differentiation. Strike it through rather than deleting it, so the decision stays visible.
- Some alternatives have it → weak differentiator. It survives only if it carries a value theme.
- No alternative has it, and it can be proven → unique attribute. Keep.
- No alternative has it and nobody cares → trivia. Drop.

### Step 6 — Map attributes to value themes with proof

Attributes are not value. Map each unique attribute to the outcome it enables, group the outcomes
into themes, and attach proof to each theme.

| Unique attribute | Value it enables | Value theme | Proof |
|---|---|---|---|

Proof types: a usage metric, a customer-stated outcome in an interview or renewal note, a
third-party validation or audit result, or a benchmark against the named alternative. Value
without proof is a claim. Two themes with proof beats six themes with adjectives.

### Step 7 — Determine who cares a lot

Describe the segment by the characteristics that predict caring, not by firmographics.

| Characteristic | Predicts fast close and low churn? | Identifiable before first contact? | Verdict |
|---|---|---|---|

A characteristic that merely describes current customers is correlation, not a driver — mark it
for testing. A characteristic sales cannot detect before the first call is unusable in practice,
however true it is.

If the resulting segment is too small to sustain the business at current pricing, that is a
finding for `@pricing-strategist` and `@product-strategist`, not a reason to widen the claim.

### Step 8 — Choose the market frame of reference

| Style | Candidate category | Assumptions it triggers | Cost | Proof burden | Risk |
|---|---|---|---|---|---|
| Head to Head | | | Low education, high competition | Match or beat incumbents on the category's own criteria | Compared on criteria you did not choose |
| Big Fish Small Pond | | | Moderate | Prove dominance inside the subsegment | Perceived ceiling on market size |
| Create a New Game | | | Highest — you fund market education | Prove the problem exists before the solution works | Buyers who cannot categorize you default to the nearest familiar frame |

Apply the category test: **are the assumptions the category triggers mostly correct and mostly
favourable?** If they must be corrected during the sales cycle, it is the wrong category.

Category creation is the most expensive of the three and is chosen far more often than it is
justified. Choose it only when no existing frame carries the strengths without misleading the
buyer, and only when `education_budget` can fund the education. When undecided, Big Fish Small
Pond is the cheapest defensible position and the pond can be widened later from a position of
proof.

### Step 9 — Trend layer (default: omit)

A trend helps only when it is genuinely connected to a value theme. State the connection or omit
the trend. A bolted-on trend signals tourism, dilutes the frame, and dates the positioning.
Record the decision either way.

### Step 10 — Capture it

Create `output_dir` if absent. Write `positioning-{product-slug}-v{n}.md`:

```markdown
# Positioning — {product} (v{n})

**Owner:** @positioning-lead   **Date:** {YYYY-MM-DD}   **Review date:** +90 days

## Position
For {segment characteristics} who {circumstance}, {product} is {category} that {value theme} —
unlike {top alternatives}, where {contrast}.

## The five components
1. Competitive alternatives — {table}
2. Unique attributes — {table}
3. Value and proof — {table}
4. Target market characteristics — {table}
5. Market category and style — {decision, cost, proof burden}
(6) Trend — {connected trend, or "omitted"}

## Baggage set down
{list and disposition}

## What each function does differently
- Sales: {action}
- Marketing: {action}
- Product: {action}
- Customer success: {action}

## Open hypothesis for @experimentation-lead
{falsifiable claim, the population it applies to, and the direction expected}
```

Positioning that lives in one person's head is not positioning. Within a quarter of an uncaptured
workshop, each function is executing a different position.

## Acceptance Criteria

- All five components are filled with sourced evidence; nothing is stated as an adjective alone.
- The alternatives list includes do-nothing and non-vendor alternatives, ranked by deal frequency
  and traced to win/loss records.
- Every unique attribute names the alternatives that lack it and how that was verified.
- Table stakes are struck out visibly rather than silently dropped.
- Every value theme has at least one proof point traceable to data or a customer record.
- The segment is described by characteristics that predict caring and are identifiable before
  first contact.
- The category style is chosen explicitly, with cost and proof burden documented for each option
  considered.
- The trend layer is either absent or explicitly connected to a value theme.
- The positioning is captured in one document with per-function actions and a review date.
- Positioning baggage is named with its disposition recorded.
- At least one claim is expressed as a falsifiable hypothesis for `@experimentation-lead`.
- No campaign copy, product name, price or package was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@pricing-strategist` | The best-fit segment and value themes are settled, and packaging, willingness to pay and value-based segmentation are next |
| `@product-strategist` | The chosen position implies roadmap or portfolio changes — narrowing the segment reprioritizes the backlog |
| `@discovery-lead` | Competitive alternatives or segment characteristics lack evidence and need structured customer research |
| `@jobs-analyst` | Value themes must be grounded in the job the customer hires the product to do |
| `@experimentation-lead` | A frame-of-reference claim should be tested as a controlled experiment rather than argued |
| `@products-chief` | The position conflicts with squad-level direction and needs arbitration |
| `@pm` | The position is captured and an evidenced problem now needs epic framing |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- April Dunford, *Obviously Awesome: How to Nail Product Positioning so Customers Get It, Buy It,
  Love It* (2019) — positioning as context setting, the five components, the ten-step process,
  the three market category styles, positioning baggage.
- April Dunford, *Sales Pitch: How to Craft a Story to Stand Out and Win* (2023) — the sales
  narrative structure built on top of the position.

`@positioning-lead` (Datum) is a specialist applying this framework.

## Related

- Agent: `squads/products/agents/positioning-lead.md`
- Structured elicitation for the workshop sessions: `.aexos-core/development/tasks/advanced-elicitation.md`
- Best-fit customer interviews: `.aexos-core/development/tasks/ux-user-research.md`
- Competitive alternative research: `.aexos-core/development/tasks/create-deep-research-prompt.md`
- Competitive input structure: `.aexos-core/product/templates/competitor-analysis-tmpl.yaml`
- Applied to the draft before capture: `.aexos-core/development/checklists/self-critique-checklist.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
