# Constraints Reference (A1-E33)

**CodeMaestro v1.0.0**
**Last Updated:** 2026-01-13

This document provides comprehensive definitions, rationale, enforcement mechanisms, and examples for all 33 constraints used throughout the CodeMaestro development lifecycle.

---

## A. Dependency Usage & Reuse (A1-A14)

### Constraint A1: Production-Ready Dependencies Only

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** Yes

**Description:**
Only use production-ready, well-maintained dependencies with active communities. Avoid experimental, alpha, or abandoned libraries.

**Rationale:**
Prevents technical debt from unmaintained dependencies and reduces security vulnerabilities from abandoned projects.

**Enforcement:**
- Check library GitHub stars, last commit date, open issues
- Verify npm/PyPI weekly downloads
- Review CVE database for known vulnerabilities
- Document dependency selection rationale in ADRs

**Examples:**
✅ Good: React (meta-maintained, 200K+ stars, weekly releases)
❌ Bad: `some-experimental-lib` (last commit 2 years ago, 50 stars)

**Related Constraints:** A7 (confirmed APIs), A14 (document rationale)

---

### Constraint A2: Minimize External Dependencies

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Prefer standard library or framework capabilities over adding new dependencies. Each dependency increases attack surface and maintenance burden.

**Rationale:**
Reduces security risks, simplifies deployment, and minimizes maintenance overhead.

**Enforcement:**
- Justify each new dependency in ADRs
- Review dependency tree for duplication
- Consider implementation complexity vs dependency trade-off

**Examples:**
✅ Good: Use Python's built-in `json` module instead of adding third-party JSON library
❌ Bad: Add `lodash` for a single helper function that can be written in 3 lines

**Related Constraints:** A1 (production-ready only), A14 (document rationale)

---

### Constraint A3: Pin Dependency Versions

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** Yes

**Description:**
Use exact version pinning for all dependencies. Generate and commit lock files (package-lock.json, requirements.lock, Cargo.lock).

**Rationale:**
Ensures reproducible builds and prevents unexpected breaking changes from automatic updates.

**Enforcement:**
- Commit lock files to version control
- Use exact versions in configuration files
- CI/CD verifies lock files are up-to-date

**Examples:**
✅ Good: `react@18.2.0` in package.json + package-lock.json committed
❌ Bad: `react@^18.0.0` with no lock file

**Related Constraints:** A1 (production-ready), C21 (security scans)

---

### Constraint A4: Reuse Patterns from Knowledge Base

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Before designing new solutions, search knowledge base for existing patterns. Reuse proven approaches when applicable.

**Rationale:**
Leverages organizational learning, reduces implementation time, and maintains consistency.

**Enforcement:**
- Search `/kb search [pattern]` before designing solutions
- Document pattern reuse in ADRs
- Update knowledge base with new patterns

**Examples:**
✅ Good: Reused authentication pattern P-012 from previous project
❌ Bad: Designed new auth flow without checking if pattern exists

**Related Constraints:** A5 (document deviations), D22 (SRP)

---

### Constraint A5: Document Pattern Deviations

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
When deviating from established patterns, document the rationale and trade-offs in ADRs.

**Rationale:**
Maintains architectural consistency while allowing justified innovation. Creates audit trail for future developers.

**Enforcement:**
- Create ADR for each pattern deviation
- Include trade-off analysis
- Get architectural review approval

**Examples:**
✅ Good: ADR-005 documents why we deviated from standard REST pattern for real-time API
❌ Bad: Implemented custom pattern without documentation or justification

**Related Constraints:** A4 (reuse patterns), D22 (SRP)

---

### Constraint A6: Domain-Specific Best Practices

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Apply domain-specific architectural patterns and best practices (Mobile, Web, Cloud, AI/ML).

**Rationale:**
Ensures optimal solutions tailored to project domain requirements.

**Enforcement:**
- Detect domain in Phase 2
- Apply domain-specific patterns from blueprint
- Review implementation against domain checklists

**Examples:**
✅ Good: Mobile project uses offline-first architecture with local data sync
❌ Bad: Mobile project requires constant internet without offline support

**Related Constraints:** A4 (reuse patterns), B15 (optimize for domain)

---

### Constraint A7: Confirmed APIs Only

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** Yes

**Description:**
Never invent, assume, or guess API signatures, library capabilities, or framework features. All APIs must be confirmed through:
- Official documentation (via Context7)
- Source code inspection
- Working code examples

**Rationale:**
Prevents implementation failures due to non-existent or incorrectly assumed APIs.

**Enforcement:**
- Use Context7 `/lookup [library] [feature]` to validate libraries
- Document API sources in architecture blueprint
- Code review checks for undocumented APIs
- Include validation evidence in ADRs

**Examples:**
✅ Good: Used Context7 to confirm React.useEffect cleanup signature before implementation
❌ Bad: Assumed Express has `.asyncHandler()` method (doesn't exist)

**Related Constraints:** A1 (production-ready only), B17 (no placeholders)

---

### Constraint A8: Prefer Framework Conventions

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Follow framework conventions and idioms rather than fighting against them. Use framework-provided solutions when available.

**Rationale:**
Reduces friction, improves maintainability, and leverages community knowledge.

**Enforcement:**
- Review framework documentation for conventions
- Use framework CLI generators
- Follow framework directory structures

**Examples:**
✅ Good: Use React Router for routing in React app
❌ Bad: Implement custom routing solution in React app

**Related Constraints:** A7 (confirmed APIs), D24 (consistent naming)

---

### Constraint A9: Avoid Premature Optimization

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Optimize only when performance issues are measured and documented. Don't add complexity for hypothetical performance gains.

**Rationale:**
Premature optimization adds complexity without proven benefit. Measure first, then optimize.

**Enforcement:**
- Establish performance baselines in Phase 4
- Optimize only when baselines fail
- Document optimization rationale in ADRs

**Examples:**
✅ Good: Profiled slow endpoint, identified N+1 query, optimized with eager loading
❌ Bad: Added caching layer before measuring if performance is actually a problem

**Related Constraints:** E32 (no performance regressions), D22 (SRP)

---

### Constraint A10: Single Source of Truth

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Each piece of data should have exactly one authoritative source. Avoid data duplication across components.

**Rationale:**
Prevents data inconsistency and synchronization bugs.

**Enforcement:**
- Identify data owners in architecture blueprint
- Document data flow in module context
- Review for data duplication in code reviews

**Examples:**
✅ Good: User profile stored in database, cached in Redis, but database is source of truth
❌ Bad: User profile stored in three different locations with manual sync logic

**Related Constraints:** D22 (SRP), B15 (optimize state management)

---

### Constraint A11: Immutable Infrastructure

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 5 (Release)
**Blocking:** No

**Description:**
For cloud deployments, use immutable infrastructure patterns. Deploy new versions rather than modifying existing infrastructure.

**Rationale:**
Improves reliability, simplifies rollbacks, and ensures consistent environments.

**Enforcement:**
- Use containerization (Docker)
- Deploy with orchestration (Kubernetes, ECS)
- No manual server modifications

**Examples:**
✅ Good: Deploy new Docker image with updated code
❌ Bad: SSH into production server and modify files manually

**Related Constraints:** A6 (domain best practices), C21 (security)

---

### Constraint A12: Graceful Degradation

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Design systems to degrade gracefully when external dependencies fail. Implement fallbacks, circuit breakers, and retry logic.

**Rationale:**
Improves system resilience and user experience during partial failures.

**Enforcement:**
- Identify external dependencies in blueprint
- Implement circuit breakers for critical services
- Add fallback strategies for non-critical features

**Examples:**
✅ Good: If recommendation API fails, show popular items instead
❌ Bad: Entire page crashes when recommendation API is down

**Related Constraints:** A10 (single source of truth), E32 (performance)

---

### Constraint A13: API Versioning

**Category:** Architecture & Dependency
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Design APIs with versioning from the start. Support multiple API versions during transitions.

**Rationale:**
Enables backward compatibility and smooth client migrations.

**Enforcement:**
- Include version in API URL (`/api/v1/`) or headers
- Document API versioning strategy in blueprint
- Maintain version compatibility matrix

**Examples:**
✅ Good: `/api/v1/users` and `/api/v2/users` coexist during migration
❌ Bad: Breaking API changes without versioning

**Related Constraints:** A7 (confirmed APIs), C19 (verifiable ACs)

---

### Constraint A14: Document Dependency Rationale

**Category:** Architecture & Dependency
**Phase:** 2 (Planning)
**Blocking:** Yes

**Description:**
For each dependency, document the rationale, alternatives considered, and trade-offs in ADRs.

**Rationale:**
Creates audit trail for future maintenance and enables informed dependency updates.

**Enforcement:**
- Create ADR for each major dependency
- Include alternatives analysis
- Document in technology stack section of blueprint

**Examples:**
✅ Good: ADR-003 explains why PostgreSQL chosen over MongoDB with trade-off analysis
❌ Bad: PostgreSQL listed in tech stack without justification

**Related Constraints:** A1 (production-ready), A7 (confirmed APIs)

---

## B. Implementation Restrictions (B15-B18)

### Constraint B15: Optimize State Management

**Category:** Implementation
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Explicitly optimize state management for each module. Define single source of truth, data flow patterns, and mutation boundaries.

**Rationale:**
Clear state management prevents bugs, improves maintainability, and enhances performance.

**Enforcement:**
- Document state strategy in module context
- Review state management approach in code reviews
- Verify unidirectional data flow

**Examples:**
✅ Good: Redux store as single source, components read-only, actions for mutations
❌ Bad: State scattered across components with bidirectional updates

**Related Constraints:** A10 (single source of truth), D22 (SRP)

---

### Constraint B16: Test-Driven Development

**Category:** Implementation
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Write tests alongside or before code implementation. Aim for test coverage ≥70%.

**Rationale:**
Ensures code is testable, reduces bugs, and provides regression protection.

**Enforcement:**
- Run coverage reports in CI/CD
- Block PRs below coverage threshold
- Review test quality in code reviews

**Examples:**
✅ Good: Write test for authentication logic, then implement to pass test
❌ Bad: Write all code first, add tests at the end (if at all)

**Related Constraints:** E30 (test coverage threshold), C19 (verifiable ACs)

---

### Constraint B17: No Placeholder Implementations

**Category:** Implementation
**Phase:** 3 (Implementation)
**Blocking:** Yes

**Description:**
All code must be fully functional. No placeholder implementations, mock returns, or `return null` stubs.

**Rationale:**
Incomplete implementations hide bugs and create false confidence in code completeness.

**Enforcement:**
- Code review checks for placeholders
- Static analysis detects stub patterns
- No `pass`, `return null`, or `throw NotImplementedError` in production

**Examples:**
✅ Good: Fully implemented authentication with real token validation
❌ Bad: `function authenticate() { return true; // TODO: implement }`

**Related Constraints:** B18 (no TODO without task), E33 (all ACs verified)

---

### Constraint B18: No TODO Without Corresponding Task

**Category:** Implementation
**Phase:** 3 (Implementation)
**Blocking:** Yes

**Description:**
TODO comments must reference a task ID in the task management system. No orphaned TODOs.

**Rationale:**
Ensures all incomplete work is tracked and not forgotten.

**Enforcement:**
- CI/CD scans for TODO comments without task IDs
- Code review rejects orphaned TODOs
- Static analysis enforces TODO format: `// TODO(T-1.2.3): Description`

**Examples:**
✅ Good: `// TODO(T-2.3.1): Add caching layer for performance`
❌ Bad: `// TODO: maybe add caching later`

**Related Constraints:** B17 (no placeholders), D26 (comprehensive docstrings)

---

## C. Audit & Verification (C19-C21)

### Constraint C19: Every AC Must Be Verifiable

**Category:** Audit & Verification
**Phase:** 1 (Requirements), 4 (Verification)
**Blocking:** Yes

**Description:**
Every Acceptance Criterion must have a clear verification method and produce evidence when tested.

**Rationale:**
Ensures requirements are testable and enables objective GO/NO-GO decisions.

**Enforcement:**
- Review ACs in Phase 1 for verification methods
- Verify all ACs with evidence in Phase 4
- Use Given/When/Then format for clarity

**Examples:**
✅ Good: AC-1.2: Given valid credentials, When user logs in, Then dashboard loads (Verification: E2E test log)
❌ Bad: AC-1.2: User should be able to log in (How to verify? What's the evidence?)

**Related Constraints:** E33 (all ACs verified), B16 (TDD)

---

### Constraint C20: Reproducible Builds

**Category:** Audit & Verification
**Phase:** 3 (Implementation), 4 (Verification)
**Blocking:** Yes

**Description:**
All builds must be reproducible. Same source code + same build environment = identical artifacts.

**Rationale:**
Enables verification of build integrity and security audits.

**Enforcement:**
- Use lock files for dependencies (A3)
- Pin build tool versions
- Use containerized build environments
- Generate build checksums

**Examples:**
✅ Good: Docker-based build with pinned base image and lock files
❌ Bad: `npm install` without lock file, different dependencies each build

**Related Constraints:** A3 (pin versions), C21 (security scans)

---

### Constraint C21: Security Scans Before GO

**Category:** Audit & Verification
**Phase:** 4 (Verification)
**Blocking:** Yes

**Description:**
Run SAST (Static Application Security Testing) and dependency vulnerability scans before GO decision. Zero critical/high vulnerabilities required.

**Rationale:**
Prevents deploying known security vulnerabilities to production.

**Enforcement:**
- Run `semgrep`, `npm audit`, `pip-audit`, etc. in Phase 4
- Block GO decision if critical/high vulnerabilities found
- Document scan results in evidence package

**Examples:**
✅ Good: Run `npm audit`, fix all critical/high, document results
❌ Bad: Skip security scans or ignore critical vulnerabilities

**Related Constraints:** E31 (zero critical/high vulnerabilities), A1 (production-ready)

---

## D. Code Organization & Style (D22-D29)

### Constraint D22: Single Responsibility Principle (SRP)

**Category:** Code Organization
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Each module, class, and function should have exactly one reason to change. Separate concerns into distinct components.

**Rationale:**
Improves maintainability, testability, and code clarity.

**Enforcement:**
- Code review checks for SRP violations
- Static analysis for high cyclomatic complexity (>10)
- Refactor when component has multiple responsibilities

**Examples:**
✅ Good: Separate `UserRepository` (data access) and `UserService` (business logic)
❌ Bad: Single `UserManager` class handles data access, validation, email sending, logging

**Related Constraints:** D23 (small functions), D24 (naming conventions)

---

### Constraint D23: Small, Focused Functions

**Category:** Code Organization
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Functions should be small (typically <50 lines) and do one thing well. Extract helper functions when functions grow large.

**Rationale:**
Small functions are easier to test, understand, and maintain.

**Enforcement:**
- Code review flags functions >50 lines
- Static analysis for cyclomatic complexity
- Encourage extraction when functions are complex

**Examples:**
✅ Good: `validateEmail()` function with 10 lines of validation logic
❌ Bad: 200-line function handling validation, database access, email sending, and logging

**Related Constraints:** D22 (SRP), D26 (docstrings)

---

### Constraint D24: Consistent Naming Conventions

**Category:** Code Organization
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Follow language and framework naming conventions consistently throughout the project.

**Rationale:**
Consistency improves readability and reduces cognitive load for developers.

**Enforcement:**
- Linter rules for naming conventions
- Code review checks naming consistency
- Document project naming conventions in blueprint

**Examples:**
✅ Good: Python: `user_repository.py`, `UserRepository` class, `get_user_by_id()` method
❌ Bad: Python: `userRepository.py`, `userrepository` class, `GetUserById()` method

**Related Constraints:** D22 (SRP), A8 (framework conventions)

---

### Constraint D25: DRY (Don't Repeat Yourself)

**Category:** Code Organization
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Avoid code duplication. Extract shared logic into reusable functions, classes, or modules.

**Rationale:**
Reduces maintenance burden and prevents bug proliferation.

**Enforcement:**
- Static analysis detects code duplication (>5% threshold)
- Code review identifies duplicated patterns
- Refactor when duplication detected

**Examples:**
✅ Good: Shared validation logic in `validators.js` imported by multiple components
❌ Bad: Same validation code copy-pasted in 5 different files

**Related Constraints:** D22 (SRP), A4 (reuse patterns)

---

### Constraint D26: Comprehensive Docstrings

**Category:** Code Organization
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
All public APIs (functions, classes, modules) must have comprehensive docstrings documenting purpose, parameters, return values, and exceptions.

**Rationale:**
Improves maintainability and enables auto-generated documentation.

**Enforcement:**
- Linter checks for missing docstrings on public APIs
- Code review verifies docstring completeness
- Documentation coverage reports (target: 80%)

**Examples:**
✅ Good:
```python
def authenticate_user(username: str, password: str) -> Optional[User]:
    """
    Authenticate user with username and password.

    Args:
        username: User's unique username
        password: User's plain-text password (will be hashed)

    Returns:
        User object if authentication successful, None otherwise

    Raises:
        DatabaseError: If database connection fails
    """
```

❌ Bad:
```python
def authenticate_user(username, password):
    # No docstring
```

**Related Constraints:** D23 (small functions), B18 (no orphaned TODOs)

---

### Constraint D27: Error Handling Strategy

**Category:** Code Organization
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Define and consistently apply error handling strategy. Use exceptions for exceptional cases, return error types for expected failures.

**Rationale:**
Consistent error handling improves debugging and user experience.

**Enforcement:**
- Document error handling strategy in blueprint
- Code review verifies consistent error handling
- Avoid swallowing exceptions silently

**Examples:**
✅ Good: Return `Result<User, AuthError>` type with specific error variants
❌ Bad: Mix of exceptions, null returns, and boolean flags for error conditions

**Related Constraints:** D26 (docstrings), C19 (verifiable ACs)

---

### Constraint D28: Code Formatting

**Category:** Code Organization
**Phase:** 3 (Implementation)
**Blocking:** No

**Description:**
Use automated code formatters (Prettier, Black, RustFmt) to maintain consistent formatting. Configure formatters in project.

**Rationale:**
Eliminates formatting debates and ensures consistency across codebase.

**Enforcement:**
- Run formatter in pre-commit hooks
- CI/CD checks formatting compliance
- Configure formatter in project setup

**Examples:**
✅ Good: Use Prettier with configuration file, format on save
❌ Bad: Manual formatting with inconsistent styles across files

**Related Constraints:** D24 (naming conventions), D22 (SRP)

---

### Constraint D29: Layer Separation

**Category:** Code Organization
**Phase:** 2 (Planning), 3 (Implementation)
**Blocking:** No

**Description:**
Maintain clear separation between layers (presentation, business logic, data access). Avoid mixing concerns across layers.

**Rationale:**
Improves testability, maintainability, and enables independent layer evolution.

**Enforcement:**
- Define layers in architecture blueprint
- Code review checks for layer violations
- Static analysis detects cross-layer dependencies

**Examples:**
✅ Good: Controllers → Services → Repositories → Database
❌ Bad: Controllers directly query database, bypassing services

**Related Constraints:** D22 (SRP), A10 (single source of truth)

---

## E. Quality Thresholds (E30-E33) [NEW v1.0]

### Constraint E30: Test Coverage ≥70% Before GO

**Category:** Quality Threshold
**Phase:** 4 (Verification)
**Blocking:** Yes

**Description:**
Code must have at least 70% test coverage (line coverage) before GO decision. Target is 85%+.

**Rationale:**
Ensures adequate testing and provides regression protection.

**Enforcement:**
- Run coverage reports in Phase 4
- Block GO decision if coverage <70%
- Warn if coverage <85%
- Document coverage in evidence package

**Examples:**
✅ Good: Coverage report shows 72% line coverage, all ACs covered by tests
❌ Bad: Coverage at 65%, critical authentication logic not tested

**Related Constraints:** B16 (TDD), C19 (verifiable ACs), E33 (ACs verified)

**Verification Method:**
```bash
npm test -- --coverage
# Verify: Coverage ≥70%
```

---

### Constraint E31: Zero Critical/High Security Vulnerabilities

**Category:** Quality Threshold
**Phase:** 4 (Verification)
**Blocking:** Yes

**Description:**
Zero critical or high severity security vulnerabilities before GO decision. Medium/low vulnerabilities acceptable with risk assessment.

**Rationale:**
Prevents deploying known security risks to production.

**Enforcement:**
- Run SAST and dependency scans in Phase 4
- Block GO if critical/high vulnerabilities found
- Document all security findings in evidence package
- Medium/low vulnerabilities require risk assessment and tracking

**Examples:**
✅ Good: Security scan shows 0 critical, 0 high, 2 medium (documented with mitigation plan)
❌ Bad: Security scan shows 1 critical SQL injection vulnerability (GO blocked)

**Related Constraints:** C21 (security scans), A1 (production-ready)

**Verification Method:**
```bash
semgrep --config=auto src/
npm audit
# Verify: 0 critical, 0 high vulnerabilities
```

---

### Constraint E32: No Critical Performance Regressions (>25%)

**Category:** Quality Threshold
**Phase:** 4 (Verification)
**Blocking:** Yes

**Description:**
No performance regressions >25% from established baselines. Regressions >10% require investigation and documentation.

**Rationale:**
Maintains system performance and user experience.

**Enforcement:**
- Establish baselines in initial Phase 4 run
- Compare performance tests against baselines
- Block GO if regressions >25%
- Warn if regressions >10%
- Document performance metrics in evidence package

**Examples:**
✅ Good: API P95 latency: 120ms baseline → 125ms current (+4%, acceptable)
❌ Bad: API P95 latency: 120ms baseline → 180ms current (+50%, GO blocked)

**Related Constraints:** A9 (avoid premature optimization), E33 (ACs verified)

**Verification Method:**
```bash
npm run test:performance
# Compare against docs/verification/performance-baselines/baseline-v1.0.md
# Verify: No regression >25%
```

---

### Constraint E33: All ACs Verified with Evidence

**Category:** Quality Threshold
**Phase:** 4 (Verification)
**Blocking:** Yes

**Description:**
100% of Acceptance Criteria must be verified with documented evidence before GO decision.

**Rationale:**
Ensures all requirements are met and provides objective completion criteria.

**Enforcement:**
- Verify each AC in Phase 4
- Document evidence (test logs, screenshots, metrics) for each AC
- Block GO if any AC fails verification
- Include AC verification matrix in evidence package

**Examples:**
✅ Good: All 15 ACs verified, evidence documented in test reports and screenshots
❌ Bad: 13 of 15 ACs verified, 2 ACs skipped due to time constraints (GO blocked)

**Related Constraints:** C19 (verifiable ACs), E30 (test coverage), B16 (TDD)

**Verification Method:**
```markdown
| AC ID | Status | Evidence | Test ID |
|-------|--------|----------|---------|
| AC-1.1 | ✅ PASS | test-reports/ac-1.1.log | T-1.1.1 |
| AC-1.2 | ✅ PASS | screenshots/login-success.png | T-1.1.2 |
...
# Verify: All ACs show ✅ PASS
```

---

## Using Constraints in Phases

### Phase 1 (Requirements)
**Relevant Constraints:**
- C19: Every AC must be verifiable
- A14: Document dependency rationale (initial tech stack)

**Enforcement:**
- Product Manager reviews ACs for verification methods
- Each AC must have Given/When/Then format

### Phase 2 (Planning)
**Relevant Constraints:**
- A1: Production-ready dependencies only
- A7: Confirmed APIs only (validate with Context7)
- A14: Document dependency rationale
- D22-D29: Architecture design with layer separation

**Enforcement:**
- Software Architect validates all libraries via Context7
- Technology stack documented with ADRs
- Architecture blueprint includes layer diagrams

### Phase 3 (Implementation)
**Relevant Constraints:**
- All A constraints (dependencies, patterns)
- B15-B18: Implementation restrictions
- D22-D29: Code organization and style

**Enforcement:**
- Senior Developer follows blueprint patterns
- Code reviews check constraint compliance
- Linters and formatters enforce style

### Phase 4 (Verification)
**Relevant Constraints:**
- C19-C21: Audit and verification
- E30-E33: Quality thresholds (blocking)

**Enforcement:**
- QA Lead executes comprehensive verification
- All thresholds must pass for GO decision
- Evidence package documents compliance

### Phase 5 (Release)
**Relevant Constraints:**
- All constraints validated in Phase 4
- C20: Reproducible builds
- A11: Immutable infrastructure (if applicable)

**Enforcement:**
- Release Manager verifies evidence package
- Deployment uses immutable artifacts
- Rollback plan ready

---

## Quick Reference Matrix

| Constraint | Phase | Blocking | Enforcement Point |
|------------|-------|----------|-------------------|
| A1 | 2, 3 | Yes | Technology stack selection |
| A7 | 2, 3 | Yes | API validation via Context7 |
| A14 | 2 | Yes | ADR creation |
| B17 | 3 | Yes | Code review |
| B18 | 3 | Yes | Static analysis |
| C19 | 1, 4 | Yes | AC review, verification |
| C21 | 4 | Yes | Security scan |
| D22 | 3 | No | Code review |
| D24 | 3 | No | Linter |
| D26 | 3 | No | Documentation coverage |
| E30 | 4 | Yes | Coverage report |
| E31 | 4 | Yes | Security scan |
| E32 | 4 | Yes | Performance testing |
| E33 | 4 | Yes | AC verification matrix |

---

## Version

**Constraints Version:** 1.0.0
**CodeMaestro:** 1.0.0
**Last Updated:** 2026-01-13

**Status:** ✅ Complete - All 33 constraints documented
