# Phase 4: Verification and Release

> **Prerequisite**: Load `./.CodeMaestro/prompts/00-core.md` first.
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
   
   Loading role: agents/qa-lead.md
═══════════════════════════════════════════════════════════════
```

### QA Lead Mindset

Load full role definition: `view /mnt/project/agents/qa-lead.md`

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
view /mnt/project/agents/security-engineer.md
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
view /mnt/project/agents/data-interpreter.md
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

### Step 4.8.5: Knowledge Base Integration

**Action**: Review Phase 4 verification results and add learnings to knowledge base.

**Check for KB-worthy content:**

**1. Test Failure Patterns**
```bash
# If recurring test failures or difficult-to-find bugs discovered
/kb add failure

# Example entry
Failure: F-TEST-015 - Race condition in async state updates
Category: Testing
Phase: Verification
Root Cause: useEffect cleanup not properly handling unmounted component
Solution: Add cleanup flag and conditional setState
Prevention: Always check component mounted state before async setState
```

**2. Security Vulnerability Patterns**
```bash
# If security issues found that could recur in future projects
/kb add failure

# Example entry
Failure: F-SEC-008 - SQL injection in dynamic query builder
Category: Security
Phase: Verification
Root Cause: User input concatenated into SQL without sanitization
Solution: Migrated to parameterized queries with prepared statements
Prevention: Use ORM or parameterized queries (A7 constraint)
```

**3. Performance Optimization Discoveries**
```bash
# If performance issues identified and resolved
/kb add pattern

# Example entry
Pattern: P-PERF-012 - Database N+1 query optimization
Category: Performance
Phase: Verification
Problem: Loading 100 users triggered 100 additional queries for roles
Solution: Added .include('roles') to eager load relationships
Impact: Response time improved from 800ms → 45ms (94% reduction)
```

**4. Quality Gate Insights**
```bash
# If systematic quality issues found
/kb add pattern

# Example entry
Pattern: P-QA-003 - Missing test coverage in error handling paths
Category: Quality Assurance
Phase: Verification
Observation: Happy path well-tested (92%), error paths undertested (35%)
Solution: Added dedicated error scenario test suite
Recommendation: Include error path coverage in Phase 3 validation
```

**When to add to KB:**
- Recurring bugs or failure patterns
- Security vulnerabilities with general applicability
- Performance optimization techniques
- Quality gate failure patterns
- Test strategy insights
- Verification workflow improvements

**When NOT to add:**
- Project-specific edge cases
- One-time configuration issues
- Environmental problems

**Deliverable:** Updated knowledge base with Phase 4 verification learnings

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

### Step 4.9.5: Update Recovery Checkpoint for Phase 5

**Action**: Update checkpoint after GO/NO-GO decision to enable seamless Phase 5 start.

**Update** `docs/implementation/.recovery-checkpoint.md`:

```markdown
# Recovery Checkpoint

| Field | Value |
|-------|-------|
| Last Updated | [Current timestamp] |
| Phase | 4 |
| Active Role | QA Lead |
| Status | Phase 4 Complete - GO/NO-GO: [✅ GO / ❌ NO-GO] |
| Git Branch | develop |
| Git Tag | v0.4.0-verify |
| Session Model | [Sonnet] |
| Tokens Used | [X]K |

## Phase 4 Summary
- GO/NO-GO: [✅ GO / ❌ NO-GO]
- Test Coverage: [X]%
- Security: [N] critical/high (must be 0)
- AC Pass Rate: [K]/[Total]
- Evidence Package: v[X.Y.Z]-evidence.md

## Next Phase Entry
Load: `.CodeMaestro/prompts/05-master-control.md`
Workflow: [5.A Success / 5.B Failure] based on GO/NO-GO

## Lazy Load Map
evidence-package → verification/evidence-packages/v[X.Y.Z]-evidence.md
monitoring-plan → docs/release/monitoring-plan.md
rollback-sop → docs/release/rollback-sop.md

## KB Additions (Phase 4)
- [N] failure patterns documented
- [M] performance optimizations captured
- [K] quality gate insights recorded
```

**KB Integration:** Already completed in Step 4.8.5

**Deliverable:** Updated checkpoint ready for Phase 5 handoff

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
> **📋 SESSION HANDOFF: Verification → Release**
>
> **What Was Accomplished (Phase 4):**
> - ✅ All tests executed (unit, integration, E2E)
> - ✅ Security scans complete (SAST, dependency, secrets)
> - ✅ Ethics validation passed
> - ✅ Performance baselines established (v[X.Y.Z])
> - ✅ API contracts validated
> - ✅ Evidence package created with token metrics
> - ✅ **GO decision** - All quality gates passed
> - ✅ Git commit and tag: `v0.4.0-verify`
>
> **Next Phase: Master Control & Release (Phase 5)**
>
> **Entry Point:**
> 1. Load `./.CodeMaestro/prompts/05-master-control.md`
> 2. Activate **Release Manager** role
> 3. Follow Step 5.A: Success Workflow (GO decision)
> 4. Start with Step 5.A.1: Pre-Release Verification
>
> **Critical Context for Release:**
> - **Decision:** GO ✅ (all blocking gates passed)
> - **Blocking Issues:** 0
> - **Non-Blocking Warnings:** [N] items
> - **Performance Baseline:** v[X.Y.Z] established
> - **Token Efficiency:** [Score]/10 ([Excellent/Good/Needs Improvement])
>
> **Files to Load First:**
> - `verification/evidence-packages/v[X.Y.Z]-evidence.md` - Complete evidence
> - `docs/release/monitoring-plan.md` - Post-release monitoring
> - `docs/release/rollback-sop.md` - Rollback procedures
> - `CHANGELOG.md` - Update with release notes
>
> **Token Metrics for Retrospective:**
> - Project Total: [Y]K tokens (all phases)
> - Estimated: [Z]K tokens
> - Variance: [±W]% ([Analysis])
> - Phase 5 Estimate: 15K-35K tokens (1 session)
> - Lessons to capture in Phase 5 retrospective
>
> **Git State:**
> - Branch: `develop`
> - Tag: `v0.4.0-verify`
> - Status: Clean
> - Next: Merge to `main`, create release tag `v[X.Y.Z]`
>
> **Recovery Checkpoint:** `docs/implementation/.recovery-checkpoint.md`
>
> **Full Handoff Guide:** See `.CodeMaestro/config/handoff-messages.md#phase-4-to-5`
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
   
   Loading role: agents/release-manager.md
═══════════════════════════════════════════════════════════════
```

Load `./.CodeMaestro/prompts/05-master-control.md`.
