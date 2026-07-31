# AEXOS Evolution — Planning Package

**Status:** Proposed — for review. No source code has been modified.
**Baseline:** `f2e559c` · **Audited:** 2026-07-29

---

## Read in this order

| # | Document | Purpose |
|---|---|---|
| 1 | [DIAGNOSTIC.md](./DIAGNOSTIC.md) | The evidence. 14 findings, each with a reproduction command |
| 2 | [UPSTREAM-COMPARISON.md](./UPSTREAM-COMPARISON.md) | Which findings are fork damage vs inherited architecture — read before scoping Wave 0 |
| 3 | [EPIC-AEXOS-EVOLUTION.md](./EPIC-AEXOS-EVOLUTION.md) | Thesis, scope, constraints, success criteria, open decisions |
| 3 | [ROADMAP.md](./ROADMAP.md) | Wave board + mapping from the legacy strategic roadmap |
| 4 | [ARCHITECTURE-WAVE-0.md](./ARCHITECTURE-WAVE-0.md) | Integrity restore — ✅ done, with verified before/after |
| 5 | [ARCHITECTURE-WAVE-1.md](./ARCHITECTURE-WAVE-1.md) | The execution kernel |
| 6 | [ARCHITECTURE-WAVE-2.md](./ARCHITECTURE-WAVE-2.md) | Distribution & identity |
| 7 | [ARCHITECTURE-WAVE-3.md](./ARCHITECTURE-WAVE-3.md) | Proof · Learning · Memory · Swarm — **and the layout question** |

**ADRs**

- [ADR-AEX-001 — AgentRuntime as a Required Interface](./adr/ADR-AEX-001-AGENT-RUNTIME-INTERFACE.md)
- [ADR-AEX-002 — Machine-Checkable Task I/O Contract](./adr/ADR-AEX-002-TASK-IO-CONTRACT.md)
- [ADR-AEX-003 — Move Governance onto the Executing Path](./adr/ADR-AEX-003-GOVERNANCE-HOT-PATH.md)
- [ADR-AEX-004 — Distribution via Plugin and MCP Surface](./adr/ADR-AEX-004-DISTRIBUTION-PLUGIN-MCP.md)
- [ADR-AEX-005 — The Proof Layer](./adr/ADR-AEX-005-PROOF-LAYER.md)
- [ADR-AEX-006 — The Self-Improvement Loop](./adr/ADR-AEX-006-SELF-IMPROVEMENT-LOOP.md)

---

## The finding in one paragraph

AEXOS has built the harder half correctly — 215 task specifications, 12 personas
with explicit authority boundaries, a versioned constitution with enforced gate
severities, a DAG wave planner with cycle detection, a durable SDC state machine,
and a diagnostics suite deep enough to detect its own faults. What it lacks is a
body. The single line where deterministic code hands work to a model
(`workflow-orchestrator.js:577`) calls a callback supplied only in tests, and
every executor beneath it defaults to reporting success. A pipeline can therefore
produce a green report having done nothing. Meanwhile all three constitutional
enforcement hooks are inert at HEAD — including the guard reserving `git push` to
`@devops`, which crashes and exits 1 where Claude Code requires exit 2 to block.

**The evolution is not more features. It is closing the loop between the
deterministic layer and the execution layer.**

---

## Three findings that gate everything

Verified by executing the code at `f2e559c`, not by reading it.

1. **Governance is bypassed.** `enforce-git-push-authority.cjs` throws
   `SyntaxError` and exits 1. Claude Code blocks only on exit 2. Article II
   (NON-NEGOTIABLE) reserves `git push` to `@devops`; that control is inert.
2. **The context engine injects nothing.** `synapse-wrapper.cjs` returns 0 bytes
   with exit 0, because `synapse-engine.cjs:19` resolves `.cyryx-labs-core/`,
   which does not exist. The wrapper discards stderr by design, so the failure is
   silent.
3. **Non-execution is indistinguishable from success.** Five executors return
   `success: true` when no runtime is present.

Root cause of 1 and 2: commit `e1232ec` (rebrand) ran a find/replace of `CYRYX_`
→ `Cyryx Labs_` inside identifiers and `.cyryx-core` → `.cyryx-labs-core` inside
paths. No CI job executes the hooks, so it shipped.

---

## Waves

| Wave | Theme | Gate |
|---|---|---|
| **0** ✅ | Integrity restore | **Done.** 6 broken JS → 2 (both templates); lint 9 errors → 0; gates 3/10 → 9/10 |
| **1** | Execution kernel | Task contract → runtime → parallelism → governance. Strict order |
| **2** | Distribution & identity | Plugin + MCP, squad registry, brand and version unification |
| **3** | Proof · Learning · Memory · Swarm | Integration wave — nine built subsystems with ~0 consumers get connected |

### The thesis for Wave 3

> **AEXOS does not need new subsystems. It needs to close the loops between the
> thirty-two it already has.** `pattern-learner`: 0 consumers.
> `metrics-tracker`: 0 consumers. `wave-analyzer` plans DAGs nothing executes.
> The dormant assets *are* the roadmap.

---

## Open decisions — require the orchestrator's ruling

Recorded in [EPIC-AEXOS-EVOLUTION.md](./EPIC-AEXOS-EVOLUTION.md#open-decisions).
Wave planning is not final until these are settled.

1. **SYNAPSE: document-down or build-up?** Restate the engine as 3-layer
   (honest, cheap), or repair the manifest wiring and re-enable L2–L7
   (recovers the squad-context extension surface).
2. **Runtime backend priority.** Reuse the `claude` CLI spawn path already
   written, or target the programmatic Agent SDK?
3. **Article I and MCP.** Does an MCP daemon satisfy "CLI First", or does a
   controlling non-CLI surface require a constitutional amendment? AEX-2.1 is
   blocked on this.
4. **Governance approver.** Replacing the single named approver with a role is a
   prerequisite for OSS scale and enterprise due diligence.

---

## Scope of this package

**Produced:** this planning package only — 10 documents. No source file was
modified; no commit was made; nothing was pushed.

**Not produced:** story files. Story decomposition (`STORY-AEX-*.md`) follows
approval of this package and the four open decisions, per the house convention
in `docs/framework/epics/core-super-update/`.

**Language:** English, matching the existing epic and ADR corpus. The
constitution remains Portuguese.
