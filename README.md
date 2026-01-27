# CodeMaestro v1.1.0

## 🚀 Welcome to CodeMaestro

CodeMaestro is a role-based automated development system that orchestrates software development through a 5-phase lifecycle with intelligent session management, progressive disclosure, token estimation, and organizational learning.

**Codename:** Phoenix
**Version:** 1.1.0
**Release Date:** 2026-01-27

---

## 📦 What's Included

This repository contains the complete CodeMaestro framework:
- ✅ **`CLAUDE.md`** - Developer guide for Claude Code
- ✅ **`.CodeMaestro/`** - Complete framework (easy to exclude from deliverables)
  - `prompts/` - Modular phase prompts and templates
  - `config/` - Configuration files, git templates
  - `agents/` - 9 specialized agents (v1.1)
  - `orchestrator/` - Agent coordination and handoff protocol (v1.1)
  - `docs/` - Command references (Core & Advanced)
  - `init-docs.sh` - Project initialization script
- ✅ **`LICENSE`** - Copyright and license information

**Framework Architecture:** All CodeMaestro files are in the `.CodeMaestro/` hidden directory for easy exclusion from project deliverables.

---

## ✨ What's New in v1.0.0

### 🗂️ Feature 1: Repository Reorganization
- **All framework files** consolidated in `.CodeMaestro/` directory
- Clean root: Only `CLAUDE.md` and `LICENSE`
- **Easy exclusion:** One directory vs 14+ scattered files
- User projects get their own `.CodeMaestro/` directory via `setup.sh`

### 🧹 Feature 2: File Exclusion System
- **`cleanup.sh`** script automatically generated in user projects
- 4 cleanup modes: `--verify`, `--apply`, `--dry-run`, `--validate-build`
- Removes framework files before final delivery
- Preserves user documentation (`docs/`), code, and project artifacts
- Integrated into Phase 5 release workflow
- See [.CodeMaestro/config/cleanup-verification.md](.CodeMaestro/config/cleanup-verification.md)

### 💰 Feature 3: Token Estimation & Budget Management
- **Comprehensive token estimation** across all phases
- **Phase 2:** Token estimates during task decomposition
- **Phase 3:** Session budget checks before each task
- **Phase 4:** Token efficiency metrics in evidence package
- **Phase 5:** Token retrospective in lessons learned
- **Commands:** `/estimate`, `/budget`, `/variance`, `/tokens`
- **Session budget:** 800K usable tokens (80% of 1M Sonnet context)
- **Variance tracking:** Excellent (<±10%), Good (±10-20%), Needs Improvement (>±20%)
- See [.CodeMaestro/config/token-estimation.md](.CodeMaestro/config/token-estimation.md)

### 🔄 Feature 4: Session Handoff Messages
- **Comprehensive handoff** at all phase checkpoints (2→3, 3→4, 4→5)
- **10-section structure:** Context, accomplishments, next steps, critical decisions, files, token metrics, git state, recovery
- **Phase-specific templates** for all transitions
- **Mid-session resume** and recovery handoffs
- **Command:** `/handoff` with multiple options
- See [.CodeMaestro/config/handoff-messages.md](.CodeMaestro/config/handoff-messages.md)

### 🎯 Other v1.0 Features
- **Token Optimization:** 50-55% reduction via progressive disclosure
- **Knowledge Base System:** Project learns from failures and successes
- **Data Interpreter Role:** Automatic performance visualization
- **Ethical Validation:** Bias checks, GDPR compliance, WCAG accessibility
- **Domain-Specific Architecture:** Auto-detection (Mobile/Web/Cloud/AI)
- **State Management Optimization:** Explicit state/data flow focus
- **Harmonic Resonance:** Module-level architectural vision
- **Gantt Visualization:** Visual timeline alongside dependency DAG
- **Portfolio Generation:** On-demand professional documentation

---

## ✨ What's New in v1.1.0

### 💬 Feature 5: Natural Language Interface
- **Use natural language** instead of slash commands
- Say "Search knowledge base" instead of `/kb search`
- Say "Generate a commit" instead of `/commit`
- Automatic intent detection with confirmation
- Native support in Claude Code environment

### 🧠 Feature 6: Continuous Learning
- **Auto-capture patterns** from development sessions
- Instinct-based learning with confidence scoring (0.3 → 0.9)
- Learns from user corrections and error resolutions
- See [.CodeMaestro/config/continuous-learning.md](.CodeMaestro/config/continuous-learning.md)

### ✅ Feature 7: Automated Verification Loop
- **6-phase verification**: Build, Types, Lint, Tests, Security, Diff
- Run with "Verify my changes"
- Automatic quality gate checking
- See [.CodeMaestro/config/verification-loop.md](.CodeMaestro/config/verification-loop.md)

### 🤖 Feature 8: Agent-Based Architecture
- **Complete migration** from role-based to agent-based orchestration
- **9 specialized agents** with minimal context handoffs
- **Model optimization**: Agents assigned to Sonnet or Haiku based on task complexity
- **Parallel execution**: Independent agents can run concurrently
- Agents: `product-manager`, `architect`, `planner`, `developer`, `code-reviewer`, `qa-lead`, `security-engineer`, `data-interpreter`, `release-manager`
- Orchestrated by `phase-controller` with `handoff-protocol`
- See [.CodeMaestro/agents/](.CodeMaestro/agents/) and [.CodeMaestro/orchestrator/](.CodeMaestro/orchestrator/)

### ❓ Feature 9: Clarifying Questions
- **Structured questions** for Phase 1 & 2
- Multiple-choice + "Other" option format
- Reduces hallucination by gathering context first
- Optional MCP integration with ask-user-questions
- See [.CodeMaestro/config/clarifying-questions.md](.CodeMaestro/config/clarifying-questions.md)

### 📊 Feature 10: Session End Summary
- **Structured output** when ending sessions
- Progress, token usage, files modified
- Next action and resume prompt
- See [.CodeMaestro/config/session-end-protocol.md](.CodeMaestro/config/session-end-protocol.md)

---

## 🔧 Installation

### Step 1: Initialize Your Project

```bash
# Clone or copy CodeMaestro to your project
cd /path/to/your-project

# Run setup script (creates .CodeMaestro/ and docs/ in your project)
chmod +x /path/to/CodeMaestro/setup.sh
/path/to/CodeMaestro/setup.sh

# Copy CLAUDE.md to your project root
cp /path/to/CodeMaestro/CLAUDE.md ./CLAUDE.md
```

**What `setup.sh` does:**
1. Creates `.CodeMaestro/` directory in your project (local copy of framework)
2. Generates `docs/` structure for your project documentation
3. Creates `cleanup.sh` script for framework removal before delivery
4. Generates `.gitignore` with framework exclusion patterns
5. Creates empty knowledge base index

### Step 2: Initialize Git

```bash
# Initialize git repository
git init

# Create develop branch
git checkout -b dev

# Initial commit
git add .
git commit -m "Initial project setup with CodeMaestro v0.1.0

- Initialized CodeMaestro framework
- Role-based 5-phase workflow enabled
- Created documentation structure
- Token estimation and handoff system active

Status: Ready for Phase 1"
```

### Step 3: Verify Installation

Check that you have:
```
your-project/
├── CLAUDE.md                     ✅ Framework developer guide
├── cleanup.sh                    ✅ Framework cleanup script
├── .gitignore                    ✅ Excludes .CodeMaestro/ from version control
├── .CodeMaestro/                 ✅ Local framework copy
│   ├── init-docs.sh             ✅ Initialization script (reusable)
│   ├── prompts/                 ✅ Phase prompts (00-05)
│   │   ├── 00-core.md           ✅ System configuration
│   │   ├── 01-requirement.md    ✅ Phase 1 workflow
│   │   ├── 02-planning.md       ✅ Phase 2 workflow
│   │   ├── 03-implementation.md ✅ Phase 3 workflow
│   │   ├── 04-verification.md   ✅ Phase 4 workflow
│   │   ├── 05-master-control.md ✅ Phase 5 workflow
│   │   └── [templates].md       ✅ On-demand templates
│   ├── agents/                  ✅ NEW v1.1: 9 specialized agents
│   │   ├── product-manager.md   ✅ Phase 1 agent
│   │   ├── architect.md         ✅ Phase 2 agent
│   │   ├── developer.md         ✅ Phase 3 agent
│   │   └── [6 more agents]      ✅ See agent directory
│   ├── orchestrator/            ✅ NEW v1.1: Agent coordination
│   │   ├── phase-controller.md  ✅ Agent invocation & state
│   │   └── handoff-protocol.md  ✅ Context passing protocol
│   ├── config/                  ✅ Configuration files
│   │   ├── token-estimation.md  ✅ NEW v1.0: Token estimation guide
│   │   ├── handoff-messages.md  ✅ NEW v1.0: Session handoff templates
│   │   ├── cleanup-verification.md ✅ NEW v1.0: Cleanup guide
│   │   ├── git-commands.md      ✅ Git templates
│   │   └── constraints-reference.md ✅ Full constraint list
│   └── docs/                    ✅ Command references
│       ├── INTERACTIONS-CORE.md ✅ Essential interactions (Phases 1-5)
│       └── INTERACTIONS-ADVANCED.md ✅ Advanced interactions (Phases 4-5)
└── docs/                         ✅ YOUR project documentation
    ├── specifications/          ✅ Phase 1 outputs
    ├── architecture/            ✅ Phase 2 outputs
    ├── implementation/          ✅ Phase 3 tracking
    ├── verification/            ✅ Phase 4 evidence
    ├── release/                 ✅ Phase 5 release docs
    ├── knowledge-base/          ✅ Project learnings
    │   └── kb-index.md          ✅ Fresh index (0 entries)
    └── portfolio/               ✅ Portfolio generation
```

**Note:** The `.CodeMaestro/` directory is in `.gitignore` by default. You can remove it from deliverables using `cleanup.sh`.

---

## 🎯 Quick Start

### For Claude Code (CLI) - Recommended ✅

**Best for:** Token efficiency, automatic file loading, full feature set

With all files in place:

```bash
# Open Claude Code in your project directory
# It will automatically detect CLAUDE.md and load CodeMaestro
```

**In Claude Code, say:**
```
"Let's start Phase 1. I want to build a [describe your project]."
```

Claude Code will automatically:
- Load `.CodeMaestro/prompts/00-core.md` (system config)
- Load phase prompts progressively
- Load templates on-demand
- Track token usage (Feature 3)
- Generate handoff messages at checkpoints (Feature 4)
- Use 50-55% fewer tokens vs. standalone approach

---

## 📚 Phase-by-Phase Guide

### Phase 1: Requirement Deconstruction
- **Role:** Product Manager
- **Input:** Your project idea
- **Output:** Locked Specification, Competitive Analysis
- **Duration:** 1-2 hours
- **Token Estimate:** 5K-15K per session

### Phase 2: Planning and Orchestration
- **Role:** Software Architect
- **Input:** Locked Specification
- **Output:** Blueprint, Task DAG, Gantt Chart, **Token Estimates**
- **Duration:** 2-4 hours
- **Token Estimate:** 10K-30K per session
- **NEW:** Token budgets assigned to all tasks

### Phase 3: Implementation
- **Role:** Senior Developer
- **Input:** Blueprint and Tasks
- **Output:** Production code, Module Contexts, Token Tracking
- **Duration:** Varies by project size
- **Token Estimate:** 15K-50K per task
- **NEW:** Session budget checks before each task (Step 3.3.1c)
- **NEW:** Actual token tracking after each task (Step 3.3.7)

### Phase 4: Verification and Release
- **Role:** QA Lead
- **Input:** Implementation
- **Output:** Evidence Package with **Token Metrics**, GO/NO-GO decision
- **Duration:** 1-2 hours
- **Token Estimate:** 8K-20K per session
- **NEW:** Token efficiency section in evidence package

### Phase 5: Master Control and Release
- **Role:** Release Manager
- **Input:** Evidence Package
- **Output:** Release or Recovery Plan, **Token Retrospective**
- **Duration:** 1-2 hours
- **Token Estimate:** 5K-12K per session
- **NEW:** Token lessons learned in retrospective
- **NEW:** Framework cleanup verification (`cleanup.sh`)

---

## 💬 Talking to CodeMaestro

Use natural language to interact with CodeMaestro. Simply describe what you want:

### Navigation & Status

| What you want | Say this |
|---------------|----------|
| Check progress | "What's my current status?" |
| Start next task | "What should I work on next?" |
| Load specific task | "Load task T-2.1.1" |
| See task tree | "Show me the task dependencies" |
| Change phase | "Move to Phase 3" |

### Token & Budget Management

| What you want | Say this |
|---------------|----------|
| Check budget | "How much context do I have left?" |
| Estimate task | "How many tokens will T-2.1.1 use?" |
| Check variance | "How accurate were our estimates?" |
| Token summary | "Quick token status" |

### Session Management

| What you want | Say this |
|---------------|----------|
| Generate handoff | "Generate a handoff for this session" |
| Save progress | "Save my progress" |
| Resume work | "Where were we?" |
| End session | "I'm done for now" |

### Knowledge Base

| What you want | Say this |
|---------------|----------|
| Search patterns | "Search knowledge base for authentication" |
| Save a pattern | "Save this pattern to knowledge base" |
| Document failure | "Document this failure" |

### Code & Git

| What you want | Say this |
|---------------|----------|
| Generate commit | "Generate a commit for my changes" |
| Verify code | "Verify my changes" |
| Review code | "Review this code for issues" |
| Create checkpoint | "Checkpoint my work" |

### Planning & Architecture

| What you want | Say this |
|---------------|----------|
| Plan feature | "Plan the implementation of user login" |
| Architecture help | "Help me decide between REST and GraphQL" |
| Generate tests | "Generate test stubs for AC-1.2" |

> **More interactions:** See [.CodeMaestro/docs/INTERACTIONS-CORE.md](.CodeMaestro/docs/INTERACTIONS-CORE.md) for complete reference.

---

## 🔧 Configuration

### Skill Tier

Set your skill level in Phase 1:
- **Beginner:** Full explanations, step-by-step guidance
- **Advanced:** Concise, assumes familiarity
- **Ninja:** Minimal guidance, maximum efficiency

### Team Mode

Enable in `.CodeMaestro/config/team.md`:
```markdown
## Mode
enabled: true

## Members
| Name | Role | GitHub | Responsibilities |
|------|------|--------|------------------|
| Alice | Lead | @alice | M1, M2 |
| Bob | Dev | @bob | M3 |
```

### Quality Thresholds

Override in `.CodeMaestro/config/thresholds.md`:
```markdown
## Blocking Thresholds
- Test Coverage: 70% (default)
- Security: 0 critical/high (default)
- AC Pass Rate: 100% (default)
```

### Token Budget

Configure in `.CodeMaestro/config/token-estimation.md`:
- Session budget: 800K usable (default for Sonnet 4.5)
- Alert thresholds: 80% (warning), 90% (critical)
- Complexity multipliers: Simple (1.0x) to Very Complex (5.0x)

---

## 🧹 Removing Framework Files (Before Delivery)

Before delivering your project, remove CodeMaestro framework files:

### Option 1: Verification Only
```bash
./cleanup.sh --verify
# Shows what would be removed (no changes)
```

### Option 2: Apply Cleanup
```bash
./cleanup.sh --apply
# Removes .CodeMaestro/ and CLAUDE.md
# Preserves docs/, src/, tests/, and all project files
```

### Option 3: Validate Build Artifacts
```bash
./cleanup.sh --validate-build
# Checks Docker images, dist/ directories for framework files
```

**What Gets Removed:**
- `.CodeMaestro/` (entire framework directory)
- `CLAUDE.md` (framework developer guide)
- `cleanup.sh` (itself)

**What Gets Kept:**
- `docs/` (ALL user documentation)
- `src/`, `tests/` (ALL code and tests)
- Token tracking data (embedded in task files)
- Recovery checkpoints
- Knowledge base (your project learnings)

See [.CodeMaestro/config/cleanup-verification.md](.CodeMaestro/config/cleanup-verification.md) for details.

---

## 🐛 Troubleshooting

### "Cannot find prompt files"
- Ensure `.CodeMaestro/prompts/` exists in your project
- Check filenames match exactly (case-sensitive)
- Re-run `setup.sh` if needed

### "Phase detection failed"
- Check `docs/implementation/.recovery-checkpoint.md`
- Run `/recover` to rebuild state
- Check handoff message from previous phase

### "Token budget exceeded"
- Run `/budget` to check current usage
- Create checkpoint and start new session
- Review token estimates in task files

### "Session Context Lost"
1. Check handoff message from previous checkpoint
2. Read `.recovery-checkpoint.md`
3. Run `/recover`
4. Load phase prompt manually if needed

### "Cleanup script missing"
- Re-run `setup.sh` to regenerate `cleanup.sh`
- Script template: `.CodeMaestro/config/templates/cleanup-script-template.sh`

---

## 📞 Support & Documentation

### Primary Documentation
- **`CLAUDE.md`** - Framework developer guide (for Claude Code)
- **`.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md`** - ⭐ START HERE for config index
- **`.CodeMaestro/docs/COMMANDS-CORE.md`** - Essential commands (Phases 1-5)
- **`.CodeMaestro/docs/COMMANDS-ADVANCED.md`** - Phase F commands (Phases 4-5)

### Feature Guides
- **Token Estimation:** `.CodeMaestro/config/token-estimation.md`
- **Session Handoffs:** `.CodeMaestro/config/handoff-messages.md`
- **Framework Cleanup:** `.CodeMaestro/config/cleanup-verification.md`
- **Git Workflows:** `.CodeMaestro/config/git-commands.md`
- **Constraints Reference:** `.CodeMaestro/config/constraints-reference.md`

### Agent Architecture (v1.1)
- **Agents:** `.CodeMaestro/agents/` (9 specialized agents)
  - `product-manager.md`, `architect.md`, `planner.md`, `developer.md`
  - `code-reviewer.md`, `qa-lead.md`, `security-engineer.md`
  - `data-interpreter.md`, `release-manager.md`
- **Orchestration:** `.CodeMaestro/orchestrator/`
  - `phase-controller.md` - Agent invocation and state management
  - `handoff-protocol.md` - Minimal context passing between agents

---

## 📄 License

CodeMaestro v1.1.0
All rights reserved.

---

## 🔄 Project Lifecycle

### Starting a New Project

```
1. Run setup.sh in your project directory
2. Copy CLAUDE.md to project root
3. Initialize git (git init, git checkout -b dev)
4. Open Claude Code and say:
   "Let's start Phase 1. I want to build [describe project]."
```

**Your project version:** Starts at `v0.1.0`

### Starting a New Phase

```
1. Complete current phase (all tasks done)
2. Generate handoff: "Generate handoff for this session"
3. Review recovery checkpoint
4. Say: "Move to Phase [N]"
5. AI loads new phase prompt and activates new role
```

### Starting a New Task

```
1. Say: "What should I work on next?" or "Load task T-X.X.X"
2. AI checks token budget
3. AI loads relevant context (iterative retrieval)
4. Proceed with implementation
5. On completion: "Generate commit for my changes"
```

### Handover to New Session

**Before ending:**
```
1. Say: "I'm done for now" or "Generate session end summary"
2. AI generates structured summary with:
   - Completed/in-progress items
   - Token usage
   - Files modified
   - Suggested next action
   - Resume prompt to copy
3. Recovery checkpoint is auto-updated
```

**Starting new session:**
```
1. Open Claude Code
2. Say: "Where were we?" or paste resume prompt
3. AI loads checkpoint and resumes
```

---

## 🚀 Ready to Start?

### Quick Start Checklist

- [ ] Run `setup.sh` in your project
- [ ] Copy `CLAUDE.md` to project root
- [ ] Initialize git (`git init`, `git checkout -b dev`)
- [ ] Open Claude Code in project directory
- [ ] Say: "Let's start Phase 1. I want to build [project]."
- [ ] Follow 5-phase workflow
- [ ] Say "How much context left?" to track tokens
- [ ] Say "Generate handoff" at checkpoints
- [ ] Say "I'm done for now" for session end summary

### Key Features (v1.1)

1. **Agent Architecture** - 9 specialized agents with orchestrator (Phase-optimized)
2. **Natural Language** - Just describe what you want (native Claude Code)
3. **Clarifying Questions** - AI asks before assuming (Phase 1 & 2)
4. **Session End Summary** - Progress, tokens, next actions
5. **Verification Loop** - "Verify my changes" before PR (6-phase gates)
6. **Continuous Learning** - Patterns captured automatically (instinct model)

---

## 🎉 Happy Building with CodeMaestro v1.1.0!

**CodeMaestro Phoenix** - Orchestrating Development, One Phase at a Time

**New in v1.1.0:**
- 🤖 Agent-based architecture (9 specialized agents with orchestrator)
- 💬 Natural language interface (native Claude Code support)
- ❓ Clarifying questions (Phase 1 & 2)
- 📊 Session end summaries
- ✅ Automated verification loops (6-phase quality gates)
- 🧠 Continuous learning (instinct-based pattern capture)

**v1.0.0 Features:**
- 🗂️ Reorganized structure (`.CodeMaestro/` directory)
- 🧹 Framework cleanup system (`cleanup.sh`)
- 💰 Token estimation & budget management
- 🔄 Session handoff messages

---

**Framework Version:** 1.1.0
**Project Versioning:** Your projects start at v0.1.0
**Codename:** Phoenix
**Last Updated:** 2026-01-27
