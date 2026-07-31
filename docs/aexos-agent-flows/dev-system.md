# @dev Agent System

> **Version:** 1.0.0
> **Created:** 2026-02-04
> **Owner:** @dev (Vulcan - The Builder)
> **Status:** Official Documentation

---

## Overview

The **@dev (Vulcan)** agent is the AEXOS Full Stack Developer, responsible for story implementation, debugging, refactoring and applying development best practices. This agent acts as a **Builder** that implements stories precisely, updates only the authorized sections of story files and maintains comprehensive tests.

### Key Characteristics

| Characteristic | Description |
|----------------|-----------|
| **Persona** | Vulcan - The Builder |
| **Archetype** | Builder / Aquarius |
| **Tone** | Pragmatic, concise, solution-oriented |
| **Focus** | Story implementation, tests, code quality |
| **Closing** | "-- Vulcan, always building" |

### Characteristic Vocabulary

- Build
- Implement
- Refactor
- Resolve
- Optimize
- Debug
- Test

---

## Complete File List

### @dev Core Task Files

| File | Command | Purpose |
|---------|---------|-----------|
| `.aexos-core/development/tasks/dev-develop-story.md` | `*develop {story-id}` | Main task - develops a complete story with YOLO/Interactive/Pre-flight modes |
| `.aexos-core/development/tasks/dev-improve-code-quality.md` | `*improve-code-quality <path>` | Improves code quality (formatting, linting, modern-syntax) |
| `.aexos-core/development/tasks/dev-optimize-performance.md` | `*optimize-performance <path>` | Analyzes and optimizes code performance |
| `.aexos-core/development/tasks/dev-suggest-refactoring.md` | `*suggest-refactoring <path>` | Suggests automated refactoring opportunities |
| `.aexos-core/development/tasks/dev-backlog-debt.md` | `*backlog-debt` | Records technical debt in the backlog |
| `.aexos-core/development/tasks/apply-qa-fixes.md` | `*apply-qa-fixes` | Applies fixes based on QA feedback |
| `.aexos-core/development/tasks/execute-checklist.md` | `*execute-checklist` | Validates documentation using checklists |
| `.aexos-core/development/tasks/validate-next-story.md` | `*validate-story-draft` | Validates story quality and completeness |
| `.aexos-core/development/tasks/sync-documentation.md` | `*sync-documentation` | Syncs documentation with code changes |
| `.aexos-core/development/tasks/po-manage-story-backlog.md` | (used internally) | Manages the story backlog |

### Agent Definition Files

| File | Purpose |
|---------|-----------|
| `.aexos-core/development/agents/dev.md` | Core definition of the @dev agent (persona, commands, workflows) |
| `.claude/commands/AEXOS/agents/dev.md` | Claude Code command to activate @dev |

### Checklist Files Used by @dev

| File | Purpose |
|---------|-----------|
| `.aexos-core/product/checklists/story-dod-checklist.md` | Definition of Done for stories |
| `.aexos-core/product/checklists/pre-push-checklist.md` | Pre-push checklist |
| `.aexos-core/product/checklists/change-checklist.md` | Change validation |

### Related Files from Other Agents

| File | Agent | Purpose |
|---------|--------|-----------|
| `.aexos-core/development/tasks/qa-backlog-add-followup.md` | @qa | QA adds follow-ups to the backlog |
| `.aexos-core/development/tasks/qa-review-story.md` | @qa | QA reviews the @dev implementation |
| `.aexos-core/development/tasks/github-devops-pre-push-quality-gate.md` | @github-devops | Pre-push quality gate |
| `.aexos-core/development/tasks/sm-create-next-story.md` | @sm | Scrum Master creates stories for @dev |

### Workflow Files That Use @dev

| File | Purpose |
|---------|-----------|
| `.aexos-core/development/workflows/brownfield-fullstack.yaml` | Brownfield full-stack workflow |
| `.aexos-core/development/workflows/brownfield-service.yaml` | Brownfield service workflow |
| `.aexos-core/development/workflows/brownfield-ui.yaml` | Brownfield UI workflow |
| `.aexos-core/development/workflows/greenfield-fullstack.yaml` | Greenfield full-stack workflow |
| `.aexos-core/development/workflows/greenfield-service.yaml` | Greenfield service workflow |
| `.aexos-core/development/workflows/greenfield-ui.yaml` | Greenfield UI workflow |

---

## Flowchart: Complete @dev System

```mermaid
flowchart TB
    subgraph ACTIVATION["AGENT ACTIVATION"]
        A["@dev"] --> B["Unified Activation Pipeline<br/>(unified-activation-pipeline.js)"]
        B --> C["Loads devLoadAlwaysFiles"]
        C --> D["Displays Quick Commands"]
        D --> E["HALT - Waits for User"]
    end

    subgraph DEVELOPMENT["DEVELOPMENT CYCLE"]
        E --> F{"Command Received"}

        F -->|"*develop {id}"| G["dev-develop-story.md"]
        F -->|"*run-tests"| H["Runs Tests"]
        F -->|"*apply-qa-fixes"| I["apply-qa-fixes.md"]
        F -->|"*backlog-debt"| J["dev-backlog-debt.md"]
        F -->|"*improve-code-quality"| K["dev-improve-code-quality.md"]
        F -->|"*optimize-performance"| L["dev-optimize-performance.md"]
        F -->|"*suggest-refactoring"| M["dev-suggest-refactoring.md"]
    end

    subgraph DEVELOP_STORY["TASK: develop-story"]
        G --> N{"Execution Mode?"}

        N -->|"YOLO"| O["Autonomous Mode<br/>(0-1 prompts)"]
        N -->|"Interactive"| P["Interactive Mode<br/>(5-10 prompts)"]
        N -->|"Pre-flight"| Q["Upfront<br/>Planning"]

        O --> R["Implement Tasks"]
        P --> R
        Q --> R

        R --> S["Write Tests"]
        S --> T["Run Validations"]
        T --> U{"All Pass?"}

        U -->|"Yes"| V["Mark [x] Task"]
        U -->|"No"| W["Fix Issues"]
        W --> T

        V --> X["Update File List"]
        X --> Y{"More Tasks?"}

        Y -->|"Yes"| R
        Y -->|"No"| Z["CodeRabbit Self-Healing"]
    end

    subgraph COMPLETION["COMPLETION"]
        Z --> AA{"CRITICAL Issues?"}
        AA -->|"Yes"| AB["Auto-fix<br/>(max 2 iterations)"]
        AB --> AA
        AA -->|"No"| AC["Execute story-dod-checklist"]
        AC --> AD["Set Status:<br/>Ready for Review"]
        AD --> AE["HALT"]
    end

    subgraph COLLABORATION["COLLABORATION"]
        AE --> AF["@github-devops<br/>(git push, PR)"]
        AE --> AG["@qa<br/>(Review)"]
        AG -->|"Issues"| I
    end

    style ACTIVATION fill:#e3f2fd
    style DEVELOPMENT fill:#e8f5e9
    style DEVELOP_STORY fill:#fff8e1
    style COMPLETION fill:#f3e5f5
    style COLLABORATION fill:#fce4ec
```

### Execution Modes Diagram

```mermaid
stateDiagram-v2
    [*] --> ModeSelection: *develop {story-id} [mode]

    ModeSelection --> YOLO: mode=yolo
    ModeSelection --> Interactive: mode=interactive (default)
    ModeSelection --> PreFlight: mode=preflight

    state YOLO {
        Y1: Initialize Decision Logging
        Y2: Read All Tasks
        Y3: Autonomous Decisions
        Y4: Implement + Test
        Y5: Log Decisions to .ai/

        Y1 --> Y2
        Y2 --> Y3
        Y3 --> Y4
        Y4 --> Y5
    }

    state Interactive {
        I1: Story Analysis
        I2: Present Summary
        I3: Decision Checkpoints
        I4: Educational Explanations
        I5: User Confirmations

        I1 --> I2
        I2 --> I3
        I3 --> I4
        I4 --> I5
    }

    state PreFlight {
        P1: Identify Ambiguities
        P2: Generate Questionnaire
        P3: Collect All Answers
        P4: Create Execution Plan
        P5: Zero-Ambiguity Execute

        P1 --> P2
        P2 --> P3
        P3 --> P4
        P4 --> P5
    }

    YOLO --> Validation
    Interactive --> Validation
    PreFlight --> Validation

    state Validation {
        V1: Run Tests
        V2: Execute Linting
        V3: CodeRabbit Check
        V4: DOD Checklist
    }

    Validation --> [*]: Ready for Review
```

### CodeRabbit Self-Healing Flow

```mermaid
flowchart TB
    subgraph SELF_HEALING["CODERABBIT SELF-HEALING (Story 6.3.3)"]
        A["Tasks Complete"] --> B["Start Self-Healing Loop"]
        B --> C["iteration = 0<br/>max = 2"]

        C --> D["Run CodeRabbit CLI<br/>(wsl bash -c)"]
        D --> E["Parse Output"]
        E --> F{"CRITICAL Issues?"}

        F -->|"No"| G{"HIGH Issues?"}
        G -->|"Yes"| H["Document in Dev Notes"]
        G -->|"No"| I["PASSED"]
        H --> I

        F -->|"Yes"| J["Auto-fix CRITICAL"]
        J --> K["iteration++"]
        K --> L{"iteration < 2?"}

        L -->|"Yes"| D
        L -->|"No"| M["HALT - Manual Fix Required"]

        I --> N["Proceed to DOD Checklist"]
    end

    style I fill:#c8e6c9
    style M fill:#ffcdd2
```

---

## Command to Task Mapping

### Development Commands

| Command | Task File | Operation |
|---------|-----------|----------|
| `*develop {story-id}` | `dev-develop-story.md` | Implements a complete story |
| `*develop {story-id} yolo` | `dev-develop-story.md` | Autonomous mode (0-1 prompts) |
| `*develop {story-id} interactive` | `dev-develop-story.md` | Interactive mode (5-10 prompts) |
| `*develop {story-id} preflight` | `dev-develop-story.md` | Upfront planning |
| `*run-tests` | (inline) | Runs linting and tests |

### Quality Commands

| Command | Task File | Operation |
|---------|-----------|----------|
| `*apply-qa-fixes` | `apply-qa-fixes.md` | Applies QA fixes |
| `*improve-code-quality <path>` | `dev-improve-code-quality.md` | Improves code quality |
| `*optimize-performance <path>` | `dev-optimize-performance.md` | Optimizes performance |
| `*suggest-refactoring <path>` | `dev-suggest-refactoring.md` | Suggests refactoring |

### Backlog and Documentation Commands

| Command | Task File | Operation |
|---------|-----------|----------|
| `*backlog-debt` | `dev-backlog-debt.md` | Records technical debt |
| `*sync-documentation` | `sync-documentation.md` | Syncs documentation |
| `*validate-story-draft` | `validate-next-story.md` | Validates a story draft |

### Context and Session Commands

| Command | Operation |
|---------|----------|
| `*help` | Shows all available commands |
| `*explain` | Explains what it has just done |
| `*guide` | Shows the full usage guide |
| `*load-full {file}` | Loads the full file (bypasses the summary) |
| `*clear-cache` | Clears the context cache |
| `*session-info` | Shows session details |
| `*exit` | Exits developer mode |

---

## Integrations Between Agents

### Collaboration Diagram

```mermaid
flowchart TB
    subgraph DEV_ECOSYSTEM["@dev ECOSYSTEM"]
        DEV["@dev (Vulcan)"]
    end

    subgraph UPSTREAM["UPSTREAM - Provides Stories"]
        SM["@sm (Chronos)<br/>Scrum Master"]
        PO["@po (Themis)<br/>Product Owner"]
    end

    subgraph PEER["PEER - Collaboration"]
        QA["@qa (Argus)<br/>Quality Assurance"]
    end

    subgraph DOWNSTREAM["DOWNSTREAM - Receives Output"]
        GHDEVOPS["@github-devops (Polaris)<br/>Git Operations"]
    end

    SM -->|"Creates story<br/>*create-next-story"| DEV
    PO -->|"Validates story<br/>*validate-story-draft"| DEV

    DEV -->|"Implements<br/>*develop"| QA
    QA -->|"Feedback<br/>*apply-qa-fixes"| DEV

    DEV -->|"Story Complete<br/>Ready for Review"| GHDEVOPS
    GHDEVOPS -->|"git push<br/>gh pr create"| REMOTE["GitHub Remote"]

    style DEV fill:#e8f5e9
    style SM fill:#e3f2fd
    style PO fill:#e3f2fd
    style QA fill:#fce4ec
    style GHDEVOPS fill:#fff3e0
```

### Collaboration Flow

| From | To | Trigger | Action |
|----|------|---------|------|
| @sm | @dev | Story created | @dev implements the story |
| @po | @dev | Story validated | @dev can start the implementation |
| @dev | @qa | Story "Ready for Review" | @qa reviews the implementation |
| @qa | @dev | Feedback with issues | @dev applies fixes (*apply-qa-fixes) |
| @dev | @github-devops | Code complete | @github-devops handles push/PR |

### Git Restrictions

@dev has limited Git operations:

**ALLOWED operations:**
- `git add` - Stage files
- `git commit` - Local commit
- `git status` - Check state
- `git diff` - Review changes
- `git log` - View history
- `git branch` - List/create branches
- `git checkout` - Switch branches
- `git merge` - Local merge

**BLOCKED operations (@github-devops only):**
- `git push`
- `git push --force`
- `gh pr create`
- `gh pr merge`

---

## Configuration

### Relevant Configuration Files

| File | Purpose |
|---------|-----------|
| `.aexos-core/core-config.yaml` | Central configuration (devStoryLocation, coderabbit, etc.) |
| `.aexos-core/development/scripts/unified-activation-pipeline.js` | Canonical activation and greeting pipeline |
| `.aexos-core/scripts/decision-recorder.js` | Decision logging (YOLO mode) |

### devLoadAlwaysFiles

Files loaded automatically on @dev activation (defined in core-config.yaml):
- Project code standards
- Directory structure
- Naming conventions

### CodeRabbit Integration

```yaml
coderabbit_integration:
  enabled: true
  installation_mode: wsl

  self_healing:
    enabled: true
    type: light
    max_iterations: 2
    timeout_minutes: 15
    severity_filter:
      - CRITICAL
    behavior:
      CRITICAL: auto_fix
      HIGH: document_only
      MEDIUM: ignore
      LOW: ignore
```

### Decision Logging (YOLO Mode)

```yaml
decision_logging:
  enabled: true
  log_location: ".ai/decision-log-{story-id}.md"
  tracked_information:
    - Autonomous decisions made
    - Files created/modified/deleted
    - Tests executed and results
    - Performance metrics
    - Git commit hash (for rollback)
```

---

## Best Practices

### When to Use @dev

**USE @dev to:**
- Implement approved stories
- Apply QA fixes
- Refactor existing code
- Optimize performance
- Record technical debt
- Run and validate tests

**DO NOT USE @dev to:**
- Create stories (use @sm)
- Push to remote (use @github-devops)
- Validate architecture (use @architect)
- Manage the backlog (use @po)

### Execution Modes

| Mode | When to Use | Prompts |
|------|-------------|---------|
| **YOLO** | Simple, deterministic tasks | 0-1 |
| **Interactive** | Learning, complex decisions | 5-10 |
| **Pre-flight** | Ambiguous requirements, critical work | All upfront |

### Story File Updates

**ONLY these sections may be edited by @dev:**
- Task/Subtask checkboxes
- Dev Agent Record section
- Agent Model Used
- Debug Log References
- Completion Notes List
- File List
- Change Log
- Status

**NEVER edit:**
- Story description
- Acceptance Criteria
- Dev Notes (append only, do not modify)
- Testing sections (structure)

### Development Cycle

1. **Read the full task** before implementing
2. **Implement incrementally** (task by task)
3. **Write tests** for each task
4. **Run validations** before marking [x]
5. **Update the File List** after each file created/modified
6. **Run CodeRabbit** before finishing
7. **Run the DOD Checklist** at the end
8. **Set the status** to "Ready for Review"

---

## Troubleshooting

### Story not found

```
Error: Story file not found at docs/stories/{story-id}.md
```

**Solution:**
1. Verify that the story-id is correct
2. Check that the story exists in `docs/stories/`
3. Use the full path if necessary

### CodeRabbit not found

```
Error: coderabbit: command not found
```

**Solution:**
1. Verify the WSL installation: `wsl bash -c '~/.local/bin/coderabbit --version'`
2. Check the path in `wsl_config.installation_path`
3. Reinstall CodeRabbit if necessary

### Failing tests

```
Error: Tests failed - cannot mark task as complete
```

**Solution:**
1. Analyze the error output
2. Fix the identified issues
3. Re-run the tests
4. Only mark [x] when all of them pass

### Blocking conditions

@dev must **HALT** and ask the user when:
- Unapproved dependencies are required
- Requirements are ambiguous after checking the story
- 3 consecutive failures while trying to implement/fix
- Configuration is missing
- Regression tests are failing

---

## References

### @dev Tasks
- [dev-develop-story.md](.aexos-core/development/tasks/dev-develop-story.md)
- [dev-improve-code-quality.md](.aexos-core/development/tasks/dev-improve-code-quality.md)
- [dev-optimize-performance.md](.aexos-core/development/tasks/dev-optimize-performance.md)
- [dev-suggest-refactoring.md](.aexos-core/development/tasks/dev-suggest-refactoring.md)
- [dev-backlog-debt.md](.aexos-core/development/tasks/dev-backlog-debt.md)
- [apply-qa-fixes.md](.aexos-core/development/tasks/apply-qa-fixes.md)

### Checklists
- [story-dod-checklist.md](.aexos-core/product/checklists/story-dod-checklist.md)
- [pre-push-checklist.md](.aexos-core/product/checklists/pre-push-checklist.md)

### Agent
- [dev.md](.aexos-core/development/agents/dev.md)

### Workflows
- [brownfield-fullstack.yaml](.aexos-core/development/workflows/brownfield-fullstack.yaml)
- [greenfield-fullstack.yaml](.aexos-core/development/workflows/greenfield-fullstack.yaml)

### Related
- [BACKLOG-MANAGEMENT-SYSTEM.md](../BACKLOG-MANAGEMENT-SYSTEM.md)

---

## Summary

| Aspect | Details |
|---------|----------|
| **Total Core Files** | 10 task files + 1 agent definition |
| **Main Commands** | 15 commands (*develop, *run-tests, *apply-qa-fixes, etc.) |
| **Execution Modes** | 3 (YOLO, Interactive, Pre-flight) |
| **Checklists Used** | 3 (story-dod, pre-push, change) |
| **Integrated Workflows** | 6 (brownfield + greenfield variants) |
| **Collaborating Agents** | 4 (@sm, @po, @qa, @github-devops) |
| **Allowed Git Operations** | 8 (add, commit, status, diff, log, branch, checkout, merge) |
| **Blocked Git Operations** | 4 (push, push --force, gh pr create, gh pr merge) |
| **CodeRabbit Self-Healing** | Light mode (max 2 iterations, CRITICAL only) |

---

## Changelog

| Date | Author | Description |
|------|-------|-----------|
| 2026-02-04 | @dev | Initial document created |

---

*-- Vulcan, always building*
