# Ethics Validation Detailed Guides

**CodeMaestro v1.0.0**
**Purpose:** Progressive disclosure for ethics validation categories
**Status:** Active

---

## Overview

This directory contains detailed implementation guides for each ethics validation category. These files are loaded **on-demand** when specific ethics requirements exist.

**Progressive Disclosure Strategy:**
- Core commands and workflow → [../ethics-validation.md](../ethics-validation.md)
- Detailed category guides → This directory (load only when needed)

---

## Available Guides

### 1. GDPR & Privacy Compliance
**File:** [gdpr-privacy.md](gdpr-privacy.md)

**Load when:**
- Project handles EU user data
- GDPR compliance required
- Privacy policy needed
- Cookie consent required

**Contents:**
- Complete GDPR compliance checklist
- Lawful basis assessment
- Consent management implementation
- PII detection and handling
- Data retention policies
- Privacy policy templates
- CCPA considerations

---

### 2. Accessibility (WCAG 2.1)
**File:** [accessibility-wcag.md](accessibility-wcag.md)

**Load when:**
- Public-facing web application
- Government/education sector project
- Accessibility laws apply (ADA, Section 508)
- WCAG Level AA/AAA required

**Contents:**
- WCAG 2.1 Level AA checklist (50+ criteria)
- WCAG 2.1 Level AAA additional requirements
- Screen reader compatibility guide
- Keyboard navigation patterns
- Color contrast calculations
- ARIA implementation
- Common accessibility issues and fixes

---

### 3. Algorithmic Fairness & ML Bias
**File:** [ml-fairness.md](ml-fairness.md)

**Load when:**
- Project includes ML/AI models
- Risk of discriminatory outcomes
- Fairness requirements exist
- Regulated industries (lending, hiring, insurance)

**Contents:**
- Fairness metrics (demographic parity, equalized odds, equal opportunity)
- Protected attribute analysis (race, gender, age)
- Dataset bias detection
- Model explainability (SHAP, LIME)
- Bias mitigation strategies
- Fairness-aware training techniques
- Testing and validation frameworks

---

## File Status

| Guide | Status | Lines | Priority |
|-------|--------|-------|----------|
| gdpr-privacy.md | 📋 Placeholder | TBD | High |
| accessibility-wcag.md | 📋 Placeholder | TBD | High |
| ml-fairness.md | 📋 Placeholder | TBD | Medium |

**Note:** Full detailed guides to be populated from original ethics-validation.md content (~1,200 lines). Currently using placeholder structure for progressive disclosure architecture.

---

## Usage Pattern

### Conditional Loading Example

```markdown
<!-- In Phase 4 verification -->

**Ethics Requirements Detected:** GDPR compliance needed

**Action:** Load detailed guide
1. Read core commands: ../ethics-validation.md
2. Load GDPR guide: ethics/gdpr-privacy.md
3. Run `/ethics privacy --gdpr`
4. Implement fixes based on detailed checklist
5. Re-scan and verify
```

### Token Optimization

**Without Progressive Disclosure:**
- Load all ethics content: ~1,537 lines (~11,000 tokens)

**With Progressive Disclosure:**
- Load core only: 355 lines (~2,500 tokens)
- Load GDPR guide if needed: +400 lines (~2,800 tokens)
- **Savings when GDPR not needed:** ~5,700 tokens (52%)

---

## Related Documentation

- **Parent:** [../ethics-validation.md](../ethics-validation.md) - Core system and commands
- **Integration:** [../../prompts/04-verification.md](../../prompts/04-verification.md) - Phase 4 workflow
- **Role:** [../roles/ethics-security-engineer.md](../roles/ethics-security-engineer.md) - Ethics Engineer

---

## Version

**Ethics Guides Version:** 1.0.0
**Last Updated:** 2026-01-19
**Structure:** Progressive disclosure placeholders
