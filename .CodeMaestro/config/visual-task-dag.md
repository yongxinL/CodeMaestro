# Visual Task DAG Viewer

**Version:** 1.0
**Date:** 2026-01-13
**Status:** ✅ Active
**Risk Level:** ✅ ZERO RISK (Text DAG unchanged)

---

## Overview

The Visual Task DAG (Directed Acyclic Graph) Viewer transforms the text-based task dependency graph from Phase 2 (Planning) into an interactive HTML visualization. This provides developers with an intuitive understanding of task dependencies, critical paths, parallel execution opportunities, and project progress.

**Key Benefits:**
- **Better Understanding**: Visual representation clarifies complex dependencies
- **Interactive Exploration**: Drag nodes, zoom, filter by status
- **Critical Path Highlighting**: Identify bottleneck tasks
- **Parallel Opportunities**: See which tasks can run concurrently
- **Progress Tracking**: Color-coded task status (pending/in-progress/completed)
- **Export Capabilities**: Share visual with stakeholders

**No Function Loss:**
- Text DAG in blueprint remains authoritative source
- Visual is generated from text, not replacement
- Text-based workflows unchanged

---

## Commands

### /tree --visual

Generate an interactive HTML visualization of the task DAG.

**Syntax:**
```bash
/tree                    # Display text DAG (existing behavior)
/tree --visual           # Generate interactive HTML visualization
/tree --visual --open    # Generate and open in browser
/tree --visual --export  # Generate and save to docs/architecture/
```

**Options:**
- `--open`: Automatically open visualization in default browser
- `--export`: Save HTML file to project (default: in-memory preview)
- `--layout [type]`: Specify layout algorithm (hierarchical|force|radial|tree)
- `--highlight [path]`: Highlight specific path (e.g., critical path)
- `--filter [status]`: Show only tasks with specific status

**Examples:**
```bash
# Basic visualization
/tree --visual --open

# Custom layout with critical path highlighted
/tree --visual --layout hierarchical --highlight critical

# Export for sharing
/tree --visual --export --layout force

# Filter to show only pending tasks
/tree --visual --filter pending
```

---

## Visualization Features

### Interactive Elements

**Node Interactions:**
- **Click**: View task details (AC, effort, dependencies, status)
- **Hover**: Show tooltip with task summary
- **Drag**: Reposition node (layout persists in session)
- **Double-click**: Expand/collapse subtasks
- **Right-click**: Context menu (mark complete, add note, etc.)

**Graph Interactions:**
- **Pan**: Click and drag background
- **Zoom**: Mouse wheel or pinch gesture
- **Fit to Screen**: Reset zoom to show all nodes
- **Search**: Filter by task ID or description

**Color Coding:**
- 🟢 **Green**: Completed tasks
- 🟡 **Yellow**: In-progress tasks
- ⚪ **White/Gray**: Pending tasks (not yet started)
- 🔴 **Red**: Blocked tasks (dependencies not met)
- 🔵 **Blue**: Critical path tasks

**Edge Styling:**
- **Solid line**: Hard dependency (must complete before)
- **Dashed line**: Soft dependency (recommended order)
- **Thick line**: Critical path edge
- **Arrow**: Direction of dependency

---

## Layout Algorithms

### 1. Hierarchical Layout (Default)

Top-to-bottom flow showing clear dependency levels.

**Best For:**
- Waterfall-style tasks
- Clear phase boundaries
- Sequential dependencies

**Example:**
```
      [T-1.1]
          ↓
    ┌─────┴─────┐
    ↓           ↓
[T-1.2.1]   [T-1.2.2]
    └─────┬─────┘
          ↓
      [T-1.3]
```

**Command:**
```bash
/tree --visual --layout hierarchical
```

---

### 2. Force-Directed Layout

Physics simulation spreads nodes evenly, minimizing edge crossings.

**Best For:**
- Complex dependency networks
- Discovering hidden patterns
- Highly interconnected tasks

**Characteristics:**
- Nodes repel each other (avoid overlap)
- Edges act as springs (pull connected nodes together)
- Settles into optimal layout automatically

**Command:**
```bash
/tree --visual --layout force
```

---

### 3. Radial Layout

Central root with tasks radiating outward by dependency level.

**Best For:**
- Single entry point projects
- Emphasizing parallel branches
- Visualizing blast radius of changes

**Example:**
```
        [T-1.2.1]
       /
  [T-1.1] -- [T-1.2.2]
       \
        [T-1.2.3]
```

**Command:**
```bash
/tree --visual --layout radial
```

---

### 4. Tree Layout

Left-to-right tree structure (like file explorer).

**Best For:**
- Wide, shallow dependency graphs
- Presentation and stakeholder communication
- Print-friendly exports

**Command:**
```bash
/tree --visual --layout tree
```

---

## Critical Path Highlighting

### Automatic Detection

The visual viewer automatically identifies and highlights the **critical path**—the longest sequence of dependent tasks that determines minimum project duration.

**Visual Indicators:**
- Critical path tasks: Blue nodes
- Critical path edges: Thick lines
- Duration annotation: Days displayed on nodes
- Total project duration: Shown in header

**Example:**
```
Critical Path: T-1.1 → T-1.2.1 → T-1.3 → T-1.4
Total Duration: 18 days
```

### Manual Highlighting

Highlight specific paths for analysis:

```bash
# Highlight authentication flow
/tree --visual --highlight "T-2.1.1,T-2.1.2,T-2.1.3"

# Highlight tasks assigned to specific person
/tree --visual --highlight "assignee:Alice"
```

---

## Parallel Execution Groups

### Visual Grouping

Tasks that can run in parallel are grouped with colored backgrounds:

- **Group 1** (Light Blue): Database schema + API routes
- **Group 2** (Light Green): Frontend components + Backend services
- **Group 3** (Light Yellow): Testing tasks

**Annotations:**
- Duration: Time to complete entire group (longest task)
- Team members: Who can work on these concurrently

**Example:**
```
┌──────────────────────────────────────┐
│ Parallel Group 2 (Est: 6 days)      │
│ ┌──────────┐     ┌────────────┐     │
│ │ T-2.1    │     │ T-2.2      │     │
│ │ Frontend │     │ Backend    │     │
│ └──────────┘     └────────────┘     │
└──────────────────────────────────────┘
```

---

## Progress Tracking

### Status Display

Each task node shows current status with visual indicators:

**Task Node Structure:**
```
┌─────────────────────────┐
│ T-1.2.1: User Auth      │ ← Task ID + Title
│ ━━━━━━━━━━━━━━━━━━━━━  │ ← Progress bar (0-100%)
│ 3/5 days | 60% complete │ ← Time spent / estimated
│ 🟡 In Progress          │ ← Status badge
└─────────────────────────┘
```

**Progress Bar:**
- Empty (⚪): Not started
- Partial (🟡): In progress (20%, 40%, 60%, 80%)
- Full (🟢): Completed

### Overall Project Progress

Dashboard panel shows aggregate metrics:

```
┌─────────────────────────────────────┐
│ Project Progress Dashboard          │
├─────────────────────────────────────┤
│ Total Tasks: 24                     │
│ Completed: 8 (33%)                  │
│ In Progress: 5 (21%)                │
│ Pending: 11 (46%)                   │
│ Blocked: 0 (0%)                     │
├─────────────────────────────────────┤
│ Estimated Total: 45 days            │
│ Time Spent: 15 days (33%)           │
│ Projected Completion: 2026-02-15    │
│ On Track: ✅ Yes                    │
└─────────────────────────────────────┘
```

---

## Integration with Phase 3 (Implementation)

### Real-Time Updates

As tasks are completed in Phase 3, the visual DAG updates automatically:

**Workflow:**
1. Developer completes task: `/next` after finishing T-1.2.1
2. Task marked complete in decision log
3. Visual DAG updated: T-1.2.1 → 🟢 Green
4. Dependent tasks unblocked: T-1.3 → ⚪ White (ready to start)

**Auto-Refresh:**
```bash
# Generate visual with auto-refresh enabled
/tree --visual --open --watch

# Visual will reload every 30 seconds to reflect task updates
```

---

## Export Formats

### HTML Export (Default)

Self-contained HTML file with embedded JavaScript and CSS.

**Features:**
- No external dependencies
- Works offline
- Shareable via email or file share
- Includes all interactions

**Command:**
```bash
/tree --visual --export
# Saved: docs/architecture/task-dag-visual.html
```

---

### Static Image Export

Export as PNG/SVG for documentation or presentations.

**Command:**
```bash
/tree --visual --export png
# Saved: docs/architecture/task-dag.png

/tree --visual --export svg
# Saved: docs/architecture/task-dag.svg (vector, scalable)
```

---

### JSON Export

Export graph data for custom visualizations or integrations.

**Command:**
```bash
/tree --visual --export json
# Saved: docs/architecture/task-dag.json
```

**JSON Structure:**
```json
{
  "nodes": [
    {
      "id": "T-1.1",
      "label": "Setup project structure",
      "status": "completed",
      "effort": "2 days",
      "progress": 100,
      "assignee": "Alice"
    }
  ],
  "edges": [
    {
      "source": "T-1.1",
      "target": "T-1.2",
      "type": "hard"
    }
  ],
  "metadata": {
    "totalTasks": 24,
    "completed": 8,
    "criticalPath": ["T-1.1", "T-1.2.1", "T-1.3"]
  }
}
```

---

## Technology Stack

### Visualization Libraries

**Primary:** D3.js v7 (Data-Driven Documents)
- Powerful, flexible, widely adopted
- Excellent layout algorithms
- Custom interactions easy to implement

**Alternative:** Mermaid.js (Simpler, Markdown-compatible)
- Lightweight
- Generates diagrams from text
- Limited interactivity but easier maintenance

**Recommended:** D3.js for full-featured interactive visuals

---

### HTML Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Task DAG - Project Name</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    /* Embedded CSS for styling */
  </style>
</head>
<body>
  <div id="controls">
    <!-- Zoom, pan, filter controls -->
  </div>
  <div id="dashboard">
    <!-- Progress metrics -->
  </div>
  <svg id="dag-container"></svg>
  <script>
    // Embedded JavaScript for visualization
    const taskData = /* JSON data */;
    // D3.js rendering code
  </script>
</body>
</html>
```

---

## Phase-Specific Usage

### Phase 1: Requirements
- Not applicable (no tasks defined yet)

### Phase 2: Planning
- **Primary usage phase**
- Generate visual after creating task DAG
- Review critical path and parallel opportunities
- Adjust task breakdown if bottlenecks identified
- Export for stakeholder review

**Recommended Workflow:**
```
1. Create text-based task DAG (/tree)
2. Generate visual (/tree --visual --open)
3. Review critical path and dependencies
4. Adjust task breakdown if needed
5. Export final visual (/tree --visual --export)
6. Include in architecture blueprint handoff
```

---

### Phase 3: Implementation
- Use visual to track progress
- Identify next tasks to work on
- Update status as tasks complete
- Monitor for blockers
- Refresh visual periodically

**Recommended Workflow:**
```
1. Open visual at start of day
2. Identify pending tasks (⚪ white nodes)
3. Start task, mark in-progress (/next)
4. Refresh visual (/tree --visual --watch)
5. Complete task, visual updates automatically
```

---

### Phase 4: Verification
- Review completed task graph
- Verify all tasks marked complete
- Export final visual for evidence package

---

### Phase 5: Release
- Include final task graph in lessons learned
- Archive visual for portfolio

---

## Examples

### Example 1: Generate Basic Visual

**Command:**
```bash
/tree --visual --open
```

**Output:**
```
🔧 Generating Visual Task DAG...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: docs/architecture/blueprint-v1.0.md
Tasks: 24 nodes, 31 edges
Layout: Hierarchical (default)

✅ Generated: task-dag-visual.html
✅ Opened in browser: http://localhost:3000/dag

Features:
  - Click nodes for details
  - Drag to reposition
  - Zoom with mouse wheel
  - Critical path highlighted (blue)

Controls:
  [Fit to Screen] [Export PNG] [Toggle Legend]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Browser Display:**
```
┌──────────────────────────────────────────────────────┐
│ Task DAG - E-Commerce Platform                       │
│ [Fit Screen] [Export] [Critical Path] [Legend]       │
├──────────────────────────────────────────────────────┤
│                                                       │
│              [T-1.1: Setup]                          │
│                     ↓                                │
│         ┌───────────┴───────────┐                   │
│         ↓                       ↓                    │
│   [T-1.2.1: Auth]         [T-1.2.2: DB]            │
│         ↓                       ↓                    │
│         └───────────┬───────────┘                   │
│                     ↓                                │
│            [T-1.3: Integration]                      │
│                                                       │
├──────────────────────────────────────────────────────┤
│ 📊 Progress: 8/24 tasks (33%) | Critical Path: 18d  │
└──────────────────────────────────────────────────────┘
```

---

### Example 2: Critical Path Analysis

**Command:**
```bash
/tree --visual --layout hierarchical --highlight critical
```

**Output:**
```
🔧 Generating Visual Task DAG with Critical Path...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Critical Path Identified:
  T-1.1 → T-1.2.1 → T-1.3 → T-1.4 → T-1.5
  Duration: 18 days (longest path)

Parallel Opportunities:
  - T-1.2.2 and T-1.2.3 can run with T-1.2.1 (saves 4 days)
  - T-2.1 and T-2.2 can run in parallel (saves 5 days)

Potential Savings: 9 days (33% reduction)
Adjusted Timeline: 18 days → 12 days

✅ Critical path highlighted in blue
✅ Parallel groups shown with colored backgrounds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Example 3: Export for Stakeholders

**Command:**
```bash
/tree --visual --layout tree --export png
```

**Output:**
```
🔧 Exporting Task DAG as PNG...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Layout: Tree (left-to-right)
Resolution: 1920x1080 (HD)
Format: PNG

✅ Exported: docs/architecture/task-dag.png (245 KB)

📧 Share with stakeholders:
   - High-quality image suitable for presentations
   - Includes progress indicators and critical path
   - Static snapshot (does not update)

💡 For interactive version, share:
   docs/architecture/task-dag-visual.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Example 4: Progress Tracking During Implementation

**Command:**
```bash
/tree --visual --open --watch
```

**Output:**
```
🔧 Opening Visual Task DAG with Auto-Refresh...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mode: Live tracking
Refresh: Every 30 seconds
Source: docs/architecture/blueprint-v1.0.md

✅ Visual opened: http://localhost:3000/dag
✅ Auto-refresh enabled

Updates will reflect:
  - Task status changes (pending → in-progress → completed)
  - Progress bar updates
  - Blocked task detection
  - Dependency unblocking

⚠️  Keep browser tab open for live updates
    Press Ctrl+C to stop auto-refresh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Advanced Features

### Custom Filters

Filter tasks by various criteria:

```bash
# Show only in-progress and blocked tasks
/tree --visual --filter "status:in-progress,blocked"

# Show only tasks assigned to Alice
/tree --visual --filter "assignee:Alice"

# Show only high-priority tasks
/tree --visual --filter "priority:high"

# Combine filters
/tree --visual --filter "status:pending AND priority:high"
```

---

### Task Annotations

Add notes or context to specific tasks:

**Browser Interaction:**
1. Right-click task node
2. Select "Add Note"
3. Enter note text
4. Note icon appears on node (💬)

**Notes Persist:**
- Saved to `docs/architecture/task-notes.json`
- Loaded automatically on visual refresh
- Included in exports

---

### Dependency Analysis

Identify potential issues:

**Circular Dependency Detection:**
```
⚠️  Circular dependency detected:
    T-2.1 → T-2.2 → T-2.3 → T-2.1

    Action: Review task breakdown and remove cycle
```

**Orphaned Tasks:**
```
⚠️  Orphaned tasks (no dependencies):
    - T-3.5: "Update documentation"
    - T-4.2: "Performance testing"

    Action: Add dependencies or mark as independent
```

---

### Team Collaboration

Multi-user support for team projects:

**Assignee Colors:**
- Alice: Blue nodes
- Bob: Green nodes
- Charlie: Orange nodes

**Workload Balance:**
```
Team Workload:
  Alice: 8 tasks, 18 days (overloaded ⚠️)
  Bob: 6 tasks, 12 days
  Charlie: 5 tasks, 10 days

Recommendation: Reassign T-2.3 from Alice to Charlie
```

---

## Error Handling

### Common Errors

**Error: No Task DAG Found**
```
❌ Cannot generate visual: Task DAG not found

   Solution:
   1. Ensure Phase 2 (Planning) is complete
   2. Verify blueprint exists: docs/architecture/blueprint-v1.0.md
   3. Check blueprint contains task DAG section
```

**Error: Invalid Task Format**
```
❌ Failed to parse task: T-1.2.1

   Issue: Missing effort estimate or dependencies
   Location: Line 245 in blueprint-v1.0.md

   Solution: Update task format to:
   - T-1.2.1: Task title [Effort: X days] [Depends: T-1.1]
```

**Error: Circular Dependencies**
```
❌ Cannot generate visual: Circular dependency detected

   Cycle: T-2.1 → T-2.2 → T-2.3 → T-2.1

   Solution:
   1. Review task dependencies in blueprint
   2. Remove circular reference
   3. Regenerate visual
```

---

## Best Practices

### When to Use Visual DAG

**✅ Use When:**
- Planning complex projects (>10 tasks)
- Identifying critical path and bottlenecks
- Tracking progress during implementation
- Presenting to stakeholders
- Onboarding new team members

**❌ Don't Use When:**
- Simple projects (<5 tasks)
- Text DAG is sufficient
- No browser access (CLI-only environment)

---

### Layout Selection Guidelines

| Project Characteristic | Recommended Layout |
|------------------------|-------------------|
| Linear dependencies | Hierarchical |
| Highly interconnected | Force-directed |
| Single root task | Radial |
| Wide, shallow graph | Tree |
| Presentation/print | Tree or Hierarchical |

---

### Performance Optimization

For large projects (>100 tasks):
- Use simplified view (hide details until node clicked)
- Enable virtual scrolling for task list
- Lazy-load subtasks
- Use progressive rendering

---

## Constraints Satisfied

This feature supports the following constraints:

- **C19 (Verifiable AC)**: Visual helps verify all tasks have clear completion criteria
- **D22 (Single Responsibility)**: Task decomposition visible in graph structure
- **E32 (Estimation tracking)**: Effort displayed on nodes, compared to actual

---

## Future Enhancements

### Planned Improvements (v1.1+)

1. **Gantt Chart View**: Timeline-based visualization alongside DAG
2. **Resource Allocation**: Show team member capacity and availability
3. **What-If Analysis**: Simulate task reordering or parallelization
4. **AI Suggestions**: Recommend task reordering for faster completion
5. **Mobile App**: Companion app for on-the-go progress tracking

---

## Summary

The Visual Task DAG Viewer provides:
- ✅ Interactive visualization of task dependencies
- ✅ Critical path identification
- ✅ Parallel execution opportunities
- ✅ Real-time progress tracking
- ✅ Multiple layout algorithms
- ✅ Export in multiple formats (HTML, PNG, SVG, JSON)
- ✅ Zero function loss (text DAG unchanged)

**Primary Usage:**
Phase 2 (Planning) for initial generation, Phase 3 (Implementation) for progress tracking.

**Commands:**
- `/tree` - Display text DAG (existing)
- `/tree --visual` - Generate interactive HTML
- `/tree --visual --open` - Generate and open in browser
- `/tree --visual --export [format]` - Export to file
