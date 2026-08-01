/**
 * Greeting Preference Configuration Manager
 *
 * Manages user preferences for agent greeting personification levels.
 * Integrates with GreetingBuilder (Story 6.1.2.5).
 *
 * Story ACT-2: Now accounts for user_profile — bob mode forces minimal/named.
 *
 * Performance: Preference check <5ms (called on every agent activation)
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const lockfile = require('proper-lockfile');

// Reused rather than reimplemented: write-to-tmp + rename, already the
// repository's persistence primitive (session-manager, context-detector and
// unified-activation-pipeline — the latter in this very directory).
const { atomicWriteSync } = require('../../core/synapse/utils/atomic-write');

const CONFIG_PATH = path.join(process.cwd(), '.aexos-core', 'core-config.yaml');
const BACKUP_PATH = path.join(process.cwd(), '.aexos-core', 'core-config.yaml.backup');
const LOCK_PATH = path.join(process.cwd(), '.aexos-core', 'core-config.yaml.lock');
const VALID_PREFERENCES = ['auto', 'minimal', 'named', 'archetypal'];

// Mirrors the values used by core/ids/registry-updater.js, the other
// proper-lockfile consumer in this repository.
const LOCK_STALE_MS = 10000;
const LOCK_RETRY_COUNT = 3;
const LOCK_RETRY_DELAY_MS = 100;
const LOCK_TIMEOUT_MS = 5000;

// Bob mode restricts greeting to simpler levels (Story ACT-2)
const BOB_MODE_ALLOWED_PREFERENCES = ['minimal', 'named'];
const BOB_MODE_DEFAULT_PREFERENCE = 'named';

class GreetingPreferenceManager {
  /**
   * Get current greeting preference, accounting for user_profile restrictions.
   *
   * Story ACT-2 - AC1: When user_profile === 'bob', forces preference to
   * 'minimal' or 'named' regardless of what is configured. If the configured
   * preference is 'auto' or 'archetypal', it falls back to BOB_MODE_DEFAULT_PREFERENCE.
   *
   * @param {string} [userProfile] - Optional user_profile override. If not provided, reads from config.
   * @returns {string} Current preference (auto|minimal|named|archetypal)
   */
  getPreference(userProfile) {
    try {
      const config = this._loadConfig();
      const rawPreference = config?.agentIdentity?.greeting?.preference || 'auto';

      // Story ACT-2: If bob mode, restrict preference to minimal/named
      const effectiveProfile = userProfile || config?.user_profile;
      if (effectiveProfile === 'bob') {
        if (BOB_MODE_ALLOWED_PREFERENCES.includes(rawPreference)) {
          return rawPreference;
        }
        // Override non-allowed preferences (auto, archetypal) to bob default
        return BOB_MODE_DEFAULT_PREFERENCE;
      }

      return rawPreference;
    } catch (error) {
      console.warn('[GreetingPreference] Failed to load, using default:', error.message);
      return 'auto';
    }
  }

  /**
   * Set greeting preference
   * @param {string} preference - New preference (auto|minimal|named|archetypal)
   * @throws {Error} If preference is invalid
   */
  setPreference(preference) {
    // Validate preference
    if (!VALID_PREFERENCES.includes(preference)) {
      const validOptions = VALID_PREFERENCES.join(', ');
      throw new Error(
        `Invalid preference: "${preference}". ` +
        `Valid options: ${validOptions}. ` +
        'Examples: "auto" (session-aware), "minimal" (always minimal), "named" (always named), "archetypal" (always archetypal)',
      );
    }

    // The whole read-modify-write runs under an advisory lock. Without it two
    // concurrent agent activations can interleave: writer A truncates
    // core-config.yaml while writer B snapshots it into the backup, and B's
    // error path then restores that truncated snapshot over the real config.
    // That is how the file was once reduced to six lines of garbage.
    let release;
    try {
      release = this._acquireLock();

      // Backup existing config before modification
      this._backupConfig();

      const config = this._loadConfig();

      // Ensure structure exists
      if (!config.agentIdentity) config.agentIdentity = {};
      if (!config.agentIdentity.greeting) config.agentIdentity.greeting = {};

      // Set preference
      config.agentIdentity.greeting.preference = preference;

      // Validate YAML before write
      const yamlContent = yaml.dump(config, { lineWidth: -1 });
      try {
        yaml.load(yamlContent); // Validate syntax
      } catch (yamlError) {
        this._restoreBackup();
        throw new Error(`Invalid YAML generated: ${yamlError.message}`);
      }

      // Write back
      this._saveConfig(config);

      return { success: true, preference };
    } catch (error) {
      // Restore backup on error
      this._restoreBackup();
      throw new Error(`Failed to set preference: ${error.message}`);
    } finally {
      if (release) {
        try {
          release();
        } catch (_releaseError) {
          // Lock already released or expired as stale — nothing to undo.
        }
      }
    }
  }

  /**
   * Get all greeting configuration
   * @returns {Object} Complete greeting config
   */
  getConfig() {
    try {
      const config = this._loadConfig();
      return config?.agentIdentity?.greeting || {};
    } catch (error) {
      console.warn('[GreetingPreference] Failed to load config, returning empty:', error.message);
      return {};
    }
  }

  /**
   * Acquire the advisory write lock on core-config.yaml.
   *
   * Synchronous on purpose: setPreference() is a synchronous public API and
   * making it async would break greeting-config-cli.js and every other caller.
   *
   * @returns {Function|null} Release function, or null if locking is
   *   unavailable in this environment (see below)
   * @private
   */
  _acquireLock() {
    let lastError;

    // proper-lockfile rejects its own `retries` option on the sync API
    // ("Cannot use retries with the sync api"), so the retry loop is ours.
    for (let attempt = 0; attempt <= LOCK_RETRY_COUNT; attempt++) {
      try {
        return lockfile.lockSync(CONFIG_PATH, {
          stale: LOCK_STALE_MS,
          lockfilePath: LOCK_PATH,
          realpath: false,
        });
      } catch (error) {
        lastError = error;
        if (attempt < LOCK_RETRY_COUNT) {
          this._sleepSync(Math.min(LOCK_RETRY_DELAY_MS * 2 ** attempt, LOCK_TIMEOUT_MS));
        }
      }
    }

    // Degrade to lock-free: the write is still atomic (tmp + rename), so the
    // worst case is a lost update, never a truncated config. Failing hard here
    // would make *set-greeting-preference unusable whenever a stale lock or a
    // read-only directory is present — a worse outcome than the race it guards.
    console.warn(
      '[GreetingPreference] Could not acquire config lock, writing unlocked:',
      lastError && lastError.message,
    );
    return null;
  }

  /**
   * Block the current thread for `ms`.
   *
   * Used only between lock attempts on the synchronous write path; the read
   * path (getPreference) never reaches this code.
   *
   * @param {number} ms - Milliseconds to sleep
   * @private
   */
  _sleepSync(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  }

  /**
   * Backup config file before modification
   * @private
   */
  _backupConfig() {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        fs.copyFileSync(CONFIG_PATH, BACKUP_PATH);
      }
    } catch (error) {
      console.warn('[GreetingPreference] Failed to backup config:', error.message);
    }
  }

  /**
   * Restore config from backup
   * @private
   */
  _restoreBackup() {
    try {
      if (fs.existsSync(BACKUP_PATH)) {
        fs.copyFileSync(BACKUP_PATH, CONFIG_PATH);
        console.log('[GreetingPreference] Config restored from backup');
      }
    } catch (error) {
      console.error('[GreetingPreference] Failed to restore backup:', error.message);
    }
  }

  /**
   * Load config from YAML
   * @private
   */
  _loadConfig() {
    const content = fs.readFileSync(CONFIG_PATH, 'utf8');
    return yaml.load(content);
  }

  /**
   * Save config to YAML.
   *
   * Uses atomicWriteSync (tmp + rename) rather than fs.writeFileSync: a plain
   * writeFileSync truncates the target before writing it, so any interruption
   * — a killed process, a concurrent activation — leaves core-config.yaml
   * permanently truncated. With tmp + rename the original file is intact until
   * the replacement is complete on disk.
   *
   * @private
   */
  _saveConfig(config) {
    const content = yaml.dump(config, { lineWidth: -1 });
    atomicWriteSync(CONFIG_PATH, content, 'utf8');
  }
}

module.exports = GreetingPreferenceManager;

