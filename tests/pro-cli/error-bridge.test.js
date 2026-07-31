const { parseEnvelopeToCYRYXError } = require('../../packages/aexos-pro-cli/src/error-bridge');

describe('parseEnvelopeToCYRYXError (PRO-UX.1)', () => {
  it('full envelope with support_code → CYRYXError fully populated', () => {
    const envelope = {
      error: {
        code: 'SEAT_LIMIT_EXCEEDED',
        message: 'Seat limit exceeded. 3/3 seats in use.',
        message_pt: 'Opa! Você já está usando o Pro no número máximo de máquinas.',
        recovery_hint: 'contact_support_seat_reset',
        support_code: '20260520T193411Z-a1b2c3d4',
      },
    };
    const err = parseEnvelopeToCYRYXError(envelope, { httpStatus: 403 });
    expect(err.code).toBe('SEAT_LIMIT_EXCEEDED');
    expect(err.userMessage).toBe('Opa! Você já está usando o Pro no número máximo de máquinas.');
    expect(err.category).toBe('permission');
    expect(err.retryable).toBe(false);
    expect(err.metadata.support_code).toBe('20260520T193411Z-a1b2c3d4');
    expect(err.metadata.recovery_hint).toBe('contact_support_seat_reset');
    expect(err.metadata.httpStatus).toBe(403);
    expect(Array.isArray(err.recovery)).toBe(true);
  });

  it('legacy envelope (no PRO-16 fields) falls back to registry userMessage', () => {
    const envelope = { error: { code: 'SEAT_LIMIT_EXCEEDED', message: 'Seat limit exceeded.' } };
    const err = parseEnvelopeToCYRYXError(envelope);
    expect(err.code).toBe('SEAT_LIMIT_EXCEEDED');
    // No message_pt → registry userMessage (PT-BR) used.
    expect(err.userMessage).toContain('máquinas');
    expect(err.metadata.support_code).toBeUndefined();
  });

  it('3-tier fallback: message_pt > registry.userMessage > server message', () => {
    // Unknown code (not in pro/default registry) with message_pt present.
    const withPt = parseEnvelopeToCYRYXError({ error: { code: 'WHATEVER', message: 'EN', message_pt: 'PT' } });
    expect(withPt.userMessage).toBe('PT');
    // Unknown code, no message_pt → falls to registry default userMessage (not server EN), per lookup
    const noPt = parseEnvelopeToCYRYXError({ error: { code: 'WHATEVER', message: 'EN technical' } });
    expect(typeof noPt.userMessage).toBe('string');
    expect(noPt.userMessage.length).toBeGreaterThan(0);
  });

  it('unknown code → AEXOS_UNKNOWN_ERROR-style fallback (still valid CYRYXError)', () => {
    const err = parseEnvelopeToCYRYXError({ error: { code: 'FOO_BAR', message: 'x' } });
    expect(err.code).toBe('FOO_BAR'); // code preserved
    expect(err.isCYRYXError).toBe(true);
  });

  it('malformed envelope (null / {} / {error:null}) → safe default CYRYXError', () => {
    for (const bad of [null, {}, { error: null }, { error: {} }]) {
      const err = parseEnvelopeToCYRYXError(bad);
      expect(err.isCYRYXError).toBe(true);
      expect(err.code).toBe('AEXOS_UNKNOWN_ERROR');
    }
  });
});
