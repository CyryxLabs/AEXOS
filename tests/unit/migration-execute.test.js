/**
 * Migration Execute Module Tests
 *
 * @story 2.14 - Migration Script v2.0 → v2.1
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const {
  createModuleDirectories,
  migrateModule,
  executeMigration,
  saveMigrationState,
  loadMigrationState,
  clearMigrationState,
} = require('../../.aexos-core/cli/commands/migrate/execute');
const { analyzeMigrationPlan } = require('../../.aexos-core/cli/commands/migrate/analyze');

describe('Migration Execute Module', () => {
  let testDir;

  beforeEach(async () => {
    testDir = path.join(os.tmpdir(), `aexos-execute-test-${Date.now()}`);
    await fs.promises.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    if (testDir && fs.existsSync(testDir)) {
      await fs.promises.rm(testDir, { recursive: true, force: true });
    }
  });

  describe('createModuleDirectories', () => {
    it('should create all four module directories', async () => {
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(cyryxCoreDir, { recursive: true });

      const result = await createModuleDirectories(cyryxCoreDir);

      expect(fs.existsSync(path.join(cyryxCoreDir, 'core'))).toBe(true);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'development'))).toBe(true);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'product'))).toBe(true);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'infrastructure'))).toBe(true);
      expect(result.modules).toContain('core');
    });

    it('should not fail if directories already exist', async () => {
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'core'), { recursive: true });

      const result = await createModuleDirectories(cyryxCoreDir);

      expect(result.created).not.toContain(path.join(cyryxCoreDir, 'core'));
    });
  });

  describe('migrateModule', () => {
    it('should migrate files to module directory', async () => {
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'agents'), { recursive: true });
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'development'), { recursive: true });
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'agents', 'dev.md'), 'Agent');

      const moduleData = {
        files: [{
          sourcePath: path.join(cyryxCoreDir, 'agents', 'dev.md'),
          relativePath: path.join('agents', 'dev.md'),
          size: 5,
        }],
      };

      const result = await migrateModule(moduleData, 'development', cyryxCoreDir);

      expect(result.migratedFiles).toHaveLength(1);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'development', 'agents', 'dev.md'))).toBe(true);
    });

    it('should support dry run mode', async () => {
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'agents'), { recursive: true });
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'development'), { recursive: true });
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'agents', 'dev.md'), 'Agent');

      const moduleData = {
        files: [{
          sourcePath: path.join(cyryxCoreDir, 'agents', 'dev.md'),
          relativePath: path.join('agents', 'dev.md'),
          size: 5,
        }],
      };

      const result = await migrateModule(moduleData, 'development', cyryxCoreDir, { dryRun: true });

      expect(result.migratedFiles).toHaveLength(1);
      expect(result.migratedFiles[0].dryRun).toBe(true);
      // File should NOT be copied in dry run
      expect(fs.existsSync(path.join(cyryxCoreDir, 'development', 'agents', 'dev.md'))).toBe(false);
    });
  });

  describe('executeMigration', () => {
    it('should execute full migration', async () => {
      // Create v2.0 structure
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'agents'), { recursive: true });
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'registry'), { recursive: true });
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'cli'), { recursive: true });
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'agents', 'dev.md'), 'Agent');
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'registry', 'index.js'), 'Registry');
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'cli', 'index.js'), 'CLI');

      const plan = await analyzeMigrationPlan(testDir);
      const result = await executeMigration(plan, { cleanupOriginals: false });

      expect(result.success).toBe(true);
      expect(result.totalFiles).toBe(3);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'development', 'agents', 'dev.md'))).toBe(true);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'core', 'registry', 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(cyryxCoreDir, 'product', 'cli', 'index.js'))).toBe(true);
    });

    it('should return error for non-migratable plan', async () => {
      const plan = { canMigrate: false, error: 'Test error' };
      const result = await executeMigration(plan);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
    });

    it('should support dry run', async () => {
      const cyryxCoreDir = path.join(testDir, '.aexos-core');
      await fs.promises.mkdir(path.join(cyryxCoreDir, 'agents'), { recursive: true });
      await fs.promises.writeFile(path.join(cyryxCoreDir, 'agents', 'dev.md'), 'Agent');

      const plan = await analyzeMigrationPlan(testDir);
      const result = await executeMigration(plan, { dryRun: true });

      expect(result.dryRun).toBe(true);
      // Directories should not be created in dry run
      expect(fs.existsSync(path.join(cyryxCoreDir, 'development'))).toBe(false);
    });
  });

  describe('Migration State', () => {
    it('should save and load migration state', async () => {
      await saveMigrationState(testDir, { phase: 'test', value: 123 });

      const state = await loadMigrationState(testDir);

      expect(state.phase).toBe('test');
      expect(state.value).toBe(123);
      expect(state.timestamp).toBeTruthy();
    });

    it('should return null if no state exists', async () => {
      const state = await loadMigrationState(testDir);
      expect(state).toBeNull();
    });

    it('should clear migration state', async () => {
      await saveMigrationState(testDir, { phase: 'test' });
      await clearMigrationState(testDir);

      const state = await loadMigrationState(testDir);
      expect(state).toBeNull();
    });
  });
});
