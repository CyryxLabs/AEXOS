---
task: Triage Product Request
responsavel: "@products-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - request: The product question or problem as the requester stated it, verbatim (required)
  - requester: Who is asking and what decision they need to make (required)
  - existing_artifacts: Paths to squad artifacts already produced for this initiative (optional, default: none)
  - deadline: When the decision must be made (optional, default: none)
  - output_dir: Directory for the triage record (optional, default: docs/product/triage/)
Saida: |
  - triage_record: Versioned markdown file with restatement, reframe, named owner, excluded near misses, short answer, and handoff brief
  - owner: Exactly one squad agent id that owns the request
  - sequence: Ordered specialist list when more than one discipline is genuinely required, with the input each one needs
  - boundary_verdict: Whether the request stays in the squad or routes to an AEXOS core agent
Checklist:
  - "[ ] Capture the request verbatim and name the decision it must unblock"
  - "[ ] Restate the request in the owning discipline's vocabulary"
  - "[ ] Apply the reframing table and confirm the reframe with the requester out loud"
  - "[ ] Check the boundary: squad discipline or core agent"
  - "[ ] Name exactly one owner and list the near-miss disciplines excluded, with the reason"
  - "[ ] Give a short usable answer before the handoff"
  - "[ ] Sequence multiple specialists by dependency when more than one is required"
  - "[ ] Write the triage record to the repository"
  - "[ ] State the handoff brief so the specialist does not re-elicit context"
---

# *diagnose — Triage a Product Request

Materializes `@products-chief *diagnose {request}`.

## Purpose

Route a product request to the single discipline that owns it, before any content is produced.
The most common product failure is not a weak method — it is the right question answered by the
wrong discipline. This task produces a routing decision, a short usable answer, and a written
handoff brief, so the receiving specialist starts with context instead of re-eliciting it.

This task does not produce strategy, positioning, pricing, jobs, discovery or experiment
artifacts. Those belong to the specialists it routes to.

## Preconditions

1. The request exists as a sentence the requester actually said or wrote. If it only exists as a
   summary, ask for the original wording before continuing.
2. The requester can name the decision the answer must unblock. If they cannot, run step 1
   elicitation until they can, or record `decision: undefined` and stop — an undefined decision
   cannot be routed.
3. `squads/products/squad.yaml` is readable. It carries the agent registry and the handoff
   matrix used in steps 4 and 7.

## Procedure

### Step 1 — Capture

Record, without editing:

- `request` verbatim
- `requester` and the decision at stake
- `deadline`, if any
- `existing_artifacts` — every squad artifact already written for this initiative

If `existing_artifacts` contains two or more artifacts for the same initiative, note it and check
them against the coherence chain in step 7 before routing. A break upstream invalidates every
link downstream of it, so the repair is routed before the request is.

### Step 2 — Restate

Rewrite the request in the vocabulary of the discipline that appears to own it. Show the
restatement to the requester. Do not proceed on a restatement they have not seen.

### Step 3 — Reframe

Check the request against this table. The stated question is frequently not the owned question.

| Stated | Usually owned by | Why |
|---|---|---|
| "What should we charge?" | positioning-lead, then pricing-strategist | A price is only defensible against a named frame of reference |
| "Which feature next?" | product-strategist, then discovery-lead | Feature order is a symptom of an unmade focus decision |
| "Users are not adopting it" | discovery-lead, plus experimentation-lead to quantify | Value or usability risk; customer stories are cheaper than instrumentation |
| "We need a better launch message" | positioning-lead, plus jobs-analyst if the audience is unclear | Messaging is downstream of positioning |
| "Enterprise or self-serve?" | product-strategist, with pricing-strategist on model impact | A segment and focus decision, not a feature decision |
| "Churn is rising" | jobs-analyst for the cause, experimentation-lead for the magnitude | Churn is a switching event in reverse |

State the reframe out loud and confirm it. A silent reframe answers a question the requester did
not ask.

### Step 4 — Boundary check

Decide whether the request is still a product-discipline question.

| The request is about | Verdict |
|---|---|
| Which problem, for whom, why now, with what evidence | Squad — product-strategist |
| How customers behave and why | Squad — discovery-lead or jobs-analyst |
| How the market perceives it, what it costs | Squad — positioning-lead or pricing-strategist |
| How we measure the change | Squad — experimentation-lead |
| Epic framing, PRD, requirements | Outside — @pm |
| Story drafting | Outside — @sm |
| Story validation, backlog priority | Outside — @po |
| Implementation, tests | Outside — @dev, @qa |
| Deep market or competitor research beyond a squad cycle | Outside — @analyst |
| Interface design and flows | Outside — @ux-design-expert |
| System design, feasibility spike | Outside — @architect |
| Git push, PRs, MCP, CI/CD | Outside — @devops, exclusive, no exceptions |

If the verdict is Outside, record it, name the core agent, and stop routing inside the squad.

### Step 5 — Name one owner

Select exactly one owner from: `product-strategist`, `discovery-lead`, `positioning-lead`,
`jobs-analyst`, `pricing-strategist`, `experimentation-lead`.

Then list the near-miss disciplines and the reason each was excluded. The exclusion reasons are
what make the routing checkable — record them even when they feel obvious.

Do not broadcast the request to several specialists. Four partial answers built on four unstated
assumptions is not corroboration.

### Step 6 — Short usable answer

Give the two-minute version: enough to unblock the requester today, explicitly labelled as the
non-defensible version. State what the specialist adds that this answer lacks.

If the request is a definitional, navigational or boundary question, this answer is the whole
output and no routing is needed. Record it and skip to step 8.

### Step 7 — Sequence, if more than one discipline is genuinely required

Order the specialists by what each one needs as an input, not by preference:

```text
segment -> job -> outcome -> solution -> narrative -> price -> measure
```

For each step in the sequence, record the specialist, the input they need, and what would be
wasted if they ran earlier. Positioning built before the job is understood gets rewritten.
Pricing set before the segment is fixed gets rewritten.

### Step 8 — Write the triage record

Create `output_dir` if it does not exist. Write `triage-{slug}-{YYYY-MM-DD}.md`:

```markdown
# Triage — {slug}

**Date:** {YYYY-MM-DD}
**Requester:** {requester}
**Decision at stake:** {decision}
**Deadline:** {deadline or "none stated"}

## Request, verbatim
> {request}

## Restated
{restatement in the owning discipline's vocabulary}

## Reframe
{the reframe, or "none — the stated question is the owned question"}
Confirmed with requester: yes | no

## Boundary verdict
{Squad | Outside — @agent}

## Owner
**{agent-id}**

Near misses excluded:
| Discipline | Why not |
|---|---|
| {agent-id} | {reason} |

## Short answer (non-defensible, valid until the specialist replies)
{answer}

## Sequence (if applicable)
| # | Specialist | Input they need | Wasted if run earlier |
|---|---|---|---|

## Handoff brief
{context, artifacts already written, open questions, what the specialist must not re-elicit}
```

### Step 9 — Hand off

Activate the named owner and pass the path to the triage record. Do not paraphrase the brief into
chat — the record is the handoff.

## Acceptance Criteria

- The request is stored verbatim, not paraphrased.
- The restatement was shown to the requester and confirmed before routing.
- Exactly one owner is named, and the near-miss disciplines are listed with exclusion reasons.
- A short usable answer was given before the handoff, and labelled as the non-defensible version.
- Multi-specialist work is ordered by dependency, with the input each step needs stated.
- The boundary verdict is explicit — squad or a named core agent.
- The triage record exists in the repository as a versioned markdown file.
- No strategy, positioning, pricing, job, discovery or experiment artifact was produced by this
  task.
- No routing decision overrides Agent Authority: git push, PRs, MCP and CI/CD go to `@devops`;
  story creation goes to `@sm`; story validation and backlog go to `@po`.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` | Vision, strategy, the four risks, team model, objectives, product/market fit, segment or focus decisions |
| `@discovery-lead` | Opportunity solution trees, interview cadence, assumption mapping and tests |
| `@positioning-lead` | Competitive alternatives, unique attributes, category and frame of reference |
| `@jobs-analyst` | The causal job, switching interviews, forces of progress, job-defined competitive set |
| `@pricing-strategist` | Willingness to pay, value metric, packaging, price level, monetization model |
| `@experimentation-lead` | Hypothesis and metric definition, power, guardrails, readout |
| `@pm` | The problem is chosen and evidenced and now needs epic framing and a PRD |
| `@po` | Evidence changed and the backlog needs reprioritizing |
| `@sm` | Epic framing is complete and stories need drafting |
| `@analyst` | Deep market or competitive research beyond a squad cycle |
| `@ux-design-expert` | The request has become interface design or interaction detail |
| `@architect` | The request has become system design or needs a feasibility spike |
| `@devops` | Git push, PRs, MCP, CI/CD — exclusive authority |

## Method attribution

`@products-chief` (Helm) carries no external product methodology. This task is an original
orchestration routine. The published methods live in the specialists it routes to and are
attributed in their own tasks: Marty Cagan (product-strategist), Teresa Torres (discovery-lead),
April Dunford (positioning-lead), Clayton M. Christensen with Taddy Hall, Karen Dillon and
David S. Duncan (jobs-analyst), Madhavan Ramanujam and Georg Tacke (pricing-strategist), and
Ron Kohavi, Diane Tang and Ya Xu (experimentation-lead).

## Related

- Agent: `squads/products/agents/products-chief.md`
- Squad registry: `squads/products/squad.yaml`
- Elicitation techniques: `.aexos-core/development/tasks/advanced-elicitation.md`
