# AEXOS Palette — Quick Reference

Cyryx Labs Brandboard v1.0. Full spec: [AEXOS-COLOR-PALETTE-V2.1.md](./AEXOS-COLOR-PALETTE-V2.1.md)

## Copy-paste

```javascript
const { colors } = require('../utils/aexos-colors');
const { renderBanner, renderPanel, renderRule, renderChip, renderKV, renderSteps } =
  require('../utils/aexos-banner');
```

## Hexes

```text
Onyx      #050607   background
Obsidian  #0A0D0F   background, secondary
Graphite  #11161A   panels
Gunmetal  #1B2227   borders, rules
Steel     #8C949E   secondary text
Silver    #C7C9CC   body text, logo finish
Core Teal #0F6B68   accent, command paths
Teal Glow #19C7C0   focus, CTA, info

Success   #10B981
Warning   #F59E0B
Error     #EF4444
```

## Which token

| Need | Use |
|---|---|
| Body text | `colors.secondary` (Silver) |
| Heading / emphasis | `colors.brandPrimary` (Teal Glow, bold) |
| Secondary / hint text | `colors.muted` (Steel) |
| Border, rule, leader | Gunmetal — **never for text** |
| Active state, command path | `colors.tertiary` (Core Teal) |
| Focus, CTA, info | `colors.primary` (Teal Glow) |
| Pass / fail / caution | `colors.success` / `.error` / `.warning` |

## Wordmark gradient

Vertical, per row: `#19C7C0` at the top → `#0F6B68` at the bottom.
Bevel glyphs interpolate Gunmetal → Steel.

## The two rules

1. **Pad from `visibleWidth()`, never `String.length`.** Chalk's ANSI escapes
   inflate `.length`; frames padded with raw `padEnd` collapse when colour is off.
2. **Never let decoration throw.** Every kit entry point falls back to plain text.

## Don't

- ❌ Body text in Core Teal (~3.2:1 on Onyx) or Gunmetal (~1.2:1)
- ❌ Signal state by colour alone — always pair with `✓` / `⚠` / `✗`
- ❌ Hand-roll frames; use `renderPanel` / `renderRule`
- ❌ Reintroduce the pre-rebrand purple `#8B5CF6` or its magenta→blue gradient
