---
task: Governance Audit
owner: "@governance-counsel"
owner_type: agent
atomic_layer: task
Input: |
  - organization: The organization under audit, and which body is being treated as the board (required)
  - adaptation_note: Statement of how the subject differs from a UK listed company board, the Cadbury Code's original scope (required)
  - governance_artifacts: Paths to any of - schedule of reserved matters, delegation policy, committee terms of reference, minutes, register of interests, appointment letters, board composition list (optional)
  - period: The twelve-month window used for the operated-not-just-existing test (optional, default: last 12 months)
Output: |
  - provision_table: Per provision - PRESENT | ASSERTED | ABSENT | NOT APPLICABLE, with the artifact or its absence named
  - gap_ranking: Gaps ordered by structural consequence, not by effort to fix
  - remediation_list: Per gap - the provision, its source, the concrete artifact that would close it, and the owner
  - attribution_map: Every recommendation marked as Cadbury Code provision, DERIVED, or this agent's construction
  - limit_note: Explicit statement that no legal, statutory or listing-rule conclusion is offered
  - audit_record: Path to the versioned governance audit written under squads/board/data/
Checklist:
  - "[ ] Scope stated and the adaptation from the Cadbury Code's original scope declared in writing"
  - "[ ] Evidence gathered or its absence recorded per artifact class"
  - "[ ] Every provision marked PRESENT, ASSERTED, ABSENT or NOT APPLICABLE with a reason"
  - "[ ] Operated-not-just-existing test applied to every PRESENT provision"
  - "[ ] Gaps ranked by structural consequence, unfettered-decision gaps first"
  - "[ ] Each gap carries a named closing artifact and an owner"
  - "[ ] Anything beyond the Cadbury Code marked DERIVED or as this agent's construction"
  - "[ ] No compliance claim written that the artifacts do not support"
  - "[ ] Human-review clause present in the output"
  - "[ ] Audit record written to a versioned file under squads/board/data/"
---

# Governance Audit

Materializes `@governance-counsel *governance-audit`.

## Purpose

Diagnose whether the structure of authority actually exists, or is merely asserted. The audit
separates three states that ordinary governance reporting collapses into one: a provision that has
a current artifact, a provision that is claimed with no artifact, and a provision that is absent.
The output is a ranked gap list where each gap names the instrument that would close it.

## Attribution

This task applies the framework published as the *Report of the Committee on the Financial Aspects
of Corporate Governance* — the **Cadbury Report**, issued in the United Kingdom in December 1992 —
together with its **Code of Best Practice**, and the body of corporate governance principle derived
from it.

Two attribution rules are binding on this task:

1. **Never present a general governance practice as a Code provision.** Anything not traceable to
   the Cadbury Report or its Code is marked `DERIVED` (successor codes or established practice) or
   as the agent's own `CONSTRUCTION`.
2. **Declare the adaptation.** The Cadbury Code addresses the boards of UK listed companies.
   Applying it to any other kind of organization is an analogy. Name the adaptation each time
   rather than presenting the original as though it were written for the case at hand.

No citation, title or year may be invented. If a provision cannot be sourced, it is reported as
unsourced rather than attributed.

## Professional limit — read before executing

A governance audit is **not** legal advice and **not** a statutory-audit or listing-rule
determination. It assesses structure, authority and record. Whether a given arrangement satisfies
companies legislation, a listing rule, a directors' duty at law, or any filing obligation is
outside this task entirely and goes to qualified counsel. The audit output is **input for review by
licensed professionals and by the directors themselves** — never the final governance opinion.

## Pre-conditions

1. `organization` is stated, and the body being treated as "the board" is named unambiguously.
2. `adaptation_note` exists. The audit does not proceed on an implicit assumption that the subject
   is a UK listed company.
3. If `governance_artifacts` paths are supplied, each resolves. Unresolvable paths are reported as
   evidence gaps, not skipped.

## Procedure

1. **SCOPE.** State the organization, name the body treated as the board, and write the adaptation
   note. This paragraph appears at the top of the output, not in a footnote.
2. **EVIDENCE GATHER.** Locate, in the repository or from the user: schedule of reserved matters,
   delegation policy, committee terms of reference, minutes, register of interests, appointment
   letters, board composition list. Record each as found (with path) or not found.
3. **MARK EACH PROVISION.** Work through the Code provisions in
   `squads/board/agents/governance-counsel.md` (`cadbury_reference` section) and mark:
   - `PRESENT` — a current artifact exists
   - `ASSERTED` — claimed, no artifact
   - `ABSENT` — no document, not claimed
   - `NOT APPLICABLE` — with the reason stated
   The provisions include: a clearly accepted division of responsibilities at the head of the
   organization; an independent element of sufficient calibre and number; a formal schedule of
   matters reserved to the board; written terms of reference for committees dealing clearly with
   authority and duties; an agreed procedure for directors to take independent professional advice
   at the organization's expense; and a balanced and understandable assessment of position.
4. **OPERATED TEST.** For every `PRESENT` provision, look for evidence within `period` that the
   structure was actually used. A committee with terms of reference and no minutes is downgraded to
   `ASSERTED`. A reserved-matters schedule that no decision was ever tested against is `ASSERTED`.
5. **RANK THE GAPS** by structural consequence, not by effort:
   1. Gaps that permit unfettered decision by one individual
   2. Gaps in the record — decisions that cannot be shown to have been taken properly
   3. Disclosure gaps
6. **REMEDIATE.** For each gap write: the provision, its source, the concrete artifact that would
   close it, and the named owner. Recommend an instrument, never an exhortation. "Be more
   independent" is not a remediation; "the senior independent member's fee is set by the board, not
   by the combined role-holder" is.
7. **ATTRIBUTE.** Pass over the whole output and mark every recommendation as a Code provision
   (with the provision named), `DERIVED`, or `CONSTRUCTION`.
8. **LIMIT.** Write the `limit_note` and the human-review clause.
9. **RECORD.** Write to `squads/board/data/<organization-slug>-governance-audit.md`, with the date
   and the artifacts examined listed by path.

## Acceptance criteria

- The adaptation from the Cadbury Code's original scope is declared in the output body.
- Every provision carries one of the four marks, and no provision is left unmarked.
- Every `PRESENT` mark survived the operated test, or was downgraded to `ASSERTED`.
- Gap ranking is by structural consequence; no gap is promoted or demoted by how easy it is to fix.
- Every gap names a closing artifact and an owner.
- No statement attributes to the Cadbury Report anything the Report does not contain.
- No compliance claim appears that the examined artifacts do not support; an `ASSERTED` provision
  is reported as a departure until the artifact exists.
- The output states that it is input for licensed human review and is not a legal opinion.
- Nothing produced crosses into risk appetite design, control evidence, succession assessment,
  implementation, testing or release.

## Where the output goes

| Destination | What it receives |
|---|---|
| `@board-chief` | The audit for agenda placement and coherence-chain positioning (mandate link) |
| `@risk-oversight` | Confirmation that a mandate exists, so appetite can be set against a defined authority |
| `@audit-lead` | Committee terms of reference and independence findings relevant to the assurance position |
| `@succession-lead` | Board-composition and tenure findings relevant to board's own continuity |
| External qualified counsel | Every statutory, listing-rule or directors'-liability question, unmodified |

This task does not draft epics (`@pm`), stories (`@sm`), implementations (`@dev`), tests (`@qa`) or
releases (`@devops`).

## Reference files

- `squads/board/agents/governance-counsel.md` — full Cadbury reference and provision list
- `squads/board/squad.yaml` — squad manifest and handoff matrix
- `.aexos-core/development/tasks/execute-checklist.md` — driver for the provision-by-provision pass
- `.aexos-core/development/checklists/self-critique-checklist.md` — applied to the draft before it is proposed
