---
task: Define Editorial Beats
owner: "@content-lead"
owner_type: agent
atomic_layer: task
Input: |
  - category_entry_points: The buying situations the brand must be retrievable in, from @brand-lead (required — the input to beat selection)
  - position_artifact: The position and competitive frame from @products:positioning-lead (required — beats must not teach a retired frame)
  - capacity: Commissions per period, at what depth, with which review and approval steps, by whom (required)
  - existing_estate: Inventory or sample of published content, if any (optional)
  - continuity_requirement: Where content substitutes for paid continuity, from @demand-lead phasing (optional)
  - candidate_beats: Territories already proposed internally (optional)
Output: |
  - beats: The territories the brand will cover continuously, each with its claim and the CEPs it serves
  - claim_per_beat: The brand's genuine claim to each territory — expertise, proprietary data, operating vantage point or customer access
  - declined_beats: Beats deliberately not taken, with reasons, so they are not re-proposed each quarter
  - commitment_horizon: How long each beat is committed to before it may be reconsidered
  - capacity_assumption: The capacity the beat count assumes, stated explicitly
  - coherence_flags: Beats that would contradict the current position, and beats not derived from any CEP
Checklist:
  - "[ ] Take the category entry points from @brand-lead; do not author them here"
  - "[ ] Take the position and competitive frame from @products:positioning-lead"
  - "[ ] Propose candidate beats with territory, claim, CEPs served and current credible coverage"
  - "[ ] Apply the defensibility test and decline weak-claim beats explicitly"
  - "[ ] Reject beats selected on search volume alone"
  - "[ ] Constrain the number of beats and state the capacity assumption behind it"
  - "[ ] Record the beats NOT taken, with reasons"
  - "[ ] State the commitment horizon per beat"
  - "[ ] Route content effectiveness claims to @analytics-lead as hypotheses, not assertions"
  - "[ ] Write the beat plan to the repository with an owner and a review date"
---

# *beat-plan

Materializes the `*beat-plan` command of `@content-lead` (Quill). Defines the editorial beats — the
territories the brand covers continuously and credibly — and, just as importantly, the territories it
deliberately declines.

## Purpose

Topic lists produce disconnected pieces. Beats accumulate authority, and each piece is worth more
because of the ones around it. Fewer beats covered continuously outperform many beats covered once,
because abandoning a beat costs more than never opening it: the abandoned archive still speaks for the
brand.

This task exists because beats are routinely chosen on search volume or internal interest, which
produces retrieval in situations nobody buys in.

## Method source and attribution

**Stated honestly: this role is not founded on a single canonical published work, and no such work is
claimed for it.** The squad manifest records its basis as a discipline, and that is accurate.

What is applied here is the accumulated craft practice of editorial operations — the beat, the
commissioning brief, the calendar, the style guide, the corrections policy and the archive —
transposed to a marketing context. This task will not manufacture a founding author, a book title, a
year or a quotation to give the role borrowed authority. An invented citation would be worse than
none, and it would make the whole squad's attribution unauditable.

What follows from that: the principles below are stated as an operating stance rather than as findings
from a named source, and they are open to challenge on their merits rather than on the strength of an
attribution. Where a claim about content effectiveness could be tested, route it to `@analytics-lead`
as a hypothesis instead of asserting it. Where a claim belongs to a squad member who does have a
published source — brand growth to `@brand-lead`, effectiveness and budget to `@demand-lead`,
positioning to `@products:positioning-lead` — defer to them rather than restating their work in
editorial vocabulary.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| Category entry points exist from `@brand-lead` | yes | Beats derived without them serve situations nobody buys in, and get rewritten |
| A position artifact exists at `@products:positioning-lead` | yes | Beats built on an assumed position teach a frame the product contradicts |
| Editorial capacity is stated, not assumed | yes | A beat count without a capacity assumption is a plan to abandon beats |
| `squads/marketing/agents/content-lead.md` is readable | yes | Contains the commissioning discipline and the archive obligations |

If the position does not exist, this task does not start. What may proceed meanwhile: the content
audit, the archive review and the pruning list. None of those depend on the position, and all of them
are usually overdue.

## Procedure

### Step 1 — Take the category entry points

Take the CEPs from `@brand-lead`. They state which buying situations the brand must be retrievable in
and are the input to beat selection. Do not author them here, and do not substitute a keyword list for
them.

Search volume tells you what is asked. It does not tell you what is worth owning.

### Step 2 — Take the position and competitive frame

Take the position from `@products:positioning-lead`. Beats must not contradict the position or teach a
frame that positioning has retired. Content describing a superseded position is actively teaching the
wrong frame while looking like a past success.

### Step 3 — Propose candidate beats

For each candidate record four things:

1. **The territory**, in one sentence.
2. **The brand's genuine claim to it** — expertise, proprietary data, an operating vantage point, or
   customer access. "We are interested in it" is not a claim.
3. **The category entry points it serves**, named from Step 1.
4. **Who covers it credibly today**, and what our coverage adds.

### Step 4 — Apply the defensibility test

A beat where our claim is weak produces content indistinguishable from everyone else's. Decline it
explicitly rather than diluting it.

The sharpest form of the test: could a competitor publish this identically? If yes, the beat claim is
weak.

### Step 5 — Constrain the number

Fewer beats covered continuously outperform many covered once. State the capacity assumption behind
the number chosen — how many commissions, of what depth, with what review and approval steps, by whom.

Weigh the maintenance load, not just the production load. Every evergreen piece published is a
recurring obligation, and beat plans are routinely built as though publication were the end of the
cost.

### Step 6 — Record the beats NOT taken

With reasons. This list is the point of the exercise as much as the accepted list: it prevents the
same rejected territory being re-proposed every quarter as a new idea, and it makes the declining
decision auditable.

### Step 7 — State the commitment horizon per beat

Abandoning a beat is more expensive than never opening it. State how long each beat is committed to
before it may be reconsidered, and what would trigger reconsideration.

### Step 8 — Flag coherence breaks

Two checks, reported explicitly:

- Any beat not derived from a category entry point in the current brand model — flag it, and say what
  it is serving instead.
- Any beat that would contradict the current position — flag it and escalate to `@marketing-chief`
  rather than resolving it in editorial terms.

If a beat chosen on search volume is nevertheless producing pipeline, that is evidence the brand
model's entry points may be incomplete rather than evidence the beat is wrong. Route that claim to
`@analytics-lead` for a provability verdict before closing or keeping the beat on it.

### Step 9 — Write it to the repository

Set an owner and a review date per beat, based on how fast that territory changes. A beat plan that
lives only in a chat thread did not happen (Constitution Article I — CLI First).

## Boundary

| Out of scope | Owner |
|--------------|-------|
| Which buying situations the brand must be retrievable in; which distinctive assets to express | `@brand-lead` |
| Budget, amplification sizing, the brand-versus-activation split, paid distribution cost | `@demand-lead` |
| Whether a content performance claim is provable; success definitions and their measurability | `@analytics-lead` |
| Market category, competitive alternatives, segment | `@products:positioning-lead` |
| Interface copy, microcopy, UX writing | `@ux-design-expert` |
| Epic framing, stories, implementation, quality gates, push | `@pm`, `@sm`, `@dev`, `@qa`, `@devops` |

## Acceptance criteria

- [ ] Every beat traces to at least one category entry point supplied by `@brand-lead`
- [ ] Every beat states the brand's genuine claim to the territory
- [ ] No beat was selected on search volume or internal interest alone
- [ ] Beats that would contradict the current position are flagged and escalated, not absorbed
- [ ] The declined-beats list exists, with a reason per entry
- [ ] The beat count states the capacity assumption behind it, including maintenance load
- [ ] A commitment horizon is stated per beat
- [ ] No founding author, work or year is claimed for this role's method
- [ ] Content effectiveness claims are routed to `@analytics-lead` as hypotheses, not asserted
- [ ] The plan is written to the repository with an owner and a review date

## Handoff

| To | Carrying |
|----|----------|
| `@brand-lead` | Beats that no category entry point supports, and CEPs no beat serves — the gaps run both ways |
| `@demand-lead` | Where content is proposed as a cheaper continuity mechanism than paid reach, stated as a trade-off to be sized |
| `@analytics-lead` | Success definitions per beat, for a verdict on which are measurable and which are proxies standing in for something nobody measures |
| `@marketing-chief` | When a beat contradicts the position, or when editorial and demand recommendations conflict |
| `@products:positioning-lead` | When the position a beat depends on is stale, absent or contested |

## Related

- **Agent:** `squads/marketing/agents/content-lead.md` (Quill)
- **Manifest:** `squads/marketing/squad.yaml`
- **Upstream:** `squads/marketing/tasks/brand-lead-brand-audit.md`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
