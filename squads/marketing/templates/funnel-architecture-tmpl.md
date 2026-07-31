# Funnel Architecture — {{FUNNEL NAME}} / {{OFFER}}

**Template ID:** MKT-TM-007
**Owned by:** `@marketing:funnel-lead` (Weir)
**Produced by:** `*funnel-map`, `*leak-hunt`, `*value-ladder`, `*sequence-design`,
screened by `*integrity-screen`
**Consumed by:** `@marketing:analytics-lead` (instruments it), `@ux-design-expert` (executes a
step), `@pm` (where a leak is a product gap), `@marketing:demand-lead` (source consequences)

**Method source, and what kind of source it is.** The architecture applied here is published by
Russell Brunson in *DotCom Secrets* (2015), with belief-shift sequencing from *Expert Secrets*
(2017) and traffic origin from *Traffic Secrets* (2020), each named separately. These are
**practitioner manuals with a track record** — method distilled by an operator from their own
operating history. They give a decomposition and a sequence: where the steps are, what each is
for, and the discipline of asking *which step failed* rather than declaring the funnel broken.
They do not give a sampling frame, a control condition or dispersion, so **no conversion figure
in them is a benchmark for this funnel**.

That is a different class of evidence from the research programmes the rest of this squad runs
on — Sharp reporting Ehrenberg-Bass, Binet and Field analysing the IPA Databank, Kaushik on
measurement. Both are legitimate. They are not interchangeable, and this document keeps them
distinguishable by tagging every claim with its class.

[[LLM: FILLING INSTRUCTIONS

1. EVERY claim carries an evidence class tag:
   `[CLASS: PRACTITIONER HEURISTIC — Brunson, DotCom Secrets, 2015]`
   `[CLASS: EMPIRICAL — <programme>]` · `[CLASS: OUR DATA — <instrument>, <period>]`
   `[CLASS: UNVERIFIED]`
   A step target quoted from a manual and presented as a norm is a critical defect.

2. NEVER fill a `⟨READ FROM PUBLICATION⟩` slot from memory. Read it from the publication
   or describe the mechanism without the number. Once read it is still PRACTITIONER
   HEURISTIC — it described that operator's funnels, not a measured population.

3. NEVER compare a step reading to a remembered benchmark. Compare a step to ITSELF over
   time, or to a controlled variant. §3 has no benchmark column by design.

4. The OFFER is an INPUT (§1). A funnel carries an offer; it cannot repair one. If the
   offer step fails on relevant traffic with a clean step, that is an OFFER FAILURE —
   route to `@marketing:offer-lead` and stop optimising the funnel.

5. §5 is a GATE. Any BLOCK stops the step from shipping. A blocked element is replaced
   with the compliant alternative, never reworded until it passes on phrasing.

6. If §3 cannot be filled because the per-step readings do not exist, say so plainly and
   make instrumentation recommendation one. A confident diagnosis on absent data is worse
   than no diagnosis.]]

---

## 0. Inputs consumed (not authored here)

| Input | Value | Source artifact | Owner |
|---|---|---|---|
| Market category, alternatives, segment | | | `@products:positioning-lead` |
| Price, packaging, renewal mechanics | | | `@products:pricing-strategist` |
| Distinctive assets and CEPs the funnel must express | | | `@marketing:brand-lead` |
| Sources bought and at what level | | | `@marketing:demand-lead` |

---

## 1. The offer this funnel carries (input)

| Field | Entry |
|---|---|
| Offer name | |
| Offer construction artifact | `templates/offer-construction-tmpl.md` instance at: |
| Offer integrity gate verdict | `CLEAR` / `BLOCKED` / **`NOT SCREENED`** |
| Binding term of the value equation (from the offer doc §3.3) | |

> **A funnel carries an offer; it does not construct one and cannot repair one.** If the offer
> has not been constructed or is BLOCKED, stop here and route to `@marketing:offer-lead`.
> Optimising steps around an unsound offer produces a well-instrumented failure.

---

## 2. Funnel map

One row per step. Each step has one job and one reading.

| # | Step | Job (one sentence) | Surface | Reading that judges it | Instrumented? |
|---|---|---|---|---|---|
| 1 | Traffic origin | | | Arrivals by source, with intent characterised | Yes / **No** |
| 2 | Entry step | | | Continuation to next step, **by source** | |
| 3 | Capture | | | Capture rate; share who engage afterwards | |
| 4 | Offer presentation | | | Conversion among arrivals from a known source | |
| 5 | Transaction | | | Initiate → complete; time to complete | |
| 6 | Immediate sequence | | | Time to first outcome; refunds; complaints | |
| 7 | Follow-up sequence | | | Engagement over time; unsubscribe rate | |
| 8 | Ascension | | | Take-up among **delivered** buyers | |

**Steps that do not exist in this funnel:** (list, with one line on why)

---

## 3. Step readings — **by source, never aggregated**

[CLASS: OUR DATA — name the instrument and period per row]

An aggregate funnel conversion rate is the number that hides the diagnosis. Mix shift alone
moves it with no step changing.

| Step | Source A | Source B | Source C | Period | Instrument | Class |
|---|---|---|---|---|---|---|
| Entry → next | | | | | | |
| Capture | | | | | | |
| Offer → initiate | | | | | | |
| Initiate → complete | | | | | | |
| First outcome delivered | | | | | | |
| Ascension | | | | | | |

**There is deliberately no "benchmark" column.** A step rate recalled from a manual came from a
different business, source mix and offer. Compare a step to itself over time, or to a controlled
variant designed by `@marketing:analytics-lead`.

**Reading status:** `MEASURED BY SOURCE` / `MEASURED IN AGGREGATE ONLY — diagnosis limited` /
`NOT INSTRUMENTED — no diagnosis available`

> If the status is `NOT INSTRUMENTED`, the finding of this document is that instrumentation is
> recommendation one. Route to `@marketing:analytics-lead` and do not produce a ranked leak list
> from estimates presented as findings.

---

## 4. Leak diagnosis

Exactly one **primary** leak, named with the evidence that selects it. Secondary leaks are listed
separately and are not fixed first.

| Field | Entry |
|---|---|
| **Primary leak step** | |
| **Leak class** | `PROMISE BREAK` / `INTENT MISMATCH` / `OFFER FAILURE` / `COMPREHENSION GAP` / `PROOF GAP` / `FRICTION DRAG` / `UNEXPECTED COST` / `SEQUENCE BREAK` / `DELIVERY GAP` / `INSTRUMENTATION GAP` |
| **Evidence that selects it** | |
| **Evidence class** | `OUR DATA` / `ESTIMATED` — an estimated diagnosis is a hypothesis, label it one |
| **Fix owner** | |

**Routing rules that override "fix the step":**

| If the class is | Then it is not a funnel fix | Route to |
|---|---|---|
| `OFFER FAILURE` | The offer does not convert on relevant traffic | `@marketing:offer-lead` — before any more traffic is bought |
| `INTENT MISMATCH` | The source selects people without the problem | `@marketing:demand-lead`, `@products:positioning-lead` |
| `DELIVERY GAP` | The funnel works; the product step does not | `@pm` |
| `INSTRUMENTATION GAP` | There is no diagnosis yet | `@marketing:analytics-lead` |
| `FRICTION DRAG` | Named here, implemented elsewhere | `@pm` → `@sm` → `@dev`, never direct |

**Secondary leaks (not fixed first):**

| Step | Class | Why it waits |
|---|---|---|
| | | |

---

## 5. Integrity gate — **any BLOCK stops the step shipping**

Screened against `checklists/funnel-integrity-checklist.md`.

| # | Check | Verdict | Blocked element (verbatim) | Compliant alternative (verbatim) |
|---|---|---|---|---|
| 1 | No countdown that resets or deadline without a real dated consequence | PASS / **BLOCK** | | |
| 2 | No seat, slot or inventory counter not backed by a tracked limit | PASS / **BLOCK** | | |
| 3 | No fabricated activity proof, notifications or reviews | PASS / **BLOCK** | | |
| 4 | No pre-selected add-on or charge not explicitly agreed at that moment | PASS / **BLOCK** | | |
| 5 | Renewal, amount and cancellation path disclosed before payment | PASS / **BLOCK** | | |
| 6 | Capture is explicit opt-in, purpose and frequency stated, unsubscribe works | PASS / **BLOCK** | | |
| 7 | Every step is exitable — no back-button hijack, no undismissable modal | PASS / **BLOCK** | | |
| 8 | The entry step delivers the promise that bought the arrival | PASS / **BLOCK** | | |
| 9 | No manufactured origin story, fabricated history or invented credential | PASS / **BLOCK** | | |

**Whole-funnel tests:**

| Test | Question | Verdict |
|---|---|---|
| Reversal | If the visitor saw how each step was constructed, would they consider it fair dealing? | PASS / **BLOCK** |
| Exit | At every step, can they leave, decline or unsubscribe in one obvious action? | PASS / **BLOCK** |
| Disclosure | Is every cost, term and recurring charge disclosed before the committing step? | PASS / **BLOCK** |
| Delivery | If everyone converted today, would the promised first outcome be delivered? | PASS / **BLOCK** |

**Gate verdict:** `CLEAR` / **`BLOCKED`** — blocked items: ______
**If proceeding against the screen:** named decider, dated: ______

---

## 6. Value ladder and ascension

[CLASS: PRACTITIONER HEURISTIC — Brunson, *DotCom Secrets*, 2015]

| Rung | Offer | Complete outcome on its own? | Ascension trigger | Price owner |
|---|---|---|---|---|
| | | Yes / No → rebuild or remove | Delivered outcome, not payment | `@products:pricing-strategist` |

> **Ascension is offered after an outcome is delivered, not after a payment is taken.** A rung
> whose only purpose is to lead to the next is bait. Price relationships between rungs are
> discussed in the source; if one is needed it is `⟨READ FROM PUBLICATION⟩` and stays labelled
> PRACTITIONER HEURISTIC after it is read.

---

## 7. Traffic origin

[CLASS: PRACTITIONER HEURISTIC — Brunson, *Traffic Secrets*, 2020]

| Source | Owned or rented | Intent it selects for | Step it breaks first | Share of arrivals |
|---|---|---|---|---|
| | owned / rented | | | |

| Field | Entry |
|---|---|
| Share of arrivals from rented distribution | |
| Single point of failure if that platform changes? | Yes / No |
| Conversion to owned contact — by explicit consent? | Yes / **BLOCK** |

> **Which sources to buy and how much to spend is `@marketing:demand-lead`.** What belongs here
> is the *consequence* of an origin on this funnel: which step it breaks, and whether the funnel
> can be read at all without segmenting by it.

> **[CLASS: EMPIRICAL — see `@marketing:brand-lead`]** A funnel reaches people already in market.
> Growth in the number of people who ever enter it comes from mental availability among category
> buyers who are not in market today. Funnel work and brand building are different mechanisms
> with different evidence bases; neither substitutes for the other, and this document does not
> claim otherwise.

---

## 8. What must be instrumented

This section specifies **what**. `@marketing:analytics-lead` decides **how** and states the limits.

| Requirement | Why | Status |
|---|---|---|
| Per-step readings, segmented by source | An aggregate rate hides which step failed | |
| Time to first outcome delivered | Separates a funnel win from a refund queue | |
| Refunds, complaints and reason codes | The cost of a conversion lift shows up here | |
| Unsubscribe rate against the frequency disclosed at capture | Detects a sequence exceeding consent | |
| Test design before any lift is claimed | A lift with traffic mix moving is not attributable | |

**Test design status:** `DESIGNED BY ANALYTICS-LEAD` / `NOT DESIGNED — no lift may be claimed`

---

## 9. Handed to other agents

| Question | Owner | What they receive |
|---|---|---|
| The offer does not convert on relevant traffic | `@marketing:offer-lead` | §4 diagnosis |
| Instrumentation, segmentation, test design | `@marketing:analytics-lead` | §8 |
| Source selection and spend consequence | `@marketing:demand-lead` | §7 |
| Editorial promise consistency at the entry step | `@marketing:content-lead` | §2 step 2 |
| Comprehension and interface execution of a step | `@ux-design-expert` | §4 |
| A leak that is a product or delivery gap | `@pm` | §4 |
| Handoff to a human sales motion that is itself the leak | `@sales:pipeline-ops` | §2, §4 |

**Not decided here:** offer construction, guarantees, price, packaging, market category, media
budget, instrument design, implementation.

---

## 10. Open items

| Item | Type | Blocking? | Owner | Due |
|---|---|---|---|---|
| | `⟨READ FROM PUBLICATION⟩` slot / UNVERIFIED figure / NOT INSTRUMENTED / MISSING INPUT / **BLOCK unresolved** | | | |

---

## 11. Record

- **Owner:**
- **Date:**
- **Review date:**
- **Evidence summary:** _n_ claims PRACTITIONER HEURISTIC, _n_ EMPIRICAL, _n_ OUR DATA, _n_ UNVERIFIED
- **Integrity gate:** `CLEAR` / `BLOCKED` — with blocked items named
- **Decisions this document is permitted to justify:** which step to look at and in what order,
  resting on the heuristic; magnitudes and targets resting only on OUR DATA. A practitioner
  heuristic never justifies a step target. An UNVERIFIED figure never justifies anything.

---

*Written to the repository, not to a transcript (Constitution Article I — CLI First).
Every claim names its source and its evidence class (Constitution Article IV — No Invention).*
