# ADR-AEX-004: Distribution via Plugin and MCP Surface

## Status

Proposed. Part of [EPIC-AEXOS-EVOLUTION](../EPIC-AEXOS-EVOLUTION.md),
stories AEX-2.1 and AEX-2.2. Depends on Wave 1.

**Blocked on an open constitutional question** — see *Open question* below.

## Context

AEXOS currently distributes by copying files into a target project.
`ide_sync_system` projects `.cyryx-core/development/agents/` into seven
destinations — `.claude/`, `.codex/`, `.gemini/`, `.github/`, `.cursor/`,
`.antigravity/`, `.kimi/` — each in a different format, with `validate:parity`
and `fail_on_drift` guarding the copies against divergence.

This has real costs and one broken assumption.

**The npm channel does not exist.** `npm view @cyryx-squads/core version` returns
404. `README.md:106` still instructs `npm install -g @cyryx-squads/core`. The
Start Here block was changed to `npx github:CyryxLabs/AEXOS init`, which works
but is a workaround: no semver resolution, no integrity checking, no download
metrics, and a full clone per install.

**The plugin channel is unused.** No `.claude-plugin/plugin.json` or marketplace
manifest exists. Claude Code's plugin system distributes skills, commands, agents,
hooks and MCP servers as a versioned, installable unit — precisely what the
file-copy installer reimplements by hand.

**N one-way projections is not portability.** Article XI declares `squads/` the
source of truth and IDE directories derived. That is the right model, but the
implementation is N format-specific copies requiring continuous reconciliation.
`AGENTS.md` documents four separate activation protocols for the same 12 agents.
Every new surface multiplies the sync matrix.

**There is no programmatic surface.** `.cyryx-core/index.js` and `index.esm.js`
exist but export a narrow slice and are undocumented. There is no supported way
to embed AEXOS in another product — which is how LangGraph, CrewAI and the Claude
Agent SDK are consumed.

The prior roadmap already identified the answer: a `cyryxd` MCP daemon in
Phase 1. That instinct is correct. MCP is a protocol, not a format — one
implementation serves every MCP-capable client, replacing projection with
negotiation. It was sequenced too early: a daemon exposing a runtime that reports
fake success (DIAGNOSTIC D2) would have published the defect as an API.

With Wave 1 delivering a real runtime, the sequencing now works.

## Decision

**1. Three channels, one source of truth.**

| Channel | Serves | Contains |
|---|---|---|
| **Claude Code plugin** | Claude Code users | skills, commands, agents, hooks, MCP registration |
| **`aexosd` MCP server** | any MCP-capable client | task execution, wave planning, governance, status |
| **File-copy installer** | non-MCP IDEs (Cursor, Copilot, AntiGravity) | current behaviour, retained |

`squads/` and `.cyryx-core/development/` stay canonical per Article XI. All three
channels are derived.

**2. Ship `.claude-plugin/plugin.json` with a marketplace manifest.**

Versioned, installable, updatable through the native channel, and it registers
`aexosd` automatically so MCP setup is not a separate manual step.

**3. `aexosd` exposes the runtime, not the file tree.**

Tools map to the capabilities Wave 1 creates:

- `task.execute` — run a contracted task (ADR-AEX-002), governed (ADR-AEX-003)
- `wave.plan` / `wave.next` — DAG planning and scheduling
- `story.status` / `sdc.verify` — durable state queries
- `governance.evaluate` — budget and story-binding checks

Every tool call passes through `AgentRuntime`, so governance cannot be bypassed
by choosing the MCP entrypoint over the CLI.

**4. Resolve the npm identity explicitly.**

Either publish under a name that matches the product, or remove the install
instruction. The current state — documented instructions for a 404 — is the worst
option and must not survive Wave 2.

Renaming the package implies renaming `.cyryx-core/` (12,837 literal occurrences)
and the `cyryx` binary. That is a breaking change requiring a migration path and
a deprecation window; it is deliberately scoped to AEX-2.4 and not smuggled in
here.

**5. The installer is retained, not deprecated.**

Cursor, Copilot and AntiGravity have no MCP or plugin equivalent. Article XI's
portability promise depends on continuing to serve them.

## Consequences

### Positive

- One protocol implementation replaces N format projections for MCP-capable
  clients, shrinking the sync matrix rather than growing it.
- Governance holds across every channel, because all of them enter through the
  runtime.
- A real programmatic surface opens the embedding use case without exposing
  internals as a library API.
- Native install, update and version resolution, with usage signal that the
  current `npx github:` path cannot provide.
- New clients require no new projection format.

### Negative

- A daemon is a new operational surface: lifecycle, port binding, health,
  concurrent sessions, crash recovery. The framework has a port-denylist
  validator (`validate:port-denylist`) but no daemon supervision.
- Three channels can drift. Parity validation must extend to cover MCP tool
  definitions, not just agent file copies.
- MCP tools become a public contract with compatibility obligations — heavier
  than markdown files that can be reshaped freely.
- Publishing to npm and a plugin marketplace are outward-facing acts requiring
  ownership of names and accounts, and they are effectively irreversible once
  users install.

### Neutral

- Article XI is satisfied and arguably strengthened.
- The retained installer means no user loses a supported path.

## Open question — requires an orchestrator ruling

**Does an MCP daemon satisfy Article I ("CLI First"), or does it require an
amendment?**

Article I is NON-NEGOTIABLE and states that every capability must work fully via
CLI before any other surface, and that non-CLI surfaces observe rather than
control. An MCP server *controls*: it executes tasks.

Two defensible readings:

1. **MCP is CLI-equivalent.** It is a headless, scriptable, non-graphical
   interface to the same commands. The article's target is GUIs, and a daemon is
   not a GUI.
2. **MCP is a third surface that controls, which the article forbids.** An
   amendment is required, adding a programmatic-surface clause.

This ADR cannot be accepted under reading 2 without a constitutional amendment.
The question should be settled before AEX-2.1 begins, not during it. Recorded as
EPIC open decision 3.

## Alternatives considered

**Publish to npm and stop there.** Insufficient — it fixes the 404 but leaves the
projection matrix and the absent programmatic surface untouched.

**Plugin only, no MCP.** Rejected: it serves Claude Code alone, which contradicts
Article XI and concentrates the product on one vendor precisely where the
diagnostic already shows the deepest coupling.

**Replace the installer with MCP entirely.** Rejected: it strands Cursor, Copilot
and AntiGravity users, breaking the portability promise for a meaningful share of
the audience.
