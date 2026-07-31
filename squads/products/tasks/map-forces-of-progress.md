---
task: Map Forces of Progress
responsavel: "@jobs-analyst"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - switch: The specific switch to analyse, identified by transcript id (required, e.g. SW-09)
  - switch_timelines: Path to the switch timeline artifacts produced by *switch-interview (required)
  - transcripts: Raw transcripts for quote-level evidence (required)
  - comparison_set: Other switch ids to compare the binding force against (optional, default: all timelines in the same job)
  - output_dir: Directory for forces artifacts (optional, default: docs/product/jobs/forces/)
Saida: |
  - forces_map: All four forces evidenced from transcript quotes, with direction and relative weight
  - binding_force: Exactly one named force identified as the constraint on this switch, with its reasoning
  - implication: What the binding force means for what to build, stated as a decision rather than an observation
  - falsification_condition: The evidence that would overturn the binding-force claim
  - unevidenced_forces: Any force with no transcript quote behind it, recorded as a gap rather than filled
Checklist:
  - "[ ] Confirm the switch is a real switch with a captured timeline, not a prospect account"
  - "[ ] Evidence push with at least one verbatim quote, or record it as unevidenced"
  - "[ ] Evidence pull with at least one verbatim quote, or record it as unevidenced"
  - "[ ] Evidence anxiety with at least one verbatim quote, or record it as unevidenced"
  - "[ ] Evidence habit with at least one verbatim quote, or record it as unevidenced"
  - "[ ] Treat habit as real value correctly perceived, not as inertia to be overcome"
  - "[ ] Apply the binding-force diagnostics to the timeline behaviour, not to opinions"
  - "[ ] Name exactly one binding force"
  - "[ ] State the implication, including what adding pull would waste if anxiety or habit is binding"
  - "[ ] State the falsification condition for the binding-force claim"
  - "[ ] Cite a transcript id and quote for every cell of the forces table"
  - "[ ] Write the forces artifact to the repository"
---

# *map-forces — Map the Four Forces of Progress

Materializes `@jobs-analyst *map-forces {switch}`.

## Purpose

Explain why one switch happened when it happened, by evidencing the two forces driving change and
the two forces resisting it, and then naming which single force is actually constraining. The
output exists to make a build decision checkable: adding pull when anxiety is binding wastes the
build, and only a named binding force prevents that.

This task analyses one switch against captured evidence. It does not run interviews
(`*switch-interview`), write the job statement (`*job-statement`), design the experiment that
tests the implication (`@experimentation-lead`), or implement anything (`@dev`).

**A forces map with no named binding force is not complete.** All four forces listed with no
constraint identified produces a tidy diagram and no decision, and the task must not be closed in
that state.

## Preconditions

1. A switch timeline artifact exists for `switch`, produced by `*switch-interview` from a person
   who actually switched. Forces cannot be mapped from a hypothetical purchase, because anxiety and
   habit only become visible against a decision that was actually made.
2. Raw transcript text is available. Every force cell requires a verbatim quote; a forces map built
   from the interviewer's summary is an interpretation of an interpretation.
3. The timeline has a deciding event, or the absence of one is recorded. If nobody can say what
   made that day different, push is weak — and that is a finding, not a blocker.
4. Usage data does not substitute for any of this. The struggling moment, the rejected
   alternatives and the anxiety that nearly stopped the purchase all happened outside the product
   and leave no trace in telemetry.

## Procedure

### Step 0 — Frame the switch

State it in one line: `{what was fired} -> {what was hired}`, plus the transcript id and the
elapsed time from first thought to purchase. Elapsed time is diagnostic on its own — a long delay
between a strong push and an eventual purchase is usually anxiety or habit spending the time.

### Step 1 — Evidence push of the situation

The struggle in the current situation. Without a push there is no search.

- **Direction:** toward change
- **Probe used:** "What happened that made you start looking? Why then and not a year earlier?"
- **Evidence required:** a verbatim quote naming a specific event with a date or a position in the
  sequence.

| Good evidence | Bad evidence and why it fails |
|---|---|
| "We missed a discrepancy for two months. My VP found it, not me." — a specific incident, attributable in time | "We needed better reporting" — a standing condition, not a push; it was equally true last year and explains no timing |
| "The audit was scheduled for the 30th" — a dated forcing event | "Management wanted efficiency" — reported motive of someone not in the interview |

If push cannot be evidenced, record it as unevidenced and note the diagnostic consequence: no
recoverable push usually means no struggling moment, which means there may be no job here yet.

### Step 2 — Evidence pull of the new solution

The attraction of the new solution and the imagined better life with it.

- **Direction:** toward change
- **Probe used:** "What did you picture yourself doing with it before you bought?"
- **Evidence required:** a quote describing what they imagined, ideally from *before* the purchase.

| Good evidence | Bad evidence and why it fails |
|---|---|
| "The demo matched our ledger format without us reformatting anything" — a specific imagined future | "It has a great feature set" — post-purchase justification and marketing vocabulary |
| "I pictured answering in the meeting instead of promising to follow up" — the progress imagined | "Everyone recommends it" — social proof, which is pull-adjacent but not the pull itself |

Watch for pull recited in the vendor's own words. When the interviewee returns the product's
marketing copy, that is a memory of the sales process, not of their own anticipation.

### Step 3 — Evidence anxiety of the new solution

Fear of the new solution — switching cost, risk of failure, learning curve, past migration scars.

- **Direction:** against change
- **Probe used:** "What worried you? What almost stopped you? What had gone wrong before?"
- **Evidence required:** a quote naming a specific fear, ideally with a prior scar attached.

| Good evidence | Bad evidence and why it fails |
|---|---|
| "If it silently mis-mapped an account I would not know until the next audit" — a named failure mode | "There's always a learning curve" — a generic statement anyone would make |
| "We abandoned two tool migrations mid-way" — a scar that explains the caution | "It was a big decision" — no mechanism, nothing actionable |

Anxiety is the most under-recorded force, because it is rarely volunteered and never appears in a
feature request. If the timeline shows a long gap between active looking and purchase with no
anxiety evidence, the interview probably missed it — record that as a gap and consider a follow-up
rather than concluding anxiety was absent.

### Step 4 — Evidence habit of the present

Attachment to the present solution. Real value, correctly perceived by the customer — not inertia
to be shamed.

- **Direction:** against change
- **Probe used:** "What did you like about how you were doing it? What did you lose by switching?"
- **Evidence required:** a quote naming what the old way did *well*.

| Good evidence | Bad evidence and why it fails |
|---|---|
| "I built that spreadsheet. I know exactly where every number comes from." — control, correctly valued | "They're resistant to change" — an attribution by someone else, and contempt disguised as analysis |
| "I lost the ability to override a line without asking anyone" — a specific loss | "Legacy process" — a label, not a value |

If habit reads as pure irrationality, the interview did not find what the old way was good at.
Something the incumbent did well is almost always the thing the new solution must preserve, and it
is frequently convertible into an asset — the old artifact becomes the verification instrument
rather than the thing being replaced.

### Step 5 — Assemble the forces table

| Force | Direction | Evidence (transcript id + verbatim quote) | Relative weight | Notes |
|---|---|---|---|---|
| **Push** of the situation | toward change | | overwhelming / adequate / weak / unevidenced | |
| **Pull** of the new solution | toward change | | overwhelming / adequate / weak / unevidenced | |
| **Anxiety** of the new solution | against change | | overwhelming / adequate / weak / unevidenced | |
| **Habit** of the present | against change | | overwhelming / adequate / weak / unevidenced | |

Weight is assigned from behaviour in the timeline — how long each stage took, what was done during
the delay, what nearly stopped the purchase — not from how emphatically the interviewee spoke.
Volume in an interview correlates with articulacy, not with force.

Switching occurs when push plus pull exceeds anxiety plus habit. This is a directional statement
about the mechanism, not an arithmetic model: do not score the forces numerically and sum them.
The equation earns its keep by insisting that two of the four forces resist, which is the half
that product work routinely ignores.

### Step 6 — Name the binding force

Apply the diagnostics to observed behaviour:

| Observed in the timeline | Binding force |
|---|---|
| They want it, understand it, and still do not move | Anxiety or habit — separate them with step 7 |
| They cannot articulate why today rather than last year | Push is weak; there is no struggling moment |
| They love the demo and never start | Anxiety of the new solution — switching cost, risk, learning curve |
| They start and revert within a month | Habit of the present was undervalued |
| Strong push, no clear pull | They will hire something, but not necessarily you |
| Long delay between active looking and purchase, spent verifying | Anxiety — the delay was bought, not wasted |

**Name exactly one force.** If two look co-binding, choose the one whose removal would have
changed the outcome soonest, and record the second as the next constraint. "Anxiety and habit,
both" is a refusal to decide, and it produces no build implication.

Separating anxiety from habit when both resist: anxiety is about the new thing and points forward
("what if it breaks"); habit is about the old thing and points backward ("I liked knowing where
every number came from"). If the interviewee spent the delay *investigating the new solution*, the
binding force is anxiety. If they spent it *continuing to use the old one comfortably*, it is
habit.

### Step 7 — State the implication as a decision

Convert the binding force into what should be built, and state explicitly what would be wasted by
the default alternative.

| Binding force | What actually moves it | What is wasted if ignored |
|---|---|---|
| Push (weak) | Nothing you build. Find the circumstance where the struggle exists, or accept there is no job here yet | Every feature, because there is no search to win |
| Pull (weak, push strong) | Make the imagined better life concrete and specific to their circumstance | Discounting; they will hire something regardless, just not you |
| Anxiety | Reduce risk of the switch: verification, reversibility, guarantees, migration support, a way to check the new against the old | **Every added feature. Adding pull when anxiety is binding wastes the build** — the feature answers a question nobody was asking |
| Habit | Preserve what the old way did well, or convert it into an asset rather than replacing it | Any campaign framing the incumbent as irrational; it insults a correct perception and hardens the habit |

Most product work adds pull and ignores anxiety. Reducing anxiety is often cheaper and more
decisive than adding features, and it is almost never what a feature request asks for — which is
precisely why the binding force has to be named before the roadmap conversation, not after.

State the implication as one sentence of the form: *because {binding force} is binding for
{switch}, build {intervention} rather than {default}*.

### Step 8 — State the falsification condition

Write what evidence would overturn the binding-force claim. A forces map that no interview could
contradict is not a finding.

Example shapes:

- "If switchers with the same push and no verification concern still take eleven weeks, anxiety is
  not the binding force here."
- "If the anxiety-reduction intervention ships and time-to-purchase does not shorten for this
  circumstance, the claim is wrong."

Hand the second shape to `@experimentation-lead` if it needs statistical design. Do not design the
experiment here.

### Step 9 — Compare across switches, then write the artifact

Compare the binding force against `comparison_set`. A binding force appearing in one of five
switches is one person's constraint; the same force across four of five is a pattern worth
building against. Record the count as `{n} of {N} switches`, and never generalise from a single
timeline.

Where different switches in the same job have different binding forces, that usually means two
circumstances are being treated as one. Note it and route to `*circumstance-map`.

Create `output_dir` if absent. Write `forces-{SW-NN}-{slug}.md` using
`squads/products/templates/forces-of-progress-tmpl.yaml`, containing the forces table with quotes,
the binding force with its reasoning, the implication, the cross-switch count, the falsification
condition and any unevidenced forces recorded as gaps.

## Acceptance Criteria

- The switch is a real switch with a captured timeline; no forces map is built from prospect
  speculation.
- All four forces are addressed, each either evidenced with a transcript id and verbatim quote or
  explicitly recorded as unevidenced.
- No force cell is filled by inference. An unevidenced force is a gap, not an estimate
  (Constitution Article IV — No Invention).
- Habit is stated as real value correctly perceived, not as inertia or resistance to change.
- Relative weight is justified from timeline behaviour, not from interview emphasis.
- **Exactly one binding force is named.** The task is not complete without it.
- The reasoning connecting observed behaviour to the binding force is written down and checkable.
- The implication is stated as a build decision, naming what the default alternative would waste.
- Where anxiety or habit is binding, the artifact states explicitly that adding pull would not move
  the constraint.
- A falsification condition is stated for the binding-force claim.
- Cross-switch frequency is recorded as `{n} of {N}`, and no pattern is claimed from one timeline.
- The forces artifact exists in the repository.
- No job statement, opportunity tree, positioning, price, experiment design or story was produced
  by this task.

## Handoff

| Destination | Condition |
|---|---|
| `*switch-interview` (this agent) | A force is unevidenced and needs a follow-up interview to recover it |
| `*job-statement` (this agent) | The forces are mapped and the job needs stating, solution-free and cited |
| `*circumstance-map` (this agent) | Different switches in the same job have different binding forces |
| `@experimentation-lead` | The anxiety-reduction or pull bet needs a live test with statistical design, power and guardrails |
| `@ux-design-expert` | The anxiety-reduction intervention is an interaction design problem |
| `@discovery-lead` | The implication needs assumption mapping and an opportunity solution tree |
| `@positioning-lead` | The pull failure is a frame-of-reference problem rather than a product problem |
| `@pricing-strategist` | The anxiety is commercial — price risk, commitment length, or the fired alternative was free |
| `@product-strategist` | The binding force implies a different portfolio bet or a market the company is not in |
| `@products-chief` | The finding contradicts the squad's stated market definition |
| `@analyst` | Sizing the affected population requires research beyond interview evidence |
| `@architect` | The required intervention needs a feasibility assessment |
| `@pm` | A validated job spec is ready to become epic-level requirements |
| `@sm` | Story drafting — outside this squad, never produced here |
| `@dev`, `@qa` | Implementation and testing — outside this squad |
| `@devops` | Git push, PRs, CI/CD — exclusive authority, no exceptions |

## Method attribution

The theory applied here is published work, cited so it can be checked at the source.

- Bob Moesta with Greg Engle, *Demand-Side Sales 101: Stop Selling and Help Your Customers Make
  Progress* (2020) — the four forces of progress and the switch interview method. The four forces
  framing was developed by Bob Moesta and Chris Spiek within the JTBD tradition and is used here
  with attribution alongside Christensen's theory.
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
- Capture template: `squads/products/templates/forces-of-progress-tmpl.yaml`
- Evidence source: `squads/products/tasks/run-switch-interview.md`
- Downstream statement: `squads/products/tasks/write-job-statement.md`
- Evidence gate: `squads/products/checklists/causal-evidence-checklist.md`
- Theory reference: `squads/products/data/jtbd-reference.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
