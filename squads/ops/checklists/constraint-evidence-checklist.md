# Constraint Evidence Checklist

**Checklist ID:** OPS-CL-002
**Referenced by:** `@ops:flow-lead` (Throat)
**Applied to:** A constraint claim, before it is published, used to justify spending, or used to
argue for a change to how work is released.
**Verdict:** PASS / CONDITIONAL / REJECT — scoring in Section 8.

[[LLM: INITIALIZATION — CONSTRAINT EVIDENCE REVIEW

A constraint claim is a powerful instrument: it is the argument that justifies not improving nine
other things. That is exactly why it has to survive this checklist before anyone acts on it.

Section 1 decides everything. A constraint named from anecdote sends every subsequent decision at
the wrong step, and the resulting work will produce excellent local numbers and no change in output.

Mark [x] present and correct, [ ] missing or wrong, [N/A] with a stated reason.
Any CRITICAL failure forces REJECT regardless of score.]]

---

## 1. Is the constraint actually identified? (CRITICAL)

- [ ] **Exactly one constraint is named** (CRITICAL)
      *Fails if:* the document lists two or three "bottlenecks". Test each: does it ever starve? A
      genuine constraint is never idle waiting for input. A stage that starves is downstream of the
      real one, or is absorbing arrival variability rather than capacity.
- [ ] **The claim rests on queue evidence, state-time evidence, or a documented policy** (CRITICAL)
      *Fails if:* the evidence is "everyone says", "the team feels", or "that stage always seems
      busy". Busy is not evidence. Waiting is evidence.
- [ ] **Work accumulates in front of it and stages downstream idle**
      This is the strongest single signature. If it is absent, the claim needs a different basis and
      the document must say which.
- [ ] **It never starves** — verified against the observation window, not asserted
- [ ] **Wait-time to work-time ratio is computed per stage**, not only for the claimed constraint
- [ ] **The loudest complaint was checked and either matched or eliminated in writing**
      The step people apologize for and the step that sets throughput are frequently different, and
      the document should show that the difference was tested.
- [ ] The observation window and the number of items observed are stated
- [ ] Self-reported figures are marked **UNVERIFIED** and are not load-bearing for the conclusion

## 2. Is the system boundary right?

- [ ] The value stream is stated as from-X-to-Y, with both ends named
- [ ] What is deliberately outside the boundary is listed
- [ ] **If no queue appears anywhere and throughput is still low**, the document concludes the
      constraint is external (dependency, approval, or demand) rather than forcing an internal answer
- [ ] Where two candidates were argued, the document either eliminates one or redraws the boundary —
      it does not average them
- [ ] Delivery is defined: "throughput" counts finished and *delivered* value, not finished work
      sitting undelivered

## 3. Is the constraint classified?

- [ ] The constraint is typed: capacity / policy / skill / dependency / market
- [ ] **Policy constraints were actively looked for** — approvals, batch rules, release windows,
      handoff agreements, protective rules left over from an older bottleneck
      *This matters because policy constraints are the cheapest to remove and the hardest to see.*
      A document that only considered capacity has not looked.
- [ ] If the type is **market** (demand below capacity), the document says plainly that internal
      optimization is the wrong project
- [ ] If the type is **dependency**, the document says the boundary was drawn too small and
      identifies where it should be redrawn

## 4. Exploitation before elevation (CRITICAL)

- [ ] **Exploitation is enumerated and quantified before any elevation is proposed** (CRITICAL)
- [ ] Each consumption line inside the constraint has a share of capacity attached
- [ ] The share doing work only the constraint can do is stated explicitly
- [ ] Misrouted work, upstream-caused rework, oversized arrivals, interruption and starvation are
      each considered — or explicitly ruled out with a reason
- [ ] Recoverable capacity is totalled, and the effective post-exploitation capacity is stated
- [ ] **No elevation case appears while exploitation is incomplete** (CRITICAL)

## 5. Measures

- [ ] Every proposal is scored on **throughput, inventory and operating expense** — all three
- [ ] Proposals that improve a local metric with no stated throughput effect are rejected or
      reclassified, not accepted quietly
- [ ] **Utilization is not presented as evidence of health** (CRITICAL)
      In a system of dependent events with variation, high utilization at every step is the *cause*
      of the queues being complained about, not a sign of good performance.
- [ ] Adding capacity at a non-constraint is scored as raising inventory and expense with no
      throughput gain — not as neutral

## 6. Consequences and forward-looking discipline

- [ ] Subordination rules name the local metrics being abandoned, in writing
- [ ] Buffer target and release rule are specified, with the starve bound and the bury bound
- [ ] **Where the constraint moves next is predicted before any change is made**
- [ ] A re-check trigger and an `*inertia-check` obligation are recorded
- [ ] Rules inherited from a previous constraint are audited and dispositioned (retire / revise /
      keep, each with a reason)

## 7. Authority (CRITICAL)

- [ ] **No finding is written as an instruction to change a build, pipeline, CI configuration,
      release cadence or deployment** (CRITICAL) — those go to **`@devops`** as evidence
- [ ] **No proposal weakens, bypasses or shortens a quality gate** (CRITICAL)
      A gate finding goes to `@qa` as a redesign question. A faster path that returns defects has
      lowered throughput while raising every local speed metric.
- [ ] Sequencing implications are addressed to `@po` and `@sm` as evidence, not issued as priority
- [ ] Implementation work is routed to `@dev`
- [ ] Hiring and budget conclusions are addressed to the humans who own them
- [ ] The document contains an explicit boundary statement: it diagnoses, it does not operate

---

## 8. Scoring

**Score** = checked items / (total items − justified N/A) × 100

| Verdict | Condition |
|---|---|
| **REJECT** | Any CRITICAL item unchecked |
| **REJECT** | Score below 70% |
| **CONDITIONAL** | 70–89%, no CRITICAL failure — usable for discussion, not for spending |
| **PASS** | ≥ 90%, no CRITICAL failure |

**A CONDITIONAL constraint analysis must not be used to justify a hire, a purchase, a restructure,
or a change to how work is released.** Those decisions are exactly the ones that are expensive to
reverse when the constraint was named wrong.

## 9. Repair order

1. **Section 1** — re-run `*queue-map`. Nothing downstream is salvageable if the constraint is wrong.
2. **Section 2** — boundary, before classification.
3. **Section 3** — classification, especially the policy search.
4. **Section 4** — exploitation, before any elevation content is written.
5. **Section 7** — authority, before publication under any circumstances.
6. **Sections 5, 6** — repairable in place.

## Attribution

The tests here apply the Theory of Constraints as published by Eliyahu M. Goldratt in *The Goal: A
Process of Ongoing Improvement* (1984, written with Jeff Cox) and developed in his subsequent work:
one constraint at a time, the five focusing steps, and judgement by throughput, inventory and
operating expense rather than by local efficiency. Applied with attribution.

Buffer banding, work-in-progress limits and cumulative flow diagrams referenced in Section 6 are
later flow **convention** from other schools, not positions from *The Goal*, and are not attributed
to Goldratt.

Section 7 is an AEXOS constitutional constraint (Article II — Agent Authority).
