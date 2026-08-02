# SYNAPSE Commands Reference

## Overview

SYNAPSE provides three categories of commands:
1. **Mode star-commands** — Switch response behavior (`*brief`, `*dev`, etc.) — **inert**
2. **`*synapse` sub-commands** — Query engine state — **inert**
3. **CRUD operations** — Create, modify, and manage domains and rules — **working**

> **Categories 1 and 2 do not work.** Both are served by L7, which is off by
> default (**NOG-18**) and additionally cannot parse its own domain file (see
> below). Only category 3 — Claude Code slash commands — functions. Full detail:
> [runtime-state.md](runtime-state.md).

## Mode Star-Commands (L7) — inert

These commands are *designed* to switch the response mode for the current
prompt. They are detected by L7 (Star-Command processor), which then loads
mode-specific rules from `.synapse/commands`.

**Why they do not work.** `.synapse/commands` stores rules in KEY=VALUE form
(`COMMANDS_RULE_BRIEF_0=...`) with the block delimiters written as comments
(`# [*brief] COMMAND:`). `loadDomainFile()` strips comments, so
`_parseCommandBlocks()` never sees a `[*command]` header, builds an empty block
map, and L7 returns `null`. Measured: 38 rules load from that file, 0 headers
survive. This holds even with `SYNAPSE_LEGACY_MODE=true` and `*brief` in the
prompt. Repairing it needs either the delimiters promoted out of comments or a
command-aware parser for the `COMMANDS_RULE_*` key structure.

| Command | Behavior |
|---------|----------|
| `*brief` | Bullet points only, max 5 items, no code blocks unless requested, skip preamble |
| `*dev` | Code over explanation, minimal changes, follow existing patterns, skip docs unless needed |
| `*review` | Check code quality and patterns, identify bugs/security issues, suggest improvements with rationale |
| `*plan` | Outline approach before implementation, list files to modify, identify risks, estimate complexity |
| `*discuss` | Explore trade-offs and alternatives, ask clarifying questions, present pros/cons, recommend with reasoning |
| `*debug` | Analyze error messages and stack traces, check common failure patterns, suggest targeted fixes |
| `*explain` | Explain in teaching detail, use analogies, show examples with code, build from basics to advanced |

**Usage:** Type the command anywhere in your prompt. The mode persists for that response.

**Source:** `.synapse/commands` (KEY=VALUE format, `COMMANDS_RULE_{MODE}_{INDEX}`)

## `*synapse` Sub-Commands — inert

These commands are designed to query the SYNAPSE engine state. They are handled
by the same L7 processor as the mode star-commands and are therefore **also
inert**.

| Command | What it was meant to do | Working alternative |
|---------|-------------------------|---------------------|
| `*synapse help` | Show available synapse commands | This document |
| `*synapse status` | Display active domains, layers, session info | `/synapse:tasks:diagnose-synapse` |
| `*synapse debug` | Manifest parse results, load times, rule counts | `cat .synapse/metrics/hook-metrics.json` |
| `*synapse domains` | List registered domains with state and triggers | `cat .synapse/manifest` |
| `*synapse session` | Active agent, workflow, bracket level | `cat .synapse/sessions/{session-id}.json` |
| `*synapse reload` | Force reload of manifest and domain files | Unnecessary — both are read from disk every prompt |

## CRUD Operations

These commands modify domain files and the manifest. They are implemented as Claude Code slash commands in `.claude/commands/synapse/`.

### Router

All CRUD operations go through the manager: `.claude/commands/synapse/manager.md`

The manager parses the sub-command and dispatches to the appropriate task file.

### Available Operations

| Command | Task File | Purpose |
|---------|-----------|---------|
| `*synapse create` | `tasks/create-domain.md` | Create new domain file + manifest entry |
| `*synapse add` | `tasks/add-rule.md` | Add a new rule to an existing domain |
| `*synapse edit` | `tasks/edit-rule.md` | Edit or remove a rule by index |
| `*synapse toggle` | `tasks/toggle-domain.md` | Toggle domain STATE between active/inactive — writes the manifest, but **no layer reads `STATE`**, so nothing changes |
| `*synapse command` | `tasks/create-command.md` | Create a new star-command definition — writes correctly, but L7 will not inject it |
| `*synapse suggest` | `tasks/suggest-domain.md` | Suggest the best domain for a given rule |
| `/synapse:tasks:diagnose-synapse` | `tasks/diagnose-synapse.md` | Full engine diagnostic + session timing report |

### Usage Examples

**Create a new domain:**
```
*synapse create
```
Prompts for: domain name, layer, description, initial rules.

**Add a rule to an existing domain:**
```
*synapse add global "Always prefer functional patterns over imperative"
```

**Toggle a domain off** (writes `STATE=inactive`; has no runtime effect today):
```
*synapse toggle agent-dev
```

**Edit a specific rule:**
```
*synapse edit global 3
```
Opens rule at index 3 in `global` domain for editing.

**Create a new star-command:**
```
*synapse command
```
Prompts for: command name, behavior rules.

**Get domain suggestion for a rule:**
```
*synapse suggest "Use TypeScript strict mode"
```
Analyzes the rule content and suggests the best-fit domain.

## Command Categories Summary

```
Automatic per-event     -> HOOK   (synapse-wrapper.cjs, UserPromptSubmit)   [working]
User guidance/learning  -> SKILL  (synapse/SKILL.md + references)           [working]
User-invoked CRUD       -> COMMAND (synapse/manager.md + 7 tasks)           [working]
Write-file star-cmds    -> COMMAND (*synapse create, *synapse add, ...)     [working]
Read-state star-cmds    -> HOOK L7 (*synapse status, *brief, *dev, ...)     [INERT]
```

## Source Files

| File | Purpose |
|------|---------|
| `.synapse/commands` | Star-command rule definitions (L7, not currently parseable by L7) |
| `.claude/commands/synapse/manager.md` | CRUD command router |
| `.claude/commands/synapse/tasks/*.md` | Individual CRUD task workflows |
| `.claude/commands/synapse/templates/` | Domain and manifest templates |
| `.claude/commands/synapse/utils/manifest-parser-reference.md` | Parser format reference |
