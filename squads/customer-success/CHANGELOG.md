# Changelog — customer-success

All notable changes to the Customer Success Squad.

## [1.0.0] - 2026-07-30

### Added

- 5 agents: `cs-chief` (Anchor ⚓, Tier 0), `onboarding-lead` (Threshold 🚪, Tier 1), `retention-lead` (Tenure 🔁, Tier 1), `advocacy-lead` (Chorus 📣, Tier 2), `voice-lead` (Auricle 👂, Tier 2)
- 5 executable tasks in TASK-FORMAT-SPECIFICATION-V1: `cs-chief-diagnose.md`, `onboarding-lead-define-first-value.md`, `retention-lead-health-model.md`, `advocacy-lead-score-read.md`, `voice-lead-aggregate-signal.md`
- 2 multi-phase workflows, both entering through `cs-chief`:
  - `wf-first-value-to-health.yaml` — diagnose → define-first-value → health-model → coherence-check
  - `wf-loyalty-to-routed-signal.yaml` — diagnose → score-read → aggregate-signal → (on account risk) health-model → route and close the loop
- `README.md` with the agent table, task and workflow inventory, invocation syntax, customer data rules, boundary table and attribution limits
- `squad.yaml` manifest with tiers, the handoff matrix, the core-agent boundary, the cross-squad boundary and the attribution requirement

### Architecture

- Entry agent: `cs-chief`, which triages, attributes the lifecycle stage where a problem originated rather than the stage where it surfaced, and names exactly one owner
- Task-first: workflows use `workflow.sequence` — the canonical execution array — and every `task:` reference resolves to a real file in `tasks/`
- Lifecycle chain enforced across artifacts: promise → activation → adoption → realized value → health → renewal → advocacy

### Boundaries

- Customer job discovery and continuous discovery are routed to `@products:jobs-analyst` and `@products:discovery-lead`, never absorbed
- Renewal negotiation, discounting, contract terms, expansion offers and referral incentives belong to the `sales` squad; this squad supplies value evidence only
- Prioritization and roadmap position belong to `@products` and `@pm` — routing a theme is not prioritizing it
- No workflow implements, tests or publishes anything; `@devops` holds exclusive push authority
- Retention by obstruction is refused outright — no cancellation friction, no data withholding, no auto-renewal exploitation

### Customer data

- Account or cohort level by default; no personal data beyond what the decision requires
- Records are referenced, never reproduced — verbatims, transcripts, contacts and contract terms stay in the authorized system of record
- Anonymous feedback is never re-identified
- Special-category personal data escalates to the human owner

### Attribution

- `retention-lead` applies Nick Mehta, Dan Steinman & Lincoln Murphy, *Customer Success* (Wiley, 2016), with the canonical wording, numbering and ordering of its laws of customer success carrying an explicit VERIFY marker and a refusal to reproduce them from memory
- `advocacy-lead` applies Fred Reichheld, *The Ultimate Question* (2006) and its revisions, with VERIFY markers on the recommendation question's exact wording, on the Net Promoter / NPS trademark requirements, and on any citation from *Winning on Purpose* (2021); the growth-prediction claim is recorded as CONTESTED
- `onboarding-lead` and `voice-lead` rest on practitioner disciplines rather than single published works, and say so — no author, book or year is claimed for either

### Validation

- `node scripts/normalize-squad-manifests.js` followed by `SquadValidator.validate('squads/customer-success')` returns valid, 0 errors, 0 warnings
