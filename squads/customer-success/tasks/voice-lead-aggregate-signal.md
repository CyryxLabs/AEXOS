---
task: Aggregate Customer Signal Into Weighted Themes
owner: "@voice-lead"
owner_type: agent
atomic_layer: task
Input: |
  - window: The date range being consolidated, and the equal preceding window for trend comparison (required)
  - signal_items: Items across channels, each with a date, an account reference and a channel (required)
  - channel_inventory: Which channels are in scope, and whether each is solicited or unsolicited (required)
  - collection_terms: Per channel - anonymous, confidential, or attributable - as promised at collection (required)
  - telemetry_access: Instrumented behaviour available for corroborating behavioural claims (optional)
  - exposure_bands: Account-level exposure bands, for reporting volume and exposure separately (optional)
Output: |
  - restatement_table: Each item restated as the problem it implies, with the original request kept as a source reference (persisted)
  - theme_table: Per theme - restated problem, distinct accounts, raise count, channel mix, date range, exposure band
  - strength_classification: STRONG, MODERATE or WEAK per theme, with the conditions that would raise or lower it
  - trend_read: Growing, flat or decaying against the equal preceding window
  - absence_notes: Conspicuously silent segments or roles, assessed as possible intake defects
  - register_entries: Draft entries for the theme register, each with exactly one candidate owner
Checklist:
  - "[ ] Every item carries a date, an account reference and a channel before aggregation begins"
  - "[ ] Every request restated as the problem it implies, with the original text kept only as a source reference"
  - "[ ] Deduplicated by account first; raise count retained as a separate field"
  - "[ ] Counts expressed in distinct accounts, never in mentions"
  - "[ ] Channel mix reported per theme, with solicited and unsolicited split and never pooled"
  - "[ ] Behavioural claims corroborated against telemetry where telemetry exists"
  - "[ ] Trend compared against an equal preceding window, and decay interpreted rather than ignored"
  - "[ ] Themes resting on a single account or a single channel marked WEAK regardless of intensity"
  - "[ ] Conspicuous absences examined and reported as possible intake defects"
  - "[ ] Exactly one candidate owner per theme; no priority recommendation attached to any theme"
  - "[ ] No verbatim, identifier or re-identified anonymous item present in the artifact"
  - "[ ] Theme table written to squads/customer-success/data/ with the window and next review date"
---

# *aggregate-signal

Materializes `@customer-success:voice-lead *aggregate-signal`.

Consolidate a window of customer signal across channels: restate requests as problems, deduplicate
by account, cluster into themes, and compute distinct accounts, channel mix, date range, exposure
and strength.

## Purpose

A company already receives more customer signal than it acts on, spread across channels that never
meet, expressed as solutions rather than problems, and weighted by who spoke loudest rather than by
how many were affected. This task turns that flow into evidence: problems with counts, channels,
windows and an auditable strength.

## Pre-conditions

- Every item in scope has a date, an account reference and a channel. Undated items cannot be
  trended and are excluded with the exclusion stated.
- The collection terms per channel are known. Anonymous and confidential channels constrain what
  may be aggregated and what may ever be attributed.
- The equal preceding window is identified, so trend is a comparison rather than an impression.
- If capture is inconsistent or a segment has no channel at all, run `*intake-design` first - this
  task consolidates what arrives, it does not fix what is never recorded.

## Procedure

### Step 1 - Pull the window

Collect all items in the window across channels, with dates and account references. Record which
channels were in scope and which were not, so the coverage of the read is legible.

### Step 2 - Restate every request as a problem

A request is a proposed solution in the customer's vocabulary. Restate each item as the outcome
the customer cannot achieve, and keep the original text only as a source reference in the source
system.

- Several different requests, one underlying obstruction -> one theme with several proposed
  mechanisms.
- One request, several distinct obstructions -> several themes. Splitting is more common than
  teams expect.
- A workaround description -> the problem is whatever makes the workaround necessary.
- Cannot restate without guessing -> the theme is incomplete. Mark it as a question, and interview
  via `.aexos-core/development/tasks/ux-user-research.md` before it is routed as a finding.

### Step 3 - Deduplicate by account

Collapse repeated raises from the same account into one, and retain the raise count as a separate
field. Eleven mentions from one account is one data point raised loudly.

### Step 4 - Cluster into themes

Cluster restated problems, not requests. Give each theme a problem statement that names the
outcome the customer cannot achieve.

### Step 5 - Compute the numbers per theme

Distinct accounts, raise count, channel mix, date range, and exposure band at account level.
Report volume and exposure in separate columns, always - collapsing them hides which one is
driving a decision.

Split solicited from unsolicited within the channel mix. Unsolicited signal tells you what people
cared enough to raise; solicited signal tells you what people say when asked. Both are useful; the
mixture is uninterpretable.

### Step 6 - Corroborate behavioural claims

Where a theme claims something about behaviour, check instrumented behaviour. If telemetry and
report disagree, that is not a contradiction to be resolved - both facts are real, and the gap
between them, usually a population difference, is the finding.

### Step 7 - Assign strength, with the conditions that would change it

| Strength | Criteria |
|---|---|
| STRONG | Multiple accounts, three or more channels, corroborated by instrumented behaviour, stable or growing |
| MODERATE | Multiple accounts but a single channel, or uncorroborated, or solicited-only |
| WEAK | A single account, a single channel, or strength derived from how forcefully it was expressed |

State explicitly what would raise or lower each strength. That is what makes the weighting
auditable rather than asserted. A theme raised by the largest customer's most senior stakeholder
is still WEAK evidence about the base - the exposure column carries the seniority, the account
count does not.

### Step 8 - Read the trend, including decay

Compare against the equal preceding window. A theme that stopped recurring has either been solved
or has been abandoned by the accounts that cared - and those are different facts. Verify with
telemetry or with churn status before closing it.

### Step 9 - Examine the silence

Name segments and roles producing no signal, and check their churn rate. Absence of signal is not
absence of problem: the worst-served customers are the least likely to report, and the ones who
gave up have stopped writing. Report a silent, high-churn segment as an intake defect, which is
frequently the most important finding on the page.

### Step 10 - Draft register entries with one candidate owner each

Assign exactly one candidate owner per theme using the routing table. If two owners appear to
apply, the theme is two themes - split it. Attach no priority recommendation to any theme.

| Theme class | Candidate owner |
|---|---|
| Activation friction | `@customer-success:onboarding-lead` |
| Account risk or unresolved-issue pattern | `@customer-success:retention-lead` |
| Loyalty instrument or survey loop | `@customer-success:advocacy-lead` |
| Product capability problem | `@customer-success:cs-chief`, for handoff to `@products` and `@pm` |
| Causal job question | `@products:jobs-analyst` |
| Needs a deliberate research program | `@products:discovery-lead` |
| Interaction or comprehension | `@ux-design-expert` |
| Documentation or education | The owning function, named explicitly |
| Expectation set at sale, pricing or packaging confusion | `sales` squad |
| Instrumentation gap | `@data-engineer` |

### Step 11 - Record and self-critique

Write to `squads/customer-success/data/theme-table-<yyyy-mm-dd>.md` using
`.aexos-core/development/tasks/create-doc.md` if a driver is wanted, then run
`.aexos-core/development/checklists/self-critique-checklist.md` through
`.aexos-core/development/tasks/execute-checklist.md`. Any theme without count, channels, date
range and source references is marked UNVERIFIED and is not routed.

## Customer Data Rules

Mandatory, because this task touches feedback and accounts.

- Verbatims are personal data; themes are not. Aggregate and de-identify before anything leaves the
  source system. The theme travels; the verbatim and the identifier stay where they were collected.
- Do not request or store personal data beyond what aggregation, routing and loop closure require.
  Account-level references and record ids are sufficient for every artifact this task produces.
- Honour the collection terms per channel. Anonymous feedback is never re-identified; confidential
  channels are not aggregated into attributable findings.
- Sensitive or special-category personal data is out of scope - escalate to the human owner.

## Boundaries

This task consolidates and evidences; it does not decide. It attaches no priority and no roadmap
position - that belongs to `@products` and `@pm`, and no volume of feedback overrides it. It does
not run discovery (`@products:discovery-lead`), does not conduct causal switching interviews
(`@products:jobs-analyst`), does not own the loyalty instrument (`@customer-success:advocacy-lead`),
does not score account health (`@customer-success:retention-lead`), does not design the activation
path (`@customer-success:onboarding-lead`), does not touch pricing, packaging terms or negotiation
(the `sales` squad), and produces no story, code, test or release (`@sm`, `@dev`, `@qa`,
`@devops`).

## Acceptance Criteria

- Every counted item was restated as a problem before being counted.
- Counts are distinct accounts; raise counts appear as a separate column.
- Channel mix, solicited/unsolicited split, date range and exposure band appear on every theme.
- Strength is assigned with the specific conditions that would raise or lower it.
- Behavioural claims are corroborated where telemetry exists, and gaps between report and behaviour
  are reported as findings rather than resolved by preference.
- Trend is compared against an equal window, and decay is interpreted.
- Conspicuous absences are reported as possible intake defects.
- Exactly one candidate owner per theme, with no priority attached.
- No verbatim, identifier or re-identified anonymous item appears in the artifact.
- The theme table is versioned in the repository with its window and a next review date.

## Handoff

| Destination | What is handed over |
|---|---|
| `*route-signal` (same agent) | Each theme, for packaging to exactly one owner with explicit non-claims |
| `@customer-success:onboarding-lead` | Activation friction, unreached first-value milestones, recurring stall reasons |
| `@customer-success:retention-lead` | Account risk, unresolved-issue patterns, exposure that needs health context |
| `@customer-success:advocacy-lead` | Themes concerning the loyalty instrument, survey design or the survey loop |
| `@customer-success:cs-chief` | Evidenced product problems for handoff to `@products` and `@pm`, and ambiguous ownership |
| `@products:jobs-analyst` / `@products:discovery-lead` | Themes needing a causal account or a deliberate research program |
| `sales` squad | Expectations set during the sale, pricing and packaging confusion |
| `@data-engineer` | Capture, deduplication and loop-tracking instrumentation gaps |

## References

Verified paths only:

- `squads/customer-success/squad.yaml`
- `squads/customer-success/agents/voice-lead.md`
- `.claude/CLAUDE.md`
- `.aexos-core/core-config.yaml`
- `.aexos-core/development/tasks/advanced-elicitation.md`
- `.aexos-core/development/tasks/create-doc.md`
- `.aexos-core/development/tasks/ux-user-research.md`
- `.aexos-core/development/tasks/execute-checklist.md`
- `.aexos-core/development/checklists/self-critique-checklist.md`
- `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`

## Method Attribution

The practice applied here is the practitioner discipline of voice-of-customer collection and
routing. It is a discipline rather than a single published framework, and no author, book or year
is claimed for it. Constructs with a documented source are attributed at the point of use;
constructs without one are labelled practitioner convention. Inventing an attribution would be
worse than having none.
