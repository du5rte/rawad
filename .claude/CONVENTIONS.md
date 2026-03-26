---
description: Code conventions — file naming, type patterns, component structure, styling
---

# Conventions

## File naming

| Pattern | Use for | Example |
|---|---|---|
| `PascalCase.tsx` | React components | `Button.tsx` |
| `PascalCase.native.tsx` | React Native variant of a component | `Button.native.tsx` |
| `PascalCase.stories.tsx` | Storybook stories | `Button.stories.tsx` |
| `camelCase.ts` | Utilities, modules, Convex files | `pricing.ts`, `bookings.ts` |
| `camelCase.types.ts` | Inferred types from Convex validators | `pricing.types.ts` |
| `UPPER.md` | In-package documentation | `PRICING.md` |

## Convex type pattern

Never manually write types for Convex validators. Always infer them.

```ts
// pricing.ts — define the validator
export const money = v.object({
  amount: v.string(),
  currencyCode: v.string(),
});

// pricing.types.ts — infer the type
import { Infer } from "convex/values";
import { money } from "./pricing";

export type Money = Infer<typeof money>;
```

Types live in a `.types.ts` sibling to the file that defines the validator. Import them from there everywhere else.

## Backend module structure

One file per domain table. Each file owns its table's mutations and queries.

```
convex/
├── schema.ts          # All table definitions in one place
├── bookings.ts        # Mutations and queries for bookings table
├── bookings.types.ts  # Types inferred from booking validators (if needed)
├── vehicles.ts
└── helpers.ts         # Shared type helpers (Nullable, Optional, WithId)
```

Schema is the single source of truth. Validators in individual files are for sub-objects (like `money`, `vehicleRates`).

## UI component structure

Each component gets its own directory with four files:

```
src/<component>/
├── Component.tsx          # Web: re-export or thin wrapper around HeroUI
├── Component.native.tsx   # Mobile: wrapper around heroui-native
├── Component.stories.tsx  # Storybook story
└── index.ts               # Re-exports from ./Component (not .native)
```

Web components typically re-export HeroUI directly. Native components wrap heroui-native with a normalised prop interface. Bundlers resolve `.native.tsx` automatically on React Native.

## Core module structure

```
src/<domain>/
├── index.ts       # Re-exports public API
├── <domain>.ts    # Main function(s)
├── <concern>.ts   # Split by concern, not by size
└── <domain>.md    # Document non-obvious logic (e.g., PRICING.md)
```

Core functions are pure — no I/O, no Convex calls, no side effects. Types come from `@rawad/backend`.

## Styling

- Tailwind v4 throughout — no CSS modules, no inline styles
- HeroUI components for both web (`@heroui/react`) and mobile (`heroui-native`)
- Global styles live in `packages/ui/globals.css` — import once per app entry point
- No custom Tailwind config files — use v4 CSS-based config if needed

## TypeScript

- `strict: true` everywhere, plus `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- No comments unless the logic isn't self-evident
- No `any` — use `unknown` and narrow, or fix the type upstream
- Path alias `@/*` available in `apps/web` only
- Package entry points use source directly (`"main": "./src/index.ts"`) — no build step for packages

## Formatting

Biome handles formatting and linting. It runs automatically on every Edit/Write via the `PostToolUse` hook. Double quotes, space indentation. Import organisation is automatic.
