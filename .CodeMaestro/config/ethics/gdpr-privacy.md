# GDPR & Privacy Compliance Guide

**CodeMaestro v1.0.0**
**Purpose:** Detailed GDPR and privacy compliance checklist and implementation guidance
**Load When:** Project handles EU user data or requires GDPR compliance
**Status:** Placeholder - To be populated from original ethics-validation.md

---

## Overview

This guide provides comprehensive GDPR compliance validation, PII detection, consent management, and privacy policy generation guidance.

**Note:** This is a placeholder file. Full content (~400-500 lines) includes:
- Complete GDPR Article-by-Article checklist
- Lawful basis assessment framework
- Consent mechanism implementation
- PII detection and handling patterns
- Cookie consent validation
- Data retention policy templates
- Privacy policy generation
- CCPA considerations

**Parent Guide:** [../ethics-validation.md](../ethics-validation.md)

---

## Placeholder Content Structure

### Section 1: GDPR Compliance Checklist
- Article 5: Principles (lawfulness, fairness, transparency)
- Article 6: Lawful basis for processing
- Article 7: Conditions for consent
- Article 12-14: Information and communication
- Article 15-22: Data subject rights
- Article 25: Data protection by design and default
- Article 32: Security of processing
- Article 33-34: Breach notification

### Section 2: Implementation Patterns
- Consent banner implementation
- Cookie management
- Data subject access request (DSAR) handling
- Right to erasure ("right to be forgotten")
- Data portability
- Privacy-by-design architecture

### Section 3: Automated Validation
- PII detection in code (regex patterns, ML-based)
- Cookie consent verification
- Privacy policy completeness check
- Data retention policy validation

### Section 4: Tools and Libraries
- GDPR compliance tools (Node.js, Python, React)
- Cookie consent libraries (CookieBot, OneTrust alternatives)
- PII detection frameworks

---

## Quick Reference

**Command:** `/ethics privacy --gdpr`

**Critical GDPR Requirements:**
1. Lawful basis for processing personal data
2. Clear, affirmative consent (not pre-checked boxes)
3. Privacy policy accessible and understandable
4. Data subject rights implemented (access, erasure, portability)
5. Data retention policy defined
6. Breach notification procedure (72 hours)

**Common Violations:**
- Missing cookie consent banner
- Pre-checked consent checkboxes
- Vague privacy policy language
- No mechanism for data deletion
- Storing data longer than necessary

---

## Related Documentation

- **Core System:** [../ethics-validation.md](../ethics-validation.md)
- **Accessibility:** [accessibility-wcag.md](accessibility-wcag.md)
- **ML Fairness:** [ml-fairness.md](ml-fairness.md)

---

## Version

**GDPR Guide Version:** 1.0.0 (Placeholder)
**Last Updated:** 2026-01-19
**Status:** Placeholder structure - Full content to be populated
