// PRO-UX.2 — conditional recovery actions keyed by recovery_hint.
// OS-aware cache cleanup (PowerShell vs bash) — fixes the exact failure mode
// from the anchor incident (Robert ran bash `find/rm` in PowerShell).

/**
 * Returns the cache-cleanup commands appropriate for the current OS.
 * Windows → PowerShell; macOS/Linux → bash.
 * @param {string} [platform] - defaults to process.platform (injectable for tests)
 * @returns {string[]}
 */
function getCacheCleanCommands(platform = process.platform) {
  if (platform === 'win32') {
    return [
      'Get-ChildItem -Path . -Recurse -Filter "pro" -Directory -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match "node_modules\\\\@aexos-squads\\\\pro$" } | Remove-Item -Recurse -Force',
      'Remove-Item -Recurse -Force $env:USERPROFILE\\.npm\\_npx -ErrorAction SilentlyContinue',
    ];
  }
  // darwin / linux
  return [
    'find . -maxdepth 5 -path "*/node_modules/@aexos-squads/pro" -type d 2>/dev/null -exec rm -rf {} + 2>/dev/null',
    'rm -rf ~/.npm/_npx 2>/dev/null',
  ];
}

/**
 * Dispatches a recovery action based on recovery_hint.
 * Returns { action, commands?, waitSeconds? } describing what the CLI should do.
 * Pure/declarative — the CLI shell decides whether to auto-run or just print.
 *
 * @param {string} recoveryHint
 * @param {object} [context] - { platform?, waitSeconds? }
 */
function planRecoveryAction(recoveryHint, context = {}) {
  switch (recoveryHint) {
    case 'wait_and_retry':
      return { action: 'wait', waitSeconds: context.waitSeconds || 300 };
    case 'retry_install_cache_clean':
      return {
        action: 'clean_cache',
        commands: getCacheCleanCommands(context.platform),
      };
    case 'contact_support_seat_reset':
    case 'contact_support_grant':
    case 'contact_support_billing':
      return { action: 'contact_support' };
    case 'verify_email':
      return { action: 'verify_email' };
    case 'check_credentials':
      return { action: 'check_credentials' };
    default:
      return { action: 'none' };
  }
}

module.exports = { getCacheCleanCommands, planRecoveryAction };
