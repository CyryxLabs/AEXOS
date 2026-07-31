# Products Squad

> The full product cycle: strategy and empowered teams, continuous discovery, jobs to be done, positioning, monetisation and trustworthy experimentation. From deciding what to build to proving that it worked.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `@products:products-chief` (Helm)

## What this squad is for

Product work fails less often from a weak method than from the right question answered by the
wrong discipline. A price question that is really a positioning question. A roadmap question that
is really an unmade focus decision. A churn question that is really a switching event in reverse.

This squad exists to name the discipline that owns the question, apply a published method to it,
and leave behind an artifact that can be checked against its source.

Its philosophy, stated in `squad.yaml`, is **"evidence before conviction."** Every agent is
anchored to a published, attributed methodology rather than to an imitation of a person. That is
deliberate: an agent that follows a named method can be audited against it, while an agent doing
celebrity impersonation has nothing to be verified against.

## Squad architecture

```text
                        Helm (Orchestrator)
                       products-chief [Tier 0]
                                |
        ┌───────────────────────┼───────────────────────┐
        |                       |                       |
   ┌────┴─────┐          ┌──────┴─────┐          ┌──────┴──────┐
   | Lodestar |          |   Sonar    |          |    Datum    |
   | Strategy |          | Discovery  |          | Positioning |
   |  Tier 1  |          |   Tier 1   |          |   Tier 1    |
   └──────────┘          └────────────┘          └─────────────┘
        |                       |                       |
   ┌────┴─────┐          ┌──────┴─────┐          ┌──────┴──────┐
   |  Plumb   |          |  Vernier   |          |    Assay    |
   |   Jobs   |          | Experiments|          |   Pricing   |
   |  Tier 2  |          |   Tier 2   |          |   Tier 2    |
   └──────────┘          └────────────┘          └─────────────┘
```

| Tier | Name | Purpose |
|------|------|---------|
| 0 | Diagnosis & Routing | Triage the request, route it to the specialist, keep the squad coherent |
| 1 | Direction & Discovery | Decide what to build and for whom, with field evidence |
| 2 | Evidence & Commercial | Causality of the purchase, monetisation, statistical proof |

## Agents

| Tier | Agent | Persona | Icon | Based on (attribution) | Focus |
|------|-------|---------|------|------------------------|-------|
| 0 | `products-chief` | Helm | 🎛️ | Original (orchestrator) — carries no external methodology | Triage, routing, coherence across discovery, positioning and monetisation |
| 1 | `product-strategist` | Lodestar | 🌟 | Marty Cagan, *INSPIRED* 2nd ed. (2018); Marty Cagan and Chris Jones, *EMPOWERED* (2020) | Product vision, empowered teams, the four risks, product/market fit |
| 1 | `discovery-lead` | Sonar | 📡 | Teresa Torres, *Continuous Discovery Habits* (2021) | Opportunity solution tree, weekly interview cadence, assumption tests |
| 1 | `positioning-lead` | Datum | 📐 | April Dunford, *Obviously Awesome* (2019); *Sales Pitch* (2023) | Competitive alternatives, unique attributes, segment, market category |
| 2 | `jobs-analyst` | Plumb | 🔬 | Clayton M. Christensen with Taddy Hall, Karen Dillon and David S. Duncan, *Competing Against Luck* (2016) | Job statement, forces of progress, circumstance over demographics |
| 2 | `pricing-strategist` | Assay | 💰 | Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation* (2016) | Willingness to pay before building, packaging, monetisation model |
| 2 | `experimentation-lead` | Vernier | 🧪 | Ron Kohavi, Diane Tang and Ya Xu, *Trustworthy Online Controlled Experiments* (2020) | Trustworthy A/B design, OEC, guardrail metrics, statistical pitfalls |

Attribution is a required field (`based_on`) on every agent, and it is verifiable: if an agent
recommends something, the recommendation must be traceable to the named framework. The personas
apply these methods — they are not the authors and do not speak as them.

## Tasks

Seven executable tasks, one per discipline, each conforming to TASK-FORMAT-SPECIFICATION-V1
(`Entrada`, `Saida`, `Checklist`, acceptance criteria, handoff table, method attribution).

| Task | Owner | Materializes | Produces |
|------|-------|--------------|----------|
| `tasks/triage-product-request.md` | `@products:products-chief` | `*diagnose {request}` | Triage record, one named owner, boundary verdict, handoff brief |
| `tasks/draft-product-strategy.md` | `@products:product-strategist` | `*strategy` | Strategy doc with sourced insights, focus, risk register, revision condition |
| `tasks/build-opportunity-tree.md` | `@products:discovery-lead` | `*map-opportunities {outcome}` | Opportunity solution tree with snapshot provenance, one target opportunity |
| `tasks/write-job-statement.md` | `@products:jobs-analyst` | `*job-statement {job-or-draft}` | Solution-free job statement, hire/fire record, falsification condition |
| `tasks/run-positioning-process.md` | `@products:positioning-lead` | `*ten-step` | Positioning document, alternatives and attribute tables, category decision |
| `tasks/run-wtp-talk.md` | `@products:pricing-strategist` | `*wtp-talk` | WTP ranges per segment, leader/filler/killer classification, build impact |
| `tasks/design-controlled-experiment.md` | `@products:experimentation-lead` | `*design-experiment` | Pre-registered design, OEC, guardrails, power and duration, ramp plan |

## Workflows

Workflows are how the tasks connect. AEXOS is task-first: the sequence, the gates and the
dependencies come from the task definitions, and the workflow states the order and the artifact
each step needs from the one before it. Both workflows use `workflow.sequence` — the canonical
execution contract of `.aexos-core/development/scripts/workflow-validator.js`.

### `workflows/wf-discovery-to-decision.yaml`

Trigger `*discovery-to-decision`, entry `products-chief`, roughly 2-6 weeks (interview-bound).

```text
triage-product-request      products-chief        → triage record
  → draft-product-strategy    product-strategist  → focus, sourced insights, risk register
  → build-opportunity-tree    discovery-lead      → tree + exactly one target opportunity
  → write-job-statement       jobs-analyst        → causal, solution-free job statement
  → coherence-check           products-chief      → decision brief → @pm / @po / @sm
```

Each step requires the artifact the previous step creates. The terminal phase runs
`*coherence-check`, `*product-brief` and `*handoff-to-delivery` — it consolidates and stops.

### `workflows/wf-monetisation-and-proof.yaml`

Trigger `*monetisation-and-proof`, entry `products-chief`, roughly 3-8 weeks (traffic-bound).

```text
triage-product-request         products-chief         → triage record
  → run-positioning-process      positioning-lead     → frame of reference, category, segment
  → run-wtp-talk                 pricing-strategist   → WTP per segment, killers flagged
  → design-controlled-experiment experimentation-lead → pre-registered design, OEC, guardrails
  → coherence-check              products-chief       → decision brief → @pm / @po
```

The ordering is the point: a price is only defensible against a named frame of reference, and a
result is only defensible against a metric registered before exposure.

## How to run it

`@products:products-chief` is the front door. Use it whenever the owning discipline is not
obvious, when a request mixes disciplines, or when two specialists have produced contradictory
artifacts.

```text
@products:products-chief          # entry point — triage and routing
*diagnose {request}               # route one request, with a short usable answer first
*intake                           # structured intake for a new initiative
*sequence {situation}             # specialist order, with the input each one needs
*coherence-check                  # audit existing artifacts against the coherence chain
*handoff-to-delivery              # close the squad's involvement, package for @pm
*squad-map                        # who covers what, and what they explicitly do not
```

Direct specialist access, when the discipline is already known:

```text
@products:product-strategist      # vision, strategy, four risks, team model, objectives
@products:discovery-lead          # opportunity trees, interview cadence, assumption tests
@products:positioning-lead        # alternatives, attributes, segment, category
@products:jobs-analyst            # causal job, switch interviews, forces of progress
@products:pricing-strategist      # willingness to pay, packaging, monetisation model
@products:experimentation-lead    # OEC, guardrails, power, ramp, readout
```

### Coherence chain

When more than one discipline is genuinely required, the order is fixed by what each step needs
as an input, not by preference:

```text
segment → job → outcome → solution → narrative → price → measure
```

A break upstream invalidates every link below it, so the repair is routed before the request is.
Positioning built before the job is understood gets rewritten. Pricing set before the segment is
fixed gets rewritten.

## Boundary

**This squad decides WHAT to build and for WHOM.** It stops at the evidenced problem and the
defensible commercial claim. It never implements, tests, releases, drafts a story or writes an
epic — the terminal phase of every workflow hands the brief to the core agents and ends there.

| Belongs to | Authority |
|------------|-----------|
| `@pm` | Epics, PRD, epic execution |
| `@po` | Story validation, backlog priority |
| `@sm` | Story creation (`*draft`) — exclusive |
| `@dev` | Implementation |
| `@qa` | Quality gate |
| `@devops` | Release, git push, PRs, MCP, CI/CD — exclusive, no exceptions |
| `@analyst` | Deep market or competitive research beyond a squad cycle |
| `@architect` | System design, feasibility spikes |
| `@ux-design-expert` | Interface design and interaction detail |

No routing decision inside this squad may override Agent Authority
(`.claude/rules/agent-authority.md`).

## Directory structure

```text
squads/products/
├── squad.yaml          # Manifest: tiers, agents, handoff matrix, cross-cutting rules
├── README.md           # This file
├── CHANGELOG.md        # Version history
├── agents/             # 7 agent definitions
├── tasks/              # 7 executable tasks
├── workflows/          # 2 multi-phase workflows
├── checklists/         # (empty — reserved)
├── templates/          # (empty — reserved)
└── data/               # (empty — reserved)
```

`checklists/`, `templates/` and `data/` exist as directories but hold no files yet. Several agent
definitions reference squad-local files in those directories marked `# TO BE CREATED`; those paths
are not live and are not referenced by any task or workflow.

## Constitutional notes

- **Article IV — No Invention.** Applies throughout: an insight without a named source is struck
  from the strategy, an opportunity without a snapshot id is deleted from the tree, and a job
  statement clause without a transcript id does not ship.
- **Artifacts, not decks.** Every task writes a versioned markdown file into the repository.
- **Falsifiability.** Strategy carries a revision condition, positioning carries at least one
  falsifiable claim, the job statement carries a falsification condition, and the experiment
  registers its OEC before exposure.

---

*Products Squad v1.0.0 — AEXOS (Cyryx)*
*Philosophy: "Evidence before conviction."*
