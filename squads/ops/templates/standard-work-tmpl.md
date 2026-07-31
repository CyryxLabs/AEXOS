# Standard Work — [TASK_NAME]

**Template ID:** OPS-TMPL-007
**Produced by:** `@ops:lean-lead` (Kaizen) — `*standard-work`
**Artifact type:** The current best known way this task is performed. A baseline, written to be
replaced.
**Version:** v[n] · **Author:** [name] · **Owner:** [team] · **Supersedes:** [v n-1 or "none"]

[[LLM: FILLING THIS TEMPLATE

Write the way the task is ACTUALLY performed today, including the parts nobody is proud of. A
standard describing an idealized process is not a baseline — it is a second documented process that
diverges from reality, which is the problem this artifact exists to fix.

Known failure points (Section 2) are the point of the document. A step with a counted failure rate
is the first candidate for an improvement cycle. A standard with no failure points recorded has not
been observed, only imagined.

Where the task hands off to @devops, @dev, @qa or any other agent, the standard STOPS at the
boundary. Do not describe work this squad does not do.]]

---

## 0. What this document is

| It is | It is not |
|---|---|
| The current best known way, written down | A permanent rule |
| A baseline so the next change can be evaluated | A specification of how the task ought to be done |
| Expected to be replaced | Something to defend |

> Without a written standard there is no improvement, only change with an opinion about it. If
> nobody can say how the work is currently done, there is no baseline to improve from and no way to
> detect erosion. [This position belongs to the **broader lean tradition** and to standard TPS
> practice; it is labelled as tradition and is not attributed to Ohno's book.]

A standard defended rather than revised has become the waste it was meant to remove.

---

## 1. Scope

| Field | Value |
|---|---|
| Task | [what] |
| Performed by | [role] |
| Trigger | [what causes this task to start] |
| Frequency | [n per week/month] |
| Total expected duration | [t] |
| Observed from | [n occurrences, dates] / **UNVERIFIED — written from recollection** |
| Boundary | This standard ends at [step n]. Everything after it is [agent]'s. |

---

## 2. The steps

| # | Step | Expected duration | Known failure point | Observed frequency |
|---|---|---|---|---|
| 1 | [what is done] | [t] | [what goes wrong here] | [n of m occurrences] |
| 2 | | | | |
| 3 | | | — | — |
| n | Hand to [`@devops` / `@dev` / `@qa`] for [what] | — | — | — |

**Total expected: [t].**

**Failure points ranked by counted occurrence:**

| Rank | Step | Failure | Occurrences | Candidate countermeasure |
|---|---|---|---|---|
| 1 | [#] | [what] | [n of m] | [condition-level, not "be careful"] |
| 2 | | | | |

These are the inputs to `*kaizen-cycle`. A failure point with a count is an improvement target; a
failure point described as "sometimes people forget" is a symptom that has not been rooted yet — run
`*five-whys` on it first.

---

## 3. Boundary steps — where this standard hands off

| Step | Handed to | Why it is not described here |
|---|---|---|
| [e.g. publication] | **`@devops`** | Release, publication and pipeline actions are their exclusive authority. This standard stops at the handoff deliberately rather than describing work this squad does not perform. |
| [e.g. verification] | `@qa` | Gate scope and test strategy are theirs. |
| [e.g. implementation] | `@dev` | |

Describing another agent's work inside a standard is how a document starts to read as an
instruction. The handoff row is the correct level of detail.

---

## 4. Inputs and outputs

| Field | Value |
|---|---|
| Required inputs | [list — and what happens when each is missing] |
| Produced outputs | [list, with where each is persisted] |
| Persisted where | [versioned file path — Constitution Article I, CLI First] |

---

## 5. Deviations observed

| Deviation | How often | Why it happens | Verdict |
|---|---|---|---|
| [an undocumented shortcut] | [n of m] | [condition that makes it rational] | Absorb into the standard / remove the condition / leave and monitor |

A deviation performed by most people most of the time is not non-compliance. It is evidence that the
written standard is wrong, and the correct response is usually to change the standard.

---

## 6. Improvement record

| Version | Date | What changed | Why | Evidence it worked |
|---|---|---|---|---|
| v1 | [date] | Initial baseline | — | — |
| v2 | | | | [the check that confirmed or rejected it] |

Every revision states the evidence that confirmed or rejected the change. A revision with no check
attached is a change with an opinion about it.

---

## 7. Review

| Field | Value |
|---|---|
| Review date | [+1 quarter, or on the next failure-point recurrence] |
| Retire this standard when | The task no longer exists, or the condition it works around is removed |
| Erosion signal | Deviations in Section 5 growing without the standard being revised |

---

## Attribution

The framework is the Toyota Production System as documented by Taiichi Ohno in *Toyota Production
System: Beyond Large-Scale Production* (Japanese 1978; English translation 1988). Applied with
attribution; the `@ops:lean-lead` persona name refers to the practice of continuous improvement
rather than to any author.

The specific position that **improvement requires a written standard** is standard TPS practice
within the **broader lean tradition**. It is labelled as tradition here and is not attributed to
Ohno's book.

## Related

- Waste evidence: `squads/ops/templates/value-stream-walk-tmpl.md`
- Stop rule: `squads/ops/templates/andon-policy-tmpl.md`
- Countermeasure quality bar: `squads/ops/checklists/countermeasure-quality-checklist.md`
- Waste categories and five-why discipline: `squads/ops/data/waste-catalog.yaml`
