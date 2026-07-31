# Gemini Rules - AEXOS (Cyryx)

Este arquivo define as instrucoes do projeto para Gemini CLI neste repositorio.

<!-- AEXOS-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aexos-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AEXOS-MANAGED-END: core -->

<!-- AEXOS-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- AEXOS-MANAGED-END: quality -->

<!-- AEXOS-MANAGED-START: codebase -->
## Project Map

- Core framework: `.aexos-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- Docs: `docs/`
<!-- AEXOS-MANAGED-END: codebase -->

<!-- AEXOS-MANAGED-START: gemini-integration -->
## Gemini Integration

Fonte de verdade de agentes:
- Canonico: `.aexos-core/development/agents/*.md`
- Espelhado para Gemini: `.gemini/rules/AEXOS/agents/*.md`

Hooks e settings:
- Hooks locais: `.gemini/hooks/`
- Settings locais: `.gemini/settings.json`

Sempre que houver drift, execute:
- `npm run sync:ide:gemini`
- `npm run validate:gemini-sync`
- `npm run validate:gemini-integration`
<!-- AEXOS-MANAGED-END: gemini-integration -->

<!-- AEXOS-MANAGED-START: parity -->
## Multi-IDE Parity

Para garantir paridade entre Claude Code, Codex e Gemini:
- `npm run validate:parity`
- `npm run validate:paths`
<!-- AEXOS-MANAGED-END: parity -->

<!-- AEXOS-MANAGED-START: activation -->
## Agent Activation

Preferencia de ativacao:
1. Use agentes em `.gemini/rules/AEXOS/agents/`
2. Se necessario, use fonte canonica em `.aexos-core/development/agents/`

Ao ativar agente:
- carregar definicao completa do agente
- renderizar greeting via `node .aexos-core/development/scripts/generate-greeting.js <agent-id>`
- manter persona ativa ate `*exit`

Atalhos recomendados no Gemini:
- `/aexos-menu` para listar agentes
- `/aexos-<agent-id>` (ex.: `/aexos-dev`, `/aexos-architect`)
- `/aexos-agent <agent-id>` para launcher generico
<!-- AEXOS-MANAGED-END: activation -->

<!-- AEXOS-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:ide:gemini`
- `npm run validate:gemini-sync`
- `npm run validate:gemini-integration`
- `npm run validate:parity`
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AEXOS-MANAGED-END: commands -->
