# Backoffice

Admin dashboard front-end built with React, Vite, and shadcn/ui. This repo focuses on a clean layout system, a predictable store setup, and a test baseline that scales with new modules.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui (Radix UI)
- Redux Toolkit + RTK Query
- Vitest + Testing Library
- ESLint + Prettier
- Husky (pre-commit, pre-push)

## Project structure

```text
src/
  components/        shared UI (shadcn/ui wrappers and primitives)
  hooks/             reusable hooks (media query, responsive helpers)
  layout/            App shell (Header, Sidebar, MenuItem)
  pages/             route-level screens (dashboard, users, employees, auth)
  router/            routes + guards + config
  store/             Redux Toolkit + RTK Query setup
  styles/            globals + externals + utilities
  plugins/           app-wide helpers (theme)
  types/             shared TypeScript types
```

## Architecture notes

- Layout is modularized by component under `src/layout`.
- Routing uses a config-driven approach with auth guards and a feature flag toggle.
- Store uses RTK slices and a base RTK Query API for future endpoints.
- Theme is centralized via a provider and a small plugin to sync class names.
- Tests target UI primitives, layout components, and key hooks.

## Env

Create a `.env` file based on `.env.example`:

- `VITE_APP_API_URL` — API base URL
- `VITE_APP_BASE_LAYOUT_CONFIG_KEY` — layout config key placeholder
- `VITE_AUTH_ENABLED` — `true` to enforce auth guards, `false` to bypass during dev

## Install & run

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run typecheck
```

## Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

Coverage thresholds are enforced at 80% (lines, branches, functions, statements).

## Git hooks

- `pre-commit`: runs `lint:fix` and `lint`
- `pre-push`: runs `test:coverage`
