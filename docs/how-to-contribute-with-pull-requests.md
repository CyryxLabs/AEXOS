# How to Contribute with Pull Requests

**New to GitHub and pull requests?** This guide will walk you through the basics step by step.

## What Is a Pull Request?

A pull request (PR) is how you propose changes to a project on GitHub. Think of it as saying "Here are some changes I would like to make - please review them and consider adding them to the main project."

## Before You Start

⚠️ **Important**: Please keep your contributions small and focused! We prefer many small, clear changes over a single massive one.

All contributions - issues, pull requests and documentation - must be written in English.

**Required before submitting PRs:**

- **For bug fixes**: Open an issue using the [bug report template](https://github.com/CyryxLabs/AEXOS/issues/new?template=bug_report.md)
- **For new features**:
  1. Discuss it on Discord in the [#general-dev channel](https://discord.gg/gk8jAdXWmj)
  2. Open an issue using the [feature request template](https://github.com/CyryxLabs/AEXOS/issues/new?template=feature_request.md)
- **For large changes**: Always open an issue first to discuss alignment

## Step-by-Step Guide

### 1. Fork the Repository

1. Go to the [AEXOS repository](https://github.com/CyryxLabs/AEXOS)
2. Click the "Fork" button in the top right corner
3. This creates your own copy of the project

### 2. Clone Your Fork

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/AEXOS.git
cd AEXOS
```

### 3. Create a New Branch

**Never work directly on the `main` branch!** Always create a new branch for your changes:

```bash
# Create and switch to a new branch
git checkout -b fix/typo-in-readme
# or
git checkout -b feature/add-new-agent
```

**Branch naming tips:**

- `fix/description` - for bug fixes
- `feature/description` - for new functionality
- `docs/description` - for documentation changes

### 4. Make Your Changes

- Edit the files you want to change
- Keep the changes small and focused on one thing
- Test your changes if possible

### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "Fix typo in README.md"
```

**Good commit messages:**

- "Fix typo in the installation instructions"
- "Add usage example for a new agent"
- "Update broken link in the documentation"

**Bad commit messages:**

- "stuff"
- "changes"
- "update"

### 6. Push to Your Fork

```bash
# Push your branch to your fork
git push origin fix/typo-in-readme
```

### 7. Create the Pull Request

1. Go to your fork on GitHub
2. You will see a green "Compare & pull request" button - click it
3. Make sure the target branch is `main`
4. Fill in the PR description using the template in CONTRIBUTING.md:
   - **What**: 1-2 sentences describing what changed
   - **Why**: 1-2 sentences explaining the reason
   - **How**: 2-3 bullets about the implementation
   - **Testing**: How you tested it
5. Reference the related issue number (e.g. "Fixes #123")

### 8. Wait for Review

- A maintainer will review your PR
- They may request changes
- Be patient and responsive to feedback

## What Makes a Good Pull Request?

✅ **Good PRs:**

- Change one thing at a time
- Have clear, descriptive titles
- Explain the what and the why in the description
- Include only the files that need to change

❌ **Avoid:**

- Reformatting entire files
- Multiple unrelated changes in one PR
- Copying your whole project/repository into the PR
- Changes without an explanation

## Common Mistakes to Avoid

1. **Do not reformat entire files** - change only what is necessary
2. **Do not include unrelated changes** - focus on one fix/feature per PR
3. **Do not paste code into issues** - open a proper PR instead
4. **Do not submit your entire project** - contribute specific improvements

## Need Help?

- 🐛 Report bugs using the [bug report template](https://github.com/CyryxLabs/AEXOS/issues/new?template=bug_report.md)
- 💡 Suggest features using the [feature request template](https://github.com/CyryxLabs/AEXOS/issues/new?template=feature_request.md)
- 📖 Read the full [Contributing Guidelines](../CONTRIBUTING.md)

## Example: Good vs Bad PRs

### 😀 Good PR Example

**Title**: "Fix broken link to installation guide"
**Changes**: One file, one line changed
**Description**: "The link in README.md was pointing to the wrong file. Updated it to point to the correct installation guide."

### 😞 Bad PR Example

**Title**: "Updates"
**Changes**: 50 files, entire codebase reformatted
**Description**: "Made some improvements"

---

**Remember**: We are here to help! Do not be afraid to ask questions. Every expert was a beginner once.
