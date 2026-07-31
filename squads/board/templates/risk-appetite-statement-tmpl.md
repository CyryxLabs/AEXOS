# Risk Appetite Statement — {ORGANIZATION}

**Template ID:** BRD-TMPL-004
**Owned by:** risk-oversight (Bulwark)
**Produced by:** `*appetite`
**Artifact path:** `squads/board/data/{organization-slug}-risk-appetite-v{n}.md`
**Approving body:** {board or committee} — **Date approved:** {date} — **Review cadence:** {cadence}

---

## Professional limit — reproduce this block verbatim in every completed statement

> This is a **board oversight artifact**. It is **not** legal advice, **not** tax advice, **not**
> actuarial or capital advice, **not** an insurance determination, **not** a statutory-audit
> instrument and **not** a regulatory filing. **No audit opinion of any kind is issued here**, and
> nothing in it verifies that any control described actually operates.
>
> COSO ERM is not a quantitative model. It supplies no loss distributions, no capital requirements,
> no actuarial estimates and no pricing. Any figure in this statement is management's, with its
> basis named — it is not produced or validated by this agent.
>
> This statement is **input for review by the directors themselves and by licensed professionals**
> before adoption. Adoption is a board decision taken by humans, and nothing here discharges it.

---

## 1. Precondition — do not proceed without this

Risk appetite is set **against objectives**. If the strategy and business objectives are not
stated, **stop**. An appetite set against objectives that do not exist produces a sentence nobody
can apply.

| Field | Entry |
|---|---|
| Strategy artifact (path + date) | |
| Business objectives it puts into practice | |
| If either is missing | STOP — route to board-chief; this is a mandate-link break, upstream of appetite |

---

## 2. Risk types — types, not risks

Appetite is expressed per **type of risk**, not per individual risk entry. Typical set below;
adapt to the organization and **state what was adapted and why**.

| Type | In scope? | Adaptation note |
|---|---|---|
| Strategic | | |
| Financial | | |
| Operational | | |
| Technology and security | | |
| Regulatory and compliance | | |
| Reputational | | |
| People and key-person | | |

---

## 3. Appetite statements — one per type

Each statement takes this form:

> For **{type}**, we are willing to accept **{qualitative direction}** in pursuit of
> **{objective}**, and we are **not** willing to accept **{named class of outcome}**.

### {Type 1}

| Field | Entry |
|---|---|
| Statement | |
| **Forbidden-decision test** — name a concrete, plausible proposal this statement would cause the board to **reject** | |
| Verdict | PASSES / **FAILS — rewrite or delete** |

**The forbidden-decision test is binding.** If no concrete proposal can be named that this
statement would cause the board to reject, the statement is not a boundary — it is a sentiment.
Rewrite it or delete it. A statement that permits everything has told nobody anything, and it will
be quoted afterwards as though it had.
*Attribution: this test is this agent's `CONSTRUCTION`, not a COSO provision.*

*(Repeat the block for each type.)*

---

## 4. Tolerance — the measurable band

**Appetite without tolerance cannot be breached, and an unbreachable boundary cannot be
monitored.** Every appetite statement carries a tolerance band around a named performance measure.

| Type | Performance measure | Tolerance band | Breach point | Who measures it | Measurement cadence |
|---|---|---|---|---|---|

If a measure does not exist for a type, that is a **measurement gap** and is reported as one — the
appetite for that type is unmonitorable until the measure exists. Do not substitute a proxy without
saying it is a proxy.

---

## 5. Breach consequence — stated in advance, not improvised

| Type | Who is told | How fast | What happens | Whose decision is suspended pending review |
|---|---|---|---|---|

**Never resolve a breach by silently restating the appetite.** If the appetite changes, it changes
as an explicit board decision, with a reason, on the record. A quietly widened boundary means the
next breach carries no information.

---

## 6. Escalation thresholds

Thresholds are calibrated on more than size. A threshold defined for magnitude alone never catches
the exposure that arrives fast.

| Dimension | Threshold | Backtest: would this have caught the last three surprises? |
|---|---|---|
| Magnitude | | |
| Velocity — time from onset to full impact | | |
| Reputational exposure | | |
| Regulatory exposure | | |
| Concentration — single points of failure | | |

**Backtest is mandatory.** Take the last three matters the board learned about later than it should
have, and test each threshold against them. A threshold that would have caught none of them is
untested decoration.

---

## 7. Review and revision triggers

| Field | Entry |
|---|---|
| Review cadence | |
| Early-review triggers (substantial change) | Change in strategy / scale / structure / technology / funding / regulatory posture / a breach in any type |
| Next scheduled review | |

*Attribution: reassessment triggered by substantial change rather than by the calendar follows
COSO ERM's Review and Revision component.*

---

## 8. What this statement does not do

- It does **not** confirm that any control keeping exposure inside appetite actually operates. That
  is evidence, and it belongs to **audit-lead**. Where a residual position depends on an
  unevidenced control, say so here rather than implying coverage.
- It does **not** define the board's mandate or delegation limits — **governance-counsel**.
- It does **not** assess leadership capacity or key-person depth beyond naming the exposure —
  **succession-lead**.
- It does **not** implement anything — **@dev**; test anything — **@qa**; release anything —
  **@devops**.
- It does **not** answer whether any exposure creates a legal, regulatory or contractual
  obligation — **qualified counsel**.

---

## 9. Attribution — reproduce, adapted to what was used

> **Attribution.** This statement applies **COSO**'s *Enterprise Risk Management — Integrating with
> Strategy and Performance* (2017), which updated *Enterprise Risk Management — Integrated
> Framework* (2004). COSO is the Committee of Sponsoring Organizations of the Treadway Commission.
> The framework's structure is five interrelated components supported by twenty principles.
>
> **This is a different publication from COSO's *Internal Control — Integrated Framework***
> (originally issued 1992, updated 2013), which has a different purpose and belongs to
> **audit-lead**. The two are never merged or cited for each other's content.
>
> Defining risk appetite sits in the **Strategy and Objective-Setting** component; assessing
> severity, prioritizing risks and developing a portfolio view sit in the **Performance**
> component; reassessment on substantial change sits in **Review and Revision**.
>
> Scenario analysis, stress testing, tail-risk reasoning, concentration analysis, velocity and
> persistence, and correlation clustering are **general risk-management discipline** used *within*
> the COSO structure. COSO provides the frame; it is **not their source**, and they are marked
> `DERIVED` rather than attributed to COSO.
>
> The forbidden-decision test, the survivability override, the velocity override and the evidence
> penalty are this agent's `CONSTRUCTION`.
>
> No provision, principle number, title or year is cited from memory where it matters to a
> decision. Read the source document.

---

## 10. Record

| Field | Entry |
|---|---|
| Approving body | |
| Date approved | |
| Version | |
| Supersedes | |
| Dissent recorded (verbatim, named) | |
| Human-review confirmation | This statement was reviewed by {names} before adoption |

> **Human-review clause.** This statement was prepared by an AEXOS agent applying a published risk
> framework. It has not been reviewed by a lawyer, an auditor, an actuary or a regulator. It
> requires review by qualified human professionals, and adoption by the board, before any reliance
> is placed on it.
