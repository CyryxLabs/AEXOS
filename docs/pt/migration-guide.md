<!--
  Tradução: PT-BR
  Original: /docs/en/migration-guide.md
  Última sincronização: 2026-01-26
-->

# Guia de Atualização do AEXOS (Cyryx)

> 🌐 [EN](../migration-guide.md) | **PT** | [ES](../es/migration-guide.md)

---

Este guia ajuda você a atualizar entre versões do AEXOS (Cyryx).

## Sumário

1. [Compatibilidade de Versões](#compatibilidade-de-versões)
2. [Checklist Pré-Atualização](#checklist-pré-atualização)
3. [Procedimentos de Backup](#procedimentos-de-backup)
4. [Processo de Atualização](#processo-de-atualização)
5. [Verificação Pós-Atualização](#verificação-pós-atualização)
6. [Procedimentos de Rollback](#procedimentos-de-rollback)
7. [Solução de Problemas](#solução-de-problemas)

## Compatibilidade de Versões

### Versão Atual

**AEXOS (Cyryx) v4.2.11** (Versão Estável Atual)

### Caminhos de Atualização

| Da Versão | Para Versão | Tipo de Atualização | Dificuldade |
|-----------|-------------|---------------------|-------------|
| v4.3.x | v4.2.11 | Menor | Baixa |
| v4.0-4.2 | v4.2.11 | Menor | Média |
| v3.x | v4.2.11 | Maior | Alta |

### Requisitos do Sistema

- **Node.js**: 20.0.0 ou superior (recomendado)
- **npm**: 10.0.0 ou superior
- **Git**: 2.0.0 ou superior
- **Espaço em Disco**: mínimo de 100MB de espaço livre

## Checklist Pré-Atualização

Antes de atualizar, certifique-se de que você:

- [ ] Fez backup de todo o seu projeto
- [ ] Documentou as configurações personalizadas
- [ ] Listou todos os agentes e workflows ativos
- [ ] Exportou quaisquer dados críticos
- [ ] Testou a atualização em um ambiente de desenvolvimento
- [ ] Informou os membros da equipe sobre a manutenção planejada
- [ ] Revisou as notas de lançamento para mudanças que quebram compatibilidade

## Procedimentos de Backup

### 1. Backup Completo do Projeto

```bash
# Criar backup com timestamp
tar -czf aexos-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  .

# Mover para local seguro
mv aexos-backup-*.tar.gz ../backups/
```

### 2. Exportar Configuração

```bash
# Salvar configuração atual
cp .aexos-core/config.json ../backups/config-backup.json

# Salvar componentes personalizados
cp -r .aexos-core/agents/custom ../backups/custom-agents/
cp -r .aexos-core/tasks/custom ../backups/custom-tasks/
```

### 3. Documentar Estado Atual

```bash
# Registrar versão atual
npm list aexos-core/core > ../backups/version-info.txt

# Listar arquivos personalizados
find .aexos-core -name "*.custom.*" -type f > ../backups/custom-files.txt
```

## Processo de Atualização

### Opção 1: Atualização In-Place (Recomendada)

```bash
# 1. Parar quaisquer processos em execução
# Fechar todas as integrações de IDE e agentes ativos

# 2. Atualizar para a versão mais recente
npm install -g aexos-core@latest

# 3. Executar comando de atualização
cyryx upgrade

# 4. Verificar instalação
aexos --version
```

### Opção 2: Instalação Limpa

```bash
# 1. Remover instalação antiga
npm uninstall -g aexos-core

# 2. Limpar cache
npm cache clean --force

# 3. Instalar versão mais recente
npm install -g aexos-core@latest

# 4. Reinicializar projeto
cd your-project
aexos init --upgrade
```

### Opção 3: Atualização Específica do Projeto

```bash
# Atualizar dependências do projeto
cd your-project
npm update aexos-core/core

# Reinstalar dependências
npm install

# Verificar atualização
npm list aexos-core/core
```

## Verificação Pós-Atualização

### 1. Verificar Instalação

```bash
# Verificar versão
aexos --version

# Verificar componentes principais
cyryx verify --components

# Testar funcionalidade básica
cyryx test --quick
```

### 2. Testar Agentes

```bash
# Listar agentes disponíveis
cyryx list agents

# Testar ativação de agente
cyryx test agent aexos-developer

# Verificar dependências dos agentes
cyryx verify --agents
```

### 3. Verificar Configuração

```bash
# Validar configuração
aexos config validate

# Revisar log de atualização
cat .aexos-core/logs/upgrade.log
```

### 4. Testar Workflows

```bash
# Listar workflows
cyryx list workflows

# Testar execução de workflow
cyryx test workflow basic-dev-cycle
```

## Procedimentos de Rollback

Se você encontrar problemas após a atualização:

### Rollback Rápido

```bash
# Restaurar do backup
cd ..
rm -rf current-project
tar -xzf backups/aexos-backup-YYYYMMDD-HHMMSS.tar.gz

# Reinstalar versão anterior
npm install -g aexos-core@<previous-version>

# Verificar rollback
aexos --version
```

### Rollback Seletivo

```bash
# Restaurar componentes específicos
cp ../backups/config-backup.json .aexos-core/config.json
cp -r ../backups/custom-agents/* .aexos-core/agents/custom/

# Reinstalar dependências
npm install
```

## Solução de Problemas

### Problemas Comuns

#### Falha na Instalação

```bash
# Limpar cache do npm
npm cache clean --force

# Tentar com log detalhado
npm install -g aexos-core@latest --verbose

# Verificar permissões do npm
npm config get prefix
```

#### Agentes Não Carregam

```bash
# Reconstruir manifestos dos agentes
cyryx rebuild --manifests

# Verificar dependências dos agentes
cyryx verify --agents --verbose

# Verificar sintaxe dos agentes
aexos validate agents
```

#### Erros de Configuração

```bash
# Validar configuração
aexos config validate --verbose

# Redefinir para padrões (cuidado!)
aexos config reset --backup

# Reparar configuração
aexos config repair
```

#### Problemas na Camada de Memória

```bash
# Reconstruir índices de memória
cyryx memory rebuild

# Verificar integridade da memória
cyryx memory verify

# Limpar e reinicializar
cyryx memory reset
```

### Obtendo Ajuda

Se você encontrar problemas não cobertos aqui:

1. **Verificar Logs**: Revise `.aexos-core/logs/upgrade.log`
2. **Issues no GitHub**: [github.com/CyryxLabs/AEXOS/issues](https://github.com/CyryxLabs/AEXOS/issues)
3. **Comunidade Discord**: [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)
4. **Documentação**: [diretório docs](./getting-started.md)

## Notas Específicas por Versão

### Atualizando para v4.2

**Principais Mudanças:**
- Capacidades aprimoradas do meta-agente
- Desempenho melhorado da camada de memória
- Recursos de segurança atualizados
- Processo de instalação simplificado

**Mudanças que Quebram Compatibilidade:**
- Nenhuma (compatível com versões anteriores a partir da v4.0+)

**Novos Recursos:**
- Melhorias no meta-agente `aexos-developer`
- Assistente de instalação interativo
- Ferramentas de monitoramento de desempenho

**Descontinuações:**
- Sintaxe de comandos legados (ainda suportada com avisos)

---

**Última Atualização:** 2025-08-01
**Versão Atual:** v4.2.11
