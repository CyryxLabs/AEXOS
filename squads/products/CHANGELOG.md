# Changelog — products

All notable changes to the Products squad.

## [1.0.0] - 2026-07-30

### Added

- 7 specialist agents: products-chief (Helm), product-strategist (Lodestar), discovery-lead
  (Sonar), positioning-lead (Datum), jobs-analyst (Plumb), pricing-strategist (Assay),
  experimentation-lead (Vernier)
- 7 executable tasks, one per discipline, conforming to TASK-FORMAT-SPECIFICATION-V1:
  `triage-product-request`, `draft-product-strategy`, `build-opportunity-tree`,
  `write-job-statement`, `run-positioning-process`, `run-wtp-talk`,
  `design-controlled-experiment`
- 2 multi-phase workflows chaining those tasks:
  - `wf-discovery-to-decision` — triage → strategy → opportunity tree → job statement →
    consolidated decision brief handed to `@pm`, `@po` and `@sm`
  - `wf-monetisation-and-proof` — triage → positioning → willingness to pay → pre-registered
    experiment → commercial decision brief handed to `@pm` and `@po`
- Tier architecture: Tier 0 (Diagnosis & Routing), Tier 1 (Direction & Discovery),
  Tier 2 (Evidence & Commercial)
- Handoff matrix with full routing between all agents and escalation to products-chief
- README with the agent table, task table, workflow sequences, activation syntax and the
  squad/core boundary

### Architecture

- Entry agent: `products-chief` (Helm), the single front door for any product request
- Coherence chain enforced across artifacts:
  `segment → job → outcome → solution → narrative → price → measure`
- Both workflows use `workflow.sequence`, the canonical execution contract validated by
  `.aexos-core/development/scripts/workflow-validator.js`; each step declares the artifact it
  requires from the step before it
- Terminal phase of every workflow consolidates and stops at the squad boundary — nothing is
  implemented, tested, released, drafted as a story or framed as an epic inside this squad

### Attribution

- Every agent declares a `based_on` field naming the published work that grounds its method:
  Marty Cagan (*INSPIRED*, 2nd ed. 2018) and Marty Cagan with Chris Jones (*EMPOWERED*, 2020);
  Teresa Torres (*Continuous Discovery Habits*, 2021); April Dunford (*Obviously Awesome*, 2019
  and *Sales Pitch*, 2023); Clayton M. Christensen with Taddy Hall, Karen Dillon and
  David S. Duncan (*Competing Against Luck*, 2016); Madhavan Ramanujam and Georg Tacke
  (*Monetizing Innovation*, 2016); Ron Kohavi, Diane Tang and Ya Xu (*Trustworthy Online
  Controlled Experiments*, 2020)
- `products-chief` carries no external methodology and is declared as an original orchestrator

### Known gaps

- `checklists/`, `templates/` and `data/` are present but empty. Several agent definitions
  reference squad-local files in those directories marked `# TO BE CREATED`; those paths are not
  live and are referenced by no task or workflow.
