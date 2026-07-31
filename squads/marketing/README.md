# Marketing Squad

> Brand building, demand generation, content and measurement — from long-horizon reach to short-horizon conversion.

**Version:** 1.0.0 | **Created:** 2026-07-30 | **Entry agent:** `marketing-chief` (Beacon)

**Philosophy:** *"Reach before persuasion."* Every agent is anchored in published evidence, not in market opinion.

---

## What this squad does

The squad decides and evidences four things, and nothing else:

1. **What must be built in buyer memory and access** so the brand is retrieved in the situations people actually buy in, and is easy to buy once retrieved.
2. **How much that costs, split how, phased how**, and over which window each effect can fairly be judged.
3. **Which editorial territories the brand can hold** continuously and credibly — and which it deliberately declines.
4. **How any of it is measured**, and, just as importantly, what the measurement cannot support.

It stops at the evidenced marketing plan. It does not frame epics, draft stories, implement, test, or publish.

### The coherence chain

Everything the squad produces sits on one chain, and the order is a dependency rather than a preference:

```
position → brand model → demand plan → content → measurement
   ▲            ▲             ▲            ▲           ▲
  @products  brand-lead   demand-lead  content-lead  analytics-lead
 :positioning
   -lead
 (INPUT, not
  an output)
```

A break anywhere invalidates everything downstream of it, not just the adjacent link. Repair upstream first.

---

## Agents

| Tier | Agent | Persona | Icon | Based on (attribution) | Focus |
|------|-------|---------|------|------------------------|-------|
| 0 | `marketing-chief` | Beacon | 🔆 | Original (Orchestrator) — no external methodology is claimed for this role | Triage, routing, brand/demand balance, coherence auditing, arbitration |
| 1 | `brand-lead` | Salience | 🪧 | Byron Sharp, *How Brands Grow* (2010) | Mental and physical availability, penetration over loyalty, distinctive assets |
| 1 | `demand-lead` | Cadence | 📶 | Les Binet & Peter Field, *The Long and the Short of It* (IPA, 2013) | Brand/activation balance, long-term effect versus immediate response |
| 2 | `content-lead` | Quill | 🖋️ | Editorial discipline applied to marketing — a practice, not a single published work | Beats, format, distribution; content as an asset rather than a campaign |
| 2 | `analytics-lead` | Cipher | 📈 | Avinash Kaushik, *Web Analytics 2.0* (2009) | Actionable metrics, attribution, and what measurement cannot prove |

### On the attribution column

Three specialists rest on named published works. `content-lead` rests on a craft discipline and says so, because no canonical work founds that role. That is deliberate: an invented citation would be worse than none, and it would make the whole squad's attribution unauditable.

The caveats each specialist carries are part of the attribution, not decoration around it:

- **`brand-lead`** applies the framework with attribution. An empirical generalisation is a pattern observed across categories, not a guarantee for this brand. Later Ehrenberg-Bass work is named separately — *How Brands Grow Part 2* (Romaniuk & Sharp, 2016) for category entry points, *Building Distinctive Brand Assets* (Romaniuk, 2018) for the asset grid.
- **`demand-lead`** deliberately states **no ratio, no split percentage and no excess-share-of-voice coefficient from memory.** The figures reported in that literature are category averages across a case databank with wide dispersion, not constants. Any figure carried into an output is marked UNVERIFIED until checked against the publication it is attributed to, and an UNVERIFIED figure does not justify a budget decision on its own. Later work — *Media in Focus* (IPA, 2017) and the B2B work with the LinkedIn B2B Institute (2019) — is named separately where used.
- **`analytics-lead`** separates the 2009 book from later work by the same author: the Digital Marketing and Measurement Model and See-Think-Do-Care were published on his Occam's Razor blog, not in *Web Analytics 2.0*, and are attributed as blog work. Geo holdouts, randomised holdout groups and marketing mix modelling are established measurement disciplines with a broad literature — not Kaushik's frameworks — and his name is not borrowed for them.
- **`content-lead`** will not manufacture a founding author, book title, year or quotation to give the role borrowed authority.

An unverifiable citation anywhere in the squad **blocks the artifact**. Attribution defects are critical, not stylistic.

---

## Tasks

Five executable tasks, one per agent. Each conforms to TASK-FORMAT-SPECIFICATION-V1 and is self-contained.

| Task | Agent | Command | What it produces |
|------|-------|---------|------------------|
| `tasks/marketing-chief-diagnose.md` | `marketing-chief` | `*diagnose` | Verbatim record, restatement, one named owner, boundary verdict, dependency verdict, handoff brief |
| `tasks/brand-lead-brand-audit.md` | `brand-lead` | `*brand-audit` | Category denominator, six readings marked SOURCED or UNVERIFIED, one binding constraint (RETRIEVAL, ACCESS or REACH) |
| `tasks/demand-lead-split-decision.md` | `demand-lead` | `*split-decision` | Actual split line by line, recommended split as a range, evidence class, revisit trigger, UNVERIFIED list |
| `tasks/content-lead-beat-plan.md` | `content-lead` | `*beat-plan` | Beats with their claim and the CEPs they serve, declined beats with reasons, capacity assumption, commitment horizon |
| `tasks/analytics-lead-measurement-model.md` | `analytics-lead` | `*measurement-model` | Model table, critical-few metrics with targets set in advance, feasibility marks, measurement gaps, proxy escalations |

Each agent carries a wider command set than the task materialised here — for example `*cep-map`, `*asset-audit` and `*rebrand-risk` on `brand-lead`; `*shorttermism-check`, `*cut-impact` and `*effect-window` on `demand-lead`; `*content-audit`, `*brief` and `*archive-review` on `content-lead`; `*attribution-review`, `*incrementality-design` and `*kill-metrics` on `analytics-lead`. Run `*help` on any agent for the full list.

---

## Workflows

Two multi-phase workflows chain the tasks into executable sequences. Execution entries live under `workflow.sequence`, each keeping the AEXOS phase shape (`id`, `name`, `agent`, `task`, `depends_on`, `parallel`, `outputs`, `checkpoint{gate, veto}`).

### `workflows/wf-marketing-plan.yaml` — build

**Trigger:** `*intake` · **Entry:** `marketing-chief` · **Estimated:** 4-8 working sessions

Walks the full coherence chain to produce an evidenced plan from scratch.

| Phase | Agent | Task | Creates | Requires |
|-------|-------|------|---------|----------|
| `phase_0` Triage and Intake | `marketing-chief` | `marketing-chief-diagnose.md` | `triage-record` | — |
| `phase_1` Brand Growth Diagnosis | `brand-lead` | `brand-lead-brand-audit.md` | `brand-specification` | `triage-record` |
| `phase_2` Brand and Activation Split | `demand-lead` | `demand-lead-split-decision.md` | `split-decision` | `brand-specification` |
| `phase_3` Editorial Beats | `content-lead` | `content-lead-beat-plan.md` | `beat-plan` | `brand-specification` |
| `phase_4` Measurement Model | `analytics-lead` | `analytics-lead-measurement-model.md` | `measurement-model` | `split-decision` |

`phase_2` and `phase_3` are marked `parallel: true` — both depend only on `phase_1`. The beat plan does not need the split as an input, only the phasing as an optional continuity constraint.

**Hard veto at `phase_0`:** if no position artifact exists at `@products:positioning-lead`, the plan does not proceed. The content audit, archive review and instrumentation gap analysis may proceed meanwhile; beats, entry points, the reach specification, the split and any measurement model may not.

### `workflows/wf-demand-diagnostic.yaml` — diagnose

**Trigger:** `*balance-check` · **Entry:** `marketing-chief` · **Estimated:** 2-4 working sessions

Reactive diagnostic for an operation showing the efficiency-trap signature: acquisition cost rising while demand stays flat, spend drifting toward whatever is most directly attributable, long effects judged on short clocks.

| Phase | Agent | Task | Creates | Requires |
|-------|-------|------|---------|----------|
| `phase_0` Triage the Symptom | `marketing-chief` | `marketing-chief-diagnose.md` | `symptom-triage` | — |
| `phase_1` Binding Constraint Check | `brand-lead` | `brand-lead-brand-audit.md` | `binding-constraint` | `symptom-triage` |
| `phase_2` Split and Short-Termism Review | `demand-lead` | `demand-lead-split-decision.md` | `split-diagnosis` | `binding-constraint` |
| `phase_3` Provability Verdict | `analytics-lead` | `analytics-lead-measurement-model.md` | `provability-verdict` | `split-diagnosis` |

Content is deliberately out of scope: a beat plan is a build decision, not a diagnostic, and adding it would produce editorial work before the diagnosis it should serve exists.

---

## How to run it

`@marketing-chief` (Beacon) is the door. Route through it unless the owning discipline is already obvious.

```
@marketing:marketing-chief          # entry point — triage and routing
```

Then, or directly when you already know the owner:

```
@marketing:brand-lead               # penetration, mental and physical availability, CEPs, assets, rebrand risk
@marketing:demand-lead              # budget, split, share of voice, effect windows, short-termism, cut impact
@marketing:content-lead             # beats, briefs, calendar, format, distribution, archive
@marketing:analytics-lead           # measurement model, metrics, segmentation, attribution, incrementality
```

Useful chief commands:

| Command | Use when |
|---------|----------|
| `*diagnose {request}` | You do not know which discipline owns the question |
| `*intake` | A new initiative is starting and you want the dependencies mapped before work begins |
| `*sequence {situation}` | Several specialists are genuinely needed and you want them in dependency order |
| `*balance-check` | You suspect the squad is drifting short |
| `*coherence-check` | Existing artifacts may have stopped describing the same market |
| `*conflict-resolve {a} {b}` | Brand and demand recommendations contradict each other |
| `*proxy-escalation {proxy}` | A measurable proxy has quietly replaced a real objective |
| `*attribution-check` | Verifying that every method claim names a checkable source |
| `*squad-map` | You want the routing table, the NOT-lists and the activation syntax |

**Do not broadcast a request to all four specialists.** You get four competent partial answers, each quietly assuming a different audience and a different horizon, and no decision. If the question genuinely spans disciplines, the fix is `*sequence`, not breadth.

---

## Boundary

### What the squad consumes but never authors

| Owner | Owns |
|-------|------|
| `@products:positioning-lead` | Market category, competitive alternatives, unique attributes, target segment. **Marketing consumes positioning; it does not define it.** A marketing plan that quietly invents its own position produces work that contradicts the product. |
| `@products:pricing-strategist` | Price, packaging, willingness to pay. |
| `@products:experimentation-lead` | Statistical design for product-surface experiments — coordinate, do not duplicate. |

### Where the squad stops

| Owner | Takes over |
|-------|-----------|
| `@pm` | Epic framing and PRD, once the evidenced plan is complete |
| `@sm` | Story creation — exclusive authority |
| `@po` | Story validation and backlog prioritisation |
| `@dev` | Implementation |
| `@qa` | Quality gates |
| `@devops` | Release, `git push`, PRs, MCP and CI/CD — **exclusive authority, no exceptions** |
| `@data-engineer` | Schema, pipelines, queries and migrations behind any instrumentation specification |
| `@ux-design-expert` | Interface copy, microcopy and UX writing |
| `@analyst` | Deep market and competitor research |

**No workflow in this squad implements, tests or publishes anything.** Availability fixes that require code go through `@pm` → `@sm` → `@dev`, never direct.

---

## Structure

```
squads/marketing/
├── squad.yaml                                  # Manifest: tiers, agent registry, handoffs, boundaries
├── README.md                                   # This file
├── CHANGELOG.md
├── agents/
│   ├── marketing-chief.md                      # Tier 0 — Beacon 🔆
│   ├── brand-lead.md                           # Tier 1 — Salience 🪧
│   ├── demand-lead.md                          # Tier 1 — Cadence 📶
│   ├── content-lead.md                         # Tier 2 — Quill 🖋️
│   └── analytics-lead.md                       # Tier 2 — Cipher 📈
├── tasks/
│   ├── marketing-chief-diagnose.md
│   ├── brand-lead-brand-audit.md
│   ├── demand-lead-split-decision.md
│   ├── content-lead-beat-plan.md
│   └── analytics-lead-measurement-model.md
├── workflows/
│   ├── wf-marketing-plan.yaml                  # Build — full coherence chain
│   └── wf-demand-diagnostic.yaml               # Diagnose — efficiency trap and short-termism
├── checklists/                                 # (empty)
├── templates/                                  # (empty)
└── data/                                       # (empty)
```

`components:` in `squad.yaml` is derived from disk by `scripts/normalize-squad-manifests.js` — never maintained by hand.

---

## Constitutional notes

- **Article I — CLI First.** Squad artifacts are versioned markdown and YAML in the repository. A marketing decision that exists only in a chat transcript did not happen.
- **Article IV — No Invention.** Every statement in a consolidated brief traces to a specialist artifact, which traces to a named source or to this business's own data. Confidence must not increase during consolidation: every UNVERIFIED marking and every NOT MEASURED verdict survives into the brief.
- **Agent Authority.** No squad command overrides `@devops` on push, PRs, MCP and CI/CD, `@sm` on story creation, or `@po` on story validation and backlog.

---

*AEXOS Marketing Squad v1.0.0 — Cyryx Labs LLC*
*"Reach before persuasion."*
