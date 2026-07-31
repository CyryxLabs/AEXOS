---
task: Define Hiring Standard
owner: "@people-lead"
owner_type: agent
atomic_layer: task
Input: |
  - role: The role the bar is being defined for, as a role and never as a named person (required)
  - first_year_outcomes: What the role must produce in its first year, stated as outcomes not duties (required)
  - assessment_surface: Which stages exist in the loop and roughly how much interview time is available (required)
  - existing_practice: The current bar, questions or rubric if any exist, for comparison (optional)
  - organisation_context: Size, hiring volume and evidence volume per decision, used for transfer caveats (optional)
Output: |
  - assessed_attributes: Four or five attributes derived from the outcomes, no more
  - behavioural_anchors: Three or four observable levels per attribute, written before any candidate is seen
  - disqualifiers: Stated explicitly and kept separate from the scored attributes
  - interviewer_assignment: Which interviewer assesses which attribute, so nothing is assumed covered
  - discarded_attributes: Attributes removed because they cannot be evidenced, with the reason
  - transfer_caveats: Which parts of the design depend on organisation size, selectivity or evidence volume
  - counsel_review_list: The full list of items requiring employment counsel and qualified HR before use
  - people_brief: Versioned markdown file under docs/ with the design, rationale, attribution and review list
Checklist:
  - "[ ] Confirm the request concerns a role and contains no named individual and no personal data"
  - "[ ] Write the first-year outcomes before deriving any attribute; stop if they cannot be written"
  - "[ ] Cap assessed attributes at four or five and record what was cut"
  - "[ ] Write behavioural anchors per level before any candidate is seen"
  - "[ ] Remove every attribute that cannot be evidenced in an interview or a work sample"
  - "[ ] State disqualifiers separately from the scored attributes"
  - "[ ] Assign each attribute to a specific interviewer"
  - "[ ] State the transfer caveat where a practice depends on scale, selectivity or evidence volume"
  - "[ ] Reproduce the direction of published selection-method findings only; reproduce no validity coefficients from memory"
  - "[ ] LICENSED-REVIEW CHECK: assemble the qualified HR and employment counsel review list covering discrimination and adverse impact, data protection, works councils and collective agreements, and jurisdictional variation — at the top of the artefact, and confirm the bar is not used with any real candidate before that review completes"
  - "[ ] Write the brief to a versioned file under docs/ with a date and a named owner"
---

# *hiring-standard — Define Hiring Standard

Materialises the `*hiring-standard` command of `@people-lead` (Roster). Defines the bar for a role:
the small set of assessed attributes, what each level of each attribute looks like in observable
evidence, and what disqualifies.

## Purpose

Most hiring bars are habits rather than designs. Nobody can state what the bar is, each manager
applies a private version of it, and the interview produces confident disagreement instead of signal.
A written bar with behavioural anchors makes the standard the same across interviewers, makes lowering
it a visible act, and gives the loop something to score against rather than an impression to defend.

## Attribution

The framework applied here is published by Laszlo Bock in *Work Rules! Insights from Inside Google
That Will Transform How You Live and Lead* (2015). It is applied with attribution; this task does not
speak as the author. Two caveats travel with the source and are stated rather than glossed:

1. The book reports practices developed inside one very large, unusually selective and unusually
   well-funded organisation. Several do not transfer intact to a small one, and this task names which
   parts of a given design depend on scale, selectivity or the volume of evidence behind a decision.
2. Where the source cites published research on the predictive validity of selection methods, this
   task reproduces the **direction** of the finding — structured methods substantially outperform
   unstructured interviews — and reproduces **no specific validity coefficients from memory**. A
   misquoted statistic is worse than a described one.

## Professional limit

This task designs a practice. It is not HR, not employment counsel, not labour relations and not
compliance. It issues no legal, employment, labour, discrimination, immigration, benefits, payroll or
compliance opinion, and it assesses nothing for lawfulness in any jurisdiction. It handles no
individual case of any kind — no grievance, discipline, dismissal, accommodation, investigation or
improvement plan for a named person — and it does not collect, request or process personal data about
identifiable individuals. Selection criteria carry discrimination and adverse-impact exposure in every
jurisdiction, so the bar produced here is an input for qualified HR and employment counsel to review
and must not touch a real candidate before that review completes. This is said on every artefact, not
once.

## Pre-conditions

- The request concerns a role, not a person. If a named individual appears anywhere in the request,
  stop and route to qualified HR and employment counsel.
- No personal data has been supplied. If it has, it is not used and its presence is flagged.
- The first-year outcomes can be written. If they cannot, the role is not ready to hire for and that
  is the finding.
- `@business-admin:finance-lead` owns affordability and headcount cost; this task does not read money.

## Procedure

1. **State what the role must produce in its first year**, in outcomes rather than duties. If this
   cannot be written down, stop: the role is not ready to hire for, and defining a bar against
   undefined outcomes produces a bar that measures familiarity.
2. **Derive at most four or five assessed attributes** from those outcomes. More than five cannot be
   assessed reliably in one loop and produces overlapping noise that reads as thoroughness.
3. **Write behavioural anchors** at three or four levels per attribute: what a weak, an adequate and
   a strong answer actually looks like, in observable terms. Write them before anyone is seen.
4. **State the disqualifiers explicitly** and keep them separate from the scored attributes so that a
   disqualifier is never traded off against a strong score elsewhere.
5. **Remove every attribute that cannot be evidenced** in an interview or a work sample. Unevidenceable
   attributes — "culture fit", "smart", "hungry" — become similarity bias in practice regardless of
   intent. Record what was removed and why.
6. **Assign each attribute to a specific interviewer**, so that nobody assesses everything and nobody
   assumes someone else covered it. Coverage gaps are otherwise discovered at the decision meeting.
7. **State the transfer caveats.** Name which parts of the design assume hiring volume, a deep
   applicant pool, or enough evidence per decision that a single observation does not drive it. In a
   small organisation, say what the design becomes instead.
8. **Prepare the escalation boundary.** State on the artefact that anything about a named person —
   assessment disputes, accommodation requests, anything raised during a loop that concerns conduct
   or lawfulness — leaves this task immediately for qualified HR and employment counsel.
9. **Assemble the counsel-review list** as a separate prominent section: discrimination and
   adverse-impact exposure of each criterion, data protection over the evidence recorded,
   works-council and collective-agreement obligations, and jurisdictional variation across every
   location that will use the bar.
10. **Capture.** Write the brief to a versioned file under `docs/` with the design, the rationale with
    attribution split into framework / internal measurement / assumption, the transfer caveats, the
    measurement plan and review date, and the professional-limit notice at the top.

## Acceptance criteria

- No named individual and no personal data appears anywhere in the input or the output.
- First-year outcomes are written before any attribute is derived.
- Assessed attributes number four or five, with removals recorded and justified.
- Every attribute has behavioural anchors at three or four observable levels, written before any
  candidate is seen.
- Disqualifiers are stated separately from scored attributes.
- Every attribute is assigned to a named interviewer role.
- Transfer caveats state which elements depend on organisation scale, selectivity or evidence volume.
- Published selection-method findings appear as direction only, with no coefficient reproduced.
- The counsel-review list is prominent and states that the bar is not used with a real candidate
  before qualified HR and employment counsel have reviewed it.
- The brief exists as a versioned file with date, owner and attributed rationale.

## Handoff

| Destination | When |
|---|---|
| Qualified HR and employment counsel | Review before use, and immediately for anything about a named person, lawfulness, discipline, dismissal, accommodation or investigation |
| A payroll, benefits or immigration specialist | Anything in those domains raised while defining the role |
| `@business-admin:finance-lead` | Affordability, headcount cost and people-cost structure |
| `@business-admin:legal-ops` | Employment contracts and policy documents as a managed process, never for their content |
| `@business-admin:process-lead` | Scheduling, approval and coordination delays inside the hiring loop |
| `@business-admin:admin-chief` | When the request spans disciplines or contradicts another squad artefact |
| `@pm` | When the finding needs epic framing — this squad writes no epic, PRD or story |
| `@devops` | Git push, PRs and CI/CD, exclusive authority — never performed here |

## Related

- Agent: `squads/business-admin/agents/people-lead.md` (Roster) — `*hiring-standard`, `*structure-interview`, `*work-sample`, `*professional-boundary`
- Optional accelerator: `.aexos-core/development/tasks/advanced-elicitation.md` — defining a bar with stakeholders
- Optional accelerator: `.aexos-core/development/tasks/create-doc.md` — capture driver for the brief
- Optional accelerator: `.aexos-core/development/checklists/self-critique-checklist.md` — applied before capture
- Manifest: `squads/business-admin/squad.yaml`
