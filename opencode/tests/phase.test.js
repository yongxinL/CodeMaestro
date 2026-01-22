const fs = require('fs-extra');

// Mock external dependencies
jest.mock('../lib/config');
jest.mock('../lib/logger');
jest.mock('../lib/project');
jest.mock('fs-extra');

// Import the modules we want to test
const config = require('../lib/config');
const projectDetector = require('../lib/project');

describe('Phase Command', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    config.load.mockResolvedValue({
      paths: {
        recovery_checkpoint: '/mock/project/docs/implementation/.recovery-checkpoint.md'
      }
    });

    projectDetector.isCodeMaestroProject.mockResolvedValue(true);
    projectDetector.getCurrentPhase.mockResolvedValue({ phase: 1 });

    fs.ensureDir.mockResolvedValue();
    fs.writeFile.mockResolvedValue();
  });

  describe('getPhaseTask function', () => {
    // Import the function directly for testing
    const { getPhaseTask } = require('../commands/phase');

    test('should return correct phase 1 information', () => {
      const result = getPhaseTask(1);

      expect(result.name).toBe('Requirements');
      expect(result.role).toBe('Product Manager');
      expect(result.firstTask).toBe('Analyze project requirements and create specification document');
      expect(result.description).toBe('Product Manager - Define specifications');
    });

    test('should return correct phase 5 information', () => {
      const result = getPhaseTask(5);

      expect(result.name).toBe('Release');
      expect(result.role).toBe('Release Manager');
      expect(result.firstTask).toBe('Coordinate final release preparation');
      expect(result.description).toBe('Release Manager - Deploy and release');
    });

    test('should return undefined for invalid phase', () => {
      const result = getPhaseTask(99);
      expect(result).toBeUndefined();
    });
  });

  describe('validatePhaseNumber function', () => {
    // Import the function directly for testing
    const { validatePhaseNumber } = require('../commands/phase');

    test('should accept valid phase numbers', () => {
      expect(validatePhaseNumber('1')).toBe(1);
      expect(validatePhaseNumber('3')).toBe(3);
      expect(validatePhaseNumber('5')).toBe(5);
    });

    test('should reject invalid phase numbers', () => {
      expect(() => validatePhaseNumber('0')).toThrow('Phase number must be between 1 and 5');
      expect(() => validatePhaseNumber('6')).toThrow('Phase number must be between 1 and 5');
      expect(() => validatePhaseNumber('abc')).toThrow('Invalid phase number');
    });
  });

  describe('updatePhaseCheckpoint', () => {
    test('should create checkpoint file with correct content', async () => {
      const { updatePhaseCheckpoint } = require('../commands/phase');

      const checkpointPath = await updatePhaseCheckpoint(2);

      expect(fs.ensureDir).toHaveBeenCalledWith('/mock/project/docs/implementation');
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/implementation/.recovery-checkpoint.md',
        expect.stringContaining('# CodeMaestro Recovery Checkpoint')
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/implementation/.recovery-checkpoint.md',
        expect.stringContaining('**Phase:** 2')
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/implementation/.recovery-checkpoint.md',
        expect.stringContaining('**Role:** Software Architect')
      );
      expect(checkpointPath).toBe('/mock/project/docs/implementation/.recovery-checkpoint.md');
    });
  });

  describe('Phase command execution', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should handle non-CodeMaestro project', async () => {
      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      // Mock process.exit to avoid actually exiting
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await require('../commands/phase').phaseCommand('2');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('To initialize a CodeMaestro project')
      );

      mockExit.mockRestore();
    });

    test('should reject invalid phase numbers', async () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await require('../commands/phase').phaseCommand('99');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Error: Phase number must be between 1 and 5')
      );

      mockExit.mockRestore();
    });

    test('should warn when jumping to same phase', async () => {
      projectDetector.getCurrentPhase.mockResolvedValue({ phase: 2 });

      await require('../commands/phase').phaseCommand('2');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Already in Phase 2')
      );
    });

    test('should successfully navigate to different phase', async () => {
      projectDetector.getCurrentPhase.mockResolvedValue({ phase: 1 });

      await require('../commands/phase').phaseCommand('3');

      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🎯 CodeMaestro Phase Navigation')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Successfully switched to Phase 3')
      );
    });

    test('should handle starting fresh project', async () => {
      projectDetector.getCurrentPhase.mockResolvedValue(null);

      await require('../commands/phase').phaseCommand('1');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Successfully started to Phase 1')
      );
    });
  });

  describe('Phase information completeness', () => {
    test('should have information for all phases', () => {
      const { getPhaseTask } = require('../commands/phase');

      for (let i = 1; i <= 5; i++) {
        const phaseInfo = getPhaseTask(i);
        expect(phaseInfo).toBeDefined();
        expect(phaseInfo.name).toBeDefined();
        expect(phaseInfo.role).toBeDefined();
        expect(phaseInfo.firstTask).toBeDefined();
        expect(phaseInfo.description).toBeDefined();
      }
    });
  });
});