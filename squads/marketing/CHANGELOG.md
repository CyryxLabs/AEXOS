# Changelog — marketing

All notable changes to the Marketing Squad.

## [1.0.0] - 2026-07-30

### Added

- **5 agents** across three tiers: `marketing-chief` (Beacon, Tier 0 — triage, routing, balance, coherence, arbitration), `brand-lead` (Salience, Tier 1), `demand-lead` (Cadence, Tier 1), `content-lead` (Quill, Tier 2), `analytics-lead` (Cipher, Tier 2).
- **5 executable tasks**, one materialising each agent's primary command, conforming to TASK-FORMAT-SPECIFICATION-V1: `marketing-chief-diagnose.md`, `brand-lead-brand-audit.md`, `demand-lead-split-decision.md`, `content-lead-beat-plan.md`, `analytics-lead-measurement-model.md`.
- **2 multi-phase workflows** chaining the tasks into executable sequences:
  - `wf-marketing-plan.yaml` — build. Five phases along the full coherence chain: triage → brand diagnosis → split decision → editorial beats → measurement model. Trigger `*intake`. The split and the beat plan run in parallel; both depend only on the brand specification.
  - `wf-demand-diagnostic.yaml` — diagnose. Four phases for the efficiency-trap signature: triage → binding constraint → split and short-termism review → provability verdict. Trigger `*balance-check`. Content is deliberately out of scope.
- **README.md** — squad purpose, agent table, task table, workflow phase tables, activation syntax, boundaries and constitutional notes.
- Handoff matrix routing every specialist back through `marketing-chief`, recorded in `squad.yaml` rather than only in agent text, because the manifest is what the routing layer reads.

### Architecture

- **Entry agent:** `marketing-chief` (Beacon). Triage before answering; route to exactly one owner; sequence by dependency when several specialists are genuinely needed.
- **Coherence chain:** position → brand model → demand plan → content → measurement. A break anywhere invalidates everything downstream of it, not just the adjacent link; repairs run upstream first.
- **Workflow contract:** execution entries live under `workflow.sequence` (canonical), each carrying `agent`, `task`, `creates`/`requires`, `depends_on`, `parallel`, `outputs` and `checkpoint{gate, veto}`, plus `handoff_prompts` per agent transition. `workflow.phases` is compatibility-only and is not used here.
- **Squad-level vigilance:** marketing drifts short by default, because the mechanisms with fast attributable feedback win every argument run on a short clock. Naming that drift is a chief-level job (`*balance-check`), not a specialist one.

### Attribution

- `brand-lead` — Byron Sharp, *How Brands Grow* (Oxford University Press, 2010), reporting Ehrenberg-Bass Institute research; later institute work named separately (*How Brands Grow Part 2*, Romaniuk & Sharp 2016; *Building Distinctive Brand Assets*, Romaniuk 2018).
- `demand-lead` — Les Binet & Peter Field, *The Long and the Short of It* (IPA, 2013); later work (*Media in Focus*, IPA 2017; LinkedIn B2B Institute, 2019) named separately. **States no ratio, split percentage or excess-share-of-voice coefficient from memory** — those figures are category averages across a case databank with wide dispersion, and any figure carried into an output is marked UNVERIFIED until checked against its publication.
- `content-lead` — editorial craft discipline, declared honestly as a practice rather than a single published work. No founding author, title, year or quotation is manufactured for this role.
- `analytics-lead` — Avinash Kaushik, *Web Analytics 2.0* (Sybex/Wiley, 2009). The Digital Marketing and Measurement Model and See-Think-Do-Care are attributed as later Occam's Razor blog work, not to the book; geo holdouts, randomised holdout groups and marketing mix modelling are attributed to the broader measurement literature rather than to Kaushik.
- `marketing-chief` — original orchestrator role; no external methodology is claimed for it.
- An unverifiable citation anywhere in the squad blocks the artifact. Attribution defects are treated as critical, not stylistic.

### Boundaries

- Consumed, never authored: positioning, competitive alternatives, category and segment (`@products:positioning-lead`); price and packaging (`@products:pricing-strategist`); product-surface experiment statistics (`@products:experimentation-lead`).
- Released at the end: `@pm` (epic framing, PRD), `@sm` (story creation — exclusive), `@po` (validation, backlog), `@dev` (implementation), `@qa` (quality gates), `@devops` (release and push — exclusive), `@data-engineer` (schema and pipelines), `@ux-design-expert` (interface copy).
- No workflow in this squad implements, tests or publishes anything.
