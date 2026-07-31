---
task: Set Up Repository with Claude Code Integration
responsavel: "@project-integrator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - project_path: Existing writable target directory (required)
  - project_type: monorepo, fullstack, frontend, backend, library or mobile (required)
  - team_size: solo, small (2-5), medium (6-15) or enterprise (15+) (optional)
  - existing_git: Auto-detected from the presence of .git/ (optional)
  - environment: Node.js 18+ on PATH and git configured with user.name and user.email (required precondition)
Saida: |
  - git_repository: Initialized repository with an initial .gitignore, or the noted existing branch and history
  - claude_directory: .claude/ tree with CLAUDE.md, settings.json, settings.local.json, rules/, commands/, skills/ and agent-memory/
  - claude_md: Project context, build and test commands, code standards, file structure, protected files and common patterns, under 150 lines
  - settings_json: permissions.allow for safe operations, permissions.deny for dangerous ones, adapted to the project type
  - rule_files: coding-standards.md, testing.md and git-workflow.md, each with paths: frontmatter
  - hook_templates: Suggested PreToolUse, PostToolUse and Stop configurations, offered rather than force-installed
  - setup_report: Component pass/fail table, CLAUDE.md summary and the next steps
Checklist:
  - "[ ] Phase 1: .git/ checked, repository initialized with a .gitignore if missing, and user.name and user.email validated"
  - "[ ] Phase 2: full .claude/ directory tree created, with .gitkeep for empty optional directories and every creation logged"
  - "[ ] Phase 3: CLAUDE.md generated with the six required sections and kept under 150 lines, domain detail deferred to rules or skills"
  - "[ ] Phase 4: settings.json written with allow and deny lists adapted to the project type"
  - "[ ] Phase 5: coding-standards, testing and git-workflow rule files created with paths: frontmatter"
  - "[ ] Phase 6: hook infrastructure detected and hook templates offered without forcing installation"
  - "[ ] Phase 7: verification run — CLAUDE.md present and under 150 lines, settings.json valid JSON, at least one rule file, git sees the new files"
  - "[ ] An existing CLAUDE.md was not overwritten without user confirmation"
  - "[ ] No destructive command added to the allow list and no workflow-blocking hook configured without opt-in"
  - "[ ] Nothing committed automatically — the user reviews first"
---

# Task: Set Up Repository with Claude Code Integration

**Task ID:** CCM-PI-001
**Version:** 1.0.0
**Command:** `*setup-repository`
**Agent:** Conduit (project-integrator)
**Purpose:** Set up a new repository with complete Claude Code integration from scratch, creating the .claude/ directory structure, CLAUDE.md, settings, rules, and hooks.

---

## Overview

```
  Project Directory
       |
       v
  +------------------+
  | 1. Initialize Git |
  |    (if needed)    |
  +------------------+
       |
       v
  +------------------+
  | 2. Create .claude/|
  |    Directory Tree |
  +------------------+
       |
       v
  +------------------+
  | 3. Generate       |
  |    CLAUDE.md      |
  +------------------+
       |
       v
  +------------------+
  | 4. Configure      |
  |    settings.json  |
  +------------------+
       |
       v
  +------------------+
  | 5. Set Up Rules   |
  |    (.claude/rules)|
  +------------------+
       |
       v
  +------------------+
  | 6. Configure Hooks|
  |    (optional)     |
  +------------------+
       |
       v
  +------------------+
  | 7. Verify Setup   |
  +------------------+
```

---

## Inputs

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_path | string | User | Yes | Must be valid directory path |
| project_type | enum | User | Yes | `monorepo`, `fullstack`, `frontend`, `backend`, `library`, `mobile` |
| team_size | enum | User | No | `solo`, `small` (2-5), `medium` (6-15), `enterprise` (15+) |
| existing_git | boolean | Detection | No | Auto-detected from .git/ presence |

---

## Preconditions

- Target directory exists and is writable
- Node.js 18+ available on PATH
- Git installed and configured with user.name and user.email

---

## Execution Phases

### Phase 1: Initialize Git Repository

1. Check if `.git/` directory exists in target path
2. If missing, run `git init` and create initial `.gitignore`
3. If present, note current branch and recent history for context
4. Validate git config has user.name and user.email set

**Skip condition:** Git already initialized.

### Phase 2: Create .claude/ Directory Structure

Create the complete directory tree:

```
.claude/
  CLAUDE.md
  settings.json
  settings.local.json    # gitignored template
  rules/                 # contextual rules
  commands/              # slash commands (optional)
  skills/                # skill definitions (optional)
  agent-memory/          # persistent memory (optional)
```

For each directory:
1. Create directory if not present
2. Add `.gitkeep` for empty optional directories
3. Record creation in output log

### Phase 3: Generate CLAUDE.md

Generate a project-specific CLAUDE.md following best practices:

1. **Project Context** (1-2 lines): what the project is, primary language/framework
2. **Build & Test Commands**: exact commands for `dev`, `build`, `test`, `lint`, `typecheck`
3. **Code Standards**: naming conventions, import style, error handling pattern
4. **File Structure**: key directories and their purpose (5-10 entries)
5. **Protected Files**: files that should never be modified by AI
6. **Common Patterns**: 2-3 code snippets showing project conventions

**Constraints:**
- Keep under 150 lines total
- Only universally applicable content
- Domain-specific knowledge goes in rules/ or skills/

### Phase 4: Configure settings.json

Create `.claude/settings.json` with:

1. **permissions.allow**: safe operations for the project type
   - Build commands, test commands, lint commands
   - File read/write within project scope
2. **permissions.deny**: dangerous operations
   - `rm -rf /`, `git push --force`, production database access
   - Framework-protected paths if using AEXOS
3. **rules**: path-based rule loading configuration

Adapt permissions based on `project_type`:
- `monorepo`: include workspace-aware commands
- `fullstack`: include both frontend and backend build tools
- `library`: include publish-related deny rules

### Phase 5: Set Up Initial Rules

Create rule files in `.claude/rules/`:

1. **coding-standards.md**: language-specific conventions detected from project
2. **testing.md**: test patterns and requirements (framework-specific)
3. **git-workflow.md**: branch naming, commit conventions, PR template guidance

Each rule file includes `paths:` frontmatter for contextual loading:
```yaml
---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---
```

### Phase 6: Configure Hooks (Optional)

If user wants automation hooks:

1. Detect available hook infrastructure (pre-commit, husky, lefthook)
2. Create `.claude/hooks/` directory if using Claude Code hooks
3. Suggest hook configurations for:
   - `PreToolUse`: command validation (block dangerous patterns)
   - `PostToolUse`: logging and metrics
   - `Stop`: session summary generation
4. Provide hook templates, do not force-install

### Phase 7: Verify Setup

Run verification checks:

1. Confirm `.claude/CLAUDE.md` exists and is under 150 lines
2. Confirm `.claude/settings.json` is valid JSON
3. Confirm rules/ directory has at least one rule file
4. Test that git status recognizes new files
5. Generate setup report with pass/fail per component

---

## Output Format

```markdown
## Repository Setup Report

**Project:** {project_path}
**Type:** {project_type}
**Date:** {YYYY-MM-DD}

### Components Created

| Component | Status | Path |
|-----------|--------|------|
| .claude/CLAUDE.md | PASS | .claude/CLAUDE.md |
| settings.json | PASS | .claude/settings.json |
| Rules | PASS | .claude/rules/ (N files) |
| Hooks | SKIP/PASS | .claude/hooks/ |

### CLAUDE.md Summary
- Lines: {N}/150
- Sections: {list}

### Next Steps
1. Review CLAUDE.md and adjust project context
2. Run `claude` to test the integration
3. Consider adding skills with `*create-skill`
```

---

## Veto Conditions

- **NEVER** overwrite an existing CLAUDE.md without user confirmation
- **NEVER** add allow rules for destructive commands (rm -rf, drop database)
- **NEVER** configure hooks that block workflow without explicit opt-in
- **NEVER** commit generated files automatically -- let user review first

---

## Completion Criteria

- [ ] .claude/ directory structure created
- [ ] CLAUDE.md generated under 150 lines with project-specific content
- [ ] settings.json configured with appropriate permissions
- [ ] At least one rule file created in .claude/rules/
- [ ] Verification checks all pass
- [ ] Setup report presented to user
