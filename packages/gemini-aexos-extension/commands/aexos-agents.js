#!/usr/bin/env node
/**
 * AEXOS Agents Command - List available agents
 */

const fs = require('fs');
const path = require('path');

const AGENT_INFO = {
  dev: { icon: '👨‍💻', persona: 'Vulcan', role: 'Developer' },
  architect: { icon: '🏛️', persona: 'Vega', role: 'Architect' },
  qa: { icon: '🧪', persona: 'Argus', role: 'QA Engineer' },
  pm: { icon: '📋', persona: 'Janus', role: 'Product Manager' },
  po: { icon: '🎯', persona: 'Themis', role: 'Product Owner' },
  sm: { icon: '🔄', persona: 'Chronos', role: 'Scrum Master' },
  analyst: { icon: '📊', persona: 'Alex', role: 'Analyst' },
  devops: { icon: '🚀', persona: 'Polaris', role: 'DevOps' },
  'data-engineer': { icon: '🗄️', persona: 'Ceres', role: 'Data Engineer' },
  'ux-design-expert': { icon: '🎨', persona: 'Iris', role: 'UX Designer' },
};

async function main() {
  const projectDir = process.cwd();
  const agentsPath = path.join(projectDir, '.aexos-core', 'development', 'agents');

  console.log('🤖 AEXOS Agents\n');
  console.log('━'.repeat(50));

  if (!fs.existsSync(agentsPath)) {
    console.log('No agents found. Run: npx @aexos/core install');
    return;
  }

  const files = fs.readdirSync(agentsPath).filter((f) => f.endsWith('.md') && !f.startsWith('_'));

  for (const file of files) {
    const agentId = file.replace('.md', '');
    const info = AGENT_INFO[agentId] || { icon: '🤖', persona: agentId, role: 'Agent' };

    console.log(`${info.icon} @${agentId}`);
    console.log(`   Persona: ${info.persona} | Role: ${info.role}`);
  }

  console.log('\n' + '━'.repeat(50));
  console.log('Quick launch with: /aexos-menu or /aexos-<agent-id>');
  console.log('Alternative: /aexos-agent <agent-id>');
}

main().catch(console.error);
