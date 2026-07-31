# SLO Quality Checklist

**Checklist ID:** OPS-CL-001
**Referenced by:** `@ops:reliability-lead` (Keel)
**Applied to:** A draft SLO specification or error budget policy, before it is published, quoted in
a contract, or put on a status page.
**Verdict:** PASS / CONDITIONAL / REJECT — scoring in Section 9.

[[LLM: INITIALIZATION — SLO QUALITY REVIEW

This checklist is not a formatting review. Sections 1 and 2 are the ones that decide whether the
document is measuring anything at all, and a document that fails either of them cannot be repaired
by fixing the rest — it has to go back to `*sli-select`.

Mark [x] present and correct, [ ] missing or wrong, [N/A] genuinely not applicable with a stated
reason. An unexplained [N/A] counts as [ ].

Any CRITICAL item failing forces REJECT regardless of the total score. There is no partial credit
on an unmeasurable objective and none on an unassigned consequence.]]

---

## 1. Does the indicator measure the user, or the machine? (CRITICAL)

This is the test the method actually applies, and it is the one most drafts fail.

- [ ] **Each SLI is attached to a named user journey, not to a component** (CRITICAL)
      *Fails if:* the indicator is host uptime, process liveness, container restarts, CPU health,
      "the service is running". Those read one to two nines higher than the journey the user
      experiences, because they count the process as alive while requests fail, queue or time out.
- [ ] **The indicator moves when users suffer and stays still when they do not** (CRITICAL)
      *Test it both ways:* name a failure users would notice that this indicator would not move
      for. If one exists, the indicator is incomplete — record it as a stated blind spot or replace it.
- [ ] **The valid-event denominator is defined in writing**
      *Fails if:* the ratio has no stated definition of "an attempt". Without a denominator the
      percentage is arithmetic on an undefined set.
- [ ] **Client-caused failures are handled explicitly in the denominator**
      Either excluded with a stated rule, or included with a stated reason. Silence here is the most
      common way an availability figure becomes flattering.
- [ ] **Implicit failures are considered** — a success code carrying wrong or empty content is
      named either as covered or as a stated blind spot
- [ ] **Latency separates successful from failed requests**
      Fast failures otherwise flatter the distribution and the SLI improves as the service degrades.
- [ ] **The data source is named and exists today**
      If it does not exist, the objective is marked provisional and an instrumentation request is
      routed to `@dev`.

## 2. Is the objective an objective? (CRITICAL)

- [ ] **Every objective has a target** (CRITICAL)
- [ ] **Every objective has a measurement window** (CRITICAL) — a percentage with no window is not
      a commitment, it is a mood
- [ ] **Every objective has a justification tied to user perceptibility or business cost**
      *Fails if:* the justification is "it seemed like a reasonable level", "the last team used
      this", or a round number chosen because it looked tidy.
- [ ] **No objective exists without an indicator behind it** (CRITICAL)
- [ ] **100% does not appear as a target** (CRITICAL)
- [ ] **Any contractual or regulatory floor is recorded as a floor, and the internal objective is
      set strictly above it**
- [ ] **The dependency chain is tested against the target** — an objective the weakest hard
      dependency cannot support is named as unreachable and routed to `@architect`, not asserted
- [ ] **Objectives deliberately declined are listed with their reason**

## 3. Provenance (CRITICAL — Constitution Article IV)

- [ ] **Every figure is either traced to a named data source or marked UNVERIFIED** (CRITICAL)
- [ ] **No baseline is asserted that was not measured** (CRITICAL) — an invented baseline anchors
      every subsequent target and is the most common way a reliability document becomes fiction
- [ ] Every UNVERIFIED entry carries a review date
- [ ] Where measured history does not exist, the objective is explicitly labelled provisional

## 4. Error budget

- [ ] The budget is derived arithmetically from the objective over the stated window
- [ ] Consumption is reported as **burn rate against window**, not remaining balance alone
- [ ] Deliberate spends are separated from unplanned ones
- [ ] Unplanned spends are traced to a change record, an incident ID, or marked as a traceability gap
- [ ] A window that closed with the budget untouched is flagged as a finding, not celebrated

## 5. Budget policy

- [ ] A written policy exists — a budget with no policy is decoration
- [ ] Thresholds are stated in advance, not decided at the time
- [ ] Each threshold names a **decider**
- [ ] Each consequence has an **exit condition**
- [ ] Exit conditions are stated in measurable terms, not "when things calm down"
- [ ] The policy states that urgency is not an exit condition

## 6. Authority (CRITICAL — the number one risk in this squad)

- [ ] **Every policy consequence names the agent authorized to execute it** (CRITICAL)
- [ ] **Every gate, freeze, pipeline hold, release action and monitoring change names `@devops`**
      (CRITICAL)
- [ ] No section of the document reads as an instruction for this squad to gate, configure, deploy
      or release anything
- [ ] Instrumentation work is routed to `@dev`, not written as something this squad performs
- [ ] Verification is routed to `@qa`
- [ ] The document contains an explicit boundary statement saying it decides and does not operate

> A policy whose consequences do not name their executor is not merely untidy. It is the specific
> mechanism by which someone outside `@devops` reaches for a gate they do not hold, citing a
> document this squad wrote.

## 7. Signals and alerting

- [ ] Latency, traffic, errors and saturation are each specified or explicitly declined with a reason
- [ ] Each signal states what it is computed from
- [ ] Each signal states what it would miss
- [ ] Paging is tied to user-visible symptoms and to budget burn, not to round numbers
- [ ] Every proposed page has a documented action
- [ ] Cause-level signals are routed to tickets, not to pages
- [ ] Configuration of all of the above is assigned to `@devops`

## 8. Operational load

- [ ] Work classified as toil was tested against all six parts of the definition, not asserted
- [ ] Items failing any part of the test are reclassified, not quietly retained
- [ ] Toil is quantified in hours per month, not described as "a lot"
- [ ] Total toil is expressed as a share of the rotation's capacity
- [ ] Automation is ranked by payback and routed to `@dev` for implementation, `@devops` for operation
- [ ] Incident response is not listed as toil (judgement-heavy — `@ops:incident-lead`'s domain)

---

## 9. Scoring

**Score** = checked items / (total items − justified N/A) × 100

| Verdict | Condition |
|---|---|
| **REJECT** | Any CRITICAL item unchecked, regardless of score |
| **REJECT** | Score below 70% |
| **CONDITIONAL** | 70–89% with no CRITICAL failure — publish after the listed fixes |
| **PASS** | ≥ 90% with no CRITICAL failure |

## 10. Repair order

Fixing these out of order wastes the work, because each one invalidates what was written on top of it.

1. **Section 1 failures** — go back to `*sli-select`. Everything downstream of a wrong indicator is
   precise measurement of the wrong thing.
2. **Section 3 failures** — an invented baseline must be removed or marked before targets are
   argued, or the argument is about fiction.
3. **Section 2 failures** — the objective itself.
4. **Section 6 failures** — authority, before publication under any circumstances.
5. **Sections 4, 5, 7, 8** — repairable in place.

## Attribution

The tests in Sections 1–5 and 7–8 apply the framework published in *Site Reliability Engineering*
(O'Reilly, 2016) — Ch. 3 "Embracing Risk", Ch. 4 "Service Level Objectives", Ch. 5 "Eliminating
Toil", Ch. 6 "Monitoring Distributed Systems" — and extended in *The Site Reliability Workbook*
(O'Reilly, 2018). Applied with attribution.

Section 6 is an AEXOS constitutional constraint (Article II — Agent Authority), not a position from
the source.
