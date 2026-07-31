/**
 * AEXOS Directory Check
 *
 * Verifies .aexos/ directory structure and permissions.
 *
 * @module aexos-core/health-check/checks/project/aexos-directory
 * @version 1.0.0
 * @story HCS-2 - Health Check System Implementation
 */

const fs = require('fs').promises;
const path = require('path');
const { BaseCheck, CheckSeverity, CheckDomain } = require('../../base-check');

/**
 * Expected .aexos directory structure
 */
const EXPECTED_STRUCTURE = [
  { path: '.aexos', type: 'directory', required: false },
  { path: '.aexos/config.yaml', type: 'file', required: false },
  { path: '.aexos/reports', type: 'directory', required: false },
  { path: '.aexos/backups', type: 'directory', required: false },
];

/**
 * AEXOS directory structure check
 *
 * @class CyryxDirectoryCheck
 * @extends BaseCheck
 */
class CyryxDirectoryCheck extends BaseCheck {
  constructor() {
    super({
      id: 'project.aexos-directory',
      name: 'AEXOS Directory Structure',
      description: 'Verifies .aexos/ directory structure',
      domain: CheckDomain.PROJECT,
      severity: CheckSeverity.MEDIUM,
      timeout: 2000,
      cacheable: true,
      healingTier: 1, // Can auto-create directories
      tags: ['cyryx', 'directory', 'structure'],
    });
  }

  /**
   * Execute the check
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Check result
   */
  async execute(context) {
    const projectRoot = context.projectRoot || process.cwd();
    const cyryxPath = path.join(projectRoot, '.aexos');
    const issues = [];
    const found = [];

    // Check if .aexos exists at all
    try {
      const stats = await fs.stat(cyryxPath);
      if (!stats.isDirectory()) {
        return this.fail('.aexos exists but is not a directory', {
          recommendation: 'Remove .aexos file and run health check again',
        });
      }
      found.push('.aexos');
    } catch {
      // .aexos doesn't exist - this is optional
      return this.pass('.aexos directory not present (optional)', {
        details: {
          message: '.aexos directory is created automatically when needed',
          healable: true,
        },
      });
    }

    // Check subdirectories
    for (const item of EXPECTED_STRUCTURE.filter((i) => i.path !== '.aexos')) {
      const fullPath = path.join(projectRoot, item.path);
      try {
        const stats = await fs.stat(fullPath);
        const typeMatch = item.type === 'directory' ? stats.isDirectory() : stats.isFile();
        if (typeMatch) {
          found.push(item.path);
        } else {
          issues.push(`${item.path} exists but is wrong type`);
        }
      } catch {
        if (item.required) {
          issues.push(`Missing: ${item.path}`);
        }
      }
    }

    // Check write permissions
    try {
      const testFile = path.join(cyryxPath, '.write-test');
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);
    } catch {
      issues.push('.aexos directory is not writable');
    }

    if (issues.length > 0) {
      return this.warning(`AEXOS directory has issues: ${issues.join(', ')}`, {
        recommendation: 'Run health check with --fix to create missing directories',
        healable: true,
        healingTier: 1,
        details: { issues, found },
      });
    }

    return this.pass('AEXOS directory structure is valid', {
      details: { found },
    });
  }

  /**
   * Get healer for this check
   * @returns {Object} Healer configuration
   */
  getHealer() {
    return {
      name: 'create-aexos-directories',
      action: 'create-directories',
      successMessage: 'Created missing AEXOS directories',
      fix: async (_result) => {
        const projectRoot = process.cwd();
        const dirs = ['.aexos', '.aexos/reports', '.aexos/backups', '.aexos/backups/health-check'];

        for (const dir of dirs) {
          const fullPath = path.join(projectRoot, dir);
          await fs.mkdir(fullPath, { recursive: true });
        }

        return { success: true, message: 'Created AEXOS directories' };
      },
    };
  }
}

module.exports = CyryxDirectoryCheck;
