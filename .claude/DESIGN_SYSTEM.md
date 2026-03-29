# Design System

> Stack: Tailwind CSS v4 · shadcn/ui-style tokens · Lucide icons

---

## Stack & Libraries

- **Component library**: No third-party component library. Custom components built on raw HTML + Tailwind, using a shadcn/ui-style CSS custom property token system
- **Design token format**: CSS custom properties on `:root` and `[data-theme="*"]` — consumed as `hsl(var(--token))` throughout

---

## Philosophy

The aesthetic is **monochromatic functional minimalism**. The entire UI lives in a zero-hue grayscale palette — no brand colour except near-black. Every design decision reinforces speed, trust, and developer confidence. Nothing decorative exists that doesn't serve a function. Every decision reinforces speed and developer confidence; nothing decorative exists that doesn't serve a function.

Key principles:

- **No color** — black, white, and grays only (except destructive red and success green)
- **System font stack** — no custom display font; `-apple-system` feels native and fast
- **soft-rounded** — action controls everything is softly rounded; sharp corners don't exist `8px` radius
- **Subtle depth** — shadows and borders are barely-there; elevation is implied, not stated
- **Compact but breathable** — dense information without feeling cramped; `gap-3` / `12px` is the baseline rhythm

---

## Color Tokens

Tokens are HSL triplets consumed as `hsl(var(--token))`. All light-mode values are custom (not Tailwind's default gray scale). Dark-mode primary switches from near-black to a custom blue — a deliberate brand decision, not a library default.

### Light mode (`:root`)

| Token | HSL | Hex | Notes |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#ffffff` | Page background |
| `--foreground` | `0 0% 9%` | `#171717` | Primary text |
| `--card` | `0 0% 98%` | `#fafafa` | Card / sidebar surface |
| `--card-foreground` | `0 0% 9%` | `#171717` | |
| `--popover` | `0 0% 100%` | `#ffffff` | Dropdown panels |
| `--popover-foreground` | `0 0% 9%` | `#171717` | |
| `--primary` | `0 0% 9%` | `#171717` | **Near-black** — buttons, active states |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | |
| `--secondary` | `0 0% 96%` | `#f5f5f5` | Secondary surfaces |
| `--secondary-foreground` | `0 0% 9%` | `#171717` | |
| `--muted` | `0 0% 96%` | `#f5f5f5` | Muted background |
| `--muted-foreground` | `0 0% 45%` | `#737373` | Dimmed/supporting text |
| `--accent` | `0 0% 92%` | `#ebebeb` | Hover state for nav items |
| `--accent-foreground` | `0 0% 9%` | `#171717` | |
| `--success` | `142 76% 36%` | `#1a9c4a` | Success states |
| `--success-foreground` | `0 0% 100%` | `#ffffff` | |
| `--destructive` | `0 84% 60%` | `#f03a2e` | Errors, delete actions |
| `--destructive-foreground` | `0 0% 100%` | `#ffffff` | |
| `--border` | `0 0% 88%` | `#e0e0e0` | All borders |
| `--input` | `0 0% 88%` | `#e0e0e0` | Input borders at rest |
| `--ring` | `0 0% 9%` | `#171717` | Focus ring — near-black in light mode |

### Dark mode

| Token | HSL | Hex | Notes |
|---|---|---|---|
| `--background` | `0 0% 12%` | `#1f1f1f` | |
| `--foreground` | `0 0% 80%` | `#cccccc` | |
| `--card` | `0 0% 15%` | `#262626` | |
| `--primary` | `0 0% 100%` | `#ffffff` | |
| `--primary-foreground` | `0 0% 9%` | `#171717` | |
| `--secondary` | `0 0% 20%` | `#333333` | |
| `--muted` | `0 0% 20%` | `#333333` | |
| `--muted-foreground` | `0 0% 52%` | `#858585` | |
| `--accent` | `0 0% 24%` | `#3d3d3d` | |
| `--success` | `142 71% 45%` | `#22c55e` | |
| `--border` | `0 0% 24%` | `#3d3d3d` | |
| `--input` | `0 0% 24%` | `#3d3d3d` | |
| `--ring` | `207 90% 40%` | `#0a78c0` | Focus ring matches primary |

---

## Typography

### Font families

- Sans (body/UI): `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Serif (editorial): `"Libre Baskerville", Georgia, "Times New Roman", serif`
- Mono (code): `"Space Mono", Monaco, "Cascadia Code", monospace`

### Type scale

| Role | Size | Weight | Line-height | Letter-spacing | Colour |
|---|---|---|---|---|---|
| Hero / h1 | 48px (`text-4xl`) | 400 | 48px (1:1) | −1.2px | `--foreground` |
| Hero / h1 (md+) | 60px (`text-5xl`) | 400 | — | −1.2px | `--foreground` |
| h2 | 24px (`text-2xl`) | 400 | 32px | normal | `--foreground` |
| Brand label | 18px (`text-lg`) | 600 | — | −0.45px | `--foreground` |
| Body / base | 16px (`text-base`) | 400 | 24px | normal | `--muted-foreground` |
| UI / sm | 14px (`text-sm`) | 500 | — | normal | contextual |
| Caption / xs | 12px (`text-xs`) | 500 | — | normal | `--foreground` |
| Badge / tag | 11px (`text-[11px]`) | 500 | — | normal | `--primary-foreground` |

**Responsive sizing**: h1 steps up from `text-4xl` (48px) on mobile to `text-5xl` (60px) at the `md` breakpoint. All other sizes are fixed.

### Common combinations

| Context | Pairing |
|---|---|
| Hero | 48–60px/400 heading + 16px/400 muted subtext |

---

## Spacing

- **Base unit**: `4px` (`--spacing: .25rem`)
- **Scale**: Tailwind v4 default (`1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 20px, 6 = 24px, 8 = 32px, 10 = 40px, 12 = 48px`)

## Spacing

| Space between title and content | 8px (`gap-2`) |
| Space between icon and label | `gap-3` (12px) |
| Space between cards | 12px (`g-3`) |
| Space between sections | 24px (`g-6`) |
| Space between sibling menu items | 4px (`g-1`) |

### Web Spacing

| Context | Value |
|---|---|
| Web container max-width | 1152px (`max-w-6xl`) |
| Web container vertical margin | 160px (`my-40`) |
| Web content horizontal padding | 32px (`px-8`) |
| Web content vertical padding | 48px (`py-12`) |

### Mobile Spacing

| Context | Value |
|---|---|
| Side margins | 16px (`px-4`) |

---

## Border Radius

| Value | Context |
|---|---|
| `8px` (`rounded-lg` / `--radius: .5rem`) | Sidebar nav items, hover states on list rows |
| `6px` (`rounded-md`) | Badge / "New" tag in sidebar |

---

## Elevation & Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Pill buttons (`shadow-sm`) |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` | Cards (subtle lift) |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Modals |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Floating panels |

Dark mode uses the same shadow values — no glow strategy, borders carry most of the separation work at low opacity.

---

## Components

### Button

All variants share a consistent height within each size and the same transition: `150ms cubic-bezier(0.4, 0, 0.2, 1)` on `color`, `background-color`, `border-color` (`transition-colors`).

Shape: use `rounded-full` (pill) for standalone action buttons and selectors; use `8px` (`rounded-lg`) for buttons embedded in navigation or list rows.

#### Sizes

| Size | Height | Font size | Line-height | Padding V | Padding H | Border radius | Icon size |
| ---- | ------ | --------- | ----------- | --------- | --------- | ------------- | --------- |
| xs | 24px | 11px | 14px (1.27) | 5px | 8px | 6px | 12px |
| sm | 32px | 12px | 16px (1.33) | 8px | 12px | 6px | 14px |
| md | 40px | 14px | 20px (1.43) | 10px | 16px | 8px | 16px |
| lg | 48px | 14px | 20px (1.43) | 14px | 20px | 8px | 18px |
| xl | 56px | 16px | 24px (1.50) | 16px | 24px | 8px | 20px |

Default: **md**.

#### Variants

##### Light

| Variant | Background | Text | Border | Hover |
| ------- | ---------- | ---- | ------ | ---------------- |
| **Solid** | `bg-primary` `#171717` | `text-primary-foreground` `#ffffff` | none | `hover:bg-primary/90` `#171717e6` |
| **Subtle** | `bg-secondary` `#f5f5f5` | `text-secondary-foreground` `#171717` | none | `hover:bg-secondary/90` `#f5f5f5e6` |
| **Surface** | `bg-background` `#ffffff` | `text-foreground` `#171717` | none | `hover:bg-accent` `#3d3d3d` |
| **Outline** | transparent | `text-foreground` `#171717` | `border-border` `#e0e0e0` | `hover:bg-accent` `#ebebeb` |
| **Ghost** | transparent | `text-foreground` `#171717` | none | `hover:bg-accent` `#ebebeb` |
| **Plain** | transparent | `text-muted-foreground` `#737373` | none | `hover:text-foreground` `#171717` |

##### Dark

| Variant | Background | Text | Border | Hover background |
| ------- | ---------- | ---- | ------ | ---------------- |
| **Solid** | `bg-primary` `#ffffff` | `text-primary-foreground` `#171717` | none | `hover:bg-primary/90` `#ffffffe6` |
| **Subtle** | `bg-secondary` `#333333` | `text-foreground` `#cccccc` | none | `hover:bg-secondary/90` `#333333e6` |
| **Surface** | `bg-background` `#1f1f1f` | `text-foreground` `#cccccc` | `border-border` `#3d3d3d` | `hover:bg-accent` `#3d3d3d` |
| **Outline** | transparent | `text-foreground` `#cccccc` | `border-border` `#3d3d3d` | `hover:bg-accent` `#3d3d3d` |
| **Ghost** | transparent | `text-foreground` `#cccccc` | none | `hover:bg-accent` `#3d3d3d` |
| **Plain** | transparent | `text-muted-foreground` `#858585` | none | `hover:text-foreground` `#cccccc`, |

#### Disabled

All variants: `opacity: 0.5`, `cursor: not-allowed`. No other visual change.

#### Loading

All variants: `opacity: 0.5` + spinner.

#### Button Group

Group buttons together into a connected row. Adjacent buttons collapse their shared border:

- Pass `size` and `variant` at the group level — inner buttons inherit
- All buttons in the group share the same height and radius on outer edges; inner edges are square (`rounded-none`)
- **Trigger button**: icon-only (`▼` chevron), same height, square aspect ratio, separated from the primary by a `1px` inner border in the same border color as the variant

---

## Text Input

TODO

---

## Select & Dropdown

TODO

---

## Icons

- **Library**: Lucide
- **Stroke width**: Lucide default (1.5px)
- **Colour**: Inherits current text color

| Size | Context |
|---|---|
| 14px (`w-3.5`) | Chevron, small inline indicators |
| 16px (`w-4`) | Body-level content icons |
| 18px (`w-[18px]`) | Sidebar nav item icons |
| 20px (`w-5`) | Sidebar header icons (logo, auth) |

---

## Cards

TODO

---

### Badge / Tag

| Property | Value |
|---|---|
| Background | `--primary` (#171717) |
| Text | `--primary-foreground` (#fff) |
| Font size | 11px / 500 |
| Padding | `px-2 py-0.5` (8px / 2px) |
| Border radius | `rounded-md` (6px) |

---

## Motion & Animation

- **Universal transition**: every button, select, and interactive element uses:

  ```
  150ms cubic-bezier(0.4, 0, 0.2, 1)
  ```

  applied to: `color`, `background-color`, `border-color`, `outline-color`, `fill`, `stroke`, gradient vars. This is Tailwind's `transition-colors` class.

- **Motion design language**: **Subtle**. 150ms is at the snappy end of smooth — transitions are felt more than seen. No spring physics, no overshoots, no elaborate choreography. The single easing curve (`cubic-bezier(0.4, 0, 0.2, 1)`) is applied universally and consistently — there is a clear motion system, it's just minimal. Everything that moves uses the same curve and the same duration. This is a content-first product; animation does not call attention to itself.

- **Entrance/exit animations**: TODO

- **Reduced-motion**: not explicitly observed, but Tailwind v4's animate utilities respect `prefers-reduced-motion` by default.
