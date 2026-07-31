# Error Budget Policy — [SERVICE_NAME]

**Template ID:** OPS-TMPL-002
**Produced by:** `@ops:reliability-lead` (Keel) — `*budget-policy`
**Artifact type:** Written rule, agreed in advance. Versioned markdown in the repository.
**Owner:** [named decider] · **Effective:** [date] · **Review:** [+2 windows]

[[LLM: FILLING THIS TEMPLATE

This is the artifact that exists so that the argument in Section 3 is not held during the incident
by whoever has the most standing in the room. It is written while nothing is burning.

The Executor column is not decoration. Every consequence in Section 3 MUST name an agent authorized
to perform it, and every consequence that touches a pipeline, a gate, a release or infrastructure
MUST name `@devops`. A policy with an unassigned consequence is incomplete and will later be cited
by someone reaching for a gate they do not hold. Do not publish without Section 6 filled.

A policy with no exit condition is a freeze with no end. Section 4 is mandatory.]]

---

## 0. Boundary — this policy is a document, not a switch

This policy **states the agreed rule**. It gates nothing by itself.

- Holding a gate, pausing a pipeline, blocking a merge, executing a freeze, cutting or withholding
  a release: **`@devops`, exclusive authority, no exceptions for severity or urgency.**
- Implementing anything the policy asks for: `@dev`.
- Verification and test evidence: `@qa`.
- Reporting burn and reading the window: `@ops:reliability-lead` — that is this agent's whole role
  once the policy is written.

If this policy is ever quoted to justify anyone other than `@devops` touching the release path, it
is being misread.

---

## 1. The objective this policy governs

| Field | Value |
|---|---|
| Objective | [SLO-1, from `slo-specification-tmpl` for this service] |
| Target | [99.9%] |
| Measurement window | [30-day rolling] |
| Derived budget | [≈43m 12s] |
| Indicator behind it | [SLI-1: good-event definition / valid-event denominator / source] |
| Source document | [path to the SLO specification] |

If any field above is blank, this policy cannot be written. A budget policy without a measurable
indicator governs nothing.

---

## 2. How burn is read

| Reading | Definition | Reported by |
|---|---|---|
| Consumed | Budget spent since the window opened | `@ops:reliability-lead` |
| Remaining | Budget left in the window | `@ops:reliability-lead` |
| **Burn rate** | Consumption pace against even pace over the window | `@ops:reliability-lead` |

**Burn rate governs, not remaining balance.** A budget half spent in the last hour and a budget half
spent over a quarter are different situations and this policy responds to them differently.

| Burn pattern | Interpretation | First response |
|---|---|---|
| Slow, even | Normal cost of operation | None. This is what the budget is for. |
| Spike, budget still healthy | Possible active failure | Investigate the spike → `@ops:incident-lead` |
| Slow, budget draining across windows | Structural — the target or the system is wrong | Re-run `*slo-design`; consider `@ops:flow-lead` |
| Exhausted twice in three windows | The target is wrong or the system is | Escalate to service owner + `@architect` |

---

## 3. Consequences by budget state

Fill every row. Every consequence names both the decider and the executor.

| Budget state | Consequence | Decided by | **Executed by** |
|---|---|---|---|
| > 50% remaining | [Normal release cadence. Risky changes permitted and budgeted from the remainder.] | [team] | **`@devops`** |
| 25–50% remaining | [Risky changes require a stated rollback plan. Reliability items enter the next sprint.] | [team lead] | `@dev` implements · **`@devops`** releases |
| < 25% remaining | [Feature releases pause except changes that reduce burn. Reliability work takes priority.] | [service owner] | **`@devops`** holds the gate |
| Exhausted | [Full feature freeze until recovery above the exit threshold.] | [service owner] | **`@devops`** holds the gate |
| Fast-burn alert fires | [Immediate investigation regardless of remaining balance.] | [on-call] | `@ops:incident-lead` coordinates · **`@devops`** executes any mitigation |

**Consequences deliberately excluded:** [e.g. no automatic rollback — the policy does not decide
per-change safety, and an automatic action here would place a mechanical decision outside `@devops`].

---

## 4. Exit conditions

A consequence with no exit is a permanent state that nobody agreed to.

| Consequence | Exits when | Verified by | Does **not** exit because |
|---|---|---|---|
| [Feature freeze] | [rolling-window budget returns above 25%] | `@ops:reliability-lead` reports it | [a release is urgent — urgency is what the budget was for] |
| [Priority inversion to reliability work] | [budget above 50% for one full window] | `@ops:reliability-lead` | [the backlog is uncomfortable] |

---

## 5. Deliberate spends

Some budget is spent on purpose. Record it in advance so the burn review can separate deliberate
from unplanned.

| Planned spend | Expected cost | Window | Approved by | Executed by |
|---|---|---|---|---|
| [failover drill] | [≈9m] | [date] | [service owner] | **`@devops`** |
| [migration cutover] | [≈t] | [date] | [service owner] | **`@devops`** |

---

## 6. Authority audit — do not publish until this passes

- [ ] Every row in Section 3 has a non-empty **Executed by** cell
- [ ] Every consequence involving a gate, freeze, pipeline, release, deploy or rollback names **`@devops`**
- [ ] No consequence is written as something this squad performs
- [ ] Every consequence in Section 3 has a matching exit condition in Section 4
- [ ] The decider in each row is a named role or person, not "the team decides" without a tiebreak
- [ ] The policy states that it is a rule and not a mechanism (Section 0 present and intact)

A failure on any line above means the policy is incomplete. Publishing it anyway is how a squad that
operates nothing ends up appearing to operate something.

---

## 7. Review

| Field | Value |
|---|---|
| Review date | [+2 windows] |
| Reviewed against | Actual burn, actual consequences invoked, and whether any consequence was invoked by someone other than its named executor |
| Trigger for early review | Budget exhausted twice in three windows, or any consequence executed outside this policy |

---

## Attribution

The error budget model applied here — the budget as the objective's complement, spent deliberately
and governed by a written policy — is published in *Site Reliability Engineering* (O'Reilly, 2016),
Ch. 3 "Embracing Risk", and developed in *The Site Reliability Workbook* (O'Reilly, 2018).
`@ops:reliability-lead` applies that framework with attribution and is not its authors.

The requirement that every consequence name its executing agent is an AEXOS constitutional
constraint (Article II — Agent Authority), not a position taken from the source.

## Related

- Objective this governs: `squads/ops/templates/slo-specification-tmpl.md`
- Quality bar before publication: `squads/ops/checklists/slo-quality-checklist.md`
- Budget arithmetic and indicator failure modes: `squads/ops/data/sli-types.yaml`
