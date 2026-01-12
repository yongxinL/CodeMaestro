# CodeMaestro

## Quick Reference

| Field | Value |
|-------|-------|
| **Version** | 1.0.0 |
| **Project** | [Set during Phase 1] |
| **Skill Tier** | [Beginner / Advanced / Ninja] |
| **Current Phase** | [Auto-detected] |
| **Active Role** | [Auto-loaded] |
| **Git Branch** | [Current] |

---

## What is CodeMaestro?

A **role-based state machine** that orchestrates software development through 5 phases:

1. **Requirements** → Product Manager transforms ideas into specifications
2. **Planning** → Software Architect creates actionable blueprints
3. **Implementation** → Senior Developer builds production code
4. **Verification** → QA Lead validates with evidence
5. **Release** → Release Manager coordinates delivery

**Each phase activates specific roles. Failures are learning opportunities. Everything is versioned.**

---

## Getting Started

### New Project
```bash
./init-docs.sh          # Initialize structure
git init && git checkout -b develop
# Start Phase 1 - CodeMaestro will guide you
```

### Existing Project
```bash
/status                 # See current state
/recover               # Restore context if lost
```

---

## Essential Commands

| Command | What It Does |
|---------|--------------|
| `/status` | Show current phase, progress, git state |
| `/next` | Load next pending task |
| `/recover` | Restore lost context |
| `/help` | Full command list |

**Full command reference:** `COMMANDS.md`

---

## How It Works

### Automatic Phase Detection

CodeMaestro checks your project state and activates the correct phase:

- No specification? → **Phase 1** (Requirements)
- No blueprint? → **Phase 2** (Planning)
- Pending tasks? → **Phase 3** (Implementation)
- No evidence? → **Phase 4** (Verification)
- Evidence exists? → **Phase 5** (Release)

### Role Transitions

```
═══════════════════════════════════════════════════════════
🎭 ROLE TRANSITION
─────────────────────────────────────────────────────────
   Activating: [Role Name]
   Phase: [N]: [Phase Name]
   Skill Tier: [Your Level] → [Adapted Behavior]
═══════════════════════════════════════════════════════════
```

---

## Key Locations

```
docs/
├── prompts/           # System workflows (AI loads these)
├── config/            # Git, roles, constraints
├── specifications/    # Requirements
├── architecture/      # Blueprints, tasks
├── implementation/    # Code, decisions, tracking
├── verification/      # Tests, evidence
├── knowledge-base/    # Project learning (NEW v1.0)
└── portfolio/         # Generated materials (NEW v1.0)
```

**Full structure:** `README.md`

---

## Session Management

### Phase Boundaries = New Session

At each phase completion, CodeMaestro provides:
- ✅ Handoff file with context
- ✅ "Start new session" recommendation  
- ✅ Model suggestion for next phase
- ✅ Action plan for startup

**Location:** `docs/implementation/.recovery-checkpoint.md`

---

## New in v1.0

- 🧠 **Knowledge Base** - Learn from failures/successes
- 📊 **Data Interpreter** - Auto-generate performance visuals
- ⚖️ **Ethics Validation** - Bias detection for all projects
- 🎯 **Domain Adaptation** - Mobile/Web/Cloud/AI specialized
- 📅 **Gantt Charts** - Visual timelines
- 🎨 **Portfolio Generator** - Professional docs on-demand
- ⚡ **50% Token Reduction** - Faster, more efficient

**Full feature list:** `SUMMARY.md`

---

## Git Integration

**Convention:** Standard git-flow with phase tags
**Details:** `config/git-commands.md`

**Quick Tags:**
- `v0.1.0-spec` → Specification locked
- `v0.2.0-plan` → Planning complete  
- `v0.3.0-impl` → Implementation done
- `v0.4.0-verify` → Verification passed
- `v1.0.0` → Production release

---

## Quality Gates

| Metric | Minimum | Blocking |
|--------|---------|----------|
| Test Coverage | 70% | Yes |
| Critical Security | 0 | Yes |
| High Security | 0 | Yes |
| AC Pass Rate | 100% | Yes |

**Full thresholds:** `config/thresholds.md`

---

## Help & Documentation

| Need | Look Here |
|------|-----------|
| Installation | `README.md` |
| All Commands | `COMMANDS.md` |
| Feature Overview | `SUMMARY.md` |
| Version Info | `VERSION.md` |
| File Locations | `REQUIRED-FILES.md` |
| Current Phase Details | `docs/prompts/0[N]-*.md` |

---

## Configuration Files

**Core System:** `docs/prompts/00-core.md` (AI loads first)

**Role Details:** `docs/config/roles/[role-name].md`
- product-manager.md
- software-architect.md
- senior-developer.md
- qa-lead.md
- release-manager.md
- data-interpreter.md (NEW)
- ethics-security-engineer.md

**Git Templates:** `docs/config/git-commands.md`

**Constraints:** `docs/config/constraints-reference.md`

---

## Skill Tiers

Set once in Phase 1, applies throughout:

- **Beginner:** Detailed explanations, step-by-step
- **Advanced:** Concise, assumes familiarity
- **Ninja:** Minimal guidance, maximum efficiency

---

## Support

**Something wrong?**
- Lost context? → `/recover`
- Not sure where you are? → `/status`
- Need to start over? → Check git tags, rollback if needed

**Need files?** See `REQUIRED-FILES.md` for complete file list

**Want updates?** See `FILE-SOURCING-GUIDE.md` for v1.0 changes

---

## Version

**CodeMaestro:** 1.0.0  
**Release:** 2026-01-01  
**Codename:** Phoenix

---

**🚀 Ready to build? Run `/status` to begin!**
