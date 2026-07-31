---
task: Run Willingness To Pay Talk
responsavel: "@pricing-strategist"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - offer_concept: The product or capability under consideration, described as outcomes rather than features (required)
  - feature_set: The features in scope, each to be classified (required)
  - build_status: Whether the offer is pre-build, in build, or already shipped (required)
  - hypothesized_segments: Candidate value segments to sample against (required, minimum one)
  - positioning_ref: Best-fit segment and value themes from @positioning-lead, when available (optional)
  - current_prices: Existing prices, packages and discount practice, for an audit rather than a new design (optional)
  - output_dir: Directory for monetization artifacts (optional, default: docs/product/pricing/)
Saida: |
  - wtp_findings: Willingness-to-pay ranges per segment, with the method, the sample and the confidence stated
  - feature_classification: Every feature classified leader, filler or killer, with the supporting evidence
  - killer_list: Features or requirements that measurably reduce willingness to pay, and the segment each affects
  - method_record: The research instrument chosen, why, and its sample requirement
  - build_impact: What the findings say should change in scope before the build proceeds
Checklist:
  - "[ ] Record the build status and state what the findings can still change"
  - "[ ] Select the research instrument and its sample requirement"
  - "[ ] Write the interview guide using indirect questioning"
  - "[ ] Sample against each hypothesized segment separately"
  - "[ ] Record the current alternative and what it costs the customer today"
  - "[ ] Measure the acceptable price range per segment with the method stated"
  - "[ ] Classify every feature as leader, filler or killer"
  - "[ ] Flag every killer before launch, with the affected segment named"
  - "[ ] Report ranges and confidence, never a single number"
  - "[ ] Write the findings to the repository"
  - "[ ] State the scope changes the findings imply"
---

# *wtp-talk — Design and Run the Willingness-to-Pay Conversation

Materializes `@pricing-strategist *wtp-talk`, and feeds `*classify-features`, `*segment-by-value`
and `*business-case` with its outputs.

## Purpose

Find out what customers will pay, and for which specific outcomes, while the answer can still
change what gets built. Price is a product design input on par with scope and architecture. Run
after the build, the same conversation is an autopsy: it tells you which features were wasted and
which killers already shipped.

This task produces willingness-to-pay evidence and a feature classification. It does not design
the packages, choose the monetization model, set the final price, or run a live price test.

## Preconditions

1. `offer_concept` is described in outcomes the customer would recognise, not in internal feature
   names. Customers price outcomes; they cannot price a component.
2. Each hypothesized segment has a reachable sample. Segments that cannot be sampled cannot be
   priced, and a segment that cannot be identified before the sale is an analysis artifact rather
   than a commercial instrument.
3. If `positioning_ref` is absent, note it. Packaging built on an unsettled frame of reference has
   to be redone, so an unsettled position is a known risk carried into this work — flag it and,
   where the frame is genuinely undecided, hand back to `@positioning-lead` before designing tiers.

## Procedure

### Step 0 — Record the build status honestly

| build_status | What the findings can still change |
|---|---|
| pre-build | Scope, packaging, which features are built at all — full value |
| in build | Packaging, tier placement, and whether a killer ships — partial value |
| shipped | Packaging and price only. Record explicitly that scope evidence arrived too late |

Deciding price in the final sprint before launch is the single most common cause of monetization
failure. If `build_status` is `shipped`, this task still runs, but it is a diagnosis, and the
artifact must say so.

### Step 1 — Select the research instrument

| Need | Instrument | Sample requirement |
|---|---|---|
| Early concept, small n, reasons rather than numbers | Open-ended direct and indirect questioning in interviews | 12–25 interviews per hypothesized segment |
| An acceptable price range, fast | Van Westendorp price sensitivity meter | Typically 100+ respondents for stable curves |
| A demand curve at discrete price points | Gabor-Granger | 100+ respondents |
| Trade-offs between features and price | Conjoint analysis | 200+ respondents for reliable part-worths |
| Feature priority without price | MaxDiff, then price the top set | 150+ respondents |
| Discountable purchase intent | Purchase probability scale | Enough per price point to be stable |

Record the choice and the reason. Pair any stated-preference method with observed behaviour
before betting a business case on it — stated intent overstates behaviour and must be discounted.

### Step 2 — Write the interview guide

Direct price questions rarely work; buyers anchor and understate. Build the guide from indirect
questioning:

1. What do you use today for this, and what does it cost you — in money, in hours, in risk?
2. Walk me through the last time this problem cost you something. What happened?
3. If this offer existed, which parts would you drop to hold the price down?
4. What would have to be true for this to come out of a budget you already control?
5. At {price point}, how likely would you be to purchase — and what would you compare it to?
6. What in this offer would make you stop the evaluation?

Question 6 is the killer probe. It is the one that most often changes the build, and it is the
one most often left out.

### Step 3 — Sample per segment, separately

Run the instrument against each hypothesized segment on its own. Aggregating across segments
averages a strong willingness to pay in one segment with none in four others and produces a
comfortable, meaningless number.

For each segment record: the defining value driver, the sample size achieved, the acceptable
range, and whether the segment is identifiable before the sale and fenceable after it.

### Step 4 — Classify every feature

| Class | Test | Evidence to record |
|---|---|---|
| Leader | The acceptable price ceiling moves when this feature is present | The ceiling with and without, per segment |
| Filler | The ceiling is unchanged with and without | The comparison showing no effect |
| Killer | Any segment disengages or lowers its ceiling when it is present | Which segment, how many respondents, what they said |

Every feature in `feature_set` gets a class. "Unclassified" is not an outcome; it means the
instrument did not cover it, and that is a gap to record.

### Step 5 — Flag the killers

For each killer, name the affected segment and choose one disposition: remove the feature or
requirement, make it optional, or fence it away from the affected segment. A killer that ships
unflagged does its damage before price is ever discussed.

This is the finding that most justifies the whole task. Report it first, not last.

### Step 6 — Report ranges, not points

Every number leaves this task with three things attached: the method that produced it, the sample
it rests on, and the range. A single price point quoted without them invites decisions with
unearned confidence.

Mark any figure without a documented interview, survey instrument, transaction record or cited
benchmark as UNVERIFIED. Under Constitution Article IV — No Invention — UNVERIFIED figures never
enter a business case.

### Step 7 — State the build impact

Write what the findings say should change:

- Features to cut, because no segment's ceiling moves for them
- Requirements to remove or make optional, because they are killers
- Features to keep and place deliberately, because they lead for a named segment
- Segments to stop pursuing, because their range does not support the cost to serve

If `build_status` is `pre-build`, this list is the point of the exercise.

### Step 8 — Write the artifact

Create `output_dir` if absent. Write `wtp-{offer-slug}-{YYYY-MM-DD}.md` containing: build status
and what the findings could still change, the method record, the per-segment findings with sample
sizes and ranges, the full feature classification table, the killer list with dispositions, the
UNVERIFIED list, and the build impact.

## Acceptance Criteria

- The build status is recorded, and the artifact states what the findings could still change.
- The research instrument is named with its sample requirement, and the achieved sample is
  reported per segment.
- Sampling was done per hypothesized segment, never in aggregate.
- Every feature in scope is classified leader, filler or killer with supporting evidence, or the
  coverage gap is recorded.
- Every killer is flagged with the affected segment and a disposition.
- No figure is reported as a single point; each carries method, sample and range.
- Figures without a documented source are marked UNVERIFIED and excluded from any business case.
- Each segment is assessed for whether it is identifiable pre-sale and fenceable post-sale.
- The build impact is stated as concrete scope changes, not as a summary.
- No package design, monetization model choice, final price or live test was produced by this
  task.

## Handoff

| Destination | Condition |
|---|---|
| `@positioning-lead` | The frame of reference or best-fit segment turns out to be unsettled — positioning must resolve before tiers are fixed |
| `@product-strategist` | The evidence should reprioritize the roadmap, or the offer diagnoses as having no demand and cancellation is on the table |
| `@discovery-lead` | Willingness-to-pay evidence is thin and a structured research program is needed before a business case can stand |
| `@jobs-analyst` | A leader must be explained by tracing it to the job the customer is hiring the product to do |
| `@experimentation-lead` | A price point, tier restructure or packaging change should be tested live with a defined OEC, revenue guardrails and a sample-size calculation |
| `@products-chief` | The monetization design conflicts with squad-level direction and needs arbitration |
| `@pm` | The commercial evidence is settled and the problem needs epic framing |
| `@dev` and `@data-engineer` | Billing implementation and metering, once the model is chosen |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the
  Product Around the Price* (2016) — the willingness-to-pay talk before build, the leader / filler
  / killer classification, value-based segmentation, configuration and bundling, the monetization
  model and pricing strategy choice, the outside-in business case, and the taxonomy of four
  commercial failure modes (feature shock, minivan, hidden gem, undead).

`@pricing-strategist` (Assay) is a specialist applying this framework.

## Related

- Agent: `squads/products/agents/pricing-strategist.md`
- Elicitation for interview design: `.aexos-core/development/tasks/advanced-elicitation.md`
- Customer interview execution: `.aexos-core/development/tasks/ux-user-research.md`
- Benchmark and competitor price research: `.aexos-core/development/tasks/create-deep-research-prompt.md`
- Business case arithmetic: `.aexos-core/development/tasks/calculate-roi.md`
- Applied before circulating the findings: `.aexos-core/development/checklists/self-critique-checklist.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
