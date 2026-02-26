-- Initial schema (run manually or via your migration tool).
-- Requires DATABASE_URL and an existing database.

CREATE TABLE IF NOT EXISTS "User" (
  "id"        TEXT PRIMARY KEY,
  "email"     TEXT NOT NULL UNIQUE,
  "password"  TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Task" (
  "id"          TEXT PRIMARY KEY,
  "title"       TEXT NOT NULL,
  "description"  TEXT,
  "status"      TEXT NOT NULL,
  "priority"    TEXT NOT NULL,
  "position"    INT NOT NULL,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
