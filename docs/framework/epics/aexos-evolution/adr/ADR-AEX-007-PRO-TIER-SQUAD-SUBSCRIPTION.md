# ADR-AEX-007: Pro Tier as Subscription-Gated Squads

## Status

Proposed. Part of [EPIC-AEXOS-EVOLUTION](../EPIC-AEXOS-EVOLUTION.md).
Product decision recorded 2026-08-02. No story assigned yet.

Depends on nothing in Wave 1. Can proceed independently, but the licence
server it requires does not exist yet (see Consequences).

## Context

The product owner has decided that the paid tier is **additional squads,
released by subscription**, rather than gated framework capabilities.

Before designing anything, the existing surface was inventoried. Most of the
machinery already exists.

### What is already built

| Component | Location | State |
|---|---|---|
| Entitlement namespace `pro.squads.*` | referenced across core and tests | wildcard already supported |
| `FeatureGate` — `isAvailable()`, `require()`, `listByModule()` | `pro/license/feature-gate.js` | contract defined, implementation in the Pro package |
| Licence cache — seats, expiry, grace period, offline validity | `pro/license/license-cache.js` | contract defined |
| Licence API — `activate`, `validate`, `deactivate`, `listSeats` | `pro/license/license-api.js` | contract defined |
| Squad registry (remote) | `CyryxLabs/aexos-squads` → `registry.json` | live; `community` section only |
| `SquadDownloader` | `development/scripts/squad/squad-downloader.js` | fetches from the registry over GitHub raw |
| `SquadPublisher` | `development/scripts/squad/squad-publisher.js` | writes new squads into `registry.json` |
| `SquadLoader` | `development/scripts/squad/squad-loader.js` | loads squads from the local `squads/` directory |

The entitlement namespace is the decisive find: `pro.squads.*` sits alongside
`pro.memory.*`, `pro.metrics.*` and `pro.integrations.*`. Squads-as-paid-tier
was anticipated by the original design; this ADR does not invent it, it
resumes it.

### What is missing

1. No `tier` field in the squad schema (`schemas/squad-schema.json` has
   `name`, `version`, `license`, `requires`, `tags`, and no notion of tier).
2. `SquadLoader` performs no entitlement check before loading.
3. `registry.json` has a `community` section and no `pro` section.
4. The licence server the client points at
   (`license-api.js` → `cyryx-license-server.vercel.app`) does not exist.
5. No checkout or subscription lifecycle exists anywhere.

## Decision

### 1. Pro squads are distributed through the registry, not the npm package

The Core package on npm stays public and contains only Core squads. Pro squads
are fetched by `SquadDownloader` from an endpoint that **validates the licence
before serving content**.

The enforcement boundary is the server. The client-side `FeatureGate` check is
a user-experience affordance — it produces a clear message instead of a
confusing failure — and must not be mistaken for the protection itself. A
client-side gate on content the client already possesses protects nothing.

### 2. Squads declare their tier; the loader honours it

Add to the squad schema:

```yaml
tier: free | pro        # default: free
```

`SquadLoader` consults `featureGate.isAvailable('pro.squads.<name>')` before
loading a squad whose `tier` is `pro`, and degrades with an explicit message
rather than a throw — consistent with the graceful-degradation contract in
`pro/license/degradation.js`.

Absent tier means `free`, so every existing squad keeps working untouched.

### 3. Subscriptions map to entitlements, not to squad lists

A plan grants entitlement patterns, and the wildcard support already present
in `FeatureGate` resolves them:

| Plan | Entitlement granted |
|---|---|
| Full | `pro.squads.*` |
| Single vertical | `pro.squads.marketing` |
| Bundle | `pro.squads.marketing`, `pro.squads.sales` |

Pricing and packaging change by editing what the licence server issues. No
framework code changes to add, remove or repackage a plan.

### 4. Squads shipped in the Core stay in the Core

The nine squads present at the time of this decision — `board`,
`business-admin`, `ceo`, `claude-code-mastery`, `customer-success`,
`marketing`, `ops`, `products`, `sales`, carrying 52 agents — are part of the
free tier permanently.

Moving an already-distributed capability behind a paywall is a withdrawal, not
a monetisation. The Pro tier is expansion: squads authored after this decision.

## Consequences

### Enables

- Pricing and packaging become a server-side concern, decoupled from releases.
- The Core keeps enough value to drive adoption: 52 agents across nine
  business domains, free.
- `SquadPublisher` gains a second target (`pro` section) rather than needing a
  parallel pipeline.

### Requires

- **A licence server.** This is the critical path and it does not exist. Until
  it does, no entitlement can be issued or validated, and every other piece
  here is inert. `pro/cli/buyer.js` already documents
  `POST /api/v1/admin/buyers/register` as "not yet implemented".
- **A subscription lifecycle** — checkout, renewal, cancellation, dunning —
  with no implementation today.
- **An authenticated download endpoint** in front of the Pro registry section.

### Risks

- **The Pro package is published to the public npm registry** with
  `--access public` (`publish-pro.yml`). Its source is therefore readable by
  anyone. This is acceptable precisely because the enforcement lives on the
  server; it would not be acceptable if the value were in the client code.
  Revisit if that changes.
- **Offline grace period is a deliberate revenue leak.** `license-cache.js`
  defines 30 days of cache plus 7 days of grace. That is correct for developer
  experience — a CI runner without network must not fail — and it means an
  expired subscription keeps working for up to 37 days. Accept it as a support
  cost, or shorten it knowing what it breaks.
- **Seat enforcement is client-side today.** `listSeats` and `releaseSeat`
  exist in the API contract, but nothing prevents a cached licence from being
  copied between machines within the cache window. Machine binding exists
  (`license/machine-id.js`), which narrows this but does not close it.

## Alternatives considered

**Gate framework capabilities instead of squads.** Rejected: it degrades the
free product to create the paid one, and `pro.memory.*` / `pro.metrics.*`
already cover that axis if ever wanted. Squads are additive by nature, which
is the property that makes the free tier stay honest.

**Ship Pro squads inside the Core npm package, gated at load.** Rejected:
the content would be on disk for everyone, and the gate would be a comment
with a conditional around it. The registry keeps the boundary real.

**A private npm scope for Pro squads.** Rejected: requires a paid npm plan per
seat, and couples squad distribution to npm's auth model rather than to the
licence server that already has to exist for seats and expiry.

## References

- `pro/license/feature-gate.js` — entitlement evaluation contract
- `pro/license/degradation.js` — graceful degradation contract
- `development/scripts/squad/squad-downloader.js:20` — registry URL
- `development/scripts/squad/squad-publisher.js:401` — registry write path
- `schemas/squad-schema.json` — where `tier` belongs
- [ADR-AEX-004](./ADR-AEX-004-DISTRIBUTION-PLUGIN-MCP.md) — distribution channels
