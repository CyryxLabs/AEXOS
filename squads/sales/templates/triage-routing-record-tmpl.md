# Triage & Routing Record — {{deal_or_request}}

<!--
TEMPLATE: triage-routing-record-tmpl.md
Squad: sales | Produced by: sales-chief (Vanguard) via *diagnose, *intake, *sequence
Written to: squads/sales/ as a dated record.

RULES FOR FILLING THIS IN
- Name the owning discipline BEFORE producing any content. A confident answer from the wrong
  discipline is worse than a routing decision.
- Route to exactly ONE owner. If several are genuinely needed, sequence them by dependency and say
  what gets rewritten if the order is broken.
- Never reframe silently. The reframe is stated out loud in section 2 and confirmed with the
  requester before anything else is written.
- This record generates no commercial claims. It routes.
- Delete no section. A section with nothing in it is filled with "none" — an empty heading reads as
  an oversight.
-->

**Record ID:** TRIAGE-{{YYYY-MM-DD}}-{{slug}}
**Date:** {{date}}
**Requester:** {{who asked}}
**Deal / account / initiative:** {{name}}

---

## 1. The request as received

> {{Verbatim. The requester's own words, not a summary. If it arrived in several messages, quote each with its timestamp.}}

## 2. Restated in the owning discipline's vocabulary

**Restatement:** {{One sentence.}}

**Reframe applied?** {{yes / no}}

- If yes — **what was stated:** {{...}} **what is actually being asked:** {{...}} **why:** {{...}}
- **Confirmed with the requester:** {{yes, on {{date}} / awaiting confirmation — do not route until confirmed}}

## 3. Owner

| Field | Entry |
|---|---|
| **Owning specialist** | `@sales:{{agent-id}}` ({{persona}}) |
| Method source | {{attribution as carried by that agent}} |
| Why this owner | {{one sentence}} |

**Near misses, and the line that excluded each:**

| Discipline considered | Excluded by |
|---|---|
| `@sales:{{...}}` | "{{quote the not-theirs line}}" |
| `@sales:{{...}}` | "{{quote the not-theirs line}}" |

## 4. Boundary check

- [ ] Still commercial — not price level, packaging, value metric or discount policy (`@products:pricing-strategist`)
- [ ] Still commercial — not market category, competitive alternatives or narrative (`@products:positioning-lead`)
- [ ] Not epic framing or PRD (`@pm`), story drafting (`@sm`), validation or backlog (`@po`)
- [ ] Not implementation (`@dev`), quality gates (`@qa`), or release / push / PR / CI-CD (`@devops`, exclusive)

**Anything routed outward:** {{what, to whom, and why — or "none"}}

## 5. Integrity screen

**Does the request presuppose a move that would fail the integrity screen?** {{yes / no}}

- If yes — **stop here.** Run `checklists/commercial-integrity-screen-checklist.md` before any routing, record the verdict below, and route only the compliant version.
- **Screen verdict:** {{PASS / BLOCKED — with the failed test named}}
- **Compliant alternative, if blocked:** {{exact wording}}
- **Named human decider, if the concern must be escalated:** {{name}}

> An integrity concern belongs at the top of any brief that follows this record. Never as a footnote.

## 6. The two-minute usable answer

{{Enough to unblock the requester today, no more. If the question is navigational or definitional,
this is the whole answer and there is no handoff. If it requires a method, this is explicitly the
undefensible short version and says so.}}

**This answer is:** {{sufficient — no routing needed / provisional — the specialist gives the defensible version}}

## 7. Evidence position

| Available now | Source + date | Buyer-sourced? |
|---|---|---|
| {{...}} | {{...}} | yes / no — **seller-sourced items are marked UNVERIFIED** |

**Missing evidence the specialist will need:**

1. {{...}}
2. {{...}}

**UNVERIFIED block:** {{every claim in this record that came from us rather than from the buyer, listed separately and visibly}}

## 8. Handoff brief

**To:** `@sales:{{agent-id}}`
**The specific question:** {{one question, answerable}}
**Inputs attached:** {{artifact paths}}
**Deadline, and whose it is:** {{date + owner — our quarter boundary is stated as ours}}
**What must NOT be assumed:** {{the UNVERIFIED items}}

## 9. Sequence — only if several disciplines are genuinely needed

| # | Specialist | Input required | Artifact produced | Gets rewritten if run out of order |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

**Ordering rule:** by the coherence chain — fit → pain → insight → economic buyer → decision process → commercial terms → forecast stage. An upstream owner runs first.

**Explicitly NOT run this cycle, and why:** {{discipline + reason. A discipline included out of habit is rejected here.}}

## 10. Record

- **Written to:** `squads/sales/{{path}}`
- **Supersedes:** {{prior record, or "none"}}
- **Next review trigger:** {{the observable event that would reopen this}}

---

*A routing decision that exists only in a chat transcript did not happen. This record is the decision.*
