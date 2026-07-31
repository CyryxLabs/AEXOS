---
task: Audit Claude Code Setup
responsavel: "@claude-mastery-chief"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - project_root: Working directory with a .claude/ directory or valid project markers (required)
  - depth: quick — checks 1-3 only, or full — all 8 checks (optional, default full)
  - claude_directory: settings.json, settings.local.json, CLAUDE.md, rules/, agents/, commands/, skills/, mcp.json as present (required, read-only)
  - user_settings: ~/.claude/settings.json, read to detect cross-layer conflicts (optional)
Saida: |
  - check_results: PASS / WARN / FAIL plus points per check, across the 7 scored checks
  - score: Numeric 0-100 total with the per-check breakdown
  - grade: A-F letter from the grade range table
  - directory_findings: Required, recommended and optional .claude/ items present or missing
  - claude_md_assessment: Line count against the 200-line target, structure and @imports usage
  - hook_mcp_rule_agent_inventory: Configured hooks, MCP servers (names only), rule files and agent definitions
  - recommendations: Priority-ordered fixes, each naming the specialist to consult
  - quick_wins: Improvements that can be applied immediately
Checklist:
  - "[ ] Phase 1: .claude/ structure verified and scored against required, recommended and optional items"
  - "[ ] Phase 2: settings.json parsed, schema and Tool(specifier) syntax validated, layer conflicts flagged — executed even in quick mode"
  - "[ ] Phase 3: CLAUDE.md located, line count measured against the 200-line target and structure assessed"
  - "[ ] Phase 4: hooks listed by event, type, matcher and timeout, with recommended hooks checked"
  - "[ ] Phase 5: MCP servers listed with transport and env var names only, and no hardcoded secrets confirmed"
  - "[ ] Phase 6: rules/ coverage assessed, including paths: frontmatter and conditional-loading opportunities"
  - "[ ] Phase 7: agent definitions checked for valid frontmatter, required fields and tool scoping"
  - "[ ] Phase 8: score calculated with breakdown and a grade letter assigned"
  - "[ ] Score capped at 50 or below when settings.json is missing or invalid"
  - "[ ] No file modified and no secret value exposed during the audit"
---

# Task: Audit Claude Code Setup

**Task ID:** CCM-CHIEF-002
**Version:** 1.0.0
**Command:** `*audit`
**Orchestrator:** Orion (claude-mastery-chief)
**Purpose:** Perform a comprehensive audit of the Claude Code setup in the current project, generating a scored report with actionable recommendations.

---

## Overview

```
  +-------------------+     +-------------------+     +-------------------+
  | 1. Directory      | --> | 2. Settings       | --> | 3. CLAUDE.md      |
  |    Structure      |     |    Validation     |     |    Analysis       |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 4. Hooks          | --> | 5. MCP Servers    | --> | 6. Rules          |
  |    Inventory      |     |    Inventory      |     |    Coverage       |
  +-------------------+     +-------------------+     +-------------------+
       |                          |                          |
       v                          v                          v
  +-------------------+     +-------------------+     +-------------------+
  | 7. Agents         | --> | 8. Score &        | --> |    REPORT         |
  |    Definitions    |     |    Recommendations|     |                   |
  +-------------------+     +-------------------+     +-------------------+
```

---

## Inputs

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_root | string | Working directory | Yes | Must contain a .claude/ directory or be a valid project root |
| depth | string | User parameter | No | `quick` (checks 1-3 only) or `full` (default, all 8 checks) |

---

## Preconditions

- Working directory is a project root (has package.json, .git/, or similar project markers)
- Read access to .claude/ directory and its subdirectories
- Read access to project configuration files

---

## Execution Phases

### Phase 1: Check .claude/ Directory Structure

Verify the presence and structure of the .claude/ directory:

```
.claude/
  settings.json          # [REQUIRED] Project-shared settings
  settings.local.json    # [OPTIONAL] Personal local settings (gitignored)
  CLAUDE.md              # [OPTIONAL] Project instructions (alt: ./CLAUDE.md)
  rules/                 # [RECOMMENDED] Conditional rules directory
  agents/                # [OPTIONAL] Custom subagent definitions
  commands/              # [OPTIONAL] Custom slash commands
  skills/                # [OPTIONAL] Skill definitions with SKILL.md
  mcp.json               # [OPTIONAL] MCP server configuration
```

Score each item:
- REQUIRED missing = -20 points
- RECOMMENDED missing = -10 points
- OPTIONAL missing = informational only

### Phase 2: Validate settings.json Schema

1. Read `.claude/settings.json` and parse as JSON
2. Validate the schema structure:
   - `permissions` object exists with `allow`, `deny`, and/or `ask` arrays
   - `permissions.defaultMode` is a valid mode (askAlways, acceptEdits, autoApprove)
   - Permission rules use valid Tool(specifier) syntax
   - No contradicting rules (same pattern in both allow and deny)
3. Check `.claude/settings.local.json` if present (same validation)
4. Check `~/.claude/settings.json` for user-level settings
5. Flag any conflicts between settings layers

### Phase 3: Check CLAUDE.md Quality

1. Locate CLAUDE.md (check: `./CLAUDE.md`, `./.claude/CLAUDE.md`)
2. Measure line count (target: under 200 lines)
3. Check structure:
   - Has markdown headers for organization
   - Uses bullet points for instructions
   - Contains concrete, verifiable instructions (not vague)
4. Check for @imports usage
5. Check for AEXOS-managed sections (if AEXOS project)
6. Flag if over 200 lines without @imports or .claude/rules/ usage

### Phase 4: List Configured Hooks

1. Read hooks configuration from settings.json (`hooks` key)
2. For each hook event, document:
   - Event name (PreToolUse, PostToolUse, etc.)
   - Hook type (command, http, prompt, agent)
   - Matcher pattern (if applicable)
   - Timeout value
3. Check for common recommended hooks:
   - PreToolUse for Bash command validation
   - PreCompact for context preservation
   - Stop for session cleanup
4. If AEXOS project: check for Python hooks in `.aexos-core/monitor/hooks/`

### Phase 5: List MCP Servers

1. Read MCP configuration from `.claude/mcp.json` or settings.json `mcpServers`
2. For each server, document:
   - Server name
   - Transport type (stdio, http, sse)
   - Command or URL
   - Environment variables (names only, not values)
3. Check for common recommended servers (context7, exa, browser)
4. Verify no secrets are hardcoded in committed configuration files

### Phase 6: Check .claude/rules/ Coverage

1. List all files in `.claude/rules/`
2. For each rule file:
   - Check for `paths:` frontmatter (conditional loading)
   - Document the glob patterns if present
   - Measure line count
3. Assess coverage:
   - Are there rules for major directories (src/, tests/, docs/)?
   - Are rules using conditional loading where appropriate?
   - Are there any unconditional rules that should be conditional?

### Phase 7: Check .claude/agents/ Definitions

1. List all files in `.claude/agents/`
2. For each agent file:
   - Verify YAML frontmatter is present and valid
   - Check for required fields (name, description, tools)
   - Measure definition size
3. Check for potential issues:
   - Agents without tool restrictions (too permissive)
   - Agents with overlapping responsibilities
   - Missing agent definitions referenced elsewhere

### Phase 8: Generate Audit Report

Calculate the final score and generate recommendations.

**Scoring System (100 points max):**

| Check | Max Points | Criteria |
|-------|-----------|----------|
| Directory structure | 15 | Required files present, recommended dirs exist |
| Settings validation | 20 | Valid schema, deny-first rules, no conflicts |
| CLAUDE.md quality | 20 | Under 200 lines, well-structured, uses imports |
| Hooks coverage | 15 | At least PreToolUse configured, proper timeouts |
| MCP servers | 10 | Configured and no hardcoded secrets |
| Rules coverage | 10 | Conditional loading used, major dirs covered |
| Agent definitions | 10 | Valid frontmatter, scoped tools |

---

## Output Format

```markdown
## Claude Code Setup Audit Report

**Project:** {project-name}
**Date:** {YYYY-MM-DD}
**Depth:** {quick | full}

### Score: {N}/100 ({GRADE})

| Grade | Range | Meaning |
|-------|-------|---------|
| A | 90-100 | Excellent -- production-ready configuration |
| B | 75-89 | Good -- minor improvements recommended |
| C | 60-74 | Fair -- several gaps to address |
| D | 40-59 | Poor -- significant configuration work needed |
| F | 0-39 | Critical -- minimal or broken setup |

### Check Results

| # | Check | Status | Score | Notes |
|---|-------|--------|-------|-------|
| 1 | Directory Structure | {PASS/WARN/FAIL} | {N}/15 | {notes} |
| 2 | Settings Validation | {PASS/WARN/FAIL} | {N}/20 | {notes} |
| 3 | CLAUDE.md Quality | {PASS/WARN/FAIL} | {N}/20 | {notes} |
| 4 | Hooks Coverage | {PASS/WARN/FAIL} | {N}/15 | {notes} |
| 5 | MCP Servers | {PASS/WARN/FAIL} | {N}/10 | {notes} |
| 6 | Rules Coverage | {PASS/WARN/FAIL} | {N}/10 | {notes} |
| 7 | Agent Definitions | {PASS/WARN/FAIL} | {N}/10 | {notes} |

### Recommendations (Priority Order)

1. **[{severity}]** {recommendation} -- {specialist to consult}
2. ...

### Quick Wins

- {Easy improvement that can be done immediately}
- ...
```

---

## Veto Conditions

- **NEVER** modify any files during the audit. This is a read-only diagnostic task.
- **NEVER** expose secret values (API keys, tokens) found in configuration files. Report their presence but mask values.
- **NEVER** score above 50 if settings.json is missing or invalid -- it is the foundation of Claude Code configuration.
- **NEVER** skip Phase 2 (settings validation) even in quick mode -- it is the most critical check.

---

## Completion Criteria

- [ ] All applicable phases executed (quick: 1-3, full: 1-8)
- [ ] Numeric score calculated with breakdown
- [ ] Grade letter assigned
- [ ] Recommendations listed in priority order
- [ ] No configuration files modified during audit
- [ ] Report generated in specified markdown format
