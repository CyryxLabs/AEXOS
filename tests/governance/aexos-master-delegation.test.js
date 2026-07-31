'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

describe('aexos-master delegation authority', () => {
  const publishedSurfaces = [
    '.aexos-core/development/agents/aexos-master.md',
    '.claude/skills/AEXOS/agents/aexos-master/SKILL.md',
    '.claude/rules/agent-authority.md',
    '.aexos-core/data/aexos-kb.md',
  ];

  const forbiddenAuthorityPhrases = [
    'Execute ANY task directly',
    'No restrictions',
    'Universal executor of all AEXOS (Cyryx) capabilities',
    'Execute any resource directly without persona transformation',
    'Can execute any task from any agent directly',
    'All capabilities without switching',
    'CAN do any task without switching agents',
  ];

  test.each(publishedSurfaces)('%s does not grant universal execution authority', relativePath => {
    const content = read(relativePath);

    for (const phrase of forbiddenAuthorityPhrases) {
      expect(content).not.toContain(phrase);
    }
  });

  test('canonical aexos-master agent requires pre-execution delegation checks', () => {
    const content = read('.aexos-core/development/agents/aexos-master.md');

    expect(content).toContain('MANDATORY PRE-EXECUTION CHECK');
    expect(content).toContain('delegate specialized work by default');
    expect(content).toContain("Story creation is @sm's exclusive domain");
    expect(content).toContain('GitHub, PR, release, MCP');
  });

  test('agent authority rules make delegation the default for specialized work', () => {
    const content = read('.claude/rules/agent-authority.md');

    expect(content).toContain('Delegation is the default for specialized work');
    expect(content).toContain('Story creation → @sm');
    expect(content).toContain('Direct execution of exclusive specialized tasks without `--force-execute`');
  });
});
