# Errors & Lessons

Record failures and lessons so they are not repeated. Add when debugging or after fixing issues.

## Format

- **What**: brief description
- **Cause**: root cause
- **Fix**: what was done
- **Lesson**: takeaway

---

- **What**: `nx run web:build` fails with "Couldn't find any pages or app directory"
- **Cause**: Nx Next plugin discovers **any** `next.config.*` via glob; a copy under `dist/apps/web` (from a previous build) creates a second inferred project with root `dist/apps/web`, so the build can run with cwd there (no app/).
- **Fix**: Remove `dist` (e.g. `rm -rf dist`) and run `nx reset`; then `nx run web:dev` or `web:serve` works. Added `.nxignore` with `dist` so Nx does not scan it; keep `dist/` in `.gitignore`.

- **What**: Duplicate dependencies for web (tailwind, clsx, etc.) in both root and apps/web/package.json
- **Cause**: Monorepo has a single root package.json (no npm workspaces); shadcn CLI required tailwind in apps/web for init, so deps were added there and in root, and apps/web got its own node_modules.
- **Fix**: Using npm workspaces; web-only deps now in apps/web/package.json. Run shadcn from root with `-c apps/web` if needed.

- **What**: `nx run-many -t lint` failed with "Converting circular structure to JSON" or "expected object but got array".
- **Cause**: @nx/eslint-plugin flat config contains circular references; .eslintrc.cjs with flat config (array) was interpreted as legacy (object) by Nx.
- **Fix**: Use `eslint.config.cjs` (flat config) instead of `.eslintrc.cjs`; omit Nx plugin; add @typescript-eslint/parser, globals (node + RequestInit/Response), and import/resolver node. Lint now passes.
