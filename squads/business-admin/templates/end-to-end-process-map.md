# End-to-End Process Map — [PROCESS] — v[N]

> **PROFESSIONAL LIMIT — READ BEFORE THE MAP.** This is a **process design artefact**. It is not a
> compliance determination, not a control decision, not a records or data-protection decision, and
> not a role or headcount design. Nobody producing it is an accountant, auditor, lawyer, HR
> professional or compliance officer, and none holds a licence.
>
> **No control is removed here.** Controls are *proposed* to their named owners with evidence, and
> the owner decides. **Segregation-of-duties controls are excluded from this analysis entirely** —
> they exist to prevent something a cycle-time study cannot see.
>
> **Records retention and data protection are counsel's.** A capture-once design that widens who
> can see personal data is a data-protection change wearing a process costume.
>
> **This design does not change what people do, how many are needed, or where work is located.**
> Any such consequence routes to qualified HR and employment counsel at the point it first appears
> — section 9 — not at the end.
>
> Framework applied with attribution: Michael Hammer & James Champy, *Reengineering the
> Corporation: A Manifesto for Business Revolution* (1993), and Michael Hammer, "Reengineering
> Work: Don't Automate, Obliterate", *Harvard Business Review*, July–August 1990. Applied with its
> record attached: see section 8.

---

## 0. Licensed and owner reviews — REQUIRED before anything here is implemented

| Review | Owner type | Named reviewer | Sent | Reviewed | Status | Blocks |
|---|---|---|---|---|---|---|
| Control changes | Accountant / auditor / counsel, per control | [NAME + FIRM] | [date] | [date] | UNREVIEWED | Sections 5, 7 |
| Segregation of duties | Control owner | [NAME + FIRM] | — | — | **EXCLUDED FROM ANALYSIS** | — |
| Records retention | Counsel | [NAME + FIRM] | [date] | [date] | UNREVIEWED | Section 7 |
| Data protection / personal data | Counsel | [NAME + FIRM] | [date] | [date] | UNREVIEWED | Section 7 |
| Role, headcount or location consequence | Qualified HR + employment counsel | [NAME + FIRM] | [date] | [date] | UNREVIEWED | Section 9 |
| Financial effect | `@business-admin:finance-lead`, then a licensed accountant for any treatment | [name] | [date] | [date] | UNREVIEWED | Section 6 |

**A reader must not be able to reach section 7 believing it is approved.** While any blocking review
is UNREVIEWED, the proposal in that section is a proposal and nothing else. State that on the
section, not only here.

---

## 1. Process definition — by output and customer, not by department

| Field | Value |
|---|---|
| Process name | [name] |
| Stated as | "**[X]** requests **[Y]** and receives **[Z]**" |
| Customer | [who wanted the output — internal or external] |
| Output of value | [what they receive] |
| True start | [the moment the customer first wanted something — usually earlier than the hosting department believes] |
| True end | [the moment they could use the output — usually later] |
| Functions crossed | [list every one, including the ones outside the sponsor's org] |

**If it cannot be stated as "X requests Y and receives Z", the boundary is wrong.** Departments are
not processes. Tasks are not processes. A map that stops at a department boundary hides exactly the
seams where the time and the errors live.

---

## 2. The map — every figure sourced

Mark every measurement **OBSERVED** (watched it happen), **RECORDED** (from a system or log), or
**ESTIMATED** (someone's judgement). An estimate is usable. An estimate presented as a measurement
is not.

| # | Step | Performer (role) | System | Working time | Elapsed time (arrival → completion) | Volume / period | Rework rate | Source mark |
|---|---|---|---|---|---|---|---|---|
| 1 | [step] | [role] | [system] | [min] | [hrs/days] | [n] | [%] | OBSERVED |
| 2 | [step] | [role] | [system] | [min] | [hrs/days] | [n] | [%] | RECORDED |
| 3 | [step] | [role] | [system] | [min] | [hrs/days] | [n] | [%] | ESTIMATED |

### The headline finding

| Measure | Value |
|---|---|
| **Total elapsed time** | [days] |
| **Total working time** | [hours] |
| **Ratio** | **[elapsed : working]** |

When three weeks of elapsed time contains four hours of work, the problem is not effort, speed or
diligence. It is queues and handoffs, and no amount of working harder will touch it. State this
ratio prominently — it is usually the whole finding.

### Undocumented steps — recorded separately, investigated, never deleted

| # | Step nobody documented | Who performs it | Who added it and when | What went wrong that caused it | Owner to find |
|---|---|---|---|---|---|
| 1 | [step] | [role] | [person / unknown] | [incident] | [named] |

These are almost always checks somebody added after something went wrong. Each is a piece of
institutional memory with an owner to find. **Do not delete an undocumented step because it is
undocumented.**

**Nothing is proposed in this section.** A map that arrives with recommendations attached stops
being challenged.

---

## 3. Handoffs and queues

| # | Handoff (from → to) | Wait type | Wait duration | What is lost or re-created | Round-trip rate | Exists because of the work or the org chart? |
|---|---|---|---|---|---|---|
| 1 | [A → B] | capacity / scheduled event / decision | [duration] | [context, intent, urgency, re-entered data] | [%] | [work / org chart] |

**Separate the three wait types.** Waiting for capacity, waiting for a scheduled event, and waiting
for a decision have different fixes and get conflated constantly.

**Round trips are a defect signal.** Work returning to a previous holder means something was wrong
or missing. The *rate* matters more than the duration.

### Dual ranking — these usually differ, and both matter

| Rank | By elapsed time contributed | By error contribution |
|---|---|---|
| 1 | [handoff] | [handoff] |
| 2 | [handoff] | [handoff] |

---

## 4. Step value test — classify, do not delete

Every step goes into **exactly one** class.

| # | Step | Class | For B: who specifically requires the evidence | For C: what failure, and when it last occurred | For D: the upstream defect it compensates for |
|---|---|---|---|---|---|
| 1 | [step] | A | — | — | — |
| 2 | [step] | B | [NAMED person or body — "compliance" as an abstraction is not a source] | — | — |
| 3 | [step] | C | — | [failure, date] | — |
| 4 | [step] | D | — | — | [defect, step #] |

| Class | Definition |
|---|---|
| **A** | Directly serves the outcome the customer wants |
| **B** | Produces evidence genuinely required — by a **named** control owner, counsel or regulator |
| **C** | Prevents a **known, documented** failure |
| **D** | Compensates for a defect elsewhere in the process |

**Class D is the redesign target**: reconciliations, re-entry, chasing, status meetings, checking
someone else's work. Trace each to the upstream defect.

- Class B with no nameable requirer → **unclassified**, and it goes to counsel as a question.
- Class C preventing a failure that has never occurred and cannot be described → class D candidate,
  routed to whoever introduced it.
- **Class D share of total working time: [%]** — that figure is the argument for the redesign.

**Nothing is deleted at this stage.** Classes B and C are routed to their named owners for
confirmation.

---

## 5. Control inventory — proposals only, never removals

| # | Control | Owner (named) | Why introduced | What it catches | Times caught / period | Cost (elapsed) | Cost (working) | Segregation of duties? |
|---|---|---|---|---|---|---|---|---|
| 1 | [approval] | [NAME] | [reason] | [what] | [n] | [time] | [time] | No |
| 2 | [reconciliation] | [NAME] | [reason] | [what] | [n] | [time] | [time] | **Yes — EXCLUDED** |

### Approvals with no observed rejection

State this as a **question**, not a conclusion. An approval may **deter** rather than reject, and
deterrence does not appear in a rejection count.

| Control | Volume reviewed | Rejections observed | Question routed to owner |
|---|---|---|---|
| [control] | [n] | 0 | "Over [n] items in [period] this approval rejected none. What is it intended to catch, and would deterrence explain the absence?" |

### Routed proposals

| # | Proposal | Evidence attached | Routed to (named owner) | Date sent | Response |
|---|---|---|---|---|---|
| 1 | [proposal, phrased as a question] | [the rows above] | [NAME] | [date] | [pending] |

> **Stated on this artefact, not only in the preamble:** control changes require the accountant,
> auditor or counsel who owns the control. This map proposes and routes. It removes nothing.
> Segregation-of-duties controls are untouchable by this analysis.

---

## 6. Radical versus incremental — decided explicitly, defaulting to incremental

| Field | Value |
|---|---|
| Required outcome, **numerically** | [target — a number, not a direction] |
| Incremental ceiling | [what is reachable by removing waits, parallelising, and fixing the largest class D items within the current design] |
| Does the ceiling reach the target? | [yes / no] |
| If no: the specific structural blocker | [fragmentation across functions / information architecture forcing re-entry / control model requiring sequential approval / other — be specific] |
| **Recommendation** | **INCREMENTAL** / RADICAL |
| Justification | [written out] |

### Honest cost of radical, stated whenever radical is recommended

- Disruption to a running process
- Temporary performance loss during migration
- The professional reviews in section 0, each of which takes external time
- **The documented failure record:** the authors of the framework were themselves explicit that a
  large share of reengineering efforts fail to achieve their intended results. Through the 1990s the
  label was widely applied to headcount-reduction programmes, which damaged both the method's
  standing and the participation it depends on.

### Motive check — run it, record the answer

| Question | Answer |
|---|---|
| Is the actual objective headcount reduction? | [yes / no] |

**If yes: stop.** Say so plainly. That is a matter for qualified HR and employment counsel and it
must not be run as a process programme. Laundering it through a redesign destroys the participation
of the people who hold the knowledge the redesign depends on.

---

## 7. Proposed design — each change traced to a principle and a finding

> **STATUS: PROPOSAL.** Blocking reviews in section 0 are [status]. Nothing in this section is
> approved and nothing here may be implemented past a review that has not returned.

| # | Change | Design principle it applies | Map finding it addresses | Expected effect | Basis for the expectation |
|---|---|---|---|---|---|
| 1 | [change] | [e.g. "Steps in natural order" — Hammer & Champy] | [step/handoff #] | [effect] | Computed from [rows] / **ESTIMATED** |
| 2 | [change] | [e.g. "Capture information once, at the source" — Hammer, HBR 1990] | [finding] | [effect] | [derivation] |

**Never a number with no derivation.** An expected effect is either computed from the mapped figures
or marked as an estimate.

### Design principles available (with attribution)

Seven principles [SOURCE: Hammer, "Reengineering Work: Don't Automate, Obliterate", HBR 1990]:
organise around outcomes not tasks; have those who use the output perform the process; subsume
information-processing into the work that produces the information; treat dispersed resources as
though centralised; link parallel activities rather than integrating results at the end; put the
decision point where the work is performed and build control in rather than bolting it on; capture
information once, at the source.

Plus, from the 1993 book: steps in natural order; a case owner as single point of contact.

### Data and access flags — routed BEFORE the design proceeds

| Change | Widens access to personal data? | Merges data sets? | Changes what is retained? | Routed to counsel |
|---|---|---|---|---|
| [change] | [yes/no] | [yes/no] | [yes/no] | [date sent] |

A capture-once design frequently does all three. Data protection is not a process-convenience
decision.

---

## 8. Risks — including what could get worse

| # | Risk | Likelihood basis | What it would look like | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | New failure mode: [what] | [basis] | [signal] | [mitigation] | [named] |
| 2 | Capability gap: [what] | [basis] | [signal] | [mitigation] | [named] |
| 3 | Temporary performance loss during migration | — | [signal] | [plan] | [named] |
| 4 | A control's visibility disappears when its approval is removed | — | [signal] | [what replaces the visibility] | [control owner] |

**Removing an approval without replacing its visibility is how a control disappears unnoticed.**
State what replaces the visibility, every time.

---

## 9. People consequence — routed at the point it appears, not at the end

| Consequence | Present? | Routed to | Date | Status |
|---|---|---|---|---|
| Changes what people do | [yes/no] | Qualified HR + employment counsel; `@business-admin:people-lead` for role design | [date] | [status] |
| Changes how many people are needed | [yes/no] | **Qualified HR + employment counsel — the design does not proceed until reviewed** | [date] | [status] |
| Changes where work is performed | [yes/no] | Qualified HR + employment counsel | [date] | [status] |
| Creates a role that does not exist | [yes/no] | `@business-admin:people-lead` for the bar; HR for the headcount | [date] | [status] |
| Triggers a consultation obligation | [yes/no] | **Employment counsel — this is a lawfulness question and is not assessed here** | [date] | [status] |

**The people doing the work know where the time goes.** A redesign built without them is a diagram;
a redesign built with them is a design. It is also where the undocumented control lives.

---

## 10. Migration, reversal and measurement

| Field | Value |
|---|---|
| Migration path | [how the process runs during the transition] |
| Reversal plan | [how to go back if it fails, and who decides] |
| Success measure | [the same measures as section 2, re-taken] |
| Measurement date | [YYYY-MM-DD] |
| Who checks | [named] |

---

## 11. Capture

| Field | Value |
|---|---|
| File path | `docs/[path]/[YYYY-MM-DD]-process-map-[process].md` |
| Owner | [named] |
| Version | [n] / supersedes [path] |
| **Current design preserved** | [ ] yes — both current and proposed designs stay in version control so the change remains auditable |

Constitution Article IV — No Invention: every elapsed time, volume and error rate traces to an
observation, a record, or an estimate marked as such. A map built from what people believe happens
is a map of beliefs.

---

## Template usage notes

- Sections 0, 5, 6 and 9 are not optional. A map without routed control proposals, without an
  explicit radical-versus-incremental decision, or without its people-consequence routing is not
  this artefact.
- Section 2 is completed **before** section 7 is drafted. Mapping and proposing in the same pass is
  how a map stops being challenged.
- Sluice is equally willing to conclude that the process is fine and the problem is elsewhere. That
  is the answer more often than the method's reputation suggests, and reporting it is not a failure
  of the engagement.
