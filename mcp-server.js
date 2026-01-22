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
    return new Promise((resolve, reject) => {
      // Map MCP tool names to actual command names
      const commandMap = {
        codem_init: 'codem-init',
        codem_status: 'codem-status',
        codem_next: 'codem-next',
        codem_phase: 'codem-phase',
        codem_requirements: 'codem-requirements',
        codem_planning: 'codem-planning',
        codem_implementation: 'codem-implementation',
        codem_verification: 'codem-verification',
        codem_release: 'codem-release',
        codem_research: 'codem-research',
        codem_lookup: 'codem-lookup',
        codem_kb: 'codem-kb',
        codem_commit: 'codem-commit',
        codem_tree: 'codem-tree',
      };

      const actualCommand = commandMap[commandName];
      if (!actualCommand) {
        reject(new Error(`Unknown command: ${commandName}`));
        return;
      }

      // Build command arguments
      const commandArgs = [];

      // Add arguments based on command type
      switch (commandName) {
        case 'codem_init':
          if (args.force) commandArgs.push('--force');
          break;
        case 'codem_status':
          if (args.verbose) commandArgs.push('--verbose');
          if (args.json) commandArgs.push('--json');
          break;
        case 'codem_phase':
          if (args.phase) commandArgs.push(args.phase.toString());
          break;
        case 'codem_requirements':
        case 'codem_planning':
        case 'codem_implementation':
          commandArgs.push(args.action || 'guide');
          if (args.interactive) commandArgs.push('--interactive');
          break;
        case 'codem_verification':
        case 'codem_release':
          commandArgs.push(args.action || 'guide');
          if (args.environment) commandArgs.push('--environment', args.environment);
          if (args.version) commandArgs.push('--version', args.version);
          break;
        case 'codem_research':
          if (args.query) commandArgs.push(args.query);
          break;
        case 'codem_lookup':
          if (args.library) commandArgs.push(args.library);
          if (args.examples) commandArgs.push('--examples');
          break;
        case 'codem_kb':
          commandArgs.push(args.action || 'list');
          if (args.query) commandArgs.push(args.query);
          if (args.topic) commandArgs.push(args.topic);
          break;
        case 'codem_commit':
          if (args.message) commandArgs.push(args.message);
          break;
        case 'codem_tree':
          if (args.visual) commandArgs.push('--visual');
          break;
      }

      // Execute the command
      const child = spawn(actualCommand, commandArgs, {
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
          resolve(stdout || 'Command executed successfully');
        } else {
          reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to execute command: ${error.message}`));
      });
    });
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