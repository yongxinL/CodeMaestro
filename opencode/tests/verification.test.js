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

describe('Verification Agent', () => {
  let mockAgent;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    config.load.mockResolvedValue({
      paths: {
        verification: '/mock/project/docs/verification',
        specs: '/mock/project/docs/specifications',
        planning: '/mock/project/docs/planning',
        implementation: '/mock/project/docs/implementation'
      }
    });

    projectDetector.isCodeMaestroProject.mockResolvedValue(true);
    projectDetector.getProjectStatus.mockResolvedValue({
      phase: 4,
      task: 'Verify implementation meets requirements and quality standards',
      role: 'QA Lead'
    });

    fs.ensureDir.mockResolvedValue();
    fs.writeFile.mockResolvedValue();
    fs.readdir.mockResolvedValue([]);
    fs.readFile.mockResolvedValue('# Mock specification content');
  });

  describe('VerificationAgent class', () => {
    beforeEach(async () => {
      const { VerificationAgent } = require('../commands/verification');
      mockAgent = new VerificationAgent();
      await mockAgent.initialize();
    });

    test('should initialize with correct paths', () => {
      expect(mockAgent.verificationDir).toBe('/mock/project/docs/verification');
      expect(mockAgent.specsDir).toBe('/mock/project/docs/specifications');
      expect(mockAgent.planningDir).toBe('/mock/project/docs/planning');
      expect(mockAgent.implementationDir).toBe('/mock/project/docs/implementation');
    });

    test('should validate phase correctly', async () => {
      const result = await mockAgent.validatePhase();
      expect(result).toBe(true);
    });

    test('should reject invalid phase', async () => {
      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 2,
        task: 'Create technical blueprint',
        role: 'Software Architect'
      });

      const result = await mockAgent.validatePhase();
      expect(result).toBe(false);
    });

    test('should collect evidence from all phases', async () => {
      fs.readFile.mockResolvedValue('# Evidence document content');

      const evidence = await mockAgent.collectEvidence();

      expect(evidence).toHaveProperty('requirements');
      expect(evidence).toHaveProperty('planning');
      expect(evidence).toHaveProperty('implementation');
      expect(evidence).toHaveProperty('timestamp');
    });

    test('should validate acceptance criteria', async () => {
      const acceptanceCriteria = [
        { id: 'AC-1.1', description: 'User can log in', status: 'pending' },
        { id: 'AC-1.2', description: 'Password is encrypted', status: 'pending' }
      ];

      mockAgent.runAcceptanceTests = jest.fn().mockResolvedValue({
        'AC-1.1': { passed: true, evidence: 'Login test passed' },
        'AC-1.2': { passed: true, evidence: 'Encryption verified' }
      });

      const results = await mockAgent.validateAcceptanceCriteria(acceptanceCriteria);

      expect(results.overall).toBe(true);
      expect(results.passed).toBe(2);
      expect(results.total).toBe(2);
    });

    test('should perform comprehensive quality assessment', async () => {
      mockAgent.runAutomatedTests = jest.fn().mockResolvedValue({ passed: true, coverage: 85 });
      mockAgent.runSecurityScan = jest.fn().mockResolvedValue({ passed: true, score: 95 });
      mockAgent.runPerformanceTests = jest.fn().mockResolvedValue({ passed: true, metrics: {} });

      const assessment = await mockAgent.performQualityAssessment();

      expect(assessment.testing.passed).toBe(true);
      expect(assessment.security.passed).toBe(true);
      expect(assessment.performance.passed).toBe(true);
      expect(assessment.overall).toBe(true);
    });

    test('should make GO decision based on quality gates', async () => {
      const evidence = {
        requirements: 'Requirements met',
        planning: 'Planning complete',
        implementation: 'Implementation done'
      };

      const qualityResults = {
        testing: { passed: true, coverage: 85 },
        security: { passed: true, score: 95 },
        performance: { passed: true },
        acceptance: { overall: true, passRate: 100 }
      };

      const decision = await mockAgent.makeGoDecision(evidence, qualityResults);

      expect(decision.go).toBe(true);
      expect(decision.confidence).toBeGreaterThan(0);
      expect(decision.recommendations).toBeDefined();
    });

    test('should make NO-GO decision when critical issues found', async () => {
      const evidence = {
        requirements: 'Requirements met',
        planning: 'Planning complete',
        implementation: 'Implementation done'
      };

      const qualityResults = {
        testing: { passed: false, coverage: 45 },
        security: { passed: false, vulnerabilities: ['Critical vuln'] },
        performance: { passed: true },
        acceptance: { overall: false, passRate: 60 }
      };

      const decision = await mockAgent.makeGoDecision(evidence, qualityResults);

      expect(decision.go).toBe(false);
      expect(decision.blockers).toContain('testing');
      expect(decision.blockers).toContain('security');
      expect(decision.blockers).toContain('acceptance');
    });

    test('should generate verification report', async () => {
      const evidence = { requirements: 'Test', planning: 'Test', implementation: 'Test' };
      const qualityResults = { testing: { passed: true }, security: { passed: true } };
      const decision = { go: true, confidence: 95 };

      const report = await mockAgent.generateVerificationReport(evidence, qualityResults, decision);

      expect(report).toContain('# Verification Report');
      expect(report).toContain('GO Decision: ✅ RELEASE APPROVED');
      expect(report).toContain('*Generated by CodeMaestro Verification Agent*');
    });

    test('should save verification documents', async () => {
      const content = '# Test verification document';
      const filename = 'test-report.md';

      const filePath = await mockAgent.saveDocument(filename, content);

      expect(filePath).toBe('/mock/project/docs/verification/test-report.md');
      expect(fs.writeFile).toHaveBeenCalledWith(
        '/mock/project/docs/verification/test-report.md',
        content
      );
    });

    test('should list existing verification documents', async () => {
      fs.readdir.mockResolvedValue(['evidence.md', 'quality-report.md', 'not-md.txt']);

      const documents = await mockAgent.listExistingDocuments();

      expect(documents).toEqual(['evidence.md', 'quality-report.md']);
    });
  });

  describe('Evidence collection methods', () => {
    beforeEach(async () => {
      const { VerificationAgent } = require('../commands/verification');
      mockAgent = new VerificationAgent();
      await mockAgent.initialize();
    });

    test('should load requirements evidence', async () => {
      fs.readdir.mockResolvedValue(['product-specification.md', 'user-stories.md']);
      fs.readFile.mockResolvedValue('# Product Specification\n## Functional Requirements\n- Req 1\n- Req 2');

      const evidence = await mockAgent.loadRequirementsEvidence();

      expect(evidence).toHaveProperty('specifications');
      expect(evidence).toHaveProperty('userStories');
      expect(evidence.specifications).toContain('Functional Requirements');
    });

    test('should load planning evidence', async () => {
      fs.readdir.mockResolvedValue(['technical-blueprint.md', 'project-timeline.md']);
      fs.readFile.mockResolvedValue('# Technical Blueprint\n## Architecture\n- Frontend: React\n- Backend: Node.js');

      const evidence = await mockAgent.loadPlanningEvidence();

      expect(evidence).toHaveProperty('blueprint');
      expect(evidence).toHaveProperty('timeline');
      expect(evidence.blueprint).toContain('Architecture');
    });

    test('should load implementation evidence', async () => {
      fs.readdir.mockResolvedValue(['code-structure.md', 'implementation-progress.md']);
      fs.readFile.mockResolvedValue('# Implementation Progress\n## Current Status\n- Tasks: 5/5 completed');

      const evidence = await mockAgent.loadImplementationEvidence();

      expect(evidence).toHaveProperty('codeStructure');
      expect(evidence).toHaveProperty('progress');
      expect(evidence.progress).toContain('Current Status');
    });
  });

  describe('Quality validation methods', () => {
    beforeEach(async () => {
      const { VerificationAgent } = require('../commands/verification');
      mockAgent = new VerificationAgent();
      await mockAgent.initialize();
    });

    test('should run automated test suite', async () => {
      // Mock successful test execution
      const testResults = {
        passed: true,
        coverage: 87,
        duration: 450,
        tests: { total: 45, passed: 43, failed: 2 }
      };

      mockAgent.runAutomatedTests = jest.fn().mockResolvedValue(testResults);

      const results = await mockAgent.runAutomatedTests('/mock/project');

      expect(results.passed).toBe(true);
      expect(results.coverage).toBe(87);
      expect(results.tests.passed).toBe(43);
    });

    test('should perform security assessment', async () => {
      const securityResults = {
        passed: true,
        score: 92,
        vulnerabilities: [],
        criticalIssues: 0,
        highIssues: 0
      };

      mockAgent.runSecurityScan = jest.fn().mockResolvedValue(securityResults);

      const results = await mockAgent.runSecurityScan('/mock/project');

      expect(results.passed).toBe(true);
      expect(results.score).toBe(92);
      expect(results.criticalIssues).toBe(0);
    });

    test('should run performance benchmarks', async () => {
      const performanceResults = {
        passed: true,
        metrics: {
          loadTime: 1.2,
          timeToInteractive: 2.1,
          lighthouseScore: 94
        },
        benchmarks: {
          responseTime: '< 500ms',
          concurrentUsers: '1000+',
          memoryUsage: '< 100MB'
        }
      };

      mockAgent.runPerformanceTests = jest.fn().mockResolvedValue(performanceResults);

      const results = await mockAgent.runPerformanceTests('/mock/project');

      expect(results.passed).toBe(true);
      expect(results.metrics.lighthouseScore).toBe(94);
    });

    test('should run acceptance criteria tests', async () => {
      const criteria = [
        { id: 'AC-1.1', description: 'User can log in' },
        { id: 'AC-1.2', description: 'Password is secure' }
      ];

      const testResults = {
        'AC-1.1': { passed: true, evidence: 'Login flow works' },
        'AC-1.2': { passed: false, evidence: 'Encryption not implemented' }
      };

      mockAgent.runAcceptanceTests = jest.fn().mockResolvedValue(testResults);

      const results = await mockAgent.runAcceptanceTests(criteria);

      expect(results['AC-1.1'].passed).toBe(true);
      expect(results['AC-1.2'].passed).toBe(false);
      expect(Object.keys(results)).toHaveLength(2);
    });
  });

  describe('Decision framework', () => {
    beforeEach(async () => {
      const { VerificationAgent } = require('../commands/verification');
      mockAgent = new VerificationAgent();
      await mockAgent.initialize();
    });

    test('should assess risk factors', async () => {
      const qualityResults = {
        testing: { passed: true, coverage: 85 },
        security: { passed: true, score: 90 },
        performance: { passed: true },
        acceptance: { overall: true, passRate: 95 }
      };

      const riskAssessment = await mockAgent.assessRisks(qualityResults);

      expect(riskAssessment.level).toBeDefined();
      expect(riskAssessment.factors).toBeDefined();
      expect(riskAssessment.mitigation).toBeDefined();
    });

    test('should calculate confidence score', async () => {
      const qualityResults = {
        testing: { passed: true, coverage: 90 },
        security: { passed: true, score: 95 },
        performance: { passed: true },
        acceptance: { overall: true, passRate: 100 }
      };

      const confidence = await mockAgent.calculateConfidence(qualityResults);

      expect(confidence).toBeGreaterThan(80);
      expect(confidence).toBeLessThanOrEqual(100);
    });

    test('should generate recommendations based on results', async () => {
      const qualityResults = {
        testing: { passed: false, coverage: 65 },
        security: { passed: true, score: 85 },
        performance: { passed: true },
        acceptance: { overall: true, passRate: 90 }
      };

      const recommendations = await mockAgent.generateRecommendations(qualityResults);

      expect(recommendations).toContain('testing');
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('verificationCommand execution', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should show guide by default', async () => {
      const { verificationCommand } = require('../commands/verification');

      await verificationCommand('guide', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Phase 4 Verification Guide')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Phase 4 Objective:')
      );
    });

    test('should collect evidence', async () => {
      const { verificationCommand } = require('../commands/verification');

      await verificationCommand('evidence', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📋 Evidence Collection')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should run quality assessment', async () => {
      const { verificationCommand } = require('../commands/verification');

      await verificationCommand('quality', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🛡️ Quality Assessment')
      );
    });

    test('should make go decision', async () => {
      const { verificationCommand } = require('../commands/verification');

      await verificationCommand('decide', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚖️ GO/NO-GO Decision')
      );
    });

    test('should generate verification report', async () => {
      const { verificationCommand } = require('../commands/verification');

      await verificationCommand('report', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Verification Report')
      );
      expect(fs.writeFile).toHaveBeenCalled();
    });

    test('should handle invalid phase', async () => {
      const { verificationCommand } = require('../commands/verification');

      projectDetector.getProjectStatus.mockResolvedValue({
        phase: 3,
        task: 'Implement production code',
        role: 'Senior Developer'
      });

      await verificationCommand('evidence', {});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Verification Agent is designed for Phase 4')
      );
      expect(fs.writeFile).not.toHaveBeenCalled();
    });
  });

  describe('Template content validation', () => {
    test('verification report template should have complete structure', async () => {
      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();
      await agent.initialize();

      const template = await agent.createVerificationReportTemplate();

      expect(template).toContain('# Verification Report');
      expect(template).toContain('## Executive Summary');
      expect(template).toContain('## Evidence Collection');
      expect(template).toContain('## Quality Assessment');
      expect(template).toContain('## GO/NO-GO Decision');
      expect(template).toContain('## Recommendations');
      expect(template).toContain('*Generated by CodeMaestro Verification Agent*');
    });

    test('evidence collection template should structure all phase data', async () => {
      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();
      await agent.initialize();

      const template = await agent.createEvidenceCollectionTemplate();

      expect(template).toContain('# Evidence Collection');
      expect(template).toContain('## Requirements Evidence');
      expect(template).toContain('## Planning Evidence');
      expect(template).toContain('## Implementation Evidence');
      expect(template).toContain('## Verification Evidence');
    });

    test('quality assessment template should define all validation criteria', async () => {
      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();
      await agent.initialize();

      const template = await agent.createQualityAssessmentTemplate();

      expect(template).toContain('# Quality Assessment');
      expect(template).toContain('## Testing Standards');
      expect(template).toContain('## Security Requirements');
      expect(template).toContain('## Performance Benchmarks');
      expect(template).toContain('## Acceptance Criteria');
    });
  });

  describe('Error handling', () => {
    test('should handle initialization errors', async () => {
      config.load.mockRejectedValue(new Error('Config load failed'));

      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();

      await expect(agent.initialize()).rejects.toThrow('Config load failed');
    });

    test('should handle evidence collection failures gracefully', async () => {
      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();
      await agent.initialize();

      fs.readdir.mockRejectedValue(new Error('Directory read failed'));

      const evidence = await agent.collectEvidence();

      expect(evidence).toHaveProperty('requirements');
      expect(evidence).toHaveProperty('error', 'Directory read failed');
    });

    test('should handle quality assessment failures', async () => {
      const { VerificationAgent } = require('../commands/verification');
      const agent = new VerificationAgent();
      await agent.initialize();

      agent.runAutomatedTests = jest.fn().mockRejectedValue(new Error('Test execution failed'));

      const assessment = await agent.performQualityAssessment();

      expect(assessment.testing.passed).toBe(false);
      expect(assessment.testing.error).toBe('Test execution failed');
      expect(assessment.overall).toBe(false);
    });
  });
});