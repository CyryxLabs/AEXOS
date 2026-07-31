---
task: Audit Brand Growth Health
responsavel: "@brand-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - category: The category as the buyer defines it, with its buyer population (required)
  - position_artifact: The competitive frame from @products:positioning-lead (required — consumed, never authored here)
  - penetration_data: Share of category buyers who bought this brand in a defined period (optional; drives the UNVERIFIED verdict if absent)
  - purchase_data: Purchase frequency and buyer-level distribution for the period (optional)
  - tracking_data: CEP-linked prompted recall among category buyers, including non-buyers (optional)
  - asset_test_data: Fame and uniqueness readings per distinctive asset (optional)
  - buying_path: The purchase path from moment of need to completed purchase (optional)
Saida: |
  - denominator: The category buyer population, with its source named
  - readings_table: Six readings, each marked SOURCED or UNVERIFIED
  - double_jeopardy_verdict: Whether loyalty sits where the pattern predicts for this share
  - binding_constraint: RETRIEVAL, ACCESS or REACH — the one constraint that is actually binding
  - highest_leverage_moves: The three highest-leverage moves, each tied to the constraint
  - instrumentation_gaps: Readings that must be instrumented before the next audit
  - unverified_list: Every figure that did not trace to a source
Checklist:
  - "[ ] Establish the category denominator and name its source"
  - "[ ] Confirm the position artifact exists; do not invent a competitive frame"
  - "[ ] Pull the six readings and mark each SOURCED or UNVERIFIED"
  - "[ ] Apply the double-jeopardy expectation before diagnosing loyalty"
  - "[ ] Name the binding constraint: retrieval, access or reach"
  - "[ ] Produce the three highest-leverage moves, each tied to the constraint"
  - "[ ] List the readings that must be instrumented before the next audit"
  - "[ ] State explicitly what is UNVERIFIED; never conclude without it"
  - "[ ] Hand budget and split questions to @demand-lead, measurement design to @analytics-lead"
  - "[ ] Write the audit to the repository with an owner and a review date"
---

# *brand-audit

Materializes the `*brand-audit` command of `@brand-lead` (Salience). Diagnoses brand growth health
against the empirical checklist and returns the binding constraint, not a list of opinions.

## Purpose

Most brand diagnoses recommend loyalty work by construction, because they are measured against the
customer list rather than against the category. This task forces the denominator first, then the six
readings, then the constraint — in that order, so the recommendation follows the evidence rather than
the available data.

## Method source and attribution

The framework applied here is the empirical marketing science reported by Byron Sharp in *How Brands
Grow: What Marketers Don't Know* (Oxford University Press, 2010), reporting Ehrenberg-Bass Institute
research. Brands grow mainly by increasing penetration among category buyers, achieved through mental
availability (being thought of in buying situations) and physical availability (being easy to buy).
Loyalty largely follows share rather than driving it.

Where the method draws on later work from the same institute, it is named separately:

- *How Brands Grow Part 2* (Jenni Romaniuk and Byron Sharp, 2016) — category entry points.
- *Building Distinctive Brand Assets* (Jenni Romaniuk, 2018) — the fame-and-uniqueness asset grid.

This task applies the framework with attribution. **Any numeric value quoted from any of these
sources must be checked against the publication before it enters a decision document, and is
marked UNVERIFIED until that check happens.** An empirical generalisation is
a pattern observed across categories, not a guarantee for this brand — report it as such and then
check it against this brand's own data.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| The category is defined from the buyer's point of view | yes | Without a denominator the audit is unanchored |
| A position artifact exists at `@products:positioning-lead` | yes | The competitive frame is an input to this task and is never invented here |
| The buyer population of the category is known or estimable | no | If unknown, mark the whole audit UNVERIFIED and make establishing it recommendation one |
| `squads/marketing/agents/brand-lead.md` is readable | yes | Contains the empirical generalisations, the asset grid and the diagnostic symptom table |

## Procedure

### Step 1 — Establish the denominator

Ask: what is the category, and how many buyers does it have?

Take the competitive frame and the category definition from `@products:positioning-lead`
(`squads/products/agents/positioning-lead.md`). Do not invent one. If the buyer population is unknown,
mark the whole audit UNVERIFIED and make establishing it the first recommendation — every reading
below is a ratio whose denominator this is.

### Step 2 — Pull the six readings

Record each one, and mark each SOURCED or UNVERIFIED. An UNVERIFIED reading may inform a hypothesis;
it may not justify a decision.

| # | Reading | Definition |
|---|---------|------------|
| a | Penetration | Share of category buyers who bought this brand in a defined period |
| b | Purchase frequency | Average for this brand, and versus the category average |
| c | Buyer base shape | Share of volume from the top decile versus the rest |
| d | Mental availability | CEP-linked prompted recall, if tracked |
| e | Physical availability | Presence and friction at each step of the buying path |
| f | Distinctive assets | Fame and uniqueness per asset, if tested |

Do not quote a remembered concentration ratio for reading (c). The concentration varies by category;
measure this brand's own distribution.

### Step 3 — Apply the double-jeopardy expectation

Smaller brands have fewer buyers **and** slightly lower loyalty [SOURCE: Sharp, *How Brands Grow*].
For this brand's share, is loyalty roughly where the pattern predicts?

- **If yes:** loyalty is not the problem. Say so explicitly and in plain terms. Money spent lifting it
  is money spent on a number that was never broken.
- **If no:** a genuine anomaly. Investigate before acting. Exceptions exist — contractual lock-in and
  very small buyer populations are the usual candidates — but an exception requires data, not
  conviction.

Retention double jeopardy applies in the same direction: churn benchmarked against a much larger
competitor is misleading unless size is controlled for.

### Step 4 — Test the buyer base and any segmentation claim

Brands in a category share customers roughly in line with the other brands' market shares
[SOURCE: Sharp, *How Brands Grow*, duplication of purchase]. If an internal segmentation claims our
buyers are fundamentally different people, ask for the purchase data. If they are not measurably
different, mark the segmentation UNSUPPORTED.

Light and non-buyers matter disproportionately because there are so many of them. A plan reaching only
heavy buyers is a plan to hold share, not to grow it.

### Step 5 — Identify the binding constraint

Exactly one of three, chosen on the readings and not on preference:

| Constraint | Signature | First move |
|------------|-----------|------------|
| **RETRIEVAL** (mental availability) | Penetration below the expectation for our share; retrieval concentrated in one entry point | `*cep-map` |
| **ACCESS** (physical availability) | Strong intent, weak conversion at purchase; friction on the buying path | `*availability-audit` |
| **REACH** | Category buyers who never see us; bursts with dark periods; targeting narrowed below the category | `*reach-audit` |

Two adjacent diagnostics from the agent's symptom table are worth running here explicitly:

- High ad recall with low brand attribution → weak or absent distinctive assets in the execution.
- Recall attributed to a competitor → an asset that is famous but not unique is carrying the work,
  which advertises the category leader. Route to `*asset-audit`.

### Step 6 — Produce the one-page diagnosis

Output: the constraint, the evidence for it, the three highest-leverage moves, and the readings that
must be instrumented before the next audit runs on data instead of estimates.

### Step 7 — Name what is UNVERIFIED

Never conclude without this section. List every figure that did not trace to a named published source
or to this brand's own tracking data. Under Constitution Article IV — No Invention, a recalled
statistic with no citable source is marked UNVERIFIED and never enters a decision document.

### Step 8 — Write it to the repository

Set an owner and a review date. A brand decision that lives only in a transcript did not happen
(Constitution Article I — CLI First).

## Boundary

This task specifies what must be built in buyer memory and access. It does not size it, schedule it,
instrument it, or choose the market frame.

| Out of scope | Owner |
|--------------|-------|
| Budget size, brand-versus-activation split, share of voice, long-term effect sizing | `@demand-lead` |
| Editorial pipeline, beats, formats, distribution cadence | `@content-lead` |
| Instrument design, sampling, attribution, what the data can support | `@analytics-lead` |
| Market category, competitive alternatives, target segment | `@products:positioning-lead` |
| Visual identity execution, interface and design-system work | `@ux-design-expert` |
| Availability fixes that require code | `@pm` → `@sm` → `@dev` via the story pipeline; never direct |
| Git push, PRs, CI/CD | `@devops` (exclusive authority) |

## Acceptance criteria

- [ ] The category buyer population is defined and its source named
- [ ] All six readings appear, each marked SOURCED or UNVERIFIED
- [ ] The double-jeopardy expectation was applied before any loyalty recommendation
- [ ] Any segmentation claim was tested against purchase data, or marked UNSUPPORTED
- [ ] Exactly one binding constraint is named, with the evidence that identifies it
- [ ] No distinctive asset is graded from intuition; untested assets are marked UNTESTED
- [ ] No empirical generalisation is presented as a guaranteed outcome for this brand
- [ ] Every empirical claim cites *How Brands Grow*, the named later Ehrenberg-Bass source, or this brand's own data
- [ ] The UNVERIFIED list is present and no decision rests on an UNVERIFIED figure alone
- [ ] Budget and split questions are handed to `@demand-lead`; measurement design to `@analytics-lead`
- [ ] The audit is written to the repository with an owner and a review date

## Handoff

| To | Carrying |
|----|----------|
| `@demand-lead` | The brand-building specification, for sizing: split, share of voice, phasing, the long-term effect expectation |
| `@content-lead` | Category entry points and distinctive assets, once settled, so the editorial pipeline expresses them consistently |
| `@analytics-lead` | What must be instrumented — CEP-linked recall, asset fame and uniqueness, penetration — and the limits of the proposed measurement |
| `@marketing-chief` | When this diagnosis contradicts a demand recommendation, or when arbitration across horizons is required |
| `@products:positioning-lead` | When the category frame, the competitive alternatives or the segment are unclear or contested |

## Related

- **Agent:** `squads/marketing/agents/brand-lead.md` (Salience)
- **Manifest:** `squads/marketing/squad.yaml`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Downstream:** `squads/marketing/tasks/demand-lead-split-decision.md`, `squads/marketing/tasks/content-lead-beat-plan.md`, `squads/marketing/tasks/analytics-lead-measurement-model.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
