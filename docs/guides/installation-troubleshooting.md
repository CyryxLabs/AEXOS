# AEXOS-Core Installation & Troubleshooting Guide

> **EN** | [PT](../pt/guides/installation-troubleshooting.md) | [ES](../es/guides/installation-troubleshooting.md)

---

## Quick Start

```bash
npx github:CyryxLabs/AEXOS
```

This command downloads and runs the latest version of AEXOS-Core installer.

## System Requirements

| Requirement | Minimum Version | Check Command |
|-------------|-----------------|---------------|
| **Node.js** | v18.0.0+ | `node --version` |
| **npm** | v9.0.0+ | `npm --version` |
| **npx** | (included with npm 5.2+) | `npx --version` |
| **Git** | Any recent version (optional) | `git --version` |

### Download Links

- **Node.js**: https://nodejs.org/ (Download LTS version - includes npm & npx)
- **Git**: https://git-scm.com/ (Optional, but recommended)

---

## Installation Methods

### Method 1: npx (Unix / warm cache)

```bash
# Install in current directory
npx github:CyryxLabs/AEXOS

# Install with specific version
npx github:CyryxLabs/AEXOS

# Show version
npx github:CyryxLabs/AEXOS --version

# Show help
npx github:CyryxLabs/AEXOS --help
```

> **Windows:** if `npx` fails with `ECOMPROMISED` / Lock compromised, use Method 3 (global) — see [Issue #773](https://github.com/CyryxLabs/AEXOS/issues/773).

### Method 2: From GitHub

```bash
npx github:CyryxLabs/AEXOS install
```

### Method 3: Global Installation (**recommended on Windows**)

```bash
npm install -g @aexos-squads/core
# or: npm install -g aexos-core
cd path\to\your\project
aexos-core install
```

---

## Diagnostic Tool

If you're having installation issues, run our diagnostic tool:

### Windows (CMD)
```cmd
curl -o diagnose.cmd https://raw.githubusercontent.com/CyryxLabs/AEXOS/main/tools/quick-diagnose.cmd && diagnose.cmd
```

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/CyryxLabs/AEXOS/main/tools/quick-diagnose.ps1 | iex
```

### macOS/Linux
```bash
curl -fsSL https://raw.githubusercontent.com/CyryxLabs/AEXOS/main/tools/diagnose-installation.js | node
```

---

## Common Issues & Solutions

### Issue 0: `ECOMPROMISED` / `Lock compromised` on Windows (npx)

**Error:**
```
npm error code ECOMPROMISED
npm error Lock compromised
```

**Cause:** npx uses an internal lock while downloading packages. A large dependency tree on a cold cache or slow link exceeds the lock timeout ([#773](https://github.com/CyryxLabs/AEXOS/issues/773)).

**Solution (preferred on Windows):**
```bash
npm install -g @aexos-squads/core
cd C:\path\to\your\project
aexos-core install
```

**Alternatives:**
```bash
npm cache verify
npx github:CyryxLabs/AEXOS install

# or clone
git clone https://github.com/CyryxLabs/AEXOS.git
cd AEXOS && npm install
```

`aexos doctor` on Windows emits an advisory WARN with the same guidance.

---

### Issue 1: "Node.js version too old"

**Error:**
```
error engine Unsupported engine
error notsup Required: {"node":">=18.0.0"}
```

**Solution:**
1. Download Node.js LTS from https://nodejs.org/
2. Install and restart your terminal
3. Verify: `node --version` (should show v18+ or v20+)

---

### Issue 2: "npm version too old"

**Error:**
```
npm ERR! Required: {"npm":">=9.0.0"}
```

**Solution:**
```bash
# Update npm globally
npm install -g npm@latest

# Verify
npm --version
```

---

### Issue 3: "npx not found" or "npx command not recognized"

**Cause:** npm bin folder not in system PATH

**Solution (Windows):**
1. Find npm prefix: `npm config get prefix`
2. Add to PATH:
   - Press Win+X → System → Advanced system settings → Environment Variables
   - Edit "Path" under User variables
   - Add: `C:\Users\YOUR_USERNAME\AppData\Roaming\npm`
3. Restart terminal

**Solution (macOS/Linux):**
```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$PATH:$(npm config get prefix)/bin"

# Reload
source ~/.bashrc
```

---

### Issue 4: "EACCES: permission denied"

**Solution (Windows):**
Run terminal as Administrator

**Solution (macOS/Linux):**
```bash
# Fix npm permissions (recommended)
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Or use nvm (best practice)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

---

### Issue 5: "ETIMEDOUT" or "ECONNREFUSED"

**Cause:** Network/firewall blocking npm registry

**Solutions:**

1. **Check npm registry:**
   ```bash
   npm config get registry
   # Should be: https://registry.npmjs.org/
   ```

2. **Reset registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

3. **Test connectivity:**
   ```bash
   npm ping
   ```

4. **Behind corporate proxy:**
   ```bash
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080
   ```

5. **Use mirror (China):**
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

---

### Issue 6: "PowerShell execution policy" (Windows)

**Error:**
```
File cannot be loaded because running scripts is disabled on this system
```

**Solution:**
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Issue 7: "Cannot find module" or "Missing dependencies"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules if exists
rm -rf node_modules

# Try again
npx github:CyryxLabs/AEXOS
```

---

### Issue 8: "SSL/Certificate errors"

**Solution:**
```bash
# Temporarily disable strict SSL (not recommended for production)
npm config set strict-ssl false

# Better: Update certificates
npm config set cafile /path/to/certificate.pem
```

---

### Issue 9: Package shows old version

**Cause:** npm cache serving old version

**Solution:**
```bash
# Clear npx cache
npx clear-npx-cache

# Or force fresh download
npx --ignore-existing aexos-core@latest

# Or use specific version
npx github:CyryxLabs/AEXOS
```

### Issue 10: "Pro activation failed: Installed Pro artifact did not create node_modules/@aexos-squads/pro"

**Symptom:** The installer reaches Step 2 (Pro Content Installation), successfully authenticates the buyer email, downloads the Pro tarball — and then prints:

```text
⚠️  Pro activation failed: Installed Pro artifact did not create node_modules/@aexos-squads/pro.
Continue with Community (free) edition instead? (Y/n)
```

**Root cause:** The bug was in installer versions `5.2.5` and earlier. `npm install <tarball>` walked up the directory tree looking for the first ancestor with a `package.json`, then installed `@aexos-squads/pro` there instead of in your chosen target directory. The post-install integrity check then failed because the artifact landed in the wrong place — even though `npm` had exited 0.

This is **fully fixed in `@aexos-squads/core@5.2.6` and above**. The installer now passes `--prefix` + `--workspaces=false` to `npm install`, which anchors the install to the target directory regardless of ancestor `package.json`/`workspaces` declarations.

**Solution (most users — works on any OS):**

```bash
# Update to the fixed version (the -p flag is critical — it forces latest resolution)
npx github:CyryxLabs/AEXOS install
```

**Solution (if you previously hit the error and the fix above still misbehaves — residual state from old attempts):**

*macOS / Linux (bash/zsh):*

```bash
# 1. Remove any stray @aexos-squads/pro that the buggy installer left in an ancestor dir
find . -maxdepth 5 -path "*/node_modules/@aexos-squads/pro" -type d 2>/dev/null \
  -exec rm -rf {} + 2>/dev/null

# 2. Clear the npx cache so it doesn't serve the old buggy version
rm -rf ~/.npm/_npx 2>/dev/null

# 3. Retry the install with -p forcing the latest published version
npx github:CyryxLabs/AEXOS install
```

*Windows (PowerShell):*

```powershell
# 1. Remove any stray @aexos-squads/pro that the buggy installer left in an ancestor dir
Get-ChildItem -Recurse -Depth 5 -Directory -ErrorAction SilentlyContinue `
  | Where-Object { $_.FullName -match '\\node_modules\\@aexos-squads\\pro$' } `
  | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 2. Clear the npx cache so it doesn't serve the old buggy version
Remove-Item -Recurse -Force "$env:USERPROFILE\.npm\_npx" -ErrorAction SilentlyContinue

# 3. Retry the install with -p forcing the latest published version
npx github:CyryxLabs/AEXOS install
```

*Windows (Command Prompt / cmd.exe):*

```bat
:: 1. Remove any stray @aexos-squads/pro that the buggy installer left behind
for /f "delims=" %i in ('dir /b /s /ad "node_modules\@aexos-squads\pro" 2^>nul') do rd /s /q "%i"

:: 2. Clear the npx cache
rd /s /q "%USERPROFILE%\.npm\_npx" 2>nul

:: 3. Retry the install
npx github:CyryxLabs/AEXOS install
```

**You do NOT need:**
- `npm cache clean --force` — does not affect version resolution
- `rm -rf node_modules` from random directories — only matters if step 1 above found a stray Pro install in that location

**If it still fails after both solutions**, share with support:
- `pwd && node --version && npm --version`
- The full installer output (not just the error line)
- Output of: `find . -maxdepth 5 -name package.json 2>/dev/null | head -10`

Reference: [release-procedure.md](release-procedure.md) (operator playbook), PR #742 (the fix).

---

## Environment Verification Checklist

Run these commands to verify your environment:

```bash
# 1. Check Node.js (need v18+)
node --version

# 2. Check npm (need v9+)
npm --version

# 3. Check npx
npx --version

# 4. Check npm registry access
npm view aexos-core version

# 5. Test installation
npx github:CyryxLabs/AEXOS --version
```

**Expected output:**
```
v22.x.x (or v18+/v20+)
11.x.x (or v9+)
11.x.x (same as npm)
2.2.0
2.2.0
```

---

## Getting Help

If you're still having issues:

1. **GitHub Issues**: https://github.com/CyryxLabs/AEXOS/issues
2. **Run diagnostics**: `npx github:CyryxLabs/AEXOS doctor`
3. **Check system info**: `npx github:CyryxLabs/AEXOS info`

When reporting issues, please include:
- Operating system and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Full error message
- Output of diagnostic tool

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npx github:CyryxLabs/AEXOS` | Install/run wizard |
| `npx github:CyryxLabs/AEXOS --version` | Show version |
| `npx github:CyryxLabs/AEXOS --help` | Show help |
| `npx github:CyryxLabs/AEXOS install` | Install in current dir |
| `npx github:CyryxLabs/AEXOS init <name>` | Create new project |
| `npx github:CyryxLabs/AEXOS doctor` | Run diagnostics |
| `npx github:CyryxLabs/AEXOS info` | Show system info |

---

*Last updated: December 2025 | AEXOS-Core v2.2.0*
