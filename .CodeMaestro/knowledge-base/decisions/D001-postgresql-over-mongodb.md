# D001: Chose PostgreSQL over MongoDB

**Date:** 2026-01-10
**Phase:** 2 (Planning)
**Decision Maker:** Software Architect
**Impact:** HIGH

## Context
Need to select primary database for e-commerce platform.

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| PostgreSQL | ACID, mature, strong typing | Less flexible schema |
| MongoDB | Flexible schema, good scaling | No ACID by default |
| MySQL | Widespread, good tooling | Less features than Postgres |

## Decision
**Chose: PostgreSQL**

## Rationale
1. ACID transactions required for payment processing
2. Complex relational queries for reporting
3. Team has PostgreSQL experience
4. Strong JSON support if schema flexibility needed

## Consequences
- Need to define schema upfront
- Migrations required for schema changes
- Excellent for analytics queries

## Tags
database, architecture, decision
