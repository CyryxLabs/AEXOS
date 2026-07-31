# Experiment Readout — Ship / No-Ship / Iterate

**Owner:** `@experimentation-lead` (Vernier)
**Produced by:** `*analyze-results` then `*readout`
**Gated by:** `squads/products/checklists/experiment-trust-checklist.md` (PRD-CL-007) — run
BEFORE any effect in this document is computed
**Predecessor artifact:** the pre-registered design, `experiment-{slug}-design.md`
**Suggested path:** `docs/product/experiments/experiment-{slug}-readout.md`

[[LLM: INITIALIZATION INSTRUCTIONS — EXPERIMENT READOUT

ORDER IS THE METHOD. Section 2 (trust checks) is completed and passed before section 3
(effects) is computed at all. Not written first — computed first. An effect computed on an
untrusted dataset is not a weak result, it is not a result.

EXECUTION APPROACH:
1. Open the pre-registered design. Every metric, segment, window and threshold reported here
   must appear there. Anything not in the design is either a trust metric or a labelled
   hypothesis-generation finding.
2. Run PRD-CL-007. Record the verdict in section 2.
3. If the verdict is VOID, jump to section 2A (Experiment Voided) and STOP. Report no effect
   at all — not with a caveat, not "directionally", not "for information".
4. Only on a PASS verdict, compute and complete sections 3 onward.
5. Numbers in the worked examples are ILLUSTRATIVE PLACEHOLDERS. Replace every one of them.

ARTICLE IV — NO INVENTION (a real gate, applied in section 3):
Every number in this readout traces to a query, a metric definition or a documented method.
Any effect reported without a confidence interval and a stated analysis window is marked
UNVERIFIED and does not enter the ship decision. UNVERIFIED rows stay visible in the table —
they are struck from the decision, not from the record.

BOUNDARY: this readout decides ship / no-ship / iterate on evidence. It does not implement a
fix (@dev), does not run test automation or CI quality gates (@qa), does not publish or push
(@devops — exclusive), does not create stories (@sm) and does not write epics or PRDs (@pm).
Instrumentation causes behind failed trust checks go to @data-engineer.]]

---

## 1. Header

| Field | Value |
|---|---|
| Experiment | [name] |
| Slug | [kebab-case] |
| Design document | [path + commit reference of the pre-registration] |
| Registered on | [YYYY-MM-DD] |
| Ran from → to | [YYYY-MM-DD → YYYY-MM-DD] |
| Analysis window reported | [exact window, e.g. step-3 start → horizon; whole cycles] |
| Analysis type | [Fixed horizon, single analysis / Sequential method: name + boundary] |
| Decision owner | [named person, from the design] |
| Readout date | [YYYY-MM-DD] |
| **Decision** | **[SHIP / NO-SHIP / ITERATE / VOID]** |

**Hypothesis under test (copied verbatim from the design):**
[change, mechanism, expected direction, expected rough size]

> **How to fill:** copy from the design, do not re-write from memory. A hypothesis that has
> drifted between design and readout is the same failure as choosing the OEC after the data.
> **Prevents:** silent restatement of the hypothesis to match whatever the data showed.

---

## 2. Trust Checks — Reported First

**PRD-CL-007 verdict:** [PASS / VOID]

| # | Check | Method | Result | Verdict |
|---|---|---|---|---|
| 1 | Sample ratio mismatch | Chi-square, observed split vs designed split | [ILLUSTRATIVE: designed 50/50; observed 248,110 / 247,902; p = 0.41] | [PASS / FAIL] |
| 2 | Triggering symmetry | Trigger event fires identically in both arms | [ILLUSTRATIVE: trigger rate 30.1% vs 30.0%] | [PASS / FAIL] |
| 3 | Instrumentation coverage | Telemetry loss rate per arm | [ILLUSTRATIVE: 0.4% vs 0.4%] | [PASS / FAIL] |
| 4 | Pre-period A/A comparability | OEC compared across arms in the pre-period | [ILLUSTRATIVE: +0.05%, CI [-0.6%, +0.7%]] | [PASS / FAIL] |
| 5 | Analysis window integrity | Whole cycles, novelty decayed, no partial days, no pooling across ramp steps | [state the window and what was excluded] | [PASS / FAIL] |

**SRM threshold applied:** investigate below chi-square p = 0.001. Below that threshold the
experiment is void, not weakened.

**Any FAIL above means the verdict is VOID.** A failed check voids the experiment; it does
not attach a caveat to it.

> **How to fill:** report the actual test statistic or rate for each check, not the word
> "passed". A trust check with no number behind it has not been run.
> **Bad answer:** "Trust checks look fine." That is a claim, not a check.
> **Prevents:** interpreting an effect on a dataset whose arms are not comparable
> populations — the single most common way a confident, publishable, wrong answer is
> produced.

---

## 2A. Experiment Voided — Use This Branch on Any Trust-Check Failure

*Complete this section only if the PRD-CL-007 verdict is VOID. If you complete it, delete
sections 3 through 8: there is no effect to report.*

> **This experiment cannot be analyzed. No effect is reported.**

**Which check failed:** [check number and name]

**The failure, quantified:**
[ILLUSTRATIVE: designed split 50/50. Observed: control 248,110, treatment 241,884.
Chi-square p = 3.1e-09. Threshold for validity: p >= 0.001.]

**Why no effect is reported:**
With a mismatch of this size the arms are not comparable populations, and any computed
effect is confounded by whatever caused the imbalance. An imbalance of [x%] is more than
large enough to produce or erase the entire effect being looked for.

### Cause investigation (SRM cause walk, in order)

| # | Candidate cause | Evidence checked | Verdict |
|---|---|---|---|
| 1 | Bot and crawler filtering applied asymmetrically | [what was checked] | [Ruled out / PROBABLE CAUSE / Not checked] |
| 2 | Redirect-based assignment losing users in one arm | [what was checked] | [...] |
| 3 | Deployment or cache lag exposing arms at different times | [what was checked] | [...] |
| 4 | Telemetry drop correlated with a slower variant | [what was checked] | [...] |
| 5 | Assignment occurring before an eligibility check that itself differs | [what was checked] | [...] |
| 6 | Units reassigned mid-experiment by an ID change or a login event | [what was checked] | [...] |

*(For a non-SRM trust failure, replace this table with the cause investigation appropriate to
the failed check — triggering asymmetry, telemetry gap, residual effect from a prior
experiment, or a window defect.)*

**Remedy:** [the fix, and re-run from a clean start]

**Do not attempt to salvage the data by reweighting.** Reweighting assumes exactly the
exchangeability that the mismatch disproves — the units lost are lost by a mechanism that
selects on something.

**Handoff:** [`@data-engineer` for instrumentation causes: telemetry loss, assignment
logging, event pipeline gaps, metric definition drift / `@dev` where the assignment
mechanism itself must change, e.g. moving assignment server-side]

**Recorded in institutional memory as VOID with its cause** — see section 8. A voided
experiment is recorded so the defect that voided it is not repeated.

---

## 3. Effects — OEC and Guardrails in the Same Table

**Analysis window:** [state it here again, explicitly, on the same page as the numbers]
**Population:** triggered units only, in both arms
**Variance method:** [delta method / bootstrap / standard — as declared in the design]
**Outlier rule applied:** [the rule declared in the design, or "none, as declared"]

| Role | Metric | Effect | 95% CI | Stat. significant | Guardrail threshold | Status |
|---|---|---|---|---|---|---|
| **OEC** | [metric] | [ILLUSTRATIVE: +0.3% rel] | [ILLUSTRATIVE: -0.9%, +1.5%] | [Yes/No] | n/a | [Above MDE / Below MDE / Not significant] |
| Guardrail | Revenue per unit | [-0.2% rel] | [-1.1%, +0.7%] | [No] | [-1% rel] | [Clean / BREACH] |
| Guardrail | p95 latency | [+4ms] | [+1ms, +7ms] | [Yes] | [+50ms] | [Within threshold] |
| Guardrail | Error / crash rate | [value] | [CI] | [ ] | [threshold] | [ ] |
| Guardrail | [others from the design] | [ ] | [CI] | [ ] | [threshold] | [ ] |
| Driver | [metric] | [-6.1% rel] | [-7.8%, -4.4%] | [Yes] | n/a | [explains: ...] |

**Guardrails are reported in this table, alongside the OEC — not in a later section, not in
an appendix.** A guardrail relegated below the fold is a guardrail that will be read after
the decision has already been formed.

### 3.1 Article IV gate

| Metric | Has a confidence interval? | Has a stated analysis window? | Traces to a query / metric definition? | Admissible to the decision? |
|---|---|---|---|---|
| [each metric in the table above] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes / **UNVERIFIED**] |

**Any row marked UNVERIFIED does not enter the ship decision.** It stays in the record, with
what would be required to verify it: [the missing interval, window or source].

### 3.2 Practical significance, stated separately

| Question | Answer |
|---|---|
| Is the OEC effect statistically significant? | [Yes / No] |
| Is the point estimate above the pre-registered MDE? | [Yes / No — MDE was [value]] |
| Is the *lower bound* of the interval above the decision threshold? | [Yes / No] |

Statistical and practical significance are separate questions and both must be answered. A
significant effect below the decision threshold is a no-ship: the effect is real and not
worth the cost.

> **How to fill:** confidence intervals are the primary reporting object. Point estimates
> alone invite unearned confidence.
> **Bad answer:** a headline lift with no interval; or a guardrail table placed after the
> recommendation.
> **Prevents:** shipping on a metric win while a guardrail is breached; and treating a
> point estimate as if it were the effect.

---

## 4. Effect Trend Over Time — Novelty and Primacy Check

| Period | OEC effect | 95% CI | Note |
|---|---|---|---|
| Days 1-3 | [ILLUSTRATIVE: +4.2%] | [CI] | Ramp / early exposure |
| Days 4-7 | [value] | [CI] | |
| Days 8-14 | [value] | [CI] | |
| Stabilized window (reported in section 3) | [value] | [CI] | The estimate to trust |

**Trend verdict:** [Stable / Novelty signature — early lift decaying toward zero / Primacy
signature — early dip recovering / Unstable for another reason: describe]

**Interpretation:**
[If a novelty signature is present, say what calling the experiment early would have shipped.
If a primacy signature is present, say what calling it early would have killed. Both decay;
the stabilized window is the estimate to trust, which is why duration is set by cycles and
decay rather than by the point at which power is reached.]

**Ramp-step pooling check:** [Confirm the reported window does not pool across ramp steps.
If effect sign differs between periods, analyze by period before pooling — Simpson's paradox
can reverse the sign of the pooled effect relative to every individual period.]

> **How to fill:** show the trend even when it is flat. A flat trend is evidence; an absent
> trend section is an unanswered question.
> **Prevents:** calling a result inside the novelty window and shipping a change with no
> durable effect.

---

## 5. Segments

### 5.1 Pre-registered segments (may support the decision)

| Segment | Effect | 95% CI | Registered hypothesis | Consistent with it? |
|---|---|---|---|---|
| [segment from the design] | [value] | [CI] | [the hypothesis] | [Yes/No] |

### 5.2 Other segment findings — HYPOTHESIS GENERATION ONLY

> **Label this section explicitly wherever any of its content is quoted. These findings
> cannot support a ship decision.**

| Segment | Effect | 95% CI | Plausible mechanism? |
|---|---|---|---|
| [segment] | [value] | [CI] | [yes + mechanism / no] |

**Multiple comparisons arithmetic:**
[ILLUSTRATIVE: across 6 metrics and 14 segments, roughly 84 tests were performed. At alpha
0.05, about 4 false positives are expected by chance alone. One significant segment at
p = 0.03 is consistent with finding nothing.]

Fill in the real counts: [N metrics] × [M segments] = [N×M] tests; expected false positives
at alpha 0.05 ≈ [0.05 × N×M].

**Correct next step for a plausible unregistered finding:** a confirmatory experiment with
that segment as the pre-registered population and the OEC declared in advance. Run
`*design-experiment` scoped to that population.

> **How to fill:** if section 5.2 is empty, write "none reported" rather than deleting the
> heading. The heading is what makes an unregistered finding arriving later obviously
> out of place.
> **Bad answer:** promoting a 5.2 row into section 5.1 because the mechanism sounds
> convincing.
> **Prevents:** post-hoc segment scanning presented as a finding — with enough segments and
> metrics, significance is guaranteed by chance.

---

## 6. What the Interval Rules Out

**Statement:** [e.g. "The interval rules out an effect larger than +1.5% relative on the
OEC. The pre-registered MDE was +2.0%. The experiment was adequately powered and found
nothing at that size. This is a real negative result, not an inconclusive one."]

**Classify the result:**

| Case | Selected | Reading |
|---|---|---|
| Significant, above the MDE, guardrails clean | [ ] | Ship |
| Significant, below the decision threshold | [ ] | No-ship — the effect is real but not worth the cost |
| Not significant, interval narrow around zero | [ ] | No-ship — a meaningful effect has been ruled out |
| Not significant, interval wide | [ ] | Inconclusive — state the power shortfall and the sample that would be required |
| Significant with a guardrail breach | [ ] | No-ship — quantify the trade-off explicitly for the decision owner |
| Surprisingly large in either direction | [ ] | Twyman's law — re-run the trust checks before anything else |

**If inconclusive:** required sample per arm to detect the MDE: [value]; achieved: [value];
shortfall: [value]; duration that would close it: [value].

**Twyman's law statement (mandatory when the effect is surprisingly large in either
direction):** [Any figure that looks interesting or different is usually wrong. State that
the trust checks were re-run, and their result.]

> **How to fill:** say what the interval rules out, not what the point estimate suggests. A
> p-value is not the probability that the hypothesis is true, and a non-significant result is
> not evidence of no effect.
> **Bad answer:** "No difference between the arms." That sentence is not available from any
> experiment.
> **Prevents:** reporting an underpowered null as evidence the change does nothing, which
> makes the result unfalsifiable rather than negative.

---

## 7. Decision and Residual Risk

**Decision:** [SHIP / NO-SHIP / ITERATE]

**Evidence it rests on:** [the OEC row, the guardrail rows, the window, the trend]

**Guardrail clearance:** [All clean / BREACH on [metric] — and if a breach exists, the
decision cannot be SHIP. Quantify the trade-off for the decision owner explicitly.]

**If ITERATE:** what specifically changes, and what the next hypothesis is:
[text — this is an input to a new pre-registered design, not a licence to keep the current
experiment running]

**Residual risk:**

| Risk | Why it remains | How it would show up | Mitigation / monitoring |
|---|---|---|---|
| [e.g. long-term effect unmeasured beyond the horizon] | [reason] | [signal] | [holdback, follow-up, guardrail in production] |
| [e.g. segment not powered] | [reason] | [signal] | [mitigation] |
| [e.g. interference not fully excluded] | [reason] | [signal] | [mitigation] |

**Questions this experiment cannot answer:** [state them, and what design would answer them]

**Decision owner sign-off:** [name] — [date]

> **How to fill:** the residual risk section is not a disclaimer, it is the list of things
> someone must watch after shipping. Name a monitoring mechanism for each row.
> **Bad answer:** "Low risk." Name the risk or delete the row.
> **Prevents:** approving a ship on a metric win while a guardrail is breached; and shipping
> with unstated open questions that resurface as a surprise later.

---

## 8. Institutional Memory Record

| Field | Value |
|---|---|
| Slug | [kebab-case] |
| Hypothesis and mechanism | [verbatim from the design] |
| Full design | OEC: [ ] · Guardrails: [ ] · MDE: [ ] · Randomization unit: [ ] · Triggering: [ ] |
| Trust check results | [PASS with the five results / VOID with the failed check] |
| Effects with intervals | [OEC and guardrails, with the analysis window] |
| Decision and rationale | [ship / no-ship / iterate + one sentence] |
| Voided? Cause if so | [n/a / the cause] |
| Superseded or supersedes | [links to related experiments] |
| Do-not-re-fund note | [If this idea was disproved, write the sentence a future planner
should read: what was tested, what was ruled out, and what would have to be different for
it to be worth testing again.] |

**Record every experiment, including the failures and the voided ones.** Negative results
prevent re-funding of disproven ideas; voided experiments prevent repeating the defect that
voided them. Most ideas fail — published rates from large experimentation programs put the
share of ideas that improve the target metric at roughly one in three or lower — so a
program where most tests win has a measurement problem, and the memory record is where that
becomes visible.

---

## 9. Handoffs

| Destination | Condition |
|---|---|
| `@products-chief` | The result contradicts squad-level direction, or the ship decision needs arbitration |
| `@product-strategist` | The result should change roadmap sequencing, or a repeatedly disproven idea should leave the backlog |
| `@positioning-lead` | The result invalidates a positioning assumption, or confirms a frame-of-reference claim |
| `@pricing-strategist` | The result is from a price or packaging test and changes the monetisation model |
| `@discovery-lead` | The result is directionally clear but the mechanism is unexplained and needs qualitative follow-up |
| `@jobs-analyst` | A null or reversed result suggests the hypothesis targeted the wrong job to be done |
| `@data-engineer` | Trust checks failed for instrumentation reasons: telemetry loss, assignment logging, event pipeline gaps, metric definition drift |
| `@qa` | A guardrail breach traces to a defect rather than to the change under test |
| `@dev` | The change ships, or the assignment mechanism must be reimplemented |
| `@devops` | Publishing and pushing this readout — exclusive authority |

---

## Method Attribution

- Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments: A Practical
  Guide to A/B Testing* (2020) — the ordering of trust checks before interpretation, the
  validity threat catalogue, confidence intervals as the primary reporting object, the
  separation of statistical from practical significance, and Twyman's law: any figure that
  looks interesting or different is usually wrong.

`@experimentation-lead` (Vernier) is a specialist applying this framework.

---

## Related

- Design template: `squads/products/templates/experiment-design-tmpl.md`
- Pre-analysis gate: `squads/products/checklists/experiment-trust-checklist.md` (PRD-CL-007)
- Pre-launch gate: `squads/products/checklists/experiment-launch-checklist.md` (PRD-CL-008)
- Pitfall taxonomy: `squads/products/data/experiment-pitfalls.yaml`
- Metric taxonomy: `squads/products/data/metric-taxonomy.yaml`
- Agent: `squads/products/agents/experimentation-lead.md`
