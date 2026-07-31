# Experiment Launch Checklist — Pre-Launch Design Gate

**Checklist ID:** PRD-CL-008
**Referenced by:** `@experimentation-lead` (Vernier)
**Runs against:** a completed `experiment-{slug}-design.md` produced from
`squads/products/templates/experiment-design-tmpl.md`
**Runs before:** any traffic is exposed, including the 1% ramp step
**Purpose:** Verify that the design is complete, powered, guarded and owned before the
traffic is spent. Produces a scored grade and a GO / NO-GO verdict.

[[LLM: INITIALIZATION INSTRUCTIONS — LAUNCH GATE

This checklist audits a DESIGN, not a result. It runs while the data is still invisible.
Everything it checks is cheap to fix now and impossible to fix later: an experiment that
launches with an unpowered MDE, an undefined guardrail or a missing decision owner cannot be
repaired at analysis time, only re-run.

EXECUTION APPROACH:
1. Check each item against the actual design document, not against the designer's summary of
   it. Quote or cite the section that satisfies each item.
2. Mark [x] present and correct, [ ] missing or incorrect, [N/A] genuinely not applicable
   with a stated reason.
3. CRITICAL items are marked (CRITICAL). Any unchecked CRITICAL item forces NO-GO regardless
   of the score.
4. Compute the score, assign the grade, state the verdict.
5. On NO-GO, work the priority fix order at the bottom.

BOUNDARY: this gate reviews the design. It does not implement the change (@dev), build
instrumentation (@data-engineer), run CI quality gates (@qa), create stories (@sm), write
epics or PRDs (@pm), or push (@devops — exclusive).]]

---

## 1. Hypothesis (design step 1)

- [ ] The change under test is described precisely enough to implement and to verify at ship
- [ ] A mechanism is stated: the causal chain from the change to the metric (CRITICAL)
- [ ] An expected direction is committed to, before the data
- [ ] A rough expected size is stated, with where it came from
- [ ] A falsifier is stated: which link in the mechanism a null result would break
- [ ] If the hypothesis arrived from another squad agent, it is recorded as a hypothesis and
      not as a conclusion

## 2. Randomization Unit (design step 2)

- [ ] The interference structure is assessed explicitly — social graph, marketplace supply,
      shared inventory, team accounts, shared cache (CRITICAL)
- [ ] The randomization unit follows from that assessment, and the reasoning is written down
- [ ] The analysis unit matches or is coarser than the randomization unit (CRITICAL)
- [ ] Where interference exists, cluster or time-based switchback randomization is used
      rather than a number that assumes independence
- [ ] For ratio metrics with a varying denominator, the variance method (delta method or
      bootstrap) is declared in the design

## 3. Triggering (design step 3)

- [ ] The triggering condition is defined as a logged, queryable condition (CRITICAL)
- [ ] A symmetric counterfactual trigger is defined for the control arm (CRITICAL)
- [ ] The method for verifying symmetry at analysis time is named
- [ ] The dilution cost of including untriggered units is quantified
- [ ] The analysis population is stated as triggered units in both arms

## 4. OEC (design step 4)

- [ ] Exactly one OEC is registered, or one explicitly weighted combination with stated
      weights (CRITICAL)
- [ ] It is registered before any exposure, in a committed document (CRITICAL)
- [ ] The metric definition exists, is queryable, and is cited
- [ ] Sensitivity check done: it can move detectably within the horizon at the expected
      effect size
- [ ] Causal-link check done: a stated argument that this short-term proxy predicts
      long-term value
- [ ] Gameability check done, with an actual cheapest-degradation answer, and the verdict is
      PASS (CRITICAL)
- [ ] Driver metrics are recorded separately, and it is explicit that they explain rather
      than decide

## 5. Guardrails (design step 5)

- [ ] The decision owner was asked "what result would make you not ship this?" and the answer
      is recorded verbatim (CRITICAL)
- [ ] Organizational guardrails are defined with a threshold, a direction and an action:
      latency, error and crash rate, unsubscribe rate, revenue per unit, support contact rate
      as applicable (CRITICAL)
- [ ] Trust guardrails are defined: sample ratio, telemetry loss rate, assignment
      consistency, cache hit rate as applicable
- [ ] Every guardrail has a numeric breach threshold, not just a name
- [ ] It is stated that a breach blocks the ship regardless of the OEC and aborts without
      requiring a significance test
- [ ] For revenue-affecting changes, BOTH conversion and revenue per unit are guardrailed in
      both directions (CRITICAL where applicable)

## 6. MDE (design step 6)

- [ ] The MDE is stated with its unit (relative or absolute) (CRITICAL)
- [ ] It is derived from the decision — what would be done differently at this effect size
- [ ] The cost the effect must recover is stated
- [ ] The MDE is not the hoped-for effect; if the two differ, both are recorded and labelled
- [ ] The MDE was not reverse-engineered from the available traffic (if it was, that belongs
      in the feasibility verdict instead)

## 7. Power, Sample Size and Duration (design step 7)

- [ ] Baseline value and metric variance are stated, each with a source query or metric
      definition (CRITICAL — a sample size cannot be computed from a mean alone)
- [ ] Alpha is stated (conventionally 0.05); any departure is justified
- [ ] Target power is stated (conventionally 0.80); any departure is justified
- [ ] Required n per arm is computed and the method is named
- [ ] The rule-of-thumb sanity check was applied: for a two-arm test comparing means at 80%
      power and alpha 0.05, n per arm is approximately sixteen times the metric variance
      divided by the squared absolute effect size
- [ ] Duration is set by the LARGER of the power requirement and whole weekly cycles plus
      novelty decay (CRITICAL)
- [ ] Which driver set the duration is stated
- [ ] Variance reduction with a pre-period covariate was considered, and its availability
      recorded either way
- [ ] A feasibility verdict is present: FEASIBLE, or INFEASIBLE with one option selected and
      justified (CRITICAL)
- [ ] The design does not proceed as an underpowered test whose point estimate will be read

## 8. Analysis Plan (design step 8)

- [ ] Exactly one stopping rule is declared: fixed horizon with a stated date, or a named
      sequential method with its boundaries (CRITICAL)
- [ ] It is stated that guardrails may be monitored continuously and the OEC may not
      (CRITICAL)
- [ ] A mechanism limiting mid-run OEC visibility is named
- [ ] Segments are pre-registered with a directional hypothesis each, or none are registered
      and that is explicit
- [ ] It is stated that unregistered segments are hypothesis generation and cannot support a
      ship decision
- [ ] The number of metrics × segments to be tested is stated, and the multiple-comparisons
      handling is declared
- [ ] The variance method for ratio metrics is declared
- [ ] The outlier / capping rule for heavy-tailed metrics is declared before launch, not
      after seeing the tail (CRITICAL where the metric is heavy-tailed, e.g. revenue)

## 9. Ramp and Abort (design step 9)

- [ ] Exposure steps are defined with a percentage and a duration each (CRITICAL)
- [ ] Each step names its checks — at minimum SRM, error rate and telemetry loss at the first
      step
- [ ] Each step names its abort condition (CRITICAL)
- [ ] The abort mechanism and its latency are stated, not only the abort condition
- [ ] Abort authority is named
- [ ] It is stated that data will not be pooled across ramp steps, and the analysis window
      excludes them

## 10. Instrumentation Handoff (design step 10 prerequisites)

- [ ] Assignment logging at the randomization unit is confirmed available or handed off to
      `@data-engineer`
- [ ] The trigger event is logged in both arms, or handed off
- [ ] OEC and guardrail metric definitions exist and are queryable, or handed off
- [ ] Telemetry coverage is measurable per arm
- [ ] Where a redirect-based assignment would cost users, server-side assignment is handed
      off to `@dev` (CRITICAL — redirect loss is a leading SRM cause)
- [ ] No item in this section is deferred to "after launch"

## 11. Decision Owner and Readout (design step 10)

- [ ] A named person owns the decision — not a team, not a function (CRITICAL)
- [ ] The decision they will make is stated
- [ ] The readout date is set, at or after the horizon
- [ ] The readout artifact path is stated
- [ ] The escalation route is named for a contested decision

## 12. Registration and Prior Art

- [ ] The design document exists in the repository (CRITICAL)
- [ ] It is committed, with the commit reference recorded, and the commit predates exposure
      (CRITICAL)
- [ ] Institutional memory was searched for prior experiments on this idea
- [ ] If a prior experiment disproved this idea, what is different this time is stated
- [ ] No field in the design remains TBD

---

## Scoring

**Calculation:** (Checked items) / (Total items − N/A items) × 100

| Grade | Score Range | Interpretation |
|---|---|---|
| A | 90-100% | Design is launch-ready |
| B | 80-89% | Launch-ready after the listed fixes; re-check before exposure |
| C | 70-79% | Several gaps; the experiment would likely produce an uninterpretable result |
| D | 60-69% | Substantially incomplete; do not expose traffic |
| F | Below 60% | Not a design. Return to `*design-experiment` |

**Score:** [ ] / [ ] = [ ]%  **Grade:** [ ]

## Verdict

| Verdict | Condition |
|---|---|
| **GO** | Grade A or B **and** every CRITICAL item checked |
| **NO-GO** | Any unchecked CRITICAL item, **or** grade C or below |

**Verdict:** [GO / NO-GO]
**Unchecked CRITICAL items:** [list, or "none"]
**Reviewed by:** [name] — [date]

**A CRITICAL item overrides the score.** A design can score 92% and still be NO-GO if the
gameability check failed or the decision owner is unnamed. The score measures completeness;
the CRITICAL list measures whether the experiment can produce an answer at all.

## Priority Fix Order

1. **CRITICAL items** — every one, before anything else. These are the failures that make
   the result uninterpretable no matter how well the run goes.
2. **Power and feasibility (section 7)** — an underpowered test cannot produce a usable
   negative result; it produces an unfalsifiable one. Fix before spending traffic.
3. **Guardrails and their thresholds (section 5)** — a guardrail defined after launch becomes
   a negotiation at readout instead of a block.
4. **Analysis plan (section 8)** — the stopping rule, the pre-registered segments and the
   outlier rule are worthless the moment the data is visible. They exist only if declared now.
5. **Triggering and randomization (sections 2-3)** — determine whether the effect can be
   measured at its true size and whether the variance is honest.
6. **Instrumentation handoff (section 10)** — a gap here surfaces as a trust-check failure
   after the traffic is already spent.
7. **Ramp and abort (section 9)** — limits blast radius and surfaces trust failures early.
8. **Decision ownership and registration (sections 11-12)** — make the result actionable and
   the pre-registration auditable.

---

## Method Attribution

- Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments: A Practical
  Guide to A/B Testing* (2020) — OEC construction and its requirements, the guardrail and
  trust metric taxonomy, power and sample size including the rule of thumb applied in
  section 7, triggering and dilution, randomization unit selection, and ramp-up practice.

`@experimentation-lead` (Vernier) is a specialist applying this framework.

---

## Related

- Design template: `squads/products/templates/experiment-design-tmpl.md`
- Task: `squads/products/tasks/design-controlled-experiment.md`
- Pre-analysis gate: `squads/products/checklists/experiment-trust-checklist.md` (PRD-CL-007)
- Metric taxonomy: `squads/products/data/metric-taxonomy.yaml`
- Pitfall taxonomy: `squads/products/data/experiment-pitfalls.yaml`
- Agent: `squads/products/agents/experimentation-lead.md`
