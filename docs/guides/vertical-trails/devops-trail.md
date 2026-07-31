# @devops Trail: From Problem to Validated Output

> **Story:** CYRYX-DIFF-4.3.1
> **Agent:** @devops (Polaris)
> **Estimated time:** 20-40 minutes

---

## Trail Map

```
PROBLEM: "I need to set up CI/CD and push safely"
    ↓
WORKFLOW: GitHub Setup → CI/CD Config → Quality Gate → Push
    ↓
TASKS: *setup-github → *ci-cd → *push
    ↓
OUTPUT: Configured repo + Active pipeline + Push with green gates
```

---

## Reproducible Step-by-Step Example

### Scenario

You are in an AEXOS project and you need to:
1. Set up a GitHub repository
2. Create a CI/CD pipeline (GitHub Actions)
3. Push safely with quality gates
4. Validate that the pipeline runs correctly

### Prerequisites

```bash
# AEXOS project initialized
npx github:CyryxLabs/AEXOS doctor  # must return healthy

# GitHub CLI authenticated
gh auth status  # must show the logged-in user

# Git configured
git config user.name   # must have a value
git config user.email  # must have a value
```

---

### Step 1: Activate @devops

```bash
@devops
```

**Expected output:**
```
-- Polaris here! DevOps & Infrastructure Specialist.
Ready for CI/CD, MCP, releases and Git operations.

Quick commands:
  *setup-github      - Set up the GitHub repository
  *ci-cd             - Set up the CI/CD pipeline
  *push              - Push with quality gates
  *release           - Create a release with a changelog
```

---

### Step 2: Repository Setup

```bash
*setup-github
```

**Interaction:**
```
Polaris: What is the repository name?
You: my-aexos-project

Polaris: Visibility?
You: private

Polaris: Create issue templates?
You: yes

Polaris: Enable branch protection on main?
You: yes
```

**Expected output:**
```
🔧 Setting up the GitHub repository...

✅ Repository created: github.com/your-user/my-aexos-project
✅ Branch protection configured on main
  - Require PR reviews: 1
  - Require status checks: lint, test
✅ Issue templates created:
  - .github/ISSUE_TEMPLATE/bug_report.md
  - .github/ISSUE_TEMPLATE/feature_request.md
✅ CODEOWNERS created
✅ Remote origin added

📋 Next steps:
  *ci-cd github-actions  - Set up the pipeline
```

**Evidence of success:**
```bash
gh repo view --web  # Opens the repo in the browser
```

---

### Step 3: Set Up CI/CD

```bash
*ci-cd github-actions
```

**Interaction:**
```
Polaris: Which technology stack?
You: Node.js

Polaris: Node version?
You: 20

Polaris: Include CodeRabbit?
You: yes

Polaris: Pipeline stages?
You: lint, test, build
```

**Expected output:**
```
🔧 Setting up GitHub Actions CI/CD...

📄 Creating .github/workflows/ci.yml

name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build

✅ CI/CD pipeline created
✅ CodeRabbit integration configured (.coderabbit.yaml)

📋 Commit and push to activate it:
  git add .github/
  git commit -m "ci: add GitHub Actions pipeline"
  git push
```

**Evidence of success:**
```bash
ls .github/workflows/
# ci.yml
```

---

### Step 4: Make a Local Commit

```bash
git add .github/
git commit -m "ci: add GitHub Actions pipeline"
```

---

### Step 5: Push with Quality Gates

```bash
*push
```

**Expected output:**
```
🚦 Pre-Push Quality Gate

Step 1/4: Linting
  Running: npm run lint
  ✅ Lint passed (0 errors, 0 warnings)

Step 2/4: Testing
  Running: npm test
  ✅ Tests passed (42 tests, 0 failures)

Step 3/4: Type Checking
  Running: npm run typecheck
  ✅ Types valid (0 errors)

Step 4/4: Build Verification
  Running: npm run build
  ✅ Build successful

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 All quality gates passed!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pushing to origin/main...
  ✅ Push successful

📋 CI Pipeline triggered:
  https://github.com/your-user/my-aexos-project/actions/runs/xxxxx
```

---

### Step 6: Check the Pipeline

```bash
gh run list --limit 1
```

**Expected output:**
```
STATUS  NAME         WORKFLOW  BRANCH  EVENT  ID
✓       CI Pipeline  ci.yml    main    push   xxxxx
```

---

## Validation Checklist

| Step | Command | Expected Output | ✓ |
|------|---------|-----------------|---|
| 1 | `@devops` | Polaris greeting | [ ] |
| 2 | `*setup-github` | "Repository created" | [ ] |
| 3 | `*ci-cd github-actions` | "Pipeline created" | [ ] |
| 4 | `git commit` | Local commit | [ ] |
| 5 | `*push` | "All gates passed" | [ ] |
| 6 | `gh run list` | Green pipeline | [ ] |

---

## Release Flow (Bonus)

After several features:

```bash
*version-check
```

**Output:**
```
📊 Version Analysis

Current: 1.0.0
Commits since last release: 5
  - feat: add user authentication
  - fix: resolve login bug
  - docs: update README
  - chore: update deps
  - test: add auth tests

Suggested bump: minor (1.1.0)
  Reason: 1 feat + 1 fix = minor release
```

```bash
*release minor
```

**Output:**
```
🚀 Creating Release v1.1.0

✅ Version bumped in package.json
✅ CHANGELOG.md updated
✅ Git tag v1.1.0 created
✅ GitHub Release published

Release URL:
  https://github.com/your-user/my-aexos-project/releases/tag/v1.1.0
```

---

## Trail Variations

### Variation A: GitLab CI
```bash
*ci-cd gitlab
# Generates .gitlab-ci.yml
```

### Variation B: CircleCI
```bash
*ci-cd circleci
# Generates .circleci/config.yml
```

### Variation C: MCP Setup
```bash
*search-mcp "browser automation"
*add-mcp playwright -s project
# Configures MCP for the project
```

---

## Related Commands

| Command | Use |
|---------|-----|
| `*setup-github` | Set up the repo and its protections |
| `*ci-cd` | Create the CI/CD pipeline |
| `*push` | Push with quality gates |
| `*release` | Create a release with a changelog |
| `*version-check` | Analyze the suggested version |
| `*cleanup` | Clean up merged branches |
| `*security-scan` | Vulnerability scan |
| `*add-mcp` | Add an MCP server |

---

## Troubleshooting

### The quality gate fails on lint
```bash
# Automatic fix
npm run lint -- --fix
# Re-run
*push
```

### The pipeline fails on GitHub
```bash
# View the logs
gh run view --log-failed
# Fix locally and re-push
*push
```

### No push permission
```bash
# Check the authentication
gh auth status
# Re-authenticate if necessary
gh auth login
```

---

*Trail created for Story CYRYX-DIFF-4.3.1*
*-- Polaris, automating everything*
