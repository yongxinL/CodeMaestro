// Mock external dependencies
jest.mock('../lib/logger');
jest.mock('../lib/project');

// Import the modules we want to test
const projectDetector = require('../lib/project');

describe('Research Command', () => {
  let consoleSpy;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    projectDetector.isCodeMaestroProject.mockResolvedValue(true);
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('researchCommand execution', () => {
    test('should execute research successfully', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test query', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🔍 CodeMaestro Research')
      );
      expect(consoleSpy).toHaveBeenCalledWith('Query:', 'test query');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Research complete')
      );
    });

    test('should handle non-CodeMaestro project with warning', async () => {
      const { researchCommand } = require('../commands/research');

      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      await researchCommand('test query', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Not in a CodeMaestro project')
      );
    });

    test('should allow global research outside projects', async () => {
      const { researchCommand } = require('../commands/research');

      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      await researchCommand('test query', { global: true });

      // Should not show the warning when global flag is used
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Not in a CodeMaestro project')
      );
    });

    test('should respect brief option', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test query', { brief: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Research complete')
      );
      // Brief mode should not show usage guidance
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('💡 Research Commands:')
      );
    });

    test('should handle limit option', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test query', { limit: 10 });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Research complete')
      );
    });

    test('should handle errors gracefully', async () => {
      const { researchCommand } = require('../commands/research');

      // Mock project detector to reject
      projectDetector.isCodeMaestroProject.mockRejectedValue(new Error('Test error'));

      // Mock process.exit to avoid actual exit
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await researchCommand('test query', { global: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Research failed')
      );

      mockExit.mockRestore();
    });
  });

  describe('Mock MCP tools', () => {
    test('MockContext7 should return library results', async () => {
      const context7 = new (require('../commands/research').MockContext7)();

      const results = await context7.query('express');

      expect(results).toHaveProperty('libraries');
      expect(results.libraries).toHaveLength(1);
      expect(results.libraries[0]).toHaveProperty('name', 'Express.js');
      expect(results.libraries[0]).toHaveProperty('version', '4.18.2');
    });

    test('MockWebSearch should return search results', async () => {
      const webSearch = new (require('../commands/research').MockWebSearch)();

      const results = await webSearch.search('nodejs');

      expect(results).toHaveLength(3);
      expect(results[0]).toHaveProperty('title');
      expect(results[0]).toHaveProperty('url');
      expect(results[0]).toHaveProperty('relevance');
    });
  });

  describe('Result formatting', () => {
    test('should format web search results correctly', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test', {});

      // Check that web results are formatted with numbers and URLs
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('1. Node.js Best Practices Guide')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('https://nodejs.org/en/docs/guides/')
      );
    });

    test('should format library results correctly', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('1. Express.js v4.18.2')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('https://expressjs.com/')
      );
    });

    test('should show relevance scores', async () => {
      const { researchCommand } = require('../commands/research');

      await researchCommand('test', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Relevance: 92%')
      );
    });
  });
});