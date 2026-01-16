# Phase Initialization Wizard

**Version:** 1.0
**Status:** Active
**Risk:** ⚠️ LOW - Preserves manual editing workflow
**Type:** Optional convenience feature

---

## Overview

The Phase Initialization Wizard provides guided, interactive phase setup to help users (especially beginners) create complete specifications and blueprints without manually editing template files. It complements the existing manual workflow without replacing it.

## Command: `/init-phase`

### Syntax

```bash
/init-phase 1          # Initialize Phase 1 (Requirements)
/init-phase 2          # Initialize Phase 2 (Planning)
/init-phase            # Auto-detect next phase
/init-phase --skip     # Skip wizard, use manual workflow
```

### When to Use

**Use the wizard when:**
- Starting a new phase for the first time
- Unsure what information to provide
- Want guided question flow
- Need validation before locking
- Prefer interactive over manual editing

**Skip the wizard when:**
- Already have detailed requirements
- Prefer manual template editing
- Importing existing specifications
- Advanced user who knows structure

---

## Phase 1 Wizard: Requirements

### Flow Overview

```
/init-phase 1
    ↓
Detect skill tier
    ↓
Ask guided questions
    ↓
Optional: Research competitors
    ↓
Generate specification
    ↓
Preview & confirm
    ↓
Lock specification
    ↓
Ready for Phase 2
```

### Complete Wizard Flow

```bash
> /init-phase 1

🎭 Phase 1 Initialization Wizard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Skill Tier Detection

   How familiar are you with software development?

   1. Beginner - New to development, need detailed guidance
   2. Advanced - Experienced, prefer concise information
   3. Ninja - Expert, minimal guidance needed

   Your choice: 2

📋 Skill Tier: Advanced (concise mode enabled)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Section 1: Product Vision

Q1. Project Name
    What is your project called?

    > TaskFlow

Q2. Elevator Pitch
    Describe your project in one sentence.

    > AI-powered task management for freelancers with smart prioritization

Q3. Core User Problem
    What problem are you solving?
    [Advanced: Brief description expected]

    > Freelancers struggle to prioritize tasks across multiple projects and miss deadlines

Q4. Your Solution
    How does your product solve this problem?

    > AI analyzes task dependencies, deadlines, and user patterns to suggest optimal priority order

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Section 2: Domain & Target Users

Q5. Domain
    Select primary domain:

    1. Mobile (iOS/Android apps)
    2. Web (Web applications)
    3. Cloud (Backend services, APIs)
    4. AI/ML (Machine learning, data science)
    5. Other

    Your choice: 2

Q6. Target Users
    Who will use this product?

    > Freelancers and small team leads managing 3-10 projects simultaneously

Q7. User Technical Proficiency
    How tech-savvy are your users?

    1. Non-technical (simple, intuitive UI required)
    2. Technical (power user features expected)
    3. Mixed (both casual and power users)

    Your choice: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Section 3: Core Features

Q8. Essential Features (must-have for MVP)
    List 3-5 core features. One per line.
    [Type 'done' when finished]

    > Task creation with titles, descriptions, deadlines
    > AI-powered priority suggestions
    > Multi-project view and filtering
    > Deadline reminders and notifications
    > done

Q9. Nice-to-Have Features (future phases)
    List 3-5 features for later. One per line.
    [Type 'done' when finished, or 'skip' to skip]

    > Calendar integration
    > Team collaboration features
    > Time tracking
    > done

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Section 4: Success Metrics

Q10. Business Goals
     What metrics indicate success?

     > 80% user retention after 30 days
     > Average 20 tasks created per user per week
     > 90% of users return within 24 hours

Q11. Quality Thresholds
     Any specific quality requirements?
     [Press Enter to use defaults: 70% coverage, 0 security issues]

     > [Enter]

     ✓ Using default quality gates:
       - Test coverage ≥ 70%
       - Security: 0 critical/high issues
       - AC pass rate: 100%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Section 5: Competitive Analysis (Optional)

Q12. Research Competitors?
     Would you like me to research existing solutions?
     [Uses WebSearch MCP tool]

     Y/N: Y

     🔍 Researching...

     Found 3 major competitors:

     1. **Todoist**
        - Strengths: Simple UI, cross-platform, good mobile apps
        - Weaknesses: No AI features, basic prioritization
        - Market: 25M+ users

     2. **Asana**
        - Strengths: Team collaboration, project views, integrations
        - Weaknesses: Complex for individuals, expensive
        - Market: Enterprise-focused

     3. **ClickUp**
        - Strengths: Feature-rich, customizable, all-in-one
        - Weaknesses: Steep learning curve, overwhelming UI
        - Market: Growing rapidly

     💡 Opportunity Gap Identified:
     None offer AI-powered prioritization for individual freelancers.
     Your solution fills this niche!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Section 6: Constraints & Scope

Q13. Technical Constraints
     Any specific requirements or limitations?
     [e.g., must work offline, specific framework, compliance needs]
     [Type 'done' when finished, or 'skip' to skip]

     > Must work on mobile and desktop
     > Real-time sync across devices
     > done

Q14. Out of Scope
     What will you NOT build in this version?
     [Type 'done' when finished, or 'skip' to skip]

     > Native mobile apps (web-first approach)
     > Team workspaces (individual users only)
     > done

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase 1 Specification Complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Generated Specification:

   docs/specifications/locked-specification-v1.0.md

   Sections included:
   ✓ Product Vision
   ✓ Target Users
   ✓ Core Features (4 essential, 3 nice-to-have)
   ✓ Success Metrics
   ✓ Competitive Analysis
   ✓ Technical Constraints
   ✓ Out of Scope
   ✓ Quality Gates (default)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Preview

   Would you like to review the specification before locking?

   Y/N: Y

   [Opens specification file for review]

   [After review...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Lock Specification?

   Lock the specification to proceed to Phase 2?
   [This can be unlocked later with version bump]

   Y/N: Y

   ✅ Specification locked!

   📝 File: docs/specifications/locked-specification-v1.0.md
   🔒 Status: LOCKED
   📊 Completeness: 100%

   🎉 Phase 1 Complete!

   Ready for Phase 2 (Planning).
   Use /next or /init-phase 2 to continue.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Phase 2 Wizard: Planning

### Flow Overview

```
/init-phase 2
    ↓
Load locked specification
    ↓
Technology stack selection
    ↓
Architecture approach
    ↓
Task breakdown guidance
    ↓
Generate blueprint
    ↓
Preview & confirm
    ↓
Ready for Phase 3
```

### Complete Wizard Flow

```bash
> /init-phase 2

🏗️ Phase 2 Initialization Wizard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Loading Phase 1 Specification...

   ✓ Loaded: locked-specification-v1.0.md

   Project: TaskFlow
   Domain: Web
   Core Features: 4 essential, 3 nice-to-have

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💻 Section 1: Technology Stack

Q1. Frontend Framework
    Recommended for Web domain:

    1. React (Popular, large ecosystem, flexible)
    2. Vue.js (Approachable, lightweight, progressive)
    3. Svelte (Minimal, compiled, fast)
    4. Other (specify)

    Your choice: 1

    ✓ React selected

    🔍 Validating with Context7...
    ✓ React 18.2.0 confirmed (stable, production-ready)

Q2. Backend Framework
    Recommended for Web + AI features:

    1. Node.js + Express (JavaScript, simple, large ecosystem)
    2. Python + FastAPI (Python for AI, modern, fast)
    3. Python + Django (Full-featured, batteries included)
    4. Other (specify)

    Your choice: 2

    ✓ Python + FastAPI selected

    Rationale: Python ecosystem strong for AI/ML integration

    🔍 Validating with Context7...
    ✓ FastAPI 0.109.0 confirmed (stable, production-ready)

Q3. Database
    Recommended for task management:

    1. PostgreSQL (ACID, relational, robust)
    2. MongoDB (Flexible schema, scalable)
    3. MySQL (Reliable, widespread)
    4. Other (specify)

    Your choice: 1

    ✓ PostgreSQL selected

    Rationale: Task relationships benefit from relational model

    🔍 Validating with Context7...
    ✓ PostgreSQL 15+ confirmed (stable, production-ready)

Q4. AI/ML Framework
    For AI-powered prioritization:

    1. OpenAI API (Managed, powerful, quick start)
    2. Hugging Face Transformers (Open-source, customizable)
    3. TensorFlow (Full control, requires expertise)
    4. Other (specify)

    Your choice: 1

    ✓ OpenAI API selected

    Rationale: Fast implementation, proven results

    🔍 Validating with Context7...
    ✓ OpenAI API v1.x confirmed (stable, production-ready)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏛️ Section 2: Architecture Approach

Q5. Architecture Pattern
    For Web application with AI:

    1. Monolithic (Simpler, faster to start)
    2. Microservices (Scalable, complex)
    3. Modular Monolith (Middle ground, recommended)

    Your choice: 3

    ✓ Modular Monolith selected

    Modules suggested:
    - Auth module (user authentication)
    - Tasks module (CRUD operations)
    - AI module (priority suggestions)
    - Notifications module (reminders)

Q6. State Management (Frontend)
    For React application:

    1. React Context + useReducer (Built-in, lightweight)
    2. Redux Toolkit (Robust, devtools, middleware)
    3. Zustand (Simple, performant)

    Your choice: 3

    ✓ Zustand selected

    Rationale: Simple for MVP, can scale if needed

Q7. API Design

    1. REST (Simple, cacheable, standard)
    2. GraphQL (Flexible queries, single endpoint)
    3. Both (REST + GraphQL for complex queries)

    Your choice: 1

    ✓ REST selected

    Endpoints to define:
    - POST /api/tasks (create)
    - GET /api/tasks (list)
    - PUT /api/tasks/:id (update)
    - DELETE /api/tasks/:id (delete)
    - POST /api/ai/prioritize (AI suggestions)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Section 3: Task Breakdown

   I'll now break down your 4 core features into implementation tasks...

   🤔 Analyzing features...

   Feature 1: Task creation with titles, descriptions, deadlines

   Suggested tasks:
   - T-1.1: Database schema (tasks table) [2h]
   - T-1.2: Task model and repository [3h]
   - T-1.3: POST /api/tasks endpoint [4h]
   - T-1.4: Task creation form (React) [5h]
   - T-1.5: Form validation [2h]
   - T-1.6: Unit tests for task creation [3h]

   Feature 2: AI-powered priority suggestions

   Suggested tasks:
   - T-2.1: OpenAI API integration [4h]
   - T-2.2: Priority calculation logic [6h]
   - T-2.3: POST /api/ai/prioritize endpoint [4h]
   - T-2.4: Priority display UI [3h]
   - T-2.5: AI suggestion acceptance/rejection [4h]
   - T-2.6: Unit tests for AI module [4h]

   [... continues for Features 3-4 ...]

   Total tasks: 42
   Estimated effort: 120 hours (8 weeks)

   Q8. Adjust estimates?

       1. Keep estimates as-is
       2. Make more aggressive (-20%)
       3. Make more conservative (+20%)
       4. Manual adjustment

       Your choice: 1

       ✓ Estimates locked

Q9. Task Dependencies

    I'll generate a task DAG showing dependencies...

    🔗 Analyzing dependencies...

    Critical Path identified:
    T-1.1 → T-1.2 → T-1.3 → T-2.2 → T-2.3 → T-4.1

    Parallel execution groups:
    - Group A: T-1.4, T-1.5 (can run parallel)
    - Group B: T-2.4, T-2.5 (can run parallel)

    Estimated duration: 8 weeks with parallelization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase 2 Blueprint Complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Generated Artifacts:

   docs/architecture/blueprint-v1.0.md
   docs/architecture/tasks/task-dag.md
   docs/architecture/gantt-timeline.md

   Sections included:
   ✓ Technology Stack (validated with Context7)
   ✓ Architecture Pattern (Modular Monolith)
   ✓ Module Breakdown (4 modules)
   ✓ API Design (REST endpoints)
   ✓ Task DAG (42 tasks with dependencies)
   ✓ Effort Estimates (120 hours / 8 weeks)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Preview

   Would you like to review the blueprint before locking?

   Y/N: Y

   [Opens blueprint file for review]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Approve Blueprint?

   Lock the blueprint to proceed to Phase 3?

   Y/N: Y

   ✅ Blueprint approved!

   📝 Files generated: 3
   🔒 Status: LOCKED
   📊 Tasks: 42
   ⏱️ Estimated: 120 hours

   🎉 Phase 2 Complete!

   Ready for Phase 3 (Implementation).
   Use /next to begin first task.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Skill Tier Adaptations

### Beginner Mode

**Characteristics:**
- Detailed explanations for each question
- Examples provided for each answer
- Suggestions and recommendations
- Help text available with `?`
- Longer wizard (more guidance)

**Example:**
```
Q1. Project Name
    What is your project called?

    💡 Tip: Choose a memorable, descriptive name (1-3 words)

    Examples:
    - TaskFlow (task management)
    - ShopEasy (e-commerce)
    - HealthTrack (fitness app)

    Type ? for more help

    >
```

### Advanced Mode

**Characteristics:**
- Concise questions
- Minimal explanations
- Faster flow
- Assumes familiarity with concepts

**Example:**
```
Q1. Project Name

    > TaskFlow
```

### Ninja Mode

**Characteristics:**
- Very brief questions
- Command-line style
- Batch input supported
- Maximum speed

**Example:**
```
Project: TaskFlow
Domain: Web
Features: [Task creation, AI prioritization, Multi-project view, Notifications]
Users: Freelancers
Research competitors? Y

[Wizard completes in 2-3 minutes]
```

---

## Validation & Completeness

### Required Fields

**Phase 1:**
- ✅ Project name
- ✅ Core user problem
- ✅ Solution description
- ✅ At least 3 core features
- ✅ At least 1 success metric
- ⚠️ Optional: Competitive analysis
- ⚠️ Optional: Nice-to-have features

**Phase 2:**
- ✅ Technology stack (frontend + backend + database)
- ✅ Architecture pattern
- ✅ API design approach
- ✅ Task breakdown (minimum 10 tasks)
- ⚠️ Optional: Custom estimates

### Completeness Check

```bash
# Before locking Phase 1
Checking specification completeness...

Required fields:
✓ Product vision (complete)
✓ Core features (4/3 minimum)
✓ Success metrics (3 defined)
✓ Target users (defined)

Optional fields:
✓ Competitive analysis (completed)
✓ Nice-to-have features (3 defined)
⚠️ Technical constraints (none specified)

Completeness: 90% (excellent)

OK to lock? Y/N: Y
```

---

## Integration with Manual Workflow

### Hybrid Approach

Users can mix wizard and manual editing:

```bash
# Start with wizard
/init-phase 1

# Complete basic information via wizard
[Answers guided questions]

# Preview generated specification
[Specification created]

# Manually refine
# Edit docs/specifications/locked-specification-v1.0.md
# Add custom sections, adjust wording

# Lock when ready
[Manual commit or /commit]
```

### Skip Wizard

```bash
# Use manual workflow instead
/init-phase 1 --skip

# Or just edit template directly
[Edit docs/specifications/locked-specification-v1.0.md manually]
```

---

## Best Practices

### ✅ Do:
- Use wizard for first-time phase setup
- Review generated output before locking
- Answer questions thoroughly
- Take advantage of competitive research
- Manually refine after wizard if needed

### ❌ Don't:
- Rush through questions
- Skip important sections
- Ignore validation warnings
- Lock without review
- Use wizard if you have detailed specs ready

---

## Troubleshooting

### "Wizard stuck on question"

**Cause:** Invalid input
**Solution:** Type `?` for help, or `skip` to skip optional questions

### "Generated specification incomplete"

**Cause:** Skipped required questions
**Solution:** Re-run wizard, answer all required fields

### "Can't modify locked specification"

**Cause:** Specification already locked
**Solution:** Use version bump (`/version bump spec`) to unlock

---

## Future Enhancements

### Planned Features (v1.2+)

- **Templates:** Pre-filled wizard templates for common project types
- **Import:** Import from existing specs (GitHub README, PRD, etc.)
- **Voice Input:** Speak answers instead of typing
- **AI Assistance:** Suggest features based on problem description
- **Collaboration:** Multi-user wizard for team projects

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-13 | Initial phase initialization wizard |

---

**Status:** ✅ Ready for use
**Risk:** ⚠️ LOW - Preserves manual workflow
**Impact:** Faster onboarding, complete specifications, validation before locking
