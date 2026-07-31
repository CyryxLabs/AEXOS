# Experiment Trust Checklist — Pre-Analysis Gate

**Checklist ID:** PRD-CL-007
**Referenced by:** `@experimentation-lead` (Vernier)
**Runs before:** `*analyze-results`, `*readout`, and every section of
`squads/products/templates/experiment-readout-tmpl.md` from section 3 onward
**Purpose:** Establish that the experiment is trustworthy BEFORE any effect is computed.
This gate produces a binary verdict — **PASS** or **VOID** — never a score.

[[LLM: INITIALIZATION INSTRUCTIONS — TRUST GATE

THIS CHECKLIST RUNS BEFORE ANY EFFECT IS COMPUTED. Not before it is reported — before it is
computed. Once a lift is on a screen it is in the room, and every subsequent check is
performed by someone who already knows what answer they want.

EXECUTION APPROACH:
1. Run sections 1-5 IN ORDER. The order is documented method, not preference: a sample ratio
   failure makes every later check uninterpretable, so it is tested first.
2. Each check is [PASS] or [FAIL]. There is no [PARTIAL] and no [PASS WITH CAVEAT].
3. Record the actual statistic or rate for every check. A check recorded as "looks fine" has
   not been run.
4. ANY FAIL → verdict is VOID → stop, complete section 7, and report NO EFFECT AT ALL.
5. Only on five PASSes may the analyst compute effects.

WHY THIS IS NOT SCORED: an experiment does not become 80% trustworthy. A failed check means
the arms are not comparable populations, which means any computed effect is confounded by
whatever caused the failure. That is a void experiment, not a weakened one.

BOUNDARY: this gate diagnoses. Fixing instrumentation is @data-engineer; changing the
assignment mechanism is @dev; CI quality gates and defect investigation are @qa.]]

---

## 0. Preconditions

- [ ] The pre-registered design document exists and its commit predates first exposure
- [ ] The analyst has read the design's triggering condition, analysis window and designed
      split BEFORE opening any result
- [ ] The OEC has NOT been inspected during the run (fixed-horizon designs), or the declared
      sequential boundaries were used (sequential designs)
- [ ] Guardrail monitoring during the run was limited to guardrails and trust metrics

> If the OEC was inspected mid-run on a fixed-horizon design, that is peeking. Record it in
> section 6 as a design-integrity finding: the nominal alpha no longer describes this
> experiment's false positive rate, and the readout must say so.

---

## 1. Sample Ratio Mismatch (run FIRST)

- [ ] The designed split is stated and matches the design document
- [ ] Observed unit counts per arm are recorded, at the randomization unit
- [ ] A chi-square test of observed split against designed split has been computed
- [ ] The p-value is recorded numerically, not as "significant" or "fine"
- [ ] **p >= 0.001** — the stated investigation threshold; below it, investigate and void
- [ ] The counts were taken from assignment logs, not from a downstream metric table that
      may itself filter asymmetrically
- [ ] SRM was also checked at each ramp step, not only on the pooled data

| Field | Value |
|---|---|
| Designed split | [e.g. 50/50] |
| Observed counts | [control: N, treatment: N] |
| Chi-square p | [value] |
| Threshold | p >= 0.001 |
| Verdict | [PASS / FAIL] |

**Rule:** if the observed traffic split diverges from the designed split beyond chance
(chi-square p below 0.001), the experiment is void. Do not analyze it, do not partially
trust it, do not report the effect with a caveat. Find the cause.

**"It is only a 2% imbalance" is not a defence.** The effect being measured is often smaller
than 2%, and the imbalance is not random — it is caused by a mechanism that differs between
arms, which means the populations differ in whatever that mechanism selects on. Reweighting
does not fix it, because reweighting assumes the exchangeability the mismatch has already
disproved.

### 1A. SRM cause walk — run this list before touching the data again

- [ ] **Bot and crawler filtering applied asymmetrically** — checked: [evidence] → [ruled
      out / probable cause]
- [ ] **Redirect-based assignment losing units in one arm** — checked: [evidence] → [ruled
      out / probable cause]
- [ ] **Deployment or cache lag exposing arms at different times** — checked: [evidence] →
      [ruled out / probable cause]
- [ ] **Telemetry drop correlated with a slower variant** — checked: [evidence] → [ruled
      out / probable cause]
- [ ] **Assignment occurring before an eligibility check that itself differs** — checked:
      [evidence] → [ruled out / probable cause]
- [ ] **Units reassigned mid-experiment by an ID change or a login event** — checked:
      [evidence] → [ruled out / probable cause]

**Identified cause:** [text, or "not yet identified — investigation continues"]
**Owner of the fix:** [`@data-engineer` for instrumentation and pipeline causes / `@dev`
where the assignment mechanism itself must change, e.g. moving assignment server-side]

---

## 2. Triggering Symmetry

- [ ] The triggering condition analyzed matches the one in the design document, exactly
- [ ] The counterfactual trigger fires in control on the same rule, evaluated at the same
      point in the flow
- [ ] Trigger rates per arm are recorded and comparable
- [ ] The trigger event is logged in BOTH arms (not inferred in control from absence)
- [ ] The trigger is evaluated BEFORE any arm-specific branching that could itself change
      who qualifies
- [ ] Only triggered units are in the analysis population, in both arms

| Field | Value |
|---|---|
| Trigger rate, control | [%] |
| Trigger rate, treatment | [%] |
| Difference | [pp] |
| Verdict | [PASS / FAIL] |

**Why this is check 2:** untriggered units dilute the measured effect toward zero, reducing
sensitivity and hiding real effects. An asymmetric trigger does something worse — it makes
the two analysis populations different by construction, which is a comparability failure of
the same kind as SRM.

---

## 3. Instrumentation Coverage

- [ ] Telemetry loss rate is measured per arm, not overall
- [ ] Loss rates are comparable across arms; the tolerance was declared in the design
- [ ] Event volume per unit is comparable across arms for the events feeding the OEC
- [ ] The OEC and every guardrail resolve to a metric definition that exists and is
      queryable — no metric computed ad hoc for this readout
- [ ] No metric definition changed during the run; if one did, the change date is recorded
      and the window adjusted
- [ ] Client-side events, where used, are checked for arm-correlated drop (a heavier or
      slower variant loses more beacons)

| Field | Value |
|---|---|
| Telemetry loss, control | [%] |
| Telemetry loss, treatment | [%] |
| Declared tolerance | [from the design] |
| Verdict | [PASS / FAIL] |

**Note:** an arm-correlated telemetry loss is simultaneously a coverage failure and a likely
SRM cause. If check 1 passed and this one fails, re-examine check 1 at the metric level as
well as the assignment level.

---

## 4. Pre-Period A/A Comparability

- [ ] A pre-period window before first exposure is defined and stated
- [ ] The OEC is compared across the assigned arms in the pre-period
- [ ] Key guardrails are compared across arms in the pre-period
- [ ] No meaningful difference is present before treatment began; the comparison is reported
      with its interval
- [ ] Prior experiments overlapping this population are listed, with their end dates
- [ ] Where a prior experiment ended close to this one's start, the washout period is stated

| Field | Value |
|---|---|
| Pre-period window | [dates] |
| Pre-period OEC difference | [effect + CI] |
| Overlapping prior experiments | [list or "none"] |
| Verdict | [PASS / FAIL] |

**What a failure means:** a difference before treatment began is a residual or carryover
effect — a prior experiment contaminating the current one — or a randomization defect. Both
require re-randomization and a clean pre-period before relaunch, not an adjustment at
analysis time.

**Platform-level note:** A/A tests validate the platform, not just this experiment. A
platform that never fails an A/A test is as suspicious as one that always does — at alpha
0.05, rejections at approximately the nominal rate are the expected behaviour of a correctly
calibrated system.

---

## 5. Analysis Window Integrity

- [ ] The window matches the analysis plan declared in the design
- [ ] The window covers whole weekly cycles
- [ ] No partial days at either boundary
- [ ] The window excludes the ramp steps; data is not pooled across steps with different
      traffic allocation
- [ ] The window starts after novelty and primacy effects have had time to decay, and the
      trend over time supports that claim
- [ ] Known confounds inside the window are listed: outages, marketing pushes, seasonal
      events, concurrent releases
- [ ] The horizon was reached, or the declared sequential boundary was crossed — the window
      was not shortened because the result looked ready

| Field | Value |
|---|---|
| Window analyzed | [start → end] |
| Whole cycles? | [Yes/No] |
| Ramp steps excluded? | [Yes/No] |
| Confounds inside the window | [list or "none identified"] |
| Verdict | [PASS / FAIL] |

**Why pooling across ramp steps fails:** traffic mix differs between steps, and pooling
across periods with different mixes can reverse the sign of the effect relative to every
individual period.

---

## 6. Design-Integrity Findings (recorded, not scored)

These do not by themselves void the experiment, but they must be carried into the readout.

- [ ] The OEC was inspected before the horizon on a fixed-horizon design → **peeking**;
      the nominal alpha does not describe this experiment's false positive rate
- [ ] A sequential method was adopted after the data was visible → same error as peeking
- [ ] The OEC changed between design and analysis → the readout is a search, not a test
- [ ] Segments not pre-registered are being reported → they are hypothesis generation and
      must be labelled as such in the readout
- [ ] The outlier or capping rule was chosen after seeing the tail
- [ ] The variance method for a ratio metric was chosen at analysis time rather than declared

**Findings recorded:** [list, or "none"]

---

## 7. Verdict

**This gate has two outcomes. There is no score.**

| Verdict | Condition | Consequence |
|---|---|---|
| **PASS** | All five checks (sections 1-5) are PASS | Effects may now be computed. Proceed to readout section 3. Carry any section 6 findings into the readout. |
| **VOID** | Any one of the five checks is FAIL | The experiment cannot be analyzed. Report **no effect at all**. Complete readout section 2A, identify the cause, hand off the fix, and record the void in institutional memory. |

**Verdict:** [PASS / VOID]
**Failed check (if VOID):** [number and name]
**Cause:** [identified cause, or "investigation continues"]
**Handoff:** [`@data-engineer` / `@dev` / `@qa`]
**Run by:** [name] — [date]

### What VOID does not mean

- It does not mean "report the effect with a caveat"
- It does not mean "the effect is directionally useful"
- It does not mean "share it for information only"
- It does not mean "reweight and re-analyze"

A failed check voids the experiment rather than weakening it. The traffic is spent; the
correct output is a cause, a fix and a clean re-run.

---

## Method Attribution

- Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments: A Practical
  Guide to A/B Testing* (2020) — the ordering of trust checks before interpretation, sample
  ratio mismatch detection and its cause list, triggering and dilution, residual effects
  detected by pre-period A/A, and Twyman's law: any figure that looks interesting or
  different is usually wrong.

`@experimentation-lead` (Vernier) is a specialist applying this framework.

---

## Related

- Readout template: `squads/products/templates/experiment-readout-tmpl.md`
- Design template: `squads/products/templates/experiment-design-tmpl.md`
- Pre-launch gate: `squads/products/checklists/experiment-launch-checklist.md` (PRD-CL-008)
- Pitfall taxonomy: `squads/products/data/experiment-pitfalls.yaml`
- Agent: `squads/products/agents/experimentation-lead.md`
