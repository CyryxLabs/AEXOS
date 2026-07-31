# Funnel Integrity Checklist

**Checklist ID:** MKT-CL-007
**Referenced by:** `@marketing:funnel-lead` (Weir) — `*funnel-map`, `*leak-hunt`,
`*sequence-design`, `*integrity-screen`
**Applies to:** any funnel about to ship, any step about to change, any leak diagnosis about to
justify spend
**Purpose:** apply three tests at once — is the funnel **decomposed** (can any step be read at
all), is the diagnosis **honest** (does it rest on this funnel's own data rather than a
remembered benchmark), and is every step **non-coercive** (can the visitor leave, decline and
see what they are agreeing to).

**Method source, and what kind of source it is.** Russell Brunson, *DotCom Secrets* (2015), with
*Expert Secrets* (2017) and *Traffic Secrets* (2020) named separately. These are **practitioner
manuals with a track record** — method distilled by an operator from their own operating
history. They supply a decomposition and a sequence, and the discipline of asking which step
failed rather than declaring the funnel broken. They do not supply a sampling frame, a control
condition or dispersion, so no conversion figure in them is a benchmark for this funnel.

This differs in kind from the sources behind `@marketing:brand-lead` (Sharp, reporting
Ehrenberg-Bass), `@marketing:demand-lead` (Binet and Field, analysing the IPA Databank) and
`@marketing:analytics-lead` (Kaushik), which are **research programmes with published data**.
Both are legitimate bases for a recommendation. Section G exists because a step target quoted
from a manual and treated as a norm becomes a performance target nobody can trace.

[[LLM: EXECUTION INSTRUCTIONS

This checklist has two mechanics and they are not the same.

  - Sections A–E and G–H are SCORED. Mark [x] pass, [ ] fail, [N/A] with a written reason.
  - Section F is a BLOCKING SCREEN. Mark PASS, **BLOCK** or N/A. There is no "partial".
    A single BLOCK stops the step from shipping regardless of every other score.

For every BLOCK, write the compliant alternative in the verdict table. Never soften a blocked
element into wording that passes on phrasing — a dismissible-looking modal that cannot be
dismissed is still a trap.

Three failure modes this checklist exists to catch, which a generic quality checklist misses:
  - An aggregate conversion rate presented as a diagnosis. Check B.1 catches it.
  - An offer failure being optimised as a funnel problem. Check C.2 catches it, and it is the
    most expensive one because it consumes traffic budget indefinitely.
  - A step target recalled from a manual. Check G.4 catches it.

If the per-step readings do not exist, the honest finding is that no diagnosis is available.
Mark C as N/A with that reason and make instrumentation recommendation one. Do not score a
confident leak list built from estimates.]]

---

## A. Gate — the offer this funnel carries

*Any FAIL here blocks approval. A funnel carries an offer; it cannot repair one.*

- [ ] **A.1** The offer has been **constructed** by `@marketing:offer-lead` and the artifact is
  named. Steps are not being optimised around an offer nobody built.
- [ ] **A.2** The offer's integrity gate verdict is `CLEAR`. *(A BLOCKED offer does not get
  carried; it gets fixed.)*
- [ ] **A.3** The price is consumed from `@products:pricing-strategist`. No price, discount or
  packaging decision is made in this document.
- [ ] **A.4** The position — category, alternatives, segment — is consumed from
  `@products:positioning-lead`.
- [ ] **A.5** Where the offer step fails on relevant, correctly-sourced traffic with a clean step,
  the document says **OFFER FAILURE** and routes back, rather than continuing to optimise.
  *(This is the most expensive misdiagnosis available: it converts an offer problem into an
  indefinite traffic budget.)*

## B. Decomposition — can any step be read

- [ ] **B.1** The funnel is stated as **steps with one job and one reading each**, not as a single
  conversion rate. *(An overall funnel conversion rate is the number that hides the diagnosis.)*
- [ ] **B.2** Every step reading is segmented **by traffic source**. *(Aggregate readings move on
  mix shift alone with no step changing.)*
- [ ] **B.3** Each reading names its instrument and its period.
- [ ] **B.4** Where a step is not instrumented, it is marked NOT INSTRUMENTED and that gap is
  recommendation one, routed to `@marketing:analytics-lead`.
- [ ] **B.5** Where readings exist only in aggregate, the document says the diagnosis is limited
  rather than producing a confident step-level finding from them.

## C. Diagnosis

- [ ] **C.1** Exactly **one primary leak** is named, with the step and the evidence that selects it.
- [ ] **C.2** The leak is **classified** — promise break, intent mismatch, offer failure,
  comprehension gap, proof gap, friction drag, unexpected cost, sequence break, delivery gap,
  instrumentation gap — rather than described loosely.
- [ ] **C.3** The routing rules were applied: an offer failure goes to `@marketing:offer-lead`, an
  intent mismatch to `@marketing:demand-lead` and `@products:positioning-lead`, a delivery gap to
  `@pm`, an instrumentation gap to `@marketing:analytics-lead`.
- [ ] **C.4** No step is being modified to accommodate a **mismatched source**. *(That degrades the
  step for the sources that were working.)*
- [ ] **C.5** Secondary leaks are listed separately with a reason each waits, not fixed in parallel.
- [ ] **C.6** Where the diagnosis rests on estimates rather than readings, the document labels
  itself a **hypothesis** in its own header.

## D. Step construction

- [ ] **D.1** The entry step delivers the same promise that bought the arrival.
- [ ] **D.2** Every step states, in the visitor's terms, what they get, who it is for and what
  happens next.
- [ ] **D.3** Total cost — fees, taxes, required extras, implementation — is disclosed at the first
  step where cost is discussed, not at the final one.
- [ ] **D.4** The transaction step has no requirement that is not necessary to complete the
  purchase.
- [ ] **D.5** The immediate sequence delivers a real **first outcome** before any next step is
  offered. *(Ascension is earned by a delivered outcome, not by a taken payment.)*
- [ ] **D.6** Follow-up frequency does not exceed what was disclosed at capture.
- [ ] **D.7** Each ladder rung is independently complete for its own narrower promise.

## E. Traffic origin

- [ ] **E.1** Each source is characterised by the **intent it selects for**, not only by volume.
- [ ] **E.2** Owned and rented distribution are distinguished, and the share from rented sources
  is stated.
- [ ] **E.3** Where the entire origin is rented, the single point of failure is named as a
  structural risk.
- [ ] **E.4** Conversion of rented reach into owned contact happens by explicit consent.
- [ ] **E.5** Source selection and spend level are **not decided here** — they are routed to
  `@marketing:demand-lead` with the funnel consequence attached.

---

## F. Integrity screen — **BLOCKING**

*PASS / **BLOCK** / N/A. A single BLOCK stops the step shipping. Not scored, not averaged.*

- [ ] **F.1 Countdown and deadline.** No timer that resets per visitor, no evergreen "closes
  tonight" that reopens, no deadline without a real dated consequence.
  > **BLOCK example:** a 15-minute timer that restarts on every page load.
  > **Compliant form:** a real cohort start date, or no timer and a plain line on what genuinely
  > changes if they wait — often "nothing changes, and here is what waiting costs you anyway."

- [ ] **F.2 Inventory and seat counters.** No "N spots remaining" that is not backed by a tracked,
  enforced limit. No decorative live counters.

- [ ] **F.3 Activity proof.** No "N people are viewing this" that is not measured, no invented
  recent-purchase notifications, no fabricated reviews or ratings.

- [ ] **F.4 Charges.** No pre-selected add-ons. No one-click charge without explicit agreement at
  that moment. No fee first revealed at the final step.

- [ ] **F.5 Continuity.** Renewal, amount and date disclosed before payment. Cancellation is at
  most as hard as buying, and available on the same surface.

- [ ] **F.6 Consent at capture.** Explicit opt-in, stated purpose, stated frequency, unsubscribe
  that works immediately. No purchased or scraped lists. No pre-checked boxes.

- [ ] **F.7 Exit.** No back-button hijack, no undismissable modal, no interstitial without a
  visible close, no confirm-shaming as the only way out.
  > **Compliant form:** a dismissible offer with a plain decline, shown once. If it only works
  > when the visitor cannot escape, it was never persuasion.

- [ ] **F.8 Bait entry.** The entry step delivers exactly the promised thing, completely, and any
  next step is a genuine option.

- [ ] **F.9 Origin story.** No invented founder narrative, no fabricated results history, no
  credential that does not exist.

### The four whole-funnel tests

- [ ] **F.10 Reversal.** If the visitor saw exactly how each step was constructed — every timer's
  real basis, every counter's real basis, every default's purpose — would they consider the
  dealing fair?
- [ ] **F.11 Exit.** At **every** step, can the visitor leave, decline or unsubscribe in one
  obvious action?
- [ ] **F.12 Disclosure.** Is every cost, term and recurring charge disclosed before the step at
  which the buyer commits?
- [ ] **F.13 Delivery.** If every visitor converted today, would the promised first outcome
  actually be delivered? *(A funnel optimised past what delivery can honour builds a refund queue
  and calls it growth.)*

---

## G. Evidence class and attribution integrity

- [ ] **G.1** Every claim carries an evidence class: `PRACTITIONER HEURISTIC`, `EMPIRICAL`,
  `OUR DATA` or `UNVERIFIED`.
- [ ] **G.2** **No practitioner heuristic is stated in the voice of an empirical finding.** The
  document says which claims come from a manual distilled from one operator's experience and
  which come from a research programme with a sampled population. *(**Critical** item.)*
- [ ] **G.3** Concepts from *Expert Secrets* (2017) and *Traffic Secrets* (2020) are attributed to
  those works and not folded into *DotCom Secrets* (2015).
- [ ] **G.4** **No step conversion target is compared to a remembered benchmark.** Steps are
  compared to themselves over time, or to a controlled variant. *(A rate from a manual came from a
  different business, source mix and offer; used as a target it becomes a performance goal nobody
  can trace to a measurement.)*
- [ ] **G.5** No step conversion rate, list-size threshold, value-ladder price ratio or ad spend
  ratio is quoted from these books **from memory**. Either it was read from the publication, or
  the mechanism is described without the number.
- [ ] **G.6** A figure read from the publication is still labelled PRACTITIONER HEURISTIC and
  carries no dispersion.
- [ ] **G.7** No lift is claimed without a test designed by `@marketing:analytics-lead`, with
  traffic mix, offer and season accounted for.
- [ ] **G.8** No UNVERIFIED figure is load-bearing for a decision.
- [ ] **G.9** The document does not claim that a funnel improvement constitutes brand growth.
  *(A funnel reaches people already in market; penetration and mental availability are measured
  over windows this does not span, on a population this never sees. That belongs to
  `@marketing:brand-lead` and `@marketing:demand-lead`.)*

## H. Boundary and capture

- [ ] **H.1** No offer construction, guarantee or risk-reversal decision is made here
  (`@marketing:offer-lead`).
- [ ] **H.2** No price or packaging decision (`@products:pricing-strategist`); no category,
  alternatives or segment (`@products:positioning-lead`).
- [ ] **H.3** No media budget, source selection or brand-vs-activation split
  (`@marketing:demand-lead`).
- [ ] **H.4** No instrument designed here; requirements are handed to
  `@marketing:analytics-lead`.
- [ ] **H.5** No implementation of any page, form or tracking change (`@dev`, via `@pm` → `@sm`),
  no test plan (`@qa`), no release (`@devops`), no story (`@sm`).
- [ ] **H.6** Written to the repository with an owner and a review date.
- [ ] **H.7** At least one falsifying observation is named: what would tell us this diagnosis was
  wrong, and by when.

---

## Verdict

**Screen:** any **BLOCK** in Section F → `BLOCKED`, regardless of every score below.
**Gate:** any FAIL in Section A → `BLOCKED`.
**Score:** checked items ÷ total applicable items across B–E and G–H.

| Verdict | Condition |
|---|---|
| `APPROVED` | Section F clear, Section A clean, score ≥ 90%, no FAIL in A.5, B.2, C.2, G.2 or G.4 |
| `CONCERNS` | Section F clear, Section A clean, score 75–89%, or a single FAIL in a non-critical item |
| `REWORK` | Score below 75%, or any FAIL in B.2 (unsegmented readings), C.2 (leak unclassified), G.2 (heuristic stated as finding) or G.4 (remembered benchmark used as target) |
| `BLOCKED` | Any **BLOCK** in Section F, or any FAIL in Section A |

**Critical items regardless of score:** A.1–A.5, B.2, C.2, C.3, G.2, G.4.

### Blocked-element record

| Blocked item | Element (verbatim) | Compliant alternative (verbatim) | Legitimate goal survives the rewrite? |
|---|---|---|---|
| | | | yes / no — if no, say so plainly |

**If proceeding against the screen:** named decider, dated. Logged as decided against advice.

## Priority fix order

1. **Section F** — integrity. A coercive step is replaced before any optimisation is discussed.
   An effective trap is still a trap.
2. **A.1 / A.2 / A.5** — the offer. Optimising a funnel around an unsound offer is the most
   expensive mistake on this list, because it consumes traffic budget without a terminating condition.
3. **B.2 / B.4** — segmentation and instrumentation. Without these there is no diagnosis, only a
   confident guess.
4. **G.2 / G.4** — evidence class and remembered benchmarks. An attribution defect propagates
   into targets and cannot be traced back afterwards.
5. **C** — the diagnosis itself and its routing.
6. **D / E** — step construction and origin.
7. **H** — boundary and capture.
