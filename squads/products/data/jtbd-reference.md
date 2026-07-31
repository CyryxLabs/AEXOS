# Jobs to Be Done — Condensed Theory Reference

**Squad:** products
**Referenced by:** jobs-analyst (Plumb)
**Purpose:** The working reference behind every jobs artifact this squad produces. Each entry
states what it is, when to use it, and when NOT to use it — because most JTBD failures in practice
are a correct frame applied to the wrong question.

**Standing rule for this file.** Everything here is published theory, cited so it can be checked
at the source. Nothing may be added to it that is not traceable to the source list in section 12.
Where a numeric detail from a published work is not verified, the mechanism is described without
the number and marked `[verify against source]`. A wrong attribution is worse than no attribution.

---

## 1. The Job

**Definition.** A job is the progress that a person is trying to make in a particular circumstance.
Not a task, not a goal, not a need in the abstract. Progress plus circumstance, or it is not a job.
[Christensen, Hall, Dillon, Duncan, *Competing Against Luck* (2016)]

**Components.**

| Component | What it means | Failure signature |
|---|---|---|
| **Progress** | Movement toward a better situation, not a task completed | An activity with no "and then what" behind it — "see my metrics" |
| **Circumstance** | The specific context that makes the progress urgent *now*; has a trigger and a timestamp | A standing condition equally true a year earlier — "needs visibility" |

**Unit of analysis: the circumstance, not the customer.** Not the product, not the category, not
the persona. The same person hires different products for the same functional need in different
circumstances, so segmenting on the person cannot see the difference that decides the purchase.

**The struggling moment is the origin.** If you cannot name the moment of struggle that started the
search, you do not have a job — you have a description of a user.

**Use when:** deciding what to build; explaining why a purchase happened when it did; rebuilding a
segmentation that predicts membership but not purchase.
**Do NOT use when:** allocating acquisition spend (attributes are the right tool there); sizing a
market (route to `@analyst`); designing an interface (route to `@ux-design-expert`); prioritising a
backlog (route to `@po`). A job is an input to those decisions, never a substitute for them.

---

## 2. The Three Dimensions

Every job has functional, social and emotional dimensions. The functional dimension gets the
product considered. The social and emotional dimensions usually decide the purchase.
[*Competing Against Luck* (2016)]

| Dimension | What it covers | Good statement | Bad statement, and why |
|---|---|---|---|
| **Functional** | The practical work to be done | "Attribute pipeline to channel fast enough to answer live" | A feature list — states the mechanism, not the work |
| **Social** | How the person wants to be perceived, and by whom | "Be seen by the CEO as accountable rather than as a cost centre" | "Wants to look good" — no audience, no perception, unbuildable |
| **Emotional** | How the person wants to feel, or stop feeling | "Stop the recurring dread before Monday standup" | "Wants confidence" — generic, true of everyone, discriminates nothing |

**Use when:** writing or repairing a job statement; auditing why a well-specified feature failed to
win the switch.
**Do NOT use when:** the dimensions cannot be evidenced from transcripts. A missing social or
emotional dimension is an interview gap, not an absence — mark it `not recovered` and interview
again rather than inferring it. Inferred dimensions are the most persuasive form of invention
because they are unfalsifiable and flattering.

**Most common incomplete result:** functional only. It is the dimension that shows up in feature
requests, so it is the one the organisation already has.

---

## 3. Hiring and Firing

Customers do not buy products, they hire them. When progress is achieved they keep hiring; when it
is not, they fire. [*Competing Against Luck* (2016)]

| Term | Definition | Why it matters |
|---|---|---|
| **Big hire** | The purchase decision — committing money or switching | The event most organisations measure |
| **Little hire** | The repeated decision to actually use it | A big hire with no little hires is churn in waiting |
| **Firing criteria** | What the product must fail at for the customer to stop | Usually more revealing than hiring criteria, and almost never collected |

**Always ask what was fired.** The fired alternative names the real competitive set and the real
hiring criteria more honestly than any market report. "Nothing was fired" means the probe was
missed — something always stops: a spreadsheet, a person, a habit, a tolerated struggle.

**Use when:** reconstructing any switch; building a competitive set; diagnosing churn (churn is a
switching event in reverse, and the churned customer can reconstruct a timeline as well as a buyer).
**Do NOT use when:** the person never made a decision. A prospect has neither hired nor fired
anything, so there is no hire/fire record to take.

---

## 4. The Milkshake Case

**Summary.** A fast food chain sought to improve milkshake sales. Attribute-based research —
profiling milkshake buyers by demographics and asking them what would improve the product —
produced no growth. Observing the circumstance revealed that a substantial share of milkshakes were
bought early in the morning by commuters, alone in a car, who hired the milkshake to make a long
boring drive interesting and to hold off hunger until late morning. The milkshake performed that
job well because it was thick, slow to drink, and manageable with one hand.
[*Competing Against Luck* (2016)]

`[verify against source]` — the published account states the proportion of morning sales and the
time boundary. Both are omitted here rather than reproduced from memory.

**Lesson one — competition is defined by the job, not the category.** The competitive set was
bananas, bagels, doughnuts and boredom, not other milkshakes. No amount of milkshake-versus-
milkshake improvement addresses a competitor that is a banana.

**Lesson two — same product, different circumstance, different job.** The afternoon milkshake,
bought by a parent for a child, is a different job with different criteria. The product did not
change; the circumstance did, and that is what determines what "better" means.

**Use when:** explaining to a stakeholder why the category-based competitor list is incomplete;
demonstrating why attribute research on existing buyers produced nothing; justifying a
circumstance-based split of an apparently single job.
**Do NOT use when:** it would replace evidence from your own interviews. The milkshake case is an
illustration of a method, not a substitute for running it. Quoting it in place of a transcript is
Article IV invention with a famous citation attached.

---

## 5. Circumstance versus Attribute

| | Attribute | Circumstance |
|---|---|---|
| **What it is** | A property of the person or firm | The situation that made the progress urgent now |
| **Kinds** | Demographics, firmographics, psychographics, stated preferences | A trigger event with a timestamp |
| **Predicts** | Membership in a market | The purchase, and its timing |
| **Good for** | Allocating acquisition spend, filtering outreach lists | Deciding what to build |
| **Fails at** | Explaining why anyone acted | Nothing in this squad's scope — but it does not size a market |

**The diagnostic.** *Could two people sharing this attribute be in opposite circumstances?* If yes,
the attribute is not doing the causal work.

**Worked comparison.**

| Line | Class | Two people in opposite circumstances? | Causal? | Correct use |
|---|---|---|---|---|
| "35–45 years old" | Demographic attribute | Trivially yes | No | Media targeting, nothing else |
| "Series B SaaS, 50–200 employees" | Firmographic attribute | Yes — one under audit pressure, one not | No | Outreach filter; label it as such |
| "Values data-driven decision making" | Stated preference | Yes, and everyone says it | No | Cut unless it appears verbatim in a transcript |
| "Reports to the CEO or CRO" | Attribute, but load-bearing | Partly — it constrains the situation | Partly | Restate as circumstance: accountability is public and unscheduled |
| "Frustrated by manual reporting" | Generic pain | Yes | No | Restate with the moment: asked without warning, no time to prepare |
| "Alone in a car on a long boring commute with one free hand" | Circumstance | No | Yes | Build against it |
| "Just failed an audit and must show evidence within 30 days" | Circumstance | No | Yes | Build against it |

**Christensen's warning.** Organizations drift toward attribute data because operational systems
already collect it, not because it explains purchase. [Christensen, Cook, Hall, "Marketing
Malpractice", *HBR* (2005)] Expect the weakest lines in any persona to be the ones that were
easiest to obtain.

**Use when:** auditing personas, segments and ICPs; challenging a correlation used as an
explanation; rebuilding a segmentation.
**Do NOT use when:** the attribute is being used honestly for targeting. Do not delete a persona
that works for media buying — annotate it. The persona and the circumstance map answer different
questions, and the error is using the first to answer the second, not the persona's existence.

---

## 6. The Four Forces of Progress

**Attribution.** Developed by Bob Moesta and Chris Spiek within the JTBD tradition; see Bob Moesta
with Greg Engle, *Demand-Side Sales 101* (2020). Used alongside Christensen's theory, not as part
of it.

| Force | Direction | Description | Probe |
|---|---|---|---|
| **Push** of the situation | toward change | The struggle in the current situation. Without a push there is no search | "What happened that made you start looking? Why then and not a year earlier?" |
| **Pull** of the new solution | toward change | The attraction of the new solution and the imagined better life with it | "What did you picture yourself doing with it before you bought?" |
| **Anxiety** of the new solution | against change | Fear of the new solution — switching cost, risk of failure, learning curve, past migration scars | "What worried you? What almost stopped you? What had gone wrong before?" |
| **Habit** of the present | against change | Attachment to the present solution. Real value, correctly perceived, not mere inertia | "What did you like about how you were doing it? What did you lose by switching?" |

**Mechanism.** Switching occurs when push plus pull exceeds anxiety plus habit. This is directional,
not arithmetic — do not score the forces numerically and add them. The equation earns its keep by
insisting that two of the four forces resist, which is the half product work routinely ignores.

**Name the binding force before recommending anything. Adding pull when anxiety is binding wastes
the build.**

**Binding-force diagnostics, applied to behaviour rather than opinion.**

| Observed | Binding force |
|---|---|
| They want it, understand it, and still do not move | Anxiety or habit |
| They cannot articulate why today rather than last year | Push is weak; no struggling moment |
| They love the demo and never start | Anxiety of the new solution |
| They start and revert within a month | Habit of the present was undervalued |
| Strong push, no clear pull | They will hire something, but not necessarily you |
| Long delay spent investigating the new solution | Anxiety — the delay was bought, not wasted |
| Long delay spent comfortably using the old one | Habit |

**Separating anxiety from habit.** Anxiety is about the new thing and points forward ("what if it
breaks"). Habit is about the old thing and points backward ("I knew where every number came from").

**Habit is not inertia to be shamed.** It is real value in the incumbent solution, correctly
perceived. If habit reads as pure irrationality, the interview did not find what the old way was
good at — and that thing is usually what the new solution must preserve or convert into an asset.

**Use when:** one switch needs explaining; a product is losing switches it appears to deserve; a
roadmap is answering every switching problem with more features.
**Do NOT use when:** there is no completed decision to analyse. Forces are only visible against a
choice that was actually made. Also do not use it as a scoring model — a numeric forces score is a
false precision that hides which force is binding.

---

## 7. The Switch Interview

**Attribution.** Interview method developed by Bob Moesta and Chris Spiek within the JTBD
tradition; see Bob Moesta with Greg Engle, *Demand-Side Sales 101* (2020).

### Who

| Who | Value | What they expose |
|---|---|---|
| Switched to us in the last 60 to 90 days | Highest | Full timeline, still recoverable |
| Switched away from us recently | Equal | Firing criteria, which buyers cannot give |
| Considered us and chose something else | High | Anxiety and pull failures |
| Never considered anything (non-consumers) | Moderate | Push weakness, non-consumption |
| Prospects speculating about a future purchase | None | Speculation, no timeline to reconstruct |

**Why the window.** The timeline — dates, sequence, who said what — degrades faster than the
opinion about the product. A fluent account of a two-year-old purchase is usually a reconstruction.

**Documented fallbacks, in order of value:** recent churn (exposes firing criteria, but the ending
colours the retelling of the beginning); closed-lost from the last quarter (exposes anxiety and
pull failures, but has no deciding event and no first use); own sales call recordings, mined for
timeline language rather than objection handling (spoken before the outcome was known, but only
covers what the seller thought to ask). What does *not* substitute is a prospect describing a
hypothetical purchase.

### Posture

Investigator reconstructing an incident, not a researcher administering a survey.

| Investigator | Survey (do not) |
|---|---|
| Follows the sequence wherever it goes | Works a fixed list in order |
| Asks "and then what happened?" | Asks "on a scale of one to five" |
| Chases contradictions in dates | Smooths contradictions for rapport |
| Wants the messy specific | Wants the generalisable summary |
| Uses silence to let them retrieve | Fills silence with the next question |
| Repeats their exact words back | Translates into product vocabulary |

Never supply the word they are groping for. The word they choose is data; the word you offer is
contamination.

### The six timeline stages

Anchor each in **time, place and who was present**. Anchoring separates a recovered memory from a
plausible story.

1. **First thought** — the earliest moment the idea appeared, often months before and rarely
   volunteered
2. **Passive looking** — aware, not searching, noticing alternatives incidentally
3. **Active looking** — deliberate search, comparison, demos
4. **Deciding event** — the specific thing that made it happen on that day
5. **Purchase** — the transaction, who was involved, what nearly stopped it
6. **First use** — whether the little hire happened, and what surprised them

An unanchored stage is recorded as `not recovered`, never inferred.

### Probes

- "Take me back to the first time you thought about this. Where were you?"
- "What made that day different from the week before?"
- "Who else was in the room? What did they say?"
- "What else did you look at? What made you walk away from it?"
- "What did you stop doing once you started using this?"
- "What almost stopped you from buying?"

**Ask about the energy, not the reasons.** Reasons are constructed after the fact; energy is
remembered.

### Anti-probes

| Anti-probe | Why it fails |
|---|---|
| "Why did you buy it?" | Invites a rationalization constructed after the fact — coherent, confident, assembled at the moment of asking |
| "What features matter most to you?" | Invites a wish list about a hypothetical future, not a history of a real past |
| "Would you recommend it?" | Opinion with no timeline attached |

Each produces a fluent answer with no evidentiary value, which is what makes them dangerous rather
than merely useless. If one slips out, log it and quarantine the answer that followed.

**Use when:** you need to know why customers bought, why they left, or what they rejected.
**Do NOT use when:** you need continuous discovery cadence and opportunity trees (route to
`@discovery-lead`); you need usability findings (route to `@ux-design-expert`); you need
willingness-to-pay (route to `@pricing-strategist`); you need a statistically powered read (route to
`@experimentation-lead`). The switch interview is a causal history, not a measurement instrument,
and five of them establish a mechanism, not a magnitude.

---

## 8. The Job Statement

**Scaffold.** `When {circumstance}, I want to {motivation}, so I can {expected progress}.`

**Attribution.** The "when / I want to / so I can" scaffold is a JTBD community convention; the
substance — circumstance, motivation, progress — is Christensen's. Form serves substance: a
statement that fits the scaffold and names your product is still a product description.

**Rules.**

1. Contains no product, feature or technology name
2. Names a circumstance with a trigger, not a role or a demographic
3. Describes progress, not an activity
4. Remains true if your product category disappears
5. Every clause traceable to a switch interview transcript

**Dimensions addendum.** State functional, social and emotional dimensions separately beneath the
statement, each with its evidence.

**Two tests.**

- **Durability** — would this still be true if the product category vanished entirely? If not, it
  is a solution description.
- **Attribute** — could two people sharing any attribute in the statement be in opposite
  circumstances? If yes, replace the attribute with the circumstance doing the causal work.

**Outcome variant.** Anthony W. Ulwick, *Jobs to Be Done: Theory to Practice* (2016), adds
desired-outcome statements of the form "minimize the time it takes to {step}" as measurable success
criteria. Compatible with the above, and used when the job needs metrics.

**Use when:** the organisation needs one durable statement of what customers are hiring for, usable
as input to `@pm` and `@discovery-lead`.
**Do NOT use when:** it would become a build instruction. Jobs inform stories, they do not replace
them. A validated job plus its forces analysis is an input, never a direct order to build. Also do
not use the outcome variant as the primary statement — a metric is not a job, and instrumenting an
unstated job measures the wrong thing precisely.

---

## 9. The Job Spec

**Contents.** [Christensen, Hall, Dillon, Duncan, "Know Your Customers' Jobs to Be Done", *HBR*
(September 2016)]

1. The job statement itself
2. Functional, social and emotional dimensions with evidence
3. **Hiring criteria** — what must be true for the customer to hire
4. **Firing criteria** — what makes them stop
5. **Obstacles** — what stands between the struggling moment and the hire
6. **Required experiences** — what the customer must experience for the job to be done
7. **Competitive set by job**, including non-consumption

**Purpose.** The organisation integrates its processes and experiences around the job, and that
integration is what competitors cannot copy.

**Use when:** a job is evidenced and ready to become epic-level requirements input for `@pm`; when
deciding what experiences must exist rather than what features must ship.
**Do NOT use when:** the underlying statement has not passed PRD-CL-003. A job spec built on an
unevidenced statement multiplies the invention across seven sections. Also do not use it as a PRD —
epic framing and requirements belong to `@pm`, story drafting to `@sm`.

---

## 10. Competition by Job

**Principle.** The competitive set is whatever else gets hired for the same job, regardless of
category. Category is a supply-side convenience; the job is the demand-side reality.

**Classes to include.**

| Class | Examples | Typically omitted? |
|---|---|---|
| Same-category vendors | Direct competitors | No — usually the only class present |
| Adjacent categories hired for the same job | A BI tool the data team already owns | Often |
| Manual workarounds | Spreadsheets, documents, internal tools | Usually |
| Human alternatives | An agency, a contractor, a colleague | Usually |
| **Non-consumption** | Doing nothing and tolerating the struggle | Almost always |

**Non-consumption is usually the largest competitor and is on no market map**, because no vendor
reports revenue from it. If it was not raised in an interview, ask explicitly before the call ends.
"Was doing nothing an option? For how long was it the option? What ended it?"

**A competitor analysis listing only same-category vendors is incomplete by construction.** It is a
supplier list.

**Use when:** rebuilding a competitive set from switch interview evidence; explaining why a feature
race is being lost to a spreadsheet.
**Do NOT use when:** the question is category narrative, frame of reference or messaging — that is
`@positioning-lead`. Do not use it to size a market either: interview frequency (`{n} of {N}`)
establishes that an alternative exists and gets hired, not how many people hire it. Sizing
non-consumption is `@analyst`.

---

## 11. Causality Discipline and Falsifiability

| | Correlation | Causation |
|---|---|---|
| **What it is** | Attributes of buyers that co-occur with purchase | The circumstance and forces that produced the purchase on that date |
| **Answers** | Who bought | Why they bought, and why then |
| **Useful for** | Targeting spend | Deciding what to build |

**The error pattern.** Treating a correlated attribute as an explanation, then building for the
attribute. Produces products aimed at an average customer who does not exist — and the average
customer buys nothing, because the average customer does not exist.

**A correlation is not a defect.** "Segment X converts three times better" is real and useful; it
tells you where to spend acquisition budget. The damage is the statistic promoted to an explanation
and then used to aim a roadmap.

**Falsifiability.** Every causal claim must state what evidence would overturn it. A job statement
that no interview could contradict is not a finding.

A usable falsification condition:
- names observable evidence, not a general possibility of error
- could discriminate between this claim and a competing one
- describes where that evidence would show up and who would see it

Shapes that work: "If switchers consistently report the search beginning without {trigger}, the
circumstance named here is not the cause." / "If the anxiety-reduction intervention ships and
time-to-purchase does not shorten for this circumstance, the claim is wrong."

**Constitution Article IV — No Invention.** Every clause of a job statement traces to a switch
interview transcript ID or a named source. No job is inferred from a brainstorm. An inferred job
with no transcript behind it is invention, however plausible it reads.

**Usage data cannot produce a job statement.** It shows what people did inside your product. The
struggling moment, the rejected alternatives and the anxiety that nearly stopped the purchase all
happened outside it and leave no trace in telemetry. Usage data is excellent for measuring whether
a stated job is being satisfied; it cannot produce the statement.

**Use when:** auditing any claim about why customers bought; before any evidence is used to justify
a build.
**Do NOT use when:** the claim is honestly labelled as correlational and honestly used for spend
allocation. Relabel, do not delete. Applying causal discipline to a targeting artifact and then
deleting it destroys something useful to fix a problem it did not have.

---

## 12. Sources

**Primary — Christensen.**

| Work | Authors | Year | Used for |
|---|---|---|---|
| *Competing Against Luck: The Story of Innovation and Customer Choice* | Clayton M. Christensen, Taddy Hall, Karen Dillon, David S. Duncan | 2016 | Core theory: job as progress in a circumstance, hiring and firing, job dimensions, the milkshake case |
| *The Innovator's Solution* (jobs chapter) | Clayton M. Christensen, Michael E. Raynor | 2003 | Circumstance-based versus attribute-based market segmentation |
| "Marketing Malpractice: The Cause and the Cure", *Harvard Business Review* | Clayton M. Christensen, Scott Cook, Taddy Hall | 2005 | The drift from job-defined markets to attribute data, and why it happens |
| "Know Your Customers' Jobs to Be Done", *Harvard Business Review* | Clayton M. Christensen, Taddy Hall, Karen Dillon, David S. Duncan | September 2016 | Job definition, job spec, integrating the organization around the job |

**Adjacent — named when used.**

| Work | Author | Year | Used for |
|---|---|---|---|
| *Demand-Side Sales 101: Stop Selling and Help Your Customers Make Progress* | Bob Moesta (with Greg Engle) | 2020 | Switch interview method, four forces of progress, timeline reconstruction. The switch interview and four forces were developed by Bob Moesta and Chris Spiek within the JTBD tradition |
| *Jobs to Be Done: Theory to Practice* | Anthony W. Ulwick | 2016 | Outcome-driven job statements, desired-outcome metrics, job step mapping |
| *When Coffee and Kale Compete* | Alan Klement | 2016 | Job-as-progress framing, competition across category boundaries |

**Citation rules for this squad.**

- Christensen is cited with the full coauthor set, never as a lone author of the 2016 or 2005 works.
- Adjacent sources are named when their frames are used, so a borrowed frame is never presented as
  Christensen's.
- `@jobs-analyst` (Plumb) is a specialist applying these methods, and does not imply endorsement —
  cite the work and move on.
- Never invent a citation, title, author, year, chapter or statistic. Where a numeric detail is
  unverified, describe the mechanism without the number and mark it `[verify against source]`.

---

## 13. Boundary

This reference informs decisions about *what* to build and for *whom*, and nothing else.

| Question | Owner |
|---|---|
| Why did they buy, what did they fire, which force is binding | `@jobs-analyst` (this reference) |
| Opportunity trees, continuous interview cadence, assumption tests | `@discovery-lead` |
| Frame of reference, category, competitive alternatives as narrative | `@positioning-lead` |
| Willingness to pay, value metric, packaging | `@pricing-strategist` |
| Hypothesis design, power, guardrails, readout | `@experimentation-lead` |
| Portfolio bets, focus, market entry | `@product-strategist` |
| Market definition conflicts above the analyst level | `@products-chief` |
| Epics, PRDs, requirements | `@pm` |
| Story drafting | `@sm` |
| Story validation, backlog priority | `@po` |
| Implementation | `@dev` |
| Tests and quality gates | `@qa` |
| Interface design and flows | `@ux-design-expert` |
| System design, feasibility | `@architect` |
| Deep market or non-consumption sizing | `@analyst` |
| Git push, PRs, MCP, CI/CD | `@devops` — exclusive, no exceptions |

## Related

- Agent: `squads/products/agents/jobs-analyst.md`
- Tasks: `squads/products/tasks/run-switch-interview.md`,
  `squads/products/tasks/write-job-statement.md`,
  `squads/products/tasks/map-forces-of-progress.md`
- Templates: `squads/products/templates/job-statement-tmpl.yaml`,
  `squads/products/templates/switch-timeline-tmpl.yaml`,
  `squads/products/templates/forces-of-progress-tmpl.yaml`
- Checklists: `squads/products/checklists/job-statement-quality-checklist.md` (PRD-CL-003),
  `squads/products/checklists/causal-evidence-checklist.md` (PRD-CL-004)
