/**
 * AEXOS CLI Entry Point
 *
 * Main entry point for the AEXOS CLI with Commander.js integration.
 * Registers all subcommands including workers, agents, etc.
 *
 * @module cli
 * @version 1.0.0
 * @story 2.7 - Discovery CLI Search
 */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

// Import command modules
const { createWorkersCommand } = require('./commands/workers');
const { createManifestCommand } = require('./commands/manifest');
const { createQaCommand } = require('./commands/qa');
const { createMcpCommand } = require('./commands/mcp');
const { createMigrateCommand } = require('./commands/migrate');
const { createGenerateCommand } = require('./commands/generate');
const { createMetricsCommand } = require('./commands/metrics');
const { createConfigCommand } = require('./commands/config');
const { createProCommand } = require('./commands/pro');
const { createSdcCommand } = require('./commands/sdc');
const { createWaveCommand } = require('./commands/wave');

// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
let packageVersion = '0.0.0';
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageVersion = packageJson.version;
} catch (error) {
  // Fallback version if package.json not found
}

/**
 * Create the main CLI program
 * @returns {Command} Commander program instance
 */
function createProgram() {
  const program = new Command();

  program
    .name('cyryx')
    .version(packageVersion)
    .description('AEXOS-FullStack: AI-Orchestrated System for Full Stack Development')
    .addHelpText('after', `
Commands:
  workers           Manage and discover workers
  manifest          Manage manifest files (validate, regenerate)
  qa                Quality Gate Manager (run, status)
  metrics           Quality Gate Metrics (record, show, seed, cleanup)
  config            Manage layered configuration (show, diff, migrate, validate)
  pro               AEXOS Pro license management (activate, status, deactivate, features)
  sdc               Lean full-sdc runtime (plan, status, verify, next)
  wave              Lean wave-execute planner (plan, status, next)
  mcp               Manage global MCP configuration
  migrate           Migrate from v2.0 to v4.0.4 structure
  generate          Generate documents from templates (prd, adr, pmdr, etc.)
  install           Install AEXOS in current project
  init <name>       Create new AEXOS project
  info              Show system information
  doctor            Run system diagnostics

For command help:
  $ aexos <command> --help

Examples:
  $ aexos workers search "json transformation"
  $ aexos workers list --category=data
  $ aexos manifest validate
  $ aexos manifest regenerate
  $ aexos qa run
  $ aexos qa status
  $ aexos mcp setup --with-defaults
  $ aexos mcp link
  $ aexos mcp status
  $ aexos metrics show
  $ aexos metrics record --layer 1 --passed
  $ aexos metrics seed --days 30
  $ aexos migrate --dry-run
  $ aexos migrate --from=2.0 --to=2.1
  $ aexos generate pmdr --title "Feature X Decision"
  $ aexos generate adr --save
  $ aexos generate list
  $ aexos config show
  $ aexos config show --debug
  $ aexos config diff --levels L1,L2
  $ aexos config migrate --dry-run
  $ aexos config validate
  $ aexos config init-local
  $ aexos pro activate --key PRO-XXXX-XXXX-XXXX-XXXX
  $ aexos pro status
  $ aexos pro deactivate
  $ aexos pro features
  $ aexos pro validate
  $ aexos sdc plan docs/stories/1.1.story.md --mode yolo
  $ aexos sdc next CORE-SU.A1
  $ aexos sdc verify docs/stories/1.1.story.md develop --mark
  $ aexos wave plan --stories a.md,b.md --wave-id W1 --save
  $ aexos wave next W1
  $ aexos install
  $ aexos doctor
`);

  // Add workers command
  program.addCommand(createWorkersCommand());

  // Add manifest command (Story 2.13)
  program.addCommand(createManifestCommand());

  // Add qa command (Story 2.10)
  program.addCommand(createQaCommand());

  // Add mcp command (Story 2.11)
  program.addCommand(createMcpCommand());

  // Add migrate command (Story 2.14)
  program.addCommand(createMigrateCommand());

  // Add generate command (Story 3.9)
  program.addCommand(createGenerateCommand());

  // Add metrics command (Story 3.11a)
  program.addCommand(createMetricsCommand());

  // Add config command (Story PRO-4)
  program.addCommand(createConfigCommand());

  // Add pro command (Story PRO-6)
  program.addCommand(createProCommand());

  // Lean full-sdc + wave-execute (CORE-SUPER-UPDATE Wave B execute)
  program.addCommand(createSdcCommand());
  program.addCommand(createWaveCommand());

  return program;
}

/**
 * Run the CLI
 * @param {string[]} args - Command line arguments
 * @returns {Promise<void>}
 */
async function run(args = process.argv) {
  const program = createProgram();

  try {
    await program.parseAsync(args);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  createProgram,
  run,
};
