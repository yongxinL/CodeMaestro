# CodeMaestro - Advanced Command Reference

**Phase F: Advanced Analytics & Compliance**

For core commands (daily workflow), see [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md)

---

## Overview

Phase F commands provide advanced capabilities for:
- **AI-Powered Estimation**: Learn from historical data to improve task estimates
- **Performance Baseline Tracking**: Detect performance regressions automatically
- **Ethics & Compliance**: Validate GDPR, WCAG, algorithmic fairness

**When to Use:** Primarily Phase 4 (Verification) and Phase 5 (Release)

---

## AI-Powered Task Estimation

### `/estimate suggest`
Get AI-powered task effort estimate based on historical data

**Syntax:**
```bash
/estimate suggest "[task-description]"        # Get estimate for new task
/estimate suggest --similar [task-id]         # Based on similar completed task
/estimate suggest --category [category-name]  # For specific category
```

**Example Output:**
```
AI-Powered Estimate: "Implement user authentication with JWT"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Base Estimate:        4.0 hours
Adjusted Estimate:    6.0 hours (+50%)
Confidence:           85% (8 similar tasks)

Adjustment Factors:
  - Authentication: 1.5x multiplier (historical)
  - JWT integration: +1.0h (library setup)
  - Security testing: +0.5h (constraint E31)

Recommendation: Use 6 hours as estimate
```

**See:** [.CodeMaestro/config/ai-estimation.md](.CodeMaestro/config/ai-estimation.md)

### `/estimate track`
Record actual effort for completed task

**Syntax:**
```bash
/estimate track [task-id] --actual [hours]
/estimate track [task-id] --actual [hours] --notes "[reason]"
```

**Usage:** Track actual effort after task completion to improve future estimates. System learns category multipliers automatically.

**See:** [.CodeMaestro/config/ai-estimation.md](.CodeMaestro/config/ai-estimation.md)

### `/estimate analyze`
Analyze estimation accuracy across all tasks

**Syntax:**
```bash
/estimate analyze                           # Overall analysis
/estimate analyze --category [category]     # Specific category
/estimate analyze --phase [phase-number]    # Specific phase
```

**Metrics Shown:**
- Average variance (±%)
- Accuracy rate (within ±25%)
- Category multipliers (with confidence)
- Improvement over time

**See:** [.CodeMaestro/config/ai-estimation.md](.CodeMaestro/config/ai-estimation.md)

---

## Performance Baseline Tracking

### `/benchmark establish`
Establish performance baselines for regression testing

**Syntax:**
```bash
/benchmark establish                        # Establish baseline
/benchmark establish --profile [name]       # Custom profile name
```

**What It Does:**
- Runs performance tests on API endpoints
- Measures P50/P95/P99 latency, throughput
- Tracks memory, CPU, database queries
- Stores baseline for future comparison

**Example Output:**
```
Establishing Performance Baselines
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API Endpoint: POST /api/users
  ✅ P50: 45ms
  ✅ P95: 120ms ← Baseline threshold
  ✅ Throughput: 1,200 req/s

Baseline saved: docs/verification/performance-baselines/baseline-v1.0.json

Thresholds set:
  ⚠️  Warning: +10% from baseline
  🚫 Critical: +25% from baseline
```

**See:** [.CodeMaestro/config/performance-baseline.md](.CodeMaestro/config/performance-baseline.md)

### `/benchmark compare`
Compare current performance against baseline

**Syntax:**
```bash
/benchmark compare                          # Compare against latest baseline
/benchmark compare --baseline [file]        # Compare against specific baseline
/benchmark compare --fail-on [warning|critical]  # CI/CD integration
```

**Quality Gate:** Constraint E32 (no performance regression)
- **0-10% change:** ✅ STABLE
- **10-25% degradation:** ⚠️ WARNING
- **>25% degradation:** 🚫 CRITICAL (blocks Phase 5)

**See:** [.CodeMaestro/config/performance-baseline.md](.CodeMaestro/config/performance-baseline.md)

### `/benchmark trend`
View performance trends across versions

**Syntax:**
```bash
/benchmark trend                            # All endpoints
/benchmark trend --endpoint [name]          # Specific endpoint
/benchmark trend --versions [count]         # Last N versions
```

**Use Case:** Track performance improvements/regressions over time in Phase 5 retrospectives.

**See:** [.CodeMaestro/config/performance-baseline.md](.CodeMaestro/config/performance-baseline.md)

---

## Ethics & Compliance Validation

### `/ethics scan`
Comprehensive ethics and compliance validation

**Syntax:**
```bash
/ethics scan                                      # Full scan
/ethics scan --category [privacy|accessibility|fairness|security]
/ethics scan --severity [info|warning|critical]
```

**Categories Scanned:**
- **Privacy:** GDPR, CCPA, HIPAA compliance
- **Accessibility:** WCAG 2.1 Level AA validation
- **Fairness:** ML algorithmic bias detection
- **Security:** Ethical security practices

**Example Output:**
```
Ethics & Compliance Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Privacy & Data Protection
  🚫 Missing cookie consent banner (GDPR)
  🚫 PII stored unencrypted (GDPR Article 32)

♿ Accessibility (WCAG 2.1 Level AA)
  🚫 Keyboard trap in modal (WCAG 2.1.2)
  ⚠️  Low contrast on button (3.2:1, needs 4.5:1)

Summary: 🚫 NON-COMPLIANT
Cannot proceed to Phase 5 until critical issues resolved
```

**See:** [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

### `/ethics privacy`
Privacy compliance scan (GDPR, CCPA, HIPAA)

**Syntax:**
```bash
/ethics privacy                                   # All regulations
/ethics privacy --regulation [gdpr|ccpa|hipaa]    # Specific regulation
/ethics privacy --detailed                        # Detailed analysis
```

**Checks:**
- Cookie consent (analytics, marketing)
- Privacy policy links on forms
- PII encryption at rest
- Data retention policies
- Right to access/deletion APIs
- Third-party data sharing

**See:** [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

### `/ethics accessibility`
WCAG accessibility compliance scan

**Syntax:**
```bash
/ethics accessibility                       # WCAG 2.1 Level AA
/ethics accessibility --level [A|AA|AAA]    # Specific level
/ethics accessibility --format html         # Generate HTML report
```

**Checks:**
- Color contrast (4.5:1 minimum)
- Keyboard navigation
- Screen reader compatibility (ARIA)
- Form labels and instructions
- Focus management

**See:** [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

### `/ethics fairness`
ML algorithmic bias detection

**Syntax:**
```bash
/ethics fairness                            # Scan all ML models
/ethics fairness --model [model-path]       # Specific model
/ethics fairness --metrics [metric-name]    # Specific fairness metric
```

**Metrics Calculated:**
- **Demographic Parity:** Equal approval rates across groups
- **Equalized Odds:** Equal TPR/FPR across groups
- **Disparate Impact:** 80% rule compliance
- **Individual Fairness:** Similar individuals, similar outcomes

**Critical Issues:**
- Protected attributes in training data (gender, race)
- Disparate impact ratio <0.80 (legal threshold)
- High fairness metric disparities (>5%)

**See:** [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

### `/ethics report`
Generate comprehensive ethics compliance report

**Syntax:**
```bash
/ethics report                              # HTML report
/ethics report --format [html|pdf|markdown]
/ethics report --output [file-path]
```

**Use Case:** Generate compliance certificate for legal/regulatory review in Phase 5.

**See:** [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

---

## Integration with Core Workflow

Phase F commands integrate seamlessly with the core workflow:

**Phase 2 (Planning):**
- Use `/estimate suggest` when creating task decomposition
- System learns from past estimates automatically

**Phase 3 (Implementation):**
- Use `/estimate track` as tasks complete
- Builds historical data for future projects

**Phase 4 (Verification):**
- Use `/benchmark establish` to set performance baselines
- Use `/ethics scan` for compliance validation
- Use `/security scan` (see .CodeMaestro/docs/COMMANDS-CORE.md) for vulnerability checks

**Phase 5 (Release):**
- Use `/benchmark compare` to verify no regressions
- Use `/ethics report` for compliance documentation
- Use `/estimate analyze` for retrospective analysis

---

## Configuration

Advanced features require configuration:

- **AI Estimation:** Automatic learning from tracked tasks
- **Performance Baselines:** Configured via [.CodeMaestro/config/performance-baseline.md](.CodeMaestro/config/performance-baseline.md)
- **Ethics Validation:** Configured via [.CodeMaestro/config/ethics-validation.md](.CodeMaestro/config/ethics-validation.md)

---

## When to Load This File

**Load .CodeMaestro/docs/COMMANDS-ADVANCED.md when:**
- Entering Phase 4 (Verification)
- Entering Phase 5 (Release)
- User explicitly requests Phase F features
- Project requires compliance validation (GDPR, WCAG, etc.)

**Skip loading if:**
- In Phase 1-3 (use .CodeMaestro/docs/COMMANDS-CORE.md only)
- Project doesn't require advanced analytics
- Simple projects without compliance requirements

---

**Full documentation:** See [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md), [.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md) (this file), and [.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md)
