# Profit-to-Cash Bridge — [ENTITY] — [PERIOD]

> **PROFESSIONAL LIMIT — READ BEFORE THE NUMBERS.** This is a management reading of movements
> between two dates, produced for internal decision-making. It is **not** an audit, a review, an
> assurance engagement, a certification, a reconciliation certified by anyone, a valuation, a
> filing position, or a statement about how any item should be recognised, measured, disclosed,
> classified or taxed. Nothing here is for external reliance and nothing here is for a tax
> authority, regulator, auditor, lender or court. Where the bridge surfaces a treatment question,
> it is written into the referral table below and answered by a licensed professional, not here.
>
> Framework applied with attribution: Karen Berman & Joe Knight, *Financial Intelligence: A
> Manager's Guide to Knowing What the Numbers Really Mean* (Harvard Business School Press, 2006,
> written with John Case). A management-literacy framework. It teaches managers to read and
> question financial information; it qualifies nobody to prepare, certify or opine on it.

---

## 0. Licensed review — REQUIRED, complete before this artefact is used

| Field | Value |
|---|---|
| Licensed reviewer required? | **Yes** — this artefact must not carry a decision with a treatment consequence until reviewed |
| Professional type | [Licensed accountant / tax adviser / external auditor] |
| Named professional | [FULL NAME AND FIRM — "our accountant" is not a name] |
| Question(s) sent | [See referral table, section 7] |
| Date sent | [YYYY-MM-DD] |
| Date reviewed | [YYYY-MM-DD — leave blank until it has actually happened] |
| Reviewer's response location | [Path or reference to the reply, attached — never summarised here] |
| Status | UNREVIEWED / SENT-AWAITING / REVIEWED |

**While Status is UNREVIEWED or SENT-AWAITING, this bridge is a reading only.** It may inform an
internal conversation. It may not be used to state a treatment, support an external representation,
or close a decision whose correctness depends on an answer that has not arrived.

---

## 1. Scope — settled before any figure is discussed

| Dimension | Value | How it was established |
|---|---|---|
| Entity / consolidation boundary | [ENTITY] | [source] |
| Period start | [YYYY-MM-DD] | [source] |
| Period end | [YYYY-MM-DD] | [source] |
| Basis | [accrual / cash] | [source] |
| Currency | [CUR] | [source] |
| Gross or net of | [state what is included and excluded] | [source] |
| One-off items treatment | [listed individually / netted — list individually] | [source] |

**Comparability gate.** The reported result and the cash movement must cover *identical* dates,
the same entity boundary and the same basis. If any of the three differs, stop. A bridge across
mismatched scopes produces a confident conclusion about nothing.

- [ ] Result period == cash movement period (same two dates, not the same month name)
- [ ] Same entity boundary on both sides
- [ ] Same basis on both sides

---

## 2. The two endpoints

| Endpoint | Amount | Source | Extraction date |
|---|---|---|---|
| Reported result for the period | [+/- amount] | [report/export, not a slide] | [YYYY-MM-DD] |
| Opening cash | [amount] | [bank statement / ledger] | [YYYY-MM-DD] |
| Closing cash | [amount] | [bank statement / ledger] | [YYYY-MM-DD] |
| **Change in cash** | **[closing - opening]** | derived | — |
| **Gap to explain** | **[result - change in cash]** | derived | — |

State the gap as a single figure before building anything. It is the thing the rest of this
document has to account for.

---

## 3. The bridge

Every line carries a named source. A line without a source does not become an estimate — it
becomes part of the residual in section 4.

| # | Bridge item | Amount | Source | Class |
|---|---|---|---|---|
| 0 | Reported result | [amount] | [source] | starting point |
| 1 | Depreciation | [+amount] | [fixed asset register] | non-cash |
| 2 | Amortisation | [+amount] | [register] | non-cash |
| 3 | Impairment | [+amount] | [source] | non-cash |
| 4 | Movement in provisions | [+/-] | [source] | non-cash |
| 5 | Movement in receivables | [-increase / +decrease] | [ledger, both period ends] | working capital |
| 6 | Movement in inventory | [-increase / +decrease] | [stock report, both ends] | working capital |
| 7 | Movement in payables | [+increase / -decrease] | [ledger, both ends] | working capital |
| 8 | Movement in accruals | [+/-] | [ledger] | working capital |
| 9 | Movement in prepayments | [+/-] | [ledger] | working capital |
| 10 | Capital expenditure | [-amount] | [asset additions] | investing |
| 11 | Disposals | [+amount] | [source] | investing |
| 12 | Loan drawdown | [+amount] | [loan statement] | financing |
| 13 | Loan repayment | [-amount] | [loan statement] | financing |
| 14 | Capital movements | [+/-] | [source] | financing |
| 15 | [One-off item — name it, do not net it] | [+/-] | [source] | one-off |
| — | **Unexplained residual** | **[amount]** | **none** | **UNSOURCED** |
| — | **Change in cash (must equal section 2)** | **[amount]** | derived | check |

**Sign convention, stated so nobody has to guess:** an increase in receivables or inventory is a
cash outflow (negative). An increase in payables is a cash inflow (positive). State the convention
even when it feels obvious — it is the single most common source of an argument about a bridge.

---

## 4. The residual — shown, never absorbed

| Field | Value |
|---|---|
| Residual amount | [amount] |
| Residual as % of the gap | [%] |
| What has been checked already | [list] |
| What has not been checked | [list] |
| Who is tracing it | [named person] |
| By when | [YYYY-MM-DD] |

**Rule.** The residual is a visible line with its own row. It is never smoothed into another item,
never described as "rounding" unless it is genuinely below the rounding unit of the source data,
and never removed by adjusting a sourced line to make the bridge close. A bridge that closes
perfectly on the first attempt has usually been made to close.

If the residual exceeds [state the threshold agreed for this entity, e.g. 2% of the gap], the
bridge does not carry a decision until the residual is traced or explicitly accepted by a named
person who states why.

---

## 5. Dominant driver

| Field | Value |
|---|---|
| Dominant bridge item | [item # and name] |
| Share of the gap | [%] |
| Classification | **STRUCTURAL** (business model, granted terms, growth) / **TIMING** (a single late collection, an early payment, a period-end effect) |
| Evidence for the classification | [what makes this structural rather than timing, or the reverse — assert nothing] |
| Who controls it operationally | [role, not "finance"] |

### Growth versus execution — run this whenever receivables dominate

Growth alone raises receivables. Any movement in *receivable days* on top of that is a terms or
collection change, and it has a different owner from growth.

| Measure | Prior period | This period | Movement |
|---|---|---|---|
| Revenue | [amount] | [amount] | [%] |
| Receivable days | [days] | [days] | [days] |
| Receivables attributable to volume at constant days | [amount] | derived |
| Receivables attributable to the change in days | [amount] | derived |

State which of the two dominates. They are fixed by different people.

---

## 6. What would close the gap

| Lever | Bridge item it moves | Estimated cash effect | Basis for the estimate | Operating owner | Commercial consequence |
|---|---|---|---|---|---|
| [e.g. invoice on delivery rather than at month-end] | 5 | [amount] | [derived from this period's own figures] | [role] | [none / state it] |
| [e.g. dunning sequence before day 45] | 5 | [amount] | [derivation] | [role] | [relationship effect] |
| [e.g. extend supplier payment terms] | 7 | [amount] | [derivation] | [role] | **shifts cost onto a counterparty — commercial decision, not a finance one** |

**Honest framing of any working-capital release.** A working-capital improvement is a **one-time
cash release** plus a **permanently lower working-capital requirement at the current volume**. It
is not recurring income, it does not belong in a run rate, and presenting it as either overstates
the business. State it in those words.

- [ ] Every release in this section is stated as one-time + lower ongoing requirement
- [ ] No release appears in a revenue, margin or run-rate figure anywhere in this artefact

---

## 7. Referral table — licensed-professional questions surfaced by this bridge

Listed here, at the front of the document's decision section, never as a closing footnote.

| # | Question, written so it can be answered directly | Professional | Documents to attach | Decision it blocks | Deadline | Status |
|---|---|---|---|---|---|---|
| 1 | [e.g. "We have a 12-month licence paid annually in advance, contract attached. Under the standards we report on, is this expensed over the term, prepaid, or capitalisable?"] | Accountant | [contract, invoice, period] | [decision] | [date] | [sent/answered] |
| 2 | [tax question, if any] | Tax adviser | [documents] | [decision] | [date] | [status] |
| 3 | [assurance question, if any] | External auditor | [documents] | [decision] | [date] | [status] |

**What must never appear in this table as an answer:** a treatment, a filing position, a view on
how an item "usually" goes, or a preferred option presented as the likely outcome. This artefact
may model what each candidate treatment would do to the result and to cash. It may not choose.

---

## 8. Assumptions

| # | Assumption | Supplied by | What would falsify it | Effect on the bridge if wrong |
|---|---|---|---|---|
| 1 | [assumption] | [named person] | [the check that would reveal it] | [amount / direction] |

An assumption that is not written down is a number that cannot be audited later.

---

## 9. Capture

| Field | Value |
|---|---|
| File path | `docs/[path]/[YYYY-MM-DD]-profit-to-cash-[period].md` |
| Owner | [named person] |
| Date | [YYYY-MM-DD] |
| Version | [n] |
| Supersedes | [prior artefact path, if any] |
| Review date | [YYYY-MM-DD] |

Constitution Article IV — No Invention: no figure enters a conclusion without a traceable source.
Unsourced figures appear only as the residual in section 4.

---

## Template usage notes

- Sections 0, 1, 4 and 7 are not optional. A bridge without a licensed-review block, without a
  settled scope, without a visible residual, or without its referral table is not this artefact.
- Section 3's line list is a starting catalogue, not a limit. Add lines the entity actually has.
  Never merge two items to shorten the table.
- Delete nothing to make the document tidier. An empty referral table is a statement that the
  bridge surfaced no treatment question, and that statement should be deliberate.
