# Interview Quality Checklist — Story vs Opinion Gate

**Checklist ID:** PRD-CL-002
**Squad:** products
**Referenced by:** discovery-lead (Sonar)
**Applied to:** an interview guide BEFORE it is used, and a transcript AFTER the interview
**Purpose:** Enforce one distinction. Opinions are generated on the spot; stories are recalled.
Only recalled specifics carry evidence about actual behaviour. A guide that collects opinions
produces confident answers with no predictive value, and every opportunity extracted from them is
fiction with a quote attached.

[[LLM: INITIALIZATION INSTRUCTIONS — INTERVIEW QUALITY

This checklist runs in TWO PASSES against the same interview.

PASS A — the guide, before the interview. Blocking. Run it on the written guide. A guide that
fails a BLOCKER item is not used; it is rewritten. Fixing a guide costs minutes. Fixing a
transcript is impossible — the interview is spent.

PASS B — the transcript, after the interview. Diagnostic. It grades what was actually asked,
including improvised follow-ups, which is where banned forms re-enter even from a clean guide.
Pass B never invalidates a snapshot on its own; it decides how much weight the snapshot carries
and what changes in the next guide.

EXECUTION APPROACH:
1. Pass A: read the guide question by question. Mark each question against section 2, and the
   guide as a whole against sections 1 and 3.
2. Pass B: read the transcript question by question — every question the interviewer actually
   asked, not the planned list. Mark sections 4 to 7.
3. Mark [x] only when it holds. Mark [ ] when it fails or cannot be verified. [N/A] where an item
   genuinely does not apply, with the reason recorded.
4. Count banned question forms as instances, not as a yes/no. Three "would you" questions is a
   different finding from one.
5. Compute the score, assign the verdict, and record the one change to the next guide.

Route price and willingness-to-pay questions to @pricing-strategist rather than rewriting them
into story form — they are a different discipline, not a badly phrased story prompt.]]

---

## PASS A — The Guide, Before It Is Used

### 1. Frame

- [ ] The guide names the target opportunity, or states explicitly that this is an exploratory
      touchpoint with no target yet (BLOCKER)
- [ ] The guide names the outcome the interview is in pursuit of — a touchpoint with no outcome
      behind it is curiosity, and its snapshot will fit nowhere on the tree
- [ ] The opening tells the participant we want what happened, not their opinion of the product
- [ ] The opening removes the pressure to be helpful — there are no wrong answers because we are
      asking about events, not judgements
- [ ] The guide is short enough to be abandoned; a story is followed, not administered
- [ ] Consent, recording and retention are stated before the first question
- [ ] The screener criteria are recorded, so the transcript can be checked against who was meant
      to be in the sample

### 2. Question Forms — Every Banned Form, With the Reason

Check every question in the guide against this table. Each banned form is banned for a specific
reason, and the reason is what lets you recognise a new variant that is not literally on the list.

**Keep — these collect recalled behaviour:**

| Form | Why it is kept |
|---|---|
| "Tell me about the last time you {behaviour}" | Recalls one specific episode; the specifics are the evidence |
| "Walk me through what happened when {event}" | Reconstructs a real timeline in the order it happened |
| "Take me back to that moment — what were you looking at?" | Retrieves context that summary has already stripped out |
| "And then what happened?" | Extends the story without introducing anything of yours |
| "What did you do instead?" | Surfaces the workaround, which is where the opportunity usually is |
| "Who else was involved?" | Exposes the people and constraints a solo account omits |

**Cut — every banned form and its reason:**

| Banned form | Class | Why it is banned |
|---|---|---|
| "Would you use...?" | Prediction | People are poor forecasters of their own future behaviour, and the answer is generated to be agreeable. It produces a yes that predicts nothing. |
| "How often do you...?" | Generalization | It asks for an average across remembered episodes. The average is reconstructed, not recalled, and it erases the specific case you needed. |
| "What do you think about...?" | Opinion | The opinion did not exist before you asked. It is invented on the spot, and it will be quoted later as if it were a finding. |
| "Would you pay for...?" | Prediction plus pricing | Both a forecast and a different discipline. Route to `@pricing-strategist`; do not rewrite it into a story prompt. |
| "Do you like {feature}?" | Opinion | Same defect as "what do you think", plus it invites politeness toward the person who built it. |
| "What would make this better?" | Prediction and solutioning | Asks the participant to design. Users cannot tell you what they need, which is why we do not ask — opportunities are extracted from stories by the trio. |
| "Do you usually {behaviour}?" | Generalization | "Usually" is the tell. There is no episode in the answer, so there is nothing to interrogate. |
| "How important is {thing} to you?" | Opinion, self-rated | A self-reported rating of a hypothetical priority. Importance is inferred from what they did, not from where they put themselves on a scale. |
| "If we built X, would that help?" | Prediction plus leading | Contains your solution and asks for endorsement. The answer is about you, not about them. |
| "Why didn't you just {action}?" | Leading and accusatory | Implies the obvious action and makes the participant defend themselves. The story stops. |
| "Don't you find it frustrating when...?" | Leading | Supplies the emotion. Whatever comes back is yours, not theirs. |
| "What are your requirements?" | Opinion in procurement clothing | Returns a wish list assembled for you. It skips the episodes the list was supposedly derived from. |

- [ ] The guide contains zero prediction questions ("would you", "if we built") (BLOCKER)
- [ ] The guide contains zero opinion questions ("what do you think", "do you like", "how
      important") (BLOCKER)
- [ ] The guide contains zero frequency or generalization questions ("how often", "usually",
      "typically") (BLOCKER)
- [ ] The guide contains zero leading questions that supply the emotion, the answer or the
      solution (BLOCKER)
- [ ] The guide contains zero willingness-to-pay questions; any such question was routed to
      `@pricing-strategist` instead of rephrased
- [ ] Every primary question asks for one specific past episode
- [ ] No question names a feature the team is considering
- [ ] Follow-up moves are listed and are neutral extenders, not prompts toward a preferred answer

### 3. Structure

- [ ] The guide opens on a broad episode and narrows, rather than opening on the team's pet topic
- [ ] Follow-ups are planned as moves ("and then what happened", "what were you thinking right
      then"), not as a second list of questions
- [ ] There is room to abandon the guide and follow the story where it goes
- [ ] Nothing in the guide requires the participant to have seen a design or a prototype, unless
      this is deliberately a usability session and is labelled as one
- [ ] The guide states how the snapshot will be captured and by whom
- [ ] The guide fits the touchpoint length actually scheduled — a thirty-question guide for a
      fifteen-minute slot guarantees rushed, closed questions

**PASS A verdict — a guide with any BLOCKER unchecked is not used. Rewrite and re-run Pass A.**

---

## PASS B — The Transcript, After the Interview

### 4. What Was Actually Asked

Improvised follow-ups are where banned forms return, even from a clean guide. Count instances.

- [ ] Zero prediction questions were asked, including improvised ones (BLOCKER)
- [ ] Zero opinion questions were asked, including improvised ones (BLOCKER)
- [ ] Zero frequency or generalization questions were asked (BLOCKER)
- [ ] Zero leading questions were asked
- [ ] Zero willingness-to-pay questions were asked
- [ ] No question introduced a feature the team is considering
- [ ] Where the participant volunteered an opinion unprompted, the interviewer moved to the
      episode behind it rather than pursuing the opinion
- [ ] Where the participant requested a feature, the interviewer asked what they were trying to do

Record the count and the exact wording of every banned question asked:

| # | Question as asked | Class | Where it came from |
|---|---|---|---|
| | | prediction / opinion / generalization / leading / pricing | guide / improvised |

### 5. What Was Obtained

- [ ] At least one specific past episode was obtained, datable at least loosely (BLOCKER)
- [ ] The episode has a timeline with what they did, not only how they felt
- [ ] The episode includes at least one friction point, workaround or abandonment, or the
      interviewer confirmed explicitly that it went smoothly
- [ ] The episode has an ending — what they did next
- [ ] Context was captured: what they were looking at, who else was involved, what constrained them
- [ ] The participant's own words are on record, not only the interviewer's summary
- [ ] The interviewer stayed silent long enough for the participant to continue unprompted
- [ ] The interviewer did not fill a pause with a suggestion

### 6. Sample Integrity

- [ ] The participant met the screener criteria (BLOCKER)
- [ ] The recruiting source is recorded
- [ ] The bias that source introduces is named, not just the source
- [ ] Whether this is a repeat participant is recorded — a roster that learns to give you the
      answers it thinks you want is a silently degrading sample
- [ ] The interview was conducted in pursuit of the stated outcome, not diverted into a demo, a
      support session or a sales call

### 7. Capture

- [ ] A snapshot was filed using `squads/products/templates/interview-snapshot-tmpl.yaml`
- [ ] It was filed before the next touchpoint
- [ ] Quotes in the snapshot are verbatim, not cleaned up or assembled from separate sentences
- [ ] Every opportunity in the snapshot anchors to a timeline step or a quote in the same
      snapshot (BLOCKER — Constitution Article IV, No Invention)
- [ ] No opportunity in the snapshot names a thing we would build
- [ ] Opportunities are in the customer's language, not internal vocabulary
- [ ] Feature requests were recorded separately from opportunities, each traced to what the
      participant was trying to do
- [ ] Trio attendance was recorded per role
- [ ] The snapshot id is unique and was not reused

---

## Scoring

**Calculation, per pass:** (Checked items) / (Total items − N/A items) × 100

Score the passes separately. They answer different questions: Pass A asks whether this interview
should happen as designed; Pass B asks how much the resulting snapshot is worth.

### Pass A verdict — the guide

| Verdict | Score | Blocker condition | Action |
|---|---|---|---|
| USE IT | 90–100% | All BLOCKERs pass | Run the interview |
| FIX AND USE | 75–89% | All BLOCKERs pass | Fix the flagged questions, then run. No re-review needed |
| REWRITE | Below 75%, or any BLOCKER failed | — | Do not use. Rewrite and re-run Pass A. A banned question in a guide is a banned question in an interview |

### Pass B verdict — the transcript and its snapshot

| Verdict | Score | Blocker condition | Weight the snapshot carries |
|---|---|---|---|
| STRONG EVIDENCE | 90–100% | All BLOCKERs pass | Full. Opportunities extracted from it can stand alone on the tree |
| USABLE | 75–89% | All BLOCKERs pass | Full for the parts anchored to the episode. Note the weak spots in the snapshot |
| CORROBORATION ONLY | 60–74% | All BLOCKERs pass | Do not let an opportunity rest on this snapshot alone. Require a second snapshot before the branch stays |
| NOT EVIDENCE | Below 60%, or any BLOCKER failed | — | The snapshot records a conversation, not behaviour. It may not be cited as provenance for any opportunity. Keep the file, mark it, re-interview |

A NOT EVIDENCE snapshot is not deleted — it is marked, so that nobody re-derives an opportunity
from it six weeks later. Marking it is cheaper than the argument it prevents.

## Priority Fix Order

1. **Prediction and opinion questions in the guide (section 2).** They corrupt the interview
   before it starts and cost nothing to remove.
2. **Improvised banned questions (section 4).** They indicate the interviewer knows the rule but
   loses it under conversational pressure — fix with planned follow-up moves, not with more rules.
3. **No episode obtained (section 5).** The interview happened and produced nothing citable.
4. **Screener miss (section 6).** A perfect interview with the wrong person.
5. **Unanchored opportunities in the snapshot (section 7).** The extraction outran the evidence.
6. **Late filing (section 7).** Written from memory of a memory.

## Record

**Interview:** {snapshot id} — {date}
**Pass A verdict:** {verdict} — {score}
**Pass B verdict:** {verdict} — {score}
**Banned questions asked:** {count} — {classes}
**One change to the next guide:** {change}
**Reviewer:** {trio member}

## Method attribution

- Teresa Torres, *Continuous Discovery Habits: Discover Products that Create Customer Value and
  Business Value* (2021) — story-based interviewing, the distinction between collecting stories
  of specific past behaviour and collecting opinions or predictions, the "tell me about the last
  time" prompt form, extraction of opportunities from stories by the trio, and the interview
  snapshot artifact.
- Tomer Sharon, *Validating Product Ideas: Through Lean User Research* (2016) — question quality,
  screening and recruiting practice for lean research.
- Marty Cagan, *INSPIRED*, 2nd edition (2018) — the value-risk framing behind why a stated
  preference is not evidence of behaviour.

The two-pass structure, the BLOCKER mechanism and the scoring bands are AEXOS conventions, not
published work.

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Snapshot template: `squads/products/templates/interview-snapshot-tmpl.yaml`
- Cadence task: `squads/products/tasks/run-interview-cadence.md`
- Habit health gate: `squads/products/checklists/continuous-discovery-checklist.md`
- Method reference: `squads/products/data/continuous-discovery-reference.md`
- Interview execution protocol: `.aexos-core/development/tasks/ux-user-research.md`
