# Phase 4: Verification and Release

> **Prerequisite**: Load `./docs/prompts/00-core.md` first.
> **Primary Role**: QA Lead
> **Supporting Roles**: Security Engineer, Performance Engineer, Data Interpreter
> **Objective**: Evidence-based validation with security, ethical, and visual performance analysis.

---

## Role Activation

```
═══════════════════════════════════════════════════════════════
🎭 ROLE ACTIVATION
───────────────────────────────────────────────────────────────
   Activating:   QA Lead (Primary)
   Supporting:   Security Engineer, Performance Engineer,
                 Data Interpreter
   Phase:        4: Verification and Release
   Skill Tier:   [Tier] → [Adaptation behavior]
   
   Loading role: config/roles/qa-lead.md
═══════════════════════════════════════════════════════════════
```

### QA Lead Mindset

Load full role definition: `view /mnt/project/config/roles/qa-lead.md`

**Quick Reference:**
- Make **objective, evidence-based** decisions
- Enforce **quality thresholds** without compromise
- Verify **every AC** with evidence
- Detect **performance regressions**
- Validate **API contracts**
- **Include ethical validation**
- **Generate visual insights**

---

## Entry Conditions

- Phase 3 checkpoint approved
- All tasks ✅ or explicitly ❌
- Git tag `v0.3.0-impl` exists

---

## Exit Conditions

- All verification steps executed
- Evidence package created (with visual artifacts)
- Quality thresholds evaluated
- **Ethics validation complete**
- GO/NO-GO decision made
- Performance baselines established (with visualizations)
- Git commit and tag created

---

## Quality Thresholds

**Load from:** `config/constraints-reference.md#E30-E33`

### Blocking (Must Pass for GO)

| Metric | Minimum |
|--------|---------|
| Test Coverage | 70% |
| Critical Security | 0 |
| High Security | 0 |
| AC Pass Rate | 100% |

### Target (Non-Blocking)

| Metric | Target |
|--------|--------|
| Test Coverage | 85% |
| Complexity | <10 |
| Duplication | <5% |

---

## Workflow

### Step 4.1: Input Validation

**Read**:
- Locked specification (ACs)
- Blueprint (architecture reference)
- API contracts
- Test plan
- Task checklist

**Verify**:
- All ACs have mapped tests
- No uncommitted changes
- All implemented tasks have tests

---

### Step 4.2: Test Execution

#### 4.2.1: Unit Tests
```bash
npm test -- --coverage
```

Record results.

#### 4.2.2: Integration Tests
```bash
npm run test:integration
```

#### 4.2.3: End-to-End Tests
```bash
npm run test:e2e
```

---

### Step 4.3: API Contract Validation

**Action**: Validate implementation matches API contracts.

```bash
# Generate OpenAPI from implementation
npm run generate:openapi

# Compare
npx openapi-diff \
  docs/architecture/api-contracts/openapi.yaml \
  ./generated/openapi.yaml
```

**Record** discrepancies.

---

### Step 4.4: Security Scanning

**Consult Ethics & Security Engineer:**
```
view /mnt/project/config/roles/ethics-security-engineer.md
```

#### 4.4.1: SAST
```bash
semgrep --config=auto src/
```

#### 4.4.2: Dependency Scan
```bash
npm audit
```

**Record** by severity.

---

### Step 4.4.5: Security & Ethical Hardening

**Execute comprehensive validation:**
```
view /mnt/project/verification/ethics-checklist.md
```

**Security Best Practices:**
- Input validation completeness
- Auth/authorization coverage
- Secrets management
- HTTPS/TLS enforcement
- CORS configuration
- Error message security

**Ethical & Bias Validation** (All Projects):
- **User Consent & Transparency**: Clear data policies, consent mechanisms
- **Accessibility (WCAG)**: Keyboard navigation, screen reader, color contrast
- **Privacy by Design**: Minimal data collection, retention policies, deletion capabilities
- **Inclusivity**: Non-discriminatory language, diverse user considerations

**AI/ML-Specific** (if applicable):
- **Bias Detection**: Training data review, fairness metrics, disparate impact
- **Protected Attributes**: Sensitive attribute handling, proxy identification
- **Explainability**: Decision interpretability, appeal mechanisms
- **Harm Mitigation**: Risk assessment, monitoring, incident response

**Regulatory Compliance**:
- **GDPR** (if applicable): Right to access, deletion, portability
- **Industry-specific**: Identified regulations, audit trails

**Consult Ethics & Security Engineer perspective** for assessment.

**Record results** in ethics validation section of evidence package.

---

### Step 4.5: Code Quality Audit

```bash
npm run lint
npx complexity-report src/
npx jscpd src/
```

**Record** metrics vs targets.

---

### Step 4.6: Performance Testing

**Consult Performance Engineer**.

#### First Release: Establish Baselines

```bash
npm run test:perf
# OR
k6 run tests/load/baseline.js
```

**Record baseline** metrics:
- P50, P95, P99 latency
- Throughput
- Error rate
- Resource utilization

**Save to**: `verification/performance-baselines/v1.0.0-baselines.md`

#### Subsequent Release: Regression Detection

Compare against baseline.

**Detect** regressions:
- <10%: ✅ Pass
- 10-25%: ⚠️ Warning
- >25%: ❌ Critical (blocks GO)

**Save to**: `verification/performance-baselines/regression-report.md`

---

### Step 4.6.5: Visual Performance Analysis

**Consult Data Interpreter:**
```
view /mnt/project/config/roles/data-interpreter.md
```

**Multi-Role Consultation:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 DATA INTERPRETER CONSULTATION: Visualization            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 👤 Data Interpreter:                                        │
│    - Generate latency distribution plots                    │
│    - Create throughput timeline graphs                      │
│    - Visualize resource utilization trends                  │
│    - Build interactive KPI dashboard                        │
│    - Establish visual baselines                             │
│                                                             │
│ 📊 Output: Performance visualization package                │
└─────────────────────────────────────────────────────────────┘
```

**Generate visual artifacts:**

Using Python (matplotlib), JavaScript (Chart.js), or Mermaid:

1. **Latency Distribution Plot**
   - P50, P95, P99 over time
   - Format: PNG or SVG

2. **Throughput Timeline**
   - Requests/second graph
   - Error rate overlay

3. **Resource Utilization**
   - CPU, Memory, Disk trends
   - Multi-line chart

4. **Interactive Dashboard**
   - HTML dashboard with Chart.js
   - Real-time metric displays
   - Threshold markers

**Output to**: `verification/performance-baselines/v[X.Y.Z]-visuals/`

**Include in evidence package** with Data Interpreter's analysis.

---

### Step 4.7: Acceptance Criteria Verification

**Map each AC** to test results.

**Summary**:
- AC Pass Rate: [X]/[Y]
- Must be 100% for GO

---

### Step 4.8: Evidence Aggregation

**Before generating, load template:**
```
view /mnt/project/04-verification-templates.md#evidence-package
```

**Compile** all results into evidence package:
- Test results
- Security scans
- **Ethics validation**
- API contract validation
- Code quality metrics
- Performance metrics
- **Visual performance artifacts**
- AC verification

**Create**: `verification/evidence-packages/v[X.Y.Z]-evidence.md`

---

### Step 4.9: GO/NO-GO Decision

**Decision Rules**:
```
GO if ALL:
  ✅ Test Coverage ≥ 70%
  ✅ Critical Security = 0
  ✅ High Security = 0
  ✅ AC Pass Rate = 100%
  ✅ No Critical Perf Regression (>25%)
  ✅ Ethics validation passed

NO-GO if ANY blocking criterion fails
```

**Make evidence-based decision**.

---

## Human Checkpoint

**⏸️ CHECKPOINT: Phase 4 Complete**

### GO Decision

> "As **QA Lead**, verification complete. **Decision: GO** ✅
> 
> **Quality Summary**:
> | Metric | Value | Status |
> |--------|-------|--------|
> | Test Coverage | [X]% | ✅ |
> | Security | 0 critical/high | ✅ |
> | AC Verified | [W]/[W] | ✅ |
> | Ethics Validation | Passed | ✅
> | Performance | No regressions | ✅ |
> 
> **Visual Insights**:
> - Performance dashboards generated
> - Baseline metrics visualized
> - Trends analysis complete
> 
> **Evidence**: `verification/evidence-packages/v[X.Y.Z]-evidence.md`
> 
> **🔀 Git:**
> [Commit and tag commands]
> 
> **🔄 SESSION RECOMMENDATION:**
> **Start new session for Phase 5**.
> 
> **Model:** Claude Sonnet 4.5 (release orchestration)
> 
> **Handoff:** `cat docs/implementation/.recovery-checkpoint.md`
> 
> Reply **APPROVED**."

### NO-GO Decision

> "**Decision: NO-GO** ❌
> 
> **Blocking Issues**:
> [List blockers]
> 
> **Options**:
> 1. FIX - Address blockers
> 2. ACCEPT RISK - Override (not recommended)
> 3. REPLAN - Return to Phase 2/3
> 
> Please advise."

---

## Outputs Checklist

| Artifact | Status |
|----------|--------|
| Evidence Package | ⏳ |
| Performance Baselines | ⏳ |
| Visual Artifacts | ⏳ |
| Ethics Report | ⏳ |
| Regression Report (if applicable) | ⏳ |
| CHANGELOG Entry | ⏳ |
| Git commit and tag | ⏳ |

---

## Role Transition

```
═══════════════════════════════════════════════════════════════
🎭 ROLE TRANSITION
───────────────────────────────────────────────────────────────
   Deactivating: QA Lead
   Activating:   Release Manager (Primary)
   Supporting:   Project Manager, DevOps Engineer,
                 Data Interpreter (continued)
   Phase:        5: Master Control and Release
   
   Loading role: config/roles/release-manager.md
═══════════════════════════════════════════════════════════════
```

Load `./docs/prompts/05-master-control.md`.
