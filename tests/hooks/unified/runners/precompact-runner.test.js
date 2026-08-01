/**
 * PreCompact Hook Runner Tests
 * Story MIS-3: Session Digest (PreCompact Hook)
 */

const { onPreCompact, getHookConfig } = require('../../../../.aexos-core/hooks/unified/runners/precompact-runner');
const proDetector = require('../../../../bin/utils/pro-detector');

// Mock pro-detector
jest.mock('../../../../bin/utils/pro-detector');

describe('PreCompact Hook Runner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  describe('onPreCompact', () => {
    it('should return immediately without blocking', async () => {
      proDetector.isProAvailable.mockReturnValue(false);

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
        conversation: { messages: [] },
      };

      const startTime = Date.now();
      await onPreCompact(context);
      const duration = Date.now() - startTime;

      // Was 10ms, which this measured at 29ms under full-suite parallel load.
      // What the test is really asserting is fire-and-forget — that onPreCompact
      // does not await the compaction work — and 500ms proves that just as well
      // while surviving a contended scheduler. A blocking implementation would
      // take seconds, not tens of milliseconds.
      expect(duration).toBeLessThan(500);
    });

    it('should gracefully no-op when aexos-pro not available', async () => {
      proDetector.isProAvailable.mockReturnValue(false);

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
      };

      await onPreCompact(context);

      expect(console.log).toHaveBeenCalledWith(
        '[PreCompact] aexos-pro not available, skipping session digest',
      );
    });

    it('should attempt to load pro module when available', async () => {
      proDetector.isProAvailable.mockReturnValue(true);
      proDetector.loadProModule.mockReturnValue(null); // Module not found

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
      };

      await onPreCompact(context);

      // Wait for setImmediate to execute
      await new Promise(resolve => setImmediate(resolve));
      await new Promise(resolve => setTimeout(resolve, 10));

      // Should attempt to load the digest extractor
      expect(proDetector.loadProModule).toHaveBeenCalledWith(
        'memory/session-digest/extractor.js',
      );
    });

    it('should handle missing extractor function gracefully', async () => {
      proDetector.isProAvailable.mockReturnValue(true);
      proDetector.loadProModule.mockReturnValue({}); // Empty module

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
      };

      await onPreCompact(context);

      // Wait for setImmediate to execute
      await new Promise(resolve => setImmediate(resolve));
      await new Promise(resolve => setTimeout(resolve, 10));

      // Should not throw, but log error asynchronously
      expect(proDetector.loadProModule).toHaveBeenCalled();
    });

    it('should call extractSessionDigest when pro available', async () => {
      const mockExtractSessionDigest = jest.fn().mockResolvedValue('/path/to/digest.yaml');

      proDetector.isProAvailable.mockReturnValue(true);
      proDetector.loadProModule.mockReturnValue({
        extractSessionDigest: mockExtractSessionDigest,
      });

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
        conversation: { messages: [] },
      };

      await onPreCompact(context);

      // Give setImmediate time to execute
      await new Promise(resolve => setImmediate(resolve));
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(mockExtractSessionDigest).toHaveBeenCalledWith(context);
    });

    it('should handle extractor errors silently', async () => {
      const mockExtractSessionDigest = jest.fn().mockRejectedValue(new Error('Test error'));

      proDetector.isProAvailable.mockReturnValue(true);
      proDetector.loadProModule.mockReturnValue({
        extractSessionDigest: mockExtractSessionDigest,
      });

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
      };

      // Should not throw
      await expect(onPreCompact(context)).resolves.toBeUndefined();

      // Give setImmediate time to execute
      await new Promise(resolve => setImmediate(resolve));
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(mockExtractSessionDigest).toHaveBeenCalled();
    });

    it('should handle outer errors gracefully (never throw)', async () => {
      proDetector.isProAvailable.mockImplementation(() => {
        throw new Error('Detection failed');
      });

      const context = {
        sessionId: 'test-session-123',
        projectDir: '/test/project',
      };

      // Should not throw
      await expect(onPreCompact(context)).resolves.toBeUndefined();

      expect(console.error).toHaveBeenCalledWith(
        '[PreCompact] Hook runner error:',
        'Detection failed',
      );
    });
  });

  describe('getHookConfig', () => {
    it('should return valid hook configuration', () => {
      const config = getHookConfig();

      expect(config).toMatchObject({
        name: 'precompact-session-digest',
        event: 'PreCompact',
        handler: expect.any(Function),
        timeout: 5000,
        description: expect.stringContaining('MIS-3'),
      });
    });

    it('should have timeout less than 5 seconds', () => {
      const config = getHookConfig();

      expect(config.timeout).toBeLessThanOrEqual(5000);
    });

    it('should have handler that matches onPreCompact', () => {
      const config = getHookConfig();

      expect(config.handler).toBe(onPreCompact);
    });
  });
});
