---
name: aexos-quality-gates
description: >
  Run AEXOS quality gates (lint, typecheck, test, pre-push). Use before commit/push, when checking work quality, or /aexos-quality-gates.
metadata:
  short-description: "AEXOS workflow: aexos-quality-gates"
---

# AEXOS Quality Gates

## Required local gates

```bash
npm run lint
npm run typecheck
npm test
```

Optional / pre-push:

```bash
npm run build
# CodeRabbit when available (see coderabbit skill / WSL notes)
```

## Agent rules

- @dev: run gates before marking story ready for review.
- @qa: gates are necessary but not sufficient — still do AC + architecture review.
- @devops: MUST run pre-push gate before any push/PR.

## Failures

Fix root cause. Do not use `--no-verify` or skip hooks to force green.

