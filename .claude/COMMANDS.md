---
description: Dev and deploy commands for all packages and apps
---

# Commands

## Development

```bash
pnpm web                               # Next.js dev server — apps/web
pnpm mobile                            # Expo dev server — apps/mobile
pnpm storybook                         # Storybook on :6006 — packages/storybook
pnpm --filter @rawad/backend dev       # Convex dev — watches and hot-reloads backend
```

Run all four simultaneously. Convex dev must be running for web and mobile to connect to the backend.

## Code quality

```bash
pnpm lint                              # Biome check (read-only)
pnpm format                            # Biome check --write (auto-fix)
```

Formatting runs automatically on every file edit via the PostToolUse hook — no need to run manually.

## Deploy

### Backend (Convex)

```bash
pnpm --filter @rawad/backend deploy    # Deploy to Convex production
```

This pushes schema and functions to the production Convex deployment. Always run after schema or function changes that need to go live.

### Web (Vercel)

Deployments trigger automatically on push to `main`. To deploy manually or preview:

```bash
vercel                                 # Deploy to preview
vercel --prod                          # Deploy to production
```

### Storybook (Vercel)

Storybook is deployed to Vercel. Deployments trigger automatically on push to `main`.

```bash
pnpm --filter @rawad/storybook build-storybook    # Build static Storybook locally
vercel --prod                                      # Deploy to production manually
```

### Mobile (Expo / EAS)

```bash
eas build --platform ios               # Build iOS binary
eas build --platform android           # Build Android binary
eas build --platform all               # Build both

eas submit --platform ios              # Submit to App Store
eas submit --platform android          # Submit to Google Play
```

OTA updates (JS-only changes, no native code):

```bash
eas update --branch production         # Push OTA update to production channel
eas update --branch preview            # Push OTA update to preview channel
```
