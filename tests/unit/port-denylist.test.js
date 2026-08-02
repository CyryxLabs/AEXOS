'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync } = require('child_process');
const {
  scanContent,
  scanProject,
  isAllowlisted,
  isLocalOnlyFile,
  filterScannableFiles,
  DENY_PATTERNS,
  DEFAULT_SCAN_ROOTS,
} = require('../../.aexos-core/core/security/port-denylist');

const MACHINE_PATH_LINE = 'const p = "/Users/alan/Code/secret";';

function hasGit() {
  try {
    execFileSync('git', ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

describe('port-denylist (CORE-SU.A4)', () => {
  it('exposes deny patterns including workspace product and sinkra', () => {
    const ids = DENY_PATTERNS.map((p) => p.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'workspace-product',
        'secrets-path',
        'hardcoded-credential',
        'sinkra-prefix',
        'mux-adapter',
        'machine-path-users',
      ]),
    );
  });

  it('flags sinkra_ and workspace product paths', () => {
    const hits = scanContent(
      'require("sinkra_pipeline")\nworkspace/custom-domain/foo\n`workspace/private-api`',
    );
    expect(hits.some((h) => h.id === 'sinkra-prefix')).toBe(true);
    expect(hits.filter((h) => h.id === 'workspace-product')).toHaveLength(2);
  });

  it('flags secret-store paths and probable hardcoded credentials', () => {
    const hits = scanContent(
      'secrets/api-key\napi_key = "abcdefghijklmnop123456"',
    );
    expect(hits.some((h) => h.id === 'secrets-path')).toBe(true);
    expect(hits.some((h) => h.id === 'hardcoded-credential')).toBe(true);
  });

  it.each([
    ['API_KEY=abcdefghijklmnop123456', '.env'],
    ['password: abcdefghijklmnop123456', 'config.yaml'],
    ['auth-token = abcdefghijklmnop123456 # local override', 'secrets.env'],
    ['client_secret: "abcdefghijklmnop123456"', 'config.yml'],
    ['{"api_key":"abcdefghijklmnop123456"}', 'config.json'],
    ["'password': 'abcdefghijklmnop123456'", 'config.yaml'],
    ['const password = "abcdefghijklmnop123456";', 'config.js'],
  ])('flags quoted keys and literal credential assignment %j', (line, filePath) => {
    expect(scanContent(line, filePath)).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'hardcoded-credential' })]),
    );
  });

  it('honors literal boundaries around unquoted credentials', () => {
    expect(scanContent('API_KEY=abcdefghijklmnop123456; enabled=true')).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'hardcoded-credential' })]),
    );
    expect(scanContent('API_KEY=abcdefghijklmnop123456${PASSWORD}')).toHaveLength(0);
  });

  it.each([
    'export PASSWORD=abcdEFGHijklMNOP1234',
    'password: "Correct Horse!@:% 123456"',
    'API_KEY=abcdEFGH!@:%ijklMNOP1234',
  ])('detects the required high-entropy literal vector: %s', (line) => {
    expect(scanContent(line)).toEqual([
      expect.objectContaining({ id: 'hardcoded-credential' }),
    ]);
  });

  it('continues scanning after a dynamic assignment on the same line', () => {
    const hits = scanContent(
      '{"password":"${PASSWORD}","api_key":"abcdefghijklmnop123456"}',
      'config.json',
    );

    expect(hits).toEqual([
      expect.objectContaining({ id: 'hardcoded-credential' }),
    ]);
  });

  it('does not consume the next assignment after a delimiter', () => {
    const hits = scanContent(
      'PASSWORD=$PASSWORD, API_KEY=abcdEFGH!@:%ijklMNOP1234',
      '.env',
    );

    expect(hits).toEqual([
      expect.objectContaining({ id: 'hardcoded-credential' }),
    ]);
  });

  it.each([
    'const apiKey = process.env.OPENAI_API_KEY;',
    'PASSWORD=process.env.PASSWORD',
    'export PASSWORD=$PASSWORD',
    'const accessToken = getLicenseResultAccessToken(result);',
    'password: options.password || process.env.PASSWORD,',
    'password: getPassword(),',
    'password: vault.getPassword(),',
    'password: vault["password"],',
    'password: passwordTemplate',
    'password: `abcdefghijklmnop${PASSWORD}`',
    '"password": "${PASSWORD}"',
    '"password": "process.env.PASSWORD"',
    '{"password":"${PASSWORD}","api_key":"process.env.API_KEY"}',
    'PASSWORD=getPassword(); API_KEY=resolveApiKey()',
    'PASSWORD=`prefix-${PASSWORD}`; API_KEY="${API_KEY}"',
  ])('does not classify credential references as hardcoded values: %s', (line) => {
    expect(scanContent(line).some((hit) => hit.id === 'hardcoded-credential')).toBe(false);
  });

  it('preserves credential detection in the QA security checklist', () => {
    const qaChecklist = path.join(
      '.aexos-core',
      'development',
      'tasks',
      'qa-security-checklist.md',
    );
    const hits = scanContent(
      'api_key = "abcdefghijklmnop123456"',
      qaChecklist,
    );
    expect(hits).toEqual([
      expect.objectContaining({ id: 'hardcoded-credential' }),
    ]);
  });

  it('flags machine absolute paths', () => {
    const hits = scanContent('const p = "/Users/alan/Code/secret"');
    expect(hits.some((h) => h.id === 'machine-path-users')).toBe(true);
  });

  it('allows clean OSS code', () => {
    const hits = scanContent('const x = require(".aexos-core/core/permissions")');
    expect(hits).toHaveLength(0);
  });

  it('allowlists denylist self-docs', () => {
    expect(
      isAllowlisted(path.join('docs', 'framework', 'epics', 'core-super-update', 'EPIC.md')),
    ).toBe(true);
    expect(isAllowlisted(path.join('src', 'foo.js'))).toBe(false);
  });

  it('scans tracked agent config surfaces by default', () => {
    expect(DEFAULT_SCAN_ROOTS).toEqual(
      expect.arrayContaining(['.claude', '.codex', '.gemini', '.grok']),
    );
  });

  it('fails closed when an explicit file cannot be read', () => {
    const result = scanProject({
      projectRoot: path.resolve(__dirname, '../..'),
      files: ['missing-port-denylist-fixture.js'],
    });
    expect(result.ok).toBe(false);
    expect(result.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'scan-error',
          file: 'missing-port-denylist-fixture.js',
        }),
      ]),
    );
  });

  it('scanProject on this repo is clean (or only documents hits)', () => {
    const result = scanProject({ projectRoot: path.resolve(__dirname, '../..') });
    expect(result.filesScanned).toBeGreaterThan(10);
    if (!result.ok) {
      // Fail with readable message
      const sample = result.findings
        .slice(0, 5)
        .map((f) => `${f.file}:${f.line} ${f.id}`)
        .join('\n');
      throw new Error(`Unexpected denylist hits:\n${sample}`);
    }
    expect(result.ok).toBe(true);
  });

  describe('gitignore awareness', () => {
    // The denylist protects what we ship. A gitignored file is never committed
    // and never published, so scanning it makes the gate depend on the
    // developer's local state (.claude/settings.local.json is rewritten with
    // absolute host paths on every permission grant, which is what made this
    // gate fail on every real workstation).
    let repoRoot;

    beforeEach(() => {
      // NOT prefixed "port-denylist" — that substring is in the allowlist and
      // would exempt the whole fixture tree.
      repoRoot = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'aexos-denyscan-')));
      fs.writeFileSync(path.join(repoRoot, 'ignored.json'), MACHINE_PATH_LINE);
      fs.writeFileSync(path.join(repoRoot, 'tracked.json'), MACHINE_PATH_LINE);
      fs.writeFileSync(path.join(repoRoot, '.gitignore'), 'ignored.json\n');
    });

    afterEach(() => {
      fs.rmSync(repoRoot, { recursive: true, force: true });
    });

    const gitIt = hasGit() ? it : it.skip;

    gitIt('does not fail the scan for a gitignored file carrying a denied pattern', () => {
      execFileSync('git', ['init', '-q'], { cwd: repoRoot, stdio: 'ignore' });
      fs.rmSync(path.join(repoRoot, 'tracked.json'));

      const result = scanProject({ projectRoot: repoRoot, roots: ['.'] });

      expect(result.findings).toEqual([]);
      expect(result.ok).toBe(true);
      expect(result.filesScanned).toBe(0);
    });

    gitIt('still fails the scan for a tracked file carrying the same pattern', () => {
      execFileSync('git', ['init', '-q'], { cwd: repoRoot, stdio: 'ignore' });

      const result = scanProject({ projectRoot: repoRoot, roots: ['.'] });

      expect(result.ok).toBe(false);
      expect(result.findings).toEqual([
        expect.objectContaining({ file: 'tracked.json', id: 'machine-path-users' }),
      ]);
    });

    gitIt('scans untracked-but-not-ignored files, which are about to be committed', () => {
      execFileSync('git', ['init', '-q'], { cwd: repoRoot, stdio: 'ignore' });
      // tracked.json is never `git add`ed here: ignore status, not index
      // membership, is what excludes a file from the gate.
      expect(
        execFileSync('git', ['status', '--porcelain', '--', 'tracked.json'], {
          cwd: repoRoot,
          encoding: 'utf8',
        }).trim(),
      ).toMatch(/^\?\?/);

      const result = scanProject({ projectRoot: repoRoot, roots: ['.'] });

      expect(result.findings).toEqual([
        expect.objectContaining({ file: 'tracked.json', id: 'machine-path-users' }),
      ]);
    });

    it('skips *.local.* files even when git cannot answer', () => {
      // No `git init`: outside a work tree check-ignore fails and the naming
      // convention is the only fallback left.
      fs.writeFileSync(path.join(repoRoot, 'settings.local.json'), MACHINE_PATH_LINE);
      fs.rmSync(path.join(repoRoot, 'ignored.json'));

      const result = scanProject({ projectRoot: repoRoot, roots: ['.'] });

      expect(result.findings).toEqual([
        expect.objectContaining({ file: 'tracked.json', id: 'machine-path-users' }),
      ]);
    });

    it('classifies machine-local filenames by convention', () => {
      expect(isLocalOnlyFile(path.join('.claude', 'settings.local.json'))).toBe(true);
      expect(isLocalOnlyFile('config.local.yaml')).toBe(true);
      expect(isLocalOnlyFile(path.join('.claude', 'settings.json'))).toBe(false);
      expect(isLocalOnlyFile('local.json')).toBe(false);
    });

    gitIt('honors explicit --files even when the path is gitignored', () => {
      execFileSync('git', ['init', '-q'], { cwd: repoRoot, stdio: 'ignore' });
      const explicit = [path.join(repoRoot, 'ignored.json')];

      // The walk-based path drops it...
      expect(filterScannableFiles(repoRoot, explicit)).toEqual([]);

      // ...but naming a file is explicit intent, so scanProject({ files })
      // never silently discards it.
      const result = scanProject({ projectRoot: repoRoot, files: ['ignored.json'] });
      expect(result.findings).toEqual([
        expect.objectContaining({ file: 'ignored.json', id: 'machine-path-users' }),
      ]);
    });
  });
});
