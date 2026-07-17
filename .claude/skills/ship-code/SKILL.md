---
name: ship-code
description: Prepare and push the change for a PR — clean commits, correct description, right branch. Use whenever the user says "ship it", "push this", or is opening a PR.
---

# Ship Code

- Purpose: get the change out correctly, following the PR and contribution standards
- Break down the commits into small, reviewable changes
- Branch name should follow the repo's convention, e.g. `<ticket-id>/short-description` or `<type>/short-description` (kebab-case)
- PR description: keep it short — the PR is about the code, not the requirements. Details, rollout, and limitations belong in the ticket, not here
  - **WHAT** — bullet points only, 1-2 short sentences each. No paragraphs
  - **WHY** — a couple of bullet points, 1-2 short sentences. No paragraphs
  - **DEV Evidence** — leave empty
  - Link the ticket
- Make sure we're pushing to a feature branch ONLY — never main
- Follow the repo's Contribution standards (if it exists)
- DO NOT add claude code as contributor
- ALWAYS open a PR as draft
