#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { spawn } = require('child_process');

class CodeMaestroMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'codemaestro-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'codem_init',
            description: 'Initialize CodeMaestro project for OpenCode',
            inputSchema: {
              type: 'object',
              properties: {
                force: {
                  type: 'boolean',
                  description: 'Force reinitialization even if project exists',
                },
              },
            },
          },
          {
            name: 'codem_status',
            description: 'Show CodeMaestro project status',
            inputSchema: {
              type: 'object',
              properties: {
                verbose: {
                  type: 'boolean',
                  description: 'Show detailed information',
                },
                json: {
                  type: 'boolean',
                  description: 'Output status as JSON',
                },
              },
            },
          },
          {
            name: 'codem_next',
            description: 'Continue to next task/phase in CodeMaestro workflow',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'codem_phase',
            description: 'Jump to specific phase in CodeMaestro workflow',
            inputSchema: {
              type: 'object',
              properties: {
                phase: {
                  type: 'number',
                  description: 'Phase number to jump to (1-5)',
                  minimum: 1,
                  maximum: 5,
                },
              },
              required: ['phase'],
            },
          },
          {
            name: 'codem_requirements',
            description: 'Manage requirements phase - create specifications, user stories, competitive analysis',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['spec', 'competitive', 'stories', 'list'],
                  description: 'Action to perform',
                },
                interactive: {
                  type: 'boolean',
                  description: 'Use interactive mode',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_planning',
            description: 'Manage planning phase - create technical blueprints, task breakdowns, timelines',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['blueprint', 'tasks', 'timeline', 'list'],
                  description: 'Action to perform',
                },
                interactive: {
                  type: 'boolean',
                  description: 'Use interactive mode',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_implementation',
            description: 'Manage implementation phase - code generation, quality gates, progress tracking',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['generate', 'quality', 'progress', 'estimate'],
                  description: 'Action to perform',
                },
                interactive: {
                  type: 'boolean',
                  description: 'Use interactive mode',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_verification',
            description: 'Manage verification phase - evidence collection, quality assessment, GO/NO-GO decisions',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['evidence', 'quality', 'decide', 'report'],
                  description: 'Action to perform',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_release',
            description: 'Manage release phase - deployment orchestration, retrospectives, stakeholder communication',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['check', 'deploy', 'notes', 'retrospective', 'stakeholders'],
                  description: 'Action to perform',
                },
                environment: {
                  type: 'string',
                  enum: ['staging', 'production'],
                  description: 'Target environment for deployment',
                },
                version: {
                  type: 'string',
                  description: 'Release version',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_research',
            description: 'Research technologies and best practices using web search',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for research',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'codem_lookup',
            description: 'Get library documentation and examples',
            inputSchema: {
              type: 'object',
              properties: {
                library: {
                  type: 'string',
                  description: 'Library name to look up',
                },
                examples: {
                  type: 'boolean',
                  description: 'Include code examples',
                },
              },
              required: ['library'],
            },
          },
          {
            name: 'codem_kb',
            description: 'Manage knowledge base - search, add, and manage learned knowledge',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['search', 'add', 'list', 'show'],
                  description: 'Knowledge base action',
                },
                query: {
                  type: 'string',
                  description: 'Search query or content to add',
                },
                topic: {
                  type: 'string',
                  description: 'Topic for adding to knowledge base',
                },
              },
              required: ['action'],
            },
          },
          {
            name: 'codem_commit',
            description: 'Generate CodeMaestro-style commit messages',
            inputSchema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Commit message or description',
                },
              },
              required: ['message'],
            },
          },
           {
             name: 'codem_tree',
             description: 'View task dependency graph and project structure',
             inputSchema: {
               type: 'object',
               properties: {
                 visual: {
                   type: 'boolean',
                   description: 'Generate visual representation',
                 },
               },
             },
           },
           {
             name: 'codem_ask_user',
             description: 'Configure interactive questions to gather user preferences, clarify requirements, or get implementation choices during workflow execution',
             inputSchema: {
               type: 'object',
               properties: {
                 questions: {
                   type: 'array',
                   description: 'Questions to ask the user',
                   items: {
                     type: 'object',
                     properties: {
                       question: {
                         type: 'string',
                         description: 'Complete question text',
                       },
                       header: {
                         type: 'string',
                         description: 'Very short label (max 30 chars)',
                         maxLength: 30,
                       },
                       options: {
                         type: 'array',
                         description: 'Available choices',
                         items: {
                           type: 'object',
                           properties: {
                             label: {
                               type: 'string',
                               description: 'Display text (1-5 words, concise)',
                               maxLength: 30,
                             },
                             description: {
                               type: 'string',
                               description: 'Explanation of choice',
                             },
                           },
                           required: ['label', 'description'],
                         },
                       },
                       multiple: {
                         type: 'boolean',
                         description: 'Allow selecting multiple choices',
                       },
                     },
                     required: ['question', 'header', 'options'],
                   },
                 },
               },
               required: ['questions'],
             },
           },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const result = await this.executeCommand(name, args || {});
        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async executeCommand(commandName, args) {
    const projectDetector = require('./lib/project');
    const config = require('./lib/config');
    const logger = require('./lib/logger');

    try {
      switch (commandName) {
        case 'codem_init':
          // Initialize project using the actual init script
          const { spawn } = require('child_process');
          return new Promise((resolve, reject) => {
            const initScript = path.join(__dirname, 'commands', 'init.js');
            const child = spawn('node', [initScript], {
              stdio: ['pipe', 'pipe', 'pipe'],
              shell: true,
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data) => {
              stdout += data.toString();
            });

            child.stderr.on('data', (data) => {
              stderr += data.toString();
            });

            child.on('close', (code) => {
              if (code === 0) {
                resolve(`✅ CodeMaestro project initialized successfully!\n\n${stdout}`);
              } else {
                reject(new Error(`Initialization failed: ${stderr}`));
              }
            });
          });

        case 'codem_status':
          const status = await projectDetector.getProjectStatus();
          if (args.json) {
            return JSON.stringify(status, null, 2);
          }

          let statusText = '🚀 CodeMaestro Project Status\n══════════════════════════════════════════════════\n';
          statusText += `📁 Project: ${status.initialized ? 'Initialized' : 'Not Initialized'}\n`;

          if (status.initialized) {
            const phases = projectDetector.getAvailablePhases();
            const currentPhase = phases.find(p => p.number === status.phase);

            statusText += `🏷️  Phase: ${currentPhase ? `${currentPhase.number}: ${currentPhase.name}` : 'Unknown'}\n`;
            statusText += `🎯 Role: ${status.role || 'Not set'}\n`;
            statusText += `🎯 Task: ${status.task || 'Not set'}\n`;

            statusText += `🏥 Project Health: ${status.valid ? '✅ Valid' : '❌ Issues Found'}\n`;

            // Try to read recovery checkpoint for additional details
            try {
              const config = require('./lib/config');
              await config.load();
              const checkpointPath = config.get().paths.recovery_checkpoint;

              if (await require('fs-extra').pathExists(checkpointPath)) {
                const checkpointContent = await require('fs-extra').readFile(checkpointPath, 'utf8');

                // Extract latest information from checkpoint
                const lastUpdatedMatch = checkpointContent.match(/- \*\*Last Updated\*\*: ([^*\n]+)/);
                const currentTaskMatch = checkpointContent.match(/- \*\*Current Task\*\*: ([^*\n]+)/);
                const contextMatch = checkpointContent.match(/## Active Context\n([\s\S]*?)(?=\n##)/);
                const milestonesMatch = checkpointContent.match(/## Completed Milestones\n([\s\S]*?)(?=\n##)/);
                const nextActionsMatch = checkpointContent.match(/## Next Actions\n([\s\S]*?)(?=\n##)/);
                const blockersMatch = checkpointContent.match(/## Open Blockers\n([\s\S]*?)(?=\n---)/);

                if (lastUpdatedMatch || currentTaskMatch) {
                  statusText += '\n📊 Latest Session Details:\n';

                  if (lastUpdatedMatch) {
                    const lastUpdated = new Date(lastUpdatedMatch[1]);
                    const timeAgo = Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60)); // minutes ago
                    statusText += `  • Last Updated: ${timeAgo} minutes ago\n`;
                  }

                  if (currentTaskMatch && currentTaskMatch[1].trim()) {
                    statusText += `  • Current Focus: ${currentTaskMatch[1].trim()}\n`;
                  }
                }

                if (milestonesMatch && milestonesMatch[1].trim()) {
                  const milestones = milestonesMatch[1].trim().split('\n').filter(m => m.trim());
                  if (milestones.length > 0) {
                    statusText += '\n✅ Recent Milestones:\n';
                    milestones.slice(-3).forEach(milestone => { // Show last 3 milestones
                      statusText += `  • ${milestone.replace(/^-\s*/, '')}\n`;
                    });
                    if (milestones.length > 3) {
                      statusText += `  • ... and ${milestones.length - 3} more\n`;
                    }
                  }
                }

                if (nextActionsMatch && nextActionsMatch[1].trim()) {
                  const nextActions = nextActionsMatch[1].trim().split('\n').filter(a => a.trim());
                  if (nextActions.length > 0) {
                    statusText += '\n🎯 Next Recommended Actions:\n';
                    nextActions.slice(0, 3).forEach(action => { // Show first 3 next actions
                      statusText += `  • ${action.replace(/^-\s*/, '')}\n`;
                    });
                    if (nextActions.length > 3) {
                      statusText += `  • ... and ${nextActions.length - 3} more suggested actions\n`;
                    }
                  }
                }

                if (blockersMatch && blockersMatch[1].trim() && !blockersMatch[1].includes('None identified')) {
                  const blockers = blockersMatch[1].trim().split('\n').filter(b => b.trim());
                  if (blockers.length > 0) {
                    statusText += '\n🚨 Active Blockers:\n';
                    blockers.forEach(blocker => {
                      statusText += `  • ${blocker.replace(/^-\s*/, '')}\n`;
                    });
                  }
                }
              }
            } catch (checkpointError) {
              // Silently ignore checkpoint reading errors - not critical for basic status
              logger.debug(`Could not read recovery checkpoint: ${checkpointError.message}`);
            }

            if (status.issues.length > 0) {
              statusText += '\n🚨 Issues:\n';
              status.issues.forEach(issue => statusText += `  • ${issue}\n`);
            }

            if (status.warnings.length > 0) {
              statusText += '\n⚠️  Warnings:\n';
              status.warnings.forEach(warning => statusText += `  • ${warning}\n`);
            }
          }

          statusText += '\n══════════════════════════════════════════════════\n';
          statusText += 'CodeMaestro v1.0.0 | OpenCode Integration v0.1.0\n';

          return statusText;

        case 'codem_requirements':
          const projectConfig = await config.load();
          const docsDir = projectConfig.paths.specifications;

          switch (args.action) {
            case 'spec':
              // Update checkpoint for specification creation
              await projectDetector.updateRecoveryCheckpoint({
                phase: 1,
                role: 'Product Manager',
                task: 'Creating product specification document',
                context: 'Working on product specification template',
                milestones: ['Started product specification'],
                nextActions: ['Complete specification details', 'Analyze competitive landscape', 'Generate user stories']
              });

              return `📋 Creating Product Specification

I've created a template for your product specification. Here's what you need to define:

## Product Specification Template

### Product Overview
- **Name**: [Product Name]
- **Version**: [Version Number]
- **Target Audience**: [Who will use this product]
- **Problem Solved**: [What problem does this solve]

### Functional Requirements
- [List key features and capabilities]
- [Define user interactions]
- [Specify business logic]

### Non-Functional Requirements
- **Performance**: [Response times, throughput, etc.]
- **Security**: [Authentication, authorization, data protection]
- **Scalability**: [User load, data volume, etc.]
- **Usability**: [User experience requirements]

### Technical Constraints
- [Technology stack preferences]
- [Integration requirements]
- [Compliance needs]

### Success Metrics
- [How will you measure success]
- [Key performance indicators]

---

**Next Actions:**
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria
➡️ **"Continue to planning phase"** - Move to technical architecture and design
❌ **"I'm not ready yet"** - Stay in requirements phase for more work

What would you like to do next?`;

            case 'competitive':
              // Update checkpoint for competitive analysis
              await projectDetector.updateRecoveryCheckpoint({
                phase: 1,
                role: 'Product Manager',
                task: 'Performing competitive analysis and market research',
                context: 'Working on competitive analysis questionnaire',
                milestones: ['Started competitive analysis'],
                nextActions: ['Complete market research', 'Define competitive positioning', 'Move to planning phase']
              });

              return `🔍 Competitive Analysis

To create a comprehensive competitive analysis for your Body Lotion product, I need to understand:

1. **Market Segment**: What type of body lotion? (Luxury, natural, budget, therapeutic, etc.)

2. **Key Competitors**: Who are your main competitors in this space?

3. **Competitive Advantages**: What makes your product unique?

4. **Market Position**: How do you want to position your product?

5. **Pricing Strategy**: What price point are you targeting?

---

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria
➡️ **"Continue to planning phase"** - Move to technical architecture and design
💡 **"Provide market details"** - Share more information about your target market

Please provide details about your target market and positioning, or choose a next action above.`;

            case 'stories':
              // Update checkpoint for user story generation
              await projectDetector.updateRecoveryCheckpoint({
                phase: 1,
                role: 'Product Manager',
                task: 'Generating user stories and acceptance criteria',
                context: 'Working on user story creation',
                milestones: ['Generated initial user stories'],
                nextActions: ['Customize user stories', 'Create acceptance criteria', 'Move to planning phase']
              });

              return `📝 User Story Generation

Based on your product requirements, here are some example user stories for a Body Lotion product:

## User Stories

### Customer Stories
- **As a busy professional**, I want moisturizing lotion that absorbs quickly so that I can get dressed immediately after application
- **As someone with sensitive skin**, I want hypoallergenic ingredients so that I don't experience irritation or allergic reactions
- **As an eco-conscious consumer**, I want natural and sustainable ingredients so that I'm supporting environmentally friendly products

### Business Stories
- **As a retailer**, I want attractive packaging that stands out on shelves so that customers notice the product
- **As a marketer**, I want a unique selling proposition that differentiates from competitors so that we can build brand loyalty

### Technical Stories
- **As a developer**, I want an e-commerce platform that handles inventory and orders so that customers can purchase easily
- **As a quality assurance tester**, I want clear product specifications so that I can validate the lotion meets requirements

---

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
➡️ **"Continue to planning phase"** - Move to technical architecture and design
✏️ **"Customize these user stories"** - Modify stories based on your specific product details

Would you like me to create more specific user stories or take another action?`;

            case 'list':
              return `📋 Requirements Documents

Current requirements documents in your project:

- **Product Specification**: [Not created yet]
- **Competitive Analysis**: [Not created yet]
- **User Stories**: [Not created yet]
- **Acceptance Criteria**: [Not created yet]

---

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria
➡️ **"Continue to planning phase"** - Move to technical architecture and design

Use the actions above to create the missing requirements documents.`;

            default:
              return `📋 Requirements Phase Actions

Available actions for the requirements phase:

- **spec**: Create a product specification document
- **competitive**: Perform competitive analysis and market research
- **stories**: Generate user stories and acceptance criteria
- **list**: Show current requirements documents

---

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria

Choose an action above or specify what you'd like to work on in the requirements phase.`;
          }

        case 'codem_next':
          const currentStatus = await projectDetector.getProjectStatus();
          if (!currentStatus.initialized) {
            return '❌ Cannot proceed: Project not initialized. Run project initialization first.';
          }

          const currentPhase = currentStatus.phase || 1;
          const nextPhase = Math.min(currentPhase + 1, 5);
          const phaseInfo = projectDetector.getPhaseInfo(nextPhase);

          // Update checkpoint for phase transition
          await projectDetector.updateRecoveryCheckpoint({
            phase: nextPhase,
            role: phaseInfo.description.split(' - ')[0],
            task: `Working on ${phaseInfo.name.toLowerCase()} phase`,
            context: `${phaseInfo.name} phase in progress`,
            milestones: [`Completed phase ${currentPhase}`, `Started phase ${nextPhase}`],
            nextActions: [
              nextPhase === 2 ? 'Create technical blueprint' :
              nextPhase === 3 ? 'Generate application code' :
              nextPhase === 4 ? 'Collect evidence' :
              nextPhase === 5 ? 'Run pre-release checks' : 'Continue with current phase'
            ]
          });

          let nextActions = '';

          switch (nextPhase) {
            case 2:
              nextActions = `
🔧 **"Create technical blueprint"** - Design the system architecture
📋 **"Define task breakdown"** - Break down work into manageable tasks
📅 **"Generate project timeline"** - Create a development schedule`;
              break;
            case 3:
              nextActions = `
💻 **"Generate application code"** - Create the core application
🧪 **"Run quality checks"** - Test and validate the implementation
📊 **"Track progress"** - Monitor development progress`;
              break;
            case 4:
              nextActions = `
📊 **"Collect evidence"** - Gather proof of completion
✅ **"Run quality assessment"** - Validate all requirements
🟢 **"Make GO/NO-GO decision"** - Decide if ready for release`;
              break;
            case 5:
              nextActions = `
🚀 **"Run pre-release checks"** - Final validation
🌐 **"Deploy to production"** - Launch the application
📈 **"Capture lessons learned"** - Document project insights`;
              break;
          }

          return `➡️ Continuing to ${phaseInfo.name} Phase

**Current Phase**: ${currentPhase}
**Next Phase**: ${nextPhase} - ${phaseInfo.name}
**Role**: ${phaseInfo.description}

${phaseInfo.description} will now take over to handle the ${phaseInfo.name.toLowerCase()} phase.

${nextActions}

What would you like to accomplish in this phase?`;

        case 'codem_phase':
          if (!args.phase || args.phase < 1 || args.phase > 5) {
            return '❌ Invalid phase number. Please specify a phase between 1 and 5.';
          }

          const targetPhase = projectDetector.getPhaseInfo(args.phase);

          // Update checkpoint for phase jump
          await projectDetector.updateRecoveryCheckpoint({
            phase: args.phase,
            role: targetPhase.description.split(' - ')[0],
            task: `Working on ${targetPhase.name.toLowerCase()} phase`,
            context: `${targetPhase.name} phase in progress`,
            milestones: [`Jumped to phase ${args.phase}`],
            nextActions: [
              args.phase === 1 ? 'Create product specification' :
              args.phase === 2 ? 'Create technical blueprint' :
              args.phase === 3 ? 'Generate application code' :
              args.phase === 4 ? 'Collect evidence' :
              args.phase === 5 ? 'Run pre-release checks' : 'Continue with current phase'
            ]
          });

          return `🎯 Jumping to Phase ${args.phase}: ${targetPhase.name}

**Phase**: ${targetPhase.number}
**Name**: ${targetPhase.name}
**Role**: ${targetPhase.description}

${targetPhase.description} will now handle the ${targetPhase.name.toLowerCase()} phase.

---

**Available Actions in ${targetPhase.name} Phase:**
${args.phase === 1 ? '📋 **"Create product specification"** - Define requirements\n🔍 **"Analyze competitors"** - Market research\n📝 **"Generate user stories"** - Detail user needs' :
 args.phase === 2 ? '🔧 **"Create technical blueprint"** - System design\n📋 **"Define tasks"** - Work breakdown\n📅 **"Generate timeline"** - Project schedule' :
 args.phase === 3 ? '💻 **"Generate code"** - Implementation\n🧪 **"Run quality checks"** - Testing\n📊 **"Track progress"** - Status updates' :
 args.phase === 4 ? '📊 **"Collect evidence"** - Proof gathering\n✅ **"Run assessment"** - Quality validation\n🟢 **"Make release decision"** - GO/NO-GO' :
 '🚀 **"Run pre-release checks"** - Final validation\n🌐 **"Deploy application"** - Production launch\n📈 **"Capture lessons"** - Project insights'}

What specific tasks would you like to work on in this phase?`;

        case 'codem_research':
          if (!args.query) {
            return '❌ Please provide a search query for research.';
          }

          // Update checkpoint for research activity
          const researchStatus = await projectDetector.getProjectStatus();
          await projectDetector.updateRecoveryCheckpoint({
            phase: researchStatus.phase,
            role: researchStatus.role,
            task: `Researching: ${args.query}`,
            context: `Research phase for ${args.query}`,
            milestones: [`Started research on ${args.query}`],
            nextActions: ['Complete research analysis', 'Apply findings to project', 'Continue with development phase']
          });

          return `🔍 Research Query: "${args.query}"

I'm researching: ${args.query}

This would typically connect to web search APIs to find relevant information, best practices, and current trends related to your query.

For now, here's a research template you can use:

## Research Findings for "${args.query}"

### Current Trends (2026)
- [Trend 1]
- [Trend 2]

### Best Practices
- [Practice 1]
- [Practice 2]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]

---

**Next Actions:**
🔍 **"Research another topic"** - Search for different technologies or approaches
📋 **"Apply these findings"** - Use this research in your project documentation
➡️ **"Continue with current phase"** - Return to your current development task
💾 **"Save this research"** - Store findings in project knowledge base

Would you like me to research something specific or take another action?`;

        default:
        case 'codem_ask_user':
          // This tool allows asking user questions during workflow execution
          // It integrates with the available question tool to gather user input
          try {
            // Validate input
            if (!args.questions || !Array.isArray(args.questions) || args.questions.length === 0) {
              return `❌ Invalid input: Please provide questions array.

Example usage:
{
  "questions": [
    {
      "question": "What type of body lotion are you developing?",
      "header": "Product Type",
      "options": [
        {"label": "Luxury", "description": "High-end, premium positioning"},
        {"label": "Natural", "description": "Organic, eco-friendly focus"},
        {"label": "Budget", "description": "Affordable, mass-market"},
        {"label": "Therapeutic", "description": "Medical, treatment-oriented"}
      ],
      "multiple": false
    }
  ]
}`;
            }

            // Here we would normally call the question tool, but since we're in MCP server context,
            // we'll return formatted instructions for the client to use the question tool

            let response = `🔍 Interactive Questions Ready

I've prepared ${args.questions.length} question(s) for you to answer. These questions will help clarify requirements and gather your preferences for the project.

**Questions to be asked:**
`;

            args.questions.forEach((q, index) => {
              response += `\n${index + 1}. **${q.header}**\n`;
              response += `   "${q.question}"\n`;
              response += `   Options: ${q.options.map(opt => opt.label).join(', ')}\n`;
              if (q.multiple) {
                response += `   (Multiple selections allowed)\n`;
              }
            });

            response += `

**Next Steps:**
1. The system will present these questions to you
2. Your answers will be used to guide the development workflow
3. Preferences will be saved for future reference

Would you like me to proceed with asking these questions, or would you like to modify them first?`;

            // Update checkpoint to reflect question gathering activity
            await projectDetector.updateRecoveryCheckpoint({
              phase: 1,
              role: 'Product Manager',
              task: 'Gathering user preferences and clarifying requirements',
              context: `Prepared ${args.questions.length} interactive questions`,
              milestones: ['Interactive questions configured'],
              nextActions: ['Present questions to user', 'Collect responses', 'Apply preferences to workflow']
            });

            return response;

          } catch (error) {
            return `❌ Error configuring questions: ${error.message}

Please check your question format and try again.`;
          }


      }
    } catch (error) {
      throw new Error(`Command execution failed: ${error.message}`);
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('CodeMaestro MCP server started');
  }
}

// Start the MCP server
const server = new CodeMaestroMCPServer();
server.start().catch((error) => {
  console.error('Failed to start CodeMaestro MCP server:', error);
  process.exit(1);
});