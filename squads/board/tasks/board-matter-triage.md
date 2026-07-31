---
task: Triage Board Matter
owner: "@board-chief"
owner_type: agent
atomic_layer: task
Input: |
  - matter: The question, decision or event brought to the board, in the requester's own words (required)
  - requester: Who is bringing the matter and in what capacity (required)
  - deadline: Date by which a disposition is needed (optional, default: none stated)
  - existing_artifacts: Paths to board artifacts already written for this matter, under squads/board/data/ (optional)
  - delegation_record: Path to a recorded schedule of reserved matters or delegation map, if one exists (optional)
Output: |
  - classification: RESERVED | DELEGATED WITH OVERSIGHT | NOT A BOARD MATTER | UNDEFINED, with the three boundary tests shown
  - limit_note: Explicit statement of any legal, tax, statutory-audit or regulatory question refused and referred out
  - owning_specialist: Exactly one squad agent id, with near-miss disciplines and why each was excluded
  - short_answer: The two-minute usable version, labelled as usable and not defensible
  - handoff_brief: Matter, classification, evidence held, evidence missing, the question the specialist must answer, date needed
  - triage_record: Path to the versioned triage record written under squads/board/data/
Checklist:
  - "[ ] Matter restated in one sentence in oversight vocabulary before any content is engaged"
  - "[ ] Classification produced with all three boundary tests shown individually"
  - "[ ] Legal/tax/statutory-audit/regulatory limit check run and its result stated explicitly"
  - "[ ] Exactly one owning specialist named from the five squad agent ids"
  - "[ ] Near-miss disciplines listed with the reason each was excluded"
  - "[ ] Short usable answer given and labelled as the usable, not the defensible, version"
  - "[ ] Handoff brief written so the specialist does not re-elicit context"
  - "[ ] Human-review clause present in the output"
  - "[ ] Triage record written to a versioned file under squads/board/data/"
---

# Triage Board Matter

Materializes `@board-chief *triage`.

## Purpose

Classify an incoming matter before anyone engages its content, then route it to exactly one
oversight specialist with a brief that lets the specialist start from context rather than from
re-elicitation. Misrouting is the failure this task exists to prevent: a confident answer from the
wrong discipline is worse than a routing decision.

## Professional limit — read before executing

This task produces board process material. It is **not** legal advice, tax advice, a statutory
audit opinion, or a regulatory determination. Every output of this task is **input for review by a
qualified human** — a director, licensed counsel, or appointed auditor — and never the final
instrument. Where a matter turns on the interpretation of a statute, a listing rule, a contract or
a filing obligation, this task stops, records the limit, and refers out. It does not approximate.

## Pre-conditions

1. `matter` is present and is at least one full sentence.
2. `squads/board/squad.yaml` is readable — it holds the five agent ids this task may route to:
   `board-chief`, `governance-counsel`, `risk-oversight`, `audit-lead`, `succession-lead`.
3. If `existing_artifacts` is supplied, every path resolves. An unresolvable path is reported as
   a missing input, not silently dropped.

## Procedure

1. **RESTATE.** Write the matter in one sentence, in oversight vocabulary. Do not evaluate it yet.
2. **CLASSIFY.** Apply the three boundary tests and record each result separately:
   - Would a reasonable person say the board *decided* this, or that the board *checked* that
     management decided it well? Only the first is reserved.
   - If the board takes this decision, who is left to hold anyone accountable for it? If the
     answer is nobody, the board has absorbed a management function.
   - Is the board being asked to approve, or to be informed? Name whether a delegated alternative
     exists.
   Return one of: `RESERVED`, `DELEGATED WITH OVERSIGHT`, `NOT A BOARD MATTER`, or `UNDEFINED`.
   `UNDEFINED` means no delegation covers the matter; that gap is itself the finding and routes to
   `governance-counsel`.
3. **LIMIT CHECK.** If the matter turns on a statute, listing rule, contract, tax treatment or
   statutory-audit opinion: stop here, write `limit_note`, refer to qualified external advice, and
   isolate the governance question that remains. Continue the triage only on that residue.
4. **REFRAME.** Test whether the stated matter is the owned matter. Common substitutions: "we were
   blindsided" is an escalation-threshold question; "we need better reporting" is an assurance
   question; "the CEO is stretched" is a key-person question.
5. **OWNER.** Name exactly one specialist:
   | Owned question | Agent id |
   |---|---|
   | Authority, independence, reserved matters, delegation, conflicts, board evaluation | `governance-counsel` |
   | Appetite, exposure, severity, portfolio view, responses, escalation thresholds | `risk-oversight` |
   | Reported-figure integrity, internal control, assurance, auditor relationship, whistleblowing | `audit-lead` |
   | CEO succession, bench depth, executive assessment, key-person concentration | `succession-lead` |
   Never broadcast to several specialists at once. List the near-miss disciplines and the reason
   each was excluded.
6. **SHORT ANSWER.** Give the two-minute usable version and label it as such. State plainly that
   it is the version that unblocks a conversation, not the version that survives challenge.
7. **SEQUENCE (only if genuinely multi-discipline).** Order by dependency: mandate, then appetite,
   then control, then evidence, then capacity, then accountability. Hand off only the first step.
8. **HANDOFF BRIEF.** Write: matter, classification, evidence already available (with paths),
   evidence missing, the single question the specialist must answer, and the date it is needed.
9. **RECORD.** Write the triage record to `squads/board/data/<matter-slug>-triage.md`. Confirm the
   path with the requester before writing. A decision that lives only in a transcript was never
   taken.

## Acceptance criteria

- Classification appears before any discussion of the matter's merits.
- All three boundary tests are shown with individual results, not summarized into one verdict.
- The limit check result is stated explicitly even when the answer is "no legal question present".
- Exactly one owning specialist is named, and that specialist's id exists in `squads/board/squad.yaml`.
- The short answer is present and carries its "usable, not defensible" label.
- The handoff brief names the missing evidence, not only the evidence held.
- The output states that it is input for licensed human review and is not a legal, tax or
  statutory-audit opinion.
- Nothing in the output drafts an epic, a PRD, a story, an implementation, a test or a release.

## Where the output goes

| Destination | What it receives |
|---|---|
| `@governance-counsel` | Matters classified as authority, independence, delegation, conflicts or record |
| `@risk-oversight` | Matters classified as appetite, exposure, threshold or portfolio |
| `@audit-lead` | Matters classified as reported integrity, control evidence or assurance |
| `@succession-lead` | Matters classified as leadership continuity, bench or key person |
| `@pm` | Only after a board decision exists and its consequences need epic framing |
| External qualified counsel | Every legal, tax, statutory-audit or regulatory question, unmodified |

Nothing produced by this task authorizes a git push, a PR, a story draft or a backlog change.
Those remain with `@devops`, `@sm` and `@po` regardless of any board disposition.

## Reference files

- `squads/board/squad.yaml` — agent ids, tiers, handoff matrix
- `squads/board/agents/board-chief.md` — full triage, charge and coherence models
- `.aexos-core/development/tasks/advanced-elicitation.md` — structured intake when the matter is vague
- `.aexos-core/development/tasks/create-doc.md` — document driver for the triage record
