# SYNAPSE 8-Layer Architecture Reference

> **Designed surface, not runtime behaviour.** Only L0, L1 and L2 execute by
> default (decision **NOG-18**); L3–L7 require `SYNAPSE_LEGACY_MODE=true`, and
> several have unmet preconditions or defects even then. See
> [runtime-state.md](runtime-state.md) for what actually runs.

## Overview

SYNAPSE defines an 8-layer pipeline. Each layer has a specific purpose, trigger condition, and priority level. The engine orchestrator (`.aexos-core/core/synapse/engine.js`) instantiates all eight, executes the ones in the active set, and the output formatter produces the final `<synapse-rules>` XML block.

## Layer Pipeline

```
L0 Constitution → L1 Global → L2 Agent → L3 Workflow → L4 Task → L5 Squad → L6 Keyword → L7 Star-Command
[------- default active set -------]  [------------- off unless SYNAPSE_LEGACY_MODE=true -------------]
```

Layers execute in order. Layers outside the active set are recorded as `skipped`
in `.synapse/metrics/hook-metrics.json`. Each executed layer's output is
collected and passed to the formatter.

## Layer Status Summary

| Layer | Default | Produces output today? |
|-------|---------|------------------------|
| L0 Constitution | Active | Yes |
| L1 Global | Active | Yes |
| L2 Agent | Active | No — `session.active_agent.id` is never populated |
| L3 Workflow | Off | No |
| L4 Task | Off | No |
| L5 Squad | Off | No |
| L6 Keyword | Off | No — no domain declares `RECALL` |
| L7 Star-Command | Off | No — parsing defect, see [runtime-state.md](runtime-state.md) |

## Layer Details

### L0: Constitution (NON-NEGOTIABLE)

| Property | Value |
|----------|-------|
| **Purpose** | Enforce inviolable framework principles (6 articles) |
| **Trigger** | Always active (`ALWAYS_ON=true`, `NON_NEGOTIABLE=true`) |
| **Priority** | Highest — cannot be overridden by any other layer |
| **Domain file** | `.synapse/constitution` |
| **Source** | Auto-generated from `.aexos-core/constitution.md` via `generate-constitution.js` |
| **Implementation** | `.aexos-core/core/synapse/layers/l0-constitution.js` |

**Articles:** CLI First, Agent Authority, Story-Driven Development, No Invention, Quality First, Absolute Imports.

### L1: Global + Context

| Property | Value |
|----------|-------|
| **Purpose** | Universal rules applied to all prompts + bracket-specific behavior |
| **Trigger** | Always active (`ALWAYS_ON=true`) |
| **Priority** | High — applies to every prompt regardless of context |
| **Domain files** | `.synapse/global`, `.synapse/context` |
| **Implementation** | `.aexos-core/core/synapse/layers/l1-global.js` |

**Content:** Coding standards, import rules, TypeScript rules, error handling patterns, bracket-specific context rules.

### L2: Agent-Scoped

| Property | Value |
|----------|-------|
| **Purpose** | Inject agent-specific rules when an agent is active |
| **Trigger** | `AGENT_TRIGGER` in the manifest matches `session.active_agent.id` |
| **Priority** | Medium-high — only active when agent is activated |
| **Domain files** | `.synapse/agent-dev`, `.synapse/agent-qa`, `.synapse/agent-architect`, etc. (12 total) |
| **Implementation** | `.aexos-core/core/synapse/layers/l2-agent.js` |

**Agents covered:** dev, qa, architect, pm, po, sm, devops, analyst, data-engineer, ux (ux-design-expert), aexos-master, squad-creator.

**In the active set, but silent.** L2 needs `session.active_agent.id`, which
nothing populates — the UAP publishes the active agent to
`.synapse/sessions/_active-agent.json` instead, and the engine's session object
never reads it. If that gap is closed, L2 injects 11 rules / +947 chars for
`@dev`, in a formatter section that budget truncation cannot reclaim. Details
and the open ADR: [runtime-state.md](runtime-state.md).

### L3: Workflow-Scoped

| Property | Value |
|----------|-------|
| **Purpose** | Inject workflow-specific rules when a workflow is active |
| **Trigger** | `WORKFLOW_TRIGGER` matches `session.active_workflow.id` |
| **Priority** | Medium — active during specific development workflows |
| **Domain files** | `.synapse/workflow-story-dev`, `.synapse/workflow-epic-create`, `.synapse/workflow-arch-review` |
| **Implementation** | `.aexos-core/core/synapse/layers/l3-workflow.js` |
| **Default** | **Off** (NOG-18). Works under legacy mode when `session.active_workflow.id` is set — verified to emit 9 rules for `story_development`. Nothing sets that field today. |

### L4: Task Context

| Property | Value |
|----------|-------|
| **Purpose** | Inject context about the currently active task |
| **Trigger** | Active task detected in session state |
| **Priority** | Medium — active during task execution |
| **Domain files** | Dynamic (injected from session context) |
| **Implementation** | `.aexos-core/core/synapse/layers/l4-task.js` |
| **Default** | **Off** (NOG-18). Works under legacy mode when `session.active_task` is set. Nothing sets that field today. |

### L5: Squad Discovery

| Property | Value |
|----------|-------|
| **Purpose** | Discover and inject rules from active squad domains |
| **Trigger** | Squad is active in session |
| **Priority** | Medium-low — only when working with squads |
| **Domain files** | Squad-specific domains (discovered at runtime) |
| **Implementation** | `.aexos-core/core/synapse/layers/l5-squad.js` |
| **Default** | **Off** (NOG-18), and inert even in legacy mode — no session field is ever populated with an active squad. The squad context-extension surface is advertised but not reachable. |

### L6: Keyword (RECALL)

| Property | Value |
|----------|-------|
| **Purpose** | Activate domains when user prompt contains matching keywords |
| **Trigger** | User prompt contains keyword listed in domain's `RECALL` field |
| **Priority** | Low — optional, skipped in DEPLETED bracket to conserve tokens |
| **Domain files** | Any domain with `RECALL` key in manifest |
| **Implementation** | `.aexos-core/core/synapse/layers/l6-keyword.js` |
| **Default** | **Off** (NOG-18). Also inert by data: no domain in `.synapse/manifest` declares `RECALL` (0 of 19), so there is nothing to match. |

### L7: Star-Command

| Property | Value |
|----------|-------|
| **Purpose** | Detect and inject mode-switching commands (`*brief`, `*dev`, `*synapse status`, etc.) |
| **Trigger** | User types `*command` in prompt |
| **Priority** | Highest for explicit commands — user intent is paramount |
| **Domain file** | `.synapse/commands` |
| **Implementation** | `.aexos-core/core/synapse/layers/l7-star-command.js` |
| **Default** | **Off** (NOG-18), and **broken** even in legacy mode. `_parseCommandBlocks()` expects `[*command]` header lines, but `.synapse/commands` writes those headers as `#` comments, which `loadDomainFile()` strips. No block ever matches, so L7 always returns `null`. Star-command modes inject nothing. |

## Pipeline Execution Flow

```
1. Hook receives UserPromptSubmit event (stdin JSON)
2. Hook runtime resolves core-config, parses .synapse/manifest, loads the session
3. Engine calculates the context bracket (prompt count → percent → bracket)
4. Engine selects the active layer set:
   - default:      DEFAULT_ACTIVE_LAYERS = [0, 1, 2]   (bracket ignored)
   - legacy mode:  getActiveLayers(bracket)            (bracket honoured)
5. For each active layer, in order:
   a. Layer processor loads relevant domain(s)
   b. Rules are filtered/resolved
   c. Layer output is collected; layers outside the set are marked skipped
6. Memory bridge consulted (if pro available, DEPLETED/CRITICAL brackets)
7. Formatter assembles <synapse-rules> XML within the bracket's token budget
8. Metrics written to .synapse/metrics/hook-metrics.json (fire-and-forget)
9. Output written to stdout (appended to user prompt)
```

## Conflict Resolution

These are **authoring conventions for rule writers**, expressing intended
precedence in the emitted text. The engine does not implement conflict
detection or resolution — it concatenates each layer's rules into ordered
sections and lets the model apply them.

1. **NON_NEGOTIABLE wins** — L0 Constitution rules cannot be overridden
2. **Higher layer number = more specific** — L7 Star-Command overrides L1 Global for the current prompt
3. **Agent > Global** — L2 agent-scoped rules take precedence over L1 global rules
4. **Workflow > Agent** — L3 workflow rules can augment L2 agent rules
5. **Explicit > Implicit** — Star-commands (explicit user intent) override automatic rules

With only L0–L2 active, rules 2, 4 and 5 do not apply in practice.

## Output Format

### What the default pipeline emits today

```xml
<synapse-rules>

[CONTEXT BRACKET]
CONTEXT BRACKET: [FRESH] (99.1% remaining)
[FRESH] CONTEXT RULES:
  ... L1 global + context rules ...
[CONSTITUTION] (NON-NEGOTIABLE)
  ... L0 constitution articles ...

</synapse-rules>
```

Two sections, ~3.7 KB. No `AGENT` section, because L2 has no active agent to
match (see [runtime-state.md](runtime-state.md)).

### Full designed output (all layers producing)

```xml
<synapse-rules>
[CONTEXT BRACKET: MODERATE] 40-60% context remaining
[CONSTITUTION] (NON-NEGOTIABLE) CLI First | Agent Authority | Story-Driven | No Invention | Quality First | Absolute Imports
[ACTIVE AGENT: @dev] Follow story tasks, update Dev Agent Record only, CodeRabbit pre-commit
[ACTIVE WORKFLOW: story_development] Follow SDC phases, update checkboxes
[TASK CONTEXT] Current task details
[SQUAD: mmos] Squad-specific rules
[STAR-COMMANDS] *dev: Code over explanation, minimal changes
[DEVMODE STATUS] Pipeline metrics (if devmode enabled)
[LOADED DOMAINS SUMMARY] constitution, global, context, agent-dev, workflow-story-dev, commands
</synapse-rules>
```

The `DEVMODE STATUS` section is gated on `config.devmode`, which the hook never
sets. `DEVMODE=true` in `.synapse/manifest` is parsed but not forwarded, so this
section cannot currently appear.

**Section ordering** (highest priority first):
1. CONTEXT_BRACKET
2. CONSTITUTION
3. AGENT
4. WORKFLOW
5. TASK
6. SQUAD
7. KEYWORD
8. MEMORY_HINTS
9. STAR_COMMANDS
10. DEVMODE
11. SUMMARY

## Performance Targets

| Metric | Target | Hard Limit |
|--------|--------|------------|
| Total pipeline | <70ms | <100ms |
| Individual layer | <15ms | <20ms (L0/L7: <5ms) |
| Startup (.synapse/ discovery) | <5ms | <10ms |
| Session I/O | <10ms | <15ms |

**Timeout behavior — two distinct mechanisms:**

- **Per-layer timeout is advisory only.** `LayerProcessor._safeProcess()` measures
  elapsed time *after* `process()` returns and emits a `console.warn` if the
  budget was exceeded. The layer's result is kept. Nothing is cancelled or
  skipped.
- **The pipeline timeout is enforced.** `SynapseEngine.process()` checks total
  elapsed time before each layer; once the budget is exhausted, all remaining
  layers are marked `skipped` and the loop breaks. Default 100 ms, overridable
  via `AEXOS_SYNAPSE_PIPELINE_TIMEOUT_MS` or `synapse.pipelineTimeoutMs`.

On error, a layer returns `null` and the pipeline continues. The pipeline never
blocks the prompt.

## Source Files

| File | Purpose |
|------|---------|
| `.aexos-core/core/synapse/engine.js` | SynapseEngine orchestrator, `DEFAULT_ACTIVE_LAYERS`, `LEGACY_MODE` |
| `.aexos-core/core/synapse/runtime/hook-runtime.js` | Config, manifest and session resolution for the hook |
| `.aexos-core/core/synapse/layers/l0-constitution.js` | L0 processor |
| `.aexos-core/core/synapse/layers/l1-global.js` | L1 processor |
| `.aexos-core/core/synapse/layers/l2-agent.js` | L2 processor |
| `.aexos-core/core/synapse/layers/l3-workflow.js` | L3 processor |
| `.aexos-core/core/synapse/layers/l4-task.js` | L4 processor |
| `.aexos-core/core/synapse/layers/l5-squad.js` | L5 processor |
| `.aexos-core/core/synapse/layers/l6-keyword.js` | L6 processor |
| `.aexos-core/core/synapse/layers/l7-star-command.js` | L7 processor |
| `.aexos-core/core/synapse/layers/layer-processor.js` | Abstract base class |
| `.aexos-core/core/synapse/output/formatter.js` | XML formatter + token budget |
| `.claude/hooks/synapse-wrapper.cjs` | Hook entry point registered in `.claude/settings.json` |
| `.claude/hooks/synapse-engine.cjs` | Hook implementation, spawned by the wrapper |
