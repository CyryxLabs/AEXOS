/**
 * STORY-1.1: CLI Entry Point Unit Tests
 * Tests for bin/aexos.js command routing and version checking
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

describe('CLI Entry Point', () => {
  const cliPath = path.join(__dirname, '../../bin/aexos.js');

  describe('Node.js Version Check', () => {
    it('should have engines field in package.json requiring Node 18+', () => {
      // Version check is now enforced via package.json engines field
      const packageJsonPath = path.join(__dirname, '../../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      expect(packageJson.engines).toBeDefined();
      expect(packageJson.engines.node).toMatch(/>=\s*18/);
    });

    it('should have proper module structure', () => {
      const cliPath = path.join(__dirname, '../../bin/aexos.js');
      const cliContent = fs.readFileSync(cliPath, 'utf8');

      // Verify CLI has proper structure
      expect(cliContent).toContain("require('path')");
      expect(cliContent).toContain("require('fs')");
      expect(cliContent).toContain('process.argv');
    });
  });

  describe('Command Routing', () => {
    it('should handle --version flag', (done) => {
      const child = spawn('node', [cliPath, '--version']);
      let output = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toMatch(/\d+\.\d+\.\d+/);
        done();
      });
    });

    it('should handle --help flag', (done) => {
      const child = spawn('node', [cliPath, '--help']);
      let output = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toContain('USAGE');
        expect(output).toContain('npx github:CyryxLabs/AEXOS');
        done();
      });
    });

    it('should handle info command', (done) => {
      const child = spawn('node', [cliPath, 'info']);
      let output = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toContain('System Information');
        done();
      });
    });

    it('should handle doctor command', (done) => {
      const child = spawn('node', [cliPath, 'doctor']);
      let output = '';
      let errors = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errors += data.toString();
      });

      child.on('close', (code) => {
        // Doctor may exit with 0 or 1 depending on system state
        const combined = output + errors;
        expect(combined).toContain('AEXOS Doctor');
        done();
      });
      // 15s, matching the other spawn tests in this file. This one relied on
      // the 10s default and exceeded it under full-suite parallel load: doctor
      // spawns a node process that scans the project, and that is slow when a
      // dozen workers are already running.
    }, 15000);

    it('should load packaged worker registry outside a project cwd', async () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aexos-cli-registry-'));
      try {
        const { code, output, errors } = await new Promise((resolve) => {
          const child = spawn('node', [cliPath, 'workers', 'list', '--count'], {
            cwd: tempDir,
            env: process.env,
          });
          let output = '';
          let errors = '';

          child.stdout.on('data', (data) => {
            output += data.toString();
          });

          child.stderr.on('data', (data) => {
            errors += data.toString();
          });

          child.on('close', (code) => {
            resolve({ code, output, errors });
          });
        });

        expect({ code, errors }).toEqual({
          code: 0,
          errors: expect.not.stringMatching(/\b(?:Error|ERROR)\b/),
        });
        expect(output).toContain('Total:');
        expect(output).toContain('workers');
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }, 15000);

    it('should error on unknown command', (done) => {
      const child = spawn('node', [cliPath, 'unknown-command']);
      let errors = '';

      child.stderr.on('data', (data) => {
        errors += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(1);
        expect(errors).toContain('Unknown command');
        expect(errors).toContain('unknown-command');
        done();
      });
    });
  });

  describe('Shebang', () => {
    it('should have proper shebang for cross-platform compatibility', () => {
      const cliPath = path.join(__dirname, '../../bin/aexos.js');
      const cliContent = fs.readFileSync(cliPath, 'utf8');
      
      expect(cliContent.startsWith('#!/usr/bin/env node')).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should show usage info when unknown command provided', (done) => {
      const child = spawn('node', [cliPath, 'invalid']);
      let errors = '';
      let output = '';

      child.stderr.on('data', (data) => {
        errors += data.toString();
      });

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(1);
        const combined = errors + output;
        expect(combined).toContain('Unknown command');
        expect(combined).toContain('--help');
        done();
      });
    }, 15000); // Increase timeout to 15s
  });
});
