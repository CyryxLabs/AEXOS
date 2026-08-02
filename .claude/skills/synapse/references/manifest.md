# SYNAPSE Manifest Reference

## Overview

The manifest (`.synapse/manifest`) is the central registry for all SYNAPSE domains. It uses a KEY=VALUE format (CARL-compatible — **not YAML**) and declares which domains exist, when they activate, and how they behave.

The manifest is parsed by `parseManifest()` in `domain-loader.js`
(`.aexos-core/core/synapse/domain/domain-loader.js`) on every prompt, from
`runtime/hook-runtime.js`, and handed to the engine as `config.manifest`.

> **History:** until story AEX-0.8 the hook runtime constructed `SynapseEngine`
> *without* a manifest, so the engine resolved `manifest: {}` and this file was
> never read at runtime. Layers fell back to their default file paths, and L2
> (which has no fallback for a missing `AGENT_TRIGGER` match) was permanently
> inert. That wiring is fixed; see [runtime-state.md](runtime-state.md).

> **Not every key is enforced.** `parseManifest()` reads all the keys below, but
> only `AGENT_TRIGGER` affects the default pipeline. `STATE`, `ALWAYS_ON` and
> `DEVMODE` are parsed and ignored. The table in
> [runtime-state.md](runtime-state.md) gives the parsed-vs-enforced breakdown.

## File Format

```
# Comments start with #
# Empty lines are ignored

# Debug mode toggle
DEVMODE=false

# Domain registration: {PREFIX}_{KEY}={VALUE}
CONSTITUTION_STATE=active
CONSTITUTION_ALWAYS_ON=true
CONSTITUTION_NON_NEGOTIABLE=true
```

## Valid Keys

Every domain is identified by a unique prefix (e.g., `CONSTITUTION`, `GLOBAL`, `AGENT_DEV`). The following keys are valid for each prefix:

### Required Keys

| Key | Type | Description | Enforced |
|-----|------|-------------|----------|
| `{PREFIX}_STATE` | `active` \| `inactive` | Declares whether the domain is loaded. Required by convention for every domain. | **No** — no layer reads it |

### Optional Keys

| Key | Type | Description | Used By | Enforced |
|-----|------|-------------|---------|----------|
| `{PREFIX}_ALWAYS_ON` | `true` \| `false` | Domain always loaded regardless of context | L0, L1 | No — L0/L1 load unconditionally |
| `{PREFIX}_NON_NEGOTIABLE` | `true` \| `false` | Rules cannot be overridden by other layers | L0 only | Metadata only |
| `{PREFIX}_AGENT_TRIGGER` | agent ID string | Activate when this agent is active | L2 | **Yes** |
| `{PREFIX}_WORKFLOW_TRIGGER` | workflow ID string | Activate when this workflow is active | L3 | Legacy mode only |
| `{PREFIX}_RECALL` | comma-separated keywords | Activate when user prompt contains keyword | L6 | Legacy mode only |
| `{PREFIX}_EXCLUDE` | comma-separated values | Contexts/agents to exclude domain from | Any | Not read by L0–L2 |

### Global Key

| Key | Type | Description | Enforced |
|-----|------|-------------|----------|
| `DEVMODE` | `true` \| `false` | Enable debug metrics in output | **No** — the engine reads `config.devmode`, which the hook never sets from the manifest |

## Complete Manifest Example

Below is the current manifest structure (from `.synapse/manifest`):

```
# Debug mode
DEVMODE=false

# Layer 0: Constitution (NON-NEGOTIABLE)
CONSTITUTION_STATE=active
CONSTITUTION_ALWAYS_ON=true
CONSTITUTION_NON_NEGOTIABLE=true

# Layer 1: Global (ALWAYS_ON)
GLOBAL_STATE=active
GLOBAL_ALWAYS_ON=true

# Layer 1: Context brackets (ALWAYS_ON)
CONTEXT_STATE=active
CONTEXT_ALWAYS_ON=true

# Layer 7: Star-commands
COMMANDS_STATE=active

# Layer 2: Agent-scoped domains
AGENT_DEV_STATE=active
AGENT_DEV_AGENT_TRIGGER=dev
AGENT_QA_STATE=active
AGENT_QA_AGENT_TRIGGER=qa
AGENT_ARCHITECT_STATE=active
AGENT_ARCHITECT_AGENT_TRIGGER=architect
# ... (12 agent domains total)

# Layer 3: Workflow domains
WORKFLOW_STORY_DEV_STATE=active
WORKFLOW_STORY_DEV_WORKFLOW_TRIGGER=story_development
WORKFLOW_EPIC_CREATE_STATE=active
WORKFLOW_EPIC_CREATE_WORKFLOW_TRIGGER=epic_creation
WORKFLOW_ARCH_REVIEW_STATE=active
WORKFLOW_ARCH_REVIEW_WORKFLOW_TRIGGER=architecture_review
```

## Domain-to-File Mapping

The domain-loader resolves domain prefixes to files in `.synapse/`:

| Prefix | File | Layer |
|--------|------|-------|
| `CONSTITUTION` | `.synapse/constitution` | L0 |
| `GLOBAL` | `.synapse/global` | L1 |
| `CONTEXT` | `.synapse/context` | L1 |
| `COMMANDS` | `.synapse/commands` | L7 |
| `AGENT_DEV` | `.synapse/agent-dev` | L2 |
| `AGENT_QA` | `.synapse/agent-qa` | L2 |
| `WORKFLOW_STORY_DEV` | `.synapse/workflow-story-dev` | L3 |

**Naming convention:** The prefix is derived from the filename by:
1. Converting to SCREAMING_SNAKE_CASE
2. Removing hyphens and replacing with underscores

## Troubleshooting

### Domain Not Loading

1. **Check the layer is active at all.** Only L0–L2 run by default. An L3–L7
   domain will never load without `SYNAPSE_LEGACY_MODE=true`. Confirm with
   `cat .synapse/metrics/hook-metrics.json` — skipped layers are listed with a
   reason.
2. Verify the domain file exists in `.synapse/` and is non-empty (an empty file
   makes the layer return `null`, which is reported as `skipped`).
3. For L2 domains: verify `AGENT_TRIGGER` matches the active agent ID — and note
   that `session.active_agent.id` is currently never populated, so **no** L2
   domain loads regardless of its trigger.
4. For L3 domains: verify `WORKFLOW_TRIGGER` matches `session.active_workflow.id`.
5. Run `/synapse:tasks:diagnose-synapse` for a full report.

`{PREFIX}_STATE` is deliberately absent from this list: no layer reads it, so
setting it to `inactive` will not stop a domain from loading, and setting it to
`active` will not start one.

### Invalid Format Errors

- Keys must use SCREAMING_SNAKE_CASE
- Values cannot contain newlines
- No spaces around `=` sign
- Comments must start with `#` at the beginning of the line

### Adding a New Domain

Use `*synapse create` or manually:
1. Create the domain file in `.synapse/` with KEY=VALUE rules
2. Add the registration keys to `.synapse/manifest`
3. No reload step is needed — the manifest and domain files are read from disk
   on every prompt. (`*synapse reload` is an L7 star-command and is inert.)

## Source Files

| File | Purpose |
|------|---------|
| `.synapse/manifest` | The manifest file itself |
| `.aexos-core/core/synapse/domain/domain-loader.js` | Manifest parser + domain file loader |
| `.claude/commands/synapse/utils/manifest-parser-reference.md` | Detailed parser format spec |
| `.claude/commands/synapse/templates/manifest-entry-template` | Template for new manifest entries |
