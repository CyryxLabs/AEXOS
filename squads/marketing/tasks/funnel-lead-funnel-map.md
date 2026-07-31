---
task: Map a Funnel and Locate the Leak
owner: "@funnel-lead"
owner_type: agent
atomic_layer: task
Input: |
  - offer_artifact: The constructed offer from @marketing:offer-lead, with its integrity gate verdict (required — carried, never authored here)
  - funnel_surfaces: Every step as the visitor encounters it, in order, verbatim (required)
  - step_readings: Per-step readings segmented by traffic source, with instrument and period (optional; absent means no diagnosis is available)
  - traffic_sources: Sources in use, with volume and the intent each selects for (required)
  - position_artifact: The competitive frame and segment from @products:positioning-lead (required — consumed)
  - price_artifact: Price, packaging and renewal mechanics from @products:pricing-strategist (required — consumed)
  - delivery_readings: Time to first outcome, refunds, complaints, reason codes (optional)
  - brand_artifact: Distinctive assets and category entry points from @marketing:brand-lead the funnel must express (optional)
Output: |
  - funnel_map: Every step with its one job and the one reading that judges it
  - readings_table: Per-step readings segmented by source, each marked OUR DATA or ESTIMATED, or NOT INSTRUMENTED
  - primary_leak: One step and one leak class, with the evidence that selects it
  - routing_verdict: Whether the leak is a funnel fix at all, and who owns it if not
  - secondary_leaks: Listed with a reason each waits
  - integrity_verdict: CLEAR or BLOCKED, with every blocked step element and its compliant alternative verbatim
  - instrumentation_gaps: What must be instrumented before the next diagnosis runs on data
  - evidence_summary: Count of claims by class — PRACTITIONER HEURISTIC, EMPIRICAL, OUR DATA, UNVERIFIED
  - unverified_list: Every figure that did not trace to a source, and every unfilled publication slot
Checklist:
  - "[ ] Confirm the offer artifact exists and its integrity gate is CLEAR; a funnel cannot repair an offer"
  - "[ ] Confirm the price and position artifacts exist; never set price, category or segment here"
  - "[ ] Decompose the funnel into steps, each with one job and one reading"
  - "[ ] Segment every reading by traffic source; never diagnose from an aggregate rate"
  - "[ ] Where readings are absent, say no diagnosis is available and make instrumentation recommendation one"
  - "[ ] Name exactly one primary leak and classify it"
  - "[ ] Apply the routing rules: offer failure, intent mismatch, delivery gap and instrumentation gap are not funnel fixes"
  - "[ ] Never compare a step to a remembered benchmark; compare it to itself or to a controlled variant"
  - "[ ] Run the blocking integrity screen; replace every blocked element with its compliant alternative"
  - "[ ] Tag every claim with its evidence class; never state a practitioner heuristic as an empirical finding"
  - "[ ] Hand instrumentation and test design to @analytics-lead before any lift is claimed"
  - "[ ] Write the funnel architecture to the repository with an owner and a review date"
---

# *funnel-map

Materializes the `*funnel-map` command of `@funnel-lead` (Weir). Decomposes the buying path into
steps that can each be read, locates the one that is actually leaking, and screens every step
before it ships.

## Purpose

"The funnel is broken" is a summary statistic, not a diagnosis. A single overall conversion rate
hides which step failed, moves on traffic mix alone, and routinely sends a team to rewrite a page
that was working. This task forces the decomposition first, then the per-source readings, then one
classified leak — in that order, so the fix follows the evidence rather than the step someone
already wanted to change.

It also enforces the boundary that costs the most money when it is ignored: **an offer that does
not convert is not a funnel problem.** Optimising steps around an unsound offer consumes traffic
budget with no terminating condition.

## Method source, and what kind of source it is

The architecture applied here is published by Russell Brunson in *DotCom Secrets* (2015), with
*Expert Secrets* (2017) for belief-shift sequencing and *Traffic Secrets* (2020) for traffic origin,
each named separately.

**These are practitioner manuals with a track record.** The method was distilled by an operator from
their own operating history and the businesses they built. Its authority is that it worked,
repeatedly, for the person who wrote it, and is written down in enough structural detail to be
applied by someone else. That is real and useful: it supplies where the steps are, what each is
for, what breaks at each one, and the discipline of asking *which step failed*. No research
programme currently supplies that level of operational structure.

**It is a different kind of source from the rest of this squad.** `@brand-lead` runs on Byron Sharp
reporting Ehrenberg-Bass research; `@demand-lead` on Binet and Field analysing the IPA Databank;
`@analytics-lead` on Kaushik's measurement discipline. Those are **research programmes with
published data** — claims derived from many brands across many categories, with stated dispersion.
This task's source is a **practitioner manual with a track record** — no sampling frame, no control
condition, no dispersion, no independent replication.

Both are legitimate bases for a recommendation. They are not the same thing, and the difference has
to survive into the document.

**What follows from that, operationally:**

- A practitioner heuristic can justify **decomposition and sequencing** — where to look, and in what
  order. It cannot justify a **rate**. A heuristic never supports a step target.
- **Never compare a step reading to a remembered benchmark.** A conversion figure in these books
  described the author's funnels, in the author's categories, at that time. Used as a target here it
  becomes a performance goal nobody can trace to a measurement. Compare a step to itself over time,
  or to a controlled variant.
- **Any numeric value from these books must be read from the publication before it enters a decision
  document** — step conversion rates, list-size thresholds, value-ladder price ratios, ad spend
  ratios. Where certainty is absent, describe the mechanism without the number and leave a
  `⟨READ FROM PUBLICATION⟩` slot.
- Even after it is read, such a figure stays labelled `PRACTITIONER HEURISTIC`.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| A constructed offer exists at `@marketing:offer-lead` with a `CLEAR` integrity verdict | yes | A funnel carries an offer; it cannot construct or repair one. A BLOCKED offer is fixed, not carried |
| A price artifact exists at `@products:pricing-strategist` | yes | Price, packaging and renewal mechanics are inputs and are never set here |
| A position artifact exists at `@products:positioning-lead` | yes | The category, the alternatives and the segment are inputs and are never invented here |
| Traffic sources are known, with the intent each selects for | yes | A funnel read without segmenting by source averages the finding away |
| Per-step readings exist, segmented by source | no | If absent, the finding of this task is that no diagnosis is available and instrumentation is recommendation one |
| `squads/marketing/data/funnel-architecture-reference.yaml` is readable | yes | Holds the stage decomposition, the leak taxonomy and the integrity blocks |

## Procedure

### Step 1 — Confirm the offer, and refuse to substitute for it

Record the offer artifact, its path, and its integrity gate verdict.

If the offer has not been constructed, or its verdict is `BLOCKED`, **stop and route to
`@marketing:offer-lead`**. Steps optimised around an offer nobody built produce a
well-instrumented failure, and the instrumentation makes it look like progress.

Record the price and position artifacts the same way. Neither is set, adjusted or worked around
here.

### Step 2 — Decompose the path into steps

One row per step. Each step gets **one job** and **one reading** that judges it.

| Step | Job |
|---|---|
| Traffic origin | Bring a person with the relevant problem into the path |
| Entry step | Establish in one screen that this is about the visitor's problem |
| Capture | Exchange something of real standalone value for explicit permission to contact |
| Offer presentation | Present the constructed offer intact |
| Transaction | Let a decided buyer complete without friction |
| Immediate sequence | Deliver the first real outcome, then present any genuinely related next step |
| Follow-up sequence | Continue the relationship, within the frequency disclosed at capture |
| Ascension | Offer the next rung to buyers who **got the outcome** |

List steps this funnel does not have, with one line each on why. Stage names vary between the
source works and between implementations; what matters is that every step has a job and a reading.

### Step 3 — Pull the readings, segmented by source

Record each reading with its instrument, its period, and its class: `OUR DATA`, `ESTIMATED`, or
`NOT INSTRUMENTED`.

**Segmentation by source is not optional.** The same funnel converts differently by source not
because a source is "better" but because it selects a different person. An aggregate rate moves on
mix shift alone, with no step changing, and it is the number that hides the diagnosis.

Produce **no benchmark column.** There is nothing legitimate to put in it.

**If the readings do not exist:** say so plainly. The finding of this task is then that
instrumentation is recommendation one, routed to `@marketing:analytics-lead`. Do not produce a
ranked leak list from estimates and present it as a diagnosis. A confident guess on absent data is
worse than no diagnosis, because it gets funded.

### Step 4 — Name exactly one primary leak, and classify it

| Leak class | Signature |
|---|---|
| `PROMISE BREAK` | High arrival, immediate exit at entry, worst on the highest-intent source |
| `INTENT MISMATCH` | One source converts far below others at the same step, similar volume |
| `OFFER FAILURE` | Relevant traffic, clean step, offer step still does not convert |
| `COMPREHENSION GAP` | Long dwell, high scroll, low action |
| `PROOF GAP` | Objections repeat verbatim; buyers want the outcome and doubt it applies to them |
| `FRICTION DRAG` | High initiate-to-complete drop; long completion time; concentrated on one device or payment path |
| `UNEXPECTED COST` | Drop concentrated where a fee, tax, term or requirement first appears |
| `SEQUENCE BREAK` | Capture healthy, downstream engagement near zero |
| `DELIVERY GAP` | Conversion healthy, refunds and complaints rising, ascension near zero |
| `INSTRUMENTATION GAP` | The per-step numbers do not exist or do not reconcile |

Secondary leaks are listed separately with a reason each waits. They are not fixed in parallel;
fixing several steps at once makes the next reading uninterpretable.

### Step 5 — Apply the routing rules before proposing any step fix

Four of the ten classes are **not funnel fixes at all**, and treating them as such is where the
money goes.

| If the class is | It is not a funnel fix because | Route to |
|---|---|---|
| `OFFER FAILURE` | The offer does not convert on relevant traffic. No step change repairs that | `@marketing:offer-lead` — before more traffic is bought |
| `INTENT MISMATCH` | The source selects people without the problem | `@marketing:demand-lead` (source and spend), `@products:positioning-lead` (who the offer is for) |
| `DELIVERY GAP` | The funnel works; the product step does not | `@pm` |
| `INSTRUMENTATION GAP` | There is no diagnosis yet | `@marketing:analytics-lead` |

**Never modify a step to accommodate a mismatched source.** It degrades the step for the sources
that were working, and the aggregate reading will show an improvement while the good sources get
quietly worse.

`FRICTION DRAG` is named here and implemented elsewhere: `@pm` → `@sm` → `@dev` via the story
pipeline, never directly.

### Step 6 — Run the blocking integrity screen

Run `checklists/funnel-integrity-checklist.md` Section F against every step. **PASS / BLOCK / N/A —
there is no partial, and a single BLOCK stops the step shipping.**

| Blocked | Compliant alternative |
|---|---|
| A countdown that resets per visitor; an evergreen "closes tonight" that reopens | A real dated consequence, or no timer and a plain line on what genuinely changes if they wait |
| A seat or slot counter not backed by a tracked, enforced limit | Publish a real limit and enforce it, or remove the claim |
| Fabricated activity proof — unmeasured "N viewing", invented purchase notifications, fake reviews | Real activity if it is measured and worth showing; otherwise real, attributable evidence |
| Pre-selected add-ons, charges not explicitly agreed, fees first shown at the final step | Every charge explicitly agreed at the moment it is incurred; total cost disclosed at the first step cost is discussed |
| Undisclosed renewal; cancellation harder than purchase | Renewal, amount and date disclosed before payment; cancellation at most as hard as buying, on the same surface |
| Consent violation at capture — pre-checked boxes, purchased lists, frequency unstated | Explicit opt-in, stated purpose and frequency, immediate working unsubscribe |
| Exit traps — back-button hijack, undismissable modal, confirm-shaming as the only exit | A dismissible offer with a plain decline, shown once |
| Bait entry — the entry step pitches something other than what was promised | Deliver the promised thing first, completely; make the next step a genuine option |
| A manufactured origin story, fabricated history or invented credential | The real history, including what has not been achieved yet |

Then the four whole-funnel tests: **reversal** (would the visitor consider the dealing fair if they
saw how each step was built), **exit** (can they leave, decline or unsubscribe in one obvious action
at every step), **disclosure** (is every cost and recurring charge disclosed before the committing
step), **delivery** (if everyone converted today, would the first outcome actually be delivered).

**Never reword a blocked element until it passes on phrasing.** A modal that looks dismissible and
is not is still a trap. If it only works when the visitor cannot escape, it was never persuasion.

### Step 7 — Read the traffic origin, without deciding the spend

Characterise each source by the **intent it selects for**, not only by volume. Distinguish owned
distribution from rented, and state the share arriving from rented sources — a funnel whose entire
origin is rented has a single point of failure it does not control.

Conversion of rented reach into owned contact happens **by explicit consent**, or it is a Step 6
BLOCK.

**Which sources to buy and how much to spend is `@marketing:demand-lead`.** What belongs here is the
consequence of an origin on this funnel: which step it breaks first, and whether the funnel can be
read at all without segmenting by it.

### Step 8 — Specify what must be instrumented

Specify **what**; `@marketing:analytics-lead` decides **how** and states the limits.

- Per-step readings, segmented by source.
- Time to first outcome delivered.
- Refunds, complaints and reason codes — a conversion lift's real cost shows up here.
- Unsubscribe rate against the frequency disclosed at capture.
- A test design, before any lift is claimed. A lift measured while traffic mix, offer or season
  moved is not attributable to the change.

### Step 9 — Tag every claim, and name what is unverified

Every claim carries `PRACTITIONER HEURISTIC`, `EMPIRICAL`, `OUR DATA` or `UNVERIFIED`. List every
figure with no traceable source and every unfilled `⟨READ FROM PUBLICATION⟩` slot.

Under Constitution Article IV — No Invention, a recalled statistic with no citable source is marked
UNVERIFIED and never enters a decision document.

**One claim this task never makes:** that a funnel improvement is brand growth. A funnel reaches
people already in market. Growth in the number of people who ever enter it comes from mental
availability among category buyers who are not in market today — measured over a window this does
not span, on a population this never sees. That belongs to `@marketing:brand-lead` and
`@marketing:demand-lead`. Both mechanisms matter; neither substitutes for the other.

### Step 10 — Write it to the repository

Use `templates/funnel-architecture-tmpl.md`. Set an owner and a review date. A funnel decision that
lives only in a transcript did not happen (Constitution Article I — CLI First).

## Boundary

This task locates and classifies. It does not construct offers, set prices, buy traffic, design
instruments, or build anything.

| Out of scope | Owner |
|--------------|-------|
| Offer construction, value equation, guarantees, risk reversal | `@marketing:offer-lead` |
| Price points, discounts, packaging tiers, renewal terms | `@products:pricing-strategist` |
| Market category, competitive alternatives, target segment | `@products:positioning-lead` |
| Mental and physical availability, distinctive assets, category entry points | `@marketing:brand-lead` |
| Media budget, source selection, brand-vs-activation split | `@marketing:demand-lead` |
| Instrument design, sampling, attribution modelling, test design | `@marketing:analytics-lead` |
| Editorial pipeline, beats, formats | `@marketing:content-lead` |
| Interface and comprehension execution of a step | `@ux-design-expert` |
| Any page, form or tracking change | `@pm` → `@sm` → `@dev` via the story pipeline; never direct |
| Git push, PRs, CI/CD | `@devops` (exclusive authority) |

## Acceptance criteria

- [ ] The offer artifact is named and its integrity verdict is `CLEAR`; an `OFFER FAILURE` diagnosis routes back rather than continuing to optimise
- [ ] The price and position artifacts are named; neither is set or worked around here
- [ ] Every step appears with one job and one reading
- [ ] Every reading is segmented by traffic source, with its instrument, period and class
- [ ] No aggregate funnel conversion rate is used as a diagnosis
- [ ] No step is compared to a remembered benchmark from any publication
- [ ] Where readings are absent, the document says no diagnosis is available and makes instrumentation recommendation one
- [ ] Exactly one primary leak is named and classified, with the evidence that selects it
- [ ] The routing rules were applied — offer failure, intent mismatch, delivery gap and instrumentation gap are routed, not fixed here
- [ ] No step is modified to accommodate a mismatched source
- [ ] Secondary leaks are listed with a reason each waits
- [ ] The integrity screen was run and returned `CLEAR`, or every BLOCK carries its compliant alternative verbatim
- [ ] The four whole-funnel tests — reversal, exit, disclosure, delivery — are answered
- [ ] Every claim carries an evidence class, and no practitioner heuristic is stated as an empirical finding
- [ ] No figure from any of the three books is quoted from memory; unfilled publication slots are listed
- [ ] Instrumentation and test design are handed to `@analytics-lead`, and no lift is claimed without a test that agent designed
- [ ] The document does not claim that a funnel improvement constitutes brand growth
- [ ] Written to the repository with an owner and a review date

## Handoff

| To | Carrying |
|----|----------|
| `@offer-lead` | An `OFFER FAILURE` diagnosis — the offer does not convert on relevant traffic, and no step change repairs that |
| `@analytics-lead` | Per-step instrumentation, the source-segmentation requirement, and the test that must exist before a lift is claimed |
| `@demand-lead` | The funnel consequence of a source, and any `INTENT MISMATCH`; spend and source selection are decided there |
| `@content-lead` | Where an entry step depends on editorial work, so the promise is consistent across both |
| `@brand-lead` | Where the funnel must express distinctive assets and category entry points rather than contradict them |
| `@marketing-chief` | When a funnel recommendation contradicts a brand or demand recommendation and needs arbitration |
| `@ux-design-expert` | Comprehension and interface execution of a named step |
| `@products:positioning-lead` | When the mismatch is about who the offer is for |
| `@pm` | When the leak is a `DELIVERY GAP` or requires code |
| `@sales:pipeline-ops` | When the funnel hands off to a human sales motion and the handoff itself is the leak |

## Related

- **Agent:** `squads/marketing/agents/funnel-lead.md` (Weir)
- **Template:** `squads/marketing/templates/funnel-architecture-tmpl.md`
- **Checklist:** `squads/marketing/checklists/funnel-integrity-checklist.md`
- **Data:** `squads/marketing/data/funnel-architecture-reference.yaml`
- **Manifest:** `squads/marketing/squad.yaml`
- **Upstream:** `squads/marketing/tasks/offer-lead-offer-build.md`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Downstream:** `squads/marketing/tasks/analytics-lead-measurement-model.md`, `squads/marketing/tasks/demand-lead-split-decision.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
