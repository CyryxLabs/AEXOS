---
task: Read A Loyalty Measurement Wave
responsavel: "@advocacy-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - wave: The completed wave with framing declared as relationship or transactional (required)
  - sample_facts: Invited count, responded count, response rate, and composition by segment and respondent role (required)
  - responses: Scores on the eleven-point scale with response ids and dates, no identifiers (required)
  - verbatims: Open-field reasons, de-identified before they leave the survey system (required)
  - previous_wave: The comparable previous wave with its own sample facts and declared method (optional)
  - method_changes: Any change to timing, channel, wording, population or suppression since the previous wave (optional)
Saida: |
  - composition_report: Sample size, response rate and composition, reported before any score (persisted)
  - score_with_uncertainty: The net score expressed as a range for the sample size, with the underlying distribution
  - composition_attribution: Whether the movement is explained by mix before any experiential explanation
  - segment_stable_comparison: Like-for-like segment comparison whenever the aggregate moved
  - verbatim_themes: De-identified themes with counts - the finding
  - conclusion_limits: What this wave does and does not support, including the contested predictive status
  - routing_list: Each theme with exactly one destination owner
Checklist:
  - "[ ] Framing declared as relationship or transactional, and no pooling of the two"
  - "[ ] Sample size, response rate and composition reported BEFORE the score"
  - "[ ] Score reported as a range with the sampling error at this sample size, plus the underlying distribution"
  - "[ ] Composition compared against the previous wave and movement attributed to mix before experience"
  - "[ ] Segment-stable comparison provided whenever the aggregate moved"
  - "[ ] Movements smaller than the sampling error explicitly not interpreted"
  - "[ ] Verbatim themes extracted with counts and reported as the finding"
  - "[ ] Method changes since the previous wave declared in the report"
  - "[ ] Conclusion limits stated, including the contested predictive status per attribution rules"
  - "[ ] Each theme routed to exactly one owner, with no priority recommendation attached"
  - "[ ] No identified verbatim, contact or re-identified anonymous response anywhere in the artifact"
  - "[ ] Wave read written to squads/customer-success/data/ with the loop handoff recorded"
---

# *score-read

Materializes `@customer-success:advocacy-lead *score-read`.

Interpret a loyalty wave: sample and composition before the score, the score as a range,
composition-shift check, segment breakdown, and the verbatim themes that constitute the actual
finding.

## Purpose

A loyalty score moves for reasons that have nothing to do with customer experience - who was
invited, who answered, when, and through which channel. Reported alone it invites an explanation
to be invented for noise. This task forces the sample to be understood before the number, and
treats the reasons as the finding.

## Pre-conditions

- The wave is complete and its framing - relationship or transactional - is declared. Never pool
  the two; they measure different things and their mixture is uninterpretable.
- Sample facts are available: invited, responded, response rate, and composition by segment and by
  respondent role.
- Verbatims have been de-identified inside the survey system before export. Raw verbatims with
  identifiers do not enter this task.
- The confidentiality promise made at collection is known, because it binds everything downstream
  including follow-up and analysis.

## Procedure

### Step 1 - Report the sample before the score

State invited, responded, response rate, and composition by segment and respondent role. Do this
first, deliberately, so nobody forms an explanation before seeing who actually answered.

### Step 2 - Compute the score with its uncertainty

Report the net score - the percentage of promoters minus the percentage of detractors - as a range
for this sample size, not as a point value, and publish the underlying distribution alongside it.
Two very different distributions can produce the same net score.

### Step 3 - Check composition shift first

Compare composition against the previous wave: respondent role mix, segment mix, channel, timing.
If composition shifted, attribute the movement there before attributing anything to customer
experience. This is the most common cause of movement and the easiest to check.

### Step 4 - Provide a segment-stable comparison

Whenever the aggregate moved, recompute restricted to segments present in both waves. A flat
aggregate can conceal two segments moving in opposite directions, and a moving aggregate is often
pure mix.

### Step 5 - Refuse to explain noise

If the movement is smaller than the sampling error at this sample size, say so and do not explain
it. A causal story attached to randomness sends teams to fix things that did not happen.

### Step 6 - Extract the verbatim themes

Group the de-identified reasons into themes with counts, and compare against the previous wave's
themes. This is the finding. The score is an index; only the reasons can be routed, owned and
acted on.

### Step 7 - Declare method drift

Record any change to timing, channel, wording, population or suppression since the previous wave.
Undeclared drift makes the whole series uninterpretable, and the next wave will inherit the
change silently.

### Step 8 - State the conclusion limits

State what this wave supports and what it does not, per the attribution rules below, and name the
better instrument for each decision the score is being asked to carry:

| Question being asked | Right instrument |
|---|---|
| Will this account renew? | The validated health model - `@customer-success:retention-lead` |
| Is value being realized? | Instrumented outcomes - `@customer-success:retention-lead` |
| Is our growth earned? | Referral behaviour and referred-cohort retention |
| What should we fix? | The verbatim themes, routed via `@customer-success:voice-lead` |
| How do we compare with another company? | Your own series with a declared, frozen method - cross-company comparison is weak evidence |

If the score is being proposed as a target or a compensation input, state the incentive it creates
and the gaming vectors it opens: sampling, timing, channel, and prompting.

### Step 9 - Route the themes and hand over the loop

Assign exactly one owner per theme and attach no priority recommendation. Then hand the wave to
`*close-loop` - the read is not finished work until the responses are followed up.

### Step 10 - Record and self-critique

Write to `squads/customer-success/data/loyalty-wave-<yyyy-mm-dd>.md`, using
`.aexos-core/development/tasks/create-doc.md` if a driver is wanted, then run
`.aexos-core/development/checklists/self-critique-checklist.md` through
`.aexos-core/development/tasks/execute-checklist.md`.

## Customer Data Rules

Mandatory, because this task touches feedback and accounts.

- Survey responses are personal data. Store no identifier beyond what closing the loop requires.
- Never reproduce an identified verbatim in a repository artifact. Themes travel; verbatims and
  identifiers stay in the survey system, cited by response id.
- Honour the confidentiality promise made at collection. If a wave was presented as anonymous,
  those responses are never re-identified through account matching and never followed up.
- Work at account and cohort level for exposure; no individual is characterized.
- Sensitive or special-category personal data is out of scope - escalate to the human owner.
- Never game the instrument: no selective sampling, no surveying after a success moment, no
  excluding difficult segments, no coaching toward a score. Any of these invalidates the whole
  series, not just the affected wave.

## Boundaries

This task does not score renewal risk (`@customer-success:retention-lead` owns the health model),
does not own activation (`@customer-success:onboarding-lead`), does not own the cross-channel
feedback taxonomy or the route to product (`@customer-success:voice-lead`), does not answer why
customers switch causally (`@products:jobs-analyst`), does not produce case studies or campaigns
(the `marketing` squad), does not construct referral incentives, discounts or contract terms (the
`sales` squad), and does not produce stories, code, tests or releases (`@sm`, `@dev`, `@qa`,
`@devops`).

Routing a theme is not prioritizing it. The roadmap decision belongs to `@products` and `@pm`.

## Acceptance Criteria

- Composition appears before the score in the artifact, without exception.
- The score is a range with the distribution shown; no point value stands alone.
- A composition-shift check is present, and a segment-stable comparison whenever the aggregate
  moved.
- No movement below the sampling error carries an explanation.
- Verbatim themes with counts accompany the score.
- Method changes since the previous wave are declared.
- Conclusion limits, including the contested predictive status, appear in the same document as the
  result.
- Every theme has exactly one owner and no attached priority.
- No identified verbatim, contact data or re-identified anonymous response appears anywhere.

## Handoff

| Destination | What is handed over |
|---|---|
| `*close-loop` (same agent) | The wave, ordered for follow-up by severity and age; the read is incomplete until the loop runs |
| `@customer-success:voice-lead` | Verbatim themes for aggregation with support, sales and success channels, then routing |
| `@customer-success:retention-lead` | Detractors that are account risk; promoter value language as realized-value evidence |
| `@customer-success:onboarding-lead` | Themes pointing at activation friction or an unreached first-value milestone |
| `@customer-success:cs-chief` | Conflicts between a loyalty reading and a health reading of the same account |
| `@data-engineer` | Survey delivery, response storage or loop-tracking instrumentation gaps |

## References

Verified paths only:

- `squads/customer-success/squad.yaml`
- `squads/customer-success/agents/advocacy-lead.md`
- `.claude/CLAUDE.md`
- `.aexos-core/core-config.yaml`
- `.aexos-core/development/tasks/advanced-elicitation.md`
- `.aexos-core/development/tasks/create-doc.md`
- `.aexos-core/development/tasks/ux-user-research.md`
- `.aexos-core/development/tasks/execute-checklist.md`
- `.aexos-core/development/checklists/self-critique-checklist.md`
- `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`

## Method Attribution

The framework applied here is published by Fred Reichheld in *The Ultimate Question: Driving Good
Profits and True Growth* (Harvard Business School Press, 2006), developing the approach he
introduced in the *Harvard Business Review* article "The One Number You Need to Grow" (2003), and
revised as *The Ultimate Question 2.0* (2011, with Rob Markey). The constructs applied are the
recommendation question on an eleven-point scale, the promoter / passive / detractor
classification, the net score arithmetic, the good-profits versus bad-profits distinction, and the
closed-loop follow-up discipline. This task applies that framework with attribution.

Attribution limits, carried from the agent and binding on this task:

- VERIFY the exact wording of the recommendation question against the edition being followed before
  publishing it. The canonical wording varies slightly across sources and implementations.
- VERIFY current trademark attribution requirements before any external publication using the Net
  Promoter or NPS marks - they are registered trademarks associated with Bain & Company, Satmetrix
  Systems and Fred Reichheld.
- The strong claim that this single measure predicts company growth better than alternative
  satisfaction and loyalty measures is CONTESTED in the peer-reviewed marketing literature, with
  published replications reporting weaker or inconsistent performance. State the contested status
  wherever the score supports a decision. The existence of the debate is stated without attributing
  it to a particular paper; VERIFY any specific critique citation before naming it in an artifact.
- Reichheld's later work with Darci Darnell and Maureen Burns, *Winning on Purpose* (Harvard
  Business Review Press, 2021), proposes an accounting-based measure of customer-earned growth.
  VERIFY that measure's exact name and definition against the source before citing it.
- Sampling-error thresholds for reporting movements, loop latency as a first-class metric,
  reference qualification gated on realized-value evidence, and the refusal to construct commercial
  referral incentives are this agent's operating conventions, consistent with the source's premise
  but not presented as its content.
