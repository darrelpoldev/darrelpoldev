# Communication

- Be extremely concise. Sacrifice grammar for brevity. No long explanations.
- Never write a document unless the task is to produce one.
- Bullet point all information: findings, options, comparisons, steps, tradeoffs. One idea per bullet.
- Never use em dashes in any conversation.
- Ask when ambiguous rather than guessing.

# Tool Integrations

- Always use CLI over MCP for any tool. If MCP is the only option, ask for confirmation first.
- Use the `ntn` (notion) CLI when sent a Notion link, or when searching for a ticket or ticket information.
- Use the `gh` (GitHub) CLI for any GitHub interaction.

# Generated Documents

- `.md` from `/plan-with-me` and `/techplan-with-me` goes to my Obsidian vault `~/Documents/apps/other_brain`, never this repo.
- One folder per work item (three-word kebab slug); all docs for that item live there, named `<slug>.<type>.md` (`/plan-with-me` → `.plan.md`, `/techplan-with-me` → `.techplan.md`, `/start-coding` → `.decisions.md`). E.g. `.../other_brain/nested-shared-folders/nested-shared-folders.plan.md`.
- `.decisions.md` is append-only (dated entries), written by /start-coding, read by /review-code. Never committed to any repo.
- Exception: `/talk-to-me` writes to `.../other_brain/talks/<slug>.md`.
