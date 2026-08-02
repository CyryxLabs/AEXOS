# SYNAPSE Runtime State — What Actually Runs

> **This is the authoritative description of SYNAPSE's runtime behaviour.**
> The other reference guides describe the *designed* capability surface. Where
> they disagree with this file, this file wins. Verified by executing the engine
> in this repository on 2026-08-01 (story AEX-0.8).

## TL;DR

SYNAPSE ships an 8-layer pipeline but **runs three layers by default**: L0
Constitution, L1 Global, L2 Agent. L3–L7 are compiled, loaded and instantiated,
but excluded from the default active set.

```js
// .aexos-core/core/synapse/engine.js
const DEFAULT_ACTIVE_LAYERS = [0, 1, 2];
const LEGACY_MODE = process.env.SYNAPSE_LEGACY_MODE === 'true';
```

This was a deliberate decision (**NOG-18**), not a regression. The NOG-17 audit
found L3–L7 contributing 0 rules in practice, so they were switched off to
remove their cost from the per-prompt hook budget.

## Measured baseline

Driving the engine directly with the manifest wired (a normal session, no active
agent) produces:

| Layer | Status | Rules |
|-------|--------|-------|
| L0 constitution | ok | 34 |
| L1 global | ok | 25 |
| L2 agent | skipped — *returned null* | — |
| L3 workflow | skipped — *not active in FRESH* | — |
| L4 task | skipped — *not active in FRESH* | — |
| L5 squad | skipped — *not active in FRESH* | — |
| L6 keyword | skipped — *not active in FRESH* | — |
| L7 star-command | skipped — *not active in FRESH* | — |

**2 layers loaded, 6 skipped, 59 rules, 3,727 bytes of injected XML.**

The same call with `session.active_agent.id = 'dev'` produces **4,674 bytes** —
L2 contributes 11 rules / +947 characters (~237 tokens) when its precondition is
met. Nothing in a real session meets it; see below.

## Layer Status Matrix

| Layer | Name | Default | Under `SYNAPSE_LEGACY_MODE=true` | Notes |
|-------|------|---------|----------------------------------|-------|
| L0 | Constitution | **Active** | Active | Produces rules on every prompt |
| L1 | Global + Context | **Active** | Active | Produces rules on every prompt |
| L2 | Agent-scoped | **Active** | Active | Runs, but gated — see below |
| L3 | Workflow-scoped | Off | MODERATE+ brackets | Needs `session.active_workflow.id` |
| L4 | Task context | Off | MODERATE+ brackets | Needs `session.active_task` |
| L5 | Squad discovery | Off | MODERATE+ brackets | Needs `session.active_squad` |
| L6 | Keyword (RECALL) | Off | MODERATE+ brackets | Inert: no domain declares `RECALL` |
| L7 | Star-commands | Off | All brackets | **Broken** — see "Known defects" |

Legacy mode restores bracket-based filtering, and `LAYER_CONFIGS.FRESH` is
`[0, 1, 2, 7]` — so in a fresh session even legacy mode does not run L3–L6. Only
MODERATE, DEPLETED and CRITICAL enable the full stack.

"Available" does **not** mean anything populates the layer's precondition today —
see the next section.

## The session-state gap (why L2 is active but silent)

L2 is in the default active set, yet it injects nothing in a normal session.
Two independent conditions must hold, and only one of them is currently
satisfiable:

1. **The manifest must reach the layer.** `.synapse/manifest` is SYNAPSE's
   domain routing table; L2 resolves its domain by matching `AGENT_TRIGGER`
   against the active agent. This was broken —
   `runtime/hook-runtime.js` constructed `SynapseEngine` without a `manifest`,
   so `engine.js` resolved `manifest: {}` and L2 always returned `null`.
   **Fixed:** the hook runtime now parses the manifest via `parseManifest()` and
   passes it to the engine. Verified: 19 domains reach the engine.

2. **`session.active_agent.id` must be populated.** It is not. The Unified
   Activation Pipeline writes `.synapse/sessions/_active-agent.json` (a
   singleton bridge file, deliberately avoiding `updateSession()` to dodge
   `prompt_count` side effects), but nothing copies that value into the session
   object the hook passes to the engine. `session.active_agent.id` stays `null`
   for the entire session, so L2 returns `null` at its first guard.

The SYNAPSE diagnostics collectors already fall back to the bridge file
(`session?.active_agent?.id || bridgeData?.id`); the layers do not. **Closing
this gap is an open decision, not an oversight** — it requires its own ADR with
the NOG-17 audit repeated as evidence, because it turns L2 injection on for
every session.

Note that the formatter's token-budget truncation treats `AGENT` as a protected
section, so once wired, that +947 characters cannot be reclaimed under budget
pressure.

## What context brackets still do

Brackets (FRESH / MODERATE / DEPLETED / CRITICAL) are **still computed on every
prompt**, but their role is reduced. Bracket-based *layer filtering* is bypassed
— that job was handed to Claude Code's native `/compact`.

| Bracket still drives | Bracket no longer drives |
|----------------------|--------------------------|
| Token budget (800 / 1500 / 2000 / 2500) | Which layers are active |
| Section truncation order in the formatter | — |
| Memory hints (DEPLETED, CRITICAL) | — |
| Handoff warning (CRITICAL) | — |
| The `[CONTEXT BRACKET]` header in the output | — |

`getActiveLayers(bracket)` from `context-tracker.js` is only called under
`SYNAPSE_LEGACY_MODE=true`. Its `LAYER_CONFIGS` table is therefore dormant
configuration in the default path.

## Manifest keys: parsed vs enforced

`parseManifest()` reads every documented key, but not every key is consulted.

| Key | Parsed | Enforced at runtime |
|-----|--------|---------------------|
| `{PREFIX}_STATE` | Yes | **No** — no layer reads `domain.state` (diagnostics only) |
| `{PREFIX}_ALWAYS_ON` | Yes | **No** — L0/L1 are unconditional in code |
| `{PREFIX}_NON_NEGOTIABLE` | Yes | Metadata only; the formatter ignores it |
| `{PREFIX}_AGENT_TRIGGER` | Yes | **Yes** — L2 domain resolution |
| `{PREFIX}_WORKFLOW_TRIGGER` | Yes | Yes, but only in legacy mode (L3) |
| `{PREFIX}_RECALL` | Yes | L6 only, and no domain declares it |
| `{PREFIX}_EXCLUDE` | Yes | Not consulted by L0–L2 |
| `DEVMODE` | Yes | **No** — the engine reads `config.devmode`, which the hook never sets from the manifest |

Practical consequence: `*synapse toggle {domain}` writes `STATE=inactive` to the
manifest, and **nothing changes** — no layer checks it. Likewise setting
`DEVMODE=true` in the manifest does not enable the debug section. The manifest
currently carries 19 `_STATE` declarations, all inert.

## Per-layer timeouts are advisory

`LayerProcessor._safeProcess()` records `Date.now()` before and after calling
`process()`, and warns if the elapsed time exceeded the layer's budget. The
measurement happens **after** `process()` has already returned, so a slow layer
is never interrupted and its result is still used. There is no per-layer
cancellation.

The *pipeline* timeout is different and does take effect: `engine.process()`
checks elapsed time before starting each layer and breaks out of the loop when
the budget (default 100 ms, `AEXOS_SYNAPSE_PIPELINE_TIMEOUT_MS`) is exceeded,
marking the remaining layers as skipped.

## Known defects (documented, not fixed)

- **L7 star-commands cannot match.** `.synapse/commands` stores rules in
  KEY=VALUE form, with the block delimiters (`# [*brief] COMMAND:`) written as
  *comments*. `loadDomainFile()` strips comments, so `_parseCommandBlocks()`
  never sees a `[*command]` header, never sets `currentCommand`, and returns an
  empty block map. Measured: the loader yields 38 rules from that file and **0**
  `[*command]` headers; `L7.process()` returns `null` for a prompt containing
  both `*brief` and `*dev`. This holds in legacy mode too, where L7 *is* in the
  FRESH active set — it is recorded as `skipped: Returned null`, not as
  bracket-filtered. **Every star-command mode is inert, independently of
  NOG-18.**
- **L6 has no data.** No manifest domain declares `RECALL` (measured: 0 of 19),
  so keyword activation has nothing to match. The layer code is fine; the
  registry is empty.
- **L5 squad context is inert.** The squad extension surface is advertised in
  the squad docs but no session field is ever populated with an active squad.

## Reproducing these findings

```bash
# Default pipeline — layer status and rule counts land here after any prompt
cat .synapse/metrics/hook-metrics.json

# Full engine diagnostic
node -e "const {runDiagnostics}=require('./.aexos-core/core/synapse/diagnostics/synapse-diagnostics');console.log(runDiagnostics(process.cwd()))"

# Drive the engine directly and print per-layer status
node -e "
const path = require('path');
const { SynapseEngine } = require('./.aexos-core/core/synapse/engine.js');
const { parseManifest } = require('./.aexos-core/core/synapse/domain/domain-loader');
const synapsePath = path.join(process.cwd(), '.synapse');
const manifest = parseManifest(path.join(synapsePath, 'manifest'));
new SynapseEngine(synapsePath, { manifest })
  .process('*brief *dev implement login', { prompt_count: 5 }, {})
  .then(r => console.log(r.metrics.layers_loaded, r.metrics.total_rules, r.xml.length));
"

# Compare default vs legacy layer activation
SYNAPSE_LEGACY_MODE=true node -e "...same as above..."
```

## Re-enabling the full pipeline

```bash
export SYNAPSE_LEGACY_MODE=true
```

This restores bracket-based filtering and puts L3–L7 back in the bracket tables.
It does **not** repair the session-state gap or the L7 parsing defect, so expect
L3–L5 to stay silent unless you populate the session yourself, and L7 to stay
silent unconditionally.

Turning legacy mode on permanently is an open architectural decision
(*document-down* vs *build-up*) tracked in the AEXOS Evolution epic. It requires
an ADR with the NOG-17 audit repeated as evidence.

## Source of truth

| Claim | File |
|-------|------|
| Default active layers | `.aexos-core/core/synapse/engine.js` (`DEFAULT_ACTIVE_LAYERS`) |
| Legacy toggle | `.aexos-core/core/synapse/engine.js` (`LEGACY_MODE`) |
| Pipeline timeout enforcement | `.aexos-core/core/synapse/engine.js` (`resolvePipelineTimeoutMs`) |
| Advisory per-layer timeout | `.aexos-core/core/synapse/layers/layer-processor.js` (`_safeProcess`) |
| Manifest wiring | `.aexos-core/core/synapse/runtime/hook-runtime.js` |
| Bracket config (dormant) | `.aexos-core/core/synapse/context/context-tracker.js` (`LAYER_CONFIGS`) |
| L2 gating | `.aexos-core/core/synapse/layers/l2-agent.js` |
| L7 block parsing | `.aexos-core/core/synapse/layers/l7-star-command.js` (`_parseCommandBlocks`) |
| Comment stripping | `.aexos-core/core/synapse/domain/domain-loader.js` (`loadDomainFile`) |
| UAP bridge file writer | `.aexos-core/development/scripts/unified-activation-pipeline.js` (`_writeSynapseSession`) |
| Token budget + truncation | `.aexos-core/core/synapse/output/formatter.js` (`enforceTokenBudget`) |
