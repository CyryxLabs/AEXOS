#!/usr/bin/env node

/**
 * Agent Assignment Resolver
 * Story: 6.1.7.1 - Task Content Completion
 * Purpose: Resolve {TODO: Agent Name} placeholders in all 114 task files
 * 
 * Maps tasks to agents based on:
 * 1. Task filename prefix (dev-, qa-, po-, etc.)
 * 2. Agent capability definitions from agent files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TASKS_DIR = path.join(__dirname, '../tasks');
const _AGENTS_DIR = path.join(__dirname, '../agents');
const TODO_PATTERN = /responsável: \{TODO: Agent Name\}/g;

// Agent mapping based on task filename prefixes and agent capabilities
const AGENT_MAPPINGS = {
  'dev-': 'Vulcan (Builder)',
  'qa-': 'Argus (Guardian)',
  'po-': 'Themis (Balancer)',
  'sm-': 'Chronos (Facilitator)',
  'pm-': 'Janus (Strategist)',
  'architect-': 'Vega (Visionary)',
  'analyst-': 'Sirius (Decoder)',
  'ux-': 'Iris (Empathizer)',
  'db-': 'Ceres (Sage)',
  'github-devops-': 'Polaris (Automator)',
  'data-engineer-': 'Ceres (Sage)',
};

// Generic task mappings (tasks without clear prefix)
const GENERIC_TASK_MAPPINGS = {
  'advanced-elicitation.md': 'Sirius (Decoder)',
  'analyze-framework.md': 'Vega (Visionary)',
  'analyze-performance.md': 'Vulcan (Builder)',
  'apply-qa-fixes.md': 'Vulcan (Builder)',
  'audit-codebase.md': 'Argus (Guardian)',
  'audit-tailwind-config.md': 'Iris (Empathizer)',
  'audit-utilities.md': 'Argus (Guardian)',
  'bootstrap-shadcn-library.md': 'Iris (Empathizer)',
  'brownfield-create-epic.md': 'Janus (Strategist)',
  'brownfield-create-story.md': 'Themis (Balancer)',
  'build-component.md': 'Iris (Empathizer)',
  'calculate-roi.md': 'Janus (Strategist)',
  'ci-cd-configuration.md': 'Polaris (Automator)',
  'cleanup-utilities.md': 'Vulcan (Builder)',
  'collaborative-edit.md': 'Chronos (Facilitator)',
  'compose-molecule.md': 'Iris (Empathizer)',
  'consolidate-patterns.md': 'Vega (Visionary)',
  'correct-course.md': 'Themis (Balancer)',
  'create-agent.md': 'Zeus (Commander)',
  'create-brownfield-story.md': 'Themis (Balancer)',
  'create-deep-research-prompt.md': 'Sirius (Decoder)',
  'create-doc.md': 'Janus (Strategist)',
  'create-next-story.md': 'Chronos (Facilitator)',
  'create-suite.md': 'Iris (Empathizer)',
  'create-task.md': 'Zeus (Commander)',
  'create-workflow.md': 'Zeus (Commander)',
  'deprecate-component.md': 'Vulcan (Builder)',
  'document-project.md': 'Janus (Strategist)',
  'execute-checklist.md': 'Argus (Guardian)',
  'export-design-tokens-dtcg.md': 'Iris (Empathizer)',
  'extend-pattern.md': 'Iris (Empathizer)',
  'extract-tokens.md': 'Iris (Empathizer)',
  'facilitate-brainstorming-session.md': 'Sirius (Decoder)',
  'generate-ai-frontend-prompt.md': 'Iris (Empathizer)',
  'generate-documentation.md': 'Janus (Strategist)',
  'generate-migration-strategy.md': 'Ceres (Sage)',
  'generate-shock-report.md': 'Sirius (Decoder)',
  'improve-self.md': 'Zeus (Commander)',
  'index-docs.md': 'Janus (Strategist)',
  'init-project-status.md': 'Chronos (Facilitator)',
  'integrate-expansion-pack.md': 'Vulcan (Builder)',
  'kb-mode-interaction.md': 'Zeus (Commander)',
  'learn-patterns.md': 'Iris (Empathizer)',
  'modify-agent.md': 'Zeus (Commander)',
  'modify-task.md': 'Zeus (Commander)',
  'modify-workflow.md': 'Zeus (Commander)',
  'pr-automation.md': 'Polaris (Automator)',
  'propose-modification.md': 'Sirius (Decoder)',
  'release-management.md': 'Polaris (Automator)',
  'security-audit.md': 'Argus (Guardian)',
  'security-scan.md': 'Argus (Guardian)',
  'setup-database.md': 'Ceres (Sage)',
  'setup-design-system.md': 'Iris (Empathizer)',
  'shard-doc.md': 'Janus (Strategist)',
  'sync-documentation.md': 'Janus (Strategist)',
  'tailwind-upgrade.md': 'Iris (Empathizer)',
  'test-as-user.md': 'Argus (Guardian)',
  'undo-last.md': 'Vulcan (Builder)',
  'update-manifest.md': 'Vulcan (Builder)',
  'validate-next-story.md': 'Argus (Guardian)',
};

// Utility: Determine agent for task based on filename
function determineAgent(filename) {
  // Check prefix-based mappings first
  for (const [prefix, agent] of Object.entries(AGENT_MAPPINGS)) {
    if (filename.startsWith(prefix)) {
      return agent;
    }
  }
  
  // Check generic task mappings
  if (GENERIC_TASK_MAPPINGS[filename]) {
    return GENERIC_TASK_MAPPINGS[filename];
  }
  
  // Default to Dev if no clear match
  return 'UNKNOWN - NEEDS MANUAL REVIEW';
}

// Main: Process single task file
function processTaskFile(filename) {
  const filePath = path.join(TASKS_DIR, filename);
  
  // Skip backup files
  if (filename.includes('backup') || filename.includes('.legacy')) {
    return { skipped: true, reason: 'backup/legacy file' };
  }
  
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if TODO exists
  if (!TODO_PATTERN.test(content)) {
    return { skipped: true, reason: 'no TODO placeholder found' };
  }
  
  // Determine agent
  const agent = determineAgent(filename);
  
  if (agent === 'UNKNOWN - NEEDS MANUAL REVIEW') {
    return { 
      needsReview: true, 
      filename,
      reason: 'No clear agent mapping found',
    };
  }
  
  // Replace TODO with actual agent
  const updatedContent = content.replace(
    TODO_PATTERN,
    `responsável: ${agent}`,
  );
  
  // Write updated content
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  return {
    processed: true,
    filename,
    agent,
  };
}

// Main: Process all task files
function main() {
  console.log('🚀 Agent Assignment Resolver\n');
  console.log(`📂 Processing tasks in: ${TASKS_DIR}\n`);
  
  // Get all .md files
  const files = fs.readdirSync(TASKS_DIR)
    .filter(f => f.endsWith('.md') && !f.includes('backup') && !f.includes('.legacy'))
    .sort();
  
  console.log(`📝 Found ${files.length} task files\n`);
  
  const results = {
    processed: [],
    skipped: [],
    needsReview: [],
    errors: [],
  };
  
  // Process each file
  files.forEach(filename => {
    try {
      const result = processTaskFile(filename);
      
      if (result.processed) {
        results.processed.push(result);
        console.log(`✅ ${result.filename} → ${result.agent}`);
      } else if (result.needsReview) {
        results.needsReview.push(result);
        console.log(`⚠️  ${result.filename} → NEEDS REVIEW`);
      } else if (result.skipped) {
        results.skipped.push({ filename, reason: result.reason });
      }
    } catch (error) {
      results.errors.push({ filename, error: error.message });
      console.error(`❌ ${filename}: ${error.message}`);
    }
  });
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Processed: ${results.processed.length}`);
  console.log(`   ⚠️  Needs Review: ${results.needsReview.length}`);
  console.log(`   ⏭️  Skipped: ${results.skipped.length}`);
  console.log(`   ❌ Errors: ${results.errors.length}`);
  console.log('='.repeat(60) + '\n');
  
  // Save report
  const reportPath = path.join(__dirname, '../../.ai/task-1.2-agent-assignment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`📄 Report saved: ${reportPath}\n`);
  
  return results;
}

// Execute if run directly
if (require.main === module) {
  try {
    const results = main();
    const exitCode = (results.errors.length > 0 || results.needsReview.length > 0) ? 1 : 0;
    process.exit(exitCode);
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

module.exports = { determineAgent, processTaskFile };

