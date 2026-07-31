#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

// summary: Sync local Codex skills for core AEXOS agents.

const {
  parseAllAgents,
  normalizeCommands,
  getVisibleCommands,
} = require('../ide-sync/agent-parser');

function getCodexHome() {
  return process.env.CODEX_HOME || path.join(os.homedir(), '.codex');
}

function getDefaultOptions() {
  const projectRoot = process.cwd();
  const envLocalDir = process.env.AEXOS_CODEX_LOCAL_SKILLS_DIR;
  const envGlobalDir = process.env.AEXOS_CODEX_GLOBAL_SKILLS_DIR;
  return {
    projectRoot,
    sourceDir: path.join(projectRoot, '.aexos-core', 'development', 'agents'),
    localSkillsDir: envLocalDir || path.join(projectRoot, '.codex', 'skills'),
    globalSkillsDir: envGlobalDir || path.join(getCodexHome(), 'skills'),
    global: false,
    globalOnly: false,
    dryRun: false,
    quiet: false,
  };
}

function trimText(text, max = 220) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 3).trim()}...`;
}

/**
 * Codex skill ids carry two prefixes because core agents are migrated across
 * the product rename. CANONICAL is the current namespace; LEGACY is the prior
 * one, kept as a redirect alias so existing references still resolve.
 *
 * The two values MUST be disjoint — neither may be a prefix of the other, or
 * the canonical test shadows the legacy test and both functions degrade into
 * no-ops. That is precisely what the rebrand find/replace caused: with a
 * single value, every generated skill was also classified as a legacy alias
 * carrying a full payload, which failed the `codex` compatibility contract.
 */
const CANONICAL_SKILL_PREFIX = 'aexos-';
const LEGACY_SKILL_PREFIX = 'cyryx-';

function getSkillId(agentId) {
  const id = String(agentId || '').trim();
  if (id.startsWith(CANONICAL_SKILL_PREFIX)) return id;
  if (id.startsWith(LEGACY_SKILL_PREFIX)) {
    return `${CANONICAL_SKILL_PREFIX}${id.slice(LEGACY_SKILL_PREFIX.length)}`;
  }
  return `${CANONICAL_SKILL_PREFIX}${id}`;
}

function getLegacySkillId(agentId) {
  const id = String(agentId || '').trim();
  if (!id) return `${LEGACY_SKILL_PREFIX}unknown`;
  if (id.startsWith(LEGACY_SKILL_PREFIX)) return id;
  if (id.startsWith(CANONICAL_SKILL_PREFIX)) {
    return `${LEGACY_SKILL_PREFIX}${id.slice(CANONICAL_SKILL_PREFIX.length)}`;
  }
  return `${LEGACY_SKILL_PREFIX}${id}`;
}

function buildSkillContent(agentData) {
  const agent = agentData.agent || {};
  const name = agent.name || agentData.id;
  const title = agent.title || 'AEXOS Agent';
  const whenToUse = trimText(agent.whenToUse || `Use @${agentData.id} for specialized tasks.`);

  const allCommands = normalizeCommands(agentData.commands || []);
  const quick = getVisibleCommands(allCommands, 'quick');
  const key = getVisibleCommands(allCommands, 'key');
  const commands = [...quick, ...key.filter(k => !quick.some(q => q.name === k.name))]
    .slice(0, 8)
    .map(c => `- \`*${c.name}\` - ${c.description || 'No description'}`)
    .join('\n');

  const skillName = getSkillId(agentData.id);
  const description = trimText(`${title} (${name}). ${whenToUse}`, 180);

  return `---
name: ${skillName}
description: ${description}
---

# AEXOS ${title} Activator

## When To Use
${whenToUse}

## Activation Protocol
1. Load \`.aexos-core/development/agents/${agentData.filename}\` as source of truth (fallback: \`.codex/agents/${agentData.filename}\`).
2. Adopt this agent persona and command system.
3. Generate greeting via \`node .aexos-core/development/scripts/generate-greeting.js ${agentData.id}\` and show it first.
4. Stay in this persona until the user asks to switch or exit.

## Starter Commands
${commands || '- `*help` - List available commands'}

## Non-Negotiables
- Follow \`.aexos-core/constitution.md\`.
- Execute workflows/tasks only from declared dependencies.
- Do not invent requirements outside the project artifacts.
`;
}

function buildSkillPlan(agents, skillsDir) {
  return agents
    .filter(a => !a.error || a.error === 'YAML parse failed, using fallback extraction')
    .map(agentData => {
      const skillId = getSkillId(agentData.id);
      const targetDir = path.join(skillsDir, skillId);
      const targetFile = path.join(targetDir, 'SKILL.md');
      return {
        agentId: agentData.id,
        skillId,
        targetDir,
        targetFile,
        content: buildSkillContent(agentData),
      };
    });
}

function writeSkillPlan(plan, options) {
  for (const item of plan) {
    if (!options.dryRun) {
      try {
        fs.ensureDirSync(item.targetDir);
        fs.writeFileSync(item.targetFile, item.content, 'utf8');
      } catch (error) {
        throw new Error(`Failed to write skill ${item.skillId} at ${item.targetFile}: ${error.message}`);
      }
    }
  }
}

function syncSkills(options = {}) {
  const resolved = { ...getDefaultOptions(), ...options };
  if (resolved.globalOnly) {
    resolved.global = true;
  }
  const agents = parseAllAgents(resolved.sourceDir);
  const plan = buildSkillPlan(agents, resolved.localSkillsDir);

  if (!resolved.globalOnly) {
    writeSkillPlan(plan, resolved);
  }

  if (resolved.global) {
    const globalPlan = buildSkillPlan(agents, resolved.globalSkillsDir);
    writeSkillPlan(globalPlan, resolved);
  }

  return {
    generated: plan.length,
    localSkillsDir: resolved.localSkillsDir,
    globalSkillsDir: resolved.global || resolved.globalOnly ? resolved.globalSkillsDir : null,
    dryRun: resolved.dryRun,
  };
}

function parseArgs(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  return {
    global: args.has('--global'),
    globalOnly: args.has('--global-only'),
    dryRun: args.has('--dry-run'),
    quiet: args.has('--quiet') || args.has('-q'),
  };
}

function main() {
  const options = parseArgs();
  const result = syncSkills(options);

  if (!options.quiet) {
    if (!options.globalOnly) {
      console.log(`✅ Generated ${result.generated} Codex skills in ${result.localSkillsDir}`);
    }
    if (result.globalSkillsDir) {
      console.log(`✅ Installed ${result.generated} Codex skills in ${result.globalSkillsDir}`);
    }
    if (result.dryRun) {
      console.log('ℹ️ Dry-run mode: no files written');
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  buildSkillContent,
  buildSkillPlan,
  syncSkills,
  parseArgs,
  getCodexHome,
  getSkillId,
  getLegacySkillId,
};
