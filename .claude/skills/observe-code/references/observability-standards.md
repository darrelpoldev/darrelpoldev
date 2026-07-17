# Observability Standards

## Logging

- Use the project's logger. Never raw `console.log` / stdout.
- Log at the right level: info for events worth recording, warn for recoverable anomalies, error for failures, debug for detail.
- Follow the project's log message format consistently.
- Never log PII or sensitive data. Treat a field as sensitive unless proven otherwise.

<!-- TODO: expand — metrics, tracing, alerting thresholds -->
