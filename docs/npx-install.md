# NPX Installation Guide

---

## Overview

AEXOS can be installed via NPX for quick setup without global installation. This guide covers proper usage and troubleshooting for NPX-based installations.

## Quick Start

### Correct Usage

Always run `npx @aexos/core install` **from your project directory**:

```bash
# Navigate to your project first
cd /path/to/your/project

# Then run the installer
npx @aexos/core install
```

### ⚠️ Common Mistake

**DO NOT** run the installer from your home directory or arbitrary locations:

```bash
# ❌ INCORRECT - Will fail with NPX temporary directory error
cd ~
npx @aexos/core install

# ✅ CORRECT - Navigate to project first
cd ~/my-project
npx @aexos/core install
```

## Why This Matters

NPX executes packages in **temporary directories** (e.g., `/private/var/folders/.../npx-xxx/` on macOS). When AEXOS runs from these temporary locations, it cannot:

- Detect your IDE configuration correctly
- Install files to the right project directory
- Set up IDE integrations properly

## NPX Temporary Directory Detection

As of version 4.31.1, AEXOS automatically detects when it's running from an NPX temporary directory and displays a helpful error message:

```
⚠️  NPX Temporary Directory Detected

NPX executes in a temporary directory, which prevents
AEXOS from detecting your IDE correctly.

Solution:
  cd /path/to/your/project
  npx @aexos/core install

See: https://aexos-core.dev/docs/npx-install
```

## Installation Steps

### Step 1: Navigate to Project

```bash
cd /path/to/your/project
```

Your project directory should contain:
- Package management files (`package.json`, etc.)
- Source code directories

### Step 2: Run Installer

```bash
npx @aexos/core install
```

### Step 3: Follow Interactive Prompts

The installer will ask you to:
1. Confirm installation directory (should be current directory)
2. Select components to install (Core + Squads)
3. Configure IDE integrations
4. Set up documentation organization

## Platform-Specific Notes

### macOS

NPX temporary directories typically appear at:
- `/private/var/folders/[hash]/T/npx-[random]/`
- `/Users/[user]/.npm/_npx/[hash]/`

AEXOS detects these patterns and prevents incorrect installation.

### Linux

Similar temporary directory patterns:
- `/tmp/npx-[random]/`
- `~/.npm/_npx/[hash]/`

### Windows

Temporary NPX paths:
- `%TEMP%\npx-[random]\`
- `%APPDATA%\npm-cache\_npx\`

**Important (issue [#773](https://github.com/CyryxLabs/AEXOS/issues/773)):** on Windows with a **cold npm cache** or slow network, `npx @aexos/core install` may fail with `ECOMPROMISED` / `Lock compromised` because npx’s internal lock times out while downloading a large dependency tree. This is **not** a corrupt lockfile in your project.

**Recommended on Windows:**

```bash
npm install -g @aexos/core
cd C:\path\to\your\project
aexos-core install
```

Or clone and run locally:

```bash
git clone https://github.com/CyryxLabs/AEXOS.git
cd AEXOS
npm install
node bin/aexos.js install --help
```

See also: [Installation troubleshooting](./guides/installation-troubleshooting.md).

## Troubleshooting

### Error: `ECOMPROMISED` / `Lock compromised` (Windows)

**Cause:** `libnpmexec` aborts when package download exceeds the npx lock touch timeout (common on cold cache).

**Solutions:**
1. Global install then local install: `npm install -g @aexos/core` → `aexos-core install`
2. Warm cache and retry: `npm cache verify` then `npx @aexos/core install`
3. Clone repo + `npm install` + run `node bin/aexos.js install` from a project directory

### Error: "NPX Temporary Directory Detected"

**Cause**: You're running the installer from your home directory or another non-project location.

**Solution**:
1. Navigate to your actual project directory:
   ```bash
   cd /path/to/your/actual/project
   ```
2. Re-run the installer:
   ```bash
   npx @aexos/core install
   ```

### Wrong Installation Directory

If the installer asks for a directory path:
- ✅ Use `.` (current directory) if you're already in your project
- ✅ Provide absolute path to your project: `/Users/you/projects/my-app`
- ❌ Don't use `~` or relative paths that point outside your project

### IDE Not Detected

If your IDE isn't detected after installation:
1. Verify you ran the installer from the correct project directory
3. Re-run the installer and manually select your IDE

## Alternative: Global Installation

If you prefer not to use NPX, you can install globally:

```bash
npm install -g @aexos/core
cd /path/to/your/project
aexos-core install
```

On **Windows**, prefer this path over pure `npx` when you hit `ECOMPROMISED` ([#773](https://github.com/CyryxLabs/AEXOS/issues/773)).

## Technical Details

### Defense in Depth Architecture

AEXOS v4.31.1+ implements two-layer detection:

1. **PRIMARY Layer** (`tools/aexos-npx-wrapper.js`):
   - Checks `__dirname` (where NPX extracts the package)
   - Uses regex patterns for macOS temp paths
   - Early exit before delegation to CLI

2. **SECONDARY Layer** (`tools/installer/bin/aexos.js`):
   - Fallback check using `process.cwd()`
   - Validates at start of install command
   - Provides redundancy if wrapper bypassed

### Detection Patterns

```javascript
const patterns = [
  /\/private\/var\/folders\/.*\/npx-/,  // macOS temp
  /\/\.npm\/_npx\//                      // NPX cache
];
```

## Support

For additional help:
- GitHub Issues: https://github.com/CyryxLabs/AEXOS/issues
- Documentation: https://aexos-core.dev/docs
- Story Reference: 2.3 - NPX Installation Context Detection

---

**Version**: 4.31.1+
**Last Updated**: 2025-10-22
**Applies To**: macOS (primary), Linux/Windows (detection available)
