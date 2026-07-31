# ADR-AEX-003: Move Governance onto the Executing Path

## Status

Proposed. Part of [EPIC-AEXOS-EVOLUTION](../EPIC-AEXOS-EVOLUTION.md),
story AEX-1.4. Wave 0 (AEX-0.1, AEX-0.2, AEX-0.4) is a hard prerequisite.

## Context

Governance is AEXOS's strongest differentiator. Constitution Article XII is
unusually concrete for an agent framework:

- **XII-A** — a budget ceiling MUST be declared before the first model call;
  >50% pressure downgrades to lighter tiers; 100% is a hard stop with human
  escalation.
- **XII-B** — `model_routing.*` is owned exclusively by `@devops`; threshold
  changes require `@architect` review.
- **XII-C** — no anonymous auto-dispatch without a story ("shadow work").
- **XII-D** — automated intents are scanned for prompt injection: invisible
  unicode, system-prompt override attempts, path traversal. Failed scans are
  rejected, logged and never executed.

This is implemented, and implemented well. `core/permissions/` contains
`dispatch-governance.js` (budget enforcement, story binding with status
validation, `INTENT_PATTERNS` injection scanning), plus `path-guard`,
`prompt-guard`, `ssrf-guard` and `operation-guard`, each with tests under
`core/permissions/__tests__/`.

The problem is reachability. `dispatch-governance` is invoked from exactly two
places: `.cyryx-core/scripts/pm.sh:362-377` and `aexos sdc preflight`. Neither is
on the path where work actually happens.

What actually happens is: the developer runs Claude Code, a `UserPromptSubmit`
hook fires, the model reads a `SKILL.md`, and the model reads task markdown and
acts. Along that path, governance is enforced by three `.claude/hooks/` entries —
**all three of which are currently non-functional** (DIAGNOSTIC D1), including
the guard that reserves `git push` to `@devops` under Article II. It crashes with
a `SyntaxError` and exits 1; Claude Code blocks only on exit 2, so every push is
permitted.

The result: excellent governance sitting on a road nobody travels, and the road
everyone travels having none.

Wave 0 restores the three hooks. That is necessary but not sufficient — hooks
enforce coarse tool-level rules (may this agent run `git push`?). They cannot
enforce Article XII, which is about *model dispatch*: budget accounting, story
binding, intent scanning. Those checks belong where dispatch happens.

ADR-AEX-001 creates that place for the first time.

## Decision

**1. Governance becomes a precondition of `AgentRuntime.execute()`.**

No dispatch occurs without a governance decision. The check is inside the runtime
boundary, not in a caller that could be bypassed by adding a new caller.

**2. Governance issues a token; the runtime demands one.**

`dispatch-governance.evaluate(request)` returns either a rejection or a
short-lived token bound to the exact request — story id, agent id, budget
allocation, and a hash of the assembled intent. `execute()` requires a token
whose hash matches the request it received.

This closes the gap the `sdc preflight` design already identified: *"Pass the
same bytes from these files to the child; never rebuild or enrich the prompt
after preflight."* Today that is a documented instruction. Binding the token to
an intent hash makes it mechanical.

**3. Preserve `preflight` exit-code semantics as the CLI surface.**

`aexos sdc preflight` already returns 0 for proceed and 5 for governance
rejection. That contract is good and stays — it becomes a thin CLI wrapper over
the same evaluation the runtime performs, rather than a parallel implementation.

**4. Hooks keep tool-level enforcement; the runtime takes dispatch-level.**

A clean split, so neither layer is asked to do what it cannot:

| Layer | Enforces | Mechanism |
|---|---|---|
| `.claude/hooks/` (`PreToolUse`) | Article II — who may run which tool | exit 2 to block |
| `AgentRuntime` | Article XII — budget, story binding, intent scanning | token or rejection |

**5. Every governance decision is recorded, in both directions.**

Rejections are already logged. Approvals must be too, with the budget consumed
and the story bound. Without approval records the ledger is a log of refusals,
and the deferred cryptographic mission ledger has nothing truthful to sign.

## Consequences

### Positive

- Article XII becomes enforced on the path that carries 100% of real work,
  rather than on two rarely-used entrypoints.
- Budget ceilings become real. Today an agent dispatching outside `pm.sh` has no
  ceiling at all.
- Story binding becomes enforceable, which makes Article III ("no code without a
  story") checkable rather than advisory.
- Injection scanning covers automated dispatch generally, not just one script.
- Approval records give the SOC2 / ISO27001 narrative an auditable substrate —
  the enterprise story the strategic roadmap wants, grounded in something real.
- The governance code stops being dead weight and becomes the thing the product
  is sold on.

### Negative

- **Governance moves onto the latency path of every dispatch.** Evaluation must
  be fast and must not perform I/O per call; budget state needs an in-process
  cache with periodic flush. A slow gate will be disabled by users, which is
  worse than no gate.
- A hard stop at 100% budget will interrupt long autonomous runs. Correct per
  XII-A, but it changes the failure mode users experience and needs a clear
  escalation path.
- Token binding means the prompt cannot be enriched after evaluation. Any code
  that currently mutates a prompt late must be found and changed.
- Adds a mandatory dependency from the runtime to `core/permissions/`, coupling
  two subsystems that are currently independent.

### Neutral

- No constitutional amendment required — this implements existing articles
  rather than adding any.
- Hook-level enforcement is unchanged in scope; it is simply repaired (Wave 0)
  and given a defined boundary.

## Alternatives considered

**Leave governance in `sdc preflight` and require all work to go through SDC.**
Rejected: it assumes users adopt one entrypoint, and the diagnostic shows they do
not — the Claude Code skill path is where work happens. Policy that depends on
users choosing the governed road is not policy.

**Enforce Article XII entirely in `.claude/hooks/`.** Rejected: hooks observe
tool calls, not model dispatch. They cannot see token spend or bind a story, and
the approach would not port to Gemini CLI, Codex or any non-hook runtime —
violating Article XI's portability requirement.

**Make governance advisory (warn, do not block).** Rejected: Article XII-D
specifies that failed scans are "rejected, logged, and never executed". Advisory
governance is what the system has now, and the diagnostic shows what it is
worth.
