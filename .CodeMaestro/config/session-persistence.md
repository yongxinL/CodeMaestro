# Session Persistence

> **Purpose:** Automatic session state save/restore for seamless continuation.
> **Based on:** [everything-claude-code](https://github.com/affaan-m/everything-claude-code) memory-persistence patterns

---

## Overview

Session persistence ensures work continuity across multiple sessions through:
1. **Automatic state saving** at key checkpoints
2. **Structured recovery files** for quick resume
3. **Token-aware session management**
4. **Seamless handoffs** between sessions

---

## Session State Structure

### State File Location

```
docs/implementation/.recovery-checkpoint.md  # Primary recovery file
docs/implementation/.session-state.json      # Machine-readable state (optional)
```

### Recovery Checkpoint Contents

```markdown
# Recovery Checkpoint

## Session Info
| Field | Value |
|-------|-------|
| Last Updated | [timestamp] |
| Phase | [X] - [Name] |
| Role | [Active Role] |
| Skill Tier | [Tier] |
| Session Type | [Continuation / Phase Transition] |

## Current State
- **Active Task:** T-X.X.X - [description]
- **Task Progress:** [X%]
- **Git Branch:** [branch]
- **Git Commit:** [hash]

## Token Usage (Last Session)
- Used: [X]K / [Y]K available
- Efficiency: [rating]

## Lazy Load Map
| Priority | Artifact | Path |
|----------|----------|------|
| 1 | Current task | docs/architecture/tasks/T-X.X.X.md |
| 2 | Blueprint | docs/architecture/blueprint.md |
| 3 | Decision log | docs/implementation/decision-log.md |

## Next Action
[Specific next action to take]

## Resume Command
"Continue from Phase [X]. Resume task T-X.X.X: [description]."
```

---

## Session Lifecycle

### On Session Start

```
┌─────────────────────────────────────────────────────────────┐
│ 🔄 SESSION START                                            │
├─────────────────────────────────────────────────────────────┤
│ 1. Check for .recovery-checkpoint.md                        │
│    └─ If exists: Load phase, role, task, context            │
│    └─ If missing: Fresh start, ask for project info         │
│                                                             │
│ 2. Announce recovery:                                       │
│    "Resuming from Phase [X]. Last task: T-X.X.X.            │
│     Continue with [next action]?"                           │
│                                                             │
│ 3. Load relevant files from lazy-load map                   │
│                                                             │
│ 4. Confirm with user before proceeding                      │
└─────────────────────────────────────────────────────────────┘
```

### During Session

**Auto-save triggers:**
- Task completion
- Phase transition
- Every 30 minutes of active work
- Before large operations (>20K tokens estimated)
- At 80% context usage

### On Session End

```
┌─────────────────────────────────────────────────────────────┐
│ 📊 SESSION END                                              │
├─────────────────────────────────────────────────────────────┤
│ 1. Update .recovery-checkpoint.md                           │
│                                                             │
│ 2. Generate session end summary:                            │
│    - Completed items                                        │
│    - In-progress items                                      │
│    - Token usage                                            │
│    - Files modified                                         │
│    - Next action                                            │
│    - Resume prompt                                          │
│                                                             │
│ 3. Capture pending learnings (instincts)                    │
│                                                             │
│ 4. Note any uncommitted changes                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Update Frequency

| Trigger | Action |
|---------|--------|
| **Task completion** | Update checkpoint |
| **Phase transition** | Full handoff + checkpoint |
| **30-minute interval** | Lightweight checkpoint |
| **>80% context** | Checkpoint + session end warning |
| **>90% context** | Forced session end summary |
| **User departure** | Full session end summary |

---

## Handoff vs Checkpoint

| Aspect | Checkpoint | Handoff |
|--------|------------|---------|
| **When** | Mid-session | Phase/session end |
| **Size** | Minimal | Comprehensive |
| **Purpose** | Quick save | Full context transfer |
| **Includes** | State only | State + context + recommendations |

---

## Token-Aware Management

### Budget Monitoring

```
Session Budget: 800K tokens (80% of 1M Sonnet)

Utilization Alerts:
├── <60%:  ✅ Efficient - continue
├── 60-80%: ⚠️ Moderate - monitor
├── 80-90%: 🟠 High - checkpoint soon
└── >90%:  🔴 Critical - checkpoint now
```

### Auto-Actions by Threshold

| Threshold | Automatic Action |
|-----------|------------------|
| 60% | Log usage to checkpoint |
| 80% | Suggest session break |
| 85% | Update checkpoint |
| 90% | Generate session end summary |
| 95% | Force minimal summary |

---

## Recovery Protocol

If session interrupted unexpectedly:

### Step 1: Check Checkpoint
```
Check: docs/implementation/.recovery-checkpoint.md
```

### Step 2: Load State
```
Load: Phase [X], Role [R], Task T-X.X.X
```

### Step 3: Announce Recovery
```
"Recovered from checkpoint dated [date].
 Resuming: Phase [X] - [Name]
 Last task: T-X.X.X - [description]
 Next action: [action]
 
 Files to load:
 1. [file1] - [why]
 2. [file2] - [why]
 
 Continue?"
```

### Step 4: Verify Integrity
- Check git state matches checkpoint
- Verify files exist
- Confirm task not already complete

---

## Natural Language Triggers

| Say this... | Action |
|-------------|--------|
| "Save my progress" | Update checkpoint |
| "Where were we?" | Load and display checkpoint |
| "Resume" | Execute recovery protocol |
| "I'm back" | Check for checkpoint, offer resume |
| "Start fresh" | Ignore checkpoint, begin anew |

---

## Files

| File | Purpose |
|------|---------|
| `.recovery-checkpoint.md` | Human-readable state |
| `.session-state.json` | Machine-readable (optional) |
| `decision-log.md` | Critical decisions |
| `handoffs/phase-X-handoff.md` | Phase transition records |

---

## Version

| Component | Version |
|-----------|---------|
| Session Persistence | 1.0.0 |
| Last Updated | 2026-01-27 |
