# Quality Gate Thresholds

**CodeMaestro v1.0.0**
**Purpose:** Single source of truth for quality gate thresholds
**Status:** Active - Referenced by all phases
**Override:** Project-specific overrides allowed

---

## Overview

This file defines the **non-negotiable minimum thresholds** for CodeMaestro quality gates. These are enforced during Phase 3 (incremental validation) and Phase 4 (final verification).

**Single Source of Truth:** All phase prompts, templates, and documentation reference this file by link—no inline duplication.

---

## Quality Gate Thresholds

### Gate 1: Test Coverage (Constraint E30)

**Default Threshold:** ≥ 70%

**Blocking:** Yes
**Measured:** Line coverage, branch coverage, function coverage
**Enforcement:** Phase 3 (incremental), Phase 4 (final)
**Detection:** Ecosystem-specific test runners with coverage tools

**Rationale:** 70% provides strong confidence in core functionality while remaining achievable for most projects. Higher coverage (80-90%) may be warranted for high-risk domains (finance, healthcare, safety-critical systems).

**Override Example:**
```markdown
## Project: FinanceApp
**Test Coverage:** 85% (increased from 70%)
**Rationale:** Financial calculations require higher confidence
```

---

### Gate 2: Security Issues (Constraint E31)

**Default Threshold:** 0 critical, 0 high

**Blocking:** Yes
**Measured:** Dependency vulnerabilities, code security issues (SAST)
**Enforcement:** Phase 3 (incremental), Phase 4 (final)
**Detection:** `npm audit`, `pip-audit`, `cargo audit`, SAST tools (ESLint security, Bandit, Snyk)

**Rationale:** Critical and high-severity security issues pose immediate risk to users and data. Medium/low issues should be reviewed but are non-blocking unless project requirements dictate otherwise.

**Severity Definitions:**
- **Critical:** Exploitable with severe impact (RCE, authentication bypass, data breach)
- **High:** Exploitable with significant impact (privilege escalation, XSS, SQL injection)
- **Medium:** Exploitable with moderate impact or difficult to exploit (weak crypto, CSRF)
- **Low:** Theoretical risk or requires specific conditions (info disclosure, weak validation)

**Override Example:**
```markdown
## Project: HealthcareApp
**Security Issues:** 0 critical, 0 high, 0 medium (increased from 0 critical/high)
**Rationale:** HIPAA compliance requires stricter security posture
```

---

### Gate 3: Acceptance Criteria Pass Rate (Constraint E33)

**Default Threshold:** 100%

**Blocking:** Yes
**Measured:** Integration/E2E test results mapped to AC IDs
**Enforcement:** Phase 4 only (requires complete implementation)
**Detection:** Test naming convention (`AC-X.Y` in test names)

**Rationale:** Acceptance criteria define the product requirements. 100% pass rate ensures all promised functionality is delivered.

**Override:** **Not Allowed** - AC pass rate is a core product requirement and cannot be compromised.

**Partial AC (Informational):** If an AC has multiple scenarios and some pass, this is reported as "partial" but still counted as FAIL until all scenarios pass.

---

## Threshold Summary Table

| Gate | Constraint | Default Threshold | Blocking | Can Override? | Enforcement Phase |
|------|-----------|-------------------|----------|---------------|-------------------|
| **Test Coverage** | E30 | ≥ 70% | Yes | ✅ Yes (up or down) | 3, 4 |
| **Security Issues** | E31 | 0 critical/high | Yes | ✅ Yes (stricter only) | 3, 4 |
| **AC Pass Rate** | E33 | 100% | Yes | ❌ No | 4 |

---

## Project-Specific Overrides

To override thresholds for a specific project, create or update `.CodeMaestro/config/project-thresholds.md`:

```markdown
# Project-Specific Quality Gate Thresholds

**Project:** [Project Name]
**Domain:** [Web/Mobile/Cloud/AI]
**Risk Level:** [Low/Medium/High/Critical]

---

## Threshold Overrides

### Test Coverage (E30)
- **Default:** 70%
- **Project:** 85%
- **Rationale:** High-risk financial calculations require additional confidence

### Security Issues (E31)
- **Default:** 0 critical/high
- **Project:** 0 critical/high/medium
- **Rationale:** HIPAA compliance requires stricter security posture

### AC Pass Rate (E33)
- **Default:** 100%
- **Project:** 100% (cannot be changed)
- **Rationale:** Core product requirement
```

**Note:** Project-specific overrides are checked at Phase 4 start. If `project-thresholds.md` exists, those values take precedence over defaults.

---

## Enforcement Workflow

### Phase 3: Incremental Validation

During implementation, developers can run `/validate quality` to check gates incrementally:

```bash
> /validate quality

📊 Test Coverage:  45% ⚠️ BELOW THRESHOLD (target: 70%)
🔒 Security Issues: 2 High 🚫 BLOCKING (target: 0 critical/high)
✅ AC Pass Rate:    N/A (checked in Phase 4)
```

**Action:** Fix issues immediately while context is fresh.

### Phase 4: Final Verification

All three gates are checked comprehensively:

```bash
> /validate quality

✅ Test Coverage:  72% (target: ≥70%)
✅ Security Issues: 0 critical, 0 high (target: 0 critical/high)
✅ AC Pass Rate:    100% (target: 100%)

🎉 All quality gates PASSED - Ready for GO decision
```

**Action:** If any gate fails, Phase 4 returns NO-GO and implementation resumes (Phase 3).

---

## Historical Context

### Why These Thresholds?

**70% Test Coverage:**
- Industry standard for production code
- Balances confidence with effort
- Achievable without excessive mocking
- Focuses on critical paths (80/20 rule)

**0 Critical/High Security:**
- Reflects OWASP Top 10 severity model
- Aligns with CVE scoring (CVSS 7.0+ = High)
- Protects users and data from immediate risk

**100% AC Pass Rate:**
- Acceptance criteria = product contract
- Customers expect all promised features
- Non-negotiable for release

---

## Related Documentation

- [quality-gates.md](quality-gates.md) - Detailed quality gate validation system
- [constraints-reference.md](constraints-reference.md) - E30, E31, E33 constraint definitions
- [security-scanning.md](security-scanning.md) - Security scanning tools and processes
- [00-core.md](../prompts/00-core.md) - Core system configuration
- [04-verification.md](../prompts/04-verification.md) - Phase 4 verification workflow

---

## Version

**Thresholds Version:** 1.0.1
**Last Updated:** 2026-01-19
**Status:** Active - Single source of truth
