# Test Process

This file owns the testing process end to end: what to test against, how scenarios are derived, how they run, and the report that comes out. The output is a test report in the conversation — no document is written.

## The Three Questions

Every test pass answers all three. A pass that skips one isn't done.

1. Does it work? The implemented behavior meets the ticket's acceptance criteria. "Create the login page" means the login page exists and behaves as specified — verified by using it, not by reading the code.
2. Did it break anything else? Everything that touches the changed code still behaves as before. The change stays isolated to the ticket's intent and the code it names.
3. Is the problem solved? The bug no longer reproduces, or the feature serves the intent behind the ticket — not just its letter.

## Requirements Source

- Testing needs a source of truth: the ticket or plan and its acceptance criteria.
- No source — stop and ask. Testing without one only proves the code does what the code does.

## Deriving Scenarios

- Derive scenarios from the ticket, not from the code. The code tells you what was built; the ticket tells you what should have been.
- Cover happy path, unhappy paths, and edge cases. Every scenario traces to the ticket, the feature, or the bug being fixed — no generic exploration.
- Phrase each scenario as a user-observable behavior, not an implementation detail. For a login page: invalid emails are rejected with a validation message, a successful login redirects to the dashboard, a wrong password shows the authentication error correctly — not "the validateEmail function returns false".
- Map the blast radius: find what else calls or consumes the changed code, and add a regression scenario for each affected path.

## Executing

- Pick the test surface from the ticket first: does it expect a UI change?
  - UI change — use the cmux-browser skill to load the browser and test the flows in the UI itself.
  - No UI change — call the local endpoints directly with curl.
- Authentication is the user's to provide — never bypass or weaken it to make testing possible:
  - UI: ask the user to log in manually in the browser, then continue on their word.
  - API: ask the user for a local auth token and continue with it.
- Run scenarios against the running system — real flows, not just the test suite.
- Record each result as you go, not from memory at the end.
- A failed scenario doesn't stop the pass — finish the remaining scenarios so the report shows the full damage, then hand the failures back through /start-coding and /review-code. Re-run the failed scenarios after the fix.
- Never fix a failure silently mid-test. A fix changes the code under test; the report must say so.

## Test Report

Delivered in the conversation at the end of the pass. Bullet points, one scenario per line, actual results only — never a claimed result for a scenario that didn't run.

```
# Test Report

## Summary
One or two lines: what was tested, against which ticket, overall verdict.

## Scenarios
- PASS — invalid email is rejected with a validation message
- PASS — successful login redirects to the dashboard
- FAIL — wrong password shows a raw 500 instead of the authentication error
  Expected: <what the ticket says should happen> / Actual: <what happened>

## Regression
- PASS — <existing flow that touches the changed code, still behaving as before>

## Not Covered
- <scenario that exists but wasn't tested, and why>
```

- Group regression scenarios separately so isolation of the change is visible at a glance.
- `Not Covered` is never empty by default — if truly everything was covered, say so explicitly. An honest gap list beats an inflated pass list.
- Failures lead the summary. A report that buries a FAIL under twenty PASSes is misreporting.
