# Locked Specification v{VERSION} - Web Application Edition

**Override Type:** Web Application
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
{HOW_THE_WEB_APP_SOLVES_IT}

**URL:** {DOMAIN_NAME}

---

## Browser Support

### Supported Browsers
- [ ] Chrome/Edge (Chromium): Latest 2 versions
- [ ] Firefox: Latest 2 versions
- [ ] Safari: Latest 2 versions (macOS + iOS)
- [ ] Opera: Latest version

### Minimum Browser Versions
- Chrome: {MIN_VERSION}
- Firefox: {MIN_VERSION}
- Safari: {MIN_VERSION}
- Edge: {MIN_VERSION}

### Progressive Enhancement
- [ ] Core functionality works without JavaScript
- [ ] Graceful degradation for older browsers
- [ ] Polyfills for critical features

---

## Responsive Design

### Breakpoints
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

### Layout Strategy
- [ ] Mobile-first design
- [ ] Fluid/responsive layout
- [ ] Fixed width with breakpoints
- [ ] Container queries (if supported)

---

## Performance Requirements (Web-Specific)

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Additional Metrics
- **Time to Interactive (TTI):** < 3.5s
- **Total Blocking Time (TBT):** < 300ms
- **First Contentful Paint (FCP):** < 1.8s

### Resource Budgets
- **Initial Bundle Size:** < 200KB (gzipped)
- **Total Page Weight:** < 1MB (critical path)
- **Image Optimization:** WebP/AVIF, lazy loading
- **Third-Party Scripts:** < 100KB total

---

## Functional Requirements

### Core Features (Web Context)

#### FR-1: {FEATURE_NAME}
- **Description:** {WHAT_IT_DOES}
- **Browser Compatibility:** All/Modern only
- **Offline Support:** Via Service Worker (Yes/No)
- **PWA Feature:** Yes/No

#### FR-2: Authentication
- **Methods:** Email/password, OAuth (Google, GitHub, etc.)
- **Session Management:** JWT, cookies, localStorage
- **Multi-factor:** Yes/No

#### FR-3: Data Persistence
- **Client-Side:** localStorage, IndexedDB, SessionStorage
- **Offline Sync:** Yes/No
- **Real-Time Updates:** WebSockets, SSE, Long Polling

---

## Non-Functional Requirements

### Security (Web-Specific)
- **HTTPS:** Enforced (HSTS enabled)
- **CSP (Content Security Policy):** Strict
- **CORS:** Properly configured
- **XSS Protection:** Sanitize all inputs
- **CSRF Protection:** Token-based
- **Secure Cookies:** HttpOnly, Secure, SameSite

### Accessibility (WCAG)
- **Level:** AA minimum (AAA target)
- **Screen Reader:** Full support (ARIA labels)
- **Keyboard Navigation:** All interactive elements
- **Color Contrast:** 4.5:1 minimum
- **Focus Indicators:** Visible and clear

### SEO
- **Meta Tags:** Complete (title, description, OG tags)
- **Structured Data:** Schema.org markup
- **Sitemap:** XML sitemap generated
- **Robots.txt:** Configured
- **Canonical URLs:** Implemented

---

## Progressive Web App (PWA)

### PWA Features
- [ ] Service Worker for offline support
- [ ] Web App Manifest
- [ ] Add to Home Screen
- [ ] Push Notifications
- [ ] Background Sync
- [ ] Installable

### Offline Strategy
- **Cache Strategy:** {CACHE_FIRST / NETWORK_FIRST / STALE_WHILE_REVALIDATE}
- **Offline Fallback:** Custom offline page
- **Data Sync:** Background sync when online

---

## Hosting & Deployment

### Hosting Platform
- **Provider:** {VERCEL / NETLIFY / AWS / GCP / AZURE}
- **CDN:** {CLOUDFLARE / FASTLY / CLOUDFRONT}
- **Region:** {PRIMARY_REGION}

### Deployment
- **CI/CD:** GitHub Actions, GitLab CI, CircleCI
- **Preview Environments:** Yes/No
- **Rollback Strategy:** Instant rollback to previous version

---

## Acceptance Criteria

### AC-1: Browser Compatibility
- [ ] Works in all supported browsers (latest 2 versions)
- [ ] Graceful degradation for older browsers
- [ ] No console errors in any supported browser

### AC-2: Performance (Lighthouse)
- [ ] Performance Score: ≥ 90
- [ ] Accessibility Score: ≥ 95
- [ ] Best Practices Score: ≥ 95
- [ ] SEO Score: ≥ 90

### AC-3: Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scroll on any breakpoint

---

## Success Metrics

### Engagement
- **Monthly Active Users (MAU):** {TARGET}
- **Bounce Rate:** < {TARGET}%
- **Avg Session Duration:** > {TARGET} minutes
- **Pages per Session:** > {TARGET}

### Performance
- **Page Load Time (Median):** < 2s
- **Error Rate:** < 0.1%
- **Uptime:** ≥ 99.9%

### Conversion
- **Conversion Rate:** > {TARGET}%
- **Time to First Conversion:** < {TARGET} minutes

---

## Technical Constraints

### Web-Specific Constraints
- **A1:** Production-ready web libraries only
- **A7:** Confirmed browser APIs (use MDN/caniuse.com)
- **B17:** No placeholder implementations
- **E30:** Test coverage ≥ 70% (unit + integration + e2e)
- **E31:** 0 critical security issues
- **E32:** Performance regression check (Lighthouse CI)

---

## Out of Scope

- Native mobile apps (iOS/Android)
- Desktop applications (Electron)
- Internet Explorer support
- Server-side rendering (Phase 2)

---

## Dependencies

### Frontend Stack
- **Framework:** {REACT / VUE / ANGULAR / SVELTE}
- **State Management:** {REDUX / ZUSTAND / PINIA / VUEX}
- **Styling:** {TAILWIND / STYLED-COMPONENTS / CSS MODULES}
- **Build Tool:** {VITE / WEBPACK / PARCEL}

### Backend/API
- **API Type:** REST / GraphQL
- **Authentication:** JWT / OAuth 2.0
- **Real-Time:** WebSockets / Server-Sent Events

---

**Locked By:** Product Manager
**Date:** {DATE}
**Version:** 1.0
**Status:** LOCKED ✅
