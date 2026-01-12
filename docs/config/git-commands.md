# Git Command Templates

## Phase Completion Commits

### Template: PHASE_COMPLETE
```bash
git commit -m "Phase {{phase}}: {{phase_name}} complete

Role: {{role}}
{{consulting}}

{{details}}

Status: Ready for Phase {{next_phase}}"
```

**Parameters:**
- `phase`: Phase number (1-5)
- `phase_name`: Phase descriptive name
- `role`: Primary role name
- `consulting`: Supporting roles (if applicable)
- `details`: Phase-specific summary
- `next_phase`: Next phase number

**Example:**
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

---

## Task Commits

### Template: TASK_COMPLETE
```bash
git commit -m "[T-{{task_id}}] {{description}}

Role: Senior Developer

Files:
{{files_list}}

Implementation:
{{implementation_notes}}

Effort: {{estimated}}h → {{actual}}h ({{variance}}%)

Verification:
- Linter: {{linter_status}}
- Tests: {{test_status}}
- Coverage: {{coverage}}%

Refs: {{ac_refs}}"
```

**Parameters:**
- `task_id`: Task ID (e.g., 1.2.3)
- `description`: Brief task description
- `files_list`: Files created/modified
- `implementation_notes`: Key implementation details
- `estimated`, `actual`, `variance`: Effort tracking
- `linter_status`, `test_status`, `coverage`: Quality metrics
- `ac_refs`: Acceptance criteria IDs

---

## Module Commits

### Template: MODULE_COMPLETE
```bash
git commit -m "Module M{{milestone}}-MOD{{module}}: {{name}} complete

Role: Senior Developer

Tasks: {{completed}}/{{total}} completed
{{task_list}}

Effort Summary:
- Estimated: {{est_total}}h
- Actual: {{act_total}}h
- Variance: {{variance}}%

Module ready for integration"
```

---

## Milestone Commits

### Template: MILESTONE_COMPLETE
```bash
git commit -m "Milestone M{{milestone}}: {{name}} complete

Role: Senior Developer

Modules:
{{module_list}}

Tasks: {{completed}}/{{total}} complete

Effort Summary:
- Estimated: {{estimated}}h
- Actual: {{actual}}h
- Variance: {{variance}}%"
```

---

## Recovery Commits

### Template: RECOVERY_CHECKPOINT
```bash
git commit -m "chore: Update recovery checkpoint

Phase: {{phase}}
Task: {{current_task}}
Status: {{status}}"
```

---

## Failure Commits

### Template: TASK_FAILURE
```bash
git commit -m "WIP: [T-{{task_id}}] {{description}} - FAILED

Role: Senior Developer

Error:
- {{error_summary}}

Root Cause:
- {{root_cause}}

Progress:
- {{completed_work}}
- {{remaining_work}}

Effort: {{hours_spent}}h spent

Status: Paused - Intervention required

Context Package: docs/implementation/context-packages/T-{{task_id}}-failure.md"
```

---

## Tag Templates

### Specification Tag
```bash
git tag -a v0.1.{{minor}}-spec -m "Phase 1: Specification {{action}}

{{summary}}
- FR: {{fr_count}} | NFR: {{nfr_count}} | AC: {{ac_count}}"
```

### Planning Tag
```bash
git tag -a v0.2.0-plan -m "Phase 2: Planning Complete

Blueprint v{{blueprint_version}}
Tasks: {{task_count}} | Parallel Groups: {{pg_count}}
Est: {{estimated}}h"
```

### Implementation Tag
```bash
git tag -a v0.3.0-impl -m "Phase 3: Implementation Complete

Tasks: {{completed}}/{{total}}
Coverage: {{coverage}}%
Ready for verification"
```

### Verification Tags
```bash
# Success
git tag -a v0.4.0-verify -m "Phase 4: Verification Passed

Decision: GO
Coverage: {{coverage}}%
ACs: {{ac_count}}/{{ac_count}}
Ready for release"

# Failure
git tag -a v0.4.0-nogo -m "Phase 4: Verification Failed

Decision: NO-GO
Blockers: {{blocker_count}}
Context: {{context_package}}"
```

### Release Tag
```bash
git tag -a v{{major}}.{{minor}}.{{patch}} -m "Release v{{version}}

Role: Release Manager

## Summary
{{summary}}

## Features
{{features_list}}

## Verification
- Evidence: v{{version}}-evidence.md
- Coverage: {{coverage}}%
- ACs: {{ac_verified}}/{{ac_total}} verified

Released: {{date}}"
```

### Replan Tag
```bash
git tag -a v0.5.0-replan -m "Replan: {{reason}}

Role: Release Manager

Issues:
{{issues_list}}

Context Package: {{context_package_path}}

Returning to Phase {{target_phase}}"
```

---

## Branch Conventions

### Feature Branch
```bash
git checkout -b feature/M{{milestone}}-{{name}}
```

### Task Branch (optional)
```bash
git checkout -b task/T-{{task_id}}-{{name}}
```

### Parallel Group Branch
```bash
git checkout -b parallel/PG-{{group_id}}
```

### Hotfix Branch
```bash
git checkout -b hotfix/{{description}}
```

### Release Branch
```bash
git checkout -b release/v{{version}}
```

---

## Merge Templates

### Milestone Merge
```bash
git merge feature/M{{milestone}}-{{name}} -m "Merge milestone M{{milestone}}

{{summary}}

Tasks: {{completed}}
Modules: {{modules}}
Ready for {{next_milestone}}"
```

### Parallel Group Merge
```bash
git merge parallel/PG-{{group}} -m "Merge parallel group PG-{{group}}

Tasks completed:
{{task_list}}

All parallel tasks verified"
```

---

## Usage in CodeMaestro

At checkpoints, CodeMaestro will:
1. Select appropriate template
2. Fill in parameters from context
3. Display complete git command
4. User executes or modifies as needed

**Templates are loaded dynamically - not in initial context.**