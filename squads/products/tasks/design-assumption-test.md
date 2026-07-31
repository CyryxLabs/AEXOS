---
task: Design an Assumption Test
responsavel: "@discovery-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - assumption: The single assumption to be tested, stated as something that must be true (required)
  - solution: The solution the assumption belongs to, and the opportunity that solution serves (required)
  - assumption_map: Path to the importance x evidence map the assumption was classified on (required)
  - solution_cost_estimate: Rough build cost of the solution in person-days or person-weeks (required)
  - target_segment: Who the assumption must hold true for (optional, default: the screener from the cadence plan)
  - recruiting_channel: Where test participants or traffic come from (optional, default: the cadence recruiting hook)
  - output_dir: Directory for discovery artifacts (optional, default: docs/product/discovery/)
Saida: |
  - test_plan: Versioned markdown file with the assumption, method, threshold, sample, duration and cost ratio, written and committed BEFORE the test runs
  - pass_threshold: The pre-declared numeric or categorical criterion that separates pass from fail, plus the action on each side
  - cost_ratio: Test cost against solution cost, with the order-of-magnitude check result
  - result_record: The observed result against the threshold, the verdict, and the decision taken
  - routed_assumptions: Assumptions from the same map that belong to another agent, with the destination
Checklist:
  - "[ ] Confirm the assumption is a single leap-of-faith assumption: high importance, low evidence"
  - "[ ] Confirm the assumption is stated as a falsifiable claim, not a question or a feature"
  - "[ ] Route viability, feasibility and ethical assumptions to their owners instead of testing them here"
  - "[ ] Select the smallest method that could change the team's mind"
  - "[ ] Declare the pass threshold and the action on each side BEFORE the test runs"
  - "[ ] Verify the order-of-magnitude cost ratio against the solution"
  - "[ ] Define the sample, the recruiting source and the duration"
  - "[ ] Commit the test plan before the first participant is run"
  - "[ ] Record the observed result against the unchanged threshold"
  - "[ ] Record the decision taken and the next step, without renegotiating the threshold"
---

# *design-assumption-test — Design the Smallest Test for One Leap-of-Faith Assumption

Materializes `@discovery-lead *design-assumption-test {assumption}`.

## Purpose

Design the smallest thing that could change the team's mind about one assumption, with the pass
criterion declared before the test runs. The principle applied here is simulate before you build:
an assumption test that requires building the solution has answered nothing that shipping would
not have answered, more slowly and with the same cost.

Two failures this task exists to block, both classified critical or high in the agent's
anti-pattern list:

- **Threshold declared after the result.** Run the test, see the number, then decide what counts
  as success. This guarantees a pass and produces no information.
- **The test that is a build.** Shipping the feature to a slice of traffic and calling it a test.
  That is delivery with extra steps.

This task tests one assumption. It does not map assumptions, compare solutions, run statistical
experiments, write stories, or frame epics.

## Preconditions

1. An assumption map exists and this assumption is classified leap-of-faith on it — high
   importance, low evidence. If the map does not exist, run `*map-assumptions` first. Testing an
   unclassified assumption tests whatever felt interesting, which is theatre.
2. The solution the assumption belongs to has been compared against at least two other candidate
   solutions for the same target opportunity. A solution evaluated alone always clears the bar,
   and testing its assumptions does not repair that.
3. A rough build cost for the solution exists. Without it the order-of-magnitude check in Step 4
   cannot be performed, and that check is what separates a test from a build.
4. The opportunity the solution serves traces to at least one interview snapshot. An assumption
   test attached to an unevidenced opportunity is a well-run test of an invented problem —
   Constitution Article IV, No Invention.

## Procedure

### Step 0 — Confirm this assumption is worth a test

Check the assumption against the classification it was given:

| Importance | Evidence | Class | Action |
|---|---|---|---|
| High | Low | Leap-of-faith | Test now, threshold first — this task continues |
| High | High | Supported | Proceed and cite the evidence source; stop this task |
| Low | Low | Noise | Ignore unless scope changes; stop this task |
| Low | High | Settled | Ignore entirely; stop this task |

Then check the form of the statement. A testable assumption is a claim that could be false:

- Good: "Users can predict what a template will do from a static preview alone."
- Bad, it is a question: "Will users understand the preview?"
- Bad, it is a feature: "We need a preview screen."
- Bad, it is two assumptions: "Users want a preview and will pay more for it." Split it — one
  test, one assumption. Compound assumptions produce results nobody can act on, because a failure
  does not say which half failed.

### Step 1 — Route what is not yours

Assumptions decompose into five categories, and only two of them are tested by this task.

| Category | Question | Owner |
|---|---|---|
| Desirability | Do they want it? | This task — interview, unmoderated task, landing page, fake door with debrief |
| Usability | Can they use it? | This task — unmoderated task, prototype walkthrough; escalate to `@ux-design-expert` when prototype fidelity beyond a mockup is required |
| Feasibility | Can we build it? | `@architect` — technical spike. Do not simulate this one; ask the people who would build it |
| Viability | Does it work for the business? | `@pricing-strategist` when it is willingness-to-pay; `@product-strategist` when it is portfolio or model fit |
| Ethical | Should we build it? | `@products-chief` — above the trio, and not settled by a sample of eight |

Record the routed assumptions and their destinations in `routed_assumptions`. Routing is part of
the output, not an aside — an untested feasibility assumption that nobody was told about is the
one that surfaces during implementation.

If the assumption needs statistical design, a power calculation, guardrail metrics or live
traffic, it is an experiment rather than an assumption test: route it to
`@experimentation-lead` and stop here.

### Step 2 — Select the method

Pick the smallest method whose result could plausibly change the team's decision. Read the
when-NOT-to-use column before the when-to-use column; it eliminates faster.

| Method | Use when | Do NOT use when |
|---|---|---|
| Story-based interview | The assumption is about behaviour that has already happened somewhere | The assumption is about a behaviour nobody has had the chance to perform yet — you will collect predictions |
| Unmoderated task with a static prototype | The assumption is about comprehension, findability or first-run interpretation | The assumption depends on real data, real stakes or a real account state the prototype cannot fake |
| One-question survey to a targeted segment | You need one factual detail about current behaviour across many people | The question is "would you" or "how much would you pay" — that is a prediction, not a measurement |
| Concierge or Wizard of Oz run | The assumption is about whether the value lands when the work is done for them | You would need to run it at a scale you cannot staff, or the manual delivery misrepresents what the product would do |
| Fake door with an honest debrief screen | The assumption is about intent to engage at the moment of a real decision | You cannot debrief honestly, or clicks would be read as validated demand rather than as attention |
| Data mining of existing behaviour | The behaviour already occurs in your product or logs and the signal is already there | The data measures a proxy you have not validated, or the population that generated it differs from the target segment |
| Technical spike | Feasibility is the risk | Route it — the spike belongs to `@architect`, not to this task |

Prefer the method that reuses evidence you already hold. If a filed snapshot or existing log data
already answers the assumption, the assumption was not low-evidence — return to the map and
reclassify it rather than running a test to confirm what is known.

Record: the method, exactly what the participant sees or does, exactly what is measured, and what
the team would do differently depending on the answer. If nothing would be done differently either
way, cancel the test — it is not decision-relevant.

### Step 3 — Declare the pass threshold, before running

Write the threshold now, in the plan, and commit the plan before the first participant runs. This
is the ordering the task enforces; it is not a formality.

Record all four:

- **Threshold.** A number and a comparison, or an explicit categorical criterion. "6 of 8
  participants select a template AND describe its behaviour accurately, judged against a rubric
  written now." Not "most participants get it."
- **How the measure is judged.** Who scores it, against what rubric, and what counts as
  ambiguous. Write the rubric before seeing responses, or the rubric becomes a description of the
  responses.
- **Action on pass.** The specific next step. Usually: proceed to the next leap-of-faith
  assumption, or package for `@pm`.
- **Action on fail.** The specific next step. Usually: return to the comparison set and test the
  next-best solution. "We would look into it" is not an action and means the test was never going
  to change anything.

Also record the **stop rule**: what would make you abandon the test mid-run, such as the sample
turning out not to match the screener. Deciding this in advance stops a broken run from being
salvaged into a result.

Sample sizes at this scale detect obvious signal, not small differences. State that limitation in
the plan. If the decision depends on a small difference, this is the wrong instrument — route to
`@experimentation-lead`.

### Step 4 — Verify the cost ratio

The test must be cheaper than the solution by an order of magnitude. This is the check that
distinguishes a test from a build.

| Quantity | Value |
|---|---|
| Solution build cost (from `solution_cost_estimate`) | |
| Test cost, all-in: design, recruiting, running, analysis | |
| Ratio | |
| Order-of-magnitude check | pass / fail |

If the ratio fails, do not approve the test on the grounds that the solution is small. The
question is never effort in absolute terms, it is the ratio. A small solution deserves a smaller
test. Shrink it:

- Cut the sample to the smallest that could still change your mind.
- Drop fidelity: static beats interactive, mockup beats prototype, prototype beats code.
- Test one assumption instead of three.
- Substitute a method further up the table.
- Look for the signal in data you already have.

If it cannot be shrunk past the threshold, record that finding and say so plainly: this assumption
cannot be tested more cheaply than building, so the decision is a judgement call made with the
evidence in hand — not a validated one. Do not launder a build as a test.

### Step 5 — Define sample and duration

| Element | Decision to record |
|---|---|
| Sample size | The smallest number that could change the team's mind, with the reason for that number |
| Screener | The criteria a participant must meet to be relevant to this assumption, not to the product in general |
| Recruiting source | The cadence recruiting hook, or a named alternative — plus the bias that source introduces |
| Exclusions | Who is deliberately not in the sample, and why |
| Duration | A fixed window with a start and an end date, decided now |
| Owner | Who runs it and who analyses it |

Fix the duration before starting. A test that runs "until we have enough" runs until the numbers
look acceptable, which is the threshold problem wearing a schedule.

Name the sample's bias explicitly. Recruiting only from a support queue reaches the frustrated;
recruiting only from an in-product prompt reaches the users who got far enough to see it. This
does not invalidate the test, but it bounds the claim, and the bound belongs in the plan.

### Step 6 — Write and commit the test plan

Create `output_dir` if absent. Write `assumption-test-{assumption-slug}.md` **before running the
test**:

```markdown
# Assumption Test — {assumption-slug}

**Date planned:** {YYYY-MM-DD}
**Outcome:** {outcome with baseline and target}
**Target opportunity:** {opportunity, in the customer's language} [{snapshot ids}]
**Solution under test:** {solution} — compared against {other candidates}
**Assumption:** {falsifiable claim}
**Category:** desirability | usability
**Class:** leap-of-faith (importance: high, evidence: low) — from {assumption_map path}

## Method
{method, what the participant sees or does, what is measured}

## Pass threshold — DECLARED BEFORE RUNNING
**Threshold:** {number and comparison, or categorical criterion}
**Judged by:** {who, against what rubric}
**On pass:** {specific next step}
**On fail:** {specific next step}
**Stop rule:** {what aborts the run}

## Sample
| Element | Value |
|---|---|
| Size | |
| Screener | |
| Source | |
| Known bias | |
| Exclusions | |
| Duration | {start} to {end} |
| Owner | |

## Cost ratio
| Quantity | Value |
|---|---|
| Solution build cost | |
| Test cost | |
| Ratio | |
| Order-of-magnitude check | pass / fail |

## Routed assumptions
| Assumption | Category | Routed to | Reason |
|---|---|---|---|

## Result — filled in AFTER the run
**Observed:** {measurement}
**Threshold was:** {restated verbatim from above, unchanged}
**Verdict:** pass | fail | inconclusive — stop rule triggered
**Decision taken:** {what the team did}
**Next:** {next assumption, next solution, or handoff to @pm}
```

Commit this file before the first participant runs. The commit timestamp is the audit trail for
the threshold's ordering — it is what makes "declared before" checkable rather than asserted.

### Step 7 — Run, then record against the unchanged threshold

Run the test as specified. Then fill in the Result section.

Restate the threshold verbatim from the plan next to the observation. Do not edit the threshold,
soften it, or add a qualifier that was not there. A missed threshold is a result — it says this
solution does not clear the bar for this opportunity, which is exactly what the test was built to
find out.

Three legitimate verdicts:

- **Pass.** The observation meets the threshold. Take the pass action. Note what the sample size
  does and does not license you to claim.
- **Fail.** The observation misses the threshold. Take the fail action — usually returning to the
  comparison set. Record the assumption as tested and disconfirmed so it is not re-litigated in
  three weeks.
- **Inconclusive.** The stop rule triggered, or the run did not execute as designed. Record why,
  and redesign. "Inconclusive" is not a soft pass and does not license proceeding.

If the result surprises the team, the correct response is a new interview or a new test, not a
new threshold.

### Step 8 — Close the loop

State the next step explicitly: the next leap-of-faith assumption on the same solution, the next
solution in the comparison set, or the handoff to `@pm` for epic framing when every leap-of-faith
assumption on the chosen solution has been tested.

Discovery does not stop here. Record the next weekly touchpoint date, because the loop runs while
delivery runs.

## Acceptance Criteria

- Exactly one assumption is under test, stated as a falsifiable claim.
- The assumption is classified leap-of-faith on a named assumption map — high importance, low
  evidence.
- Viability, feasibility and ethical assumptions were routed to their owners and recorded, not
  tested here.
- The method simulates rather than builds, and the reason it was chosen over the alternatives is
  recorded.
- The pass threshold, its rubric, the action on pass, the action on fail and the stop rule were
  written and committed before the test ran.
- The cost ratio against the solution is recorded and the order-of-magnitude check is explicit —
  including when it fails and the test was shrunk or the finding stated plainly.
- The sample, its screener, its known bias, its exclusions and a fixed duration are recorded.
- The result is recorded against the threshold restated verbatim and unchanged.
- The decision taken is recorded, with a named next step.
- No story, epic, PRD, implementation or statistical experiment was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@architect` | The assumption is feasibility and needs a technical spike |
| `@ux-design-expert` | The usability assumption needs prototype fidelity beyond a static mockup |
| `@pricing-strategist` | The assumption is really willingness to pay, value metric or packaging |
| `@product-strategist` | The viability assumption is about portfolio fit or business model, not price |
| `@experimentation-lead` | The assumption needs statistical design, power, guardrails or live traffic |
| `@products-chief` | The assumption is ethical, or the result contradicts the squad's direction |
| `@jobs-analyst` | The test surfaced a switching story and the causal job needs formalizing |
| `@positioning-lead` | Participants consistently framed the product in a category it is not positioned in |
| `@pm` | Every leap-of-faith assumption on the chosen solution passed, and it is ready for epic framing |
| `@sm` | Epic framing is done and stories need drafting from the discovery brief |
| `@dev` | Implementation — this squad decides what to build, it does not build it |
| `@qa` | Testing of shipped code, as distinct from testing an assumption |
| `@devops` | Committing and pushing the test plan and result to remote — exclusive authority, no exceptions |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- David J. Bland and Alexander Osterwalder, *Testing Business Ideas* (2019) — the assumption test
  library, the desirability / viability / feasibility categories, and importance-by-evidence
  prioritization.
- Teresa Torres, *Continuous Discovery Habits: Discover Products that Create Customer Value and
  Business Value* (2021) — assumption mapping under solutions on the opportunity solution tree,
  simulate before you build, declaring the pass threshold before running the test, testing the
  assumption rather than the solution, and comparing at least three solutions before testing one.
- Marty Cagan, *INSPIRED*, 2nd edition (2018) and Marty Cagan with Chris Jones, *EMPOWERED*
  (2020) — the product risk categories and the discovery-versus-delivery distinction.
- Tomer Sharon, *Validating Product Ideas: Through Lean User Research* (2016) — lean research
  operations, recruiting and question quality for small fast studies.

`@discovery-lead` (Sonar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Assumption map template: `squads/products/templates/assumption-map-tmpl.yaml`
- Tree the solution hangs from: `squads/products/tasks/build-opportunity-tree.md`
- Cadence that supplies participants: `squads/products/tasks/run-interview-cadence.md`
- Method reference: `squads/products/data/continuous-discovery-reference.md`
- Habit health gate: `squads/products/checklists/continuous-discovery-checklist.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
