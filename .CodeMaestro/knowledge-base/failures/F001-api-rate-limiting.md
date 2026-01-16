# F001: API Rate Limiting Not Considered

**Project:** Example E-commerce Platform
**Phase:** 3 (Implementation)
**Date:** 2026-01-15
**Severity:** High

## Symptoms
- 429 errors during load testing
- Third-party API calls failing intermittently
- Customer checkout failures at peak times

## Root Cause
External payment API has 100 requests/minute limit.
No rate limiting or queuing implemented.

## Solution Applied
1. Implemented token bucket rate limiter
2. Added retry with exponential backoff
3. Created request queue for peak times

## Prevention
- Always check API rate limits during Phase 2
- Add rate limit to technical requirements
- Include load testing in Phase 4

## Related Constraints
- A7: Confirmed APIs Only (should include rate limits)
- E32: Performance regression check

## Tags
api, rate-limiting, third-party, performance
