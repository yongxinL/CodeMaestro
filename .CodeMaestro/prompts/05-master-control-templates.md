# Phase 5: Master Control Templates

<!-- LOAD ON-DEMAND -->

**CodeMaestro v1.0.0**
**Phase:** 5 (Release) - Release Manager
**Purpose:** Templates for release notes, lessons learned, knowledge base entries, and portfolio documentation

---

## Template 1: Release Notes {#release-notes}

```markdown
# Release Notes v[X.Y.Z]

**Project:** [Project Name]
**Release Date:** [YYYY-MM-DD]
**Release Manager:** [Name or "CodeMaestro System"]
**CodeMaestro:** v1.0.0

---

## Summary

[One-paragraph overview of this release - what was delivered and why it matters]

---

## What's New

### Features

**[Feature Category 1]:**
- **[Feature 1]:** [Description of functionality and user benefit]
  - Related AC: AC-[ID]
  - Task: T-[M].[Mod].[Task]
- **[Feature 2]:** [Description]
  - Related AC: AC-[ID]
  - Task: T-[M].[Mod].[Task]

**[Feature Category 2]:**
- **[Feature 3]:** [Description]

### Enhancements

- **[Enhancement 1]:** [What was improved and impact]
- **[Enhancement 2]:** [What was improved]

---

## Bug Fixes

- **[Fix 1]:** Fixed [issue description]
  - Impact: [Who was affected]
  - Resolution: [How it was fixed]
- **[Fix 2]:** [Description]

---

## Performance Improvements

- **[Improvement 1]:** [Metric before] → [Metric after] ([X]% improvement)
  - Details: [What was optimized]
- **[Improvement 2]:** [Metric improvement]

**Performance Baselines:**
- P95 Latency: [Xms] (established as baseline v1.0)
- Throughput: [Y] req/s

---

## Security

- **[Security Fix 1]:** Fixed [CVE-YYYY-XXXXX] - [Vulnerability description]
  - Severity: [Critical / High]
  - Resolution: [How it was fixed]
- **Security Scan Results:**
  - Critical: 0
  - High: 0
  - Medium: [N] (documented with mitigation)

---

## Deprecations & Breaking Changes

**Deprecated in this release:**
- **[Feature/API 1]:** Deprecated in v[X.Y.Z], will be removed in v[X+1].0.0
  - Migration path: [How to migrate to new API]
  - Timeline: [Removal date]

**Breaking Changes:**
- **[Change 1]:** [What changed and why]
  - Migration: [How to update existing code]

---

## Known Issues

- **[Issue 1]:** [Description of known limitation]
  - Workaround: [How users can work around this]
  - Planned fix: v[X.Y.Z+1]
- **[Issue 2]:** [Description]

---

## Upgrade Instructions

### From v[X.Y.Z-1]

**Prerequisites:**
1. [Prerequisite 1]
2. [Prerequisite 2]

**Steps:**
1. **Backup:** Create database backup
   ```bash
   pg_dump database_name > backup_v[X.Y.Z-1].sql
   ```

2. **Update dependencies:**
   ```bash
   npm install [package]@[X.Y.Z]
   ```

3. **Run migrations:**
   ```bash
   npm run migrate
   ```

4. **Verify:**
   ```bash
   npm test
   npm run verify-deployment
   ```

**Rollback Procedure:**
```bash
# If issues occur
git checkout v[X.Y.Z-1]
psql database_name < backup_v[X.Y.Z-1].sql
```

---

## Technical Details

**Technology Stack:**
- [Tech 1]: v[A.B.C]
- [Tech 2]: v[D.E.F]
- [Tech 3]: v[G.H.I]

**Dependencies Updated:**
| Package | Previous | Current | Reason |
|---------|----------|---------|--------|
| [package-1] | [X.Y.Z] | [A.B.C] | Security fix |
| [package-2] | [X.Y.Z] | [A.B.C] | Performance improvement |

---

## Contributors

**Team:**
- [Name 1]: [Contribution]
- [Name 2]: [Contribution]
- CodeMaestro System: Architecture and quality assurance

**Special Thanks:**
- [Person/Team]: [For what]

---

## Verification Evidence

**Quality Gates (All Passed):**
- ✅ Test Coverage: [X]% (E30: ≥70%)
- ✅ Security: 0 critical, 0 high vulnerabilities (E31)
- ✅ Performance: No regressions >25% (E32)
- ✅ ACs Verified: [Total]/[Total] (E33)
- ✅ Ethics: Validated

**Evidence Package:** `docs/verification/evidence-package-v[X.Y.Z].md`

---

## What's Next

**Upcoming in v[X.Y+1.Z]:**
- [Planned feature 1]
- [Planned feature 2]

**Roadmap:**
- See [ROADMAP.md] for long-term vision

---

## Support

**Documentation:** [Link to docs]
**Issues:** [Link to issue tracker]
**Discussion:** [Link to community forum]

---

## Version

**Release Notes Version:** 1.0
**Release Version:** v[X.Y.Z]
**CodeMaestro:** v1.0.0
**Published:** [YYYY-MM-DD]
```

---

## Template 2: Lessons Learned {#lessons-learned}

```markdown
# Lessons Learned: [Project Name] v[X.Y.Z]

**Release Date:** [YYYY-MM-DD]
**Team:** [Team Members]
**Retrospective Date:** [YYYY-MM-DD]
**Facilitator:** [Name or "Release Manager"]
**CodeMaestro:** v1.0.0

---

## Project Overview

**Duration:** [Start Date] → [End Date] ([N] weeks)
**Team Size:** [N] developers
**Domain:** [Mobile / Web / Cloud / AI/ML]
**Skill Tier:** [Beginner / Advanced / Ninja]

**Scope:**
- Functional Requirements: [N]
- Non-Functional Requirements: [M]
- Acceptance Criteria: [K]
- Tasks Completed: [L]

---

## What Went Well ✅

### Technical Achievements

1. **[Achievement 1]:** [What succeeded]
   - **Why it worked:** [Contributing factors]
   - **Impact:** [Measurable outcome]
   - **Reuse:** [Pattern ID to document in KB]

2. **[Achievement 2]:** [What succeeded]
   - **Why it worked:**
   - **Impact:**
   - **Reuse:**

### Process Successes

1. **[Process success 1]:** [What process worked well]
   - **Evidence:** [Metrics or feedback]
   - **Recommendation:** Continue this practice

2. **[Process success 2]:**

### Team Collaboration

- **[Collaboration strength 1]:** [What worked well in teamwork]
- **[Collaboration strength 2]:**

---

## What Could Be Improved ⚠️

### Technical Challenges

1. **[Challenge 1]:** [What was difficult]
   - **Root Cause:** [Why it was challenging]
   - **Impact:** [Time lost, quality affected, etc.]
   - **Prevention:** [How to avoid in future]
   - **KB Entry:** F-[ID] (document as failure pattern)

2. **[Challenge 2]:**

### Process Inefficiencies

1. **[Inefficiency 1]:** [What slowed us down]
   - **Impact:** [X] hours lost
   - **Improvement:** [Proposed solution]

2. **[Inefficiency 2]:**

### Tool & Infrastructure Issues

- **[Issue 1]:** [Tool or infrastructure problem]
  - **Impact:**
  - **Solution:**

---

## Action Items

| Item | Owner | Priority | Deadline | Status |
|------|-------|----------|----------|--------|
| [Action 1: Process improvement] | [Name] | High | [Date] | [ ] |
| [Action 2: Tool enhancement] | [Name] | Medium | [Date] | [ ] |
| [Action 3: Documentation update] | [Name] | Low | [Date] | [ ] |

---

## Metrics

### Velocity

**Task Completion:**
- Planned tasks: [N]
- Completed: [M]
- Completion rate: [X]%

**Effort Tracking:**
- Estimated total effort: [X] hours
- Actual total effort: [Y] hours
- Variance: [±Z]%

### Quality

**Production Bugs:**
- Bugs found in production: [N]
- Critical: [X]
- High: [Y]
- Medium: [Z]

**Post-Release:**
- Issues within 7 days: [N]
- Issues within 30 days: [M]

### Performance

**Before vs After:**
- P95 Latency: [Before]ms → [After]ms ([±X]% change)
- Throughput: [Before] req/s → [After] req/s ([±Y]% change)
- Resource usage: [Before] → [After]

---

## Key Decisions

### Architecture Decisions

| ADR | Decision | Outcome | Would We Do It Again? |
|-----|----------|---------|----------------------|
| ADR-001 | [Decision title] | [Positive / Mixed / Negative] | [Yes / Maybe / No] |
| ADR-002 | [Decision title] | [Outcome] | [Yes / Maybe / No] |

**Rationale for outcomes:**
- ADR-001: [Why the outcome was positive/negative]

### Implementation Decisions

| DEC-ID | Decision | Impact | Lesson |
|--------|----------|--------|--------|
| DEC-001 | [Decision] | [High / Medium / Low] | [What we learned] |

---

## Patterns & Failures

### Successful Patterns (Add to KB)

1. **Pattern P-[ID]:** [Pattern name]
   - **Context:** [When applicable]
   - **Solution:** [What worked]
   - **Confidence:** [High / Medium / Low]
   - **Reusability:** [Other domains where applicable]

2. **Pattern P-[ID]:**

### Failure Patterns (Add to KB)

1. **Failure F-[ID]:** [Failure name]
   - **Symptom:** [What happened]
   - **Root Cause:** [Why]
   - **Resolution:** [How fixed]
   - **Prevention:** [How to avoid]

2. **Failure F-[ID]:**

---

## Recommendations for Next Project

### Process Improvements

1. **[Recommendation 1]:** [What to do differently]
   - **Rationale:** [Why this will help]
   - **Effort:** [X] hours to implement

2. **[Recommendation 2]:**

### Tool Enhancements

- **[Tool enhancement 1]:** [What to add/improve]
- **[Tool enhancement 2]:**

### Training Needs

- **[Training 1]:** [Skill gap identified]
- **[Training 2]:**

---

## Team Feedback

**What the team said:**

**Positive Highlights:**
- "[Quote from team member about what worked well]"
- "[Another positive quote]"

**Areas for Improvement:**
- "[Quote about challenge or improvement area]"
- "[Another improvement suggestion]"

---

## Knowledge Base Updates

**Patterns Added:**
- P-[ID]: [Pattern name] → `.CodeMaestro/knowledge-base/patterns/`

**Failures Documented:**
- F-[ID]: [Failure name] → `.CodeMaestro/knowledge-base/failures/`

**Decisions Indexed:**
- [N] ADRs added to decision index

---

## Version

**Lessons Learned Version:** 1.0
**Release:** v[X.Y.Z]
**CodeMaestro:** v1.0.0
**Date:** [YYYY-MM-DD]
```

---

## Template 3: Post-Mortem (For Issues) {#post-mortem}

```markdown
# Post-Mortem: [Incident Title]

**Incident Date:** [YYYY-MM-DD]
**Resolution Date:** [YYYY-MM-DD]
**Severity:** [Critical / High / Medium / Low]
**Author:** [Name]
**Status:** [Resolved / Ongoing / Monitoring]

---

## Incident Summary

**What Happened:**
[Brief description of the incident - what broke, what was the user impact]

**Duration:** [X] hours
**User Impact:** [N] users affected, [Service/Feature] unavailable

---

## Timeline

| Time | Event | Action Taken |
|------|-------|--------------|
| HH:MM | [Event 1: Issue detected] | [Action 1] |
| HH:MM | [Event 2: Investigation started] | [Action 2] |
| HH:MM | [Event 3: Root cause identified] | [Action 3] |
| HH:MM | [Event 4: Fix deployed] | [Action 4] |
| HH:MM | [Event 5: Service restored] | [Action 5] |

---

## Root Cause Analysis

### Symptoms

**Observable Problems:**
- [Symptom 1: e.g., 500 errors on /api/orders]
- [Symptom 2: e.g., Database connection timeouts]
- [Symptom 3: e.g., Memory usage spiked to 95%]

### Investigation

**Hypothesis 1:** [Initial hypothesis]
- **Testing:** [How we tested this]
- **Result:** [Ruled out / Confirmed]

**Hypothesis 2:** [Another hypothesis]
- **Testing:**
- **Result:**

### Root Cause

**Primary Cause:** [The fundamental reason for failure]

**Contributing Factors:**
1. [Contributing factor 1]
2. [Contributing factor 2]

**Why It Wasn't Caught Earlier:**
- [Reason 1: e.g., Edge case not in test suite]
- [Reason 2: e.g., Load testing didn't simulate production patterns]

---

## Resolution

### Immediate Fix

**What was deployed:**
- [Fix 1: Code change description]
- [Fix 2: Configuration change]

**Verification:**
- [How fix was verified before deployment]

**Deployment Time:** [X] minutes

### Long-Term Fix

**Permanent Solution:**
- [Structural change to prevent recurrence]

**Implementation:**
- Task: T-[ID]
- Timeline: [When this will be implemented]

---

## Impact Assessment

### User Impact

- **Users Affected:** [N] ([X]% of user base)
- **Duration:** [X] hours
- **Severity:** [Critical / High / Medium / Low]
- **Data Loss:** [None / Describe if any]

### Business Impact

- **Revenue Impact:** [$X] (estimated)
- **SLA Breach:** [Yes / No]
- **Reputation Impact:** [Assessment]

### Technical Impact

- **Services Affected:** [List services]
- **Data Integrity:** [Maintained / Compromised]
- **Recovery Time:** [X] hours

---

## Prevention Measures

### Immediate Actions (Completed)

- [x] [Action 1: e.g., Added monitoring alert for database connections]
- [x] [Action 2: e.g., Increased connection pool size]
- [x] [Action 3: e.g., Added circuit breaker]

### Short-Term Actions (1-2 weeks)

- [ ] [Action 1: e.g., Add load test covering this scenario]
- [ ] [Action 2: e.g., Implement auto-scaling for database]

### Long-Term Actions (1-3 months)

- [ ] [Action 1: e.g., Redesign connection management]
- [ ] [Action 2: e.g., Implement read replicas]

---

## Process Improvements

**Testing:**
- [Improvement 1: e.g., Add production-like load testing]
- [Improvement 2: e.g., Test edge cases more thoroughly]

**Monitoring:**
- [Improvement 1: e.g., Add alerting for connection pool saturation]
- [Improvement 2: e.g., Improve dashboard visibility]

**Deployment:**
- [Improvement 1: e.g., Implement blue-green deployment]
- [Improvement 2: e.g., Add automated rollback triggers]

---

## Constraint Violations

**Violated Constraints:**
- [Constraint ID]: [How it was violated]
  - **Why:** [Reason for violation]
  - **Prevention:** [How to enforce in future]

**Process Updates:**
- [How to prevent constraint violations]

---

## Knowledge Base Entry

**Failure Pattern:** F-[ID]
**Location:** `.CodeMaestro/knowledge-base/failures/F[ID]-[short-name].md`

**Will Include:**
- Symptoms
- Root cause
- Resolution
- Prevention measures

---

## Follow-Up Actions

| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| [Action 1] | [Name] | [Date] | [ ] |
| [Action 2] | [Name] | [Date] | [ ] |

**Review Date:** [YYYY-MM-DD] (verify actions completed)

---

## Acknowledgments

**Response Team:**
- [Name 1]: [Role in resolution]
- [Name 2]: [Role in resolution]

**Communication:**
- User notification: [When and how users were informed]
- Stakeholder updates: [How stakeholders were kept informed]

---

## Version

**Post-Mortem Version:** 1.0
**Incident:** [Incident ID]
**CodeMaestro:** v1.0.0
**Date:** [YYYY-MM-DD]
```

---

## Template 4: Portfolio Entry {#portfolio-entry}

```markdown
# Portfolio: [Project Name]

**Version:** v[X.Y.Z]
**Domain:** [Mobile / Web / Cloud / AI/ML]
**Timeline:** [Start Date] → [End Date] ([N] weeks)
**Team Size:** [N] developers
**CodeMaestro:** v1.0.0

---

## Project Overview

**Description:**
[2-3 sentences describing what was built and why]

**One-Line Requirement:**
[The locked requirement from Phase 1]

**Target Users:**
[Who this project serves]

---

## Outcomes & Metrics

### Delivered Features

**Functional Requirements:** [N]/[N] delivered ([100]%)
**Non-Functional Requirements:** [M]/[M] met ([100]%)

**Key Features:**
- [Feature 1]: [Description]
- [Feature 2]: [Description]
- [Feature 3]: [Description]

### Quality Metrics

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| Test Coverage | ≥70% | [X]% | ✅ |
| Security Issues | 0 C/H | 0 C/H | ✅ |
| AC Pass Rate | 100% | [Y]% | ✅ |
| Performance | No regression >25% | [Z]% max | ✅ |

**Quality Gate Results:**
- E30: ✅ Test coverage [X]%
- E31: ✅ Zero critical/high security issues
- E32: ✅ Performance within thresholds
- E33: ✅ All ACs verified

### Performance Baselines

| Metric | Baseline | Notes |
|--------|----------|-------|
| P95 Latency | [X]ms | [Endpoint with highest latency] |
| Throughput | [Y] req/s | [Peak sustained throughput] |
| Concurrent Users | [Z] | [Maximum tested] |

---

## Technology Stack

**Core Technologies:**
| Category | Technology | Version | Why Chosen |
|----------|------------|---------|------------|
| Language | [e.g., TypeScript] | [X.Y.Z] | [Brief rationale] |
| Framework | [e.g., React] | [A.B.C] | [Brief rationale] |
| Database | [e.g., PostgreSQL] | [D.E.F] | [Brief rationale] |
| Cloud | [e.g., AWS] | N/A | [Brief rationale] |

**Full stack:** See `docs/architecture/blueprint-v1.0.md`

---

## Architecture

**Pattern:** [e.g., Microservices, Layered, Event-Driven]

**Key Components:**
- [Component 1]: [Purpose]
- [Component 2]: [Purpose]
- [Component 3]: [Purpose]

**Architecture Diagram:**
```mermaid
[System context diagram or component diagram]
```

---

## Success Patterns

**Patterns Documented in Knowledge Base:**

1. **P-[ID]: [Pattern Name]**
   - **Context:** [When to use]
   - **Confidence:** [High / Medium / Low]
   - **Used In:** [Tasks where applied]
   - **Location:** `.CodeMaestro/knowledge-base/patterns/P[ID]-[name].md`

2. **P-[ID]: [Pattern Name]**
   - **Context:**
   - **Confidence:**
   - **Used In:**

**Total Patterns Documented:** [N]

---

## Lessons Learned

### Key Insights

1. **[Learning 1]:** [What we learned]
   - **Application:** [Where to apply this learning]

2. **[Learning 2]:**

### Estimation Accuracy

**Overall Variance:** [±X]%

**Accuracy by Category:**
- Infrastructure tasks: [±Y]%
- Feature development: [±Z]%
- Testing: [±W]%

**Estimation Multipliers Identified:**
- New technology: [X.Y]x
- Pattern reuse: [X.Y]x
- Complex integration: [X.Y]x

---

## Failure Patterns

**Failures Documented in Knowledge Base:**

1. **F-[ID]: [Failure Name]**
   - **Severity:** [High / Medium / Low]
   - **Impact:** [X] hours lost
   - **Prevention:** [Key takeaway]
   - **Location:** `.CodeMaestro/knowledge-base/failures/F[ID]-[name].md`

2. **F-[ID]: [Failure Name]**

**Total Failures Documented:** [N]

---

## Key Decisions

**Architectural Decisions:**
| ADR | Decision | Outcome | Confidence |
|-----|----------|---------|------------|
| ADR-001 | [Decision title] | [Positive / Mixed / Negative] | [High / Medium / Low] |
| ADR-002 | [Decision title] | [Outcome] | [Confidence] |

**Would Do Again:**
- ✅ ADR-001: [Why this was a good decision]

**Would Reconsider:**
- ⚠️ ADR-002: [What we'd do differently]

---

## Business Value

**User Impact:**
- User satisfaction: [Metric or feedback]
- Feature adoption: [X]% of users
- Performance improvement: [Measurable impact]

**Business Metrics:**
- [Metric 1]: [Value]
- [Metric 2]: [Value]

---

## Competitive Position

**Market Differentiation:**
- [Differentiator 1]: [How we stand out]
- [Differentiator 2]: [Competitive advantage]

**Validation:**
- [How differentiators were validated post-launch]

---

## Deployment & Operations

**Deployment:**
- Platform: [AWS / GCP / Azure / On-prem]
- Strategy: [Blue-green / Rolling / Canary]
- Automation: [CI/CD tools used]

**Post-Release:**
- Uptime: [X]% (target: 99.9%)
- Incidents: [N] (Critical: [M], High: [K])
- MTTR (Mean Time To Resolution): [X] minutes

**Monitoring:**
- Dashboards: [N] created
- Alerts: [M] configured
- Tools: [Monitoring stack]

---

## Documentation

**Created:**
- Locked Specification: v1.0
- Architecture Blueprint: v1.0
- Evidence Package: v1.0
- Release Notes: v[X.Y.Z]

**Quality:**
- API documentation: ✅ Complete
- User guides: ✅ Complete
- Developer docs: ✅ Complete

---

## Recommendations for Future Projects

### Keep Doing

1. **[Practice 1]:** [What worked and should continue]
2. **[Practice 2]:**

### Start Doing

1. **[New practice 1]:** [What to add to process]
2. **[New practice 2]:**

### Stop Doing

1. **[Practice to stop]:** [What didn't work and should be eliminated]
2. **[Practice to stop]:**

---

## Portfolio Status

**Project Status:** [✅ Successful / ⚠️ Conditional Success / ❌ Failed]

**Overall Assessment:**
[1-2 paragraphs summarizing the project outcome, learnings, and value delivered]

---

## Version

**Portfolio Entry Version:** 1.0
**Project Version:** v[X.Y.Z]
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 5: Knowledge Base Pattern Entry {#kb-pattern}

```markdown
# Pattern P-[ID]: [Pattern Name]

**Confidence:** [High / Medium / Low]
**Domain:** [Mobile / Web / Cloud / AI/ML / General]
**Phase:** [Where applicable: 1-5]
**Added:** [YYYY-MM-DD]
**Used In:** [Project names]

---

## Context

**When to use this pattern:**
[Describe the situation where this pattern applies]

**Problem it solves:**
[What problem this pattern addresses]

---

## Solution

**Pattern Description:**
[Detailed description of the pattern]

**Implementation:**
```[language]
[Code example or pseudocode]
```

**Key Points:**
- [Key point 1]
- [Key point 2]

---

## Benefits

- ✅ [Benefit 1]
- ✅ [Benefit 2]
- ✅ [Benefit 3]

---

## Trade-offs

- ⚠️ [Trade-off 1]: [Mitigation]
- ⚠️ [Trade-off 2]: [Mitigation]

---

## Usage Examples

**Project:** [Project Name]
**Tasks:** T-[ID], T-[ID]
**Outcome:** [Positive / Mixed / Negative]
**Notes:** [Specific learnings from usage]

---

## Related Patterns

- P-[ID]: [Related pattern name]
- P-[ID]: [Alternative pattern]

---

## Tags

[pattern-tag-1], [pattern-tag-2], [domain], [technology]

---

## Version

**Pattern Version:** 1.0
**CodeMaestro:** v1.0.0
```

---

## Template 6: Knowledge Base Failure Entry {#kb-failure}

```markdown
# Failure F-[ID]: [Failure Name]

**Severity:** [Critical / High / Medium / Low]
**Phase:** [Where it occurred: 1-5]
**Project:** [Project Name]
**Date:** [YYYY-MM-DD]
**Status:** [Resolved / Mitigated / Ongoing]

---

## Symptoms

**Observable Problems:**
- [Symptom 1]
- [Symptom 2]

**When Discovered:**
- Phase: [Phase number]
- Activity: [What was being done]
- Environment: [Dev / Staging / Prod]

---

## Root Cause

**Investigation:**
[How root cause was identified]

**Root Cause:**
[Fundamental reason for failure]

**Contributing Factors:**
- [Factor 1]
- [Factor 2]

---

## Resolution

**Solution Applied:**
[What was done to fix]

**Code Changes:**
- `[file1]`: [Change]
- `[file2]`: [Change]

**Verification:**
- [How fix was verified]

---

## Prevention

**How to Avoid in Future:**

1. **Detection:** [How to catch this earlier]
   - [Specific check or test to add]

2. **Prevention:** [How to prevent occurrence]
   - [Process change]
   - [Tool enhancement]
   - [Constraint enforcement]

3. **Mitigation:** [How to reduce impact if it occurs]
   - [Monitoring alert]
   - [Fallback strategy]

---

## Impact

**Time Lost:** [X] hours

**Rework Required:**
- [Component 1]: [Extent of rework]
- [Component 2]: [Extent of rework]

**User Impact:**
- [None / Description of impact]

---

## Related Constraints

**Violated Constraint:**
- [Constraint ID]: [How it was violated]

**Enhanced Enforcement:**
- [How to better enforce this constraint]

---

## Lessons Learned

**Key Takeaways:**
1. [Takeaway 1]
2. [Takeaway 2]

**Recommendations:**
- [Recommendation for similar projects]

---

## Tags

[failure-tag-1], [failure-tag-2], [phase], [domain]

---

## Version

**Failure Entry Version:** 1.0
**CodeMaestro:** v1.0.0
```

---

## Usage Notes

**When to Load Templates:**
- Release Notes: Before final release deployment
- Lessons Learned: After release, during retrospective
- Post-Mortem: After resolving critical incidents
- Portfolio Entry: End of project for organizational records
- KB Pattern Entry: When documenting successful patterns
- KB Failure Entry: When documenting failures and learnings

**Skill Tier Adaptations:**
- **Beginner:** Include all sections with detailed explanations
- **Advanced:** Focus on key outcomes and learnings
- **Ninja:** Minimal documentation, essential metrics only

---

## Version

**Templates Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** 2026-01-13
