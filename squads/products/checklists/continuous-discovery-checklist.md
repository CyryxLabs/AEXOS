# Continuous Discovery Checklist — Habit Health Gate

**Checklist ID:** PRD-CL-001
**Squad:** products
**Referenced by:** discovery-lead (Sonar)
**Materializes the gate behind:** `*discovery-health`
**Purpose:** Audit the discovery habit itself, not the artifacts it produces. Answers one
question: is this team practising continuous discovery, or running occasional research and
calling it a habit? Produces a scored verdict with a named first fix.

[[LLM: INITIALIZATION INSTRUCTIONS — CONTINUOUS DISCOVERY HEALTH

This checklist grades a practice against evidence in the repository. It does not grade intent.

EXECUTION APPROACH:
1. Gather the inputs BEFORE marking anything:
   - The cadence plan (`interview-cadence-*.md`)
   - The snapshot index and the snapshot files themselves
   - The current opportunity solution tree
   - Assumption maps and assumption test plans for the current target
   - The last eight weeks of commits or delivery records, for the traceability section
2. Mark [x] only when the repository shows it. Mark [ ] when it is absent, unverifiable, or
   asserted in conversation but not written down. Mark [N/A] only where the item genuinely
   cannot apply, and record why.
3. "The team says they do this" is a [ ]. The gate is evidence, not testimony.
4. Sections 1 and 3 contain GATE items. A failed GATE item caps the verdict regardless of the
   percentage score — see Scoring.
5. Count checked items, compute the score, assign the verdict, then name ONE first fix.

Eight weeks is the window throughout. It is long enough that one holiday week does not dominate
and short enough that the finding is still actionable.

This audit is non-destructive — it reads and reports. It does not edit the tree. Orphan
opportunities it finds are recorded here and deleted by the tree task.]]

---

## 1. Cadence — Last Eight Weeks

The habit definition applied here is Teresa Torres's: at a minimum, weekly touchpoints with
customers, by the team building the product, conducting small research activities in pursuit of a
desired product outcome. Every clause is checked separately below, because teams fail one clause
at a time.

- [ ] At least one customer touchpoint occurred in each of the last 8 weeks (GATE)
- [ ] The touchpoint count per week is recorded, not estimated from memory
- [ ] Every missed week has a named cause recorded, classified as recruiting drought, calendar
      erosion, outcome drift, delivery pressure, or filing debt
- [ ] A recurring weekly slot exists in the calendars of all three trio members
- [ ] The slot has a defined use when no participant confirms, and was not returned to the calendar
- [ ] Recruiting is automated into the product — an in-product prompt, post-transaction hook or
      support-queue handoff — rather than negotiated each week (GATE)
- [ ] The recruiting hook has a named owner who is accountable when it silently breaks
- [ ] Recruiting produced enough accepts to sustain the cadence, with the target volume recorded
- [ ] The gap between longest consecutive run of touchpoints and longest gap is recorded
- [ ] Discovery continued during delivery of the current target — the tree stayed live while the
      build ran

## 2. Trio Participation

The three roles that decide together must learn together. When one role attends and reports back,
the other two decide from a summary of a summary.

- [ ] The trio is three named people, not three role labels
- [ ] The product manager attended at least one interview in the last month
- [ ] The product designer attended at least one interview in the last month
- [ ] An engineer attended at least one interview in the last month
- [ ] At least two trio members were live on each touchpoint, with the third watching within the week
- [ ] Attendance is recorded per interview in the snapshots, not aggregated after the fact
- [ ] Interviews were not delegated wholesale to a research function or agency
- [ ] Where a research function exists, its scope is defined as bounded deep studies distinct
      from the weekly touchpoint — both modes present, neither mislabelled
- [ ] Backups are named for each trio role, and were used rather than skipping the touchpoint

## 3. Snapshot Coverage and Provenance

This is the Constitution Article IV section — No Invention. Every opportunity traces to a
snapshot or it is deleted.

- [ ] A snapshot exists for every interview conducted in the window (GATE)
- [ ] Each snapshot was filed before the following touchpoint
- [ ] Snapshot ids are unique, permanent, and were never renumbered after being cited
- [ ] A snapshot index exists and every id on the tree resolves against it (GATE)
- [ ] Every opportunity on the tree cites at least one snapshot id (GATE)
- [ ] Orphan opportunities — on the tree with no resolvable snapshot — number zero; any found are
      listed here for deletion
- [ ] Each snapshot records a specific past episode, not a summary of general behaviour
- [ ] Each snapshot carries verbatim quotes, not cleaned-up paraphrase
- [ ] Each snapshot records its recruiting source and the bias that source introduces
- [ ] The snapshot series is not dominated by one recruiting channel or one repeat participant
- [ ] Snapshots are versioned in the repository, not held in a SaaS board only

## 4. Tree Structural Validity

- [ ] An opportunity solution tree exists as a versioned file in the repository
- [ ] The root is one measurable product outcome with a baseline and a target
- [ ] The outcome is influenceable by the trio through the product; if not, it was escalated to
      `@product-strategist` and recorded
- [ ] The product outcome ladders to a stated business outcome, with the causal link written out
- [ ] Every opportunity has exactly one parent
- [ ] Sibling opportunities are distinct, not overlapping restatements of the same signal
- [ ] Vertical relationships are subsets of the parent, not steps in a process
- [ ] No node on an opportunity branch names a thing we would build
- [ ] Opportunities are written in the customer's language, not internal vocabulary
- [ ] Exactly one target opportunity is selected (GATE)
- [ ] The deferred opportunities are recorded with the condition that would bring each back — the
      tree shows what is deliberately not being pursued
- [ ] The tree is not sorted as a delivery queue

## 5. Comparison Discipline

A solution evaluated alone is always judged good enough, because there is nothing for it to lose
to.

- [ ] The target opportunity has at least three candidate solutions recorded (GATE)
- [ ] The three are genuinely distinct — they could fail for different reasons — rather than
      variants of one idea, or two options plus a straw man
- [ ] Each candidate states how it addresses the target opportunity and its main tradeoff
- [ ] The comparison is recorded against the same opportunity on the same criteria
- [ ] The chosen solution's selection reasoning is written down, not just its selection
- [ ] Rejected candidates are recorded as rejected, so they are not re-proposed as fresh ideas

## 6. Threshold Discipline

- [ ] Every leap-of-faith assumption for the chosen solution has a test plan (GATE)
- [ ] Each test plan states a pass threshold as a number and comparison, or an explicit
      categorical criterion — not "most participants"
- [ ] Each threshold was committed to the repository before the test ran, with the commit
      timestamp as the audit trail (GATE)
- [ ] Each plan states the action on pass and the action on fail, both specific
- [ ] Each plan states a stop rule for aborting a broken run
- [ ] Each plan states a fixed duration with a start and end date, not "until we have enough"
- [ ] The rubric for judging the measure was written before responses were seen
- [ ] Results are recorded against the threshold restated verbatim and unchanged
- [ ] No threshold was edited, softened or qualified after the result was seen (GATE)
- [ ] Failed tests are recorded as failed, with the decision taken
- [ ] Every test cost roughly an order of magnitude less than its solution's build cost
- [ ] No "assumption test" was a partial rollout of the real feature to a slice of traffic
- [ ] Assumptions the map classified as supported, noise or settled were not tested

## 7. Build Without Evidence

- [ ] Every item shipped in the window traces up the tree to a solution, an opportunity and the
      outcome (GATE)
- [ ] Build-without-evidence incidents in the window number zero; any found are listed with what
      was shipped and what evidence was missing
- [ ] No feature request went onto the tree as an opportunity without being traced to a story
- [ ] No opportunity was added from a workshop, a stakeholder request or a competitor's product
      without an interview behind it
- [ ] Where an untested assumption was accepted, the residual risk is recorded as accepted rather
      than left unmentioned
- [ ] Handoffs to `@pm` carried the opportunity, the snapshot ids, the comparison set and the test
      evidence — not a solution alone

## 8. Artifacts and Boundary

- [ ] Cadence plan, tree, snapshots, assumption maps and test plans are all versioned in the repo
- [ ] The next touchpoint is scheduled with a date, a named attendee and a recruiting channel
- [ ] No discovery artifact exists only in a SaaS tool — CLI First applies to discovery
- [ ] Implementation work was routed to `@dev`, not performed by this squad
- [ ] Code testing was routed to `@qa`
- [ ] Story drafting was routed to `@sm`; epic and PRD framing to `@pm`
- [ ] Commits to remote were left to `@devops` — exclusive authority, no exceptions

---

## Scoring

**Calculation:** (Checked items) / (Total items − N/A items) × 100

**GATE items** are marked (GATE) above. They are the load-bearing clauses of the habit
definition and of Constitution Article IV. A single failed GATE item caps the verdict at
NEEDS WORK regardless of the percentage. Two or more failed GATE items cap it at NOT A HABIT.

| Verdict | Score | Gate condition | Interpretation |
|---|---|---|---|
| HEALTHY HABIT | 90–100% | All GATE items pass | Continuous discovery is running. Keep the cadence and re-audit in eight weeks. |
| SUSTAINING | 80–89% | All GATE items pass | The habit holds but is eroding at the edges. Fix the weakest section before it reaches the cadence. |
| AT RISK | 70–79% | All GATE items pass | The habit is one busy quarter from stopping. Fix recruiting automation and filing debt now. |
| NEEDS WORK | 60–69%, or any 1 failed GATE | — | A clause of the habit definition is broken. Repair it before producing more artifacts. |
| NOT A HABIT | Below 60%, or 2+ failed GATE | — | This is occasional research, however good. Do not describe it as continuous discovery. Rebuild the cadence from `run-interview-cadence.md`. |

## Priority Fix Order

Fix in this order. Later items do not survive without earlier ones.

1. **Recruiting automation (section 1).** Everything downstream is starved without it, and it is
   the single failure that kills cadences in busy quarters.
2. **Snapshot filing and provenance (section 3).** Without snapshots there is no evidence, and
   the tree becomes a group opinion with structure.
3. **Threshold discipline (section 6).** Tests without pre-declared thresholds always pass and
   therefore inform nothing — they consume time and return confidence.
4. **Trio participation (section 2).** Decisions drift from evidence one delegated interview at
   a time.
5. **Tree structure and target focus (section 4).** Structural errors are cheap to fix and
   expensive to leave.
6. **Comparison discipline (section 5).** Three solutions costs an afternoon; the wrong single
   solution costs the quarter.
7. **Traceability (section 7).** The audit that proves the practice was worth running.

## First Fix

Name exactly one. A health audit that returns seven fixes returns none.

**First fix:** {the single highest item in the priority order that is failing}
**Owner:** {trio member}
**By:** {date}
**Re-audit:** {date, eight weeks out}

## Method attribution

- Teresa Torres, *Continuous Discovery Habits: Discover Products that Create Customer Value and
  Business Value* (2021) — the habit definition audited in section 1, the product trio, the
  interview snapshot, opportunity solution tree structural rules, the minimum-three solution
  comparison rule, and declaring the pass threshold before the test runs.
- David J. Bland and Alexander Osterwalder, *Testing Business Ideas* (2019) — the assumption test
  library and importance-by-evidence prioritization audited in section 6.
- Marty Cagan with Chris Jones, *EMPOWERED* (2020) and Marty Cagan, *INSPIRED*, 2nd edition
  (2018) — outcome ownership by an empowered team, and discovery running alongside delivery.
- Tomer Sharon, *Validating Product Ideas: Through Lean User Research* (2016) — research
  operations and recruiting practice audited in sections 1 and 3.

The scoring bands, GATE mechanism and priority order are AEXOS conventions, not published work.

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Cadence task: `squads/products/tasks/run-interview-cadence.md`
- Tree task: `squads/products/tasks/build-opportunity-tree.md`
- Test design task: `squads/products/tasks/design-assumption-test.md`
- Interview gate: `squads/products/checklists/interview-quality-checklist.md`
- Method reference: `squads/products/data/continuous-discovery-reference.md`
