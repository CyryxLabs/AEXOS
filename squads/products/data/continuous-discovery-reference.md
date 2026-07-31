# Continuous Discovery — Condensed Method Reference

**Squad:** products
**Owner:** discovery-lead (Sonar)
**Purpose:** The method behind every `@discovery-lead` command, condensed to what is needed at the
point of use. Loaded when a command needs the rule, not the whole book.

**What this file is:** a working reference to published methodology, attributed so the reasoning
can be checked at the source. **What it is not:** a substitute for the sources, and not an
original method. Where a numeric detail from a published work is not certain, the mechanism is
described without the number rather than guessed at.

Primary source throughout: Teresa Torres, *Continuous Discovery Habits: Discover Products that
Create Customer Value and Business Value* (2021). Adjacent sources are named at the point of use
and listed in full at the end.

---

## 1. The Habit Definition, Clause by Clause

Torres defines continuous discovery as: **at a minimum, weekly touchpoints with customers, by the
team building the product, where they conduct small research activities in pursuit of a desired
product outcome.**

Every clause is load bearing. Teams fail one clause at a time, and each failure has its own
signature and its own repair.

| Clause | What it requires | Failure signature | Repair |
|---|---|---|---|
| **At a minimum, weekly** | A touchpoint every week, not an average of one per week over a quarter | Batched research: eight interviews in one sprint, then eleven weeks of nothing | Fix a recurring slot; the slot exists even when no participant confirms |
| **Touchpoints with customers** | Direct contact with people who use or would use the product | Proxy contact — the account manager's summary, the sales call recording, the survey | Talk to the person; use proxies only to reach them |
| **By the team building the product** | The trio: product manager, designer, engineer | A research function interviews, the trio reads the deck | Return the touchpoint to the trio; keep researchers for bounded deep studies |
| **Small research activities** | Minutes to hours, not weeks | A study design, a sample plan, a stakeholder review before anyone talks to anyone | Shrink to one conversation about one episode |
| **In pursuit of a desired outcome** | A named, measurable product outcome the trio can move | "Let's learn about our users" — snapshots that fit nowhere on a tree | Attach the touchpoint to an outcome, or stop |

**When to use this definition:** whenever a team describes what they do as continuous discovery.
Check it clause by clause rather than as a whole; the whole always sounds right.

**When NOT to use it:** as a stick. A team failing three clauses does not need to be told they are
failing three clauses — they need the recruiting hook fixed, which is usually the root of all
three. Diagnose to the cause, not to the definition.

---

## 2. The Product Trio

| Element | Content |
|---|---|
| Composition | Product manager, product designer, software engineer |
| Principle | The three roles that decide together must learn together |
| Failure mode | One role attends and reports back; the other two decide from a summary of a summary, and the opportunity space collapses to whatever fit in the report |
| Minimum viable attendance | Two of three live, third watching the recording within the week — recorded as a partial, not as a full touchpoint |

**When to use the trio rule:** on every customer touchpoint that will produce an opportunity on
the tree.

**When NOT to use it:** for bounded, deep, scoped research studies. Those are legitimate work for
a research function or an agency, and demanding trio attendance on a six-week ethnographic study
is a misapplication. The rule protects the weekly habit, not all research.

**Boundary note:** a research function and a weekly trio habit coexist. What must not happen is
one being labelled as the other.

---

## 3. The Opportunity Solution Tree

### Levels

| Level | Contents | Rule |
|---|---|---|
| **Outcome** (root) | One measurable product outcome with baseline and target, laddering to a business outcome | Exactly one. If the trio cannot move it through the product, it is a business outcome needing decomposition |
| **Opportunities** (branches) | Customer needs, pains and desires in the customer's language, sourced from stories | Never a thing we would build |
| **Solutions** | What we might build | Under the target opportunity only |
| **Assumption tests** | What must be true, and how we would know | Under each solution |

### Structural rules

1. Each opportunity has **exactly one parent**. An opportunity appearing twice means the branch
   was cut at the wrong altitude.
2. **Sibling opportunities are distinct**, not overlapping. Overlapping siblings are the same
   signal written down twice in different words.
3. **Vertical relationships are subsets, not sequences.** A child is a narrower case of the
   parent, not the next step in a process. A tree that reads as a flow has mapped a process
   instead of a need space.
4. **Solutions never appear at the opportunity level.**
5. **Exactly one target opportunity at a time.**

### Purpose

Make the decision visible — what is being pursued and, more importantly, what is deliberately
not. The tree is a map of the opportunity space, not a backlog.

**When to use the tree:** when a team owns an outcome and has more than one plausible direction;
when a roadmap is a list of features with no traceable evidence; when the same debate recurs
because the option space was never written down.

**When NOT to use it:** as a prioritized delivery queue — that is a backlog and it belongs to
`@po`. Also not for a single forced compliance change with no option space; a tree with one
branch and one solution is bureaucracy.

### The classification test

Applied to every node before it goes on the tree:

| The item names | It is | Where it goes |
|---|---|---|
| A need, pain or desire in the customer's words | Opportunity | A branch |
| A thing we would build | Solution | Under the target opportunity, later |
| A number we want to move | Outcome | The root |
| Something that must be true | Assumption | Under a solution, later |
| Nothing traceable to a snapshot | Not evidence | Deleted |

"Add a preview button" is a solution wearing an opportunity costume. The opportunity underneath is
"I could not predict what it would do."

### Provenance — Constitution Article IV

Every opportunity cites at least one interview snapshot id. An opportunity with no provenance is
deleted, not debated. This is the AEXOS enforcement of No Invention against the discovery
artifact, and it is what makes the tree auditable rather than persuasive.

---

## 4. Story-Based Interviewing

**Method:** collect specific stories of past behaviour. Opinions are generated on the spot;
stories are recalled. Only the recalled specifics carry evidence about actual behaviour.

**Corollary that surprises teams:** users cannot tell you what they need — which is why we do not
ask. Opportunities are *extracted from stories by the trio*, not reported by the customer.

### Good prompts

| Prompt | Why it works |
|---|---|
| "Tell me about the last time you {behaviour}" | Recalls one specific episode; the specifics are the evidence |
| "Walk me through what happened when {event}" | Reconstructs a real timeline in the order it happened |
| "Take me back to that moment — what were you looking at?" | Retrieves context that summary has already stripped out |
| "And then what happened?" | Extends the story without introducing anything of yours |
| "What did you do instead?" | Surfaces the workaround, which is where the opportunity usually is |
| "Who else was involved?" | Exposes people and constraints a solo account omits |
| "What were you thinking right then?" | Gets in-the-moment reasoning rather than retrospective justification |

### Banned prompts, and why

| Banned form | Class | Why |
|---|---|---|
| "Would you use...?" | Prediction | People forecast their own behaviour poorly, and the answer is generated to be agreeable. A yes predicts nothing |
| "How often do you...?" | Generalization | Asks for an average across remembered episodes. The average is reconstructed, not recalled, and it erases the specific case |
| "What do you think about...?" | Opinion | The opinion did not exist before you asked. It is invented on the spot and later quoted as a finding |
| "Would you pay for...?" | Prediction plus pricing | Both a forecast and a different discipline — route to `@pricing-strategist` |
| "Do you like {feature}?" | Opinion | Same defect, plus politeness toward whoever built it |
| "What would make this better?" | Prediction and solutioning | Asks the participant to design; extraction is the trio's job |
| "Do you usually {behaviour}?" | Generalization | "Usually" is the tell — there is no episode in the answer |
| "How important is {thing} to you?" | Self-rated opinion | Importance is inferred from what they did, not from a self-placed scale |
| "If we built X, would that help?" | Prediction plus leading | Contains your solution and asks for endorsement |
| "Why didn't you just {action}?" | Leading and accusatory | Makes the participant defend themselves; the story stops |
| "Don't you find it frustrating when...?" | Leading | Supplies the emotion; what comes back is yours |
| "What are your requirements?" | Opinion in procurement clothing | Returns a wish list assembled for you, skipping the episodes behind it |

**When to use story-based interviewing:** for any question about what people actually do, why they
did it, and what got in the way.

**When NOT to use it:** for magnitude ("how many users hit this") — that is instrumentation or an
experiment, route to `@experimentation-lead`. For price — route to `@pricing-strategist`. For
whether a design is comprehensible — that is a usability task with a prototype, not a story. For
market sizing — route to `@analyst`.

### The snapshot

One interview, one snapshot: participant context, story timeline, opportunities surfaced,
verbatim quotes, tree placement. Filed before the next touchpoint. The learning evaporates
otherwise, and the tree loses its provenance layer.

### Recruiting

Automate it into the product: in-product prompts, post-transaction hooks, support queue, existing
customer touchpoints. The cost of the habit is not the interview — it is recruiting friction. When
scheduling each interview is a fresh negotiation, the cadence dies in the first busy quarter.

| Channel | Use when | Do NOT use when |
|---|---|---|
| In-product prompt | The relevant behaviour is detectable in the product | The users you need never reach that state — you will only recruit the ones who succeeded |
| Post-transaction hook | You need fresh, recallable stories immediately after a key action | The action is rare and cannot sustain weekly volume |
| Support queue | You need frustrated users fast | It is your only channel — the sample skews to the angry |
| Sales or onboarding handoff | You need pre-purchase or first-run stories | The account owner filters who you may talk to |
| Standing advisory list | You need a guaranteed volume floor | It is your only channel — a fixed roster learns to give you the answers it thinks you want |

---

## 5. Experience Mapping

| Element | Content |
|---|---|
| Sequence | Individual maps first, then converge on a shared map |
| Reason | Converging first hides disagreement. Individual maps surface where the trio's mental models actually differ |
| Output | A shared experience map, which becomes the source for opportunity extraction |

**Sequence in practice:**

1. Each trio member independently maps the customer's experience from the snapshots.
2. The maps are compared side by side. The divergences are the finding — they show where the trio
   has been deciding from three different pictures.
3. The trio converges into one shared map, resolving divergences by returning to the snapshots,
   not by seniority.
4. Opportunities are extracted from the shared map onto the tree.

**When to use experience mapping:** before opportunity mapping, when the trio has several
snapshots and needs a common picture; when two trio members keep proposing solutions that make no
sense to each other.

**When NOT to use it:** with one snapshot — there is no divergence to surface, so it is
ceremony. Also not as a deliverable for stakeholders; its value is in the disagreement it exposes
inside the trio, which does not survive being presented.

---

## 6. Opportunity Assessment — Four Criteria

| Criterion | Asks |
|---|---|
| **Opportunity sizing** | How many customers hit it, how often, how severely |
| **Market factors** | Competitive pressure, market trends, timing |
| **Company factors** | Strategic fit, capability, cost to serve |
| **Customer factors** | Importance to the customer, current satisfaction |

**Output:** a comparative ranking, and exactly one target opportunity selected.

**When to use:** when several top-level opportunities are live and a target must be chosen, and
the choice needs to be defensible later.

**When NOT to use:** as a scoring formula. These are criteria for structured comparison, not
weights to multiply into a total. A number produced by multiplying four judgements is a judgement
with false precision, and it hides the reasoning that actually mattered. Record the reasoning per
cell.

**Common failure:** every opportunity rated high on every criterion. That is not an assessment,
it is a description of enthusiasm. If nothing scores low, the comparison did no work.

---

## 7. Solution Comparison

| Element | Content |
|---|---|
| Rule | Minimum three solutions per target opportunity |
| Reason | A solution evaluated alone always clears the bar — there is nothing for it to lose to. Comparison exposes the tradeoffs isolation hides |
| Method | Generate broadly, then compare against the same opportunity on the same criteria |

**Distinctness test:** three solutions are distinct if they could fail for different reasons.
Three variants of one idea, or two real options plus a straw man, is one solution with decoration.

**When to use:** before mapping assumptions, always. Mapping the assumptions of a solution chosen
in isolation is rigour applied downstream of the error.

**When NOT to use:** when the target opportunity has not been selected — solutions hanging under
three different opportunities means no target was chosen. Also not when the "solutions" are
actually different opportunities in disguise; check them against the classification test first.

---

## 8. Assumption Mapping

### Categories

| Category | Question | Owner in AEXOS |
|---|---|---|
| **Desirability** | Do they want it? | `@discovery-lead` |
| **Viability** | Does it work for the business? | `@pricing-strategist` (price) or `@product-strategist` (model, portfolio) |
| **Feasibility** | Can we build it? | `@architect` — a spike, not a simulation |
| **Usability** | Can they use it? | `@discovery-lead`; `@ux-design-expert` when fidelity beyond a mockup is needed |
| **Ethical** | Should we build it? | `@products-chief` — above the trio |

**Attribution:** the categories and the prioritization plot below are developed in David J. Bland
and Alexander Osterwalder, *Testing Business Ideas* (2019). Torres integrates them into the
opportunity solution tree, with assumptions sitting under solutions and tests under assumptions.
The risk framing is adjacent to Marty Cagan's product risk categories in *INSPIRED*, 2nd edition
(2018).

### The importance x evidence plot

Importance runs vertical, evidence horizontal.

```text
IMPORTANCE
   high |  LEAP-OF-FAITH              |  SUPPORTED
        |  test now, threshold first  |  proceed, cite the evidence
        |-----------------------------|----------------------------
    low |  NOISE                      |  SETTLED
        |  ignore unless scope changes|  ignore entirely
        +-----------------------------+----------------------------
             low evidence                  high evidence
```

| Importance | Evidence | Class | Action |
|---|---|---|---|
| High | Low | Leap-of-faith | Test now, threshold declared first |
| High | High | Supported | Proceed, cite the evidence source |
| Low | Low | Noise | Ignore unless scope changes |
| Low | High | Settled | Ignore entirely |

**Rating rules:**

- **Importance** answers "what breaks if this is false?" If the answer is "not much", it is low
  regardless of how much airtime it has had.
- **Evidence** must name its source: snapshot ids, a log query and its result, a completed test
  with a pre-declared threshold, or a citation. Team consensus is not evidence. A competitor
  shipping it is evidence that a competitor believes it, not that customers want it.

**When to use assumption mapping:** on each candidate solution, after comparison, before anything
is built.

**When NOT to use it:** as a risk register to be maintained. It exists to isolate the small set
worth a test. A map with thirty assumptions and no leap-of-faith set has been used as
documentation, not as a filter.

**Deliberately hunt** the assumption nobody wrote down because everyone agrees with it. Unanimity
is exactly what makes an assumption invisible.

---

## 9. Assumption Testing

### Principles

- Simulate before you build.
- The test must be an order of magnitude cheaper than the solution.
- Declare the pass threshold before running.
- Test the assumption, not the solution.

### Test method library

Attribution: the test library is developed in David J. Bland and Alexander Osterwalder, *Testing
Business Ideas* (2019); the methods below are the ones Torres uses in the discovery loop. Read the
"do NOT use" column first — it eliminates faster.

| Method | Answers | Use when | Do NOT use when |
|---|---|---|---|
| **Story-based interview** | Desirability | The assumption concerns behaviour that has already happened somewhere | The behaviour has never been possible for the participant — you will collect predictions |
| **Unmoderated task with a static prototype** | Usability, comprehension | The assumption is about comprehension, findability or first-run interpretation | The assumption depends on real data, real stakes or real account state the prototype cannot fake |
| **One-question survey to a targeted segment** | Desirability, factual behaviour | You need one factual detail about current behaviour across many people | The question is "would you" or "how much would you pay" — that is prediction, not measurement |
| **Concierge / Wizard of Oz** | Desirability, value | The assumption is about whether the value lands when the work is done for them | You cannot staff the manual run at the needed scale, or manual delivery misrepresents what the product would do |
| **Fake door with an honest debrief screen** | Desirability, intent | The assumption is about intent to engage at a real decision point | You cannot debrief honestly, or clicks would be read as validated demand rather than as attention |
| **Data mining of existing behaviour** | Desirability, magnitude | The behaviour already occurs in your product or logs and the signal is already there | The data measures an unvalidated proxy, or the population that generated it differs from the target segment |
| **Prototype walkthrough (moderated)** | Usability | You need to hear the reasoning while they attempt the task | You need unprompted behaviour — moderation changes what they do |
| **Technical spike** | Feasibility | Feasibility is the risk | Route it — the spike belongs to `@architect`. Do not simulate a feasibility question |

**Prefer the method that reuses evidence you already hold.** If a filed snapshot or an existing log
query already answers the assumption, it was never low-evidence — reclassify it on the map rather
than running a test to confirm what is known.

### The threshold rule

Declare the pass threshold, its judging rubric, the action on pass, the action on fail and the
stop rule **before** the test runs, and commit them. A test with no pre-declared evaluation
criterion always passes: the result arrives, and the criterion is written to accommodate it. The
commit timestamp is what makes "declared before" checkable rather than asserted.

A missed threshold is a result. It says this solution does not clear the bar for this opportunity,
which is exactly what the test was built to find out.

### The proportion rule

The test must be an order of magnitude cheaper than the solution. If the ratio fails, the answer
is not "the solution is small so the test is fine" — the question is never effort in absolute
terms, it is the ratio. A small solution deserves a smaller test. Shrink by: cutting the sample,
dropping fidelity, testing one assumption instead of three, substituting a cheaper method, or
looking for the signal in data you already have.

If it genuinely cannot be shrunk past the threshold, record that plainly: this assumption cannot
be tested more cheaply than building it, so the decision is a judgement made with the evidence in
hand — not a validated one. Do not launder a build as a test. Shipping the feature to a slice of
traffic and calling it an assumption test is delivery with extra steps.

**Sample size caveat:** small qualitative samples detect obvious signal, not small differences.
State that limitation in the plan. If the decision depends on a small difference, this is the
wrong instrument — route to `@experimentation-lead` for statistical design, power and guardrails.

---

## 10. Continuous vs Project Research

| | **Continuous discovery** | **Research project** |
|---|---|---|
| Cadence | Weekly, ongoing, no end date | Bounded engagement with a start and an end |
| Owner | The product trio | Research function or agency |
| Size | Minutes to hours | Weeks to months |
| Output | Snapshots feeding a live tree | A report or a deck |
| Purpose | Keep the opportunity space current while delivery runs | Answer a deep, scoped question |
| Decision coupling | The deciders heard the story firsthand | The deciders read a summary |
| Failure mode | Erodes silently when recruiting breaks | Arrives after the decision was made |

**Guidance:** both are legitimate. Only the continuous mode sustains an opportunity solution tree.
Do not label a project as a habit.

**When to choose continuous:** the outcome is live, the option space is open, and the trio is
making decisions weekly.

**When to choose a project:** the question is deep, scoped, and needs methods or sample sizes the
weekly slot cannot carry — ethnography, large-scale segmentation, longitudinal study. Route these
to `@analyst`, and keep the weekly touchpoint running alongside.

**When NOT to substitute one for the other:** a quarterly study does not discharge the weekly
habit, and a weekly habit does not answer a question that needs six weeks of fieldwork.

---

## 11. The Discovery Loop

```text
1. OUTCOME     measurable product outcome the trio can influence
2. INTERVIEW   weekly touchpoint, story-based, trio present, snapshot captured
3. MAP         extract opportunities from stories, structure the tree, keep it valid
4. TARGET      size on the four criteria, select ONE
5. IDEATE      generate at least three distinct solutions
6. ASSUME      decompose into assumptions, plot importance x evidence
7. TEST        smallest test on the leap-of-faith set, threshold declared first
8. DECIDE      compare, choose, hand to @pm for epic framing, or return to step 5
```

The loop never stops for a "discovery phase to end". It runs while delivery runs — the interviews
for the next target opportunity happen during the build of the current one. If discovery stops
when delivery starts, the next cycle begins with no evidence and the team is back to feature
requests.

---

## 12. Boundary — What This Method Does Not Do

This squad decides **what** to build. It does not build, test code, publish, or write the delivery
artifacts.

| Work | Owner |
|---|---|
| Implementation | `@dev` |
| Code testing and quality gates | `@qa` |
| Story drafting | `@sm` |
| Epic framing, PRD, requirements | `@pm` |
| Story validation, backlog priority | `@po` |
| Git push, PRs, MCP, CI/CD | `@devops` — exclusive, no exceptions |
| System design, feasibility spike | `@architect` |
| Interface design and prototype fidelity | `@ux-design-expert` |
| Deep bounded research studies | `@analyst` |
| Statistical experiment design and readout | `@experimentation-lead` |
| Positioning and category narrative | `@positioning-lead` |
| Causal theory of why customers switch | `@jobs-analyst` |
| Pricing and packaging | `@pricing-strategist` |
| Portfolio strategy and bets | `@product-strategist` |
| Ethical calls above the trio | `@products-chief` |

A validated opportunity plus its assumption test evidence becomes an **input** to `@pm` for epic
framing and `@sm` for story drafting. Discovery artifacts feed the story pipeline; they never
replace it, and they never jump directly to implementation.

---

## 13. Sources

Full source list. Every method in this file traces to one of these, and nothing here is presented
as original.

| Work | Author(s) | Year | Used for |
|---|---|---|---|
| *Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value* | Teresa Torres | 2021 | Primary source. The habit definition, the product trio, the opportunity solution tree and its structural rules, story-based interviewing, the interview snapshot, experience mapping sequence, opportunity assessment criteria, the minimum-three solution comparison rule, assumption mapping integrated into the tree, simulate-before-you-build, and declaring the pass threshold before the test runs |
| *Testing Business Ideas* | David J. Bland, Alexander Osterwalder | 2019 | The assumption test library, the desirability / viability / feasibility categories, and importance-by-evidence prioritization |
| *EMPOWERED: Ordinary People, Extraordinary Products* | Marty Cagan | 2020 | The empowered product team, outcome ownership |
| *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition | Marty Cagan | 2018 | Product discovery versus delivery, product risk categories |
| *Validating Product Ideas: Through Lean User Research* | Tomer Sharon | 2016 | Research operations, recruiting and screening, question quality |

**Attribution discipline.** `@discovery-lead` (Sonar) is a specialist applying these published
methods, and does not imply their endorsement. Where a numeric detail from a published work is not
certain, this file describes the mechanism without the number rather than inventing one — a wrong
attribution is worse than no attribution.

**AEXOS-specific conventions in this file**, which are not published work: the provenance rule as
an enforcement of Constitution Article IV (No Invention); the routing table in section 12; the
agent handoff destinations; and the scoring bands used in the squad's checklists.

---

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Tasks: `squads/products/tasks/build-opportunity-tree.md`,
  `squads/products/tasks/run-interview-cadence.md`,
  `squads/products/tasks/design-assumption-test.md`
- Templates: `squads/products/templates/opportunity-solution-tree-tmpl.yaml`,
  `squads/products/templates/interview-snapshot-tmpl.yaml`,
  `squads/products/templates/assumption-map-tmpl.yaml`
- Checklists: `squads/products/checklists/continuous-discovery-checklist.md` (PRD-CL-001),
  `squads/products/checklists/interview-quality-checklist.md` (PRD-CL-002)
