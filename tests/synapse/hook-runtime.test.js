'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  resolveHookRuntime,
  buildHookOutput,
} = require('../../.aexos-core/core/synapse/runtime/hook-runtime');

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'hook-runtime-'));
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

describe('hook-runtime', () => {
  it('returns null when cwd is missing', () => {
    expect(resolveHookRuntime({})).toBeNull();
    expect(resolveHookRuntime()).toBeNull();
  });

  it('returns null when .synapse folder does not exist', () => {
    const cwd = makeTempDir();
    try {
      expect(resolveHookRuntime({ cwd, sessionId: 'abc' })).toBeNull();
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('resolves runtime when required modules and .synapse exist', () => {
    const cwd = makeTempDir();
    try {
      fs.mkdirSync(path.join(cwd, '.synapse', 'sessions'), { recursive: true });

      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/session/session-manager.js'),
        "module.exports = { loadSession: () => ({ prompt_count: 7, id: 's-1' }), cleanStaleSessions: () => 0 };",
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/engine.js'),
        [
          'class SynapseEngine {',
          '  constructor(synapsePath, config) {',
          '    this.synapsePath = synapsePath;',
          '    this.config = config;',
          '  }',
          '}',
          'module.exports = { SynapseEngine };',
        ].join('\n'),
      );

      const result = resolveHookRuntime({ cwd, sessionId: 's-1' });
      expect(result).toBeTruthy();
      expect(result.session).toEqual({ prompt_count: 7, id: 's-1' });
      expect(result.engine).toBeTruthy();
      expect(result.engine.synapsePath).toBe(path.join(cwd, '.synapse'));
      // No manifest file in this fixture — parseManifest degrades to an empty
      // routing table rather than being omitted entirely.
      expect(result.engine.config).toEqual({
        synapse: {},
        manifest: { devmode: false, globalExclude: [], domains: {} },
      });
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('parses .synapse/manifest and passes it to SynapseEngine', () => {
    const cwd = makeTempDir();
    try {
      fs.mkdirSync(path.join(cwd, '.synapse', 'sessions'), { recursive: true });

      // The manifest is KEY=VALUE (CARL-compatible), not YAML.
      writeFile(
        path.join(cwd, '.synapse', 'manifest'),
        [
          '# comment line',
          'DEVMODE=false',
          'CONSTITUTION_STATE=active',
          'CONSTITUTION_NON_NEGOTIABLE=true',
          'AGENT_DEV_STATE=active',
          'AGENT_DEV_AGENT_TRIGGER=dev',
          'AGENT_UX_STATE=active',
          'AGENT_UX_AGENT_TRIGGER=ux-design-expert',
        ].join('\n'),
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/session/session-manager.js'),
        "module.exports = { loadSession: () => ({ prompt_count: 7, id: 's-1' }), cleanStaleSessions: () => 0 };",
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/engine.js'),
        [
          'class SynapseEngine {',
          '  constructor(synapsePath, config) {',
          '    this.synapsePath = synapsePath;',
          '    this.config = config;',
          '  }',
          '}',
          'module.exports = { SynapseEngine };',
        ].join('\n'),
      );

      const result = resolveHookRuntime({ cwd, sessionId: 's-1' });

      expect(result).toBeTruthy();
      const { manifest } = result.engine.config;

      // Fails against the pre-fix runtime: `manifest` was never passed, so
      // engine.js resolved `manifest: {}` and every manifest-driven layer was
      // inert regardless of what .synapse/manifest contained.
      expect(manifest).toBeTruthy();

      // L2 resolves its domain via agentTrigger — without this the layer is inert.
      expect(manifest.domains.AGENT_DEV).toEqual({
        file: 'agent-dev',
        state: 'active',
        agentTrigger: 'dev',
      });

      // AGENT_UX proves the manifest is load-bearing: the L2 fallback path
      // (`agent-${agentId}`) would look for a nonexistent
      // `agent-ux-design-expert` file.
      expect(manifest.domains.AGENT_UX.agentTrigger).toBe('ux-design-expert');
      expect(manifest.domains.AGENT_UX.file).toBe('agent-ux');

      expect(manifest.domains.CONSTITUTION.nonNegotiable).toBe(true);
      expect(manifest.devmode).toBe(false);
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('passes synapse config from core-config.yaml to SynapseEngine', () => {
    const cwd = makeTempDir();
    try {
      fs.mkdirSync(path.join(cwd, '.synapse', 'sessions'), { recursive: true });

      writeFile(
        path.join(cwd, '.aexos-core/core-config.yaml'),
        [
          'synapse:',
          '  pipelineTimeoutMs: 444',
          '  session:',
          '    staleTTLHours: 24',
        ].join('\n'),
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/session/session-manager.js'),
        "module.exports = { loadSession: () => ({ prompt_count: 7, id: 's-1' }), cleanStaleSessions: () => 0 };",
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/engine.js'),
        [
          'class SynapseEngine {',
          '  constructor(synapsePath, config) {',
          '    this.synapsePath = synapsePath;',
          '    this.config = config;',
          '  }',
          '}',
          'module.exports = { SynapseEngine };',
        ].join('\n'),
      );

      const result = resolveHookRuntime({ cwd, sessionId: 's-1' });

      expect(result).toBeTruthy();
      expect(result.engine.config.synapse.pipelineTimeoutMs).toBe(444);
      expect(result.engine.config.synapse.session.staleTTLHours).toBe(24);
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('calls cleanStaleSessions on first prompt (prompt_count === 0)', () => {
    const cwd = makeTempDir();
    try {
      fs.mkdirSync(path.join(cwd, '.synapse', 'sessions'), { recursive: true });

      // Mock session-manager with prompt_count: 0 and trackable cleanStaleSessions
      const cleanupCalled = false;
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/session/session-manager.js'),
        [
          'let called = false;',
          'module.exports = {',
          "  loadSession: () => ({ prompt_count: 0, id: 'new-session' }),",
          '  cleanStaleSessions: (dir, ttl) => { called = true; return 0; },',
          '  _wasCalled: () => called,',
          '};',
        ].join('\n'),
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/engine.js'),
        [
          'class SynapseEngine { constructor(sp) { this.synapsePath = sp; } }',
          'module.exports = { SynapseEngine };',
        ].join('\n'),
      );

      // Clear require cache for the mock
      const smPath = path.join(cwd, '.aexos-core', 'core', 'synapse', 'session', 'session-manager.js');
      const engPath = path.join(cwd, '.aexos-core', 'core', 'synapse', 'engine.js');
      delete require.cache[require.resolve(smPath)];
      delete require.cache[require.resolve(engPath)];

      const result = resolveHookRuntime({ cwd, sessionId: 'new-session' });
      expect(result).toBeTruthy();

      // Verify cleanup was called
      const sm = require(smPath);
      expect(sm._wasCalled()).toBe(true);

      // Clean require cache
      delete require.cache[require.resolve(smPath)];
      delete require.cache[require.resolve(engPath)];
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('does NOT call cleanStaleSessions when prompt_count > 0', () => {
    const cwd = makeTempDir();
    try {
      fs.mkdirSync(path.join(cwd, '.synapse', 'sessions'), { recursive: true });

      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/session/session-manager.js'),
        [
          'let called = false;',
          'module.exports = {',
          "  loadSession: () => ({ prompt_count: 5, id: 'existing' }),",
          '  cleanStaleSessions: () => { called = true; return 0; },',
          '  _wasCalled: () => called,',
          '};',
        ].join('\n'),
      );
      writeFile(
        path.join(cwd, '.aexos-core/core/synapse/engine.js'),
        [
          'class SynapseEngine { constructor(sp) { this.synapsePath = sp; } }',
          'module.exports = { SynapseEngine };',
        ].join('\n'),
      );

      const smPath = path.join(cwd, '.aexos-core', 'core', 'synapse', 'session', 'session-manager.js');
      const engPath = path.join(cwd, '.aexos-core', 'core', 'synapse', 'engine.js');
      delete require.cache[require.resolve(smPath)];
      delete require.cache[require.resolve(engPath)];

      const result = resolveHookRuntime({ cwd, sessionId: 'existing' });
      expect(result).toBeTruthy();

      const sm = require(smPath);
      expect(sm._wasCalled()).toBe(false);

      delete require.cache[require.resolve(smPath)];
      delete require.cache[require.resolve(engPath)];
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  });

  it('builds normalized hook output for xml and falsy values', () => {
    expect(buildHookOutput('<xml/>')).toEqual({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: '<xml/>',
      },
    });
    expect(buildHookOutput('')).toEqual({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: '',
      },
    });
    expect(buildHookOutput(null)).toEqual({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: '',
      },
    });
  });
});
