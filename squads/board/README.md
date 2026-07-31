# Board Squad

> Governance, risk oversight, assurance and succession. The squad that supervises and advises management — and never replaces it.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `@board-chief` | **Slash prefix:** `board`

---

## What this squad does

A board does not operate. It requires evidence from those who do.

This squad materializes that stance inside AEXOS. It classifies a matter before engaging its
content, tests whether the authority to decide it actually exists, sets boundaries that can
genuinely reject a proposal, challenges the figures a decision rests on, and asks whether anyone
is ready to lead if the incumbent leaves tomorrow.

It produces oversight artifacts: classifications, provision tables, appetite statements with
tolerance bands, figure verdicts, readiness horizons, ranked findings. Each one is written to a
versioned file under `squads/board/data/` so a decision does not live only in a transcript.

### Professional limit — read this before using the squad

**Governance and risk work is not legal advice, tax advice, or statutory audit.**

Every artifact this squad produces is **input for review by qualified humans** — the directors
themselves, licensed counsel, and the appointed external auditor. None of it is the final
instrument, and none of it substitutes for advice.

- **No agent, task or workflow phase issues an audit opinion.** The `figure-challenge` task and
  the assurance phases produce a question set the board can put to management and to its appointed
  auditors — never a conclusion about the auditor's opinion.
- **Legal, tax, listing-rule, filing, employment and compensation-regulation questions are referred
  out, unmodified.** Where a matter turns on the interpretation of a statute, a contract or a
  filing obligation, the task stops, records the limit, and continues only on the governance
  residue. It does not approximate.
- **Nobody is appointed, removed or rated as a person.** Succession assessment is expressed as
  readiness against agreed criteria, on stated evidence. A rating with no observed evidence is
  marked `UNVERIFIED`.
- **No figure enters an artifact without a stated basis** — Constitution Article IV, No Invention.

---

## Agents

| Tier | Agent | Persona | Icon | Based on | Focus |
|------|-------|---------|------|----------|-------|
| 0 | `board-chief` | Chair | ⚖️ | Original (orchestrator) | Board agenda, routing, keeping oversight and advice in balance |
| 1 | `governance-counsel` | Charter | 📜 | Cadbury Report (1992) and the corporate governance principles derived from it | Separation of roles, independence, fiduciary duty, committee structure |
| 1 | `risk-oversight` | Bulwark | 🛡️ | COSO Enterprise Risk Management Framework | Risk appetite, controls, tail risk, what escalates to the board |
| 2 | `audit-lead` | Tally | 🧾 | COSO (Internal Control — Integrated Framework) + Sarbanes-Oxley Act (2002) + Cadbury Report (1992) + the three-lines model associated with the Institute of Internal Auditors | Integrity of reported figures, internal control, external auditor relationship |
| 2 | `succession-lead` | Lineage | 🌳 | Ram Charan, Dennis Carey & Michael Useem, *Boards That Lead* (2013) | CEO succession, leadership pipeline, executive performance assessment |

### Attribution, as the agents themselves carry it

The `based_on` field is a claim about method, not a claim of authorship. Every agent states its
source and its qualification, and those qualifications travel with the output:

- **`governance-counsel`** applies the *Report of the Committee on the Financial Aspects of
  Corporate Governance* — the **Cadbury Report**, United Kingdom, December 1992 — and its **Code of
  Best Practice**. Two rules bind it: a general governance practice is never presented as a Code
  provision (anything not traceable to the Report is marked `DERIVED` or `CONSTRUCTION`), and the
  adaptation is declared — the Code addresses UK listed company boards, so applying it anywhere
  else is an analogy and is named as one.
- **`risk-oversight`** applies **COSO** — the Committee of Sponsoring Organizations of the Treadway
  Commission — in *Enterprise Risk Management — Integrating with Strategy and Performance* (2017),
  which updated the earlier *Enterprise Risk Management — Integrated Framework* (2004). COSO ERM is
  a management and oversight framework, **not a quantitative model**: it supplies no loss
  distributions, capital requirements or actuarial estimates. COSO's *Internal Control — Integrated
  Framework* is a different document with a different purpose, and where internal control over
  reporting is the question the owner is `audit-lead`. The forbidden-decision test is this agent's
  own `CONSTRUCTION`.
- **`audit-lead`** works in a discipline with **no single canonical author and no one foundational
  text**. Provisions are cited to exactly one source and the sources are never merged: the
  **Cadbury Report (1992)** and its Code; **COSO's *Internal Control — Integrated Framework***
  (1992, updated 2013), whose five components are supported by seventeen principles, and whose
  sponsoring commission takes its name from the National Commission on Fraudulent Financial
  Reporting (report issued 1987); the **Sarbanes-Oxley Act of 2002** (United States); and the
  **three-lines model** associated with the Institute of Internal Auditors. Claiming a single
  canonical work for this discipline would itself be a misattribution.
- **`succession-lead`** applies **Ram Charan, Dennis Carey and Michael Useem**, *Boards That Lead:
  When to Take Charge, When to Partner, and When to Stay Out of the Way* (Harvard Business Review
  Press, 2013), whose operating premise is the three modes and which places chief-executive
  succession in take charge. That book is **not a step-by-step succession manual** — emergency
  plans, readiness horizons and transition sequencing are marked `DISCIPLINE` or `CONSTRUCTION`.
  Pipeline reasoning is attributed **separately** to **Ram Charan, Stephen Drotter and James Noel**,
  *The Leadership Pipeline* (2001) — a different book with different co-authors. The two
  attributions are never merged.

No citation, title, publisher or year may be invented. Where a provision cannot be sourced, it is
reported as unsourced rather than attributed — a wrong attribution is worse than none.

---

## Tasks

Five executable tasks, one per agent, each conforming to TASK-FORMAT-SPECIFICATION-V1.

| Task | Owner | Materializes | Produces |
|------|-------|--------------|----------|
| `board-matter-triage.md` | `@board-chief` | `*triage` | Classification (RESERVED / DELEGATED WITH OVERSIGHT / NOT A BOARD MATTER / UNDEFINED), limit note, exactly one owning specialist, handoff brief |
| `governance-audit.md` | `@governance-counsel` | `*governance-audit` | Provision table (PRESENT / ASSERTED / ABSENT / NOT APPLICABLE), gaps ranked by structural consequence, remediation with named owners |
| `risk-appetite-statement.md` | `@risk-oversight` | `*appetite` | One appetite per risk type, forbidden-decision test, tolerance bands, breach consequences, `UNVERIFIED` list |
| `figure-challenge.md` | `@audit-lead` | `*figure-challenge` | Restated assertion, named assertor, judgements range with direction finding, assurance status or `NO ASSURANCE`, one of three verdicts |
| `succession-audit.md` | `@succession-lead` | `*succession-audit` | Emergency, criteria, bench, development, cadence, concentration and mode findings, ranked by departure-this-quarter impact |

---

## Workflows

Two workflows chain the tasks into executable sequences. AEXOS is task-first: the workflow supplies
the order and the gates, the tasks supply the work.

### `wf-oversight-cycle.yaml` — Board Oversight Cycle

Trigger `*oversight-cycle` · entry `board-chief` · 60-120 minutes

Follows the coherence chain — mandate, appetite, evidence, accountability — over a single matter.

| Phase | Agent | Task | Creates |
|-------|-------|------|---------|
| 0 · Matter Triage | `board-chief` | `board-matter-triage.md` | `board_triage_record` |
| 1 · Mandate | `governance-counsel` | `governance-audit.md` | `governance_audit_record` |
| 2 · Appetite | `risk-oversight` | `risk-appetite-statement.md` | `risk_appetite_record` |
| 3 · Evidence | `audit-lead` | `figure-challenge.md` | `figure_challenge_record` |
| 4 · Accountability | `board-chief` | `board-matter-triage.md` | `board_disposition_pack` |

Each phase reads the artifact the previous phase wrote. A break in the chain is repaired upstream,
never patched downstream. Phase 2 halts if strategy and objectives are absent; Phase 1 blocks
approval where the mandate is only asserted.

### `wf-succession-review.yaml` — Leadership Continuity Review

Trigger `*continuity-review` · entry `board-chief` · 60-120 minutes

Establishes who may appoint **before** anyone is assessed, then tests whether continuity exists.

| Phase | Agent | Task | Creates |
|-------|-------|------|---------|
| 0 · Continuity Triage | `board-chief` | `board-matter-triage.md` | `continuity_triage_record` |
| 1 · Appointment Authority | `governance-counsel` | `governance-audit.md` | `appointment_authority_record` |
| 2 · Continuity | `succession-lead` | `succession-audit.md` | `succession_audit_record` |
| 3 · Exposure | `risk-oversight` | `risk-appetite-statement.md` | `people_risk_appetite_record` |
| 4 · Assurance (conditional) | `audit-lead` | `figure-challenge.md` | `succession_figure_record` |
| 5 · Disposition | `board-chief` | `board-matter-triage.md` | `continuity_disposition_pack` |

Phase 4 runs only where a succession-linked figure or disclosure is being relied on. Without
written succession criteria, Phase 2 produces no bench ranking at all — the absence is the finding.

### Limits carried by both workflows

Every workflow declares a `professional_limit`, a `boundary` and workflow-level `veto_conditions`.
No phase issues an audit opinion, offers a legal or regulatory conclusion, or assesses a person
rather than readiness against agreed criteria. Every phase artifact carries a human-review clause
on its face.

---

## How to invoke

**`@board-chief` is the front door.** Bring the matter in the requester's own words; the Chair
classifies it and routes it to exactly one specialist. Broadcasting a matter to several specialists
at once is an anti-pattern the squad refuses.

```
@board-chief
*triage                 # classify a matter and route it
*agenda                 # build a board agenda with disposition fields
*charge-check           # is this the board's decision at all?
*escalation-test        # why was the board surprised?
*sequence               # dependency order for a multi-discipline matter
*coherence-check        # audit existing artifacts against the oversight chain
*board-pack             # the board's combined view
*minute                 # record a decision that has been taken
*help                   # all commands
```

Direct specialist access, once you know who owns the question:

```
@governance-counsel   *governance-audit  *reserved-matters  *independence-test  *delegation-map
@risk-oversight       *appetite  *escalation-thresholds  *portfolio-view  *tail-scan
@audit-lead           *figure-challenge  *assurance-map  *judgements-register  *control-review
@succession-lead      *succession-audit  *mode-check  *bench-review  *emergency-succession
```

Workflows are triggered through the entry agent: `*oversight-cycle` and `*continuity-review`.

**Routing map:**

| Question | Owner |
|----------|-------|
| Authority, independence, reserved matters, delegation, conflicts, board evaluation | `governance-counsel` |
| Appetite, exposure, severity, portfolio view, responses, escalation thresholds | `risk-oversight` |
| Reported-figure integrity, internal control, assurance, auditor relationship, whistleblowing | `audit-lead` |
| CEO succession, bench depth, executive assessment, key-person concentration | `succession-lead` |
| Anything legal, tax, statutory-audit or regulatory | **External qualified professionals — referred out unmodified** |

---

## Boundary with the AEXOS core

This squad decides and evidences inside its own domain. **It does not implement, does not test and
does not publish.** Those belong to the core agents, and a board disposition is not an exception:

| Defers to | For |
|-----------|-----|
| `@pm` | Epics, PRD, epic execution |
| `@po` | Story validation and backlog |
| `@sm` | Story creation (`*draft`) — exclusive authority |
| `@dev` | Implementation |
| `@qa` | Quality gates |
| `@devops` | Release, git push, PRs, MCP, CI/CD — **exclusive authority** |

No task, workflow phase or board resolution authorizes a git push, a PR, a story draft, a backlog
change or an implementation. Agent Authority is not negotiable.

Beyond AEXOS entirely: qualified counsel for legal, contractual and regulatory interpretation; tax
advisers for tax treatment and structuring; the appointed external auditor for the statutory audit
opinion.

---

## Directory structure

```
squads/board/
├── squad.yaml                       # Manifest — tiers, agents, handoffs, cross-cutting concerns
├── README.md                        # This file
├── CHANGELOG.md                     # Version history
├── agents/
│   ├── board-chief.md               # Tier 0: Chair ⚖️
│   ├── governance-counsel.md        # Tier 1: Charter 📜
│   ├── risk-oversight.md            # Tier 1: Bulwark 🛡️
│   ├── audit-lead.md                # Tier 2: Tally 🧾
│   └── succession-lead.md           # Tier 2: Lineage 🌳
├── tasks/                           # 5 executable tasks, one per agent
├── workflows/
│   ├── wf-oversight-cycle.yaml      # Mandate → appetite → evidence → accountability
│   └── wf-succession-review.yaml    # Authority → continuity → exposure → assurance
├── checklists/                      # (empty — agents carry their checks inline)
├── templates/                       # (empty)
└── data/                            # Versioned board artifacts written at runtime
```

`checklists/`, `templates/` and `data/` are intentionally empty in this release. Every command is
fully specified inside its agent file and its task; squad-local checklists and templates are
accelerators, never prerequisites. `data/` fills at runtime with the versioned records each task
writes.

---

## Validation

```bash
node scripts/normalize-squad-manifests.js
node -e "const {SquadValidator}=require('./.aexos-core/development/scripts/squad/squad-validator.js'); \
  new SquadValidator().validate('squads/board').then(r=>console.log(r.valid, r.errors.length, r.warnings.length))"
```

Expected: valid, 0 errors, 0 warnings. `components:` in `squad.yaml` is derived from disk by the
normalizer — add a task, an agent or a workflow and re-run it rather than editing the list by hand.

---

*Board Squad v1.0.0 — AEXOS (Cyryx Labs LLC)*
*"Oversight is asking the question nobody wants to answer." The board does not operate — it requires evidence from those who do.*
