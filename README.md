# Backoffice

Admin dashboard front-end built with React and Vite.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Redux Toolkit + RTK Query
- ESLint + Prettier

## Why these tools

- Redux Toolkit: global state management for auth/session and shared UI state.
- RTK Query: data fetching, caching, and API normalization.
- Tailwind + shadcn/ui: fast UI composition with consistent design tokens.

## Requirements

- Node.js 18+
- npm

## Env

Create a `.env` file based on `.env.example`:

- `VITE_APP_API_URL`
- `VITE_APP_BASE_LAYOUT_CONFIG_KEY`

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
