# Guia de Início Rápido AEXOS v4

> 🌐 [EN](../../installation/v4-quick-start.md) | **PT** | [ES](../../es/installation/v4-quick-start.md)

---

**Versão:** 2.1
**Última Atualização:** 2026-01-26
**Tempo para Completar:** 5 minutos

---

## Pré-requisitos

Antes de começar, certifique-se de ter:

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 9+ instalado (`npm --version`)
- [ ] Git instalado (`git --version`)
- [ ] GitHub CLI (`gh`) instalado e autenticado (`gh auth status`)
- [ ] Uma IDE com IA ou Claude Code CLI

---

## Passo 1: Instalar AEXOS Core

### Opção A: Wizard de Instalação npx (Recomendado)

```bash
# Executar o wizard de instalação interativo
npx github:CyryxLabs/AEXOS

# Ou criar um novo projeto com nome específico
npx github:CyryxLabs/AEXOS init meu-projeto
cd meu-projeto
```

### Opção B: Clonar Repositório (Desenvolvimento)

```bash
git clone https://github.com/CyryxLabs/AEXOS.git
cd AEXOS
npm install
```

---

## Passo 2: Verificar Instalação

Execute o comando de diagnóstico:

```bash
npx github:CyryxLabs/AEXOS doctor
```

Ou se instalado globalmente:

```bash
aexos doctor
```

### Verificação Manual

```bash
# Verificar se a estrutura core existe
ls -la .aexos-core/

# Verificar diretórios principais
ls .aexos-core/core/
ls .aexos-core/development/agents/
```

Estrutura esperada:

```
.aexos-core/
├── core/               # Core do framework (registry, health-check, orchestration)
├── development/        # Agentes, tarefas, workflows
├── product/            # Templates, checklists
└── infrastructure/     # Scripts, ferramentas, integrações
```

---

## Passo 3: Ativar Seu Primeiro Agente

AEXOS usa agentes especializados para diferentes tarefas. Na sua IDE com IA ou Claude Code CLI, digite:

```
@aexos-master
```

O agente irá cumprimentá-lo e mostrar comandos disponíveis:

```
🎯 AEXOS Master pronto!
Digite *help para ver comandos disponíveis.
```

### Experimente Estes Comandos

| Comando   | Descrição                             |
| --------- | ------------------------------------- |
| `*help`   | Mostrar todos os comandos disponíveis |
| `*status` | Mostrar status do projeto             |
| `*agents` | Listar todos os agentes disponíveis   |

---

## Passo 4: Explorar Agentes Disponíveis

| Agente              | Ativação             | Propósito                          |
| ------------------- | -------------------- | ---------------------------------- |
| `@dev` (Vulcan)        | Desenvolvimento      | Implementação de código, debugging |
| `@qa` (Argus)       | Qualidade            | Testes e validação                 |
| `@architect` (Vega) | Arquitetura          | Design de sistema e documentação   |
| `@pm` (Sage)        | Product Manager      | Requisitos e planejamento          |
| `@devops` (Polaris)    | DevOps               | Git push, criação de PR, CI/CD     |
| `@po` (Maven)       | Product Owner        | Criação de stories e backlog       |
| `@sm` (Chronos)       | Scrum Master         | Gerenciamento de sprint            |
| `@analyst` (Nova)   | Analista de Negócios | Análise de requisitos              |

### Exemplo: Ativar Agente Desenvolvedor

```
@dev
```

O agente desenvolvedor (Vulcan) será ativado com uma saudação mostrando:

- Status do projeto
- Comandos rápidos
- Opções de colaboração entre agentes

---

## Passo 5: Criar Sua Primeira Story

Stories direcionam o desenvolvimento no AEXOS. Ative o Product Owner e crie uma:

```
@po *create-story
```

Siga os prompts para definir:

1. Título da story
2. Descrição
3. Critérios de aceite
4. Prioridade

---

## Referência Rápida

### Comandos de Agente

Todos os comandos de agente usam o prefixo `*`:

```
*help          # Mostrar ajuda
*status        # Mostrar status
*exit          # Sair do agente atual
```

### Comandos CLI

```bash
# Instalação e setup
npx github:CyryxLabs/AEXOS           # Executar wizard
npx github:CyryxLabs/AEXOS doctor    # Executar diagnósticos
npx github:CyryxLabs/AEXOS info      # Mostrar info do sistema

# Desenvolvimento
npm run lint                           # Verificar estilo de código
npm run typecheck                      # Verificar tipos TypeScript
npm test                               # Executar testes unitários
npm run validate:structure             # Validar estrutura AEXOS
```

### Estrutura do Projeto

```
seu-projeto/
├── .aexos-core/                    # Core do framework
│   ├── core/                      # Módulos core
│   │   ├── registry/              # Registro de serviços (200+ workers)
│   │   ├── health-check/          # Sistema de health check
│   │   ├── orchestration/         # Orquestração de workflows
│   │   └── quality-gates/         # Camadas de validação de qualidade
│   ├── development/               # Assets de desenvolvimento
│   │   ├── agents/                # Definições de agentes (12 agentes)
│   │   ├── tasks/                 # Workflows de tarefas (~140 tarefas)
│   │   └── workflows/             # Workflows multi-etapa
│   ├── product/                   # Assets de produto
│   │   ├── templates/             # Templates de documentos
│   │   └── checklists/            # Checklists de validação
│   └── infrastructure/            # Infraestrutura
│       ├── scripts/               # Scripts utilitários (~80)
│       ├── integrations/          # Adaptadores de PM tools
│       └── templates/             # Templates de configuração
├── .claude/                       # Configuração Claude Code
│   ├── commands/AEXOS/agents/      # Skills de agentes
│   └── rules/                     # Regras de agentes
├── docs/                          # Documentação
│   └── stories/                   # Stories de desenvolvimento
└── src/                           # Seu código fonte
```

---

## Próximos Passos

1. **Leia o guia completo:** [Começando](../getting-started.md)
2. **Entenda a arquitetura:** [Arquitetura Core](../core-architecture.md)
3. **Aprenda sobre agentes:** [Definições de Agentes](../../../.aexos-core/development/agents/)
4. **Junte-se à comunidade:** [Discord](https://discord.gg/gk8jAdXWmj)

---

## Solução de Problemas

### Erros "Comando não encontrado"

```bash
# Certifique-se que Node.js está no PATH
node --version

# Limpe o cache npm se problemas persistirem
npm cache clean --force
```

### Agente não responde

1. Certifique-se de estar em uma IDE com IA (Cursor, VS Code com Claude, etc.) ou Claude Code CLI
2. Verifique se está usando sintaxe correta: `@nome-do-agente`
3. Verifique se o arquivo do agente existe: `ls .aexos-core/development/agents/`

### Erros de permissão

```bash
# Corrigir permissões npm (macOS/Linux)
sudo chown -R $(whoami) ~/.npm

# Ou use um gerenciador de versão Node (recomendado)
# nvm, fnm, ou volta
```

### Estrutura AEXOS não encontrada

```bash
# Reinstalar AEXOS no projeto atual
npx github:CyryxLabs/AEXOS install

# Ou clonar novamente
git clone https://github.com/CyryxLabs/AEXOS.git
```

---

## Obtendo Ajuda

- **Documentação:** [Repositório GitHub](https://github.com/CyryxLabs/AEXOS)
- **GitHub Issues:** [github.com/CyryxLabs/AEXOS/issues](https://github.com/CyryxLabs/AEXOS/issues)
- **Comunidade Discord:** [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)

---

**Bem-vindo ao AEXOS! Bom coding!**
