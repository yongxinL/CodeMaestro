// Mock external dependencies
jest.mock('../lib/config');
jest.mock('../lib/logger');
jest.mock('../lib/project');
jest.mock('fs-extra');

// Import the modules we want to test
const config = require('../lib/config');
const projectDetector = require('../lib/project');
const fs = require('fs-extra');

describe('Planning Agent', () => {
  let mockAgent;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    config.load.mockResolvedValue({
      paths: {
        planning: '/mock/project/docs/planning'
      }
    });

    projectDetector.isCodeMaestroProject.mockResolvedValue(true);
    projectDetector.getProjectStatus.mockResolvedValue({
      phase: 2,
      task: 'Create technical blueprint and task breakdown',
      role: 'Software Architect'
    });

    fs.ensureDir.mockResolvedValue();
    fs.writeFile.mockResolvedValue();
    fs.readdir.mockResolvedValue([]);
  });

  describe('PlanningAgent class', () => {
    beforeEach(async () => {
      const { PlanningAgent } = require('../commands/planning');
      mockAgent = new PlanningAgent();
      await mockAgent.initialize();
    });

    test('should initialize with correct paths', () => {
      expect(mockAgent.planningDir).toBe('/mock/project/docs/planning');
    });

    test('should validate phase correctly', async () => {
      const result = await mockAgent.validatePhase();
      expect(result).toBe(true);
    });

    test('should reject invalid phase', async () => {
      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 1,
        task: 'Gather requirements',
        role: 'Product Manager'
      });

      const result = await mockAgent.validatePhase();
      expect(result).toBe(false);
    });

    test('should generate task DAG from epics', async () => {
      const epics = 'User Authentication, Core Features, Admin Dashboard';
      const tasks = await mockAgent.generateTaskDAG(epics, '4 sprints');

      expect(tasks.length).toBeGreaterThan(3); // Should include epics + standard tasks
      expect(tasks[0].id).toBe('T1');
      expect(tasks[0].name).toContain('Epic 1: User Authentication');
      expect(tasks[0].phase).toBe('Sprint 1');
    });

    test('should generate default task DAG when no epics provided', async () => {
      const tasks = await mockAgent.generateTaskDAG('[Please fill in]', '4 sprints');

      expect(tasks.length).toBeGreaterThan(5);
      expect(tasks[0].name).toContain('Setup Development Environment');
      expect(tasks[0].phase).toBe('Sprint 1');
    });

    test('should estimate tokens based on complexity and team size', async () => {
      const tasks = [
        { id: 'T1', name: 'Task 1', phase: 'Sprint 1', dependencies: [], estimate: '3 days' },
        { id: 'T2', name: 'Task 2', phase: 'Sprint 1', dependencies: ['T1'], estimate: '4 days' }
      ];

      const estimates = await mockAgent.estimateTokens(tasks, 'Medium', '3-5 developers');

      expect(estimates.total).toBeGreaterThan(0);
      expect(estimates.planningPhase).toBeGreaterThan(0);
      expect(estimates.implementationPhase).toBeGreaterThan(estimates.planningPhase);
      expect(estimates.planningPhase + estimates.implementationPhase + estimates.testingPhase + estimates.deploymentPhase).toBe(estimates.total);
    });

    test('should create blueprint template with architecture data', async () => {
      const architecture = {
        approach: 'Microservices Architecture',
        frontend: 'React.js - Component-based UI library',
        backend: 'Node.js/Express - JavaScript runtime',
        database: 'PostgreSQL - Advanced open source RDBMS',
        infrastructure: 'AWS - Amazon Web Services'
      };

      const tasks = [
        { id: 'T1', name: 'Setup Environment', phase: 'Sprint 1', dependencies: [], estimate: '2 days' }
      ];

      const constraints = {
        budget: '$50K-100K',
        timeline: '3 months',
        scalability: '100 users initially',
        teamSize: '3-5 developers'
      };

      const tokenEstimates = {
        planningPhase: 2000,
        implementationPhase: 12000,
        testingPhase: 3000,
        deploymentPhase: 1000,
        total: 18000
      };

      const template = await mockAgent.createBlueprintTemplate(architecture, tasks, constraints, tokenEstimates);

      expect(template).toContain('# Technical Blueprint');
      expect(template).toContain('Microservices Architecture');
      expect(template).toContain('React.js');
      expect(template).toContain('Node.js/Express');
      expect(template).toContain('PostgreSQL');
      expect(template).toContain('AWS - Amazon Web Services');
      expect(template).toContain('18,000'); // Formatted total
    });

    test('should create Gantt chart template with tasks', async () => {
      const tasks = [
        { id: 'T1', name: 'Setup Environment', sprint: 'Sprint 1', estimate: '3-4 days' },
        { id: 'T2', name: 'Core Development', sprint: 'Sprint 2', estimate: '5-7 days' }
      ];

      const template = await mockAgent.createGanttChartTemplate(tasks);

      expect(template).toContain('# Project Timeline (Gantt Chart)');
      expect(template).toContain('Sprint 1');
      expect(template).toContain('Sprint 2');
      expect(template).toContain('T1: Setup Environment');
      expect(template).toContain('T2: Core Development');
      expect(template).toContain('█████ █████'); // ASCII chart bars
    });

    test('should save document to correct path', async () => {
      const filename = 'test-blueprint.md';
      const content = '# Test Blueprint';

      const filePath = await mockAgent.saveDocument(filename, content);

      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/planning/test-blueprint.md',
        content
      );
      expect(filePath).toBe('/mock/project/docs/planning/test-blueprint.md');
    });

    test('should list existing documents', async () => {
      fs.readdir.mockResolvedValue(['blueprint.md', 'timeline.md', 'not-md.txt']);

      const documents = await mockAgent.listExistingDocuments();

      expect(documents).toEqual(['blueprint.md', 'timeline.md']);
      expect(fs.readdir).toHaveBeenCalledWith('/mock/project/docs/planning');
    });

    test('should handle empty document directory', async () => {
      fs.readdir.mockRejectedValue(new Error('Directory not found'));

      const documents = await mockAgent.listExistingDocuments();

      expect(documents).toEqual([]);
    });
  });

  describe('Interactive gathering methods', () => {
    beforeEach(async () => {
      const { PlanningAgent } = require('../commands/planning');
      mockAgent = new PlanningAgent();
      await mockAgent.initialize();
    });

    test('should gather architecture info with valid options', async () => {
      // Mock the askQuestion and askMultipleChoice methods
      mockAgent.askQuestion = jest.fn().mockResolvedValue('Test Answer');
      mockAgent.askMultipleChoice = jest.fn().mockResolvedValue('Selected Option');

      const architecture = await mockAgent.gatherArchitectureInfo();

      expect(mockAgent.askMultipleChoice).toHaveBeenCalledWith(
        'What is your preferred architecture approach?',
        expect.any(Array)
      );
      expect(architecture).toHaveProperty('approach');
      expect(architecture).toHaveProperty('frontend');
      expect(architecture).toHaveProperty('backend');
      expect(architecture).toHaveProperty('database');
      expect(architecture).toHaveProperty('infrastructure');
    });

    test('should gather task breakdown info', async () => {
      mockAgent.askQuestion = jest.fn().mockResolvedValue('Test Answer');
      mockAgent.askMultipleChoice = jest.fn().mockResolvedValue('Medium');

      const tasks = await mockAgent.gatherTaskBreakdown({});

      expect(mockAgent.askQuestion).toHaveBeenCalledWith(
        'What are the main epics or feature areas?',
        expect.objectContaining({
          hint: expect.any(String),
          multiple: true
        })
      );
      expect(tasks).toHaveProperty('epics');
      expect(tasks).toHaveProperty('sprints');
      expect(tasks).toHaveProperty('teamSize');
      expect(tasks).toHaveProperty('complexity');
    });

    test('should gather technical constraints', async () => {
      mockAgent.askQuestion = jest.fn().mockResolvedValue('Test Answer');
      mockAgent.askMultipleChoice = jest.fn().mockResolvedValue('None - No specific compliance needs');

      const constraints = await mockAgent.gatherTechnicalConstraints();

      expect(mockAgent.askQuestion).toHaveBeenCalledWith(
        'What is your development budget range?',
        expect.objectContaining({
          hint: expect.any(String),
          example: expect.any(String)
        })
      );
      expect(constraints).toHaveProperty('budget');
      expect(constraints).toHaveProperty('timeline');
      expect(constraints).toHaveProperty('scalability');
      expect(constraints).toHaveProperty('compliance');
    });
  });

  describe('Command execution', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should execute blueprint command with template option', async () => {
      const { planningCommand } = require('../commands/planning');

      await planningCommand('blueprint', { template: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Blueprint template created')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should execute tasks command with template option', async () => {
      const { planningCommand } = require('../commands/planning');

      await planningCommand('tasks', { template: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Task planning template created')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should execute timeline command with template option', async () => {
      const { planningCommand } = require('../commands/planning');

      await planningCommand('timeline', { template: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Timeline template created')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should show guide when no action specified', async () => {
      const { planningCommand } = require('../commands/planning');

      await planningCommand();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Phase 2 Planning Guide')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('/codem-planning blueprint --interactive')
      );
    });

    test('should list existing documents', async () => {
      const { planningCommand } = require('../commands/planning');

      fs.readdir.mockResolvedValue(['blueprint.md', 'timeline.md']);

      await planningCommand('list', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📁 Existing Planning Documents')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Found 2 document(s)')
      );
    });

    test('should show empty list when no documents exist', async () => {
      const { planningCommand } = require('../commands/planning');

      fs.readdir.mockResolvedValue([]);

      await planningCommand('list', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('No planning documents found')
      );
    });

    test('should reject when phase validation fails', async () => {
      const { planningCommand } = require('../commands/planning');

      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 1,
        task: 'Gather requirements',
        role: 'Product Manager'
      });

      await planningCommand('blueprint', { template: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Planning Agent is designed for Phase 2')
      );
      expect(fs.writeFile).not.toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    test('should handle initialization errors', async () => {
      config.load.mockRejectedValue(new Error('Config load failed'));

      const { PlanningAgent } = require('../commands/planning');
      const agent = new PlanningAgent();

      await expect(agent.initialize()).rejects.toThrow('Config load failed');
    });

    test('should handle save document errors', async () => {
      const { PlanningAgent } = require('../commands/planning');
      const agent = new PlanningAgent();
      agent.planningDir = '/mock/path';

      fs.writeFile.mockRejectedValue(new Error('Write failed'));

      await expect(agent.saveDocument('test.md', 'content')).rejects.toThrow('Write failed');
    });
  });
});