# Code Standards

<!-- MIRROR of .claude/skills/review-code/references/review-standards.md — any rule added here must be added there too. -->

## Architecture & Structure

- Controller/service separation. Controllers handle HTTP and payload parsing; services hold business logic.
- Keep the abstraction level correct. No logic leaking across domain boundaries.
- Separation of concerns. Every module has one job.
- KISS. Least complexity that still solves the problem.

## Typing & Validation

- Strict typing always. Define types explicitly. Never `any`.
- Parse with Zod at the boundary.
- Validate inputs first, before any logic runs.
- Code defensively where failure is expected.

## Data Patterns

- Timestamps over booleans and status columns: `activatedAt`, `deletedAt`, `completedAt`. Not `isActive`.
- Follow the existing schema conventions.

## Style

- Long, descriptive names. Clarity over brevity.
- DRY. Never duplicate logic.
- Readable. If it needs heavy explanation, refactor it.
- Never create comments to explain code.
- Avoid nested loops at all cost.

<!-- TODO: expand — folder structure, layer conventions, error handling -->
