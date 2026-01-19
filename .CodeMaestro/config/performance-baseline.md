# Performance Baseline & Regression Detection

**CodeMaestro v1.0.0**
**Purpose:** Automated performance baseline establishment and regression detection
**Status:** Active - Conditional (load if project has performance NFRs)
**Risk:** ✅ ZERO - Advisory warnings, never blocks Phase 4 by default

---

## Overview

The Performance Baseline System provides automated performance testing and regression detection to ensure applications meet speed and resource requirements across releases.

**Key Features:**
- **Baseline Establishment:** Capture initial performance metrics (Phase 2 or Phase 4)
- **Regression Detection:** Compare current vs baseline, flag degradations
- **Trend Analysis:** Visualize performance over multiple versions
- **CI/CD Integration:** Automated performance gates in pipelines

**Progressive Disclosure:** Core commands below, detailed checklists and patterns in separate guides.

---

## Quick Command Reference

### `/benchmark establish`
Establish performance baseline for the application

```bash
/benchmark establish                     # Establish baseline for all endpoints
/benchmark establish --profile production  # Custom profile name
/benchmark establish --save path/to/baseline.json  # Custom location
```

**When to run:** Phase 2 (after architecture design) or Phase 4 (before first release)

### `/benchmark compare`
Compare current performance against baseline

```bash
/benchmark compare                      # Compare against latest baseline
/benchmark compare --baseline v1.0.0    # Compare against specific version
/benchmark compare --fail-on-warning    # Fail CI/CD if warnings detected
```

**When to run:** Phase 4 (every release), CI/CD pipeline

### `/benchmark trend`
Analyze performance trends across versions

```bash
/benchmark trend                        # View trends for all endpoints
/benchmark trend --endpoint /api/users  # Specific endpoint
/benchmark trend --metric memory        # Memory trends last 10 versions
```

**When to run:** Phase 4-5 (analyze long-term trends)

### `/benchmark report`
Generate performance report

```bash
/benchmark report                       # Markdown report
/benchmark report --format html         # HTML with charts
/benchmark report --format pdf          # PDF for stakeholders
```

**When to run:** Phase 4-5 (include in evidence package, release docs)

### `/benchmark config`
View or update performance configuration

```bash
/benchmark config                       # Show current config
/benchmark config --set warning_threshold=20  # Set 20% degradation warning
/benchmark config --set duration=60s    # Set test duration
/benchmark config --reset               # Reset to defaults
```

---

## Metrics Tracked

### Response Time Metrics
- **Median (p50):** 50th percentile response time
- **p95:** 95th percentile (catches outliers)
- **p99:** 99th percentile (worst-case scenarios)
- **Max:** Maximum response time observed

### Throughput Metrics
- **Requests/second (RPS):** Number of requests handled per second
- **Concurrent users:** Maximum concurrent users supported

### Resource Metrics
- **CPU Usage:** Average and peak CPU utilization
- **Memory Usage:** Average and peak memory consumption
- **Database Queries:** Query count and duration

---

## Regression Thresholds

### Default Thresholds

| Metric | Warning Threshold | Critical Threshold | Action |
|--------|------------------|-------------------|--------|
| **Response Time (p95)** | +20% | +50% | Warn / Block |
| **Throughput (RPS)** | -15% | -30% | Warn / Block |
| **Memory Usage** | +30% | +50% | Warn / Block |
| **CPU Usage** | +25% | +50% | Warn / Block |

**Customization:** Override in `.CodeMaestro/config/project-thresholds.md`

**Blocking Behavior:**
- **Warnings:** Log in evidence package, continue Phase 4
- **Critical:** Block Phase 4 GO decision (optional, configure in thresholds)

---

## Integration with Phases

### Phase 2: Planning (Optional Baseline)

**Role:** Software Architect

**Action:** Establish baseline for architectural decisions
```bash
# After creating prototype or using reference architecture
> /benchmark establish --profile architecture-baseline
```

**Use Case:** Compare different architectural approaches (monolith vs microservices, SQL vs NoSQL)

### Phase 4: Verification (Primary Integration)

**Role:** QA Lead

**Workflow:**
```bash
# 1. Establish baseline (first release only)
> /benchmark establish

# 2. Compare against baseline (subsequent releases)
> /benchmark compare

# 3. Analyze trends (multi-release view)
> /benchmark trend

# 4. Generate report for evidence package
> /benchmark report --format html
```

**Deliverable:** Performance section in evidence package

### Phase 5: Release (Reporting)

**Role:** Release Manager

**Action:** Include performance trends in release notes
```bash
> /benchmark report --format pdf
```

---

## Output Format

### Baseline Establishment

```bash
> /benchmark establish

Establishing Performance Baseline...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Running Performance Tests (60s duration)

Endpoint: GET /api/users
  Response Time (p95):  145ms
  Throughput:           2,340 RPS
  Memory Usage:         512 MB
  CPU Usage:            35%

Endpoint: POST /api/tasks
  Response Time (p95):  210ms
  Throughput:           1,850 RPS
  Memory Usage:         548 MB
  CPU Usage:            42%

Endpoint: GET /api/dashboard
  Response Time (p95):  380ms
  Throughput:           890 RPS
  Memory Usage:         625 MB
  CPU Usage:            58%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Baseline Established: v1.0.0

Saved to: .CodeMaestro/performance-baselines/v1.0.0-baseline.json

Use `/benchmark compare` in future releases to detect regressions.
```

### Regression Detection

```bash
> /benchmark compare

Comparing Performance: v1.1.0 vs v1.0.0 (baseline)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 GET /api/users
   Response Time (p95):  158ms (was 145ms) → +9% ✅ Within threshold
   Throughput:           2,280 RPS (was 2,340) → -2.6% ✅
   Memory:               520 MB (was 512 MB) → +1.6% ✅

⚠️  POST /api/tasks
   Response Time (p95):  255ms (was 210ms) → +21% ⚠️ WARNING (+20% threshold exceeded)
   Throughput:           1,780 RPS (was 1,850) → -3.8% ✅
   Memory:               590 MB (was 548 MB) → +7.7% ✅

🚫 GET /api/dashboard
   Response Time (p95):  610ms (was 380ms) → +61% 🚫 CRITICAL (+50% threshold exceeded)
   Throughput:           720 RPS (was 890) → -19% ⚠️ WARNING (-15% threshold exceeded)
   Memory:               715 MB (was 625 MB) → +14% ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: 🚫 REGRESSIONS DETECTED

Critical Issues: 1 (GET /api/dashboard response time)
Warnings: 2 (POST /api/tasks, GET /api/dashboard throughput)

Recommended Actions:
1. Investigate GET /api/dashboard (+61% response time) - CRITICAL
2. Profile POST /api/tasks performance (+21% response time)
3. Review database query optimization for dashboard endpoint

Estimated Fix Time: 4-8 hours
```

---

## Configuration

### Custom Thresholds

Edit `.CodeMaestro/config/project-thresholds.md`:

```markdown
## Performance Baseline Thresholds

**Warning Thresholds:**
- Response Time: +20% (default)
- Throughput: -15% (default)
- Memory: +30% (default)

**Critical Thresholds:**
- Response Time: +50% (default)
- Throughput: -30% (default)
- Memory: +50% (default)

**Blocking Behavior:**
- Warnings: Non-blocking (log only)
- Critical: Blocking (default: non-blocking, can enable)
```

### Test Configuration

```markdown
## Performance Test Settings

**Duration:** 60 seconds (default)
**Ramp-up:** 10 seconds
**Concurrent Users:** 100 (adjust based on expected load)
**Endpoints:** Auto-detect from OpenAPI spec

**Load Profile:**
- Light: 50 users, 30s duration
- Medium: 100 users, 60s duration (default)
- Heavy: 500 users, 120s duration
- Stress: 1000 users, 300s duration
```

---

## Tools and Libraries

### Load Testing
- **k6** (Go): Modern load testing tool, Grafana-backed
- **Apache JMeter** (Java): Traditional, GUI-based
- **Gatling** (Scala): Developer-friendly, code-based scenarios
- **Locust** (Python): Distributed load testing

### APM (Application Performance Monitoring)
- **New Relic**: Full-stack APM, RUM (Real User Monitoring)
- **Datadog**: Infrastructure + APM
- **Grafana + Prometheus**: Open-source metrics and dashboards

### Profiling
- **Node.js:** `clinic`, `0x`, `node --prof`
- **Python:** `cProfile`, `py-spy`, `memory_profiler`
- **Java:** JProfiler, VisualVM, Java Flight Recorder

**See:** Detailed performance testing guide for tool setup and usage patterns.

---

## Benefits

**For Development Teams:**
- Catch performance regressions before production
- Objective performance metrics vs subjective "feels slow"
- Historical trends identify gradual degradation

**For Product Teams:**
- Confidence in meeting SLAs
- Data for capacity planning
- Performance as measurable quality gate

**For Users:**
- Consistent, predictable performance
- No surprise slowdowns after updates

---

## Limitations

- **Load Testing ≠ Real Users:** Synthetic tests may not reflect production patterns
- **Environment Differences:** Baseline from staging may differ from production
- **Micro-optimizations:** Over-focus on benchmarks vs user experience
- **Cold Start Ignored:** First request performance often not measured

**Recommendation:** Use automated baseline as first pass, supplement with production monitoring (APM) and real user monitoring (RUM).

---

## When to Use

### Required For:
- API-heavy applications
- High-traffic services (>1K RPS)
- SLA commitments (99.9% uptime, <200ms response)
- Performance-sensitive domains (gaming, trading, real-time)

### Optional For:
- Low-traffic internal tools
- Prototype/MVP projects
- Non-performance-critical workflows

---

## Related Documentation

- **Detailed Guides:**
  - Performance testing patterns (to be created)
  - Optimization strategies (to be created)
  - Profiling and debugging (to be created)

- **System Integration:**
  - [04-verification.md](../prompts/04-verification.md) - Phase 4 verification workflow
  - [thresholds.md](thresholds.md) - Performance blocking thresholds
  - [quality-gates.md](quality-gates.md) - Quality gate system

---

## Version

**Performance Baseline System Version:** 1.0.1
**Last Updated:** 2026-01-19
**Status:** Active - Conditional (load if performance NFRs exist)
**Progressive Disclosure:** Core commands + detailed guides (to be populated)
