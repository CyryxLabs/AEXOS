# AEXOS Color Palette — Cyryx Labs Brandboard v1.0

**Status:** Authoritative. This document describes the palette **as implemented**
in `packages/installer/src/utils/aexos-colors.js` and consumed by
`packages/installer/src/utils/aexos-banner.js`.

> Supersedes the pre-rebrand palette (ClickUp-derived purple `#8B5CF6` with a
> magenta→purple→blue gradient). That palette belonged to the upstream framework
> and is no longer part of AEXOS. If you find code or docs still referencing it,
> that is a defect.

---

## Design intent

Dark machined metal, with a single teal activation accent. Colour carries
**state**, never decoration: teal means *this is live, focused, or yours to act
on*; metal greys mean *structure and context*. The AEXOS wordmark is finished as
brushed metal with a teal gradient face, so the product reads as an instrument
rather than a toy.

---

## Base — metal

| Token | Hex | Chalk | Use |
|---|---|---|---|
| **Onyx** | `#050607` | `chalk.hex('#050607')` | Primary background |
| **Obsidian** | `#0A0D0F` | `chalk.hex('#0A0D0F')` | Secondary background |
| **Graphite** | `#11161A` | `chalk.hex('#11161A')` | Cards / panels |
| **Gunmetal** | `#1B2227` | `chalk.hex('#1B2227')` | Borders, rules, deep UI |
| **Steel** | `#8C949E` | `chalk.hex('#8C949E')` | Secondary text, muted, dim |
| **Silver** | `#C7C9CC` | `chalk.hex('#C7C9CC')` | Primary text and logo finish |

## Accent — teal

| Token | Hex | Chalk | Use |
|---|---|---|---|
| **Core Teal** | `#0F6B68` | `chalk.hex('#0F6B68')` | Accent, active states, command paths |
| **Teal Glow** | `#19C7C0` | `chalk.hex('#19C7C0')` | Focus, status, primary CTA emphasis |

## State

| Token | Hex | Chalk | Use |
|---|---|---|---|
| **Success** | `#10B981` | `chalk.hex('#10B981')` | Checkmarks, completed steps |
| **Warning** | `#F59E0B` | `chalk.hex('#F59E0B')` | Warnings, confirmations, caution |
| **Error** | `#EF4444` | `chalk.hex('#EF4444')` | Errors, critical alerts, failures |
| **Info** | `#19C7C0` | `chalk.hex('#19C7C0')` | Info, tips, helper text (= Teal Glow) |

## Wordmark gradient

The AEXOS block face carries a **vertical** gradient, interpolated per row:

| Position | Hex |
|---|---|
| Top | `#19C7C0` (Teal Glow) |
| Bottom | `#0F6B68` (Core Teal) |

The bevel glyphs (`╔╗╚╝═║`) are interpolated between Gunmetal and Steel —
subordinate to the face, but bright enough that the mark keeps its base edge on
an Onyx background.

---

## Semantic mapping

`aexos-colors.js` exposes semantic names, not raw hexes. Consume these:

```javascript
const { colors } = require('../utils/aexos-colors');

colors.primary      // #19C7C0  Teal Glow    — brand activation
colors.secondary    // #C7C9CC  Silver       — primary text
colors.tertiary     // #0F6B68  Core Teal    — accent / command paths
colors.success      // #10B981
colors.warning      // #F59E0B
colors.error        // #EF4444
colors.info         // #19C7C0
colors.muted        // #8C949E  Steel
colors.dim          // #8C949E  Steel
colors.highlight    // #19C7C0 bold
colors.brandPrimary // #19C7C0 bold
```

---

## TUI primitives

`aexos-banner.js` is the surface kit. Prefer it over hand-rolled frames.

| Function | Purpose |
|---|---|
| `renderBanner({ version, subtitle, context, width })` | Hero: AEXOS wordmark, tagline, status rail |
| `renderLockup({ version, context })` | One-line mark for dense output |
| `renderPanel(title, lines, { width, style })` | Framed panel, title inlaid in the border |
| `renderRule(label, { width, heavy })` | Horizontal rule with optional inline label |
| `renderChip(text, tone)` | Inline status chip (`accent`/`ok`/`warn`/`bad`/`muted`) |
| `renderKV(rows, { width, indent })` | Aligned key/value rail with dot leaders |
| `renderSteps(steps, current)` | Step tracker: done / active / pending |
| `visibleWidth(str)` | Width of a styled string, ANSI stripped |

### Frame vocabulary

| Style | Corners | Meaning |
|---|---|---|
| `hero` | `┌ ┐ └ ┘` | The wordmark container. One per screen. |
| `panel` | `╭ ╮ ╰ ╯` | Content panels, subordinate to the hero. |
| `heavy` | `━` | Section breaks and completion rules. |

---

## Two non-negotiable rules

**1. Pad from visible width, never from `String.length`.**
Chalk emits ANSI escape sequences that inflate `.length`. A frame padded with raw
`padEnd` looks correct in a colour terminal and collapses the moment colour is
disabled — `NO_COLOR`, CI logs, or a pipe. Use `visibleWidth()`.

> This was a real defect: the previous welcome frame offset `padEnd` by magic
> constants (`width + 18`, `width + 24`) to compensate for chalk's escapes, and
> overflowed by roughly 20 columns whenever colour was off.

**2. A banner must not be able to break the CLI.**
Every entry point in the kit is wrapped and falls back to plain text. Decoration
never takes down the command.

---

## Degradation

| Condition | Behaviour |
|---|---|
| Truecolor (`chalk.level >= 3`) | Full brandboard hexes |
| 256/16 colour (`level 1–2`) | `cyanBright` / `white` / `gray` approximations |
| `NO_COLOR`, `FORCE_COLOR=0`, no chalk | Identity styling; layout still exact |
| Width `< 47` columns | Compact wordmark (3 rows), shortened tagline |
| Status rail does not fit | Optional parts are shed rather than overflowing the frame |

---

## Accessibility

Contrast against Onyx `#050607`:

| Foreground | Ratio | Verdict |
|---|---|---|
| Silver `#C7C9CC` | ~13:1 | Body text — passes AAA |
| Teal Glow `#19C7C0` | ~9:1 | Accent and headings — passes AAA |
| Steel `#8C949E` | ~6:1 | Secondary text — passes AA |
| Core Teal `#0F6B68` | ~3.2:1 | Structural only. **Never** use for body text. |
| Gunmetal `#1B2227` | ~1.2:1 | Borders and rules only. Never for text. |

State is never signalled by colour alone: success, warning and error always carry
a glyph (`✓`, `⚠`, `✗`) so the interface stays readable in monochrome and to
colour-blind users.

---

## Reference

- Implementation: `packages/installer/src/utils/aexos-colors.js`
- TUI kit: `packages/installer/src/utils/aexos-banner.js`
- Quick reference: [AEXOS-COLOR-PALETTE-QUICK-REFERENCE.md](./AEXOS-COLOR-PALETTE-QUICK-REFERENCE.md)
