// PRO-UX.2 — renders an CYRYXError (from error-bridge) as warm, actionable CLI
// output. Shows userMessage + numbered recovery steps + support_code (when
// present) + support link (only for contact_support_* hints) + a discreet
// technical footer. Writer is injectable for testability.

const SUPPORT_URL = 'https://suporte.cyryx.dev';

/**
 * @param {CYRYXError} err
 * @param {(line: string) => void} [write] - defaults to stderr writer
 */
function renderError(err, write) {
  const out = write || ((line) => process.stderr.write(line + '\n'));
  if (!err || typeof err !== 'object') {
    out('✗ Erro inesperado.');
    return;
  }
  const meta = (err && err.metadata) || {};
  const recovery = Array.isArray(err && err.recovery) ? err.recovery : [];
  const recoveryHint = meta.recovery_hint;
  const supportCode = meta.support_code;
  const httpStatus = meta.httpStatus;

  out(`✗ ${err.userMessage || err.message}`);

  if (recovery.length > 0) {
    out('');
    out('Para resolver:');
    recovery.forEach((step, i) => out(`  ${i + 1}. ${step}`));
  }

  if (supportCode) {
    out('');
    out(`Código de suporte: ${supportCode}`);
    if (typeof recoveryHint === 'string' && recoveryHint.startsWith('contact_support_')) {
      out(`Suporte: ${SUPPORT_URL}`);
    }
  }

  // Discreet technical footer for debugging — not the student-facing message.
  out('');
  const statusPart = httpStatus ? ` — HTTP ${httpStatus}` : '';
  out(`(${err.code}${statusPart})`);
}

module.exports = { renderError, SUPPORT_URL };
