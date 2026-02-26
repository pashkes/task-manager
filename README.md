# TaskFlow — Task Manager

Full-stack Kanban-style task manager: Next.js frontend, Fastify REST API, PostgreSQL. Auth (JWT), boards with columns (To Do, In Progress, Done), CRUD and drag-and-drop move for tasks. Nx monorepo with shared types, pg (node-postgres), and generated OpenAPI client.

**Stack:** Next.js (App Router) + shadcn/ui · Fastify · pg · PostgreSQL · OpenAPI/Swagger

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

**Web (Next.js)** — deploy to **Vercel** (connect the repo; set root directory to `apps/web` or use monorepo preset if needed). Docker is not used for the web app.

**API + DB** — локально или на хостинге:

**Option 1: Docker (DB + API)**

```bash
npm ci
npm run openapi
npm run docker:up
```

- api: http://localhost:3001
- api docs: http://localhost:3001/docs

To run the web locally: `nx serve web` (in a separate terminal). Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `.env`, and optionally `POSTGRES_*`, `JWT_SECRET`.

**Option 2: Without Docker**

1. Run PostgreSQL (e.g. `docker run` or a local instance), create the database, and set `DATABASE_URL`.
2. Apply DB schema: run `apps/api/schema.sql` against your database (e.g. `psql $DATABASE_URL -f apps/api/schema.sql`) or use your migration tool.
3. Start API and web via Nx:

```bash
npm ci
npm run openapi
nx serve api    # in one terminal
nx serve web    # in another; set NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Dev

API + DB: run `npm run docker:up`. Web locally: `nx serve web` (separate terminal). Or run only the DB in Docker, then `nx serve api` and `nx serve web`.

## Project structure (Nx monorepo)

| Path                     | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `apps/web`               | Next.js (App Router) + shadcn/ui — landing, auth, Kanban board |
| `apps/api`               | Fastify REST API (`/v1`), Swagger at `/docs`                   |
| `libs/shared`            | Shared types + Zod schemas                                     |
| `libs/api-client`        | Generated OpenAPI client for web                               |
| `contracts/openapi.json` | API contract (updated via `nx run api:openapi`)                |

## Nx

- `nx serve web` — dev server (web)
- `nx serve api` — dev server (API)
- `nx run api:openapi` — export OpenAPI to `contracts/openapi.json`
- `nx run api-client:generate` — regenerate client from contract
- `nx run-many -t test` — run all tests
- `nx run-many -t build` — build all apps
