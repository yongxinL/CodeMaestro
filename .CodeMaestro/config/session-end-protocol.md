# Session End Protocol

> **Purpose:** Provide structured summary when ending a session/conversation.
> **Trigger:** Context exhaustion (>80%), user departure, phase completion, long break.

---

## When to Generate

| Trigger | Action |
|---------|--------|
| Context usage >80% | Generate summary + create checkpoint |
| User says "done for now" / "ending session" | Generate full summary |
| Phase completion | Generate handoff + summary |
| Before long break (>24 hours) | Generate summary with resume prompt |

---

## Session End Summary Format

```
═══════════════════════════════════════════════════════════════
📊 SESSION END SUMMARY
═══════════════════════════════════════════════════════════════

## 📍 Current State
- **Phase:** [X] - [Phase Name]
- **Role:** [Active Role]
- **Skill Tier:** [Tier]
- **Session Duration:** [X hours Y minutes]

## ✅ Completed This Session
- [Task/item 1] ✓
- [Task/item 2] ✓
- [Task/item 3] ✓

## 🔄 In Progress
- [Task T-X.X.X]: [Description] - [X%] complete
  - Done: [what's done]
  - Remaining: [what's left]

## ⚠️ Blockers (if any)
- [Blocker 1]: [How to resolve]

───────────────────────────────────────────────────────────────
## 📈 Token Usage
───────────────────────────────────────────────────────────────
- **Used:** [X]K tokens ([Y%] of session budget)
- **Remaining:** [Z]K tokens
- **Efficiency:** [Excellent/Good/Moderate/High usage]

## 📁 Files Modified
| File | Change |
|------|--------|
| `src/auth/login.ts` | Added validation |
| `src/types/user.ts` | New User interface |

## 🔀 Git State
- **Branch:** [branch name]
- **Last Commit:** [hash] - [message]
- **Uncommitted Changes:** [Yes/No]

───────────────────────────────────────────────────────────────
## 📚 Continuous Learning
───────────────────────────────────────────────────────────────

**New Instincts Captured:** [N]
- [instinct-id] (0.X): "[brief description]"
- [instinct-id] (0.X): "[brief description]"

**Reinforced Instincts:** [N]
- [instinct-id]: confidence [old] → [new]

**Decayed Instincts:** [N] (if any unused >7 days)
- [instinct-id]: confidence [old] → [new]

**Files Created:**
- `docs/knowledge-base/instincts/personal/[instinct-id].md`

───────────────────────────────────────────────────────────────
## 🎯 Suggested Next Actions
───────────────────────────────────────────────────────────────

1. **Primary:** [Next task with specific action]
   - File: `[path]`
   - Action: [what to do]

2. **Alternative:** [If blocked on primary]
   - [Alternative action]

───────────────────────────────────────────────────────────────
## 💬 Resume Prompt
───────────────────────────────────────────────────────────────

Copy this to start your next session:

┌─────────────────────────────────────────────────────────────┐
│ "Continue from Phase [X] ([Name]).                          │
│  I was working on [task T-X.X.X]: [description].            │
│  Resume with: [specific next action].                       │
│  Key context: [1-2 critical points]."                       │
└─────────────────────────────────────────────────────────────┘

## 📄 Recovery Checkpoint
Updated: `docs/implementation/.recovery-checkpoint.md`

═══════════════════════════════════════════════════════════════
```

---

## Natural Language Triggers

| Say this... | Action |
|-------------|--------|
| "I'm done for now" | Generate session end summary |
| "Ending session" | Generate session end summary |
| "Generate handoff" | Generate handoff message |
| "What should I copy for next time?" | Generate resume prompt only |
| "Save my progress" | Update checkpoint + brief summary |

---

## Session End Checklist

Before generating summary, ensure:

- [ ] Recovery checkpoint updated
- [ ] Uncommitted changes noted
- [ ] Next action clearly identified
- [ ] Key context captured
- [ ] Token usage recorded
- [ ] **Continuous Learning captured:**
  - [ ] Session reviewed for learnable patterns
  - [ ] New instinct files created (if any)
  - [ ] Existing instincts reinforced/decayed
  - [ ] Instinct summary included in output

---

## Automatic Triggers

### Token Threshold Alerts

| Usage | Alert | Action |
|-------|-------|--------|
| >60% | ⚠️ Moderate | Monitor |
| >80% | 🟠 High | Suggest checkpoint |
| >90% | 🔴 Critical | Auto-generate summary |

### Phase Completion

At phase end, auto-generate:
1. Phase handoff message
2. Session end summary
3. Recovery checkpoint update

---

## Resume Protocol

When starting a new session:

1. **User provides resume prompt** (from previous session end)
2. **OR** System detects checkpoint: "Found recovery checkpoint from [date]. Resume from Phase [X]?"
3. **Load context**: Phase prompt + relevant files from lazy-load map
4. **Confirm state**: "Resuming [task]. Last action was [X]. Continue with [Y]?"

---

## Version

| Component | Version |
|-----------|---------|
| Session End Protocol | 1.0.0 |
| Last Updated | 2026-01-27 |
