# CEO Squad

> The executive chair: strategic diagnosis, capital allocation, organisation design and the account
> given to stakeholders. It decides where the company bets and why — not how the bet is built.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `@ceo-chief` (Regent)
**Contents:** 5 agents, 5 tasks, 2 workflows

## What this squad does

Four executive disciplines, kept separate on purpose, plus a triage layer that decides which one
owns an incoming question:

- **Strategic diagnosis** — name the difficulty in a form that could be wrong, choose an approach
  to it, and state what the approach rules out.
- **Capital allocation** — compare every use of cash against one published hurdle rather than
  approving proposals one at a time.
- **Organisation design** — put decisions at the level where knowledge and responsibility meet,
  and pay for the transition as a line item.
- **Stakeholder accounting** — report against what was promised, in the original terms, including
  every miss.

The most expensive executive failure this squad is built against is not a weak method: it is the
right question answered by the wrong discipline. Nothing enters without an owner.

## Squad Architecture

```
                        Regent (Orchestrator)
                          ceo-chief [Tier 0]
                                |
            ┌───────────────────┼───────────────────┐
            |                   |                   |
     ┌──────┴──────┐    ┌───────┴──────┐    ┌───────┴──────┐
     |   Kernel    |    |    Ledger    |    |   Lattice    |
     |  Strategy   |    |   Capital    |    |     Org      |
     |   Tier 1    |    |    Tier 1    |    |    Tier 1    |
     └─────────────┘    └──────────────┘    └──────────────┘
            |                   |                   |
            └───────────────────┼───────────────────┘
                                |
                        ┌───────┴───────┐
                        |    Herald     |
                        |  Stakeholders |
                        |    Tier 2     |
                        └───────────────┘
```

## Agents

Attribution is quoted from `squad.yaml` (`based_on`). Each agent applies a documented framework and
claims no words that were not published.

| Tier | Agent | Persona | Icon | Based on (`squad.yaml`) | Focus |
|------|-------|---------|------|-------------------------|-------|
| 0 | `ceo-chief` | Regent | 🔱 | Original (Orchestrator) | Executive triage, routing, coherence across strategy, capital and organisation |
| 1 | `strategy-lead` | Kernel | 🧩 | Richard Rumelt (Good Strategy Bad Strategy, 2011) | Diagnosis, guiding policy, coherent action; identifying bad strategy |
| 1 | `capital-allocator` | Ledger | 🏦 | William Thorndike (The Outsiders, 2012) | Capital allocation, return per unit invested, buyback versus reinvestment |
| 1 | `org-designer` | Lattice | 🧱 | Andrew Grove (High Output Management, 1983) | Manager output, leverage, team design and decision cadence |
| 2 | `stakeholder-lead` | Herald | 📯 | Annual shareholder letter and board reporting tradition | Narrative for board, investors and team; what is promised and how it is accounted for |

`stakeholder-lead` deliberately carries no single-work attribution: the genre has observable
conventions and a long practice history but no defining text, and a fabricated citation would be
worse than none.

## Tasks

Each task materialises one agent command and produces a captured artifact.

| Task | Owner | Materialises | Produces |
|------|-------|--------------|----------|
| `tasks/executive-request-triage.md` | `@ceo-chief` | `*diagnose` | Restated request, reversibility class, one named owner, usable short answer, handoff brief |
| `tasks/strategy-kernel.md` | `@strategy-lead` | `*kernel` | Diagnosis, guiding policy, coherent actions, exclusion list, inertia budget, falsifiable prediction |
| `tasks/capital-allocation-review.md` | `@capital-allocator` | `*allocate` | Cash position, one hurdle, five doors compared, opportunity cost, ranked recommendation, adviser flags |
| `tasks/org-design-plan.md` | `@org-designer` | `*org-plan` | Output definitions, limiting steps, paired indicators, decision rights, cadence, transition cost |
| `tasks/stakeholder-account-report.md` | `@stakeholder-lead` | `*account` | Per-promise account, miss reports, restatement and candour findings, counsel flags, held DRAFT |

## Workflows

Workflows are what turn five tasks into an executable sequence. Both use `workflow.sequence` — the
canonical execution contract read by `.aexos-core/development/scripts/workflow-validator.js`.

### `workflows/wf-executive-decision-cycle.yaml` — forward-looking

Trigger `*exec-cycle`, entry `ceo-chief`. One request becomes one recorded decision.

| Phase | Agent | Task | Creates |
|-------|-------|------|---------|
| 0 | `ceo-chief` | `executive-request-triage.md` | `triage_brief` |
| 1 | `strategy-lead` | `strategy-kernel.md` | `strategy_kernel` |
| 2 | `capital-allocator` | `capital-allocation-review.md` | `capital_plan` |
| 3 | `org-designer` | `org-design-plan.md` | `org_plan` |
| 4 | `ceo-chief` | — (`*coherence-check` → `*decision-record` → `*handoff-to-delivery`) | `executive_decision_package` |

Phases 2 and 3 both depend on the kernel and may run in parallel. Phase 4 refuses to hand off with
an unresolved contradiction between the capital plan and the org plan.

### `workflows/wf-accountability-cycle.yaml` — backward-looking

Trigger `*accountability-cycle`, entry `ceo-chief`. A period is closed against what was promised,
and the layer that failed is repaired.

| Phase | Agent | Task | Creates |
|-------|-------|------|---------|
| 0 | `ceo-chief` | `executive-request-triage.md` | `accountability_scope` |
| 1 | `stakeholder-lead` | `stakeholder-account-report.md` | `period_account_draft` |
| 2 | `strategy-lead` | `strategy-kernel.md` | `revised_strategy_kernel` |
| 3 | `org-designer` | `org-design-plan.md` | `revised_org_plan` |
| 4 | `capital-allocator` | `capital-allocation-review.md` | `revised_capital_plan` |
| 5 | `ceo-chief` | — (`*coherence-check` → `*decision-record` → `*exec-brief` → `*handoff-to-delivery`) | `accountability_package` |

Phases 2, 3 and 4 are conditional: each runs only when the variance traces to that layer. Phases 3
and 4 may run in parallel once the diagnosis is repaired. The account itself never leaves the squad
— it is held DRAFT for a named human reviewer.

## Activation

`@ceo-chief` is the front door. Route through it unless you already know which discipline owns the
question.

```
@ceo-chief                      # Tier 0 — triage and routing
```

Direct specialist access uses the squad's slash prefix (`slashPrefix: ceo` in `squad.yaml`):

```
@ceo:strategy-lead              # Diagnosis, guiding policy, bad-strategy detection
@ceo:capital-allocator          # Hurdle rates, five doors, per-share thinking
@ceo:org-designer               # Leverage, decision rights, cadence
@ceo:stakeholder-lead           # Board packets, investor updates, promises and accounts
```

Useful entry commands:

| Command | Agent | Use when |
|---------|-------|----------|
| `*diagnose {request}` | `ceo-chief` | You are not sure who owns the question |
| `*sequence {situation}` | `ceo-chief` | Several disciplines are needed and order matters |
| `*coherence-check` | `ceo-chief` | Two executive artifacts contradict each other |
| `*decision-record {decision}` | `ceo-chief` | A decision needs to be captured properly |
| `*squad-map` | `ceo-chief` | You want to see what the squad covers and what it does not |
| `*handoff-to-delivery` | `ceo-chief` | The decision is made and delivery is next |

## Boundary with the core

This squad decides and evidences inside its domain. It does not implement, does not test and does
not publish — those belong to the core agents, as recorded in `squad.yaml` under
`cross_cutting.core_agent_boundary`.

| Core agent | Owns |
|------------|------|
| `@pm` | Epics, PRD, epic execution |
| `@po` | Story validation and backlog |
| `@sm` | Story creation (draft) — exclusive authority |
| `@dev` | Implementation |
| `@qa` | Quality gate |
| `@devops` | Release and push — exclusive authority |

Both workflows terminate at the handoff. The final phase packages the decision for `@pm`, `@po` and
`@sm` and stops there; nothing in this squad writes code, runs a gate, or pushes.

Cross-squad boundaries, also recorded in `squad.yaml`:

| Squad agent | Owns |
|-------------|------|
| `@products:product-strategist` | Product strategy and portfolio bets |
| `@board:governance-counsel` | Governance oversight and accountability to the board |

## Directory Structure

```text
squads/ceo/
├── squad.yaml                            # Manifest (components/ derived from disk)
├── README.md                             # This file
├── CHANGELOG.md
├── agents/
│   ├── ceo-chief.md                      # Tier 0: triage and routing (Regent)
│   ├── strategy-lead.md                  # Tier 1: strategy (Kernel)
│   ├── capital-allocator.md              # Tier 1: capital (Ledger)
│   ├── org-designer.md                   # Tier 1: organisation (Lattice)
│   └── stakeholder-lead.md               # Tier 2: stakeholders (Herald)
├── tasks/
│   ├── executive-request-triage.md
│   ├── strategy-kernel.md
│   ├── capital-allocation-review.md
│   ├── org-design-plan.md
│   └── stakeholder-account-report.md
├── workflows/
│   ├── wf-executive-decision-cycle.yaml  # Forward: request → decision → handoff
│   └── wf-accountability-cycle.yaml      # Backward: period → account → correction
├── checklists/                           # (empty)
├── templates/                            # (empty)
└── data/                                 # (empty)
```

## Validation

```bash
node scripts/normalize-squad-manifests.js
node -e "const {SquadValidator}=require('./.aexos-core/development/scripts/squad/squad-validator.js');\
new SquadValidator().validate('squads/ceo').then(r=>console.log(r.valid, r.errors.length, r.warnings.length))"
```

Expected: `true 0 0`. Every `task:` reference in a workflow resolves to a file in `tasks/`, and
every `agent:` reference resolves to an id in `squad.yaml`.

---

*CEO Squad v1.0.0 — Cyryx Labs LLC*
*"Strategy is choosing what not to do."*
