# Value Stream Walk — [PROCESS_NAME]

**Template ID:** OPS-TMPL-005
**Produced by:** `@ops:lean-lead` (Kaizen) — `*waste-walk`, `*value-time`, `*handoff-count`
**Artifact type:** Observation record and waste register. Versioned markdown in the repository.
**Owner:** [named person] · **Walk dates:** [dates] · **Occurrences observed:** [n]

[[LLM: FILLING THIS TEMPLATE

This document records what was OBSERVED. Not what the process document says, and not what anyone
remembers. Section 1 exists to force the distinction, and Section 4 exists because the gap between
the two is usually the finding.

Do not fill Section 2 from a diagram. If the process was not walked, say so at the top of the
document and mark every timing UNVERIFIED. A waste claim built on a drawing is a guess about a
process that may not exist as drawn. Constitution Article IV — No Invention.

Every waste gets a category. "Inefficiency" has no countermeasure; a named waste has a known one.

Findings that touch the build, the pipeline, a merge block or the release path leave this document
as findings addressed to @devops. They are never enacted here.]]

---

## 0. Boundary

| This document produces | Who acts on it |
|---|---|
| Waste register by category, with observations | — (a register is not an action) |
| Value-adding time ratio | — |
| Countermeasure proposals | Implementation → `@dev` |
| Findings about release cadence, pipeline, build or merge behaviour | **`@devops`, exclusive — decision and execution both** |
| Findings that a verification step is costly | `@qa` — as a redesign question, never as permission to remove it |
| Findings that the largest waste is a queue | `@ops:flow-lead` — queue location is a constraint question |

---

## 1. How this was observed — mandatory, first section

| Field | Value |
|---|---|
| Method | direct observation / ticket state history / interview (weakest) |
| Occurrences observed | [n] |
| Period | [dates] |
| Timings from | [system of record — name it] / recollection (**UNVERIFIED**) |
| Who was present | [roles] |
| What was NOT observed | [steps that could not be seen, and why] |

> The documented process, the remembered process and the actual process are three different things.
> This section says which one this document is about.

---

## 2. The walk

One row per step, in the order it actually happened.

| # | Step | Elapsed (median) | Value-adding? | Waste category | Observation behind the entry |
|---|---|---|---|---|---|
| 1 | [step] | [t] | yes / no / necessary-non-value | [category or —] | [what was seen or counted, e.g. "5 of 6 cases"] |
| 2 | | | | | |

**Elapsed total:** [t] · **Value-adding total:** [t] · **Value-adding fraction:** [n]%

Classification rules:

| Column value | Means |
|---|---|
| **yes** | The work the need is actually asking for |
| **necessary-non-value** | Does not add value but cannot be removed today (a legal check, a verification that catches real defects). Not waste — a cost paid to avoid a larger one. |
| **no** | Waste. Must carry a category. |

---

## 3. Waste register

| # | Waste | Category | Evidence | Elapsed cost | Attack order |
|---|---|---|---|---|---|
| W1 | [what] | Overproduction | [count or measured time] | [t] | 1 |
| W2 | | Waiting | | | |
| W3 | | Transport | | | |
| W4 | | Over-processing | | | |
| W5 | | Inventory | | | |
| W6 | | Motion | | | |
| W7 | | Defects | | | |

**Overproduction is attacked first.** It conceals the others behind the appearance of output — work
produced ahead of need generates inventory, handling and rework, and looks like productivity the
entire time it is costing you. [SOURCE: Ohno, *Toyota Production System: Beyond Large-Scale
Production*, Japanese 1978 / English translation 1988.]

Category definitions and their observable signals: `squads/ops/data/waste-catalog.yaml`.

---

## 4. Documented process versus actual process

| The documented process says | What was observed | Times the documented path was used |
|---|---|---|
| [e.g. triage escalates urgent defects directly] | [e.g. never used; nobody interviewed knew it existed] | 0 of [n] |
| [documented step] | [undocumented workaround everyone uses] | — |

**Reading:** [state plainly what this gap means. A route that exists in documentation and has been
used zero times is a paragraph, not a process.]

---

## 5. Handoffs

| # | From → To | What crosses | What is lost in the transfer | Wait introduced |
|---|---|---|---|---|
| H1 | [a → b] | [artifact] | context / ownership / fidelity / nothing | [t] |

**Handoff count:** [n] across [n] steps. Each one is a place where context is re-typed, ownership
becomes ambiguous, or the work waits for the receiver's next available slot.

---

## 6. Largest single block

| Field | Value |
|---|---|
| Largest non-value block | [step or wait] |
| Cost | [t] — [n]% of total elapsed |
| Category | [category] |
| Owned by | [this squad / **`@devops`** / `@qa` / `@po`] |
| Routed to | [agent, with what evidence] |

> If the largest block is a release window, a pipeline wait or a deploy queue, it is stated here as
> a finding and routed to **`@devops`**. It is also very likely the system constraint, which is
> `@ops:flow-lead`'s question, not this one — improving a waste that is not at the constraint changes
> nothing measurable.

---

## 7. Candidate improvement cycles

Do not propose a programme. Propose the smallest change that produces evidence within one cycle.

| # | Target waste | Countermeasure (condition, not symptom) | Adds a step? | Expected effect | Check by | Implemented by |
|---|---|---|---|---|---|---|
| K1 | [W#] | [remove the condition] | no | [measurable] | [date] | `@dev` / team |
| K2 | [W#] | [make the error self-evident] | no | | | `@dev` |

**Any countermeasure that adds a step must justify itself against removal in writing.** Adding a
check, form, review or meeting to prevent a problem is the most common way a process becomes slower
without becoming better.

**Any countermeasure that removes verification is not a countermeasure.** It moves the cost
downstream where it is larger and later. Route it to `@qa` as a redesign question.

---

## 8. Findings routed outside this squad

| Finding | Routed to | As |
|---|---|---|
| [release window is 6 of 11.5 days elapsed] | **`@devops`** | Evidence for their decision on release cadence |
| [the largest waste is a queue, not a step] | `@ops:flow-lead` | A constraint question |
| [verification step is expensive] | `@qa` | A redesign question — never a removal request |
| [a countermeasure changes agreed scope] | `@po` | Scope consequence |
| [a new standard becomes a working agreement] | `@sm` | Working agreement |

---

## Attribution

The framework applied here is the Toyota Production System as documented by Taiichi Ohno in *Toyota
Production System: Beyond Large-Scale Production*, published in Japanese in 1978 and in English
translation in 1988: the two pillars (just-in-time and jidoka), the categories of waste,
overproduction as the fundamental waste, and the practice of asking why until the answer is a
changeable condition.

`@ops:lean-lead` applies that framework with attribution. It is not Taiichi Ohno and does not speak
as him; the persona name refers to the practice of continuous improvement, not to any author.

Positions belonging to the **broader lean tradition** rather than to Ohno's book — value stream
mapping notation, the muda / mura / muri triad as commonly taught, later lean-software adaptations,
and the position that improvement requires a written standard — are labelled as **tradition** and are
not attributed to Ohno.

## Related

- Standard work artifact: `squads/ops/templates/standard-work-tmpl.md`
- Stop rule artifact: `squads/ops/templates/andon-policy-tmpl.md`
- Quality bar for countermeasures: `squads/ops/checklists/countermeasure-quality-checklist.md`
- Waste categories with observable signals: `squads/ops/data/waste-catalog.yaml`
- Task: `squads/ops/tasks/lean-waste-walk.md`
