---
task: Risk Appetite Statement
owner: "@risk-oversight"
owner_type: agent
atomic_layer: task
Input: |
  - strategy: The chosen strategy, stated (required - this task halts without it)
  - objectives: The business objectives the appetite is set against (required)
  - risk_types: Risk types in scope, adapted to the organization (optional, default: strategic, financial, operational, technology and security, regulatory and compliance, reputational, people and key-person)
  - existing_appetite: Path to a prior appetite statement being revised, under squads/board/data/ (optional)
  - mandate_artifact: Path to the reserved-matters schedule or delegation map that establishes who may approve this (optional)
  - measures: Performance measures available for tolerance bands, with their sources (optional)
Output: |
  - appetite_statements: One statement per risk type, each naming what is accepted and what is not
  - forbidden_decision_tests: Per statement, the concrete plausible proposal it would cause the board to reject
  - tolerance_bands: Per appetite, a measurable band around a named measure and the point at which it is breached
  - breach_consequences: Per appetite, who is told, how fast, and what happens
  - unverified_list: Every figure with no stated basis, marked UNVERIFIED and excluded from the statement
  - attribution_map: Each element marked as COSO ERM principle, general risk discipline, or this agent's construction
  - appetite_record: Path to the versioned appetite statement written under squads/board/data/
Checklist:
  - "[ ] Strategy and objectives confirmed present - task halted if they are not"
  - "[ ] Risk types enumerated, and any adaptation from the default set stated"
  - "[ ] One appetite statement drafted per risk type, never one statement for the whole organization"
  - "[ ] Forbidden-decision test applied to every statement, with a named concrete proposal"
  - "[ ] Any statement failing the forbidden-decision test rewritten or deleted"
  - "[ ] Tolerance band attached to every appetite, with measure, source and breach point"
  - "[ ] Escalation consequence stated per appetite"
  - "[ ] Every figure without a stated basis marked UNVERIFIED and kept out of the statement"
  - "[ ] COSO attribution separated from general discipline and from this agent's construction"
  - "[ ] Human-review clause present in the output"
  - "[ ] Approving body, date, review cadence and early-review triggers recorded"
---

# Risk Appetite Statement

Materializes `@risk-oversight *appetite`.

## Purpose

Produce an appetite statement the board can actually apply: per risk type, bounded, measurable, and
capable of causing a proposal to be rejected. An appetite that forbids nothing describes enthusiasm,
not a boundary. This task exists to prevent that outcome.

## Attribution

This task applies the enterprise risk management framework published by **COSO** — the Committee of
Sponsoring Organizations of the Treadway Commission — in *Enterprise Risk Management — Integrating
with Strategy and Performance* (2017), which updated the earlier *Enterprise Risk Management —
Integrated Framework* (2004). Defining risk appetite sits in that framework's Strategy and
Objective-Setting component.

Three attribution rules are binding:

1. **COSO ERM is a management and oversight framework, not a quantitative model.** It supplies no
   loss distributions, capital requirements, actuarial estimates or pricing. Where a number is
   required and none exists, say so and ask for the range and its basis. Do not produce a figure.
2. **Techniques that go beyond COSO are named as general risk-management discipline** — scenario
   analysis, stress testing, tail-risk reasoning, concentration analysis. COSO provides the
   structure in which they are used; it is not their source.
3. **COSO's internal control framework is a different document with a different purpose.** Where
   internal control over reporting is the question, the owner is `@audit-lead`, not this task.

The forbidden-decision test used in step 4 is this agent's own `CONSTRUCTION` and is labelled as
such wherever it appears. No citation, title or year may be invented.

## Professional limit — read before executing

A risk appetite statement is **not** legal, tax, regulatory, insurance or statutory-audit advice.
It does not determine whether an obligation exists, whether an insurance policy responds, or what a
supervisor will require. Those go to qualified advisers outside this system. The statement produced
here is **input for review and approval by the board's human directors**, and for review by licensed
advisers where it touches regulated exposure. It is never the final instrument and never a
substitute for advice.

## Pre-conditions

1. `strategy` and `objectives` are stated. **If they are not, halt.** Appetite cannot be set
   against objectives that do not exist, and setting it anyway produces a sentence nobody can apply.
   Return the missing input as the finding.
2. If `mandate_artifact` is absent, note it: an appetite approved by a body with no defined
   authority is decoration. Recommend `@governance-counsel` upstream before approval, but the
   drafting may proceed.
3. If `existing_appetite` is supplied, the path resolves and its date is recorded for the diff.

## Procedure

1. **COLLECT** the strategy and objectives. Halt if absent, per pre-condition 1.
2. **ENUMERATE RISK TYPES**, not individual risks. Use `risk_types` or the default set. State what
   was adapted for this organization and why. Appetite for regulatory breach and appetite for
   product experimentation are different appetites and must not share a sentence.
3. **DRAFT ONE STATEMENT PER TYPE**, in the form:
   > For **{type}**, we are willing to accept **{qualitative direction}** in pursuit of
   > **{objective}**, and we are not willing to accept **{named class of outcome}**.
4. **APPLY THE FORBIDDEN-DECISION TEST** to each statement (this agent's `CONSTRUCTION`): name a
   concrete, plausible proposal that this statement would cause the board to reject. If no such
   proposal can be named, the statement is not a boundary — rewrite it or delete it. Record the
   named proposal alongside the statement; it is part of the output, not scaffolding.
5. **ATTACH TOLERANCE.** Per appetite: a measurable band around a named performance measure, the
   source of that measure, and the point at which it is breached. Appetite without tolerance cannot
   be breached, and an unbreachable boundary cannot be monitored. Where no measure exists, record
   the gap explicitly rather than inventing a proxy.
6. **STATE THE BREACH CONSEQUENCE** per appetite: who is told, how fast, and what happens. An
   appetite with no escalation consequence is not monitored, whatever the tolerance says.
7. **MARK UNVERIFIED.** Any severity, likelihood or exposure figure with no stated basis — a
   measurement, an incident record, a named estimate with its estimator, or an explicit assumption —
   is marked `UNVERIFIED` and does not enter the statement. Constitution Article IV: No Invention.
8. **ATTRIBUTE.** Mark each element as a COSO ERM principle (naming the component), general risk
   discipline, or this agent's construction.
9. **RECORD** the approving body, the date, the review cadence, and the triggers for early review:
   a change in strategy, scale, structure, funding, technology or regulatory posture. Write to
   `squads/board/data/risk-appetite-<version>.md` so movement between periods is diffable.

## Acceptance criteria

- The task halted, or the strategy and objectives are present and quoted.
- There is one statement per risk type and no single organization-wide appetite sentence.
- Every statement carries a named concrete proposal it would cause the board to reject.
- Every appetite carries a tolerance with a measure, a source and a breach point — or an explicit
  gap statement where no measure exists.
- Every appetite states its escalation consequence.
- No figure appears without a stated basis; unbased figures are listed as `UNVERIFIED`.
- COSO attribution is separated from general discipline and from the agent's construction, and the
  forbidden-decision test is labelled as a construction wherever it appears.
- The output states that it is input for board approval and licensed review, and is not legal, tax,
  regulatory, insurance or statutory-audit advice.
- Nothing produced designs, implements or tests a control. This task states what the board expects
  to exist and what evidence it expects back.

## Where the output goes

| Destination | What it receives |
|---|---|
| `@board-chief` | The statement for agenda placement as a DECISION item, and for the coherence chain (appetite link) |
| `@governance-counsel` | A request to confirm the approving authority where `mandate_artifact` was absent |
| `@audit-lead` | The control expectations implied by each appetite, so assurance can be mapped against them |
| `@succession-lead` | The people and key-person appetite, which bounds acceptable leadership concentration |
| External qualified advisers | Insurance response, regulatory obligation and any tax treatment, unmodified |

Control implementation is `@dev`, control testing is `@qa`, release is `@devops`. This task hands
over expectations and evidence requirements, never work items.

## Reference files

- `squads/board/agents/risk-oversight.md` — full COSO reference, severity and portfolio models
- `squads/board/squad.yaml` — squad manifest and handoff matrix
- `.aexos-core/development/tasks/create-doc.md` — document driver for the appetite record
- `.aexos-core/development/checklists/self-critique-checklist.md` — applied to the draft before it is proposed
