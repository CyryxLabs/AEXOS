# Disqualification Record — {{account}}

<!--
TEMPLATE: disqualification-record-tmpl.md
Squad: sales | Produced by: qualification-lead (Sieve) via *disqualify

WHY THIS ARTIFACT EXISTS
Deciding whom not to sell to is a deliverable of this discipline, not a failure. A disqualified
deal returns capacity to deals that can close. But an account parked without a re-entry condition
is lost information rather than discipline — which is why this record is mandatory rather than
optional, and why the re-entry condition is the field that cannot be left blank.

DISQUALIFY ON STRUCTURE, NOT ON DIFFICULTY.
Hard deals stay in. "Difficult" is not on the trigger list.
-->

**Record ID:** DISQ-{{YYYY-MM-DD}}-{{account-slug}}
**Account:** {{name}}
**Date:** {{date}}
**Decided by:** {{name}}
**Qualification record this follows:** {{QUAL-… ID and date}}

---

## 1. Structural reason

**Trigger (select from the structural list — difficulty is not one):**

- [ ] No reachable authority who can release funds
- [ ] No consequence to inaction and no trigger event
- [ ] A heavily weighted criterion we cannot satisfy without concealing it
- [ ] No process that ends in a signature within any horizon the buyer will state
- [ ] The buyer requires a commitment we cannot make truthfully
- [ ] Repeated failure of the champion tests with no second relationship available

**The evidence for that trigger:**

| Finding | Named source | Date |
|---|---|---|

**Why this is structural and not difficult:**

> {{One paragraph. State what version of a better conversation would produce a signature, and why
> it does not exist. If a better conversation would produce one, this is not a disqualification.}}

## 2. What was tried

| Attempt | Date | Outcome |
|---|---|---|

**Was the structural trigger tested deliberately, or assumed?** {{tested — describe the attempt / assumed — then test it before disqualifying}}

## 3. What this returns

| Resource | Amount | Where it goes |
|---|---|---|
| Rep hours per week | | |
| Forecast entries removed | | |
| Implementation or delivery capacity informally held | | |
| Executive time | | |

## 4. Re-entry condition — observable, dated, and not optional

**Condition (must be observable by someone outside the deal):**

> {{e.g. "FY reset published (expected Q1) AND either a named contact with signature authority at
> or above the consolidated budget line, OR a stated regulatory or audit deadline that creates a
> funded exception."}}

| Field | Entry |
|---|---|
| Who or what would signal it | |
| Earliest plausible date | |
| Who checks, and when | |
| What we would want ready by then | |

> A condition like "when they are ready" is not observable and does not satisfy this section.

## 5. Close-out message to the buyer

**Draft, exact wording:**

> {{What we understood, why we are stepping back, and what would make it worth reopening.}}

**Integrity check on the message:**

- [ ] No guilt
- [ ] No manufactured last chance, expiring price or invented deadline
- [ ] No implication that they have made a mistake
- [ ] No claim about scarcity, other buyers, or consequences we cannot substantiate
- [ ] It ends with a real question or a real offer, not a hook

> The relationship is frequently the only asset this account currently has. The close-out either
> preserves it or spends it.

## 6. What we learned that outlives this deal

| Finding | Route to | Is it a pattern or a single instance? |
|---|---|---|
| {{e.g. an untracked alternative won}} | `@products:positioning-lead` | pattern across {{n}} deals / single |
| {{e.g. price structure misaligned with how they buy}} | `@products:pricing-strategist` | pattern / single |
| {{e.g. our stages let this reach Commit}} | `@sales:pipeline-ops` | pattern / single |

> A single instance is recorded and not generalized from. A pattern is routed.

## 7. Record

- **Written to:** `squads/sales/{{path}}`
- **CRM state after this record:** {{closed-lost reason code / parked with condition}}
- **So this account is not re-worked from zero in two quarters:** {{where the next rep will find this}}

---

## Self-check

- [ ] The reason is structural and appears on the trigger list
- [ ] The trigger was tested, not assumed
- [ ] The capacity returned is stated concretely
- [ ] The re-entry condition is observable and dated
- [ ] The close-out message passes the integrity check
- [ ] Patterns are routed outward; single instances are not generalized from
- [ ] Nothing in this record sets price, packaging or competitive frame
