---
metadata:
  short-description: "AEXOS workflow: aexos-commit"
name: aexos-commit
description: >
  Create a local conventional commit for AEXOS work. Never pushes.
  Use when: committing, /aexos-commit, or local git commit.
user-invocable: true
---

# AEXOS Local Commit

## Steps

1. `git status` and `git diff` (and `git diff --staged`).
2. Stage only relevant files (never force-add secrets).
3. Commit with conventional message + story id when known:

```text
feat: short description [Story X.Y]
fix: short description [Story X.Y]
docs: ...
test: ...
chore: ...
```

4. Do **NOT** `git push`. Tell the user to activate `/aexos-devops` for push/PR.

## Forbidden

- `git push`, `--force`, `git commit --no-verify` to bypass gates
- Amending published commits without explicit user request
