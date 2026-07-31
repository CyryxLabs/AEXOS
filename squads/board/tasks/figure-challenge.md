---
task: Figure Challenge
responsavel: "@audit-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - figure: The reported figure or report under challenge, as presented to the board (required)
  - assertor: The named person or function asserting it (required - "the system" is not an assertor)
  - period: The reporting period, and the comparative period if a movement is claimed (required)
  - source_data: Paths or descriptions of the underlying records, if available (optional)
  - prior_definition: The definition used in the comparative period, if a comparison is being made (optional)
  - assurance_evidence: Any independent test already performed, with party, scope and date (optional)
Saida: |
  - restated_assertion: The figure restated as a precise assertion, with basis and comparative basis
  - assertor_named: The person or function standing behind the figure
  - basis_classification: MEASURED | COMPUTED | ESTIMATED | JUDGED, with the source data named
  - definition_stability: Whether the definition changed across the compared periods, and the effect if so
  - judgements_range: The headline figure at the conservative and aggressive end of its judgements, plus the direction finding
  - falsifier: The observation that would show the figure to be wrong, or a statement that none exists
  - assurance_status: Independent party, scope and date - or NO ASSURANCE, in those words
  - verdict: RELIABLE FOR THE PURPOSE | RELIABLE WITH STATED LIMITS | NOT ESTABLISHED
  - challenge_record: Path to the versioned challenge written under squads/board/data/
Checklist:
  - "[ ] Assertion restated precisely, including the basis and the comparative basis"
  - "[ ] A named person or function identified as the assertor"
  - "[ ] Basis classified as measured, computed, estimated or judged"
  - "[ ] Definition stability across compared periods tested and reported"
  - "[ ] Judgements and estimates surfaced with their plausible range and direction pattern"
  - "[ ] Falsifier named, or its absence stated explicitly"
  - "[ ] Independent test recorded with party, scope and date - or NO ASSURANCE recorded verbatim"
  - "[ ] Verdict is one of the three permitted values and is never 'probably fine'"
  - "[ ] Human-review clause present in the output"
  - "[ ] Challenge record written to a versioned file under squads/board/data/"
---

# Figure Challenge

Materializes `@audit-lead *figure-challenge`.

## Purpose

Establish whether a reported figure can be relied on for the decision the board is about to take.
The task separates three states that ordinary reporting collapses into one: what is asserted, what
was computed, and what someone independent has tested. Most disputes about numbers turn out to be
disputes about the assertion.

## Attribution

The audit committee discipline has **no single canonical author and no one foundational text**. It
is institutional practice assembled from several distinct sources, and this task attributes to the
specific source whenever a provision comes from one:

- The **Cadbury Report (1992)** and its **Code of Best Practice**, which recommended an audit
  committee of at least three non-executive directors with written terms of reference dealing
  clearly with authority and duties, and required directors to report on the effectiveness of the
  system of internal control.
- **COSO's *Internal Control — Integrated Framework***, originally issued in 1992 and updated in
  2013, defining internal control through five components supported by seventeen principles. COSO —
  the Committee of Sponsoring Organizations of the Treadway Commission — takes its name from the
  National Commission on Fraudulent Financial Reporting, whose report was issued in 1987.
- The **Sarbanes-Oxley Act of 2002** (United States), which placed the external auditor
  relationship under the audit committee, required a confidential channel for employee concerns,
  and established management assessment of internal control over financial reporting with auditor
  attestation.
- The **three-lines model** of assurance, associated with the Institute of Internal Auditors.

Attribution rule: a provision is cited to exactly one of these sources, or marked as general
practice. Sources are never merged, and no citation, title or year may be invented. Claiming a
single canonical work for this discipline would itself be a misattribution.

## Professional limit — read before executing

This task is **not** a statutory audit and produces **no audit opinion**. It determines no
accounting policy and gives no legal, tax or regulatory advice. It does not decide whether a filing
obligation exists or has been met. The executing agent is not an auditor.

What this task produces is a structured challenge that a board can put to management and to its
appointed auditors. It is **input for review by the appointed external auditor, by licensed counsel
where a filing question arises, and by the directors who must decide** — never the final assurance
position and never a substitute for audit.

## Pre-conditions

1. `figure`, `assertor` and `period` are present. If `assertor` is a system rather than a person or
   function, resolve it first: a system is configured by someone, and that person is the assertor.
2. If a movement or comparison is claimed, the comparative period is stated.
3. If `source_data` paths are supplied, each resolves. Unresolvable paths are recorded as evidence
   gaps and carried into the verdict.

## Procedure

1. **RESTATE THE ASSERTION** precisely. Not "revenue grew 30%", but "management asserts that
   recognized revenue for period P was X, on basis Y, compared with a prior period computed on
   basis Z".
2. **WHO ASSERTS.** Name the person or function. Record "the system says" as unresolved and go find
   who configured it.
3. **BASIS.** Classify as `MEASURED`, `COMPUTED`, `ESTIMATED` or `JUDGED`. If computed: from what
   source data, and has that source been reconciled to anything independent?
4. **DEFINITION STABILITY.** Has the definition changed across the periods being compared? A changed
   definition presented as a movement is the commonest reporting distortion, and it is usually not
   deliberate. Report the figure under both definitions where a change is found.
5. **JUDGEMENTS AND ESTIMATES.** Identify every point where a person chose between defensible
   alternatives — recognition timing, cut-off, classification, allocation, capitalization versus
   expense, provision levels, segment boundaries, cohort definitions, metric denominators. For each:
   the choice made, the alternative defensible choice, and who made it. Report the **range** of the
   headline figure across the conservative and aggressive ends, not the point.
6. **DIRECTION TEST.** Are the judgements independently distributed, or do they all lean the same
   way? Each may be individually defensible. **The pattern is the finding**, and it is reported as
   a pattern, not as an allegation about any individual.
7. **FALSIFIER.** What observation would show this figure to be wrong? If nothing could, it is not a
   measurement — it is a characterization, and it is reported as one.
8. **INDEPENDENT TEST.** Who, other than the assertor, has checked it — over what scope, on what
   date? If nobody, record `NO ASSURANCE` in those words. Do not soften it.
9. **VERDICT.** Exactly one of: `RELIABLE FOR THE PURPOSE` (naming the purpose), `RELIABLE WITH
   STATED LIMITS` (listing the limits), or `NOT ESTABLISHED`. Never "probably fine".
10. **RECORD.** Write to `squads/board/data/<figure-slug>-challenge.md` with the date, the artifacts
    examined, and the verdict.

## Special routing — allegations

If, at any point, the challenge surfaces an allegation of fraud, misconduct or retaliation, it is
surfaced immediately and in the open — never summarized into a caveat or a footnote. It routes to
the confidential channel review and to `@board-chief` for immediate agenda placement, and the
figure challenge continues separately.

## Acceptance criteria

- The assertion is restated with its basis and its comparative basis before any interpretation.
- A named person or function is identified as the assertor.
- Definition stability is tested and reported even when the answer is "unchanged".
- Judgements are reported as a range with a direction finding, not as a single point.
- A falsifier is named, or its absence is stated explicitly.
- Assurance is recorded with party, scope and date, or `NO ASSURANCE` appears verbatim.
- The verdict is one of the three permitted values.
- The output states that it is not a statutory audit, carries no audit opinion, and is input for
  the appointed auditor and the directors.
- Nothing produced designs a control (`@risk-oversight`), rules on board composition
  (`@governance-counsel`), assesses a person (`@succession-lead`), or runs a code quality gate
  (`@qa`).

## Where the output goes

| Destination | What it receives |
|---|---|
| `@board-chief` | The verdict and the judgements range, for agenda placement where the range changes the decision |
| `@risk-oversight` | Any exposure revealed behind an unreliable figure, once the figure question is settled |
| `@governance-counsel` | Findings where the reporting line itself is structurally incapable of carrying the evidence |
| Appointed external auditor | The challenge as a question set — never as a conclusion about their opinion |
| External qualified counsel | Any filing, disclosure-obligation or regulatory question, unmodified |

## Reference files

- `squads/board/agents/audit-lead.md` — full source attribution, control and assurance models
- `squads/board/squad.yaml` — squad manifest and handoff matrix
- `.aexos-core/development/tasks/execute-checklist.md` — driver for the judgements pass
- `.aexos-core/development/checklists/self-critique-checklist.md` — applied to the draft before circulation
