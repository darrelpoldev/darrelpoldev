# Review Process

Two modes, same process: reviewing my own branch from /start-coding, or reviewing someone
else's branch/PR I checked out. Only the origin of the code differs.

## Scope

- Unless the user specifies files or code, review the full branch diff against main:

```
git diff main...HEAD --name-only
```

- Use that file list to scope the review. Read each changed file's diff via `git diff main...HEAD -- <file>`.
- Only review what changed. Never audit untouched code.
- When reviewing someone else's PR, the diff is the whole story. Don't assume intent that isn't in it. Ask instead.
- Security and observability are out of scope here. /secure-code and /observe-code own those lanes.

## Process

- Evaluate in this priority order:
  1. **Architecture & structure**
  2. **Typing & validation**
  3. **Data patterns**
  4. **Style**
- The criteria for each category live in `references/review-standards.md`. Read it before reviewing.
- If something is ambiguous or you'd need more context, say so instead of guessing.
- Never suggest refactors beyond the scope of what's being reviewed.

## Output Rules

- For each issue, show the problematic code and the suggested replacement as a diff.
- Use this format for each item:

```
- [file:line] What's wrong
  Why: <why the current code is a problem and why the change fixes it>
  ```diff
  - <current code>
  + <suggested code>
  ```
```

- Keep diffs minimal. Only the affected line(s), not surrounding context.
- If the issue is structural/architectural (no single line fix), skip the diff and describe it in one line.

## Output Format

```
# Code Review

## Summary
Brief overview of what this branch does — the intent, the flow, and what problem it solves.

## Critical (bugs, correctness)
- [file:line] What's wrong

## Should Fix (architecture, typing, logic)
- [file:line] What's wrong

## Nits (style, naming, minor)
- [file:line] What's wrong

## What's Good
- Brief callout of things done well
```

- Skip any section with no items. Don't pad with filler.
- If the code is solid, say so. "Looks good, no major issues" is a valid review.

## Apply Prompts

After the review, generate a separate fenced `Apply Prompt` block for each section (Critical, Should Fix, Nits). Skip empty sections.

Each prompt must:

- List every file and the specific changes to make, referencing line numbers.
- Be imperative ("In file X at line Y, replace A with B").
- Be copy-pasteable with zero edits needed.
- Be self-contained. Don't reference the review output; include all context needed.

No apply prompt for What's Good. Nothing to change there.
