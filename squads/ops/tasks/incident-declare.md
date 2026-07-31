---
task: Declare An Incident And Assign Command
responsavel: "@incident-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - observed_impact: What users are experiencing right now, stated as observation not diagnosis (required)
  - population: How many users and which journeys, as far as it is known at this moment (required)
  - severity_matrix: The written severity criteria, if one exists (optional; its absence is itself a finding)
  - available_responders: Who is present and what each can actually do (required)
  - reversibility: Whether the failure appears recoverable, if known (optional)
  - accepted_risks: Any recorded accepted risk that covers this failure mode (optional)
Saida: |
  - incident_record: An opened, identified incident record with declaration time and observed impact
  - severity: A classification against written criteria, with the reason, and any reclassification recorded
  - command_structure: Named commander, operations, communications and scribe, plus the agent holding each mechanical authority
  - timeline: An open contemporaneous timeline distinguishing observation from inference
  - comms_cadence: Update interval, audiences, and who approves and publishes anything external
  - authority_note: An explicit statement that this agent coordinates and records, and that @devops executes every mechanical action
  - next_checkpoint: A stated time for the next update, whether or not anything has changed
Checklist:
  - "[ ] State the observed impact before any diagnosis"
  - "[ ] Classify severity against the written criteria, or record that no matrix exists"
  - "[ ] Declare; when two levels are arguable, take the higher and reclassify downward with a recorded reason"
  - "[ ] Name one commander, out loud, who is not executing"
  - "[ ] Assign operations, communications and scribe roles explicitly"
  - "[ ] Name @devops as the holder of every mechanical authority the response may need"
  - "[ ] Open the timeline with time, type, content and executing agent per entry"
  - "[ ] Set the communication cadence and the audiences, including 'no change yet' updates"
  - "[ ] State plainly that this agent coordinates and does not mitigate"
  - "[ ] Set the next checkpoint time before doing anything else"
  - "[ ] Persist the incident record as a versioned file, not a chat channel"
---

# Declare An Incident And Assign Command

Materializes `@incident-lead` `*declare`, with `*severity` and `*command-structure` as its two
inseparable halves. This task performs **no mitigation**.

## Purpose

Put structure around a failure in about ninety seconds: what is observed, how severe it is, who is
commanding, and where the record lives. Declaring early costs a few minutes. Not declaring costs
the first hour — the hour in which nobody coordinated, three people worked in parallel unaware of
each other, and nothing was recorded.

## Boundary — read before executing, and again during the incident

This agent **coordinates and analyses**. It does not mitigate.

| This task produces | Who does the rest |
|---|---|
| Declaration, severity, command roles | Every deploy, rollback, failover, restart, scale, configuration change → **`@devops`, exclusive** |
| The timeline and the incident record | Pipeline, release and infrastructure changes → **`@devops`, exclusive** |
| Draft internal updates, and draft external ones | Approval by the accountable human; publication → **`@devops`** |
| Stand-down criteria and the analysis that follows | Implementation of corrective actions → `@dev`; verification changes → `@qa` |
| Routing of every corrective action | Targets, budgets and alert thresholds → `@ops:reliability-lead` |

Urgency is the argument that gets made for crossing this line, and it is exactly why the line
exists. An incident where the coordinator is also the one changing production is an incident with
no reliable record of what changed. Where the response needs a mechanical action, this task states
the **need** and names **@devops** as the executor; the timeline records their name against the
action. Coordination is not execution.

## Pre-conditions

| # | Condition | Blocking | How to check |
|---|---|---|---|
| 1 | Someone has stated an observed user-facing effect | Yes | Impact before cause, always |
| 2 | At least one responder is present | Yes | A declaration with nobody to command is a note |
| 3 | The record location is agreed | Yes | A versioned file in the repository, not a chat channel |
| 4 | A written severity matrix exists | No | If it does not, classify with stated reasoning and record the gap as a finding for `*severity-matrix` |

## Procedure

### Step 0 — Declare-or-not

| Situation | Decision |
|---|---|
| Users are affected and it is not self-recovering | Declare |
| Unclear whether users are affected | Declare at low severity and find out |
| Self-recovered but would have been severe | Not an incident — run the near-miss analysis instead |
| Degradation within the error budget and expected | Not an incident — `@ops:reliability-lead`'s window |
| Recurring known issue with an accepted risk on file | Declare anyway and reference the accepted risk |
| Cannot decide | **Declare.** The asymmetry favours declaring. |

Downgrading later costs nothing.

### Step 1 — State the observed impact

Write what users are experiencing, in observation language. Not "the payment adapter is broken" —
"checkout submissions are failing; error rate on the submit path is 61%". Diagnosis comes later and
is cheaper after mitigation.

### Step 2 — Classify severity

Against the written criteria where one exists. The dimensions:

| Dimension | Question |
|---|---|
| User impact | How many, doing what |
| Scope | One journey, one region, or everything |
| Data risk | Loss, corruption or exposure raises severity regardless of user count |
| Reversibility | An irreversible failure is a different problem from a recoverable one; it raises severity by one level |

Rules:

- Data loss, corruption or security exposure → highest severity regardless of user count
- Core journey unavailable for a broad population → high
- Core journey degraded, or a narrow population unavailable → medium
- Peripheral function affected with a known workaround → low
- When two levels are arguable → **take the higher one** and reclassify downward with a recorded reason

A scale invented mid-incident is calibrated by adrenaline. If no matrix exists, say so in the
record and classify with stated reasoning.

### Step 3 — Open the record

Assign an incident identifier and open the file. Record declaration time, observed impact,
population, severity and the reason for it, and reversibility as known **at this moment**.

### Step 4 — Assign command, out loud

| Role | Owns | Does not |
|---|---|---|
| Incident commander | Coordination, sequencing, severity, the decision to stand down | Execute mitigation |
| Operations | Investigation, proposing mitigations, executing what is within their own authority | — |
| Communications | Cadence, audiences, internal updates, drafting external ones | Approve or publish customer-facing statements |
| Scribe | The contemporaneous timeline, marking observation separately from inference | — |
| **Mechanical authority** | **`@devops`** — deploy, rollback, failover, restart, scale, infrastructure and configuration change, release, status-page publication, push | — |

**One commander, named out loud.** The commander does not have their hands in the system: someone
deep in a terminal cannot also track state, sequence actions and manage communication, and when the
same party does both the timeline is the first thing lost. If the commander is also executing,
reassign one of the two roles now.

Every handoff of command is stated explicitly and recorded, with the incoming holder restating
their understanding. A handoff that was not stated out loud did not happen.

### Step 5 — Open the timeline

Every entry carries: **time**, **type**, **content**, and for actions the **executing agent**.

| Type | Meaning |
|---|---|
| Observed | Something seen in a log, a metric or the system |
| Known at the time | What responders could see — never what was knowable |
| Inference | A suspicion, recorded as a suspicion; confirmation is a separate later entry |
| Action | What was done, by whom, under whose authority |
| Confirmed | An earlier inference now established, timestamped separately |

The timeline is written **during** the response, not reconstructed afterwards from memory and chat
scrollback. Constitution Article IV — every line traces to a log, a message, a metric or a named
person's account; an inferred event is labelled as an inference.

### Step 6 — Sequence any mitigation, and name who executes it

Mitigate first, diagnose second — restoring service and understanding the failure are different
objectives, and the second is cheaper after the first. Preserve evidence where doing so does not
delay mitigation; service restoration wins the tie.

Rules for this task:

- One action at a time, **stated before it is taken**, with its expected effect. Parallel uncoordinated mitigations make the effect of each unknowable and can compound the failure.
- Any action requiring deploy, rollback, failover, restart, scaling or configuration change is executed by **`@devops`**, by name, and the timeline records who.
- Nothing in this incident is deployed, rolled back, restarted, scaled or failed over by this agent or on this agent's instruction alone.

### Step 7 — Set the communication cadence

Fixed interval, defined audiences, including "no change yet". Communication is a scheduled
obligation, not an interruption — a fixed cadence prevents the response being interrupted by status
requests.

Anything customer-facing is **drafted** here, kept consistent with the timeline so nothing is
claimed that the record does not support, **approved by the accountable human**, and **published by
`@devops`** through the owning channel. An external statement issued at incident speed is how an
organization commits publicly to a cause it has not confirmed — and the line most often escaping
into a public statement is a suspicion, not a fact.

### Step 8 — Set the next checkpoint

Name a time for the next update whether or not anything has changed, then hand the response to the
commander.

### Step 9 — Persist

The record is the deliverable. An incident that lives only in a chat channel has no record, and
will be rediscovered at full price by whoever is on call next time (Constitution Article I — CLI
First).

## Acceptance criteria

- [ ] The declaration was made early, against written criteria where they exist, with the gap recorded where they do not
- [ ] Severity is recorded with its reason, and any reclassification is visible rather than hidden
- [ ] One commander is named explicitly, coordinating and not executing
- [ ] Operations, communications and scribe roles are assigned, and any handoff is stated out loud and recorded
- [ ] `@devops` is named as the holder of every mechanical authority the response may need
- [ ] The timeline is contemporaneous and distinguishes observation, inference, confirmation and action
- [ ] Every action entry records the agent who executed it under their authority
- [ ] No remediation action was performed or unilaterally instructed by this task
- [ ] The communication cadence, audiences and approval path for external messages are defined
- [ ] No customer-facing message was issued from here
- [ ] A next checkpoint time is stated
- [ ] The record is a versioned file in the repository, not a chat channel

## Handoff

| To | When |
|---|---|
| `@devops` | Every deploy, rollback, failover, restart, scaling, infrastructure and configuration change, release, status-page publication and push — **exclusive authority, no exceptions, including during an active incident** |
| `@dev` | Every corrective action requiring implementation |
| `@qa` | Corrective actions that change verification, gate scope or test strategy |
| `@ops:reliability-lead` | Contributing factors implying target, budget, signal or alerting changes, and accepted risks for the risk register |
| `@ops:lean-lead` | Contributing factors that are process conditions needing countermeasure design and standard work |
| `@ops:flow-lead` | Incident load is consuming the delivery constraint, or frequency itself is the chronic problem |
| `@ops:ops-chief` | The request is chronic rather than acute, or findings conflict with reliability, flow or waste priorities |
| `@architect` | Contributing factors are structural — coupling, missing isolation, no failure domain |
| `@po` / `@sm` | Backlog space for corrective actions; response expectations becoming working agreements |

After stand-down this task hands to the blameless post-incident analysis, which enumerates
**contributing factors** rather than a single root cause, writes what was known at the time, removes
counterfactuals, and gives every action an owner, a date, a verifiable change and the agent whose
authority covers it.

## Attribution

`@incident-lead` is founded on a **discipline**, not on a single published work. The discipline has
no single author and attributing it to one would be inaccurate — inaccurate attribution is worse
than none. Its convergent documented sources are named so any recommendation here can be checked:

| Element applied here | Source |
|---|---|
| Command structure; separation of command from execution; explicit role assignment and formal handoff | The Incident Command System, developed for emergency response in the United States and adapted into technology operations |
| Blameless post-incident analysis as an operational norm | *Site Reliability Engineering* (O'Reilly, 2016), chapters on managing incidents and on postmortem culture |
| Multiple contributing factors rather than a single root cause | Safety science and resilience engineering; the form most engineers encounter it in is Richard I. Cook's short treatise *How Complex Systems Fail* |
| Learning from an error separated from accounting for it | The just-culture literature, notably Sidney Dekker's writing |

These sources do not agree on everything. Only the practices they converge on are applied here as
method. Where a practice is common industry usage with no canonical citation, it is labelled as
**convention** rather than attributed.

## Related

- **Agent:** `squads/ops/agents/incident-lead.md` (Klaxon)
- **Document generation for the incident record:** `.aexos-core/development/tasks/create-doc.md`
- **Elicitation for participant accounts:** `.aexos-core/development/tasks/advanced-elicitation.md`
- **Course correction when corrective actions change agreed scope:** `.aexos-core/development/tasks/correct-course.md`
- **Risk framing when converting findings into preventive work:** `.aexos-core/development/tasks/qa-risk-profile.md`
- **Self-critique before a draft is circulated:** `.aexos-core/development/checklists/self-critique-checklist.md`
- **Base document structure:** `.aexos-core/development/templates/aexos-doc-template.md`
