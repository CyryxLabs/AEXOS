# Operations Squad

> Reliability, flow and constraints, continuous improvement, and incident response — as policy and method, never as execution.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `@ops-chief` (Fulcrum) | 5 agents, 5 tasks, 2 workflows

---

## What this squad does

The Operations Squad answers four questions that are constantly confused with each other:

| Question | Discipline | Owner |
|---|---|---|
| What are we promising, and can we measure it? | Reliability | `reliability-lead` |
| Where does work stop, and what caps throughput? | Flow and constraints | `flow-lead` |
| What is this process carrying that it does not need? | Continuous improvement | `lean-lead` |
| Something failed — who is commanding, and what did we learn? | Incident | `incident-lead` |

Most operations requests arrive stated as the wrong one of those four. "We should automate this, it is killing us" is usually a waste question, not an automation question. "Delivery is slow, we need to hire" is a constraint question, and capacity added away from the constraint changes throughput by zero. `@ops-chief` exists to catch that before a confident answer is produced by the wrong discipline.

Every output of this squad is a **document**: an SLO with an owner and a review date, a constraint finding with its evidence, a waste register with a value-time ratio, an incident record with a contemporaneous timeline. All of them are versioned files in the repository, because a policy that lives in a dashboard configuration or a chat channel cannot be reviewed (Constitution Article I — CLI First).

---

## THE BOUNDARY WITH `@devops` — read this first

**This squad defines policy and method. `@devops` operates.** This is the single highest risk in this squad, because almost everything it produces sounds like an instruction to go and do something.

| This squad may produce | This squad may never do |
|---|---|
| A stop-the-line **policy** | Stop the line |
| An error budget policy with gate and freeze rules | Hold a gate, execute a freeze, manage a release |
| A signal and threshold **specification** | Configure monitoring, alert routing or paging |
| A finding that a rollback is needed | Deploy, roll back, fail over, restart, scale |
| A pipeline or release-path **recommendation** | Change CI/CD, pipelines or build systems |
| A drafted external statement | Publish anything customer-facing or to a status page |
| Incident coordination and the record | Mitigate; `git push`; open or merge PRs; configure MCP |

The test that resolves nearly every case: **if it changes a running system, it is not ours. If it changes what we have agreed to do, it is.**

Three consequences that are load-bearing rather than decorative:

1. **Every workflow ends in a handoff phase, never an execution phase.** Where an output implies an action on infrastructure, the workflow writes the *instruction* — rationale, expected effect, rollback consideration — and names **`@devops`** as the executor. Both workflows in this squad terminate that way, and both treat a phase that executed anything as a void run.
2. **Every phase carries its own `boundary:` field.** The boundary is not stated once at the top of a document and then forgotten three phases later, which is exactly when it gets crossed.
3. **Urgency is not an exception.** During an active incident, `@devops` still holds every mechanical authority — deploy, rollback, failover, restart, scale, configuration, release, status page, push. An incident where the coordinator is also changing production is an incident with no reliable record of what changed. Coordination is not execution.

Other core boundaries: implementation is `@dev`; quality gates and verification scope are `@qa` (findings go to them as a redesign question, never as permission to weaken a gate); backlog order is `@po` (this squad supplies evidence, never a decree); story creation is `@sm`; redundancy, failure domains and structural coupling are `@architect`; epics and PRDs are `@pm`.

---

## Agents

| Tier | Agent | Persona | Icon | Based on | Focus |
|---|---|---|---|---|---|
| 0 | `ops-chief` | Fulcrum | 🔩 | Original (orchestrator) — carries no operations methodology of its own | Triage, authority check, routing, sequencing, coherence between the squad's policies |
| 1 | `reliability-lead` | Keel | 🛰️ | Beyer, Jones, Petoff & Murphy, *Site Reliability Engineering* (O'Reilly, 2016) | SLIs and SLOs, error budgets and budget policy, the cost of one more nine, toil, golden signals, alerting posture, accepted risk |
| 1 | `flow-lead` | Throat | 🕳️ | Eliyahu M. Goldratt, *The Goal* / Theory of Constraints (1984, with Jeff Cox) | Constraint identification, exploit before elevate, subordination, buffers, throughput vs local optima, work in progress, inertia |
| 2 | `lean-lead` | Kaizen | 🧹 | Taiichi Ohno, *Toyota Production System* (Japanese 1978; English translation 1988) | Waste by category, value-added analysis, just-in-time and batch policy, stop-rule authorship, standard work, five whys, improvement cycles |
| 2 | `incident-lead` | Klaxon | 🚨 | A discipline, not a single work — incident command and blameless post-incident analysis | Declaration and severity, command roles, timeline, communication cadence, stand-down, contributing factors, corrective action routing, recurrence, near misses |

### Attribution, and its caveats

Each agent declares the work that grounds its method in `based_on`, and each applies that framework **with attribution** — none of them *is* its author or speaks as one. Inaccurate attribution is worse than no attribution, so the caveats are stated rather than implied:

- **Ohno.** *Toyota Production System: Beyond Large-Scale Production* was published **in Japanese in 1978** and **in English translation in 1988**. Positions belonging to the broader lean tradition rather than to Ohno's book — value stream mapping notation, the muda/mura/muri triad as commonly taught, later lean-software adaptations — are labelled as **tradition** and are not attributed to Ohno. The source is a manufacturing account and `lean-lead` does not pretend otherwise: takt time, physical layout and machine changeover are not applied.
- **Goldratt.** Later flow conventions — work-in-progress limits, cumulative flow diagrams, queueing arguments from other schools — are used where useful and labelled as **convention**. They are **not** attributed to Goldratt.
- **SRE.** The framework is the 2016 O'Reilly volume edited by Betsy Beyer, Chris Jones, Jennifer Petoff and Niall Richard Murphy, extended by *The Site Reliability Workbook* (2018). Common industry practice that is not a documented position from those volumes is labelled as convention.
- **Incident.** `incident-lead` is founded on a discipline with no single author. Its convergent sources are named in the task so any recommendation can be checked: the Incident Command System (command separated from execution), the SRE book's incident and postmortem chapters, safety science and resilience engineering (multiple contributing factors rather than a single root cause — the form most engineers meet it in is Richard I. Cook's *How Complex Systems Fail*), and the just-culture literature, notably Sidney Dekker. Only the practices those sources converge on are applied as method.

---

## Tasks

| Task | Agent | Materializes | Produces |
|---|---|---|---|
| `ops-diagnose-and-route.md` | `ops-chief` | `*diagnose` + `*authority-check` | Authority note, confirmed restatement, exactly one owner with the near misses excluded, handoff brief, versioned routing decision |
| `reliability-slo-design.md` | `reliability-lead` | `*slo-design` + `*sli-select` | SLI table, SLO table with windows and justifications, error budget, unreachable findings for `@architect`, instrumentation requests for `@dev`, UNVERIFIED register |
| `flow-find-constraint.md` | `flow-lead` | `*find-constraint` + `*queue-map` + `*policy-constraint` | One named constraint with evidence, its type, excluded rivals, quantified exploit options, subordination rules, next-constraint prediction, throughput verdict |
| `lean-waste-walk.md` | `lean-lead` | `*waste-walk` + `*value-time` + `*overproduction-check` | Waste register by category, value-time ratio, largest non-value block and its owner, divergence findings, countermeasures with dated confirming checks |
| `incident-declare.md` | `incident-lead` | `*declare` + `*severity` + `*command-structure` | Incident record, severity with its reason, command structure with `@devops` holding mechanical authority, contemporaneous timeline, comms cadence, next checkpoint |

Each task states its own boundary table before its procedure, and each acceptance criteria list contains an explicit check that nothing was configured, gated, released or pushed by the task.

---

## Workflows

Workflows are how the task-first architecture becomes executable: they connect real tasks in dependency order, with a gate and a veto at each phase.

### `wf-chronic-improvement.yaml` — steady state

**Trigger:** `*intake` | **Entry:** `ops-chief` | **Duration:** 3-10 working days elapsed

```
phase_0  ops-chief         ops-diagnose-and-route.md   → ops_routing_decision
phase_1  flow-lead         flow-find-constraint.md     → constraint_finding
phase_2  reliability-lead  reliability-slo-design.md   → slo_document
phase_3  lean-lead         lean-waste-walk.md          → waste_register
phase_4  ops-chief         (handoff, no execution)     → devops_instruction_packet  [executor: @devops]
```

The order is dependency, not seniority. The constraint is located before any target is set, because an improvement at a non-constraint changes delivered output by nothing; the target is set before any countermeasure is designed, because a target set before the load is measured commits to something nothing has changed to support; and no stop rule is written before the constraint is located, because it would protect the wrong step. Phase 0 vetoes the whole workflow if something is actively failing — that is the other workflow's job.

### `wf-incident-response.yaml` — active failure

**Trigger:** `*declare` | **Entry:** `incident-lead` (deliberately **not** `@ops-chief`) | **Duration:** ~90 seconds to declare; corrective actions closed over 1-2 weeks

```
phase_0  incident-lead     incident-declare.md         → incident_record
phase_1  incident-lead     (*stand-down → *postmortem) → contributing_factors
phase_2  reliability-lead  reliability-slo-design.md   → slo_and_budget_update
phase_3  lean-lead         lean-waste-walk.md          → countermeasure_register
phase_4  flow-lead         flow-find-constraint.md     → constraint_finding   [conditional: recurring incident load]
phase_5  ops-chief         (handoff, no execution)     → devops_corrective_action_packet  [executor: @devops]
```

Entry is the incident agent directly, because triage ceremony during an outage is itself a failure mode — the squad's own routing task short-circuits to this workflow when something is failing right now. Phase 1 has no task file: stand-down and blameless analysis run through the agent's own commands against the record from phase 0, and nothing in this squad may perform the mitigation it is analysing. Phase 4 is skipped when the incident was isolated — a constraint analysis run on a single event manufactures a chronic condition that does not exist.

---

## How to activate

`@ops-chief` is the front door. Use it whenever the owning discipline is not obvious, when a request mixes disciplines, when two specialists have produced contradictory policy, or when an initiative needs a sequence of specialists rather than one.

```
@ops-chief                      # Fulcrum — triage, authority check, routing
```

Direct specialist access, when the discipline is already known:

```
@ops:reliability-lead           # Keel   — *slo-design, *error-budget, *toil-audit, *burn-review
@ops:flow-lead                  # Throat — *find-constraint, *queue-map, *exploit, *subordinate
@ops:lean-lead                  # Kaizen — *waste-walk, *five-whys, *countermeasure, *andon-policy
@ops:incident-lead              # Klaxon — *declare, *severity, *timeline, *postmortem
```

**One exception to the front door: an active failure goes straight to `@ops:incident-lead *declare`.** No triage first.

Every agent responds to `*help` for its command list and `*guide` for full usage. `@ops-chief` `*squad-map` prints the routing matrix.

---

## Directory structure

```text
squads/ops/
├── squad.yaml                       # Manifest — tiers, agents, handoffs, cross-cutting boundaries
├── README.md                        # This file
├── CHANGELOG.md
├── agents/
│   ├── ops-chief.md                 # Tier 0 — Fulcrum 🔩
│   ├── reliability-lead.md          # Tier 1 — Keel 🛰️
│   ├── flow-lead.md                 # Tier 1 — Throat 🕳️
│   ├── lean-lead.md                 # Tier 2 — Kaizen 🧹
│   └── incident-lead.md             # Tier 2 — Klaxon 🚨
├── tasks/                           # 5 executable tasks (TASK-FORMAT-SPECIFICATION-V1)
├── workflows/
│   ├── wf-chronic-improvement.yaml  # Steady-state improvement chain
│   └── wf-incident-response.yaml    # Active failure chain
├── templates/                       # The artifacts each agent produces
│   ├── slo-specification-tmpl.md    # Keel — journeys, indicators, targets, budget, provenance
│   ├── error-budget-policy-tmpl.md  # Keel — thresholds, deciders, exit conditions, executors
│   ├── constraint-analysis-tmpl.md  # Throat — queue evidence, exploit before elevate
│   ├── subordination-rules-tmpl.md  # Throat — per-stage rules, buffer, metrics abandoned
│   ├── value-stream-walk-tmpl.md    # Kaizen — observed process, waste by category
│   ├── standard-work-tmpl.md        # Kaizen — current best known way, failure points
│   ├── andon-policy-tmpl.md         # Kaizen — stop rule; the halt itself is @devops
│   ├── incident-record-tmpl.md      # Klaxon — declaration, command, contemporaneous timeline
│   ├── blameless-postmortem-tmpl.md # Klaxon — contributing factors, no root-cause field
│   ├── ops-triage-record-tmpl.md    # Fulcrum — authority first, one owner, handoff brief
│   └── ops-coherence-audit-tmpl.md  # Fulcrum — the seven-link chain, contradiction tests
├── checklists/                      # The quality bar each agent applies
│   ├── slo-quality-checklist.md     # Keel — user or machine? denominator? executor named?
│   ├── constraint-evidence-checklist.md   # Throat — queue evidence, never starves, exploit first
│   ├── countermeasure-quality-checklist.md # Kaizen — condition not person, no added step
│   ├── postmortem-quality-checklist.md    # Klaxon — hindsight as a text search, multiple factors
│   └── authority-boundary-checklist.md    # Squad-wide — Section 1 is binary and blocks
└── data/                            # Reference knowledge behind the judgements
    ├── sli-types.yaml               # Indicator catalogue and how each one lies
    ├── toil-taxonomy.yaml           # Six-part test and what each failure of it means
    ├── constraint-signatures.yaml   # Signatures, types, levers, inertia audit
    ├── waste-catalog.yaml           # Seven wastes with observable signals; five-why discipline
    ├── severity-levels.yaml         # Severity criteria, declare-or-not, classification traps
    ├── incident-command-roles.yaml  # Role boundaries, handoff protocol, stand-down record
    └── ops-routing-matrix.yaml      # Authority determination and the @devops boundary
```

**The agent is a router; the expertise lives outside it.** Each agent file declares these files in its `dependencies` block and loads them on command execution. Core-framework artifacts under `.aexos-core/development/` — the document template, the elicitation task, the self-critique checklist — are still referenced and are not duplicated here.

**Every one of these files restates the `@devops` boundary,** because it is the squad's number one risk. This squad decides and documents; `@devops` operates. Every template whose output implies an action on a running system carries an Executor column naming `@devops`, and `checklists/authority-boundary-checklist.md` blocks circulation of any artifact that does not.

---

## Validation

```bash
node scripts/normalize-squad-manifests.js
node -e "const {SquadValidator}=require('./.aexos-core/development/scripts/squad/squad-validator.js');new SquadValidator().validate('squads/ops').then(r=>console.log(r.valid, r.errors.length, r.warnings.length))"
```

`components:` in `squad.yaml` is derived from disk by the normalizer — never edit it by hand. Adding a task, agent or workflow file means re-running the normalizer.

---

*Operations Squad v1.0.0 — AEXOS (Cyryx)*
*"Optimize the whole, not the part." The bottleneck sets the system's capacity; improving anywhere else is waste.*
