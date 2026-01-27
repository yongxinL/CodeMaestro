# Clarifying Questions System

> **Purpose:** Generate structured questions to gather missing context and reduce hallucination.
> **Primary Use:** Phase 1 (Requirements) and Phase 2 (Planning)
> **Inspired by:** [ask-user-questions-mcp](https://github.com/paulp-o/ask-user-questions-mcp)

---

## Overview

When detecting missing details or ambiguous requirements, generate structured clarifying questions. This reduces hallucination by ensuring we have accurate context before proceeding.

**Benefits:**
- **Reduces hallucination** - Asks rather than assumes
- **Makes sessions interactive** - User guides the direction
- **Produces better code** - Context-appropriate solutions
- **Supports rejection** - User can redirect if questions are off-topic

---

## When to Ask Questions

| Phase | Trigger | Question Focus |
|-------|---------|----------------|
| Phase 1 | Vague requirements | Scope, users, constraints |
| Phase 1 | Multiple interpretations | Clarify intent |
| Phase 2 | Technology decisions | Build vs buy, framework choice |
| Phase 2 | Architecture ambiguity | Pattern selection, scaling needs |
| Phase 3 | Missing specs | Edge cases, error handling |
| Phase 4 | Test gaps | Coverage priorities, security focus |

---

## Question Format

### Standard Question Set

```
═══════════════════════════════════════════════════════════════
❓ CLARIFYING QUESTIONS
───────────────────────────────────────────────────────────────
Context: [What we're trying to clarify]
───────────────────────────────────────────────────────────────

**Q1: [Question text]**
   ○ Option A: [choice]
   ○ Option B: [choice]
   ○ Option C: [choice]
   ○ Other: [please specify]

**Q2: [Question text]**
   ○ Yes
   ○ No
   ○ Not sure yet
   ○ Other: [please specify]

**Q3: [Question text]**
   [Open-ended - please describe]

───────────────────────────────────────────────────────────────
💡 If these questions seem off-topic, say "wrong direction" 
   and explain what you'd like to focus on instead.
═══════════════════════════════════════════════════════════════
```

### Question Types

| Type | Format | Use When |
|------|--------|----------|
| **Single Choice** | Radio buttons (○) | One answer expected |
| **Multiple Choice** | Checkboxes (☐) | Multiple answers allowed |
| **Yes/No/Maybe** | Tri-state | Simple decisions |
| **Open-ended** | Free text | Needs explanation |
| **Scale** | 1-5 rating | Priority/importance |

---

## Phase 1: Requirements Questions

### Scope Clarification

```
**Q1: What is the primary goal of this project?**
   ○ New product from scratch
   ○ Add feature to existing product
   ○ Fix/improve existing functionality
   ○ Migration/refactoring
   ○ Other: [specify]

**Q2: Who are the primary users?**
   ○ Internal team only
   ○ External customers (B2C)
   ○ Business clients (B2B)
   ○ Developers (API/SDK)
   ○ Other: [specify]

**Q3: What's the expected timeline?**
   ○ MVP in 1-2 weeks
   ○ First release in 1-2 months
   ○ Full product in 3-6 months
   ○ Flexible / no deadline
   ○ Other: [specify]
```

### Technical Constraints

```
**Q1: Are there existing technology constraints?**
   ○ Must use specific language: [which?]
   ○ Must integrate with existing system: [what?]
   ○ Must run on specific platform: [where?]
   ○ No constraints - open to suggestions
   ○ Other: [specify]

**Q2: What are the security requirements?**
   ○ Standard (authentication, basic encryption)
   ○ Enhanced (audit logs, encryption at rest)
   ○ Compliance-required (HIPAA, SOC2, GDPR)
   ○ Not sure yet
   ○ Other: [specify]

**Q3: Expected scale?**
   ○ Small (<100 users)
   ○ Medium (100-10,000 users)
   ○ Large (10,000-1M users)
   ○ Enterprise (>1M users)
   ○ Not sure yet
```

---

## Phase 2: Planning Questions

### Technology Decisions

```
**Q1: For user authentication, which approach?**
   ○ Build custom (email/password)
   ○ Use OAuth2 providers (Google, GitHub, etc.)
   ○ Use auth service (Auth0, Clerk, Supabase)
   ○ Passwordless (magic links)
   ○ Let me recommend based on requirements

**Q2: For the database layer?**
   ○ SQL (PostgreSQL, MySQL)
   ○ NoSQL (MongoDB, DynamoDB)
   ○ Use existing database: [which?]
   ○ Let me recommend based on requirements
   ○ Other: [specify]

**Q3: Deployment preference?**
   ○ Serverless (Vercel, Netlify, AWS Lambda)
   ○ Containers (Docker, Kubernetes)
   ○ Traditional VPS
   ○ On-premise
   ○ Let me recommend
```

### Architecture Choices

```
**Q1: Frontend architecture preference?**
   ○ Server-rendered (Next.js SSR)
   ○ Static generation (Next.js SSG)
   ○ Client-side SPA (React, Vue)
   ○ Native mobile (iOS/Android)
   ○ Let me recommend

**Q2: API style preference?**
   ○ REST
   ○ GraphQL
   ○ gRPC
   ○ tRPC
   ○ Let me recommend

**Q3: How important is offline support?**
   ○ Critical (must work offline)
   ○ Nice to have
   ○ Not needed
   ○ Not sure
```

---

## Handling Responses

### User Answers

After user responds:
1. **Acknowledge** the answers
2. **Summarize** understanding
3. **Proceed** with updated context
4. **Store** answers in specification/blueprint

```
Thank you for the clarification!

**Understanding:**
- Goal: [summarized]
- Users: [summarized]
- Constraints: [summarized]

Proceeding with this context...
```

### User Rejects Questions

If user says "wrong direction" or rejects:

```
I understand these questions aren't what you need. 

What would you like me to focus on instead?
- [Suggestion A]
- [Suggestion B]
- Tell me in your own words
```

---

## MCP Integration (Optional)

For enhanced UX with CLI-based question interface:

### Setup

Add to `.mcp.json`:
```json
{
  "mcpServers": {
    "ask-user-questions": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "auq-mcp-server", "server"]
    }
  }
}
```

### Benefits with MCP

- Clean CLI interface for answering
- Arrow-key navigation
- Question queuing
- Works with parallel agents

---

## Natural Language Triggers

| Say this... | Action |
|-------------|--------|
| "Ask me questions" | Generate clarifying questions |
| "What do you need to know?" | Generate clarifying questions |
| "Wrong direction" | Redirect questions |
| "Skip questions" | Proceed with assumptions (note in log) |

---

## Best Practices

1. **Batch questions** - Ask 3-5 related questions at once
2. **Provide defaults** - Show recommended option when clear
3. **Include "Other"** - Always allow custom answers
4. **Be specific** - Avoid vague questions
5. **Explain impact** - Help user understand why it matters
6. **Accept "not sure"** - Don't force premature decisions

---

## Version

| Component | Version |
|-----------|---------|
| Clarifying Questions | 1.0.0 |
| Last Updated | 2026-01-27 |
