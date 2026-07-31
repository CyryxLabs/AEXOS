# Experiment Design — Pre-Registration Document

**Owner:** `@experimentation-lead` (Vernier)
**Produced by:** `*design-experiment` — `squads/products/tasks/design-controlled-experiment.md`
**Gated by:** `squads/products/checklists/experiment-launch-checklist.md` (PRD-CL-008)
**Successor artifact:** `squads/products/templates/experiment-readout-tmpl.md`
**Suggested path:** `docs/product/experiments/experiment-{slug}-design.md`

[[LLM: INITIALIZATION INSTRUCTIONS — EXPERIMENT PRE-REGISTRATION

This template is completed BEFORE any traffic is exposed. That is not a formality; it is
the entire point. A design written after exposure is a description, not a pre-registration,
and cannot rule out the metric-selection problem it exists to prevent.

EXECUTION APPROACH:
1. Fill sections 1-11 in order. The order is the design chain — later sections depend on
   decisions locked in earlier ones.
2. Every field carries a "How to fill", a "Bad answer" and a "Prevents" note. Read them.
   A field filled without reading its note is usually filled with the hoped-for answer.
3. Do not leave a field as TBD. An unfillable field is a finding: it means the experiment
   is not ready, or the decision cannot be made by experiment at all. Say which.
4. Numbers in the worked examples throughout are ILLUSTRATIVE PLACEHOLDERS. Replace all of
   them. Never carry an example number into a real design.
5. When this document is complete, run PRD-CL-008 against it. Exposure begins only after a
   GO verdict and a committed copy of this file.

BOUNDARY: this document designs and registers. It does not implement the change (@dev), does
not build the event pipeline, metric definitions or warehouse tables (@data-engineer), does
not run test automation or CI quality gates (@qa), does not create stories (@sm), does not
write epics or PRDs (@pm), and does not push or publish (@devops — exclusive).]]

---

## 0. Registration Record

| Field | Value |
|---|---|
| Experiment name | [Short, specific. "Simplified checkout step", not "Checkout improvements"] |
| Slug | [kebab-case identifier used in filenames and the memory record] |
| Registered on | [YYYY-MM-DD — must precede first exposure] |
| Registered by | [Name / agent] |
| Decision owner | [Named person or role. See section 11] |
| Claim source | [Agent or document the hypothesis came from, e.g. `@positioning-lead` frame, `@pricing-strategist` tier restructure — or "internal"] |
| Status | Registered / Ramping / Running / Analyzed / Voided / Abandoned |
| Commit reference | [Commit hash of this file, added by the committing agent before exposure] |

> **How to fill:** the commit reference is what makes pre-registration auditable. Without a
> timestamped artifact in the repository predating exposure, "we decided this in advance" is
> an unverifiable claim.
> **Bad answer:** filling `Registered on` with today's date while traffic is already flowing.
> **Prevents:** retroactive registration; OEC selection after the data is visible.

**Claims arriving from other squad agents are hypotheses, not conclusions.** A positioning
frame or a tier restructure runs here only with a pre-registered OEC and guardrails, or it
does not run.

---

## 1. Hypothesis

**Change under test:**
[Describe the change precisely enough that an engineer could implement it and a reviewer
could tell whether it shipped as designed.]

**Mechanism:**
[Why is this change expected to move the metric? State the causal chain: the change alters
X, which reduces/increases Y, which shows up in the OEC as Z.]

**Expected direction:**
[Increase / decrease in the OEC. Committed now, before the data.]

**Expected rough size:**
[A number or a range, with where it came from: a prior experiment, a funnel drop-off, a
qualitative finding. "We hope it's big" is not a size.]

**What would falsify this:**
[If the result is null, which part of the mechanism was wrong? Name the link that would
have to be broken.]

> **How to fill:** a hypothesis is a mechanism plus a direction plus a rough size. Write the
> mechanism first; the direction and size follow from it.
> **Bad answer:** "The new design will improve engagement." No mechanism, no direction on a
> named metric, no falsifier.
> **Prevents:** an unfalsifiable design. When a hypothesis has no mechanism and the result is
> null, nobody can say which part was wrong, so the idea returns unchanged next quarter.

---

## 2. Randomization Unit

**Chosen unit:** [User / Session / Cluster / Time-based switchback / Request-level]

**Interference assessment (the justification):**

| Question | Answer | Implication |
|---|---|---|
| Does the effect persist across sessions? | [Yes/No] | Yes → user-level |
| Is the user logged in at the point of exposure? | [Yes/No] | Yes → user-level is available and consistent |
| Do units influence each other? (social graph, marketplace supply, shared inventory, team accounts, shared cache) | [Yes/No — describe the channel] | Yes → cluster-level |
| Is interference unavoidable and are clusters inseparable? | [Yes/No] | Yes → time-based switchback |
| Is this a backend change invisible to users with no cross-unit effect? | [Yes/No] | Yes → request-level acceptable |

**Selection rule applied:**

| Condition | Unit |
|---|---|
| Effect persists across sessions, or user is logged in | User |
| Effect contained within a visit; consistency not required | Session (higher power, risks inconsistent experience) |
| Units influence each other | Cluster |
| Interference unavoidable, clusters inseparable | Time-based switchback |
| Backend change invisible to users, no cross-unit effect | Request-level, analyzed at the unit matching the metric |

**Analysis unit:** [Must match or be coarser than the randomization unit]

**Variance method for ratio metrics:** [Delta method / bootstrap / not applicable —
declared here, not chosen at analysis time]

> **How to fill:** answer the interference questions with evidence about this system, not
> with a default. The interference structure determines the unit and cannot be deferred.
> **Bad answer:** "User-level, that's what we always do" for a marketplace where treated
> sellers compete with control sellers for the same buyers.
> **Prevents:** understated variance and confidently wrong intervals when the analysis unit
> is finer than the randomization unit (randomize by user, analyze by page view); and biased
> estimates in an unpredictable direction when treatment leaks into control.

---

## 3. Triggering Condition

**Triggered = a unit that:**
[State the exact condition under which a unit is considered exposed to the change.]

**Symmetric counterfactual in control:**
[State the identical condition evaluated in the control arm. The control trigger must fire
on the same population under the same rule — including the code path that would have shown
the change had the unit been in treatment.]

**Symmetry verification method:**
[How will you confirm at analysis time that the trigger fired identically in both arms?
Name the query or the logged event.]

**Dilution cost if triggering were omitted:**

| Quantity | Value |
|---|---|
| Estimated triggering rate | [% of eligible units that trigger — ILLUSTRATIVE: 30%] |
| Effect on triggered users | [Expected effect within the triggered population] |
| Effect if untriggered users were included | [Attenuated toward zero roughly in proportion to the untriggered share] |
| Consequence | A real effect could be measured as null and discarded |

> **How to fill:** describe the trigger as a logged, queryable condition, not as a narrative.
> Then state the counterfactual explicitly — this is the field most often left implicit and
> most often wrong.
> **Bad answer:** "Users who see the new banner" with no counterfactual defined in control.
> The control arm then has no comparable population and the trigger is asymmetric by
> construction.
> **Prevents:** dilution — untriggered users bias the effect toward zero and destroy
> sensitivity — and asymmetric triggering, which is a trust-check failure that voids the
> analysis rather than weakening it.

---

## 4. Overall Evaluation Criterion (OEC)

**OEC:** [Exactly one metric, or an explicitly weighted combination with the weights stated]

**Metric definition:** [Numerator, denominator, unit of analysis, and the source definition
it traces to. If the definition does not yet exist in the warehouse, this is a handoff to
`@data-engineer` before launch, not a note to resolve later.]

**Weighted combination (only if applicable):**

| Component metric | Weight | Rationale for this weight |
|---|---|---|
| [metric] | [w — ILLUSTRATIVE: 0.7] | [why] |
| [metric] | [w — ILLUSTRATIVE: 0.3] | [why] |

### 4.1 The three OEC checks

**Sensitivity check:**
[Can this metric move detectably within the experiment horizon at the expected effect size?
State the baseline and variance that support the answer.]

**Causal-link check:**
[The stated argument that this short-term measurable proxy predicts long-term value. Name
the goal metric it is a proxy for and the evidence for the link — a prior experiment, a
longitudinal correlation with a stated caveat, or a documented mechanism.]

**Gameability check:**
[What is the cheapest way to move this metric? If the cheapest way is to degrade the
product — dark patterns, forced interactions, removing an exit — the metric is broken.
Choose a different OEC. Answer with the cheapest degradation you can actually think of, not
with "nothing.".]

**Gameability verdict:** [PASS — the cheapest path to moving it is genuine improvement /
FAIL — choose a different OEC and re-run these checks]

### 4.2 Driver metrics (explain, do not decide)

| Driver metric | What it would explain if the OEC moves |
|---|---|
| [metric] | [mechanism it evidences] |

> **How to fill:** register the OEC now, while the data is invisible. Sensitivity is
> necessary but not sufficient — an OEC that is easy to move by degrading the product is a
> broken OEC even when it is highly sensitive.
> **Bad answer:** three co-equal "primary metrics", which is a search across metrics wearing
> a design's clothing; or an OEC that is obviously gameable with the gameability field filled
> in as "N/A".
> **Prevents:** OEC selection after the data is visible, which converts an experiment into a
> search and guarantees a finding; and a metric that eventually selects for product
> degradation regardless of anyone's intent.

**Attribution:** the goal / driver / guardrail / trust taxonomy and the OEC requirements
applied here are published method — Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online
Controlled Experiments: A Practical Guide to A/B Testing* (2020).

---

## 5. Guardrails and Breach Thresholds

**The eliciting question — ask the decision owner directly and record the answer verbatim:**
*"What result would make you not ship this?"* That answer is the guardrail.

**Recorded answer:** [verbatim]

### 5.1 Organizational guardrails

| Guardrail | Definition | Breach threshold | Direction | Action on breach |
|---|---|---|---|---|
| p95 latency | [definition] | [ILLUSTRATIVE: +50ms] | Increase is bad | Abort |
| Error / crash rate | [definition] | [ILLUSTRATIVE: +0.1pp absolute] | Increase is bad | Abort |
| Revenue per unit | [definition] | [ILLUSTRATIVE: -1% relative] | Decrease is bad | Abort |
| Unsubscribe rate | [definition] | [threshold] | Increase is bad | Abort |
| Support contact rate | [definition] | [threshold] | Increase is bad | Abort |
| [Domain-specific, e.g. refund rate] | [definition] | [threshold] | [direction] | [action] |

### 5.2 Trust guardrails

| Trust guardrail | Definition | Threshold | Action on breach |
|---|---|---|---|
| Sample ratio | Observed split vs designed split, chi-square | Investigate below p = 0.001 | VOID — do not analyze |
| Telemetry loss rate | Missing-event rate per arm | Comparable across arms; declare the tolerance now from this platform's measured baseline. No general tolerance constant is asserted here — `[verify against source]` before quoting one | Investigate; likely void |
| Assignment consistency | Units switching arm mid-run | [declare tolerance] | Investigate; likely void |
| Cache hit rate | [definition] | [declare tolerance] | Investigate |

### 5.3 Revenue-affecting changes

If this change can affect revenue, both conversion and revenue per unit are guardrailed in
both directions.

- [ ] This change is revenue-affecting → both metrics registered above
- [ ] This change is not revenue-affecting → state why: [reason]

> **How to fill:** a threshold is a number plus a direction plus an action. "Monitor latency"
> is not a guardrail. Set thresholds from what the organization can actually absorb, not from
> what the change is expected to cost.
> **Bad answer:** guardrails listed without thresholds, so that at readout the breach becomes
> a negotiation.
> **Prevents:** shipping on a metric win while latency, revenue per unit or error rate has
> degraded. A guardrail breach blocks the ship even when the OEC moves, and aborts the run
> without requiring a significance test.

---

## 6. Minimum Detectable Effect (MDE)

**MDE:** [Effect size, relative or absolute — state which]

**The decision it is derived from:**
[What would the organization do differently at this effect size that it would not do at a
smaller one? Name the action and its cost.]

**Cost recovered at the MDE:**
[Engineering cost, maintenance cost, complexity cost — and the effect size at which the
change pays for itself.]

**Explicitly NOT the MDE:** [The effect we hope to see, if it differs. Record it here so
nobody later substitutes it.]

> **How to fill:** the MDE is a business decision, not a statistical one. Ask what size of
> effect would change the decision, then power for that.
> **Bad answer:** an MDE reverse-engineered from the traffic available ("we can detect 3%, so
> the MDE is 3%"). That is a feasibility statement wearing an MDE's clothing — record it in
> section 7 as the feasibility verdict instead.
> **Prevents:** powering for an effect nobody would act on, which wastes the traffic; and
> powering for the hoped-for effect, which produces an underpowered test dressed as a real
> one.

---

## 7. Baseline, Variance, Power, Sample Size and Duration

### 7.1 Baseline and variance

| Input | Value | Source (query, dashboard, metric definition) |
|---|---|---|
| Baseline OEC value | [ILLUSTRATIVE: 12.4%] | [source] |
| Metric variance at the analysis unit | [value] | [source] |
| Eligible units per day | [value] | [source] |
| Triggering rate | [%] | [source] |
| Triggered units per day per arm | [value] | [derived — show the arithmetic] |

**Article IV — No Invention:** every value above traces to a query, a metric definition or a
documented method. A baseline with no source is not a baseline.

### 7.2 Power calculation

| Parameter | Value |
|---|---|
| Alpha | 0.05 (conventional) — [state if different and why] |
| Target power | 0.80 (conventional) — [state if different and why] |
| MDE (from section 6) | [value] |
| Metric variance | [value] |
| Required n per arm | [value] |
| Method used | [Exact power calculation / rule of thumb — state which] |

**Rule of thumb** (for a two-arm test comparing means at 80% power and alpha 0.05): required
n per arm is approximately sixteen times the metric variance divided by the squared absolute
effect size. Use it as a sanity check on a computed number, and say which one this row used.

**Variance reduction:**
[Where a strong pre-period covariate exists, covariate adjustment using pre-period data
(CUPED-style) can substantially cut the required sample size. State whether such a covariate
exists, its pre-period correlation with the OEC, and whether the adjustment will be applied.
If it will be applied, it is declared here, not adopted at analysis time.]

### 7.3 Duration

| Driver | Duration it implies |
|---|---|
| Power requirement | [ILLUSTRATIVE: 3 days] |
| Whole weekly cycles | [ILLUSTRATIVE: 14 days] |
| Novelty and primacy decay | [duration and the basis for it — no general decay period is asserted here; derive it from this product's own trend data or from a prior experiment on this surface. `[verify against source]` before quoting any general figure] |
| **Duration (the LARGER of the above)** | **[value]** |

**Which driver set the duration:** [Power / cycles / decay]

**If power set it and it is shorter than a whole weekly cycle, extend it.** Reading at the
point power is reached, when that is day three, measures the reaction to change rather than
the value of the change.

### 7.4 Feasibility verdict

| Verdict | Meaning |
|---|---|
| [ ] FEASIBLE | Available traffic reaches the required sample within the stated duration |
| [ ] INFEASIBLE | It does not. Options below, one selected |

If INFEASIBLE, select and justify one:

- [ ] Raise the MDE to what the traffic can detect, and accept explicitly that smaller wins
      are invisible → new MDE: [value]
- [ ] Choose a more sensitive proxy metric with a defensible causal link to the OEC →
      metric: [value], causal argument: [text]
- [ ] Apply variance reduction with a pre-period covariate → covariate: [value]
- [ ] Extend duration, if the cycle allows → new duration: [value]
- [ ] Accept that this decision cannot be made by experiment, and make it another way,
      explicitly → the other way: [text]

**Not on the list:** running an underpowered test and reading the point estimate.

> **How to fill:** state what the available traffic can and cannot detect before running,
> not after.
> **Bad answer:** omitting the feasibility verdict because the numbers were uncomfortable.
> **Prevents:** an underpowered test, which cannot produce a usable negative result — it
> produces an unfalsifiable one.

---

## 8. Analysis Plan

**Stopping rule — choose exactly one, now:**

- [ ] **Fixed horizon.** Single analysis at [date]. The OEC will not be inspected before
      that date by anyone.
- [ ] **Sequential method.** Method: [name the method your platform implements]. Boundaries:
      [state them]. Declared before launch.

**Switching to a sequential method after the data looks good is the same error as peeking.**

**What may be monitored continuously:** guardrails and trust metrics only.
**What may not:** the OEC.

**OEC access control:** [Who has dashboard access to the OEC during the run, and how is
inadvertent peeking prevented? Name the mechanism, e.g. the metric is hidden from the
experiment dashboard until the horizon.]

**Pre-registered segments:**

| Segment | Hypothesis for this segment | Why registered |
|---|---|---|
| [ILLUSTRATIVE: new vs returning users] | [directional hypothesis] | [mechanism] |

**Segments not listed above are hypothesis generation and can never support a ship
decision.** State this explicitly in the readout when one is reported.

**Multiple comparisons handling:**
[Number of metrics × number of segments that will be tested, and the handling: a correction
applied, or the extras explicitly labelled hypothesis generation. State the count now — it
is the count that makes the correction computable.]

**Variance method for ratio metrics:** [Delta method / bootstrap / not applicable]

**Outlier rule:** [Capping or winsorizing rule for heavy-tailed metrics such as revenue,
with the exact rule and the threshold — declared now, not after seeing the tail. Or:
"no capping, and here is why the metric is not heavy-tailed".]

> **How to fill:** every decision in this section must be unambiguous enough that an analyst
> who was not present could execute it without asking a question.
> **Bad answer:** "We'll monitor and decide when it looks stable." That is peeking with a
> schedule.
> **Prevents:** peeking — repeated significance testing without correction inflates the false
> positive rate far above the nominal alpha; post-hoc segment scanning; and outlier rules
> chosen to produce the desired answer.

---

## 9. Ramp Plan and Abort Conditions

| Step | Exposure | Duration | Checks at this step | Abort if |
|---|---|---|---|---|
| 1 | 1% | 24h | SRM, error rate, telemetry loss | Any guardrail breach or SRM |
| 2 | 5% | 24h | Guardrail stability | Any guardrail breach or SRM |
| 3 | 50/50 | Remainder to horizon | Trust checks, then wait for the horizon | Any guardrail breach or SRM |

[Adjust the steps to this system. The percentages above are the typical sequence, not a law.
Whatever steps you choose, each one carries checks and an abort condition.]

**Purpose of the ramp:** limit blast radius and surface trust failures before full exposure.

**Abort authority:** [Who can abort, and how fast can exposure be removed? State the
mechanism and its latency.]

**Pooling rule:** **do not pool across ramp steps when analyzing.** Traffic mix differs
between steps, and pooling across periods with different mixes can reverse the sign of the
effect. State the window that will be analyzed: [from step 3 start to horizon].

> **How to fill:** name the abort mechanism, not just the abort condition. An abort condition
> with a four-hour deploy behind it is a four-hour breach.
> **Bad answer:** ramping straight to 50/50 because "it's a small change".
> **Prevents:** an undetected trust failure running at full exposure; and Simpson's paradox
> generated by our own ramp-up, where the pooled effect contradicts every individual period.

---

## 10. Instrumentation Requirements (handoff, not implementation)

| Requirement | Owner | Status |
|---|---|---|
| Assignment logging at the randomization unit | `@data-engineer` | [ ] |
| Trigger event logged in both arms | `@data-engineer` | [ ] |
| OEC metric definition exists and is queryable | `@data-engineer` | [ ] |
| Guardrail metric definitions exist | `@data-engineer` | [ ] |
| Telemetry coverage measurable per arm | `@data-engineer` | [ ] |
| Assignment mechanism implemented server-side where a redirect would cost users | `@dev` | [ ] |

> **How to fill:** list the requirement and the owner. This section is a handoff record, not
> a work plan — this squad does not implement instrumentation.
> **Bad answer:** launching with "we'll add the trigger event later". The experiment then
> cannot pass its own trust checks.
> **Prevents:** trust-check failures caused by instrumentation gaps, which void the
> experiment after the traffic has already been spent.

---

## 11. Decision Owner and Readout

| Field | Value |
|---|---|
| Decision owner (named person) | [name] |
| Decision they will make | [ship / no-ship / iterate on what] |
| Readout date | [YYYY-MM-DD — at or after the horizon] |
| Readout artifact | `docs/product/experiments/experiment-{slug}-readout.md` |
| Escalation if the decision is contested | `@products-chief` |

> **How to fill:** a name, not a team. An experiment with no decision owner produces a number
> nobody is obliged to act on.
> **Bad answer:** "Product leadership will decide."
> **Prevents:** a result that circulates as a screenshot and changes nothing, while the
> underlying idea returns in the next planning cycle.

---

## 12. Prior Art from Institutional Memory

| Prior experiment | Result | Why this design is not a repeat |
|---|---|---|
| [slug or "none found"] | [ship / no-ship / void] | [what changed] |

> **How to fill:** search the experiment memory record before designing. If this idea has
> been tested and disproved, say what is different this time.
> **Prevents:** re-funding a disproven idea. Most ideas fail — published rates from large
> experimentation programs put the share of ideas that improve the target metric at roughly
> one in three or lower — so the memory record is where most of the value of the program
> accumulates.

---

## Pre-Exposure Gate

- [ ] Sections 0-12 complete, with no TBD fields
- [ ] PRD-CL-008 (`experiment-launch-checklist.md`) run with a GO verdict
- [ ] This file committed to the repository, with the commit reference recorded in section 0
- [ ] Instrumentation handoffs in section 10 confirmed complete by their owners

**Exposure begins only after all four boxes are checked.**

---

## Method Attribution

The framework applied here is published work, cited so it can be checked at the source.

- Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments: A Practical
  Guide to A/B Testing* (2020) — OEC construction; the metric taxonomy of goal, driver,
  guardrail and trust metrics; power and sample size; triggering and dilution; randomization
  unit selection; ramp-up; and the validity threat catalogue: sample ratio mismatch, peeking,
  novelty and primacy, Simpson's paradox, multiple comparisons, interference, variance
  misestimation and outliers. Twyman's law — any figure that looks interesting or different
  is usually wrong — governs the ordering of trust checks before interpretation.

`@experimentation-lead` (Vernier) is a specialist applying this framework.

---

## Related

- Task: `squads/products/tasks/design-controlled-experiment.md`
- Agent: `squads/products/agents/experimentation-lead.md`
- Pre-launch gate: `squads/products/checklists/experiment-launch-checklist.md` (PRD-CL-008)
- Pre-analysis gate: `squads/products/checklists/experiment-trust-checklist.md` (PRD-CL-007)
- Pitfall taxonomy: `squads/products/data/experiment-pitfalls.yaml`
- Metric taxonomy: `squads/products/data/metric-taxonomy.yaml`
- Readout template: `squads/products/templates/experiment-readout-tmpl.md`
