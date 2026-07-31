# Pricing Readiness Checklist

**Checklist ID:** PRD-CL-006
**Squad:** products
**Referenced by:** `@pricing-strategist` (Assay)
**Purpose:** Pre-launch pricing gate. Establishes whether the monetization design is ready to ship — willingness-to-pay evidence, feature classification, segmentation, packaging, model, strategy, and business case. Produces a score, a verdict, and a priority fix order.
**Method source:** Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the Product Around the Price* (2016).

[[LLM: INITIALIZATION INSTRUCTIONS — PRICING READINESS GATE

This checklist is run BEFORE launch, not after. Its whole value is the ability to change something
while changing it is still cheap.

EXECUTION APPROACH:
1. Check each item against the actual artifacts — the WTP findings, the packaging document, the
   business case — not against what the team says is true.
2. Mark [x] present and evidenced, [ ] missing or unevidenced, [N/A] genuinely not applicable.
   "The team is confident" is not evidence. If you cannot point at a document, it is [ ].
3. BLOCKING items (marked ⛔) fail the gate on their own, regardless of score.
4. Score the non-blocking items, assign the verdict, then order the fixes by Section 11.
5. This audit reads and reports. It does not edit the artifacts it audits.

DISPUTE RULE: where the team disagrees with a [ ], the resolution is a document, not a discussion.]]

---

## 0. Gate Header

| Field | Value |
|---|---|
| Offer under gate | `[OFFER_NAME]` |
| Launch date being gated | `[YYYY-MM-DD]` |
| Auditor | `[NAME]` |
| Artifacts reviewed | `[wtp findings / packaging design / business case / other]` |
| Build status when WTP evidence was gathered | `[pre-build / in build / shipped]` |

---

## 1. Willingness-to-Pay Evidence ⛔

- [ ] ⛔ Willingness-to-pay evidence exists at all, as a written artifact
- [ ] ⛔ The evidence **predates the build decision** — the study date is earlier than the scope commitment date, and both dates are recorded
- [ ] The research method is named for every figure (direct questioning, indirect questioning, purchase probability scale, Van Westendorp, Gabor-Granger, conjoint, MaxDiff)
- [ ] The sample requirement for that method is stated, and the achieved sample is reported against it
- [ ] Sampling was done per hypothesised segment, never in aggregate
- [ ] Every WTP figure is reported as a range with method and sample attached — no single point estimates
- [ ] Direct-question responses are labelled directional only and are not quoted as prices
- [ ] Stated-preference figures are labelled as such, with their behavioural-pairing status recorded
- [ ] The discount applied to stated purchase intent is stated, with its basis and an owner
- [ ] ⛔ Every figure traces to a documented interview, survey instrument, transaction record or cited benchmark; anything else is marked UNVERIFIED

> **If the "predates the build decision" item fails:** the gate does not pass on remediation. Record
> explicitly that scope evidence arrived too late, restrict the claims this study can support to
> packaging and price, and proceed with that limitation written into the artifact. Deciding price in
> the final sprint before launch is the single most common cause of monetization failure — name it
> rather than smoothing it over.

## 2. Feature Classification ⛔

- [ ] ⛔ Every feature in scope is classified **leader**, **filler**, or **killer** — no unclassified features
- [ ] Each leader is supported by evidence that the acceptable price ceiling moves when it is present, per segment
- [ ] Each filler is supported by the comparison showing no effect on the ceiling
- [ ] Each killer records which segment disengaged, how many respondents, and what they said
- [ ] Features the instrument did not cover are recorded as a coverage gap, not left blank
- [ ] Classification is per segment where a feature leads for one segment and is neutral for others

> **Failure mode this catches:** a feature list with a few confident labels and a long unlabelled
> tail. "Unclassified" is not an outcome; it means the instrument did not cover it.

## 3. Killers ⛔

- [ ] ⛔ **No known killer is shipping unfenced**
- [ ] Every killer has a disposition: removed, made optional, or fenced away from the affected segment
- [ ] Each disposition has a named owner and a verified-closed mark
- [ ] "Optional" killers are optional in the actual flow, not only in the documentation
- [ ] No killer carries a disposition of "monitor", "accept", or "revisit post-launch"
- [ ] Killers were reported first in the findings artifact, not buried in an appendix

> A killer that ships unflagged does its damage before price is ever discussed.

## 4. Segmentation

- [ ] Segments are defined by **value driver**, not by industry, headcount, or persona label
- [ ] ⛔ Every segment used in packaging or in the business case is **identifiable pre-sale**, with the funnel signal named
- [ ] ⛔ Every segment is **fenceable post-sale**, with the specific fence named
- [ ] Segments deliberately not served are listed, with the reason
- [ ] Segments that could not be sampled are recorded as unpriceable rather than folded into another segment
- [ ] Segment overlap has been checked so no account is counted twice
- [ ] Segments that exist as an upgrade path rather than as revenue are labelled as such

## 5. Packaging and Tiers

- [ ] ⛔ Each tier maps to exactly one named segment
- [ ] ⛔ Each tier states the **leader that anchors it**, with the supporting evidence
- [ ] No leader for the entry segment is placed above the entry tier (hidden-gem check)
- [ ] No leader for a higher segment is given away in the entry tier (reason-to-upgrade check)
- [ ] No filler is used to justify a tier boundary
- [ ] Every fence has a named type — capacity, feature, user class, support, or commitment
- [ ] Every fence has a stated leak risk and a mitigation
- [ ] Each tier passes the legibility test: a buyer in the target segment can state, unaided, why the next tier costs more
- [ ] Tier boundaries do not mirror engineering boundaries or cost centres
- [ ] Each tier has a stated upgrade trigger, or is explicitly declared terminal
- [ ] Value messaging per tier is expressed as outcomes rather than features
- [ ] The lineup has been screened against the four failure modes — feature shock, minivan, hidden gem, undead

## 6. Monetization Model and Value Metric

- [ ] The monetization model is named explicitly (subscription, per-seat, usage-based, tiered, freemium, perpetual license, outcome-based, credit/prepaid pack, razor-razorblade)
- [ ] ⛔ The **value metric is aligned with delivered value** — the billing unit tracks what the customer receives
- [ ] The billing unit passes the selection tie-breaker: the customer already tracks this number internally and already associates it with getting value
- [ ] The documented "when NOT to use" conditions for the chosen model have been checked and none apply, or the exception is justified in writing
- [ ] The model's characteristic failure mode is named, with the mitigation in place
- [ ] Operational preconditions for the model are met (metering, invoicing, dispute handling, measurement agreement where outcome-based)
- [ ] The billing unit is legible to the customer — they can predict their bill before it arrives

> **Failure mode this catches:** billing on a unit that does not track delivered value. Customers
> feel penalized for succeeding and begin optimizing against the meter instead of using the product.

## 7. Pricing Strategy

- [ ] ⛔ The pricing strategy is stated as **maximization**, **penetration**, or **skimming** — chosen, not defaulted
- [ ] The choose-when condition for that strategy is documented and currently holds
- [ ] ⛔ The **exit condition** is stated and observable
- [ ] For penetration: the path back up exists in writing before the low entry price goes live
- [ ] For skimming: the descent steps and their triggers are defined
- [ ] Tier prices across the lineup are consistent with the stated strategy
- [ ] The party who will notice the exit condition first is named

## 8. Business Case

- [ ] ⛔ The case is built **outside-in**, in the documented order: measured WTP → addressable size → price points and take rates → derived volume → sensitivity → assumptions
- [ ] ⛔ Volume is **derived** from take rates, never entered directly
- [ ] Any revenue target is recorded only for comparison, never used as an input
- [ ] Addressable size per segment carries its source, source type, and date
- [ ] "Addressable" is defined with its exclusions stated, and is not total market size
- [ ] Every take rate carries its basis: discounted stated intent, observed conversion, or cited benchmark
- [ ] ⛔ **Sensitivity is present at the low end of each range**, not only the expected case
- [ ] Single-variable sensitivity identifies which assumption moves the result most
- [ ] Every assumption has an owner, a validation plan, and a validate-by date
- [ ] ⛔ No UNVERIFIED figure contributes to any total
- [ ] The case integrity log records any edit made after a total became visible, with new evidence cited or its absence noted
- [ ] Where the case falls short of a target, the shortfall is written as a **finding**, not corrected in the arithmetic

> **Failure mode this catches:** back-solving take rates until the total matches. It produces a case
> that cannot fail on paper and cannot succeed in market.

## 9. Live Changes and Experimentation

- [ ] ⛔ Any live price change or packaging change is **registered as an experiment with `@experimentation-lead`**
- [ ] Each registered experiment has a defined OEC
- [ ] Each has guardrail metrics, including a revenue guardrail where the change could raise conversion while lowering revenue
- [ ] Each has a sample-size calculation completed before launch
- [ ] No result has been called from a partial period of revenue data
- [ ] Rollback conditions are defined and someone owns pulling the trigger
- [ ] Grandfathering and existing-customer treatment are decided and documented

## 10. Ownership, Boundary and Traceability

- [ ] Billing implementation and metering are assigned to `@dev` with `@data-engineer`, not assumed inside the pricing design
- [ ] Category and narrative questions are routed to `@positioning-lead`, and the frame of reference is settled
- [ ] Live testing is routed to `@experimentation-lead`
- [ ] Story creation (`@sm`), epic and PRD authoring (`@pm`), and push or publication (`@devops`, exclusive) are not being performed inside this pricing work
- [ ] Every artifact referenced by this gate exists at a stated path and is current
- [ ] The gate result is recorded in the pricing artifact itself, with date and auditor

---

## Scoring

**Blocking items first.** Any ⛔ item marked `[ ]` fails the gate outright — no score can override it.

**Calculation for the remainder:** (Checked non-blocking items) / (Total non-blocking items − N/A items) × 100

| Verdict | Condition | Meaning |
|---|---|---|
| **PASS** | All ⛔ satisfied **and** score ≥ 90% | Monetization design is ready to launch |
| **PASS WITH CONCERNS** | All ⛔ satisfied **and** score 75–89% | Launch may proceed; listed gaps have owners and dates before the next pricing decision |
| **BLOCKED** | Any ⛔ item unsatisfied | Launch gate not passed. Fix the blocking item; score is irrelevant until it is closed |
| **FAIL** | All ⛔ satisfied but score < 75% | The design is not evidenced well enough to defend. Rework before launch |

**Verdict:** `[PASS / PASS WITH CONCERNS / BLOCKED / FAIL]`
**Score:** `[X%]` (`[checked]`/`[applicable]`)
**Blocking items open:** `[LIST or NONE]`
**Auditor:** `[NAME]` **Date:** `[YYYY-MM-DD]`

> A PASS on this checklist certifies that the monetization design is **evidenced and coherent**. It
> does not certify that the product will sell. Those are different claims and this gate makes only
> the first one.

---

## Priority Fix Order

Fix in this order. Later items are not worth doing while an earlier one is open.

1. **Killers shipping unfenced (§3)** — damage occurs before price is ever discussed. Nothing else matters while a known killer is in the launch scope.
2. **Missing or post-hoc WTP evidence (§1)** — every downstream artifact inherits this gap. If evidence does not exist, run `*wtp-talk` now even with a small sample; directional evidence before build beats precise evidence after it.
3. **Unclassified features (§2)** — packaging cannot be corrected without knowing which features are leaders.
4. **Segments not identifiable pre-sale or not fenceable post-sale (§4)** — a tier aimed at an undetectable segment cannot be sold, and an unfenceable one leaks.
5. **Tiers with no named segment or no anchoring leader (§5)** — these are price lines, not packages, and they segment nothing.
6. **Value-metric misalignment (§6)** — the longest-lived error on this list. It erodes quietly for as long as the model is in force.
7. **Inside-out business case (§8)** — rebuild in the documented order; do not patch.
8. **Missing sensitivity and unowned assumptions (§8)** — the case is unreadable in a decision meeting without them.
9. **Unstated pricing strategy or missing exit condition (§7)** — cheap to fix, and it prevents an unnoticed drift into a strategy nobody chose.
10. **Unregistered live price or packaging changes (§9)** — route to `@experimentation-lead` before any further reads of the data.
11. **Traceability and ownership gaps (§10)** — close last, but close them.

---

## Attribution

- Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the
  Product Around the Price* (2016) — Rule 1 (have the willingness-to-pay talk early), Rule 2, Rule 3
  (segmentation is destiny), Rule 4 (configuration and bundling), Rule 5 (go beyond the price
  point), Rule 6 (price with a purpose), Rule 7 (build an outside-in business case), Rule 8
  (communicate value), Rule 9 (use behavioural pricing tactics); the leader / filler / killer
  classification; the four commercial failure modes — feature shock, minivan, hidden gem, undead.

`@pricing-strategist` (Assay) applies this framework with attribution.

**Constitution Article IV — No Invention:** every willingness-to-pay figure, segment size and take
rate traces to a documented interview, survey instrument, transaction record or cited benchmark.
Unsourced numbers are marked UNVERIFIED and never enter a business case. This checklist enforces
that as a blocking gate, not as a preference.
