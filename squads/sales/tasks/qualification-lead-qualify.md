---
task: Qualify Deal Against MEDDIC
responsavel: "@qualification-lead"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - deal: Deal or account being qualified (required)
  - meeting_notes: Notes from every buyer conversation, each with its date (required)
  - buyer_communications: Emails, messages and documents produced by the buyer, with dates (optional but expected)
  - crm_record: Current stage, close date and forecast category as recorded today (optional)
  - prior_qualification_record: Previous record for this deal, if one exists (optional)
Saida: |
  - meddic_table: One row per letter with the finding, its named source, its date and its evidence score
  - unverified_block: Every field below evidence score 2, listed separately and visibly
  - gaps: Each gap with the single verification step that would close it, its owner and its date
  - top_two_verifications: The two highest-yield verification steps, ranked by decision impact
  - verdict: QUALIFIED, QUALIFIED WITH GAPS, NOT QUALIFIED or DISQUALIFIED, with the rule that produced it
  - derived_close_date: Close date derived from the buyer decision process, or stated as unavailable
  - integrity_findings: Any criterion we cannot satisfy, and any material limitation, gap or cost that must be disclosed
  - record_path: Dated qualification record written under squads/sales/
Checklist:
  - "[ ] Collect every artifact with its date before scoring anything"
  - "[ ] Ask the six letter questions one at a time, never batched"
  - "[ ] Record pain and decision criteria in the buyer's own words, verbatim"
  - "[ ] Label seller-constructed figures separately from buyer-stated figures"
  - "[ ] Score each letter 0 to 3 against the evidence scale, with a named source and date"
  - "[ ] State economic buyer access honestly, including never met"
  - "[ ] Map the decision process with dates, owners and the paper process"
  - "[ ] Run the three champion tests and record each result with its date"
  - "[ ] Write one verification step per gap, with an owner and a date"
  - "[ ] Derive the close date from the buyer decision process, never from our quarter"
  - "[ ] State plainly any criterion we cannot satisfy, rather than managing around it"
  - "[ ] Confirm no step in this task used fabricated urgency, scarcity or omission"
  - "[ ] Apply the verdict rules without softening for deal size"
  - "[ ] Write the record with a separate visible UNVERIFIED block"
---

# *qualify — Run The Full MEDDIC Read On A Deal

Materializes the `*qualify` command of `@qualification-lead` (Sieve, Tier 1), defined in
`squads/sales/agents/qualification-lead.md`.

## Method Attribution

The discipline applied here is **MEDDIC**, developed inside Parametric Technology Corporation
(PTC) during the 1990s and commonly credited to Dick Dunkel and Jack Napoli, who formalized and
taught it there.

An honest note carried by the agent and repeated here: MEDDIC circulated first as internal sales
practice and later through training organizations, **not** through a single canonical book by its
originators. This task therefore treats MEDDIC as a named discipline with a documented origin,
never as a text to quote. No sentence, title or year is attributed to any individual on the basis
of inference. Where practitioner formulations differ — notably the MEDDICC extension that adds
Competition and the MEDDPICC extension that adds Paper Process — the variation is stated as an
explicit extension rather than folded silently into the six letters.

## Purpose

Establish whether a deal is real and, if it is, exactly what is missing before it can close —
with an evidence score and a named source behind every letter, and one verification step behind
every gap.

Qualifying is deciding whom not to sell to. A disqualification produced by this task is a
deliverable, not a failure.

## Pre-conditions

| Condition | Blocker | Check |
|---|---|---|
| The deal is named and at least one buyer conversation has occurred | yes | `meeting_notes` contains at least one dated entry |
| Every artifact carries a date | yes | An undated artifact cannot be scored above 1 |
| The requester can distinguish what the buyer said from what we concluded | yes | Step 2 depends on it |
| A prior record exists | no | If present, score changes are reported as a delta |

## The Evidence Scale

Every field in this task is scored against this scale. A score without a per-letter source is
false precision, and it hides the gaps the score exists to expose.

| Score | Meaning |
|---|---|
| 0 | Absent. Nothing on file. |
| 1 | Asserted by the seller — inference, model or recollection. |
| 2 | Stated by the buyer verbally, recorded with a date. |
| 3 | Confirmed by the buyer in writing, or evidenced by a buyer-produced artifact. |

## Procedure

### Step 1 — Assemble the raw material

Collect meeting notes, buyer emails, any document the buyer produced, and the current CRM fields.
Attach a date to each. Anything without a date is capped at score 1 until dated.

### Step 2 — Work the six letters, one at a time (elicitation required)

Present each letter separately and wait for the answer. Do not batch the six into one prompt; a
batched answer produces a summary, and a summary is where the buyer's words disappear.

**I — Identify pain.** What is happening today that should not be? Ask for a recent specific
instance with a date. Record the consequence **in the buyer's words**. Capture the cost in money,
time, risk or a missed commitment. Establish who inside the buyer organization personally feels
it — pain with no owner does not fund projects. Establish what changed recently to make it urgent
now; if nothing changed, expect a no-decision outcome and say so. Never supply pain the buyer has
not named. A hypothesis is recorded as a hypothesis.

**M — Metrics.** What is the buyer measuring today, how often, and who reports it upward? Ask for
the current number and the target number, in the buyer's units, recorded verbatim. Separate any
seller-constructed model from the buyer-stated figure and label the two distinctly. A metric we
calculated is a proposal; a metric they stated is a metric. Unless the buyer has repeated the
number in writing, the score is 2 at best.

**E — Economic buyer.** Whose budget does this come out of, and what is that person's approval
limit? Distinguish requester, approver and releaser — only the releaser is the economic buyer.
Establish what that individual is personally measured on this year. State access honestly: never
met, met once, in regular contact, or has stated their own criteria to us. A forwarded email is
not access. If access is absent, design the path: who introduces us, what makes the introduction
worth their while, and what we bring that the requester cannot deliver on our behalf.

**D — Decision criteria.** Ask for criteria in three groups: technical, business, and relationship
or risk. Record each in the buyer's formulation; do not translate into our feature names. Record
who owns each criterion and how it will be scored. Flag any criterion we authored or heavily
influenced — influence is legitimate, counting it as independent buyer evidence is not. Identify
criteria we **cannot** satisfy and state them plainly. Concealing one is a material omission and a
disqualification signal, not a gap to be managed.

**D — Decision process.** Ask the buyer to walk the sequence from today to signature, step by
step, with the person and the expected duration for each. Capture required documents: security
review, legal review, privacy or data processing review, procurement and vendor onboarding, board
or committee approval. Capture signature authority thresholds and whether this deal size crosses
one. Anchor every step to a date — a process without dates is a wish. Identify the step most
likely to slip and who could pre-empt it.

**C — Champion.** Run three tests and record each with a date.

1. *Influence* — can this person get a meeting with the economic buyer inside a week, and have
   they ever done so for us?
2. *Personal benefit* — what do they gain if this succeeds, in their own words? A champion with
   no personal stake is a well-wisher.
3. *Willingness* — ask them to do something on our behalf when we are not in the room: arrange
   access, share the internal evaluation document, present our summary internally. **Agreement is
   not the test. Action is.**

An untested contact is recorded as a contact. If the willingness test fails twice, look for a
second champion rather than escalating pressure on the first.

### Step 3 — Ethics gate (blocking)

This gate runs inside the qualification, not after it. Any yes below **blocks** the step that
produced it. Do not soften it and do not proceed with a rewritten justification.

| Test | Blocking condition |
|---|---|
| Fabricated urgency | A deadline, price expiry or consequence is being invented to extract a qualification answer |
| Invented scarcity | Allocation, capacity or a competing account is claimed and is not real |
| Bluffed alternative | A competing offer or internal deadline is implied and is not true |
| Material omission | A known limitation, integration gap or total cost is being withheld to keep the deal qualified |
| Champion weaponized | The champion is being asked to advocate a claim we have not verified |

The compliant alternative in every case: if the buyer will not name a decision process, **that
silence is qualification data**. It does not need to be manufactured into a deadline. Record the
silence, score the letter accordingly, and design the honest next question. If a criterion cannot
be satisfied, say so — a deal that requires the buyer to remain uninformed is deferred churn and
belongs in the disqualification path.

Record the gate result with the deal, including any move that was blocked.

### Step 4 — Score and expose the gaps

Build the table. One row per letter: finding, source, date, score.

Any letter at 0 or 1 is a gap. For each gap write **one** verification step that would move it to
2 or 3, with who takes it and by when. A list of ten next steps is not a next step.

### Step 5 — Derive the close date

Compare the end of the mapped decision process against the close date in the CRM. If they differ,
**the forecast is wrong, not the process**. If no decision process exists, state that the close
date is a placeholder rather than proposing one.

### Step 6 — Apply the verdict rules

Do not soften a verdict because the deal is large.

| Verdict | Condition | Output |
|---|---|---|
| QUALIFIED | All six letters at 2 or above, with pain, economic buyer and process at 2 or above, and no concealed unmet criterion | Proceed, remaining gaps listed and owned |
| QUALIFIED WITH GAPS | All letters present, two or more sit at 2 where 3 is achievable and material | Proceed while running named verification steps; forecast confidence capped |
| NOT QUALIFIED | Economic buyer or decision process at 0 or 1, or pain unowned | Do not advance the stage; run the two highest-yield verifications first |
| DISQUALIFIED | A structural trigger is met | Formal disqualification with capacity returned and an observable re-entry condition |

**Structural disqualification triggers** — difficulty is not one of them:

- No reachable authority who can release funds
- No consequence to inaction and no trigger event
- A heavily weighted criterion we cannot satisfy without concealing it
- No process that ends in a signature within any horizon the buyer will state
- The buyer requires a commitment we cannot make truthfully
- Repeated champion-test failure with no second relationship available

Every disqualification carries an observable re-entry condition. A deal parked without one is lost
information, not discipline.

### Step 7 — Rank the two highest-yield verifications

For each field below score 2, estimate decision impact (would confirming or refuting it change
whether we work this deal, or only refine it?) and cost (one email, one meeting, an executive
introduction). Return the two highest impact-to-cost steps, ranked.

### Step 8 — Write the record

Write to `squads/sales/` with the date. Include the MEDDIC table, the gaps with owners and dates,
the derived close date, the verdict with the rule that produced it, and a **separate, visible
UNVERIFIED block** listing every field below score 2. Hiding a gap does not close it.

## Extensions (flagged, never folded in silently)

| Extension | Adds | Where it runs |
|---|---|---|
| MEDDICC | Competition — what the buyer compares against, including doing nothing, in their words | `*competition-read` |
| MEDDPICC | Paper Process — legal, security, procurement and signature authority as a dated sequence | `*paper-process` |

## Acceptance Criteria

- [ ] All six letters carry an evidence score with a named source and a date
- [ ] Pain and decision criteria are recorded in the buyer's own words, not paraphrased
- [ ] Seller-constructed figures are labelled distinctly from buyer-stated figures
- [ ] Economic buyer access is stated honestly, including where it is absent
- [ ] The decision process is dated, has named owners, and includes the paper process
- [ ] The champion carries three test results with dates, not an impression
- [ ] Every gap has exactly one verification step with an owner and a date
- [ ] The close date is derived from the buyer decision process, or declared a placeholder
- [ ] Any criterion we cannot satisfy is stated plainly
- [ ] The ethics gate ran, and no step relied on fabricated urgency, scarcity, bluffed alternatives or omission
- [ ] UNVERIFIED items appear in a separate visible block
- [ ] Any disqualification carries a structural reason, capacity returned, and an observable re-entry condition
- [ ] No concession, call plan or stage model was produced by this task

## Handoff

| To | When |
|---|---|
| `@negotiation-lead` | The deal is qualified and the next move is commercial — send the record before any concession is designed |
| `@method-lead` | The record is sound but the buyer does not yet see the problem — the gap is an insight gap, not an evidence gap |
| `@pipeline-ops` | The same gap repeats across the pipeline — stage exit criteria or coaching cadence is the real defect |
| `@sales-chief` | The read conflicts with another specialist's artifact, or the request has left the qualification surface |
| `@products:positioning-lead` | The same untracked alternative wins repeatedly, or the buyer's frame of reference is consistently wrong |
| `@products:pricing-strategist` | The value metric or price structure is misaligned with how buyers measure value — as a pattern, not one account |
| `@devops` | Git push, PRs and CI/CD — exclusive authority, no exceptions |

## References

- `squads/sales/agents/qualification-lead.md` — agent definition, letters, evidence scale, verdicts
- `squads/sales/squad.yaml` — squad manifest and handoff matrix
- `.claude/CLAUDE.md` — AEXOS project instructions and agent authority
- `.aexos-core/development/tasks/advanced-elicitation.md` — optional accelerant for Step 2
- `.aexos-core/development/checklists/self-critique-checklist.md` — optional, applied before the record informs a forecast
