# AGENTS.md - AEXOS (Codex CLI)

Este arquivo define as instrucoes do projeto para o Codex CLI.

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

<!-- AEXOS-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:skills:codex`
- `npm run sync:skills:codex:global` (opcional; neste repo o padrao e local-first)
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AEXOS-MANAGED-END: commands -->

<!-- AEXOS-MANAGED-START: shortcuts -->
## Agent Shortcuts

Preferencia de ativacao no Codex CLI:
1. Use `/skills` e selecione `aexos-<agent-id>` vindo de `.codex/skills` (ex.: `aexos-architect`)
2. Se preferir, use os atalhos abaixo (`@architect`, `/architect`, etc.)

Interprete os atalhos abaixo carregando o arquivo correspondente em `.aexos-core/development/agents/` (fallback: `.codex/agents/`), renderize o greeting via `generate-greeting.js` e assuma a persona ate `*exit`:

- `@architect`, `/architect`, `/architect.md` -> `.aexos-core/development/agents/architect.md`
- `@dev`, `/dev`, `/dev.md` -> `.aexos-core/development/agents/dev.md`
- `@qa`, `/qa`, `/qa.md` -> `.aexos-core/development/agents/qa.md`
- `@pm`, `/pm`, `/pm.md` -> `.aexos-core/development/agents/pm.md`
- `@po`, `/po`, `/po.md` -> `.aexos-core/development/agents/po.md`
- `@sm`, `/sm`, `/sm.md` -> `.aexos-core/development/agents/sm.md`
- `@analyst`, `/analyst`, `/analyst.md` -> `.aexos-core/development/agents/analyst.md`
- `@devops`, `/devops`, `/devops.md` -> `.aexos-core/development/agents/devops.md`
- `@data-engineer`, `/data-engineer`, `/data-engineer.md` -> `.aexos-core/development/agents/data-engineer.md`
- `@ux-design-expert`, `/ux-design-expert`, `/ux-design-expert.md` -> `.aexos-core/development/agents/ux-design-expert.md`
- `@squad-creator`, `/squad-creator`, `/squad-creator.md` -> `.aexos-core/development/agents/squad-creator.md`
- `@aexos-master`, `/aexos-master`, `/aexos-master.md` -> `.aexos-core/development/agents/aexos-master.md`
<!-- AEXOS-MANAGED-END: shortcuts -->
