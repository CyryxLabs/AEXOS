#!/usr/bin/env node
/**
 * Generates the Claude surfaces for squad agents.
 *
 * The ide-sync system reads a single source — `.aexos-core/development/agents`
 * — so only the twelve core agents ever reach `.claude/`. The squads ship 52
 * more agents that were installed to disk but invisible to Claude: typing `/`
 * listed the core twelve and nothing else.
 *
 * This walks `squads/{squad}/agents/*.md` and writes, for each:
 *
 *   .claude/commands/AEXOS/squads/{squad}/{agent}.md      shim
 *   .claude/skills/AEXOS/squads/{squad}/{agent}/SKILL.md  activation payload
 *
 * Namespacing by squad is what makes this safe to run over every squad at
 * once — `content-lead` exists in more than one, and a flat layout would have
 * them silently overwrite each other.
 *
 * Generation is byte-idempotent: a file whose content has not changed is left
 * untouched, so re-running produces no diff.
 *
 * Usage:
 *   node scripts/sync-squad-agents.js            # write
 *   node scripts/sync-squad-agents.js --check    # fail if out of date
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SQUADS_DIR = path.join(ROOT, 'squads');
const COMMANDS_ROOT = path.join(ROOT, '.claude', 'commands', 'AEXOS', 'squads');
const SKILLS_ROOT = path.join(ROOT, '.claude', 'skills', 'AEXOS', 'squads');

const { parseAgentFile } = require('../.aexos-core/infrastructure/scripts/ide-sync/agent-parser');
const claudeCode = require('../.aexos-core/infrastructure/scripts/ide-sync/transformers/claude-code');

const CHECK = process.argv.includes('--check');

/** @returns {Array<{squad: string, dir: string}>} squads that ship agents */
function discoverSquads() {
  if (!fs.existsSync(SQUADS_DIR)) return [];
  return fs
    .readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => ({ squad: e.name, dir: path.join(SQUADS_DIR, e.name, 'agents') }))
    .filter((s) => fs.existsSync(s.dir));
}

/** Writes only when content differs, and reports which case it was. */
function writeIfChanged(file, content) {
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) {
    return 'unchanged';
  }
  if (!CHECK) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return 'changed';
}

const stats = { squads: 0, agents: 0, written: 0, unchanged: 0, failed: [] };
const expected = { commands: new Set(), skills: new Set() };

for (const { squad, dir } of discoverSquads()) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('test-'));
  if (!files.length) continue;
  stats.squads++;

  for (const file of files) {
    const sourcePath = path.join(dir, file);
    let agentData;
    try {
      agentData = parseAgentFile(sourcePath);
    } catch (error) {
      stats.failed.push(`${squad}/${file}: ${error.message}`);
      continue;
    }
    if (!agentData || !agentData.id) {
      stats.failed.push(`${squad}/${file}: sem id de agente`);
      continue;
    }

    // The squad tag is what drives the namespacing inside the transformer.
    agentData.squad = squad;
    agentData.sourcePath = path.relative(ROOT, sourcePath).split(path.sep).join('/');

    stats.agents++;

    const commandFile = path.join(COMMANDS_ROOT, squad, `${agentData.id}.md`);
    const skillFile = path.join(ROOT, '.claude', 'skills', claudeCode.getSkillRelativePath(agentData));
    expected.commands.add(commandFile);
    expected.skills.add(skillFile);

    for (const [file_, content] of [
      [commandFile, claudeCode.transformCommand(agentData)],
      [skillFile, claudeCode.transformSkill(agentData)],
    ]) {
      if (writeIfChanged(file_, content) === 'changed') stats.written++;
      else stats.unchanged++;
    }
  }
}

// Agents deleted from a squad must not leave their surfaces behind — a stale
// command still shows up in Claude's `/` list and activates a persona the
// squad no longer has.
const stale = [];
for (const [root, keep] of [
  [COMMANDS_ROOT, expected.commands],
  [SKILLS_ROOT, expected.skills],
]) {
  if (!fs.existsSync(root)) continue;
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.md') && !keep.has(full)) stale.push(full);
    }
  })(root);
}
if (stale.length && !CHECK) {
  for (const file of stale) fs.rmSync(file);
}

const label = CHECK ? '[check] ' : '';
console.log(`${label}squads: ${stats.squads}  agentes: ${stats.agents}`);
console.log(`${label}arquivos escritos: ${stats.written}  inalterados: ${stats.unchanged}`);
if (stale.length) console.log(`${label}obsoletos removidos: ${stale.length}`);
if (stats.failed.length) {
  console.log(`\nFALHAS (${stats.failed.length}):`);
  stats.failed.forEach((f) => console.log(`  ${f}`));
}

if (stats.failed.length) process.exit(1);
if (CHECK && (stats.written || stale.length)) {
  console.log('\nSurfaces de squad desatualizadas. Rode: node scripts/sync-squad-agents.js');
  process.exit(1);
}
