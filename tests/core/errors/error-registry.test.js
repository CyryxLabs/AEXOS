const {
  CORE_ERROR_DEFINITIONS,
  DEFAULT_ERROR_CODE,
  ErrorCategory,
  ErrorRegistry,
  ErrorSeverity,
  defaultErrorRegistry,
} = require('../../../.aexos-core/core/errors');

describe('ErrorRegistry', () => {
  test('default registry contains unique core definitions', () => {
    expect(defaultErrorRegistry.assertUnique()).toBe(true);
    expect(defaultErrorRegistry.size).toBe(CORE_ERROR_DEFINITIONS.length);
    expect(defaultErrorRegistry.has(DEFAULT_ERROR_CODE)).toBe(true);
  });

  test('lookup returns registered definitions', () => {
    const definition = defaultErrorRegistry.lookup('AEXOS_REGISTRY_LOAD_FAILED');

    expect(definition).toMatchObject({
      code: 'AEXOS_REGISTRY_LOAD_FAILED',
      category: ErrorCategory.REGISTRY,
      severity: ErrorSeverity.ERROR,
      retryable: false,
    });
  });

  test('lookup preserves unknown code with safe fallback metadata', () => {
    const definition = defaultErrorRegistry.lookup('AEXOS_NOT_REGISTERED');

    expect(definition).toMatchObject({
      code: 'AEXOS_NOT_REGISTERED',
      category: ErrorCategory.UNKNOWN,
      severity: ErrorSeverity.ERROR,
      metadata: {
        registry: {
          registered: false,
        },
      },
    });
  });

  test('constructor rejects duplicate codes', () => {
    expect(() => new ErrorRegistry([
      {
        code: 'AEXOS_DUPLICATE',
        category: ErrorCategory.EXECUTION,
        severity: ErrorSeverity.ERROR,
      },
      {
        code: 'AEXOS_DUPLICATE',
        category: ErrorCategory.EXECUTION,
        severity: ErrorSeverity.ERROR,
      },
    ])).toThrow(/Duplicate AEXOS error code/);
  });

  test('register validates category, severity, code, and exitCode', () => {
    expect(() => new ErrorRegistry([
      {
        code: 'invalid-code',
        category: ErrorCategory.EXECUTION,
        severity: ErrorSeverity.ERROR,
      },
    ])).toThrow(/Invalid AEXOS error code/);

    expect(() => new ErrorRegistry([
      {
        code: 'AEXOS_BAD_CATEGORY',
        category: 'bad',
        severity: ErrorSeverity.ERROR,
      },
    ])).toThrow(/Invalid error category/);

    expect(() => new ErrorRegistry([
      {
        code: 'AEXOS_BAD_SEVERITY',
        category: ErrorCategory.EXECUTION,
        severity: 'bad',
      },
    ])).toThrow(/Invalid error severity/);

    expect(() => new ErrorRegistry([
      {
        code: 'AEXOS_BAD_EXIT_CODE',
        category: ErrorCategory.EXECUTION,
        severity: ErrorSeverity.ERROR,
        exitCode: -1,
      },
    ])).toThrow(/Invalid exitCode/);
  });
});
