# Changelog — business-admin

All notable changes to the Business Administration Squad.

## [1.0.0] - 2026-07-30

### Added

- 5 agents: `admin-chief` (Steward, tier 0), `finance-lead` (Abacus, tier 1), `people-lead` (Roster,
  tier 1), `legal-ops` (Codex, tier 2), `process-lead` (Sluice, tier 2)
- 5 executable tasks: `triage-administrative-request.md`, `build-profit-to-cash-bridge.md`,
  `define-hiring-standard.md`, `extract-obligation-register.md`, `map-process-end-to-end.md`
- 2 multi-phase workflows chaining the real tasks:
  - `wf-cash-gap-review` — triage, profit-to-cash bridge, then obligation register and order-to-cash
    process map in parallel, closing on consolidated licensed-review routing
  - `wf-hiring-standard-design` — triage, cash envelope, hiring loop map, hiring standard, employment
    instrument register, closing on consolidated licensed-review routing
- README with the squad's scope, agent table, task and workflow indexes, activation path and boundary
- Squad manifest `squad.yaml` conforming to `.aexos-core/schemas/squad-schema.json`, with
  `components` derived from disk by `scripts/normalize-squad-manifests.js`

### Architecture

- Entry agent: `admin-chief`, which runs the regulated-referral gate before any content is produced
  and names exactly one owning specialist per request
- Task-first: workflows use the canonical `workflow.sequence` execution array; every step names a real
  squad agent and points at a task file that exists in `tasks/`
- Tier architecture: tier 0 diagnosis and routing, tier 1 core practice (finance, people), tier 2
  applied and adjacent (legal operations, process)
- Handoff matrix routes every specialist back to `admin-chief` for escalation and cross-discipline
  contradiction

### Professional limit

- The squad's number-one risk, enforced structurally rather than advisorily: finance, people and legal
  are regulated areas, and no task or workflow produces an accounting, tax, statutory, assurance,
  employment or legal opinion, substitutes for a licensed professional, or generates anything for a
  regulator, authority or court
- Every workflow phase carries a `checkpoint` with a `gate` and a `veto`; the veto blocks the phase
  while a regulated item is unrouted, and both workflows close on a consolidated licensed-review list
- `legal-ops` interprets no clause and nothing produced anywhere in the squad is privileged;
  `people-lead` handles no individual case and no personal data; `process-lead` removes, weakens or
  retimes no control and decides no retention or personal-data question
- `wf-hiring-standard-design` marks the hiring standard NOT FOR USE until qualified HR and employment
  counsel return their review
- Unclear classification counts as regulated; routing a regulated question to a squad specialist is
  prohibited

### Attribution

- `finance-lead` — Karen Berman & Joe Knight, *Financial Intelligence* (Harvard Business School Press,
  2006, written with John Case). A management-literacy framework: it qualifies nobody to prepare,
  certify or opine on financial information
- `people-lead` — Laszlo Bock, *Work Rules!* (2015). Practices from one very large, unusually
  selective organisation; transfer caveats are stated per design, and published selection-method
  findings are reproduced as direction only, with no validity coefficient reproduced from memory
- `legal-ops` — the legal operations discipline, organised by the CLOC core competency model. A
  professional association's community framework rather than an authored work; it has been revised
  since first publication, and this squad is not CLOC, does not speak for it and is not certified by it
- `process-lead` — Michael Hammer & James Champy, *Reengineering the Corporation* (1993), and Hammer's
  "Reengineering Work: Don't Automate, Obliterate" (*HBR*, July–August 1990). The method carries its
  own failure record and its 1990s use as cover for headcount reduction; radical redesign therefore
  defaults to incremental and requires explicit justification

### Boundary

- The squad decides and evidences; it does not implement, test or publish
- No workflow produces an epic, PRD, story, implementation plan, test or release action — `@pm` frames
  epics, `@po` validates stories, `@sm` drafts them exclusively, `@dev` implements, `@qa` gates, and
  `@devops` holds exclusive authority over push, PRs, MCP and CI/CD
