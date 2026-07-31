---
task: Draft Product Strategy
owner: "@product-strategist"
owner_type: agent
atomic_layer: task
Input: |
  - business_outcome: The company objective the product is meant to serve, stated as a number (required)
  - vision_ref: Path to the existing product vision, or the horizon to draft one against (required)
  - evidence_sources: Data queries, discovery snapshots, market sources, technology signals available (required)
  - candidate_problems: The problems currently proposed for this cycle, however many (optional, default: elicit)
  - teams: The teams that would receive the resulting objectives, with their staffing (optional)
  - output_dir: Directory for strategy artifacts (optional, default: docs/product/strategy/)
Output: |
  - strategy_doc: Versioned markdown with focus, insights, action and management, and the declined alternatives named
  - insight_table: Every insight with its named source and the decision it changes
  - focus_decision: The very few chosen problems, plus the good ideas explicitly not funded this cycle
  - risk_register: The dominant product risks per chosen problem, one owner each, and the evidence that retires each
  - revision_condition: The stated evidence that would cause this strategy to be changed
Checklist:
  - "[ ] Confirm the business outcome is a number, not an aspiration"
  - "[ ] Confirm or draft the vision and record its horizon"
  - "[ ] Collect candidate insights and strike every one with no named source"
  - "[ ] Test each surviving insight against the changes-a-decision rule"
  - "[ ] Cut focus to very few problems and name the declined alternatives in writing"
  - "[ ] Assign the four risks per chosen problem, one named owner each"
  - "[ ] Sequence the cheapest disconfirming test first per problem"
  - "[ ] Draft outcome-based objectives and reject key results that can be completed"
  - "[ ] Diagnose the receiving team model from observed behaviour"
  - "[ ] State the condition under which this strategy would be revised"
  - "[ ] Write the strategy artifact to the repository"
---

# *strategy — Build or Critique the Product Strategy

Materializes `@product-strategist *strategy`.

## Purpose

Produce a product strategy that a team can act on: very few problems, chosen from sourced
insights, with the dominant risks named and owned, converted into outcome objectives the owning
team can actually influence. Blocks the two structural failures — a priority inventory presented
as focus, and assertions presented as insights.

This task stops at the evidenced problem. It does not write epics, PRDs, stories or
implementation plans.

## Preconditions

1. `business_outcome` is expressed as a measurable change, not as an aspiration. "Grow revenue"
   fails; "net revenue retention 104% to 115%" passes.
2. Access exists to the data behind the claims — funnel, retention, usage, revenue by segment. If
   not, the strategy can still be drafted, but every unsourced insight will be struck in step 3
   and the focus decision will rest on fewer inputs. Record that limitation explicitly.
3. A target customer segment is named, or the team is willing to name one in step 1.

## Procedure

### Step 1 — Vision and horizon

If `vision_ref` points to an existing vision, read it and record its horizon and target customer.
If it does not, draft one against the given horizon (three to ten years) answering: who it is for,
what changes for them, why it is worth doing, why now.

Apply three tests:

- Does a strong engineer read it and want to work on it?
- Does it describe a future state, or only a superlative?
- Does it survive a strategy change, or is it this year's plan in disguise?

A vision that fails all three is a slogan and does no work. Record the verdict; do not block on it.

### Step 2 — Collect candidate insights

Gather every statement the proposed strategy rests on, from all four classes: quantitative,
qualitative, technology, industry. Collect them as stated, before judging them.

### Step 3 — Source every insight, strike the rest

Build this table. An insight with an empty source column comes out of the strategy — it is not
defended, it is deleted.

| Stated insight | Source | Class | Verdict |
|---|---|---|---|
| {statement} | {data query + date, discovery snapshot id, market source, technology signal} | quantitative / qualitative / technology / industry | insight / assertion / trend |

Then apply the decision test: **an observation becomes an insight only when it changes what you
would do.** "Enterprises want more governance" changes nothing — everyone wants governance.
"Activation drops at the credentials step and 60% of those teams never return" changes where the
next quarter goes.

Constitution Article IV — No Invention — applies here exactly as it does to specs.

### Step 4 — Focus

Focus is a subtraction. From the candidate problems, choose very few — the ones the surviving
insights say move the business outcome most.

Then write the other column: the good ideas being deliberately not funded this cycle, by name. A
strategy that pursues eight priorities has none, and the teams will each pick their own.

| Chosen problem | Insight it rests on | Business outcome it moves |
|---|---|---|

| Declined this cycle | Why not now | Revisit when |
|---|---|---|

### Step 5 — Risks, per chosen problem

For each chosen problem, assess the four product risks, assign one named owner per risk, and
state the evidence that would retire it.

| Risk | Question | Owner | Current evidence | Verdict |
|---|---|---|---|---|
| Value | Will they buy it, or choose to use it? | Product manager | | |
| Usability | Can they figure out how to use it? | Product designer | | |
| Feasibility | Can our engineers build it with the time, skills and technology we have? | Tech lead | | |
| Business viability | Does it work for sales, marketing, finance, legal, privacy, security? | Product manager | | |

Then sequence: **the cheapest disconfirming test first.** A negative feasibility answer makes the
value evidence irrelevant, so it runs before the value work, not after it.

An initiative that cannot be classified against any of the four risks is not a proposal yet; it
is a wish. Send it back.

### Step 6 — Action: objectives

Convert each chosen problem into a team objective with outcome key results. Apply the quality
test to every key result:

| Key result shape | Verdict |
|---|---|
| Can be marked complete ("launch X", "migrate to Y") | Deliverable — rewrite |
| Names a release or a date | Output — rewrite |
| Moves a number the team can influence through the product | Keep |
| Moves a number the team cannot influence | Belongs to leadership — decompose |

Teams propose, leaders align and negotiate. Each key result carries a confidence level, not a
promise — a strategy is a portfolio of bets and some are meant to fail cheaply.

Genuine dated obligations — contracts, regulatory deadlines, partner launches — stay as
high-integrity commitments and are recorded as such, not converted into outcomes.

### Step 7 — Team model check

Diagnose the receiving teams from observed behaviour, not from the org chart label.

| Receives | Measured on | Owns the solution | Model |
|---|---|---|---|
| Specs and estimates | Output | No | Delivery team |
| Prioritized features and dates | Delivery predictability | No | Feature team |
| Problems and outcomes | Outcomes | Yes | Empowered product team |

Do not give outcome objectives to a team without authority over the solution. If the diagnosis is
feature team, record the gap rather than proceeding as if it were not there — the objective will
otherwise produce reporting overhead and a team accountable for a number it cannot move.

### Step 8 — Management and revision condition

State how outcome progress will be tracked, who coaches, and who removes obstacles. Then state
the revision condition: **what evidence would cause this strategy to change?** A strategy with no
revision condition is unfalsifiable and survives contradicting data indefinitely.

### Step 9 — Write the artifact

Create `output_dir` if absent. Write `product-strategy-{cycle}.md` containing, in order: vision
reference and horizon, the insight table with sources, the focus decision with declined
alternatives, the risk register per chosen problem, the objectives with confidence levels, the
team model diagnosis, the management approach, and the revision condition.

## Acceptance Criteria

- Every insight in the artifact cites a data query, customer evidence, market source or
  technology shift. Unsourced statements were struck, not softened.
- Focus names very few problems and lists the declined alternatives explicitly in writing.
- Each chosen problem has its dominant risks named with one owner per risk, and the cheapest
  disconfirming test is sequenced first.
- No key result can be marked complete rather than moved.
- The receiving team model is diagnosed from observed behaviour, and any empowerment gap is
  documented with named owners.
- Genuine dated obligations are preserved as high-integrity commitments rather than converted
  into outcomes.
- A revision condition is stated.
- The artifact is a versioned file in the repository, not a deck.
- No epic, PRD, story or implementation plan was produced.

## Handoff

| Destination | Condition |
|---|---|
| `@discovery-lead` | A problem is chosen and needs an opportunity solution tree, interview cadence and assumption tests |
| `@jobs-analyst` | An insight depends on why customers switch and the causal job must be formalized |
| `@positioning-lead` | The strategy implies a category change or the market narrative must follow the bet |
| `@pricing-strategist` | A business viability risk is really a willingness-to-pay or packaging question |
| `@experimentation-lead` | An outcome key result needs an instrumented measure or a live traffic experiment |
| `@products-chief` | Two specialists give conflicting direction, or the decision needs squad-level arbitration |
| `@pm` | The problem is evidenced and ready to become an epic and a PRD |
| `@po` | The strategy change requires backlog reprioritization and epic context updates |
| `@architect` | A feasibility risk requires a technical spike or an architecture decision |
| `@ux-design-expert` | A usability risk requires prototype fidelity to retire |
| `@analyst` | Market or competitive insight requires research beyond the strategy cycle |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018) — the
  four product risks, discovery versus delivery, feature-roadmap critique, high-integrity
  commitments.
- Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020) —
  product strategy as focus, insights, action and management; empowered product teams versus
  feature teams; team objectives.
- Marty Cagan, *TRANSFORMED: Moving to the Product Operating Model* (2024) — the three dimensions
  of the product operating model.
- John Doerr, *Measure What Matters* (2018) and Christina Wodtke, *Radical Focus* (2016) —
  objective and key result practice, confidence levels.

`@product-strategist` (Lodestar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/product-strategist.md`
- Elicitation for vision, principles and objectives: `.aexos-core/development/tasks/advanced-elicitation.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
- Market insight input: `.aexos-core/product/templates/market-research-tmpl.yaml`
- Problem framing input: `.aexos-core/product/templates/project-brief-tmpl.yaml`
