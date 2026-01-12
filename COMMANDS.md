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
Generate git commit for current state

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

**Full documentation in COMMANDS.md**
