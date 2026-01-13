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
| [product-manager.md](roles/product-manager.md) | Product Manager role details | Phase 1 role activation |
| [mcp-tools.md](mcp-tools.md) | MCP tool usage (Context7, WebSearch) | Phase 1 Step 1.6 (competitive research) |

### Phase 2: Planning

| File | Purpose | Load When |
|------|---------|-----------|
| [02-planning.md](../prompts/02-planning.md) | Phase 2 workflow | Phase 2 start |
| [02-planning-templates.md](../prompts/02-planning-templates.md) | Phase 2 templates (or domain-specific) | On-demand (Step 2.5-2.11) |
| [software-architect.md](roles/software-architect.md) | Software Architect role details | Phase 2 role activation |
| [ethics-security-engineer.md](roles/ethics-security-engineer.md) | Ethics & Security Engineer role | Phase 2 Step 2.6 (threat modeling) |
| [domain-scaffolding.md](domain-scaffolding.md) **OR** domain-specific files | Domain-specific scaffolding | Phase 2 Step 2.3.5 (auto-detect domain) |
| [ai-estimation.md](ai-estimation.md) | AI-powered task estimation | Phase 2 Step 2.9 (task generation) - **Optional** |
| [visual-task-dag.md](visual-task-dag.md) | Task DAG visualization | Phase 2 Step 2.7 (`/tree --visual`) |

### Phase 3: Implementation

| File | Purpose | Load When |
|------|---------|-----------|
| [03-implementation.md](../prompts/03-implementation.md) | Phase 3 workflow | Phase 3 start |
| [03-implementation-templates.md](../prompts/03-implementation-templates.md) | Phase 3 templates | On-demand (Step 3.3-3.8) |
| [senior-developer.md](roles/senior-developer.md) | Senior Developer role details | Phase 3 role activation |
| [git-automation.md](git-automation.md) | Automated git commits | Phase 3 Step 3.3.9 (`/commit --auto`) |
| [code-generation-from-ac.md](code-generation-from-ac.md) | Test stub generation | Phase 3 Step 3.3.1b (`/generate test`) |
| [cicd-generation.md](cicd-generation.md) | CI/CD pipeline generation | Phase 3 (`/generate ci-cd`) - **Optional** |

### Phase 4: Verification

| File | Purpose | Load When |
|------|---------|-----------|
| [04-verification.md](../prompts/04-verification.md) | Phase 4 workflow | Phase 4 start |
| [04-verification-templates.md](../prompts/04-verification-templates.md) | Phase 4 templates | On-demand (Step 4.2-4.6) |
| [qa-lead.md](roles/qa-lead.md) | QA Lead role details | Phase 4 role activation |
| [data-interpreter.md](roles/data-interpreter.md) | Data Interpreter role | Phase 4 Step 4.6.5 (visual insights) |
| [ethics-security-engineer.md](roles/ethics-security-engineer.md) | Ethics & Security Engineer role | Phase 4 Step 4.4.5 (ethical validation) |
| [quality-gates.md](quality-gates.md) | Quality gate thresholds | Phase 4 Step 4.2 (GO/NO-GO decision) |
| [security-scanning.md](security-scanning.md) | Security vulnerability scanning | Phase 4 Step 4.3 (`/security scan`) |
| [ethics-validation.md](ethics-validation.md) | Ethics & compliance validation | Phase 4 Step 4.4.5 (`/ethics scan`) - **Conditional** |
| [performance-baseline.md](performance-baseline.md) | Performance baseline tracking | Phase 4 Step 4.4 (`/benchmark establish`) - **Conditional** |

### Phase 5: Release

| File | Purpose | Load When |
|------|---------|-----------|
| [05-master-control.md](../prompts/05-master-control.md) | Phase 5 workflow | Phase 5 start |
| [05-master-control-templates.md](../prompts/05-master-control-templates.md) | Phase 5 templates | On-demand (Step 5.A-5.C) |
| [release-manager.md](roles/release-manager.md) | Release Manager role details | Phase 5 role activation |
| [data-interpreter.md](roles/data-interpreter.md) | Data Interpreter role | Phase 5 Step 5.A.7 (monitoring visuals) |
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
| [phase-init-wizard.md](phase-init-wizard.md) | Phase initialization wizard | `/init-phase` command |
| [skill-tier-optimization.md](skill-tier-optimization.md) | Skill tier adaptation strategies | Phase 1 onboarding (skill tier selection) |
| [multi-project-kb.md](multi-project-kb.md) | Knowledge base management | `/kb` commands or Phase 5 export |
| [ai-estimation.md](ai-estimation.md) | AI-powered estimation | `/estimate suggest`, `/estimate track`, `/estimate analyze` |
| [cicd-generation.md](cicd-generation.md) | CI/CD pipeline generation | `/generate ci-cd` command |
| [code-generation-from-ac.md](code-generation-from-ac.md) | Test stub generation | `/generate test` command |
| [git-automation.md](git-automation.md) | Automated git workflows | `/commit --auto` command |
| [security-scanning.md](security-scanning.md) | Security vulnerability scanning | `/security scan` command |

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

## Role Loading Strategy

Roles are loaded **on-activation**, not eagerly at system start:

| Role File | When to Load |
|-----------|--------------|
| [product-manager.md](roles/product-manager.md) | Phase 1 start |
| [software-architect.md](roles/software-architect.md) | Phase 2 start |
| [senior-developer.md](roles/senior-developer.md) | Phase 3 start |
| [qa-lead.md](roles/qa-lead.md) | Phase 4 start |
| [release-manager.md](roles/release-manager.md) | Phase 5 start |
| [ethics-security-engineer.md](roles/ethics-security-engineer.md) | Phase 2 Step 2.6 OR Phase 4 Step 4.4.5 (consultation) |
| [data-interpreter.md](roles/data-interpreter.md) | Phase 4 Step 4.6.5 OR Phase 5 Step 5.A.7 (consultation) |

**Note:** Full role files (~260 lines each) are loaded only when role is activated. Before activation, use compressed 3-4 line summaries in `00-core.md`.

---

## Loading Best Practices

1. **Progressive Disclosure:** Load only what's needed for current phase
2. **Conditional Loading:** Skip configs not relevant to project (e.g., ethics, performance)
3. **Reference, Don't Inline:** Use constraint IDs (A1-E33) instead of full text
4. **Template Loading:** Load template files on-demand when generating artifacts
5. **Role Activation:** Load full role files only when role is actively consulted
6. **Domain Adaptation:** Load domain-specific configs (mobile/web/cloud/ai) not universal files

---

## Token Optimization Summary

| Loading Strategy | Token Usage | Files Loaded |
|------------------|-------------|--------------|
| **Always-Load** | ~1,500 words | 1 file (00-core.md) |
| **Phase Load** | ~1,300 words | 1 file per phase (0N-phase.md) |
| **Template On-Demand** | ~1,100-3,300 words | 1 file when artifact needed |
| **Role On-Activation** | ~8,000 words | 1 primary + 0-2 consulting roles |
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
- ✅ Load: 00-core.md, 02-planning.md, software-architect.md
- ⏳ Defer: 02-planning-templates.md (until Step 2.5)
- ❌ Skip: ethics-validation.md (unless ethics requirements)
- ❌ Skip: ai-estimation.md (unless `/estimate` command used)

---

## Related Documentation

- [COMMANDS-CORE.md](../../COMMANDS-CORE.md) - Core command reference
- [COMMANDS-ADVANCED.md](../../COMMANDS-ADVANCED.md) - Phase F advanced commands
- [CLAUDE.md](../../CLAUDE.md) - Developer guide and architecture overview
