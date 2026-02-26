# TaskFlow — Backend tasks (Fastify + Postgres)

## 1) Project setup

- Fastify server with:
  - CORS (frontend origin), sensible limits
  - request logging
  - env config (NODE_ENV, PORT, DATABASE_URL, JWT_SECRET, COOKIE_SECRET)
- Dockerfile for backend

## 2) Database & migrations

- Choose migration tool (e.g. node-pg-migrate / knex / drizzle, or run schema.sql manually)
- Create schema:
  - users, boards, columns, tasks
- Seed:
  - on first user creation: create default board + 3 columns

## 3) Auth

- Password hashing (argon2 or bcrypt)
- JWT issuance
- Cookie auth (httpOnly, secure in prod) OR bearer token support
- Middleware/plugin:
  - verify auth for protected routes
  - attach user to request

Endpoints:

- POST /v1/auth/register
- POST /v1/auth/login
- POST /v1/auth/logout (if cookie)

## 4) Board endpoints

- GET /v1/board:
  - returns default board with columns and tasks
  - tasks sorted by position
- (optional) PATCH /v1/board rename

## 5) Task endpoints

- POST /v1/tasks
- PATCH /v1/tasks/:id
- DELETE /v1/tasks/:id
- PATCH /v1/tasks/:id/move:
  - supports move across columns and reorder
  - implement deterministic ordering strategy:
    - numeric position with gaps OR list reindex on each move
  - transaction safety (board scoped to user)

## 6) Validation & errors

- Request/response validation (Zod or JSON Schema)
- Error contract:
  - 400 validation
  - 401 unauth
  - 403 forbidden
  - 404 not found
  - 409 conflict (optional)
- Consistent error body:
  - { code, message, details? }

## 7) Observability & hardening (MVP-level)

- Rate limit on auth routes
- Helmet-like security headers (or via reverse proxy)
- Health endpoints:
  - GET /health
  - GET /ready (checks DB)

## Deliverables

- Stable REST API for the board UI
- Migrations + seeds + predictable local dev via docker compose
