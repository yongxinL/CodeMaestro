# Ethics & Bias Validation Automation

**Version:** 1.0.0
**Phase Integration:** Phase 2 (Planning), Phase 4 (Verification)
**Risk Level:** ✅ ZERO RISK (Complements manual ethics checklist, advisory only)
**Status:** Phase F Implementation

---

## Overview

The Ethics & Bias Validation system automates compliance checking for privacy, accessibility, fairness, and ethical AI practices. It scans codebases for potential ethical issues, GDPR violations, accessibility barriers, and algorithmic bias, providing actionable recommendations.

### Key Features

- **Privacy Compliance:** GDPR, CCPA, HIPAA violation detection
- **Accessibility Scanning:** WCAG 2.1 Level AA/AAA compliance
- **Algorithmic Fairness:** Bias detection in ML models
- **Data Ethics:** Personal data collection analysis
- **Security Ethics:** Ethical security practices validation
- **User Consent:** Cookie consent and data processing checks

### Risk Mitigation

✅ **ZERO RISK** - All scans are advisory only. The system never modifies code or blocks development. It complements manual ethics reviews with automated detection.

---

## Command Reference

### `/ethics scan`

Comprehensive ethics and compliance scan across all categories.

**Syntax:**
```bash
/ethics scan
/ethics scan --category [privacy|accessibility|fairness|security|all]
/ethics scan --severity [info|warning|critical]
```

**Examples:**
```bash
# Full ethics scan
/ethics scan

# Scan specific category
/ethics scan --category privacy

# Show only critical issues
/ethics scan --severity critical
```

**Output (All Compliant):**
```
Ethics & Compliance Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Privacy & Data Protection
  ✅ GDPR Compliance: PASSED
     - Data collection consent flows implemented
     - Privacy policy linked on all forms
     - Data retention policies documented
     - Right to deletion implemented

  ✅ CCPA Compliance: PASSED
     - "Do Not Sell My Info" option available
     - California residents data handling compliant

  ✅ Personal Data Handling: PASSED
     - PII encryption at rest ✅
     - PII encryption in transit ✅
     - Access logging enabled ✅
     - Data anonymization available ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

♿ Accessibility (WCAG 2.1 Level AA)
  ✅ Color Contrast: PASSED
     - All text meets 4.5:1 contrast ratio
     - Large text meets 3:1 contrast ratio

  ✅ Keyboard Navigation: PASSED
     - All interactive elements keyboard accessible
     - Focus indicators visible
     - Tab order logical

  ✅ Screen Reader Compatibility: PASSED
     - ARIA labels on all form inputs
     - Alt text on all images
     - Semantic HTML structure

  ✅ Form Validation: PASSED
     - Error messages descriptive and accessible
     - Required fields clearly marked

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚖️  Algorithmic Fairness
  ℹ️  No ML models detected (N/A)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 Security Ethics
  ✅ Password Security: PASSED
     - Bcrypt hashing used (cost factor: 12)
     - No passwords in logs
     - Password reset flow secure

  ✅ API Key Management: PASSED
     - No hardcoded API keys detected
     - Environment variables used
     - Key rotation documented

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
  ✅ 0 Critical Issues
  ✅ 0 Warnings
  ℹ️  1 Info (ML fairness N/A - no ML models)

Overall Status: ✅ COMPLIANT

Quality Gate: PASSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Output (Issues Detected):**
```
Ethics & Compliance Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 Privacy & Data Protection
  🚫 GDPR Compliance: FAILED (3 issues)

     Issue 1: Missing Cookie Consent Banner
     Severity: CRITICAL
     Location: src/pages/index.html
     Description: Website uses Google Analytics without user consent
     GDPR Requirement: Article 6 (Lawful basis for processing)
     Fix:
       - Add cookie consent banner on first visit
       - Only load analytics after user consent
       - Provide "Accept All" / "Reject All" / "Manage" options
     Example: https://gdpr.eu/cookie-consent-examples/

     Issue 2: No Privacy Policy Link on Sign-Up Form
     Severity: CRITICAL
     Location: src/components/SignUpForm.tsx (line 45)
     Description: User can sign up without seeing privacy policy
     GDPR Requirement: Article 13 (Information to be provided)
     Fix:
       - Add checkbox: "I have read and accept the Privacy Policy"
       - Link to privacy policy in checkbox label
       - Make checkbox required

     Issue 3: Personal Data Stored Without Encryption
     Severity: CRITICAL
     Location: database schema (users.email, users.phone)
     Description: Email and phone stored in plaintext
     GDPR Requirement: Article 32 (Security of processing)
     Fix:
       - Encrypt PII at rest using AES-256
       - Use application-level encryption (not just disk encryption)
       - Document encryption key management

  ⚠️  Data Retention: WARNING
     Issue: No documented data retention policy
     Location: docs/specifications/
     Description: GDPR requires documenting how long data is kept
     GDPR Requirement: Article 13.2(a)
     Fix:
       - Document retention periods in privacy policy
       - Implement automated data deletion after retention period
       - Example: "User accounts deleted 2 years after inactivity"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

♿ Accessibility (WCAG 2.1 Level AA)
  ⚠️  Color Contrast: WARNING (2 issues)

     Issue 1: Low Contrast on Button
     Severity: WARNING
     Location: src/components/Button.tsx (line 12)
     Element: <button className="btn-secondary">
     Contrast Ratio: 3.2:1 (needs 4.5:1)
     Foreground: #999999
     Background: #FFFFFF
     Fix:
       - Darken button text to #767676 (4.5:1 contrast)
       - Or increase background contrast

     Issue 2: Low Contrast on Link
     Severity: WARNING
     Location: src/components/Footer.tsx (line 28)
     Element: <a href="/terms">Terms</a>
     Contrast Ratio: 3.8:1 (needs 4.5:1)
     Fix:
       - Adjust link color to meet 4.5:1 minimum

  🚫 Keyboard Navigation: FAILED

     Issue: Modal Dialog Keyboard Trap
     Severity: CRITICAL
     Location: src/components/Modal.tsx (line 55)
     Description: User cannot tab out of modal, no Escape key handler
     WCAG Criterion: 2.1.2 (No Keyboard Trap)
     Fix:
       - Add Escape key handler to close modal
       - Trap focus within modal but allow Escape exit
       - Return focus to trigger element on close
     Example Code:
       ```tsx
       useEffect(() => {
         const handleEscape = (e) => {
           if (e.key === 'Escape') closeModal();
         };
         document.addEventListener('keydown', handleEscape);
         return () => document.removeEventListener('keydown', handleEscape);
       }, []);
       ```

  ⚠️  Screen Reader Compatibility: WARNING

     Issue: Missing ARIA Labels on Form Inputs
     Severity: WARNING
     Location: src/components/SearchForm.tsx (line 22)
     Description: Search input has placeholder but no label
     WCAG Criterion: 4.1.2 (Name, Role, Value)
     Fix:
       - Add <label> or aria-label attribute
       - Placeholders are not sufficient for accessibility

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚖️  Algorithmic Fairness
  🚫 BIAS DETECTED (2 issues)

     Issue 1: Protected Attribute in Training Data
     Severity: CRITICAL
     Location: ml/models/credit_scoring.py (line 145)
     Model: Credit Scoring Model
     Description: Training data includes "gender" and "race" features
     Risk: Model may learn discriminatory patterns
     Legal Risk: Violates Equal Credit Opportunity Act (ECOA)
     Fix:
       - Remove protected attributes from training data
       - Use fairness-aware learning algorithms
       - Document feature selection rationale
     Recommendation: Use "Fairlearn" library for bias mitigation

     Issue 2: No Fairness Metrics Calculated
     Severity: CRITICAL
     Location: ml/evaluation/
     Description: Model deployed without fairness evaluation
     Required Metrics:
       - Demographic Parity: P(Y=1|A=a) similar across groups
       - Equalized Odds: TPR and FPR equal across groups
       - Individual Fairness: Similar individuals get similar predictions
     Fix:
       - Calculate fairness metrics before deployment
       - Document fairness evaluation in model card
       - Set fairness thresholds (e.g., <10% disparity)
     Tools: Fairlearn, AI Fairness 360, What-If Tool

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 Security Ethics
  ✅ Password Security: PASSED

  ⚠️  API Key Exposure: WARNING
     Issue: Sensitive API key in client-side code
     Severity: WARNING
     Location: src/config/api.ts (line 8)
     Description: Stripe publishable key committed to repository
     Risk: Low (publishable keys are public) but bad practice
     Fix:
       - Move to environment variables
       - Document which keys are public vs secret

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
  🚫 6 Critical Issues
  ⚠️  5 Warnings
  ℹ️  0 Info

Overall Status: 🚫 NON-COMPLIANT

Quality Gate: FAILED (critical ethics issues must be resolved)

Cannot proceed to Phase 5 until critical issues resolved.

Next Steps:
  1. Fix critical GDPR issues (cookie consent, privacy policy, encryption)
  2. Fix critical accessibility issues (keyboard trap, missing labels)
  3. Fix critical ML bias issues (remove protected attributes, evaluate fairness)
  4. Address warnings for full compliance
  5. Re-run `/ethics scan` to verify fixes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/ethics privacy`

Scan privacy and data protection compliance.

**Syntax:**
```bash
/ethics privacy
/ethics privacy --regulation [gdpr|ccpa|hipaa|all]
/ethics privacy --detailed
```

**Examples:**
```bash
# Full privacy scan
/ethics privacy

# GDPR-specific scan
/ethics privacy --regulation gdpr

# Detailed analysis with recommendations
/ethics privacy --detailed
```

**Output:**
```
Privacy & Data Protection Scan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 GDPR Compliance Analysis

Article 6: Lawful Basis for Processing
  ✅ Consent flows implemented
  ⚠️  Cookie consent missing for analytics

Article 13: Information to be Provided
  ✅ Privacy policy exists (docs/legal/privacy-policy.md)
  🚫 Privacy policy not linked on sign-up form
  ✅ Data controller contact information provided

Article 15: Right of Access
  ✅ API endpoint for data export implemented
  ✅ User can download personal data (JSON format)

Article 17: Right to Erasure ("Right to be Forgotten")
  ✅ Account deletion implemented
  ⚠️  Soft delete used (data retained 30 days)
  ℹ️  Document retention period in privacy policy

Article 25: Data Protection by Design
  ⚠️  PII stored unencrypted (email, phone)
  ✅ Password hashing strong (bcrypt, cost 12)
  ✅ HTTPS enforced

Article 32: Security of Processing
  ✅ TLS 1.3 encryption in transit
  🚫 No encryption at rest for PII
  ✅ Access logging enabled
  ✅ Security headers configured

Article 33: Breach Notification
  ⚠️  No documented breach response plan
  Recommendation: Create incident response playbook

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔒 CCPA Compliance Analysis (California residents)

Right to Know
  ✅ Privacy policy discloses data collection
  ✅ Categories of personal info disclosed

Right to Delete
  ✅ Account deletion implemented

Right to Opt-Out
  🚫 No "Do Not Sell My Info" link
  Fix: Add to footer (required even if not selling data)

Non-Discrimination
  ✅ No pricing differences based on data sharing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Personal Data Inventory

Collected Data:
  - Email address (required, stored unencrypted) 🚫
  - Full name (required, stored unencrypted) 🚫
  - Phone number (optional, stored unencrypted) 🚫
  - IP address (logged, anonymized after 30 days) ✅
  - Geolocation (city-level, no GPS) ✅
  - Device information (browser, OS) ✅

Third-Party Sharing:
  - Google Analytics (analytics tracking) ⚠️ No consent
  - Stripe (payment processing) ✅ Necessary for service
  - SendGrid (transactional emails) ✅ Necessary for service

Data Retention:
  - Active users: Indefinite ⚠️ Should document maximum retention
  - Deleted accounts: 30 days (soft delete) ✅
  - Logs: 90 days ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommendations:

Priority 1 (Critical):
  1. Encrypt PII at rest (email, phone, name)
  2. Add cookie consent for Google Analytics
  3. Link privacy policy on sign-up form
  4. Add "Do Not Sell My Info" link (CCPA)

Priority 2 (High):
  5. Document data retention periods
  6. Create data breach response plan
  7. Implement granular consent (analytics vs marketing)

Priority 3 (Medium):
  8. Consider GDPR-compliant analytics (Plausible, Matomo)
  9. Add data processing agreements (DPAs) for third parties
  10. Implement automated data retention deletion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/ethics accessibility`

Scan for WCAG accessibility compliance.

**Syntax:**
```bash
/ethics accessibility
/ethics accessibility --level [A|AA|AAA]
/ethics accessibility --format [summary|detailed|html]
```

**Examples:**
```bash
# WCAG 2.1 Level AA scan (default)
/ethics accessibility

# WCAG 2.1 Level AAA scan (stricter)
/ethics accessibility --level AAA

# Generate HTML report
/ethics accessibility --format html --output accessibility-report.html
```

**Output:**
```
Accessibility Scan (WCAG 2.1 Level AA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principle 1: Perceivable

  1.1 Text Alternatives
    ✅ 1.1.1: All images have alt text (45/45 images)

  1.3 Adaptable
    ✅ 1.3.1: Info and relationships (semantic HTML)
    ⚠️  1.3.2: Meaningful sequence (1 issue)
       - Issue: Form labels after inputs (should be before)
       - Location: src/components/LoginForm.tsx (line 28)

  1.4 Distinguishable
    ⚠️  1.4.3: Contrast minimum (2 issues)
       - Issue 1: Button text 3.2:1 (needs 4.5:1)
       - Issue 2: Link text 3.8:1 (needs 4.5:1)
    ✅ 1.4.11: Non-text contrast (icons meet 3:1)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principle 2: Operable

  2.1 Keyboard Accessible
    🚫 2.1.1: Keyboard (1 critical issue)
       - Issue: Custom dropdown not keyboard accessible
       - Location: src/components/Dropdown.tsx
       - Fix: Add keyboard event handlers (Enter, Escape, Arrow keys)
    🚫 2.1.2: No keyboard trap (1 critical issue)
       - Issue: Modal dialog traps focus without Escape exit
       - Location: src/components/Modal.tsx

  2.4 Navigable
    ✅ 2.4.1: Bypass blocks (skip to main content link)
    ⚠️  2.4.4: Link purpose (5 "click here" links)
       - Use descriptive link text instead of "click here"
    ✅ 2.4.7: Focus visible (focus indicators present)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principle 3: Understandable

  3.1 Readable
    ✅ 3.1.1: Language of page declared (<html lang="en">)

  3.2 Predictable
    ✅ 3.2.1: On focus (no unexpected context changes)
    ✅ 3.2.2: On input (no automatic submission)

  3.3 Input Assistance
    ⚠️  3.3.2: Labels or instructions (3 issues)
       - Issue: Search input has placeholder but no label
       - Issue: Password field missing requirements
       - Issue: Date picker format not explained

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Principle 4: Robust

  4.1 Compatible
    ⚠️  4.1.2: Name, role, value (2 issues)
       - Issue: Custom checkbox missing aria-checked
       - Issue: Custom radio group missing role="radiogroup"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
  🚫 2 Critical Issues (keyboard accessibility)
  ⚠️  8 Warnings (contrast, labels, ARIA)
  ✅ 12 Passed Checks

Compliance Level: FAILED (Level AA not achieved)

Recommended Fixes (Priority Order):
  1. Fix keyboard trap in modal (critical)
  2. Add keyboard navigation to dropdown (critical)
  3. Improve color contrast on buttons and links (high)
  4. Add ARIA labels to form inputs (high)
  5. Make custom controls keyboard accessible (high)
  6. Use descriptive link text instead of "click here" (medium)

Tools for Testing:
  - axe DevTools (browser extension)
  - NVDA/JAWS screen readers
  - Keyboard-only navigation testing
  - Lighthouse accessibility audit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/ethics fairness`

Scan ML models for algorithmic bias and fairness.

**Syntax:**
```bash
/ethics fairness
/ethics fairness --model [model-path]
/ethics fairness --metrics [demographic-parity|equalized-odds|individual-fairness|all]
```

**Examples:**
```bash
# Scan all ML models
/ethics fairness

# Scan specific model
/ethics fairness --model ml/models/credit_scoring.pkl

# Calculate specific fairness metrics
/ethics fairness --metrics demographic-parity
```

**Output:**
```
Algorithmic Fairness Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Model: Credit Scoring Model
Location: ml/models/credit_scoring.pkl
Type: Logistic Regression
Purpose: Predict credit approval likelihood

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Training Data Analysis

Features Used (20 total):
  ✅ income (numerical)
  ✅ employment_years (numerical)
  ✅ debt_to_income_ratio (numerical)
  ✅ credit_history_length (numerical)
  🚫 gender (categorical) ← PROTECTED ATTRIBUTE
  🚫 race (categorical) ← PROTECTED ATTRIBUTE
  ✅ age (numerical) ⚠️ Age can be proxy for discrimination
  ✅ zip_code (categorical) ⚠️ Zip code can be proxy for race

Protected Attributes Detected:
  🚫 Direct use of "gender" violates equal credit laws (ECOA)
  🚫 Direct use of "race" violates equal credit laws (ECOA)
  ⚠️  "age" is protected for 40+ individuals (Age Discrimination Act)
  ⚠️  "zip_code" may be proxy for race (redlining concerns)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚖️  Fairness Metrics Evaluation

Test Dataset: 10,000 samples (5,000 approved, 5,000 denied)

Demographic Parity (across gender):
  Goal: P(approved | male) ≈ P(approved | female)

  Approval Rate (Male): 55% (2,750/5,000)
  Approval Rate (Female): 42% (2,100/5,000)
  Disparity: 13 percentage points 🚫 BIASED

  Threshold: Max 5% disparity (legal standard)
  Result: FAILED (exceeds threshold by 8%)

Equalized Odds (across gender):
  Goal: TPR and FPR equal across groups

  True Positive Rate:
    Male: 78% (correctly approved qualified applicants)
    Female: 65% (correctly approved qualified applicants)
    Disparity: 13% 🚫 BIASED

  False Positive Rate:
    Male: 8% (incorrectly approved unqualified applicants)
    Female: 12% (incorrectly approved unqualified applicants)
    Disparity: 4% ⚠️ Slight bias

  Result: FAILED (TPR disparity exceeds 5% threshold)

Individual Fairness:
  Goal: Similar individuals get similar predictions

  Similarity Test (100 pairs of similar applicants):
    Same outcome: 82 pairs ✅
    Different outcome: 18 pairs ⚠️
    Consistency: 82% (goal: >90%)

  Result: WARNING (below 90% consistency target)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚖️  Disparate Impact Analysis (across race)

  Approval Rate (White): 58%
  Approval Rate (Black): 38%
  Approval Rate (Hispanic): 41%
  Approval Rate (Asian): 62%

  Disparate Impact Ratio (Black/White): 0.66 🚫 BIASED
  Legal Threshold: 0.80 (80% rule)
  Result: FAILED (38% / 58% = 0.66 < 0.80)

  Legal Risk: HIGH
    - Violates ECOA (Equal Credit Opportunity Act)
    - Potential lawsuit exposure
    - Regulatory fines possible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Feature Importance Analysis

Top 5 Most Important Features:
  1. debt_to_income_ratio (0.35) ✅ Legitimate
  2. gender (0.22) 🚫 ILLEGAL - Protected attribute
  3. income (0.18) ✅ Legitimate
  4. race (0.15) 🚫 ILLEGAL - Protected attribute
  5. credit_history_length (0.10) ✅ Legitimate

Critical Finding:
  🚫 Model relies heavily on protected attributes (gender: 22%, race: 15%)
  🚫 Model learns discriminatory patterns from training data
  🚫 Cannot be deployed in current state (legal violation)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommendations (Priority Order):

Priority 1 (Critical - Legal Compliance):
  1. Remove protected attributes from training data
     - Remove: gender, race
     - Review: age (40+ protected), zip_code (proxy for race)
  2. Re-train model without protected attributes
  3. Document feature selection rationale
  4. Consult legal team before deployment

Priority 2 (Bias Mitigation):
  5. Use bias mitigation techniques:
     - Pre-processing: Reweighting, sampling (Fairlearn)
     - In-processing: Adversarial debiasing (AIF360)
     - Post-processing: Threshold optimization (Fairlearn)
  6. Calculate fairness metrics after mitigation
  7. Set fairness constraints (<5% disparity)
  8. Monitor fairness in production

Priority 3 (Documentation & Governance):
  9. Create model card documenting:
     - Intended use and limitations
     - Training data and biases
     - Fairness evaluation results
     - Monitoring plan
  10. Establish ML governance process
  11. Regular fairness audits (quarterly)
  12. Implement explainability (SHAP, LIME)

Tools & Libraries:
  - Fairlearn (Microsoft): Bias mitigation and fairness metrics
  - AI Fairness 360 (IBM): Comprehensive fairness toolkit
  - What-If Tool (Google): Interactive fairness exploration
  - Aequitas: Bias and fairness audit toolkit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Assessment:

Status: 🚫 CRITICAL BIAS DETECTED

Legal Risk: CRITICAL
  - Model violates ECOA (Equal Credit Opportunity Act)
  - Disparate impact ratio below 80% threshold
  - Direct use of protected attributes

Deployment Recommendation: 🚫 DO NOT DEPLOY

Next Steps:
  1. Immediately remove model from production (if deployed)
  2. Remove protected attributes from training data
  3. Re-train and re-evaluate model
  4. Consult legal team for compliance review
  5. Implement continuous fairness monitoring

Cannot proceed to Phase 5 until bias resolved.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### `/ethics security`

Scan for ethical security practices.

**Syntax:**
```bash
/ethics security
/ethics security --category [passwords|encryption|logging|all]
```

**Examples:**
```bash
# Full security ethics scan
/ethics security

# Password security specific
/ethics security --category passwords
```

---

### `/ethics report`

Generate comprehensive ethics compliance report.

**Syntax:**
```bash
/ethics report
/ethics report --format [html|pdf|markdown]
/ethics report --output [file-path]
```

**Examples:**
```bash
# Generate HTML report
/ethics report --format html --output docs/verification/ethics-report-v1.0.html

# Generate PDF for legal/compliance team
/ethics report --format pdf
```

---

## How It Works

### 1. Privacy Compliance Scanning

**Detection Methods:**
- **Static Analysis:** Scan codebase for data collection, storage, processing
- **Configuration Check:** Verify cookie consent, privacy policy links
- **Database Schema Analysis:** Check encryption settings for PII columns
- **Third-Party Audit:** Identify external services receiving user data
- **API Endpoint Analysis:** Check data export/deletion endpoints

**GDPR Articles Checked:**
- Article 6 (Lawful basis)
- Article 13 (Information provided)
- Article 15 (Right of access)
- Article 17 (Right to erasure)
- Article 25 (Data protection by design)
- Article 32 (Security of processing)
- Article 33 (Breach notification)

### 2. Accessibility Scanning

**Detection Methods:**
- **HTML Parsing:** Check semantic structure, ARIA attributes
- **CSS Analysis:** Calculate color contrast ratios
- **JavaScript Analysis:** Detect keyboard event handlers
- **DOM Inspection:** Verify form labels, alt text, focus management
- **Automated Tools:** axe-core integration for WCAG validation

**WCAG Success Criteria Checked (Level AA):**
- 1.1.1 (Non-text content)
- 1.3.1 (Info and relationships)
- 1.4.3 (Contrast minimum)
- 2.1.1 (Keyboard)
- 2.1.2 (No keyboard trap)
- 2.4.7 (Focus visible)
- 3.3.2 (Labels or instructions)
- 4.1.2 (Name, role, value)

### 3. Algorithmic Fairness Analysis

**Detection Methods:**
- **Training Data Inspection:** Identify protected attributes
- **Feature Importance Analysis:** Check reliance on sensitive features
- **Fairness Metrics Calculation:** Demographic parity, equalized odds
- **Disparate Impact Testing:** 80% rule compliance
- **Proxy Detection:** Identify features correlated with protected attributes

**Fairness Metrics:**
```python
def calculate_demographic_parity(predictions, sensitive_attribute):
    """
    Demographic Parity: P(Y=1 | A=a) should be similar across groups
    """
    groups = predictions.groupby(sensitive_attribute)
    approval_rates = groups['approved'].mean()

    # Calculate max disparity
    max_rate = approval_rates.max()
    min_rate = approval_rates.min()
    disparity = (max_rate - min_rate) * 100

    # Threshold: Max 5% disparity
    passes = disparity <= 5.0

    return {
        'disparity_percentage': disparity,
        'passes': passes,
        'approval_rates': approval_rates.to_dict()
    }

def calculate_equalized_odds(predictions, sensitive_attribute, ground_truth):
    """
    Equalized Odds: TPR and FPR should be equal across groups
    """
    groups = predictions.groupby(sensitive_attribute)

    tpr_by_group = {}  # True Positive Rate
    fpr_by_group = {}  # False Positive Rate

    for group_name, group_data in groups:
        tp = ((group_data['predicted'] == 1) & (ground_truth == 1)).sum()
        fp = ((group_data['predicted'] == 1) & (ground_truth == 0)).sum()
        tn = ((group_data['predicted'] == 0) & (ground_truth == 0)).sum()
        fn = ((group_data['predicted'] == 0) & (ground_truth == 1)).sum()

        tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
        fpr = fp / (fp + tn) if (fp + tn) > 0 else 0

        tpr_by_group[group_name] = tpr
        fpr_by_group[group_name] = fpr

    # Calculate max disparities
    tpr_disparity = (max(tpr_by_group.values()) - min(tpr_by_group.values())) * 100
    fpr_disparity = (max(fpr_by_group.values()) - min(fpr_by_group.values())) * 100

    # Threshold: Max 5% disparity for both TPR and FPR
    passes = (tpr_disparity <= 5.0) and (fpr_disparity <= 5.0)

    return {
        'tpr_disparity': tpr_disparity,
        'fpr_disparity': fpr_disparity,
        'passes': passes,
        'tpr_by_group': tpr_by_group,
        'fpr_by_group': fpr_by_group
    }

def calculate_disparate_impact(predictions, sensitive_attribute):
    """
    Disparate Impact: Selection rate ratio must be >= 0.80 (80% rule)
    Legal standard from EEOC
    """
    groups = predictions.groupby(sensitive_attribute)
    selection_rates = groups['approved'].mean()

    # Find majority and minority groups
    majority_rate = selection_rates.max()
    minority_rate = selection_rates.min()

    # Calculate ratio
    impact_ratio = minority_rate / majority_rate if majority_rate > 0 else 0

    # Legal threshold: 0.80 (80% rule)
    passes = impact_ratio >= 0.80

    return {
        'impact_ratio': impact_ratio,
        'passes': passes,
        'legal_threshold': 0.80,
        'selection_rates': selection_rates.to_dict()
    }
```

### 4. Security Ethics Validation

**Checks Performed:**
- Password hashing strength (bcrypt cost factor >= 12)
- No passwords in logs or error messages
- API keys not hardcoded
- Secure password reset flow (no email-only reset)
- No sensitive data in URLs (query parameters)
- Session management security (httpOnly, secure flags)

---

## Integration with Phases

### Phase 2: Planning (Software Architect + Ethics Engineer)

**Usage:** Define ethical requirements and constraints

**Workflow:**
1. Identify personal data to be collected
2. Document lawful basis for processing (GDPR Article 6)
3. Plan accessibility from the start (shift-left approach)
4. For ML projects: Define fairness requirements
5. Document ethical considerations in blueprint

**Example:**
```markdown
<!-- docs/architecture/blueprint-v1.0.md -->

## Ethical Considerations

### Privacy & Data Protection

**Personal Data Collected:**
- Email (required): Lawful basis = Contract (user account)
- Name (required): Lawful basis = Contract (personalization)
- Phone (optional): Lawful basis = Consent (2FA feature)
- Location (city-level): Lawful basis = Legitimate interest (localization)

**Privacy Measures:**
- Cookie consent banner (Google Analytics requires consent)
- Privacy policy linked on sign-up form
- Data export API (GDPR Article 15)
- Account deletion (GDPR Article 17)
- PII encryption at rest (AES-256)
- Data retention: 2 years after last activity

**Third-Party Data Sharing:**
- Stripe (payment processing) - Necessary for service
- SendGrid (transactional emails) - Necessary for service
- Google Analytics (analytics) - Requires user consent

### Accessibility Requirements

**WCAG 2.1 Level AA Compliance:**
- Color contrast: All text 4.5:1 minimum
- Keyboard navigation: All features keyboard accessible
- Screen reader: ARIA labels on all interactive elements
- Focus management: Visible focus indicators
- Error handling: Descriptive error messages

**Testing Strategy:**
- Automated: axe-core in CI/CD pipeline
- Manual: Keyboard-only navigation testing
- Screen reader: NVDA/JAWS testing before release

### Algorithmic Fairness (if applicable)

**ML Model: N/A (no ML in v1.0)**

If ML added in future:
- No protected attributes in training data
- Fairness metrics calculated before deployment
- Model card documenting limitations and biases
- Quarterly fairness audits
```

**Commands Available in Phase 2:**
- Document ethical requirements in blueprint
- Plan compliance measures upfront
- Define accessibility acceptance criteria
- For ML: Define fairness metrics and thresholds

---

### Phase 4: Verification (QA Lead + Ethics Engineer)

**Usage:** Validate ethics compliance before release

**Workflow:**
1. Run `/ethics scan` for comprehensive check
2. Run category-specific scans (`/ethics privacy`, `/ethics accessibility`, `/ethics fairness`)
3. Review detected issues and prioritize fixes
4. Fix critical issues (blocking)
5. Document warnings (non-blocking but should fix)
6. Re-run scans after fixes
7. Generate `/ethics report` for documentation

**Example (First Scan):**
```bash
# Phase 4: First ethics scan
/ethics scan

Output:
🚫 6 Critical Issues Detected
⚠️  5 Warnings

Critical Issues Must Be Fixed Before Phase 5:
  1. Missing cookie consent banner (GDPR)
  2. Privacy policy not linked on sign-up (GDPR)
  3. PII stored unencrypted (GDPR Article 32)
  4. Keyboard trap in modal (WCAG 2.1.2)
  5. ML model uses protected attributes (ECOA violation)
  6. Disparate impact ratio 0.66 (legal threshold: 0.80)

Quality Gate: FAILED
Cannot proceed to Phase 5 until critical issues resolved.
```

**Example (After Fixes):**
```bash
# After addressing critical issues
/ethics scan

Output:
✅ 0 Critical Issues
⚠️  3 Warnings (non-blocking)

Warnings:
  1. Data retention policy not documented (should document)
  2. Some link text says "click here" (use descriptive text)
  3. API key in client code (low risk but move to env var)

Quality Gate: PASSED ✅
Warnings should be addressed but do not block Phase 5.

Ready to proceed to Phase 5 with documented warnings.
```

**Commands Available in Phase 4:**
- `/ethics scan` - Comprehensive ethics validation
- `/ethics privacy` - Privacy compliance check
- `/ethics accessibility` - WCAG validation
- `/ethics fairness` - ML bias detection (if applicable)
- `/ethics report` - Generate compliance report
- `/ethics security` - Security practices check

---

### Phase 5: Release (Release Manager)

**Usage:** Document ethics compliance in release notes

**Workflow:**
1. Generate final ethics report
2. Document compliance status in release notes
3. Archive ethics reports for regulatory purposes
4. Include warnings for future improvements
5. Document any compliance exceptions (with justification)

**Example:**
```markdown
<!-- docs/release/release-notes-v1.0.md -->

## Ethics & Compliance Summary

### Privacy Compliance
- ✅ GDPR Compliant (all critical issues resolved)
  - Cookie consent implemented
  - Privacy policy linked on all forms
  - PII encrypted at rest (AES-256)
  - Data export and deletion APIs functional
- ✅ CCPA Compliant (California residents)
  - "Do Not Sell My Info" link added to footer
  - Privacy policy discloses data practices

⚠️  Non-blocking Warning:
  - Data retention policy should be documented in privacy policy (planned for v1.1)

### Accessibility Compliance
- ✅ WCAG 2.1 Level AA Compliant
  - All critical issues resolved (keyboard traps, missing labels)
  - Color contrast meets 4.5:1 minimum
  - Screen reader compatible
  - Keyboard navigation functional

⚠️  Non-blocking Warnings:
  - 5 links use "click here" text (should use descriptive text)
  - Planned for v1.1 content review

### Algorithmic Fairness
- ℹ️  N/A (no ML models in v1.0)
- If ML added in future: Fairness validation required before deployment

### Security Ethics
- ✅ Password security compliant (bcrypt, cost 12)
- ✅ No hardcoded secrets
- ✅ Session management secure

### Ethics Report
- Full report: docs/verification/ethics-report-v1.0.html
- Compliance certificate generated for regulatory purposes

### Regulatory Approvals
- Legal team review: ✅ Approved (2026-01-20)
- Compliance team review: ✅ Approved (2026-01-21)
```

**Commands Available in Phase 5:**
- `/ethics report --format pdf` - Final compliance report for legal/compliance
- Document ethics status in release notes
- Archive ethics reports for audits

---

## Tools and Libraries

### Privacy & GDPR

**Static Analysis:**
- Custom CodeMaestro privacy scanner
- Cookiebot (cookie consent)
- OneTrust (privacy management platform)

**Encryption:**
- AWS KMS (key management)
- Database-level encryption (PostgreSQL pgcrypto)
- Application-level encryption (Node.js crypto)

### Accessibility

**Automated Testing:**
- axe-core: WCAG validation engine
- pa11y: Accessibility testing tool
- Lighthouse: Chrome accessibility audit
- WAVE: Web accessibility evaluation tool

**Manual Testing:**
- NVDA: Free screen reader (Windows)
- JAWS: Professional screen reader
- VoiceOver: Built-in screen reader (Mac/iOS)
- Keyboard navigation testing

### Algorithmic Fairness

**Bias Detection & Mitigation:**
- Fairlearn (Microsoft): Bias mitigation algorithms
- AI Fairness 360 (IBM): Comprehensive fairness toolkit
- What-If Tool (Google): Interactive fairness exploration
- Aequitas: Bias audit toolkit
- Themis: Discrimination testing

**Explainability:**
- SHAP: Shapley Additive Explanations
- LIME: Local Interpretable Model-Agnostic Explanations
- InterpretML: Model interpretability

---

## Configuration

### Ethics Validation Config

Edit `.CodeMaestro/config/ethics-validation-config.yaml`:

```yaml
ethics_validation:
  # Privacy compliance
  privacy:
    regulations:
      - gdpr  # European Union
      - ccpa  # California
      - hipaa  # Healthcare (if applicable)

    encryption:
      algorithm: AES-256
      pii_fields:  # Fields requiring encryption
        - email
        - phone
        - social_security_number
        - credit_card

    data_retention:
      active_users: "indefinite"  # Should document maximum
      deleted_accounts: 30 days  # Soft delete period
      logs: 90 days

    third_party_sharing:
      require_dpa: true  # Data Processing Agreements required
      allowed_services:
        - stripe  # Payment processing
        - sendgrid  # Transactional emails

      require_consent:
        - google_analytics
        - facebook_pixel
        - marketing_emails

  # Accessibility compliance
  accessibility:
    wcag_level: AA  # A, AA, or AAA
    wcag_version: "2.1"

    contrast_ratios:
      normal_text: 4.5  # WCAG AA minimum
      large_text: 3.0
      ui_components: 3.0

    automated_tools:
      - axe-core
      - pa11y
      - lighthouse

    manual_testing:
      keyboard_navigation: required
      screen_reader: required  # NVDA or JAWS

  # Algorithmic fairness (if ML models present)
  fairness:
    protected_attributes:  # Never use these in training
      - gender
      - race
      - religion
      - national_origin
      - age  # 40+ protected
      - disability

    proxy_attributes:  # Review carefully
      - zip_code  # May correlate with race
      - age  # May correlate with disabilities
      - income  # May correlate with protected classes

    fairness_metrics:
      demographic_parity:
        enabled: true
        max_disparity: 5%  # Max difference between groups

      equalized_odds:
        enabled: true
        max_tpr_disparity: 5%
        max_fpr_disparity: 5%

      disparate_impact:
        enabled: true
        min_ratio: 0.80  # Legal 80% rule

    monitoring:
      frequency: quarterly
      alert_on_drift: true

  # Security ethics
  security:
    password_hashing:
      algorithm: bcrypt
      min_cost_factor: 12

    secrets_management:
      allow_hardcoded: false
      require_env_vars: true
      scan_repository: true

    logging:
      allow_pii: false
      allow_passwords: false
      allow_api_keys: false

  # Reporting
  reporting:
    generate_on_phase_4: true
    formats:
      - html
      - pdf

    include_sections:
      - executive_summary
      - detailed_findings
      - recommendations
      - compliance_status
```

---

## Examples

### Example 1: GDPR Compliance Scan

```bash
/ethics privacy --regulation gdpr --detailed

Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GDPR Compliance Detailed Analysis

✅ Article 6: Lawful Basis - COMPLIANT
   - Consent mechanisms implemented
   - Contract basis documented for core features
   - Legitimate interest documented for analytics

✅ Article 13: Transparency - COMPLIANT
   - Privacy policy comprehensive and accessible
   - Data controller contact information provided
   - Purpose of data processing explained

✅ Article 15: Right of Access - COMPLIANT
   - API endpoint: GET /api/user/data-export
   - Returns all personal data in JSON format
   - Available to users via account settings

✅ Article 17: Right to Erasure - COMPLIANT
   - Account deletion API implemented
   - Soft delete with 30-day retention (documented)
   - Hard delete after retention period

✅ Article 25: Data Protection by Design - COMPLIANT
   - PII encrypted at rest (AES-256)
   - Privacy by default settings
   - Minimal data collection principle applied

✅ Article 32: Security of Processing - COMPLIANT
   - TLS 1.3 encryption in transit
   - Strong password hashing (bcrypt, cost 12)
   - Access logging enabled
   - Regular security audits planned

Overall: ✅ GDPR COMPLIANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Example 2: ML Bias Detection and Mitigation

```bash
/ethics fairness --model ml/models/hiring_model.pkl

Output (Before Mitigation):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Algorithmic Fairness Analysis: Hiring Model

🚫 CRITICAL BIAS DETECTED

Demographic Parity:
  Hiring Rate (Male): 45%
  Hiring Rate (Female): 28%
  Disparity: 17% 🚫 (threshold: 5%)

Equalized Odds:
  TPR (Male): 82%
  TPR (Female): 65%
  Disparity: 17% 🚫

Recommended Action: Apply bias mitigation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Developer applies Fairlearn mitigation
# Using threshold optimization post-processing

/ethics fairness --model ml/models/hiring_model_mitigated.pkl

Output (After Mitigation):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Algorithmic Fairness Analysis: Hiring Model (Mitigated)

✅ BIAS MITIGATED

Demographic Parity:
  Hiring Rate (Male): 42%
  Hiring Rate (Female): 39%
  Disparity: 3% ✅ (within 5% threshold)

Equalized Odds:
  TPR (Male): 78%
  TPR (Female): 75%
  Disparity: 3% ✅

Mitigation Method: Threshold Optimization (Fairlearn)
Trade-off: Accuracy decreased by 2% (acceptable)

Overall: ✅ FAIR (compliant with fairness thresholds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Example 3: Accessibility Audit

```bash
/ethics accessibility --level AA --format html

Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generating WCAG 2.1 Level AA Accessibility Report...

✅ Automated scan complete (axe-core)
✅ Contrast analysis complete
✅ Keyboard navigation test complete
✅ ARIA validation complete

Report generated: docs/verification/accessibility-report-v1.0.html

Summary:
  ✅ 45 Passed Checks
  ⚠️  3 Warnings (non-blocking)
  🚫 0 Critical Issues

Overall: ✅ WCAG 2.1 Level AA COMPLIANT

Open report: open docs/verification/accessibility-report-v1.0.html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Benefits

### For Product Managers (Phase 1)

- **Early Ethics Planning:** Consider ethical implications from requirements stage
- **Regulatory Compliance:** Avoid costly redesigns due to compliance issues
- **User Trust:** Privacy-first approach builds customer confidence

### For Software Architects (Phase 2)

- **Ethics by Design:** Build compliance into architecture from the start
- **Risk Mitigation:** Identify ethical risks before implementation
- **Regulatory Guidance:** Clear requirements for privacy, accessibility, fairness

### For Senior Developers (Phase 3)

- **Automated Validation:** Catch ethical issues during development
- **Clear Standards:** Know exactly what constitutes compliant code
- **Bias Awareness:** Understand fairness requirements for ML features

### For QA Leads (Phase 4)

- **Automated Compliance:** No manual ethics checklist required
- **Comprehensive Coverage:** All categories validated automatically
- **Documentation:** Generate compliance reports for audits

### For Release Managers (Phase 5)

- **Regulatory Confidence:** Data-driven compliance certification
- **Stakeholder Communication:** Professional compliance reports
- **Audit Readiness:** Documented ethics validation for regulators

---

## Limitations and Considerations

### Current Limitations

1. **Automated Scan Limitations:** Cannot detect all ethical issues
2. **Cultural Context:** Ethics vary across cultures and regions
3. **Edge Cases:** Novel ethical scenarios may not be detected
4. **Legal Interpretation:** Tool provides guidance, not legal advice
5. **Manual Validation Still Required:** Especially for accessibility

### Mitigation Strategies

1. **Combine Automated + Manual:** Use scans as first pass, manual review for edge cases
2. **Legal Review:** Always have legal team review compliance before release
3. **User Testing:** Test with diverse users, including people with disabilities
4. **Regular Updates:** Keep ethics rules updated with changing regulations
5. **Ethics Committee:** Establish internal ethics review board for complex cases

### When to Seek Expert Advice

- **High-Risk Applications:** Healthcare, finance, criminal justice
- **Novel ML Applications:** First-time ML deployment
- **Multi-Jurisdiction:** Operating in multiple countries with different laws
- **Sensitive Data:** Processing children's data, health data, financial data

**Recommended:** Consult privacy lawyers, accessibility experts, ML ethicists for high-risk scenarios

---

## Future Enhancements

### Planned Features (v2.0)

1. **Real-Time Monitoring:** Continuous ethics monitoring in production
2. **Global Compliance:** Support for more regulations (PIPL, LGPD, etc.)
3. **Advanced ML Fairness:** Support for complex fairness notions
4. **User Consent Management:** Integrated consent management platform
5. **Ethics Dashboard:** Real-time ethics metrics visualization

### Research Opportunities

- **Automated Bias Mitigation:** AI-powered bias removal
- **Explainable Ethics:** Explain why certain patterns are flagged
- **Predictive Compliance:** Predict compliance risks before implementation
- **Cross-Cultural Ethics:** Adapt ethical standards to local norms

---

## Conclusion

Ethics & Bias Validation Automation transforms ethical compliance from a manual checklist into an automated, continuous validation process. By catching privacy violations, accessibility barriers, and algorithmic bias early, teams build trustworthy systems that respect user rights.

**Risk:** ✅ ZERO - Advisory tool, complements manual review
**Impact:** CRITICAL - Prevents legal violations, builds user trust
**Adoption:** Immediate - Run scans in Phase 4 before every release

---

**Next Steps:**
1. Run `/ethics scan` in Phase 4 (every release)
2. Fix critical issues before Phase 5 (blocking)
3. Document warnings for future improvements (non-blocking)
4. Generate `/ethics report` for legal/compliance team
5. Archive reports for regulatory audits

**Related Documentation:**
- [.CodeMaestro/config/roles/ethics-security-engineer.md](../config/roles/ethics-security-engineer.md) - Role definition
- [.CodeMaestro/config/constraints-reference.md](../config/constraints-reference.md) - Related constraints
- [docs/verification/ethics-reports/](../verification/ethics-reports/) - Report storage
- [COMMANDS.md](../../COMMANDS.md) - Full command reference

---

**Legal Disclaimer:**
This tool provides automated guidance based on common regulatory requirements. It does not constitute legal advice. Always consult qualified legal counsel for compliance questions, especially for high-risk applications or multi-jurisdiction deployments.
