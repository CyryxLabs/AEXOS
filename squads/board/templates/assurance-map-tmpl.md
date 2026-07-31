# Assurance Map — {ORGANIZATION}, {PERIOD}

**Template ID:** BRD-TMPL-005
**Owned by:** audit-lead (Tally)
**Produced by:** `*assurance-map` (with `*control-review` and `*figure-challenge` feeding it)
**Artifact path:** `squads/board/data/{organization-slug}-assurance-map-{period}.md`

---

## Professional limit — reproduce this block verbatim in every completed map

> **This is not an audit and it is not an audit opinion.** No agent contributing to this document
> is a licensed auditor, and **no opinion — statutory, internal or otherwise — is issued here on
> any figure, any control or any set of financial statements.** Nothing here attests to the
> effectiveness of internal control for any regulatory purpose.
>
> This map records **what assurance exists over what the board relies on, and what does not**. It
> is a map of coverage, not a verification of the things covered. Where it says a control was
> TESTED, it is reporting that a named party states they tested it — not confirming that they did,
> and not adopting their conclusion.
>
> It is **not** legal advice, **not** tax advice, **not** an accounting-policy determination and
> **not** a regulatory filing. Whether any obligation applies — Sarbanes-Oxley or any equivalent,
> a listing rule, an accounting standard — is a legal question for qualified advisers.
>
> This document is **input for review by the audit committee, the directors, and licensed
> professionals**. It is never the final assurance position.

---

## 1. Scope and adaptation

| Field | Entry |
|---|---|
| Organization | |
| Period covered | |
| Reliances in scope | |
| Reliances explicitly out of scope, and why | |

**Adaptation statement (mandatory).** Much of this discipline developed around the financial
reporting of listed companies. Where it is applied here to non-financial assertions — delivery
metrics, quality-gate outcomes, usage data, security posture, supplier claims — the transfer is by
**analogy**. The underlying question is identical (*what is asserted, by whom, verified how*), but
**no financial-reporting authority is invoked by the transfer**, and none is implied. State the
adaptation here: {statement}.

---

## 2. Reliances — start from decisions, not from a control inventory

List every assertion the board **acts on**. Build the list by taking the board decisions of the
period and working backwards to what each one rested on. A control inventory produced by management
tells you what management chose to describe; the decision trail tells you what the board actually
relied on.

| # | Reliance (the assertion the board acts on) | Board decision it supported | Assertor (named person or function) |
|---|---|---|---|

"The system says" is **not** an assertion. A system is configured by someone, and that person is
the assertor.

---

## 3. Assurance per reliance

| # | Reliance | Assurance source (named party) | Scope — what exactly was covered | Independent of the assured? | Date | Result |
|---|---|---|---|---|---|---|

**Scope is the field that is most often silently narrow.** "Reviewed the revenue process" and
"tested twelve transactions in one month of one region" are different coverages and are recorded
differently.

---

## 4. The three states — never merged into one status

Every specific control is reported in three **separate** states. Collapsing them into "in place",
"effective" or "operating" is how a policy document comes to be reported as a working control.

| Control | DESCRIBED — a document says it exists | OPERATED — evidence it ran in the period | TESTED — someone independent checked it (named, dated) |
|---|---|---|---|
| | Yes / No + document | Yes / No + evidence | Yes / No + who, when, what scope |

Rules:

- A control marked DESCRIBED with no OPERATED evidence is **not** a control the board may rely on.
  Say so in those words.
- A control marked OPERATED with no TESTED entry is **self-reported**. The map says so.
- The three columns are never combined into a single status word, in this document or in any
  summary of it.

*Attribution: the three-state reporting rule is this agent's `CONSTRUCTION`.*

---

## 5. Three-lines placement and line collapse

Place each assurance source on the three-lines model: **first line** — operational ownership;
**second line** — oversight and compliance functions; **third line** — independent internal audit.
Record **external** assurance separately.

| Assurance source | Line | Reports to | Line collapse? |
|---|---|---|---|

**LINE COLLAPSE** is flagged wherever the **same function both performs and assures**. It is the
commonest and least visible assurance defect, because the map still looks populated. Flag it
explicitly; do not net it into a coverage percentage.

> **Attribution.** The three-lines model is associated with the **Institute of Internal Auditors**,
> which has **revised its formulation over time** — including the terminology used for the lines
> and how their relationship is described. It is used here to detect line collapse. **Do not quote
> a version from memory**: if the precise wording or the current formulation matters to a
> conclusion, read the current source document.

---

## 6. Over-assurance and under-assurance

Report both directions. Four parties covering one low-consequence area while a material reliance
has none is a resourcing finding worth putting in front of the board.

| Area | Assurance sources | Consequence if wrong | Finding |
|---|---|---|---|
| | | | OVER-ASSURED / PROPORTIONATE / UNDER-ASSURED |

---

## 7. NO ASSURANCE list — in those words

| Reliance | Consequence if the assertion is wrong | Who could provide assurance | What it would cost / take |
|---|---|---|---|

**Binding rule.** A reliance with no independent source is recorded as **NO ASSURANCE**, in those
words. It is never described in language that implies coverage — not "limited assurance", not
"management-monitored", not "covered by process". If the board is relying on something nobody has
checked, the board is told that in a sentence it cannot misread.

*Attribution: this rule is this agent's `CONSTRUCTION`.*

---

## 8. Period-on-period diff

| Reliance | Prior period assurance | This period | Movement |
|---|---|---|---|
| | | | UNCHANGED / NARROWED / WIDENED / LOST |

**Coverage narrows quietly far more often than it widens.** The narrowing is usually a scope
decision taken for good operational reasons by someone who did not know what the board relied on.
Ask what was **proposed for the audit plan and removed, and by whom** — independence is lost at
scoping more often than at reporting.

*Attribution: the scope-exclusion question is this agent's `CONSTRUCTION`.*

---

## 9. Open findings — oldest, not average

| Finding | Raised | Age | Owner | Re-tested independently? | Status |
|---|---|---|---|---|---|

Report the **oldest open finding**, not the average age. Averages conceal the one that matters.
A finding closed on the owner's own confirmation, with no independent re-test, is recorded as
`CLOSED — SELF-REPORTED`.

---

## 10. Deficiencies

Rate each deficiency by whether it could allow a **material misstatement of something the board
relies on** — never by how hard it is to fix.

| Deficiency | What it could allow | Rating | Routed to | Date routed |
|---|---|---|---|---|

A deficiency logged and not communicated has been **documented, not addressed**. The routing is
part of the record.

---

## 11. Control environment note

Weight the control environment first. Where it is weak, state explicitly that the specific controls
below it are **operating in spite of the environment**, and are therefore most likely to fail under
exactly the pressure that makes them matter.

| Environment factor | Observation | Consequence for the controls beneath it |
|---|---|---|
| Tone and commitment to integrity and ethical values | | |
| Oversight responsibility exercised | | |
| Structure, authority and responsibility established | | |
| Commitment to competence | | |
| Accountability enforced | | |

*Attribution: the five factors above correspond to the Control Environment principles of COSO's
*Internal Control — Integrated Framework* (originally issued 1992, updated 2013). This is a
**separate publication** from COSO's *Enterprise Risk Management — Integrating with Strategy and
Performance* (2017), which belongs to risk-oversight.*

---

## 12. Referred out

| Question | Category | Referred to | Status |
|---|---|---|---|
| | Accounting-policy determination / statutory audit opinion / listing rule / whether a statute or its equivalent applies / tax / contract | Qualified auditors or counsel | Requested / Received / Outstanding |

---

## 13. Attribution — reproduce, adapted to what was used

> **Attribution.** **Audit committee practice has no single canonical author and no one foundational
> text**, and this document does not manufacture one. It is assembled from sources with different
> scopes, each named where its provisions are used:
>
> - **Cadbury Report** (*Report of the Committee on the Financial Aspects of Corporate Governance*,
>   United Kingdom, December 1992) and its Code of Best Practice — for the audit committee of at
>   least three non-executive directors with written terms of reference dealing clearly with its
>   authority and duties, for reporting on the effectiveness of the system of internal control, and
>   for a balanced and understandable assessment of position. Fuller treatment of this source sits
>   with governance-counsel.
> - **COSO, *Internal Control — Integrated Framework*** (originally issued 1992, updated 2013),
>   published by the Committee of Sponsoring Organizations of the Treadway Commission — five
>   components supported by seventeen principles. **A separate publication from COSO ERM (2017)**,
>   which belongs to risk-oversight; the two are never merged.
> - **Sarbanes-Oxley Act of 2002** (United States) — referenced here for the **structural
>   principles** it embodies: audit committee responsibility for the appointment, compensation and
>   oversight of the external auditor; procedures for the receipt and treatment of complaints,
>   including confidential and anonymous submission by employees of concerns regarding questionable
>   accounting or auditing matters; audit committee authority to engage independent counsel and
>   advisers; management certification of reports; and management assessment of internal control
>   over financial reporting with auditor attestation. **It is United States legislation applying to
>   particular categories of issuer. It is not asserted to bind this organization** — whether it or
>   any equivalent applies is a legal question for qualified advisers.
> - **The three-lines model**, associated with the **Institute of Internal Auditors**, whose
>   **formulation has changed between versions**. Used here only to detect line collapse. Cite the
>   current source document, not this summary, if precise wording matters.
>
> Practices common across the profession with no single traceable origin — the private session with
> the auditors, attention to the management letter and unadjusted differences, monitoring the
> non-audit fee ratio, partner and firm rotation, tracking findings to closure with independent
> re-test, assurance mapping — are marked `DISCIPLINE` and **attributed to nobody**.
>
> This agent's own tests — the three-state rule, the NO ASSURANCE rule, the direction test, the
> definition-stability check, the scope-exclusion question, and reporting the oldest rather than the
> average open finding — are marked `CONSTRUCTION`.
>
> **No provision, section, title or year is cited from memory where it matters to a conclusion.**
> Read the source.

---

## 14. Human-review clause — mandatory closing statement

> This map was prepared by an AEXOS agent. It has not been reviewed by a licensed auditor. It
> issues **no audit opinion**, attests to **no control effectiveness for any regulatory purpose**,
> and determines **no accounting policy**. It requires review by the audit committee and by
> qualified human professionals before any reliance is placed on it.
