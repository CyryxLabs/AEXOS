---
task: Build Profit To Cash Bridge
owner: "@finance-lead"
owner_type: agent
atomic_layer: task
Input: |
  - period: The reporting period under examination, with explicit start and end dates (required)
  - reported_result: The reported profit or loss for that exact period, with its source document (required)
  - cash_movement: Opening and closing cash for the same dates, with its source (required)
  - entity_scope: Which legal entity or consolidation the figures cover (required)
  - basis: Accrual or cash, gross or net, currency, and what is included or excluded (required)
  - supporting_records: Fixed asset register, ledger balances at both period ends, stock report, capex and financing detail (optional but each missing item becomes an unexplained residual)
Output: |
  - bridge_table: Each bridge item with amount, named source and class (non-cash, working capital, investing, financing, one-off)
  - residual: The unexplained remainder, shown as its own line and never absorbed into another
  - dominant_driver: The largest contributor to the gap, classified as structural or timing
  - closing_actions: What would close the gap and which role controls it
  - referral_list: Every item requiring an accountant, tax adviser or auditor, written as an answerable question
  - financial_brief: Versioned markdown file under docs/ with sources, assumptions, boundary notice at the top
Checklist:
  - "[ ] Confirm the result and the cash movement cover identical dates, entity and basis"
  - "[ ] Attach a named source to every figure before it enters the bridge"
  - "[ ] Mark any figure without a traceable source as UNSOURCED and keep it out of the conclusion"
  - "[ ] Show the unexplained residual as its own line rather than smoothing it into another"
  - "[ ] Classify the dominant driver as structural or timing, with the evidence for the classification"
  - "[ ] Present any working-capital release as a one-time release plus a lower ongoing requirement, never as recurring income"
  - "[ ] LICENSED-REVIEW CHECK: list every recognition, measurement, disclosure, tax or assurance question this reading surfaced, routed to a named professional at the top of the artefact"
  - "[ ] Confirm no line of the output states or implies an accounting or tax treatment"
  - "[ ] Confirm the artefact carries the professional-limit notice at the top, not as a closing caveat"
  - "[ ] Write the brief to a versioned file under docs/ with a date and a named owner"
---

# *profit-vs-cash — Build Profit To Cash Bridge

Materialises the `*profit-vs-cash` command of `@finance-lead` (Abacus). Reconciles reported profit
against the change in cash for the same period and names every bridge item that explains the gap.

## Purpose

Profit and cash are two different measurements that routinely disagree, and a healthy-looking company
running out of money is the most common consequence of not knowing why. Profit depends on when
revenue is recognised, how costs are matched, what is capitalised and how it is depreciated. Cash
depends on what actually moved. This task makes the difference between them explicit, item by item,
so the company argues about a sourced bridge instead of about which report is right.

## Attribution

The framework applied here is published by Karen Berman and Joe Knight in *Financial Intelligence: A
Manager's Guide to Knowing What the Numbers Really Mean* (Harvard Business School Press, 2006,
written with John Case). It is applied with attribution. The framework is a management-literacy
framework: it teaches managers to read and question financial information, and it qualifies nobody
to prepare, certify or opine on it.

## Professional limit

This is a management reading of movements between two dates, produced for internal decision-making.
It is not an audit, a review, a reconciliation certified by anyone, an assurance engagement, a
valuation, or a statement about how any item should be recognised, measured, disclosed, classified or
taxed. Nothing produced here is for external reliance and nothing here is for a tax authority,
regulator, auditor, lender or court. Every treatment question surfaced by the bridge is an input for
a licensed accountant, tax adviser or auditor to answer, and the output says so at the top.

## Pre-conditions

- The period start and end dates are fixed and identical for both the result and the cash movement.
- The entity boundary and reporting basis are stated. If unknown, stop and establish them; a bridge
  across mismatched scopes produces confident conclusions about nothing.
- Each supporting record is either available or explicitly recorded as unavailable.
- No figure enters the work until its source is named.

## Procedure

1. **Fix the scope.** State entity, period, source document per figure, basis and currency before any
   number is discussed. Refuse to compare two figures until this is settled.
2. **Take the two endpoints.** Reported result for the period, and closing cash minus opening cash
   for the same dates. State the gap to be explained as a single figure.
3. **Build the bridge item by item**, each with a named source and a class:
   - non-cash charges: depreciation, amortisation, impairment, provisions;
   - working capital: movement in receivables, inventory, payables, accruals, prepayments;
   - investing: capital expenditure and disposals;
   - financing: drawdowns, repayments, capital movements;
   - one-off items, listed individually rather than netted.
4. **Quarantine the unsourced.** Any item that cannot be traced is not estimated into place. It is
   listed as an unexplained residual, visibly, and left for someone to trace.
5. **Name the dominant driver** of the gap and classify it as structural — business model, granted
   terms, growth — or as timing, such as a single late collection or early payment. State the
   evidence that supports the classification rather than asserting it.
6. **Separate growth from execution** where receivables dominate. Growth alone raises receivables;
   any additional movement in receivable days is a collection or terms change, and the two have
   different owners.
7. **State what would close the gap and who controls it.** Where the lever is terms, invoicing lag,
   collection discipline, stock policy or approval delay, name the operating owner rather than
   filing it under finance.
8. **Quantify any proposed release honestly.** A working-capital improvement is a one-time cash
   release plus a permanently lower requirement at the current volume. It is never recurring income
   and must not be presented as run rate.
9. **Run the boundary classification.** Anything that turns on how an item should be recognised,
   measured, disclosed, classified or taxed stops here and goes to the accountant, written as a
   question they can answer directly, with the documents to attach listed.
10. **Capture.** Write the brief to a versioned file under `docs/`, professional-limit notice at the
    top, figures with sources, assumptions in their own section with whoever supplied each, and the
    referral list prominent.

## Acceptance criteria

- Result and cash movement verified as covering identical dates, entity and basis before any bridge
  item is presented.
- Every bridge item carries a named source; unsourced items appear only as a visible residual.
- The residual is shown, quantified and left unabsorbed.
- The dominant driver is named and classified structural or timing with supporting evidence.
- No line states or implies an accounting, tax or disclosure treatment.
- No part of the output is presented as assurance, audit, certification or external-reliance material.
- Any working-capital release is presented as one-time plus a lower ongoing requirement.
- Every licensed-professional item is identified, named and written as an answerable question, listed
  at the top of the artefact.
- The brief exists as a versioned file with date, owner, sources and assumptions (Constitution
  Article IV — no figure without a source enters a conclusion).

## Handoff

| Destination | When |
|---|---|
| A licensed accountant | Recognition, measurement, disclosure, classification, closing, statutory reporting |
| A tax professional | Any tax treatment, planning question or filing position surfaced by the bridge |
| An external auditor | Any assurance, audit or certification requirement — this reading is explicitly not assurance |
| `@business-admin:legal-ops` | When the driver is contractual payment terms or a commitment — for the process, never for a legal opinion |
| `@business-admin:process-lead` | When the driver is invoicing lag, approval queues or collection handoffs |
| `@business-admin:people-lead` | When the driver is a people-cost or headcount-structure question |
| `@business-admin:admin-chief` | When this reading contradicts another squad artefact |
| `@pm` | When the finding needs to become an epic — this squad writes no epic, PRD or story |
| `@devops` | Git push, PRs and CI/CD, exclusive authority — never performed here |

## Related

- Agent: `squads/business-admin/agents/finance-lead.md` (Abacus) — `*profit-vs-cash`, `*cash-cycle`, `*number-quality`, `*professional-boundary`
- Optional accelerator: `.aexos-core/development/tasks/advanced-elicitation.md` — drawing assumptions out of stakeholders
- Optional accelerator: `.aexos-core/development/tasks/create-doc.md` — capture driver for the brief
- Optional accelerator: `.aexos-core/development/checklists/self-critique-checklist.md` — applied before capture
- Manifest: `squads/business-admin/squad.yaml`
