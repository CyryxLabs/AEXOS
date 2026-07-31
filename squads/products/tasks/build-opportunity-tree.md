---
task: Build Opportunity Solution Tree
responsavel: "@discovery-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - outcome: The measurable product outcome the trio is pursuing, with baseline and target (required)
  - snapshots: Interview snapshots available, each with an id (required, minimum one)
  - trio: The product manager, product designer and engineer who attend the interviews (required)
  - existing_tree: Path to a tree being updated rather than created (optional, default: none)
  - business_outcome: The business outcome the product outcome ladders to (optional, default: elicit)
  - output_dir: Directory for discovery artifacts (optional, default: docs/product/discovery/)
Saida: |
  - tree: Versioned opportunity solution tree with outcome at the root and snapshot provenance per opportunity
  - target_opportunity: Exactly one selected target, with the sizing that justified it
  - structural_report: Result of the single-parent, sibling-distinctness, solution-leakage and provenance checks
  - orphan_list: Opportunities removed for having no snapshot behind them
  - next_touchpoint: The date of the next weekly interview and who is recruiting for it
Checklist:
  - "[ ] Verify the outcome is measurable and influenceable by the trio"
  - "[ ] Ladder the product outcome to a business outcome"
  - "[ ] Extract opportunities from snapshots in the customer's own language"
  - "[ ] Reject every opportunity that names a feature"
  - "[ ] Attach snapshot ids to every opportunity and delete the orphans"
  - "[ ] Verify single parent per opportunity"
  - "[ ] Verify sibling distinctness at each level"
  - "[ ] Size the top-level opportunities on the four criteria"
  - "[ ] Select exactly one target opportunity"
  - "[ ] Write the tree to the repository"
  - "[ ] Schedule the next weekly touchpoint before closing the task"
---

# *map-opportunities — Build or Update the Opportunity Solution Tree

Materializes `@discovery-lead *map-opportunities {outcome}`.

## Purpose

Structure the opportunity space between a measurable product outcome and the solutions a team
might build, so the choice becomes visible — what is being pursued and, more importantly, what is
deliberately not. Every branch carries interview provenance; branches without it are deleted.

This task produces a tree and one target opportunity. It does not compare solutions, design
assumption tests, write stories or frame epics.

## Preconditions

1. At least one interview snapshot exists. A tree built with zero snapshots is a brainstorm and
   violates Constitution Article IV — No Invention. If none exist, stop and run the weekly
   touchpoint first.
2. The trio is named. The three roles that decide together must learn together; a tree built from
   a research summary loses contact with the story.
3. The outcome can be influenced by the trio through the product. If it cannot, it is a business
   outcome needing decomposition — hand it to `@product-strategist` and stop.

## Procedure

### Step 0 — Verify the outcome

Test the given `outcome` against three conditions:

- **Measurable.** It names a number with a baseline and a target.
- **Product-level.** The trio can move it by changing the product.
- **Laddered.** It connects to a stated business outcome.

If it names a thing to build, it is a solution — move it down the tree and ask what number it was
supposed to move. If it names a number the trio cannot influence, escalate to
`@product-strategist` for decomposition and stop this task.

### Step 1 — Read the snapshots

For each snapshot, extract: participant context, the story timeline, verbatim quotes, and the
needs, pains and desires the story exposes. Work from the story, never from the participant's
stated opinion — opinions are invented on the spot, stories are recalled.

### Step 2 — Extract opportunities

Write each opportunity in the customer's language, framed as a need, a pain or a desire, with the
snapshot id attached.

Apply the classification test to everything you are about to place:

| The item names | It is | Where it goes |
|---|---|---|
| A need, pain or desire in the customer's words | Opportunity | Branch |
| A thing we would build | Solution | Under the target opportunity, later |
| A number we want to move | Outcome | The root |
| Something that must be true | Assumption | Under a solution, later |
| Nothing traceable to a snapshot | Not evidence | Deleted |

"Add a preview button" is a solution wearing an opportunity costume. The opportunity underneath
it is "I could not predict what it would do."

### Step 3 — Structure the tree

```text
OUTCOME (root, one)
|
+-- OPPORTUNITY            [snapshot ids]
|   +-- OPPORTUNITY        [snapshot ids]
|   +-- OPPORTUNITY        [snapshot ids]
+-- OPPORTUNITY            [snapshot ids]
```

### Step 4 — Structural validation

Run all four checks and record the result of each:

1. **Single parent.** Each opportunity has exactly one parent. An opportunity appearing twice
   means the branch was cut at the wrong altitude.
2. **Sibling distinctness.** Siblings do not overlap. Overlapping siblings are the same signal.
3. **Subset, not sequence.** Vertical relationships are subsets of the parent, not steps in a
   process.
4. **No solutions on opportunity branches.** Re-run the step 2 classification on every node.

Then run the provenance check: every opportunity cites at least one snapshot id. List the ones
that do not in `orphan_list` and delete them from the tree. Do not debate them — interview for
them or lose them.

### Step 5 — Size and select one target

Size the top-level opportunities on the four criteria and record the reasoning per cell:

| Opportunity | Opportunity sizing (how many, how often, how severely) | Market factors | Company factors | Customer factors | Verdict |
|---|---|---|---|---|---|

Select **exactly one** target opportunity. Focus is the entire point of selecting a target; a
tree with five simultaneous targets is a team with no focus. Record the runners-up as "next" and
"park", so the deferral is visible rather than silent.

### Step 6 — Write the tree

Create `output_dir` if absent. Write `opportunity-tree-{outcome-slug}.md` containing: the outcome
with baseline and target, the business outcome it ladders to, the tree with snapshot ids, the
structural report, the orphan list with the reason each was removed, the sizing table, and the
selected target.

The tree is not a backlog. It is the map of the opportunity space and of what is deliberately not
being pursued. Do not sort it by delivery order.

### Step 7 — Keep the habit alive

Before closing the task, record the next weekly touchpoint: the date, who from the trio attends,
and the recruiting channel. Continuous discovery is at minimum weekly touchpoints with customers,
by the team building the product, conducting small research activities in pursuit of a desired
outcome. A tree without a next interview date is a dead tree.

If recruiting is a weekly negotiation, the cadence will die. Record the plan to automate it into
the product — in-product prompt, post-transaction hook, support queue.

## Acceptance Criteria

- The outcome at the root is measurable, product-level, and influenceable by the trio.
- Every opportunity is written in the customer's language and cites at least one snapshot id.
- Orphan opportunities were deleted and listed, not defended.
- No node on an opportunity branch names a feature.
- Every opportunity has exactly one parent and siblings are distinct.
- Exactly one target opportunity is selected, with the four-criteria sizing recorded.
- The runners-up are recorded as deferred, so the choice is visible.
- The tree exists as a versioned file in the repository.
- The next weekly touchpoint is scheduled with a named attendee and recruiting channel.
- No solution comparison, assumption test, story or epic was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` | The outcome cannot be influenced through the product and needs decomposition into a portfolio bet |
| `@jobs-analyst` | Interview stories point to a switch, and the causal job needs formalizing |
| `@positioning-lead` | Customers describe the product in a category it is not positioned in |
| `@pricing-strategist` | A desirability signal is really a willingness-to-pay question |
| `@experimentation-lead` | An assumption needs statistical design, sample sizing or live traffic |
| `@products-chief` | Findings contradict the squad's current direction, or an ethical assumption needs a call above the trio |
| `@pm` | A validated opportunity with solution evidence is ready to become an epic |
| `@sm` | Epic framing is done and stories need drafting from the discovery brief |
| `@architect` | A feasibility assumption requires a technical spike |
| `@ux-design-expert` | A usability assumption requires prototype fidelity beyond a mockup |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Teresa Torres, *Continuous Discovery Habits: Discover Products that Create Customer Value and
  Business Value* (2021) — the opportunity solution tree, the weekly touchpoint habit definition,
  the product trio, story-based interviewing, opportunity sizing, solution comparison.
- David J. Bland and Alexander Osterwalder, *Testing Business Ideas* (2019) — the assumption test
  library and importance-by-evidence prioritization that Torres integrates into the tree.
- Marty Cagan, *INSPIRED*, 2nd edition (2018) and Marty Cagan with Chris Jones, *EMPOWERED*
  (2020) — outcome over output and the empowered product team framing.

`@discovery-lead` (Sonar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Interview execution protocol: `.aexos-core/development/tasks/ux-user-research.md`
- Elicitation for outcome framing: `.aexos-core/development/tasks/advanced-elicitation.md`
- Solution generation for the comparison step: `.aexos-core/product/data/elicitation-methods.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
