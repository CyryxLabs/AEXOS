---
task: Build Commercial Insight
owner: "@method-lead"
owner_type: agent
atomic_layer: task
Input: |
  - segment_or_account: The buyer segment or account the insight is being built for (required)
  - current_belief: What that segment currently believes about the problem, in their language (required)
  - evidence_pool: Data, benchmarks, research or observed operational patterns available to us, each with a source (required)
  - unique_attributes: Our unique strengths as defined by @products:positioning-lead, if available (optional)
  - existing_pitch: Current deck or pitch to audit against the insight (optional)
Output: |
  - insight: The assumption being challenged and what is actually true instead
  - evidence_table: One row per claim with its source, and UNVERIFIED marked where the only source is our own marketing
  - status_quo_cost: The cost of the status quo in the buyer's units, labelled as buyer-stated or seller-constructed
  - reframe: Four lines — what they believe, what is true, what the gap costs, why the gap was invisible
  - four_rule_result: Pass or fail per rule, with the rebuild or the abandonment decision
  - provability_verdict: Whether the insight is verifiable by the buyer outside our marketing
  - honest_direction_note: Statement of where the honest reframe leads, including away from our solution
  - record_path: Dated insight record written under squads/sales/
Checklist:
  - "[ ] Record what the buyer segment currently believes, in their language and not as a strawman"
  - "[ ] List what we know that they do not, and how we know it"
  - "[ ] Attach a named source to every claim"
  - "[ ] Mark UNVERIFIED any claim sourced only to our own marketing"
  - "[ ] Quantify the cost of the status quo in the buyer's units"
  - "[ ] Label the status quo cost as buyer-stated or seller-constructed"
  - "[ ] Run rule 1 — does the insight lead to our unique strengths"
  - "[ ] Run rule 2 — does it challenge an assumption the buyer currently holds"
  - "[ ] Run rule 3 — does it catalyze action"
  - "[ ] Run rule 4 — does it scale across the segment"
  - "[ ] Stop and rebuild or abandon on any failed rule"
  - "[ ] Write the four reframe lines, including why the gap was invisible"
  - "[ ] Run the competitor test — could a competitor deliver this identical reframe"
  - "[ ] Run the honesty test — is it true even if it costs us the deal"
  - "[ ] Run the coercion screen over the delivery plan"
  - "[ ] Write the insight record with its evidence table"
---

# *build-insight — Construct A Commercial Insight

Materializes the `*build-insight` command of `@method-lead` (Forge, Tier 1), defined in
`squads/sales/agents/method-lead.md`.

## Method Attribution

The framework applied here is the Challenger model, published by **Matthew Dixon and Brent
Adamson** in *The Challenger Sale: Taking Control of the Customer Conversation* (2011), reporting
research conducted at the Corporate Executive Board. Its central finding is the operating premise
of this task: in complex solution selling, the representatives who consistently outperform are the
ones who teach the customer something valuable about their own business, tailor that teaching to
each stakeholder, and take control of the conversation.

Where the buying group and the Mobilizer stakeholder are referenced, the source is the authors'
follow-up work — *The Challenger Customer* (2015), by Brent Adamson, Matthew Dixon, Pat Spenner
and Nick Toman — cited separately rather than blended into the 2011 book.

This task applies a documented framework, and it attributes no phrasing to an individual on the
basis of inference.

## Purpose

An insight is the value of the conversation. If the buyer learns nothing, the meeting was a status
update.

This task builds one: the assumption being challenged, the evidence that challenges it, the cost
of the status quo in the buyer's units, and the connection to what we do uniquely well — and then
tries hard to break it, because an insight that cannot survive the four rules and the provability
test will fail in the room instead.

## Pre-conditions

| Condition | Blocker | Check |
|---|---|---|
| The segment or account is named | yes | `segment_or_account` is non-empty |
| What the buyer currently believes has been captured in their language | yes | `current_belief` exists and is not a strawman we wrote |
| At least one evidence source exists outside our own marketing | yes | Otherwise the insight cannot be built; gather evidence first |
| The deal has been qualified where this feeds a specific account | no | A brilliant reframe delivered to someone who cannot release funds is a well-executed nothing — confirm with `@qualification-lead` |
| Positioning artifact naming our unique attributes is available | no | If absent, rule 1 is scored against an assumed attribute and marked UNVERIFIED, and the gap is routed to `@products:positioning-lead` |

## Procedure

### Step 1 — Capture the current belief (elicitation required)

Ask what the buyer segment currently believes about this problem. Record it in **their** language.
A belief written as a strawman guarantees a reframe that nobody in the room recognizes.

### Step 2 — Name what we know that they do not

Ask what we know and **how** we know it: customer data across accounts, an industry benchmark,
published research, or an operational pattern we observe repeatedly.

Build the evidence table. Every claim gets a named source. Anything whose only source is our own
marketing is marked **UNVERIFIED** and cannot carry the insight. An insight the buyer cannot verify
is a claim, and a claim delivered with confidence is manipulation.

### Step 3 — Quantify the cost of the status quo

State it in the buyer's units. Label the figure explicitly as buyer-stated or seller-constructed.
A seller-constructed figure is a proposal about their business and is presented as one.

### Step 4 — Run the four-rule test

Any failed rule is a **stop**, not a note.

| Rule | Test | On failure |
|---|---|---|
| 1. Leads to our unique strengths | Does the insight point to what we do that the alternatives do not? | Category-generic. Rebuild against a unique attribute, or abandon — otherwise we educate the market on a competitor's behalf |
| 2. Challenges an assumption | Does it contradict something the buyer currently holds? | Confirming what they already believe produces agreement and no action. Rebuild |
| 3. Catalyzes action | Does it make inaction visibly expensive? | An interesting fact is not an insight. Rebuild around the consequence |
| 4. Scales across the segment | Would this hold for the next ten accounts like this one? | A reframe that works for exactly one account is a conversation, not a method. Scope it explicitly or rebuild |

### Step 5 — Write the reframe in four lines

1. What they believe.
2. What is actually true.
3. What the gap costs them.
4. **Why the gap was invisible from where they sit.**

Line 4 is mandatory and is where most reframes fail. A reframe implying the buyer was careless
produces defensiveness; one explaining why the problem was structurally hard to see produces
attention.

Attach the evidence for line 2 and the source for line 3.

### Step 6 — Stress test

**Competitor test.** Could a competitor deliver this identical reframe? If yes, it is category
education. Rebuild it against a unique attribute from the positioning artifact.

**Honesty test.** Is it true even if it costs us the deal? If the honest version points away from
our solution, say so. A reframe is a claim about the buyer's business, and it does not become
false because it is commercially inconvenient.

**Provability test.** Can the buyer verify the core claim using something that is not our
marketing? If not, the insight is discarded, not softened.

### Step 7 — Coercion screen (blocking)

Tension is a service to the buyer. Pressure applied to the buyer is its inversion. Any yes below
**blocks** the move.

| Test | Blocking condition |
|---|---|
| Manufactured urgency | The plan introduces a deadline created for effect rather than a real constraint on either side |
| Invented scarcity | The plan implies allocation, capacity or an expiring structure that does not exist |
| Unsubstantiable consequence | A stated consequence could not be defended if the buyer challenged it |
| Manufactured social proof | A reference, logo or statistic is implied and is not real and attributable |
| Capability claim | Something is claimed as available today that is roadmap — roadmap is disclosed as roadmap |
| Material omission | A known limitation, integration gap or total cost is left out of the teaching conversation |

Reversal test: if the buyer saw exactly how this was constructed, would they still consider the
conversation fair? A no is a block.

On any block, produce the honest alternative — state our real constraint and ask for theirs. A
known limitation belongs **in** the teaching conversation, where it costs us a deal we would have
lost at renewal anyway.

### Step 8 — Write the record

Write to `squads/sales/` with the date. Include the insight, the evidence table with sources, the
four-rule result, the reframe's four lines, the stress-test verdicts, the coercion screen result,
and any UNVERIFIED claim listed separately.

## Acceptance Criteria

- [ ] The buyer's current belief is recorded in their language, not as a strawman
- [ ] Every claim in the insight carries a named source
- [ ] Claims sourced only to our own marketing are marked UNVERIFIED and do not carry the insight
- [ ] The cost of the status quo is in the buyer's units and labelled buyer-stated or seller-constructed
- [ ] All four rules were run, and any failure produced a rebuild or an abandonment, not a note
- [ ] The reframe has four lines, including why the gap was invisible
- [ ] The competitor test was run and a category-generic reframe was rebuilt or abandoned
- [ ] The honesty test was run, and the honest direction is stated even where it points away from us
- [ ] The coercion screen was run and no blocked move survives in the plan
- [ ] Roadmap is disclosed as roadmap, and known limitations are inside the conversation
- [ ] No qualification verdict, concession or stage model was produced by this task
- [ ] The record is written under `squads/sales/` with its evidence table

## Handoff

| To | When |
|---|---|
| `@method-lead` (`*teaching-pitch`) | The insight passed — build the six-part teaching choreography on top of it |
| `@method-lead` (`*tailor`) | The reframe is fixed and must now be made concrete per stakeholder |
| `@qualification-lead` | The insight is sound but there is no evidence anyone reachable can act on it |
| `@negotiation-lead` | The insight defines what the buyer loses by not proceeding, which is what price is defended against |
| `@pipeline-ops` | The same insight gap appears across the team — a training-formula and coaching finding, not an individual one |
| `@products:positioning-lead` | Unique attributes are missing, stale or wrong, or rule 1 keeps failing across accounts |
| `@products:pricing-strategist` | The insight exposes a value metric or packaging defect — as a pattern, not one account |
| `@devops` | Git push, PRs and CI/CD — exclusive authority, no exceptions |

## References

- `squads/sales/agents/method-lead.md` — agent definition, four rules, teaching choreography
- `squads/sales/squad.yaml` — squad manifest and handoff matrix
- `.claude/CLAUDE.md` — AEXOS project instructions and agent authority
- `.aexos-core/development/tasks/advanced-elicitation.md` — optional accelerant for Steps 1 and 2
- `.aexos-core/development/tasks/create-deep-research-prompt.md` — optional, for evidencing an insight
- `.aexos-core/development/checklists/self-critique-checklist.md` — optional, applied before the insight enters a pitch
