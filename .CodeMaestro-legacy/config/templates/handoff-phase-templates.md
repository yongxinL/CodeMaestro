# Phase-Specific Handoff Templates

**CodeMaestro v1.0.0**
**Purpose:** Phase transition handoff templates (extracted from handoff-messages.md for progressive disclosure)
**Load When:** Creating phase transition handoffs
**Parent Guide:** [../handoff-messages.md](../handoff-messages.md)

---

## Usage

These templates extend the **Core Handoff Structure** defined in [handoff-messages.md](../handoff-messages.md). Use these when creating handoff messages for phase transitions.

**Template Selection:**
- Phase 1→2: Requirements → Planning
- Phase 2→3: Planning → Implementation
- Phase 3→4: Implementation → Verification
- Phase 4→5: Verification → Release

---

## Phase 1 → Phase 2 Handoff

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

---

## Phase 2 → Phase 3 Handoff

```markdown
## Session Handoff: Planning → Implementation

**Session Type:** Phase Transition
**From Phase:** 2 (Planning)
**To Phase:** 3 (Implementation)
**Primary Model:** Claude Sonnet 4.5
**Alternative Models:** Haiku 4.5 (simple tasks), Opus 4.5 (critical/novel tasks)

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

### Token Metrics & Model Strategy

**Phase 2 Session:**
- Model: Opus 4.5 (architecture design)
- Tokens Used: [X]K tokens
- Actual vs Estimated: [Variance]%

**Phase 3 Estimate:**
- Total Project: [Z]K tokens (from task DAG)
- By Milestone:
  - M1: [A]K tokens ([N] tasks) - [H] Haiku, [S] Sonnet, [O] Opus
  - M2: [B]K tokens ([M] tasks) - [H] Haiku, [S] Sonnet, [O] Opus
  - M3: [C]K tokens ([K] tasks) - [H] Haiku, [S] Sonnet, [O] Opus

**Recommended Model Strategy:**

**Approach 1: Sonnet-Primary (Recommended for Mixed Complexity)**
- Use Sonnet 4.5 as primary session model
- Sessions Needed: [N]-[N+1]
- Estimated Cost: ~$[amount]
- **When to use:** Standard development, mixed task complexity

**Approach 2: Model-per-Task (Cost-Optimized)**
- Batch simple tasks: Haiku sessions for M1 setup ([list task IDs])
- Core logic: Sonnet for M2 features
- Critical tasks: Opus for [specific task ID]
- Estimated Cost: ~$[amount] (save ~[X]% vs Approach 1)
- **When to use:** Budget-conscious, clear task separation

**Approach 3: Milestone-Based (Balanced)**
- M1 (Setup): Haiku 4.5 ([A]K tokens)
- M2 (Features): Sonnet 4.5 ([B]K tokens)
- M3 (Complex): Sonnet/Opus mix ([C]K tokens)
- Estimated Cost: ~$[amount]
- **When to use:** Clear milestone complexity progression

**Task-Level Model Recommendations:**
See `docs/architecture/tasks/` for per-task model assignments

**Budget Management:**
- Use `/budget` before each task (Step 3.3.1c)
- Check model match: Task model vs Session model
- Record actuals after each task (Step 3.3.7)
- Alert at 85%+ session utilization
- Consider model switch if batch of simple tasks ahead

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

---

## Phase 3 → Phase 4 Handoff

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

---

## Phase 4 → Phase 5 Handoff

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

## Version

**Phase Templates Version:** 1.0.1
**Extracted From:** handoff-messages.md v1.0.1
**Last Updated:** 2026-01-19
