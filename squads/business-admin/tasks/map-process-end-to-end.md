---
task: Map Process End To End
owner: "@process-lead"
owner_type: agent
atomic_layer: task
Input: |
  - process: The process to be mapped, named by its output and its customer (required)
  - performers: Access to the people who actually perform the steps, across every function it crosses (required)
  - records: System logs, ticket timestamps, queue reports or any recorded timing available (optional but each absence downgrades a figure to ESTIMATED)
  - volumes: Cases per period and rework or round-trip rates, where recorded (optional)
  - trigger: What prompted the mapping — a complaint, a delay, an automation proposal (optional)
Output: |
  - process_map: Every step end to end with performer, system, working time, elapsed time, volume and rework rate
  - measurement_marks: Each figure marked OBSERVED, RECORDED or ESTIMATED
  - elapsed_vs_working: Total elapsed time against total working time, with the ratio stated prominently
  - handoff_points: Every point where work changes hands, with what waits and what is lost
  - undocumented_steps: Steps nobody documented, listed separately with the owner to find
  - control_inventory_seed: Checks, approvals and reconciliations observed, with their named owners, for routing
  - process_brief: Versioned markdown file under docs/ with the boundary notice at the top
Checklist:
  - "[ ] Define the process by its output and its customer, not by the department that hosts most of it"
  - "[ ] Identify the true start and the true end, usually earlier and later than the department believes"
  - "[ ] Walk the process with the people who perform it, including the steps nobody documented"
  - "[ ] Record performer, system, working time, elapsed time, volume and rework rate per step"
  - "[ ] Mark every figure OBSERVED, RECORDED or ESTIMATED and never present an estimate as a measurement"
  - "[ ] State the elapsed-to-working ratio prominently"
  - "[ ] List undocumented steps separately with the failure each was probably added to prevent"
  - "[ ] Identify segregation-of-duties controls and mark them untouchable by this analysis"
  - "[ ] LICENSED-REVIEW CHECK: list every control, records-retention, personal-data and role-or-headcount question the map surfaced, each addressed to its named owner — control owner, accountant, auditor, counsel, qualified HR — at the top of the artefact, and confirm the map removes no control and decides no retention or data question"
  - "[ ] Confirm the map proposes nothing; recommendations are a separate later step"
  - "[ ] Write the map to a versioned file under docs/ with a date and a named owner"
---

# *map-process — Map Process End To End

Materialises the `*map-process` command of `@process-lead` (Sluice). Maps a process across every
function it actually crosses, with sourced measurements per step, and states the gap between elapsed
time and working time.

## Purpose

Organisations manage tasks and functions; customers experience processes. The damage accumulates in
the seams between departments, where nobody is accountable for the whole, and it shows up as the gap
between three weeks of elapsed time and four hours of work. That gap cannot be found from inside any
one department, and it cannot be argued about without a map whose numbers have sources. This task
produces the map and nothing else — deliberately, because a map that arrives with recommendations
attached stops being challenged.

## Attribution

The framework applied here is published by Michael Hammer and James Champy in *Reengineering the
Corporation: A Manifesto for Business Revolution* (1993), and in Hammer's earlier article
"Reengineering Work: Don't Automate, Obliterate" (*Harvard Business Review*, July–August 1990). It is
applied with attribution.

The framework travels with its own record, which is stated rather than omitted. The authors were
explicit that a large share of reengineering efforts failed to deliver what they intended, and during
the 1990s the label was widely used as cover for headcount reduction — which damaged both the
method's reputation and the willingness of the people asked to participate in it. Radical redesign is
therefore treated here as an expensive instrument with a poor average outcome. Mapping is the cheap
part and comes first; the radical-versus-incremental decision is a separate step that defaults to
incremental and requires explicit justification to go the other way.

## Professional limit

This task designs and measures process. It is not an accountant, auditor, lawyer, HR professional or
compliance officer, holds no licence, and issues no accounting, tax, legal, records-retention,
data-protection, employment or compliance opinion. It never states that a process is compliant or
lawful. Three limits are reached constantly in this work and each is routed rather than absorbed:

- **Controls.** The map may record that a check appears to cost more than it catches. It may never
  remove, weaken or retime a financial, legal or regulatory control on its own authority. That
  requires the accountant, auditor or counsel who owns it. Segregation-of-duties controls are
  untouchable by this analysis entirely, because they prevent something a cycle-time study cannot see.
- **Records and data.** What must be retained, for how long, and what personal data may be captured,
  merged, moved or accessed are legal and regulatory questions, never process-convenience questions.
- **People.** Any redesign that changes what people do carries employment-law and consultation
  obligations. This task designs no role change and no headcount change, and routes anything touching
  roles to qualified HR and employment counsel via `@business-admin:people-lead` before it goes
  further. If the actual objective behind the mapping is headcount reduction, that is said out loud
  and the work stops here.

## Pre-conditions

- The process can be stated as "X requests Y and receives Z". If it cannot, the boundary is wrong and
  is fixed before mapping begins.
- The people who perform the steps are available to walk it. A map drawn from documentation alone
  records the process as it was designed, not as it runs.
- Access to timing records is either available or its absence is recorded, so figures can be marked
  honestly.
- The mapping is not being used as a vehicle for a headcount decision.

## Procedure

1. **Define the process by output and customer**, not by the department that hosts most of it. Write
   it as "X requests Y and receives Z" before anything else.
2. **Find the true start and the true end.** The true start is usually earlier than the department
   believes — the moment the customer first wanted something. The true end is usually later — the
   moment they could actually use the output. Most of the missing weeks live outside the boundary the
   department would have drawn.
3. **Walk the process with its performers**, step by step, across every function it crosses, including
   the steps nobody documented.
4. **Record per step:** who performs it, in what system, working time, elapsed time from arrival to
   completion, volume per period, and rework rate.
5. **Mark every figure OBSERVED, RECORDED or ESTIMATED.** An estimate is usable; an estimate presented
   as a measurement is not, and it is the fastest way to lose the argument later.
6. **Total elapsed against total working time** and state the ratio prominently. It is usually the
   headline finding and it is usually larger than anyone in the process expected.
7. **Inventory the handoffs.** Every point where work changes hands — person, team, function, system
   or organisation. For each, measure the wait and separate waiting for capacity from waiting for a
   scheduled event and waiting for a decision. Record what is lost at each transfer: context, intent,
   urgency, information re-entered rather than carried. Count the round trips; work returning to a
   previous holder is a defect signal.
8. **List the undocumented steps separately.** They are almost always checks somebody added after
   something went wrong. Each is a piece of institutional memory with an owner to find, and removing
   one without finding that owner is how a control disappears unnoticed.
9. **Seed the control inventory.** Record every check, approval, sign-off and reconciliation observed,
   with its named owner. Mark segregation-of-duties controls as untouchable. Produce no removal and no
   recommendation — this step produces a list addressed to owners.
10. **Assemble the required-review list** as a prominent section: control questions to their owners;
    records, retention and data-protection questions to counsel; role, headcount and location
    questions to qualified HR and employment counsel; the financial effect of anything proposed later
    to `@business-admin:finance-lead`.
11. **Propose nothing.** The map is the deliverable. Classification, redesign, resequencing and the
    automation verdict are separate steps that run on this map afterwards.
12. **Capture.** Write to a versioned file under `docs/` with the boundary notice at the top, every
    measurement marked, a date and a named owner.

## Acceptance criteria

- The process is stated by its output and its customer, with a true start and true end that cross
  department boundaries.
- Every step records performer, system, working time, elapsed time, volume and rework rate.
- Every figure is marked OBSERVED, RECORDED or ESTIMATED; no estimate is presented as a measurement.
- The elapsed-to-working ratio is stated prominently.
- Every handoff is inventoried with its wait type, information loss and round-trip rate.
- Undocumented steps are listed separately with the owner to find.
- Controls are inventoried with named owners; segregation of duties is marked untouchable; no control
  is removed, weakened or retimed anywhere in the output.
- No retention, data-protection, role or headcount question is decided; each is routed to its named
  owner in the required-review list at the top of the artefact.
- The map contains no proposal and no recommendation.
- The map exists as a versioned file with date and owner.

## Handoff

| Destination | When |
|---|---|
| The control owner, accountant or auditor | Any question of whether a check, approval or reconciliation may be removed, weakened or retimed |
| Counsel | Records retention, data protection, and anything touching personal data or lawfulness |
| Qualified HR and employment counsel, via `@business-admin:people-lead` | Anything that changes roles, headcount, or where work is performed, and any consultation obligation |
| `@business-admin:finance-lead` | The financial reading of the process and of any change proposed later |
| `@business-admin:legal-ops` | Contract lifecycle specifics inside the mapped process |
| `@business-admin:admin-chief` | When the map contradicts another squad artefact, or the request spans disciplines |
| `@pm` | When the finding needs epic framing — this squad writes no epic, PRD or story |
| `@dev` / `@qa` / `@devops` | Implementation, testing, release — never performed here; push is `@devops` exclusive |

## Related

- Agent: `squads/business-admin/agents/process-lead.md` (Sluice) — `*map-process`, `*find-handoffs`, `*value-test`, `*control-audit`, `*radical-vs-incremental`, `*automation-check`, `*professional-boundary`
- Optional accelerator: `.aexos-core/development/tasks/advanced-elicitation.md` — walking a process with its performers
- Optional accelerator: `.aexos-core/development/tasks/analyst-facilitate-brainstorming.md` — cross-functional sessions
- Optional accelerator: `.aexos-core/development/tasks/create-doc.md` — capture driver for the brief
- Optional accelerator: `.aexos-core/development/checklists/self-critique-checklist.md` — applied before capture
- Manifest: `squads/business-admin/squad.yaml`
