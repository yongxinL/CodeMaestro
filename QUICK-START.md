# CodeMaestro - Quick Start Guide

**For Claude Code Users**

---

## 🎯 What is CodeMaestro?

CodeMaestro is a **role-based development system** that helps you build applications from idea to production through a structured 5-phase workflow with AI assistance.

**It's NOT a code library** - it's a **framework for organizing development work** with Claude AI.

---

## 🚀 Quick Start (3 Steps)

### **Step 1: Create Your New Project**

```bash
# Navigate to your projects directory
cd ~/Documents/Projects

# Create your new application directory
mkdir MyNewApp
cd MyNewApp
```

### **Step 2: Copy CodeMaestro Files**

```bash
# Copy CodeMaestro system files
cp /Users/george.li/Documents/LumenLab/CodeMaestro/init-docs.sh .
cp /Users/george.li/Documents/LumenLab/CodeMaestro/CLAUDE.md .
cp -r /Users/george.li/Documents/LumenLab/CodeMaestro/docs .

# Make initialization script executable
chmod +x init-docs.sh

# Run initialization (creates directory structure)
./init-docs.sh

# Initialize git
git init
git checkout -b develop
git add .
git commit -m "Initial CodeMaestro setup"
```

### **Step 3: Start Phase 1 in Claude Code**

```bash
# Open your project in Claude Code
# (The directory should now contain CLAUDE.md and docs/)
```

**In Claude Code, say:**
```
"Let's start Phase 1. I want to build a [describe your project]."
```

**Example:**
```
"Let's start Phase 1. I want to build a real-time chat application
with end-to-end encryption."
```

---

## 📖 What Happens Next?

### **Phase 1: Requirements (You are here!)**

Claude will activate **Product Manager role** and guide you through:

1. **Project Understanding**
   - What problem are you solving?
   - Who are your users?
   - What are the core features?

2. **Competitive Analysis**
   - Research existing solutions (using new MCP tools!)
   - Identify gaps and opportunities
   - Define your unique value proposition

3. **Locked Specification**
   - Clear requirements document
   - Acceptance criteria for each feature
   - Success metrics

**When complete:** Locked specification saved, git tagged `v0.1.0-spec`

---

### **Phase 2: Planning**

Claude activates **Software Architect role** and creates:

1. **Engineering Blueprint**
   - System architecture
   - Technology stack (validated with Context7!)
   - Module structure
   - API contracts

2. **Task Breakdown**
   - Task DAG with dependencies
   - Parallel execution groups
   - Effort estimates
   - Gantt chart

**When complete:** Blueprint saved, git tagged `v0.2.0-plan`

---

### **Phase 3: Implementation**

Claude activates **Senior Developer role** and builds:

1. **Production Code**
   - Following blueprint exactly
   - Quality gates enforced
   - Test coverage ≥70%
   - Security best practices

2. **Context Packages**
   - Module-level documentation
   - State flow diagrams
   - Decision log

**When complete:** Code complete, git tagged `v0.3.0-impl`

---

### **Phase 4: Verification**

Claude activates **QA Lead role** and validates:

1. **Quality Gates**
   - Test coverage ≥70% ✓
   - Zero critical/high security issues ✓
   - 100% AC pass rate ✓

2. **Evidence Package**
   - Test results
   - Security scan results
   - Performance baselines
   - GO/NO-GO decision

**When complete:** Evidence package saved, git tagged `v0.4.0-verify`

---

### **Phase 5: Release**

Claude activates **Release Manager role** and coordinates:

1. **Release Preparation**
   - Deployment runbook
   - Rollback plan
   - Monitoring setup

2. **Lessons Learned**
   - What went well?
   - What could improve?
   - Update knowledge base

**When complete:** Released to production, git tagged `v1.0.0`

---

## 🎭 Available Commands

Once you start, you can use these commands:

### **Navigation**
- `/status` - Show current phase, role, task progress
- `/next` - Load next pending task
- `/phase N` - Jump to specific phase

### **Knowledge Base**
- `/kb search [query]` - Search patterns/failures
- `/kb add failure` - Document a failure
- `/kb add pattern` - Document a success

### **MCP Tools (NEW!)**
- `/lookup [library]` - Get library documentation
- `/research [topic]` - Research with WebSearch + Context7
- `/validate api [library] [method]` - Confirm API exists
- `/example [library] [feature]` - Get code examples
- `/security check [library]` - Research vulnerabilities
- `/compliance [standard]` - Look up GDPR, WCAG, etc.

### **Git & Portfolio**
- `/commit` - Generate git commit
- `/checkpoint` - Pause for review
- `/portfolio generate` - Create portfolio materials

### **Recovery**
- `/recover` - Restore lost context
- `/snapshot` - Save checkpoint

**Full list:** See [COMMANDS.md](COMMANDS.md)

---

## 💡 Tips for Success

### **1. Be Specific in Phase 1**
Instead of:
❌ "Build a social media app"

Say:
✅ "Build a photo-sharing app for photographers, with portfolio
galleries, watermark protection, and client download links"

### **2. Let Each Phase Complete**
Don't rush! Each phase builds on the previous:
- Phase 1 → Clear requirements (saves rework later)
- Phase 2 → Solid architecture (prevents tech debt)
- Phase 3 → Quality code (reduces bugs)
- Phase 4 → Verified quality (smooth release)
- Phase 5 → Safe delivery (production-ready)

### **3. Use MCP Tools**
The new MCP tools save time:
- `/lookup react` - Get React docs instantly
- `/research "authentication best practices 2026"` - Research patterns
- `/security check express` - Check for vulnerabilities

### **4. Trust the Quality Gates**
CodeMaestro enforces:
- Test coverage ≥70%
- Zero critical/high security issues
- 100% AC pass rate

These aren't optional - they ensure production readiness.

### **5. Build Knowledge Base**
As you work:
- `/kb add pattern` when something works well
- `/kb add failure` when you hit issues
- `/kb search` to reuse solutions

Your future projects benefit from past learnings!

---

## 🔧 Skill Tier Selection

In Phase 1, Claude will ask your skill level:

- **Beginner**: Detailed explanations, step-by-step guidance
- **Advanced**: Concise, assumes familiarity with concepts
- **Ninja**: Minimal guidance, maximum efficiency

Choose honestly - this affects how Claude communicates throughout all phases.

---

## 📁 What Gets Created

After initialization, your project structure:

```
MyNewApp/
├── CLAUDE.md                           # System configuration
├── init-docs.sh                        # Initialization script
├── docs/
│   ├── prompts/                        # Phase workflows
│   ├── config/                         # Git, roles, constraints, MCP tools
│   ├── specifications/                 # Phase 1 output
│   ├── architecture/                   # Phase 2 output
│   ├── implementation/                 # Phase 3 output
│   ├── verification/                   # Phase 4 output
│   ├── release/                        # Phase 5 output
│   ├── knowledge-base/                 # Learnings
│   └── portfolio/                      # Generated materials
└── [your code here]                    # Phase 3 creates this
```

---

## ❓ Common Questions

### **Q: Do I need to know the tech stack upfront?**
A: No! Phase 1 focuses on **what** to build, Phase 2 decides **how** (tech stack).

### **Q: Can I use my own tech stack?**
A: Yes! In Phase 2, Claude will propose a stack, but you can choose alternatives.

### **Q: What if I want to change requirements mid-project?**
A: Use `/phase 1` to replan. CodeMaestro handles requirement changes gracefully.

### **Q: Do I need to follow all 5 phases?**
A: For best results, yes. But you can skip phases if you already have specs/architecture.

### **Q: Can I use CodeMaestro for existing projects?**
A: Yes! Start at any phase. For example, if you have code but no tests, start Phase 4.

### **Q: How long does each phase take?**
A: Varies by project:
- Phase 1: 1-2 hours (requirements)
- Phase 2: 2-4 hours (planning)
- Phase 3: Days to weeks (implementation)
- Phase 4: 1-2 hours (verification)
- Phase 5: 1-2 hours (release)

---

## 🎯 Your First Session (Step-by-Step)

Let's walk through a complete example:

### **1. Project Idea**
"I want to build a personal finance tracker"

### **2. Phase 1 Conversation**
```
You: "Let's start Phase 1. I want to build a personal finance tracker."

Claude (Product Manager): "Great! Let me understand your vision...

1. Who is your target user?
2. What's the core problem you're solving?
3. What features are essential vs nice-to-have?
4. Any specific compliance needs (banking regulations, etc.)?"

[You answer questions...]

Claude: "Let me research competitors..."
[Uses /research command with MCP tools]

Claude: "Based on my analysis, here's your locked specification..."
[Creates docs/specifications/locked-specification-v1.0.md]

Claude: "✅ Phase 1 Complete! Committing..."
[Runs git commit, tags v0.1.0-spec]
```

### **3. Phase 2 Continues**
```
Claude (Software Architect): "Now let's design the architecture..."
[Creates blueprint, task DAG, selects tech stack using Context7]
```

### **4. And so on...**
CodeMaestro guides you all the way to production!

---

## 📚 Next Steps

1. **Read Full Documentation:**
   - [README.md](README.md) - Full feature overview
   - [CLAUDE.md](CLAUDE.md) - System architecture
   - [COMMANDS.md](COMMANDS.md) - Command reference
   - [docs/config/mcp-tools.md](docs/config/mcp-tools.md) - MCP tool usage

2. **Try MCP Tools:**
   - `/lookup react` - See Context7 in action
   - `/research "modern web frameworks 2026"` - See WebSearch

3. **Review Improvements:**
   - [IMPROVEMENTS.md](IMPROVEMENTS.md) - Future enhancements
   - [REVIEW-SUMMARY.md](REVIEW-SUMMARY.md) - System analysis

---

## 🎉 Ready to Build!

You now have everything you need to start building applications with CodeMaestro and Claude Code.

**Remember:**
- 🎭 Let roles guide you (Product Manager → Architect → Developer → QA → Release Manager)
- 📊 Trust the quality gates (70% coverage, 0 security issues, 100% AC pass)
- 🧠 Build knowledge base (learn from every project)
- 🔧 Use MCP tools (Context7 for docs, WebSearch for research)

**Questions?** Just ask Claude in your project - CodeMaestro is designed to be self-guiding!

---

**Happy Building! 🚀**
