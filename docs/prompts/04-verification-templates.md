# Phase 4: Verification Templates

<!-- LOAD ON-DEMAND -->

**CodeMaestro v1.0.0**
**Phase:** 4 (Verification) - QA Lead
**Purpose:** Templates for evidence packages, test reports, security scans, and GO/NO-GO decisions

---

## Template 1: Evidence Package {#evidence-package}

```markdown
# Evidence Package v1.0

**Project:** [Project Name]
**Version:** [X.Y.Z]
**Date:** [YYYY-MM-DD]
**QA Lead:** [Name or "CodeMaestro System"]
**CodeMaestro:** v1.0.0

---

## Meta

| Field | Value |
|-------|-------|
| Project | [Project Name] |
| Version | [X.Y.Z] |
| Phase | 4 (Verification) |
| Verification Date | [YYYY-MM-DD] |
| QA Lead | [Name] |
| Decision | [GO / NO-GO / CONDITIONAL] |

---

## Executive Summary

**Overall Quality Assessment:** [Pass / Fail / Conditional]

**Key Metrics:**
- Test Coverage: [X]% ([✅ / ❌] E30: ≥70%)
- Security Issues: [N] Critical, [M] High ([✅ / ❌] E31: 0 C/H)
- AC Pass Rate: [K]/[Total] ([✅ / ❌] E33: 100%)
- Performance: [✅ / ❌] E32: No critical regressions
- Ethics Validation: [✅ / ❌] Passed

**Blocking Issues:** [Count]
**Non-Blocking Warnings:** [Count]

---

## 1. Test Execution Results

### Unit Tests

**Framework:** [Jest / pytest / JUnit / etc.]
**Execution Date:** [YYYY-MM-DD]

```bash
Test Suites: [X] passed, [Y] failed, [Z] total
Tests:       [A] passed, [B] failed, [C] total
Time:        [N]s
```

**Coverage Report:**
| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Line Coverage | [X]% | ≥70% | [✅ / ❌] |
| Branch Coverage | [Y]% | ≥60% | [✅ / ❌] |
| Function Coverage | [Z]% | ≥70% | [✅ / ❌] |

**Uncovered Critical Paths:**
- [Path 1]: [Reason why not covered / Plan to cover]
- [Path 2]: [Reason / Plan]

**Evidence:** `test-reports/unit-test-report-[YYYY-MM-DD].html`

### Integration Tests

**Execution Date:** [YYYY-MM-DD]

```bash
Test Suites: [X] passed, [Y] failed, [Z] total
Tests:       [A] passed, [B] failed, [C] total
Time:        [N]s
```

**Key Scenarios Tested:**
- ✅ [Scenario 1]: User registration flow
- ✅ [Scenario 2]: Payment processing
- ❌ [Scenario 3]: Concurrent user updates (FAILED - see issues)

**Evidence:** `test-reports/integration-test-report-[YYYY-MM-DD].html`

### End-to-End Tests

**Framework:** [Playwright / Cypress / Selenium]
**Execution Date:** [YYYY-MM-DD]

```bash
Test Suites: [X] passed, [Y] failed, [Z] total
Tests:       [A] passed, [B] failed, [C] total
Time:        [N]s
```

**User Journeys Tested:**
- ✅ [Journey 1]: Complete checkout flow
- ✅ [Journey 2]: Account management
- ✅ [Journey 3]: Search and filter

**Evidence:** `test-reports/e2e-test-report-[YYYY-MM-DD].html`

---

## 2. Security Validation

### SAST (Static Application Security Testing)

**Tool:** [Semgrep / SonarQube / Bandit / etc.]
**Scan Date:** [YYYY-MM-DD]

**Results:**
| Severity | Count | Status |
|----------|-------|--------|
| Critical | [N] | [✅ / ❌] E31 |
| High | [M] | [✅ / ❌] E31 |
| Medium | [K] | ⚠️ Warning |
| Low | [L] | Info |

**Critical/High Issues:**
[If any, list with CWE IDs and remediation plan]

**Medium Issues (Risk Assessment):**
- [Issue 1]: [Risk level, mitigation plan]

**Evidence:** `security-reports/sast-report-[YYYY-MM-DD].html`

### Dependency Vulnerability Scan

**Tool:** [npm audit / pip-audit / cargo audit]
**Scan Date:** [YYYY-MM-DD]

**Results:**
| Severity | Count | Status |
|----------|-------|--------|
| Critical | [N] | [✅ / ❌] E31 |
| High | [M] | [✅ / ❌] E31 |
| Medium | [K] | ⚠️ Warning |
| Low | [L] | Info |

**Critical/High Vulnerabilities:**
[If any, list with CVE IDs, affected packages, and remediation]

**Evidence:** `security-reports/dependency-audit-[YYYY-MM-DD].txt`

### Secret Detection

**Tool:** [GitGuardian / TruffleHog]
**Scan Date:** [YYYY-MM-DD]

**Results:** [✅ No secrets detected / ❌ Secrets found]

**Evidence:** `security-reports/secret-scan-[YYYY-MM-DD].txt`

---

## 3. Ethics & Bias Validation [NEW v1.0]

### Security Best Practices

- [x] Input validation implemented for all user inputs
- [x] Authentication and authorization enforced
- [x] No hardcoded secrets in codebase
- [x] HTTPS/TLS enforced for data in transit
- [x] Error messages secure (no sensitive data leakage)

### Ethical Validation (All Projects)

- [x] **User Consent:** Privacy policy clear, opt-out mechanisms provided
- [x] **Accessibility (WCAG 2.1 Level AA):**
  - Keyboard navigation: ✅ Tested
  - Screen reader compatibility: ✅ Tested
  - Color contrast: ✅ Validated
- [x] **Privacy:**
  - Minimal data collection: ✅ Only required fields
  - Retention policies: ✅ Documented
  - Deletion capability: ✅ Implemented
- [x] **Inclusivity:**
  - Non-discriminatory language: ✅ Reviewed
  - Diverse user considerations: ✅ Addressed

### AI/ML-Specific (if applicable)

- [x] **Bias Detection:** Fairness metrics measured, disparate impact <1.25
- [x] **Protected Attributes:** Sensitive data handling compliant
- [x] **Explainability:** Model decisions are interpretable
- [x] **Harm Mitigation:** Risks assessed and mitigated

### Regulatory Compliance

- [x] **GDPR** (if EU users): Consent, right to deletion, data portability
- [x] **CCPA** (if California users): Privacy notice, opt-out
- [x] **HIPAA** (if health data): N/A / Compliant
- [x] **Industry-specific:** [Regulations and compliance status]

**Evidence:** `ethics-reports/ethics-validation-[YYYY-MM-DD].md`

---

## 4. Performance Testing

### Load Testing

**Tool:** [k6 / Locust / JMeter]
**Test Date:** [YYYY-MM-DD]

**Scenarios Tested:**
| Scenario | Users | Duration | RPS | Success Rate |
|----------|-------|----------|-----|--------------|
| Normal load | 100 | 5min | 500 | 99.8% |
| Peak load | 1000 | 10min | 2000 | 98.5% |
| Stress test | 5000 | 5min | 5000 | 85.2% |

**Evidence:** `performance-reports/load-test-[YYYY-MM-DD].html`

### Performance Baselines [NEW v1.0]

**Established Baselines:**

| Endpoint | P50 | P95 | P99 | Throughput | Status |
|----------|-----|-----|-----|------------|--------|
| GET /api/users | 45ms | 120ms | 250ms | 1200 req/s | ✅ Baseline |
| POST /api/orders | 85ms | 200ms | 450ms | 800 req/s | ✅ Baseline |
| GET /api/dashboard | 150ms | 400ms | 800ms | 600 req/s | ✅ Baseline |

**Regression Check (E32):**
| Endpoint | Baseline P95 | Current P95 | Change | Status |
|----------|--------------|-------------|--------|--------|
| GET /api/users | 120ms | 125ms | +4.2% | ✅ Pass |
| POST /api/orders | 200ms | 195ms | -2.5% | ✅ Pass |
| GET /api/dashboard | 400ms | 420ms | +5% | ⚠️ Warning |

**Evidence:** `performance-reports/baseline-v1.0.md`

### Visual Performance Analysis [NEW v1.0]

**Generated by Data Interpreter:**
- `latency-distribution.png`: P50/P95/P99 percentile charts
- `throughput-timeline.png`: Requests/sec over time
- `resource-utilization.png`: CPU/Memory/Disk trends
- `dashboard.html`: Interactive KPI dashboard

**Key Insights:**
- [Insight 1: e.g., P99 latency has long tail, investigate]
- [Insight 2: e.g., Throughput drops during DB writes]

**Evidence:** `performance-reports/visualizations/`

---

## 5. Acceptance Criteria Verification

### AC Verification Matrix

| AC ID | Criterion | Verification Method | Evidence | Status |
|-------|-----------|---------------------|----------|--------|
| AC-1.1 | User can register | E2E test | `test-reports/ac-1.1.log` | ✅ PASS |
| AC-1.2 | User can login | E2E test | `test-reports/ac-1.2.log` | ✅ PASS |
| AC-1.3 | Session persists | Integration test | `test-reports/ac-1.3.log` | ✅ PASS |
| AC-2.1 | Order creation | E2E test | `test-reports/ac-2.1.log` | ✅ PASS |

**Summary:**
- Total ACs: [N]
- Passed: [M] ([X]%)
- Failed: [K]
- Status: [✅ E33: 100% / ❌ Below threshold]

**Failed ACs (if any):**
- AC-[ID]: [Reason for failure, remediation plan]

---

## 6. API Contract Validation

**Contract Compliance:**
```bash
npx openapi-diff \
  docs/architecture/api-contracts/openapi.yaml \
  ./generated/openapi.yaml

Result: [✅ No breaking changes / ❌ Breaking changes detected]
```

**Discrepancies:**
- [Discrepancy 1]: [Description and impact]

**Evidence:** `api-validation/contract-diff-[YYYY-MM-DD].txt`

---

## 7. Quality Gates Assessment

### Blocking Thresholds (Must Pass for GO)

| Gate | Threshold | Actual | Status | Constraint |
|------|-----------|--------|--------|------------|
| Test Coverage | ≥70% | [X]% | [✅ / ❌] | E30 |
| Critical Security | 0 | [N] | [✅ / ❌] | E31 |
| High Security | 0 | [M] | [✅ / ❌] | E31 |
| AC Pass Rate | 100% | [K]% | [✅ / ❌] | E33 |
| Perf Regression | <25% | [X]% | [✅ / ❌] | E32 |
| Ethics | Passed | [Status] | [✅ / ❌] | NEW |

**Blocking Gates Failed:** [N]
**Blocking Gates Passed:** [M]

### Non-Blocking Warnings

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Test Coverage | 85% | [X]% | [✅ / ⚠️] |
| Cyclomatic Complexity | <10 | [Y] | [✅ / ⚠️] |
| Code Duplication | <5% | [Z]% | [✅ / ⚠️] |
| Documentation | 80% | [W]% | [✅ / ⚠️] |

**Warnings:** [N] items require attention

---

## 8. GO/NO-GO Decision

**Decision:** [✅ GO / ❌ NO-GO / ⚠️ CONDITIONAL GO]

**Rationale:**
[Evidence-based explanation of decision]

**If GO:**
- All blocking gates passed
- Evidence package complete
- Ready for Phase 5 (Release)

**If NO-GO:**
- Blocking issue: [Issue description]
- Resolution plan: [How to address]
- Target re-verification date: [YYYY-MM-DD]

**If CONDITIONAL GO:**
- Non-blocking warnings: [List]
- Risk assessment: [Acceptable / Monitor closely]
- Mitigation plan: [Post-release actions]

---

## 9. Evidence Artifacts

**Test Reports:**
- `test-reports/unit-test-report-[date].html`
- `test-reports/integration-test-report-[date].html`
- `test-reports/e2e-test-report-[date].html`
- `test-reports/coverage-report-[date]/index.html`

**Security Reports:**
- `security-reports/sast-report-[date].html`
- `security-reports/dependency-audit-[date].txt`
- `security-reports/secret-scan-[date].txt`

**Ethics Reports:** [NEW v1.0]
- `ethics-reports/ethics-validation-[date].md`
- `ethics-reports/accessibility-audit-[date].html`
- `ethics-reports/bias-detection-[date].md` (if AI/ML)

**Performance Reports:** [NEW v1.0]
- `performance-reports/baseline-v1.0.md`
- `performance-reports/load-test-[date].html`
- `performance-reports/visualizations/latency-distribution.png`
- `performance-reports/visualizations/throughput-timeline.png`
- `performance-reports/visualizations/resource-utilization.png`
- `performance-reports/visualizations/dashboard.html`

**Verification Evidence:**
- `verification/ac-verification-matrix-[date].md`
- `verification/api-contract-validation-[date].txt`

---

## 10. Recommendations

**For Immediate Action:**
- [Action 1: High priority fix]
- [Action 2: Critical security patch]

**For Post-Release:**
- [Action 1: Performance optimization]
- [Action 2: Test coverage improvement]

**For Future Iterations:**
- [Learning 1: Process improvement]
- [Learning 2: Tool enhancement]

---

## Version

**Evidence Package Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 2: Test Report {#test-report}

```markdown
# Test Execution Report

**Project:** [Project Name]
**Version:** [X.Y.Z]
**Execution Date:** [YYYY-MM-DD]
**Environment:** [Development / Staging / Production]

---

## Test Summary

**Overall Results:**
```
Total Tests:     [N]
Passed:          [M] ([X]%)
Failed:          [K] ([Y]%)
Skipped:         [L] ([Z]%)
Execution Time:  [W]s
```

**Status:** [✅ All Passing / ❌ Failures Present]

---

## Test Breakdown by Type

| Type | Total | Passed | Failed | Skipped | Coverage |
|------|-------|--------|--------|---------|----------|
| Unit | [N] | [M] | [K] | [L] | [X]% |
| Integration | [N] | [M] | [K] | [L] | [Y]% |
| E2E | [N] | [M] | [K] | [L] | [Z]% |

---

## Coverage Analysis

### Overall Coverage
```
Line Coverage:     [X]% ([✅ / ❌] ≥70%)
Branch Coverage:   [Y]% ([✅ / ❌] ≥60%)
Function Coverage: [Z]% ([✅ / ❌] ≥70%)
```

### Coverage by Module

| Module | Line Coverage | Branch Coverage | Status |
|--------|---------------|-----------------|--------|
| auth | [X]% | [Y]% | ✅ |
| orders | [X]% | [Y]% | ✅ |
| payments | [X]% | [Y]% | ❌ |

**Uncovered Critical Code:**
- `payments/process.ts:45-67`: Credit card validation logic
- `auth/token.ts:120-135`: Token refresh logic

---

## Failed Tests (if any)

### Test Failure 1

**Test:** `[test-file.test.ts] › [describe block] › [test name]`
**Error:**
```
Expected: [expected value]
Received: [actual value]
```

**Root Cause:** [Why it failed]
**Resolution Status:** [Fixed / In Progress / Needs Investigation]

---

## Test Metrics

**Performance:**
- Fastest test: [X]ms
- Slowest test: [Y]ms
- Average test time: [Z]ms

**Flakiness:**
- Flaky tests detected: [N]
- Tests requiring retry: [M]

---

## Recommendations

**Coverage Improvements:**
- Add tests for: [Uncovered critical paths]

**Test Quality:**
- Refactor slow tests: [List tests >1s]
- Fix flaky tests: [List unreliable tests]

---

## Version

**Test Report Version:** 1.0
**CodeMaestro:** v1.0.0
```

---

## Template 3: Security Scan Report {#security-report}

```markdown
# Security Scan Report

**Project:** [Project Name]
**Version:** [X.Y.Z]
**Scan Date:** [YYYY-MM-DD]
**Tools:** [Semgrep, npm audit, GitGuardian, etc.]

---

## Executive Summary

**Overall Security Posture:** [✅ Secure / ⚠️ Warnings / ❌ Vulnerabilities]

**Quality Gate Status (E31):** [✅ PASS / ❌ FAIL]
- Critical vulnerabilities: [N] ([✅ / ❌] Must be 0)
- High vulnerabilities: [M] ([✅ / ❌] Must be 0)

---

## SAST Results

**Tool:** [Semgrep / SonarQube]
**Scan Type:** Static Application Security Testing

### Findings by Severity

| Severity | Count | CWE IDs |
|----------|-------|---------|
| Critical | [N] | [CWE-89, CWE-79, ...] |
| High | [M] | [CWE-XXX, ...] |
| Medium | [K] | [CWE-XXX, ...] |
| Low | [L] | [CWE-XXX, ...] |

### Critical Issues (if any)

#### Issue 1: [Vulnerability Title]
- **Severity:** Critical
- **CWE:** [CWE-ID]
- **Location:** `[file]:[line]`
- **Description:** [What the vulnerability is]
- **Exploit Scenario:** [How it could be exploited]
- **Remediation:** [How to fix]
- **Status:** [Fixed / In Progress / Planned]

---

## Dependency Vulnerabilities

**Tool:** [npm audit / pip-audit / cargo audit]

### Known Vulnerabilities

| Package | Version | CVE | Severity | Fix Available |
|---------|---------|-----|----------|---------------|
| [package-1] | [X.Y.Z] | CVE-2024-XXXXX | Critical | ✅ [A.B.C] |
| [package-2] | [X.Y.Z] | CVE-2024-YYYYY | High | ❌ No fix |

### Remediation Plan

**Immediate Actions:**
1. Update [package-1] to [A.B.C]
2. Mitigate [package-2] vulnerability with [workaround]

**Long-term:**
- Monitor [package-2] for security patches
- Consider alternative dependency if no fix within 30 days

---

## Secret Detection

**Tool:** [GitGuardian / TruffleHog]
**Scan Scope:** Git history + current codebase

**Results:** [✅ No secrets detected / ❌ Secrets found]

**Secrets Found (if any):**
| Type | Location | Revoked | Status |
|------|----------|---------|--------|
| API Key | `config.js:15` | ✅ Yes | ✅ Resolved |
| Password | `commit abc123` | ✅ Yes | ✅ Resolved |

---

## Security Checklist

- [x] Authentication implemented securely
- [x] Authorization enforced consistently
- [x] Input validation on all endpoints
- [x] Output encoding prevents XSS
- [x] SQL injection prevented (parameterized queries)
- [x] CSRF protection enabled
- [x] Security headers configured (CSP, HSTS, etc.)
- [x] Rate limiting implemented
- [x] No secrets in code or git history
- [x] Dependencies are up-to-date and secure

---

## Compliance

**Standards:**
- [x] OWASP Top 10 (2023) - all mitigated
- [x] CWE Top 25 - addressed
- [x] Industry-specific: [Standards]

---

## Recommendations

**Immediate Fixes:**
- [Fix 1]
- [Fix 2]

**Process Improvements:**
- [Improvement 1]
- [Improvement 2]

---

## Version

**Security Report Version:** 1.0
**CodeMaestro:** v1.0.0
```

---

## Template 4: Performance Baseline {#performance-baseline}

```markdown
# Performance Baseline v1.0

**Project:** [Project Name]
**Version:** [X.Y.Z]
**Baseline Date:** [YYYY-MM-DD]
**Environment:** [Staging / Production-like]

---

## Test Configuration

**Load Testing Tool:** [k6 / Locust / JMeter]

**Test Scenarios:**
- Normal load: [N] concurrent users, [M] minutes
- Peak load: [K] concurrent users, [L] minutes

**Environment:**
- Hardware: [CPU, RAM, Disk specs]
- Network: [Bandwidth, latency]
- Database: [Type, size, configuration]

---

## API Endpoint Baselines

### GET /api/users

**Latency Percentiles:**
- P50: 45ms ← Median response time
- P95: 120ms ← Baseline threshold
- P99: 250ms ← Worst-case acceptable

**Throughput:**
- Average: 1,200 req/s
- Peak: 1,500 req/s

**Resource Usage:**
- CPU: 35% average
- Memory: 512MB average
- DB Connections: 20/100 pool

### POST /api/orders

**Latency Percentiles:**
- P50: 85ms
- P95: 200ms ← Baseline threshold
- P99: 450ms

**Throughput:**
- Average: 800 req/s
- Peak: 950 req/s

**Resource Usage:**
- CPU: 45% average
- Memory: 768MB average
- DB Connections: 35/100 pool

[Repeat for each critical endpoint]

---

## Quality Gate Thresholds (E32)

**Regression Thresholds:**
- **Warning:** +10% from P95 baseline
- **Critical:** +25% from P95 baseline (blocks GO)

**Calculated Thresholds:**
| Endpoint | Baseline P95 | Warning (>+10%) | Critical (>+25%) |
|----------|--------------|-----------------|------------------|
| GET /api/users | 120ms | 132ms | 150ms |
| POST /api/orders | 200ms | 220ms | 250ms |

---

## Visual Baselines [NEW v1.0]

**Generated by Data Interpreter:**

### Latency Distribution
![Latency Distribution](../visualizations/baseline-latency-distribution.png)

**Interpretation:**
- Most requests served in <100ms
- Long tail in P99 (investigate caching opportunities)

### Throughput Timeline
![Throughput Timeline](../visualizations/baseline-throughput-timeline.png)

**Interpretation:**
- Stable throughput under normal load
- Minor degradation during peak hours (acceptable)

### Resource Utilization
![Resource Utilization](../visualizations/baseline-resource-utilization.png)

**Interpretation:**
- CPU usage within acceptable range
- Memory usage stable (no leaks detected)

---

## Usage Notes

**Comparing Future Tests:**
```bash
# Run performance tests
npm run test:performance

# Compare against baseline
compare-baseline \
  --baseline performance-baselines/baseline-v1.0.md \
  --current performance-reports/test-[date].json \
  --threshold 25%

# Result:
# ✅ No critical regressions
# ⚠️ 2 warnings (>10%)
```

**Updating Baselines:**
- Update baseline only when intentional performance improvements made
- Document reason for baseline update
- Version baselines (v1.0, v1.1, etc.)

---

## Version

**Baseline Version:** 1.0
**CodeMaestro:** v1.0.0
**Established:** [YYYY-MM-DD]
```

---

## Template 5: GO/NO-GO Decision {#go-nogo-decision}

```markdown
# GO/NO-GO Decision Report

**Project:** [Project Name]
**Version:** [X.Y.Z]
**Decision Date:** [YYYY-MM-DD]
**QA Lead:** [Name]
**Decision:** [✅ GO / ❌ NO-GO / ⚠️ CONDITIONAL GO]

---

## Decision Summary

**Quality Gate Status:**
| Gate | Status | Details |
|------|--------|---------|
| E30: Test Coverage ≥70% | [✅ / ❌] | [X]% |
| E31: Zero Critical/High Security | [✅ / ❌] | [N] C, [M] H |
| E32: No Perf Regression >25% | [✅ / ❌] | Max: [X]% |
| E33: All ACs Verified | [✅ / ❌] | [K]/[Total] |
| Ethics Validation | [✅ / ❌] | [Status] |

**Blocking Gates:**
- Passed: [N]
- Failed: [M]

---

## Detailed Assessment

### Test Quality: [✅ / ❌ / ⚠️]

**Coverage:** [X]% ([✅ / ❌] meets E30)
**Test Results:** [A]/[B] passing

**Issues:**
- [Issue 1 if any]

### Security: [✅ / ❌ / ⚠️]

**Vulnerabilities:** [N] Critical, [M] High ([✅ / ❌] meets E31)

**Issues:**
- [Critical vulnerability 1 if any]

### Performance: [✅ / ❌ / ⚠️]

**Regressions:** Max [X]% ([✅ / ❌] meets E32)

**Issues:**
- [Regression issue if any]

### Acceptance Criteria: [✅ / ❌ / ⚠️]

**Pass Rate:** [K]/[Total] ([✅ / ❌] meets E33)

**Failed ACs:**
- [AC-ID if any]

### Ethics: [✅ / ❌ / ⚠️]

**Validation:** [Passed / Failed]

**Issues:**
- [Ethics issue if any]

---

## GO Decision Justification

**All blocking gates passed:**
- ✅ Test coverage: [X]% (≥70%)
- ✅ Security: 0 critical, 0 high
- ✅ Performance: No regressions >25%
- ✅ ACs: [Total]/[Total] verified
- ✅ Ethics: Validated

**Evidence package is comprehensive and complete.**

**Recommendation:** **PROCEED TO PHASE 5 (RELEASE)**

---

## NO-GO Decision Justification

**Blocking gate(s) failed:**
- ❌ [Gate name]: [Current value] (Required: [Threshold])
- ❌ [Gate name]: [Issue description]

**Cannot proceed to release until:**
1. [Resolution action 1]
2. [Resolution action 2]

**Estimated Time to Resolve:** [X] hours/days

**Recommendation:** **RETURN TO PHASE 3** to address blocking issues

**Routing:**
- If test coverage: Add tests for uncovered code
- If security: Fix vulnerabilities, re-scan
- If ACs failed: Fix implementation, re-verify
- If performance: Optimize, re-test

---

## CONDITIONAL GO Justification

**All blocking gates passed, but non-blocking warnings present:**

**Warnings:**
- ⚠️ Test coverage: [X]% (target: 85%)
- ⚠️ Code complexity: [Y] (target: <10)

**Risk Assessment:**
- **Risk Level:** Low
- **User Impact:** Minimal
- **Monitoring Plan:** Track in production

**Recommendation:** **PROCEED TO PHASE 5 WITH MONITORING**

**Post-Release Actions:**
1. [Action 1: e.g., Improve test coverage to 85%]
2. [Action 2: e.g., Refactor complex functions]

---

## Handoff to Phase 5

**Release Manager receives:**
- ✅ Evidence package v1.0
- ✅ GO decision with rationale
- ✅ Performance baselines established
- ✅ Security validation complete
- ✅ All artifacts documented

**Next Steps:**
- Proceed to Phase 5 (Release Management)
- Create release notes
- Execute deployment plan
- Initialize post-deployment monitoring

---

## Version

**Decision Report Version:** 1.0
**CodeMaestro:** v1.0.0
**Date:** [YYYY-MM-DD]
```

---

## Usage Notes

**When to Load Templates:**
- Evidence Package: Phase 4 completion, for comprehensive reporting
- Test Report: After executing full test suite
- Security Report: After running all security scans
- Performance Baseline: After establishing initial performance metrics
- GO/NO-GO Decision: Final Phase 4 activity before handoff to Phase 5

**Skill Tier Adaptations:**
- **Beginner:** Include all sections with detailed interpretations
- **Advanced:** Focus on failed gates and critical issues
- **Ninja:** Minimal report, key metrics and decision only

---

## Version

**Templates Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** 2026-01-13
