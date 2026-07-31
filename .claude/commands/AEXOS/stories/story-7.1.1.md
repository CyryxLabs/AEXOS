# Story 7.1.1: Bootstrap /dev Workspace — aexos-dashboard Clone

**Story ID:** 7.1.1  
**Epic:** Epic-7 - Dashboard Workspace Integration  
**Wave:** Wave 1 (Foundation)  
**Status:** ⌛ In Progress
**Priority:** 🔴 High  
**Owner:** Architect (Vega) → Dev (Vulcan)  
**Created:** 2026-05-05  
**Updated:** 2026-05-05

---

## 📋 Objective

Configurar `/dev` como monorepo pai com `aexos-core` e `aexos-dashboard` como projetos irmãos.  
O dashboard observa dados do aexos-core via Supabase (read-only). Sem workspace hoisting — projetos independentes.

---

## 🎯 Story

**As a** desenvolvedor CYRYX,  
**I want** o `aexos-dashboard` clonado em `C:\dev\aexos-dashboard` com um root `package.json` de conveniência em `C:\dev\`,  
**So that** posso rodar e desenvolver CLI + Dashboard em paralelo no mesmo workspace.

---

## ✅ Acceptance Criteria

- [x] `C:\dev\aexos-dashboard\` existe com clone do repositório `CyryxLabs/aexos-dashboard`
- [x] `C:\dev\package.json` existe com scripts de conveniência (`dev`, `dev:core`, `dev:dashboard`, `lint`, `test`)
- [x] `C:\dev\.gitignore` existe cobrindo `node_modules`, `.env`, lock files dos dois projetos
- [x] `C:\dev\aexos-dashboard\.env.local` criado a partir do `.env.example` do dashboard
- [ ] Variáveis Supabase alinhadas entre `aexos-core` e `aexos-dashboard` — **pendente: preencher credenciais**
- [x] `cd C:\dev\aexos-dashboard && npm install` completa sem erros (bun não instalado, npm usado como fallback)
- [ ] Dashboard roda localmente (`npm run dev`) com acesso ao Supabase configurado — **pendente: credenciais Supabase**

---

## 📐 Scope

**IN:**
- Clone do repositório aexos-dashboard
- Root `package.json` com scripts only (sem workspace hoisting)
- Alinhamento de variáveis de ambiente Supabase
- `.gitignore` raiz

**OUT:**
- Unificação de workspaces npm (risco CJS/ESM)
- Rename de namespace `@cyryx/` → `@cyryx/` (Story 7.1.2)
- Integração de dados Supabase (Story 7.1.3)
- CI/CD para o dashboard (Story 7.1.4)

---

## 🔗 Dependencies

- `aexos-core` já configurado em `C:\dev\aexos-core\`
- Bun não instalado; npm usado como fallback
- Credenciais Supabase disponíveis em `C:\dev\aexos-core\.env`

---

## 📁 File List

- [x] `C:\dev\package.json` — root workspace scripts
- [x] `C:\dev\.gitignore` — root gitignore
- [x] `C:\dev\aexos-dashboard\` — clone do repositório (1358 arquivos)
- [x] `C:\dev\aexos-dashboard\.env.local` — env local do dashboard (Supabase vars aguardando preenchimento)

---

## 📝 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-05 | Vega (@architect) | Story criada em YOLO mode |
