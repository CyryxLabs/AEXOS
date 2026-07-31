#!/usr/bin/env node
/**
 * AEXOS Status Command for Gemini CLI Extension
 * Shows system status and provider information
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const projectDir = process.cwd();

  console.log('🔷 AEXOS Status\n');
  console.log('━'.repeat(40));

  // Check AEXOS installation
  const cyryxCorePath = path.join(projectDir, '.aexos-core');
  if (fs.existsSync(cyryxCorePath)) {
    console.log('✅ AEXOS Core: Installed');

    // Count agents
    const agentsPath = path.join(cyryxCorePath, 'development', 'agents');
    if (fs.existsSync(agentsPath)) {
      const agents = fs.readdirSync(agentsPath).filter((f) => f.endsWith('.md'));
      console.log(`   Agents: ${agents.length}`);
    }

    // Count tasks
    const tasksPath = path.join(cyryxCorePath, 'development', 'tasks');
    if (fs.existsSync(tasksPath)) {
      const tasks = fs.readdirSync(tasksPath).filter((f) => f.endsWith('.md'));
      console.log(`   Tasks: ${tasks.length}`);
    }
  } else {
    console.log('❌ AEXOS Core: Not installed');
    console.log('   Run: npx aexos-core install');
  }

  // Check providers
  console.log('\n📡 AI Providers:');

  try {
    require('child_process').execSync('claude --version', { stdio: 'pipe' });
    console.log('   ✅ Claude Code: Available');
  } catch {
    console.log('   ❌ Claude Code: Not installed');
  }

  try {
    require('child_process').execSync('gemini --version', { stdio: 'pipe' });
    console.log('   ✅ Gemini CLI: Available (current)');
  } catch {
    console.log('   ⚠️  Gemini CLI: Running from extension');
  }

  // Check config
  const configPath = path.join(projectDir, '.aexos-ai-config.yaml');
  if (fs.existsSync(configPath)) {
    console.log('\n⚙️  AI Config: .aexos-ai-config.yaml found');
  }

  console.log('\n' + '━'.repeat(40));
  console.log('Use @agent-name to activate an agent');
}

main().catch(console.error);
