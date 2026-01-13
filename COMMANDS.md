# CodeMaestro - Command Reference

**Quick Navigation:**
- **[COMMANDS-CORE.md](COMMANDS-CORE.md)** - Essential commands for daily workflow (Phases 1-5)
- **[COMMANDS-ADVANCED.md](COMMANDS-ADVANCED.md)** - Phase F: Advanced Analytics & Compliance

---

## Command Organization

To optimize token usage, CodeMaestro commands are split into two files:

### Core Commands (Load Always)
[COMMANDS-CORE.md](COMMANDS-CORE.md) contains essential commands used throughout all phases:
- Navigation (/status, /next, /phase, /tree)
- Role management (/role, /consult)
- Git operations (/commit, /checkpoint)
- Recovery (/recover, /snapshot)
- Knowledge base (/kb search, /kb add)
- Portfolio (/portfolio generate)
- Team collaboration (/team, /pr)
- MCP tools (/research, /lookup)
- Quality validation (/security scan, /validate)
- Code generation (/scaffold, /generate test, /generate ci-cd)

**Size:** ~400 lines | **Usage:** Load in Phases 1-5

### Advanced Commands (Load in Phase 4-5)
[COMMANDS-ADVANCED.md](COMMANDS-ADVANCED.md) contains Phase F analytics and compliance features:
- AI-powered estimation (/estimate suggest, /estimate track, /estimate analyze)
- Performance baselines (/benchmark establish, /benchmark compare, /benchmark trend)
- Ethics & compliance (/ethics scan, /ethics privacy, /ethics accessibility, /ethics fairness, /ethics report)

**Size:** ~250 lines | **Usage:** Load only in Phases 4-5 or when compliance required

---

## Quick Command Index

Below is a complete index. For detailed syntax and examples, see the specific command file.

## Navigation Commands

### `/status` → [CORE](COMMANDS-CORE.md#status)
Show current phase, role, task progress, git status

### `/next` → [CORE](COMMANDS-CORE.md#next)
Load and begin next pending task

### `/task T-X.X.X` → [CORE](COMMANDS-CORE.md#task-t-xxx)
Load specific task by ID

### `/phase N` → [CORE](COMMANDS-CORE.md#phase-n)
Jump to specific phase (requires justification)

### `/init-phase [N]` → [CORE](COMMANDS-CORE.md#init-phase-n)
Interactive phase initialization wizard with guided questions and validation

### `/tree` → [CORE](COMMANDS-CORE.md#tree)
Show task DAG with status indicators (text or interactive HTML visualization)

---

## Role Commands → [CORE](COMMANDS-CORE.md#role-commands)

### `/role` → [CORE](COMMANDS-CORE.md#role)
Show current active role and responsibilities

### `/roles` → [CORE](COMMANDS-CORE.md#roles)
List all roles for current phase

### `/consult [role1] [role2]` → [CORE](COMMANDS-CORE.md#consult-role1-role2)
Multi-role consultation

---

## Git Commands → [CORE](COMMANDS-CORE.md#git-commands)

### `/commit` → [CORE](COMMANDS-CORE.md#commit)
Generate git commit with auto-generation and safety confirmation

### `/checkpoint` → [CORE](COMMANDS-CORE.md#checkpoint)
Pause for human review, show git commands

### `/git-status` → [CORE](COMMANDS-CORE.md#git-status)
Detailed git status and history

### `/tag` → [CORE](COMMANDS-CORE.md#tag)
Show all project tags

### `/rollback [tag]` → [CORE](COMMANDS-CORE.md#rollback-tag)
Show rollback commands

---

## Recovery Commands → [CORE](COMMANDS-CORE.md#recovery-commands)

### `/recover` → [CORE](COMMANDS-CORE.md#recover)
Execute context recovery protocol

### `/snapshot` → [CORE](COMMANDS-CORE.md#snapshot)
Force save recovery checkpoint

### `/history` → [CORE](COMMANDS-CORE.md#history)
Show decision log tail

---

## Knowledge Base Commands → [CORE](COMMANDS-CORE.md#knowledge-base-commands-v10)

### `/kb search [query]` → [CORE](COMMANDS-CORE.md#kb-search-query)
Search knowledge base (project-specific or global) with filters

### `/kb export` → [CORE](COMMANDS-CORE.md#kb-export)
Export project KB entries to global KB with duplicate detection

### `/kb import [entry-id]` → [CORE](COMMANDS-CORE.md#kb-import-entry-id)
Import entry from global KB to project

### `/kb sync` → [CORE](COMMANDS-CORE.md#kb-sync)
Synchronize project KB with global KB (two-way or one-way)

### `/kb stats` → [CORE](COMMANDS-CORE.md#kb-stats)
View knowledge base statistics

### `/kb add failure` → [CORE](COMMANDS-CORE.md#kb-add-failure)
Document failure pattern

### `/kb add pattern` → [CORE](COMMANDS-CORE.md#kb-add-pattern)
Document success pattern

### `/kb list` → [CORE](COMMANDS-CORE.md#kb-list)
List all KB entries

---

## Portfolio Commands → [CORE](COMMANDS-CORE.md#portfolio-commands-v10)

### `/portfolio generate` → [CORE](COMMANDS-CORE.md#portfolio-generate)
Generate portfolio materials

### `/portfolio preview` → [CORE](COMMANDS-CORE.md#portfolio-preview)
Preview portfolio content

---

## Team Commands → [CORE](COMMANDS-CORE.md#team-commands)

### `/team` → [CORE](COMMANDS-CORE.md#team)
Show team mode status

### `/pr` → [CORE](COMMANDS-CORE.md#pr)
Generate pull request template

### `/review` → [CORE](COMMANDS-CORE.md#review)
Start code review workflow

### `/assign [task] [member]` → [CORE](COMMANDS-CORE.md#assign-task-member)
Assign task to team member

---

## MCP Tool Commands → [CORE](COMMANDS-CORE.md#mcp-tool-commands-v10)

### `/research [topic]` → [CORE](COMMANDS-CORE.md#research-topic)
Combined WebSearch + Context7 research

### `/lookup [library]` → [CORE](COMMANDS-CORE.md#lookup-library)
Get library documentation via Context7

### `/validate api [library] [method]` → [CORE](COMMANDS-CORE.md#validate-api-library-method)
Confirm API exists via Context7

### `/example [library] [feature]` → [CORE](COMMANDS-CORE.md#example-library-feature)
Get code examples from Context7

### `/security check [library]` → [CORE](COMMANDS-CORE.md#security-check-library)
Research vulnerabilities via WebSearch

### `/compliance [standard]` → [CORE](COMMANDS-CORE.md#compliance-standard)
Look up compliance requirements via WebSearch

### `/sources` → [CORE](COMMANDS-CORE.md#sources)
List all MCP tool sources used in project

---

## Quality & Validation Commands → [CORE](COMMANDS-CORE.md#quality--validation-commands-v11)

### `/security scan` → [CORE](COMMANDS-CORE.md#security-scan)
Run automated vulnerability scan on dependencies (npm, pip, cargo, etc.)

### `/validate quality` → [CORE](COMMANDS-CORE.md#validate-quality)
Run incremental quality gate checks (coverage, security, acceptance criteria)

### `/validate tests` → [CORE](COMMANDS-CORE.md#validate-tests)
Check test coverage only

### `/validate ac` → [CORE](COMMANDS-CORE.md#validate-ac)
Check acceptance criteria pass rate only

---

## Generation & Automation Commands → [CORE](COMMANDS-CORE.md#generation--automation-commands-v11)

### `/scaffold [domain]` → [CORE](COMMANDS-CORE.md#scaffold-domain)
Generate domain-specific project structure (mobile, web, cloud, ai) with best practices

### `/generate test [AC-ID]` → [CORE](COMMANDS-CORE.md#generate-test-ac-id)
Generate test stubs from acceptance criteria with Given/When/Then/And structure

### `/generate ci-cd` → [CORE](COMMANDS-CORE.md#generate-ci-cd)
Generate CI/CD pipeline configurations (GitHub Actions, GitLab CI, CircleCI, etc.)

---

## Phase F: Advanced Analytics & Compliance → [ADVANCED](COMMANDS-ADVANCED.md)

**For detailed Phase F commands, see [COMMANDS-ADVANCED.md](COMMANDS-ADVANCED.md)**

Phase F commands are loaded in Phase 4-5 or when advanced analytics and compliance features are needed.

### AI-Powered Estimation

- `/estimate suggest` → [ADVANCED](COMMANDS-ADVANCED.md#estimate-suggest) - Get AI-powered task effort estimate
- `/estimate track` → [ADVANCED](COMMANDS-ADVANCED.md#estimate-track) - Record actual effort for learning
- `/estimate analyze` → [ADVANCED](COMMANDS-ADVANCED.md#estimate-analyze) - Analyze estimation accuracy

### Performance Baseline Tracking

- `/benchmark establish` → [ADVANCED](COMMANDS-ADVANCED.md#benchmark-establish) - Establish performance baselines
- `/benchmark compare` → [ADVANCED](COMMANDS-ADVANCED.md#benchmark-compare) - Compare against baseline (regression detection)
- `/benchmark trend` → [ADVANCED](COMMANDS-ADVANCED.md#benchmark-trend) - View performance trends over time

### Ethics & Compliance Validation

- `/ethics scan` → [ADVANCED](COMMANDS-ADVANCED.md#ethics-scan) - Comprehensive ethics validation
- `/ethics privacy` → [ADVANCED](COMMANDS-ADVANCED.md#ethics-privacy) - GDPR/CCPA/HIPAA compliance
- `/ethics accessibility` → [ADVANCED](COMMANDS-ADVANCED.md#ethics-accessibility) - WCAG validation
- `/ethics fairness` → [ADVANCED](COMMANDS-ADVANCED.md#ethics-fairness) - ML algorithmic bias detection
- `/ethics report` → [ADVANCED](COMMANDS-ADVANCED.md#ethics-report) - Generate compliance report

---

**Full documentation:**
- [COMMANDS-CORE.md](COMMANDS-CORE.md) - Daily workflow commands
- [COMMANDS-ADVANCED.md](COMMANDS-ADVANCED.md) - Phase F analytics & compliance
- [docs/config/mcp-tools.md](docs/config/mcp-tools.md) - MCP tool integration
