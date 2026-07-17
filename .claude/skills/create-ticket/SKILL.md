---
name: create-ticket
description: Create, write, file, open, or make a ticket / issue / work item in ANY project. ALWAYS use this skill before creating a ticket — it enforces the required 3-section format. Triggers on any request to create a ticket, whether or not it came from /itemize-work.
---

# Create Ticket

- Purpose: create individual, well-formed tickets from units of work
- MANDATORY: whenever the user asks to create/write/file/open/make a ticket, issue, or work item, use this skill FIRST. Never create a ticket ad-hoc without this format.
- Title: short, descriptive, specific to the unit of work
- Use exactly 3 sections — no more:
  - **What** — needs to be done
  - **Why** — it needs to be done
  - **Notes/Gotchas** — for QA or code reviewers
- Create the ticket in whatever tool the project uses for ticket management, e.g. Notion or Jira
- One ticket per unit of work; keep each small and executable
- Link tickets that need to be linked (blockers, related work) based on /itemize-work output
