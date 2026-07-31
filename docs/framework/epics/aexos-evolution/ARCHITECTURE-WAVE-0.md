# Architecture — Wave 0: Integrity Restore

**Epic:** [EPIC-AEXOS-EVOLUTION](./EPIC-AEXOS-EVOLUTION.md) · **Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md)
**Baseline:** `f2e559c` · **Gates:** Wave 1 does not begin until this wave is green.

No architectural change. This wave makes the repository enforce what it already
claims to enforce, and makes CI able to notice when it stops.

---

## AEX-0.1 — Repair hook execution

**Defect (D1):** commit `e1232ec` replaced `CYRYX_` → `Cyryx Labs_` inside
identifiers and `.cyryx-core` → `.cyryx-labs-core` inside paths.

| File | Line | Current | Required |
|---|---|---|---|
| `.claude/hooks/enforce-git-push-authority.cjs` | 63, 71, 72, 76 | `process.env.Cyryx Labs_ACTIVE_AGENT` | `process.env.AEXOS_ACTIVE_AGENT` |
| `.claude/hooks/precompact-session-digest.cjs` | 102, 109 | `Cyryx Labs_HOOK_CONTEXT` | `AEXOS_HOOK_CONTEXT` |
| `.claude/hooks/precompact-session-digest.cjs` | 54, 60, 61 | `.cyryx-labs-core` | `.cyryx-core` |
| `.claude/hooks/synapse-engine.cjs` | 19, 54 | `.cyryx-labs-core` | `.cyryx-core` |
| `.cyryx-core/core/synapse/context/context-tracker.js` | 105 | `.cyryx-labs-core` | `.cyryx-core` |
| `.claude/hooks/read-protection.py` | 32, 33 | `.cyryx-labs-core` | `.cyryx-core` |
| `.claude/hooks/write-path-validation.py` | 57 | `.cyryx-labs-core` | `.cyryx-core` |
| `.claude/hooks/enforce-architecture-first.py` | 53 | `.cyryx-labs-core` | `.cyryx-core` |

Env-var naming is a decision, not a mechanical revert: `CYRYX_ACTIVE_AGENT` is
the pre-corruption name, `AEXOS_ACTIVE_AGENT` is the post-rebrand target. Read
**both** for one release, preferring the AEXOS name, and log a deprecation when
only the legacy name is present.

**Verify**

```bash
for f in .claude/hooks/*.cjs; do node --check "$f" || echo "BROKEN: $f"; done
git grep -l "cyryx-labs" | wc -l          # expect 0
git grep -l "Cyryx Labs_" | wc -l         # expect 0
```

---

## AEX-0.2 — Verify the deny protocol still functions

**Defect (D1):** the guard reserving `git push` to `@devops` under Article II
never emits a decision, because the file throws `SyntaxError` at load.

The hook uses the JSON decision protocol — it writes to stdout and exits 0:

```json
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny",
 "permissionDecisionReason":"..."}}
```

**This logic is correct and must not be rewritten.** Verified against the
uncorrupted upstream ([UPSTREAM-COMPARISON.md](./UPSTREAM-COMPARISON.md)):
fail-closed `deny` when no agent is set, allow when the acting agent is
`@devops`. Repairing the `SyntaxError` in AEX-0.1 restores it.

This story exists only to **assert** that behaviour, so the guard cannot silently
regress again.

| Condition | Expected |
|---|---|
| No acting agent | `permissionDecision: "deny"` — fail-closed |
| Acting agent `@devops` | no decision emitted → proceed |
| File fails to load | **must be caught by CI (AEX-0.4), never in production** |

Env vars read, in order: `AEXOS_ACTIVE_AGENT`, `AEXOS_AGENT`, `ACTIVE_AGENT`,
`CLAUDE_AGENT_NAME`, `CLAUDE_CODE_AGENT`, `AEXOS_CURRENT_AGENT` — the upstream
names with the brand token corrected (see AEX-0.1 on dual-reading during
migration).

**Verify**

```bash
node -e "
const {spawnSync}=require('child_process');
const p=JSON.stringify({tool_name:'Bash',tool_input:{command:'git push origin main'}});
const deny=spawnSync('node',['.claude/hooks/enforce-git-push-authority.cjs'],{input:p,encoding:'utf8'});
console.log('no agent  ->', JSON.parse(deny.stdout).hookSpecificOutput.permissionDecision); // deny
const ok=spawnSync('node',['.claude/hooks/enforce-git-push-authority.cjs'],
  {input:p,encoding:'utf8',env:{...process.env,AEXOS_ACTIVE_AGENT:'devops'}});
console.log('as devops ->', ok.stdout.trim()===''?'allow':'DENY — regression');
"
```

---

## AEX-0.3 — Repair the SYNAPSE manifest and residual identifiers

**Defect (D1, D6):** `.synapse/manifest` is a `KEY=VALUE` file; the replace
injected a space into keys, breaking the domain-loader parse for the master
agent's L2 domain.

```
45: AGENT_Cyryx Labs_MASTER_STATE=active          → AGENT_AEXOS_MASTER_STATE=active
46: AGENT_Cyryx Labs_MASTER_AGENT_TRIGGER=...     → AGENT_AEXOS_MASTER_AGENT_TRIGGER=aexos-master
```

Also: `.synapse/agent-cyryx-master`, `.cyryx-core/monitor/hooks/lib/send_event.py:12`,
`enrich.py:20-27`, three `.cmd` templates under
`infrastructure/scripts/llm-routing/`, and `.env.example`.

Add a manifest parse validator to CI — a key containing whitespace is a hard
failure. This class of corruption must not be able to recur silently.

---

## AEX-0.4 — CI catches this class of defect

**Defect (D1):** three hooks shipped broken because no workflow executes them.
`.github/workflows/` has 19 files and none runs `node --check` over
`.claude/hooks/`.

Add a `hooks-integrity` job to `ci.yml`:

1. `node --check` over every `.claude/hooks/*.cjs`
2. `python -m py_compile` over every `.claude/hooks/*.py`
3. **Behavioural smoke tests**, not just syntax:
   - `UserPromptSubmit` with a valid payload → **stdout is non-empty**
   - non-`@devops` `git push` → **exit 2**
   - `@devops` `git push` → exit 0
4. Assert every hook path in `.claude/settings.json` exists on disk

Item 3 is the one that matters. Syntax checking would have caught two of the
three failures; only behavioural assertion catches SYNAPSE returning 0 bytes with
exit 0, because that failure is *designed* to be silent
(`synapse-wrapper.cjs:49-54` discards stderr).

---

## AEX-0.5 — Lint to green

**Defect (D3):** `npm run lint` → 3,916 problems (789 errors), exit 1. The CI
ESLint job cannot pass.

Sequence:

1. Triage the 789 errors by rule. Environment/global errors (`no-undef` on
   `document`/`navigator` in `public/app.js`) are config gaps, not code defects —
   fix by declaring the correct `env` per override in `eslint.config.js`.
2. Apply `--fix` where safe (~2,018 warnings are auto-fixable).
3. Real defects get fixed. Anything deliberately tolerated gets an explicit
   inline disable with a reason — never a blanket rule removal.
4. Warnings may remain for now; **errors must reach zero**.

Do not reach green by narrowing lint scope. That reproduces the Wave 0 failure
pattern: a gate that passes because it stopped looking.

---

## AEX-0.6 — Version and changelog identity

**Defect (D10, D6):** five sources disagree — `package.json` 5.3.0,
`framework-config.yaml` 4.0.0, `core-config.yaml` 2.1.0, `README.md` "CYRYX 4.2",
`product/README.md` "v4". `CHANGELOG.md` stops at 5.2.9, so the entire rebrand is
undocumented.

`package.json` is authoritative. `framework_version` derives from it at build
time or is validated against it in CI. `core-config.yaml`'s `project.version` is
*installed-project* metadata, not framework version — rename the key to remove
the ambiguity.

Write the 5.3.0 entry covering `e1232ec`, `2af6298`, `a2d3126`, `c027533`,
`d6f49b6`, `79252c2`, `5aeb41b`, `e023b3e`, `f2e559c` — including, honestly, that
the rebrand introduced the defects this wave repairs.

Fix the codecov badge (`README.md:12`, still `CyryxLabs/cyryx-core`).

---

## AEX-0.7 — Model registry refresh

**Defect (D8):** no reference to the current model generation exists anywhere.
`core-config.yaml:401` declares `models.active: claude-sonnet-4-6`; the provider
factory defaults to `claude-3-5-sonnet` and `gemini-2.0-flash`; the strategic
roadmap's routing table names Claude 3.7 Sonnet, GPT-o3-mini and DeepSeek-R1.

For a framework whose product is model orchestration, the registry is the
credibility surface.

- Refresh `models.registry` in `core-config.yaml` with current identifiers and
  accurate context windows.
- Refresh `DEFAULT_CONFIG` in `ai-provider-factory.js`.
- Remove the stale MoE routing table from the roadmap rather than updating it —
  AEX-2.5 retires that document, and the "60% cost reduction" claim is
  unsubstantiated and should not be republished.
- Add a CI check that flags model identifiers older than a configured floor, so
  the registry cannot silently rot again.

---

## AEX-0.8 — SYNAPSE documentation reconciliation

**Defect (D4):** `engine.js:189` sets `DEFAULT_ACTIVE_LAYERS = [0, 1, 2]` with
the note *"L3-L7 produced 0 rules in NOG-17 audit — disabled for performance"*,
while `SKILL.md`, `references/layers.md`, `references/brackets.md` and the squad
guide all describe an 8-layer bracket-aware engine. The L5 squad-context
extension surface is advertised and inert.

**Wave 0 documents reality. It does not change behaviour.**

Update the docs to state: three layers active by default (L0 Constitution, L1
Global, L2 Agent), L3–L7 available under `SYNAPSE_LEGACY_MODE=true`, bracket
management superseded by native compaction, and squad L5 context inactive by
default.

Record — without fixing here — that L2 cannot fire even when enabled:
`runtime/hook-runtime.js:81-83` constructs `SynapseEngine` without passing
`manifest`, so `context-builder.js:26` sets `manifest: {}` and
`layers/l2-agent.js:59-64` always returns `null`. The `.synapse/manifest` routing
table is never read at runtime.

**Open decision** (EPIC open decision 1): *document-down* — accept a 3-layer
engine and drop the 8-layer claim — or *build-up* — repair the manifest wiring
and re-enable L2–L7, recovering the squad extension surface. Wave 0 must not
choose silently. Re-enabling requires its own ADR with the NOG-17 audit repeated
as evidence.

---

## Wave 0 exit gate

On a clean clone, all must hold:

```bash
for f in .claude/hooks/*.cjs; do node --check "$f"; done          # all pass
echo '{"tool_name":"Bash","tool_input":{"command":"git push"}}' \
  | node .claude/hooks/enforce-git-push-authority.cjs             # exit 2
echo '{"prompt":"x","session_id":"t","cwd":"'$PWD'"}' \
  | node .claude/hooks/synapse-wrapper.cjs | wc -c                # > 0
npm run lint                                                       # exit 0
git grep -l "cyryx-labs" | wc -l                                   # 0
git grep -l "Cyryx Labs_" | wc -l                                  # 0
```

Plus: CI contains a `hooks-integrity` job that fails if any of the above
regresses, and `CHANGELOG.md` has a 5.3.0 entry.
