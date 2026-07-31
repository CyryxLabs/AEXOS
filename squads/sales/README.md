# Sales Squad

> Qualification, consultative selling method, negotiation and pipeline operation — from first contact to signature.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Total:** 5 agents, 5 tasks, 2 workflows, 5,145 agent lines

**Philosophy:** *"Qualifying is deciding whom not to sell to."* A named, verifiable method above a seller's intuition.

---

## What This Squad Does

It decides and evidences four things, in the order the commercial coherence chain requires:

```text
fit → pain → insight → economic buyer → decision process → commercial terms → forecast stage
```

| It answers | It does not answer |
|---|---|
| Is this deal real, and what evidence says so? | What should we charge? |
| Does the buyer see the problem, and can they verify what we told them? | What category are we in? |
| What is traded, inside a structure someone else approved? | Should we build this? |
| Why does the funnel behave this way across deals? | Is the code correct, and is it shipped? |

Every artifact is written under `squads/sales/` with a date. A decision that exists only in a chat transcript did not happen.

---

## Squad Architecture

```text
                       Vanguard 🎺 (Orchestrator)
                        sales-chief [Tier 0]
                                |
        ┌───────────────┬───────┴───────┬────────────────┐
        |               |               |                |
 ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴───────┐ ┌──────┴──────┐
 |   Sieve 🧲  | |   Forge 🔥  | |  Tether 🪢   | | Conveyor ⛓️  |
 | Qualification| |   Method   | | Negotiation  | |  Pipeline   |
 |   Tier 1    | |   Tier 1   | |   Tier 2     | |   Tier 2    |
 └─────────────┘ └────────────┘ └──────────────┘ └─────────────┘
```

---

## Agents

| Tier | Agent | Persona | Icon | Attribution (`based_on`) | Focus |
|---|---|---|---|---|---|
| 0 | `sales-chief` | Vanguard | 🎺 | Original (Orchestrator) | Triage, routing, coherence between method, qualification and negotiation |
| 1 | `qualification-lead` | Sieve | 🧲 | MEDDIC (Dick Dunkel & Jack Napoli, PTC) | Metrics, economic buyer, decision criteria, decision process, pain, champion — the six letters; the decision process accounts for most forecast slippage |
| 1 | `method-lead` | Forge | 🔥 | Matthew Dixon and Brent Adamson, *The Challenger Sale* (2011) | Teach, tailor, take control; constructive tension in the sale |
| 2 | `negotiation-lead` | Tether | 🪢 | Chris Voss, *Never Split the Difference* (2016) | Tactical empathy, anchors, labels, "no" as the start of the negotiation |
| 2 | `pipeline-ops` | Conveyor | ⛓️ | Mark Roberge, *The Sales Acceleration Formula* (2015) | Predictability, funnel metrics, hiring and rep ramp |

### Attribution rules this squad holds itself to

Wrong attribution is worse than no attribution. Two caveats are carried permanently, in the agents, in the tasks and here:

- **MEDDIC is a discipline, not a book.** It was developed inside Parametric Technology Corporation in the 1990s and is commonly credited to Dick Dunkel and Jack Napoli, who formalized and taught it there. It circulated as internal practice and later through training organizations, **not** through a canonical work by its originators. Nothing is quoted from a text that does not exist. The MEDDICC (Competition) and MEDDPICC (Paper Process) variants are stated as explicit extensions, never folded silently into the six letters.
- **The 7-38-55 ratio is not used.** *Never Split the Difference* cites the widely quoted communication ratio attributed to research by Albert Mehrabian. That ratio is contested in the broader literature and is routinely applied far beyond the narrow experimental conditions it came from. **No recommendation in this squad is built on it.**

Agents apply documented frameworks. No agent speaks as an author, and no phrasing, title or year is attributed to an individual on the basis of inference.

---

## Commercial Integrity — Non-Negotiable

Every task and every negotiation phase carries a **blocking** integrity screen. A failure removes the move. It is not softened, not reworded and not appended as a caveat.

| Blocked | Meaning |
|---|---|
| **Fabricated urgency** | A deadline, price expiry or consequence invented for effect — or ours, presented as theirs |
| **Invented scarcity** | Allocation, capacity or an expiring structure implied and not real |
| **Bluffed alternative** | A competing offer, another buyer or an internal mandate implied and untrue |
| **Material omission** | A known limitation, integration gap, implementation cost or renewal mechanic withheld |
| **Roadmap as shipped** | A capability claimed as available today that is not — roadmap is disclosed as roadmap |
| **Empathy inversion** | Using an understanding of the counterparty's fear to exploit it rather than serve their interest |
| **Durability failure** | An agreement the buyer could not defend internally if they understood everything we understand |

Two tests decide the ambiguous cases:

- **Reversal test.** If the buyer saw exactly how this was constructed, would they still consider it fair? A no is a block.
- **Compliant alternative.** Every block produces the honest replacement that pursues the same legitimate goal by naming our real constraint and asking for theirs. If no legitimate goal survives the rewrite, that is said plainly and the work stops.

Buyer silence about a decision process is qualification data. It is never manufactured into a deadline.

---

## Tasks

| Task file | Agent | Command | Produces |
|---|---|---|---|
| `sales-chief-diagnose.md` | `sales-chief` | `*diagnose {request}` | Triage record: one owner, two near misses, short usable answer, handoff brief, integrity flag |
| `qualification-lead-qualify.md` | `qualification-lead` | `*qualify {deal}` | MEDDIC table scored 0-3 with source and date per letter, gaps with one verification step each, verdict, visible UNVERIFIED block |
| `method-lead-build-insight.md` | `method-lead` | `*build-insight` | Insight with an evidence table, status-quo cost in the buyer's units, four-rule result, four-line reframe |
| `negotiation-lead-prep.md` | `negotiation-lead` | `*negotiation-prep {deal}` | Interest map, walk-away, leverage read, concession ladder with ESCALATE markers, exact labels and questions, accusation audit |
| `pipeline-ops-stage-design.md` | `pipeline-ops` | `*stage-design` | Stage model named after buyer action, exit criteria with artifacts, field-test results, remap report, instrumentation specification |

Each agent exposes more commands than the tasks materialized here; see the agent definition for the full list.

---

## Workflows

Workflows are how tasks connect. AEXOS is task-first: the sequence, its gates and its dependencies live in the workflow, not in the agent.

### `wf-deal-cycle.yaml` — Deal Cycle: Triage To Negotiation Plan

Entry: `sales-chief` · Trigger: `*intake` · Duration: 2-5 working days, paced by buyer-side evidence

| Phase | Agent | Task | Creates | Gate |
|---|---|---|---|---|
| 0 | `sales-chief` | `sales-chief-diagnose.md` | `triage_brief` | Restatement confirmed, one owner named, evidence gap separated from evidence held |
| 1 | `qualification-lead` | `qualification-lead-qualify.md` | `qualification_record` | Six letters scored with source and date; UNVERIFIED block visible; close date derived from the buyer's process |
| 2 | `method-lead` | `method-lead-build-insight.md` | `insight_record` | Every claim sourced; the buyer can verify it outside our marketing; four rules run |
| 3 | `negotiation-lead` | `negotiation-lead-prep.md` | `negotiation_plan` | Qualification gate passed; approved commercial structure present; walk-away written before the ladder |

Stops on `NOT QUALIFIED` (run the two highest-yield verifications first) and ends on `DISQUALIFIED` (with the re-entry condition recorded). Phase 3 refuses to draft a number for a buyer who cannot sign — preparing concessions there teaches the account that pressure produces price.

### `wf-pipeline-repair.yaml` — Pipeline Repair: Diagnose The Funnel, Rebuild The Stages

Entry: `sales-chief` · Trigger: `*funnel-analysis` · Duration: 1-2 weeks, paced by sample size and the remap

| Phase | Agent | Task | Creates | Gate |
|---|---|---|---|---|
| 0 | `sales-chief` | `sales-chief-diagnose.md` | `pipeline_triage_brief` | Established as a pattern across deals, not one deal wearing a systemic costume |
| 1 | `qualification-lead` | `qualification-lead-qualify.md` | `qualification_evidence_standard` | One evidence scale, derived from a named representative sample of real deals |
| 2 | `pipeline-ops` | `pipeline-ops-stage-design.md` | `stage_model_spec` | Buyer journey written first; one buyer-side exit criterion per stage; every criterion survives the field test |
| 3 | `method-lead` | `method-lead-build-insight.md` | `segment_insight_record` | Runs only where the leak is a conversation defect rather than a stage defect |

The evidence standard is established **before** the stage model, because two standards produce two truths and the forecast consumes both without distinguishing them. The output is a specification: instrumentation is handed to `@dev` and `@data-engineer`, never built here.

---

## How To Engage

**`@sales-chief` is the front door.** Start there unless you already know which discipline owns the question — broadcasting one deal to four specialists produces four partial reads built on different unstated assumptions and no decision.

```text
@sales:sales-chief
```

Or through AEXOS activation:

```text
/AEXOS:agents:sales-chief
```

Then:

```text
*diagnose {your request in your own words}   # triage and route
*intake                                      # structured intake for a new deal
*sequence {situation}                        # specialist order, with the cost of running it out of order
*coherence-check {deal}                      # audit existing artifacts against the coherence chain
```

### Direct specialist access, when the owner is already known

```text
/AEXOS:agents:qualification-lead    # is the deal real — MEDDIC, disqualification
/AEXOS:agents:method-lead           # the selling conversation — insight, reframe, tension
/AEXOS:agents:negotiation-lead      # what is traded — interests, concessions, procurement
/AEXOS:agents:pipeline-ops          # why the funnel behaves this way — stages, forecast, ramp
```

### Routing shortcuts

| Symptom | Owner | Why |
|---|---|---|
| "How much do we discount?" | `qualification-lead`, then `negotiation-lead` | Price pressure on an unqualified deal is a qualification signal |
| "The forecast keeps slipping" | `pipeline-ops`, with `qualification-lead` on stage evidence | Usually a stage-definition defect |
| "They went dark" | `qualification-lead`, then `method-lead` | The champion could not sell it internally, or never was one |
| "We keep losing on price" | `method-lead` for one deal; `@products:positioning-lead` for a pattern | One deal is a conversation; a pattern is positioning |
| "Procurement is stonewalling" | `negotiation-lead`, with `qualification-lead` on the decision process | Procurement leverage grows where the process was never mapped |
| "New reps ramp too slowly" | `pipeline-ops` | Hiring profile and training formula against the buyer journey |

---

## Boundary

This squad decides and evidences inside its own domain. It does not implement, test or publish.

### Cross-squad

| Belongs to | Scope |
|---|---|
| `@products:pricing-strategist` | Price level, packaging, value metric, willingness to pay, discount policy |
| `@products:positioning-lead` | Market category, competitive alternatives, frame of reference |

A deal that exposes a defect in pricing or positioning produces a **finding routed outward**. It never licenses this squad to set a price or a category. Findings travel as patterns across deals, not as one account.

### AEXOS core

| Belongs to | Scope |
|---|---|
| `@pm` | Epics, PRD, epic execution |
| `@po` | Story validation and backlog |
| `@sm` | Story drafting — exclusive authority |
| `@dev` | Implementation, CRM configuration, instrumentation |
| `@data-engineer` | Schema, queries, data modelling |
| `@qa` | Quality gates |
| `@devops` | Release, git push, PRs, CI/CD — **exclusive authority, no exceptions** |

---

## Directory Structure

```text
squads/sales/
├── squad.yaml                          # Manifest — tiers, agents, handoffs, boundaries (components/ derived from disk)
├── README.md                           # This file
├── CHANGELOG.md                        # Version history
├── agents/
│   ├── sales-chief.md                  # Tier 0: Vanguard 🎺 — triage and routing
│   ├── qualification-lead.md           # Tier 1: Sieve 🧲 — MEDDIC
│   ├── method-lead.md                  # Tier 1: Forge 🔥 — Challenger
│   ├── negotiation-lead.md             # Tier 2: Tether 🪢 — tactical empathy
│   └── pipeline-ops.md                 # Tier 2: Conveyor ⛓️ — funnel and people system
├── tasks/                              # 5 executable tasks (TASK-FORMAT-SPECIFICATION-V1)
├── workflows/
│   ├── wf-deal-cycle.yaml              # Triage → qualify → insight → negotiation plan
│   └── wf-pipeline-repair.yaml         # Triage → evidence standard → stage model → conversation repair
├── checklists/                         # Reserved — empty, nothing invented to fill it
├── templates/                          # Reserved — empty, nothing invented to fill it
└── data/                               # Reserved — empty, nothing invented to fill it
```

---

## Validation

```bash
node scripts/normalize-squad-manifests.js
node -e "const {SquadValidator}=require('./.aexos-core/development/scripts/squad/squad-validator.js');new SquadValidator().validate('squads/sales').then(r=>console.log(r.valid, r.errors.length, r.warnings.length))"
```

Expected: `true 0 0`.

---

*Sales Squad v1.0.0 — AEXOS (Cyryx Labs LLC)*
*"Qualifying is deciding whom not to sell to."*
