# TaskFlow — Task Manager

Full-stack Kanban-style task manager: Next.js frontend, Fastify REST API, PostgreSQL. Auth (JWT), boards with columns (To Do, In Progress, Done), CRUD and drag-and-drop move for tasks. Nx monorepo with shared types, Prisma, and generated OpenAPI client.

**Stack:** Next.js (App Router) + shadcn/ui · Fastify · Prisma · PostgreSQL · OpenAPI/Swagger

**Docs:** [architecture.md](architecture.md) — system diagrams and architecture notes. `memory_bank/` — persistent project context and decisions (when used).

---

## Requirements

- Node.js 22
- Docker (for Postgres / compose)

## Setup

```bash
npm ci
npm run openapi
```

## Deploy

**Web (Next.js)** — деплой на **Vercel** (подключить репозиторий, при необходимости указать root directory `apps/web` или monorepo preset). Docker для веба не используется.

**API + DB** — локально или на хостинге:

**Option 1: Docker (DB + API)**

```bash
npm ci
npm run openapi
npm run docker:up
```

- api: http://localhost:3001  
- api docs: http://localhost:3001/docs  

Локально веб: `nx serve web` (в отдельном терминале). В `.env` задать `NEXT_PUBLIC_API_URL=http://localhost:3001` и при необходимости `POSTGRES_*`, `JWT_SECRET`.

**Option 2: без Docker**

1. Run PostgreSQL (e.g. `docker run` or a local instance), create the database, and set `DATABASE_URL`.
2. Run migrations: `nx run prisma:migrate:deploy` (requires `DATABASE_URL` in the environment or `.env`).
3. Start API and web via Nx:

```bash
npm ci
npm run openapi
nx serve api    # in one terminal
nx serve web    # in another; set NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Dev

Запуск API + DB: `npm run docker:up`. Веб локально: `nx serve web` (отдельный терминал). Либо только БД в Docker, затем `nx serve api` и `nx serve web`.

## Project structure (Nx monorepo)

| Path | Description |
|------|-------------|
| `apps/web` | Next.js (App Router) + shadcn/ui — landing, auth, Kanban board |
| `apps/api` | Fastify REST API (`/v1`), Swagger at `/docs` |
| `libs/shared` | Shared types + Zod schemas |
| `libs/prisma` | Prisma schema, migrations, client |
| `libs/api-client` | Generated OpenAPI client for web |
| `contracts/openapi.json` | API contract (updated via `nx run api:openapi`) |

## Nx

- `nx serve web` — dev server (web)
- `nx serve api` — dev server (API)
- `nx run api:openapi` — export OpenAPI to `contracts/openapi.json`
- `nx run api-client:generate` — regenerate client from contract
- `nx run-many -t test` — run all tests
- `nx run-many -t build` — build all apps
