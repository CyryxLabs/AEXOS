/**
 * Guards the column accounting every framed panel in the TUI depends on.
 *
 * `visibleWidth` decides where a frame's right edge goes. When it is wrong by
 * one, the panel is ragged by one, and nothing else reports it — the output
 * still prints, it just looks broken.
 *
 * Two live defects motivated this, both found by rendering real squad icons:
 *
 *   - U+FE0F was treated as merely zero-width, so the character it applies to
 *     was measured by its own default. "⚙️" measured one column and printed
 *     two, because the selector is precisely what makes it two.
 *   - the Extended-A pictograph block (U+1FA70–U+1FAFF, Unicode 13+) was absent
 *     from the wide table, so "🪢" — shipped by the sales squad — measured one.
 *
 * The cases below are grouped by what they protect, because the temptation with
 * a width table is to widen it until everything is two, which would break the
 * box drawing the frames are built from.
 */

'use strict';

const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const { visibleWidth, renderRoster, renderSquads } = require(
  path.join(REPO_ROOT, 'packages', 'installer', 'src', 'utils', 'aexos-banner.js'),
);

describe('visibleWidth', () => {
  test.each([
    ['plain ascii', 'abc', 3],
    ['empty', '', 0],
  ])('%s', (_label, input, expected) => {
    expect(visibleWidth(input)).toBe(expected);
  });

  test('box drawing stays single-width', () => {
    // The frames are built from this block. If it ever measures two, every
    // panel in the product collapses.
    for (const ch of '│─╭╮╰╯├┤┬┴┼═║╔╗╚╝') {
      expect(visibleWidth(ch)).toBe(1);
    }
  });

  test('a variation selector makes its base two columns', () => {
    expect(visibleWidth('⚙️')).toBe(2); // U+2699 U+FE0F
    expect(visibleWidth('🎛️')).toBe(2); // U+1F39B U+FE0F
    expect(visibleWidth('🏛️')).toBe(2); // U+1F3DB U+FE0F — core @architect
  });

  test('the same base without a selector keeps its own default', () => {
    expect(visibleWidth('⚙')).toBe(1); // text presentation by default
    expect(visibleWidth('⚖')).toBe(1);
    expect(visibleWidth('♛')).toBe(1); // not an emoji at all
    expect(visibleWidth('⧗')).toBe(1);
  });

  test('BMP symbols with default emoji presentation are two columns', () => {
    expect(visibleWidth('⚓')).toBe(2); // U+2693 — customer-success cs-chief
    expect(visibleWidth('⚡')).toBe(2); // core @devops
    expect(visibleWidth('✅')).toBe(2); // core @qa
  });

  test('Extended-A pictographs are two columns', () => {
    expect(visibleWidth('🪢')).toBe(2); // U+1FAA2 — sales negotiation-lead
    expect(visibleWidth('🪝')).toBe(2); // U+1FA9D
  });

  test('ANSI escapes contribute nothing', () => {
    expect(visibleWidth('[31mred[39m')).toBe(3);
  });
});

describe('panels built on it render square', () => {
  // The unit cases above are the mechanism; these are the property that
  // actually matters. Both panels carry real icons from the shipped squads, so
  // a new agent with an unusual icon fails here even if nobody thought to add
  // a unit case for it.
  test.each([
    ['roster', renderRoster],
    ['squads', renderSquads],
  ])('%s panel holds one width on every row', (label, render) => {
    for (const width of [72, 80, 100]) {
      const out = render(undefined, { width });
      if (!out) continue; // not installed in this tree; other tests own that
      const widths = new Set(out.split('\n').map((l) => visibleWidth(l)));
      if (widths.size !== 1) {
        throw new Error(
          `${label} panel at width ${width} rendered rows of ${[...widths].sort().join(', ')} ` +
            'columns — an icon is being measured differently from how it prints.',
        );
      }
      expect(widths.has(width)).toBe(true);
    }
  });
});
