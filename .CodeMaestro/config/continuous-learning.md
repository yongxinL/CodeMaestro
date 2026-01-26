# Continuous Learning System

> **Purpose:** Automatically extract reusable patterns from development sessions and add them to the Knowledge Base.
> **Version:** 2.0 (Instinct-based architecture)
> **Inspired by:** [everything-claude-code](https://github.com/affaan-m/everything-claude-code) continuous-learning-v2

---

## Overview

The Continuous Learning System observes development sessions and captures:
- User corrections (what the AI got wrong)
- Error resolutions (how bugs were fixed)
- Repeated workflows (patterns done 3+ times)
- API validations (confirmed working APIs)

These become **instincts** - small learned behaviors that improve future sessions.

---

## The Instinct Model

An **instinct** is an atomic learned behavior with confidence scoring:

```yaml
---
id: prefer-zod-validation
trigger: "when validating user input"
confidence: 0.7
domain: "validation"
source: "session-observation"
phase: "3"
created: "2026-01-15"
last_reinforced: "2026-01-27"
---

# Prefer Zod Validation

## Action
Use Zod schemas for runtime validation instead of manual type guards.

## Evidence
- Observed 3 instances of Zod preference in Phase 3
- User corrected manual validation to Zod on 2026-01-15
- No contradicting evidence

## Example
```typescript
// Preferred (instinct recommends)
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Avoid (corrected pattern)
function validateUser(input: any): boolean {
  return typeof input.email === 'string' && 
         input.email.includes('@');
}
```
```

### Instinct Properties

| Property | Description |
|----------|-------------|
| `id` | Unique identifier (kebab-case) |
| `trigger` | When this instinct applies |
| `confidence` | 0.3 (tentative) to 0.9 (certain) |
| `domain` | Category: code-style, testing, git, debugging, security, workflow |
| `source` | How it was learned: session-observation, user-explicit, imported |
| `phase` | Which phase(s) it applies to |
| `created` | When first learned |
| `last_reinforced` | Last time evidence confirmed it |

---

## Confidence Scoring

### Levels

| Score | Level | Behavior |
|-------|-------|----------|
| 0.3 | Tentative | Mentioned but not enforced |
| 0.5 | Moderate | Applied when relevant context matches |
| 0.7 | Strong | Proactively applied, auto-approved |
| 0.9 | Certain | Core behavior, always applied |

### Confidence Evolution

**Increases when:**
- Pattern observed again (+0.1)
- User doesn't correct AI suggestion (+0.05)
- Similar instincts from KB agree (+0.05)
- Explicitly reinforced by user (+0.2)

**Decreases when:**
- User explicitly corrects behavior (-0.2)
- Pattern not used for 7+ days (-0.05 per week)
- Contradicting evidence appears (-0.15)
- Pattern causes error (-0.3)

### Auto-Decay

Instincts lose 0.05 confidence per week if not reinforced. Instincts below 0.3 are archived (not deleted).

---

## Detection Patterns

### 1. User Corrections

**Trigger:** User modifies or rejects AI suggestion

**Capture:**
```yaml
id: user-correction-[timestamp]
observation: "User replaced class-based component with functional hook"
instinct: "Prefer functional components with hooks over class components"
initial_confidence: 0.5
domain: "code-style"
```

### 2. Error Resolutions

**Trigger:** Error encountered and successfully fixed

**Capture:**
```yaml
id: error-fix-[library]-[issue]
observation: "Fixed 'useEffect cleanup' error by returning cleanup function"
instinct: "Always return cleanup function from useEffect with subscriptions"
initial_confidence: 0.6
domain: "debugging"
```

### 3. Repeated Workflows

**Trigger:** Same sequence done 3+ times in a session

**Capture:**
```yaml
id: workflow-[action]
observation: "User always runs 'npm test' after modifying src/ files"
instinct: "Run tests after modifying source files"
initial_confidence: 0.5
domain: "workflow"
```

### 4. API Validation

**Trigger:** API confirmed working via Context7 or documentation

**Capture:**
```yaml
id: api-[library]-[method]
observation: "Confirmed Zod.object().parse() exists and works"
instinct: "Zod.object().parse() is valid API for runtime validation"
initial_confidence: 0.9
domain: "api-knowledge"
```

---

## Storage Structure

```
.CodeMaestro/knowledge-base/
├── instincts/
│   ├── personal/           # Auto-learned from this project
│   │   ├── prefer-zod-validation.md
│   │   ├── always-test-first.md
│   │   └── use-early-returns.md
│   ├── inherited/          # Imported from other projects
│   │   └── react-best-practices.md
│   └── archived/           # Low-confidence (< 0.3) instincts
│       └── old-pattern.md
├── failures/               # Existing failure patterns
├── patterns/               # Existing success patterns
└── decisions/              # Existing decision index
```

---

## Phase Integration

| Phase | Learning Focus | Example Instincts |
|-------|---------------|-------------------|
| Phase 1 | Domain requirements, competitive insights | "This domain requires HIPAA compliance", "Competitor X uses OAuth2" |
| Phase 2 | Architecture patterns, build vs buy | "Prefer serverless for event-driven", "Use managed database over self-hosted" |
| Phase 3 | Implementation patterns, library quirks | "React Query handles caching", "Always use try-catch with fetch" |
| Phase 4 | Test patterns, security issues | "Mock external APIs in unit tests", "Never log PII" |
| Phase 5 | Lessons learned, process improvements | "Estimation was 20% low for new libraries", "Breaking changes need migration guides" |

---

## Session Lifecycle

### On Session Start

1. Load existing instincts from `.CodeMaestro/knowledge-base/instincts/`
2. Filter by current phase relevance
3. Apply high-confidence instincts (≥0.7) proactively
4. Keep moderate instincts (0.5-0.7) ready for suggestion

### During Session

1. Observe user corrections, error resolutions, repeated patterns
2. Track pending instincts to capture
3. Update confidence on existing instincts based on observations

### On Session End / Phase Boundary

1. Review session for new instincts
2. Create instinct files for confirmed patterns
3. Update confidence scores on existing instincts
4. Apply decay to unreinforced instincts
5. Archive instincts below 0.3 threshold

---

## Commands / Natural Language

| Say this... | Action |
|-------------|--------|
| "What have I learned this session?" | List pending instincts from current session |
| "Save this pattern" | Manually create instinct from current context |
| "Review instincts" | List all instincts with confidence scores |
| "Show high-confidence patterns" | List instincts with confidence ≥0.7 |
| "Import instincts from [project]" | Copy instincts from another project |
| "Archive low patterns" | Move instincts below 0.3 to archive |

---

## Backward Compatibility

This system extends the existing Knowledge Base:

- Existing `/kb` commands continue to work
- `patterns/` and `failures/` directories unchanged
- Instincts are a new layer on top of existing KB
- Can convert high-confidence instincts to formal patterns: "Promote this instinct to pattern"

---

## Privacy & Sharing

- Instincts stay **local** to the project
- Only pattern descriptions are stored, not actual code
- Export creates anonymized YAML files
- Import validates instincts before adding

---

## Example Session

```
═══════════════════════════════════════════════════════════════
📚 CONTINUOUS LEARNING - SESSION SUMMARY
═══════════════════════════════════════════════════════════════

Session Duration: 2h 15m
Phase: 3 (Implementation)

New Instincts Captured (3):

1. [code-style] prefer-early-returns (0.6)
   "Use early returns instead of nested if statements"
   Evidence: User refactored 3 functions to use early returns

2. [debugging] log-before-async (0.5)
   "Add logging before async operations for debugging"
   Evidence: User added console.log before fetch calls twice

3. [api-knowledge] prisma-findUnique (0.9)
   "Prisma.findUnique returns null when not found, not throw"
   Evidence: Confirmed via Context7 documentation

Reinforced Instincts (2):

1. prefer-zod-validation: 0.7 → 0.75
2. always-test-first: 0.8 → 0.85

Decayed Instincts (1):

1. use-moment-dates: 0.5 → 0.45 (no usage in 14 days)

═══════════════════════════════════════════════════════════════
```

---

## Version

| Component | Version |
|-----------|---------|
| Continuous Learning | 2.0.0 |
| Instinct Model | 1.0.0 |
| Last Updated | 2026-01-27 |
