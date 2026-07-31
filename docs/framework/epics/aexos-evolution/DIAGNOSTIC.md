# AEXOS Evolution — Diagnostic Report

**Baseline commit:** `f2e559c` (origin/main at time of audit)
**Method:** static analysis + live execution of the affected code paths
**Scope:** whole repository (2,876 tracked files)

Every finding below is reproducible from a clean clone with the command shown.
Findings marked **VERIFIED-LIVE** were confirmed by executing the code, not by
reading it.

---

## Severity index

| # | Finding | Severity |
|---|---|---|
| D1 | All three enforcement hooks are dead; git-push governance is bypassed | **CRITICAL** |
| D2 | No execution kernel — orchestration never runs, and defaults to silent success | **CRITICAL** |
| D3 | Lint gate fails on `main` (9 errors, all from the rebrand commit) | **HIGH** |
| D4 | SYNAPSE runs 3 of 8 layers by default; docs describe the 8-layer behaviour | **HIGH** |
| D5 | No typed task contract — output parsed by regex over free-form English | **HIGH** |
| D6 | Rebrand corruption: 36 files reference a directory that does not exist | **HIGH** |
| D7 | Distribution broken — npm package returns 404 | **MEDIUM** |
| D8 | Model registry is a full generation stale | **MEDIUM** |
| D9 | Provider abstraction (1,554 LOC) is dead code | **MEDIUM** |
| D10 | Version identity drifts across four files | **MEDIUM** |
| D11 | Declared parallelism does not limit concurrency | **MEDIUM** |
| D12 | Agent registry recognises 7 of 12 personas | **MEDIUM** |
| D13 | Governance loop ships nothing — proposals approved same-day, never delivered | **MEDIUM** |
| D14 | Two byte-identical roadmaps, neither cross-linked to the wave board | **LOW** |
| D15 | 19% of relative doc links point to files that have never existed | **MEDIUM** |

---

## D1 — All three enforcement hooks are dead · CRITICAL · VERIFIED-LIVE

`.claude/settings.json` registers exactly three hooks. All three fail at HEAD.

```bash
for f in .claude/hooks/*.cjs; do
  printf "%-40s " "$(basename $f)"
  node --check "$f" >/dev/null 2>&1 && echo OK || echo FAIL
done
```

| Hook | Event | Observed behaviour |
|---|---|---|
| `synapse-engine.cjs` | `UserPromptSubmit` | exit 0, **0 bytes injected** |
| `precompact-session-digest.cjs` | `PreCompact` | `SyntaxError: Unexpected identifier 'Labs_HOOK_CONTEXT'` |
| `enforce-git-push-authority.cjs` | `PreToolUse:Bash` | `SyntaxError: Unexpected identifier 'Labs_ACTIVE_AGENT'` → **exit 1** |

The third is the most serious. The hook signals a block by writing a JSON
decision to stdout and exiting 0:

```json
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny",
 "permissionDecisionReason":"git push is exclusive to @devops (Article II)..."}}
```

Because the file throws `SyntaxError` at load, **that JSON is never emitted**.
The process dies with exit 1 and no decision, which Claude Code treats as a
non-blocking hook error. The push proceeds.

```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git push origin main"}}' \
  | node .claude/hooks/enforce-git-push-authority.cjs; echo "exit=$?"
# SyntaxError ... exit=1  → no decision emitted → the push proceeds
```

Verified against the uncorrupted upstream (see
[UPSTREAM-COMPARISON.md](./UPSTREAM-COMPARISON.md)): the same file, before the
brand replace, correctly returns `permissionDecision: "deny"` with no agent set
(fail-closed) and allows the call when the acting agent is `@devops`.

> **Constitution Article II (NON-NEGOTIABLE) reserves `git push` to `@devops`.
> That control is currently inert. Any agent can push.**

`synapse-wrapper.cjs:49-54` catches the downstream crash and deliberately
discards stderr ("Never write to stderr — silent exit"), so the failure is
invisible in normal operation.

**Root cause.** Commit `e1232ec` (rebrand) ran a find/replace of `CYRYX_` →
`Cyryx Labs_` **inside identifiers**, and `.cyryx-core` → `.cyryx-labs-core`
inside paths. Later commits cleaned prose but not executable code.

Also corrupted by the same replace:

- `.synapse/manifest:45-46` — `AGENT_Cyryx Labs_MASTER_STATE=active`. A space
  inside the key of a `KEY=VALUE` file breaks the domain-loader parse for the
  master agent's L2 domain.
- `.cyryx-core/monitor/hooks/lib/send_event.py:12`, `enrich.py:20-27` —
  `Cyryx Labs_MONITOR_URL`, an env var name containing a space (always `None`).
- Three `.cmd` templates under `infrastructure/scripts/llm-routing/` —
  `%Cyryx Labs_HOME%`, an invalid Windows variable reference.

**Why CI did not catch it.** No workflow runs `node --check` over
`.claude/hooks/`, and there is no hook smoke test.

---

## D2 — No execution kernel · CRITICAL

The boundary between deterministic code and model execution is
`.cyryx-core/core/orchestration/workflow-orchestrator.js:577-601`:

```js
if (this.options.dispatchSubagent) {
  result = await this.options.dispatchSubagent({ ... });
} else {
  result = { status: 'pending_dispatch', prompt, ... };
}
```

`dispatchSubagent` is **never supplied in production code**. The only
assignments in the repository are `jest.fn()` in
`tests/core/orchestration/workflow-orchestrator-profile-propagation.test.js:43`.

The failure mode is worse than "does nothing": every executor defaults to
reporting success.

| File | Line | Default behaviour |
|---|---|---|
| `core/execution/autonomous-build-loop.js` | 538-555 | `// Default: simulate execution` → `return { success: true, filesModified }` |
| `core/orchestration/executors/epic-3-executor.js` | 163-182 | `_executePhase()` returns `success: true` unconditionally |
| `core/orchestration/executors/epic-4-executor.js` | 157-231 | `_createStubPlan()`, one hardcoded fake subtask |
| `core/orchestration/agent-invoker.js` | 404-414 | `_executeTask()` returns `{ status: 'simulated' }` |
| `core/orchestration/master-orchestrator.js` | 1592-1620 | `StubEpicExecutor` fallback |

A pipeline run therefore produces a green report, populated state JSON, dashboard
updates and stub markdown — **with zero work performed, and no signal that
nothing happened**.

**Reachability.** No production entrypoint requires `core/orchestration` or
`core/execution`. Across `bin/`, `.cyryx-core/cli/`, `.cyryx-core/infrastructure/`
and `.claude/`, the only hits are `SessionState` and `SurfaceChecker` in
`development/scripts/greeting-builder.js:48,50`. The 39-file orchestration
subsystem and 11-file execution subsystem are library code exercised **only by
tests**.

What actually runs day to day is: `UserPromptSubmit` hook → (dead) SYNAPSE →
Claude Code interprets `.claude/skills/**/SKILL.md` → the model reads
`.cyryx-core/development/tasks/*.md` as instructions. Handoffs are *suggested*
in agent greetings (`architect.md:34-38`, STEP 5.5), never executed.

---

## D3 — Lint gate fails on main · HIGH · VERIFIED-LIVE

```bash
npm ci && npm run lint; echo "exit=$?"
# 21 problems (9 errors, 12 warnings)
# exit=1
```

`.github/workflows/ci.yml:159-181` runs `npm run lint`. Nine errors means the
job cannot pass. **All nine trace to the rebrand commit `e1232ec`:**

| Count | Error | Origin |
|---|---|---|
| 3 | `Parsing error: Unexpected token Labs_ACTIVE_AGENT` / `Labs_HOOK_CONTEXT` / `-` | find/replace corruption |
| 6 | `no-undef` on `document` / `navigator` in `public/app.js` | new file added by the same commit; browser globals not declared in `eslint.config.js` |

The third parse error is a **file not previously identified in D1**:
`packages/installer/src/wizard/pro-setup.js:301` —
`cyryx-labsCoreVersion: version,` (a hyphen inside an identifier). This ships in
the installer package, not only in hooks.

> **Correction.** An earlier measurement of this finding reported *3,916
> problems / 789 errors*. That number was taken in a working tree containing two
> untracked nested framework installs (`AEXOS/`, `my-project/` — see D6), which
> ESLint swept. On a clean clone the real figure is **9 errors**. The gate still
> fails; the remediation is far smaller than first stated.

For comparison, the upstream this repository was forked from lints clean —
`npx eslint .` reports **zero problems**. See
[UPSTREAM-COMPARISON.md](./UPSTREAM-COMPARISON.md).

**Separately — a pre-existing upstream defect, not fork damage.**
`.cyryx-core/development/scripts/branch-manager.js:216` fails `node --check`
(`missing ) after argument list`). It is ESLint-ignored, coverage-excluded and
untested, so no gate can see it. It is broken in the upstream too.

---

## D4 — SYNAPSE is a 3-layer engine documented as 8 · HIGH

`.cyryx-core/core/synapse/engine.js:189-195`:

```js
/**
 * NOG-18: Default active layers (L0-L2 only).
 * L3-L7 produced 0 rules in NOG-17 audit — disabled for performance.
 * Set SYNAPSE_LEGACY_MODE=true to re-enable full 8-layer processing.
 */
const DEFAULT_ACTIVE_LAYERS = [0, 1, 2];
```

Bracket-aware filtering (FRESH / MODERATE / DEPLETED / CRITICAL) is likewise
bypassed: *"Bracket management replaced by native /compact."*

Consequences beyond the docs mismatch:

- **L5 (squad context) is dead by default** — the advertised squad extension
  surface contributes nothing.
- Even if re-enabled, **L2 can never fire**: `runtime/hook-runtime.js:81-83`
  constructs `new SynapseEngine(path, { synapse: coreConfig.synapse })` without
  passing `manifest`, so `context-builder.js:26` sets `manifest: {}`, and
  `layers/l2-agent.js:59-64` requires `manifest.domains[k].agentTrigger`.
  The `.synapse/manifest` routing table — the entire agent routing registry — is
  never read at runtime.

---

## D5 — Prompt-as-API: no typed contract · HIGH

Of 215 task files, only ~71 carry YAML frontmatter, and that frontmatter holds
`tools:`/`utils:` metadata — **no input schema, no output schema**.

- `agent-invoker.js:172` gates on `task.outputSchema`, which no task defines;
  `_validateTaskOutput` (442-471) is unreachable.
- `core/execution/subagent-dispatcher.js:790-810` extracts modified files with
  `/(?:created|modified|updated|wrote|edited).*?['"]([^'"]+)['"]/gi` — file
  tracking, which wave file-partitioning and merge safety depend on, is a
  natural-language guess.
- `subagent-dispatcher.js:617-624` — "best-of" selection picks **the longer
  string**.

Without a machine-checkable contract there is no basis for retry semantics,
caching, dependency resolution or verification. This blocks D2's remedy.

---

## D6 — Rebrand corruption · HIGH · VERIFIED-LIVE

```bash
ls -d .cyryx-labs-core            # does not exist
git grep -l "cyryx-labs-core" | wc -l   # 36
git grep -l "Cyryx Labs_"       | wc -l   # 10
```

36 files reference `.cyryx-labs-core/`, which is not on disk — including
`synapse-engine.cjs:19,54`, `context-tracker.js:105`, four Python guard hooks,
all three husky hooks, `.github/CODEOWNERS`, `.gitmodules`, and all 12
`.cursor/rules/agents/*.mdc` footers.

Brand distribution across the tree:

| Metric | Count |
|---|---|
| Tracked files | 2,876 |
| Files mentioning `cyryx` | 2,307 (80.2%) |
| Files mentioning `aexos` | 306 (10.6%) |
| Files mentioning upstream brand tokens | **0** — purged, see below |
| `.cyryx-core` literal occurrences | 12,837 |
| Filenames containing `cyryx` | 1,540 |

`governance/`, `audits/` and `.synapse/` contain **zero** AEXOS references — the
governance layer was not touched by the rebrand.

**Upstream brand tokens: purged (28 files).** A separate pass removed every
remaining reference to the upstream organisation and product name — GitHub
org/repo URLs across `.github/` workflows and templates, `CODEOWNERS`,
`dependabot.yml`, `.gitmodules`, `.gitignore`, `.env.example`, generated
artifacts under `.cyryx/`, the IDE projections under `.kimi/`, `.antigravity/`
and `.github/agents/`, and one stale task filename — renamed to
`squad-creator-sync-cyryx.md`, aligning it with the canonical agent's
`sync-squad-cyryx` command and resolving the registry drift noted in D14.

Deliberately **not** a bulk replace — occurrences were classified by context
first, and the change was verified afterwards: all 7 touched JSON files parse,
all 10 touched YAML files parse, ASCII box-drawing width preserved, and the lint
result is byte-for-byte unchanged (21 problems / 9 errors), i.e. zero new
defects introduced.

The submodule URL in `.gitmodules` was repointed to the current organisation.
**It requires confirmation** — the previous URL already returned 404, so nothing
regressed, but the new one has not been verified to exist.

`scripts/semantic-lint.js` enforces `docs/glossary.md`, titled *"CYRYX Glossary
— Official terminology for CYRYX 4.x differentiation"*, at error level. **The
linter actively enforces the old brand.** No CYRYX→AEXOS rule exists.

`CHANGELOG.md` stops at `[5.2.9] - 2026-05-21`. `package.json` is at `5.3.0`.
The entire rebrand is undocumented, though line 3 claims *"All notable changes to
AEXOS (Cyryx) will be documented in this file."*

---

## D7 — Distribution broken · MEDIUM · VERIFIED-LIVE

```bash
npm view @cyryx-squads/core version
# npm error 404 Not Found
```

The package name declared in `package.json` is not published. `README.md:106`
still instructs `npm install -g @cyryx-squads/core`; the Start Here block was
changed to `npx github:CyryxLabs/AEXOS init`, which is a workaround, not a
distribution channel.

No `.claude-plugin/plugin.json` or marketplace manifest exists — the Claude Code
plugin channel is unused. Installation is a file-copy installer projecting into
`.claude/`, `.codex/`, `.gemini/`, `.cursor/`, `.grok/`, `.kimi/`,
`.antigravity/`.

The codecov badge (`README.md:12`) still points at `CyryxLabs/cyryx-core`.

---

## D8 — Model registry a generation stale · MEDIUM

No reference to the Claude 5 family exists anywhere in the repository.

| Location | Declared model |
|---|---|
| `core-config.yaml:401` | `models.active: claude-sonnet-4-6` |
| `ai-provider-factory.js` DEFAULT_CONFIG | `claude-3-5-sonnet` |
| `ai-provider-factory.js` DEFAULT_CONFIG | `gemini-2.0-flash` |
| `docs/roadmap.md` (MoE routing table) | Claude 3.7 Sonnet, GPT-o3-mini, DeepSeek-R1 |

`core-config.yaml` also declares `contextWindow: 1000000` for `claude-opus-4-6`.
For a framework whose product is model orchestration, the registry is the
credibility surface.

---

## D9 — Provider abstraction is dead code · MEDIUM

`.cyryx-core/infrastructure/integrations/ai-providers/` — 1,554 LOC across
`ai-provider.js` (base), `claude-provider.js` (spawns the `claude` CLI),
`gemini-provider.js`, `openai-compatible-provider.js`, and a factory with
config-driven fallback and retry.

```bash
git grep -rln "ai-provider-factory" -- '*.js'
# only its own index.js and its test
```

Nothing in the framework consumes it. This is roughly 80% of a headless
execution backend, already written and already tested, sitting unused — the
single largest piece of salvage available to D2.

---

## D10 — Version identity drift · MEDIUM

| Source | Version |
|---|---|
| `package.json` | 5.3.0 |
| `.cyryx-core/framework-config.yaml:16` | 4.0.0 |
| `.cyryx-core/core-config.yaml:5` | 2.1.0 |
| `README.md:48` | "CYRYX 4.2 Reality" |
| `.cyryx-core/product/README.md` (footer) | "v4" |
| `CHANGELOG.md` (latest entry) | 5.2.9 |

---

## D11 — Declared parallelism does not limit concurrency · MEDIUM

`core/orchestration/parallel-executor.js:92-111` — the caller at line 37 does
`phases.map(async ...)`, which **starts every promise immediately**.
`_executeWithConcurrencyLimit` then receives already-running promises and wraps
them in `Promise.resolve().then(() => task)`. The `Promise.race(executing)`
throttle gates nothing; all phases run at once regardless of `maxConcurrency`.

Other "parallel" surfaces:

- `core/execution/parallel-executor.js` — dual **provider** execution of the
  same prompt (race / consensus / best-of / merge). One logical agent, two
  models. Not multi-agent parallelism.
- `core/execution/wave-executor.js:150-199` — a correct `Promise.allSettled`
  over chunks, but `this.taskExecutor` is never provided; line 239 falls through
  to a no-op `defaultExecutor`.
- `core/sdc/dispatch-adapter.js:106-132` — a correct order-preserving promise
  pool, defaulting to `sequential`, `worker` never supplied.

`workflow-intelligence/engine/wave-analyzer.js` performs real DAG construction
with cycle detection and produces valid wave partitions. It is a **planner whose
output nothing consumes concurrently**. `cyryx wave` only plans, saves and marks
status.

---

## D12 — Agent registry recognises 7 of 12 personas · MEDIUM

`core/orchestration/agent-invoker.js:32-75` hardcodes an allowlist of
`pm, architect, analyst, dev, qa, devops, po`. Twelve personas exist.
`sm`, `ux-design-expert`, `data-engineer`, `cyryx-master` and `squad-creator`
return `Unknown agent`. Meanwhile `subagent-dispatcher.js:58-81` routes
`database → @data-engineer`, an agent the invoker rejects.

Each persona is also quadruplicated with no single source of truth:
`development/agents/{id}.md` (canonical), `.claude/skills/**/SKILL.md`
(generated copy), `.synapse/agent-{id}` (rule extract), and
`.claude/commands/**/{id}.md` (shim). The shim path uses `CYRYX` where the real
directory is lowercase `cyryx` — **works on Windows/macOS, breaks on any
case-sensitive filesystem** (Linux CI, Docker).

---

## D13 — Governance loop stalled · MEDIUM

`.cyryx-core/constitution.md` v1.1.0 numbers its articles **I–VI, then XI–XII**
(verified: headings jump from `### VI. Absolute Imports` to
`### XI. Squad-First Portability`). Articles VII–X do not exist.

**The bottleneck is implementation, not approval.** Both proposals in
`governance/proposals/` carry `approver_decision: "APPROVED"`, signed
`2026-05-07T19:15:00Z` — same day they were written:

| Proposal | Decision | Delivered? |
|---|---|---|
| `PROP-20260507-vocabulary-contract.yaml` | **APPROVED** | ❌ Article VII still absent 14 months later |
| `PROP-20260507-squad-routing-strategy.yaml` | **APPROVED** | partially — squad tiers exist |

> **Correction.** An earlier version of this finding reported both proposals as
> `PENDING`. That was wrong: the `PENDING` values are the template default
> (`governance/templates/framework-proposal-tmpl.yaml:48`) and a worked example
> inside the pipeline doc (`governance/evolution-pipeline.md:343`), not the
> proposals themselves. The corrected finding is more serious — approval took
> hours; delivery never happened. A pipeline that approves and does not ship
> produces approved-but-absent policy, which is worse than a visible backlog
> because it reads as complete.

Remaining governance gaps:

- `governance/patterns/` contains only a README — zero catalogued patterns,
  despite two approvals that should have produced them.
- `governance/README.md` lists `handoff-types.md` as `(TBD)`.
- **No stage tracks proposal → PR → merge.** `evolution-pipeline.md` defines
  audit → finding → proposal → approval → PR → distribution, but nothing records
  whether the PR was ever opened. The Article VII gap went unnoticed because no
  artifact was watching for it.
- The pipeline still designates a **single** human approver. Bus-factor 1 remains
  a real risk for OSS scale and enterprise due diligence, but the evidence shows
  it is **not** the current bottleneck.

**Provenance — resolved.** The governance corpus was inherited from upstream and
named that project's owner as sole approver across 14 tracked files, including
a schema decision field bearing that person's given name, and a scope note reading *"internal to
&lt;owner&gt;'s projects for now"*.

Resolved in two deliberately separate categories:

| Category | Files | Action | Rationale |
|---|---|---|---|
| **Governance role** | 9 | approver → **Paulo Petruff** | A forward-looking role assignment. Legitimately transferable with ownership |
| **Historical audit records** | 3 | anonymised to *"the orchestrator"* | These quote a specific person and reference their machine and private projects on a specific date. Renaming the actor would make the record **false**, not updated |

The schema decision field was renamed to **`approver_decision`**
(likewise `approver_decision_at`, `approver_decision_rationale`,
`approver_approval`). Verified safe: a grep for the old field name across `*.js`, `*.ts` and `*.json` returned nothing — the field is read only by humans, never by
code. A role-based field name is also what this finding prescribes; substituting
one individual's name for another would have re-embedded bus-factor 1 into the
schema itself.

**Also removed.** `audits/c-dev-organization-2026-05-07.md` was a dated cleanup
plan for a third party's local `C:/dev` directory — their projects and disk
sizes, 51 loose CRM/WhatsApp screenshots, five worktrees for their epics, CRM
data exports, a deployment URL, and five questions addressed to them personally.
Read in full before deletion: it carried no framework content. Its only residual
value was as provenance for why `audits/` and `governance/` exist, which is
recorded here instead.

The two promoted findings in `audits/promoted/` were **kept** — both concern the
framework itself (`@cyryx-master` routing matrix; the vocabulary-contract
failure that motivated Article VII).

Inbound references were repaired, not orphaned: the example filename in
`audits/README.md` was genericised, and the markdown link in
`governance/squad-activation-strategy.md:300` was replaced with a note recording
why the file is gone.

Separately, `docs/GUIDING-PRINCIPLES.md` claims *"No code in core: the framework
itself contains no programming code, only natural language instructions"* — false
today, and the document is unversioned, un-ratified and unreferenced by the
constitution.

---

## D14 — Duplicate roadmaps · LOW

`docs/roadmap.md` and `docs/framework/strategic_roadmap.md` are byte-identical.
Neither cross-links to `docs/framework/epics/core-super-update/ROADMAP.md`, which
is the actual delivery board. The strategic roadmap is written entirely in the
old brand (`cyryxd`, "Cyryx Hub", `.cyryx/`) and contains no item for completing
the rebrand.

ADR coverage is thin: `docs/architecture/adr/` holds one file. Four other ADRs
exist **only** in the translated trees (`docs/es/`, `docs/pt/`, `docs/zh/`).

**The mechanical cause is `.gitignore:253-258`:**

```
docs/architecture/*
!docs/architecture/
!docs/architecture/orchestration-hierarchy.md
!docs/architecture/adr/
docs/architecture/adr/*
!docs/architecture/adr/ADR-SDC-WAVE-CHECKPOINT-OWNERSHIP.md
```

The primary ADR directory is ignored with a **per-file allowlist**. Any ADR
written there is invisible to git unless someone remembers to add a negation
line. The translated ADRs survive only because `docs/es/architecture/adr/` is
not matched by the pattern.

```bash
git check-ignore -v docs/architecture/adr/ANY-NEW-ADR.md
# .gitignore:257:docs/architecture/adr/*
```

This is why decision history is uncaptured in the primary tree: the default
outcome of writing an ADR is that it is silently untracked. Fixing the
governance loop (D13) without fixing this guarantees the next ADRs are lost the
same way.

---

## D15 — 19% of documentation links point at files that never existed · MEDIUM · VERIFIED-LIVE

Across the 1,234 tracked markdown files, **450 of 2,372 relative `.md` links
(19.0%) are broken**, resolving to **243 distinct missing targets**.

They are not recoverable, and they were not lost in the fork:

| Where the target exists | Count |
|---|---|
| In the upstream repository | **0** |
| On disk but gitignored | **0** |
| **Nowhere — never existed** | **243** |

Concentration by area:

| Missing targets | Area |
|---:|---|
| 54 | `docs/zh/` |
| 40 | `docs/architecture/` |
| 19 | `.cyryx-core/development/` |
| 14 | `.cyryx-core/docs/` |
| 13 | `docs/.cyryx-core/` (a path shape that cannot exist) |
| 10 | `docs/guides/` |

Reproduce:

```bash
git ls-files '*.md' > /tmp/md.txt
# resolve every relative .md link and test existence;
# then test each missing target against the upstream file list
```

**Why this matters beyond tidiness.** Constitution Article IV ("No Invention")
requires every specification statement to trace to a real requirement or
artifact. A documentation corpus in which one link in five points to a file that
was never written is asserting artifacts that do not exist — the same class of
defect as D2 (a pipeline reporting success without executing) and D5 (file
ownership inferred from prose). In all three cases the system states something
unverifiable and nothing checks it.

It also has a direct cost for the agents: the corpus is what personas read. A
task instructing an agent to consult a document that does not exist produces
either a silent skip or a fabricated substitute.

**Remedy** (not scoped to a wave yet): add a link-integrity check to CI over
tracked markdown, then triage the 243 — write the genuinely-needed documents,
delete the rest. The check must run *before* the triage, or the count grows back.

Note that the `docs/architecture/*` cluster (40 targets) is compounded by the
gitignore rule described in D14: even if those documents were written, the
default outcome is that they are never committed.

---

## What is strong — preserve verbatim

The audit found a system with the harder half already built correctly.

1. **The knowledge corpus.** 215 task files and 12 richly specified personas
   carrying `responsibility_boundaries`, delegation patterns, `git_restrictions`
   with explicit allow/block operation lists, and severity-mapped review
   integration. This is the product. Add schema *around* it; do not rewrite it.
2. **Governance as code.** Versioned constitution with BLOCK/WARN/INFO gate
   severities; Article XII (budget ceilings, routing authority, story binding,
   prompt-injection scanning); `core/permissions/` — `dispatch-governance.js`,
   `path-guard`, `prompt-guard`, `ssrf-guard`, `operation-guard`, each with
   tests. No competing framework ships enforced organisational policy as a
   first-class artifact.
3. **Correct deterministic planners.** `wave-analyzer` (DAG + cycle detection +
   critical path), `core/sdc/` phase state machine with durable state and a
   `preflight` gate returning meaningful exit codes, `epic-context-accumulator`
   (token-budgeted compression, 8000-token limit with progressive levels),
   `condition-evaluator` + `tech-stack-detector` for declarative phase gating.
4. **Self-diagnosis depth.** 13 SYNAPSE diagnostic collectors, `core/doctor/`
   (23 files), `core/health-check/` (50 files), dashboard event emission.
   Notably, `uap-collector.js` and `consistency-collector.js` were built to
   detect precisely the session-desync failure described in D4.
5. **Provider abstraction** (D9) and **multi-IDE projection** with drift
   validation (`validate:parity`, `sync:ide:*`).
6. ~398 test files.

---

## Reproduction

```bash
git clone https://github.com/CyryxLabs/AEXOS.git && cd AEXOS && npm ci

# D1
for f in .claude/hooks/*.cjs; do node --check "$f" || echo "BROKEN: $f"; done
echo '{"tool_name":"Bash","tool_input":{"command":"git push"}}' \
  | node .claude/hooks/enforce-git-push-authority.cjs; echo "exit=$?"

# D3
npm run lint; echo "exit=$?"

# D6
ls -d .cyryx-labs-core; git grep -l "cyryx-labs-core" | wc -l

# D7
npm view @cyryx-squads/core version

# D9
git grep -rln "ai-provider-factory" -- '*.js'
```
