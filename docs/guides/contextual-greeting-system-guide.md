# Contextual Greeting System Guide

---

**Story:** 6.1.2.5 - Contextual Agent Load System
**Status:** Components Implemented, Integration Pending
**Date:** 2025-01-15

---

## 📖 Overview

The Contextual Greeting System is a UX improvement that makes AEXOS agent greetings intelligent and adaptive, showing relevant information and commands based on the session context.

## 🎯 What Has Been Implemented

### ✅ Core Components (Story 6.1.2.5)

1. **ContextDetector** (`.aexos-core/core/session/context-detector.js`)
   - Detects session type: `new`, `existing`, or `workflow`
   - Hybrid approach: conversation history (preferred) + session file (fallback)
   - 1-hour TTL for inactive sessions

2. **GitConfigDetector** (`.aexos-core/infrastructure/scripts/git-config-detector.js`)
   - Detects the project's git configuration
   - Cache with a 5-minute TTL
   - 1000ms timeout protection

3. **GreetingBuilder** (`.aexos-core/development/scripts/greeting-builder.js`)
   - Assembles contextual greetings based on the session type
   - Filters commands by visibility (full/quick/key)
   - 150ms timeout with graceful fallback

4. **WorkflowNavigator** (`.aexos-core/development/scripts/workflow-navigator.js`)
   - Detects the state of the current workflow
   - Suggests next commands based on the state
   - Pre-populates commands with context (story path, branch)

5. **Workflow Patterns** (`.aexos-core/data/workflow-patterns.yaml`)
   - 10 common workflows defined
   - State transitions with next-step suggestions
   - Patterns validated against real project usage

### ⏳ Pending (Future Story - 6.1.4 or 6.1.6)

**Integration with the Activation Process:**
- Intercept agent activation (when you type `@dev`, `@po`, etc.)
- Call GreetingBuilder automatically
- Inject the contextual greeting in place of the default greeting

## 📊 Session Types

### 1. New Session

**When:** First interaction or after 1 hour of inactivity

**Characteristics:**
- Full introduction (archetypal greeting)
- Description of the agent's role
- Project status (if git is configured)
- Full command list (up to 12 commands with visibility=full)

**Example:**
```
💻 Vulcan (Builder) ready. Let's build something solid!

**Role:** Full Stack Developer specializing in clean, maintainable code

📊 Project Status:
🌿 main
📝 5 modified files
📦 Last commit: feat: implement greeting system

**Available Commands:**
   - `*help`: Show all available commands
   - `*develop`: Implement story tasks
   - `*review-code`: Review code changes
   - `*run-tests`: Execute test suite
   - `*build`: Build for production
   ... (up to 12 commands)
```

### 2. Existing Session

**When:** Continuing work within the same session

**Characteristics:**
- Condensed introduction (named greeting)
- Project status
- Current context (last action)
- Quick commands (6-8 commands with visibility=quick)

**Example:**
```
💻 Vulcan (Builder) ready.

📊 Project Status:
🌿 feature/story-6.1.2.5
📝 3 modified files

📌 **Last Action:** review-code

**Quick Commands:**
   - `*help`: Show help
   - `*develop`: Implement story
   - `*review-code`: Review code
   - `*run-tests`: Run tests
   - `*qa-gate`: Run quality gate
   ... (6-8 most used commands)
```

### 3. Workflow Session

**When:** In the middle of an active workflow (e.g. after validating a story)

**Characteristics:**
- Minimal introduction (minimal greeting)
- Condensed project status
- Workflow context (working on X)
- **Next-step suggestions** (NEW!)
- Key commands (3-5 commands with visibility=key)

**Example:**
```
⚖️ Themis ready.

📊 🌿 main | 📝 5 modified | 📖 STORY-6.1.2.5

📌 **Context:** Working on Story 6.1.2.5

**Story validated! Next steps:**

1. `*develop-yolo story-6.1.2.5.md` - Autonomous mode (no interruptions)
2. `*develop-interactive story-6.1.2.5.md` - Interactive mode with checkpoints
3. `*develop-preflight story-6.1.2.5.md` - Plan first, then execute

**Key Commands:**
   - `*help`: Show help
   - `*validate-story-draft`: Validate story
   - `*backlog-summary`: Quick backlog status
```

## 🏗️ Command Visibility System

### Command Metadata

Every command now has a `visibility` attribute that controls when it appears:

```yaml
commands:
  - name: help
    visibility: [full, quick, key]  # Always visible
    description: "Show all available commands"

  - name: develop
    visibility: [full, quick, key]  # Primary command
    description: "Implement story tasks"

  - name: review-code
    visibility: [full, quick]  # Frequently used, but not critical
    description: "Review code changes"

  - name: build
    visibility: [full]  # Less used, only in new session
    description: "Build for production"

  - name: qa-gate
    visibility: [key]  # Critical in workflows, but not always needed
    description: "Run quality gate"
```

### Categorization Guidelines

**`full` (12 commands)** - New Session
- All available commands
- Shows the agent's full capabilities
- Ideal for discovery

**`quick` (6-8 commands)** - Existing Session
- Frequently used commands
- Focused on productivity
- Removes rarely used commands

**`key` (3-5 commands)** - Workflow Session
- Commands critical to the current workflow
- Minimum distraction
- Maximum efficiency

## 🔄 Workflow Navigation

### Defined Workflows

**10 common workflows:**

1. **story_development** - Validate → Develop → QA → Deploy
2. **epic_creation** - Create epic → Create stories → Validate
3. **backlog_management** - Review → Prioritize → Schedule
4. **architecture_review** - Analyze → Document → Review
5. **git_workflow** - Quality gate → PR → Merge
6. **database_workflow** - Design → Migrate → Test
7. **code_quality_workflow** - Assess → Refactor → Test
8. **documentation_workflow** - Research → Document → Sync
9. **ux_workflow** - Design → Implement → Validate
10. **research_workflow** - Brainstorm → Analyze → Document

### State Transitions

Each workflow defines transitions between states with:
- **Trigger:** Command that completes successfully
- **Greeting Message:** Contextual message
- **Next Steps:** Suggestions for next commands with pre-populated args

**Example (Story Development):**

```yaml
story_development:
  transitions:
    validated:
      trigger: "validate-story-draft completed successfully"
      greeting_message: "Story validated! Ready to implement."
      next_steps:
        - command: develop-yolo
          args_template: "${story_path}"
          description: "Autonomous YOLO mode (no interruptions)"
        - command: develop-interactive
          args_template: "${story_path}"
          description: "Interactive mode with checkpoints (default)"
        - command: develop-preflight
          args_template: "${story_path}"
          description: "Plan everything upfront, then execute"
```

## 🧪 How to Test It Today

### Option 1: Automated Test Script

```bash
node .aexos-core/development/scripts/test-greeting-system.js
```

This script tests the 4 scenarios:
1. New session greeting (Dev)
2. Existing session greeting (Dev)
3. Workflow session greeting (PO)
4. Simple greeting fallback

### Option 2: Manual Test via Node REPL

```javascript
const GreetingBuilder = require('./.aexos-core/development/scripts/greeting-builder');
const builder = new GreetingBuilder();

// Mock agent
const mockAgent = {
  name: 'Vulcan',
  icon: '💻',
  persona_profile: {
    greeting_levels: {
      named: '💻 Vulcan (Builder) ready!'
    }
  },
  persona: { role: 'Developer' },
  commands: [
    { name: 'help', visibility: ['full', 'quick', 'key'] }
  ]
};

// Test new session
builder.buildGreeting(mockAgent, { conversationHistory: [] })
  .then(greeting => console.log(greeting));
```

### Option 3: Wait for Full Integration

Once the integration with the activation process is implemented (Story 6.1.4/6.1.6), the system will work automatically when activating any agent:

```
@dev              → Automatic contextual greeting
@po               → Automatic contextual greeting
@qa               → Automatic contextual greeting
```

## 📁 Related Files

### Core Scripts
- `.aexos-core/core/session/context-detector.js` - Session type detection
- `.aexos-core/infrastructure/scripts/git-config-detector.js` - Git config detection
- `.aexos-core/development/scripts/greeting-builder.js` - Greeting assembly
- `.aexos-core/development/scripts/workflow-navigator.js` - Workflow navigation
- `.aexos-core/development/scripts/agent-exit-hooks.js` - Exit hooks (for persistence)

### Data Files
- `.aexos-core/data/workflow-patterns.yaml` - Workflow definitions

### Tests
- `tests/unit/context-detector.test.js` - 23 tests
- `tests/unit/git-config-detector.test.js` - 19 tests
- `tests/unit/greeting-builder.test.js` - 23 tests
- `tests/integration/performance.test.js` - Performance validation

### Configuration
- `.aexos-core/core-config.yaml` - Global configuration (git + agentIdentity sections)

### Agents (Updated)
- `.aexos-core/agents/dev.md` - ✅ Command visibility metadata
- `.aexos-core/agents/po.md` - ✅ Command visibility metadata
- `.aexos-core/agents/*.md` - ⏳ Remaining 9 agents (pending update)

## 🎯 Next Steps

### Immediate (Fix Test Issues)
1. Fix test configuration issues (1-2 hours)
2. Run full test suite
3. Execute performance tests

### Short-term (Story 6.1.4 or 6.1.6)
1. Implement integration with agent activation process
2. Update remaining 9 agents with command visibility metadata
3. Test with real agent activations

### Long-term (Story 6.1.2.6)
1. Implement dynamic workflow pattern learning
2. Add usage-based command prioritization
3. Implement agent collaboration hints

## 📊 Performance Metrics

**Target (from Story 6.1.2.5):**
- P50 latency: <100ms
- P95 latency: <130ms
- P99 latency: <150ms (hard limit)

**Expected (based on code review):**
- Git config (cache hit): <5ms ✅
- Git config (cache miss): <50ms ✅
- Context detection: <50ms ✅
- Session file I/O: <10ms ✅
- Workflow matching: <20ms ✅
- **Total P99:** ~100-120ms ✅ (well under limit)

**Optimizations:**
- Parallel execution (Promise.all)
- TTL-based caching
- Timeout protection
- Early exit on cache hit

## 🛡️ Backwards Compatibility

**100% Backwards Compatible:**
- Agents without visibility metadata show all commands (max 12)
- Graceful fallback to a simple greeting on any error
- Zero breaking changes to the activation process
- Gradual migration (Phase 1: dev/po → Phase 2: remaining 9)

## ❓ FAQ

**Q: Why is the greeting not contextual when I activate an agent right now?**
A: The integration with the activation process has not been implemented yet. The components exist but are not called automatically yet.

**Q: When will the integration be done?**
A: In a future story (probably 6.1.4 or 6.1.6). It depends on the agent configuration system.

**Q: How can I test it today?**
A: Use the test script: `node .aexos-core/development/scripts/test-greeting-system.js`

**Q: What happens if an agent has no visibility metadata?**
A: Fallback: it shows all commands (max 12). Nothing breaks.

**Q: How do I add visibility metadata to my commands?**
A: See the "Command Visibility System" section above and the examples in the dev.md and po.md agents.

**Q: Can I disable the contextual greeting?**
A: Yes, via config: `core-config.yaml` → `agentIdentity.greeting.contextDetection: false`

---

**Document Updated:** 2025-01-15
**Author:** Argus (QA) + Vulcan (Dev)
**Story:** 6.1.2.5 - Contextual Agent Load System
