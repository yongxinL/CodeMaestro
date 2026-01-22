// Mock external dependencies
jest.mock('../lib/config');
jest.mock('../lib/logger');
jest.mock('../lib/project');

// Import the modules we want to test
const config = require('../lib/config');
const projectDetector = require('../lib/project');

describe('Tree Command', () => {
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
    projectDetector.getProjectStatus.mockResolvedValue({
      phase: 2,
      task: 'Design system architecture and component structure',
      role: 'Software Architect'
    });
  });

  describe('getPhaseTasks function', () => {
    // Import the function directly for testing
    const { getPhaseTasks } = require('../commands/tree');

    test('should return correct tasks for phase 1', () => {
      const tasks = getPhaseTasks(1);
      expect(tasks).toHaveLength(4);
      expect(tasks[0]).toBe('Analyze project requirements and create specification document');
    });

    test('should return correct tasks for phase 3', () => {
      const tasks = getPhaseTasks(3);
      expect(tasks).toHaveLength(4);
      expect(tasks[1]).toBe('Write production-quality code following patterns');
    });

    test('should return empty array for invalid phase', () => {
      const tasks = getPhaseTasks(99);
      expect(tasks).toEqual([]);
    });
  });

  describe('getPhaseInfo function', () => {
    const { getPhaseInfo } = require('../commands/tree');

    test('should return correct info for phase 1', () => {
      const info = getPhaseInfo(1);
      expect(info.name).toBe('Requirements');
      expect(info.role).toBe('Product Manager');
      expect(info.description).toBe('Define specifications');
    });

    test('should return correct info for phase 5', () => {
      const info = getPhaseInfo(5);
      expect(info.name).toBe('Release');
      expect(info.role).toBe('Release Manager');
      expect(info.description).toBe('Deploy and release');
    });
  });

  describe('createWorkflowTree function', () => {
    const { createWorkflowTree } = require('../commands/tree');

    test('should create tree representation with current phase highlighted', () => {
      const tree = createWorkflowTree(2, 'Design system architecture and component structure');

      expect(tree).toContain('🎯 Phase 2: Planning');
      expect(tree).toContain('✅ Phase 1: Requirements');
      expect(tree).toContain('⏳ Phase 3: Implementation');
      expect(tree).toContain('🎯 Design system architecture');
    });

    test('should handle no current phase', () => {
      const tree = createWorkflowTree(null, null);

      expect(tree).toContain('⏳ Phase 1: Requirements');
      expect(tree).toContain('⏳ Phase 2: Planning');
    });
  });

  describe('createCompactView function', () => {
    const { createCompactView } = require('../commands/tree');

    test('should create compact progress representation', () => {
      const view = createCompactView(2, 'Design system architecture and component structure');

      expect(view).toContain('Progress: [█████░░░░░░░░░░░░░░░] 25%');
      expect(view).toContain('Current Phase:');
      expect(view).toContain('2/5 - Planning');
      expect(view).toContain('Current Role:');
      expect(view).toContain('Software Architect');
    });

    test('should show completion message for phase 5', () => {
      const view = createCompactView(5, 'Execute deployment and monitor initial performance');

      expect(view).toContain('🎉 Project complete! All phases finished.');
    });
  });

  describe('Tree command execution', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should handle non-CodeMaestro project', async () => {
      projectDetector.isCodeMaestroProject.mockResolvedValue(false);

      await require('../commands/tree').treeCommand({});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('To initialize a CodeMaestro project')
      );
    });

    test('should handle no active phase', async () => {
      projectDetector.getProjectStatus.mockResolvedValue({
        phase: null,
        task: null,
        role: null
      });

      await require('../commands/tree').treeCommand({});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('No active phase detected')
      );
    });

    test('should display full tree view by default', async () => {
      await require('../commands/tree').treeCommand({});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🌳 CodeMaestro Project Workflow')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🎯 Phase 2: Planning')
      );
    });

    test('should display compact view when requested', async () => {
      await require('../commands/tree').treeCommand({ compact: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Workflow Progress')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Progress: [█████░░░░░░░░░░░░░░░] 25%')
      );
    });

    test('should handle errors gracefully', async () => {
      projectDetector.getProjectStatus.mockRejectedValue(new Error('Test error'));

      // Mock process.exit to avoid actually exiting
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

      await require('../commands/tree').treeCommand({});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Error: Test error')
      );

      mockExit.mockRestore();
    });
  });

  describe('Task completion visualization', () => {
    test('should correctly show task progress within current phase', () => {
      const { createWorkflowTree } = require('../commands/tree');

      const tree = createWorkflowTree(1, 'Perform competitive analysis and market research');

      expect(tree).toContain('✅ Analyze project requirements');
      expect(tree).toContain('🎯 Perform competitive analysis');
      expect(tree).toContain('○ Define acceptance criteria');
    });
  });
});