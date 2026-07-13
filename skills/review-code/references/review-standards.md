# Review Standards

<!-- MIRROR of skills/start-coding/references/code-standards.md — any rule added here must be added there too. -->

The criteria behind each category in `review-process.md`. Same order.

If the existing codebase consistently uses a pattern that conflicts with these standards, note
it but don't push hard. Consistency in an existing project can matter more.

## Architecture & Structure

- Controller/service separation. Controllers handle HTTP and payload parsing; services hold business logic.
- Correct abstraction level. No logic leaking across domain boundaries.
- Separation of concerns. Every module has one job.
- KISS. Least complexity that still solves the problem.

## Typing & Validation

- Strict typing. Types defined explicitly. Never `any`.
- Zod parsing at the boundary.
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

<!-- TODO: expand — severity thresholds, what blocks vs what's a nit -->
