---
name: start-coding
description: Implement the requirements from a plan produced by /plan-with-me. Use whenever the user says "start coding" or "let's build this" — but ONLY if a technical plan from /techplan-with-me exists.
---

# Start Coding

- Purpose: build only what the plan asked, in the codebase's own patterns, so /review-code catches bugs instead of noise
- Purpose: surface decisions instead of guessing — ambiguity stops the work, it doesn't silently shape it
- Precondition: a technical plan from /techplan-with-me MUST exist — no code without a technical plan
- If asked to code without one, stop and suggest /techplan-with-me first (or /plan-with-me if there's no plan yet)
- Confirm which plan file is being implemented before writing code
- Follow `references/coding-process.md` — it owns what happens before, during, and after writing: scope discipline, stop-and-ask, the finishing summary
- Write code to the standards in `references/code-standards.md` — read it before writing, not after
- Stay within the plan; park out-of-scope discoveries instead of chasing them
- Implement in small increments; verify as you go
- Once done coding, suggest /review-code
