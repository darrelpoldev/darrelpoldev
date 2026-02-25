# CLAUDE.md — Engineer Profile

## Who I Am

Full-stack software engineer. 12 years in the industry. I ship products end to end — from schema design to production deployment. I'm an architecture-first engineer who happens to code, not the other way around.

## Stack Defaults

- **Language:** TypeScript always. No exceptions.
- **Runtime:** Node.js with Bun as package manager.
- **Frontend:** React (Vite). I'm not a frontend expert — I research as I go. Use Tailwind or whatever CSS framework is already in the project. Help me with styling; I need it.
- **Backend:** Express.js. GraphQL when possible (Postgraphile or TypeORM). REST with Zod validation otherwise.
- **Database:** PostgreSQL (AWS RDS Aurora in production). Prefer timestamps over status columns (e.g., `activatedAt` instead of `isActive`).
- **Cache:** Redis when needed.
- **Infra:** Docker for backend. GitHub Actions for CI/CD. AWS: EC2 (backend), S3 (frontend), RDS Aurora (database).
- **Auth:** JWT-based. Email + hashed password in DB. No strong preference on auth libraries.
- **Monitoring:** Sentry (default), Datadog when available.
- **Testing:** Jest (backend), Vitest (frontend). I don't have strong testing opinions — cover the important scenarios.

## How I Work

1. **Start with diagrams.** I turn stakeholder conversations into visual flows. I map out the user journey before writing any code.
2. **Design the schema.** Once the flow is clear, I model the data. The schema drives everything else.
3. **Build iteratively.** Controller → Service → Database layer. If existing patterns are good, follow them. If they're bad, flag it and suggest improvements.
4. **Keep it simple.** If I can achieve something without adding complexity, I will. But it must also be scalable and future-proof.

## Architecture Principles

- **Screaming Architecture** — folder structure should tell you what the system does, not what framework it uses.
- **Controller/Service pattern** — controllers handle HTTP concerns and payload parsing (Zod). Services contain business logic and decision-making.
- **Functional over OOP** — avoid classes. Keep files simple, composable, and easy to test.
- **Single Responsibility, DRY, KISS** — always.
- **Separation of concerns** — decouple large domains. But don't over-separate to the point of noise.
- **Modular monolith preferred** — only extract microservices when there's a real reason. I have Kafka/distributed systems experience but I reach for it reluctantly.
- **Timestamps over statuses** — `activatedAt`, `deletedAt`, `completedAt` instead of boolean/enum status fields.

## Code Style

- **Long, descriptive names.** Never sacrifice clarity for brevity.
- **Strict typing.** Always create types. Never use `any`.
- **Defensive coding.** Validate inputs first. Use Zod for parsing. Try-catch where failure is expected.
- **Minimal comments.** Only comment complex logic, non-obvious decisions, or major caveats. Never comment obvious code.
- **Simple and readable.** If the code needs a lot of explanation, it's probably too complex. Refactor it.

## What I Need Help With

- **CSS/Styling** — I'm weak here. Give me full implementations, not just hints.
- **DevOps/Infra configs** — I understand the high-level flow but need help writing the actual configs (Dockerfiles, GitHub Actions, AWS setup).
- **Database query optimization** — I write the query for correctness first. Help me optimize performance after.
- **Unit tests** — I'll often ask you to write the full test. Always cover happy path, unhappy path, and edge cases.

## Rules for AI Agents

**Communication:** Be extremely concise. Sacrifice grammar for brevity.

**DO:**
- Write the code and stop. Let me run it.
- Generate migration files but DO NOT execute them.
- Generate test files but DO NOT run the test suite.
- Stay within the project directory. Only touch files relevant to the task.
- If existing patterns are solid, follow them. If they're bad, flag it and suggest better.
- Ask me if something is ambiguous rather than guessing.

**DO NOT:**
- Execute scripts, migrations, test commands, or build commands. I run things myself.
- Run git commands (add, commit, push, checkout). I handle all git operations myself.
- Install or add packages without asking me first.
- Access `node_modules`, `.env`, or environment variables. Ever.
- Refactor code I didn't ask you to refactor.
- Over-abstract or introduce unnecessary patterns.
- Add excessive comments to obvious code.
- Use classes unless I specifically ask for it.
- Use `any` type in TypeScript.

## Project Types I Build

- **SaaS products** — my background.
- **Internal tools and workflow automation** — my passion. I love replacing slow Google Sheets with real web apps that follow internal workflows.
- **Solo or small team projects** — I work best when I own the full stack.
