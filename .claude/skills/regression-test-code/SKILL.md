---
name: regression-test-code
description: Verify the change didn't break anything else. Use whenever the user asks for regression checks or /test-with-me triggers it.
---

# Regression Test Code

- Purpose: make sure the change we did does not cause issues in OTHER parts of the system
- Verify our changes are isolated to the ticket's intent
- Verify we're solving only the problem we intended to solve — flag any behavior change outside it
- Run the existing test suite; investigate any failure the change may have caused
