const { getCacheCleanCommands, planRecoveryAction } = require('../../packages/aexos-pro-cli/src/recovery-actions');

describe('getCacheCleanCommands (PRO-UX.2 — OS-aware)', () => {
  it('win32 returns PowerShell-compatible commands', () => {
    const cmds = getCacheCleanCommands('win32');
    expect(cmds.length).toBeGreaterThan(0);
    expect(cmds.join('\n')).toContain('Remove-Item');
    expect(cmds.join('\n')).toContain('Get-ChildItem');
    expect(cmds.join('\n')).not.toContain('rm -rf'); // no bash on Windows
  });

  it('darwin returns bash-compatible commands', () => {
    const cmds = getCacheCleanCommands('darwin');
    expect(cmds.join('\n')).toContain('rm -rf');
    expect(cmds.join('\n')).not.toContain('Remove-Item');
  });

  it('linux returns bash-compatible commands', () => {
    const cmds = getCacheCleanCommands('linux');
    expect(cmds.join('\n')).toContain('rm -rf');
  });
});

describe('planRecoveryAction (PRO-UX.2)', () => {
  it('wait_and_retry → wait with default 300s', () => {
    expect(planRecoveryAction('wait_and_retry')).toEqual({ action: 'wait', waitSeconds: 300 });
  });

  it('retry_install_cache_clean → clean_cache with OS commands', () => {
    const plan = planRecoveryAction('retry_install_cache_clean', { platform: 'darwin' });
    expect(plan.action).toBe('clean_cache');
    expect(plan.commands.join('\n')).toContain('rm -rf');
  });

  it('contact_support_* → contact_support', () => {
    expect(planRecoveryAction('contact_support_seat_reset').action).toBe('contact_support');
    expect(planRecoveryAction('contact_support_grant').action).toBe('contact_support');
    expect(planRecoveryAction('contact_support_billing').action).toBe('contact_support');
  });

  it('unknown hint → none', () => {
    expect(planRecoveryAction('mystery').action).toBe('none');
    expect(planRecoveryAction(undefined).action).toBe('none');
  });
});
