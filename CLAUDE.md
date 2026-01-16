# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**CodeMaestro v1.0** (Codename: Phoenix) is a role-based automated development system that orchestrates software development through a 5-phase lifecycle. This is a **framework/tool**, not a traditional codebase—it's designed to guide developers (and AI) through structured software development processes.

**Key Characteristics:**
- Documentation-driven architecture
- Progressive disclosure for token efficiency (50-55% reduction)
- Role-based state machine orchestrating 5 development phases
- Skill tier adaptation (Beginner/Advanced/Ninja)
- Knowledge base for project-specific learning
- Session management with recovery checkpoints

---

## Repository Structure & Architecture

### Core Directory Layout

**Key locations** (full structure available via filesystem navigation):

| Directory/File | Purpose |
|----------------|---------|
| `.CodeMaestro/` | **All framework files** (easy to exclude) |
| `.CodeMaestro/prompts/` | Core system prompts (00-core, phase prompts, templates) |
| `.CodeMaestro/config/` | Configuration files (git-commands, constraints, roles, etc.) |
| `.CodeMaestro/init-docs.sh` | Project initialization script |
| `CLAUDE.md` | This file (developer guide for Claude Code) |
| `README.md` | User-facing installation guide |
| `.CodeMaestro/docs/COMMANDS-CORE.md` | Essential commands (Phases 1-5) |
| `.CodeMaestro/docs/COMMANDS-ADVANCED.md` | Phase F commands (load in Phase 4-5 only) |

**Note:** All CodeMaestro framework files are in `.CodeMaestro/` directory for easy exclusion from project deliverables. User projects will have their own `.CodeMaestro/` directory (created by init-docs.sh) and `docs/` for project-specific documentation.

### Key Files to Understand

| File | Purpose | Load When |
|------|---------|-----------|
| **[.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md](.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md)** | **START HERE** - Quick index of all configs with loading guidance | Always reference first |
| **[.CodeMaestro/prompts/00-core.md](.CodeMaestro/prompts/00-core.md)** | System configuration: roles, constraints (A1-E33), thresholds, skill tiers | Every session |
| **[.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md)** | Essential commands (daily workflow, Phases 1-5) | Phases 1-5 |
| **[.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md)** | Phase F commands (estimation, benchmarking, ethics/compliance) | Phases 4-5 only |
| **[.CodeMaestro/config/git-commands.md](.CodeMaestro/config/git-commands.md)** | Git workflow templates (reference by section ID) | All phases |
| **[.CodeMaestro/config/constraints-reference.md](.CodeMaestro/config/constraints-reference.md)** | Complete constraint list (reference by ID: A1-E33) | Reference only |
| **[.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md)** | MCP tool integrations (Context7, WebSearch, WebFetch) | Phase 1-4 (research) |
| **[.CodeMaestro/init-docs.sh](.CodeMaestro/init-docs.sh)** | Creates directory structure for user projects | Project setup |
| **[README.md](.CodeMaestro/docs/README.md)** | User-facing installation guide (not for Claude Code) | User reference only |

---

## Architecture Concepts

### 5-Phase Lifecycle

```
Phase 1: Requirements          Phase 2: Planning           Phase 3: Implementation
Product Manager role    →      Software Architect role    →      Senior Developer role
Lock specification             Create blueprint, task DAG,         Build production code
Competitive analysis           Gantt chart, architectural vision   Track effort vs estimates

                                    ↓

Phase 4: Verification          Phase 5: Release
QA Lead role            →       Release Manager role
Evidence package, GO/NO-GO       Release coordination, lessons learned
Security scan, performance test  Organizational learning
```

### Progressive Disclosure (Token Optimization)

The system reduces token usage by loading templates **on-demand**:
- **Phase prompts** (`0N-*.md`) always load
- **Templates** (`0N-*-templates.md`) load only when needed
- **Constraints** referenced by ID (A1-E33) not full text
- **Git commands** are templates, not inline examples
- **Role details** in separate files, loaded conditionally

**Target:** 50-55% token reduction vs. inline approach

### Role-Based State Machine

Each phase activates specific roles with specialized behaviors:

- **Product Manager** (Phase 1): Domain expertise, requirements clarity
- **Software Architect** (Phase 2): System design, task decomposition, architectural decisions
- **Senior Developer** (Phase 3): Production code quality, pattern reuse, optimization
- **QA Lead** (Phase 4): Evidence collection, security scanning, performance validation
- **Release Manager** (Phase 5): Go/no-go decisions, delivery coordination, learning capture
- **Data Interpreter** (Phase 4-5): Performance visualization, KPI dashboards
- **Ethics & Security Engineer** (Phase 2, 4): Bias detection, GDPR compliance, accessibility

### Skill Tier Adaptation

Communication style determined at Phase 1 start:
- **Beginner:** Detailed explanations, step-by-step guidance, full context
- **Advanced:** Concise, assumes familiarity, highlights patterns
- **Ninja:** Minimal guidance, maximum efficiency, code-first

Tier affects template loading, explanation depth, and constraint emphasis.

### Session Management

Between phases, the system generates recovery checkpoints:
- Handoff files with full context
- Model recommendations
- Lazy loading for phase artifacts
- Context recovery protocol (/recover) if interrupted

### MCP Tool Integration

CodeMaestro integrates with Model Context Protocol (MCP) tools:

**Available Tools:**
- **Context7**: Library documentation, API validation, code examples (Phase 1-4)
- **WebSearch**: Competitive research, technology comparison (Phase 1, 2, 4)
- **WebFetch**: Specific URL documentation retrieval (Phase 1-4)

**Usage:**
- Context7: `/lookup [library]`, `/example [lib] [feature]`, max 3 calls per question
- WebSearch: Include year (2026) in queries, cite sources in decisions
- WebFetch: Fetch specific documentation pages, 15-minute cache

**Constraints:**
- A7 enforced: Only use confirmed APIs from Context7
- All sources must be cited in decision log
- Validate information from multiple sources

**Configuration:** See [.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md) for complete integration guide.

---

## Working with the CodeMaestro System

### Testing Changes to the System

To verify modifications work correctly:

```bash
# 1. Create test project directory
mkdir /tmp/codemaestro-test && cd /tmp/codemaestro-test

# 2. Copy system files
cp /path/to/CodeMaestro/init-docs.sh .
cp /path/to/CodeMaestro/CLAUDE.md .
cp -r /path/to/CodeMaestro/docs .

# 3. Initialize
chmod +x init-docs.sh
./init-docs.sh

# 4. Setup git
git init
git checkout -b develop
git add .
git commit -m "Initial CodeMaestro setup"

# 5. Test in Claude Code
# Open this directory in Claude Code and test the system
```

### Modifying Core System Components

#### Updating Phase Workflows

**Files:** `.CodeMaestro/prompts/0[1-5]-phase-name.md`

- Each phase prompt is self-contained
- Must reference `00-core.md` for roles/constraints
- Use template references, not inline templates
- Update version tag if changing behavior

**Example:**
```markdown
## Phase 2: Planning

> Reference roles from 00-core.md, constraint IDs not full text

[Phase content]
See templates in `02-planning-templates.md` for detailed task structures.
```

#### Adding/Modifying Roles

**Files:** `.CodeMaestro/config/roles/*.md` and `.CodeMaestro/prompts/00-core.md`

1. Define role in `00-core.md` with template format
2. Create detailed file in `.CodeMaestro/config/roles/new-role.md`
3. Reference in phase prompts where role is active
4. Update COMMANDS.md if adding role-specific commands

#### Updating Constraints

**File:** `.CodeMaestro/config/constraints-reference.md`

- Constraints use ID format: `A#` (Architecture), `B#` (Best Practice), `C#` (Code Quality), `D#` (Documentation), `E#` (Evidence)
- In prompts, reference by ID only (e.g., "See constraint A1")
- Update full text in constraints-reference.md
- Document rationale and examples

#### Modifying Git Workflow

**File:** `.CodeMaestro/config/git-commands.md`

- Contains templates for common git operations
- Reference templates in phase prompts
- Template format: descriptive section with shell commands
- Version tagging convention: `v0.[phase].x-[phase-name]`, `v1.0.0+` for releases

### Token Optimization Principles

When modifying the system:

1. **Progressive Disclosure:** Load templates only when needed
2. **Conditional Loading:** Skip irrelevant skill tiers or domains
3. **Reference, Don't Inline:** Use IDs for constraints, links for templates
4. **Domain Adaptation:** Auto-detect project type (Mobile/Web/Cloud/AI)
5. **Lazy Artifact Loading:** Don't include full Gantt charts or massive diagrams inline

---

## Documentation Standards

### File Naming Conventions

- Phase prompts: `0N-phase-name.md` (e.g., `02-planning.md`)
- Phase templates: `0N-phase-name-templates.md`
- Role files: `role-name.md` (e.g., `product-manager.md`)
- Configuration: descriptive names (`git-commands.md`, `constraints-reference.md`)

### Markdown Standards

- Headers: H1 for title, H2 for major sections, H3 for subsections
- Tables for structured data (roles, commands, thresholds)
- Code blocks for examples and templates
- Links to related files, not duplication

### Git Workflow Integration

**Branch Strategy:** Git-flow variant
- `main` - production-ready code/docs
- `develop` - integration branch
- `feature/*` - milestone features
- `task/*` - individual improvements
- `release/*` - release preparation
- `hotfix/*` - emergency fixes

**Version Tags:**
- `v0.1.x-spec` - Specification versions
- `v0.2.x-plan` - Planning versions
- `v0.3.x-impl` - Implementation versions
- `v0.4.x-verify` - Verification versions
- `v1.0.0+` - Production releases

### Quality Gates

Non-negotiable minimums:
- **Test Coverage:** ≥70% (blocking)
- **Security Issues:** 0 critical/high (blocking)
- **Acceptance Criteria Pass Rate:** 100% (blocking)

Override in `.CodeMaestro/config/thresholds.md` if needed for specific projects.

---

## Development Workflow

### Making Changes

1. **Understand current state:** Read relevant prompt files and config files
2. **Identify scope:** Which phase(s) or components affected?
3. **Plan approach:** Consider token impact and progressive disclosure
4. **Test in isolation:** Use test project approach above
5. **Update documentation:** Modify prompts, templates, constraints as needed
6. **Commit with clarity:** Reference constraints and provide context
7. **Version appropriately:** Tag changes with v0.X.X format

### Common Tasks

#### Add a new command
1. Define command in relevant phase prompt
2. Document in [COMMANDS.md](COMMANDS.md)
3. Create implementation guidance in phase-specific templates
4. Test command flow in test project

#### Modify a role's responsibilities
1. Update role definition in `.CodeMaestro/config/roles/*.md`
2. Update role entry in `00-core.md`
3. Adjust phase prompts that reference the role
4. Test role transitions in test project

#### Improve token efficiency
1. Identify inline content that should be templated
2. Move to `0N-*-templates.md` files
3. Replace with reference links
4. Test with different skill tiers to ensure conditional loading works

#### Fix a bug in prompt logic
1. Identify which prompt files are affected
2. Reproduce issue in test project
3. Fix in isolated prompt files
4. Verify fix doesn't break role transitions
5. Update version tag appropriately

---

## Key Principles

1. **Self-Documenting:** The prompt files explain themselves; avoid duplication
2. **Progressive Disclosure:** Load only what's needed; templates on-demand
3. **Token Efficiency:** Target 50-55% reduction; reference, don't inline
4. **Role Clarity:** Each role has clear responsibilities; no overlaps
5. **Evidence-Based:** All decisions backed by constraints (A1-E33)
6. **Quality First:** Meet quality gates before considering feature-complete
7. **Backward Compatibility:** Changes should not break existing workflows
8. **Documentation Driven:** If it's not documented, it doesn't exist

---

## Common References

- **Quick config index:** See [.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md](.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md) ⭐ **START HERE**
- **Core commands:** See [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md) (Phases 1-5)
- **Advanced commands:** See [.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md) (Phase F, Phases 4-5 only)
- **System configuration:** See [.CodeMaestro/prompts/00-core.md](.CodeMaestro/prompts/00-core.md)
- **Constraints:** See [.CodeMaestro/config/constraints-reference.md](.CodeMaestro/config/constraints-reference.md)
- **Git workflows:** See [.CodeMaestro/config/git-commands.md](.CodeMaestro/config/git-commands.md)
- **Installation (users):** See [README.md](.CodeMaestro/docs/README.md)
- **Help command:** Run `/help` in Claude Code once initialized

---

## Version

**CodeMaestro:** 1.0.0
**Release:** 2026-01-01
**Codename:** Phoenix
**Last Updated:** 2026-01-12
