# Voice of the Customer — Theme Register {PERIOD}

**Template ID:** CS-TM-005
**Owner:** `@customer-success:voice-lead` (Auricle)
**Produced by:** `*aggregate-signal`, `*theme-map`, `*evidence-weight`, `*route-signal`,
`*loop-back`, `*signal-register`, `*taxonomy-maintain`

**Method attribution.** Voice-of-customer collection and routing is a **practitioner discipline with
no single canonical published work**. Do not attach an author, a book or a year to it. Constructs
with a documented source are named at the point of use; constructs without one are practitioner
convention and are labelled as such. Inventing an attribution would be worse than having none.

[[LLM: The register is the standing record of what customers raised and what the company did about
it. It is not a suggestion box and it is not a prioritization. Routing is not deciding — that
boundary is the reason the evidence is trusted.]]

---

## 1. Window and coverage

| Field | Value |
|---|---|
| Window | {start} to {end} — equal-length to the comparison window |
| Comparison window | {start} to {end} |
| Raw items in window | {n} |
| **Distinct accounts** | {n} |
| Channels included | {list} |
| Channels known to exist but not captured | {list — these are usually the highest-value and least visible} |

> Raw items are never reported as accounts. One account raising the same request eleven times
> through four channels is **one** data point delivered persistently.

---

## 2. Restatement pass — requests become problems

A request is a proposed solution in the customer's vocabulary. The finding is the problem underneath
it. Several different requests are frequently one problem; one request frequently hides two.

| Raw request (paraphrased, de-identified) | Channel | Restated problem (outcome the customer cannot achieve) | Source ref |
|---|---|---|---|

- **Requests collapsing into one problem:** {list}
- **Requests splitting into several problems:** {list}
- **Items that could not be restated without guessing:** marked incomplete — interviewed before
  routing, or routed **as a question** rather than as a finding.

---

## 3. Theme table

| Theme (restated problem) | Distinct accounts | Raises | Channel mix | Solicited / unsolicited | Window | Exposure band | Class | Strength |
|---|---|---|---|---|---|---|---|---|

**Class values:** product problem / activation friction / account risk / loyalty instrument /
documentation or education / expectation set at sale / support process failure / pricing or packaging
confusion.

**Strength values and their criteria:**

| Strength | Criteria |
|---|---|
| STRONG | Multiple accounts, three or more channels, corroborated by instrumented behaviour, stable or growing |
| MODERATE | Multiple accounts but a single channel, or uncorroborated by behaviour, or solicited-only |
| WEAK | A single account, a single channel, or strength derived from how forcefully it was expressed |

**Strength is always stated with the conditions that would raise or lower it**, so the weighting is
auditable rather than asserted:

| Theme | Would rise to {X} if | Would fall to {Y} if |
|---|---|---|

> **Volume and exposure are reported in separate columns, always.** A theme from the largest account
> and its most senior stakeholder is WEAK evidence about the base and may still be worth acting on
> for legitimate business reasons. What must not happen is the account count being quietly inflated
> by seniority — after that, the company can no longer distinguish a widespread problem from an
> important relationship, and it will make that mistake repeatedly.

---

## 4. Corroboration and trend

| Theme | Behavioural claim made? | Telemetry check | Result | Trend vs previous window |
|---|---|---|---|---|

- **Behaviour outranks report where both exist** — and where telemetry and feedback disagree, that is
  **not** a contradiction. Both facts are real; the gap between them is the finding, and it is
  usually a population difference.
- **Decaying themes:** {list} — for each, was it solved, or abandoned by the accounts that cared?
  Check whether those accounts churned. Those are different facts with different implications.

---

## 5. Conspicuous absence — an intake defect check

| Segment / role / channel | Signal volume | Churn rate | Assessment |
|---|---|---|---|

> Absence of signal is not absence of problem. The customers with the worst experience are the least
> likely to report, and the ones who already gave up have stopped writing. A silent segment with
> above-average churn is a **collection defect**, and it frequently outranks every theme on the board
> — the company is blind to a population it is losing.

---

## 6. Routing — exactly one owner per theme

| Theme | Owner (one) | Near-miss owners excluded, and why | Evidence handed over | Status | Route date | Follow-up date |
|---|---|---|---|---|---|---|

**Status values:** ROUTED / ACCEPTED / DECLINED / RESOLVED / **ORPHAN**

**Explicit non-claims, attached to every route:**

- No solution is proposed. The requested mechanisms are recorded as what customers asked for, and any
  of them, or none, may be right.
- **No priority is attached.** Whether it gets built, and when, belongs to `@products` and `@pm`, and
  no volume of feedback overrides that.
- No roadmap position is implied.
- No revenue-at-risk inference beyond the exposure band — that inference needs health data and
  belongs to `@retention-lead`.

> If two owners appear to apply, the theme is probably **two themes**. Split it. A theme routed to
> everyone is owned by no one and returns unchanged next quarter.

**Routing table:**

| Theme class | Owner |
|---|---|
| Activation friction, unreached first-value milestone, recurring stall reason | `@onboarding-lead` |
| Account risk, unresolved-issue patterns | `@retention-lead` |
| Loyalty instrument, survey design, survey loop | `@advocacy-lead` |
| Evidenced product capability problem | `@cs-chief` → `@products` → `@pm` |
| What customers are fundamentally trying to accomplish | `@products:jobs-analyst` |
| Incomplete, needs deliberate research | `@products:discovery-lead` |
| Interaction or comprehension problem | `@ux-design-expert` |
| Documentation or education gap | the owning function, named explicitly — never left implicit |
| Expectation set at sale, pricing or packaging confusion | sales squad |
| Capture, deduplication or loop-tracking gap | `@data-engineer` |

---

## 7. Loop-back

| Theme | Disposition | Accounts to inform | Informed | Coverage | Closure type |
|---|---|---|---|---|---|

**Closure types:** accepted with timing / **declined with reason** / resolved with confirmation.
**Invalid closures:** an internal status change with no customer contact, silence, or a generic
newsletter mention.

- **Outstanding closures:** {list} — reported as **programme defects**, not as acceptable backlog.
- **One-way themes** (disposition never returned to the customers who raised it): {list}
- Outreach is executed by relationship owners in the authorized systems. This squad does not contact
  customers directly and holds no contact data.

> An honest no closes the loop. Telling a customer a theme was heard, understood and will not be
> addressed this year respects them more than silence, and costs far less than the silence eventually
> does. Collecting without returning is extraction: the thoughtful contributors stop first, and what
> remains is a measure of stubbornness rather than of prevalence.

---

## 8. Taxonomy maintenance

| Action | Theme | Reason |
|---|---|---|
| Merged | | |
| Split | | |
| Retired | | {never retired silently} |
| Owner corrected | | |

- [ ] Every theme still states a **problem**, not a solution. Taxonomies drift toward feature names.
- [ ] All live themes re-weighed against the **current** window, so the register reflects now rather
      than accumulated history.

---

## 9. Flags

- **Orphans** (routed, no disposition past the follow-up date): {list}
- **One-way themes** (disposition never returned): {list}
- **Themes marked UNVERIFIED** (missing count, channels, date range or source references — **not
  routed**): {list}
- **Intake defects** (segments, roles or channels producing no signal): {list}

---

## 10. CUSTOMER DATA — mandatory, non-negotiable

- [ ] **Themes travel; verbatims and identifiers stay in the system where they were collected.**
      Aggregate and de-identify before anything leaves the source system.
- [ ] **No verbatim text with identifiers appears in this register or any repository artifact.**
      Sources are cited by record id so anyone with legitimate access can open them.
- [ ] Counts, channel mix, date range and exposure band require no name and no quotation — and every
      one of them is more decision-useful than a verbatim, which is one person's words being given
      the weight of a finding.
- [ ] No personal data stored beyond what routing and loop closure require.
- [ ] **Anonymous feedback is never re-identified**, by account matching or any other route.
- [ ] **Confidential channels are not aggregated into attributable findings.** The terms under which
      each signal was given bind every downstream use.
- [ ] No named individual is characterized anywhere in this register.
- [ ] Loop-back is executed through the relationship owner in the authorized system; this squad holds
      no contact record.
- [ ] Special-category personal data is **out of scope** — stop and escalate to the human owner.

---

## 11. Boundary

- **Routing is not prioritizing.** This register states the problem, the evidence and the owner.
  Whether it is built, and when, belongs to `@products` and `@pm`. **No volume of feedback overrides
  that**, and no priority recommendation accompanies a route.
- Does **not** run discovery — deliberate research programs are `@products:discovery-lead`, causal
  switching interviews are `@products:jobs-analyst`. Voice-of-customer consolidates what already
  arrives; it does not replace deliberate inquiry.
- Does **not** own the loyalty instrument → `@advocacy-lead`.
- Does **not** score health or renewal risk → `@retention-lead`.
- Does **not** design activation → `@onboarding-lead`.
- Does **not** handle tickets or SLAs → support function.
- Does **not** decide pricing, packaging or contract terms → sales squad.
- Does **not** frame epics (`@pm`), draft stories (`@sm`), validate stories or reprioritize backlog
  (`@po`), implement (`@dev`), test (`@qa`), or push (`@devops` — exclusive).

---

## 12. Completion

- [ ] Every item restated as a problem, with the original request retained as a source reference
- [ ] Counts expressed in **distinct accounts**, with raise counts kept in a separate column
- [ ] Channel mix and solicited/unsolicited split stated with every theme
- [ ] Solicited and unsolicited signal never pooled into a single count
- [ ] Strength assigned with the conditions that would raise or lower it
- [ ] Behavioural corroboration run wherever a theme makes a behavioural claim
- [ ] Trend compared across **equal** windows; decay interpreted rather than ignored
- [ ] Conspicuous absences examined and reported as possible intake defects
- [ ] Exactly one owner per routed theme, with near misses excluded explicitly
- [ ] Explicit non-claims attached to every route
- [ ] Themes that are not product problems routed to their real owners rather than defaulted to product
- [ ] Dispositions returned to raising accounts, with coverage measured
- [ ] Honest declines counted as closures; silence never counted as closure
- [ ] Outstanding closures reported as programme defects
- [ ] Every theme carries count, channels, date range and source references; anything without them
      marked UNVERIFIED and **not routed** (Constitution Article IV — No Invention)
- [ ] Customer-data section fully satisfied
- [ ] Register versioned in the repository with orphan and one-way flags and a next review date
