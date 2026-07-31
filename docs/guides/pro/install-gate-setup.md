# AEXOS Pro — Guia de Instalacao e Licenciamento

Guia completo para instalar, ativar e gerenciar o AEXOS Pro.

**Story:** PRO-6 — License Key & Feature Gating System

---

## Visão Geral

O AEXOS Pro é distribuído por um canal autenticado. O instalador valida a **licença ativa**, solicita uma URL assinada de curta duração ao serviço/repo histórico `aexos-license-server` (mantido sob branding AEXOS) e instala o artefato premium verificado no projeto.

```text
Comprar Licença -> Validar -> Baixar artefato assinado -> Usar Features Pro
```

### Pacotes npm

| Pacote | Tipo | Propósito |
|--------|------|-----------|
| `@aexos-squads/aexos-pro-cli` | CLI | Comandos de recuperação e compatibilidade |
| `@aexos-squads/pro` | Artefato premium | Pacote Pro canônico, entregue ao cliente pelo artifact broker autenticado |

---

## Instalacao Rapida

```bash
# Instalar AEXOS Pro (instala o pacote Pro compatível automaticamente)
npx github:CyryxLabs/AEXOS pro setup

# Ativar sua licença por chave legada
npx github:CyryxLabs/AEXOS pro activate --key PRO-XXXX-XXXX-XXXX-XXXX

# Verificar ativação
npx github:CyryxLabs/AEXOS pro status
```

---

## Passo a Passo

### Pré-requisitos

- Node.js >= 18
- `@aexos-squads/core` >= 5.1.17 instalado no projeto

### Passo 1: Instalar AEXOS Pro

```bash
npx github:CyryxLabs/AEXOS pro setup
```

Isso valida sua licença e instala o artefato canônico `@aexos-squads/pro` no projeto. O cliente não precisa de acesso direto ao pacote privado/restrito no npm.

**Se você já tem o artefato Pro instalado por outro fluxo autorizado**, rode novamente o bootstrap para revalidar e re-scaffoldar o conteúdo Pro:

```bash
npx github:CyryxLabs/AEXOS pro setup
```

### Passo 2: Ativar Licenca

Apos a compra, voce recebera uma chave no formato `PRO-XXXX-XXXX-XXXX-XXXX`.

```bash
npx github:CyryxLabs/AEXOS pro activate --key PRO-XXXX-XXXX-XXXX-XXXX
```

Esse comando:
1. Valida a chave contra o License Server (`https://aexos-license-server.vercel.app`)
2. Registra sua maquina (machine ID unico)
3. Salva um cache local criptografado para uso offline

### Passo 3: Verificar

```bash
# Status da licenca
npx github:CyryxLabs/AEXOS pro status

# Listar features disponiveis
npx github:CyryxLabs/AEXOS pro features
```

---

## Comandos Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npx github:CyryxLabs/AEXOS pro setup` | Instala o pacote AEXOS Pro compatível no projeto |
| `npx github:CyryxLabs/AEXOS pro activate --key KEY` | Ativa uma chave de licença |
| `npx github:CyryxLabs/AEXOS pro status` | Mostra status da licença atual |
| `npx github:CyryxLabs/AEXOS pro features` | Lista todas as features Pro e disponibilidade |
| `npx github:CyryxLabs/AEXOS pro validate` | Força revalidação online da licença |
| `npx github:CyryxLabs/AEXOS pro deactivate` | Desativa a licença nesta máquina |
| `npx github:CyryxLabs/AEXOS pro help` | Mostra todos os comandos |

---

## Operacao Offline

Apos a instalacao e ativacao, o AEXOS Pro funciona offline:

- **30 dias** sem necessidade de revalidacao
- **7 dias de grace period** apos expirar o cache
- Verificacao de features 100% local no dia a dia

A internet so e necessaria para:
1. Ativação inicial (`npx github:CyryxLabs/AEXOS pro activate`)
2. Revalidacao periodica (automatica a cada 30 dias)
3. Desativação (`npx github:CyryxLabs/AEXOS pro deactivate`)

---

## CI/CD

Para pipelines, instale e ative usando secrets de ambiente:

**GitHub Actions:**
```yaml
- name: Install AEXOS Pro
  run: npx github:CyryxLabs/AEXOS pro setup

- name: Activate License
  run: npx github:CyryxLabs/AEXOS pro activate --key ${{ secrets.AEXOS_PRO_LICENSE_KEY }}
```

**GitLab CI:**
```yaml
before_script:
  - npx github:CyryxLabs/AEXOS pro setup
  - npx github:CyryxLabs/AEXOS pro activate --key ${AEXOS_PRO_LICENSE_KEY}
```

---

## Troubleshooting

### Chave de licenca invalida

```
License activation failed: Invalid key format
```

- Verifique o formato: `PRO-XXXX-XXXX-XXXX-XXXX` (4 blocos de 4 caracteres hex)
- Sem espacos extras
- Abra uma issue em https://github.com/CyryxLabs/AEXOS/issues se a chave foi fornecida a voce

### Maximo de seats excedido

```
License activation failed: Maximum seats exceeded
```

- Desative a licença na outra máquina: `npx github:CyryxLabs/AEXOS pro deactivate`
- Ou contate support para aumentar o limite de seats

### Erro de rede na ativacao

```
License activation failed: ECONNREFUSED
```

- Verifique sua conexao com a internet
- O License Server pode estar temporariamente indisponivel
- Tente novamente em alguns minutos

---

## Arquitetura do Sistema

```
┌─────────────────┐     ┌─────────────────────────────────┐     ┌──────────┐
│  Cliente (CLI)   │────>│  License Server (Vercel)        │────>│ Supabase │
│  aexos pro        │<────│  aexos-license-server.vercel.app │<────│ Database │
└─────────────────┘     └─────────────────────────────────┘     └──────────┘
                                                                      │
                                                                      │
                        ┌─────────────────────────────────┐           │
                        │  Admin Dashboard (Vercel)       │───────────┘
                        │  aexos-license-dashboard         │
                        │  Cria/revoga/gerencia licencas  │
                        └─────────────────────────────────┘
```

| Componente | URL | Proposito |
|-----------|-----|-----------|
| License Server | `https://aexos-license-server.vercel.app` | API de ativacao/validacao |
| Admin Dashboard | `https://aexos-license-dashboard.vercel.app` | Gestao de licencas (admin) |
| Database | Supabase PostgreSQL | Armazena licencas e ativacoes |

---

## Suporte

- **Documentacao:** https://cyryx.ai/pro/docs
- **Comprar:** https://cyryx.ai/pro
- **Suporte:** https://github.com/CyryxLabs/AEXOS/issues
- **Issues:** https://github.com/CyryxLabs/AEXOS/issues

---

*AEXOS Pro Installation Guide v3.0*
*Story PRO-6 — License Key & Feature Gating System*
