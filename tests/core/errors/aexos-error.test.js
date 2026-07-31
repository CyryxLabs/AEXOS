const {
  CYRYXError,
  DEFAULT_ERROR_CODE,
  ErrorCategory,
  ErrorSeverity,
  isCYRYXError,
  normalizeError,
} = require('../../../.aexos-core/core/errors');

describe('CYRYXError', () => {
  test('preserves Error compatibility and registry defaults', () => {
    const cause = new Error('root cause');
    const error = new CYRYXError('Could not load registry', {
      code: 'AEXOS_REGISTRY_LOAD_FAILED',
      metadata: {
        registry: {
          path: '.aexos-core/data/entity-registry.yaml',
        },
      },
      cause,
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('CYRYXError');
    expect(error.message).toBe('Could not load registry');
    expect(error.code).toBe('AEXOS_REGISTRY_LOAD_FAILED');
    expect(error.category).toBe(ErrorCategory.REGISTRY);
    expect(error.severity).toBe(ErrorSeverity.ERROR);
    expect(error.retryable).toBe(false);
    expect(error.cause).toBe(cause);
    expect(error.metadata).toEqual({
      registry: {
        path: '.aexos-core/data/entity-registry.yaml',
      },
    });
    expect(isCYRYXError(error)).toBe(true);
  });

  test('supports overrides and deep metadata merge', () => {
    const error = new CYRYXError('Filesystem degraded', {
      code: 'AEXOS_PERSISTENCE_DEGRADED',
      severity: ErrorSeverity.INFO,
      retryable: false,
      exitCode: 0,
      metadata: {
        persistence: {
          path: 'plan/build-state.json',
          mode: 'memory',
        },
      },
    });

    const normalized = normalizeError(error, {
      metadata: {
        persistence: {
          operation: 'saveState',
        },
      },
    });

    expect(normalized).not.toBe(error);
    expect(normalized.code).toBe('AEXOS_PERSISTENCE_DEGRADED');
    expect(normalized.severity).toBe(ErrorSeverity.INFO);
    expect(normalized.retryable).toBe(false);
    expect(normalized.exitCode).toBe(0);
    expect(normalized.metadata).toEqual({
      persistence: {
        path: 'plan/build-state.json',
        mode: 'memory',
        operation: 'saveState',
      },
    });
  });

  test('normalizes generic errors while preserving cause and own properties', () => {
    const generic = new Error('generic failure');
    generic.code = 'AEXOS_EXECUTION_FAILED';
    generic.detail = {
      phase: 'run',
    };

    const normalized = normalizeError(generic, {
      metadata: {
        execution: {
          storyId: 'CYRYX-ERROR.1',
        },
      },
    });

    expect(normalized).toBeInstanceOf(CYRYXError);
    expect(normalized.code).toBe('AEXOS_EXECUTION_FAILED');
    expect(normalized.cause).toBe(generic);
    expect(normalized.metadata).toEqual({
      originalError: {
        name: 'Error',
        properties: {
          code: 'AEXOS_EXECUTION_FAILED',
          detail: {
            phase: 'run',
          },
        },
      },
      execution: {
        storyId: 'CYRYX-ERROR.1',
      },
    });
  });

  test('normalizes non-error thrown values', () => {
    const normalized = normalizeError('boom');

    expect(normalized).toBeInstanceOf(CYRYXError);
    expect(normalized.code).toBe(DEFAULT_ERROR_CODE);
    expect(normalized.message).toBe('boom');
    expect(normalized.metadata).toEqual({
      originalValue: {
        type: 'string',
      },
    });
  });
});
