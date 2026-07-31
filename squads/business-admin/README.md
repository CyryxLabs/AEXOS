# Business Administration Squad

> Finance, people, legal operations and process — the infrastructure that lets the rest of the company work.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `admin-chief` | **5 agents, 5 tasks, 2 workflows**

*"Process exists to remove a repeated decision, not to add a step."*

---

## Professional limit — read this first

Finance, people and legal are regulated areas. This squad works beside four licensed professions and
replaces none of them. It is the number-one risk in the squad's domain, so it is stated at the top
rather than as a closing caveat, and every task and every workflow phase carries a checkpoint that
enforces it.

**This squad does not:**

- issue an accounting, tax, statutory, assurance, employment, labour, discrimination, benefits,
  payroll, data-protection or legal opinion — under any framing, including "a view", "what usually
  happens", or "a starting point for counsel to correct";
- substitute for an accountant, tax adviser, auditor, lawyer, qualified HR professional or control
  owner;
- produce anything for a regulator, tax authority, court, auditor, lender, counterparty or any other
  external reader.

**Per-agent limits that are reached constantly and are routed rather than absorbed:**

| Agent | Hard limit |
|---|---|
| `finance-lead` | Reads movements between two dates for internal decisions. States no recognition, measurement, disclosure, classification or tax treatment. Produces no assurance. |
| `people-lead` | Designs practice for a **role**. Handles no individual case — no grievance, discipline, dismissal, accommodation, investigation or improvement plan — and processes no personal data. A bar never touches a real candidate before qualified HR and employment counsel review it. |
| `legal-ops` | Legal operations is not the practice of law. Records what a document **states**, with a clause reference. Interprets no clause, assesses no enforceability, drafts and redlines nothing. Nothing produced here is privileged. |
| `process-lead` | Removes, weakens or retimes no financial, legal or regulatory control; segregation of duties is untouchable. Decides no retention or personal-data question. Designs no role or headcount change. |

Anything approaching those lines leaves the squad as a **written, directly answerable question** for a
named licensed professional, with the documents to attach and the deadline. Routing a regulated
question to a squad specialist instead is not permitted — routing is not a laundering mechanism. When
classification is unclear, the item counts as regulated: over-referring costs an email, under-referring
costs a filing, a claim or a case.

**Privilege.** Nothing written inside this squad is privileged. Privilege attaches to lawyers, and how
it operates in a given jurisdiction is itself a question for counsel. If a matter is contentious,
sensitive or could become a dispute, work stops and counsel decides what is written next.

---

## What the squad does

Administrative requests arrive stated as their symptom rather than their cause. "We are profitable but
there is no money", "hiring is too slow", "legal takes forever", "we should automate the admin". Each
is usually owned by a different discipline than the one it names, and each sits close to a regulated
boundary.

The squad does four things and stops:

1. **Reads the financial picture** — reconciles a reported result to the movement in cash, names the
   dominant driver, and marks every figure with its source.
2. **Designs people practice** — hiring bars, structured assessment, calibration and pay logic, at the
   level of the role and never the individual.
3. **Runs legal work as a managed business function** — intake, lifecycle, tracked obligations,
   counsel briefs, visible spend. Administration around the law, never the law itself.
4. **Designs process** — end-to-end mapping across every function a process crosses, handoffs and
   queues, controls inventoried with owners, and a value test before anything is automated.

It decides and evidences. It does not implement, test or publish.

---

## Agents

| Tier | Agent | Persona | Icon | Attribution (`based_on`) | Focus |
|---|---|---|---|---|---|
| 0 | `admin-chief` | Steward | 🗝️ | Original (orchestrator) | Triage and routing across finance, people, legal and process; runs the regulated gate first, always |
| 1 | `finance-lead` | Abacus | 🧮 | Karen Berman & Joe Knight, *Financial Intelligence* (2006) | Reading statements, profit versus cash, number quality, cash cycle, return cases |
| 1 | `people-lead` | Roster | 🧑‍🤝‍🧑 | Laszlo Bock, *Work Rules!* (2015) | Hiring bar, structured interviewing, calibration, pay logic, decisions from people data |
| 2 | `legal-ops` | Codex | ⚗️ | Legal operations discipline (CLOC core competencies) — a community framework, not an authored work | Contract lifecycle, obligation registers, escalation rules, counsel management, legal spend |
| 2 | `process-lead` | Sluice | 🪜 | Michael Hammer & James Champy, *Reengineering the Corporation* (1993) | End-to-end process, handoff elimination, control inventory, automation gating |

### Attribution, with the caveats that travel with each source

Attribution is a squad rule: each agent declares the work its method rests on, and where the role rests
on a discipline rather than a single work, that is said. **Wrong attribution is worse than none.** The
caveats below are stated on the artefacts, not glossed:

- **Berman & Knight** — a *management-literacy* framework. It teaches managers to read and question
  financial information; it qualifies nobody to prepare, certify or opine on it.
- **Bock** — reports practices developed inside one very large, unusually selective and unusually
  well-funded organisation; several do not transfer intact to a small one, and the squad names which
  parts of a design depend on scale, selectivity or evidence volume. Published selection-method
  findings are reproduced as **direction only** — structured methods substantially outperform
  unstructured interviews — and **no validity coefficient is reproduced from memory**.
- **CLOC** — the Corporate Legal Operations Consortium publishes a core competency model. It is a
  professional association's framework rather than an authored work, it has been revised since first
  publication, and anyone citing it externally should read the current version from CLOC's own
  materials.
- **Hammer & Champy** — reengineering carries its own record. The authors were explicit that a large
  share of efforts failed to deliver what they intended, and during the 1990s the label was widely
  used as cover for headcount reduction, which damaged both the method and the willingness of the
  people asked to participate in it. Radical redesign is therefore treated as an expensive instrument
  with a poor average outcome: mapping comes first, and the radical-versus-incremental decision
  defaults to incremental.

---

## Tasks

| Task | Command | Owner | Produces |
|---|---|---|---|
| `triage-administrative-request.md` | `*diagnose` | `admin-chief` | Regulated-referral gate verdict, restatement, one named owner, handoff brief, written referrals |
| `build-profit-to-cash-bridge.md` | `*profit-vs-cash` | `finance-lead` | Sourced bridge from reported result to cash movement, visible residual, dominant driver classified structural or timing |
| `define-hiring-standard.md` | `*hiring-standard` | `people-lead` | Four or five anchored attributes, separate disqualifiers, interviewer assignment, transfer caveats, counsel-review list |
| `extract-obligation-register.md` | `*obligation-map` | `legal-ops` | Obligation register with clause references, owners, lead times and action dates; AMBIGUOUS list routed to counsel |
| `map-process-end-to-end.md` | `*map-process` | `process-lead` | End-to-end map with every figure marked OBSERVED / RECORDED / ESTIMATED, elapsed-to-working ratio, handoffs, control inventory seed |

Every task writes a versioned markdown file under `docs/` with a date, a named owner, and the
licensed-review list at the top of the artefact.

---

## Workflows

Workflows chain tasks into an executable sequence — this architecture is task-first, and the workflow
is what connects tasks in order. Both workflows below end at a consolidation phase that re-runs the
regulated gate over everything produced and will not close while a regulated item is unrouted.

### `wf-cash-gap-review` — "we are profitable but there is no money"

```
admin-chief          finance-lead              legal-ops / process-lead        admin-chief
*diagnose      →     *profit-vs-cash     →     (parallel)                →     close
triage_record        profit_to_cash_bridge     obligation_register             licensed_review_routing
                                               order_to_cash_map
```

| Phase | Agent | Task | Creates |
|---|---|---|---|
| 0 | `admin-chief` | `triage-administrative-request.md` | `triage_record` |
| 1 | `finance-lead` | `build-profit-to-cash-bridge.md` | `profit_to_cash_bridge` |
| 2 (parallel) | `legal-ops` | `extract-obligation-register.md` | `obligation_register` |
| 3 (parallel) | `process-lead` | `map-process-end-to-end.md` | `order_to_cash_map` |
| 4 | `admin-chief` | `triage-administrative-request.md` | `licensed_review_routing` |

### `wf-hiring-standard-design` — "we need to hire for this role"

```
admin-chief      finance-lead            process-lead        people-lead       legal-ops                       admin-chief
*diagnose   →    *profit-vs-cash    →    *map-process   →    *hiring-standard →  *obligation-map          →    close
triage_record    cash_envelope_reading   hiring_loop_map     hiring_standard     employment_instrument_register  licensed_review_routing
```

| Phase | Agent | Task | Creates |
|---|---|---|---|
| 0 | `admin-chief` | `triage-administrative-request.md` | `triage_record` |
| 1 | `finance-lead` | `build-profit-to-cash-bridge.md` | `cash_envelope_reading` |
| 2 | `process-lead` | `map-process-end-to-end.md` | `hiring_loop_map` |
| 3 | `people-lead` | `define-hiring-standard.md` | `hiring_standard` |
| 4 | `legal-ops` | `extract-obligation-register.md` | `employment_instrument_register` |
| 5 | `admin-chief` | `triage-administrative-request.md` | `licensed_review_routing` |

Every phase in both workflows carries a `checkpoint` with a `gate` and a `veto`. The veto is where the
professional limit is enforced: a phase cannot clear while a regulated question is unanswered by the
professional who owns it, and `wf-hiring-standard-design` marks the hiring standard **NOT FOR USE**
until qualified HR and employment counsel return their review.

---

## How to use it

**`admin-chief` (Steward) is the front door.** Requests go there first because the regulated gate runs
before anything is produced, and because the discipline that owns a request is usually not the one it
names.

```
@business-admin:admin-chief
```

Or through the AEXOS activation:

```
/AEXOS:agents:admin-chief
```

Then:

| You want | Command |
|---|---|
| The request routed | `*diagnose` |
| To know whether anyone here may answer it at all | `*regulated-check` |
| The order of work when several disciplines are involved | `*sequence` |
| Two contradictory artefacts arbitrated | `*coherence-check` then `*conflict-resolve` |
| The squad's combined view | `*admin-brief` |
| To know what the squad covers and what it may never touch | `*squad-map` |
| The work packaged for delivery | `*handoff-to-delivery` |

### Direct specialist access

```
@business-admin:finance-lead     # *profit-vs-cash, *cash-cycle, *number-quality, *runway, *roi-case
@business-admin:people-lead      # *hiring-standard, *structure-interview, *work-sample, *pay-design
@business-admin:legal-ops        # *obligation-map, *contract-lifecycle, *escalation-rules, *counsel-brief
@business-admin:process-lead     # *map-process, *find-handoffs, *value-test, *control-audit, *automation-check
```

Every specialist also carries `*professional-boundary {question}`, which answers one question only: is
this a framework question or a licensed one? When it is licensed, it names the professional and writes
the question in the form they can answer directly.

---

## Boundary

**Against the regulated professions** — the professional limit above. It is the squad's first gate and
its most serious one.

**Against the AEXOS core agents** — this squad decides and evidences within its domain. It does not
implement, does not test and does not publish. No workflow here produces an epic, a PRD, a story, an
implementation plan, a test or a release action.

| Belongs to | What |
|---|---|
| `@pm` | Epics, PRD, epic execution |
| `@po` | Story validation and backlog |
| `@sm` | Story creation (`*draft`) — exclusive authority |
| `@dev` | Implementation |
| `@qa` | Quality gate |
| `@devops` | Release, git push, PRs, MCP and CI/CD — **exclusive authority** |

**Between specialists** — `admin-chief` names exactly one owner per request and excludes the near
misses with a stated reason. Where several disciplines are genuinely required, they run in dependency
order rather than in parallel by broadcast: obligations before cost, cost before pay design, process
map before automation, contract terms before collection process.

---

## Directory structure

```
squads/business-admin/
├── squad.yaml                          # Manifest — components derived from disk
├── README.md                           # This file
├── CHANGELOG.md
├── agents/
│   ├── admin-chief.md                  # Tier 0: triage and routing (Steward)
│   ├── finance-lead.md                 # Tier 1: financial reading (Abacus)
│   ├── people-lead.md                  # Tier 1: people practice (Roster)
│   ├── legal-ops.md                    # Tier 2: legal operations (Codex)
│   └── process-lead.md                 # Tier 2: process design (Sluice)
├── tasks/                              # 5 executable tasks
├── workflows/                          # 2 multi-phase workflows
├── checklists/
├── templates/
└── data/
```

---

*Business Administration Squad v1.0.0 — AEXOS*
*Every regulated question leaves as a written question for a named professional.*
