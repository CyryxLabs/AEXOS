# Measurement Honesty Checklist

**Checklist ID:** MKT-CL-004
**Referenced by:** `@marketing:analytics-lead` (Cipher)
**Applies to:** any dashboard, readout, attribution claim, incrementality design or measurement
model before a decision is taken on it
**Purpose:** apply the test the method actually applies — would this number change a decision,
does the conclusion survive segmentation, is there a control, and is the uncertainty stated with
the number rather than beneath it.

**Method source.** Avinash Kaushik, *Web Analytics 2.0: The Art of Online Accountability and
Science of Customer Centricity* (Sybex/Wiley, 2009) — for actionability, the critical few,
segmentation before conclusion, macro and micro conversions, and multiplicity of data sources.

**Two attribution boundaries this checklist holds, and does not blur:**

1. The Digital Marketing and Measurement Model and See-Think-Do-Care are **later work published
   on the author's Occam's Razor blog**, not content of the 2009 book. Cite them that way.
2. The incrementality methods below — randomised holdouts, geo experiments, marketing mix
   modelling — are **established measurement disciplines with their own broad literature**. They
   are not Kaushik's frameworks and his name is not borrowed for them.

Effect windows come from `@marketing:demand-lead` (Binet and Field, IPA 2013). Brand constructs
come from `@marketing:brand-lead` (Sharp 2010; Romaniuk and Sharp 2016; Romaniuk 2018).

[[LLM: EXECUTION INSTRUCTIONS

Mark each item [x] pass, [ ] fail, [N/A] with a written reason.

Section A is the gate and it is unusual: it is applied METRIC BY METRIC, not to the artifact as a
whole. A single metric that fails A.1 does not sink the report — it is removed from the report.
The report fails Section A only if a metric that failed A.1 is still in it.

Section C is the causal gate. If a causal claim appears anywhere without a control, the claim is
blocked. It is not downgraded to "directional", not softened to "suggests", not accompanied by a
hedge. Those three moves are how a correlation acquires a confident tone.

Do not mark D.4 [x] because uncertainty appears somewhere in the document. It must appear in the
same sentence as the number. Uncertainty relegated to a footnote is uncertainty removed.]]

---

## A. Gate — actionability, metric by metric

*For each metric in the artifact:*

- [ ] **A.1 DECISION** — a specific decision this metric would change is named, along with who
  would take it. *"It gives us visibility" is not a decision.* If none → the metric is **removed**,
  not demoted to an appendix.
- [ ] **A.2 TARGET** — a target was set **in advance**, with its basis stated (historical,
  benchmark, or required-for-plan). *Without one the number cannot be good or bad, so it will be
  narrated into whichever the reader needs.*
- [ ] **A.3 SOURCE** — the instrument or query producing it is named, and that instrument is
  **validated**. *An unvalidated instrument produces numbers indistinguishable from valid ones.*
- [ ] **A.4 TYPE** — outcome, or activity? Activity metrics (impressions, sessions, engagement)
  are diagnostic inputs and do not sit at the top of a report.
- [ ] **A.5 COUNT** — the surviving critical few is small. *A report that survives this audit is
  usually three to seven numbers long; a dashboard with forty numbers hides the three that
  matter.*

**Artifact-level:** the report fails Section A if any metric that failed A.1 is still present.

## B. Segmentation

- [ ] **B.1** No headline figure is presented in aggregate without decomposition. *Almost every
  averaged figure is the sum of two populations behaving differently, and the average describes
  neither.*
- [ ] **B.2** Decomposition runs along dimensions that could carry different decisions — source,
  intent, entry point, device, new vs returning, geography, or the segment from
  `@products:positioning-lead` where one is established.
- [ ] **B.3** The distribution is reported, not only the mean.
- [ ] **B.4** Each split passes the actionability test: could we actually do something different
  for this segment? If not, the split is arithmetic and is dropped from the report.
- [ ] **B.5** The original conclusion is **restated in light of the segments**, saying explicitly
  where an aggregate conclusion turned out to be wrong or true of only one segment.
- [ ] **B.6** Surface metrics — bounce rate, session duration and similar — are not interpreted
  in aggregate.

## C. Causal gate — control before cause

*Any FAIL here blocks the causal claim.*

- [ ] **C.1** Every claim is separated into **allocation** ("channel X is credited with Y") and
  **cause** ("channel X caused Y"). The two are not used interchangeably anywhere.
- [ ] **C.2** Any causal claim names its control: randomised holdout, geo split, on/off phasing,
  or modelled separation.
- [ ] **C.3** Where there is **no control**, the claim is stated as correlation. It is **not**
  downgraded to "directional", "suggests", or "indicates" — those are correlation with a
  confident tone.
- [ ] **C.4** The confounds the design does **not** control are listed explicitly, alongside the
  ones it does.
- [ ] **C.5** The test duration is drawn from `@marketing:demand-lead`'s effect window. *A
  control test run inside too short a window inherits the very error it was meant to correct.*
- [ ] **C.6** Where on/off phasing was used, the artifact says it is the weakest of the three and
  why nothing stronger was possible.
- [ ] **C.7** Where marketing mix modelling was used, the confidence intervals are reported, not
  just the point estimates.
- [ ] **C.8** The cost of the test — **including revenue foregone in the holdout** — is stated
  and included in the decision.
- [ ] **C.9** The **decision rule was set before the data was seen**. *Without it the result will
  be interpreted after the fact toward whatever was already preferred.*
- [ ] **C.10** Incrementality methods are attributed to the broad measurement discipline, not to
  Kaushik.

## D. Attribution

- [ ] **D.1** The attribution model **actually in use** is identified, including the tool's
  default where nobody chose one. *"We do not use a model" always means last-click.*
- [ ] **D.2** The model's assumptions are stated in plain language — what it believes about
  credit, and what it therefore cannot see.
- [ ] **D.3** The same claim is re-run or estimated under **at least two alternative models**, and
  the movement in the answer is reported. *A conclusion that flips between models is a property
  of the model, not of the channel.*
- [ ] **D.4** The structurally invisible are named: offline touchpoints, unlinkable cross-device
  journeys, dark social, word of mouth, and long-window brand effects. *These receive zero credit
  under every click-based model regardless of their real contribution.*
- [ ] **D.5** Last-click is treated as a reporting convention, not as a finding.
- [ ] **D.6** No budget or plan decision in the artifact rests on an attribution allocation
  presented as a causal claim.
- [ ] **D.7** Identity resolution limits are documented — which journeys can be linked and which
  cannot. *This is a permanent limit on every attribution claim downstream and belongs in the
  record once, not rediscovered per readout.*

## E. Uncertainty and honesty

- [ ] **E.1** Residual uncertainty is stated **in the same sentence as the number**. Footnoted
  uncertainty is uncertainty deleted.
- [ ] **E.2** Every claim carries one of four verdicts, unblended: `ESTABLISHED`, `SUPPORTED`,
  `UNSUPPORTED`, `NOT MEASURED`.
- [ ] **E.3** No `UNSUPPORTED` verdict has been converted into a directional hint to be helpful.
- [ ] **E.4** `NOT MEASURED` is not treated as zero. *Absence of measurement is not evidence of
  absence: an effect measured outside its window, or never instrumented, has not been shown to be
  zero.*
- [ ] **E.5** Where a question is important and not answerable, the artifact says so **and** says
  what it would take, roughly what that costs, and what uncertainty would remain even then. *A
  gap statement with no route is an obstruction.*
- [ ] **E.6** Estimates are labelled `ESTIMATE` and are not presented as results.
- [ ] **E.7** No figure appears without a named source, query or instrument behind it.
- [ ] **E.8** Where a marketing-literature figure is cited, the publication and year are named,
  and later blog work is not attributed to the 2009 book. **No citation, title, year or figure is
  invented or approximated** — a plausible citation that cannot be checked passes review by
  looking correct, which makes it the hardest defect to catch.

## F. Proxy substitution

- [ ] **F.1** No metric in the model is a proxy quietly standing in for an objective nobody
  measures directly. Where one is found it is **escalated to `@marketing-chief`** — a substituted
  objective is a squad-level problem, not a dashboard problem.
- [ ] **F.2** Any metric marked NOT FEASIBLE is carried forward as an **open measurement gap**,
  not silently replaced with an easier one.
- [ ] **F.3** Where a proxy is already in place, the correction sequence is stated: commission the
  real measurement first, run both in parallel for one cycle, retire the proxy last. **Never
  retire first** — removing the proxy alone leaves the objective entirely untracked, which looks
  like a fix and is worse than the proxy.
- [ ] **F.4** Micro conversions whose value rests on **observed correlation** say so on the row.
  *A micro conversion that correlates with the macro conversion may not cause it, and optimising
  the proxy can move the proxy without moving the outcome.*

## G. Multiplicity

- [ ] **G.1** The model does not rest on clickstream alone. *Clickstream tells you what happened,
  never why; a single data source produces a confident and partial answer.*
- [ ] **G.2** A qualitative layer exists — survey, session review, interview, support or sales
  transcripts, win-loss records — with the specific question each answers.
- [ ] **G.3** Every survey names the response bias it introduces.
- [ ] **G.4** The reconciliation rule is stated: when qualitative and quantitative findings
  disagree, the disagreement is a **finding**, not an error resolved by preferring the bigger
  number.
- [ ] **G.5** Where the question is about customers rather than about traffic, the research design
  goes to `@products:discovery-lead` rather than being duplicated.

## H. Readout construction

- [ ] **H.1** It opens with the decision or question at hand, not with the data.
- [ ] **H.2** Only the critical few appear; everything else is appendix or removed.
- [ ] **H.3** Each number reports four things together: value, target, what changed, and why —
  with the "why" carrying its verdict from E.2.
- [ ] **H.4** A standing **"what we could not measure"** section is present. *Its absence is
  itself a finding about the measurement practice.*
- [ ] **H.5** Every finding ends with a recommended action tied to a specific number. *A readout
  with no recommended action is a data puke with better formatting.*
- [ ] **H.6** Every metric is read over the horizon on which it is interpretable, taken from
  `@marketing:demand-lead`. A metric read inside the wrong window is noise.
- [ ] **H.7** No short-horizon and long-horizon metrics are ranked in the same efficiency table.

## I. Boundary

- [ ] **I.1** The artifact does not decide which objectives matter
  (`@marketing:demand-lead`, `@marketing:brand-lead`). The instrument does not choose the
  objective.
- [ ] **I.2** It does not set effect windows (`@marketing:demand-lead`) or define brand
  constructs (`@marketing:brand-lead`).
- [ ] **I.3** It does not design product-surface experiments or their statistical power
  (`@products:experimentation-lead`) — it coordinates rather than duplicates.
- [ ] **I.4** It contains no schema, pipeline or query implementation (`@data-engineer`), no
  instrumentation code (`@dev`), no test plan (`@qa`), no story (`@sm`), no epic (`@pm`) and no
  push (`@devops`, exclusive).
- [ ] **I.5** Written to the repository with an owner and a review date.

---

## Verdict

| Verdict | Condition |
|---|---|
| `APPROVED` | Sections A and C clean; score ≥ 90% across B, D–I |
| `CONCERNS` | Sections A and C clean; score 75–89% |
| `REWORK` | Score below 75%, or any FAIL in B.1, D.6, E.1, F.1 or F.3 |
| `BLOCKED` | Any FAIL in Section A (a non-actionable metric still in the report) or Section C (a causal claim with no control) |

**Critical items regardless of score:** A.1, C.1, C.3, C.9, D.6, E.3, E.4, E.8, F.1, F.3.

## Priority fix order

1. **Section C** — control before cause. A causal claim without a control moves budget on a
   correlation, and it does so with confidence.
2. **F.1 / F.3** — proxy substitution and the retirement sequence. Getting the sequence wrong
   leaves the objective untracked while looking like a correction.
3. **A.1** — non-actionable metrics. Removing them is what makes the rest of the report readable.
4. **E.1 / E.3 / E.4** — uncertainty in the sentence, verdicts unblended, absence not read as
   zero.
5. **B.1** — segmentation before conclusion.
6. **D** — attribution model, sensitivity, and the invisible contributors.
7. **G / H / I** — multiplicity, readout construction, boundary.
