# Commercial Insight — {{segment_or_account}}

<!--
TEMPLATE: commercial-insight-tmpl.md
Squad: sales | Produced by: method-lead (Forge) via *build-insight, *build-reframe, *insight-audit

ATTRIBUTION
The framework applied here is published by Matthew Dixon and Brent Adamson in "The Challenger
Sale: Taking Control of the Customer Conversation" (2011), reporting research conducted at the
Corporate Executive Board. Buying-group material draws on the follow-up, "The Challenger Customer"
(2015), by Brent Adamson, Matthew Dixon, Pat Spenner and Nick Toman — cited separately, never
blended into the 2011 book. This agent applies the framework; it is not Dixon or Adamson and does
not speak as either.

THE TEST THIS ARTIFACT MUST SURVIVE
Is it true, and can we prove it with something that is not our own marketing?
An unprovable claim delivered with confidence is manipulation, whether or not it happens to be
true. Any claim sourced only to our own materials is marked UNVERIFIED and is excluded from the
pitch — not softened, excluded.
-->

**Insight ID:** INS-{{YYYY-MM-DD}}-{{slug}}
**Segment or account:** {{who this applies to}}
**Date:** {{date}}
**Author:** {{name}}

---

## 1. The insight in one sentence

> {{If it cannot be stated in one sentence, it is not yet an insight.}}

## 2. The reframe — four lines

| # | Line | Content |
|---|---|---|
| 1 | **What they believe** | {{In their language, not as a strawman. If we cannot state their belief without caricature, we have not talked to enough of them.}} |
| 2 | **What is actually true** | {{With evidence — see section 3}} |
| 3 | **What the gap costs them** | {{In their units. Label the figure ours or theirs.}} |
| 4 | **Why it was invisible from where they sit** | {{MANDATORY}} |

### On line 4

This line is not optional and it is where most reframes fail. A reframe that implies the buyer was careless produces defensiveness, and a defensive buyer stops evaluating the problem in order to defend themselves. A reframe that explains why the problem was *structurally* hard to see — the data is not aggregated anywhere, the report format hides the split, the pattern is only visible across many companies — produces attention.

Same content. Opposite reception.

## 3. Evidence table

| Claim | Source | Verifiable by the buyer? | Status |
|---|---|---|---|
| {{claim from line 2}} | {{our onboarding data across n accounts / published industry research / regulatory data / the buyer's own numbers}} | fully / partially — {{how}} / no | VERIFIED / **UNVERIFIED** |

**Sources ranked by strength for this purpose:**

1. **The buyer's own numbers** — strongest, because they cannot be dismissed as vendor material
2. **Aggregated patterns across our own accounts** — strong if the distribution can be shown, even anonymized
3. **Published industry or regulatory data** — strong and independently checkable
4. **Our marketing** — not a source. A claim resting only on this is UNVERIFIED and excluded.

**UNVERIFIED claims (excluded from the pitch):** {{list, or "none"}}

> If no source outside our own materials exists for the core claim, we do not have an insight yet.
> Say so rather than shipping the claim. Route the research question to `@analyst` if it is worth
> answering properly.

## 4. Cost of the status quo

| Field | Entry |
|---|---|
| The figure | |
| Unit | {{the buyer's unit, not ours}} |
| Whose number is it | **buyer-stated / seller-modelled** — these are never merged |
| Derivation, if ours | {{stated so it can be checked}} |
| What the buyer would need to supply to make it theirs | {{the one question that converts our estimate into their number}} |

## 5. The four-rule test

Each rule is a **stop**, not a score. A failure is rebuilt or abandoned.

| Rule | Test | Result |
|---|---|---|
| **Lead to our unique strengths** | Could a competitor deliver this identical insight and benefit equally? | PASS / **FAIL** |
| **Challenge an assumption** | Does it contradict something the buyer currently believes, stated in their language? | PASS / **FAIL** |
| **Catalyze action** | Does it change what the buyer would do next week, or only what they think? | PASS / **FAIL** |
| **Scale across the segment** | Does it apply across the segment, or only to this one account? | PASS / **FAIL** |

**On a rule-1 failure — the most expensive kind.** A true, well-delivered, category-generic insight educates the buyer to run a market evaluation at our expense. Rebuild it against a unique attribute traced to the positioning artifact, or drop it.

**Unique attribute this insight leads to:** {{name it}}
**Traced to:** {{the positioning artifact from `@products:positioning-lead` — if there is no such artifact, or the attribute is not on it, that is a positioning defect and the finding is routed outward rather than improvised here}}

## 6. Segment boundary — where this insight is false

> {{State it. An insight that is true everywhere is usually not specific enough to be true anywhere.}}

**For accounts outside the boundary:** {{what we say, and whether we disqualify. If the honest reframe points away from our solution for a given buyer, we say so and route to `@sales:qualification-lead`. A reframe is a claim about the buyer's business; it does not become false because it is commercially inconvenient.}}

## 7. Integrity

- [ ] Every claim has a source that is not our own marketing, or is marked UNVERIFIED and excluded
- [ ] No fabricated urgency, invented scarcity or manufactured social proof anywhere in the insight
- [ ] No capability implied that does not exist today; roadmap is disclosed as roadmap
- [ ] No peer shame, implied competitive risk we cannot substantiate, or attack on the buyer's competence
- [ ] Known limitations, integration gaps and total cost are inside the conversation, not deferred past signature
- [ ] Reversal test: if the buyer saw exactly how this insight was constructed, would they still consider the conversation fair?
- [ ] Nothing here sets price, packaging or market category

## 8. Handoffs

| Condition | Route to |
|---|---|
| The insight is sound but the buyer cannot act — no reachable authority, no process | `@sales:qualification-lead` |
| The insight cannot be traced to a unique attribute, or the same objection recurs across accounts | `@products:positioning-lead` |
| The value the insight establishes is not reflected in how the product is priced or packaged | `@products:pricing-strategist` |
| Evidencing the insight needs research beyond a squad cycle | `@analyst` |

---

*[SOURCE: Dixon & Adamson, The Challenger Sale (2011) — four rules of commercial teaching. The Challenger Customer (2015), Adamson, Dixon, Spenner & Toman, cited separately where buying-group material is used.]*
