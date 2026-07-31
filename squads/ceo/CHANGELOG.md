# Changelog — ceo

All notable changes to the CEO squad.

## [1.0.0] - 2026-07-30

### Added
- 5 agents: ceo-chief (Regent, Tier 0), strategy-lead (Kernel, Tier 1), capital-allocator (Ledger, Tier 1), org-designer (Lattice, Tier 1), stakeholder-lead (Herald, Tier 2)
- 5 executable tasks, one per agent command: executive-request-triage, strategy-kernel, capital-allocation-review, org-design-plan, stakeholder-account-report
- 2 multi-phase workflows using the canonical `workflow.sequence` contract:
  - `wf-executive-decision-cycle` — triage → strategy kernel → capital allocation and organisation design (parallel) → decision record and delivery handoff
  - `wf-accountability-cycle` — scope the period → account against the promises → repair the diagnosis → repair the organisation and re-allocate capital (parallel, conditional) → close the period and hand off
- README.md documenting the agents, tasks, workflows, activation syntax and the boundary with the core
- CHANGELOG.md (this file)
- Manifest `components.workflows` reindexed from disk by `scripts/normalize-squad-manifests.js`

### Architecture
- Entry agent: ceo-chief, with routing to exactly one owning specialist per request
- Tier architecture: Tier 0 (Diagnosis & Routing), Tier 1 (Core Practice), Tier 2 (Applied & Adjacent)
- Handoff matrix with full routing and escalation between all five agents
- Every workflow `task:` reference resolves to a file in `tasks/`; every `agent:` reference resolves to an id in `squad.yaml`
- Both workflows terminate at a handoff to the core (@pm, @po, @sm). Implementation (@dev), quality gates (@qa) and release or push (@devops, exclusive) stay outside the squad
- The stakeholder account is held DRAFT for a named human reviewer and is never published by the squad

### Attribution
- Attribution recorded per agent in `squad.yaml` (`based_on`): Richard Rumelt (Good Strategy Bad Strategy, 2011); William Thorndike (The Outsiders, 2012); Andrew Grove (High Output Management, 1983)
- ceo-chief is an original orchestrator role and claims no external work
- stakeholder-lead is anchored to the documented discipline of shareholder and board communication, with no single canonical work claimed
