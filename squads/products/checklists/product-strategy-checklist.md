# Product Strategy Checklist

**Checklist ID:** PRD-CL-009
**Squad:** products
**Referenced by:** product-strategist (Lodestar)
**Applies to:** a product strategy artifact produced by `*strategy` /
`squads/products/tasks/draft-product-strategy.md` / `squads/products/templates/product-strategy-tmpl.yaml`
**Purpose:** Gate a product strategy before it is adopted or handed to teams. Tests the six things
that make a strategy actionable rather than decorative: focus as a subtraction, insight sourcing,
objective quality, risk ownership, traceability, and revisability. Produces a scored verdict.

[[LLM: INITIALIZATION INSTRUCTIONS — PRODUCT STRATEGY GATE

You are auditing a written strategy artifact, not facilitating a workshop.

EXECUTION APPROACH:
1. Load the strategy artifact and, if referenced, the vision and objectives artifacts.
2. Check each item against what is WRITTEN in the artifact, not against what someone says is true.
   If a claim is not in the artifact, the item fails. "They know this, it's just not written down"
   is a fail — an unwritten strategy cannot be traced, checked or handed off.
3. Mark [x] present and correct, [ ] missing or incorrect, [N/A] genuinely not applicable.
   [N/A] requires a written reason. An [N/A] with no reason counts as [ ].
4. Items marked CRITICAL cap the verdict regardless of score — see Scoring.
5. Count, score, and issue one of the four verdicts.
6. List required fixes in priority order: sourcing first, then focus, then risk ownership.

WHAT THIS AUDIT DOES NOT DO: it does not rewrite the strategy, does not produce epics or stories,
and does not evaluate implementation. It reads and reports.

CONSTITUTION ARTICLE IV — NO INVENTION: section 2 of this checklist is the enforcement point. An
unsourced insight is deleted, not defended. Do not soften an assertion into acceptable language —
that is the failure this gate exists to catch.]]

---

## 1. Focus Is a Subtraction

- [ ] The strategy names a small number of chosen problems (CRITICAL)
- [ ] More than three chosen problems in one cycle fails this item — *AEXOS operating convention; the published guidance is "very few" without fixing a count*
- [ ] Each chosen problem is a PROBLEM, not a solution wearing a problem's clothes
- [ ] Each chosen problem names the segment that has it (not "users", not "the market")
- [ ] The declined alternatives are named in writing, individually (CRITICAL)
- [ ] Each declined alternative states the problem it would have solved, so the decline is a real cost
- [ ] Each declined alternative states a revisit condition
- [ ] The strategy states, explicitly and by name, what this focus is costing
- [ ] No chosen problem was added this cycle without another being removed or declined
- [ ] The chosen set is small enough that a team could name all of it without opening the document

## 2. Insight Sourcing (Constitution Article IV)

- [ ] Every insight in the artifact cites a source (CRITICAL)
- [ ] Each source is one of: a data query with its date, customer evidence with a snapshot id, a named market source, or a named technology shift
- [ ] No source reads "customer feedback", "we know from experience", "industry commentary" or similar unattributable phrasing
- [ ] Every quantitative claim names the query that produced the number
- [ ] No number appears without a baseline date — a metric with no date cannot be re-run
- [ ] Insights struck for lack of source are recorded with a `assertion` verdict, visibly, rather than quietly deleted
- [ ] Each surviving insight passes the decision test: it names the specific decision it changes
- [ ] Sourced statements that change nothing are marked `trend`, not `insight`, and do not carry a chosen problem on their own
- [ ] Evidence about a different segment is not reused as evidence for the chosen segment
- [ ] Limitations on evidence access are recorded explicitly, not omitted

## 3. Objective Quality

- [ ] Every objective descends from a chosen problem in this strategy (CRITICAL)
- [ ] No key result can be marked complete — no "launch", "migrate", "ship", "roll out", "deliver" (CRITICAL)
- [ ] No key result names a release, a scope or a date instead of a change
- [ ] Every key result moves a number the owning team can influence THROUGH THE PRODUCT
- [ ] Key results the team cannot influence are decomposed, not assigned
- [ ] Every key result has a baseline with its query and date, or an explicit `baseline: unknown` plus the query that would establish it
- [ ] No baseline was invented or rounded into existence
- [ ] Every key result carries a confidence level
- [ ] Not every objective sits at high confidence — a portfolio where nothing can fail is not a portfolio
- [ ] Each objective records who proposed it: the team or leadership
- [ ] Objectives assigned top-down are recorded as such rather than presented as team-proposed
- [ ] Rejected key results are kept in the artifact with their failure mode, not silently dropped

## 4. Risk Ownership

- [ ] Each chosen problem has all four risks assessed — value, usability, feasibility, business viability (CRITICAL)
- [ ] No risk was omitted on the grounds that it "obviously does not apply"
- [ ] Exactly one owner per risk, using the fixed assignment: product manager owns value and business viability, product designer owns usability, tech lead owns feasibility
- [ ] No risk is owned by "the team", "shared", or an unnamed role
- [ ] Every evidence cell carries a source and a date, or the literal word `none` — no blank cells
- [ ] Every risk states what evidence would retire it
- [ ] Exactly one dominant risk is named per chosen problem, with a justification — or the absence of a known dominant risk is stated explicitly
- [ ] The test sequence puts the cheapest test capable of DISCONFIRMING the dominant risk first
- [ ] Every test in the sequence has a stop rule
- [ ] Risks accepted without evidence name the accepting party
- [ ] Each unretired risk routes to a named agent with the input that agent needs

## 5. Traceability

- [ ] The strategy references a versioned vision artifact with a stated horizon (CRITICAL)
- [ ] The chain is walkable in both directions: objective -> problem -> insight -> evidence -> vision
- [ ] Every chosen problem links to at least one insight with verdict `insight`
- [ ] No objective exists with no problem behind it
- [ ] No problem exists with no insight behind it
- [ ] Broken links are recorded as findings rather than smoothed over
- [ ] The receiving team model is diagnosed from observed behaviour per team
- [ ] Where the receiving team is a delivery team or a feature team, the gap is documented rather than ignored
- [ ] Genuine dated obligations appear as high-integrity commitments, with counterparty, date, discovery status and consequence — not converted into outcomes
- [ ] The commitments table is not longer than the focus table (if it is, the roadmap returned through the side door)
- [ ] The artifact is a versioned file in the repository, not a deck or a chat thread (CRITICAL)

## 6. Revisability

- [ ] The strategy states a revision condition (CRITICAL)
- [ ] The revision condition is a specific piece of evidence, not a schedule — "reviewed quarterly" fails
- [ ] Each chosen problem states the disconfirming result that would cause it to be dropped
- [ ] Each disconfirming result names how it would be detected — a query, a test, or a signal
- [ ] A portfolio-level condition is stated for re-cutting focus
- [ ] The management section names where outcome progress is published, and its path
- [ ] The management section reports outcome movement and learning, not percentage complete
- [ ] Coaching is recorded with a named coach and a named competency gap
- [ ] Obstacles are recorded with a named owner of removal and a date

## 7. Boundary

- [ ] The artifact contains no epics, PRDs, stories, implementation plans or code
- [ ] Problems ready to proceed are handed to `@pm` for epic framing, never straight to `@sm` for stories (CRITICAL)
- [ ] No push, PR, MCP or CI/CD action is described anywhere in the artifact — that authority is `@devops` exclusive
- [ ] Discovery questions are routed to `@discovery-lead` rather than answered here
- [ ] The handoff table names a destination and a condition for every open thread

---

## Scoring

**Calculation:** (checked items) / (total items - justified N/A items) x 100

| Grade | Score | Interpretation |
|---|---|---|
| A | 90-100% | Adopt. The strategy is actionable and auditable. |
| B | 80-89% | Adopt with the listed fixes applied before teams receive objectives. |
| C | 70-79% | Revise. Structural gaps exist; do not hand objectives to teams yet. |
| D | 60-69% | Revise substantially. The strategy is a document, not a decision. |
| F | Below 60% | Reject. Re-run `*strategy` from the insight layer up. |

**CRITICAL cap:** any unchecked CRITICAL item caps the verdict at **C** regardless of score. Two or
more unchecked CRITICAL items cap it at **F**. The two most common caps in practice are an empty
declined-alternatives table (section 1) and an unsourced insight surviving into the artifact
(section 2).

## Verdict

Record one, with the named reviewer and date:

| Verdict | Condition | Next action |
|---|---|---|
| `ADOPT` | Grade A, no CRITICAL unchecked | Publish; teams may receive objectives |
| `ADOPT WITH FIXES` | Grade B, no CRITICAL unchecked | Apply listed fixes, then publish |
| `REVISE` | Grade C or D, or one CRITICAL unchecked | Return to `*strategy` at the named section |
| `REJECT` | Grade F, or two or more CRITICAL unchecked | Re-run from `*insights`; the evidence layer is the problem |

```text
Verdict:   {ADOPT | ADOPT WITH FIXES | REVISE | REJECT}
Score:     {n}% ({checked}/{applicable})
CRITICAL:  {n} unchecked — {list}
Reviewer:  {name}
Date:      {YYYY-MM-DD}
```

## Priority Fix Order

1. **Insight sourcing (section 2)** — everything downstream inherits the defect. Fix first, always.
2. **Focus (section 1)** — a strategy with no declined alternatives has made no decision.
3. **Risk ownership (section 4)** — unnamed risks become delivery-time surprises at full cost.
4. **Objective quality (section 3)** — completable key results let a team hit everything and move nothing.
5. **Traceability (section 5)** — repairs the chain so the next cycle can be checked against this one.
6. **Revisability (section 6)** — without it the strategy survives contradicting evidence indefinitely.
7. **Boundary (section 7)** — re-route anything that crossed into epic, story, implementation or push territory.

## Method Attribution

- Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020) —
  product strategy as focus, insights, action and management; the failure modes this checklist
  tests for; team objectives proposed by teams and aligned by leadership.
- Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018) — the
  four product risks and their ownership; the feature-roadmap critique; high-integrity commitments.
- Marty Cagan, *TRANSFORMED: Moving to the Product Operating Model* (2024) — the three dimensions
  of the product operating model.
- John Doerr, *Measure What Matters* (2018) and Christina Wodtke, *Radical Focus* (2016) —
  objective and key result practice, and stated confidence.

@product-strategist (Lodestar) is a specialist applying these methods.
