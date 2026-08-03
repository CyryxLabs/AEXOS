# @sm Agent System

> **Version:** 1.0.0
> **Created:** 2026-02-04
> **Owner:** @sm (Chronos - Facilitator)
> **Status:** Official Documentation

---

## Overview

The **@sm (Chronos)** agent is the technical Scrum Master of AEXOS, specialized in story preparation and agile process facilitation. Its main role is to create detailed and actionable stories that developer agents can implement with minimal need for additional research.

**Main Responsibilities:**
- Creation and refinement of user stories
- Epic management and requirements breakdown
- Sprint planning facilitation
- Guidance on agile processes
- Preparation of handoffs to developers
- Management of local branches during development

**Archetype:** Facilitator (Pisces)
**Communication Tone:** Empathetic, collaborative, fluid
**Key Vocabulary:** adapt, pivot, adjust, simplify, connect, flow, remove

---

## Complete File List

### @sm Core Task Files

| File | Command | Purpose |
|---------|---------|-----------|
| `.aexos-core/development/tasks/sm-create-next-story.md` | `*draft` | Main task to create the next story from the backlog |
| `.aexos-core/development/tasks/create-next-story.md` | `*draft` | Full version of the story creation task |
| `.aexos-core/development/tasks/execute-checklist.md` | `*story-checklist` | Runs the story draft validation checklist |
| `.aexos-core/development/tasks/correct-course.md` | `*correct-course` | Analyzes and corrects process deviations |
| `.aexos-core/development/tasks/collaborative-edit.md` | - | Collaborative document editing |
| `.aexos-core/development/tasks/init-project-status.md` | - | Project status initialization |

### Agent Definition Files

| File | Purpose |
|---------|-----------|
| `.aexos-core/development/agents/sm.md` | Core definition of the SM agent |
| `.claude/commands/AEXOS/agents/sm.md` | Claude Code command to activate @sm |
| `.cursor/rules/sm.md` | Rules for the Cursor IDE |
| `.cursor/rules/sm.mdc` | Compiled rules for Cursor |

### Checklist Files Used

| File | Purpose |
|---------|-----------|
| `.aexos-core/product/checklists/story-draft-checklist.md` | Validates the quality and completeness of story drafts |
| `.aexos-core/product/checklists/story-dod-checklist.md` | Definition of Done for stories |
| `.aexos-core/product/checklists/change-checklist.md` | Change navigation and course correction |
| `.aexos-core/product/checklists/po-master-checklist.md` | Master checklist used in validation |

### Related Files from Other Agents

| File | Agent | Purpose |
|---------|--------|-----------|
| `.aexos-core/development/agents/po.md` | @po | Coordinates with @sm on backlog and sprint planning |
| `.aexos-core/development/agents/dev.md` | @dev | Receives stories from @sm for implementation |
| `.aexos-core/development/agents/pm.md` | @pm | Creates epics that @sm breaks down into stories |
| `.aexos-core/development/agents/devops.md` | @github-devops | Receives completed stories for push/PR |
| `.aexos-core/development/agents/qa.md` | @qa | Coordinates on risk profiling |

### Workflow Files That Use @sm

| File | Purpose |
|---------|-----------|
| `.aexos-core/development/workflows/story-development-cycle.yaml` | Complete story development cycle |
| `.aexos-core/development/workflows/greenfield-fullstack.yaml` | Greenfield full-stack workflow |
| `.aexos-core/development/workflows/greenfield-service.yaml` | Greenfield service workflow |
| `.aexos-core/development/workflows/greenfield-ui.yaml` | Greenfield UI workflow |
| `.aexos-core/development/workflows/brownfield-fullstack.yaml` | Brownfield full-stack workflow |
| `.aexos-core/development/workflows/brownfield-service.yaml` | Brownfield service workflow |
| `.aexos-core/development/workflows/brownfield-ui.yaml` | Brownfield UI workflow |

### Configuration Files

| File | Purpose |
|---------|-----------|
| `.aexos-core/core-config.yaml` | Central configuration (devStoryLocation, etc.) |
| `.aexos-core/development/scripts/greeting-builder.js` | Smart greeting script |
| `.aexos-core/development/scripts/agent-assignment-resolver.js` | Agent assignment resolution |

---

## Flowchart: Complete @sm System

```mermaid
flowchart TB
    subgraph INPUTS["📥 INPUTS"]
        PRD["📄 PRD/Epic<br/>(from @pm)"]
        BACKLOG["📋 Prioritized Backlog<br/>(from @po)"]
        ARCH["🏗️ Architecture<br/>(docs/architecture/)"]
    end

    subgraph SM_AGENT["🌊 @sm (Chronos) - Scrum Master"]
        direction TB

        subgraph COMMANDS["Available Commands"]
            DRAFT["*draft<br/>Create next story"]
            CHECKLIST["*story-checklist<br/>Validate story draft"]
            CORRECT["*correct-course<br/>Correct deviations"]
            GUIDE["*guide<br/>Usage guide"]
            HELP["*help<br/>List commands"]
        end

        subgraph PROCESS["Creation Process"]
            LOAD_CONFIG["1. Load core-config.yaml"]
            IDENTIFY_STORY["2. Identify next story"]
            GATHER_REQS["3. Gather requirements"]
            GATHER_ARCH["4. Architecture context"]
            VERIFY_STRUCTURE["5. Verify alignment"]
            POPULATE["6. Populate template"]
            VALIDATE["7. Run checklist"]
        end
    end

    PRD --> IDENTIFY_STORY
    BACKLOG --> IDENTIFY_STORY
    ARCH --> GATHER_ARCH

    DRAFT --> LOAD_CONFIG
    LOAD_CONFIG --> IDENTIFY_STORY
    IDENTIFY_STORY --> GATHER_REQS
    GATHER_REQS --> GATHER_ARCH
    GATHER_ARCH --> VERIFY_STRUCTURE
    VERIFY_STRUCTURE --> POPULATE
    POPULATE --> VALIDATE

    VALIDATE --> STORY_FILE["📄 docs/stories/epic-X/<br/>STORY-X.Y.md"]
    VALIDATE --> CLICKUP["🔗 ClickUp Task<br/>(automatic sync)"]

    subgraph OUTPUTS["📤 OUTPUTS"]
        STORY_FILE
        CLICKUP
        HANDOFF["🎯 Handoff to @dev"]
    end

    STORY_FILE --> HANDOFF
    CLICKUP --> HANDOFF

    subgraph COLLABORATION["👥 COLLABORATION"]
        DEV_AGENT["@dev (Vulcan)<br/>Receives stories"]
        PO_AGENT["@po (Themis)<br/>Validates stories"]
        DEVOPS_AGENT["@github-devops (Polaris)<br/>Push/PR after completion"]
    end

    HANDOFF --> DEV_AGENT
    STORY_FILE --> PO_AGENT
    DEV_AGENT -->|"Story complete"| DEVOPS_AGENT

    style SM_AGENT fill:#e3f2fd
    style INPUTS fill:#fff3e0
    style OUTPUTS fill:#e8f5e9
    style COLLABORATION fill:#fce4ec
    style COMMANDS fill:#bbdefb
    style PROCESS fill:#c5cae9
```

### Story Development Cycle Diagram

```mermaid
flowchart TD
    A[Start: Story Development Cycle] --> B["@sm: Create next story<br/>*draft"]
    B --> C["@po: Validate story - 10 checks<br/>*validate-story-draft"]

    C --> D{Validation OK?}
    D -->|No| E[Feedback to SM]
    E --> B
    D -->|Yes| F["@dev: Implement story<br/>*develop"]

    F --> G["@qa: Review + Quality Gate<br/>*review-story"]

    G --> H{Quality Gate OK?}
    H -->|No| I[Feedback to Dev]
    I --> F
    H -->|Yes| J[Story Done!]

    J --> K{More stories?}
    K -->|Yes| B
    K -->|No| L[Cycle Complete]

    style L fill:#90EE90
    style J fill:#90EE90
    style B fill:#87CEEB
    style C fill:#FFE4B5
    style F fill:#98FB98
    style G fill:#DDA0DD
    style E fill:#FFB6C1
    style I fill:#FFB6C1
```

### Branch Management Diagram

```mermaid
flowchart LR
    subgraph SM_SCOPE["🌊 @sm - Local Scope"]
        CREATE_BRANCH["git checkout -b<br/>feature/X.Y-story-name"]
        LIST_BRANCH["git branch<br/>List branches"]
        SWITCH_BRANCH["git checkout<br/>Switch branch"]
        DELETE_LOCAL["git branch -d<br/>Delete local"]
        MERGE_LOCAL["git merge<br/>Local merge"]
    end

    subgraph DEVOPS_SCOPE["⚙️ @github-devops - Remote Scope"]
        PUSH["git push<br/>Send to origin"]
        CREATE_PR["gh pr create<br/>Create Pull Request"]
        DELETE_REMOTE["git push origin --delete<br/>Delete remote branch"]
    end

    SM_SCOPE -->|"Story complete<br/>Notify"| DEVOPS_SCOPE

    style SM_SCOPE fill:#e3f2fd
    style DEVOPS_SCOPE fill:#fff3e0
```

---

## Command to Task Mapping

| Command | Task File | Operation |
|---------|-----------|----------|
| `*draft` | `sm-create-next-story.md` / `create-next-story.md` | Creates the next story from the backlog |
| `*story-checklist` | `execute-checklist.md` | Runs `story-draft-checklist.md` |
| `*correct-course` | `correct-course.md` | Analyzes and corrects process deviations |
| `*help` | (built-in) | Shows available commands |
| `*guide` | (built-in) | Shows the agent usage guide |
| `*session-info` | (built-in) | Shows details of the current session |
| `*exit` | (built-in) | Exits Scrum Master mode |

---

## Integrations between Agents

### Integration Flow

```mermaid
flowchart TB
    subgraph UPSTREAM["⬆️ UPSTREAM - Provides to @sm"]
        PM_UP["@pm (Janus)<br/>Creates epic structure"]
        PO_UP["@po (Themis)<br/>Prioritizes backlog"]
        ANALYST_UP["@analyst (Sage)<br/>Research and insights"]
    end

    SM_CENTRAL["🌊 @sm (Chronos)<br/>Scrum Master"]

    subgraph DOWNSTREAM["⬇️ DOWNSTREAM - Receives from @sm"]
        DEV_DOWN["@dev (Vulcan)<br/>Implements stories"]
        PO_DOWN["@po (Themis)<br/>Validates stories"]
        QA_DOWN["@qa (Argus)<br/>Risk profiling"]
    end

    subgraph LATERAL["↔️ LATERAL - Coordinates with @sm"]
        DEVOPS_LAT["@github-devops (Polaris)<br/>Push/PR workflow"]
    end

    PM_UP -->|"Epic structure"| SM_CENTRAL
    PO_UP -->|"Prioritized backlog"| SM_CENTRAL
    ANALYST_UP -->|"Technical insights"| SM_CENTRAL

    SM_CENTRAL -->|"Ready stories"| DEV_DOWN
    SM_CENTRAL -->|"Stories for validation"| PO_DOWN
    SM_CENTRAL -->|"Request risk profiling"| QA_DOWN

    SM_CENTRAL <-->|"Sprint workflow"| DEVOPS_LAT

    style SM_CENTRAL fill:#87CEEB
    style UPSTREAM fill:#fff3e0
    style DOWNSTREAM fill:#e8f5e9
    style LATERAL fill:#fce4ec
```

### Collaboration Matrix

| Agent | Relationship | Action |
|--------|----------------|------|
| **@pm (Janus)** | Receives from | Epic structure, sharded PRD |
| **@po (Themis)** | Coordinates with | Backlog prioritization, sprint planning |
| **@dev (Vulcan)** | Delivers to | Stories ready for implementation |
| **@qa (Argus)** | Requests | Risk profiling for stories |
| **@github-devops (Polaris)** | Delegates to | Push branches, create PRs |
| **@analyst (Sage)** | Consults | Technical research and insights |

### Delegation to @github-devops

@sm manages ONLY local Git operations. For remote operations, **always** delegate to @github-devops:

**Operations Allowed for @sm:**
- `git checkout -b feature/X.Y-story-name` - Create local branch
- `git branch` - List branches
- `git branch -d branch-name` - Delete local branch
- `git checkout branch-name` - Switch branch
- `git merge branch-name` - Local merge

**Blocked Operations (use @github-devops):**
- `git push` - Send to remote
- `git push origin --delete` - Delete remote branch
- `gh pr create` - Create Pull Request

---

## Configuration

### core-config.yaml (Relevant Keys)

```yaml
# Story location
devStoryLocation: docs/stories

# Sharded or Monolithic PRD
prdSharded: true
prdShardedLocation: docs/prd/epics

# Architecture
architectureVersion: v4
architectureSharded: true
architectureShardedLocation: docs/architecture

# QA
qaLocation: docs/qa

# CodeRabbit Integration
coderabbit_integration:
  enabled: true  # Controls whether @sm populates the CodeRabbit section in stories
```

### Agent Dependencies

```yaml
dependencies:
  tasks:
    - create-next-story.md
    - execute-checklist.md
    - correct-course.md
  templates:
    - story-tmpl.yaml
  checklists:
    - story-draft-checklist.md
  tools:
    - git               # Local branch operations only
    - clickup           # Track sprint progress
    - context7          # Research technical requirements
```

---

## Best Practices

### Story Creation

1. **Always start from the PRD/Epic** - Do not invent requirements
2. **Include references with citations** - `[Source: architecture/tech-stack.md#database]`
3. **Populate Dev Notes fully** - Technical context extracted from the architecture
4. **Run the checklist after creation** - `*story-checklist` validates quality
5. **Do not assume information** - If you cannot find it, state "No specific guidance found"

### Branch Management

1. **Use the naming convention** - `feature/X.Y-story-name` (X.Y = epic.story)
2. **Create a branch when starting a story** - Isolates development
3. **Do not attempt to push** - Always delegate to @github-devops
4. **Resolve conflicts locally** - Before requesting a push

### Collaboration with Other Agents

1. **Respect boundaries** - Do not implement code, do not create PRs
2. **Document handoffs** - Make clear what @dev needs to do
3. **Coordinate with @po** - Backlog prioritization before creating stories
4. **Notify @github-devops** - When a story is ready for push

### Story Validation

1. **Run the checklist** - `*story-checklist` after creation
2. **Review all 6 criteria** - Goal, Technical, References, Self-Containment, Testing, CodeRabbit
3. **Fix before handoff** - Incomplete stories block @dev
4. **Document deviations** - If there are conflicts between the epic and the architecture

---

## Troubleshooting

### Story not found in ClickUp

**Symptom:** Epic verification fails at Step 5.1

**Solution:**
1. Check whether the Epic exists in the ClickUp Backlog list
2. Confirm tags: `epic`, `epic-{epicNum}`
3. Status must be "Planning" or "In Progress"
4. Create the Epic manually if needed:
   ```
   Name: 'Epic {epicNum}: {Epic Title}'
   List: Backlog
   Tags: ['epic', 'epic-{epicNum}']
   Status: Planning
   ```

### core-config.yaml not found

**Symptom:** Task halts with a file-not-found message

**Solution:**
1. Copy from `GITHUB aexos-core/core-config.yaml`
2. Or run the AEXOS installer: `npx @aexos/core install`
3. Configure `devStoryLocation`, `prdSharded`, etc.

### Checklist returns FAIL in multiple categories

**Symptom:** Story draft with several validation problems

**Solution:**
1. Review the referenced architecture files
2. Check whether the PRD/Epic is complete
3. Use the file fallback strategy for alternative files
4. Add notes in Dev Notes about the gaps

### Local branch out of sync

**Symptom:** Merge conflicts when trying to integrate

**Solution:**
1. Run `git fetch origin` to update references
2. Merge the base branch locally: `git merge main`
3. Resolve conflicts before requesting a push from @github-devops

### CodeRabbit section does not appear in the story

**Symptom:** Story created without the CodeRabbit integration section

**Cause:** `coderabbit_integration.enabled: false` in core-config.yaml

**Solution:**
1. Check `core-config.yaml`
2. If intentional, the story will have a skip notice
3. To enable, set `coderabbit_integration.enabled: true`

---

## References

### Agent Files
- [Agent: sm.md](.aexos-core/development/agents/sm.md)
- [Task: create-next-story.md](.aexos-core/development/tasks/create-next-story.md)
- [Task: execute-checklist.md](.aexos-core/development/tasks/execute-checklist.md)
- [Task: correct-course.md](.aexos-core/development/tasks/correct-course.md)

### Checklists
- [Checklist: story-draft-checklist.md](.aexos-core/product/checklists/story-draft-checklist.md)
- [Checklist: story-dod-checklist.md](.aexos-core/product/checklists/story-dod-checklist.md)
- [Checklist: change-checklist.md](.aexos-core/product/checklists/change-checklist.md)

### Workflows
- [Workflow: story-development-cycle.yaml](.aexos-core/development/workflows/story-development-cycle.yaml)
- [Workflow: greenfield-fullstack.yaml](.aexos-core/development/workflows/greenfield-fullstack.yaml)
- [Workflow: brownfield-fullstack.yaml](.aexos-core/development/workflows/brownfield-fullstack.yaml)

### Configuration
- [Core Config](../.aexos-core/core-config.yaml)

### Related Documentation
- [Backlog Management System](../BACKLOG-MANAGEMENT-SYSTEM.md)

---

## Summary

| Aspect | Details |
|---------|----------|
| **Agent** | @sm (Chronos) - Scrum Master |
| **Archetype** | Facilitator (Pisces) |
| **Total Task Files** | 6 core tasks |
| **Available Commands** | 7 (`*draft`, `*story-checklist`, `*correct-course`, `*help`, `*guide`, `*session-info`, `*exit`) |
| **Checklists Used** | 4 checklists |
| **Workflows That Use @sm** | 7 workflows |
| **Tools** | git (local), clickup, context7 |
| **Collaborates with** | @pm, @po, @dev, @qa, @github-devops, @analyst |
| **Delegates to** | @github-devops (remote operations) |
| **Main Responsibility** | Creation of detailed and actionable stories |

---

## Changelog

| Date | Author | Description |
|------|-------|-----------|
| 2026-02-04 | @dev | Initial document created |

---

*-- Chronos, removing obstacles*
