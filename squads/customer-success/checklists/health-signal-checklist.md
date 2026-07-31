# Health Signal & Model Checklist

**Checklist ID:** CS-CL-003
**Referenced by:** `retention-lead` (Tenure)
**Applies to:** `*health-model`, `*signal-validate`, `*risk-register`, `*churn-autopsy`,
`*cause-classify`, `*intervention-plan`, `*expansion-readiness`, `*renewal-evidence`
**Purpose:** The bar a candidate signal, a health model, a risk register or a churn autopsy must
clear before it is deployed or handed onward.

[[LLM: EXECUTION

Part A is run **once per candidate signal**. Parts B onward are run once per model or report.

Mark `[x]` only where you can name the evidence — the period, the counts, the source. `[ ]` where you
cannot. `[N/A]` with a written reason.

A CRITICAL failure blocks. The reason is not procedural: a health model that fails these items
produces confident colour codes that do not separate renewers from churners, and the base is then
monitored for quarters by an instrument that was not measuring.

Attribution note binding on the whole checklist: the framework is Nick Mehta, Dan Steinman &
Lincoln Murphy, *Customer Success* (Wiley, 2016). Do NOT reproduce the canonical wording, numbering
or ordering of the source's laws from memory — VERIFY against the book before publishing any
quotation, law number or page reference. Retention metrics (GRR, NRR, logo churn, cohort curves) are
industry-standard and are not attributed to that source.]]

---

## Part A — per candidate signal

- [ ] The signal was validated against a **completed, closed period with known renewal outcomes**
      **(CRITICAL — an open period has no outcomes to validate against, so a result obtained there
      is not a result)**
- [ ] **Lead time is measured**, in days, as the median interval between the signal firing and the
      outcome **(CRITICAL — a signal without measured lead time is an opinion with a colour code)**
- [ ] **Lead time exceeds the intervention window** for the touch model it will be used in
      **(CRITICAL — a signal that fires inside the intervention window reports the loss rather than
      warning of it, and leaves only commercial levers, which are the sales squad's)**
- [ ] The intervention window itself is stated and sourced, not assumed
- [ ] **Hit rate is compared against the base rate, not against zero (CRITICAL)** — a signal
      preceding a loss 55% of the time in a base with 45% loss is nearly worthless
- [ ] **Loss coverage** is stated: the proportion of losses the signal fired for. A precise signal
      catching 5% of losses is not a monitoring system
- [ ] **The convenience test is applied:** can this signal move materially while the customer gets
      nothing? If yes it is removed, with the reason recorded **(CRITICAL — logins, sessions and
      ticket counts survive in health models because they are cheap to collect, not because they
      predict anything)**
- [ ] **Segment validity** is stated: does it predict base-wide, or only within a segment? A
      segment-specific signal is never applied base-wide
- [ ] Instrumentation status recorded: INSTRUMENTED / PROXIED / UNMEASURED — and a proxy is labelled
      as a proxy **at every use**, not only at first mention
- [ ] Signals that are correlated but only visible after the decision was made are marked
      **AUTOPSY ONLY** — useful for root cause, useless as a warning
- [ ] The signal is taken from `@onboarding-lead`'s activation milestones and habit criterion where
      one exists, rather than reinvented locally

## Part B — model construction

- [ ] Activation inputs (first-value definitions, milestones, habit criterion) were taken from
      `@onboarding-lead` before the model was designed **(CRITICAL — building without them
      guarantees convenience metrics)**
- [ ] Candidates were enumerated across all four dimensions: value realization, adoption breadth,
      relationship depth, commercial posture
- [ ] The four dimensions are **kept separate** until each has been validated individually; any
      collapse into a single score carries an explicit justification
- [ ] Every state names an **owner, an action, a time bound and an exit condition** **(CRITICAL — a
      score with no owner and no trigger is reporting, not a model)**
- [ ] A revalidation date is set, with the conditions that force early revalidation

## Part C — backward validation

- [ ] The model was scored against a **previous closed cohort** and renewal rates by health state are
      reported **(CRITICAL — a model never validated backwards must not be deployed forwards)**
- [ ] The states **separate materially**; if they do not, the model is revised rather than published
      **(CRITICAL)**
- [ ] A negative result is reported as a negative result, not softened
- [ ] The prior model's separation is reported for comparison where one existed
- [ ] **Early-tenure accounts are excluded and scored on the activation model instead** **(CRITICAL —
      an account younger than the median time-to-first-value cannot break a habit criterion it never
      established; scoring it here produces "Healthy" on accounts that never activated)**
- [ ] Excluded accounts are counted and routed to `@onboarding-lead`

## Part D — register and autopsy

- [ ] The register is ranked by **remaining lead time first**, exposure second
- [ ] Each at-risk account carries its firing signals, the date each fired, and remaining lead time
- [ ] Each account carries a **cause class**: unserved / unhappy / unfit / drift **(CRITICAL — a
      remedy designed before the cause is classified consumes the window in which the correct remedy
      would have worked)**
- [ ] Accounts whose risk repeats a pattern already seen this period are flagged as patterns
- [ ] In autopsies, the **stated reason is separated from the observed cause** **(CRITICAL — price is
      the most common stated reason and rarely the actual one; treating these as pricing losses sends
      the wrong problem to the wrong squad)**
- [ ] Autopsies are split by tenure band; losses before first value are attributed to activation and
      routed to `@onboarding-lead`
- [ ] The model's own performance is reported honestly: how many losses it flagged, with how much
      lead time — including when the answer is poor
- [ ] Each conclusion states what would falsify it
- [ ] A churn rate is never presented as a finding **(CRITICAL — it is the sum of at least three
      failure types whose remedies are mutually useless)**

## Part E — intervention and expansion

- [ ] Cause class confirmed **before** the intervention is designed
- [ ] The intervention names trigger, owner, action, time bound, observable success measure, fallback
      and fallback date
- [ ] A save achieved **without a value change** is logged as **deferred risk with a review date**,
      not counted as a save **(CRITICAL — a discount changes what the customer pays; a save changes
      what the customer gets)**
- [ ] Repeated causes are escalated as patterns to `@cs-chief` rather than absorbed by per-account
      effort each quarter
- [ ] Expansion is qualified on **realized value demonstrated**, adoption beyond a single champion,
      and health stable across a **full** measurement period — not on usage volume
- [ ] Open escalations and unclosed detractor loops block expansion until closed, checked with
      `@advocacy-lead` and `@voice-lead`
- [ ] Renewal evidence states the promise-versus-realized gap honestly, including where the gap is ours

## Part F — boundary, absolute

- [ ] **No price, discount, contract term or renewal position anywhere in the output (CRITICAL —
      that decision is the sales squad's, and crossing the line makes the value evidence look like
      advocacy for a deal)**
- [ ] **No retention by obstruction: no cancellation friction, no data withholding, no auto-renewal
      exploitation, however framed (CRITICAL)**
- [ ] No activation milestone or first-value definition created here → `@onboarding-lead`
- [ ] No loyalty instrument work → `@advocacy-lead`; no feedback taxonomy or routing → `@voice-lead`
- [ ] No causal switching account → `@products:jobs-analyst`
- [ ] No telemetry implemented → `@data-engineer`
- [ ] No epic (`@pm`), story (`@sm`), backlog (`@po`), code (`@dev`), test (`@qa`) or push
      (`@devops` — exclusive)

## Part G — CUSTOMER DATA, mandatory

- [ ] All scoring, registers and autopsies at **account and cohort level** **(CRITICAL)**
- [ ] **No named individual characterized anywhere (CRITICAL)** — health is a property of an account
- [ ] No personal data stored beyond what the retention question requires **(CRITICAL)**
- [ ] Customer records referenced by id, never reproduced — no contact records, contract terms,
      support transcripts or identified verbatims **(CRITICAL)**
- [ ] Anonymous feedback used as a signal input **never re-identified (CRITICAL)**
- [ ] Confidentiality terms attached at collection honoured in every derived signal
- [ ] Special-category personal data stopped and escalated to the human owner **(CRITICAL)**

## Part H — No Invention (Constitution Article IV) and attribution

- [ ] Every signal, weight, lead time and root cause traces to instrumented data, a dated customer
      record or a dated interview **(CRITICAL)**
- [ ] Anything unsourced is marked UNVERIFIED and does not enter the model
- [ ] **No quotation, law number, page reference or canonical wording from the source methodology is
      published without being checked against the book (CRITICAL — a wrong attribution is worse than
      no attribution)**
- [ ] Paraphrases of the source are labelled *paraphrase, not quotation*
- [ ] Industry-standard retention metrics are **not** attributed to the source
- [ ] This squad's own conventions (lead-time validation, backward validation, the
      unserved/unhappy/unfit/drift split, deferred-risk logging) are stated as this squad's, not as
      the source's content

---

## Verdict

| Condition | Verdict |
|---|---|
| All CRITICAL satisfied, at most three non-critical gaps | **DEPLOY** |
| All CRITICAL satisfied, four or more non-critical gaps | **DEPLOY WITH LIMITS STATED** in the artifact |
| Any CRITICAL unsatisfied | **BLOCK** |
| Backward validation not run, or states do not separate | **BLOCK — do not deploy** |
| A signal admitted whose lead time sits inside the intervention window | **BLOCK the signal**, revise the model |
| Any price, discount or term recommendation present | **BLOCK and remove** — boundary breach |

A blocked model is cheaper than a deployed one that does not separate. The deployed one costs three
quarters of misplaced confidence before anyone tests it.
