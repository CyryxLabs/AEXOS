# Coherence Audit Checklist

**Checklist ID:** SALES-CL-002
**Referenced by:** sales-chief (`*coherence-check`, `*conflict-resolve`, `*deal-brief`)
**Purpose:** Audit the squad's artifacts for one deal against the coherence chain, so that the pain named in the qualification record, the insight used in the conversation, the interest defended in the negotiation and the stage claimed in the forecast describe the same deal.

[[LLM: EXECUTION INSTRUCTIONS — COHERENCE AUDIT

1. Collect every artifact for the deal WITH ITS DATE before assessing anything. An undated artifact
   cannot be placed in the chain and is treated as UNVERIFIED.
2. Assess links in chain order. A break invalidates everything downstream of it.
3. Distinguish INDEPENDENT breaks from INHERITED ones. Inherited breaks are never repaired directly
   — they resolve or collapse when the upstream break closes.
4. This audit generates NO new commercial claims. Every line traces to an artifact. Anything without
   a source goes in the UNVERIFIED block, never inline.
5. Any commercial-integrity concern found opens the report. It is never a closing caveat.]]

---

## 0. Preconditions

- [ ] Every artifact collected carries a date and a named author
- [ ] Two or more artifacts exist for this deal (a single artifact cannot be incoherent with itself)
- [ ] The most recent artifact per link is identified — a superseded artifact is not a contradiction
- [ ] No artifact is being paraphrased from memory; each is read as written

## 1. Chain population

Fill this before judging anything:

| Link | Owner | Artifact + date | What it says | Status |
|---|---|---|---|---|
| Fit | qualification-lead | | | consistent / BREAK / BREAK-inherited / MISSING |
| Pain | qualification-lead | | | |
| Insight | method-lead | | | |
| Economic buyer | qualification-lead | | | |
| Decision process | qualification-lead | | | |
| Commercial terms | negotiation-lead | | | |
| Forecast stage | pipeline-ops | | | |

- [ ] Every link has a row, including links with no artifact (marked MISSING, not left blank)
- [ ] MISSING is distinguished from BREAK. A missing artifact is cheap to create; a broken one has to be repaired.

## 2. The six contradiction checks

- [ ] **Stage without evidence.** Does the deal's current stage carry the buyer-side artifact that stage's exit criterion requires? *(Typical cause: stages defined by rep activity instead of buyer action.)*
- [ ] **Champion drift.** Is the named champion the same person in the qualification record, the meeting notes, the consensus plan and the negotiation plan? *(Typical cause: a friendly contact promoted to champion without ever being tested.)*
- [ ] **Pain without metric.** Does the named pain carry a number the **buyer** stated, and did the buyer confirm it? A seller-computed figure is a proposal, not a metric. *(Typical cause: pain articulated by the seller and never validated.)*
- [ ] **Discount without interest.** Does the concession plan name the buyer interest each concession serves? A concession that buys nothing is a break. *(Typical cause: price treated as the only variable because the decision criteria were never mapped.)*
- [ ] **Insight contradicts positioning.** Does the reframe in use name the same competitive alternative the positioning artifact names? *(Typical cause: reps improvising a frame because the positioning artifact is stale or absent — route the finding to `@products:positioning-lead`.)*
- [ ] **Forecast inversion.** Is the deal forecast with more confidence than the evidence upstream of it supports? *(Typical cause: close date driven by our quarter boundary rather than the buyer's decision process.)*

## 3. Break classification

- [ ] Each break is classified INDEPENDENT or INHERITED, with the upstream link named for every inherited one
- [ ] No inherited break has a repair action assigned to it
- [ ] The repair order runs upstream-first, with the owning specialist named per repair
- [ ] The **alternative hypothesis** is stated: if the upstream artifact is the stale one rather than the downstream one, the repair runs the other way — and the audit names who decides which

## 4. Date coherence

- [ ] The close date on record is derived from the buyer's decision process, not from our quarter boundary
- [ ] The end date implied by the mapped decision process is compared to the forecast close date, and any difference is reported as a forecast defect rather than a process defect
- [ ] Artifacts more than one quarter older than the deal's current activity are flagged as possibly stale

## 5. Integrity pass

- [ ] No artifact in the chain relies on fabricated urgency, invented scarcity, a bluffed alternative or an unmeant walk-away
- [ ] No artifact conceals a decision criterion we cannot satisfy, a known limitation, an integration gap or a cost
- [ ] Any integrity concern found is placed at the **top** of the report with a named human decider
- [ ] Price, discount policy, packaging, market category and competitive frame appear only as **consumed** inputs traced to the Products Squad — never set or revised here

## 6. Output discipline

- [ ] Every statement in the report names the artifact it came from
- [ ] Statements with no source appear only in a separate UNVERIFIED block at the end, never inline
- [ ] No contradiction is smoothed by narration; disagreements are stated in plain terms before any resolution
- [ ] No two positions are averaged into a third that no evidence supports
- [ ] Where neither side has buyer-side evidence, the output is a **verification step**, not a decision
- [ ] The report is written to the repository as a dated record — a finding that lives only in a transcript did not happen

---

## Verdict

| Field | Entry |
|---|---|
| Independent breaks | |
| Inherited breaks (and their upstream cause) | |
| Missing links | |
| Repair order (upstream first, owner per step) | |
| Cheapest next verification step | |
| Integrity concerns (surfaced at top of report) | |
| Named human decider, if one is required | |

**Pass condition:** every link populated, every break classified, the repair order upstream-first, no averaged conclusions, and every statement sourced.
