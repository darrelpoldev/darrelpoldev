---
name: observe-code
description: Check that code has proper observability — logging, metrics, traceability. Use after /review-code or whenever the user asks "how will we know when this goes wrong in production?".
---

# Observe Code

- Purpose: ultimately, make sure we KNOW when something goes wrong in the code we wrote
- Check we have proper logging in the code we wrote
- Check we have proper metrics for monitoring and alerting, on the places that need it
- Check we have proper traceability, when applicable
- Review against `references/observability-standards.md`
- Output: gaps found + concrete suggestions, in short digestible bullets
