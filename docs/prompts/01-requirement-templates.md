# Phase 1: Output Templates

> **Usage**: Load dynamically when generating artifacts. Reduces context overhead.
> **Loading**: `view /mnt/project/01-requirement-templates.md#[template-name]`

<!-- LOAD ON-DEMAND -->

---

## Template 1: Competitive Analysis {#competitive-analysis}

**File**: `./docs/analysis/competitive-analysis.md`

```markdown
# Competitive Analysis

## Meta
| Field | Value |
|-------|-------|
| Created | [Date] |
| Specification | locked-specification-v1.0 |
| Analyst Role | Product Manager + Business Analyst |
| CodeMaestro Version | 1.0.0 |

## Market Overview
[Brief description of market space, size, trends]

## Competitors

### [Competitor 1]
| Field | Details |
|-------|---------|
| URL | [Website] |
| Founded | [Year] |
| Target Market | [Who they serve] |

**Strengths**:
- [Strength 1]
- [Strength 2]

**Weaknesses**:
- [Weakness 1]
- [Weakness 2]

**Key Features**:
- [Feature 1]
- [Feature 2]

**Pricing**: [Model]

---

## Competitive Matrix

| Feature | Our Project | Competitor 1 | Competitor 2 |
|---------|-------------|--------------|--------------|
| [Feature A] | ✅ Planned | ✅ | ❌ |
| [Feature B] | ✅ Planned | ❌ | ✅ |

Legend: ✅ Full | ⚠️ Partial | ❌ None

## Differentiation Opportunities

### Gap Analysis
| Gap | Our Approach |
|-----|--------------|
| [Gap 1] | [How we address] |

### Unique Value Proposition
[One paragraph]

## Strategic Recommendations

### Positioning
[How to position in market]

### Features to Prioritize
1. [Feature] - [Rationale based on competitive gap]
2. [Feature] - [Strategic advantage]
```

---

## Template 2: Locked Specification {#locked-specification}

**File**: `./docs/specifications/locked-specification-v[X.Y].md`

```markdown
# Locked Specification

## Meta
| Field | Value |
|-------|-------|
| Version | [X.Y] |
| Status | ✅ Locked |
| Created | [Date] |
| Locked Date | [Date] |
| Skill Tier | [Beginner/Advanced/Ninja] |
| Author Role | Product Manager |
| CodeMaestro Version | 1.0.0 |

## Change Log
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [Date] | Initial specification |

---

## Summary (OPT-3: Load This During Phase Transitions)

**Quick Reference (~500 tokens for context efficiency)**

**One-Line:** [The one-line requirement statement]

**Domain:** [Mobile / Web / Cloud / AI / Desktop]
**Skill Tier:** [Beginner / Advanced / Ninja]

### Requirements Overview
- **Functional Requirements:** [N] total ([X] High, [Y] Medium, [Z] Low priority)
- **Non-Functional Requirements:** [N] total (Performance, Security, Scalability, etc.)
- **Acceptance Criteria:** [N] total ([X] High priority, must verify 100%)

### Key Functional Areas
1. **[Area 1]:** [Brief description] - [FR-XXX to FR-YYY]
2. **[Area 2]:** [Brief description] - [FR-XXX to FR-YYY]
3. **[Area 3]:** [Brief description] - [FR-XXX to FR-YYY]

### Critical NFRs
- **Performance:** [Key metric target, e.g., "API response <200ms P95"]
- **Scalability:** [Key target, e.g., "Support 10K concurrent users"]
- **Security:** [Key requirement, e.g., "Zero critical vulnerabilities"]
- **[Other]:** [Key target]

### Key Constraints
- **Technical:** [Primary technical constraint, e.g., "Must use TypeScript, Node.js v18+"]
- **Business:** [Primary business constraint, e.g., "Launch by Q2 2026"]
- **Regulatory:** [Primary regulation, e.g., "GDPR compliant"]

### Dependencies
- **Critical:** [List critical external dependencies]
- **Risk:** [Highest risk dependency with mitigation]

### Success Metrics
- **Primary:** [Key success metric]
- **Secondary:** [Additional metrics]

### Out of Scope (Key Exclusions)
- [Major exclusion 1]
- [Major exclusion 2]

**📋 Full Details:** See complete sections below for detailed requirements, ACs, and verification methods.

---

## One-Line Requirement

> [The one-line requirement statement]

---

## Functional Requirements

| ID | Requirement | Priority | Complexity | Notes |
|----|-------------|----------|------------|-------|
| FR-001 | [Description] | High | Medium | |
| FR-002 | [Description] | High | Low | |

### Priority Definitions
- **High**: Must have for MVP
- **Medium**: Should have
- **Low**: Nice to have

### Complexity Definitions
- **High**: >8 hours
- **Medium**: 4-8 hours
- **Low**: <4 hours

---

## Non-Functional Requirements

| ID | Category | Requirement | Metric | Target | Threshold |
|----|----------|-------------|--------|--------|-----------|
| NFR-001 | Performance | [Description] | Response time | <200ms | <500ms |
| NFR-002 | Scalability | [Description] | Users | 10,000 | 1,000 |
| NFR-003 | Security | [Description] | [Metric] | [Target] | [Threshold] |

---

## Acceptance Criteria

| AC ID | Criterion | Linked Req | Verification | Priority |
|-------|-----------|------------|--------------|----------|
| AC-001 | [Given/When/Then] | FR-001 | Automated Test | High |
| AC-002 | [Measurable statement] | FR-002 | Integration Test | High |

### Verification Methods
- **Automated Test**: Unit or integration
- **Load Test**: Performance testing
- **Security Scan**: SAST/DAST
- **Manual Review**: Human verification
- **Ethics Validation**: Bias/compliance check [NEW v1.0]

---

## Constraints

### Technical Constraints
| ID | Constraint | Rationale | Impact |
|----|------------|-----------|--------|
| TC-001 | [Constraint] | [Why] | [Effect] |

### Business Constraints
| ID | Constraint | Rationale | Impact |
|----|------------|-----------|--------|
| BC-001 | [Constraint] | [Why] | [Effect] |

### Regulatory Constraints
| ID | Regulation | Requirement | Verification |
|----|------------|-------------|--------------|
| RC-001 | [Regulation] | [Required] | [How to verify] |

---

## Assumptions

| ID | Assumption | Risk if Invalid | Mitigation |
|----|------------|-----------------|------------|
| A-001 | [Assumption] | [Risk] | [Mitigation] |

---

## Out of Scope

| Item | Rationale | Future Phase? |
|------|-----------|---------------|
| [Feature] | [Why excluded] | Yes/No |

---

## Dependencies

### External Dependencies
| Dependency | Type | Risk | Mitigation |
|------------|------|------|------------|
| [Dependency] | API/Service | High/Med/Low | [Strategy] |

---

## Glossary

| Term | Definition |
|------|------------|
| [Term] | [Definition] |

---

## Appendix: Selected Interpretation

### Draft Selected: [Title]

**Rationale**: [Why chosen]

**Trade-offs**: [Accepted trade-offs]

### Rejected Alternatives
| Draft | Reason |
|-------|--------|
| [Draft] | [Reason] |
```

---

## Template 3: One-Line Requirements {#one-line-requirements}

**File**: `./docs/specifications/one-line-requirements.md`

```markdown
# One-Line Requirements

## Current Requirement

> [The finalized one-line requirement]

**Version**: 1.0
**Locked**: [Date]
**CodeMaestro**: v1.0.0

---

## Evolution History

| Version | Date | Requirement | Reason |
|---------|------|-------------|--------|
| 1.0 | [Date] | [Requirement] | Initial |
```

---

## Template 4: Recovery Checkpoint (Phase 1) {#recovery-checkpoint-phase1}

```markdown
# Recovery Checkpoint / Phase Handoff

| Field | Value |
|-------|-------|
| Last Updated | [Timestamp] |
| Phase | 1 |
| Active Role | Product Manager |
| Git Commit | [Pending/SHA] |
| Git Branch | develop |
| Session Type | Phase Transition |
| Recommended Model | Claude Sonnet 4.5 |

## Context Summary
Phase 1 complete. Locked Specification v1.0 ready.

## Lazy Load Map
locked-specification → docs/specifications/locked-specification.md
competitive-analysis → docs/analysis/competitive-analysis.md
one-line-requirement → docs/specifications/one-line-requirements.md

## Required Context for Phase 2
- Functional requirements
- Non-functional requirements  
- Acceptance criteria
- Constraints

## Next Action Plan
1. Load: docs/prompts/02-planning.md
2. Read: locked-specification (lazy load)
3. Begin: Architecture design

## New Session Startup
1. Start new Claude session
2. Copy this handoff
3. Say: "Continuing Phase 2, handoff: [paste]"
4. Validate context
5. Proceed with Phase 2
```
