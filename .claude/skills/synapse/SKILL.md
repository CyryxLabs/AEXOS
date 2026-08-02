---
name: synapse
description: "This skill should be used when users want to understand the SYNAPSE context engine, manage domains, configure context rules, or troubleshoot rule injection. Use when asked about SYNAPSE architecture, domain management, star-commands, context brackets, or the 8-layer processing pipeline."
---

# SYNAPSE Context Engine

> **Read [references/runtime-state.md](references/runtime-state.md) before acting
> on anything below.** This document describes the designed capability surface.
> Three of the eight layers run by default, and several documented behaviours
> (star-commands, `*synapse` queries, domain toggling, `DEVMODE`) are inert.

## Overview

SYNAPSE (AEXOS Adaptive Processing & State Engine) is the unified context engine for AEXOS. It injects contextual rules into every prompt via an 8-layer processing pipeline, adapting to context window usage through bracket-aware filtering.

**What it does:**
- Injects rules per-prompt via Claude Code's `UserPromptSubmit` hook
- Defines 8 layers (L0 Constitution through L7 Star-Commands); **L0–L2 execute by default** (NOG-18), L3–L7 need `SYNAPSE_LEGACY_MODE=true`
- Scales the token budget by context bracket (FRESH/MODERATE/DEPLETED/CRITICAL); bracket-based *layer* filtering is superseded by native `/compact`
- Reads agent state (active agent, workflow, task, squad) — none of which is currently populated in the session object
- Outputs `<synapse-rules>` XML block appended to each prompt

**What it replaces:** SYNAPSE replaces the legacy CARL system with full feature parity plus 8 new capabilities including agent-scoped domains, workflow activation, and CRUD management commands.

**Architecture model:** Open Core — the 8-layer engine lives in `aexos-core` (open source), memory integration is feature-gated in `aexos-pro`.

## Quick Start

### Verify SYNAPSE is Active

SYNAPSE runs automatically via the Claude Code hook. To inspect what it did:

```
/synapse:tasks:diagnose-synapse
```

This shows: hook status, session state, manifest integrity, pipeline simulation,
and gaps with recommended fixes. Raw per-layer results land in
`.synapse/metrics/hook-metrics.json` after every prompt.

### Basic Commands

| Command | What it does |
|---------|-------------|
| `/synapse:tasks:diagnose-synapse` | Full engine diagnostic (**this is the working status command**) |
| `*synapse create` / `add` / `edit` / `suggest` | CRUD on domains and rules — dispatched by the manager |
| `*synapse status` / `domains` / `debug` / `help` | **Inert** — L7 star-commands, see runtime-state.md |
| `*brief` / `*dev` / `*review` | **Inert** — mode switching is not injected |

### Create a Custom Domain

```
*synapse create
```

This walks you through creating a new domain file + manifest entry. See [references/domains.md](references/domains.md) for the full domain guide.

## Architecture

SYNAPSE operates as a 4-layer architecture:

```
.claude/hooks/synapse-wrapper.cjs        # Layer 1: Hook Entry (spawns the engine hook)
`-- .claude/hooks/synapse-engine.cjs     #   Hook implementation (stdin -> stdout)
        |
        v imports
.aexos-core/core/synapse/                 # Layer 2: Engine Modules
|-- runtime/hook-runtime.js              #   Config + manifest + session resolution
|-- engine.js                            #   SynapseEngine class
|-- layers/                              #   8 layer processors (L0-L7; L0-L2 active)
|-- session/session-manager.js           #   Session state (JSON v2.0)
|-- domain/domain-loader.js              #   Manifest + domain parser
|-- context/context-tracker.js           #   Bracket calculation
|-- memory/memory-bridge.js              #   Pro-gated MIS consumer
|-- output/formatter.js                  #   <synapse-rules> XML
        |
        v reads/writes
.synapse/                                # Layer 3: Runtime Data
|-- manifest                             #   Central domain registry (KEY=VALUE)
|-- constitution, global, context        #   Core domains (L0, L1)
|-- agent-*, workflow-*                  #   Scoped domains (L2, L3)
|-- commands                             #   Star-command definitions (L7)
|-- sessions/, cache/                    #   Session state (gitignored)
        |
        v user-invoked
.claude/commands/synapse/                # Layer 4: CRUD Commands + Skill Docs
|-- manager.md                           #   Router/dispatcher
|-- tasks/ (7 tasks)                     #   create, add, edit, toggle, command, suggest, diagnose
```

**Key principle:** SYNAPSE is a **consumer** of existing systems (UAP for session state, MIS for memories). It never rewrites code from other epics.

## References

### Reference Guides

| Guide | Description |
|-------|-------------|
| [runtime-state.md](references/runtime-state.md) | **What actually runs** — authoritative; overrides the guides below where they disagree |
| [domains.md](references/domains.md) | Domain types (L0-L7), KEY=VALUE format, creation guide |
| [commands.md](references/commands.md) | Star-commands, *synapse sub-commands, CRUD operations |
| [manifest.md](references/manifest.md) | Manifest format specification, all valid keys |
| [brackets.md](references/brackets.md) | Context bracket system, token budgets, layer activation |
| [layers.md](references/layers.md) | 8-layer processor architecture, priority, conflict resolution |

### Assets (Templates)

Templates for creating custom domains and manifest entries are maintained at:

- **Domain template:** `.claude/commands/synapse/templates/domain-template`
- **Manifest entry template:** `.claude/commands/synapse/templates/manifest-entry-template`

See [assets/README.md](assets/README.md) for details.

### CRUD Commands

For domain management operations, use the SYNAPSE manager:

| Command | Purpose |
|---------|---------|
| `*synapse create` | Create new domain + manifest entry |
| `*synapse add` | Add rule to existing domain |
| `*synapse edit` | Edit or remove rule by index |
| `*synapse toggle` | Toggle domain active/inactive — writes the manifest, but no layer reads `STATE` |
| `*synapse command` | Create new star-command — writes correctly, but L7 will not inject it |
| `*synapse suggest` | Suggest best domain for a rule |

Full details: [references/commands.md](references/commands.md)

## Key Files

| File | Purpose |
|------|---------|
| `.claude/hooks/synapse-wrapper.cjs` | Hook entry point registered in `.claude/settings.json` |
| `.claude/hooks/synapse-engine.cjs` | Hook implementation, spawned by the wrapper |
| `.aexos-core/core/synapse/runtime/hook-runtime.js` | Config, manifest and session resolution |
| `.aexos-core/core/synapse/engine.js` | SynapseEngine orchestrator |
| `.synapse/manifest` | Domain registry (KEY=VALUE) |
| `.synapse/commands` | Star-command definitions |
| `.claude/commands/synapse/manager.md` | CRUD command router |
