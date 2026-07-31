---
task: Run the Weekly Interview Cadence
owner: "@discovery-lead"
owner_type: agent
atomic_layer: task
Input: |
  - outcome: The measurable product outcome the touchpoints are in pursuit of (required)
  - trio: Named product manager, product designer and engineer, as people not roles (required)
  - recruiting_surface: The product surface or queue interviews can be recruited from (required)
  - weekly_slot: The recurring day and time already free in all three calendars (optional, default: elicit)
  - existing_snapshots: Path to snapshots already filed for this outcome (optional, default: none)
  - cadence_start: Date the eight-week window is measured from (optional, default: today)
  - output_dir: Directory for discovery artifacts (optional, default: docs/product/discovery/)
Output: |
  - cadence_plan: Versioned markdown file naming the trio, the recruiting automation, the weekly slot, the snapshot location and the synthesis ritual
  - recruiting_hook: The specific in-product trigger, its copy, its target volume per week and its owner
  - snapshot_index: The path convention and index file where every snapshot is filed
  - synthesis_ritual: The recurring session where snapshots become tree updates, with its attendees and duration
  - cadence_health: Eight-week read of touchpoints held, trio attendance, snapshots filed and gaps with their causes
  - next_touchpoint: Date, participant source and named trio attendees for the next interview
Checklist:
  - "[ ] Name the trio as three people, not three roles"
  - "[ ] Verify the outcome is live and influenceable before scheduling anything"
  - "[ ] Automate recruiting into the product rather than into a weekly negotiation"
  - "[ ] Fix one recurring weekly slot that survives a busy quarter"
  - "[ ] Define the snapshot storage path and the filing deadline"
  - "[ ] Define the synthesis ritual that turns snapshots into tree updates"
  - "[ ] Read cadence health over the last eight weeks and name the cause of every gap"
  - "[ ] Confirm every opportunity currently on the tree still traces to a filed snapshot"
  - "[ ] Write the cadence plan to the repository"
  - "[ ] Schedule the next touchpoint with a named attendee before closing the task"
---

# *plan-interviews — Establish and Sustain the Weekly Touchpoint

Materializes `@discovery-lead *plan-interviews`.

## Purpose

Turn customer contact from an occasional research activity into a weekly habit the product trio
owns. The habit definition applied here is Teresa Torres's: at a minimum, weekly touchpoints with
customers, by the team building the product, conducting small research activities in pursuit of a
desired product outcome. Each clause is load bearing, and this task installs each one as a
concrete mechanism — a named trio, a recruiting hook inside the product, a recurring slot, a
snapshot filing convention, and a synthesis ritual.

The failure this task exists to prevent is not "we forgot to interview". It is recruiting
friction. When scheduling each interview is a fresh negotiation, the cadence dies in the first
busy quarter, and by then the tree is stale and the next decision is made from feature requests.

This task does not conduct the interviews, write the interview guide, build the tree, or design
assumption tests. It builds the machine that keeps them fed.

## Preconditions

1. A live product outcome exists and the trio can move it through the product. Touchpoints "to
   learn about our users" with no outcome attached are curiosity, not discovery — they generate
   snapshots that fit nowhere on a tree. If the outcome is not influenceable by the trio, hand it
   to `@product-strategist` for decomposition and stop.
2. All three trio roles have a person's name against them. "Design will send someone" is not a
   trio.
3. At least one product surface, transaction point or support queue can carry a recruiting
   prompt. If literally none exists, run the first four interviews from a manual list and treat
   automating the hook as the first output of this task, not a precondition.
4. A repository location for discovery artifacts is agreed. A cadence whose snapshots live in a
   SaaS board is invisible to the framework — CLI First applies to discovery artifacts.

## Procedure

### Step 1 — Name the trio

Record three people: the product manager, the product designer, and one software engineer. Not
job titles, not a rotating pool.

The rule underneath this: the three roles that decide together must learn together. When one role
attends and reports back, the other two decide from a summary of a summary, and the opportunity
space collapses to whatever fit in the report.

Record for each person:

| Role | Person | Attends as | Backup |
|---|---|---|---|
| Product manager | | interviewer / note-taker | |
| Product designer | | interviewer / note-taker | |
| Engineer | | interviewer / note-taker | |

Minimum viable attendance is two of three live, with the third watching the recording within the
week. Below that, the touchpoint counts as held but the trio-participation metric in Step 7 takes
the hit — record it, do not hide it.

If a research function exists, define what it is for explicitly: the deep, scoped, bounded
studies. It does not absorb the weekly touchpoint. Both modes are legitimate; only the weekly one
sustains a live tree.

### Step 2 — Confirm the outcome the touchpoints serve

Restate the outcome in one line with its baseline and target, and place it at the head of the
cadence plan. Every interview in the cadence is conducted in pursuit of this number.

If the outcome changes mid-quarter, the cadence does not reset — the recruiting screener and the
guide change. Record the outcome version so snapshots can be read against the outcome that was
live when they were captured.

### Step 3 — Automate recruiting into the product

This is the step that decides whether the cadence survives. Choose a recruiting mechanism that
fires without anyone remembering to fire it.

| Mechanism | Fires when | Best for | Do not use when |
|---|---|---|---|
| In-product prompt | User reaches a state relevant to the outcome | Behaviour you can detect in the product | The relevant users never reach that state — you will only recruit the succeeding ones |
| Post-transaction hook | Immediately after a completed or abandoned key action | Fresh, recallable stories | The action is rare; volume will not sustain weekly |
| Support queue handoff | A ticket touches the target behaviour | Reaching frustrated users fast | Support volume is the only channel — the sample skews to the angry |
| Sales or onboarding call handoff | A prospect or new account describes the behaviour | Pre-purchase and first-run stories | The account manager filters who you may talk to |
| Standing customer advisory list | Scheduled from a maintained roster | Guaranteed volume as a floor | Used as the only channel — the same people learn to give you the answers they think you want |

Choose one primary and one fallback. Then write down, concretely:

- The trigger condition, in terms the product can evaluate.
- The prompt copy, and what it offers in exchange.
- The target volume: how many accepts per week you need to hold one interview per week.
  Over-recruit, because acceptance and attendance both leak.
- Who owns the hook when it breaks — this is a product surface, so a broken hook is a bug, and it
  is silent.
- The screener: the minimum criteria a participant must meet to be relevant to the outcome.

If the recruiting hook requires product code, that is implementation work — hand it to `@pm` for
framing and `@sm` for story drafting. `@discovery-lead` specifies the hook, it does not build it.

### Step 4 — Fix the weekly slot

Place one recurring slot in all three calendars. Constraints:

- Fifteen to thirty minutes of customer time is enough for one story. Do not schedule an hour and
  then cancel it because nobody has an hour.
- Same day, same time, every week. A slot that moves each week is a negotiation each week.
- The slot exists whether or not a participant confirmed. When nobody shows, the trio uses the
  slot to synthesize the previous snapshots. The slot never gets returned to the calendar, because
  a returned slot does not come back.

Record the slot, the timezone, and the standing calendar invite owner.

### Step 5 — Define snapshot storage

One interview, one snapshot. The learning evaporates otherwise, and an opportunity with no
snapshot behind it must be deleted from the tree under Constitution Article IV — No Invention.

Record:

- The path convention, e.g. `{output_dir}/snapshots/snapshot-{NN}-{YYYY-MM-DD}-{participant-slug}.md`.
- The template used: `squads/products/templates/interview-snapshot-tmpl.yaml`.
- The filing deadline: before the next touchpoint. A snapshot written a fortnight later is written
  from memory of a memory.
- The index file listing every snapshot id, date, participant profile and the opportunities it
  sourced. This index is what the tree's provenance references resolve against.
- The consent and retention rule for recordings and quotes, and who to ask when it is unclear.

### Step 6 — Define the synthesis ritual

Snapshots that are never synthesized are a filing cabinet, not discovery. Define the recurring
session where snapshots become tree changes.

| Element | Decision to record |
|---|---|
| Cadence | Weekly or fortnightly, immediately after the touchpoint slot while the story is fresh |
| Duration | Short enough to actually happen; long enough to place opportunities on the tree |
| Attendees | The trio. Not a wider forum — the wider forum reads the tree, it does not build it |
| Input | Every snapshot filed since the last ritual |
| Work | Extract needs, pains and desires in the customer's language; place them on the tree with snapshot ids; check single-parent and sibling distinctness; delete orphans |
| Output | An updated, committed tree file and the list of opportunities added, merged or deleted |

Individual experience maps come before a shared map. Converging first hides disagreement;
individual maps surface where the trio's mental models actually differ. Do the individual pass in
the ritual before merging.

Tree work itself runs through `squads/products/tasks/build-opportunity-tree.md` — this task
schedules the ritual, that task performs it.

### Step 7 — Read cadence health over eight weeks

Once the cadence has run, or when auditing an existing one, produce the eight-week read. Eight
weeks is long enough that a single holiday week does not dominate and short enough that the
finding is still actionable.

| Week | Touchpoint held | Participants | Trio roles present | Snapshot filed | Gap cause |
|---|---|---|---|---|---|
| W-8 | | | PM / design / eng | | |
| W-7 | | | | | |
| W-6 | | | | | |
| W-5 | | | | | |
| W-4 | | | | | |
| W-3 | | | | | |
| W-2 | | | | | |
| W-1 | | | | | |

Then compute and record, as raw counts over the eight weeks — not as a rating:

- **Touchpoint coverage.** Weeks with at least one customer touchpoint, out of eight.
- **Trio participation.** Whether all three roles attended at least one interview in the last
  month, and how many interviews each role attended.
- **Snapshot coverage.** Snapshots filed, out of interviews conducted. Any shortfall is a
  provenance hole in the tree.
- **Provenance integrity.** Opportunities currently on the tree with no resolvable snapshot id.
  This number should be zero. If it is not, the orphans get deleted, not defended.
- **Build-without-evidence incidents.** Anything shipped in the window that does not trace up the
  tree to an opportunity and an outcome.

For every missed week, name the cause and classify it:

| Cause class | Signal | Fix |
|---|---|---|
| Recruiting drought | No participant confirmed | The hook is broken or the trigger is too narrow — fix the hook, do not add a manual scramble |
| Calendar erosion | Slot lost to another meeting | Re-fix the slot; a slot that yields once yields permanently |
| Outcome drift | Nobody knew what to ask | The outcome is stale or unowned — return to Step 2 |
| Delivery pressure | "We are in delivery, discovery is paused" | The tree stays live while delivery runs; the interviews for the next target opportunity happen during the build of the current one |
| Filing debt | Interviews held, snapshots absent | Shorten the snapshot, do not extend the deadline |

Run `squads/products/checklists/continuous-discovery-checklist.md` against this read for the
scored verdict. This step produces the raw numbers; that checklist grades them.

### Step 8 — Write the cadence plan

Create `output_dir` if absent. Write `interview-cadence-{outcome-slug}.md` containing: the
outcome with baseline and target, the named trio with backups, the recruiting mechanism with its
trigger, copy, target volume and owner, the weekly slot, the snapshot path convention and filing
deadline, the synthesis ritual definition, and the eight-week health table with gap causes.

Commit it. A cadence that only exists in three calendars is invisible to the framework and
unrecoverable when one of the three people changes team.

### Step 9 — Schedule the next touchpoint

Do not close this task without a date, a participant source, and the trio members attending. The
cadence is established at the moment the next interview is on a calendar, not at the moment the
plan is written.

## Acceptance Criteria

- The trio is three named people, each with a backup, not three role labels.
- The touchpoints are attached to a live, measurable, trio-influenceable outcome.
- A recruiting mechanism is specified at the level of trigger condition, prompt copy, weekly
  target volume, screener and owner — not as "we will ask around".
- One recurring weekly slot exists in all three calendars, with a defined use when no participant
  shows.
- The snapshot path convention, template and filing deadline are recorded, and the deadline is
  before the next touchpoint.
- A synthesis ritual is defined with attendees, input, work and committed output.
- The eight-week health read is recorded as raw counts, with a named cause for every missed week.
- Every opportunity on the current tree resolves to a filed snapshot id; orphans are listed and
  deleted.
- The cadence plan exists as a versioned file in the repository.
- The next touchpoint is scheduled with a date, a participant source and named attendees.
- No interview guide, tree, assumption map, story or epic was produced by this task.

## Handoff

| Destination | Condition |
|---|---|
| `@product-strategist` | The outcome the cadence serves cannot be influenced through the product and needs decomposition |
| `@jobs-analyst` | Recruiting keeps surfacing switching stories and the causal job needs formalizing |
| `@positioning-lead` | Recruited customers consistently describe the product in a category it is not positioned in |
| `@pricing-strategist` | The screener or the stories keep turning into willingness-to-pay questions |
| `@experimentation-lead` | The cadence needs a live-traffic sample or statistical design rather than a story sample |
| `@products-chief` | Cadence health findings contradict the squad's direction, or consent and participant-ethics questions need a call above the trio |
| `@pm` | The recruiting hook needs product work and must be framed as an epic |
| `@sm` | The recruiting hook epic is framed and stories need drafting |
| `@dev` | Implementation of the recruiting hook — this squad specifies it, it does not build it |
| `@qa` | Testing of the shipped recruiting hook |
| `@ux-design-expert` | The in-product recruiting prompt needs interface and copy design |
| `@analyst` | A bounded, deep research study is genuinely required alongside the weekly habit |
| `@devops` | Committing and pushing the cadence artifacts to remote — exclusive authority, no exceptions |

## Method attribution

The framework applied here is published work, cited so it can be checked at the source.

- Teresa Torres, *Continuous Discovery Habits: Discover Products that Create Customer Value and
  Business Value* (2021) — the continuous discovery habit definition (weekly touchpoints, by the
  team building the product, small research activities, in pursuit of a desired outcome), the
  product trio, the interview snapshot artifact, automating recruiting into the product, and the
  individual-then-shared sequence for experience mapping.
- Tomer Sharon, *Validating Product Ideas: Through Lean User Research* (2016) — research
  operations, recruiting and screening practice, and question quality.
- Marty Cagan with Chris Jones, *EMPOWERED* (2020) and Marty Cagan, *INSPIRED*, 2nd edition
  (2018) — the empowered product team owning an outcome, and the discovery-alongside-delivery
  distinction.

`@discovery-lead` (Sonar) is a specialist applying these methods.

## Related

- Agent: `squads/products/agents/discovery-lead.md`
- Tree construction performed in the synthesis ritual: `squads/products/tasks/build-opportunity-tree.md`
- Snapshot template: `squads/products/templates/interview-snapshot-tmpl.yaml`
- Habit health gate: `squads/products/checklists/continuous-discovery-checklist.md`
- Guide and transcript gate: `squads/products/checklists/interview-quality-checklist.md`
- Method reference: `squads/products/data/continuous-discovery-reference.md`
- Interview execution protocol: `.aexos-core/development/tasks/ux-user-research.md`
- Document generation driver: `.aexos-core/development/tasks/create-doc.md`
