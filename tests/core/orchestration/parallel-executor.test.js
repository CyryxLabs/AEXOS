/**
 * Orchestration ParallelExecutor Tests — concurrency limiting (D11)
 *
 * Defect: "Declared parallelism does not limit concurrency".
 *
 * The regression these tests lock down: `executeParallel` used to build the
 * task list with `phases.map(async ...)`, which starts every phase immediately.
 * `_executeWithConcurrencyLimit` then received already-running promises, so the
 * `Promise.race` throttle gated nothing and `maxConcurrency` was cosmetic.
 *
 * A second defect in the same function was masking the first: the per-phase
 * descriptor was double-wrapped by `Promise.allSettled`, so `executeParallel`
 * read `result.result` off the outer envelope and pushed `undefined` for every
 * phase while reporting 100% success. Failures were invisible through the
 * public API, which is why the concurrency bug could not be observed there.
 *
 * NOTE: this is the orchestration ParallelExecutor (phase fan-out), NOT
 * `core/execution/parallel-executor.js`, which is dual-PROVIDER execution of a
 * single prompt. Different concept, different test file.
 *
 * @author @dev (Vulcan)
 */

const ParallelExecutor = require('../../../.aexos-core/core/orchestration/parallel-executor');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Builds an executePhase function that records the peak number of
 * simultaneously in-flight phases.
 */
function makeConcurrencyProbe({ durationMs = 25, failOn = [] } = {}) {
  const probe = {
    active: 0,
    peak: 0,
    started: [],
  };

  const executePhase = async (phase) => {
    probe.active += 1;
    probe.peak = Math.max(probe.peak, probe.active);
    probe.started.push(phase.phase);

    try {
      await delay(durationMs);
      if (failOn.includes(phase.phase)) {
        throw new Error(`phase-${phase.phase}-failed`);
      }
      return `result-${phase.phase}`;
    } finally {
      probe.active -= 1;
    }
  };

  return { probe, executePhase };
}

const makePhases = (count) => Array.from({ length: count }, (_, i) => ({ phase: i + 1 }));

describe('Orchestration ParallelExecutor — concurrency limit (D11)', () => {
  let executor;
  let logSpy;

  beforeEach(() => {
    executor = new ParallelExecutor();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('executeParallel', () => {
    it('never runs more phases at once than options.maxConcurrency', async () => {
      const { probe, executePhase } = makeConcurrencyProbe();
      const phases = makePhases(9);

      await executor.executeParallel(phases, executePhase, { maxConcurrency: 3 });

      // Fails against the old implementation: peak was 9 (all phases started
      // immediately by `phases.map(async ...)`).
      expect(probe.peak).toBeLessThanOrEqual(3);
      expect(probe.peak).toBeGreaterThan(1); // still parallel, not serialized
      expect(probe.started).toHaveLength(9);
    });

    it('honours the instance default set via setMaxConcurrency', async () => {
      const { probe, executePhase } = makeConcurrencyProbe();
      executor.setMaxConcurrency(2);

      await executor.executeParallel(makePhases(8), executePhase);

      expect(executor.maxConcurrency).toBe(2);
      expect(probe.peak).toBeLessThanOrEqual(2);
    });

    it('serializes execution when maxConcurrency is 1', async () => {
      const { probe, executePhase } = makeConcurrencyProbe({ durationMs: 5 });

      await executor.executeParallel(makePhases(5), executePhase, { maxConcurrency: 1 });

      expect(probe.peak).toBe(1);
    });

    it('caps concurrency at the number of phases when the limit is larger', async () => {
      const { probe, executePhase } = makeConcurrencyProbe({ durationMs: 5 });

      await executor.executeParallel(makePhases(2), executePhase, { maxConcurrency: 10 });

      expect(probe.peak).toBe(2);
    });

    it('returns real results in input order and reports failures', async () => {
      const { executePhase } = makeConcurrencyProbe({ durationMs: 5, failOn: [2] });

      const output = await executor.executeParallel(makePhases(4), executePhase, {
        maxConcurrency: 2,
      });

      // Fails against the old implementation twice over: results were
      // [undefined x 4] and the thrown phase was counted as a success.
      expect(output.results).toEqual(['result-1', 'result-3', 'result-4']);
      expect(output.errors).toEqual(['phase-2-failed']);
      expect(output.summary).toEqual({ total: 4, success: 3, failed: 1 });
    });

    it('records per-phase status in the running-task map', async () => {
      const { executePhase } = makeConcurrencyProbe({ durationMs: 5, failOn: [3] });

      await executor.executeParallel(makePhases(3), executePhase, { maxConcurrency: 2 });

      const status = executor.getStatus();
      expect(status[1].status).toBe('completed');
      expect(status[2].status).toBe('completed');
      expect(status[3].status).toBe('failed');
      expect(executor.hasRunningTasks()).toBe(false);
    });

    it('handles an empty phase list', async () => {
      const { probe, executePhase } = makeConcurrencyProbe();

      const output = await executor.executeParallel([], executePhase, { maxConcurrency: 3 });

      expect(output.results).toEqual([]);
      expect(output.errors).toEqual([]);
      expect(output.summary).toEqual({ total: 0, success: 0, failed: 0 });
      expect(probe.peak).toBe(0);
    });
  });

  describe('_executeWithConcurrencyLimit', () => {
    it('gates thunks and preserves input order', async () => {
      let active = 0;
      let peak = 0;

      const makeThunk = (value, ms) => async () => {
        active += 1;
        peak = Math.max(peak, active);
        await delay(ms);
        active -= 1;
        return value;
      };

      // Descending durations: completion order differs from input order.
      const thunks = [
        makeThunk('a', 30),
        makeThunk('b', 20),
        makeThunk('c', 10),
        makeThunk('d', 5),
      ];

      const settled = await executor._executeWithConcurrencyLimit(thunks, 2);

      expect(peak).toBeLessThanOrEqual(2);
      expect(settled.map((entry) => entry.value)).toEqual(['a', 'b', 'c', 'd']);
      expect(settled.every((entry) => entry.status === 'fulfilled')).toBe(true);
    });

    it('captures thunk rejections without aborting the pool', async () => {
      const thunks = [
        async () => 'ok-1',
        async () => {
          throw new Error('nope');
        },
        async () => 'ok-3',
      ];

      const settled = await executor._executeWithConcurrencyLimit(thunks, 2);

      expect(settled[0]).toEqual({ status: 'fulfilled', value: 'ok-1' });
      expect(settled[1].status).toBe('rejected');
      expect(settled[1].reason.message).toBe('nope');
      expect(settled[2]).toEqual({ status: 'fulfilled', value: 'ok-3' });
    });

    it('returns an empty array for an empty task list', async () => {
      await expect(executor._executeWithConcurrencyLimit([], 3)).resolves.toEqual([]);
    });
  });
});
