# Iterative Retrieval Pattern

> **Purpose:** Progressive context refinement when retrieving relevant files for a task.
> **Use Case:** Subagent orchestration, task initialization, context loading.

---

## Overview

The Iterative Retrieval Pattern solves the problem of "what files do I need?" when starting a task. Instead of guessing upfront, it uses a 4-phase loop to progressively refine context.

---

## The Problem

Subagents and new sessions need context, but:
- **Send everything**: Exceeds context limits
- **Send nothing**: Agent lacks critical information
- **Guess what's needed**: Often wrong

---

## The Solution: 4-Phase Loop

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────────┐      ┌──────────┐            │
│   │ DISPATCH │─────▶│ EVALUATE │            │
│   └──────────┘      └──────────┘            │
│        ▲                  │                 │
│        │                  ▼                 │
│   ┌──────────┐      ┌──────────┐            │
│   │   LOOP   │◀─────│  REFINE  │            │
│   └──────────┘      └──────────┘            │
│                                             │
│        Max 3 cycles, then proceed           │
└─────────────────────────────────────────────┘
```

---

## Phase Details

### Phase 1: DISPATCH

Start with a broad query based on task description:

**Inputs:**
- Task title and description
- Keywords from acceptance criteria
- Similar patterns from Knowledge Base

**Initial Query:**
```yaml
patterns:
  - "src/**/*.ts"
  - "lib/**/*.ts"
keywords:
  - "authentication"
  - "user"
  - "session"
excludes:
  - "*.test.ts"
  - "*.spec.ts"
  - "node_modules/**"
```

**Actions:**
- Search files matching patterns
- Grep for keywords
- Find related imports/exports

---

### Phase 2: EVALUATE

Score each retrieved file for relevance:

| Score | Level | Meaning |
|-------|-------|---------|
| 0.8 - 1.0 | **High** | Directly implements target functionality |
| 0.5 - 0.7 | **Medium** | Contains related patterns or types |
| 0.2 - 0.4 | **Low** | Tangentially related |
| 0.0 - 0.2 | **None** | Not relevant, exclude |

**Evaluation Criteria:**
- Does file contain target functionality?
- Does file import/export relevant types?
- Does file contain patterns we need?
- Is file in the right domain/layer?

**Output:**
```yaml
files:
  - path: "src/auth/login.ts"
    relevance: 0.9
    reason: "Contains login implementation"
    gaps: ["Session type definition needed"]
    
  - path: "src/utils/validation.ts"
    relevance: 0.3
    reason: "General validation, not auth-specific"
    gaps: []
```

---

### Phase 3: REFINE

Update search criteria based on evaluation:

**Add to next query:**
- New patterns discovered in high-relevance files
- Terminology found in codebase (function names, type names)
- Import paths from relevant files

**Exclude from next query:**
- Confirmed irrelevant paths (relevance < 0.2)
- Already-evaluated files

**Focus areas:**
- Gaps identified in evaluation
- Missing dependencies
- Type definitions

**Refined Query Example:**
```yaml
patterns:
  - "src/auth/**/*.ts"        # Narrowed
  - "src/types/auth.ts"       # Specific type file discovered
keywords:
  - "authService"             # Discovered name
  - "SessionToken"            # Discovered type
excludes:
  - "src/utils/**"            # Confirmed irrelevant
focus:
  - "Session type definition"
  - "Token refresh logic"
```

---

### Phase 4: LOOP

Check stop conditions:

**Stop if:**
- Found ≥3 files with relevance ≥0.7
- No critical context gaps identified
- Max 3 cycles reached

**Continue if:**
- <3 high-relevance files
- Critical gaps remain
- <3 cycles completed

**On stop:**
Return the high-relevance files as context.

---

## Integration with CodeMaestro

### Task Initialization (Phase 3)

When starting a task:
1. Run iterative retrieval based on task description
2. Load high-relevance files into context
3. Proceed with implementation

### Recovery Protocol

When recovering a session:
1. Load recovery checkpoint
2. Run lightweight retrieval for current task
3. Verify critical files still relevant
4. Proceed or adjust

### Subagent Spawning

When delegating to a subagent:
1. Run retrieval scoped to subagent's domain
2. Pass only high-relevance files
3. Subagent works with focused context

---

## Role-Specific Retrieval

| Role | Focus Areas | File Patterns |
|------|-------------|---------------|
| Product Manager | Requirements, specs | `docs/**`, `*.md` |
| Software Architect | Architecture, ADRs | `docs/architecture/**`, `src/types/**` |
| Senior Developer | Implementation | `src/**`, `lib/**` |
| QA Lead | Tests, coverage | `**/*.test.*`, `__tests__/**` |
| Release Manager | CI/CD, scripts | `.github/**`, `scripts/**` |

---

## Example: Authentication Feature

**Task:** "Implement password reset flow"

### Cycle 1

**DISPATCH:**
```yaml
keywords: ["password", "reset", "forgot", "email"]
patterns: ["src/**/*.ts"]
```

**EVALUATE:**
```yaml
- src/auth/login.ts: 0.4 (has password, but login not reset)
- src/email/template.ts: 0.6 (email templates exist)
- src/types/user.ts: 0.7 (has User type we need)
```

**REFINE:**
- Gap: No reset token type found
- Gap: No email sending service
- Add: Search for "token", "sendEmail"

### Cycle 2

**DISPATCH (refined):**
```yaml
keywords: ["token", "sendEmail", "verificationToken"]
patterns: ["src/auth/**", "src/email/**", "src/types/**"]
```

**EVALUATE:**
```yaml
- src/email/service.ts: 0.9 (has sendEmail function!)
- src/auth/verification.ts: 0.8 (has token generation)
- src/types/auth.ts: 0.9 (has Token type)
```

**STOP:** Found 3 files with relevance ≥0.8

### Final Context

```
Files loaded:
1. src/email/service.ts (0.9)
2. src/auth/verification.ts (0.8)
3. src/types/auth.ts (0.9)
4. src/types/user.ts (0.7)

Ready to implement password reset flow.
```

---

## Best Practices

1. **Start broad, narrow progressively**: Don't over-specify initial queries
2. **Learn codebase terminology**: First cycle reveals naming conventions
3. **Track what's missing**: Explicit gap identification drives refinement
4. **Stop at "good enough"**: 3 high-relevance files beats 10 mediocre ones
5. **Exclude confidently**: Low-relevance files won't become relevant
6. **Cache results**: Reuse retrieval for similar tasks
7. **Update on change**: Re-run if task scope changes

---

## Version

| Component | Version |
|-----------|---------|
| Iterative Retrieval | 1.0.0 |
| Last Updated | 2026-01-27 |
