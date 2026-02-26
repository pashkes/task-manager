# Decisions

Architectural and product decisions. Add new entries when making significant choices.

## Format

- **Decision**: short title
- **When**: date or context
- **Why**: rationale
- **Options considered**: (optional)

---

- **Decision**: Use AGENTS.md + memory_bank for agent/workflow rules
- **When**: repo setup
- **Why**: Single source of rules, execution workflow, and quality gates; memory_bank for context and requirements when used.

- **Decision**: npm workspaces so app-only deps live in app package.json
- **When**: Nx monorepo setup
- **Why**: Root has `"workspaces": ["apps/*"]`. Web-only deps (react, tailwind, shadcn, etc.) are in apps/web/package.json; api/shared deps stay in root. npm install hoists all to root node_modules so Nx builds still resolve from root. Lint: known Nx 20 issue "Converting circular structure to JSON" with @nx/eslint-plugin flat config — documented in errors.md.
