---
task: Triage Administrative Request
owner: "@admin-chief"
owner_type: agent
atomic_layer: task
Input: |
  - request: The administrative question or initiative, in the requester's own words (required)
  - decision: The business decision that depends on the answer, and its deadline (optional)
  - existing_artefacts: Squad artefacts already produced for this initiative, with their dates (optional)
  - contentious_signal: Whether the matter is, or could become, a dispute, claim or demand (optional, default: unknown)
Output: |
  - gate_verdict: inside | outside | split, with the licensed professional named for every outside part
  - referral_questions: One written question per outward referral, plus the list of what to bring that professional
  - restatement: The request expressed in the owning discipline's vocabulary, confirmed by the requester
  - owner: Exactly one squad specialist, with each near-miss discipline named and excluded with a reason
  - handoff_brief: Restated problem, evidence that already exists, the specialist's starting point, outstanding referrals
  - triage_record: Versioned markdown file under docs/ carrying all of the above, with date and owner
Checklist:
  - "[ ] Run the regulated-referral gate before producing any content"
  - "[ ] Treat every unclear or borderline classification as regulated"
  - "[ ] Confirm no regulated part of the request has been routed to a squad specialist"
  - "[ ] Raise the privilege warning when the matter is or could become contentious"
  - "[ ] Restate the request and get the restatement confirmed before routing"
  - "[ ] Name exactly one owning specialist and exclude the near misses with a stated reason"
  - "[ ] Verify every outward referral is written as a directly answerable question and recorded"
  - "[ ] LICENSED-REVIEW CHECK: list every accountant, tax adviser, auditor, lawyer, qualified HR or control-owner review this request requires, at the top of the artefact and not as a footnote"
  - "[ ] Confirm the output creates no epic, PRD, story, implementation plan or release action"
  - "[ ] Write the triage record to a versioned file under docs/ with a date and a named owner"
---

# *diagnose — Triage Administrative Request

Materialises the `*diagnose` command of `@admin-chief` (Steward), the entry point of the
`business-admin` squad. Runs the regulated-referral gate, restates the request in the vocabulary of
the discipline that actually owns it, names a single owner, and produces a handoff brief.

## Purpose

Administrative requests arrive stated in the language of their symptom rather than of their cause,
and this squad works beside four regulated professions. Two failures are therefore possible on every
request: routing it to the wrong specialist, and answering it at all when it belonged to a licensed
professional. The second is the more damaging, because a competent-sounding answer gets relied on.
This task removes both by gating first and routing second.

## Professional limit

This task produces a routing decision and a written referral. It produces no accounting, tax,
statutory, legal, employment or compliance opinion, and nothing here is privileged. Everything the
gate marks as outside the squad is an input for a licensed professional to answer — never a question
this squad answers indirectly through one of its specialists. Routing is not a laundering mechanism.

## Pre-conditions

- The request is available in the requester's own words, not already paraphrased into a solution.
- The requester is reachable to confirm the restatement. If not, the restatement is marked
  UNCONFIRMED and the handoff says so.
- `squads/business-admin/squad.yaml` is readable for the current specialist roster.
- No git push, PR, MCP or CI/CD action is expected from this task; those belong to `@devops`.

## Procedure

1. **Record the request verbatim.** Capture who asked, what decision depends on it, and the deadline.
   A request with no decision attached is usually curiosity, and should be labelled as such.
2. **Run the regulated gate, row by row.** Classify against each of the six referral categories:
   accountant, tax adviser, auditor, lawyer, qualified HR and employment counsel, control owner.
   - Recognition, measurement, disclosure, classification, bookkeeping, closing, anything for
     external reliance, valuation for a transaction → **accountant**.
   - Any tax treatment, planning question or filing position → **tax adviser**.
   - Assurance, audit, review, certification, any statement that books or controls are correct →
     **auditor**.
   - What a clause means or permits, enforceability, validity, lawfulness, negotiating positions,
     drafting, redlining, disputes, regulators, retention, data protection, corporate structure and
     delegations → **lawyer**.
   - Any individual employment matter, lawfulness of a people practice, consultation obligations,
     employee-data processing → **qualified HR and employment counsel**.
   - Whether a financial, legal or regulatory control may be removed, weakened or retimed, and
     segregation of duties → **the control owner**.
3. **Resolve ambiguity against the boundary.** If the classification is unclear, it is regulated.
   Over-referring costs an email; under-referring costs a filing, a claim or a case.
4. **Check for privilege exposure.** If the matter is or could become contentious, state that nothing
   in this squad is privileged and advise stopping the written record until counsel says how to
   proceed. Do this before anything further is written, not after.
5. **Split mixed requests explicitly.** Name which part stays inside the squad, which part leaves,
   and mark the seam on the artefact so nobody implements past it.
6. **Write each outward referral.** One sentence stating the question the professional can answer
   directly, the documents and facts to bring, the decision it supports, and the deadline. Record it
   so the answer can later be matched to the question that produced it.
7. **Restate the inside part.** Express it in the owning discipline's vocabulary and confirm the
   restatement with the requester before proceeding. A silent reframe answers a different question
   than the one asked.
8. **Test the restatement against the known reframing patterns.** Profitable-but-no-cash is usually
   terms and collection, not finance. Slow-and-expensive-legal is usually queues, not counsel.
   Hire-faster is usually decision rights, not assessment. Automate-our-admin is a value-test
   question before it is a tool question.
9. **Name exactly one owner** from `finance-lead`, `people-lead`, `legal-ops`, `process-lead`. List
   the near-miss disciplines and state why each was excluded. If several are genuinely required,
   order them by dependency rather than broadcasting: obligations before cost, cost before pay
   design, process map before automation, contract terms before collection process.
10. **Give a short usable answer only where the question is genuinely a management question.** Where
    it is not, give none and say why.
11. **Write the handoff brief:** restated problem, evidence that already exists and where it lives,
    what the specialist should start with, and any professional referral already outstanding.
12. **Capture.** Write the triage record to a versioned markdown file under `docs/` with a date and a
    named owner, licensed-review list at the top.

## Acceptance criteria

- Every request is classified against all six gate categories before any content is produced.
- No regulated question is answered, softened, hedged, or routed to a squad specialist.
- Every outward referral exists as a written, answerable question with a recorded date.
- The privilege warning is raised on any contentious or potentially contentious matter.
- Exactly one owning specialist is named, and near misses are excluded with reasons.
- The routed specialist accepts the request as theirs without re-routing.
- Every statement in the record traces to the request or to an existing artefact; nothing is invented
  (Constitution Article IV).
- The record contains no epic, PRD, story, implementation plan or release instruction.
- The record exists as a versioned file, not as a conversation.

## Handoff

| Destination | When |
|---|---|
| `@business-admin:finance-lead` | Statements, profit versus cash, number quality, ratios, cash cycle, runway, return cases |
| `@business-admin:people-lead` | Hiring bar, structured interviewing, calibration, conversation separation, pay logic, manager effectiveness |
| `@business-admin:legal-ops` | Contract lifecycle, intake, obligation registers, escalation rules, counsel management, legal spend |
| `@business-admin:process-lead` | End-to-end mapping, handoffs and queues, control inventory, resequencing, capture-once, automation gating |
| A licensed professional | Every part the gate marked outside, with the written question attached |
| `@pm` | When the squad's findings are complete and need epic framing — this squad writes no epic and no PRD |
| `@sm` | Story creation, exclusive authority — never performed here |
| `@devops` | Git push, PRs, MCP and CI/CD, exclusive authority — never performed here |

## Related

- Agent: `squads/business-admin/agents/admin-chief.md` (Steward) — `*diagnose`, `*regulated-check`, `*sequence`
- Optional accelerator: `.aexos-core/development/tasks/advanced-elicitation.md` — intake elicitation
- Optional accelerator: `.aexos-core/development/tasks/create-doc.md` — capture driver
- Optional accelerator: `.aexos-core/development/checklists/self-critique-checklist.md` — applied before capture
- Manifest: `squads/business-admin/squad.yaml`
