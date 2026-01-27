---
name: handoff-protocol
description: Defines context passing and artifact handoff between agents
version: 1.0.0
---

# Handoff Protocol

Defines how context, artifacts, and state are passed between agents to maintain continuity while minimizing token usage.

---

## Core Principles

1. **Minimal Context**: Pass references, not full content
2. **Explicit Dependencies**: Declare what each agent needs
3. **Immutable Artifacts**: Once produced, artifacts don't change (versioned)
4. **Traceable History**: Every handoff is logged

---

## Handoff Message Format

### Standard Handoff

```yaml
handoff:
  id: {uuid}
  timestamp: {ISO-8601}

  # Source
  from:
    agent: architect
    phase: 2
    task_completed: "Blueprint creation"

  # Destination
  to:
    agent: developer
    phase: 3
    task_assigned: "Implement M1-MOD1-T1"

  # Session context (always passed)
  context:
    skill_tier: advanced
    domain: web
    project_name: "E-commerce Platform"

  # Artifacts (references only)
  artifacts:
    required:
      - path: docs/blueprint-v1.0.md
        type: blueprint
        summary: "3-tier architecture: React + Node + PostgreSQL"
        sections_relevant: ["Component: AuthService", "API: /auth/*"]
      - path: docs/task-dag-v1.0.md
        type: task_dag
        summary: "42 tasks across 5 milestones"
        current_task: "T-1.1.1: Implement user model"
    optional:
      - path: docs/architecture/decisions/ADR-001.md
        type: adr
        summary: "JWT for authentication"

  # Quality gate status
  gate_status:
    phase_2: passed
    blockers: []

  # Instructions for receiving agent
  instructions: |
    Implement task T-1.1.1 following blueprint patterns.
    Authentication uses JWT (see ADR-001).
    Target coverage: 70%.
```

---

## Artifact Reference Format

### Full Reference

```yaml
artifact:
  path: docs/blueprint-v1.0.md
  type: blueprint | specification | task_dag | adr | code | test | report
  version: 1.0.0
  status: draft | locked | approved | superseded

  # Summary for context (loaded into agent)
  summary: "Brief description of content and purpose"

  # Relevant sections (agent loads only these)
  sections:
    - id: "component-auth"
      title: "Authentication Component"
      line_range: [45, 120]
    - id: "api-users"
      title: "User API Endpoints"
      line_range: [200, 280]

  # Dependencies
  depends_on:
    - docs/locked-specification-v1.0.md

  # Produced by
  produced_by:
    agent: architect
    phase: 2
    timestamp: ...
```

### Compact Reference (for lists)

```yaml
- path: docs/blueprint-v1.0.md
  summary: "3-tier React+Node+Postgres architecture"
```

---

## Phase Handoffs

### Phase 1 → Phase 2

```yaml
handoff_1_to_2:
  from: product-manager
  to: architect

  artifacts:
    required:
      - path: docs/locked-specification-v1.0.md
        sections:
          - "Functional Requirements"
          - "Non-Functional Requirements"
          - "Constraints"
      - path: docs/competitive-analysis.md
        sections:
          - "Differentiation Opportunities"

  context_summary: |
    Project: {one-line requirement}
    FRs: {count} functional requirements
    NFRs: {count} non-functional requirements
    Key constraints: {list}
    Domain: {detected domain}
```

### Phase 2 → Phase 3

```yaml
handoff_2_to_3:
  from: architect
  to: developer

  artifacts:
    required:
      - path: docs/blueprint-v1.0.md
        sections:
          - "Architecture Overview"
          - "Component Descriptions"
          - "Technology Stack"
      - path: docs/task-dag-v1.0.md
        sections:
          - "Current Milestone"
          - "Task Dependencies"
      - path: docs/security/threat-model.md
        sections:
          - "Security Requirements"
    optional:
      - path: docs/architecture/decisions/ADR-*.md
        summary: "Relevant ADRs for current task"

  context_summary: |
    Architecture: {pattern}
    Tech stack: {languages, frameworks}
    Current milestone: M{n}
    Tasks remaining: {count}
    Security considerations: {key points}
```

### Phase 3 → Phase 4

```yaml
handoff_3_to_4:
  from: developer
  to: qa-lead

  artifacts:
    required:
      - path: docs/locked-specification-v1.0.md
        sections:
          - "Acceptance Criteria"
      - path: src/**/*
        type: code
        summary: "Implementation complete"
      - path: tests/**/*
        type: tests
        summary: "{count} tests, {coverage}% coverage"
    optional:
      - path: docs/module-contexts/*.md
        summary: "Module implementation notes"

  context_summary: |
    Implementation: Complete
    Test coverage: {percentage}%
    Known issues: {list or "None"}
    Ready for: Full verification
```

### Phase 4 → Phase 5

```yaml
handoff_4_to_5:
  from: qa-lead
  to: release-manager

  artifacts:
    required:
      - path: docs/evidence-package.md
        sections:
          - "Test Results"
          - "Security Scan"
          - "GO/NO-GO Decision"
      - path: docs/security/scan-report.md
        summary: "0 critical, 0 high vulnerabilities"

  context_summary: |
    Verification: PASSED
    Decision: GO
    Test results: {pass}/{total} passing
    Security: Clear
    Ready for: Release
```

---

## Intra-Phase Handoffs

### architect → security-engineer (Phase 2)

```yaml
handoff_arch_to_security:
  from: architect
  to: security-engineer
  phase: 2

  artifacts:
    - path: docs/blueprint-v1.0.md
      sections:
        - "Authentication Design"
        - "Data Flow"
        - "API Endpoints"

  task: "Create threat model using STRIDE methodology"

  return_artifact:
    path: docs/security/threat-model.md
    required_sections:
      - "Threat Matrix"
      - "Mitigations"
      - "Security Requirements"
```

### developer → code-reviewer (Phase 3)

```yaml
handoff_dev_to_reviewer:
  from: developer
  to: code-reviewer
  phase: 3

  artifacts:
    - path: src/auth/login.ts
      type: code
      changes: "+120 lines"
    - path: tests/auth/login.test.ts
      type: test

  task: "Review implementation of T-1.1.1"

  return_artifact:
    type: review_report
    inline: true  # Returns directly, not saved to file
```

---

## Context Minimization Rules

### What to Include

| Include | Example |
|---------|---------|
| Skill tier | `advanced` |
| Domain | `web` |
| Current phase | `3` |
| Current task | `T-1.1.1` |
| Artifact paths | `docs/blueprint-v1.0.md` |
| Artifact summaries | "JWT auth, React frontend" |
| Relevant sections only | Lines 45-120 of blueprint |
| Quality gate status | `phase_2: passed` |

### What to Exclude

| Exclude | Why |
|---------|-----|
| Full artifact content | Load on-demand via Read |
| Completed task details | Not relevant to current work |
| Other phase artifacts | Not needed yet |
| Agent history | Logged separately |
| Unchanged state | Implicit |

### Token Budget Guidelines

| Handoff Type | Target Tokens |
|--------------|---------------|
| Phase transition | < 500 tokens |
| Intra-phase | < 200 tokens |
| Parallel agent spawn | < 300 tokens |

---

## Handoff Validation

### Pre-Handoff Checks

```yaml
validate_handoff:
  checks:
    - name: "Artifacts exist"
      rule: "All required artifact paths are valid"
    - name: "Gate passed"
      rule: "Quality gate for source phase is passed"
    - name: "Agent available"
      rule: "Target agent is defined and accessible"
    - name: "Context complete"
      rule: "skill_tier, domain, phase are set"
```

### Post-Handoff Confirmation

```yaml
confirm_handoff:
  receiving_agent: developer
  confirms:
    - "Received artifact references"
    - "Context loaded"
    - "Task understood"
  ready: true
```

---

## Error Recovery

### Missing Artifact

```yaml
on_missing_artifact:
  action: request_regeneration
  from: source_agent
  artifact: {missing path}
  fallback: ask_user
```

### Context Mismatch

```yaml
on_context_mismatch:
  detected: "skill_tier changed mid-session"
  action: reconcile
  rule: "Use latest value, log change"
```

### Failed Handoff

```yaml
on_handoff_failure:
  action: retry
  max_attempts: 2
  fallback: manual_intervention
  preserve:
    - session_state
    - artifacts
```

---

## Logging

### Handoff Log Entry

```yaml
log_entry:
  timestamp: 2026-01-27T10:30:00Z
  handoff_id: {uuid}
  from: architect
  to: developer
  phase_transition: 2 → 3
  artifacts_passed: 3
  context_tokens: 420
  status: success
```

### Audit Trail

All handoffs are logged to:
- Session history (in-memory)
- `.CodeMaestro/logs/handoffs.log` (persistent)

---

## Version

**Version:** 1.0.0
**Last Updated:** 2026-01-27
