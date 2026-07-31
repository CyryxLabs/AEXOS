---
task: Build and Screen an Offer
owner: "@offer-lead"
owner_type: agent
atomic_layer: task
Input: |
  - price_artifact: The settled price and packaging from @products:pricing-strategist (required — consumed, never authored here)
  - position_artifact: The competitive frame and segment from @products:positioning-lead (required — consumed, never authored here)
  - buyer_problem: The problem in the buyer's own words, and evidence they have money and authority (required)
  - current_offer: The offer as it exists today, verbatim as the buyer sees it (optional; absent means greenfield construction)
  - delivery_facts: What is deliverable today, at volume, confirmed by whoever owns delivery (required)
  - time_to_first_outcome: Measured time from payment to the first outcome the buyer can feel (optional; drives the denominator diagnosis)
  - proof_inventory: Real, attributable evidence available today — clients, results, references (optional)
  - brand_artifact: Distinctive assets and category entry points from @marketing:brand-lead the offer must not contradict (optional)
Output: |
  - value_equation_reading: All four terms stated, each with its current state and evidence class
  - binding_term: One of DREAM OUTCOME, PERCEIVED LIKELIHOOD, TIME DELAY, EFFORT AND SACRIFICE — with the evidence that selects it
  - problem_solution_stack: Obstacles enumerated first, each with the offer element that removes it, plus obstacles with no solution
  - guarantee_design: Type, trigger, window, remedy, claim process, and the named human who agreed the exposure
  - ladder_position: The rung this offer occupies, with each rung's outcome stated as independently complete
  - integrity_verdict: CLEAR or BLOCKED, with every blocked element and its compliant alternative verbatim
  - measurement_spec: What must be instrumented, segmented by source, handed to @analytics-lead
  - evidence_summary: Count of claims by class — PRACTITIONER HEURISTIC, EMPIRICAL, OUR DATA, UNVERIFIED
  - unverified_list: Every figure that did not trace to a source, and every unfilled publication slot
Checklist:
  - "[ ] Confirm the price artifact exists and is settled; never set, discount or work around the price"
  - "[ ] Confirm the position artifact exists; do not invent a category, an alternative or a segment"
  - "[ ] Confirm the buyer has the problem, the money and the authority — otherwise route, do not construct"
  - "[ ] State all four value-equation terms; work both denominator terms, not only the numerator"
  - "[ ] Name exactly one binding term with the evidence that selects it"
  - "[ ] Enumerate obstacles first, then attach solutions; disclose obstacles with no solution"
  - "[ ] Design the guarantee so it is genuinely claimable, and name the human who agreed the exposure"
  - "[ ] Run the blocking integrity screen; replace every blocked element with its compliant alternative"
  - "[ ] Tag every claim with its evidence class; never state a practitioner heuristic as an empirical finding"
  - "[ ] Leave every uncertain figure as a publication slot; never fill one from memory"
  - "[ ] Hand instrumentation to @analytics-lead, spend consequences to @demand-lead, product change to @pm"
  - "[ ] Write the offer to the repository with an owner and a review date"
---

# *offer-build

Materializes the `*offer-build` command of `@offer-lead` (Bounty). Constructs an offer on top of a
settled price, names the term that is actually binding, and screens the result before it can be
published.

## Purpose

Most offers that do not convert are diagnosed as traffic problems, then as copy problems, and the
term that was actually binding — usually the buyer's belief that it will work *for them*, or the
time and effort between payment and the first outcome — is never touched. This task forces the four
terms first, then the binding one, then the construction, then the integrity screen, in that order,
so the recommendation follows the diagnosis rather than the nearest available lever.

## Method source, and what kind of source it is

The construction method applied here is published by Alex Hormozi in *$100M Offers* (2021), with
lead-flow mechanics from *$100M Leads* (2023), named separately.

**These are practitioner manuals with a track record.** The method was distilled by an operator
from their own operating history and the businesses they held or advised. Its authority is that it
worked, repeatedly, for the person who wrote it, and is written down in enough structural detail to
be applied by someone else. That is real and it is useful: it supplies what an offer is made of, in
what order the parts assemble, and which part to fix first. No research programme currently
supplies that.

**It is a different kind of source from the rest of this squad.** `@brand-lead` runs on Byron Sharp
reporting Ehrenberg-Bass research; `@demand-lead` on Binet and Field analysing the IPA Databank;
`@analytics-lead` on Kaushik's measurement discipline. Those are **research programmes with
published data** — claims derived from many brands across many categories, with stated dispersion.
This task's source is a **practitioner manual with a track record** — no sampling frame, no control
condition, no dispersion, no independent replication.

Both are legitimate bases for a recommendation. They are not the same thing, and the difference has
to survive into the document, because a reader deciding how much weight to place on a claim is
entitled to know which kind it is.

**What follows from that, operationally:**

- A practitioner heuristic can justify **construction and sequencing** — what the parts are, which
  to fix first. It cannot justify a **magnitude**. A heuristic never supports a forecast number.
- **Any numeric value from these books must be read from the publication before it enters a
  decision document** — price multiples, conversion lifts, guarantee redemption rates, list-size
  thresholds, revenue figures. Where certainty is absent, describe the mechanism without the number
  and leave a `⟨READ FROM PUBLICATION⟩` slot.
- Even after it is read, such a figure stays labelled `PRACTITIONER HEURISTIC`. It describes the
  author's businesses, not a measured population.
- Stating a heuristic in the voice of an empirical finding is a critical defect. It passes review by
  looking measured, then gets quoted in a budget case, and cannot be traced back to anything ever
  observed outside one operator's portfolio.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| A settled price and packaging exist at `@products:pricing-strategist` | yes | The offer is built **on** the price. Constructing around an unsettled price wastes the work and gets rebuilt |
| A position artifact exists at `@products:positioning-lead` | yes | The category, the alternatives and the segment are inputs and are never invented here |
| The buyer has the problem, the money and the authority to act | yes | If not, this is not an offer problem — route to `@products:positioning-lead` |
| Delivery has confirmed every core element is deliverable today at volume | yes | An offer describing the roadmap is a promise the company has not made internally |
| `squads/marketing/data/offer-construction-reference.yaml` is readable | yes | Holds the value equation, the guarantee taxonomy and the integrity blocks |

## Procedure

### Step 1 — Confirm the inputs, and refuse to substitute for them

Record the price artifact and the position artifact with their paths and dates.

**The offer is built on the price, not instead of it.** What is constructed here is what surrounds
the price — deliverables, guarantee, risk reversal, bonuses, terms, name. If the work concludes the
price is wrong, that is a **finding routed back** to `@products:pricing-strategist`, not a change
made here. An offer that quietly compensates for a price it disagrees with produces a discount
nobody approved.

### Step 2 — State all four value-equation terms

[CLASS: PRACTITIONER HEURISTIC — Hormozi, *$100M Offers*, 2021]

Perceived value rises with the dream outcome and the buyer's perceived likelihood of achieving it,
and falls with the time delay before the outcome and the effort and sacrifice required.

| Term | Position | What raises or lowers it |
|---|---|---|
| Dream outcome | numerator | Naming what the buyer already wants, in their words — not enlarging the promise |
| Perceived likelihood of achievement | numerator | Real evidence, a claimable guarantee, specificity, checkable demonstration |
| Time delay | denominator | Shortening onboarding, delivering a real intermediate win early |
| Effort and sacrifice | denominator | Doing more of the work for them; removing what they must learn, migrate or abandon |

Assign **no weights and no coefficients**. The source states a relationship, not a weighted formula.
Inventing weights is invention.

### Step 3 — Work the denominator, not only the numerator

This is the step most often skipped, and skipping it is the most common finding this task produces.
Raising the promise is a writing task; lowering time and effort is an operations task and frequently
a product one.

- Measure the time from payment to the first outcome the buyer can **feel**. If it is not measured,
  that measurement is a recommendation, routed to `@marketing:analytics-lead`.
- Count effort beyond money: what the buyer must learn, migrate, abandon, risk or wait for.
- Where the fix is product work, route it to `@pm`. It does not happen in this document.

**Compressing the promise is not compressing the delivery.** A shorter claim with the same delivery
time is a claim change, and it will fail at delivery.

### Step 4 — Name exactly one binding term

`DREAM OUTCOME` / `PERCEIVED LIKELIHOOD` / `TIME DELAY` / `EFFORT AND SACRIFICE`, with the evidence
that selects it and the evidence class of that evidence.

Perceived likelihood is frequently the binding one and is frequently treated as a copy problem when
it is an evidence problem: buyers who want the outcome and do not believe **they personally** will
get it do not buy, and no amount of rewriting changes that.

### Step 5 — Build the problem-to-solution stack

Enumerate obstacles **first** and exhaustively, then attach the offer element that removes each one.
Built in this order the stack is a completeness check. Built in reverse it is a feature list wearing
a benefit costume.

List every obstacle with **no** solution attached, and state where it is disclosed to the buyer.
Concealing an obstacle the buyer will hit converts a sale into a refund.

Each bonus must answer one **named** objection. Bonuses with no objection attached are padding, and
totalling their notional value into a stated figure is a fabricated anchor — see Step 7.

### Step 6 — Design the guarantee so it is claimable

[CLASS: PRACTITIONER HEURISTIC — Hormozi, *$100M Offers*, 2021 — taxonomy only]

Pick the type — unconditional, conditional, anti-guarantee, or performance/service remedy — and then
satisfy all six construction rules:

1. The trigger condition is stated in terms the buyer can **observe**.
2. The window is real date arithmetic and **spans the time to first outcome** from Step 3.
3. The remedy is specific: what is returned, by when, by whom.
4. The claim process is written out and is **no harder than the purchase process**.
5. Every condition is one a good-faith buyer can meet and can verify they met.
6. A named human with authority has agreed the redemption exposure before publication.

Quote **no** redemption rate, conversion lift or "which type performs best" figure. Those are numbers
from a practitioner manual describing that operator's businesses. If one is genuinely needed, leave
`⟨READ FROM PUBLICATION⟩` and read it before the document is used.

Where no honest guarantee is possible, say so and state plainly what the buyer is risking. A weaker
offer that is intact beats a stronger one that is not.

### Step 7 — Run the blocking integrity screen

Run `checklists/offer-integrity-checklist.md` Section F. **PASS / BLOCK / N/A — there is no
partial, and a single BLOCK stops publication.**

| Blocked | Compliant alternative |
|---|---|
| Fabricated urgency — a deadline invented for effect, an "ends tonight" that reopens | A real dated consequence, or no deadline and a plain statement of what genuinely changes if they wait |
| Invented scarcity — a seat count nobody tracks | A real tracked limit that is enforced, or remove the claim |
| Deceptive guarantee — unmeetable conditions, a window shorter than the first outcome, a claim path harder than checkout | A genuinely claimable guarantee, or none and a plain statement of the risk |
| Fabricated proof — invented testimonials, composites presented as one client, unsourced earnings claims | Real, attributable evidence with conditions named; lower the claim where evidence does not exist yet |
| False price anchor — a crossed-out price never charged, a value total from prices nobody paid | Anchor against a real cost the buyer already carries |
| Forced continuity — undisclosed renewal, cancellation harder than purchase | Disclose renewal, amount and date before payment; cancellation at most as hard as buying |
| Manufactured incompleteness — withholding a necessary component to force an upgrade | Each rung independently complete for its own narrower promise |
| Consent violation at capture — pre-checked opt-ins, purchased lists, frequency unstated | Explicit opt-in, stated purpose and frequency, working unsubscribe |
| Outcome overclaim — describing what the product does not produce today | The outcome produced today; roadmap disclosed as roadmap |

Then the three whole-offer tests: **reversal** (would the buyer consider it fair dealing if they saw
how it was constructed), **delivery** (could operations honour it if everyone accepted everything
today), **durability** (would the buyer defend this purchase internally in six months).

**Never reword a blocked element until it passes on phrasing.** Replace it. If no legitimate goal
survives the rewrite, say plainly that the legitimate goal does not exist.

### Step 8 — Place the offer on the ladder

Each rung delivers a complete outcome for its own, narrower promise. A rung that only makes sense as
a step toward the next is bait — rebuild it or remove it.

The **rungs** are an offer decision and belong here. The **price points** on them do not — they are
`@products:pricing-strategist`, and no ratio between them is stated in this document.

### Step 9 — Specify what must be measured

Specify **what**; `@marketing:analytics-lead` decides **how** and states the limits.

- Conversion at the offer step, **segmented by traffic source** — an unsegmented reading averages
  the finding away.
- Time to first outcome delivered.
- Refunds, complaints and reason codes.
- Guarantee claim rate **and** claim-process completion rate — a low claim rate also occurs when the
  process is hard, which is a defect and not a win.
- Ascension among **delivered** buyers.

No lift may be claimed without a test that `@marketing:analytics-lead` designed.

### Step 10 — Tag every claim, and name what is unverified

Every claim carries `PRACTITIONER HEURISTIC`, `EMPIRICAL`, `OUR DATA` or `UNVERIFIED`. List every
figure that did not trace to a source and every unfilled `⟨READ FROM PUBLICATION⟩` slot.

Under Constitution Article IV — No Invention, a recalled statistic with no citable source is marked
UNVERIFIED and never enters a decision document.

**One claim this task never makes:** that an offer improvement is brand growth. Conversion of buyers
already in market is a different mechanism from building mental availability among category buyers
who are not in market today, measured over a different window on a different population. Both
matter. Neither substitutes for the other.

### Step 11 — Write it to the repository

Use `templates/offer-construction-tmpl.md`. Set an owner and a review date. An offer decision that
lives only in a transcript did not happen (Constitution Article I — CLI First).

## Boundary

This task constructs what surrounds the price. It does not price, position, budget, instrument,
implement or ship.

| Out of scope | Owner |
|--------------|-------|
| Price points, discounts, packaging tiers | `@products:pricing-strategist` |
| Market category, competitive alternatives, target segment | `@products:positioning-lead` |
| Mental and physical availability, distinctive assets, category entry points | `@marketing:brand-lead` |
| Media budget, source selection, brand-vs-activation split | `@marketing:demand-lead` |
| Instrument design, sampling, attribution, test design | `@marketing:analytics-lead` |
| Funnel steps, sequences and leak diagnosis | `@marketing:funnel-lead` |
| Editorial pipeline and formats | `@marketing:content-lead` |
| Product change implied by a time-delay or effort fix | `@pm` → `@sm` → `@dev` via the story pipeline; never direct |
| Git push, PRs, CI/CD | `@devops` (exclusive authority) |

## Acceptance criteria

- [ ] The price artifact is named and settled; no price, discount or packaging decision appears here
- [ ] The position artifact is named; no category, alternative or segment is invented
- [ ] The buyer's problem, money and authority are stated with an evidence class
- [ ] All four value-equation terms appear, and **both** denominator terms have a named reduction and an owner
- [ ] Exactly one binding term is named, with the evidence that selects it
- [ ] No weight or coefficient is assigned to any value-equation term
- [ ] Obstacles were enumerated before solutions, and obstacles with no solution are disclosed
- [ ] Every bonus answers one named objection
- [ ] The guarantee satisfies all six construction rules, including a named human who agreed the exposure
- [ ] The integrity screen was run and returned `CLEAR`, or every BLOCK carries its compliant alternative verbatim
- [ ] The three whole-offer tests — reversal, delivery, durability — are answered
- [ ] Every claim carries an evidence class, and no practitioner heuristic is stated as an empirical finding
- [ ] No figure from either book is quoted from memory; unfilled publication slots are listed
- [ ] No practitioner heuristic is used to justify a forecast number or a target
- [ ] Measurement is specified and segmented by source, and handed to `@analytics-lead`
- [ ] The document does not claim that an offer improvement constitutes brand growth
- [ ] Written to the repository with an owner and a review date

## Handoff

| To | Carrying |
|----|----------|
| `@funnel-lead` | The constructed offer, so a funnel can carry it without dilution — and the fact that a funnel cannot repair an offer |
| `@analytics-lead` | The measurement spec, source segmentation requirement, and any test that must exist before a lift is claimed |
| `@demand-lead` | The spend consequence of the offer change; sizing is never decided here |
| `@content-lead` | The claims and proof, so editorial work does not restate them differently |
| `@brand-lead` | Where the offer's language or assets touch distinctive assets or category entry points |
| `@marketing-chief` | When offer work and brand or demand recommendations contradict and need arbitration |
| `@products:pricing-strategist` | When the finding is that the price or packaging is wrong |
| `@products:positioning-lead` | When the buyer named does not have the problem, the money or the authority |
| `@pm` | When a time-delay or effort reduction requires product change |
| `@sales:qualification-lead` | Where the offer implies a qualification the sales motion must enforce |

## Related

- **Agent:** `squads/marketing/agents/offer-lead.md` (Bounty)
- **Template:** `squads/marketing/templates/offer-construction-tmpl.md`
- **Checklist:** `squads/marketing/checklists/offer-integrity-checklist.md`
- **Data:** `squads/marketing/data/offer-construction-reference.yaml`
- **Manifest:** `squads/marketing/squad.yaml`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Downstream:** `squads/marketing/tasks/funnel-lead-funnel-map.md`, `squads/marketing/tasks/analytics-lead-measurement-model.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
