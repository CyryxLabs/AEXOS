# Service Level Objective Specification — [SERVICE_NAME]

**Template ID:** OPS-TMPL-001
**Produced by:** `@ops:reliability-lead` (Keel) — `*sli-select`, `*slo-design`, `*error-budget`
**Artifact type:** Policy document. Versioned markdown in the repository.
**Owner:** [named person who can accept this target] · **Review date:** [+1 full window]

[[LLM: FILLING THIS TEMPLATE

This document sets a target. It does not configure, measure, gate, deploy or release anything.
Every section that implies a change to a running system MUST name `@devops` in its Executor column.

Refuse to fill Section 3 before Section 1 is complete. An objective written before the journey is
named will measure a component, and a component measured accurately is still the wrong thing.

Every number in this document is either traced to a data source or marked UNVERIFIED with a review
date. There is no third state. Constitution Article IV — No Invention.]]

---

## 0. Boundary — this document decides, it does not operate

| This document produces | Who performs the resulting action |
|---|---|
| SLI definitions and data sources | Instrumentation code → `@dev` |
| SLO targets and windows | — (a target is not an action) |
| Error budget arithmetic | — |
| Alert and threshold **specification** | Monitoring, alert routing, paging configuration → **`@devops`, exclusive** |
| Budget policy consequences | Every gate, freeze, hold and release → **`@devops`, exclusive** |
| Non-functional acceptance criteria | Test evidence and quality gate → `@qa` |
| Findings only architecture can satisfy | Redundancy, failover, dependency isolation → `@architect` |

If any line of this document is ever cited as authorization to configure monitoring, hold a
pipeline, cut a release or push, it is being misread. Urgency does not create an exception.

---

## 1. Critical user journeys

Name what a user is doing when they experience the failure. Not what process is running.

| # | Journey | Who performs it | What failure looks like to them | Business consequence |
|---|---|---|---|---|
| J1 | [e.g. Submit an order] | [population] | [e.g. Submit button returns an error] | [e.g. Lost transaction, support contact] |
| J2 | | | | |

**Journeys explicitly out of scope for this document:** [list, with a reason each]

> "The API is up" is not a journey. If no journey can be named, stop here and run
> `*sli-select` as an elicitation session before writing anything further.

---

## 2. Service level indicators

Each SLI is **good events / valid events, over a window**. Three fields are mandatory. An indicator
missing any one of them is not an indicator yet.

| ID | Journey | Form | Good-event definition | Valid-event denominator | Data source | Current value | Provenance |
|---|---|---|---|---|---|---|---|
| SLI-1 | J1 | Availability | [e.g. HTTP 2xx/3xx on POST /orders] | [e.g. all POST /orders excluding client 4xx] | [e.g. edge access logs] | [x.xx%] | measured / **UNVERIFIED** |
| SLI-2 | J1 | Latency | [served under Nms] | [same denominator] | [source] | [x.xx%] | |
| SLI-3 | | | | | | | |

**Indicators that cannot be computed today**

| ID | What is missing | Instrumentation request routed to | Objective status until it exists |
|---|---|---|---|
| SLI-n | [e.g. no event emitted on order visibility] | `@dev` | Provisional — no objective set |

**Blind spots.** State what each indicator will not see: [e.g. a correct HTTP 200 carrying an empty
cart is an implicit failure this availability SLI counts as success].

---

## 3. Service level objectives

Each objective is a target **and** a window **and** a justification. Missing any one, it is a slogan
with a percentage sign.

| ID | Indicator | Target | Measurement window | Justification (perceptibility or cost) | Provenance |
|---|---|---|---|---|---|
| SLO-1 | SLI-1 | [99.9%] | [30-day rolling] | [what the user perceives at this level and not at the next] | measured / UNVERIFIED |
| SLO-2 | SLI-2 | | | | |

### 3.1 Objectives deliberately not proposed

| Objective considered | Why it is declined | Routed to |
|---|---|---|
| [e.g. 99.99% availability] | [e.g. single-region write path with documented multi-minute failover — reachable only by architecture, not by effort] | `@architect` |

> 100% is the wrong target. [SOURCE: *Site Reliability Engineering*, O'Reilly 2016, Ch. 3
> "Embracing Risk".] Past a point users cannot perceive the difference, and users cannot reach you
> at 100% anyway — their networks, devices and intermediaries fail below whatever you achieve.

### 3.2 Floors that are not targets

| Contractual / regulatory floor | Source | Internal objective set above it | Gap |
|---|---|---|---|
| [e.g. 99.5% in customer SLA] | [contract ref] | [99.9%] | [so the internal signal fires before the external commitment breaks] |

---

## 4. Error budget

Budget = 1 − SLO, expressed over the measurement window. [SOURCE: SRE book, Ch. 3.]

| Objective | Target | Window | Budget |
|---|---|---|---|
| SLO-1 | [99.9%] | [30d] | [≈43m 12s] |

**Consumption this window**

| Window position | Consumed | Remaining | Burn rate vs. even pace |
|---|---|---|---|
| [day N of 30] | [t] ([n]%) | [t] | [n.nnx] |

**What spent it**

| Spend | Cost | Deliberate? | Evidence |
|---|---|---|---|
| [event] | [t] | yes / no | [change record, incident ID, or **UNVERIFIED**] |

**Reading.** [Burn rate against window, not remaining balance alone. Half a budget spent in one hour
and half spent over a quarter are different situations with different responses.]

> The budget is the release, migration, experiment and drill allowance. A window that closes with
> the budget untouched is not a success — it usually means the target is too loose or reliability is
> being over-bought at the cost of velocity.

---

## 5. Signal specification

Latency, traffic, errors, saturation. [SOURCE: SRE book, Ch. 6 "Monitoring Distributed Systems".]
This section **specifies**; it configures nothing.

| Signal | Computed from | Threshold | Routing | What it would miss | Executor |
|---|---|---|---|---|---|
| Latency | [source] | [tied to SLO-2, not to a round number] | page / ticket / log-only | [blind spot] | **`@devops`** |
| Traffic | | | | | **`@devops`** |
| Errors | | | | | **`@devops`** |
| Saturation | | | | | **`@devops`** |

**Paging rule.** A page requires a user-visible symptom, a documented action, and a tie to budget
burn. Everything cause-level becomes a ticket. A page with no documented action is training in
dismissing pages.

---

## 6. Operational load implied by this target

| Item | Hours/month | Passes the six-part toil test? | Verdict | Ranked payback |
|---|---|---|---|---|
| [work item] | [n] | [all six / fails "repetitive"] | toil / not toil | [months] |

**Total registered toil:** [n] hrs/month against [rotation size] — [n]% of capacity.
See `data/toil-taxonomy.yaml` for the six-part test and what fails it.

> Automation of anything above is built by `@dev` and operated by `@devops`. This document ranks; it
> does not implement.

---

## 7. Accepted reliability risks

| Risk | Expected impact on the budget | Accepted by (named person) | Date | Review date |
|---|---|---|---|---|
| [e.g. upstream provider has no proactive notification] | [t/window] | [name] | [date] | [date] |

An accepted risk with no name and no date becomes an unexplained contributing factor in a later
postmortem.

---

## 8. Downstream consequences and their executors

Every consequence names the agent authorized to perform it. A consequence with no named executor is
the most common route to an authority violation in this squad.

| Consequence implied by this document | Decided by | **Executed by** |
|---|---|---|
| Instrumenting SLI-n | Service owner | `@dev` |
| Configuring the signals in Section 5 | Service owner | **`@devops`** |
| Any gate, freeze or release hold from the budget policy | Named decider in the budget policy | **`@devops`** |
| Verifying the target as an acceptance criterion | `@qa` | `@qa` |
| Architectural change to reach a declined objective | `@architect` | `@dev` + **`@devops`** |

---

## 9. Provenance register

| Figure used in this document | Source | Status |
|---|---|---|
| [99.87% current availability] | [edge access logs, 30d] | measured |
| [expected failover duration] | [none — assumed] | **UNVERIFIED**, review [date] |

---

## Attribution

The framework applied here is published as *Site Reliability Engineering: How Google Runs Production
Systems* (O'Reilly, 2016), edited by Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard
Murphy, with practical extension in *The Site Reliability Workbook* (O'Reilly, 2018).

`@ops:reliability-lead` applies that framework with attribution. Where a practice here is common
industry convention rather than a documented position from those volumes, it is labelled as
convention and is not attributed.

## Related

- Checklist to run before publishing: `squads/ops/checklists/slo-quality-checklist.md`
- Indicator reference and failure modes: `squads/ops/data/sli-types.yaml`
- Budget policy artifact: `squads/ops/templates/error-budget-policy-tmpl.md`
- Task: `squads/ops/tasks/reliability-slo-design.md`
