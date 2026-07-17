# Code Standards

<!-- MIRROR of .claude/skills/review-code/references/review-standards.md — any rule added here must be added there too. -->

## Architecture & Structure

- Controller/service separation. Controllers handle HTTP and payload parsing; services hold business logic.
- Correct abstraction level. No logic leaking across domain boundaries.
- Separation of concerns. Every module has one job.
- KISS. Least complexity that still solves the problem.

## Typing & Validation

- Strict typing. Types defined explicitly. No escape hatches from the type system.
- Parse at the boundary with the project's schema validator.
- Inputs validated first, before any logic runs.
- Defensive coding where failure is expected.

## Data Patterns

- Timestamps over booleans and status columns: `activatedAt`, `deletedAt`, `completedAt`. Not `isActive`.
- Schema conventions followed consistently.

## Style

- Long, descriptive names. Clarity over brevity.
- DRY. No duplicated logic.
- Readable. If it needs heavy explanation, it should be refactored.
- No comments explaining what the code does.
- No nested loops.

<!-- TODO: expand — folder structure, layer conventions, error handling -->
