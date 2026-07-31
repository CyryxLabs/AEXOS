# Product Operating Model — Method Reference

**Squad:** products
**Owner:** `@product-strategist` (Lodestar)
**Purpose:** Condensed, checkable reference for the published product method this agent applies.
Every entry states what the frame is, **when to use it**, and **when NOT to use it**, because most
misuse of this material is a correct frame applied to the wrong question.
**Status:** reference material. It is not a workflow. The executable versions are the task files
listed under each entry.

> **Attribution discipline.** Everything below is attributed to published work so the reasoning can
> be checked at the source. `@product-strategist` applies these methods. Where a numeric detail
> from a published work is not verified, the mechanism is described **without** the number and
> marked `[verify against source]`. A wrong attribution is worse than no attribution.

> **Constitution Article IV — No Invention.** An insight with no named source is deleted from a
> strategy, not defended. This reference exists to make sourcing cheap, not to substitute for it.

---

## 1. The Four Product Risks

**Source:** Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018).

Every product idea carries all four. The question is never whether a risk is present — it is how
much of it has already been retired, by what evidence, for which segment.

| Risk | Question | Owner | Typical evidence that retires it |
|---|---|---|---|
| **Value** | Will they buy it, or choose to use it? | Product manager | Customer interviews and stories, demand tests, prior behaviour data |
| **Usability** | Can they figure out how to use it? | Product designer | Prototype tests, unmoderated tasks, observed first-run behaviour |
| **Feasibility** | Can our engineers build it with the time, skills and technology we have? | Tech lead | Technical spike, feasibility prototype, architecture review |
| **Business viability** | Does this work for the other parts of the business — sales, marketing, finance, legal, privacy, security? | Product manager | Stakeholder reviews, model impact analysis, legal and security read |

**Ownership is fixed and is not reassigned for local convenience.** The product manager holds two of
the four; that is deliberate, not a duplication to be split for tidiness. Shared accountability with
unnamed owners means nobody addressed the risk.

**Sequencing rule.** Address the dominant risk first, with the **cheapest test capable of
disconfirming it**. A negative feasibility answer makes the value evidence irrelevant, so the spike
runs before the interview round, not after it. A test that can only return encouragement is a
demonstration, not a test.

**Verdict vocabulary** (use these four and nothing else): `retired` · `partially evidenced` ·
`unaddressed` · `unaddressed, likely dominant`.

**Dominance heuristic**

| Signal | Dominant risk is usually |
|---|---|
| The mechanism has never been built on the current architecture | Feasibility |
| The behaviour has never been observed anywhere, only requested | Value |
| There is a genuinely hard state to resolve — conflict, merge, permission | Usability |
| It touches pricing model, contractual terms, audit trail, data residency or regulated data | Business viability |

**Use when:** an initiative is proposed and someone wants to commit resources; a strategy has chosen
a problem and needs its risks named; a delivery-time surprise needs a post-mortem frame.

**Do NOT use when:** the initiative has no stated problem and no named segment — every verdict would
be an opinion about a preference; the question is *which* problem to solve (that is focus, entry 5);
the question is how to run a specific test (that is `@discovery-lead` or `@experimentation-lead`);
the risk is a project risk rather than a product risk (dependencies, vendor timelines, staffing) —
those are real, but they are not these four, and forcing them into this table dilutes it.

**Executable version:** `squads/products/tasks/assess-product-risks.md` ·
`squads/products/templates/risk-assessment-tmpl.yaml`

---

## 2. The Three Team Models

**Source:** Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020).

| | Delivery team | Feature team | Empowered product team |
|---|---|---|---|
| **Receives** | Specifications and estimates | Prioritized features with dates | Problems to solve, with outcomes |
| **Staffing** | Engineers, often no product manager or designer on the team | Cross-functional; product manager acts as project coordinator or requirements author | Product manager, product designer, engineers with a tech lead — all present for the evidence |
| **Measured on** | Output and predictability | Delivery against the roadmap | Outcomes |
| **Owns the solution** | No | No — chosen elsewhere | Yes |
| **Outcome ownership** | None | Nominal | Real, and accountable |

**Preconditions for empowerment — all four, not three:**

1. Competent people in each of the three roles
2. A real problem with a measurable outcome
3. Authority over the solution
4. Leaders who coach and remove obstacles rather than direct

Three out of four produces a team accountable for an outcome it has no levers to move, which is
worse than the feature team it replaced.

**Diagnose from observed behaviour, never from the org chart label.** The three questions that
decide it: what does the team *receive*, what does it *decide*, what is it *measured on*.

**The decisive test.** In the last two cycles, name one time discovery evidence caused the team NOT
to build something already planned. No instance means the discovery track has no authority over the
decision — dual-track ceremonies on a feature team are research that cannot change the outcome,
because the decision was made before the research started.

**A team without a strong product manager is a delivery team with a project coordinator.** Do not
diagnose a strategy problem when the actual problem is a competency gap.

**Use when:** a team is about to receive outcome objectives; an outcome was missed and the cause is
unclear; leadership asks why "we already do discovery" is not producing empowered-team results; a
transformation is being sequenced.

**Do NOT use when:** the intent is to grade or rank people — this diagnoses an operating model, not
competence, and using it as a performance instrument destroys the honesty the diagnosis depends on;
the unit of analysis is a department rather than one team (an average team model does not exist);
the team model is fine and the actual problem is an unsourced strategy.

**Executable version:** `squads/products/checklists/empowered-team-checklist.md`

---

## 3. Product Vision

**Source:** Marty Cagan, *INSPIRED*, 2nd ed. (2018); Cagan and Jones, *EMPOWERED* (2020).

- **Horizon:** three to ten years. Shorter is a plan; longer and nobody can picture it.
- **Purpose:** inspire, recruit, and give multiple teams a common reference so their independent
  decisions still compose. It is not a specification and it does not describe features.
- **Companion:** product principles — the stated commitments used to resolve tradeoffs without
  escalation.

**The three tests**

| Test | What a failure means |
|---|---|
| Does a strong engineer read it and want to work on it? | It does not recruit; it is a positioning line |
| Does it describe a future state, or only a superlative? | It is a slogan and resolves no tradeoff |
| Does it survive a strategy change, or is it this year's plan in disguise? | The horizon is too short; re-cut against a longer one |

**Product principles.** Elicit each from a *real past tradeoff*: "name a decision where we chose one
good thing over another good thing — what rule were we following?" Write each as a commitment with a
stated cost. Test: if the inverse of the principle is absurd ("we put customers first"), it is a
slogan and does no work. Good shape: *We favour X over Y, even when Y is what is being asked for.*

**Use when:** teams cannot make independent decisions that compose; every prioritization argument
restarts from zero; recruiting strong people is hard for reasons unrelated to compensation; a board
wants a multi-year frame and dated feature lists keep being the instrument offered.

**Do NOT use when:** the immediate need is this cycle's focus (that is strategy, entry 5); the
product has no named segment yet (write the segment first — a vision for everyone resolves nothing);
the organization revises the vision every planning cycle, in which case the artifact being produced
is a strategy and should be called one.

**Executable version:** `squads/products/templates/product-vision-tmpl.yaml`

---

## 4. Product Strategy — Focus, Insights, Action, Management

**Source:** Cagan and Jones, *EMPOWERED* (2020), product strategy section.

| Activity | What it is |
|---|---|
| **Focus** | Choose very few problems. Name what is deliberately not being funded. |
| **Insights** | Find the non-obvious, evidenced statements — quantitative, qualitative, technology, industry — that change what you would do. |
| **Action** | Convert insights into team objectives, proposed by teams and aligned by leadership. |
| **Management** | Transparency on outcome progress, coaching, and removing obstacles. |

**Failure modes, and what each looks like in a real document**

| Failure mode | How it appears |
|---|---|
| Priority inventory instead of focus | Eight priorities, each with an owner, no declined list. Teams then pick their own focus and the portfolio silently fragments. |
| Observations presented as insights | "Enterprises want more governance." True, sourced or not, and it changes nothing. |
| Objectives assigned rather than proposed and aligned | Compliance and reporting overhead instead of ownership. |
| Management reduced to status reporting | Percentage complete replaces outcome movement and learning. |

**Focus is a subtraction.** The declined alternatives are named in writing, individually, with the
problem each would have solved and a revisit condition. A strategy that declines nothing has
reformatted the backlog, not made a decision.

**The insight test.** An observation becomes an insight only when it changes what you would do.
Sourced statements that change nothing are recorded as `trend` and cannot carry a chosen problem on
their own.

**On the number of chosen problems.** The published guidance is "very few" and does not fix a count.
AEXOS applies an operating convention of **at most three chosen problems per cycle**, enforced by
`squads/products/checklists/product-strategy-checklist.md`. That threshold is an AEXOS convention,
not a published number — cite it as such.

**Revision condition.** A strategy with no stated evidence that would change it is unfalsifiable and
survives contradicting data indefinitely. A schedule ("reviewed quarterly") is not a condition.

**Use when:** a cycle is being planned; a roadmap has been converted and the portfolio question
remains; a strategy exists but teams are each choosing their own priorities; contradicting evidence
has arrived and the focus should be re-cut without waiting for a planning season.

**Do NOT use when:** there is no named business outcome to serve — the strategy would have no
reference point; the real problem is that a chosen problem needs a solution (that is discovery,
`@discovery-lead`); the request is epic framing or requirements (that is `@pm`).

**Executable version:** `squads/products/tasks/draft-product-strategy.md` ·
`squads/products/templates/product-strategy-tmpl.yaml`

---

## 5. Objectives and Key Results

**Sources:** John Doerr, *Measure What Matters* (2018); Christina Wodtke, *Radical Focus* (2016).
Cagan's contribution, in Cagan and Jones, *EMPOWERED* (2020), is the coupling of objectives to
empowered teams and to product strategy.

**Principles**

- Objectives derive from the product strategy, not from team wish lists
- Key results are outcome measures the owning team can influence **through the product**
- Teams propose, leaders align and negotiate
- Confidence levels are stated — a strategy is a portfolio of bets, and some are meant to fail cheaply
- Do not give OKRs to teams without authority over the solution

**The completability test.** *A key result you can finish is a task. A key result you can move is an
outcome.*

| Key result shape | Verdict |
|---|---|
| Can be marked complete — "launch", "migrate", "ship", "roll out" | Deliverable; rewrite as the change it should cause |
| Names a release, a scope or a date | Output; rewrite, or record as a high-integrity commitment if it is a genuine obligation |
| Moves a number the team can influence through the product | Keep |
| Moves a number the team cannot influence — company revenue, market share | Belongs to leadership; decompose into the part this team moves |
| Has no baseline | Record `baseline: unknown` and name the query that would establish it. Never invent a number. |

**On confidence.** Published OKR practice attaches a stated confidence at the time the objective is
set, so the portfolio reads as bets rather than promises — Wodtke, *Radical Focus* (2016). The
specific numeric convention used in that work is not reproduced here `[verify against source]`;
AEXOS templates use `high` / `medium` / `low` with a stated reason for anything above `low`.

**Missionaries, not mercenaries** — the framing Cagan attributes to John Doerr. A team that
understands the vision and owns the outcome behaves differently from a team executing someone else's
backlog.

**Use when:** the strategy has chosen problems and they need to become team commitments; existing
OKRs are producing reporting overhead; a team is measuring shipping and calling it outcome.

**Do NOT use when:** the receiving team is a feature team — fix the model or document the gap first,
because OKRs presuppose that the team can decide how to move the number; the objective is really a
genuine dated obligation (record it as a high-integrity commitment instead); the metric has no
instrument (route to `@experimentation-lead` before writing the key result).

**Executable version:** `squads/products/templates/team-objectives-tmpl.yaml`

---

## 6. Feature Roadmaps — Critique, Replacement, and the High-Integrity Commitment

**Source:** Marty Cagan, *INSPIRED*, 2nd ed. (2018).

**Critique.** A feature roadmap encodes two assumptions that are usually false — that every item on
it is valuable, and that every date on it is knowable — and the format hides the choice actually
being made.

**Replacement.** Problems to solve with outcomes attached, per team, per cycle.

**High-integrity commitment.** A specific date or deliverable promised *after* enough discovery has
been done to make the promise honest. Reserved for genuine obligations — contracts, regulatory
deadlines, partner launches — not for the whole roadmap.

**Obligation test — all four must hold**

| Test | Pass | Fail |
|---|---|---|
| Named external counterparty | Signed contract, regulator, launch partner | "Leadership expects it" |
| Externally fixed date | Contractual, regulatory, partner launch window | A date chosen in a planning meeting |
| Discovery done to make the date honest | The mechanism is understood, feasibility retired | The date was set before anyone looked |
| Material consequence of missing it | Penalty, lost renewal, non-compliance | Disappointment |

A line passing the first two but not the third is a commitment made dishonestly: keep the date, mark
it `commitment at risk`, and route the feasibility risk immediately.

**What the roadmap's consumers actually wanted.** Confidence. The dated feature list was the
instrument they had. What holds up in its place: the **vision** for the multi-year frame, the
**strategy** for what is being pursued now and why, **outcome commitments** with confidence levels,
and a **short list of high-integrity commitments** — short precisely because those are the dates
that can be kept.

**Use when:** a dated feature list is being presented as the product strategy; a board or sales
organization is asking for a two-year roadmap; a cycle plan arrived as features with dates.

**Do NOT use when:** the obligations are genuinely contractual and the conversion is being used to
escape them — the high-integrity commitment exists exactly so real obligations survive; the roadmap
is a *release plan* for work already discovered and validated, which is delivery scheduling, not
strategy, and is a legitimate artifact.

**Executable version:** `squads/products/tasks/convert-feature-roadmap.md`

---

## 7. Discovery and Delivery

**Source:** Marty Cagan, *INSPIRED*, 2nd ed. (2018).

- **Discovery** — where the four risks are retired, cheaply and quickly, before the build.
  Prototypes, tests, evidence.
- **Delivery** — where a validated solution is built to production quality, reliably and at scale.
- **Relationship** — continuous and parallel, not sequential phases.

Discovery is where you find out you are wrong cheaply; delivery is where you find out expensively.
That asymmetry is the whole argument, and it does not depend on any statistic. Cagan reports that a
substantial share of product ideas do not deliver the expected value — the specific proportion he
cites is not reproduced here `[verify against source]`.

**Squad ownership.** Discovery practice in this squad is owned by `@discovery-lead`, whose cadence
work draws on Teresa Torres, *Continuous Discovery Habits* (2021). `@product-strategist` does not
resolve discovery questions; it routes them with the risk named.

**Use when:** an initiative is heading into delivery with unaddressed risks; a team runs "discovery"
that has never changed a decision; the strategy needs to state which risks are retired before a
problem is handed on.

**Do NOT use when:** the solution is genuinely validated and the question is engineering sequencing
(that is delivery, and `@architect` / `@dev` own it); the question is interview cadence or
opportunity trees (route to `@discovery-lead`); the question is statistical readout of an experiment
(route to `@experimentation-lead`).

---

## 8. Product/Market Fit

**Definition (Cagan, *INSPIRED*, 2nd ed., 2018):** the smallest set of customers who would be
genuinely unhappy without the product — **for a named segment**. Fit is always fit-for-someone. A
product with no defined segment cannot be assessed, only argued about.

**Signals**

- The retention curve for the segment flattens above zero
- Usage is unassisted — it survives without onboarding calls and customer success intervention
- Customers describe dependency unprompted, in their own words
- Word of mouth within the segment, not only paid acquisition

**Anti-signals**

- Revenue growth driven by paid acquisition with matching churn — a leaky bucket with a wide inlet,
  and scaling it scales the leak
- Fit assessed in aggregate across undifferentiated customers, averaging strong fit for one segment
  with no fit for four others into a comfortable, meaningless number
- Usage that requires a human to sustain it

**Stage shift.** Before fit, the strategy is to find it. After fit, the strategy shifts to growth,
scale, and defending the position.

**The forty percent must-have survey is Sean Ellis's instrument, not Cagan's.** It asks active users
how they would feel if they could no longer use the product, and reads the proportion answering that
they would be very disappointed against a forty percent threshold. The exact published wording of
the question and its response options is not reproduced here `[verify against source]`. It is a
useful proxy **only** when the segment is defined and the respondents are actual active users.
Attribute it to Ellis every time it is used.

**Use when:** leadership claims fit on the basis of revenue; a strategy must decide between finding
fit and scaling; expansion into a new segment is being proposed on the strength of fit in another.

**Do NOT use when:** no segment can be named — the assessment is not yet possible, and the honest
output is "pre-fit and not yet assessable"; the question is really about pricing or packaging
(`@pricing-strategist`); the question is really about the market frame (`@positioning-lead`); the
survey would be run on trial users or churned users, where the instrument does not apply.

---

## 9. The Product Operating Model

**Source:** Marty Cagan, *TRANSFORMED: Moving to the Product Operating Model* (2024).

| Dimension | The question it answers | Where it lives in this squad |
|---|---|---|
| **How you decide** | Which problems to solve — product strategy | `@product-strategist` |
| **How you solve** | Product discovery; retiring risk before build | `@discovery-lead`, with the risks named here |
| **How you build** | Product delivery — continuous, reliable, production quality | Outside the squad: `@architect`, `@dev`, `@qa`, `@devops` |

**Diagnosis rule.** Improving one dimension while the other two stay unchanged produces process
theatre. Find which dimension is the **binding constraint** before recommending changes.

Common binding constraints and their tell:

| Tell | Binding dimension |
|---|---|
| Teams execute well and ship reliably, but the outcomes do not move | How you decide — the wrong problems are being chosen |
| Problems are well chosen but solutions keep missing | How you solve — risks are not being retired before build |
| Good problems and good solutions arrive late, broken, or not at all | How you build |

**Use when:** a transformation is being planned; a previous process change produced ceremony without
result; leadership asks where to start.

**Do NOT use when:** the request is a single initiative decision (use the four risks, entry 1); the
constraint is obviously one team's staffing rather than an organizational dimension (use entry 2);
the answer would prescribe engineering practice — the "how you build" dimension is diagnosed here and
owned outside the squad.

---

## 10. Boundary — Where This Squad Stops

Strategy ends where the epic begins. This is a routing rule, not a courtesy.

| Question | Owner |
|---|---|
| Which problem, for whom, why now, with what evidence | `@product-strategist` |
| Which solution, validated how; interview cadence; opportunity trees | `@discovery-lead` |
| Why customers switch, causally | `@jobs-analyst` |
| Category, frame of reference, market narrative | `@positioning-lead` |
| Willingness to pay, value metric, packaging | `@pricing-strategist` |
| Hypothesis, metric definition, power, guardrails, readout | `@experimentation-lead` |
| Epic framing, PRD, requirements | `@pm` |
| Story drafting | `@sm` |
| Story validation, backlog priority | `@po` |
| System design, feasibility spike, architecture decision | `@architect` |
| Interface design, prototype fidelity | `@ux-design-expert` |
| Implementation | `@dev` |
| Testing code, quality gates | `@qa` |
| Git push, PRs, MCP, CI/CD | `@devops` — exclusive, no exceptions |

Never draft implementation stories from a strategy directly. Skipping discovery and epic framing
skips the risk work the framework exists to enforce.

---

## 11. Sources

**Primary — the method applied by `@product-strategist`:**

| Work | Author(s) | Year | Covers |
|---|---|---|---|
| *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition | Marty Cagan | 2018 | Four product risks; product discovery versus delivery; prototypes; product teams; product vision; feature-roadmap critique; high-integrity commitments; product/market fit definition |
| *EMPOWERED: Ordinary People, Extraordinary Products* | Marty Cagan and Chris Jones | 2020 | Empowered product teams versus feature teams; coaching; staffing; product vision and principles; product strategy as focus / insights / action / management; team objectives |
| *TRANSFORMED: Moving to the Product Operating Model* | Marty Cagan (with Silicon Valley Product Group partners) | 2024 | Product operating model dimensions; product model principles and competencies; transformation patterns and objections |

**Adjacent — named whenever used:**

| Work | Author | Year | Used for |
|---|---|---|---|
| *Measure What Matters* | John Doerr | 2018 | Objective and key result practice; the missionaries-not-mercenaries framing Cagan cites |
| *Radical Focus* | Christina Wodtke | 2016 | OKR cadence, stated confidence, weekly check-in practice |
| *Continuous Discovery Habits* | Teresa Torres | 2021 | Discovery cadence and opportunity mapping that feed strategy insights — owned in this squad by `@discovery-lead` |
| The startup product/market fit survey (published practice) | Sean Ellis | — | The forty percent must-have proxy measure for product/market fit |

**Citation rules for anyone extending this file:**

1. Use only the works listed above. Do not add a citation without the source in hand.
2. Keep coauthors complete — *EMPOWERED* is Marty Cagan **and Chris Jones**.
3. Never invent a title, author, year, chapter or statistic.
4. If a numeric detail from a published work is not verified, describe the mechanism without the
   number and mark it `[verify against source]`.
5. Attribute the forty percent must-have survey to **Sean Ellis**, never to Cagan.
6. A wrong attribution is worse than no attribution.

---

## 12. Where Each Entry Is Executed

| Entry | Command | Task | Template / Checklist |
|---|---|---|---|
| Four risks | `*risk-assess {initiative}` | `squads/products/tasks/assess-product-risks.md` | `templates/risk-assessment-tmpl.yaml` |
| Team models | `*team-model`, `*empower-plan` | — | `checklists/empowered-team-checklist.md` |
| Vision and principles | `*vision {horizon}`, `*product-principles` | — | `templates/product-vision-tmpl.yaml` |
| Strategy | `*strategy`, `*insights` | `squads/products/tasks/draft-product-strategy.md` | `templates/product-strategy-tmpl.yaml`, `checklists/product-strategy-checklist.md` |
| Objectives | `*objectives {quarter}` | — | `templates/team-objectives-tmpl.yaml` |
| Roadmap conversion | `*roadmap-convert {roadmap}` | `squads/products/tasks/convert-feature-roadmap.md` | `templates/team-objectives-tmpl.yaml` |
| Product/market fit | `*pmf-assess {segment}` | — | — |
| Operating model | `*operating-model-audit` | — | — |
| Handoff | `*strategy-brief` | — | `.aexos-core/product/templates/project-brief-tmpl.yaml` |
