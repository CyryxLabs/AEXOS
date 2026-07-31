---
task: Convert Feature Roadmap
owner: "@product-strategist"
owner_type: agent
atomic_layer: task
Input: |
  - roadmap: The existing roadmap as it stands today, every line, with dates as written (required)
  - roadmap_owner: Who publishes the roadmap and who consumes it — board, sales, teams (required)
  - cycle: The planning cycle being converted, e.g. Q3 2026 (required)
  - business_outcome: The company objective the cycle is meant to serve, stated as a number (required)
  - evidence_sources: Data queries, discovery snapshots, market sources available to source insights (optional, default: none)
  - commitments: Known contractual, regulatory or partner obligations with their real dates (optional, default: elicit)
  - teams: Teams that would receive the resulting problems, with their staffing (optional, default: elicit)
  - output_dir: Directory for the converted roadmap (optional, default: docs/product/roadmap/)
Output: |
  - converted_roadmap: Versioned markdown with every original line classified and its disposition
  - problems_to_solve: Chosen problems with outcome key results, owning team and confidence level
  - commitment_register: Genuine high-integrity commitments preserved as dated commitments, with the discovery that made the date honest
  - removed_items: Items removed for having no stated problem and no insight behind them, with the condition for readmission
  - stakeholder_narrative: What the roadmap consumers get instead of the dated feature list
Checklist:
  - "[ ] Capture every roadmap line verbatim, with its date as written"
  - "[ ] Classify each line as solution, high-integrity commitment, or item with no stated problem"
  - "[ ] Challenge every claimed commitment against the obligation test"
  - "[ ] Convert each solution into the problem it claims to solve, for a named segment"
  - "[ ] Attach an outcome key result to each problem, with a baseline and a target"
  - "[ ] Reject key results that can be completed rather than moved"
  - "[ ] Name the insight and its source behind each retained problem"
  - "[ ] Remove items with no stated problem and no insight, and state the readmission condition"
  - "[ ] Preserve genuine commitments as dated commitments, not converted into outcomes"
  - "[ ] Assign an owning team and a confidence level per problem"
  - "[ ] Diagnose whether the receiving teams can actually own these outcomes"
  - "[ ] Write the converted roadmap and the stakeholder narrative to the repository"
---

# *roadmap-convert — Convert a Feature Roadmap into Problems to Solve

Materializes `@product-strategist *roadmap-convert {roadmap}`.

## Purpose

Take a dated list of features and turn it into the three things it should have been: problems to
solve with outcomes attached, a short register of genuine dated commitments, and a list of items
removed because nobody can say which problem they solve.

A feature roadmap encodes two assumptions that are usually false — that every item on it is
valuable, and that its date is knowable. It also hides the decision that matters: what is being
chosen over what. This task makes that decision visible and gives the roadmap's consumers
something more useful than a list that will be wrong.

This task converts an existing roadmap. It does not cut strategy focus from first principles —
that is `*strategy` and `squads/products/tasks/draft-product-strategy.md`. It does not assess the
four risks per problem in depth — that is `*risk-assess`. It does not write epics, PRDs, stories
or implementation plans.

## Preconditions

1. `roadmap` is the real artifact, with the real dates, not a cleaned-up summary. A summary hides
   exactly the lines this task exists to find.
2. `roadmap_owner` is identified, and so are the consumers. Converting a roadmap without knowing
   who reads it produces a correct artifact that nobody accepts. The board, the sales team and the
   delivery teams each need a different section of the output.
3. `business_outcome` is expressed as a measurable change. "Grow revenue" fails; "net revenue
   retention from its current level to a stated target" passes.
4. Baseline data is available for the metrics that will become key results, or the conversion
   records `baseline: unknown` per key result rather than inventing one.

## Procedure

### Step 1 — Capture the roadmap as it is

Record every line, unedited, with its date as written and its stated owner. Do not merge similar
lines, do not drop the ones that look obviously wrong, and do not correct the dates. The original
table is part of the output — it is what makes the conversion auditable a quarter later.

| # | Line as written | Date as written | Stated owner | Where it came from |
|---|---|---|---|---|

The last column matters. A line that came from a signed contract behaves differently from a line
that came from a stakeholder review, and both behave differently from a line nobody can source.

### Step 2 — Classify every line into exactly three buckets

Every line lands in one bucket. There is no fourth bucket and no "to be discussed".

| Bucket | Test | Disposition |
|---|---|---|
| **Solution** | Someone can state the problem it solves and for whom, even if imperfectly | Convert to a problem to solve, step 4 |
| **Genuine high-integrity commitment** | A real external obligation exists with a real date, and enough discovery has been done to make the date honest | Preserve as a dated commitment, step 3 |
| **No stated problem** | Nobody can say which problem it solves, for whom, or what insight put it on the list | Remove, step 5 |

Classification notes:

- Most lines are solutions. That is expected and is not a criticism — a roadmap is a list of
  solutions by construction.
- "It's strategic" is not a problem statement. Neither is "the competitor has it", unless someone
  can state the customer problem that competitor is solving.
- A line whose only justification is a person's seniority classifies as *no stated problem*. Record
  who requested it; that is the conversation to have, and it is a real conversation, not a dodge.

### Step 3 — Challenge every claimed commitment

The high-integrity commitment exists precisely so that real obligations survive the move to
outcomes. It is not a loophole for keeping the roadmap intact. Apply the obligation test to every
line claiming commitment status:

| Test | Pass | Fail |
|---|---|---|
| Is there a named external counterparty? | Signed contract, regulator, launch partner | "Leadership expects it" |
| Is the date externally fixed? | Contractual date, regulatory deadline, partner launch window | A date picked in a planning meeting |
| Has enough discovery been done to make the date honest? | The mechanism is understood and the feasibility risk is retired | The date was set before anyone looked at the work |
| What is the consequence of missing it? | A stated, material consequence — penalty, lost renewal, non-compliance | Disappointment |

A line that fails any of the four is not a high-integrity commitment. Reclassify it as a solution
and convert it in step 4.

A line that passes all four but has *not* had the discovery done is a commitment made dishonestly.
Record it as `commitment at risk`, keep the date, and route the feasibility risk to `@architect`
immediately — the obligation does not disappear because the process was skipped, but the register
should show which dates are actually underwritten.

| Commitment | Counterparty | Date | Discovery done | Consequence of miss | Status |
|---|---|---|---|---|---|

### Step 4 — Convert each solution into a problem to solve

For each solution line, write the four fields. All four, or the line does not convert.

```text
Problem:  {the customer or business problem, in the customer's terms}
Segment:  {who has it — named, not "users"}
Insight:  {the non-obvious evidenced statement that put this problem on the list}
Source:   {data query + date | discovery snapshot id | market source | technology signal}
```

Then attach the outcome:

| Problem to solve | Outcome key result (baseline -> target) | Owning team | Confidence |
|---|---|---|---|

**Key result quality gate.** Apply to every key result before it is written down:

| Key result shape | Verdict |
|---|---|
| Can be marked complete ("launch X", "migrate to Y", "ship the integration") | Deliverable — rewrite as the change it is supposed to cause |
| Names a release, a date or a scope | Output — rewrite |
| Moves a number the team can influence through the product | Keep |
| Moves a number the team cannot influence (company revenue, market share) | Belongs to leadership — decompose into the part this team moves |
| Has no baseline | Record `baseline: unknown` and name the query that would establish it — do not invent a number |

**Confidence, not promise.** Every key result carries a confidence level. A strategy is a
portfolio of bets and some of them are meant to fail cheaply; a roadmap that reports every line at
high confidence is reporting a wish, not a portfolio. Use `high` / `medium` / `low`, and state the
reason for anything above `low`.

**Insight sourcing gate.** A problem whose insight column is empty does not convert. It moves to
step 5. Constitution Article IV — No Invention — applies here as it does to specs: an unsourced
insight is deleted, not defended.

Also apply the decision test: an observation becomes an insight only when it changes what you
would do. "Enterprises want more governance" changes nothing — everyone wants governance. An
observation that survives the sourcing gate but fails the decision test is recorded as a `trend`,
not an insight, and cannot carry a problem on its own.

### Step 5 — Remove what has nothing behind it

Items with no stated problem come off the roadmap. Not deferred, not "phase 2" — removed, with the
condition for readmission stated so the removal is a decision rather than a rejection.

| Removed item | Requested by | Why removed | Readmission condition |
|---|---|---|---|
| {line} | {requester} | No stated problem / no insight / no segment | The insight and its source that would put it back |

Removal is the visible half of focus. A conversion that removes nothing has not made a focus
decision — it has reformatted one.

### Step 6 — Name what is deliberately not funded this cycle

Separate from step 5. These are good ideas with real problems behind them that are not being
pursued this cycle. Naming them in writing is what makes focus a subtraction rather than a
preference.

| Declined this cycle | The problem it would solve | Why not now | Revisit when |
|---|---|---|---|

If this table is empty and more than a handful of problems survived step 4, the focus decision has
not been made. Go back and make it, or hand the portfolio question to `*strategy`.

### Step 7 — Check the receiving teams

Outcome key results only work when the owning team can decide the solution. Diagnose from observed
behaviour, not from the org chart label:

| Receives | Measured on | Owns the solution | Model |
|---|---|---|---|
| Specs and estimates | Output | No | Delivery team |
| Prioritized features and dates | Delivery predictability | No | Feature team |
| Problems and outcomes | Outcomes | Yes | Empowered product team |

If the receiving team is a feature team, converting the roadmap changes the document but not the
operating model, and the team will be accountable for a number it has no levers to move. Record
the gap explicitly and route to `squads/products/checklists/empowered-team-checklist.md`. Do not
silently proceed as if the gap were not there.

### Step 8 — Write the artifact and the stakeholder narrative

Create `output_dir` if absent. Write `roadmap-converted-{cycle}.md` containing, in order: the
original roadmap verbatim, the classification table, the commitment register, the problems with
outcome key results and confidence, the removed items with readmission conditions, the deliberately
declined list, and the team model note.

Then write the narrative for the roadmap's consumers. The consumers did not want a dated feature
list; they wanted confidence, and the dated list was the instrument they had. Give them the four
things that hold up:

1. **The vision** — the multi-year frame, unchanged by this cycle
2. **The strategy** — which problems are being pursued now and why
3. **Outcome commitments** — what will change, with confidence levels stated
4. **High-integrity commitments** — the short list of real dates, underwritten by discovery

State plainly that the short list of dates is short *because* those are the dates that can be kept.

## Acceptance Criteria

- Every original roadmap line appears in the output, classified into exactly one of the three
  buckets, with nothing quietly dropped.
- Every claimed high-integrity commitment passed the four-part obligation test, or was reclassified;
  commitments kept without discovery are marked `commitment at risk` with the feasibility risk routed.
- Every converted problem states the problem, the named segment, the insight, and the insight's
  source. Unsourced problems were removed, not softened.
- Every key result is movable rather than completable, has a baseline or an explicit
  `baseline: unknown`, and names a number the owning team can influence through the product.
- Every key result carries a confidence level.
- Removed items are listed with the requester and a stated readmission condition.
- Deliberately declined problems are named in writing, separately from removed items.
- The receiving team model is diagnosed from observed behaviour, and any empowerment gap is recorded.
- Genuine dated obligations survive the conversion as dated commitments and were not converted
  into outcomes.
- The artifact and the stakeholder narrative are versioned files in the repository, not slides.
- No epic, PRD, story, implementation plan or code was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` (`*strategy`) | The conversion exposed a portfolio focus question rather than a per-line question |
| `@product-strategist` (`*risk-assess`) | A retained problem needs its four risks named and owned before it proceeds |
| `@discovery-lead` | A converted problem needs an opportunity solution tree, interview cadence or assumption tests |
| `@jobs-analyst` | A removed item might return if the causal job behind a switch were formalized |
| `@positioning-lead` | The conversion changes what the product claims in the market |
| `@pricing-strategist` | A commitment or problem turns on packaging or willingness to pay |
| `@experimentation-lead` | An outcome key result needs an instrumented measure or a baseline query |
| `@architect` | A high-integrity commitment carries an unretired feasibility risk |
| `@products-chief` | The roadmap owner and the squad disagree on a classification and it needs arbitration |
| `@pm` | A converted problem is evidenced and ready to become an epic and a PRD |
| `@po` | The conversion changes priorities and the backlog and epic context need updating |
| `@sm` | Never directly from here — stories are drafted only after `@pm` has framed the epic |
| `@dev`, `@qa` | Never from here — this task does not implement or test code |
| `@devops` | Never from here — git push, PRs, MCP and CI/CD are `@devops` exclusive authority |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018) — the
  critique of the feature roadmap and its two embedded assumptions, the replacement by problems to
  solve with outcomes attached, and the high-integrity commitment as the mechanism that preserves
  genuine dated obligations.
- Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020) —
  product strategy as focus, insights, action and management; team objectives proposed by teams
  and aligned by leadership; the distinction between feature teams and empowered product teams
  that determines whether an outcome can be owned at all.
- John Doerr, *Measure What Matters* (2018) and Christina Wodtke, *Radical Focus* (2016) —
  objective and key result practice, and the stating of confidence rather than promise.

`@product-strategist` (Lodestar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/product-strategist.md`
- Templates: `squads/products/templates/team-objectives-tmpl.yaml`,
  `squads/products/templates/product-strategy-tmpl.yaml`
- Method reference: `squads/products/data/product-operating-model-reference.md`
- Portfolio-level strategy: `squads/products/tasks/draft-product-strategy.md`
- Four-risk assessment: `squads/products/tasks/assess-product-risks.md`
- Team model gate: `squads/products/checklists/empowered-team-checklist.md`
- Elicitation techniques: `.aexos-core/development/tasks/advanced-elicitation.md`
