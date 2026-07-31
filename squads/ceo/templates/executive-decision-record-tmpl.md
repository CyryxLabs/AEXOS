# Executive Decision Record — [DECISION TITLE]

**Template ID:** CEO-TM-005
**Owned by:** ceo-chief (Regent)
**Method source:** Original. This is an orchestration artifact, not the application of a published
methodology. The specialist methods live with the specialists — Rumelt for strategy, Thorndike
for capital allocation, Grove for organisation, and the documented discipline of stakeholder
reporting — each attributed in its own agent file. Nothing in this template is attributed to any
of them.

> **A decision that lives only in a transcript did not happen.** This record is written to the
> repository. Where the decision touches fiscal, legal, employment or corporate matters, the
> record is an input to review by qualified human advisers, never a substitute for it.

[[LLM: TEMPLATE INSTRUCTIONS — EXECUTIVE DECISION RECORD

Fields are fixed. Any unknown field is written UNVERIFIED rather than filled with a plausible
value (Constitution Article IV, No Invention).

Two rules do most of the work:

1. CLASSIFY REVERSIBILITY BEFORE GATHERING EVIDENCE. The classification sets how much
   evidence is worth buying. Treating every decision as irreversible is as costly as
   treating none of them as such.
2. IF NOTHING WAS GIVEN UP, NO DECISION WAS MADE. Section 6 is not optional and cannot be
   answered with "nothing". A choice that forecloses nothing is an announcement, and the
   record should say so in those words.

DISSENT IS RECORDED VERBATIM. Summarising a specialist's objection into a closing caveat is
the specific failure this section exists to prevent.]]

---

## 1. Question

> Phrased so that a reader can tell whether it was made.

[The decision, in one sentence.]

**Restated in the owning discipline's vocabulary:** [restatement]
**Owning specialist:** [strategy-lead / capital-allocator / org-designer / stakeholder-lead]
**Near misses excluded, and why:** [the two nearest disciplines, and the entry from each one's NOT-list that excluded it]

---

## 2. Classification

| Class | Selected | What it implies |
|---|---|---|
| Reversible and cheap | | Decide now on judgement. Record the reversal trigger in one line. That is a complete record for this class |
| Reversible but costly | | Require at least one checkable data point per option |
| Irreversible | | Require named evidence per option, a stated downside case, and dissent recorded |

**Cost and duration of undoing it:** [what it would cost, and how long the cost persists]

**Evidence sufficiency gate:** if this is irreversible and the evidence is thin, this record is
**blocked** and the missing evidence is named in Section 12 rather than the record being completed.

---

## 3. Coherence position

> Which link of the chain this decision sits on, and what it depends on upstream.

| Link | Owner | Current artifact | Date | Status |
|---|---|---|---|---|
| Diagnosis | strategy-lead | | | present / MISSING / stale |
| Guiding policy | strategy-lead | | | |
| Coherent action | strategy-lead | | | |
| Capital | capital-allocator | | | |
| Organisation | org-designer | | | |
| Promise | stakeholder-lead | | | |
| Account | stakeholder-lead | | | |

- **This decision sits on link:** [link]
- **Upstream links it depends on:** [links]
- **Any upstream break?** [If yes, this decision is premature — repair upstream first. A break invalidates every link downstream of it, not only the adjacent one.]

---

## 4. Options considered

> At least two **real** options, each with its cost. A single option with a straw alternative
> is not a comparison.

| # | Option | Cost | Who proposed it | Evidence behind it |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**Do-nothing option:** [stated explicitly, with its cost. If it was not considered, say so.]

---

## 5. Chosen

[The option taken, and by whom it was proposed.]

---

## 6. Given up

> What this choice forecloses. **If nothing, the decision was an announcement — write that.**

- **Option foreclosed:** [what]
- **Who or what is no longer served:** [specifically]
- **Magnitude:** [with a source, or marked as an estimate]
- **Is this recoverable?** [and over what period]

---

## 7. Evidence

| Claim | Source artifact | Date | Sample / scope | Status |
|---|---|---|---|---|
| | | | | VERIFIED / ASSUMPTION / UNVERIFIED |

**Assumptions are labelled as assumptions.** An assumption presented as a figure produces false
precision, which survives being quoted while its caveat does not.

**Weakest link in the evidence:** [the item the decision most depends on and is least sure of]

---

## 8. Arbitration, if specialists disagreed

*Complete only if two specialist recommendations conflicted. Otherwise write NONE.*

| | Specialist A | Specialist B |
|---|---|---|
| Recommendation, in one sentence, unsoftened | | |
| Assumed challenge | | |
| Assumed time horizon | | |
| Assumed binding constraint | | |
| Evidence, with date and sample | | |
| Cost if wrong | | |

**The unshared assumption:** [name it. Two specialists disagreeing usually means an unstated assumption differs.]

**Outcome — exactly one:**
- [ ] Evidence wins this round (one side has named, checkable evidence; the other does not)
- [ ] Not a conflict but a scope or horizon split (both right about different things)
- [ ] Genuine conflict — the deciding test is: [named test or diagnostic]
- [ ] Values or risk-appetite decision, escalated to the human principal

**Averaging was rejected because:** [state it explicitly. Averaging two evidenced positions
manufactures a third that no evidence supports.]

**Which artifact must now be revised:** [artifact]

---

## 9. Owner

- **Owner:** [a single named **human** principal. Not an agent.]
- **Consulted before the decision:** [who, and what they hold that would have changed it]
- **Informed after:** [who, through what channel]

---

## 10. Review and reversal

- **Review date:** [date — revisited regardless of outcome]
- **Reversal trigger:** [the observation that would make this decision wrong. Written now, not reconstructed later.]
- **Who watches the trigger:** [named, with a frequency]

---

## 11. Dissent

> Recorded **verbatim**, not summarised. Surfaced before the decision, not appended after it.

| Who | Objection, in their own words | Was it addressed? |
|---|---|---|
| | > "[verbatim]" | resolved / accepted as a residual risk / unresolved |

*If none was raised, write "none raised" — and consider whether the process allowed for it.*

---

## 12. UNVERIFIED and blocking gaps

| Missing item | Why it matters | Would it block this decision? |
|---|---|---|
| | | blocking / not blocking |

*For an irreversible decision, any blocking gap means this record is not complete and the
decision does not proceed.*

---

## 13. Escalations and adviser flags

| Item | Kind | Routed to | Status |
|---|---|---|---|
| | ethical / legal / safety / fiscal / employment / regulatory | named human adviser or agent | open / cleared |

**Ethical, legal and safety concerns raised by any specialist are surfaced here explicitly and
before the decision proceeds — never as a footnote.** Where the decision touches fiscal, legal
or corporate matters, this record is an input to review by a qualified human adviser and is not
a determination.

---

## 14. Downstream consequences

| Consequence | Owner | Status |
|---|---|---|
| Capital reallocation implied | `@ceo:capital-allocator` | |
| Organisational consequence implied | `@ceo:org-designer` | |
| Promise created or withdrawn | `@ceo:stakeholder-lead` | |
| Register entry required | `@ceo:stakeholder-lead` | |
| Delivery handoff | `@pm` — epic framing only, after this record is complete | |

**What this squad did NOT decide:** [state it explicitly, so `@pm` does not assume it was settled.]

---

## 15. Record metadata

| Field | Value |
|---|---|
| Decision ID | |
| Date decided | |
| Recorded by | ceo-chief (Regent) |
| Repository path | |
| Handoff artifact | `.aexos/handoffs/` |
| Supersedes | [prior decision record, if any] |

---

## Release gate

Do not close this record until `checklists/executive-coherence-checklist.md` has been run and
every failure is repaired or explicitly accepted with a stated reason.
