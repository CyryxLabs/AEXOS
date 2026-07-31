# AEXOS (Cyryx Labs) — Strategic Architectural Roadmap

An actionable engineering and product blueprint for evolving **AEXOS / MAAX Studio & Protocol** into the market-leading enterprise AI Execution OS.

---

## 1. Autonomous Execution & Self-Healing Agent Mesh

### 🤖 Self-Healing Autopsy & Reincarnation Engine
- **Concept:** When unit tests, typechecks, or builds fail during agent execution, trigger an automated **Autopsy Loop**.
- **Implementation:** The framework captures stack traces, git diffs, and AST changes, analyzes the root cause, generates a minimal targeted fix patch, and re-executes quality gates without human intervention.
- **CLI Command:** `aexos heal` or `aexos sdc run --auto-fix`

### 🔀 Dynamic Multi-Model MoE Routing (Margin Governor)
- **Concept:** Route sub-tasks dynamically to the optimal model based on task complexity, cost, and latency thresholds.
- **Routing Logic:**
  - Complex System Architecture & Spec Review: **Claude 3.7 Sonnet** / **GPT-o3-mini**
  - High-Volume Code Generation: **GPT-4o** / **Claude 3.5 Haiku**
  - Logic Verification & Security Audits: **DeepSeek-R1**
- **Impact:** Reduces LLM API costs by up to 60% while improving reasoning depth on complex tasks.

---

## 2. Enterprise Governance, Security & Audit Layer

### 🔒 Cryptographic Mission Ledger
- **Concept:** Immutable execution telemetry for SOC2 and ISO27001 compliance.
- **Implementation:** Append-only JSONL ledger (`.aexos/mission-ledger.jsonl`) recording every agent prompt, file mutation, tool call, model used, cost incurred, and quality gate signature with SHA-256 hashes.

### 🛡️ Policy-as-Code Quality Gates (OPA Integration)
- **Concept:** Allow security and platform engineering teams to write declarative rules enforcing organizational standards.
- **Rules Example:** Prevent merging PRs with unvetted npm packages, secret leaks, breaking API schema changes, or missing TDD test coverage.

---

## 3. Universal MCP Architecture & Studio GUI

### 🔌 Background Daemon & Universal MCP Server (`cyryxd`)
- **Concept:** Expose AEXOS as a lightweight background daemon running a native **Model Context Protocol (MCP)** server.
- **Impact:** Enables instant zero-config integration with any IDE supporting MCP (VS Code, JetBrains, Cursor, Claude Desktop, Windsurf, Zed, Neovim).

### 📊 MAAX Studio Live Web Workbench
- **Concept:** Local web-based control panel launched via `aexos studio`.
- **Features:**
  - **Live SSE Event Timeline:** Real-time visual monitoring of active agent swarms.
  - **Atlas Graph Visualizer:** Interactive 3D/2D node visualizer for codebase dependencies and rules.
  - **Human-in-the-Loop Gateway:** One-click approval interface for risky file changes or budget thresholds.

---

## 4. Ecosystem & Squad Marketplace (Cyryx Hub)

### 📦 Decentralized Squad Registry (`@aexos-squads/*`)
- **Concept:** npm-like registry for sharing domain-specific agent teams.
- **CLI Commands:**
  - `aexos squad install @aexos-squads/solidity-audit`
  - `aexos squad install @aexos-squads/aws-infra`
  - `aexos squad publish ./my-squad`

### ⚡ Automated Documentation-to-Squad Generator
- **Concept:** Feed any API documentation URL or OpenAPI spec to `@squad-creator` to automatically generate a custom agent squad complete with system prompts, function schemas, and validation checklists.

---

## 5. Parallel Execution & CI/CD Native Automation

### 🌲 Multi-Agent Git Worktree Parallel Engine
- **Concept:** Execute multiple independent stories simultaneously in isolated git worktrees.
- **Impact:** Enables 4x-10x throughput by letting `@dev` agents work on non-conflicting feature branches in parallel (`aexos sdc run --parallel 4`).

### 🐙 Native GitHub Action Runner (`CyryxLabs/aexos-action`)
- **Concept:** Reusable GitHub Action that automates PR reviews, TDD verification, security scanning, and automated fix suggestions on every pull request.

---

## Evolution Summary Matrix

| Horizon | Focus Area | Key Deliverables |
|---|---|---|
| **Phase 1 (Immediate)** | Universal Protocol & MCP Daemon | `cyryxd` daemon, expanded MCP tools, GitHub Action `CyryxLabs/aexos-action` |
| **Phase 2 (Mid-Term)** | Self-Healing & Parallel Worktrees | Autopsy loop, `git worktree` parallel runner, dynamic MoE cost router |
| **Phase 3 (Long-Term)** | Cyryx Hub & Studio GUI | Squad Marketplace (`aexos squad publish`), 3D Atlas Graph UI, Cryptographic Ledger |
