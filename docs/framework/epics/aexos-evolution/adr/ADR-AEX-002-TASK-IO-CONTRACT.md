# ADR-AEX-002: Machine-Checkable Task I/O Contract

## Status

Proposed. Part of [EPIC-AEXOS-EVOLUTION](../EPIC-AEXOS-EVOLUTION.md),
story AEX-1.1. **Keystone** — ADR-AEX-001, AEX-1.3 and AEX-2.3 all depend on it.

## Context

AEXOS's knowledge corpus is its moat: 215 task specifications and 12 personas
encoding years of process design. Those tasks are markdown instructions written
for a model to read.

The problem is not the prose. It is that the orchestration layer has no
machine-readable statement of what a task consumes or produces, so it infers both
from natural language after the fact.

Of the 215 task files, roughly 71 carry YAML frontmatter, and that frontmatter
holds `tools:` / `utils:` metadata only — no input schema, no output schema.
Consequences observed in the code:

- `core/orchestration/agent-invoker.js:172` gates on `task.outputSchema`. No task
  defines one, so `_validateTaskOutput` (lines 442-471) is unreachable.
  Validation exists and never runs.
- `core/execution/subagent-dispatcher.js:790-810` determines which files a task
  modified with a regular expression over English prose:

  ```js
  /(?:created|modified|updated|wrote|edited).*?['"]([^'"]+)['"]/gi
  ```

  Wave file-ownership partitioning and merge safety are built on this guess.
- `subagent-dispatcher.js:617-624` — "best-of" result selection picks the longer
  string, because there is no structured basis for comparison.

Without a declared contract there is no sound basis for retry (what should be
re-run?), caching (what invalidates?), dependency resolution (what does this
consume?), verification (what proves it worked?), or safe parallel scheduling
(which lanes conflict?). Every capability in Wave 1 reduces to this gap.

The corpus itself must not be rewritten. It is the asset.

## Decision

**1. Extend task frontmatter with three declarative blocks.**

```yaml
---
id: create-next-story
agent: sm
inputs:
  - name: epic
    type: path
    required: true
  - name: architecture
    type: path
    required: false
produces:
  - path: docs/stories/{epic}.{n}.md
    kind: story
verify:
  - type: file-exists
    target: docs/stories/{epic}.{n}.md
  - type: checklist
    ref: story-draft-checklist
---
```

- `inputs` — what must be resolved and supplied before dispatch.
- `produces` — declared artifacts. This is the authoritative file-ownership
  statement, replacing regex inference.
- `verify` — machine-checkable post-conditions. Not a quality opinion; a
  falsifiable assertion that the task did what it claims.

**2. Formalise the schema in `.cyryx-core/schemas/task-contract.schema.json`.**

Validated with the `ajv` dependency already present. Enforced in CI.

**3. Migrate permissively, then tighten.**

`taskContract.enforcement: warn | strict` in `core-config.yaml`, defaulting to
`warn` for one release. CI validates from the first story: any task carrying the
blocks must be valid. Coverage is reported per build so the backfill is visible.
The flag flips to `strict` when coverage reaches 100%.

**4. Task bodies are not edited.**

This ADR adds frontmatter and nothing else. The prose that makes the corpus
valuable is untouched. Review rejects any change to task body text under this
story.

**5. `AgentResult.produced` is checked against the declared `produces`.**

An undeclared artifact is a contract violation, surfaced rather than silently
accepted. This is what makes parallel file partitioning trustworthy.

## Consequences

### Positive

- File-ownership becomes declared rather than guessed, which is the precondition
  for real wave parallelism (AEX-1.3).
- `_validateTaskOutput` — validation logic that already exists — becomes
  reachable.
- Retry, caching and dependency resolution acquire a sound basis.
- Squad compatibility (AEX-2.3) gains something concrete to version: a squad
  declares which contracts it satisfies.
- `verify` gives the deferred self-healing autopsy loop the failure signal it
  needs, without which it cannot be built.

### Negative

- **215 files to backfill.** Mechanical and parallelisable, but large, and the
  contracts must be *correct* — a wrong `produces` is worse than none because
  parallel scheduling will trust it.
- Frontmatter adds ceremony to authoring new tasks, which cuts against the
  "Natural Language First" principle in `docs/GUIDING-PRINCIPLES.md`. Mitigated
  by keeping the block small and generating it from a template.
- Path templating (`{epic}.{n}`) introduces a small expression language that must
  be specified and tested, or it becomes a second source of ambiguity.
- Migration window: during `warn`, some tasks have contracts and some do not, so
  the runtime must tolerate both. ADR-AEX-001's `AgentRequest` carries that
  tolerance explicitly.

### Neutral

- No constitutional conflict. Article IV ("No Invention" — every statement traces
  to a requirement) is arguably strengthened: `verify` makes traceability
  executable.

## Alternatives considered

**Infer contracts statically from task prose using a model.** Rejected as the
authoritative source — a probabilistic contract cannot be trusted for merge
safety. Viable as a *bootstrap aid* to draft the 215 blocks for human review,
and recommended as the backfill mechanism.

**Only contract the tasks used by wave execution.** Rejected: partial coverage
means the scheduler cannot distinguish "declares no outputs" from "not yet
migrated", which is exactly the ambiguity the `warn`/`strict` flag exists to
close.

**Define contracts in a central registry instead of per-task frontmatter.**
Rejected: it separates the contract from the instruction it describes, and the
two would drift — the same failure the four-way agent duplication already
demonstrates (DIAGNOSTIC D12).
