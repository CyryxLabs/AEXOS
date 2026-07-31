---
task: Decide Brand And Activation Split
responsavel: "@demand-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - brand_specification: What brand building must achieve, from @brand-lead (required — this task sizes it, it does not author it)
  - spend_list: Every line of current spend including agency fees, production and channel costs (required)
  - purchase_cycle: Typical length of the category purchase cycle (required)
  - share_position: Current share of market and whether growth is from a small base (optional)
  - customer_mix: Split of growth expected from new versus existing customers (optional)
  - competitor_spend: Observed competitor spend behaviour and its recent trend (optional)
  - published_prior: The category prior, with the publication it comes from (optional — marked UNVERIFIED until checked against that publication)
Saida: |
  - actual_split: The split the plan actually has, line by line, before any recommendation
  - recommended_split: A RANGE with a midpoint, never a point estimate
  - adjustment_log: Each adjustment away from the prior, with direction and stated reason
  - evidence_class: DATABANK PRIOR, OWN DATA or JUDGEMENT — for the recommendation as a whole
  - moving_factor: The single factor most likely to move the recommendation
  - revisit_trigger: What would change the recommendation, and when the split is revisited
  - unverified_list: Every ratio or coefficient not yet checked against its publication
Checklist:
  - "[ ] Classify every spend line as BRAND BUILDING, SALES ACTIVATION or HYBRID"
  - "[ ] Report the actual split before discussing the desired one"
  - "[ ] Name the publication any prior comes from; do not state a ratio from memory"
  - "[ ] Mark every unchecked ratio or coefficient UNVERIFIED"
  - "[ ] Apply each adjustment factor with an explicit direction and reason"
  - "[ ] Output the recommendation as a RANGE, never as a point"
  - "[ ] State the evidence class of the recommendation"
  - "[ ] Name the single factor most likely to move it"
  - "[ ] State what would change the recommendation and when it is revisited"
  - "[ ] Hand measurability questions to @analytics-lead rather than assuming an effect is provable"
---

# *split-decision

Materializes the `*split-decision` command of `@demand-lead` (Cadence). Recommends the brand-building
versus sales-activation split as a range with a mechanism attached, starting from the published
category prior and adjusting for this business with each adjustment justified.

## Purpose

A plan with no explicit split has one anyway — set by whatever was easiest to justify in the last
budget review. This task makes the split a stated decision variable with a rationale, so it can be
argued with rather than inherited.

Brand building and sales activation are different mechanisms, not different budgets for the same
mechanism. Brand building works slowly and broadly and raises base demand; activation works quickly
and narrowly and harvests demand that already exists. Each has its own clock, and a single reporting
window cannot fairly judge both.

## Method source and attribution

The framework applied here is the effectiveness analysis published by Les Binet and Peter Field in
*The Long and the Short of It: Balancing Short and Long-Term Marketing Strategies* (IPA, 2013),
analysing the IPA Databank of documented effectiveness cases.

The authors extended and revised this work later, including *Media in Focus: Marketing Effectiveness
in the Digital Era* (IPA, 2017) and B2B-specific work published with the LinkedIn B2B Institute
(2019). Where a recommendation depends on a specific ratio or coefficient, this task names the
publication it comes from.

**This task states no ratio, no split percentage and no excess-share-of-voice coefficient from
memory.** The ratios reported in this literature are category averages across a case databank, not
constants, and they are never presented as constants. Any figure carried into the output is marked
UNVERIFIED until it has been checked against the publication it is attributed to, and an UNVERIFIED
figure does not justify a budget decision on its own (Constitution Article IV — No Invention).

If no one in the session has the publication to hand, the correct output is a split *structure* with
the prior slot marked UNVERIFIED and named — not a number produced from recollection.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| A brand-building specification exists from `@brand-lead` | yes | Without it there is nothing for the brand side of the split to be the size of |
| The full spend list is available, including fees and production | yes | A split computed on media cost alone misstates the actual split |
| The purchase cycle length is known | yes | It is the strongest single adjustment factor |
| The publication for any quoted prior is identifiable | no | If not, the prior slot is marked UNVERIFIED rather than filled from memory |
| `squads/marketing/agents/demand-lead.md` is readable | yes | Contains the classification tests and the effect-window discipline |

## Procedure

### Step 1 — Report the actual split first

Classify every line of current spend as BRAND BUILDING, SALES ACTIVATION or HYBRID, using the
classification tests in the agent file. Include agency fees, production and channel costs.

A line that both builds memory and drives immediate response is HYBRID — split it by judgement and
say that it was judgement.

Sum by category and report the **actual** split as a percentage. Compare it against the claimed split.
Gaps are common and usually come from hybrid lines counted as brand building in the plan and optimised
as activation in practice. Flag any line whose optimisation target contradicts its classification — a
brand campaign optimised for click-through has been converted to activation in effect, whatever the
label says.

Do not discuss the desired split until the actual one is on the table.

### Step 2 — Set the starting prior, with its publication named

State the category prior and the publication it comes from
[SOURCE: Binet and Field, *The Long and the Short of It* (IPA, 2013); for B2B contexts, their later
work with the LinkedIn B2B Institute]. Mark the figure UNVERIFIED if it has not been checked against
that publication in this session.

Treat the prior as a starting position, not as an answer. It is a category average across a case
databank with wide dispersion.

### Step 3 — Apply the adjustment factors

Each adjustment gets an explicit direction and a stated reason. An unexplained adjustment is a
preference wearing a method's clothes.

| Factor | Direction | Reason |
|--------|-----------|--------|
| Purchase cycle length | Longer cycle → more brand building | At any moment most future buyers are not in market and can be reached only by memory, not by response |
| Share position | Growing from a small base → more brand building | Growth requires reaching category buyers who currently never see us |
| Customer mix | Growth from new customers → more brand building | Activation harvests existing demand; it does not create the pool |
| Business model | High repeat, contractual → relatively more activation | Retained demand needs less memory work per unit of revenue |
| Category maturity and competitor spend behaviour | Competitors increasing spend → more brand building to hold share of voice | Share of voice is relative; a flat budget in a rising market is a cut |
| Physical availability constraints from `@brand-lead` | Severe access friction → activation is harvesting into a leak | Fix the buying path before sizing the harvest |

### Step 4 — Output a range, never a point

Give the midpoint, the range around it, and the single factor most likely to move it. A point estimate
implies a precision this evidence class does not have, and it will be quoted without the range.

### Step 5 — State the evidence class

One of three, for the recommendation as a whole:

- **DATABANK PRIOR** — a published average, adjusted with reasons. Defensible starting position, not a
  forecast. Say so.
- **OWN DATA** — this business has modelled its own split.
- **JUDGEMENT** — neither. Explicitly a hypothesis.

### Step 6 — State the revisit conditions

What would change the recommendation, and when the split is revisited. Include the relativity trap: if
competitors raise spend and our budget is held flat, our share of voice falls without any decision
having been taken.

### Step 7 — Check the split against the effect windows in use

Cross-check whether any activity in the plan is being judged over a window shorter than its effect. An
effect measured outside its window has not been shown to be absent — the readout is UNINTERPRETABLE,
not negative. Never convert a too-short window into a directional conclusion "for now".

Short-term measurement is biased toward activation by construction, not by evidence: the mechanism
with the fast, attributable, individually-tracked response wins every comparison run inside a short
window. If the budget has been drifting toward the most measurable channel across planning cycles
while acquisition cost rises and demand stays flat, that is the efficiency-trap signature — run
`*shorttermism-check`.

### Step 8 — Hand measurability outward

State which effects must be measured over which horizon. Whether each of them can actually be
measured, and what residual uncertainty remains, is decided by `@analytics-lead` — not assumed here.

### Step 9 — Record the UNVERIFIED list

Every ratio and coefficient carried into the output that has not been checked against its publication.
Then write the decision to the repository with an owner and a review date (Constitution Article I —
CLI First).

## Boundary

| Out of scope | Owner |
|--------------|-------|
| What the brand should mean, which entry points to build, which assets to protect | `@brand-lead` |
| Beats, formats, editorial cadence, distribution planning | `@content-lead` |
| Whether a claimed effect can actually be measured, attribution, incrementality design | `@analytics-lead` |
| Price, packaging, willingness to pay | `@products:pricing-strategist` |
| Market category, competitive alternatives, segment | `@products:positioning-lead` |
| Epic framing, stories, implementation, quality gates, push | `@pm`, `@sm`, `@dev`, `@qa`, `@devops` |

## Acceptance criteria

- [ ] The actual split is reported line by line before any recommendation appears
- [ ] Every prior names the publication it comes from; no ratio is stated from memory
- [ ] Every unchecked ratio or coefficient is marked UNVERIFIED
- [ ] No published ratio is presented as a constant or as a rule
- [ ] Each adjustment carries an explicit direction and a stated reason
- [ ] The recommendation is a range with a midpoint, not a point estimate
- [ ] The evidence class of the whole recommendation is stated
- [ ] The single factor most likely to move the recommendation is named
- [ ] No short-window and long-window metrics are compared in the same efficiency ranking
- [ ] No activity is judged over a window shorter than its effect; such readouts are declared UNINTERPRETABLE
- [ ] No decision rests on an UNVERIFIED figure alone
- [ ] The decision is written to the repository with an owner and a review date

## Handoff

| To | Carrying |
|----|----------|
| `@brand-lead` | What the funded brand side can actually meet, so the brand plan is revised rather than quietly retained at full scope |
| `@content-lead` | The phasing, where content substitutes for paid continuity — the trade-off stated, not assumed |
| `@analytics-lead` | Which effects must be measured over which horizon, for a feasibility verdict and an honest uncertainty statement |
| `@marketing-chief` | When this recommendation contradicts the brand recommendation — most such conflicts are horizon differences, not fact disputes |
| `@pm` | Only via `@marketing-chief`, once the evidenced plan is complete and ready for epic framing |

## Related

- **Agent:** `squads/marketing/agents/demand-lead.md` (Cadence)
- **Manifest:** `squads/marketing/squad.yaml`
- **Upstream:** `squads/marketing/tasks/brand-lead-brand-audit.md`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
