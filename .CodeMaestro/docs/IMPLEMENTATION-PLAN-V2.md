# CodeMaestro v2.0 Implementation Plan
## Migration to Hybrid Architecture (Agents + Skills)

**Document Version:** 1.0
**Created:** 2026-01-20
**Target Release:** Q2 2026 (12 weeks)
**Codename:** Phoenix Rising

---

## Executive Summary

This document outlines the migration plan for CodeMaestro v1.0 (prompt-based) to v2.0 (hybrid architecture combining Phase Agents and reusable Skills). The hybrid model provides three user modes: beginner (agent-guided), advanced (skill-direct), and expert (hybrid).

**Key Decisions:**
- ✅ **Architecture:** Hybrid model (5 Phase Agents + 9 Core Skills)
- ✅ **Commit Strategy:** Build CodeMaestro-specific commit skill (NOT using commit-commands plugin)
- ✅ **KB Storage:** Project-first with optional global cache
- ✅ **Timeline:** 12 weeks from start to public release
- ✅ **Target:** 9 core skills, 5 phase agents, complete Phase 1-5 workflow

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design Decisions](#design-decisions)
3. [Skills Overview](#skills-overview)
4. [Agents Overview](#agents-overview)
5. [Implementation Phases](#implementation-phases)
6. [Resource Requirements](#resource-requirements)
7. [Success Metrics](#success-metrics)
8. [Risk Mitigation](#risk-mitigation)
9. [Next Steps](#next-steps)

---

## Architecture Overview

### **Current State (v1.0)**

```
CodeMaestro v1.0 (Prompt-Based)
├── .CodeMaestro/
│   ├── prompts/           ← Phase prompts loaded manually
│   ├── config/            ← Configuration files
│   └── docs/              ← Command references
├── CLAUDE.md              ← Developer guide
└── User manually loads prompts for each phase
```

**Limitations:**
- Manual prompt loading
- High token usage (instructions in context every time)
- No cross-project reuse
- User must remember phase and commands
- No built-in orchestration

---

### **Target State (v2.0)**

```
CodeMaestro v2.0 (Hybrid Architecture)

┌─────────────────────────────────────────┐
│         Global Skills (Install Once)     │
│    ~/.claude/skills/codemaestro-*/      │
├─────────────────────────────────────────┤
│  /kb, /commit, /scaffold, /tree,       │
│  /generate, /estimate, /security,       │
│  /handoff, /status                      │
└─────────────────────────────────────────┘
              ↕ (Used by)
┌─────────────────────────────────────────┐
│      Project-Specific Agents            │
│    .CodeMaestro/agents/                 │
├─────────────────────────────────────────┤
│  Requirements Agent → Planning Agent    │
│  → Implementation Agent → Verification  │
│  Agent → Release Agent                  │
└─────────────────────────────────────────┘
              ↕ (Store data in)
┌─────────────────────────────────────────┐
│         Project Documentation           │
│    docs/kb/ (Project KB)                │
│    docs/design/ (Blueprints)            │
│    docs/implementation/ (Checkpoints)   │
└─────────────────────────────────────────┘
              ↕ (Optional sync)
┌─────────────────────────────────────────┐
│         Global Knowledge Base           │
│    ~/.claude/knowledge-base/            │
│    (Optional cross-project patterns)    │
└─────────────────────────────────────────┘
```

**Benefits:**
- One-line skill invocation (`/kb search auth`)
- Agent-guided workflow for beginners
- Cross-project pattern reuse
- Lower token usage (50-55% reduction maintained)
- Composable skills and agents
- "Suggested Next Actions" at every step

---

## Design Decisions

### **Decision 1: Hybrid Architecture (Agents + Skills)**

**Options Considered:**
1. Phase-Based Agents Only
2. Skills-Based Commands Only
3. **Hybrid (Agents + Skills)** ✅ SELECTED

**Rationale:**
- Agents provide structured workflow for complex lifecycles
- Skills provide power tools for specific tasks
- Users choose their mode (beginner/advanced/expert)
- Agents internally use skills (composability)
- Skills work standalone in any project

**Impact:**
- Build both agents and skills
- Higher complexity but maximum flexibility
- Best serves all user skill levels

---

### **Decision 2: Commit Strategy**

**Options Considered:**
1. Use existing commit-commands plugin + wrapper
2. **Build CodeMaestro-specific commit skill** ✅ SELECTED

**Rationale:**
- CodeMaestro has specific commit behavior:
  - Phase-aware commit messages
  - Role-based commit conventions
  - Integration with git-commands.md templates
  - Co-Authored-By tag formatting
  - KB search for similar commits
  - Quality gate checks before commit
  - Constraint references (A1-E33)
- Existing commit-commands plugin is too generic
- Full control over commit workflow is essential
- commit-commands plugin might not be available/maintained

**Impact:**
- Build commit skill from scratch
- More work upfront (estimate +3 days)
- Better integration with CodeMaestro philosophy
- No external dependencies

**Implementation Notes:**
- Support all git-commands.md templates
- Read recent commit history to match style
- Validate against quality gates
- Generate commit message based on:
  - Current phase (from .recovery-checkpoint.md)
  - Current role (Product Manager, Developer, etc.)
  - Git diff analysis
  - Similar commits from KB

---

### **Decision 3: KB Storage (Project-First)**

**Options Considered:**
1. Dual Storage (Project + Global equally important)
2. Global-Only Storage
3. **Project-First with Optional Global Cache** ✅ SELECTED

**Rationale:**
- KB should be git-tracked (team collaboration)
- KB documents project-specific decisions
- Global cache is convenience, not requirement
- Clear source of truth (the project)
- Export/import for cross-project reuse

**Storage Structure:**
```
# Project KB (primary, git-tracked)
/project/docs/kb/
├── index.md
├── patterns/
├── failures/
└── decisions/

# Global cache (optional, personal)
~/.claude/knowledge-base/
└── cache/
    ├── patterns/
    ├── failures/
    └── metadata.json
```

**Impact:**
- KB travels with project (in git)
- Team sees same patterns
- Personal cache grows across projects
- Export/import commands needed

---

### **Decision 4: Skill Priority**

**Tier 1 (Essential, Build First):**
1. `/kb` - Knowledge base management
2. `/commit` - Auto-generate commits
3. `/scaffold` - Project scaffolding
4. `/tree` - Task DAG visualization
5. `/generate` - Code generation
6. `/estimate` - Token estimation

**Tier 2 (High-Value, Build Second):**
7. `/security` - Security scanning
8. `/handoff` - Session management
9. `/status` - Progress tracking

**Tier 3 (Nice-to-Have, Future):**
10. `/portfolio` - Documentation generation
11. `/benchmark` - Performance testing
12. `/ethical` - Ethics & compliance
13. `/cleanup` - Framework removal

**Start with 9 skills (Tier 1 + Tier 2)**

---

## Skills Overview

### **Skill 1: `/kb` (Knowledge Base)**

**Purpose:** Manage project and global knowledge base

**Commands:**
- `/kb search [query]` - Search project + global cache
- `/kb add pattern --name [name]` - Add pattern to project KB
- `/kb add failure --name [name]` - Document failure/lesson
- `/kb add decision --name [name]` - Record architectural decision
- `/kb export pattern [name]` - Export to global cache
- `/kb import pattern [name]` - Import from global cache
- `/kb list` - List all KB entries

**Storage:**
- Primary: `docs/kb/` (git-tracked)
- Cache: `~/.claude/knowledge-base/cache/`

**Integration:**
- Planning Agent uses for similar pattern search
- Implementation Agent uses before building new features
- Release Agent uses for lessons learned export

**Suggested Next Actions Examples:**
```
After /kb search auth:
→ /kb import pattern jwt-auth
→ /scaffold web --template jwt-pattern
→ View full pattern: docs/kb/patterns/auth-001.md
```

---

### **Skill 2: `/commit` (Auto-Commit)**

**Purpose:** Generate git commits with CodeMaestro conventions

**Commands:**
- `/commit --auto` - Auto-generate commit from git diff
- `/commit --amend` - Amend last commit (with safety checks)
- `/commit --phase [N]` - Explicit phase for commit message
- `/commit --role [name]` - Explicit role for commit message

**Behavior:**
1. Detect current phase from `.recovery-checkpoint.md`
2. Detect current role (Product Manager, Developer, QA Lead, etc.)
3. Analyze git diff
4. Search `/kb` for similar commits
5. Read recent commit history (match style)
6. Load git-commands.md templates
7. Generate commit message following conventions
8. Add Co-Authored-By tag
9. Reference constraints if applicable (A1-E33)
10. Execute commit
11. Return with "Suggested Next Actions"

**Commit Message Format:**
```
[phase]: [type] [description]

[Optional body with more details]

Refs: [constraints/tickets if applicable]
Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>
```

**Examples:**
```
Phase 2: feat: Add user authentication blueprint

Designed JWT-based authentication with refresh tokens.
Includes role-based access control (RBAC) patterns.

Refs: A7 (API validation), B2 (security best practices)
Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>

---

Phase 3: fix: Resolve memory leak in React hooks

useState cleanup was missing in useEffect.
Added proper cleanup function to prevent memory accumulation.

Refs: C3 (code quality), failure documented in KB
Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>
```

**Safety Checks:**
- Warn if committing potential secrets (.env, credentials)
- Check quality gates before commit (tests passing, coverage adequate)
- Confirm before amending
- Validate no uncommitted changes would be lost

**Integration:**
- Implementation Agent uses after each task
- Verification Agent uses for evidence collection commits
- Release Agent uses for final release commits

**Suggested Next Actions Examples:**
```
After /commit --auto:
→ git push origin [branch]
→ /security scan (if new dependencies)
→ Continue to next task
→ /handoff --next (if pausing)
```

---

### **Skill 3: `/scaffold` (Project Scaffolding)**

**Purpose:** Generate domain-specific project structures

**Commands:**
- `/scaffold web --framework [next|react|vue]`
- `/scaffold mobile --framework [react-native|flutter]`
- `/scaffold cloud --type [serverless|microservices]`
- `/scaffold ai --framework [pytorch|tensorflow]`
- `/scaffold web --template [pattern-name]` - From KB

**Behavior:**
1. Check `/kb` for existing templates
2. Generate directory structure
3. Create boilerplate files (configs, types, tests)
4. Initialize git if needed
5. Generate .gitignore
6. Create README with setup instructions
7. Return with "Suggested Next Actions"

**Templates Include:**
- Framework-specific configs (tsconfig, webpack, vite)
- Package.json with essential dependencies
- ESLint/Prettier configs
- Testing setup (Jest, Vitest, Playwright)
- Sample components/modules
- CI/CD templates (.github/workflows)

**Integration:**
- Planning Agent uses after task decomposition
- Can load patterns from KB

**Suggested Next Actions Examples:**
```
After /scaffold web --framework next:
→ /tree --visual (visualize structure)
→ /generate test --for src/components
→ /commit --auto (commit scaffold)
→ /kb add pattern --name "nextjs-14-scaffold"
```

---

### **Skill 4: `/tree` (Task Visualization)**

**Purpose:** Visualize task DAG and dependencies

**Commands:**
- `/tree --visual` - Interactive visualization
- `/tree --layout [hierarchical|force|radial]`
- `/tree --critical-path` - Highlight critical path
- `/tree --progress` - Show task completion status
- `/tree --export [mermaid|graphviz|json]`

**Input:**
Parses `docs/design/blueprint.md` for task structure

**Behavior:**
1. Read blueprint.md (task DAG section)
2. Parse task dependencies
3. Calculate critical path
4. Generate visualization in selected layout
5. Highlight task statuses (pending/in-progress/completed)
6. Export to various formats

**Visualization Examples:**
```
# Hierarchical
Module A
├── Task 1.1 ✅
├── Task 1.2 🔄
└── Task 1.3 ⏳

Module B (depends on Task 1.2)
├── Task 2.1 ⏳
└── Task 2.2 ⏳

# Critical Path (highlighted)
Task 1.1 → Task 1.2 → Task 2.1 → Task 2.2
[Estimated: 8 hours, on critical path]
```

**Integration:**
- Planning Agent uses after generating blueprint
- Implementation Agent uses for progress tracking
- Verification Agent uses for completeness check

**Suggested Next Actions Examples:**
```
After /tree --visual:
→ Edit blueprint.md (adjust dependencies)
→ /estimate --recalc (update token estimates)
→ /implement (start Implementation Agent)
→ Export: /tree --export mermaid
```

---

### **Skill 5: `/generate` (Code Generation)**

**Purpose:** Generate code from specifications

**Commands:**
- `/generate test --for [path]` - Generate test stubs
- `/generate test --ac [AC-ID]` - From acceptance criteria
- `/generate docs --for [path]` - Generate documentation
- `/generate types --from [schema]` - Generate TypeScript types
- `/generate api --from [spec]` - Generate API boilerplate

**Behavior:**
1. Analyze input (file, acceptance criteria, schema)
2. Detect language/framework
3. Search `/kb` and Context7 for examples
4. Generate code following project conventions
5. Follow constraint A7.5 (copy verified examples)
6. Return with "Suggested Next Actions"

**Test Generation Example:**
```
Given acceptance criteria:
AC-1.2: User can log in with email and password

Generates:
describe('User Authentication', () => {
  describe('AC-1.2: Login with email and password', () => {
    it('should log in successfully with valid credentials', () => {
      // Given: User with valid credentials
      // When: User submits login form
      // Then: User is authenticated and redirected
    });

    it('should reject invalid credentials', () => {
      // Given: User with invalid password
      // When: User submits login form
      // Then: Error message displayed
    });

    it('should handle missing email field', () => {
      // Given: Form with missing email
      // When: User submits login form
      // Then: Validation error displayed
    });
  });
});
```

**Integration:**
- Planning Agent uses to estimate test complexity
- Implementation Agent uses after implementing features
- Verification Agent uses to check test coverage

**Suggested Next Actions Examples:**
```
After /generate test --for src/auth:
→ Run tests: npm test
→ Implement failing tests
→ /commit --auto (commit tests + implementation)
→ /security scan (check for vulnerabilities)
```

---

### **Skill 6: `/estimate` (Token Estimation)**

**Purpose:** Track and analyze token usage

**Commands:**
- `/estimate --task [task-id]` - Estimate single task
- `/estimate --module [name]` - Estimate module
- `/estimate --total` - Total project estimate
- `/estimate --variance` - Actual vs estimated
- `/estimate --recalc` - Recalculate after changes
- `/estimate --budget` - Check session budget

**Behavior:**
1. Parse blueprint for token estimates
2. Track actual token usage per session
3. Calculate variance (estimated vs actual)
4. Classify variance quality:
   - Excellent: <±10%
   - Good: ±10-20%
   - Needs Improvement: >±20%
5. Generate efficiency reports
6. Warn if approaching session budget (800K tokens)

**Output Example:**
```
Token Usage Report
==================

Phase 2: Planning
├── Estimated: 45K tokens
├── Actual: 42K tokens
└── Variance: -6.7% (Excellent ✅)

Phase 3: Implementation (in progress)
├── Estimated: 320K tokens
├── Used so far: 180K tokens
├── Remaining: 140K tokens
└── Projected completion: 310K (±3%, Excellent ✅)

Session Budget
├── Total: 800K tokens (usable)
├── Used: 222K tokens (28%)
├── Remaining: 578K tokens (72%)
└── Status: Healthy ✅

Recommendations:
→ On track for budget
→ Implementation phase efficiency excellent
→ Continue current approach
```

**Integration:**
- Planning Agent uses to set token budgets
- Implementation Agent uses to check before each task
- Verification Agent uses for token efficiency metrics
- Release Agent uses for token retrospective

**Suggested Next Actions Examples:**
```
After /estimate --variance:
→ Continue (if within budget)
→ Optimize (if variance high)
→ /handoff --next (if approaching budget limit)
→ Review blueprint: docs/design/blueprint.md
```

---

### **Skill 7: `/security` (Security Scanning)**

**Purpose:** Automated vulnerability scanning

**Commands:**
- `/security scan` - Full security audit
- `/security scan --severity [critical|high|medium]`
- `/security scan --deps` - Dependency audit only
- `/security scan --code` - Static code analysis
- `/security scan --report` - Generate security report

**Behavior:**
1. Detect ecosystem (npm, pip, cargo, go, etc.)
2. Run appropriate tools:
   - npm: `npm audit`
   - Python: `pip-audit` or `safety`
   - Rust: `cargo audit`
   - Go: `govulncheck`
3. Static analysis (if applicable)
4. Parse results
5. Check against quality gates (0 critical/high)
6. Generate report
7. Return with "Suggested Next Actions"

**Output Example:**
```
Security Scan Results
=====================

Dependency Audit (npm)
├── Critical: 0 ✅
├── High: 1 ⚠️
├── Medium: 3
└── Low: 5

Critical/High Issues:
1. [HIGH] Regular Expression Denial of Service in validator@13.7.0
   → Fix: Update to validator@13.9.0
   → Command: npm update validator

Quality Gate Status:
❌ FAILED - 1 high severity issue found
→ Must resolve before proceeding to Phase 4

Recommendations:
→ npm update validator
→ Re-run: /security scan
→ Review: /kb search "validator vulnerability"
```

**Integration:**
- Implementation Agent uses after adding dependencies
- Verification Agent uses as quality gate check
- Release Agent uses for final security validation

**Suggested Next Actions Examples:**
```
After /security scan (with issues):
→ npm update [package] (fix vulnerabilities)
→ /kb search [vulnerability] (check for patterns)
→ Re-run: /security scan
→ Document: /kb add failure --name "security-[issue]"

After /security scan (clean):
→ /commit --auto (commit with security validation)
→ Continue to next phase
→ /verify (start Verification Agent)
```

---

### **Skill 8: `/handoff` (Session Management)**

**Purpose:** Generate phase transition and session handoffs

**Commands:**
- `/handoff --next` - Generate next phase handoff
- `/handoff --resume` - Generate mid-session resume
- `/handoff --phase [N]` - Explicit phase handoff
- `/handoff --recovery` - Generate recovery instructions

**Behavior:**
1. Detect current phase and status
2. Load handoff template (from .CodeMaestro/config/handoff-messages.md)
3. Generate 10-section handoff:
   - Context summary
   - Phase accomplishments
   - Next steps
   - Critical decisions
   - File locations
   - Token metrics
   - Git state
   - Quality gate status
   - Recovery instructions
   - Model recommendations
4. Save to `.recovery-checkpoint.md`
5. Return with "Suggested Next Actions"

**Output Example:**
```
Phase 2 → Phase 3 Handoff
=========================

Context Summary:
Project: Todo App (Web/React)
Phase: Planning → Implementation
Skill Tier: Advanced
Blueprint: docs/design/blueprint.md (23 tasks, 4 modules)

Accomplishments (Phase 2):
✅ Domain detected: Web (React + TypeScript)
✅ Task DAG created: 23 tasks across 4 modules
✅ Token budget: 320K estimated (within 800K limit)
✅ Scaffolding generated: Next.js 14 + Tailwind
✅ Critical path identified: 12 tasks, ~18 hours

Next Steps (Phase 3):
1. Start with Module A (authentication)
2. Implement Task 1.1, 1.2, 1.3 sequentially
3. Generate tests after each task
4. Commit after each task completion
5. Track token usage against 320K budget

Critical Decisions:
- JWT authentication with refresh tokens (not sessions)
- Redux Toolkit for state management (not Context API)
- Supabase for backend (not custom API)

Files Created:
- docs/design/blueprint.md (full technical blueprint)
- docs/design/task-dag.md (dependency graph)
- docs/design/gantt.md (timeline visualization)
- Project scaffolding in src/

Token Metrics:
- Phase 2 used: 42K tokens (estimated: 45K, -6.7%)
- Phase 3 budget: 320K tokens
- Session remaining: 758K tokens (95%)

Git State:
- Branch: feature/todo-app-planning
- Last commit: "feat: Add planning blueprint and task DAG"
- Uncommitted: None
- Remote: synced

Quality Gates:
✅ All acceptance criteria mapped to tasks
✅ Token budget validated
✅ Architectural patterns documented
✅ Dependencies identified and approved

Recovery Instructions:
If session ends, resume with:
1. Read: docs/design/blueprint.md
2. Start: /implement (Implementation Agent)
3. Or manual: /tree --visual (review tasks first)

Model Recommendations:
- Phase 3 (Implementation): Sonnet 4.5 (balanced speed/quality)
- Complex tasks: Consider Opus 4.5
- Simple tasks: Haiku sufficient

Suggested Next Actions:
→ /implement (start Implementation Agent) [Recommended]
→ /tree --visual (review task dependencies)
→ /estimate --total (review token budget)
→ /kb search [domain] (check for reusable patterns)
```

**Integration:**
- All agents use for phase transitions
- Used for mid-session pauses
- Used for session recovery

**Suggested Next Actions Examples:**
```
After /handoff --next:
→ Start next agent: /implement
→ Review handoff: docs/implementation/.recovery-checkpoint.md
→ Pause session (handoff saved for recovery)
```

---

### **Skill 9: `/status` (Progress Tracking)**

**Purpose:** Show current project status

**Commands:**
- `/status` - Full status overview
- `/status --phase` - Current phase only
- `/status --tasks` - Task completion
- `/status --quality` - Quality gate status
- `/status --tokens` - Token budget status

**Behavior:**
1. Parse `.recovery-checkpoint.md` for current state
2. Parse blueprint for task list
3. Check quality gate status
4. Check token usage
5. Generate concise status report
6. Return with "Suggested Next Actions"

**Output Example:**
```
Project Status
==============

Current Phase: Phase 3 (Implementation)
Progress: 12/23 tasks completed (52%)
Quality Gates: 3/5 passed

Phase Breakdown:
├── Phase 1: Requirements ✅ Complete
├── Phase 2: Planning ✅ Complete
├── Phase 3: Implementation 🔄 In Progress (52%)
├── Phase 4: Verification ⏳ Pending
└── Phase 5: Release ⏳ Pending

Task Status:
├── Module A: Authentication ✅ 3/3 complete
├── Module B: Todo CRUD 🔄 2/5 complete
├── Module C: UI Components ⏳ 0/8 pending
└── Module D: Integration ⏳ 0/7 pending

Quality Gates:
✅ Test Coverage: 78% (target: ≥70%)
✅ Security: 0 critical/high issues
❌ Performance: Not yet tested
⏳ Acceptance Criteria: 45% passing
⏳ Documentation: In progress

Token Usage:
├── Phase 3 Budget: 320K
├── Used: 168K (52%)
├── Remaining: 152K (48%)
└── Session: 210K/800K (26%)

Git State:
├── Branch: feature/todo-app-impl
├── Commits: 12 (since Phase 3 start)
└── Last: "feat: Add todo list component"

Suggested Next Actions:
→ Continue: Next task is Task 2.3 (Edit todo)
→ Review: /tree --visual --progress
→ Check budget: /estimate --variance
→ Pause: /handoff --next
```

**Integration:**
- Used by all agents for status checks
- Used by users to understand current state
- Used by Verification Agent for evidence collection

**Suggested Next Actions Examples:**
```
After /status:
→ Continue to next task
→ /tree --visual --progress (visual overview)
→ /estimate --variance (check token efficiency)
→ /verify (if ready for verification)
```

---

## Agents Overview

### **Agent 1: Requirements Agent (Phase 1)**

**Role:** Product Manager

**Input:** User's idea or requirements (freeform)

**Behavior:**
1. Ask clarifying questions about the project
2. Detect skill tier (beginner/advanced/ninja)
3. Perform competitive analysis (WebSearch, Context7)
4. Search `/kb` for similar projects
5. Deconstruct requirements into acceptance criteria
6. Generate locked specification
7. Validate completeness
8. Generate handoff to Phase 2

**Skills Used:**
- `/kb search` - Find similar projects
- WebSearch - Competitive research
- Context7 - Technology validation

**Output:**
- `docs/requirements/specification.md` (locked spec)
- `docs/requirements/competitive-analysis.md`
- `docs/requirements/acceptance-criteria.md`
- `.recovery-checkpoint.md` (Phase 1→2 handoff)

**Suggested Next Actions:**
```
After Requirements Agent complete:
→ /plan (start Planning Agent) [Recommended]
→ /kb search [domain] (find patterns before planning)
→ Review: docs/requirements/specification.md
```

---

### **Agent 2: Planning Agent (Phase 2)**

**Role:** Software Architect

**Input:** Locked specification from Phase 1

**Behavior:**
1. Read locked specification
2. Detect domain (Web/Mobile/Cloud/AI)
3. Search `/kb` for architectural patterns
4. Design technical blueprint
5. Decompose into task DAG
6. Generate token estimates for each task
7. Run `/scaffold` to generate project structure
8. Run `/tree --visual` to visualize dependencies
9. Calculate critical path
10. Generate Gantt chart
11. Validate token budget (within 800K session limit)
12. Generate handoff to Phase 3

**Skills Used:**
- `/kb search` - Find architectural patterns
- `/scaffold` - Generate project structure
- `/tree --visual` - Visualize task DAG
- `/estimate --total` - Validate token budget

**Output:**
- `docs/design/blueprint.md` (technical blueprint)
- `docs/design/task-dag.md` (dependency graph)
- `docs/design/gantt.md` (timeline)
- `docs/design/token-estimates.md`
- Project scaffolding in `src/`
- `.recovery-checkpoint.md` (Phase 2→3 handoff)

**Suggested Next Actions:**
```
After Planning Agent complete:
→ /implement (start Implementation Agent) [Recommended]
→ /tree --visual --layout force (review dependencies)
→ /estimate --total (review token budget)
→ /kb add pattern (save blueprint as pattern)
→ Edit blueprint.md (customize before implementing)
```

---

### **Agent 3: Implementation Agent (Phase 3)**

**Role:** Senior Developer

**Input:** Blueprint and task DAG from Phase 2

**Behavior:**
1. Read blueprint and task DAG
2. Load architectural patterns from `/kb`
3. Start task loop:
   a. Select next task (respect dependencies)
   b. Check token budget (`/estimate --budget`)
   c. Search `/kb` for similar implementations
   d. Implement task following blueprint
   e. Generate tests (`/generate test`)
   f. Run tests
   g. If tests fail: fix and repeat
   h. Run `/security scan` (if new dependencies)
   i. Create module context (document patterns used)
   j. Commit (`/commit --auto`)
   k. Update progress in blueprint
   l. Check quality gates
   m. Repeat until all tasks complete
4. Generate handoff to Phase 4

**Skills Used:**
- `/kb search` - Find implementation patterns
- `/generate test` - Generate test stubs
- `/commit --auto` - Commit after each task
- `/security scan` - Check vulnerabilities
- `/estimate --budget` - Track token usage
- `/status --tasks` - Track progress

**Output:**
- Production code in `src/`
- Tests in `src/**/*.test.*`
- Module contexts in `docs/implementation/module-contexts/`
- Token tracking in `docs/implementation/token-tracking.md`
- Multiple git commits (one per task)
- `.recovery-checkpoint.md` (Phase 3→4 handoff)

**Suggested Next Actions:**
```
After Implementation Agent complete:
→ /verify (start Verification Agent) [Recommended]
→ /status --quality (check quality gates)
→ /tree --visual --progress (review completion)
→ /kb add pattern (save valuable implementations)
→ /handoff --next (pause if needed)
```

**Mid-Implementation Suggestions:**
```
After each task:
→ Continue to next task [Recommended]
→ /tree --visual --progress (see remaining tasks)
→ /estimate --variance (check token efficiency)
→ /handoff --resume (pause and resume later)
```

---

### **Agent 4: Verification Agent (Phase 4)**

**Role:** QA Lead

**Input:** Completed implementation from Phase 3

**Behavior:**
1. Read implementation artifacts
2. Collect evidence package:
   a. Run full test suite
   b. Measure test coverage
   c. Run `/security scan --report`
   d. Performance benchmarking (if applicable)
   e. Accessibility checks (if web app)
   f. Ethical compliance (bias detection, GDPR)
3. Calculate token efficiency metrics (`/estimate --variance`)
4. Validate quality gates:
   - Test coverage ≥70%
   - Security: 0 critical/high issues
   - Acceptance criteria: 100% passing
5. Make GO/NO-GO decision
6. If NO-GO: document issues, return to Phase 3
7. If GO: generate handoff to Phase 5

**Skills Used:**
- `/security scan --report` - Security validation
- `/estimate --variance` - Token efficiency analysis
- `/status --quality` - Quality gate status
- `/kb search` - Check for similar issues

**Output:**
- `docs/verification/evidence-package.md`
- `docs/verification/test-results.md`
- `docs/verification/security-report.md`
- `docs/verification/performance-metrics.md`
- `docs/verification/go-no-go-decision.md`
- `.recovery-checkpoint.md` (Phase 4→5 handoff)

**Suggested Next Actions:**
```
After Verification Agent (GO decision):
→ /release (start Release Agent) [Recommended]
→ /kb add pattern (save successful patterns)
→ Review evidence: docs/verification/evidence-package.md

After Verification Agent (NO-GO decision):
→ Review issues: docs/verification/go-no-go-decision.md
→ /implement (return to Implementation Agent)
→ Fix critical issues first
→ Re-verify: /verify
```

---

### **Agent 5: Release Agent (Phase 5)**

**Role:** Release Manager

**Input:** Verified codebase from Phase 4

**Behavior:**
1. Read verification evidence package
2. Generate release package:
   a. Release notes
   b. Deployment instructions
   c. Rollback plan
   d. Performance baseline
3. Capture lessons learned:
   a. What went well
   b. What could improve
   c. Token efficiency retrospective
   d. Pattern discoveries
4. Update knowledge base:
   a. Export successful patterns (`/kb export pattern`)
   b. Document failures/learnings
   c. Update global cache
5. Generate portfolio documentation (`/portfolio`)
6. Final cleanup (optional: run cleanup.sh)
7. Create release commit
8. Generate final handoff (project complete)

**Skills Used:**
- `/kb export pattern` - Share patterns globally
- `/kb add failure` - Document lessons learned
- `/portfolio` - Generate professional docs
- `/commit --auto` - Final release commit
- `/handoff --recovery` - Final project handoff
- `/estimate --variance` - Token retrospective

**Output:**
- `docs/release/release-notes.md`
- `docs/release/deployment-guide.md`
- `docs/release/lessons-learned.md`
- `docs/release/token-retrospective.md`
- Updated knowledge base (project + global)
- Portfolio documentation (optional)
- Final git tag (e.g., `v1.0.0`)

**Suggested Next Actions:**
```
After Release Agent complete:
→ Deploy to production
→ Share knowledge: /kb export pattern [name]
→ Review retrospective: docs/release/lessons-learned.md
→ Archive project: git tag v1.0.0
→ Celebrate! 🎉

Next project:
→ Start fresh: /requirements (with learned patterns)
→ Reuse patterns: /kb search [domain]
```

---

## Implementation Phases

### **Phase 1: Foundation (Weeks 1-2)**

**Goal:** Build infrastructure and first two skills

#### **Week 1: KB Skill**

**Tasks:**
1. Create skill repository structure
   - Define directory layout for skills
   - Create skill template files
   - Setup development environment

2. Define skill.json format
   ```json
   {
     "name": "codemaestro-kb",
     "version": "1.0.0",
     "description": "Knowledge base management for CodeMaestro",
     "author": "CodeMaestro Team",
     "commands": [
       "search", "add pattern", "add failure",
       "add decision", "export", "import", "list"
     ],
     "storage": {
       "project": "docs/kb/",
       "global": "~/.claude/knowledge-base/"
     }
   }
   ```

3. Build `/kb` skill
   - Implement search (project + global)
   - Implement add pattern/failure/decision
   - Implement export/import
   - Create global cache structure
   - Build metadata.json tracking

4. Test `/kb` skill
   - Test in 3+ different projects
   - Test export/import workflow
   - Test search relevance
   - Performance testing

**Deliverables:**
- ✅ `codemaestro-kb` skill package
- ✅ Global cache structure in `~/.claude/knowledge-base/`
- ✅ Metadata tracking system
- ✅ KB skill documentation

**Success Metrics:**
- KB skill works in any project
- Export/import maintains metadata
- Search returns relevant results
- Global cache persists across sessions

---

#### **Week 2: Commit Skill + Agent Infrastructure**

**Tasks:**
1. Build `/commit` skill (CodeMaestro-specific)
   - Phase detection from `.recovery-checkpoint.md`
   - Role detection logic
   - Git diff analysis
   - KB search for similar commits
   - Commit message generation (git-commands.md templates)
   - Co-Authored-By tag formatting
   - Constraint references (A1-E33)
   - Safety checks (secrets, quality gates)

2. Create agent infrastructure
   - Define `.CodeMaestro/agents/` directory structure
   - Create agent prompt template format
   - Update `init-docs.sh` to create agents/
   - Define agent invocation mechanism

3. Update CLAUDE.md
   - Document agent architecture
   - Document skill installation
   - Document three user modes (beginner/advanced/expert)
   - Reference agents and skills

4. Documentation
   - Skill installation guide
   - Agent architecture documentation
   - "Suggested Next Actions" guidelines

**Deliverables:**
- ✅ `codemaestro-commit` skill package
- ✅ Agent infrastructure in `.CodeMaestro/agents/`
- ✅ Updated `init-docs.sh`
- ✅ Updated `CLAUDE.md`
- ✅ Agent/skill documentation

**Success Metrics:**
- Commit skill generates proper messages
- Commit skill detects phase/role correctly
- Agent directory structure created by init-docs.sh
- CLAUDE.md explains agent/skill relationship

---

### **Phase 2: Essential Skills (Weeks 3-4)**

**Goal:** Complete Tier 1 skills (scaffold, tree, generate, estimate)

#### **Week 3: Scaffold + Tree Skills**

**Tasks:**
1. Build `/scaffold` skill
   - Web domain templates:
     - Next.js 14 + TypeScript + Tailwind
     - React + Vite + TypeScript
     - Vue 3 + Vite + TypeScript
   - Mobile domain templates:
     - React Native + TypeScript + Expo
     - Flutter + Dart
   - Cloud domain templates:
     - Serverless (AWS Lambda, Vercel)
     - Microservices (Docker, Kubernetes)
   - AI domain templates:
     - PyTorch + Jupyter
     - TensorFlow + Python
   - KB integration (load saved templates)
   - Generate configs, tests, README

2. Build `/tree` skill
   - Parse blueprint.md (task DAG section)
   - Calculate dependencies
   - Calculate critical path
   - Generate visualizations:
     - Hierarchical layout
     - Force-directed graph
     - Radial layout
   - Show task status (pending/in-progress/completed)
   - Export formats (Mermaid, Graphviz, JSON)

3. Testing
   - Test each domain template
   - Test template customization
   - Test visualization layouts
   - Integration test: scaffold → tree workflow

**Deliverables:**
- ✅ `codemaestro-scaffold` skill package
- ✅ Domain-specific templates (4 domains)
- ✅ `codemaestro-tree` skill package
- ✅ Multiple visualization layouts
- ✅ Export format support

**Success Metrics:**
- Scaffold generates valid projects for each domain
- Tree visualizes dependencies correctly
- Critical path calculation accurate
- Export formats parseable by external tools

---

#### **Week 4: Generate + Estimate Skills**

**Tasks:**
1. Build `/generate` skill
   - Test generation from acceptance criteria
   - Multi-language support:
     - JavaScript/TypeScript (Jest, Vitest)
     - Python (pytest, unittest)
     - Go (go test)
     - Rust (cargo test)
   - Documentation generation (JSDoc, Sphinx, etc.)
   - Type generation (TypeScript from JSON Schema)
   - API boilerplate (REST, GraphQL)
   - Context7 integration (find examples)
   - KB integration (copy patterns)
   - Constraint A7.5 compliance (copy verified examples)

2. Build `/estimate` skill
   - Parse token estimates from blueprint
   - Track actual token usage (session-level)
   - Calculate variance (estimated vs actual)
   - Classify variance quality:
     - Excellent: <±10%
     - Good: ±10-20%
     - Needs Improvement: >±20%
   - Generate efficiency reports
   - Session budget warnings (800K limit)
   - Export reports (Markdown, JSON)

3. Integration testing
   - Test all 5 Tier 1 skills together
   - Test skill composition:
     - scaffold → tree → generate → commit
     - estimate → check budget → continue/pause
   - Performance testing (token usage measurement)

**Deliverables:**
- ✅ `codemaestro-generate` skill package
- ✅ Multi-language test generation
- ✅ `codemaestro-estimate` skill package
- ✅ Token tracking system
- ✅ Complete Tier 1 skill suite (5 skills)

**Success Metrics:**
- Generate creates valid test stubs
- Test generation follows Given/When/Then pattern
- Estimate tracks token usage accurately
- Variance calculation correct
- All 5 skills work together seamlessly

---

### **Phase 3: First Agent (Weeks 5-6)**

**Goal:** Build Planning Agent (most valuable agent)

#### **Week 5: Planning Agent Core**

**Tasks:**
1. Design Planning Agent behavior
   - Read locked specification from Phase 1
   - Domain detection logic (Web/Mobile/Cloud/AI)
   - Task decomposition algorithm
   - Dependency analysis (generate DAG)
   - Token estimation integration
   - Quality gate validation (all ACs mapped)
   - Blueprint generation format

2. Implement Planning Agent
   - Create `planning-agent.md` prompt file
   - Skill orchestration:
     - Call `/kb search` for patterns
     - Call `/scaffold` for project structure
     - Call `/tree --visual` for dependency visualization
     - Call `/estimate --total` for token budget
   - Generate outputs:
     - `docs/design/blueprint.md`
     - `docs/design/task-dag.md`
     - `docs/design/gantt.md`
     - `docs/design/token-estimates.md`
   - Generate Phase 2→3 handoff (`/handoff --next`)

3. Testing
   - Test with various project types:
     - Web app (Todo app, e-commerce, blog)
     - Mobile app (Task manager, social app)
     - Cloud service (API, microservices)
     - AI project (ML pipeline, notebook)
   - Test with different skill tiers (beginner/advanced/ninja)
   - Test error handling:
     - Missing specification
     - Invalid requirements
     - Token budget exceeded

**Deliverables:**
- ✅ `planning-agent.md` definition
- ✅ Planning Agent working end-to-end
- ✅ Blueprint generation validated
- ✅ Skill orchestration working

**Success Metrics:**
- Planning Agent generates valid blueprints
- Task DAG has correct dependencies
- Token estimates within ±20% of actual (validated later)
- Quality gates enforced (all ACs mapped)
- Handoff message contains all required sections

---

#### **Week 6: Planning Agent Polish + Handoffs**

**Tasks:**
1. Implement "Suggested Next Actions"
   - After Planning Agent completes:
     - Primary: "Start Implementation Agent"
     - Alternatives:
       - "Visualize dependencies: /tree --visual"
       - "Review token budget: /estimate --total"
       - "Customize blueprint: Edit docs/design/blueprint.md"
       - "Find patterns: /kb search [domain]"
   - Adapt suggestions to skill tier:
     - Beginner: Detailed explanations
     - Advanced: Concise options
     - Ninja: Minimal guidance

2. Build handoff system
   - Implement `/handoff` skill
   - Phase 2→3 handoff template:
     - Context summary
     - Accomplishments (Phase 2)
     - Next steps (Phase 3)
     - Critical decisions
     - File locations
     - Token metrics
     - Git state
     - Quality gate status
     - Recovery instructions
     - Model recommendations
   - Save to `.recovery-checkpoint.md`
   - Test session resume (load checkpoint, continue)

3. Documentation
   - Planning Agent user guide
   - How to customize blueprints
   - How to interpret task DAG
   - Handoff message format reference
   - Video walkthrough (screen recording)

**Deliverables:**
- ✅ Planning Agent with "Suggested Next Actions"
- ✅ `/handoff` skill package
- ✅ Handoff system working (save/load)
- ✅ Complete documentation
- ✅ Video tutorial

**Success Metrics:**
- "Suggested Next Actions" provide value (user feedback)
- Handoff message contains all required information
- Session resume works correctly (reload checkpoint)
- Users understand how to proceed after planning

---

### **Phase 4: Implementation Agent (Weeks 7-8)**

**Goal:** Build Implementation Agent (core development automation)

#### **Week 7: Implementation Agent Core**

**Tasks:**
1. Design Implementation Agent behavior
   - Read blueprint and task DAG
   - Load architectural patterns from `/kb`
   - Task loop algorithm:
     - Select next task (respect dependencies)
     - Check token budget (`/estimate --budget`)
     - Search `/kb` for implementations
     - Implement task (copy patterns, not hallucinate)
     - Generate tests (`/generate test`)
     - Run tests (iterate until passing)
     - Security scan (`/security scan` if deps changed)
     - Create module context document
     - Commit (`/commit --auto`)
     - Update progress
     - Check quality gates
   - Handle errors (test failures, build errors)
   - Mid-session pause/resume support

2. Implement Implementation Agent
   - Create `implementation-agent.md` prompt file
   - Skill orchestration:
     - `/kb search` - Find patterns
     - `/generate test` - Create tests
     - `/commit --auto` - Commit after tasks
     - `/security scan` - Check vulnerabilities
     - `/estimate --budget` - Track tokens
     - `/status --tasks` - Track progress
   - Generate outputs:
     - Production code in `src/`
     - Tests in `src/**/*.test.*`
     - Module contexts in `docs/implementation/module-contexts/`
     - Token tracking in `docs/implementation/token-tracking.md`
     - Multiple commits (one per task)
   - Generate Phase 3→4 handoff

3. Testing
   - Small projects (5-10 tasks)
   - Medium projects (20-30 tasks)
   - Test error recovery:
     - Test failures → fix → re-test
     - Build errors → fix → rebuild
     - Security issues → update deps → re-scan
   - Test pause/resume (mid-implementation)
   - Test quality gate enforcement

**Deliverables:**
- ✅ `implementation-agent.md` definition
- ✅ Implementation Agent working end-to-end
- ✅ Task execution loop validated
- ✅ Error recovery working

**Success Metrics:**
- Implementation Agent completes tasks correctly
- Tests generated and passing
- Commits follow conventions
- Quality gates enforced
- Pause/resume works correctly

---

#### **Week 8: Implementation Agent Polish + Security Skill**

**Tasks:**
1. Build `/security` skill
   - Multi-ecosystem support:
     - npm: `npm audit`
     - Python: `pip-audit` or `safety check`
     - Rust: `cargo audit`
     - Go: `govulncheck`
     - Ruby: `bundle audit`
   - Severity filtering (critical, high, medium, low)
   - Quality gate enforcement (0 critical/high)
   - Generate security reports
   - Suggest fixes (update commands)

2. Implement "Suggested Next Actions"
   - After each task:
     - Primary: "Continue to next task"
     - Alternatives:
       - "Check progress: /tree --visual --progress"
       - "Check token usage: /estimate --variance"
       - "Pause: /handoff --resume"
   - After module complete:
     - Primary: "Continue to next module"
     - Alternatives:
       - "Run tests: npm test"
       - "Commit module: /commit --auto"
       - "Check security: /security scan"
   - After implementation complete:
     - Primary: "Start Verification Agent"
     - Alternatives:
       - "Check quality: /status --quality"
       - "Review code: Read docs/implementation/module-contexts/"
       - "Save patterns: /kb add pattern [name]"

3. Integration testing
   - Test Planning → Implementation flow
   - Test handoff between agents (checkpoint save/load)
   - Test skill composition throughout implementation
   - Test token budget enforcement (pause if exceeded)
   - Performance testing (large projects)

**Deliverables:**
- ✅ `codemaestro-security` skill package
- ✅ Multi-ecosystem vulnerability scanning
- ✅ Implementation Agent with "Suggested Next Actions"
- ✅ Complete Planning → Implementation pipeline
- ✅ Integration test suite

**Success Metrics:**
- Security skill detects vulnerabilities correctly
- Quality gate enforcement prevents proceeding with issues
- "Suggested Next Actions" guide users effectively
- Planning → Implementation flow seamless
- Token budget respected (pause if exceeded)

---

### **Phase 5: Complete Agent Chain (Weeks 9-10)**

**Goal:** Build remaining agents (Requirements, Verification, Release)

#### **Week 9: Support Skills + Verification Agent**

**Tasks:**
1. Build `/status` skill (already defined in Skills Overview)
   - Parse `.recovery-checkpoint.md` for state
   - Parse blueprint for task status
   - Check quality gate status
   - Check token usage
   - Generate concise status report

2. Build Verification Agent
   - Create `verification-agent.md` prompt file
   - Evidence collection:
     - Run full test suite
     - Measure test coverage
     - Run `/security scan --report`
     - Performance benchmarking (if applicable)
     - Accessibility checks (WCAG, if web)
     - Ethical compliance (bias, GDPR)
   - Calculate token efficiency (`/estimate --variance`)
   - Validate quality gates:
     - Test coverage ≥70%
     - Security: 0 critical/high
     - Acceptance criteria: 100% passing
   - GO/NO-GO decision logic
   - If NO-GO: document issues, return to Phase 3
   - If GO: generate Phase 4→5 handoff

3. Testing
   - Test with passing projects (GO decision)
   - Test with failing projects (NO-GO decision)
   - Test quality gate enforcement
   - Test evidence package completeness
   - Test ethical compliance checks

**Deliverables:**
- ✅ `codemaestro-status` skill package
- ✅ `verification-agent.md` definition
- ✅ Verification Agent working
- ✅ Evidence package format validated
- ✅ GO/NO-GO decision logic tested

**Success Metrics:**
- Verification Agent correctly validates quality gates
- GO decision only when all gates pass
- NO-GO provides clear issue list
- Evidence package complete and useful
- Ethical checks catch compliance issues

---

#### **Week 10: Requirements + Release Agents**

**Tasks:**
1. Build Requirements Agent
   - Create `requirements-agent.md` prompt file
   - Clarifying questions (interactive)
   - Skill tier detection (beginner/advanced/ninja)
   - Competitive analysis:
     - WebSearch for similar products
     - Context7 for technology research
     - `/kb search` for similar projects
   - Requirements deconstruction
   - Generate locked specification
   - Validate completeness
   - Generate Phase 1→2 handoff

2. Build Release Agent
   - Create `release-agent.md` prompt file
   - Release package generation:
     - Release notes (changelog)
     - Deployment instructions
     - Rollback plan
     - Performance baseline
   - Lessons learned capture:
     - What went well
     - What could improve
     - Token efficiency retrospective
     - Pattern discoveries
   - Knowledge base updates:
     - `/kb export pattern` - Share globally
     - `/kb add failure` - Document lessons
     - Update global cache
   - Portfolio generation (`/portfolio`)
   - Optional cleanup (cleanup.sh)
   - Final release commit
   - Git tag (e.g., v1.0.0)

3. Build `/portfolio` skill
   - Generate professional documentation:
     - Project overview
     - Architecture diagrams
     - API documentation
     - Performance metrics
     - Test coverage reports
   - Export formats (PDF, HTML, Markdown)
   - Integration with Release Agent

4. Testing
   - Test complete Phase 1→5 workflow
   - Test all agent handoffs
   - Test KB export/import in Release
   - Test portfolio generation

**Deliverables:**
- ✅ `requirements-agent.md` definition
- ✅ Requirements Agent working
- ✅ `release-agent.md` definition
- ✅ Release Agent working
- ✅ `codemaestro-portfolio` skill package
- ✅ **Complete Phase 1-5 agent chain**

**Success Metrics:**
- Requirements Agent generates locked spec
- Release Agent captures lessons learned
- KB exports to global cache correctly
- Portfolio generation produces professional docs
- Complete workflow (Phase 1→5) works end-to-end

---

### **Phase 6: Polish & Launch (Weeks 11-12)**

**Goal:** Testing, documentation, and public release

#### **Week 11: End-to-End Testing**

**Tasks:**
1. Full lifecycle testing
   - Run complete Phase 1→5 workflow on real projects:
     - Project 1: Web app (e-commerce site)
     - Project 2: Mobile app (task manager)
     - Project 3: Cloud service (REST API)
     - Project 4: AI project (ML pipeline)
   - Test all agent handoffs at checkpoints
   - Test skill composition patterns
   - Test three user modes:
     - Beginner: Follow agents only
     - Advanced: Mix agents and skills
     - Expert: Use skills directly

2. Performance optimization
   - Measure token usage across all phases
   - Optimize skill prompts (reduce tokens)
   - Optimize agent prompts (reduce tokens)
   - Validate 50-55% token reduction target (vs v1.0)
   - Identify bottlenecks
   - Optimize slow operations

3. Bug fixes
   - Fix issues found in testing
   - Edge case handling:
     - Missing files
     - Invalid input
     - Token budget exceeded
     - Network failures (WebSearch, Context7)
   - Error message improvements (clearer, more actionable)
   - Recovery from failures (graceful degradation)

**Deliverables:**
- ✅ Tested and validated agent chain
- ✅ Performance benchmarks (token usage)
- ✅ Bug fix log (all issues resolved)
- ✅ Edge case handling validated

**Success Metrics:**
- Complete Phase 1→5 workflow works on 4 diverse projects
- Token usage meets 50-55% reduction target
- All critical bugs fixed
- Edge cases handled gracefully
- User feedback positive (internal testing)

---

#### **Week 12: Documentation & Launch**

**Tasks:**
1. Documentation
   - User guide:
     - Beginner path (agent-guided)
     - Advanced path (mix agents and skills)
     - Expert path (skills-only)
   - Migration guide:
     - From v1.0 (prompt-based) to v2.0 (agent-based)
     - How to convert existing projects
     - What's different, what's the same
   - Skill reference documentation (all 9 skills)
   - Agent reference documentation (all 5 agents)
   - Video tutorials:
     - "Getting Started with CodeMaestro 2.0"
     - "Using Skills Directly"
     - "Understanding Agents"
     - "Complete Project Walkthrough"

2. Installation tooling
   - Create skill installation script:
     ```bash
     # Install all CodeMaestro skills
     ./install-skills.sh

     # Or individually
     claude-code install skill codemaestro-kb
     claude-code install skill codemaestro-commit
     # etc.
     ```
   - Update `init-docs.sh` for agents:
     - Create `.CodeMaestro/agents/` directory
     - Copy agent definitions
     - Create sample `.recovery-checkpoint.md`
   - Create `codemaestro` CLI command:
     ```bash
     codemaestro init           # Initialize project
     codemaestro install-skills  # Install all skills
     codemaestro version        # Show version
     codemaestro help           # Show help
     ```
   - Test installation on fresh systems (Mac, Linux, Windows)

3. Beta testing
   - Recruit 10-20 beta testers
   - Provide onboarding session
   - Collect feedback:
     - Usability
     - Bugs
     - Feature requests
     - Documentation clarity
   - Iterate based on feedback (1-2 rounds)

4. Launch preparation
   - Final testing pass
   - Release notes (changelog)
   - Marketing materials (announcement, demo video)
   - GitHub repository setup (public)
   - Documentation site (GitHub Pages or custom)

5. Public release
   - Publish to GitHub
   - Announce on social media, forums
   - Monitor for issues
   - Provide support (Discord, GitHub Issues)

**Deliverables:**
- ✅ Complete documentation (all formats)
- ✅ Installation scripts (automated)
- ✅ Beta testing report (feedback incorporated)
- ✅ Video tutorials (published)
- ✅ Public GitHub repository
- ✅ **CodeMaestro v2.0 (Agent Edition) released**

**Success Metrics:**
- Documentation clear (beta testers confirm)
- Installation works on all platforms
- Beta testers successfully complete projects
- Video tutorials viewed and helpful
- Public launch generates interest
- Community engagement (stars, forks, issues)

---

## Resource Requirements

### **Team Structure**

**Developer 1: Skills Lead**
- Weeks 1-4: Build all skills (9 total)
- Weeks 5-10: Support agent integration, skill refinements
- Weeks 11-12: Bug fixes, optimization

**Developer 2: Agents Lead**
- Weeks 1-2: Agent infrastructure design
- Weeks 3-10: Build all agents (5 total)
- Weeks 11-12: End-to-end testing, bug fixes

**Developer 3: Infrastructure Lead**
- Weeks 1-2: KB storage system, global cache
- Weeks 3-4: Skill packaging, distribution
- Weeks 5-8: Agent orchestration, handoff system
- Weeks 9-10: Integration testing
- Weeks 11-12: Installation tooling, deployment

**Technical Writer / Designer**
- Weeks 1-10: Documentation (ongoing)
- Weeks 11: Video tutorials
- Week 12: Launch materials

### **Tools & Technologies**

**Development:**
- Claude Code (testing environment)
- Claude Agent SDK (agent framework)
- Git (version control)
- VS Code (IDE)

**Testing:**
- Multiple test projects (web, mobile, cloud, AI)
- Token usage monitoring
- Performance profiling

**Documentation:**
- Markdown (documentation format)
- Mermaid (diagrams)
- Screen recording software (video tutorials)
- GitHub Pages (documentation site)

**Distribution:**
- GitHub (repository)
- npm (if packaging skills as npm modules)
- Homebrew (if creating CLI tool)

### **Timeline Summary**

| Phase | Duration | Key Deliverables | Owner |
|-------|----------|------------------|-------|
| Phase 1: Foundation | Weeks 1-2 | KB skill, commit skill, agent infrastructure | Dev 1, Dev 3 |
| Phase 2: Essential Skills | Weeks 3-4 | Scaffold, tree, generate, estimate skills | Dev 1 |
| Phase 3: First Agent | Weeks 5-6 | Planning Agent, handoff system | Dev 2, Dev 3 |
| Phase 4: Implementation Agent | Weeks 7-8 | Implementation Agent, security skill | Dev 1, Dev 2 |
| Phase 5: Complete Chain | Weeks 9-10 | All 5 agents, status skill, portfolio skill | Dev 1, Dev 2 |
| Phase 6: Launch | Weeks 11-12 | Testing, documentation, public release | All team |

**Total Duration:** 12 weeks (3 months)

### **Budget Estimate**

**Personnel (3 developers + 1 writer, 12 weeks):**
- Developers: ~$60K-$80K each x 3 = $180K-$240K
- Technical Writer: ~$30K-$40K
- **Total Personnel:** ~$210K-$280K

**Tools & Services:**
- Claude API usage (testing): ~$1K-$2K
- Infrastructure (hosting, domains): ~$500
- Screen recording / design tools: ~$500
- **Total Tools:** ~$2K-$3K

**Contingency (20%):** ~$42K-$57K

**Total Budget:** ~$254K-$340K

**Note:** Budget assumes full-time contractors for 12 weeks. Adjust for part-time or different compensation structures.

---

## Success Metrics

### **Technical Metrics**

**Skills:**
- ✅ All 9 core skills working independently
- ✅ Skills work across any project (not just CodeMaestro)
- ✅ KB export/import working correctly
- ✅ Skill composition working (skills call other skills)

**Agents:**
- ✅ All 5 agents orchestrating correctly
- ✅ Agent handoffs working at all checkpoints
- ✅ Agents use skills internally (not duplicating logic)
- ✅ Phase transitions seamless

**Token Efficiency:**
- ✅ 50-55% token reduction maintained (vs v1.0 prompt-based)
- ✅ Token estimates accurate (±20% variance)
- ✅ Session budget respected (800K limit)

**Quality:**
- ✅ Quality gates enforced (test coverage, security, acceptance criteria)
- ✅ Anti-hallucination philosophy maintained (copy, don't create)
- ✅ All outputs follow CodeMaestro conventions

---

### **User Experience Metrics**

**Beginner Mode (Agent-Guided):**
- ✅ Users can complete Phase 1-5 workflow with agents
- ✅ "Suggested Next Actions" provide clear guidance
- ✅ Users understand what to do next at each step

**Advanced Mode (Hybrid):**
- ✅ Users can mix agents and skills as needed
- ✅ Users can customize blueprints and resume with agents
- ✅ Users can skip agents and use skills directly

**Expert Mode (Skills-Only):**
- ✅ Users can use skills standalone without agents
- ✅ Skills provide enough value independently
- ✅ Users can compose their own workflows

**Migration (v1.0 → v2.0):**
- ✅ Migration guide clear and complete
- ✅ Existing projects can migrate smoothly
- ✅ Users understand differences between versions

---

### **Adoption Metrics**

**Beta Testing (Weeks 11-12):**
- ✅ 10-20 beta users recruited
- ✅ Beta users successfully use at least 3 skills
- ✅ Beta users complete at least one full agent workflow
- ✅ Positive feedback (>80% satisfied)

**Post-Launch (First 3 months):**
- ✅ GitHub stars: 500+
- ✅ Projects using CodeMaestro: 100+
- ✅ KB accumulates patterns (proof of cross-project learning)
- ✅ Community contributions (issues, PRs, new templates)
- ✅ Documentation site traffic: 1K+ unique visitors/month

**Long-Term (First year):**
- ✅ 1K+ GitHub stars
- ✅ 500+ projects using CodeMaestro
- ✅ Community-maintained skill extensions
- ✅ Case studies / success stories published

---

## Risk Mitigation

### **Risk 1: Skills Don't Work Across Projects**

**Probability:** Medium
**Impact:** High

**Mitigation:**
- Test each skill in 3+ different project types early (Week 1-4)
- Design skills to be project-agnostic
- Store project-specific data in standard locations (docs/kb/, etc.)

**Fallback:**
- Make skills project-aware (detect CodeMaestro vs non-CodeMaestro projects)
- Provide graceful degradation (fewer features if not CodeMaestro project)

**Monitoring:**
- Track skill success rate across different project types
- Collect user feedback on cross-project usage

---

### **Risk 2: Agent Orchestration Too Complex**

**Probability:** Medium
**Impact:** High

**Mitigation:**
- Start with simplest agent (Planning) in Week 5
- Validate orchestration logic before building more agents
- Keep agent prompts focused (use skills for heavy lifting)
- Test handoffs extensively

**Fallback:**
- Focus on skills-only if agents prove too complex
- Simplify agent behavior (fewer features, clearer flow)
- Provide manual mode (users invoke skills instead of agents)

**Monitoring:**
- Measure agent success rate (complete Phase 1-5)
- Track where users get stuck (handoffs? errors?)
- Collect user feedback on agent UX

---

### **Risk 3: KB Storage Conflicts**

**Probability:** Low
**Impact:** Medium

**Mitigation:**
- Clear documentation on project vs global KB
- Metadata tracking (source project, export date, etc.)
- Conflict resolution strategy (project KB wins)
- Test export/import extensively (Week 1)

**Fallback:**
- Global cache is optional (project KB sufficient alone)
- Warn users before overwriting patterns
- Provide diff/merge tools (future enhancement)

**Monitoring:**
- Track KB usage patterns (project vs global)
- Monitor for reported conflicts
- Collect feedback on KB UX

---

### **Risk 4: Token Usage Exceeds Budget**

**Probability:** Medium
**Impact:** High

**Mitigation:**
- Continuously monitor with `/estimate` skill
- Set session budget (800K tokens, 80% of 1M context)
- Warn users when approaching budget
- Optimize prompts throughout development
- Test with large projects (Week 11)

**Fallback:**
- Simplify agent prompts (less context, more focused)
- Move more logic to skills (lower token cost)
- Recommend pausing/resuming sessions
- Use cheaper models for simple tasks (Haiku)

**Monitoring:**
- Track token usage per phase
- Measure token reduction (vs v1.0 target: 50-55%)
- Identify token-heavy operations

---

### **Risk 5: User Confusion (Agents vs Skills)**

**Probability:** Medium
**Impact:** Medium

**Mitigation:**
- Clear onboarding (Week 12 documentation)
- Video tutorials showing both modes
- Guided first-run experience
- Default to agent-guided mode for beginners
- Skill tier detection (adapt communication style)

**Fallback:**
- Simplify messaging (focus on one mode)
- Provide decision tree ("Should I use agents or skills?")
- In-app help/tooltips
- Community support (Discord, forums)

**Monitoring:**
- Track which mode users choose (agent vs skill)
- Monitor support requests (confusion indicators)
- Collect feedback on clarity

---

### **Risk 6: Commit Skill Not as Good as commit-commands**

**Probability:** Low
**Impact:** Low

**Mitigation:**
- Study commit-commands plugin behavior (Week 2)
- Match feature parity where applicable
- Add CodeMaestro-specific enhancements
- Test extensively (Week 2-3)
- Collect user feedback (beta testing)

**Fallback:**
- If users prefer commit-commands, create wrapper instead
- Provide both options (use commit-commands OR codemaestro-commit)
- Document differences clearly

**Monitoring:**
- Track commit skill usage
- Compare against commit-commands (if users have both)
- Collect feedback on commit quality

---

### **Risk 7: Agent Performance Slow**

**Probability:** Low
**Impact:** Medium

**Mitigation:**
- Optimize agent prompts (concise, focused)
- Use skills for heavy operations (offload logic)
- Profile performance (Week 11)
- Use faster models for simple tasks (Haiku)

**Fallback:**
- Parallelize operations where possible
- Cache expensive computations
- Provide "quick mode" with fewer features

**Monitoring:**
- Measure agent execution time
- Identify slow operations
- Collect user feedback on speed

---

### **Risk 8: Documentation Unclear**

**Probability:** Low
**Impact:** Medium

**Mitigation:**
- Iterative documentation (ongoing Weeks 1-12)
- Beta testing specifically for documentation (Week 12)
- Video tutorials supplement written docs
- Examples for each skill and agent
- Community feedback loop

**Fallback:**
- Hire technical writer consultant
- Community-contributed docs
- Live demos / webinars
- FAQ based on common questions

**Monitoring:**
- Track documentation site analytics
- Monitor support requests (indicators of unclear docs)
- Collect feedback on clarity

---

## Next Steps

### **Immediate Actions (Week 1, Day 1-5)**

**Day 1:**
1. ✅ Set up skill repository structure
2. ✅ Define skill.json format
3. ✅ Create skill template files

**Day 2:**
4. Start building `/kb` skill
5. Implement KB search (project-only, no global cache yet)
6. Test basic search functionality

**Day 3:**
7. Implement KB add pattern/failure/decision
8. Test adding entries to project KB
9. Validate directory structure creation

**Day 4:**
10. Implement global cache (`~/.claude/knowledge-base/`)
11. Implement export/import between project and global
12. Create metadata.json tracking system

**Day 5:**
13. Test `/kb` skill in 3+ different projects
14. Test export/import workflow
15. Fix bugs, optimize search relevance
16. Document `/kb` skill usage

---

### **First Milestone (End of Week 2)**

**Deliverables:**
- ✅ `/kb` skill working (project + global cache)
- ✅ `/commit` skill working (CodeMaestro-specific)
- ✅ Agent infrastructure created (`.CodeMaestro/agents/`)
- ✅ `init-docs.sh` updated
- ✅ CLAUDE.md updated

**Success Criteria:**
- KB skill works in any project
- Commit skill generates proper messages
- Agent directory structure ready
- Documentation updated

**Next Phase:** Begin Scaffold + Tree skills (Week 3)

---

### **Key Checkpoints**

| Checkpoint | Week | Validation |
|------------|------|------------|
| KB + Commit skills working | Week 2 | Test in 3+ projects |
| All Tier 1 skills complete | Week 4 | Integration test (scaffold → tree → generate → commit) |
| Planning Agent working | Week 6 | Generate valid blueprint for test project |
| Implementation Agent working | Week 8 | Complete 20-task project end-to-end |
| All 5 agents complete | Week 10 | Run Phase 1→5 on test project |
| Beta ready | Week 11 | Successful testing on 4 diverse projects |
| Public launch | Week 12 | Documentation complete, installation tested |

---

### **Communication Plan**

**Internal (Team):**
- Daily standups (15 min)
- Weekly demos (show progress)
- Bi-weekly retrospectives (what's working, what's not)
- Shared Slack/Discord channel

**External (Community):**
- Weekly blog posts (development updates)
- GitHub Discussions (community feedback)
- Social media teasers (screenshots, videos)
- Beta tester feedback loop (surveys, interviews)

---

### **Post-Launch Support**

**First Month:**
- Monitor GitHub Issues (respond within 24 hours)
- Community Discord server (real-time support)
- Weekly bug fix releases (if needed)
- Collect usage data (anonymous metrics)

**First Quarter:**
- Monthly feature releases
- Community contributions (review PRs)
- Case studies (publish success stories)
- Documentation improvements (based on common questions)

**First Year:**
- Quarterly major releases
- Skill extensions (community-contributed)
- Agent customization (user-defined agents)
- Enterprise features (team collaboration, private KB)

---

## Conclusion

This implementation plan provides a **clear roadmap** to migrate CodeMaestro v1.0 (prompt-based) to v2.0 (hybrid architecture with agents and skills).

**Key Takeaways:**

1. **Hybrid architecture** provides flexibility for all user skill levels
2. **Skills are portable** - install once, use everywhere
3. **Agents orchestrate workflows** - guide beginners through best practices
4. **Project-first KB** with optional global cache balances team collaboration and personal learning
5. **12-week timeline** is aggressive but achievable with focused team
6. **Suggested Next Actions** make the system proactive and helpful
7. **CodeMaestro-specific commit skill** provides better integration than generic tools

**Success depends on:**
- Clear documentation (ongoing, Week 1-12)
- Extensive testing (integration tests, beta testing)
- User feedback (iterate based on real usage)
- Token optimization (maintain 50-55% reduction)
- Anti-hallucination philosophy (copy, don't create)

**Ready to begin!** 🚀

---

## Appendix

### **A. Skill.json Format**

```json
{
  "name": "codemaestro-[skill-name]",
  "version": "1.0.0",
  "description": "Brief description of skill purpose",
  "author": "CodeMaestro Team",
  "license": "MIT",
  "commands": [
    "command1",
    "command2 --flag"
  ],
  "storage": {
    "project": "docs/[skill-data]/",
    "global": "~/.claude/knowledge-base/[skill-data]/"
  },
  "dependencies": {
    "skills": ["other-skill-name"],
    "tools": ["git", "npm"]
  },
  "configuration": {
    "setting1": "default-value",
    "setting2": "default-value"
  }
}
```

---

### **B. Agent Prompt Template**

```markdown
# [Agent Name] (Phase [N])

## Role
[Product Manager / Software Architect / Senior Developer / QA Lead / Release Manager]

## Input
- [What this agent expects as input]
- [Files to read, prerequisites]

## Behavior
1. [Step-by-step workflow]
2. [What the agent does]
3. [How it uses skills]
4. [Error handling]
5. [Output generation]

## Skills Used
- `/skill1` - [Purpose]
- `/skill2` - [Purpose]

## Output
- [Files created]
- [Artifacts generated]
- [Handoff message]

## Quality Gates
- [Gate 1: Criteria]
- [Gate 2: Criteria]

## Suggested Next Actions
After completion:
→ Primary: [Most common next step]
→ Alternative 1: [Another option]
→ Alternative 2: [Another option]

## Recovery
If session interrupted:
1. [How to resume]
2. [What state to check]
3. [Where to continue]

## Anti-Hallucination Reminders
- Copy verified examples (Context7, /kb)
- Don't invent new patterns (search first)
- Follow constraint A7.5 (API validation)
- Reference similar projects in /kb
```

---

### **C. Handoff Message Template**

```markdown
# Phase [N] → Phase [N+1] Handoff

## Context Summary
- Project: [name]
- Phase: [N] → [N+1]
- Skill Tier: [Beginner/Advanced/Ninja]
- [Key context]

## Accomplishments (Phase [N])
✅ [What was completed]
✅ [What was created]

## Next Steps (Phase [N+1])
1. [What to do first]
2. [What to do next]

## Critical Decisions
- [Decision 1 and rationale]
- [Decision 2 and rationale]

## Files Created/Modified
- [File 1: Purpose]
- [File 2: Purpose]

## Token Metrics
- Phase [N] used: [X]K tokens (estimated: [Y]K, variance: [Z]%)
- Phase [N+1] budget: [X]K tokens
- Session remaining: [X]K tokens ([Y]%)

## Git State
- Branch: [branch-name]
- Last commit: "[commit-message]"
- Uncommitted: [status]
- Remote: [synced/ahead/behind]

## Quality Gates
✅/❌ [Gate 1: Status]
✅/❌ [Gate 2: Status]

## Recovery Instructions
If session ends, resume with:
1. Read: [file]
2. Start: [command/agent]
3. Or: [alternative approach]

## Model Recommendations
- Phase [N+1]: [Sonnet/Opus/Haiku] ([rationale])

## Suggested Next Actions
→ [Primary next step] [Recommended]
→ [Alternative 1]
→ [Alternative 2]
```

---

### **D. Test Project Ideas**

**Project 1: Todo App (Web)**
- Domain: Web
- Framework: Next.js 14 + TypeScript + Tailwind
- Features: User auth, CRUD, filtering, due dates
- Complexity: Low (good for initial testing)

**Project 2: Task Manager (Mobile)**
- Domain: Mobile
- Framework: React Native + TypeScript + Expo
- Features: Offline-first, sync, notifications, categories
- Complexity: Medium (tests mobile-specific workflows)

**Project 3: REST API (Cloud)**
- Domain: Cloud
- Framework: Node.js + Express + PostgreSQL
- Features: Authentication, rate limiting, caching, monitoring
- Complexity: Medium (tests backend patterns)

**Project 4: ML Pipeline (AI)**
- Domain: AI
- Framework: Python + PyTorch + Jupyter
- Features: Data preprocessing, model training, evaluation, deployment
- Complexity: High (tests AI-specific workflows)

---

### **E. References**

**Internal Documents:**
- [CLAUDE.md](../../../CLAUDE.md) - Developer guide
- [.CodeMaestro/prompts/00-core.md](../prompts/00-core.md) - Core system configuration
- [.CodeMaestro/config/CONFIG-QUICK-REFERENCE.md](../config/CONFIG-QUICK-REFERENCE.md) - Config index
- [.CodeMaestro/config/anti-hallucination-guide.md](../config/anti-hallucination-guide.md) - Core philosophy
- [.CodeMaestro/config/git-commands.md](../config/git-commands.md) - Git templates
- [.CodeMaestro/config/constraints-reference.md](../config/constraints-reference.md) - Constraints (A1-E33)

**External Resources:**
- Claude Code documentation
- Claude Agent SDK documentation
- Claude API documentation (tool use, prompting)

---

**End of Implementation Plan**

**Version:** 1.0
**Last Updated:** 2026-01-20
**Status:** Ready for Execution ✅
