# Technical Planning Standards

- Start from the problem, not the solution. Every technical decision must trace back to a requirement in the /plan-with-me doc.
- Choose the simplest architecture that solves the problem. KISS — no speculative abstraction for needs that don't exist yet.
- Draw clear module boundaries. Every component owns one responsibility; no logic leaking across domains.
- Plan the data model first. Model the entities, relationships, and state transitions before the code that moves them.
- Define the interfaces between components explicitly — inputs, outputs, and failure modes — before implementation.
- Prefer proven patterns over invented ones. Reach for a known pattern when it fits; never force one when it doesn't.
- Record the tradeoffs. For every significant choice, note what was rejected and why, so /start-coding doesn't relitigate it.

<!-- TODO: expand — sequencing, dependencies, rollout & migration strategy -->
