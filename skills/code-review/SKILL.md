---
name: code-review
description: >
  Structured code review workflow with prioritized feedback.
  Use this skill whenever the user asks to review code, audit a file, check a PR,
  look over changes, critique implementation, or give feedback on code quality —
  even if phrased casually like "what do you think of this code" or "anything wrong here".
  Also trigger when the user pastes code and asks for opinions, improvements, or a sanity check.
---

# Code Review

Review workflow and output format. Engineering principles live in CLAUDE.md — apply them, don't duplicate.

Be extremely concise. Sacrifice grammar for brevity.

## Default Behavior

Unless the user specifies files or code, review the full branch diff against `main`:

```bash
git diff main...HEAD --name-only
```

Use that file list to scope the review. Read each changed file's diff via `git diff main...HEAD -- <file>`. Only review what changed — don't audit untouched code.

## Process

1. Get the diff (branch vs main, or whatever the user specifies).
2. Evaluate in this priority order:
   - **Security** — always first. If you find something, lead with it.
   - **Architecture & structure** — controller/service separation, abstraction level, domain boundaries.
   - **Typing & validation** — type strictness, Zod usage, defensive coding.
   - **Data patterns** — schema conventions, timestamp vs boolean patterns.
   - **Observability** — logging at decision points, no sensitive data in logs.
   - **Style** — naming, DRY, readability, unnecessary comments.
3. If the existing codebase consistently uses a pattern that conflicts with your standards, note it but don't push hard — consistency in an existing project can matter more.
4. If something is ambiguous or you'd need more context, say so instead of guessing.
5. Never suggest refactors beyond the scope of what's being reviewed.

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

- Keep diffs minimal — only the affected line(s), not surrounding context.
- If the issue is structural/architectural (no single line fix), skip the diff and describe it in one line.

## Output Format

```
## Code Review

**Summary**
Brief overview of what this branch does — the intent, the flow, and what problem it solves.

**Critical** (security/bugs)
- [file:line] What's wrong

**Should Fix** (architecture, typing, logic)
- [file:line] What's wrong

**Nits** (style, naming, minor)
- [file:line] What's wrong

**What's Good**
- Brief callout of things done well
```

Skip any section with no items. Don't pad with filler.

If the code is solid, say so. "Looks good, no major issues" is a valid review.

## Apply Prompts

After the review, generate a separate fenced `Apply Prompt` block for each section (Critical, Should Fix, Nits). Skip empty sections. Each prompt should:

- List every file and the specific changes to make, referencing line numbers.
- Be imperative ("In file X at line Y, replace A with B").
- Be copy-pasteable with zero edits needed.
- Be self-contained — don't reference the review output, include all context needed.

No apply prompt for What's Good — nothing to change there.