# Review Standards

- What "good" means, per category. This file owns the criteria and nothing else.
- `review-process.md` owns the process: diff scoping, requirements source, severity buckets, output format. It routes these categories to severity; it doesn't redefine them. Keep routing and output rules out of this file.
- Category names and numbers here are the source of truth.
- Each section maps wholly to one severity bucket in `review-process.md`. A criterion that doesn't match its section's bucket belongs in a different section. Move it; don't split the bucket row.
- Where the codebase consistently uses a pattern that conflicts with these standards, consistency can outweigh the standard. Note the conflict; don't argue it.
- These stay generic. Stack and tool specifics — language, frameworks, logger and message format, data layer — live in the repo's CLAUDE.md. Read it, then apply these criteria through it.

## 1. Correctness & Bugs

- Logic does what the requirements source says it does. Trace the happy path end to end before anything else.
- Edge cases: empty, null/undefined, zero, negative, single item, max size.
- Off-by-one in loops, slices, ranges, pagination.
- Async: every promise awaited, none floating, no race between a read and a later write.
- Errors caught at a level that can actually act on them. No swallowed catch.
- Resources cleaned up on the failure path, not just on success.
- Nothing depends on undefined ordering: object keys, unsorted query results, parallel results.
- New branches reachable. Flag dead ones.
- Tests cover changed behavior, including the failure case, not just the happy path.

## 2. Design & Complexity

- A simpler approach that meets the same requirement beats a clever one. If one exists, name it and describe its shape in a sentence or two. Don't write out the full alternative implementation.
- Abstraction earns its keep. One caller means inline it.
- A function does one thing. If the summary needs "and", split it.
- No speculative generality. Built for the current requirement, not an imagined future one.
- Responsibility sits in the right layer. No business logic in controllers, handlers, or components.
- Data access goes through the repo's established pattern, not around it.
- Dependencies point one direction. Flag new cycles.
- Flag new coupling: does this force unrelated code to change later?
- State has one owner. Flag duplicated or derived-and-stored state.
- Public surface (exports, endpoints, types) is the smallest that works.
- Typing: no escape hatches (`any`, casts, non-null assertions, ignore comments) without a stated reason — in a legal one-line comment or the decisions log.
- Scrutinize hardest what's hardest to reverse: public API and endpoint shapes, database schema and migrations, data formats written to storage, anything already shipped to a consumer. Internal details are cheaper to fix later — still flag them, but spend the argument here.

## 3. Readability & Maintainability

- Names say what the thing is or does. No abbreviations that need a lookup.
- Prefer early return over an else pyramid.
- Flag every comment, no exceptions, phrased as a question — keep or remove is the author's call. A comment is legal only as a one-line claim that the cause is outside our control: vendor quirk, imposed constraint, a bug we don't own. Verify the claim. A comment whose reason lives in the code means rewrite the code; a multi-line comment means simplify the code.
- No commented-out code, no leftover debug output.
- Magic numbers and strings are named.
- Same shape as sibling code, matching the repo's established patterns for structure, naming, and style. Someone who knows one file should be able to predict the next.

## 4. Standards & Consistency

- File and folder placement follows convention.
- Import and export style follows convention.
- Error handling shape matches the rest of the codebase.

## 5. Security

- Input from outside the system is validated at the boundary, before any logic runs. Client-supplied values are never trusted.
- Injection: parameterized queries only. No string-built SQL, shell, or HTML.
- Every new entry point has authn and authz. Check the caller may act on *this resource*, not just that they're logged in.
- IDOR: object IDs from the request are checked against caller ownership.
- Public endpoints are rate limited. Flag a new one that isn't, and flag any operation whose cost a caller can drive without bound.
- Secrets never in code, committed config, logs, or error messages.
- PII, tokens, and passwords aren't logged, and aren't returned in responses that don't need them.
- Errors returned to the client don't leak internals: stack traces, SQL, file paths.
- New dependency: flag it unless all of these hold — it does work no stdlib or existing dependency already does, it shipped a release in the last 12 months, it carries no known unpatched advisory, and its transitive tree is small relative to the work it does. If the repo has audit tooling wired, its output settles the advisory question.
- Default to closed. Fail secure.

## 6. Observability

- Flag new code paths that can fail without emitting anything. If this breaks at 3am, what does the on-call see?
- Log levels match severity: `info` for state changes you'd want in a post-incident timeline, `warn` for degraded but recovered, `error` for a human must act.
- Flag miscalibration: catch blocks logging at `info`, `error` used for what nobody will page on.
- Logs carry enough context to identify the request, user, and resource. A message with no identifiers is unactionable.
- Flag a missing counter or timer on: new failure modes, new external calls or boundaries, retry and fallback paths.
- Metrics and tracing only where the repo already has them wired. Don't ask for a counter in a codebase with no metrics system, or for spans in one with no tracer.

## 7. Scope Creep

- Needs a requirements source. `review-process.md` defines what counts as one. With none, skip this category.
- Every changed file traces back to a stated requirement. If one doesn't, ask why it's here.
- Flag unrelated refactors bundled into the diff. Correct or not, they belong in their own PR.
- Flag drive-by renames and reformatting that inflate the diff and bury the real change.
- Flag dependencies, config, or feature flags the requirement didn't ask for.
- Flag the inverse too: requirements with no corresponding change.
- Raise scope creep as a question, not an accusation. The author may know something the requirements don't say.
