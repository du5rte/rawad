# Rawad · رواد

Fleet management and booking infrastructure for Dubai car rentals.

See `.claude/PRODUCT_BRIEF.md` for full product context, personas, and scope.

## Stack

- **Monorepo:** pnpm workspaces
- **Web:** `apps/web` — Next.js (App Router)
- **Mobile:** `apps/mobile` — Expo (React Native)
- **Backend:** `packages/backend` — Convex
- **Shared UI:** `packages/ui`
- **Core logic:** `packages/core`
- **Language:** TypeScript throughout

## Key decisions

- pnpm workspaces over Turborepo — lean monorepo, no build orchestration overhead at this stage
- Convex for backend — real-time queries, serverless functions, built-in auth
- Semantic commits (`feat:`, `fix:`, `chore:`, `docs:`, etc.) — no enforcement tooling, just follow the convention
- English-first UI with Arabic RTL support considered from token level, not retrofitted

## Code style

- TypeScript strict mode throughout
- Prefer editing existing files over creating new ones
- No premature abstractions — solve the problem in front of you
- No comments unless the logic isn't self-evident
