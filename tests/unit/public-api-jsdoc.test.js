'use strict';

const fs = require('fs');
const path = require('path');

const CASES = [
  ['.aexos-core/cli/commands/sdc/index.js', 'createSdcCommand'],
  ['.aexos-core/cli/commands/wave/index.js', 'createWaveCommand'],
  ['.aexos-core/core/permissions/path-guard.js', 'isWriteAllowed'],
  ['.aexos-core/core/permissions/path-guard.js', 'getDenyList'],
  ['.aexos-core/core/synapse/engine.js', 'resolvePipelineTimeoutMs'],
  ['.aexos-core/core/orchestration/terminal-spawner.js', 'validateArgs'],
  ['.aexos-core/core/sdc/dispatch-adapter.js', 'createDispatchAdapter'],
  ['.aexos-core/core/sdc/index.js', 'initFullSdc'],
  ['.aexos-core/core/sdc/index.js', 'verifyAndMaybeMark'],
  ['.aexos-core/core/sdc/phase-verify.js', 'verifyPhase'],
  ['.aexos-core/core/sdc/progress.js', 'saveJson'],
  ['.aexos-core/core/sdc/wave-run.js', 'refreshStoryStatuses'],
  ['.aexos-core/core/sdc/wave-run.js', 'nextOpenBatch'],
  ['.aexos-core/core/sdc/wave-run.js', 'advanceWave'],
  ['.aexos-core/core/sdc/wave-run.js', 'runWaveBatch'],
  ['.aexos-core/core/sdc/story-meta.js', 'extractQaVerdict'],
  ['.aexos-core/core/sdc/story-meta.js', 'extractQaEvidence'],
  ['.aexos-core/core/sdc/story-meta.js', 'resolveQaEvidence'],
  ['.aexos-core/core/sdc/progress.js', 'markPhase'],
  ['.aexos-core/core/permissions/dispatch-governance.js', 'validateBudgetCeiling'],
  ['.aexos-core/core/permissions/dispatch-governance.js', 'scanAutomatedIntent'],
  ['.aexos-core/core/permissions/dispatch-governance.js', 'validateStoryBinding'],
  ['.aexos-core/core/permissions/dispatch-governance.js', 'assertDispatchGovernance'],
  ['.aexos-core/infrastructure/scripts/pre-dispatch-guard.js', 'loadContext'],
  ['.aexos-core/infrastructure/scripts/pre-dispatch-guard.js', 'run'],
  ['.aexos-core/infrastructure/scripts/pre-dispatch-guard.js', 'main'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'parseArgs'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'resolveSibling'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'indexCoreTree'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'comparePair'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'classifyThreeWay'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'classifyByWave'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'scanTreeDenylist'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'formatReport'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'buildResult'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'main'],
  ['.aexos-core/infrastructure/scripts/framework-3way-diff.js', 'isOssWins'],
];

const SYMBOL_CASES = [
  [
    '.aexos-core/core/permissions/dispatch-governance.js',
    'class DispatchGovernanceError',
    '@class',
  ],
  [
    '.aexos-core/core/permissions/dispatch-governance.js',
    'const IMPLEMENTATION_TASK_PATTERN',
    '@type',
  ],
  [
    '.aexos-core/core/permissions/dispatch-governance.js',
    'const INTENT_PATTERNS',
    '@type',
  ],
  [
    '.aexos-core/infrastructure/scripts/framework-3way-diff.js',
    'const OSS_WINS_PREFIXES',
    '@type',
  ],
  [
    '.aexos-core/infrastructure/scripts/framework-3way-diff.js',
    'const WAVE_PREFIXES',
    '@type',
  ],
];

describe('Core Super Update public API contracts', () => {
  test.each(CASES)('%s documents exported function %s with JSDoc', (file, name) => {
    const source = fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');
    const declaration = source.indexOf(`function ${name}(`);
    expect(declaration).toBeGreaterThan(0);
    const prefix = source.slice(Math.max(0, declaration - 1200), declaration);
    const start = prefix.lastIndexOf('/**');
    const end = prefix.lastIndexOf('*/');
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const jsdoc = prefix.slice(start, end + 2);
    expect(jsdoc).toMatch(/@returns?/);
  });

  test.each(SYMBOL_CASES)(
    '%s documents exported symbol %s with JSDoc',
    (file, declarationText, requiredTag) => {
      const source = fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');
      const declaration = source.indexOf(declarationText);
      expect(declaration).toBeGreaterThan(0);
      const prefix = source.slice(Math.max(0, declaration - 800), declaration);
      const start = prefix.lastIndexOf('/**');
      const end = prefix.lastIndexOf('*/');
      expect(start).toBeGreaterThan(-1);
      expect(end).toBeGreaterThan(start);
      expect(prefix.slice(start, end + 2)).toContain(requiredTag);
    },
  );
});
