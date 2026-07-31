# Coherence Checklist

**Checklist ID:** PRD-CL-011
**Squad:** products
**Referenced by:** `@products-chief` (Helm) — `*coherence-check`
**Executed by:** `squads/products/tasks/coherence-review.md`
**Purpose:** Run the six contradiction checks as an executable gate over the squad's artifacts for
one initiative. Output is a **repair order**, not a grade — a coherence audit that produces a
percentage tells you nothing about what to fix first.

[[LLM: INITIALIZATION INSTRUCTIONS — COHERENCE GATE

This checklist is read-only. It finds breaks; it does not repair them. Repairs belong to the
specialist who owns the broken link.

EXECUTION APPROACH:
1. Establish the baseline: which strategy artifact is currently in force. Everything is read
   against it. If two strategy artifacts exist and neither is marked superseded, STOP — route to
   @products:product-strategist to declare which is in force. There is no baseline until then.
2. Map every artifact for the initiative to exactly one chain link. Record links with no artifact
   as MISSING, and artifacts that map to no link as candidate orphans.
3. Run all six checks. Every check gets a recorded result, including the ones that pass. A check
   left "not run" is a hole in the audit, not a pass.
4. Classify each failure INDEPENDENT or INHERITED using the inheritance test in section 7.
5. Apply the propagation rule: everything downstream of the earliest break is SUSPECT, including
   links whose own check passed.
6. Decide the repair direction (section 8). The default is that upstream is right — it is not
   always true, and getting this wrong propagates a decision nobody holds.
7. Emit the repair order (section 9). Do not emit a score.

MINIMUM INPUT: two or more artifacts for the same initiative. One artifact cannot contradict
anything.]]

---

## The chain

```text
segment -> job -> outcome -> solution -> narrative -> price -> measure
```

| Link | Owner | The question the link answers |
|---|---|---|
| segment | product-strategist | Who exactly is this for? |
| job | jobs-analyst | What are they hiring it to do, and what are they firing? |
| outcome | product-strategist | What measurable change are we accountable for? |
| solution | discovery-lead | Which solution, validated against which assumptions? |
| narrative | positioning-lead | Against which alternative, in which category, described how? |
| price | pricing-strategist | What value metric, what packaging, what level? |
| measure | experimentation-lead | How do we know it worked, with what confidence? |

**Propagation rule:** a break in any link invalidates every link downstream of it, not only the
adjacent one. Repair upstream first.

---

## 0. Preflight

- [ ] The initiative is named, and every artifact belongs to it
- [ ] At least two artifacts exist (one artifact cannot contradict anything)
- [ ] The strategy artifact currently in force is identified and is the baseline
- [ ] Every artifact carries a date; inferred dates (from git history) are marked `inferred`
- [ ] Each artifact is mapped to exactly one chain link
- [ ] Links with no artifact are recorded as MISSING (a gap, not a break)
- [ ] Links claimed by two disagreeing artifacts are recorded as CONTESTED and routed to
      `*conflict-resolve` — this checklist locates conflicts, it does not arbitrate them

---

## 1. Segment drift

**Test:** Does the strategy's target segment match the positioning's target customer, the pricing's
assumed buyer, and the experiment's population?

- [ ] The strategy names a segment specific enough to exclude somebody
- [ ] The positioning's target customer is the same population as the strategy's segment
- [ ] The pricing's assumed buyer belongs to that segment and can sign for it
- [ ] The experiment's population is drawn from that segment, and its exclusions are consistent
- [ ] The difference between any two of the above is a difference of wording, not of population
      (test: could a customer belong to one description and not the other?)

**Typical cause:** positioning or pricing written after the strategy changed segment, and never
revisited. It shows up in the pricing model first, because the assumed buyer has to be concrete.

**On failure:**
1. Record which artifacts name which population, with dates.
2. Classify (section 7). Pricing drift that follows positioning drift is INHERITED.
3. Run the direction test (section 8) — if three downstream artifacts independently name a
   different segment than the strategy, the strategy may be the stale artifact.
4. Route the segment question to `@products:product-strategist` as a decision, not a correction.
5. Hold every downstream repair until the segment answer exists. Repairing them first buys a
   second rewrite.

---

## 2. Job mismatch

**Test:** Does the job in the JTBD analysis explain the competitive alternative named in the
positioning?

- [ ] The jobs artifact names what customers are firing, not only what they are hiring
- [ ] The competitive alternative in the positioning is something a customer in that job would
      actually consider
- [ ] The alternative is consistent with the struggling moment described in the jobs artifact
- [ ] Non-consumption (doing nothing, or doing it manually) is either named as the alternative or
      explicitly ruled out with evidence

**Typical cause:** positioning benchmarked against category competitors while customers are
actually switching from a spreadsheet or from nothing. The category feels like the right
comparison set because it is the one the team reads about.

**On failure:**
1. State both: the alternative the positioning assumes, and the alternative the job evidence
   supports.
2. If the jobs artifact has switching evidence and the positioning does not, this is
   INDEPENDENT at the narrative link — the narrative is wrong on its own terms.
3. Route to `@products:positioning-lead` with the jobs artifact as the input.
4. Check the price link immediately after: a price anchored to the wrong alternative is almost
   always INHERITED from this break.

---

## 3. Outcome and measure divergence

**Test:** Does the experiment's primary metric measure the outcome named in the team objective?

- [ ] The outcome is a change in behaviour with a baseline and a target, not an output or a
      shipping milestone
- [ ] The primary metric moves if and only if the outcome moves (a proxy that can move without the
      outcome moving is a divergence, not an approximation)
- [ ] Guardrail metrics exist and would catch a win achieved at another metric's expense
- [ ] The metric was chosen for the outcome, not because the instrumentation already existed

**Typical cause:** instrumentation chosen for availability rather than for the outcome. Page views
are always available; the outcome rarely is.

**On failure:**
1. Name the outcome and the metric side by side, and state the case where one moves without the
   other.
2. This break is usually INDEPENDENT — a metric can be wrong regardless of segment or narrative —
   which makes it parallel-safe and it should start immediately.
3. Route to `@products:experimentation-lead` for metric definition and instrumentation
   requirements. If the instrumentation does not exist, the implementation of it belongs outside
   the squad (`@data-engineer`), not inside it.
4. If the outcome itself is an output, the break is at the outcome link instead — route to
   `@products:product-strategist` first, and everything downstream is INHERITED.

---

## 4. Value metric conflict

**Test:** Does the pricing value metric scale with the value described in the positioning and
delivered by the solution?

- [ ] The value metric grows as the customer gets more of what the positioning promises
- [ ] A customer getting twice the value pays meaningfully more, and one getting less pays less
- [ ] The metric is something the buyer can observe and predict before the invoice arrives
- [ ] The metric does not penalise the behaviour the outcome is trying to increase

**Typical cause:** per-seat pricing on a product whose value is per-workflow, or the reverse. Also
common: a metric inherited from the previous product line and never re-derived for this one.

**On failure:**
1. State the value described in the positioning and the thing the metric counts, and show where
   they diverge.
2. Classify carefully. If the positioning is itself broken (checks 1 or 2), this is INHERITED and
   must NOT be repaired yet. If the positioning holds and the metric simply does not track it,
   this is INDEPENDENT.
3. If the metric penalises the outcome — charging per run on a product whose objective is more
   runs — say so explicitly. That is a conflict between the price link and the outcome link, and
   it needs both owners, sequenced: outcome first.
4. Route to `@products:pricing-strategist`, with the positioning artifact as the input.

---

## 5. Evidence inversion

**Test:** Is any downstream artifact more confident than the evidence upstream of it?

- [ ] Each artifact's confidence level is derived from the evidence it names, not from its tone
- [ ] Confidence is monotonic down the chain — no link is more certain than the link above it
- [ ] Every "validated" claim names what was tested, on whom, when, and with what result
- [ ] No artifact treats an assumption from an upstream artifact as an established fact
- [ ] Evidence that is named and dated but stale is flagged as stale, not silently accepted

**Ladder used for the comparison:**

| Level | Means |
|---|---|
| MEASURED | Instrumented or quantitative data; named, retrievable, dated, current |
| EVIDENCED | Named qualitative evidence — interviews, WTP conversations, win/loss — with N and date |
| INFERRED | Reasoned from evidence about an adjacent population or an earlier period |
| ASSUMED | No evidence named; a working assumption |
| ABSENT | The link has no artifact |

**Typical cause:** a validated-sounding narrative built on an untested assumption. The narrative is
written well, so it reads as established, and everything downstream anchors to it.

**On failure:**
1. Record the confidence level of each link and mark the inversion point.
2. The break is at the **downstream** artifact — it claimed more than its input supports — so it is
   INDEPENDENT with respect to the upstream artifact's correctness, but its content is still
   contingent on it.
3. Do not fix by rewriting the downstream artifact's tone. Either the upstream assumption gets
   tested, or the downstream artifact is restated at the confidence it actually has.
4. Route the test: `@products:discovery-lead` for a small pre-build assumption test,
   `@products:jobs-analyst` for causal switching evidence,
   `@products:pricing-strategist` for willingness to pay,
   `@products:experimentation-lead` for live-traffic design.

---

## 6. Orphan artifact

**Test:** Does every squad artifact trace to a named problem in the current strategy?

- [ ] Every artifact maps to a chain link for this initiative
- [ ] Every artifact traces to a problem the current strategy names
- [ ] No artifact is being cited by other artifacts while its own strategic basis has been retired
- [ ] Artifacts superseded by a newer revision are marked superseded, not left ambiguous

**Typical cause:** work that outlived the strategy revision that made it irrelevant. Nobody deletes
it, so it keeps getting cited.

**On failure:**
1. For each orphan, decide: superseded (mark and archive), still valid under a different
   initiative (move and record), or the strategy dropped a problem it should not have (route the
   question to `@products:product-strategist`).
2. **Check who cites the orphan before archiving it.** An orphan that other current artifacts
   depend on is not merely stale — it is a load-bearing stale artifact, and archiving it silently
   removes the basis of live work.
3. Never delete an artifact as part of this checklist. Mark, record and route.

---

## 7. Classification — INDEPENDENT or INHERITED

For every failure above, apply the **inheritance test**:

> If the nearest upstream break were repaired, would this break disappear on its own?

- [ ] Every failure has been run through the inheritance test
- [ ] Every INHERITED failure names the upstream break it inherits from
- [ ] Every INDEPENDENT failure states why the upstream repair would not resolve it

| Answer | Class | Consequence |
|---|---|---|
| Yes | **INHERITED** | The artifact is a correct answer to a broken input. Do not repair it now — it will be rewritten again when the upstream repair lands. |
| No | **INDEPENDENT** | The artifact is wrong on its own terms. Parallel-safe; start immediately. |

Misclassifying costs in both directions: an INHERITED break repaired early burns a specialist cycle
twice, and an INDEPENDENT break parked behind an unrelated repair stays broken for no reason.

---

## 8. Repair direction

- [ ] The direction test has been run, and the verdict is recorded
- [ ] Where the verdict is UPSTREAM REPAIR, no downstream artifact was rewritten to match the
      stale upstream artifact
- [ ] Where the verdict is UNDECIDABLE, no direction was chosen by preference

| Signal | Points to |
|---|---|
| Downstream artifact is newer and cites evidence gathered after the upstream artifact was written | Upstream may be stale |
| Several downstream artifacts *independently* converge on a different segment or job than upstream | Upstream may be stale |
| Upstream was revised most recently; downstream artifacts predate the revision | Downstream drifted (default) |
| Upstream carries named checkable evidence; downstream carries assertion | Downstream drifted (default) |
| A decision was taken outside the artifacts and never written down | Upstream is stale AND unwritten — that is the finding |

| Verdict | What happens |
|---|---|
| **DOWNSTREAM REPAIR** (default) | Upstream stands. Repair downstream links in chain order. |
| **UPSTREAM REPAIR** (inverted) | The upstream artifact is the stale one. Route the upstream link to its owner as a **decision**, not a correction: "three downstream artifacts assume X; the strategy names Y; which is in force this cycle?" Hold every downstream artifact — neither repaired nor accepted — until that answer exists. |
| **UNDECIDABLE** | Record both readings, name the decision, route it to the upstream owner to be made and written down. An audit that guesses the direction manufactures a strategy. |

The verdict can differ per break. A stale strategy and an independently broken metric coexist
comfortably; classify each break on its own.

---

## Verdict — Repair Order (not a grade)

This gate does not score. A percentage would rank a broken segment link and a mislabelled metric as
equally weighted, which is precisely the judgement the audit exists to make. Emit this instead:

**Chain status:** COHERENT | BREAKS UNREPAIRED | NOT AUDITABLE (no baseline / single artifact)

**Repair order**

| # | Link | Break (which check failed) | Class | Direction | Owner | Blocked by | Start |
|---|---|---|---|---|---|---|---|
| 1 | | | | | `@products:{agent-id}` | — | now |
| 2 | | | INHERITED | | `@products:{agent-id}` | #1 | after #1 |
| P1 | | | INDEPENDENT | | `@products:{agent-id}` | — | now, parallel |

**Suspect links** (downstream of the earliest break, own check passed): {list}
**Contested links** (routed to `*conflict-resolve`): {list}
**Missing links** (no artifact): {list, with owner}
**Orphans** (disposition per artifact): {list}
**Ethical concerns raised by any artifact:** stated here, before the repair order is acted on

**Rules that bind the verdict**

1. One owner per repair. Never broadcast a repair to several specialists.
2. INHERITED repairs never start before the break they inherit from is closed.
3. INDEPENDENT repairs start immediately and are marked parallel-safe.
4. No contradiction is reported as consistency. If a break is real, it appears in the table.
5. The audit repairs nothing itself and produces no strategy, positioning, pricing, job, discovery
   or experiment content.
6. No routing here overrides Agent Authority: git push, PRs, MCP and CI/CD are `@devops`
   exclusively; story creation is `@sm`; story validation and backlog are `@po`; epic framing and
   PRD authoring are `@pm`.

---

## Method attribution

`@products-chief` (Helm) carries no external product methodology. The coherence chain, the six
checks, the inheritance test and the repair-direction test are original AEXOS orchestration
mechanics and are not attributed to any author.

The published methods live in the specialists this checklist routes repairs to and are attributed
in their own agent files: Marty Cagan (product-strategist), Teresa Torres (discovery-lead),
April Dunford (positioning-lead), Clayton M. Christensen with Taddy Hall, Karen Dillon and
David S. Duncan (jobs-analyst), Madhavan Ramanujam and Georg Tacke (pricing-strategist), and
Ron Kohavi, Diane Tang and Ya Xu (experimentation-lead).

## Related

- Task: `squads/products/tasks/coherence-review.md`
- Task: `squads/products/tasks/resolve-specialist-conflict.md`
- Agent: `squads/products/agents/products-chief.md`
- Squad manifest: `squads/products/squad.yaml`
- Routing data: `squads/products/data/product-squad-routing.yaml`
- Brief template: `squads/products/templates/product-brief-tmpl.yaml`
