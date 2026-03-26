---
description: Monorepo topology — package ownership, dependency flow, and where to add new code
---

# Agents · Monorepo Map

## Package structure

```
rawad/
├── apps/
│   ├── web/          Next.js 16 (App Router) — agent dashboard, booking UI
│   └── mobile/       Expo 55 (React Native 0.83) — field agent mobile app
└── packages/
    ├── backend/      Convex — schema, mutations, queries, auth
    ├── core/         Pure business logic — pricing, domain functions
    ├── ui/           Shared components — web + native platform variants
    └── storybook/    Storybook — visual docs, picks up all *.stories.tsx
```

## What each package owns

| Package | Owns | Does NOT own |
|---|---|---|
| `apps/web` | Pages, layouts, route handlers, web-only state | Business logic, raw Convex calls (use core/backend) |
| `apps/mobile` | Screens, navigation, mobile-only state | Business logic |
| `packages/backend` | Convex schema, validators, mutations, queries, auth config | Pure computation (delegate to core) |
| `packages/core` | Pure functions and domain logic — no I/O, no Convex calls | DB access, UI |
| `packages/ui` | Shared React components, globals.css | App-specific screens, business logic |
| `packages/storybook` | Storybook config only — no source components | Components (those live in ui/) |

## Dependency flow

```
apps/web ──────┐
               ├──▶ @rawad/core ──▶ @rawad/backend (types only)
apps/mobile ───┤                         ▲
               └──▶ @rawad/ui            │
                                         │
packages/backend ────────────────────────┘ (imports core for pricing logic)
```

Key point: `@rawad/core` imports from `@rawad/backend` **for types only** (Convex-inferred types). `@rawad/backend` imports from `@rawad/core` for computation. This is intentional and not circular at runtime — Convex types are just TypeScript.

## Where to add new things

- **New DB table** → `packages/backend/convex/schema.ts`, then create a sibling `<table>.ts` for its mutations/queries
- **New shared type** → define validator in backend, infer type in `.types.ts` sibling, import in core
- **New business rule** → `packages/core/src/<domain>/`
- **New UI component** → `packages/ui/src/<component>/` with `Component.tsx`, `Component.native.tsx`, `Component.stories.tsx`, `index.ts`
- **New web screen** → `apps/web/src/app/`
- **New mobile screen** → `apps/mobile/app/`

## Running the stack

```bash
pnpm web          # Next.js dev server (apps/web)
pnpm mobile       # Expo dev server (apps/mobile)
pnpm storybook    # Storybook on :6006 (packages/storybook)

# Backend (run from packages/backend or use filter)
pnpm --filter @rawad/backend dev   # convex dev — watches and syncs
```

All four can run simultaneously. Convex dev keeps the backend hot-reloaded.
