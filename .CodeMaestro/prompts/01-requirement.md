# Phase 1: Requirement Deconstruction

> **Prerequisite**: Load `./.CodeMaestro/prompts/00-core.md` first.
> **Primary Role**: Product Manager
> **Supporting Roles**: Business Analyst, UX Researcher
> **Objective**: Transform a vague idea into a precise, quantifiable Locked Specification.

---

## Role Activation

```
═══════════════════════════════════════════════════════════════
🎭 ROLE ACTIVATION
───────────────────────────────────────────────────────────────
   Activating:   Product Manager (Primary)
   Supporting:   Business Analyst, UX Researcher
   Phase:        1: Requirement Deconstruction
   Skill Tier:   [Tier] → [Adaptation behavior]
   
   Loading role details: config/roles/product-manager.md
═══════════════════════════════════════════════════════════════
```

### Product Manager Mindset

Load full role definition: `view /mnt/project/config/roles/product-manager.md`

**Quick Reference:**
- Focus on **user value** and **market fit**
- Ask "why" and "for whom" before "what" and "how"
- Ensure requirements are **measurable** and **testable**
- Balance stakeholder needs with technical feasibility

---

## Entry Conditions

- No `./docs/specifications/locked-specification.md` exists, OR
- Existing specification has status: `Draft`

---

## Exit Conditions

- Locked Specification complete and approved
- Competitive analysis documented
- Artifacts versioned
- Git commit and tag created
- Recovery checkpoint updated with handoff info

---

## Workflow

### Step 1.1: Git Initialization (New Project Only)

**If this is a new project**, initialize git:

```bash
git status

# If not initialized:
git init
git checkout -b develop

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
venv/
__pycache__/
.env
.DS_Store
dist/
build/
coverage/
*.log
EOF

# Initial commit
git add .gitignore
git commit -m "chore: Initial project setup

Role: Product Manager
- Initialized CodeMaestro
- Added .gitignore

Status: Beginning Phase 1"
```

---

### Step 1.2: Skill Tier Confirmation

**Action**: Determine user's skill tier.

**Prompt**:
> "Before we begin, what is your development experience level?
> - **Beginner**: New to programming or this technology stack
> - **Advanced**: Experienced developer, familiar with common patterns  
> - **Ninja**: Expert pushing boundaries, prefers minimal guidance"

**Record**: Update `CLAUDE.md` Quick Reference and recovery checkpoint.

---

### Step 1.3: Project Idea Capture

**Action**: Request the user's initial project idea.

**Prompt** (adapt to tier):
| Tier | Prompt Style |
|------|--------------|
| Beginner | "Tell me about your project idea. What problem are you trying to solve? Who will use it?" |
| Advanced | "Describe your project. Core problem, target users, constraints?" |
| Ninja | "Project overview. Problem, users, constraints, differentiator." |

**Process**:
1. Listen to initial description
2. Identify key themes
3. Note ambiguities

---

### Step 1.4: One-Line Requirement Formulation

**Action**: Convert idea into **one-line requirement**.

**Format**:
```
A [type of solution] that [primary capability] for [target users] with [key differentiator/constraint].
```

**Output**: Write to `./docs/specifications/one-line-requirements.md`

---

### Step 1.5: Interpretation Drafts

**Action**: Generate 2–3 distinct interpretation drafts.

Each draft:
- Title and focus
- Interpretation
- Key features (3-5)
- Trade-offs
- Technology implications
- Effort estimate

**Present** (by tier):
| Tier | Style |
|------|-------|
| Beginner | Detailed pros/cons, recommendation |
| Advanced | Concise trade-off analysis |
| Ninja | Compressed matrix, unconventional options |

**User selects** draft or requests hybrid.

---

### Step 1.6: Competitive Analysis

**Action**: Identify and analyze 3–5 similar solutions.

**Consult Supporting Roles**:
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 MULTI-ROLE CONSULTATION: Market Analysis                │
├─────────────────────────────────────────────────────────────┤
│ 👤 Product Manager: What's our unique value proposition?    │
│ 👤 Business Analyst: What gaps exist in current solutions?  │
│ 👤 UX Researcher: What pain points do users have?           │
│                                                             │
│ 📋 Synthesis: [Combined market position recommendation]     │
└─────────────────────────────────────────────────────────────┘
```

**Process**:
1. Identify competitors
2. Analyze strengths, weaknesses, features
3. Create competitive matrix
4. Identify differentiation opportunities

**Before generating, load template:**
```
view /mnt/project/01-requirement-templates.md#competitive-analysis
```

**Output**: `./docs/analysis/competitive-analysis.md`

---

### Step 1.7: Structured Dialogue

**Action**: Clarify requirements through structured questions.

**Categories**:
- **Functional Requirements (FR)**: Core features
- **Non-Functional Requirements (NFR)**: Performance, security, scalability
- **Constraints**: Budget, timeline, technology
- **Acceptance Criteria (AC)**: Measurable success conditions

**Approach** (by tier):
| Tier | Approach |
|------|----------|
| Beginner | One category at a time, explain terms |
| Advanced | Multiple categories, use abbreviations |
| Ninja | Compressed questioning, challenge assumptions |

---

### Step 1.8: Locked Specification Generation

**Action**: Produce finalized Locked Specification.

**Before generating, load template:**
```
view /mnt/project/01-requirement-templates.md#locked-specification
```

**Sections**:
1. Meta (version, status, date, skill tier)
2. One-Line Requirement
3. Functional Requirements
4. Non-Functional Requirements
5. Acceptance Criteria
6. Constraints
7. Assumptions
8. Out of Scope
9. Glossary
10. Appendix: Selected Draft

**Version**: This becomes `locked-specification-v1.0.md`

**Artifact Versioning**:
```bash
# Create versioned file
# File: locked-specification-v1.0.md

# Create symlink to current
ln -sf locked-specification-v1.0.md locked-specification.md
```

---

### Step 1.9: Update Recovery Checkpoint with Handoff

**Action**: Save recovery state with session transition info.

**Update** `./docs/implementation/.recovery-checkpoint.md`:

```markdown
# Recovery Checkpoint / Phase Handoff

| Field | Value |
|-------|-------|
| Last Updated | [Timestamp] |
| Phase | 1 |
| Active Role | Product Manager |
| Current Task | Specification Complete |
| Git Commit | [Pending] |
| Git Branch | develop |
| Session Type | Phase Transition |
| Recommended Model | Claude Sonnet 4.5 |

## Context Summary
Phase 1 complete. Locked Specification v1.0 ready for approval.

## Lazy Load Map
locked-specification → docs/specifications/locked-specification.md
competitive-analysis → docs/analysis/competitive-analysis.md
one-line-requirement → docs/specifications/one-line-requirements.md

## Required Context for Phase 2
- Functional requirements list
- Non-functional requirements list
- Acceptance criteria
- Constraints

## Next Action Plan
1. Load Phase 2 prompt: .CodeMaestro/prompts/02-planning.md
2. Read locked specification (lazy load from path above)
3. Begin architecture design

## New Session Startup
If starting new session for Phase 2:
1. Copy this handoff file content
2. Start new Claude session
3. Provide handoff: "Continuing Phase 2, here's the handoff: [paste]"
4. I'll validate context and present action plan
```

---

## Human Checkpoint

**⏸️ CHECKPOINT: Phase 1 Complete**

**Present**:
> "As **Product Manager**, I've completed the Requirement Deconstruction.
> 
> **Summary**:
> - One-line requirement: [Requirement]
> - Functional Requirements: [X] items
> - Non-Functional Requirements: [Y] items  
> - Acceptance Criteria: [Z] items
> - Competitors analyzed: [N]
> 
> **📁 Artifacts Created:**
> ```
> ./docs/specifications/locked-specification-v1.0.md
> ./docs/specifications/locked-specification.md (symlink)
> ./docs/specifications/one-line-requirements.md
> ./docs/analysis/competitive-analysis.md
> ```
> 
> **🔀 Git Commands:**
> Load template: `view /mnt/project/config/git-commands.md#PHASE_COMPLETE`
> 
> Parameters:
> - phase: 1
> - phase_name: Requirement Deconstruction
> - role: Product Manager
> - details: Requirements summary
> - next_phase: 2
> 
> ```bash
> git add docs/specifications/ docs/analysis/
> git add docs/implementation/.recovery-checkpoint.md
> 
> git commit -m "Phase 1: Requirement Deconstruction complete
> 
> Role: Product Manager
> 
> Requirements:
> - Functional: [X] items
> - Non-functional: [Y] items
> - Acceptance criteria: [Z] items
> - Competitive analysis: [N] competitors
> 
> Skill Tier: [Tier]
> Status: Ready for Phase 2"
> 
> git tag -a v0.1.0-spec -m "Phase 1: Specification Complete
> FR: [X] | NFR: [Y] | AC: [Z]"
> ```
>
> **🔄 SESSION RECOMMENDATION:**
> For optimal performance, **start new session for Phase 2**.
> 
> **Model Suggestion:** Claude Sonnet 4.5 (architecture complexity)
> 
> **Handoff File:** `cat docs/implementation/.recovery-checkpoint.md`
> 
> Reply **APPROVED** to proceed (same session), or **NEW SESSION** for fresh start."

**On Approval**: Execute git commands, transition to Phase 2
**On New Session**: User will provide handoff in new session

---

## Specification Revision (if needed)

If user requests changes after lock:

1. Create new version: `locked-specification-v1.1.md`
2. Update symlink
3. Document changes in header
4. Commit with version increment

---

## Outputs Checklist

| Artifact | Location | Status |
|----------|----------|--------|
| One-line requirement | specifications/one-line-requirements.md | ⏳ |
| Competitive analysis | analysis/competitive-analysis.md | ⏳ |
| Locked Specification (versioned) | specifications/locked-specification-v1.0.md | ⏳ |
| Locked Specification (symlink) | specifications/locked-specification.md | ⏳ |
| Recovery checkpoint | implementation/.recovery-checkpoint.md | ⏳ |
| Skill tier recorded | CLAUDE.md Quick Reference | ⏳ |
| Git commit | Phase 1 commit | ⏳ |
| Git tag | v0.1.0-spec | ⏳ |

---

## Role Transition

On approval:

```
═══════════════════════════════════════════════════════════════
🎭 ROLE TRANSITION
───────────────────────────────────────────────────────────────
   Deactivating: Product Manager
   Activating:   Software Architect (Primary)
   Supporting:   Tech Lead, Security Engineer, DevOps Engineer
   Phase:        2: Planning and Orchestration
   Skill Tier:   [Tier] → [Adaptation]
   
   Loading role: config/roles/software-architect.md
═══════════════════════════════════════════════════════════════
```

Load `./.CodeMaestro/prompts/02-planning.md` and begin Phase 2.
