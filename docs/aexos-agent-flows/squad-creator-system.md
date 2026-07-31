# AEXOS Squad Creation and Management System

> **Version:** 1.0.0
> **Created:** 2026-02-04
> **Owner:** @squad-creator (Arkantos)
> **Status:** Official Documentation

---

## Overview

The **Squad Creator** (Arkantos) is the AEXOS agent specialized in creating, validating, publishing and managing squads. Squads are modular packages of agents, tasks, workflows and resources that can be reused across projects.

This system implements the AEXOS **task-first architecture**, where tasks are the main entry point for execution and agents orchestrate those tasks.

### System Purposes

- **Create squads** following AEXOS standards and structure
- **Validate squads** against the JSON Schema and task specifications
- **List squads** local to the project
- **Distribute squads** across 3 levels (Local, aexos-squads, AEXOS API)
- **Migrate squads** to the v2 format with orchestration and skills
- **Analyze and extend** existing squads

### Fundamental Principles

1. **Task-First Architecture**: Tasks are the entry point, agents orchestrate
2. **Mandatory Validation**: Always validate before distributing
3. **JSON Schema**: Manifests validated against a schema
4. **3 Distribution Levels**: Local, Public (aexos-squads), Marketplace (AEXOS API)
5. **Integration with aexos-core**: Squads work in synergy with the framework

---

## Complete File List

### Core Agent Definition Files

| File | Purpose |
|------|---------|
| `.aexos-core/development/agents/squad-creator.md` | Core definition of the Squad Creator agent |
| `.claude/commands/AEXOS/agents/squad-creator.md` | Claude Code command to activate @squad-creator |

### @squad-creator Task Files

| File | Command | Purpose | Status |
|------|---------|---------|--------|
| `.aexos-core/development/tasks/squad-creator-create.md` | `*create-squad` | Creates a new squad with the complete structure | Active |
| `.aexos-core/development/tasks/squad-creator-design.md` | `*design-squad` | Analyzes documentation and generates a blueprint | Active |
| `.aexos-core/development/tasks/squad-creator-validate.md` | `*validate-squad` | Validates a squad against the schema and standards | Active |
| `.aexos-core/development/tasks/squad-creator-list.md` | `*list-squads` | Lists local squads | Active |
| `.aexos-core/development/tasks/squad-creator-analyze.md` | `*analyze-squad` | Analyzes the structure and suggests improvements | Active |
| `.aexos-core/development/tasks/squad-creator-extend.md` | `*extend-squad` | Extends a squad with new components | Active |
| `.aexos-core/development/tasks/squad-creator-migrate.md` | `*migrate-to-v2` | Migrates a squad to the v2 format | Active |
| `.aexos-core/development/tasks/squad-generate-skills.md` | `*generate-skills` | Generates skills from the squad's knowledge | Active |
| `.aexos-core/development/tasks/squad-generate-workflow.md` | `*generate-workflow` | Generates a YAML orchestration workflow | Active |
| `.aexos-core/development/tasks/squad-creator-download.md` | `*download-squad` | Downloads a squad from the public repository | Placeholder (Sprint 8) |
| `.aexos-core/development/tasks/squad-creator-publish.md` | `*publish-squad` | Publishes a squad to aexos-squads | Placeholder (Sprint 8) |
| `.aexos-core/development/tasks/squad-creator-sync-aexos.md` | `*sync-squad-cyryx` | Syncs a squad with the AEXOS API | Placeholder (Sprint 8) |

### Related Task Files

| File | Command | Purpose |
|------|---------|---------|
| `.aexos-core/development/tasks/create-agent.md` | `*create-agent` | Creates an individual agent definition |
| `.aexos-core/development/tasks/create-task.md` | `*create-task` | Creates an individual task file |
| `.aexos-core/development/tasks/create-workflow.md` | `*create-workflow` | Creates an orchestration workflow |

### Supporting Scripts

| File | Class/Function | Purpose |
|------|----------------|---------|
| `.aexos-core/development/scripts/squad/squad-generator.js` | `SquadGenerator` | Generates the complete squad structure |
| `.aexos-core/development/scripts/squad/squad-validator.js` | `SquadValidator` | Validates a squad against the schema and standards |
| `.aexos-core/development/scripts/squad/squad-loader.js` | `SquadLoader` | Loads and resolves squads |
| `.aexos-core/development/scripts/squad/squad-designer.js` | `SquadDesigner` | Analyzes docs and generates blueprints |
| `.aexos-core/development/scripts/squad/squad-analyzer.js` | `SquadAnalyzer` | Analyzes squad structure |
| `.aexos-core/development/scripts/squad/squad-extender.js` | `SquadExtender` | Extends existing squads |
| `.aexos-core/development/scripts/squad/squad-migrator.js` | `SquadMigrator` | Migrates squads to v2 |
| `.aexos-core/development/scripts/squad/squad-downloader.js` | `SquadDownloader` | Downloads squads from the repository |
| `.aexos-core/development/scripts/squad/squad-publisher.js` | `SquadPublisher` | Publishes squads |

### JSON Schemas

| File | Purpose |
|------|---------|
| `.aexos-core/schemas/squad-schema.json` | Validation schema for squad.yaml |
| `.aexos-core/schemas/squad-design-schema.json` | Validation schema for blueprints |

### Output Files (Generated Squads)

| Directory | Purpose |
|-----------|---------|
| `./squads/{squad-name}/` | Root directory of the squad |
| `./squads/{squad-name}/squad.yaml` | Squad manifest (required) |
| `./squads/{squad-name}/README.md` | Squad documentation |
| `./squads/{squad-name}/agents/` | Agent definitions |
| `./squads/{squad-name}/tasks/` | Task definitions |
| `./squads/{squad-name}/workflows/` | Orchestration workflows |
| `./squads/{squad-name}/config/` | Configuration files |
| `./squads/.designs/` | Blueprints generated by *design-squad |

---

## Flowchart: Complete Squad Management System

```mermaid
flowchart TB
    subgraph INPUTS["📥 INPUTS"]
        DOCS["📄 Documentation<br/>(PRD, specs)"]
        USER["👤 User<br/>(commands)"]
        EXISTING["📦 Existing Squad<br/>(validation/extension)"]
    end

    DOCS -->|"*design-squad"| BLUEPRINT
    USER -->|"*create-squad"| CREATE
    EXISTING -->|"*validate-squad"| VALIDATE

    subgraph DESIGN["📐 DESIGN PHASE"]
        BLUEPRINT["📋 Blueprint<br/>.designs/{name}-design.yaml"]
        ANALYSIS["🔍 Domain Analysis<br/>• Entities<br/>• Workflows<br/>• Integrations"]
        RECOMMEND["💡 Recommendations<br/>• Agents<br/>• Tasks<br/>• Confidence scores"]
    end

    DOCS --> ANALYSIS
    ANALYSIS --> RECOMMEND
    RECOMMEND --> BLUEPRINT

    subgraph CREATE["🏗️ CREATION PHASE"]
        TEMPLATE["📑 Template Selection<br/>• basic<br/>• etl<br/>• agent-only"]
        VERSION["📊 Version Selection<br/>• v1 (legacy)<br/>• v2 (orchestration)"]
        GENERATE["⚙️ Generate Structure<br/>• squad.yaml<br/>• agents/<br/>• tasks/<br/>• workflows/"]
    end

    BLUEPRINT -->|"--from-design"| GENERATE
    TEMPLATE --> GENERATE
    VERSION --> GENERATE

    subgraph VALIDATE["✅ VALIDATION PHASE"]
        SCHEMA["📜 Schema Validation<br/>squad-schema.json"]
        STRUCTURE["📁 Structure Check<br/>• tasks/<br/>• agents/<br/>• Referenced files"]
        TASK_FMT["📋 Task Format<br/>TASK-FORMAT-V1"]
        AGENT_FMT["🤖 Agent Format<br/>YAML structure"]
    end

    GENERATE --> VALIDATE
    SCHEMA --> RESULT
    STRUCTURE --> RESULT
    TASK_FMT --> RESULT
    AGENT_FMT --> RESULT

    subgraph RESULT["📊 RESULT"]
        VALID["✅ VALID<br/>(or with warnings)"]
        INVALID["❌ INVALID<br/>(errors found)"]
    end

    subgraph DISTRIBUTE["🚀 DISTRIBUTION"]
        LOCAL["📂 Local<br/>./squads/"]
        PUBLIC["🌐 Public<br/>github.com/CyryxLabs/aexos-squads"]
        MARKET["💰 Marketplace<br/>api.cyryx.dev/squads"]
    end

    VALID --> LOCAL
    VALID -->|"*publish-squad"| PUBLIC
    VALID -->|"*sync-squad-cyryx"| MARKET

    style INPUTS fill:#e1f5fe
    style DESIGN fill:#fff3e0
    style CREATE fill:#e8f5e9
    style VALIDATE fill:#fce4ec
    style RESULT fill:#f3e5f5
    style DISTRIBUTE fill:#e0f7fa
    style VALID fill:#c8e6c9
    style INVALID fill:#ffcdd2
```

---

## Flowchart: Squad Creation with v1 vs v2 Templates

```mermaid
flowchart TB
    START["*create-squad {name}"]

    START --> VERSION{"Template Version?"}

    VERSION -->|"v2 (default)"| V2_PATH
    VERSION -->|"v1 (--legacy)"| V1_PATH

    subgraph V2_PATH["🆕 V2 - Orchestration + Skills"]
        V2_YAML["squad.yaml v2<br/>• orchestration config<br/>• skills config<br/>• metadata"]
        V2_WF["workflows/main-workflow.yaml<br/>• phases definition<br/>• error handling<br/>• timeout config"]
        V2_AGENT["agents/ with skill_dispatch<br/>• auto_inject skills"]
    end

    subgraph V1_PATH["📦 V1 - Legacy Structure"]
        V1_YAML["squad.yaml v1<br/>• basic manifest<br/>• components list"]
        V1_EMPTY["Empty workflows/<br/>(no orchestration)"]
        V1_AGENT["agents/ basic<br/>(no skills)"]
    end

    V2_PATH --> COMMON
    V1_PATH --> COMMON

    subgraph COMMON["📁 Common Structure"]
        CONFIG["config/<br/>• coding-standards.md<br/>• tech-stack.md<br/>• source-tree.md"]
        TASKS["tasks/<br/>• example-task.md"]
        DIRS["Empty dirs:<br/>checklists/<br/>templates/<br/>tools/<br/>scripts/<br/>data/"]
    end

    COMMON --> VALIDATE["*validate-squad"]
    VALIDATE --> DONE["✅ Squad Ready"]

    style V2_PATH fill:#e8f5e9
    style V1_PATH fill:#fff3e0
    style COMMON fill:#e1f5fe
```

---

## Flowchart: Design Flow with Blueprint

```mermaid
flowchart TB
    subgraph INPUT["📥 INPUT PHASE"]
        DOCS["Documentation Files<br/>• PRD<br/>• Specs<br/>• Requirements"]
        VERBAL["Verbal Description<br/>(interactive)"]
        DOMAIN["Domain Hint<br/>--domain flag"]
    end

    INPUT --> NORMALIZE["1️⃣ Input Normalization<br/>• Parse markdown/yaml/json<br/>• Extract text content<br/>• Merge sources"]

    NORMALIZE --> ANALYZE["2️⃣ Domain Analysis"]

    subgraph ANALYZE["🔍 ANALYSIS PIPELINE"]
        ENTITY["Entity Extraction<br/>• Nouns/proper nouns<br/>• Domain terms<br/>• Group concepts"]
        WORKFLOW["Workflow Detection<br/>• Action verbs<br/>• Sequential processes<br/>• I/O patterns"]
        INTEGRATION["Integration Mapping<br/>• External systems<br/>• APIs/Services"]
        STAKE["Stakeholder ID<br/>• User roles<br/>• Personas"]
    end

    ANALYZE --> RECOMMEND["3️⃣ Recommendation Engine"]

    subgraph RECOMMEND["💡 RECOMMENDATIONS"]
        AGENTS["Agent Generation<br/>• Role from workflows<br/>• Commands from steps<br/>• Confidence calc"]
        TASKS_R["Task Generation<br/>• TASK-FORMAT-V1<br/>• Entrada from inputs<br/>• Saida from outputs"]
        DEDUP["Deduplication<br/>• Merge >70% overlap"]
    end

    RECOMMEND --> REVIEW["4️⃣ Interactive Review"]

    subgraph REVIEW["👤 USER REFINEMENT"]
        CONFIRM["[A]ccept agents"]
        MODIFY["[M]odify agents"]
        REJECT["[R]eject agents"]
        ADD["[A]dd custom"]
    end

    REVIEW --> BLUEPRINT["📋 Blueprint Output<br/>.designs/{name}-design.yaml"]

    BLUEPRINT --> CREATE["*create-squad --from-design"]

    style INPUT fill:#e1f5fe
    style ANALYZE fill:#fff3e0
    style RECOMMEND fill:#e8f5e9
    style REVIEW fill:#fce4ec
```

---

## Flowchart: Validation Pipeline

```mermaid
flowchart TB
    START["*validate-squad {name}"]

    START --> RESOLVE["1️⃣ Resolve Squad Path<br/>./squads/{name}/ or full path"]

    RESOLVE --> MANIFEST["2️⃣ Manifest Validation"]

    subgraph MANIFEST["📜 MANIFEST CHECK"]
        FIND["Find manifest<br/>squad.yaml or config.yaml"]
        PARSE["Parse YAML"]
        SCHEMA["Validate vs JSON Schema<br/>• name (kebab-case)<br/>• version (semver)<br/>• components"]
    end

    MANIFEST --> STRUCTURE["3️⃣ Structure Validation"]

    subgraph STRUCTURE["📁 STRUCTURE CHECK"]
        DIRS["Check directories<br/>• tasks/ (required)<br/>• agents/ (required)"]
        FILES["Check referenced files<br/>• components.tasks exist?<br/>• components.agents exist?"]
    end

    STRUCTURE --> TASKS_V["4️⃣ Task Validation"]

    subgraph TASKS_V["📋 TASK FORMAT CHECK"]
        T_FIELDS["Required Fields:<br/>• task<br/>• responsavel<br/>• responsavel_type<br/>• atomic_layer<br/>• Entrada<br/>• Saida<br/>• Checklist"]
        T_NAMING["Naming Convention<br/>kebab-case"]
    end

    TASKS_V --> AGENTS_V["5️⃣ Agent Validation"]

    subgraph AGENTS_V["🤖 AGENT CHECK"]
        A_FORMAT["Agent Format<br/>• YAML frontmatter<br/>• Markdown heading"]
        A_NAMING["Naming Convention<br/>kebab-case"]
    end

    AGENTS_V --> RESULT{"Result?"}

    RESULT -->|"Errors = 0"| VALID["✅ VALID"]
    RESULT -->|"Errors > 0"| INVALID["❌ INVALID"]
    RESULT -->|"Warnings > 0"| WARNINGS["⚠️ VALID (with warnings)"]

    style MANIFEST fill:#fff3e0
    style STRUCTURE fill:#e1f5fe
    style TASKS_V fill:#e8f5e9
    style AGENTS_V fill:#fce4ec
    style VALID fill:#c8e6c9
    style INVALID fill:#ffcdd2
    style WARNINGS fill:#fff9c4
```

---

## Command-to-Task Mapping

### Squad Management Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*create-squad` | `squad-creator-create.md` | CREATE a squad with the complete structure |
| `*create-squad --from-design` | `squad-creator-create.md` | CREATE a squad from a blueprint |
| `*design-squad` | `squad-creator-design.md` | DESIGN a squad through doc analysis |
| `*validate-squad` | `squad-creator-validate.md` | VALIDATE a squad against the schema |
| `*list-squads` | `squad-creator-list.md` | LIST local squads |
| `*analyze-squad` | `squad-creator-analyze.md` | ANALYZE the structure and suggest improvements |
| `*extend-squad` | `squad-creator-extend.md` | EXTEND a squad with new components |

### Orchestration and Skills Commands (v2)

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*generate-skills` | `squad-generate-skills.md` | GENERATE skills from the squad's knowledge |
| `*generate-workflow` | `squad-generate-workflow.md` | GENERATE a YAML orchestration workflow |
| `*migrate-to-v2` | `squad-creator-migrate.md` | MIGRATE a squad to the v2 format |

### Distribution Commands (Sprint 8 - Placeholders)

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*download-squad` | `squad-creator-download.md` | DOWNLOAD a squad from aexos-squads |
| `*publish-squad` | `squad-creator-publish.md` | PUBLISH a squad to aexos-squads |
| `*sync-squad-cyryx` | `squad-creator-sync-aexos.md` | SYNC a squad to the AEXOS API |

### Individual Component Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*create-agent` | `create-agent.md` | CREATE an agent definition |
| `*create-task` | `create-task.md` | CREATE a task file |
| `*create-workflow` | `create-workflow.md` | CREATE an orchestration workflow |

---

## Structure of a Generated Squad

### v2 (Default - With Orchestration)

```text
./squads/{squad-name}/
├── squad.yaml                    # Manifest v2 (orchestration + skills)
├── README.md                     # Documentation
├── config/
│   ├── coding-standards.md      # Coding standards
│   ├── tech-stack.md            # Technology stack
│   └── source-tree.md           # Documented structure
├── agents/
│   └── example-agent.md         # Agent with skill_dispatch
├── tasks/
│   └── example-task.md          # Task following TASK-FORMAT-V1
├── workflows/
│   └── main-workflow.yaml       # Workflow with phases (v2)
├── checklists/
│   └── .gitkeep
├── templates/
│   └── .gitkeep
├── tools/
│   └── .gitkeep
├── scripts/
│   └── .gitkeep
└── data/
    └── .gitkeep
```

### v1 (Legacy)

```text
./squads/{squad-name}/
├── squad.yaml                    # Manifest v1 (basic)
├── README.md
├── config/
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md
├── agents/
│   └── example-agent.md
├── tasks/
│   └── example-agent-task.md
├── workflows/
│   └── .gitkeep                 # Empty (no orchestration)
├── checklists/
│   └── .gitkeep
├── templates/
│   └── .gitkeep
├── tools/
│   └── .gitkeep
├── scripts/
│   └── .gitkeep
└── data/
    └── .gitkeep
```

---

## Agent Collaboration Diagram

```mermaid
flowchart LR
    subgraph SQUAD_CREATOR["🏗️ @squad-creator (Arkantos)"]
        SC_CREATE["*create-squad"]
        SC_VALIDATE["*validate-squad"]
        SC_LIST["*list-squads"]
        SC_DESIGN["*design-squad"]
        SC_MIGRATE["*migrate-to-v2"]
    end

    subgraph DEV["💻 @dev (Vulcan)"]
        DEV_IMPL["Implements functionality"]
        DEV_CODE["Writes squad code"]
    end

    subgraph QA["🔍 @qa (Argus)"]
        QA_REVIEW["Code review"]
        QA_TEST["Tests the squad"]
    end

    subgraph DEVOPS["⚙️ @devops (Polaris)"]
        DEVOPS_PUB["Publishing"]
        DEVOPS_DEPLOY["Deployment"]
    end

    SQUAD_CREATOR -->|"Structure created"| DEV
    DEV -->|"Code ready"| QA
    QA -->|"Approved"| DEVOPS
    SQUAD_CREATOR -->|"Pre-publish validation"| DEVOPS

    SQUADS[("📦 ./squads/")]
    AEXOS_SQUADS[("🌐 aexos-squads")]
    AEXOS[("💰 AEXOS API")]

    SC_CREATE --> SQUADS
    SC_VALIDATE --> SQUADS
    SC_LIST --> SQUADS
    DEVOPS_PUB --> AEXOS_SQUADS
    DEVOPS_PUB --> AEXOS

    style SQUAD_CREATOR fill:#e3f2fd
    style DEV fill:#e8f5e9
    style QA fill:#fce4ec
    style DEVOPS fill:#fff3e0
```

---

## Available Templates

| Template | Description | Components |
|----------|-------------|------------|
| `basic` | Minimal structure | 1 agent, 1 task |
| `etl` | Data processing | 2 agents (extractor, transformer), 3 tasks, scripts |
| `agent-only` | Agents only | 2 agents (primary, helper), no tasks |
| `custom` | Via blueprint | Defined by the design |

## Template Versions

| Version | Description | Features |
|---------|-------------|----------|
| `v2` | **Default** - Full orchestration | squad.yaml v2, workflow.yaml, skill_dispatch in agents |
| `v1` | Legacy structure | Basic squad.yaml, no orchestration/skills |

---

## squad.yaml JSON Schema

### Required Fields

```yaml
name: string          # kebab-case, 2-50 characters
version: string       # semver (1.0.0)
```

### Optional Fields

```yaml
short-title: string   # max 100 chars
description: string   # max 500 chars
author: string
license: MIT | Apache-2.0 | ISC | GPL-3.0 | UNLICENSED
slashPrefix: string   # prefix for commands
tags: string[]        # keywords for discovery

cyryx:
  minVersion: string  # minimum AEXOS version
  type: squad

components:
  tasks: string[]     # task files
  agents: string[]    # agent files
  workflows: string[]
  checklists: string[]
  templates: string[]
  tools: string[]
  scripts: string[]

config:
  extends: extend | override | none
  coding-standards: string
  tech-stack: string
  source-tree: string

dependencies:
  node: string[]
  python: string[]
  squads: string[]
```

---

## Validation Error Codes

| Code | Severity | Description |
|------|----------|-------------|
| `MANIFEST_NOT_FOUND` | Error | squad.yaml or config.yaml not found |
| `YAML_PARSE_ERROR` | Error | Invalid YAML syntax |
| `SCHEMA_ERROR` | Error | The manifest does not match the JSON Schema |
| `FILE_NOT_FOUND` | Error | A referenced file does not exist |
| `DEPRECATED_MANIFEST` | Warning | Using config.yaml instead of squad.yaml |
| `MISSING_DIRECTORY` | Warning | Expected directory not found |
| `NO_TASKS` | Warning | No task file in tasks/ |
| `TASK_MISSING_FIELD` | Warning | Task missing a recommended field |
| `AGENT_INVALID_FORMAT` | Warning | The agent file may not follow the format |
| `INVALID_NAMING` | Warning | The file name is not kebab-case |

---

## Distribution Levels

```mermaid
flowchart LR
    subgraph LOCAL["📂 Level 1: Local"]
        L_PATH["./squads/"]
        L_DESC["Private, project-specific"]
        L_CMD["*create-squad"]
    end

    subgraph PUBLIC["🌐 Level 2: Public"]
        P_REPO["github.com/CyryxLabs/aexos-squads"]
        P_DESC["Community squads (free)"]
        P_CMD["*publish-squad"]
    end

    subgraph MARKET["💰 Level 3: Marketplace"]
        M_API["api.cyryx.dev/squads"]
        M_DESC["Premium squads via the AEXOS API"]
        M_CMD["*sync-squad-cyryx"]
    end

    LOCAL --> PUBLIC
    PUBLIC --> MARKET

    style LOCAL fill:#e8f5e9
    style PUBLIC fill:#e3f2fd
    style MARKET fill:#fff3e0
```

---

## Best Practices

### Squad Creation

1. **Always start with a design** - Use `*design-squad` for complex projects
2. **Follow task-first** - Tasks are the main entry point
3. **Use v2 by default** - Support for orchestration and skills
4. **Validate before distributing** - `*validate-squad` is mandatory
5. **Document well** - README.md and comments in the YAML

### Component Organization

1. **Naming**: Always use kebab-case
2. **Tasks**: Include every required field from TASK-FORMAT-V1
3. **Agents**: Use YAML frontmatter with an `agent:` block
4. **Config**: Specify the inheritance mode (extend/override/none)

### Validation

1. **Pre-commit**: Run `*validate-squad` before commits
2. **CI/CD**: Integrate validation into the pipeline
3. **Strict mode**: Use `--strict` to treat warnings as errors
4. **Fixes**: Address warnings for better quality

### Distribution

1. **Test locally** - Validate and use it before publishing
2. **Documentation** - Complete README and a clear description
3. **Versioning** - Use semver correctly
4. **License** - Specify an appropriate license

---

## Troubleshooting

### The squad does not show up in *list-squads

- Check whether the directory exists in `./squads/`
- Check whether `squad.yaml` or `config.yaml` exists
- Validate the manifest's YAML syntax

### Validation fails with SCHEMA_ERROR

- Check the `name` field (it must be kebab-case)
- Check the `version` field (it must be semver: 1.0.0)
- Use a YAML linter to check the syntax

### Validation fails with FILE_NOT_FOUND

- Check the files listed under `components`
- Check the relative paths (relative to the squad directory)
- Create the missing files or remove them from the list

### The task reports TASK_MISSING_FIELD

- Add the required fields:
  - `task:`, `responsavel:`, `responsavel_type:`
  - `atomic_layer:`, `Entrada:`, `Saida:`, `Checklist:`
- Follow the TASK-FORMAT-SPECIFICATION-V1 format

### The blueprint fails to generate

- Provide more detailed documentation
- Use `--verbose` to see the analysis
- Use `--domain` to give context

### *create-squad --from-design fails

- Check whether the blueprint exists at the specified path
- Validate the blueprint's YAML syntax
- Check whether every required field is present

---

## References

- [Task: squad-creator-create.md](.aexos-core/development/tasks/squad-creator-create.md)
- [Task: squad-creator-validate.md](.aexos-core/development/tasks/squad-creator-validate.md)
- [Task: squad-creator-design.md](.aexos-core/development/tasks/squad-creator-design.md)
- [Script: squad-generator.js](.aexos-core/development/scripts/squad/squad-generator.js)
- [Script: squad-validator.js](.aexos-core/development/scripts/squad/squad-validator.js)
- [Schema: squad-schema.json](.aexos-core/schemas/squad-schema.json)
- [Agent: squad-creator.md](.aexos-core/development/agents/squad-creator.md)
- [Command: squad-creator.md](.claude/commands/AEXOS/agents/squad-creator.md)

---

## Summary

| Aspect | Details |
|--------|---------|
| **Total Core Tasks** | 12 task files |
| **Active Tasks** | 9 (create, design, validate, list, analyze, extend, migrate, generate-skills, generate-workflow) |
| **Placeholder Tasks** | 3 (download, publish, sync-aexos) |
| **Supporting Scripts** | 9 scripts in squad/ |
| **Schemas** | 2 (squad-schema, squad-design-schema) |
| **Templates** | 3 (basic, etl, agent-only) |
| **Template Versions** | 2 (v1 legacy, v2 orchestration) |
| **Distribution Levels** | 3 (Local, aexos-squads, AEXOS API) |

---

## Changelog

| Date | Author | Description |
|------|--------|-------------|
| 2026-02-04 | @squad-creator | Initial document created with 7 Mermaid diagrams |

---

*-- Arkantos, always structuring*
