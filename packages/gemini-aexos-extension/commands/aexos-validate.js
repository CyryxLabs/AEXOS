#!/usr/bin/env node
/**
 * AEXOS Validate Command - Validate installation and skills
 */

const path = require('path');

async function main() {
  const projectDir = process.cwd();

  console.log('🔍 AEXOS Validation\n');

  try {
    const validatorPath = path.join(
      projectDir,
      '.aexos-core',
      'development',
      'scripts',
      'skill-validator.js',
    );

    const { SkillValidator } = require(validatorPath);
    const validator = new SkillValidator();
    const results = await validator.validateAll();

    console.log(validator.generateReport(results));
  } catch (error) {
    console.log('❌ Validation failed:', error.message);
    console.log('\nMake sure AEXOS is installed: npx aexos-core install');
  }
}

main();
