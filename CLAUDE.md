# CLAUDE.md

---

## Project Overview

**CodeMaestro v1.1** (Codename: Phoenix) is a role-based automated development system that orchestrates software development through a 5-phase lifecycle. This is a **framework/tool**, not a traditional codebase—it's designed to guide developers (and AI) through structured software development processes.

**Key Characteristics:**
- Documentation-driven architecture
- Progressive disclosure for token efficiency (50-55% reduction)
- Role-based state machine orchestrating 5 development phases
- Anti-hallucination philosophy: "Copy instead of write, connect instead of create, reuse instead of reinvent"
- Skill tier adaptation (Beginner/Advanced/Ninja)
- Knowledge base for project-specific learning
- Session management with recovery checkpoints

---

## Repository Structure & Architecture

### Core Directory Layout

**Key locations:**

| Directory/File | Purpose |
|----------------|---------|
| `.CodeMaestro/` | **All framework files** (easy to exclude) |
| `.CodeMaestro/prompts/` | Core system prompts (00-core, phase prompts, templates) |
| `.CodeMaestro/config/` | Configuration files (git-commands, constraints, etc.) |
| `.CodeMaestro/agents/` | Agent definitions (product-manager, architect, developer, etc.) |
| `.CodeMaestro/orchestrator/` | Orchestrator and handoff protocol |
| `setup.sh` | Project initialization script |
| `CLAUDE.md` | This file (developer guide for Claude Code) |
| `README.md` | User-facing installation guide |
| `.CodeMaestro/docs/INTERACTIONS-CORE.md` | Essential interactions (Phases 1-5) |
| `.CodeMaestro/docs/INTERACTIONS-ADVANCED.md` | Advanced interactions (Phases 4-5 only) |

**Note:** All CodeMaestro framework files are in `.CodeMaestro/` directory for easy exclusion from project deliverables. User projects will have their own `.CodeMaestro/` directory (created by setup.sh) and `docs/` for project-specific documentation.

### Key Files to Understand

| File | Purpose | Load When |
|------|---------|-----------|
| **[.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md](.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md)** | **START HERE** - Quick index of all configs with loading guidance | Always reference first |
| **[.CodeMaestro/prompts/00-core.md](.CodeMaestro/prompts/00-core.md)** | System configuration: roles, constraints (A1-E33), thresholds, skill tiers | Every session |
| **[.CodeMaestro/docs/INTERACTIONS-CORE.md](.CodeMaestro/docs/INTERACTIONS-CORE.md)** | Essential interactions (daily workflow) | Phases 1-5 |
| **[.CodeMaestro/docs/INTERACTIONS-ADVANCED.md](.CodeMaestro/docs/INTERACTIONS-ADVANCED.md)** | Advanced interactions (estimation, compliance) | Phases 4-5 only |
| **[.CodeMaestro/config/git-commands.md](.CodeMaestro/config/git-commands.md)** | Git workflow templates (reference by section ID) | All phases |
| **[.CodeMaestro/config/constraints-reference.md](.CodeMaestro/config/constraints-reference.md)** | Complete constraint list (reference by ID: A1-E33) | Reference only |
| **[.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md)** | MCP tool integrations (Context7, WebSearch, WebFetch) | Phase 1-4 (research) |
| **[setup.sh](setup.sh)** | Creates directory structure for user projects | Project setup |
| **[README.md](.CodeMaestro/docs/README.md)** | User-facing installation guide (not for Claude Code) | User reference only |

---

## Architecture Concepts

### 5-Phase Lifecycle

CodeMaestro orchestrates development through five sequential phases:

**Phase 1: Requirements** (Product Manager) - Lock specification through competitive analysis and requirements deconstruction. Outputs: Locked Specification, Competitive Analysis.

**Phase 2: Planning** (Software Architect) - Create technical blueprint, task DAG, Gantt chart, and architectural vision with token estimates. Outputs: Blueprint, Task Dependencies, Token Budgets.

**Phase 3: Implementation** (Senior Developer) - Build production code following blueprint patterns. Track actual effort vs estimates. Outputs: Production Code, Module Contexts, Token Tracking.

**Phase 4: Verification** (QA Lead) - Collect evidence package, perform security scan, and make GO/NO-GO decision. Outputs: Evidence Package, Test Results, Performance Metrics, Token Efficiency Analysis.

**Phase 5: Release** (Release Manager) - Coordinate release, capture lessons learned, and document organizational learning. Outputs: Release Package, Token Retrospective, Knowledge Base Updates.

### Progressive Disclosure (Token Optimization)

The system reduces token usage by loading templates **on-demand**:
- **Phase prompts** (`0N-*.md`) always load
- **Templates** (`0N-*-templates.md`) load only when needed
- **Constraints** referenced by ID (A1-E33) not full text
- **Git commands** are templates, not inline examples
- **Role details** in separate files, loaded conditionally

**Target:** 50-55% token reduction vs. inline approach

### Agent-Based Orchestration

Each phase invokes specialized agents via the orchestrator with minimal context handoffs:

- **product-manager** (Phase 1): Requirements gathering, competitive analysis, AC generation
- **architect** (Phase 2): System design, task decomposition, architectural decisions
- **planner** (Phase 2, 3): Task breakdown, implementation planning
- **developer** (Phase 3): Production code quality, pattern reuse, anti-hallucination workflow
- **code-reviewer** (Phase 3, 4): Code quality review, security analysis
- **qa-lead** (Phase 4): Evidence collection, quality gate enforcement, GO/NO-GO decisions
- **security-engineer** (Phase 2, 4): Threat modeling, vulnerability scanning, security validation
- **data-interpreter** (Phase 4, 5): Performance visualization, KPI dashboards
- **release-manager** (Phase 5): Release coordination, lessons learned, knowledge base updates

**Orchestrator:** `orchestrator/phase-controller.md` manages agent invocation, state, and quality gates
**Handoff Protocol:** `orchestrator/handoff-protocol.md` defines minimal context passing between agents

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

#### Adding/Modifying Agents

**Files:** `.CodeMaestro/agents/*.md` and `.CodeMaestro/prompts/00-core.md`

1. Define agent in `00-core.md` agent registry
2. Create agent file in `.CodeMaestro/agents/new-agent.md` following agent template
3. Register in `orchestrator/phase-controller.md` with model assignment
4. Define handoff inputs/outputs in `orchestrator/handoff-protocol.md`
5. Update phase prompts to invoke agent where needed

**Agent Template:** See `docs/MIGRATION-ROLES-TO-AGENTS.md` for agent structure (YAML frontmatter, inputs, process, outputs, quality checks, handoff)

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

CodeMaestro enforces non-negotiable quality thresholds at phase boundaries:

**Default Thresholds:**
- Test Coverage: ≥70%
- Security Issues: 0 critical/high
- Acceptance Criteria Pass Rate: 100%

**See:** [.CodeMaestro/config/thresholds.md](.CodeMaestro/config/thresholds.md) for complete threshold definitions, rationale, and project-specific override instructions.

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

#### Modify an agent's responsibilities
1. Update agent definition in `.CodeMaestro/agents/*.md`
2. Update agent entry in `00-core.md` agent registry
3. Update orchestrator if changing model assignment or phase
4. Adjust phase prompts that invoke the agent
5. Test agent invocation in test project

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

## Natural Language Interface (v1.1)

CodeMaestro uses natural language as the primary interface in Claude Code environments.

**Common Natural Language Requests:**

| Intent | Examples |
|--------|----------|
| Search knowledge base | "Search the knowledge base for [topic]", "find pattern for [topic]" |
| Generate commit | "Generate a commit for my changes", "save my work" |
| Generate tests | "Generate test stubs for AC-1.2", "create tests for this feature" |
| Show status | "What's my current progress?", "show my status" |
| Next task | "What should I work on next?", "continue work" |
| Verify changes | "Verify my changes", "run quality checks" |
| Invoke agent | "Review this code" (code-reviewer), "help me decide on [architecture]" (architect) |

**Note:** Natural language is processed directly by Claude Code. Slash commands (`/command`) are not supported and have been removed from CodeMaestro v1.1.

---

## Subagent Orchestration (v1.1)

Specialized agents can be delegated for focused tasks:

| Agent | Purpose | Invoke With |
|-------|---------|-------------|
| **code-reviewer** | Quality, security, maintainability review | "Review this code" |
| **architect** | System design, technology decisions | "Help me decide on [architecture]" |
| **planner** | Implementation planning, task breakdown | "Plan the implementation of [feature]" |

**Agents have:**
- Limited scope (focused on their specialty)
- Specific tools (minimal footprint)
- Clear output formats

**See:** [.CodeMaestro/agents/](.CodeMaestro/agents/) directory

---

## Continuous Learning (v1.1)

Automatically captures patterns from development sessions:

**Instinct Model:**
- Small learned behaviors with confidence scoring (0.3 → 0.9)
- Auto-detected from user corrections, error resolutions, repeated workflows
- Stored in `.CodeMaestro/knowledge-base/instincts/`
- Confidence evolves based on reinforcement

**Session End:**
- Review for new instincts
- Update confidence on existing instincts
- Auto-decay unused patterns

**See:** [.CodeMaestro/config/continuous-learning.md](.CodeMaestro/config/continuous-learning.md)

---

## Automated Verification Loop (v1.1)

6-phase verification for code quality:

1. **Build**: Compile without errors
2. **Types**: Type safety (0 errors)
3. **Lint**: Code style (0 errors)
4. **Tests**: Pass rate + coverage (≥70%)
5. **Security**: Vulnerability scan (0 critical/high)
6. **Diff**: Change scope review

**Triggers:**
- "Verify my changes" → Full verification
- Task completion (Phase 3) → Quick check
- Before PR → Full + evidence

**See:** [.CodeMaestro/config/verification-loop.md](.CodeMaestro/config/verification-loop.md)

---

## Key Principles

1. **Anti-Hallucination First:** Copy verified examples, connect to existing solutions, reuse proven patterns
2. **Self-Documenting:** The prompt files explain themselves; avoid duplication
3. **Progressive Disclosure:** Load only what's needed; templates on-demand
4. **Token Efficiency:** Target 50-55% reduction; reference, don't inline
5. **Role Clarity:** Each role has clear responsibilities; no overlaps
6. **Evidence-Based:** All decisions backed by constraints (A1-E33)
7. **Quality First:** Meet quality gates before considering feature-complete
8. **Backward Compatibility:** Changes should not break existing workflows
9. **Documentation Driven:** If it's not documented, it doesn't exist

---

## Common References

- **Quick config index:** See [.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md](.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md) ⭐ **START HERE**
- **Anti-hallucination guide:** See [.CodeMaestro/config/anti-hallucination-guide.md](.CodeMaestro/config/anti-hallucination-guide.md) ⭐ **CORE PHILOSOPHY**
- **Core interactions:** See [.CodeMaestro/docs/INTERACTIONS-CORE.md](.CodeMaestro/docs/INTERACTIONS-CORE.md) (Phases 1-5)
- **Advanced interactions:** See [.CodeMaestro/docs/INTERACTIONS-ADVANCED.md](.CodeMaestro/docs/INTERACTIONS-ADVANCED.md) (Phases 4-5 only)
- **System configuration:** See [.CodeMaestro/prompts/00-core.md](.CodeMaestro/prompts/00-core.md)
- **Constraints:** See [.CodeMaestro/config/constraints-reference.md](.CodeMaestro/config/constraints-reference.md)
- **Git workflows:** See [.CodeMaestro/config/git-commands.md](.CodeMaestro/config/git-commands.md)
- **Installation (users):** See [README.md](.CodeMaestro/docs/README.md)

**v1.1 Features:**
- **Agent architecture:** See [.CodeMaestro/agents/](.CodeMaestro/agents/) (9 specialized agents with orchestrator)
- **Natural language interface:** Native support in Claude Code (see "Natural Language Interface" section above)
- **Continuous learning:** See [.CodeMaestro/config/continuous-learning.md](.CodeMaestro/config/continuous-learning.md)
- **Verification loop:** See [.CodeMaestro/config/verification-loop.md](.CodeMaestro/config/verification-loop.md)
- **Iterative retrieval:** See [.CodeMaestro/config/iterative-retrieval.md](.CodeMaestro/config/iterative-retrieval.md)

---

## Version

**CodeMaestro:** 1.1.0
**Release:** 2026-01-27
**Codename:** Phoenix
**Last Updated:** 2026-01-27
