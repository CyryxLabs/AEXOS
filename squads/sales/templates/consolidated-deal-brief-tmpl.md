# Consolidated Deal Brief — {{deal_or_quarter}}

<!--
TEMPLATE: consolidated-deal-brief-tmpl.md
Squad: sales | Produced by: sales-chief (Vanguard) via *deal-brief, *handoff-to-delivery
Assembled ONLY from specialist artifacts.

THE ONE RULE THAT GOVERNS THIS DOCUMENT
This brief generates nothing. Every statement carries a Source column naming the artifact it came
from. A statement with no source does not go inline — it goes in the UNVERIFIED block at the end.
Synthesis is not a licence to assert. (Constitution Article IV — No Invention.)

SECOND RULE
Any commercial-integrity concern raised by any specialist opens this document, before the summary.
It is never appended as a caveat.
-->

**Brief ID:** BRIEF-{{YYYY-MM-DD}}-{{slug}}
**Scope:** {{single deal / quarter / account set}}
**Assembled:** {{date}}
**Artifacts read:** {{list with dates}}

---

## 0. Integrity concerns — read first

{{Any concern raised by any specialist, stated plainly, with the named human who must decide.
If none: "None raised by any specialist." Do not omit this heading.}}

| Concern | Raised by | Failed test | Named decider | Status |
|---|---|---|---|---|
| | | | | open / resolved / proceeding against advice ({{date}}) |

---

## 1. Fit and pain

| Statement | Source artifact + date | Buyer's words? |
|---|---|---|
| | | verbatim / paraphrase — **paraphrase is a weaker claim and is labelled** |

**The metric:** {{current figure → target figure, in the buyer's units}}
**Metric origin:** {{buyer-stated / seller-modelled — these are never merged}}
**Evidence score (0–3):** {{ }} — see `data/qualification-evidence-standards.yaml`

## 2. Insight in use

| Element | Content | Source |
|---|---|---|
| What the buyer believes | | |
| What is actually true | | |
| What the gap costs, in their units | | |
| Why it was invisible from where they sit | | |
| Competitive alternative named | | traced to the positioning artifact from `@products:positioning-lead` |

**Provable outside our own marketing?** {{yes — name the source / no — then it is a claim and is excluded from the pitch}}

## 3. Buying committee and decision process

| Role | Name | Access we actually have | Source |
|---|---|---|---|
| Economic buyer | | never met / met once / regular contact / has stated their own criteria | |
| Champion | | three tests: influence {{ }}, personal benefit {{ }}, willingness {{ }} | |
| Other stakeholders | | | |

**Decision process, dated:**

| # | Step | Owner (buyer-side) | Expected duration | Started? |
|---|---|---|---|---|

**Paper process included?** {{legal, security, privacy, procurement, insurance, PO — yes/no per item}}
**Signature authority threshold crossed?** {{yes / no / unknown}}
**Close date derived from:** {{the buyer's process / our quarter boundary — if the latter, the date is a placeholder and is reported as one}}

## 4. Commercial position

| Element | Content | Source |
|---|---|---|
| Approved structure in force | | `@products:pricing-strategist` — consumed, not set here |
| Anchor and its stated rationale | | |
| Concessions made or planned, and what each buys | | |
| Walk-away, and who may change it | | |
| Anything marked ESCALATE (outside the approved structure) | | |

## 5. Forecast stage and its evidence

| Field | Entry | Source |
|---|---|---|
| Stage claimed | | |
| Exit criterion for that stage | | `templates/funnel-stage-specification-tmpl.md` |
| Buyer-side artifact satisfying it | | |
| Confidence claimed vs evidence supported | | **any inversion is a finding, stated here** |

## 6. Open risks and unretired assumptions

| Risk | Owner | What would retire it | By when |
|---|---|---|---|

- **Single points of failure:** {{the person whose departure would collapse the deal, if there is one}}
- **Criteria we cannot satisfy:** {{stated plainly — never managed around}}
- **Disclosures still owed to the buyer:** {{limitations, integration gaps, total cost, renewal mechanics}}

## 7. Commitments made to the buyer — for `*handoff-to-delivery`

| Commitment | Where it was made | Confirmed in writing? | Committed scope or discussed scope? |
|---|---|---|---|

> Anything unconfirmed is listed as a **risk**, never as scope. Nothing arrives at delivery looking
> more certain than it is. Epic framing for anything committed goes to `@pm`; this squad does not
> produce epics, stories or implementation plans.

## 8. UNVERIFIED

{{Every statement anywhere in this brief that no specialist artifact supports, listed here and
nowhere else. This block is never empty by convenience — if it is empty, say "nothing asserted
without a source" explicitly.}}

---

## Assembly self-check

- [ ] Every inline statement carries a source artifact and a date
- [ ] Unsourced statements appear only in Section 8
- [ ] No new commercial claim was generated in assembly
- [ ] Integrity concerns open the document, not close it
- [ ] Nothing in this brief sets price, package, category, story scope or release
- [ ] Buyer-stated figures and seller-modelled figures are labelled separately throughout
- [ ] Contradictions between artifacts are stated plainly rather than narrated over

---

*Assembled from specialist artifacts. Generates nothing.*
