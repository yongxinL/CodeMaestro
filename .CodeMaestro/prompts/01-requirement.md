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
   
   Loading role details: agents/product-manager.md
═══════════════════════════════════════════════════════════════
```

### Product Manager Mindset

Load full role definition: `view /mnt/project/agents/product-manager.md`

**Quick Reference:**
- Focus on **user value** and **market fit**
- Ask "why" and "for whom" before "what" and "how"
- Ensure requirements are **measurable** and **testable**
- Balance stakeholder needs with technical feasibility

---

## Step 1.0: Load Existing Instincts (Continuous Learning)

**Action**: At phase start, load any existing instincts relevant to Phase 1.

**Check for instincts:**
```bash
# Check if instincts directory exists
ls docs/knowledge-base/instincts/personal/ 2>/dev/null || echo "No instincts yet"
```

**If instincts exist:**
1. Read instinct files from `docs/knowledge-base/instincts/personal/`
2. Filter for Phase 1 relevance (domain requirements, competitive analysis patterns)
3. Apply high-confidence instincts (≥0.7) proactively
4. Keep moderate instincts (0.5-0.7) ready for suggestion

**Display (if applicable):**
```
───────────────────────────────────────────────────────────────
📚 LOADED INSTINCTS (Phase 1 relevant)
───────────────────────────────────────────────────────────────
• [instinct-name] (0.8): [brief description]
• [instinct-name] (0.7): [brief description]
───────────────────────────────────────────────────────────────
```

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

### Step 1.3.5: MANDATORY Clarifying Questions ⚠️

> **CRITICAL:** This step is MANDATORY. DO NOT proceed to one-line requirement or Phase 2 without completing clarifying questions.

**Action**: Gather comprehensive context through structured questions BEFORE proceeding.

**Reference**: See [../config/clarifying-questions.md](../config/clarifying-questions.md) for complete question bank.

**MUST Ask These Questions:**

```
═══════════════════════════════════════════════════════════════
❓ CLARIFYING QUESTIONS (MANDATORY)
───────────────────────────────────────────────────────────────
Before we proceed, I need to understand your project better.
Please answer the following questions:
───────────────────────────────────────────────────────────────

**Q1: What is the primary goal of this project?**
   ○ New product from scratch
   ○ Add feature to existing product
   ○ Fix/improve existing functionality
   ○ Migration/refactoring
   ○ Other: [please specify]

**Q2: Who are the primary users?**
   ○ Internal team only
   ○ External customers (B2C)
   ○ Business clients (B2B)
   ○ Developers (API/SDK)
   ○ Other: [please specify]

**Q3: What's the expected timeline?**
   ○ MVP in 1-2 weeks
   ○ First release in 1-2 months
   ○ Full product in 3-6 months
   ○ Flexible / no deadline
   ○ Other: [please specify]

**Q4: Are there existing technology constraints?**
   ○ Must use specific language: [which?]
   ○ Must integrate with existing system: [what?]
   ○ Must run on specific platform: [where?]
   ○ No constraints - open to suggestions
   ○ Other: [please specify]

**Q5: What are the security requirements?**
   ○ Standard (authentication, basic encryption)
   ○ Enhanced (audit logs, encryption at rest)
   ○ Compliance-required (HIPAA, SOC2, GDPR)
   ○ Not sure yet
   ○ Other: [please specify]

**Q6: Expected scale?**
   ○ Small (<100 users)
   ○ Medium (100-10,000 users)
   ○ Large (10,000-1M users)
   ○ Enterprise (>1M users)
   ○ Not sure yet

───────────────────────────────────────────────────────────────
💡 If these questions seem off-topic, say "wrong direction"
   and explain what you'd like to focus on instead.
═══════════════════════════════════════════════════════════════
```

**After User Responds:**
1. **Acknowledge** the answers
2. **Summarize** understanding
3. **Document** answers in specification notes
4. **Proceed** with context-informed requirement formulation

**Response Template:**
```markdown
Thank you for the clarification!

**Understanding:**
- **Goal:** [summarized from Q1]
- **Users:** [summarized from Q2]
- **Timeline:** [summarized from Q3]
- **Technology:** [summarized from Q4]
- **Security:** [summarized from Q5]
- **Scale:** [summarized from Q6]

Proceeding with this context to formulate your one-line requirement...
```

**If User Rejects Questions:**
```
I understand these questions aren't what you need.
What would you like me to focus on instead?
```

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

### Step 1.8.5: Continuous Learning - Capture Instincts

**Action**: Review Phase 1 session for learnable patterns and create instinct files.

> **Reference:** See [../config/continuous-learning.md](../config/continuous-learning.md) for full instinct model.

**Detection - Look for these patterns during Phase 1:**

| Pattern Type | What to Look For | Initial Confidence |
|--------------|------------------|-------------------|
| User correction | User modified/rejected AI suggestion | 0.5 |
| Requirement clarification | Ambiguity resolved (e.g., "real-time" defined) | 0.6 |
| Domain insight | Industry-specific pattern (HIPAA, PCI, etc.) | 0.7 |
| Competitive pattern | Reusable market positioning insight | 0.5 |

**Capture Process:**

**1. Review Session for Learnable Patterns**

Ask yourself:
- Did the user correct any assumptions I made?
- Did we clarify any ambiguous terms that could recur?
- Did competitive analysis reveal reusable patterns?
- Did domain constraints emerge that apply broadly?

**2. Create Instinct Files (if patterns found)**

For each captured pattern, create file in `docs/knowledge-base/instincts/personal/`:

```markdown
<!-- docs/knowledge-base/instincts/personal/[instinct-id].md -->
---
id: [kebab-case-id]
trigger: "[when this instinct applies]"
confidence: [0.3-0.9]
domain: "[requirements|competitive|domain-knowledge]"
source: "session-observation"
phase: "1"
created: "[YYYY-MM-DD]"
last_reinforced: "[YYYY-MM-DD]"
---

# [Instinct Title]

## Action
[What to do when trigger matches]

## Evidence
- [Observation that created this instinct]
- [Context from this session]

## Example
[Concrete example if applicable]
```

**3. Display Capture Summary**

```
═══════════════════════════════════════════════════════════════
📚 CONTINUOUS LEARNING - PHASE 1 CAPTURE
═══════════════════════════════════════════════════════════════

New Instincts Captured: [N]

1. [domain] [instinct-id] (0.X)
   "[brief description]"
   Evidence: [what triggered capture]

2. [domain] [instinct-id] (0.X)
   "[brief description]"
   Evidence: [what triggered capture]

Reinforced Instincts: [N]
- [instinct-id]: confidence [old] → [new]

No Instincts Captured: (if none)
- No learnable patterns detected this session

═══════════════════════════════════════════════════════════════
```

**Example Instincts for Phase 1:**

```yaml
# Domain-specific requirement pattern
id: healthcare-hipaa-nfrs
trigger: "when project involves healthcare/patient data"
confidence: 0.7
domain: "domain-knowledge"
action: "Include HIPAA compliance NFRs: BAA, encryption at rest/transit, audit logging"

# Competitive analysis pattern
id: saas-pricing-models
trigger: "when analyzing SaaS competitors"
confidence: 0.5
domain: "competitive"
action: "Document pricing tiers: freemium, usage-based, seat-based, enterprise custom"

# Requirement clarification
id: realtime-definition
trigger: "when 'real-time' is mentioned in requirements"
confidence: 0.6
domain: "requirements"
action: "Clarify: real-time (<100ms) vs near-real-time (<1s) vs periodic (minutes)"
```

**When to Capture:**
- Domain-specific patterns that could recur
- Common NFR templates for specific industries
- Competitive positioning insights
- Requirement clarification patterns
- Scope boundary definitions that worked well

**When NOT to Capture:**
- Project-specific functional requirements (too specific)
- Trivial clarifications
- One-off edge cases

**Deliverable:**
- Instinct files in `docs/knowledge-base/instincts/personal/`
- Continuous Learning summary displayed to user

---

### Step 1.9: Update Recovery Checkpoint with Handoff

> **⚠️ CRITICAL:** UPDATE the existing `.recovery-checkpoint.md` file. DO NOT create a new checkpoint file.

**Action**: Save recovery state with session transition info and update KB with Phase 1 learnings.

**First: Review and add to Knowledge Base** (see Step 1.8.5)

**Then: UPDATE (not create)** `./docs/implementation/.recovery-checkpoint.md`:

**File Location:** `docs/implementation/.recovery-checkpoint.md` (this file should already exist from setup.sh)

**⚠️ IMPORTANT:**
- If the file exists, UPDATE its contents
- If it doesn't exist, CREATE it at this exact path
- NEVER create a new file with a different name (e.g., `checkpoint-phase1.md`)
- NEVER create handoff documents in different locations

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
   
   Loading role: agents/architect.md
═══════════════════════════════════════════════════════════════
```

Load `./.CodeMaestro/prompts/02-planning.md` and begin Phase 2.
