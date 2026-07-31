---
task: Run Switch Interview
responsavel: "@jobs-analyst"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - segment: The segment, cohort or account list to recruit from, stated as a circumstance where possible (required)
  - switch_window: How recently the switch must have occurred (optional, default: last 60 to 90 days)
  - recruit_source: Where the switchers come from — recent wins, recent churn, closed-lost, sales call recordings (optional, default: recent wins)
  - target_count: Number of interviews to run in this pass (optional, default: 5, which is the squad completion floor)
  - transcript_dir: Directory for raw transcripts and recordings (optional, default: docs/product/jobs/transcripts/)
  - output_dir: Directory for switch timeline artifacts (optional, default: docs/product/jobs/switches/)
Saida: |
  - switch_timelines: One timeline artifact per interview, six stages anchored in time, place and who was present
  - transcript_ids: Stable ids (SW-NN) linking every later job clause back to a specific interview
  - struggling_moments: The moment that started each search, in the interviewee's own words
  - alternatives_log: Everything considered and everything rejected per interview, including workarounds and doing nothing
  - hire_fire_records: What was hired and what was fired in each switch, with the criteria used
  - recruitment_record: Who was approached, who was excluded and why, and which fallback source was used
Checklist:
  - "[ ] Confirm every interviewee actually switched — no prospects speculating about a future purchase"
  - "[ ] Record the switch date and verify it falls inside the switch window"
  - "[ ] Record which recruit source was used and its documented limitation"
  - "[ ] Assign a stable transcript id (SW-NN) before the interview starts"
  - "[ ] Hold investigator posture — reconstruct the incident, do not administer a survey"
  - "[ ] Walk all six timeline stages: first thought, passive looking, active looking, deciding event, purchase, first use"
  - "[ ] Anchor each stage in time, place and who was present"
  - "[ ] Ask about the energy, not the reasons"
  - "[ ] Ask what else was considered and what was walked away from"
  - "[ ] Ask what was fired, including workarounds and doing nothing"
  - "[ ] Ask what almost stopped the purchase"
  - "[ ] Avoid every anti-probe, and log any that slipped in"
  - "[ ] Capture each interview into a switch timeline artifact in the repository"
---

# *switch-interview — Run a Switch Interview

Materializes `@jobs-analyst *switch-interview {segment}`.

## Purpose

Recover the causal history of one purchase from someone who actually made it, recently enough
that the sequence is still in memory. The output is a reconstructed timeline with the struggling
moment, the rejected alternatives and what was fired — the evidence base that every later job
statement, forces map and competitive set must cite.

This task collects evidence. It does not write the job statement (`*job-statement`), map the
forces (`*map-forces`), build an opportunity tree, or produce requirements. Analysis performed
during the interview contaminates the interview.

## Preconditions

1. Real switchers exist and are reachable. A switch interview is a history, and a person with no
   purchase behind them has no history to recover. Interviewing prospects about a hypothetical
   future purchase is not a switch interview at any sample size.
2. The switch is recent. The 60 to 90 day window exists because the timeline — dates, sequence,
   who said what — degrades faster than the opinion about the product. An articulate account of a
   two-year-old purchase is usually a reconstruction, not a memory.
3. If recent switchers are unavailable, use the documented fallbacks **in this order of value**,
   and record which one was used:

   | Fallback | What it recovers | What it cannot recover | Limitation to record |
   |---|---|---|---|
   | Recent churn — people who fired you | Full timeline plus firing criteria, which new buyers cannot give | The pull that originally won them, undistorted by the ending | The ending colours the retelling of the beginning |
   | Closed-lost from the last quarter | Anxiety and pull failures, the competitive set as they saw it | First use, the little hire, whether the job got done | No purchase means no deciding event to isolate |
   | Own sales call recordings | Timeline language spoken before the outcome was known | Anything the seller did not think to ask | Mined, not elicited — the six stages will have gaps |

   What does **not** substitute for any of these is a prospect describing what they would do.
4. Recording and consent are handled before the call. A switch interview depends on verbatim
   language; notes summarised from memory lose the customer's own words, which are the evidence.

## Procedure

### Step 1 — Recruit actual switchers

Build the list from `segment`, ordered by interview value:

| Who | Value | What they expose |
|---|---|---|
| Switched to us in the last 60 to 90 days | Highest | Full timeline, still recoverable |
| Switched away from us recently | Equal | Firing criteria, which buyers cannot give |
| Considered us and chose something else | High | Anxiety and pull failures |
| Never considered anything (non-consumers) | Moderate | Push weakness and non-consumption |
| Prospects speculating about a future purchase | None | Speculation, no timeline |

Record every person approached, every exclusion and the reason. Exclusions are part of the
evidence: a segment where nobody switched recently is itself a finding about push.

Assign a stable id per interview — `SW-01`, `SW-02` — **before** the call. Every clause of every
downstream artifact will cite these ids, so they must exist before the evidence does.

Target `target_count`, minimum five, because a single timeline cannot distinguish a pattern from
one person's Tuesday.

### Step 2 — Take the investigator posture

You are reconstructing an incident, not administering a survey.

| Investigator posture | Survey posture (do not do this) |
|---|---|
| Follows the sequence wherever it goes | Works through a fixed question list in order |
| Asks "and then what happened?" | Asks "on a scale of one to five" |
| Chases contradictions in dates and order | Smooths contradictions to keep rapport |
| Wants the messy specific | Wants the generalisable summary |
| Silence is a tool — lets the interviewee retrieve | Fills silence with the next question |
| Uses the interviewee's exact words back to them | Translates into product vocabulary |

Two working rules. First, never supply the word: if they are groping for the description of the
struggle, wait — the word they choose is data and the word you offer is contamination. Second,
when they jump ahead to the purchase, walk them back: "before that — when did you first think
about this at all?"

### Step 3 — Walk the six timeline stages

Reconstruct the purchase as a sequence, anchoring **each** stage in time, place and who was
present. Anchoring is what separates a recovered memory from a plausible story.

1. **First thought** — the earliest moment the idea appeared, often months before the purchase
   and rarely volunteered. "Take me back to the first time you thought about this. Where were
   you?"
2. **Passive looking** — aware but not searching; noticing alternatives incidentally. "Between
   that first thought and actually looking properly, did you notice anything? What made you
   notice it?"
3. **Active looking** — deliberate search, comparison, demos. "When did it turn into actually
   looking? What did you do first?"
4. **Deciding event** — the specific thing that made it happen on that day. "What made that day
   different from the week before?" This is the single highest-value answer in the interview.
5. **Purchase** — the transaction, who was involved, what nearly stopped it. "Who else had to say
   yes? What did they say? What almost stopped you?"
6. **First use** — whether the little hire happened, and what surprised them. "What did you
   actually do with it the first day? What did you stop doing?"

The big hire is the purchase. The little hire is the repeated decision to actually use it. A big
hire with no little hires is churn in waiting, and stage 6 is where that shows.

If a stage cannot be anchored, record it as a gap rather than filling it. An unanchored stage is
the interviewer's inference wearing the interviewee's voice.

### Step 4 — Run the energy probes

Ask about the energy, not the reasons. Reasons are constructed after the fact; energy is
remembered.

| Probe | What it recovers | When to use it |
|---|---|---|
| "Take me back to the first time you thought about this. Where were you?" | First thought, anchored in place | Open the timeline |
| "What made that day different from the week before?" | The deciding event and the push | The moment they name a date |
| "Who else was in the room? What did they say?" | Social dimension, the real decision unit | Any stage involving another person |
| "What else did you look at? What made you walk away from it?" | The competitive set, honestly | Active looking |
| "What did you stop doing once you started using this?" | What was fired | First use |
| "What almost stopped you from buying?" | Anxiety, and the near-miss that features never surface | Purchase |
| "What did you like about how you were doing it before?" | Habit as real value, not inertia | After the fire is named |

Two probes carry the causal weight. "Why then and not a year earlier?" locates the push, and
without a push there was no search. "What almost stopped you?" locates the anxiety, which is
frequently the binding force and is almost never volunteered.

### Step 5 — Avoid the anti-probes

Each of these produces a fluent answer with no evidentiary value, which is why they are dangerous
rather than merely useless.

| Anti-probe | Why it fails | Ask instead |
|---|---|---|
| "Why did you buy it?" | Invites a rationalization constructed after the fact — coherent, confident, and assembled at the moment of asking | "What happened the week before you bought it?" |
| "What features matter most to you?" | Invites a wish list about a hypothetical future, not a history of a real past | "What did you look at and walk away from? Why?" |
| "Would you recommend it?" | Opinion with no timeline attached; measures present satisfaction, not past causation | "What did you stop doing once you started using this?" |
| "Would you pay more for X?" | Speculation about a purchase that has not happened; also routes to `@pricing-strategist`, not here | "What did the thing you fired cost you?" |
| "Does our product solve your problem?" | Leading, and names the solution inside the question, which contaminates the job language | "What were you trying to get done that day?" |
| "How often do you typically...?" | Averages the behaviour and destroys the specific incident, which is the whole unit of analysis | "Walk me through the last time it happened." |

If an anti-probe slips out, log it against the transcript id and treat the answer that followed as
unusable rather than quietly keeping it.

### Step 6 — Alternatives, hire and fire

Before closing, establish the full alternative set. The rejected options define the competitive
set more honestly than any market report.

| Field | Prompt | Bad answer to watch for |
|---|---|---|
| Considered | "What else did you look at?" | Only same-category vendors — probe for spreadsheets, people, doing nothing |
| Rejected, and why | "What made you walk away from it?" | "It was expensive" with no comparison named |
| What was hired | "What did you end up going with?" | The product name with no criteria attached |
| What was fired | "What did you stop doing?" | "Nothing" — probe again; something always stops |
| Non-consumption considered | "Was doing nothing an option? For how long was it the option?" | Skipped entirely, which is the default failure |
| Hiring criteria | "What had to be true for you to go ahead?" | Feature list rather than conditions |
| Firing criteria | "What would make you stop using it?" | "If it broke" — press for the specific failure |

Non-consumption is usually the largest alternative and appears on no market map, because no vendor
reports revenue from it. If it was not raised, ask explicitly before ending the call.

### Step 7 — Capture into the switch timeline artifact

Immediately after the call, while the sequence is still fresh, write one artifact per interview
using `squads/products/templates/switch-timeline-tmpl.yaml` into `output_dir` as
`switch-{SW-NN}-{slug}.md`. Store the raw transcript in `transcript_dir` under the same id.

Capture rules:

- Verbatim quotes only for anything used as evidence. Paraphrase is the interviewer's summary and
  cannot support a causal claim.
- Mark gaps as gaps. An unanchored stage is recorded as `not recovered`, never inferred.
- Keep the interviewee's vocabulary. Translating "I got caught out in front of my VP" into
  "visibility gap" destroys the finding.
- Record the recruit source and its limitation on the artifact itself, so later readers know
  whether they are reading a win, a churn or a mined sales call.

Do not draw conclusions in the artifact. Analysis belongs to `*map-forces` and `*job-statement`,
which run against the whole set of transcripts rather than one.

## Acceptance Criteria

- Every interviewee actually switched; no prospect speculation is recorded as a switch interview.
- The switch date is recorded and falls inside `switch_window`, or the fallback source used is
  named with its limitation.
- Each interview has a stable transcript id assigned before the call, usable as a citation.
- All six timeline stages are attempted, and each recovered stage is anchored in time, place and
  who was present.
- The struggling moment is named in the interviewee's own words, not inferred by the interviewer.
- The deciding event is isolated — the answer to "what made that day different".
- Alternatives considered and rejected are recorded, including workarounds, human alternatives
  and doing nothing.
- What was fired is recorded alongside what was hired, with criteria for each.
- Non-consumption was explicitly raised, not assumed away.
- No anti-probe answer is retained as evidence; any that occurred are logged.
- Unrecovered stages are marked as gaps rather than filled by inference (Constitution Article IV
  — No Invention).
- One switch timeline artifact per interview exists in the repository.
- No job statement, forces map, opportunity tree, positioning, price, experiment or story was
  produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `*map-forces` (this agent) | Timelines are captured and the four forces need mapping per switch |
| `*job-statement` (this agent) | Enough transcripts exist to state the job, solution-free and cited |
| `@discovery-lead` | The job needs a continuous interview cadence and an opportunity solution tree |
| `@positioning-lead` | The alternatives named in interviews differ from the category the product is positioned in |
| `@pricing-strategist` | Hiring criteria include a price threshold, or the fired alternative was free |
| `@experimentation-lead` | An anxiety-reduction hypothesis from the interviews needs a live test with statistical design |
| `@product-strategist` | The switches point at a market or portfolio bet the company is not in |
| `@products-chief` | The evidence contradicts the squad's stated market definition |
| `@analyst` | Sizing non-consumption requires market research beyond interview evidence |
| `@ux-design-expert` | The anxiety surfaced is an interaction design problem |
| `@pm` | A validated job spec is ready to become epic-level requirements |
| `@sm` | Story drafting — outside this squad, never produced here |
| `@devops` | Git push, PRs, CI/CD — exclusive authority, no exceptions |

## Method attribution

The theory applied here is published work, cited so it can be checked at the source.

- Bob Moesta with Greg Engle, *Demand-Side Sales 101: Stop Selling and Help Your Customers Make
  Progress* (2020) — the switch interview method, timeline reconstruction and the four forces of
  progress. The interview method was developed by Bob Moesta and Chris Spiek within the JTBD
  tradition.
- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, *Competing Against Luck:
  The Story of Innovation and Customer Choice* (2016) — the job as progress in a circumstance,
  hiring and firing, the job dimensions, the milkshake case.
- Clayton M. Christensen and Michael E. Raynor, *The Innovator's Solution* (2003), jobs chapter —
  circumstance-based versus attribute-based market segmentation.
- Clayton M. Christensen, Scott Cook and Taddy Hall, "Marketing Malpractice: The Cause and the
  Cure", *Harvard Business Review* (2005) — why organizations drift to attribute data.
- Clayton M. Christensen, Taddy Hall, Karen Dillon and David S. Duncan, "Know Your Customers'
  Jobs to Be Done", *Harvard Business Review* (September 2016) — the job spec and organizational
  integration around the job.

`@jobs-analyst` (Plumb) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/jobs-analyst.md`
- Capture template: `squads/products/templates/switch-timeline-tmpl.yaml`
- Next task, forces: `squads/products/tasks/map-forces-of-progress.md`
- Next task, statement: `squads/products/tasks/write-job-statement.md`
- Evidence gate: `squads/products/checklists/causal-evidence-checklist.md`
- Theory reference: `squads/products/data/jtbd-reference.md`
- Interview execution protocol reused for switch interviews: `.aexos-core/development/tasks/ux-user-research.md`
- Elicitation techniques: `.aexos-core/development/tasks/advanced-elicitation.md`
