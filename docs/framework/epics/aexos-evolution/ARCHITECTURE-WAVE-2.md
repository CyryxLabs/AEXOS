# Architecture — Wave 2: Distribution & Identity

**Epic:** [EPIC-AEXOS-EVOLUTION](./EPIC-AEXOS-EVOLUTION.md) · **Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md)
**ADR:** [004 Distribution](./adr/ADR-AEX-004-DISTRIBUTION-PLUGIN-MCP.md)
**Blocked by:** Wave 1. AEX-2.1 additionally blocked on an Article I ruling.

Wave 1 makes AEXOS work. Wave 2 makes it reachable, installable and coherently
named.

---

## AEX-2.1 — Plugin + `aexosd` MCP surface

Three channels, one source of truth (`squads/` and `.cyryx-core/development/`
remain canonical per Article XI):

| Channel | Serves | Contains |
|---|---|---|
| Claude Code plugin | Claude Code | skills, commands, agents, hooks, MCP registration |
| `aexosd` MCP server | any MCP client | execution, planning, governance, status |
| File-copy installer | Cursor, Copilot, AntiGravity | current behaviour, retained |

**Plugin.** Ship `.claude-plugin/plugin.json` with a marketplace manifest.
Versioned, installable, updatable natively; registers `aexosd` so MCP setup is
not a separate manual step. None of this exists today.

**Daemon tools** map to Wave 1 capabilities, all entering through
`AgentRuntime` so governance cannot be bypassed by choosing MCP over CLI:

- `task.execute` — run a contracted task (AEX-1.1), governed (AEX-1.4)
- `wave.plan` / `wave.next` — DAG planning and scheduling
- `story.status` / `sdc.verify` — durable state queries
- `governance.evaluate` — budget and story-binding checks

**Why after Wave 1.** The prior roadmap put `cyryxd` in Phase 1. The instinct is
right — MCP is a protocol, so one implementation replaces N projection formats —
but sequencing it first would have published DIAGNOSTIC D2 as an API: a daemon
faithfully returning fake success.

**New operational surface.** Lifecycle, port binding, health, concurrent
sessions, crash recovery. `validate:port-denylist` exists; daemon supervision
does not. Parity validation must extend to MCP tool definitions, not just agent
file copies.

**Blocked on EPIC open decision 3.** Article I is NON-NEGOTIABLE and says
non-CLI surfaces observe rather than control. An MCP server *executes*. Either
MCP is CLI-equivalent (headless, scriptable, non-graphical — the article targets
GUIs), or it is a third controlling surface requiring a constitutional
amendment. Settle before AEX-2.1 begins, not during it.

---

## AEX-2.2 — npm identity

`npm view @cyryx-squads/core version` → **404**. `README.md:106` still instructs
`npm install -g @cyryx-squads/core`. The Start Here block uses
`npx github:CyryxLabs/AEXOS init` — works, but gives no semver resolution, no
integrity checking, no metrics, and clones the full repository per install.

Two acceptable outcomes; the current state is neither:

1. Publish under a name matching the product, or
2. Remove the npm instruction and document `npx github:` as the supported path.

Publishing is outward-facing and effectively irreversible once users install —
it requires explicit owner authorisation, not an implementation decision.

Renaming the package implies renaming `.cyryx-core/` (12,837 literal
occurrences) and the `cyryx` binary. That is deliberately scoped to AEX-2.4 with
a migration path, not smuggled in here.

---

## AEX-2.3 — Squad registry with enforced compatibility

`.cyryx-core/schemas/squad-schema.json` already declares `cyryx.minVersion`.
Nothing enforces it.

Current state: `.gitignore:59-63` ignores `squads/*` with an allowlist for
`_example` and `claude-code-mastery`. Squads are private-by-default,
published-by-allowlist — so unpublished squads receive no CI at all.
`venture-strategy` shows the cost: its `config.yaml` registers 13 tasks with 6
files present, and declares `templates/`, `checklists/`, `workflows/` and `data/`
components where **none of those directories exist**. Gitignored, so nothing
validates it.

Scope:

- Enforce `minVersion` at load, with a clear incompatibility error.
- Validate every squad against `squad-schema.json` in CI, including gitignored
  ones present in the working tree (validate what is on disk, not only what is
  committed).
- Declared components must exist. A `config.yaml` promising directories that are
  absent is a hard failure.
- Squads declare which task contracts they satisfy (AEX-1.1), giving versioning
  something concrete to check.

The hosted marketplace (`api.cyryx.dev`, referenced in the squads guide and
present nowhere in code) stays deferred. No demand signal, and the registry is
the prerequisite.

---

## AEX-2.4 — Complete the CYRYX→AEXOS migration

| Metric | Current |
|---|---|
| Files mentioning `cyryx` | 2,307 / 2,876 (80.2%) |
| Files mentioning `aexos` | 306 (10.6%) |
| Upstream brand tokens | **0 — already purged** |
| `.cyryx-core` literal occurrences | 12,837 |
| Filenames containing `cyryx` | 1,540 |

`governance/`, `audits/` and `.synapse/` contain **zero** AEXOS references.

**Done ahead of this story:** the third brand — the upstream organisation and
product name — has been fully removed (28 files, context-classified rather than
bulk-replaced, verified with JSON/YAML parse checks and an unchanged lint
result). Two brands remain: CYRYX in code and paths, AEXOS in product surface.
This story closes that last gap.

**Invert the linter.** `scripts/semantic-lint.js` enforces `docs/glossary.md`,
titled *"CYRYX Glossary — Official terminology for CYRYX 4.x differentiation"*,
at error level. The linter currently enforces the old brand. Rewrite the glossary
for AEXOS terminology and add a CYRYX→AEXOS rule.

**Sequence, deliberately conservative.** Wave 0 exists because a bulk find/replace
on this repository produced `SyntaxError`s in three enforcement hooks and a
corrupted `KEY=VALUE` manifest. Do not repeat it.

1. Prose and documentation first — reversible, no execution risk.
2. Identifiers and env vars second, one subsystem per PR, each gated by the
   `hooks-integrity` job from AEX-0.4.
3. Structural renames last (`.cyryx-core/` → `.aexos-core/`, `bin/cyryx.js`)
   behind a deprecation window with a compatibility shim, since installed
   projects hold these paths.

**Never** run a global replace across executable code. Every identifier change
lands with a syntax check and a behavioural test.

---

## AEX-2.5 — Consolidate roadmaps; close the governance loop

**Roadmaps.** `docs/roadmap.md` and `docs/framework/strategic_roadmap.md` are
byte-identical, neither cross-links to the actual delivery board, and both are
written in the old brand (`cyryxd`, "Cyryx Hub", `.cyryx/`). Retire both;
[ROADMAP.md](./ROADMAP.md) carries the mapping of surviving pillars.

**ADR coverage.** `docs/architecture/adr/` holds one file. Four other ADRs exist
only in `docs/es/`, `docs/pt/` and `docs/zh/` — decision history is effectively
uncaptured in the primary tree. Consolidate into `docs/architecture/adr/` with an
index.

**Governance loop — the gap is delivery, not approval.** Both proposals in
`governance/proposals/` are `approver_decision: "APPROVED"`, signed
`2026-05-07T19:15:00Z`, the same day they were written. Yet the constitution
still jumps from Article VI to Article XI: **the approved vocabulary-contract
proposal, which created Article VII, was never implemented.**
`governance/patterns/` holds only a README — zero catalogued patterns despite two
approvals. `governance/README.md` lists `handoff-types.md` as `(TBD)`.

Scope, in priority order:

1. **Add a delivery stage to the pipeline.** `evolution-pipeline.md` defines
   audit → finding → proposal → approval → PR → distribution, but records only
   up to approval. Add `implementation: { pr, merged_at, verified_by }` to the
   proposal schema and a `cyryx governance status` command that lists approved-
   but-undelivered proposals. The Article VII gap survived 14 months precisely
   because no artifact was watching for it.
2. **Deliver the two approved proposals** — fill Articles VII–X, or renumber
   explicitly and record why.
3. **Convert the approver from a person to a role.** ✅ **Partially done.** The
   schema field is now `approver_decision` (was a person's given name), so the
   *schema* names a role. The prose still designates a single named individual as
   sole approver, which is correct for current ownership but leaves bus-factor 1
   intact. Adding a co-approver — `@architect` or `@qa`, as
   `evolution-pipeline.md` itself contemplates — remains open.
4. **Provenance.** ✅ **Done.** The inherited approver identity was resolved in
   two categories: the governance role transferred to the current owner, and the
   three historical audit records anonymised rather than reattributed — renaming
   the actor in a dated record that quotes them would falsify it, not update it.
   See DIAGNOSTIC D13.
5. **Third-party workspace audit.** ✅ **Done** — removed. It inventoried a third
   party's local directory, private projects and CRM exports, with no framework
   content. Inbound references repaired. The two framework-relevant findings in
   `audits/promoted/` were kept. See DIAGNOSTIC D13.

**Also:** reconcile or retire `docs/GUIDING-PRINCIPLES.md`, which claims *"the
framework itself contains no programming code, only natural language
instructions"* — false, unversioned, un-ratified, and unreferenced by the
constitution.

---

## Wave 2 exit gate

1. A Claude Code plugin manifest exists and installs cleanly from a marketplace
   entry.
2. `aexosd` serves the declared tools; every tool call passes through
   `AgentRuntime` and its governance gate.
3. `npm view <name> version` resolves, **or** the npm instruction is gone from
   the README.
4. Every squad on disk validates against `squad-schema.json`; declared
   components exist; `minVersion` is enforced at load.
5. `git grep -il cyryx | wc -l` is within an agreed allowlist, and
   `semantic-lint` enforces AEXOS terminology.
6. One roadmap. One ADR tree with an index. Zero PENDING proposals. The
   constitution names roles, not people.
