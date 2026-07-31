# Changelog — ops

All notable changes to the Operations Squad.

## [1.1.0] - 2026-07-30

### Added — expertise externalized out of the agent files

The agents carried their method in prose and declared only generic core tasks (`create-doc.md`,
`advanced-elicitation.md`), which serve any agent and carry no domain expertise. The AEXOS model is
that the agent is a router and the expertise lives outside it. It now does.

- **11 templates** in `templates/` — the artifact each agent produces:
  - Keel: `slo-specification-tmpl.md`, `error-budget-policy-tmpl.md`
  - Throat: `constraint-analysis-tmpl.md`, `subordination-rules-tmpl.md`
  - Kaizen: `value-stream-walk-tmpl.md`, `standard-work-tmpl.md`, `andon-policy-tmpl.md`
  - Klaxon: `incident-record-tmpl.md`, `blameless-postmortem-tmpl.md`
  - Fulcrum: `ops-triage-record-tmpl.md`, `ops-coherence-audit-tmpl.md`
- **5 checklists** in `checklists/` — the quality bar each agent applies:
  `slo-quality-checklist.md`, `constraint-evidence-checklist.md`,
  `countermeasure-quality-checklist.md`, `postmortem-quality-checklist.md`, and the squad-wide
  `authority-boundary-checklist.md`
- **7 data files** in `data/` — the reference knowledge behind the judgements:
  `sli-types.yaml`, `toil-taxonomy.yaml`, `constraint-signatures.yaml`, `waste-catalog.yaml`,
  `severity-levels.yaml`, `incident-command-roles.yaml`, `ops-routing-matrix.yaml`

### Changed

- Every agent's `dependencies` block now declares its squad-local templates, checklists, data and
  the squad's own task files, alongside the core-framework artifacts it already used. The
  "dependencies are optional accelerants" comment was replaced: the expertise is no longer in the
  agent file, so the dependencies are not optional.
- `README.md` structure section replaced — `templates/`, `checklists/` and `data/` are no longer
  empty, and the note claiming they were intentionally empty is withdrawn.

### Boundary

- Every new file restates the `@devops` boundary. Every template whose output implies an action on
  a running system carries an Executor column naming `@devops`, and each of the affected templates
  (`error-budget-policy-tmpl.md`, `andon-policy-tmpl.md`, `incident-record-tmpl.md`) contains a
  mandatory pre-publication authority audit.
- `authority-boundary-checklist.md` applies to **every** artifact from **any** of the five agents.
  Its Section 1 is binary: any unchecked item blocks circulation, and no score compensates. It
  still blocks during an incident — urgency is the argument the line exists for.

### Attribution

- Chapter-level citations are used only where certain: SRE book Ch. 3 "Embracing Risk", Ch. 4
  "Service Level Objectives", Ch. 5 "Eliminating Toil", Ch. 6 "Monitoring Distributed Systems",
  Ch. 14 "Managing Incidents", Ch. 15 "Postmortem Culture". Positions from the same volumes without
  a chapter I could vouch for are cited to the book alone.
- Later flow convention (work-in-progress limits, cumulative flow diagrams, buffer banding, Little's
  Law framing, payback ranking) is marked `convention: true` in the data files and is **not**
  attributed to Goldratt.
- The broader lean tradition (value stream mapping notation, muda/mura/muri as commonly taught, the
  countermeasure preference order, the position that improvement requires a written standard) is
  marked `tradition: true` and is **not** attributed to Ohno. Ohno's book is cited as Japanese 1978
  / English translation 1988 throughout.
- Severity scales are stated as **convention** with no canonical source, and incident analysis is
  stated as a discipline with **no single author** in every file that touches it.

## [1.0.0] - 2026-07-30

### Added

- 5 agents across three tiers: `ops-chief` (Fulcrum 🔩, Tier 0), `reliability-lead` (Keel 🛰️, Tier 1), `flow-lead` (Throat 🕳️, Tier 1), `lean-lead` (Kaizen 🧹, Tier 2), `incident-lead` (Klaxon 🚨, Tier 2)
- 5 executable tasks in TASK-FORMAT-SPECIFICATION-V1: `ops-diagnose-and-route.md`, `reliability-slo-design.md`, `flow-find-constraint.md`, `lean-waste-walk.md`, `incident-declare.md`
- 2 workflows chaining those tasks in dependency order:
  - `wf-chronic-improvement.yaml` — route → constraint → objective and error budget → waste and countermeasures → written handoff to `@devops`
  - `wf-incident-response.yaml` — declare and command → stand-down and blameless analysis → reliability consequences → process countermeasures → (conditional) flow impact → written handoff to `@devops`
- `README.md` with the agent table, task and workflow inventory, activation guide and the `@devops` boundary stated first
- `squad.yaml` manifest with tiers, handoff matrix, core-agent and cross-squad boundaries, and per-agent `based_on` attribution

### Architecture

- Entry agent: `ops-chief`, which answers the authority question before the routing question and names exactly one owning specialist per request
- One exception to the front door: an active failure routes straight to `@ops:incident-lead` `*declare` — triage ceremony during an outage is itself a failure mode, and `wf-incident-response` therefore enters at `incident-lead`
- Workflow execution contract is `workflow.sequence` (canonical per `.aexos-core/development/scripts/workflow-validator.js`); every step names an agent, an action, and where applicable a real task file under `squads/ops/tasks/`
- Sequencing doctrine encoded in the workflows: constraint before target, target before countermeasure, no stop rule before the constraint is located, recurrence before a raised objective

### Boundary

- The squad defines policy and method; `@devops` operates — deploy, rollback, failover, restart, scale, CI/CD, pipelines, gates, freezes, releases, monitoring and alert configuration, status-page publication, MCP and `git push` are `@devops` exclusive authority, including during an active incident
- Both workflows terminate in a handoff phase that writes the instruction and names `@devops` as executor; a phase that executed anything voids the run
- Every phase carries its own `boundary:` field, so the constraint is restated where it is most likely to be crossed rather than only at the top of the document
- A stop-the-line policy is a document; the halt itself is `@devops`. Incident coordination is not execution. Urgency is not an exception
- Also deferred: implementation → `@dev`; gates and verification scope → `@qa`; backlog order → `@po` (evidence only, never a decree); story creation → `@sm`; redundancy and failure domains → `@architect`; epics and PRDs → `@pm`

### Attribution

- `reliability-lead` applies *Site Reliability Engineering* (O'Reilly, 2016), edited by Beyer, Jones, Petoff and Murphy, extended by *The Site Reliability Workbook* (2018)
- `flow-lead` applies the Theory of Constraints as published by Eliyahu M. Goldratt in *The Goal* (1984, with Jeff Cox); later flow conventions — work-in-progress limits, cumulative flow diagrams, queueing arguments from other schools — are labelled as convention and **not** attributed to Goldratt
- `lean-lead` applies Taiichi Ohno's *Toyota Production System*, **published in Japanese in 1978 and in English translation in 1988**; the broader lean tradition (value stream mapping notation, the muda/mura/muri triad as commonly taught, later lean-software adaptations) is labelled as tradition and **not** attributed to Ohno
- `incident-lead` is founded on a discipline with no single author — Incident Command System, the SRE book's incident and postmortem chapters, safety science and resilience engineering (Cook), and the just-culture literature (Dekker). Only convergent practices are applied as method
- `ops-chief` claims no external source; it is an original orchestrator role

### Notes

- `checklists/`, `templates/` and `data/` shipped empty in this version; the expertise stayed in prose inside the agent files. Superseded in 1.1.0 — see above
- `components:` in `squad.yaml` is derived from disk by `scripts/normalize-squad-manifests.js` and must not be hand-edited
