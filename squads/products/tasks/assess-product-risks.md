---
task: Assess Product Risks
owner: "@product-strategist"
owner_type: agent
atomic_layer: task
Input: |
  - initiative: The proposed initiative, stated as the proposer stated it, verbatim (required)
  - proposer: Who is proposing it and the decision this assessment must unblock (required)
  - target_segment: The named customer segment the initiative is meant to serve (required)
  - outcome: The business or customer outcome the initiative is supposed to move (required)
  - existing_evidence: Data queries, discovery snapshots, spikes, stakeholder reads already available (optional, default: none)
  - team: The team that would own the initiative, with its trio staffing (optional, default: elicit)
  - constraints: Deadline, contractual obligation, regulatory driver, or budget ceiling (optional, default: none)
  - output_dir: Directory for risk assessments (optional, default: docs/product/risks/)
Output: |
  - risk_assessment: Versioned markdown file with the four risks classified, owned, evidenced and verdicted
  - dominant_risk: The single risk whose negative answer makes the other three irrelevant
  - test_sequence: Ordered list of tests, cheapest disconfirming test first, each with owner, cost and stop rule
  - routing: The agent that retires each unaddressed risk, with the input it needs
  - proceed_verdict: proceed / hold pending named test / send back as not-yet-a-proposal
Checklist:
  - "[ ] Capture the initiative verbatim and name the decision it must unblock"
  - "[ ] Confirm a named target segment and a stated outcome, or stop"
  - "[ ] Restate the initiative as a solution and name the problem it claims to solve"
  - "[ ] Classify against all four risks — value, usability, feasibility, business viability"
  - "[ ] Assign exactly one named owner role per risk"
  - "[ ] Record the current evidence per risk, with source and date, or record none"
  - "[ ] State the evidence that would retire each risk"
  - "[ ] Name the dominant risk and justify why it dominates"
  - "[ ] Sequence the cheapest disconfirming test first, with a stop rule per test"
  - "[ ] Route each unretired risk to the agent that retires it"
  - "[ ] Reject the initiative as a wish if it classifies against none of the four risks"
  - "[ ] Write the risk assessment to the repository"
---

# *risk-assess — Assess an Initiative Against the Four Product Risks

Materializes `@product-strategist *risk-assess {initiative}`.

## Purpose

Take one proposed initiative and establish, before anyone commits to building it, which of the
four product risks it carries, who owns retiring each one, what evidence exists today, what
evidence would retire it, and in which order the tests should run. The output is a routing and
sequencing decision, not a solution.

The failure this task exists to prevent is the unnamed risk. An unnamed risk is not an absent
risk — it is a risk discovered in delivery, at full cost, when the whole release is the price of
being wrong.

This task assesses one initiative. It does not cut strategy focus across a portfolio — that is
`*strategy` and `squads/products/tasks/draft-product-strategy.md`. It does not run the tests it
sequences; it names who does. It does not write epics, PRDs, stories or implementation plans.

## Preconditions

1. `initiative` exists as a proposal, not as a theme. "Improve collaboration" cannot be assessed;
   "add a shared workspace so teams can co-edit workflow definitions" can. If only the theme
   exists, return it and ask for the proposal.
2. `target_segment` is named. A risk assessment with no segment produces value evidence about
   nobody in particular. If the proposer cannot name one, record `segment: undefined` and stop —
   the initiative is a strategy question, not yet a risk question.
3. `outcome` is stated as something that would move, not as something that would ship. "Shared
   workspaces released" fails; "share-and-reuse rate on new workflows moves from its current
   level" passes.
4. If a strategy artifact exists for the current cycle, it is readable, so this assessment can
   cite the problem and insight the initiative descends from.

## Procedure

### Step 1 — Capture and restate

Record, without editing:

- `initiative` verbatim
- `proposer` and the decision at stake
- `target_segment`, `outcome`, `constraints`
- `existing_evidence` — every artifact already produced, with its date

Then restate the initiative in two lines:

```text
Solution proposed: {what would be built}
Problem it claims to solve: {the customer or business problem, for the named segment}
```

If the second line cannot be written, the initiative has no stated problem. Record that and route
it back to `*strategy` or to `@discovery-lead` for opportunity mapping. Do not assess risks on a
solution with no problem — every risk verdict would be an opinion about a preference.

### Step 2 — Classify against the four risks

Every initiative carries all four risks. The question is never whether a risk is present, it is
how much of it is already retired. Fill this table completely — an empty cell is a finding, not
an omission to be tidied up.

| Risk | Question | Owner role | Current evidence (source + date) | Retired by | Verdict |
|---|---|---|---|---|---|
| Value | Will they buy it, or choose to use it? | Product manager | | Customer interviews and stories, demand tests, prior behaviour data | |
| Usability | Can they figure out how to use it? | Product designer | | Prototype tests, unmoderated tasks, observed first-run behaviour | |
| Feasibility | Can our engineers build it with the time, skills and technology we have? | Tech lead | | Technical spike, feasibility prototype, architecture review | |
| Business viability | Does this work for the other parts of the business — sales, marketing, finance, legal, privacy, security? | Product manager | | Stakeholder reviews, model impact analysis, legal and security read | |

Verdict vocabulary, and nothing else:

| Verdict | Means |
|---|---|
| `retired` | Evidence exists, is named and dated, and answers the risk question for this segment |
| `partially evidenced` | Evidence exists but is indirect, stale, or about a different segment |
| `unaddressed` | No evidence |
| `unaddressed, likely dominant` | No evidence, and a negative answer would make the other risks irrelevant |

Rules:

- **One named owner per risk.** The owner is a role on the team, named as a person where the
  staffing is known. Shared accountability with unnamed owners means nobody addressed the risk.
- **Value and business viability both sit with the product manager.** This is deliberate, not a
  duplication to be split for tidiness.
- **Evidence must carry a source and a date.** "We know customers want this" is not evidence.
  "Four discovery snapshots, dated Jun 4 to Jul 2, mention parallel editing pain" is.
- **Stale evidence is not evidence.** Record the date and let the reader judge; do not silently
  reuse a result from a previous strategy cycle for a different segment.

### Step 3 — Reject what is not a proposal

If the initiative cannot be classified against any of the four risks, it is not a proposal yet, it
is a wish. Record `proceed_verdict: send back` with the reason and stop. Do not manufacture a risk
so the table looks complete.

### Step 4 — Name the dominant risk

Exactly one dominant risk. The dominant risk is the one whose negative answer makes the evidence
on the other three worthless.

Heuristic:

| Signal | Dominant risk is usually |
|---|---|
| The mechanism has never been built on the current architecture | Feasibility |
| The behaviour has never been observed in any segment, only requested | Value |
| The interaction has a genuinely hard state to resolve (conflict, merge, permission) | Usability |
| The initiative touches the pricing model, contractual terms, audit trail, data residency or regulated data | Business viability |
| Two candidates tie | Pick the one whose disconfirming test is cheaper, and record the tie |

Write one sentence justifying the choice. If the justification cannot be written without
speculating, the dominant risk is not yet known — say so, and sequence the two cheapest tests in
parallel instead of pretending to a rank order.

### Step 5 — Sequence the tests, cheapest disconfirming first

The sequencing rule is: **address the dominant risk first, with the cheapest test capable of
disconfirming it.** A negative feasibility answer makes the value evidence irrelevant, so the
spike runs before the interview round, not after it.

"Cheapest disconfirming" means cheapest test that could return a *no*. A test that can only return
encouragement is not a test, it is a demonstration.

| # | Risk | Test | Who runs it | Cost / duration | What a negative result means | Stop rule |
|---|---|---|---|---|---|---|
| 1 | {dominant} | {spike, prototype test, stakeholder read, demand test} | {agent or role} | {days} | {consequence} | {stop the initiative / re-scope / continue with condition} |

Every row needs a stop rule. A sequence with no stop rule is a plan to run every test regardless
of outcome, which is the opposite of retiring risk cheaply.

### Step 6 — Route each unretired risk

Each risk that is not `retired` gets an owner **and** a destination. The owner is accountable; the
destination is who does the work.

| Risk | Destination | Input the destination needs |
|---|---|---|
| Value | `@discovery-lead` for opportunity mapping and assumption tests; `@jobs-analyst` when the question is why customers switch | Segment, outcome, the specific assumption to test |
| Usability | `@ux-design-expert` for prototype fidelity; `@discovery-lead` for the test protocol | The hard state to resolve, the task the user must complete unassisted |
| Feasibility | `@architect` for a spike or architecture decision | The mechanism in question, the current constraint, the time box |
| Business viability | `@pricing-strategist` when it is willingness to pay or packaging; `@positioning-lead` when it is category or narrative; otherwise the product manager with finance, legal, security | The model or policy the initiative would change |
| Outcome measurement | `@experimentation-lead` | The metric, the guardrails, the population |

Routing is not delegation of the decision. The assessment stays owned here until every risk is
`retired` or explicitly accepted with a named accepting party.

### Step 7 — Verdict

One of three, recorded explicitly:

| Verdict | Condition |
|---|---|
| `proceed` | All four risks `retired` or explicitly accepted, with the accepting party named |
| `hold pending {test}` | At least one risk unaddressed; the sequence in step 5 is the condition for revisiting |
| `send back` | No stated problem, no named segment, or classifiable against none of the four risks |

`proceed` is not a decision to build. It is a decision that the initiative may go to `@pm` for
epic framing or to `@discovery-lead` for solution work. Strategy ends where the epic begins.

### Step 8 — Write the artifact

Create `output_dir` if it does not exist. Write `risk-{initiative-slug}-{YYYY-MM-DD}.md` using
`squads/products/templates/risk-assessment-tmpl.yaml`.

Version it in the repository. A risk assessment that lives in a chat thread cannot be checked
later against what actually happened, which is the only way the sequencing rule ever improves.

## Acceptance Criteria

- The initiative is recorded verbatim, and the problem it claims to solve is stated for a named
  segment — or the assessment stopped with `send back`.
- All four risks appear in the table. No risk is omitted because it "obviously does not apply".
- Exactly one named owner role per risk, using the standard assignment: product manager owns value
  and business viability, product designer owns usability, tech lead owns feasibility.
- Every evidence cell carries a source and a date, or the literal word `none`.
- Every risk carries a stated retirement condition — what evidence would close it.
- Exactly one dominant risk is named, with a one-sentence justification, or the absence of a known
  dominant risk is stated explicitly.
- The test sequence starts with the cheapest test capable of disconfirming the dominant risk, and
  every test has a stop rule.
- Each unretired risk routes to a named agent with the input that agent needs.
- The verdict is one of `proceed`, `hold pending {test}`, `send back`.
- The artifact is a versioned file in the repository.
- No epic, PRD, story, implementation plan or code was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@discovery-lead` | Value or usability risk is unaddressed and needs opportunity mapping, assumption tests or prototype testing |
| `@jobs-analyst` | The value risk turns on why customers switch and the causal job must be formalized |
| `@ux-design-expert` | The usability risk requires prototype fidelity to retire |
| `@architect` | The feasibility risk requires a technical spike or an architecture decision |
| `@pricing-strategist` | The business viability risk is really a willingness-to-pay or packaging question |
| `@positioning-lead` | The business viability risk is a category or market-narrative question |
| `@experimentation-lead` | The outcome needs an instrumented measure or a live traffic experiment to read |
| `@products-chief` | Two specialists give conflicting direction, or the verdict needs squad-level arbitration |
| `@pm` | Verdict is `proceed` and the problem is ready for epic framing and a PRD |
| `@po` | The verdict changes priorities and the backlog and epic context need updating |
| `@sm` | Never directly from here — stories are drafted only after `@pm` has framed the epic |
| `@dev`, `@qa` | Never from here — this task does not implement or test code |
| `@devops` | Never from here — git push, PRs, MCP and CI/CD are `@devops` exclusive authority |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018) — the
  four product risks (value, usability, feasibility, business viability), their ownership by
  product manager, product designer and tech lead, and the principle that risks are addressed in
  discovery before build rather than at the end.
- Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020) — the
  empowered product team as the unit that owns the risks, and the trio staffing that makes the
  ownership real.
- Marty Cagan, *TRANSFORMED: Moving to the Product Operating Model* (2024) — risk retirement as
  the "how you solve" dimension of the product operating model.

`@product-strategist` (Lodestar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/product-strategist.md`
- Template: `squads/products/templates/risk-assessment-tmpl.yaml`
- Method reference: `squads/products/data/product-operating-model-reference.md`
- Portfolio-level strategy: `squads/products/tasks/draft-product-strategy.md`
- Roadmap conversion: `squads/products/tasks/convert-feature-roadmap.md`
- Team model gate: `squads/products/checklists/empowered-team-checklist.md`
- Elicitation techniques: `.aexos-core/development/tasks/advanced-elicitation.md`
