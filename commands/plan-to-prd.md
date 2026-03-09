# Convert Plan to PRD Feature List

You are an initializer agent. Your job is to read a plan document and create the structured environment needed for incremental, multi-session development using the Ralph Wiggum loop technique.

Read the plan document at: $ARGUMENTS

---

## Step 1: Analyze the Plan

Before generating anything, read the entire plan and identify:
- All discrete features/tasks mentioned
- Dependencies between features (what must be built first)
- All files that need to be created or modified
- Logical groupings/categories for the work
- Any verification/testing criteria mentioned

---

## Step 2: Create `feature_list.json`

Generate a JSON file at the project root with this structure:

```json
{
  "plan_source": "<path to the plan file>",
  "created_at": "<ISO date>",
  "total_features": <number>,
  "features": [
    {
      "id": "<category>-<NNN>",
      "category": "<logical grouping>",
      "priority": <number starting from 1>,
      "description": "<what this feature does — one clear sentence>",
      "steps": [
        "<concrete verification step 1>",
        "<concrete verification step 2>"
      ],
      "files": ["<files to create or modify>"],
      "depends_on": ["<id of prerequisite feature, if any>"],
      "passes": false
    }
  ]
}
```

### Rules for feature extraction:

1. **Granularity**: Each feature must be completable in a single focused coding session (roughly 1-15 minutes of agent work). If a feature would take longer, split it.
2. **Ordering**: Assign priority numbers so that foundational work comes first. Features should be workable in priority order without hitting unmet dependencies.
3. **Dependencies**: If feature B requires feature A to exist first, include `"depends_on": ["<feature-A-id>"]`. Keep dependency chains short.
4. **Concrete steps**: Every step must be verifiable — not "works correctly" but "TypeScript compiles with no errors" or "GET /api/health returns 200".
5. **File coverage**: Every file mentioned in the plan must appear in at least one feature's `files` array. After generating, cross-check this.
6. **Categories**: Derive from the plan's natural structure (e.g., "api", "ui", "config", "auth", "layout"). Use kebab-case.
7. **No feature too small to skip**: Config files, env examples, and boilerplate all get their own features. These are easy wins that build momentum.
8. **Splitting guidelines**:
   - Separate "create file" from "implement logic" when the logic is complex
   - Separate "implement feature" from "write tests for feature" if tests are expected
   - Separate modifications to existing files from creation of new files
   - Group tightly-coupled files that must change together into one feature

### Example feature entry:

```json
{
  "id": "api-001",
  "category": "api",
  "priority": 1,
  "description": "Add generateAdminHandoffToken method to auth service with in-memory Map storage and 30s TTL",
  "steps": [
    "Method exists in api/src/domains/auth/auth.service.ts",
    "Generates a unique token string",
    "Stores token in Map with userId and expiresAt (30s from now)",
    "Returns the token string",
    "TypeScript compiles with no errors"
  ],
  "files": ["api/src/domains/auth/auth.service.ts"],
  "depends_on": [],
  "passes": false
}
```

---

## Step 3: Create `claude-progress.txt`

Create at the project root:

```
# Progress Log
## Plan: <title from the plan>
## Source: <path to plan file>
## Created: <today's date and time>
## Total Features: <count>
---

### Session Log

(Entries will be appended by coding agents as they complete work)
```

---

## Step 4: Create `init.sh`

Create an executable bash script at the project root that a coding agent runs at the start of every session.

**Before writing this script, discover the project's actual setup:**

1. **Read `CLAUDE.md`** (or `.claude/settings.json`, `README.md`) at the project root if it exists — this often documents the project's commands, tooling, and conventions. Use whatever commands are specified there.
2. **Read `package.json`** (or `pyproject.toml`, `Makefile`, `Cargo.toml`, etc.) to discover the actual scripts available (e.g., the project might use `npm run typecheck`, `bun run check`, `pnpm lint`, `make test`, or something else entirely).
3. **Detect the package manager** from lock files: `bun.lockb` → bun, `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `package-lock.json` → npm. For non-JS projects, detect accordingly (pip/poetry/cargo/go/etc).
4. **Check for monorepo setup**: Look for `workspaces` in package.json, `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, etc. If it's a monorepo, the health checks should cover relevant workspaces.

**Then generate `init.sh` using only commands that actually exist in the project.** The script should:

- Check that dependencies are installed (warn if not, don't auto-install)
- Run the project's actual type-check command (if one exists)
- Run the project's actual lint command (if one exists)
- Run the project's actual test command (if one exists)
- Note any dev server start commands (if relevant to the plan)
- Skip any check that doesn't have a corresponding script in the project

**Example structure** (adapt entirely to what you discover):

```bash
#!/bin/bash
set -e

echo "=== Initializing development environment ==="

# Dependency check (detected: <package manager>)
if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules not found. Run '<detected install command>' first."
  exit 1
fi

# Health checks (from package.json scripts)
echo "Running type-check..."
<actual type-check command> || echo "⚠️  Type-check failed — fix before starting new work"

echo "Running linter..."
<actual lint command> || echo "⚠️  Lint errors found"

echo "=== Environment ready ==="
```

Make it executable: `chmod +x init.sh`

---

## Step 5: Output Summary

After completing all steps, print a summary:

```
✅ PRD environment initialized

📋 feature_list.json
   Total features: <N>
   Categories:
   - <category>: <count> features
   - <category>: <count> features
   ...

📝 claude-progress.txt — ready for session logging
🔧 init.sh — environment health check script

⚠️  Files are NOT committed. Review the generated files, then commit when ready:
   git add feature_list.json claude-progress.txt init.sh
   git commit -m "chore: initialize PRD environment from plan"

Next step: Review feature_list.json, then start a Ralph loop:

/project:ralph-start
```

---

## Important Notes

- Do NOT implement any features. Your only job is to create the scaffolding.
- Do NOT modify any existing source code.
- If the plan references existing files you need to understand (e.g., "mirror the pattern in X"), you may read those files to write better feature descriptions and steps, but do not change them.
- If the plan is ambiguous about something, make a reasonable assumption and note it in claude-progress.txt under a "## Assumptions" heading.
