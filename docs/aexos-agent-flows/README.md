# AEXOS Agent Flows - Documentação Detalhada dos Agentes

> 🌐 **PT** | [EN](../en/aexos-agent-flows/README.md) | [ES](../es/aexos-agent-flows/README.md) | [ZH](../zh/aexos-agent-flows/README.md)

---

**Versão:** 1.0.0
**Última Atualização:** 2026-02-05
**Status:** Documentação Oficial

---

## Visão Geral

Esta pasta contém a documentação detalhada de todos os agentes do AEXOS, incluindo:

- **Sistema completo** de cada agente
- **Flowcharts Mermaid** de operações
- **Mapeamento de comandos** para tasks
- **Integrações** entre agentes
- **Workflows** que envolvem cada agente
- **Best practices** e troubleshooting

---

## Agentes Documentados

| Agente | Persona | Arquétipo | Documento |
|--------|---------|-----------|-----------|
| **@aexos-master** | Zeus | Orchestrator | [aexos-master-system.md](./aexos-master-system.md) |
| **@analyst** | Sirius | Researcher | [analyst-system.md](./analyst-system.md) |
| **@architect** | Vega | Visionary | [architect-system.md](./architect-system.md) |
| **@data-engineer** | Ceres | Data Sage | [data-engineer-system.md](./data-engineer-system.md) |
| **@dev** | Vulcan | Builder | [dev-system.md](./dev-system.md) |
| **@devops** | Polaris | Guardian | [devops-system.md](./devops-system.md) |
| **@pm** | Janus | Strategist | [pm-system.md](./pm-system.md) |
| **@qa** | Argus | Guardian | [qa-system.md](./qa-system.md) |
| **@sm** | Chronos | Facilitator | [sm-system.md](./sm-system.md) |
| **@squad-creator** | Nova | Creator | [squad-creator-system.md](./squad-creator-system.md) |
| **@ux-design-expert** | Iris | Designer | [ux-design-expert-system.md](./ux-design-expert-system.md) |

---

## Estrutura de Cada Documento

Cada documento de agente segue esta estrutura padrão:

```
1. Visão Geral
   - Responsabilidades principais
   - Princípios core

2. Lista Completa de Arquivos
   - Tasks core
   - Definição do agente
   - Templates
   - Checklists
   - Arquivos relacionados

3. Flowchart do Sistema
   - Diagrama Mermaid completo
   - Fluxo de operações

4. Mapeamento de Comandos
   - Comandos → Tasks
   - Parâmetros e opções

5. Workflows Relacionados
   - Workflows que usam o agente
   - Papel do agente em cada workflow

6. Integrações entre Agentes
   - De quem recebe inputs
   - Para quem entrega outputs
   - Colaborações

7. Configuração
   - Arquivos de configuração
   - Tools disponíveis
   - Restrições

8. Best Practices
   - Quando usar
   - O que evitar

9. Troubleshooting
   - Problemas comuns
   - Soluções

10. Changelog
    - Histórico de versões
```

---

## Diagrama de Relacionamento entre Agentes

```mermaid
flowchart TB
    subgraph ORCHESTRATION["Orquestração"]
        MASTER["@aexos-master\n(Zeus)"]
    end

    subgraph DISCOVERY["Descoberta & Planejamento"]
        ANALYST["@analyst\n(Sirius)"]
        PM["@pm\n(Janus)"]
    end

    subgraph DESIGN["Design & Arquitetura"]
        ARCHITECT["@architect\n(Vega)"]
        UX["@ux-design-expert\n(Iris)"]
        DATA["@data-engineer\n(Ceres)"]
    end

    subgraph MANAGEMENT["Gestão"]
        PO["@po\n(Themis)"]
        SM["@sm\n(Chronos)"]
    end

    subgraph EXECUTION["Execução"]
        DEV["@dev\n(Vulcan)"]
        QA["@qa\n(Argus)"]
        DEVOPS["@devops\n(Polaris)"]
    end

    MASTER --> ANALYST
    MASTER --> PM
    ANALYST --> PM
    PM --> UX
    PM --> ARCHITECT
    UX --> ARCHITECT
    ARCHITECT --> DATA
    ARCHITECT --> PO
    PO --> SM
    SM --> DEV
    DEV --> QA
    QA --> DEVOPS

    style MASTER fill:#e3f2fd
    style EXECUTION fill:#c8e6c9
```

---

## Como Usar Esta Documentação

### Para Entender um Agente

1. Acesse o documento do agente desejado
2. Leia a **Visão Geral** para entender o papel
3. Consulte os **Comandos** para saber o que pode fazer
4. Veja os **Workflows** para entender o contexto

### Para Debugar Problemas

1. Vá direto à seção **Troubleshooting**
2. Consulte os **Flowcharts** para entender o fluxo
3. Verifique as **Integrações** para dependências

### Para Estender o Sistema

1. Analise a **Lista de Arquivos** para saber o que modificar
2. Siga os **Best Practices** para manter consistência
3. Atualize o **Changelog** após mudanças

---

## Relacionamento com Outras Documentações

| Documentação | Localização | Propósito |
|--------------|-------------|-----------|
| Meta-Agent Commands | [docs/meta-agent-commands.md](../meta-agent-commands.md) | Referência rápida |
| Workflows Guide | [docs/guides/workflows-guide.md](../guides/workflows-guide.md) | Guia de workflows |
| AEXOS Workflows | [docs/aexos-workflows/](../aexos-workflows/) | Detalhamento de workflows |
| Architecture | [docs/architecture/](../architecture/) | Arquitetura técnica |

---

## Contribuindo

Para adicionar ou atualizar documentação de agentes:

1. Siga a estrutura padrão descrita acima
2. Inclua diagramas Mermaid atualizados
3. Mantenha o changelog atualizado
4. Crie traduções em EN, ES e ZH

---

*AEXOS Agent Flows Documentation v1.0 - Documentação detalhada do sistema de agentes*
