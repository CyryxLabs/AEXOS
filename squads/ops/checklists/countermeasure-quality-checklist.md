# Countermeasure Quality Checklist

**Checklist ID:** OPS-CL-003
**Referenced by:** `@ops:lean-lead` (Kaizen)
**Applied to:** A five-why chain and the countermeasure it produced, before the countermeasure is
proposed to anyone who could act on it.
**Verdict:** PASS / CONDITIONAL / REJECT — scoring in Section 8.

[[LLM: INITIALIZATION — COUNTERMEASURE REVIEW

Two failures here account for almost every countermeasure that does not hold.

The first: the causal chain terminated on a person. The countermeasures available at that level are
training, attention and care, and all three erode within weeks. Section 2 catches it.

The second: the countermeasure added a step. Adding a check, a form, an approval or a meeting is the
most common way a process becomes permanently slower without becoming better. Section 3 catches it.

Mark [x] present and correct, [ ] missing or wrong, [N/A] with a stated reason.
Any CRITICAL failure forces REJECT.]]

---

## 1. Was the actual process observed? (CRITICAL)

- [ ] **The finding comes from an observed process walk, a measured time, or a counted occurrence**
      (CRITICAL)
      *Fails if:* it comes from a diagram, a process document, or a discussion about the process.
      Waste asserted from a drawing is a guess about a process that may not exist as drawn.
      [Constitution Article IV — No Invention.]
- [ ] The number of occurrences observed is stated
- [ ] Timings are attributed to a system of record, or marked **UNVERIFIED**
- [ ] The divergence between the documented process and the observed one is recorded
- [ ] Steps that could not be observed are listed as such rather than filled in from assumption

## 2. Did the causal chain reach a changeable condition? (CRITICAL)

- [ ] **The chain terminates on a condition in the system that can be changed** (CRITICAL)
- [ ] **No answer in the chain names a person, their attention, their care or their memory**
      (CRITICAL)
      *If one does:* back up one level and ask the two questions that produce conditions — what made
      the error possible, and what made it consequential. Then re-run this checklist.
- [ ] "Human error", "someone forgot", "insufficient care" appear nowhere as a terminal answer
- [ ] The chain stopped at the condition rather than continuing to five out of habit
      *Five is a habit, not a quota.* A chain that reached a condition at two whys should stop at two.
- [ ] If the chain reached five and was still on symptoms, the problem statement was split rather
      than the chain being forced to a conclusion
- [ ] Each link is an answer to the previous one, not a parallel observation

## 3. Does the countermeasure act at the right level? (CRITICAL)

Preference order — a countermeasure lower on this list must justify why the ones above it were
rejected.

- [ ] **1. The condition is removed entirely** — best; removes the failure mode and a step
- [ ] **2. The process makes the error impossible or immediately self-evident** — jidoka applied
- [ ] **3. The process stops itself at detection** — the stop rule is this squad's; **the switch is
      `@devops`**
- [ ] **4. A signal surfaces the trend before the failure** — specification here, configuration
      `@devops`
- [ ] **5. A human check is added** — last resort, and the added step's cost must be stated

Then:

- [ ] **The countermeasure does not depend on a person remembering, noticing or being careful**
      (CRITICAL) — those erode; expect recurrence and plan for it now or choose differently
- [ ] **If a step was added, the document states why removal was not possible** (CRITICAL)
- [ ] **The countermeasure does not remove verification to save time** (CRITICAL)
      Removing a quality step does not delete its cost; it moves the cost downstream where it is
      larger and later. Route it to `@qa` as a redesign question.
- [ ] The countermeasure targets the condition, not the symptom the chain started from
- [ ] The countermeasure is small enough to produce evidence within one cycle

## 4. Is the waste named?

- [ ] Every waste claim carries one of the seven categories
      *Fails if:* the finding says "inefficiency", "overhead" or "friction". Those carry no
      countermeasure; a named category does.
- [ ] Overproduction was actively looked for and either found or ruled out
      *It conceals the others behind the appearance of output, which is why it is attacked first.*
- [ ] Work classified as "necessary non-value-adding" is distinguished from waste, with a reason
- [ ] Value-adding time is separated from the rest and reported as a proportion
- [ ] Anything that fits none of the seven categories triggers a re-examination of whether it is
      value-adding or whether the boundary was drawn wrong

## 5. Is there a check? (CRITICAL)

- [ ] **The evidence that would confirm the countermeasure worked is stated in advance** (CRITICAL)
- [ ] **The evidence that would show it did NOT work is also stated**
- [ ] A date for the check is set
- [ ] The check is observable without a new measurement system, or the measurement is itself part of
      the change
- [ ] A recurrence plan exists: if the problem returns, the first question is whether the
      countermeasure addressed a symptom, was never adopted, or was correct and eroded

## 6. Is there a standard?

- [ ] The current way the work is done was written down **before** the change was proposed
- [ ] The standard records expected duration and known failure points with counts
- [ ] The standard stops at the boundary with other agents rather than describing their work
- [ ] The improvement is recorded as a new version, superseding the previous one

## 7. Authority (CRITICAL)

- [ ] **No part of the countermeasure halts, blocks, gates or configures anything from this squad**
      (CRITICAL)
- [ ] **Every mechanical consequence names `@devops`** — merge blocks, pipeline holds, gates,
      release changes, build configuration, infrastructure (CRITICAL)
- [ ] A stop-the-line rule, if present, states that it is a rule and not a mechanism
- [ ] Implementation is routed to `@dev`
- [ ] Anything touching verification, gate scope or test strategy is routed to `@qa` as a question
- [ ] Anything changing agreed scope is routed to `@po`; anything becoming a team agreement to `@sm`
- [ ] If the waste is at a queue rather than a step, it is routed to `@ops:flow-lead` — removing a
      waste that is not at the constraint changes nothing measurable

---

## 8. Scoring

**Score** = checked items / (total items − justified N/A) × 100

| Verdict | Condition |
|---|---|
| **REJECT** | Any CRITICAL item unchecked |
| **REJECT** | Score below 70% |
| **CONDITIONAL** | 70–89%, no CRITICAL failure |
| **PASS** | ≥ 90%, no CRITICAL failure |

## 9. Repair order

1. **Section 2** — re-run `*five-whys`. A countermeasure built on a chain that ended at a person
   cannot be repaired; it has to be re-derived.
2. **Section 1** — walk the process if it was not walked.
3. **Section 3** — the countermeasure level.
4. **Section 7** — authority, before the proposal reaches anyone who could act on it.
5. **Sections 4, 5, 6** — repairable in place.

## Attribution

The framework is the Toyota Production System as documented by Taiichi Ohno in *Toyota Production
System: Beyond Large-Scale Production* (Japanese 1978; English translation 1988): the two pillars,
the categories of waste, overproduction as the fundamental waste, and the five-why practice — whose
worked example in the book traces a stopped machine back from a blown fuse to a missing filter on a
lubricating pump, demonstrating that the first answer explains the stop rather than the cause.

Applied with attribution.

The countermeasure preference order in Section 3, the requirement for a written standard in
Section 6, and value stream mapping notation belong to the **broader lean tradition** rather than to
Ohno's book, and are labelled as tradition rather than attributed to him.

Section 7 is an AEXOS constitutional constraint (Article II — Agent Authority).
