# Session State — 2026-08-01/02

Written mid-session so the work survives the conversation. Two repositories are
in flight. Everything below was measured, not assumed; where a number came from
a developer working tree rather than a clean clone, it is marked, because that
distinction produced four false readings in this session.

---

## The finding that explains the rest

`package-lock.json` on `main` carried **41 of 770 entries** resolving to
`../../AEXOS/node_modules/<pkg>` — a path outside the repository that does not
exist. Those link entries stood in place of whole dependency subtrees, which is
why the file held 770 entries where a complete one holds ~1086.

`npm ci` is the first step of every workflow — `ci.yml` eight times, `test.yml`
four, `npm-publish.yml` four, `release.yml` once. **Every job died before
executing a line.** That is why this repository has **zero Actions runs** while
having nineteen active workflows and Actions enabled.

It is also why three hooks reached `main` with a `SyntaxError`, why a gate that
prints `BLOCKED: Package is NOT safe to publish` was never noticed, and why
`ide-sync` validated a target that `.gitignore` excluded. Nothing ever ran.

Regenerated: 1086 entries, **0** resolving outside the repository, `npm ci`
exits 0 in ~26s with 916 packages. Verified in a fresh clone, twice, by two
different agents.

**Consumer installs were never affected.** The installer runs
`npm install --production` inside `.aexos-core/`, which has its own manifest and
never reads the root lockfile.

---

## Working tree vs clean clone

In this repository a developer's working tree lies **in both directions**. Four
times a gate was reported green that a runner would fail, and once the reverse.

| Gate | Working tree | Clean clone |
|---|---|---|
| `sync:ide:validate` | PASS | FAIL — validate prints FAIL and **exits 0**; only `--strict` exits non-zero, and `--strict` is what `ci.yml:514` runs |
| `manifest-validation` / `registry-determinism` | PASS | FAIL — passed only because of an uncommitted `entity-registry.yaml` that was itself the fix |
| `sync:ide` (after first fix) | Missing 0 | Missing 12 — `.codex/agents/*.md` existed locally, in no commit |
| `jest` | 44 failures | **0 failures** — the 44 came from a stale `pro/` on disk; CI never checks out `pro/` (`ci.yml:35-37`) |

**Rule for anyone continuing: measure in a clean clone. Nothing else counts.**

---

## AEXOS — branch `fix/wave-0-on-main`

14 commits over `origin/main` (`d776a2f`). **Not pushed.**

Clean-clone gates at `c7ec1d5`: `npm ci` exit 0 · lint 0 errors · typecheck
clean · build PASS · **391 suites, 9388 tests, 0 failures** · hooks 17/17 ·
package-completeness 35/35 · manifest, determinism, squads, port-denylist all
exit 0.

### What the branch fixes

| Area | Defect | Evidence |
|---|---|---|
| deps | lockfile resolving outside the repo | above |
| orchestration | concurrency limiter did not limit — peak 9 with `maxConcurrency: 3` | measured probe |
| orchestration | `Promise.allSettled` double-wrap: every result `undefined`, a throwing phase counted as success | same probe |
| orchestration | agent registry recognised 7 of 12 personas | `agent-invoker.js` |
| synapse | `.synapse/manifest` never reached the layers — engine always saw `{}` | `hook-runtime.js` |
| scripts | `core-config.yaml` written non-atomically without a lock; observed truncated to 6 lines of garbage by a concurrent agent activation | reproduced in test |
| identity | version disagreed across five sources; model registry a generation stale; `contextWindow: 1000000` on a base identifier under-reported depletion 5× | — |
| licence | three contradictory statements about the project's own terms | — |
| npm | two scopes in one repository (`@cyryxlabs` + `@aexos-squads`) | — |
| security | a password-shaped string and a real customer gmail address in files that ship in the tarball | `npm pack` |
| ci | four jobs that could never pass on a runner | above |

### Known-red, deliberately not fixed

- `pro/` submodule inconsistent: `main` has no `.gitmodules` and no gitlink, yet
  keeps 14 suites in `tests/license/` and 4 workflows depending on it
- ~40 documented commands exist under no binary (`aexos discover`, `list`,
  `squads download`, `rebuild`, `workflow`). Renaming them would make
  non-functional commands look current — decide between caveat and deletion
- `enforce-git-push-authority.cjs` scans the whole Bash command, so a **commit
  message** quoting push policy is blocked. Real false positive, hit twice
- `CyryxLabs` is a GitHub **User**, not an Organization
- Both removed secrets remain reachable in history at `a141f22`, `e1232ec`

---

## AEXOS License Server — new repository

`CyryxLabs/aexos-license-server`, private. Live at
`https://aexos-license-server.vercel.app` — the exact URL the client hardcodes
(`license-api.js`, `recover.js`). Vercel assigned the clean alias; a sibling
project got a suffix, so this was not guaranteed.

Next.js 16 / React 19 / TypeScript. Supabase provisioned (`aexos-license-db`),
16 env vars across Production, Preview and Development, verified byte-identical
between environments by SHA-256 rather than by reading the dashboard.

**6 commits on the local branch, not pushed** — the repo gate refused, and the
agent correctly declined to treat a message from another agent as authority to
bypass a permission control.

### Contract — corrected

The version field is **`cyryxCoreVersion`**, not `aexosCoreVersion`. Asserted at
`tests/license/license-api.test.js:109`; the only real caller
(`pro-setup.js:332-344`) sends `cyryxCoreVersion`, `cyryxLabsCoreVersion` and
`version` together. A server built to the wrong name receives `undefined`. The
server accepts all three.

`pro/license/license-api.js` is a scaffold whose every method throws, so the
**tests are the entire contract** — there is no working client to diff against.

### Decisions recorded

- **Seat concurrency in the database**: trigger increments (`seats_used + 1`),
  never recounts, with `CHECK (seats_used <= seats_max)`. A recount subquery's
  snapshot is not guaranteed to see a concurrent insert the way a
  read-modify-write of the row is. Idempotency via partial unique index on
  `(license_id, machine_id_hash) WHERE released_at IS NULL`
- **TLS**: Supabase's documented CA URL 404s. The root was obtained from the S3
  asset and cross-checked (subject, validity, fingerprint) against cert[2] of the
  live chain. Pinned at `certs/`, `rejectUnauthorized: true`.
  `rejectUnauthorized: false` appears nowhere
- **Connection**: all three provisioned strings are Supavisor pooler endpoints.
  `POSTGRES_URL_NON_POOLING` is session pooling despite the name. Use
  `POSTGRES_URL` (6543) in serverless; named prepared statements collide there
- **RLS** enabled *and forced* on all four tables, zero policies, `REVOKE ALL`
  from `anon`/`authenticated`
- `GET /health` added beyond scope — accepted: the client's `isOnline()` gates
  the whole activation flow on it
- `DEFAULT_PLAN_SEATS=3`, `DEFAULT_PLAN_TERM_DAYS=365` — **provisional**.
  ADR-AEX-007 fixes the entitlement namespace and says nothing about commercial
  term. Confirm before first paying customer

### Critical pending

**`LICENSE_KEY_SECRET` rotation does not re-encrypt existing rows.** Rotating it
without re-encrypting the column makes every issued key unrecoverable. A
rotation procedure must exist before the first customer.

---

## Infrastructure decisions taken

- npm scope consolidated on **`@aexos`** — org created, token issued, secret
  `NPM_TOKEN_AEXOS` in the repository. Nothing published yet; **no name was ever
  published**, so `5.3.0` under `@aexos/core` is a first publish and needs no
  version bump
- `npx @aexos/install` does not work (two bins, none inferable). Documented form
  is `npx -p @aexos/install aexos-install`. A bin named `install` was
  deliberately not created
- **AEXOS License v1.0** adopted: Core free including commercial use, Pro under
  separate paid agreement, §3(a)(b)(c) restricting copying, redistribution and
  public forks. Florida / Pinellas County. Replaced `main`'s strict proprietary
  text, which was incompatible with a free tier
- **ADR-AEX-007**: Pro tier is subscription-gated squads. The nine squads
  shipping today (52 agents) stay free permanently — moving distributed
  capability behind a paywall is withdrawal, not monetisation
- GitHub org `cyryx-labs-inc` created, empty. Migration plan: transfer 8 repos →
  rename user `CyryxLabs` → rename org to `CyryxLabs`. Steps 3 and 4 must run
  back-to-back; between them the name is publicly free
- Vercel Teams and the Supabase move deferred: Teams require Pro at
  US$20/user/month and buy organisation, not capability, while the team is one
  person

---

## Immediate next steps

1. @devops: push `fix/wave-0-on-main`, open PR against `main`, **do not merge**.
   First Actions run in the repository's history — report job by job
2. @devops: push the license server's 6 commits and deploy
3. Decide the `pro/` submodule's fate — it is the only thing standing between
   the branch and a fully green suite in a working tree
4. First publish is manual with the owner's OTP; trusted publishers can only be
   registered once the package exists

## Wave 1 — untouched

The execution kernel remains open, and the upstream this was forked from does
not have it either. `AEX-1.1` is the keystone: 213 task files, 71 with
heterogeneous frontmatter (some fields still in Portuguese), 142 with none.
`.aexos-core/schemas/task-v3-schema.json` already exists and already declares
`inputs`/`outputs` — the work is extending it with `produces`/`verify`,
normalising the 71, backfilling the 142, and wiring the existing
`validate-v3-schema.js` into CI.
