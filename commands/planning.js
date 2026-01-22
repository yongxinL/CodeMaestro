#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const config = require('../lib/config');
const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Planning Agent for Phase 2
 * Provides interactive guidance for technical planning and architecture
 */
class PlanningAgent {
  constructor() {
    this.projectConfig = null;
    this.planningDir = null;
  }

  async initialize() {
    this.projectConfig = await config.load();
    this.planningDir = this.projectConfig.paths.planning;
    await fs.ensureDir(this.planningDir);
  }

  /**
   * Interactive question asking (simulates ask-user-questions-mcp)
   */
  async askQuestion(question, options = {}) {
    const {
      required = true,
      defaultValue = '',
      validate = null,
      hint = '',
      multiple = false
    } = options;

    console.log('');
    console.log(chalk.bold.blue('❓ ' + question));

    if (hint) {
      console.log(chalk.gray('   💡 ' + hint));
    }

    if (defaultValue) {
      console.log(chalk.gray(`   Default: ${defaultValue}`));
    }

    if (multiple) {
      console.log(chalk.gray('   Enter multiple items (press Enter twice to finish):'));
    }

    // Simulate user input (in real implementation, this would use the MCP tool)
    console.log(chalk.yellow('   📝 Please provide this information in the generated template'));
    console.log(chalk.gray('   Template will be created with placeholders for you to fill in'));

    return defaultValue || '[Please fill in]';
  }

  /**
   * Ask multiple choice question
   */
  async askMultipleChoice(question, choices, options = {}) {
    const { required = true, multiple = false } = options;

    console.log('');
    console.log(chalk.bold.blue('❓ ' + question));

    if (multiple) {
      console.log(chalk.gray('   Select multiple (comma-separated numbers):'));
    }

    choices.forEach((choice, index) => {
      console.log(`   ${index + 1}. ${choice}`);
    });

    if (!required) {
      console.log('   0. Skip this question');
    }

    console.log(chalk.yellow('   📝 Template will include guidance for your selection'));
    console.log(chalk.gray('   Choose the most appropriate option(s) when editing the template'));

    return '[See template for options]';
  }

  async validatePhase() {
    const status = await projectDetector.getProjectStatus();
    if (status.phase !== 2) {
      console.log(chalk.yellow('⚠️  Planning Agent is designed for Phase 2.'));
      console.log(chalk.gray(`   Current phase: ${status.phase || 'None'}`));
      console.log(chalk.gray('   Use \'/codem-phase 2\' to switch to planning phase.'));
      return false;
    }
    return true;
  }

  async gatherArchitectureInfo() {
    console.log(chalk.bold.yellow('🏗️  Gathering Architecture Information'));
    console.log('');

    const architecture = {};

    architecture.approach = await this.askMultipleChoice(
      'What is your preferred architecture approach?',
      [
        'Monolithic Application - Single deployable unit',
        'Microservices - Independently deployable services',
        'Serverless - Event-driven functions',
        'Hybrid - Mix of monolithic and microservices',
        'Modular Monolith - Single process, modular structure'
      ]
    );

    architecture.frontend = await this.askMultipleChoice(
      'What frontend technology will you use?',
      [
        'React.js - Component-based UI library',
        'Vue.js - Progressive JavaScript framework',
        'Angular - Full-featured framework',
        'Svelte - Compiler-based framework',
        'Vanilla JavaScript - No framework',
        'Web Components - Native browser components',
        'Mobile Native - iOS/Android native apps'
      ]
    );

    architecture.backend = await this.askMultipleChoice(
      'What backend technology will you use?',
      [
        'Node.js/Express - JavaScript runtime',
        'Python/Django - Full-stack web framework',
        'Python/FastAPI - Modern async API framework',
        'Ruby on Rails - Convention over configuration',
        'Java/Spring Boot - Enterprise Java framework',
        'Go - High-performance compiled language',
        'Rust - Memory-safe systems programming',
        'C#/.NET - Microsoft ecosystem',
        'PHP/Laravel - Popular web framework'
      ]
    );

    architecture.database = await this.askMultipleChoice(
      'What database technology will you use?',
      [
        'PostgreSQL - Advanced open source RDBMS',
        'MySQL - Popular open source RDBMS',
        'MongoDB - NoSQL document database',
        'Redis - In-memory data structure store',
        'SQLite - Embedded database',
        'DynamoDB - AWS managed NoSQL',
        'Firebase/Firestore - Google managed database',
        'Supabase - Open source Firebase alternative'
      ],
      { multiple: true }
    );

    architecture.infrastructure = await this.askMultipleChoice(
      'What infrastructure will you use?',
      [
        'AWS - Amazon Web Services',
        'Google Cloud Platform',
        'Microsoft Azure',
        'DigitalOcean - Simple cloud hosting',
        'Heroku - Platform as a Service',
        'Vercel/Netlify - Frontend deployment',
        'Self-hosted - On-premise or VPS',
        'Hybrid - Mix of cloud and on-premise'
      ]
    );

    return architecture;
  }

  async gatherTaskBreakdown(requirements) {
    console.log(chalk.bold.yellow('📋 Gathering Task Breakdown'));
    console.log('');

    const tasks = {};

    tasks.epics = await this.askQuestion(
      'What are the main epics or feature areas?',
      {
        hint: 'Break down requirements into major functional areas',
        multiple: true,
        example: '1. User Authentication, 2. Core Product Features, 3. Admin Dashboard, 4. API Development'
      }
    );

    tasks.sprints = await this.askQuestion(
      'How many development sprints do you anticipate?',
      {
        hint: 'Typically 2-4 weeks per sprint',
        defaultValue: '4-6 sprints',
        example: '6 sprints (3 months total development)'
      }
    );

    tasks.teamSize = await this.askQuestion(
      'What is your development team size?',
      {
        hint: 'Include all roles: developers, designers, QA, etc.',
        defaultValue: '3-5 developers',
        example: '2 frontend devs, 2 backend devs, 1 QA, 1 designer'
      }
    );

    tasks.complexity = await this.askMultipleChoice(
      'What is the overall complexity level?',
      [
        'Low - Standard CRUD application, well-understood domain',
        'Medium - Some complex business logic, integrations required',
        'High - Complex domain, advanced algorithms, real-time features',
        'Very High - Mission-critical, high-security, distributed systems'
      ]
    );

    return tasks;
  }

  async gatherTechnicalConstraints() {
    console.log(chalk.bold.yellow('🔒 Gathering Technical Constraints'));
    console.log('');

    const constraints = {};

    constraints.budget = await this.askQuestion(
      'What is your development budget range?',
      {
        hint: 'Include infrastructure, tools, and team costs',
        example: '$50K-100K, $100K-500K, $500K+, etc.'
      }
    );

    constraints.timeline = await this.askQuestion(
      'What is your timeline requirement?',
      {
        hint: 'Time to market or completion deadline',
        example: 'MVP in 3 months, full release in 6 months'
      }
    );

    constraints.scalability = await this.askQuestion(
      'What are your scalability requirements?',
      {
        hint: 'Expected user load and growth projections',
        example: '100 users initially, 10K users in 6 months, 100K users in 1 year'
      }
    );

    constraints.compliance = await this.askMultipleChoice(
      'Are there any compliance requirements?',
      [
        'GDPR - EU data protection',
        'HIPAA - Healthcare data',
        'SOX - Financial reporting',
        'PCI DSS - Payment processing',
        'None - No specific compliance needs'
      ],
      { multiple: true, required: false }
    );

    return constraints;
  }

  async generateTaskDAG(epics, sprints) {
    // Generate a basic task dependency graph
    const tasks = [];

    if (!epics || epics === '[Please fill in]') {
      // Default task structure
      tasks.push(
        { id: 'T1', name: 'Setup Development Environment', phase: 'Sprint 1', dependencies: [], estimate: '1-2 days' },
        { id: 'T2', name: 'Database Design & Setup', phase: 'Sprint 1', dependencies: [], estimate: '2-3 days' },
        { id: 'T3', name: 'User Authentication System', phase: 'Sprint 1', dependencies: ['T1'], estimate: '3-5 days' },
        { id: 'T4', name: 'Core API Development', phase: 'Sprint 2', dependencies: ['T2', 'T3'], estimate: '5-7 days' },
        { id: 'T5', name: 'Frontend Framework Setup', phase: 'Sprint 2', dependencies: ['T1'], estimate: '3-4 days' },
        { id: 'T6', name: 'Main UI Components', phase: 'Sprint 3', dependencies: ['T4', 'T5'], estimate: '5-7 days' },
        { id: 'T7', name: 'Integration & Testing', phase: 'Sprint 4', dependencies: ['T6'], estimate: '3-5 days' },
        { id: 'T8', name: 'Deployment & Launch', phase: 'Sprint 4', dependencies: ['T7'], estimate: '2-3 days' }
      );
    } else {
      // Generate tasks based on provided epics
      const epicList = epics.split(',').map(e => e.trim());
      let taskId = 1;

      epicList.forEach((epic, index) => {
        const sprintNum = Math.floor(index / 2) + 1;
        tasks.push({
          id: `T${taskId++}`,
          name: `Epic ${index + 1}: ${epic}`,
          phase: `Sprint ${sprintNum}`,
          dependencies: index > 0 ? [`T${taskId - 2}`] : [],
          estimate: '5-8 days'
        });
      });

      // Add standard tasks
      tasks.push(
        { id: `T${taskId++}`, name: 'Setup & Infrastructure', phase: 'Sprint 1', dependencies: [], estimate: '3-4 days' },
        { id: `T${taskId++}`, name: 'Testing & QA', phase: `Sprint ${Math.ceil(tasks.length / 2)}`, dependencies: tasks.slice(-2).map(t => t.id), estimate: '4-5 days' },
        { id: `T${taskId++}`, name: 'Deployment & Launch', phase: `Sprint ${Math.ceil(tasks.length / 2)}`, dependencies: [`T${taskId - 2}`], estimate: '2-3 days' }
      );
    }

    return tasks;
  }

  async estimateTokens(tasks, complexity, teamSize) {
    // Basic token estimation logic
    let baseTokens = 10000; // Base tokens for any project

    // Adjust for complexity
    const complexityMultiplier = {
      'Low': 1.0,
      'Medium': 1.5,
      'High': 2.0,
      'Very High': 3.0
    };

    baseTokens *= complexityMultiplier[complexity] || 1.5;

    // Adjust for team size (smaller teams need more tokens per person)
    const teamMultiplier = teamSize ? Math.max(0.8, 5 / parseInt(teamSize.split('-')[0] || 3)) : 1.2;
    baseTokens *= teamMultiplier;

    // Adjust for number of tasks
    baseTokens += tasks.length * 500;

    return {
      planningPhase: Math.round(baseTokens * 0.2),
      implementationPhase: Math.round(baseTokens * 0.6),
      testingPhase: Math.round(baseTokens * 0.15),
      deploymentPhase: Math.round(baseTokens * 0.05),
      total: Math.round(baseTokens)
    };
  }

  async createBlueprintTemplate(architecture, tasks, constraints, tokenEstimates) {
    const template = `# Technical Blueprint

## Executive Summary

**Project:** [Project Name]
**Date:** ${new Date().toISOString().split('T')[0]}
**Version:** 1.0
**Author:** [Technical Lead]

### Architecture Overview
${architecture.approach || '**Architecture Approach:** [To be determined]'}

### Key Technical Decisions
- **Frontend:** ${architecture.frontend || '[Framework/Language]'}
- **Backend:** ${architecture.backend || '[Framework/Language]'}
- **Database:** ${architecture.database || '[Database Technology]'}
- **Infrastructure:** ${architecture.infrastructure || '[Cloud/Provider]'}

## Architecture Decisions

### System Architecture
**Chosen Approach:** ${architecture.approach || '[Architecture pattern]'}

#### Rationale
[Explain why this architecture was chosen]

#### Benefits
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

#### Trade-offs
- [Trade-off 1]
- [Trade-off 2]

### Technology Stack

#### Frontend Technologies
**Primary Framework:** ${architecture.frontend || '[Framework]'}
**Supporting Libraries:**
- [Library 1] - [Purpose]
- [Library 2] - [Purpose]
- [Library 3] - [Purpose]

**UI/UX Considerations:**
- [Design system approach]
- [Responsive design strategy]
- [Accessibility requirements]

#### Backend Technologies
**Primary Framework:** ${architecture.backend || '[Framework]'}
**API Design:**
- RESTful APIs
- GraphQL (if applicable)
- WebSocket for real-time features (if applicable)

**Supporting Technologies:**
- [Technology 1] - [Purpose]
- [Technology 2] - [Purpose]

#### Database & Storage
**Primary Database:** ${architecture.database || '[Database]'}
**Data Architecture:**
- [Data modeling approach]
- [Caching strategy]
- [Backup and recovery]

**Supporting Storage:**
- [File storage solution]
- [CDN strategy]

### Infrastructure & Deployment

#### Hosting Platform
**Chosen Provider:** ${architecture.infrastructure || '[Provider]'}
**Deployment Strategy:**
- [CI/CD pipeline]
- [Containerization approach]
- [Scaling strategy]

#### Security Measures
- [Authentication system]
- [Authorization model]
- [Data encryption approach]
- [Security monitoring]

## Task Breakdown & Dependencies

### Task Overview
Total Tasks: [${tasks.length || 'TBD'}]
Estimated Timeline: [${tasks.length ? `${Math.ceil(tasks.length / 3)} sprints` : 'TBD'}]

### Task Dependency Graph

\`\`\`mermaid
graph TD
${tasks.map(task =>
  `    ${task.id}["${task.name}<br/>${task.phase}<br/>${task.estimate}"]`
).join('\n')}
${tasks.map(task =>
  task.dependencies.map(dep => `    ${dep} --> ${task.id}`).join('\n')
).join('\n')}
\`\`\`

### Detailed Task List

| Task ID | Task Name | Sprint | Dependencies | Estimate | Status |
|---------|-----------|--------|--------------|----------|--------|
${tasks.map(task => `| ${task.id} | ${task.name} | ${task.phase} | ${task.dependencies.join(', ') || 'None'} | ${task.estimate} | Not Started |`).join('\n')}

## Token Budget & Resource Planning

### Token Estimates

| Phase | Token Budget | Percentage |
|-------|-------------|------------|
| Planning | ${tokenEstimates.planningPhase.toLocaleString()} | 20% |
| Implementation | ${tokenEstimates.implementationPhase.toLocaleString()} | 60% |
| Testing | ${tokenEstimates.testingPhase.toLocaleString()} | 15% |
| Deployment | ${tokenEstimates.deploymentPhase.toLocaleString()} | 5% |
| **Total** | **${tokenEstimates.total.toLocaleString()}** | **100%** |

### Resource Requirements

#### Team Composition
${constraints.teamSize || '[Team size and roles]'}

#### Timeline
- **Planning Phase:** 1-2 weeks
- **Implementation:** [Timeline based on tasks]
- **Testing:** [Timeline based on complexity]
- **Deployment:** [Timeline based on infrastructure]

### Risk Mitigation
- [Risk 1] - [Mitigation strategy]
- [Risk 2] - [Mitigation strategy]
- [Risk 3] - [Mitigation strategy]

## Quality Gates & Success Criteria

### Definition of Done
- [ ] Code reviews completed
- [ ] Unit tests passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Accessibility compliance verified

### Success Metrics
- [ ] All tasks completed within estimated time
- [ ] Token usage within ±10% of budget
- [ ] Zero critical security issues
- [ ] User acceptance testing passed
- [ ] Performance requirements met

## Next Steps

### Immediate Actions (Next Sprint)
1. Set up development environment
2. Initialize project repository
3. Create basic project structure
4. Set up CI/CD pipeline

### Phase 2 Deliverables
- [ ] Technical blueprint finalized
- [ ] Task breakdown approved
- [ ] Token budget allocated
- [ ] Development team assembled
- [ ] Project timeline confirmed

### Phase 3 Preparation
- [ ] Development environment ready
- [ ] Basic architecture implemented
- [ ] First user story completed
- [ ] Initial deployment pipeline working

---

*Generated by CodeMaestro Planning Agent*
*Phase 2: Technical Planning*
`;

    return template;
  }

  async createGanttChartTemplate(tasks) {
    // Generate a simple ASCII Gantt chart
    const sprints = [...new Set(tasks.map(t => t.sprint || t.phase))];
    const maxSprint = Math.max(...sprints.map(s => parseInt(s.split(' ')[1] || 1)));

    let ganttChart = '# Project Timeline (Gantt Chart)\n\n';
    ganttChart += '## Sprint Overview\n\n';
    ganttChart += '| Sprint | Duration | Key Deliverables |\n';
    ganttChart += '|--------|----------|------------------|\n';

    for (let i = 1; i <= maxSprint; i++) {
      const sprintTasks = tasks.filter(t => (t.sprint || t.phase) === `Sprint ${i}`);
      const deliverables = sprintTasks.map(t => t.name).join('<br/>');
      ganttChart += `| Sprint ${i} | 2 weeks | ${deliverables} |\n`;
    }

    ganttChart += '\n## Detailed Timeline\n\n';
    ganttChart += '```\n';
    ganttChart += 'Week:  1    2    3    4    5    6    7    8    9    10   11   12\n';
    ganttChart += '       ';
    for (let i = 1; i <= maxSprint; i++) {
      ganttChart += `█████ █████`;
      if (i < maxSprint) ganttChart += ' ';
    }
    ganttChart += '\n';
    ganttChart += 'Sprint:';
    for (let i = 1; i <= maxSprint; i++) {
      ganttChart += `  ${i}      ${i}  `;
    }
    ganttChart += '\n\n';

    // Add task details
    tasks.forEach(task => {
      const sprintNum = parseInt((task.sprint || task.phase).split(' ')[1] || 1);
      const startWeek = (sprintNum - 1) * 2 + 1;
      const duration = parseInt(task.estimate.split('-')[0] || '3');
      const weeks = Math.ceil(duration / 5); // Assume 5 days per week

      ganttChart += `${task.id}: ${task.name.substring(0, 30)}${' '.repeat(30 - task.name.substring(0, 30).length)} `;

      for (let week = 1; week <= maxSprint * 2; week++) {
        if (week >= startWeek && week < startWeek + weeks) {
          ganttChart += '█';
        } else {
          ganttChart += '░';
        }
      }
      ganttChart += '\n';
    });

    ganttChart += '```\n\n';
    ganttChart += '*Legend: █ = Active work, ░ = Not active*\n\n';
    ganttChart += '## Milestones\n\n';
    ganttChart += '- **Sprint 1 Complete:** Basic infrastructure ready\n';
    ganttChart += '- **Sprint 2 Complete:** Core features implemented\n';
    ganttChart += '- **Sprint 3 Complete:** MVP ready for testing\n';
    ganttChart += '- **Final Sprint:** Production deployment\n\n';

    return ganttChart;
  }

  async listExistingDocuments() {
    try {
      const files = await fs.readdir(this.planningDir);
      return files.filter(file => file.endsWith('.md'));
    } catch (error) {
      return [];
    }
  }

  async saveDocument(filename, content) {
    const filePath = path.join(this.planningDir, filename);
    await fs.writeFile(filePath, content);
    return filePath;
  }
}

/**
 * Main planning command
 */
async function planningCommand(action, options) {
  try {
    logger.info('Starting Planning Agent...');

    const agent = new PlanningAgent();
    await agent.initialize();

    // Check if we're in the right phase
    if (!await agent.validatePhase()) {
      return;
    }

    console.log(chalk.bold.blue('🎯 CodeMaestro Planning Agent'));
    console.log('═'.repeat(50));
    console.log(chalk.bold('Phase 2: Technical Planning'));
    console.log('');

    switch (action) {
    case 'blueprint':
    case 'architecture':
      await handleBlueprint(agent, options);
      break;

    case 'tasks':
    case 'dag':
      await handleTaskPlanning(agent, options);
      break;

    case 'timeline':
    case 'gantt':
      await handleTimeline(agent, options);
      break;

    case 'list':
      await handleListDocuments(agent);
      break;

    case 'guide':
    default:
      await showPlanningGuide(agent);
      break;
    }

  } catch (error) {
    logger.error('Planning agent failed', error);
    console.log(chalk.red(`\n❌ Planning agent failed: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Handle blueprint creation
 */
async function handleBlueprint(agent, options) {
  console.log(chalk.bold.yellow('🏗️  Technical Blueprint Creation'));
  console.log('');

  if (options.interactive) {
    console.log(chalk.cyan('Starting interactive blueprint creation...'));
    console.log(chalk.gray('I\'ll guide you through architecture decisions and technical planning.'));
    console.log('');

    const architecture = await agent.gatherArchitectureInfo();
    const tasks = await agent.gatherTaskBreakdown();
    const constraints = await agent.gatherTechnicalConstraints();

    const taskList = await agent.generateTaskDAG(tasks.epics, tasks.sprints);
    const tokenEstimates = await agent.estimateTokens(taskList, tasks.complexity, tasks.teamSize);

    const template = await agent.createBlueprintTemplate(architecture, taskList, constraints, tokenEstimates);
    const filename = `interactive-technical-blueprint-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log('');
    console.log(chalk.green(`✅ Interactive blueprint created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('📋 Next steps:'));
    console.log('   1. Review and refine the architecture decisions');
    console.log('   2. Validate technical choices with team');
    console.log('   3. Share blueprint with stakeholders');
    console.log('   4. Use /codem-next to advance to implementation');

  } else if (options.template) {
    const template = await agent.createBlueprintTemplate({}, [], {}, { planningPhase: 0, implementationPhase: 0, testingPhase: 0, deploymentPhase: 0, total: 0 });
    const filename = `technical-blueprint-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log(chalk.green(`✅ Blueprint template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('📝 Next steps:'));
    console.log('   1. Fill in architecture decisions');
    console.log('   2. Define technology stack');
    console.log('   3. Create task breakdown');
    console.log('   4. Estimate resources and timeline');
  } else {
    console.log('Create a comprehensive technical blueprint.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-planning blueprint --interactive    # Interactive guided creation');
    console.log('  /codem-planning blueprint --template       # Create blank template');
    console.log('');
    console.log(chalk.cyan('Options:'));
    console.log('  --interactive    Guided questions for blueprint creation');
    console.log('  --template       Create blueprint template');
  }
}

/**
 * Handle task planning
 */
async function handleTaskPlanning(agent, options) {
  console.log(chalk.bold.yellow('📋 Task Planning & DAG Generation'));
  console.log('');

  if (options.interactive) {
    console.log(chalk.cyan('Starting interactive task planning...'));
    console.log(chalk.gray('I\'ll help you break down work into manageable tasks with dependencies.'));
    console.log('');

    const tasks = await agent.gatherTaskBreakdown();
    const taskList = await agent.generateTaskDAG(tasks.epics, tasks.sprints);

    // Create a focused task planning document
    const template = `# Task Planning & Dependencies

## Overview

**Project:** [Project Name]
**Date:** ${new Date().toISOString().split('T')[0]}
**Planning Approach:** ${tasks.complexity || '[Complexity level]'}

### Team Information
- **Team Size:** ${tasks.teamSize || '[Team composition]'}
- **Sprint Duration:** 2 weeks
- **Total Sprints:** ${tasks.sprints || '[Number of sprints]'}

## Task Breakdown

### Epics Identified
${tasks.epics && tasks.epics !== '[Please fill in]' ?
  tasks.epics.split(',').map((epic, index) => `${index + 1}. ${epic.trim()}`).join('\n') :
  '1. [Epic 1]\n2. [Epic 2]\n3. [Epic 3]'}

## Task Dependency Graph

\`\`\`mermaid
graph TD
${taskList.map(task =>
  `    ${task.id}["${task.name}<br/>${task.phase}<br/>${task.estimate}"]`
).join('\n')}
${taskList.map(task =>
  task.dependencies.map(dep => `    ${dep} --> ${task.id}`).join('\n')
).join('\n')}
\`\`\`

### Detailed Task List

| Task ID | Task Name | Sprint | Dependencies | Estimate | Priority |
|---------|-----------|--------|--------------|----------|----------|
${taskList.map(task => `| ${task.id} | ${task.name} | ${task.phase} | ${task.dependencies.join(', ') || 'None'} | ${task.estimate} | Medium |`).join('\n')}

## Sprint Planning

### Sprint Capacity
- **Team Velocity:** [Estimate based on team size and experience]
- **Available Hours per Sprint:** [Calculate based on team size]
- **Buffer for Uncertainty:** 20%

### Sprint Goals
${Array.from({ length: Math.ceil(taskList.length / 3) }, (_, i) => {
  const sprintTasks = taskList.filter(t => (t.sprint || t.phase) === `Sprint ${i + 1}`);
  return `#### Sprint ${i + 1}\n- ${sprintTasks.map(t => t.name).join('\n- ')}\n`;
}).join('\n')}

## Risk Assessment

### High-Risk Tasks
[Identify tasks that could impact timeline]

### Mitigation Strategies
- [Strategy 1]
- [Strategy 2]
- [Strategy 3]

---

*Generated by CodeMaestro Planning Agent*
*Phase 2: Task Planning*
`;

    const filename = `interactive-task-planning-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log('');
    console.log(chalk.green(`✅ Interactive task planning created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('🎯 Next steps:'));
    console.log('   1. Review task breakdown and dependencies');
    console.log('   2. Validate estimates with team');
    console.log('   3. Create detailed sprint backlog');
    console.log('   4. Set up project tracking tools');

  } else if (options.template) {
    const template = await agent.createBlueprintTemplate({}, [], {}, { planningPhase: 0, implementationPhase: 0, testingPhase: 0, deploymentPhase: 0, total: 0 });
    const filename = `task-planning-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log(chalk.green(`✅ Task planning template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
  } else {
    console.log('Plan tasks and create dependency graphs.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-planning tasks --interactive    # Interactive task breakdown');
    console.log('  /codem-planning tasks --template       # Create task planning template');
  }
}

/**
 * Handle timeline creation
 */
async function handleTimeline(agent, options) {
  console.log(chalk.bold.yellow('📅 Project Timeline & Gantt Chart'));
  console.log('');

  if (options.interactive) {
    console.log(chalk.cyan('Creating project timeline...'));
    console.log(chalk.gray('I\'ll generate a timeline based on your task breakdown.'));
    console.log('');

    const tasks = await agent.gatherTaskBreakdown();
    const taskList = await agent.generateTaskDAG(tasks.epics, tasks.sprints);
    const ganttTemplate = await agent.createGanttChartTemplate(taskList);

    const filename = `interactive-project-timeline-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, ganttTemplate);

    console.log('');
    console.log(chalk.green(`✅ Project timeline created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('⏰ Timeline management:'));
    console.log('   1. Review sprint milestones');
    console.log('   2. Identify critical path tasks');
    console.log('   3. Set up progress tracking');
    console.log('   4. Plan resource allocation');

  } else if (options.template) {
    const ganttTemplate = await agent.createGanttChartTemplate([]);
    const filename = `project-timeline-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, ganttTemplate);

    console.log(chalk.green(`✅ Timeline template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
  } else {
    console.log('Create project timelines and Gantt charts.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-planning timeline --interactive    # Generate timeline from tasks');
    console.log('  /codem-planning timeline --template       # Create timeline template');
  }
}

/**
 * Handle listing existing documents
 */
async function handleListDocuments(agent) {
  console.log(chalk.bold.yellow('📁 Existing Planning Documents'));
  console.log('');

  const documents = await agent.listExistingDocuments();

  if (documents.length === 0) {
    console.log(chalk.gray('No planning documents found.'));
    console.log('');
    console.log(chalk.cyan('Create your first document:'));
    console.log('  /codem-planning blueprint --template');
    console.log('  /codem-planning tasks --template');
    console.log('  /codem-planning timeline --template');
  } else {
    console.log(chalk.gray(`Found ${documents.length} document(s) in docs/planning/:`));
    console.log('');

    documents.forEach((doc, index) => {
      const docPath = path.join('docs/planning', doc);
      console.log(`${index + 1}. ${chalk.cyan(doc)}`);
      console.log(`   ${chalk.gray(docPath)}`);
      console.log('');
    });

    console.log(chalk.cyan('Edit documents with your preferred markdown editor.'));
  }
}

/**
 * Show planning guide
 */
async function showPlanningGuide(agent) {
  console.log(chalk.bold.yellow('📋 Phase 2 Planning Guide'));
  console.log('');

  console.log(chalk.bold('Phase 2 Objective:'));
  console.log('Create detailed technical plans and resource estimates for implementation.');
  console.log('');

  console.log(chalk.bold('Key Activities:'));
  console.log('1. 🏗️ Technical Blueprint - Define architecture and technology stack');
  console.log('2. 📋 Task Planning - Break down work and identify dependencies');
  console.log('3. 📅 Timeline Creation - Create project schedule and milestones');
  console.log('4. 💰 Resource Estimation - Calculate token budgets and team needs');
  console.log('');

  console.log(chalk.bold('Available Commands:'));
  console.log('');
  console.log(chalk.cyan('/codem-planning blueprint --interactive'));
  console.log('  Interactive technical blueprint creation');
  console.log(chalk.cyan('/codem-planning tasks --interactive'));
  console.log('  Interactive task breakdown and DAG generation');
  console.log(chalk.cyan('/codem-planning timeline --interactive'));
  console.log('  Interactive timeline and Gantt chart creation');
  console.log('');
  console.log(chalk.cyan('/codem-planning blueprint --template'));
  console.log('  Create technical blueprint template');
  console.log(chalk.cyan('/codem-planning tasks --template'));
  console.log('  Create task planning template');
  console.log(chalk.cyan('/codem-planning timeline --template'));
  console.log('  Create timeline template');
  console.log('');
  console.log(chalk.cyan('/codem-planning list'));
  console.log('  List existing planning documents');
  console.log('');

  console.log(chalk.bold('Recommended Workflow:'));
  console.log('1. Start with technical blueprint');
  console.log('2. Break down into detailed tasks');
  console.log('3. Create timeline and resource estimates');
  console.log('4. Validate plans with stakeholders');
  console.log('5. Use /codem-next to advance to implementation');
  console.log('');

  console.log(chalk.bold('Integration with Other Tools:'));
  console.log('• /codem-research - Technology comparisons and evaluations');
  console.log('• /codem-lookup - API and library documentation');
  console.log('• /codem-kb add - Document architectural decisions');
  console.log('• /codem-commit - Save progress with meaningful commits');
  console.log('');

  const documents = await agent.listExistingDocuments();
  if (documents && documents.length > 0) {
    console.log(chalk.green(`📁 You have ${documents.length} existing planning document(s).`));
    console.log(chalk.gray('Use /codem-planning list to see them.'));
  } else {
    console.log(chalk.yellow('📝 No planning documents created yet.'));
    console.log(chalk.gray('Start with: /codem-planning blueprint --interactive'));
  }
}

// CLI setup
program
  .name('codem-planning')
  .description('Planning Agent for Phase 2 - Technical planning and architecture')
  .argument('[action]', 'Action to perform (blueprint|tasks|timeline|list|guide)', 'guide')
  .option('-t, --template', 'Create template for the specified action')
  .option('-i, --interactive', 'Interactive guided creation with questions')
  .action(planningCommand);

// Export for testing
module.exports = {
  PlanningAgent,
  planningCommand
};

// Only parse if this file is run directly
if (require.main === module) {
  program.parse();
}