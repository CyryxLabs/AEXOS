// PRO-UX.1 — bridges the license-server error envelope into a canonical
// CYRYXError, using the Pro-specific registry with graceful fallback.
//
// 3-tier message fallback: envelope.message_pt → registry.userMessage →
// envelope.message (server EN technical). Envelopes without the PRO-16 fields
// (older server) still produce a valid CYRYXError via the registry.

const { CYRYXError, defaultErrorRegistry } = require('../../../.aexos-core/core/errors');
const { proErrorRegistry } = require('../../../.aexos-core/core/errors/pro-error-registry');

const DEFAULT_CODE = 'AEXOS_UNKNOWN_ERROR';

/**
 * @param {object} envelope - { error: { code, message, message_pt?, recovery_hint?, support_code?, details? } }
 * @param {object} [options] - { httpStatus?: number }
 * @returns {CYRYXError}
 */
function parseEnvelopeToCYRYXError(envelope, options = {}) {
  const httpStatus = options.httpStatus;
  const errorBody = envelope && typeof envelope === 'object' ? envelope.error : null;

  if (!errorBody || typeof errorBody !== 'object' || !errorBody.code) {
    return new CYRYXError('Erro inesperado ao falar com o servidor.', {
      code: DEFAULT_CODE,
      metadata: { httpStatus, malformedEnvelope: true },
    });
  }

  const code = errorBody.code;

  // Tier lookup: Pro registry → default registry → unknown fallback.
  let definition = null;
  if (proErrorRegistry.has(code)) {
    definition = proErrorRegistry.lookup(code);
  } else if (defaultErrorRegistry.has(code)) {
    definition = defaultErrorRegistry.lookup(code);
  } else {
    definition = defaultErrorRegistry.lookup(DEFAULT_CODE);
  }

  // 3-tier message fallback.
  const userMessage =
    errorBody.message_pt ||
    definition.userMessage ||
    errorBody.message ||
    'Erro inesperado.';

  return new CYRYXError(userMessage, {
    code,
    category: definition.category,
    severity: definition.severity,
    retryable: definition.retryable,
    recovery: definition.recovery,
    exitCode: definition.exitCode,
    userMessage,
    metadata: {
      support_code: errorBody.support_code,
      recovery_hint: errorBody.recovery_hint,
      serverMessage: errorBody.message,
      serverDetails: errorBody.details,
      httpStatus,
    },
  });
}

module.exports = { parseEnvelopeToCYRYXError };
