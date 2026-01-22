const fs = require('fs-extra');

// Mock external dependencies
jest.mock('../lib/config');
jest.mock('../lib/logger');
jest.mock('../lib/project');
jest.mock('fs-extra');

// Import the modules we want to test
const config = require('../lib/config');
const projectDetector = require('../lib/project');

describe('Next Command', () => {
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
    projectDetector.getCurrentPhase.mockResolvedValue(null);
    projectDetector.getPhaseInfo.mockReturnValue({
      name: 'Requirements',
      description: 'Product Manager - Define specifications'
    });

    fs.ensureDir.mockResolvedValue();
    fs.writeFile.mockResolvedValue();
  });

  describe('getNextTask function', () => {
    // Import the function directly for testing
    const { getNextTask } = require('../commands/next');

    test('should start Phase 1 when no current phase exists', async () => {
      const result = await getNextTask(null);

      expect(result.phase).toBe(1);
      expect(result.role).toBe('Product Manager');
      expect(result.task).toBe('Analyze project requirements and create specification document');
      expect(result.isFirst).toBe(true);
    });

    test('should return first task when current task is not found', async () => {
      const result = await getNextTask(1, 'non-existent task');

      expect(result.phase).toBe(1);
      expect(result.task).toBe('Analyze project requirements and create specification document');
      expect(result.isFirst).toBe(true);
    });

    test('should advance to next task in same phase', async () => {
      const result = await getNextTask(1, 'Analyze project requirements and create specification document');

      expect(result.phase).toBe(1);
      expect(result.task).toBe('Perform competitive analysis and market research');
      expect(result.isNext).toBe(true);
    });

    test('should advance to next phase when current phase is complete', async () => {
      const result = await getNextTask(1, 'Document functional and non-functional requirements');

      expect(result.phase).toBe(2);
      expect(result.role).toBe('Software Architect');
      expect(result.task).toBe('Design system architecture and component structure');
      expect(result.isNewPhase).toBe(true);
    });

    test('should mark project as complete when all phases done', async () => {
      const result = await getNextTask(5, 'Execute deployment and monitor initial performance');

      expect(result.phase).toBe(5);
      expect(result.isComplete).toBe(true);
    });

    test('should throw error for invalid phase', async () => {
      await expect(getNextTask(99)).rejects.toThrow('Invalid phase: 99');
    });
  });

  describe('Task definitions', () => {
    test('should have complete task definitions for all phases', async () => {
      const { getNextTask } = require('../commands/next');

      // Test that all phases have tasks defined
      for (let phase = 1; phase <= 5; phase++) {
        const result = await getNextTask(phase);
        expect(result.phase).toBe(phase);
        expect(result.task).toBeDefined();
        expect(result.role).toBeDefined();
      }
    });

    test('should have reasonable number of tasks per phase', async () => {
      const { getNextTask } = require('../commands/next');

      // Phase 1 should have 4 tasks
      let result = await getNextTask(1);
      expect(result.task).toBe('Analyze project requirements and create specification document');

      result = await getNextTask(1, result.task);
      expect(result.task).toBe('Perform competitive analysis and market research');

      result = await getNextTask(1, result.task);
      expect(result.task).toBe('Define acceptance criteria and success metrics');

      result = await getNextTask(1, result.task);
      expect(result.task).toBe('Document functional and non-functional requirements');

      // Next should advance to Phase 2
      result = await getNextTask(1, result.task);
      expect(result.phase).toBe(2);
    });
  });
});