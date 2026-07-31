---
task: Define First Value Per Segment
owner: "@onboarding-lead"
owner_type: agent
atomic_layer: task
Input: |
  - segments: The distinct use cases or customer types in the base, with counts (required)
  - outcome_sources: Dated interviews, renewal notes or won-deal records stating the outcome bought, in the customer's words (required)
  - event_catalog: Events observable in the product today, and their instrumentation status (required)
  - retained_sample: At least ten accounts retained beyond one renewal, account ids only (optional but required for the separation test)
  - churned_early_sample: At least ten accounts churned early, account ids only (optional but required for the separation test)
Output: |
  - first_value_definitions: One binary, observable, customer-side definition per segment (persisted)
  - evidence_map: The dated source behind each outcome statement, by segment
  - instrumentation_status: Per definition - INSTRUMENTED, PARTIALLY INSTRUMENTED or UNMEASURED, with the missing event named
  - separation_test_result: Whether the definition separates retained from early-churned accounts, with counts
  - review_trigger: Review date and the conditions that force an early review
Checklist:
  - "[ ] Segments listed and confirmed to buy different outcomes, or explicitly confirmed to buy the same one"
  - "[ ] Outcome bought stated in the customer's words per segment, each traced to a dated source"
  - "[ ] Each outcome converted into a single observable event with a date and an owner of the data"
  - "[ ] Binary test passed: answerable yes or no for a given account on a given date"
  - "[ ] Customer-side test passed: the definition is not a vendor completion event"
  - "[ ] Falsifiability test passed: an account cannot reach the definition without the outcome occurring"
  - "[ ] Separation test run against retained and early-churned samples, with counts reported"
  - "[ ] Instrumentation status marked per definition, with UNMEASURED gaps named for @data-engineer"
  - "[ ] No credentials, contacts or access secrets present anywhere in the artifact"
  - "[ ] Definitions written to squads/customer-success/data/ with a review date"
---

# *define-first-value

Materializes `@customer-success:onboarding-lead *define-first-value`.

Define first value per segment as a binary, observable, customer-side outcome, and validate it
against accounts that were retained and accounts that churned early.

## Purpose

Every onboarding step is justified by the destination it leads to. Without a falsifiable
definition of first value, the path is archaeological - each step exists because something once
went wrong - and every downstream metric, including the health model, becomes a proxy for a proxy.
This task produces the destination before anyone designs the route.

## Pre-conditions

- Path design has not started, or is explicitly paused. Do not design steps while first value is
  unfalsifiable.
- At least one dated source per segment exists: an interview, a renewal note or a won-deal record
  stating what the customer bought in their own words. Undated recollection is not a source.
- The event catalog is available - what the product can observe today, and what it cannot.
- No credentials or access secrets are supplied. If access is discussed at all, only the
  prerequisite and its owner are named.

## Procedure

### Step 1 - Segment before defining

List the distinct use cases or customer types and state, per segment, whether they buy the same
outcome. If they do not, everything below runs once per segment. A single definition applied
across segments is wrong for most of the base and produces a systematically misleading activation
metric.

### Step 2 - State the outcome bought, in the customer's words

For each segment, quote the outcome in the customer's own framing, and cite the dated source. If
the only available phrasing is the vendor's ("they onboarded successfully"), mark the segment
UNSOURCED and elicit before continuing - `.aexos-core/development/tasks/advanced-elicitation.md`
drives the workshop, `.aexos-core/development/tasks/ux-user-research.md` drives the interviews.

### Step 3 - Convert the outcome into an observable event

Name the single event that exists in the system, or that can be shown to the customer, at the
moment the outcome first occurs. Prefer an event that already carries a timestamp and an account
reference.

### Step 4 - Run the four tests

| Test | Question | Fail action |
|---|---|---|
| Binary | Answerable yes or no for a given account on a given date? | Redefine; soft definitions cannot drive measurement or intervention |
| Observable | Determinable from instrumented data today, or from a record that reliably exists? | Keep, mark UNMEASURED, and name the required event |
| Customer-side | Is it the customer's outcome rather than a vendor completion event? | Reclassify as a milestone, not as first value |
| Falsifiable | Can an account reach it without the outcome actually occurring? | Must be answerable NO; otherwise redefine |

Account created, training delivered and integration connected fail the customer-side test. They
are vendor milestones.

### Step 5 - Run the historical separation test

Take at least ten retained accounts and ten accounts churned early, by account id only. Apply the
proposed definition retrospectively and report the counts in each group that met it. If the
definition does not separate the two groups, it is describing effort rather than value - return
to Step 3.

Report the counts even when they are unflattering; this comparison is more persuasive than any
argument about the definition's elegance.

### Step 6 - Mark instrumentation honestly

Per definition: INSTRUMENTED, PARTIALLY INSTRUMENTED (state the degraded form that will be used
in the interim), or UNMEASURED. Never quietly downgrade a definition to fit what is currently
collected. Raise the named event requirements for `@data-engineer`.

### Step 7 - Record with a review trigger

Write to `squads/customer-success/data/first-value-<yyyy-mm-dd>.md`, using
`.aexos-core/development/tasks/create-doc.md` if a driver is wanted. Record the definition,
segment, evidence, instrumentation status, separation counts, a review date, and the conditions
that force an early review: a new segment, a product change to the value path, or a shift in the
never-activated rate.

### Step 8 - Self-critique before release

Run `.aexos-core/development/checklists/self-critique-checklist.md` through
`.aexos-core/development/tasks/execute-checklist.md`. Anything not traceable to instrumented data,
a dated record or a dated interview is marked UNVERIFIED and does not enter the definition.

## Customer Data Rules

Mandatory, because this task touches accounts and customer statements.

- Work at account and cohort level. Samples are lists of account ids, never contact lists.
- Never handle credentials or access secrets. Where access is a prerequisite, name the
  prerequisite and the customer-side role that grants it, never the secret.
- Reference customer records; do not reproduce them. Interview notes, internal customer documents
  and transcripts stay in the authorized system; the artifact carries the finding and the record
  id.
- Never re-identify anonymous feedback used as an outcome source.
- Sensitive or special-category personal data is out of scope - escalate to the human owner.

## Boundaries

This task does not design screens, flows or copy (`@ux-design-expert`), does not implement
telemetry (`@data-engineer`), does not decide what the customer is fundamentally trying to
accomplish (`@products:jobs-analyst`), does not run a discovery program
(`@products:discovery-lead`), does not touch contract scope, implementation fees or renewal terms
(the `sales` squad), and does not produce stories, code, tests or releases (`@sm`, `@dev`, `@qa`,
`@devops`).

If the outcome promised at sale cannot be reached by any path this product supports, that is a
promise defect. Return it to `@customer-success:cs-chief` and the `sales` squad on the day it is
identified rather than absorbing it as an implementation timeline.

## Acceptance Criteria

- One definition per segment, each binary, observable and customer-side.
- Each definition fails the "reachable without the outcome" test - that is, it cannot be reached
  that way.
- Each outcome statement traces to a dated source.
- Separation test counts reported for both groups, including when the result is negative.
- Instrumentation status present on every definition, with named requirements for any gap.
- No credential, contact or access detail anywhere in the artifact.
- The artifact is versioned in the repository with a review date and early-review triggers.

## Handoff

| Destination | What is handed over |
|---|---|
| `@customer-success:retention-lead` | The definitions, so the health model is built on them rather than on convenience metrics |
| `@customer-success:advocacy-lead` | Confirmation of which segments can demonstrate value, before any account becomes a reference |
| `@customer-success:voice-lead` | Segments where non-adoption looks like a demand problem rather than a path problem |
| `@customer-success:cs-chief` | Promise defects, wrong-fit patterns, and anything crossing disciplines |
| `@data-engineer` | The named event requirements behind every UNMEASURED or PARTIALLY INSTRUMENTED definition |
| `@products:jobs-analyst` | When the outcome bought is unclear at the level of the job the customer is hiring the product to do |

## References

Verified paths only:

- `squads/customer-success/squad.yaml`
- `squads/customer-success/agents/onboarding-lead.md`
- `.claude/CLAUDE.md`
- `.aexos-core/core-config.yaml`
- `.aexos-core/development/tasks/advanced-elicitation.md`
- `.aexos-core/development/tasks/create-doc.md`
- `.aexos-core/development/tasks/ux-user-research.md`
- `.aexos-core/development/tasks/execute-checklist.md`
- `.aexos-core/development/checklists/self-critique-checklist.md`
- `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`

## Method Attribution

The practice applied here is the practitioner discipline of time-to-first-value and activation in
subscription products. It is a discipline rather than a single published framework, and no author,
book or year is claimed for it. Constructs with a documented source are attributed at the point of
use; constructs without one are labelled practitioner convention. A fabricated citation is worse
than none.
