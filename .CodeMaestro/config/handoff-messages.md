# Session Handoff Messages

**CodeMaestro v1.0.0**
**Purpose:** Templates and guidelines for creating effective session handoff messages between phases
**Target:** All roles transitioning between phases or sessions

---

## Overview

Handoff messages provide complete context for continuing work in a new session after a checkpoint. They ensure:
- **Continuity:** New session can resume exactly where previous session ended
- **Context Preservation:** All critical decisions, progress, and state are documented
- **Efficiency:** Minimize time to productivity in new session
- **Token Optimization:** Enable lazy loading instead of re-reading entire context

---

## Core Handoff Structure

Every handoff message should include these sections:

```markdown
## Session Handoff

**Session Type:** [Normal Phase Transition / Mid-Phase Resume / Recovery / Replan]
**From Phase:** [Current phase number and name]
**To Phase:** [Next phase number and name]
**Date:** [YYYY-MM-DD HH:MM]
**Model Recommendation:** [Claude Sonnet 4.5 / Opus 4.5 / Haiku 4.5]

---

### Context Summary

**Project:** [Project Name]
**Domain:** [Mobile / Web / Cloud / AI/ML]
**Skill Tier:** [Beginner / Advanced / Ninja]

**Current State:**
- Phase: [N] ([Phase Name])
- Status: [In Progress / Complete / Blocked]
- Progress: [X]/[Y] tasks completed ([Z]%)

---

### What Was Accomplished

[Concise bullet list of completed work, key decisions, artifacts created]

Example:
- ✅ Locked specification with 45 acceptance criteria
- ✅ Competitive analysis of 3 competitors completed
- ✅ Domain adaptation: Web (responsive design, CDN strategy)
- ✅ Created 15 task files across 3 milestones

---

### Current Focus

**Active Task:** [T-X.X.X: Task Name]
**Status:** [Pending / In Progress (Y% complete) / Blocked]

**What needs to happen next:**
1. [Specific next action]
2. [Second action]
3. [Third action]

---

### Critical Context

**Key Decisions:**
- [Decision 1]: [Brief rationale]
- [Decision 2]: [Brief rationale]

**Constraints to Remember:**
- [Constraint 1]
- [Constraint 2]

**Blockers/Risks:**
- [Blocker 1]: [Mitigation]
- [Risk 1]: [Monitoring plan]

---

### Artifacts & Files

**Recently Modified:**
- `path/to/file1.md` - [What changed]
- `path/to/file2.md` - [What changed]

**Key Files to Load:**
- `docs/specifications/locked-specification.md` - [Why important]
- `docs/architecture/blueprint.md` - [Why important]

**Where to Start:**
```bash
# Command to resume work
/task T-X.X.X        # Continue active task
# OR
/next                # Move to next pending task
```

---

### Token Metrics (v1.0+)

**Previous Session:**
- Model: [Claude Sonnet 4.5 / Opus 4.5]
- Tokens Used: [X]K tokens ([Y]% of budget)
- Tasks Completed: [N]
- Avg Tokens/Task: [Z]K

**Current Session Budget:**
- Recommended Model: [Model name]
- Estimated Remaining Work: [X]K tokens
- Remaining Tasks: [N] tasks ([Y]K tokens estimated)
- Fits in Single Session: [✅ Yes / ⚠️ Tight / ❌ No - split recommended]

**Variance Notes:**
- [Any significant token variance observations]
- [Recommendations for upcoming tasks]

---

### Git State

**Branch:** `[branch-name]`
**Last Commit:** `[commit-hash]` - [commit message]
**Last Tag:** `v[X.Y.Z]-[phase]`

**Uncommitted Changes:** [None / Listed below]
- [File 1]: [Status]
- [File 2]: [Status]

---

### Next Phase Preparation

**Prerequisites for Phase [N+1]:**
- [x] [Prerequisite 1] - Complete
- [x] [Prerequisite 2] - Complete
- [ ] [Prerequisite 3] - Pending

**Expected Entry Point:**
Load `./.CodeMaestro/prompts/0[N+1]-[phase-name].md` and begin Phase [N+1].

**Role Transition:**
From **[Current Role]** → To **[Next Role]**

---

### Recovery Checkpoint

**File:** `docs/implementation/.recovery-checkpoint.md`
**Last Updated:** [YYYY-MM-DD HH:MM]

**Quick Recovery:**
```bash
/recover             # Execute recovery protocol
```

This will load the full recovery checkpoint with complete context.
```

---

## Phase-Specific Handoff Templates

### Phase 1 → Phase 2 Handoff

```markdown
## Session Handoff: Requirements → Planning

**Session Type:** Phase Transition
**From Phase:** 1 (Requirements)
**To Phase:** 2 (Planning)
**Model Recommendation:** Claude Sonnet 4.5

### Context Summary

**Locked Specification:**
- Functional Requirements: [N]
- Non-Functional Requirements: [M]
- Acceptance Criteria: [K]
- Domain: [Mobile/Web/Cloud/AI]

**Competitive Analysis:**
- Competitors Analyzed: [N]
- Key Differentiators: [List 2-3]
- Strategic Positioning: [Summary]

### What Was Accomplished

- ✅ One-line requirement clarified
- ✅ Functional requirements decomposed ([N] FRs)
- ✅ Non-functional requirements specified ([M] NFRs)
- ✅ Acceptance criteria mapped ([K] ACs)
- ✅ Competitive analysis complete
- ✅ Specification locked and tagged (v0.1.x-spec)

### Current Focus

**Next Step:** Begin Phase 2 (Planning and Orchestration)

**What needs to happen next:**
1. Load `./CodeMaestro/prompts/02-planning.md`
2. Activate Software Architect role
3. Start with Step 2.1: Specification Resolution
4. Create architecture blueprint from locked specification

### Critical Context

**Key Decisions:**
- Domain detected: [Web/Mobile/Cloud/AI]
- Skill tier: [Beginner/Advanced/Ninja]
- Competitive positioning: [Strategic focus]

**Requirements to Remember:**
- [Critical NFR 1]: [Detail]
- [Critical NFR 2]: [Detail]

### Artifacts & Files

**Key Files for Phase 2:**
- `docs/specifications/locked-specification.md` - **START HERE**
- `docs/requirements/competitive-analysis.md` - Reference for ADRs
- `docs/requirements/domain-requirements.md` - Domain-specific patterns

### Token Metrics

**Phase 1 Session:**
- Tokens Used: [X]K tokens
- Phase 1 Average: 5K-15K per session

**Phase 2 Estimate:**
- Expected: 10K-30K tokens per session
- Tasks: ~8-12 architectural tasks
- Total Estimate: 120K-240K tokens
- Sessions Needed: 1-2 (Sonnet 4.5)

### Git State

**Branch:** `develop`
**Last Tag:** `v0.1.0-spec`
**Status:** Clean (all changes committed)

### Next Phase Preparation

**Phase 2 Entry Conditions (All Met):**
- [x] Locked specification exists
- [x] Git tag `v0.1.x-spec` created
- [x] Competitive analysis complete

**Expected Duration:** 6-10 hours
**Primary Role:** Software Architect
**Supporting Roles:** Tech Lead, Security Engineer, DevOps Engineer
```

### Phase 2 → Phase 3 Handoff

```markdown
## Session Handoff: Planning → Implementation

**Session Type:** Phase Transition
**From Phase:** 2 (Planning)
**To Phase:** 3 (Implementation)
**Model Recommendation:** Claude Sonnet 4.5 or Haiku 4.5 (for simple tasks)

### Context Summary

**Architecture Blueprint:** v1.0
**Technology Stack:** [List key technologies]
**Domain:** [Web/Mobile/Cloud/AI] with [specific adaptations]

**Task Summary:**
- Milestones: [X]
- Modules: [Y]
- Tasks: [Z] total
- Parallel Groups: [N]
- Estimated Effort: [H] hours
- **Estimated Tokens:** [T]K tokens

### What Was Accomplished

- ✅ Architecture blueprint created (v1.0)
- ✅ Technology stack selected with lock files
- ✅ API contracts defined ([N] endpoints)
- ✅ Task DAG generated ([Z] tasks)
- ✅ Gantt timeline created
- ✅ Threat model completed
- ✅ Test plan established
- ✅ All tasks estimated (effort + tokens)
- ✅ Git commit and tag created (v0.2.0-plan)

### Current Focus

**Next Step:** Begin Phase 3 (Implementation)

**What needs to happen next:**
1. Load `./.CodeMaestro/prompts/03-implementation.md`
2. Activate Senior Developer role
3. Start with Step 3.1: Environment Verification
4. Load first task from task queue

**First Task:** T-[M].[Mod].[Task] - [Task Name]

### Critical Context

**Architecture Patterns:**
- Primary: [Pattern name]
- State Management: [Pattern]
- Data Flow: [Unidirectional/Bidirectional]

**Key ADRs:**
- ADR-001: [Decision] - [Why important for implementation]
- ADR-002: [Decision] - [Why important]

**Quality Thresholds:**
- Test Coverage: ≥70% (blocking)
- Security: 0 critical/high (blocking)
- AC Pass Rate: 100% (blocking)

### Artifacts & Files

**Critical Files for Phase 3:**
- `docs/architecture/blueprint.md` - **Architectural reference**
- `docs/architecture/task-dag.mermaid` - **Task dependencies**
- `docs/architecture/tasks/` - **All task files with estimates**
- `docs/architecture/api-contracts/openapi.yaml` - **API contracts**

**Module Context Packages:**
- Create as you work: `implementation/context-packages/module-M[X]-MOD[Y]-context.md`

### Token Metrics

**Phase 2 Session:**
- Tokens Used: [X]K tokens
- Actual vs Estimated: [Variance]%

**Phase 3 Estimate:**
- Total Project: [Z]K tokens (from task DAG)
- By Milestone:
  - M1: [A]K tokens ([N] tasks)
  - M2: [B]K tokens ([M] tasks)
  - M3: [C]K tokens ([K] tasks)
- Sessions Needed: [N]-[N+1] (Sonnet 4.5)

**Budget Management:**
- Use `/budget` before each task (Step 3.3.1c)
- Record actuals after each task (Step 3.3.7)
- Alert at 85%+ session utilization

### Git State

**Branch:** `develop`
**Last Tag:** `v0.2.0-plan`
**Status:** Clean (all changes committed)

**Next Commits:**
- Per task completion (or by tier: per task/module/milestone)

### Next Phase Preparation

**Phase 3 Entry Conditions (All Met):**
- [x] Blueprint exists
- [x] Task DAG and task files created
- [x] Git tag `v0.2.0-plan` exists
- [x] Token estimates complete

**Expected Duration:** [H] hours (from task DAG)
**Primary Role:** Senior Developer
**Supporting Roles:** Code Reviewer, Technical Writer
```

### Phase 3 → Phase 4 Handoff

```markdown
## Session Handoff: Implementation → Verification

**Session Type:** Phase Transition
**From Phase:** 3 (Implementation)
**To Phase:** 4 (Verification)
**Model Recommendation:** Claude Sonnet 4.5

### Context Summary

**Implementation Status:**
- Tasks Completed: [X]/[Y] ([Z]%)
- Test Coverage: [W]%
- Milestones: [N] complete

### What Was Accomplished

- ✅ Implemented [X] tasks across [N] milestones
- ✅ Test coverage: [W]%
- ✅ Module contexts created: [N] modules
- ✅ Knowledge base updated: [F] failures, [P] patterns
- ✅ Estimation tracking complete
- ✅ All commits and tag created (v0.3.0-impl)

### Current Focus

**Next Step:** Begin Phase 4 (Verification)

**What needs to happen next:**
1. Load `./.CodeMaestro/prompts/04-verification.md`
2. Activate QA Lead role
3. Start with Step 4.1: Input Validation
4. Execute comprehensive verification workflow

### Critical Context

**Implementation Decisions:**
- [Key decision 1]: [Impact on testing]
- [Key decision 2]: [Verification consideration]

**State Management:**
- Pattern Used: [Pattern]
- Source of Truth: [Location]
- Critical State Flows: [List]

**Known Issues:**
- [Issue 1]: [Mitigation]
- [Issue 2]: [To verify in Phase 4]

### Artifacts & Files

**Critical Files for Phase 4:**
- `docs/specifications/locked-specification.md` - **AC verification source**
- `docs/verification/test-plan.md` - **Test execution guide**
- `docs/architecture/api-contracts/openapi.yaml` - **Contract validation**
- `implementation/estimation-tracking.md` - **Token variance data**

**Testing Assets:**
- `tests/` - All test files
- `test-reports/` - Will be generated during verification

### Token Metrics

**Phase 3 Sessions:**
- Total Tokens: [X]K tokens
- Estimated: [Y]K tokens
- Variance: [±Z]%
- Efficiency: [Excellent/Good/Needs Improvement]

**Variance Insights:**
- [Key insight 1]
- [Key insight 2]

**Phase 4 Estimate:**
- Expected: 8K-20K tokens per session
- Verification tasks: ~5-8 tasks
- Total Estimate: 40K-80K tokens
- Sessions Needed: 1 (Sonnet 4.5)

### Git State

**Branch:** `develop`
**Last Tag:** `v0.3.0-impl`
**Status:** Clean (all changes committed)

### Next Phase Preparation

**Phase 4 Entry Conditions (All Met):**
- [x] All tasks ✅ or explicitly ❌
- [x] Git tag `v0.3.0-impl` exists
- [x] Test coverage ≥[threshold]%

**Expected Duration:** 3-6 hours
**Primary Role:** QA Lead
**Supporting Roles:** Security Engineer, Performance Engineer, Data Interpreter
```

### Phase 4 → Phase 5 Handoff

```markdown
## Session Handoff: Verification → Release

**Session Type:** Phase Transition
**From Phase:** 4 (Verification)
**To Phase:** 5 (Master Control & Release)
**Model Recommendation:** Claude Sonnet 4.5

### Context Summary

**GO/NO-GO Decision:** [✅ GO / ❌ NO-GO]

**Quality Summary:**
- Test Coverage: [X]% (✅/❌)
- Security: [N] critical, [M] high (✅/❌)
- AC Pass Rate: [K]/[Total] (✅/❌)
- Performance: [✅ No regressions / ❌ Regressions detected]
- Token Efficiency: [Score]/10

### What Was Accomplished

- ✅ All tests executed (unit, integration, E2E)
- ✅ Security scans complete (SAST, dependency, secrets)
- ✅ Ethics validation passed
- ✅ Performance baselines established
- ✅ API contracts validated
- ✅ Evidence package created
- ✅ GO/NO-GO decision made
- ✅ Git commit and tag created (v0.4.0-verify)

### Current Focus

**Next Step:** Begin Phase 5 (Release)

**Decision Path:**
- **If GO:** Proceed to Step 5.A (Success Workflow)
- **If NO-GO:** Proceed to Step 5.B (Failure Workflow)

**What needs to happen next:**
1. Load `./.CodeMaestro/prompts/05-master-control.md`
2. Activate Release Manager role
3. Execute appropriate workflow based on GO/NO-GO decision

### Critical Context

**Verification Results:**
- Blocking Issues: [N] (must be 0 for GO)
- Non-Blocking Warnings: [M]
- Performance Baseline: v[X.Y.Z] established

**Token Efficiency Analysis:**
- Overall Variance: [±X]%
- Best Practices: [List 2-3]
- Improvements Needed: [List 2-3]

### Artifacts & Files

**Critical Files for Phase 5:**
- `verification/evidence-packages/v[X.Y.Z]-evidence.md` - **Evidence**
- `docs/release/monitoring-plan.md` - **Post-release monitoring**
- `docs/release/rollback-sop.md` - **Rollback procedures**
- `CHANGELOG.md` - Update with release notes

**Token Metrics for Retrospective:**
- `implementation/estimation-tracking.md` - Full variance data
- Evidence package Section 8 - Token efficiency summary

### Token Metrics

**Phase 4 Session:**
- Tokens Used: [X]K tokens
- Phase 4 Average: 8K-20K

**Project Total:**
- All Phases: [Y]K tokens
- Estimated: [Z]K tokens
- Variance: [±W]%

**Phase 5 Estimate:**
- Expected: 5K-12K tokens
- Release tasks: ~3-5 tasks
- Total Estimate: 15K-35K tokens
- Sessions Needed: 1 (Sonnet 4.5)

### Git State

**Branch:** `develop`
**Last Tag:** `v0.4.0-verify`
**Status:** Clean (all changes committed)

**Next Actions:**
- Merge to `main` (if GO)
- Create release tag `v[X.Y.Z]`
- Update CHANGELOG.md

### Next Phase Preparation

**Phase 5 Entry Conditions:**
- [x] GO/NO-GO decision made
- [x] Evidence package complete
- [x] Git tag `v0.4.0-verify` exists

**Expected Duration:** 2-4 hours
**Primary Role:** Release Manager
**Supporting Roles:** Project Manager, DevOps Engineer, Data Interpreter
```

---

## Mid-Session Resume Handoff

For resuming work mid-phase after an interruption:

```markdown
## Session Handoff: Mid-Phase Resume

**Session Type:** Mid-Phase Resume
**Phase:** [N] ([Phase Name])
**Status:** In Progress
**Model Recommendation:** [Same as previous session]

### Context Summary

**Progress:**
- Current Step: [Step X.X]
- Completed: [X]/[Y] tasks in this phase
- Remaining: [Z] tasks

### What Was Accomplished (This Phase)

[List completed work since phase started]

### Current Task

**Task:** T-[X.X.X] - [Task Name]
**Status:** [X]% complete
**Remaining Work:**
1. [Specific action]
2. [Specific action]

**Where You Left Off:**
[Detailed description of exact stopping point]

### Token Budget Status

**Current Session:**
- Used: [X]K tokens ([Y]%)
- Remaining: [Z]K tokens
- This task estimate: [W]K tokens
- Status: [✅ Sufficient / ⚠️ Low / ❌ Insufficient]

**Recommendation:**
[Continue / Consider checkpoint / Start new session]

### Files in Progress

**Uncommitted Changes:**
- `file1.ext` - [Status and what's left]
- `file2.ext` - [Status and what's left]

### Quick Resume

```bash
/task T-[X.X.X]      # Load current task
/status              # Check overall progress
```

### Recovery Checkpoint

**File:** `docs/implementation/.recovery-checkpoint.md`
**Last Updated:** [YYYY-MM-DD HH:MM]

Use `/recover` if you need full context restoration.
```

---

## Recovery Handoff (After Failure)

For recovery after errors or context loss:

```markdown
## Session Handoff: Recovery

**Session Type:** Recovery
**Reason:** [Context Loss / Error / Interruption]
**Phase:** [N] ([Phase Name])
**Model Recommendation:** [Model]

### What Happened

[Brief description of failure/interruption]

**Last Known Good State:**
- Commit: `[hash]`
- Tag: `v[X.Y.Z]-[phase]`
- Time: [YYYY-MM-DD HH:MM]

### Recovery Point

**Restore From:**
- Git: `git checkout [commit/tag]`
- Checkpoint: `docs/implementation/.recovery-checkpoint.md`

### What Was Lost

[List work that may have been lost]

### Recovery Plan

1. [Step 1: Restore to known good state]
2. [Step 2: Verify files and status]
3. [Step 3: Resume from checkpoint]

### Context to Recover

**Critical Decisions:**
[List decisions that must be remembered]

**Files to Review:**
- `file1.md` - [Why important]
- `file2.md` - [Why important]

### Quick Recovery

```bash
/recover             # Execute recovery protocol
git status           # Check current state
/status              # Verify phase and progress
```
```

---

## Best Practices

### When to Create Handoffs

1. **Always:** At end of every phase (Phase 1→2, 2→3, 3→4, 4→5)
2. **Recommended:** When session utilization >85% (token budget)
3. **Optional:** Mid-phase when taking break >24 hours
4. **Required:** Before context-heavy operations (refactoring, migrations)
5. **Critical:** After failures or when recovery needed

### What Makes a Good Handoff

**Be Specific:**
- ❌ "Continue with implementation"
- ✅ "Implement T-2.1.3 (Auth middleware): Add JWT validation to /api routes"

**Include Context:**
- Why decisions were made
- What alternatives were considered
- What constraints are active

**Provide Quick Start:**
- Exact command to resume work
- File paths to key artifacts
- Current git state

**Track Tokens:**
- Previous session usage
- Upcoming task estimates
- Budget recommendations

### Handoff Checklist

Before creating handoff, verify:

- [ ] All recent work committed
- [ ] Recovery checkpoint updated
- [ ] Token metrics recorded
- [ ] Git state documented
- [ ] Next steps clearly defined
- [ ] Critical context captured
- [ ] Files and artifacts listed
- [ ] Model recommendation provided

---

## Commands

### `/handoff`
Generate handoff message for current state

**Syntax:**
```bash
/handoff                         # Generate handoff for current phase
/handoff --next                  # Include next phase preparation
/handoff --tokens                # Include detailed token analysis
/handoff --recovery              # Include recovery instructions
```

### `/checkpoint`
Create recovery checkpoint with handoff context

**Syntax:**
```bash
/checkpoint                      # Update recovery checkpoint
/checkpoint --handoff            # Include handoff message
/checkpoint --git                # Include git snapshot
```

---

## Version

**Handoff Messages Guide Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** 2026-01-16
