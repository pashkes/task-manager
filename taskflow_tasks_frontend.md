# TaskFlow — Frontend tasks (Next.js + shadcn/ui)

## 1) Project setup

- Create Next.js app (App Router, TS, ESLint)
- Install/config shadcn/ui + dark theme
- Add global styles (background blur/glow like screenshots)
- Set up environment variables:
  - NEXT_PUBLIC_API_URL

## 2) Public pages

- Landing page:
  - hero, CTA buttons, 3 feature cards
  - responsive layout
- Auth pages:
  - /sign-up (full name, email, password, confirm)
  - /sign-in (email, password)
  - client-side validation + submit states + error toasts

## 3) Auth integration

- API client (fetch wrapper) with:
  - base URL
  - credentials included (if cookie auth)
  - typed errors
- Auth persistence strategy:
  - cookie-based session (recommended) OR token storage
- Protected routing:
  - middleware.ts redirect unauthenticated to /sign-in
  - redirect authenticated away from auth pages to /app/board

## 4) Board UI (Kanban)

- Board layout (3 columns):
  - header (progress indicator, New Task button)
  - columns: To Do / In Progress / Done
- Task card component:
  - title, small description, priority badge
  - actions: edit/delete (icons)

## 5) Create/Edit/Delete task flows

- Create task dialog:
  - title required, description optional
  - priority selector (low/medium/high)
- Edit task dialog (reuse)
- Delete confirmation dialog
- Optimistic UI updates + rollback on error (optional for MVP)

## 6) Drag & drop

- Integrate drag & drop library (e.g., dnd-kit)
- Implement:
  - reorder within same column
  - move across columns
  - update UI instantly, then persist with /tasks/:id/move

## 7) Quality & DX

- Empty states:
  - no tasks in column
- Loading states and skeletons
- Basic a11y (focus trap in dialogs, aria labels)
- E2E smoke flow (Playwright):
  - sign up -> create task -> move -> delete

## Deliverables

- UI matches screenshots (spacing, glow, rounded cards)
- Functional auth + board + task CRUD + drag&drop
