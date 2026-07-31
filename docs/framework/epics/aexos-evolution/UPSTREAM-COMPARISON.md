# Provenance Analysis — Fork Damage vs Inherited Architecture

**Baseline:** `f2e559c` · **Compared against:** the upstream framework from which
this tree was derived, at its own HEAD (2026-07-13).

This document exists to answer one question precisely:

> **Which findings in [DIAGNOSTIC.md](./DIAGNOSTIC.md) were introduced by the
> rebrand, and which are architectural properties inherited from upstream?**

The answer changes the cost of Wave 0 by an order of magnitude, and it confirms
that the Wave 1 thesis is a genuine architectural gap rather than fork breakage.

---

## Provenance

This tree is a **squashed snapshot fork**, not a branch with shared history.

| Evidence | Observation |
|---|---|
| Commit history | 9 commits, **all dated 2026-07-28**, beginning with the rebrand commit `e1232ec`. Upstream history (thousands of commits, 30 tags) is absent |
| Version | Both declare `5.3.0` — identical snapshot point |
| Scale | 2,876 tracked files here vs 2,982 upstream; the core directory holds exactly 1,211 files in both; both have 464 test files and 62 squad files |
| **Hook files** | After normalising brand tokens, `enforce-git-push-authority.cjs` and `synapse-engine.cjs` are **byte-identical** (matching MD5) between the two trees |

The last row is decisive: the hooks in this repository are upstream's hooks with
a find/replace applied. The only difference is the corruption.

```bash
# reproduction
sed -E 's/<upstream-token>/XXX/gi' <upstream>/.claude/hooks/synapse-engine.cjs | md5sum
sed -E 's/[Cc]yryx[ -]?[Ll]abs|[Cc]yryx/XXX/g'  .claude/hooks/synapse-engine.cjs | md5sum
# → same digest
```

---

## Classification of findings

### Group A — introduced by the fork (upstream is clean)

These do not exist upstream. They are repairable by restoring the pre-replace
form of the affected lines.

| # | Finding | This tree | Upstream |
|---|---|---|---|
| D1 | Hook integrity | 2 of 5 `.cjs` hooks throw `SyntaxError`; SYNAPSE resolves a directory that does not exist | **5 of 5 pass**; SYNAPSE resolves correctly |
| D1 | `git push` guard | crashes before emitting a decision → push proceeds | **works**: `permissionDecision: "deny"` with no agent (fail-closed), allows `@devops` |
| D3 | Lint | 21 problems, **9 errors** | **0 problems** |
| D6 | Brand corruption | 36 files reference a non-existent core directory; 10 files carry identifiers containing a space | **0 and 0** |
| D7 | npm distribution | package returns **404** | **published at 5.3.0** |
| — | CI history | **0 runs**, 0 tags, no branch protection | **6,693 runs**, 30 tags |

**All nine lint errors trace to the rebrand commit `e1232ec`:** three parse
errors from corrupted identifiers, and six `no-undef` errors in `public/app.js`
— a landing page added by that same commit, whose browser globals are not
declared in `eslint.config.js`.

The third parse error is in a file not caught by the hook audit:
`packages/installer/src/wizard/pro-setup.js:301` — `cyryx-labsCoreVersion:`, a
hyphen inside an identifier. It ships inside the installer package.

### Group B — inherited architecture (identical upstream)

These are **not** fork damage. They are properties of the framework's design and
are the actual subject of this epic.

| # | Finding | Present upstream? |
|---|---|---|
| D2 | `dispatchSubagent` never wired outside tests | **Yes** — same single call site, same optional-callback shape |
| D2 | Silent-success defaults (`// Default: simulate execution`, `status: 'simulated'`, `StubEpicExecutor`) | **Yes** — same five sites |
| D4 | `DEFAULT_ACTIVE_LAYERS = [0, 1, 2]` — 3 of 8 SYNAPSE layers active | **Yes** — identical constant and comment |
| D5 | No task I/O contract; output parsed by regex over prose | **Yes** |
| D11 | Concurrency limiter does not limit | **Yes** |
| D12 | Agent invoker allowlist covers 7 of 12 personas | **Yes** |
| D13 | Governance loop stalled; Articles VII–X absent | **Yes** |
| — | `development/scripts/branch-manager.js:216` fails `node --check` | **Yes** — ESLint-ignored, coverage-excluded, untested, so no gate sees it |

> **This is the important result.** Wave 1 is not cleanup after a bad merge. The
> execution kernel is missing in the upstream too — it is a real architectural
> gap in the lineage, and closing it is genuine differentiation rather than
> catch-up.

### Group C — lost in the fork

Present upstream, absent here. Each is a deliberate decision to confirm, not
necessarily a defect.

| Item | Note |
|---|---|
| `pro/` | Pro-tier submodule. The submodule URL here points at a repository that returns 404 |
| `outputs/` | Referenced by `quarterly-gap-audit.yml`, which runs `node outputs/architecture-map/schemas/*.js` — that scheduled job is permanently broken without it |
| `.codex/` | Tracked upstream; gitignored here, so the Codex projection is not versioned |
| ~106 files | Net difference (2,982 → 2,876), largely the above plus docs |

---

## Consequence for Wave 0

The original Wave 0 plan assumed hand-repair of each corrupted line. That is no
longer the cheapest or safest path.

**Every Group A defect has a known-good reference form.** The remediation is a
line-level diff against the pre-replace source, applying the brand token
correctly, rather than reconstructing intent from a broken file.

This does not change the Wave 0 scope, and it does **not** license another bulk
replace — the corruption being repaired is exactly what a bulk replace produced.
The sequencing constraint in
[ARCHITECTURE-WAVE-2.md](./ARCHITECTURE-WAVE-2.md#aex-24--complete-the-cyryxaexos-migration)
stands: prose first, identifiers one subsystem per PR, structural renames last,
every change gated by a syntax check and a behavioural test.

The highest-leverage single action remains **AEX-0.4** — a CI job that executes
the hooks. Upstream has 6,693 CI runs and none of these defects; this tree has
zero runs and three shipped files with fatal syntax errors. The difference is
not talent or care. It is that here, nothing ever executed the code.

---

## Licensing note — requires a decision, not an implementation

The upstream is **MIT licensed**, and its `LICENSE` carries a two-party
copyright chain: the original framework's author, and the upstream organisation
as author of the derivative work. The MIT terms state:

> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.

This repository's `LICENSE` replaces that text entirely with a proprietary
"all rights reserved" notice. Separately, `package.json` declares
`"license": "MIT"` and `README.md` displays an MIT badge — so the three
artifacts currently contradict one another.

This is flagged as a fact, not a recommendation. Resolving it is an ownership
decision and should be made deliberately, with counsel if appropriate. It is
**not** in scope for any wave in this epic.
