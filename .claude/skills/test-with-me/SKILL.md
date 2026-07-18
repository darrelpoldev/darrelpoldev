---
name: test-with-me
description: Test a reviewed code change against the ticket's intent — prove it works, prove nothing else broke, and report what was tested. Use whenever the user says "test with me", "let's test this", or after a code review completes.
---

# Test With Me

- Purpose: prove the change achieves the ticket's intent, and that nothing outside it changed
- Unit tests are not this skill's job — they land with the code in /start-coding and /review-code checks them
- Follow `references/test-process.md` — it owns the three questions, the requirements source, scenario derivation, execution rules, and the report format
- Output is a bullet-pointed test report in the conversation: scenarios tested with pass/fail, regression results, and what wasn't covered. No document is written.
