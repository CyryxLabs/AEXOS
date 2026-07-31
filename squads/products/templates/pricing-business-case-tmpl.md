# Outside-In Pricing Business Case — [OFFER_NAME]

**Template ID:** PRD-TM-BC-003
**Owner agent:** `@pricing-strategist` (Assay)
**Serves command:** `*business-case`
**Upstream inputs:** `wtp-interview-guide-tmpl.md` findings (WTP per segment, method, sample) and `packaging-design-tmpl.md` (tiers, segments, prices, fences)
**Method source:** Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the Product Around the Price* (2016) — Rule 7, "Build an outside-in business case".

> **Standing instruction, before anything is filled in:**
> An outside-in case starts from measured willingness to pay and observed segment sizes and produces
> whatever number it produces. **If the result does not meet the target, that is a finding, not an
> error to correct.** Adjusting take rates until the total matches is how the undead gets funded.
> A case that cannot fail on paper cannot succeed in market.

[[LLM: FILL INSTRUCTIONS — OUTSIDE-IN BUSINESS CASE

BUILD ORDER IS THE METHOD. Fill sections 2 → 3 → 4 → 5 → 6 → 7 → 8 in that order and never the
reverse. Do not open a spreadsheet with a revenue target in a cell. Do not fill Section 5 (volume)
before Section 4 (take rates) — volume is DERIVED, never entered.

If you find yourself editing a take rate after seeing the total, stop. That is the inside-out case,
and it is the failure this template exists to prevent. Record the impulse in Section 9 instead.

Every number in this document must carry a source. Numbers without one are marked UNVERIFIED and
are excluded from every total. This is a hard gate, not a style preference.]]

---

## 1. Case Header

| Field | Value | How to fill | Failure mode |
|---|---|---|---|
| Offer | `[OFFER_NAME]` | Outcome-language name | A codename nobody outside the team recognises |
| Case date | `[YYYY-MM-DD]` | | Undated case reused after its evidence has aged |
| Case owner | `[NAME]` | One accountable human | "The squad" |
| Build status at time of evidence | `[pre-build / in build / shipped]` | From the WTP study header | Presenting post-launch evidence as if it had informed the build |
| WTP evidence reference | `[LINK + date]` | Must be the actual study, not a summary of it | Citing a deck that cites a study |
| Packaging reference | `[LINK]` | The tier design these prices come from | Prices that do not match the packaging document |
| Monetization model | `[MODEL + value metric]` | From `data/monetization-models.yaml` | An unstated model. Revenue arithmetic differs completely between per-seat and usage-based |
| Pricing strategy | `[MAXIMIZATION / PENETRATION / SKIMMING]` + exit condition | Stated deliberately | A penetration price modelled with maximization take rates |
| Period modelled | `[e.g. first 12 months after GA]` | State the window and the ramp assumption | A steady-state year presented as year one |
| Currency and unit | `[ ]` | | Mixed currencies across segments |
| **Target handed to the team (if any)** | `[TARGET or NONE]` | Record it here **so it can be compared against the result, never used as an input** | Placing the target anywhere downstream of this row |

> **Why the target is recorded here and nowhere else:** so the reader can see the gap. The moment a
> target influences a take rate, an addressable count, or a price, the case stops being evidence and
> becomes a target with arithmetic attached.

---

## 2. Step 1 — Measured WTP Distribution Per Segment

**This is the first section filled. Nothing above it in the arithmetic exists yet.**

| Segment | Defining value driver | WTP distribution | Method | Sample achieved / required | Evidence reference | Status |
|---|---|---|---|---|---|---|
| `[A]` | `[ ]` | `[low X — mid Y — high Z]` | `[indirect questioning / Van Westendorp / Gabor-Granger / conjoint …]` | `[n= / required n=]` | `[study ID + interview IDs]` | `[VERIFIED / UNVERIFIED]` |
| `[B]` | | | | | | |
| `[C]` | | | | | | |

**Field instructions**

- **WTP distribution** — a distribution or at minimum a low/mid/high, never a point. *Bad answer:*
  "€12k". A single figure without the method, sample or range invites decisions with unearned
  confidence, and it removes the sensitivity analysis in Section 6 before it can be run.
- **Method** — the named instrument. *Bad answer:* "customer conversations". Then no sample
  requirement applies and the number cannot be graded.
- **Sample achieved / required** — both. *Bad answer:* achieved only. A conjoint at n=40 against a
  200+ requirement is not a weaker conjoint; it is not a conjoint result.
- **Status** — UNVERIFIED unless it traces to a documented interview, survey instrument, transaction
  record or cited benchmark.

**Stated-preference declaration:** `[WHICH OF THESE DISTRIBUTIONS ARE STATED PREFERENCE ONLY]`
Any stated-preference figure must be paired with observed behaviour before the case rests on it.
State the pairing status per segment: `[PAIRED with (evidence) / NOT YET PAIRED]`.

**Segments excluded from the case and why:** `[LIST]`
> A segment with no measured WTP does not enter the case at zero — it does not enter at all, and its
> absence is stated. Modelling an unmeasured segment at a "conservative" rate is invention.

---

## 3. Step 2 — Addressable Size Per Segment

| Segment | Addressable count | Definition of "addressable" | Source | Source type | Date of source | Status |
|---|---|---|---|---|---|---|
| `[A]` | `[N]` | `[who is counted and who is not]` | `[registry / market report / our transaction records / funnel data]` | `[external / transactional]` | `[YYYY-MM]` | `[VERIFIED / UNVERIFIED]` |
| `[B]` | | | | | | |

**Field instructions**

- **Addressable count** — the number reachable by the go-to-market you actually have, not the
  global population of the segment. *Bad answer:* total market size from a vendor report, used as
  addressable. That inflates every downstream number by the same silent multiple.
- **Definition of addressable** — state the exclusions explicitly (geography, language, regulatory,
  channel). *Bad answer:* leaving it implicit, so nobody can check whether two segments overlap.
- **Source** — a specific document, dataset or query, identifiable by someone else. *Bad answer:*
  "industry estimate". That is UNVERIFIED.
- **Overlap check:** `[HOW DOUBLE-COUNTING ACROSS SEGMENTS WAS RULED OUT]` — *Bad answer:* not
  performed. Value-based segments frequently overlap in the same accounts.

---

## 4. Step 3 — Price Points Placed Against the WTP Distribution, With Expected Take Rates

| Segment | Tier | Price | Where it sits in the WTP distribution | Expected take rate | Take-rate low | Take-rate high | Basis for the take rate | Status |
|---|---|---|---|---|---|---|---|---|
| `[A]` | `[Better]` | `[P]` | `[e.g. between mid and high of X–Z]` | `[%]` | `[%]` | `[%]` | `[discounted purchase-intent / observed conversion in comparable motion / cited benchmark]` | `[VERIFIED / UNVERIFIED]` |
| `[B]` | | | | | | | | |

**Field instructions**

- **Price** — comes from the packaging document, placed against the measured distribution.
  *Bad answer:* a price chosen to make the total work. That is the inside-out case wearing a
  different hat.
- **Where it sits in the distribution** — say it in words. *Bad answer:* a price above the measured
  high with no justification. If you price above the measured range, state why and mark the
  resulting take rate UNVERIFIED.
- **Expected take rate** — the share of the addressable count expected to buy at that price.
  *Bad answer:* a round number with no basis. Round numbers with no basis are the most common
  carrier of an inside-out case.
- **Basis for the take rate** — one of: discounted stated intent, observed conversion from a
  comparable motion, or a cited benchmark. Nothing else qualifies.
- **If the basis is discounted stated intent:** record the discount applied and its basis in
  Section 7. Stated intent overstates behaviour and must be discounted; **no universal discount
  factor is asserted here** — use your own realised stated-to-actual ratio where you have one, and
  label a judgement as a judgement. `[verify against source]`

**Take-rate low/high** are not decoration — they drive Section 6 and must be filled before Section 5.

---

## 5. Step 4 — Volume Derived From Take Rates

> **Volume is derived. It is never entered.** Each cell below is a calculation from Sections 3 and 4.
> If any volume figure was typed rather than computed, this case is inside-out and must be rebuilt.

| Segment | Addressable (§3) | Take rate (§4) | **Derived volume** | Price (§4) | **Derived revenue** |
|---|---|---|---|---|---|
| `[A]` | `[N]` | `[%]` | `[= N × %]` | `[P]` | `[= volume × P]` |
| `[B]` | | | | | |
| `[C]` | | | | | |
| **Total** | | | `[ ]` | | `[ ]` |

**Derivation statement:** `[STATE THE FORMULA USED AND ANY RAMP OR TIMING ADJUSTMENT]`

| Check | Result | If FAIL |
|---|---|---|
| Every volume cell is a computed product, not an input | `[PASS/FAIL]` | Rebuild from §3 and §4 |
| No cell was changed after the total was visible | `[PASS/FAIL]` | Record the edit and its reason in §9, or revert |
| Revenue excludes every UNVERIFIED row | `[PASS/FAIL]` | Remove the row from the total and report it separately |
| Cost to serve per segment is noted as a constraint, not as a price input | `[PASS/FAIL]` | Move it. Cost sets the floor below which you should not sell; it does not set the price |

**UNVERIFIED rows, reported separately and excluded from the total:**

| Segment / figure | Why unverified | What would verify it |
|---|---|---|
| `[ ]` | `[ ]` | `[ ]` |

---

## 6. Step 5 — Sensitivity at the Low End of Each Range

The low-end case is the one that gets read in the room. Fill it with the same care as the expected
case.

| Scenario | WTP assumption | Take-rate assumption | Derived revenue | Delta vs expected |
|---|---|---|---|---|
| Expected | Mid of each WTP distribution | Expected take rate | `[ ]` | — |
| **Low end** | **Low of each WTP distribution** | **Take-rate low** | `[ ]` | `[ ]` |
| High end | High of each distribution | Take-rate high | `[ ]` | `[ ]` |

**Single-variable sensitivity** — which assumption moves the result most:

| Assumption varied | Range tested | Effect on total | Rank |
|---|---|---|---|
| `[Take rate, segment A]` | `[low → high]` | `[ ]` | `[1]` |
| `[Addressable count, segment B]` | | | |
| `[Price, segment A]` | | | |

> **How to fill:** rank by absolute effect on the total. The top-ranked assumption is the one that
> deserves the validation budget, and it belongs at the top of Section 7.
> **Failure mode:** running sensitivity only on price. Price is usually not the largest source of
> variance — take rate and addressable count usually are, and they are the least evidenced.

**Break-even statement:** `[WHAT TAKE RATE / VOLUME IS REQUIRED TO REACH THE TARGET, AND WHETHER
ANY MEASURED EVIDENCE SUPPORTS IT]`
> This is a diagnostic, not an instruction. Computing the required take rate is legitimate.
> *Adopting* it as the expected take rate is the inside-out failure.

---

## 7. Step 6 — Assumption Register

Every assumption gets an owner and a validation plan. An assumption with no owner is a wish.

| # | Assumption | Type | Current basis | Status | Owner | Validation plan | Validate by | Effect if wrong |
|---|---|---|---|---|---|---|---|---|
| `[A1]` | `[e.g. take rates are interview-derived purchase intent, discounted by (X%)]` | `[Take rate]` | `[discounted stated intent — discount basis: (own realised ratio / judgement)]` | `[UNVALIDATED]` | `[NAME]` | `[priced pilot / live test via @experimentation-lead / cohort analysis of existing funnel]` | `[YYYY-MM-DD]` | `[±(range) on total]` |
| `[A2]` | `[e.g. addressable count for segment A comes from an external registry, not from our funnel]` | `[Market size]` | `[registry, dated]` | `[ ]` | `[NAME]` | `[funnel reconciliation]` | | |
| `[A3]` | `[e.g. the (fence) holds under competitive pressure]` | `[Packaging]` | `[untested]` | `[ ]` | `[NAME]` | `[ ]` | | |

**Assumption types to cover at minimum:** WTP distribution, addressable count, take rate, discount
applied to stated intent, price holding under competitive pressure, fence integrity, ramp/timing,
cost to serve, churn or renewal where the model is recurring.

**Field instructions**

- **Owner** — a named person, not a role or a squad. *Bad answer:* "@pricing-strategist owns all of
  them". Assumptions about market size belong to whoever can check market size.
- **Validation plan** — a specific action that could falsify the assumption. *Bad answer:*
  "monitor". Monitoring is not validation.
- **Effect if wrong** — quantified from Section 6 where possible. *Bad answer:* "significant".

---

## 8. Result and Finding

**Result:** `[TOTAL, WITH THE FULL RANGE — e.g. "R (low L – high H)"]`
**Target recorded in Section 1:** `[TARGET or NONE]`
**Gap:** `[ ]`

**The finding** — write it plainly, in the direction the evidence points:

`[If the case reaches the target across the range: say so, and name the assumption most likely to
break it.]`

`[If the case does not reach the target at any point in the range: say so. That is the finding.
Closing the gap requires either a segment that has not been measured or a price the evidence does
not support — and choosing the second is how the undead gets funded. State which unmeasured segment
would have to exist, and what it would take to measure it.]`

| Prohibited response to a shortfall | Why |
|---|---|
| Raising take rates until the total matches | Produces a case that cannot fail on paper and cannot succeed in market |
| Raising prices above the measured WTP range without new evidence | The evidence does not support it; the number becomes UNVERIFIED and the case is void |
| Adding an unmeasured segment at an assumed rate | Invention under Article IV |
| Widening "addressable" until the count works | Redefinition of the denominator is not new demand |
| Deleting the low-end scenario | The low end is the reason the case is worth reading |

**Permitted responses to a shortfall:** measure a new segment; redesign the packaging and re-run;
change the monetization model where the value metric is misaligned; reduce cost to serve; or
recommend not proceeding. `*failure-diagnosis` names which of the four failure modes applies.

---

## 9. Case Integrity Log

Record every edit made after a total became visible. This section is the audit trail that
distinguishes an outside-in case from a rebuilt one.

| Date | What changed | Why | New evidence cited? | Approved by |
|---|---|---|---|---|
| `[ ]` | `[ ]` | `[ ]` | `[YES: reference / NO]` | `[ ]` |

> An edit with "NO" in the new-evidence column and a favourable effect on the total is the signature
> of an inside-out case. It is not automatically wrong, but it must be visible.

---

## 10. Article IV Gate — No Invention

Before circulation, confirm each line:

- [ ] Every WTP figure traces to a documented interview or survey instrument, with method and sample
- [ ] Every addressable count traces to an external source or transaction record, with a date
- [ ] Every take rate traces to discounted stated intent, observed conversion, or a cited benchmark
- [ ] Every stated-preference figure is labelled as such, with its behavioural-pairing status
- [ ] Every figure without a documented source is marked UNVERIFIED
- [ ] No UNVERIFIED figure contributes to any total in Section 5 or Section 6
- [ ] No figure was adjusted to reach the target without new evidence logged in Section 9
- [ ] Illustrative or placeholder numbers are labelled as illustrative wherever they appear

---

## 11. Boundary and Handoffs

This document sizes the commercial opportunity. It does not implement, test code, publish, push,
create stories, or write epics.

| Destination | Condition |
|---|---|
| `@discovery-lead` | WTP evidence is too thin for the case to stand — a structured research program is needed first |
| `@experimentation-lead` | A take rate or price point must be validated live, with a defined OEC, guardrail metrics and a sample-size calculation. Never call a winner from a partial period of revenue data |
| `@positioning-lead` | The addressable definition depends on an unsettled frame of reference or category |
| `@product-strategist` | The finding should reprioritize the roadmap, or the offer diagnoses as undead and cancellation is on the table |
| `@products-chief` | The case conflicts with squad-level direction and needs arbitration |
| `@pm` | The commercial evidence is settled and the problem needs epic framing |
| `@dev` + `@data-engineer` | Billing implementation and metering, once the model is chosen |
| `@devops` | Any publishing or push — exclusive authority, never performed here |

---

## 12. Attribution

- Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the
  Product Around the Price* (2016) — Rule 7, build an outside-in business case; Rule 5, go beyond
  the price point; the four commercial failure modes (feature shock, minivan, hidden gem, undead).

`@pricing-strategist` (Assay) applies this framework with attribution.

**Article IV — No Invention:** every willingness-to-pay figure, segment size and take rate traces to
a documented interview, survey instrument, transaction record or cited benchmark. Unsourced numbers
are marked UNVERIFIED and never enter this business case.
