# Phase 3: Implementation Templates

<!-- LOAD ON-DEMAND -->

**CodeMaestro v1.0.0**
**Phase:** 3 (Implementation) - Senior Developer
**Purpose:** Templates for task completion, code reviews, and implementation tracking

---

## Template 1: Task Completion Report {#task-completion}

```markdown
# Task Completion: T-[M].[Mod].[Task]

**Task:** [Task Name]
**Module:** M[X]-MOD[Y] - [Module Name]
**Assigned:** [Developer name]
**Status:** ✅ Complete
**Date:** [YYYY-MM-DD]

---

## Task Summary

**Description:** [What was implemented]

**Acceptance Criteria Addressed:**
- AC-[ID]: [Criterion description] - ✅ Verified

---

## Implementation Details

**Files Changed:**
- `[file1.ts]`: [What changed and why]
- `[file2.ts]`: [What changed and why]
- `[test-file.test.ts]`: [Tests added]

**State Management:**
- **Pattern Used:** [Redux / Zustand / Context API / etc.]
- **Sync Strategy:** [Optimistic / Pessimistic / etc.]
- **Source of Truth:** [Component or service that owns state]
- **Mutation Points:** [Where state changes]

**Code Stats:**
- Lines Added: [N]
- Lines Removed: [M]
- Files Changed: [K]
- Tests Added: [X]

---

## Effort Tracking

**Estimated Effort:** [X] hours
**Actual Effort:** [Y] hours
**Variance:** [±Z%]

**Variance Explanation:**
[If variance >20%, explain why estimate was off]

**Breakdown:**
- Design: [X] hours
- Implementation: [Y] hours
- Testing: [Z] hours
- Code Review: [W] hours

---

## Testing

**Tests Written:**
- Unit tests: [N] tests in `[test-file]`
- Integration tests: [M] tests in `[integration-file]`

**Coverage:**
- Module coverage: [X]%
- Overall project coverage: [Y]%

**Test Results:**
```bash
✅ All tests passing ([N]/[N])
✅ Coverage meets threshold (≥70%)
```

---

## Code Review

**Reviewer:** [Name or "Self-review"]
**Status:** ✅ Approved

**Checklist:**
- [x] SOLID principles applied
- [x] DRY - no code duplication
- [x] KISS - simple, readable solution
- [x] Naming conventions followed (D24)
- [x] Docstrings added for public APIs (D26)
- [x] Tests written and passing (B16)
- [x] No placeholders (B17)
- [x] No orphaned TODOs (B18)
- [x] State management documented (B15)

**Issues Found:** [None / List issues and resolutions]

---

## Constraint Compliance

- ✅ A7: All APIs confirmed (no assumptions)
- ✅ B15: State management optimized
- ✅ B17: No placeholder implementations
- ✅ B18: No orphaned TODOs
- ✅ D22: Single Responsibility Principle
- ✅ D24: Consistent naming conventions
- ✅ D26: Comprehensive docstrings

---

## Decisions Made

**Decision 1:** [Decision description]
- **Rationale:** [Why]
- **Alternatives:** [What else was considered]
- **Logged:** [Decision log entry ID]

---

## Patterns Reused

**From Knowledge Base:**
- Pattern P-[ID]: [Pattern name and how it was applied]

**New Patterns Created:**
- [Pattern name]: [Brief description - will document in KB if successful]

---

## Failures & Learnings

**Challenges Encountered:**
- [Challenge 1]: [How resolved]
- [Challenge 2]: [How resolved]

**Lessons Learned:**
- [Lesson 1]
- [Lesson 2]

---

## Git Commit

**Commit SHA:** [Git commit hash]

**Commit Message:**
```
feat: Implement [task description]

Task: T-[M].[Mod].[Task]
Module: M[X]-MOD[Y]
AC: AC-[ID]

Changes:
- [Change 1]
- [Change 2]

Tests: [X] unit, [Y] integration
Coverage: [Z]%
State: [State management approach]

Constraints: A7, B15, B17, D22, D24, D26
```

---

## Version

**Report Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 2: Code Review Checklist {#code-review-checklist}

```markdown
# Code Review Checklist: T-[M].[Mod].[Task]

**Task:** [Task Name]
**Developer:** [Name]
**Reviewer:** [Name]
**Date:** [YYYY-MM-DD]

---

## Architecture & Design

- [ ] **Follows blueprint patterns** from Phase 2
- [ ] **SOLID principles** applied appropriately
- [ ] **Single Responsibility** - each component has one purpose (D22)
- [ ] **Layer separation** maintained (D29)
- [ ] **Module boundaries** respected
- [ ] **Design patterns** correctly implemented

---

## Code Quality

- [ ] **KISS** - solution is simple and readable
- [ ] **DRY** - no code duplication (D25)
- [ ] **Small functions** - functions <50 lines, focused (D23)
- [ ] **Naming conventions** - consistent and clear (D24)
- [ ] **Comments** - code is self-documenting, comments explain "why" not "what"
- [ ] **Magic numbers** - constants extracted and named
- [ ] **Code formatting** - automated formatter applied (D28)

---

## State Management

- [ ] **Single source of truth** identified and documented (A10, B15)
- [ ] **Data flow** is unidirectional and clear
- [ ] **Mutation boundaries** clearly defined
- [ ] **Side effects** isolated from pure logic
- [ ] **State strategy** documented in module context

---

## Testing

- [ ] **Unit tests** written for all functions/classes (B16)
- [ ] **Integration tests** for module interactions
- [ ] **Test coverage** ≥70% for this module
- [ ] **Tests are readable** with clear AAA pattern (Arrange, Act, Assert)
- [ ] **Edge cases** covered
- [ ] **Error cases** tested
- [ ] **All tests passing** locally

---

## Security

- [ ] **Input validation** for all user inputs
- [ ] **No hardcoded secrets** - use environment variables
- [ ] **SQL injection** prevented (parameterized queries)
- [ ] **XSS** prevented (input sanitization)
- [ ] **Authentication** enforced where required
- [ ] **Authorization** checked appropriately
- [ ] **Sensitive data** not logged
- [ ] **Error messages** don't leak sensitive information

---

## Documentation

- [ ] **Public APIs** have comprehensive docstrings (D26)
- [ ] **Parameters** documented with types
- [ ] **Return values** documented
- [ ] **Exceptions** documented
- [ ] **Usage examples** provided for complex APIs
- [ ] **README** updated if public interface changed
- [ ] **Module context** document updated

---

## Constraints

- [ ] **A7:** All APIs confirmed via Context7 (no assumptions)
- [ ] **B17:** No placeholder implementations
- [ ] **B18:** No TODOs without task IDs
- [ ] **D22:** Single Responsibility Principle
- [ ] **D24:** Consistent naming conventions
- [ ] **D26:** Comprehensive docstrings

---

## Performance

- [ ] **No obvious performance issues** (N+1 queries, memory leaks)
- [ ] **Appropriate algorithms** - time complexity acceptable
- [ ] **Resource usage** - memory, CPU reasonable
- [ ] **Caching** used where appropriate
- [ ] **A9:** No premature optimization

---

## Maintainability

- [ ] **Easy to understand** - clear intent
- [ ] **Easy to modify** - well-structured
- [ ] **Easy to test** - testable design
- [ ] **Follows project conventions**
- [ ] **Minimal coupling** - dependencies are necessary
- [ ] **Future-proof** - no hardcoded assumptions

---

## Acceptance Criteria

**Mapped to this task:**
- [ ] AC-[ID]: [Verification method] - [Evidence]

---

## Review Decision

**Decision:** [✅ Approved / ⚠️ Approved with Comments / ❌ Rejected]

**Comments:**
- [Comment 1]
- [Comment 2]

**Action Items:**
- [ ] [Action item 1]
- [ ] [Action item 2]

---

## Version

**Checklist Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 3: Decision Log Entry {#decision-log}

```markdown
# Decision Log Entry: DEC-[YYYY-MM-DD]-[NNN]

**Date:** [YYYY-MM-DD]
**Task:** T-[M].[Mod].[Task]
**Developer:** [Name]
**Type:** [Implementation / Refactoring / Bug Fix / Optimization]

---

## Decision

**What:** [What decision was made]

**Context:** [What situation led to this decision]

---

## Rationale

**Why this approach:**
1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

---

## Alternatives

| Option | Pros | Cons | Chosen |
|--------|------|------|--------|
| Option A | [Pros] | [Cons] | ✅ |
| Option B | [Pros] | [Cons] | ❌ |

---

## Impact

**Files Affected:**
- `[file1]`
- `[file2]`

**Components Affected:**
- [Component 1]
- [Component 2]

**Risk Assessment:**
- **Risk Level:** [Low / Medium / High]
- **Mitigation:** [How risks are addressed]

---

## Constraints

**Constraint Compliance:**
- [Constraint ID]: [How it's satisfied]

---

## Future Considerations

[Any implications for future work or technical debt]

---

## Version

**Decision Log Version:** 1.0
**CodeMaestro:** v1.0.0
```

---

## Template 4: Estimation Tracking {#estimation-tracking}

```markdown
# Effort Estimation Tracking

**Project:** [Project Name]
**Module:** M[X]-MOD[Y]
**Sprint/Iteration:** [N]

---

## Task Estimates vs Actuals

| Task ID | Task Name | Estimated | Actual | Variance | Variance % | Notes |
|---------|-----------|-----------|--------|----------|------------|-------|
| T-1.1.1 | Setup environment | 4h | 6h | +2h | +50% | Underestimated dependency setup |
| T-1.1.2 | Configure database | 8h | 7h | -1h | -12.5% | Reused pattern from KB |
| T-1.1.3 | Integration tests | 6h | 9h | +3h | +50% | Edge cases more complex |

---

## Summary Statistics

**Total Estimated:** [X] hours
**Total Actual:** [Y] hours
**Overall Variance:** [±Z%]

**Accuracy:**
- On target (±10%): [N]% of tasks
- Moderate variance (±25%): [M]% of tasks
- High variance (>25%): [K]% of tasks

---

## Variance Analysis

### Underestimated Tasks (Actual > Estimate)

| Task ID | Variance | Root Cause | Learning |
|---------|----------|------------|----------|
| T-1.1.1 | +50% | Unfamiliar with library setup | Add buffer for new technologies |
| T-1.1.3 | +50% | Edge cases not considered | More thorough requirements analysis |

### Overestimated Tasks (Actual < Estimate)

| Task ID | Variance | Root Cause | Learning |
|---------|----------|------------|----------|
| T-1.1.2 | -12.5% | Reused existing pattern | Check KB before estimating |

---

## Patterns Identified

**Estimation Multipliers:**
- New technology: 1.5x base estimate
- Pattern reuse: 0.8x base estimate
- Complex integration: 1.3x base estimate
- Familiar domain: 1.0x base estimate

**Apply to future estimates in this project and update knowledge base for future projects.**

---

## Recommendations

**For Next Sprint:**
- [Recommendation 1: e.g., Add 20% buffer for integration tasks]
- [Recommendation 2: e.g., Search KB before estimating similar tasks]

**For Future Projects:**
- [Learning to add to knowledge base]

---

## Version

**Tracking Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 5: Module Context Package {#module-context-implementation}

```markdown
# Module Context: M[X]-MOD[Y] [Implementation Phase]

**Module:** [Module Name]
**Milestone:** [X] - [Milestone Name]
**Status:** 🔨 In Progress
**Current Task:** T-[M].[Mod].[Task]

---

## Architectural Vision (Recall)

**Purpose:** [Why this module exists]
**Core Responsibility:** [Single primary responsibility]

---

## State Management

**Pattern:** [Redux / Zustand / Context API / Event Sourcing]

**Sync Strategy:**
- [Optimistic updates with rollback / Pessimistic locking / etc.]

**Source of Truth:**
- [Component/Service that owns the state]

**Data Flow:**
```
User Action → Action Creator → Reducer → Store Update → UI Re-render
```

**Mutation Points:**
- `actions/[module].ts`: [Mutations defined here]
- `reducers/[module].ts`: [State updates here]

---

## Implementation Progress

**Tasks in this Module:**
- [x] T-[M].[Mod].1: [Task name] - ✅ Complete
- [ ] T-[M].[Mod].2: [Task name] - 🔨 In Progress
- [ ] T-[M].[Mod].3: [Task name] - ⏳ Pending

---

## Design Decisions

**Key Decisions Made:**

### Decision: [Decision name]
- **What:** [What was decided]
- **Why:** [Rationale]
- **Trade-off:** [What was sacrificed]
- **Logged:** DEC-[YYYY-MM-DD]-[NNN]

---

## Patterns Applied

**From Knowledge Base:**
- P-[ID]: [Pattern name]
  - **Applied to:** [Where in code]
  - **Result:** [How it worked]

**New Patterns:**
- [Pattern name]: [Description - document in KB if successful]

---

## Challenges & Solutions

**Challenge 1:** [Description]
- **Root Cause:** [Why it was challenging]
- **Solution:** [How it was resolved]
- **Prevention:** [How to avoid in future]

---

## Constraints Verification

- [x] A7: All APIs confirmed via Context7
- [x] B15: State management optimized and documented
- [x] B17: No placeholder implementations
- [x] B18: No orphaned TODOs
- [x] D22: Single Responsibility Principle
- [x] D26: Docstrings for all public APIs

---

## Next Steps

**Upcoming Tasks:**
- T-[M].[Mod].[Next]: [Task description]

**Dependencies to Complete:**
- T-[X].[Y].[Z]: [Blocking task description]

---

## Version

**Module Context Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 6: Failure Documentation {#failure-doc}

```markdown
# Failure Documentation: F-[NNN]

**Date:** [YYYY-MM-DD]
**Task:** T-[M].[Mod].[Task]
**Severity:** [Low / Medium / High / Critical]
**Status:** [Investigating / Resolved / Mitigated]

---

## Symptom

**What Happened:**
[Describe the observable problem - error messages, unexpected behavior, etc.]

**When Discovered:**
- Phase: [Phase number]
- Activity: [What was being done when discovered]
- Environment: [Development / Staging / Production]

---

## Root Cause

**Investigation:**
[How the root cause was identified]

**Root Cause:**
[The fundamental reason for the failure]

**Contributing Factors:**
- [Factor 1]
- [Factor 2]

---

## Resolution

**Solution Applied:**
[What was done to fix the issue]

**Code Changes:**
- `[file1]`: [What changed]
- `[file2]`: [What changed]

**Tests Added:**
- [Test 1]: [To prevent regression]
- [Test 2]: [Edge case coverage]

---

## Prevention

**How to Avoid in Future:**
1. [Prevention measure 1]
2. [Prevention measure 2]
3. [Prevention measure 3]

**Process Improvements:**
- [Improvement to development process]
- [Improvement to review process]

**Knowledge Base Entry:**
- Will document as failure pattern: F-[ID]

---

## Impact

**Time Lost:** [X] hours

**Affected Components:**
- [Component 1]
- [Component 2]

**User Impact:**
- [None / Low / Medium / High]
- [Description of user impact]

---

## Related Constraints

**Violated Constraints:**
- [Constraint ID]: [How it was violated]

**How to Prevent Violation:**
- [Enforcement improvement]

---

## Version

**Failure Doc Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Usage Notes

**When to Load Templates:**
- Task Completion Report: After completing each task
- Code Review Checklist: Before and during code review
- Decision Log: When making implementation decisions
- Estimation Tracking: End of milestone or sprint
- Module Context: When starting or switching modules
- Failure Documentation: When bugs or issues are discovered

**Skill Tier Adaptations:**
- **Beginner:** Complete all sections with detailed notes
- **Advanced:** Focus on key sections, concise notes
- **Ninja:** Minimal documentation, track only critical items

---

## Version

**Templates Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** 2026-01-13
