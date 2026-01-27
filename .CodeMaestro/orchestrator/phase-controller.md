---
name: phase-controller
description: Central orchestrator managing phase transitions, agent invocation, and quality gates
version: 1.0.0
---

# Phase Controller

The Phase Controller is the central orchestrator for CodeMaestro's agent-based architecture. It manages state, invokes agents, enforces quality gates, and coordinates handoffs between phases.

---

## State Management

### Session State Schema

```yaml
session:
  id: {uuid}
  project_name: {string}
  created_at: {timestamp}

  # Persisted across all agents
  skill_tier: beginner | advanced | ninja
  domain: mobile | web | cloud | ai | general

  # Phase tracking
  current_phase: 1 | 2 | 3 | 4 | 5
  phase_status: in_progress | blocked | completed

  # Artifact registry
  artifacts:
    phase_1:
      - path: docs/locked-specification-v1.0.md
        type: specification
        status: locked
    phase_2:
      - path: docs/blueprint-v1.0.md
        type: blueprint
        status: approved
    # ... continues for each phase

  # Quality gate status
  quality_gates:
    phase_1: { passed: true, timestamp: ... }
    phase_2: { passed: true, timestamp: ... }
    phase_3: { passed: false, blockers: [...] }

  # Active agents
  active_agents: []
  agent_history: []
```

---

## Agent Registry

### Available Agents

| Agent | Phase(s) | Model | Primary Purpose |
|-------|----------|-------|-----------------|
| product-manager | 1 | sonnet | Requirements gathering, specification |
| architect | 2 | opus | System design, technology decisions |
| planner | 2, 3 | sonnet | Task breakdown, implementation planning |
| developer | 3 | sonnet | Code implementation |
| code-reviewer | 3, 4 | sonnet | Quality analysis |
| qa-lead | 4 | sonnet | Testing, evidence collection |
| security-engineer | 2, 4 | opus | Security analysis, threat modeling |
| data-interpreter | 4, 5 | sonnet | Metrics visualization |
| release-manager | 5 | haiku | Release coordination |

### Agent Invocation

```yaml
invoke_agent:
  name: {agent-name}
  context:
    skill_tier: {from session}
    domain: {from session}
    phase: {current phase}
    artifacts: {relevant artifact paths only}
    task: {specific task description}
  constraints:
    max_tokens: {based on agent}
    tools: {from agent definition}
    model: {from agent definition}
```

---

## Phase Definitions

### Phase 1: Requirements

**Owner:** product-manager
**Supporting:** (none)

**Entry Criteria:**
- Project idea or requirement provided

**Exit Criteria (Quality Gate):**
- [ ] All FRs have IDs and descriptions
- [ ] All NFRs have measurable targets
- [ ] Every FR has acceptance criteria
- [ ] Competitive analysis completed
- [ ] Specification status: LOCKED

**Artifacts Produced:**
- `docs/locked-specification-v1.0.md`
- `docs/competitive-analysis.md`

---

### Phase 2: Planning

**Owner:** architect
**Supporting:** planner, security-engineer

**Entry Criteria:**
- Phase 1 quality gate passed
- Locked specification available

**Exit Criteria (Quality Gate):**
- [ ] Blueprint complete with all components
- [ ] Technology stack justified
- [ ] Task DAG created
- [ ] All tasks < 16 hours
- [ ] Security threat model complete
- [ ] ADRs documented

**Artifacts Produced:**
- `docs/blueprint-v1.0.md`
- `docs/task-dag-v1.0.md`
- `docs/gantt-timeline-v1.0.md`
- `docs/architecture/decisions/ADR-*.md`
- `docs/security/threat-model.md`

---

### Phase 3: Implementation

**Owner:** developer
**Supporting:** code-reviewer, planner

**Entry Criteria:**
- Phase 2 quality gate passed
- Blueprint and task DAG available

**Exit Criteria (Quality Gate):**
- [ ] All tasks completed
- [ ] Test coverage >= 70%
- [ ] Linter passes (0 errors)
- [ ] Code review completed
- [ ] No critical/high security issues

**Artifacts Produced:**
- Production code
- Test suites
- Module context documents

---

### Phase 4: Verification

**Owner:** qa-lead
**Supporting:** security-engineer, code-reviewer, data-interpreter

**Entry Criteria:**
- Phase 3 quality gate passed
- All code implemented

**Exit Criteria (Quality Gate):**
- [ ] All tests passing
- [ ] Coverage >= 70%
- [ ] Security scan: 0 critical/high
- [ ] Performance meets NFRs
- [ ] Evidence package complete
- [ ] GO decision recorded

**Artifacts Produced:**
- `docs/evidence-package.md`
- `docs/security/scan-report.md`
- `docs/test-results.md`

---

### Phase 5: Release

**Owner:** release-manager
**Supporting:** data-interpreter

**Entry Criteria:**
- Phase 4 quality gate passed
- GO decision confirmed

**Exit Criteria (Quality Gate):**
- [ ] Release package created
- [ ] Deployment successful
- [ ] Lessons learned documented
- [ ] Knowledge base updated

**Artifacts Produced:**
- `docs/release-notes.md`
- `docs/lessons-learned.md`
- Knowledge base entries

---

## Quality Gate Enforcement

### Gate Check Process

```
┌─────────────────────────────────────────────────────┐
│              QUALITY GATE CHECK                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. Load gate criteria for current phase            │
│  2. For each criterion:                             │
│     - Verify artifact exists                        │
│     - Validate content meets requirements           │
│     - Record pass/fail with evidence                │
│  3. If ALL pass:                                    │
│     - Record gate passage                           │
│     - Enable phase transition                       │
│  4. If ANY fail:                                    │
│     - Block transition                              │
│     - Report blockers to user                       │
│     - Suggest remediation                           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Gate Override

Quality gates can only be overridden with explicit user approval:

```yaml
gate_override:
  phase: 3
  blockers:
    - "Test coverage at 65% (required: 70%)"
  user_approval: true
  justification: "Legacy code excluded from coverage"
  timestamp: ...
```

---

## Agent Coordination

### Sequential Flow (Default)

```
Phase 1: product-manager ──────────────────────────► Gate 1
                                                        │
Phase 2: architect ◄────────────────────────────────────┘
         ├── planner (parallel)
         └── security-engineer (parallel) ─────────► Gate 2
                                                        │
Phase 3: developer ◄────────────────────────────────────┘
         └── code-reviewer (after each task) ──────► Gate 3
                                                        │
Phase 4: qa-lead ◄──────────────────────────────────────┘
         ├── security-engineer (parallel)
         └── data-interpreter (parallel) ──────────► Gate 4
                                                        │
Phase 5: release-manager ◄──────────────────────────────┘
         └── data-interpreter ─────────────────────► Gate 5
```

### Parallel Agent Execution

Within a phase, independent agents can run in parallel:

```yaml
parallel_execution:
  phase: 2
  agents:
    - name: planner
      task: "Create task DAG from blueprint"
      depends_on: [architect.blueprint]
    - name: security-engineer
      task: "Create threat model"
      depends_on: [architect.blueprint]
  join: "Both must complete before Gate 2"
```

---

## Error Handling

### Agent Failure

```yaml
on_agent_failure:
  action: retry | escalate | abort
  retry:
    max_attempts: 2
    backoff: exponential
  escalate:
    to: user
    with: error_context
  abort:
    rollback: true
    preserve: artifacts
```

### Gate Failure

```yaml
on_gate_failure:
  action: block
  report:
    blockers: [list of failed criteria]
    suggestions: [remediation steps]
  options:
    - "Fix and retry"
    - "Override with justification"
    - "Abort phase"
```

---

## Commands

### Phase Commands

| Command | Action |
|---------|--------|
| `/status` | Show current phase, agent, and progress |
| `/next` | Proceed to next task or phase |
| `/gate` | Check quality gate for current phase |
| `/phase {n}` | Jump to specific phase (if gates passed) |

### Agent Commands

| Command | Action |
|---------|--------|
| `/invoke {agent}` | Manually invoke specific agent |
| `/agents` | List available agents for current phase |
| `/handoff` | Trigger handoff to next agent |

### State Commands

| Command | Action |
|---------|--------|
| `/state` | Show full session state |
| `/artifacts` | List all artifacts |
| `/history` | Show agent invocation history |

---

## Integration Points

### With Existing Systems

- **Natural Language Interface**: Maps user intent to agent invocation
- **Continuous Learning**: Captures patterns from agent interactions
- **Verification Loop**: Invokes code-reviewer and security-engineer

### With MCP Tools

Orchestrator routes MCP tool access based on agent permissions:

```yaml
tool_routing:
  Context7: [architect, developer]
  WebSearch: [product-manager, architect, security-engineer]
  WebFetch: [product-manager, architect]
  Bash: [developer, qa-lead, release-manager]
  # Read, Grep, Glob available to all agents
```

---

## Version

**Version:** 1.0.0
**Last Updated:** 2026-01-27
