# Activation Model Checklist

**Checklist ID:** CS-CL-002
**Referenced by:** `onboarding-lead` (Threshold)
**Applies to:** `*define-first-value`, `*activation-path`, `*habit-criterion`, `*measure-ttfv`,
`*cohort-read`, `*diagnose-early-life`, `*friction-audit`, `*handover-contract`, `*activation-model`
**Purpose:** The quality bar an activation model, a TTFV report or a stall diagnosis must clear
before it is published or handed to `@retention-lead`.

[[LLM: EXECUTION

Mark `[x]` only where you can name the evidence. `[ ]` where you cannot. `[N/A]` with a written
reason where the item genuinely does not apply.

CRITICAL items block publication. They are not weighted against the rest — each one names a specific
way an activation model reports success on accounts that received nothing, and every downstream
metric built on it inherits the defect.

Method attribution note, binding on every item below: time-to-first-value and activation is a
**practitioner discipline with no single canonical published work**. Do not attach an author, a book
or a year. Constructs with a documented source are attributed at the point of use; constructs
without one are labelled practitioner convention.]]

---

## 1. First value

- [ ] First value is defined **before** any onboarding step is designed **(CRITICAL — a path
      designed before the destination is justified by history, and every step becomes permanent
      because nobody can say what it was for)**
- [ ] The definition is **binary**: answerable yes or no for a given account on a given date
- [ ] The definition is **observable** in data today, or with named instrumentation and a stated
      fallback
- [ ] The definition is the **customer's outcome**, not a vendor completion event **(CRITICAL —
      account created, training delivered, integration connected and checklist complete are all
      reachable while the customer's Monday is unchanged)**
- [ ] An account **cannot** reach the definition without the outcome actually occurring **(CRITICAL)**
- [ ] Segmentation was run first, and segments that buy different outcomes have **separate**
      definitions
- [ ] The outcome bought is sourced from a **dated** interview, renewal note or won-deal record

## 2. Historical separation

- [ ] The definition was tested against retained accounts **and** accounts that churned early
      **(CRITICAL — a definition that does not separate is describing effort, not value)**
- [ ] The test used a **closed observation window**, not an open one
- [ ] The result is reported, including a negative result
- [ ] Where a previous definition existed, its separation result is reported for comparison
- [ ] A definition that failed to separate was **rejected**, not weakened until it passed

## 3. Path

- [ ] The path was worked **backwards** from the definition, not forwards from the current process
- [ ] Every step names the milestone it unlocks; steps that unlock nothing are marked for removal
- [ ] Every milestone is binary, observable, and unlocks something the next one needs
- [ ] Each milestone names an owner, marked vendor-controlled or customer-controlled
- [ ] Prerequisites are named with their **customer-side owner role** and moved into the handover
      contract rather than discovered mid-path
- [ ] Customer decisions nobody prepared them to make are flagged explicitly — they dominate elapsed
      time and are invisible in vendor effort logs
- [ ] The shortest credible path is identified: the narrowest configuration that still produces a
      real outcome for a real user
- [ ] Remediations are ranked by elapsed time saved per unit of effort, not by how annoying a step
      feels

## 4. Measurement

- [ ] The **start event** is fixed and stated — signature, kickoff or first access — with why
- [ ] TTFV is reported as a **distribution** (median, p75, p90), never as a mean alone **(CRITICAL)**
- [ ] The **never-activated rate** is reported alongside every TTFV figure **(CRITICAL — a figure
      computed only over accounts that activated is survivorship bias, and the accounts that never
      arrive are the population that churns first)**
- [ ] The observation window is **closed**; an open window cannot produce a never-activated rate
- [ ] Figures are split by segment, by entry channel, and by whether prerequisites existed at handover
- [ ] The step at which p90 diverges from the median is identified as the intervention target
- [ ] Data limitations are stated: accounts excluded and why, backfilled events, small-n segments
- [ ] No metric in the model can move while the customer gets nothing **(CRITICAL — logins,
      sessions and page views survive in activation models because they are cheap to collect, not
      because they indicate anything)**

## 5. Stalls

- [ ] Stalls are **located and counted before they are explained** **(CRITICAL — a stall described
      from memory produces interventions aimed at the most memorable stall rather than the largest)**
- [ ] The cohort and window are defined; one account is a case, not a diagnosis
- [ ] Stalls are ranked by count, then by revenue exposure at **account level**
- [ ] Each top stall is classified as **prerequisite** (customer-controlled), **friction**
      (vendor-controlled) or **wrong fit** (neither) **(CRITICAL — these three have opposite
      remedies and the wrong one consumes the window in which the right one would have worked)**
- [ ] Segment, channel or time concentration is checked, since it usually points at the cause
- [ ] Where the cause cannot be told from data, interviews precede any proposal
- [ ] Each finding states what evidence would falsify it

## 6. Adoption versus activation

- [ ] The habit criterion is defined **separately** from activation, with behaviour, frequency and
      distinct-user threshold
- [ ] Champion activation is distinguished from account adoption in every cohort read **(CRITICAL —
      one enthusiastic user reaching first value while intended daily users never start survives
      until the champion changes role, then presents as sudden unexplained churn)**
- [ ] Adoption gaps are classified as never invited / invited and never started / started and
      stopped — three causes with different remedies
- [ ] Single-champion dependency risk is stated explicitly where it exists

## 7. Handover and promise integrity

- [ ] The handover contract states inbound requirements, outbound commitments, the refusal condition
      and the promise-mismatch escalation
- [ ] An account missing a blocking item enters a named pre-start state rather than consuming an
      onboarding slot it cannot progress through
- [ ] An outcome promised at sale that is unreachable by any path is **escalated as a promise
      defect** to `@cs-chief` and the sales squad on the day it is identified **(CRITICAL —
      absorbing it silently means the same promise is made to the next ten accounts)**
- [ ] Wrong-fit accounts are named as a pattern and escalated; investment stops rather than continuing

## 8. Instrumentation and No Invention (Constitution Article IV)

- [ ] Every element is marked INSTRUMENTED, PARTIALLY INSTRUMENTED or UNMEASURED
- [ ] Partially instrumented definitions state what degrades and what the fallback is — never
      quietly downgraded
- [ ] Instrumentation gaps are raised to `@data-engineer` as named requirements
- [ ] Every stall, milestone and time figure traces to instrumented data, a dated customer record or
      a dated interview **(CRITICAL)**
- [ ] Anything unsourced is marked UNVERIFIED and does not enter the model
- [ ] No published framework, author, book or year is attached to the discipline itself

## 9. CUSTOMER DATA — mandatory

- [ ] All analysis at account and cohort level **(CRITICAL)**
- [ ] No personal data stored beyond what the activation question requires **(CRITICAL)**
- [ ] Customer records referenced by id, never reproduced — no transcripts, internal customer
      documents, contact records or identified verbatims **(CRITICAL)**
- [ ] **No credentials, tokens, access secrets or connection strings anywhere in any artifact
      (CRITICAL)** — where access blocks a milestone, record the prerequisite and the customer-side
      role that grants it, never the secret
- [ ] No anonymous feedback re-identified **(CRITICAL)**
- [ ] No named individual characterized; activation is a property of an account **(CRITICAL)**
- [ ] Special-category personal data stopped and escalated to the human owner **(CRITICAL)**

## 10. Boundary

- [ ] No screens, flows or copy designed — friction findings handed to `@ux-design-expert`
- [ ] No telemetry implemented — requirements handed to `@data-engineer`
- [ ] No health score or renewal risk produced — milestones and habit criterion handed to
      `@retention-lead` as **inputs**
- [ ] No loyalty instrument (`@advocacy-lead`) or feedback taxonomy (`@voice-lead`) work performed
- [ ] No customer-job discovery (`@products:jobs-analyst`) or discovery program
      (`@products:discovery-lead`)
- [ ] No contract term, implementation fee or commercial scope decided — sales squad
- [ ] No epic (`@pm`), story (`@sm`), code (`@dev`), test (`@qa`) or push (`@devops` — exclusive)

---

## Verdict

| Condition | Verdict |
|---|---|
| All CRITICAL satisfied, no more than three non-critical gaps | **PUBLISH** |
| All CRITICAL satisfied, four or more non-critical gaps | **PUBLISH WITH GAPS NAMED** in the artifact |
| Any CRITICAL unsatisfied | **BLOCK** |
| First value unfalsifiable, or historical separation not run | **BLOCK — do not design the path** |
| Never-activated rate absent from a TTFV report | **BLOCK** |

Handing an unblocked-but-defective activation model to `@retention-lead` propagates the defect into
the health model, where it becomes far more expensive to find.
