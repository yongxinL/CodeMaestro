# Config Quick Reference

**Quick index of all configuration files - Load files only when needed for token efficiency**

---

## Always-Loaded Configs

These are essential system configs loaded in every session:

| File | Purpose | When to Load |
|------|---------|--------------|
| [00-core.md](../prompts/00-core.md) | System configuration, roles, constraints, thresholds | **Every session** (prerequisite) |

---

## Phase-Specific Configs

Load these configs based on the current phase:

### Phase 1: Requirements

| File | Purpose | Load When |
|------|---------|-----------|
| [01-requirement.md](../prompts/01-requirement.md) | Phase 1 workflow | Phase 1 start |
| [01-requirement-templates.md](../prompts/01-requirement-templates.md) | Phase 1 templates | On-demand (Step 1.3-1.6) |
| [product-manager.md](../agents/product-manager.md) | Product Manager agent | Phase 1 start |
| [mcp-tools.md](mcp-tools.md) | MCP tool usage (Context7, WebSearch) | Phase 1 Step 1.6 (competitive research) |

### Phase 2: Planning

| File | Purpose | Load When |
|------|---------|-----------|
| [02-planning.md](../prompts/02-planning.md) | Phase 2 workflow | Phase 2 start |
| [02-planning-templates.md](../prompts/02-planning-templates.md) | Phase 2 templates (or domain-specific) | On-demand (Step 2.5-2.11) |
| [architect.md](../agents/architect.md) | Software Architect agent | Phase 2 start |
| [security-engineer.md](../agents/security-engineer.md) | Security Engineer agent | Phase 2 Step 2.6 (threat modeling) |
| [domain-scaffolding.md](domain-scaffolding.md) **OR** domain-specific files | Domain-specific scaffolding | Phase 2 Step 2.3.5 (auto-detect domain) |
| [token-estimation.md](token-estimation.md) | Task token estimation | Phase 2 Step 2.9 (task generation) |
| [visual-task-dag.md](visual-task-dag.md) | Task DAG visualization | Phase 2 Step 2.7 ("Show task tree") |

### Phase 3: Implementation

| File | Purpose | Load When |
|------|---------|-----------|
| [03-implementation.md](../prompts/03-implementation.md) | Phase 3 workflow | Phase 3 start |
| [03-implementation-templates.md](../prompts/03-implementation-templates.md) | Phase 3 templates | On-demand (Step 3.3-3.8) |
| [developer.md](../agents/developer.md) | Senior Developer agent | Phase 3 start |
| [git-automation.md](git-automation.md) | Automated git commits | Phase 3 Step 3.3.9 ("Generate commit") |
| [code-generation-from-ac.md](code-generation-from-ac.md) | Test stub generation | Phase 3 Step 3.3.1b ("Generate tests") |
| [cicd-generation.md](cicd-generation.md) | CI/CD pipeline generation | Phase 3 ("Generate CI/CD pipeline") - **Optional** |

### Phase 4: Verification

| File | Purpose | Load When |
|------|---------|-----------|
| [04-verification.md](../prompts/04-verification.md) | Phase 4 workflow | Phase 4 start |
| [04-verification-templates.md](../prompts/04-verification-templates.md) | Phase 4 templates | On-demand (Step 4.2-4.6) |
| [qa-lead.md](../agents/qa-lead.md) | QA Lead agent | Phase 4 start |
| [data-interpreter.md](../agents/data-interpreter.md) | Data Interpreter agent | Phase 4 Step 4.6.5 (visual insights) |
| [security-engineer.md](../agents/security-engineer.md) | Security Engineer agent | Phase 4 Step 4.4.5 (ethical validation) |
| [quality-gates.md](quality-gates.md) | Quality gate thresholds | Phase 4 Step 4.2 (GO/NO-GO decision) |
| [security-scanning.md](security-scanning.md) | Security vulnerability scanning | Phase 4 Step 4.3 (`/security scan`) |
| [ethics-validation.md](ethics-validation.md) | Ethics & compliance validation | Phase 4 Step 4.4.5 (`/ethics scan`) - **Conditional** |
| [performance-baseline.md](performance-baseline.md) | Performance baseline tracking | Phase 4 Step 4.4 (`/benchmark establish`) - **Conditional** |

### Phase 5: Release

| File | Purpose | Load When |
|------|---------|-----------|
| [05-master-control.md](../prompts/05-master-control.md) | Phase 5 workflow | Phase 5 start |
| [05-master-control-templates.md](../prompts/05-master-control-templates.md) | Phase 5 templates | On-demand (Step 5.A-5.C) |
| [release-manager.md](../agents/release-manager.md) | Release Manager agent | Phase 5 start |
| [data-interpreter.md](../agents/data-interpreter.md) | Data Interpreter agent | Phase 5 Step 5.A.7 (monitoring visuals) |
| [multi-project-kb.md](multi-project-kb.md) | Multi-project knowledge base | Phase 5 Step 5.B.3 (`/kb export`) |

---

## Reference Configs (Load By ID Only)

These configs are referenced by ID or section name, not loaded in full:

| File | Purpose | Reference Method |
|------|---------|------------------|
| [constraints-reference.md](constraints-reference.md) | Complete constraint list (A1-E33) | Reference by constraint ID (e.g., "See constraint A7") |
| [git-commands.md](git-commands.md) | Git workflow templates | Reference by section (e.g., `#PHASE_COMPLETE`, `#TASK_FAILURE`) |

---

## On-Demand Configs (Load Only When Explicitly Requested)

These configs are optional and loaded only when the user or workflow explicitly requests them:

| File | Purpose | Load When |
|------|---------|-----------|
| [phase-init-wizard.md](phase-init-wizard.md) | Phase initialization wizard | "Start Phase [N]" or "Initialize phase" |
| [skill-tier-optimization.md](skill-tier-optimization.md) | Skill tier adaptation strategies | Phase 1 onboarding (skill tier selection) |
| [multi-project-kb.md](multi-project-kb.md) | Knowledge base management | "Search KB" or Phase 5 export |
| [cicd-generation.md](cicd-generation.md) | CI/CD pipeline generation | "Generate CI/CD pipeline" |
| [code-generation-from-ac.md](code-generation-from-ac.md) | Test stub generation | "Generate tests for [AC]" |
| [git-automation.md](git-automation.md) | Automated git workflows | "Generate commit" |
| [security-scanning.md](security-scanning.md) | Security vulnerability scanning | "Security scan" |
| [handoff-messages.md](handoff-messages.md) | Session handoff guidance (core structure) | Phase transitions, session resume |
| [templates/handoff-phase-templates.md](templates/handoff-phase-templates.md) | Phase-specific handoff templates | On-demand when creating phase transition handoffs |
| [token-estimation.md](token-estimation.md) | Token budget management | All phases (budget tracking) |
| [thresholds.md](thresholds.md) | Quality gate thresholds (single source of truth) | Phase 3-4 (quality validation) |
| [model-selection.md](model-selection.md) | Model selection criteria (Haiku/Sonnet/Opus) | All phases (model decisions) |

---

## Conditional Configs (Load Only If Relevant)

These configs should only load when specific project requirements exist:

| File | Purpose | Load When |
|------|---------|-----------|
| [ethics-validation.md](ethics-validation.md) | Ethics & compliance validation | **If** project has ethics requirements (GDPR, WCAG, ML fairness) |
| [performance-baseline.md](performance-baseline.md) | Performance baseline tracking | **If** project has performance NFRs (non-functional requirements) |
| [domain-scaffolding.md](domain-scaffolding.md) | Domain-specific scaffolding | **If** `/scaffold` command used OR Phase 2 Step 2.3.5 |

**Optimization Tip:** For domain-scaffolding, prefer domain-specific files if available:
- `domain-scaffolding-mobile.md` (Mobile projects only)
- `domain-scaffolding-web.md` (Web projects only)
- `domain-scaffolding-cloud.md` (Cloud/backend projects only)
- `domain-scaffolding-ai.md` (AI/ML projects only)

---

## Agent Loading Strategy

Agents are invoked **on-demand** via the orchestrator:

| Agent File | When to Invoke |
|-----------|--------------|
| [product-manager.md](../agents/product-manager.md) | Phase 1 start |
| [architect.md](../agents/architect.md) | Phase 2 start |
| [planner.md](../agents/planner.md) | Phase 2 (task breakdown), Phase 3 (implementation planning) |
| [developer.md](../agents/developer.md) | Phase 3 start |
| [code-reviewer.md](../agents/code-reviewer.md) | Phase 3 (on-demand), Phase 4 (quality review) |
| [qa-lead.md](../agents/qa-lead.md) | Phase 4 start |
| [security-engineer.md](../agents/security-engineer.md) | Phase 2 Step 2.6 OR Phase 4 Step 4.4.5 (consultation) |
| [data-interpreter.md](../agents/data-interpreter.md) | Phase 4 Step 4.6.5 OR Phase 5 Step 5.A.7 (consultation) |
| [release-manager.md](../agents/release-manager.md) | Phase 5 start |

**Note:** Agent files (~200-280 lines each) are invoked with minimal context via handoff protocol. See `orchestrator/phase-controller.md` for agent registry and invocation patterns.

---

## Loading Best Practices

1. **Progressive Disclosure:** Load only what's needed for current phase
2. **Conditional Loading:** Skip configs not relevant to project (e.g., ethics, performance)
3. **Reference, Don't Inline:** Use constraint IDs (A1-E33) instead of full text
4. **Template Loading:** Load template files on-demand when generating artifacts
5. **Agent Invocation:** Invoke agents with minimal context via orchestrator handoff protocol
6. **Domain Adaptation:** Load domain-specific configs (mobile/web/cloud/ai) not universal files

---

## Token Optimization Summary

| Loading Strategy | Token Usage | Files Loaded |
|------------------|-------------|--------------|
| **Always-Load** | ~1,500 words | 1 file (00-core.md) |
| **Phase Load** | ~1,300 words | 1 file per phase (0N-phase.md) |
| **Template On-Demand** | ~1,100-3,300 words | 1 file when artifact needed |
| **Agent On-Invocation** | ~4,000 words | 1 primary + 0-2 consulting agents (via handoff) |
| **Config Conditional** | Varies | Only when relevant to project |

**Target:** 50-55% token reduction vs. loading all configs

**Achieved:** ~58% reduction through progressive disclosure

---

## Quick Lookup

**Need to know when to load a config?**
1. Check the phase you're in (1-5)
2. Look up the phase section above
3. Load configs marked "Load When" matches your current step
4. Skip configs marked "**Conditional**" unless requirements exist
5. Skip configs marked "**Optional**" unless explicitly requested

**Example (Phase 2 start):**
- ✅ Load: 00-core.md, 02-planning.md
- ✅ Invoke: architect agent (via orchestrator)
- ⏳ Defer: 02-planning-templates.md (until Step 2.5)
- ❌ Skip: ethics-validation.md (unless ethics requirements)

---

## Related Documentation

- [.CodeMaestro/docs/INTERACTIONS-CORE.md](../../.CodeMaestro/docs/INTERACTIONS-CORE.md) - Core interactions reference
- [.CodeMaestro/docs/INTERACTIONS-ADVANCED.md](../../.CodeMaestro/docs/INTERACTIONS-ADVANCED.md) - Advanced interactions
- [CLAUDE.md](../../CLAUDE.md) - Developer guide and architecture overview
