# Security Standards

- Deny by default. Authorize on every read and write, not just at the edge.
- Validate and parse every external input at the boundary with the project's schema validator. Never trust a client payload.
- Parameterized queries only. Never build queries or filters by string concatenation.
- Secrets come from env or a secret manager. Never hardcoded, never committed, never logged.
- Never return more than the caller is entitled to. No internal IDs, stack traces, or PII in responses or errors.
- Rate limit public endpoints. If the project exposes GraphQL, apply depth and complexity limits and disable introspection in prod.

<!-- TODO: expand — dependencies, message queues, orchestrator secret management -->
