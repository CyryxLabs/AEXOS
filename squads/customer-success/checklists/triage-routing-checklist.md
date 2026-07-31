# Triage & Routing Checklist

**Checklist ID:** CS-CL-001
**Referenced by:** `cs-chief` (Anchor)
**Applies to:** `*diagnose`, `*intake`, `*sequence`, `*coherence-check`, `*conflict-resolve`,
`*account-brief`, `*handoff-to-product`
**Purpose:** The bar a routing decision, a coherence audit or a consolidated brief must clear before
it leaves this squad.

[[LLM: EXECUTION

Mark `[x]` only when the item is actually satisfied and you can name the evidence. Mark `[ ]` when
it is not. Mark `[N/A]` only where the item genuinely does not apply, and write the reason beside it.

A CRITICAL item that is not satisfied **blocks the output**. It is not a score to be averaged away —
a routing decision that fails a CRITICAL item sends work to the wrong discipline, and the wrong
discipline produces a confident artifact that has to be unwound a quarter later.

Run this before the handoff is written, not after.]]

---

## 1. Population and framing

- [ ] The population is stated unambiguously: one account, a named cohort, a segment, or the whole
      base **(CRITICAL — an ambiguous population makes every downstream count meaningless)**
- [ ] The symptom carries a date and a description of how it was noticed
- [ ] What changed before the symptom date has been asked about, even if the answer is "unknown"
- [ ] The request is restated in lifecycle vocabulary, not repeated in the requester's framing
- [ ] The pending decision is named, with who makes it — or it is stated plainly that this is
      reporting rather than work

## 2. Attribution

- [ ] The stage where the symptom **surfaced** is named
- [ ] The stage where the problem **originated** is named separately **(CRITICAL — routing to the
      surfacing stage is the single most common failure this squad exists to prevent)**
- [ ] The origin claim is supported by something checkable: a tenure split, a cohort comparison, a
      dated artifact, or an instrumented fact
- [ ] Where the origin cannot be attributed on current evidence, that is stated and the output is a
      split or a measurement plan rather than a confident owner
- [ ] Churn concentrated before the median time-to-first-value has been tested for, and attributed to
      activation if present

## 3. Ownership

- [ ] **Exactly one** owning specialist is named **(CRITICAL — broadcasting one question to several
      specialists yields partial readings built on different populations and no decision)**
- [ ] The near-miss disciplines are listed, each excluded by reference to its own NOT-list
- [ ] Where several specialists are genuinely required, they are **sequenced** with the input each
      one needs, not dispatched in parallel
- [ ] The sequence starts at the earliest broken lifecycle link, not at the loudest symptom
- [ ] What would be wasted by running the sequence out of order is stated

## 4. Boundary

- [ ] The request is confirmed to be adoption, realized value, retention or customer voice
- [ ] Customer job discovery and switching causality routed out to `@products:jobs-analyst` /
      `@products:discovery-lead` **(CRITICAL)**
- [ ] Renewal negotiation, discounting, contract terms, expansion offers and quota routed out to the
      sales squad **(CRITICAL — this squad supplies value evidence, never a commercial position)**
- [ ] No roadmap or prioritization decision taken inside this squad; evidenced signal is routed to
      `@products` and `@pm` as evidence **(CRITICAL)**
- [ ] Epic framing (`@pm`), story drafting (`@sm`), story validation and backlog (`@po`),
      implementation (`@dev`), quality gates (`@qa`) are not performed here
- [ ] Git push, PRs, MCP and CI/CD routed to `@devops` **(CRITICAL — exclusive authority, no
      exception, no framing of urgency overrides it)**

## 5. Coherence audit (when two or more squad artifacts exist for the same subject)

- [ ] Every existing artifact is inventoried with its date
- [ ] Each artifact is mapped to a lifecycle link
- [ ] All seven contradiction checks are run, or explicitly recorded NOT RUN with a reason
- [ ] Health inversion is tested **against a closed period with known renewal outcomes**, not against
      the current open period **(CRITICAL — an open period has no outcomes to validate against, so a
      "passing" result there is not a result)**
- [ ] Each break is classified as independent or inherited from an upstream break
- [ ] The repair order runs upstream first; downstream instruments are not retuned before the
      upstream break is repaired
- [ ] Links with no artifact are marked UNEVIDENCED rather than filled by inference

## 6. Arbitration (when two readings conflict)

- [ ] Both positions are stated in their own terms without softening either
- [ ] The assumption they do not share is named — usually who the customer is, which population, or
      which date range
- [ ] The evidence each side holds is tabulated: source, population, recency, instrumented or reported
- [ ] Different populations or periods are resolved as a **segment or time split**, not as a conflict
- [ ] Where neither side has evidence, the output is an instrumentation plan and **not** a decision
- [ ] No contradiction is averaged into a compromise reading **(CRITICAL — an amber flag
      manufactures a position no evidence supports and hides a gap that is usually fixable)**
- [ ] The losing artifact is explicitly marked for revision, not left quietly in place

## 7. No Invention (Constitution Article IV)

- [ ] Every statement in the brief traces to a specialist artifact, which traces to an instrumented
      fact, a dated customer record or a dated interview **(CRITICAL)**
- [ ] No new customer claim is introduced during assembly
- [ ] Metric movements are never reported as findings without the reason behind them
- [ ] Anything unsourced is marked UNVERIFIED and does not enter the brief
- [ ] Where a specialist artifact carries an attribution caveat (Mehta, Steinman & Murphy for
      retention; Reichheld for advocacy; "no canonical work" for onboarding and voice), that caveat
      travels with the finding and is not dropped in summarisation

## 8. CUSTOMER DATA — mandatory

- [ ] Subject identified by account id or cohort definition only **(CRITICAL)**
- [ ] Account-level and cohort-level facts used by default; individual-level detail requested only
      where the pending decision cannot be made without it
- [ ] No personal data beyond what the decision required has been requested or stored **(CRITICAL)**
- [ ] Customer records referenced by id, never reproduced — no contact records, support transcripts,
      contract terms or identified verbatims in any repository artifact **(CRITICAL)**
- [ ] No anonymous feedback re-identified by account matching or any other route **(CRITICAL)**
- [ ] No named individual characterized anywhere in the output **(CRITICAL)**
- [ ] Confidentiality terms attached at collection are honoured downstream
- [ ] Special-category personal data (health, financial, credential, biometric, equivalents) stopped
      and escalated to the human owner rather than processed **(CRITICAL)**

## 9. Handoff and persistence

- [ ] The handoff brief lets the specialist start with context instead of re-eliciting basics
- [ ] The open question the specialist must answer is stated explicitly
- [ ] Data-handling constraints travel with the handoff
- [ ] A short usable answer was given before the handoff, labelled provisional
- [ ] The triage record, coherence audit or arbitration is **written to the repository** — a routing
      decision that lives only in a transcript did not happen

---

## Verdict

| Condition | Verdict |
|---|---|
| All CRITICAL items satisfied, no more than two non-critical gaps | **ROUTE** |
| All CRITICAL satisfied, three or more non-critical gaps | **ROUTE WITH GAPS NAMED** — gaps listed in the handoff |
| Any CRITICAL item unsatisfied | **BLOCK** — fix before the handoff is written |
| Population ambiguous, or origin stage unattributed with no split proposed | **BLOCK** |

A blocked output is not a failure of the requester. It means the routing would have sent real work
to the wrong discipline, and that costs more than the delay.
