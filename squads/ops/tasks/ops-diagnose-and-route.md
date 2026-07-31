---
task: Diagnose And Route An Operations Request
owner: "@ops-chief"
owner_type: agent
atomic_layer: task
Input: |
  - request: The operations request in the requester's own words (required)
  - is_active_failure: Whether something is failing right now (required, yes/no)
  - implied_action: Any action the request implies on a running system (optional)
  - existing_artifacts: Paths to operational policies already written for this system (optional)
  - requester: Who is asking and what decision they must make (optional)
Output: |
  - authority_note: Which agent is authorized to perform any implied action, produced before routing
  - restatement: The request restated in the owning discipline's vocabulary, confirmed with the requester
  - owner: Exactly one owning specialist, with the near-miss disciplines and why each was excluded
  - short_answer: A usable partial answer given before the handoff
  - sequence: Dependency-ordered specialist engagement plan when more than one is genuinely needed
  - handoff_brief: Written brief so the receiving specialist does not re-elicit context
  - record_path: Versioned file where the routing decision is stored
Checklist:
  - "[ ] Check for active failure first; if yes, route to @incident-lead immediately and skip triage ceremony"
  - "[ ] Name the authorized agent for any implied mechanical action, before any routing"
  - "[ ] Restate the request in the owning discipline's vocabulary and confirm the restatement"
  - "[ ] Apply the reframing patterns and state any reframe out loud"
  - "[ ] Name exactly one owning specialist and list the near misses with exclusion reasons"
  - "[ ] Confirm the request is still an operations question, not a core-agent question"
  - "[ ] Give a short usable answer without doing the specialist's deep work"
  - "[ ] Sequence multiple specialists by dependency when several are genuinely required"
  - "[ ] Write the handoff brief with context, evidence on hand, and the specific command to run"
  - "[ ] Verify no output of this task configures, deploys, releases, gates or pushes anything"
  - "[ ] Persist the routing decision as a versioned file in the repository"
---

# Diagnose And Route An Operations Request

Materializes `@ops-chief` `*diagnose`. Also covers `*authority-check` as its mandatory second step,
because in this domain the authority question is answered before the routing question.

## Purpose

Take any operations request and produce three things: who is **authorized** to act on it, who
**owns** it as a discipline, and a **handoff brief** that lets that owner start with context. A
confident answer from the wrong discipline is worse than a routing decision. A confident answer
that implies the wrong hands on infrastructure is worse than both.

## Boundary — read before executing

This squad **decides and documents**. `@devops` **operates**. There is no exception for severity,
urgency, seniority or convenience.

| This task may produce | This task may never do |
|---|---|
| A finding about who is authorized | Deploy, roll back, fail over, restart, scale |
| A routing decision and a handoff brief | Configure or change CI/CD, pipelines, build systems |
| A short usable partial answer | Hold a gate, execute a freeze, manage a release |
| A dependency-ordered specialist sequence | `git push`, PRs, MCP configuration |

Where the output implies an action on infrastructure, this task writes the **instruction** and
names **@devops** as the executor. It never executes. Implementation is `@dev`; quality gates are
`@qa`; backlog order is `@po`; story creation is `@sm`.

The test that resolves nearly every case: **if it changes a running system, it is not ours. If it
changes what we have agreed to do, it is.**

## Pre-conditions

| # | Condition | Blocking | How to check |
|---|---|---|---|
| 1 | The request is stated in at least one sentence | Yes | The requester's own words are on record |
| 2 | It is known whether something is actively failing | Yes | Ask directly: "is something broken right now?" |
| 3 | `squads/ops/squad.yaml` is readable | Yes | Read it — it is the routing surface |
| 4 | Existing operational policies for this system are located, if any | No | Search the repository; absence is a finding, not a blocker |

If condition 2 returns **yes**, stop this procedure and jump to Step 0.

## Procedure

### Step 0 — Active incident short-circuit

If something is failing right now: route to `@ops:incident-lead` `*declare` immediately. Do not
run triage. Say the words: *"Active incident. No triage — @incident-lead, now. We will do the
routing afterwards."* Return to Step 1 only after the response has a commander.

Triage ceremony during an outage is itself a failure mode.

### Step 1 — Authority, before anything else

Read the request for an implied **mechanical action**. If one exists, name its authorized agent
before naming any specialist.

| Implied action | Who decides | Who executes |
|---|---|---|
| Deploy, rollback, failover, restart, scale | Named decider in the relevant policy | **@devops, exclusive** |
| Change CI, pipeline, build or release path | Named decider | **@devops, exclusive** |
| Hold a gate, execute a freeze | Named decider in the budget policy | **@devops, exclusive** |
| Publish to a status page or external channel | Accountable human | **@devops** |
| `git push`, PR, MCP configuration | — | **@devops, exclusive** |
| Write code, instrumentation or automation | — | `@dev` |
| Change verification, gate scope or test strategy | — | `@qa` |
| Order the backlog, size or draft stories | — | `@po` and `@sm` |
| Choose architecture, redundancy, failure domains | — | `@architect` |
| Decide target, constraint, method, stop rule, incident posture | **This squad** | — |
| Anything that sounds like *doing* rather than *deciding* | Assume it is not ours and check | — |

The dangerous requests are the ones that sound operational: *stop the line*, *freeze releases*,
*roll it back*, *gate the pipeline*. Each is something this squad can write a rule about, and none
of them are things this squad can do. Say that out loud every time one appears.

Write the authority note now, as prose, before proceeding.

### Step 2 — Restate

Write the request in the owning discipline's vocabulary. Show the restatement to the requester and
confirm it. Do not silently answer a different question — in operations the requester acts on the
answer.

### Step 3 — Reframe

Check the request against the reframing patterns. State any reframe out loud.

| Stated | Usually owned by | Why |
|---|---|---|
| "We need to be more reliable" | `incident-lead` first if failures repeat, then `reliability-lead` | Raising a target on a system that repeats its failures commits to something nothing has changed to support |
| "We should automate this, it is killing us" | `lean-lead` first, then `reliability-lead` | Automating a wasteful step makes it permanent and faster |
| "Delivery is slow, we need to hire" | `flow-lead` | Capacity added away from the constraint changes throughput by zero |
| "Can we release more often?" | `flow-lead` for the queue, `reliability-lead` for the budget policy — `@devops` owns every mechanical change | Both a flow policy and a risk-appetite question |
| "We keep firefighting and never improve" | `reliability-lead` measures the toil, then `flow-lead` | The claim is quantifiable before it is arguable |
| "The build breaks and everyone ignores it" | `lean-lead` for the stop rule, `incident-lead` if users are hit | A jidoka question; the halt itself is `@devops` |
| "What went wrong last week?" | `incident-lead` | A retrospective account of a failure is a post-incident analysis |
| "Should we freeze releases?" | `reliability-lead` writes the rule; the named decider decides; `@devops` executes | A freeze is a budget-policy consequence |

### Step 4 — Name exactly one owner

| Discipline | Route to | Covers | Not theirs |
|---|---|---|---|
| Reliability | `reliability-lead` (Keel) | SLIs and SLOs, error budgets and budget policy, cost of a nine, toil definition and capping, the four golden signals, alerting posture, accepted risk | Where work stops flowing; process waste; live incident command; monitoring configuration; instrumentation implementation |
| Flow | `flow-lead` (Throat) | Constraint identification and type, exploitation before investment, subordination, buffers, elevation cases, throughput versus local optima, work in progress, inertia | Waste inside a step; availability targets; live incidents; pipeline mechanics; backlog order |
| Lean | `lean-lead` (Kaizen) | Waste by category, value-added analysis, just-in-time and batch policy, stop-rule authorship, standard work, five whys, improvement cycles | Which step caps throughput; technical toil classification; incident command; actually halting anything; verification changes |
| Incident | `incident-lead` (Klaxon) | Declaration and severity, command roles, timeline, communication cadence, stand-down, blameless analysis, contributing factors, corrective action routing, recurrence, near misses | Any mitigation action; targets and thresholds; chronic delivery slowness; process countermeasure design |

Route to **exactly one** owner. Broadcasting to four specialists produces four partial answers
built on four unstated assumptions and no decision. List the near misses and why each was excluded.

Selection heuristics:

- What are we promising, and can we measure it? → `reliability-lead`
- Where does work stop, and what caps throughput? → `flow-lead`
- What is this process carrying that it does not need? → `lean-lead`
- Something failed, or keeps failing → `incident-lead`
- Operational load is high → `reliability-lead` measures it as toil first; the measurement decides whether `lean-lead` removes it or `@dev` automates it
- Delivery is slow → `flow-lead` first, always

### Step 5 — Boundary check

Confirm the request is still an operations question. If it has left the surface, route to the core
agent that owns it and stop: `@pm` for epic framing and PRD, `@sm` for story drafting, `@po` for
backlog, `@architect` for system design, `@data-engineer` for schema and query work, `@qa` for
verification, `@dev` for implementation, `@devops` for everything mechanical.

### Step 6 — Depth check

Can this be answered navigationally, or does it require a method? Answer directly only for
cross-cutting, navigational, authority or definitional questions. Anything requiring a method
belongs to the specialist who carries it. When unsure, route — and say why the specialist is
better placed.

### Step 7 — Sequence, when several are genuinely needed

Order by dependency, not by seniority.

- **Constraint first when throughput is in question.** An improvement at a non-constraint changes nothing.
- **Measurement first when load is in question.** A target set before the toil load is known commits to something the rotation cannot sustain.
- **Recurrence first when failures repeat.** A recurrence is a finding about the previous analysis.
- **Never:** automation before the constraint is known; a target before the load is measured; a stop rule before the constraint is located.

State what would be wasted by running the specialists out of order.

### Step 8 — Give the short usable answer

Enough to unblock the requester today, explicitly labelled as the usable version rather than the
defensible one. Do not produce an SLO, a constraint finding, a waste register or a stop rule here —
those are the specialists' artifacts and producing them here creates a policy no specialist owns.

### Step 9 — Write the handoff brief

The brief contains, at minimum:

1. The request as stated, and the confirmed restatement
2. The authority note from Step 1, verbatim
3. The evidence already on hand and where it lives
4. The specific command to run, with arguments
5. What the specialist must **not** treat as authorized

### Step 10 — Persist

Write the routing decision to a versioned file in the repository. A routing decision that exists
only in a chat transcript did not happen (Constitution Article I — CLI First).

## Acceptance criteria

- [ ] Active failures were routed to `@incident-lead` immediately, without triage ceremony
- [ ] Any implied mechanical action has its authorized agent named **before** the routing decision
- [ ] The request is restated in the owning discipline's vocabulary and the restatement was confirmed
- [ ] Any reframe was stated out loud, never applied silently
- [ ] Exactly one owning specialist is named, with the near misses and their exclusion reasons
- [ ] A short usable answer was given before the handoff, and it contains no specialist artifact
- [ ] Multi-specialist work is sequenced by dependency, with the cost of the wrong order stated
- [ ] The handoff brief lets the specialist start without re-eliciting context
- [ ] No statement in the output can be read as authorization to touch infrastructure, a pipeline or a release
- [ ] The routing decision is a versioned file in the repository
- [ ] Constitution Article IV — no operational claim was generated here; every claim traces to a specialist artifact or is marked as an assumption

## Handoff

| To | When |
|---|---|
| `@ops:reliability-lead` | Indicators, objectives, error budgets and budget policy, cost of a nine, toil measurement, golden signals, alerting posture, accepted risk |
| `@ops:flow-lead` | Constraint identification, exploitation and subordination, buffer and release policy, elevation cases, queue and work-in-progress analysis, inertia audits |
| `@ops:lean-lead` | Waste identification, value-added analysis, just-in-time and batch policy, stop-rule authorship, standard work, five-why tracing, improvement cycles |
| `@ops:incident-lead` | Declaration and severity, command roles, timeline, stand-down, blameless analysis, contributing factors, corrective action routing, recurrence, near misses |
| `@devops` | Every CI/CD, pipeline, build, deploy, rollback, failover, restart, scaling, infrastructure, configuration, gate, freeze, release, status-page, MCP and push action — **exclusive authority, no exceptions** |
| `@dev` | Implementation of instrumentation, automation or corrective actions |
| `@qa` | Quality gates, verification scope, test strategy |
| `@architect` | System design, redundancy topology, failure domains |
| `@pm` / `@po` / `@sm` | Epic framing; backlog space; story creation and working agreements |

## Attribution

`@ops-chief` carries no operations methodology of its own. It is an original orchestrator role and
claims no external source. The published methods live in the specialists, each attributed in its
own file — and one of them, `incident-lead`, is attributed to a discipline rather than to an
author, deliberately. Inaccurate attribution is worse than no attribution.

## Related

- **Agent:** `squads/ops/agents/ops-chief.md` (Fulcrum)
- **Manifest:** `squads/ops/squad.yaml`
- **Elicitation:** `.aexos-core/development/tasks/advanced-elicitation.md`
- **Document generation:** `.aexos-core/development/tasks/create-doc.md`
- **Current state snapshot:** `.aexos-core/development/tasks/project-status.md`
- **Self-critique before circulation:** `.aexos-core/development/checklists/self-critique-checklist.md`
- **Base document structure:** `.aexos-core/development/templates/aexos-doc-template.md`
