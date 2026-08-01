/**
 * Model Registry Freshness Guard
 *
 * For a framework whose product is model orchestration, the registry is the
 * credibility surface. At AEX-0.7 it named no model from the current
 * generation anywhere: core-config declared `claude-sonnet-4-6`, the provider
 * factory defaulted to `claude-3-5-sonnet`, and the strategic roadmap routed to
 * Claude 3.7 / GPT-o3-mini / DeepSeek-R1.
 *
 * This guard fails the build when an Anthropic identifier drifts below the
 * current generation. It deliberately does NOT police non-Anthropic providers:
 * we have no verified source for their current identifiers, and asserting one
 * we invented would be worse than asserting none (Constitution Article IV —
 * No Invention). What it does police is that every unverified identifier still
 * carries its `TODO: verify current model id` marker.
 *
 * When Anthropic ships a new generation, update CURRENT_ANTHROPIC_MODELS and
 * this test names every place that still needs changing.
 *
 * @story AEX-0.7 — Refresh the model registry
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..');

const readText = (relativePath) => fs.readFileSync(path.join(REPO_ROOT, relativePath), 'utf8');

/**
 * The current generation. Anything Anthropic-shaped that is not in this list is
 * treated as rot.
 */
const CURRENT_ANTHROPIC_MODELS = [
  'claude-opus-5',
  'claude-sonnet-5',
  'claude-fable-5',
  'claude-haiku-4-5-20251001',
];

/** Matches any Anthropic-shaped model identifier (requires a digit). */
const ANTHROPIC_MODEL_PATTERN = /claude-[a-z0-9-]*\d[a-z0-9-]*/g;

const PROVIDER_FACTORY =
  '.aexos-core/infrastructure/integrations/ai-providers/ai-provider-factory.js';

/** Runtime surfaces that must never name a retired Anthropic identifier. */
const GOVERNED_FILES = [
  '.aexos-core/core-config.yaml',
  PROVIDER_FACTORY,
  '.aexos-core/infrastructure/integrations/ai-providers/claude-provider.js',
  '.aexos-core/product/templates/aexos-ai-config.yaml',
];

describe('model registry', () => {
  const coreConfig = yaml.load(readText('.aexos-core/core-config.yaml'));

  test('the active model is present in the registry', () => {
    expect(coreConfig.models.registry).toHaveProperty(coreConfig.models.active);
  });

  test('every registered model is a current-generation identifier', () => {
    expect(Object.keys(coreConfig.models.registry).sort()).toEqual(
      [...CURRENT_ANTHROPIC_MODELS].sort(),
    );
  });

  test('every registered model declares the standard context window', () => {
    for (const [id, entry] of Object.entries(coreConfig.models.registry)) {
      // 1M is the long-context opt-in variant, not the base identifier. A base
      // id declaring it makes the context tracker under-report depletion by 5x,
      // which is exactly what `claude-opus-4-6: 1000000` used to do.
      expect({ id, contextWindow: entry.contextWindow }).toEqual({
        id,
        contextWindow: 200000,
      });
      expect(entry.avgTokensPerPrompt).toBeGreaterThan(0);
    }
  });

  test.each(GOVERNED_FILES)('%s names no retired Anthropic model', (relativePath) => {
    const found = readText(relativePath).match(ANTHROPIC_MODEL_PATTERN) || [];
    const retired = [...new Set(found)].filter((id) => !CURRENT_ANTHROPIC_MODELS.includes(id));

    expect(retired).toEqual([]);
  });

  test('the provider factory defaults Claude to a current-generation model', () => {
    // Asserted against source rather than the module's exports: DEFAULT_CONFIG
    // is private, and this guard should not force widening the public surface.
    expect(readText(PROVIDER_FACTORY)).toMatch(/model:\s*'claude-(opus|sonnet|fable)-5'/);
  });

  test('unverified non-Anthropic defaults carry the TODO marker', () => {
    const source = readText(PROVIDER_FACTORY);

    // Guards the Article IV decision: a stale-but-true default is acceptable
    // only while it carries the marker saying it is unverified.
    for (const staleModel of ['gemini-2.0-flash', 'gpt-4o-mini', 'kimi-k2.5']) {
      const index = source.indexOf(staleModel);

      expect(index).toBeGreaterThan(-1);
      expect(source.slice(Math.max(0, index - 200), index)).toContain(
        'TODO: verify current model id',
      );
    }
  });
});
