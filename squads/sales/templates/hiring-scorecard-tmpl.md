# Hiring Scorecard — {{role}}, {{motion_or_segment}}

<!--
TEMPLATE: hiring-scorecard-tmpl.md
Squad: sales | Produced by: pipeline-ops (Conveyor) via *hiring-scorecard, *scorecard-validation
Framework: Mark Roberge, "The Sales Acceleration Formula" (2015). Applied with attribution.

THE STEP THAT MAKES THIS A FORMULA RATHER THAN A CHECKLIST
Define criteria for THIS context → score consistently → CORRELATE SCORES AGAINST ACTUAL
PERFORMANCE → revise. Without section 6, this document is a consistent checklist measuring
something nobody has shown predicts anything, with the consistency mistaken for rigour.

THE METHODOLOGY'S OWN WARNING, ENFORCED HERE
There is no universal ideal sales representative. Any published trait list — including the one
reported in the source — describes one organization's data. It is a hypothesis to validate against
our own outcomes, never a conclusion about our context, and it is never presented as our number.

FAIRNESS IS NOT AN ADD-ON
Criteria must be job-relevant and validated. Proxies for pedigree, personal similarity or cultural
comfort are removed on sight: they do not predict, they are not fair, and they concentrate a
single failure mode across an entire team.
-->

**Scorecard ID:** SCORE-{{YYYY-MM-DD}}-{{role-slug}}
**Role:** {{name}} · **Segment / motion:** {{...}}
**Version:** {{n}} · **Date:** {{date}}
**Derived from cohort:** {{which hires and which outcome data, or "initial — unvalidated"}}

---

## 1. What this job actually requires here

Written before any criterion. If this section reads like it could describe any sales role at any company, the criteria that follow will too.

| Field | Entry |
|---|---|
| Who they sell to | |
| What the buyer knows when the conversation starts | |
| Where our funnel actually leaks (from `*funnel-analysis`) | |
| What the ramp depends on | |
| What a rep must do here that they would not have to do elsewhere | |

## 2. Criteria

Each criterion states **why it is relevant here** — not why it is generally desirable.

| Criterion | Why relevant in THIS context | Evidence method | Anchor 1 | Anchor 3 | Anchor 5 |
|---|---|---|---|---|---|
| {{e.g. Coachability}} | {{our ramp depends on weekly adjustment; reps who do not change behaviour plateau at month four}} | {{give specific feedback mid-role-play; run a second attempt}} | {{repeats the same approach}} | {{incorporates partially}} | {{incorporates and extends}} |
| | | | | | |
| | | | | | |
| | | | | | |

**Evidence methods permitted:** a structured question with a defined rubric · a work sample · a role play against a briefed interviewer with a rubric · a reference check with specified questions.

**Not permitted as an evidence method:** unstructured conversation, general impression, "how they came across". Unstructured interviews measure interviewer confidence, which correlates with almost nothing about later performance.

### Coachability probe — behaviour change, not pleasant reception

- [ ] Feedback is given **during** an exercise
- [ ] A second attempt is run
- [ ] The score reflects whether the second attempt was **different**, not whether the feedback was well received

## 3. Criteria removed, and why

| Removed | Reason |
|---|---|
| {{e.g. Industry background}} | {{not correlated with any outcome in our last {{n}} hires; narrows the field for no measured gain}} |
| {{e.g. Culture fit}} | {{an unmeasurable proxy for similarity — replaced with the behavioural criteria it was standing in for}} |

- [ ] Every criterion reviewed for **job-relevance**
- [ ] Every criterion reviewed for **fairness**; no proxy for pedigree, personal similarity or cultural comfort survives
- [ ] Where a removed proxy was standing in for something real, the real thing has been named and given an evidence method

## 4. Scoring rules

- [ ] Every interviewer scores **independently before any discussion**

> Group discussion first converges on whoever speaks with most confidence, which measures the interviewer rather than the candidate.

- [ ] Anchors are behavioural, so a 3 means the same thing to every interviewer
- [ ] Each criterion is scored by at least {{n}} interviewers
- [ ] Weighting, if any, is set **before** candidates are seen: {{...}}
- [ ] The decision threshold is defined in advance: {{...}}

## 5. Provenance of these criteria

| Criterion | Source | Status |
|---|---|---|
| | our own outcome data / observed local funnel gap / **external hypothesis from a published source** | validated / **provisional — validation scheduled** |

> Any trait list from a published source informed the design of these criteria. It did not determine them, and it is not evidence about our context until our own correlation says so. *[SOURCE: Roberge, sales hiring formula — including its own warning against importing another company's answers.]*

## 6. Validation plan — the step that makes this a formula

**This section cannot be left as an intention. It carries a date.**

| Field | Entry |
|---|---|
| Outcome metric to correlate against | {{e.g. qualified opportunities created per month; attainment}} |
| Interval | {{e.g. 9 months post-start}} |
| Review date | {{an actual date}} |
| Owner of the review | {{named}} |
| Minimum cohort size before drawing conclusions | {{n}} — **and if the cohort is smaller, that is stated plainly rather than implying significance}} |

### Validation results — filled at review

| Criterion | Correlation with outcome | Cohort size (n) | Action |
|---|---|---|---|
| | | | keep / redefine / **remove** |

- [ ] Criteria with no relationship to outcomes are **removed or redefined**, not retained out of habit
- [ ] Traits present in high performers that this scorecard does not capture are identified, and an evidence method is designed for them
- [ ] The revised scorecard is re-checked for job-relevance and fairness **before** it is used
- [ ] The revision is recorded with its date and the cohort it was derived from — scorecards are versioned artifacts

## 7. Ramp linkage

| Field | Entry |
|---|---|
| Curriculum sequence | **buyer journey → sales process → product** |
| Certification gates (observable criteria, not attendance) | |
| Ramp metric measured weekly | {{qualified opportunities created → pipeline created → closed won, as tenure allows}} |
| Expected curve, derived from | **our own historical cohorts** — {{which ones}} |
| Cohort this hire will be compared against | |

- [ ] **Shadow-the-top-rep is explicitly not the training strategy.** It is unrepeatable, unmeasurable, and transmits the top performer's habits including the ones that do not generalize.

## 8. Ethics

- [ ] No criterion is a proxy for pedigree, personal similarity or cultural comfort
- [ ] Every criterion could be defended to a candidate as job-relevant
- [ ] Interview data collected is used for the hiring decision and for scorecard validation, and for nothing else
- [ ] Post-hire, any rep-level metric collected is justifiable as a coaching input and is disclosed to the person it describes
- [ ] The scorecard produces a hiring decision and a development plan, never a ranking circulated as a leaderboard

## 9. Boundary

- [ ] Compensation level, plan spend and compensation philosophy are **not set here** — a human business decision. This document may describe the behavioural consequence of a plan mechanic; it does not set the level.
- [ ] Individual deal qualification is `@sales:qualification-lead`
- [ ] Conversation design is `@sales:method-lead`
- [ ] Any ATS or reporting implementation goes to `@dev` and `@data-engineer`; `@devops` releases

---

## Scorecard self-check

- [ ] The job requirement section describes **this** context specifically
- [ ] Every criterion states why it is relevant here
- [ ] Every criterion has an evidence method and behavioural anchors
- [ ] The coachability probe requires observed behaviour change
- [ ] Proxies removed, with what they were standing in for named
- [ ] Independent scoring before discussion
- [ ] External trait lists labelled as hypotheses, never as our numbers
- [ ] The validation plan has a metric, an interval, a **date** and an owner
- [ ] Cohort sizes are stated wherever a correlation is claimed
