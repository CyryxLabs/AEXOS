# Operations Triage Record — [REQUEST_SUMMARY]

**Template ID:** OPS-TMPL-010
**Produced by:** `@ops:ops-chief` (Fulcrum) — `*diagnose`, `*authority-check`, `*intake`, `*sequence`
**Artifact type:** Routing decision and handoff brief. Versioned file in the repository.
**Date:** [date] · **Requester:** [name]

[[LLM: FILLING THIS TEMPLATE

Section 1 comes before Section 2, always. When an action is implied, the first question is not who
knows about this — it is whose hands are permitted on it. In operations that question is
load-bearing and it is asked first.

EXCEPTION: an active incident is NOT triaged. If something is actively failing, stop, route to
@ops:incident-lead `*declare`, and fill this record afterwards. Triage ceremony during an outage is
itself a failure mode.

Route to exactly ONE owner. Broadcasting to four specialists produces four partial answers built on
four different unstated assumptions, and no decision. If several are genuinely needed, sequence them
in Section 5 and say what running them out of order would waste.

This record generates no operational claim of its own. Everything substantive is the specialist's.]]

---

## 0. Incident check — before anything else

| Question | Answer |
|---|---|
| Is something actively failing right now? | yes / no |

**If yes:** stop filling this record. `@ops:incident-lead` `*declare`, immediately. Return and
complete this afterwards. Ninety seconds of declaration produces a severity, a named commander and
an open timeline; triage produces none of those and delays all three.

---

## 1. Authority — answered before routing

| Field | Value |
|---|---|
| Does the request imply a mechanical action on a running system? | yes / no |
| If yes, what action | [deploy / rollback / failover / restart / scale / configure / gate / freeze / release / publish / push] |
| **Authorized to perform it** | **`@devops`** — exclusive, no exceptions for severity or urgency |
| What this squad may decide about it | [the rule, the threshold, the target, the finding — name it precisely] |
| What this squad may **not** do | [the action itself] |

**Stated plainly for the requester:** [one sentence saying what will and will not happen as a result
of this conversation. E.g. "This squad can decide that a freeze is the right rule and state the
threshold, the decider and the exit condition. It cannot freeze anything."]

Full authority determination table: `squads/ops/data/ops-routing-matrix.yaml`.

---

## 2. Restatement

| Field | Value |
|---|---|
| As asked | "[verbatim]" |
| Restated in the owning discipline's terms | [restatement] |
| Reframe applied? | yes / no |
| If yes, the reframe stated out loud | [e.g. "You want to automate it. The first question is whether the work should exist."] |
| Requester confirmed the reframe | yes / no / pending |

A silent reframe answers a different question than the one asked, and in operations the requester
acts on the answer. State it and confirm it.

---

## 3. Owner

| Field | Value |
|---|---|
| **Owning specialist** | `@ops:[agent]` |
| Why | [one sentence] |
| Near-miss disciplines considered and excluded | [agent] — [why not] · [agent] — [why not] |
| Still an operations question at all? | yes / no → [core agent that owns it] |

| Discipline | Owns | Explicitly does not own |
|---|---|---|
| `@ops:reliability-lead` | What we promise, measured how, at what cost | Where work stops; process waste; live incidents; monitoring configuration |
| `@ops:flow-lead` | Where work stops and what caps throughput | Waste inside a step; availability targets; live incidents; pipeline mechanics; backlog order |
| `@ops:lean-lead` | How the work is done and what it carries | Which step caps throughput; technical toil classification; incident command; halting anything |
| `@ops:incident-lead` | What happens when it breaks and what is learned | Any mitigation action; targets and thresholds; chronic delivery slowness |

---

## 4. Short usable answer

[Enough to unblock the requester today. Two paragraphs at most.]

**Caveat, stated:** this is the navigational answer, not the defensible one. It is right often enough
to unblock a cheap and reversible decision, and wrong in ways that surface a quarter later if it
becomes a policy — an SLO, a freeze rule, a stop rule, a severity scale. For those, the specialist's
method is what makes the answer hold.

---

## 5. Sequence — if more than one specialist is needed

| # | Specialist | Command | Input it needs | What running it out of order would waste |
|---|---|---|---|---|
| 1 | `@ops:[agent]` | `*[command]` | [inputs] | — |
| 2 | `@ops:[agent]` | `*[command]` | [output of step 1] | [e.g. automating before the constraint is known optimizes a step that does not matter] |
| 3 | `@dev` / `@qa` / **`@devops`** | — | [specification from step 2] | — |

**Sequencing rules applied:**

- Throughput in question → `@ops:flow-lead` first, always
- Operational load in question → `@ops:reliability-lead` measures it first; the measurement decides
  whether `@ops:lean-lead` removes it or `@dev` automates it
- Failures repeating → `@ops:incident-lead` first; a recurrence is a finding about the previous analysis
- Never: automation before the constraint is known · a target before the load is measured · a stop
  rule before the constraint is located

---

## 6. Handoff brief

Written so the specialist starts with context rather than re-eliciting it.

| Field | Value |
|---|---|
| To | `@ops:[agent]` |
| Command | `*[command] [args]` |
| The question, in their terms | [restatement] |
| Evidence that already exists | [artifacts, paths, data sources] |
| Evidence that does not exist | [what they will have to gather, or mark UNVERIFIED] |
| Constraints already known | [e.g. release cadence is fortnightly and owned by `@devops`] |
| Authority note to carry forward | [what the specialist may decide and what they may not do] |
| Prior artifacts for this system | [paths] |

**No authority is granted by this routing.** A handoff that reads as though the receiving agent may
act on infrastructure manufactures an authority violation one hop away from here.

---

## 7. Flags raised

| Flag | Detail | Surfaced before or after the decision |
|---|---|---|
| Safety / data-loss / user-harm concern | [detail] | **before** — never summarized into a closing caveat |
| Contradiction with an existing operational policy | [artifacts] | before → `*coherence-check` |
| Request implies an unassigned consequence | [detail] | before |

---

## 8. Provenance

| Field | Value |
|---|---|
| Operational claims generated by this record | **none** — every substantive statement belongs to a specialist artifact |
| Sources cited | [paths] |
| Constitution Article IV | This record synthesizes and routes. It does not assert. |

---

## Attribution

`@ops:ops-chief` is an **original orchestrator role**. No external methodology is applied or claimed
by it. The published methods live in the specialists, each attributed in its own file:
*Site Reliability Engineering* (O'Reilly, 2016) for `@ops:reliability-lead`; Eliyahu M. Goldratt's
*The Goal* (1984, with Jeff Cox) for `@ops:flow-lead`; Taiichi Ohno's *Toyota Production System:
Beyond Large-Scale Production* (Japanese 1978 / English translation 1988) for `@ops:lean-lead`; and
for `@ops:incident-lead`, a **discipline with no single author** — attributing it to one would be
inaccurate, and inaccurate attribution is worse than none.

## Related

- Authority determination and routing keywords: `squads/ops/data/ops-routing-matrix.yaml`
- Boundary bar before any handoff: `squads/ops/checklists/authority-boundary-checklist.md`
- Coherence audit artifact: `squads/ops/templates/ops-coherence-audit-tmpl.md`
- Task: `squads/ops/tasks/ops-diagnose-and-route.md`
