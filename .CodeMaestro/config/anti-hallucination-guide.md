# Anti-Hallucination Guide

**CodeMaestro v1.0.1**
**Philosophy:** "Copy instead of write, connect instead of create, reuse instead of reinvent"
**Purpose:** Prevent AI hallucinations through verified code reuse
**Last Updated:** 2026-01-19

---

## Overview

This guide consolidates CodeMaestro's anti-hallucination practices to prevent AI from generating incorrect APIs, non-existent library features, or untested patterns.

**Core Philosophy:** Prioritize **verified, mature implementations** over AI-generated code.

---

## Three Pillars

### 1. Copy Instead of Write

**Principle:** Use verified examples from official documentation rather than generating from memory.

**Implementation:**
- **Constraint A7.5:** Copy Verified Examples (new in v1.0.1)
- **Tool:** Context7 `/example [library] [feature]`
- **Workflow:** Retrieve → Adapt → Document source → Test

**When to apply:**
- New library/framework integration
- Unfamiliar API patterns
- Security-sensitive code
- Third-party service integration

**Example:**
```javascript
// Pattern adapted from: React Hook Form official docs via Context7
const { register, handleSubmit } = useForm();
```

**See:** [constraints-reference.md](constraints-reference.md) (Constraint A7.5) for complete guidance.

---

### 2. Connect Instead of Create

**Principle:** Integrate existing libraries/services rather than building custom solutions.

**Implementation:**
- **Phase 2 Step 2.2.5:** Solution Discovery (new in v1.0.1)
- **Decision Framework:** Build vs. Integrate comparison tables
- **Tool:** WebSearch for library/service research

**When to apply:**
- Phase 2 architecture design
- Evaluating technology stack
- Planning major features (auth, payments, storage)

**Example:**
| Requirement | Custom Build | Integration | Decision |
|-------------|-------------|-------------|----------|
| Authentication | 200 hours | Auth0 $200/mo | **Auth0** |
| Payments | 300 hours | Stripe SDK | **Stripe** |

**See:** [prompts/02-planning.md](../prompts/02-planning.md) (Step 2.2.5) for complete workflow.

---

### 3. Reuse Instead of Reinvent

**Principle:** Search knowledge base and reuse proven patterns before creating new solutions.

**Implementation:**
- **Constraint A4:** Reuse Patterns from Knowledge Base
- **Tool:** `/kb search [pattern]` before implementing
- **Workflow:** Search → Reuse → Adapt → Contribute

**When to apply:**
- Before implementing any non-trivial feature
- When facing familiar problems
- Starting new modules or components

**Example:**
```bash
# Before implementing auth
> /kb search authentication

Found: P-AUTH-001 - JWT authentication pattern
Reused pattern, saved 6 hours vs. implementing from scratch
```

**See:** [constraints-reference.md](constraints-reference.md) (Constraint A4) for complete guidance.

---

## Constraint Summary

| Constraint | Name | Phase | Purpose |
|-----------|------|-------|---------|
| **A1** | Production-Ready Dependencies | 2, 3 | Use mature, maintained libraries |
| **A4** | Reuse KB Patterns | 2, 3 | Search KB before designing |
| **A7** | Confirmed APIs Only | 2, 3 | Validate API existence (blocking) |
| **A7.5** | Copy Verified Examples | 3 | Copy official examples vs generating ⭐ NEW |
| **A8** | Framework Conventions | 2, 3 | Use framework solutions |

---

## Phase Integration

### Phase 2: Planning
**Step 2.2.5: Solution Discovery** ⭐ NEW
- Search for existing libraries/services
- Build vs. integrate decision framework
- Document decisions in ADRs

### Phase 3: Implementation
**Step 3.3.4: Anti-Hallucination Workflow** ⭐ ENHANCED
1. Search KB for patterns: `/kb search [feature]`
2. Retrieve verified examples: Context7 `/example [library] [feature]`
3. Copy and adapt official code
4. Document sources in comments
5. Validate implementation

---

## Tools and Commands

### Context7 (MCP Tool)
```bash
/lookup [library] [method]     # Confirm API exists and signature
/example [library] [feature]    # Retrieve working code example
```

**Use cases:**
- Validating library APIs before use (A7)
- Copying verified implementation patterns (A7.5)
- Confirming correct usage of unfamiliar features

### Knowledge Base
```bash
/kb search [pattern]            # Find internal patterns
/kb add pattern                 # Save successful adaptations
/kb add failure                 # Document what didn't work
```

**Use cases:**
- Reusing proven internal solutions (A4)
- Avoiding repeated mistakes
- Building organizational knowledge

### WebSearch
```bash
/websearch "[requirement] library 2026 comparison"
/websearch "[feature] managed service 2026"
```

**Use cases:**
- Phase 2 Solution Discovery (Step 2.2.5)
- Evaluating build vs. integrate options
- Finding mature, maintained alternatives

---

## Anti-Hallucination Workflow

### Complete Workflow (Phase 3 Implementation)

```
┌───────────────────────────────────────────────────────────┐
│ ANTI-HALLUCINATION IMPLEMENTATION WORKFLOW                │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  1. Load Task → Read requirements and ACs                │
│     ↓                                                     │
│  2. Search KB → /kb search [feature]                     │
│     ↓                                                     │
│  3a. Pattern Found? → Reuse and adapt                    │
│  3b. No Pattern? → Proceed to Step 4                     │
│     ↓                                                     │
│  4. Using New Library? → YES: Proceed to Step 5          │
│                       → NO: Implement with known APIs    │
│     ↓                                                     │
│  5. Retrieve Examples:                                    │
│     - Context7: /lookup [library] [method]               │
│     - Context7: /example [library] [feature]             │
│     ↓                                                     │
│  6. Copy Verified Example → Adapt to requirements        │
│     ↓                                                     │
│  7. Document Source:                                      │
│     // Pattern adapted from: [source]                    │
│     // Validated via Context7: [API confirmed]           │
│     ↓                                                     │
│  8. Test Implementation → Verify correctness             │
│     ↓                                                     │
│  9. Add to KB → /kb add pattern (if reusable)           │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## Examples

### Example 1: Authentication Implementation

**❌ HALLUCINATION RISK:**
```javascript
// Generated from memory - WRONG
const passport = require('passport');
passport.authenticate('jwt-bearer', { session: false }); // Wrong strategy name
```

**✅ ANTI-HALLUCINATION:**
```javascript
// Pattern adapted from: Passport.js JWT Strategy official docs via Context7
// Validated via Context7: passport-jwt.Strategy() confirmed

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  // Custom business logic here
  const user = await User.findById(jwt_payload.sub);
  return done(null, user || false);
}));
```

### Example 2: Database Query

**❌ HALLUCINATION RISK:**
```python
# Generated from memory - WRONG API
user = User.find_by_email_and_status(email, 'active')  # Method doesn't exist
```

**✅ ANTI-HALLUCINATION:**
```python
# Pattern adapted from: SQLAlchemy ORM tutorial via Context7
# Modified for our User model with active filter
# Validated via Context7: select().where() confirmed

from sqlalchemy import select

stmt = select(User).where(User.email == email).where(User.active == True)
user = session.execute(stmt).scalars().first()
```

### Example 3: Build vs. Integrate Decision (Phase 2)

**❌ HALLUCINATION RISK:**
Build custom payment system (300 hours, PCI compliance, fraud detection)

**✅ ANTI-HALLUCINATION:**
```markdown
## Solution Discovery: Payment Processing

**Existing Solutions Found:**
1. Stripe SDK - Industry standard, PCI compliant
2. Braintree - PayPal integration
3. Square - Simple, good for SMB

**Decision:** Integrate Stripe SDK

**Rationale:**
- **Connect instead of create:** Proven solution vs 300 hour custom build
- Includes: PCI compliance, fraud detection, dispute handling
- Saves: $50K+ annual PCI audit cost
- Risk: LOW (vs HIGH for custom)
- Context7 examples available for implementation

**ADR:** docs/architecture/adrs/ADR-003-use-stripe.md
```

---

## Red Flags (Stop and Validate)

### When to Use Anti-Hallucination Workflow

**⚠️ ALWAYS validate if:**
- Using library for first time
- Can't remember exact API signature
- Haven't used framework in >6 months
- Guessing parameter names/order
- Third-party service integration
- Security-sensitive implementation

**⚠️ Common hallucination errors:**
- "X is not a function"
- "Cannot read property Y of undefined"
- "Module Z not found" (after install)
- Wrong parameter order causes silent failures

**✅ Correct action:**
1. Stop generating code
2. Use Context7 to confirm API
3. Retrieve official example
4. Adapt verified code
5. Document source

---

## Benefits

### For Code Quality
- **Fewer bugs** from incorrect API usage
- **Faster debugging** (patterns are proven)
- **Better maintainability** (documented sources)

### For Development Speed
- **No hallucination debugging cycles**
- **Reuse proven patterns** vs trial-and-error
- **Faster onboarding** (follow documented examples)

### For Team Collaboration
- **Consistent patterns** across codebase
- **Shared knowledge base** of proven solutions
- **Cited sources** enable learning

---

## Metrics to Track

### Hallucination Prevention Rate

Track in knowledge base:
```markdown
## Anti-Hallucination Metrics

**Tasks Using Verified Examples:** 42/50 (84%)
**Hallucination Incidents Prevented:** 12 (via Context7 validation)
**Pattern Reuse Rate:** 67% (from KB search)
**Build vs. Integrate Decisions:** 8 integrations, 3 custom builds

**Time Saved:**
- Pattern reuse: ~85 hours
- Integration vs. build: ~620 hours
- Avoided debugging hallucinations: ~15 hours

**Total Savings:** ~720 hours via anti-hallucination practices
```

---

## Related Documentation

### Core System
- [constraints-reference.md](constraints-reference.md) - A1, A4, A7, A7.5 definitions
- [prompts/02-planning.md](../prompts/02-planning.md) - Step 2.2.5 Solution Discovery
- [prompts/03-implementation.md](../prompts/03-implementation.md) - Step 3.3.4 Anti-Hallucination Workflow
- [roles/senior-developer.md](roles/senior-developer.md) - Anti-Hallucination Practices section

### Tools
- [mcp-tools.md](mcp-tools.md) - Context7 integration and usage
- [multi-project-kb.md](multi-project-kb.md) - Cross-project pattern sharing

---

## Version

**Anti-Hallucination Guide Version:** 1.0.1
**CodeMaestro:** v1.0.1
**Last Updated:** 2026-01-19
**Status:** Active - Core philosophy
