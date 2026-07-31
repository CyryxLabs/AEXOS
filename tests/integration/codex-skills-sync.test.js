'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  syncSkills,
  buildSkillContent,
  getSkillId,
  getLegacySkillId,
} = require(path.join(
  process.cwd(),
  '.aexos-core/infrastructure/scripts/codex-skills-sync/index',
));
const {
  validateCodexSkills,
} = require(path.join(
  process.cwd(),
  '.aexos-core/infrastructure/scripts/codex-skills-sync/validate',
));

describe('Codex Skills Sync', () => {
  let tmpRoot;
  let expectedAgentCount;

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cyryx-codex-skills-'));
    expectedAgentCount = fs.readdirSync(path.join(process.cwd(), '.aexos-core', 'development', 'agents'))
      .filter(name => name.endsWith('.md')).length;
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('generates one SKILL.md per AEXOS agent in local .codex/skills', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    const result = syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    expect(result.generated).toBe(expectedAgentCount);
    const expected = path.join(localSkillsDir, 'aexos-architect', 'SKILL.md');
    expect(fs.existsSync(expected)).toBe(true);

    const content = fs.readFileSync(expected, 'utf8');
    expect(content).toContain('name: aexos-architect');
    expect(content).toContain('Activation Protocol');
    expect(content).toContain('.aexos-core/development/agents/architect.md');
    expect(content).toContain('generate-greeting.js architect');
  });

  it('supports global installation path when --global mode is enabled', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    const globalSkillsDir = path.join(tmpRoot, '.codex-home', 'skills');

    const result = syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      globalSkillsDir,
      global: true,
      dryRun: false,
    });

    expect(result.generated).toBe(expectedAgentCount);
    expect(result.globalSkillsDir).toBe(globalSkillsDir);
    expect(fs.existsSync(path.join(globalSkillsDir, 'aexos-dev', 'SKILL.md'))).toBe(true);
  });

  it('treats globalOnly as global output and skips local writes', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    const globalSkillsDir = path.join(tmpRoot, '.codex-home', 'skills');

    const result = syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      globalSkillsDir,
      globalOnly: true,
      dryRun: false,
    });

    expect(result.generated).toBe(expectedAgentCount);
    expect(result.globalSkillsDir).toBe(globalSkillsDir);
    expect(fs.existsSync(path.join(localSkillsDir, 'aexos-dev', 'SKILL.md'))).toBe(false);
    expect(fs.existsSync(path.join(globalSkillsDir, 'aexos-dev', 'SKILL.md'))).toBe(true);
  });

  it('buildSkillContent emits valid frontmatter and starter commands', () => {
    const sample = {
      id: 'dev',
      filename: 'dev.md',
      agent: { name: 'Vulcan', title: 'Developer', whenToUse: 'Build features safely.' },
      commands: [{ name: 'help', description: 'Show commands', visibility: ['quick', 'key', 'full'] }],
    };
    const content = buildSkillContent(sample);
    expect(content.startsWith('---')).toBe(true);
    expect(content).toContain('name: aexos-dev');
    expect(content).toContain('`*help` - Show commands');
  });

  it('derives legacy aliases for migrated core agents', () => {
    expect(getSkillId('cyryx-dev')).toBe('aexos-dev');
    expect(getLegacySkillId('dev')).toBe('cyryx-dev');
    expect(getLegacySkillId('aexos-master')).toBe('cyryx-master');
    expect(getLegacySkillId('cyryx-master')).toBe('cyryx-master');
  });

  it('strict validation rejects legacy aliases that duplicate full skill payloads', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    const canonicalDir = path.join(localSkillsDir, 'aexos-dev');
    const legacyDir = path.join(localSkillsDir, 'cyryx-dev');
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.copyFileSync(path.join(canonicalDir, 'SKILL.md'), path.join(legacyDir, 'SKILL.md'));

    const result = validateCodexSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      skillsDir: localSkillsDir,
      strict: true,
    });

    expect(result.ok).toBe(false);
    expect(result.legacy).toContain('cyryx-dev');
    expect(result.legacyAliases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dir: 'cyryx-dev',
          canonicalSkillId: 'aexos-dev',
          classification: 'duplicate-full-payload',
          fatal: true,
        }),
      ]),
    );
    expect(result.errors.join('\n')).toContain('Legacy skill alias duplicates full activation payload');
  });

  it('strict validation reports intentional legacy aliases without treating them as duplicate payloads', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    const legacyDir = path.join(localSkillsDir, 'cyryx-dev');
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(
      path.join(legacyDir, 'SKILL.md'),
      [
        '<!-- CYRYX-CODEX-LEGACY-ALIAS: redirect -->',
        '# cyryx-dev',
        '',
        'This legacy alias redirects to canonical skill `aexos-dev`.',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = validateCodexSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      skillsDir: localSkillsDir,
      strict: true,
    });

    expect(result.ok).toBe(true);
    expect(result.legacy).toContain('cyryx-dev');
    expect(result.legacyAliases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dir: 'cyryx-dev',
          canonicalSkillId: 'aexos-dev',
          classification: 'intentional-redirect',
          fatal: false,
        }),
      ]),
    );
    expect(result.warnings.join('\n')).toContain('Intentional legacy skill alias directory');
  });

  it('strict validation rejects legacy aliases that include extra non-redirect content', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    const legacyDir = path.join(localSkillsDir, 'cyryx-dev');
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(
      path.join(legacyDir, 'SKILL.md'),
      [
        '<!-- CYRYX-CODEX-LEGACY-ALIAS: redirect -->',
        '# cyryx-dev',
        '',
        'This legacy alias redirects to canonical skill `aexos-dev`.',
        '',
        'When activated, load the developer persona and command list from this file.',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = validateCodexSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      skillsDir: localSkillsDir,
      strict: true,
    });

    expect(result.ok).toBe(false);
    expect(result.legacyAliases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dir: 'cyryx-dev',
          canonicalSkillId: 'aexos-dev',
          classification: 'non-thin-legacy-alias',
          fatal: true,
        }),
      ]),
    );
    expect(result.errors.join('\n')).toContain('Legacy skill alias is not a thin redirect');
    expect(result.errors.join('\n')).toContain('contains non-redirect content');
  });

  it('strict validation rejects orphaned canonical dirs that duplicate full skill payloads', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    const duplicateDir = path.join(localSkillsDir, 'cyryx-dev-copy');
    fs.mkdirSync(duplicateDir, { recursive: true });
    fs.copyFileSync(path.join(localSkillsDir, 'aexos-dev', 'SKILL.md'), path.join(duplicateDir, 'SKILL.md'));

    const result = validateCodexSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      skillsDir: localSkillsDir,
      strict: true,
    });

    expect(result.ok).toBe(false);
    expect(result.duplicatePayloads).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dir: 'cyryx-dev-copy',
          canonicalSkillId: 'aexos-dev',
          canonicalAgentPath: '.aexos-core/development/agents/dev.md',
        }),
      ]),
    );
    expect(result.errors.join('\n')).toContain('Duplicate full skill payload');
  });

  it('strict validation rejects unresolved generated squad skill directories', () => {
    const localSkillsDir = path.join(tmpRoot, '.codex', 'skills');
    syncSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      localSkillsDir,
      dryRun: false,
    });

    const orphanDir = path.join(localSkillsDir, 'cyryx-private-chief');
    fs.mkdirSync(orphanDir, { recursive: true });
    fs.writeFileSync(
      path.join(orphanDir, 'SKILL.md'),
      [
        '---',
        'name: cyryx-private-chief',
        'description: leaked squad skill',
        '---',
        '<!-- CYRYX-CODEX-LOCAL-SKILLS: generated -->',
        '',
        'Load `squads/private-pro-only/agents/private-chief.md`.',
        '',
      ].join('\n'),
      'utf8',
    );

    const result = validateCodexSkills({
      sourceDir: path.join(process.cwd(), '.aexos-core', 'development', 'agents'),
      skillsDir: localSkillsDir,
      strict: true,
    });

    expect(result.ok).toBe(false);
    expect(result.orphaned).toContain('cyryx-private-chief');
    expect(result.errors.join('\n')).toContain('Orphaned skill directory');
  });
});
