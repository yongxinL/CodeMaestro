# Model Selection Guidelines

**CodeMaestro v1.0.0**
**Purpose:** Single source of truth for Claude model selection (Haiku/Sonnet/Opus)
**Status:** Active - Referenced across all phases
**Last Updated:** 2026-01-19

---

## Overview

This file defines the criteria for selecting the appropriate Claude model (Haiku 4.5, Sonnet 4.5, or Opus 4.5) based on task complexity, token budget, and quality requirements.

**Single Source of Truth:** All phase prompts, templates, and documentation reference this file—no inline duplication.

---

## Model Comparison

| Model | Context Window | Usable Budget | Cost (Relative) | Best For |
|-------|---------------|---------------|-----------------|----------|
| **Haiku 4.5** | 200K tokens | 160K tokens | 1x (baseline) | Simple, repetitive tasks |
| **Sonnet 4.5** | 1M tokens | 800K tokens | ~5x | Most tasks, balanced quality/cost |
| **Opus 4.5** | 1M tokens | 800K tokens | ~15x | Complex, critical tasks |

**Usable Budget:** Context window minus 20% buffer for overhead

---

## Decision Criteria

### Use Haiku 4.5 When:

**Token Budget:** <20K per task

**Task Characteristics:**
- Simple CRUD operations
- Configuration and setup tasks
- Repetitive patterns (following established templates)
- Testing simple scenarios (unit tests)
- Documentation updates (non-architectural)
- File/directory operations
- Straightforward bug fixes with clear root cause

**Examples:**
- Setting up package.json and dependencies
- Creating database migration scripts
- Writing unit tests for pure functions
- Updating README with new features
- Adding environment variable configuration

**When NOT to use:**
- Task requires creative problem-solving
- New/unfamiliar libraries
- Security-sensitive code
- Complex business logic

---

### Use Sonnet 4.5 When:

**Token Budget:** 20-80K per task

**Task Characteristics:**
- Business logic implementation
- API integration (moderate complexity)
- Database queries and optimization
- UI components with interactivity
- Most implementation tasks (default choice)
- Integration testing
- Debugging multi-layer issues
- Moderate refactoring (module-level)

**Examples:**
- Implementing user authentication with JWT
- Building REST API endpoints with validation
- Creating React components with state management
- Integrating third-party APIs (Stripe, SendGrid)
- Writing integration tests for workflows
- Refactoring a module to improve maintainability

**When NOT to use:**
- Task is simple/repetitive (use Haiku for cost savings)
- Task requires deep architectural reasoning (upgrade to Opus)

**Default Recommendation:** When in doubt, choose Sonnet (balanced quality/cost)

---

### Use Opus 4.5 When:

**Token Budget:** >80K per task

**Task Characteristics:**
- Novel algorithms or complex logic
- Architectural decisions (Phase 2)
- Critical security implementations
- Performance optimization requiring deep analysis
- Debugging complex, multi-layer issues
- Large-scale refactoring (architectural changes)
- Research/exploration tasks with no clear solution

**Examples:**
- Designing system architecture (Phase 2)
- Implementing custom encryption scheme
- Optimizing database queries for 10x performance gain
- Refactoring entire codebase to microservices
- Investigating race conditions in distributed system
- Creating novel algorithms for unique business requirements

**When NOT to use:**
- Standard implementations with established patterns
- Cost-sensitive projects without critical complexity
- Tasks that can be solved with Sonnet

**Cost Consideration:** Opus is ~15x more expensive than Haiku. Reserve for truly complex work.

---

## Model Selection Decision Matrix

### Task Type to Model Mapping

| Task Type | Token Range | Complexity | Recommended Model | Rationale |
|-----------|-------------|------------|-------------------|-----------|
| **Setup/Config** | 5K-15K | Simple | Haiku | Repetitive, well-defined patterns |
| **CRUD Operations** | 15K-30K | Simple-Moderate | Haiku/Sonnet* | Haiku for standard, Sonnet if custom logic |
| **Business Logic** | 25K-60K | Moderate-Complex | Sonnet | Requires reasoning, edge cases |
| **API Integration** | 30K-70K | Moderate-Complex | Sonnet | External docs, error handling |
| **UI Components** | 20K-50K | Moderate-Complex | Sonnet | Interactivity, accessibility, styling |
| **Testing (Unit)** | 10K-25K | Simple-Moderate | Haiku/Sonnet* | Haiku for simple, Sonnet for complex |
| **Testing (Integration)** | 20K-40K | Moderate | Sonnet | Multi-component interactions |
| **Refactoring (Module)** | 20K-50K | Moderate-Complex | Sonnet | Maintain behavior, improve structure |
| **Refactoring (Architectural)** | 50K-100K+ | Very Complex | Opus | System-wide changes, critical decisions |
| **Bug Fixes (Simple)** | 8K-20K | Simple | Haiku | Clear root cause, straightforward fix |
| **Bug Fixes (Complex)** | 20K-60K | Complex | Sonnet | Multi-layer debugging, unclear cause |
| **Architecture Design** | 50K-100K+ | Very Complex | Opus | Phase 2 decisions, critical design |
| **Security Implementation** | 30K-80K | Complex-Critical | Sonnet/Opus* | Sonnet for standard, Opus for novel threats |
| **Performance Optimization** | 30K-80K | Complex | Sonnet/Opus* | Sonnet for known patterns, Opus for deep analysis |
| **Documentation (Simple)** | 5K-15K | Simple | Haiku | Standard docs, API references |
| **Documentation (Architectural)** | 20K-50K | Moderate-Complex | Sonnet | ADRs, design docs, system overviews |

*Conditional: Choose based on specific task complexity

---

## Decision Workflow

### Step 1: Estimate Token Budget

Use task decomposition to estimate token requirements:
- File count and LOC
- Complexity multipliers (1x simple → 5x very complex)
- New technology multiplier (+1.5x)

**See:** [token-estimation.md](token-estimation.md) for estimation methodology

### Step 2: Assess Complexity

**Simple:**
- Single file, <100 LOC
- Clear requirements, established patterns
- No edge cases or error handling complexity

**Moderate:**
- 2-3 files, 100-300 LOC
- Some ambiguity, requires reasoning
- Standard error handling

**Complex:**
- 4+ files, 300+ LOC
- High ambiguity, requires creative problem-solving
- Complex error handling, edge cases

**Very Complex:**
- System-wide changes
- Novel algorithms or architectural decisions
- Critical security or performance requirements

### Step 3: Apply Decision Matrix

```
Token Budget <20K + Simple → Haiku
Token Budget 20-80K + Moderate-Complex → Sonnet
Token Budget >80K + Very Complex → Opus
```

**Exception Cases:**
- Security-critical tasks: Upgrade one tier (Haiku → Sonnet, Sonnet → Opus)
- New/unfamiliar technology: Upgrade one tier
- Cost-sensitive project: Attempt Haiku first, upgrade if insufficient

### Step 4: Document Rationale

In task file, include model recommendation with justification:

```markdown
**Estimated Tokens:** 35,000 tokens
**Recommended Model:** Claude Sonnet 4.5

**Rationale:**
- Token budget (35K) falls in Sonnet range (20-80K)
- Moderate complexity requires balanced reasoning
- New library integration benefits from Sonnet's understanding
- Cost-effective for this complexity level
```

---

## Cost-Performance Trade-offs

### When to Optimize for Cost

**Use Haiku aggressively when:**
- Budget-constrained project
- Batch of similar simple tasks
- Well-established patterns in codebase
- Non-critical functionality

**Strategy:**
1. Attempt Haiku first
2. If output quality insufficient, upgrade to Sonnet
3. Document learning: "Similar tasks should use Sonnet"

### When to Optimize for Quality

**Use Sonnet/Opus liberally when:**
- Critical production code
- High-risk domains (finance, healthcare)
- Security-sensitive implementations
- Customer-facing functionality
- Unfamiliar technology stack

**Strategy:**
1. Default to Sonnet for implementation
2. Reserve Opus for architectural decisions and critical tasks
3. Track quality metrics: fewer bugs justify higher model cost

### Cost Calculations

**Example Project: 30 tasks**

**Approach 1: All Sonnet (Simple)**
- 30 tasks × 35K avg tokens × 5x cost = Total cost ~$X
- Pros: Consistent quality, no context switching
- Cons: Higher cost

**Approach 2: Model-per-Task (Optimized)**
- 10 Haiku tasks × 15K tokens × 1x = ~$Y
- 18 Sonnet tasks × 35K tokens × 5x = ~$Z
- 2 Opus tasks × 80K tokens × 15x = ~$W
- Total: ~$[Y+Z+W] (save ~30-40% vs Approach 1)
- Pros: Cost-effective
- Cons: Requires model switching, upfront task categorization

**Recommendation:** Use Approach 2 (model-per-task) for cost-conscious projects, Approach 1 (all Sonnet) for simplicity and quality consistency.

---

## Session Model Strategy

### Primary Session Model

**Default:** Claude Sonnet 4.5

**Rationale:**
- Handles 80% of tasks well
- 1M context window accommodates most sessions
- Balanced quality/cost for mixed-complexity work

### When to Use Model Switching

**Switch to Haiku Session when:**
- Batch of 3+ simple tasks back-to-back
- Setup/configuration phase (project initialization)
- Documentation-heavy session
- Budget running low (<20% remaining)

**Switch to Opus Session when:**
- Phase 2 architecture design (entire session)
- Critical security review session
- Complex refactoring session (architectural changes)

**Context Switching Overhead:**
- Starting new session loses conversation context
- Tradeoff: Cost savings vs. efficiency
- **Rule of thumb:** Only switch if savings >30% and tasks are independent

---

## Model Performance Tracking

### Track Model Effectiveness

In task completion notes, document:

```markdown
**Model Used:** Claude Sonnet 4.5
**Model Appropriateness:** ✅ Appropriate / ⚠️ Over-powered / ❌ Under-powered

**Notes:**
- Task was simpler than estimated; Haiku would have sufficed
- Recommend Haiku for similar CRUD tasks in future
```

### Learning from Model Selection

**Patterns to track:**
- Tasks where Haiku succeeded (expand Haiku usage)
- Tasks where Haiku failed (document threshold)
- Tasks where Opus was necessary (justify cost)
- Tasks where Sonnet → Opus upgrade improved quality

**Optimization Over Time:**
- Phase 2: Conservative (default Sonnet for most tasks)
- Phase 3 (Early): Validate model assignments, upgrade/downgrade as needed
- Phase 3 (Late): Apply learnings, more accurate model selection
- Phase 5: Document model selection patterns for next project

---

## Phase-Specific Recommendations

### Phase 1: Requirements

**Primary Model:** Sonnet 4.5

**Rationale:**
- Specification writing requires reasoning
- Competitive analysis needs comprehension
- Token usage typically 5K-15K per session (fits Haiku budget, but quality matters)

**Use Opus if:** Highly complex domain (regulatory, medical, financial)

### Phase 2: Planning

**Primary Model:** Opus 4.5 (Architecture Design) / Sonnet 4.5 (Task Decomposition)

**Rationale:**
- Architecture decisions are critical and costly to change later
- Opus provides superior system design reasoning
- Task decomposition can use Sonnet (less critical)

**Session Strategy:**
- Start with Opus for Steps 2.1-2.4 (architecture)
- Switch to Sonnet for Steps 2.5-2.11 (task generation, estimates)

### Phase 3: Implementation

**Primary Model:** Sonnet 4.5

**Task-Level Model Assignment:**
- Reference task DAG for per-task model recommendations
- Switch to Haiku for batches of simple tasks
- Upgrade to Opus for critical/complex tasks

**Typical Distribution:**
- 30% Haiku (setup, config, simple CRUD)
- 60% Sonnet (business logic, API integration)
- 10% Opus (critical security, novel algorithms)

### Phase 4: Verification

**Primary Model:** Sonnet 4.5

**Rationale:**
- Test execution and analysis needs reasoning
- Evidence package generation is moderate complexity
- Security scanning interpretation requires Sonnet

**Use Opus if:** Complex performance optimization or security vulnerability analysis required

### Phase 5: Release

**Primary Model:** Sonnet 4.5

**Rationale:**
- Lessons learned and retrospective need reasoning
- Knowledge base documentation is moderate complexity
- Release coordination is standard workflow

---

## Common Questions

### "Should I use Opus for all critical code?"

**No.** "Critical" doesn't always mean "complex." Use Sonnet for critical code with established patterns (e.g., standard authentication). Reserve Opus for critical code with novel requirements.

### "Can I downgrade mid-task if Sonnet is over-powered?"

**No.** Stay with the session model for task completion. Document for future: "This task type should use Haiku."

### "What if Haiku fails a task?"

**Upgrade to Sonnet** and retry. Document the failure threshold (e.g., "Haiku struggles with library X integrations").

### "How do I justify Opus cost to stakeholders?"

**Show impact:** "Opus prevented 3 days of rework on architectural refactor. Cost: $5 (Opus) vs. $2 (Sonnet). Savings: 3 days × $500/day = $1,500."

---

## Examples

### Example 1: Authentication Module

**Task:** Implement JWT authentication with refresh tokens

**Analysis:**
- Files: 3 (controller, service, middleware)
- LOC: ~250 lines
- Complexity: Complex (security-critical, edge cases)
- Token Estimate: 35,000 tokens
- New Technology: JWT library (team learning)

**Decision:** **Sonnet 4.5**

**Rationale:**
- Token budget (35K) in Sonnet range
- Security-critical → upgrade from Haiku
- New library → Sonnet handles docs well
- Established JWT patterns → not novel enough for Opus

### Example 2: Database Setup

**Task:** Create PostgreSQL schema with migrations

**Analysis:**
- Files: 5 migration files
- LOC: ~150 lines SQL
- Complexity: Simple (standard schema design)
- Token Estimate: 12,000 tokens

**Decision:** **Haiku 4.5**

**Rationale:**
- Token budget (12K) well under 20K
- Simple, repetitive migration patterns
- No business logic complexity
- Cost savings: 5x cheaper than Sonnet

### Example 3: System Architecture

**Task:** Design microservices architecture for distributed system

**Analysis:**
- Deliverables: Architecture blueprint, ADRs, service boundaries
- Complexity: Very Complex (novel system design)
- Token Estimate: 90,000 tokens
- Critical: Yes (foundational decision)

**Decision:** **Opus 4.5**

**Rationale:**
- Token budget (90K) exceeds Sonnet range
- Very complex: novel microservices design
- Critical: Architectural decisions costly to change
- Opus superior reasoning justifies 15x cost

---

## Related Documentation

- [token-estimation.md](token-estimation.md) - Token budget estimation methodology
- [handoff-messages.md](handoff-messages.md) - Model recommendations in session handoffs
- [02-planning.md](../prompts/02-planning.md) - Phase 2 model strategy for architecture
- [03-implementation.md](../prompts/03-implementation.md) - Phase 3 per-task model assignments

---

## Version

**Model Selection Guidelines Version:** 1.0.1
**Last Updated:** 2026-01-19
**Status:** Active - Single source of truth
