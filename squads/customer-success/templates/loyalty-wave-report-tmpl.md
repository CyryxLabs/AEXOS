# Loyalty Wave Report — {WAVE_ID}, {DATE}

**Template ID:** CS-TM-004
**Owner:** `@customer-success:advocacy-lead` (Chorus)
**Produced by:** `*survey-design`, `*score-read`, `*close-loop`, `*detractor-analysis`,
`*promoter-language`, `*score-limits`

---

## Method attribution — reproduce this block in every published wave report

The framework applied is published by **Fred Reichheld**, *The Ultimate Question: Driving Good
Profits and True Growth* (Harvard Business School Press, 2006), developing the approach introduced in
the *Harvard Business Review* article **"The One Number You Need to Grow" (2003)**, and revised as
***The Ultimate Question 2.0*** (2011, with Rob Markey). Constructs applied: the recommendation
question on an eleven-point scale; the promoter / passive / detractor classification; the net score
arithmetic; the good-profits versus bad-profits distinction; and the closed-loop follow-up discipline.

**VERIFY markers — none of these may be published without checking the source first:**

| # | What must be verified | Why |
|---|---|---|
| V1 | **Exact wording of the recommendation question** | The canonical wording varies slightly across editions and across implementations. Verify against the edition being followed before publishing a question wording. |
| V2 | **Trademark attribution for "Net Promoter" / "NPS"** | Registered trademarks associated with Bain & Company, Satmetrix Systems and Fred Reichheld. Confirm current attribution requirements before any external publication using the marks. |
| V3 | **The predictive claim is contested** | The strong claim that this single measure predicts company growth better than alternative satisfaction and loyalty measures has been **disputed in the peer-reviewed marketing literature**, with published replications reporting weaker or inconsistent performance. State the contested status wherever the score supports a decision. The **existence of the debate** is stated here without attributing it to a particular paper; **verify any specific critique citation before naming it.** |
| V4 | **The measure proposed in *Winning on Purpose*** (Harvard Business Review Press, 2021, with Darci Darnell and Maureen Burns) | Later work by the same author proposing an accounting-based measure of customer-earned growth. **Verify the measure's exact name and definition against the source before citing it.** |

No sentence in this report is presented as a verbatim quotation from Reichheld unless it has been
checked. A wrong attribution is worse than no attribution.

**This squad's own conventions, not the source's content:** sampling-error thresholds for reporting
movements; loop latency as a first-class metric; reference qualification gated on `@retention-lead`'s
realized-value confirmation; and the refusal to construct commercial referral incentives.

---

## 1. Method, fixed before the wave ran

| Field | Value |
|---|---|
| Framing | relationship / transactional — **never pooled with the other** |
| Population and eligibility | |
| Sampling rule | {written before the wave; this is the single largest source of uninterpretable movement} |
| Suppression window | {how often any one account may be asked} |
| Respondent roles targeted | economic buyer / admin / daily user |
| Question wording | {V1 status: VERIFIED against {edition} / **UNVERIFIED — do not publish**} |
| Verbatim field | mandatory — present: yes / no |
| Confidentiality promise made at collection | {exact terms — these bind everything downstream} |
| Pre-registered movement threshold | {what would count as meaningful at the expected sample size, decided **before** the result} |
| Declared method drift since last wave | {timing, channel, wording, population — undeclared drift makes the series uninterpretable} |

---

## 2. Composition — reported BEFORE the score

| | Previous wave | This wave |
|---|---|---|
| Invited | | |
| Responded (n) | | |
| Response rate | | |
| Economic buyers in sample | | |
| Admins in sample | | |
| Daily users in sample | | |
| Enterprise share of sample | | |
| Other segment shares | | |

> Composition is placed before the score deliberately, so no explanation is formed before the sample
> is understood.

---

## 3. Score, with uncertainty

- **Net score:** {value} (previous: {value})
- **Approximate sampling error at n={n}:** ±{points}
- **Reported as a range:** {low} to {high}
- **Underlying distribution:** promoters {n} / passives {n} / detractors {n} — reported because two
  very different distributions can produce the same net score.

**Movement interpretation:**

- [ ] Movement is **smaller than the sampling error** → recorded as **noise**. No causal story is
      constructed for it, and none belongs in any deck.
- [ ] Composition shifted between waves → movement attributed to **composition first**, experience
      second.
- [ ] **Segment-stable comparison** run for every segment present in both waves:

| Segment | Previous | This wave | Stable? |
|---|---|---|---|

---

## 4. Verbatim themes — the finding

| Theme (de-identified) | Count | Direction | Change vs previous |
|---|---|---|---|

> The score is the index. The verbatims are the finding. A wave with no verbatim field produced a
> number and nothing actionable.

---

## 5. Closed loop

| Group | n | Contacted | Median latency (days) | Closed |
|---|---|---|---|---|
| Detractors | | | | |
| Passives (with verbatims) | | | | |
| Promoters | | | | |

- **Closure rate:** {%} overall, {%} detractors
- **Median detractor latency:** {days}
- **Responses not contacted, with the reason:** {list — anonymous-option responses are excluded from
  follow-up entirely, as promised at collection}
- **Honest declines:** {n} — a response where the customer was told the issue was heard, understood
  and will not be addressed **is a closed loop**. Silence is not.
- **Open loops reported as open**, even where the internal work is complete.

> Loop latency and closure rate belong permanently beside the score. A programme with a long median
> contact time is a reporting exercise wearing an operational label — and the customers know.

---

## 6. Routing

| Theme | Destination | Owner | What is being claimed | What is **not** being claimed |
|---|---|---|---|---|

Standard destinations: systemic multi-channel themes → `@voice-lead`; account risk →
`@retention-lead`; activation friction → `@onboarding-lead`; evidenced product problems →
`@voice-lead`, then `@cs-chief` → `@products` → `@pm`. **No roadmap claim is made from this report.**

**Promoter language captured** (de-identified themes only): {list} — handed to `@retention-lead` as
realized-value language for renewal evidence, and to `@products` as positioning input. It is the
cheapest asset in the programme and is normally discarded.

---

## 7. Instrument limits — required wherever this score supports a decision

| Limit | Consequence | Better instrument for that decision |
|---|---|---|
| Stated intention, not behaviour | A promoter score is a hypothesis about future behaviour | Actual referral behaviour and referred-cohort retention |
| Self-selected respondents | The sample is never the base | Composition reported and compared every wave |
| Sampling error | Small movements are not interpretable | Pre-registered movement threshold |
| **Contested predictive claims (V3)** | The strong growth-prediction claim is disputed in the peer-reviewed literature | State the contested status in the same document as the number |
| Cross-company comparison is weak | Method, timing, channel and framing differences dominate | Your own series with a declared, frozen method |
| Gameable when incentivized | The cheapest levers become sampling and timing, which require no bad faith | Target loop closure rate and median latency instead |
| Not a renewal-risk instrument | It answers a different question | Validated health model from `@retention-lead` |

**If this score is proposed as a target, an OKR or a compensation input**, the incentive it creates
is stated explicitly in the same document: when pay depends on the number, the cheapest ways to move
it are methodological — survey after a success moment, exclude difficult segments, ask the champion
rather than the daily user. None of these require bad faith and all of them destroy the
comparability that made the number worth having.

---

## 8. CUSTOMER DATA — mandatory, non-negotiable

- [ ] **Survey responses are personal data.** No identifier is stored beyond what closing the loop
      requires.
- [ ] **No identified verbatim is reproduced in this or any repository artifact.** Themes travel;
      verbatims and identifiers stay in the survey system. Responses referenced by response id.
- [ ] **The confidentiality promise made at collection binds the entire downstream process.** If the
      survey was presented as anonymous, those responses are **never re-identified and never followed
      up** — that promise was part of the exchange.
- [ ] **No re-identification by account matching, timing correlation, or any other route**,
      regardless of how useful it would be.
- [ ] Loop closure happens in the authorized system that already holds the contact record, executed
      by the relationship owner.
- [ ] No named individual is characterized anywhere in this report.
- [ ] Analysis is at account, cohort and segment level; individual-level detail only where loop
      closure genuinely requires it, and then only in the authorized system.
- [ ] Special-category personal data is **out of scope** — stop and escalate to the human owner.

---

## 9. Boundary

- Does **not** score renewal risk or account health → `@retention-lead` (a loyalty score is an input
  to health at best, **never a substitute for it**).
- Does **not** define first value or activation → `@onboarding-lead`.
- Does **not** own the full feedback taxonomy, deduplication and routing programme → `@voice-lead`.
  This report owns the loyalty instrument and its loop, nothing wider.
- Does **not** answer why customers switch causally → `@products:jobs-analyst`.
- Does **not** produce case studies or run campaigns → marketing squad.
- Does **not** construct referral incentives, terms, fees or rewards → sales squad.
- Does **not** take a roadmap or prioritization decision → `@products`, `@pm`.
- Does **not** implement survey tooling → `@dev`, `@data-engineer`.
- Does **not** frame epics (`@pm`), draft stories (`@sm`), test (`@qa`), or push (`@devops` —
  exclusive).

---

## 10. Completion

- [ ] Framing, population and sampling rule fixed in writing **before** the wave ran
- [ ] Sample size, response rate and composition reported **before** the score
- [ ] Score reported as a range; movement below sampling error explicitly not interpreted
- [ ] Composition shift checked and ruled in or out before any experiential explanation
- [ ] Segment-stable comparison provided wherever the aggregate moved
- [ ] Relationship and transactional waves not pooled
- [ ] Method drift since the previous wave declared
- [ ] Verbatim themes with counts accompany the score
- [ ] Loop latency and closure rate reported beside the score
- [ ] Every detractor response contacted, or recorded as not contacted with the reason
- [ ] Honest declines counted as closures; silence never counted as closure
- [ ] Promoter language captured and handed onward
- [ ] Every theme routed with exactly one named destination and owner
- [ ] Instrument limits, including the contested predictive status, stated in this document
- [ ] All four VERIFY markers resolved or explicitly flagged UNVERIFIED
- [ ] Customer-data section fully satisfied
- [ ] No selective sampling, favourable timing, coaching or re-identification anywhere in the wave
- [ ] Versioned in the repository with the sampling rule frozen alongside it
