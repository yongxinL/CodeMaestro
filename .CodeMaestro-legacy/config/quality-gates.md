# Quality Gate Validation System

**Version:** 1.0
**Status:** Active
**Integrated:** Phases 3-4
**Risk:** ✅ ZERO - Adds validation, doesn't remove Phase 4 checks

---

## Overview

The Quality Gate Validation System enables incremental quality checking during Phase 3 (Implementation) to catch issues early before Phase 4 (Verification). This "shift-left" approach reduces rework and ensures smooth phase transitions.

## Quality Gates

CodeMaestro enforces three non-negotiable quality gates:

| Gate | Constraint | Threshold | Blocking | Phase |
|------|-----------|-----------|----------|-------|
| **Test Coverage** | E30 | ≥ 70% | Yes | 3, 4 |
| **Security Issues** | E31 | 0 critical/high | Yes | 3, 4 |
| **Acceptance Criteria** | E33 | 100% pass rate | Yes | 4 |

**Threshold Details:** See [thresholds.md](thresholds.md) for complete definitions, rationale, and project-specific override instructions.

---

## Command: `/validate quality`

### Purpose
Run all quality gate checks incrementally during Phase 3 to identify issues before Phase 4.

### Syntax

```bash
/validate quality     # Run all quality gates
/validate tests       # Test coverage only
/validate security    # Security issues only
/validate ac          # Acceptance criteria only
```

### When to Use

**During Phase 3 (Implementation):**
- After completing each task or module
- Before committing major changes
- Before requesting code review
- At end of day/sprint

**Benefits:**
- Catch issues early (cheaper to fix)
- Smooth Phase 4 transition
- Reduced rework cycles
- Continuous quality feedback

---

## Output Format

### Full Quality Gate Check

```bash
> /validate quality

Checking Quality Gates...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Quality Gate 1: Test Coverage (E30)
   Target: ≥ 70%
   Current: 45% ⚠️ BELOW THRESHOLD

   Coverage by Module:
   ✅ auth.js           92% (excellent)
   ✅ database.js       78% (pass)
   ⚠️  api/users.js     58% (below threshold)
   🚫 api/tasks.js      12% (critical gap)
   ⚠️  utils/helpers.js 45% (below threshold)

   Missing Coverage:
   📁 api/tasks.js
      - Line 45-78: Task creation logic (uncovered)
      - Line 120-145: Task update logic (uncovered)
      - Line 200-230: Task deletion logic (uncovered)

   Action Required:
   ✓ Add tests for api/tasks.js (priority: HIGH)
   ✓ Add tests for api/users.js (priority: MEDIUM)
   ✓ Add tests for utils/helpers.js (priority: MEDIUM)

   Estimated: 15 test cases needed (+25% coverage)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Quality Gate 2: Security Issues (E31)
   Target: 0 critical/high
   Current: 2 High 🚫 BLOCKING

   Security Issues:
   🟠 High: SQL Injection in user query (api/users.js:89)
      Description: User input not sanitized before SQL query
      Recommendation: Use parameterized queries or ORM
      Reference: OWASP A03:2021 Injection

   🟠 High: XSS in search component (frontend/Search.jsx:34)
      Description: User input rendered without escaping
      Recommendation: Use React's JSX auto-escaping or DOMPurify
      Reference: OWASP A07:2021 XSS

   🟡 Medium: Weak password validation (auth.js:120)
      Description: Minimum password length too short (6 chars)
      Recommendation: Require 12+ characters with complexity
      Reference: NIST SP 800-63B

   Action Required:
   ✓ Fix SQL injection (api/users.js:89) - CRITICAL
   ✓ Fix XSS (frontend/Search.jsx:34) - CRITICAL
   ✓ Review security checklist (see .CodeMaestro/config/security-checklist.md)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Quality Gate 3: Acceptance Criteria (E33)
   Target: 100% pass rate
   Current: 78% ⚠️ BELOW THRESHOLD

   AC Results:
   ✅ AC-1.1: User registration          PASS
   ✅ AC-1.2: User login                 PASS
   ✅ AC-1.3: Password reset             PASS
   ✅ AC-2.1: Task creation              PASS
   🚫 AC-2.2: Task update                FAIL
   🚫 AC-2.3: Task deletion              FAIL
   ✅ AC-3.1: Task list view             PASS
   ⚠️  AC-3.2: Task filtering            PARTIAL (2/3 scenarios pass)

   Failed Acceptance Criteria:
   🚫 AC-2.2: Task update
      Given: User has existing task
      When: User updates task title
      Then: Task title is updated ✅
      And: Task updated_at timestamp is set ✅
      And: User receives success notification 🚫 FAILED

      Failure: Success notification not implemented

   🚫 AC-2.3: Task deletion
      Given: User has existing task
      When: User deletes task
      Then: Task is removed from database 🚫 FAILED

      Failure: Deletion API endpoint not implemented

   Action Required:
   ✓ Implement success notification (AC-2.2)
   ✓ Implement task deletion endpoint (AC-2.3)
   ✓ Fix partial AC-3.2 (filtering by priority)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Overall Quality Gate Status: 🚫 FAILED

   Gate 1 (Coverage):  ⚠️  FAIL (45% < 70%)
   Gate 2 (Security):  🚫 FAIL (2 high issues)
   Gate 3 (AC):        ⚠️  FAIL (78% < 100%)

   Cannot proceed to Phase 4 until gates pass.

   Priority Actions:
   1. Fix 2 high-severity security issues (CRITICAL)
   2. Add 15 test cases (+25% coverage to reach 70%)
   3. Implement 2 failed AC scenarios
   4. Fix 1 partial AC scenario

   Estimated Effort: 8-12 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use /next to continue implementation.
```

---

## Integration Points

### Phase 3 (Implementation) Workflow

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Implementation                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. /next → Get next task                                  │
│     ↓                                                       │
│  2. Implement task                                          │
│     ↓                                                       │
│  3. /validate quality → Check quality gates  ← NEW!        │
│     ↓                                                       │
│  4. Fix issues if gates fail                                │
│     ↓                                                       │
│  5. /validate quality → Confirm gates pass                  │
│     ↓                                                       │
│  6. /commit → Commit changes                                │
│     ↓                                                       │
│  7. Repeat until all tasks complete                         │
│     ↓                                                       │
│  8. /validate quality → Final check before Phase 4          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 4 (Verification) Workflow

Phase 4 still performs full verification, but quality gates should already pass:

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: Verification                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Run full test suite                                     │
│  2. /security scan → Full security scan                     │
│  3. /validate quality → Verify gates still pass             │
│  4. Manual testing (exploratory, UAT)                       │
│  5. Generate evidence package                               │
│  6. GO/NO-GO decision                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Quality Gate Details

### Gate 1: Test Coverage (E30)

**Constraint:** E30 - Test coverage ≥ 70%
**Threshold:** 70% line coverage
**Blocking:** Yes
**Measured:** Lines, branches, functions, statements

**Detection:**

```bash
# JavaScript/Node.js (Jest, Mocha + nyc)
npm test -- --coverage

# Python (pytest-cov)
pytest --cov=src --cov-report=term-missing

# Rust (cargo-tarpaulin)
cargo tarpaulin --out Xml

# Go
go test -cover ./...
```

**Parsing:**
- Extract overall coverage percentage
- Extract per-file coverage
- Identify uncovered lines/branches
- Generate coverage gap report

**Output Template:**
```markdown
## Test Coverage Report

**Overall:** 72% ✅ (Target: 70%)

### By Module
| Module | Coverage | Status |
|--------|----------|--------|
| auth.js | 92% | ✅ Excellent |
| database.js | 78% | ✅ Pass |
| api/users.js | 58% | ⚠️ Below |
| api/tasks.js | 12% | 🚫 Critical |

### Coverage Gaps
📁 api/tasks.js (12%)
   Lines 45-78: Task creation logic
   Lines 120-145: Task update logic

**Action:** Add 15 test cases
```

---

### Gate 2: Security Issues (E31)

**Constraint:** E31 - Zero critical/high security issues
**Threshold:** 0 critical, 0 high
**Blocking:** Yes (critical/high only)
**Measured:** Dependency vulnerabilities, code security issues

**Detection:**

**Dependency Vulnerabilities:**
```bash
# See security-scanning.md for full details
/security scan
```

**Code Security Issues:**
```bash
# JavaScript (ESLint security plugin)
npm run lint:security

# Python (bandit)
bandit -r src/

# Rust (cargo-audit + cargo-clippy)
cargo audit
cargo clippy -- -W clippy::security

# Static Analysis (SonarQube, Snyk)
sonar-scanner
snyk test
```

**Common Issues to Check:**
- SQL Injection (parameterized queries)
- XSS (input sanitization, output encoding)
- CSRF (tokens, SameSite cookies)
- Authentication bypass
- Insecure cryptography
- Secrets in code
- Path traversal

**Output Template:**
```markdown
## Security Issues Report

**Critical:** 0 ✅
**High:** 2 🚫 BLOCKING
**Medium:** 3 ⚠️
**Low:** 5 ℹ️

### High Severity (BLOCKING)
1. SQL Injection (api/users.js:89)
   - Fix: Use parameterized queries
2. XSS (frontend/Search.jsx:34)
   - Fix: Use DOMPurify

**Action:** Fix 2 high issues before Phase 4
```

---

### Gate 3: Acceptance Criteria (E33)

**Constraint:** E33 - 100% AC pass rate
**Threshold:** 100% (all scenarios pass)
**Blocking:** Yes
**Measured:** Integration/E2E test results mapped to AC

**Detection:**

```bash
# Run integration/E2E tests
npm run test:integration
npm run test:e2e

# Parse test results
# Map test names to AC IDs (convention: AC-X.Y in test name)
```

**Test Naming Convention:**
```javascript
// Example: Jest/Mocha
describe('AC-2.2: Task update', () => {
  it('updates task title', async () => { /* ... */ })
  it('sets updated_at timestamp', async () => { /* ... */ })
  it('sends success notification', async () => { /* ... */ })
})

// Python pytest
def test_ac_2_2_update_task_title():
    """AC-2.2: Task update - updates task title"""
    # ...
```

**Output Template:**
```markdown
## Acceptance Criteria Report

**Pass Rate:** 78% ⚠️ (Target: 100%)
**Passed:** 7/9
**Failed:** 2/9

### Failed AC
🚫 AC-2.2: Task update
   - Scenario 3: Success notification (not implemented)

🚫 AC-2.3: Task deletion
   - Scenario 1: Delete from database (endpoint missing)

**Action:** Implement 2 missing scenarios
```

---

## Incremental Validation Workflow

### Recommended Frequency

| Trigger | Command | Purpose |
|---------|---------|---------|
| After each task | `/validate quality` | Catch task-specific issues |
| Before commit | `/validate quality` | Ensure commit doesn't break gates |
| End of day/sprint | `/validate quality` | Track overall progress |
| Before Phase 4 | `/validate quality` | Final check before transition |

### Example Session

```bash
# Start of day
> /status
Phase 3, Task T-2.1: Implement user API (in progress)

# Implement task...

# Check quality before commit
> /validate quality
⚠️ Test coverage: 65% (need 5% more)
✅ Security: 0 issues
⚠️ AC: 1 scenario failing

# Fix issues
[Add 3 test cases]
[Fix failing AC scenario]

# Re-check
> /validate quality
✅ Test coverage: 72%
✅ Security: 0 issues
✅ AC: 100% pass

# Commit
> /commit
[Git commit generated]

# Move to next task
> /next
```

---

## Configuration

### Custom Thresholds

Override default thresholds in `.CodeMaestro/config/thresholds.md`:

```markdown
# Quality Gate Thresholds

## Test Coverage (E30)
- **Default:** 70%
- **Project Override:** 80% (high-risk finance app)
- **Rationale:** Financial calculations require higher coverage

## Security Issues (E31)
- **Default:** 0 critical/high
- **Project Override:** 0 critical/high/medium
- **Rationale:** Healthcare data requires stricter security

## Acceptance Criteria (E33)
- **Default:** 100%
- **Project Override:** 100% (cannot be changed)
- **Rationale:** Core product requirement
```

### Ecosystem Detection

System auto-detects project ecosystem:

```javascript
// Detection logic
if (exists('package.json')) {
  ecosystem = 'node'
  testCommand = 'npm test -- --coverage'
  lintCommand = 'npm run lint'
} else if (exists('requirements.txt') || exists('pyproject.toml')) {
  ecosystem = 'python'
  testCommand = 'pytest --cov'
  lintCommand = 'pylint src/'
} else if (exists('Cargo.toml')) {
  ecosystem = 'rust'
  testCommand = 'cargo test'
  lintCommand = 'cargo clippy'
}
```

---

## Best Practices

### ✅ Do:
- Run `/validate quality` frequently during Phase 3
- Fix issues immediately when caught early
- Track quality gate trends over time
- Celebrate when gates pass consistently
- Use gates to guide task prioritization

### ❌ Don't:
- Skip validation until Phase 4 (defeats purpose)
- Ignore warnings (they become blockers later)
- Lower thresholds to "make gates pass"
- Commit code that fails quality gates
- Disable quality checks in CI/CD

---

## Troubleshooting

### "Coverage not detected"

**Cause:** No coverage tool configured
**Solution:**
```bash
# JavaScript
npm install --save-dev jest @jest/types

# Python
pip install pytest pytest-cov

# Rust
cargo install cargo-tarpaulin
```

### "AC pass rate always shows 0%"

**Cause:** Test names don't follow AC-X.Y convention
**Solution:** Rename tests to include AC IDs
```javascript
// Before
it('should update task', () => { /* ... */ })

// After
it('AC-2.2: should update task', () => { /* ... */ })
```

### "Security scan finds no issues but code is insecure"

**Cause:** Dependency scan doesn't catch code issues
**Solution:** Add static analysis tools (ESLint security, Bandit, etc.)

---

## Reports

### Quality Gate Report Template

**File:** `docs/verification/quality-gate-report.md`

```markdown
# Quality Gate Report

**Date:** {DATE}
**Phase:** 3 (Implementation)
**Status:** {PASS/FAIL}

---

## Summary

| Gate | Status | Current | Target |
|------|--------|---------|--------|
| Test Coverage (E30) | ✅ | 72% | 70% |
| Security Issues (E31) | ✅ | 0 high | 0 high |
| Acceptance Criteria (E33) | ✅ | 100% | 100% |

**Overall:** ✅ PASS - Ready for Phase 4

---

## Trend Analysis

### Test Coverage Over Time
Week 1: 45% → Week 2: 58% → Week 3: 72% ✅

### Security Issues Over Time
Week 1: 3 high → Week 2: 1 high → Week 3: 0 high ✅

### AC Pass Rate Over Time
Week 1: 60% → Week 2: 85% → Week 3: 100% ✅

---

**Conclusion:** All quality gates passed. System ready for Phase 4 verification.
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-13 | Initial quality gate validation system |

---

**Status:** ✅ Ready for use
**Risk:** ✅ ZERO - Adds validation, preserves Phase 4 checks
**Impact:** Shift-left quality, reduce rework, smooth phase transitions
