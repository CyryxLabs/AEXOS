---
task: Stakeholder Account Report
owner: "@stakeholder-lead"
owner_type: agent
atomic_layer: task
Input: |
  - period: The reporting period being accounted for (required)
  - promise_register: The register of forward statements, or the sources needed to build it (required)
  - outcomes: Observable results for the period, in the units the promises used (required)
  - audience: Board, investors, employees or a named counterparty (required)
  - decision_records: Executive decision records covering the period, from @ceo-chief (optional)
  - prior_accounts: Accounts published for earlier periods, used for the consistency check (optional)
Output: |
  - account: Per promise due, the original wording, what happened, the variance, the cause and what changes
  - miss_reports: The fixed-structure report for each commitment not met
  - restatement_findings: Promises restated, disappeared, redefined or contradicted across periods
  - candour_findings: Quoted evasions with their plain replacements
  - counsel_flags: Every element requiring qualified human legal, securities, disclosure or accounting review
  - draft_path: Path of the draft held for human review
Checklist:
  - "[ ] Every promise due in the period pulled from the register"
  - "[ ] Each promise reported in its original wording, quoted with its date"
  - "[ ] Original terms and units used; any redefinition reported alongside, with when and by whom"
  - "[ ] Misses given the same prominence, section and voice as achievements"
  - "[ ] Each variance explained with a mechanism, not a mood"
  - "[ ] What changes as a result stated, with an owner"
  - "[ ] Commitment levels labelled distinctly: committed, forecast, aspiration"
  - "[ ] Consistency checked against prior periods for restatement and contradiction"
  - "[ ] Candour check run and every flagged instance quoted with its replacement"
  - "[ ] Counsel flags produced as a checklist for a named human reviewer"
  - "[ ] Output marked DRAFT for human review and not sent from here"
---

# Stakeholder Account Report

Materializes `@stakeholder-lead *account`. Reports against the promises that come due in a
period, in their original terms, including every miss, with the variance explained rather than
narrated.

## Purpose

Most communication failures observed in practice are not lies. They are the loss of the link
between what was said and what is later reported — at which point restating a target in more
favourable terms becomes possible without anyone deciding to deceive. This task treats the
promise and the account as one artifact separated by time, and closes that gap deliberately.

## Attribution

There is no single canonical work behind this task, and none is claimed. It applies the
documented professional discipline of shareholder and board communication — annual letters, board
reporting packs, management reports — which has observable conventions and a long practice
history but no single defining text. Where this procedure specifies a step, that step is the
agent's own. No phrase, quotation or claim is attributed to any named person, because a
fabricated attribution would be worse than none.

That some jurisdictions codify parts of the genre (for example, the narrative discussion required
alongside financial statements in United States securities filings) is noted only as evidence
that the genre has formal conventions. This task does not apply, interpret or advise on any
regulatory standard.

## Pre-conditions

- A promise register exists, or the sources to build one are available: board minutes and
  packets, investor updates, all-hands material, decision records, and any written commitment in
  the repository. Without the register there is nothing to account against, and this task halts.
- Outcome figures come from the system of record. A figure that cannot be sourced is marked
  UNVERIFIED and reported as unverified, never estimated into place.
- This task produces a DRAFT. It does not send board or investor material, and it does not decide
  what must be disclosed, when, or in what form.

## Procedure

### 1. Build or refresh the register

For every forward statement in the covered periods record: the statement in its **original
wording**, the audience, the date made, the metric or observable it refers to, the due date, the
person who made it, and the commitment level as it was expressed at the time — committed,
forecast, or aspiration.

Where the commitment level was not expressed, record it as AMBIGUOUS. That is itself a finding:
an ambiguous statement is remembered by the audience as a commitment and by the company as a
forecast. Where the metric is undefined or unmeasurable, mark it UNCHECKABLE.

Store the register as a versioned file in the repository. A register that is not versioned cannot
be audited, which defeats its purpose.

### 2. Pull what is due

Select every promise from the register with a due date inside the period. Do not filter by
outcome. A promise omitted because it was missed is the exact failure this task exists to
prevent.

### 3. Account, in fixed order

For each promise, report in this order and no other:

1. **The original wording**, quoted, with its date.
2. **What happened** — the observable outcome, in the original units.
3. **The variance** — stated numerically where possible, without qualifiers.
4. **The cause** — a mechanism, not a mood. "Demand softened" is a mood; "two of four
   concentrated renewals slipped a quarter, which is 31% of recurring revenue" is a mechanism.
   Distinguish what the company controlled from what it did not, and do not overweight the
   second: a report attributing everything to external conditions reads as evasion even when it
   is true.
5. **What changes** — the decision or process that is different now, with an owner. An account
   with no consequence teaches the reader that the promises do not matter.

If the metric has been redefined since the promise was made, report both the original and the new
one, and state that it was redefined, when, and by whom. Never report only the new one.

Misses appear in the same section, the same voice and the same prominence as achievements. A miss
placed in a subordinate clause, an appendix, or a sentence that begins with a success has been
buried, not reported.

### 4. Expand each miss

For every commitment not met, produce the fixed structure — the ordering is what makes it
credible, so do not reorder it: WHAT WE SAID (quoted, dated) / WHAT HAPPENED / THE GAP / WHY /
WHAT WE LEARNED (only if something actually was learned; a generic lesson is worse than none) /
WHAT CHANGES (with an owner) / WHAT WE NOW EXPECT (at a labelled commitment level).

Prohibited: leading with mitigating context, burying the gap, or describing a miss as a delay
when the underlying assumption was wrong. Where a decision was reversed rather than missed, state
the reversal in the first sentence, quote the earlier statement with its date, and do not use the
words refinement, evolution, clarification or pivot to describe it.

### 5. Check consistency across periods

Line the register up against the prior accounts and flag: RESTATED (reported in different terms
than promised), DISAPPEARED (promised and never accounted for), REDEFINED (metric changed
mid-flight), CONTRADICTED (a current statement inconsistent with an earlier one). Quote both
statements with dates; do not characterise.

Compute the simple ratios — promises made, accounted for, met, missed and reported as missed —
and report the pattern rather than the individual instances. A single restatement is noise; a
pattern of restating exactly the promises that were missed is the finding, and it is what an
external reader detects first.

### 6. Label the forward statements

Any replacement commitment carries a level, in language distinct enough to survive being quoted:
COMMITTED (within our control, measurable, dated), FORECAST (with a range and its assumptions),
ASPIRATION (not a commitment). A forecast without a range is read as a commitment. Count the
committed items — a long list of commitments is a long list of future misses. Register every new
forward statement before it is communicated.

### 7. Candour check

Scan the draft and quote every instance of: hedged verbs where a commitment or a miss is the
actual subject; passive constructions hiding an actor; restated targets; buried misses;
interpretation placed before fact; known, estimated and hoped expressed in the same words;
variance attributed entirely to external conditions; euphemised reversals.

Output the quote, the classification, and the plain replacement. Show the replacement rather than
silently rewriting the document.

### 8. Counsel flags

Identify and flag; never resolve. Forward-looking statements to investors or prospective
investors; anything characterisable as financial guidance; statements about a transaction, raise,
distribution or repurchase; statements about individuals' employment or restructuring; named
customers, partners or counterparties; contractual obligations, covenants or regulatory filings;
competitor comparisons; accounting figures not from the system of record; security incidents,
outages or data matters.

Produce a checklist addressed to a named human reviewer. This task does not give legal,
securities or accounting advice.

### 9. Hold as a draft

Write the account to `docs/executive/accounts/{period}.md` (create the directory if it does not
exist), marked DRAFT — FOR HUMAN REVIEW. Use `.aexos-core/development/tasks/create-doc.md` as the
generation driver and apply `.aexos-core/development/checklists/self-critique-checklist.md`
before handing it over. Nothing is sent from here.

## Acceptance criteria

- Every promise due in the period appears, including those that were missed.
- Every promise is quoted in its original wording with its date, and reported in its original
  units.
- Every miss has the same prominence as the achievements around it.
- Every variance carries a mechanism and a named consequence with an owner.
- Every forward statement carries a distinct commitment level.
- Restatements and contradictions across periods are quoted, not characterised.
- The candour check produced quotes and replacements, not a rewritten document.
- The counsel-flag checklist names a human reviewer.
- The artifact is marked DRAFT and was not distributed.

## Handoff

| Destination | What it receives |
|---|---|
| Named human reviewer and qualified counsel | The draft and the counsel-flag checklist, before anything leaves the company. |
| `@ceo-chief` | Any gap between what was promised and what the strategy, budget or org actually supports — a promise more confident than the evidence behind it is an arbitration matter, not a wording matter. |
| `@strategy-lead` | A miss whose cause is the plan rather than the communication. |
| `@capital-allocator` | Any commitment that turns out to depend on an allocation not yet made. |
| `@org-designer` | Internal framing that requires a cadence or ownership change to be deliverable. |
| `@pm` | Nothing directly. Where an account produces a decision to change course, that decision leaves the squad through `@ceo-chief` and then `@pm` for epic framing. Story drafting is `@sm` exclusively; implementation `@dev`; quality gates `@qa`; push and release `@devops` exclusively. |
