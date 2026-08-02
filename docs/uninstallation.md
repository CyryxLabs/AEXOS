# Uninstallation Guide

---

This guide provides comprehensive instructions for uninstalling AEXOS from your system.

## Table of Contents

1. [Before You Uninstall](#before-you-uninstall)
2. [Quick Uninstall](#quick-uninstall)
3. [Complete Uninstall](#complete-uninstall)
4. [Selective Uninstall](#selective-uninstall)
5. [Data Preservation](#data-preservation)
6. [Clean System Removal](#clean-system-removal)
7. [Troubleshooting Uninstall](#troubleshooting-uninstall)
8. [Post-Uninstall Cleanup](#post-uninstall-cleanup)
9. [Reinstallation](#reinstallation)

## Before You Uninstall

### Important Considerations

⚠️ **Warning**: Uninstalling AEXOS will:

- Remove all framework files
- Delete agent configurations (unless preserved)
- Clear memory layer data (unless backed up)
- Remove all custom workflows
- Delete logs and temporary files

### Pre-Uninstall Checklist

- [ ] Backup important data
- [ ] Export custom agents and workflows
- [ ] Save API keys and configurations
- [ ] Document custom modifications
- [ ] Stop all running processes
- [ ] Inform team members

### Backup Your Data

```bash
# Create complete backup
npx github:CyryxLabs/AEXOS backup --complete

# Or manually backup important directories
tar -czf aexos-backup-$(date +%Y%m%d).tar.gz \
  .aexos/ \
  agents/ \
  workflows/ \
  tasks/ \
  --exclude=.aexos/logs \
  --exclude=.aexos/cache
```

## Quick Uninstall

### Using Built-in Uninstaller

The fastest way to uninstall AEXOS:

```bash
# Basic uninstall (preserves user data)
npx github:CyryxLabs/AEXOS uninstall

# Complete uninstall (removes everything)
npx github:CyryxLabs/AEXOS uninstall --complete

# Uninstall with data preservation
npx github:CyryxLabs/AEXOS uninstall --keep-data
```

### Interactive Uninstall

For guided uninstallation:

```bash
npx github:CyryxLabs/AEXOS uninstall --interactive
```

This will prompt you for:

- What to keep/remove
- Backup options
- Confirmation for each step

## Complete Uninstall

### Step 1: Stop All Services

```bash
# Stop all running agents
*deactivate --all

# Stop all workflows
*stop-workflow --all

# Shutdown meta-agent
*shutdown
```

### Step 2: Export Important Data

```bash
# Export configurations
*export config --destination backup/config.json

# Export agents
*export agents --destination backup/agents/

# Export workflows
*export workflows --destination backup/workflows/

# Export memory data
*export memory --destination backup/memory.zip
```

### Step 3: Run Uninstaller

```bash
# Complete removal
npx github:CyryxLabs/AEXOS uninstall --complete --no-backup
```

### Step 4: Remove Global Installation

```bash
# Remove global npm package
npm uninstall -g aexos-core

# Remove npx cache
npm cache clean --force
```

### Step 5: Clean System Files

#### Windows

```powershell
# Remove AppData files
Remove-Item -Recurse -Force "$env:APPDATA\aexos-core"

# Remove temp files
Remove-Item -Recurse -Force "$env:TEMP\aexos-*"

# Remove registry entries (if any)
Remove-Item -Path "HKCU:\Software\AEXOS" -Recurse
```

#### macOS/Linux

```bash
# Remove config files
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core

# Remove cache
rm -rf ~/.cache/aexos-core

# Remove temp files
rm -rf /tmp/aexos-*
```

## Selective Uninstall

### Remove Specific Components

```bash
# Remove only agents
npx github:CyryxLabs/AEXOS uninstall agents

# Remove only workflows
npx github:CyryxLabs/AEXOS uninstall workflows

# Remove memory layer
npx github:CyryxLabs/AEXOS uninstall memory-layer

# Remove specific agent
*uninstall agent-name
```

### Keep Core, Remove Extensions

```bash
# Remove all plugins
*plugin remove --all

# Remove Squads
rm -rf Squads/

# Remove custom templates
rm -rf templates/custom/
```

## Data Preservation

### What to Keep

Before uninstalling, identify what you want to preserve:

1. **Custom Agents**

   ```bash
   # Copy custom agents
   cp -r agents/custom/ ~/aexos-backup/agents/
   ```

2. **Workflows and Tasks**

   ```bash
   # Copy workflows
   cp -r workflows/ ~/aexos-backup/workflows/
   cp -r tasks/ ~/aexos-backup/tasks/
   ```

3. **Memory Data**

   ```bash
   # Export memory database
   *memory export --format sqlite \
     --destination ~/aexos-backup/memory.db
   ```

4. **Configurations**

   ```bash
   # Copy all config files
   cp .aexos/config.json ~/aexos-backup/
   cp .env ~/aexos-backup/
   ```

5. **Custom Code**
   ```bash
   # Find and backup custom files
   find . -name "*.custom.*" -exec cp {} ~/aexos-backup/custom/ \;
   ```

### Preservation Script

Create `preserve-data.sh`:

```bash
#!/bin/bash
BACKUP_DIR="$HOME/aexos-backup-$(date +%Y%m%d-%H%M%S)"

echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Backup function
backup_if_exists() {
    if [ -e "$1" ]; then
        echo "Backing up $1..."
        cp -r "$1" "$BACKUP_DIR/"
    fi
}

# Backup all important data
backup_if_exists ".aexos"
backup_if_exists "agents"
backup_if_exists "workflows"
backup_if_exists "tasks"
backup_if_exists "templates"
backup_if_exists ".env"
backup_if_exists "package.json"

echo "Backup completed at: $BACKUP_DIR"
```

## Clean System Removal

### Complete Cleanup Script

Create `clean-uninstall.sh`:

```bash
#!/bin/bash
echo "AEXOS Complete Uninstall"
echo "================================="

# Confirmation
read -p "This will remove ALL AEXOS data. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Stop all processes
echo "Stopping all processes..."
pkill -f "aexos-core" || true
pkill -f "aexos-developer" || true

# Remove project files
echo "Removing project files..."
rm -rf .aexos/
rm -rf agents/
rm -rf workflows/
rm -rf tasks/
rm -rf templates/
rm -rf Squads/
rm -rf node_modules/aexos-core/

# Remove global files
echo "Removing global files..."
npm uninstall -g aexos-core

# Remove user data
echo "Removing user data..."
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core
rm -rf ~/.cache/aexos-core

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Remove from package.json
echo "Updating package.json..."
npm uninstall aexos-core/core
npm uninstall aexos-core/memory
npm uninstall aexos-core/meta-agent

echo "Uninstall complete!"
```

### Registry Cleanup (Windows)

```powershell
# PowerShell script for Windows cleanup
Write-Host "Cleaning AEXOS from Windows Registry..."

# Remove from PATH
$path = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = ($path.Split(';') | Where-Object { $_ -notmatch 'aexos-core' }) -join ';'
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")

# Remove registry keys
Remove-ItemProperty -Path "HKCU:\Environment" -Name "AEXOS_*" -ErrorAction SilentlyContinue

# Remove file associations
Remove-Item -Path "HKCU:\Software\Classes\.cyryx" -Recurse -ErrorAction SilentlyContinue

Write-Host "Registry cleanup complete!"
```

## Troubleshooting Uninstall

### Common Issues

#### 1. Permission Denied

```bash
# Linux/macOS
sudo npx github:CyryxLabs/AEXOS uninstall --complete

# Windows (Run as Administrator)
npx github:CyryxLabs/AEXOS uninstall --complete
```

#### 2. Process Still Running

```bash
# Force stop all processes
# Linux/macOS
killall -9 node
killall -9 aexos-core

# Windows
taskkill /F /IM node.exe
taskkill /F /IM aexos-core.exe
```

#### 3. Files Locked

```bash
# Find processes using files
# Linux/macOS
lsof | grep cyryx

# Windows (PowerShell)
Get-Process | Where-Object {$_.Path -like "*cyryx*"}
```

#### 4. Incomplete Removal

```bash
# Manual cleanup
find . -name "*cyryx*" -type d -exec rm -rf {} +
find . -name "*.cyryx*" -type f -delete
```

### Force Uninstall

If normal uninstall fails:

```bash
#!/bin/bash
# force-uninstall.sh
echo "Force uninstalling AEXOS..."

# Kill all related processes
pkill -9 -f cyryx || true

# Remove all files
rm -rf .cyryx* cyryx* *cyryx*
rm -rf agents workflows tasks templates
rm -rf node_modules/aexos-core
rm -rf ~/.cyryx* ~/.config/cyryx* ~/.cache/cyryx*

# Clean npm
npm cache clean --force
npm uninstall -g aexos-core

echo "Force uninstall complete!"
```

## Post-Uninstall Cleanup

### 1. Verify Removal

```bash
# Check for remaining files
find . -name "*cyryx*" 2>/dev/null
find ~ -name "*cyryx*" 2>/dev/null

# Check npm packages
npm list -g | grep cyryx
npm list | grep cyryx

# Check running processes
ps aux | grep cyryx
```

### 2. Clean Environment Variables

```bash
# Remove from .bashrc/.zshrc
sed -i '/AEXOS_/d' ~/.bashrc
sed -i '/aexos-core/d' ~/.bashrc

# Remove from .env files
find . -name ".env*" -exec sed -i '/AEXOS_/d' {} \;
```

### 3. Update Project Files

```javascript
// Remove from package.json scripts
{
  "scripts": {
    // Remove these entries
    "cyryx": "aexos-core",
    "meta-agent": "aexos-core meta-agent"
  }
}
```

### 4. Clean Git Repository

```bash
# Remove AEXOS-specific git hooks
rm -f .git/hooks/*cyryx*

# Update .gitignore
sed -i '/.aexos/d' .gitignore
sed -i '/aexos-/d' .gitignore

# Commit removal
git add -A
git commit -m "Remove AEXOS"
```

## Reinstallation

### After Complete Uninstall

If you want to reinstall AEXOS:

1. **Wait for cleanup**

   ```bash
   # Ensure all processes stopped
   sleep 5
   ```

2. **Clear npm cache**

   ```bash
   npm cache clean --force
   ```

3. **Fresh installation**
   ```bash
   npx github:CyryxLabs/AEXOS init my-project
   ```

### Restoring from Backup

```bash
# Restore saved data
cd my-project

# Restore configurations
cp ~/aexos-backup/config.json .aexos/

# Restore agents
cp -r ~/aexos-backup/agents/* ./agents/

# Import memory
*memory import ~/aexos-backup/memory.zip

# Verify restoration
*doctor --verify-restore
```

## Uninstall Verification Checklist

- [ ] All AEXOS processes stopped
- [ ] Project files removed
- [ ] Global npm package uninstalled
- [ ] User configuration files deleted
- [ ] Cache directories cleaned
- [ ] Environment variables removed
- [ ] Registry entries cleaned (Windows)
- [ ] Git repository updated
- [ ] No remaining AEXOS files found
- [ ] System PATH updated

## Getting Help

If you encounter issues during uninstallation:

1. **Check Documentation**
   - [FAQ](https://github.com/CyryxLabs/AEXOS/wiki/faq#uninstall)
   - [Troubleshooting](https://github.com/CyryxLabs/AEXOS/wiki/troubleshooting)

2. **Community Support**
   - Discord: #uninstall-help
   - GitHub Issues: Label with "uninstall"

3. **Emergency Support**
   ```bash
   # Generate uninstall report
   npx github:CyryxLabs/AEXOS diagnose --uninstall > uninstall-report.log
   ```

---

**Remember**: Always backup your data before uninstalling. The uninstall process is irreversible, and data recovery may not be possible without proper backups.
