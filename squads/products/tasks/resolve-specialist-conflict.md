---
task: Resolve Specialist Conflict
responsavel: "@products-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - artifact_a: Path to the first contradictory specialist artifact, with its owning agent id (required)
  - artifact_b: Path to the second contradictory specialist artifact, with its owning agent id (required)
  - decision_at_stake: The decision that cannot be made while the two artifacts disagree (required)
  - initiative: The initiative both artifacts belong to (required — two artifacts about different initiatives are not in conflict)
  - output_dir: Directory for the arbitration record (optional, default: docs/product/arbitration/)
Saida: |
  - arbitration_record: Versioned markdown file with the contradiction in plain terms, the unshared assumption, the evidence table, the rule applied, and the outcome
  - unshared_assumption: The single assumption the two specialists do not share, stated explicitly
  - outcome: One of EVIDENCE_WINS | SEGMENT_SPLIT | ESCALATE_AND_TEST | TEST_SPECIFICATION | VALUES_DECISION
  - test_specification: Design of the deciding test, when the outcome is ESCALATE_AND_TEST or TEST_SPECIFICATION
  - revision_routing: Which artifact must be revised, by which specialist, and by when
Checklist:
  - "[ ] Confirm both artifacts address the same initiative and the same decision"
  - "[ ] State the contradiction in plain terms before any arbitration begins"
  - "[ ] Name the single assumption the two specialists do not share"
  - "[ ] Tabulate each side's assumed buyer or population, evidence, and comparison basis"
  - "[ ] Audit each side's evidence for checkability — named, dated, retrievable, population defined"
  - "[ ] Check whether the disagreement is about values rather than facts"
  - "[ ] Apply exactly one arbitration rule and name it"
  - "[ ] Confirm no averaged, hybrid or split-the-difference position was produced"
  - "[ ] Specify the deciding test when evidence does not settle it"
  - "[ ] Route the losing or superseded artifact for revision — never quietly keep it"
  - "[ ] Write the arbitration record to the repository"
---

# *conflict-resolve — Arbitrate Two Contradictory Specialist Artifacts

Materializes `@products-chief *conflict-resolve {artifact-a} {artifact-b}`.

## Purpose

Two specialists disagreeing is not a framework failure. It is the squad doing its job: a single
agent producing one confident answer would have hidden the same disagreement inside its own
reasoning. Almost always the disagreement is not about the conclusion at all — it is about an
assumption neither side stated.

This task finds that assumption, states the contradiction in plain terms, weighs named evidence,
and produces one of five outcomes. It never produces a compromise.

This task does not produce positioning, pricing, strategy, job, discovery or experiment content.
When the arbitration ends in a revision, the revision is done by the specialist who owns the
artifact.

## Preconditions

1. Both artifacts exist as files in the repository and address the **same initiative**. Two
   artifacts about different initiatives are not in conflict; record `not a conflict — different
   initiatives` and stop.
2. The decision at stake is named. A contradiction with no decision behind it is a note, not an
   arbitration; record it and stop.
3. Both artifacts are current. If one has been superseded by a newer revision, this is not an
   arbitration — it is a stale artifact. Route it to
   `squads/products/tasks/coherence-review.md` instead.
4. If more than two artifacts disagree, run `*coherence-check` first. Arbitration takes two
   positions at a time; a three-way disagreement is usually a chain break, not a conflict.

## Procedure

### Step 1 — Capture both positions verbatim

Record, without editing or harmonising the wording:

| | Side A | Side B |
|---|---|---|
| Artifact path | | |
| Owning specialist | | |
| Date last revised | | |
| Recommendation, verbatim | | |
| Chain link it belongs to | | |

Quote the recommendations. Paraphrasing at this step is how a real disagreement becomes an
apparent misunderstanding, and vice versa.

### Step 2 — State the contradiction in plain terms

Before arbitrating anything, write one or two sentences that both specialists would recognise as a
fair statement of the disagreement, using no methodology vocabulary from either side.

Format:

> **Conflict:** {specialist A} recommends {A's position}. {specialist B} recommends {B's
> position}. They cannot both be implemented because {the concrete incompatibility}.

Then add the line that reframes it:

> **This is not a preference clash.** They do not share an assumption about {the thing}.

If you cannot write the incompatibility clause concretely — if both recommendations could in fact
be implemented together — this is not a conflict. It is two compatible outputs that look
contradictory because they use different vocabulary. Record `not a conflict — compatible outputs`,
propose the canonical vocabulary, and stop.

### Step 3 — Name the unshared assumption

This is the substance of the task. Find the one assumption that, if both sides accepted it, would
collapse the disagreement.

Probe in this order — the first hit is usually the answer:

| Probe | Question | If this is it, expect |
|---|---|---|
| Buyer | Who does each side think signs and owns the budget? | Different buyers with different alternatives |
| Population | Which customers does each side's evidence describe? | A segment split, not a contradiction |
| Alternative | What is each side comparing against — a rival, a spreadsheet, manual work, nothing? | Different frames of reference produce different answers to the same question |
| Time horizon | Is one side optimising this quarter and the other the next two years? | Both right on their own horizon |
| Unit of value | Does value accrue per seat, per workflow, per outcome, per account? | Value metric conflict |
| Success definition | What does each side count as the thing working? | Outcome and measure divergence |

Write the assumption as a single declarative sentence for each side, in the form:
*"{Specialist} assumes {X}."* If you cannot write both sentences, keep probing — an arbitration
that names no unshared assumption has not found the disagreement, only restated it.

### Step 4 — Tabulate the two sides

| | {specialist A} | {specialist B} |
|---|---|---|
| Assumed buyer | | |
| Population the evidence describes | | |
| Evidence: what, how many, when, how gathered | | |
| Alternative compared against | | |
| What would have to be true for this to be right | | |
| What would falsify it | | |

The last two rows are what make the table usable. A position with no falsifier is a belief, and it
loses to any position that can be checked.

### Step 5 — Audit the evidence for checkability

Evidence counts only if all four hold. Mark each side PASS or FAIL per criterion.

| Criterion | Test |
|---|---|
| Named | The source is identified — which accounts, which interviews, which log, which study |
| Retrievable | Someone else could go and look at it now |
| Dated | It is known when it was gathered, and whether the world has moved since |
| Population defined | It is known who it describes, well enough to say who it does not describe |

An assertion with a confident tone and no named source is **not** evidence. Neither is a
recollection of a customer conversation with no record. Downgrade both to "unevidenced" without
comment on the specialist's competence — this is an artifact property, not a person property.

Also record **evidence age**. Evidence about a market that has since changed is named,
retrievable, dated and stale. Flag it rather than silently discounting it.

### Step 6 — Values check

Before applying an arbitration rule, ask whether the disagreement is about facts at all.

Signals that it is a values disagreement:

- Both sides would accept the other's evidence and still recommend the same thing
- The disagreement is about who should bear a cost, who gets excluded, or what the product should
  refuse to do
- One side has raised an ethical objection

If it is a values disagreement, **stop arbitrating**. Evidence does not settle values. Produce
outcome `VALUES_DECISION`, state the choice in plain terms, name both options and their
consequences, and surface it to the human before the decision proceeds. Do not summarise an
ethical objection into a caveat at the end of a document; it goes at the top, as a question.

### Step 7 — Apply exactly one arbitration rule

| Condition | Rule | Outcome code |
|---|---|---|
| One side has named, checkable evidence and the other does not | Evidence wins **this round**. The unevidenced side is not wrong — it is unevidenced. Record what evidence would reopen it. | `EVIDENCE_WINS` |
| Both have evidence, but about different populations | Not a contradiction. This is a segment split, and segment is owned upstream by `product-strategist`. Route upstream. If the answer is "both, in different segments", the question returns to the downstream owner as **two models, not one compromise**. | `SEGMENT_SPLIT` |
| Both have checkable evidence about the same population and it genuinely conflicts | Escalate the assumption, do not pick a side. Design the test that would decide it (step 8). | `ESCALATE_AND_TEST` |
| Neither has checkable evidence | The output is a **test specification, not a decision**. Say so plainly: the squad does not currently know. | `TEST_SPECIFICATION` |
| The disagreement is about values, not facts | Surface as a human decision (step 6). | `VALUES_DECISION` |

Name the rule applied in the record. An arbitration whose rule is not named cannot be audited
later, and the same conflict will be re-litigated from scratch.

### Step 8 — FORBIDDEN BRANCH: do not average

> **Averaging two positions into an unevidenced third is prohibited.**

If the resolution being drafted looks like any of the following, **stop and return to step 7**:

- A hybrid model neither specialist researched
- A midpoint price, a blended segment, a "both audiences" narrative
- "We'll do A now and B later" invented here rather than derived from an artifact
- A recommendation whose source artifact is this arbitration record itself

The reason is arithmetic, not diplomacy: averaging two evidenced positions produces a third
position with **zero** evidence. Two supported claims are traded for one unsupported one, and the
unsupported one now carries the authority of a resolution. It also violates Constitution Article IV
(No Invention) the moment it reaches a consolidated brief, because no specialist artifact supports
it.

**What to do instead**, by case:

| The temptation | The correct move |
|---|---|
| Split the difference on a number | Pick the evidenced side, or specify the test. There is no third number in evidence. |
| Merge two segments into a superset | `SEGMENT_SPLIT` — route to `product-strategist` for the focus decision |
| Combine two value metrics into a hybrid | Two packages, each traced to its own evidence, or a test between them |
| Soften both recommendations until they no longer clash | Restore both verbatim and re-run step 3 — the assumption was never found |

If a hybrid genuinely is the right answer, it is the right answer *as a hypothesis*, and it goes
into the test specification as a third arm — never into the record as a decision.

### Step 9 — Specify the deciding test

Required for `ESCALATE_AND_TEST` and `TEST_SPECIFICATION`. This is a **specification**, not an
executed test — `@products:experimentation-lead` owns statistical design, and
`@products:discovery-lead` owns small qualitative assumption tests before build.

Record:

- **The assumption under test**, in the words from step 3
- **What each side predicts** — the two outcomes must be distinguishable, or the test decides
  nothing
- **The population** the test must draw from, and who it must exclude
- **The cheapest instrument** that can distinguish the predictions: customer interviews, a
  willingness-to-pay conversation, an assumption test, or a controlled experiment — in that order
  of cost
- **The decision rule agreed in advance**: what result sends the decision which way
- **Who owns the test**: `discovery-lead` for small pre-build assumption tests, `jobs-analyst` for
  causal switching evidence, `pricing-strategist` for willingness to pay, `experimentation-lead`
  for live-traffic design and power

A decision rule agreed after the result is not a decision rule.

### Step 10 — Route the revision

Whichever way the arbitration lands, the superseded artifact is **revised, not quietly kept**. Two
artifacts left in the repository saying different things regenerate this conflict in six weeks.

Record: which artifact must change, which specialist owns the change, what specifically must
change, and what happens to the arbitration if it does not (the decision stays blocked).

Where the outcome is `SEGMENT_SPLIT`, the routing goes **upstream first** — to
`@products:product-strategist` for the focus decision — and only then back down to the specialists
whose artifacts depend on it.

### Step 11 — Write the arbitration record

Create `output_dir` if it does not exist. Write
`arbitration-{initiative-slug}-{YYYY-MM-DD}.md`:

```markdown
# Arbitration — {initiative}

**Date:** {YYYY-MM-DD}
**Decision at stake:** {decision}
**Artifacts:** {path A} ({agent A}, {date}) vs {path B} ({agent B}, {date})

## Conflict, in plain terms
{one or two sentences both specialists would accept}

**This is not a preference clash.** They do not share an assumption about {the thing}.

## The unshared assumption
- {specialist A} assumes {X}.
- {specialist B} assumes {Y}.

## The two sides

| | {specialist A} | {specialist B} |
|---|---|---|
| Assumed buyer | | |
| Population the evidence describes | | |
| Evidence | | |
| Alternative compared against | | |
| Would be falsified by | | |

## Evidence audit

| Criterion | {A} | {B} |
|---|---|---|
| Named | PASS/FAIL | PASS/FAIL |
| Retrievable | | |
| Dated (and current) | | |
| Population defined | | |

## Values check
{"facts disagreement" or the values choice, stated as a question for the human}

## Rule applied
**{rule name}** -> outcome `{OUTCOME_CODE}`

## Resolution
{what is decided, or what is explicitly not decided}

## What was NOT done
No position was averaged. {If a hybrid was considered, say so and say where it went — into the
test as a third arm, or nowhere.}

## Deciding test (if applicable)
- Assumption under test:
- Prediction A / Prediction B:
- Population / exclusions:
- Instrument:
- Decision rule agreed in advance:
- Owner:

## Revision routing

| Artifact | Owner | What must change | Blocked decision if it does not |
|---|---|---|---|

## Ethical concerns raised
{stated here, at the top of the consequences, or "none raised"}
```

### Step 12 — Hand off

Activate the specialist named in the revision routing (or `@products:product-strategist` for a
segment split) and pass the record path. Do not paraphrase the arbitration into chat — the record
is the handoff.

## Acceptance Criteria

- The contradiction is stated in plain terms, in language both specialists would accept, before
  any arbitration reasoning appears.
- The unshared assumption is named as a declarative sentence for each side.
- The two-side table is complete, including what would falsify each position.
- Each side's evidence is audited against all four checkability criteria.
- Exactly one arbitration rule is applied, and it is named in the record.
- **No averaged, hybrid, midpoint or split-the-difference position appears anywhere in the
  output.** A hybrid, if considered at all, appears only as an arm of a proposed test.
- Where neither side has checkable evidence, the output is a test specification and is labelled as
  such — not a decision written in softer language.
- A values disagreement is surfaced as a human decision and is not resolved by the arbitration.
- Ethical concerns appear before the consequences, never as a closing caveat.
- The superseded artifact is routed for revision with a named owner.
- The arbitration record exists in the repository as a versioned markdown file.
- No strategy, positioning, pricing, job, discovery or experiment content was produced by this
  task.
- No routing decision overrides Agent Authority: git push, PRs, MCP and CI/CD go to `@devops`;
  story creation goes to `@sm`; story validation and backlog go to `@po`; epics and PRDs go to
  `@pm`.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` | Outcome is `SEGMENT_SPLIT`, or the unshared assumption is about which segment or focus the strategy holds |
| `@jobs-analyst` | The deciding evidence is causal — why customers switch, what they fire, what they hire |
| `@discovery-lead` | The deciding test is a small pre-build assumption test or an interview round |
| `@positioning-lead` | The narrative artifact is the one being revised, or the alternative compared against is the unshared assumption |
| `@pricing-strategist` | The pricing artifact is the one being revised, or the disagreement is about value metric or packaging |
| `@experimentation-lead` | The deciding test needs statistical design, power, guardrails or live-traffic instrumentation |
| `@products-chief` (`*coherence-check`) | A third artifact is implicated, or the conflict turns out to be a chain break |
| `@pm` | The conflict is resolved, the problem is evidenced, and it now needs epic framing |
| `@po` | The resolution changes evidence enough to require backlog reprioritization |
| `@analyst` | The deciding evidence is market or competitive research beyond a squad cycle |
| `@devops` | Git push, PRs, MCP, CI/CD — exclusive authority, no exceptions |

## Method attribution

`@products-chief` (Helm) carries no external product methodology. The arbitration rules, the
unshared-assumption probe and the prohibition on averaging in this task are original AEXOS
orchestration mechanics and are not attributed to any author. The published methods live in the
specialists whose artifacts are being arbitrated, and are attributed in their own agent files and
tasks: Marty Cagan (product-strategist), Teresa Torres (discovery-lead), April Dunford
(positioning-lead), Clayton M. Christensen with Taddy Hall, Karen Dillon and David S. Duncan
(jobs-analyst), Madhavan Ramanujam and Georg Tacke (pricing-strategist), and Ron Kohavi, Diane
Tang and Ya Xu (experimentation-lead).

## Related

- Agent: `squads/products/agents/products-chief.md`
- Squad registry: `squads/products/squad.yaml`
- Sibling task (chain audit): `squads/products/tasks/coherence-review.md`
- Sibling task (routing): `squads/products/tasks/triage-product-request.md`
- Checklist: `squads/products/checklists/coherence-checklist.md` (PRD-CL-011)
- Routing data: `squads/products/data/product-squad-routing.yaml`
