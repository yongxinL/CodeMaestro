# Template Customization System

**Version:** 1.0
**Status:** Active
**Risk:** ✅ ZERO - Defaults preserved

---

## Overview

The Template Customization System allows users to override default CodeMaestro templates with project-specific versions. This enables customization for different domains (Mobile, Web, Cloud, AI) or organizational standards while preserving the default templates as fallbacks.

## How It Works

### Loading Priority

1. **Check for override:** `.CodeMaestro/config/templates/[template-name]-override.md`
2. **Fallback to default:** `.CodeMaestro/prompts/[phase]-templates.md`

### Available Override Templates

| Template | Override File | Default Source |
|----------|---------------|----------------|
| Locked Specification | `specification-override.md` | `01-requirement-templates.md` |
| Architecture Blueprint | `blueprint-override.md` | `02-planning-templates.md` |
| Task Completion | `task-override.md` | `03-implementation-templates.md` |
| Evidence Package | `evidence-override.md` | `04-verification-templates.md` |
| Release Notes | `release-notes-override.md` | `05-master-control-templates.md` |
| Lessons Learned | `lessons-learned-override.md` | `05-master-control-templates.md` |

---

## Creating Template Overrides

### Step 1: Copy Default Template

Extract the template you want to customize from the phase templates file:

```bash
# Example: Customize the locked specification template
# 1. Find the template section in .CodeMaestro/prompts/01-requirement-templates.md
# 2. Copy the template content
# 3. Create override file
```

### Step 2: Create Override File

Create a new file in `.CodeMaestro/config/templates/` with the `-override.md` suffix:

```bash
touch .CodeMaestro/config/templates/specification-override.md
```

### Step 3: Customize Template

Modify the template to match your project needs while preserving essential sections:

**Example: Mobile-Specific Specification Template**
```markdown
# Locked Specification v{VERSION}

## Product Vision
[Standard section]

## Target Platforms
- iOS: {iOS_VERSION}
- Android: {ANDROID_VERSION}

## Device Support
- Screen Sizes: {SCREEN_SIZES}
- Orientations: {ORIENTATIONS}

## Performance Requirements (Mobile-Specific)
- App Launch Time: < 2s (cold start)
- Frame Rate: 60 FPS minimum
- Memory Usage: < 150MB idle
- Battery Impact: Minimal (< 5%/hour background)

[Continue with other sections...]
```

### Step 4: Test Override

Start a new phase and verify your override template is loaded:

```bash
# In Claude Code:
> "Start Phase 1"
# Check if custom template is used
```

---

## Template Override Examples

### Example 1: Mobile App Specification

**File:** `specification-override.md`

**Customizations:**
- Added platform-specific sections (iOS/Android)
- Mobile-specific performance thresholds
- App Store compliance checklist
- Device compatibility matrix

### Example 2: Cloud Service Blueprint

**File:** `blueprint-override.md`

**Customizations:**
- Cloud provider section (AWS/Azure/GCP)
- Infrastructure as Code section
- Scalability requirements
- Cost estimation
- Multi-region deployment strategy

### Example 3: AI/ML Project Evidence

**File:** `evidence-override.md`

**Customizations:**
- Model performance metrics (accuracy, precision, recall)
- Training data statistics
- Bias detection results
- Model interpretability
- Fairness metrics

---

## Domain-Specific Template Sets

### Mobile Development

**Recommended Overrides:**
- `specification-override.md`: Platform requirements, device matrix
- `blueprint-override.md`: Navigation architecture, state management
- `evidence-override.md`: App Store compliance, device testing

**Template Location:** `.CodeMaestro/config/templates/mobile/`

### Web Applications

**Recommended Overrides:**
- `specification-override.md`: Browser support, responsive breakpoints
- `blueprint-override.md`: Component hierarchy, API structure
- `evidence-override.md`: Cross-browser testing, accessibility

**Template Location:** `.CodeMaestro/config/templates/web/`

### Cloud Services

**Recommended Overrides:**
- `specification-override.md`: SLA requirements, scaling targets
- `blueprint-override.md`: Infrastructure architecture, service mesh
- `evidence-override.md`: Load testing, cost analysis

**Template Location:** `.CodeMaestro/config/templates/cloud/`

### AI/ML Projects

**Recommended Overrides:**
- `specification-override.md`: Model requirements, data needs
- `blueprint-override.md`: Pipeline architecture, training strategy
- `evidence-override.md`: Model evaluation, bias detection

**Template Location:** `.CodeMaestro/config/templates/ai/`

---

## Usage Instructions

### For Claude Code Users

When starting a phase, Claude will automatically check for overrides:

```
> "Start Phase 1"

🔍 Checking for template overrides...
✅ Found: .CodeMaestro/config/templates/specification-override.md
📋 Using custom specification template

[Proceeds with custom template]
```

### For Manual Users

1. Check if override exists: `ls .CodeMaestro/config/templates/*-override.md`
2. If exists, use override template
3. If not, use default from `.CodeMaestro/prompts/[phase]-templates.md`

---

## Organizational Templates

### Creating Organization-Wide Templates

For teams wanting consistent templates across projects:

1. Create organization template repository
2. Store override templates
3. Copy to new projects during initialization

**Example:**
```bash
# In organization repo
.codemaestro-templates/
├── specification-override.md
├── blueprint-override.md
└── evidence-override.md

# Copy to new project
cp .codemaestro-templates/* /path/to/project/.CodeMaestro/config/templates/
```

---

## Best Practices

### ✅ Do:
- Preserve essential sections from default templates
- Document why customizations were made
- Test overrides before using in production projects
- Version control override templates
- Share successful overrides with team

### ❌ Don't:
- Remove required sections (e.g., quality gates, constraints)
- Create overrides that violate core constraints (A1-E33)
- Over-customize to the point of losing structure
- Forget to update overrides when default templates change

---

## Maintenance

### Keeping Overrides Up-to-Date

When CodeMaestro updates default templates:

1. Review changelog for template changes
2. Check if changes affect your overrides
3. Merge beneficial changes into overrides
4. Test updated overrides

### Version Compatibility

Override templates should include a version header:

```markdown
<!-- Template Override Version -->
**Override Version:** 1.0
**Compatible With:** CodeMaestro 1.0+
**Last Updated:** 2026-01-13
```

---

## Troubleshooting

### Override Not Loading

**Issue:** Default template used instead of override

**Solutions:**
1. Check filename ends with `-override.md`
2. Verify file is in `.CodeMaestro/config/templates/`
3. Check file permissions
4. Verify file is not empty

### Missing Required Sections

**Issue:** Phase validation fails

**Solution:** Ensure override includes all required sections from default template

### Conflicting Formats

**Issue:** Template sections incompatible with phase workflow

**Solution:** Review default template structure and preserve section order

---

## Examples Directory

Pre-built override examples are available:

```bash
.CodeMaestro/config/templates/examples/
├── mobile/
│   ├── specification-override.md
│   ├── blueprint-override.md
│   └── evidence-override.md
├── web/
│   └── [similar structure]
├── cloud/
│   └── [similar structure]
└── ai/
    └── [similar structure]
```

**To use:**
```bash
cp .CodeMaestro/config/templates/examples/mobile/* .CodeMaestro/config/templates/
```

---

## Support

For questions or issues with template customization:

1. Review this README
2. Check examples in `.CodeMaestro/config/templates/examples/`
3. Consult default templates in `.CodeMaestro/prompts/`
4. Refer to COMMANDS.md for template-related commands

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-13 | Initial template customization system |

---

**Status:** ✅ Ready for use
**Risk:** ✅ ZERO - Defaults preserved, overrides optional
**Impact:** Enables project-specific customization without modifying core system
