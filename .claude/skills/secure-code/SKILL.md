---
name: secure-code
description: Check that code is secure enough to ship to production. Use after /review-code or whenever the user asks for a security check on changes.
---

# Secure Code

- Purpose: make sure the code we just wrote has enough security to be shipped to production
- Review against `references/security-standards.md`
- Focus on the changed code, not a full audit of the codebase
- Output: findings ordered by severity, each with a concrete fix
