# Coherence Chain & Attribution Integrity Checklist

**Checklist ID:** MKT-CL-005
**Referenced by:** `@marketing-chief` (Beacon)
**Applies to:** the squad's artifacts as a set — before a consolidated brief is issued, before
handoff to `@pm`, and whenever two specialist recommendations conflict
**Purpose:** apply the two tests only the chief can apply — does position, brand model, demand
plan, content and measurement describe the *same* marketing, and does every method claim in the
set name a checkable source.

**Method source.** None. This is an original orchestration role and claims no external
methodology. The published methods live in the specialists; this checklist audits the joins
between them.

[[LLM: EXECUTION INSTRUCTIONS

Mark each item [x] pass, [ ] fail, [N/A] with a written reason.

Two gates, and they fail differently:

  GATE A (Section A — the chain) fails UPSTREAM-FIRST. A break invalidates every link downstream
  of it, not only the adjacent one. Distinguish BREAK from BREAK-INHERITED before assigning any
  repair: sending a specialist to fix a downstream artifact that is faithfully reflecting a
  broken upstream one wastes their cycle and produces a second inconsistency.

  GATE B (Section F — attribution) fails IMMEDIATELY and blocks the artifact. An unverifiable
  citation is a critical defect, not a stylistic one, because it makes the whole squad's method
  unauditable — a reader can no longer tell which claims were checked.

One thing this checklist deliberately does NOT do: resolve contradictions by averaging. If two
specialists disagree, Section D establishes the horizon each is reasoning over BEFORE anything is
treated as a factual dispute. Most brand-vs-demand conflicts in this squad are horizon
differences, and resolving one as a fact dispute produces a compromise neither side's evidence
supports and which fails on both clocks.]]

---

## A. Gate A — the coherence chain

*Chain order: position → brand model → demand plan → content → measurement.*

- [ ] **A.1** Every link has an artifact, or is explicitly recorded as `NO ARTIFACT`. A gap is
  never filled with a plausible summary — the gap is the finding.
- [ ] **A.2** Every artifact carries a date, and downstream artifacts are checked against the
  date of the artifact above them. *Most breaks come from an upstream revision that never
  propagated downstream.*
- [ ] **A.3** **Position exists.** If it does not, nothing downstream is sound; the first action
  is `@products:positioning-lead` and it sits outside this squad.
- [ ] **A.4** Each break is classified `BREAK` (independent) or `BREAK-INHERITED` (caused by an
  upstream break).
- [ ] **A.5** The repair order runs upstream first, and repairs that can proceed in parallel are
  named.
- [ ] **A.6** Where the *upstream* artifact is the stale one rather than the downstream, that is
  said plainly — the repair then runs the other way, and it is a decision for the upstream owner.

## B. Contradiction checks

- [ ] **B.1 Audience drift** — the buyer in the position, the category buyer in the brand model,
  the audience in the demand plan, the reader in the content briefs and the population in the
  measurement are the same people. *Where they are not, the usual cause is content and
  measurement written against whoever was easiest to reach and easiest to instrument.*
- [ ] **B.2 Horizon mismatch** — the measurement window matches the effect window the demand plan
  assumes for each activity. *Reporting cadence set by the board pack rather than by the effect
  is the usual cause.*
- [ ] **B.3 Proxy substitution** — every objective in the brand model has a metric that actually
  measures it, rather than a convenient one that correlates with something.
- [ ] **B.4 Beat and entry point divergence** — the editorial beats serve the category entry
  points the brand model prioritises, rather than search volume or internal interest.
- [ ] **B.5 Split without a mechanism** — the brand-vs-activation split has a stated rationale,
  and the brand side funds what the brand model actually requires.
- [ ] **B.6 Evidence inversion** — no downstream artifact is more confident than the evidence
  upstream of it. *A precise-looking media plan built on an unmeasured retrieval assumption is
  the standard case.*
- [ ] **B.7 Attribution laundering** — no budget or plan decision rests on an attribution
  allocation presented as a causal claim.
- [ ] **B.8 Orphan artifact** — every squad artifact traces to a named objective in the current
  brand model or demand plan.
- [ ] **B.9 Requirement quietly retained** — where a brand requirement was not funded, the brand
  plan was revised to reflect what is actually funded, not left at full scope. *An unfunded
  requirement left standing becomes the reason next year's review says brand work does not work.*

## C. Balance — is the squad drifting short?

- [ ] **C.1** The brand-vs-activation split is stated somewhere, with a rationale. *An unstated
  split still exists; it was set by whatever was easiest to justify.*
- [ ] **C.2** No objective has been silently replaced by a proxy. Any substitution found goes to
  proxy escalation — **not** to a dashboard fix.
- [ ] **C.3** No long-effect activity is being judged on a short clock. Effect windows in the
  demand plan are cross-checked against the reporting cadence actually in use.
- [ ] **C.4** The share of budget in directly-attributable channels has been checked across
  successive cycles, not assumed stable.
- [ ] **C.5** The metrics leadership actually sees span more than one horizon.
- [ ] **C.6** Brand and content lines are not automatically the first proposed whenever a cut is
  required — and where they are, the pattern is named as structural rather than situational.
- [ ] **C.7** The drift verdict is stated with evidence per check, and the *costing* is routed to
  the specialists. *Beacon names the drift; the specialists cost it.*

## D. Contradiction handling

- [ ] **D.1** Both recommendations are stated plainly, without softening either.
- [ ] **D.2** The **horizon each is reasoning over** is established *before* the disagreement is
  treated as a dispute about facts.
- [ ] **D.3** A comparison table exists: assumed audience, evidence held, evidence class, window,
  and what each would predict if the other were right.
- [ ] **D.4** The arbitration rule applied is named:
  - evidence vs no evidence → evidence wins this round
  - different horizons → **not a contradiction**; both hold, and the question is the split
  - different populations → a segment question; check the position
  - both evidenced, genuinely conflicting → escalate the assumption, specify the deciding
    measurement, with `@marketing:analytics-lead` on feasibility
  - neither evidenced → **the output is a measurement plan, not a decision**
  - values, not facts → surface as a human decision; never resolve silently
- [ ] **D.5** **No two evidenced positions have been averaged into an unevidenced third.**
- [ ] **D.6** The arbitration is recorded in the repository, and the losing artifact is revised
  rather than quietly retained.

## E. Proxy escalation sequencing

*Applies whenever a proxy has been found standing in for an objective.*

- [ ] **E.1** The proxy and the objective it replaced are both named, with when the substitution
  happened. *In most cases nobody decided it — the objective was not instrumentable, an easier
  metric existed, and the swap occurred by default.*
- [ ] **E.2** What is **now untracked** is stated plainly. *This is the part that gets lost.*
- [ ] **E.3** The cost of measuring the real objective has been asked of
  `@marketing:analytics-lead`, along with the residual uncertainty that would remain.
- [ ] **E.4** The owning specialist has said whether the objective is worth that cost.
- [ ] **E.5** The correction is sequenced: commission the real measurement **first**, run both in
  parallel for one cycle, retire the proxy **last**. *Never retire first — removing the proxy
  alone leaves the objective entirely unmeasured, which looks like a fix and is worse.*
- [ ] **E.6** Where the objective is genuinely not measurable at acceptable cost, it is recorded
  as an **explicit unmeasured objective** in the plan. *An acknowledged gap is manageable; a
  substituted proxy is not, because it looks like coverage.*

## F. Gate B — attribution integrity

*Any FAIL blocks the artifact. Critical, not stylistic.*

- [ ] **F.1** Every method claim names a source — author, work and year — **or** honestly declares
  that it rests on a discipline rather than a work.
- [ ] **F.2** Every named source is **checkable**. *A plausible-sounding citation that cannot be
  verified is worse than no citation, because it survives review by looking correct.*
- [ ] **F.3** Every quoted figure is marked `SOURCED` or `UNVERIFIED`. *Ratios and effect sizes
  recalled from memory are the most common failure and the hardest to spot.*
- [ ] **F.4** Where a concept comes from **later work by the same author**, that later work is
  named separately rather than folded into the primary source. Specifically:
  - Sharp, *How Brands Grow* (2010) ≠ Romaniuk and Sharp, *How Brands Grow Part 2* (2016) ≠
    Romaniuk, *Building Distinctive Brand Assets* (2018)
  - Binet and Field, *The Long and the Short of It* (IPA, 2013) ≠ *Media in Focus* (IPA, 2017) ≠
    their LinkedIn B2B Institute work (2019)
  - Kaushik, *Web Analytics 2.0* (2009) ≠ the later Occam's Razor blog frameworks
- [ ] **F.5** Where a method belongs to a **broader discipline** rather than to the named author,
  that distinction is preserved. *Incrementality methods — holdouts, geo experiments, marketing
  mix modelling — are not Kaushik's frameworks and his name is not borrowed for them.*
- [ ] **F.6** `content-lead`'s basis is stated as a **discipline with no canonical work**, and is
  not dressed in a citation. *An invented founding author would be worse than the honest absence
  of one.*
- [ ] **F.7** No citation, title, author, year, page or figure has been invented or approximated
  anywhere in the artifact set.

## G. Consolidated brief integrity

- [ ] **G.1** Every statement in the brief carries its source artifact reference. Statements with
  no source: must be zero.
- [ ] **G.2** The brief **generates nothing new**. A claim no specialist artifact supports is
  laundering assertion as synthesis.
- [ ] **G.3** Every `UNVERIFIED`, `ESTIMATED`, `UNTESTED`, `UNINTERPRETABLE` and `NOT MEASURED`
  marking is carried forward **with the statement it qualifies**, not swept into a caveats
  section. *A caveat separated from its claim stops travelling with it the moment the claim is
  quoted.*
- [ ] **G.4** Confidence has not increased during consolidation.
- [ ] **G.5** The standing "what we could not measure" section is present, taken from
  `@marketing:analytics-lead`.
- [ ] **G.6** Open questions are listed with the specialist who owns each.
- [ ] **G.7** Any ethical concern raised by a specialist is surfaced explicitly, not summarised
  away into a footnote.

## H. Routing and boundary

- [ ] **H.1** Each request was routed to **exactly one** owner. *Broadcasting produces four
  partial answers and no decision, each quietly assuming a different audience and horizon.*
- [ ] **H.2** Multi-specialist work ran in dependency order, and no upstream artifact had to be
  rewritten because a downstream step ran first.
- [ ] **H.3** The routed specialist accepted the request as theirs without re-routing.
- [ ] **H.4** The handoff brief was written so the specialist did not re-elicit basics.
- [ ] **H.5** No squad artifact defines the position, the competitive alternatives, the market
  category or the segment (`@products:positioning-lead`), or price and packaging
  (`@products:pricing-strategist`).
- [ ] **H.6** No squad artifact crosses into epic framing (`@pm`), story drafting (`@sm`), story
  validation or backlog (`@po`), implementation (`@dev`), quality gates (`@qa`), or push, PRs,
  MCP and CI/CD (`@devops`, exclusive).
- [ ] **H.7** Requests that had left the marketing surface were routed outward —
  `@analyst` for deep research, `@ux-design-expert` for interface design and UX writing,
  `@data-engineer` for schema and pipelines.
- [ ] **H.8** Routing decisions and arbitrations are written to the repository, and the handoff
  record is in `.aexos/handoffs/`. *A decision that lives only in a transcript did not happen.*

---

## Verdict

| Verdict | Condition |
|---|---|
| `COHERENT` | Gates A and F clean; score ≥ 90% across B, C, D, E, G, H |
| `CONCERNS` | Gates A and F clean; score 75–89%; breaks named with a repair order |
| `REPAIR REQUIRED` | Any independent `BREAK` in Section B, or score below 75% |
| `BLOCKED` | Any FAIL in Section F (attribution), or `NO ARTIFACT` at the Position link |

**Critical items regardless of score:** A.3, B.3, D.5, E.5, F.2, F.3, F.7, G.2, G.4.

## Priority fix order

1. **A.3 / Position** — if the position is absent or stale, everything downstream will be
   rewritten. It is outside this squad and it is still the first action.
2. **Section F** — attribution. An unverifiable citation blocks the artifact and is fixed before
   any content question is argued.
3. **Upstream breaks in Section B**, in chain order. Never repair a `BREAK-INHERITED` before its
   cause.
4. **E.5** — proxy retirement sequencing. Getting the order wrong leaves the objective untracked
   while looking like a correction.
5. **D.5** — averaged contradictions. A compromise neither side's evidence supports fails on both
   horizons.
6. **G.3 / G.4** — markings carried forward, confidence not increased.
7. **C** — drift verdict, then route the costing.
8. **H** — routing accuracy, boundary, persistence.
