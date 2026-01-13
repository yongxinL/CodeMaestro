# CodeMaestro - Command Reference

## Navigation Commands

### `/status`
Show current phase, role, task progress, git status

### `/next`
Load and begin next pending task

### `/task T-X.X.X`
Load specific task by ID

### `/phase N`
Jump to specific phase (requires justification)

### `/init-phase [N]`
Interactive phase initialization wizard (v1.1)

**Syntax:**
```bash
/init-phase 1          # Phase 1 (Requirements) wizard
/init-phase 2          # Phase 2 (Planning) wizard
/init-phase            # Auto-detect next phase
/init-phase --skip     # Skip wizard, use manual workflow
```

**Features:**
- Guided questions based on skill tier
- Validation & completeness checks
- Auto-generates specifications/blueprints
- Optional competitive research integration
- Preview before locking

**See:** [docs/config/phase-init-wizard.md](docs/config/phase-init-wizard.md)

### `/tree`
Show task DAG with status indicators

**Syntax:**
```bash
/tree                           # Display text DAG (default)
/tree --visual                  # Generate interactive HTML visualization
/tree --visual --open           # Generate and open in browser
/tree --visual --export         # Save HTML to docs/architecture/
/tree --visual --layout [type]  # Specify layout (hierarchical|force|radial|tree)
/tree --visual --highlight critical  # Highlight critical path
/tree --visual --filter pending # Filter by status
```

**Visual Features:**
- Interactive nodes (click, drag, hover)
- Critical path highlighting (blue nodes)
- Parallel execution groups
- Progress tracking (color-coded: 🟢 complete, 🟡 in-progress, ⚪ pending)
- Export formats: HTML, PNG, SVG, JSON
- Real-time updates with --watch flag

**Layout Algorithms:**
- **Hierarchical** (default): Top-to-bottom flow, clear dependency levels
- **Force-directed**: Physics simulation, optimal for complex networks
- **Radial**: Central root with tasks radiating outward
- **Tree**: Left-to-right tree structure, presentation-friendly

**See:** [docs/config/visual-task-dag.md](docs/config/visual-task-dag.md)

---

## Role Commands

### `/role`
Show current active role and responsibilities

### `/roles`
List all roles for current phase

### `/consult [role1] [role2]`
Multi-role consultation

---

## Git Commands

### `/commit`
Generate git commit for current state (default: shows template)

**Syntax:**
```bash
/commit                    # Show commit template (default)
/commit --auto             # Auto-generate and execute with confirmation
/commit --preview          # Preview generated message without executing
/commit --edit             # Generate message, open editor, then execute
/commit --dry-run          # Show what would be committed without changes
```

**Features:**
- Default behavior unchanged (shows template for manual use)
- Opt-in automation with safety confirmation
- Auto-detects phase, role, changed files
- Formats according to git-commands.md templates
- Includes metadata (phase, task ID, effort tracking)

**Safety:**
- Always shows preview before executing
- Requires explicit confirmation
- Allows editing before commit
- Maintains audit trail

**See:** [docs/config/git-automation.md](docs/config/git-automation.md)

### `/checkpoint`
Pause for human review, show git commands

### `/git-status`
Detailed git status and history

### `/tag`
Show all project tags

### `/rollback [tag]`
Show rollback commands

---

## Recovery Commands

### `/recover`
Execute context recovery protocol

### `/snapshot`
Force save recovery checkpoint

### `/history`
Show decision log tail

---

## Knowledge Base Commands (v1.0+)

### `/kb search [query]`
Search knowledge base (project-specific or global)

**Syntax:**
```bash
/kb search [query]              # Search local project KB (default)
/kb search --global [query]     # Search global KB (all projects)
/kb search --all [query]        # Search both local and global
/kb search --global --type pattern  # Filter by type
/kb search --global --domain mobile  # Filter by domain
/kb search --global --confidence high  # Filter by confidence
/kb search --global --semantic "query"  # AI-powered semantic search
```

### `/kb export`
Export project KB entries to global KB (v1.1)

**Syntax:**
```bash
/kb export                      # Export all project entries
/kb export [entry-id]           # Export specific entry (e.g., P001, F003)
/kb export --filter pattern     # Export only patterns
/kb export --auto               # Enable auto-export on Phase 5
```

**Features:**
- Duplicate detection
- Conflict resolution
- Privacy filtering (auto-redact sensitive data)
- Attribution tracking

### `/kb import [entry-id]`
Import entry from global KB to project (v1.1)

**Syntax:**
```bash
/kb import [entry-id]           # Import specific entry from global KB
/kb import --pattern [id]       # Import pattern (alias)
/kb import --recommend          # AI recommends relevant entries
/kb import --merge              # Merge with existing local entry
```

### `/kb sync`
Synchronize project KB with global KB (v1.1)

**Syntax:**
```bash
/kb sync                        # Two-way sync (export new, import updates)
/kb sync --push                 # One-way push (export to global)
/kb sync --pull                 # One-way pull (import from global)
/kb sync --dry-run              # Preview changes without applying
```

### `/kb stats`
View knowledge base statistics

**Syntax:**
```bash
/kb stats                       # Project KB stats
/kb stats --global              # Global KB stats across all projects
```

### `/kb add failure`
Document failure pattern

### `/kb add pattern`
Document success pattern

### `/kb list`
List all KB entries

**See:** [docs/config/multi-project-kb.md](docs/config/multi-project-kb.md)

---

## Portfolio Commands (v1.0)

### `/portfolio generate`
Generate portfolio materials

### `/portfolio preview`
Preview portfolio content

---

## Team Commands

### `/team`
Show team mode status

### `/pr`
Generate pull request template

### `/review`
Start code review workflow

### `/assign [task] [member]`
Assign task to team member

---

## MCP Tool Commands (v1.0)

### `/research [topic]`
Combined WebSearch + Context7 research

### `/lookup [library]`
Get library documentation via Context7

### `/validate api [library] [method]`
Confirm API exists via Context7

### `/example [library] [feature]`
Get code examples from Context7

### `/security check [library]`
Research vulnerabilities via WebSearch

### `/compliance [standard]`
Look up compliance requirements via WebSearch

### `/sources`
List all MCP tool sources used in project

---

## Quality & Validation Commands (v1.1)

### `/security scan`
Run automated vulnerability scan on dependencies

**Syntax:**
```bash
/security scan                    # Scan all dependencies
/security scan --ecosystem npm    # Scan specific ecosystem
/security scan --severity high    # Show only high/critical
/security scan --fix              # Show fix commands
```

**Supported Ecosystems:**
- JavaScript/Node.js (npm audit)
- Python (pip-audit, safety)
- Rust (cargo audit)
- Ruby (bundle audit)
- Java (mvn dependency-check)
- Go (govulncheck)

**Output:** CVE IDs, severity levels, fix commands, quality gate status

**See:** [docs/config/security-scanning.md](docs/config/security-scanning.md)

### `/validate quality`
Run incremental quality gate checks (Phase 3)

**Checks:**
- Test coverage (≥70%)
- Security issues (0 critical/high)
- Acceptance criteria pass rate (100%)

### `/validate tests`
Check test coverage only

### `/validate ac`
Check acceptance criteria pass rate only

---

## Generation & Automation Commands (v1.1)

### `/scaffold [domain]`
Generate domain-specific project structure (Phase 2)

**Syntax:**
```bash
/scaffold mobile                # React Native mobile app structure
/scaffold web                   # Next.js/React web app structure
/scaffold cloud                 # Node.js/Express backend structure
/scaffold ai                    # Python ML/Data Science structure
/scaffold --auto                # Auto-detect from locked specification
/scaffold mobile --framework flutter  # Override default framework
/scaffold web --language typescript   # Override default language
/scaffold --dry-run             # Preview structure without creating files
```

**Supported Domains:**
- **Mobile**: React Native, Flutter (iOS/Android)
- **Web**: Next.js, React, Vue, Angular, Svelte
- **Cloud**: Express, FastAPI, Spring Boot, serverless
- **AI/ML**: Jupyter, TensorFlow, PyTorch, MLOps

**Generated Content:**
- Complete directory structure
- Configuration files (linting, testing, build)
- Boilerplate code (routing, authentication, API setup)
- Development dependencies
- Docker containerization
- README and documentation templates

**Features:**
- Best practices by default
- Framework flexibility
- Safety checks (warns if files exist)
- Post-scaffold validation
- Integration with Phase 2 architecture blueprint

**Example Output:**
```
✅ Scaffolded 47 files
✅ Installed 23 dependencies
✅ Configured linting and formatting
✅ Generated example tests

Next steps:
1. Review generated files
2. Update .env with configuration
3. Run: npm start
4. Begin implementation (Phase 3)
```

**See:** [docs/config/domain-scaffolding.md](docs/config/domain-scaffolding.md)

---

### `/generate test [AC-ID]`
Generate test stubs from acceptance criteria (Phase 3)

**Syntax:**
```bash
/generate test AC-1.2           # Generate test stub for specific AC
/generate test AC-1.*           # Generate stubs for all AC-1.x
/generate test --all            # Generate stubs for all ACs
/generate test AC-1.2 --lang python  # Force specific language
/generate test AC-1.2 --preview # Preview without creating file
```

**Supported Languages:**
- TypeScript/JavaScript (Jest, Vitest, Mocha)
- Python (pytest, unittest)
- Java (JUnit 5)
- Go (testing package)
- Rust (built-in test framework)
- C# (xUnit, NUnit)

**Generated Content:**
- Test file structure matching AC ID
- Given/When/Then/And sections as test cases
- TODO markers for implementation
- Boilerplate setup/teardown hooks
- AC traceability comments

**Features:**
- Parses Given/When/Then/And from locked specification
- Detects project language from codebase
- Creates test file in appropriate directory
- Ensures 100% AC coverage tracking
- Developers implement test logic in TODO sections

**Example Output:**
```typescript
// AC-1.2: User login with valid credentials
describe('AC-1.2: User login with valid credentials', () => {
  it('redirects to dashboard on valid login', async () => {
    // Given: User has valid username and password
    // TODO: Create test fixtures

    // When: User submits login form
    // TODO: Make API request

    // Then: User is redirected to dashboard
    // TODO: Verify redirect

    // And: Session cookie is set
    // TODO: Verify session cookie
  });
});
```

**See:** [docs/config/code-generation-from-ac.md](docs/config/code-generation-from-ac.md)

### `/generate ci-cd`
Generate CI/CD pipeline configurations

**Syntax:**
```bash
/generate ci-cd                    # Auto-detect platform
/generate ci-cd --platform github  # Force specific platform
/generate ci-cd --preview          # Preview without creating
/generate ci-cd --full             # Full pipeline with staging/prod
```

**Supported Platforms:**
- GitHub Actions (.github/workflows/)
- GitLab CI (.gitlab-ci.yml)
- CircleCI (.circleci/config.yml)
- Jenkins (Jenkinsfile)
- Bitbucket Pipelines (bitbucket-pipelines.yml)

**Generated Pipelines:**
- Test pipeline (PR checks)
- Build pipeline (main branch)
- Deploy staging (automatic)
- Deploy production (manual approval)
- Security scan (weekly)

**Quality Gates Enforced:**
- Test coverage ≥70%
- Security scan (0 critical/high)
- Linting
- Integration tests

**See:** [docs/config/cicd-generation.md](docs/config/cicd-generation.md)

---

## Phase F: Advanced Analytics & Compliance

### `/estimate suggest`
Get AI-powered task effort estimate based on historical data

**Syntax:**
```bash
/estimate suggest "[task-description]"        # Get estimate for new task
/estimate suggest --similar [task-id]         # Based on similar completed task
/estimate suggest --category [category-name]  # For specific category
```

**Example Output:**
```
AI-Powered Estimate: "Implement user authentication with JWT"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Base Estimate:        4.0 hours
Adjusted Estimate:    6.0 hours (+50%)
Confidence:           85% (8 similar tasks)

Adjustment Factors:
  - Authentication: 1.5x multiplier (historical)
  - JWT integration: +1.0h (library setup)
  - Security testing: +0.5h (constraint E31)

Recommendation: Use 6 hours as estimate
```

**See:** [docs/config/ai-estimation.md](docs/config/ai-estimation.md)

### `/estimate track`
Record actual effort for completed task

**Syntax:**
```bash
/estimate track [task-id] --actual [hours]
/estimate track [task-id] --actual [hours] --notes "[reason]"
```

**Usage:** Track actual effort after task completion to improve future estimates. System learns category multipliers automatically.

**See:** [docs/config/ai-estimation.md](docs/config/ai-estimation.md)

### `/estimate analyze`
Analyze estimation accuracy across all tasks

**Syntax:**
```bash
/estimate analyze                           # Overall analysis
/estimate analyze --category [category]     # Specific category
/estimate analyze --phase [phase-number]    # Specific phase
```

**Metrics Shown:**
- Average variance (±%)
- Accuracy rate (within ±25%)
- Category multipliers (with confidence)
- Improvement over time

**See:** [docs/config/ai-estimation.md](docs/config/ai-estimation.md)

---

### `/benchmark establish`
Establish performance baselines for regression testing

**Syntax:**
```bash
/benchmark establish                        # Establish baseline
/benchmark establish --profile [name]       # Custom profile name
```

**What It Does:**
- Runs performance tests on API endpoints
- Measures P50/P95/P99 latency, throughput
- Tracks memory, CPU, database queries
- Stores baseline for future comparison

**Example Output:**
```
Establishing Performance Baselines
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API Endpoint: POST /api/users
  ✅ P50: 45ms
  ✅ P95: 120ms ← Baseline threshold
  ✅ Throughput: 1,200 req/s

Baseline saved: docs/verification/performance-baselines/baseline-v1.0.json

Thresholds set:
  ⚠️  Warning: +10% from baseline
  🚫 Critical: +25% from baseline
```

**See:** [docs/config/performance-baseline.md](docs/config/performance-baseline.md)

### `/benchmark compare`
Compare current performance against baseline

**Syntax:**
```bash
/benchmark compare                          # Compare against latest baseline
/benchmark compare --baseline [file]        # Compare against specific baseline
/benchmark compare --fail-on [warning|critical]  # CI/CD integration
```

**Quality Gate:** Constraint E32 (no performance regression)
- **0-10% change:** ✅ STABLE
- **10-25% degradation:** ⚠️ WARNING
- **>25% degradation:** 🚫 CRITICAL (blocks Phase 5)

**See:** [docs/config/performance-baseline.md](docs/config/performance-baseline.md)

### `/benchmark trend`
View performance trends across versions

**Syntax:**
```bash
/benchmark trend                            # All endpoints
/benchmark trend --endpoint [name]          # Specific endpoint
/benchmark trend --versions [count]         # Last N versions
```

**Use Case:** Track performance improvements/regressions over time in Phase 5 retrospectives.

**See:** [docs/config/performance-baseline.md](docs/config/performance-baseline.md)

---

### `/ethics scan`
Comprehensive ethics and compliance validation

**Syntax:**
```bash
/ethics scan                                      # Full scan
/ethics scan --category [privacy|accessibility|fairness|security]
/ethics scan --severity [info|warning|critical]
```

**Categories Scanned:**
- **Privacy:** GDPR, CCPA, HIPAA compliance
- **Accessibility:** WCAG 2.1 Level AA validation
- **Fairness:** ML algorithmic bias detection
- **Security:** Ethical security practices

**Example Output:**
```
Ethics & Compliance Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Privacy & Data Protection
  🚫 Missing cookie consent banner (GDPR)
  🚫 PII stored unencrypted (GDPR Article 32)

♿ Accessibility (WCAG 2.1 Level AA)
  🚫 Keyboard trap in modal (WCAG 2.1.2)
  ⚠️  Low contrast on button (3.2:1, needs 4.5:1)

Summary: 🚫 NON-COMPLIANT
Cannot proceed to Phase 5 until critical issues resolved
```

**See:** [docs/config/ethics-validation.md](docs/config/ethics-validation.md)

### `/ethics privacy`
Privacy compliance scan (GDPR, CCPA, HIPAA)

**Syntax:**
```bash
/ethics privacy                                   # All regulations
/ethics privacy --regulation [gdpr|ccpa|hipaa]    # Specific regulation
/ethics privacy --detailed                        # Detailed analysis
```

**Checks:**
- Cookie consent (analytics, marketing)
- Privacy policy links on forms
- PII encryption at rest
- Data retention policies
- Right to access/deletion APIs
- Third-party data sharing

**See:** [docs/config/ethics-validation.md](docs/config/ethics-validation.md)

### `/ethics accessibility`
WCAG accessibility compliance scan

**Syntax:**
```bash
/ethics accessibility                       # WCAG 2.1 Level AA
/ethics accessibility --level [A|AA|AAA]    # Specific level
/ethics accessibility --format html         # Generate HTML report
```

**Checks:**
- Color contrast (4.5:1 minimum)
- Keyboard navigation
- Screen reader compatibility (ARIA)
- Form labels and instructions
- Focus management

**See:** [docs/config/ethics-validation.md](docs/config/ethics-validation.md)

### `/ethics fairness`
ML algorithmic bias detection

**Syntax:**
```bash
/ethics fairness                            # Scan all ML models
/ethics fairness --model [model-path]       # Specific model
/ethics fairness --metrics [metric-name]    # Specific fairness metric
```

**Metrics Calculated:**
- **Demographic Parity:** Equal approval rates across groups
- **Equalized Odds:** Equal TPR/FPR across groups
- **Disparate Impact:** 80% rule compliance
- **Individual Fairness:** Similar individuals, similar outcomes

**Critical Issues:**
- Protected attributes in training data (gender, race)
- Disparate impact ratio <0.80 (legal threshold)
- High fairness metric disparities (>5%)

**See:** [docs/config/ethics-validation.md](docs/config/ethics-validation.md)

### `/ethics report`
Generate comprehensive ethics compliance report

**Syntax:**
```bash
/ethics report                              # HTML report
/ethics report --format [html|pdf|markdown]
/ethics report --output [file-path]
```

**Use Case:** Generate compliance certificate for legal/regulatory review in Phase 5.

**See:** [docs/config/ethics-validation.md](docs/config/ethics-validation.md)

---

**Full documentation:** See [COMMANDS.md](COMMANDS.md) and [docs/config/mcp-tools.md](docs/config/mcp-tools.md)
