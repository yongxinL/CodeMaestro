# CodeMaestro

**A comprehensive development workflow system with dual implementations**

## 🚀 Implementations

### **OpenCode Implementation** (Recommended - Root Directory)
**Location:** `./` | **Version:** 1.0.0 | **Status:** Production Ready | **Codename:** Phoenix

A complete 5-phase development workflow system built as a CLI tool for OpenCode that works with any LLM provider.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-151%20Passing-brightgreen.svg)](tests/)

**Key Features:**
- ✅ Complete 5-phase workflow (Requirements → Planning → Implementation → Verification → Release)
- ✅ Professional documentation templates and reports
- ✅ Real quality assurance (ESLint, Jest, security scanning)
- ✅ Interactive AI-assisted development workflows
- ✅ Token-aware development with budget tracking
- ✅ Multi-environment deployment orchestration
- ✅ Works with any LLM provider (OpenCode, Claude, GPT, etc.)

### **Claude Code Implementation** (Legacy - .CodeMaestro Directory)
**Location:** `.CodeMaestro/` | **Version:** 1.0.0 | **Status:** Legacy | **Maintained:** Yes

The original Claude Code-specific implementation with the same 5-phase workflow system.

**Key Features:**
- ✅ Original Claude Code integration and optimization
- ✅ All 5-phase workflow capabilities
- ✅ Comprehensive documentation system
- ✅ Claude Code-specific enhancements

## 🎯 Which Implementation Should You Use?

| Criteria | OpenCode Implementation | Claude Code Implementation |
|----------|------------------------|---------------------------|
| **LLM Compatibility** | Any provider (OpenCode, Claude, GPT, etc.) | Claude Code only |
| **Modern Architecture** | ✅ Latest Node.js, modular design | Legacy architecture |
| **Active Development** | ✅ Actively maintained & enhanced | ⚠️ Maintenance mode |
| **New Features** | ✅ All latest features & improvements | Limited updates |
| **CLI Experience** | ✅ Enhanced with colors, spinners, progress | Basic CLI experience |
| **Quality Gates** | ✅ Real ESLint, Jest, security scanning | Basic validation |
| **Deployment** | ✅ Multi-environment orchestration | Basic deployment |
| **Token Management** | ✅ Budget tracking & optimization | Not available |

**Recommendation:** Use the **OpenCode Implementation** for new projects and active development.

## 🔄 Implementation Architecture

### Dual Implementation Strategy

CodeMaestro maintains **both implementations** to provide maximum flexibility:

- **OpenCode Implementation**: Modern, cross-LLM compatible system at the root level
- **Claude Code Implementation**: Original Claude-specific system in `.CodeMaestro/`

This approach ensures:
- **Backwards Compatibility**: Existing Claude Code users can continue working
- **Migration Path**: Smooth transition to the more advanced OpenCode version
- **Choice**: Users can select the implementation that best fits their needs
- **Evolution**: Both implementations can evolve independently

### Technical Architecture

#### OpenCode Implementation (Root Level)
- **Framework**: Node.js CLI application
- **Architecture**: Modular, extensible design
- **Integration**: MCP-compatible tools
- **Quality**: Comprehensive testing and validation
- **Deployment**: Standard npm package structure

#### Claude Code Implementation (.CodeMaestro/)
- **Framework**: Claude Code native integration
- **Architecture**: Prompt-based workflow system
- **Integration**: Claude Code specific features
- **Quality**: Established validation processes
- **Deployment**: Claude Code project structure

## 📖 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [OpenCode Integration](#-opencode-integration-mcp)
- [Migration Guide](#-migration-guide)
- [Recovery & Checkpoints](#-recovery--checkpoints)
- [License](#-license)



## 🚀 Installation

### Prerequisites
- **Node.js**: Version 18 or higher (for OpenCode implementation)
- **OpenCode CLI**: Latest version (for OpenCode implementation)
- **Claude Code**: Latest version (for Claude Code implementation)
- **Git**: For version control operations
- **NPM**: For dependency management

### Option 1: OpenCode Implementation (Recommended)

#### Install OpenCode CLI
```bash
# Install OpenCode CLI globally
npm install -g opencode-cli

# Verify installation
opencode --version
```

#### Install CodeMaestro OpenCode
```bash
# Install globally for CLI access
npm install -g codemaestro (coming soon)

# Or install from source
git clone https://github.com/your-org/codemaestro.git
cd codemaestro
npm install
npm link  # For global CLI access
```

#### Verify CodeMaestro Installation
```bash
# Test CodeMaestro initialization (command line)
codem-init --help

# Initialize your project
codem-init  # Run this from command line to set up project

# Launch OpenCode and use natural language prompts for all workflow management
opencode
# Then use prompts like:
# "Show me the current project status"
# "Create a product specification"
# "Continue to the next development phase"
```

### Option 2: Claude Code Implementation (Legacy)

The Claude Code implementation is automatically available when you have Claude Code installed. It uses the files in the `.CodeMaestro/` directory.

#### Verify Claude Code Installation
```bash
# Ensure Claude Code is installed and working
claude --version

# The .CodeMaestro directory should be present
ls -la .CodeMaestro/
```

### Switching Between Implementations

You can use both implementations in the same project:

```bash
# Use OpenCode implementation
opencode
/codem-init  # Initialize with OpenCode features

# Use Claude Code implementation
claude
/init-phase 1  # Use legacy Claude Code workflow
```

Both implementations maintain separate project states and can coexist peacefully.

## 🔌 OpenCode Integration (MCP)

CodeMaestro integrates with OpenCode through the **Model Context Protocol (MCP)**, providing all workflow capabilities as AI-accessible tools.

### MCP Server Configuration

CodeMaestro automatically registers as an MCP server when installed. The following tools are available within OpenCode:

### **Available MCP Tools**

**Project Management:**
- **`codem_status`** - Show project status and current phase
- **`codem_next`** - Continue to next task/phase
- **`codem_phase`** - Jump to specific phase (1-5)
- **`codem_tree`** - View task dependency graph

**Workflow Phase Tools:**
- **`codem_requirements`** - Manage requirements (specs, stories, competitive analysis)
- **`codem_planning`** - Manage planning (blueprints, tasks, timelines)
- **`codem_implementation`** - Manage implementation (code generation, quality gates)
- **`codem_verification`** - Manage verification (evidence, quality assessment, GO/NO-GO)
- **`codem_release`** - Manage release (deployment, retrospectives, communication)

**Research & Knowledge:**
- **`codem_research`** - Research technologies and best practices
- **`codem_lookup`** - Get library documentation and examples
- **`codem_kb`** - Manage knowledge base (search, add, list)
- **`codem_commit`** - Generate CodeMaestro-style commit messages

### Using CodeMaestro in OpenCode

**Important:** `codem-init` must be run from the command line first to initialize the project. All workflow management is done through natural language prompts within OpenCode.

1. **Initialize project** (Command Line):
   ```bash
   cd your-project
   codem-init  # Run this from terminal first
   ```

2. **Start OpenCode** in your project directory:
   ```bash
   opencode
   ```

3. **Use natural language prompts** to invoke CodeMaestro tools:
   - *"Show me the current project status"*
   - *"Create a product specification"*
   - *"Continue to the next development phase"*
   - *"Research best practices for React state management"*

4. **Interactive next actions** - Each response includes clickable next action prompts to guide your workflow

   **Example:**
   ```
   📋 **"Create the product specification"** - Define the core product requirements
   🔍 **"Analyze the competitive landscape"** - Perform market research
   📝 **"Generate user stories"** - Create detailed user stories
   ➡️ **"Continue to planning phase"** - Move to technical architecture
   ```

   Click any suggested action or use natural language - no command memorization needed!

5. **Automatic checkpointing** - Recovery checkpoints are updated after each major action, allowing you to resume exactly where you left off

5. **Context-aware workflow** - OpenCode automatically suggests relevant CodeMaestro tools based on your current development phase

### MCP Server Details

The CodeMaestro MCP server (`mcp-server.js`) provides:
- **15 specialized tools** covering the complete development lifecycle
- **Error handling** with meaningful error messages
- **Async execution** for long-running operations
- **Type-safe interfaces** with JSON schema validation

### Configuration

The MCP server is automatically configured in `~/.config/opencode/opencode.json`:

```json
{
  "mcp": {
    "codemaestro": {
      "type": "local",
      "command": ["node", "/path/to/codemaestro/mcp-server.js"],
      "enabled": true
    }
  }
}
```

## 🔄 Migration Guide

#### From Claude Code to OpenCode
If you're currently using the Claude Code implementation, you can migrate to OpenCode:

1. **Backup your current work**
   ```bash
   cp -r .CodeMaestro .CodeMaestro-backup
   ```

2. **Initialize OpenCode in your project**
   ```bash
   # From your project root
   codem-init  # This will create OpenCode project structure
   ```

3. **Continue development with OpenCode**
   ```bash
   # Launch OpenCode and use natural language prompts
   opencode
   # Use prompts like:
   # "Show me the current project status"
   # "Continue with the development workflow"
   # "Create a product specification"
   ```

The original Claude Code implementation remains available in `.CodeMaestro/` if you need to reference it.

#### Using Both Simultaneously
You can use both implementations in the same project:

```bash
# Claude Code workflow (legacy)
claude
/init-phase 1

# OpenCode workflow (recommended - separate session)
opencode
# After running 'codem-init' from command line, use natural language prompts:
# "Create a product specification"
# "Continue to the next development phase"
```

**Note:** OpenCode workflow requires `codem-init` to be run from command line first. Each implementation maintains separate project state and documentation.

## 🔄 Recovery & Checkpoints

CodeMaestro automatically maintains recovery checkpoints that allow you to resume your work exactly where you left off, even after restarting OpenCode or switching sessions.

### Automatic Checkpoint Updates

Every major action updates the recovery checkpoint (`docs/implementation/.recovery-checkpoint.md`):

- **Phase transitions** - When moving between development phases
- **Major tasks** - When completing specifications, analysis, or implementations
- **Research activities** - When conducting technology research
- **Status changes** - When updating project state

### Recovery Checkpoint Contents

Each checkpoint includes:
- **Current phase and role** - Where you are in the development process
- **Active task** - What you're currently working on
- **Completed milestones** - What you've finished
- **Next actions** - Suggested next steps
- **Project context** - Current focus and blockers

### Using Recovery Checkpoints

If you need to resume work:

1. **Check status**: *"Show me the current project status"*
2. **Review checkpoint**: The system will show your last saved state
3. **Continue work**: Pick up from your last checkpoint

**The checkpoint system ensures you never lose progress and can always continue development seamlessly.**

## 🏁 Quick Start

### 1. Initialize CodeMaestro Project (Command Line)
```bash
# Create a new project directory
mkdir my-awesome-app
cd my-awesome-app

# Initialize CodeMaestro (run from command line)
codem-init

# This creates the project structure and configuration
```

### 2. Start Development Workflow (Within OpenCode)
```bash
# Launch OpenCode in your project directory
opencode

# Within OpenCode, use natural language prompts to invoke CodeMaestro tools:
```

#### Phase 1: Requirements Gathering
- *"Create a product specification for this project"*
- *"Analyze competitors in the market"*
- *"Generate user stories for the requirements"*

#### Phase 2: Technical Planning
- *"Create a technical blueprint for this project"*
- *"Break down the project into tasks and estimate effort"*
- *"Generate a project timeline"*

#### Phase 3: Implementation
- *"Generate code based on the requirements"*
- *"Run quality checks on the implementation"*
- *"Show implementation progress"*

#### Phase 4: Verification
- *"Collect evidence from all development phases"*
- *"Run comprehensive quality assessment"*
- *"Make a GO/NO-GO release decision"*

#### Phase 5: Release
- *"Run pre-release checks"*
- *"Deploy to staging environment"*
- *"Deploy to production environment"*
- *"Capture lessons learned from this project"*

### 3. Workflow Navigation
- *"Show me the current project status"*
- *"Continue to the next phase"*
- *"Jump to phase 3 (implementation)"*
- *"Show the task dependency graph"*

### 4. Additional Tools
- *"Research best practices for React state management"*
- *"Get documentation and examples for React library"*
- *"Search the knowledge base for authentication patterns"*
- *"Generate a commit message for: added user login feature"*"









## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenCode Team** for the excellent CLI platform
- **CodeMaestro Contributors** for the framework architecture
- **MCP Community** for the Model Context Protocol
- **Open Source Community** for the amazing tools and libraries

## 📞 Support

### Getting Help
1. **Check Documentation**: Review this README and command references
2. **Run Diagnostics**: Check project status through OpenCode with *"Show me the current project status"* prompt
3. **Search Issues**: Check existing GitHub issues for similar problems
4. **Community Support**: Join our Discord/Slack community

### Issue Reporting
When reporting issues, please include:
- **CodeMaestro Version**: Check version in package.json or project files
- **OpenCode Version**: `opencode --version`
- **Node.js Version**: `node --version`
- **OS & Architecture**: `uname -a`
- **Full Error Output**: Complete error messages and stack traces
- **Steps to Reproduce**: Detailed reproduction steps

### Feature Requests
- **Check Roadmap**: See what's planned for future releases
- **Use Templates**: Use our feature request issue template
- **Provide Context**: Explain your use case and business value

---

**CodeMaestro OpenCode** - Transforming software development through structured workflows and AI assistance.

**Version:** 1.0.0 | **Release Date:** 2026-01-22 | **Maintainer:** CodeMaestro Team

[⬆️ Back to Top](#codemaestro)
