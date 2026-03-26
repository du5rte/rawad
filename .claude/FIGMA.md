---
description: Figma design-to-code workflow — design language, token mapping, component translation
---

# Figma

## Design language

Premium minimalism. High contrast, generous whitespace, no decoration. Reference: Uber, Revolut, N26, Tesla app.

- **Color:** Near-black and white dominant. One brand accent for CTAs and active states only. No gradients, no illustration.
- **Typography:** Inter. Weight contrast between 400 and 600 carries the full hierarchy. No display fonts.
- **Layout:** Card-based, 24px grid, consistent radius. Every screen should feel fintech-grade.
- **RTL:** Arabic layout support is built in from the token level, not retrofitted.

## Translating Figma to code

When given a Figma URL or screenshot:

1. **Check for existing components first.** Look in `packages/ui/src/` before generating new ones. HeroUI covers most primitives.
2. **Map tokens to Tailwind.** Figma design tokens should map to Tailwind utility classes or HeroUI theme tokens — not hardcoded hex values.
3. **Platform matters.** Web uses `@heroui/react`, mobile uses `heroui-native`. If implementing a shared component, both variants need creating in `packages/ui`.
4. **Follow the component structure.** New components go in `packages/ui/src/<component>/` with web, native, stories, and index files.

## Token mapping (expected)

| Figma token | Tailwind / HeroUI equivalent |
|---|---|
| Background primary | `bg-background` / `bg-white dark:bg-black` |
| Text primary | `text-foreground` |
| Brand accent | `bg-primary` / `text-primary` |
| Border | `border-divider` |
| Card surface | `bg-content1` |
| Radius | `rounded-xl` (HeroUI default) |

## Code Connect

Code Connect maps Figma components to their codebase counterparts. When mappings exist, the Figma MCP returns the actual component code instead of generated markup — use that directly.

To add a new mapping after building a component, use the `add_code_connect_map` MCP tool. Keep mappings up to date as components are renamed or moved.

## Key screens (v1 scope)

Refer to `PRODUCT_BRIEF.md` for the full screen list. Priority order for Figma work:

1. **Agent dashboard** — bookings table, status per row
2. **New booking + link generator** — form, shareable link output
3. **Customer self-checkout** — mobile-first, document upload, card save
4. **RTA pre-fill review** — form review screen
5. **Customer profile** — rental history, ratings, reviews
6. **Post-rental review flow** — rating input, charge trigger
