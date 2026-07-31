---
task: Design Controlled Experiment
responsavel: "@experimentation-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - change: The change under test, described precisely enough to implement (required)
  - mechanism: Why the change is expected to move the metric, and in which direction (required)
  - decision: The decision the result must support, and who owns it (required)
  - baseline_metrics: Current values and variance for the candidate OEC and guardrails (required)
  - available_traffic: Eligible units per day, and the interference structure between them (required)
  - claim_source: The squad agent whose claim is being tested, when the hypothesis came from one (optional)
  - output_dir: Directory for experiment artifacts (optional, default: docs/product/experiments/)
Saida: |
  - design_doc: Pre-registered design containing hypothesis, randomization unit, triggering, OEC, guardrails, MDE, power, duration, analysis plan, ramp and abort conditions
  - oec: The single metric or explicitly weighted combination on which the ship decision turns, registered before exposure
  - guardrail_set: Organizational and trust guardrails with breach thresholds that block a ship regardless of the OEC
  - power_result: Required sample per arm and duration, plus the effects the available traffic cannot detect
  - feasibility_verdict: Whether this decision can be made by experiment at all
Checklist:
  - "[ ] State the hypothesis with mechanism and expected direction"
  - "[ ] Choose the randomization unit against the interference structure"
  - "[ ] Define the triggering condition and its symmetric counterfactual"
  - "[ ] Register the OEC before any exposure"
  - "[ ] Run the gameability check on the OEC"
  - "[ ] Define guardrails with breach thresholds"
  - "[ ] Set the minimum detectable effect from the decision, not from the hope"
  - "[ ] Compute sample size and duration, covering whole weekly cycles"
  - "[ ] Declare fixed horizon or a sequential method, and pre-register any segments"
  - "[ ] Plan the exposure ramp with trust checks and abort conditions at each step"
  - "[ ] Name the decision owner and the readout date"
  - "[ ] Write the pre-registered design to the repository before traffic is exposed"
---

# *design-experiment — Design a Trustworthy Controlled Experiment

Materializes `@experimentation-lead *design-experiment`, and produces the inputs consumed by
`*sample-size`, `*guardrails`, `*oec` and `*ramp-plan`.

## Purpose

Produce a design that can support a decision. The hard part of A/B testing is not running the
test — it is establishing that the result is trustworthy, and that work happens before any traffic
is exposed. Everything registered here is registered while the data is still invisible, because a
metric chosen after the data is visible converts an experiment into a search.

This task designs and pre-registers. It does not analyse results, call a winner, or implement
instrumentation.

## Preconditions

1. `baseline_metrics` includes variance, not only the mean. Sample size cannot be computed from a
   mean alone.
2. The interference structure is known: do units influence each other through a social graph,
   shared inventory, a marketplace, a team account, or a shared cache? This determines the
   randomization unit and cannot be deferred.
3. The decision owner is named. An experiment with no decision owner produces a number nobody is
   obliged to act on.
4. If `claim_source` names another squad agent, that claim arrives here as a hypothesis, not as a
   conclusion. A positioning frame or a tier restructure runs only with a pre-registered OEC and
   guardrails.

## Procedure

### Step 1 — Hypothesis

State the change, the mechanism by which it is expected to work, the expected direction, and a
rough expected size. A hypothesis with no mechanism cannot be falsified usefully — when the result
is null, nobody can say which part was wrong.

### Step 2 — Randomization unit

| Condition | Unit |
|---|---|
| The effect persists across sessions, or the user is logged in | User |
| The effect is contained within a visit and consistency is not required | Session |
| Units influence each other — social graph, marketplace supply, shared inventory, team accounts | Cluster |
| Interference is unavoidable and clusters are not separable | Time-based switchback |
| Backend change invisible to users, with no cross-unit effect | Request-level, analysed at the unit that matches the metric |

Rule: the analysis unit must match or be coarser than the randomization unit. Randomize by user
and analyse by page view and the variance is understated, producing confident nonsense. For ratio
metrics with a varying denominator, declare the delta method or bootstrap here.

### Step 3 — Triggering

Define who counts as exposed, and the symmetric counterfactual trigger in control. Apply it
identically to both arms.

Then quantify the dilution cost: if untriggered users were included, by how much would the effect
be attenuated toward zero? Analysing untriggered users biases the effect toward zero and destroys
sensitivity, which causes real effects to be discarded as null.

### Step 4 — Register the OEC

Choose one metric, or an explicitly weighted combination, on which the ship decision turns. Record
it now, before exposure.

Run three checks:

- **Sensitivity.** Can it move within the experiment horizon at the expected effect size?
- **Causal link.** Is it believed, with a stated argument, to predict long-term value?
- **Gameability.** Is the cheapest way to move it a degradation of the product? If so, the metric
  will eventually select for that degradation regardless of anyone's intent. Choose a different
  OEC.

Also record the driver metrics that would explain the mechanism if the OEC moves. They do not
decide the ship; they explain it.

### Step 5 — Guardrails

| Type | Examples | Breach threshold |
|---|---|---|
| Organizational | p95 latency, error and crash rate, revenue per user, unsubscribe rate, support contact rate, refund rate | {stated per metric} |
| Trust | Sample ratio, telemetry loss rate, assignment consistency, cache hit rate | {stated per metric} |

A guardrail breach blocks the ship even when the OEC moves, and aborts the run without requiring a
significance test. For any revenue-affecting change, both conversion and revenue per user are
guardrailed in both directions — a conversion win that lowers revenue per visitor is not a win.

Ask the decision owner directly: **what result would make you not ship this?** That answer is the
guardrail. Record it before launch.

### Step 6 — Minimum detectable effect

The MDE is a business decision, not a statistical one. Ask what size of effect would change the
decision, and power for that. Powering for an effect nobody would act on wastes the traffic;
powering for the effect we hope to see produces an underpowered test dressed as a real one.

### Step 7 — Power, sample size and duration

Compute the required sample per arm from the MDE, the metric variance at the analysis unit, alpha
(conventionally 0.05) and target power (conventionally 0.80). For a two-arm comparison of means at
80% power and alpha 0.05, required n per arm is approximately sixteen times the metric variance
divided by the squared absolute effect size.

Then set duration as the larger of:

- the power requirement, and
- whole weekly cycles plus enough time for novelty and primacy effects to decay.

Reading at the point power is reached, when that is day three, measures the reaction to change
rather than the value of the change.

Where a strong pre-period covariate exists, record that covariate adjustment using pre-period data
can substantially cut the required sample.

**Feasibility verdict.** If `available_traffic` cannot reach the sample within a tolerable
duration, say so now and state the options: raise the MDE and accept that smaller wins are
invisible; choose a more sensitive proxy metric with a defensible causal link to the OEC; extend
duration if the cycle allows; or accept that this decision cannot be made by experiment and make
it another way, explicitly. Running an underpowered test and reading the point estimate is not on
the list.

### Step 8 — Analysis plan

Declare, before launch:

- **Fixed horizon** with a single analysis at a stated date, **or** a **sequential method** and its
  boundaries. Choose now. Repeatedly testing accumulating data and stopping at significance
  inflates the false positive rate far above the nominal alpha, and switching to a sequential
  method after the data looks good is the same error.
- **Pre-registered segments**, if any. Segments not registered here are hypothesis generation and
  can never support a ship decision.
- **Variance method** for ratio metrics.
- **Outlier rule** for heavy-tailed metrics such as revenue — capping or winsorizing, declared now,
  not after seeing the tail.

Guardrails may be monitored continuously throughout; the OEC may not.

### Step 9 — Ramp and abort

| Step | Exposure | Checks at this step | Abort if |
|---|---|---|---|
| 1 | 1% for 24h | SRM, error rate, telemetry loss | Any guardrail breach or SRM |
| 2 | 5% for 24h | Guardrail stability | Any guardrail breach or SRM |
| 3 | 50/50 for the remainder | Trust checks, then wait for the horizon | Any guardrail breach or SRM |

Do not pool across ramp steps when analysing. Traffic mix differs between steps, and pooling
across periods with different mixes can reverse the sign of the effect.

### Step 10 — Write and register the design

Create `output_dir` if absent. Write `experiment-{slug}-design.md` before any traffic is exposed,
containing every element above plus the named decision owner and the readout date.

Registration is the point. A design written after exposure is a description, not a
pre-registration, and cannot rule out the metric-selection problem it exists to prevent.

## Acceptance Criteria

- The hypothesis states the change, the mechanism, the expected direction and a rough size.
- The randomization unit is chosen against the interference structure and stated, and the analysis
  unit is no finer than it.
- The triggering condition is defined with a symmetric counterfactual, and the dilution cost of
  omitting it is quantified.
- Exactly one OEC is registered before exposure, and it passed the sensitivity, causal-link and
  gameability checks.
- Guardrails are defined with breach thresholds, and revenue-affecting changes carry both
  conversion and revenue guardrails.
- The MDE is derived from what would change the decision, not from the hoped-for effect.
- Sample size and duration are computed, and duration covers whole weekly cycles plus novelty
  decay.
- The analysis plan declares a fixed horizon or a named sequential method, pre-registers any
  segments, states the variance method for ratio metrics, and states the outlier rule.
- The ramp plan has trust checks and abort conditions at each step.
- The decision owner and readout date are named.
- The design document exists in the repository before any traffic is exposed.
- If the available traffic cannot support the design, the feasibility verdict says so explicitly
  and lists the options.
- No result was analysed and no ship decision was made by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@data-engineer` | Instrumentation is required: assignment logging, event pipeline, metric definitions, telemetry coverage |
| `@dev` | The change and the assignment mechanism must be implemented, server-side where redirects would cost users |
| `@pricing-strategist` | The design is for a price or packaging test, so revenue and conversion guardrails are agreed together before launch |
| `@positioning-lead` | The hypothesis originated as a frame-of-reference claim and its population must be confirmed |
| `@discovery-lead` | The mechanism is unclear and needs qualitative work before the design is worth running |
| `@jobs-analyst` | The hypothesis may be targeting the wrong job, which would explain an expected null |
| `@product-strategist` | The result would change roadmap sequencing, or a repeatedly disproven idea should leave the backlog |
| `@products-chief` | The design conflicts with squad-level direction, or the ship decision needs arbitration |
| `@qa` | A guardrail candidate traces to a known defect rather than to the change under test |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments: A Practical Guide
  to A/B Testing* (2020) — OEC construction, the metric taxonomy of goal, driver, guardrail and
  trust metrics, power and sample size, triggering and dilution, randomization unit selection,
  ramp-up, and the validity threat catalogue: sample ratio mismatch, peeking, novelty and primacy,
  Simpson's paradox, multiple comparisons, interference, variance misestimation and outliers.
  Twyman's law — any figure that looks interesting or different is usually wrong — governs the
  ordering of trust checks before interpretation.

`@experimentation-lead` (Vernier) is a specialist applying this framework.

## Related

- Agent: `squads/products/agents/experimentation-lead.md`
- Test design discipline reused for design review: `.aexos-core/development/tasks/qa-test-design.md`
- Elicitation for hypothesis and MDE definition: `.aexos-core/development/tasks/advanced-elicitation.md`
- Applied to the design before registration: `.aexos-core/development/checklists/self-critique-checklist.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
