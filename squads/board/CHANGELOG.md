# Changelog — board

All notable changes to the Board Squad.

## [1.0.0] - 2026-07-30

### Added

- 5 oversight agents: `board-chief` (Chair ⚖️, Tier 0), `governance-counsel` (Charter 📜, Tier 1),
  `risk-oversight` (Bulwark 🛡️, Tier 1), `audit-lead` (Tally 🧾, Tier 2), `succession-lead`
  (Lineage 🌳, Tier 2)
- 5 executable tasks conforming to TASK-FORMAT-SPECIFICATION-V1, one per agent:
  `board-matter-triage.md`, `governance-audit.md`, `risk-appetite-statement.md`,
  `figure-challenge.md`, `succession-audit.md`
- 2 multi-phase workflows chaining the real tasks:
  - `wf-oversight-cycle.yaml` — triage → mandate → appetite → evidence → accountability
    (5 phases: `board-chief`, `governance-counsel`, `risk-oversight`, `audit-lead`, `board-chief`)
  - `wf-succession-review.yaml` — triage → appointment authority → continuity → key-person
    exposure → assurance → disposition (6 phases, assurance phase conditional)
- Tier architecture: Tier 0 (Diagnosis & Routing), Tier 1 (Core Practice), Tier 2 (Applied &
  Adjacent)
- Handoff matrix: `board-chief` routes to all four specialists; every specialist collaborates
  laterally and escalates back to `board-chief`
- `README.md` documenting agents, tasks, workflows, invocation, routing map and the core boundary

### Architecture

- Entry agent: `board-chief` — the single front door. A matter is classified before its content is
  engaged, and routed to exactly one specialist; broadcast routing is refused.
- Task-first: workflows supply order and gates, tasks supply the work. Every `task:` reference in a
  workflow phase resolves to a real file in `squads/board/tasks/`, and every `agent:` reference to a
  real agent id.
- Workflows use the canonical `workflow.sequence` execution contract with `type`, per-step `agent`,
  `task`, `creates`/`requires` artifact chaining, `depends_on`, `checkpoint.gate`,
  `checkpoint.veto`, `handoff_prompts` and a `flow_diagram`.
- Artifacts are written to versioned files under `squads/board/data/` — a decision that lives only
  in a transcript was never taken.

### Professional limits

- Declared in every agent, task, workflow and in the README: this squad produces **no legal, tax,
  employment, compensation-regulation or regulatory advice, and no statutory audit opinion**.
- Every output is **input for review by qualified humans** — directors, licensed counsel, the
  appointed external auditor — and never the final instrument. A human-review clause is required in
  every phase artifact.
- Legal, tax, listing-rule, filing and employment questions are referred out unmodified; the tasks
  continue only on the governance residue rather than approximating.
- No workflow phase may issue an audit opinion. Assurance phases produce a question set for the
  appointed auditor, never a conclusion about the auditor's opinion.
- Succession assessment is readiness against agreed criteria on stated evidence — never a judgement
  of a person. Ratings with no observed evidence are marked `UNVERIFIED`.
- Figures with no stated basis are marked `UNVERIFIED` and excluded (Constitution Article IV, No
  Invention).

### Attribution

- `governance-counsel` — the Cadbury Report (United Kingdom, December 1992) and its Code of Best
  Practice; anything beyond the Code is marked `DERIVED` or `CONSTRUCTION`, and the adaptation from
  the Code's original scope (UK listed company boards) is declared rather than assumed.
- `risk-oversight` — COSO, *Enterprise Risk Management — Integrating with Strategy and Performance*
  (2017), updating the *Integrated Framework* (2004). Recorded as a management and oversight
  framework, not a quantitative model; COSO's internal control framework is kept distinct. The
  forbidden-decision test is the agent's own `CONSTRUCTION`.
- `audit-lead` — a discipline with no single canonical work: provisions cited individually to the
  Cadbury Report (1992), COSO's *Internal Control — Integrated Framework* (1992, updated 2013), the
  Sarbanes-Oxley Act of 2002, or the three-lines model associated with the Institute of Internal
  Auditors. Sources are never merged.
- `succession-lead` — Charan, Carey & Useem, *Boards That Lead* (Harvard Business Review Press,
  2013), with the qualification that it is not a step-by-step succession manual; pipeline reasoning
  attributed separately to Charan, Drotter & Noel, *The Leadership Pipeline* (2001).
- No citation, title, publisher or year may be invented. An unsourceable provision is reported as
  unsourced rather than attributed.

### Boundary with the AEXOS core

- The squad decides and evidences within its domain. It does not implement, test or publish.
- Defers to `@pm` (epics, PRD), `@po` (backlog, story validation), `@sm` (story creation), `@dev`
  (implementation), `@qa` (quality gates), `@devops` (release, git push, PRs, MCP, CI/CD —
  exclusive authority).
- No task, workflow phase or board disposition overrides Agent Authority.

### Notes

- `checklists/`, `templates/` and `data/` ship empty by design. Every command is fully specified in
  its agent file and its task; squad-local checklists and templates are accelerators, never
  prerequisites. `data/` fills at runtime with the versioned records each task writes.
- `components:` in `squad.yaml` is derived from disk by `scripts/normalize-squad-manifests.js` and
  is not maintained by hand.
