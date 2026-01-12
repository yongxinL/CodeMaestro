# Phase 5: Master Control and Release

> **Prerequisite**: Load `./docs/prompts/00-core.md` first.
> **Primary Role**: Release Manager
> **Supporting Roles**: Project Manager, DevOps Engineer, Data Interpreter [NEW v1.0]
> **Objective**: Orchestrate release, persist knowledge, monitor production, and control iteration loops.

---

## Role Activation

```
═══════════════════════════════════════════════════════════════
🎭 ROLE ACTIVATION
───────────────────────────────────────────────────────────────
   Activating:   Release Manager (Primary)
   Supporting:   Project Manager, DevOps Engineer,
                 Data Interpreter (continued)
   Phase:        5: Master Control and Release
   Skill Tier:   [Tier] → [Adaptation behavior]
   
   Loading role: config/roles/release-manager.md
═══════════════════════════════════════════════════════════════
```

### Release Manager Mindset

Load full role definition: `view /mnt/project/config/roles/release-manager.md`

**Quick Reference:**
- Prioritize **safety** over speed
- Ensure **documentation** completeness
- Control **version management** meticulously
- **Persist organizational knowledge** [NEW v1.0]
- **Initiate monitoring** [NEW v1.0]

---

## Entry Conditions

From Phase 4:
- **GO Decision** → Proceed to Success Workflow
- **NO-GO Decision** → Proceed to Failure/Replan Workflow

---

## Exit Conditions

**Success Path:**
- Release completed and tagged
- **Monitoring initiated** [NEW v1.0]
- **Knowledge Base updated** [NEW v1.0]
- Documentation finalized
- CHANGELOG published

**Failure/Replan Path:**
- **Context preserved in KB** [NEW v1.0]
- Replan artifacts created
- Iteration loop initiated

---

## Workflow Router

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 5 WORKFLOW ROUTER                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Phase 4 Decision:                                           │
│                                                             │
│   ✅ GO ──────────────→ Step 5.A: Success Workflow          │
│                         └─→ Release to Production           │
│                                                             │
│   ❌ NO-GO ───────────→ Step 5.B: Failure Workflow          │
│                         ├─→ 5.B.1: Fix and Retry            │
│                         ├─→ 5.B.2: Replan (Phase 2)         │
│                         └─→ 5.B.3: Revise Spec (Phase 1)    │
│                                                             │
│   🔄 ITERATION ───────→ Step 5.C: Iteration Workflow        │
│                         └─→ Incremental Release             │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 5.A: Success Workflow (GO Decision)

### 5.A.1: Pre-Release Verification

**Consult DevOps Engineer**:
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 DEVOPS CONSULTATION: Release Readiness                  │
├─────────────────────────────────────────────────────────────┤
│ 👤 DevOps Engineer:                                         │
│    - CI/CD pipeline status                                  │
│    - Deployment artifacts ready                             │
│    - Monitoring configured                                  │
│    - Rollback tested                                        │
└─────────────────────────────────────────────────────────────┘
```

**Checklist**:
- [ ] All tests passing in CI
- [ ] Evidence package complete
- [ ] CHANGELOG updated
- [ ] Documentation complete
- [ ] Rollback plan documented

---

### 5.A.2: Version Merge

```bash
git checkout develop
git pull origin develop

git checkout main
git merge develop --no-ff -m "Release v[X.Y.Z]

Role: Release Manager

[Summary]

Verification: v0.4.0-verify
Evidence: docs/verification/evidence-packages/v[X.Y.Z]-evidence.md"
```

---

### 5.A.3: Create Release Tag

**Load template:**
```
view /mnt/project/config/git-commands.md#RELEASE_TAG
```

```bash
git tag -a v[X.Y.Z] -m "Release v[X.Y.Z]
[Release details]"
```

---

### 5.A.4: Finalize Documentation

**Update**:
- PROJECT-SUMMARY.md
- Recovery checkpoint

---

### 5.A.5: Knowledge Persistence [NEW v1.0]

**Consult Project Manager**:
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 PROJECT MANAGER: Lessons Learned                        │
├─────────────────────────────────────────────────────────────┤
│ 👤 Project Manager:                                         │
│    - What went well?                                        │
│    - What could improve?                                    │
│    - Process improvements?                                  │
└─────────────────────────────────────────────────────────────┘
```

**Before generating, load template:**
```
view /mnt/project/05-master-control-templates.md#lessons-learned
```

**Create**: `docs/release/lessons-learned.md`

---

### 5.A.6: Knowledge Base Integration [NEW v1.0]

**Capture project learnings:**

**Store in Knowledge Base:**

1. **Successful Patterns**:
```
/kb add pattern
```
Document:
- Design patterns that worked
- Architecture decisions that paid off
- Performance optimizations
- Implementation approaches worth repeating

2. **Key Decisions**:
Update `knowledge-base/decisions/decision-index.md`:
- Cross-reference decision log entries
- Tag by category (architecture, technology, security)
- Note impact and outcomes

3. **Pattern Index**:
Create searchable index of all patterns discovered.

---

### 5.A.7: Initiate Post-Deployment Monitoring [NEW v1.0]

**After successful release:**

**Consult Data Interpreter** (continued from Phase 4):
```
┌─────────────────────────────────────────────────────────────┐
│ 🤝 DATA INTERPRETER: Production Monitoring Setup           │
├─────────────────────────────────────────────────────────────┤
│ 👤 Data Interpreter:                                        │
│    - Configure monitoring dashboards                        │
│    - Set up KPI collection                                  │
│    - Initialize alert thresholds                            │
│    - Continue performance visualization                     │
│    - Establish continuous baseline tracking                 │
└─────────────────────────────────────────────────────────────┘
```

**Consult DevOps Engineer**:
- Monitoring tool configuration (from monitoring-plan.md)
- Log aggregation setup
- Alert routing and escalation
- Dashboard deployment

**Actions**:
1. Deploy monitoring configuration
2. Verify KPI collection active
3. Test alert mechanisms
4. Generate initial production dashboard
5. Document monitoring runbook

---

### 5.A.8: Portfolio Generation (On-Demand) [NEW v1.0]

**When user requests** `/portfolio generate`:

**Load templates:**
```
view /mnt/project/portfolio/project-summary-template.md
view /mnt/project/portfolio/architecture-showcase-template.md
view /mnt/project/portfolio/implementation-highlights-template.md
view /mnt/project/portfolio/performance-report-template.md
```

**Generate four documents** with:
- Project data from specifications/blueprint
- **Performance visuals** from verification phase
- Decision highlights from decision-log
- Effort statistics from estimation-tracking
- Competitive positioning from competitive analysis

**Output to**: `docs/portfolio/generated/`

**Format**: Markdown (convertible to PDF/HTML as needed)

---

### 5.A.9: Human Checkpoint - Release Complete

**⏸️ CHECKPOINT: Release Complete**

> "As **Release Manager**, release is complete! 🎉
> 
> **Release**: v[X.Y.Z]
> **Branch**: main
> **Tag**: v[X.Y.Z]
> 
> **Enhancements Deployed**: [NEW v1.0]
> - ✅ Monitoring dashboards active
> - ✅ KPI collection configured
> - ✅ Knowledge Base updated ([N] patterns, [M] decisions)
> - ✅ Visual baselines established
> 
> **📁 Final Artifacts:**
> ```
> docs/CHANGELOG.md
> docs/PROJECT-SUMMARY.md
> docs/release/lessons-learned.md
> docs/knowledge-base/ (updated)
> docs/verification/performance-baselines/v[X.Y.Z]-visuals/
> ```
> 
> **🔀 Git Commands:**
> ```bash
> git push origin main
> git push origin v[X.Y.Z]
> 
> git checkout develop
> git merge main
> git push origin develop
> ```
> 
> **📊 On-Demand Available:**
> - Portfolio generation: `/portfolio generate`
> - Performance dashboards: Link to monitoring
> 
> **Next Options**:
> 1. **NEW ITERATION** - Start Phase 1 for new features
> 2. **PROJECT COMPLETE** - Archive and close
> 
> Congratulations! 🎉"

---

## Step 5.B: Failure Workflow (NO-GO Decision)

### 5.B.0: Failure Analysis

Determine failure type and recovery path.

---

### 5.B.1: Fix and Retry (Minor Issues)

**When**: Test failures, coverage gaps, minor security

**Process**:
```bash
git checkout develop
git checkout -b fix/v[X.Y.Z]-remediation

# After fixes
git commit -m "fix: Address verification failures
[Details]"

git checkout develop
git merge fix/v[X.Y.Z]-remediation
```

**Then**: Return to Phase 4.

---

### 5.B.2: Replan (Design Issues)

**When**: Architectural flaws, performance issues

**Tag current state:**
```bash
git tag -a v0.5.0-replan -m "Replan: Design issues
[Details]
Context: docs/implementation/context-packages/replan-v[X.Y.Z].md"
```

**Create replan context package:**

**Before generating, load template:**
```
view /mnt/project/05-master-control-templates.md#replan-context
```

**Create**: `implementation/context-packages/replan-v[X.Y.Z].md`

**Log to Knowledge Base** [NEW v1.0]:
```
/kb add failure
```

**Store**:
- Root cause analysis
- Design flaw details
- Solution recommendations
- Prevention strategies

**Version artifacts**:
```bash
# New blueprint version
cp docs/architecture/blueprint.md docs/architecture/blueprint-v1.1.md
ln -sf blueprint-v1.1.md docs/architecture/blueprint.md
```

**Handoff for Phase 2**:

Update recovery checkpoint:
```markdown
## Session Handoff

Session Type: Replanning
From Phase: 5 (NO-GO)
To Phase: 2 (Replan)
Recommended Model: Claude Sonnet 4.5

## Context for Replan
- Replan Context Package: implementation/context-packages/replan-v[X.Y.Z].md
- Knowledge Base: Failure pattern logged
- Preserved Work: [Reusable components]
- Focus Areas: [What to fix in architecture]
```

**Then**: Return to Phase 2 with context.

---

### 5.B.3: Revise Specification (Requirement Issues)

**When**: Ambiguous/missing/conflicting requirements

Similar to replan, but return to Phase 1.

---

## Step 5.C: Iteration Workflow

**When**: Incremental releases, feature additions

### 5.C.1: Iteration Planning

Consult Project Manager for scope.

### 5.C.2: Determine Entry Point

| Type | Entry Point |
|------|-------------|
| New Features | Phase 1 |
| Feature Extensions | Phase 2 |
| Bug Fixes | Phase 3 |
| Hotfix | Phase 3 → 4 |

### 5.C.3: Tag Iteration

```bash
git tag -a v0.5.[N]-iter -m "Iteration [N] start
[Scope]"
```

---

## Outputs Checklist

### Success Path
| Artifact | Status |
|----------|--------|
| Release tag | ⏳ |
| CHANGELOG | ⏳ |
| Lessons Learned | ⏳ |
| Knowledge Base [NEW] | ⏳ |
| Monitoring Active [NEW] | ⏳ |
| Portfolio (on-demand) [NEW] | ⏳ |

### Failure Path
| Artifact | Status |
|----------|--------|
| Failure tag | ⏳ |
| Context package | ⏳ |
| KB Failure Entry [NEW] | ⏳ |

---

## Role Transitions

### To New Iteration (Phase 1)
```
═══════════════════════════════════════════════════════════════
🎭 ROLE TRANSITION: New Iteration
───────────────────────────────────────────────────────────────
   Deactivating: Release Manager
   Activating:   Product Manager
   Phase:        1: Requirement Deconstruction
   Context:      Iteration [N]
═══════════════════════════════════════════════════════════════
```

### To Replan (Phase 2)
```
═══════════════════════════════════════════════════════════════
🎭 ROLE TRANSITION: Replan
───────────────────────────────────────────────────────────────
   Deactivating: Release Manager
   Activating:   Software Architect
   Phase:        2: Planning (Replan)
   Context:      Replan from v0.5.0-replan
═══════════════════════════════════════════════════════════════
```

### Project Complete
```
═══════════════════════════════════════════════════════════════
🎭 PROJECT COMPLETE
───────────────────────────────────────────────────────────────
   Final Version: v[X.Y.Z]
   Knowledge Base: [N] patterns, [M] failures documented
   Monitoring: Active
   
   Thank you for using CodeMaestro!
═══════════════════════════════════════════════════════════════
```
