# Willingness-to-Pay Interview Guide — [OFFER_NAME]

**Template ID:** PRD-TM-WTP-001
**Owner agent:** `@pricing-strategist` (Assay)
**Serves task:** `squads/products/tasks/run-wtp-talk.md` (`*wtp-talk`)
**Method source:** Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the Product Around the Price* (2016) — Rule 1, "Have the willingness-to-pay talk early"; the leader / filler / killer classification.

> This guide is run **before the build**, while its answers can still change what gets built.
> Run after the build, the same conversation is an autopsy: it names which features were wasted
> and which killers already shipped.

[[LLM: FILL INSTRUCTIONS — WTP INTERVIEW GUIDE

This is a fillable document. Every `[BRACKETED]` field is a placeholder you replace.
Every field carries a **How to fill** line and a **Failure mode** line — read both before writing.

Do not delete the instruction lines while drafting; delete them only in the final circulated copy.
Do not delete a section because it is inconvenient. A skipped section is a recorded gap
(Section 9), never a silent omission.

Order matters. Blocks B, C and D (indirect) run BEFORE Block E (direct) in every interview.
Asking the price question first anchors the respondent and contaminates everything after it.]]

---

## 1. Study Header

| Field | Value | How to fill | Failure mode |
|---|---|---|---|
| Offer under test | `[OFFER_NAME]` | The outcome the customer would recognise, in their words | Internal feature or codename. Customers price outcomes; they cannot price a component |
| Offer description | `[ONE PARAGRAPH, OUTCOMES NOT FEATURES]` | What changes for the customer if this exists | A feature list. If it reads like a changelog, rewrite it |
| Build status | `[pre-build / in build / shipped]` | State it honestly, from the repo and the roadmap, not from what is convenient | Recording `pre-build` when engineering has already committed the scope. Overstates what this study can change |
| What findings can still change | `[SCOPE / PACKAGING / PRICE ONLY]` | Derive from build status using the table in Section 2 | Claiming scope influence when the code is merged |
| Study owner | `[NAME]` | One accountable human, not a squad | "The team". Nobody owns an unowned finding |
| Interviewer(s) | `[NAMES]` | Whoever runs the sessions; indirect questioning needs skill | Rotating untrained interviewers across segments — variance becomes indistinguishable from segment difference |
| Fieldwork window | `[YYYY-MM-DD] to [YYYY-MM-DD]` | Actual dates, filled after fieldwork closes | Leaving it open. Prices and alternatives move; undated WTP data ages badly |
| Positioning reference | `[LINK to @positioning-lead output / ABSENT]` | Best-fit segment and value themes | Marking "absent" without flagging it. Packaging built on an unsettled frame of reference has to be redone |
| Instrument(s) chosen | `[SEE SECTION 4]` | Name the method and its sample requirement | "Interviews" with no instrument named. There is no sample requirement to hold you to |

---

## 2. Build-Status Declaration

Copy the matching row and state it as a sentence at the top of the findings artifact.

| build_status | What these findings can still change |
|---|---|
| pre-build | Scope, packaging, which features are built at all — full value |
| in build | Packaging, tier placement, and whether a killer ships — partial value |
| shipped | Packaging and price only. Record explicitly that scope evidence arrived too late |

**Declaration:** `[SENTENCE — e.g. "This study is run at (status). Its findings can still change (list). They cannot change (list)."]`

> **How to fill:** name what it *cannot* change as explicitly as what it can.
> **Failure mode:** omitting the "cannot" half. It lets a shipped-product diagnosis be read as a
> pre-build mandate, and the scope conversation never happens.

---

## 3. Sample Plan Per Hypothesised Segment

One block per hypothesised segment. **Never one plan across all segments.** Aggregating averages a
strong willingness to pay in one segment with none in four others and produces a comfortable,
meaningless number.

### Segment `[A]` — `[SEGMENT NAME]`

| Field | Value | How to fill | Failure mode |
|---|---|---|---|
| Defining value driver | `[WHAT THIS SEGMENT IS TRYING TO ACHIEVE]` | The outcome that makes this group willing to pay differently from the others | Naming an industry, headcount band, or persona label. Demographic segments do not predict purchase behaviour |
| Hypothesis to test | `[WE BELIEVE THIS SEGMENT PAYS FOR X BECAUSE Y]` | A falsifiable statement | An unfalsifiable statement ("they value quality") |
| Target sample | `[N]` | From the instrument's requirement in Section 4 — for interview-based indirect questioning, **12–25 interviews per hypothesised segment** | Choosing n by calendar availability and reporting it as if the method were satisfied |
| Achieved sample | `[N, filled after fieldwork]` | Actual completed sessions, not invitations sent | Reporting invitations or no-shows as sample |
| Recruiting source | `[FUNNEL / CUSTOMER LIST / PANEL / REFERRAL]` | Where respondents came from, exactly | Recruiting only from existing happy customers, then reporting the result as market WTP |
| Screening criterion | `[OBSERVABLE TEST THAT PUTS SOMEONE IN THIS SEGMENT]` | Must be checkable in a screener call | A criterion only detectable after purchase — then the segment cannot be sampled and cannot be sold to |
| Identifiable pre-sale? | `[YES + how / NO]` | State the signal that identifies this segment in the funnel | "Yes" with no signal named. A segment you cannot detect in the funnel is an analysis artifact, not a commercial instrument |
| Fenceable post-sale? | `[YES + fence candidate / NO]` | The capacity, feature, user class, support level or commitment that separates them | Assuming a fence exists because the segment feels distinct |
| Reachability risk | `[WHAT COULD PREVENT REACHING N]` | Stated before fieldwork, not after | Discovering unreachability at week three and silently shrinking n |

_Duplicate this block for segments `[B]`, `[C]`, … Segments that cannot be sampled cannot be priced — record them as unpriceable rather than folding them into another segment._

---

## 4. Instrument Selection Record

| Need | Instrument | Sample requirement (as documented) | Selected? |
|---|---|---|---|
| Early concept, small n, reasons rather than numbers | Open-ended direct and indirect questioning in interviews | 12–25 interviews per hypothesised segment | `[ ]` |
| An acceptable price range, fast | Van Westendorp price sensitivity meter | Typically 100+ respondents for stable curves | `[ ]` |
| A demand curve at discrete price points | Gabor-Granger | 100+ respondents | `[ ]` |
| Trade-offs between features and price | Conjoint analysis | 200+ respondents for reliable part-worths | `[ ]` |
| Feature priority without price | MaxDiff, then price the top set | 150+ respondents | `[ ]` |
| Discountable purchase intent | Purchase probability scale | Enough per price point to be stable | `[ ]` |

**Chosen instrument(s):** `[NAME]`
**Reason:** `[WHY THIS FITS THE STAGE AND THE SAMPLE AVAILABLE]`
**Sample requirement accepted:** `[N per segment]`
**If the requirement cannot be met:** `[STATE THE SHORTFALL AND THE CONFIDENCE PENALTY]`

> **How to fill:** if you cannot meet the sample requirement, say so here and downgrade the
> confidence label on every number the instrument produces. Do not switch to a cheaper instrument
> and keep the strong claim.
> **Failure mode:** running Van Westendorp on nine interviews and reporting the four price points
> as a range. The instrument did not fail — the sample never supported it.

**Pairing rule (standing):** any stated-preference method must be paired with observed behaviour
before a business case rests on it. Record here what the observed-behaviour pairing will be:
`[TRANSACTION DATA / PRICED PILOT / LIVE TEST VIA @experimentation-lead / NOT YET PLANNED]`

---

## 5. The Interview

Run the blocks in order. Blocks B–D (indirect) come before Block E (direct) in every session.

### Block A — Context and forcing function (5 min)

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| A1 | `[Tell me about the last time (problem) came up.]` | Whether there is a forcing function at all | Verbatim, with the trigger named | Accepting a hypothetical. "It would come up if…" is not a forcing function |
| A2 | `[Who else is involved when this gets decided?]` | Buyer vs user vs budget holder | Role names and who signs | Interviewing a user and reporting their ceiling as the account's ceiling |
| A3 | `[What happens if nothing changes?]` | The cost of the status quo | The consequence, quantified if they offer it | Prompting the consequence for them. If you supply it, you measured your own hypothesis |

### Block B — Current spend and what it costs them

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| B1 | `[What do you use today for this, and what does it cost you — in money, in hours, in risk?]` | The three currencies, separately | Money / hours / risk in three fields | Collapsing to money only. Most of the value structure lives in hours and risk |
| B2 | `[Walk me through the last time this problem cost you something. What happened?]` | A specific incident, not a policy | Date, event, consequence | Accepting a generalisation ("it happens all the time") without one dated instance |
| B3 | `[Who pays for that today — which budget line?]` | Whether a budget already exists | Budget owner and line | Assuming a new budget can be created. A price inside an existing line is a different sale from one that needs a new line |
| B4 | `[What would have to be true for this to come out of a budget you already control?]` | The threshold for frictionless purchase | The stated condition | Treating the answer as a price. It is a *procurement* condition and belongs in the packaging discussion |

### Block C — The real alternative

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| C1 | `[If you could not use anything like this, what would you do instead?]` | The genuine alternative — often a spreadsheet or a person, not a vendor | Named alternative | Recording a competitor because the respondent named one when prompted |
| C2 | `[What does that alternative cost you, all-in?]` | The comparison basis the price will be judged against | Cost and effort of the alternative | Using vendor list prices as the alternative's cost when the real alternative is internal labour |
| C3 | `[What does the alternative do better than what I described?]` | Where the offer is genuinely weaker | Honest deficits | Skipping this question because the answers are uncomfortable. These answers are where killers hide |

> Frame of reference is `@positioning-lead`'s territory. If Block C reveals the frame is unsettled —
> respondents cannot agree on what category this is — stop packaging work and hand back.

### Block D — Trade-offs: what they would drop to hold a price

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| D1 | `[If this offer existed, which parts would you drop to hold the price down?]` | The filler set, revealed by what they surrender first | Ordered list of what goes first | Asking "what is important?" instead. Everything is important until something must be given up |
| D2 | `[Which part would you refuse to drop at any price?]` | Leader candidates | The protected item, per respondent | Counting a leader from one enthusiastic respondent |
| D3 | `[If (leader candidate) were removed, what would that change for you?]` | Whether the ceiling moves | The stated effect on price acceptability | Asking about a feature they have not understood. Describe the outcome first, then ask |
| D4 | `[What would you have to stop paying for to afford this?]` | The budget it displaces | Named displaced spend | Ignoring the answer. What it displaces is often the truest read on perceived value |

### Block E — Direct price question — **DIRECTIONAL ONLY**

> ⚠️ **This block is directional evidence only and is labelled as such wherever it is reported.**
> Direct price questions rarely work: buyers anchor and understate. The documented sample note for
> direct questioning is "any; treat as directional only." Nothing from Block E may be quoted as a
> price without the indirect evidence from Blocks B–D standing behind it.

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| E1 | `[What would you expect something like this to cost?]` | The frame they arrived with | Number + the frame they named | Reporting this as WTP. It is an expectation shaped by whatever they last bought |
| E2 | `[At what price would this be so cheap you would question it?]` | The credibility floor | Number | Treating the floor as an opportunity to price low. It is a signal about perceived category |
| E3 | `[At what price would it be too expensive to consider?]` | The refusal point | Number | Reading the refusal point as the ceiling. Refusal and ceiling are not the same number |
| E4 | `[What number would make this an obvious yes?]` | Their comfortable anchor | Number | Using it as a target. It is the most understated number in the interview |

**Reporting rule for Block E:** every figure carries the tag `direct-stated / directional only`.

### Block F — Purchase probability at specific price points

| # | Ask | Listening for | Record as | Failure mode |
|---|---|---|---|---|
| F1 | `[At (price point 1), how likely would you be to purchase — and what would you compare it to?]` | The graded likelihood **and** the comparison | Scale value + named comparison | Recording the number without the comparison. The comparison is what makes the number interpretable |
| F2 | `[Repeat at (price point 2), (price point 3) …]` | Where likelihood breaks | Value per point | Testing points clustered so tightly that no break can appear |
| F3 | `[What would have to change for that to move up a step?]` | The missing leader, or the fence in the wrong place | The stated condition | Skipping it. This is where an upgrade path gets designed |

**Scale used:** `[STATE THE GRADED SCALE AND ITS LABELS]`
**Price points tested:** `[LIST — and where they came from: benchmark, alternative cost, or Block B spend]`

> **How to fill:** derive price points from Blocks B and C (what they spend, what the alternative
> costs), not from your cost model. **Failure mode:** points derived from unit cost plus target
> margin. Cost sets the floor below which you should not sell; it says nothing about what the
> customer will pay.

### Block G — Leader / filler / killer probe set

Run once per feature in scope. Every feature in `feature_set` gets a class; "unclassified" is not
an outcome — it means the instrument did not cover it, and that is a gap for Section 9.

| Probe | Ask | Class it supports | Record as | Failure mode |
|---|---|---|---|---|
| G1 — Leader probe | `[If (feature, described as an outcome) were included, would that change what this is worth to you? How?]` | Leader — the acceptable price ceiling moves when the feature is present | Ceiling with and without, per segment | Asking whether they "like" it. Liking does not move a ceiling |
| G2 — Filler probe | `[And if it were not included?]` | Filler — ceiling unchanged with and without | The comparison showing no effect | Not asking the negative case, so "no effect" is never observable |
| G3 — Unprompted mention | `[Which parts did you remember without me listing them?]` | Leader corroboration | Count of unprompted mentions | Treating prompted recall as unprompted |
| G4 — **Killer probe** | `[What in this offer would make you stop the evaluation?]` | Killer — a segment disengages or lowers its ceiling when the feature or requirement is present | Which segment, how many respondents, what they said | **Leaving this question out.** It is the one that most often changes the build, and the one most often omitted |
| G5 — Killer confirmation | `[Is that a delay, or a stop?]` | Severity of the killer | Delay vs stop, verbatim | Recording every objection as a killer. A killer measurably reduces WTP or ends the evaluation — an inconvenience does not |
| G6 — Disposition probe | `[If (killer) were optional rather than required, would that change your answer?]` | Whether the fix is removal, optionality, or a fence | Which disposition the respondent's answer supports | Deciding the disposition without asking, then defending it later |

### Block H — Close

| # | Ask | Record as | Failure mode |
|---|---|---|---|
| H1 | `[What did I not ask that I should have?]` | Verbatim | Cutting it for time. It is the cheapest source of unknown-unknowns in the session |
| H2 | `[Who else has this problem differently from you?]` | Referral + how they differ | Taking the referral and dropping "how they differ" — that clause is a segment hypothesis |

---

## 6. Per-Interview Capture Sheet

One per session. Fill during or immediately after; not from memory a week later.

```
Interview ID:        [SEG-A-01]
Date:                [YYYY-MM-DD]
Segment (hypothesised): [A]
Role / buying power:  [USER / BUYER / BUDGET HOLDER]
Recruiting source:    [ ]

Current alternative:  [ ]
Current cost — money: [ ]  hours: [ ]  risk: [ ]
Displaced budget:     [ ]

Dropped first (D1 order):     [ ]
Refused to drop (D2):         [ ]
Unprompted mentions (G3):     [ ]
Killer signals (G4/G5):       [ ]  severity: [DELAY / STOP]

Direct-stated numbers (Block E — DIRECTIONAL ONLY): [ ]
Purchase probability by point (Block F):            [ ]

Segment reassignment: [KEEP AS A / MOVE TO ... / NEW SEGMENT HYPOTHESIS]
Interviewer confidence in this session: [HIGH / MEDIUM / LOW] because [ ]
```

> **How to fill:** the reassignment line matters as much as the numbers. Respondents who do not fit
> the hypothesised segment are the strongest evidence the segmentation is wrong.
> **Failure mode:** forcing every respondent into a pre-declared segment so the sample counts look
> complete. That is how a minivan gets validated.

---

## 7. Interpretation Rules

These are not optional analysis preferences. They are the conditions under which the findings may
be quoted downstream.

### 7.1 Never report a point

Every number leaves this study with three things attached: **the method that produced it, the
sample it rests on, and the range.** A single price point quoted without them invites decisions
with unearned confidence.

- ✅ `Segment A acceptable range [X]–[Y], indirect questioning + [instrument], n=[N] of 12–25 target`
- ❌ `Segment A will pay [X]`

### 7.2 Discount stated intent — heavily

Stated intent overstates behaviour. Purchase-probability responses produce a **discountable intent
curve**, not a forecast: the top box of a graded scale is an intention under no budget pressure,
no procurement, and no competing priority.

- **The mechanism is documented; a universal discount factor is not.** Do not adopt a fixed
  percentage as if it were published guidance. `[verify against source]`
- **What to do instead:** state the discount you applied, the reason you chose it, and who owns it
  as an assumption. It enters the business case as a named assumption with an owner and a
  validation plan (see `pricing-business-case-tmpl.md`), never as a fact.
- **Calibrate where you can:** if you have any historical pair of stated intent and realised
  conversion for this audience, use your own realised ratio and cite it as a transaction record.
  That is a documented source; a borrowed rule of thumb is not.
- Worked examples elsewhere in this squad's artifacts that show a specific discount (for instance
  a 60% haircut) are **illustrative placeholders**, not defaults to inherit.

**Record here:**

| Field | Value |
|---|---|
| Discount applied to stated intent | `[X% — or "none, intent not used"]` |
| Basis for that discount | `[OWN HISTORICAL RATIO / CITED BENCHMARK / JUDGEMENT — say which]` |
| Assumption owner | `[NAME]` |
| Validation plan | `[HOW THIS GETS CHECKED AGAINST BEHAVIOUR]` |

> **Failure mode:** applying a confident-sounding discount with no basis, which converts an
> unsourced number into a sourced-looking one. If the basis is judgement, write "judgement".

### 7.3 Never aggregate across segments

Analyse each hypothesised segment separately and report separately. An aggregate range across
segments hides exactly the heterogeneity the study exists to find.

### 7.4 Direct answers are directional only

Block E numbers may inform the price points tested in Block F. They may not stand alone as a WTP
finding, and they never enter the business case as a price.

### 7.5 Leader / filler / killer requires evidence, not impression

| Class | Test | Evidence to record |
|---|---|---|
| Leader | The acceptable price ceiling moves when this feature is present | The ceiling with and without, per segment |
| Filler | The ceiling is unchanged with and without | The comparison showing no effect |
| Killer | Any segment disengages or lowers its ceiling when it is present | Which segment, how many respondents, what they said |

### 7.6 Report the killers first

For each killer, name the affected segment and choose one disposition: **remove**, **make
optional**, or **fence away** from the affected segment. A killer that ships unflagged does its
damage before price is ever discussed. This is the finding that most justifies the whole study —
report it first, not last.

### 7.7 Article IV gate — No Invention

Any figure without a documented interview, survey instrument, transaction record or cited benchmark
is marked **UNVERIFIED**. UNVERIFIED figures may appear in this guide's findings for transparency.
They never enter a business case.

| Figure | Source type | Source reference | Status |
|---|---|---|---|
| `[ ]` | `[interview / survey instrument / transaction record / cited benchmark]` | `[ID or link]` | `[VERIFIED / UNVERIFIED]` |

---

## 8. Findings Summary (fill after fieldwork)

| Segment | Defining value driver | Sample achieved / target | Acceptable range | Method | Identifiable pre-sale? | Fenceable? | Confidence |
|---|---|---|---|---|---|---|---|
| `[A]` | `[ ]` | `[n / 12–25]` | `[X – Y]` | `[ ]` | `[YES: signal / NO]` | `[YES: fence / NO]` | `[HIGH/MED/LOW]` |
| `[B]` | | | | | | | |

| Feature | Class | Evidence | Affected segment | Action |
|---|---|---|---|---|
| `[ ]` | `[LEADER / FILLER / KILLER]` | `[ceiling movement, counts, verbatims]` | `[ ]` | `[anchor tier / bulk / remove / optional / fence]` |

**Killers, reported first:**
1. `[FEATURE OR REQUIREMENT]` — affects `[SEGMENT]`, `[N/N]` respondents — disposition: `[REMOVE / OPTIONAL / FENCE]`

---

## 9. Coverage Gaps and Build Impact

**Coverage gaps** (features the instrument did not cover, segments not reached, sample shortfalls):
- `[ ]`

**Build impact** — state as concrete scope changes, not as a summary:

| Change | Rationale from evidence |
|---|---|
| Features to cut | `[no segment's ceiling moves for them]` |
| Requirements to remove or make optional | `[they are killers for (segment)]` |
| Features to keep and place deliberately | `[they lead for (named segment)]` |
| Segments to stop pursuing | `[range does not support cost to serve]` |

> If build status is `pre-build`, this table is the point of the exercise. If it is empty, either
> the study found nothing or the questions were too safe to find anything. Say which.

---

## 10. Boundary

This guide produces evidence and a classification. It does **not**:

- design packages — that is `packaging-design-tmpl.md`
- choose the monetization model or set the final price — `monetization-models.yaml` and `*monetization-model`
- run a live price test — `@experimentation-lead`, with a defined OEC, guardrail metrics and a sample-size calculation
- implement billing or metering — `@dev` with `@data-engineer`
- write stories (`@sm`), epics or PRDs (`@pm`), or push anything (`@devops`, exclusive)
- settle category or narrative — `@positioning-lead`

---

## 11. Attribution

The framework applied here is published work, cited so it can be checked at the source.

- Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation: How Smart Companies Design the
  Product Around the Price* (2016) — Rule 1, have the willingness-to-pay talk early; the
  leader / filler / killer classification; value-based segmentation.

`@pricing-strategist` (Assay) applies this framework with attribution. Any figure in this document
that is not traceable to a documented interview, survey instrument, transaction record or cited
benchmark is marked UNVERIFIED.
