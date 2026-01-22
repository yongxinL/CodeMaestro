# Multi-Project Knowledge Base

**Version:** 1.0
**Date:** 2026-01-13
**Status:** ✅ Active
**Risk Level:** ⚠️ LOW RISK (Project KB remains independent)

---

## Overview

The Multi-Project Knowledge Base extends CodeMaestro's project-specific learning system to enable knowledge sharing across all projects in an organization. Patterns, failures, and decisions discovered in one project become accessible to all future projects, accelerating learning and preventing repeated mistakes.

**Key Benefits:**
- **Organizational Learning**: Knowledge compounds across projects
- **Faster Onboarding**: New projects start with accumulated wisdom
- **Pattern Reuse**: Proven solutions immediately available
- **Failure Prevention**: Don't repeat mistakes from previous projects
- **Team Collaboration**: Share knowledge across teams and time
- **Portfolio Insights**: Aggregate metrics across all projects

**No Function Loss:**
- Project-specific KB remains independent
- Global KB is additive, not replacement
- Projects can opt-out of global sharing
- Local KB takes precedence over global

---

## Architecture

### Directory Structure

```
~/.codemaestro/                          # Global CodeMaestro directory
├── config.yaml                          # Global configuration
├── global-kb/                           # Global knowledge base
│   ├── patterns/                        # Success patterns from all projects
│   │   ├── P001-repository-pattern.md
│   │   ├── P002-event-sourcing.md
│   │   └── P015-rate-limiting.md        # From Project A
│   ├── failures/                        # Failures from all projects
│   │   ├── F001-api-rate-limiting.md
│   │   ├── F003-database-deadlock.md
│   │   └── F008-memory-leak.md          # From Project B
│   ├── decisions/                       # Architectural decisions
│   │   ├── D001-postgresql-over-mongodb.md
│   │   └── D012-kubernetes-vs-ecs.md
│   ├── libraries/                       # Library knowledge cache
│   │   ├── react-query.md               # Usage patterns
│   │   └── express.md                   # Common pitfalls
│   └── index.json                       # Search index for all entries
└── projects/                            # Project metadata
    ├── project-a-metadata.json
    ├── project-b-metadata.json
    └── current-project.json             # Link to active project

[Project Directory]
└── docs/
    └── knowledge-base/                  # Project-specific KB (unchanged)
        ├── patterns/
        ├── failures/
        └── decisions/
```

---

## Commands

### /kb search --global [query]

Search knowledge base across all projects.

**Syntax:**
```bash
/kb search [query]              # Search local project KB (existing)
/kb search --global [query]     # Search global KB (all projects)
/kb search --all [query]        # Search both local and global
```

**Options:**
- `--global`: Search only global KB
- `--all`: Search both project and global KB
- `--type [pattern|failure|decision]`: Filter by entry type
- `--project [name]`: Filter by source project
- `--confidence [high|medium|low]`: Filter by confidence level
- `--domain [mobile|web|cloud|ai]`: Filter by domain

**Examples:**
```bash
# Search for authentication patterns globally
/kb search --global "authentication JWT"

# Find all rate-limiting failures across projects
/kb search --all --type failure "rate limiting"

# Find high-confidence patterns from mobile projects
/kb search --global --type pattern --domain mobile --confidence high
```

---

### /kb export

Export project KB entries to global KB.

**Syntax:**
```bash
/kb export                      # Export all project entries
/kb export [entry-id]           # Export specific entry (e.g., P001)
/kb export --auto               # Auto-export on project completion (Phase 5)
```

**Options:**
- `--filter [type]`: Export only patterns/failures/decisions
- `--confidence [min]`: Only export entries above confidence threshold
- `--auto`: Enable automatic export on Phase 5 completion

**Examples:**
```bash
# Export all project patterns to global KB
/kb export --filter pattern

# Export specific failure entry
/kb export F003

# Enable auto-export for this project
/kb export --auto
```

**Safety Features:**
- Duplicate detection (skip if identical entry exists)
- Conflict resolution (manual merge if similar entry exists)
- Privacy filtering (removes sensitive project details)
- Attribution (tracks source project)

---

### /kb import [entry-id]

Import entry from global KB to project KB.

**Syntax:**
```bash
/kb import [entry-id]           # Import specific entry from global KB
/kb import --pattern [id]       # Import pattern (alias)
/kb import --recommend          # Show recommended imports based on project
```

**Options:**
- `--overwrite`: Overwrite local entry if exists
- `--merge`: Merge with existing local entry
- `--recommend`: AI recommends relevant entries based on project domain

**Examples:**
```bash
# Import specific pattern from global KB
/kb import P015

# Import and merge with existing local pattern
/kb import P001 --merge

# Get AI recommendations for this project
/kb import --recommend
```

**Import Workflow:**
```
1. Fetch entry from global KB
2. Check for conflicts with local KB
3. Optionally customize entry for project context
4. Save to project KB (.CodeMaestro/knowledge-base/)
5. Log import in decision log
```

---

### /kb stats --global

View global knowledge base statistics and insights.

**Syntax:**
```bash
/kb stats                       # Project KB stats (existing)
/kb stats --global              # Global KB stats across all projects
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Global Knowledge Base Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Projects: 12
Total Entries: 87

Breakdown by Type:
  Patterns:  32 (37%)
  Failures:  28 (32%)
  Decisions: 27 (31%)

Breakdown by Domain:
  Web:    35 entries (40%)
  Mobile: 22 entries (25%)
  Cloud:  20 entries (23%)
  AI/ML:  10 entries (12%)

Most Referenced Patterns:
  1. P015: Rate Limiting (8 projects)
  2. P001: Repository Pattern (6 projects)
  3. P008: Event Sourcing (5 projects)

Most Common Failures:
  1. F003: Database Connection Pool Exhaustion (4 occurrences)
  2. F008: Memory Leak in Background Jobs (3 occurrences)
  3. F001: API Rate Limiting (3 occurrences)

Top Contributors:
  1. Project: E-Commerce Platform (15 entries)
  2. Project: Healthcare Dashboard (12 entries)
  3. Project: Fintech API (10 entries)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### /kb sync

Synchronize project KB with global KB.

**Syntax:**
```bash
/kb sync                        # Two-way sync (export new, import updates)
/kb sync --push                 # One-way push (export to global)
/kb sync --pull                 # One-way pull (import from global)
```

**Options:**
- `--dry-run`: Preview sync without making changes
- `--auto`: Enable automatic sync on phase transitions

**Sync Logic:**
1. **Export**: New project entries → global KB
2. **Import**: Updated global entries → project KB
3. **Conflict Resolution**: Manual merge if both changed
4. **Version Tracking**: Track entry versions for change detection

---

## Knowledge Entry Format

### Global KB Entry Extensions

Global KB entries include additional metadata beyond project-specific entries:

```markdown
# P015: Rate Limiting Pattern

**Confidence:** HIGH (used in 8+ projects)
**Domain:** Web, Cloud, Mobile
**Phase:** 2 (Planning), 3 (Implementation)

## Source Projects
- E-Commerce Platform (2025-03)
- Healthcare API (2025-06)
- Fintech Dashboard (2025-09)
- Mobile Banking App (2025-11)

## Context
Need to protect backend APIs from abuse and ensure fair usage.

## Problem
Without rate limiting:
- Denial of service attacks easy
- Single user can exhaust resources
- No protection against bots or scrapers

## Solution
Implement token bucket rate limiting:

### Token Bucket Algorithm
```typescript
class RateLimiter {
  private tokens: number;
  private lastRefill: Date;

  constructor(
    private maxTokens: number,
    private refillRate: number // tokens per second
  ) {
    this.tokens = maxTokens;
    this.lastRefill = new Date();
  }

  allow(tokensNeeded: number = 1): boolean {
    this.refillTokens();
    if (this.tokens >= tokensNeeded) {
      this.tokens -= tokensNeeded;
      return true;
    }
    return false;
  }

  private refillTokens() {
    const now = new Date();
    const elapsed = (now.getTime() - this.lastRefill.getTime()) / 1000;
    const tokensToAdd = elapsed * this.refillRate;
    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}
```

### Express Middleware
```typescript
const limiter = new RateLimiter(100, 10); // 100 max, refill 10/sec

app.use((req, res, next) => {
  if (!limiter.allow()) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }
  next();
});
```

## Benefits
- Protects against abuse
- Fair resource allocation
- Configurable per endpoint or user tier
- Works across distributed systems (with Redis backend)

## Trade-offs
- Adds latency (token check)
- Requires shared state (Redis for distributed)
- Legitimate users may hit limits during bursts

## Variations Across Projects

### E-Commerce Platform
- Per-user limits: 1000 req/hour
- Anonymous limits: 100 req/hour
- Checkout endpoint: 10 req/minute (prevents automated bots)

### Healthcare API
- Per-patient limits: 500 req/hour (HIPAA compliance)
- Provider API: 10,000 req/hour (higher tier)
- Redis backend for multi-server deployment

### Mobile Banking App
- JWT-based user identification
- Tighter limits for sensitive operations (transfer: 5/hour)
- Exponential backoff for repeated failures

## Related Patterns
- P008: Circuit Breaker
- P022: API Gateway
- F001: API Rate Limiting Failure (what happens without this)

## Tags
rate-limiting, api, security, performance, scalability

## Revision History
- 2025-03-15: Initial version (E-Commerce Platform)
- 2025-06-20: Added Redis backend (Healthcare API)
- 2025-09-10: Added JWT integration (Fintech Dashboard)
- 2025-11-05: Added exponential backoff (Mobile Banking App)
```

---

## Duplicate Detection and Conflict Resolution

### Duplicate Detection

When exporting, system checks for duplicates:

**Exact Duplicate:**
```
⚠️  Pattern P015 already exists in global KB
   Source: E-Commerce Platform (2025-03-15)
   Current: Mobile Banking App (2025-11-05)

   Action: Skip export (no changes)
```

**Similar Entry:**
```
⚠️  Similar pattern detected: P015 vs P023
   Similarity: 85% (same algorithm, different implementation)

   Options:
   1. Merge into P015 (add variation)
   2. Create new P023 (distinct pattern)
   3. Cancel export
```

**Update Detection:**
```
✅ Entry P015 updated since last export
   Changes: Added exponential backoff variation

   Action: Update global KB entry
           Add project to source list
```

---

### Conflict Resolution

When importing, conflicts may arise:

**Local vs Global Change:**
```
⚠️  Conflict detected: P001 modified locally and globally

   Local changes:
   - Added caching layer to repository

   Global changes:
   - Added transaction support across repositories

   Options:
   1. Keep local (discard global updates)
   2. Use global (discard local changes)
   3. Merge manually (open editor)
   4. Cancel import
```

---

## Privacy and Security

### Sensitive Information Filtering

Before export, entries are scanned for sensitive data:

**Auto-Redaction:**
- API keys, secrets, passwords
- Internal URLs and IP addresses
- Customer names and PII
- Proprietary algorithms (flagged for manual review)

**Example:**
```markdown
Before Export:
Connection string: postgres://admin:secret123@10.0.1.5:5432/proddb

After Export:
Connection string: postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

---

### Access Control

**Organization-Level:**
```yaml
# ~/.codemaestro/config.yaml
global_kb:
  access: organization  # Options: organization, team, public
  require_review: true  # Entries need approval before global publish
  reviewers:
    - alice@company.com
    - bob@company.com
```

**Project-Level Opt-Out:**
```yaml
# .CodeMaestro/config/project-config.yaml
knowledge_base:
  share_global: false   # Disable global KB sharing for this project
  allow_import: true    # Still allow importing from global
```

---

## AI-Powered Recommendations

### Auto-Recommend on Project Start

At Phase 1 (Requirements) completion:

```
🤖 AI Recommendation: Relevant Patterns Detected

Based on your project specification:
  Domain: Mobile (React Native)
  Features: User authentication, real-time updates

Recommended imports from global KB:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. P015: Rate Limiting
   Confidence: HIGH | Used in 8 projects
   Why: Your API endpoints need protection (mentioned in spec)

2. P008: Event Sourcing
   Confidence: MEDIUM | Used in 5 projects
   Why: Real-time updates pattern commonly uses event sourcing

3. F003: Database Connection Pool Exhaustion
   Confidence: HIGH | Occurred in 4 projects
   Why: Mobile apps often have burst traffic, causing pool issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Import all? (Y/n) or Select individually: [1,3]
```

---

### Pattern Matching During Implementation

During Phase 3 (Implementation):

```
💡 Suggestion: Similar code detected in global KB

Your code:
  function retryWithBackoff(fn, maxRetries) { ... }

Matches global pattern:
  P012: Exponential Backoff (85% similarity)
  Source: Healthcare API
  Confidence: HIGH

Would you like to:
1. View pattern details (/kb view P012)
2. Import pattern (/kb import P012)
3. Ignore
```

---

## Integration with Phase Workflow

### Phase 1: Requirements
- **No Export**: Requirements are project-specific
- **Import Recommendations**: Suggest patterns based on domain and features

---

### Phase 2: Planning
- **Export Decisions**: Architectural decisions to global KB
- **Import Patterns**: Reference global patterns in blueprint
- **Decision Validation**: Check if similar decisions exist globally

**Example:**
```
🔍 Decision Validation: D005 - Chose MongoDB

Global KB has 3 similar decisions:
  - D001: Chose PostgreSQL (5 projects) → Different choice
  - D008: Chose MongoDB (2 projects) → Same choice ✅
  - D015: Chose DynamoDB (1 project) → Different choice

Review D008 for rationale alignment? (Y/n)
```

---

### Phase 3: Implementation
- **Failure Tracking**: Auto-create failure entries for issues encountered
- **Pattern Discovery**: Detect reusable patterns in code
- **Import Patterns**: Use proven solutions from global KB

---

### Phase 4: Verification
- **Export Failures**: Document issues found during testing
- **Compare Quality Metrics**: Benchmark against global averages

**Example:**
```
📊 Quality Comparison with Global KB

Your Project:
  Test Coverage: 78%
  Security Issues: 2 Medium
  Performance: P95 = 120ms

Global Average (Web domain):
  Test Coverage: 72% (✅ above average)
  Security Issues: 1.5 avg (⚠️ slightly above)
  Performance: P95 = 150ms (✅ faster)

Recommendations:
- Address 2 medium security issues (below best-in-class)
- Your test coverage is excellent (keep it up!)
```

---

### Phase 5: Release
- **Auto-Export All**: Optionally export all project KB entries
- **Lessons Learned**: Add to global organizational knowledge
- **Portfolio Entry**: Link project to global KB contributions

**Workflow:**
```
Phase 5 Complete - Export to Global KB?

Exportable entries:
  Patterns:  3 (P001, P002, P003)
  Failures:  2 (F001, F002)
  Decisions: 5 (D001-D005)

Export all? (Y/n) or Select: [P001,F002,D001]
```

---

## Search and Discovery

### Full-Text Search

Global KB is indexed for fast search:

```bash
/kb search --global "authentication"

Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. P002: JWT Authentication Pattern
   Domain: Web, Mobile | Confidence: HIGH
   Used in 6 projects | Score: 95%

2. F005: JWT Token Expiry Issue
   Domain: Mobile | Confidence: MEDIUM
   Occurred in 2 projects | Score: 87%

3. D003: OAuth 2.0 vs JWT Decision
   Domain: Cloud | Confidence: HIGH
   Referenced in 4 projects | Score: 78%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Semantic Search (AI-Powered)

Beyond keyword matching, semantic search understands intent:

```bash
/kb search --global --semantic "how to prevent database from slowing down"

Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. P009: Database Connection Pooling
   Relevance: 92% (directly addresses database performance)

2. F003: Connection Pool Exhaustion
   Relevance: 88% (common cause of slowdown)

3. P018: Read Replica Scaling
   Relevance: 85% (prevents read contention)

4. F007: N+1 Query Problem
   Relevance: 82% (common ORM performance issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Tag-Based Navigation

Browse by tags:

```bash
/kb tags --global

Top Tags:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
authentication (12 entries)
database (10 entries)
api (9 entries)
performance (8 entries)
security (7 entries)
rate-limiting (6 entries)
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/kb search --global --tag "performance,database"
# Shows entries tagged with both performance AND database
```

---

## Analytics and Insights

### Global Metrics Dashboard

```bash
/kb insights --global
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Global Knowledge Base Insights
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Growth Trends
  Entries added (last 6 months): 34
  Average per project: 2.8 entries
  Most active domain: Web (40%)

🔥 Hottest Patterns (most referenced)
  1. P015: Rate Limiting (8 projects, 32 references)
  2. P001: Repository Pattern (6 projects, 24 references)
  3. P008: Event Sourcing (5 projects, 18 references)

⚠️  Recurring Failures (prevent these!)
  1. F003: Database Pool Exhaustion (4 projects)
     → Recommendation: Always use P009 (Connection Pooling)
  2. F001: API Rate Limiting Not Implemented (3 projects)
     → Recommendation: Use P015 (Rate Limiting Pattern)

💡 Emerging Patterns (recently added, high confidence)
  1. P025: GraphQL Federation (2 projects, HIGH confidence)
  2. P027: Micro-Frontend Architecture (2 projects, MEDIUM)

📊 Domain Breakdown
  Web:    35 entries (40%) | Avg quality: 4.2/5
  Mobile: 22 entries (25%) | Avg quality: 4.5/5
  Cloud:  20 entries (23%) | Avg quality: 4.0/5
  AI/ML:  10 entries (12%) | Avg quality: 3.8/5

🎓 Learning Impact
  Projects using global KB: 8/12 (67%)
  Avg implementation time saved: 18% (per project)
  Failures prevented: 12 (across all projects)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Predictive Insights

AI analyzes patterns to predict risks:

```
🔮 Predictive Insights for Current Project

Based on similarity to previous projects:

Risk Assessment:
  ⚠️  HIGH RISK: Database performance issues
      Similar projects: E-Commerce Platform, Healthcare API
      Both experienced F003 (Connection Pool Exhaustion)
      Recommendation: Implement P009 early in Phase 3

  ✅ LOW RISK: Authentication security
      Similar projects used P002 (JWT) successfully
      No failures recorded in this pattern

  ⚠️  MEDIUM RISK: API scalability
      2 of 3 similar projects hit rate limiting issues (F001)
      Recommendation: Implement P015 (Rate Limiting) in Phase 2
```

---

## Best Practices

### Exporting Knowledge

**✅ Do Export:**
- Patterns proven in production (HIGH confidence)
- Failures with clear root cause and solution
- Architectural decisions with rationale
- Reusable code snippets and templates

**❌ Don't Export:**
- Project-specific implementation details
- Unverified patterns (confidence < MEDIUM)
- Sensitive or proprietary information
- Duplicate entries (check first)

---

### Importing Knowledge

**✅ Do Import:**
- HIGH confidence patterns relevant to your domain
- Failures that match your architecture
- When starting similar projects
- During Phase 2 (Planning) for architectural patterns

**❌ Don't Import:**
- Patterns from incompatible domains
- LOW confidence entries without verification
- Blindly (always review and adapt to context)

---

### Maintaining Quality

**Confidence Levels:**
- **HIGH**: Used successfully in 3+ projects, no failures
- **MEDIUM**: Used in 1-2 projects, minor adaptations needed
- **LOW**: Experimental, needs more validation

**Review Process:**
```yaml
# ~/.codemaestro/config.yaml
global_kb:
  require_review: true
  auto_approve_threshold: HIGH  # Auto-approve HIGH confidence exports
  reviewers:
    - tech-lead@company.com
    - architect@company.com
```

---

## Error Handling

### Common Errors

**Error: Global KB Not Initialized**
```
❌ Global KB not found at ~/.codemaestro/global-kb/

   Solution: Initialize global KB
   /kb init --global

   This will create:
   - ~/.codemaestro/config.yaml
   - ~/.codemaestro/global-kb/ (with subdirectories)
```

**Error: Duplicate Entry**
```
⚠️  Entry P015 already exists in global KB

   Options:
   1. Update existing entry (merge changes)
   2. Create variant (P015-v2)
   3. Cancel export
```

**Error: Sync Conflict**
```
❌ Sync conflict: P001 modified locally and globally

   Local version: 2025-11-05 (added caching)
   Global version: 2025-11-10 (added transactions)

   Solution: Resolve manually
   1. /kb diff P001 (show differences)
   2. /kb merge P001 (manual merge editor)
   3. /kb sync --push --force (overwrite global)
   4. /kb sync --pull --force (overwrite local)
```

---

## Constraints Satisfied

This feature supports the following constraints:

- **A14 (Document rationale)**: All entries include rationale and context
- **C19 (Verifiable)**: Patterns and failures are documented with evidence
- **D26 (Comprehensive docs)**: Global KB provides extensive documentation

---

## Future Enhancements

### Planned Improvements (v1.1+)

1. **Cloud Sync**: Sync global KB across machines via cloud storage
2. **Team Collaboration**: Multi-user editing and comments
3. **Version Control**: Git-like versioning for KB entries
4. **Visual Knowledge Graph**: Visualize relationships between patterns/failures/decisions
5. **Machine Learning**: AI learns from KB to suggest optimizations

---

## Summary

The Multi-Project Knowledge Base provides:
- ✅ Organizational learning across all projects
- ✅ Pattern reuse and failure prevention
- ✅ AI-powered recommendations
- ✅ Search and discovery (keyword, semantic, tag-based)
- ✅ Analytics and predictive insights
- ✅ Privacy and security controls
- ✅ LOW RISK: Project KB remains independent

**Primary Usage:**
- Phase 2 (Planning): Import patterns, export decisions
- Phase 3 (Implementation): Reference patterns, track failures
- Phase 5 (Release): Export all learnings to global KB

**Commands:**
- `/kb search --global [query]` - Search across all projects
- `/kb export [entry-id]` - Share knowledge globally
- `/kb import [entry-id]` - Reuse proven solutions
- `/kb stats --global` - View organizational insights
- `/kb sync` - Keep project and global KB in sync
