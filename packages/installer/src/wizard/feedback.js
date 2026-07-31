/**
 * Visual Feedback Helpers
 *
 * Spinners, progress bars, and status indicators using CYRYX Color System v4.0.4
 *
 * @module wizard/feedback
 */

const ora = require('ora');
const cliProgress = require('cli-progress');
const { colors, status } = require('../utils/aexos-colors');
const {
  renderBanner,
  renderRule,
  renderPanel,
  renderChip,
  renderRoster,
  renderSquads,
} = require('../utils/aexos-banner');
const { getCyryxCoreVersion } = require('../utils/package-paths');
const { t } = require('./i18n');

/**
 * Create and start a spinner with CYRYX styling
 *
 * @param {string} text - Spinner text
 * @param {Object} options - Spinner options
 * @returns {Object} Ora spinner instance
 */
function createSpinner(text, options = {}) {
  return ora({
    text,
    color: 'cyan',
    spinner: 'dots',
    ...options,
  });
}

/**
 * Show success message with checkmark
 *
 * @param {string} message - Success message
 */
function showSuccess(message) {
  console.log(status.success(message));
}

/**
 * Show error message with cross mark
 *
 * @param {string} message - Error message
 */
function showError(message) {
  console.log(status.error(message));
}

/**
 * Show warning message with warning symbol
 *
 * @param {string} message - Warning message
 */
function showWarning(message) {
  console.log(status.warning(message));
}

/**
 * Show info message
 *
 * @param {string} message - Info message
 */
function showInfo(message) {
  console.log(status.info(message));
}

/**
 * Show tip message
 *
 * @param {string} message - Tip message
 */
function showTip(message) {
  console.log(status.tip(message));
}

/**
 * Create progress bar with CYRYX styling
 *
 * @param {number} total - Total steps
 * @param {Object} options - Progress bar options
 * @returns {Object} Progress bar instance
 */
function createProgressBar(total, options = {}) {
  const progressBar = new cliProgress.SingleBar(
    {
      format:
        colors.primary('Progress |') +
        colors.tertiary('{bar}') +
        colors.primary('| {percentage}% | {value}/{total} | {task}'),
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
      ...options,
    },
    cliProgress.Presets.shades_classic,
  );

  progressBar.start(total, 0, { task: 'Initializing...' });
  return progressBar;
}

/**
 * Update progress bar
 *
 * @param {Object} progressBar - Progress bar instance
 * @param {number} current - Current step
 * @param {string} taskName - Current task name
 */
function updateProgress(progressBar, current, taskName) {
  progressBar.update(current, { task: taskName });
}

/**
 * Complete and hide progress bar
 *
 * @param {Object} progressBar - Progress bar instance
 */
function completeProgress(progressBar) {
  progressBar.stop();
}

/**
 * Show the welcome banner: AEXOS Monolith wordmark inside the container frame
 * (Cyryx Labs Design System v1.0).
 *
 * Delegates to the banner module, which pads from *visible* length rather than
 * raw string length. The previous implementation offset `padEnd` by magic
 * constants (+18/+24) to compensate for chalk's ANSI escapes, so the frame
 * overflowed by ~20 columns whenever colour was disabled (NO_COLOR, CI, pipes).
 */
function showWelcome() {
  let version = '5.3.0';
  try {
    version = getCyryxCoreVersion() || version;
  } catch (_e) {
    // Use default version
  }

  console.log('');
  console.log(renderBanner({ version }));
  console.log(colors.dim('   ❖ The command layer for AI-native builders'));

  // The roster is read from the installed agent definitions, so it shows what
  // this project actually has rather than a hardcoded list. Empty string when
  // the definitions are not reachable (fresh directory, pre-install) — the
  // welcome must not depend on it.
  const roster = renderRoster();
  if (roster) {
    console.log('');
    console.log(roster);
  }

  // Squads are listed separately and not expanded: they carry far more agents
  // than the core, and expanding them would bury the handles a user starts from.
  const squads = renderSquads();
  if (squads) {
    console.log('');
    console.log(squads);
  }

  console.log('');
}

/**
 * Show completion message with excitement
 */
function showCompletion() {
  console.log('');
  console.log(renderRule(t('installComplete'), { heavy: true }));
  console.log('');
  console.log('  ' + renderChip(t('readyToUse'), 'ok'));
  console.log('');
  console.log(
    renderPanel(t('quickStart'), [
      t('quickStartAgents'),
      t('quickStartStory'),
      t('quickStartHelp'),
    ]),
  );
  console.log('');
}

/**
 * Show section header
 *
 * @param {string} title - Section title
 */
function showSection(title) {
  console.log('');
  console.log(renderRule(title));
}

/**
 * Show cancellation message
 */
function showCancellation() {
  console.log('\n' + colors.warning(t('cancelled')));
  console.log(colors.info(t('tryAgain') + '\n'));
}

/**
 * Estimate time remaining for progress
 *
 * @param {number} current - Current step
 * @param {number} total - Total steps
 * @param {number} startTime - Start timestamp
 * @returns {string} Formatted time estimate
 */
function estimateTimeRemaining(current, total, startTime) {
  if (current === 0) return 'Calculating...';

  const elapsed = Date.now() - startTime;
  const avgTimePerStep = elapsed / current;
  const remaining = (total - current) * avgTimePerStep;

  const seconds = Math.ceil(remaining / 1000);

  if (seconds < 60) {
    return `~${seconds}s remaining`;
  }

  const minutes = Math.ceil(seconds / 60);
  return `~${minutes}m remaining`;
}

module.exports = {
  createSpinner,
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showTip,
  createProgressBar,
  updateProgress,
  completeProgress,
  showWelcome,
  showCompletion,
  showSection,
  showCancellation,
  estimateTimeRemaining,
};
