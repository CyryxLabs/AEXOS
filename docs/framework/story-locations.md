# Story & Epic Locations (OSS governance)

> Resolves dual-path confusion: `docs/stories/` vs `docs/framework/epics/`.

## Two legitimate homes

| Home | Who | Git in **aexos-core** repo | Purpose |
|------|-----|---------------------------|---------|
| **`docs/framework/epics/{epic}/`** | Framework contributors | **Versioned** (public OSS) | Framework epics, architecture slices, harvest stories that ship with `@aexos/core` |
| **`docs/stories/`** | Project / product work | **Gitignored** in this repo template | Runtime SDC for *installed* projects (L4) — local backlog, not published as framework source |

## Rules

1. **This monorepo (`aexos-core` as product):** do **not** force-add `docs/stories/`. Put framework work under `docs/framework/epics/`.
2. **Downstream projects** using AEXOS: default `core-config.yaml` → `devStoryLocation: docs/stories` remains valid for *their* private/local stories.
3. **Agents / skills / CLI:** accept **either** path when resolving a story file. Prefer explicit path argument; discovery may scan both.
4. **Grok / Claude / Codex prompts:** say “story under `docs/framework/epics/` (framework) or `docs/stories/` (project L4)” — not only one.

## Commands

```bash
# Framework epic (versioned)
aexos wave from-epic --epic-dir docs/framework/epics/core-super-update --mode yolo
aexos sdc plan docs/framework/epics/core-super-update/STORY-….md

# Project story (local; often gitignored)
aexos sdc plan docs/stories/1.2.story.md
```

## Related

- Constitution III — Story-Driven Development  
- CORE-SUPER-UPDATE epic path policy  
- `devStoryLocation` in `.aexos-core/core-config.yaml` (project default)  
