#!/usr/bin/env node
'use strict';

/**
 * CLI: validate Claude Code hook integrity (AEX-0.4)
 *
 * The framework's enforcement layer lives in `.claude/hooks/`. Three of those
 * hooks shipped broken because no job ever executed them: two threw
 * SyntaxError at load and one resolved a directory that does not exist. The
 * git-push authority guard therefore emitted no decision and permitted every
 * push, silently violating Constitution Article II.
 *
 * Syntax checking alone would not have caught all of it — the SYNAPSE hook
 * fails by design in silence (`synapse-wrapper.cjs` discards stderr and exits
 * 0). This validator therefore asserts *behaviour*, not just parseability.
 *
 * Usage:
 *   node scripts/validate-hooks.js
 *   node scripts/validate-hooks.js --json
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — at least one check failed
 *   2 — validator could not run (missing settings, bad invocation)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const PROJECT_ROOT = process.cwd();
const HOOKS_DIR = path.join(PROJECT_ROOT, '.claude', 'hooks');
const SETTINGS_FILE = path.join(PROJECT_ROOT, '.claude', 'settings.json');

/** Agent id used to prove the authority guard still allows the authorised path. */
const AUTHORISED_AGENT = 'devops';

/** Env var names the guard accepts, most specific first. */
const AGENT_ENV_VARS = ['AEXOS_ACTIVE_AGENT', 'AEXOS_AGENT', 'ACTIVE_AGENT'];

/**
 * Build the remote-push command without embedding the literal trigger phrase,
 * so this file does not trip the very guard it exercises.
 */
const PUSH_COMMAND = ['git', 'pu' + 'sh', 'origin', 'main'].join(' ');

function listHooks(extension) {
  if (!fs.existsSync(HOOKS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(HOOKS_DIR)
    .filter((name) => name.endsWith(extension))
    .map((name) => path.join(HOOKS_DIR, name));
}

function relative(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join('/');
}

/** Every `.cjs` hook must parse. */
function checkNodeSyntax(results) {
  for (const file of listHooks('.cjs')) {
    const run = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    results.push({
      check: 'node-syntax',
      target: relative(file),
      ok: run.status === 0,
      detail: run.status === 0 ? null : (run.stderr || '').split('\n').find((l) => l.includes('Error')),
    });
  }
}

/** Every `.py` hook must compile, when a Python interpreter is available. */
function checkPythonSyntax(results) {
  const files = listHooks('.py');
  if (files.length === 0) {
    return;
  }

  const interpreter = ['python3', 'python'].find(
    (bin) => spawnSync(bin, ['--version'], { encoding: 'utf8' }).status === 0,
  );

  if (!interpreter) {
    results.push({
      check: 'python-syntax',
      target: '.claude/hooks/*.py',
      ok: true,
      skipped: true,
      detail: 'no Python interpreter available',
    });
    return;
  }

  for (const file of files) {
    const run = spawnSync(interpreter, ['-m', 'py_compile', file], { encoding: 'utf8' });
    results.push({
      check: 'python-syntax',
      target: relative(file),
      ok: run.status === 0,
      detail: run.status === 0 ? null : (run.stderr || '').trim().split('\n').pop(),
    });
  }
}

/** Every hook registered in settings.json must exist on disk. */
function checkRegisteredPaths(results) {
  if (!fs.existsSync(SETTINGS_FILE)) {
    results.push({
      check: 'settings-paths',
      target: '.claude/settings.json',
      ok: false,
      detail: 'settings file not found',
    });
    return;
  }

  let settings;
  try {
    settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  } catch (error) {
    results.push({
      check: 'settings-paths',
      target: '.claude/settings.json',
      ok: false,
      detail: `unparseable: ${error.message}`,
    });
    return;
  }

  const commands = [];
  for (const entries of Object.values(settings.hooks || {})) {
    for (const entry of entries || []) {
      for (const hook of entry.hooks || []) {
        if (hook.command) {
          commands.push(hook.command);
        }
      }
    }
  }

  for (const command of commands) {
    // Commands look like `node .claude/hooks/x.cjs` — take the first path-like token.
    const target = command.split(/\s+/).find((token) => token.includes('/') || token.includes('\\'));
    if (!target) {
      continue;
    }
    const resolved = path.resolve(PROJECT_ROOT, target);
    results.push({
      check: 'settings-paths',
      target,
      ok: fs.existsSync(resolved),
      detail: fs.existsSync(resolved) ? null : 'registered hook file does not exist',
    });
  }
}

function runHook(hookFile, payload, env = {}) {
  return spawnSync(process.execPath, [hookFile], {
    input: JSON.stringify(payload),
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
}

/**
 * The context engine must inject something. It fails silently by design, so an
 * empty stdout with exit 0 is indistinguishable from success without this.
 */
function checkContextInjection(results) {
  const hook = path.join(HOOKS_DIR, 'synapse-wrapper.cjs');
  if (!fs.existsSync(hook)) {
    return;
  }

  const run = runHook(hook, {
    prompt: 'validate hook integrity',
    session_id: 'hook-integrity-check',
    cwd: PROJECT_ROOT,
  });

  const bytes = (run.stdout || '').length;
  results.push({
    check: 'context-injection',
    target: 'UserPromptSubmit',
    ok: bytes > 0,
    detail: bytes > 0 ? `${bytes} bytes injected` : 'hook produced no output — context engine is inert',
  });
}

/**
 * Constitution Article II — remote-push authority is exclusive to @devops.
 * Asserted in both directions: denied without an agent, allowed for @devops.
 */
function checkAuthorityGuard(results) {
  const hook = path.join(HOOKS_DIR, 'enforce-git-push-authority.cjs');
  if (!fs.existsSync(hook)) {
    return;
  }

  const payload = { tool_name: 'Bash', tool_input: { command: PUSH_COMMAND } };

  const denied = runHook(hook, payload);
  let decision = null;
  try {
    decision = JSON.parse(denied.stdout).hookSpecificOutput.permissionDecision;
  } catch (_) {
    decision = null;
  }
  results.push({
    check: 'authority-guard',
    target: 'unauthenticated agent',
    ok: decision === 'deny',
    detail:
      decision === 'deny'
        ? 'denied (fail-closed)'
        : `expected deny, got ${decision === null ? 'no decision' : decision}`,
  });

  const env = {};
  for (const name of AGENT_ENV_VARS) {
    env[name] = AUTHORISED_AGENT;
  }
  const allowed = runHook(hook, payload, env);
  let allowedDecision = null;
  try {
    allowedDecision = JSON.parse(allowed.stdout).hookSpecificOutput.permissionDecision;
  } catch (_) {
    allowedDecision = null;
  }
  results.push({
    check: 'authority-guard',
    target: `@${AUTHORISED_AGENT}`,
    ok: allowedDecision !== 'deny',
    detail: allowedDecision === 'deny' ? 'authorised agent was denied' : 'allowed',
  });
}

function main(argv = process.argv.slice(2)) {
  const asJson = argv.includes('--json');
  const results = [];

  if (!fs.existsSync(HOOKS_DIR)) {
    console.error(`Error: hooks directory not found at ${relative(HOOKS_DIR)}`);
    process.exit(2);
  }

  checkNodeSyntax(results);
  checkPythonSyntax(results);
  checkRegisteredPaths(results);
  checkContextInjection(results);
  checkAuthorityGuard(results);

  const failed = results.filter((r) => !r.ok);

  if (asJson) {
    process.stdout.write(`${JSON.stringify({ ok: failed.length === 0, results }, null, 2)}\n`);
  } else {
    console.log('AEXOS Hook Integrity Validation');
    console.log(`Checks run: ${results.length}`);
    console.log('');
    for (const result of results) {
      const mark = result.skipped ? '−' : result.ok ? '✓' : '✗';
      const suffix = result.detail ? ` — ${result.detail}` : '';
      console.log(`  ${mark} [${result.check}] ${result.target}${suffix}`);
    }
    console.log('');
    if (failed.length === 0) {
      console.log('✅ All hook integrity checks passed.');
    } else {
      console.error(`❌ ${failed.length} check(s) failed.`);
      console.error('');
      console.error('The enforcement layer is not functioning. Reproduce locally with:');
      console.error('  npm run validate:hooks');
    }
  }

  process.exit(failed.length === 0 ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { main };
