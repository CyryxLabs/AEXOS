---
task: Diagnose And Route Marketing Request
responsavel: "@marketing-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - request: The marketing request, recorded in the requester's own words (required)
  - initiative: Name of the initiative or campaign the request belongs to (optional)
  - position_artifact: Path to the current position owned by @products:positioning-lead (optional)
  - existing_artifacts: Paths to squad artifacts already produced for this initiative (optional)
  - requester: Who is asking and what decision they must take (optional)
Saida: |
  - verbatim_record: The request as stated, captured before any reframe
  - restatement: The request restated in the owning discipline's vocabulary, confirmed aloud
  - owner: Exactly one owning specialist id, or one named out-of-squad owner
  - boundary_verdict: IN-SQUAD or OUT-OF-SQUAD, with the receiving agent named
  - dependency_verdict: PROCEED or BLOCKED-ON-POSITION, with the blocking dependency named
  - two_minute_answer: Short usable answer, explicitly labelled usable rather than defensible
  - handoff_brief: Path to the handoff record written under .aexos/handoffs/
Checklist:
  - "[ ] Record the request verbatim before any reframe is applied"
  - "[ ] Restate the request in the owning discipline's vocabulary and confirm the restatement aloud"
  - "[ ] Check the request against the reframing patterns in the agent file"
  - "[ ] Match keywords against the routing matrix AND against the not_theirs lists of the near misses"
  - "[ ] Decide the boundary: marketing, Products squad, or AEXOS core agent"
  - "[ ] Check whether a position artifact exists before allowing downstream squad work"
  - "[ ] Name exactly one owner; do not broadcast to several specialists"
  - "[ ] Give the two-minute answer, labelled as the usable version"
  - "[ ] Escalate to squads/marketing/tasks/ sequencing when several specialists are genuinely required"
  - "[ ] Write the handoff brief to the repository, not only to the transcript"
---

# *diagnose

Materializes the `*diagnose` command of `@marketing-chief` (Beacon), the Tier 0 entry point of the
Marketing Squad. Triages an incoming marketing request, names the single discipline that owns it,
gives a short usable answer, and routes with a written handoff brief.

## Purpose

The most common failure in this squad is not a weak method. It is the right question answered by the
wrong discipline, or the right answer given on the wrong horizon. This task exists to make routing
accuracy an explicit, auditable step instead of an implicit one.

A confident answer produced by the wrong discipline is worse than a routing decision, because it is
acted on before anyone notices which method was not applied.

## Pre-conditions

| Condition | Blocker | How to check |
|-----------|---------|--------------|
| A request exists in the requester's own words | yes | The requester has stated it, or it is quoted from a written source |
| `squads/marketing/squad.yaml` is readable | yes | Agent ids, tiers and the handoff matrix come from here |
| `squads/marketing/agents/marketing-chief.md` is readable | yes | Contains `triage.routing_matrix`, `triage.reframing_patterns` and `triage.escalation_rules` |
| The four specialist agent files are readable | no | Needed only to verify a NOT-list when routing is contested |

If the request cannot be stated, this task does not start. Ask the requester what decision they are
trying to take, and use that as the request.

## Procedure

### Step 1 — Record verbatim

Write the request exactly as stated, before any interpretation. A silent reframe answers a different
question than the one asked, and the difference is invisible later if the original wording is gone.

### Step 2 — Restate in the owning discipline's vocabulary

Produce a one-sentence restatement using the vocabulary of the discipline you believe owns it. State
the restatement out loud and confirm it with the requester. If they reject the restatement, the
routing was wrong; restate again before continuing.

### Step 3 — Apply the reframing check

Consult `triage.reframing_patterns` in `squads/marketing/agents/marketing-chief.md`. The stated
question is frequently not the owned question. Typical inversions recorded there:

- "How much should we spend" is usually a brand question before it is a budget question.
- "Our blog gets traffic but no results" is usually a distribution or a definition failure.
- "Which channel should we double down on" usually rests on an attribution allocation being read as
  a causal claim.
- "Awareness is high but sales are flat" is usually the recognition-versus-retrieval distinction.

If a pattern matches, name it explicitly in the output. Do not apply it silently.

### Step 4 — Match the routing matrix, then the NOT-lists

Match the restated request against `triage.routing_matrix` keywords:

| Domain | Owner | Persona | Method source |
|--------|-------|---------|---------------|
| Brand | `brand-lead` | Salience | Byron Sharp, *How Brands Grow* (2010) |
| Demand | `demand-lead` | Cadence | Les Binet & Peter Field, *The Long and the Short of It* (IPA, 2013) |
| Content | `content-lead` | Quill | Editorial discipline applied to marketing — a practice, not a single published work |
| Analytics | `analytics-lead` | Cipher | Avinash Kaushik, *Web Analytics 2.0* (2009) |

Then read the `not_theirs` list of every near miss. The NOT-lists are what make routing accurate; the
keyword match alone routinely picks the wrong owner when a request sits between two disciplines.

### Step 5 — Decide the boundary

Before routing inside the squad, confirm the request is still a marketing request:

- Market category, competitive alternatives, target segment → `@products:positioning-lead`. This
  squad consumes positioning; it does not define it.
- Price, packaging, willingness to pay → `@products:pricing-strategist`.
- Product-surface experiment statistics → `@products:experimentation-lead`.
- Epic framing and PRD → `@pm`. Story drafting → `@sm`. Story validation and backlog → `@po`.
- Implementation → `@dev`. Quality gates → `@qa`. Git push, PRs, MCP and CI/CD → `@devops`
  (exclusive authority, no exceptions).
- Deep market or competitor research → `@analyst`. Interface copy and UX writing →
  `@ux-design-expert`. Schema, pipelines and instrumentation queries → `@data-engineer`.

Record the verdict as IN-SQUAD or OUT-OF-SQUAD with the receiving agent named.

### Step 6 — Check the position dependency

Ask whether a current position artifact exists at `@products:positioning-lead`
(`squads/products/agents/positioning-lead.md` owns it). If none exists, record
`dependency_verdict: BLOCKED-ON-POSITION`.

What may still proceed while blocked: content audit, archive review, metric audit, instrumentation
gap analysis. What may not: beats, category entry points, the reach specification, the split, and any
measurement model whose objectives come from a position that does not exist. Those get rewritten when
the position lands, and the rewrite costs more than the wait.

### Step 7 — Decide depth: answer or route

- Navigational or definitional (who owns what, how the squad works, which method source a specialist
  rests on) → answer directly.
- Requires applying a method or producing an artifact → route.
- Unsure → route, and say why the specialist is better placed.

### Step 8 — Give the two-minute answer

Give enough of an answer to be useful now, and label it explicitly as the usable version rather than
the defensible one. State the practical difference: the usable version unblocks a cheap reversible
decision; anything that will be built on — a budget, a year of beats, a measurement model — needs the
specialist.

### Step 9 — Route to exactly one owner

Name one owner. Do not broadcast. Broadcasting produces four competent partial answers, each quietly
assuming a different audience and a different horizon, and no decision.

If several specialists are genuinely required, do not route here — run the squad's sequencing
procedure (`*sequence`) and order them by dependency along the coherence chain: position → brand
model → demand plan → content → measurement.

### Step 10 — Write the handoff brief

Write a handoff record so the specialist starts with context instead of re-eliciting it. Use the
structure in `.aexos-core/development/templates/agent-handoff-tmpl.yaml` and write it to
`.aexos/handoffs/`. The brief carries: verbatim request, confirmed restatement, owner, boundary
verdict, dependency verdict, the two-minute answer given, and the artifacts already in existence.

A routing decision that lives only in a chat transcript did not happen (Constitution Article I —
CLI First).

## Escalation

| Trigger | Action |
|---------|--------|
| Specialist cannot complete the request within its discipline | Return here for re-routing |
| Two specialists produce contradictory recommendations | Run `*conflict-resolve`; establish the horizon each is reasoning over before treating it as a fact dispute |
| A measurable proxy has silently replaced an objective | Run `*proxy-escalation`; never fix at the dashboard alone, and never retire the proxy before the real measurement runs |
| Request depends on a position that does not exist | Route to `@products:positioning-lead` before any squad work proceeds |
| An invented or unverifiable citation is found in a squad artifact | BLOCK the artifact until the source is produced or the claim removed; attribution defects are critical, not stylistic |
| Ethical concern raised by any specialist | Surface it explicitly before the decision proceeds, never as a footnote |

## Acceptance criteria

- [ ] The verbatim request is recorded before any reframe appears in the output
- [ ] The restatement was stated aloud and confirmed by the requester
- [ ] Exactly one owner is named; no request is broadcast to several specialists
- [ ] The NOT-lists of the near misses were checked, and the check is visible in the output
- [ ] The boundary verdict names the receiving agent when the request has left the marketing surface
- [ ] The dependency verdict states whether a position artifact exists
- [ ] The two-minute answer is explicitly labelled as usable rather than defensible
- [ ] The routed specialist accepts the request as theirs without re-routing
- [ ] The handoff brief exists in the repository and the specialist does not re-elicit basics
- [ ] No deep domain answer was produced under a method this agent does not carry

## Handoff

| To | When |
|----|------|
| `@brand-lead` | Penetration, mental and physical availability, category entry points, distinctive assets, reach continuity, rebrand risk |
| `@demand-lead` | Budget, brand-versus-activation split, share of voice, effect windows, short-termism, cut impact, phasing |
| `@content-lead` | Beats, commissioning briefs, calendar and cadence, format, distribution, editorial standards, archive |
| `@analytics-lead` | Measurement model, actionable metrics, segmentation, attribution limits, incrementality, readouts |
| `@products:positioning-lead` | The position does not exist, is stale, or is contested — an input to this squad, never an output of it |
| `@products:pricing-strategist` | Price and packaging |
| `@pm` | The squad's involvement is complete and the evidenced plan is ready for epic framing |

The squad stops at the evidenced marketing plan. It does not write PRDs, does not draft stories, does
not implement, does not gate quality, and does not push.

## Attribution note

This task carries no marketing methodology of its own. The orchestrator role is original to AEXOS. The
published methods live in the specialists, each attributed to its author — and one of them,
`content-lead`, honestly declares a discipline rather than a work, because no canonical work founds
that role. An invented citation would be worse than none, and it would make the whole squad's
attribution unauditable.

## Related

- **Agent:** `squads/marketing/agents/marketing-chief.md` (Beacon)
- **Manifest:** `squads/marketing/squad.yaml`
- **Handoff template:** `.aexos-core/development/templates/agent-handoff-tmpl.yaml`
- **Task format:** `.aexos-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md`
- **Constitution:** `.aexos-core/constitution.md` (Article I — CLI First; Article IV — No Invention)
