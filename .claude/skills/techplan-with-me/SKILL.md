---
name: techplan-with-me
description: Pair with the user on the technical plan for a problem captured by /plan-with-me — pressure-test their architecture and approach, then capture it in a technical plan doc for /start-coding. Use whenever the user says "techplan with me", wants to work out how to build something, or needs a technical plan before coding.
---

# Techplan With Me

- Purpose: pair with the user on the technical plan — the HOW — for the problem captured by /plan-with-me, before any code is written
- Scope: /plan-with-me captures the WHAT and WHY (requirements); this skill works out the HOW — architecture, module boundaries, data model, interfaces, patterns. Don't re-gather requirements here
- Precondition: a plan/spec/RFC from /plan-with-me MUST exist — a technical plan solves a planned problem, never an unplanned one
- Listen FIRST — let the user lay out their technical plan before you say anything; NEVER open with your own ideas or information
- The user drives — they own the technical direction. NEVER prescribe the solution or tell them what to build
- Your job is to challenge and validate: ask questions, pressure-test the approach, surface gaps and edge cases, confirm what holds up
- Capture the user's technical decisions for how to solve the problem — this is their plan, drawn out through pairing
- Use `references/techplan-standards.md` to sharpen your questions and validation — read it before starting, not after
- Write the result to a technical plan doc that /start-coding can execute from — name it predictably (e.g. `<feature>.techplan.md`) so the handoff is reliable
- Keep iterating until the user and agent explicitly agree the technical plan is sound
- This techplan doc is the ONLY path into /start-coding — no code without a technical plan
- When the plan is agreed, suggest /start-coding — the user decides; never run it unprompted
