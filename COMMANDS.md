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

## Knowledge Base Commands (v1.0)

### `/kb search [query]`
Search knowledge base

### `/kb add failure`
Document failure pattern

### `/kb add pattern`
Document success pattern

### `/kb list`
List all KB entries

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

**Full documentation:** See [COMMANDS.md](COMMANDS.md) and [docs/config/mcp-tools.md](docs/config/mcp-tools.md)
