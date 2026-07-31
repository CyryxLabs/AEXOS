# Subordination Rules — [VALUE_STREAM_NAME]

**Template ID:** OPS-TMPL-004
**Produced by:** `@ops:flow-lead` (Throat) — `*subordinate`, `*buffer-design`
**Artifact type:** Operating rules for non-constraint stages. Versioned markdown in the repository.
**Depends on:** A completed constraint analysis naming exactly one constraint with evidence.
**Owner:** [named person] · **Review:** [when the constraint moves, or +N windows]

[[LLM: FILLING THIS TEMPLATE

Subordination is the step teams refuse, and the refusal is always the same shape: non-constraint
stages will look underutilized, and every local metric will get worse. That is the intent, not a
side effect, and Section 3 exists so it is stated in writing rather than discovered and reversed.

Section 3 is mandatory. A subordination rule that does not name the local metric being abandoned
will be silently undone by whoever is measured on that metric.

Nothing in this document is a mechanical change. Release rules, batch policies and cadence findings
are handed to @devops, @po and @sm — they are not enacted here.]]

---

## 0. Boundary

| This document produces | Who acts on it |
|---|---|
| Operating rules per non-constraint stage | Team working agreements → `@sm` |
| Buffer size and release rule **specification** | Any change to the release path or pipeline → **`@devops`, exclusive** |
| Batch-size rules | Story sizing and drafting cadence → `@sm` · Backlog order → `@po` |
| Metrics to abandon | The reporting change itself → whoever owns the reporting |
| Findings that a gate is being starved or buried | `@qa` — as a redesign input, never as permission to weaken it |

A subordination rule is an agreement about how work is released. It is not a mechanism, and this
squad does not hold the mechanism.

---

## 1. The constraint being protected

| Field | Value |
|---|---|
| Constraint | [one step, from the constraint analysis] |
| Type | capacity / policy / skill / dependency / market |
| Source document | [path] |
| Cost of one starved hour | [derived from throughput] |
| Cost of burying it (queue ageing in front) | [lead-time effect] |

Subordination has exactly two failure modes to prevent: the constraint **starving** (idle, waiting
for input) and the constraint being **buried** (work piling in front faster than it can be worked,
ageing and generating expedite pressure). Every rule below serves one of those.

---

## 2. Rules per stage

| Stage | Rule | Prevents | Applies from |
|---|---|---|---|
| [upstream stage] | [e.g. Stop drafting beyond two windows of constraint capacity] | Burying | [date] |
| [upstream stage] | [e.g. Pull only when the buffer is below target; otherwise improve, document, reduce toil] | Burying | |
| [adjacent stage] | [e.g. Prioritize items closest to the constraint over newest arrivals] | Starving | |
| [downstream stage] | [e.g. Release in the smallest batch the release path allows] | Inventory after the constraint | — **`@devops`** owns the release path decision |

**Nothing reaches the constraint that has not passed [entry condition].** Rework arriving at the
constraint is capacity spent twice; preventing it upstream is the single largest exploitation lever
in most streams.

---

## 3. Local metrics deliberately abandoned — mandatory section

| Stage | Metric being abandoned | What it will show | Why it is being abandoned | Replaced by |
|---|---|---|---|---|
| [stage] | [e.g. developer utilization] | Will drop, deliberately | Held capacity absorbs variation; running every step near full utilization guarantees a queue in front of every step | Constraint buffer health |
| [stage] | [e.g. stories drafted per sprint] | Will drop | Drafting beyond constraint capacity produces inventory, not throughput | Delivered throughput |
| [stage] | [e.g. review turnaround average] | Will worsen for new arrivals | Items closest to the constraint are prioritized over newest | Age of oldest item at the constraint |

**Say this out loud to the team and to whoever reads their metrics.** Non-constraint stages will
appear underutilized. That is the design. Dependent events with variable durations cannot be run at
full utilization at every step without accumulating queues at every step — the idle capacity is what
absorbs the variation. [SOURCE: Goldratt, *The Goal*, 1984, with Jeff Cox.]

If this section is empty, the rules in Section 2 will be reversed within a quarter by someone acting
reasonably on a metric nobody told them to stop caring about.

---

## 4. Buffer

| Field | Value |
|---|---|
| Buffer target | [n items, or n days of constraint capacity] |
| Sized against | [observed arrival variability — state the observation, not a guess] |
| **Below target** | Constraint can starve. Release rule pulls forward. |
| **Above upper bound** | The buffer is hiding an upstream problem rather than protecting the constraint. Investigate upstream; do not simply drain it. |
| Measured how | [queue length at the constraint, checked at what cadence] |
| Reported by | `@ops:flow-lead` |

**Release rule:** [the rule that keeps the buffer full without flooding it].
**Executed by:** [team agreement — `@sm`]. Any part of it that touches the pipeline or release path:
**`@devops`**.

---

## 5. What subordination is not

- **Not permission to weaken a gate.** If a quality gate is being starved or buried, that is a
  redesign question for `@qa`. Throughput counts *delivered* value; a faster path that returns
  defects has lowered throughput while raising every local speed metric.
- **Not an instruction to change the release cadence.** If the release window is the queue, that is
  a finding for **`@devops`**, with evidence attached.
- **Not backlog authority.** Where sequencing follows from these rules, the flow argument goes to
  `@po` and `@sm` as evidence. The decision stays theirs. [Constitution Article II — Agent Authority.]
- **Not permanent.** These rules exist to protect one named constraint. When it moves, they become
  inertia — see Section 6.

---

## 6. Expiry and inertia

| Field | Value |
|---|---|
| These rules expire when | The constraint named in Section 1 is no longer the constraint |
| On expiry, run | `*inertia-check` |
| Disposition required for each rule | RETIRE / REVISE / KEEP, each with a stated reason |

Every rule in this document was invented to protect a specific constraint. When that constraint
breaks, the rules do not become harmless — they become the next constraint, and they are hard to see
because they were once correct. [SOURCE: Goldratt, fifth focusing step.]

---

## 7. Adoption record

| Rule | Agreed with | Date | Working agreement recorded by |
|---|---|---|---|
| [rule] | [team] | [date] | `@sm` |

A subordination rule that was never agreed with the people it constrains is a document, not a policy.

---

## Attribution

The five focusing steps, the position that an hour lost at the constraint is lost by the whole
system, and the throughput / inventory / operating expense measures are published by Eliyahu M.
Goldratt in *The Goal: A Process of Ongoing Improvement* (1984, written with Jeff Cox) and developed
in his subsequent work. Applied with attribution; `@ops:flow-lead` is not Goldratt.

Work-in-progress limits, buffer-health banding and cumulative flow diagrams are later flow
**convention** drawn from other schools. They are used here where useful and are not attributed to
Goldratt.

## Related

- Constraint analysis this depends on: `squads/ops/templates/constraint-analysis-tmpl.md`
- Evidence bar: `squads/ops/checklists/constraint-evidence-checklist.md`
- Signatures, types and levers: `squads/ops/data/constraint-signatures.yaml`
