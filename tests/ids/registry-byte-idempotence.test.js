/**
 * Guards the byte-idempotence of the entity registry.
 *
 * The populator used to stamp `lastVerified: new Date()` on every entity and
 * `metadata.lastUpdated` on every run, so a regeneration that found no real
 * change still rewrote 845 lines. `validate-registry-determinism` did not catch
 * it -- that gate strips VOLATILE_FIELDS by design -- but the install manifest
 * hashes raw bytes, so `validate:manifest` failed after every commit once the
 * post-commit hook started reconciling through the populator.
 *
 * The fix preserves `lastVerified` when an entity's checksum is unchanged, and
 * only advances `metadata.lastUpdated` when the serialised output would
 * actually differ. Nothing in the determinism gate would notice that fix being
 * reverted, so this test is the guard: run the populator twice, demand the same
 * bytes.
 *
 * The registry is a tracked file, so the original content is captured and
 * restored -- the test must not leave the working tree dirty.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const POPULATOR = path.join(
  REPO_ROOT,
  '.aexos-core',
  'development',
  'scripts',
  'populate-entity-registry.js',
);
const REGISTRY = path.join(REPO_ROOT, '.aexos-core', 'data', 'entity-registry.yaml');

function runPopulator() {
  execFileSync(process.execPath, [POPULATOR], {
    cwd: REPO_ROOT,
    stdio: 'pipe',
    encoding: 'utf8',
  });
}

describe('entity registry byte-idempotence', () => {
  let original = null;

  beforeAll(() => {
    if (fs.existsSync(REGISTRY)) {
      original = fs.readFileSync(REGISTRY);
    }
  });

  afterAll(() => {
    // Restore whatever was on disk before, byte for byte.
    if (original !== null) {
      fs.writeFileSync(REGISTRY, original);
    }
  });

  test('two consecutive regenerations produce identical bytes', () => {
    expect(fs.existsSync(POPULATOR)).toBe(true);

    runPopulator();
    const first = fs.readFileSync(REGISTRY);

    runPopulator();
    const second = fs.readFileSync(REGISTRY);

    // Point at the likely culprit rather than dumping two 20k-line files.
    if (!first.equals(second)) {
      const a = first.toString('utf8').split('\n');
      const b = second.toString('utf8').split('\n');
      const drifted = [];
      for (let i = 0; i < Math.min(a.length, b.length) && drifted.length < 5; i++) {
        if (a[i] !== b[i]) drifted.push(`  line ${i + 1}:\n    - ${a[i]}\n    + ${b[i]}`);
      }
      throw new Error(
        'Registry regeneration is not byte-stable. A field is being stamped on every run ' +
          'regardless of whether anything changed; this breaks validate:manifest after ' +
          'every commit.\nFirst differing lines:\n' +
          drifted.join('\n'),
      );
    }

    expect(first.equals(second)).toBe(true);
  }, 60000);
});
