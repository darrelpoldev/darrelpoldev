---
name: doc-maintenance
description: "Comprehensive documentation maintenance skill for scanning the codebase and updating CLAUDE.md and cursor rules files to reflect current business logic, patterns, and conventions. Use this skill whenever the user asks to update documentation, audit docs, sync docs with code, scan for documentation drift, refresh CLAUDE.md or cursor rules, or any variation of 'make sure our docs are up to date.' Also trigger when the user says things like 'update the md files', 'check if our rules are current', 'scan the codebase and update docs', 'refresh documentation', or 'our docs might be outdated.' This skill covers the full workflow: discovery, analysis, diffing, planning, and updating."
---

# Documentation Maintenance Skill

This skill provides a structured workflow for scanning a codebase and updating all CLAUDE.md and cursor rules files so they accurately reflect the current state of the code. It's designed for monorepos but works for any project structure.

## When to Use This Skill

- The user wants to audit or refresh documentation
- Business logic has changed and docs may be stale
- New modules, services, or patterns have been added without doc updates
- The user wants to verify docs match reality
- Periodic documentation hygiene checks

## Workflow

### Phase 1: Discovery

Find every documentation file in the repo:

```bash
find . -name "CLAUDE.md" -not -path "*/node_modules/*" -not -path "*/.git/*"
find . \( -name ".cursorrules" -o -name "rules" -path "*/.cursor/*" \) -not -path "*/node_modules/*" -not -path "*/.git/*"
```

Read each file and build a map of what's documented where. Note the hierarchy — root-level docs cover repo-wide concerns, subdirectory docs cover domain-specific patterns.

### Phase 2: Codebase Analysis

For each area of the codebase that has (or should have) documentation, analyze:

**Backend (e.g., `api/`):**

- Framework and language version
- Folder structure and naming conventions
- API patterns: REST endpoints, GraphQL schemas, resolvers, controllers
- Database models, schemas, migrations, ORM patterns
- Service layer patterns, dependency injection, error handling
- Authentication and authorization middleware
- Environment variables and configuration
- Available scripts (dev, test, build, lint, migrate)
- Domain-level subfolders and their unique patterns

**Frontend (e.g., `ui/`):**

- Framework and version
- Component patterns and folder structure
- State management approach
- Routing conventions
- Styling approach
- API client patterns
- Testing patterns
- Build and dev scripts

**Shared / Root:**

- Monorepo tooling
- Shared types, utilities, or packages
- CI/CD configuration
- Git conventions
- Environment setup instructions

### Phase 3: Diff and Identify Drift

Compare what's documented against what actually exists in the code. Look for:

1. Outdated references — files, modules, or patterns mentioned in docs that no longer exist
2. Missing documentation — new modules, services, patterns, or conventions that aren't documented
3. Incorrect patterns — documented conventions the code no longer follows
4. Inconsistencies — contradictions between root-level and domain-level docs
5. Stale dependencies — documented versions that have changed
6. Missing domain docs — subdirectories with enough unique patterns to warrant their own CLAUDE.md but don't have one

### Phase 4: Plan

Before making any changes, present a clear summary:

- Files found
- What needs to be removed, updated, or added in each file
- Any new files recommended
- What's still accurate

**Wait for my approval before making any changes.**

### Phase 5: Update

When updating, follow these rules:

- Keep it concise and actionable — document patterns, not obvious things
- Root docs: repo structure, shared conventions, tooling
- Domain docs: domain-specific models, services, patterns
- Don't duplicate root guidance in subdirectory files
- Preserve existing structure, add in logical places
- Don't remove the Documentation Maintenance policy or Playwright MCP sections
- Keep cursor rules in sync with CLAUDE.md changes
- Prefer 2-3 line code examples over paragraphs of explanation
- Document the "why" behind non-obvious conventions
- Include runnable commands (dev, test, build, migrate)

### Phase 6: Verify

After changes, re-read each updated file to confirm coherence, no accidental deletions, no contradictions between root and domain docs, and that required sections are still present.
