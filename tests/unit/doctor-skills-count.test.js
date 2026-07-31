'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const skillsCount = require('../../.aexos-core/core/doctor/checks/skills-count');

describe('doctor skills-count check', () => {
  let tmpRoot;

  function write(file, content = '') {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, 'utf8');
  }

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'doctor-skills-count-'));
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('counts nested Claude AEXOS agent skills', async () => {
    write(path.join(tmpRoot, '.aexos-core', 'development', 'agents', 'dev.md'), '# dev');
    write(path.join(tmpRoot, '.claude', 'skills', 'AEXOS', 'agents', 'dev', 'SKILL.md'), '# dev');
    write(path.join(tmpRoot, '.claude', 'skills', 'synapse', 'SKILL.md'), '# synapse');

    const result = await skillsCount.run({ projectRoot: tmpRoot });

    expect(result.status).toBe('WARN');
    expect(result.message).toContain('Only 2/7 skills found');
    expect(result.message).toContain('1/1 AEXOS agent skills');
  });

  it('warns when AEXOS agent skills are incomplete', async () => {
    write(path.join(tmpRoot, '.aexos-core', 'development', 'agents', 'dev.md'), '# dev');
    write(path.join(tmpRoot, '.claude', 'skills', 'synapse', 'SKILL.md'), '# synapse');

    const result = await skillsCount.run({ projectRoot: tmpRoot });

    expect(result.status).toBe('WARN');
    expect(result.message).toContain('AEXOS agent skills are incomplete');
  });
});
