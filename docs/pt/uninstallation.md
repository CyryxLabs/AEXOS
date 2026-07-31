<!--
  Tradução: PT-BR
  Original: /docs/en/uninstallation.md
  Última sincronização: 2026-01-26
-->

# Guia de Desinstalação

> 🌐 [EN](../uninstallation.md) | **PT** | [ES](../es/uninstallation.md)

---

Este guia fornece instruções completas para desinstalar o AEXOS (Cyryx) do seu sistema.

## Índice

1. [Antes de Desinstalar](#antes-de-desinstalar)
2. [Desinstalação Rápida](#desinstalação-rápida)
3. [Desinstalação Completa](#desinstalação-completa)
4. [Desinstalação Seletiva](#desinstalação-seletiva)
5. [Preservação de Dados](#preservação-de-dados)
6. [Remoção Limpa do Sistema](#remoção-limpa-do-sistema)
7. [Resolução de Problemas na Desinstalação](#resolução-de-problemas-na-desinstalação)
8. [Limpeza Pós-Desinstalação](#limpeza-pós-desinstalação)
9. [Reinstalação](#reinstalação)

## Antes de Desinstalar

### Considerações Importantes

**Aviso**: Desinstalar o AEXOS (Cyryx) irá:

- Remover todos os arquivos do framework
- Excluir configurações de agentes (a menos que preservadas)
- Limpar dados da camada de memória (a menos que backup seja feito)
- Remover todos os workflows personalizados
- Excluir logs e arquivos temporários

### Checklist Pré-Desinstalação

- [ ] Fazer backup de dados importantes
- [ ] Exportar agentes e workflows personalizados
- [ ] Salvar chaves de API e configurações
- [ ] Documentar modificações personalizadas
- [ ] Parar todos os processos em execução
- [ ] Informar membros da equipe

### Faça Backup dos Seus Dados

```bash
# Criar backup completo
npx github:CyryxLabs/AEXOS backup --complete

# Ou fazer backup manual dos diretórios importantes
tar -czf aexos-backup-$(date +%Y%m%d).tar.gz \
  .aexos/ \
  agents/ \
  workflows/ \
  tasks/ \
  --exclude=.aexos/logs \
  --exclude=.aexos/cache
```

## Desinstalação Rápida

### Usando o Desinstalador Integrado

A forma mais rápida de desinstalar o AEXOS (Cyryx):

```bash
# Desinstalação básica (preserva dados do usuário)
npx github:CyryxLabs/AEXOS uninstall

# Desinstalação completa (remove tudo)
npx github:CyryxLabs/AEXOS uninstall --complete

# Desinstalação com preservação de dados
npx github:CyryxLabs/AEXOS uninstall --keep-data
```

### Desinstalação Interativa

Para desinstalação guiada:

```bash
npx github:CyryxLabs/AEXOS uninstall --interactive
```

Isso solicitará:

- O que manter/remover
- Opções de backup
- Confirmação para cada etapa

## Desinstalação Completa

### Etapa 1: Parar Todos os Serviços

```bash
# Parar todos os agentes em execução
*deactivate --all

# Parar todos os workflows
*stop-workflow --all

# Encerrar o meta-agent
*shutdown
```

### Etapa 2: Exportar Dados Importantes

```bash
# Exportar configurações
*export config --destination backup/config.json

# Exportar agentes
*export agents --destination backup/agents/

# Exportar workflows
*export workflows --destination backup/workflows/

# Exportar dados de memória
*export memory --destination backup/memory.zip
```

### Etapa 3: Executar o Desinstalador

```bash
# Remoção completa
npx github:CyryxLabs/AEXOS uninstall --complete --no-backup
```

### Etapa 4: Remover Instalação Global

```bash
# Remover pacote npm global
npm uninstall -g aexos-core

# Remover cache do npx
npm cache clean --force
```

### Etapa 5: Limpar Arquivos do Sistema

#### Windows

```powershell
# Remover arquivos do AppData
Remove-Item -Recurse -Force "$env:APPDATA\aexos-core"

# Remover arquivos temporários
Remove-Item -Recurse -Force "$env:TEMP\aexos-*"

# Remover entradas do registro (se houver)
Remove-Item -Path "HKCU:\Software\AEXOS (Cyryx)" -Recurse
```

#### macOS/Linux

```bash
# Remover arquivos de configuração
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core

# Remover cache
rm -rf ~/.cache/aexos-core

# Remover arquivos temporários
rm -rf /tmp/aexos-*
```

## Desinstalação Seletiva

### Remover Componentes Específicos

```bash
# Remover apenas agentes
npx github:CyryxLabs/AEXOS uninstall agents

# Remover apenas workflows
npx github:CyryxLabs/AEXOS uninstall workflows

# Remover camada de memória
npx github:CyryxLabs/AEXOS uninstall memory-layer

# Remover agente específico
*uninstall agent-name
```

### Manter o Core, Remover Extensões

```bash
# Remover todos os plugins
*plugin remove --all

# Remover Squads
rm -rf Squads/

# Remover templates personalizados
rm -rf templates/custom/
```

## Preservação de Dados

### O Que Manter

Antes de desinstalar, identifique o que você quer preservar:

1. **Agentes Personalizados**

   ```bash
   # Copiar agentes personalizados
   cp -r agents/custom/ ~/aexos-backup/agents/
   ```

2. **Workflows e Tasks**

   ```bash
   # Copiar workflows
   cp -r workflows/ ~/aexos-backup/workflows/
   cp -r tasks/ ~/aexos-backup/tasks/
   ```

3. **Dados de Memória**

   ```bash
   # Exportar banco de dados de memória
   *memory export --format sqlite \
     --destination ~/aexos-backup/memory.db
   ```

4. **Configurações**

   ```bash
   # Copiar todos os arquivos de configuração
   cp .aexos/config.json ~/aexos-backup/
   cp .env ~/aexos-backup/
   ```

5. **Código Personalizado**
   ```bash
   # Encontrar e fazer backup de arquivos personalizados
   find . -name "*.custom.*" -exec cp {} ~/aexos-backup/custom/ \;
   ```

### Script de Preservação

Crie `preserve-data.sh`:

```bash
#!/bin/bash
BACKUP_DIR="$HOME/aexos-backup-$(date +%Y%m%d-%H%M%S)"

echo "Criando diretório de backup: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Função de backup
backup_if_exists() {
    if [ -e "$1" ]; then
        echo "Fazendo backup de $1..."
        cp -r "$1" "$BACKUP_DIR/"
    fi
}

# Backup de todos os dados importantes
backup_if_exists ".aexos"
backup_if_exists "agents"
backup_if_exists "workflows"
backup_if_exists "tasks"
backup_if_exists "templates"
backup_if_exists ".env"
backup_if_exists "package.json"

echo "Backup concluído em: $BACKUP_DIR"
```

## Remoção Limpa do Sistema

### Script de Limpeza Completa

Crie `clean-uninstall.sh`:

```bash
#!/bin/bash
echo "Desinstalação Completa do AEXOS (Cyryx)"
echo "================================="

# Confirmação
read -p "Isso removerá TODOS os dados do AEXOS (Cyryx). Continuar? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Parar todos os processos
echo "Parando todos os processos..."
pkill -f "aexos-core" || true
pkill -f "aexos-developer" || true

# Remover arquivos do projeto
echo "Removendo arquivos do projeto..."
rm -rf .aexos/
rm -rf agents/
rm -rf workflows/
rm -rf tasks/
rm -rf templates/
rm -rf Squads/
rm -rf node_modules/aexos-core/

# Remover arquivos globais
echo "Removendo arquivos globais..."
npm uninstall -g aexos-core

# Remover dados do usuário
echo "Removendo dados do usuário..."
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core
rm -rf ~/.cache/aexos-core

# Limpar cache do npm
echo "Limpando cache do npm..."
npm cache clean --force

# Remover do package.json
echo "Atualizando package.json..."
npm uninstall aexos-core/core
npm uninstall aexos-core/memory
npm uninstall aexos-core/meta-agent

echo "Desinstalação concluída!"
```

### Limpeza do Registro (Windows)

```powershell
# Script PowerShell para limpeza no Windows
Write-Host "Limpando AEXOS (Cyryx) do Registro do Windows..."

# Remover do PATH
$path = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = ($path.Split(';') | Where-Object { $_ -notmatch 'aexos-core' }) -join ';'
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")

# Remover chaves do registro
Remove-ItemProperty -Path "HKCU:\Environment" -Name "AEXOS_*" -ErrorAction SilentlyContinue

# Remover associações de arquivo
Remove-Item -Path "HKCU:\Software\Classes\.cyryx" -Recurse -ErrorAction SilentlyContinue

Write-Host "Limpeza do registro concluída!"
```

## Resolução de Problemas na Desinstalação

### Problemas Comuns

#### 1. Permissão Negada

```bash
# Linux/macOS
sudo npx github:CyryxLabs/AEXOS uninstall --complete

# Windows (Executar como Administrador)
npx github:CyryxLabs/AEXOS uninstall --complete
```

#### 2. Processo Ainda em Execução

```bash
# Forçar parada de todos os processos
# Linux/macOS
killall -9 node
killall -9 aexos-core

# Windows
taskkill /F /IM node.exe
taskkill /F /IM aexos-core.exe
```

#### 3. Arquivos Bloqueados

```bash
# Encontrar processos usando os arquivos
# Linux/macOS
lsof | grep cyryx

# Windows (PowerShell)
Get-Process | Where-Object {$_.Path -like "*cyryx*"}
```

#### 4. Remoção Incompleta

```bash
# Limpeza manual
find . -name "*cyryx*" -type d -exec rm -rf {} +
find . -name "*.cyryx*" -type f -delete
```

### Desinstalação Forçada

Se a desinstalação normal falhar:

```bash
#!/bin/bash
# force-uninstall.sh
echo "Desinstalação forçada do AEXOS (Cyryx)..."

# Matar todos os processos relacionados
pkill -9 -f cyryx || true

# Remover todos os arquivos
rm -rf .cyryx* cyryx* *cyryx*
rm -rf agents workflows tasks templates
rm -rf node_modules/aexos-core
rm -rf ~/.cyryx* ~/.config/cyryx* ~/.cache/cyryx*

# Limpar npm
npm cache clean --force
npm uninstall -g aexos-core

echo "Desinstalação forçada concluída!"
```

## Limpeza Pós-Desinstalação

### 1. Verificar Remoção

```bash
# Verificar arquivos restantes
find . -name "*cyryx*" 2>/dev/null
find ~ -name "*cyryx*" 2>/dev/null

# Verificar pacotes npm
npm list -g | grep cyryx
npm list | grep cyryx

# Verificar processos em execução
ps aux | grep cyryx
```

### 2. Limpar Variáveis de Ambiente

```bash
# Remover do .bashrc/.zshrc
sed -i '/AEXOS_/d' ~/.bashrc
sed -i '/aexos-core/d' ~/.bashrc

# Remover de arquivos .env
find . -name ".env*" -exec sed -i '/AEXOS_/d' {} \;
```

### 3. Atualizar Arquivos do Projeto

```javascript
// Remover do package.json scripts
{
  "scripts": {
    // Remover estas entradas
    "cyryx": "aexos-core",
    "meta-agent": "aexos-core meta-agent"
  }
}
```

### 4. Limpar Repositório Git

```bash
# Remover hooks git específicos do AEXOS
rm -f .git/hooks/*cyryx*

# Atualizar .gitignore
sed -i '/.aexos/d' .gitignore
sed -i '/aexos-/d' .gitignore

# Commitar remoção
git add -A
git commit -m "Remove AEXOS (Cyryx)"
```

## Reinstalação

### Após Desinstalação Completa

Se você quiser reinstalar o AEXOS (Cyryx):

1. **Aguardar a limpeza**

   ```bash
   # Garantir que todos os processos pararam
   sleep 5
   ```

2. **Limpar cache do npm**

   ```bash
   npm cache clean --force
   ```

3. **Instalação limpa**
   ```bash
   npx github:CyryxLabs/AEXOS init my-project
   ```

### Restaurar a partir do Backup

```bash
# Restaurar dados salvos
cd my-project

# Restaurar configurações
cp ~/aexos-backup/config.json .aexos/

# Restaurar agentes
cp -r ~/aexos-backup/agents/* ./agents/

# Importar memória
*memory import ~/aexos-backup/memory.zip

# Verificar restauração
*doctor --verify-restore
```

## Checklist de Verificação de Desinstalação

- [ ] Todos os processos AEXOS parados
- [ ] Arquivos do projeto removidos
- [ ] Pacote npm global desinstalado
- [ ] Arquivos de configuração do usuário excluídos
- [ ] Diretórios de cache limpos
- [ ] Variáveis de ambiente removidas
- [ ] Entradas do registro limpas (Windows)
- [ ] Repositório git atualizado
- [ ] Nenhum arquivo AEXOS restante encontrado
- [ ] PATH do sistema atualizado

## Obtendo Ajuda

Se você encontrar problemas durante a desinstalação:

1. **Consulte a Documentação**
   - [FAQ](https://github.com/CyryxLabs/AEXOS/wiki/faq#uninstall)
   - [Resolução de Problemas](https://github.com/CyryxLabs/AEXOS/wiki/troubleshooting)

2. **Suporte da Comunidade**
   - Discord: #uninstall-help
   - GitHub Issues: Rotule com "uninstall"

3. **Suporte de Emergência**
   ```bash
   # Gerar relatório de desinstalação
   npx github:CyryxLabs/AEXOS diagnose --uninstall > uninstall-report.log
   ```

---

**Lembre-se**: Sempre faça backup dos seus dados antes de desinstalar. O processo de desinstalação é irreversível, e a recuperação de dados pode não ser possível sem backups adequados.
