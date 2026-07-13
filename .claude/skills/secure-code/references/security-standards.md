# Security Standards

- Deny by default. Authorize on every read and write, not just at the edge.
- Validate and parse every external input at the boundary with Zod. Never trust a client payload.
- Parameterized queries only. Never build SQL or Mongo filters by string concatenation.
- Secrets come from env or a secret manager. Never hardcoded, never committed, never logged.
- Never return more than the caller is entitled to. No internal IDs, stack traces, or PII in responses or errors.
- Rate limit public endpoints. GraphQL gets depth and complexity limits, introspection off in prod.

<!-- TODO: expand — dependencies, Kafka, k8s secrets -->
