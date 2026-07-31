---
task: Build Marketing Measurement Model
responsavel: "@analytics-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - business_objectives: What the business is trying to achieve, from @demand-lead and @brand-lead (required — never invented here)
  - effect_windows: The window over which each effect occurs, from @demand-lead (required)
  - brand_objectives: What brand building must achieve, from @brand-lead (optional)
  - existing_dashboard: The report or dashboard currently in use, metric by metric (optional)
  - instrumentation_inventory: Which events, properties and identity basis exist today (optional)
  - segments: Established segments from @products:positioning-lead, if any (optional)
Saida: |
  - model_table: Objectives, goals, critical few metrics, targets, segments, horizon and feasibility in one table
  - critical_few: Two to three metrics per goal, maximum, each passing the decision test
  - targets: A target set in advance for every metric, with the basis stated
  - feasibility_marks: INSTRUMENTED, INSTRUMENTABLE (with cost) or NOT FEASIBLE, per metric
  - measurement_gaps: Effects that matter and cannot currently be measured, reported as open gaps
  - proxy_escalations: Metrics standing in for an objective nobody measures directly
  - removal_list: Metrics that change no decision, have no target, or exist only in aggregate
Checklist:
  - "[ ] Take business objectives from @demand-lead and @brand-lead; do not invent them here"
  - "[ ] Derive goals from objectives, top down; never start from what the tool can capture"
  - "[ ] Limit each goal to two or three metrics that pass the decision test"
  - "[ ] Set a target in advance for every metric, with its basis stated"
  - "[ ] Name the segments each metric must be read through"
  - "[ ] Take each metric's interpretable horizon from @demand-lead effect windows"
  - "[ ] Mark feasibility: INSTRUMENTED, INSTRUMENTABLE with cost, or NOT FEASIBLE"
  - "[ ] Report NOT FEASIBLE metrics as open gaps; never substitute an easier proxy"
  - "[ ] Escalate any proxy silently standing in for an objective to @marketing-chief"
  - "[ ] Hand instrumentation requirements to @data-engineer and @pm; do not write code or push"
---

# *measurement-model

Materializes the `*measurement-model` command of `@analytics-lead` (Cipher). Builds the marketing
measurement model top down — objectives, goals, the critical few metrics, targets set in advance,
segments, horizons and an honest feasibility verdict per metric.

## Purpose

Measurement practices drift toward whatever the tool can capture. This task inverts the direction:
objectives first, instrumentation last. It exists to prevent the single most damaging failure in
marketing measurement — the quiet substitution of a measurable proxy for an objective that mattered
and was hard to instrument.

A metric earns its place by changing a decision. If no one can name the decision it would change, it
is not a metric. It is decoration.

## Method source and attribution

The framework applied here is published by Avinash Kaushik in *Web Analytics 2.0: The Art of Online
Accountability and Science of Customer Centricity* (Sybex/Wiley, 2009). Clickstream data alone answers
only "what happened"; a competent practice combines it with outcome measurement, experimentation,
qualitative voice-of-customer input and competitive context, with most of the effort going into
analysis by people rather than into tools.

Attribution discipline, stated precisely:

- Several frameworks commonly associated with the same author were published **later on his Occam's
  Razor blog rather than in the 2009 book** — notably the Digital Marketing and Measurement Model and
  the See-Think-Do-Care framework. Where they are used, they are named as later blog work and are not
  attributed to the book.
- The incrementality methods relied on for causal claims — geo holdouts, randomised holdout groups and
  marketing mix modelling — are **established measurement disciplines with a broad literature, not
  Kaushik's frameworks**. This task says so rather than borrowing his name for them.

This task applies the framework with attribution. Under Constitution Article IV — No Invention,
every figure traces to a named source, query or instrument; estimates are labelled ESTIMATE and
uninstrumented quantities are labelled NOT MEASURED, and neither is presented as a result.

## Pre-conditions

| Condition | Blocker | Consequence if unmet |
|-----------|---------|----------------------|
| Business objectives exist from `@demand-lead` and `@brand-lead` | yes | Objectives invented here let the instrument choose what matters |
| Effect windows exist from `@demand-lead` | yes | A metric read inside the wrong window is noise, and the model would enshrine that |
| `squads/marketing/agents/analytics-lead.md` is readable | yes | Contains the actionability tests, the segmentation discipline and the causality limits |
| An instrumentation inventory is available | no | If absent, every metric is marked on feasibility by inspection and the gap is reported |

## Procedure

Build top down. **Never start from what the tool can capture.**

### Step 1 — Business objectives

Take them from `@demand-lead` and `@brand-lead`. Do not invent them here. This agent decides *how*
things are measured and what the measurement supports; *what* matters is decided elsewhere. Never let
the instrument choose the objective.

### Step 2 — Goals

The specific, marketing-owned achievements that serve each objective. One objective usually has more
than one goal; each goal must be attributable to an objective above it.

### Step 3 — The critical few metrics

Two to three per goal, maximum. Each must pass the decision test: name a specific decision this metric
would change, and who would take it. "It gives us visibility" is not a decision.

A dashboard with forty numbers hides the three that matter and gives every stakeholder license to find
their own story in it. A model that survives this step is usually three to seven numbers wide per
readout.

Distinguish outcome metrics from activity metrics. Impressions, sessions and engagement are diagnostic
inputs and must not sit at the top of a report. Define the macro conversion the business actually
wants — one, not four — then the micro conversions that precede or predict it, labelling for each
whether its value rests on observed correlation with the macro conversion or on explicit judgement.
A micro conversion that correlates with the macro conversion may not cause it, and optimising the
proxy can move the proxy without moving the outcome.

### Step 4 — Targets, set in advance

Every metric gets a target, with the basis stated: historical, benchmark, or required-for-plan. A
number with no target cannot be good or bad, so it will be narrated into whichever it needs to be.

### Step 5 — Segments

For each metric, name the segments through which it must be read to be meaningful. Aggregate data
conceals more than it reveals; almost every averaged figure is the sum of two populations behaving
differently, and the average describes neither.

Apply the actionability test: could we actually do something different for this segment? If not, the
split is arithmetic, not analysis, and it is dropped from the model.

### Step 6 — Horizon

Take the window over which each metric is interpretable from `@demand-lead`'s effect-window analysis.
Record, per metric, the horizon over which it is interpretable and the horizon over which it is noise.

Forbid cross-horizon comparison in the model itself: an activation cost-per-acquisition figure and a
brand share movement are not comparable numbers and must never appear in the same efficiency ranking.

### Step 7 — Feasibility, marked honestly

Per metric, one of three:

| Mark | Meaning |
|------|---------|
| **INSTRUMENTED** | The instrument exists and has been validated. An unvalidated instrument produces numbers indistinguishable from valid ones — say which are validated |
| **INSTRUMENTABLE** | Can be measured, with the cost stated |
| **NOT FEASIBLE** | Cannot be measured at acceptable cost with what exists |

**Never quietly drop a NOT FEASIBLE metric and substitute an easier proxy.** Report it as an open
measurement gap. Measurability must not become importance. Absence of measurement is not evidence of
absence: an effect measured outside its window, or never instrumented, has not been shown to be zero.

### Step 8 — Escalate proxy substitutions

Where an existing metric is a proxy standing in for an objective nobody measures directly, escalate it
to `@marketing-chief`. A substituted objective is a squad-level problem, not a dashboard problem.

Note the sequencing rule that belongs with the escalation: commission the real measurement first, run
both in parallel for one cycle, then retire the proxy. Retiring the proxy first leaves the objective
entirely untracked, which is worse than the proxy, because a gap that looks like coverage is not
visible.

### Step 9 — Separate allocation from causation

Where the model carries any attribution-based metric, state plainly that attribution allocates credit
and does not establish cause. Last-click is a reporting convention, not a finding — and "we do not use
a model" always means last-click. Structurally invisible contributors — offline touchpoints,
unlinkable cross-device journeys, dark social, word of mouth, long-window brand effects — receive zero
credit under every click-based model regardless of their real contribution.

Any causal claim in the model requires a control. Route it to incrementality design rather than
letting the model imply causation it cannot support.

### Step 10 — Output and hand off

Output the model as a single table plus the list of gaps. Then hand the instrumentation requirements —
events, properties, identity basis, retention, granularity, and how each instrument will be validated
— to `@data-engineer` for modelling and to `@pm` for story framing.

This agent specifies requirements and validates that what was built measures what was specified. It
does not write instrumentation code, does not run migrations, and does not push.

## Boundary

| Out of scope | Owner |
|--------------|-------|
| Which objectives matter | `@brand-lead` and `@demand-lead` |
| Effect windows and payback periods | `@demand-lead` |
| Beats, formats and editorial success intent | `@content-lead` |
| Statistical design for product-surface experiments | `@products:experimentation-lead` — coordinate, do not duplicate |
| Customer research design | `@products:discovery-lead` |
| Schema, pipelines, queries, migrations | `@data-engineer` |
| Epic framing, stories, implementation, quality gates, push | `@pm`, `@sm`, `@dev`, `@qa`, `@devops` |

## Acceptance criteria

- [ ] Business objectives were taken from `@demand-lead` and `@brand-lead`, not invented here
- [ ] The model is built top down; no metric entered because the tool already captures it
- [ ] Each goal carries two to three metrics, each passing the decision test
- [ ] Every metric has a target set in advance, with its basis stated
- [ ] Every metric names the segments it must be read through, and each segment passes the actionability test
- [ ] Every metric names the horizon over which it is interpretable, taken from `@demand-lead`
- [ ] No short-horizon and long-horizon metrics share an efficiency ranking
- [ ] Every metric is marked INSTRUMENTED, INSTRUMENTABLE with cost, or NOT FEASIBLE
- [ ] No NOT FEASIBLE metric was replaced by an easier proxy; each is reported as an open gap
- [ ] Every proxy standing in for an unmeasured objective is escalated to `@marketing-chief`
- [ ] Attribution metrics are labelled as allocation, not as cause
- [ ] Residual uncertainty is stated inline with the number, not footnoted
- [ ] Instrumentation requirements are handed to `@data-engineer` and `@pm`; no code is written here

## Handoff

| To | Carrying |
|----|----------|
| `@demand-lead` | Which effects can be measured over which horizon, and which cannot — so budget arguments rest on provable claims or on stated uncertainty |
| `@brand-lead` | Whether the tracker can carry the specified CEP-linked recall, asset fame and uniqueness, and penetration readings |
| `@content-lead` | Which per-beat success definitions are measurable, and which are proxies |
| `@marketing-chief` | Proxy substitutions, and any measurement gap that leaves a stated objective untracked |
| `@data-engineer` | The instrumentation specification, for modelling |
| `@pm` | The instrumentation work, for epic and story framing through the normal pipeline |

## Related

- **Agent:** `squads/marketing/agents/analytics-lead.md` (Cipher)
- **Manifest:** `squads/marketing/squad.yaml`
- **Upstream:** `squads/marketing/tasks/demand-lead-split-decision.md`, `squads/marketing/tasks/brand-lead-brand-audit.md`
- **Entry point:** `squads/marketing/tasks/marketing-chief-diagnose.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
