# Git Command Templates

**Version:** 1.1 (Optimized)
**Token Savings:** ~2,000 tokens (examples on-demand)

> 📖 For detailed examples and parameter descriptions, use `/git-help` command

---

## Quick Reference

### Phase Commits

```bash
# PHASE_COMPLETE
git commit -m "Phase {{phase}}: {{phase_name}} complete

Role: {{role}}
{{consulting}}

{{details}}

Status: Ready for Phase {{next_phase}}"
```

```bash
# TASK_COMPLETE
git commit -m "[T-{{task_id}}] {{description}}

Role: Senior Developer

Files: {{files_list}}
Implementation: {{implementation_notes}}
Effort: {{estimated}}h → {{actual}}h ({{variance}}%)

Verification:
- Linter: {{linter_status}}
- Tests: {{test_status}}
- Coverage: {{coverage}}%

Refs: {{ac_refs}}"
```

```bash
# MODULE_COMPLETE
git commit -m "Module M{{milestone}}-MOD{{module}}: {{name}} complete

Role: Senior Developer
Tasks: {{completed}}/{{total}} completed
{{task_list}}

Effort: {{est_total}}h → {{act_total}}h ({{variance}}%)
Module ready for integration"
```

```bash
# MILESTONE_COMPLETE
git commit -m "Milestone M{{milestone}}: {{name}} complete

Role: Senior Developer
Modules: {{module_list}}
Tasks: {{completed}}/{{total}} complete
Effort: {{estimated}}h → {{actual}}h ({{variance}}%)"
```

```bash
# RECOVERY_CHECKPOINT
git commit -m "chore: Update recovery checkpoint

Phase: {{phase}}
Task: {{current_task}}
Status: {{status}}"
```

```bash
# TASK_FAILURE
git commit -m "WIP: [T-{{task_id}}] {{description}} - FAILED

Role: Senior Developer
Error: {{error_summary}}
Root Cause: {{root_cause}}
Progress: {{completed_work}}
Effort: {{hours_spent}}h spent

Status: Paused - Intervention required
Context: docs/implementation/context-packages/T-{{task_id}}-failure.md"
```

---

## Tag Templates

```bash
# Specification
git tag -a v0.1.{{minor}}-spec -m "Phase 1: Specification {{action}}
{{summary}}
FR: {{fr_count}} | NFR: {{nfr_count}} | AC: {{ac_count}}"

# Planning
git tag -a v0.2.0-plan -m "Phase 2: Planning Complete
Blueprint v{{version}} | Tasks: {{count}} | Est: {{hours}}h"

# Implementation
git tag -a v0.3.0-impl -m "Phase 3: Implementation Complete
Tasks: {{completed}}/{{total}} | Coverage: {{coverage}}%"

# Verification (GO)
git tag -a v0.4.0-verify -m "Phase 4: Verification Passed
Decision: GO | Coverage: {{coverage}}% | ACs: {{ac_count}}/{{ac_total}}"

# Verification (NO-GO)
git tag -a v0.4.0-nogo -m "Phase 4: Verification Failed
Decision: NO-GO | Blockers: {{count}} | Context: {{package}}"

# Release
git tag -a v{{major}}.{{minor}}.{{patch}} -m "Release v{{version}}
Role: Release Manager
Summary: {{summary}}
Features: {{features}}
Coverage: {{coverage}}% | ACs: {{ac_verified}}/{{ac_total}}
Released: {{date}}"

# Replan
git tag -a v0.5.0-replan -m "Replan: {{reason}}
Role: Release Manager
Issues: {{issues}}
Context: {{context_package}}
Returning to Phase {{target_phase}}"
```

---

## Branch Conventions

```bash
# Feature branch
git checkout -b feature/M{{milestone}}-{{name}}

# Task branch (optional)
git checkout -b task/T-{{task_id}}-{{name}}

# Parallel group branch
git checkout -b parallel/PG-{{group_id}}

# Hotfix branch
git checkout -b hotfix/{{description}}

# Release branch
git checkout -b release/v{{version}}
```

---

## Merge Templates

```bash
# Milestone merge
git merge feature/M{{milestone}}-{{name}} -m "Merge milestone M{{milestone}}
{{summary}}
Tasks: {{completed}} | Modules: {{modules}}
Ready for {{next_milestone}}"

# Parallel group merge
git merge parallel/PG-{{group}} -m "Merge parallel group PG-{{group}}
Tasks: {{task_list}}
All parallel tasks verified"
```

---

## Usage

Templates are loaded dynamically from this file when needed. Commands like `/commit` will:
1. Select appropriate template
2. Fill parameters from context
3. Display complete git command
4. User executes or modifies as needed

**For detailed examples:** Use `/git-help` to load full documentation with parameter descriptions and usage examples.

---

<!-- EXAMPLES SECTION - Loaded on /git-help command -->
<a id="examples"></a>
## Detailed Examples

### Phase Completion Example

**Template Variables:**
- `phase`: Phase number (1-5)
- `phase_name`: Descriptive name (Requirements, Planning, Implementation, Verification, Release)
- `role`: Primary role name
- `consulting`: Supporting roles (if any)
- `details`: Phase-specific summary
- `next_phase`: Next phase number

**Example Usage:**
```bash
git commit -m "Phase 2: Planning and Orchestration complete

Role: Software Architect
Consulting: Security Engineer, DevOps Engineer, Tech Lead

Architecture:
- Pattern: Microservices
- Components: 8
- Tasks: 45 total, 12 parallel groups
- Estimated: 180 hours

Status: Ready for Phase 3"
```

### Task Completion Example

**Template Variables:**
- `task_id`: Task ID (e.g., 1.2.3)
- `description`: Brief task description
- `files_list`: Files created/modified (one per line with '- ' prefix)
- `implementation_notes`: Key implementation details
- `estimated`, `actual`, `variance`: Effort tracking (hours and percentage)
- `linter_status`, `test_status`: Pass/Fail status
- `coverage`: Test coverage percentage
- `ac_refs`: Acceptance criteria IDs (e.g., AC-1.2, AC-1.3)

**Example Usage:**
```bash
git commit -m "[T-2.1.3] Implement user authentication API

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

Refs: AC-2.1, AC-2.2"
```

### Module Completion Example

**Template Variables:**
- `milestone`: Milestone number
- `module`: Module number
- `name`: Module name
- `completed`, `total`: Task counts
- `task_list`: List of completed tasks (one per line with '- ' prefix)
- `est_total`, `act_total`, `variance`: Effort summary

**Example Usage:**
```bash
git commit -m "Module M1-MOD2: Authentication Module complete

Role: Senior Developer

Tasks: 8/8 completed
- T-2.1.1: User registration
- T-2.1.2: Email verification
- T-2.1.3: Login flow
- T-2.1.4: Password reset
- T-2.1.5: JWT refresh
- T-2.1.6: Session management
- T-2.1.7: Role-based access
- T-2.1.8: Audit logging

Effort Summary:
- Estimated: 32h
- Actual: 38h
- Variance: +18.75%

Module ready for integration"
```

### Recovery Checkpoint Example

**Template Variables:**
- `phase`: Current phase number
- `current_task`: Current task ID or "Phase transition"
- `status`: Brief status description

**Example Usage:**
```bash
git commit -m "chore: Update recovery checkpoint

Phase: 3
Task: T-3.2.5
Status: Implementation in progress - 12/45 tasks complete"
```

### Task Failure Example

**Template Variables:**
- `task_id`: Task ID that failed
- `description`: Task description
- `error_summary`: Brief error description
- `root_cause`: Identified root cause
- `completed_work`: What was completed successfully
- `remaining_work`: What still needs to be done
- `hours_spent`: Hours invested before failure

**Example Usage:**
```bash
git commit -m "WIP: [T-3.4.2] Real-time notifications - FAILED

Role: Senior Developer

Error:
- WebSocket connection drops after 30 seconds
- No error messages in logs

Root Cause:
- AWS ALB idle timeout (60s) conflicts with heartbeat interval (45s)
- Need to configure ALB or reduce heartbeat to 25s

Progress:
- WebSocket server setup complete
- Client connection logic complete
- Message serialization complete
- Heartbeat mechanism implemented (but needs adjustment)

Effort: 6h spent

Status: Paused - Intervention required

Context Package: docs/implementation/context-packages/T-3.4.2-failure.md"
```

### Tag Examples

**Specification Tag:**
```bash
git tag -a v0.1.2-spec -m "Phase 1: Specification updated

Added real-time notification requirements
- FR: 12 | NFR: 8 | AC: 45"
```

**Planning Tag:**
```bash
git tag -a v0.2.0-plan -m "Phase 2: Planning Complete

Blueprint v1.0
Tasks: 45 | Parallel Groups: 8
Est: 180h"
```

**Implementation Tag:**
```bash
git tag -a v0.3.0-impl -m "Phase 3: Implementation Complete

Tasks: 45/45
Coverage: 87%
Ready for verification"
```

**Release Tag:**
```bash
git tag -a v1.2.0 -m "Release v1.2.0

Role: Release Manager

## Summary
Added real-time notifications and improved authentication

## Features
- Real-time WebSocket notifications
- Enhanced JWT security
- Rate limiting for all endpoints
- Comprehensive audit logging

## Verification
- Evidence: v1.2.0-evidence.md
- Coverage: 87%
- ACs: 45/45 verified

Released: 2026-01-13"
```

### Branch Examples

```bash
# Feature branch for milestone 2
git checkout -b feature/M2-authentication

# Task branch for specific task
git checkout -b task/T-2.1.3-login-flow

# Parallel group branch
git checkout -b parallel/PG-3

# Hotfix branch
git checkout -b hotfix/security-patch-jwt

# Release branch
git checkout -b release/v1.2.0
```

### Merge Examples

```bash
# Milestone merge
git merge feature/M2-authentication -m "Merge milestone M2

Complete authentication system
Tasks: 8
Modules: 2 (Auth, Session)
Ready for M3-notifications"

# Parallel group merge
git merge parallel/PG-3 -m "Merge parallel group PG-3

Tasks completed:
- T-3.1.1: Database schema
- T-3.1.2: API endpoints
- T-3.1.3: Frontend components
- T-3.1.4: Integration tests

All parallel tasks verified"
```

---

## Parameter Placeholders

Common parameter formats used in templates:

| Placeholder | Format | Example |
|-------------|--------|---------|
| `{{phase}}` | Number 1-5 | `3` |
| `{{task_id}}` | X.Y.Z | `2.1.3` |
| `{{milestone}}` | Number | `2` |
| `{{module}}` | Number | `1` |
| `{{version}}` | Semantic | `1.2.0` |
| `{{coverage}}` | Percentage | `87` |
| `{{hours}}` | Number | `180` |
| `{{variance}}` | Percentage with sign | `+18.75` |
| `{{date}}` | ISO 8601 | `2026-01-13` |

---

**Optimization Note:** This condensed format reduces token usage by ~2,000 tokens. Full examples load only when `/git-help` is invoked.
