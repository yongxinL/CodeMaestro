# Algorithmic Fairness & ML Bias Detection Guide

**CodeMaestro v1.0.0**
**Purpose:** Detailed ML fairness metrics, bias detection, and mitigation strategies
**Load When:** Project includes ML/AI models with potential discriminatory outcomes
**Status:** Placeholder - To be populated from original ethics-validation.md

---

## Overview

This guide provides comprehensive algorithmic fairness validation, including fairness metrics, bias detection in datasets and models, and mitigation strategies.

**Note:** This is a placeholder file. Full content (~400-500 lines) includes:
- Fairness metrics (demographic parity, equalized odds, equal opportunity)
- Protected attribute analysis (race, gender, age, religion, etc.)
- Dataset bias detection techniques
- Model explainability (SHAP, LIME)
- Bias mitigation strategies (pre-processing, in-processing, post-processing)
- Fairness-aware training
- Testing and validation frameworks
- Case studies and examples

**Parent Guide:** [../ethics-validation.md](../ethics-validation.md)

---

## Placeholder Content Structure

### Section 1: Fairness Metrics
**Demographic Parity (Statistical Parity)**
- Definition: P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
- Use case: Equal representation in outcomes

**Equalized Odds**
- Definition: Equal TPR and FPR across groups
- Use case: Predictive parity for both positive and negative classes

**Equal Opportunity**
- Definition: Equal TPR across groups
- Use case: Fairness for positive class predictions

**Calibration**
- Definition: P(Y=1 | Ŷ=p, A=a) independent of A
- Use case: Predicted probabilities are equally accurate

**Impossibility Theorems**
- Why you can't satisfy all fairness metrics simultaneously
- Trade-offs and context-dependent choices

### Section 2: Protected Attributes
- Race/ethnicity
- Gender/sex
- Age
- Religion
- Disability status
- Sexual orientation
- Socioeconomic status

**Handling Sensitive Attributes:**
- Direct removal (naive, often insufficient)
- Proxy detection (correlated features)
- Fairness-aware feature engineering

### Section 3: Bias Detection
**Dataset Bias:**
- Representation bias (underrepresented groups)
- Historical bias (biased training data)
- Measurement bias (biased labels)

**Model Bias:**
- Disparate impact analysis
- Confusion matrix stratification by protected attribute
- Feature importance disparity

**Tools:**
- Fairlearn (Python)
- AI Fairness 360 (IBM, Python)
- What-If Tool (TensorFlow)
- Aequitas (bias audit toolkit)

### Section 4: Bias Mitigation
**Pre-processing (Dataset):**
- Reweighting samples
- Resampling (oversampling minorities, undersampling majority)
- Data augmentation for underrepresented groups

**In-processing (Training):**
- Fairness-aware loss functions
- Adversarial debiasing
- Regularization constraints

**Post-processing (Predictions):**
- Threshold optimization per group
- Reject option classification
- Calibration adjustment

### Section 5: Explainability
**Model-Agnostic Methods:**
- SHAP (Shapley Additive Explanations)
- LIME (Local Interpretable Model-Agnostic Explanations)
- Permutation importance

**Model-Specific Methods:**
- Feature importance (tree-based models)
- Attention weights (neural networks)

---

## Quick Reference

**Command:** `/ethics fairness`

**Critical Fairness Requirements:**
1. Identify protected attributes in dataset
2. Measure fairness metrics across groups
3. Detect disparate impact (80% rule: min_group/max_group ≥ 0.8)
4. Provide model explainability
5. Document fairness trade-offs and decisions

**Common Violations:**
- Disparate impact >20% between groups
- No fairness testing across protected attributes
- Proxy discrimination (using correlated features)
- Lack of model explainability
- No documentation of fairness considerations

---

## Related Documentation

- **Core System:** [../ethics-validation.md](../ethics-validation.md)
- **GDPR:** [gdpr-privacy.md](gdpr-privacy.md)
- **Accessibility:** [accessibility-wcag.md](accessibility-wcag.md)

---

## Version

**ML Fairness Guide Version:** 1.0.0 (Placeholder)
**Last Updated:** 2026-01-19
**Status:** Placeholder structure - Full content to be populated
