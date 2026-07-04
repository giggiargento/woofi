# WOOFI — Agent coordination

Three specialized agents (+ one coordination chat). **Do not overwrite each other's domain.**

Setup: `docs/agents/CHATS-SETUP.md`

## Roles

| Agent | Owns | Does NOT touch |
|-------|------|----------------|
| **Dev** | Firebase, services, hooks, screens logic, web responsiveness, map, data flows, MVP features | Visual redesign, colors, component styling (unless layout-only) |
| **UX/UI** | Design tokens, `src/components/ui/*`, Storybook/preview, visual polish | Firestore models, services, business logic |
| **Brand** | `assets/brand/`, brand guidelines, logo/favicon variants, color alignment docs | UI components, screen logic, Firebase |

## Before large changes

1. Explain the plan
2. List files you will touch
3. Avoid duplicate components
4. No unrelated refactors
5. Small, descriptive commits

## Shared rules

- No mock data when Firebase is configured
- No hardcoded user-facing strings — use i18n (`es-AR` default)
- Use existing architecture (`pets` ≠ `cases`)
- Run `npm run typecheck` and `npm run audit:i18n` after meaningful changes
- Git author: `Giggi Argento <46300924+giggiargento@users.noreply.github.com>`
- Commit only stable, working changes

## File ownership (first pass)

| Path | Primary agent |
|------|---------------|
| `app/` layouts, screen logic | Dev |
| `src/services/`, `src/hooks/`, `firebase/` | Dev |
| `src/components/ui/`, `theme.ts`, `tailwind.config.js` | UX/UI |
| `assets/brand/` | Brand |
| `docs/brand/` | Brand |
| `docs/design/` | UX/UI |
| `docs/agents/` | Human + all (read-only) |

## Handoff

- Brand delivers: official assets + `docs/brand/BRAND-GUIDELINES.md`
- UX delivers: tokens, component variants, layout specs in `docs/design/`
- Dev implements: functional screens using those components without redefining visuals
