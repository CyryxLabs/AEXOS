# Empowered Team Checklist

**Checklist ID:** PRD-CL-010
**Squad:** products
**Referenced by:** product-strategist (Lodestar)
**Applies to:** one team at a time, diagnosed by `*team-model` and used as input to `*empower-plan`
**Purpose:** Diagnose which of the three team models a team is actually operating under — delivery
team, feature team, or empowered product team — from OBSERVED BEHAVIOUR rather than from the org
chart label. Outputs a diagnosis plus the specific gap to close.

[[LLM: INITIALIZATION INSTRUCTIONS — TEAM MODEL DIAGNOSIS

Diagnose ONE team. Running this across a department produces an average, and an average team model
does not exist.

EXECUTION APPROACH:
1. Ask for evidence from the LAST TWO COMPLETED CYCLES. This checklist is answered with what
   happened, not with what is intended to happen.
2. For each item, the answer must point at a real artifact or a real event: a planning document, a
   ticket, a review deck, a decision that was reversed, a date that was committed. "That is how we
   work" without an instance is a fail.
3. Mark [x] true of this team, [ ] not true, [N/A] genuinely not applicable with a written reason.
4. Sections 1-5 are diagnostic, not aspirational. Do NOT mark an item true because it is the
   direction of travel.
5. Score each of the three models in section 6 and issue exactly one diagnosis.
6. Write the gap in section 7. A diagnosis with no gap statement is a label, and labels are the
   problem this checklist exists to solve.

THE ORG CHART IS INADMISSIBLE EVIDENCE. If the answer to any item is the team's name, its reporting
line, or its stated mission, the item is unanswered. Ask again for behaviour.

THE DECISIVE TEST, run it early: in the last two cycles, name ONE time discovery evidence caused
this team NOT to build something that was already planned. If there is no such case, the discovery
track has no authority over the decision, and no amount of ceremony changes the diagnosis.]]

---

## 1. What the Team Receives

*What actually arrives at the team at the start of a cycle.*

- [ ] The team receives problems to solve, stated in customer or business terms
- [ ] Each problem arrives with an outcome the team is expected to move
- [ ] The team does NOT receive a prioritized list of features
- [ ] The team does NOT receive dates attached to features it did not scope
- [ ] The team does NOT receive specifications written before it was involved
- [ ] What arrives can be traced to a written product strategy, not to a stakeholder review alone
- [ ] The team was present when the problem was chosen, or was consulted before it was fixed
- [ ] Requests that arrive as solutions are routinely returned with "what problem, for whom?" and this has actually happened at least once

**Evidence required:** the last two cycle-opening artifacts. Attach the paths.

## 2. What the Team Decides

*Where the solution is actually chosen.*

- [ ] The team decides the solution, including deciding not to build what was suggested (CRITICAL)
- [ ] There is at least one instance in the last two cycles of discovery evidence stopping planned work (CRITICAL — this is the decisive test)
- [ ] The team can change scope in response to evidence without an escalation
- [ ] The team can choose a different solution to the same problem mid-cycle
- [ ] Solution decisions are not routinely escalated for approval
- [ ] Prototype and test results change what gets built, and there is a named instance
- [ ] The team decides its own sequencing within the cycle
- [ ] Stakeholders bring problems and constraints to the team, not finished solutions

**Evidence required:** name the decision, the date, and what was NOT built as a result.

## 3. What the Team Is Measured On

*What is asked for in a review, and what gets someone praised or questioned.*

- [ ] Reviews ask about outcome movement and what was learned (CRITICAL)
- [ ] Reviews do NOT centre on percentage complete or delivery predictability
- [ ] The team's stated success measure for last cycle was a change in a number, not a set of shipments
- [ ] A cycle where the team shipped less but moved the outcome would be counted a success, and there is an instance or a leader who will say so on the record
- [ ] A cycle where the team shipped everything and moved nothing would be treated as a problem
- [ ] Confidence levels on objectives are allowed to drop without that being treated as failure
- [ ] The team is not held to dates it did not set, except for genuine high-integrity commitments
- [ ] High-integrity commitments are few, externally driven, and made after enough discovery to make the date honest

**Evidence required:** the last two review agendas or decks, and the questions actually asked.

## 4. Trio Staffing

*Whether the roles that own the four risks are present and competent.*

- [ ] A product manager is assigned to this team, not shared across so many teams that the role is nominal
- [ ] The product manager owns value AND business viability, and has the access that requires — customers, data, sales, finance, legal, security (CRITICAL)
- [ ] A product designer is assigned to this team
- [ ] The designer is involved before scope is fixed, not after, to produce screens
- [ ] A tech lead owns feasibility and is present when problems are framed, not first at estimation
- [ ] All three are present for the evidence — they see the customer and the data first-hand, not through a summary
- [ ] Engineers see the problem before the solution is chosen
- [ ] The trio works on the same problem at the same time, rather than in a relay

**Note:** a team without a strong product manager is a delivery team with a project coordinator, no
matter what the other sections say. Do not diagnose a strategy problem when the actual problem is a
competency gap.

## 5. Leadership Behaviour

*What the people above the team do, since empowerment is granted, not adopted.*

- [ ] Leaders bring problems and context rather than solutions
- [ ] Leaders coach — there is a named coach and a named competency being developed for this team
- [ ] Leaders remove obstacles, and there is a named obstacle removed in the last two cycles
- [ ] Leaders tolerate a bet that failed cheaply, and there is an instance
- [ ] Leaders do not reverse the team's solution decisions without new evidence
- [ ] The product vision is known to the team well enough that members can paraphrase it unprompted
- [ ] The team knows which strategy problem its work descends from
- [ ] Escalation is the exception rather than the default path for solution disagreements

---

## 6. Diagnosis

Score each section as the proportion of items marked [x]. Then diagnose:

| Model | Receives | Decides the solution | Measured on | Typical staffing |
|---|---|---|---|---|
| **Delivery team** | Specifications and estimates | No | Output and predictability | Engineers, often no product manager or designer on the team |
| **Feature team** | Prioritized features with dates | No | Delivery against the roadmap | Cross-functional, product manager acting as project coordinator or requirements author |
| **Empowered product team** | Problems to solve, with outcomes | Yes | Outcomes | Product manager, product designer, engineers with a tech lead — all present for the evidence |

**Diagnosis rules, applied in order:**

1. If section 4 fails on the product manager items -> **delivery team**, regardless of every other
   section. The role that owns value and business viability is not staffed.
2. If the decisive test in section 2 has no instance -> **feature team** at best. Discovery without
   authority over the decision is decoration.
3. If section 1 shows prioritized features arriving and section 3 shows delivery predictability as
   the measure -> **feature team**, even where discovery ceremonies exist.
4. If sections 1, 2 and 3 are substantially true and section 5 is not -> **feature team in
   transition**. Record it as a feature team with the leadership gap named; empowerment that
   leadership has not granted is not held by the team.
5. Only when sections 1-5 are substantially true -> **empowered product team**.

> Renaming the team does not empower it. Changing what you ask of it does. A team that claims to be
> empowered but escalates every solution decision is a feature team with new vocabulary.

```text
Team:            {team name}
Diagnosis:       {delivery team | feature team | feature team in transition | empowered product team}
Section scores:  1:{n}%  2:{n}%  3:{n}%  4:{n}%  5:{n}%
Decisive test:   {instance and date | NONE}
Diagnosed by:    {name}   Date: {YYYY-MM-DD}
Evidence window: {last two cycles, named}
```

## 7. The Gap

A diagnosis without a gap statement is a label. Write all four fields, even when the diagnosis is
`empowered product team` — in that case the gap is what would cause the team to regress.

| Gap dimension | Current state | Required state | Named owner of the change |
|---|---|---|---|
| What it receives | | | |
| What it decides | | | |
| What it is measured on | | | |
| Trio staffing | | | |
| Leadership behaviour | | | |

**Preconditions for empowerment** — all four are required; three out of four produces a team
accountable for an outcome it cannot move, which is worse than the feature team it replaced:

- [ ] Competent people in each of the three roles
- [ ] A real problem with a measurable outcome
- [ ] Authority over the solution
- [ ] Leaders who coach and remove obstacles rather than direct

**Sequencing note for `*empower-plan`:** one team, one real problem, one cycle — before extending.
Staffing the trio properly (section 4) precedes moving the measure (section 3); reversing that order
produces a team owning an outcome it has no levers to move.

## 8. Boundary

- [ ] This diagnosis produced no epics, PRDs, stories, implementation plans or code
- [ ] Competency and staffing findings are recorded as findings, not turned into hiring decisions here
- [ ] Where the fix is an epic, it is handed to `@pm`; stories only ever come from `@sm` after that
- [ ] No push, PR, MCP or CI/CD action appears in the output — `@devops` exclusive authority

## Handoff

| Destination | Condition |
|---|---|
| `*empower-plan` (@product-strategist) | The gap table is filled and needs a sequenced, versioned plan with named owners |
| `*objectives` (@product-strategist) | Diagnosis is `empowered product team` and the team can now receive outcome objectives |
| `@discovery-lead` | The team has authority but no discovery practice to exercise it with |
| `@products-chief` | Leadership disputes the diagnosis and it needs squad-level arbitration |
| `@pm` | A chosen problem is evidenced and ready for epic framing |
| `@po` | The diagnosis changes what the team should be working on and the backlog needs updating |
| `@sm`, `@dev`, `@qa` | Not from here — this checklist does not create stories, implement or test code |
| `@devops` | Not from here — git push, PRs, MCP and CI/CD are `@devops` exclusive authority |

## Method Attribution

- Marty Cagan and Chris Jones, *EMPOWERED: Ordinary People, Extraordinary Products* (2020) — the
  three team models, the preconditions for empowerment, the product trio as a staffing precondition
  rather than a ceremony, and leaders who coach rather than direct.
- Marty Cagan, *INSPIRED: How to Create Tech Products Customers Love*, 2nd edition (2018) — the four
  product risks whose ownership the trio staffing check tests for, and discovery as the place risks
  are retired before build.
- Marty Cagan, *TRANSFORMED: Moving to the Product Operating Model* (2024) — the transformation
  patterns and the objections this diagnosis surfaces.
- John Doerr, *Measure What Matters* (2018) — missionaries, not mercenaries.

@product-strategist (Lodestar) is a specialist applying these methods.
