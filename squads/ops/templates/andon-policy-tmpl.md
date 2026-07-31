# Stop-the-Line Policy — [SCOPE, e.g. THE MAIN BRANCH BUILD]

**Template ID:** OPS-TMPL-006
**Produced by:** `@ops:lean-lead` (Kaizen) — `*andon-policy`
**Artifact type:** A written rule about when work should halt. **Not a mechanism.**
**Author:** `@ops:lean-lead` · **Owner:** [the team] · **Review:** [+1 quarter]

[[LLM: FILLING THIS TEMPLATE — READ THIS BEFORE ANYTHING ELSE

This is the sharpest edge of the boundary in this squad, and the one most likely to be crossed by an
agent trying to be helpful.

Writing "the line stops when the build breaks" is METHOD. Stopping it is an OPERATION.
Blocking a merge, holding a pipeline, gating a release, failing a check: all @devops, exclusively.

Section 6 is mandatory and must be completed before this document is published. Every mechanical
consequence in Section 2 must name @devops in its Executor column. A stop rule that reads as though
this squad performs the stop is the exact artifact that produces an authority violation later.

Urgency is not an exception. A build breaking is not an exception. A severity-1 defect is not an
exception.]]

---

## 0. Boundary — the rule and the switch are held by different parties, deliberately

| This document is | This document is not |
|---|---|
| An agreed rule about which condition should halt work | A mechanism that halts anything |
| A statement of who may call a stop | A permission to execute one |
| A statement of what resumes work | A gate, a branch protection rule, or a pipeline condition |

**Every mechanical consequence below is executed by `@devops` under their exclusive authority.**

The separation is not bureaucracy. It keeps a stop reviewable and accountable rather than
instantaneous and anonymous, and it keeps the party who wrote the rule from being the party who
enforces it.

---

## 1. Why a stop rule exists here

| Field | Value |
|---|---|
| Condition this addresses | [what keeps producing defects while work continues] |
| Evidence | [counted occurrences, from the waste walk or from history] |
| What continuing costs | [one problem becoming many — state the observed multiplier if known] |

> Jidoka — build in the stop. A process that continues while producing defects converts one problem
> into many. The value is in stopping at the moment of detection, when the cause is still visible.
> [SOURCE: Ohno, *Toyota Production System: Beyond Large-Scale Production*, Japanese 1978 / English
> translation 1988.]

---

## 2. The rule

| Element | Rule | **Executed by** |
|---|---|---|
| **Who may call a stop** | [Anyone. No approval, no seniority requirement.] | — (calling is not executing) |
| **Trigger condition** | [e.g. the main branch build fails; a severity-1 defect reaches production] | — |
| **What halts** | [e.g. no new work merged to main] | **`@devops`** — merge blocking, pipeline hold, gate |
| **During the stop** | [e.g. the team's first priority is restoring the condition, not diagnosing it fully] | Team |
| **What resumes it** | [e.g. the build is green, or the severity-1 defect is mitigated] | **`@devops`** releases the hold |
| **Diagnosis** | [continues after resumption] | Team · `@ops:incident-lead` if it became an incident |
| **Escalation** | [e.g. a stop exceeding N hours is an incident] | → `@ops:incident-lead` `*declare` |

**If any Executor cell above is empty, this policy is incomplete and must not be published.**

---

## 3. Why the right to call a stop must be universal

A stop that requires permission arrives after the context is gone. The entire value of stopping is
that the cause is still visible at the moment of detection — a delay of hours costs exactly the
thing the stop was for.

A stop right that has never been exercised is a paragraph, not a policy.

| Measure | Target | Reading if zero |
|---|---|---|
| Times the stop was called this quarter | [n] | **Zero uses is a finding, not a success.** Either the trigger never occurred (check), or people did not believe they were allowed to (more likely). |

---

## 4. What this rule does not do

- It does not weaken or replace a quality gate. Gates are `@qa`.
- It does not change the release cadence, the branch strategy, or any pipeline configuration.
  Those are **`@devops`**, and any implication here is a finding for them, not an instruction.
- It does not command an incident. If the stop escalates, `@ops:incident-lead` declares and runs the
  structure; **`@devops`** still executes every mitigation.
- It does not decide backlog priority during a stop. That remains `@po`.

---

## 5. Adoption

| Field | Value |
|---|---|
| Agreed with | [team] on [date] |
| Recorded as a working agreement by | `@sm` |
| Mechanical implementation requested from | **`@devops`** — [what specifically: e.g. branch protection on main, pipeline hold condition] |
| Implementation status | requested / accepted by `@devops` / in place |

**The rule is in force only once `@devops` has accepted and implemented the mechanical part.** Until
then this document describes an intention. Say so rather than assuming coverage.

---

## 6. Authority audit — mandatory before publication

- [ ] Every mechanical consequence in Section 2 names **`@devops`** as executor
- [ ] No sentence in this document instructs this squad, or any non-`@devops` agent, to block,
      halt, gate or configure anything
- [ ] Section 0 is present and unmodified
- [ ] The trigger condition is objectively checkable, not a judgement call about severity
- [ ] A resume condition exists and is stated in observable terms
- [ ] An escalation path exists for a stop that does not resolve
- [ ] The document states that it is a rule and not a mechanism
- [ ] The implementation request to `@devops` is recorded, with its status

A failure on any line above means this document must not be circulated. A stop-the-line policy is
the artifact in this squad most likely to be read as authorization, precisely because it sounds
operational.

---

## 7. Review

| Field | Value |
|---|---|
| Review date | [+1 quarter] |
| Reviewed against | Times called · times the trigger occurred without a call · median stop duration · whether the stop was executed by anyone other than `@devops` |
| Retire this rule when | [the condition it addresses no longer exists — a stop rule defended rather than revised has become the waste] |

---

## Attribution

Jidoka — automation with a human touch, in which a process stops itself the moment something is
wrong rather than continuing to produce defects — is one of the two pillars documented by Taiichi
Ohno in *Toyota Production System: Beyond Large-Scale Production* (Japanese 1978; English translation
1988). Applied with attribution. The `@ops:lean-lead` persona name refers to the practice of
continuous improvement, not to any author.

The specific andon-cord framing widely taught in later lean practice, and its application to
software delivery, belong to the **broader lean tradition** rather than to Ohno's book, and are not
attributed to him.

The requirement that every consequence name its executing agent is an AEXOS constitutional
constraint (Article II — Agent Authority), not a position from the source.

## Related

- Waste evidence this rule usually follows from: `squads/ops/templates/value-stream-walk-tmpl.md`
- Countermeasure quality bar: `squads/ops/checklists/countermeasure-quality-checklist.md`
- Waste categories: `squads/ops/data/waste-catalog.yaml`
