# Natural Language Intent Detection

> **Purpose:** Allows users to interact with CodeMaestro using natural language instead of slash commands.
> **Load Priority:** Reference at session start from `00-core.md`

---

## Overview

CodeMaestro supports natural language requests as an alternative to slash commands. This provides a more intuitive interface and works reliably across different Claude Code environments where slash commands may not be recognized.

---

## Intent Mapping

### Navigation Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `show_status` | "what's my status", "current progress", "where am I", "show progress" | `/status` |
| `next_task` | "next task", "what's next", "continue work", "what should I do" | `/next` |
| `load_task` | "load task T-X.X.X", "work on T-X.X.X", "start T-X.X.X" | `/task T-X.X.X` |
| `show_tree` | "show task tree", "show dependencies", "visualize tasks" | `/tree` |
| `change_phase` | "go to phase N", "start phase N", "move to planning" | `/phase N` |

### Knowledge Base Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `kb_search` | "search knowledge base", "find pattern", "look up failure", "search for [topic]" | `/kb search [query]` |
| `kb_add_pattern` | "save this pattern", "add to knowledge base", "remember this approach" | `/kb add pattern` |
| `kb_add_failure` | "document this failure", "record this issue", "save failure pattern" | `/kb add failure` |
| `kb_list` | "show knowledge base", "list patterns", "what have we learned" | `/kb list` |

### Git Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `generate_commit` | "generate commit", "commit my changes", "create commit message", "save my work" | `/commit` |
| `show_git_status` | "git status", "what changed", "show changes" | `/git-status` |
| `create_checkpoint` | "create checkpoint", "pause for review", "checkpoint my work" | `/checkpoint` |
| `recover_session` | "recover session", "restore context", "where were we" | `/recover` |

### Code Generation Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `generate_test` | "generate test", "create test stub", "test for AC-X.X", "make tests" | `/generate test [AC-ID]` |
| `generate_scaffold` | "scaffold project", "create structure", "initialize [domain] project" | `/scaffold [domain]` |
| `generate_cicd` | "generate pipeline", "create CI/CD", "set up automation" | `/generate ci-cd` |

### Token Management Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `check_budget` | "check budget", "token usage", "how much context left" | `/budget` |
| `estimate_task` | "estimate T-X.X.X", "how long for this task", "token estimate" | `/estimate task [ID]` |
| `check_variance` | "variance analysis", "estimation accuracy", "how accurate were we" | `/variance` |

### Verification Intents

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `verify_quality` | "verify my changes", "run quality checks", "check everything" | `/validate quality` |
| `security_scan` | "security scan", "check for vulnerabilities", "audit security" | `/security scan` |
| `run_tests` | "run tests", "check test coverage", "validate tests" | `/validate tests` |

### Research Intents (MCP Tools)

| Intent | Natural Language Triggers | Equivalent Command |
|--------|--------------------------|-------------------|
| `research_topic` | "research [topic]", "look up [library]", "find documentation" | `/research [topic]` |
| `lookup_api` | "lookup [library] API", "get [library] docs", "how to use [library]" | `/lookup [library]` |
| `validate_api` | "does [method] exist in [library]", "confirm API", "verify [library] has [method]" | `/validate api [lib] [method]` |

---

## Detection Algorithm

### Priority Order

1. **Exact Match**: Direct mapping to intent (highest confidence)
2. **Keyword Overlap**: >80% keyword match with known triggers
3. **Semantic Similarity**: Fuzzy match using context understanding
4. **Fallback**: Ask for clarification if confidence < 50%

### Response Format

When detecting a natural language intent:

```
═══════════════════════════════════════════════════════════════
📝 INTENT DETECTED
───────────────────────────────────────────────────────────────
   Request: "[User's natural language]"
   Intent: [Detected intent]
   Action: [What will be executed]
   Confidence: [High/Medium/Low]
═══════════════════════════════════════════════════════════════
```

If confidence is Low:
```
I understood you might want to [detected intent]. 

Did you mean:
1. [Option A] - [description]
2. [Option B] - [description]
3. Something else

Please clarify or type the number.
```

---

## Backward Compatibility

Slash commands (`/kb`, `/commit`, `/generate`, etc.) continue to work. Natural language is an **additional** interface, not a replacement.

**Priority:**
1. If input starts with `/`, treat as command
2. Otherwise, apply natural language detection

---

## Phase-Specific Intents

### Phase 1 (Requirements)
- "analyze requirements", "competitive analysis", "lock specification"

### Phase 2 (Planning)
- "create blueprint", "design architecture", "break down tasks"

### Phase 3 (Implementation)
- "implement T-X.X.X", "write code for", "build module"

### Phase 4 (Verification)
- "run verification", "collect evidence", "check quality gates"

### Phase 5 (Release)
- "prepare release", "generate changelog", "lessons learned"

---

## Examples

### User says: "Search the knowledge base for authentication patterns"

```
═══════════════════════════════════════════════════════════════
📝 INTENT DETECTED
───────────────────────────────────────────────────────────────
   Request: "Search the knowledge base for authentication patterns"
   Intent: kb_search
   Action: Searching KB for "authentication"
   Confidence: High
═══════════════════════════════════════════════════════════════

Searching knowledge base...

Found 3 entries:
1. [P-007] OAuth2 Implementation Pattern (Phase 3, 2026-01-15)
2. [F-012] JWT Token Expiry Issue (Phase 4, 2026-01-18)
3. [D-003] Session vs Token Decision (Phase 2, 2026-01-10)

Use "/kb view [ID]" or "show me [ID]" to view details.
```

### User says: "Generate a commit for my changes"

```
═══════════════════════════════════════════════════════════════
📝 INTENT DETECTED
───────────────────────────────────────────────────────────────
   Request: "Generate a commit for my changes"
   Intent: generate_commit
   Action: Generating commit message based on staged changes
   Confidence: High
═══════════════════════════════════════════════════════════════

Analyzing changes...

Suggested commit message:

feat(auth): Add user login validation

Role: Senior Developer
Phase: 3 (Implementation)
Task: T-2.3.1

- Add email format validation
- Implement password strength check
- Add rate limiting for failed attempts

Closes #123

Would you like me to:
1. Use this message (confirm)
2. Edit the message
3. Show preview only
```

---

## Version

| Component | Version |
|-----------|---------|
| Natural Language Detection | 1.0.0 |
| Last Updated | 2026-01-27 |
