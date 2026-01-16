# CodeMaestro - Core Command Reference

**Essential commands for daily development workflow (Phases 1-5)**

For advanced analytics and compliance commands, see [.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md)

---

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

**See:** [.CodeMaestro/config/phase-init-wizard.md](.CodeMaestro/config/phase-init-wizard.md)

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

**See:** [.CodeMaestro/config/visual-task-dag.md](.CodeMaestro/config/visual-task-dag.md)

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

**See:** [.CodeMaestro/config/git-automation.md](.CodeMaestro/config/git-automation.md)

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

**See:** [.CodeMaestro/config/multi-project-kb.md](.CodeMaestro/config/multi-project-kb.md)

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

**See:** [.CodeMaestro/config/security-scanning.md](.CodeMaestro/config/security-scanning.md)

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

**See:** [.CodeMaestro/config/domain-scaffolding.md](.CodeMaestro/config/domain-scaffolding.md)

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

**See:** [.CodeMaestro/config/code-generation-from-ac.md](.CodeMaestro/config/code-generation-from-ac.md)

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

**See:** [.CodeMaestro/config/cicd-generation.md](.CodeMaestro/config/cicd-generation.md)

---

## Advanced Commands

For Phase F advanced features (AI-powered estimation, performance benchmarking, ethics & compliance validation), see:

**[.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md)** - Phase F: Advanced Analytics & Compliance
- AI-powered task estimation (`/estimate suggest`, `/estimate track`, `/estimate analyze`)
- Performance baseline tracking (`/benchmark establish`, `/benchmark compare`, `/benchmark trend`)
- Ethics & compliance validation (`/ethics scan`, `/ethics privacy`, `/ethics accessibility`, `/ethics fairness`, `/ethics report`)

---

**Full documentation:** See [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md) (this file), [.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md), and [.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md)
