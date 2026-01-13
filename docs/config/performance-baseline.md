# Performance Baseline Automation

**Version:** 1.0.0
**Phase Integration:** Phase 2 (Planning), Phase 4 (Verification)
**Risk Level:** ✅ ZERO RISK (Automates manual process, no code changes)
**Status:** Phase F Implementation

---

## Overview

Performance Baseline Automation automatically establishes, tracks, and validates performance benchmarks for your application. The system runs performance tests, stores baseline metrics, and detects regressions automatically, enforcing constraint E32 (no performance degradation).

### Key Features

- **Automatic Baseline Establishment:** Run tests once to set P50/P95/P99 thresholds
- **Regression Detection:** Alert on performance degradation (>10% warning, >25% critical)
- **Multi-Metric Tracking:** Latency, throughput, memory, CPU, database queries
- **Historical Trending:** Track performance over time across versions
- **CI/CD Integration:** Block merges on critical performance regressions
- **Visual Dashboards:** Generate HTML reports with charts

### Risk Mitigation

✅ **ZERO RISK** - Automates manual performance testing process. No changes to application code. Baseline establishment is optional and can be skipped if not needed.

---

## Command Reference

### `/benchmark establish`

Establish performance baselines by running tests and storing metrics.

**Syntax:**
```bash
/benchmark establish
/benchmark establish --profile [name]
/benchmark establish --output [file-path]
```

**Examples:**
```bash
# Establish baseline for all endpoints
/benchmark establish

# Establish with custom profile name
/benchmark establish --profile "v1.0-baseline"

# Save baseline to custom location
/benchmark establish --output docs/verification/performance-baselines/baseline-v1.0.json
```

**Output:**
```
Establishing Performance Baselines
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Running performance tests...

API Endpoint: POST /api/users
  Duration: 30s, Requests: 1,200 (40 req/s)
  ✅ P50: 45ms
  ✅ P95: 120ms ← Baseline threshold
  ✅ P99: 250ms
  ✅ Throughput: 1,200 req/s
  ✅ Memory: 125 MB (avg)
  ✅ CPU: 35% (avg)

API Endpoint: GET /api/users/:id
  Duration: 30s, Requests: 3,000 (100 req/s)
  ✅ P50: 12ms
  ✅ P95: 35ms ← Baseline threshold
  ✅ P99: 80ms
  ✅ Throughput: 3,000 req/s
  ✅ Memory: 110 MB (avg)
  ✅ CPU: 28% (avg)

API Endpoint: GET /api/dashboard
  Duration: 30s, Requests: 600 (20 req/s)
  ✅ P50: 150ms
  ✅ P95: 400ms ← Baseline threshold
  ✅ P99: 800ms
  ✅ Throughput: 800 req/s
  ✅ Memory: 180 MB (avg)
  ✅ CPU: 55% (avg)

Database Queries:
  ✅ SELECT queries: 8ms (P95)
  ✅ INSERT queries: 15ms (P95)
  ✅ UPDATE queries: 12ms (P95)
  ✅ Connection pool: 10/50 connections (avg)

Frontend Performance:
  ✅ First Contentful Paint: 1.2s
  ✅ Largest Contentful Paint: 2.1s
  ✅ Time to Interactive: 3.5s
  ✅ Total Blocking Time: 180ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Baseline established: docs/verification/performance-baselines/baseline-v1.0.md
✅ JSON data saved: docs/verification/performance-baselines/baseline-v1.0.json

Thresholds set:
  ⚠️  Warning:  +10% from baseline (triggers notification)
  🚫 Critical: +25% from baseline (blocks deployment)

Next: Run `/benchmark compare` during Phase 4 to validate performance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/benchmark compare`

Compare current performance against established baseline.

**Syntax:**
```bash
/benchmark compare
/benchmark compare --baseline [file-path]
/benchmark compare --fail-on [warning|critical]
```

**Examples:**
```bash
# Compare against latest baseline
/benchmark compare

# Compare against specific baseline version
/benchmark compare --baseline docs/verification/performance-baselines/baseline-v1.0.json

# Fail CI/CD pipeline on warnings
/benchmark compare --fail-on warning
```

**Output (All Tests Pass):**
```
Performance Regression Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Comparing against: baseline-v1.0 (2026-01-15)

API Endpoint: POST /api/users
  Baseline P95: 120ms
  Current P95:  115ms
  Change:       -4% ✅ IMPROVED

API Endpoint: GET /api/users/:id
  Baseline P95: 35ms
  Current P95:  33ms
  Change:       -6% ✅ IMPROVED

API Endpoint: GET /api/dashboard
  Baseline P95: 400ms
  Current P95:  395ms
  Change:       -1% ✅ STABLE

Database Queries:
  SELECT: -3% ✅ IMPROVED
  INSERT: +2% ✅ STABLE
  UPDATE: +1% ✅ STABLE

Frontend Performance:
  FCP: -8% ✅ IMPROVED (1.2s → 1.1s)
  LCP: -5% ✅ IMPROVED (2.1s → 2.0s)
  TTI: +3% ✅ STABLE (3.5s → 3.6s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All performance metrics within acceptable range
✅ Quality Gate E32: PASSED (no performance regression)

Summary:
  - 5 metrics improved
  - 4 metrics stable
  - 0 metrics degraded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Output (Regression Detected):**
```
Performance Regression Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Comparing against: baseline-v1.0 (2026-01-15)

API Endpoint: POST /api/users
  Baseline P95: 120ms
  Current P95:  138ms
  Change:       +15% ⚠️  WARNING (exceeds +10% threshold)
  Impact:       Slower user registration

API Endpoint: GET /api/users/:id
  Baseline P95: 35ms
  Current P95:  48ms
  Change:       +37% 🚫 CRITICAL (exceeds +25% threshold)
  Impact:       Significantly slower user lookups

API Endpoint: GET /api/dashboard
  Baseline P95: 400ms
  Current P95:  540ms
  Change:       +35% 🚫 CRITICAL (exceeds +25% threshold)
  Impact:       Dashboard load time unacceptable

Database Queries:
  SELECT: +42% 🚫 CRITICAL (8ms → 11.4ms)
  INSERT: +8% ✅ STABLE
  UPDATE: +5% ✅ STABLE

Frontend Performance:
  FCP: +5% ✅ STABLE
  LCP: +3% ✅ STABLE
  TTI: +2% ✅ STABLE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 CRITICAL REGRESSIONS DETECTED
🚫 Quality Gate E32: FAILED

Summary:
  - 0 metrics improved
  - 5 metrics stable
  - 1 WARNING (+15%)
  - 3 CRITICAL (+37%, +35%, +42%)

Root Cause Analysis:
  🔍 GET /api/users/:id regression likely caused by:
     - Missing database index on users.id
     - N+1 query problem in user profile loading

  🔍 Dashboard regression likely caused by:
     - Inefficient aggregation queries
     - Missing caching layer

Recommendations:
  1. Add database index: CREATE INDEX idx_users_id ON users(id)
  2. Review user profile queries for N+1 problems
  3. Add Redis caching for dashboard aggregations
  4. Re-run `/benchmark compare` after fixes

⚠️  Cannot proceed to Phase 5 until regressions resolved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/benchmark trend`

View performance trends over time across multiple versions.

**Syntax:**
```bash
/benchmark trend
/benchmark trend --endpoint [endpoint-name]
/benchmark trend --metric [latency|throughput|memory|cpu]
/benchmark trend --versions [count]
```

**Examples:**
```bash
# View trends for all endpoints
/benchmark trend

# View trends for specific endpoint
/benchmark trend --endpoint "POST /api/users"

# View memory trends across last 10 versions
/benchmark trend --metric memory --versions 10
```

**Output:**
```
Performance Trends - Last 5 Versions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API Endpoint: POST /api/users (P95 Latency)

v0.3.0 ████████████████ 120ms (baseline)
v0.3.1 ████████████████ 118ms (-2%) ✅
v0.3.2 ███████████████  115ms (-4%) ✅
v0.3.3 ███████████████  112ms (-7%) ✅
v1.0.0 ██████████████████ 138ms (+15%) ⚠️  REGRESSION

Trend: Improving until v1.0.0, then regressed +15%
Action: Investigate changes in v1.0.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API Endpoint: GET /api/dashboard (P95 Latency)

v0.3.0 ████████████████████████████ 400ms (baseline)
v0.3.1 ███████████████████████████  395ms (-1%) ✅
v0.3.2 ███████████████████████████  390ms (-3%) ✅
v0.3.3 ██████████████████████████   385ms (-4%) ✅
v1.0.0 ██████████████████████████████████████ 540ms (+35%) 🚫 CRITICAL

Trend: Steady improvement, then major regression in v1.0.0
Action: URGENT - Dashboard performance severely degraded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Database Query Performance (SELECT, P95)

v0.3.0 ████ 8ms (baseline)
v0.3.1 ████ 8ms (stable) ✅
v0.3.2 ███  7.5ms (-6%) ✅
v0.3.3 ███  7ms (-13%) ✅
v1.0.0 █████████ 11.4ms (+42%) 🚫 CRITICAL

Trend: Improving, then major regression in v1.0.0
Root Cause: Likely missing database index in migration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Assessment:
  ⚠️  v1.0.0 introduced significant performance regressions
  🔍 Investigate: Database migrations, caching changes, query patterns
  📊 Historical trend: Performance was improving until v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/benchmark report`

Generate visual performance report with charts.

**Syntax:**
```bash
/benchmark report
/benchmark report --format [html|pdf|markdown]
/benchmark report --output [file-path]
```

**Examples:**
```bash
# Generate HTML report
/benchmark report --format html --output docs/verification/performance-report-v1.0.html

# Generate PDF for stakeholders
/benchmark report --format pdf --output performance-report.pdf
```

**Output:**
```
Generating Performance Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Collecting baseline data
✅ Running current performance tests
✅ Calculating trends across versions
✅ Generating charts (latency, throughput, memory, CPU)
✅ Creating comparison tables
✅ Analyzing root causes for regressions

✅ Report generated: docs/verification/performance-report-v1.0.html

Report includes:
  - Executive summary with pass/fail status
  - Detailed metric comparisons (baseline vs current)
  - Interactive charts for trend visualization
  - Root cause analysis for regressions
  - Recommendations for optimization
  - Historical performance data (last 10 versions)

Open report in browser:
  open docs/verification/performance-report-v1.0.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/benchmark config`

Configure performance testing parameters and thresholds.

**Syntax:**
```bash
/benchmark config --show
/benchmark config --set [parameter] [value]
/benchmark config --reset
```

**Examples:**
```bash
# Show current configuration
/benchmark config --show

# Set custom warning threshold
/benchmark config --set warning_threshold 15

# Set test duration
/benchmark config --set test_duration 60

# Reset to defaults
/benchmark config --reset
```

---

## How It Works

### 1. Baseline Establishment (Phase 2 or Phase 4)

During Phase 2 planning or early Phase 4 verification, establish baseline:

```bash
# Run performance tests to establish baseline
/benchmark establish --profile "v1.0-baseline"
```

**What Happens:**
1. System identifies test endpoints from application code
2. Runs performance tests (default: 30s per endpoint, configurable)
3. Collects latency percentiles (P50, P95, P99)
4. Measures throughput (requests per second)
5. Tracks resource usage (memory, CPU)
6. Stores baseline in `docs/verification/performance-baselines/`

**Baseline File Format:**
```json
{
  "version": "v1.0",
  "date": "2026-01-15T10:30:00Z",
  "environment": {
    "os": "Linux",
    "cpu": "Intel i7-9700K",
    "memory": "16GB",
    "node_version": "v18.12.0"
  },
  "api_endpoints": [
    {
      "endpoint": "POST /api/users",
      "method": "POST",
      "duration_seconds": 30,
      "total_requests": 1200,
      "metrics": {
        "latency": {
          "p50": 45,
          "p95": 120,
          "p99": 250,
          "unit": "ms"
        },
        "throughput": {
          "value": 1200,
          "unit": "req/s"
        },
        "resources": {
          "memory_mb": 125,
          "cpu_percent": 35
        }
      },
      "thresholds": {
        "warning": 132,
        "critical": 150
      }
    }
  ],
  "database": {
    "queries": {
      "select_p95": 8,
      "insert_p95": 15,
      "update_p95": 12,
      "unit": "ms"
    },
    "connection_pool": {
      "avg_connections": 10,
      "max_connections": 50
    }
  },
  "frontend": {
    "first_contentful_paint": 1200,
    "largest_contentful_paint": 2100,
    "time_to_interactive": 3500,
    "total_blocking_time": 180,
    "unit": "ms"
  }
}
```

### 2. Regression Detection (Phase 4)

During Phase 4 verification, compare against baseline:

```bash
# Compare current performance against baseline
/benchmark compare --fail-on critical
```

**What Happens:**
1. Load baseline metrics from Phase 2
2. Run same performance tests with current code
3. Calculate percentage change for each metric
4. Apply threshold rules:
   - **0-10% change:** ✅ STABLE (acceptable)
   - **10-25% degradation:** ⚠️ WARNING (needs attention)
   - **>25% degradation:** 🚫 CRITICAL (blocks deployment)
5. Generate comparison report
6. Block Phase 5 transition if CRITICAL regressions detected

### 3. Root Cause Analysis

When regressions are detected, the system provides analysis:

```python
def analyze_regression(endpoint, baseline, current):
    """
    Analyze performance regression and suggest root causes.
    """
    regression_percentage = ((current - baseline) / baseline) * 100

    if regression_percentage > 25:  # Critical regression
        # Check common causes
        root_causes = []

        # Database-related regressions
        if endpoint.has_database_queries():
            if endpoint.query_count > baseline_endpoint.query_count:
                root_causes.append("N+1 query problem detected")
            if endpoint.missing_indexes():
                root_causes.append(f"Missing database index on {endpoint.table}.{endpoint.column}")
            if endpoint.full_table_scans > 0:
                root_causes.append("Full table scan detected (needs index)")

        # Cache-related regressions
        if endpoint.has_cache():
            if endpoint.cache_hit_rate < 0.8:
                root_causes.append(f"Low cache hit rate: {endpoint.cache_hit_rate * 100:.0f}%")
            if endpoint.cache_enabled == False and baseline_endpoint.cache_enabled == True:
                root_causes.append("Caching was disabled")

        # Code-related regressions
        if endpoint.algorithmic_complexity > baseline_endpoint.algorithmic_complexity:
            root_causes.append("Algorithmic complexity increased (O(n) → O(n²)?)")

        return root_causes

    return []
```

**Example Analysis:**
```
Root Cause Analysis for: GET /api/users/:id (+37% regression)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Database Analysis:
   - Query count: 15 queries (baseline: 1 query)
   - Issue: N+1 query problem in user profile loading
   - Fix: Use JOIN or eager loading

🔍 Index Analysis:
   - Missing index on users.id (detected full table scan)
   - Fix: CREATE INDEX idx_users_id ON users(id)

🔍 Code Changes:
   - File: src/controllers/userController.js
   - Commit: abc1234 "Add profile photo loading"
   - Change: Added loop fetching profile photos (causes N+1)

Recommended Fixes:
  1. Add database index: CREATE INDEX idx_users_id ON users(id)
  2. Refactor user profile query to use eager loading
  3. Add caching for profile photos (Redis, 5min TTL)

Estimated Impact:
  - Database index: -30% latency reduction
  - Eager loading: -50% query count reduction
  - Caching: -80% latency for subsequent requests

After fixes, re-run: /benchmark compare
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4. Historical Tracking (Phase 5)

During Phase 5 release, archive baseline for future comparison:

```bash
# Archive current baseline
cp docs/verification/performance-baselines/baseline-v1.0.json \
   docs/verification/performance-baselines/archive/baseline-v1.0.json

# View historical trends
/benchmark trend --versions 10
```

---

## Integration with Phases

### Phase 2: Planning (Software Architect)

**Usage:** Establish baseline requirements and thresholds

**Workflow:**
1. Define expected performance requirements based on user needs
2. Estimate baseline thresholds (P95 latency targets)
3. Document performance acceptance criteria
4. Plan performance testing strategy

**Example:**
```markdown
<!-- docs/architecture/blueprint-v1.0.md -->

## Performance Requirements

### API Endpoints

| Endpoint | Expected P95 Latency | Expected Throughput |
|----------|----------------------|---------------------|
| POST /api/users | <100ms | >1,000 req/s |
| GET /api/users/:id | <50ms | >2,000 req/s |
| GET /api/dashboard | <500ms | >500 req/s |

### Database Queries

| Query Type | Expected P95 Latency |
|------------|----------------------|
| SELECT | <10ms |
| INSERT | <20ms |
| UPDATE | <15ms |

### Frontend Performance (Core Web Vitals)

| Metric | Target |
|--------|--------|
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| Time to Interactive | <4.0s |
| Total Blocking Time | <200ms |

**Performance Testing Strategy:**
- Establish baseline in Phase 4 (first verification)
- Run `/benchmark establish` with production-like load
- Store baseline for future regression testing
- Set warning threshold: +10%, critical threshold: +25%
```

**Commands Available in Phase 2:**
- Document expected performance requirements
- Plan when to establish baseline (usually Phase 4)
- Define quality gates for performance (E32 constraint)

---

### Phase 4: Verification (QA Lead)

**Usage:** Establish baseline and validate performance

**Workflow:**
1. Run `/benchmark establish` to create baseline (first time)
2. Run `/benchmark compare` to check for regressions (subsequent times)
3. Analyze any regressions using provided root cause analysis
4. Fix performance issues if CRITICAL regressions detected
5. Re-run `/benchmark compare` after fixes
6. Block Phase 5 transition if regressions unresolved

**Example (First Deployment - Establish Baseline):**
```bash
# Phase 4: First verification of v1.0
/benchmark establish --profile "v1.0-baseline"

Output:
✅ Baseline established: docs/verification/performance-baselines/baseline-v1.0.md
✅ All endpoints within expected ranges
✅ Quality Gate E32: N/A (baseline establishment, no comparison)

Next: Future deployments will compare against this baseline
```

**Example (Subsequent Deployment - Regression Check):**
```bash
# Phase 4: Verification of v1.1
/benchmark compare --baseline docs/verification/performance-baselines/baseline-v1.0.json

Output:
🚫 CRITICAL REGRESSION: GET /api/users/:id (+37%)
🚫 Quality Gate E32: FAILED

Action Required:
  1. Review root cause analysis
  2. Fix identified issues
  3. Re-run `/benchmark compare`
  4. Cannot proceed to Phase 5 until resolved
```

**Example (After Fixes):**
```bash
# After fixing database index and N+1 query
/benchmark compare

Output:
✅ All performance metrics within acceptable range
✅ Quality Gate E32: PASSED

Summary:
  - GET /api/users/:id: -5% (improved from baseline) ✅
  - Fixed N+1 query problem
  - Added missing database index

Ready to proceed to Phase 5 ✅
```

**Commands Available in Phase 4:**
- `/benchmark establish` - First-time baseline establishment
- `/benchmark compare` - Regression check against baseline
- `/benchmark trend` - View performance history
- `/benchmark report` - Generate stakeholder report

---

### Phase 5: Release (Release Manager)

**Usage:** Archive baseline and review performance trends

**Workflow:**
1. Archive current baseline for historical tracking
2. Run `/benchmark trend` to review performance over time
3. Generate `/benchmark report` for stakeholders
4. Document performance in release notes
5. Include performance data in lessons learned

**Example:**
```markdown
<!-- docs/release/release-notes-v1.0.md -->

## Performance Summary

### Regression Testing
- ✅ Quality Gate E32: PASSED (no performance regressions)
- ✅ All endpoints within baseline thresholds
- ✅ Database queries optimized (-15% latency improvement)

### Performance Metrics (vs. v0.9 baseline)

| Metric | v0.9 Baseline | v1.0 Current | Change |
|--------|---------------|--------------|---------|
| POST /api/users (P95) | 135ms | 120ms | -11% ✅ |
| GET /api/users/:id (P95) | 40ms | 35ms | -13% ✅ |
| GET /api/dashboard (P95) | 420ms | 400ms | -5% ✅ |
| Database SELECT (P95) | 9ms | 8ms | -11% ✅ |

**Key Improvements:**
- Added database indexing on critical columns (-15% query latency)
- Implemented Redis caching for dashboard aggregations (-20% latency)
- Optimized user profile queries (removed N+1 problems)

**Baseline Archived:**
- docs/verification/performance-baselines/archive/baseline-v1.0.json

**Full Report:**
- docs/verification/performance-report-v1.0.html
```

**Commands Available in Phase 5:**
- `/benchmark trend --versions 10` - Historical performance analysis
- `/benchmark report --format pdf` - Stakeholder report generation
- Archive baseline for future comparisons
- Document performance in release notes

---

## Test Configuration

### Performance Test Tools Integration

CodeMaestro integrates with popular performance testing tools:

**Backend APIs:**
- **Apache Bench (ab):** Simple HTTP endpoint testing
- **Artillery:** Modern load testing with scenarios
- **k6:** Developer-friendly load testing
- **Gatling:** Enterprise-grade performance testing
- **JMeter:** Comprehensive load testing

**Frontend:**
- **Lighthouse:** Core Web Vitals measurement
- **WebPageTest:** Detailed frontend performance
- **Puppeteer:** Custom performance scenarios

**Database:**
- **pg_stat_statements:** PostgreSQL query analysis
- **MySQL Performance Schema:** MySQL query metrics
- **Redis Benchmark:** Cache performance

### Example Test Configuration

```yaml
# docs/config/performance-test-config.yaml

performance_testing:
  # Test duration
  duration: 30  # seconds per endpoint

  # Load profile
  load:
    ramp_up: 10s  # Gradually increase load
    sustained: 20s  # Maintain peak load
    ramp_down: 10s  # Gradually decrease

  # Concurrency
  concurrent_users:
    min: 10
    max: 100

  # Request rate
  requests_per_second: 50

  # Endpoints to test
  endpoints:
    - path: /api/users
      method: POST
      payload: fixtures/user-payload.json
      expected_p95: 100ms

    - path: /api/users/:id
      method: GET
      params: { id: "{{random_user_id}}" }
      expected_p95: 50ms

    - path: /api/dashboard
      method: GET
      headers: { Authorization: "Bearer {{auth_token}}" }
      expected_p95: 500ms

  # Thresholds
  thresholds:
    warning: 10  # +10% triggers warning
    critical: 25  # +25% blocks deployment

  # Database monitoring
  database:
    enable_query_logging: true
    log_slow_queries: true
    slow_query_threshold: 100ms

  # Frontend monitoring
  frontend:
    enable_lighthouse: true
    lighthouse_categories:
      - performance
      - accessibility
      - best-practices
      - seo

  # Resource monitoring
  resources:
    monitor_memory: true
    monitor_cpu: true
    monitor_disk_io: true
    monitor_network: true
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/performance-test.yml
name: Performance Regression Test

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Start application
        run: |
          npm run start &
          sleep 10  # Wait for app to start

      - name: Establish baseline (if first run)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          npm run benchmark:establish

      - name: Run performance regression test
        if: github.event_name == 'pull_request'
        run: |
          npm run benchmark:compare --fail-on critical
        continue-on-error: false  # Block merge if critical regression

      - name: Upload performance report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: docs/verification/performance-report-*.html

      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('performance-summary.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Performance Regression Test\n\n${report}`
            });
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
performance-test:
  stage: test
  script:
    - npm ci
    - npm run start &
    - sleep 10
    - npm run benchmark:compare --fail-on critical
  artifacts:
    paths:
      - docs/verification/performance-report-*.html
    expire_in: 30 days
  only:
    - merge_requests
    - main
```

---

## Configuration

### Threshold Configuration

Edit `docs/config/performance-thresholds.yaml`:

```yaml
thresholds:
  # Latency thresholds
  latency:
    warning: 10   # +10% degradation triggers warning
    critical: 25  # +25% degradation blocks deployment

  # Throughput thresholds
  throughput:
    warning: -10  # -10% reduction triggers warning
    critical: -25  # -25% reduction blocks deployment

  # Memory thresholds
  memory:
    warning: 15   # +15% increase triggers warning
    critical: 30  # +30% increase blocks deployment

  # CPU thresholds
  cpu:
    warning: 20   # +20% increase triggers warning
    critical: 40  # +40% increase blocks deployment

  # Database query thresholds
  database:
    warning: 15   # +15% slower queries
    critical: 30  # +30% slower queries

  # Frontend thresholds (Core Web Vitals)
  frontend:
    fcp:  # First Contentful Paint
      warning: 1.8s
      critical: 3.0s
    lcp:  # Largest Contentful Paint
      warning: 2.5s
      critical: 4.0s
    tti:  # Time to Interactive
      warning: 3.8s
      critical: 5.5s
    tbt:  # Total Blocking Time
      warning: 200ms
      critical: 600ms
```

---

## Examples

### Example 1: First Baseline Establishment

```bash
# Phase 4: First deployment of v1.0
/benchmark establish --profile "v1.0-baseline"

Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Running performance tests (30s per endpoint)...

✅ POST /api/users: P95 = 120ms (target: <100ms ⚠️ slightly over)
✅ GET /api/users/:id: P95 = 35ms (target: <50ms ✅)
✅ GET /api/dashboard: P95 = 400ms (target: <500ms ✅)

Analysis:
  ⚠️  POST /api/users slightly over target but acceptable for v1.0
  💡 Consider optimization in future release

Baseline established ✅
File: docs/verification/performance-baselines/baseline-v1.0.json

Quality Gate E32: PASSED (baseline establishment)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Example 2: Regression Detected and Fixed

```bash
# Phase 4: Verification of v1.1
/benchmark compare

Output (Before Fix):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 CRITICAL REGRESSION DETECTED

GET /api/users/:id
  Baseline: 35ms (P95)
  Current: 48ms (P95)
  Change: +37% 🚫 CRITICAL

Root Cause:
  - N+1 query problem detected (15 queries vs 1 query)
  - Missing database index on users.id

Recommended Fix:
  1. Add index: CREATE INDEX idx_users_id ON users(id)
  2. Refactor to use JOIN instead of loop

Quality Gate E32: FAILED ❌
Cannot proceed to Phase 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Developer fixes issues
# - Added database index
# - Refactored query to use JOIN

# Re-run test
/benchmark compare

Output (After Fix):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All metrics within acceptable range

GET /api/users/:id
  Baseline: 35ms (P95)
  Current: 32ms (P95)
  Change: -9% ✅ IMPROVED

Fixes applied:
  ✅ Added database index (idx_users_id)
  ✅ Refactored to use JOIN (eliminated N+1)
  ✅ Performance improved beyond baseline

Quality Gate E32: PASSED ✅
Ready to proceed to Phase 5 ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Example 3: Historical Trend Analysis

```bash
# Phase 5: Release retrospective
/benchmark trend --endpoint "GET /api/users/:id" --versions 5

Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Performance Trend: GET /api/users/:id (P95 Latency)

v0.8.0 ██████████ 40ms (baseline)
v0.9.0 ████████  35ms (-13%) ✅ Cache added
v1.0.0 █████████████ 48ms (+37%) 🚫 N+1 regression
v1.0.1 ████████ 32ms (-33%) ✅ Fixed with index
v1.1.0 ███████ 30ms (-6%) ✅ Query optimization

Overall Trend: Improving (40ms → 30ms, -25% since v0.8.0)

Key Events:
  - v0.9.0: Added Redis caching (-13% improvement)
  - v1.0.0: N+1 query bug introduced (+37% regression)
  - v1.0.1: Fixed with database index (-33% improvement)
  - v1.1.0: Additional query optimization (-6% improvement)

Lesson Learned:
  ✅ Automated regression testing caught N+1 bug early
  ✅ Database indexing had major impact (-33% improvement)
  💡 Continue focus on query optimization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Benefits

### For Software Architects (Phase 2)

- **Performance Requirements:** Define clear performance acceptance criteria upfront
- **Threshold Planning:** Set appropriate warning/critical thresholds based on user needs
- **Capacity Planning:** Understand resource requirements for scaling

### For Senior Developers (Phase 3)

- **Optimization Guidance:** Know which endpoints need optimization
- **Proactive Detection:** Catch performance issues during development
- **Data-Driven Decisions:** Measure impact of optimizations objectively

### For QA Leads (Phase 4)

- **Automated Validation:** No manual performance testing required
- **Regression Detection:** Automatically catch performance degradations
- **Root Cause Analysis:** Identify specific causes of regressions
- **Quality Gate Enforcement:** Block releases with critical performance issues

### For Release Managers (Phase 5)

- **Stakeholder Reporting:** Generate visual performance reports
- **Historical Tracking:** Show performance trends over time
- **Organizational Learning:** Document performance patterns and optimizations
- **Release Confidence:** Data-driven go/no-go decisions

---

## Limitations and Considerations

### Current Limitations

1. **Test Environment Dependency:** Performance varies with hardware, load, network
2. **Synthetic Load:** May not reflect real-world usage patterns
3. **Cold Start Effects:** First test run may be slower (warming up)
4. **External Dependencies:** Third-party APIs may cause variance
5. **Database State:** Test data volume affects query performance

### Mitigation Strategies

1. **Consistent Environment:** Use same hardware/VM for all tests
2. **Realistic Scenarios:** Create test data matching production volumes
3. **Warm-Up Period:** Run tests twice, discard first results
4. **Mock External APIs:** Use mocks or stubs for third-party services
5. **Database Seeding:** Populate database with realistic test data

### When NOT to Use Automated Baselines

- **Highly Variable APIs:** External APIs with unpredictable latency
- **Research Prototypes:** Early-stage prototypes without performance requirements
- **One-Time Scripts:** Scripts that don't need performance validation
- **Non-User-Facing Services:** Internal batch jobs without latency requirements

**Fallback:** Manual performance testing with documented results

---

## Future Enhancements

### Planned Features (v2.0)

1. **Adaptive Thresholds:** Automatically adjust thresholds based on historical variance
2. **Predictive Analysis:** Predict future performance based on code changes
3. **Distributed Tracing:** Integrate with OpenTelemetry for detailed traces
4. **Real User Monitoring:** Compare synthetic tests with actual user metrics
5. **Performance Budgets:** Set per-feature performance budgets

### Research Opportunities

- **Machine Learning:** Predict regressions before running tests
- **Continuous Profiling:** Real-time production performance monitoring
- **Chaos Engineering:** Test performance under failure conditions
- **Multi-Region Testing:** Compare performance across geographical regions

---

## Conclusion

Performance Baseline Automation transforms manual performance testing into an automated, continuous process. By establishing baselines early and detecting regressions automatically, teams catch performance issues before they reach production.

**Risk:** ✅ ZERO - Automates manual process, no code changes
**Impact:** HIGH - Prevents performance regressions, enforces quality gates
**Adoption:** Gradual - teams can start with baseline establishment, add regression testing later

---

**Next Steps:**
1. Run `/benchmark establish` in Phase 4 (first deployment)
2. Run `/benchmark compare` in all subsequent Phase 4 verifications
3. Review trends in Phase 5 retrospectives
4. Archive baselines for historical tracking

**Related Documentation:**
- [docs/verification/performance-baselines/](../verification/performance-baselines/) - Baseline storage
- [docs/config/performance-test-config.yaml](performance-test-config.yaml) - Test configuration
- [docs/config/quality-gates.md](quality-gates.md) - Quality gate integration (E32)
- [COMMANDS.md](../../COMMANDS.md) - Full command reference
