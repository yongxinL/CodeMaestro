# P001: Repository Pattern for Data Access

**Confidence:** HIGH (used in 5+ projects)
**Domain:** Web, Cloud
**Phase:** 2 (Planning), 3 (Implementation)

## Context
Need to abstract database operations from business logic.

## Problem
Direct database calls scattered throughout codebase make:
- Testing difficult (mocking)
- Database migration risky
- Code coupling high

## Solution
Implement Repository pattern:
```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  // Database-specific implementation
}

class MockUserRepository implements UserRepository {
  // In-memory implementation for testing
}
```

## Benefits
- Easy to mock for unit tests
- Database can be swapped without code changes
- Clear separation of concerns

## Trade-offs
- Additional abstraction layer
- More files to maintain

## Tags
database, testing, architecture, abstraction
