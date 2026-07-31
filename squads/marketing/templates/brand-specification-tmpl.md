# Brand Specification — {{BRAND}} / {{CATEGORY}}

**Template ID:** MKT-TM-001
**Owned by:** `@marketing:brand-lead` (Salience)
**Produced by:** `*salience-brief`, `*cep-map`, `*asset-audit`, captured by `*brand-plan`
**Consumed by:** `@marketing:demand-lead` (sizing), `@marketing:content-lead` (beats),
`@marketing:analytics-lead` (instrumentation), `@ux-design-expert` (asset execution)

**Method source.** The framework applied here is the empirical marketing science reported by
Byron Sharp in *How Brands Grow: What Marketers Don't Know* (Oxford University Press, 2010).
Two later Ehrenberg-Bass works are named separately where their concepts are used: *How Brands
Grow Part 2* (Jenni Romaniuk and Byron Sharp, 2016) for category entry points, and *Building
Distinctive Brand Assets* (Jenni Romaniuk, 2018) for the fame-and-uniqueness grid. This template
records structure and concepts, deliberately not numbers. Any figure quoted from any of those
publications must be read from the publication before it enters this document.

[[LLM: FILLING INSTRUCTIONS

This is a specification, not a persuasion document. Three rules govern every field:

1. Every number carries a provenance tag: SOURCED (named instrument or dataset),
   ESTIMATED (internal judgement, explicitly a hypothesis), or UNTESTED / UNVERIFIED.
   A table of estimates is a hypothesis. Label it as one in the section header.
2. Positioning is an INPUT. The category, the competitive alternatives and the segment come
   from `@products:positioning-lead`. If §0 is empty, stop — everything downstream will be
   rewritten when the position lands.
3. This document does not contain a budget, a split, a share of voice figure or a media plan.
   Those belong to `@marketing:demand-lead` and appear here only as §8 requirements.

Delete any section that is genuinely not applicable and write one line saying why. Do not
leave a section filled with plausible placeholder prose — an unfilled section is honest, a
fabricated one is a defect.]]

---

## 0. Position consumed (input, not authored here)

| Field | Value | Source artifact | Date |
|---|---|---|---|
| Market category (buyer's words) | | `@products:positioning-lead` | |
| Competitive alternatives | | | |
| Target segment | | | |
| Unique attributes claimed | | | |

**If any row is blank:** record it here as a blocking dependency and route to
`@products:positioning-lead` before continuing. A brand plan that invents its own position
produces work that contradicts the product.

---

## 1. Denominator

The category, not the customer list. Every reading below is a share of *category buyers*.

| Item | Value | Provenance | Note |
|---|---|---|---|
| Category definition (buyer's point of view) | | | |
| Category buyer population | | | Not "market size in currency" — a count of buyers |
| Period of measurement | | | |
| Source of the population figure | | | Panel, survey, industry data, or ESTIMATED |

> If the denominator is unknown, the entire specification is marked UNVERIFIED and
> establishing the denominator is recommendation #1.

---

## 2. Growth diagnosis

### 2.1 Readings

| Reading | This brand | Category comparison | Provenance |
|---|---|---|---|
| Penetration (share of category buyers) | | | |
| Purchase frequency | | | |
| Repeat rate over period | | | |
| Share of volume from top decile of buyers | | | |
| Duplication of purchase with lead competitor | | | |

### 2.2 Double-jeopardy reading

[SOURCE: Sharp, *How Brands Grow*] Smaller brands have fewer buyers **and** slightly lower
loyalty. Before treating a loyalty figure as a defect, state whether it sits where the pattern
predicts for a brand of this share.

- Loyalty readings versus the double-jeopardy expectation at this share: `AS PREDICTED` /
  `ABOVE` / `BELOW` / `CANNOT ASSESS — comparison data absent`
- If BELOW or ABOVE: what evidence supports this brand being an exception?
  (Conviction is not evidence. Contractual lock-in and very small buyer counts are the usual
  genuine candidates.)

### 2.3 Growth mechanism declared

`PENETRATION` / `FREQUENCY` / `PRICE-MIX` / `UNSTATED`

If not PENETRATION, the exception must be evidenced in 2.2. An unstated mechanism is a defect,
not a starting point.

### 2.4 Binding constraint

`RETRIEVAL (mental availability)` / `ACCESS (physical availability)` / `REACH` — one, with the
evidence that selects it.

---

## 3. Category entry point map

[SOURCE: Romaniuk and Sharp, *How Brands Grow Part 2*, 2016]

Elicitation cues: Why · When · Where · With whom · While doing what · With what · How feeling.
Aim for breadth, not elegance.

| # | Category entry point (buyer's language) | Category frequency | Our retrieval | First-named brand | Provenance | Action |
|---|---|---|---|---|---|---|
| 1 | | | | | SOURCED / ESTIMATED | BUILD / DEFEND / DEPRIORITISE |
| 2 | | | | | | |
| 3 | | | | | | |

**Prioritisation rule applied:** high frequency + weak retrieval → BUILD. High frequency +
strong retrieval → DEFEND. Low frequency → DEPRIORITISE regardless of retrieval.

**Map status:** `MEASURED` / `MIXED` / `HYPOTHESIS — all rows estimated`

**CEPs this specification commits to building (2–4):**

1.
2.

---

## 4. Distinctive asset inventory

[SOURCE: Romaniuk, *Building Distinctive Brand Assets*, 2018]

- **Fame** — of category buyers shown the asset *without the brand name*, the share who link it
  to this brand.
- **Uniqueness** — of those, the share who link it to this brand *only*.

| Asset | Type | Fame | Uniqueness | Grade | Change consequence |
|---|---|---|---|---|---|
| | wordmark / colour / character / typeface / sonic / shape / layout / spokesperson / tagline / packaging cue | | | SOLID ASSET / INVESTMENT / AVOID / IGNORE / **UNTESTED** | |

**Grading grid:**

| | Low uniqueness | High uniqueness |
|---|---|---|
| **High fame** | AVOID — cues the category or a competitor | SOLID ASSET — protect absolutely |
| **Low fame** | IGNORE — no equity at risk | INVESTMENT — repeat consistently for years |

**Untested assets are not graded.** Record them as UNTESTED and put the test in §7. Internal
intuition about fame is unreliable and systematically overrates the assets the team sees most.

**Assets that must appear in every execution:**
**Assets that must not be altered:**
**Assets free to retire:**

---

## 5. Physical availability

Map the buying path step by step, from the moment of need to completed purchase.

| Step | Present? | Findable? | Friction class | Buyers affected | Drop-off | Owner of the fix |
|---|---|---|---|---|---|---|
| | | | ABSENCE / OBSCURITY / BARRIER / DRAG | | SOURCED / NOT INSTRUMENTED | |

**Ranking rule:** buyers affected × drop-off at that step. Where drop-off is not instrumented,
that instrumentation is the first recommendation and routes to `@marketing:analytics-lead`.

**Note on ownership:** fixes requiring code enter the story pipeline via `@pm` and `@sm`. This
specification names the friction; it does not implement the removal.

---

## 6. Reach requirement

| Item | Statement |
|---|---|
| Reachable universe | All category buyers, including light and non-buyers |
| Currently reached | (share of category buyers, not impressions) |
| Coverage gap | |
| Continuity | Continuous / bursts with dark periods — name the dark periods |
| What buying occurs during dark periods | |
| Targeting narrower than the category? | Yes / No — if yes, the purchase-data evidence that excluded buyers do not buy the category |

**If the narrowing is a budget constraint rather than a strategic claim, record it as a budget
constraint.** The two are treated very differently downstream: a constraint is revisited when
budget changes; a strategic claim hardens into a persona document and excludes those buyers for
years after the constraint lifted.

---

## 7. What must be measured

This section specifies **what**. `@marketing:analytics-lead` decides **how** and states the
limits.

| Construct | Instrument required | Population | Cadence | Status |
|---|---|---|---|---|
| Penetration | | All category buyers | | |
| CEP-linked prompted recall, per CEP in §3 | | All category buyers, incl. non-buyers of this brand | | |
| Asset fame and uniqueness, per asset in §4 | Asset shown without the brand name | All category buyers | | |

> A tracker sampled only from customers cannot measure mental availability. State the sampling
> frame explicitly.

**Success is expressed as a tracking movement,** not as a campaign deliverable: which reading,
by how much, measured how, over what period.

---

## 8. Handed to other agents

| Question | Owner | What they receive from this document |
|---|---|---|
| Budget size, brand-vs-activation split, share of voice, phasing | `@marketing:demand-lead` | §3 CEPs to build, §6 reach and continuity requirement |
| Editorial beats and cadence | `@marketing:content-lead` | §3 CEP priorities, §4 assets that must survive into written work |
| Instrument design, sampling, feasibility, residual uncertainty | `@marketing:analytics-lead` | §7 constructs |
| Asset execution in interface and design system | `@ux-design-expert` | §4 protected assets |
| Product or roadmap change implied by §5 | `@pm` | §5 ranked friction list |

**Not decided here:** market category, competitive alternatives, segment, price, packaging,
budget, media plan, implementation.

---

## 9. Open items

| Item | Type | Blocking? | Owner | Due |
|---|---|---|---|---|
| | UNVERIFIED figure / UNTESTED asset / NOT INSTRUMENTED / MISSING INPUT | | | |

---

## 10. Record

- **Owner:**
- **Date:**
- **Review date:**
- **Provenance summary:** _n_ readings SOURCED, _n_ ESTIMATED, _n_ UNVERIFIED
- **Decisions this document is permitted to justify:** only those resting on SOURCED readings.
  An UNVERIFIED figure may inform a hypothesis and may not justify a decision.

---

*Written to the repository, not to a transcript (Constitution Article I — CLI First).
Every empirical claim traces to a named publication or to this brand's own data
(Constitution Article IV — No Invention).*
