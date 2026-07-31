---
task: Succession Audit
responsavel: "@succession-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - organization: The organization and the leadership scope under audit (required)
  - strategy_horizon: Where the strategy says the organization is going over the next three to five years (required for the criteria test)
  - emergency_plan: Path to any written emergency succession plan, under squads/board/data/ (optional)
  - succession_criteria: Path to written chief-executive succession criteria, if any exist (optional)
  - bench_data: Named candidates with any existing readiness ratings and the evidence behind them (optional)
  - agenda_history: When succession last appeared as a decision item, and how many periods it has been deferred (optional)
Saida: |
  - emergency_finding: Whether a plan exists, when it was last reviewed, and whether it would function tomorrow
  - criteria_finding: Whether criteria exist and whether they were derived from strategy or from the incumbent
  - bench_finding: Candidates with readiness horizons - READY NOW, 1-2 YEARS, 3+ YEARS, NOT ON THIS PATH - and the evidence basis per rating
  - unverified_ratings: Every rating with no observed evidence, marked UNVERIFIED
  - concentration_finding: Roles covered by exactly one name, and single points of leadership knowledge
  - cadence_finding: How many consecutive periods succession has been deferred, and its last decision-item appearance
  - mode_finding: Whether the board is operating in take-charge mode or has delegated the process to the incumbent
  - ranked_findings: Findings ordered by what would hurt most if a departure happened this quarter
  - audit_record: Path to the versioned succession audit written under squads/board/data/
Checklist:
  - "[ ] Emergency plan tested for existence, review date, availability of the named person, and a walked-through first 48 hours"
  - "[ ] Criteria tested for existence and for derivation from strategy rather than from the incumbent"
  - "[ ] Incumbent-contamination test applied in both directions"
  - "[ ] Every candidate given a readiness horizon - 'talented' rejected as an answer"
  - "[ ] Ratings with no observed evidence marked UNVERIFIED"
  - "[ ] Development gap named per candidate not ready now"
  - "[ ] Cadence recorded - consecutive deferrals and last appearance as a decision item"
  - "[ ] Key-person concentration mapped at least at executive level"
  - "[ ] Board mode assessed - take charge, partner, or stay out of the way"
  - "[ ] Findings ranked by what would hurt most on a departure this quarter"
  - "[ ] Assessment stated as readiness against criteria, never as a judgement of the person"
  - "[ ] Human-review clause present in the output"
---

# Succession Audit

Materializes `@succession-lead *succession-audit`.

## Purpose

Establish whether leadership continuity actually exists, or is a name on a slide. The audit tests
four things the board owns: an emergency plan that would function tomorrow, criteria derived from
where the strategy is going, a bench with evidenced readiness horizons, and a cadence that puts the
matter on the agenda as a decision rather than an update.

## Attribution

This task applies the framework published by **Ram Charan, Dennis Carey and Michael Useem** in
*Boards That Lead: When to Take Charge, When to Partner, and When to Stay Out of the Way* (Harvard
Business Review Press, 2013). Its central argument is the operating premise: the discipline is not
more board involvement or less, but knowing which of three modes applies — take charge, partner, or
stay out of the way — and the framework places chief-executive succession firmly in take charge.

Two qualifications are stated rather than assumed:

1. *Boards That Lead* is a book about board leadership across many matters, of which succession is
   one of the most prominent. **It is not a step-by-step succession manual.** The detailed mechanics
   used here — emergency plans, readiness horizons, transition sequencing — are general board
   practice, marked `DISCIPLINE`, or this agent's own `CONSTRUCTION`. They are never presented as
   the authors' text. The incumbent-contamination test is a `CONSTRUCTION`.
2. Pipeline reasoning draws on a **separately attributed** source: *The Leadership Pipeline* by
   **Ram Charan, Stephen Drotter and James Noel** (2001), which describes leadership development as
   a series of transitions between levels, each requiring a change in skills, time application and
   values. That is a different book with different co-authors, and the two attributions are never
   merged.

No citation, title, publisher or year may be invented.

## Professional limit — read before executing

This task gives **no legal, employment, tax or compensation-regulation advice**. Employment law,
contract terms, severance, discrimination questions, immigration and compensation regulation are
outside it entirely and go to qualified counsel. It is also **not** an individual performance
management process and **not** a recruitment process — those belong to management.

Every output is **input for review by the board's human directors and by qualified counsel where an
employment or contractual question arises.** Nothing here appoints, removes, rates or ranks a
person as a person. Assessment is expressed as **readiness against agreed criteria, on stated
evidence**, and any rating without observed evidence is marked `UNVERIFIED`.

## Pre-conditions

1. `organization` and `strategy_horizon` are present. Without the strategy horizon, criteria cannot
   be tested for derivation and the criteria section is reported as untestable rather than passed.
2. If `succession_criteria` is absent, the audit records that as the first structural finding — a
   bench review without criteria produces a popularity ranking, and this task will not produce one.
3. If supplied paths do not resolve, they are reported as evidence gaps.

## Procedure

1. **EMERGENCY.** Does a written emergency plan exist? When was it last reviewed? Would the named
   person actually be available and willing? Has anyone walked through the first 48 hours — who
   holds authority tomorrow morning, who is told in what order, what the interim's mandate is and
   is not? A plan never walked through is recorded as untested.
2. **CRITERIA.** Do written criteria exist? Were they derived from `strategy_horizon` or from the
   incumbent? Apply the **incumbent-contamination test** (`CONSTRUCTION`) in both directions:
   - Would this criterion be here if the current chief executive were someone else?
   - Does this list omit anything the current incumbent is weak at, which the next phase requires?
     The second direction is nearly invisible and is the one that must be written down.
   Record whether criteria were agreed **before** any name was discussed, and the date.
3. **BENCH.** Are candidates named with readiness horizons and evidence, or is there a list of
   talented people? Assign per candidate: `READY NOW`, `READY IN 1-2 YEARS`, `READY IN 3+ YEARS`,
   `NOT ON THIS PATH`. "Talented" is not a horizon and is not accepted as an answer. Ratings with no
   observed evidence are marked `UNVERIFIED` and reported as such. Flag any role covered by exactly
   one name.
4. **DEVELOPMENT.** For everyone not ready now, state what would close the gap: which experience,
   which exposure, which stretch assignment, on what timescale. If succession is reviewed annually
   and development never is, the board is reviewing a fact it has chosen not to influence — record
   that as a finding.
5. **CADENCE.** When was succession last on the agenda as a decision item rather than an update? How
   many consecutive periods has it been deferred? Deferral count is reported as a number.
6. **CONCENTRATION.** Map key-person exposure at least at executive level: single points of
   knowledge, roles with no documented deputy, relationships held by one individual. The absence of
   a deputy is a finding about the organization, not a compliment to the individual.
7. **MODE.** Is the board operating in take-charge mode, or has it delegated the process to the
   incumbent while retaining the appearance of ownership? Chief-executive succession, chief-executive
   assessment, and the criteria for both are always take charge. [SOURCE: *Boards That Lead*]
8. **RANK** the findings by what would hurt most if a departure happened **this quarter** — not by
   effort to fix and not by discomfort to raise.
9. **RECORD.** Write to `squads/board/data/<organization-slug>-succession-audit.md` with the date and
   the artifacts examined.

## Acceptance criteria

- Every one of the seven dimensions is reported, including those where the answer is "nothing
  exists" — an absent artifact is a finding, not a blank.
- The incumbent-contamination test appears in both directions, in writing.
- Every candidate carries a readiness horizon; no candidate is described only as talented.
- Every rating carries its evidence basis, or is marked `UNVERIFIED`.
- Every not-ready-now candidate carries a named development gap with a timescale.
- Deferral cadence is reported as a count.
- The board's mode is stated explicitly.
- Findings are ranked by departure-this-quarter impact.
- Assessment is expressed as readiness against criteria, never as a judgement of a person.
- The output states that it is input for director and counsel review, and gives no employment,
  legal, tax or compensation-regulation advice.
- Nothing produced runs recruitment, interviews, individual performance management below the
  executive team, or any implementation, testing or release activity.

## Where the output goes

| Destination | What it receives |
|---|---|
| `@board-chief` | The ranked findings for agenda placement, and the capacity link of the coherence chain |
| `@governance-counsel` | Board-composition, tenure and chair-succession findings; any appointment-authority gap |
| `@risk-oversight` | Key-person concentration as an exposure to be carried in the portfolio view |
| `@audit-lead` | Only where a succession-linked disclosure or compensation figure needs assurance |
| External qualified counsel | Employment law, contract, severance and compensation-regulation questions, unmodified |

Epic framing is `@pm`, stories are `@sm`, backlog is `@po`, implementation is `@dev`, gates are
`@qa`, release and push are `@devops`. This task hands over findings, never work items.

## Reference files

- `squads/board/agents/succession-lead.md` — full framework reference, modes and readiness models
- `squads/board/squad.yaml` — squad manifest and handoff matrix
- `.aexos-core/development/tasks/advanced-elicitation.md` — structured elicitation for the bench and criteria interviews
- `.aexos-core/development/checklists/self-critique-checklist.md` — applied to the draft before it is proposed
