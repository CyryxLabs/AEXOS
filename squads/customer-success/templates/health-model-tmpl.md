# Account Health Model — v{N}, {DATE}

**Template ID:** CS-TM-003
**Owner:** `@customer-success:retention-lead` (Tenure)
**Produced by:** `*health-model`, `*signal-validate`, `*risk-register`
**Inputs required from:** `@customer-success:onboarding-lead` — segmented first-value definitions,
activation milestones, and the habit criterion

**Method attribution.** The framework applied is published by Nick Mehta, Dan Steinman and Lincoln
Murphy in *Customer Success: How Innovative Companies Are Reducing Churn and Growing Recurring
Revenue* (Wiley, 2016). Constructs applied here: continuous health monitoring rather than inspection
at renewal; coverage segmented by touch model; deliberate reduction of time-to-value; the product as
the mechanism that scales customer success; customer success as a company-wide commitment; and drift
between vendor and customer as the default state absent active management.

**Attribution limits — binding.** The source organizes its guidance as a set of laws of customer
success. **Do NOT reproduce the canonical wording, numbering or ordering of those laws from memory.**
Describe the construct in your own words and mark it *paraphrase, not quotation*. Before any verbatim
quotation, law number or page reference appears in a published artifact, **VERIFY it against the
book.** A wrong attribution is worse than none.

**Not attributed to that source:** gross revenue retention, net revenue retention, logo churn and
cohort retention curves are standard industry measures. Lead-time validation of signals, backward
validation against a closed period, the unserved / unhappy / unfit / drift split, and deferred-risk
logging of discount-only saves are this squad's operating conventions — consistent with the source's
premise, not presented as its content.

[[LLM: Do not publish this model without section 4. A health model that was never tested against a
closed period is decorative: it produces confident colour codes that do not separate renewers from
churners and displaces the signals that would have.]]

---

## 1. Inputs taken, not invented

| Input | Source | Date | Status |
|---|---|---|---|
| Segmented first-value definitions | `@onboarding-lead` activation model | | taken as given |
| Activation milestones | `@onboarding-lead` | | taken as given |
| Habit criterion (behaviour, frequency, distinct users) | `@onboarding-lead` | | taken as given |
| Intervention window per touch model | | | stated below |

> These are **not** restated or redefined here. If one is wrong, that is a finding routed back to
> `@onboarding-lead`, not a local correction. Building without them guarantees a model assembled
> from convenience metrics.

**Intervention window.** The time a touch model needs before an intervention can change anything:

| Touch model | Intervention window | Basis |
|---|---|---|
| High-touch | {n} days | |
| Low-touch | {n} days | |
| Tech-touch | {n} days | |

A signal is qualified against this window. Without it, no signal can be qualified at all.

---

## 2. Dimensions — kept separate

| Dimension | Question | Expected strength |
|---|---|---|
| Value realization | Is the account demonstrating the outcome it bought? | Primary — closest to what determines renewal |
| Adoption breadth | How many distinct users and teams depend on it? | Strong — predicts resilience to personnel change |
| Relationship depth | Is there an engaged sponsor, and a successor if the champion leaves? | Moderate, often segment-specific, frequently poorly instrumented |
| Commercial posture | How is the account behaving commercially? | Late — usually inside the intervention window |

> Do not collapse the dimensions into one number before each has been validated individually. They
> move in opposite directions, and the divergence is usually the finding.

---

## 3. Signal table

| Dimension | Signal | Measured lead time (median days) | Precedes a loss (%) | **Base rate (%)** | Loss coverage (%) | Segment validity | Instrumentation | Verdict |
|---|---|---|---|---|---|---|---|---|

Verdict values: **ADMIT** / **ADMIT, segment-specific** / **EXCLUDE — inside intervention window** /
**REMOVE — convenience metric** / **AUTOPSY ONLY — lagging**

For every row:

- **Lead time** is measured against a **closed period with known outcomes**, not asserted.
- **Hit rate is compared against the base rate**, never against zero. A signal that precedes a loss
  55% of the time in a base with 45% loss is nearly worthless; the same figure in a base with 8%
  loss is strong.
- **Coverage** is the proportion of losses the signal fired for. A precise signal catching 5% of
  losses is not a monitoring system.
- **Instrumentation:** INSTRUMENTED / PROXIED (label the proxy at every use) / UNMEASURED.
- **The convenience test:** can this signal move materially while the customer gets nothing? If yes,
  it is a convenience metric and it is removed with the reason stated.

---

## 4. Backward validation — mandatory before publication

**Period used:** {closed period, with known renewal outcomes} — n = {n}

| Health state | Accounts | Renewal rate | Prior model's rate |
|---|---|---|---|
| Healthy | | | |
| Watch | | | |
| At Risk | | | |

- **Do the states separate materially?** yes / no
- **If no:** the model is **not published**. Revise and re-validate. Report the negative result
  rather than softening it — a model that does not separate has been monitoring the base with an
  instrument that was not measuring.
- **Prior model's separation:** report it. A prior model whose three states landed within a few
  points of each other was decorative, and saying so is the finding that justifies the rebuild.
- **Early-tenure exclusion:** accounts younger than the median time-to-first-value are scored on the
  **activation model**, not on this one — a young account cannot break a habit criterion it never
  established. State how many were excluded and route them to `@onboarding-lead`.

---

## 5. States, triggers and owners

| State | Entry condition | Owner | Action | Time bound | Exit condition |
|---|---|---|---|---|---|

> A score with no owner and no trigger is reporting, not a model.

---

## 6. Cause classification — applied before any intervention

| Class | Evidence pattern | Right remedy | Wrong remedy |
|---|---|---|---|
| Unserved | Engaged and trying; value realization absent or regressed | Re-establish the value path, usually with `@onboarding-lead` | Relationship attention — produces a pleasant conversation and no change |
| Unhappy | Value realization intact; an unresolved event dominates, with an age | Resolution with a date and an owner; route the underlying signal to `@voice-lead` | Value demonstration — reads as evasion of the actual complaint |
| Unfit | No workflow ever established; use case at handover mismatched | Honest evidence, clean exit, escalate the qualification pattern | A save play — spends effort that belongs to an account that can succeed |
| Drift | Role change without successor engaged, or workflow change customer-side | Treat as unserved until proven otherwise; re-establish the value story with the successor | Assuming quiet means fine |

---

## 7. Instrumentation gaps

| Input | Status | What degrades without it | Requirement raised to `@data-engineer` |
|---|---|---|---|

Provisional figures derived from PROXIED or UNMEASURED inputs are labelled provisional wherever they
appear, not silently promoted once they look stable.

---

## 8. Revalidation

- **Revalidation date:** {date}
- **Forced early revalidation when:** the activation model changes; a segment is added; the product's
  value path changes; the base composition shifts materially.
- A health model decays as the product and the base change. A model that has never been revalidated
  is a model whose accuracy is unknown, not a model that is still correct.

---

## 9. CUSTOMER DATA — mandatory, non-negotiable

- [ ] Health is a property of an **account**. All scoring, all registers, all autopsies at account
      and cohort level.
- [ ] **No named individual is characterized anywhere.** "The champion is disengaged" is a
      personal-data liability with almost no predictive value next to "a contact role change occurred
      with no successor engaged in 30 days", which is an account-level fact and predicts better.
- [ ] No personal data stored beyond what the retention question requires.
- [ ] Customer records **referenced by id, never reproduced** — contact records, contract terms,
      support transcripts and identified survey verbatims stay in the authorized system of record.
- [ ] Anonymous feedback used as a signal input is **never re-identified**, by account matching or
      any other route.
- [ ] Confidentiality terms attached at collection bind every use of the derived signal.
- [ ] Special-category personal data (health, financial, credential, biometric, equivalents) is
      **out of scope** — stop and escalate to the human owner.

---

## 10. Boundary — absolute

- **No price, no discount, no contract term, no renewal position anywhere in this artifact.** That
  decision belongs to the **sales squad**. This model supplies value evidence and readiness signals;
  crossing the line makes the evidence look like advocacy for a deal and destroys its usefulness to
  the people who need it.
- **Retention by obstruction is refused outright:** no cancellation friction, no data withholding, no
  auto-renewal exploitation, however the request is framed. It converts a lost customer into a
  hostile former customer and corrupts the very numbers it appears to improve.
- Does **not** define activation milestones or first value → `@onboarding-lead`.
- Does **not** own the loyalty instrument → `@advocacy-lead`; nor feedback taxonomy and routing →
  `@voice-lead`.
- Does **not** answer why customers switch causally → `@products:jobs-analyst`.
- Does **not** implement telemetry → `@data-engineer`.
- Does **not** frame epics (`@pm`), draft stories (`@sm`), implement (`@dev`), test (`@qa`), or push
  (`@devops` — exclusive).

---

## 11. Completion

- [ ] Activation inputs cited as inputs from `@onboarding-lead`, not restated locally
- [ ] Intervention window stated per touch model before any signal was qualified
- [ ] Every signal carries measured lead time, hit rate **against the base rate**, and loss coverage
- [ ] Every signal validated against a **closed period**, never an open one
- [ ] No signal inside the intervention window appears in the risk register
- [ ] Convenience metrics removed with the reason stated
- [ ] Backward validation run and reported, including a negative result
- [ ] Dimensions kept separate unless a collapse is explicitly justified
- [ ] Every state names owner, action, time bound and exit condition
- [ ] Early-tenure accounts routed to the activation model, not scored here
- [ ] Instrumentation status marked per input; gaps raised to `@data-engineer`
- [ ] Customer-data section fully satisfied
- [ ] No price, discount or contract-term recommendation present
- [ ] Source attribution present with its VERIFY caveat intact
- [ ] Versioned in the repository with a revalidation date
