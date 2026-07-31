---
task: Setup Wizard
responsavel: "@claude-mastery-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - project_root: Valid, writable project root directory (required)
  - mode: guided — interactive, or express — smart defaults (optional, default guided)
  - preset: Project type override — monorepo, fullstack, library, api, cli (optional)
  - existing_claude_dir: Must be absent, or the user must confirm overwrite (required precondition)
  - user_answers: Responses on automation needs, MCP capabilities and custom subagents (required in guided mode)
Saida: |
  - detected_type: The project type from the marker and structure matrix, confirmed by the user
  - claude_md: .claude/CLAUDE.md with overview, commands, standards, testing and architecture, under 200 lines
  - settings_json: deny rules for sensitive files, allow rules for the project type, and defaultMode from the type matrix
  - rule_files: Conditional rules for api, tests, components and database with paths: frontmatter, plus one unconditional rule
  - hooks_config: Hook entries generated from the user's automation answers, or express-mode defaults
  - mcp_json: .claude/mcp.json with the selected servers and their setup instructions
  - agent_files: .claude/agents/ starter subagents with YAML frontmatter, when requested
  - setup_summary: Files created with line counts, the configuration summary and the next steps
Checklist:
  - "[ ] Phase 1: project markers and structure analysed, type resolved via the project type matrix, and the result confirmed with the user"
  - "[ ] Phase 2: CLAUDE.md generated with the five type-appropriate sections, @imports used for large references, kept under 200 lines"
  - "[ ] Phase 3: settings.json created with deny rules, type-appropriate allow rules and the defaultMode from the matrix"
  - "[ ] Phase 3: AEXOS L1-L4 boundary deny rules added when .aexos-core/ is present"
  - "[ ] Phase 4: conditional rules generated for the structures that exist, each with paths: frontmatter, plus one project-wide rule"
  - "[ ] Phase 5: automation needs elicited and hook configuration generated, or express defaults applied"
  - "[ ] Phase 6: MCP capabilities elicited, .claude/mcp.json written and per-server setup instructions supplied"
  - "[ ] Phase 7: starter subagents created with valid frontmatter when requested"
  - "[ ] Existing .claude/ configuration not overwritten without explicit confirmation, and no real secret placed in generated files"
  - "[ ] bypassPermissions not used as the default mode, and the type detection confirmation step not skipped even in express mode"
---

# Task: Setup Wizard

**Task ID:** CCM-CHIEF-003
**Version:** 1.0.0
**Command:** `*setup-wizard`
**Orchestrator:** Orion (claude-mastery-chief)
**Purpose:** Interactive wizard to set up Claude Code for a new or existing project, generating all required configuration files tailored to the detected project type.

---

## Overview

```
  +------------------+     +------------------+     +------------------+
  | 1. Detect        | --> | 2. Generate      | --> | 3. Configure     |
  |    Project Type  |     |    CLAUDE.md     |     |    settings.json |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+     +------------------+
  | 4. Create        | --> | 5. Configure     | --> | 6. Set Up        |
  |    .claude/rules |     |    Hooks         |     |    MCP Servers   |
  +------------------+     +------------------+     +------------------+
       |                                                    |
       v                                                    v
  +------------------+     +------------------+
  | 7. Create        | --> |    COMPLETE      |
  |    Agents (opt.) |     |    Summary       |
  +------------------+     +------------------+
```

---

## Inputs

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_root | string | Working directory | Yes | Must be a valid directory |
| mode | string | User parameter | No | `guided` (default, interactive) or `express` (smart defaults) |
| preset | string | User parameter | No | Project type override (monorepo, fullstack, library, api, cli) |

---

## Preconditions

- Working directory is a project root
- Write access to the project directory
- No existing .claude/ directory (or user confirms overwrite)

---

## Execution Phases

### Phase 1: Detect Project Type

Analyze the project to determine its type:

1. Check for project markers:
   - `package.json` -> Node.js project; check for `workspaces` field (monorepo)
   - `next.config.*` -> Next.js fullstack
   - `vite.config.*` -> Vite frontend
   - `tsconfig.json` -> TypeScript project
   - `pyproject.toml` / `setup.py` -> Python project
   - `Cargo.toml` -> Rust project
   - `go.mod` -> Go project
   - `.aexos-core/` -> AEXOS-managed project
2. Detect project structure:
   - `src/app/` or `app/` -> App Router (Next.js)
   - `src/pages/` -> Pages Router
   - `packages/` or `apps/` -> Monorepo
   - `src/lib/` or `lib/` -> Library
   - `src/api/` or `server/` -> API backend
3. Present detection result and ask user to confirm or override

**Project Type Matrix:**

| Type | Markers | Default Permission Mode |
|------|---------|------------------------|
| monorepo | workspaces, packages/ | acceptEdits |
| fullstack | next.config, app/ + api/ | acceptEdits |
| frontend | vite.config, src/components | acceptEdits |
| api | server/, express/fastify dep | acceptEdits |
| library | main/module in package.json | askAlways |
| cli | bin/ field in package.json | askAlways |
| python | pyproject.toml, src/ | acceptEdits |
| cyryx | .aexos-core/ directory | acceptEdits |

### Phase 2: Generate CLAUDE.md

1. Create `.claude/CLAUDE.md` (or `./CLAUDE.md` based on user preference)
2. Include sections based on project type:
   - **Project overview**: Name, description, tech stack
   - **Development commands**: Build, test, lint, dev server
   - **Code standards**: Naming conventions, patterns, file organization
   - **Testing**: Test framework, coverage requirements, how to run
   - **Architecture notes**: Key directories and their purpose
3. Use @imports for large reference documents
4. Target: under 200 lines
5. If AEXOS project: include AEXOS-specific sections (agent system, workflows)

### Phase 3: Configure settings.json

1. Create `.claude/settings.json` with:
   - **permissions.deny**: Sensitive files (.env, secrets/, credentials)
   - **permissions.allow**: Safe development operations based on project type
   - **permissions.defaultMode**: Based on project type matrix
2. Add project-specific rules:
   - Monorepo: allow Read/Edit across all packages
   - Frontend: allow Bash(npm run dev), Bash(npm run build)
   - API: deny external network calls by default
   - Library: stricter permissions (askAlways)
3. If AEXOS project: add L1-L4 boundary protection deny rules

### Phase 4: Set Up .claude/rules/

1. Create `.claude/rules/` directory
2. Generate conditional rules based on project structure:
   - **api-rules.md**: API conventions (if src/api/ or server/ exists)
     - `paths: ["src/api/**", "server/**"]`
   - **test-rules.md**: Testing conventions (if tests/ or __tests__/ exists)
     - `paths: ["tests/**", "**/*.test.*", "**/*.spec.*"]`
   - **component-rules.md**: Component patterns (if src/components/ exists)
     - `paths: ["src/components/**", "**/*.tsx"]`
   - **database-rules.md**: Migration patterns (if migrations/ or supabase/ exists)
     - `paths: ["migrations/**", "supabase/**"]`
3. Create one unconditional rule for project-wide conventions

### Phase 5: Configure Hooks

1. Ask the user about their automation needs:
   - Pre-commit validation? (lint, format, type check)
   - Command safety? (block dangerous bash commands)
   - Session logging? (track tool usage)
   - Compaction preservation? (save context before auto-compaction)
2. Generate hook configuration based on answers:
   ```json
   {
     "hooks": {
       "PreToolUse": [{
         "matcher": "Bash",
         "hooks": [{ "type": "command", "command": "...", "timeout": 10 }]
       }],
       "PreCompact": [{
         "hooks": [{ "type": "command", "command": "...", "timeout": 5 }]
       }]
     }
   }
   ```
3. For express mode: apply sensible defaults (PreToolUse bash guard + PreCompact)

### Phase 6: Set Up MCP Servers

1. Ask the user which capabilities they need:
   - Web search (Exa)
   - Library documentation (Context7)
   - Browser automation (Playwright)
   - Database access (Supabase, Postgres)
   - File system extended access
2. Generate `.claude/mcp.json` with selected servers
3. Provide setup instructions for each server (install commands, API keys needed)
4. For express mode: configure Context7 (most universally useful)

### Phase 7: Create Agents (Optional)

1. Ask if the user needs custom subagents
2. If yes, create `.claude/agents/` directory with starter agents:
   - **reviewer.md**: Code review agent with Read-only tools
   - **planner.md**: Planning agent with limited scope
3. Each agent gets proper YAML frontmatter:
   ```yaml
   ---
   name: Reviewer
   description: Code review specialist
   tools: [Read, Grep, Glob]
   ---
   ```
4. For express mode: skip unless user explicitly requests

---

## Output Format

```markdown
## Setup Complete

**Project:** {project-name}
**Type:** {detected-type}
**Mode:** {guided | express}

### Files Created

| File | Purpose | Lines |
|------|---------|-------|
| .claude/CLAUDE.md | Project instructions | {N} |
| .claude/settings.json | Permissions and config | {N} |
| .claude/rules/{name}.md | Conditional rule | {N} |
| ... | ... | ... |

### Configuration Summary

- **Permission mode:** {defaultMode}
- **Deny rules:** {count} rules protecting sensitive files
- **Allow rules:** {count} rules for development operations
- **Hooks:** {count} hooks configured ({event names})
- **MCP servers:** {count} servers ({names})
- **Custom agents:** {count} agents ({names})

### Next Steps

1. Review .claude/settings.json and adjust permissions
2. Customize CLAUDE.md with project-specific instructions
3. Run `*audit` to verify the setup scores well
4. {Additional steps based on project type}
```

---

## Veto Conditions

- **NEVER** overwrite existing .claude/ configuration without explicit user confirmation. Always ask first.
- **NEVER** include real API keys, tokens, or secrets in generated configuration files. Use placeholder values with comments.
- **NEVER** set `bypassPermissions` as the default mode. Start with `acceptEdits` or `askAlways`.
- **NEVER** create a CLAUDE.md over 200 lines. Split into @imports and .claude/rules/ if content exceeds the limit.
- **NEVER** skip the project type detection confirmation step, even in express mode.

---

## Completion Criteria

- [ ] Project type detected and confirmed
- [ ] CLAUDE.md generated under 200 lines
- [ ] settings.json created with deny-first permission rules
- [ ] At least one .claude/rules/ file created with paths: frontmatter
- [ ] Hooks configured (at minimum in guided mode)
- [ ] MCP servers section addressed (configured or explicitly skipped)
- [ ] Setup summary displayed with file list and next steps
