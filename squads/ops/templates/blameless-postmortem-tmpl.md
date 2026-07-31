# Blameless Post-Incident Analysis — [INC-YYYY-NNN]

**Template ID:** OPS-TMPL-009
**Produced by:** `@ops:incident-lead` (Klaxon) — `*postmortem`, `*contributing-factors`,
`*counterfactual-check`, `*action-items`
**Artifact type:** Learning record. Versioned file in the repository.
**Owner:** [name] · **Circulated:** [date] · **Severity:** SEV-[n]

[[LLM: WRITING THIS DOCUMENT

There is deliberately no "root cause" field. Do not add one. A complex system fails when several
conditions align; selecting one and calling it the root cause is a decision about where to stop
looking, and it is usually made at the most comfortable stopping point — an external vendor, or the
last person to touch it. The remaining conditions stay in place and produce the next incident.

Write what people knew AT THE TIME. Hindsight makes every decision look obvious and produces a
narrative in which everyone was careless, which is both false and useless.

Strike every counterfactual. "Should have", "failed to", "if only", "obviously", "neglected to",
"simply forgot" — each describes an incident that did not happen.

Every contributing factor gets either a corrective action or an explicitly recorded risk acceptance
with an owner. A factor with neither is the most common way a postmortem quietly loses a finding.

Every action item gets an owner, a date, a verifiable change, and the agent whose authority covers
it. "Improve monitoring" is an intention, not an action item.]]

---

## 0. Scope and boundary

This document analyses. It changes nothing.

| This document produces | Who performs the resulting action |
|---|---|
| Impact statement and timeline | — |
| Contributing factors | — |
| Corrective actions with owners and dates | Routed per Section 7 |
| Any action touching deploy, rollback, failover, infrastructure, pipeline, release or status page | **`@devops`, exclusive** |
| Implementation | `@dev` |
| Verification, gate scope, test strategy | `@qa` |
| Targets, budgets, signals, accepted risks | `@ops:reliability-lead` |
| Process countermeasures and standard work | `@ops:lean-lead` |

---

## 1. Impact

| Field | Value |
|---|---|
| Duration of user-facing impact | [t] |
| What users experienced | [in user terms, not component terms] |
| Population | [how many, doing what] |
| Data loss or corruption | none / [describe] |
| Error budget consumed | [t] of [budget] — [n]% of the window |
| Financial or contractual consequence | [or "none identified"] |

---

## 2. Timeline — as known at the time

Carried from the incident record. Observation and inference remain marked separately.

| Time | Type | Entry | Executed by |
|---|---|---|---|
| | Observed | | — |
| | Known-at-the-time | | — |
| | Inference | | — |
| | Action | | **`@devops`** / [name] |
| | Confirmed | | — |

**Note on how this is written.** Entries record what responders could see at that moment, not what
existed and was unreached. Where information existed that nobody had a path to, that is a
contributing factor listed in Section 4 — not an implied criticism embedded in the timeline.

---

## 3. What went well

Recorded deliberately, and before the factors. An analysis that lists only failures teaches nothing
about what to preserve.

| # | What worked | Why it worked | Keep by |
|---|---|---|---|
| 1 | [e.g. the burn-rate alert fired on a user-visible symptom N minutes after onset] | [design reason] | [what would erode it] |

---

## 4. Contributing factors — not a root cause

State how many conditions had to align. Removing any one of them would have changed the outcome,
which is what makes each of them worth listing.

| # | Layer | Condition | Present before this incident? | Still present now? |
|---|---|---|---|---|
| 1 | External | [condition] | yes / no | yes / no |
| 2 | Technical | | | |
| 3 | Technical | | | |
| 4 | Procedural | | | |
| 5 | Organizational | | | |

**Why there is no root cause section.** [SOURCE: safety science and resilience engineering; the form
most engineers meet it in is Richard I. Cook's short treatise *How Complex Systems Fail*.] Choosing
one of these and naming it *the* cause would mean choosing where to stop looking. The external
factor is the tempting choice because it is outside our control, which is exactly why it is the
wrong place to stop — the remaining factors are ours, were present before this incident, and remain
present for the next one.

**Layer coverage check.** If every factor sits in one layer, the analysis stopped early. Technical,
procedural, organizational and external are each considered, and an empty layer is stated as
"considered, none found" rather than omitted.

---

## 5. Why each action made sense at the time

For every human action in the timeline, the productive question is not what should have been done.

| Action taken | What the person could see | Why it was the reasonable path then | What the system offered instead |
|---|---|---|---|
| [action] | [available signals, tooling, documentation] | [reasoning] | [nothing / an option that was not surfaced] |

> A system that converts one ordinary human action into a broad outage has a property worth
> understanding. The person who happened to be at the console is the least generalizable thing in
> the whole event.

---

## 6. Counterfactual audit

Every rewritten sentence is recorded, so the discipline is visible rather than asserted.

| Draft sentence | Problem | Rewritten as |
|---|---|---|
| [e.g. "The engineer should have checked the status page."] | Counterfactual + implied blame | [e.g. "No alerting path subscribed the provider status feed. Checking it was neither prompted nor routine."] |
| [e.g. "The team failed to test the fallback."] | Blame framing; describes an absence as a choice | [e.g. "The fallback path had no scheduled exercise. It was last used seven months before this incident."] |
| [e.g. "It was obvious the provider was degraded."] | Hindsight | [e.g. "At 09:22 the provider was suspected. Confirmation arrived at 09:38."] |

**Why this matters beyond tone.** [SOURCE: *Site Reliability Engineering*, O'Reilly 2016, Ch. 15
"Postmortem Culture".] People describe their actual reasoning only when doing so is safe. A draft
framed as accusation guarantees that the next incident's account is defensive, and a defensive
account is a less accurate one. Blameless is not politeness — it is how the record stays true.

**Blameless is not consequence-free**, and it does not mean nothing is anyone's responsibility. It
means this document is separated from any accountability process, so the account of what happened is
not shaped by what admitting it would cost. [SOURCE: the just-culture literature, notably Sidney
Dekker's writing.]

---

## 7. Corrective actions

Every row: an owner who is a person, a date, a change whose completion can be verified, and the
agent whose authority covers it.

| ID | Action | Addresses factor | Owner | Due | **Routed to** | Verifiable by |
|---|---|---|---|---|---|---|
| CA-1 | [specific change] | [#] | [name] | [date] | `@ops:reliability-lead` specifies · **`@devops`** configures | [observable state] |
| CA-2 | | | | | `@dev` implements · `@qa` verifies | |
| CA-3 | | | | | `@dev` implements · **`@devops`** releases | |
| CA-4 | [e.g. quarterly exercise of the fallback path] | | | | **`@devops`** schedules and executes | |
| CA-5 | [e.g. runbook states who is authorized] | | | | `@ops:lean-lead` drafts as standard work | |
| CA-6 | [e.g. assign an owning team] | | | | **Human decision — no agent authority covers it** | |

### 7.1 Rejected from the draft

| Proposed | Why it is not an action item |
|---|---|
| "Improve monitoring" | No verifiable completion state. Became CA-[n] with a named feed and a named path. |
| "Be more careful during provider incidents" | An exhortation. Erodes within weeks; guarantees recurrence. |
| "Better documentation" | Not verifiable. Name the document, the section and the reader. |

### 7.2 Factors with no action

| Factor | Why no action | Accepted risk recorded? | Owner | Review date |
|---|---|---|---|---|
| [#] | [e.g. outside our control] | yes → handed to `@ops:reliability-lead` risk register | [name] | [date] |

**A contributing factor with neither an action nor a recorded acceptance is a finding that has been
quietly lost.** It reappears in the next incident as though it were new.

---

## 8. Recurrence

| Field | Value |
|---|---|
| Prior occurrences | [IDs, or "none found — and where that was checked"] |
| If prior occurrences exist, `*recurrence-review` was run first | yes / no |
| Which of the three applies | Earlier actions addressed a symptom · were never implemented · were implemented and eroded |
| Consequence for this analysis | [what changes because of the above] |

Running a fresh postmortem on a repeat incident without first examining why the previous corrective
actions did not hold reproduces the same findings and the same unimplemented actions.

---

## 9. Feedback into policy

Corrective actions routed only to implementation leave the learning loop open. Record what this
analysis changed upstream.

| Policy artifact | Changed? | What changed | Owner |
|---|---|---|---|
| SLO / error budget policy | yes / no | | `@ops:reliability-lead` |
| Severity matrix | yes / no | | `@ops:incident-lead` |
| Standard work / stop rule | yes / no | | `@ops:lean-lead` |
| Flow or release policy | yes / no | | `@ops:flow-lead` finding · **`@devops`** decision |
| Architecture | yes / no | | `@architect` |

If every row reads "no" across three consecutive postmortems, the loop is open and the same failure
will return on schedule. That is itself a finding for `@ops:ops-chief` `*coherence-check`.

---

## Attribution

This analysis applies a **discipline with no single author**. Naming one would be inaccurate, and
inaccurate attribution is worse than none.

Convergent documented sources: the **Incident Command System**, adapted from emergency response into
technology operations, for command structure and the separation of command from execution;
*Site Reliability Engineering* (O'Reilly, 2016), Ch. 14 "Managing Incidents" and Ch. 15 "Postmortem
Culture", for blameless analysis as an operational norm; **safety science and resilience
engineering** for the position that catastrophe in a complex system requires multiple contributing
failures rather than one — the form most engineers encounter it in is Richard I. Cook's short
treatise *How Complex Systems Fail*; and the **just-culture literature**, notably Sidney Dekker's
writing, for the distinction between learning from an error and accounting for it.

`@ops:incident-lead` does not claim that these sources agree on everything. Practices that are
common industry usage with no canonical citation are labelled as convention rather than attributed.

## Related

- Incident record this analyses: `squads/ops/templates/incident-record-tmpl.md`
- Quality bar before circulation: `squads/ops/checklists/postmortem-quality-checklist.md`
- Severity criteria: `squads/ops/data/severity-levels.yaml`
- Command roles: `squads/ops/data/incident-command-roles.yaml`
