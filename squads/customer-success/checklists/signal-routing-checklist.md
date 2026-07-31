# Signal Aggregation & Routing Checklist

**Checklist ID:** CS-CL-005
**Referenced by:** `voice-lead` (Auricle)
**Applies to:** `*intake-design`, `*aggregate-signal`, `*theme-map`, `*evidence-weight`,
`*problem-restate`, `*route-signal`, `*loop-back`, `*signal-register`, `*taxonomy-maintain`
**Purpose:** The bar a theme must clear before it is weighted, routed to an owner, or entered in the
standing register.

[[LLM: EXECUTION

Mark `[x]` only where you can name the evidence — the count, the channels, the window, the record
references. `[ ]` where you cannot. `[N/A]` with a written reason.

CRITICAL failures block routing. A theme routed while failing them sends a manufactured trend, a
feature list, or one loud account's opinion to a squad that will treat it as evidence.

Attribution note binding on the whole checklist: voice-of-customer collection and routing is a
**practitioner discipline with no single canonical published work**. Do not attach an author, a book
or a year to it. Constructs with a documented source are attributed at the point of use; constructs
without one are practitioner convention.]]

---

## Part A — capture

- [ ] Every channel through which signal arrives is inventoried, **including the informal ones** —
      escalation emails, conference conversations, executive relationships
- [ ] Channels where signal is received and **never recorded** are identified — these are usually the
      highest-value and the least visible
- [ ] Each channel is classified **solicited or unsolicited**
- [ ] Every item carries a **date, an account reference and a channel** **(CRITICAL — an undated item
      makes trend analysis impossible and accumulates silently)**
- [ ] Capture responsibility and latency are named per channel; anything beyond same-day capture is
      capture that mostly does not happen
- [ ] Per-channel data terms are recorded: what is anonymous, what is confidential, what may be
      aggregated **(CRITICAL — these terms bind every downstream use)**
- [ ] Taxonomy ownership is named: who maintains it, and how a new theme is created

## Part B — restatement

- [ ] **Every item is restated as the problem it implies, not counted as the solution it proposes**
      **(CRITICAL — counting requests produces a ranked feature list that no single customer actually
      needs, and hides the fact that several requests share one cause)**
- [ ] The problem is stated as an **outcome the customer cannot achieve**, not as a feature name
- [ ] The original request text is retained as a **source reference** in the source system, not
      reproduced here
- [ ] Requests that collapse into one problem are merged, and the merge is recorded
- [ ] Requests hiding several distinct obstructions are **split** — splitting is more common than
      teams expect
- [ ] Items that cannot be restated without guessing are marked incomplete and either interviewed
      before routing, or routed **as a question rather than as a finding**
- [ ] Any inference made during restatement is labelled as an inference

## Part C — counting

- [ ] **Deduplicated by account first (CRITICAL)** — one account raising the same request eleven
      times through four channels is **one** data point delivered persistently
- [ ] **Distinct-account counts and raise counts are reported in separate columns (CRITICAL —
      reporting mentions as accounts manufactures a trend from one persistent opinion)**
- [ ] **Volume and exposure are reported separately (CRITICAL — collapsing them hides which one is
      driving a decision, and after that the company cannot distinguish a widespread problem from an
      important relationship)**
- [ ] **Solicited and unsolicited signal are never pooled into a single count** **(CRITICAL — they
      are different evidence: one tells you what people cared enough to raise, the other what people
      say when asked, and their mixture is uninterpretable)**
- [ ] Segment distribution of affected accounts is stated

## Part D — weighting

- [ ] **Channel mix is stated with every theme** **(CRITICAL — a support-only theme and a
      four-channel theme are different classes of evidence, and the difference disappears when the
      mix is omitted)**
- [ ] Each channel's known bias is carried with the theme, not averaged away
- [ ] **Behavioural corroboration is run wherever the theme makes a behavioural claim**
- [ ] Where telemetry and feedback disagree, this is handled as a **population difference and stated
      as the finding**, not resolved by discarding one side
- [ ] Trend is compared across **equal-length windows**
- [ ] Concentration is checked: is one account, one segment or one channel responsible for most of it?
- [ ] Strength is assigned as STRONG / MODERATE / WEAK against stated criteria
- [ ] **Strength is never derived from how forcefully the theme was expressed** **(CRITICAL —
      intensity is information about the speaker; count is information about the base)**
- [ ] **A theme resting on one account is labelled WEAK regardless of who raised it (CRITICAL)** — it
      may still be worth acting on for legitimate business reasons, and that is a decision made
      openly on both numbers, not by inflating the count
- [ ] **The conditions that would raise or lower the strength are stated**, so the weighting is
      auditable rather than asserted
- [ ] Themes lacking count, channels, date range or source references are marked **UNVERIFIED and not
      routed** **(CRITICAL — Constitution Article IV, No Invention)**

## Part E — silence

- [ ] Conspicuously absent segments, roles and channels are identified
- [ ] **Silence is never read as satisfaction** **(CRITICAL — the worst-served customers are the least
      likely to report, and the ones who gave up have stopped writing entirely)**
- [ ] A silent segment's churn rate is checked; silence plus above-average churn is reported as an
      **intake defect**, and it frequently outranks every theme on the board
- [ ] Themes that stopped recurring are examined: solved (verify with telemetry) or abandoned by the
      accounts that cared (check whether they churned) — different facts
- [ ] Role coverage is checked: if intake reaches buyers and admins but not daily users, that is an
      intake defect, not a finding

## Part F — routing

- [ ] **Exactly one owner per theme (CRITICAL — a theme routed to everyone is owned by no one and
      returns unchanged next quarter)**
- [ ] Where two owners appear to apply, the theme is **split** into two themes
- [ ] Near-miss owners are named and excluded explicitly
- [ ] The route is packaged with: restated problem in outcome terms, evidence weight, distinct
      accounts, exposure band, date range, source references
- [ ] **Explicit non-claims attached: no solution design, no prioritization, no roadmap position, no
      commercial recommendation (CRITICAL)**
- [ ] **No priority recommendation accompanies the route** **(CRITICAL — routing is not prioritizing;
      crossing that line converts evidence into advocacy and makes the evidence less trusted)**
- [ ] Themes that are **not** product problems — documentation, education, expectation set at sale,
      support process failure, pricing confusion — are routed to their **real owners**, not defaulted
      to product
- [ ] No revenue-at-risk inference beyond the exposure band; that inference needs health data and
      belongs to `@retention-lead`
- [ ] The route is recorded in the register with date, owner, status ROUTED and a **follow-up date**
      **(CRITICAL — a route with no follow-up becomes an orphan, and orphans are why customers
      conclude feedback goes nowhere)**

## Part G — loop-back

- [ ] **The terms under which each signal was given are checked before any outreach (CRITICAL —
      anonymous stays anonymous)**
- [ ] What the customer is told covers: what was heard, what was understood as the problem, what was
      decided, and when — or that it will not happen
- [ ] **An honest decline counts as a closed loop; silence never does (CRITICAL)**
- [ ] An internal status change with no customer contact is **not** counted as closure
- [ ] Outreach is routed through the **relationship owner in the authorized system**; this squad does
      not contact customers directly
- [ ] Coverage is measured per theme: the proportion of raising accounts actually informed
- [ ] **Themes with a disposition never returned to customers are reported as programme defects, not
      as acceptable backlog** **(CRITICAL — collecting without returning is extraction, and the
      thoughtful contributors stop first)**

## Part H — taxonomy and register

- [ ] Themes reviewed for drift: grown to cover unrelated problems, or split in practice but not on
      paper
- [ ] Duplicates merged, overloaded themes split, dormant themes retired **with a reason, never
      silently**
- [ ] Every theme still states a **problem**, not a solution — taxonomies drift toward feature names
- [ ] Each theme's owner re-verified after any squad or product change
- [ ] All live themes **re-weighed against the current window**, so the register reflects now rather
      than accumulated history
- [ ] Orphans flagged; one-way themes flagged
- [ ] Register **versioned in the repository** with a next review date — a theme register living in a
      spreadsheet in someone's drive is not the standing record

## Part I — CUSTOMER DATA, mandatory

- [ ] **Themes travel; verbatims and identifiers stay in the system where they were collected
      (CRITICAL)**
- [ ] **No verbatim text with identifiers in any repository artifact (CRITICAL)** — sources cited by
      record id
- [ ] No personal data stored beyond what routing and loop closure require **(CRITICAL)**
- [ ] **Anonymous feedback never re-identified (CRITICAL)** — no account matching, no timing
      correlation, no route, regardless of usefulness
- [ ] **Confidential channels never aggregated into attributable findings (CRITICAL)**
- [ ] No named individual characterized anywhere in the output **(CRITICAL)**
- [ ] Account-level references and record ids used throughout; they are sufficient for every artifact
      this discipline produces
- [ ] Special-category personal data stopped and escalated to the human owner **(CRITICAL)**

## Part J — boundary

- [ ] **No roadmap or prioritization decision taken (CRITICAL)** → `@products`, `@pm`
- [ ] No discovery program run → `@products:discovery-lead`; no causal switching account →
      `@products:jobs-analyst`
- [ ] No loyalty instrument work → `@advocacy-lead`
- [ ] No health scoring or renewal risk → `@retention-lead`
- [ ] No activation design → `@onboarding-lead`
- [ ] No ticket handling or SLA operations → support function
- [ ] No pricing, packaging or contract-term decision → sales squad
- [ ] No epic (`@pm`), story (`@sm`), backlog (`@po`), code (`@dev`), test (`@qa`) or push
      (`@devops` — exclusive)

---

## Verdict

| Condition | Verdict |
|---|---|
| All CRITICAL satisfied, at most three non-critical gaps | **ROUTE** |
| All CRITICAL satisfied, four or more non-critical gaps | **ROUTE WITH GAPS NAMED** in the package |
| Any CRITICAL unsatisfied | **BLOCK** |
| Counts expressed in mentions rather than distinct accounts | **BLOCK and recount** |
| A priority recommendation attached to a route | **BLOCK and remove** — boundary breach |
| Theme missing count, channels, date range or source references | **UNVERIFIED — do not route** |
| Any re-identification of anonymous feedback | **BLOCK and escalate to the human owner** |

A blocked theme costs a window. A theme routed on inflated counts costs the receiving squad a
quarter, and costs this register the trust that makes its next finding usable.
