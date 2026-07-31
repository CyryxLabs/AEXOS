/**
 * Squad discovery — the canonical reader for installed squads.
 *
 * A squad declares itself in a manifest at `squads/<name>/`. Two filenames are
 * in circulation: `*create-squad` scaffolds `squad.yaml`, `*validate-squad`
 * treats `config.yaml` as deprecated, and the two squads that ship today use
 * `config.yaml`. Both are accepted, canonical first, so nothing that works
 * stops working and squads built the recommended way are found.
 *
 * Used by the registry generator so the orchestrator can route to squads it was
 * never told about by name. `codex-skills-sync/bootstrap.js` performs its own
 * equivalent scan for skill generation; `tests/ids/squad-registry.test.js`
 * asserts the two agree, so a divergence fails the build rather than silently
 * making a squad visible in one surface and invisible in the other.
 *
 * @module core/squads/squad-discovery
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/** Manifest filenames, in resolution order. */
const MANIFEST_NAMES = ['squad.yaml', 'config.yaml'];

function readYaml(filePath) {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8')) || {};
  } catch {
    return null;
  }
}

/** Extract the agent block from a squad agent definition. */
function readAgentMeta(filePath) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const block = src.match(/```yaml\n([\s\S]*?)\n```/);
    if (!block) return null;
    const parsed = yaml.load(block[1]) || {};
    const agent = parsed.agent || {};
    if (!agent.id) return null;
    return {
      id: String(agent.id),
      name: agent.name ? String(agent.name) : '',
      title: agent.title ? String(agent.title) : '',
      icon: agent.icon ? String(agent.icon) : '',
      based_on: agent.based_on ? String(agent.based_on) : '',
      whenToUse: agent.whenToUse ? String(agent.whenToUse).trim() : '',
    };
  } catch {
    return null;
  }
}

/**
 * Resolve the squad's entry agent. Mirrors the fallback chain the codex
 * bootstrap uses, so both surfaces agree on which agent is the front door.
 */
function resolveEntryAgent(manifest, squadDir) {
  const direct =
    (manifest.squad && manifest.squad.entry_agent) ||
    manifest.entry_agent ||
    (manifest.pack && manifest.pack.entry_agent) ||
    (manifest.orchestrator && manifest.orchestrator.agent);
  if (direct) return String(direct).trim();

  // A registry keyed by agent id, with one marked as the orchestrator tier.
  if (manifest.agents && typeof manifest.agents === 'object' && !Array.isArray(manifest.agents)) {
    const chief = Object.entries(manifest.agents).find(
      ([id, meta]) =>
        /chief$/i.test(id) || (meta && String(meta.tier) === '0') || (meta && /orchestrator/i.test(String(meta.tier || ''))),
    );
    if (chief) return chief[0];
  }

  if (Array.isArray(manifest.agents)) {
    const chief = manifest.agents.find(
      (a) => a && (/chief$/i.test(String(a.id || '')) || /orchestrator/i.test(String(a.tier || ''))),
    );
    if (chief && chief.id) return String(chief.id);
  }

  // Last resort: a *-chief.md on disk.
  const agentsDir = path.join(squadDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    const file = fs.readdirSync(agentsDir).find((f) => /(^|-)chief\.md$/i.test(f));
    if (file) return path.basename(file, '.md');
  }
  return null;
}

/**
 * Discover every squad installed under `squads/`.
 *
 * @param {string} [projectRoot] Defaults to process.cwd()
 * @returns {{squads: Array<object>, warnings: string[]}}
 */
function discoverSquads(projectRoot) {
  const root = projectRoot || process.cwd();
  const squadsDir = path.join(root, 'squads');
  const squads = [];
  const warnings = [];

  if (!fs.existsSync(squadsDir)) return { squads, warnings };

  for (const entry of fs.readdirSync(squadsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const squadDir = path.join(squadsDir, name);

    const manifestPath = MANIFEST_NAMES.map((f) => path.join(squadDir, f)).find((p) =>
      fs.existsSync(p),
    );
    if (!manifestPath) {
      // Not every directory under squads/ is a squad — `_example` is a stub.
      warnings.push(`${name}: no squad.yaml or config.yaml — not a squad, skipped`);
      continue;
    }

    const manifest = readYaml(manifestPath);
    if (!manifest) {
      warnings.push(`${name}: manifest does not parse`);
      continue;
    }

    const meta = manifest.squad || manifest.pack || manifest;
    const entryAgent = resolveEntryAgent(manifest, squadDir);
    if (!entryAgent) {
      warnings.push(`${name}: no entry agent could be resolved`);
      continue;
    }

    const agentsDir = path.join(squadDir, 'agents');
    const agents = fs.existsSync(agentsDir)
      ? fs
        .readdirSync(agentsDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => readAgentMeta(path.join(agentsDir, f)))
        .filter(Boolean)
        .sort((a, b) => a.id.localeCompare(b.id))
      : [];

    const entry_agent_found = agents.some((a) => a.id === entryAgent);
    if (!entry_agent_found) {
      warnings.push(`${name}: entry agent "${entryAgent}" has no definition in agents/`);
    }

    squads.push({
      name,
      manifest: path.basename(manifestPath),
      display_name: meta.display_name || name,
      domain: meta.domain || '',
      description: (meta.description || '').trim(),
      keywords: Array.isArray(meta.keywords) ? meta.keywords : [],
      entry_agent: entryAgent,
      entry_agent_found,
      agents,
    });
  }

  squads.sort((a, b) => a.name.localeCompare(b.name));
  return { squads, warnings };
}

module.exports = { discoverSquads, resolveEntryAgent, MANIFEST_NAMES };
