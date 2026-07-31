# Lifecycle Coherence Brief — {ACCOUNT_OR_COHORT}

**Template ID:** CS-TM-001
**Owner:** `@customer-success:cs-chief` (Anchor)
**Produced by:** `*diagnose`, `*coherence-check`, `*account-brief`, `*conflict-resolve`
**Method source:** Original orchestrator role. No external methodology is claimed by this template.
Where a section consumes a specialist artifact, that artifact carries its own attribution.

[[LLM: This template assembles what the specialists already produced. It generates nothing.
Every cell in every table must name the source artifact and its date. A cell you cannot source is
written `UNEVIDENCED`, never inferred, never left blank. Constitution Article IV — No Invention.]]

---

## 0. Identification

| Field | Value |
|---|---|
| Subject | {account id / cohort definition — never a company contact, never a person} |
| Population | one account / cohort / segment / whole base — **must be unambiguous before proceeding** |
| Window | {start date} to {end date} |
| Pending decision | {the decision this brief feeds, and who makes it — if none, say "reporting, not work"} |
| Assembled | {date} |
| Assembled from | {n} specialist artifacts, listed in section 5 |

> If **Population** is ambiguous, stop here. A brief assembled across an undefined population
> produces findings that are true of nobody.

---

## 1. Triage record (from `*diagnose`)

| Field | Content |
|---|---|
| Request as stated | {the requester's own words} |
| Request as owned | {restated in lifecycle vocabulary} |
| Symptom date | {when it was first observed, and how} |
| **Stage where it surfaced** | promise / activation / adoption / realized value / health / renewal / advocacy |
| **Stage where it originated** | {attributed — this is usually a different stage} |
| Attribution evidence | {what makes the origin claim checkable, with source and date} |
| Owner | exactly one: `@onboarding-lead` / `@retention-lead` / `@advocacy-lead` / `@voice-lead` |
| Near misses excluded | {discipline} — excluded because its NOT-list covers this: {reason} |
| Provisional answer | {two-minute usable version, explicitly labelled provisional} |

---

## 2. Lifecycle chain assembly

One row per link. `Says` quotes the specialist artifact's finding; it does not summarise it into
something the artifact did not claim.

| Link | Owner | Artifact + date | Says | Status |
|---|---|---|---|---|
| Promise | sales squad (input) | | | baseline / BREAK / UNEVIDENCED |
| Activation | `@onboarding-lead` | | | consistent / BREAK / UNEVIDENCED |
| Adoption | `@onboarding-lead` | | | consistent / BREAK / UNEVIDENCED |
| Realized value | `@retention-lead` | | | consistent / BREAK / UNEVIDENCED |
| Health | `@retention-lead` | | | consistent / BREAK / UNEVIDENCED |
| Renewal | sales (commercial) / `@retention-lead` (evidence) | | | consistent / BREAK / UNEVIDENCED |
| Advocacy | `@advocacy-lead` | | | consistent / BREAK / UNEVIDENCED |

**Propagation rule.** A break invalidates every link downstream of it, not only the adjacent one.
Classify each break below before proposing any repair.

---

## 3. Contradiction checks

Run all seven. A check that was not run is recorded as NOT RUN, never as passed.

| # | Check | Test applied | Result | Evidence |
|---|---|---|---|---|
| 1 | Promise drift | Does the outcome promised at sale match the first-value milestone onboarding drives to? | | |
| 2 | Health inversion | Did accounts scored healthy renew at a materially higher rate than at-risk accounts **in the last closed period**? | | |
| 3 | Score / verbatim divergence | Does the promoter or detractor classification agree with what the same account says in feedback and support? | | |
| 4 | Phantom adoption | Does the adoption metric measure the behaviour that produces the outcome, or the behaviour that is easy to instrument? | | |
| 5 | Reference risk | Does every reference and case-study account have **current** evidence of realized value? | | |
| 6 | Signal orphan | Does every captured signal have a named owner and a closed or explicitly declined status? | | |
| 7 | Save concentration | Are individual saves masking a repeating cohort failure with a common root cause? | | |

---

## 4. Findings and repair order

For each break:

### Finding {n} — {short name}

- **Link:** {which link}
- **Classification:** independent break / **inherited** from {upstream link}
- **What the artifacts actually say:** {quote both, with dates}
- **Why this is a break and not a disagreement:** {the assumption the two artifacts do not share —
  usually who the customer is, which population, or which date range}
- **Repair owner:** {one specialist}
- **What would falsify this finding:** {stated explicitly}

**Repair order.** Upstream first; parallel only where genuinely independent.

1. {link} — {owner} — because {downstream links inherit it}
2. {link} — {owner} — may run in parallel, no upstream dependency
3. …

> Never retune a downstream instrument before the upstream break is repaired. A health model
> retuned against a phantom adoption metric is retuned against the wrong behaviour.

---

## 5. Arbitration record (only if two artifacts contradict)

| | Position A | Position B |
|---|---|---|
| Artifact and date | | |
| Instrument | | |
| Subject / respondent | | |
| Population | | |
| Period | | |
| Reading | | |

- **The assumption they do not share:** {name it}
- **Arbitration heuristic applied:** instrumented behaviour beats reported sentiment this round /
  different populations means a segment split, not a conflict / neither evidenced → the output is
  an instrumentation plan, not a decision
- **Decision, or the deciding test:** {one or the other — never an averaged middle position}
- **Artifact marked for revision:** {which one, and by whom}

> Two contradictory readings are never averaged into an amber flag. Averaging manufactures a
> position no evidence supports and hides a gap that is usually fixable.

---

## 6. Source register

| # | Artifact path | Produced by | Date | Used in section |
|---|---|---|---|---|

**Gaps.** Links with no artifact at all are listed here as UNEVIDENCED, with what it would cost to
close each one. An unevidenced link is a finding, not an omission to be filled by inference.

---

## 7. CUSTOMER DATA — mandatory, non-negotiable

Applies to every section above and to anything derived from this brief.

- [ ] Subject is an **account id or a cohort definition**. No company contact, no individual, no role
      attached to a name.
- [ ] Work is at account and cohort level by default. Individual-level detail is requested only when
      the pending decision cannot be made without it, and then only the minimum.
- [ ] Customer records are **referenced, not reproduced**. Contact records, support transcripts,
      contract terms and survey verbatims stay in the authorized system of record; this brief
      carries the record id and the finding.
- [ ] No re-identification of anonymous feedback, by account matching or by any other route,
      regardless of how useful it would be.
- [ ] No named individual is characterized anywhere in this brief. "The champion is disengaged" is a
      personal-data liability; "a contact role change occurred with no successor engaged in 30 days"
      is an account-level fact and predicts better.
- [ ] Special-category personal data (health, financial, credential, biometric, and equivalents) is
      **out of scope**. If the brief cannot be completed without it, stop and escalate to the human
      owner rather than proceeding.
- [ ] Confidentiality terms attached at collection bind this brief. Anonymous stays anonymous;
      confidential channels are not aggregated into attributable findings.

---

## 8. Boundary statement — what this brief does not do

- Does **not** determine what job the customer is hiring the product to do, or the causal account of
  a switch → `@products:jobs-analyst`, `@products:discovery-lead`.
- Does **not** recommend a price, a discount, a contract term or a renewal position → sales squad.
  This squad supplies value evidence; the commercial table is theirs.
- Does **not** take a roadmap or prioritization decision → `@products`, then `@pm`.
- Does **not** frame an epic or write a PRD (`@pm`), draft a story (`@sm`), validate a story or
  reprioritize a backlog (`@po`), implement (`@dev`), test (`@qa`), or push, open a PR or touch CI
  (`@devops` — exclusive).

---

## 9. Completion

- [ ] Population named before any routing or assembly
- [ ] Origin stage attributed and stated as distinct from the surfacing stage
- [ ] Exactly one owner named, with near misses excluded by their NOT-lists
- [ ] All seven contradiction checks run or explicitly recorded NOT RUN
- [ ] Every break classified independent or inherited
- [ ] Repair order runs upstream first
- [ ] Every statement traced to a source artifact with a date; gaps marked UNEVIDENCED
- [ ] No contradiction averaged; arbitrations recorded with the losing artifact marked for revision
- [ ] Customer-data section fully satisfied
- [ ] Brief versioned in the repository — a decision that lives only in a transcript did not happen
