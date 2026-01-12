# Security Vulnerability Scanning

**Version:** 1.0
**Status:** Active
**Integrated:** Phases 3-4
**Risk:** ✅ ZERO - Complements manual security checklist

---

## Overview

The Security Vulnerability Scanning system automates dependency security checks by integrating with ecosystem-specific vulnerability databases. This complements the manual security checklist with automated CVE detection.

## Supported Ecosystems

### JavaScript/Node.js
- **Tool:** `npm audit` / `yarn audit` / `pnpm audit`
- **Database:** npm Advisory Database
- **Package Files:** `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`

### Python
- **Tool:** `pip-audit` / `safety`
- **Database:** PyPI Advisory Database, Safety DB
- **Package Files:** `requirements.txt`, `Pipfile.lock`, `poetry.lock`, `setup.py`

### Rust
- **Tool:** `cargo audit`
- **Database:** RustSec Advisory Database
- **Package Files:** `Cargo.lock`

### Ruby
- **Tool:** `bundle audit`
- **Database:** Ruby Advisory Database
- **Package Files:** `Gemfile.lock`

### Java/Maven
- **Tool:** `mvn dependency-check`
- **Database:** OWASP Dependency Check
- **Package Files:** `pom.xml`

### Go
- **Tool:** `govulncheck`
- **Database:** Go Vulnerability Database
- **Package Files:** `go.mod`, `go.sum`

---

## Command: `/security scan`

### Syntax

```bash
/security scan                    # Scan all dependencies
/security scan --ecosystem npm    # Scan specific ecosystem
/security scan --severity high    # Show only high/critical
/security scan --fix              # Show fix commands
```

### Output Format

```
Scanning dependencies...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Ecosystem: npm (JavaScript)
📁 Analyzed: package-lock.json (247 dependencies)

🚫 CRITICAL (2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 lodash@4.17.20
  🔴 Critical: Prototype Pollution
  CVE: CVE-2021-23337
  CVSS: 9.1
  Description: Lodash vulnerable to prototype pollution via setWith function
  Affected: lodash < 4.17.21
  Fix: npm install lodash@4.17.21
  Details: https://nvd.nist.gov/vuln/detail/CVE-2021-23337

📦 axios@0.21.1
  🔴 Critical: Server-Side Request Forgery (SSRF)
  CVE: CVE-2021-3749
  CVSS: 8.6
  Description: Axios vulnerable to SSRF via URL parsing bypass
  Affected: axios < 0.21.2
  Fix: npm install axios@0.21.4
  Details: https://nvd.nist.gov/vuln/detail/CVE-2021-3749

⚠️ HIGH (3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 express@4.17.1
  🟠 High: Information Disclosure
  CVE: CVE-2022-24999
  CVSS: 7.5
  Description: Express.js vulnerable to path traversal
  Affected: express < 4.17.3
  Fix: npm install express@4.18.2
  Details: https://nvd.nist.gov/vuln/detail/CVE-2022-24999

[... additional vulnerabilities ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary
  Critical: 2
  High: 3
  Medium: 5
  Low: 8
  Total: 18 vulnerabilities found

🚫 Quality Gate: FAILED
  Constraint E31: Zero critical/high security issues
  Action: Fix 5 critical/high vulnerabilities before Phase 4

💡 Quick Fix
  Run: npm audit fix
  Or manually update packages listed above
```

---

## Integration with Quality Gates

### Constraint E31: Zero Critical/High Security Issues

The security scan enforces quality gate E31:
- **Blocking:** Yes
- **Threshold:** 0 critical or high severity vulnerabilities
- **Phase:** 3 (Implementation), 4 (Verification)

**Quality Gate Check:**
```
if (criticalCount > 0 || highCount > 0) {
  status = "FAILED"
  blocking = true
} else {
  status = "PASSED"
  blocking = false
}
```

### Phase 3 (Implementation)

**Incremental Scanning:**
- Run `/security scan` after adding new dependencies
- Address vulnerabilities before committing
- Update decision log with dependency security rationale

**Workflow:**
```
1. Add dependency: npm install express
2. Scan: /security scan
3. Review results
4. If vulnerabilities found:
   a. Check if fix available
   b. Update to patched version
   c. Document decision if no fix exists
5. Commit changes
```

### Phase 4 (Verification)

**Final Security Validation:**
- Run full security scan before GO/NO-GO decision
- Must pass E31 constraint (0 critical/high)
- Document all findings in evidence package

**Workflow:**
```
1. Run: /security scan
2. Generate: docs/verification/security-scan-report.md
3. Include in evidence package
4. If E31 fails: NO-GO, fix vulnerabilities first
5. If E31 passes: Proceed to GO/NO-GO decision
```

---

## Ecosystem-Specific Implementation

### JavaScript/Node.js

**Detection:**
- Check for `package.json` in project root
- Verify `package-lock.json` or `yarn.lock` exists

**Command:**
```bash
npm audit --json
```

**Parsing:**
- Extract CVE IDs, severity, affected packages
- Map to common format (see output template above)
- Generate fix commands

**Example Output:**
```json
{
  "vulnerabilities": {
    "lodash": {
      "name": "lodash",
      "severity": "critical",
      "via": [
        {
          "source": 1065,
          "name": "lodash",
          "dependency": "lodash",
          "title": "Prototype Pollution",
          "url": "https://github.com/advisories/GHSA-...",
          "severity": "critical",
          "cwe": ["CWE-1321"],
          "cvss": {"score": 9.1},
          "range": "<4.17.21"
        }
      ],
      "fixAvailable": true
    }
  }
}
```

### Python

**Detection:**
- Check for `requirements.txt`, `Pipfile`, or `pyproject.toml`

**Command:**
```bash
pip-audit --format json
```

**Alternative (Safety):**
```bash
safety check --json
```

**Parsing:**
- Extract vulnerability data from JSON
- Map to common format
- Generate fix commands (pip install --upgrade)

### Rust

**Detection:**
- Check for `Cargo.toml` and `Cargo.lock`

**Command:**
```bash
cargo audit --json
```

**Parsing:**
- Extract RustSec advisories
- Map to common format
- Generate fix commands (cargo update)

---

## Severity Levels

### CVSS Score Mapping

| CVSS Score | Severity | Symbol | Action |
|------------|----------|--------|--------|
| 9.0 - 10.0 | Critical | 🔴 | Fix immediately, blocking |
| 7.0 - 8.9 | High | 🟠 | Fix before Phase 4, blocking |
| 4.0 - 6.9 | Medium | 🟡 | Fix recommended, non-blocking |
| 0.1 - 3.9 | Low | 🔵 | Fix optional, non-blocking |

### Quality Gate Thresholds

**E31 Constraint (Blocking):**
- Critical: 0 allowed
- High: 0 allowed

**Recommended (Non-Blocking):**
- Medium: ≤ 5 (warn if exceeded)
- Low: ≤ 10 (informational)

---

## False Positives & Exceptions

### Handling False Positives

If a vulnerability is a false positive:

1. **Document the reasoning:**
   ```markdown
   ## False Positive: CVE-2021-12345

   **Package:** lodash@4.17.20
   **Vulnerability:** Prototype Pollution
   **Reason:** Not exploitable in our use case
   **Evidence:** We only use lodash.debounce, not setWith
   **Decision:** Accept risk, document in decision log
   **Approved By:** Senior Developer, QA Lead
   **Date:** 2026-01-13
   ```

2. **Add to exception list:**
   Create `docs/config/security-exceptions.md`

3. **Re-run scan with exceptions:**
   ```bash
   /security scan --ignore-exceptions
   ```

### Creating Exception File

**File:** `docs/config/security-exceptions.md`

```markdown
# Security Scan Exceptions

## Active Exceptions

### EX-001: lodash CVE-2021-23337
- **Package:** lodash@4.17.20
- **CVE:** CVE-2021-23337
- **Severity:** Critical
- **Reason:** False positive, not exploitable
- **Evidence:** Only using lodash.debounce
- **Approved:** 2026-01-13
- **Review Date:** 2026-04-13 (3 months)

## Expired Exceptions
[Empty]
```

---

## Reporting

### Security Scan Report Template

**File:** `docs/verification/evidence-packages/security-scan-report.md`

```markdown
# Security Scan Report

**Project:** {PROJECT_NAME}
**Version:** {VERSION}
**Scan Date:** {DATE}
**Scanned By:** {ROLE} (Phase 4)

---

## Executive Summary

- **Total Dependencies:** {COUNT}
- **Vulnerabilities Found:** {COUNT}
  - Critical: {COUNT}
  - High: {COUNT}
  - Medium: {COUNT}
  - Low: {COUNT}
- **Quality Gate E31:** {PASSED/FAILED}

---

## Critical Vulnerabilities (0)

[None] ✅

---

## High Vulnerabilities (0)

[None] ✅

---

## Medium Vulnerabilities (2)

### 📦 Package: react-scripts@4.0.3
- **CVE:** CVE-2022-25878
- **Severity:** Medium (CVSS 6.5)
- **Description:** ReDoS vulnerability in path parsing
- **Affected:** react-scripts < 5.0.0
- **Fix:** npm install react-scripts@5.0.1
- **Status:** ⚠️ Pending (non-blocking)

[... additional medium vulnerabilities ...]

---

## Low Vulnerabilities (5)

[Informational only, non-blocking]

---

## Exceptions Applied (1)

### EX-001: lodash CVE-2021-23337
- **Reason:** False positive, not exploitable
- **Approved:** 2026-01-13
- **Next Review:** 2026-04-13

---

## Recommendations

1. Update react-scripts to 5.0.1 (medium priority)
2. Review low-severity vulnerabilities during Phase 5
3. Re-scan after dependency updates

---

## Compliance

- ✅ **E31 Constraint:** Passed (0 critical/high)
- ✅ **Quality Gate:** GO for Phase 5
- ✅ **Security Checklist:** Automated + manual complete

---

**Report Generated:** {TIMESTAMP}
**Next Scan:** Phase 5 (pre-release)
```

---

## Automation & CI/CD Integration

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Run security scan before commit
if [ -f package.json ]; then
  echo "Running security scan..."
  npm audit --audit-level=high
  if [ $? -ne 0 ]; then
    echo "❌ Security scan failed (high/critical vulnerabilities found)"
    echo "Fix vulnerabilities or document exceptions"
    exit 1
  fi
fi
```

### CI/CD Pipeline

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Run security audit
        run: npm audit --audit-level=high
      - name: Generate report
        if: failure()
        run: npm audit --json > security-report.json
      - name: Upload report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: security-report.json
```

---

## Best Practices

### ✅ Do:
- Run `/security scan` after every dependency addition
- Fix critical/high vulnerabilities immediately
- Document exceptions with clear reasoning
- Re-scan regularly (weekly in active development)
- Include scan results in evidence package
- Review exceptions every 3 months

### ❌ Don't:
- Ignore critical/high vulnerabilities
- Add exceptions without proper documentation
- Skip security scans before commits
- Use outdated/unmaintained dependencies
- Disable security checks in CI/CD

---

## Troubleshooting

### "Command not found: npm audit"

**Cause:** npm version < 6.0
**Solution:** Update npm: `npm install -g npm@latest`

### "No vulnerabilities found but package has known issues"

**Cause:** Outdated advisory database
**Solution:** Clear cache: `npm cache clean --force`

### "False positives for dev dependencies"

**Cause:** Dev dependencies scanned in production mode
**Solution:** Use `npm audit --production` for production-only scan

### "Scan takes too long"

**Cause:** Large dependency tree
**Solution:**
1. Reduce dependencies (analyze with `npm ls --depth=0`)
2. Use `--production` flag
3. Cache audit results

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-13 | Initial security scanning system |

---

**Status:** ✅ Ready for use
**Risk:** ✅ ZERO - Complements manual security checklist
**Impact:** Automates vulnerability detection, enforces E31 constraint
