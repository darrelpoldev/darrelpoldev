# Code Standards

<!-- COUNTERPART of .claude/skills/review-code/references/review-standards.md — shared criteria stay in sync; write-time thresholds and process live here only. One writes, one reviews: they must not contradict, they need not match. -->

- What "good" means when writing code. This file owns the criteria; `coding-process.md` owns the process around it — scope, stop-and-ask, finishing.
- These stay generic. Stack and tool specifics — language, frameworks, logger and message format, data layer — live in the repo's CLAUDE.md. Read it, then apply these standards through it.
- Local patterns beat these standards. If the file uses `Result` returns and this file says throw, use `Result`. Consistency within a file outranks every rule here except Never Do. Note the conflict in the summary; don't argue it. Patterns means conventions, not defects — see coding-process.md.
- Numbers are arbitrary on purpose: a checkable threshold beats a wise adjective. Going over is allowed; going over silently is not — say why in the summary.

## Architecture & Structure

- Controller/service separation. Controllers handle HTTP and payload parsing; services hold business logic.
- Correct abstraction level. No logic leaking across domain boundaries.
- Separation of concerns. Every module has one job.
- KISS. Least complexity that still solves the problem.

## Decidable Rules

| Trigger | Action |
|---|---|
| Function exceeds ~40 lines | Extract a named sub-function — only if Abstraction allows |
| Nesting exceeds 2 levels | Invert the condition and return early, or extract the inner block |
| More than 3 positional params | Take a single named object instead |
| A boolean param controls which of two things a function does | Split into two functions |
| Reaching through more than one dot on a value you didn't create (`a.b.c()`) | Ask the owner for what you need; don't traverse its internals |
| The same `switch`/if-chain on a type field appears a third time | Move the behavior onto the type |
| A magic number or string appears in a condition | Name it as a constant at module scope |
| An error is caught | Handle it meaningfully, or rethrow with added context. Log only at the layer that finally handles it. Never swallow silently. Never `catch {}` |
| A value could be absent | Make it explicit in the type. Don't rely on `undefined` propagating |
| You feel the need to write a comment | If the reason is in the code, rewrite — extract, rename, simplify — until it explains itself. If the cause is outside our control, one line, never more (Never Do) |

Stop conditions — the most-skipped part of every rule above:

- Extract only when the block has a name you would actually use. If the best name is `handleStuff` or `processData`, it isn't a unit — leave it inline. A 60-line function with a clear linear flow beats three functions named after nothing.
- Early-return only when it reduces total branches. Adding a return to satisfy a nesting count optimizes the metric, not the code.

## Abstraction — Rule of Three

- Abstract at the third occurrence, not the second. Two similar blocks are a coincidence. Three are a pattern.
- Duplication is cheaper than the wrong abstraction. Leaving duplication costs a copy-paste. Undoing a bad abstraction costs a refactor.
- Never abstract for a single call site. No wrapper, helper, interface, or config option for one caller.
- Exception: a named sub-function extracted because a Decidable Rule fired — length, nesting, inner loop — is not abstraction. One caller is fine there; the stop conditions still apply.
- No design pattern unless a Decidable Rule fired. Name the trigger in the summary; if you can't, delete the pattern.
- Don't build for hypothetical requirements. No extension points, no "we might need" params, no generic layer over one implementation.
- When a Decidable Rule says extract and this section says don't — this section wins. Under-abstracting is recoverable; over-abstracting entangles.

## Typing & Validation

- Strict typing. Types defined explicitly. No escape hatches from the type system without a stated reason — a legal one-line comment or the decisions log.
- Parse at the boundary with the project's schema validator.
- Inputs validated first, before any logic runs.
- Defensive coding where failure is expected.

## Data Patterns

- Timestamps over booleans and status columns: `activatedAt`, `deletedAt`, `completedAt`. Not `isActive`.
- Schema conventions followed consistently.

## Style

- Long, descriptive names. Clarity over brevity.
- DRY — at the third occurrence, per Abstraction above.
- Readable. If it needs heavy explanation, it should be refactored.
- Comments: one line, outside-our-control causes only. See Never Do.
- No nested loops — stricter than the nesting threshold: loops max out at one level; extract the inner loop.

## Tests

- Behavior change and test change land in the same diff. Not after, not "as a follow-up".
- Cover the happy path, every failure path, and the edge cases that can occur: empty, null/undefined, zero, negative, single item, max size.
- Every test must be able to fail. No assertion-free tests, no tests that restate the implementation.
- Test names describe the case, not the function: `returns null when user is deactivated`, not `test getUser 2`.
- Never weaken or delete a test to make it pass. A failing test is information. If the test looks wrong, stop and ask.
- No tests for code you didn't touch — that's scope drift wearing a helpful hat.
- Don't mock what you own. Mock the boundary (network, clock, filesystem), not your own modules.

## Never Do

No thresholds, no judgment calls, no exceptions.

- Never commit secrets, keys, tokens, or credentials — including in tests, fixtures, or comments.
- Never log secrets, tokens, passwords, or full PII.
- Never build SQL, shell commands, or HTML by string concatenation with untrusted input. Parameterize.
- Never disable, weaken, or bypass an auth, validation, or permission check to make something work.
- Never write a comment that explains the code. Code that can't explain itself is one of two cases: it's too complex — simplify it; or the cause is outside our control — a vendor quirk, an imposed constraint, a workaround for a bug we don't own — and that gets one line, never more. A comment is a claim: this exists for a reason we can't fix here. /review-code flags every comment and the user decides keep or remove. A bug another team owns also goes in the decisions log so it becomes a ticket.
- Never leave `console.log`, debugger statements, or commented-out code in a diff.
- Never invent an API, function, flag, or config key you haven't verified exists. Unsure means check the source or docs — not guess a plausible name.
