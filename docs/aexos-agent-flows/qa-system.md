# @qa Agent System

> **Version:** 1.0.0
> **Created:** 2026-02-04
> **Owner:** @qa (Argus - Guardian)
> **Status:** Official Documentation

---

## Overview

The **@qa (Argus)** agent is the Test Architect & Quality Advisor of AEXOS. Its role is to provide comprehensive quality analysis, quality gate decisions and actionable recommendations for development teams.

**Archetype:** Guardian (Virgo)
**Communication Tone:** Analytical, systematic, educational, pragmatic
**Characteristic Vocabulary:** validate, verify, ensure, protect, audit, inspect, assure

### Core Principles

1. **Depth As Needed** - Go deep based on risk signals, stay concise when risk is low
2. **Requirements Traceability** - Map every story to tests using Given-When-Then patterns
3. **Risk-Based Testing** - Assess and prioritize by likelihood x impact
4. **Quality Attributes** - Validate NFRs (security, performance, reliability)
5. **Testability Assessment** - Evaluate controllability, observability, debuggability
6. **Gate Governance** - Provide clear PASS/CONCERNS/FAIL/WAIVED decisions with rationale
7. **Advisory Excellence** - Educate through documentation, never block arbitrarily
8. **CodeRabbit Integration** - Use automated review to catch issues early

---

## Complete File List

### @qa Core Task Files

| File | Command | Purpose |
|------|---------|---------|
| `.aexos-core/development/tasks/qa-gate.md` | `*gate {story}` | Create a quality gate decision file |
| `.aexos-core/development/tasks/qa-review-story.md` | `*review {story}` | Full story review with a gate decision |
| `.aexos-core/development/tasks/qa-test-design.md` | `*test-design {story}` | Create comprehensive test scenarios |
| `.aexos-core/development/tasks/qa-risk-profile.md` | `*risk-profile {story}` | Generate a risk assessment matrix |
| `.aexos-core/development/tasks/qa-nfr-assess.md` | `*nfr-assess {story}` | Validate non-functional requirements |
| `.aexos-core/development/tasks/qa-trace-requirements.md` | `*trace {story}` | Map requirements to tests (Given-When-Then) |
| `.aexos-core/development/tasks/qa-generate-tests.md` | `*generate-tests` | Generate test suites automatically |
| `.aexos-core/development/tasks/qa-run-tests.md` | `*run-tests` | Run the test suite with a quality gate |
| `.aexos-core/development/tasks/qa-backlog-add-followup.md` | `*backlog-add` | Add follow-ups to the backlog |
| `.aexos-core/development/tasks/qa-create-fix-request.md` | `*create-fix-request {story}` | Generate a fix request document for @dev |

### @qa Secondary Task Files

| File | Purpose |
|------|---------|
| `.aexos-core/development/tasks/qa-browser-console-check.md` | Check for browser console errors |
| `.aexos-core/development/tasks/qa-evidence-requirements.md` | Evidence requirements for QA |
| `.aexos-core/development/tasks/qa-false-positive-detection.md` | False positive detection |
| `.aexos-core/development/tasks/qa-fix-issues.md` | Task for @dev to apply QA fixes |
| `.aexos-core/development/tasks/qa-library-validation.md` | Library validation |
| `.aexos-core/development/tasks/qa-migration-validation.md` | Migration validation |
| `.aexos-core/development/tasks/qa-review-build.md` | Build review |
| `.aexos-core/development/tasks/qa-security-checklist.md` | Security checklist |
| `.aexos-core/development/tasks/qa-review-proposal.md` | Proposal review |

### Agent Definition Files

| File | Purpose |
|------|---------|
| `.aexos-core/development/agents/qa.md` | Complete definition of the QA agent |
| `.claude/commands/AEXOS/agents/qa.md` | Claude Code command to activate @qa |

### Workflow Files

| File | Purpose |
|------|---------|
| `.aexos-core/development/workflows/qa-loop.yaml` | QA loop orchestrator (Review -> Fix -> Re-review) |

### Team Files

| File | Purpose |
|------|---------|
| `.aexos-core/development/agent-teams/team-qa-focused.yaml` | Configuration of the QA-focused team (@dev, @qa, @github-devops) |

### Data Files (Outputs)

| File | Purpose |
|------|---------|
| `docs/qa/gates/` | Quality gate decision files |
| `docs/qa/assessments/` | Risk, NFR and trace assessments |
| `docs/qa/coderabbit-reports/` | CodeRabbit review reports |
| `docs/qa/backlog-archive-{YYYY-MM}.md` | Archive of completed items |

### Configuration Files

| File | Purpose |
|------|---------|
| `.aexos-core/core-config.yaml` | Central configuration (qa.qaLocation, etc.) |
| `.aexos-core/development/data/technical-preferences.md` | Technical preferences for QA |

---

## Flowchart: Complete QA System

```mermaid
flowchart TB
    subgraph TRIGGERS["QA Triggers"]
        DEV_DONE["@dev marks the story<br/>Ready for Review"]
        MANUAL["User runs<br/>*review {story}"]
        LOOP["QA Loop<br/>*qa-loop {story}"]
    end

    DEV_DONE --> START
    MANUAL --> START
    LOOP --> START

    subgraph QA_PROCESS["QA Process"]
        START["Start Review"]

        subgraph CODERABBIT["CodeRabbit Self-Healing"]
            CR_SCAN["CodeRabbit Scan"]
            CR_CHECK{{"CRITICAL or<br/>HIGH issues?"}}
            CR_FIX["Auto-Fix<br/>(max 3 iter)"]
            CR_PASS["CodeRabbit PASS"]
            CR_FAIL["CodeRabbit FAIL"]

            CR_SCAN --> CR_CHECK
            CR_CHECK -->|Yes| CR_FIX
            CR_FIX --> CR_SCAN
            CR_CHECK -->|No| CR_PASS
            CR_SCAN -->|3 iter max| CR_FAIL
        end

        START --> CR_SCAN

        subgraph MANUAL_REVIEW["Manual Review"]
            RISK["*risk-profile<br/>Risk Assessment"]
            NFR["*nfr-assess<br/>NFRs (Sec/Perf/Rel/Mnt)"]
            TEST["*test-design<br/>Test Design"]
            TRACE["*trace<br/>Traceability"]
            ANALYSIS["Code Analysis<br/>and Refactoring"]
        end

        CR_PASS --> RISK
        RISK --> NFR
        NFR --> TEST
        TEST --> TRACE
        TRACE --> ANALYSIS

        subgraph GATE_DECISION["Gate Decision"]
            GATE["*gate {story}"]
            PASS["PASS"]
            CONCERNS["CONCERNS"]
            FAIL["FAIL"]
            WAIVED["WAIVED"]
        end

        ANALYSIS --> GATE
        CR_FAIL --> GATE

        GATE -->|Score OK| PASS
        GATE -->|Medium Issues| CONCERNS
        GATE -->|High/Critical Issues| FAIL
        GATE -->|Approved with Reservations| WAIVED
    end

    subgraph OUTPUTS["Outputs"]
        GATE_FILE["Gate File<br/>(qa/gates/*.yml)"]
        STORY_UPDATE["Story Update<br/>(QA Results section)"]
        FIX_REQUEST["Fix Request<br/>(QA_FIX_REQUEST.md)"]
        BACKLOG["Backlog Items<br/>(follow-ups)"]
    end

    PASS --> GATE_FILE
    CONCERNS --> GATE_FILE
    FAIL --> FIX_REQUEST
    WAIVED --> GATE_FILE

    GATE_FILE --> STORY_UPDATE
    FIX_REQUEST --> DEV_FIX["@dev applies fixes"]
    DEV_FIX --> LOOP

    style TRIGGERS fill:#e1f5fe
    style QA_PROCESS fill:#fff3e0
    style CODERABBIT fill:#fce4ec
    style MANUAL_REVIEW fill:#e8f5e9
    style GATE_DECISION fill:#f3e5f5
    style OUTPUTS fill:#fff9c4
    style PASS fill:#c8e6c9
    style CONCERNS fill:#fff9c4
    style FAIL fill:#ffcdd2
    style WAIVED fill:#e1bee7
```

### Automated QA Loop Flow

```mermaid
flowchart LR
    subgraph LOOP["QA Loop (max 5 iterations)"]
        direction TB

        REVIEW["Phase 1<br/>QA Review"]
        CHECK{{"Verdict?"}}
        FIX_REQ["Phase 3<br/>Create Fix Request"]
        DEV_FIX["Phase 4<br/>@dev Apply Fixes"]
        INCREMENT{{"iter < max?"}}

        REVIEW --> CHECK
        CHECK -->|APPROVE| COMPLETE["COMPLETE"]
        CHECK -->|BLOCKED| ESCALATE["ESCALATE"]
        CHECK -->|REJECT| FIX_REQ
        FIX_REQ --> DEV_FIX
        DEV_FIX --> INCREMENT
        INCREMENT -->|Yes| REVIEW
        INCREMENT -->|No| ESCALATE
    end

    style COMPLETE fill:#c8e6c9
    style ESCALATE fill:#ffcdd2
```

---

## Command-to-Task Mapping

### Analysis and Review Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*code-review {scope}` | (internal) | Run an automated review |
| `*review {story}` | `qa-review-story.md` | Full story review |

### Quality Gate Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*gate {story}` | `qa-gate.md` | Create a quality gate decision |
| `*nfr-assess {story}` | `qa-nfr-assess.md` | Validate non-functional requirements |
| `*risk-profile {story}` | `qa-risk-profile.md` | Generate a risk matrix |

### Test Strategy Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*test-design {story}` | `qa-test-design.md` | Create test scenarios |
| `*trace {story}` | `qa-trace-requirements.md` | Map requirements to tests |
| `*generate-tests` | `qa-generate-tests.md` | Generate tests automatically |
| `*run-tests` | `qa-run-tests.md` | Run the test suite |

### Backlog Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*backlog-add` | `qa-backlog-add-followup.md` | Add a follow-up to the backlog |
| `*backlog-update {id} {status}` | (via po-manage-story-backlog) | Update an item's status |
| `*backlog-review` | (via po-manage-story-backlog) | Generate a backlog review |

### Utility Commands

| Command | Task File | Operation |
|---------|-----------|-----------|
| `*help` | (internal) | Show all commands |
| `*session-info` | (internal) | Show session details |
| `*guide` | (internal) | Show the complete usage guide |
| `*exit` | (internal) | Exit QA mode |

---

## Story Review Lifecycle

### 1. Prerequisites

```yaml
Pre-conditions:
  - Story status: "Review"
  - Developer completed every task
  - File List updated in the story
  - All automated tests passing
```

### 2. Review Process

```mermaid
stateDiagram-v2
    [*] --> CodeRabbit: Story Ready

    CodeRabbit --> ManualReview: PASS (0 CRITICAL/HIGH)
    CodeRabbit --> SelfHealing: CRITICAL/HIGH found

    SelfHealing --> CodeRabbit: Auto-fix attempt
    SelfHealing --> GateFail: Max iterations (3)

    ManualReview --> RiskAssessment: Analyze
    RiskAssessment --> NFRValidation: Risk profile
    NFRValidation --> TestDesign: NFR assessment
    TestDesign --> TraceMatrix: Test scenarios
    TraceMatrix --> CodeAnalysis: Coverage map

    CodeAnalysis --> GateDecision: Analysis complete

    GateDecision --> GatePass: All criteria met
    GateDecision --> GateConcerns: Minor issues
    GateDecision --> GateFail: Critical issues
    GateDecision --> GateWaived: Explicitly accepted

    GatePass --> [*]: Ready for Done
    GateConcerns --> [*]: Ready with awareness
    GateFail --> FixRequest: Create fix request
    GateWaived --> [*]: Proceed with waiver

    FixRequest --> DevFix: @dev applies fixes
    DevFix --> [*]: Re-review
```

### 3. Issue Severities

| Severity | Prefix | Action | Gate Impact |
|----------|--------|--------|-------------|
| CRITICAL | `SEC-`, `DATA-` | Auto-fix or block | Gate = FAIL |
| HIGH | `PERF-`, `REL-` | Auto-fix or document | Gate = FAIL |
| MEDIUM | `MNT-`, `TEST-` | Tech debt issue | Gate = CONCERNS |
| LOW | `DOC-`, `ARCH-` | Note in the review | Gate = PASS |

### 4. Gate Decisions

```yaml
Gate Criteria:
  PASS:
    - All acceptance criteria met
    - No high-severity issue
    - Test coverage meets the project standards

  CONCERNS:
    - Non-blocking issues present
    - They must be tracked and scheduled
    - It can proceed with awareness

  FAIL:
    - Acceptance criteria not met
    - High-severity issues present
    - Recommend returning to InProgress

  WAIVED:
    - Issues explicitly accepted
    - Requires approval and rationale
    - Proceed despite known issues
```

---

## CodeRabbit Integration

### Self-Healing Configuration

```yaml
coderabbit_integration:
  enabled: true
  installation_mode: wsl

  self_healing:
    enabled: true
    type: full
    max_iterations: 3
    timeout_minutes: 30
    trigger: review_start

    severity_filter:
      - CRITICAL
      - HIGH

    behavior:
      CRITICAL: auto_fix       # Auto-fix (3 attempts max)
      HIGH: auto_fix           # Auto-fix (3 attempts max)
      MEDIUM: document_as_debt # Create a tech debt issue
      LOW: ignore              # Note in the review, no action
```

### CodeRabbit Commands

```bash
# Pre-review (uncommitted changes)
wsl bash -c 'cd /mnt/c/.../aexos-core && ~/.local/bin/coderabbit --prompt-only -t uncommitted'

# Story review (committed changes vs main)
wsl bash -c 'cd /mnt/c/.../aexos-core && ~/.local/bin/coderabbit --prompt-only -t committed --base main'
```

### Self-Healing Flow

```mermaid
flowchart TB
    START["Start Self-Healing"]
    SCAN["Run CodeRabbit CLI"]
    PARSE["Parse Output"]
    CHECK{{"CRITICAL or HIGH?"}}

    FIX["Auto-Fix Issues"]
    INCREMENT["iteration++"]
    MAX_CHECK{{"iteration < 3?"}}

    SUCCESS["PASS - Proceed to Manual Review"]
    TECH_DEBT["Create Tech Debt Issues"]
    FAIL["FAIL - Human Intervention"]

    START --> SCAN
    SCAN --> PARSE
    PARSE --> CHECK

    CHECK -->|No| MEDIUM_CHECK{{"MEDIUM issues?"}}
    MEDIUM_CHECK -->|Yes| TECH_DEBT
    MEDIUM_CHECK -->|No| SUCCESS
    TECH_DEBT --> SUCCESS

    CHECK -->|Yes| FIX
    FIX --> INCREMENT
    INCREMENT --> MAX_CHECK
    MAX_CHECK -->|Yes| SCAN
    MAX_CHECK -->|No| FAIL

    style SUCCESS fill:#c8e6c9
    style FAIL fill:#ffcdd2
    style TECH_DEBT fill:#fff9c4
```

---

## Integrations Between Agents

### Integration Diagram

```mermaid
flowchart TB
    subgraph AGENTS["@qa Integrations"]
        direction TB

        subgraph QA_BOX["@qa (Argus) - Test Architect"]
            QA_DESC["Reviews stories, creates gates,<br/>test design, traceability"]
            QA_CMDS["Main commands:<br/>*review, *gate, *test-design<br/>*risk-profile, *nfr-assess, *trace"]
        end

        subgraph DEV_BOX["@dev (Vulcan) - Developer"]
            DEV_DESC["Receives QA feedback,<br/>applies fixes"]
            DEV_CMDS["Receives: QA_FIX_REQUEST.md<br/>Runs: *fix-qa-issues"]
        end

        subgraph PO_BOX["@po (Themis) - Product Owner"]
            PO_DESC["Manages the follow-up backlog"]
            PO_CMDS["Receives: Backlog items<br/>Runs: *backlog-review"]
        end

        subgraph SM_BOX["@sm (Chronos) - Scrum Master"]
            SM_DESC["Can request risk profiling"]
            SM_CMDS["Collaborates on: Sprint planning"]
        end

        subgraph DEVOPS_BOX["@github-devops - DevOps"]
            DEVOPS_DESC["Quality gates for PRs<br/>and deployments"]
            DEVOPS_CMDS["Uses: CodeRabbit integration"]
        end
    end

    QA_BOX -->|"review feedback"| DEV_BOX
    QA_BOX -->|"follow-ups"| PO_BOX
    QA_BOX -->|"risk profile"| SM_BOX
    QA_BOX -->|"quality gates"| DEVOPS_BOX
    DEV_BOX -->|"fixes ready"| QA_BOX

    CODERABBIT[("CodeRabbit<br/>Automated Review")]
    QA_BOX <-->|"integration"| CODERABBIT

    style QA_BOX fill:#fce4ec
    style DEV_BOX fill:#e8f5e9
    style PO_BOX fill:#e3f2fd
    style SM_BOX fill:#fff3e0
    style DEVOPS_BOX fill:#f3e5f5
    style CODERABBIT fill:#e1f5fe
```

### QA -> Dev Handoff Flow

1. @qa runs `*review {story}`
2. Identifies critical issues
3. Creates `*create-fix-request {story}`
4. @dev receives `QA_FIX_REQUEST.md`
5. @dev runs `*fix-qa-issues {story}`
6. @dev creates `READY_FOR_REREVIEW.md`
7. @qa re-reviews with `*review {story}`

### Backlog Flow

1. @qa identifies follow-ups during the review
2. Adds the item with `*backlog-add`
3. The item is tracked with source: "QA Review"
4. @po prioritizes it with `*backlog-prioritize`

---

## Configuration

### core-config.yaml

```yaml
qa:
  qaLocation: docs/qa
  gatesLocation: docs/qa/gates
  assessmentsLocation: docs/qa/assessments
  reportsLocation: docs/qa/coderabbit-reports

  # Thresholds
  coverageTarget: 80
  qualityScoreMinimum: 70

  # CodeRabbit
  coderabbitEnabled: true
  selfHealingEnabled: true
  maxSelfHealingIterations: 3

devStoryLocation: docs/stories
```

### Git Restrictions

```yaml
git_restrictions:
  allowed_operations:
    - git status      # Check the repository state
    - git log         # View the commit history
    - git diff        # Review changes
    - git branch -a   # List branches

  blocked_operations:
    - git push        # ONLY @github-devops can push
    - git commit      # QA reviews, it does not commit
    - gh pr create    # ONLY @github-devops creates PRs
```

---

## Best Practices

### During the Review

1. **Run CodeRabbit first** - Let automation find the obvious issues
2. **Assess risk** - Determine the depth of the review
3. **Check traceability** - Every AC must have a corresponding test
4. **Document refactorings** - If you modify code, explain WHY and HOW
5. **Stay focused** - Only update the QA Results section

### Gate Creation

1. **Use the correct severities** - low/medium/high only
2. **Justify the decision** - status_reason in 1-2 sentences
3. **Identify owners** - dev/sm/po for each issue
4. **Set an expiration** - Typically 2 weeks

### Avoid

- Modifying story sections beyond QA Results
- Blocking without a clear rationale
- Ignoring medium issues (document them as tech debt)
- Reviewing before CodeRabbit finishes
- Approving without checking test coverage

---

## Troubleshooting

### CodeRabbit not found

```bash
# Check the installation
wsl bash -c '~/.local/bin/coderabbit --version'

# If not installed, use wsl_config.installation_path in the agent
```

### Review timeout

- CodeRabbit can take up to 30 minutes
- Increase the timeout if necessary
- Check whether there are stuck processes

### Gate file not created

1. Check whether `qa.qaLocation/gates` exists
2. Check write permissions
3. Confirm that the `qa-gate-tmpl.yaml` template is available

### Story not found

1. Check the story ID format (epic.story)
2. Confirm that the story exists in `docs/stories/`
3. Use the full path if necessary

### Self-healing issues persist

1. Check whether the issues are really auto-fixable
2. Consider manual intervention after 3 iterations
3. Create tech debt for complex issues

---

## References

### Core Tasks

- [qa-gate.md](/.aexos-core/development/tasks/qa-gate.md)
- [qa-review-story.md](/.aexos-core/development/tasks/qa-review-story.md)
- [qa-test-design.md](/.aexos-core/development/tasks/qa-test-design.md)
- [qa-risk-profile.md](/.aexos-core/development/tasks/qa-risk-profile.md)
- [qa-nfr-assess.md](/.aexos-core/development/tasks/qa-nfr-assess.md)
- [qa-trace-requirements.md](/.aexos-core/development/tasks/qa-trace-requirements.md)

### Workflows

- [qa-loop.yaml](/.aexos-core/development/workflows/qa-loop.yaml)

### Teams

- [team-qa-focused.yaml](/.aexos-core/development/agent-teams/team-qa-focused.yaml)

### Agent

- [qa.md](/.aexos-core/development/agents/qa.md)

### Related Documents

- [BACKLOG-MANAGEMENT-SYSTEM.md](/docs/guides/BACKLOG-MANAGEMENT-SYSTEM.md)

---

## Summary

| Aspect | Details |
|--------|---------|
| **Total Core Tasks** | 10 main task files |
| **Total Secondary Tasks** | 9 supporting task files |
| **Main Workflow** | qa-loop.yaml (orchestration) |
| **Review Commands** | 2 (`*code-review`, `*review`) |
| **Gate Commands** | 3 (`*gate`, `*nfr-assess`, `*risk-profile`) |
| **Test Commands** | 4 (`*test-design`, `*trace`, `*generate-tests`, `*run-tests`) |
| **Backlog Commands** | 3 (`*backlog-*` family) |
| **Gate Decisions** | 4 (PASS, CONCERNS, FAIL, WAIVED) |
| **Severities** | 3 (low, medium, high) |
| **Self-Healing Max** | 3 iterations |
| **CodeRabbit Integration** | Yes (WSL mode) |

---

## Changelog

| Date | Author | Description |
|------|--------|-------------|
| 2026-02-04 | @qa | Initial document created with complete Mermaid diagrams |

---

*-- Argus, guardian of quality*
