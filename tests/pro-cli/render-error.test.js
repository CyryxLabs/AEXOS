const { parseEnvelopeToCYRYXError } = require('../../packages/aexos-pro-cli/src/error-bridge');
const { renderError, SUPPORT_URL } = require('../../packages/aexos-pro-cli/src/render-error');

function capture(err) {
  const lines = [];
  renderError(err, (l) => lines.push(l));
  return lines.join('\n');
}

describe('renderError (PRO-UX.2)', () => {
  it('anchor case: SEAT_LIMIT_EXCEEDED renders warm message + steps + support_code + link', () => {
    const err = parseEnvelopeToCYRYXError({
      error: {
        code: 'SEAT_LIMIT_EXCEEDED',
        message: 'Seat limit exceeded.',
        message_pt: 'Opa! Você já está usando o Pro no número máximo de máquinas. Pega o código de suporte aqui embaixo e fala com a gente que a gente libera rapidinho.',
        recovery_hint: 'contact_support_seat_reset',
        support_code: '20260520T193411Z-a1b2c3d4',
      },
    }, { httpStatus: 403 });
    const out = capture(err);
    expect(out).toContain('✗ Opa! Você já está usando o Pro');
    expect(out).toContain('Para resolver:');
    expect(out).toContain('  1. ');
    expect(out).toContain('Código de suporte: 20260520T193411Z-a1b2c3d4');
    expect(out).toContain(`Suporte: ${SUPPORT_URL}`);
    expect(out).toContain('(SEAT_LIMIT_EXCEEDED — HTTP 403)');
  });

  it('RATE_LIMITED renders WITHOUT support link (not a contact_support hint)', () => {
    const err = parseEnvelopeToCYRYXError({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests',
        message_pt: 'Calma! Foram muitas tentativas em pouco tempo. Espera uns minutinhos e tenta de novo.',
        recovery_hint: 'wait_and_retry',
      },
    }, { httpStatus: 429 });
    const out = capture(err);
    expect(out).toContain('✗ Calma!');
    expect(out).not.toContain(SUPPORT_URL); // no support link for wait_and_retry
    expect(out).toContain('(RATE_LIMITED — HTTP 429)');
  });

  it('omits support_code block when absent (legacy envelope)', () => {
    const err = parseEnvelopeToCYRYXError({ error: { code: 'SEAT_LIMIT_EXCEEDED', message: 'x' } });
    const out = capture(err);
    expect(out).not.toContain('Código de suporte:');
  });
});
