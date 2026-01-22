# Accessibility (WCAG 2.1) Compliance Guide

**CodeMaestro v1.0.0**
**Purpose:** Detailed WCAG 2.1 Level AA/AAA compliance checklist and implementation patterns
**Load When:** Public-facing application or accessibility requirements exist
**Status:** Placeholder - To be populated from original ethics-validation.md

---

## Overview

This guide provides comprehensive WCAG 2.1 accessibility validation, including Level AA (legal requirement) and Level AAA (best practice) compliance.

**Note:** This is a placeholder file. Full content (~400-500 lines) includes:
- Complete WCAG 2.1 Level AA checklist (50+ success criteria)
- WCAG 2.1 Level AAA additional criteria
- Screen reader compatibility patterns
- Keyboard navigation implementation
- Color contrast calculations
- ARIA landmark and role usage
- Common accessibility violations and fixes
- Testing tools and workflows

**Parent Guide:** [../ethics-validation.md](../ethics-validation.md)

---

## Placeholder Content Structure

### Section 1: WCAG 2.1 Level AA Checklist
**Principle 1: Perceivable**
- 1.1 Text Alternatives (alt text for images)
- 1.2 Time-based Media (captions, transcripts)
- 1.3 Adaptable (semantic HTML, proper heading hierarchy)
- 1.4 Distinguishable (color contrast, text resize)

**Principle 2: Operable**
- 2.1 Keyboard Accessible (all functionality via keyboard)
- 2.2 Enough Time (no time limits or adjustable)
- 2.3 Seizures (no flashing content)
- 2.4 Navigable (skip links, focus indicators, page titles)
- 2.5 Input Modalities (touch targets, pointer cancellation)

**Principle 3: Understandable**
- 3.1 Readable (language specified, plain language)
- 3.2 Predictable (consistent navigation, no surprise context changes)
- 3.3 Input Assistance (error identification, labels, error suggestions)

**Principle 4: Robust**
- 4.1 Compatible (valid HTML, proper ARIA usage)

### Section 2: Implementation Patterns
- Skip navigation links
- Keyboard focus management
- Screen reader announcements (ARIA live regions)
- Form accessibility (labels, error messages, required fields)
- Modal dialog accessibility
- Table accessibility
- Responsive accessibility (mobile considerations)

### Section 3: Automated Validation
- axe-core integration (JavaScript)
- Pa11y integration (Node.js CLI)
- Lighthouse accessibility audit
- Color contrast checker (WCAG AA: 4.5:1, AAA: 7:1)

### Section 4: Manual Testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Browser zoom testing (200% minimum)
- High contrast mode testing

---

## Quick Reference

**Command:** `/ethics accessibility`

**Critical WCAG AA Requirements:**
1. All images have alt text
2. Color contrast ≥4.5:1 (text) or ≥3:1 (large text)
3. All functionality accessible via keyboard
4. Form inputs have labels
5. Page has `<title>` and language specified
6. No keyboard traps
7. Focus indicators visible

**Common Violations:**
- Missing alt text on images
- Insufficient color contrast
- Missing form labels
- Non-semantic HTML (`<div>` instead of `<button>`)
- No skip navigation link
- Missing ARIA labels on icon buttons

---

## Related Documentation

- **Core System:** [../ethics-validation.md](../ethics-validation.md)
- **GDPR:** [gdpr-privacy.md](gdpr-privacy.md)
- **ML Fairness:** [ml-fairness.md](ml-fairness.md)

---

## Version

**Accessibility Guide Version:** 1.0.0 (Placeholder)
**Last Updated:** 2026-01-19
**Status:** Placeholder structure - Full content to be populated
