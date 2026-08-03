#!/usr/bin/env node

/**
 * AEXOS CLI
 * Main entry point - Standalone (no external dependencies for npx compatibility)
 * Version: 4.0.0
 */

const path = require('path');
const fs = require('fs');
// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];

// Helper: Run initialization wizard
async function runWizard(options = {}) {
  if (options.force || options.yes || options.ci) {
    process.env.AEXOS_INSTALL_FORCE = '1';
  }
  if (options.quiet || options.ci) {
    process.env.AEXOS_INSTALL_QUIET = '1';
  }
  if (options.dryRun) {
    process.env.AEXOS_INSTALL_DRY_RUN = '1';
  }

  // Use the v4 wizard from packages/installer/src/wizard/index.js
  const wizardPath = path.join(__dirname, '..', 'packages', 'installer', 'src', 'wizard', 'index.js');

  if (!fs.existsSync(wizardPath)) {
    // Fallback to legacy wizard if new wizard not found
    const legacyScript = path.join(__dirname, 'aexos-init.js');
    if (fs.existsSync(legacyScript)) {
      if (!options.quiet) {
        console.log('⚠️  Using legacy wizard (src/wizard not found)');
      }
      // Legacy wizard doesn't support options, pass via env vars
      process.env.AEXOS_INSTALL_FORCE = options.force ? '1' : '';
      process.env.AEXOS_INSTALL_QUIET = options.quiet ? '1' : '';
      process.env.AEXOS_INSTALL_DRY_RUN = options.dryRun ? '1' : '';
      require(legacyScript);
      return;
    }
    console.error('❌ Initialization wizard not found');
    console.error('Please ensure AEXOS is installed correctly.');
    process.exit(1);
  }

  try {
    // Run the v4 wizard with options
    const { runWizard: executeWizard } = require(wizardPath);
    await executeWizard(options);
  } catch (error) {
    console.error('❌ Wizard error:', error.message);
    process.exit(1);
  }
}

// Helper: Show help
function showHelp() {
  console.log(`
AEXOS - Agentic eXecution & Orchestration System v${packageJson.version}
Cyryx Labs | Universal AI Agent Framework for Any Domain

USAGE:
  npx @aexos/core              # Run installation wizard
  npx @aexos/core install      # Install into the CURRENT directory (takes no name)
  npx @aexos/core init <name>  # Create a NEW directory <name> (name is required)
  npx @aexos/core update       # Update to latest version
  npx @aexos/core validate     # Validate installation integrity
  npx @aexos/core info         # Show system info
  npx @aexos/core doctor       # Run diagnostics
  aexos sdc plan <story.md>          # Lean full-sdc plan/progress
  aexos sdc next <story-id>          # Next SDC phase + skill
  aexos wave plan --stories a,b      # Lean wave-execute DAG plan
  aexos-delegate codex -t <slug>     # Delegate implementation to external executor
  npx @aexos/core enterprise upgrade --target . --dry-run --enterprise-source <path>
                                       # Plan Pro to Enterprise upgrade
  npx @aexos/core --version    # Show version
  npx @aexos/core --version -d # Show detailed version info
  npx @aexos/core --help       # Show this help

UPDATE:
  aexos update                    # Update to latest version
  aexos update --check            # Check for updates without applying
  aexos update --dry-run          # Preview what would be updated
  aexos update --force            # Force update even if up-to-date
  aexos update --verbose          # Show detailed output

VALIDATION:
  aexos validate                    # Validate installation integrity
  aexos validate --repair           # Repair missing/corrupted files
  aexos validate --repair --dry-run # Preview repairs
  aexos validate --detailed         # Show detailed file list

CONFIGURATION:
  aexos config show                       # Show resolved configuration
  aexos config show --debug               # Show with source annotations
  aexos config diff --levels L1,L2        # Compare config levels
  aexos config migrate                    # Migrate monolithic to layered
  aexos config validate                   # Validate config files
  aexos config init-local                 # Create local-config.yaml

SERVICE DISCOVERY:
  aexos workers search <query>            # Search for workers
  aexos workers search "json" --category=data
  aexos workers search "transform" --tags=etl,data
  aexos workers search "api" --format=json

EXTERNAL EXECUTION:
  aexos-delegate codex -t story-4.3 -f prompt.md
  aexos-delegate codex -t story-4.3 -p "Implement AC1" --dry-run

ENTERPRISE:
  aexos enterprise upgrade --target . --enterprise-source /path/to/CYRYX-enterprise --dry-run
  aexos enterprise upgrade --target . --enterprise-source /path/to/CYRYX-enterprise --dry-run --plan outputs/enterprise-upgrade-plan.yaml

EXAMPLES:
  # Install into the directory you are already in
  cd my-existing-project && npx @aexos/core install

  # Create a new project directory and install into it
  npx @aexos/core init my-project

  # Search for workers
  aexos workers search "json csv"

After installing, restart your IDE: Claude Code reads commands and skills once,
at session start. The command namespace is /AEXOS, in capitals.

For more information, visit: https://github.com/CyryxLabs/aexos-engine
`);
}

// Helper: Show version
async function showVersion() {
  const isDetailed = args.includes('--detailed') || args.includes('-d');

  if (!isDetailed) {
    // Simple version output (backwards compatible)
    console.log(packageJson.version);
    return;
  }

  // Detailed version output (Story 7.2: Version Tracking)
  console.log(`AEXOS v${packageJson.version}`);
  console.log('Package: aexos-core');

  // Check for local installation
  const localVersionPath = path.join(process.cwd(), '.aexos-core', 'version.json');

  if (fs.existsSync(localVersionPath)) {
    try {
      const versionInfo = JSON.parse(fs.readFileSync(localVersionPath, 'utf8'));
      console.log('\n📦 Local Installation:');
      console.log(`  Version:    ${versionInfo.version}`);
      console.log(`  Mode:       ${versionInfo.mode || 'unknown'}`);

      if (versionInfo.installedAt) {
        const installedDate = new Date(versionInfo.installedAt);
        console.log(`  Installed:  ${installedDate.toLocaleDateString()}`);
      }

      if (versionInfo.updatedAt) {
        const updatedDate = new Date(versionInfo.updatedAt);
        console.log(`  Updated:    ${updatedDate.toLocaleDateString()}`);
      }

      if (versionInfo.fileHashes) {
        const fileCount = Object.keys(versionInfo.fileHashes).length;
        console.log(`  Files:      ${fileCount} tracked`);
      }

      if (versionInfo.customized && versionInfo.customized.length > 0) {
        console.log(`  Customized: ${versionInfo.customized.length} files`);
      }

      // Version comparison
      if (versionInfo.version !== packageJson.version) {
        console.log('\n⚠️  Version mismatch!');
        console.log(`  Local:  ${versionInfo.version}`);
        console.log(`  Latest: ${packageJson.version}`);
        console.log('  Run \'npx @aexos/core update\' to update.');
      } else {
        console.log('\n✅ Up to date');
      }
    } catch (error) {
      console.log(`\n⚠️  Could not read version.json: ${error.message}`);
    }
  } else {
    console.log('\n📭 No local installation found');
    console.log('  Run \'npx @aexos/core install\' to install AEXOS in this project.');
  }
}

// Helper: Show system info
function showInfo() {
  console.log('📊 AEXOS System Information\n');
  console.log(`Version: ${packageJson.version}`);
  console.log(`Platform: ${process.platform}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Architecture: ${process.arch}`);
  console.log(`Working Directory: ${process.cwd()}`);
  console.log(`Install Location: ${path.join(__dirname, '..')}`);

  // Check if .aexos-core exists
  const cyryxCoreDir = path.join(__dirname, '..', '.aexos-core');
  if (fs.existsSync(cyryxCoreDir)) {
    console.log('\n✓ AEXOS Core installed');

    // Count components
    const countFiles = (dir) => {
      try {
        return fs.readdirSync(dir).length;
      } catch {
        return 0;
      }
    };

    const devDir = path.join(cyryxCoreDir, 'development');
    const componentBase = fs.existsSync(devDir) ? devDir : cyryxCoreDir;

    console.log(`  - Agents: ${countFiles(path.join(componentBase, 'agents'))}`);
    console.log(`  - Tasks: ${countFiles(path.join(componentBase, 'tasks'))}`);
    console.log(`  - Templates: ${countFiles(path.join(componentBase, 'templates'))}`);
    console.log(`  - Workflows: ${countFiles(path.join(componentBase, 'workflows'))}`);

  } else {
    console.log('\n⚠️  AEXOS Core not found');
  }

  // Check AEXOS Pro status (Task 5.1)
  const proDir = path.join(__dirname, '..', 'pro');
  if (fs.existsSync(proDir)) {
    console.log('\n✓ AEXOS Pro installed');

    try {
      const { featureGate } = require(path.join(proDir, 'license', 'feature-gate'));
      const state = featureGate.getLicenseState();
      const info = featureGate.getLicenseInfo();

      const stateEmoji = {
        'Active': '✅',
        'Grace': '⚠️',
        'Expired': '❌',
        'Not Activated': '➖',
      };

      console.log(`  - License: ${stateEmoji[state] || ''} ${state}`);

      if (info && info.features) {
        const availableCount = featureGate.listAvailable().length;
        console.log(`  - Features: ${availableCount} available`);
      }
    } catch {
      console.log('  - License: Unable to check status');
    }
  }
}

// Helper: Run installation validation
async function runValidate() {
  const validateArgs = args.slice(1); // Remove 'validate' from args

  try {
    // Load the validate command module
    const { createValidateCommand } = require('../.aexos-core/cli/commands/validate/index.js');
    const validateCmd = createValidateCommand();

    // Parse and execute (Note: don't include 'validate' as it's the command name, not an argument)
    await validateCmd.parseAsync(['node', 'cyryx', ...validateArgs]);
  } catch (_error) {
    // Fallback: Run quick validation inline
    console.log('Running installation validation...\n');

    try {
      const validatorPath = path.join(
        __dirname,
        '..',
        'packages',
        'installer',
        'src',
        'installer',
        'post-install-validator.js',
      );
      const { PostInstallValidator, formatReport } = require(validatorPath);

      const projectRoot = process.cwd();
      const validator = new PostInstallValidator(projectRoot, path.join(__dirname, '..'));
      const report = await validator.validate();

      console.log(formatReport(report, { colors: true }));

      if (
        report.status === 'failed' ||
        report.stats.missingFiles > 0 ||
        report.stats.corruptedFiles > 0
      ) {
        process.exit(1);
      }
    } catch (validatorError) {
      console.error(`❌ Validation error: ${validatorError.message}`);
      if (args.includes('--verbose') || args.includes('-v')) {
        console.error(validatorError.stack);
      }
      process.exit(2);
    }
  }
}

// Helper: Run update command
async function runUpdate() {
  const updateArgs = args.slice(1);
  const isCheck = updateArgs.includes('--check');
  const isDryRun = updateArgs.includes('--dry-run');
  const isForce = updateArgs.includes('--force');
  const isVerbose = updateArgs.includes('--verbose') || updateArgs.includes('-v');

  try {
    const updaterPath = path.join(__dirname, '..', 'packages', 'installer', 'src', 'updater', 'index.js');

    if (!fs.existsSync(updaterPath)) {
      console.error('❌ Updater module not found');
      console.error('Please ensure AEXOS is installed correctly.');
      process.exit(1);
    }

    const { CYRYXUpdater, formatCheckResult, formatUpdateResult } = require(updaterPath);

    const updater = new CYRYXUpdater(process.cwd(), {
      verbose: isVerbose,
      force: isForce,
    });

    if (isCheck) {
      // Check only mode
      console.log('🔍 Checking for updates...\n');
      const result = await updater.checkForUpdates();
      console.log(formatCheckResult(result, { colors: true }));

      if (result.status === 'check_failed') {
        process.exit(1);
      }
    } else {
      // Update mode
      console.log('🔄 AEXOS Update\n');

      const result = await updater.update({
        dryRun: isDryRun,
        onProgress: (phase, message) => {
          if (isVerbose) {
            console.log(`[${phase}] ${message}`);
          }
        },
      });

      console.log(formatUpdateResult(result, { colors: true }));

      if (!result.success && result.error !== 'Already up to date') {
        process.exit(1);
      }
    }

    // --include-pro: also update Pro after core (Story 122.5)
    if (updateArgs.includes('--include-pro')) {
      try {
        const proUpdaterPath = path.join(__dirname, '..', '.aexos-core', 'core', 'pro', 'pro-updater');
        const { updatePro, formatUpdateResult: formatProResult } = require(proUpdaterPath);

        console.log('\n🔄 Updating AEXOS Pro...\n');

        const proResult = await updatePro(process.cwd(), {
          check: isCheck,
          dryRun: isDryRun,
          force: isForce,
          onProgress: (phase, message) => {
            if (isVerbose) console.log(`[pro:${phase}] ${message}`);
          },
        });

        console.log(formatProResult(proResult));

        if (!proResult.success) {
          process.exit(1);
        }
      } catch (proError) {
        console.error(`❌ Pro update failed: ${proError.message}`);
        if (proError.stack) {
          console.error(proError.stack);
        }
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(`❌ Update error: ${error.message}`);
    if (args.includes('--verbose') || args.includes('-v')) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Helper: Run doctor diagnostics (v2.0 — delegates to modular doctor)
async function runDoctor(options = {}) {
  const { runDoctorChecks } = require(path.join(__dirname, '..', '.aexos-core', 'core', 'doctor'));

  const result = await runDoctorChecks({
    fix: options.fix || false,
    json: options.json || false,
    dryRun: options.dryRun || false,
    quiet: options.quiet || false,
    projectRoot: process.cwd(),
  });

  console.log(result.formatted);

  // Exit with code 1 if any FAIL results
  if (result.data && result.data.summary && result.data.summary.fail > 0) {
    process.exit(1);
  }
}

// Helper: Run Enterprise commands
async function runEnterprise() {
  const enterpriseArgs = args.slice(1);
  const enterprisePath = path.join(
    __dirname,
    '..',
    'packages',
    'installer',
    'src',
    'enterprise',
    'enterprise-upgrade-plan.js',
  );

  try {
    const { runEnterpriseUpgradeCli } = require(enterprisePath);
    const exitCode = await runEnterpriseUpgradeCli(enterpriseArgs, {
      stdout: process.stdout,
      stderr: process.stderr,
    });

    if (exitCode !== 0) {
      process.exit(exitCode);
    }
  } catch (error) {
    console.error(`❌ Enterprise command error: ${error.message}`);
    process.exit(1);
  }
}

// Helper: Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper: Remove AEXOS sections from .gitignore
function cleanGitignore(gitignorePath) {
  if (!fs.existsSync(gitignorePath)) return { removed: false };

  const content = fs.readFileSync(gitignorePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let inCyryxSection = false;
  let removedLines = 0;

  for (const line of lines) {
    if (
      line.includes('# AEXOS') ||
      line.includes('# Added by AEXOS') ||
      line.includes('# CYRYX') ||
      line.includes('# Added by CYRYX')
    ) {
      inCyryxSection = true;
      removedLines++;
      continue;
    }
    if (inCyryxSection && line.trim() === '') {
      inCyryxSection = false;
      continue;
    }
    if (inCyryxSection) {
      removedLines++;
      continue;
    }
    newLines.push(line);
  }

  if (removedLines > 0) {
    fs.writeFileSync(gitignorePath, newLines.join('\n'));
    return { removed: true, lines: removedLines };
  }
  return { removed: false };
}

// Helper: Show uninstall help
function showUninstallHelp() {
  console.log(`
Usage: npx @aexos/core uninstall [options]

Remove AEXOS from the current project.

Options:
  --force        Skip confirmation prompt
  --keep-data    Keep .aexos/ directory (settings and history)
  --dry-run      Show what would be removed without removing
  --legacy       Also remove earlier frameworks (AIOX, CYRYX)
  --legacy-only  Remove ONLY the earlier frameworks, keep AEXOS
  -h, --help     Show this help message

What gets removed:
  - .aexos-core/    Framework core files
  - docs/stories/   Story files (if created by AEXOS)
  - squads/         Squad definitions
  - .gitignore      AEXOS-added entries only

With --legacy or --legacy-only, also:
  - .aiox-core/ .cyryx-core/          Earlier framework cores
  - .claude/commands/AIOX  (+CYRYX)   Stale slash commands
  - .claude/skills/AIOX    (+CYRYX)   Stale skills
  - the same under .gemini/ .codex/ .cursor/ and other IDE surfaces

What is preserved (with --keep-data):
  - .aexos/         Project settings and agent history

Exit Codes:
  0  Uninstall successful
  1  Uninstall failed or cancelled

Examples:
  # Interactive uninstall (with confirmation)
  npx @aexos/core uninstall

  # Force uninstall without prompts
  npx @aexos/core uninstall --force

  # See what would be removed
  npx @aexos/core uninstall --dry-run

  # Uninstall but keep project data
  npx @aexos/core uninstall --keep-data

  # Migrating: drop AIOX/CYRYX but leave AEXOS in place
  npx @aexos/core uninstall --legacy-only --force
`);
}

// Helper: Show doctor help
function showDoctorHelp() {
  console.log(`
Usage: npx @aexos/core doctor [options]

Run health checks on your AEXOS installation.

Options:
  --fix        Automatically fix detected issues
  --dry-run    Show what --fix would do without making changes
  --json       Output results as structured JSON
  --quiet      Minimal output (exit code only)
  -h, --help   Show this help message

Checks performed:
  • Required directories exist (.aexos-core/, .aexos/)
  • Configuration files are valid JSON/YAML
  • Agent definitions are complete
  • Task files have required fields
  • Dependencies are installed

Exit Codes:
  0  All checks passed (or issues fixed with --fix)
  1  Issues detected (run with --fix to repair)

Examples:
  # Run health check
  npx @aexos/core doctor

  # Auto-fix detected issues
  npx @aexos/core doctor --fix

  # Preview what would be fixed
  npx @aexos/core doctor --fix --dry-run
`);
}

// Uninstall AEXOS from project
async function runUninstall(options = {}) {
  const {
    force = false, keepData = false, dryRun = false, quiet = false,
    legacy = false, legacyOnly = false,
  } = options;
  const cwd = process.cwd();

  // Items to remove
  // The footprint is described in one place so uninstall removes what install
  // wrote. It previously listed only the core, the squads and the project data
  // — every IDE surface survived, so the slash commands outlived the uninstall
  // and the editor kept offering agents that were no longer installed.
  const {
    AEXOS_FOOTPRINT,
    findLegacyInstalls,
  } = require('../packages/installer/src/installer/install-footprint');

  // --legacy-only is the migration case: clear the previous framework and
  // leave this one installed. Without it the only way to stop the old slash
  // commands appearing was to uninstall both and start over.
  const itemsToRemove = legacyOnly
    ? []
    : AEXOS_FOOTPRINT.filter((item) => (keepData ? item.path !== '.aexos' : true)).map((item) => ({
      path: item.path,
      description: item.label,
    }));

  // `--legacy` also clears installs from earlier generations of this framework,
  // which is what a project migrated from AIOX needs before its editor stops
  // offering both.
  if (legacy || legacyOnly) {
    const found = findLegacyInstalls(cwd);
    for (const item of found.items) {
      itemsToRemove.push({ path: item.path, description: item.label });
    }
  }

  // Check what exists
  const existingItems = itemsToRemove.filter(item =>
    fs.existsSync(path.join(cwd, item.path)),
  );

  if (existingItems.length === 0) {
    console.log('ℹ️  No AEXOS installation found in this directory.');
    return;
  }

  // Calculate total size
  let totalSize = 0;
  const itemSizes = [];

  for (const item of existingItems) {
    const itemPath = path.join(cwd, item.path);
    try {
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        // Simple recursive size calculation
        const getSize = (dir) => {
          let size = 0;
          try {
            const files = fs.readdirSync(dir);
            for (const file of files) {
              const filePath = path.join(dir, file);
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                size += getSize(filePath);
              } else {
                size += stat.size;
              }
            }
          } catch { /* ignore errors */ }
          return size;
        };
        const size = getSize(itemPath);
        totalSize += size;
        itemSizes.push({ ...item, size });
      } else {
        totalSize += stats.size;
        itemSizes.push({ ...item, size: stats.size });
      }
    } catch {
      itemSizes.push({ ...item, size: 0 });
    }
  }

  // Show what will be removed
  if (!quiet) {
    console.log('\n📋 Items to be removed:\n');
    for (const item of itemSizes) {
      const sizeStr = item.size > 0 ? ` (${formatBytes(item.size)})` : '';
      console.log(`  • ${item.path}/${sizeStr} - ${item.description}`);
    }
    console.log(`\n  Total: ${formatBytes(totalSize)}`);

    // Check for .gitignore cleanup
    const gitignorePath = path.join(cwd, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf8');
      if (
        content.includes('# AEXOS') ||
        content.includes('# Added by AEXOS') ||
        content.includes('# CYRYX') ||
        content.includes('# Added by CYRYX')
      ) {
        console.log('  • .gitignore AEXOS entries will be cleaned');
      }
    }
    console.log('');
  }

  // Dry run - stop here
  if (dryRun) {
    console.log('🔍 Dry run - no changes made.');
    return;
  }

  // Confirmation
  if (!force) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise(resolve => {
      rl.question('⚠️  Are you sure you want to uninstall AEXOS? (y/N): ', resolve);
    });
    rl.close();

    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log('❌ Uninstall cancelled.');
      process.exit(1);
    }
  }

  // Perform removal
  if (!quiet) console.log('\n🗑️  Removing AEXOS components...\n');

  for (const item of existingItems) {
    const itemPath = path.join(cwd, item.path);
    try {
      fs.rmSync(itemPath, { recursive: true, force: true });
      if (!quiet) console.log(`  ✓ Removed ${item.path}/`);
    } catch (error) {
      console.error(`  ✗ Failed to remove ${item.path}: ${error.message}`);
    }
  }

  // Clean .gitignore
  const gitignorePath = path.join(cwd, '.gitignore');
  const gitignoreResult = cleanGitignore(gitignorePath);
  if (gitignoreResult.removed && !quiet) {
    console.log(`  ✓ Cleaned ${gitignoreResult.lines} AEXOS entries from .gitignore`);
  }

  // Summary
  if (!quiet) {
    console.log('\n✅ AEXOS has been uninstalled.');
    if (keepData) {
      console.log('   Your project data in .aexos/ has been preserved.');
    }
    console.log('\n   To reinstall: npx @aexos/core install');
  }
}

// Helper: Show install help
function showInstallHelp() {
  console.log(`
Usage: npx @aexos/core install [options]

Install AEXOS in the current directory.

Options:
  --force      Overwrite existing AEXOS installation
  --yes, -y    Accept safe defaults and overwrite existing AEXOS installation
  --ci         Non-interactive CI mode (--quiet --force)
  --quiet      Minimal output (no banner, no prompts) - ideal for CI/CD
  --dry-run    Simulate installation without modifying files
  --ide <ide>  Configure a specific IDE during quiet/CI install
  --merge      Auto-merge existing config files (brownfield mode)
  --no-merge   Disable merge option, use legacy overwrite behavior
  -h, --help   Show this help message

Smart Merge (Brownfield):
  When installing in a project with existing config files (.env, CLAUDE.md),
  AEXOS can merge new settings while preserving your customizations.

  - .env files: Adds new variables, preserves existing values
  - CLAUDE.md: Updates AEXOS sections, keeps your custom rules

Exit Codes:
  0  Installation successful
  1  Installation failed

Examples:
  # Interactive installation
  npx @aexos/core install

  # Force reinstall without prompts
  npx @aexos/core install --force

  # Brownfield: merge configs automatically
  npx @aexos/core install --merge

  # Silent install for CI/CD
  npx @aexos/core install --quiet --force

  # Explicit CI install with Claude Code files materialized
  npx @aexos/core install --ci --yes --ide claude-code

  # Preview what would be installed
  npx @aexos/core install --dry-run
`);
}

// Helper: Create new project
// Helper: Show init help
function showInitHelp() {
  console.log(`
Usage: npx @aexos/core init <project-name> [options]

Create a new AEXOS project in a new directory named <project-name>.
The name is required. To install into the directory you are already in,
use "npx @aexos/core install", which takes no name.

Options:
  --force              Force creation in non-empty directory
  --skip-install       Skip npm dependency installation
  --template <name>    Use specific template (default: default)
  -t <name>            Shorthand for --template
  -h, --help           Show this help message

Available Templates:
  default     Full installation with all agents, tasks, and workflows
  minimal     Essential files only (dev agent + basic tasks)
  enterprise  Everything + dashboards + team integrations

Examples:
  npx @aexos/core init my-project
  npx @aexos/core init my-project --template minimal
  npx @aexos/core init my-project --force --skip-install
  npx @aexos/core init . --template enterprise
`);
}

async function initProject() {
  // 1. Parse ALL args after 'init'
  const initArgs = args.slice(1);

  // 2. Handle --help FIRST (before creating any directories)
  if (initArgs.includes('--help') || initArgs.includes('-h')) {
    showInitHelp();
    return;
  }

  // 3. Parse flags
  const isForce = initArgs.includes('--force');
  const skipInstall = initArgs.includes('--skip-install');

  // Template with argument
  const templateIndex = initArgs.findIndex((a) => a === '--template' || a === '-t');
  let template = 'default';
  if (templateIndex !== -1) {
    template = initArgs[templateIndex + 1];
    if (!template || template.startsWith('-')) {
      console.error('❌ --template requires a template name');
      console.error('Available templates: default, minimal, enterprise');
      process.exit(1);
    }
  }

  // Validate template
  const validTemplates = ['default', 'minimal', 'enterprise'];
  if (!validTemplates.includes(template)) {
    console.error(`❌ Unknown template: ${template}`);
    console.error(`Available templates: ${validTemplates.join(', ')}`);
    process.exit(1);
  }

  // 4. Extract project name (anything that doesn't start with - and isn't a template value)
  const projectName = initArgs.find((arg, i) => {
    if (arg.startsWith('-')) return false;
    // Skip if it's the value after --template
    const prevArg = initArgs[i - 1];
    if (prevArg === '--template' || prevArg === '-t') return false;
    return true;
  });

  if (!projectName) {
    console.error('❌ Project name is required');
    console.error('\nUsage: npx @aexos/core init <project-name> [options]');
    console.error('\nTo install into the directory you are already in, use `install` instead:');
    console.error('  npx @aexos/core install');
    console.error('\nRun with --help for more information.');
    process.exit(1);
  }

  // 5. Handle "." to install in current directory
  const isCurrentDir = projectName === '.';
  const targetPath = isCurrentDir ? process.cwd() : path.join(process.cwd(), projectName);
  const displayName = isCurrentDir ? path.basename(process.cwd()) : projectName;

  // 6. Check if directory exists
  if (fs.existsSync(targetPath) && !isCurrentDir) {
    const contents = fs.readdirSync(targetPath).filter((f) => !f.startsWith('.'));
    if (contents.length > 0 && !isForce) {
      console.error(`❌ Directory already exists and is not empty: ${projectName}`);
      console.error('Use --force to overwrite.');
      process.exit(1);
    }
    if (contents.length > 0 && isForce) {
      console.log(`⚠️  Using --force: overwriting existing directory: ${projectName}`);
    } else {
      console.log(`✓ Using existing empty directory: ${projectName}`);
    }
  } else if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log(`✓ Created directory: ${projectName}`);
  }

  console.log(`Creating new AEXOS project: ${displayName}`);
  if (template !== 'default') {
    console.log(`Template: ${template}`);
  }
  if (skipInstall) {
    console.log('Skip install: enabled');
  }
  console.log('');

  // 7. Change to project directory (if not already there)
  if (!isCurrentDir) {
    process.chdir(targetPath);
  }

  // 8. Run the initialization wizard with options
  await runWizard({
    template,
    skipInstall,
    force: isForce,
  });
}

// Command routing (async main function)
async function main() {
  switch (command) {
    case 'workers':
      // Service Discovery CLI - Story 2.7
      try {
        const { run } = require('../.aexos-core/cli/index.js');
        await run(process.argv);
      } catch (error) {
        console.error(`❌ Workers command error: ${error.message}`);
        process.exit(1);
      }
      break;

    case 'config':
      // Layered Configuration CLI - Story PRO-4
      try {
        const { run } = require('../.aexos-core/cli/index.js');
        await run(process.argv);
      } catch (error) {
        console.error(`❌ Config command error: ${error.message}`);
        process.exit(1);
      }
      break;

    case 'pro':
      // AEXOS Pro License Management - Story PRO-6
      try {
        const { run } = require('../.aexos-core/cli/index.js');
        await run(process.argv);
      } catch (error) {
        console.error(`❌ Pro command error: ${error.message}`);
        process.exit(1);
      }
      break;

    case 'sdc':
      // Lean full-sdc runtime — plan / verify / progress
      try {
        const { run } = require('../.aexos-core/cli/index.js');
        await run(process.argv);
      } catch (error) {
        console.error(`❌ SDC command error: ${error.message}`);
        process.exit(1);
      }
      break;

    case 'wave':
      // Lean wave-execute planner — DAG + file partition
      try {
        const { run } = require('../.aexos-core/cli/index.js');
        await run(process.argv);
      } catch (error) {
        console.error(`❌ Wave command error: ${error.message}`);
        process.exit(1);
      }
      break;

    case 'enterprise':
      // AEXOS Enterprise Upgrade Planning - Story PEM.1
      await runEnterprise();
      break;

    case 'install': {
      // Install in current project with flag support
      const installArgs = args.slice(1);
      if (installArgs.includes('--help') || installArgs.includes('-h')) {
        showInstallHelp();
        break;
      }
      const isCi = installArgs.includes('--ci');
      const isYes = installArgs.includes('--yes') || installArgs.includes('-y');
      const ideIndex = installArgs.indexOf('--ide');
      const installOptions = {
        force: installArgs.includes('--force') || isYes || isCi,
        yes: isYes,
        ci: isCi,
        quiet: installArgs.includes('--quiet') || isCi,
        dryRun: installArgs.includes('--dry-run'),
        forceMerge: installArgs.includes('--merge'),
        noMerge: installArgs.includes('--no-merge'),
        ide: ideIndex >= 0 ? installArgs[ideIndex + 1] : null,
      };
      if (!installOptions.quiet) {
        console.log('AEXOS Installation\n');
        // CORE-SU.F1 / #773 — Windows npx lock timeout advisory
        try {
          const {
            printWindowsNpxInstallHint,
          } = require('../.aexos-core/core/install/windows-npx-hint');
          printWindowsNpxInstallHint();
        } catch (_err) {
          /* optional hint */
        }
      }
      await runWizard(installOptions);
      break;
    }

    case 'uninstall': {
      // Uninstall AEXOS from project
      const uninstallArgs = args.slice(1);
      if (uninstallArgs.includes('--help') || uninstallArgs.includes('-h')) {
        showUninstallHelp();
        break;
      }
      const uninstallOptions = {
        force: uninstallArgs.includes('--force'),
        keepData: uninstallArgs.includes('--keep-data'),
        dryRun: uninstallArgs.includes('--dry-run'),
        quiet: uninstallArgs.includes('--quiet'),
        legacy: uninstallArgs.includes('--legacy'),
        legacyOnly: uninstallArgs.includes('--legacy-only'),
      };
      await runUninstall(uninstallOptions);
      break;
    }

    case 'init': {
      // Create new project (flags parsed inside initProject)
      await initProject();
      break;
    }

    case 'info':
      showInfo();
      break;

    case 'doctor': {
      // Run health check with flag support
      const doctorArgs = args.slice(1);
      if (doctorArgs.includes('--help') || doctorArgs.includes('-h')) {
        showDoctorHelp();
        break;
      }
      const doctorOptions = {
        fix: doctorArgs.includes('--fix'),
        json: doctorArgs.includes('--json'),
        dryRun: doctorArgs.includes('--dry-run'),
        quiet: doctorArgs.includes('--quiet'),
      };
      await runDoctor(doctorOptions);
      break;
    }

    case 'validate':
      // Post-installation validation - Story 6.19
      await runValidate();
      break;

    case 'update':
      // Update to latest version - Epic 7
      await runUpdate();
      break;

    case '--version':
    case '-v':
    case '-V':
      await showVersion();
      break;

    case '--help':
    case '-h':
      showHelp();
      break;

    case undefined:
      // No arguments - run wizard directly (npx default behavior)
      console.log('AEXOS Installation\n');
      await runWizard();
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log('\nRun with --help to see available commands');
      process.exit(1);
  }
}

// Execute main function
main().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
