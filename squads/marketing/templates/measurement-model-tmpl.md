# Marketing Measurement Model — {{BUSINESS}} / {{PERIOD}}

**Template ID:** MKT-TM-004
**Owned by:** `@marketing:analytics-lead` (Cipher)
**Produced by:** `*measurement-model`, `*conversion-map`, `*instrumentation-spec`,
`*attribution-review`, `*provability-check`
**Consumed by:** `@marketing:brand-lead` and `@marketing:demand-lead` (what can be proven),
`@data-engineer` (modelling), `@pm` (story framing for instrumentation)

**Method source.** Avinash Kaushik, *Web Analytics 2.0: The Art of Online Accountability and
Science of Customer Centricity* (Sybex/Wiley, 2009). The book's structure is applied here:
actionable metrics and the critical few, macro and micro conversions, segmentation before
conclusion, multiplicity of data sources, and investment weighted toward analysis rather than
tools.

**Attribution boundaries that this template holds explicitly:**

| Concept | Where it comes from | Not from |
|---|---|---|
| Actionable metrics, critical few, "do not data puke", segmentation before conclusion, macro/micro conversions, multiplicity | Kaushik, *Web Analytics 2.0* (2009) | — |
| Digital Marketing and Measurement Model; See-Think-Do-Care | Later work published on the author's **Occam's Razor blog** | The 2009 book |
| Randomised holdouts, geo experiments, marketing mix modelling | Established measurement disciplines with their own broad literature | Kaushik — do not borrow his name for them |
| Effect windows and what horizon each effect belongs to | `@marketing:demand-lead` (Binet and Field, IPA 2013) | This agent |
| The constructs brand tracking must measure | `@marketing:brand-lead` (Sharp 2010; Romaniuk and Sharp 2016; Romaniuk 2018) | This agent |

[[LLM: FILLING INSTRUCTIONS

Build TOP DOWN. Never start from what the tool can capture — that is how the instrument comes to
choose the objective.

Three rules:

1. Objectives come from @marketing:demand-lead and @marketing:brand-lead. Do NOT invent them
   here. If §1 is empty, this model will measure whatever was convenient.
2. Every metric passes the decision test: name the specific decision it would change and who
   would take it. "It gives us visibility" is not a decision. If no decision, the metric does not
   go in the model.
3. A metric that is NOT FEASIBLE stays in §5 as an open gap. It is NEVER quietly dropped and
   replaced with an easier proxy. That substitution is how objectives disappear, and it escalates
   to @marketing-chief — removing the proxy alone would leave the objective entirely untracked,
   which is worse.

A model that survives this template is usually three to seven headline numbers long.]]

---

## 1. Business objectives (consumed, not authored here)

| Objective | Owner | Horizon | Source artifact |
|---|---|---|---|
| | `@marketing:demand-lead` / `@marketing:brand-lead` | short / medium / long | |

**If this section is empty, stop.** A measurement model built without objectives measures
whatever the tool exposes, and the tool has no view about what matters.

---

## 2. Goals

The specific, marketing-owned achievements that serve each objective.

| # | Goal | Serves objective | Owner |
|---|---|---|---|
| | | | |

---

## 3. The critical few

Two to three metrics per goal, maximum. *A dashboard with forty numbers hides the three that
matter and gives every stakeholder licence to find their own story in it.*

| Metric | Goal | **Decision it would change** | **Who takes that decision** | Target (set in advance) | Target basis | Segments it must be read through | Interpretable over | Type |
|---|---|---|---|---|---|---|---|---|
| | | | | | historical / benchmark / required-for-plan | | window, from `@marketing:demand-lead` | OUTCOME / activity |

**Rules enforced in this table:**

- A metric with no named decision is **removed**, not demoted to an appendix.
- A metric with no target set in advance cannot be good or bad, so it will be narrated into
  whichever the reader needs. Set the target or remove the metric.
- Activity metrics — impressions, sessions, engagement — are diagnostic inputs. They do not sit
  at the top of a report.
- A metric read inside the wrong window is noise. The window comes from
  `@marketing:demand-lead`'s effect-window analysis, not from the reporting calendar.

---

## 4. Conversion map

### 4.1 Macro conversion

**One**, not four. The single outcome the business actually wants.

| Item | Value |
|---|---|
| Macro conversion | |
| How it is recorded | |
| Known coverage gaps | offline, cross-device, unlinkable journeys |

### 4.2 Micro conversions

Most visitors are not ready to complete the macro conversion. A model counting only the macro
conversion undervalues everything that creates future demand.

| Micro conversion | Why it has value | Basis | Instrumented? |
|---|---|---|---|
| | | **OBSERVED CORRELATION** with the macro conversion / **JUDGEMENT** | |

> **Correlation warning, stated in the artifact and not in a footnote:** a micro conversion that
> correlates with the macro conversion may not cause it. Optimising the proxy can move the proxy
> without moving the outcome. Where the basis is OBSERVED CORRELATION, say so on the row.

### 4.3 Not captured by this map

- Offline outcomes:
- Cross-device journeys:
- Channels with no measurement surface:
- Word of mouth and dark social:

---

## 5. Feasibility and gaps

| Metric | INSTRUMENTED / INSTRUMENTABLE (with cost) / **NOT FEASIBLE** | Cost to close | Residual uncertainty even then |
|---|---|---|---|
| | | | |

**Open measurement gaps** — carried forward, never silently substituted:

| Objective or construct | Why not feasible | Proxy considered and **rejected** | Escalated to |
|---|---|---|---|
| | | | `@marketing-chief` where an objective would otherwise go untracked |

> Correction sequencing where a proxy is already in place: commission the real measurement
> first, run both in parallel for one cycle, retire the proxy last. **Never retire first** —
> removing the proxy alone leaves the objective entirely unmeasured, which looks like a fix and
> is not.

---

## 6. Segmentation

Aggregate data conceals more than it reveals. Almost every averaged figure is the sum of two
populations behaving differently, and the average describes neither.

| Headline metric | Dimensions it is decomposed along | Segments that behave differently enough to warrant different decisions | Actionable? |
|---|---|---|---|
| | source / intent / entry point / device / new vs returning / geography / segment from `@products:positioning-lead` | | yes / no — **if no, drop the split; it is arithmetic, not analysis** |

**Restated conclusions.** For each headline, restate the aggregate conclusion in light of the
segments. In most cases the aggregate conclusion is either wrong or true of only one segment —
say which.

---

## 7. Attribution review

| Item | Statement |
|---|---|
| Model actually in use | *(including the default the tool applies when nobody chose one — "we do not use a model" always means last-click)* |
| What the model assumes about credit | |
| Alternative models tested | at least two |
| How much the answer moves between models | |
| Conclusions that flip between models | *a conclusion that flips is a property of the model, not of the channel* |

**Structurally invisible to every click-based model** — receives zero credit regardless of real
contribution:

- Offline touchpoints:
- Unlinkable cross-device journeys:
- Dark social and word of mouth:
- Long-window brand effects:

**Allocation vs cause, separated explicitly:**

- Allocation claim: "Channel X is *credited with* Y."
- Causal claim: "Channel X *caused* Y." — requires a control. See §8.
- **Claims in the source report that survive this review:**

---

## 8. Causal design (where a causal claim is required)

| Item | Statement |
|---|---|
| The causal question, precisely | "If we had not done this, what would have happened?" |
| Control strategy | RANDOMISED HOLDOUT / GEO SPLIT / ON-OFF PHASING / MODELLED SEPARATION |
| Why this one | |
| Confounds it controls | |
| **Confounds it does not control** | |
| Minimum duration | taken from `@marketing:demand-lead`'s effect window — *a control test run inside too short a window inherits the very error it was meant to correct* |
| Cost, **including revenue foregone in the holdout** | |
| **Decision rule, set before the data is seen** | what result leads to what action |

**Strategy notes:**

| Strategy | Strength | Limit |
|---|---|---|
| Randomised holdout | Strongest read | Requires withholding at the individual level |
| Geo split | Suits broad-reach channels | Matching quality is the whole result |
| On/off phasing | Weakest of the three | Confounded by anything else changing over time — use only when neither of the above is possible, and say so |
| Modelled separation (marketing mix modelling) | Separates base from incremental | Requires long history; produces estimates with meaningful confidence intervals, which must be reported |

> **Attribution note.** These are established measurement disciplines with their own broad
> literature. They are **not** Kaushik's frameworks and are not attributed to him here.
> Statistical design for product-surface experiments belongs to
> `@products:experimentation-lead` — coordinate, do not duplicate.

---

## 9. Qualitative layer

Clickstream tells you *what happened*, never *why*. A single data source produces a confident and
partial answer.

| Question the quantitative data structurally cannot answer | Method | Sample and interception point | **Bias this method introduces** |
|---|---|---|---|
| | survey / session review / customer interview / support and sales transcripts / win-loss records | | *every survey has a response bias — name it* |

**Reconciliation rule:** when qualitative and quantitative findings disagree, the disagreement is
a **finding**, not an error to be resolved by preferring the bigger number.

**Boundary:** where the question is about customers rather than about traffic, the research
design goes to `@products:discovery-lead` rather than being duplicated here.

---

## 10. Instrumentation requirements

Derived from the model above, never the reverse.

| Metric | Event or record needed | Properties required | Identity basis | Retention | Granularity |
|---|---|---|---|---|---|
| | | | | | |

**Identity resolution, stated honestly and once:**

- Journeys that **can** be linked across sessions, devices and channels:
- Journeys that **cannot**:
- *Unlinkable journeys are a permanent limit on every attribution claim downstream. Documented
  here so it is not rediscovered as a surprise in each readout.*

**Validation:** how we will know the instrument measures what it claims. *An unvalidated
instrument produces numbers indistinguishable from valid ones.*

**Handoff:** specification to `@data-engineer` for modelling and `@pm` for story framing. This
agent does not write instrumentation code, does not run migrations and does not push.

---

## 11. Provability register

For each claim the business wants to make:

| Claim (precise and falsifiable) | Verdict | Uncontrolled confounds | What would close the gap | Cost | Residual uncertainty even then |
|---|---|---|---|---|---|
| | **ESTABLISHED** / **SUPPORTED** / **UNSUPPORTED** / **NOT MEASURED** | | | | |

| Verdict | Meaning |
|---|---|
| ESTABLISHED | Control present, confounds addressed, effect exceeds noise |
| SUPPORTED | Consistent evidence, no control, plausible alternatives remain |
| UNSUPPORTED | Available data cannot distinguish this claim from its alternatives |
| NOT MEASURED | The quantity was never instrumented; nothing can be said either way |

> **Never blend the verdicts, and never convert UNSUPPORTED into a directional hint to be
> helpful.** That conversion is the failure this register exists to prevent. And absence of
> measurement is not evidence of absence: an effect measured outside its window, or never
> instrumented, has not been shown to be zero.

---

## 12. Standing section — what we could not measure

Its absence in a readout is itself a finding about the measurement practice.

| Question | Why not answerable | What it would take |
|---|---|---|
| | | |

---

## 13. Boundary

**Not decided here:** which objectives matter (`@marketing:demand-lead`,
`@marketing:brand-lead`); effect windows (`@marketing:demand-lead`); the constructs brand
tracking must measure (`@marketing:brand-lead`); editorial strategy
(`@marketing:content-lead`); product-surface experiment statistics
(`@products:experimentation-lead`); schema, pipelines and queries (`@data-engineer`);
instrumentation code (`@dev`); quality gates (`@qa`); push (`@devops`, exclusive).

**Never let the instrument choose the objective.** This agent decides *how* things are measured
and what the measurement supports; *what matters* is decided upstream.

---

## 14. Record

- **Owner:**
- **Date:**
- **Review date:**
- **Headline metric count:** *(three to seven, or state why more)*
- **Open measurement gaps:**
- **Proxies currently standing in for an objective:** *(each one escalated, with the retirement
  sequence stated)*

---

*Written to the repository (Constitution Article I — CLI First). Every figure traces to a named
source, query or instrument; estimates are labelled ESTIMATE and uninstrumented quantities
NOT MEASURED, and neither is presented as a result (Constitution Article IV — No Invention).*
