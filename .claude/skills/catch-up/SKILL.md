---
name: catch-up
description: Absorb all context for the current branch's work item — vault docs, ticket, branch state — before continuing work. Use whenever the user says "catch up", "catch me up", or resumes work on a branch.
---

# Catch Up

- Purpose: load everything already known about the current work item so work continues with full context, never from scratch
- Identify the work item from the current git branch; the ticket ID is always part of the branch name
- Find the work item's folder in the Obsidian vault (location per Generated Documents rules in CLAUDE.md) by matching the branch's slug to a folder name
- Read every doc in that folder: `.plan.md`, `.techplan.md`, `.decisions.md`, anything else present
- Fetch the ticket by the ID from the branch name, using the ticket tool configured in CLAUDE.md
- Check branch state: commits and diff vs the main branch, to know what's already built
- If no vault folder or ticket matches the branch, say so and ask which work item this is — never guess
- Output: a short bullet summary — goal, technical approach, decisions so far, work done, work remaining
- Then stop and wait for direction; catching up never starts coding
