# Qualification Record — {{deal}}

<!--
TEMPLATE: qualification-record-tmpl.md
Squad: sales | Produced by: qualification-lead (Sieve) via *qualify, *pressure-test
Framework: MEDDIC.

ATTRIBUTION, AS THE AGENT CARRIES IT
MEDDIC is a sales qualification discipline that originated inside Parametric Technology
Corporation (PTC) and is commonly credited to Dick Dunkel and Jack Napoli, who formalized and
taught it there. It spread as internal practice and through training organizations rather than
through a single canonical book by its originators. It is therefore cited here as a named
discipline with a documented origin and is never quoted as a text. No sentence, title, year or
figure is attributed to any individual on the basis of inference.
MEDDICC (adds Competition) and MEDDPICC (adds Paper Process and Competition) are practitioner
extensions and are marked as extensions wherever used, never folded silently into the six letters.

THE RULE THAT MAKES THIS RECORD WORTH KEEPING
Every letter carries THREE things or it is not filled in: the finding, the NAMED SOURCE, and the
DATE. A finding without a dated named source scores 1 at best and goes in the UNVERIFIED block.
Pain and decision criteria are recorded in the BUYER'S WORDS. A paraphrase quietly replaces the
buyer's problem with our product.
-->

**Record ID:** QUAL-{{YYYY-MM-DD}}-{{account-slug}}
**Deal / account:** {{name}}
**As of:** {{date}}
**Prepared by:** {{name}}
**Supersedes:** {{prior record ID, or "none"}}

---

## The six letters

Score each letter on the evidence scale. **0** absent · **1** asserted by the seller (inference, model, recollection) · **2** stated by the buyer verbally, dated · **3** confirmed by the buyer in writing, or evidenced by an artifact the buyer produced.

| Letter | Finding | Named source | Date | Score |
|---|---|---|---|---|
| **M** Metrics | {{current figure → target figure, in the buyer's units}} | {{who said it / which document}} | {{DD Mon}} | {{0–3}} |
| **E** Economic buyer | {{who releases funds + what they are personally measured on}} | | | |
| **D** Decision criteria | {{technical / business / relationship, in the buyer's formulation}} | | | |
| **D** Decision process | {{steps, approvals, documents, dates to signature}} | | | |
| **I** Identify pain | {{the consequence, verbatim, with cost and owner}} | | | |
| **C** Champion | {{name + result of the three tests}} | | | |

> A source column entry of "the rep" or "our notes" is a **seller** source and caps the score at 1.
> "Meeting notes, 3 Jun — Controller said, verbatim: …" is a buyer source at score 2.
> "Controller's email, 18 Jun" or a buyer-produced evaluation sheet is score 3.

---

## M — Metrics, expanded

| Field | Entry |
|---|---|
| What the buyer measures today | |
| Current number, in **their** units | |
| Target number | |
| Who inside the buyer owns that number | |
| What happens to that person if it does not move | |
| **Buyer-stated figure** | {{verbatim + date}} |
| **Seller-constructed model** | {{ours, labelled separately — this is a proposal, not a metric}} |
| Has the buyer repeated the number back in writing? | yes / no |

## E — Economic buyer, expanded

| Field | Entry |
|---|---|
| Requester (can ask) | |
| Approver (can endorse) | |
| **Releaser (can release funds) — this is the economic buyer** | |
| Their approval limit | |
| What they are personally measured on this year | {{or: UNKNOWN — that is the gap}} |
| Access, stated honestly | never met / met once / in regular contact / has stated their own criteria to us |
| Path to access, if absent | who introduces us, what makes it worth their while, what we bring that the requester cannot deliver on our behalf |

> A forwarded email is not access. A name from an org chart is not identification.

## D — Decision criteria, expanded

| Criterion (buyer's formulation, verbatim) | Group | Owner (buyer-side) | How it will be scored | Authored or influenced by us? | Can we satisfy it? |
|---|---|---|---|---|---|
| | technical / business / relationship-risk | | | yes/no — **influence is disclosed, not counted as independent buyer evidence** | yes / no |

**Criteria we cannot satisfy:** {{stated plainly. Concealing one is a material omission, not a gap to be managed — and it is a disqualification signal.}}

## D — Decision process, expanded

| # | Step | Buyer-side owner | Expected duration | Started? | Target date |
|---|---|---|---|---|---|

**Paper process (MEDDPICC extension — flagged as an extension):**

| Item | Owner | Duration | Started? | What triggers it | Parallel or sequential? |
|---|---|---|---|---|---|
| Security review | | | | | |
| Legal / redlines | | | | | |
| Privacy / DPA | | | | | |
| Procurement / vendor onboarding | | | | | |
| Insurance / compliance attestation | | | | | |
| PO issuance | | | | | |

**Signature authority threshold:** {{value}} — **crossed by this deal?** {{yes / no / unknown}}
**End date implied by this process:** {{date}}
**Close date currently in the forecast:** {{date}}
**If these differ, the forecast is wrong, not the process.** {{state which is being corrected}}
**Step most likely to slip, and who could pre-empt it:** {{...}}

## I — Identify pain, expanded

| Field | Entry |
|---|---|
| What is happening today that should not be, **in the buyer's words** | > "{{verbatim quote}}" — {{speaker}}, {{date}} |
| Recent specific instance, with its date | |
| Cost: money / time / risk / missed commitment | |
| Who inside the buyer feels it personally | {{pain with no owner does not fund projects}} |
| What changed recently to make it urgent now | {{if nothing changed, expect a no-decision outcome and forecast it that way}} |
| Seller hypothesis, if any | {{recorded as a hypothesis, never as pain}} |

## C — Champion, expanded

| Test | Method used | Result | Date |
|---|---|---|---|
| **Influence** — can they convene the people who matter, and have they done it for us? | | | |
| **Personal benefit** — what changes for them if this succeeds, in their own words? | | | |
| **Willingness** — did they act on our behalf when we were not in the room? | | | |

**Classification:** champion / candidate champion (tests incomplete) / coach (information only) / contact / access risk

> Agreement is not the willingness test. Action is. An untested contact is recorded as a contact.
> Never ask a champion to advocate a claim we have not verified — that spends their credibility on
> our risk. See `data/champion-signals.yaml`.

## Extensions used

- [ ] **MEDDICC — Competition.** What the buyer is actually comparing against, **including doing nothing**, in their words: {{...}}
- [ ] **MEDDPICC — Paper Process.** Mapped above.

*Both are marked as practitioner extensions to MEDDIC, not as part of the six letters.*

---

## Gaps and verification

One verification step per gap. Not a list of ten next steps — a list of ten next steps is not a next step.

| Letter at 0 or 1 | The single step that closes it | Owner | By when | Moves score to |
|---|---|---|---|---|

**Two highest-yield verification steps, ranked by how much each would change the decision:**

1. {{step}} — *changes:* {{what decision it changes}} — *costs:* {{one email / one meeting / an executive introduction}}
2. {{step}} — *changes:* {{...}} — *costs:* {{...}}

---

## Verdict

| | |
|---|---|
| **Verdict** | QUALIFIED / QUALIFIED WITH GAPS / NOT QUALIFIED / DISQUALIFIED |
| Rule that produced it | {{quote the rule from `data/qualification-evidence-standards.yaml`}} |
| Forecast confidence cap implied | {{...}} |
| Derived close date | {{from the decision process — or "unavailable, no process on file"}} |

> Do not soften a verdict because the deal is large.

---

## UNVERIFIED

{{Every field below score 2, listed here, separately and visibly. A qualification record that hides
its gaps is worse than no record, because the forecast is built on it.}}

## Integrity findings

- **Any criterion we cannot satisfy:** {{...}}
- **Any material limitation, integration gap or total cost still undisclosed to the buyer:** {{...}}
- **Confirm:** no step in producing this record used fabricated urgency, invented scarcity or manufactured consequence to extract an answer. If the buyer would not name a decision process, that silence is qualification data and is recorded as such. {{confirmed / exception noted}}

## Handoffs

- `@sales:negotiation-lead` — {{only if qualified: the record plus the non-price variables that matter to the buyer}}
- `@sales:method-lead` — {{if the record is sound but the buyer does not see the problem: an insight gap, not an evidence gap}}
- `@sales:pipeline-ops` — {{if this gap repeats across the pipeline: a stage-exit-criteria finding}}
- `@products:positioning-lead` — {{if the same untracked alternative keeps appearing across deals}}
- `@products:pricing-strategist` — {{if the value metric or price structure is misaligned as a pattern, not as one account's objection}}
