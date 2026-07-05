# WOOFI Tokens v2 — Soft Warm UI

**Status:** Implemented in code (July 2026)  
**Source:** `src/design/tokens.js`  
**Direction:** `VISUAL-DIRECTION.md`

---

## Colors (locked)

See `semantic` + `pastel` in tokens.js. `muted` = `#8B7355`.

## Borders

| Token | Value |
|-------|-------|
| `border-subtle` | `rgba(91, 62, 45, 0.12)` |
| `border-default` | `rgba(91, 62, 45, 0.20)` |
| `border-focus` | `rgba(247, 178, 74, 0.45)` |
| `border-strong` | `rgba(59, 36, 23, 0.25)` |

Tailwind: `border-border` maps to subtle. `border-border-strong` for dividers.

## Shadows

| Token | CSS |
|-------|-----|
| `shadow-warm-sm` | `0 2px 8px rgba(91, 62, 45, 0.06)` |
| `shadow-warm-md` | `0 4px 20px rgba(91, 62, 45, 0.08)` |
| `shadow-warm-lg` | `0 8px 32px rgba(91, 62, 45, 0.10)` |

Native: `shadows.warmSm/Md/Lg` in `src/components/ui/shadows.ts`.

## Typography

| Class | Size |
|-------|------|
| `text-display` | 40px |
| `text-h1` | 28px |
| `text-h2` | 22px |
| `text-h3` | 18px |
| `text-body` | 16px |
| `text-small` | 14px |
| `text-label` | 13px |

## Spacing

See `spacing` object in tokens.js — `pageX`, `sectionY`, `stack-*`, `sidebarWidth` (240), `sidebarCollapsed` (64).

## Breakpoints

| Token | px |
|-------|-----|
| `tablet` | 768 |
| `desktop` | 1024 |

## Motion (web)

Classes in `global.css`: `.woofi-hover-lift`, `.woofi-hover-lift-sm`. Duration 250ms ease-out. Respects `prefers-reduced-motion`.

## Deprecated

- `border: #000000` on components
- `shadows.soft/card/float` → aliases to warm variants
- Legacy colors: `legacyPrimary`, `legacyBackground`, `legacyText`
