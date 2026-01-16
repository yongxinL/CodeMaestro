# Locked Specification v{VERSION} - Mobile Edition

**Override Type:** Mobile Application
**Last Updated:** 2026-01-13
**Compatible With:** CodeMaestro 1.0+

---

## Product Vision

**Project Name:** {PROJECT_NAME}

**Elevator Pitch:**
{ONE_SENTENCE_DESCRIPTION}

**Core User Problem:**
{PROBLEM_BEING_SOLVED}

**Solution:**
{HOW_THE_APP_SOLVES_IT}

---

## Target Platforms

### iOS
- **Minimum Version:** iOS {MIN_VERSION} (e.g., iOS 15.0)
- **Target Version:** iOS {TARGET_VERSION} (e.g., iOS 17.0)
- **Device Support:** iPhone, iPad, Apple Watch (if applicable)

### Android
- **Minimum API Level:** {MIN_API} (e.g., API 26 - Android 8.0)
- **Target API Level:** {TARGET_API} (e.g., API 34 - Android 14)
- **Device Support:** Phone, Tablet, Wear OS (if applicable)

---

## Device Compatibility

### Screen Sizes
- iPhone SE (375x667) to iPhone Pro Max (430x932)
- Android: Small (320dp) to Extra Large (960dp+)

### Orientations
- [ ] Portrait only
- [ ] Landscape only
- [ ] Both (adaptive layout)

### Platform Features
- [ ] Camera access
- [ ] Location services (GPS)
- [ ] Push notifications
- [ ] Biometric authentication (Face ID, Touch ID, Fingerprint)
- [ ] Offline mode
- [ ] Background processing
- [ ] Bluetooth
- [ ] NFC
- [ ] AR capabilities

---

## Performance Requirements (Mobile-Specific)

### Launch Performance
- **Cold Start:** < 2 seconds
- **Warm Start:** < 1 second
- **Hot Start:** < 0.5 seconds

### Runtime Performance
- **Frame Rate:** 60 FPS minimum (120 FPS for Pro devices)
- **Memory Usage:** < 150MB idle, < 300MB active
- **Battery Impact:** < 5% per hour (background), < 15% per hour (active use)
- **Network Efficiency:** Batch requests, cache aggressively

### App Size
- **iOS IPA:** < 100MB (prefer < 50MB)
- **Android APK/AAB:** < 100MB (prefer < 50MB)

---

## Functional Requirements

### Core Features (Mobile Context)

#### FR-1: {FEATURE_NAME}
- **Description:** {WHAT_IT_DOES}
- **Platform Notes:** iOS/Android differences if any
- **Offline Support:** Yes/No
- **Background Sync:** Yes/No

#### FR-2: Navigation
- **Pattern:** Tab Bar / Bottom Nav / Drawer / Stack
- **Gestures:** Swipe back, pull to refresh, etc.

#### FR-3: Notifications
- **Local Notifications:** {USE_CASES}
- **Push Notifications:** {USE_CASES}
- **Badge Management:** Yes/No

---

## Non-Functional Requirements

### Security (Mobile-Specific)
- **Data Storage:** Encrypted (Keychain/KeyStore)
- **Network:** TLS 1.3, certificate pinning
- **Authentication:** Biometric + passcode fallback
- **App Transport Security:** Enforced (iOS)

### Accessibility
- **VoiceOver/TalkBack:** Fully supported
- **Dynamic Type/Font Scaling:** Supported
- **Color Contrast:** WCAG AA minimum
- **Touch Targets:** 44x44pt (iOS), 48x48dp (Android)

---

## App Store Requirements

### iOS App Store
- **App Store Category:** {CATEGORY}
- **Age Rating:** {RATING}
- **Privacy Policy URL:** {URL}
- **Required Permissions:** {LIST}

### Google Play Store
- **Play Store Category:** {CATEGORY}
- **Content Rating:** {RATING}
- **Privacy Policy URL:** {URL}
- **Required Permissions:** {LIST}

---

## Acceptance Criteria

### AC-1: Platform Compliance
- [ ] Passes App Store Review Guidelines
- [ ] Passes Google Play Store Policies
- [ ] Required permissions documented and justified

### AC-2: Performance Thresholds
- [ ] Cold start < 2s on reference devices
- [ ] 60 FPS during normal use
- [ ] Memory usage within limits

### AC-3: Device Testing
- [ ] Tested on 3+ iOS devices (various screen sizes)
- [ ] Tested on 3+ Android devices (various OEMs)
- [ ] Works in portrait and landscape (if supported)

---

## Success Metrics

### Engagement (Mobile-Specific)
- **Daily Active Users (DAU):** {TARGET}
- **Session Length:** {TARGET}
- **Sessions per Day:** {TARGET}
- **Retention (Day 7):** {TARGET}%

### Performance
- **Crash-Free Rate:** ≥ 99.5%
- **ANR Rate:** < 0.1% (Android)
- **Avg Load Time:** < 2s

### App Store Metrics
- **Rating:** ≥ 4.5 stars
- **Review Response Time:** < 24 hours

---

## Technical Constraints

### Mobile-Specific Constraints
- **A1:** Production-ready mobile libraries only (no beta SDKs)
- **A7:** Confirmed mobile APIs (use platform docs)
- **E30:** Test coverage ≥ 70% (unit + UI tests)
- **E31:** 0 critical crashes or security issues
- **E32:** Performance regression check on each build
- **E33:** 100% acceptance criteria pass

---

## Out of Scope (Mobile Context)

- Desktop version
- Web version
- Tablet-specific optimizations (Phase 2)
- Apple Watch app (Phase 3)
- Widget support (Phase 3)

---

## Dependencies

### Third-Party SDKs
- **Analytics:** {SDK_NAME}
- **Crash Reporting:** {SDK_NAME}
- **Authentication:** {SDK_NAME}
- **Networking:** {SDK_NAME}
- **Image Loading:** {SDK_NAME}

---

**Locked By:** Product Manager
**Date:** {DATE}
**Version:** 1.0
**Status:** LOCKED ✅
