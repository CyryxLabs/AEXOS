#!/usr/bin/env node
'use strict';

/**
 * Claude Code PreToolUse hook for Constitution Article II.
 *
 * Blocks remote Git/GitHub publication commands unless the active agent is
 * @devops. The hook is intentionally dependency-free so it can run from a
 * freshly installed Cyryx Labs package on macOS, Linux, WSL, and Windows.
 */

const fs = require('fs');

const REMOTE_OPERATION_PATTERNS = [
  {
    pattern: /\bgit\s+push\b/i,
    operation: 'git push',
  },
  {
    pattern: /\bgh\s+pr\s+create\b/i,
    operation: 'gh pr create',
  },
  {
    pattern: /\bgh\s+pr\s+merge\b/i,
    operation: 'gh pr merge',
  },
];

const DEVOPS_AGENT_ALIASES = new Set([
  'devops',
  '@devops',
  'github-devops',
  '@github-devops',
  'aexos-devops',
  '@aexos-devops',
]);

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function parseInput(rawInput) {
  try {
    return JSON.parse(rawInput || '{}');
  } catch {
    return null;
  }
}

function normalizeCommand(command) {
  return String(command || '')
    .replace(/\\\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCommandScopedAgent(command) {
  const match = String(command || '').match(
    /(?:^|\s)(?:export\s+)?(?:AEXOS_ACTIVE_AGENT|AEXOS_AGENT|ACTIVE_AGENT|CLAUDE_AGENT_NAME)=["']?(@?[a-z0-9-]+)["']?/i,
  );

  return match ? match[1].toLowerCase() : '';
}

function getActiveAgent(command) {
  const candidates = [
    process.env.AEXOS_ACTIVE_AGENT,
    process.env.AEXOS_AGENT,
    process.env.ACTIVE_AGENT,
    process.env.CLAUDE_AGENT_NAME,
    process.env.CLAUDE_CODE_AGENT,
    process.env.AEXOS_CURRENT_AGENT,
    getCommandScopedAgent(command),
  ];

  return String(candidates.find(Boolean) || '').toLowerCase();
}

function isDevOpsAgent(agent) {
  return DEVOPS_AGENT_ALIASES.has(String(agent || '').toLowerCase());
}

function findRemoteOperation(command) {
  const normalized = normalizeCommand(command);
  return REMOTE_OPERATION_PATTERNS.find(({ pattern }) => pattern.test(normalized)) || null;
}

function emitDecision(permissionDecision, permissionDecisionReason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision,
      permissionDecisionReason,
    },
  }));
}

function main() {
  const rawInput = readStdin();
  const input = parseInput(rawInput);

  if (!input) {
    emitDecision(
      'deny',
      'Hook failed to parse PreToolUse input. Blocking remote Git operation for safety; retry via @devops.',
    );
    return;
  }

  const command = input?.tool_input?.command || '';
  const operation = findRemoteOperation(command);

  if (!operation) {
    return;
  }

  const activeAgent = getActiveAgent(command);
  if (isDevOpsAgent(activeAgent)) {
    return;
  }

  emitDecision(
    'deny',
    `${operation.operation} is exclusive to @devops (Constitution Article II). Current agent: ${activeAgent || '@unknown'}.`,
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  DEVOPS_AGENT_ALIASES,
  REMOTE_OPERATION_PATTERNS,
  findRemoteOperation,
  getActiveAgent,
  isDevOpsAgent,
  normalizeCommand,
};
