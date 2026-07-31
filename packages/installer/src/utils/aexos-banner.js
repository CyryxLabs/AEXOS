/**
 * AEXOS TUI kit — Monolith wordmark and the surface primitives built around it.
 *
 * Everything here is finished in the Cyryx Labs brandboard: a dark metal base
 * with a teal activation accent. The AEXOS wordmark is rendered as a heavy block
 * face carrying a teal-glow-to-core-teal vertical gradient, with the bevel in
 * brushed metal so the mark reads as machined rather than as flat ASCII art.
 *
 * Brandboard v1.0
 *   Onyx      #050607   base background
 *   Obsidian  #0A0D0F   secondary background
 *   Graphite  #11161A   cards / panels
 *   Gunmetal  #1B2227   borders / deep UI
 *   Steel     #8C949E   secondary text / interface metal
 *   Silver    #C7C9CC   primary text and logo finish
 *   Core Teal #0F6B68   accent / active states / command paths
 *   Teal Glow #19C7C0   focus / status / primary CTA emphasis
 *
 * Two rules hold this together:
 *
 *   1. All padding is computed from *visible* width, never from string length.
 *      Chalk emits ANSI escapes that inflate `.length`, so frames padded with
 *      raw `padEnd` collapse the moment colour is disabled (NO_COLOR, CI, pipes).
 *   2. Nothing here may throw. A banner is decoration; it must not be able to
 *      take the CLI down. Every entry point falls back to plain text.
 */

'use strict';

let chalk;
try {
  chalk = require('chalk');
} catch {
  chalk = null;
}

// --- Brandboard ------------------------------------------------------------

const BRAND = {
  onyx: '#050607',
  obsidian: '#0A0D0F',
  graphite: '#11161A',
  gunmetal: '#1B2227',
  steel: '#8C949E',
  silver: '#C7C9CC',
  coreTeal: '#0F6B68',
  tealGlow: '#19C7C0',
  // State colours, shared with aexos-colors.js
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// --- Wordmark --------------------------------------------------------------

/** Heavy bevelled block face. `█` takes the gradient; box glyphs take the bevel. */
const WORDMARK = [
  ' █████╗ ███████╗██╗  ██╗ ██████╗ ███████╗',
  '██╔══██╗██╔════╝╚██╗██╔╝██╔═══██╗██╔════╝',
  '███████║█████╗   ╚███╔╝ ██║   ██║███████╗',
  '██╔══██║██╔══╝   ██╔██╗ ██║   ██║╚════██║',
  '██║  ██║███████╗██╔╝ ██╗╚██████╔╝███████║',
  '╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝',
];

/** Narrow-terminal fallback: still unmistakably AEXOS, half the width. */
const WORDMARK_COMPACT = [
  '▄▀▄ ▄▀▀ ▀▄ ▄▀ ▄▀▄ ▄▀▀',
  '█▀█ █▀▀  ▄▀▄  █ █ ▀▀▄',
  '▀ ▀ ▀▀▀ ▀  ▀  ▀▀▀ ▀▀ ',
];

const WORDMARK_WIDTH = 41;
const TAGLINE = 'AGENTIC  eXECUTION  &  ORCHESTRATION  SYSTEM';

// --- Colour plumbing -------------------------------------------------------

// Matching the ESC control character is the point here: chalk emits SGR
// sequences that must be stripped to measure how wide a styled string prints.
// eslint-disable-next-line no-control-regex
const ANSI_RE = /\[[0-9;]*m/g;

/**
 * Zero-width code points: the emoji variation selector and the zero-width
 * joiner occupy no columns but do count as code points.
 */
function isZeroWidth(cp) {
  return cp === 0xfe0f || cp === 0x200d || (cp >= 0x0300 && cp <= 0x036f);
}

/**
 * Code points a terminal renders in two columns. Deliberately a narrow list —
 * emoji and CJK — rather than a full wcwidth table: the box-drawing block
 * (U+2500–U+257F) that every frame here is built from must stay single-width.
 */
/**
 * BMP symbols Unicode gives Emoji_Presentation=Yes, so a terminal renders them
 * in two columns even with no variation selector.
 *
 * These have to be listed rather than range-matched: they are scattered through
 * blocks whose other members are ordinary single-width symbols, and the box
 * drawing this frame is built from lives in the same neighbourhood.
 */
const WIDE_BMP_SYMBOLS = new Set([
  0x231a, 0x231b, 0x23e9, 0x23ea, 0x23eb, 0x23ec, 0x23f0, 0x23f3, 0x25fd, 0x25fe,
  0x2614, 0x2615, 0x2648, 0x2649, 0x264a, 0x264b, 0x264c, 0x264d, 0x264e, 0x264f,
  0x2650, 0x2651, 0x2652, 0x2653, 0x267f, 0x2693, 0x26a1, 0x26aa, 0x26ab, 0x26bd,
  0x26be, 0x26c4, 0x26c5, 0x26ce, 0x26d4, 0x26ea, 0x26f2, 0x26f3, 0x26f5, 0x26fa,
  0x26fd, 0x2705, 0x270a, 0x270b, 0x2728, 0x274c, 0x274e, 0x2753, 0x2754, 0x2755,
  0x2757, 0x2795, 0x2796, 0x2797, 0x27b0, 0x27bf, 0x2b1b, 0x2b1c, 0x2b50, 0x2b55,
]);

/**
 * Code points a terminal renders in two columns. Deliberately a narrow list —
 * emoji and CJK — rather than a full wcwidth table: the box-drawing block
 * (U+2500–U+257F) that every frame here is built from must stay single-width.
 */
function isWide(cp) {
  return (
    (cp >= 0x1100 && cp <= 0x115f) ||
    (cp >= 0x2e80 && cp <= 0x303e) ||
    (cp >= 0x3041 && cp <= 0x33ff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0xa000 && cp <= 0xa4cf) ||
    (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe30 && cp <= 0xfe6f) ||
    (cp >= 0xff00 && cp <= 0xff60) ||
    (cp >= 0xffe0 && cp <= 0xffe6) ||
    WIDE_BMP_SYMBOLS.has(cp) ||
    (cp >= 0x1f300 && cp <= 0x1f64f) ||
    (cp >= 0x1f680 && cp <= 0x1f6ff) ||
    // Symbols and Pictographs Extended-A (Unicode 13+): 🪢 🪝 🪞 and friends.
    // Omitting this block is not academic — the sales squad ships U+1FAA2.
    (cp >= 0x1fa70 && cp <= 0x1faff) ||
    (cp >= 0x1f900 && cp <= 0x1f9ff)
  );
}

/**
 * Visible width of a string: ANSI stripped, emoji counted as the two columns
 * they actually occupy, variation selectors counted as none.
 *
 * Counting code points alone misaligns any frame containing an icon — an emoji
 * with a variation selector counts two and prints two, while a bare emoji counts
 * one and prints two, so the two shapes drift in opposite directions.
 */
function visibleWidth(s) {
  const chars = [...String(s).replace(ANSI_RE, '')];
  let w = 0;
  for (let i = 0; i < chars.length; i++) {
    const cp = chars[i].codePointAt(0);
    if (isZeroWidth(cp)) continue;

    // U+FE0F forces emoji presentation on whatever precedes it, which makes that
    // character two columns wide regardless of its own default. Treating the
    // selector as merely zero-width — and trusting the base alone — undercounts
    // every BMP symbol icon: "⚙️" measured one column and printed two, which
    // shifted the frame it sat in by exactly that much.
    const next = chars[i + 1];
    if (next && next.codePointAt(0) === 0xfe0f) {
      w += 2;
      i++;
      continue;
    }

    w += isWide(cp) ? 2 : 1;
  }
  return w;
}

function colorDepth() {
  if (!chalk) return 0;
  if (process.env.NO_COLOR || process.env.NODE_DISABLE_COLORS) return 0;
  if (process.env.FORCE_COLOR === '0') return 0;
  return chalk.level ?? 0;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Linear interpolation between two brand hexes; t in [0,1]. */
function mix(fromHex, toHex, t) {
  const a = hexToRgb(fromHex);
  const b = hexToRgb(toHex);
  return rgbToHex([
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]);
}

/**
 * Build the palette of styling functions for the current colour depth.
 * At depth 0 every function is identity, so callers never branch on colour.
 */
function palette() {
  const depth = colorDepth();
  const id = (s) => s;
  if (depth === 0) {
    return {
      depth,
      accent: id, accentBold: id, text: id, sub: id, rule: id,
      ok: id, warn: id, bad: id, inverse: id,
    };
  }
  if (depth < 3) {
    return {
      depth,
      accent: chalk.cyanBright,
      accentBold: chalk.cyanBright.bold,
      text: chalk.white,
      sub: chalk.gray,
      rule: chalk.gray,
      ok: chalk.green,
      warn: chalk.yellow,
      bad: chalk.red,
      inverse: chalk.inverse,
    };
  }
  return {
    depth,
    accent: chalk.hex(BRAND.tealGlow),
    accentBold: chalk.hex(BRAND.tealGlow).bold,
    text: chalk.hex(BRAND.silver),
    sub: chalk.hex(BRAND.steel),
    rule: chalk.hex(BRAND.gunmetal),
    ok: chalk.hex(BRAND.success),
    warn: chalk.hex(BRAND.warning),
    bad: chalk.hex(BRAND.error),
    inverse: chalk.bgHex(BRAND.coreTeal).hex(BRAND.silver).bold,
  };
}

const BLOCK_CHARS = new Set(['█', '▀', '▄', '▌', '▐']);

/**
 * Paint one wordmark row. Block faces take the vertical gradient at position
 * `t`; bevel glyphs sit between gunmetal and steel — subordinate to the face,
 * but bright enough to keep the mark's base edge on an onyx background.
 */
function paintRow(row, t, depth) {
  if (depth === 0) return row;
  const faceFn =
    depth >= 3 ? chalk.hex(mix(BRAND.tealGlow, BRAND.coreTeal, t)).bold : chalk.cyanBright.bold;
  const bevelFn =
    depth >= 3 ? chalk.hex(mix(BRAND.gunmetal, BRAND.steel, 0.3 + t * 0.25)) : chalk.gray;

  let out = '';
  let buf = '';
  let bufIsBlock = null;
  const flush = () => {
    if (buf) out += bufIsBlock ? faceFn(buf) : bevelFn(buf);
    buf = '';
    bufIsBlock = null;
  };
  for (const ch of row) {
    if (ch === ' ') {
      flush();
      out += ' ';
      continue;
    }
    const isBlock = BLOCK_CHARS.has(ch);
    if (bufIsBlock !== null && isBlock !== bufIsBlock) flush();
    buf += ch;
    bufIsBlock = isBlock;
  }
  flush();
  return out;
}

function terminalWidth() {
  const w = process.stdout && process.stdout.columns;
  return Number.isFinite(w) && w > 0 ? w : 80;
}

/** Space out a string for the engraved-tagline look. */
function track(text) {
  return text.split('').join(' ');
}

/** Centre `content` inside `inner` columns, measuring visible width. */
function centre(content, inner) {
  const pad = Math.max(0, Math.floor((inner - visibleWidth(content)) / 2));
  return ' '.repeat(pad) + content;
}

// --- Frames ----------------------------------------------------------------

const FRAMES = {
  // Hero: square corners, reads as machined metal.
  hero: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  // Panel: soft corners, subordinate to the hero.
  panel: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  // Emphasis: heavy rule for section breaks.
  heavy: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
};

/**
 * Lay out a framed block. `rows` are pre-styled strings; padding is computed
 * from visible width so the frame holds with or without colour.
 */
function frame(rows, { inner, style = 'panel', p }) {
  const f = FRAMES[style] || FRAMES.panel;
  const out = [p.rule(f.tl + f.h.repeat(inner) + f.tr)];
  for (const row of rows) {
    const fill = Math.max(0, inner - visibleWidth(row));
    out.push(p.rule(f.v) + row + ' '.repeat(fill) + p.rule(f.v));
  }
  out.push(p.rule(f.bl + f.h.repeat(inner) + f.br));
  return out;
}

// --- Public API ------------------------------------------------------------

/**
 * Render the AEXOS hero banner.
 *
 * @param {object} [opts]
 * @param {string} [opts.version]  Version string for the status rail.
 * @param {string} [opts.subtitle] Overrides the default tagline.
 * @param {string} [opts.context]  Right-hand status text (default 'CLI First').
 * @param {boolean} [opts.frame]   Draw the Monolith container frame.
 * @param {number} [opts.width]    Force a width instead of detecting it.
 * @returns {string} The banner, ready for a single console.log.
 */
function renderBanner(opts = {}) {
  try {
    const p = palette();
    const width = opts.width || terminalWidth();
    const drawFrame = opts.frame !== false;

    const compact = width < WORDMARK_WIDTH + 6;
    const glyphs = compact ? WORDMARK_COMPACT : WORDMARK;
    const markWidth = compact ? WORDMARK_COMPACT[0].length : WORDMARK_WIDTH;

    // The frame hugs the mark, never the whole terminal.
    const inner = Math.min(Math.max(markWidth + 6, 46), Math.max(width - 2, 20));

    const rows = [''];
    glyphs.forEach((row, i) => {
      const t = glyphs.length === 1 ? 0 : i / (glyphs.length - 1);
      rows.push(centre(paintRow(row, t, p.depth), inner));
    });
    rows.push('');

    // Tagline: prefer the tracked form, then plain, then a short form.
    const tagText = opts.subtitle || TAGLINE;
    const candidates = compact
      ? [tagText, 'ORCHESTRATION SYSTEM']
      : [track(tagText), tagText, 'ORCHESTRATION SYSTEM'];
    const tag = candidates.find((c) => c.length <= inner - 2);
    if (tag) {
      rows.push(centre(p.sub(tag), inner));
      rows.push('');
    }

    // Status rail. Shed the optional parts rather than overflow the frame.
    const left = '  CYRYX LABS';
    const version = opts.version ? `v${String(opts.version).replace(/^v/, '')}` : '';
    const context = opts.context || 'CLI First';
    const rails = [[version, context].filter(Boolean).join('  ·  '), version || context, ''];
    const railText = rails.find((r) => left.length + r.length + 3 <= inner) ?? '';
    const right = railText ? `${railText}  ` : '';
    const gap = Math.max(1, inner - left.length - right.length);
    rows.push(p.accent(left) + ' '.repeat(gap) + p.text(right));

    if (!drawFrame) return rows.join('\n');
    return frame(rows, { inner, style: 'hero', p }).join('\n');
  } catch {
    const v = opts.version ? ` v${String(opts.version).replace(/^v/, '')}` : '';
    return `AEXOS${v} — Agentic eXecution & Orchestration System | Cyryx Labs`;
  }
}

/** Print the hero banner to stdout. */
function printBanner(opts = {}) {
  console.log(renderBanner(opts));
}

/** One-line lockup for dense output (status lines, footers, logs). */
function renderLockup(opts = {}) {
  try {
    const p = palette();
    const v = opts.version ? p.sub(` v${String(opts.version).replace(/^v/, '')}`) : '';
    return `${p.accentBold('▎AEXOS')}${v} ${p.sub('·')} ${p.sub(opts.context || 'Cyryx Labs')}`;
  } catch {
    return 'AEXOS · Cyryx Labs';
  }
}

/**
 * Horizontal rule, optionally carrying an inline label.
 *
 * @param {string} [label]
 * @param {object} [opts]  { width, heavy }
 */
function renderRule(label = '', opts = {}) {
  try {
    const p = palette();
    const width = Math.max(12, Math.min(opts.width || terminalWidth(), 100));
    const bar = opts.heavy ? '━' : '─';
    if (!label) return p.rule(bar.repeat(width));
    const text = ` ${label} `;
    const lead = 2;
    const rest = Math.max(0, width - lead - visibleWidth(text));
    return p.rule(bar.repeat(lead)) + p.accentBold(text) + p.rule(bar.repeat(rest));
  } catch {
    return label ? `-- ${label} --` : '---';
  }
}

/**
 * Inline status chip.
 *
 * @param {string} text
 * @param {'accent'|'ok'|'warn'|'bad'|'muted'} [tone]
 */
function renderChip(text, tone = 'accent') {
  try {
    const p = palette();
    const fn = { accent: p.accent, ok: p.ok, warn: p.warn, bad: p.bad, muted: p.sub }[tone] || p.accent;
    return fn(`▎${text}`);
  } catch {
    return `[${text}]`;
  }
}

/**
 * Framed panel with a title set into the top border.
 *
 * @param {string} title
 * @param {string[]} lines  Body lines (may already be styled).
 * @param {object} [opts]   { width, style }
 */
function renderPanel(title, lines = [], opts = {}) {
  try {
    const p = palette();
    const width = Math.max(24, Math.min(opts.width || terminalWidth(), 100));
    const inner = width - 2;
    const body = lines.map((l) => '  ' + p.text(l));
    const f = FRAMES[opts.style] || FRAMES.panel;

    // Title inlaid in the top border: ╭─ TITLE ────────╮
    const cap = title ? ` ${title} ` : '';
    const capLen = visibleWidth(cap);
    const lead = title ? 1 : 0;
    const tail = Math.max(0, inner - lead - capLen);
    const top =
      p.rule(f.tl + f.h.repeat(lead)) +
      (title ? p.accentBold(cap) : '') +
      p.rule(f.h.repeat(tail) + f.tr);

    const out = [top];
    for (const row of body) {
      const fill = Math.max(0, inner - visibleWidth(row));
      out.push(p.rule(f.v) + row + ' '.repeat(fill) + p.rule(f.v));
    }
    out.push(p.rule(f.bl + f.h.repeat(inner) + f.br));
    return out.join('\n');
  } catch {
    return [title ? `-- ${title} --` : '', ...lines].filter(Boolean).join('\n');
  }
}

/**
 * Aligned key/value rail: labels in steel, values in silver, dot leaders in
 * gunmetal so the eye tracks across.
 *
 * @param {Array<[string, string]>} rows
 * @param {object} [opts]  { width, indent }
 */
function renderKV(rows = [], opts = {}) {
  try {
    const p = palette();
    const width = Math.max(24, Math.min(opts.width || terminalWidth(), 100));
    const indent = ' '.repeat(opts.indent ?? 2);
    const keyW = rows.reduce((m, [k]) => Math.max(m, visibleWidth(k)), 0);
    return rows
      .map(([k, v]) => {
        const label = p.sub(k) + ' '.repeat(Math.max(0, keyW - visibleWidth(k)));
        const value = p.text(String(v));
        const used = indent.length + keyW + 1 + visibleWidth(value) + 1;
        const leader = Math.max(1, width - used);
        return `${indent}${label} ${p.rule('·'.repeat(leader))} ${value}`;
      })
      .join('\n');
  } catch {
    return rows.map(([k, v]) => `  ${k}: ${v}`).join('\n');
  }
}

/**
 * Step tracker: completed steps filled, current step glowing, pending in metal.
 *
 * @param {string[]} steps
 * @param {number} current  Zero-based index of the active step.
 */
function renderSteps(steps = [], current = 0) {
  try {
    const p = palette();
    const parts = steps.map((label, i) => {
      if (i < current) return p.ok(`● ${label}`);
      if (i === current) return p.accentBold(`◉ ${label}`);
      return p.sub(`○ ${label}`);
    });
    return '  ' + parts.join(p.rule('  ──  '));
  } catch {
    return steps.map((s, i) => (i === current ? `[${s}]` : s)).join(' > ');
  }
}

/**
 * Read the agent roster straight from the definitions, so the table can never
 * drift from what is actually installed. Deliberately a narrow parse of the
 * three fields the roster shows rather than a YAML load: this runs on the
 * welcome path, and a malformed agent file must not be able to stop the CLI.
 *
 * @param {string} [agentsDir] Defaults to .aexos-core/development/agents
 * @returns {Array<{id:string,name:string,icon:string,title:string}>}
 */
function readRoster(agentsDir) {
  try {
    const fs = require('fs');
    const path = require('path');
    const dir =
      agentsDir || path.join(process.cwd(), '.aexos-core', 'development', 'agents');
    if (!fs.existsSync(dir)) return [];

    const field = (src, key) => {
      const m = src.match(new RegExp('^\\s*' + key + ':\\s*(.+?)\\s*$', 'm'));
      if (!m) return '';
      // Strip the quoting styles the agent files actually use.
      return m[1].replace(/^['"]|['"]$/g, '').trim();
    };

    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const src = fs.readFileSync(path.join(dir, f), 'utf8');
        return {
          id: field(src, 'id') || path.basename(f, '.md'),
          name: field(src, 'name'),
          icon: field(src, 'icon'),
          title: field(src, 'title'),
        };
      })
      .filter((a) => a.name && a.title)
      .sort((a, b) => a.id.localeCompare(b.id));
  } catch {
    return [];
  }
}

/**
 * The agent roster as a framed table: icon, activation handle, persona, role.
 *
 * @param {Array<{id:string,name:string,icon:string,title:string}>} [agents]
 * @param {object} [opts] { width, title }
 */
function renderRoster(agents, opts = {}) {
  try {
    const list = agents && agents.length ? agents : readRoster(opts.agentsDir);
    if (!list.length) return '';

    const p = palette();
    const width = Math.max(48, Math.min(opts.width || terminalWidth(), 100));
    const inner = width - 2;
    const f = FRAMES.panel;

    const handles = list.map((a) => '@' + a.id);
    const hw = handles.reduce((m, h) => Math.max(m, h.length), 0);
    const nw = list.reduce((m, a) => Math.max(m, visibleWidth(a.name)), 0);

    const rows = list.map((a, i) => {
      const handle = handles[i].padEnd(hw);
      const name = a.name + ' '.repeat(Math.max(0, nw - visibleWidth(a.name)));
      // Icons are emoji: most terminals render them double-width, so reserve two
      // columns and let a missing icon fall back to a space rather than shift
      // the whole table left.
      const icon = a.icon ? a.icon : ' ';
      const lead = `  ${icon} ${p.accent(handle)}  ${p.text(name)}  `;
      const used = 2 + 2 + 1 + hw + 2 + nw + 2;
      const room = Math.max(8, inner - used);
      let role = a.title;
      if (role.length > room) role = role.slice(0, room - 1) + '…';
      return lead + p.sub(role);
    });

    const cap = ` ${opts.title || 'AGENTS'} `;
    const top =
      p.rule(f.tl + f.h) + p.accentBold(cap) + p.rule(f.h.repeat(Math.max(0, inner - 1 - cap.length)) + f.tr);

    const out = [top];
    for (const row of rows) {
      const fill = Math.max(0, inner - visibleWidth(row));
      out.push(p.rule(f.v) + row + ' '.repeat(fill) + p.rule(f.v));
    }
    out.push(p.rule(f.bl + f.h.repeat(inner) + f.br));
    return out.join('\n');
  } catch {
    return '';
  }
}

/**
 * Reads the generated squad registry.
 *
 * Squads are read from the registry rather than by scanning `squads/`, for the
 * same reason the orchestrator does: the registry is the one record of which
 * squads are actually installed and routable. A squad on disk that never made
 * it into the registry is not reachable, and showing it here would advertise a
 * front door that does not open.
 *
 * @param {string} [registryPath]
 * @returns {Array<{name:string,display:string,domain:string,entry:string,count:number}>}
 */
function readSquads(registryPath) {
  try {
    const fs = require('fs');
    const path = require('path');
    const file =
      registryPath ||
      path.join(process.cwd(), '.aexos-core', 'data', 'squad-registry.yaml');
    if (!fs.existsSync(file)) return [];

    // Parsed by hand: this module is loaded on the welcome path and must not
    // pull a YAML dependency in just to render a decorative table.
    const out = [];
    let current = null;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const start = line.match(/^\s*-\s+name:\s*(.+?)\s*$/);
      if (start) {
        if (current) out.push(current);
        current = { name: start[1].replace(/^['"]|['"]$/g, ''), display: '', domain: '', entry: '', count: 0 };
        continue;
      }
      if (!current) continue;
      const kv = line.match(/^\s+(display_name|domain|entry_agent):\s*(.+?)\s*$/);
      if (kv) {
        const value = kv[2].replace(/^['"]|['"]$/g, '');
        if (kv[1] === 'display_name') current.display = value;
        else if (kv[1] === 'domain') current.domain = value;
        else current.entry = value;
        continue;
      }
      if (/^\s+-\s+id:/.test(line)) current.count++;
    }
    if (current) out.push(current);

    return out
      .filter((s) => s.name && s.entry)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

/**
 * The squad roster: one line per installed squad, keyed by its entry agent.
 *
 * Squads are listed rather than expanded. Nine squads carry roughly fifty
 * agents between them — printing all of them would bury the twelve core agents
 * a user actually starts from. What matters on the welcome screen is that the
 * squad exists and which handle opens it.
 *
 * @param {Array} [squads]
 * @param {object} [opts] { width, title, registryPath }
 */
function renderSquads(squads, opts = {}) {
  try {
    const list = squads && squads.length ? squads : readSquads(opts.registryPath);
    if (!list.length) return '';

    const p = palette();
    const width = Math.max(48, Math.min(opts.width || terminalWidth(), 100));
    const inner = width - 2;
    const f = FRAMES.panel;

    const handles = list.map((s) => '@' + s.entry);
    const hw = handles.reduce((m, h) => Math.max(m, h.length), 0);
    // "Squad" is redundant inside a panel already titled SQUADS, and dropping it
    // returns those columns to the domain, which is the part that carries
    // information.
    const names = list.map((s) => (s.display || s.name).replace(/\s+squad$/i, ''));
    const nw = names.reduce((m, n) => Math.max(m, visibleWidth(n)), 0);

    const rows = list.map((s, i) => {
      const handle = handles[i].padEnd(hw);
      const name = names[i] + ' '.repeat(Math.max(0, nw - visibleWidth(names[i])));
      const count = s.count ? `${s.count}` : '-';
      const lead = `  ${p.accent(handle)}  ${p.text(name)}  ${p.sub(count.padStart(2))}  `;
      const used = 2 + hw + 2 + nw + 2 + 2 + 2;
      const room = Math.max(8, inner - used);
      // Domains are written "Heading — detail", and the heading restates the
      // name column. Keeping only the detail spends the narrowest column on the
      // one part the name does not already say.
      let domain = (s.domain || '').replace(/^[^—]+—\s*/, '');
      if (domain.length > room) domain = domain.slice(0, room - 1) + '…';
      return lead + p.sub(domain);
    });

    const cap = ` ${opts.title || 'SQUADS'} `;
    const top =
      p.rule(f.tl + f.h) +
      p.accentBold(cap) +
      p.rule(f.h.repeat(Math.max(0, inner - 1 - cap.length)) + f.tr);

    const out = [top];
    for (const row of rows) {
      const fill = Math.max(0, inner - visibleWidth(row));
      out.push(p.rule(f.v) + row + ' '.repeat(fill) + p.rule(f.v));
    }
    out.push(p.rule(f.bl + f.h.repeat(inner) + f.br));
    return out.join('\n');
  } catch {
    return '';
  }
}

module.exports = {
  BRAND,
  WORDMARK,
  WORDMARK_COMPACT,
  visibleWidth,
  renderBanner,
  printBanner,
  renderLockup,
  renderRule,
  renderChip,
  renderPanel,
  renderKV,
  renderSteps,
  readRoster,
  renderRoster,
  readSquads,
  renderSquads,
};
