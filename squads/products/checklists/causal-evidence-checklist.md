# Causal Evidence Checklist

**Checklist ID:** PRD-CL-004
**Squad:** products
**Referenced by:** jobs-analyst (Plumb)
**Applies to:** personas, segments, ICP definitions, cohort analyses, win/loss summaries, and any
claim about *why* customers bought — including claims made inside a job statement, a forces map,
a strategy document or a roadmap rationale
**Purpose:** Separate what correlates with purchase from what caused it, before either is used to
decide what to build. Produces a per-claim classification and a scored verdict.

[[LLM: INITIALIZATION INSTRUCTIONS — CAUSAL EVIDENCE

This gate runs on claims, not on documents. Extract every explanatory claim from the artifact
first, then run the checklist once per claim, then score the artifact.

EXECUTION APPROACH:
1. Enumerate the claims. A claim is any statement that explains, or is used to explain, why a
   purchase, a churn or a behaviour happened. Include implicit ones: a persona line placed under
   "why they buy" is a claim even if it is phrased as a description.
2. For each claim, run sections 1 through 4 and record a class: CAUSAL, CORRELATIONAL,
   MISCLASSIFIED or UNSUPPORTED.
3. Run sections 5 through 7 once for the artifact as a whole.
4. Mark [x] only when satisfied AND you can say why in one line.
5. BLOCKING items are marked (BLOCKING). Any BLOCKING failure caps the verdict at FAIL.
6. Correlational is not a failing class. A correlation correctly labelled and correctly used is a
   good artifact. The failure is a correlation used as an explanation.

This gate is non-destructive. Repairs run through `*audit-personas`, `*circumstance-map` or
`*switch-interview`, not inside this checklist.]]

---

## 1. Claim Inventory and Classification

Run once per claim.

- [ ] The claim is written out verbatim, as it appears in the artifact
- [ ] The claim's role is recorded: is it used for targeting spend, or for deciding what to build
- [ ] **(BLOCKING)** The claim is classified as one of:
      - **CAUSAL** — names a circumstance with a trigger, evidenced by a switch interview
      - **CORRELATIONAL** — an attribute that co-occurs with purchase, correctly labelled as such
      - **MISCLASSIFIED** — a correlation being used as an explanation of purchase
      - **UNSUPPORTED** — no evidence of either kind behind it
- [ ] The evidence behind the claim is named: transcript id, analytics query, CRM field, workshop,
      or "none found"
- [ ] Where the evidence is analytics, the claim is not used to decide what to build

| Class | Legitimate use | Illegitimate use |
|---|---|---|
| CAUSAL | Deciding what to build, what to reduce, what to preserve | — |
| CORRELATIONAL | Allocating acquisition spend, sizing, filtering an outreach list | Explaining why anyone bought; deciding a roadmap |
| MISCLASSIFIED | None — reclassify or re-evidence | Any |
| UNSUPPORTED | None — remove or evidence | Any |

## 2. The Two-People Diagnostic (BLOCKING)

The central test. Applied to every attribute appearing in an explanation.

- [ ] **(BLOCKING)** For each attribute in the claim, the question has been asked and answered in
      writing: **could two people sharing this attribute be in opposite circumstances?**
- [ ] Where the answer is yes, the attribute is removed from the causal explanation
- [ ] Where the attribute is retained for targeting, it is explicitly relabelled as a targeting
      filter and moved out of the "why they bought" section
- [ ] The circumstance actually doing the causal work is named in the attribute's place, or the gap
      is recorded as `circumstance not yet identified`
- [ ] The replacement circumstance has a trigger and can be positioned in time

**Worked application.**

| Line under audit | Two people sharing it in opposite circumstances? | Class | Verdict |
|---|---|---|---|
| "32–45 years old" | Trivially yes | Demographic attribute | Cut from the causal explanation |
| "50–500 person B2B SaaS company" | Yes — one under audit pressure, one not | Firmographic attribute | Keep as a targeting filter, remove from the explanation |
| "Values data-driven decision making" | Yes, and everyone says it | Stated preference | Cut unless it appears verbatim in a transcript |
| "Reports to the CEO or CRO" | Partly — it constrains the situation | Attribute, but load-bearing | Keep and restate as circumstance: accountability is public and unscheduled |
| "Alone in a car on a long commute with one free hand" | No | Circumstance | Keep — this is doing the causal work |
| "Just failed an audit and must show evidence within 30 days" | No | Circumstance | Keep |

The failing rows are not wrong facts. They are true facts placed in the wrong column, and the
column is what decides whether they end up steering a roadmap.

## 3. Timing — Does the Claim Explain Why Now

A correlation explains who is in the market. Only a circumstance explains why the purchase happened
on that date rather than never.

- [ ] The claim explains the timing of the purchase, not only the identity of the buyer
- [ ] A trigger event is named, with a date or a position in a sequence
- [ ] The claim would not have been equally true a year before the purchase. (If it would, it is
      background, not cause)
- [ ] The deciding event is isolated — the answer to "what made that day different from the week
      before"
- [ ] Where no trigger can be found, push is recorded as weak, and that is stated as the finding
      rather than papered over

**Diagnostic.** Ask the claim to explain a non-purchase. If the same claim is equally true of
people in the segment who did not buy, it is not explaining the purchase — it is describing the
segment.

## 4. Evidence Provenance

- [ ] **(BLOCKING)** Any CAUSAL claim cites at least one switch interview transcript id
- [ ] Cited transcripts come from people who actually switched, not prospects speculating about a
      future purchase
- [ ] The switch falls inside the 60 to 90 day window, or the fallback source is named with its
      limitation (recent churn, closed-lost, mined sales calls)
- [ ] Each citation carries a verbatim quote, not a paraphrase
- [ ] The quote was not given in answer to an anti-probe ("why did you buy it", "what features
      matter most", "would you recommend it")
- [ ] No CAUSAL claim rests only on usage data. The struggling moment, the rejected alternatives
      and the anxiety all happened outside the product and leave no trace in telemetry
- [ ] No CAUSAL claim rests only on a workshop, a brainstorm or an internal opinion (Constitution
      Article IV — No Invention)
- [ ] Sample size is stated as `{n} of {N}`, never as "customers tell us" or "we consistently hear"
- [ ] No pattern is claimed from a single interview
- [ ] Where a number is quoted from published work, it is verified at the source or the mechanism
      is described without the number

## 5. Falsifiability (BLOCKING)

- [ ] **(BLOCKING)** Every CAUSAL claim states what evidence would overturn it
- [ ] The falsification condition names observable evidence, not a general possibility of error
- [ ] The falsification condition could discriminate between this claim and a competing one. (A
      condition that would also falsify every rival explanation tests nothing)
- [ ] Where the falsification requires a live test, it is routed to `@experimentation-lead` rather
      than designed here
- [ ] The artifact records what has already been looked for and not found, not only what was found
- [ ] Disconfirming quotes present in the transcripts are recorded, not dropped

**Diagnostic.** A claim that no interview could contradict is not a finding. If you cannot describe
the transcript that would embarrass the claim, the claim is not yet doing work.

## 6. Personas, Segments and ICPs

Run once for the artifact when it is a persona, segment or ICP.

- [ ] Every line is classified: demographic attribute, firmographic attribute, stated preference,
      or circumstance
- [ ] The artifact does not present averaged attributes as a person. The average customer does not
      exist and buys nothing
- [ ] Attribute lines are not deleted — they are relabelled and kept for targeting where useful
- [ ] The persona is not rewritten as a job statement. Persona for media buying, circumstance map
      for product decisions; the two answer different questions
- [ ] At least one circumstance is named, with a trigger, or the gap is recorded
- [ ] Where the same person appears in more than one circumstance, the circumstances are separated.
      Same person, different circumstance, different job, different competitive set
- [ ] The artifact does not assume one job per product
- [ ] Segment definitions used for spend allocation are labelled as such and are not cited in
      product decisions

**Note on drift.** Organizations drift toward attribute data because operational systems already
collect it, not because it explains purchase (Christensen, Cook and Hall, "Marketing Malpractice",
*HBR*, 2005). Expect the failing lines to be the ones that were easiest to obtain.

## 7. Competition and Non-Consumption

- [ ] Any claim about the competitive set is checked against what interviewees actually named
- [ ] The set is not built from the market category alone. A same-category list is a supplier list
- [ ] Manual workarounds, adjacent categories and human alternatives are assessed
- [ ] **Non-consumption — doing nothing and tolerating the struggle — is explicitly assessed**, not
      assumed away. It is usually the largest competitor and appears on no market map, because no
      vendor reports revenue from it
- [ ] Where non-consumption is claimed to be impossible, a transcript says so
- [ ] Frequencies are recorded as `{n} of {N}` interviews

## 8. Forces Claims

Run when the artifact contains or relies on a forces analysis.

- [ ] Each of the four forces is either evidenced with a verbatim quote or recorded as unevidenced
- [ ] Exactly one binding force is named. A forces analysis with no binding force is a diagram, not
      a decision
- [ ] Force weight is justified from behaviour in the timeline, not from interview emphasis
- [ ] Habit is stated as real value correctly perceived, not as resistance to change
- [ ] Where anxiety or habit is binding, the artifact states that adding pull would not move the
      constraint

---

## Scoring

**Calculation:** (Checked items) / (Total items − N/A items) × 100

| Verdict | Score | Additional condition |
|---|---|---|
| **PASS** | 90–100% | No BLOCKING item failed, and no claim is left MISCLASSIFIED |
| **CONCERNS** | 75–89% | No BLOCKING item failed. Usable once every MISCLASSIFIED claim is relabelled |
| **FAIL** | Below 75% | — |
| **FAIL** | Any score | **Any BLOCKING item failed, or any MISCLASSIFIED claim is being used to decide what to build** |

### Per-claim outcome, recorded alongside the score

| Class | Outcome |
|---|---|
| CAUSAL | Retained. Usable for product decisions |
| CORRELATIONAL | Retained, relabelled. Usable for spend allocation only |
| MISCLASSIFIED | Blocked until relabelled or re-evidenced through `*switch-interview` |
| UNSUPPORTED | Removed from the artifact, or moved to an explicit open-questions section |

### Why misclassification is treated as failure rather than imprecision

"Customers in segment X convert three times better" is a real and useful finding. It tells you
where to spend acquisition budget. It does not tell you what to build, because it does not say what
those customers were struggling with when they arrived — two firms in the same segment, one under
audit pressure and one not, behave nothing alike, and the segment cannot see the difference. The
damage is not the statistic. The damage is the statistic promoted to an explanation and then used
to aim a roadmap at an average customer who does not exist.

## Priority Fix Order

1. **MISCLASSIFIED claims currently steering a build decision** — highest cost, fix immediately.
2. **UNSUPPORTED claims** — remove or evidence; they cost nothing to hold and mislead freely.
3. **Missing falsification conditions on CAUSAL claims** — an unfalsifiable claim cannot be
   corrected later by any evidence.
4. **Attributes surviving the two-people diagnostic without relabelling** — relabel as targeting.
5. **Missing non-consumption assessment** — usually the largest omitted competitor.
6. **Forces analysis without a binding force** — produces no decision.
7. **Sample and provenance hygiene** — `{n} of {N}`, transcript ids, recruit sources.

## Boundary

This gate classifies evidence. It does not produce strategy, positioning, prices, experiments,
epics, PRDs or stories, and it never authorises a build. Route outward:

| Finding | Destination |
|---|---|
| Circumstance not yet identified | `*switch-interview`, then `*circumstance-map` |
| Claim needs a live test to falsify | `@experimentation-lead` |
| Competitive set is category-bound | `*job-competition`, then `@positioning-lead` if the category itself is wrong |
| Correlation is fine but sizing is missing | `@analyst` |
| Evidence is sound and ready for requirements | `@pm` |
| Story drafting | `@sm` — never produced here |
| Implementation, tests | `@dev`, `@qa` — never produced here |
| Git push, PRs, CI/CD | `@devops` — exclusive authority, no exceptions |

## Method attribution

- Clayton M. Christensen, Scott Cook and Taddy Hall, "Marketing Malpractice: The Cause and the
  Cure", *Harvard Business Review* (2005) — the drift from job-defined markets to attribute data,
  and why it happens.
- Clayton M. Christensen and Michael E. Raynor, *The Innovator's Solution* (2003), jobs chapter —
  circumstance-based versus attribute-based market segmentation.
- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, *Competing Against Luck:
  The Story of Innovation and Customer Choice* (2016) — the job as progress in a circumstance,
  hiring and firing, the job dimensions, the milkshake case.
- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, "Know Your Customers' Jobs
  to Be Done", *Harvard Business Review* (September 2016) — the job spec and organizational
  integration around the job.
- Bob Moesta with Greg Engle, *Demand-Side Sales 101: Stop Selling and Help Your Customers Make
  Progress* (2020) — the switch interview method and the four forces of progress.
- Alan Klement, *When Coffee and Kale Compete* (2016) — job-as-progress framing and competition
  across category boundaries.

`@jobs-analyst` (Plumb) is a specialist applying these methods.

## Related

- Companion gate: `squads/products/checklists/job-statement-quality-checklist.md` (PRD-CL-003)
- Evidence source: `squads/products/tasks/run-switch-interview.md`
- Forces analysis: `squads/products/tasks/map-forces-of-progress.md`
- Statement construction: `squads/products/tasks/write-job-statement.md`
- Theory reference: `squads/products/data/jtbd-reference.md`
