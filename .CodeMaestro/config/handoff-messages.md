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

### Token Metrics & Model Recommendations (v1.0+)

**Previous Session:**
- Model: [Claude Sonnet 4.5 / Opus 4.5 / Haiku 4.5]
- Tokens Used: [X]K tokens ([Y]% of budget)
- Tasks Completed: [N]
- Avg Tokens/Task: [Z]K
- Actual Cost: ~$[amount]

**Upcoming Tasks Analysis:**

| Task ID | Description | Est. Tokens | Recommended Model | Rationale |
|---------|-------------|-------------|-------------------|-----------|
| T-[X.X.X] | [Task name] | [Y]K | [Haiku/Sonnet/Opus] | [Why this model] |
| T-[X.X.X] | [Task name] | [Y]K | [Haiku/Sonnet/Opus] | [Why this model] |
| T-[X.X.X] | [Task name] | [Y]K | [Haiku/Sonnet/Opus] | [Why this model] |

**Session Strategy Recommendation:**

**Option A: Single Model (Simplest)**
- Use: Claude Sonnet 4.5 for all tasks
- Total Budget: [Y]K tokens
- Fits in Session: [✅ Yes / ❌ No]
- Estimated Cost: ~$[amount]

**Option B: Model Switching (Cost-Optimized)**
- Haiku tasks ([N]): [A]K tokens → ~$[cost]
- Sonnet tasks ([M]): [B]K tokens → ~$[cost]
- Opus tasks ([K]): [C]K tokens → ~$[cost]
- Total Cost: ~$[amount] (Save ~[X]% vs Option A)
- **Recommended if:** Cost-sensitive project, clear task separation

**Option C: Hybrid Approach (Balanced)**
- Start with Sonnet (primary session)
- Switch to Haiku for simple tasks batch ([list IDs])
- Use Opus for critical task: [T-X.X.X]
- Estimated Cost: ~$[amount]
- **Recommended if:** Mixed complexity, quality-cost balance

**Variance Notes:**
- [Any significant token variance observations]
- [Model performance notes: "Haiku handled CRUD efficiently" or "Complex task needed Sonnet upgrade"]
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

**Phase transition templates** provide detailed guidance for handoff messages at phase boundaries (1→2, 2→3, 3→4, 4→5).

**Progressive Disclosure:** Load templates on-demand to reduce token usage.

### Template Loading

**When Creating Phase Transition Handoffs:**
1. Use Core Handoff Structure (above) as base
2. Load phase-specific template from [templates/handoff-phase-templates.md](templates/handoff-phase-templates.md)
3. Customize with project-specific details

**Available Templates:**
- Phase 1→2: Requirements → Planning
- Phase 2→3: Planning → Implementation (includes model strategy recommendations)
- Phase 3→4: Implementation → Verification
- Phase 4→5: Verification → Release

**See:** [templates/handoff-phase-templates.md](templates/handoff-phase-templates.md) for complete phase-specific templates.

---

## Mid-Session Resume Handoff

For resuming work mid-phase after an interruption:

```markdown
## Session Handoff: Mid-Phase Resume

**Session Type:** Mid-Phase Resume
**Phase:** [N] ([Phase Name])
**Status:** In Progress
**Current Model:** [Model from previous session]
**Continue With:** [Same / Different model - see recommendation below]

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

### Token Budget & Model Status

**Current Session:**
- Model: [Sonnet/Opus/Haiku]
- Used: [X]K tokens ([Y]%)
- Remaining: [Z]K tokens
- This task estimate: [W]K tokens
- Status: [✅ Sufficient / ⚠️ Low / ❌ Insufficient]

**Current Task Model Requirement:**
- Task Recommended Model: [Haiku/Sonnet/Opus]
- Session Model: [Current model]
- Match: [✅ Optimal / ⚠️ Over-powered / ❌ Under-powered]

**Recommendation:**

**Continue Current Session if:**
- ✅ Model matches task requirements OR model is more capable
- ✅ Sufficient token budget ([Z]K > [W]K + 20% buffer)
- ✅ No upcoming batch of differently-sized tasks

**Start New Session if:**
- ⚠️ Low budget (<20% remaining or <[W]K for current task)
- 💡 Model mismatch opportunity: Current model is over-powered (Sonnet/Opus for simple Haiku task)
- 💡 Upcoming batch: Next 3+ tasks all require different model (e.g., all Haiku)

**Model Switch Recommendation:**
[Continue with [Model] / Switch to [Model] for cost savings / Upgrade to [Model] for task complexity]

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
6. **Model Switching:** When changing models (Haiku↔Sonnet↔Opus)

### Model Selection in Handoffs

**Include Model Recommendations when:**
- Transitioning between phases
- Starting new implementation session
- Resuming after interruption
- Budget running low (consider downgrade)
- Upcoming batch of similar complexity tasks

**Model Recommendation Format:**
```markdown
**Recommended Model:** Claude [Sonnet/Opus/Haiku] 4.5

**Rationale:**
- Upcoming tasks: [complexity profile]
- Token budget: [fits/exceeds model limits]
- Cost consideration: [savings opportunity / justified premium]
- Task characteristics: [simple/moderate/complex/critical]

**Alternative Strategy:**
[Describe if model switching mid-session could save costs]
```

**Cost-Performance Guidelines:**
- **Default to Sonnet** unless specific reason for Haiku or Opus
- **Batch Haiku tasks** to minimize context switching overhead
- **Use Opus sparingly** only for truly complex/critical work
- **Document model choices** in handoff for future learning

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
- [ ] Token metrics recorded (usage, variance, efficiency)
- [ ] Git state documented
- [ ] Next steps clearly defined
- [ ] Critical context captured
- [ ] Files and artifacts listed
- [ ] **Model recommendation provided with rationale**
- [ ] **Upcoming tasks analyzed for model requirements**
- [ ] **Cost-optimization opportunities identified**
- [ ] **Model switching strategy documented (if applicable)**

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
