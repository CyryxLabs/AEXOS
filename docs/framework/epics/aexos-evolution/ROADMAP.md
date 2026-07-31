# Roadmap — AEXOS Evolution

Canonical: [EPIC-AEXOS-EVOLUTION.md](./EPIC-AEXOS-EVOLUTION.md)
Evidence: [DIAGNOSTIC.md](./DIAGNOSTIC.md)
ARCH: [0](./ARCHITECTURE-WAVE-0.md) · [1](./ARCHITECTURE-WAVE-1.md) · [2](./ARCHITECTURE-WAVE-2.md)

This board supersedes the two byte-identical strategic roadmaps
(`docs/roadmap.md`, `docs/framework/strategic_roadmap.md`) as the tracked plan.
Story AEX-2.5 retires them. Their surviving pillars are mapped below.

---

## Waves

| Wave | Theme | Status |
|------|-------|--------|
| **0** | Integrity restore | ✅ **Done** — 9 of 10 gates green, all enforcement points live |
| **1** | Execution kernel | ⬜ Proposed — unblocked |
| **2** | Distribution & identity | ⬜ Proposed — blocked by Wave 1 |
| **3** | Proof · Learning · Memory · Swarm | ⬜ Proposed — blocked by Wave 1 |

Legend: ⬜ proposed · 🟨 in progress · ✅ done · ⏸️ deferred

---

## Wave 0 — Integrity Restore

Smallest change set that makes the repository honest about its own state.
No architectural change.

| ID | Story | Severity | Status |
|----|-------|----------|--------|
| AEX-0.1 | Repair hook `SyntaxError`s + broken core path resolution (36 files, 116 refs) | CRITICAL | ✅ |
| AEX-0.2 | Verify git-push deny protocol (JSON `permissionDecision`) | CRITICAL | ✅ |
| AEX-0.3 | Repair `.synapse/manifest` keys + all corrupted identifiers | HIGH | ✅ |
| AEX-0.4 | CI: `node --check` over hooks + end-to-end hook smoke test | CRITICAL | ⬜ **only open item** |
| AEX-0.5 | `npm run lint` → exit 0 | HIGH | ✅ |
| AEX-0.6 | Unify version identity + 5.3.0 CHANGELOG entry | MEDIUM | ⬜ |
| AEX-0.7 | Refresh model registry to current generation | MEDIUM | ⬜ |
| AEX-0.8 | Reconcile SYNAPSE docs with actual layer behaviour | HIGH | ⬜ |
| AEX-0.9 | Fix inherited `branch-manager.js` bug (`await` in non-async filter) | MEDIUM | ✅ |
| AEX-0.10 | Fix `.claude/{commands,skills}` casing — breaks case-sensitive filesystems | HIGH | ✅ |

**Verified live after the fixes:**

| Check | Before | After |
|---|---|---|
| JS files failing `node --check` | 6 | **2** (both `{{placeholder}}` templates, by design) |
| `npm run lint` | 9 errors, exit 1 | **0 errors, exit 0** |
| `git push` as non-`@devops` | proceeded | **denied** (fail-closed; `@devops` allowed) |
| SYNAPSE `UserPromptSubmit` | 0 bytes | **3,928 bytes injected** |
| Validator gates green | 3 of 10 | **9 of 10** |

Remaining gate failure: `validate:structure` → `source-tree-guardian/index.js`
does not exist. **Also absent upstream** — an orphaned npm script, not fork
damage. Needs a decision: restore the module or remove the script.

---

## Wave 1 — Execution Kernel

Strict dependency order. AEX-1.1 is the keystone; nothing after it is sound
without it.

| ID | Story | Depends on | Status |
|----|-------|-----------|--------|
| AEX-1.1 | Task I/O contract — `inputs` / `produces` / `verify` on 215 tasks | Wave 0 | ⬜ |
| AEX-1.2 | `AgentRuntime` required interface; delete silent-success defaults | AEX-1.1 | ⬜ |
| AEX-1.3 | Real parallelism — DAG → runtime, worktree isolation, fix limiter | AEX-1.1, 1.2 | ⬜ |
| AEX-1.4 | Governance on the hot path | AEX-1.2 | ⬜ |

**Exit gate:** a workflow with no runtime configured fails loudly; every task
validates against the schema; N independent stories complete in measurably less
wall-clock time than N sequential runs.

---

## Wave 2 — Distribution & Identity

| ID | Story | Depends on | Status |
|----|-------|-----------|--------|
| AEX-2.1 | Claude Code plugin + `aexosd` MCP surface | Wave 1 | ⬜ |
| AEX-2.2 | Resolve npm identity (publish or remove the instruction) | — | ⬜ |
| AEX-2.3 | Squad registry with enforced `minVersion` | AEX-1.1 | ⬜ |
| AEX-2.4 | Complete CYRYX→AEXOS migration; invert the semantic linter | — | ⬜ |
| AEX-2.5 | Merge duplicate roadmaps; close the governance loop | — | ⬜ |

---

## Mapping from the legacy strategic roadmap

The prior roadmap's five pillars are retained where they survive the diagnostic,
and re-sequenced where they assumed a runtime that does not exist.

| Legacy pillar | Disposition |
|---|---|
| `cyryxd` MCP daemon (Phase 1) | **Kept** → AEX-2.1, renamed `aexosd`. Correct instinct; MCP is the right integration surface. Moved after Wave 1 — a daemon exposing a runtime that reports fake success would ship the D2 defect as an API |
| GitHub Action `CyryxLabs/aexos-action` (Phase 1) | **Deferred** — depends on a real runtime |
| Self-Healing Autopsy loop (Phase 2) | **Kept, re-sequenced** → requires AEX-1.1 `verify` contracts to know what failed. Natural Wave 3 candidate |
| `git worktree` parallel runner (Phase 2) | **Absorbed** into AEX-1.3 |
| Dynamic MoE cost router / "Margin Governor" (Phase 2) | **Partially kept** — routing authority already exists in Article XII-B. The published routing table is stale (Claude 3.7, GPT-o3-mini, DeepSeek-R1) and is refreshed by AEX-0.7. The 60% cost-reduction claim is unsubstantiated and should not be published until measured |
| Cryptographic Mission Ledger (Phase 2) | **Kept** → Wave 3. The SOC2/ISO27001 story is real, but an append-only ledger of fake successes is worse than none |
| Squad Marketplace `cyryx squad publish` (Phase 3) | **Reduced** → AEX-2.3 delivers the registry and compatibility enforcement. The hosted marketplace (`api.cyryx.dev`) stays deferred; no demand signal, and `.gitignore` currently makes squads private-by-default |
| 3D Sirius Graph UI / MAAX Studio GUI (Phase 3) | **Deferred** — Constitution Article I |
| Policy-as-Code gates (OPA) | **Superseded** by AEX-1.4 — the constitution already *is* policy-as-code; it just is not on the executing path |
| *(absent from legacy roadmap)* | **Added:** completing the rebrand (AEX-2.4) and restoring enforcement integrity (Wave 0) |

---

## Deferred — reviewed and explicitly not open work

| Item | Rationale |
|---|---|
| MAAX Studio GUI, 3D Sirius graph | Article I — UI is tertiary, never a requirement |
| Hosted squad marketplace API | Depends on AEX-2.3; no demand signal |
| SYNAPSE L3–L7 re-enable | Requires its own ADR repeating the NOG-17 audit |
| "DNA Mental™" / mind-clone | Proprietary; outside the OSS artifact |
| Task corpus rewrite | The corpus is the moat — schema only |

---

## Wave 3 — Proof · Learning · Memory · Swarm

Architecture: [ARCHITECTURE-WAVE-3.md](./ARCHITECTURE-WAVE-3.md).
An **integration wave** — nine built-and-tested subsystems currently wired to
nothing get connected into a closed loop.

| ID | Story | Depends on | Status |
|----|-------|-----------|--------|
| AEX-3.1 | **Proof Layer** — evidence-bound story closure + hash-chained ledger | AEX-1.1, 1.2 | ⬜ |
| AEX-3.2 | **Self-improvement loop** — evidence → pattern → governed amendment | AEX-3.1, **AEX-2.5** | ⬜ |
| AEX-3.3 | **Real memory** — `memory-query`, retrieval over ledger + gotchas, SYNAPSE L3–L7 decision | AEX-3.1 | ⬜ |
| AEX-3.4 | **Swarm with contracts** — planning-time negotiation, shared epic context, evidence-based selection | AEX-1.3, 3.1 | ⬜ |
| AEX-3.5 | **Layout (a)** — repartition `.cyryx-core/` monolith into publishable packages | AEX-1.2 | ⬜ |
| AEX-3.6 | **Layout (c)** — read-only SSE cockpit (Article I compliant) | AEX-3.1 | ⬜ |

**Sequencing constraints that are not negotiable:**

- V2 cannot precede V1 — a ledger signing fabricated successes is worse than no
  ledger.
- V3 cannot precede V2 — there is nothing to learn from without evidence.
- AEX-3.2 requires AEX-2.5 (approver as a *role*) or the proposal flow stalls on
  a single person, exactly as it does today.

Absorbed from the legacy roadmap: the self-healing autopsy loop becomes AEX-3.2's
failure path; the cryptographic mission ledger becomes AEX-3.1; cost/latency
telemetry for the Article XII-B router falls out of AEX-3.1's `EvidenceRecord`.

## Recorded, not planned

- Constitution Articles VII–X, or an explicit renumbering decision (AEX-2.5)
- Multi-repo wave orchestration, with the ledger as the join key
- Team mode — multiple humans and agents on a shared ledger, Article II authority
  mapped to real identities rather than an env var
- `validate:structure` — orphaned npm script; the `source-tree-guardian` module
  is absent upstream too. Restore or remove.
