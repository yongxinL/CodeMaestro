# CodeMaestro OpenCode Integration

**Version:** 0.1.0
**Status:** Development (Phase 1: Foundation)

This directory contains the OpenCode integration for CodeMaestro, transforming the Claude Code-specific framework into a CLI tool that works with any LLM provider.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenCode CLI installed

### Installation
```bash
cd .CodeMaestro/opencode
npm install
```

### Development
```bash
# Run tests
npm test

# Run linter
npm run lint

# Run full build (lint + test)
npm run build

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
.CodeMaestro/opencode/
├── commands/          # CLI command implementations
│   ├── init.js       # /codem-init command
│   └── status.js     # /codem-status command
├── lib/              # Shared utilities
│   ├── config.js     # Configuration loader
│   ├── logger.js     # Logging utilities
│   └── project.js    # Project detection & validation
├── tests/            # Test files
├── config/           # Configuration files
├── package.json      # Dependencies and scripts
├── jest.config.js    # Test configuration
└── .eslintrc.json    # Linting configuration
```

## 🎯 Available Commands

### Global Commands (Available anywhere)
- `/codem-init` - Initialize CodeMaestro project
- `/codem-status` - Show project status

### Project Commands (CodeMaestro projects only)
- `/codem-next` - Continue to next task
- `/codem-phase [N]` - Jump to specific phase
- `/codem-commit` - Generate CodeMaestro-style commits
- `/codem-kb` - Knowledge base management
- `/codem-tree` - View task DAG

## 🔧 Development Guide

### Creating a New Command

1. **Create command file** in `commands/` directory:
```javascript
#!/usr/bin/env node

const { program } = require('commander');
const logger = require('../lib/logger');
// ... other imports

async function myCommand(options) {
  try {
    logger.info('Running my command...');
    // Implementation here
    logger.success('Command completed!');
  } catch (error) {
    logger.error('Command failed', error);
    process.exit(1);
  }
}

// CLI setup
program
  .name('codem-my-command')
  .description('Description of my command')
  .option('-v, --verbose', 'Verbose output')
  .action(myCommand);

program.parse();
```

2. **Add command to package.json** scripts if needed
3. **Create tests** in `tests/` directory
4. **Update documentation**

### Using Shared Libraries

#### Logger
```javascript
const logger = require('../lib/logger');

logger.info('Info message');
logger.success('Success message');
logger.error('Error message');
logger.warn('Warning message');
logger.debug('Debug message');

const spinner = logger.startSpinner('Loading...');
// Do work
spinner.succeed('Done!');
```

#### Configuration
```javascript
const config = require('../lib/config');

// Load configuration
const cfg = await config.load();
console.log(cfg.project.name);
```

#### Project Detection
```javascript
const projectDetector = require('../lib/project');

// Check if CodeMaestro project
const isValid = await projectDetector.isCodeMaestroProject();

// Get project status
const status = await projectDetector.getProjectStatus();
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test
npm test -- config.test.js

# Run with coverage
npm test -- --coverage
```

### Writing Tests
```javascript
const config = require('../lib/config');

describe('Config Loader', () => {
  test('should load default configuration', async () => {
    const cfg = await config.load();
    expect(cfg.version).toBe('0.1.0');
  });
});
```

## 📋 Code Quality

### Linting
```bash
# Check code quality
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Coding Standards
- Use ES6+ features
- Single quotes for strings
- Semicolons required
- 2-space indentation
- Descriptive variable names
- JSDoc comments for functions

## 🔗 Integration Points

### MCP Tools
The integration leverages these MCP tools:
- **Context7**: Library documentation and code examples
- **WebSearch**: Research and competitive analysis
- **WebFetch**: Specific URL content retrieval

### OpenCode Features
- Multi-session support
- Shareable session links
- LSP integration
- Any LLM provider support

## 🚦 Development Phases

### ✅ Phase 1: Foundation (Completed)
- [x] Development environment setup
- [x] Basic project structure
- [x] Configuration system
- [x] Logging utilities
- [x] Project detection
- [x] `/codem-init` command
- [x] `/codem-status` command
- [x] Testing framework
- [x] Code quality tools

### 🔄 Phase 2: Core Skills (In Progress)
- [ ] `/codem-commit` command
- [ ] `/codem-kb` command
- [ ] `/codem-next` command
- [ ] `/codem-phase` command
- [ ] MCP tool integration
- [ ] Knowledge base system

### 📋 Phase 3: Agent Orchestration (Planned)
- [ ] Complete 5-phase workflow
- [ ] Interactive wizards
- [ ] Session management
- [ ] Recovery checkpoints

## 📚 Resources

- [OpenCode Documentation](https://opencode.ai/docs)
- [CodeMaestro Framework](../docs/)
- [MCP Specification](https://modelcontextprotocol.io)
- [Chalk Documentation](https://github.com/chalk/chalk)

## 🤝 Contributing

1. Follow the coding standards
2. Write tests for new features
3. Update documentation
4. Run full build before committing

## 📞 Support

For issues related to:
- **OpenCode integration**: Check OpenCode documentation
- **CodeMaestro framework**: See main framework docs
- **MCP tools**: Refer to MCP specification

---

**Last Updated:** 2026-01-22
**Maintainer:** CodeMaestro Team