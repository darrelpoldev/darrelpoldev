---
name: itemize-work
description: Read a plan, spec, or RFC and break it into executable chunks of work. Use whenever the user says "itemize this", has output from /plan-with-me, or wants to know what units of work an RFC or spec contains.
---

# Itemize Work

- Purpose: understand the result of /plan-with-me — or any RFC, spec, or plan — and make it executable
- Read the whole document first; restate its goal in one line
- Identify potential chunks / units of work that can each be executed on their own
- Identify which chunks can run in parallel
- Identify blocking relationships: which ticket blocks what
- Output: an ordered, dependency-annotated list of work units
- When the list feels complete, suggest /create-ticket — the user decides
