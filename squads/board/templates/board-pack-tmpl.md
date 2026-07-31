# Board Pack — {MATTER}

**Template ID:** BRD-TMPL-001
**Owned by:** board-chief (Chair)
**Produced by:** `*board-pack {matter}`
**Artifact path:** `squads/board/data/{matter-slug}-board-pack.md`

---

## Professional limit — reproduce this block verbatim in every completed pack

> This pack is a governance and oversight work product. It is **not** legal advice, **not** tax
> advice, **not** a statutory-audit opinion and **not** a regulatory determination. Nothing in it
> is an audit opinion of any kind, and no agent that contributed to it is licensed to issue one.
>
> It is **input for review by the directors themselves and by licensed professionals** — never the
> final decision instrument. Accountability for any decision taken on it rests entirely with the
> humans who take that decision. Where a question turns on a statute, a listing rule, a contract, a
> filing obligation or an accounting-policy determination, it is referred to qualified counsel or
> auditors and is marked `REFERRED OUT` below rather than answered here.

---

## How this template is used

Chair **generates nothing** in a board pack. Every statement is transcribed from a specialist
artifact and carries that artifact's path and date. This is Constitution Article IV (No Invention)
applied to the board surface: a pack that contains a claim no specialist artifact supports has
laundered assertion into synthesis.

Fill the sections in **coherence-chain order**. If a link has no artifact, write
`NO ARTIFACT — this is a finding, not a blank` in that section. An absent oversight view is
reportable; a silently omitted one is not.

---

## 1. Matter and classification

| Field | Entry |
|---|---|
| Matter (one sentence, oversight vocabulary) | |
| Classification | RESERVED / DELEGATED WITH OVERSIGHT / NOT A BOARD MATTER / UNDEFINED |
| Classification source | `*charge-check` output, path and date |
| Meeting and date | |
| Item type | DECISION / OVERSIGHT / INFORMATION |
| Decision sought (or `none — information item`) | |

**Boundary tests applied** (all three, results shown — never summarized):

| Test | Result |
|---|---|
| Decided by the board, or checked by the board? | |
| If the board decides this, who is left to hold accountable? | |
| Approve, or be informed? Is there a real delegated alternative? | |

---

## 2. Coherence chain — one row per link, each traced

| Link | Owning specialist | Artifact (path + date) | What it says | Status |
|---|---|---|---|---|
| Mandate — what is reserved, delegated to whom, recorded where | governance-counsel | | | CONSISTENT / BREAK / BREAK-INHERITED / NO ARTIFACT |
| Appetite — how much of what kind of risk, expressed how | risk-oversight | | | |
| Control — what keeps exposure inside appetite | risk-oversight | | | |
| Evidence — how we know the control operated, and who says so | audit-lead | | | |
| Capacity — leadership to carry this, now and after a departure | succession-lead | | | |
| Accountability — who answers if it fails, and does the record show it | governance-counsel | | | |

**Propagation rule.** A break invalidates every link downstream of it, not only the adjacent one.
Mark inherited breaks as `BREAK-INHERITED` and do **not** propose repairing them directly —
repair the upstream cause. Commissioning assurance over a control that is defective by design
produces assurance that faithfully confirms the defect.

**Repair order (upstream first):**

1.
2.
3.

---

## 3. Decisions sought

For each decision the board is asked to take:

| # | Decision sought | Supporting evidence (artifact + date) | What remains unknown | Falsifier — what observation would show this to be wrong |
|---|---|---|---|---|
| 1 | | | | |

A decision item whose evidence column is empty is **not a decision item**. Reclassify it as
INFORMATION and say so on the agenda, or defer it with an owner and a date.

---

## 4. Specialist views, verbatim

### 4.1 Governance (governance-counsel — Cadbury Report, 1992, and principles derived from it)

> Source artifact:
> Date:

*Transcribe the finding. Do not paraphrase into a softer form.*

### 4.2 Risk (risk-oversight — COSO *Enterprise Risk Management — Integrating with Strategy and Performance*, 2017)

> Source artifact:
> Date:

### 4.3 Assurance (audit-lead — audit committee discipline; assembled from named institutional sources, no single canonical work)

> Source artifact:
> Date:

### 4.4 Capacity (succession-lead — Charan, Carey & Useem, *Boards That Lead*, 2013)

> Source artifact:
> Date:

**Where a discipline produced nothing:** state
`{discipline}: NO VIEW PRODUCED — {reason}. Consequence for this decision: {consequence}.`

---

## 5. Contradictions between specialist views

| Views in conflict | The assumption they do not share | Evidence each holds | Disposition |
|---|---|---|---|
| | | | DECIDED (on named evidence) / EVIDENCE REQUESTED / DEFERRED |

**Never average two contradictory recommendations.** A compromise position supported by neither
body of evidence is a new, unevidenced claim manufactured out of two evidenced ones. If the
disagreement is about values or risk tolerance rather than fact, surface it as a decision for the
humans and say so explicitly.

---

## 6. Open questions

| Question | Who could answer it | By when | Consequence of deciding without it |
|---|---|---|---|

---

## 7. Unretired risks

Exposures that remain open regardless of this decision. Nothing arrives downstream looking more
certain than it is.

| Exposure | Severity basis | Response (or `NONE`) | Owner |
|---|---|---|---|

---

## 8. Referred out — questions this squad will not answer

| Question | Why it is outside | Referred to | Status |
|---|---|---|---|
| | Statute / listing rule / contract / tax / statutory audit / accounting policy / employment law | Qualified counsel or auditors | Requested {date} / Received {date} / Outstanding |

An item that depends on an outstanding referral is **not ready to resolve**. Defer it with an owner
and a date rather than deciding around the gap.

---

## 9. Dissent

Recorded verbatim, with the dissenter named, before any disposition is written.

| Who | On what grounds | What would change their view |
|---|---|---|

If there is none, write `No dissent recorded.` — do not omit the section. A board that minutes only
agreement leaves no evidence that independent judgement was exercised.

---

## 10. Traceability audit — run before circulation

- [ ] Every statement in sections 2–7 names a source artifact and its date
- [ ] No statement originates in this pack
- [ ] Every `NO ARTIFACT` is reported as a finding with its consequence stated
- [ ] Section 8 lists every referred-out question, none summarized into a caveat
- [ ] The professional-limit block is reproduced verbatim at the top
- [ ] Nothing in this pack drafts an epic (`@pm`), a story (`@sm`), an implementation (`@dev`), a test (`@qa`) or a release (`@devops`)

---

## Attribution note for the completed pack

Reproduce, adapted to which frameworks the pack actually used:

> **Attribution.** Governance findings apply the *Report of the Committee on the Financial Aspects
> of Corporate Governance* (the **Cadbury Report**, United Kingdom, December 1992) and its Code of
> Best Practice. Risk findings apply **COSO**'s *Enterprise Risk Management — Integrating with
> Strategy and Performance* (2017), which is a **separate publication** from COSO's *Internal
> Control — Integrated Framework* (originally 1992, updated 2013). Assurance findings draw on audit
> committee practice, which has **no single canonical work**; each provision used is attributed to
> its named source (Cadbury 1992; COSO *Internal Control*; the Sarbanes-Oxley Act of 2002; the
> three-lines model associated with the Institute of Internal Auditors, whose formulation has
> changed between versions) or marked `DISCIPLINE` where it is common professional practice with no
> traceable origin. Succession findings apply Charan, Carey & Useem, *Boards That Lead* (Harvard
> Business Review Press, 2013), which is a **different book with different co-authors** from Charan,
> Drotter & Noel, *The Leadership Pipeline* (2001); the two are never cited for each other's
> content.
>
> Applying any of these to an organization outside its original scope is an **analogy**, and the
> adaptation is declared where it is made. No provision is quoted from memory: where the precise
> wording matters to a decision, the source document is read.
