'use strict';

const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');
const requireFromRoot = (modulePath) => require(path.join(repoRoot, modulePath));

const IdeationEngine = requireFromRoot('.aexos-core/core/ideation/ideation-engine');
const { ContextInjector } = requireFromRoot('.aexos-core/core/execution/context-injector');
const { SubagentDispatcher } = requireFromRoot('.aexos-core/core/execution/subagent-dispatcher');
const { GotchasMemory } = requireFromRoot('.aexos-core/core/memory/gotchas-memory');
const gotchasMemoryModulePath = path.join(repoRoot, '.aexos-core/core/memory/gotchas-memory');

describe('GotchasMemory named export consumers', () => {
  it('instantiates IdeationEngine with the default GotchasMemory dependency', () => {
    const engine = new IdeationEngine();

    expect(engine.gotchasMemory).toBeInstanceOf(GotchasMemory);
  });

  it('instantiates ContextInjector with the default GotchasMemory dependency', () => {
    const injector = new ContextInjector();

    expect(injector.gotchasMemory).toBeInstanceOf(GotchasMemory);
  });

  it('instantiates SubagentDispatcher with the default GotchasMemory dependency', () => {
    const dispatcher = new SubagentDispatcher();

    expect(dispatcher.gotchasMemory).toBeInstanceOf(GotchasMemory);
  });

  it('exposes a load error when GotchasMemory named export is missing', () => {
    const previousDebug = process.env.AEXOS_DEBUG;
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    process.env.AEXOS_DEBUG = 'true';
    jest.resetModules();
    jest.doMock(gotchasMemoryModulePath, () => ({}));

    try {
      jest.isolateModules(() => {
        const MissingIdeationEngine = requireFromRoot('.aexos-core/core/ideation/ideation-engine');
        const { ContextInjector: MissingContextInjector } = requireFromRoot('.aexos-core/core/execution/context-injector');
        const { SubagentDispatcher: MissingSubagentDispatcher } = requireFromRoot(
          '.aexos-core/core/execution/subagent-dispatcher',
        );

        expect(new MissingIdeationEngine().gotchasMemory).toBeNull();
        expect(new MissingContextInjector().gotchasMemory).toBeNull();
        expect(new MissingSubagentDispatcher().gotchasMemory).toBeNull();
        expect(MissingIdeationEngine.gotchasMemoryLoadError.message).toContain('Missing named export GotchasMemory');
        expect(MissingContextInjector.gotchasMemoryLoadError.message).toContain('Missing named export GotchasMemory');
        expect(MissingSubagentDispatcher.gotchasMemoryLoadError.message).toContain('Missing named export GotchasMemory');
      });

      expect(warnSpy).toHaveBeenCalledTimes(3);
    } finally {
      jest.dontMock(gotchasMemoryModulePath);
      jest.resetModules();
      if (typeof previousDebug === 'undefined') {
        delete process.env.AEXOS_DEBUG;
      } else {
        process.env.AEXOS_DEBUG = previousDebug;
      }
      warnSpy.mockRestore();
    }
  });

  it('exposes a load error when GotchasMemory named export is not constructible', () => {
    const previousDebug = process.env.AEXOS_DEBUG;
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    process.env.AEXOS_DEBUG = 'true';
    jest.resetModules();
    jest.doMock(gotchasMemoryModulePath, () => ({ GotchasMemory: {} }));

    try {
      jest.isolateModules(() => {
        const InvalidIdeationEngine = requireFromRoot('.aexos-core/core/ideation/ideation-engine');
        const { ContextInjector: InvalidContextInjector } = requireFromRoot('.aexos-core/core/execution/context-injector');
        const { SubagentDispatcher: InvalidSubagentDispatcher } = requireFromRoot(
          '.aexos-core/core/execution/subagent-dispatcher',
        );

        expect(new InvalidIdeationEngine().gotchasMemory).toBeNull();
        expect(new InvalidContextInjector().gotchasMemory).toBeNull();
        expect(new InvalidSubagentDispatcher().gotchasMemory).toBeNull();
        expect(InvalidIdeationEngine.gotchasMemoryLoadError.message).toContain('to be constructible; got object');
        expect(InvalidContextInjector.gotchasMemoryLoadError.message).toContain('to be constructible; got object');
        expect(InvalidSubagentDispatcher.gotchasMemoryLoadError.message).toContain('to be constructible; got object');
      });

      expect(warnSpy).toHaveBeenCalledTimes(3);
    } finally {
      jest.dontMock(gotchasMemoryModulePath);
      jest.resetModules();
      if (typeof previousDebug === 'undefined') {
        delete process.env.AEXOS_DEBUG;
      } else {
        process.env.AEXOS_DEBUG = previousDebug;
      }
      warnSpy.mockRestore();
    }
  });
});
