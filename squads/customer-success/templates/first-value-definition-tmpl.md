# First-Value Definition by Segment — {PRODUCT_OR_LINE}

**Template ID:** CS-TM-002
**Owner:** `@customer-success:onboarding-lead` (Threshold)
**Produced by:** `*define-first-value`, `*activation-path`, `*habit-criterion`, `*activation-model`
**Consumed by:** `@customer-success:retention-lead` (health-model inputs), `@data-engineer`
(instrumentation requirements), `@ux-design-expert` (friction findings)

**Method attribution.** Time-to-first-value and activation is a **practitioner discipline with no
single canonical published work**. Do not attach an author, a book or a year to it. Where an
individual construct used here has a documented source, name that source at the point of use; where
it does not, label it practitioner convention. Inventing an attribution would be worse than having
none.

[[LLM: Do not proceed past section 2 while first value is unfalsifiable. Every step of the path is
justified by the destination it leads to, and a path designed before the destination is archaeology:
each step exists because something once went wrong and nobody can now say which milestone it
unlocks.]]

---

## 1. Segmentation — run this first

One product usually has several first values, one per segment or use case. A single definition
applied across segments is wrong for most of the base and produces an activation metric that
misleads systematically.

| Segment | Distinguishing characteristic | Do they buy the same outcome? | Source (dated) |
|---|---|---|---|

- [ ] Segments that buy different outcomes get **separate definitions** below.
- [ ] Segments merged into one definition carry a stated justification.

---

## 2. First-value definition — one block per segment

### Segment: {name}

| Field | Content |
|---|---|
| **Outcome bought, in the customer's words** | {quote the construct, not the person — sourced from a dated interview, renewal note or won-deal record} |
| **Source and date** | {record id + date. Never a contact name} |
| **First-value event (observable)** | {what exists in the system, or what can be shown to the customer, the first moment the outcome occurs} |
| **Why this event and not an earlier one** | {what an earlier candidate would let through} |
| **Instrumentation status** | INSTRUMENTED / PARTIALLY INSTRUMENTED / UNMEASURED |
| **If not fully instrumented** | {what degrades, what the fallback definition is, what `@data-engineer` must build} |

#### Qualification test — all four must pass

| # | Test | Answer | Evidence |
|---|---|---|---|
| 1 | Is it **binary** — answerable yes or no for a given account on a given date? | | |
| 2 | Is it **observable** in data today, or with named instrumentation? | | |
| 3 | Is it the **customer's outcome**, not a vendor completion event? | | |
| 4 | Can an account reach it **without the outcome actually occurring**? | must be **NO** | |

> Test 4 is the one that fails silently. Account created, training delivered, integration connected
> and implementation checklist complete are all reachable while the customer's Monday is unchanged.
> If the answer to test 4 is yes, the definition measures vendor effort and every downstream metric
> built on it inherits the defect.

#### Historical separation test — mandatory

Take retained accounts and accounts that churned early, and check whether the definition separates
them. A definition that does not separate is describing effort, not value.

| Group | n | Met the definition within {window} | Notes |
|---|---|---|---|
| Retained | | | |
| Churned within {n} months | | | |

- **Separates?** yes / no
- **Previous definition tested for comparison:** {definition} — separated: yes / no
- **If it does not separate:** the definition is rejected here, not weakened until it passes.

---

## 3. Activation path to the definition

Work **backwards** from first value, never forwards from the current process.

| # | Milestone | Binary? | Owner (vendor / customer) | Prerequisite | Typical elapsed time | Failure mode | Unlocks |
|---|---|---|---|---|---|---|---|

- **Shortest credible path:** {the narrowest configuration that still produces a real outcome for a
  real user}
- **Steps that unlock no milestone:** {list — these are removal candidates and the cheapest
  acceleration available}
- **Customer decisions nobody prepared them to make:** {list — these dominate elapsed time and are
  invisible in vendor effort logs}
- **Access and permission dependencies:** {describe the prerequisite and its owner role — **never
  the credential or secret itself**}

---

## 4. Habit criterion — adoption, stated separately from activation

Reaching first value once proves the product can work here. Repeating the value-producing behaviour
without prompting proves it will.

| Field | Value |
|---|---|
| Behaviour | {the behaviour that produces the outcome — not logins, not sessions, not page views} |
| Frequency | |
| Distinct users required | |
| Unprompted? | {how "without prompting" is determined in data} |
| Instrumentation status | INSTRUMENTED / PARTIALLY INSTRUMENTED / UNMEASURED |

> Champion activation is not account activation. One enthusiastic user reaching first value while
> the intended daily users never start is the most common false positive in early life, and it
> survives until the champion changes role.

---

## 5. Measured baseline

| Segment | n | Start event | Median TTFV | p75 | p90 | **Never activated** |
|---|---|---|---|---|---|---|

- **Start event and why:** contract signature / kickoff / first access — the choice changes the
  number materially and is stated, not assumed.
- **Observation window:** closed at {n} days. An open window cannot produce a never-activated rate.
- **Never-activated rate is mandatory.** A TTFV figure computed only over accounts that activated is
  survivorship bias with a decimal point.
- **Divergence step:** the step at which p90 separates from the median — this is the intervention
  target.
- **Data limitations:** {accounts excluded and why, backfilled events, small-n segments}

---

## 6. Downstream consumers and review

| Consumer | What they receive | Why |
|---|---|---|
| `@customer-success:retention-lead` | Milestones + habit criterion | So the health model is built on value behaviour rather than on convenience metrics |
| `@data-engineer` | Instrumentation requirement list | Events needed, why each is needed, what breaks without it |
| `@ux-design-expert` | Friction findings requiring interface change | This template specifies the path, not the screens |
| `@customer-success:cs-chief` | Promise defects and wrong-fit patterns | Escalation, not silent absorption |

- **Review date:** {date}
- **Early-review triggers:** a new segment, a product change to the value path, a shift in the
  never-activated rate.

---

## 7. CUSTOMER DATA — mandatory, non-negotiable

- [ ] All analysis at **account and cohort level**. No named contacts anywhere in this artifact.
- [ ] No personal data stored beyond what the activation question requires.
- [ ] Customer records **referenced by id**, never reproduced — no interview transcripts, internal
      customer documents, contact records or identified verbatims.
- [ ] **No credentials, tokens, access secrets or connection strings, ever.** Where a stall is caused
      by an access prerequisite, record the prerequisite and the customer-side role that grants it —
      never the secret. If credential handling is genuinely part of implementation, that is a human
      owner's decision in an authorized system, not something arranged in an agent session.
- [ ] Anonymous feedback used as an input is never re-identified.
- [ ] No individual is characterized. "The admin is unresponsive" is a personal-data liability;
      "the named customer-side owner role has been vacant for 21 days" is an account-level fact.
- [ ] Special-category personal data is **out of scope** — stop and escalate to the human owner.

---

## 8. Boundary — what this artifact does not do

- Does **not** determine what job the customer is hiring the product to do →
  `@products:jobs-analyst`; structured discovery programs → `@products:discovery-lead`.
- Does **not** design screens, flows or copy → `@ux-design-expert`.
- Does **not** implement telemetry → `@data-engineer`.
- Does **not** score ongoing account health or renewal risk → `@retention-lead` (this artifact is
  its **input**, not its substitute).
- Does **not** own the loyalty instrument (`@advocacy-lead`) or feedback taxonomy (`@voice-lead`).
- Does **not** set contract terms, implementation fees or scope commercially → sales squad.
- Does **not** frame epics (`@pm`), draft stories (`@sm`), implement (`@dev`), test (`@qa`), or push
  (`@devops` — exclusive).
- **Promise defects are escalated, not absorbed.** If the outcome promised at sale is unreachable by
  any path, that returns to `@cs-chief` and the sales squad on the day it is identified. Compensating
  silently means the same promise is made to the next cohort.

---

## 9. Completion

- [ ] Segmented before defined
- [ ] Each definition binary, observable, customer-side, and unreachable without the outcome occurring
- [ ] Historical separation test run and reported, including a negative result
- [ ] Path worked backwards from the definition; steps that unlock nothing marked for removal
- [ ] Prerequisites named with customer-side owner roles and moved into the handover contract
- [ ] Habit criterion stated separately from activation, with frequency and distinct-user thresholds
- [ ] TTFV reported as a distribution over a closed window, never as a mean
- [ ] Never-activated rate reported alongside every TTFV figure
- [ ] Every element marked INSTRUMENTED, PARTIALLY INSTRUMENTED or UNMEASURED
- [ ] Customer-data section fully satisfied
- [ ] Versioned in the repository with a review date and early-review triggers
