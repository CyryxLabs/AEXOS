# AEXOS Squads Publishing Protocol

This document is the operational protocol for Epic 124: migrating npm packages to the canonical `@aexos/*` scope.

## Current Verified State

Verified on 2026-05-06:

| Check                                             | Result                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `npm whoami`                                      | `rafaelscosta`                                                                  |
| `npm org ls aexos-squads --json`                   | `rafaelscosta` is `owner`                                                       |
| `npm access list packages @aexos --json`    | `{}`; org exists and has no published packages yet                              |
| `npm access list packages @aexos-fullstack --json` | 7 legacy packages visible with `read-write` access                              |
| `npm owner ls aexos-core --json`                   | `rafaelscosta` and `pedrovaleriolopez` are listed owners                        |
| `gh repo view CyryxLabs/AEXOS`                 | authenticated user has `ADMIN` permission                                       |
| `gh repo view CyryxLabs/aexos-pro`                  | authenticated user has `ADMIN` permission                                       |
| `npm token list --json`                           | publish token for `@aexos` visible, `bypass_2fa` true, expires 2026-08-04 |
| token smoke test via temporary `.npmrc`           | `npm whoami` returned `rafaelscosta`                                            |
| `gh secret list --repo CyryxLabs/AEXOS`        | `NPM_TOKEN_AEXOS` present                                                 |
| `gh secret list --repo CyryxLabs/aexos-pro`         | `NPM_TOKEN_AEXOS` present                                                 |

Current release state, verified on 2026-05-09:

```text
@aexos/core@5.1.17 -> public latest
@aexos/pro@0.4.3  -> private/restricted release artifact
```

Customer Pro acquisition does not require direct npm org access. The supported customer path is the authenticated signed-artifact channel served by the historical `aexos-license-server` repo.

Maintainer invite status:

```text
Pedrovaleriolopez -> pending; CLI invite blocked by npm EOTP/browser auth
oalanicolas       -> pending; CLI invite blocked by npm EOTP/browser auth
```

Resolve pending invites through npm org Settings -> Members, or repeat `npm org set` from an authenticated terminal after completing the browser confirmation flow.

## Canonical Package Map

Approved target names from Story 124.1:

```text
aexos-core             -> @aexos/core
@cyryx/aexos-install -> @aexos/install
aexos-pro             -> @aexos/pro-cli
@cyryx/installer      -> @aexos/installer
```

Reserved external Pro package:

```text
@aexos-fullstack/pro or @aexos-fullstack/pro -> @aexos/pro
```

Preserve user-facing bins:

```text
cyryx
aexos-core
aexos-minimal
aexos-graph
aexos-install
edmcp
aexos-pro
aexos-installer
```

## Prerequisites

Before any publish story runs:

1. `rafaelscosta` must remain owner of the npm org `@aexos`.
2. Maintainers must be invited to `@aexos`:
   - `Pedrovaleriolopez`
   - `oalanicolas`
3. An npm publish token with read/publish permission for `@aexos` must be available.
4. The token must be stored in both GitHub repos:
   - `CyryxLabs/AEXOS` as `NPM_TOKEN_AEXOS`
   - `CyryxLabs/aexos-pro` as `NPM_TOKEN_AEXOS`
5. Existing legacy package access must remain available for deprecation stories:
   - `@aexos-fullstack/*` packages require read/write access for `npm deprecate`.
   - `aexos-core` requires owner or publisher access for `npm deprecate`.

## DevOps Commands

Run these only from a trusted DevOps terminal. Do not paste tokens into chat or committed files.

### Verify npm Auth

```bash
npm whoami --registry=https://registry.npmjs.org/
npm org ls aexos-squads --json
npm access list packages @aexos --json
npm access list packages @aexos-fullstack --json
npm owner ls aexos-core --json
```

### Invite npm Maintainers

Use the npm website if the CLI requires browser confirmation or two-factor flow:

```text
https://www.npmjs.com/org/aexos-squads/teams
```

CLI option, if available in the authenticated npm session:

```bash
npm org set aexos-squads Pedrovaleriolopez developer
npm org set aexos-squads oalanicolas developer
npm org ls aexos-squads --json
```

If npm normalizes usernames to lowercase, preserve the returned canonical casing in the story evidence.

### Generate Automation Token

Generate the token through npm account settings:

```text
Profile -> Access Tokens -> Generate New Token -> Automation
```

Scope/purpose:

```text
name: NPM_TOKEN_AEXOS
permission: Read and Publish
scope: @aexos
```

Smoke test in a temporary shell:

```bash
export NPM_TOKEN_AEXOS='paste-token-here'
npm whoami --registry=https://registry.npmjs.org/
```

### Store GitHub Secrets

```bash
printf '%s' "$NPM_TOKEN_AEXOS" | gh secret set NPM_TOKEN_AEXOS --repo CyryxLabs/AEXOS
printf '%s' "$NPM_TOKEN_AEXOS" | gh secret set NPM_TOKEN_AEXOS --repo CyryxLabs/aexos-pro

gh secret list --repo CyryxLabs/AEXOS
gh secret list --repo CyryxLabs/aexos-pro
```

Expected result: both repos list `NPM_TOKEN_AEXOS`.

## Publish Flow

### Story 124.3 - `@aexos/core`

Pre-publish checks:

```bash
npm view aexos-core version --json
npm view @aexos/core version --json
npm pack --dry-run --json
```

Expected before first publish:

```text
aexos-core -> published, currently 5.0.7 in registry
@aexos/core -> 404
```

Historical note: `@aexos/core@5.1.0` was the continuity publish after the last legacy registry version, `aexos-core@5.0.7`. The current operational release baseline is `@aexos/core@5.1.17`; confirm the local root `package.json` remains `@aexos/core` at `5.1.17` before publishing.

### Story 124.4 - `@aexos/pro`

This package is cross-repo and belongs to `CyryxLabs/aexos-pro`.

Required changes:

```text
package name -> @aexos/pro
peer dependency -> @aexos/core >=5.1.17
publish token -> NPM_TOKEN_AEXOS in CyryxLabs/aexos-pro
```

### PRO-13.5 - Private Pro Distribution

Customer-facing Pro distribution must use the license-server signed artifact channel, not npm org membership.

Pre-publish checks for the public core package:

```bash
npm run validate:publish
npm pack --dry-run --json > outputs/qa/<date>-pro-13-5-core-pack-dry-run.json
node -e "const p=require('./outputs/qa/<date>-pro-13-5-core-pack-dry-run.json')[0]; const files=p.files.map(f=>f.path); if (files.some(f=>f==='pro'||f.startsWith('pro/'))) process.exit(1)"
```

Expected result:

```text
@aexos/core public tarball includes 0 files under pro/
@aexos/pro remains private/restricted and is delivered to customers through signed artifact URLs
```

DevOps artifact channel checks:

```bash
npm view @aexos/core version dist-tags --json
npm view @aexos/pro version dist-tags --json
npm access get status @aexos/pro --json
```

`@aexos/pro` is allowed to remain private only while all of these checks pass:

1. Production `aexos-license-server` has `PRO_ARTIFACT_BUCKET`, `PRO_ARTIFACT_MANIFEST_JSON`, and `PRO_ARTIFACT_SIGNED_URL_TTL_SECONDS`.
2. A verified Pro user can request `POST /api/v1/pro/artifact-url`, download the `.tgz`, and match manifest `sha256` and `sizeBytes`.
3. A verified non-Pro user receives 403.
4. A core-only install without npm token does not receive `pro/` content.
5. Existing Pro update/install does not duplicate slash commands, agent activators, or generated skills.

Privacy transition command, only if the package is ever found public again after smoke:

```bash
npm access set status=private @aexos/pro
npm access get status @aexos/pro --json
```

Rollback if valid customers are blocked:

```bash
npm access set status=public @aexos/pro
npm access get status @aexos/pro --json
```

If a public core publish accidentally omits required core files, correct the package metadata, publish the next patch, and move the `latest` dist-tag to the corrected version:

```bash
npm dist-tag add @aexos/core@<corrected-version> latest
npm view @aexos/core version dist-tags --json
```

### Story 124.5 - Monorepo Packages

Target names:

```text
packages/aexos-install   -> @aexos/install
packages/aexos-pro-cli   -> @aexos/pro-cli
packages/installer      -> @aexos/installer
```

Publish-readiness risks from Story 124.1:

1. `packages/installer/package.json` points `main` and bin `aexos-installer` to `src/index.js`, but that file is absent. Fix the entrypoint before publish.
2. `packages/aexos-pro-cli/bin/aexos-pro.js` requires `../../installer/src/wizard/pro-setup`, but `npm pack --dry-run` for the CLI package does not include the installer package source. Replace the relative workspace import before publish.

## Deprecation Flow

Run only after replacement packages are published and validated.

### Legacy Cyryx Labs Packages

Verified current access:

```text
@aexos-fullstack/core         read-write
@aexos-fullstack/memory       read-write
@aexos-fullstack/security     read-write
@aexos-fullstack/performance  read-write
@aexos-fullstack/telemetry    read-write
@aexos-fullstack/workspace    read-write
@aexos-fullstack/pro          read-write
```

Example command pattern:

```bash
npm deprecate '@aexos-fullstack/core@4.31.0' 'Cyryx Labs v4.x was consolidated into AEXOS. Migrate to @aexos/core. See docs/MIGRATION-CYRYX-SQUADS.md'
```

### Unscoped `aexos-core`

Verified owners:

```text
rafaelscosta
pedrovaleriolopez
```

Example command pattern:

```bash
npm deprecate 'aexos-core' 'Renamed to @aexos/core. Run: npm install @aexos/core. See docs/MIGRATION-CYRYX-SQUADS.md'
```

## Rollback

If publish fails before any package is visible:

1. Stop the publish story.
2. Do not deprecate legacy packages.
3. Re-run `npm view <target> version --json` to confirm no partial publish exists.
4. Fix package metadata locally.
5. Re-run `npm pack --dry-run --json`.

If publish succeeds but consumer code is not ready:

1. Keep the new package published.
2. Do not deprecate legacy packages yet.
3. Keep existing consumer fallbacks until Story 124.6 lands.
4. Document the gap in the story before handoff.

If a deprecation message is wrong:

```bash
npm deprecate '<package>@<range>' ''
npm deprecate '<package>@<range>' '<corrected message>'
```

## Troubleshooting

| Symptom                                               | Likely cause                                           | Recovery                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `npm whoami` fails                                    | npm auth expired                                       | Run `npm login`, then repeat `npm whoami`.                                            |
| `npm org ls aexos-squads` fails                        | wrong npm account or org access missing                | Confirm account is `rafaelscosta`; verify owner status in npm org settings.           |
| `gh secret set` fails                                 | missing repo admin permission or GitHub auth expired   | Run `gh auth status`; confirm `viewerPermission` is `ADMIN`.                          |
| `npm publish --access public` fails                   | token lacks publish rights or package metadata invalid | Verify automation token scope and run `npm pack --dry-run --json`.                    |
| `npm publish` prompts for OTP in CI                   | wrong token type                                       | Generate an Automation token, not a classic interactive token.                        |
| `npx @aexos/installer` fails                    | package bin or entrypoint mismatch                     | Fix `packages/installer` entrypoint before publish.                                   |
| `npx @aexos/pro-cli` fails on wizard/setup | relative workspace import leaked into package          | Replace the relative installer import with a package dependency or delegated command. |

## Secret Hygiene

- Never commit npm tokens, GitHub tokens, `.npmrc` auth lines, or `.env` values.
- Use `gh secret set` from stdin.
- Keep token names stable across workflows: `NPM_TOKEN_AEXOS`.
- Document only verification results, never token values.
