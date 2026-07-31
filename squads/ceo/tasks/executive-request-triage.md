---
task: Executive Request Triage
responsavel: "@ceo-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - request: The executive question in the requester's own words (required)
  - context_artifacts: Paths to existing strategy, capital, org or stakeholder artifacts (optional)
  - known_constraints: Cash, time, people, contractual or regulatory limits already known (optional)
  - decision_deadline: Date by which a decision is actually needed (optional)
Saida: |
  - restated_request: The request rewritten in the vocabulary of the discipline that owns it
  - reversibility_class: reversible-cheap | reversible-costly | irreversible
  - owning_specialist: Exactly one squad agent id, with the near-miss disciplines and why each was excluded
  - short_answer: The two-minute usable answer, labelled usable rather than defensible
  - engagement_order: Ordered specialist list when more than one is genuinely required, with the input each needs
  - handoff_brief: Written brief so the receiving specialist does not re-elicit context
  - handoff_path: Path of the recorded handoff artifact
Checklist:
  - "[ ] Request captured verbatim before any rewriting"
  - "[ ] Request restated in the owning discipline's vocabulary and confirmed with the requester"
  - "[ ] Reversibility classified before any evidence effort is committed"
  - "[ ] Reframing patterns checked and any reframe stated out loud, not applied silently"
  - "[ ] Exactly one owning specialist named from the squad roster"
  - "[ ] Two nearest misses named with the reason each was excluded"
  - "[ ] Boundary check run: request is still executive, not delivery work"
  - "[ ] Short usable answer given and explicitly labelled as usable, not defensible"
  - "[ ] Engagement order produced when the request touches more than one specialist"
  - "[ ] Handoff brief written with restated question, evidence on hand and open questions"
  - "[ ] Handoff artifact recorded to disk"
---

# Executive Request Triage

Materializes `@ceo-chief *diagnose`. Turns an incoming executive request into a routing
decision with one named owner, a reversibility classification, a usable partial answer, and a
written handoff brief.

## Purpose

The most expensive executive failure in practice is not a weak method — it is the right
question answered by the wrong discipline. This task exists so that no executive request enters
the squad without an owner, a reversibility class, and a written context brief. A confident
answer from the wrong discipline is worse than a routing decision.

## Attribution

This task carries no external methodology. `@ceo-chief` is an original orchestrator role; the
published methods live in the specialists it routes to, each attributed in its own agent file.
Nothing here is claimed for any author.

## Pre-conditions

- The request exists in the requester's own words. If it arrived pre-interpreted by a third
  party, capture the original wording before proceeding.
- The squad roster is readable at `squads/ceo/squad.yaml` for the current agent ids.
- If `context_artifacts` are supplied, each path resolves. A missing artifact is recorded as
  MISSING, not assumed.

## Procedure

### 1. Capture

Record the request verbatim. Record who asked, when, and what decision they believe it feeds.
Do not paraphrase at this step — the paraphrase is step 2 and must be visible as a separate act.

### 2. Restate

Rewrite the request in one sentence, in the vocabulary of the discipline that appears to own it.
Show the requester both versions. If they reject the restatement, the restatement is wrong;
return to step 1 rather than proceeding with a disputed premise.

### 3. Classify reversibility

Assign exactly one class and write the reason:

| Class | Test | Evidence effort |
|---|---|---|
| reversible-cheap | Undoing costs little and the cost does not persist | Decide on judgement; record the reversal trigger |
| reversible-costly | Undoing is possible but the cost persists for quarters | At least one checkable data point per option |
| irreversible | No relevant horizon restores the prior position | Named evidence per option, stated downside case, dissent recorded |

The classification is stated before any evidence is gathered, because it sets how much evidence
is worth buying.

### 4. Reframe check

Compare the stated request against the known reframing patterns held in the agent's `triage`
section (budget cut as diagnosis question, reorg as strategy question, acquisition as one use of
cash among five, board unhappiness as either miscommunication or wrong promise, overload as a
focus failure, goal list as an absent diagnosis, raise as capital sourcing plus a promise).

If the stated question is not the owned question, say the reframe out loud and get confirmation.
Never answer a different question silently.

### 5. Name the owner

Select exactly one from the roster:

| Owner | Covers |
|---|---|
| `strategy-lead` | Diagnosis, guiding policy, coherent action, bad-strategy detection |
| `capital-allocator` | Uses and sources of cash, hurdle rates, per-share value, opportunity cost |
| `org-designer` | Managerial output and leverage, decision rights, cadence, structure |
| `stakeholder-lead` | Promises made, board and investor reporting, the accountability record |

Then name the two nearest misses and state, for each, why it was excluded. If two owners look
equally correct, the request contains two questions — split it and triage each.

Broadcasting one request to several specialists is prohibited: it produces partial answers built
on different unstated assumptions, and no decision.

### 6. Boundary check

Confirm the request is still executive. Route outward when it is not:

| Destination | When |
|---|---|
| `@pm` | Epic framing, PRD authoring, requirements gathering |
| `@po` | Story validation, backlog prioritization |
| `@sm` | Story creation and drafting — exclusive authority |
| `@dev` | Implementation |
| `@qa` | Tests and quality gates |
| `@devops` | Git push, PRs, MCP, CI/CD, release — exclusive authority |
| `@analyst` | Deep market, competitive or industry research |
| `@architect` | System design, technology selection, feasibility |

### 7. Short answer

Give the two-minute usable version and label it as such. State plainly that the specialist gives
the defensible version. Do not produce a strategy, a capital plan, an org design or board
copy here — that bypasses the method that makes those artifacts defensible.

### 8. Sequence, if more than one specialist is needed

Default dependency order: `strategy-lead` → `capital-allocator` → `org-designer` →
`stakeholder-lead`. Deviate only with a stated reason (a binding cash-runway constraint inverts
the first two). For each step record the input it needs, the output it produces, and what would
be rewritten if it ran early.

### 9. Write the handoff brief

Fields: restated question, reversibility class, evidence already available with sources and
dates, open questions marked UNVERIFIED, known constraints, and the decision the specialist is
expected to inform.

### 10. Record

Write the handoff artifact under `.aexos/handoffs/` (create the directory if it does not exist),
named `handoff-ceo-chief-to-{owner}-{timestamp}.yaml`. A routing decision that lives only in a
transcript did not happen.

## Acceptance criteria

- The routed specialist accepts the request as theirs without re-routing.
- The requester has a usable answer before the handoff, and knows it is the usable one.
- Reversibility is stated before evidence effort is spent.
- Exactly one owner is named; the near misses are named and excluded with reasons.
- Any reframe was confirmed, never applied silently.
- Multi-specialist work is ordered so no upstream artifact is rewritten.
- No strategy, capital plan, org design, board copy, epic, story or code was produced here.
- The handoff artifact exists on disk.

## Handoff

Output goes to exactly one of `@strategy-lead`, `@capital-allocator`, `@org-designer` or
`@stakeholder-lead` — never to several at once.

When the squad's work is complete, the decision and its evidence leave the squad through
`@pm` for epic framing. This squad does not create stories (`@sm` holds that authority
exclusively), does not implement (`@dev`), does not test (`@qa`), and does not push or release
(`@devops`, exclusive).

## Failure handling

| Situation | Action |
|---|---|
| Restatement rejected by the requester | Return to capture; do not proceed on a disputed premise |
| Two owners equally correct | The request contains two questions; split and triage each |
| Request has left the executive surface | Route to the core agent that owns it and close the triage |
| Irreversible decision with thin evidence | Block the decision record and name the missing evidence |
| Ethical, legal or safety concern raised | Surface it explicitly before the decision proceeds, never as a footnote |
