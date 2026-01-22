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
             description: 'Ask user questions to gather preferences, clarify requirements, or get implementation choices during workflow execution (compatible with ask-user-questions-mcp format)',
             inputSchema: {
               type: 'object',
               properties: {
                 questions: {
                   type: 'array',
                   description: 'Questions to ask the user (1-4 questions)',
                   minItems: 1,
                   maxItems: 4,
                   items: {
                     type: 'object',
                     properties: {
                       prompt: {
                         type: 'string',
                         description: 'The complete question to ask the user. Should be clear, specific, and end with a question mark.',
                       },
                       title: {
                         type: 'string',
                         description: 'Very short label displayed as a chip/tag (max 12 chars). Examples: "Auth method", "Library", "Approach".',
                         maxLength: 12,
                       },
                       options: {
                         type: 'array',
                         description: 'The available choices for this question. Must have 2-4 options.',
                         minItems: 2,
                         maxItems: 4,
                         items: {
                           type: 'object',
                           properties: {
                             label: {
                               type: 'string',
                               description: 'The display text for this option that the user will see and select. Should be concise (1-5 words).',
                             },
                             description: {
                               type: 'string',
                               description: 'Explanation of what this option means or what will happen if chosen.',
                             },
                           },
                           required: ['label'],
                         },
                       },
                       multiSelect: {
                         type: 'boolean',
                         description: 'Set to true to allow the user to select multiple options instead of just one. Default: false (single-select).',
                       },
                     },
                     required: ['prompt', 'title', 'options'],
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
                task: 'Creating product specification with user input',
                context: 'Gathering specification details interactively',
                milestones: ['Started product specification'],
                nextActions: ['Complete specification details', 'Analyze competitive landscape', 'Generate user stories']
              });

              // Return questions in ask-user-questions-mcp format for interactive collection
              return `🔍 Interactive Product Specification Creation

To create a comprehensive product specification, I need to ask you some key questions. Here are the questions I'll ask:

**Questions to be answered:**
1. **Product Name**: What is the name of your product?
2. **Target Audience**: Who is the target audience for this product?
3. **Problem Solved**: What is the primary problem this product solves?
4. **Technology Stack**: What is your preferred technology stack?

**Ready to begin the interactive questioning process?**

**To start interactive questioning, use:**
*"Ask me questions about my product specification"*

**Or use the codem_ask_user tool directly:**
\`\`\`
{
  "questions": [
    {
      "prompt": "What is the name of your product?",
      "title": "Product Name",
      "options": [
        {"label": "Green Landing", "description": "Current project name"},
        {"label": "Custom Name", "description": "Enter a different product name"}
      ],
      "multiSelect": false
    },
    {
      "prompt": "Who is the target audience for this product?",
      "title": "Target Audience",
      "options": [
        {"label": "Small Business Owners", "description": "Entrepreneurs and small business operators"},
        {"label": "Enterprise Customers", "description": "Large organizations and corporations"},
        {"label": "Individual Consumers", "description": "End users and consumers"},
        {"label": "Developers", "description": "Software developers and technical users"}
      ],
      "multiSelect": true
    },
    {
      "prompt": "What is the primary problem this product solves?",
      "title": "Problem Solved",
      "options": [
        {"label": "Process Automation", "description": "Automating manual processes"},
        {"label": "Data Management", "description": "Organizing and analyzing data"},
        {"label": "Communication", "description": "Improving communication and collaboration"},
        {"label": "Productivity", "description": "Increasing efficiency and productivity"}
      ],
      "multiSelect": false
    },
    {
      "prompt": "What is your preferred technology stack?",
      "title": "Tech Stack",
      "options": [
        {"label": "React + Node.js", "description": "JavaScript full-stack solution"},
        {"label": "Vue + Python", "description": "Progressive frontend with Django/Flask"},
        {"label": "Angular + Java", "description": "Enterprise-grade solution"},
        {"label": "Other", "description": "Specify custom technology preferences"}
      ],
      "multiSelect": false
    }
  ]
}
\`\`\`

**Next Actions:**
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria
➡️ **"Continue to planning phase"** - Move to technical architecture and design

Would you like to start the interactive specification process or take another action?`;

            case 'competitive':
              // Update checkpoint for competitive analysis
              await projectDetector.updateRecoveryCheckpoint({
                phase: 1,
                role: 'Product Manager',
                task: 'Performing competitive analysis with user input',
                context: 'Gathering competitive analysis details interactively',
                milestones: ['Started competitive analysis'],
                nextActions: ['Complete market research', 'Define competitive positioning', 'Move to planning phase']
              });

              return `🔍 Interactive Competitive Analysis

To perform a comprehensive competitive analysis, I need to ask you targeted questions about your market positioning. Here are the key questions:

**Questions to be answered:**
1. **Market Segment**: What type of body lotion are you developing?
2. **Key Competitors**: Who are your main competitors?
3. **Competitive Advantages**: What makes your product unique?
4. **Market Position**: How do you want to position your product?
5. **Pricing Strategy**: What price point are you targeting?

**To start interactive questioning, use:**
*"Ask me questions about competitive analysis"*

**Or use the codem_ask_user tool with:**
\`\`\`
{
  "questions": [
    {
      "prompt": "What type of body lotion are you developing?",
      "title": "Market Segment",
      "options": [
        {"label": "Luxury", "description": "High-end, premium positioning"},
        {"label": "Natural/Organic", "description": "Eco-friendly, natural ingredients"},
        {"label": "Budget", "description": "Affordable, mass-market"},
        {"label": "Therapeutic", "description": "Medical, treatment-oriented"},
        {"label": "Specialty", "description": "Niche market focus"}
      ],
      "multiSelect": false
    },
    {
      "prompt": "What price point are you targeting?",
      "title": "Pricing Strategy",
      "options": [
        {"label": "$5-15", "description": "Budget-friendly products"},
        {"label": "$15-30", "description": "Mid-range positioning"},
        {"label": "$30-60", "description": "Premium products"},
        {"label": "$60+", "description": "Luxury/high-end market"}
      ],
      "multiSelect": false
    }
  ]
}
\`\`\`

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
📝 **"Generate user stories"** - Create detailed user stories and acceptance criteria
➡️ **"Continue to planning phase"** - Move to technical architecture and design

Would you like to start the interactive competitive analysis or take another action?`;

            case 'stories':
              // Update checkpoint for user story generation
              await projectDetector.updateRecoveryCheckpoint({
                phase: 1,
                role: 'Product Manager',
                task: 'Generating user stories with user input',
                context: 'Creating user stories interactively',
                milestones: ['Generated initial user stories'],
                nextActions: ['Customize user stories', 'Create acceptance criteria', 'Move to planning phase']
              });

              return `📝 Interactive User Story Generation

To create user stories that accurately reflect your product's value proposition, I need to ask you questions about your key user personas and their needs.

**Questions to be answered:**
1. **Primary User Persona**: Who is your main target user?
2. **Key User Goals**: What are the most important tasks users want to accomplish?
3. **Pain Points**: What problems do users currently face?
4. **Success Criteria**: How will users know they've achieved their goals?

**To start interactive questioning, use:**
*"Ask me questions about user stories and personas"*

**Or use the codem_ask_user tool with:**
\`\`\`
{
  "questions": [
    {
      "prompt": "Who is your primary target user persona?",
      "title": "Primary Persona",
      "options": [
        {"label": "Busy Professional", "description": "Time-constrained office workers"},
        {"label": "Health-Conscious Consumer", "description": "Focus on wellness and natural products"},
        {"label": "Eco-Conscious Shopper", "description": "Environmentally aware consumers"},
        {"label": "Beauty Enthusiast", "description": "Skincare and beauty focused users"},
        {"label": "Budget Shopper", "description": "Value-driven price-sensitive buyers"}
      ],
      "multiSelect": true
    },
    {
      "prompt": "What are the most important user goals?",
      "title": "Key Goals",
      "options": [
        {"label": "Quick Absorption", "description": "Fast-acting moisturization"},
        {"label": "Long-lasting Moisture", "description": "Extended hydration benefits"},
        {"label": "Natural Ingredients", "description": "Clean, organic formulations"},
        {"label": "Affordable Pricing", "description": "Value for money"},
        {"label": "Convenient Packaging", "description": "Easy to use and carry"}
      ],
      "multiSelect": true
    }
  ]
}
\`\`\`

**Next Actions:**
📋 **"Create the product specification"** - Define the core product requirements
🔍 **"Analyze the competitive landscape"** - Perform market research and competitor analysis
➡️ **"Continue to planning phase"** - Move to technical architecture and design

Would you like to start the interactive user story generation or take another action?`;

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
          // It uses the available question tool to present interactive questions to the user
          try {
            // Validate input format similar to ask-user-questions-mcp
            if (!args.questions || !Array.isArray(args.questions) || args.questions.length === 0) {
              return `❌ Invalid input: Please provide questions array.

Example usage (following ask-user-questions-mcp format):
{
  "questions": [
    {
      "prompt": "What type of body lotion are you developing?",
      "title": "Product Type",
      "options": [
        {"label": "Luxury", "description": "High-end, premium positioning"},
        {"label": "Natural", "description": "Organic, eco-friendly focus"},
        {"label": "Budget", "description": "Affordable, mass-market"},
        {"label": "Therapeutic", "description": "Medical, treatment-oriented"}
      ],
      "multiSelect": false
    }
  ]
}

Note: Use 'prompt' instead of 'question', 'title' instead of 'header', and 'multiSelect' instead of 'multiple'.`;
            }

            // Validate each question format (ask-user-questions-mcp compatible)
            const validatedQuestions = [];
            for (const q of args.questions) {
              if (!q.prompt || !q.title || !q.options || !Array.isArray(q.options)) {
                return `❌ Invalid question format. Each question must have: prompt, title, options array.

Required fields:
- prompt: The full question text (ends with ?)
- title: Short label (max 12 chars)
- options: Array of {label, description} objects (2-4 options)
- multiSelect: Boolean (optional, defaults to false)

Example:
{
  "prompt": "Which framework do you prefer?",
  "title": "Framework",
  "options": [
    {"label": "React", "description": "Component-based UI library"},
    {"label": "Vue", "description": "Progressive JavaScript framework"}
  ],
  "multiSelect": false
}`;
              }

              // Validate options
              if (q.options.length < 2 || q.options.length > 4) {
                return `❌ Each question must have 2-4 options. Found ${q.options.length} options.`;
              }

              // Validate title length
              if (q.title.length > 12) {
                return `❌ Question title "${q.title}" is too long (${q.title.length} chars). Maximum 12 characters allowed.`;
              }

              // Convert to the format expected by our question tool
              validatedQuestions.push({
                question: q.prompt,
                header: q.title,
                options: q.options,
                multiple: q.multiSelect || false
              });
            }

            // Since we can't directly call the question tool from MCP server context,
            // we'll format the questions and instruct the client to use the question tool
            let response = `🔍 Interactive Questions Prepared

I've prepared ${validatedQuestions.length} question(s) for interactive user input. These will be presented using the question tool.

**Prepared Questions:**
`;

            validatedQuestions.forEach((q, index) => {
              response += `\n${index + 1}. **${q.header}**\n`;
              response += `   "${q.question}"\n`;
              response += `   Options:\n`;
              q.options.forEach((opt, optIndex) => {
                response += `     ${optIndex + 1}. ${opt.label}`;
                if (opt.description) {
                  response += ` - ${opt.description}`;
                }
                response += '\n';
              });
              if (q.multiple) {
                response += `   (Multiple selections allowed)\n`;
              } else {
                response += `   (Single selection)\n`;
              }
            });

            response += `

**To proceed with asking these questions:**
1. The system will use the integrated question tool
2. Questions will be presented in an interactive interface
3. User selections will be captured and returned
4. Responses will guide the development workflow

**Question Tool Integration:**
- Compatible with ask-user-questions-mcp format
- Supports 1-4 questions per interaction
- Handles single/multiple choice selections
- Allows custom text input as fallback

Would you like me to proceed with presenting these questions to gather user preferences?`;

            // Update checkpoint to reflect question preparation
            await projectDetector.updateRecoveryCheckpoint({
              phase: 1,
              role: 'Product Manager',
              task: 'Preparing interactive questions for user input',
              context: `Configured ${validatedQuestions.length} questions for interactive gathering`,
              milestones: ['Questions validated and prepared'],
              nextActions: ['Present questions via question tool', 'Collect user responses', 'Apply preferences to workflow']
            });

            return response;

          } catch (error) {
            return `❌ Error preparing questions: ${error.message}

Please check your question format and ensure it follows the ask-user-questions-mcp specification.`;
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