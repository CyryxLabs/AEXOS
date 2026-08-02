# Customer Success Squad

> Adoption, realized value, retention and the customer's voice — from the first value delivered to the renewal.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `cs-chief` (Anchor ⚓)

> "Retention is the product working, not the team insisting."
> Churn is a symptom; the cause is value that was not delivered.

## What This Squad Does

This squad answers four questions and refuses the rest:

1. **What is first value, and can an account be shown to have reached it?** — a binary, observable, customer-side definition per segment, validated against accounts that were retained and accounts that churned early.
2. **Which accounts are at risk, and early enough to do something about it?** — a four-dimension health model whose signals carry a measured lead time and which is validated backwards against a completed renewal period.
3. **What does the loyalty instrument actually support?** — the sample before the score, the score as a range, and the verbatim themes treated as the finding.
4. **What are customers telling us, across every channel, weighted by how many are affected?** — requests restated as problems, deduplicated by account, with an auditable strength.

It produces evidence and decisions inside its domain. It writes no story, no epic, no PRD, no code, no test and no release.

## Squad Architecture

```
                        Anchor ⚓ (Orchestrator)
                            cs-chief [Tier 0]
                                  |
        ┌───────────────┬─────────┴────────┬───────────────┐
        |               |                  |               |
┌───────┴───────┐ ┌─────┴───────┐  ┌───────┴──────┐ ┌──────┴──────┐
| Threshold 🚪  | | Tenure 🔁   |  | Chorus 📣    | | Auricle 👂  |
| onboarding    | | retention   |  | advocacy     | | voice       |
| Tier 1        | | Tier 1      |  | Tier 2       | | Tier 2      |
└───────────────┘ └─────────────┘  └──────────────┘ └─────────────┘
```

## Agents

| Tier | Agent | Persona | Icon | Method attribution (`based_on`) | Focus |
|------|-------|---------|------|--------------------------------|-------|
| 0 | `cs-chief` | Anchor | ⚓ | Original (Orchestrator) — no external methodology is claimed | Triage, routing, lifecycle-stage attribution, coherence across squad artifacts, contradiction arbitration |
| 1 | `onboarding-lead` | Threshold | 🚪 | The practitioner discipline of time-to-first-value and activation in subscription products — a discipline, not a single canonical work | First value, activation milestones, the habit criterion, the friction that kills adoption |
| 1 | `retention-lead` | Tenure | 🔁 | Nick Mehta, Dan Steinman & Lincoln Murphy, *Customer Success* (Wiley, 2016) | Account health, churn signals, cause classification, intervention before the renewal |
| 2 | `advocacy-lead` | Chorus | 📣 | Fred Reichheld, *The Ultimate Question* / the Net Promoter System (2006) | Promoters and detractors, the closed feedback loop, references, and the limits of the instrument |
| 2 | `voice-lead` | Auricle | 👂 | Voice of the Customer: structured collection and signal routing — a discipline, not a single canonical work | Capture, restatement, theme weighting, and the route from customer signal to a single owner |

Full definitions live in `agents/`. Tiers, handoffs and the routing matrix are declared in `squad.yaml`, which is the file the routing layer reads.

## Tasks

Five executable tasks, in TASK-FORMAT-SPECIFICATION-V1 (`tasks/`):

| Task file | Command | Agent | Produces |
|-----------|---------|-------|----------|
| `cs-chief-diagnose.md` | `*diagnose` | `cs-chief` | Triage record, one named owner, a labelled provisional answer, a handoff brief |
| `onboarding-lead-define-first-value.md` | `*define-first-value` | `onboarding-lead` | First-value definitions per segment, instrumentation status, separation-test counts |
| `retention-lead-health-model.md` | `*health-model` | `retention-lead` | Health model with measured lead times, backward validation, states with owners and triggers |
| `advocacy-lead-score-read.md` | `*score-read` | `advocacy-lead` | Composition before the score, score as a range, verbatim themes, conclusion limits |
| `voice-lead-aggregate-signal.md` | `*aggregate-signal` | `voice-lead` | Theme table with distinct-account counts, channel mix, exposure and auditable strength |

Each agent declares more commands than there are task files. A command without a task file runs conversationally under the agent's own procedure; only the five above are executable task contracts.

## Workflows

Two multi-phase chains (`workflows/`). Both enter through `cs-chief` and both use `workflow.sequence` — the canonical execution array the framework's workflow validator reads.

### `wf-first-value-to-health.yaml` — First Value to Validated Health Model

```
cs-chief *diagnose → onboarding-lead *define-first-value → retention-lead *health-model → cs-chief *coherence-check
   triage_record   →     first_value_definitions        →        health_model         →  squad_handoff_register
```

The only order that holds. The health model imports the activation inputs rather than restating them; a model built before first value is defined is a model built on convenience metrics. Vetoes: no completed renewal period means no backward validation and no published model; a definition reachable without the outcome occurring is not first value.

### `wf-loyalty-to-routed-signal.yaml` — Loyalty Wave to Routed Customer Signal

```
cs-chief *diagnose → advocacy-lead *score-read → voice-lead *aggregate-signal → [account risk] retention-lead *health-model → cs-chief *handoff-to-product
   triage_record   →    loyalty_wave_read      →        theme_table          →        health_model_revision              →   product_handoff_register
```

The wave is read sample-first; its themes join every other channel; the account-risk themes are qualified as health signals exactly like any other candidate — measured lead time, hit rate against the base rate, backward validation — and each theme leaves with exactly one owner and no attached priority. Phase 4 verifies the loop was closed, including where the answer to the customer was no.

The health-model phase of this workflow is gated on the first-value definitions produced by `wf-first-value-to-health`. If they do not exist, that workflow runs first.

## How to Invoke

`@cs-chief` is the front door. Use it whenever the owning discipline is not obvious, when a request mixes disciplines, or when two specialists have produced contradictory readings of the same account.

```
@customer-success:cs-chief          # or /AEXOS:agents:cs-chief
*diagnose {your request in your own words}
```

Anchor restates the request in lifecycle terms, dates the symptom, names the population, attributes the stage where the problem originated — rarely the stage where it surfaced — names exactly one owner, and routes with a written brief.

Direct specialist access, when the owner is already known:

```
@customer-success:onboarding-lead   *define-first-value
@customer-success:retention-lead    *health-model
@customer-success:advocacy-lead     *score-read
@customer-success:voice-lead        *aggregate-signal
```

Workflows are triggered through the entry agent:

```
@customer-success:cs-chief *first-value-to-health
@customer-success:cs-chief *loyalty-to-routed-signal
```

## Customer Data Rules

Binding on every agent, every task and every workflow phase in this squad. These are not guidance.

- **Account or cohort level by default.** Individual identity is almost never required by the questions this squad answers. Health is a property of an account; no health artifact characterizes a named individual.
- **No personal data beyond what the decision requires.** Not what might be useful later — what this decision requires.
- **Reference records; do not reproduce them.** Contact records, support transcripts, contract terms, interview notes and identified survey verbatims stay in the authorized system of record. Artifacts carry the finding and the record id. Themes travel; verbatims and identifiers stay where they were collected.
- **Never re-identify anonymous feedback**, and never instruct another agent to. The confidentiality promise made at collection binds everything downstream, including follow-up and analysis.
- **Special-category personal data is out of scope.** If health, financial, credential or other special-category personal data is required to proceed, stop and escalate to the human owner.

No credentials or access secrets are ever handled. Where access is a prerequisite, the squad names the prerequisite and the customer-side role that grants it, never the secret.

## Boundary

The squad owns adoption, realized value, retention and the customer's voice. Everything else is routed out without being absorbed.

| Not owned here | Owner |
|---|---|
| What job the customer hires the product to do; the causal account of a switch | `@products:jobs-analyst` |
| Continuous discovery, assumption testing, structured research programs | `@products:discovery-lead` |
| Renewal negotiation, discounting, contract terms, expansion offers, referral incentives | `sales` squad |
| Prioritization and roadmap position — routing a theme is not prioritizing it | `@products`, `@pm` |
| Screens, flows, copy, interaction and comprehension | `@ux-design-expert` |
| Telemetry implementation for every UNMEASURED or PROXIED input | `@data-engineer` |
| Case studies and campaigns | `marketing` squad |
| Epic framing and PRD | `@pm` |
| Story drafting (exclusive) | `@sm` |
| Story validation and backlog | `@po` |
| Implementation | `@dev` |
| Quality gates | `@qa` |
| Git push, PRs, CI/CD, MCP (exclusive) | `@devops` |

No workflow in this squad implements, tests or publishes anything. `@devops` holds exclusive push authority and no squad command overrides it.

Two refusals are absolute:

- **No price, discount or contract term** appears in any output. The squad supplies the sales squad with value evidence only.
- **Retention by obstruction is refused outright** — no cancellation friction, no data withholding, no auto-renewal exploitation, however the request is framed.

## Attribution

Each agent declares the work its method rests on in its `based_on` field, and repeats it in the Method Attribution section of every task it owns. Where a role rests on a practitioner discipline rather than a single published work, that is said plainly. A wrong attribution is worse than no attribution, and an invented citation is worse than either.

| Source | Applied by | Constructs used |
|---|---|---|
| Fred Reichheld, *The Ultimate Question: Driving Good Profits and True Growth* (Harvard Business School Press, 2006); "The One Number You Need to Grow" (*Harvard Business Review*, 2003); *The Ultimate Question 2.0* (2011, with Rob Markey) | `advocacy-lead` | The recommendation question on an eleven-point scale, the promoter / passive / detractor classification, the net score arithmetic, the good-profits versus bad-profits distinction, closed-loop follow-up |
| Nick Mehta, Dan Steinman & Lincoln Murphy, *Customer Success: How Innovative Companies Are Reducing Churn and Growing Recurring Revenue* (Wiley, 2016) | `retention-lead` | Continuous health management, touch-model segmentation, time-to-value reduction, the product as the scalable mechanism, company-wide ownership, drift as the default state |

### Attribution limits — carried in the agents and binding on every task and workflow phase

- The Wiley (2016) source organizes its guidance as a set of laws of customer success. **Do NOT reproduce the canonical wording, numbering or ordering of those laws from memory.** VERIFY against the book before publishing any quotation, law number or page reference.
- **VERIFY** the exact wording of the recommendation question against the edition being followed before publishing it — the canonical wording varies across sources and implementations.
- **VERIFY** current trademark attribution requirements before any external publication using the Net Promoter or NPS marks; they are registered trademarks associated with Bain & Company, Satmetrix Systems and Fred Reichheld.
- The strong claim that the recommendation measure predicts company growth better than alternative satisfaction and loyalty measures is **CONTESTED** in the peer-reviewed marketing literature, with published replications reporting weaker or inconsistent performance. The contested status is stated wherever the score supports a decision. The existence of the debate is stated without attributing it to a particular paper; **VERIFY** any specific critique citation before naming it in an artifact.
- Reichheld's later work with Darci Darnell and Maureen Burns, *Winning on Purpose* (Harvard Business Review Press, 2021), proposes an accounting-based measure of customer-earned growth. **VERIFY** that measure's exact name and definition against the source before citing it.
- Restatements in the squad's own words are paraphrase, not quotation, and are labelled as such.
- Retention metrics — gross and net revenue retention, logo churn, cohort retention curves — are standard industry measures and are attributed to no source.
- Lead-time validation of signals, backward validation against a completed period, the unserved / unhappy / unfit / drift split, sampling-error thresholds for reporting movements, loop latency as a first-class metric, and reference qualification gated on realized-value evidence are the agents' own operating conventions — consistent with the sources' premises, not presented as their content.

No agent in this squad personifies an author or practitioner. The methods are applied with attribution; the agents do not speak as their sources.

## Directory Structure

```text
squads/customer-success/
├── squad.yaml                                  # Manifest — tiers, handoffs, boundaries, attribution
├── README.md                                   # This file
├── CHANGELOG.md
├── agents/
│   ├── cs-chief.md                             # Tier 0: Anchor ⚓
│   ├── onboarding-lead.md                      # Tier 1: Threshold 🚪
│   ├── retention-lead.md                       # Tier 1: Tenure 🔁
│   ├── advocacy-lead.md                        # Tier 2: Chorus 📣
│   └── voice-lead.md                           # Tier 2: Auricle 👂
├── tasks/                                      # 5 executable task contracts
├── workflows/
│   ├── wf-first-value-to-health.yaml
│   └── wf-loyalty-to-routed-signal.yaml
├── checklists/                                 # empty — nothing invented to fill it
├── templates/                                  # empty — nothing invented to fill it
└── data/                                       # squad artifacts land here, dated and versioned
```

`components:` in `squad.yaml` is derived from disk by `scripts/normalize-squad-manifests.js`. Run it after adding or renaming any file here.

## AEXOS Integration

**CLI First.** Squad artifacts are versioned markdown and YAML in the repository. A retention decision that exists only in a chat transcript did not happen.

**Constitution Article IV — No Invention.** Every statement in a squad artifact traces to an instrumented fact, a dated customer record or a dated interview. Anything else is marked UNVERIFIED and does not enter the artifact.

Validate the squad after any change:

```bash
node scripts/normalize-squad-manifests.js
node -e "const {SquadValidator}=require('./.aexos-core/development/scripts/squad/squad-validator.js');new SquadValidator().validate('squads/customer-success').then(r=>console.log(r.valid, r.errors.length, r.warnings.length))"
```

---

*Customer Success Squad v1.0.0 — AEXOS*
*"Realized value is the unit of account."*
