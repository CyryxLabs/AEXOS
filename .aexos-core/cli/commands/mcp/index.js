/**
 * MCP Command Module
 *
 * Entry point for all MCP-related CLI commands.
 * Provides global MCP configuration management.
 *
 * @module cli/commands/mcp
 * @version 1.0.0
 * @story 2.11 - MCP System Global
 */

const { Command } = require('commander');
const { createSetupCommand } = require('./setup');
const { createLinkCommand } = require('./link');
const { createStatusCommand } = require('./status');
const { createAddCommand } = require('./add');

/**
 * Create the mcp command with all subcommands
 * @returns {Command} Commander command instance
 */
function createMcpCommand() {
  const mcp = new Command('mcp');

  mcp
    .description('Manage global MCP (Model Context Protocol) configuration')
    .addHelpText('after', `
Commands:
  setup             Create global ~/.aexos/mcp/ structure
  link              Link project to global MCP config
  status            Show global/project MCP config status
  add <server>      Add server to global config

Global Configuration:
  MCP servers are configured once at ~/.aexos/mcp/ and shared across
  all projects via symlinks (Unix) or junctions (Windows).

Benefits:
  - Configure MCP servers once, use everywhere
  - No duplicate configurations across projects
  - Easy maintenance and updates
  - Consistent MCP setup across workspaces

Quick Start:
  $ aexos mcp setup --with-defaults    # Create global config
  $ aexos mcp link                      # Link this project
  $ aexos mcp status                    # Check configuration

Examples:
  $ aexos mcp setup
  $ aexos mcp setup --with-defaults
  $ aexos mcp setup --servers context7,exa,github
  $ aexos mcp link
  $ aexos mcp link --migrate
  $ aexos mcp link --merge
  $ aexos mcp link --unlink
  $ aexos mcp status
  $ aexos mcp status --json
  $ aexos mcp add context7
  $ aexos mcp add myserver --type sse --url https://example.com/mcp
  $ aexos mcp add myserver --remove
  $ aexos mcp add --list-templates
`);

  // Add subcommands
  mcp.addCommand(createSetupCommand());
  mcp.addCommand(createLinkCommand());
  mcp.addCommand(createStatusCommand());
  mcp.addCommand(createAddCommand());

  return mcp;
}

module.exports = {
  createMcpCommand,
};
