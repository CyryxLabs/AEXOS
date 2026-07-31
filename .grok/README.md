# AEXOS Grok Integration

Optimized agents, skills, roles, and personas for [Grok Build TUI](https://grok.x.ai).

## Layout

| Path | Purpose |
|------|---------|
| `agents/` | Native Grok agent profiles (session + spawnable types) |
| `skills/aexos-*/` | Slash skills to activate personas |
| `skills/aexos-sdc/`, `aexos-full-sdc/`, atomics | Workflow skills (lean SDC + gates + handoff) |
| `roles/` | Subagent capability defaults |
| `personas/` | Behavioral overlays for subagents |
| `rules/` | Always-on compact AEXOS rules |

## Activate an agent

```text
/aexos-dev
/aexos-qa
/aexos-devops
/aexos-squad-creator
```

Or ask in natural language ("implement this story", "create a PR") — skill descriptions drive auto-invocation.

## Regenerate

From repo root:

```bash
npm run sync:skills:grok
# or
node .aexos-core/infrastructure/scripts/grok-skills-sync/index.js
```

Dry-run:

```bash
npm run sync:skills:grok -- --dry-run
```

## Design principles

1. **Token-efficient** — condensed profiles; full YAML stays in `.aexos-core/development/agents/`
2. **Authority-safe** — devops-only push; story lifecycle ownership
3. **Task-first** — formal work loads `.aexos-core/development/tasks/*`
4. **Grok-native** — frontmatter `permission_mode`, roles, personas

## Related

- Codex skills: `npm run sync:skills:codex`
- IDE sync: `npm run sync:ide`
- Constitution: `.aexos-core/constitution.md`
