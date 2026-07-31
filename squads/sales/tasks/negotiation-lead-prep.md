---
task: Prepare Commercial Negotiation
owner: "@negotiation-lead"
owner_type: agent
atomic_layer: task
Input: |
  - deal: The deal being negotiated (required)
  - qualification_record: Qualification record confirming economic buyer and decision process (required — gate)
  - stated_positions: Everything the counterparty has asked for, verbatim, with who said it and when (required)
  - approved_structure: The commercial structure approved by @products:pricing-strategist that this negotiation operates inside (required)
  - counterparty_communications: Emails, messages and documents from the counterparty, with dates (optional)
  - our_constraints: Real constraints on our side — approval cycles, capacity, delivery dates (optional)
Output: |
  - interest_map: Each stated position with at least two candidate interests, marked VERIFIED or INFERRED
  - walk_away: The terms below which no agreement is better than agreement, plus who may change it and how
  - leverage_read: Alternatives on both sides, our weak points stated plainly, and who needs this more
  - concession_ladder: Decreasing steps inside the approved structure, each naming the non-price item it buys
  - labels_and_questions: Three labels and five calibrated questions in exact wording
  - accusation_audit: The pre-emptive statement that names their objection first, in their terms
  - integrity_verdict: Result of the integrity screen over the whole plan, with any removed move named
  - escalations: Any step that would exit the approved structure, marked ESCALATE and unused until escalated
  - record_path: Dated negotiation plan written under squads/sales/, with UNVERIFIED assumptions listed separately
Checklist:
  - "[ ] Confirm the deal is qualified — economic buyer and decision process known — or stop and route back"
  - "[ ] Confirm the approved commercial structure before drafting any number"
  - "[ ] Record every stated position verbatim with its author and date"
  - "[ ] Generate at least two candidate interests per position"
  - "[ ] Mark every interest VERIFIED or INFERRED"
  - "[ ] Identify the interests that can be served without price movement"
  - "[ ] Write the walk-away before the concession ladder"
  - "[ ] Name who may change the walk-away and under what documented circumstance"
  - "[ ] Run the leverage read including our own weak points"
  - "[ ] Build decreasing concession steps, each naming what it buys"
  - "[ ] Make the final number non-round"
  - "[ ] Mark ESCALATE on any step outside the approved structure"
  - "[ ] Draft three labels and five calibrated questions in exact wording"
  - "[ ] Draft the accusation audit in the counterparty's terms"
  - "[ ] Run the integrity screen over the whole plan and remove — never soften — any failing move"
  - "[ ] Write the plan with UNVERIFIED assumptions listed separately"
---

# *negotiation-prep — Prepare A Commercial Negotiation

Materializes the `*negotiation-prep` command of `@negotiation-lead` (Tether, Tier 2), defined in
`squads/sales/agents/negotiation-lead.md`.

## Method Attribution

The methodology applied here is published by **Chris Voss**, a former FBI lead international
kidnapping negotiator, in *Never Split the Difference: Negotiating As If Your Life Depended On It*
(2016), written with Tahl Raz. Its central claim is the operating premise of this task:
negotiation is not a rational trade of positions to be split down the middle, but a process of
discovering what the other side actually needs — which they frequently have not said and sometimes
do not consciously know — and then building an agreement that serves it.

This task applies a documented framework with attribution.

**Caveat carried by the agent and repeated here:** the book cites the widely quoted 7-38-55
communication ratio attributed to research by Albert Mehrabian. That ratio is contested in the
broader literature and is frequently applied far beyond the narrow experimental conditions it came
from. No recommendation in this task is built on it.

## Purpose

A negotiation prepared in advance is a plan. A negotiation improvised is a series of concessions.

This task produces the plan: what they actually need beneath what they asked for, what we will not
go below, what each concession buys, the exact wording we will use, and the honest read of who
needs this more.

## Pre-conditions

| Condition | Blocker | Check |
|---|---|---|
| **Qualification gate** — economic buyer and decision process are known | **yes** | `qualification_record` shows both at evidence score 2 or above. If not, **stop** and route to `@qualification-lead`. An unqualified deal is not a negotiation; it is a discount conversation with someone who cannot sign |
| The approved commercial structure is known | yes | `approved_structure` is present. This task trades inside a structure owned by `@products:pricing-strategist` and never sets one |
| Stated positions exist verbatim with authors and dates | yes | A paraphrased position hides the interest underneath it |
| We can articulate what the buyer loses by not proceeding | no | If we cannot, price is the only variable left — that is a `@method-lead` finding, not a negotiation problem |

## Procedure

### Step 1 — Gate on qualification

Confirm the deal is qualified. If the economic buyer or the decision process is unknown, stop
here, hand back to `@qualification-lead`, and do not draft a number. Preparing concessions for a
buyer who cannot sign teaches the account that pressure produces price.

### Step 2 — Map interests beneath positions (elicitation required)

List every stated position verbatim, with who said it and when.

For each position, generate **at least two** candidate interests it could be serving. Do not settle
on the first. A 20% discount request is a position; the interest underneath is usually a budget
ceiling, an internal comparison, a fear of overpaying, or a person who must justify the number to
someone else.

Add the individual layer: what does the person at the table personally need — a defensible number,
a fast close, a risk they will not carry, a win they can report?

Mark each interest **VERIFIED** (they said it) or **INFERRED** (we deduced it). Inferred interests
are hypotheses to test with a label, not facts to negotiate against. We do not negotiate against a
counterparty we have imagined.

Identify which interests can be served **without price movement**. Those are the currency of the
concession plan. Identify any interest we cannot serve, and say so early rather than discovering it
at redlines.

### Step 3 — Write the walk-away, before anything else is drafted

State the terms below which no agreement is better than agreement: price floor within the approved
structure, term, payment, scope, liability, reference obligations.

State what actually happens to us if we walk — the revenue, the quarter, the reference, the
capacity freed. Honest, not dramatic. State what we believe happens to them, marked VERIFIED or
INFERRED.

Name who has authority to change the walk-away and under what documented circumstance. If a rep
can move it alone under pressure, it is not a walk-away — it is a preference.

Record it before the conversation. A limit written after the concession ladder is not a limit, and
a limit discovered mid-negotiation never was one.

### Step 4 — Read the leverage honestly

List their alternatives, including doing nothing, each marked VERIFIED or INFERRED. List ours:
pipeline coverage, whether this quarter needs this deal, what the capacity would otherwise do.
Estimate switching and inaction cost on their side using **their** stated numbers.

State our weak points plainly. Negotiating as if we hold leverage we do not produces brittle
positions that collapse at the first real test. Conclude with the honest sentence: who needs this
more, and by how much?

### Step 5 — Read the deadlines

Establish whose deadline each one is and what created it. Ask what happens the day after — if the
answer is nothing specific, it is a lever rather than a constraint.

Do the same for **our** deadline. If ours is our quarter, that is our constraint and not their
problem, and it is never represented as theirs.

### Step 6 — Build the concession ladder

Confirm the approved structure first. Everything below operates inside it.

1. Set the anchor deliberately, with the rationale we would state if asked. The first number
   spoken shapes the range; if we do not set it, theirs becomes the frame.
2. Build **decreasing** steps toward the target. Each step materially smaller than the last, so the
   shrinking pattern itself communicates the limit more credibly than any assertion about a limit.
3. For each step, name the non-price item it buys: term length, payment schedule, expansion
   commitment, reference or case study rights, scope reduction, phased delivery, faster paper
   process. A concession that buys nothing trains the counterparty to keep asking.
4. Make the final number non-round. A calculated figure reads as derived; a round figure reads as
   arbitrary and invites one more push.
5. Hold one non-monetary item in reserve — valuable to them, cheap to us.
6. Mark **ESCALATE** on any step that would exit the approved structure. It is not used without
   that escalation, and it is never improvised around.

Never split the difference. A midpoint is not fairness; it is the abandonment of two positions in
favour of one nobody argued for and neither side can defend internally.

### Step 7 — Draft the exact wording

**Three labels.** Name the dynamic actually present — pressure from above, fear of overpaying,
frustration at our process, uncertainty about implementation. Open with "It seems like…", "It
sounds like…", "It looks like…" and no "I"; the word "I" converts a label into a claim they must
respond to. A label that invites a yes or no has failed — you want a correction or an elaboration,
because both are information.

**Five calibrated questions.** Open with *how* or *what*. Avoid *why*, which reads as accusation.
Prioritize questions that transfer the problem without transferring blame: "How am I supposed to do
that?", "What about this does not work for you?", "How would you like me to proceed?", "What is the
biggest challenge you face here?" For each, predict the two most likely answers and prepare the
follow-up. Remove any question that is an argument with a question mark attached — if it cannot be
answered honestly without conceding, it is a trap, not a question.

Produce the exact wording. Improvised phrasing under pressure defaults to arguing.

### Step 8 — Draft the accusation audit

List everything the counterparty could reasonably hold against us: a slow implementation timeline,
a missing capability, a price above the alternative, a past incident, a difficult process.

Draft the statement that says the worst of it first, in their words, before they do. Do not follow
it immediately with a defence — say it, stop, and let them respond.

An accusation audit that names a small problem to distract from a larger one is a manipulation, not
a technique. Screen for that.

### Step 9 — Integrity screen over the whole plan (blocking)

Run this over every move in the plan. Any failure **removes** the move. It is not softened, and it
is not reworded.

| Test | Blocking condition |
|---|---|
| Fabricated deadline | Any date we state is invented, or is ours and presented as theirs |
| Invented scarcity | Allocation, capacity or an expiring structure is implied and is not real |
| Bluffed alternative | A competing offer, another buyer, or an internal mandate is implied and is not true |
| Unmeant walk-away | We state a walk-away we would not take |
| Material omission | A known limitation, integration gap, implementation cost or renewal uplift mechanic is withheld |
| Empathy inversion | The move uses an understanding of the counterparty's fear to exploit it rather than to serve their interest |
| Durability failure | The counterparty could not defend this agreement to their own organization if they understood everything we understand |

For every blocked move, produce the compliant alternative that pursues the same legitimate goal by
stating our real constraint and asking for theirs. Example of the shape: rather than inventing an
expiry, name the real approval cycle — "Our approvals for this structure run on a quarterly cycle,
so a decision before the end of the quarter keeps this exact structure available without
re-approval. I do not know what your side needs in order to decide by then — what would have to
happen?"

Record the verdict against the deal. If a human proceeds against the screen, that is logged as
decided against advice.

### Step 10 — Write the plan

Write to `squads/sales/` with the date. Include the interest map, the walk-away, the leverage and
deadline reads, the concession ladder with ESCALATE markers, the exact labels and questions, the
accusation audit, and the integrity verdict. List every **UNVERIFIED** assumption separately.

## Acceptance Criteria

- [ ] The qualification gate was checked, and an unqualified deal was routed back rather than prepared
- [ ] Every stated position is recorded verbatim with author and date
- [ ] Every position has at least two candidate interests, each marked VERIFIED or INFERRED
- [ ] The walk-away was written before the concession ladder, with a named authority to change it
- [ ] The leverage read states our weak points plainly
- [ ] Our own deadline is stated as ours and is never represented as the buyer's
- [ ] The concession ladder decreases, sits inside the approved structure, and names what each step buys
- [ ] The final number is non-round and one non-monetary item is held in reserve
- [ ] Any step outside the approved structure is marked ESCALATE and unused
- [ ] Three labels and five calibrated questions exist in exact wording
- [ ] The accusation audit names the real objection, not a decoy
- [ ] The integrity screen ran over the whole plan; no fabricated deadline, invented scarcity, bluffed alternative, unmeant walk-away or material omission survives
- [ ] No price level, package or discount policy was set by this task
- [ ] UNVERIFIED assumptions are listed separately in the written plan

## Handoff

| To | When |
|---|---|
| `@qualification-lead` | The gate failed, the decision process was never mapped, or procurement leverage is growing in that gap |
| `@method-lead` | We cannot articulate what the buyer loses by not proceeding — price is the only visible variable |
| `@negotiation-lead` (`*post-mortem`) | The negotiation closed — review what each concession actually bought and what precedent was set |
| `@pipeline-ops` | The same pressure appears across deals — a stage or process defect, not a deal defect |
| `@products:pricing-strategist` | The approved structure is repeatedly the binding constraint — pricing evidence, as a pattern, not one account |
| `@sales-chief` | The plan conflicts with another specialist's artifact, or an integrity block needs a human decider |
| `@devops` | Git push, PRs and CI/CD — exclusive authority, no exceptions |

## References

- `squads/sales/agents/negotiation-lead.md` — agent definition, tactical empathy tools, concession structure
- `squads/sales/squad.yaml` — squad manifest and handoff matrix
- `.claude/CLAUDE.md` — AEXOS project instructions and agent authority
- `.aexos-core/development/tasks/advanced-elicitation.md` — optional accelerant for Step 2
- `.aexos-core/development/checklists/self-critique-checklist.md` — optional, applied to the plan before the call
