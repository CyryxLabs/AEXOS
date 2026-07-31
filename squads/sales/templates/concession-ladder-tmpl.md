# Concession Ladder — {{deal}}

<!--
TEMPLATE: concession-ladder-tmpl.md
Squad: sales | Produced by: negotiation-lead (Tether) via *concession-plan
Structure: the Ackerman bargaining model as presented in Chris Voss, "Never Split the Difference"
(2016), written with Tahl Raz. Applied inside the approved commercial structure, never as a
licence to set one.

THE BOUNDARY THAT GOVERNS THIS FILE
Price level, packaging, value metric and discount policy belong to @products:pricing-strategist.
This ladder trades INSIDE an approved structure. Any step that would exit it is marked ESCALATE
and is not used without that escalation. A deal-by-deal price is not a price — it is a precedent
that arrives in every future negotiation.

THE RULE THAT MAKES A LADDER A LADDER
Every step buys something, and the something is named BEFORE the step is offered. A concession
that buys goodwill or momentum buys nothing, and it teaches the counterparty that pressure works.
-->

**Ladder ID:** LAD-{{YYYY-MM-DD}}-{{account-slug}}
**Deal:** {{name}} · **Date:** {{date}}
**Negotiation plan:** {{NEG-… ID}}

---

## 1. Approved structure in force

| Field | Entry | Source |
|---|---|---|
| List price for this scope | | `@products:pricing-strategist` |
| Discount authority, rep level | | |
| Discount authority, director level | | |
| Below which escalation is required | | |
| Non-price levers permitted | {{term, payment timing, phasing, reference rights, bundled services}} | |

> Everything below operates inside this. Nothing below revises it.

## 2. Anchor

| Field | Entry |
|---|---|
| Anchor | {{number}} |
| **Rationale, in the words we would use if asked** | "{{That is our standard for this scope, and I will tell you exactly what moves it.}}" |
| Why we anchor rather than respond | The first number spoken shapes the range. If we do not set it, their number becomes the frame we spend the negotiation arguing against. |

## 3. The ladder

| Step | Price | Movement from previous | **What it buys — named, non-price** | Interest it serves (from the interest map) |
|---|---|---|---|---|
| Anchor | {{ }} | — | The frame and the rationale | |
| 1 | {{ }} | −{{ }}% | {{e.g. three-year term at a locked rate}} | {{their risk metric / our revenue predictability}} |
| 2 | {{ }} | −{{ }}% | {{e.g. annual payment in advance}} | |
| 3 | {{ }} | −{{ }}% | {{e.g. named reference plus one case study, signed rights}} | |
| **Final** | {{ }} | −{{ }}% | Nothing further — the shrinking pattern is the message | |
| Reserve | — | — | {{e.g. onboarding fee waived: cheap for us, visible for them}} | offered only at close, without being asked for |

### Why the steps shrink

Each move is materially smaller than the last, so the **pattern itself** communicates the limit before we have to assert one. Assertions about limits are cheap and every buyer has heard them. A shrinking sequence is behaviour, and behaviour is what gets believed. *[SOURCE: Voss, Ackerman structure.]*

- [ ] Every step is materially smaller than the one before it *(a step equal to or larger than the last signals more room and invites another push)*

### Why the final number is not round

- [ ] The final figure is **non-round**

A calculated figure reads as derived. A round figure reads as a placeholder and invites one more push — which we would then have to refuse, costing more credibility than the rounding is worth.

**Final number:** {{e.g. 82,400 rather than 82,000}}

### The reserve item

| Field | Entry |
|---|---|
| Item | {{...}} |
| Cost to us | {{...}} |
| Value to them | {{...}} |
| When it is offered | At close, without being asked for — so the counterparty can report a final win they extracted |

## 4. What we do not do

- [ ] **We do not split the difference.** A midpoint is a number neither side argued for and neither can defend internally. Watch what happens afterward: their approver asks how the number was reached, "we met in the middle" reads as arbitrary, and another round follows. A concession tied to a term change, a payment schedule or a reference has a story attached and survives internal review.
- [ ] **We do not concede for goodwill or momentum.** If the answer to "what does this buy?" is goodwill, it buys nothing.
- [ ] **If the final number genuinely does not clear their ceiling, that is a scope conversation** — what comes out of the package — **not a further discount.**
- [ ] **If the counterparty concedes nothing across two rounds**, stop conceding and ask a calibrated question about their process.

## 5. Escalation

| Step that would exit the approved structure | Why it was requested | Escalated to | Verdict |
|---|---|---|---|
| | | `@products:pricing-strategist` | approved / refused / pending |

> Not planned around. Not improvised. Marked ESCALATE and stopped there until answered.

## 6. Declining a step

Decline with empathy and a calibrated question, not with flat refusal.

| Push we expect | Our decline (exact wording) |
|---|---|
| {{"we need another 5"}} | "{{How am I supposed to get to a number like that and still keep the implementation team on this account? Genuinely — what have other suppliers done that worked for you?}}" |

## 7. Integrity check on the ladder

- [ ] No step is justified by a deadline that does not exist
- [ ] No step is justified by scarcity, an allocated slot, or a competing demand that does not exist
- [ ] No step implies a competing offer we do not have
- [ ] No walk-away is announced anywhere in this ladder that we would not take
- [ ] Total cost including implementation, onboarding and any third-party licence is disclosed at the point the number is discussed, not after
- [ ] Renewal mechanics — uplift, auto-renewal window, repricing trigger — are disclosed before signature
- [ ] The resulting agreement is one the counterparty could defend to their own organization knowing everything we know

Full screen: `checklists/negotiation-integrity-checklist.md`.

## 8. Precedent this sets

| What this account will expect at renewal | What other accounts may hear about | Recorded for |
|---|---|---|
| | | `*post-mortem`, and `@products:pricing-strategist` if the same variable is contested across deals |

---

## Ladder self-check

- [ ] Anchor set with a stateable rationale
- [ ] Every step names the non-price item it buys, and the interest that item serves
- [ ] Steps decrease in size, monotonically
- [ ] Final number is non-round
- [ ] One reserve item held for close
- [ ] Nothing outside the approved structure appears as a plan step
- [ ] No integrity item failed
- [ ] The precedent is recorded, not left implicit
