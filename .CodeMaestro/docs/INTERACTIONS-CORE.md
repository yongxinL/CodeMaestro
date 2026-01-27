# CodeMaestro - Core Interactions Reference

**Essential interactions for daily development workflow (Phases 1-5)**

For advanced analytics and compliance interactions, see [INTERACTIONS-ADVANCED.md](INTERACTIONS-ADVANCED.md)

---

## How to Interact

Use natural language to communicate with CodeMaestro. Simply describe what you want - no special syntax required.

---

## Navigation & Status

### Check Current Status
Show current phase, role, task progress, and git status.

**Say:** "What's my current status?" / "Where am I?" / "Show progress"

**Output includes:**
- Current phase and role
- Active task with progress
- Git branch and status
- Token usage

---

### Start Next Task
Load and begin the next pending task.

**Say:** "What should I work on next?" / "Next task" / "Continue work"

**Output includes:**
- Task details and requirements
- Estimated tokens
- Dependencies
- Relevant files loaded

---

### Load Specific Task
Load a task by its ID.

**Say:** "Load task T-2.1.3" / "Work on T-2.1.3" / "Start task T-2.1.3"

---

### Change Phase
Move to a different phase (requires justification for skipping).

**Say:** "Move to Phase 3" / "Start Phase 2" / "Go to Planning phase"

**Note:** Phase transitions trigger:
- Handoff generation
- Recovery checkpoint update
- Role change announcement

---

### Show Task Dependencies
Display the task DAG (Directed Acyclic Graph) with status indicators.

**Say:** "Show task dependencies" / "Show task tree" / "What depends on what?"

**Options:**
- "Show visual task tree" - HTML visualization
- "Show critical path" - Highlight blockers
- "Show pending tasks only"

---

## Token & Budget Management

### Check Token Budget
View current session token usage and remaining capacity.

**Say:** "How much context do I have left?" / "Check budget" / "Token status"

**Output includes:**
- Used: X tokens (Y%)
- Remaining: Z tokens
- Forecast for remaining tasks
- Recommendation (continue/checkpoint)

**Alert thresholds:**
- <60%: ✅ Efficient
- 60-80%: ⚠️ Moderate
- >80%: 🟠 High - checkpoint soon
- >90%: 🔴 Critical - checkpoint now

---

### Estimate Task Tokens
Get token estimate for a specific task or milestone.

**Say:** "How many tokens for T-2.1.1?" / "Estimate task T-2.1.1" / "Token estimate for milestone 2"

**Output includes:**
- Estimated tokens by activity (code, tests, docs)
- Complexity multipliers
- Session impact forecast

---

### Check Estimation Accuracy
Analyze variance between estimates and actuals.

**Say:** "How accurate were our estimates?" / "Variance analysis" / "Estimation accuracy"

**Output includes:**
- Overall variance percentage
- Breakdown by milestone/phase
- Trends and recommendations

---

## Session Management

### Generate Handoff
Create a comprehensive handoff message for session transitions.

**Say:** "Generate handoff" / "Session handoff" / "Prepare for next session"

**Output includes:**
- What was accomplished
- Current state
- Next phase preparation
- Critical context to preserve
- Files to load first
- Resume instructions

---

### Save Progress
Update recovery checkpoint without generating full summary.

**Say:** "Save my progress" / "Update checkpoint" / "Snapshot current state"

---

### End Session
Generate structured session end summary.

**Say:** "I'm done for now" / "Ending session" / "Generate session summary"

**Output includes:**
- Completed items
- In-progress items with %
- Token usage
- Files modified
- Next action
- Resume prompt to copy

---

### Resume Previous Work
Recover from last checkpoint.

**Say:** "Where were we?" / "Resume" / "Continue from last session"

**Process:**
1. Load recovery checkpoint
2. Display last state
3. Confirm next action
4. Load relevant files

---

### Show Decision History
View the decision log.

**Say:** "Show decision history" / "What decisions were made?" / "Decision log"

---

## Knowledge Base

### Search Knowledge Base
Find patterns, failures, or decisions.

**Say:** "Search knowledge base for authentication" / "Find patterns for API design" / "Any failures related to caching?"

**Filters:**
- "Search KB for patterns" - Only patterns
- "Search KB for failures" - Only failures
- "Search global KB" - Cross-project search

---

### Save Pattern
Document a successful approach.

**Say:** "Save this pattern" / "Add to knowledge base" / "Remember this approach"

**Captured:**
- Pattern description
- Context and phase
- Example code/solution
- When to use

---

### Document Failure
Record a failure for future reference.

**Say:** "Document this failure" / "Save failure pattern" / "Record this issue"

**Captured:**
- What went wrong
- Root cause
- Resolution
- Prevention steps

---

### Show Knowledge Base
List all KB entries.

**Say:** "Show knowledge base" / "List KB entries" / "What have we learned?"

---

## Code & Git

### Generate Commit
Create a commit message for current changes.

**Say:** "Generate a commit for my changes" / "Commit my work" / "Create commit"

**Options:**
- "Preview commit only" - Show without executing
- "Auto commit" - Generate and execute with confirmation
- "Edit commit" - Open editor before committing

**Commit format includes:**
- Type (feat/fix/docs/refactor/test/chore)
- Scope
- Description
- Phase/role metadata
- Task reference

---

### Check Git Status
View detailed git status.

**Say:** "What changed?" / "Git status" / "Show changes"

---

### Create Checkpoint
Pause for human review with git state capture.

**Say:** "Checkpoint my work" / "Pause for review" / "Create review point"

---

### Show Tags
View all project version tags.

**Say:** "Show tags" / "Version history" / "What versions exist?"

---

## Verification & Quality

### Verify Changes
Run automated verification loop (6 phases).

**Say:** "Verify my changes" / "Run quality checks" / "Check everything"

**Phases:**
1. Build - Compile without errors
2. Types - Type safety check
3. Lint - Code style
4. Tests - Coverage ≥70%
5. Security - Vulnerability scan
6. Diff - Change review

**Quick options:**
- "Quick check" - Build, Types, Lint only
- "Security scan" - Security only
- "Run tests" - Tests only

---

### Validate Quality Gates
Check specific quality metrics.

**Say:** "Check test coverage" / "Validate quality gates" / "Security status"

---

## Planning & Architecture

### Plan Implementation
Create detailed implementation plan for a feature.

**Say:** "Plan the implementation of user login" / "How should I implement [feature]?"

**Uses:** Planner subagent
**Output:** Step-by-step plan with files, risks, testing strategy

---

### Architecture Consultation
Get help with system design decisions.

**Say:** "Help me decide between REST and GraphQL" / "Architecture advice for [topic]"

**Uses:** Architect subagent
**Output:** Options analysis, recommendation, ADR

---

### Review Code
Get code review feedback.

**Say:** "Review this code" / "Check this file for issues" / "Code review"

**Uses:** Code-reviewer subagent
**Output:** Score, issues by severity, recommendations

---

### Generate Tests
Create test stubs from acceptance criteria.

**Say:** "Generate tests for AC-1.2" / "Create test stubs" / "Make tests for [feature]"

**Output:** Test file with structure matching ACs

---

## Research & Documentation

### Research Topic
Combined web search and documentation lookup.

**Say:** "Research [topic]" / "Look up [library] documentation" / "What's the latest on [technology]?"

---

### Validate API
Confirm an API exists and how to use it.

**Say:** "Does [library] have [method]?" / "Validate [library] API"

---

### Get Examples
Find code examples for a library feature.

**Say:** "Show examples of [library] [feature]" / "How do I use [library]?"

---

## Portfolio & Team (Phase 4-5)

### Generate Portfolio
Create portfolio materials from project.

**Say:** "Generate portfolio" / "Create case study" / "Portfolio materials"

---

### Create Pull Request
Generate PR template.

**Say:** "Create PR" / "Pull request template" / "Prepare for merge"

---

### Request Review
Start code review workflow.

**Say:** "Request code review" / "Need review" / "Ready for review"

---

## Natural Language Tips

### Be Specific
- ✅ "How many tokens for task T-2.1.1?"
- ❌ "Tokens?"

### Describe Intent
- ✅ "I want to search the knowledge base for authentication patterns"
- ❌ "KB auth"

### Ask Questions
- ✅ "What should I do next?"
- ✅ "How do I verify my changes?"
- ✅ "Can you review this code?"

### Use Context
- ✅ "Generate commit for the changes I just made"
- ✅ "Save this pattern we just discovered"

---

## Version

| Component | Version |
|-----------|---------|
| Interactions Reference | 1.1.0 |
| Natural Language | 1.0.0 |
| Last Updated | 2026-01-27 |
