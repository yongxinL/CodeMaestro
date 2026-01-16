#!/bin/bash

# CodeMaestro - Initialization Script v1.0.0
# Run this script from your project root to set up CodeMaestro

set -e

echo "🚀 Initializing CodeMaestro v1.0.0..."
echo ""

# Detect script location to find the source .CodeMaestro directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEMAESTRO_SOURCE="$(dirname "$SCRIPT_DIR")"

# Validate source exists
if [[ ! -d "$CODEMAESTRO_SOURCE/.CodeMaestro" ]]; then
    echo "❌ Error: Cannot find CodeMaestro installation at $CODEMAESTRO_SOURCE"
    echo "   This script should be run from the CodeMaestro installation directory."
    exit 1
fi

# Check if already initialized
if [[ -d ".CodeMaestro" ]]; then
    echo "⚠️  Warning: .CodeMaestro directory already exists in current directory."
    read -p "Overwrite? (yes/no): " confirm
    if [[ "$confirm" != "yes" ]]; then
        echo "Aborted."
        exit 1
    fi
    echo "Removing existing .CodeMaestro directory..."
    rm -rf .CodeMaestro
fi

# Step 1: Copy entire .CodeMaestro directory
echo "📦 Copying CodeMaestro framework..."
cp -r "$CODEMAESTRO_SOURCE/.CodeMaestro" .
echo "   ✓ Framework files copied"

# Step 2: Copy CLAUDE.md for reference during development
echo "📄 Copying CLAUDE.md for reference..."
cp "$CODEMAESTRO_SOURCE/CLAUDE.md" .
echo "   ✓ CLAUDE.md copied"

# Step 3: Create docs/ structure for USER files only
echo "📁 Creating user documentation structure..."
mkdir -p docs/specifications
mkdir -p docs/architecture/tasks
mkdir -p docs/architecture/api-contracts
mkdir -p docs/implementation/context-packages
mkdir -p docs/implementation/handoffs
mkdir -p docs/verification/evidence-packages
mkdir -p docs/verification/performance-baselines
mkdir -p docs/release/runbooks
mkdir -p docs/knowledge-base/failures
mkdir -p docs/knowledge-base/patterns
mkdir -p docs/knowledge-base/decisions
mkdir -p docs/portfolio
mkdir -p docs/team
echo "   ✓ User documentation directories created"

# Step 4: Create user-specific override files in .CodeMaestro/config/
echo "⚙️  Creating project-specific configuration files..."

# Custom roles override (empty template)
cat > .CodeMaestro/config/roles/custom-roles.md << 'EOF'
# Custom Roles

> Define custom roles here to override or extend the default role system.
> See `./.CodeMaestro/prompts/00-core.md` for the custom role template.

## Custom Roles

<!-- Add your custom role definitions below -->

EOF

# Quality thresholds override (commented template)
cat > .CodeMaestro/config/thresholds.md << 'EOF'
# Quality Thresholds

> Override default thresholds here if needed.
> Default values are defined in `./.CodeMaestro/prompts/00-core.md`.

## Project-Specific Overrides

<!-- Uncomment and modify to override defaults

## Blocking Thresholds
| Metric | Minimum |
|--------|---------|
| Test Coverage | 70% |
| Critical Security Issues | 0 |
| High Security Issues | 0 |
| AC Pass Rate | 100% |

## Target Thresholds
| Metric | Target |
|--------|--------|
| Test Coverage | 85% |
| Cyclomatic Complexity | <10 |
| Code Duplication | <5% |

-->
EOF

# Team configuration (disabled by default)
cat > .CodeMaestro/config/team.md << 'EOF'
# Team Configuration

## Mode
enabled: false

## Team Members
<!-- Uncomment and fill in when enabling team mode

| Name | GitHub | Role | Modules |
|------|--------|------|---------|
| [Name] | @handle | Lead | M1, M2 |
| [Name] | @handle | Developer | M3 |

-->

## Branch Protection
<!-- Uncomment when enabling team mode

- Require PR for: develop, main
- Required approvals: 1
- Required checks: lint, test

-->

## Code Review Policy
<!-- Uncomment when enabling team mode

- Self-review: Allowed for Ninja tier
- Cross-review: Required for Beginner tier

-->
EOF

echo "   ✓ Configuration override files created"

# Step 5: Create essential user documentation files
echo "📝 Creating essential documentation files..."

# Portfolio README
cat > docs/portfolio/README.md << 'EOF'
# Project Portfolio

## Overview

This directory contains portfolio-ready documentation for showcasing this project's architecture, implementation highlights, and performance results.

## Contents

- **project-summary.md** - Executive summary with problem/solution/impact
- **architecture-showcase.md** - Key architectural decisions and patterns
- **implementation-highlights.md** - Notable code solutions and technical achievements
- **performance-report.md** - Performance metrics and optimization results

## Usage

These documents are generated during Phase 5 and can be used for:
- Technical blog posts
- Conference talks
- Portfolio websites
- Case studies
- Client presentations

## Maintenance

Update these documents as the project evolves. Keep them concise and focused on highlights rather than comprehensive details.
EOF

# Task index
cat > docs/architecture/tasks/_index.md << 'EOF'
# Task Index

## Overview

This directory contains all task files generated during Phase 2 (Planning).

## Task Structure

Each task file follows the template defined in `./_task-template.md` and includes:
- Acceptance criteria
- Dependencies
- Effort estimation
- Implementation guidance
- Test requirements

## Task Naming Convention

Tasks are named: `T-[Module].[Sequence]-[Title].md`

Example: `T-2.1-implement-authentication.md`

## Usage

1. Tasks are created during Phase 2 by the Software Architect
2. Tasks are implemented during Phase 3 by the Senior Developer
3. Tasks are verified during Phase 4 by the QA Lead

See `./.CodeMaestro/prompts/02-planning.md` for task creation workflow.
EOF

# Decision log
cat > docs/implementation/decision-log.md << 'EOF'
# Decision Log

## Overview

This log captures all significant technical decisions made during implementation (Phase 3).

## Format

Each entry should include:
- **Date**: When the decision was made
- **Context**: What problem/situation prompted the decision
- **Decision**: What was decided
- **Rationale**: Why this decision was made
- **Consequences**: Expected impact (positive and negative)
- **Alternatives**: What other options were considered

## Decisions

<!-- Add decisions below in reverse chronological order (newest first) -->

### [Date] - [Decision Title]

**Context:**
[Describe the situation]

**Decision:**
[What was decided]

**Rationale:**
[Why this approach]

**Consequences:**
- ✅ [Positive impact]
- ⚠️ [Trade-off or negative impact]

**Alternatives Considered:**
- [Alternative 1] - [Why not chosen]
- [Alternative 2] - [Why not chosen]

---
EOF

# Recovery checkpoint
cat > docs/implementation/.recovery-checkpoint.md << 'EOF'
# Recovery Checkpoint

> This file is updated automatically at phase transitions. Use `/recover` command to load.

## Session Information
- **Last Updated**: [Auto-populated]
- **Current Phase**: [Auto-populated]
- **Current Task**: [Auto-populated]
- **Session Token Usage**: [Auto-populated]

## Phase Progress
- Phase 1 (Requirements): [Not Started | In Progress | Complete]
- Phase 2 (Planning): [Not Started | In Progress | Complete]
- Phase 3 (Implementation): [Not Started | In Progress | Complete]
- Phase 4 (Verification): [Not Started | In Progress | Complete]
- Phase 5 (Release): [Not Started | In Progress | Complete]

## Active Context
[Auto-populated with current module/feature context]

## Completed Milestones
[Auto-populated list of completed milestones]

## Next Actions
[Auto-populated with next steps]

## Open Blockers
[Auto-populated with any blocking issues]

---
*This file is managed by CodeMaestro. Manual edits may be overwritten.*
EOF

# Test plan
cat > docs/verification/test-plan.md << 'EOF'
# Test Plan

## Overview

This test plan is generated during Phase 4 (Verification) and covers all testing requirements.

## Test Strategy

### Unit Tests
- **Coverage Target**: 85% (minimum 70%)
- **Frameworks**: [Auto-populated]
- **Mocking Strategy**: [To be defined]

### Integration Tests
- **Critical Paths**: [To be defined]
- **Test Environment**: [To be defined]

### E2E Tests
- **User Flows**: [To be defined]
- **Test Data**: [To be defined]

## Test Execution

### Automated Tests
[Test suite execution commands and CI/CD integration]

### Manual Tests
[Manual test cases and acceptance scenarios]

## Test Results

### Latest Run
- **Date**: [Auto-populated]
- **Pass Rate**: [Auto-populated]
- **Coverage**: [Auto-populated]

---
*See `./.CodeMaestro/prompts/04-verification.md` for test plan generation workflow.*
EOF

# CHANGELOG
cat > docs/CHANGELOG.md << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup

### Changed

### Fixed

### Removed

---

## Release Template

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features and capabilities

### Changed
- Changes to existing functionality

### Fixed
- Bug fixes

### Removed
- Removed features or functionality

### Security
- Security fixes and improvements
```
EOF

echo "   ✓ Essential documentation files created"

# Step 6: Generate .gitignore
echo "🔒 Creating .gitignore..."
cat > .gitignore << 'EOF'
# CodeMaestro Framework (exclude from deliverables)
.CodeMaestro/
CLAUDE.md

# Uncomment the line above to keep CLAUDE.md in the repository during development
# and only remove it via cleanup.sh before final release

# Common project files
node_modules/
.env
.DS_Store
*.log

# Build artifacts
dist/
build/
target/
*.egg-info/
__pycache__/

# IDE files
.vscode/
.idea/
*.swp
*.swo
EOF

echo "   ✓ .gitignore created"

# Step 7: Generate cleanup.sh script
echo "🧹 Creating cleanup script..."
cp .CodeMaestro/config/templates/cleanup-script-template.sh cleanup.sh
chmod +x cleanup.sh
echo "   ✓ cleanup.sh created and made executable"

# Step 8: Initialize git repository (if not already initialized)
if [[ ! -d ".git" ]]; then
    echo "📦 Initializing git repository..."
    git init
    git checkout -b develop
    echo "   ✓ Git repository initialized on 'develop' branch"
else
    echo "📦 Git repository already initialized"
fi

# Success message
echo ""
echo "✅ CodeMaestro initialization complete!"
echo ""
echo "📋 What was created:"
echo "   • .CodeMaestro/         - Framework files (prompts, config, knowledge base)"
echo "   • CLAUDE.md             - Framework developer guide (for Claude Code)"
echo "   • docs/                 - Your project documentation structure"
echo "   • cleanup.sh            - Script to remove framework files before release"
echo "   • .gitignore            - Git ignore patterns"
echo ""
echo "🚀 Next steps:"
echo "   1. Review '.CodeMaestro/docs/COMMANDS-CORE.md' for available commands"
echo "   2. Run '/init-phase 1' in Claude Code to start Phase 1 (Requirements)"
echo "   3. Customize .CodeMaestro/config/thresholds.md if needed"
echo "   4. Before final release, run './cleanup.sh --verify' to check framework files"
echo ""
echo "📖 Documentation:"
echo "   • CLAUDE.md                              - Framework overview and instructions"
echo "   • .CodeMaestro/docs/COMMANDS-CORE.md     - Core commands reference"
echo "   • .CodeMaestro/prompts/00-core.md        - System configuration"
echo ""
echo "Happy coding! 🎉"
