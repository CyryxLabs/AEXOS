---
task: Walk The Process And Register Waste
owner: "@lean-lead"
owner_type: agent
atomic_layer: task
Input: |
  - process: The process to be walked, from trigger to completion (required)
  - occurrences: Real instances to observe or reconstruct from records, not recollection (required; three or more preferred)
  - documented_process: The written or diagrammed version of the process, if one exists (optional)
  - timing_source: Where step timings come from — ticket history, logs, direct observation (required)
  - known_problems: Recurring problems already suspected in this process (optional)
Output: |
  - waste_register: Every waste named by category, with the count or measured time behind it
  - value_time_ratio: Elapsed time split into value-adding, necessary non-value-adding, and pure waste
  - largest_block: The single largest non-value block, named with its owner
  - divergence_findings: Where the actual process differs from the documented one
  - countermeasure_candidates: Conditions to remove, ordered by preference, each with the check that would confirm it worked
  - routed_findings: Findings that belong to @devops, @qa, @flow-lead or @reliability-lead, with the reason for each
  - waste_document: Versioned markdown file in the repository
Checklist:
  - "[ ] Observe the actual process; do not analyse the diagram"
  - "[ ] Record where the actual process diverges from the documented one"
  - "[ ] Time each step from records or observation, never from recollection"
  - "[ ] Split elapsed time into value-adding, necessary non-value-adding, and pure waste"
  - "[ ] Name every waste by category; reject 'inefficiency' as a classification"
  - "[ ] Check for overproduction first — it conceals the other wastes"
  - "[ ] Identify the single largest non-value block and name who owns it"
  - "[ ] Propose countermeasures at the condition, preferring removal over an added guard"
  - "[ ] State in advance the evidence that would confirm or reject each countermeasure, and by when"
  - "[ ] Route release, pipeline and build findings to @devops; verification findings to @qa; queue findings to @flow-lead"
  - "[ ] Confirm nothing was halted, configured, merged, released or pushed by this task"
  - "[ ] Persist the waste register as a versioned file in the repository"
---

# Walk The Process And Register Waste

Materializes `@lean-lead` `*waste-walk`, with `*value-time` as its arithmetic and
`*overproduction-check` as its first pass.

## Purpose

Go and see what actually happens, name each waste by its category, and report how much of the
elapsed time between a need and its delivery is not work. The improvement target is the waiting,
the handoffs and the rework — not the part where the work happens.

## Boundary — read before executing

This task **defines method and finding**. It operates nothing.

| This task produces | Who does the rest |
|---|---|
| Waste register and value-time ratio | Any implementation → `@dev` |
| Five-why analysis and countermeasure design | Pipeline, build, merge and release changes → **`@devops`, exclusive** |
| A stop-the-line **policy**, if one is written | The actual stop, block or gate → **`@devops`, exclusive** |
| Standard work documents | Verification and gate changes → `@qa` |
| Just-in-time and batch recommendations | Release cadence decisions → **`@devops`** |

The stop rule is the sharpest edge of this boundary. Writing *"the line stops when the build
breaks"* is method. Stopping it is an operation, and it belongs to `@devops`. That separation is
deliberate: it keeps a stop reviewable and accountable rather than instantaneous and anonymous.

Where a finding implies an action on infrastructure, this task produces the **instruction** and
names **@devops** as the executor.

## Pre-conditions

| # | Condition | Blocking | How to check |
|---|---|---|---|
| 1 | The process has an agreed trigger and an agreed completion | Yes | Without both ends, elapsed time is unmeasurable |
| 2 | Real occurrences are available to observe or reconstruct | Yes | Ticket history, logs, or direct observation |
| 3 | A timing source exists that is not memory | Yes | Constitution Article IV — waste asserted from a diagram is a guess |
| 4 | People who actually perform the work are reachable | No | The documented, remembered and actual processes are three different things |

## Procedure

### Step 1 — Go and see

Observe the process as it is actually performed, across the available occurrences. Record the
sequence that happened, not the sequence that is documented.

The most common discovery is an escalation path, exception route or approval that exists in the
documentation and has been used zero times, alongside an undocumented workaround everyone uses
daily. Neither shows up in a discussion about the process; both show up in twenty minutes of
watching it. **The gap between the documented and the actual process is usually the finding.**

### Step 2 — Time each step

For each step record the elapsed time from records, not recollection. Include every waiting state
as its own row — waiting states are where most of the elapsed time lives.

### Step 3 — Separate the time

Split the total elapsed time into three:

| Class | Meaning |
|---|---|
| Value-adding | The customer would recognise this as the thing they asked for |
| Necessary non-value-adding | Required by a constraint, a regulation or a real risk, but not itself the work |
| Pure waste | Neither |

Report the value-adding fraction as a ratio. It is usually much smaller than anyone expects, and
the ratio is what makes the finding arguable rather than anecdotal.

### Step 4 — Name each waste by category

[SOURCE: Ohno, *Toyota Production System*.] "Inefficiency" is not a category and cannot be attacked.
A named waste has a known countermeasure.

| Waste | Looks like here |
|---|---|
| Overproduction | Features built ahead of confirmed need; work produced faster than it can be delivered |
| Waiting | Work idle between steps; people waiting for approval, input or a window |
| Transport | Work or context moved between people, teams, boards and systems, losing fidelity at each hop |
| Over-processing | More precision, detail, approval or polish than the need requires |
| Inventory | Started and unfinished work: open branches, unreleased changes, drafted-but-unstarted plans |
| Motion | Effort locating information, switching context, reassembling what was already known |
| Defects | Anything requiring correction after it was called done, and its coordination cost |

**Check overproduction first.** [SOURCE: Ohno.] It is identified in the source as the fundamental
waste, because it conceals all the others: work produced ahead of need creates inventory, handling
and rework, and looks like output the entire time it is costing you.

If something fits none of the seven, examine whether it is value-adding or whether the process
boundary was drawn wrong.

### Step 5 — Name the largest single block

Identify the largest non-value block and say who owns it. Very often it is a release window or an
approval cadence — in which case it is `@devops` territory to change, and quite possibly the system
constraint, which is `@flow-lead`'s question rather than this one's. Report it; do not change it,
and do not claim it.

### Step 6 — Root the recurring problems

For any problem that returns, ask why until the answer is a **condition that can be changed**.
[SOURCE: Ohno — the five-why practice, whose worked example in the book walks a stopped machine back
from a blown fuse to a missing filter on a lubricating pump.]

| Answer looks like | Do this |
|---|---|
| A symptom | Keep asking |
| A person, or their attention | Back up one level; ask what made it possible and what made it consequential |
| A changeable condition | Stop — act here |
| Still symptoms at five | The problem statement was too broad; split it |
| A condition at two | Stop at two; five is a habit, not a quota |

Stop the moment an answer becomes a name. "Because someone forgot" is where the analysis went
wrong, not where it ended.

### Step 7 — Design countermeasures, in preference order

1. Remove the condition entirely — best; removes the failure mode and a step
2. Make the error impossible or immediately self-evident — jidoka applied
3. Make the process stop itself at detection — the stop rule is authored here; **the switch is `@devops`**
4. Add a signal that surfaces the trend before the failure
5. Add a human check — last resort, and state explicitly what the added step costs

Never: remove verification and report it as waste removed. A process made cheaper by deleting a
quality step has moved the cost downstream where it is larger and later, not removed it. That is a
redesign conversation with `@qa`, whose gate it is.

An improvement that adds a step is suspect. Adding a check, a form, a review or a meeting is the
most common way a process becomes slower without becoming better.

### Step 8 — Attach a check

State, in advance and with a date, the evidence that would confirm or reject each countermeasure.
Size each change so it produces evidence within one cycle. A change made this week can be checked
next week; a programme planned for next quarter produces a plan.

### Step 9 — Route and persist

Route release, pipeline, build and merge findings to `@devops`; verification findings to `@qa`;
queue-location questions to `@flow-lead`; technical toil to `@reliability-lead`. Write the register
to a versioned file in the repository — a standard that lives only in someone's habit cannot be
improved because it cannot be read (Constitution Article I — CLI First).

## Acceptance criteria

- [ ] The actual process was observed, and its divergence from the documented process is recorded
- [ ] Every waste is named by category, with a count or a measured time behind it
- [ ] Overproduction was checked first and explicitly
- [ ] Value-adding time is separated from the rest and reported as a proportion
- [ ] The largest single non-value block is named, with its owner
- [ ] Five-why chains terminate on changeable conditions, never on a person
- [ ] Countermeasures act on the condition; any added step is justified against removal
- [ ] No countermeasure removes verification and calls the result waste reduction
- [ ] Any stop rule written here states who may call it, the trigger, what happens during it, what resumes it, and the agent executing each mechanical consequence
- [ ] The evidence that would confirm or reject each countermeasure is stated in advance with a date
- [ ] Nothing was halted, configured, merged, released or pushed by this task
- [ ] Findings touching build or release are routed to `@devops`; verification findings to `@qa`
- [ ] The register is a versioned file in the repository

## Handoff

| To | When |
|---|---|
| `@ops:ops-chief` | The request was not a waste question, or a countermeasure conflicts with a reliability or flow decision and needs arbitration |
| `@ops:flow-lead` | The largest waste is a queue rather than a step — queue location is a constraint question, and improving a non-constraint changes nothing |
| `@ops:reliability-lead` | The waste is technical toil to be tested against the six-part definition, or a countermeasure needs a signal and a threshold |
| `@ops:incident-lead` | A recurring defect is severe enough to warrant incident analysis, or a postmortem's contributing factors need waste-level countermeasures |
| `@qa` | A countermeasure would change verification — gate scope, test strategy, review requirements |
| `@dev` | A countermeasure requires implementation |
| `@devops` | Every pipeline, build, merge-block, release and push action — **exclusive authority, no exceptions**, including every mechanical consequence of a stop rule authored here |
| `@po` | Removing waste changes agreed scope or acceptance expectations |
| `@sm` | Standard work or a stop rule becomes a team working agreement |

## Attribution

The framework applied here is the Toyota Production System as documented by Taiichi Ohno in
*Toyota Production System: Beyond Large-Scale Production*, **published in Japanese in 1978 and in
English translation in 1988**.

`@lean-lead` applies that framework with attribution. It is **not** Taiichi Ohno and does not speak
as him; the persona name refers to the practice of continuous improvement, not to any author.

Positions belonging to the **broader lean tradition** rather than to Ohno's book — value stream
mapping notation, the muda/mura/muri triad as commonly taught, later lean-software adaptations — are
labelled as tradition and are **not** attributed to Ohno. The source is a manufacturing account and
this task does not pretend otherwise: takt time, physical layout and machine changeover are not
applied here.

## Related

- **Agent:** `squads/ops/agents/lean-lead.md` (Kaizen)
- **Elicitation during the process walk:** `.aexos-core/development/tasks/advanced-elicitation.md`
- **Document generation:** `.aexos-core/development/tasks/create-doc.md`
- **Existing-process discovery input:** `.aexos-core/development/tasks/analyze-brownfield.md`
- **Course correction when a countermeasure changes agreed scope:** `.aexos-core/development/tasks/correct-course.md`
- **Self-critique before a countermeasure is proposed:** `.aexos-core/development/checklists/self-critique-checklist.md`
- **Base document structure:** `.aexos-core/development/templates/aexos-doc-template.md`
