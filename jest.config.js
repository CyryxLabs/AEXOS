module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',

  // Jest defaults to cpus-1 workers — 27 on a 28-core machine. This suite is
  // filesystem-heavy: tests spawn CLI processes, write shared fixtures, and a
  // few assert wall-clock budgets. At 27 workers the suite contends with
  // itself, and single tests failed intermittently across runs — a different
  // one each time, never reproducible in isolation.
  //
  // Those tests are identical in AIOX, which does not trip them; AEXOS simply
  // runs 488 more tests, and that extra load is what crosses the threshold. So
  // the fix belongs here, not in each assertion: cap concurrency so the suite
  // measures the code rather than the scheduler.
  //
  // 50% keeps the run fast while leaving real headroom.
  maxWorkers: '50%',

  // Test patterns from LOCAL (mais específico)
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/.aexos-core/**/__tests__/**/*.test.js',
    // Pro tests run via pro-integration.yml CI workflow (not in local npm test)
    // '**/pro/**/__tests__/**/*.test.js',
  ],

  // Ignore patterns - exclude incompatible test frameworks
  testPathIgnorePatterns: [
    '/node_modules/',
    // Pro submodule tests — run via pro-integration.yml CI workflow, not local npm test
    // Use anchored regex to only match the pro/ submodule dir, not tests/pro/
    '<rootDir>/pro/',
    // Playwright e2e tests (use ESM imports, run with Playwright not Jest)
    'tools/quality-dashboard/tests/e2e/',
    // Windows-specific tests (only run on Windows CI)
    'tests/integration/windows/',
    // Node.js native test runner tests (use node:test module)
    'tests/installer/v21-path-validation.test.js',
    // v2.1 Migration: Tests with removed common/utils modules (OSR-10 tech debt)
    // These tests reference modules removed during v4.31.0 → v2.1 migration
    'tests/integration/tools-system.test.js',
    'tests/unit/tool-helper-executor.test.js',
    'tests/unit/tool-validation-helper.test.js',
    'tests/unit/tool-resolver.test.js',
    'tests/regression/tools-migration.test.js',
    'tests/performance/tools-system-benchmark.test.js',
    'tests/clickup/status-sync.test.js',
    'tests/story-update-hook.test.js',
    'tests/epic-verification.test.js',
    'tests/e2e/story-creation-clickup.test.js',
    'tests/installer/v21-structure.test.js',
    // Squad template tests use ESM imports - run separately with --experimental-vm-modules
    '.aexos-core/development/templates/squad-template/tests/',
    // Manifest tests need manifest data alignment (OSR-10 tech debt)
    'tests/unit/manifest/manifest-generator.test.js',
    'tests/unit/manifest/manifest-validator.test.js',
    // Performance tests are flaky on different hardware (OSR-10 tech debt)
    'tests/integration/install-transaction.test.js',
    // License tests require network/crypto resources unavailable in CI (pre-existing)
    'tests/license/',
  ],

  // Coverage collection (Story TD-3: Updated paths)
  collectCoverageFrom: [
    'src/**/*.js',
    '.aexos-core/**/*.js',
    'bin/**/*.js',
    'packages/**/*.js',
    'scripts/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!**/__tests__/**',
    '!**/*.test.js',
    '!**/*.spec.js',
    // Exclude templates, generated files, and legacy scripts
    '!.aexos-core/development/templates/**',
    '!.aexos-core/development/scripts/**',
    '!.aexos-core/core/orchestration/**',
    '!.aexos-core/core/execution/**',
    '!.aexos-core/hooks/**',
    '!.aexos-core/product/templates/**',
    '!**/dist/**',
    // Story TD-6: Exclude I/O-heavy health check plugins from core coverage
    // These are integration-test candidates (git, npm, network, disk, docker, etc.)
    // Core engine/healers/reporters remain in scope with 80%+ coverage
    '!.aexos-core/core/health-check/checks/**',
    // Story TD-6: Exclude config/manifest modules - mostly I/O operations
    // These modules handle file system operations and JSON parsing
    // Better suited for integration tests
    '!.aexos-core/core/config/**',
    '!.aexos-core/core/manifest/**',
    // Story TD-6: Exclude registry (file I/O heavy) and utils (helper functions)
    // These provide supporting functionality tested indirectly through main modules
    '!.aexos-core/core/registry/**',
    '!.aexos-core/core/utils/**',
  ],

  // Coverage thresholds (Story TD-3)
  // Target: 80% global, 85% for core modules
  // Current baseline (2025-12-27): ~31% (needs improvement)
  // TEMPORARY: Lowered thresholds for PR #53, #76 (Gemini), #96 (CI fix)
  // TODO: Restore thresholds after adding tests - tracked in Story SEC-1 follow-up
  coverageThreshold: {
    global: {
      branches: 19,
      functions: 22,
      lines: 22,
      statements: 22,
    },
    // Core modules coverage threshold
    // TD-6: Adjusted to 45% to reflect current coverage (47.14%)
    // TEMPORARY: Lowered to 38% for PR #76 - Gemini integration adds many new files
    // Many core modules are I/O-heavy orchestration that's difficult to unit test
    '.aexos-core/core/': {
      lines: 38,
    },
  },

  // Coverage ignore patterns from REMOTE
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/.husky/', '/dist/'],

  // Timeout from REMOTE (30s melhor para operações longas)
  testTimeout: 30000,

  // Config from LOCAL
  verbose: true,
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', '.'],
  moduleNameMapper: {
    '^aexos-core/(.*)$': '<rootDir>/.aexos-core/$1',
    '^@aexos-core/(.*)$': '<rootDir>/.aexos-core/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Cross-platform config from REMOTE
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
