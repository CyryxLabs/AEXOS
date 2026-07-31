# ADR-AEX-001: AgentRuntime as a Required Interface

## Status

Proposed. Part of [EPIC-AEXOS-EVOLUTION](../EPIC-AEXOS-EVOLUTION.md),
story AEX-1.2. Depends on [ADR-AEX-002](./ADR-AEX-002-TASK-IO-CONTRACT.md).

## Context

AEXOS separates deterministic orchestration from model execution at a single
line, `core/orchestration/workflow-orchestrator.js:577-601`:

```js
if (this.options.dispatchSubagent) {
  result = await this.options.dispatchSubagent({ ... });
} else {
  result = { status: 'pending_dispatch', prompt, ... };
}
```

`dispatchSubagent` is an optional injected callback. It is never supplied in
production code — the only assignments in the repository are `jest.fn()` in
tests. Every consumer below this boundary therefore takes its fallback path.

Those fallbacks do not signal absence. They report success:

| File | Behaviour when no executor is present |
|---|---|
| `core/execution/autonomous-build-loop.js:538-555` | `// Default: simulate execution` → `return { success: true, filesModified }` |
| `core/orchestration/executors/epic-3-executor.js:163-182` | every phase returns `success: true` |
| `core/orchestration/executors/epic-4-executor.js:157-231` | stub plan, one hardcoded fake subtask |
| `core/orchestration/agent-invoker.js:404-414` | `{ status: 'simulated' }` |
| `core/orchestration/master-orchestrator.js:1592-1620` | `StubEpicExecutor` |

The consequence is that a pipeline run produces a green report, populated state
JSON, dashboard events and stub markdown having performed no work — and nothing
in the system distinguishes that from a real run. This is the root architectural
defect (DIAGNOSTIC D2): it makes every downstream guarantee — quality gates,
wave completion, story closure — unfalsifiable.

Meanwhile a working execution backend already exists and is unused:
`.cyryx-core/infrastructure/integrations/ai-providers/` (1,554 LOC — base class,
Claude via `spawn`, Gemini, OpenAI-compatible, factory with fallback and retry).
It is referenced only by its own index and its test (DIAGNOSTIC D9).

Optional-executor-with-fallback was a reasonable choice while the orchestration
layer was being designed ahead of a runtime. It is no longer reasonable now that
the layer is complete and shipping.

## Decision

**1. Define `AgentRuntime` as an explicit interface.**

```
execute(request: AgentRequest): Promise<AgentResult>
capabilities(): RuntimeCapabilities
```

`AgentRequest` carries the resolved task contract (ADR-AEX-002), the assembled
context, the acting agent id, and the governance token issued by ADR-AEX-003.
`AgentResult` carries structured artifacts — `produced` file paths, `verify`
outcomes, token and cost accounting — never free-form prose to be re-parsed.

**2. Make the runtime a required constructor argument.**

Orchestrators, executors and dispatchers accept `runtime` positionally or throw
at construction. No `options.dispatchSubagent`, no optional injection.

**3. Delete every simulate / stub / unconditional-success default.**

Absence of a runtime becomes a construction-time error. A phase that cannot
execute throws; it never returns `success: true`. `StubEpicExecutor` and the
`simulated` status are removed rather than retained behind a flag — a flag that
fakes success is the defect.

Test doubles remain legitimate, supplied explicitly by tests. The distinction is
that a double is *injected by a test*, not *defaulted to in production*.

**4. Ship the existing provider factory as the first concrete backend.**

`AiProviderRuntime` adapts the dormant provider abstraction. This is salvage, not
new construction, and it preserves the multi-provider fallback and retry already
written and tested.

**5. Runtime selection is configuration, not code.**

`core-config.yaml` names the active runtime. Adding a backend — Agent SDK,
in-process SDK, remote worker — is a new implementation of the interface, not a
change to any orchestrator.

## Consequences

### Positive

- Non-execution becomes indistinguishable from failure instead of from success.
  Every existing quality gate becomes meaningful for the first time.
- 1,554 LOC of already-tested provider code moves from dead to load-bearing.
- Retry, timeout, cancellation, cost accounting and circuit-breaking get one
  place to live instead of five partial implementations.
- Wave parallelism (AEX-1.3) becomes implementable — it needs one thing to
  dispatch to, not five callback shapes.
- The public boundary is a single interface, which is what an MCP daemon
  (ADR-AEX-004) needs to expose.

### Negative

- **Failures currently hidden will surface immediately.** Pipelines that report
  green today will report red. This is the point of the change, but it will read
  as a regression and should be communicated as such before landing.
- Breaking change for any caller relying on `options.dispatchSubagent`. Grep
  shows only tests, so blast radius is contained to the test suite.
- Tests that implicitly relied on the simulate default must supply an explicit
  double. This touches a meaningful share of the ~398 test files.
- The interface must be defined before the task contract is fully backfilled,
  so `AgentRequest` needs a documented tolerance for partially-specified tasks
  during the ADR-AEX-002 migration window.

### Neutral

- No constitutional conflict. Article I is satisfied: the runtime is driven by
  the CLI, and nothing here introduces a UI dependency.
- Provider-agnosticism is preserved and strengthened — model choice moves fully
  into configuration, which is what Article XII-B already assigns to `@devops`.

## Alternatives considered

**Keep the callback, add a loud warning when absent.** Rejected: warnings are
discarded in automated runs, and the state files would still record success. The
problem is the recorded outcome, not the log line.

**Make the default throw but keep the option optional.** Rejected as a
half-measure that leaves the same shape in place. If the runtime is mandatory in
practice, the type should say so.

**Adopt the Claude Agent SDK directly as the runtime.** Deferred, not rejected —
it is the strongest long-term backend, but it is a larger change and arguably
requires an Article I ruling (see EPIC open decision 2 and 3). The interface
defined here makes that a later, additive choice rather than a rewrite.
