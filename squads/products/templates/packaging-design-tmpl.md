# Packaging Design — Good / Better / Best — [OFFER_NAME]

**Template ID:** PRD-TM-PKG-002
**Owner agent:** `@pricing-strategist` (Assay)
**Serves commands:** `*package`, `*value-fences`, `*classify-features`
**Upstream input:** completed `wtp-interview-guide-tmpl.md` findings (WTP ranges per segment + leader / filler / killer classification)
**Method source:** Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the Product Around the Price* (2016) — Rule 2 (do not force a one-size-fits-all solution), Rule 3 (segmentation is destiny), Rule 4 (configuration and bundling), Rule 9 (behavioural pricing tactics).

> Good/Better/Best is a **segmentation instrument, not a menu.** Each tier targets a distinct value
> segment. Tiers drawn by internal cost structure or engineering convenience segment nothing.

[[LLM: FILL INSTRUCTIONS — PACKAGING DESIGN

Preconditions before filling anything below:
1. WTP evidence exists per segment, with method and sample stated. Without it, this document is a
   preference, not a design — stop and run `*wtp-talk`.
2. Every feature in scope is already classified leader / filler / killer. Packaging an unclassified
   feature set means placing tier anchors by intuition.
3. Positioning (`@positioning-lead`) has settled the frame of reference. Packaging built on an
   unsettled frame has to be redone.

Fill in this order: Section 2 (segments) → Section 3 (tiers) → Section 4 (fences) →
Section 5 (killer register) → Section 6 (coherence audit). Designing tiers before segments is how
the minivan gets built.

All numeric values in examples are ILLUSTRATIVE PLACEHOLDERS. Replace them; never inherit them.]]

---

## 1. Design Header

| Field | Value | How to fill | Failure mode |
|---|---|---|---|
| Offer | `[OFFER_NAME]` | The outcome, in customer language | A codename |
| Design date | `[YYYY-MM-DD]` | | Undated packaging that outlives its evidence |
| WTP evidence reference | `[LINK to wtp-... findings]` | Must predate the build decision | Linking a study run after launch and treating it as a design input |
| Positioning reference | `[LINK / UNSETTLED]` | Best-fit segment and value themes from `@positioning-lead` | Marking "unsettled" and proceeding anyway |
| Monetization model | `[SEE data/monetization-models.yaml]` | Chosen model + value metric | Choosing tiers before the model. The model decides what a fence can even be measured in |
| Pricing strategy | `[MAXIMIZATION / PENETRATION / SKIMMING]` | Stated deliberately, with the exit condition | Defaulting. An unstated strategy is maximization by accident |
| Number of tiers | `[N]` | Justified by the number of distinct value segments found | Three tiers because three is conventional. A tier with no segment behind it is a price line nobody selects |
| Designer | `[NAME]` | One accountable human | |

---

## 2. Segment Register

Every tier must map to a named segment in this table. Segments are defined **by value driver**, not
by industry, headcount, or persona label.

| Segment | Defining value driver | WTP range (method, n) | Identifiable pre-sale? (signal) | Fenceable post-sale? (fence candidate) | Revenue segment? |
|---|---|---|---|---|---|
| `[A]` | `[ ]` | `[X–Y — method, n=N]` | `[YES: they ask about ... in the first call / NO]` | `[YES: ... / NO]` | `[YES / NO — path only]` |
| `[B]` | | | | | |
| `[C]` | | | | | |

**Field instructions**

- **Defining value driver** — the outcome that makes this group pay differently from the others.
  *Bad answer:* "mid-market" or "security-conscious enterprises". Firmographics do not predict
  purchase behaviour.
- **WTP range** — always a range with method and sample attached. *Bad answer:* a single number.
  A point estimate here propagates false precision into every downstream tier price.
- **Identifiable pre-sale** — name the observable signal in the funnel. *Bad answer:* "yes" with no
  signal. A segment you cannot detect before the sale is an analysis artifact, not a commercial
  instrument, and it cannot be targeted by a tier.
- **Fenceable post-sale** — name the specific fence. *Bad answer:* "we'd fence it somehow". If no
  fence exists, the tier leaks: the low tier serves the high segment at the low price.
- **Revenue segment?** — some segments exist to create a legible upgrade path rather than revenue.
  Say so. *Bad answer:* pricing a path segment as though it were a revenue tier — that is how the
  minivan gets built.

**Segments deliberately not served:** `[LIST + why]`
> Stating who you are not packaging for is part of the design. A design that serves everyone is the
> minivan: acceptable to many, compelling to none.

---

## 3. Tier Configuration

One block per tier. Fill top-down: segment first, then the leader, then the fence, then the price.

### Tier `[GOOD]` — `[TIER NAME]`

| Field | Value | How to fill | Failure mode |
|---|---|---|---|
| Target segment | `[SEGMENT ID + NAME from Section 2]` | Exactly one named segment | "Everyone else" or two segments at once. A tier serving two segments is fenced against neither |
| Leader that anchors it | `[FEATURE, described as an outcome]` | The classified leader that moves *this segment's* ceiling | Naming a filler as the anchor. Fillers add perceived bulk and never justify a tier |
| Evidence for that leader | `[ceiling with/without, n, from WTP study]` | Cite the study rows | "The team believes". A leader without ceiling movement is an opinion |
| Other included features | `[LIST with class in brackets]` | Mark each `[L]`, `[F]`, `[K-fenced]` | An unclassified item in the bundle |
| Value fence | `[SEE Section 4 row]` | What separates this tier from the one above | "Fewer features" with no fence type named |
| Fence type | `[CAPACITY / FEATURE / USER CLASS / SUPPORT / COMMITMENT]` | Pick one primary type | Stacking four fence types at once — the customer cannot tell what they are buying |
| Price | `[PRICE + unit]` | Placed against this segment's measured WTP range, not against unit cost | A price derived from cost plus margin. Cost sets the floor below which you should not sell; it says nothing about what the customer will pay |
| Position within WTP range | `[LOW / MID / HIGH end of X–Y]` | State where in the measured range it sits | A price outside the measured range with no stated reason |
| Strategy consistency | `[CONSISTENT WITH (strategy) BECAUSE ...]` | Tie to the stated pricing strategy | A penetration price in a lineup declared as maximization |
| Legibility test | `[SEE Section 3.1]` | Must pass before the tier ships | Skipping it because the team understands the tier. The team is not the buyer |
| Upgrade trigger | `[WHAT MAKES THIS SEGMENT MOVE UP]` | The event or threshold that causes an upgrade | No trigger. Then the tier is a terminus, not a step |

### Tier `[BETTER]` — `[TIER NAME]`
_Duplicate the block above._

### Tier `[BEST]` — `[TIER NAME]`
_Duplicate the block above._

### 3.1 Legibility Test (run per tier)

A value fence must be **defensible and legible**. The customer should be able to see why the next
tier costs more and agree that the difference matters to someone — ideally to them.

| # | Test | Pass condition | Result |
|---|---|---|---|
| L1 | Can a buyer in the target segment state, in one sentence and without help, why this tier costs more than the one below? | Yes, unaided | `[PASS / FAIL]` |
| L2 | Does the difference matter to a real named segment? | Yes, and that segment is in Section 2 | `[PASS / FAIL]` |
| L3 | Is the fence measurable by the customer themselves? | They can check where they sit without asking sales | `[PASS / FAIL]` |
| L4 | Would the fence survive being explained plainly in the pricing page? | Yes | `[PASS / FAIL]` |
| L5 | Does the tier's leader appear in the tier's own value message, expressed as an outcome? | Yes | `[PASS / FAIL]` |

> **How to fill:** run L1 with an actual buyer, not with the team. **Failure mode:** marking L1 PASS
> from internal consensus. Internal consensus on tier logic is the normal state right up until
> launch, when the difference turns out to be invisible.

---

## 4. Value Fence Register

| Fence | Between tiers | Type | What exactly is limited | Why this segment accepts it | Leak risk | Mitigation |
|---|---|---|---|---|---|---|
| `[F1]` | `[Good → Better]` | `[CAPACITY]` | `[ ]` | `[ ]` | `[HOW A BUYER COULD STAY BELOW IT AND STILL GET THE VALUE]` | `[ ]` |
| `[F2]` | `[Better → Best]` | `[FEATURE]` | | | | |

**Fence types and when each fits**

| Type | Separates on | Fits when | Fails when |
|---|---|---|---|
| Capacity | Volume, rows, records, requests, storage | Value scales with volume and the customer already tracks that volume | The cap bites before the value lands — the buyer churns before they experience the leader |
| Feature | Presence or absence of a capability | A leader leads for one segment and is neutral for the others | The withheld feature is a leader for the *entry* segment too — then it is a barrier, not a fence |
| User class | Role, admin rights, named seats | Value accrues per individual and roles differ in what they need | Roles are fluid; buyers share credentials and the fence quietly disappears |
| Support | Response time, named contact, onboarding | Risk and downtime cost differ sharply across segments | Support becomes the only fence — buyers read it as a tax, not as value |
| Commitment | Term length, prepayment, notice period | Buyers differ in certainty and will trade flexibility for price | Used to hide a price increase, which fails the disclosure test |

**Standing rule:** the fence must be defensible and legible. If a customer cannot see the fence or
cannot accept its logic, it is not a fence — it is a surprise, and it surfaces in renewal.

---

## 5. Killer Register

Features or requirements that **measurably reduce willingness to pay** for a real segment. Damage
occurs before price is ever discussed. **No known killer ships unfenced.**

| # | Killer (feature or requirement) | Affected segment | Evidence | Severity | Disposition | Owner | Verified closed |
|---|---|---|---|---|---|---|---|
| `[K1]` | `[ ]` | `[SEGMENT]` | `[n/N respondents; what they said; ceiling movement]` | `[STOP / DELAY]` | `[REMOVED / OPTIONAL / FENCED AWAY]` | `[NAME]` | `[ ] YES` |
| `[K2]` | | | | | | | |

**Disposition definitions**

| Disposition | What it means | Use when | Failure mode |
|---|---|---|---|
| Removed | The feature or requirement is not built or is deleted from scope | It leads for no segment and kills for at least one | Removing something that is a killer for one segment and a leader for another. Fence it instead |
| Optional | Present but never mandatory; the affected segment can decline it | The requirement serves a real need for some buyers | "Optional" in documentation but mandatory in the flow. That is not optional |
| Fenced away | Confined to a tier the affected segment does not buy | It leads for a higher-value segment | Fencing it into a tier the affected segment is nevertheless routed into by sales |

**Killer disposition gate:** every row must have a disposition and a verified-closed mark before
launch. A killer with a disposition of "monitor" is an unfenced killer with better wording.

**Killers found after packaging was drafted:** `[LIST — and re-run Section 6]`

---

## 6. Tier-Coherence Audit

Run after Sections 2–5 are filled. Every FAIL blocks the packaging from being circulated.

### 6.1 Structural coherence

| # | Check | Pass condition | Result | If FAIL |
|---|---|---|---|---|
| C1 | Every tier maps to exactly one named segment from Section 2 | True for all tiers | `[ ]` | Merge or delete the tier. A tier without a segment is a price line, not a package |
| C2 | Every tier states the leader that anchors it, with evidence | True for all tiers | `[ ]` | Return to `*classify-features` |
| C3 | No leader for the entry segment is placed above the entry tier | True | `[ ]` | Hidden gem in the making — move the leader down to a tier its segment can reach |
| C4 | No leader for a higher segment is given away in the entry tier | True | `[ ]` | You have removed the reason to upgrade. Fence it |
| C5 | No filler is used to justify a tier boundary | True | `[ ]` | Find a real leader or delete the boundary |
| C6 | Every fence has a named type and a stated leak risk | True | `[ ]` | Fill Section 4 properly |
| C7 | No known killer ships unfenced | True | `[ ]` | **Blocking.** Resolve in Section 5 before anything else |
| C8 | Tier prices sit inside or are explicitly justified against the target segment's measured WTP range | True | `[ ]` | Either the price or the segment mapping is wrong. Say which |
| C9 | Tier boundaries do not mirror internal engineering or cost-centre boundaries | True | `[ ]` | Redraw from segment value. Customers cannot see why the next tier is worth more when it mirrors your org chart |
| C10 | Each tier has a stated upgrade trigger | True | `[ ]` | Design the trigger or accept the tier as terminal and say so |
| C11 | Value message per tier is expressed as an outcome, not a feature list | True | `[ ]` | Rewrite. Customers pay for the outcome |
| C12 | Every figure traces to a documented source, or is marked UNVERIFIED | True | `[ ]` | **Blocking under Article IV.** UNVERIFIED figures never enter a business case |

### 6.2 Failure-mode screen

Screen the finished lineup against the four documented commercial failure modes before circulating.

| Failure mode | Screening question | Signal it is happening here | Remedy |
|---|---|---|---|
| Feature shock | Can a buyer state what each tier is *for* in one sentence? | Long inclusion lists, no tier has a single legible reason to exist | Configure and simplify: move fillers out of the leader position, build the entry package around one leader |
| Minivan | Does any tier target more than one segment, or all tiers target the same one? | Every tier is acceptable to everyone and compelling to nobody | Pick a segment, rebuild the package around its value drivers, then configure outward |
| Hidden gem | Is the strongest leader in a tier its own segment can afford and will actually reach? | The leading value driver sits above the target segment's ceiling | Repackage: move the leader to the tier its segment can reach, re-fence the tier above |
| Undead | Does WTP evidence exist for this offer at all, and did it predate the build? | No pre-build WTP evidence exists | Stop. Repackaging cannot manufacture demand |

---

## 7. Behavioural Tactics Applied (Rule 9)

State every tactic used. Tactics are applied to make the right option **legible**, never to obscure
the terms.

| Tactic | Applied here? | How | Disclosure test |
|---|---|---|---|
| Anchoring — the first price seen shapes evaluation of the rest | `[YES/NO]` | `[Order of the lineup and why]` | `[PASS/FAIL]` |
| Compromise effect — buyers gravitate to the middle of three | `[YES/NO]` | `[Which package sits in the middle and why it is the intended target]` | `[PASS/FAIL]` |
| Decoy structure — a dominated option makes an adjacent option look better | `[YES/NO]` | `[Describe, or state "not used"]` | `[PASS/FAIL]` |
| Framing — per-month vs per-year, per-seat vs per-account | `[YES/NO]` | `[Which framing and why]` | `[PASS/FAIL]` |

**Disclosure constraint (standing):** every tactic must survive disclosure. If explaining it to the
customer would embarrass you, do not use it.

---

## 8. Worked Example — **ILLUSTRATIVE PLACEHOLDER VALUES ONLY**

> ⚠️ Every number and segment below is invented for shape only. It is not a benchmark, not a
> default, and must never be carried into a real design or business case.

| Tier | Target segment | Leader anchoring it | Fence (type) | Price |
|---|---|---|---|---|
| Good | C — Exploratory (path segment, not revenue) | Capacity-limited core workflow | 5k records/month (capacity) | `[illustrative]` |
| Better | A — Audit-driven | Automated evidence export | Unlimited export (feature) | `[illustrative]` |
| Best | B — Operations-driven | Real-time sync | Sync latency guarantee (feature + support) | `[illustrative]` |

Reading of the example: segment C is not a revenue segment. It exists to create a legible upgrade
path into Better once a forcing function appears. Pricing it as though it were a revenue tier is how
the minivan gets built.

---

## 9. Open Assumptions and Handoffs

| Assumption in this packaging | Owner | How it gets validated |
|---|---|---|
| `[e.g. the (fence) holds under competitive pressure]` | `[NAME]` | `[ ]` |

| Destination | Condition |
|---|---|
| `@positioning-lead` | Packaging exposes that the frame of reference or best-fit segment is unsettled — positioning resolves before tiers are fixed |
| `@experimentation-lead` | Any live price point, tier restructure or packaging change — registered as an experiment with a defined OEC, guardrail metrics and a sample-size calculation. Never call a winner from a partial period of revenue data |
| `@jobs-analyst` | A leader needs explaining by tracing it to the job the customer is hiring the product to do |
| `@discovery-lead` | WTP evidence is too thin to place a fence with confidence |
| `@product-strategist` | Findings should reprioritize the roadmap, or the offer diagnoses as undead |
| `@dev` + `@data-engineer` | Billing implementation and metering, once the model and fences are fixed |
| `@pm` | Commercial design is settled and the work needs epic framing |

**Boundary:** this document decides *what* is packaged and *how it is monetised*. It does not
implement (`@dev`), test code (`@qa`), publish or push (`@devops`, exclusive), create stories
(`@sm`), or write epics and PRDs (`@pm`).

---

## 10. Attribution

- Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the
  Product Around the Price* (2016) — Rule 2 (do not force a one-size-fits-all solution), Rule 3
  (segmentation is destiny), Rule 4 (configuration and bundling), Rule 9 (behavioural pricing
  tactics); the leader / filler / killer classification; the four commercial failure modes
  (feature shock, minivan, hidden gem, undead).

`@pricing-strategist` (Assay) applies this framework with attribution.

**Article IV — No Invention:** every WTP figure, segment size and take rate in this document traces
to a documented interview, survey instrument, transaction record or cited benchmark. Unsourced
numbers are marked UNVERIFIED and never enter a business case.
