// Mock external dependencies
jest.mock('../lib/logger');
jest.mock('../lib/project');

// Import the modules we want to test
const projectDetector = require('../lib/project');

describe('Lookup Command', () => {
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

  describe('lookupCommand execution', () => {
    test('should lookup library successfully', async () => {
      const { lookupCommand } = require('../commands/lookup');

      await lookupCommand('express', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📚 Library Lookup')
      );
      expect(consoleSpy).toHaveBeenCalledWith('Library:', 'express');
      // Check that some library content was logged
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Fast, unopinionated')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Library lookup complete')
      );
    });

    test('should handle non-CodeMaestro project with warning', async () => {
      const { lookupCommand } = require('../commands/lookup');

      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      await lookupCommand('lodash', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Not in a CodeMaestro project')
      );
    });

    test('should allow global lookup outside projects', async () => {
      const { lookupCommand } = require('../commands/lookup');

      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      await lookupCommand('lodash', { global: true });

      // Should not show the warning when global flag is used
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Not in a CodeMaestro project')
      );
    });

    test('should respect brief option', async () => {
      const { lookupCommand } = require('../commands/lookup');

      await lookupCommand('react', { brief: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Library lookup complete')
      );
      // Brief mode should not show usage guidance or detailed info
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('💡 Lookup Commands:')
      );
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('Basic Usage:')
      );
    });

    test('should handle library not found error', async () => {
      const { lookupCommand } = require('../commands/lookup');

      // Mock process.exit to avoid actual exit
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await lookupCommand('nonexistent', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Library lookup failed')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('not found')
      );

      mockExit.mockRestore();
    });
  });

  describe('Mock Context7 Lookup', () => {
    test('should return library information for known libraries', async () => {
      const context7 = new (require('../commands/lookup').MockContext7Lookup)();

      const library = await context7.lookupLibrary('express');

      expect(library).toHaveProperty('name', 'Express.js');
      expect(library).toHaveProperty('version', '4.18.2');
      expect(library).toHaveProperty('installation', 'npm install express');
      expect(library).toHaveProperty('basicUsage');
      expect(library).toHaveProperty('bestPractices');
      expect(library.relatedLibraries).toContain('cors');
    });

    test('should handle case-insensitive lookup', async () => {
      const context7 = new (require('../commands/lookup').MockContext7Lookup)();

      const library = await context7.lookupLibrary('EXPRESS');

      expect(library).toHaveProperty('name', 'Express.js');
    });

    test('should throw error for unknown libraries', async () => {
      const context7 = new (require('../commands/lookup').MockContext7Lookup)();

      await expect(context7.lookupLibrary('unknownlib123')).rejects.toThrow('not found');
    });
  });

  describe('Library information display', () => {
    test('should display comprehensive library information', async () => {
      const { lookupCommand } = require('../commands/lookup');

      await lookupCommand('lodash', {});

      // Check that library description is shown
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('utility library')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('npm install lodash')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Related Libraries:')
      );
      // Check that some related library is mentioned
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('underscore')
      );
    });

    test('should show package statistics', async () => {
      const { lookupCommand } = require('../commands/lookup');

      await lookupCommand('react', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Downloads: 18M/month')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Stars: 215,000')
      );
    });

    test('should display code examples in brief mode', async () => {
      const { lookupCommand } = require('../commands/lookup');

      await lookupCommand('express', { brief: true });

      // Brief mode should still show essential info
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📦 Package Info:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🔧 Installation:')
      );
    });
  });

  describe('Error handling', () => {
    test('should provide helpful suggestions for unknown libraries', async () => {
      const { lookupCommand } = require('../commands/lookup');

      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await lookupCommand('xyz123', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Try popular libraries: express, react, lodash')
      );

      mockExit.mockRestore();
    });
  });
});