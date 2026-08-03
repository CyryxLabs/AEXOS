# CLI Graph Dashboard — Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Provide interactive visualization of the code-intel dependency graph in the terminal
- Enable inspection of blast radius, entity relationships and cache/latency metrics via CLI
- Stay aligned with Article I of the Constitution (CLI First) — zero dependency on a web UI
- Make code-intel internal data visible to the user (today it flows only internally to agents)
- Support multiple output formats (ASCII, DOT, Mermaid, JSON) for integration with external tools

### Background Context

The NOGIC Epic (Code Intelligence) built a complete code intelligence module with 8 primitive capabilities, 5 composed ones and 6 helpers per agent — totaling 275 passing tests. However, all of that intelligence is consumed internally by the agents and **there is no way at all to visualize the graphs, metrics or relationships in the terminal**. The data exists (dependency graph, blast radius, entity stats, cache metrics, latency) but is invisible to the user.

This PRD defines a CLI Graph Dashboard that exposes this wealth of data interactively in the terminal, using mature TUI libraries such as `blessed-contrib` for rich widgets (tree, sparkline, charts, gauges).

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-21 | 1.0 | Initial PRD draft based on deep research | Janus (@pm) |

---

## Requirements

### Functional

- **FR1:** The system must render the dependency graph as an interactive tree with expand/collapse in the terminal (`analyzeDependencies` → tree widget)
- **FR2:** The system must display a visual blast radius for any selected file (`assessImpact` → gauge/risk display)
- **FR3:** The system must show cache metrics (hits/misses) as real-time sparklines (`client.getMetrics()` → sparkline widget)
- **FR4:** The system must plot capability latency as a line chart (`client._latencyLog` → line chart)
- **FR5:** The system must display entity statistics from the entity-registry (total, categories, last update) as a table (`registry-loader` → table widget)
- **FR6:** The system must show code-intel provider status (active/inactive, circuit breaker state, failures, uptime) (`isCodeIntelAvailable` + CB → status widget)
- **FR7:** The system must support output in multiple formats: ASCII (default), DOT (Graphviz), Mermaid (docs), JSON (programmatic processing)
- **FR8:** The system must support `--watch` mode for real-time dashboard updates
- **FR9:** The system must work as a CLI command (`aexos graph`) with sub-commands: `--deps`, `--blast <file>`, `--stats`, `--watch`
- **FR10:** The system must provide a fallback to static entity-registry data when the Code Graph MCP is offline

### Non Functional

- **NFR1:** The dashboard must start in under 2 seconds
- **NFR2:** Updates in `--watch` mode must occur every 5 seconds with no perceptible performance impact
- **NFR3:** The system must work on Windows Terminal, PowerShell, and Unix terminals (bash/zsh) — cross-platform
- **NFR4:** The system must work over SSH without significant degradation
- **NFR5:** New dependencies must be minimal and actively maintained (blessed/neo-blessed, blessed-contrib, asciichart)
- **NFR6:** The system must degrade gracefully if the terminal does not support Unicode box-drawing characters

---

## Technical Assumptions

### Repository Structure: Monorepo

The CLI Graph Dashboard will be added to the existing `aexos-core` monorepo, as a new module in `.aexos-core/core/graph-dashboard/` with an entrypoint at `bin/aexos-graph.js`.

### Service Architecture

A standalone module inside the monorepo that consumes data from the existing `code-intel` module and from the `entity-registry`. No external services — everything local in the terminal.

### Testing Requirements

Unit + Integration tests. Unit tests for each widget/data-source adapter. Integration tests for the complete dashboard with mock data.

### Additional Technical Assumptions and Requests

- **TUI Framework:** `blessed` (or the `neo-blessed` fork) + `blessed-contrib` — native widgets for tree, charts, sparklines, gauges
- **ASCII Charts (MVP):** `asciichart` — zero deps, pure ASCII line charts for the MVP without blessed
- **DAG Layout (V2+):** `d3-dag` — Sugiyama/Zherebko algorithms to compute layout for complex graphs
- **Node.js:** Minimum v18+ (already a project requirement)
- **Fallback Strategy:** If `blessed` becomes unmaintained, migrate to the `neo-blessed` fork or `Ink` (React-based TUI)
- **Data Sources:** Reuse 100% of the data already available in the code-intel module (analyzeDependencies, assessImpact, getMetrics, isCodeIntelAvailable) and entity-registry.yaml

---

## Epic List

### Epic 1: MVP — ASCII Text Output (`aexos graph`)

**Goal:** Deliver basic visualization of the dependency graph and entity stats as ASCII output in the terminal, without heavy TUI dependencies.

### Epic 2: Interactive TUI Dashboard (blessed-contrib)

**Goal:** Interactive multi-panel dashboard with tree widget, charts, sparklines and gauges using blessed-contrib.

### Epic 3: Real-time & Advanced Visualization

**Goal:** Watch mode for real-time updates, visual blast radius, latency charts, and multiple output formats (DOT, Mermaid).

---

## Epic 1: MVP — ASCII Text Output

**Goal:** Establish the `aexos graph` CLI command with ASCII output of the dependency graph and entity stats. Delivers immediate value with zero heavy TUI dependencies — only `asciichart` for simple line charts. This is the foundation the following epics will build on.

### Story 1.1: CLI Entrypoint and ASCII Dependency Tree

**As a** developer using AEXOS,
**I want** to run `aexos graph --deps` in the terminal,
**so that** I can see the dependency tree of code-intel entities as ASCII text.

#### Acceptance Criteria

1. The `npx @aexos/core graph` command exists and is executable
2. The `--deps` flag renders the dependency tree as indented text with box-drawing characters (`├─`, `└─`, `│`)
3. Data comes from `analyzeDependencies()` in the code-intel module
4. Fallback to entity-registry.yaml when the Code Graph MCP is offline
5. Output is valid for piping (`aexos graph --deps | grep helper`)
6. Unit tests cover: tree rendering, fallback data, empty graph

### Story 1.2: ASCII Entity Stats and Cache Metrics

**As a** developer using AEXOS,
**I want** to run `aexos graph --stats` to see entity statistics and cache metrics,
**so that** I can monitor the health of the code intelligence system.

#### Acceptance Criteria

1. The `--stats` flag displays a formatted table with: total entities, categories, last update
2. Includes cache hit/miss ratio as a percentage and an ASCII sparkline (via `asciichart`)
3. Includes latency of the last N operations as an ASCII line chart
4. Data comes from `registry-loader` + `client.getMetrics()` + `client._latencyLog`
5. Works without the Code Graph MCP (uses entity-registry.yaml as fallback)
6. Unit tests cover: stats formatting, sparkline rendering, missing data handling

### Story 1.3: Provider Status and Output Formats

**As a** developer using AEXOS,
**I want** to see provider status and export graph data in different formats,
**so that** I can integrate with other tools and monitor system health.

#### Acceptance Criteria

1. With no additional flags, `aexos graph` shows a summary view (dependency tree + stats + provider status)
2. Provider status shows: Code Graph MCP (ACTIVE/OFFLINE), Circuit Breaker state, failure count
3. The `--format=json` flag outputs structured JSON of the dependency graph
4. The `--format=dot` flag outputs DOT format for Graphviz
5. The `--format=mermaid` flag outputs Mermaid format for documentation
6. Unit tests cover: each output format, provider status rendering

---

## Epic 2: Interactive TUI Dashboard (blessed-contrib)

**Goal:** Build an interactive multi-panel dashboard using `blessed-contrib` that combines a tree widget (dependency graph), charts (latency, cache), and status indicators on a single terminal screen. Keyboard and mouse navigation.

### Story 2.1: Dashboard Layout and Dependency Tree Widget

**As a** developer using AEXOS,
**I want** an interactive dashboard with a dependency tree I can expand/collapse,
**so that** I can explore code relationships visually in the terminal.

#### Acceptance Criteria

1. `aexos graph --interactive` opens a fullscreen blessed-contrib dashboard
2. Grid layout with defined areas: tree (left), stats (top-right), charts (bottom-right)
3. The tree widget renders the dependency graph with expand/collapse via Enter
4. Keyboard navigation (arrows, Enter, q to quit)
5. Screen resize is responsive (layout adapts)
6. Unit tests cover: layout rendering, tree data transformation, keyboard events

### Story 2.2: Metrics and Status Widgets

**As a** developer using AEXOS,
**I want** to see cache metrics, latency charts and provider status in the dashboard,
**so that** I have a complete view of the code intelligence system health.

#### Acceptance Criteria

1. The sparkline widget shows the cache hit rate in real time
2. The line chart widget shows the latency of the last N operations
3. The status widget shows provider status (ACTIVE/OFFLINE) with color (green/red)
4. The gauge widget shows blast radius when a node is selected in the tree
5. All widgets update as you navigate the tree (select entity → updates blast radius)
6. Unit tests cover: widget data binding, update cycle, error states

### Story 2.3: Data Source Adapters

**As a** developer using AEXOS,
**I want** reliable data adapters that transform code-intel data for dashboard widgets,
**so that** the dashboard always shows accurate and up-to-date information.

#### Acceptance Criteria

1. The `code-intel-source.js` adapter transforms analyzeDependencies output → tree widget format
2. The `registry-source.js` adapter transforms entity-registry.yaml → table/stats format
3. Adapters implement local caching (5s TTL) to avoid repeated queries
4. Adapters degrade gracefully when the provider is offline (show cached or static data)
5. Adapters expose a uniform interface: `getData()`, `getLastUpdate()`, `isStale()`
6. Unit tests cover: data transformation, caching, graceful degradation, stale detection

---

## Epic 3: Real-time & Advanced Visualization

**Goal:** Add watch mode for automatic updates, interactive blast radius for any file, and agent commands (`*graph`) for integration into the AEXOS agents' workflow.

### Story 3.1: Watch Mode and Auto-refresh

**As a** developer using AEXOS,
**I want** the dashboard to auto-refresh every N seconds,
**so that** I can monitor the system in real-time while developing.

#### Acceptance Criteria

1. The `--watch` flag enables auto-refresh every 5 seconds (configurable via `--interval`)
2. Only widgets whose data changed are re-rendered (diff-based update)
3. The status bar shows a countdown to the next refresh
4. `Ctrl+R` forces an immediate manual refresh
5. `Ctrl+C` or `q` to exit cleanly
6. Unit tests cover: refresh cycle, diff detection, graceful shutdown

### Story 3.2: Interactive Blast Radius

**As a** developer using AEXOS,
**I want** to select any file and see its blast radius visually,
**so that** I can understand the impact of changes before making them.

#### Acceptance Criteria

1. `aexos graph --blast <file>` shows the blast radius of a specific file
2. In the interactive dashboard, selecting a node in the tree shows the blast radius in the right panel
3. Blast radius includes: direct consumers, indirect affected, risk level (gauge)
4. Risk levels: LOW (0-3 affected), MEDIUM (4-8), HIGH (9+) with colors
5. Data comes from `assessImpact()` in the code-intel enricher
6. Unit tests cover: blast radius calculation display, risk levels, file not found handling

### Story 3.3: Agent Commands Integration

**As a** developer using AEXOS,
**I want** to use graph commands within agent sessions,
**so that** I can visualize code relationships without leaving my current workflow.

#### Acceptance Criteria

1. `*graph deps` in the context of any agent shows the ASCII dependency tree inline
2. `*graph blast <file>` shows the blast radius inline
3. `*graph stats` shows entity stats inline
4. Output is formatted for chat context (no TUI, only formatted text)
5. Commands delegate to the graph-dashboard module internally
6. Unit tests cover: command parsing, inline rendering, agent context integration

---

## Checklist Results Report

> PRD generated in YOLO mode based on complete deep research (`docs/research/2026-02-21-cli-graph-dashboard/`). The research covered 5 sub-queries with 16+ sources analyzed.

**Validations applied:**
- [x] Clear goals aligned with the Constitution (CLI First)
- [x] Traceable requirements (FR1-FR10, NFR1-NFR6)
- [x] Sequential epics (MVP → Interactive → Advanced)
- [x] Stories with testable acceptance criteria
- [x] Technical assumptions documented with rationale
- [x] Data dependencies mapped (existing code-intel module)
- [x] Risks documented in the research (blessed maintenance, Windows compatibility, MCP offline)

---

## Next Steps

### UX Expert Prompt

> N/A — This is a CLI-only product (terminal TUI). There is no web UI. The visual design is defined by the blessed-contrib grid layout documented in the research (`docs/research/2026-02-21-cli-graph-dashboard/03-recommendations.md`).

### Architect Prompt

> @architect — Create the detailed technical architecture for the CLI Graph Dashboard using this PRD as input. Focus on: (1) module structure inside `.aexos-core/core/graph-dashboard/`, (2) data source adapters for code-intel and entity-registry, (3) widget composition pattern with blessed-contrib, (4) CLI command routing via `bin/aexos-graph.js`, (5) fallback strategy when the Code Graph MCP is offline. Reference: `docs/research/2026-02-21-cli-graph-dashboard/03-recommendations.md` for the recommended stack.

---

*— Janus, planning the future 📊*
