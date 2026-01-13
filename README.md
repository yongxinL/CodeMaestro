# CodeMaestro

## 🚀 Welcome to CodeMaestro

CodeMaestro is a role-based automated development system that orchestrates software development through a 5-phase lifecycle with intelligent session management, progressive disclosure, and organizational learning.

---

## 📦 What's Included

This package contains:
- ✅ `CLAUDE.md` - Main system configuration file
- ✅ `init-docs.sh` - Initialization script
- ✅ Complete documentation structure templates
- ✅ `docs/config/roles/` - Role files 
- ✅ `docs/prompts/` - Prompt and template files
- ✅ `docs/standalone-prompts/` - Standalone Prompts (Optional)
---

## 🔧 Installation

### Step 1: Extract Package

```bash
# Extract the CodeMaestro.zip to your project
unzip CodeMaestro.zip
cd CodeMaestro

# Copy CLAUDE.md to your project root (if not already there)
cp CLAUDE.md ../my-project/CLAUDE.md
cp init-docs.sh ../my-project/init-docs.sh
cp -r docs ../my-project/
```

### Step 2: Choose Your Usage Mode

CodeMaestro supports two usage modes:

**A. Claude Code (CLI) - Recommended** ✅
- Uses modular prompt files for token efficiency
- Progressive disclosure (50-55% token reduction)
- Automatic file loading on-demand
- Files: `docs/prompts/` (modular phase prompts + templates)

**B. Claude Desktop / claude.ai** 📋
- Uses standalone prompts (copy-paste workflow)
- Complete phase prompts in single files
- Files: `docs/standalone-prompts/` (phase1-standalone-prompt.md, etc.)

---

### Step 2A: Prompt Files for Claude Code

#### Prompt Files in `docs/prompts/` (for Claude Code):
1. `00-core.md` - Core system configuration (roles, thresholds, constraints)
2. `01-requirement.md` - Phase 1 workflow
3. `01-requirement-templates.md` - Phase 1 templates
4. `02-planning.md` - Phase 2 workflow
5. `02-planning-templates.md` - Phase 2 templates
6. `03-implementation.md` - Phase 3 workflow
7. `03-implementation-templates.md` - Phase 3 templates
8. `04-verification.md` - Phase 4 workflow
9. `04-verification-templates.md` - Phase 4 templates
10. `05-master-control.md` - Phase 5 workflow
11. `05-master-control-templates.md` - Phase 5 templates

#### Required Configuration Files in `docs/config/`:
- `git-commands.md` - Git command templates
- `constraints-reference.md` - Full constraint list

#### Required Role Files in `docs/config/roles/`:
- `product-manager.md` - Full Product Manager role definition
- `software-architect.md` - Full Software Architect role definition
- `senior-developer.md` - Full Senior Developer role definition
- `qa-lead.md` - Full QA Lead role definition
- `release-manager.md` - Full Release Manager role definition
- `data-interpreter.md` - Data Interpreter role
- `ethics-security-engineer.md` - Ethics & Security Engineer role

---

### Step 2B: Standalone Prompts (for Claude Desktop / claude.ai only)

**Note:** Claude Code users should **skip this section** - use modular prompts above instead.

#### Standalone Prompts in `docs/standalone-prompts/` (for Claude Desktop):
- `phase1-standalone-prompt.md` - Copy-paste for Phase 1
- `phase2-standalone-prompt.md` - Copy-paste for Phase 2
- `phase3-standalone-prompt.md` - Copy-paste for Phase 3
- `phase4-standalone-prompt.md` - Copy-paste for Phase 4
- `phase5-standalone-prompt.md` - Copy-paste for Phase 5

**How to use:** Copy the entire content of the phase file and paste into Claude Desktop/claude.ai at the start of each phase.

---

### Step 3: Initialize Project

```bash
cd ../my-project
# Make the init script executable
chmod +x init-docs.sh

# Run initialization
./init-docs.sh

# This creates the full directory structure with templates
```

### Step 4: Initialize Git

```bash
# Initialize git repository
git init

# Create develop branch
git checkout -b dev

# Initial commit
git add .
git commit -m "Initial project setup

- Initialized CodeMaestro
- Role-based workflow enabled
- Created docs structure

Status: Ready for Phase 1"
```

### Step 5: Verify Installation

Check that you have:
```
my-project/
├── CLAUDE.md                    ✅ Main config
├── docs/
│   ├── prompts/
│   │   ├── 00-core.md
│   │   ├── 01-requirement.md
│   │   ├── 01-requirement-templates.md
│   │   ├── 02-planning.md
│   │   ├── 02-planning-templates.md
│   │   ├── 03-implementation.md
│   │   ├── 03-implementation-templates.md
│   │   ├── 04-verification.md
│   │   ├── 04-verification-templates.md
│   │   ├── 05-master-control.md
│   │   └── 05-master-control-templates.md
│   ├── config/
│   │   ├── git-commands.md
│   │   ├── constraints-reference.md
│   │   └── roles/
│   ├── knowledge-base/          ✅ Created by init-docs.sh
│   ├── portfolio/               ✅ Created by init-docs.sh
│   └── [other directories]      ✅ Created by init-docs.sh
```

---

## 🎯 Quick Start

### Option A: Claude Code (CLI) - Recommended ✅

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
- Load `docs/prompts/00-core.md` (system config)
- Load phase prompts progressively
- Load templates on-demand
- Use 50-55% fewer tokens vs. standalone approach

---

### Option B: Claude Desktop / claude.ai 📋

**Best for:** Users without CLI access

If using Claude Desktop or claude.ai instead of Claude Code:

1. Navigate to `docs/standalone-prompts/`
2. Copy the contents of `phase1-standalone-prompt.md`
3. Paste into Claude Desktop/claude.ai
4. Follow the guided workflow
5. At Phase 2, copy `phase2-standalone-prompt.md` and repeat

**Note:** Standalone prompts are self-contained but use more tokens (no progressive disclosure).

---

## 📚 What's New in v1.0

### Token Optimization (50-55% reduction)
- Progressive disclosure: Templates load on-demand
- Conditional skill tier loading
- Role definition compression
- Git command templates

### Knowledge Base System
- Project learns from failures and successes
- Searchable pattern library
- Self-evolving intelligence

### Data Interpreter Role
- Automatic performance visualization
- KPI dashboard generation
- Trend analysis

### Ethical Validation (EXPANDED)
- All projects get bias & ethical checks
- GDPR compliance checking
- Accessibility (WCAG) validation

### Domain-Specific Architecture
- Auto-detection: Mobile / Web / Cloud / AI
- Tailored patterns per domain
- Platform-specific tasks

### State Management Optimization
- Explicit state/data flow focus
- Frontend-backend sync strategies
- Debugging-friendly architecture

### Harmonic Resonance
- Module-level architectural vision
- Consistent design thinking across tasks
- Reduced context-switching cost

### Gantt Visualization
- Visual timeline alongside dependency DAG
- Bottleneck identification

### Portfolio Generation
- On-demand professional documentation
- Markdown format for flexibility

### Enhanced Session Management
- Clear handoff files between phases
- Model recommendations
- Lazy loading for artifacts

---

## 📖 Documentation

### Phase-by-Phase Guide

**Phase 1: Requirement Deconstruction**
- Role: Product Manager
- Input: Your project idea
- Output: Locked Specification
- Duration: 1-2 hours

**Phase 2: Planning and Orchestration**
- Role: Software Architect  
- Input: Locked Specification
- Output: Engineering Blueprint, Task DAG, Gantt Chart
- Duration: 2-4 hours

**Phase 3: Implementation**
- Role: Senior Developer
- Input: Blueprint and Tasks
- Output: Production code
- Duration: Varies by project size

**Phase 4: Verification and Release**
- Role: QA Lead
- Input: Implementation
- Output: Evidence Package, GO/NO-GO decision
- Duration: 1-2 hours

**Phase 5: Master Control and Release**
- Role: Release Manager
- Input: Evidence Package
- Output: Release or Recovery Plan
- Duration: 1-2 hours

### Commands Reference

```bash
# Navigation
/status              # Show current state
/next                # Load next task
/phase N             # Jump to phase

# Knowledge Base
/kb search [query]   # Search patterns/failures
/kb add failure      # Document failure
/kb add pattern      # Document success

# Portfolio
/portfolio generate  # Create portfolio materials
/portfolio preview   # Preview content

# Recovery
/recover             # Execute recovery protocol
/snapshot            # Save checkpoint
```

---

## 🔧 Configuration

### Skill Tier

Set your skill level in Phase 1:
- **Beginner**: Full explanations, step-by-step guidance
- **Advanced**: Concise, assumes familiarity
- **Ninja**: Minimal guidance, maximum efficiency

### Team Mode

Enable in `docs/config/team.md`:
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

Override in `docs/config/thresholds.md` if needed.

---

## 🐛 Troubleshooting

### "Cannot find prompt files"
- Ensure all prompt files are in `docs/prompts/`
- Check filenames match exactly (case-sensitive)

### "Phase detection failed"
- Check `docs/implementation/.recovery-checkpoint.md`
- Run `/recover` to rebuild state

### "Git commands not working"
- Ensure git is initialized: `git init`
- Ensure `docs/config/git-commands.md` exists

### Session Context Lost
1. Check `.recovery-checkpoint.md`
2. Run `/recover`
3. If fails, manually load phase prompt and provide context

---

## 📞 Support

For issues, questions, or contributions:
- Check `CLAUDE.md` for system reference
- Review phase-specific prompts in `docs/prompts/`
- Consult Knowledge Base: `docs/knowledge-base/`

---

## 📄 License

CodeMaestro
All rights reserved.

---

## ✨ Getting Help

**Need the complete prompt files?**
Contact the source you received this package from to obtain the full prompt file set.

**Want to customize?**
All templates in `docs/` directories can be customized for your workflow.

**Ready to Start?**
1. Ensure all files are in place (see Step 2 above)
2. Run `./init-docs.sh`
3. Initialize git
4. Start Claude Code or use standalone prompts

---

## 🎉 Happy Building with CodeMaestro!

CodeMaestro - Orchestrating Development, One Phase at a Time
