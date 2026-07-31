---
task: Extract Obligation Register
responsavel: "@legal-ops"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - agreement: The executed and final agreement, complete with every amendment (required)
  - parties_and_dates: Identity of the document, its parties, effective date and term as stated on its face (required)
  - owner_candidates: The business roles available to own each obligation (required)
  - lead_time_policy: How far ahead an owner must be warned for each class of date (optional, default: two-stage alerting)
  - existing_register: The current contract or obligation register, where one exists, for reconciliation (optional)
Saida: |
  - obligation_register: One row per administratively visible obligation — date, duty, clause reference, owner, lead time, action date
  - ambiguous_list: Items whose date or duty depends on interpreting wording rather than reading it, routed to counsel as questions
  - removed_items: Candidate entries dropped for having no clause reference, listed rather than estimated
  - register_gaps: Amendments, annexes or referenced documents not supplied, named explicitly
  - boundary_stamp: The administrative-extraction, not-interpretation, not-advice, not-privileged notice
  - legalops_brief: Versioned markdown file under docs/ carrying the register, the AMBIGUOUS list and the notices at the top
Checklist:
  - "[ ] Confirm the document is executed and final and that every amendment is present"
  - "[ ] Give every register entry a clause reference; remove any entry that cannot carry one"
  - "[ ] Record only administratively visible items — dates, durations, notice periods, deliverables, reporting duties, payment milestones, stated contacts"
  - "[ ] Mark as AMBIGUOUS any item whose date or duty requires interpreting the wording, and enter it as a question rather than a fact"
  - "[ ] Confirm no entry summarises the agreement or characterises an obligation as onerous, standard, favourable or risky"
  - "[ ] Assign a named owner and a lead time to every obligation, and compute the action date"
  - "[ ] Flag automatic-renewal mechanics prominently"
  - "[ ] LICENSED-REVIEW CHECK: route the whole AMBIGUOUS list to a qualified lawyer as a written question set, listed at the top of the artefact, and confirm no clause has been interpreted anywhere in the output"
  - "[ ] State that nothing here is privileged, and stop and route to counsel before capturing anything about a contentious matter"
  - "[ ] Write the register to a versioned file under docs/ with a date and a named owner"
---

# *obligation-map — Extract Obligation Register

Materialises the `*obligation-map` command of `@legal-ops` (Codex). Extracts administrative
obligations from an executed agreement into a tracked register: dates, notice periods, deliverables
and reporting duties, each with a clause reference, an owner and a lead time.

## Purpose

Most contract lifecycles stop at signature, and that is where the money is lost. A renewal nobody
tracked, a notice window that closed, an automatic extension nobody decided to accept — these are the
most common and most avoidable legal costs, and none of them require a legal question to prevent.
They require a register that records what the document *states* and a calendar that fires before the
date rather than after it.

## Attribution

The basis here is the legal operations discipline: running an organisation's legal work as a managed
business function — intake, triage, lifecycle, tracked obligations, vendor management, visible spend,
metrics. It is a professional-community discipline rather than a single-author work, and it is named
that way deliberately: misattributing a body of practice to an author it does not have would be worse
than naming it plainly. The usual organising reference is the core competency model published by the
Corporate Legal Operations Consortium (CLOC), a professional association of practitioners. That model
has been revised since first publication; anyone citing it externally should read the current version
from CLOC's own published materials rather than relying on a description of it.

## Professional limit

Legal operations is not the practice of law. This task is not a lawyer, holds no bar admission, and
gives no legal advice under any framing — not as an opinion, not as a view, not as "what usually
happens", not as a starting point for counsel to correct. It does not interpret clauses, assess
enforceability or validity, evaluate legal risk, recommend a position, draft or redline language,
opine on compliance or lawfulness, or produce anything for a court, regulator, authority,
counterparty or opposing party. The register records what the document states and where it states it;
every item whose meaning is in question is an input for a qualified lawyer.

**Nothing here is privileged.** Privilege attaches to lawyers, and how it operates in a given
jurisdiction is itself a question for counsel. Anything written into this workflow should be assumed
disclosable. If the matter is contentious, sensitive, or could become a dispute, stop and take it to
counsel before writing anything further anywhere.

## Pre-conditions

- The agreement is executed and final. Drafts are not registered; a register built on a draft becomes
  wrong silently.
- Every amendment, annex and incorporated document is supplied, or its absence is recorded as a gap.
- The business roles available to own obligations are known, so that an obligation is never owned by
  "the company".
- The matter is not contentious. If it is, this task does not run — the matter goes to counsel first.

## Procedure

1. **Confirm the document.** Executed, final, complete with amendments. Record its identity, date and
   parties exactly as they appear on the face of the document.
2. **Record the gaps first.** Any referenced annex, schedule or amendment not supplied is named as a
   gap before extraction begins, so an incomplete register is never mistaken for a complete one.
3. **Extract only administratively visible items:** dates, durations, notice periods, renewal
   mechanics as stated, deliverables, reporting duties, payment milestones, and stated points of
   contact.
4. **Give every entry a clause reference.** An entry that cannot carry one is removed and listed as
   removed — never estimated into the register.
5. **Assign a named owner and a lead time** to each obligation: how far ahead that owner must be
   warned. Compute the action date by subtracting the lead time from the deadline, and treat the
   action date as the real date.
6. **Mark AMBIGUOUS** any item where the date or the duty depends on interpreting the wording rather
   than reading it — conditional triggers, cross-referenced definitions, notice mechanics whose start
   point is arguable. Ambiguous items never enter the register as facts.
7. **Do not characterise anything.** No summary of the agreement, no description of an obligation as
   onerous, standard, favourable or risky, no assessment of what a clause permits. Those are legal
   assessments and this task does not make them, including when the answer looks obvious.
8. **Flag automatic-renewal mechanics prominently.** They are the most common source of unintended
   commitment and the one most often discovered after the window closed.
9. **Route the AMBIGUOUS list to counsel** as a written question set: the clause, the specific
   question, the business decision that depends on it, and the deadline. Offer to assemble the
   instruction pack; include no legal analysis and no proposed answer in it.
10. **Stamp and capture.** Boundary and privilege notices at the top, then the register, then the
    AMBIGUOUS list, then the gaps and removals. Write to a versioned file under `docs/` with a date
    and a named owner, and reconcile against the existing contract register to find agreements nobody
    registered.

## Acceptance criteria

- Every register entry carries a clause reference; entries without one appear only in the removed list.
- No entry interprets, summarises or characterises any clause.
- Every obligation has a named owner, a lead time and a computed action date.
- Ambiguous items appear only in the AMBIGUOUS list, as questions, and the whole list is routed to a
  qualified lawyer in writing.
- Automatic-renewal mechanics are flagged prominently.
- Missing amendments, annexes and referenced documents are named as gaps.
- The boundary notice and the privilege notice appear at the top of the artefact, not as footnotes.
- The register exists as a versioned file with date and owner, and has been reconciled against the
  contract register for completeness.

## Handoff

| Destination | When |
|---|---|
| A qualified lawyer | The entire AMBIGUOUS list, and any question of meaning, enforceability, validity, risk, position, drafting, compliance or dispute |
| Counsel, before anything further is written | The moment a matter looks contentious — the operational record is unprivileged |
| `@business-admin:finance-lead` | The cash and cost consequence of the dated commitments — the reading, never the treatment |
| An accountant | How any contractual item is recognised, measured or disclosed |
| `@business-admin:process-lead` | Ownership, alerting and the surrounding administrative process that lets dates be missed |
| `@business-admin:people-lead` | Where the agreement is an employment instrument — practice design only, individual matters go to employment counsel |
| `@business-admin:admin-chief` | When the register contradicts another squad artefact, or the request spans disciplines |
| `@pm` | When the finding needs epic framing — this squad writes no epic, PRD or story |
| `@devops` | Git push, PRs and CI/CD, exclusive authority — never performed here |

## Related

- Agent: `squads/business-admin/agents/legal-ops.md` (Codex) — `*obligation-map`, `*renewal-calendar`, `*counsel-brief`, `*professional-boundary`
- Optional accelerator: `.aexos-core/development/tasks/advanced-elicitation.md` — mapping the lifecycle with stakeholders
- Optional accelerator: `.aexos-core/development/tasks/create-doc.md` — capture driver for the brief
- Optional accelerator: `.aexos-core/development/checklists/self-critique-checklist.md` — applied before capture
- Manifest: `squads/business-admin/squad.yaml`
