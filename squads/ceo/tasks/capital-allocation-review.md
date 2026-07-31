---
task: Capital Allocation Review
owner: "@capital-allocator"
owner_type: agent
atomic_layer: task
Input: |
  - cash_position: Cash on hand, expected free cash flow over the horizon, obligations, minimum operating buffer (required)
  - guiding_policy: The current diagnosis and guiding policy from @strategy-lead (required)
  - proposals: Candidate uses of cash already on the table, each with its requested amount (optional)
  - hurdle_rate: An existing hurdle rate with its derivation, if one is already published (optional)
  - horizon: The comparison period applied to every door (optional, default: five years)
Output: |
  - position_statement: The cash position with every figure carrying its source and date
  - hurdle: The rate, its derivation, its horizon and the anti-drift rule
  - five_doors: One row per use of cash including doors with no candidate
  - ranked_recommendation: The ranked options with confidence stated separately from the estimate
  - opportunity_cost: The best foregone alternative for the leading option, quantified in the same units
  - downside_case: The failure mechanisms for the funded decision and what the company still owes
  - adviser_flags: Items requiring qualified human tax, legal or regulatory review
  - capital_plan_path: Path of the captured capital plan
Checklist:
  - "[ ] Position established with every figure carrying a source and a date"
  - "[ ] Criterion confirmed: the diagnosis and guiding policy this allocation serves"
  - "[ ] One hurdle rate set, published, with its derivation and horizon"
  - "[ ] Anti-drift rule recorded: the hurdle does not move inside a live evaluation"
  - "[ ] All five doors opened, including those nobody proposed"
  - "[ ] Comparison made after tax, over a common horizon, in per-share terms"
  - "[ ] Denominator effect shown separately from the numerator effect"
  - "[ ] Downside case modelled before the base case"
  - "[ ] Opportunity cost stated and quantified for the leading option"
  - "[ ] Sunk cost excluded from the recommendation"
  - "[ ] Peer or consensus arguments recorded separately from the return case"
  - "[ ] Do nothing present as an option with a hurdle and a review date"
  - "[ ] Confidence stated separately from every estimate"
  - "[ ] Tax, legal and regulatory items flagged for qualified humans, not opined on"
---

# Capital Allocation Review

Materializes `@capital-allocator *allocate`. Runs the full allocation review: the position, one
hurdle, all five uses of cash compared against one another, the opportunity cost of the leading
option, and a ranked recommendation with confidence stated separately.

## Purpose

Most capital destruction observed in practice does not come from funding bad projects. It comes
from funding acceptable ones without ever opening the other doors. This task refuses to evaluate
a proposal on its own merits: a use of cash that is good in isolation and second-best against the
alternatives is not approved — it is second place.

## Attribution

The framework applied here is the one William N. Thorndike Jr. documents in *The Outsiders: Eight
Unconventional CEOs and Their Radically Rational Blueprint for Success* (2012): capital
deployment as a distinct executive job; five uses of cash and three sources; comparison of the
destinations against one another rather than approval one at a time; value per share rather than
size or reported earnings as the measure; and acting patiently, then decisively.

The executing agent applies this documented framework. It is not William Thorndike and is not any
executive profiled in the book. It gives no tax, legal, securities or accounting advice.

## Pre-conditions

- A current diagnosis and guiding policy exist from `@strategy-lead`. If none exists, halt and
  route there: allocation without a strategy has no criterion beyond arithmetic.
- The cash position is available from the system of record. Figures that cannot be sourced are
  marked UNVERIFIED and the review proceeds around them, never through invented values.
- Nothing in this task substitutes for qualified human tax, legal or regulatory advice.

## Procedure

### 1. Establish the position

Cash on hand, expected free cash flow over the horizon, existing obligations, minimum operating
buffer. Every figure carries its source and date. Reconcile reported earnings to free cash flow
line by line — non-cash charges, working-capital movement, capital expenditure, capitalised cost
— and explain every material divergence before either figure enters a decision. A case that works
on earnings and fails on cash is a case about accounting.

### 2. Confirm the criterion

Read the current diagnosis and guiding policy. Record which action the allocation is meant to
serve. If the strategy has been revised since the last plan, say so — a budget that outlived its
strategy is orphan spend and is itself a finding.

### 3. Set or confirm the hurdle

1. State the rate and its derivation. Acceptable derivations: the return available from the best
   passive alternative use of the same cash; the company's own cost of capital with the inputs
   shown; or an explicitly chosen threshold with the reasoning recorded.
2. State the horizon it applies over. A rate without a horizon is not comparable.
3. State the risk adjustment rule: how much higher the bar sits for irreversible or
   poorly-evidenced proposals, and by what logic.
4. Record the anti-drift rule: the hurdle may be revised on a schedule or on a stated change in
   conditions, never inside a live proposal evaluation. If it moves during an evaluation, the
   evaluation is void.
5. Publish it. A hurdle known only to the person applying it disciplines nobody else.

### 4. Open all five doors

Produce one row per door — never fewer than five. An omitted door is an unexamined alternative.
A door with no candidate is recorded as "no candidate", not left out.

| Door | What is tested |
|---|---|
| Reinvest | Incremental return on the incremental capital; the constraint relieved; the saturation point; what it displaces |
| Acquire | Price against a defensible value estimate; return at the purchase price after tax; cost synergies separated from revenue synergies; integration cost including management attention; downside case |
| Dividend | After-tax return to holders; the commitment created; the flexibility removed |
| Pay down debt | After-tax interest saved; the option value of restored capacity |
| Repurchase | The intrinsic-value estimate it depends on; the implied return at the current price; whether it reduces share count or merely offsets issuance |

For reinvestment, use incremental rather than average returns — average returns hide a saturated
core — and cross-check against any chain-link analysis from `@strategy-lead`: spending on a
non-limiting link produces no system gain. Use
`.aexos-core/development/tasks/calculate-roi.md` when a structured ROI computation is wanted, and
carry assumptions through as assumptions.

### 5. Model the downside first

Run this before the base case, deliberately, so the base case does not anchor the estimate.
List the failure mechanisms, not a percentage. For each, state what the evidence says about its
likelihood, or say there is no evidence. State what the company still owes when it fails — cash,
contract, headcount, reputation — whether the failure is recoverable and over what period, and
which early indicator would show it materialising and who watches it.

### 6. Compare

After tax, over the same horizon, in per-share terms. Show the numerator effect (change in free
cash flow) and the denominator effect (change in shares outstanding, including equity
compensation issuance, convertibles, and any equity issued to fund the proposal) separately, so a
numerator gain masking a denominator loss is visible. Name the growth trap where it applies: a
proposal that raises total revenue while lowering per-share value is expansion, not progress.

### 7. State the opportunity cost

Identify the best alternative use of the same cash among the five doors, quantify it over the
same horizon in the same units, and state the difference. That difference — not the price — is
the cost of the proposal. If the difference falls inside the uncertainty of the estimates, say
so: the honest output is "indistinguishable on the evidence", and the choice then turns on
reversibility rather than on return.

### 8. Rank, with guards applied

State confidence (HIGH / MEDIUM / LOW with the reason) separately from each estimate. Apply:

- **Sunk cost guard** — diligence or effort already spent is not an input.
- **Peer guard** — record any "everyone is consolidating" argument separately. It is not a return
  case and must not substitute for one.
- **Do nothing** — if no door clears the hurdle, that is the recommendation, with the hurdle and
  a review date recorded so it reads as patience rather than paralysis.

### 9. Flag for qualified humans

Tax treatment, securities and disclosure consequences, competition law, employment consequences,
covenants and regulatory filings are flagged for named human advisers. This task identifies the
flag and does not opine on it.

### 10. Capture

Sections: POSITION, CRITERION, HURDLE, THE FIVE DOORS, DECISION, OPPORTUNITY COST ACCEPTED,
DOWNSIDE CASE, CONFIDENCE, UNVERIFIED, ADVISER FLAGS, OWNER, REVIEW DATE.

Use `.aexos-core/development/tasks/create-doc.md` as the generation driver and apply
`.aexos-core/development/checklists/self-critique-checklist.md` before release. Default output
path: `docs/executive/capital-plan.md` (create the directory if it does not exist).

## Acceptance criteria

- Five rows exist, including any door with no candidate.
- One hurdle was applied to all of them and did not move during the evaluation.
- Every comparison is after tax, over a common horizon, and expressed per share with the
  denominator effect visible.
- The downside case was produced before the base case.
- The opportunity cost of the leading option is quantified, not described.
- No sunk cost and no peer argument is doing work in the recommendation.
- Management attention is priced as a cost wherever an acquisition or integration is involved.
- Every figure has a source and a date, or is marked UNVERIFIED.
- Nothing requiring qualified human advice was opined on.

## Handoff

| Destination | What it receives |
|---|---|
| `@strategy-lead` | A divergence between what the plan funds and what the guiding policy names. The budget is what the company is actually doing; the divergence is returned, not smoothed. |
| `@org-designer` | The headcount and capacity consequences of the funded decision, for decision rights and cadence design. |
| `@stakeholder-lead` | Any distribution, repurchase, raise or reversal that becomes a promise or requires an account to the board and investors. |
| `@ceo-chief` | Conflicts with another specialist's recommendation, for arbitration; and the allocation as an input to the executive decision record. |
| `@pm` | The funded actions, once decided and evidenced, for epic framing. Story drafting is `@sm` exclusively; implementation `@dev`; quality gates `@qa`; push and release `@devops` exclusively. |
| Qualified human advisers | Every item on the adviser-flags list, before the plan is acted on. |
