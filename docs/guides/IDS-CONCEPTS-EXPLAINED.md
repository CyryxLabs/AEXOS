# IDS - Incremental Development System: Concepts Explained

**Conceptual Reference Document**
**Author:** Pedro Valério Lopez (via Mind Clone)
**Date:** 2026-02-05
**Version:** 1.0

> "Humans develop incrementally; AI agents develop generationally."
> — Fundamental principle of IDS

---

## 📖 Table of Contents

1. [The Core Problem](#the-core-problem)
2. [The Solution: IDS](#the-solution-ids)
3. [REUSE > ADAPT > CREATE](#reuse--adapt--create)
4. [Entity Registry (The Inventory)](#entity-registry-the-inventory)
5. [Decision Engine (The Brain)](#decision-engine-the-brain)
6. [Verification Gates (The Gates)](#verification-gates-the-gates)
7. [Self-Healing (Self-Repair)](#self-healing-self-repair)
8. [Success Metrics](#success-metrics)
9. [Visual Glossary](#visual-glossary)

---

## The Core Problem

### The Difference Between Humans and AIs

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   👨‍💻 HUMAN DEVELOPER              🤖 AI AGENT (no IDS)          │
│                                                                 │
│   "Already something like this?"   "I'll create from scratch!"  │
│          ↓                                  ↓                   │
│   Searches existing code           Generates new code           │
│          ↓                                  ↓                   │
│   Adapts 10 lines                  Writes 200 lines             │
│          ↓                                  ↓                   │
│   ✅ Reuse                         ❌ Duplication               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🏠 Analogy: Renovation vs. Construction

Imagine you want a new bedroom in your house:

| Human | AI (without IDS) |
|--------|--------------|
| "I already have a guest room. I'll convert it." | "I'll build a whole new house!" |
| Buys paint and new furniture | Hires an architect, an engineer, bricklayers |
| Spends R$ 5,000 and 1 week | Spends R$ 500,000 and 12 months |
| Result: a new bedroom | Result: a new house (but you only wanted a bedroom) |

**IDS teaches the AI to think like the human**: first look at what already exists, then decide whether to renovate or build.

---

## The Solution: IDS

The **Incremental Development System** is a set of tools and processes that forces AI agents to:

1. **Query before creating** - Always look at the inventory first
2. **Follow a hierarchy** - REUSE > ADAPT > CREATE
3. **Justify decisions** - If creating something new, explain why
4. **Pass through gates** - Verification at every step
5. **Self-correct** - The system detects and fixes problems

### 🏪 Analogy: The Smart Storeroom

Think of IDS as a company storeroom with a very strict clerk:

```
┌─────────────────────────────────────────────────────────────────┐
│                      🏪 THE IDS STOREROOM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  You: "I need a blue pen"                                       │
│                                                                 │
│  Storekeeper: "Let me check the system..."                      │
│               [Queries Entity Registry]                         │
│                                                                 │
│               "Found 3 options:                                 │
│                - Blue BIC pen (95% compatible) → REUSE          │
│                - Black BIC pen (80% + blue) → ADAPT             │
│                - Nothing similar → CREATE"                      │
│                                                                 │
│  You: "I do want to create a new one"                           │
│                                                                 │
│  Storekeeper: "Fine, but I need you to sign here                │
│                explaining why the blue BIC won't do."           │
│                [CREATE Justification Required]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## REUSE > ADAPT > CREATE

This is the **decision hierarchy** of IDS. Always in this order of priority.

### The Three Levels

| Decision | When to Use | Match Score | Analogy |
|---------|-------------|----------------|----------|
| **REUSE** | Something perfect already exists | ≥ 90% | Wearing yesterday's clothes (still clean) |
| **ADAPT** | Something similar exists | 60-89% | Hemming the trousers (they fit, but need a small adjustment) |
| **CREATE** | Nothing useful exists | < 60% | Buying new clothes (nothing in the wardrobe fits) |

### 🎸 Analogy: The Musician and the Songs

```
REUSE (≥90%):
"I need to play a romantic song at the wedding"
→ "I already have Ed Sheeran's 'Perfect' in my repertoire. I'll use it!"
→ Zero new work. Maximum efficiency.

ADAPT (60-89%):
"I need to play a romantic song in Portuguese"
→ "I have 'Perfect', but it's in English. I'll adapt the lyrics!"
→ Partial work. Leverages the existing structure.

CREATE (<60%):
"I need a jingle for client XYZ"
→ "I have nothing that fits. I'll compose from scratch."
→ Full work. But JUSTIFIED.
```

### The Decision Matrix (Technical)

```javascript
if (relevanceScore >= 0.9) {
  return 'REUSE';  // Use directly, without changes
}

if (relevanceScore >= 0.6 &&
    canAdapt >= 0.6 &&
    impactOnOthers < 30%) {
  return 'ADAPT';  // Modify, carefully
}

return 'CREATE';   // Create new, with justification
```

### ⚠️ The 30% Limit

> **Roundtable Adjustment #2:** The 30% threshold is empirical. It will be calibrated after 90 days of use.

**The Ship Analogy:**
- If you refit less than 30% of the ship, it is still the same ship
- If you refit more than 30%, you are practically building another one
- When the "refit" affects too much, it is better to create from scratch

---

## Entity Registry (The Inventory)

The Entity Registry is the **central database** that stores information about all artifacts in the system.

### 📦 Analogy: The Netflix Catalog

Just as Netflix has a catalog with metadata for each movie (genre, runtime, actors, rating), the Entity Registry has:

| Field | What It Is | Netflix Analogy |
|-------|---------|------------------|
| `path` | Where the file is | Video URL |
| `type` | Artifact type (task, template, script) | Genre (movie, series, documentary) |
| `purpose` | What it does | Synopsis |
| `keywords` | Search keywords | Tags (action, romance, comedy) |
| `usedBy` | Who uses this artifact | "People who watched X also watched Y" |
| `dependencies` | What it depends on | "To watch Part 2, watch Part 1" |
| `adaptability` | How easy it is to modify (0-1) | "Available for download" (yes/no) |
| `checksum` | Fingerprint of the file | Verification hash |

### Real Example from the Registry

```yaml
entities:
  tasks:
    create-story:
      path: ".aexos-core/development/tasks/create-story.md"
      type: "task"
      purpose: "Generates development stories from requirements"
      keywords: ["story", "create", "development", "agile"]
      usedBy: ["@sm", "@po", "workflow-story-creation"]
      dependencies: ["template-story", "checklist-story"]
      adaptability:
        score: 0.7  # Easy to adapt
        constraints: ["Do not change the YAML structure"]
        extensionPoints: ["Add custom fields"]
      checksum: "sha256:abc123..."
```

### 🔍 How the Search Works

```
You: "I need to create a deploy task"

Registry: "Let me look..."
          [TF-IDF + Fuzzy Match]

Results:
1. deploy-to-production.md (92% match) → REUSE!
2. deploy-staging.md (78% match) → ADAPT?
3. ci-cd-pipeline.md (45% match) → CREATE if nothing fits
```

---

## Decision Engine (The Brain)

The Decision Engine is the **algorithm that analyzes** your request and recommends REUSE, ADAPT or CREATE.

### 🧠 Analogy: The Personal Shopper

Imagine you hired a very discerning personal shopper:

```
┌─────────────────────────────────────────────────────────────────┐
│                     🧠 DECISION ENGINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUT: "I need a blue dress shirt for an interview"            │
│                                                                 │
│  PROCESS:                                                       │
│  1. Opens your wardrobe (Entity Registry)                       │
│  2. Analyzes each item                                          │
│  3. Calculates compatibility                                    │
│  4. Considers impact ("If I wear this, what goes with it?")     │
│                                                                 │
│  OUTPUT:                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ RECOMMENDATION: ADAPT                                     │  │
│  │ Confidence: MEDIUM                                        │  │
│  │                                                           │  │
│  │ Artifact: white-dress-shirt.md                            │  │
│  │ Match: 75%                                                │  │
│  │ Action: Dye it blue (adapt to new context)                │  │
│  │                                                           │  │
│  │ Reason: "Already has a dress shirt. Color is              │  │
│  │         adaptable. Buying new would be waste."            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### TF-IDF: The Magic of Search

**TF-IDF** (Term Frequency - Inverse Document Frequency) is how the algorithm finds matches:

```
Analogy: Choosing a Movie

TF (Term Frequency):
- "Action" appears 50x in the description → High relevance for action

IDF (Term Rarity):
- "Movie" appears in ALL of them → Does not help to differentiate
- "Samurai" appears in 3 movies → Highly differentiating

Combined:
- Search: "Action movie with samurai"
- TF-IDF finds: "Kill Bill" (action=high, samurai=rare)
- Ignores: "Fast and Furious" (action=high, samurai=zero)
```

### CREATE Justification (Roundtable #4)

> **New Rule:** Every CREATE decision must include a complete justification.

```javascript
// Mandatory structure for CREATE
{
  action: 'CREATE',
  confidence: 'low',
  justification: {
    evaluated_patterns: ['task-A', 'task-B', 'script-C'],
    rejection_reasons: {
      'task-A': 'Does not support the webhooks I need',
      'task-B': 'Specific to @pm, I need something generic',
      'script-C': 'Performance >500ms, I need <100ms'
    },
    new_capability: 'Generic task with webhooks and <100ms',
    review_scheduled: '2026-03-07'  // 30 days later
  }
}
```

### 🏛️ Analogy: The Judge and the Case

CREATE without justification is like requesting a new trial without explaining why:

| Without IDS | With IDS |
|---------|---------|
| "I want to create a new task" | "I want to create a new task because..." |
| "OK, created!" | "Which existing ones did you evaluate?" |
| No accountability | "task-A doesn't fit because X, task-B doesn't fit because Y" |
| Duplication proliferates | "OK, justified. Review in 30 days." |

---

## Verification Gates (The Gates)

The Gates are **verification points** along the development flow.

### 🚦 Analogy: Highway Tollbooths

```
┌─────────────────────────────────────────────────────────────────┐
│                   🚦 VERIFICATION GATES                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   START                                                         │
│     │                                                           │
│     ▼                                                           │
│   ┌─────┐  "Does a similar epic exist?"                         │
│   │ G1  │  @pm - ADVISORY (can pass, but warns)                 │
│   └──┬──┘                                                       │
│      │                                                          │
│      ▼                                                          │
│   ┌─────┐  "Are there tasks that cover this?"                   │
│   │ G2  │  @sm - ADVISORY                                       │
│   └──┬──┘                                                       │
│      │                                                          │
│      ▼                                                          │
│   ┌─────┐  "Are the story references valid?"                    │
│   │ G3  │  @po - SOFT BLOCK (can override with justification)   │
│   └──┬──┘                                                       │
│      │                                                          │
│      ▼                                                          │
│   ┌─────┐  "Reminder: check the registry!"                      │
│   │ G4  │  @dev - INFORMATIONAL (only logs, does not block)     │
│   └──┬──┘  ⚡ <2s - AUTOMATIC                                    │
│      │                                                          │
│      ▼                                                          │
│   ┌─────┐  "Could the new code have reused existing code?"      │
│   │ G5  │  @qa - BLOCKS MERGE (if a violation is detected)      │
│   └──┬──┘  ⚡ <30s - AUTOMATIC                                   │
│      │                                                          │
│      ▼                                                          │
│   ┌─────┐  "Registry intact? Everything registered?"            │
│   │ G6  │  @devops - BLOCKS ON CRITICAL                         │
│   └──┬──┘  ⚡ <60s - AUTOMATIC                                   │
│      │                                                          │
│      ▼                                                          │
│    END ✅                                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Gate Classification (Roundtable #3)

| Gate | Agent | Type | Latency | Behavior |
|------|--------|------|----------|---------------|
| G1 | @pm | Human-in-loop | < 24h | Advisory only |
| G2 | @sm | Human-in-loop | < 24h | Advisory only |
| G3 | @po | Human-in-loop | < 4h | Soft block |
| G4 | @dev | **AUTOMATIC** | **< 2s** | Informational |
| G5 | @qa | **AUTOMATIC** | **< 30s** | Blocks merge |
| G6 | @devops | **AUTOMATIC** | **< 60s** | Blocks critical |

> **Roundtable #3:** Gates G4-G6 MUST be automatic. Manual verification at runtime creates unacceptable friction.

### 🏭 Analogy: Quality Control in the Factory

```
G1-G3: Human supervisors at the start of the line
       "Hey, doesn't this product already exist? Let's optimize."
       → Advice, not a block

G4:    Automatic sensor on the conveyor belt
       "Beep! Reminder: check the specifications."
       → Only warns, does not stop the line

G5:    Quality scanner before packaging
       "ALERT! Product out of spec. Line stopped."
       → Stops until fixed

G6:    Final inspection before the truck
       "CRITICAL: Defective batch. It cannot ship."
       → Blocks shipment
```

---

## Self-Healing (Self-Repair)

The Self-Healing system **detects and fixes problems automatically**.

### 🏥 Analogy: The Immune System

```
┌─────────────────────────────────────────────────────────────────┐
│                   🏥 SELF-HEALING SYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HUMAN BODY                │  ENTITY REGISTRY                   │
│  ──────────                │  ───────────────                   │
│                            │                                    │
│  Virus enters              │  File deleted                      │
│       ↓                    │       ↓                            │
│  Fever (alert)             │  Warning (alert)                   │
│       ↓                    │       ↓                            │
│  Antibodies attack         │  Auto-heal removes reference       │
│       ↓                    │       ↓                            │
│  Virus eliminated          │  Registry corrected                │
│       ↓                    │       ↓                            │
│  Immune memory             │  Healing log                       │
│                            │                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Three Health Categories (Roundtable #6)

#### A. Data Integrity (Physical)

| Problem | Severity | Auto-Heal? | Action |
|----------|------------|------------|------|
| File deleted | CRITICAL | ❌ | Warns a human |
| Wrong checksum | HIGH | ✅ | Recalculates |
| Orphan reference | MEDIUM | ✅ | Removes the ref |
| Invalid schema | HIGH | ❌ | Warns a human |

**Analogy:** It is like checking whether all the organs are in place and working.

#### B. Performance Integrity (Functional)

| Problem | Threshold | Auto-Heal? | Action |
|----------|-----------|------------|------|
| Slow query | > 100ms | ✅ | Rebuild index |
| Low cache | < 70% hit | ✅ | Expand cache |
| Stale index | > 1 hour | ✅ | Rebuild TF-IDF |

**Analogy:** It is like checking whether the heart beats at the right rhythm and the lungs breathe well.

#### C. Quality Integrity (Evolutionary)

| Problem | Criterion | Auto-Heal? | Action |
|----------|----------|------------|------|
| Near-duplicate | > 95% similar | ❌ | Suggests a merge |
| Stale entity | 90 days with no ref | ✅ | Flag archive |
| False CREATE | 60 days, 0 reuse | ❌ | Queue review |

**Analogy:** It is like checking whether the body is evolving well - it has no cancerous cells (duplicates) or atrophied parts (stale).

### The Healing Flow

```
                    ┌─────────────────┐
                    │  Health Check   │
                    │   Scheduler     │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │       Detects Problem        │
              │  (Data/Performance/Quality)  │
              └──────────────┬───────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
            ┌───────────┐      ┌───────────┐
            │ Auto-Heal │      │  Warning  │
            │ (Simple)  │      │ (Complex) │
            └─────┬─────┘      └─────┬─────┘
                  │                  │
                  ▼                  ▼
            ┌───────────┐      ┌───────────┐
            │  Backup   │      │  Notify   │
            │  + Fix    │      │  Human    │
            └─────┬─────┘      └───────────┘
                  │
                  ▼
            ┌───────────┐
            │   Log     │
            │  Action   │
            └───────────┘
```

---

## Success Metrics

### CREATE Rate: The Main Metric (Roundtable #5)

The **CREATE Rate** measures how well the system is working:

```
┌─────────────────────────────────────────────────────────────────┐
│                   📊 CREATE RATE EVOLUTION                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  100% │                                                         │
│       │ ████                                                    │
│   80% │ ████                                                    │
│       │ ████ ████                                               │
│   60% │ ████ ████                                               │
│       │ ████ ████ ████                                          │
│   40% │ ████ ████ ████                                          │
│       │ ████ ████ ████ ████                                     │
│   20% │ ████ ████ ████ ████ ████                                │
│       │ ████ ████ ████ ████ ████ ████                           │
│    0% └─────────────────────────────────────────────────────    │
│         M1-3   M4-6   M7-9  M10-12  M13+                        │
│                                                                 │
│  Month 1-3:  50-60% CREATE (Normal - building registry)         │
│  Month 4-6:  30-40% CREATE (Healthy - patterns emerging)        │
│  Month 7-12: 15-25% CREATE (Mature - system working)            │
│  Month 12+:  <15% CREATE (Optimal - strong reuse culture)       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🌱 Analogy: The Growing Garden

```
Month 1-3: PLANTING
"I am planting all the seeds (creating entities)"
High CREATE is expected - we are building the inventory

Month 4-6: GROWTH
"The plants are growing, I start harvesting some"
Medium CREATE - we already have things to reuse

Month 7-12: HARVEST
"I harvest more than I plant"
Low CREATE - most of it already exists

Month 12+: MATURE GARDEN
"I mostly just maintain and harvest"
Minimal CREATE - only genuinely new things
```

### Health Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    AEXOS IDS DASHBOARD                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  REGISTRY HEALTH          DECISION METRICS                      │
│  ─────────────────        ─────────────────                     │
│  Entities: 847            REUSE:  45% ████████░░                │
│  Categories: 12           ADAPT:  35% ███████░░░                │
│  Last Sync: 2s ago        CREATE: 20% ████░░░░░░                │
│  Integrity: ✅ 100%                                              │
│                           CREATE Trend: ↓ 5% (good!)            │
│                                                                 │
│  GATE PERFORMANCE         SELF-HEALING                          │
│  ─────────────────        ─────────────                         │
│  G4: 1.2s avg ✅          Issues Found: 3                       │
│  G5: 18s avg ✅           Auto-Fixed: 2                         │
│  G6: 45s avg ✅           Warnings: 1                           │
│                           Last Check: 4h ago                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visual Glossary

### Main Concepts

| Term | Simple Definition | Analogy |
|-------|-------------------|----------|
| **IDS** | System that teaches the AI to reuse | GPS that shows existing routes before creating new ones |
| **Entity Registry** | Inventory of all artifacts | Netflix catalog |
| **Decision Engine** | Algorithm that decides REUSE/ADAPT/CREATE | Discerning personal shopper |
| **TF-IDF** | Relevance-based search technique | Google Search for code |
| **Verification Gate** | Checkpoint in the flow | Highway tollbooth |
| **Self-Healing** | Automatic correction of problems | Immune system |
| **CREATE Rate** | % of creations vs reuse | Efficiency thermometer |
| **Adaptability Score** | How easy it is to modify (0-1) | "Malleability" rating |
| **Checksum** | Fingerprint of the file | DNA of the document |

### The 6 Gates

| Gate | Emoji | Who | Type | Analogy |
|------|-------|------|------|----------|
| G1 | 📋 | @pm | Advisory | Receptionist who suggests |
| G2 | 📝 | @sm | Advisory | Consultant who advises |
| G3 | ✅ | @po | Soft Block | Manager who can veto |
| G4 | ⚡ | @dev | Info | Automatic sensor |
| G5 | 🔍 | @qa | Block | Quality inspector |
| G6 | 🚀 | @devops | Critical | Final shipping control |

### Important Thresholds

| Value | Meaning | Analogy |
|-------|-------------|----------|
| **90%** | Limit for direct REUSE | "Practically identical" |
| **60%** | Minimum limit for ADAPT | "Adaptable enough" |
| **30%** | Maximum ADAPT impact | "Beyond that, better to create new" |
| **100ms** | Registry query SLA | "Instantaneous for humans" |
| **2s** | Gate G4 SLA | "Imperceptible in the flow" |
| **70%** | Minimum cache hit rate | "Memory efficiency" |

---

## Complete Flow: A Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                  🎬 A DEVELOPER'S JOURNEY                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. INTENT                                                      │
│     "I need to create an automatic deploy task"                 │
│                                                                 │
│  2. QUERY (Decision Engine)                                     │
│     [Registry Query] → 3 matches found                          │
│                                                                 │
│  3. ANALYSIS                                                    │
│     - deploy-staging.md: 85% match                              │
│     - deploy-manual.md: 72% match                               │
│     - ci-pipeline.md: 45% match                                 │
│                                                                 │
│  4. DECISION                                                    │
│     [Decision Matrix]                                           │
│     → 85% < 90% (not REUSE)                                     │
│     → 85% ≥ 60% + adaptable + impact 15% (ADAPT!)               │
│                                                                 │
│  5. ACTION                                                      │
│     Adapts deploy-staging.md into deploy-production.md          │
│                                                                 │
│  6. GATES                                                       │
│     G4: ✅ "Good ADAPT choice" (logged)                         │
│     G5: ✅ "Valid adaptation" (approved)                        │
│     G6: ✅ "Registry updated" (synced)                          │
│                                                                 │
│  7. RESULT                                                      │
│     Task created with 15% new code (vs 100% if CREATE)          │
│     Registry updated automatically                              │
│     Complete audit trail recorded                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Executive Summary

### The Problem
AIs create new code by default, while humans reuse. This causes duplication and technical debt.

### The Solution
IDS enforces the **REUSE > ADAPT > CREATE** hierarchy through:
- **Registry:** Centralized inventory of everything
- **Decision Engine:** Algorithm that recommends the best action
- **Gates:** Verifications at every step
- **Self-Healing:** Automatic correction of problems

### The Roundtable Adjustments

| # | Adjustment | Impact |
|---|--------|---------|
| 1 | Performance SLA < 100ms | Registry as fast as Google |
| 2 | Calibratable 30% threshold | Flexibility to adjust |
| 3 | Automatic G4-G6 | Zero friction for devs |
| 4 | CREATE justification | Accountability for creations |
| 5 | CREATE rate metric | Health thermometer |
| 6 | Expanded self-healing | Complete immune system |

### The Final Goal

```
From: AI creates 80% of the code from scratch
To:   AI reuses 85% and creates only 15% (what is genuinely new)

Result:
- Less duplicated code
- Less technical debt
- More consistency
- Faster development
```

---

## Useful Commands

```bash
# Query the registry
aexos ids:query "automatic deploy"

# View statistics
aexos ids:stats

# Check health
aexos ids:health

# Fix simple problems
aexos ids:health --fix

# Back up the registry
aexos ids:backup

# Force a full sync
aexos ids:sync
```

---

*Document created by Pedro Valério Lopez (via Mind Clone)*
*Consolidating: Epic IDS, 6 Stories, 6 Roundtable Adjustments*
*"If it is not documented, it does not exist."*
