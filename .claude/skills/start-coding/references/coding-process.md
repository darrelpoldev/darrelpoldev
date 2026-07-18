# Coding Process

- This file owns the process around writing code: before, during, after. `code-standards.md` owns what good code looks like.
- Do these in order. Skipping straight to code is the most common failure.

## Before Writing

1. Read the target file end to end, plus at least one sibling file in the same directory.
2. Copy the conventions you find there — naming, structure, error handling shape, file layout. Local patterns beat the standards; note the conflict in the summary, don't argue it.
3. Check for existing helpers before writing a new one. Search for the function name you were about to invent.
4. Restate the scope in one sentence: files you will touch, files you will not. If that sentence is hard to write, the task is underspecified — stop and ask.

### Copy Conventions, Not Defects

"Copy what you find" never means propagating rot. The ladder — top rule wins:

1. A local pattern that violates Never Do is not a convention. It's an existing defect: write your code clean, flag the instance in the summary, don't fix it unbidden.
2. A local pattern that's objectively defective — swallowed errors, race-prone shape, copy-pasted bug — same: don't copy, write clean, flag it.
3. A local pattern that's merely different from the standards — style, shape, structure — copy it. One consistent style beats two styles, even when the second is better.
4. A new file starts from the standards. Model it on the best sibling in the repo, not the nearest one.

Repeated summary flags on the same rot are the signal to ticket a refactor. The codebase improves through tickets, not drive-bys.

## While Writing

- Unit tests are part of the implementation, not a follow-up phase. Behavior change and test change land in the same diff — `code-standards.md` Tests owns the criteria.
- Write the test alongside the behavior it covers: happy path, failure paths, and the edge cases that can occur — empty, null/undefined, zero, negative, single item, max size.
- Run the new tests as you write them, not in one batch at the end. A test you haven't seen fail proves nothing.
- /test-with-me still runs after review — it proves the ticket's intent end to end and checks for regressions. It does not replace the unit tests written here.

## Scope Discipline

Scope errors destroy trust and make diffs unreviewable. These outrank every style rule.

- Change only what the task asked for. No drive-by renames, reformatting, import reordering, or "while I was in here" fixes.
- Don't reformat untouched lines. If the formatter wants to rewrite the whole file, format only your lines, or stop and ask.
- Don't add, upgrade, or remove dependencies unless explicitly asked. If the task seems to need one, stop and ask.
- Don't delete code you don't understand, even code that looks dead. It may be entry-pointed elsewhere.
- Don't fix bugs you noticed but weren't asked about. Note them in the summary. Silent fixes ship unreviewed.
- If the task is a symptom of a deeper problem, say so — don't unilaterally fix the deeper problem.
- If the task itself is a refactor, the refactor is the scope. State its boundaries in the scope sentence and hold them. "Refactor the auth module" doesn't license touching the billing module it calls.
- Touching a file you didn't name in the scope sentence is the drift tell. Stop.

## Stop and Ask

Without an explicit escape hatch, you'll invent one — and that looks exactly like hallucinating an API, guessing at intent, or silently picking one interpretation and building on it for 200 lines.

Stop and ask when:

- The task conflicts with a standard. Don't resolve it silently in either direction.
- The ambiguity changes the shape of the solution, not just naming.
- The change needs a new dependency, a schema change, or a file outside the scope sentence.
- A test that should pass doesn't, and the fix isn't obvious.
- You need an API you can't verify exists.
- The user would be surprised by what you're about to do.

How to stop: state what you were doing, the decision you hit, the options you see, and your recommendation. Then wait. Never a vague "how should I proceed?". Asking costs one message; guessing wrong costs a review cycle.

## Finishing

1. Re-read the full diff, top to bottom, as a reviewer would.
2. Check it against the scope sentence. Anything outside it comes out.
3. Confirm Never Do: no secrets, no comments explaining code, no debug output, no invented APIs.
4. Run the full test suite — not just the new tests. A test that should pass and doesn't is a Stop and Ask, not something to patch around.
5. Write the summary: what changed, why, what you deliberately didn't do, the test suite result, any threshold exceeded and the reason, any escape hatch and its reason, any bug spotted but left alone.
6. Append the summary as a dated entry to the decisions log next to the plan being implemented: `<plan folder>/<slug>.decisions.md`. This is the write-time record /review-code reads so it doesn't re-flag disclosed decisions. It lives with the plan, outside the repo — the team never sees it, and it is never committed.

The summary is where the things you decided *not* to do become reviewable — which is the only reason anyone can trust the things you did.
