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

### `/handoff` (v1.0+)
Generate handoff message for session transitions

**Syntax:**
```bash
/handoff                         # Generate handoff for current phase
/handoff --next                  # Include next phase preparation
/handoff --tokens                # Include detailed token analysis
/handoff --recovery              # Include recovery instructions
/handoff --export                # Export handoff to file
```

**Output:**
```markdown
## Session Handoff: [Current Phase] → [Next Phase]

**What Was Accomplished:**
- ✅ [Completed work 1]
- ✅ [Completed work 2]

**Next Phase Entry:**
1. Load [phase prompt file]
2. Activate [role] role
3. Start with [step]

**Critical Context:**
- [Key decision 1]
- [Key decision 2]

**Files to Load First:**
- [file 1] - [why important]

**Token Metrics:**
- Current session: [X]K tokens
- Next phase estimate: [Y]K tokens

**Git State:**
- Branch: [branch]
- Tag: [tag]

**Recovery:** [checkpoint file path]
```

**Features:**
- Automatic context capture
- Phase-specific templates
- Token budget tracking
- Git state snapshot
- Quick resume commands

**When to Use:**
- End of every phase (automatic in checkpoints)
- Before long breaks (>24 hours)
- Session utilization >85%
- Before context-heavy operations

**See:** [.CodeMaestro/config/handoff-messages.md](.CodeMaestro/config/handoff-messages.md)

---

## Token Management Commands (v1.0+)

### `/estimate`
Estimate token usage for tasks or milestones

**Syntax:**
```bash
/estimate task T-1.2.3          # Estimate specific task
/estimate milestone M2          # Estimate entire milestone
/estimate session               # Check current session budget status
/estimate project               # Show project-wide token estimate summary
```

**Output:**
```
Task T-1.2.3: Implement Authentication Module

Estimated Tokens: 35,000 tokens

Breakdown:
- Code generation: 20,000 tokens
- Testing: 8,000 tokens
- Documentation: 5,000 tokens
- Debugging buffer: 2,000 tokens

Complexity: Complex (3.5x)
Multipliers: High Security (+1.2x)
Base: 25,000 tokens (Business Logic)

Session Impact:
- Current usage: 142,000 tokens
- After task: ~177,000 tokens (17.7% of budget)
- Status: ✅ Sufficient budget
```

**Features:**
- Estimates based on task complexity and multipliers
- Shows breakdown by activity type
- Validates against current session budget
- Recommends session breaks if needed

**See:** [.CodeMaestro/config/token-estimation.md](.CodeMaestro/config/token-estimation.md)

### `/budget`
Check current session token budget and utilization

**Syntax:**
```bash
/budget                         # Show current session status
/budget --detailed              # Include task-level breakdown
/budget --forecast              # Forecast remaining tasks
/budget --history               # Show historical usage
```

**Output:**
```
Session Budget Status

Model: Claude Sonnet 4.5 (1M context)
Duration: 2h 15m

Token Usage:
- Used: 142,000 tokens (14.2%)
- Reserved: 200,000 tokens (20%)
- Available: 658,000 tokens (65.8%)

Remaining Tasks: 3
- T-2.1.1: 25,000 tokens (est.)
- T-2.1.2: 30,000 tokens (est.)
- T-2.1.3: 40,000 tokens (est.)
- Total: 95,000 tokens

Forecast:
- After completion: 237,000 tokens used (23.7%)
- Status: ✅ All tasks fit within budget
- Recommendation: Continue in current session
```

**Alert Thresholds:**
- **<60%:** Efficient (green)
- **60-80%:** Moderate (yellow)
- **>80%:** High utilization (orange) - consider session break
- **>90%:** Critical (red) - create checkpoint immediately

**Features:**
- Real-time budget tracking
- Task forecasting
- Session break recommendations
- Budget exhaustion warnings

### `/variance`
Analyze token estimation variance

**Syntax:**
```bash
/variance                       # Overall variance analysis
/variance milestone M2          # Milestone-specific analysis
/variance task T-1.2.3          # Task-specific analysis
/variance --trends              # Show variance trends over time
/variance --export              # Export variance data to CSV
```

**Output:**
```
Token Variance Analysis

Overall:
- Estimated: 390,000 tokens
- Actual: 387,000 tokens
- Variance: -3,000 tokens (-0.8%)
- Accuracy: Excellent ✅

By Milestone:
M1: +18.3% (over-budget, learning curve)
M2: -8.3% (under-budget, pattern reuse)
M3: -11.1% (under-budget, optimization)

By Phase:
Phase 2 (Planning): +5.2%
Phase 3 (Implementation): -2.1%
Phase 4 (Verification): -4.5%

Trends:
- Improving accuracy over time ✅
- Early estimates too conservative
- Testing estimates accurate
- Documentation under-estimated by ~10%

Recommendations:
1. Apply 1.7x multiplier for new libraries
2. Add 10% to documentation baselines
3. Use historical data for future projects
```

**Features:**
- Overall and granular variance analysis
- Trend identification
- Actionable recommendations
- Export for reporting

### `/tokens`
Quick token status summary (alias for `/budget`)

**Syntax:**
```bash
/tokens                         # Same as /budget
/tokens --quick                 # One-line summary
```

**Quick Output:**
```
Tokens: 142K used / 800K available (17.8%) | Remaining tasks: 95K est. | Status: ✅
```

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

## Release Preparation Scripts (Phase 5)

### cleanup.sh - Framework File Removal

Removes CodeMaestro framework files before final release to ensure clean deliverables.

**Location:** Project root (generated by init-docs.sh)

**Usage:**

```bash
# Verify what would be removed (safe, default mode)
./cleanup.sh --verify

# Apply cleanup (interactive, prompts for confirmation)
./cleanup.sh --apply

# CI/CD mode (non-interactive, for automated pipelines)
./cleanup.sh --ci

# Validate build artifacts (check if framework files leaked into build)
./cleanup.sh --validate-build
```

**Modes:**

| Mode | Description | Interactive | Exit Code |
|------|-------------|-------------|-----------|
| `--verify` | Show what would be removed (default, safe) | Yes | `1` if files found, `2` on error |
| `--apply` | Remove framework files with confirmation | Yes | `0` on success, `1` on abort, `2` on error |
| `--ci` | Remove files non-interactively | No | `0` on success, `2` on error |
| `--validate-build` | Check build artifacts for framework files | Yes | `0` if clean, `1` if files found, `2` on error |

**What Gets Removed:**

- `.CodeMaestro/` directory (all framework files: prompts, config, templates, knowledge-base)
- `CLAUDE.md` (framework developer guide)

**What Gets Preserved:**

- `docs/` directory (ALL user documentation)
  - specifications/
  - architecture/ (including task files with token tracking)
  - implementation/ (including handoffs, decision log, recovery checkpoints)
  - verification/
  - release/
  - knowledge-base/ (user-specific entries)
  - portfolio/
  - team/
- All project source code
- All project tests
- `.gitignore`, `README.md`, and other project files

**Exit Codes:**

- `0` - Success (cleanup applied, validation passed, or already clean)
- `1` - Files found (verify mode) or validation failed
- `2` - Error (invalid usage, permissions issue, etc.)

**Example Workflow:**

```bash
# Phase 5: Before final release

# Step 1: Verify what will be removed
./cleanup.sh --verify
# Output:
#   Files that would be removed:
#     - .CodeMaestro/
#     - CLAUDE.md

# Step 2: Apply cleanup (with confirmation)
./cleanup.sh --apply
# Output:
#   WARNING: This will permanently delete CodeMaestro framework files
#   Files to be removed:
#     - .CodeMaestro/
#     - CLAUDE.md
#   Continue? (yes/no): yes
#   Removing CodeMaestro framework...
#     ✓ Removed .CodeMaestro/
#     ✓ Removed CLAUDE.md
#   ✅ Cleanup complete

# Step 3: Validate build artifacts (optional)
./cleanup.sh --validate-build
# Output:
#   Checking build artifacts for framework files...
#   ✓ No framework files found in build artifacts
```

**CI/CD Integration:**

```yaml
# Example: .github/workflows/release.yml

- name: Remove framework files
  run: ./cleanup.sh --ci

- name: Validate build
  run: |
    npm run build  # or your build command
    ./cleanup.sh --validate-build
```

**When to Use:**

- **Phase 5 (Release)**: Always run `--verify` before final release approval
- **Production Builds**: Run `--ci` mode in automated build pipelines
- **Docker Images**: Run `--validate-build` after building images
- **Client Deliverables**: Apply cleanup before packaging for clients

**When NOT to Use:**

- During development (Phases 1-4)
- When preserving documentation workflow for future reference
- When archiving project with full development history

**Troubleshooting:**

If files are not removed:
```bash
# Check permissions
ls -la .CodeMaestro/
chmod -R u+w .CodeMaestro/

# Try again
./cleanup.sh --apply
```

If validation fails:
```bash
# Check which files leaked into build
find dist/ -name ".CodeMaestro" -o -name "CLAUDE.md"

# Update build process to exclude framework files
# Add to .dockerignore, .npmignore, etc.
```

**See Also:**
- [.CodeMaestro/config/cleanup-verification.md](.CodeMaestro/config/cleanup-verification.md) - Comprehensive cleanup guide
- [.CodeMaestro/prompts/05-master-control.md](.CodeMaestro/prompts/05-master-control.md) - Phase 5 workflow integration

---

## Advanced Commands

For Phase F advanced features (AI-powered estimation, performance benchmarking, ethics & compliance validation), see:

**[.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md)** - Phase F: Advanced Analytics & Compliance
- AI-powered task estimation (`/estimate suggest`, `/estimate track`, `/estimate analyze`)
- Performance baseline tracking (`/benchmark establish`, `/benchmark compare`, `/benchmark trend`)
- Ethics & compliance validation (`/ethics scan`, `/ethics privacy`, `/ethics accessibility`, `/ethics fairness`, `/ethics report`)

---

**Full documentation:** See [.CodeMaestro/docs/COMMANDS-CORE.md](.CodeMaestro/docs/COMMANDS-CORE.md) (this file), [.CodeMaestro/docs/COMMANDS-ADVANCED.md](.CodeMaestro/docs/COMMANDS-ADVANCED.md), and [.CodeMaestro/config/mcp-tools.md](.CodeMaestro/config/mcp-tools.md)
