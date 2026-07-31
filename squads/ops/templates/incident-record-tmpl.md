# Incident Record — [INC-YYYY-NNN]

**Template ID:** OPS-TMPL-008
**Produced by:** `@ops:incident-lead` (Klaxon) — `*declare`, `*severity`, `*command-structure`,
`*timeline`, `*comms-plan`, `*stand-down`
**Artifact type:** Contemporaneous record. Versioned file in the repository, written **during** the
response.

[[LLM: FILLING THIS TEMPLATE DURING A RESPONSE

Sections 1–3 take about ninety seconds. Do them first, before anything else, including before
understanding what is happening. Impact, severity, command — in that order.

Section 4 is written AS IT HAPPENS. A timeline reconstructed afterwards from chat scrollback is a
narrative, not a record, and it will be written from the outcome backwards.

Mark every entry with its type. An inference recorded as an observation is the single most common
way a postmortem becomes wrong, and it is the line that most often escapes into a public statement.

BOUNDARY, LOAD-BEARING EXACTLY NOW: this agent coordinates and records. It does not mitigate.
Deploy, rollback, failover, restart, scale, configuration change, release, status-page publication
and push are @devops, exclusively. Severity does not change that. Urgency does not change that.
Time of day does not change that. Every action entry in Section 4 records the agent who executed it.]]

---

## 0. Boundary

| This record produces | Who performs the action |
|---|---|
| Declaration, severity, command assignment | — |
| The factual timeline | — |
| Coordination and sequencing of proposed mitigations | — |
| **Every deploy, rollback, failover, restart, scaling and configuration change** | **`@devops`, exclusive** |
| Pipeline holds, gates, releases | **`@devops`, exclusive** |
| Drafted internal and external updates | Approval by the accountable human · publication by **`@devops`** |
| Corrective actions after stand-down | Routed per authority — see the postmortem |

Coordination held by the same party that executes is how an incident loses its record. That is the
reason for the separation, not a formality that relaxes under load.

---

## 1. Declaration

| Field | Value |
|---|---|
| Incident ID | INC-[YYYY]-[NNN] |
| Declared at | [HH:MM, timezone] |
| Declared by | [name] |
| **Observed impact** | [what users are experiencing, in user terms] |
| Population affected | [how many, doing what, where] |
| Detection source | [alert / customer report / internal observation] |
| Detected at | [HH:MM] — gap to declaration: [t] |

> Declare early and downgrade freely. Declaring something minor costs a few minutes. Not declaring
> something real costs the first hour — the hour nobody coordinated and nobody recorded.

---

## 2. Severity

| Field | Value |
|---|---|
| Severity | SEV-[n] |
| Criteria met | [quote the written criteria, do not paraphrase] |
| Criteria NOT met for the level above | [state it — this is what makes reclassification honest] |
| Data risk | none / loss / corruption / exposure |
| Reversibility | reversible / irreversible / **unknown at declaration** |

**Reclassifications**

| Time | From | To | Reason |
|---|---|---|---|
| | | | |

Reclassification is expected and is recorded, never quietly applied. Severity criteria:
`squads/ops/data/severity-levels.yaml`.

---

## 3. Command structure

| Role | Holder | Note |
|---|---|---|
| **Incident commander** | [name] | Coordinates. **Hands out of the system.** |
| Operations | [name] | Investigates and proposes mitigations |
| **Mechanical authority** | **`@devops`** | Executes every deploy, rollback, failover, restart, scaling and configuration change |
| Communications | [name] | Internal updates at [n]-minute cadence; drafts external ones |
| Scribe | [name or `@ops:incident-lead`] | Maintains the timeline |

**Command handoffs**

| Time | From | To | Incoming holder restated their understanding? |
|---|---|---|---|
| | | | yes / no |

A handoff that was not stated out loud did not happen, and the incoming holder inherits an unstated
model of the situation.

---

## 4. Timeline — written as it happens

| Time | Type | Entry | Executed by |
|---|---|---|---|
| [HH:MM] | Observed | [what was seen, from what source] | — |
| [HH:MM] | Known-at-the-time | [what responders could see — never what was knowable] | — |
| [HH:MM] | Inference | [a suspicion, marked as one] | — |
| [HH:MM] | Action | [what was done, and the expected effect stated before it was taken] | **`@devops`** / [name] |
| [HH:MM] | Confirmed | [an earlier inference, now confirmed, as a separate entry] | — |

**Entry types**

| Type | Means |
|---|---|
| Observed | Traceable to a log, metric, message or direct sighting |
| Known-at-the-time | What responders could see at that moment. Not what existed and was unreached. |
| Inference | A suspicion. Confirmation is a **separate later entry**, never a retro-edit of this one. |
| Action | Something changed. Records the expected effect stated beforehand and the executing agent. |
| Confirmed | An earlier inference, now established, with its evidence |

**One action at a time.** Each action states its expected effect before it is taken. Parallel
uncoordinated mitigations make the effect of each unknowable and can compound the failure.

---

## 5. Communication log

| Time | Audience | Channel | Content summary | Approved by | Published by |
|---|---|---|---|---|---|
| | internal | | [including "no change yet"] | — | Comms holder |
| | external | | [draft here] | **[accountable human]** | **`@devops`** |

Fixed cadence, whether or not anything changed. Updates are a scheduled obligation, not an
interruption — their absence is what causes the response to be interrupted by status requests.

**Nothing customer-facing is issued from this agent.** An external statement published at incident
speed commits the organization to a cause that is, at that moment, usually still an inference.

---

## 6. Stand-down

| Field | Value |
|---|---|
| Stand-down at | [HH:MM] |
| **Criteria met** | [the stated criteria, quoted — not "it seems fine now"] |
| Verified over | [duration at baseline] |
| What remains unresolved | [list] |
| Mitigations left in place | [e.g. fallback path still active] — owner: [name], removal: **`@devops`** |
| Continued monitoring | [what, by whom, until when] |
| Evidence preserved | [logs, snapshots, captures — and what was lost to mitigation] |

Stand-down is declared against criteria, not by fatigue.

---

## 7. Duration summary

| Interval | Value |
|---|---|
| Onset → detection | [t] |
| Detection → declaration | [t] |
| Declaration → command assigned | [t] |
| Declaration → first mitigation attempt | [t] |
| First mitigation → impact ends | [t] |
| Total user-facing impact | [t] |
| Error budget consumed | [t] — hand to `@ops:reliability-lead` |

---

## 8. Handover to analysis

| Field | Value |
|---|---|
| Postmortem owner | [name] |
| Due | [date, scaled to severity] |
| Participants to interview | [names] |
| Prior occurrences of this failure | [IDs, or "none found"] |
| **If a prior occurrence exists** | Run `*recurrence-review` **before** writing a new analysis. A recurrence is primarily a finding about the previous analysis. |

Analysis template: `squads/ops/templates/blameless-postmortem-tmpl.md`.

---

## Attribution

This role is founded on a **discipline with no single author**. Attributing it to one would be
inaccurate, and inaccurate attribution is worse than none.

Its convergent documented sources: the **Incident Command System**, developed for emergency response
in the United States and adapted into technology operations, for the separation of command from
execution and the explicit assignment and handoff of roles; *Site Reliability Engineering* (O'Reilly,
2016), Ch. 14 "Managing Incidents" and Ch. 15 "Postmortem Culture", for incident management and
blameless analysis as operational norms; safety science and resilience engineering for the position
that a complex system fails when several conditions align, in the form most engineers meet it —
Richard I. Cook's short treatise *How Complex Systems Fail*; and the **just-culture literature**,
notably Sidney Dekker's writing, for the separation of learning from an error and accounting for it.

These sources do not agree on everything. Only the practices they converge on are applied here.
Where something is common industry usage with no canonical citation, it is labelled as convention.

## Related

- Analysis artifact: `squads/ops/templates/blameless-postmortem-tmpl.md`
- Quality bar for the analysis: `squads/ops/checklists/postmortem-quality-checklist.md`
- Severity criteria: `squads/ops/data/severity-levels.yaml`
- Command roles: `squads/ops/data/incident-command-roles.yaml`
- Task: `squads/ops/tasks/incident-declare.md`
