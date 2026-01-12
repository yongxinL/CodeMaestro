#!/bin/bash

# CodeMaestro - Initialization Script
# Run this script to set up the project documentation structure

set -e

echo "🚀 Initializing CodeMaestro..."
echo ""

# Create directory structure
echo "📁 Creating directory structure..."

mkdir -p docs/{config/roles,prompts,specifications,analysis,architecture/tasks,architecture/api-contracts,implementation/context-packages/state-flow-diagrams,verification/evidence-packages,verification/performance-baselines,release/runbooks,team,knowledge-base/{failures,patterns,decisions},portfolio}

# Create placeholder files
echo "📄 Creating placeholder files..."

# Config files
cat > docs/config/roles/custom-roles.md << 'EOF'
# Custom Roles

> Define custom roles here to override or extend the default role system.
> See `./docs/prompts/00-core.md#custom-role-template` for the template.

## Custom Roles

<!-- Add your custom role definitions below -->

EOF

cat > docs/config/thresholds.md << 'EOF'
# Quality Thresholds

> Override default thresholds here if needed.
> Default values are defined in `./docs/prompts/00-core.md`.

## Project-Specific Overrides

<!-- Uncomment and modify to override defaults

## Blocking Thresholds
| Metric | Minimum |
|--------|---------|
| Test Coverage | 70% |
| Critical Security Issues | 0 |
| High Security Issues | 0 |
| AC Pass Rate | 100% |

## Target Thresholds
| Metric | Target |
|--------|--------|
| Test Coverage | 85% |
| Cyclomatic Complexity | <10 |
| Code Duplication | <5% |

-->
EOF

cat > docs/config/team.md << 'EOF'
# Team Configuration

## Mode
enabled: false

## Team Members
<!-- Uncomment and fill in when enabling team mode

| Name | GitHub | Role | Modules |
|------|--------|------|---------|
| [Name] | @handle | Lead | M1, M2 |
| [Name] | @handle | Developer | M3 |

-->

## Branch Protection
<!-- Uncomment when enabling team mode

- Require PR for: develop, main
- Required approvals: 1
- Required checks: lint, test

-->

## Code Review Policy
<!-- Uncomment when enabling team mode

- Self-review: Allowed for Ninja tier
- Cross-review: Required for Beginner tier

-->
EOF

# Knowledge Base files (NEW in v1.0)
cat > docs/knowledge-base/README.md << 'EOF'
# Knowledge Base

## Overview

The Knowledge Base is a project-specific learning system that captures patterns, failures, and architectural decisions across all phases of development.

## Structure

### `/failures/`
Documents failure patterns encountered during development:
- Root causes
- Solutions applied
- Prevention strategies
- Links to replanning contexts

### `/patterns/`
Documents successful patterns discovered:
- Design patterns that worked well
- Architecture decisions that paid off
- Implementation approaches worth repeating
- Performance optimization techniques

### `/decisions/`
Index of key architectural and technical decisions:
- Cross-references to decision log entries
- Searchable by topic, date, phase
- Impact analysis over time

## Usage

### Adding a Failure
```bash
/kb add failure
```
CodeMaestro will guide you through documenting the failure.

### Adding a Pattern
```bash
/kb add pattern
```
Document successful approaches for future reference.

### Searching
```bash
/kb search [query]
```
Find relevant patterns or failures from past work.

## Benefits

- **Avoid Repetition:** Learn from past mistakes
- **Accelerate Development:** Reuse proven patterns
- **Preserve Knowledge:** Capture architectural rationale
- **Self-Evolving:** System gets smarter with each iteration
EOF

cat > docs/knowledge-base/failures/failure-template.md << 'EOF'
# Failure: [Failure ID] - [Short Description]

## Meta
| Field | Value |
|-------|-------|
| ID | F-[XXX] |
| Date | [Date] |
| Phase | [Phase where failure occurred] |
| Task | [Task ID if applicable] |
| Severity | [Low / Medium / High / Critical] |

## Description
[Clear description of what failed]

## Root Cause
[Primary cause of the failure]

## Contributing Factors
1. [Factor 1]
2. [Factor 2]

## Solution Applied
[How the failure was resolved]

## Prevention Strategy
[How to avoid this failure in future]

## Related
- Decision Log: [Link to relevant decision]
- Context Package: [Link if applicable]
- Similar Failures: [Links to related failures]

## Tags
[tag1] [tag2] [tag3]
EOF

cat > docs/knowledge-base/patterns/pattern-template.md << 'EOF'
# Pattern: [Pattern ID] - [Short Name]

## Meta
| Field | Value |
|-------|-------|
| ID | P-[XXX] |
| Date | [Date] |
| Phase | [Phase where discovered] |
| Category | [Architecture / Implementation / Design / Performance] |

## Context
[When should this pattern be used?]

## Problem
[What problem does this pattern solve?]

## Solution
[Description of the pattern]

## Implementation
```
[Code example or architectural diagram]
```

## Benefits
- [Benefit 1]
- [Benefit 2]

## Trade-offs
- [Trade-off 1]
- [Trade-off 2]

## Related Patterns
- [Related pattern 1]
- [Related pattern 2]

## Examples in This Project
- Task: [Task ID] - [Where this pattern was applied]

## Tags
[tag1] [tag2] [tag3]
EOF

cat > docs/knowledge-base/decisions/decision-index.md << 'EOF'
# Decision Index

## Overview

Cross-reference index of all architectural and technical decisions made during the project.

## By Phase

### Phase 1: Requirements
| Decision | Date | Impact | Reference |
|----------|------|--------|-----------|
| [Decision] | [Date] | [Low/Med/High] | [Link to decision log] |

### Phase 2: Planning
| Decision | Date | Impact | Reference |
|----------|------|--------|-----------|
| [Decision] | [Date] | [Low/Med/High] | [Link to decision log] |

### Phase 3: Implementation
| Decision | Date | Impact | Reference |
|----------|------|--------|-----------|
| [Decision] | [Date] | [Low/Med/High] | [Link to decision log] |

## By Category

### Architecture
| Decision | Phase | Rationale | Reference |
|----------|-------|-----------|-----------|
| [Decision] | [Phase] | [Why] | [Link] |

### Technology
| Decision | Phase | Rationale | Reference |
|----------|-------|-----------|-----------|
| [Decision] | [Phase] | [Why] | [Link] |

### Security
| Decision | Phase | Rationale | Reference |
|----------|-------|-----------|-----------|
| [Decision] | [Phase] | [Why] | [Link] |

## High-Impact Decisions

| Decision | Date | Impact | Outcome |
|----------|------|--------|---------|
| [Decision] | [Date] | [Description] | [Result] |
EOF

# Portfolio files (NEW in v1.0)
cat > docs/portfolio/README.md << 'EOF'
# Portfolio Generation

## Overview

CodeMaestro can automatically generate professional portfolio materials from your project artifacts.

## What Gets Generated

1. **Project Summary:** Executive overview with key metrics
2. **Architecture Showcase:** Visual diagrams and design rationale
3. **Implementation Highlights:** Key technical achievements
4. **Performance Report:** Metrics and optimizations

## Generation

Portfolio generation is **on-demand**:

```bash
/portfolio generate
```

## Output Format

All portfolio materials are generated in **Markdown** format:
- Easy to version control
- Convert to PDF/HTML as needed
- Tool-agnostic
- Future-proof

## Customization

Templates can be customized in this directory:
- `project-summary-template.md`
- `architecture-showcase-template.md`
- `implementation-highlights-template.md`
- `performance-report-template.md`

## When to Generate

Best times to generate portfolio materials:
- After successful v1.0 release
- After major feature releases
- For client deliverables
- For team showcases
- For case studies

## Preview

Before generating final portfolio:
```bash
/portfolio preview
```
EOF

cat > docs/portfolio/project-summary-template.md << 'EOF'
# [Project Name] - Project Summary

## Executive Overview

**Project:** [Project Name]
**Duration:** [Start Date] - [End Date]
**Status:** [Complete / In Progress]
**Version:** [Current Version]

[2-3 sentence description of what the project does and its value proposition]

## Key Metrics

| Metric | Value |
|--------|-------|
| Development Time | [X] weeks |
| Team Size | [Y] developers |
| Lines of Code | [Z] |
| Test Coverage | [W]% |
| Performance | [Key metric] |

## Problem Statement

[What problem does this project solve?]

## Solution Approach

[How does the project solve the problem?]

## Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | [Tech] |
| Backend | [Tech] |
| Database | [Tech] |
| Infrastructure | [Tech] |

## Key Features

1. **[Feature 1]:** [Description]
2. **[Feature 2]:** [Description]
3. **[Feature 3]:** [Description]

## Achievements

- ✅ [Achievement 1]
- ✅ [Achievement 2]
- ✅ [Achievement 3]

## Challenges Overcome

### [Challenge 1]
**Problem:** [Description]
**Solution:** [How it was solved]
**Outcome:** [Result]

## Competitive Advantage

[What makes this project stand out from alternatives?]

## Future Roadmap

- [ ] [Planned enhancement 1]
- [ ] [Planned enhancement 2]

## Team & Roles

| Role | Responsibilities |
|------|------------------|
| [Role] | [Responsibilities] |

## Links

- GitHub: [Repository URL]
- Documentation: [Docs URL]
- Live Demo: [Demo URL]
EOF

cat > docs/portfolio/architecture-showcase-template.md << 'EOF'
# [Project Name] - Architecture Showcase

## System Overview

[High-level description of the system architecture]

## Architecture Diagram

```mermaid
[Include system context diagram from blueprint]
```

## Design Philosophy

**Key Principles:**
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]

## Component Architecture

### [Component 1]
**Responsibility:** [What this component does]
**Technology:** [Tech used]
**Key Design Decisions:**
- [Decision 1]
- [Decision 2]

[Repeat for each major component]

## Data Architecture

### Data Flow
```mermaid
[Include data flow diagram]
```

### State Management
[Description of state management approach]

## Security Architecture

**Authentication:** [Approach]
**Authorization:** [Approach]
**Data Protection:** [Approach]

## Scalability Design

**Current Capacity:** [Metrics]
**Scaling Strategy:** [Horizontal / Vertical / Both]
**Bottleneck Mitigation:** [Approaches]

## Key Architectural Decisions

### [Decision 1]
**Context:** [Why this decision was needed]
**Options Considered:** [Alternatives]
**Decision:** [What was chosen]
**Rationale:** [Why]
**Outcome:** [Result]

[Repeat for each major ADR]

## Performance Considerations

[Key performance optimizations and their impact]

## Domain-Specific Adaptations

**Domain:** [Mobile / Web / Cloud / AI]
**Adaptations:**
- [Adaptation 1]
- [Adaptation 2]

## Lessons Learned

**What Worked Well:**
- [Success 1]
- [Success 2]

**What We'd Do Differently:**
- [Improvement 1]
- [Improvement 2]
EOF

cat > docs/portfolio/implementation-highlights-template.md << 'EOF'
# [Project Name] - Implementation Highlights

## Overview

[Brief description of the implementation phase]

**Duration:** [X] weeks
**Total Tasks:** [Y]
**Estimation Accuracy:** [Z]%

## Technical Achievements

### [Achievement 1]
**Challenge:** [What was difficult]
**Approach:** [How it was solved]
**Outcome:** [Result with metrics]

[Repeat for each major achievement]

## State Management Excellence

[Description of state management approach and its benefits]

## Code Quality Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Test Coverage | [X]% | 85% | [✅/⚠️] |
| Complexity | [Y] | <10 | [✅/⚠️] |
| Duplication | [Z]% | <5% | [✅/⚠️] |

## Notable Implementations

### [Feature 1]
```
[Code snippet or architectural pattern]
```
**Why Notable:** [Explanation]

## Patterns Applied

1. **[Pattern 1]:** [Description and benefit]
2. **[Pattern 2]:** [Description and benefit]
3. **[Pattern 3]:** [Description and benefit]

## Performance Optimizations

| Optimization | Before | After | Improvement |
|--------------|--------|-------|-------------|
| [Optimization 1] | [Metric] | [Metric] | [%] |

## Lessons from Failures

[Key learnings from failures encountered and overcome]

## Developer Experience

**What Made Development Smooth:**
- [Factor 1]
- [Factor 2]

**Challenges Faced:**
- [Challenge 1]: [How overcome]

## Reusable Components

[Components or patterns created that could be reused in other projects]

## Testing Strategy

**Coverage:**
- Unit Tests: [X]
- Integration Tests: [Y]
- E2E Tests: [Z]

**Notable Test Cases:**
- [Test case that caught critical bug]
- [Test case for complex scenario]

## Continuous Integration

[Description of CI/CD pipeline and its effectiveness]
EOF

cat > docs/portfolio/performance-report-template.md << 'EOF'
# [Project Name] - Performance Report

## Executive Summary

**System Performance:** [Excellent / Good / Acceptable]
**Key Metric:** [Primary performance indicator]
**Baseline Established:** [Date]

## Performance Metrics

### Response Time

| Percentile | Target | Actual | Status |
|------------|--------|--------|--------|
| P50 | <100ms | [X]ms | [✅/⚠️/❌] |
| P95 | <200ms | [Y]ms | [✅/⚠️/❌] |
| P99 | <500ms | [Z]ms | [✅/⚠️/❌] |

### Throughput

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Requests/sec | 1000 | [X] | [✅/⚠️/❌] |
| Error Rate | <1% | [Y]% | [✅/⚠️/❌] |

### Resource Utilization

| Resource | Average | Peak | Status |
|----------|---------|------|--------|
| CPU | [X]% | [Y]% | [✅/⚠️/❌] |
| Memory | [X]MB | [Y]MB | [✅/⚠️/❌] |

## Visual Performance Baselines

[Include performance visualizations from verification phase]

### Latency Distribution
![Latency Distribution](../verification/performance-baselines/[version]-visuals/latency-distribution.png)

### Throughput Timeline
![Throughput Timeline](../verification/performance-baselines/[version]-visuals/throughput-timeline.png)

### Resource Utilization
![Resource Utilization](../verification/performance-baselines/[version]-visuals/resource-utilization.png)

## Performance Optimizations

### [Optimization 1]
**Issue:** [What was slow]
**Solution:** [What was done]
**Impact:** [Improvement with metrics]

[Repeat for each major optimization]

## Load Testing Results

**Test Profile:**
- Virtual Users: [X]
- Duration: [Y] minutes
- Ramp-up: [Z] seconds

**Results:**
- [Key finding 1]
- [Key finding 2]

## Bottleneck Analysis

### Current Bottlenecks
1. **[Bottleneck 1]:** [Description and mitigation plan]
2. **[Bottleneck 2]:** [Description and mitigation plan]

### Future Scalability

**Current Capacity:** [Supports X users / Y requests]
**Growth Headroom:** [Z% before scaling needed]
**Scaling Strategy:** [Approach]

## Performance Regression History

[If not first release, include regression comparison]

| Version | P95 Latency | Change | Throughput | Change |
|---------|-------------|--------|------------|--------|
| v1.0.0 | [X]ms | baseline | [Y] req/s | baseline |
| v1.1.0 | [X]ms | [±Z%] | [Y] req/s | [±Z%] |

## Monitoring & Alerts

**Metrics Tracked:**
- [Metric 1]
- [Metric 2]
- [Metric 3]

**Alert Thresholds:**
- [Alert condition 1]
- [Alert condition 2]

## Recommendations

### Short-term (Next Release)
- [ ] [Optimization 1]
- [ ] [Optimization 2]

### Long-term (Future Iterations)
- [ ] [Architectural improvement 1]
- [ ] [Architectural improvement 2]

## Benchmarking

**Compared to Similar Systems:**
| Metric | This System | Industry Average | Status |
|--------|-------------|------------------|--------|
| [Metric 1] | [Value] | [Value] | [Better/Same/Worse] |
EOF

# Architecture files
cat > docs/architecture/tasks/_index.md << 'EOF'
# Task Index

## Summary
| Metric | Value |
|--------|-------|
| Total Tasks | 0 |
| Completed | 0 |
| In Progress | 0 |
| Pending | 0 |

## By Milestone

<!-- Tasks will be added here during Phase 2 -->

EOF

cat > docs/architecture/tasks/_task-template.md << 'EOF'
# T-[X.X.X]: [Task Name]

## Meta
| Field | Value |
|-------|-------|
| Status | ⏳ Pending |
| Milestone | M[X]: [Name] |
| Module | M[X]-MOD[Y]: [Name] |
| Created | [Date] |
| Started | — |
| Completed | — |
| Assignee | Unassigned |

---

## Objective
[Clear, concise statement of what this task accomplishes]

---

## Acceptance Criteria Mapping

| AC ID | Criterion | Verification |
|-------|-----------|--------------|
| AC-XXX | [Criterion text] | [Test/Review] |

---

## Dependencies

### Requires (must complete first)
| Task | Status | Reason |
|------|--------|--------|
| — | — | — |

### Blocks (waiting on this)
| Task | Reason |
|------|--------|
| — | — |

---

## Parallelization

| Field | Value |
|-------|-------|
| Parallel Group | — |
| Can Run With | — |
| Sequential After | — |
| Blocks | — |

---

## Effort Tracking

| Type | Value |
|------|-------|
| Estimated | [X] hours |
| Actual | — |
| Variance | — |
| Variance % | — |

### Estimation Rationale
- Complexity: [Low/Medium/High]
- Risk factors: [List]

### Time Log
| Date | Duration | Notes |
|------|----------|-------|
| | | |

---

## Technical Notes

### Approach
[How this should be implemented]

### Files to Create/Modify
- [ ] `src/path/to/file` - [Purpose]
- [ ] `tests/path/to/test` - [Tests]

---

## Implementation Log

<!-- Populated during Phase 3 -->

---

## Verification

### Tests Required
- [ ] Unit tests for [component]
- [ ] Integration test for [flow]

### Manual Verification
- [ ] [Verification step]
EOF

cat > docs/architecture/tasks/_parallel-groups.md << 'EOF'
# Parallel Task Groups

## Overview

Parallel groups identify tasks that can execute concurrently.

## Groups

<!-- Parallel groups will be defined during Phase 2 -->

EOF

cat > docs/architecture/domain-adaptations.md << 'EOF'
# Domain-Specific Adaptations

## Overview

This document provides guidance for adapting CodeMaestro's architecture patterns to different project domains.

## Domain Detection

CodeMaestro automatically detects project domain based on:
- Technology stack keywords
- Functional requirements
- Non-functional requirements
- Deployment targets

## Mobile Projects

### Architecture Considerations
- Platform-specific UI/UX patterns (iOS HIG, Material Design)
- Cross-platform strategy (Native / React Native / Flutter)
- Offline-first data synchronization
- Battery and memory optimization
- App store deployment pipeline

### Task Types
- Platform-specific build configuration
- UI/UX optimization tasks
- Performance profiling (battery, memory)
- Platform API integration
- App store submission preparation

### Technology Patterns
- MVVM or MVI architecture
- Reactive state management
- Local-first data storage
- Background task handling

---

## Web Projects

### Architecture Considerations
- Responsive design (mobile-first)
- Frontend-backend separation (SPA / SSR / SSG)
- Browser compatibility matrix
- SEO optimization
- Progressive Web App capabilities
- CDN and caching strategies

### Task Types
- Responsive layout implementation
- Client-side routing
- Server-side rendering setup
- API client implementation
- SEO optimization tasks
- Performance optimization (bundle size, lazy loading)

### Technology Patterns
- Component-based architecture
- State management (Redux, Zustand, Context)
- API layer abstraction
- Error boundary patterns

---

## Cloud / Distributed Systems

### Architecture Considerations
- Service mesh architecture
- Distributed tracing and observability
- Cloud-native patterns (12-factor app)
- Horizontal scaling strategies
- Multi-region deployment
- Fault tolerance and circuit breakers

### Task Types
- Service containerization (Docker)
- Kubernetes manifest creation
- API gateway configuration
- Distributed tracing setup
- Load balancer configuration
- Auto-scaling policies

### Technology Patterns
- Microservices architecture
- Event-driven architecture
- CQRS and event sourcing
- Service discovery patterns
- Circuit breaker implementation

---

## AI / Machine Learning Projects

### Architecture Considerations
- Data pipeline architecture (ingestion, transformation, storage)
- Training vs. inference infrastructure separation
- Model serving and versioning
- Feature store design
- Model monitoring and drift detection
- Experiment tracking

### Task Types
- Data pipeline implementation
- Model training pipeline
- Model serving API
- Feature engineering
- Model evaluation and validation
- Monitoring dashboard setup

### Technology Patterns
- MLOps pipeline (training, validation, deployment)
- Feature store architecture
- Model registry
- A/B testing framework
- Monitoring and alerting for model performance

---

## Best Practices by Domain

### Mobile
- ✅ Optimize for battery and memory
- ✅ Implement offline-first patterns
- ✅ Use platform-specific UI patterns
- ✅ Profile on real devices
- ✅ Plan for app store review process

### Web
- ✅ Mobile-first responsive design
- ✅ Optimize bundle size and loading
- ✅ Implement proper caching strategies
- ✅ Ensure accessibility (WCAG)
- ✅ SEO optimization

### Cloud
- ✅ Design for failure
- ✅ Implement proper monitoring
- ✅ Use infrastructure as code
- ✅ Implement auto-scaling
- ✅ Multi-region considerations

### AI/ML
- ✅ Version control for data and models
- ✅ Reproducible training pipelines
- ✅ Monitor for model drift
- ✅ Implement proper experiment tracking
- ✅ Ethical AI considerations (bias, fairness)

---

## Integration with CodeMaestro

During Phase 2, CodeMaestro will:
1. Detect project domain
2. Apply domain-specific architecture patterns
3. Generate domain-specific tasks
4. Include domain best practices in blueprint
5. Reference this guide for implementation
EOF

# Implementation files
cat > docs/implementation/decision-log.md << 'EOF'
# Decision Log

## Overview

This log captures significant decisions made during implementation.

---

## Decisions

<!-- Decisions will be logged here during Phase 3 -->

EOF

cat > docs/implementation/task-checklist.md << 'EOF'
# Task Checklist

## Legend
| Marker | Meaning |
|--------|---------|
| ⏳ | Pending |
| 🔄 | In Progress |
| ✅ | Completed |
| ❌ | Failed |
| 🚫 | Blocked |
| 🔀 | Can Parallelize |

## Summary
| Metric | Count |
|--------|-------|
| Total | 0 |
| Completed | 0 |
| In Progress | 0 |
| Pending | 0 |

---

## Tasks

<!-- Tasks will be added here during Phase 2 -->

EOF

cat > docs/implementation/estimation-tracking.md << 'EOF'
# Estimation Tracking

## Summary
| Metric | Value |
|--------|-------|
| Total Estimated | — |
| Total Actual | — |
| Variance | — |

---

## By Task

| Task | Name | Est | Actual | Variance |
|------|------|-----|--------|----------|
| — | — | — | — | — |

---

## Lessons

<!-- Estimation lessons will be captured here -->

EOF

cat > docs/implementation/.recovery-checkpoint.md << 'EOF'
# Recovery Checkpoint / Phase Handoff

| Field | Value |
|-------|-------|
| Last Updated | [Not started] |
| Phase | — |
| Active Role | — |
| Current Task | — |
| Git Commit | — |
| Git Branch | — |
| Session Type | Initial |
| Recommended Model | Claude Sonnet 4.5 |

## Context Summary
Project not yet started.

## Lazy Load Map
<!-- Will be populated as artifacts are created -->

## Next Action
Run Phase 1 initialization.

## Open Decisions
None - awaiting project initialization.
EOF

cat > docs/implementation/context-packages/module-context-template.md << 'EOF'
# Module Context: [Module ID] - [Module Name]

## Meta
| Field | Value |
|-------|-------|
| Module | M[X]-MOD[Y] |
| Milestone | M[X]: [Name] |
| Created | [Date] |
| Last Updated | [Date] |
| Status | [In Progress / Complete] |

---

## Architectural Vision

### Purpose
[Why this module exists - its role in the overall system]

### Core Responsibility
[The single primary responsibility of this module]

### Boundaries
**In Scope:**
- [Responsibility 1]
- [Responsibility 2]

**Out of Scope:**
- [Not this module's job 1]
- [Not this module's job 2]

---

## Design Principles

### Key Patterns Applied
1. **[Pattern 1]:** [Why and how]
2. **[Pattern 2]:** [Why and how]
3. **[Pattern 3]:** [Why and how]

### Design Philosophy
[Guiding principles for this module's implementation]

---

## Inter-Module Contracts

### Dependencies (What this module needs)
| Module | Interface | Purpose |
|--------|-----------|---------|
| [Module] | [API/Events] | [Why needed] |

### Dependents (What depends on this module)
| Module | Interface | Purpose |
|--------|-----------|---------|
| [Module] | [API/Events] | [How they use it] |

---

## State Management Strategy

### State Ownership
[What state does this module own?]

### State Flow
```
[Diagram or description of how state flows through this module]
```

### Synchronization Points
[Where and how state synchronizes with other modules]

### Mutation Boundaries
[Where state can be mutated and by whom]

---

## Key Decisions

### [Decision 1]
**Context:** [Why needed]
**Decision:** [What was chosen]
**Rationale:** [Why]
**Trade-offs:** [What was sacrificed]

[Repeat for each major decision in this module]

---

## Implementation Notes

### Files Structure
```
src/[module]/
├── [file1.ts] - [Purpose]
├── [file2.ts] - [Purpose]
└── tests/
    ├── [test1.test.ts]
    └── [test2.test.ts]
```

### Critical Paths
[Key code paths that require careful attention]

### Edge Cases Handled
- [Edge case 1]: [How handled]
- [Edge case 2]: [How handled]

---

## Testing Strategy

### Unit Tests
[What unit tests cover]

### Integration Tests
[What integration points are tested]

### Test Coverage
- Target: 85%
- Current: [X]%

---

## Lessons Learned

### What Worked Well
- [Success 1]
- [Success 2]

### Challenges Overcome
- [Challenge 1]: [Solution]
- [Challenge 2]: [Solution]

### Would Do Differently
- [Improvement idea 1]
- [Improvement idea 2]

---

## Related Documentation

- Blueprint: [Link to relevant blueprint section]
- API Contract: [Link if applicable]
- Decision Log: [Links to related decisions]
- Knowledge Base: [Links to related patterns/failures]

---

## Architectural Resonance

**When working on tasks in this module, remember:**
1. [Key principle 1]
2. [Key principle 2]
3. [Key principle 3]

**This module embodies:** [Core architectural theme]
EOF

# Verification files
cat > docs/verification/test-plan.md << 'EOF'
# Test Plan

## Overview
<!-- Test strategy will be defined during Phase 2 -->

## Quality Thresholds

| Metric | Minimum | Target | Blocking |
|--------|---------|--------|----------|
| Test Coverage | 70% | 85% | Yes |
| Critical Security Issues | 0 | 0 | Yes |
| High Security Issues | 0 | 0 | Yes |

---

## Test Cases

<!-- Test cases will be added during Phase 2 -->

EOF

cat > docs/verification/ethics-checklist.md << 'EOF'
# Ethics & Bias Validation Checklist

## Overview

This checklist ensures ethical considerations and bias mitigation are addressed across all projects (not just AI/ML).

**Applicable to:** All CodeMaestro projects
**Phase:** Phase 4 (Verification)
**Role:** Ethics & Security Engineer (supporting QA Lead)

---

## Security Best Practices

### Input Validation
- [ ] All user inputs are validated
- [ ] Input sanitization prevents injection attacks
- [ ] File upload size and type restrictions enforced
- [ ] Rate limiting on endpoints

### Authentication & Authorization
- [ ] Authentication mechanism properly implemented
- [ ] Authorization checks on all protected resources
- [ ] Session management secure (timeouts, invalidation)
- [ ] Password policies enforced (if applicable)

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS/HTTPS enforced in transit
- [ ] No hardcoded secrets or credentials
- [ ] Proper key management implemented

### Output Encoding
- [ ] Output encoding prevents XSS
- [ ] API responses properly formatted
- [ ] Error messages don't leak sensitive info

---

## Ethical Considerations (All Projects)

### User Consent & Transparency
- [ ] Clear data usage policies
- [ ] User consent mechanisms for data collection
- [ ] Transparency about automated decision-making
- [ ] Opt-out mechanisms where appropriate

### Accessibility (WCAG Compliance)
- [ ] Keyboard navigation supported
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Alternative text for images
- [ ] Form labels properly associated

### Privacy by Design
- [ ] Minimal data collection (only what's necessary)
- [ ] Data retention policies defined
- [ ] User data deletion capabilities
- [ ] Privacy-preserving defaults

### Inclusivity
- [ ] Language is inclusive and non-discriminatory
- [ ] UI/UX considers diverse user needs
- [ ] No assumptions about user demographics
- [ ] Cultural sensitivity in content

---

## AI/ML-Specific Considerations

**Note:** Apply this section if project involves AI/ML, algorithms, or data-driven decision-making.

### Bias Detection in Algorithms
- [ ] Training data reviewed for bias
- [ ] Model outputs tested across demographic groups
- [ ] Fairness metrics calculated (if applicable):
  - [ ] Demographic parity
  - [ ] Equal opportunity
  - [ ] Equalized odds
- [ ] Disparate impact analysis performed

### Protected Attributes
- [ ] Sensitive attributes identified (race, gender, age, etc.)
- [ ] Protected attributes not used in discriminatory ways
- [ ] Proxy variables for protected attributes identified
- [ ] Mitigation strategies for bias implemented

### Explainability
- [ ] Decision-making process can be explained
- [ ] Model predictions are interpretable
- [ ] Users can understand why decisions were made
- [ ] Appeal mechanisms for automated decisions

### Harm Mitigation
- [ ] Potential harms identified and assessed
- [ ] Mitigation strategies implemented
- [ ] Monitoring for unintended consequences
- [ ] Incident response plan for ethical issues

---

## Regulatory Compliance

### GDPR (if applicable)
- [ ] Right to access implemented
- [ ] Right to deletion implemented
- [ ] Right to data portability supported
- [ ] Data processing agreements in place
- [ ] Privacy policy published

### Industry-Specific Regulations
- [ ] Relevant regulations identified
- [ ] Compliance requirements documented
- [ ] Audit trail for compliance
- [ ] Regular compliance reviews scheduled

---

## Validation Results

### Security Validation
| Check | Status | Notes |
|-------|--------|-------|
| [Check] | [✅/❌] | [Notes] |

### Ethics Validation
| Check | Status | Notes |
|-------|--------|-------|
| [Check] | [✅/❌] | [Notes] |

### Bias Validation (if AI/ML)
| Check | Status | Notes |
|-------|--------|-------|
| [Check] | [✅/❌] | [Notes] |

---

## Risk Assessment

### High Risk Issues
| Issue | Impact | Mitigation | Status |
|-------|--------|------------|--------|
| [Issue] | [Impact] | [Plan] | [Status] |

### Medium Risk Issues
| Issue | Impact | Mitigation | Status |
|-------|--------|------------|--------|
| [Issue] | [Impact] | [Plan] | [Status] |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Ethics & Security Engineer | | | |
| Product Owner | | | |

---

## References

- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- GDPR Overview: https://gdpr.eu/
- Fairness in ML: https://fairmlbook.org/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
EOF

# Release files
cat > docs/release/rollback-sop.md << 'EOF'
# Rollback Standard Operating Procedure

## Overview
This document defines rollback procedures for emergency recovery.

## Git Rollback Commands

### By Phase Tag
| Target | Command | When to Use |
|--------|---------|-------------|
| Specification | `git checkout v0.1.x-spec` | Restart from requirements |
| Planning | `git checkout v0.2.x-plan` | Restart implementation |
| Implementation | `git checkout v0.3.x-impl` | Revert failed verification |
| Last Verified | `git checkout v0.4.x-verify` | Production rollback |

### Create Hotfix
```bash
git checkout v[X.Y.Z]
git checkout -b hotfix/description
# Apply fixes
git commit -m "fix: Description"
```

### Emergency Reset
```bash
# Reset to last known good state
git checkout develop
git reset --hard v[X.Y.Z]
```

---

## Procedures

<!-- Detailed rollback procedures will be added during Phase 2 -->

EOF

cat > docs/release/monitoring-plan.md << 'EOF'
# Monitoring Plan

## Overview
<!-- Monitoring strategy will be defined during Phase 2 -->

## Key Metrics

| Metric | Source | Alert Threshold |
|--------|--------|-----------------|
| P95 Latency | — | — |
| Error Rate | — | — |
| Throughput | — | — |

---

## Alerts

<!-- Alert definitions will be added during Phase 2 -->

EOF

# Team files (for team mode)
cat > docs/team/CODEOWNERS << 'EOF'
# Code Owners
# This file will be populated when team mode is enabled

# Default owner
# * @team-lead

EOF

cat > docs/team/pr-template.md << 'EOF'
## Description
[What does this PR do?]

## Tasks
- [ ] T-X.X.X: [Task name]

## Checklist
- [ ] Tests pass
- [ ] Linter clean
- [ ] Documentation updated
- [ ] Estimation tracking updated

## Acceptance Criteria
- [ ] AC-XXX verified
EOF

cat > docs/team/review-checklist.md << 'EOF'
# Code Review Checklist

## Functionality
- [ ] Meets acceptance criteria
- [ ] Edge cases handled
- [ ] Error handling appropriate

## Code Quality
- [ ] Follows coding standards
- [ ] No code smells
- [ ] Appropriate abstraction level

## Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] No test anti-patterns

## Documentation
- [ ] Code is self-documenting
- [ ] Complex logic explained
- [ ] Public APIs documented

## Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Authentication/authorization correct
EOF

# Root documentation files
cat > docs/CHANGELOG.md << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
- CodeMaestro structure

EOF

cat > docs/PROJECT-SUMMARY.md << 'EOF'
# Project Summary

## Overview
| Field | Value |
|-------|-------|
| Project | [Project Name] |
| Status | Not Started |
| Created | [Date] |
| CodeMaestro Version | 1.0.0 |

---

## Quick Links
- [CHANGELOG](./CHANGELOG.md)
- [Specifications](./specifications/)
- [Architecture](./architecture/)
- [Verification](./verification/)
- [Knowledge Base](./knowledge-base/)

---

## Current Phase
Phase 1: Not Started

EOF

echo ""
echo "✅ Directory structure created!"
echo ""
echo "📋 Structure:"
echo "docs/"
echo "├── config/"
echo "│   ├── roles/"
echo "│   │   └── custom-roles.md"
echo "│   ├── thresholds.md"
echo "│   └── team.md"
echo "├── prompts/              (copy prompt files here)"
echo "├── specifications/"
echo "├── analysis/"
echo "├── architecture/"
echo "│   ├── domain-adaptations.md [NEW]"
echo "│   └── tasks/"
echo "│       ├── _index.md"
echo "│       ├── _task-template.md"
echo "│       └── _parallel-groups.md"
echo "├── implementation/"
echo "│   ├── context-packages/"
echo "│   │   ├── module-context-template.md [NEW]"
echo "│   │   └── state-flow-diagrams/ [NEW]"
echo "│   ├── decision-log.md"
echo "│   ├── task-checklist.md"
echo "│   ├── estimation-tracking.md"
echo "│   └── .recovery-checkpoint.md"
echo "├── verification/"
echo "│   ├── ethics-checklist.md [NEW]"
echo "│   ├── evidence-packages/"
echo "│   ├── performance-baselines/"
echo "│   └── test-plan.md"
echo "├── release/"
echo "│   ├── runbooks/"
echo "│   ├── rollback-sop.md"
echo "│   └── monitoring-plan.md"
echo "├── knowledge-base/ [NEW]"
echo "│   ├── README.md"
echo "│   ├── failures/"
echo "│   ├── patterns/"
echo "│   └── decisions/"
echo "├── portfolio/ [NEW]"
echo "│   ├── README.md"
echo "│   └── [templates]"
echo "├── team/"
echo "│   ├── CODEOWNERS"
echo "│   ├── pr-template.md"
echo "│   └── review-checklist.md"
echo "├── CHANGELOG.md"
echo "└── PROJECT-SUMMARY.md"
echo ""
echo "🎯 Next Steps:"
echo "1. Copy prompt files to docs/prompts/"
echo "2. Copy CLAUDE.md to project root"
echo "3. Initialize git: git init && git checkout -b develop"
echo "4. Start Claude Code to begin Phase 1"
echo ""
echo "🚀 Ready for CodeMaestro!"
