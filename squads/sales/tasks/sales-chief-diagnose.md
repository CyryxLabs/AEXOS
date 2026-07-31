---
task: Diagnose And Route Sales Request
owner: "@sales-chief"
owner_type: agent
atomic_layer: task
Input: |
  - request: The sales question or situation, in the requester's own words (required)
  - deal_or_account: Deal, account or initiative the request concerns (optional, default: unnamed)
  - existing_artifacts: Paths or contents of squad artifacts already produced for this deal (optional)
  - deadline: Date pressure attached to the request, and whose date it is (optional)
Output: |
  - restated_request: The request rewritten in the owning discipline's vocabulary, confirmed with the requester
  - owner: Exactly one specialist id from squads/sales/squad.yaml that owns the request
  - near_misses: The two nearest non-owners, each with the reason it was excluded
  - short_answer: A usable two-minute answer, or an explicit statement that none can be given before the specialist runs
  - handoff_brief: Evidence available, evidence missing, the specific question for the specialist, and the deadline
  - sequence: Ordered specialist list when more than one discipline is genuinely required
  - integrity_flag: Any commercial-integrity concern raised by the request, at the top of the output or absent
  - record_path: Dated triage record written under squads/sales/
Checklist:
  - "[ ] Read the request and restate it in one sentence using the owning discipline's vocabulary"
  - "[ ] Present the restatement to the requester and obtain confirmation before continuing"
  - "[ ] Check the reframe patterns and state any reframe out loud, never silently"
  - "[ ] Screen the request for commercial-integrity risk before producing any routing"
  - "[ ] Select exactly one owning specialist from the routing matrix"
  - "[ ] Name the two nearest misses with the boundary line that excluded each"
  - "[ ] Confirm the request has not left the commercial surface"
  - "[ ] Decide depth: answer directly only if navigational or definitional"
  - "[ ] Produce the short usable answer or state why none can be given yet"
  - "[ ] Write the handoff brief with evidence available, evidence missing and the specialist question"
  - "[ ] Sequence multiple specialists in dependency order when more than one is required"
  - "[ ] Persist the triage record under squads/sales/ with the date"
---

# *diagnose — Triage And Route A Sales Request

Materializes the `*diagnose` command of `@sales-chief` (Vanguard, Tier 0), defined in
`squads/sales/agents/sales-chief.md`.

## Purpose

The most expensive commercial failure is not a weak method. It is the right question answered by
the wrong discipline: a discount decided without a qualification read, a conversation redesigned
when the funnel was the defect, a forecast defended when the stage definition was the defect.

This task takes an incoming sales request in whatever words it arrived in, names the single
discipline that owns it, gives the requester enough of an answer to act today, and hands the
specialist a brief so they do not restart from zero.

This task routes. It does not run any specialist's method.

## Pre-conditions

| Condition | Blocker | Check |
|---|---|---|
| A request exists in the requester's own words | yes | `request` is non-empty |
| The squad manifest is readable | yes | `squads/sales/squad.yaml` exists and lists the five agent ids |
| The requester is available to confirm the restatement | yes | Step 2 requires an answer; do not proceed on assumption |
| Existing artifacts, if any, are readable with their dates | no | Missing artifacts are recorded as missing, not inferred |

## Procedure

### Step 1 — Read the request as given

Record the request verbatim, with who asked it and when. Do not clean it up. The words the
requester used carry the assumption that must be tested in Step 2.

### Step 2 — Restate, and confirm the restatement (elicitation required)

Write the request back in one sentence, using the vocabulary of the discipline you believe owns
it. Present it and ask: *"Is this the question?"*

Do not continue until the requester confirms or corrects. A silent reframe means the requester
takes an answer to a different question as an answer to theirs.

### Step 3 — Apply the reframe patterns

Test the stated request against the known reframes. If it maps to a different owner, say so out
loud with the reason.

| Stated request | Usually owned by | Why |
|---|---|---|
| "How much do we discount?" | qualification-lead, then negotiation-lead | Price pressure on an unqualified deal is a qualification signal, not a negotiation |
| "The forecast keeps slipping" | pipeline-ops, with qualification-lead on stage evidence | Slippage is usually a stage-definition defect |
| "They went dark" | qualification-lead for the champion test, then method-lead | The champion could not sell it internally, or never was one |
| "We need better slides" | method-lead; @products:positioning-lead if the frame of reference is unclear | Slides are downstream of the insight |
| "We keep losing on price" | method-lead for one deal; @products:positioning-lead for a pattern | One deal is a conversation; a pattern is positioning |
| "New reps ramp too slowly" | pipeline-ops | Hiring profile and training formula against the buyer journey |
| "Procurement is stonewalling" | negotiation-lead, with qualification-lead on the decision process | Procurement leverage grows where the process was never mapped |

### Step 4 — Integrity screen, before any routing

Test the request for a presupposed move that fails commercial integrity:

- Does it assume a deadline that is ours and would be presented as theirs?
- Does it assume scarcity, allocation or a competing offer that does not exist?
- Does it assume a capability claim that is roadmap rather than shipped?
- Does it require omitting a known limitation, integration gap, or total cost?
- Does it require the buyer to remain wrong about something in order for the deal to hold?

Any yes **blocks** the request as framed. Do not soften it, do not route it, and do not append it
as a caveat. State the block first, then produce the compliant alternative that pursues the same
legitimate goal by naming our real constraint and asking for theirs. If no legitimate goal
survives the rewrite, say that plainly and stop.

### Step 5 — Select exactly one owner

Choose one specialist. Broadcasting one deal to four specialists produces four partial reads
built on different unstated assumptions and no decision.

| Owner | Owns | Does not own |
|---|---|---|
| `qualification-lead` | Whether the deal is real: metrics, economic buyer, decision criteria, decision process, pain, champion, disqualification | Conversation design, concessions, funnel metrics, price level |
| `method-lead` | The selling conversation: commercial insight, reframe, tailoring, constructive tension, mobilizing consensus | Qualification verdicts, terms, funnel design, market category |
| `negotiation-lead` | What is traded: interests, labels, calibrated questions, concession structure, procurement, walk-away | Whether the deal should exist, the insight that justifies the price, discount policy |
| `pipeline-ops` | Why the funnel behaves as it does: stage definitions, conversion, forecast discipline, hiring, ramp | Individual deal qualification, conversation design, deal-level concessions |

Name the two nearest misses and quote the line above that excluded each.

### Step 6 — Confirm the boundary

The request leaves this squad when it concerns:

- Price level, packaging, value metric, discount policy → `@products:pricing-strategist`
- Market category, competitive alternatives, frame of reference → `@products:positioning-lead`
- Epic framing and PRD → `@pm`; story drafting → `@sm`; validation and backlog → `@po`
- Implementation → `@dev`; quality gates → `@qa`; git push, PRs, CI/CD → `@devops` (exclusive)

A deal that exposes a defect in pricing or positioning produces a finding to route outward. It
never licenses this squad to set a price or a category.

### Step 7 — Decide depth

- Navigational or definitional (who owns what, what a specialist covers, where an artifact lives)
  → answer directly and stop.
- Requires a method or produces an artifact → give the two-minute usable version, then route.
- Requires buyer-side evidence the specialist would gather → route without a partial verdict.

Label the short answer as the short answer. It is right often enough to unblock a call today and
wrong in ways that surface at the end of a quarter.

### Step 8 — Sequence, when more than one discipline is genuinely required

Order by the coherence chain. A specialist whose input is upstream runs first.

```text
fit → pain → insight → economic buyer → decision process → commercial terms → forecast stage
```

| Link | Owner |
|---|---|
| fit, pain | qualification-lead |
| insight | method-lead |
| economic buyer, decision process | qualification-lead |
| commercial terms | negotiation-lead |
| forecast stage | pipeline-ops |

For each step state: the specialist, the input required, the artifact produced, and what gets
rewritten if the step runs out of order. State explicitly which disciplines are **not** being run
this cycle and why.

### Step 9 — Write the handoff brief

The brief contains, in this order:

1. Any integrity flag from Step 4, with the human who must decide.
2. The request as restated and confirmed.
3. The evidence already available, with dates and sources.
4. The evidence missing.
5. The specific question the specialist is being asked to answer.
6. The deadline, and whose deadline it is.

### Step 10 — Persist

Write the triage record under `squads/sales/` with the date in the filename. A routing decision
that exists only in a chat transcript did not happen.

## Acceptance Criteria

- [ ] The restatement was presented and confirmed by the requester before routing
- [ ] Any reframe was stated out loud with its reason
- [ ] The integrity screen ran before routing, and any failure blocked the request as framed
- [ ] Exactly one owning specialist is named
- [ ] Two near misses are named, each with the exclusion reason
- [ ] Boundary checked against the Products Squad and the AEXOS core agents
- [ ] A short usable answer was given, or its absence was explained
- [ ] The handoff brief names evidence available, evidence missing, and the specialist question
- [ ] Multi-specialist work is ordered by the coherence chain, with out-of-order cost stated
- [ ] No qualification verdict, call plan, concession structure or stage model was produced here
- [ ] No price, package, category, story scope or release decision was made
- [ ] The record is written under `squads/sales/` with a date

## Handoff

| To | When |
|---|---|
| `@qualification-lead` | Whether the deal is real, who signs, how they decide, or a disqualification decision |
| `@method-lead` | The buyer does not see the problem; the conversation, insight or reframe is the gap |
| `@negotiation-lead` | The deal is qualified and the next move is commercial |
| `@pipeline-ops` | The pattern spans deals: stages, conversion, forecast, hiring, ramp |
| `@products:pricing-strategist` | Price level, packaging or value metric — as a pattern, not one account |
| `@products:positioning-lead` | Category, competitive alternatives or a missing frame of reference |
| `@pm` | A buyer commitment needs epic framing to enter delivery |
| `@devops` | Git push, PRs, MCP and CI/CD — exclusive authority, no exceptions |

## References

- `squads/sales/agents/sales-chief.md` — agent definition, routing matrix, coherence model
- `squads/sales/squad.yaml` — squad manifest, tiers, agent ids, handoff matrix
- `.claude/CLAUDE.md` — AEXOS project instructions and agent authority
- `.aexos-core/development/tasks/advanced-elicitation.md` — optional accelerant for Step 2
