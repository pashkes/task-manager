# AGENTS.md

Always-on rules for this repository.

## Project structure (Nx monorepo)

- **apps/web** — Next.js (App Router) + shadcn/ui
- **apps/api** — Fastify REST API + Swagger/OpenAPI
- **libs/shared** — shared types + Zod schemas
- **libs/prisma** — Prisma schema, migrations, client
- **libs/api-client** — generated OpenAPI client for web
- **contracts/openapi.json** — exported API contract (from `nx run api:openapi`)
- **architecture.md** — runtime, services, testing, quality gates

## Core Rules

1. After each completed task, update `memory_bank` when used (`activeContext.md`, `decisions.md`, `progress.md`, `errors.md`, `glossary.md` when terms change).
2. Keep implementation, `contracts/openapi.json`, `libs/prisma/schema.prisma`, and `architecture.md` in sync.
3. Use test-first for new logic: define or update tests before implementation, then run relevant tests after changes.
4. Record new product or logic requirements in `memory_bank/requirements` (if using memory_bank).
5. If requirements are ambiguous or conflicting, ask the user instead of guessing.
6. Use stable, maintainable libraries and follow patterns in `architecture.md`.

## Execution Workflow

1. Read `memory_bank/requirements` when present.
2. Validate compatibility with `contracts/openapi.json`, `libs/prisma/schema.prisma`, and `architecture.md`.
3. Add or update tests (Vitest for unit/integration, Playwright for web e2e, Supertest for API e2e).
4. Implement changes.
5. Run tests via Nx (e.g. `nx run-many -t test`, or per-project `nx run api:test`, `nx run web:test`).
6. Update `memory_bank` when used, including new errors/lessons and glossary terms when applicable.

## Quality Gates

- No hidden behavior outside declared contracts (OpenAPI, Prisma schema).
- No schema or contract drift: update `contracts/openapi.json` via `nx run api:openapi`, and keep `libs/prisma/schema.prisma` and migrations in sync.
- No new logic without corresponding tests.
- No unresolved ambiguity in delivered changes.
- Lint and build must pass (CI: lint, test, build).
