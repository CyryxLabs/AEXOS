'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  validateGeminiIntegration,
} = require('../../.aexos-core/infrastructure/scripts/validate-gemini-integration');

describe('validate-gemini-integration', () => {
  let tmpRoot;

  function write(file, content = '') {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, 'utf8');
  }

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'validate-gemini-'));
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('passes when required Gemini files exist', () => {
    write(path.join(tmpRoot, '.gemini', 'rules', 'AEXOS', 'agents', 'dev.md'), '# dev');
    write(path.join(tmpRoot, '.gemini', 'commands', 'aexos-menu.toml'), 'description = "menu"');
    write(path.join(tmpRoot, '.gemini', 'commands', 'aexos-dev.toml'), 'description = "dev"');
    write(path.join(tmpRoot, '.aexos-core', 'development', 'agents', 'dev.md'), '# dev');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'extension.json'), '{}');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'README.md'), '# readme');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'commands', 'aexos-status.js'), '');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'commands', 'aexos-agents.js'), '');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'commands', 'aexos-validate.js'), '');
    write(path.join(tmpRoot, 'packages', 'gemini-aexos-extension', 'hooks', 'hooks.json'), '{}');

    const result = validateGeminiIntegration({ projectRoot: tmpRoot });
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('warns (but passes) when rules file is missing', () => {
    const result = validateGeminiIntegration({ projectRoot: tmpRoot });
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('Missing Gemini agents dir'))).toBe(true);
    expect(result.errors.some((e) => e.includes('Missing Gemini commands dir'))).toBe(true);
    expect(result.warnings.some((w) => w.includes('Gemini rules file not found yet'))).toBe(true);
  });
});
