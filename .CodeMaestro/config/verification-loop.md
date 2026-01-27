# Automated Verification Loop

> **Purpose:** Comprehensive 6-phase verification for code quality, security, and release readiness.
> **Load Priority:** Reference from Phase 3 (incremental) and Phase 4 (full).

---

## Overview

The Verification Loop automates quality checks across 6 phases: Build, Type Check, Lint, Test Suite, Security Scan, and Diff Review. Run it after completing features, before PRs, or before phase transitions.

---

## When to Run

| Trigger | Mode | Phases |
|---------|------|--------|
| "verify my changes" | Quick | Build, Types, Lint |
| Task completion (Phase 3) | Standard | Build, Types, Lint, Tests |
| Before PR / checkpoint | Full | All 6 phases |
| Phase 4 entry | Full + Evidence | All 6 phases + evidence package |
| "security check" | Focused | Security only |

---

## 6-Phase Verification

### Phase 1: Build Verification

**Goal:** Confirm project compiles without errors.

```bash
# JavaScript/TypeScript (auto-detect package manager)
npm run build 2>&1 | tail -20
# OR: pnpm build / yarn build

# Python
python -m py_compile src/**/*.py 2>&1 | head -20

# Rust
cargo build 2>&1 | tail -20

# Go
go build ./... 2>&1 | tail -20
```

**Stop Condition:** If build fails, STOP and fix before continuing.

**Pass Criteria:** Exit code 0, no errors in output.

---

### Phase 2: Type Check

**Goal:** Ensure type safety across codebase.

```bash
# TypeScript
npx tsc --noEmit 2>&1 | head -30

# Python (with type hints)
pyright . 2>&1 | head -30
# OR: mypy . 2>&1 | head -30

# Flow (JavaScript)
npx flow check 2>&1 | head -30
```

**Pass Criteria:** 0 type errors. Warnings are reported but non-blocking.

**Report:**
```
Type Check: [PASS/FAIL]
- Errors: X
- Warnings: Y
```

---

### Phase 3: Lint Check

**Goal:** Enforce code style and catch common issues.

```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30
# OR: npx eslint . --max-warnings 0

# Python
ruff check . 2>&1 | head -30
# OR: flake8 . 2>&1 | head -30

# Rust
cargo clippy 2>&1 | head -30

# Go
golangci-lint run 2>&1 | head -30
```

**Pass Criteria:** 0 errors. <10 warnings recommended.

---

### Phase 4: Test Suite

**Goal:** Validate functionality and coverage.

```bash
# JavaScript/TypeScript
npm run test -- --coverage 2>&1 | tail -50

# Python
pytest --cov=src --cov-report=term-missing 2>&1 | tail -50

# Rust
cargo test 2>&1 | tail -50

# Go
go test -cover ./... 2>&1 | tail -50
```

**Pass Criteria:**
- All tests pass
- Coverage ≥70% (mandatory threshold)
- No flaky tests (repeated failures on same test)

**Report:**
```
Test Suite: [PASS/FAIL]
- Total: X tests
- Passed: Y
- Failed: Z
- Skipped: W
- Coverage: XX%
- Threshold: 70% [MET/NOT MET]
```

---

### Phase 5: Security Scan

**Goal:** Identify vulnerabilities and security issues.

#### Dependency Vulnerabilities
```bash
# JavaScript/Node.js
npm audit --audit-level=high 2>&1 | head -30

# Python
pip-audit 2>&1 | head -30
# OR: safety check 2>&1 | head -30

# Rust
cargo audit 2>&1 | head -30
```

#### Code Security Patterns
```bash
# Check for hardcoded secrets
grep -rn "sk-\|api_key=\|password=\|secret=" --include="*.ts" --include="*.js" --include="*.py" . 2>/dev/null | head -10

# Check for debug statements left in code
grep -rn "console\.log\|print(\|debugger" --include="*.ts" --include="*.tsx" --include="*.py" src/ 2>/dev/null | head -10

# Check for TODO without task reference
grep -rn "TODO\|FIXME\|HACK" --include="*.ts" --include="*.py" src/ 2>/dev/null | grep -v "T-[0-9]" | head -10
```

**Pass Criteria:**
- 0 critical/high vulnerabilities (mandatory)
- No hardcoded secrets
- No debug statements in production code

**Report:**
```
Security Scan: [PASS/FAIL]
- Critical vulnerabilities: X
- High vulnerabilities: Y
- Medium vulnerabilities: Z
- Hardcoded secrets: X found
- Debug statements: Y found
- Orphan TODOs: Z found
```

---

### Phase 6: Diff Review

**Goal:** Validate scope of changes and catch unintended modifications.

```bash
# Summary of changes
git diff --stat

# Changed files list
git diff HEAD~1 --name-only

# Lines changed
git diff --shortstat

# Check for large files added
git diff --cached --diff-filter=A --name-only | xargs -I {} sh -c 'test -f "{}" && wc -c < "{}"' | awk '$1 > 100000 {print "Large file: " $1 " bytes"}'
```

**Review Checklist:**
- [ ] No unintended file changes
- [ ] No accidental file deletions
- [ ] Changes match task scope
- [ ] No sensitive data in diff
- [ ] Commit message matches changes

---

## Output Format

### Summary Report

```
═══════════════════════════════════════════════════════════════
📋 VERIFICATION REPORT
═══════════════════════════════════════════════════════════════

Build:     ✅ PASS
Types:     ✅ PASS (3 warnings)
Lint:      ✅ PASS (7 warnings)
Tests:     ✅ PASS (42/42 passed, 78% coverage)
Security:  ✅ PASS (0 critical, 2 medium)
Diff:      ✅ 8 files changed, +234/-56

───────────────────────────────────────────────────────────────
Overall:   ✅ READY for merge
───────────────────────────────────────────────────────────────

Quality Gates:
  ✅ Test coverage ≥70% (78%)
  ✅ Security: 0 critical/high (0)
  ✅ All acceptance criteria verified

Next Steps:
  1. Create pull request
  2. Request code review
  3. Merge after approval
═══════════════════════════════════════════════════════════════
```

### Failure Report

```
═══════════════════════════════════════════════════════════════
📋 VERIFICATION REPORT
═══════════════════════════════════════════════════════════════

Build:     ✅ PASS
Types:     ✅ PASS
Lint:      ⚠️ WARN (15 warnings)
Tests:     ❌ FAIL (40/42 passed, 65% coverage)
Security:  ❌ FAIL (1 critical)
Diff:      ✅ 8 files changed

───────────────────────────────────────────────────────────────
Overall:   ❌ NOT READY - Fix 3 issues before merge
───────────────────────────────────────────────────────────────

Issues to Fix:

1. [CRITICAL] Security vulnerability in lodash@4.17.20
   Fix: npm update lodash
   
2. [BLOCKING] Test failure in auth.test.ts:45
   Error: Expected token to be valid
   
3. [BLOCKING] Coverage below threshold
   Current: 65%, Required: 70%
   Missing: src/utils/validation.ts (0% coverage)

Quality Gates:
  ❌ Test coverage ≥70% (65%)
  ❌ Security: 0 critical/high (1 critical)
  ✅ All acceptance criteria verified

═══════════════════════════════════════════════════════════════
```

---

## Thresholds Configuration

| Check | Required (Blocking) | Warning | Target |
|-------|---------------------|---------|--------|
| Build | Pass | - | - |
| Type Errors | 0 | - | 0 |
| Lint Errors | 0 | >5 warnings | 0 warnings |
| Test Pass Rate | 100% | <100% | 100% |
| Test Coverage | ≥70% | <80% | 85% |
| Critical/High Vulns | 0 | - | 0 |
| Medium Vulns | - | >5 | 0 |
| Debug Statements | 0 | - | 0 |
| Hardcoded Secrets | 0 | - | 0 |

---

## Integration Points

### Phase 3 (Implementation)
- Run after each task completion
- Focus on Build, Types, Lint, Tests
- Quick feedback loop

### Phase 4 (Verification)
- Run full 6-phase verification
- Generate evidence package
- GO/NO-GO decision input

### Before PR
- Run full verification
- Include report in PR description
- Block merge if fails

### CI/CD
```yaml
# Example GitHub Actions step
- name: Run Verification Loop
  run: |
    npm run build
    npm run typecheck
    npm run lint
    npm run test -- --coverage
    npm audit --audit-level=high
```

---

## Natural Language Triggers

| Say this... | Runs... |
|-------------|---------|
| "verify my changes" | Full verification |
| "quick check" | Build, Types, Lint only |
| "run tests" | Test phase only |
| "security scan" | Security phase only |
| "check coverage" | Test phase with coverage focus |
| "am I ready to merge" | Full verification + summary |

---

## Version

| Component | Version |
|-----------|---------|
| Verification Loop | 1.0.0 |
| Last Updated | 2026-01-27 |
