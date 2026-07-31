# Brand / Activation Split Decision — {{BUSINESS}} / {{PERIOD}}

**Template ID:** MKT-TM-002
**Owned by:** `@marketing:demand-lead` (Cadence)
**Produced by:** `*split-audit`, `*split-decision`, `*sov-position`, `*phasing-plan`, captured by
`*demand-plan`
**Consumed by:** `@marketing:analytics-lead` (feasibility of the effect metrics),
`@marketing:content-lead` (continuity carried editorially), `@marketing-chief` (balance audit)

**Method source.** Les Binet and Peter Field, *The Long and the Short of It: Balancing Short and
Long-Term Marketing Strategies* (IPA, 2013), analysing the IPA Databank of documented
effectiveness cases. Later work by the same authors is named separately where used: *Media in
Focus: Marketing Effectiveness in the Digital Era* (IPA, 2017), and their B2B-specific analysis
published with the LinkedIn B2B Institute (2019).

> ## ⚠ THIS TEMPLATE CONTAINS NO NUMBERS, AND THAT IS DELIBERATE
>
> Every ratio, split prior, share-of-voice coefficient and effect size in this literature is a
> **category average across a case databank with real dispersion** — not a constant, and not
> this business's answer. This template therefore gives you the *structure of the decision* and
> leaves every figure as a `⟨READ FROM PUBLICATION⟩` slot.
>
> Fill a slot only by reading the figure from the named publication and recording the page or
> section you read it from. Until that happens the slot stays marked **UNVERIFIED**, and an
> UNVERIFIED figure may size an argument but may not carry a budget decision on its own.
>
> A number recalled from memory and typed into this template is a Constitution Article IV
> violation and makes the whole plan unauditable.

[[LLM: FILLING INSTRUCTIONS

Three rules:

1. NEVER fill a ⟨READ FROM PUBLICATION⟩ slot from memory, from another agent's output, from a
   blog summary, or from a figure that "sounds about right". If the publication has not been
   read in this session, leave the slot and write UNVERIFIED beside it. The decision structure
   still works with the slot empty — that is the point of the design.

2. The recommendation is ALWAYS a range with a mechanism, never a point estimate. A single
   number with no mechanism is a guess wearing a decimal point, and it collapses the first time
   it is challenged.

3. §2 (actual split) is completed BEFORE §4 (recommended split). Reporting what the plan
   already does, line by line, is the finding that most often changes the conversation — the
   claimed split and the actual split diverge routinely, because hybrid lines are counted as
   brand building in the plan and optimised as activation in practice.]]

---

## 1. Inputs consumed

| Input | Source | Present? |
|---|---|---|
| What brand building must achieve — CEPs, reach, continuity, assets | `@marketing:brand-lead` (brand specification) | |
| Position — category, alternatives, segment | `@products:positioning-lead` | |
| Which of the effect metrics below are instrumentable | `@marketing:analytics-lead` | |
| Current spend detail, incl. agency fees and production | Finance | |
| Category and competitor spend | | |

**If the brand specification is absent,** this document sizes nothing. A split is a size, and a
size needs something to be the size of. Record the dependency and stop.

---

## 2. Actual split today (before any recommendation)

Classify every line. Classify by **optimisation target**, not by label: a line called brand
building but optimised for click-through behaves as activation regardless of intent.

| Spend line | Amount | Audience: all category buyers, or in-market only? | Effect onset: days, or months? | Optimised for response, or for reach and memorability? | Effect ends with spend? | Class |
|---|---|---|---|---|---|---|
| | | | | | | BRAND / ACTIVATION / HYBRID |

**Hybrid handling:** a line that both builds memory and drives immediate response is HYBRID.
Split it by judgement and record the judgement — do not silently assign it whole.

| | Amount | Share of total |
|---|---|---|
| Brand building | | |
| Sales activation | | |
| Hybrid (apportioned) | | |

- **Actual split:** ⟨computed⟩
- **Claimed split in the current plan:** ⟨as written⟩
- **Divergence and its cause:**
- **Lines whose optimisation target contradicts their classification:**

---

## 3. Share of voice position

| Item | Value | Measurement basis | Provenance |
|---|---|---|---|
| Share of market | | | SOURCED / ESTIMATED |
| Share of voice | | spend / impressions / reach — name one | |
| Excess share of voice (SOV − SOM) | | | |

**Basis warning.** Different measurement bases give different answers. Comparisons are valid
only within one basis; say which one and stay inside it.

**Documented relationship** [SOURCE: Binet and Field, 2013]: positive excess share of voice is
associated with share growth over time, negative with share decline.

- **Conversion coefficient (excess SOV → share change):** `⟨READ FROM PUBLICATION⟩` —
  **UNVERIFIED.** Do not fill from memory. When read, record the publication and the dispersion
  reported alongside it. Use it to size an argument between options; it does not promise an
  outcome.
- **Relativity check — competitors increasing spend:** model the scenario explicitly. A flat
  budget while competitors increase is a cut that nobody recorded as one.

| Scenario | Our spend | Competitor assumption | Resulting SOV | Resulting excess SOV | Implied direction |
|---|---|---|---|---|---|
| A | | flat | | | |
| B | | growing at recent observed rate | | | |

---

## 4. Recommended split

### 4.1 Starting prior

| Item | Value | Status |
|---|---|---|
| Published category prior | `⟨READ FROM PUBLICATION⟩` | **UNVERIFIED until read** |
| Publication it comes from | Binet and Field (IPA, 2013) / *Media in Focus* (IPA, 2017) / LinkedIn B2B Institute work (2019) — name which | |
| Section or page read | | |
| Dispersion reported alongside it | | |

**If the prior has not been read:** proceed with the adjustment table anyway and express the
recommendation as *direction and magnitude of adjustment from an unread prior*. That is an
honest, usable output. A fabricated prior is not.

### 4.2 Adjustments

Each adjustment states a direction and a reason. Directions are structural; the magnitudes are
this business's judgement and are labelled as such.

| Factor | This business | Direction | Magnitude | Evidence class | Reason |
|---|---|---|---|---|---|
| Purchase cycle length | | → brand building as cycle lengthens | | OWN DATA / DATABANK PRIOR / ANALOGUE / JUDGEMENT | At any moment most future buyers are out of market and reachable only through memory |
| Share position | | → brand building when share is small and growing | | | A small share means a small existing demand pool for activation to harvest |
| Customer mix | | → brand building where growth comes from new customers | | | Activation converts known demand; it is weak at creating first consideration |
| Business model | | → activation where repeat, contractual or strongly seasonal | | | Renewal and seasonal harvesting genuinely pay back inside a short window |
| Competitor spend behaviour | | → brand building where competitors are increasing | | | Share of voice is relative |
| Physical availability constraint | | **not a split adjustment** | — | | Neither mechanism pays back through a blocked buying path. Fix it first, with `@marketing:brand-lead` |

### 4.3 Recommendation

- **Range:** ⟨brand building X–Y% / activation Z–W%⟩ — **a range, never a point**
- **Mechanism behind it, in one sentence:**
- **The single factor most likely to move the range:**
- **Evidence class of the recommendation as a whole:** `OWN DATA` / `DATABANK PRIOR adjusted by
  OWN DATA` / `DATABANK PRIOR only` / `JUDGEMENT`
- **What this is not:** a forecast. State that explicitly if the class is DATABANK PRIOR or
  JUDGEMENT.
- **What would change it, and when it should be revisited:**

---

## 5. Phasing

| Period | Brand building | Activation | Rationale |
|---|---|---|---|
| | | | |

- **Continuity requirement** (from `@marketing:brand-lead`'s reach audit):
- **Harvest windows** (category seasonality):
- **Planned dark periods, and their cost:** which buying occasions occur in them, and which
  competitor is present while we are not.
- **Sequencing check:** activation into a period with no prior brand presence will show poor
  efficiency. Say so before the plan runs, not in the post-mortem.

---

## 6. Effect windows

No activity is judged inside a window shorter than its effect.

| Activity | Class | Effect onset | Effect decay | Minimum interpretable window | Window currently used | Verdict |
|---|---|---|---|---|---|---|
| | brand / activation / hybrid | | | | | FAIR / **UNINTERPRETABLE** |

> **Uninterpretable, not negative.** A readout taken inside a window shorter than the effect
> produces a blank, not a zero. "Effect not measured" is the honest line; "no effect" is a claim
> the data did not make. Never convert a too-short window into a directional conclusion "for now".

---

## 7. Metrics by horizon

| Horizon | Window | Metrics | Valid for | Invalid for |
|---|---|---|---|---|
| Short | days–weeks | response volume, cost per acquisition, conversion rate, in-window return on ad spend | activation | any judgement about brand building |
| Medium | months–quarters | base demand level, share of search or equivalent demand proxy, CEP-linked retrieval from brand tracking | early brand evidence, leading indicators of a cut | final brand outcomes |
| Long | years | market share, price elasticity, discount depth, margin, base vs incremental decomposition | brand building outcomes, cumulative cost of short-termism | anything needing a quarterly answer |

**FORBIDDEN in this artifact:** ranking metrics from different horizons in one efficiency table.
The short-horizon activity wins by construction, regardless of value produced.

**Instrumentability** — confirmed by `@marketing:analytics-lead`, not assumed here:

| Metric | INSTRUMENTED / INSTRUMENTABLE (cost) / NOT FEASIBLE |
|---|---|
| | |

Anything NOT FEASIBLE is recorded as an open measurement gap. It is **not** replaced with an
easier proxy — that substitution is the mechanism by which objectives silently disappear, and it
escalates to `@marketing-chief`.

---

## 8. Cut scenarios (if a reduction is on the table)

A cut is stated as a **trade**, never as a veto and never as free.

| | Statement |
|---|---|
| What is cut, and from which mechanism | |
| **Improves immediately** — margin, cash, reported efficiency ratios | (give this its strongest form; the case for the cut deserves it) |
| Degrades in weeks | activation volume, if activation was cut |
| Degrades in months | share of voice position, brand tracking readings |
| Degrades in quarters to years | base demand, price elasticity, acquisition cost, share |
| Recovery asymmetry | rebuilding memory structure costs more and takes longer than maintaining it — decay happens during the gap and competitors occupy the space |
| Leading indicators to watch | so the cost becomes visible early enough to act |
| Verdict | the trade, stated plainly. A business that needs cash may correctly take it. The failure is taking it while believing it is free |

---

## 9. Falsification

- **The reading that, if it does not move by ⟨date⟩, ends this argument:**
- **What we currently cannot prove, and what proving it would require and cost:**
  (route feasibility to `@marketing:analytics-lead`)

> A budget defence with no failure condition is advocacy, not analysis, and it loses the next
> argument as well as this one.

---

## 10. Boundary

**Not decided here:** what the brand should mean, which entry points to build, which assets
(`@marketing:brand-lead`). Whether an effect can be measured
(`@marketing:analytics-lead`). Editorial pipeline (`@marketing:content-lead`). Category,
alternatives, segment (`@products:positioning-lead`). Price and packaging
(`@products:pricing-strategist`). Epic framing (`@pm`), stories (`@sm`), implementation
(`@dev`), quality gates (`@qa`), push (`@devops`, exclusive).

---

## 11. Record

- **Owner:**
- **Date:**
- **Review date:**
- **UNVERIFIED figures still in this document:** ⟨list⟩
- **Decisions resting on an UNVERIFIED figure alone:** must be `none`. If not none, the document
  is not ready.

---

*Written to the repository (Constitution Article I — CLI First). Every ratio, coefficient and
effect size traces to a named publication or to this business's own data (Constitution
Article IV — No Invention).*
