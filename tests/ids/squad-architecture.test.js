/**
 * Guards that every squad follows squad-creator's architecture.
 *
 * The framework ships a schema (`schemas/squad-schema.json`), a validator
 * (`scripts/squad/squad-validator.js`) and a task format specification, and
 * until this test existed nothing ever ran them against the squads. All nine —
 * including the oldest one — failed the schema on the same two
 * required fields, and none of the eight written for this project had a
 * `tasks/` directory at all, despite task-first being the stated architecture.
 *
 * Everything that reads a manifest had been written against the shape the files
 * happened to have rather than the shape the schema declares, so the contract
 * was unenforced and drifted without a symptom.
 *
 * Two things are asserted here, because passing the validator is necessary and
 * not sufficient: the validator's verdict, and structural parity with the
 * reference squad. A squad with no workflows validates cleanly and is still
 * only half a squad — task-first means tasks composed into workflows.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SQUADS_DIR = path.join(REPO_ROOT, 'squads');
const NOT_SQUADS = new Set(['_example', '.designs']);

const { SquadValidator } = require(
  path.join(REPO_ROOT, '.aexos-core/development/scripts/squad/squad-validator.js'),
);

function squadNames() {
  if (!fs.existsSync(SQUADS_DIR)) return [];
  return fs
    .readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !NOT_SQUADS.has(e.name))
    .filter((e) =>
      ['squad.yaml', 'config.yaml'].some((m) =>
        fs.existsSync(path.join(SQUADS_DIR, e.name, m)),
      ),
    )
    .map((e) => e.name)
    .sort();
}

const squads = squadNames();

/** Files and directories the reference squad has, that a squad is not complete without. */
const REQUIRED_FILES = ['squad.yaml', 'README.md', 'CHANGELOG.md'];
const REQUIRED_DIRS = ['agents', 'tasks', 'workflows'];

describe('squad architecture', () => {
  test('squads are present', () => {
    expect(squads.length).toBeGreaterThan(0);
  });

  describe.each(squads)('%s', (squad) => {
    const dir = path.join(SQUADS_DIR, squad);

    test.each(REQUIRED_FILES)('has %s', (file) => {
      expect(fs.existsSync(path.join(dir, file))).toBe(true);
    });

    test('uses the canonical manifest name, not the deprecated one', () => {
      // config.yaml still loads, so a squad using it works and quietly stays on
      // a name the validator reports as deprecated.
      expect(fs.existsSync(path.join(dir, 'config.yaml'))).toBe(false);
    });

    test.each(REQUIRED_DIRS)('has a non-empty %s/ directory', (sub) => {
      const full = path.join(dir, sub);
      expect(fs.existsSync(full)).toBe(true);
      const contents = fs.readdirSync(full).filter((f) => !f.startsWith('.'));
      if (contents.length === 0) {
        throw new Error(
          `${squad}/${sub}/ is empty. The architecture is task-first: agents carry the ` +
            'expertise, tasks make it executable, and workflows compose the tasks. A squad ' +
            'missing any of the three is not usable end to end.',
        );
      }
    });

    test('passes the framework validator with no errors and no warnings', async () => {
      const result = await new SquadValidator().validate(dir);
      const errors = result.errors || [];
      const warnings = result.warnings || [];

      if (errors.length || warnings.length) {
        const lines = [
          ...errors.map((e) => `ERROR   [${e.code}] ${e.file ? `${e.file}: ` : ''}${e.message}`),
          ...warnings.map((w) => `warning [${w.code}] ${w.file ? `${w.file}: ` : ''}${w.message}`),
        ];
        throw new Error(
          `${squad} does not satisfy squad-creator's architecture:\n  ${lines.join('\n  ')}\n\n` +
            'Run: node scripts/validate-squads.js --allow-warnings',
        );
      }

      expect(result.valid).toBe(true);
    }, 30000);
  });

  test('every squad is reachable through a single entry agent', () => {
    // The chief is the front door: the orchestrator routes to a squad, not to
    // an agent inside it. A squad whose entry agent does not resolve can only
    // be reached by someone who already knows its internals.
    const yaml = require('js-yaml');
    const broken = [];

    for (const squad of squads) {
      const manifest = yaml.load(
        fs.readFileSync(path.join(SQUADS_DIR, squad, 'squad.yaml'), 'utf8'),
      );
      const entry = (manifest.squad || {}).entry_agent || manifest.entry_agent;
      if (!entry) {
        broken.push(`${squad}: declares no entry_agent`);
        continue;
      }
      if (!fs.existsSync(path.join(SQUADS_DIR, squad, 'agents', `${entry}.md`))) {
        broken.push(`${squad}: entry_agent "${entry}" has no definition`);
      }
    }

    if (broken.length) {
      throw new Error('Squads with no working front door:\n  ' + broken.join('\n  '));
    }
    expect(broken).toHaveLength(0);
  });
});
