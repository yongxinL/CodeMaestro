# Phase 3: Implementation

> **Prerequisite**: Load `./.CodeMaestro/prompts/00-core.md` first.
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
   
   Loading role: agents/developer.md
═══════════════════════════════════════════════════════════════
```

### Senior Developer Mindset

Load full role definition: `view /mnt/project/agents/developer.md`

**Quick Reference:**
- Write **clean, maintainable, testable** code
- Follow **architectural guidelines**
- Apply **KISS, DRY, SOLID** principles
- Track **actual effort** vs estimates
- **Optimize state management**
- **Maintain architectural coherence**

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
- **Module context packages created**
- **Knowledge Base updated**
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

**Load Module Context**:
```
view /mnt/project/implementation/context-packages/module-M[X]-MOD[Y]-context.md
```

This provides **harmonic resonance** - understanding the architectural vision for this module.

**Start timer**.

#### 3.3.1c: Session Budget Check [NEW v1.0]

**Action**: Verify sufficient token budget before starting task execution.

**Load token estimation:**
```
view /mnt/project/config/token-estimation.md#session-budget-check
```

**Check current session status:**

```markdown
### Session Budget Check

**Session Model:** [Claude Sonnet 4.5 / Opus 4.5 / Haiku 4.5]
**Session Budget:** [1,000,000 / 200,000] tokens
- Usable (80%): [800,000 / 160,000] tokens
- Current usage: [X] tokens ([Y]% of budget)
- Remaining: [Z] tokens

**Task Token Budget:** [T] tokens (from task file)

**Status:** [✅ Sufficient / ⚠️ Low / ❌ Insufficient]

**Action:**
- ✅ Sufficient (remaining > task budget × 1.5): Proceed with task
- ⚠️ Low (remaining > task budget × 1.0 but < 1.5): Proceed with caution, monitor closely
- ❌ Insufficient (remaining < task budget): Create checkpoint, start new session
```

**If insufficient budget:**
1. Create recovery checkpoint immediately
2. Document current progress in task file
3. Recommend new session with handoff context
4. Update checkpoint with:
   - Current token usage
   - Remaining tasks and estimates
   - Recommended model for continuation

**Reference Commands:**
```bash
/budget                         # Check current session status
/budget --forecast              # Forecast remaining tasks
```

#### 3.3.1b: Generate Test Stubs (Optional) [NEW v1.1]

**For tasks involving acceptance criteria validation:**

Generate test stubs from acceptance criteria:
```bash
/generate test AC-X.Y    # Generate test stub for specific AC
/generate test AC-X.*    # Generate all stubs for AC-X group
```

**Benefits:**
- Ensures AC traceability
- Provides test structure
- Reduces boilerplate
- Enforces Given/When/Then/And pattern

**Note:** Developers implement test logic in TODO sections. This is scaffolding, not complete tests.

**See:** `.CodeMaestro/config/code-generation-from-ac.md` for details.

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

**Anti-Hallucination Workflow (Constraints A7, A7.5, A4):**

Before writing implementation code:

**1. Search for Existing Patterns**
```bash
# Check internal knowledge base
/kb search [task-feature]

# If using new/unfamiliar library, retrieve verified examples
Context7: /example [library] [feature]
Context7: /lookup [library] [method]    # Confirm API signatures
```

**2. Copy and Adapt Verified Code**
- Start with official examples from Context7
- Adapt to your specific requirements
- Preserve proven patterns and structure
- **Never** generate from memory for unfamiliar APIs

**3. Document Sources**
```javascript
// Pattern adapted from: [Library] official docs via Context7
// Modified for: [Your specific use case]
// Validated via Context7: [library].[method]() confirmed
```

**4. Validate Implementation**
- Confirm adapted code compiles/runs
- Test edge cases
- Compare against original example to ensure correctness

**See:** [roles/senior-developer.md](../agents/developer.md#anti-hallucination-practices) for complete anti-hallucination workflow.

---

**State Management & Data Flow Optimization**:

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
- **State management approach**
- Challenges and resolutions

#### 3.3.7: Update Effort and Token Tracking

**Action**: Record actual vs estimated effort and token usage.

**Load reference:**
```
view /mnt/project/config/token-estimation.md#actual-token-recording
```

**Add to task file:**

```markdown
## Effort Tracking

**Estimated Effort:** [X] hours
**Actual Effort:** [Y] hours
**Variance:** [+/-Z] hours ([+/-W]%)

## Token Usage

**Estimated Tokens:** [A] tokens
**Actual Tokens:** [B] tokens
**Variance:** [+/-C] tokens ([+/-D]%)

**Breakdown:**
- Code generation: [E] tokens (est. [F])
- Testing: [G] tokens (est. [H])
- Documentation: [I] tokens (est. [J])
- Debugging: [K] tokens (est. [L])

**Variance Analysis:**
- [Reason 1 for variance]
- [Reason 2 for variance]

**Lessons Learned:**
- [Insight 1 for future estimations]
- [Insight 2 for improving accuracy]
```

**Update estimation tracking file:**

File: `implementation/estimation-tracking.md`

Add row:
```markdown
| T-[ID] | [Task Name] | [Est. Hours] | [Act. Hours] | [Var %] | [Est. Tokens] | [Act. Tokens] | [Var %] | [Notes] |
```

**Log to Knowledge Base** (if significant variance >±25%):
```
/kb add token-variance
```

Store:
- Task characteristics
- Actual token usage breakdown
- Root cause of variance
- Recommendations for future estimations

#### 3.3.8: Mark Complete

Update status to ✅.

#### 3.3.8.5: Update Recovery Checkpoint & Review for KB

**Action**: Update checkpoint after each task completion to ensure session continuity.

**Update** `docs/implementation/.recovery-checkpoint.md`:

```markdown
# Recovery Checkpoint

| Field | Value |
|-------|-------|
| Last Updated | [Current timestamp] |
| Phase | 3 |
| Active Role | Senior Developer |
| Current Task | T-[X.X.X] - [Just completed] |
| Next Task | T-[Y.Y.Y] - [Next in queue] |
| Git Commit | [Latest commit hash] |
| Git Branch | develop |
| Session Model | [Sonnet/Opus/Haiku] |
| Tokens Used | [X]K ([Y]% of budget) |

## Progress Summary
- Completed: [N]/[Total] tasks ([Z]%)
- Current Milestone: M[X] - [Name]
- Status: [On track / Behind / Ahead]

## Quick Resume
Load next task: `/task T-[Y.Y.Y]`
Check status: `/status`

## Lazy Load Map
blueprint → docs/architecture/blueprint.md
task-dag → docs/architecture/task-dag.mermaid
module-context-M[X] → implementation/context-packages/module-M[X]-context.md
```

**Review for Knowledge Base Additions:**

After each task completion, check if learnings should be added to KB:

**1. Check for Reusable Patterns**
```bash
# If task implementation created valuable pattern
/kb add pattern

# Example triggers:
- Solved problem in elegant/novel way
- Discovered better approach than planned
- Created reusable utility/component
- Found optimization technique
```

**2. Check for Failure Prevention**
```bash
# If task had challenges that could help future work
/kb add failure

# Example triggers:
- Bug that was hard to find/fix
- Library gotcha or unexpected behavior
- Integration issue with third-party service
- Performance bottleneck discovered
```

**3. Check for API/Library Learnings**
```bash
# If learned important API usage pattern
/kb add pattern

# Example triggers:
- Adapted Context7 example successfully
- Discovered undocumented API behavior
- Found best practice for library usage
```

**KB Review Questions:**
- Did this task reveal a reusable pattern?
- Did I encounter a failure others should avoid?
- Did I learn something about a library/API worth sharing?
- Would future similar tasks benefit from this knowledge?

**If YES to any:** Add to knowledge base before committing

**Deliverable:** Updated checkpoint + KB entries (if applicable)

#### 3.3.9: Git Commit

**Option 1: Manual (Default)**
```
view /mnt/project/config/git-commands.md#TASK_COMPLETE
```
Copy template, modify, and execute manually.

**Option 2: Automated (v1.1)**
```bash
/commit --auto        # Auto-generate with confirmation
/commit --preview     # Preview without executing
/commit --edit        # Generate and edit before commit
```

Commit with appropriate strategy (by tier).

**See:** `.CodeMaestro/config/git-automation.md` for automation details.

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

#### 3.4.3: Log to Knowledge Base

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

**Update Module Context Package**:

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

#### Module Context Packages
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
> - **Tokens**: [Est]K → [Act]K ([Var]%)
> - Coverage: [X]%
> - **State Optimization**: [Patterns applied]
> - **Module Contexts**: [N] modules documented
> - **Knowledge Base**: [F] failures, [P] patterns logged
>
> **Token Efficiency**:
> - Session Model: [Model]
> - Total Sessions: [N]
> - Avg Tokens/Task: [X]K
> - Budget Utilization: [Y]% (efficient/moderate/high)
> 
> **📁 Artifacts:**
> ```
> src/ (implementation)
> tests/ (test files)
> docs/implementation/ (tracking, decisions, module contexts)
> .CodeMaestro/knowledge-base/ (failures, patterns)
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
> **📋 SESSION HANDOFF: Implementation → Verification**
>
> **What Was Accomplished (Phase 3):**
> - ✅ Implemented [X]/[Y] tasks ([Z]%)
> - ✅ Test coverage: [W]%
> - ✅ Token efficiency: [Variance]% ([Excellent/Good/Needs Improvement])
> - ✅ Module contexts: [N] modules documented
> - ✅ Knowledge base: [F] failures, [P] patterns logged
> - ✅ Estimation tracking: Complete with variance analysis
> - ✅ All commits and tag: `v0.3.0-impl`
>
> **Next Phase: Verification (Phase 4)**
>
> **Entry Point:**
> 1. Load `./.CodeMaestro/prompts/04-verification.md`
> 2. Activate **QA Lead** role
> 3. Start with Step 4.1: Input Validation
> 4. Execute comprehensive verification workflow
>
> **Critical Context for Verification:**
> - **Implementation Decisions:** [Key decisions impacting testing]
> - **State Management:** [Pattern] - [Source of truth]
> - **Known Issues:** [Issues to verify in Phase 4]
> - **Quality Targets:** Coverage ≥70%, Security 0 C/H, AC 100%
>
> **Files to Load First:**
> - `docs/specifications/locked-specification.md` - AC verification source
> - `docs/verification/test-plan.md` - Test execution guide
> - `docs/architecture/api-contracts/openapi.yaml` - Contract validation
> - `implementation/estimation-tracking.md` - Token variance data
>
> **Token Metrics Summary:**
> - Phase 3 Total: [X]K tokens ([N] sessions)
> - Estimated: [Y]K tokens
> - Variance: [±Z]% ([Insights])
> - Phase 4 Estimate: 40K-80K tokens (1 session)
>
> **Git State:**
> - Branch: `develop`
> - Tag: `v0.3.0-impl`
> - Status: Clean
>
> **Recovery Checkpoint:** `docs/implementation/.recovery-checkpoint.md`
>
> **Full Handoff Guide:** See `.CodeMaestro/config/handoff-messages.md#phase-3-to-4`
>
> Reply **APPROVED**."

---

## Outputs Checklist

| Artifact | Status |
|----------|--------|
| Updated Task Files | ⏳ |
| Module Context Packages | ⏳ |
| State Flow Diagrams | ⏳ |
| Task Checklist | ⏳ |
| Estimation Tracking | ⏳ |
| Decision Log | ⏳ |
| Knowledge Base Entries | ⏳ |
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
                 Data Interpreter
   Phase:        4: Verification and Release
   
   Loading role: agents/qa-lead.md
═══════════════════════════════════════════════════════════════
```

Load `./.CodeMaestro/prompts/04-verification.md` and begin Phase 4.
