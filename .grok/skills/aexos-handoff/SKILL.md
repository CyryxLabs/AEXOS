---
name: aexos-handoff
description: >
  Create an AEXOS agent handoff artifact when switching personas. Use on agent switch, handoff, or /aexos-handoff.
metadata:
  short-description: "AEXOS workflow: aexos-handoff"
---

# AEXOS Agent Handoff

When switching agents (`/aexos-*` skills), compact context into a handoff artifact.

## Write

Path: `.aexos/handoffs/handoff-{from}-to-{to}-{timestamp}.yaml`

```yaml
handoff:
  from_agent: "{id}"
  to_agent: "{id}"
  story_context:
    story_id: ""
    story_path: ""
    story_status: ""
    current_task: ""
    branch: ""
  decisions: []
  files_modified: []
  blockers: []
  next_action: ""
```

## Limits

- Max ~500 tokens, ≤5 decisions, ≤10 files, ≤3 blockers
- Discard previous agent full persona; keep only this artifact + new agent definition

Template: `.aexos-core/development/templates/agent-handoff-tmpl.yaml`

