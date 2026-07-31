---
task: Write Job Statement
responsavel: "@jobs-analyst"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - switch_transcripts: Switch interview transcripts with ids, from people who switched in the last 60 to 90 days (required, minimum one)
  - draft_statement: An existing job statement, persona line or requirement to repair (optional, default: none)
  - fallback_sources: Recent churn interviews, closed-lost records or sales call recordings, when recent switchers are unavailable (optional)
  - existing_personas: Path to personas, segments or ICP definitions to audit against the result (optional)
  - output_dir: Directory for job artifacts (optional, default: docs/product/jobs/)
Saida: |
  - job_statement: Solution-free statement of circumstance, motivation and expected progress, every clause cited to a transcript id
  - dimensions: Functional, social and emotional dimensions stated separately, each with its evidence
  - struggling_moment: The moment that started the search, anchored in time, place and who was present
  - hire_fire_record: What was hired and what was fired, with the criteria used for each
  - falsification_condition: The evidence that would overturn the central causal claim
  - defect_log: Each defect found in the draft statement, classified and repaired
Checklist:
  - "[ ] Verify the transcripts come from actual switchers, not prospects"
  - "[ ] Reconstruct the timeline from first thought to first use for each transcript"
  - "[ ] Locate and name the struggling moment"
  - "[ ] Record what was fired, not only what was hired"
  - "[ ] Separate functional, social and emotional dimensions with evidence for each"
  - "[ ] Draft the statement using circumstance, motivation and expected progress"
  - "[ ] Strip every product, feature and technology name from the statement"
  - "[ ] Run the durability test — would it hold if the product category vanished"
  - "[ ] Cite a transcript id for every clause"
  - "[ ] State what evidence would falsify the causal claim"
  - "[ ] Write the job artifact to the repository"
---

# *job-statement — Draft or Repair a Job Statement

Materializes `@jobs-analyst *job-statement {job-or-draft}`.

## Purpose

State the progress a person is trying to make in a particular circumstance, causally and
solution-free, so the statement survives the death of the current product and can be used to
discover a better one. Separates attributes that correlate with purchase from circumstances that
caused it.

This task produces the statement and its dimensions. It does not build opportunity trees, write
messaging, set prices, design experiments, or draft stories.

## Preconditions

1. At least one switch transcript exists. A job statement written in a workshop with no transcript
   behind it is plausible, unfalsifiable, and a violation of Constitution Article IV — No
   Invention.
2. The transcripts are from people who actually switched, ideally in the last 60 to 90 days.
   Prospects speculating about a future purchase produce no timeline to reconstruct. When recent
   switchers are unavailable, use `fallback_sources` in this order of value: recent churn (which
   exposes firing criteria), closed-lost from the last quarter (which exposes anxiety and pull
   failures), then sales call recordings mined for timeline language.
3. Usage data alone is not sufficient. The struggling moment, the rejected alternatives and the
   anxiety all happened outside the product and leave no trace in telemetry.

## Procedure

### Step 0 — Diagnose the draft, if there is one

Classify every clause of `draft_statement` before repairing anything:

| Clause names | Class | Action |
|---|---|---|
| A role, demographic or firmographic | Attribute | Cut from the causal explanation; may be kept as a targeting filter, labelled as such |
| A product, feature or technology | Solution | Cut. A statement naming the product cannot discover a better one |
| An activity with no progress attached | Task | Restate as the progress that follows the activity |
| A stated preference everyone shares | Noise | Cut unless it appears verbatim in a transcript |
| A circumstance with a trigger | Circumstance | Keep |

Record each defect in `defect_log` with its class. The classification is the finding, not a
formality.

### Step 1 — Reconstruct the timeline

For each transcript, rebuild the purchase as a sequence, anchored in time, place and who was
present:

1. **First thought** — the earliest moment the idea appeared, often months before
2. **Passive looking** — aware, not searching, noticing alternatives incidentally
3. **Active looking** — deliberate search, comparison, demos
4. **Deciding event** — the specific thing that made it happen on that day
5. **Purchase** — the transaction, who was involved, what nearly stopped it
6. **First use** — whether the repeated decision to actually use it happened, and what surprised
   them

Ask about the energy, not the reasons. "When did you first think about this?" and "what made that
day different from the week before?" recover a memory. "Why did you buy it?" invites a
rationalization constructed after the fact.

### Step 2 — Name the struggling moment

Locate the moment of struggle that started the search and state it in the customer's words. If it
cannot be named from the transcript, there is no job here — there is a description of a user.
Record that and either interview again or stop.

### Step 3 — Record the hire and the fire

| Transcript | What was hired | What was fired | Hiring criteria | Firing criteria |
|---|---|---|---|---|

Always ask what was fired. The fired alternative names the real competitive set and the real
hiring criteria more honestly than any market report. Include workarounds and doing nothing —
non-consumption is usually the largest alternative and appears on no market map.

### Step 4 — Separate the dimensions

| Dimension | What it covers | Evidence (transcript id + quote) |
|---|---|---|
| Functional | The practical work to be done. Gets the product considered. | |
| Social | How the person wants to be perceived by others. Often decides the purchase. | |
| Emotional | How the person wants to feel, or stop feeling. Often decides the purchase. | |

Capturing only the functional dimension is the most common incomplete result, because it is the
one that shows up in feature requests.

### Step 5 — Draft the statement

Use the scaffold, which is a community convention serving the substance — circumstance,
motivation, expected progress:

> When {circumstance, with its trigger}, I want to {motivation}, so I can {expected progress}.

Then apply the four rules:

1. Contains no product, feature or technology name.
2. Names a circumstance with a trigger, not a role or a demographic.
3. Describes progress, not an activity.
4. Every clause traceable to a transcript.

### Step 6 — Durability test

Ask: would this statement still be true if the product category disappeared entirely? If not, it
is a solution description. Rewrite it.

Second test: could two people sharing the attribute in the statement be in opposite
circumstances? If yes, the attribute is not doing the causal work — replace it with the
circumstance that is.

### Step 7 — State the falsification condition

Write what evidence would overturn the central causal claim. A job statement that no interview
could contradict is not a finding. Example shape: "If switchers consistently report the search
beginning without {trigger}, the circumstance named here is not the cause."

### Step 8 — Write the artifact

Create `output_dir` if absent. Write `job-{slug}.md` containing: the statement, the three
dimensions with evidence, the struggling moment, the hire/fire record, the timeline summaries by
transcript id, the defect log if a draft was repaired, and the falsification condition.

If `existing_personas` was supplied, append a short annotation listing which persona lines are
attributes and which are circumstances, so the persona can keep serving media buying while the
circumstance map serves product decisions. Do not delete the persona; the two artifacts answer
different questions.

## Acceptance Criteria

- The statement contains no product, feature or technology name.
- The statement names a circumstance with a trigger, not a role or a demographic.
- The statement describes progress, not an activity.
- The statement survives the durability test.
- Functional, social and emotional dimensions are stated separately, each with a transcript
  citation.
- The struggling moment is named and anchored in time, place and who was present.
- What was fired is recorded, alongside what was hired, with criteria for each.
- Non-consumption and workarounds are explicitly assessed, not assumed away.
- Every clause of the statement cites a transcript id or a named source.
- A falsification condition is stated for the central causal claim.
- Transcripts come from actual switchers, or the fallback source used is recorded with its
  limitation.
- No opportunity tree, positioning, price, experiment or story was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@discovery-lead` | The job needs an opportunity solution tree and a weekly interview cadence to stay current |
| `@positioning-lead` | The job-defined competitive set differs from the category the product is positioned in |
| `@pricing-strategist` | Hiring criteria include a price threshold, or the fired alternative was free |
| `@experimentation-lead` | A forces hypothesis, usually an anxiety-reduction bet, needs a live test with statistical design |
| `@product-strategist` | The job implies a different portfolio bet or a market the company is not in |
| `@products-chief` | The analysis contradicts the squad's stated market definition and needs a call above the analyst level |
| `@pm` | A validated job spec is ready to become epic-level requirements |
| `@analyst` | Sizing non-consumption requires market research beyond interview evidence |
| `@ux-design-expert` | The anxiety-reduction bet is an interaction design problem |

## Method attribution

The theory applied here is published work, cited so it can be checked at the source.

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
- Bob Moesta with Greg Engle, *Demand-Side Sales 101: Stop Selling and Help Your Customers Make
  Progress* (2020) — the switch interview method and the four forces of progress.
- Anthony W. Ulwick, *Jobs to Be Done: Theory to Practice* (2016) — outcome-driven job statements
  and desired-outcome metrics, used when the job needs measurable success criteria.

`@jobs-analyst` (Plumb) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/jobs-analyst.md`
- Interview execution protocol reused for switch interviews: `.aexos-core/development/tasks/ux-user-research.md`
- Elicitation for statement refinement: `.aexos-core/development/tasks/advanced-elicitation.md`
- Competitive set input, reframed by job: `.aexos-core/product/templates/competitor-analysis-tmpl.yaml`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
