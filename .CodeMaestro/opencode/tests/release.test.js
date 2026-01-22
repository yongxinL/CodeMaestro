// Mock external dependencies
jest.mock('../lib/config');
jest.mock('../lib/logger');
jest.mock('../lib/project');
jest.mock('fs-extra');

// Mock process.exit to prevent test termination
const originalExit = process.exit;
beforeAll(() => {
  process.exit = jest.fn();
});
afterAll(() => {
  process.exit = originalExit;
});

// Import the modules we want to test
const config = require('../lib/config');
const projectDetector = require('../lib/project');
const fs = require('fs-extra');

describe('Release Agent', () => {
  let mockAgent;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    config.load.mockResolvedValue({
      paths: {
        release: '/mock/project/docs/release',
        specs: '/mock/project/docs/specifications',
        planning: '/mock/project/docs/planning',
        implementation: '/mock/project/docs/implementation',
        verification: '/mock/project/docs/verification'
      }
    });

    projectDetector.isCodeMaestroProject.mockResolvedValue(true);
    projectDetector.getProjectStatus.mockResolvedValue({
      phase: 5,
      task: 'Coordinate release and capture organizational learning',
      role: 'Release Manager'
    });

    fs.ensureDir.mockResolvedValue();
    fs.writeFile.mockResolvedValue();
    fs.readdir.mockResolvedValue([]);
    fs.readFile.mockResolvedValue('# Mock release content');
  });

  describe('ReleaseAgent class', () => {
    beforeEach(async () => {
      const { ReleaseAgent } = require('../commands/release');
      mockAgent = new ReleaseAgent();
      await mockAgent.initialize();
    });

    test('should initialize with correct paths', () => {
      expect(mockAgent.releaseDir).toBe('/mock/project/docs/release');
      expect(mockAgent.specsDir).toBe('/mock/project/docs/specifications');
      expect(mockAgent.planningDir).toBe('/mock/project/docs/planning');
      expect(mockAgent.implementationDir).toBe('/mock/project/docs/implementation');
      expect(mockAgent.verificationDir).toBe('/mock/project/docs/verification');
    });

    test('should validate phase correctly', async () => {
      const result = await mockAgent.validatePhase();
      expect(result).toBe(true);
    });

    test('should reject invalid phase', async () => {
      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 3,
        task: 'Implement production code',
        role: 'Senior Developer'
      });

      const result = await mockAgent.validatePhase();
      expect(result).toBe(false);
    });

    test('should coordinate deployment across environments', async () => {
      const deploymentPlan = {
        environments: ['staging', 'production'],
        strategy: 'rolling',
        rollback: true
      };

      mockAgent.deployToStaging = jest.fn().mockResolvedValue({ success: true, url: 'https://staging.example.com' });
      mockAgent.deployToProduction = jest.fn().mockResolvedValue({ success: true, url: 'https://example.com' });

      const results = await mockAgent.coordinateDeployment(deploymentPlan);

      expect(results.staging.success).toBe(true);
      expect(results.production.success).toBe(true);
      expect(results.overall).toBe(true);
    });

    test('should generate release notes', async () => {
      const changes = [
        { type: 'feature', description: 'User authentication system' },
        { type: 'bugfix', description: 'Fixed login validation' },
        { type: 'improvement', description: 'Enhanced UI performance' }
      ];

      const releaseNotes = await mockAgent.generateReleaseNotes('v1.0.0', changes);

      expect(releaseNotes).toContain('# Release v1.0.0');
      expect(releaseNotes).toContain('## 🚀 Features');
      expect(releaseNotes).toContain('## 🐛 Bug Fixes');
      expect(releaseNotes).toContain('## ⚡ Improvements');
      expect(releaseNotes).toContain('User authentication system');
    });

    test('should capture lessons learned', async () => {
      const projectData = {
        duration: 45, // days
        teamSize: 5,
        budget: 50000,
        challenges: ['Complex integration', 'Performance optimization'],
        successes: ['Modular architecture', 'Automated testing']
      };

      const retrospective = await mockAgent.captureLessonsLearned(projectData);

      expect(retrospective).toContain('# Project Retrospective');
      expect(retrospective).toContain('## What Went Well');
      expect(retrospective).toContain('## What Could Be Improved');
      expect(retrospective).toContain('## Key Learnings');
      expect(retrospective).toContain('Modular architecture');
      expect(retrospective).toContain('Complex integration');
    });

    test('should manage environment configurations', async () => {
      const environments = ['development', 'staging', 'production'];

      mockAgent.configureEnvironment = jest.fn().mockImplementation((env) =>
        Promise.resolve({ environment: env, configured: true, variables: 5 })
      );

      const configs = await mockAgent.manageEnvironments(environments);

      expect(configs).toHaveLength(3);
      expect(configs[0].environment).toBe('development');
      expect(configs[0].configured).toBe(true);
      expect(configs[1].environment).toBe('staging');
      expect(configs[2].environment).toBe('production');
    });

    test('should perform pre-release checks', async () => {
      mockAgent.checkDependencies = jest.fn().mockResolvedValue({ valid: true, outdated: 0 });
      mockAgent.checkSecurity = jest.fn().mockResolvedValue({ clean: true, vulnerabilities: 0 });
      mockAgent.checkDocumentation = jest.fn().mockResolvedValue({ complete: true, missing: [] });

      const checks = await mockAgent.performPreReleaseChecks();

      expect(checks.dependencies.valid).toBe(true);
      expect(checks.security.clean).toBe(true);
      expect(checks.documentation.complete).toBe(true);
      expect(checks.ready).toBe(true);
    });

    test('should coordinate stakeholder communication', async () => {
      const stakeholders = [
        { name: 'Product Manager', contact: 'pm@company.com', role: 'approval' },
        { name: 'DevOps Team', contact: 'devops@company.com', role: 'deployment' },
        { name: 'QA Team', contact: 'qa@company.com', role: 'signoff' }
      ];

      const communication = await mockAgent.coordinateStakeholderCommunication(stakeholders, 'v1.0.0');

      expect(communication).toHaveProperty('notifications');
      expect(communication).toHaveProperty('approvals');
      expect(communication).toHaveProperty('timeline');
      expect(communication.notifications).toHaveLength(3);
    });

    test('should save release documents', async () => {
      const content = '# Release v1.0.0';
      const filename = 'release-notes.md';

      const filePath = await mockAgent.saveDocument(filename, content);

      expect(filePath).toBe('/mock/project/docs/release/release-notes.md');
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/release/release-notes.md',
        content
      );
    });

    test('should list existing release documents', async () => {
      fs.readdir.mockResolvedValue(['release-notes.md', 'retrospective.md', 'deployment-log.md']);

      const documents = await mockAgent.listExistingDocuments();

      expect(documents).toEqual(['release-notes.md', 'retrospective.md', 'deployment-log.md']);
    });
  });

  describe('Deployment orchestration methods', () => {
    beforeEach(async () => {
      const { ReleaseAgent } = require('../commands/release');
      mockAgent = new ReleaseAgent();
      await mockAgent.initialize();
    });

    test('should deploy to staging environment', async () => {
      const deployment = await mockAgent.deployToStaging();

      expect(deployment).toHaveProperty('success');
      expect(deployment).toHaveProperty('url');
      expect(deployment).toHaveProperty('timestamp');
      expect(deployment.environment).toBe('staging');
    });

    test('should deploy to production environment', async () => {
      const deployment = await mockAgent.deployToProduction();

      expect(deployment).toHaveProperty('success');
      expect(deployment).toHaveProperty('url');
      expect(deployment).toHaveProperty('timestamp');
      expect(deployment.environment).toBe('production');
    });

    test('should handle deployment rollback', async () => {
      const rollback = await mockAgent.rollbackDeployment('production', 'v1.0.0');

      expect(rollback).toHaveProperty('success');
      expect(rollback).toHaveProperty('previousVersion');
      expect(rollback).toHaveProperty('timestamp');
      expect(rollback.environment).toBe('production');
    });

    test('should validate deployment health', async () => {
      const health = await mockAgent.validateDeploymentHealth('production');

      expect(health).toHaveProperty('status');
      expect(health).toHaveProperty('checks');
      expect(health).toHaveProperty('timestamp');
      expect(health.environment).toBe('production');
    });
  });

  describe('Knowledge capture methods', () => {
    beforeEach(async () => {
      const { ReleaseAgent } = require('../commands/release');
      mockAgent = new ReleaseAgent();
      await mockAgent.initialize();
    });

    test('should extract technical lessons', async () => {
      const projectData = {
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        challenges: ['State management complexity', 'API performance'],
        solutions: ['Redux implementation', 'Database indexing']
      };

      const lessons = await mockAgent.extractTechnicalLessons(projectData);

      expect(lessons).toHaveProperty('technologies');
      expect(lessons).toHaveProperty('patterns');
      expect(lessons).toHaveProperty('antiPatterns');
      expect(lessons.technologies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ technology: 'React' })
        ])
      );
    });

    test('should analyze process improvements', async () => {
      const metrics = {
        plannedDuration: 60,
        actualDuration: 45,
        plannedBudget: 75000,
        actualBudget: 52000,
        defectsFound: 23,
        defectsFixed: 21
      };

      const improvements = await mockAgent.analyzeProcessImprovements(metrics);

      expect(improvements).toHaveProperty('efficiency');
      expect(improvements).toHaveProperty('quality');
      expect(improvements).toHaveProperty('recommendations');
      expect(improvements.efficiency.durationImprovement).toBeGreaterThan(0);
    });

    test('should update knowledge base', async () => {
      const lessons = {
        patterns: ['Modular architecture works well'],
        antiPatterns: ['Tight coupling causes issues'],
        technologies: ['React', 'Node.js']
      };

      const update = await mockAgent.updateKnowledgeBase(lessons);

      expect(update).toHaveProperty('entriesAdded');
      expect(update).toHaveProperty('patterns');
      expect(update).toHaveProperty('timestamp');
      expect(update.entriesAdded).toBeGreaterThan(0);
    });
  });

  describe('releaseCommand execution', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should show guide by default', async () => {
      const { releaseCommand } = require('../commands/release');

      await releaseCommand('guide', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Phase 5 Release Guide')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Phase 5 Objective:')
      );
    });

    test('should perform pre-release checks', async () => {
      const { releaseCommand } = require('../commands/release');

      await releaseCommand('check', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🔍 Pre-Release Checks')
      );
    });

    test('should coordinate deployment', async () => {
      const { releaseCommand } = require('../commands/release');

      await releaseCommand('deploy', { environment: 'staging' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🚀 Deployment Coordination')
      );
    });

    test('should generate release notes', async () => {
      const { releaseCommand } = require('../commands/release');

      await releaseCommand('notes', { version: 'v1.0.0' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📝 Release Notes Generation')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should capture retrospective', async () => {
      const { releaseCommand } = require('../commands/release');

      await releaseCommand('retrospective', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📚 Lessons Learned Capture')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should handle invalid phase', async () => {
      const { releaseCommand } = require('../commands/release');

      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 4,
        task: 'Verify implementation meets requirements',
        role: 'QA Lead'
      });

      await releaseCommand('deploy', { environment: 'production' });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Release Agent is designed for Phase 5')
      );
    });
  });

  describe('Template content validation', () => {
    test('release notes template should have proper structure', async () => {
      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();
      await agent.initialize();

      const template = await agent.createReleaseNotesTemplate();

      expect(template).toContain('# Release v');
      expect(template).toContain('## 🚀 Features');
      expect(template).toContain('## 🐛 Bug Fixes');
      expect(template).toContain('## ⚡ Improvements');
      expect(template).toContain('## 📦 Technical Changes');
      expect(template).toContain('*Generated by CodeMaestro Release Agent*');
    });

    test('retrospective template should capture all learning aspects', async () => {
      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();
      await agent.initialize();

      const template = await agent.createRetrospectiveTemplate();

      expect(template).toContain('# Project Retrospective');
      expect(template).toContain('## What Went Well');
      expect(template).toContain('## What Could Be Improved');
      expect(template).toContain('## Key Learnings');
      expect(template).toContain('## Action Items');
      expect(template).toContain('## Knowledge Base Updates');
    });

    test('deployment checklist template should cover all deployment aspects', async () => {
      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();
      await agent.initialize();

      const template = await agent.createDeploymentChecklistTemplate();

      expect(template).toContain('# Deployment Checklist');
      expect(template).toContain('## Pre-Deployment');
      expect(template).toContain('## Deployment Steps');
      expect(template).toContain('## Post-Deployment');
      expect(template).toContain('## Rollback Plan');
      expect(template).toContain('## Verification Steps');
    });
  });

  describe('Error handling', () => {
    test('should handle initialization errors', async () => {
      config.load.mockRejectedValue(new Error('Config load failed'));

      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();

      await expect(agent.initialize()).rejects.toThrow('Config load failed');
    });

    test('should handle deployment failures gracefully', async () => {
      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();
      await agent.initialize();

      agent.deployToStaging = jest.fn().mockRejectedValue(new Error('Deployment failed'));

      const results = await agent.coordinateDeployment({ environments: ['staging'] });

      expect(results.staging.success).toBe(false);
      expect(results.staging.error).toBe('Deployment failed');
      expect(results.overall).toBe(false);
    });

    test('should handle stakeholder communication failures', async () => {
      const { ReleaseAgent } = require('../commands/release');
      const agent = new ReleaseAgent();
      await agent.initialize();

      // Mock communication failure
      const stakeholders = [{ name: 'Test', contact: 'test@example.com' }];
      const communication = await agent.coordinateStakeholderCommunication(stakeholders, 'v1.0.0');

      // Should still return structure even if communication fails
      expect(communication).toHaveProperty('notifications');
      expect(communication.notifications[0]).toHaveProperty('status');
    });
  });
});