# Phase 2: Planning Templates

<!-- LOAD ON-DEMAND -->

**CodeMaestro v1.0.0**
**Phase:** 2 (Planning) - Software Architect
**Purpose:** Templates for architecture blueprint, task decomposition, and planning artifacts

---

## Template 1: Architecture Blueprint {#architecture-blueprint}

```markdown
# Engineering Blueprint v1.0

**Project:** [Project Name]
**Version:** 1.0
**Date:** [YYYY-MM-DD]
**Architect:** [Name or "CodeMaestro System"]
**CodeMaestro:** v1.0.0

---

## Meta

| Field | Value |
|-------|-------|
| Domain | [Mobile / Web / Cloud / AI/ML] |
| Pattern | [e.g., Microservices, Layered, Event-Driven] |
| Scale | [Small / Medium / Large] |
| Team Size | [N] developers |
| Skill Tier | [Beginner / Advanced / Ninja] |

---

## Architecture Overview

**Primary Pattern:** [Architectural pattern name]

**Core Principles:**
- [Principle 1: e.g., KISS - Keep It Simple]
- [Principle 2: e.g., DRY - Don't Repeat Yourself]
- [Principle 3: e.g., SOLID principles]

**Design Philosophy:**
[2-3 sentences describing the high-level design approach and rationale]

---

## Domain Adaptations [NEW v1.0]

**Detected Domain:** [Mobile / Web / Cloud / AI/ML]

**Domain-Specific Patterns Applied:**

### For Mobile:
- [ ] Offline-first architecture with local data sync
- [ ] Platform-specific UI patterns (iOS HIG / Material Design)
- [ ] Battery and memory optimization strategies
- [ ] App store deployment pipeline

### For Web:
- [ ] Responsive design (mobile-first approach)
- [ ] Frontend-backend separation (REST / GraphQL)
- [ ] CDN and caching strategies
- [ ] SEO optimization

### For Cloud:
- [ ] Microservices architecture
- [ ] Cloud-native patterns (12-factor app)
- [ ] Auto-scaling strategies
- [ ] Distributed tracing and observability

### For AI/ML:
- [ ] Data pipeline architecture
- [ ] Model serving infrastructure
- [ ] Training vs inference separation
- [ ] Model drift monitoring

**Domain-Specific Considerations:**
- [Consideration 1]
- [Consideration 2]

---

## System Context Diagram

\```mermaid
graph LR
    User[User] --> Frontend[Frontend]
    Frontend --> API[API Gateway]
    API --> Service1[Service 1]
    API --> Service2[Service 2]
    Service1 --> DB[(Database)]
    Service2 --> DB
\```

**External Dependencies:**
- [Dependency 1: e.g., Payment Gateway]
- [Dependency 2: e.g., Email Service]

---

## Component Diagram

\```mermaid
graph TD
    subgraph "Presentation Layer"
        UI[UI Components]
    end
    subgraph "Business Logic Layer"
        Services[Services]
    end
    subgraph "Data Access Layer"
        Repositories[Repositories]
    end
    subgraph "Infrastructure"
        Database[(Database)]
        Cache[(Cache)]
    end

    UI --> Services
    Services --> Repositories
    Repositories --> Database
    Services --> Cache
\```

---

## Component Descriptions

### Component 1: [Name]

**Responsibility:** [Single primary responsibility]

**Technology:** [Language/Framework/Library]

**Interfaces:**
- **Input:** [What it receives]
- **Output:** [What it produces]
- **Dependencies:** [Other components it depends on]

**Key Classes/Modules:**
- `[Class1]`: [Purpose]
- `[Class2]`: [Purpose]

**State Management:**
- Pattern: [e.g., Redux, Event Sourcing]
- Source of Truth: [Where state is stored]

**Security Considerations:**
- [Security aspect 1]
- [Security aspect 2]

### Component 2: [Name]
[Repeat structure above]

---

## Architectural Decisions (ADRs)

### ADR-001: [Decision Title]

**Status:** Accepted
**Date:** [YYYY-MM-DD]
**Context:** [What situation led to this decision]

**Decision:** [What was decided]

**Rationale:**
- [Reason 1]
- [Reason 2]
- [Reason 3]

**Alternatives Considered:**
| Option | Pros | Cons | Chosen |
|--------|------|------|--------|
| Option A | [Pros] | [Cons] | ✅ |
| Option B | [Pros] | [Cons] | ❌ |
| Option C | [Pros] | [Cons] | ❌ |

**Competitive Context:** [NEW v1.0]
- **Competitor A Approach:** [How they solve this]
- **Competitor B Approach:** [Their solution]
- **Our Differentiator:** [How we're different/better]
- **Strategic Advantage:** [Why this matters for market position]

**Consequences:**
- **Positive:**
  - [Positive outcome 1]
  - [Positive outcome 2]
- **Negative:**
  - [Trade-off 1]
  - [Mitigation for trade-off 1]

**Constraint Compliance:**
- A7: [How API was confirmed via Context7]
- A14: [Dependency rationale]

---

## Security Architecture

### Authentication
**Method:** [e.g., JWT, OAuth 2.0, Session-based]
**Implementation:** [Details]
**Token Storage:** [Where and how tokens are stored]
**Expiration:** [Token lifetime]

### Authorization
**Model:** [e.g., RBAC, ABAC, ACL]
**Roles:** [List of user roles]
**Permissions:** [Permission matrix]

### Data Protection
**Encryption at Rest:** [Algorithm and implementation]
**Encryption in Transit:** [TLS version, certificate strategy]
**Sensitive Data:** [How PII/secrets are handled]

### Threat Model
| Threat | Mitigation | Status |
|--------|------------|--------|
| SQL Injection | Parameterized queries (constraint A7) | ✅ Addressed |
| XSS | Input sanitization, CSP headers | ✅ Addressed |
| CSRF | Anti-CSRF tokens | ✅ Addressed |

---

## Data Architecture

### Data Model

\```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        uuid id
        string username
        string email
    }
    ORDER {
        uuid id
        uuid user_id
        timestamp created_at
    }
\```

### Data Stores

| Store | Type | Purpose | Technology | Version |
|-------|------|---------|------------|---------|
| Primary DB | Relational | Transactional data | PostgreSQL | 14.5 |
| Cache | In-Memory | Session + hot data | Redis | 7.0 |
| Search | Document | Full-text search | Elasticsearch | 8.4 |

### Data Flows

**Create Order Flow:**
1. User submits order → API Gateway
2. Validate input → Order Service
3. Check inventory → Inventory Service
4. Create transaction → Database (ACID)
5. Invalidate cache → Redis
6. Return confirmation → User

---

## Technology Stack

| Category | Technology | Version | Rationale | Competitive Edge |
|----------|------------|---------|-----------|------------------|
| Language | [e.g., TypeScript] | [X.Y.Z] | [Why chosen] | [vs competitors] |
| Framework | [e.g., NestJS] | [X.Y.Z] | [Why chosen] | [advantage] |
| Database | [e.g., PostgreSQL] | [X.Y.Z] | [Why chosen] | [edge] |
| Cache | [e.g., Redis] | [X.Y.Z] | [Why chosen] | [benefit] |
| Testing | [e.g., Jest] | [X.Y.Z] | [Why chosen] | [value] |

**Lock Files:**
- `package-lock.json` (npm)
- Or `requirements.lock` (pip)
- Or `Cargo.lock` (Rust)

**Constraint Compliance:**
- A1: All dependencies are production-ready with active maintenance
- A3: All versions pinned, lock files committed
- A7: All APIs validated via Context7

---

## API Contracts

**Format:** OpenAPI 3.0.3

**See:** `docs/architecture/api-contracts/openapi.yaml`

**Key Endpoints:**
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/users/{id}` - Retrieve user
- `POST /api/v1/orders` - Create order

**Versioning Strategy:**
- URL-based versioning: `/api/v1/`, `/api/v2/`
- Support N-1 version during transitions
- Deprecation policy: 6-month notice

---

## Non-Functional Requirements Mapping

| NFR-ID | Requirement | Architectural Support |
|--------|-------------|----------------------|
| NFR-001 | P95 latency <200ms | Caching layer (Redis), optimized queries |
| NFR-002 | 99.9% uptime | Load balancing, auto-scaling, health checks |
| NFR-003 | Support 10K concurrent users | Horizontal scaling, stateless services |
| NFR-004 | GDPR compliance | Data encryption, audit logs, deletion APIs |

---

## Deployment Architecture

**Environment Strategy:**
- Development: Local Docker Compose
- Staging: Kubernetes cluster (similar to prod)
- Production: Kubernetes on [AWS EKS / GCP GKE / Azure AKS]

**CI/CD Pipeline:**
1. Code push → GitHub
2. Run tests → GitHub Actions
3. Build Docker image → Container Registry
4. Deploy to staging → Kubernetes (auto)
5. Run E2E tests → Staging environment
6. Manual approval → Production deployment

**Rollback Strategy:**
- Keep last 3 versions deployed
- Rollback via Kubernetes deployment revision
- Database migrations: Backward-compatible always

---

## Quality Thresholds

| Metric | Minimum (Blocking) | Target | Phase |
|--------|-------------------|--------|-------|
| Test Coverage | 70% | 85% | Phase 4 |
| Critical Security | 0 | 0 | Phase 4 |
| High Security | 0 | 0 | Phase 4 |
| AC Pass Rate | 100% | 100% | Phase 4 |
| P95 Latency | No regression >25% | <200ms | Phase 4 |

**Constraint Compliance:** E30-E33

---

## Dependencies & Risks

### External Dependencies

| Dependency | Type | Criticality | Fallback Strategy |
|------------|------|-------------|-------------------|
| Payment Gateway | External API | High | Queue orders, manual processing |
| Email Service | External API | Medium | Retry queue, log for manual send |
| CDN | Infrastructure | Low | Direct server fallback |

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Database bottleneck | Medium | High | Read replicas, caching, query optimization |
| Third-party API downtime | High | Medium | Circuit breakers, fallbacks, retries |

---

## Version

**Blueprint Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 2: Task DAG {#task-dag}

```markdown
# Task Dependency Graph v1.0

**Project:** [Project Name]
**Blueprint:** v1.0
**Total Tasks:** [N]
**Parallel Groups:** [M]
**Estimated Effort:** [X] hours

---

## Task Hierarchy

### Milestone 1: [Name]

**Duration:** [X] hours
**Priority:** High

#### Module 1.1: [Module Name]

| Task ID | Description | Est. Hours | Dependencies | Parallel Group | AC Mapping |
|---------|-------------|-----------|--------------|----------------|------------|
| T-1.1.1 | [Task description] | 4 | None | PG-001 | AC-1.1 |
| T-1.1.2 | [Task description] | 6 | None | PG-001 | AC-1.2 |
| T-1.1.3 | [Task description] | 8 | T-1.1.1, T-1.1.2 | - | AC-1.3 |

#### Module 1.2: [Module Name]
[Repeat structure]

### Milestone 2: [Name]
[Repeat structure]

---

## Dependency Graph

\```mermaid
graph TD
    subgraph "M1: Foundation"
        subgraph "PG-001 [Parallel]"
            T-1.1.1[T-1.1.1: Setup]
            T-1.1.2[T-1.1.2: Config]
        end
        T-1.1.3[T-1.1.3: Integration]
    end

    subgraph "M2: Core Features"
        T-2.1.1[T-2.1.1: Auth]
        T-2.1.2[T-2.1.2: CRUD]
    end

    T-1.1.1 --> T-1.1.3
    T-1.1.2 --> T-1.1.3
    T-1.1.3 --> T-2.1.1
    T-2.1.1 --> T-2.1.2
\```

---

## Parallel Groups

### PG-001: Foundation Setup
**Tasks:** T-1.1.1, T-1.1.2
**Rationale:** Both are independent infrastructure tasks
**Estimated Savings:** 4-6 hours (vs sequential)

### PG-002: Feature Implementation
**Tasks:** T-2.2.1, T-2.2.2, T-2.2.3
**Rationale:** Independent feature modules
**Estimated Savings:** 8-12 hours

---

## Critical Path

**Path:** T-1.1.1 → T-1.1.3 → T-2.1.1 → T-2.1.2 → T-3.1.1
**Duration:** [X] hours
**Bottleneck Tasks:** [Highlight tasks with long duration or many dependencies]

---

## Task Details Template

### Task T-[M].[Mod].[Task]: [Task Name]

**Milestone:** [M] - [Milestone Name]
**Module:** [Mod] - [Module Name]
**Estimated Effort:** [X] hours

**Description:**
[Detailed description of what needs to be implemented]

**Acceptance Criteria Mapping:**
- AC-[ID]: [Criterion that this task addresses]

**Dependencies:**
- T-[ID]: [Dependency description]
- T-[ID]: [Dependency description]

**Implementation Notes:**
- [Note 1: Key consideration or approach]
- [Note 2: Potential challenge or pattern to reuse]

**Verification:**
- [ ] Unit tests written and passing
- [ ] Integration tests covering AC
- [ ] Code review completed
- [ ] Documentation updated

---

## Version

**Task DAG Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 3: Gantt Timeline {#gantt-timeline}

```markdown
# Project Timeline v1.0

**Project:** [Project Name]
**Start Date:** [YYYY-MM-DD]
**Estimated End Date:** [YYYY-MM-DD]
**Total Duration:** [X] weeks

---

## Visual Timeline

\```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD

    section M1: Foundation
    T-1.1.1 Setup          :2026-01-15, 2d
    T-1.1.2 Config         :2026-01-15, 3d
    T-1.1.3 Integration    :after T-1.1.1, 4d

    section M2: Core Features
    T-2.1.1 Authentication :after T-1.1.3, 3d
    T-2.1.2 CRUD Operations:after T-2.1.1, 5d
    T-2.1.3 Validation     :after T-2.1.2, 2d

    section M3: Advanced Features
    T-3.1.1 Search         :after T-2.1.3, 4d
    T-3.1.2 Analytics      :after T-3.1.1, 3d
\```

---

## Milestone Schedule

| Milestone | Start Date | End Date | Duration | Tasks | Status |
|-----------|------------|----------|----------|-------|--------|
| M1: Foundation | [YYYY-MM-DD] | [YYYY-MM-DD] | [X] days | [N] | ⏳ Pending |
| M2: Core Features | [YYYY-MM-DD] | [YYYY-MM-DD] | [Y] days | [M] | ⏳ Pending |
| M3: Advanced | [YYYY-MM-DD] | [YYYY-MM-DD] | [Z] days | [K] | ⏳ Pending |

---

## Resource Allocation

| Week | Milestone | Focus | Parallel Tasks | Team Size |
|------|-----------|-------|----------------|-----------|
| Week 1 | M1 | Infrastructure | PG-001 (2 tasks) | [N] devs |
| Week 2 | M1-M2 | Core setup | PG-002 (3 tasks) | [N] devs |
| Week 3 | M2 | Features | Sequential | [N] devs |

---

## Version

**Timeline Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 4: ADR (Architecture Decision Record) {#adr-template}

```markdown
# ADR-[NNN]: [Decision Title]

**Status:** [Proposed / Accepted / Deprecated / Superseded]
**Date:** [YYYY-MM-DD]
**Deciders:** [Software Architect, Tech Lead, etc.]
**CodeMaestro:** v1.0.0

---

## Context

[Describe the situation that led to this decision. What problem are we trying to solve? What constraints do we face?]

**Background:**
- [Key context point 1]
- [Key context point 2]

**Constraints:**
- [Constraint 1: e.g., Budget, Timeline, Team expertise]
- [Constraint 2]

---

## Decision

[State the decision clearly and concisely]

**Chosen Approach:** [Name the chosen solution]

---

## Rationale

**Why this decision was made:**

1. **[Reason 1]:** [Explanation]
2. **[Reason 2]:** [Explanation]
3. **[Reason 3]:** [Explanation]

---

## Alternatives Considered

| Option | Description | Pros | Cons | Score (1-10) |
|--------|-------------|------|------|--------------|
| **Option A** (Chosen) | [Description] | [Pros] | [Cons] | 9 |
| Option B | [Description] | [Pros] | [Cons] | 6 |
| Option C | [Description] | [Pros] | [Cons] | 4 |

**Scoring Criteria:** Technical fit (40%), Team expertise (30%), Cost (20%), Future flexibility (10%)

---

## Competitive Context [NEW v1.0]

**Market Analysis:**

| Competitor | Approach | Strengths | Weaknesses |
|------------|----------|-----------|------------|
| Competitor A | [Their solution] | [What they do well] | [Their limitations] |
| Competitor B | [Their solution] | [What they do well] | [Their limitations] |

**Our Differentiator:**
[How our decision sets us apart from competitors]

**Strategic Advantage:**
[Why this matters for market positioning and competitive edge]

**Sources:**
- [WebSearch result 1]
- [Context7 validation]
- [Industry report]

---

## Consequences

### Positive Consequences
- ✅ [Positive outcome 1]
- ✅ [Positive outcome 2]
- ✅ [Positive outcome 3]

### Negative Consequences / Trade-offs
- ⚠️ [Trade-off 1]
  - **Mitigation:** [How we'll address this]
- ⚠️ [Trade-off 2]
  - **Mitigation:** [How we'll address this]

---

## Implementation Plan

**Phases:**
1. **Phase 1:** [What needs to happen first]
2. **Phase 2:** [Next steps]
3. **Phase 3:** [Final steps]

**Effort Estimate:** [X] hours

**Tasks:**
- T-[ID]: [Related task from task DAG]
- T-[ID]: [Related task]

---

## Validation Evidence

**API Confirmation (Constraint A7):**
- Context7 `/lookup [library] [feature]`: ✅ Confirmed
- Documentation: [Link to official docs]
- Version validated: [X.Y.Z]

**Dependency Justification (Constraint A14):**
- Production-ready: ✅ ([GitHub stars], [npm weekly downloads])
- Active maintenance: ✅ (Last commit: [date])
- Security scan: ✅ (0 critical/high vulnerabilities)

---

## Success Metrics

**How we'll measure if this decision was right:**

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| [Metric 1] | [Target value] | [How to measure] |
| [Metric 2] | [Target value] | [How to measure] |

**Review Date:** [YYYY-MM-DD] (3-6 months post-implementation)

---

## Related Decisions

- ADR-[NNN]: [Related decision title]
- ADR-[NNN]: [Related decision title]

---

## References

- [Official documentation link]
- [Technical blog post]
- [Competitive analysis source]
- [Context7 validation evidence]

---

## Version

**ADR Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 5: Module Context Package {#module-context}

```markdown
# Module Context: M[X]-MOD[Y]

**Module:** [Module Name]
**Milestone:** [X] - [Milestone Name]
**Owner:** [Developer name or role]
**Status:** [Planning / In Progress / Complete]

---

## Architectural Vision

**Purpose:** [Why this module exists - the "why"]

**Core Responsibility:** [Single primary responsibility]

**Boundaries:** [What this module does NOT handle]

---

## Design Principles

**Applied Principles:**
- **[Principle 1]:** [How it's applied in this module]
- **[Principle 2]:** [How it's applied]
- **[Principle 3]:** [How it's applied]

---

## State Strategy

**Pattern:** [e.g., Redux, Event Sourcing, Repository Pattern]

**Data Flow:**
\```
[Input] → [Processing] → [State Update] → [Output]
\```

**Source of Truth:** [Where state is stored and managed]

**Mutation Points:** [Where and how state can change]
- [Mutation point 1]
- [Mutation point 2]

---

## Inter-Module Contracts

**Depends On:**
- M[X]-MOD[Y]: [What it provides]
- M[X]-MOD[Z]: [What it provides]

**Provides To:**
- M[X]-MOD[A]: [What this module provides]
- M[X]-MOD[B]: [What this module provides]

**Interface:**
\```typescript
interface [ModuleName]Interface {
  [method1](params): ReturnType;
  [method2](params): ReturnType;
}
\```

---

## Implementation Guidance

**Key Classes/Files:**
- `[File1].ts`: [Purpose]
- `[File2].ts`: [Purpose]

**Patterns to Follow:**
- [Pattern 1 from knowledge base]
- [Pattern 2 specific to this module]

**Testing Strategy:**
- Unit tests: [What to test]
- Integration tests: [What interactions to verify]

---

## Constraints Checklist

- [ ] A7: All APIs confirmed via Context7
- [ ] B15: State management explicitly optimized
- [ ] B17: No placeholder implementations
- [ ] D22: Single Responsibility Principle applied
- [ ] D26: All public APIs have docstrings

---

## Version

**Module Context Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Template 6: Technology Selection Matrix {#tech-matrix}

```markdown
# Technology Selection Matrix v1.0

**Project:** [Project Name]
**Date:** [YYYY-MM-DD]
**Domain:** [Mobile / Web / Cloud / AI/ML]

---

## Selection Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Technical Fit | 40% | How well it solves our technical requirements |
| Team Expertise | 30% | Team's familiarity and learning curve |
| Ecosystem | 15% | Community, libraries, tooling |
| Cost | 10% | Licensing, hosting, operational costs |
| Future Flexibility | 5% | Ability to scale and adapt |

---

## Language Selection

### Evaluated Options

| Option | Technical Fit | Team Expertise | Ecosystem | Cost | Flexibility | **Total Score** |
|--------|---------------|----------------|-----------|------|-------------|-----------------|
| **TypeScript** | 9/10 | 8/10 | 10/10 | 10/10 | 9/10 | **8.9/10** ✅ |
| Python | 8/10 | 9/10 | 9/10 | 10/10 | 8/10 | 8.6/10 |
| Go | 9/10 | 5/10 | 7/10 | 10/10 | 8/10 | 7.5/10 |

**Decision:** TypeScript
**Rationale:** Strong typing, excellent ecosystem, team expertise

**ADR Reference:** ADR-001

---

## Framework Selection

[Repeat matrix structure for each technology category]

---

## Database Selection

[Repeat matrix structure]

---

## Summary

**Final Stack:**
- Language: [Chosen language]
- Framework: [Chosen framework]
- Database: [Chosen database]
- Caching: [Chosen caching solution]
- Testing: [Chosen testing framework]

**Constraint Compliance:**
- A1: All chosen technologies are production-ready
- A7: All APIs confirmed via Context7
- A14: Rationale documented in ADRs

---

## Version

**Matrix Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** [YYYY-MM-DD]
```

---

## Usage Notes

**When to Load Templates:**
- Architecture Blueprint: Phase 2 start
- Task DAG: During task decomposition (Phase 2 Step 7)
- Gantt Timeline: After task DAG complete
- ADR: For each major architectural decision
- Module Context: When starting implementation of a module
- Tech Matrix: During technology stack selection

**Skill Tier Adaptations:**
- **Beginner:** Include all sections with examples
- **Advanced:** Focus on key decisions, omit obvious sections
- **Ninja:** Minimal structure, assume expertise

---

## Version

**Templates Version:** 1.0
**CodeMaestro:** v1.0.0
**Last Updated:** 2026-01-13
