# Loyalty Wave & Closed-Loop Checklist

**Checklist ID:** CS-CL-004
**Referenced by:** `advocacy-lead` (Chorus)
**Applies to:** `*survey-design`, `*score-read`, `*score-limits`, `*close-loop`,
`*detractor-analysis`, `*promoter-language`, `*reference-program`, `*referral-economics`
**Purpose:** The bar a loyalty wave, a closed-loop report or a reference qualification must clear
before it is published or before the number enters a deck, an OKR or a bonus scheme.

[[LLM: EXECUTION

Mark `[x]` only where you can name the evidence. `[ ]` where you cannot. `[N/A]` with a written reason.

CRITICAL failures block publication. Several of them — selective sampling, method drift, pooled
framings — destroy comparability across the **entire time series**, not only the affected wave. That
damage is not recoverable by re-running the wave.

Attribution note binding on the whole checklist: the framework is Fred Reichheld, *The Ultimate
Question* (Harvard Business School Press, 2006), developing "The One Number You Need to Grow"
(*Harvard Business Review*, 2003), revised as *The Ultimate Question 2.0* (2011, with Rob Markey).
Part G carries the VERIFY markers that must be resolved before publication.]]

---

## Part A — method, fixed before the wave

- [ ] Framing chosen and recorded: **relationship** or **transactional**
- [ ] Relationship and transactional waves are **never pooled into one number** **(CRITICAL — they
      measure different things and their mixture is uninterpretable)**
- [ ] Population, eligibility, selection method and exclusions fixed **in writing before the wave
      ran** **(CRITICAL — the sampling rule is the single largest source of uninterpretable movement,
      and deciding it afterwards means the number can no longer be compared to anything)**
- [ ] Suppression window defined, so no account is over-surveyed into self-selection
- [ ] Respondent role recorded per response: economic buyer / admin / daily user
- [ ] **Verbatim field is mandatory and present** **(CRITICAL — without reasons the wave produced an
      index and nothing actionable)**
- [ ] Confidentiality promise stated explicitly at collection, and the loop designed to be consistent
      with it
- [ ] **Movement threshold pre-registered**: what would count as meaningful at the expected sample
      size, decided before the result was seen
- [ ] Any change to timing, channel, wording or population since the previous wave is **declared**
      **(CRITICAL — undeclared method drift makes the whole series uninterpretable)**

## Part B — integrity of the instrument

- [ ] **No selective sampling** — no surveying only favourable accounts **(CRITICAL)**
- [ ] **No favourable timing** — no waves scheduled deliberately after a success moment **(CRITICAL)**
- [ ] **No excluded difficult segments** **(CRITICAL)**
- [ ] **No coaching of respondents toward a score** **(CRITICAL)**
- [ ] Where the score is proposed as a target, an OKR or a compensation input, **the incentive it
      creates and the gaming vectors it opens are stated in the same document** **(CRITICAL — when
      pay depends on the number, the cheapest levers are sampling and timing, they require no bad
      faith, and they are almost undetectable once the method stops being fixed in writing)**
- [ ] Where a customer-loyalty component is genuinely wanted in a target, loop closure rate and
      median loop latency are offered as the alternative — behaviours the team controls and cannot
      fake without doing the work

## Part C — reading the wave

- [ ] **Sample size, response rate and composition reported BEFORE the score** **(CRITICAL — placing
      the number first lets an explanation form before the sample is understood, and a composition
      artifact then becomes indistinguishable from a real change)**
- [ ] Score reported **as a range**, with the approximate sampling error at this sample size
- [ ] Underlying distribution reported — two very different distributions produce the same net score
- [ ] **A movement smaller than the sampling error is recorded as noise and NOT explained**
      **(CRITICAL — constructing a causal story for randomness sends teams to fix things that did not
      happen)**
- [ ] Composition compared against the previous wave; movement attributed to **composition first**,
      experience second
- [ ] **Segment-stable comparison** provided wherever the aggregate moved — a flat aggregate can
      conceal two segments moving in opposite directions, and a moving aggregate is often pure mix
- [ ] Verbatim themes with counts accompany the score
- [ ] What the wave does and does not support as a conclusion is stated explicitly
- [ ] No cross-company benchmark presented as evidence; comparison is against this company's own
      series with a declared method

## Part D — the closed loop

- [ ] Responses ordered for follow-up by severity and age, detractors first
- [ ] **The confidentiality promise is checked before any contact** **(CRITICAL)**
- [ ] **Every detractor response is contacted, or explicitly recorded as not contacted with the
      reason** **(CRITICAL — a detractor response collected and never followed up is worse than not
      asking, because the customer now knows the company heard and did nothing)**
- [ ] The customer is told **what will happen**, including where the honest answer is that nothing
      will change
- [ ] **An honest no counts as a closed loop; silence never does** **(CRITICAL)**
- [ ] A response marked resolved internally **without customer contact is not counted as closed**
      **(CRITICAL — the metric improves, the customer's experience is unchanged, and the programme's
      credibility is spent)**
- [ ] **Loop latency and closure rate are reported beside the score**, permanently
- [ ] The promoter loop is closed too, and the value language captured — the cheapest asset in the
      programme, normally discarded
- [ ] Every theme routed with **exactly one** named owner and destination
- [ ] Contact is executed through the authorized system by the relationship owner, not from inside an
      agent session

## Part E — references and referrals

- [ ] Reference candidates qualified on **realized value confirmed by `@retention-lead`**, not on
      score **(CRITICAL — a perfect score reflects a disposition, often one person's; a reference is
      a durable public claim, and a reference account that churns becomes a permanent quotable
      artifact of the failure)**
- [ ] Adoption breadth checked — a reference resting on one champion carries an expiry tied to that
      role
- [ ] Health stability over a full period checked
- [ ] **No open escalation and no unclosed detractor loop** on any qualified account
- [ ] **Consent recorded with a defined scope and expiry**: what may be said, by whom, in which
      channels, for how long **(CRITICAL — no account is used publicly without recorded scoped
      consent)**
- [ ] Review date set; consent and accuracy both decay
- [ ] Referrals measured as **behaviour** — referrals made, accounts acquired, retention and
      time-to-first-value of referred accounts versus base — not inferred from the score
- [ ] Overlap between the promoter population and the population that actually refers is checked;
      divergence is reported as a finding about the instrument
- [ ] **No commercial referral incentive, fee, reward or term constructed** → sales squad **(CRITICAL)**
- [ ] Case-study production and campaign execution handed to the marketing squad, not performed here

## Part F — CUSTOMER DATA, mandatory

- [ ] **Survey responses are treated as personal data (CRITICAL)**
- [ ] No identifier stored beyond what closing the loop requires **(CRITICAL)**
- [ ] **No identified verbatim reproduced in any repository artifact (CRITICAL)** — themes travel,
      verbatims and identifiers stay in the survey system, responses cited by response id
- [ ] **Anonymous responses are never re-identified and never followed up (CRITICAL)** — no account
      matching, no timing correlation, no route, regardless of usefulness
- [ ] Confidentiality terms promised at collection honoured through analysis, follow-up and routing
- [ ] No named individual characterized anywhere in the output **(CRITICAL)**
- [ ] Analysis at account, cohort and segment level; individual detail only inside the authorized
      system where loop closure genuinely requires it
- [ ] Special-category personal data stopped and escalated to the human owner **(CRITICAL)**

## Part G — attribution, VERIFY before publication

- [ ] **V1 — exact wording of the recommendation question verified against the edition being
      followed** **(CRITICAL — the canonical wording varies slightly across editions and
      implementations; publishing it from memory is a fabrication risk)**
- [ ] **V2 — trademark attribution for "Net Promoter" / "NPS" confirmed before external
      publication** (registered trademarks associated with Bain & Company, Satmetrix Systems and Fred
      Reichheld)
- [ ] **V3 — the contested predictive status is STATED wherever the score supports a decision**
      **(CRITICAL — the strong claim that this single measure predicts growth better than alternative
      satisfaction and loyalty measures has been disputed in the peer-reviewed marketing literature,
      with published replications reporting weaker or inconsistent performance; the existence of the
      debate may be stated, but any specific critique citation must be verified before it is named)**
- [ ] **V4 — the measure proposed in *Winning on Purpose*** (Harvard Business Review Press, 2021,
      with Darci Darnell and Maureen Burns) **is not cited without verifying its exact name and
      definition against the source**
- [ ] No sentence is presented as a verbatim quotation from Reichheld unless it has been checked
      **(CRITICAL — a wrong attribution is worse than no attribution)**
- [ ] This squad's own conventions — sampling-error thresholds, loop latency as a first-class metric,
      reference gating on realized value, refusal to construct commercial incentives — are stated as
      this squad's, not as the source's content
- [ ] Every score, theme, referral figure and reference claim traces to a dated response, an
      instrumented fact or a customer record; anything else is marked UNVERIFIED **(Constitution
      Article IV — No Invention)**

## Part H — boundary

- [ ] The score is **not** used as the renewal-risk instrument → `@retention-lead`'s validated health
      model **(CRITICAL)**
- [ ] No first-value or activation work performed → `@onboarding-lead`
- [ ] Cross-channel aggregation and routing to product handed to `@voice-lead`; **no roadmap claim
      made here** **(CRITICAL)**
- [ ] No causal switching account produced → `@products:jobs-analyst`
- [ ] No epic (`@pm`), story (`@sm`), backlog (`@po`), code (`@dev`), test (`@qa`) or push
      (`@devops` — exclusive)

---

## Verdict

| Condition | Verdict |
|---|---|
| All CRITICAL satisfied, at most three non-critical gaps | **PUBLISH** |
| All CRITICAL satisfied, four or more non-critical gaps | **PUBLISH WITH LIMITS STATED** |
| Any CRITICAL unsatisfied | **BLOCK** |
| Sampling rule not fixed in writing before the wave | **BLOCK — the wave is not comparable to any other** |
| Composition reported after the score, or movement below sampling error explained | **BLOCK and rewrite** |
| Any VERIFY marker unresolved and the corresponding claim published | **BLOCK** |
| Any re-identification of anonymous responses | **BLOCK and escalate to the human owner** |

A blocked wave costs one quarter. A wave published with selective sampling costs the comparability of
every wave that came before it.
