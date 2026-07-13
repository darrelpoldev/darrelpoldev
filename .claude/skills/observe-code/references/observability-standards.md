# Observability Standards

## Logging

- Use the project's logger. Never `console.log`.
- `logger.info` when logging informational events.
- `logger.error` when logging an error.
- Every log message starts with the method name in brackets: `[updateUserProfile] profile updated`.
- Never log PII or sensitive data. Treat a field as sensitive unless proven otherwise.

<!-- TODO: expand — metrics, tracing, alerting thresholds -->
