'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const {
  resolveSignatureRequirement,
} = require('../../.aexos-core/cli/commands/validate/index');

describe('validate signature mode', () => {
  let testDir;
  let cyryxCoreDir;
  let sourceDir;

  beforeEach(async () => {
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'aexos-validate-signature-'));
    cyryxCoreDir = path.join(testDir, 'project', '.aexos-core');
    sourceDir = path.join(testDir, 'source');
    await fs.ensureDir(cyryxCoreDir);
    await fs.ensureDir(path.join(sourceDir, '.aexos-core'));
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  test('does not require signature when public package lacks minisig', () => {
    expect(
      resolveSignatureRequirement({
        options: {},
        cyryxCoreDir,
        sourceDir,
        env: {},
      }),
    ).toBe(false);
  });

  test('requires signature when strict flag is set', () => {
    expect(
      resolveSignatureRequirement({
        options: { requireSignature: true },
        cyryxCoreDir,
        sourceDir,
        env: {},
      }),
    ).toBe(true);
  });

  test('requires signature when strict env is set', () => {
    expect(
      resolveSignatureRequirement({
        options: {},
        cyryxCoreDir,
        sourceDir,
        env: { AEXOS_REQUIRE_SIGNATURE: 'true' },
      }),
    ).toBe(true);
  });

  test('no-signature flag overrides strict env and local signature', async () => {
    await fs.writeFile(path.join(cyryxCoreDir, 'install-manifest.yaml.minisig'), 'signature');

    expect(
      resolveSignatureRequirement({
        options: { signature: false },
        cyryxCoreDir,
        sourceDir,
        env: { AEXOS_REQUIRE_SIGNATURE: '1' },
      }),
    ).toBe(false);
  });

  test('requires signature automatically when target minisig exists', async () => {
    await fs.writeFile(path.join(cyryxCoreDir, 'install-manifest.yaml.minisig'), 'signature');

    expect(
      resolveSignatureRequirement({
        options: {},
        cyryxCoreDir,
        sourceDir,
        env: {},
      }),
    ).toBe(true);
  });

  test('requires signature automatically when source minisig exists', async () => {
    await fs.writeFile(
      path.join(sourceDir, '.aexos-core', 'install-manifest.yaml.minisig'),
      'signature',
    );

    expect(
      resolveSignatureRequirement({
        options: {},
        cyryxCoreDir,
        sourceDir,
        env: {},
      }),
    ).toBe(true);
  });
});
