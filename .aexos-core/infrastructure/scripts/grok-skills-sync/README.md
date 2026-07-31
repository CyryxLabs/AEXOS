# Grok Skills/Agents Sync

Gera artefatos otimizados do AEXOS para o **Grok Build TUI**.

## Usage

```bash
# From repo root
npm run sync:skills:grok
npm run sync:skills:grok:dry
```

## Outputs

| Path | Content |
|------|---------|
| `.grok/agents/*.md` | Agent profiles nativos (frontmatter Grok) |
| `.grok/skills/aexos-*/SKILL.md` | Skills de ativação de persona |
| `.grok/skills/aexos-sdc/` etc. | Skills de workflow |
| `.grok/roles/*.toml` | Defaults de capability para subagents |
| `.grok/personas/*.toml` | Overlays comportamentais |
| `.grok/rules/aexos-core.md` | Regras compactas always-on |
| `.grok/README.md` | Documentação da integração |

## Design

- **Token-efficient:** prompts condensados; YAML completo fica em `.aexos-core/development/agents/`
- **Authority-safe:** matriz de autoridades AEXOS embutida (ex.: só devops faz push)
- **Regenerável:** re-rode o sync após mudanças nos agents fonte

## Source

Lê agents via `ide-sync/agent-parser` a partir de `.aexos-core/development/agents/`.
Overlays de perfil Grok: `AGENT_PROFILES` em `index.js`.
