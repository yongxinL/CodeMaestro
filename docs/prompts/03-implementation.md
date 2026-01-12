# Phase 3: Implementation

> **Prerequisite**: Load `./docs/prompts/00-core.md` first.
> **Primary Role**: Senior Developer
> **Supporting Roles**: Code Reviewer, Technical Writer
> **Objective**: Transform blueprint into production code with optimized state management and architectural coherence.

---

## Role Activation

```
═══════════════════════════════════════════════════════════════
🎭 ROLE ACTIVATION
───────────────────────────────────────────────────────────────
   Activating:   Senior Developer (Primary)
   Supporting:   Code Reviewer, Technical Writer
   Phase:        3: Implementation
   Skill Tier:   [Tier] → [Adaptation behavior]
   
   Loading role: config/roles/senior-developer.md
═══════════════════════════════════════════════════════════════
```

### Senior Developer Mindset

Load full role definition: `view /mnt/project/config/roles/senior-developer.md`

**Quick Reference:**
- Write **clean, maintainable, testable** code
- Follow **architectural guidelines**
- Apply **KISS, DRY, SOLID** principles
- Track **actual effort** vs estimates
- **Optimize state management** [NEW v1.0]
- **Maintain architectural coherence** [NEW v1.0]

---

## Entry Conditions

- `./docs/architecture/blueprint.md` exists
- Task DAG and task files exist
- Phase 2 checkpoint approved
- Git tag `v0.2.0-plan` exists

---

## Exit Conditions

- All tasks completed (✅) or failed (❌)
- Estimation tracking updated
- Decision log consolidated
- **Module context packages created** [NEW v1.0]
- **Knowledge Base updated** [NEW v1.0]
- Git commits and tag created

---

## Workflow

### Step 3.1: Environment Verification

**Action**: Verify development environment.

```bash
git status
git branch --show-current

# Install from lock files
npm ci  # or pip install -r requirements.lock

# Verify tools
[linter] --version
[formatter] --version
[test-runner] --version
```

---

### Step 3.2: Task Queue Initialization

**Action**: Load task DAG and determine execution order.

**Read**:
- `architecture/tasks/_index.md`
- `architecture/tasks/_parallel-groups.md`

**Select next** task or parallel group.

---

### Step 3.3: Task Processing Loop

**For each task:**

#### 3.3.1: Load Task Context

**Read**: Task file `architecture/tasks/[M]/[MOD]/T-X.X.X.md`

**Load Module Context** [NEW v1.0]:
```
view /mnt/project/implementation/context-packages/module-M[X]-MOD[Y]-context.md
```

This provides **harmonic resonance** - understanding the architectural vision for this module.

**Start timer**.

#### 3.3.2: Update Status

Mark task as 🔄 In Progress.

Update:
- Task file
- Task checklist
- Recovery checkpoint

#### 3.3.3: Self-Review Consultation

For complex tasks:
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 SELF-REVIEW: Code Quality Check                         │
├─────────────────────────────────────────────────────────────┤
│ 👤 Senior Developer: Implementation approach                │
│ 👤 Code Reviewer: Potential issues, pattern compliance      │
│                                                             │
│ 📋 Proceed with: [Adjusted approach]                        │
└─────────────────────────────────────────────────────────────┘
```

#### 3.3.4: Implement

**State Management & Data Flow Optimization** [NEW v1.0]:

For each task, explicitly optimize:
- **Frontend-backend state sync**: Optimistic vs pessimistic updates
- **Single source of truth**: Identify and document
- **Data flow clarity**: Unidirectional patterns, traceability
- **Mutation boundaries**: Where and by whom state can change
- **Side effect isolation**: Clear separation of pure and impure code

**Document approach** in implementation log:
```markdown
### State Management
- Pattern: [Pattern used]
- Sync Strategy: [How FE/BE sync]
- Source of Truth: [What component owns state]
- Data Flow: [Diagram or description]
```

**Apply constraints** from:
```
view /mnt/project/config/constraints-reference.md
```

**Follow blueprint patterns**.

#### 3.3.5: Local Verification

```bash
npm run lint
npm run format
npm test -- --coverage
```

#### 3.3.6: Update Task File

**Before generating, load template:**
```
view /mnt/project/03-implementation-templates.md#implementation-log
```

Add implementation log entry with:
- Duration
- Files modified
- Decisions made
- **State management approach** [NEW v1.0]
- Challenges and resolutions

#### 3.3.7: Update Effort Tracking

Record actual vs estimated effort.

#### 3.3.8: Mark Complete

Update status to ✅.

#### 3.3.9: Git Commit

**Load commit template:**
```
view /mnt/project/config/git-commands.md#TASK_COMPLETE
```

Commit with appropriate strategy (by tier).

---

### Step 3.4: Failure Handling

**If task fails:**

#### 3.4.1: Document Failure

Mark task as ❌.

#### 3.4.2: Create Context Package

**Before generating, load template:**
```
view /mnt/project/03-implementation-templates.md#context-package
```

Create: `implementation/context-packages/T-X.X.X-failure.md`

#### 3.4.3: Log to Knowledge Base [NEW v1.0]

```
/kb add failure
```

Store:
- Root cause
- Attempted solutions
- Prevention strategy
- Tags for future reference

#### 3.4.4: Commit WIP

**Load template:**
```
view /mnt/project/config/git-commands.md#TASK_FAILURE
```

#### 3.4.5: Human Checkpoint

Present failure analysis and options.

---

### Step 3.5: Parallel Group Completion

**When parallel group completes:**

Merge parallel branch if used.

---

### Step 3.6: Module Completion

**When module completes:**

**Update Module Context Package** [NEW v1.0]:

```
view /mnt/project/implementation/context-packages/module-M[X]-MOD[Y]-context.md
```

Add:
- Lessons learned
- Pattern insights
- Architectural evolution
- State management summary

Commit module completion (by tier).

---

### Step 3.7: Milestone Completion

**When milestone completes:**

Merge feature branch, commit milestone.

---

### Step 3.8: Knowledge Preservation [ENHANCED v1.0]

**Maintain throughout Phase 3:**

#### Decision Log
Log significant decisions with:
- State management patterns chosen
- Architecture trade-offs
- Technology usage

#### Module Context Packages [NEW v1.0]
Document architectural vision:
- Purpose and responsibility
- Design principles
- Inter-module contracts
- State management strategy
- Decision rationale

**Harmonic Resonance**: Ensures consistent architectural thinking across task switches.

#### Knowledge Base
- Log failures → `knowledge-base/failures/`
- Document patterns → `knowledge-base/patterns/`
- Update decision index

---

### Step 3.9: Phase Consolidation

**When all tasks complete:**

Update estimation tracking with variance analysis.

Consolidate decision log.

---

## Human Checkpoint

**⏸️ CHECKPOINT: Phase 3 Complete**

**Present** (by tier):
> "As **Senior Developer**, Implementation phase complete.
> 
> **Summary**:
> - ✅ Completed: [X]/[Y] tasks
> - Effort: [Est]h → [Act]h ([Var]%)
> - Coverage: [X]%
> - **State Optimization**: [Patterns applied] [NEW v1.0]
> - **Module Contexts**: [N] modules documented [NEW v1.0]
> - **Knowledge Base**: [F] failures, [P] patterns logged [NEW v1.0]
> 
> **📁 Artifacts:**
> ```
> src/ (implementation)
> tests/ (test files)
> docs/implementation/ (tracking, decisions, module contexts)
> docs/knowledge-base/ (failures, patterns)
> ```
> 
> **🔀 Git:**
> [Commit and tag commands]
> 
> **🔄 SESSION RECOMMENDATION:**
> **Start new session for Phase 4**.
> 
> **Model:** Claude Sonnet 4.5 (verification complexity)
> 
> **Handoff:** `cat docs/implementation/.recovery-checkpoint.md`
> 
> Reply **APPROVED**."

---

## Outputs Checklist

| Artifact | Status |
|----------|--------|
| Updated Task Files | ⏳ |
| Module Context Packages [NEW] | ⏳ |
| State Flow Diagrams [NEW] | ⏳ |
| Task Checklist | ⏳ |
| Estimation Tracking | ⏳ |
| Decision Log | ⏳ |
| Knowledge Base Entries [NEW] | ⏳ |
| Context Packages (if failures) | ⏳ |
| Source Code | ⏳ |
| Tests | ⏳ |
| Git commits and tag | ⏳ |

---

## Role Transition

```
═══════════════════════════════════════════════════════════════
🎭 ROLE TRANSITION
───────────────────────────────────────────────────────────────
   Deactivating: Senior Developer
   Activating:   QA Lead (Primary)
   Supporting:   Security Engineer, Performance Engineer,
                 Data Interpreter [NEW v1.0]
   Phase:        4: Verification and Release
   
   Loading role: config/roles/qa-lead.md
═══════════════════════════════════════════════════════════════
```

Load `./docs/prompts/04-verification.md` and begin Phase 4.
