# Bad Strategy Checklist

**Checklist ID:** CEO-CL-001
**Referenced by:** strategy-lead (Kernel)
**Method source:** Richard Rumelt, *Good Strategy Bad Strategy* (2011). The four hallmarks are
Rumelt's. The detection procedures, the pass thresholds and the repair instructions below are
this squad's operating detail and are not attributed to him.

**Purpose:** Determine whether a document that calls itself a strategy contains one. Run it
against an existing plan (`*bad-strategy-check`) or against a freshly written kernel before
release.

[[LLM: INITIALIZATION — BAD STRATEGY AUDIT

This is a detection instrument, not a rating exercise. Rules:

1. QUOTE the offending text. Never characterise the document ("it is vague"); quote the
   sentence and show the plain rewrite next to it. A finding a reader cannot check is
   not a finding.
2. Work only from the document. If answering a question requires context from your own
   head, that is itself the answer to the question.
3. Report FAILURES, not a score out of ten. A score invites negotiation about the score.
4. Never soften a finding to protect the document's authors. Bad strategy is usually
   produced by competent people through a planning process designed to produce exactly
   that artifact. Say the finding without contempt.
5. Section 2 (failure to face the challenge) is load-bearing. If it fails, the other
   three findings are downstream of it and the repair is `*diagnose-challenge`, not
   editing.]]

---

## 1. Fluff — abstraction used to sound expert

*Detection: rewrite each declarative sentence in plain language a new employee would
understand, with no domain jargon. Then read it back.*

- [ ] Every declarative sentence has been extracted and rewritten in plain words
- [ ] Each rewrite is classified: **CARRIES INFORMATION** (a reader could act differently because of it) / **EMPTY** (true of any company in any industry) / **UNCHECKABLE** (no observation bears on it)
- [ ] The EMPTY ratio is reported as a fraction of total sentences, not as an impression
- [ ] No sentence survives that describes the company as "leading", "world-class", "trusted", "innovative" or "differentiated" without a named observable behind it
- [ ] No sentence survives whose plain rewrite is "we want to be good at our business"
- [ ] Compound abstractions ("leverage our platform to deliver differentiated outcomes at scale") are quoted in full with the plain rewrite alongside
- [ ] Recommendation for every EMPTY sentence is **deletion**, not rewording

**Why deletion:** rewording fluff produces fluff. The sentence occupies the space where a choice
should be; removing it makes the absence visible, which is the point.

---

## 2. Failure to face the challenge — LOAD-BEARING

*Detection: reading only this document, state what the plan is a response to.*

- [ ] A challenge, obstacle or constraint is named somewhere in the document
- [ ] It is named specifically enough that a response could be judged adequate or inadequate against it
- [ ] It names a **mechanism**, not a party at fault (blame identifies who; diagnosis identifies what is happening)
- [ ] It is stated so that a named observation could contradict it
- [ ] It is not merely the symptom restated in different words ("growth is slow" is not a diagnosis of slow growth)
- [ ] At least one rival explanation of the same evidence was generated and either rejected with reasons or kept live
- [ ] The rival was generated **before** the first explanation was evaluated, not afterwards as a formality
- [ ] Where two explanations fit the evidence equally, the document says so and specifies the discriminating test rather than picking one

**If this section fails:** stop. Do not audit the remaining hallmarks as independent defects and
do not edit the document. Editing a plan whose defect is a missing diagnosis produces a
better-written plan with the same defect. The repair is `*diagnose-challenge`.

---

## 3. Mistaking goals for strategy

*Detection: for each stated goal, look for an attached mechanism. A goal with no mechanism is
an ambition.*

- [ ] Every statement is sorted into **GOAL** (a desired outcome) / **MECHANISM** (how an obstacle is overcome) / **CONSTRAINT** / **NEITHER**
- [ ] The goal-to-mechanism ratio is reported
- [ ] Each goal presented as a "pillar", "priority" or "strategic theme" has been tested for whether a mechanism is attached
- [ ] Growth and share targets ("grow 40%", "become the category leader", "be the platform of record") are classified as goals, explicitly, wherever they appear under a strategy heading
- [ ] For each unmechanised goal, the document is asked: what is currently preventing this? If nothing is, no strategy is required — only execution
- [ ] Values, mission and vision statements are not counted as strategy content
- [ ] Where a goal is salvageable because a mechanism *is* present, it is named as salvageable rather than swept up with the rest

---

## 4. Bad strategic objectives

*Detection: count the objectives; check for ordering and for a stated relationship between them.*

- [ ] Objectives are counted
- [ ] **Blue-sky check:** no objective merely restates the desire in objective form
- [ ] **Undifferentiated-list check:** the objectives have a stated ordering, and a stated logic connecting them to one another
- [ ] No objective is a department's existing workload relabelled
- [ ] Objectives are proximate — the path to each is knowable with current capability. Any objective requiring several unknowns to resolve simultaneously is flagged as a wish and decomposed
- [ ] Each objective, if achieved, changes what becomes solvable next; that unlock is stated
- [ ] The count is defensible: a long undifferentiated list signals that the choice was avoided and delegated downward as workload

---

## 5. Choice — did anything get excluded?

*Not one of Rumelt's four hallmarks. This squad's own test, derived from the principle that
strategy is fundamentally about choosing not to do things.*

- [ ] An explicit exclusion list exists
- [ ] The exclusion list is non-empty
- [ ] Each exclusion carries what it currently consumes, its exit cost, and the objection it will raise
- [ ] The objections are stated in their strongest form, not dismissed
- [ ] The plan cannot be executed alongside every other plan the company already has (if it can, no choice was made)
- [ ] Universal agreement among the leadership team, if present, has been examined rather than treated as validation — a strategy that excludes something real should make at least one person whose programme was excluded unhappy

---

## 6. Concentration

*Counted from the budget and the org chart, never from the strategy document.*

- [ ] Funded and staffed initiatives are counted from the actual budget and org, not from the plan
- [ ] Effort or spend per initiative is shown as a share of the total
- [ ] For each initiative, the question is answered: **can it move its own outcome at this level of resourcing?**
- [ ] If no initiative except one can move its own outcome, and that one is not what the diagnosis says is critical, the portfolio is reported as spread rather than focused
- [ ] The concentration option is named: which small number of initiatives, given the whole, would change the diagnosed challenge
- [ ] The cost of concentrating is named — what stops, who objects, what commitment must be unwound

---

## 7. Coherence of the action set

- [ ] Each action supports at least one other action, or is explicitly marked standalone with a justification
- [ ] No action supports nothing and is required by nothing (that is a separate initiative)
- [ ] No two actions compete for the same scarce resource without the conflict being **resolved** in the document
- [ ] No two actions push the organisation in opposite directions (if they do, the guiding policy is unclear and the repair is upstream)
- [ ] Every action has a named owner
- [ ] The set as a whole is resourceable — cutting has already happened, rather than being deferred to whoever executes

---

## 8. Inertia and honesty about cost

- [ ] Organisational inertia is budgeted as a line item with an estimated cost and duration
- [ ] It is not listed as a risk (a risk is something that might happen; inertia will happen)
- [ ] Rival inertia, if claimed as an opportunity, has a stated window and a basis for the estimate
- [ ] Entropy is addressed: what parts of the organisation drift without attention, and what maintenance the strategy therefore requires

---

## 9. Prediction and traceability

- [ ] A falsifiable prediction is recorded, with an indicator and a check date
- [ ] The prediction was written at the time the strategy was set, not reconstructed afterwards
- [ ] The indicator would not move for unrelated reasons
- [ ] A disconfirming observation is named
- [ ] Every factual claim carries a source and a date
- [ ] Gaps are marked UNVERIFIED rather than filled with plausible narrative (Constitution Article IV)

---

## 10. Boundary

- [ ] No pricing, hurdle rate or budget arithmetic appears in this document (that is `@ceo:capital-allocator`)
- [ ] No headcount plan, reporting line or meeting cadence appears (that is `@ceo:org-designer`)
- [ ] No board or investor narrative appears (that is `@ceo:stakeholder-lead`)
- [ ] No epic, PRD, story or implementation plan appears (that is `@pm`, `@sm`, `@dev`)
- [ ] Nothing is attributed to Rumelt that he did not write; this squad's own operating detail is labelled as this squad's

---

## Verdict

Report **failures**, not a score.

| Outcome | Condition | Next step |
|---|---|---|
| **NO STRATEGY PRESENT** | Section 2 fails | `*diagnose-challenge`. Do not edit the document. |
| **KERNEL INCOMPLETE** | Section 2 passes; any of 4, 5, 7 fails | Repair the named section and re-run |
| **KERNEL PRESENT, DEFECTS RECORDED** | Sections 2, 4, 5, 7 pass; residual failures elsewhere | Release with each residual failure explicitly accepted and the reason stated |
| **CLEAN** | No failures | Release |

**Explicit acceptance is permitted; silent acceptance is not.** Any failure carried forward must
appear in the released document with the reason it was accepted.
