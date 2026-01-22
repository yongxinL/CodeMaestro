#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const config = require('../lib/config');
const logger = require('../lib/logger');
const projectDetector = require('../lib/project');

/**
 * Requirements Agent for Phase 1
 * Provides interactive guidance for specification creation
 */
class RequirementsAgent {
  constructor() {
    this.projectConfig = null;
    this.specsDir = null;
  }

  async initialize() {
    this.projectConfig = await config.load();
    this.specsDir = this.projectConfig.paths.specifications;
    await fs.ensureDir(this.specsDir);
  }

  /**
   * Interactive question asking (simulates ask-user-questions-mcp)
   * In production, this would integrate with the actual MCP tool
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
    // For now, we'll provide guided examples and let users fill in templates
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
    if (status.phase !== 1) {
      console.log(chalk.yellow('⚠️  Requirements Agent is designed for Phase 1.'));
      console.log(chalk.gray(`   Current phase: ${status.phase || 'None'}`));
      console.log(chalk.gray('   Use \'/codem-phase 1\' to switch to requirements phase.'));
      return false;
    }
    return true;
  }

  async createInteractiveSpecificationTemplate(productInfo, requirements) {
    const template = `# Product Specification

## Executive Summary

**Product Name:** ${productInfo.name || '[Product Name]'}
**Version:** 1.0.0
**Date:** ${new Date().toISOString().split('T')[0]}
**Author:** [Your Name]

### Problem Statement
${productInfo.problem || '[Describe the problem this product solves]'}

### Solution Overview
${productInfo.solution || '[High-level description of the proposed solution]'}

### Success Metrics
[Key metrics that define success - e.g., user adoption, revenue targets, quality metrics]

## Target Market & Users

### Primary Market
${productInfo.category || '[Market category]'}

### Target Users
${productInfo.targetUsers || '[Describe primary user personas]'}

### Market Size
${productInfo.marketSize || '[Estimated market size if known]'}

## Requirements

### Functional Requirements

#### Core Features
${requirements.functional && requirements.functional.length > 0 ?
  requirements.functional.map((feature, index) =>
    `${index + 1}. **${feature}**
   - Description: [Detailed description of ${feature.toLowerCase()}]
   - User Stories: [As a user, I want... so that...]
   - Acceptance Criteria: [Specific, measurable conditions]`
  ).join('\n\n') :
  `1. **Feature 1**
   - Description: [Detailed description]
   - User Stories: [As a user, I want... so that...]
   - Acceptance Criteria: [Specific, measurable conditions]

2. **Feature 2**
   - Description: [Detailed description]
   - User Stories: [As a user, I want... so that...]
   - Acceptance Criteria: [Specific, measurable conditions]`
}

#### Secondary Features
[Additional features that enhance the product]

### Non-Functional Requirements

#### Performance
- Response Time: ${requirements.nonFunctional?.performance || '[Requirements]'}
- Throughput: [Requirements]
- Scalability: [Requirements]

#### Security
- Authentication: ${requirements.nonFunctional?.security || '[Requirements]'}
- Authorization: [Requirements]
- Data Protection: [Requirements]

#### Usability
- User Interface: ${requirements.nonFunctional?.usability || '[Requirements]'}
- Accessibility: [Requirements]
- Documentation: [Requirements]

#### Compatibility
- Browser Support: [Requirements]
- Device Support: [Requirements]
- API Versions: [Requirements]

## Constraints

### Technical Constraints
[List of technical limitations or requirements]

### Business Constraints
[List of business limitations or requirements]

### Regulatory Constraints
[List of legal or regulatory requirements]

## Assumptions

### Technical Assumptions
[Assumptions about technology, infrastructure, etc.]

### Business Assumptions
[Assumptions about market, users, business model, etc.]

## Dependencies

### Internal Dependencies
[Dependencies on other teams or systems]

### External Dependencies
[Dependencies on third-party services or APIs]

## Risk Assessment

### High Risk Items
[Items that could significantly impact the project]

### Mitigation Strategies
[Plans to address identified risks]

## Stakeholder Analysis

### Primary Stakeholders
- [Stakeholder 1]: [Role and interests]
- [Stakeholder 2]: [Role and interests]

### Secondary Stakeholders
- [Stakeholder 1]: [Role and interests]

## Competitive Analysis

### Direct Competitors
1. **Competitor 1**
   - Strengths: [List]
   - Weaknesses: [List]
   - Market Share: [Percentage]

2. **Competitor 2**
   - Strengths: [List]
   - Weaknesses: [List]
   - Market Share: [Percentage]

### Indirect Competitors
[Companies offering alternative solutions]

### Competitive Advantages
[What makes this product unique]

## Market Analysis

### Target Market
- **Primary Market:** [Description and size]
- **Secondary Market:** [Description and size]

### Market Trends
[Current trends affecting this market]

### Opportunity Assessment
[Market opportunities and gaps]

## User Personas

### Primary Persona: [Name]
- **Demographics:** [Age, location, occupation, etc.]
- **Goals:** [What they want to achieve]
- **Pain Points:** [Current challenges]
- **Technology Usage:** [Technical proficiency]

### Secondary Persona: [Name]
- **Demographics:** [Age, location, occupation, etc.]
- **Goals:** [What they want to achieve]
- **Pain Points:** [Current challenges]
- **Technology Usage:** [Technical proficiency]

## User Stories

### Epic 1: [Epic Name]
**As a** [type of user]
**I want** [some goal]
**So that** [some reason]

#### Stories:
1. **Story 1**
   - **As a** [user]
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]
     - [Criterion 3]

2. **Story 2**
   - **As a** [user]
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]

## Success Metrics

### Quantitative Metrics
- [Metric 1]: Target [value] by [date]
- [Metric 2]: Target [value] by [date]

### Qualitative Metrics
- User satisfaction: [Target score] on [scale]
- Feature adoption: [Target percentage] within [timeframe]

## Next Steps

### Phase 1 Completion Checklist
- [ ] Specification document completed
- [ ] Requirements validated with stakeholders
- [ ] Competitive analysis completed
- [ ] User stories written and prioritized
- [ ] Success metrics defined
- [ ] Technical feasibility assessed

### Phase 2 Preparation
- [ ] Technical architecture planned
- [ ] Development team assembled
- [ ] Project timeline created
- [ ] Resource requirements identified

---

*Generated by CodeMaestro Requirements Agent*
*Phase 1: Requirements*
`;

    return template;
  }

  async createSpecificationTemplate() {
    const template = `# Product Specification

## Executive Summary

**Product Name:** [Product Name]
**Version:** 1.0.0
**Date:** ${new Date().toISOString().split('T')[0]}
**Author:** [Your Name]

### Problem Statement
[Describe the problem this product solves]

### Solution Overview
[High-level description of the proposed solution]

### Success Metrics
[Key metrics that define success]

## Requirements

### Functional Requirements

#### Core Features
1. **Feature 1**
   - Description: [Detailed description]
   - User Stories: [As a user, I want... so that...]
   - Acceptance Criteria: [Specific, measurable conditions]

2. **Feature 2**
   - Description: [Detailed description]
   - User Stories: [As a user, I want... so that...]
   - Acceptance Criteria: [Specific, measurable conditions]

#### Secondary Features
[Additional features that enhance the product]

### Non-Functional Requirements

#### Performance
- Response Time: [Requirements]
- Throughput: [Requirements]
- Scalability: [Requirements]

#### Security
- Authentication: [Requirements]
- Authorization: [Requirements]
- Data Protection: [Requirements]

#### Usability
- User Interface: [Requirements]
- Accessibility: [Requirements]
- Documentation: [Requirements]

#### Compatibility
- Browser Support: [Requirements]
- Device Support: [Requirements]
- API Versions: [Requirements]

## Constraints

### Technical Constraints
[List of technical limitations or requirements]

### Business Constraints
[List of business limitations or requirements]

### Regulatory Constraints
[List of legal or regulatory requirements]

## Assumptions

### Technical Assumptions
[Assumptions about technology, infrastructure, etc.]

### Business Assumptions
[Assumptions about market, users, business model, etc.]

## Dependencies

### Internal Dependencies
[Dependencies on other teams or systems]

### External Dependencies
[Dependencies on third-party services or APIs]

## Risk Assessment

### High Risk Items
[Items that could significantly impact the project]

### Mitigation Strategies
[Plans to address identified risks]

## Stakeholder Analysis

### Primary Stakeholders
- [Stakeholder 1]: [Role and interests]
- [Stakeholder 2]: [Role and interests]

### Secondary Stakeholders
- [Stakeholder 1]: [Role and interests]

## Competitive Analysis

### Direct Competitors
1. **Competitor 1**
   - Strengths: [List]
   - Weaknesses: [List]
   - Market Share: [Percentage]

2. **Competitor 2**
   - Strengths: [List]
   - Weaknesses: [List]
   - Market Share: [Percentage]

### Indirect Competitors
[Companies offering alternative solutions]

### Competitive Advantages
[What makes this product unique]

## Market Analysis

### Target Market
- **Primary Market:** [Description and size]
- **Secondary Market:** [Description and size]

### Market Trends
[Current trends affecting this market]

### Opportunity Assessment
[Market opportunities and gaps]

## User Personas

### Primary Persona: [Name]
- **Demographics:** [Age, location, occupation, etc.]
- **Goals:** [What they want to achieve]
- **Pain Points:** [Current challenges]
- **Technology Usage:** [Technical proficiency]

### Secondary Persona: [Name]
- **Demographics:** [Age, location, occupation, etc.]
- **Goals:** [What they want to achieve]
- **Pain Points:** [Current challenges]
- **Technology Usage:** [Technical proficiency]

## User Stories

### Epic 1: [Epic Name]
**As a** [type of user]
**I want** [some goal]
**So that** [some reason]

#### Stories:
1. **Story 1**
   - **As a** [user]
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]
     - [Criterion 3]

2. **Story 2**
   - **As a** [user]
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]

## Success Metrics

### Quantitative Metrics
- [Metric 1]: Target [value] by [date]
- [Metric 2]: Target [value] by [date]

### Qualitative Metrics
- User satisfaction: [Target score] on [scale]
- Feature adoption: [Target percentage] within [timeframe]

## Next Steps

### Phase 1 Completion Checklist
- [ ] Specification document completed
- [ ] Requirements validated with stakeholders
- [ ] Competitive analysis completed
- [ ] User stories written and prioritized
- [ ] Success metrics defined
- [ ] Technical feasibility assessed

### Phase 2 Preparation
- [ ] Technical architecture planned
- [ ] Development team assembled
- [ ] Project timeline created
- [ ] Resource requirements identified

---

*Generated by CodeMaestro Requirements Agent*
*Phase 1: Requirements*
`;

    return template;
  }

  async gatherProductInfo() {
    console.log(chalk.bold.yellow('🏷️  Gathering Product Information'));
    console.log('');

    const productInfo = {};

    productInfo.name = await this.askQuestion(
      'What is the name of your product?',
      {
        hint: 'Choose a clear, memorable name that reflects the product\'s purpose',
        example: 'TaskFlow Pro, DataViz Analytics, SecureChat'
      }
    );

    productInfo.description = await this.askQuestion(
      'Provide a brief description of what your product does',
      {
        hint: 'Focus on the main value proposition and target users',
        example: 'A task management tool that helps teams collaborate efficiently'
      }
    );

    productInfo.category = await this.askMultipleChoice(
      'What category does your product fall into?',
      [
        'Business/Productivity Tools',
        'Developer Tools',
        'Consumer Applications',
        'Enterprise Software',
        'Mobile Applications',
        'Web Applications',
        'AI/ML Tools',
        'Data Analytics',
        'Security Tools',
        'Other'
      ]
    );

    productInfo.targetUsers = await this.askQuestion(
      'Who are the primary users of this product?',
      {
        hint: 'Describe the user personas or roles',
        example: 'Small business owners, project managers, software developers'
      }
    );

    productInfo.problem = await this.askQuestion(
      'What problem does this product solve?',
      {
        hint: 'Be specific about the pain points users currently experience',
        example: 'Teams struggle with scattered tasks and poor communication leading to missed deadlines'
      }
    );

    productInfo.solution = await this.askQuestion(
      'How does your product solve this problem?',
      {
        hint: 'Describe your unique approach or technology',
        example: 'Centralized task management with AI-powered prioritization and automated notifications'
      }
    );

    return productInfo;
  }

  /**
   * Interactive requirements gathering
   */
  async gatherRequirements() {
    console.log(chalk.bold.yellow('📋 Gathering Requirements'));
    console.log('');

    const requirements = {
      functional: [],
      nonFunctional: {}
    };

    console.log(chalk.cyan('Functional Requirements:'));
    console.log(chalk.gray('List the key features your product must have'));
    console.log('');

    // Ask for core features
    const coreFeatures = await this.askQuestion(
      'What are the 3-5 core features your product must have?',
      {
        hint: 'Focus on must-have features for MVP',
        multiple: true,
        example: '1. User authentication, 2. Task creation, 3. Team collaboration, 4. Progress tracking'
      }
    );

    if (coreFeatures && coreFeatures !== '[Please fill in]') {
      requirements.functional = coreFeatures.split(',').map(f => f.trim());
    }

    console.log('');
    console.log(chalk.cyan('Non-Functional Requirements:'));

    requirements.nonFunctional.performance = await this.askQuestion(
      'What are the performance requirements?',
      {
        hint: 'Response times, throughput, scalability needs',
        example: 'Page load < 2 seconds, support 1000 concurrent users'
      }
    );

    requirements.nonFunctional.security = await this.askQuestion(
      'What security requirements are there?',
      {
        hint: 'Authentication, data protection, compliance needs',
        example: 'User authentication, encrypted data storage, GDPR compliance'
      }
    );

    requirements.nonFunctional.usability = await this.askQuestion(
      'What usability requirements are important?',
      {
        hint: 'Accessibility, user experience, learning curve',
        example: 'WCAG 2.1 AA compliance, intuitive interface, < 30 min training'
      }
    );

    return requirements;
  }

  /**
   * Interactive competitive analysis
   */
  async gatherCompetitiveInfo() {
    console.log(chalk.bold.yellow('🏆 Gathering Competitive Information'));
    console.log('');

    const competitive = {};

    competitive.market = await this.askQuestion(
      'What market or industry is your product targeting?',
      {
        hint: 'Be specific about the market segment',
        example: 'SaaS task management for small to medium businesses'
      }
    );

    competitive.competitors = await this.askQuestion(
      'Who are your main competitors?',
      {
        hint: 'List 3-5 direct and indirect competitors',
        multiple: true,
        example: 'Asana, Trello, Monday.com, Jira, Microsoft To Do'
      }
    );

    competitive.differentiators = await this.askQuestion(
      'What makes your product different from competitors?',
      {
        hint: 'Focus on unique features, pricing, or approach',
        example: 'AI-powered task prioritization, seamless integrations, lower price point'
      }
    );

    competitive.marketSize = await this.askQuestion(
      'What is the estimated market size?',
      {
        hint: 'Total addressable market (TAM) if known',
        example: '$50 billion global task management market'
      }
    );

    return competitive;
  }

  /**
   * Interactive user story generation
   */
  async gatherUserStoryInfo() {
    console.log(chalk.bold.yellow('👥 Gathering User Story Information'));
    console.log('');

    const userStories = {};

    userStories.personas = await this.askQuestion(
      'Describe your primary user personas',
      {
        hint: 'Create 1-2 detailed user profiles',
        example: 'Sarah - 32yo project manager at mid-sized tech company, manages 5-person team'
      }
    );

    userStories.goals = await this.askQuestion(
      'What are the main goals users want to achieve?',
      {
        hint: 'What success looks like for your users',
        example: 'Complete projects on time, reduce communication overhead, increase team productivity'
      }
    );

    userStories.painPoints = await this.askQuestion(
      'What pain points do users currently experience?',
      {
        hint: 'Current challenges and frustrations',
        example: 'Scattered information across tools, missed deadlines, poor visibility into progress'
      }
    );

    return userStories;
  }

  async createInteractiveUserStoryTemplate(userStoryInfo) {
    const template = `# User Stories

## Overview

**Product:** [Product Name]
**Created:** ${new Date().toISOString().split('T')[0]}
**Author:** [Your Name]

### Story Format
Each user story follows the standard format:
- **As a** [type of user]
- **I want** [some goal]
- **So that** [some reason]

### Acceptance Criteria Guidelines
- Specific and measurable
- Testable conditions
- Focused on user value
- Realistic and achievable

## User Personas

### Primary Persona: [Name]
${userStoryInfo.personas || '**Demographics:** [Age, location, occupation, etc.]\\n**Goals:** [What they want to achieve]\\n**Pain Points:** [Current challenges]\\n**Technology Usage:** [Technical proficiency]'}

### Secondary Persona: [Name]
**Demographics:** [Age, location, occupation, etc.]
**Goals:** [What they want to achieve]
**Pain Points:** [Current challenges]
**Technology Usage:** [Technical proficiency]

## Primary User Goals
${userStoryInfo.goals || '[What are the main goals users want to achieve?]'}

## Current User Pain Points
${userStoryInfo.painPoints || '[What pain points do users currently experience?]'}

## Epics and Stories

### Epic 1: [Core Product Functionality]
**As a** ${userStoryInfo.primaryPersona || 'user'}
**I want** [some goal]
**So that** [some reason]

#### Stories:
1. **Story 1**
   - **As a** ${userStoryInfo.primaryPersona || 'user'}
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]
     - [Criterion 3]

2. **Story 2**
   - **As a** ${userStoryInfo.primaryPersona || 'user'}
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]

### Epic 2: [Additional Functionality]
**As a** ${userStoryInfo.secondaryPersona || 'user'}
**I want** [some goal]
**So that** [some reason]

#### Stories:
1. **Story 3**
   - **As a** ${userStoryInfo.secondaryPersona || 'user'}
   - **I want** [feature]
   - **So that** [benefit]
   - **Acceptance Criteria:**
     - [Criterion 1]
     - [Criterion 2]

## Story Prioritization

### High Priority Stories
[Stories that are critical for MVP]

### Medium Priority Stories
[Stories that add significant value]

### Low Priority Stories
[Stories that are nice-to-have]

## Story Mapping

### User Journey 1: [Journey Name]
1. Story A → Story B → Story C
2. Alternative path: Story D → Story E

### User Journey 2: [Journey Name]
1. Story F → Story G → Story H

## Dependencies

### Story Dependencies
- [Story B depends on Story A]
- [List other dependencies]

### External Dependencies
- [API integrations required]
- [Third-party services needed]
- [Other system dependencies]

## Acceptance Testing

### Definition of Ready
- Story is well-defined and understood
- Acceptance criteria are clear and testable
- Story is estimated and prioritized
- Dependencies are identified and resolved

### Definition of Done
- Code is written and reviewed
- Unit tests are passing
- Acceptance criteria are met
- Documentation is updated
- Product owner accepts the story

## Metrics

### Story Completion Rate
[Track velocity and completion over time]

### Acceptance Criteria Compliance
[Measure how well stories meet acceptance criteria]

### Story Size Accuracy
[Compare estimated vs actual effort]

---

*Generated by CodeMaestro Requirements Agent*
*Phase 1: Requirements*
`;

    return template;
  }

  async listExistingDocuments() {
    try {
      const files = await fs.readdir(this.specsDir);
      return files.filter(file => file.endsWith('.md'));
    } catch (error) {
      return [];
    }
  }

  async saveDocument(filename, content) {
    const filePath = path.join(this.specsDir, filename);
    await fs.writeFile(filePath, content);
    return filePath;
  }

  async generateUserStories(productDescription, features) {
    // Generate user stories based on product description and features
    const stories = [];

    if (!features || features.length === 0) {
      return [
        {
          epic: 'Core Product Functionality',
          story: 'As a user, I want to access the basic product features so that I can accomplish my primary tasks',
          acceptanceCriteria: [
            'User can access main product interface',
            'Basic functionality is available and working',
            'User receives appropriate feedback for actions'
          ]
        }
      ];
    }

    features.forEach((feature, index) => {
      stories.push({
        epic: `Feature ${index + 1}: ${feature.name || feature}`,
        story: `As a ${feature.userType || 'user'}, I want ${feature.description || 'to use this feature'} so that ${feature.benefit || 'I can accomplish my goals'}`,
        acceptanceCriteria: [
          'Feature is accessible to authorized users',
          'Feature functions as described',
          'Feature provides appropriate user feedback',
          'Feature handles error conditions gracefully'
        ]
      });
    });

    return stories;
  }

  async createUserStoryTemplate(stories = []) {
    let storyContent = '';

    if (stories.length > 0) {
      stories.forEach((story, index) => {
        storyContent += `### Story ${index + 1}: ${story.epic}\n`;
        storyContent += `**As a** ${story.story.split('As a ')[1].split(' I want')[0]}\n`;
        storyContent += `**I want** ${story.story.split('I want ')[1].split(' so that')[0]}\n`;
        storyContent += `**So that** ${story.story.split('so that ')[1]}\n\n`;
        storyContent += `**Acceptance Criteria:**\n`;

        if (story.acceptanceCriteria) {
          story.acceptanceCriteria.forEach(criterion => {
            storyContent += `- ${criterion}\n`;
          });
        }

        storyContent += `\n**Priority:** [High/Medium/Low]\n`;
        storyContent += `**Estimate:** [Story points or time estimate]\n`;
        storyContent += `**Notes:** [Additional context or requirements]\n\n`;
      });
    } else {
      storyContent = `### Story 1: [Epic Name]
**As a** [type of user]
**I want** [some goal]
**So that** [some reason]

**Acceptance Criteria:**
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

**Priority:** [High/Medium/Low]
**Estimate:** [Story points or time estimate]
**Notes:** [Additional context or requirements]
`;
    }

    const template = `# User Stories

## Overview

**Product:** [Product Name]
**Created:** ${new Date().toISOString().split('T')[0]}
**Author:** [Your Name]

### Story Format
Each user story follows the standard format:
- **As a** [type of user]
- **I want** [some goal]
- **So that** [some reason]

### Acceptance Criteria Guidelines
- Specific and measurable
- Testable conditions
- Focused on user value
- Realistic and achievable

## Epics and Stories

${storyContent}

## Story Prioritization

### High Priority Stories
[Stories that are critical for MVP]

### Medium Priority Stories
[Stories that add significant value]

### Low Priority Stories
[Stories that are nice-to-have]

## Story Mapping

### User Journey 1: [Journey Name]
1. Story A → Story B → Story C
2. Alternative path: Story D → Story E

### User Journey 2: [Journey Name]
1. Story F → Story G → Story H

## Dependencies

### Story Dependencies
- [Story B depends on Story A]
- [List other dependencies]

### External Dependencies
- [API integrations required]
- [Third-party services needed]
- [Other system dependencies]

## Acceptance Testing

### Definition of Ready
- Story is well-defined and understood
- Acceptance criteria are clear and testable
- Story is estimated and prioritized
- Dependencies are identified and resolved

### Definition of Done
- Code is written and reviewed
- Unit tests are passing
- Acceptance criteria are met
- Documentation is updated
- Product owner accepts the story

## Metrics

### Story Completion Rate
[Track velocity and completion over time]

### Acceptance Criteria Compliance
[Measure how well stories meet acceptance criteria]

### Story Size Accuracy
[Compare estimated vs actual effort]

---

*Generated by CodeMaestro Requirements Agent*
*Phase 1: Requirements*
`;

    return template;
  }

  async createCompetitiveAnalysisTemplate() {
    const template = `# Competitive Analysis

## Executive Summary

**Product:** [Product Name]
**Analysis Date:** ${new Date().toISOString().split('T')[0]}
**Analyst:** [Your Name]
**Market Segment:** [Target Market]

### Key Findings
- [Primary competitive advantage]
- [Main market opportunity]
- [Key risk or threat]

## Market Overview

### Market Size & Growth
- **Total Addressable Market (TAM):** [Market size estimate]
- **Serviceable Addressable Market (SAM):** [Serviceable portion]
- **Serviceable Obtainable Market (SOM):** [Realistic market share]

### Market Trends
1. [Trend 1] - [Impact on product]
2. [Trend 2] - [Impact on product]
3. [Trend 3] - [Impact on product]

### Market Drivers
- [Driver 1] - [Influence level]
- [Driver 2] - [Influence level]
- [Driver 3] - [Influence level]

## Direct Competitors

### Competitor 1: [Company Name]
**Market Position:** [Leader/Challenger/Follower/Niche]
**Target Market:** [Primary customers]
**Pricing Strategy:** [Model and range]

#### SWOT Analysis
**Strengths:**
- [Strength 1]
- [Strength 2]
- [Strength 3]

**Weaknesses:**
- [Weakness 1]
- [Weakness 2]
- [Weakness 3]

**Opportunities:**
- [Opportunity 1]
- [Opportunity 2]

**Threats:**
- [Threat 1]
- [Threat 2]

#### Product Features
- [Feature 1] - [How it compares to your product]
- [Feature 2] - [How it compares to your product]
- [Feature 3] - [How it compares to your product]

#### Market Share: [Percentage]%
#### Revenue: [Estimate or known figure]

### Competitor 2: [Company Name]
**Market Position:** [Leader/Challenger/Follower/Niche]
**Target Market:** [Primary customers]
**Pricing Strategy:** [Model and range]

#### SWOT Analysis
**Strengths:**
- [Strength 1]
- [Strength 2]

**Weaknesses:**
- [Weakness 1]
- [Weakness 2]

**Opportunities:**
- [Opportunity 1]

**Threats:**
- [Threat 1]

#### Product Features
- [Feature 1] - [Comparison]
- [Feature 2] - [Comparison]

#### Market Share: [Percentage]%
#### Revenue: [Estimate]

### Competitor 3: [Company Name]
[Similar structure as above]

## Indirect Competitors

### Alternative Solutions
1. **Solution Type:** [e.g., Spreadsheets, Manual processes]
   - **User Base:** [Size and type of users]
   - **Advantages:** [Why users choose this]
   - **Disadvantages:** [Limitations]

2. **Solution Type:** [Another alternative]
   - **User Base:** [Size and type]
   - **Advantages:** [Benefits]
   - **Disadvantages:** [Limitations]

### Emerging Technologies
- [Technology 1] - [Potential impact timeline]
- [Technology 2] - [Potential impact timeline]

## Competitive Advantages

### Our Differentiators
1. **[Differentiator 1]**
   - **Description:** [What makes it unique]
   - **Customer Value:** [Why customers care]
   - **Sustainability:** [How long this advantage lasts]

2. **[Differentiator 2]**
   - **Description:** [Unique aspect]
   - **Customer Value:** [Customer benefit]
   - **Sustainability:** [Duration of advantage]

3. **[Differentiator 3]**
   - **Description:** [Unique feature]
   - **Customer Value:** [Customer benefit]
   - **Sustainability:** [Advantage duration]

### First-Mover Advantages
- [Advantage 1]
- [Advantage 2]

### Network Effects
- [How product benefits from network growth]

## Pricing Analysis

### Competitor Pricing Models
- **Competitor 1:** [Pricing structure]
- **Competitor 2:** [Pricing structure]
- **Competitor 3:** [Pricing structure]

### Price Sensitivity
- **Market Segment:** [How price-sensitive is the market]
- **Switching Costs:** [How easy/hard to switch providers]

### Our Pricing Strategy
- **Recommended Model:** [Freemium, Subscription, One-time, etc.]
- **Justification:** [Why this model fits]

## Go-to-Market Strategy

### Market Entry Strategy
- [Strategy recommendation based on analysis]

### Target Customer Acquisition
- [How to acquire first customers]

### Partnership Opportunities
- [Potential strategic partnerships]

## Risks & Mitigation

### Competitive Risks
1. **[Risk 1]**
   - **Likelihood:** [High/Medium/Low]
   - **Impact:** [High/Medium/Low]
   - **Mitigation:** [Strategy to address]

2. **[Risk 2]**
   - **Likelihood:** [High/Medium/Low]
   - **Impact:** [High/Medium/Low]
   - **Mitigation:** [Strategy to address]

### Market Risks
- [External market factors that could affect success]

## Recommendations

### Immediate Actions (Next 30 days)
1. [Action 1]
2. [Action 2]
3. [Action 3]

### Short-term Strategy (3-6 months)
1. [Strategy 1]
2. [Strategy 2]

### Long-term Positioning (6+ months)
1. [Positioning strategy 1]
2. [Positioning strategy 2]

## Success Metrics

### Competitive Monitoring
- [How to track competitor moves]
- [Frequency of analysis updates]

### Market Share Goals
- **6 months:** [Target percentage]
- **12 months:** [Target percentage]
- **24 months:** [Target percentage]

---

*Generated by CodeMaestro Requirements Agent*
*Phase 1: Requirements*
`;

    return template;
  }
}

/**
 * Main requirements command
 */
async function requirementsCommand(action, options) {
  try {
    logger.info('Starting Requirements Agent...');

    const agent = new RequirementsAgent();
    await agent.initialize();

    // Check if we're in the right phase
    if (!await agent.validatePhase()) {
      return;
    }

    console.log(chalk.bold.blue('🎯 CodeMaestro Requirements Agent'));
    console.log('═'.repeat(50));
    console.log(chalk.bold('Phase 1: Requirements Gathering'));
    console.log('');

    switch (action) {
    case 'spec':
    case 'specification':
      await handleSpecification(agent, options);
      break;

    case 'competitive':
    case 'analysis':
      await handleCompetitiveAnalysis(agent, options);
      break;

    case 'stories':
    case 'user-stories':
      await handleUserStories(agent, options);
      break;

    case 'list':
      await handleListDocuments(agent);
      break;

    case 'guide':
    default:
      await showRequirementsGuide(agent);
      break;
    }

  } catch (error) {
    logger.error('Requirements agent failed', error);
    console.log(chalk.red(`\n❌ Requirements agent failed: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Handle specification creation
 */
async function handleSpecification(agent, options) {
  console.log(chalk.bold.yellow('📋 Product Specification Creation'));
  console.log('');

  if (options.interactive) {
    // Interactive mode - gather information through questions
    console.log(chalk.cyan('Starting interactive specification gathering...'));
    console.log(chalk.gray('I\'ll ask you targeted questions to build your specification.'));
    console.log(chalk.gray('This will create a comprehensive document based on your answers.'));
    console.log('');

    // Gather information interactively
    const productInfo = await agent.gatherProductInfo();
    const requirements = await agent.gatherRequirements();

    // Create enhanced template with gathered information
    const template = await agent.createInteractiveSpecificationTemplate(productInfo, requirements);
    const filename = `interactive-specification-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log('');
    console.log(chalk.green(`✅ Interactive specification created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('📝 Next steps:'));
    console.log('   1. Review and refine the generated specification');
    console.log('   2. Add any missing details or requirements');
    console.log('   3. Share with stakeholders for validation');
    console.log('   4. Use /codem-next to advance to the next task');

  } else if (options.template) {
    const template = await agent.createSpecificationTemplate();
    const filename = `product-specification-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log(chalk.green(`✅ Specification template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('📝 Next steps:'));
    console.log('   1. Edit the template with your product details');
    console.log('   2. Fill in the requirements sections');
    console.log('   3. Validate with stakeholders');
    console.log('   4. Use /codem-next to advance to the next task');
  } else {
    console.log('Create a comprehensive product specification.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-requirements spec --interactive    # Interactive guided creation');
    console.log('  /codem-requirements spec --template       # Create blank template');
    console.log('');
    console.log(chalk.cyan('Options:'));
    console.log('  --interactive    Guided questions to build specification');
    console.log('  --template       Create specification template');
  }
}

/**
 * Handle competitive analysis
 */
async function handleCompetitiveAnalysis(agent, options) {
  console.log(chalk.bold.yellow('🏆 Competitive Analysis'));
  console.log('');

  if (options.interactive) {
    // Interactive mode - gather competitive information
    console.log(chalk.cyan('Starting interactive competitive analysis...'));
    console.log(chalk.gray('I\'ll help you analyze your market position and competitors.'));
    console.log('');

    const competitiveInfo = await agent.gatherCompetitiveInfo();

    // Create enhanced template with gathered information
    const template = await agent.createInteractiveCompetitiveTemplate(competitiveInfo);
    const filename = `interactive-competitive-analysis-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log('');
    console.log(chalk.green(`✅ Interactive competitive analysis created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('🔍 Research recommendations:'));
    console.log('   • Use /codem-research for detailed competitor analysis');
    console.log('   • Review competitor pricing and feature comparisons');
    console.log('   • Analyze customer reviews and market positioning');
    console.log('   • Validate findings with market research data');

  } else if (options.template) {
    const template = await agent.createCompetitiveAnalysisTemplate();
    const filename = `competitive-analysis-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log(chalk.green(`✅ Competitive analysis template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('🔍 Research recommendations:'));
    console.log('   • Use /codem-research "competitors in [industry]"');
    console.log('   • Use /codem-research "market size [industry]"');
    console.log('   • Review competitor websites and documentation');
    console.log('   • Analyze customer reviews and feedback');
  } else {
    console.log('Conduct comprehensive competitive analysis.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-requirements competitive --interactive    # Interactive guided analysis');
    console.log('  /codem-requirements competitive --template       # Create blank template');
    console.log('');
    console.log(chalk.cyan('Options:'));
    console.log('  --interactive    Guided questions for competitive analysis');
    console.log('  --template       Create competitive analysis template');
  }
}

/**
 * Handle user stories generation
 */
async function handleUserStories(agent, options) {
  console.log(chalk.bold.yellow('📖 User Stories Generation'));
  console.log('');

  if (options.interactive) {
    // Interactive mode - gather user story information
    console.log(chalk.cyan('Starting interactive user story creation...'));
    console.log(chalk.gray('I\'ll help you define user personas and create meaningful user stories.'));
    console.log('');

    const userStoryInfo = await agent.gatherUserStoryInfo();

    // Create enhanced template with gathered information
    const template = await agent.createInteractiveUserStoryTemplate(userStoryInfo);
    const filename = `interactive-user-stories-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log('');
    console.log(chalk.green(`✅ Interactive user stories created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('✍️  Story writing tips:'));
    console.log('   • Focus on user value and outcomes');
    console.log('   • Keep stories small and testable');
    console.log('   • Include clear acceptance criteria');
    console.log('   • Prioritize based on business value');

  } else if (options.template) {
    const template = await agent.createUserStoryTemplate();
    const filename = `user-stories-${new Date().toISOString().split('T')[0]}.md`;
    const filePath = await agent.saveDocument(filename, template);

    console.log(chalk.green(`✅ User stories template created:`));
    console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
    console.log('');
    console.log(chalk.yellow('✍️  Story writing tips:'));
    console.log('   • Focus on user value and outcomes');
    console.log('   • Keep stories small and testable');
    console.log('   • Include clear acceptance criteria');
    console.log('   • Prioritize based on business value');
  } else if (options.generate && options.features) {
    // Generate stories from features
    try {
      const features = JSON.parse(options.features);
      const stories = await agent.generateUserStories('Generated product', features);
      const template = await agent.createUserStoryTemplate(stories);
      const filename = `generated-user-stories-${new Date().toISOString().split('T')[0]}.md`;
      const filePath = await agent.saveDocument(filename, template);

      console.log(chalk.green(`✅ User stories generated from features:`));
      console.log(chalk.gray(`   ${path.relative(process.cwd(), filePath)}`));
      console.log(chalk.gray(`   Generated ${stories.length} user stories`));
    } catch (error) {
      console.log(chalk.red('❌ Failed to parse features JSON'));
      console.log(chalk.gray('Features should be a JSON array of objects with name, description, benefit, userType properties'));
    }
  } else {
    console.log('Generate user stories and acceptance criteria.');
    console.log('');
    console.log(chalk.cyan('Usage:'));
    console.log('  /codem-requirements stories --interactive    # Interactive guided creation');
    console.log('  /codem-requirements stories --template       # Create blank template');
    console.log('  /codem-requirements stories --generate --features \'[feature-objects]\'');
    console.log('');
    console.log(chalk.cyan('Options:'));
    console.log('  --interactive    Guided questions for user story creation');
    console.log('  --template       Create user stories template');
    console.log('  --generate       Generate stories from feature descriptions');
    console.log('  --features       JSON array of feature objects');
  }
}

/**
 * Handle listing existing documents
 */
async function handleListDocuments(agent) {
  console.log(chalk.bold.yellow('📁 Existing Requirements Documents'));
  console.log('');

  const documents = await agent.listExistingDocuments();

  if (documents.length === 0) {
    console.log(chalk.gray('No requirements documents found.'));
    console.log('');
    console.log(chalk.cyan('Create your first document:'));
    console.log('  /codem-requirements spec --template');
    console.log('  /codem-requirements competitive --template');
    console.log('  /codem-requirements stories --template');
  } else {
    console.log(chalk.gray(`Found ${documents.length} document(s) in docs/specifications/:`));
    console.log('');

    documents.forEach((doc, index) => {
      const docPath = path.join('docs/specifications', doc);
      console.log(`${index + 1}. ${chalk.cyan(doc)}`);
      console.log(`   ${chalk.gray(docPath)}`);
      console.log('');
    });

    console.log(chalk.cyan('Edit documents with your preferred markdown editor.'));
  }
}

/**
 * Show requirements guide
 */
async function showRequirementsGuide(agent) {
  console.log(chalk.bold.yellow('📋 Phase 1 Requirements Guide'));
  console.log('');

  console.log(chalk.bold('Phase 1 Objective:'));
  console.log('Create a comprehensive product specification through structured requirements gathering.');
  console.log('');

  console.log(chalk.bold('Key Activities:'));
  console.log('1. 📋 Product Specification - Define what the product will do');
  console.log('2. 🏆 Competitive Analysis - Understand market position');
  console.log('3. 📖 User Stories - Define user needs and acceptance criteria');
  console.log('4. ✅ Validation - Ensure requirements are complete and feasible');
  console.log('');

  console.log(chalk.bold('Available Commands:'));
  console.log('');
  console.log(chalk.cyan('/codem-requirements spec --interactive'));
  console.log('  Interactive product specification creation');
  console.log(chalk.cyan('/codem-requirements competitive --interactive'));
  console.log('  Interactive competitive analysis');
  console.log(chalk.cyan('/codem-requirements stories --interactive'));
  console.log('  Interactive user story creation');
  console.log('');
  console.log(chalk.cyan('/codem-requirements spec --template'));
  console.log('  Create product specification template');
  console.log(chalk.cyan('/codem-requirements competitive --template'));
  console.log('  Create competitive analysis template');
  console.log(chalk.cyan('/codem-requirements stories --template'));
  console.log('  Create user stories template');
  console.log('');
  console.log(chalk.cyan('/codem-requirements list'));
  console.log('  List existing requirements documents');
  console.log('');

  console.log(chalk.bold('Recommended Workflow:'));
  console.log('1. Start with product specification');
  console.log('2. Research competitors using /codem-research');
  console.log('3. Create user stories with clear acceptance criteria');
  console.log('4. Validate requirements with stakeholders');
  console.log('5. Use /codem-next to advance to planning phase');
  console.log('');

  console.log(chalk.bold('Integration with Other Tools:'));
  console.log('• /codem-research - Market and competitor research');
  console.log('• /codem-kb add - Document lessons and decisions');
  console.log('• /codem-commit - Save progress with meaningful commits');
  console.log('');

  const documents = await agent.listExistingDocuments();
  if (documents && documents.length > 0) {
    console.log(chalk.green(`📁 You have ${documents.length} existing requirements document(s).`));
    console.log(chalk.gray('Use /codem-requirements list to see them.'));
  } else {
    console.log(chalk.yellow('📝 No requirements documents created yet.'));
    console.log(chalk.gray('Start with: /codem-requirements spec --interactive'));
  }
}

// CLI setup
program
  .name('codem-requirements')
  .description('Requirements Agent for Phase 1 - Interactive specification creation')
  .argument('[action]', 'Action to perform (spec|competitive|stories|list|guide)', 'guide')
  .option('-t, --template', 'Create template for the specified action')
  .option('-i, --interactive', 'Interactive guided creation with questions')
  .option('-g, --generate', 'Generate content from input data')
  .option('-f, --features <json>', 'JSON array of feature objects for story generation')
  .action(requirementsCommand);

// Export for testing
module.exports = {
  RequirementsAgent,
  requirementsCommand
};

// Only parse if this file is run directly
if (require.main === module) {
  program.parse();
}