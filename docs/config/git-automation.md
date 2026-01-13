# Git Automation (Improvement #4)

**Version:** 1.0
**Date:** 2026-01-13
**Status:** ✅ Documented (Integration Pending)
**Risk:** 🔶 MEDIUM → ✅ ZERO (Opt-in approach approved)
**Effort:** 3-4 hours

---

## Overview

Git Automation enables automated git commit and tag operations while preserving manual workflow as the default. Users can opt-in to automation when ready, with safety features like preview, edit, and dry-run modes.

**Key Principle:** Manual workflow remains default. Automation is opt-in via flags.

---

## Problem Statement

**Current State:**
- Git commands are templates in `docs/config/git-commands.md`
- Users copy/paste and manually modify before execution
- Inconsistent commit messages
- Easy to forget phase tags or metadata
- Manual parameter substitution error-prone

**User Pain Points:**
1. Tedious copy-paste-modify workflow
2. Forgetting to update metadata (phase, task ID, effort)
3. Inconsistent formatting across commits
4. Git command syntax errors

---

## Solution: Opt-In Git Automation

### Default Behavior (Unchanged)

```bash
/commit

# Output: Displays formatted commit template
Phase 3: Task T-2.1.3 complete

Role: Senior Developer
Files: [list]
Effort: 4h → 5.5h (+37.5%)
...

# User copies, modifies, and executes manually
```

**No breaking changes.** Existing workflow preserved.

---

### New: Opt-In Automation

#### `/commit --auto`

**Full automation with safety confirmation:**

```bash
/commit --auto

# System generates commit message
🤖 Generated commit message:
───────────────────────────────────────────
[T-2.1.3] Implement user authentication API

Role: Senior Developer

Files:
- src/auth/authController.ts
- src/auth/authService.ts
- tests/auth/authController.test.ts

Implementation:
- JWT token generation with 24h expiry
- Bcrypt password hashing (rounds: 10)
- Rate limiting: 5 attempts per 15 minutes

Effort: 4h → 5.5h (+37.5%)

Verification:
- Linter: Pass
- Tests: Pass (12/12)
- Coverage: 95%

Refs: AC-2.1, AC-2.2
───────────────────────────────────────────

✅ Confirm commit with this message? (y/n)
```

**Safety Features:**
- Shows full preview before executing
- Requires explicit confirmation
- Validates message format
- Checks for uncommitted files

---

#### `/commit --preview`

**Preview generated message without executing:**

```bash
/commit --preview

# Shows generated message
# No git commands executed
# User can review before deciding
```

**Use Case:** Check what message would be generated before committing.

---

#### `/commit --edit`

**Generate message, allow editing, then commit:**

```bash
/commit --edit

# Generates message
# Opens in $EDITOR (vim/nano/code)
# User modifies as needed
# Saves and closes → commits with edited message
```

**Use Case:** Automation + customization in one step.

---

#### `/commit --dry-run`

**Test what would happen without making changes:**

```bash
/commit --dry-run

# Shows:
📋 Files to be staged:
- src/auth/authController.ts (modified)
- tests/auth/authController.test.ts (new)

📝 Generated commit message:
[T-2.1.3] Implement user authentication API
[... full message ...]

🚫 DRY RUN - No changes made
```

**Use Case:** Verify automation logic before committing.

---

## Message Generation Logic

### Data Sources

1. **Current Phase:** From recovery checkpoint or phase prompt
2. **Current Task:** From task tracking in implementation artifacts
3. **Changed Files:** From `git status --porcelain`
4. **Implementation Notes:** From task completion documentation
5. **Effort Tracking:** From estimation tracking template
6. **Test Results:** From recent test runs
7. **Constraint References:** From code review checklist

### Template Selection

```python
def select_template(context):
    if context.phase_complete:
        return "PHASE_COMPLETE"
    elif context.task_complete:
        return "TASK_COMPLETE"
    elif context.module_complete:
        return "MODULE_COMPLETE"
    elif context.milestone_complete:
        return "MILESTONE_COMPLETE"
    elif context.failure:
        return "TASK_FAILURE"
    else:
        return "GENERIC_COMMIT"
```

### Parameter Extraction

```python
def extract_parameters(context):
    params = {}

    # Parse task ID from current task
    params['task_id'] = context.current_task.id  # e.g., "2.1.3"
    params['description'] = context.current_task.name

    # Parse files from git status
    params['files_list'] = "\n".join([
        f"- {file}" for file in git_status_files()
    ])

    # Extract effort from tracking
    params['estimated'] = context.task.estimated_hours
    params['actual'] = context.task.actual_hours
    params['variance'] = calculate_variance(estimated, actual)

    # Extract verification status
    params['linter_status'] = run_linter_check()
    params['test_status'] = get_test_results()
    params['coverage'] = get_coverage_percentage()

    # Extract AC references
    params['ac_refs'] = context.task.acceptance_criteria

    return params
```

### Message Assembly

```python
def generate_commit_message(template, params):
    message = load_template(template)

    # Substitute parameters
    for key, value in params.items():
        message = message.replace(f"{{{{{{key}}}}}}", str(value))

    # Validate format
    validate_commit_message(message)

    return message
```

---

## Safety Features

### 1. Preview Before Execute

**Always show full message before committing:**
- User sees exactly what will be committed
- No surprises
- Can abort with Ctrl+C

### 2. Confirmation Required

**Explicit "yes" required for --auto mode:**
- Prevents accidental commits
- User must actively confirm
- Can review and reject

### 3. Edit Capability

**--edit mode allows modification:**
- Start with generated message
- Customize as needed
- Maintain automation benefits

### 4. Dry Run Mode

**--dry-run shows impact without changes:**
- Test automation logic
- Verify file staging
- Check message format
- No git operations

### 5. Validation

**Validate before executing:**
- Check for uncommitted files
- Verify message format
- Ensure phase metadata present
- Validate task ID format

### 6. Rollback Support

**If commit fails:**
- No partial commits
- Clear error messages
- Suggest fixes
- Manual fallback available

---

## Command Reference

### `/commit` (Default)
**Behavior:** Display template (manual workflow)
**Use When:** Want full control, complex changes, first time with feature

### `/commit --auto`
**Behavior:** Generate → Preview → Confirm → Execute
**Use When:** Standard task completion, confident in automation

### `/commit --preview`
**Behavior:** Generate → Show → Exit (no commit)
**Use When:** Want to see what would be generated

### `/commit --edit`
**Behavior:** Generate → Edit → Confirm → Execute
**Use When:** Want generated base + customization

### `/commit --dry-run`
**Behavior:** Show files + message → Exit (no changes)
**Use When:** Testing, debugging, verifying logic

### `/commit --template=[NAME]`
**Behavior:** Force specific template (e.g., TASK_COMPLETE)
**Use When:** Override auto-detection

### `/commit --no-verify`
**Behavior:** Skip pre-commit hooks (use sparingly)
**Use When:** Hook false positive, emergency commit

---

## Implementation Details

### Phase Integration

#### Phase 3 (Implementation)

After task completion:

```bash
# Old workflow:
/next
→ Shows git commit template
→ User copies and modifies manually

# New workflow (opt-in):
/next
→ Shows task completion summary
→ Offers: "Generate commit? (y/n/edit/preview/dry-run)"
→ User chooses automation level
```

#### Phase Transitions

After phase completion:

```bash
# Phase 2 → Phase 3 transition
/next
→ "Phase 2 complete. Commit changes? (y/n/auto/edit/preview)"
→ User chooses workflow
```

### Configuration

**Project-level config:**

```yaml
# .codemaestro/config.yaml
git:
  auto_commit: false  # Default: manual workflow
  auto_confirm: false  # Default: require confirmation
  editor: "code --wait"  # Editor for --edit mode
  dry_run_default: false  # Default: actual commits
```

**User preferences:**

```bash
# Set default behavior for user
git config --global codemaestro.commit-mode auto
git config --global codemaestro.commit-editor "vim"
```

---

## Examples

### Example 1: Task Completion (Auto)

```bash
cd my-project
# Complete task T-2.1.3
# Tests pass, linter pass, coverage 95%

/commit --auto

🤖 Detected: Task T-2.1.3 complete
📋 Generating commit message...

───────────────────────────────────────────
[T-2.1.3] Implement user authentication API

Role: Senior Developer

Files:
- src/auth/authController.ts
- src/auth/authService.ts
- tests/auth/authController.test.ts

Implementation:
- JWT token generation with 24h expiry
- Bcrypt password hashing (rounds: 10)
- Rate limiting: 5 attempts per 15 minutes

Effort: 4h → 5.5h (+37.5%)

Verification:
- Linter: Pass
- Tests: Pass (12/12)
- Coverage: 95%

Refs: AC-2.1, AC-2.2
───────────────────────────────────────────

✅ Commit with this message? (y/n) y

[main 3a8f7b2] [T-2.1.3] Implement user authentication API
 3 files changed, 287 insertions(+), 12 deletions(-)
 create mode 100644 tests/auth/authController.test.ts

✅ Committed successfully
```

### Example 2: Phase Completion (Edit Mode)

```bash
/commit --edit

🤖 Detected: Phase 2 complete
📋 Generating commit message...
✏️  Opening editor...

# User modifies in editor:
# - Adds additional architecture notes
# - Emphasizes key decisions
# - Saves and closes

🔍 Changes detected in message
✅ Commit with edited message? (y/n) y

[main 7b3c9f1] Phase 2: Planning and Orchestration complete
 ...

✅ Committed successfully
```

### Example 3: Dry Run (Testing)

```bash
/commit --dry-run

🤖 Detected: Module M1-MOD2 complete
📋 Dry run mode - no changes will be made

───────────────────────────────────────────
📋 Files to be staged:
- src/auth/authController.ts (modified)
- src/auth/authService.ts (modified)
- src/auth/middleware.ts (new)
- tests/auth/ (8 new files)

📝 Generated commit message:
───────────────────────────────────────────
Module M1-MOD2: Authentication Module complete

Role: Senior Developer

Tasks: 8/8 completed
- T-2.1.1: User registration
- T-2.1.2: Email verification
[... rest of message ...]
───────────────────────────────────────────

🚫 DRY RUN - No changes made
```

---

## Function Preservation Checklist

- ✅ Default `/commit` behavior unchanged (shows template)
- ✅ Manual workflow fully supported
- ✅ Users can customize messages before commit (--edit)
- ✅ Preview available before execution (--preview, --auto with confirmation)
- ✅ Edit capability provided (--edit mode)
- ✅ No breaking changes to existing workflow
- ✅ Opt-in required for automation (--auto flag)
- ✅ Dry run for testing (--dry-run)
- ✅ Rollback support if commit fails

---

## User Adoption Strategy

### Phase 1: Introduction
- Document `/commit --auto` in COMMANDS.md
- Add examples to QUICK-START.md
- Announce in release notes

### Phase 2: Gradual Adoption
- Users try --preview to see generated messages
- Use --dry-run to verify logic
- Adopt --edit for semi-automated workflow

### Phase 3: Full Automation
- Confident users adopt --auto
- Set git config for default automation
- Share success stories

---

## Future Enhancements (v2.0)

### Smart Defaults
- After user approves 10 generated messages without edits → suggest making --auto the default
- Learn from user's manual edits → improve generation logic

### AI-Enhanced Messages
- Analyze code diffs to generate better descriptions
- Suggest related constraints and ACs based on file changes
- Detect common patterns (refactoring, bug fix, feature)

### Batch Commits
- `/commit --batch` - commit each completed task separately
- Useful for multiple tasks completed in one session

---

## Testing

### Test Cases

| Test | Expected Outcome |
|------|------------------|
| `/commit` (no flags) | Shows template, no execution |
| `/commit --auto` with no changes | Error: "No changes to commit" |
| `/commit --auto` with confirmation "n" | No commit, exit cleanly |
| `/commit --preview` | Shows message, exits without commit |
| `/commit --dry-run` | Shows files + message, no commit |
| `/commit --edit` with no $EDITOR | Falls back to default editor |
| `/commit --auto` during Phase 3 | Generates task completion message |
| `/commit --auto` during Phase transition | Generates phase completion message |

### Integration Tests

```bash
# Test full workflow
/init-phase 1
# ... complete Phase 1 ...
/commit --auto
# Verify phase complete commit

/next
# ... complete task T-2.1.1 ...
/commit --auto
# Verify task commit
```

---

## Related Commands

- `/commit` - Display git commit template (manual workflow)
- `/tag` - Create git tag (manual/auto modes)
- `/push` - Push commits to remote
- `/history` - View commit history
- `/git-help` - Load full git documentation

---

**Status:** ✅ Documented
**Next Step:** Wire `/commit --auto` logic into phase prompts
**Integration:** Phase D completion
**Expected Adoption:** Gradual (users opt-in when ready)
