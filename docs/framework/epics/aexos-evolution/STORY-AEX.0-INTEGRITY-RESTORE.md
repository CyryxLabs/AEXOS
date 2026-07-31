# STORY-AEX.0 — Integrity Restore

**Epic:** [EPIC-AEXOS-EVOLUTION](./EPIC-AEXOS-EVOLUTION.md)
**Architecture:** [ARCHITECTURE-WAVE-0.md](./ARCHITECTURE-WAVE-0.md)
**Evidence:** [DIAGNOSTIC.md](./DIAGNOSTIC.md) · [UPSTREAM-COMPARISON.md](./UPSTREAM-COMPARISON.md)
**Status:** InReview
**Baseline:** `f2e559c`

> **Process note.** This story was written *after* the work, to satisfy
> Constitution Article III. That ordering is itself a violation of Article III
> and is recorded here rather than hidden. The work was authorised
> conversationally as an emergency repair of the framework's own enforcement
> layer — the condition being repaired was that Article II was unenforceable.
> AEX-0.4 (CI hook execution) is the control that prevents a recurrence.

---

## Description

Three of the framework's enforcement points were inert at HEAD, and the CI that
would have caught them had never executed. Commit `e1232ec` (rebrand) applied a
find/replace of `CYRYX_` → `Cyryx Labs_` **inside identifiers** and
`.cyryx-core` → `.cyryx-labs-core` **inside paths**, producing fatal syntax
errors in shipped files.

Most consequentially: the `PreToolUse` guard reserving `git push` to `@devops`
under Article II threw `SyntaxError` at load, emitted no decision, and therefore
permitted every push.

## Acceptance Criteria

| # | Criterion | Result |
|---|---|---|
| AC1 | Every `.claude/hooks/*.cjs` passes `node --check` | ✅ 5/5 |
| AC2 | A non-`@devops` `git push` is denied; `@devops` is allowed | ✅ verified live |
| AC3 | `UserPromptSubmit` injects non-empty context | ✅ 3,928 bytes |
| AC4 | `npm run lint` exits 0 | ✅ 0 errors, 12 warnings |
| AC5 | Zero references to a non-existent core directory | ✅ 0 (was 36 files / 116 refs) |
| AC6 | Zero identifiers containing a space | ✅ 0 (was 10 files) |
| AC7 | No new defects introduced by the change | ✅ JSON/YAML parse clean; lint unchanged at each step |
| AC8 | Validator gates green | ✅ 9 of 10 (was 3) |

## Tasks

- [x] Repair `SyntaxError` in `enforce-git-push-authority.cjs` (`Cyryx Labs_*` → `CYRYX_*`)
- [x] Repair `SyntaxError` in `precompact-session-digest.cjs` (`CYRYX_HOOK_CONTEXT`)
- [x] Repair `SyntaxError` in `packages/installer/src/wizard/pro-setup.js` — upstream carries **two distinct keys**; the replace collided them into one invalid identifier
- [x] Repair `.cyryx-labs-core` → `.cyryx-core` across 36 files (116 references)
- [x] Repair `.synapse/manifest` keys — a space inside a `KEY=VALUE` key broke the master agent's L2 domain parse
- [x] Repair `Cyryx Labs_MONITOR_URL` in the Python monitor hooks and `%Cyryx Labs_HOME%` in three `.cmd` templates
- [x] Fix inherited bug `branch-manager.js:216` — `await` inside a non-`async` `.filter()` callback; hoisted the invariant call out of the predicate
- [x] Fix `.claude/{commands,skills}` casing `cyryx` → `CYRYX` — the compatibility contract and `core-config.yaml` both specify uppercase; lowercase breaks on case-sensitive filesystems
- [x] Add `public/**` browser-globals override to `eslint.config.js` (6 `no-undef` errors from the landing page added by `e1232ec`)
- [x] Regenerate IDE projections (`sync:ide`, `sync:skills:codex`) — `.codex/` was gitignored while the contract required it
- [x] Regenerate install manifest and entity registry after the task-file rename
- [x] Purge remaining upstream brand tokens (28 files, context-classified — **not** a bulk replace)
- [ ] **AEX-0.4 — CI job executing the hooks.** Not done. This is the control that makes the rest durable.
- [ ] AEX-0.6 version identity + 5.3.0 CHANGELOG entry
- [ ] AEX-0.7 model registry refresh
- [ ] AEX-0.8 SYNAPSE documentation reconciliation

## Dev Notes

**Deliberately not a bulk find/replace.** The defect being repaired *was* a bulk
find/replace. Every occurrence was classified by context first (org URL, team
handle, submodule, marketplace concept, ASCII art, generated artifact), and each
category was verified afterwards: 7 JSON and 10 YAML files re-parsed, ASCII
box-drawing width confirmed preserved at 75 characters, and the lint result
compared before and after each step to prove zero new defects.

**Env-var naming.** Restored to `CYRYX_*`, matching the 25 existing occurrences
of `CYRYX_ACTIVE_AGENT` elsewhere in the tree. Introducing `AEXOS_*` now would
create a third convention mid-migration; AEX-2.4 owns that rename with a
deprecation window.

**Hook deny protocol — corrects an earlier assumption in this epic.** The guard
does not block via exit code 2. It emits
`{"hookSpecificOutput":{"permissionDecision":"deny"}}` on stdout and exits 0. The
`SyntaxError` meant that JSON was never emitted at all. ARCHITECTURE-WAVE-0 was
amended accordingly; the logic itself was correct and was **not** rewritten.

**Two files still fail `node --check` and should stay that way** —
`development/templates/squad/tool-template.js` and
`product/templates/token-exports-tailwind-tmpl.js` contain `{{PLACEHOLDER}}`
markers by design. AEX-0.4's CI job must exclude template paths or it will fail
permanently.

**Remaining gate failure is inherited, not fork damage.**
`npm run validate:structure` targets
`.cyryx-core/infrastructure/scripts/source-tree-guardian/index.js`, which does
not exist here **or upstream**. Orphaned script. Needs a decision: restore the
module or remove the script.

## File List

103 files modified or renamed. By area:

| Area | Files | Nature |
|---|---|---|
| `.claude/commands/**` | 18 | casing rename + regenerated projection |
| `.claude/skills/**` | 12 | casing rename + regenerated projection |
| `.cursor/rules/**` | 12 | regenerated projection |
| `.claude/hooks/**` | 6 | **syntax repair + path repair** |
| `.github/workflows/**` | 6 | brand-token purge |
| `.cyryx-core/infrastructure/**` | 5 | path repair, `.cmd` templates |
| `.cyryx/{cache,audit}/**` | 5 | generated artifacts |
| `.cyryx-core/monitor/**` | 2 | Python env-var repair |
| `.cyryx-core/development/**` | 2 | `branch-manager.js` fix + task rename |
| `.kimi/skills/**` | 2 | regenerated projection |
| `packages/installer/**` | 1 | **`pro-setup.js` syntax repair** |
| `eslint.config.js` | 1 | browser-globals override |
| `.synapse/manifest` | 1 | **key repair** |
| others | ~30 | `.github` templates, `.gitmodules`, `.gitignore`, `.env.example`, manifest, registry |

Renamed: the `squad-creator` sync task, whose filename still carried the upstream
product name, → `squad-creator-sync-cyryx.md` (aligns with the canonical agent's
`sync-squad-cyryx` command; resolves the registry drift).

New: `docs/framework/epics/aexos-evolution/` — 14 planning documents.

## Change Log

| Date | Change | By |
|---|---|---|
| 2026-07-29 | Story created retroactively (see Process note); Wave 0 work recorded | @cyryx-master |
| 2026-07-29 | Status Draft → InReview | @cyryx-master |

## QA Results

_Pending @qa review._

Gate evidence available for independent reproduction:

```bash
for f in .claude/hooks/*.cjs; do node --check "$f" || echo "BROKEN: $f"; done
npm run lint                      # exit 0
npm run validate:parity           # PASS
npm run sync:ide:check            # PASS
npm run validate:manifest         # PASS
npm run validate:registry-determinism  # PASS
git grep -l "cyryx-labs" | wc -l  # 0
```

**Not authorised for push.** Article II reserves `git push`, PR creation and
releases to `@devops`.
