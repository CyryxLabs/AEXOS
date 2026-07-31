# Squad Intake Checklist

**Checklist ID:** PRD-CL-012
**Squad:** products
**Referenced by:** `@products-chief` (Helm) — `*intake`, `*diagnose`
**Feeds:** `squads/products/templates/triage-record-tmpl.yaml`
**Purpose:** Completeness gate for a new product initiative entering the Products Squad. Confirms
that enough is known to route the work to exactly one owner in a defensible order — and refuses to
route when it is not.

[[LLM: INITIALIZATION INSTRUCTIONS — INTAKE GATE

This gate runs BEFORE any specialist is engaged. Its output is a routing decision or a refusal to
route, never product content.

EXECUTION APPROACH:
1. Work sections 1-7 in order. Sections 1-3 are capture and must be complete before section 5
   (routing) is attempted — naming an owner before the decision is defined produces a confident
   answer from the wrong discipline.
2. Mark [x] present and adequate, [ ] missing or inadequate, [N/A] genuinely not applicable with
   a stated reason. An unreasoned [N/A] counts as missing.
3. Apply the verdict rules at the end. The CANNOT BE ROUTED branch is a legitimate and frequent
   outcome — treat it as a result, not a failure.
4. Never fill a gap in this checklist with a plausible answer. A guessed decision routes real
   specialist cycles at an invented target.

DO NOT produce strategy, positioning, pricing, job, discovery or experiment content here. This gate
decides who works on it, not what the answer is.]]

---

## 1. What is being asked

- [ ] The request exists **verbatim** — the requester's own words, not a summary (CRITICAL)
- [ ] The channel and context of the request are recorded
- [ ] Hedges, vague terms and loaded words in the original are preserved, not cleaned up
- [ ] The request has been restated in the vocabulary of the discipline that appears to own it
- [ ] The restatement was **shown to the requester** and they saw it before routing
- [ ] The reframing table was checked, and the result recorded — including "no reframe needed"
- [ ] Where a reframe applies, it was stated **out loud** and confirmation was recorded
      (a silent reframe answers a question the requester did not ask)

> **Why verbatim matters:** the original wording carries the assumption the reframe is about to
> test. "What should we charge for this?" and "how do we price against Competitor X?" route
> differently, and the summary of both is the same sentence.

---

## 2. Who it is for

- [ ] A target population is named, specific enough to exclude somebody
- [ ] It is recorded whether that population is **asserted** or **evidenced**, and by what
- [ ] The buyer and the user are distinguished, or explicitly noted as the same person
- [ ] Where several populations are in play, it is recorded whether the requester believes them
      to be one segment or several

> **Bad answer:** "our users". A population that excludes nobody is a market, not a segment, and it
> will produce a positioning with no frame of reference and a price with nothing to anchor to.
> If the requester cannot do better, that is not a blocker for intake — it is the finding, and it
> routes to `@products:product-strategist` as the first question.

---

## 3. The decision it must unblock

- [ ] A specific decision is named — something that will be decided differently depending on the
      answer (CRITICAL)
- [ ] The decision-maker is named
- [ ] The reversibility is recorded: cheap and reversible, or others will build on it
- [ ] The deadline is recorded, or "none stated"
- [ ] The consequence of the **wrong discipline** answering is stated

> **This is the gate's load-bearing item.** With no decision behind it, every specialist is a
> defensible choice, which means none of them is. See the CANNOT BE ROUTED branch below.

---

## 4. What evidence already exists

- [ ] Existing evidence is listed with source, date, population and how it was gathered
- [ ] Each item is classified: MEASURED / EVIDENCED / INFERRED / ASSUMED
- [ ] Evidence that is named but stale is flagged as stale rather than silently accepted
- [ ] Claims with no named source are recorded as **assumptions**, not as evidence
- [ ] It is recorded which of the requester's premises are assumptions they have not noticed

> **Bad answer:** "we've talked to a lot of customers." Not named, not dated, not retrievable, no
> population. It is an assumption with a confident tone. Record it as such — this is an artifact
> property, not a judgement about anyone.

---

## 5. Artifacts that already exist for this initiative

- [ ] Every existing squad artifact for the initiative is listed with path, owner and date
- [ ] Each is mapped to a chain link: segment / job / outcome / solution / narrative / price /
      measure
- [ ] The strategy artifact currently in force is identified
- [ ] Where **two or more** artifacts exist, a coherence check (PRD-CL-011) is scheduled **before**
      routing the new request (CRITICAL)
- [ ] Artifacts that look obsolete are listed anyway — deciding they are obsolete is a finding,
      not a filter
- [ ] Contradictions already visible between existing artifacts are noted for `*conflict-resolve`

> **Why before routing:** a break upstream invalidates every link downstream of it. Routing new
> work onto a broken chain produces an artifact that has to be rewritten as soon as the break is
> repaired.

---

## 6. Which specialists are needed, and in what order

- [ ] Exactly **one** owner is named for the request (CRITICAL)
- [ ] The near-miss disciplines are listed with the reason each was excluded, citing the relevant
      NOT-list entry
- [ ] Where several specialists are genuinely required, they are ordered by **dependency**:
      `segment -> job -> outcome -> solution -> narrative -> price -> measure`
- [ ] For every step, the input it needs is named
- [ ] For every step, what would be wasted if it ran earlier is named
- [ ] Parallel-safe steps are identified as such, with the reason they do not depend on each other
- [ ] The request is **not** being broadcast to several specialists at once

> **Bad answer:** a sequence of four specialists for a question one could answer. Four competent
> partial answers built on four unstated assumptions is not corroboration; it is three wasted
> cycles and no decision.

---

## 7. Boundary verdict

- [ ] The verdict is explicit: **SQUAD** or **OUTSIDE — @{named core agent}**. Not hedged
- [ ] Where OUTSIDE, the core agent is named and no squad specialist is additionally assigned
- [ ] Nothing in the routing crosses into epic framing, PRD authoring, story drafting, story
      validation, backlog reprioritization, implementation, quality gates, or release (CRITICAL)
- [ ] Agent Authority is confirmed intact

| The request is about | Verdict |
|---|---|
| Which problem, for whom, why now, with what evidence | SQUAD — product-strategist |
| How customers behave and why | SQUAD — discovery-lead or jobs-analyst |
| How the market perceives it, what it costs | SQUAD — positioning-lead or pricing-strategist |
| How we measure the change | SQUAD — experimentation-lead |
| Epic framing, PRD, requirements | OUTSIDE — `@pm` |
| Story drafting | OUTSIDE — `@sm` |
| Story validation, backlog priority | OUTSIDE — `@po` |
| Implementation | OUTSIDE — `@dev` |
| Quality gates, review | OUTSIDE — `@qa` |
| Deep market or competitor research beyond a squad cycle | OUTSIDE — `@analyst` |
| Interface design, flows, prototypes beyond assumption-test fidelity | OUTSIDE — `@ux-design-expert` |
| System design, technology selection, feasibility spike | OUTSIDE — `@architect` |
| Schema, queries, instrumentation implementation | OUTSIDE — `@data-engineer` |
| Git push, PRs, MCP, CI/CD | OUTSIDE — `@devops`, exclusive, no exceptions |

> **No intake decision overrides Agent Authority.** This squad decides WHAT to build and stops at
> the evidenced problem.

---

## 8. Handoff readiness

- [ ] A short usable answer was given to the requester, labelled as the **non-defensible** version
- [ ] What the specialist adds that the short answer lacks is stated
- [ ] The handoff brief names what the specialist must **not** re-elicit
- [ ] Every artifact the specialist should read first is listed with why it matters
- [ ] Open questions for the specialist are listed
- [ ] Any ethical concern raised during intake is surfaced **here**, before routing proceeds — not
      appended to a later document
- [ ] The intake record will be written to the repository (a decision that lives only in a
      transcript did not happen)

---

## Scoring and Verdict

**Count** the CRITICAL items separately from the rest. There are five CRITICAL items:

| # | Item | Section |
|---|---|---|
| C1 | The request exists verbatim | 1 |
| C2 | A specific decision is named | 3 |
| C3 | Coherence check scheduled when 2+ artifacts exist | 5 |
| C4 | Exactly one owner is named | 6 |
| C5 | Nothing crosses into epic, story, backlog, implementation or release | 7 |

**Score** = checked non-critical items / (total non-critical items − justified N/A) × 100

| Verdict | Condition | Action |
|---|---|---|
| **ROUTE** | All 5 CRITICAL items pass and score ≥ 80% | Write the triage record and activate the named owner |
| **ROUTE WITH GAPS** | All 5 CRITICAL items pass and score 60–79% | Route, but list the gaps in the handoff brief so the specialist knows what they will have to establish themselves |
| **HOLD** | All 5 CRITICAL items pass and score < 60% | Do not route yet. Run `*intake` elicitation on the failing sections first — routing now sends a specialist to re-elicit basics |
| **CANNOT BE ROUTED** | Any CRITICAL item fails | See the branch below |

A high score with a failing CRITICAL item is still CANNOT BE ROUTED. The score measures how much
context the specialist will receive; the CRITICAL items measure whether there is a specialist to
send it to at all.

---

## CANNOT BE ROUTED

### Branch A — the decision is undefined (C2 fails)

This is the most common refusal, and the most useful one.

With no decision behind the request, every specialist is a defensible choice — a pricing question,
a positioning question and a strategy question all look reasonable — which means the routing is a
coin toss dressed as a judgement. Routing anyway spends a specialist cycle producing a defensible
answer to a question nobody needed answered.

**Do:**

1. Record `decision_at_stake: undefined` in the intake record and write it to the repository. The
   refusal is itself an artifact.
2. Return exactly one question to the requester: *"what will you do differently depending on the
   answer?"*
3. Offer the three shapes the answer usually takes, to make the question easier:
   - a **go/no-go** on a specific piece of work,
   - a **choice between two named options**,
   - a **commitment** — a price, a target, a public statement.
4. If the requester's honest answer is "nothing yet, I'm exploring", say so plainly and route to
   `*squad-map` instead. Exploration is a legitimate use of the squad; it is just not a routing
   event, and it should not consume a specialist cycle.
5. Do **not** guess the decision to unblock the intake. A guessed decision routes real work at an
   invented target, and the resulting artifact will look authoritative.

### Branch B — the request exists only as a paraphrase (C1 fails)

Ask for the original wording before continuing. The reframe is only meaningful against what was
actually said; reframing a paraphrase reframes twice and the second reframe is invisible.

### Branch C — two or more artifacts exist and none has been checked (C3 fails)

Do not route the new request. Run `*coherence-check` (PRD-CL-011) first. If the chain is broken,
the repair order is routed before the request is — new work built on a broken upstream link is a
rewrite already scheduled.

### Branch D — more than one owner was named (C4 fails)

Return to section 6 and check the near misses' NOT-lists. If two disciplines genuinely both own
part of it, that is a **sequence**, not two owners: order them by dependency and name the first
one as the owner. If they own contradictory parts, run `*conflict-resolve` before routing.

### Branch E — the request crosses into delivery (C5 fails)

Name the core agent and stop routing inside the squad. Epic framing and PRD authoring are `@pm`;
story drafting is `@sm`; story validation and backlog are `@po`; implementation is `@dev`; quality
gates are `@qa`; git push, PRs, MCP and CI/CD are `@devops`, exclusively. Write the handoff brief
for that agent and record the boundary verdict.

---

## Method attribution

`@products-chief` (Helm) carries no external product methodology. This intake gate is an original
AEXOS orchestration routine and is not attributed to any author.

The published methods live in the specialists this gate routes to and are attributed in their own
agent files: Marty Cagan (product-strategist), Teresa Torres (discovery-lead), April Dunford
(positioning-lead), Clayton M. Christensen with Taddy Hall, Karen Dillon and David S. Duncan
(jobs-analyst), Madhavan Ramanujam and Georg Tacke (pricing-strategist), and Ron Kohavi, Diane
Tang and Ya Xu (experimentation-lead).

## Related

- Task: `squads/products/tasks/triage-product-request.md`
- Task: `squads/products/tasks/coherence-review.md`
- Task: `squads/products/tasks/resolve-specialist-conflict.md`
- Template: `squads/products/templates/triage-record-tmpl.yaml`
- Checklist: `squads/products/checklists/coherence-checklist.md` (PRD-CL-011)
- Routing data: `squads/products/data/product-squad-routing.yaml`
- Agent: `squads/products/agents/products-chief.md`
- Squad manifest: `squads/products/squad.yaml`
