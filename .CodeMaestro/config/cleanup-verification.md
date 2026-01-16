# Framework Cleanup & Verification System

## Overview

The CodeMaestro cleanup system ensures framework files are removed from final deliverables while preserving all user-generated documentation and code. This guide explains the cleanup process, file classification, and troubleshooting.

**Version:** 1.0.0
**Last Updated:** 2026-01-16

---

## Quick Start

```bash
# 1. Verify what will be removed (safe, always run this first)
./cleanup.sh --verify

# 2. Review the list, then apply cleanup
./cleanup.sh --apply

# 3. Validate build artifacts (optional but recommended)
./cleanup.sh --validate-build
```

---

## File Classification

### Framework Files (Removed by cleanup.sh)

**`.CodeMaestro/` directory** - Contains ALL framework components:

```
.CodeMaestro/
├── prompts/              # Phase prompt files (01-05)
├── config/               # System configuration
│   ├── roles/            # Role definitions
│   ├── templates/        # All system templates
│   ├── constraints-reference.md
│   ├── git-commands.md
│   ├── mcp-tools.md
│   └── [all other config files]
├── docs/                 # Framework documentation
│   ├── COMMANDS-CORE.md
│   ├── COMMANDS-ADVANCED.md
│   └── README.md
└── init-docs.sh          # Initialization script
```

**`CLAUDE.md`** - Framework developer guide for Claude Code

**Total:** 2 items to remove (1 directory, 1 file)

---

### User Files (Preserved by cleanup.sh)

**`docs/` directory** - ALL user-generated documentation:

```
docs/
├── specifications/           # Phase 1: Requirements
├── architecture/             # Phase 2: Planning
│   ├── tasks/                # Task files with token tracking
│   └── api-contracts/
├── implementation/           # Phase 3: Development
│   ├── context-packages/
│   ├── handoffs/             # Task handoff messages
│   ├── decision-log.md       # Technical decisions
│   └── .recovery-checkpoint.md
├── verification/             # Phase 4: QA
│   ├── evidence-packages/
│   ├── performance-baselines/
│   └── test-plan.md
├── release/                  # Phase 5: Release
│   ├── runbooks/
│   └── lessons-learned.md
├── knowledge-base/           # User-specific KB entries
│   ├── failures/
│   ├── patterns/
│   └── decisions/
├── portfolio/                # Showcase documentation
└── team/                     # Team coordination
```

**Project files:**
- All source code (`src/`, `lib/`, etc.)
- All tests (`test/`, `__tests__/`, etc.)
- Configuration files (`.gitignore`, `package.json`, etc.)
- README.md (project-specific)

---

## Cleanup Modes

### Mode 1: --verify (Default, Safe)

**Purpose:** Preview what would be removed without making changes

**Usage:**
```bash
./cleanup.sh --verify
# or simply
./cleanup.sh
```

**Output:**
```
Files that would be removed:
  - .CodeMaestro/
  - CLAUDE.md
```

**Exit Code:** `1` (files found - for CI checks expecting clean state)

**When to Use:**
- Before any cleanup to review what will be removed
- In CI/CD to check if framework files exist (fail build if found)
- As a sanity check before final release

---

### Mode 2: --apply (Interactive)

**Purpose:** Remove framework files with user confirmation

**Usage:**
```bash
./cleanup.sh --apply
```

**Output:**
```
WARNING: This will permanently delete CodeMaestro framework files
Files to be removed:
  - .CodeMaestro/
  - CLAUDE.md
Continue? (yes/no): yes
Removing CodeMaestro framework...
  ✓ Removed .CodeMaestro/
  ✓ Removed CLAUDE.md
✅ Cleanup complete
```

**Exit Codes:**
- `0` - Success (files removed)
- `1` - Aborted by user
- `2` - Error (permissions, etc.)

**When to Use:**
- Phase 5 final release (after release approval)
- Before packaging for client delivery
- Before creating final archive/backup

**Safety:** Prompts for confirmation, type exactly "yes" to proceed

---

### Mode 3: --ci (Non-Interactive)

**Purpose:** Remove framework files automatically (for CI/CD pipelines)

**Usage:**
```bash
./cleanup.sh --ci
```

**Output:** None (silent operation)

**Exit Codes:**
- `0` - Success (files removed or didn't exist)
- `2` - Error (fatal issue)

**When to Use:**
- Automated build pipelines
- Docker image builds
- Release automation scripts

**Example CI/CD Integration:**

```yaml
# GitHub Actions
- name: Remove CodeMaestro framework
  run: ./cleanup.sh --ci

# GitLab CI
release:
  script:
    - ./cleanup.sh --ci
    - npm run build

# Jenkins
sh './cleanup.sh --ci'
```

---

### Mode 4: --validate-build (Validation)

**Purpose:** Check build artifacts for framework files

**Usage:**
```bash
./cleanup.sh --validate-build
```

**Output:**
```
Checking build artifacts for framework files...
✓ No framework files found in build artifacts
```

**Exit Codes:**
- `0` - Clean (no framework files found)
- `1` - Validation failed (framework files found)
- `2` - Error (build directory not found, etc.)

**What It Checks:**
- `dist/` directory for `.CodeMaestro/` or `CLAUDE.md`
- Docker images (if Docker is available)
- Custom locations (can be extended in script)

**When to Use:**
- After building production artifacts
- Before deploying to production
- As final verification in CI/CD

**Example:**
```bash
# Build project
npm run build

# Validate no framework files in dist/
./cleanup.sh --validate-build

# If validation fails, investigate
if [ $? -ne 0 ]; then
    echo "ERROR: Framework files found in build artifacts!"
    find dist/ -name ".CodeMaestro" -o -name "CLAUDE.md"
    exit 1
fi
```

---

## Platform-Specific Patterns

While `cleanup.sh` removes framework files from the source, you should also configure build tools to exclude these files:

### Docker (.dockerignore)

```
# CodeMaestro Framework
.CodeMaestro/
CLAUDE.md

# Already excluded by .gitignore patterns
```

**Note:** The `.gitignore` generated by `init-docs.sh` already includes these patterns, and Docker respects `.dockerignore` first, then `.gitignore`.

### Node.js (.npmignore)

If publishing to npm:

```
# CodeMaestro Framework
.CodeMaestro/
CLAUDE.md

# Documentation (optional - keep if you want docs in package)
docs/
```

### Python (MANIFEST.in)

```python
# Exclude CodeMaestro framework
recursive-exclude .CodeMaestro *
exclude CLAUDE.md

# Include user docs (optional)
recursive-include docs *
```

### Maven (pom.xml)

```xml
<build>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <excludes>
        <exclude>**/.CodeMaestro/**</exclude>
        <exclude>**/CLAUDE.md</exclude>
      </excludes>
    </resource>
  </resources>
</build>
```

---

## Workflow Integration

### Phase 5 (Release) - Step-by-Step

**During Release Preparation:**

1. **Complete all Phase 4 verification** ✅
2. **Update CHANGELOG** ✅
3. **Verify framework cleanup** ← cleanup.sh
4. **Create release tag**
5. **Deploy**

**Detailed Steps:**

```bash
# Step 1: Verify current state
./cleanup.sh --verify

# Expected output:
#   Files that would be removed:
#     - .CodeMaestro/
#     - CLAUDE.md

# Step 2: Review verification checklist
# - ✅ All tests passing
# - ✅ Evidence package complete
# - ✅ CHANGELOG updated
# - ✅ Documentation complete

# Step 3: Get release approval (human checkpoint)
# Decision: GO / NO-GO

# Step 4: If GO, apply cleanup
./cleanup.sh --apply
# Type "yes" when prompted

# Step 5: Build final artifacts
npm run build  # or your build command

# Step 6: Validate build
./cleanup.sh --validate-build

# Step 7: Proceed with release (git tag, deploy, etc.)
```

---

## Troubleshooting

### Issue 1: Permission Denied

**Symptom:**
```
rm: .CodeMaestro/: Permission denied
```

**Solution:**
```bash
# Check permissions
ls -la .CodeMaestro/

# Fix permissions
chmod -R u+w .CodeMaestro/

# Try again
./cleanup.sh --apply
```

---

### Issue 2: Files Not Removed

**Symptom:**
```
Cleanup complete, but files still exist
```

**Solution:**
```bash
# Check if files are actually there
ls -la .CodeMaestro/
ls -la CLAUDE.md

# Check cleanup.sh script
cat cleanup.sh | grep FILES_TO_REMOVE

# Manually remove if needed
rm -rf .CodeMaestro/
rm CLAUDE.md
```

---

### Issue 3: Validation Fails (Files in Build)

**Symptom:**
```
ERROR: Found .CodeMaestro/ in dist/
```

**Root Cause:** Build tool copied framework files

**Solution:**

1. **Identify how files got into build:**
   ```bash
   find dist/ -name ".CodeMaestro" -o -name "CLAUDE.md"
   ```

2. **Update build configuration:**

   **Webpack:**
   ```javascript
   // webpack.config.js
   module.exports = {
     // ...
     module: {
       rules: [
         {
           test: /\.(md|txt)$/,
           exclude: [
             /\.CodeMaestro/,
             /CLAUDE\.md/
           ],
           // ...
         }
       ]
     }
   };
   ```

   **Vite:**
   ```javascript
   // vite.config.js
   export default {
     build: {
       rollupOptions: {
         external: [
           /\.CodeMaestro\/.*/,
           'CLAUDE.md'
         ]
       }
     }
   };
   ```

3. **Add to .dockerignore or .npmignore** (see Platform-Specific Patterns above)

---

### Issue 4: Want to Keep Framework Files

**Scenario:** Need to preserve framework for future reference or handoff to another team

**Solution:**

**Option A: Skip cleanup entirely**
```bash
# Just don't run cleanup.sh
# Document reason in release notes
```

**Option B: Modify cleanup.sh (NOT RECOMMENDED)**
```bash
# Edit FILES_TO_REMOVE array in cleanup.sh
# Remove items you want to keep

# BETTER: Keep files and document in README:
echo "## Development Framework" >> README.md
echo "This project uses CodeMaestro (see .CodeMaestro/ and CLAUDE.md)" >> README.md
```

**Option C: Archive before cleanup**
```bash
# Create archive of framework files
tar -czf codemaestro-framework-backup.tar.gz .CodeMaestro/ CLAUDE.md

# Then run cleanup
./cleanup.sh --apply

# Later, restore if needed:
tar -xzf codemaestro-framework-backup.tar.gz
```

---

## What Gets Preserved

It's important to understand that cleanup does NOT remove user-generated work:

### ✅ Preserved After Cleanup

**Documentation:**
- All specifications (Phase 1)
- Architecture diagrams and task files (Phase 2)
- Decision logs and handoff messages (Phase 3)
- Test plans and evidence packages (Phase 4)
- Release notes and lessons learned (Phase 5)
- Knowledge base entries (all phases)

**Data:**
- Token tracking data (embedded in task files in `docs/architecture/tasks/`)
- Recovery checkpoints (`docs/implementation/.recovery-checkpoint.md`)
- Performance baselines (`docs/verification/performance-baselines/`)
- Portfolio documents (`docs/portfolio/`)

**Code:**
- All source code
- All tests
- All configuration files (except cleanup.sh and .gitignore patterns)

### ❌ Removed by Cleanup

**Framework Infrastructure:**
- Phase prompts (`.CodeMaestro/prompts/`)
- System configuration (`.CodeMaestro/config/`)
- Templates (`.CodeMaestro/config/templates/`)
- Framework documentation (`.CodeMaestro/docs/`)
- init-docs.sh script
- CLAUDE.md guide

---

## CI/CD Integration Examples

### GitHub Actions (Complete Workflow)

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Verify framework files present (pre-cleanup check)
        run: |
          if [ ! -d ".CodeMaestro" ]; then
            echo "ERROR: .CodeMaestro directory not found!"
            exit 1
          fi

      - name: Run tests
        run: npm test

      - name: Remove CodeMaestro framework
        run: ./cleanup.sh --ci

      - name: Verify framework files removed
        run: |
          if [ -d ".CodeMaestro" ] || [ -f "CLAUDE.md" ]; then
            echo "ERROR: Framework files still exist after cleanup!"
            exit 1
          fi

      - name: Build production artifacts
        run: npm run build

      - name: Validate build artifacts
        run: ./cleanup.sh --validate-build || {
          echo "ERROR: Framework files found in build artifacts!"
          find dist/ -name ".CodeMaestro" -o -name "CLAUDE.md"
          exit 1
        }

      - name: Create release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
```

### GitLab CI

```yaml
stages:
  - test
  - build
  - release

test:
  stage: test
  script:
    - npm test

build:
  stage: build
  script:
    - ./cleanup.sh --ci
    - npm run build
    - ./cleanup.sh --validate-build
  artifacts:
    paths:
      - dist/

release:
  stage: release
  script:
    - echo "Deploying release..."
  only:
    - tags
```

### Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Cleanup') {
            steps {
                sh './cleanup.sh --ci'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
                sh './cleanup.sh --validate-build'
            }
        }
        stage('Release') {
            when {
                tag "v*"
            }
            steps {
                sh 'echo "Deploying release..."'
            }
        }
    }
}
```

---

## FAQs

**Q: Should I run cleanup during development?**
A: No. Only run cleanup in Phase 5 before final release. The framework is needed for Phases 1-4.

**Q: Can I add cleanup.sh to .gitignore?**
A: No. The cleanup.sh script should be committed to the repository so it's available in CI/CD and for team members.

**Q: What if I accidentally run cleanup too early?**
A: Re-run `init-docs.sh` from the CodeMaestro installation to restore framework files. Your user documentation in `docs/` won't be affected.

**Q: Should framework files be in git history?**
A: Yes during development. The `.gitignore` generated by `init-docs.sh` excludes them, but they're present in your working directory. Only remove them before final release.

**Q: How do I customize what gets removed?**
A: Edit the `FILES_TO_REMOVE` array in `cleanup.sh`. However, the default (removing `.CodeMaestro/` and `CLAUDE.md`) is recommended for clean deliverables.

**Q: What if my build tool still copies framework files?**
A: Add exclusion patterns to your build configuration (see Platform-Specific Patterns section).

**Q: Can I automate cleanup in a pre-commit hook?**
A: Not recommended. Cleanup should only happen in Phase 5, not on every commit.

---

## Summary

The CodeMaestro cleanup system provides a simple, safe way to remove framework files from final deliverables:

1. **Two items removed:** `.CodeMaestro/` directory and `CLAUDE.md` file
2. **Everything else preserved:** All user documentation, code, tests, and project files
3. **Four modes:** `--verify`, `--apply`, `--ci`, `--validate-build`
4. **CI/CD ready:** Exit codes and non-interactive mode for automation
5. **Phase 5 integration:** Built into release workflow

**Best Practices:**
- ✅ Always run `--verify` first
- ✅ Run cleanup only in Phase 5
- ✅ Validate builds with `--validate-build`
- ✅ Configure platform-specific exclusions (.dockerignore, etc.)
- ❌ Don't run cleanup during development
- ❌ Don't modify cleanup.sh unless necessary

---

**See Also:**
- [../docs/COMMANDS-CORE.md](../docs/COMMANDS-CORE.md) - Command reference
- [../prompts/05-master-control.md](../prompts/05-master-control.md) - Phase 5 workflow
- [templates/cleanup-script-template.sh](templates/cleanup-script-template.sh) - Script source

**Version:** 1.0.0
**Last Updated:** 2026-01-16
**Part of:** CodeMaestro v1.0.0 (Codename: Phoenix)
