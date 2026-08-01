/**
 * Parallel Executor - Executes multiple phases concurrently
 *
 * Handles parallel execution of workflow phases that don't have
 * dependencies on each other (e.g., phases 1-3 in brownfield discovery).
 *
 * @module core/orchestration/parallel-executor
 * @version 1.0.0
 */

const chalk = require('chalk');

/**
 * Manages parallel execution of workflow phases
 */
class ParallelExecutor {
  constructor() {
    this.maxConcurrency = 3; // Default max parallel executions
    this.runningTasks = new Map();
  }

  /**
   * Execute multiple phases in parallel
   * @param {Array<Object>} phases - Phases to execute
   * @param {Function} executePhase - Function to execute a single phase
   * @param {Object} options - Execution options
   * @returns {Promise<Object[]>} Results from all phases
   */
  async executeParallel(phases, executePhase, options = {}) {
    const maxConcurrency = options.maxConcurrency || this.maxConcurrency;
    const phaseList = Array.isArray(phases) ? phases : [];
    const results = [];
    const errors = [];

    console.log(chalk.yellow(`\n⚡ Executing ${phaseList.length} phases in parallel (max ${maxConcurrency} concurrent)`));

    // Build THUNKS, not promises. A thunk does not start work until it is
    // called, which is what allows _executeWithConcurrencyLimit to actually
    // gate how many phases run at the same time. Calling `phases.map(async ...)`
    // here would start every phase immediately and make the limit cosmetic.
    const tasks = phaseList.map((phase) => async () => {
      const phaseId = phase.phase || phase.step;
      this.runningTasks.set(phaseId, { status: 'running', startTime: Date.now() });

      try {
        const result = await executePhase(phase);
        this.runningTasks.set(phaseId, {
          status: 'completed',
          endTime: Date.now(),
          result,
        });
        return { phase: phaseId, status: 'fulfilled', result };
      } catch (error) {
        this.runningTasks.set(phaseId, {
          status: 'failed',
          endTime: Date.now(),
          error: error.message,
        });
        return { phase: phaseId, status: 'rejected', error: error.message };
      }
    });

    // Execute with concurrency limit (settled entries stay in input order)
    const settled = await this._executeWithConcurrencyLimit(tasks, maxConcurrency);

    // Process results
    for (let i = 0; i < settled.length; i++) {
      const entry = settled[i];
      const phase = phaseList[i];
      const phaseId = (phase && (phase.phase || phase.step)) || `index-${i}`;

      // Defensive: the thunk catches its own errors, so a rejected entry means
      // the executor itself failed (e.g. a non-Error throw escaping the catch).
      if (entry.status === 'rejected') {
        const message = entry.reason instanceof Error ? entry.reason.message : String(entry.reason);
        errors.push(message);
        console.log(chalk.red(`   ❌ Phase ${phaseId} failed: ${message}`));
        continue;
      }

      const outcome = entry.value;
      if (outcome.status === 'fulfilled') {
        results.push(outcome.result);
      } else {
        errors.push(outcome.error);
        console.log(chalk.red(`   ❌ Phase ${outcome.phase} failed: ${outcome.error}`));
      }
    }

    // Summary
    const successCount = results.length;
    const failCount = errors.length;
    console.log(chalk.gray(`   Completed: ${successCount} success, ${failCount} failed`));

    return {
      results,
      errors,
      summary: {
        total: phaseList.length,
        success: successCount,
        failed: failCount,
      },
    };
  }

  /**
   * Execute task thunks with a real concurrency limit.
   *
   * IMPORTANT: `tasks` MUST be thunks — functions that START the work when
   * called. A promise handed in here has already begun executing and cannot be
   * throttled by anything downstream; such entries are awaited and counted, but
   * they were never gated. This is the distinction that makes `maxConcurrency`
   * enforceable rather than decorative.
   *
   * Order is preserved: `results[i]` always corresponds to `tasks[i]`,
   * regardless of completion order.
   *
   * @param {Array<Function|Promise<*>|*>} tasks - Task thunks to execute
   * @param {number} limit - Maximum number of tasks running at once
   * @returns {Promise<Array<{status: string, value?: *, reason?: *}>>}
   *   Promise.allSettled-shaped entries, in input order
   * @private
   */
  async _executeWithConcurrencyLimit(tasks, limit) {
    const list = Array.isArray(tasks) ? tasks : Array.from(tasks || []);
    const results = new Array(list.length);

    if (list.length === 0) {
      return results;
    }

    const parsedLimit = Number.isFinite(limit) ? Math.floor(limit) : list.length;
    const poolSize = Math.min(Math.max(1, parsedLimit), list.length);

    let nextIndex = 0;

    // Worker loop: each worker pulls the next index off a shared cursor, so at
    // most `poolSize` tasks are in flight at any moment.
    const workerLoop = async () => {
      for (;;) {
        const index = nextIndex;
        nextIndex += 1;
        if (index >= list.length) return;

        const task = list[index];
        try {
          const value = typeof task === 'function' ? await task() : await task;
          results[index] = { status: 'fulfilled', value };
        } catch (error) {
          results[index] = { status: 'rejected', reason: error };
        }
      }
    };

    await Promise.all(Array.from({ length: poolSize }, () => workerLoop()));

    return results;
  }

  /**
   * Get status of running tasks
   * @returns {Object} Map of task statuses
   */
  getStatus() {
    const status = {};
    for (const [id, taskStatus] of this.runningTasks) {
      status[id] = { ...taskStatus };
      if (taskStatus.startTime && taskStatus.endTime) {
        status[id].duration = taskStatus.endTime - taskStatus.startTime;
      }
    }
    return status;
  }

  /**
   * Check if any tasks are still running
   * @returns {boolean} True if tasks are running
   */
  hasRunningTasks() {
    for (const [, status] of this.runningTasks) {
      if (status.status === 'running') {
        return true;
      }
    }
    return false;
  }

  /**
   * Wait for all running tasks to complete
   * @param {number} timeout - Maximum wait time in ms
   * @returns {Promise<void>}
   */
  async waitForCompletion(timeout = 300000) {
    const startTime = Date.now();

    while (this.hasRunningTasks()) {
      if (Date.now() - startTime > timeout) {
        throw new Error('Timeout waiting for parallel tasks to complete');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Cancel all running tasks
   * Note: This marks tasks as cancelled but cannot truly cancel async operations
   */
  cancelAll() {
    for (const [id, status] of this.runningTasks) {
      if (status.status === 'running') {
        this.runningTasks.set(id, {
          ...status,
          status: 'cancelled',
          cancelledAt: Date.now(),
        });
      }
    }
  }

  /**
   * Clear task history
   */
  clear() {
    this.runningTasks.clear();
  }

  /**
   * Set maximum concurrency
   * @param {number} max - Maximum concurrent executions
   */
  setMaxConcurrency(max) {
    this.maxConcurrency = Math.max(1, Math.min(10, max));
  }

  /**
   * Get execution summary
   * @returns {Object} Summary statistics
   */
  getSummary() {
    let completed = 0;
    let failed = 0;
    let running = 0;
    let totalDuration = 0;

    for (const [, status] of this.runningTasks) {
      switch (status.status) {
        case 'completed':
          completed++;
          if (status.startTime && status.endTime) {
            totalDuration += status.endTime - status.startTime;
          }
          break;
        case 'failed':
          failed++;
          break;
        case 'running':
          running++;
          break;
      }
    }

    return {
      total: this.runningTasks.size,
      completed,
      failed,
      running,
      averageDuration: completed > 0 ? Math.round(totalDuration / completed) : 0,
    };
  }
}

module.exports = ParallelExecutor;
