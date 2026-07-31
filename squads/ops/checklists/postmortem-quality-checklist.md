# Post-Incident Analysis Quality Checklist

**Checklist ID:** OPS-CL-004
**Referenced by:** `@ops:incident-lead` (Klaxon)
**Applied to:** A draft post-incident analysis, before it is circulated to anyone who was not in
the response.
**Verdict:** PASS / CONDITIONAL / REJECT — scoring in Section 9.

[[LLM: INITIALIZATION — ANALYSIS REVIEW

Two sections decide whether this document teaches anything.

Section 3 (language) and Section 4 (causality) are where drafts fail, and they fail together: a
document that names a single root cause almost always names a person shortly afterwards, and a
document written from the outcome backwards produces both without anyone intending it.

Run Section 3 as a literal text search, not as an impression. The listed phrases are searchable.

Mark [x] present and correct, [ ] missing or wrong, [N/A] with a stated reason.
Any CRITICAL failure forces REJECT — do not circulate.]]

---

## 1. Is the record real? (CRITICAL)

- [ ] **The timeline was written during the response, not reconstructed afterwards** (CRITICAL)
      *If it was reconstructed:* say so at the top of the document, and treat every timing as
      approximate. A reconstruction presented as a record is worse than an acknowledged reconstruction.
- [ ] **Every entry traces to a log, a message, a metric, or a named person's account** (CRITICAL)
      [Constitution Article IV — No Invention.]
- [ ] **Inferences are marked as inferences, with confirmation as a separate later entry** (CRITICAL)
      *Fails if:* a suspicion at 09:22 was retro-edited into a fact because it turned out to be true.
- [ ] "Known at the time" entries record what responders could **see**, never what was knowable
- [ ] Every action entry records the agent who executed it and under whose authority
- [ ] Times are absolute with a timezone, not relative to the narrative

## 2. Was the response structured?

- [ ] The incident was declared, with a declared-at time
- [ ] Severity was classified against the **written** criteria, quoted rather than paraphrased
- [ ] Any reclassification is recorded with a reason, not silently applied
- [ ] **One commander is named, and was not also executing mitigation**
      *A commander with hands in the system stops commanding first and silently: the timeline stops,
      parallel actions go unnoticed, and communication lapses while the response looks busy.*
- [ ] Command handoffs are recorded, with the incoming holder restating their understanding
- [ ] Mitigations were sequenced, one at a time, with the expected effect stated before each
- [ ] Stand-down was declared against stated criteria, not by fatigue
- [ ] What remained unresolved and what monitoring continued are both recorded

## 3. Language — run this as a text search (CRITICAL)

- [ ] **No occurrence of "should have"** (CRITICAL)
- [ ] **No occurrence of "failed to"** (CRITICAL)
- [ ] **No occurrence of "if only"** (CRITICAL)
- [ ] **No occurrence of "obviously"** (CRITICAL)
- [ ] No occurrence of "neglected to", "simply forgot", "did not bother", "was careless"
- [ ] **No sentence identifies a person as the cause** (CRITICAL)
- [ ] No sentence describes an absence as a choice (e.g. "the team chose not to test")
- [ ] Each rewritten sentence is recorded in the counterfactual audit table, so the discipline is
      visible rather than asserted

> These are not tone rules. A draft framed as accusation guarantees a defensive account in the next
> incident, and a defensive account is a less accurate one. [SOURCE: *Site Reliability Engineering*,
> O'Reilly 2016, Ch. 15 "Postmortem Culture".]

## 4. Causality (CRITICAL)

- [ ] **The document contains no "root cause" field or section** (CRITICAL)
- [ ] **Multiple contributing factors are enumerated** (CRITICAL)
      *Fails if:* exactly one cause is identified. A complex system fails when several conditions
      align. [SOURCE: safety science and resilience engineering; Cook, *How Complex Systems Fail*.]
- [ ] Factors span **technical, procedural, organizational and external** layers — an empty layer is
      stated as "considered, none found", not omitted
- [ ] **The analysis did not stop at the external factor** (CRITICAL)
      *The vendor is the tempting stopping point because it is outside our control, which is exactly
      why it is the wrong place to stop.* Check that factors under our control are enumerated.
- [ ] Each factor states whether it was present before this incident and whether it is present now
- [ ] For each human action, the document asks why it was the reasonable path at the time, and names
      what the system offered instead
- [ ] "Human error" appears nowhere as an explanation

## 5. What went well

- [ ] At least one thing that worked is recorded, with why it worked
- [ ] What would erode it is stated
- [ ] This section appears **before** contributing factors, not appended at the end

## 6. Corrective actions (CRITICAL)

- [ ] **Every action has an owner who is a named person, not a team name alone** (CRITICAL)
- [ ] **Every action has a date** (CRITICAL)
- [ ] **Every action names a change whose completion can be verified** (CRITICAL)
      *Fails on:* "improve monitoring", "be more careful", "better documentation", "increase
      awareness", "review the process". If nobody can tell whether it was done, it was not an action
      item — it was an intention, and it will recur verbatim in the next postmortem.
- [ ] Every action states the agent whose authority covers it
- [ ] Rejected proposals are listed with why they were rejected — this is how the bar stays visible
- [ ] **Every contributing factor carries either an action or an explicitly recorded risk
      acceptance with an owner and a review date** (CRITICAL)
- [ ] Corrective actions were checked against creating new waste — added steps, approvals and checks
      written under the pressure of the last incident (`@ops:lean-lead` question)

## 7. Authority (CRITICAL — most load-bearing during an incident, not after)

- [ ] **No action in the record was performed or unilaterally instructed by this agent** (CRITICAL)
- [ ] **Every deploy, rollback, failover, restart, scaling and configuration change in the timeline
      records `@devops` as its executor** (CRITICAL)
- [ ] **No customer-facing message was issued from this agent** — drafted here, approved by the
      accountable human, published by **`@devops`** (CRITICAL)
- [ ] No external statement committed to a cause that was, at publication time, still an inference
- [ ] Corrective actions are routed, not executed: `@dev` implements, `@qa` verifies, **`@devops`**
      changes infrastructure and pipelines, `@ops:reliability-lead` owns targets and accepted risks,
      `@ops:lean-lead` owns process countermeasures, `@po`/`@sm` own backlog and agreements
- [ ] Actions no agent authority covers (ownership, staffing, organizational structure) are marked
      as human decisions

## 8. Recurrence and persistence

- [ ] Prior occurrences were searched for, and where that was checked is stated
- [ ] **If a prior occurrence exists, `*recurrence-review` was run before this analysis was written**
- [ ] Where a recurrence exists, the document says which of the three applies: earlier actions
      addressed a symptom, were never implemented, or were implemented and eroded
- [ ] Section 9 of the analysis records what changed upstream in policy — target, severity matrix,
      standard work, flow rule, architecture
- [ ] The record is a versioned file in the repository, not a chat channel (Constitution Article I)
- [ ] The analysis is scaled to the severity — a low-severity incident deserves a short record, not
      a ceremony, and not nothing

---

## 9. Scoring

**Score** = checked items / (total items − justified N/A) × 100

| Verdict | Condition |
|---|---|
| **REJECT — do not circulate** | Any CRITICAL item unchecked |
| **REJECT** | Score below 75% |
| **CONDITIONAL** | 75–89%, no CRITICAL failure — circulate internally, fix before wider distribution |
| **PASS** | ≥ 90%, no CRITICAL failure |

A CRITICAL failure in Section 3 or 4 is not a drafting issue. The document will teach the wrong
lesson and will make the next incident's account less accurate.

## 10. Repair order

1. **Section 4** — causality. A single-root-cause document has to be re-derived, not edited.
2. **Section 3** — language, as a literal search.
3. **Section 1** — record integrity, particularly inference marked as observation.
4. **Section 7** — authority.
5. **Section 6** — actions.
6. **Sections 2, 5, 8** — repairable in place.

## Attribution

The discipline applied here has **no single author**, and this checklist says so rather than
inventing an attribution.

Convergent documented sources: the **Incident Command System**, adapted from emergency response into
technology operations, for command structure and the separation of command from execution;
*Site Reliability Engineering* (O'Reilly, 2016), Ch. 14 "Managing Incidents" and Ch. 15 "Postmortem
Culture", for blameless analysis as an operational norm; **safety science and resilience
engineering** for multiple contributing factors over a single root cause — in the form most
engineers encounter it, Richard I. Cook's short treatise *How Complex Systems Fail*; and the
**just-culture literature**, notably Sidney Dekker's writing, for separating learning from an error
from accounting for it.

These sources do not agree on everything; only the practices they converge on are applied. Section 7
is an AEXOS constitutional constraint (Article II — Agent Authority).
