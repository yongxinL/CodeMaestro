# CodeMaestro v1.0.0

## 🚀 Welcome to CodeMaestro

CodeMaestro is a role-based automated development system that orchestrates software development through a 5-phase lifecycle with intelligent session management, progressive disclosure, token estimation, and organizational learning.

**Codename:** Phoenix
**Version:** 1.0.0
**Release Date:** 2026-01-16

---

## 📦 What's Included

This repository contains the complete CodeMaestro framework:
- ✅ **`CLAUDE.md`** - Developer guide for Claude Code
- ✅ **`.CodeMaestro/`** - Complete framework (easy to exclude from deliverables)
  - `prompts/` - Modular phase prompts and templates
  - `config/` - Configuration files, roles, git templates
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
- User projects get their own `.CodeMaestro/` directory via `init-docs.sh`

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

## 🔧 Installation

### Step 1: Initialize Your Project

```bash
# Clone or copy CodeMaestro to your project
cd /path/to/your-project

# Run initialization script (creates .CodeMaestro/ and docs/ in your project)
chmod +x /path/to/CodeMaestro/.CodeMaestro/init-docs.sh
/path/to/CodeMaestro/.CodeMaestro/init-docs.sh

# Copy CLAUDE.md to your project root
cp /path/to/CodeMaestro/CLAUDE.md ./CLAUDE.md
```

**What `init-docs.sh` does:**
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
git commit -m "Initial project setup with CodeMaestro v1.0.0

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
│   ├── config/                  ✅ Configuration files
│   │   ├── token-estimation.md  ✅ NEW: Token estimation guide
│   │   ├── handoff-messages.md  ✅ NEW: Session handoff templates
│   │   ├── cleanup-verification.md ✅ NEW: Cleanup guide
│   │   ├── git-commands.md      ✅ Git templates
│   │   ├── constraints-reference.md ✅ Full constraint list
│   │   └── roles/               ✅ Role definitions
│   └── docs/                    ✅ Command references
│       ├── COMMANDS-CORE.md     ✅ Essential commands (Phases 1-5)
│       └── COMMANDS-ADVANCED.md ✅ Phase F commands (Phases 4-5)
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

## 💻 Commands Reference

### Core Commands (Always Available)

```bash
# Navigation
/status              # Show current state
/next                # Load next task
/task T-X.X.X        # Load specific task
/phase N             # Jump to phase
/tree                # Show task DAG

# Token Management (NEW v1.0+)
/estimate task T-X   # Estimate task tokens
/estimate milestone  # Estimate milestone tokens
/budget              # Check session budget status
/budget --forecast   # Forecast remaining tasks
/variance            # Analyze token variance
/tokens              # Quick token status

# Session Handoff (NEW v1.0+)
/handoff             # Generate handoff message
/handoff --next      # Include next phase prep
/handoff --tokens    # Include token analysis
/handoff --recovery  # Include recovery instructions

# Recovery
/recover             # Execute recovery protocol
/snapshot            # Save checkpoint
/history             # Show decision log

# Knowledge Base
/kb search [query]   # Search patterns/failures
/kb add failure      # Document failure
/kb add pattern      # Document success

# Git
/commit              # Show commit template
/commit --auto       # Auto-generate commit
/checkpoint          # Pause for review
```

### Advanced Commands (Phases 4-5)

```bash
# Portfolio
/portfolio generate  # Create portfolio materials
/portfolio preview   # Preview content

# Analytics (Phase 4-5)
/estimate [scope]    # Effort estimation
/benchmark [metric]  # Performance benchmarking
/compliance          # Regulatory compliance check
```

See [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md) for complete reference.

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
- Re-run `init-docs.sh` if needed

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
- Re-run `init-docs.sh` to regenerate `cleanup.sh`
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

### Role Definitions
- `.CodeMaestro/config/roles/product-manager.md`
- `.CodeMaestro/config/roles/software-architect.md`
- `.CodeMaestro/config/roles/senior-developer.md`
- `.CodeMaestro/config/roles/qa-lead.md`
- `.CodeMaestro/config/roles/release-manager.md`

---

## 📄 License

CodeMaestro v1.0.0
All rights reserved.

---

## 🚀 Ready to Start?

### Quick Start Checklist

- [ ] Run `init-docs.sh` in your project
- [ ] Copy `CLAUDE.md` to project root
- [ ] Initialize git (`git init`, `git checkout -b dev`)
- [ ] Open Claude Code in project directory
- [ ] Say: "Let's start Phase 1. I want to build [project]."
- [ ] Follow 5-phase workflow
- [ ] Use `/budget` to track tokens (Feature 3)
- [ ] Review handoff at checkpoints (Feature 4)
- [ ] Run `cleanup.sh --verify` before delivery (Feature 2)

### Key Features to Use

1. **Token Estimation (Phase 2):** Get estimates for all tasks
2. **Budget Checks (Phase 3):** Run `/budget` before each task
3. **Token Tracking (Phase 3):** Record actuals after each task
4. **Session Handoffs (All Phases):** Review at checkpoints
5. **Token Retrospective (Phase 5):** Learn from variance
6. **Framework Cleanup (Phase 5):** Remove before delivery

---

## 🎉 Happy Building with CodeMaestro v1.0.0!

**CodeMaestro Phoenix** - Orchestrating Development, One Phase at a Time

**New in v1.0.0:**
- 🗂️ Reorganized structure (`.CodeMaestro/` directory)
- 🧹 Framework cleanup system (`cleanup.sh`)
- 💰 Token estimation & budget management
- 🔄 Session handoff messages

For detailed changelog, see git history:
```bash
git log --oneline --graph dev
```

---

**Version:** 1.0.0
**Codename:** Phoenix
**Release Date:** 2026-01-16
**Last Updated:** 2026-01-16
