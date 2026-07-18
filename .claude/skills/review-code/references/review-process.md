# Review Process

Two modes: reviewing my own branch from /start-coding, or reviewing someone else's branch/PR I
checked out. Same categories, same buckets, same output. They differ in two places, both handled
below: where the code lives (mine is often still uncommitted) and where the requirements come from.

## Diff Scope

- Default target: everything this branch changed that isn't on the base — committed *and* uncommitted.

```
base=$(git symbolic-ref -q --short refs/remotes/origin/HEAD)
base=${base:-origin/main}
git rev-parse -q --verify "$base" >/dev/null || echo "BASE $base DOES NOT RESOLVE"
fork=$(git merge-base "$base" HEAD)
git diff "$fork" --name-only            # changed files, working tree included
git ls-files --others --exclude-standard # new files not yet added
```

- Diff from the merge base against the working tree, not `"$base"...HEAD`. The three-dot form stops at the last commit and silently returns nothing when /start-coding left the work uncommitted.
- Add the untracked list. A brand-new file is invisible to `git diff` until it's staged, and new files are usually the ones most worth reviewing.
- Diff against the remote ref. A local `main` can be stale or missing entirely.
- If the base doesn't resolve, stop and ask the user for the base ref. Don't guess and don't review against nothing.
- Read each file's diff via `git diff "$fork" -- <file>`. Read untracked files in full.
- Override the default only when the user names specific files, directories, or a commit range. Their list replaces the default; don't widen it back.
- Only review what changed. Never audit untouched code.
- When reviewing someone else's PR, the diff is the whole story. Don't assume intent that isn't in it.

## Requirements Source

Establish what the change was supposed to do before judging whether it does. In order of preference:

1. A ticket or plan the user names or links — plus the `<slug>.decisions.md` log next to the plan when one exists. The log records write-time decisions: threshold overages, convention conflicts, escape-hatch reasons, known workarounds. Don't re-flag a decision it discloses; verify the disclosure matches the code, and flag only mismatches.
2. The PR or branch description (`gh pr view`), or failing that, the commit messages on the branch.
3. None available.

- With a source, use it for the correctness trace in §1 Correctness & Bugs and for all of §7 Scope Creep.
- With none: skip the `Out of Scope` bucket, don't flag missing requirements, and narrow §1's first bullet to what you can still check — that the code is internally consistent and does what its own names, types, and tests claim. Note the missing source in one line under `Summary`.
- Never infer requirements from the diff and then review the diff against them. That's circular and always passes.

## Evaluation

- Evaluate every category in `references/review-standards.md`, in the order listed there. Read that file before reviewing.
- Before flagging a convention or a typing issue, read the repo's lint, format, and compiler configs and the CI step that runs them. What a configured rule already catches is not a review finding. Flag only the gaps.
- Suggest a refactor only where it fixes a finding in those categories. Never for taste, and never outside the diff.
- If a call needs context you don't have, don't guess. File it in the bucket it would land in, phrase it as a question, and prefix it `Needs context:`.

## Severity Buckets

Every finding goes in exactly one bucket. Section numbers refer to `references/review-standards.md`. When a finding fits two, take the more severe.

| Bucket | Contents |
|---|---|
| **Critical** | All of §1 Correctness & Bugs. All of §5 Security. |
| **Should Fix** | All of §2 Design & Complexity. All of §6 Observability. |
| **Nits** | All of §3 Readability & Maintainability. All of §4 Standards & Consistency. |
| **Out of Scope** | All of §7 Scope Creep. Omitted entirely when no requirements source exists. |

- Every section routes wholly. If a criterion doesn't fit its section's bucket, it's in the wrong section: fix `review-standards.md`. Don't split a row here.

## Output Format

Every finding in every bucket uses the same item format:

````
- [file:line] What's wrong
  Why: <why the current code is a problem and why the change fixes it>
  ```diff
  - <current code>
  + <suggested code>
  ```
````

- Keep diffs minimal. Only the affected line(s), not surrounding context.
- If the issue is structural and has no single-line fix, drop the diff block. The `What's wrong` and `Why:` lines are never optional.
- `Out of Scope` items drop the diff too, and phrase `What's wrong` as a question. Scope is the author's call.

Assemble the review as:

```
# Code Review

## Summary
Brief overview of what this branch does — the intent, the flow, and what problem it solves.

## Critical
<items>

## Should Fix
<items>

## Nits
<items>

## Out of Scope
<items>

## What's Good
- Brief callout of things done well
```

- Skip any section with no items. Don't pad with filler.
- If the code is solid, say so. "Looks good, no major issues" is a valid review.

## Apply Prompts

After the review, emit one fenced block per non-empty bucket, for Critical, Should Fix, and Nits only. Each block is a standalone prompt the user can paste into a fresh session:

````
```
Apply Prompt — <bucket>

In <file> at line <n>, replace:
<current code>
with:
<suggested code>
Reason: <one line>

In <file> at line <n>, ...
```
````

- Cover every item in that bucket. One entry each.
- Be imperative and self-contained. Don't reference the review output; the prompt is read without it.
- Copy-pasteable with zero edits needed.
- Omit anything marked `Needs context:`. An unresolved question isn't applyable.
- Omit comment findings. Keep-or-remove on a comment is the author's decision, made in response to the flag — never auto-applied.
- Structural findings with no diff still get an entry: describe the change in prose.

No apply prompt for What's Good or Out of Scope. Nothing to change there, and scope is the author's call.
