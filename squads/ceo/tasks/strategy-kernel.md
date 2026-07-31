---
task: Build Strategy Kernel
responsavel: "@strategy-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - situation: What changed, what is not working, what the numbers say (required)
  - evidence_sources: Data, documents and observations available, each with origin and date (required)
  - existing_plan: Path to a current strategy document, if one exists (optional)
  - constraints: Resource, contractual and capability limits already known (optional)
  - horizon: The period the strategy is meant to cover (optional, default: the next four quarters)
Saida: |
  - diagnosis: A falsifiable claim about what is critical, with its evidence table
  - rejected_rival: The rival diagnosis considered in full, rejected with reasons or kept live
  - crux: The difficulty that is both important and addressable with current resources
  - guiding_policy: The overall approach, and what it rules out
  - source_of_power: The named source the policy relies on, with its conditions
  - coherent_actions: The coordinated action set with owners and mutual support stated
  - exclusion_list: What stops, with exit cost and the objection each will raise
  - inertia_budget: The cost of overcoming the organisation's own commitments, as a line item
  - prediction: The falsifiable claim, its indicator, its disconfirming observation and check date
  - strategy_doc_path: Path of the captured kernel document
Checklist:
  - "[ ] Situation collected with every item carrying its source and date"
  - "[ ] Symptoms separated from the underlying difficulty"
  - "[ ] Diagnosis stated as a claim a named observation could contradict"
  - "[ ] At least one rival diagnosis generated in full before the first was evaluated"
  - "[ ] Crux identified: important and addressable with current resources"
  - "[ ] Guiding policy states an approach and names at least one thing it rules out"
  - "[ ] Source of power named and its holding conditions stated"
  - "[ ] Coherent actions mapped, each supporting or supported by another"
  - "[ ] Action conflicts resolved, not merely noted"
  - "[ ] Exclusion list produced with exit costs and objections"
  - "[ ] Inertia budgeted as a line item, not listed as a risk"
  - "[ ] Prediction written with indicator, disconfirming observation and check date"
  - "[ ] All four bad-strategy hallmarks checked against the result"
  - "[ ] Every element sourced; gaps marked UNVERIFIED rather than narrated"
  - "[ ] No pricing, staffing or board narrative produced inside this task"
---

# Build Strategy Kernel

Materializes `@strategy-lead *kernel`. Produces the complete kernel — diagnosis, guiding policy,
coherent action — plus the exclusion list, the inertia budget and the falsifiable prediction,
captured as one reviewable artifact.

## Purpose

A strategy is a coherent response to a specific challenge. It is not a goal, a target, a vision
or a set of values. This task refuses to begin with ambition: it names the obstacle first, in a
form that could be wrong, and only then chooses an approach to it.

## Attribution

The framework applied here is the one Richard Rumelt published in *Good Strategy Bad Strategy:
The Difference and Why It Matters* (2011): the three-part kernel of diagnosis, guiding policy and
coherent action; the four hallmarks of bad strategy; and the sources of power. The emphasis on
identifying the difficulty that is both important and addressable is extended in Rumelt's *The
Crux: How Leaders Become Strategists* (2022).

The executing agent applies this documented framework with explicit attribution. Where this
procedure adds operating detail Rumelt does not specify, that detail is the agent's own and must
be labelled as such rather than attributed.

## Pre-conditions

- Situation input exists with at least one sourced observation. A kernel cannot be built from
  intentions alone.
- If `existing_plan` is supplied, it has been read. Do not edit a plan whose defect is a missing
  diagnosis — that produces a better-written plan with the same defect.
- No pricing or staffing figures are expected as input; they are downstream of this work.

## Procedure

Run in order. Do not proceed while a prior step is unresolved.

### 1. Diagnose the challenge

1. Collect the situation: what changed, what is not working, what the numbers say, what people
   inside the company believe is wrong. Record each item with its source and date.
2. Separate symptoms from the underlying difficulty. A falling metric is a symptom. Ask what
   would have to be true for that symptom to be inevitable.
3. Draft the diagnosis as a single claim about what is critical, phrased so that evidence could
   contradict it. Reject any wording no observation could disprove — that is a description, and
   descriptions do not guide action.
4. Generate at least one rival diagnosis that fits the same evidence, stated in full and not as a
   straw man. Do this before evaluating the first, because the first explanation offered anchors
   the room.
5. Ask what evidence separates the two. If nothing does, both stay open and the output of this
   step is a discriminating test, not a diagnosis.
6. Identify the crux: among the difficulties named, the one both important and addressable with
   the resources available.
7. Mark every unsupported element UNVERIFIED. Do not fill gaps with plausible narrative.

### 2. Choose the guiding policy

1. State the overall approach to the diagnosed challenge in one or two sentences. It is a method
   of dealing with the obstacle, not a target and not an action list.
2. List what the policy rules out. If the list is empty, the policy is a slogan — return to (1).
3. Name the source of power it relies on: leverage through anticipation, a proximate objective, a
   chain-link repair, concentration, an advantage, a change in dynamics, or rival inertia.
4. State what must be true for the policy to work. These become the assumptions checked later.
5. Test coherence with the diagnosis: does this approach address what the diagnosis says is
   critical, or something adjacent to it?
6. Record the alternative policies considered and why each was rejected.

### 3. Specify coherent action

1. List candidate actions that carry out the policy.
2. For each record: owner, what it consumes, what it produces, and which other action it supports
   or depends on.
3. Build the coordination map. An action that supports nothing and is required by nothing is a
   separate initiative, not part of this strategy — remove it.
4. Test for conflict. Two actions competing for the same scarce resource, or pushing in opposite
   directions, must be resolved here. Noting the conflict is not resolving it.
5. Concentrate: rank by contribution to the pivot point, and cut from the bottom until the
   remaining set can actually be resourced. Record what was cut.

### 4. Produce the exclusion list

For every activity the guiding policy rules out, record what it consumes today, who owns it, what
commitment it carries, the exit cost, and the objection it will raise — stated accurately rather
than dismissively. Classify each as stop now / stop at contract end / stop after a named
condition.

### 5. Budget the inertia

Name the routines, commitments, contracts and beliefs that will resist the policy. Estimate the
cost and duration of overcoming each and enter it as a line item. Unbudgeted inertia is the most
common reason a sound strategy produces no observable change.

### 6. Write the prediction

State it as: if we do X, then Y will be observable by date D. Choose an indicator that would move
under this strategy and would not move without it. State the disconfirming observation — what
would show the diagnosis was wrong. Set the check date and the owner. Write it now; a prediction
recorded after the results are known is a narrative.

### 7. Pressure-test before capture

Report failures, not a score:

1. Is the diagnosis falsifiable, and by what named observation?
2. Was a rival generated, and does it fit the evidence better?
3. Does the policy rule anything out?
4. Do the actions support one another, or merely coexist?
5. Does any action conflict with another for the same resource or direction?
6. Is the objective proximate enough to be solvable with current capability?
7. Is effort concentrated, or spread across more initiatives than can be resourced?
8. Is inertia budgeted or assumed away?
9. Is any of the four hallmarks present — fluff, failure to face the challenge, goals mistaken
   for strategy, bad strategic objectives?
10. Is there a written prediction with a check date?

Any failure blocks capture until repaired or explicitly accepted with a stated reason.

### 8. Capture

Write the document with these sections and no others: CHALLENGE, REJECTED DIAGNOSIS, GUIDING
POLICY, COHERENT ACTIONS, NOT DOING, SOURCE OF POWER, INERTIA BUDGET, PREDICTION, OPEN QUESTIONS,
OWNER, REVIEW DATE.

Use `.aexos-core/development/tasks/create-doc.md` as the generation driver and apply
`.aexos-core/development/checklists/self-critique-checklist.md` before release. Default output
path: `docs/executive/strategy-kernel.md` (create the directory if it does not exist).

## Acceptance criteria

- A named observation exists that would contradict the diagnosis.
- A rival diagnosis was generated in full and is either rejected with reasons or recorded as live.
- The guiding policy excludes at least one real thing, and the exclusion is written down.
- Every action supports or is supported by another, or is justified explicitly as standalone.
- Concentration was assessed against the actual budget and org, not against the strategy
  document's own claims.
- Inertia appears as a budgeted line item.
- The prediction was written at the time the strategy was set.
- No hurdle rate, headcount plan or board narrative appears anywhere in the output.

## Handoff

| Destination | What it receives |
|---|---|
| `@capital-allocator` | The concentration requirement and the exclusion list, as inputs to the funding decision. This task does not price the actions. |
| `@org-designer` | The ownership, decision-rights and cadence consequences, and the inertia budget to be turned into a management plan. This task does not staff the actions. |
| `@stakeholder-lead` | The strategy and especially the exclusion list, for the board, investor and internal narrative, and the prediction where it becomes a promise. |
| `@ceo-chief` | Any conflict between this kernel and an existing capital plan or org design, for arbitration. |
| `@pm` | The settled coherent actions, for epic framing and PRD. Story drafting belongs to `@sm` exclusively; implementation to `@dev`; quality gates to `@qa`; push and release to `@devops` exclusively. |
| `@analyst` | Diagnosis or rival-diagnosis questions needing market, competitive or industry evidence beyond what the company holds. |
