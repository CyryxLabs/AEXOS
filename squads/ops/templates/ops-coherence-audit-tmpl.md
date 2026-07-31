# Operational Coherence Audit — [SERVICE_OR_SYSTEM]

**Template ID:** OPS-TMPL-011
**Produced by:** `@ops:ops-chief` (Fulcrum) — `*coherence-check`, `*conflict-resolve`, `*ops-brief`
**Artifact type:** Cross-policy audit. Versioned file in the repository.
**Date:** [date] · **Owner:** [name]

[[LLM: FILLING THIS TEMPLATE

The chain is promise -> constraint -> flow policy -> method -> stop rule -> response -> learning.
A break in any link invalidates EVERY link downstream of it, not only the adjacent one. Repair
upstream first, and say so in Section 4 — repairing downstream of a break wastes the work.

Do not smooth. Two specialists disagreeing usually means an unstated assumption differs. Name the
assumption; never average two evidenced policies into a third that neither would defend.

The authority-drift test in Section 3 is the one this squad most needs. A policy containing a
consequence no named agent is authorized to execute is the specific mechanism by which someone
outside @devops reaches for a gate they do not hold, citing a document this squad wrote.

Generate nothing. Every line in this audit traces to a specialist artifact. Constitution Article IV.]]

---

## 0. Boundary

This audit reports findings about documents. It changes no document, no system and no policy.

- Repairing a policy is its owning specialist's work.
- Every consequence any of these policies implies for a running system — gate, freeze, release
  cadence, pipeline, deploy, infrastructure — is **`@devops`, exclusive**, whichever policy asks
  for it and whatever this audit concludes.

---

## 1. The chain, as it currently stands

| Link | Owner | Artifact | Dated | Says | Status |
|---|---|---|---|---|---|
| **Promise** | `@ops:reliability-lead` | [path] | [date] | [target, window] | baseline / **BREAK** / **GAP** |
| **Constraint** | `@ops:flow-lead` | [path] | [date] | [named constraint] | |
| **Flow policy** | `@ops:flow-lead` | [path] | [date] | [release, buffer, subordination] | |
| **Method** | `@ops:lean-lead` | [path] | [date] | [standard work] | |
| **Stop rule** | `@ops:lean-lead` | [path] | [date] | [trigger, resume] | |
| **Response** | `@ops:incident-lead` | [path] | [date] | [severity matrix, roles] | |
| **Learning** | `@ops:incident-lead` | [paths] | [dates] | [n actions, m implemented] | |

**GAP** = no artifact exists for this link. **BREAK** = the artifact exists and contradicts another link.

Artifacts written months apart by different disciplines drift silently. A constraint identified in
June rarely propagates back to a target set in March.

---

## 2. Contradiction tests

Run each. Record the result even when it passes — a passing test recorded is what makes the next
audit cheap.

| # | Test | Question | Result | Typical cause when it fails |
|---|---|---|---|---|
| 1 | **Promise beyond capacity** | Is the reliability target achievable given where the constraint is and how much of the team's time is consumed by toil? | pass / **fail** | The SLO was set from a customer conversation and the constraint was never consulted |
| 2 | **Budget policy versus release policy** | Does the budget policy's freeze consequence contradict the release cadence the flow policy depends on? | | Two policies written months apart, both correct in isolation, neither aware of the other |
| 3 | **Automation at a non-constraint** | Is the top-ranked toil or waste item at the constraint, or somewhere its removal changes nothing? | | The toil register and the constraint analysis were produced independently and never compared |
| 4 | **Stop rule without recovery** | If the stop rule halts work at or above the constraint, is there a resume condition and a buffer that survives the stop? | | A jidoka policy written without reference to the constraint it will most often halt |
| 5 | **Severity scale versus SLO** | Does the severity matrix use impact thresholds consistent with the SLO and the budget? | | The severity scale predates the SLO, or was written by a different function |
| 6 | **Corrective action as new waste** | Do the postmortem's actions add steps, approvals or checks the method link would classify as waste? | | Actions written under the pressure of the last incident, optimizing for never repeating it at any cost |
| 7 | **Open learning loop** | Did the last three postmortems' contributing factors change any target, standard or flow rule? | | Corrective actions routed to implementation only, never back into policy |
| 8 | **Authority drift** | Does any squad policy contain a consequence no named agent is authorized to execute? | | A policy written as though this squad could enforce it. The failure this squad is most prone to. |

---

## 3. Findings

One block per finding. Do not compress two findings into one.

### Finding [n] — [name]

| Field | Value |
|---|---|
| Test | [#] |
| Artifacts involved | [paths, with dates] |
| The contradiction, stated plainly | [both statements, quoted, side by side] |
| **The differing assumption** | [what each artifact assumed that the other did not] |
| Which artifact is stale | [named, with the date evidence] / **cannot be determined without [measurement]** |
| Independent or inherited | independent / inherited from finding [#] |
| Owning specialist for the repair | `@ops:[agent]` |
| Any consequence for a running system | [none] / [named] → **`@devops`** decides and executes |

**Arbitration applied**

| Situation | Resolution |
|---|---|
| One side has measured evidence, the other does not | Evidence wins this round |
| Evidence about different scopes | Not a contradiction — a boundary question; redraw the system |
| Both measured, genuinely conflicting | Escalate the assumption; define the measurement that would decide |
| Neither has evidence | **The output is a measurement plan, not a decision** |
| Disagreement is about risk appetite, not facts | Surface as a human decision; never resolve it silently |

**Never:** average two contradictory policies into a third. That manufactures an unevidenced
operational rule out of two evidenced ones, and no specialist will defend it.

---

## 4. Repair order

A break invalidates everything downstream of it. Repairing downstream first wastes the work.

| # | Repair | Owner | Blocks | Can run in parallel with |
|---|---|---|---|---|
| 1 | [most upstream break] | `@ops:[agent]` | [what depends on it] | [independent breaks] |
| 2 | | | | |

**Independent breaks that can start now:** [list]
**Repairs blocked on a decision no agent can make:** [list] → human owner: [name]

---

## 5. Consequences requiring @devops

Collected in one place so nothing is buried.

| Finding | Implied change to a running system | Decided by | **Executed by** |
|---|---|---|---|
| [#] | [e.g. release cadence] | [named human or specialist per the policy] | **`@devops`** |

**This audit changes none of the above.** Where a repair requires a change to a release path,
pipeline, gate or infrastructure, that is `@devops`' decision to make with the evidence, not an
instruction from here.

---

## 6. Traceability

| Statement in this audit | Source artifact | Line or section |
|---|---|---|
| [statement] | [path] | [ref] |

**Claims generated by this audit: none.** Every statement above traces to a specialist artifact,
which traces to measured data or a named assumption. A consolidated view containing a statement no
artifact supports launders assertion as synthesis. [Constitution Article IV — No Invention.]

---

## 7. Next audit

| Field | Value |
|---|---|
| Re-run when | Any link's artifact is revised, or after [n] windows |
| Automatic trigger | A constraint moves · an SLO changes · a third occurrence of the same incident |
| Standing item | Test 7 (open learning loop) and test 8 (authority drift) run every time regardless |

---

## Attribution

`@ops:ops-chief` is an **original orchestrator role** and applies no external methodology of its own.
The coherence chain and the contradiction tests are this squad's construction, not a published
framework, and are not attributed to any source.

The methods in the links belong to their specialists and are attributed in their own files:
*Site Reliability Engineering* (O'Reilly, 2016), eds. Beyer, Jones, Petoff & Murphy, for the promise
link; Eliyahu M. Goldratt's *The Goal* (1984, with Jeff Cox) for the constraint and flow links —
with work-in-progress limits and cumulative flow diagrams labelled as later **convention**, not
attributed to him; Taiichi Ohno's *Toyota Production System: Beyond Large-Scale Production*
(Japanese 1978 / English translation 1988) for the method and stop-rule links, with the wider lean
tradition labelled as **tradition**; and for the response and learning links, a **discipline with no
single author** — the Incident Command System, the SRE book's incident and postmortem chapters,
safety science and resilience engineering, and the just-culture literature, converging without any
one of them owning it.

## Related

- Triage artifact: `squads/ops/templates/ops-triage-record-tmpl.md`
- Boundary bar: `squads/ops/checklists/authority-boundary-checklist.md`
- Routing and authority determination: `squads/ops/data/ops-routing-matrix.yaml`
