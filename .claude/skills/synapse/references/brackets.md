# SYNAPSE Context Brackets Reference

> **Partially superseded.** Bracket-based *layer selection* is bypassed
> (decision **NOG-18**) — that job now belongs to Claude Code's native
> `/compact`. Brackets are still computed on every prompt and still drive the
> token budget, truncation, memory hints and the handoff warning. See
> [runtime-state.md](runtime-state.md).

## Overview

Context brackets track how much context window remains and scale SYNAPSE's injection accordingly.

The bracket system is implemented in `.aexos-core/core/synapse/context/context-tracker.js`.

## What brackets do and no longer do

| Still in effect | Superseded |
|-----------------|------------|
| Token budget per bracket (800 / 1500 / 2000 / 2500) | Choosing which layers run |
| Section truncation order in the formatter | — |
| Memory hints (DEPLETED, CRITICAL) | — |
| Handoff warning (CRITICAL) | — |
| The `[CONTEXT BRACKET]` header in the output | — |

`getActiveLayers(bracket)` is only called when `SYNAPSE_LEGACY_MODE=true`. In the
default path the engine uses a fixed `DEFAULT_ACTIVE_LAYERS = [0, 1, 2]`
regardless of bracket.

## The 4 Brackets

| Bracket | Context Remaining | Token Budget | Behavior |
|---------|-------------------|-------------|----------|
| **FRESH** | 60-100% | ~800 tokens | Lean injection — essentials only |
| **MODERATE** | 40-60% | ~1500 tokens | Standard injection — all layers active |
| **DEPLETED** | 25-40% | ~2000 tokens | Reinforcement — reinforce critical rules, memory hints enabled |
| **CRITICAL** | <25% | ~2500 tokens | Handoff warning — recommend session handoff, document state |

## How Brackets Are Calculated

The context tracker estimates remaining context using:

```
contextPercent = 100 - ((promptCount * avgTokensPerPrompt * 1.2) / maxContext * 100)
```

The `1.2` is `XML_SAFETY_MULTIPLIER` — `chars/4` underestimates XML-heavy output
by 15–25%, so the estimate is inflated to compensate.

**Default values:**
- `avgTokensPerPrompt`: 1500
- `maxContext`: 200000

Both are read from `core-config.yaml` → `models.registry[models.active]`, cached
per project root, and fall back to the constants above when the config is
missing or malformed. The bracket therefore tracks the *configured* active
model, not the model actually serving the session.

**Bracket assignment:**
- `contextPercent >= 60` → FRESH
- `contextPercent >= 40` → MODERATE
- `contextPercent >= 25` → DEPLETED
- `contextPercent < 25` → CRITICAL

Invalid or NaN input defaults to CRITICAL (fail-safe).

## Layer Activation per Bracket

> **Dormant configuration.** The `LAYER_CONFIGS` table below is only consulted
> under `SYNAPSE_LEGACY_MODE=true`. By default every bracket runs L0, L1 and L2.
> The Memory Hints and Handoff Warning columns *do* still apply in both modes.

| Bracket | Active Layers (legacy mode) | Active Layers (default) | Memory Hints | Handoff Warning |
|---------|-----------------------------|-------------------------|-------------|-----------------|
| **FRESH** | L0, L1, L2, L7 | L0, L1, L2 | No | No |
| **MODERATE** | L0-L7 (all) | L0, L1, L2 | No | No |
| **DEPLETED** | L0-L7 (all) | L0, L1, L2 | Yes | No |
| **CRITICAL** | L0-L7 (all) | L0, L1, L2 | Yes | Yes |

**Key behavior:**
- **FRESH / MODERATE**: identical layer set in the default path
- **DEPLETED**: Memory hints from MIS enabled (when pro available) to reinforce context
- **CRITICAL**: Handoff warning injected, recommending session continuation in new window

## Bracket-Specific Rules

The `.synapse/context` domain file contains rules that vary by bracket. These
are **text injected for the model to follow**, not engine configuration — the
formatter selects the block matching the current bracket and emits it under
`[{BRACKET}] CONTEXT RULES:`. Statements below that sound like engine behaviour
(e.g. "skip optional layers") are instructions to the model, and some no longer
correspond to anything the engine does, since L3–L7 are already off.

### FRESH Rules
- Minimize injected rules to essentials only
- Avoid redundant context — agent has full conversation history
- Full layer stack available but lean injection

### MODERATE Rules
- All layers active at normal priority
- Monitor token usage — consider summarizing long outputs
- Prefer concise code examples over verbose explanations

### DEPLETED Rules
- Reinforce critical rules and constraints
- Prefer concise responses to save tokens
- Skip optional layers (L6 keyword domains) to conserve
- Summarize progress before each action

### CRITICAL Rules
- Recommend session handoff
- Summarize current state for new session continuation
- Only inject L0 Constitution and L1 Global rules — skip other layers
- Document incomplete work in story file

## Token Budget Enforcement

The output formatter (`.aexos-core/core/synapse/output/formatter.js`) enforces token budgets:

1. Each bracket has a max token budget (800 / 1500 / 2000 / 2500)
2. Sections are rendered in priority order (CONSTITUTION first, SUMMARY last)
3. When budget is exceeded, whole sections are dropped in a fixed order until the output fits

**Removal order** (first removed first):
```
SUMMARY → KEYWORD → MEMORY_HINTS → SQUAD → STAR_COMMANDS → DEVMODE → TASK → WORKFLOW
```

**Never removed:** `CONTEXT_BRACKET`, `CONSTITUTION`, `AGENT`.

Two consequences worth knowing:

- Truncation is **all-or-nothing per section** — a section is dropped entirely,
  never trimmed. If the protected sections alone exceed the budget, the output
  simply exceeds the budget.
- `AGENT` is protected, so if L2 is ever wired to fire, its rules become
  non-reclaimable weight in every prompt.

In the default pipeline only `CONTEXT_BRACKET` and `CONSTITUTION` are ever
emitted, so nothing is removable and the budget is effectively unenforced.

## Source Files

| File | Purpose |
|------|---------|
| `.aexos-core/core/synapse/context/context-tracker.js` | Bracket calculation, token budgets, layer configs |
| `.synapse/context` | Bracket-specific context rules (L1) |
| `.aexos-core/core/synapse/output/formatter.js` | Token budget enforcement + truncation |
