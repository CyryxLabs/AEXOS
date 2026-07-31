# Changelog — sales

All notable changes to the Sales Squad.

## [1.0.0] - 2026-07-30

### Added

- 5 specialist agents across three tiers: `sales-chief` (Vanguard 🎺, Tier 0), `qualification-lead` (Sieve 🧲, Tier 1), `method-lead` (Forge 🔥, Tier 1), `negotiation-lead` (Tether 🪢, Tier 2), `pipeline-ops` (Conveyor ⛓️, Tier 2)
- 5 executable tasks conforming to TASK-FORMAT-SPECIFICATION-V1: `sales-chief-diagnose.md`, `qualification-lead-qualify.md`, `method-lead-build-insight.md`, `negotiation-lead-prep.md`, `pipeline-ops-stage-design.md`
- 2 multi-phase workflows chaining the real tasks:
  - `wf-deal-cycle.yaml` — triage → qualify → insight → negotiation plan, entry `sales-chief`, trigger `*intake`
  - `wf-pipeline-repair.yaml` — triage → evidence standard → stage model → conversation repair, entry `sales-chief`, trigger `*funnel-analysis`
- `README.md` — squad scope, agent table with attribution, task and workflow reference, engagement path, integrity rules and boundary
- Tier architecture: Tier 0 (Diagnosis and Routing), Tier 1 (Core Practice), Tier 2 (Applied and Adjacent)
- Handoff matrix with full routing between all five agents, plus escalation to `sales-chief`
- Cross-squad boundary declared in the manifest — read by the routing layer, not only stated in agent prose

### Architecture

- Entry agent: `sales-chief`, which routes to exactly one owner and names the two nearest misses with the line that excluded each
- Coherence chain governing workflow order: fit → pain → insight → economic buyer → decision process → commercial terms → forecast stage
- Workflows use the canonical `workflow.sequence` execution array; every step declares an `agent`, an action and the artifact it creates, and every `requires` resolves to an artifact created upstream
- Artifacts are persisted under `squads/sales/` with a date; nothing decided lives only in a transcript

### Commercial Integrity

- Blocking integrity screens embedded in every task and in every workflow checkpoint: fabricated urgency, invented scarcity, bluffed alternative, material omission, roadmap presented as shipped, empathy inversion, durability failure
- A blocked move is removed and replaced with the compliant alternative that names our real constraint and asks for theirs — it is never softened, reworded or appended as a caveat
- Buyer silence about a decision process is recorded as qualification data, never converted into a deadline
- `pipeline-ops` mechanics screened for proportionality: no incentive that pays off when urgency is manufactured, no rep-level data without a coaching justification and disclosure to the rep it describes

### Attribution

- `qualification-lead` — MEDDIC, a qualification discipline originated at Parametric Technology Corporation and commonly credited to Dick Dunkel and Jack Napoli. Carried explicitly: it has **no canonical work by its originators**, so it is treated as a named discipline with a documented origin rather than a text to quote. MEDDICC and MEDDPICC are flagged as explicit extensions
- `method-lead` — Matthew Dixon and Brent Adamson, *The Challenger Sale* (2011); buying-group and Mobilizer material cited separately to *The Challenger Customer* (2015)
- `negotiation-lead` — Chris Voss, *Never Split the Difference* (2016), written with Tahl Raz. Carried explicitly: the 7-38-55 communication ratio the book cites is contested in the broader literature, and **no recommendation in this squad is built on it**
- `pipeline-ops` — Mark Roberge, *The Sales Acceleration Formula* (2015), including the boundary the methodology insists on: formulas are built from the organization's own data, and any published list is a hypothesis to validate locally

### Boundary

- Price level, packaging, value metric and discount policy belong to `@products:pricing-strategist`; market category, competitive alternatives and frame of reference belong to `@products:positioning-lead`. This squad routes findings outward as patterns and sets neither
- No workflow implements, tests or publishes. Instrumentation is specified and handed to `@dev` and `@data-engineer`; git push, PRs and CI/CD remain `@devops` exclusive

### Notes

- `checklists/`, `templates/` and `data/` exist and are intentionally empty. No content was invented to fill them
- `squad.yaml` `components:` is derived from disk by `scripts/normalize-squad-manifests.js` and is not maintained by hand
