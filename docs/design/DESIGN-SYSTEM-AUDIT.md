# WOOFI Design System Audit

**Date:** July 2026  
**Scope:** `src/components/ui/*`, `src/constants/index.ts`, `tailwind.config.js`, `theme.ts`, `shadows.ts`, screen usage in `app/` (read-only review).  
**Author:** UX/UI Design System Agent  
**Status:** Baseline audit — no code changes in this pass.

---

## Executive summary

WOOFI has a **usable but fragmented** design system: 21 UI primitives cover most MVP flows, but tokens are split across three color sources (legacy `#F9A23B` palette, new `BRAND_COLORS`, and UX-agent target palette). Elevation uses **soft blur shadows** while the brand direction calls for **hard offset / neubrutalism-lite**. Six components duplicate the same `PastelColor → bg-*` map; two deprecated aliases (`PrimaryButton`, `StatusBadge`) remain exported. The `Screen` shell exists but is unused; `FormField` and skeleton states are missing.

**Recommended next UX task:** Phase 1 token consolidation — single source of truth in `theme.ts` + `tailwind.config.js`, wire `BRAND_COLORS` into semantic tokens, then add an in-app **Design Preview** route before touching production screens.

---

## 1. Component inventory

### 1.1 Core primitives (`src/components/ui/`)

| Component | File | Variants / notes | Used in app |
|-----------|------|------------------|-------------|
| **Button** | `Button.tsx` | `primary` \| `secondary` \| `outline` \| `ghost` \| `destructive`; sizes `sm` \| `md` \| `lg` | Auth, profile, case detail, filters |
| **PrimaryButton** | `Button.tsx` | **Alias → `Button`** (`@deprecated`) | 6 create/edit screens |
| **Card** | `Card.tsx` | `default` \| `floating` \| `pastel` \| `flat`; optional `pastel` prop | Settings, create index, case detail |
| **Badge** | `Badge.tsx` | Case status pill; colors by `caseType` | CaseCard, case detail |
| **StatusBadge** | `Badge.tsx` | **Alias → `Badge`** (`@deprecated`); **no screen imports** | — |
| **Chip** | `Chip.tsx` | Selectable filter; `PastelColor` | Explore tabs, filters |
| **ChipRow** | `Chip.tsx` | Horizontal scroll or wrap | Explore, filters |
| **Input** | `Input.tsx` | Label, error state | Auth, create, edit, filters |
| **SearchBar** | `SearchBar.tsx` | Rounded search with icon chip | Explore |
| **EmptyState** | `EmptyState.tsx` | Icon circle + title + optional CTA | Home, explore, alerts, favorites, sighting |
| **LoadingSpinner** | `LoadingSpinner.tsx` | `ActivityIndicator` wrapper | Home, explore, detail, profile |
| **IconButton** | `IconButton.tsx` | `default` \| `primary` \| `ghost` | Explore, case detail |
| **SectionHeader** | `SectionHeader.tsx` | Title + optional text action | Home, profile, case detail |
| **ScreenHeader** | `ScreenHeader.tsx` | Greeting, location, avatar initial, notification | Home only |
| **Screen** | `Screen.tsx` | SafeArea + ScrollView shell with `theme.spacing` | **Not used** |
| **BottomNavigation** | `BottomNavigation.tsx` | Custom floating tab bar | Tabs layout |
| **ListRow** | `ListRow.tsx` | Settings-style row with icon | Profile |
| **ConfirmDialog** | `ConfirmDialog.tsx` | Modal + Card + Buttons | Pet edit (delete) |
| **InlineError** | `ConfirmDialog.tsx` | Pink bordered error banner | Pet edit |

### 1.2 Domain / composite components

| Component | File | Role |
|-----------|------|------|
| **PetCard** | `PetCard.tsx` | Pet list card with photo, species badge, inline status pill |
| **CaseCard** | `CaseCard.tsx` | Horizontal case card with Badge, favorite heart |
| **QuickActionCard** | `QuickActionCard.tsx` | Featured (full-width) or compact (108px) home actions |
| **InfoChip** | `InfoChip.tsx` | Label + value stat tile (~47% width) |
| **InfoChipGrid** | `InfoChip.tsx` | Flex wrap container for InfoChips |
| **SpeciesSelector** | `SpeciesSelector.tsx` | Dog/cat picker with label (includes form label — not headless) |
| **SpeciesBadge** | `SpeciesSelector.tsx` | Small species pill (cream bg) |
| **PetAgeInput** | `PetAgeInput.tsx` | Two-column years/months using `Input` |

### 1.3 Supporting modules

| Module | File | Contents |
|--------|------|----------|
| **theme** | `theme.ts` | Re-exports `COLORS` + `radius`, `spacing`, `pastelBg` map |
| **shadows** | `shadows.ts` | `soft` \| `card` \| `float` — iOS blur / Android elevation |

### 1.4 Outside `ui/` but design-relevant

| Component | Path | Notes |
|-----------|------|-------|
| **FirebaseSetupBanner** | `src/components/FirebaseSetupBanner.tsx` | Dev-only banner; not part of design system exports |

### 1.5 Mentioned in roadmap / UX agent but **not implemented**

| Planned | Status |
|---------|--------|
| `FormField` | Missing — forms use `Input` + ad-hoc labels (`SpeciesSelector`, `PetAgeInput`) |
| Skeleton / shimmer loading | Missing — only `LoadingSpinner` |
| `BottomSheet` | Missing |
| `MapMarker` | Inline in map screen, not a shared component |
| `PhotoGallery` | Missing — detail screens show single image |
| `Modal` (generic) | Only `ConfirmDialog` |

---

## 2. Inconsistencies

### 2.1 Token sprawl (three color authorities)

| Source | Primary / accent | Background / cream | Brown text |
|--------|------------------|--------------------|------------|
| **`COLORS` + Tailwind** (runtime) | `#F9A23B` | `#FFF4EA` / cream `#FFF9F3` | text `#1F2937` (gray, not brown) |
| **`BRAND_COLORS`** (`constants`) | `#ffb850` | `#fff2d0` | `#5e4432` |
| **UX agent target** | `#F7B24A` / `#D97B32` | `#FFF6E5` / surface `#FFFDF9` | `#5B3E2D` / dark `#3B2417` |
| **Brand README (logo)** | `#ffb850` | `#fff2d0` | `#5e4432` |

Docs still reference legacy primary (`CLAUDE.md`, `PROJECT-HANDOFF.md`, `WOOFI-ARCHITECTURE-ROADMAP.md` §8.1).

### 2.2 Duplicated `PastelColor` class maps

The same `Record<PastelColor, string>` appears in **six places**:

- `Card.tsx` (`pastelClass`)
- `Chip.tsx` (`colorMap`)
- `EmptyState.tsx` (`accentBg`)
- `QuickActionCard.tsx` (`colorClass`)
- `InfoChip.tsx` (`colorClass`)
- `SpeciesSelector.tsx` (`pastelClass`)

**Plus** a partial duplicate in `app/create/index.tsx` (4 colors only, screen-local).

`theme.ts` already exports `pastelBg` but components do not use it for NativeWind classes.

### 2.3 Hardcoded colors in components

Repeated literals instead of tokens:

| Hex | Occurrences | Should be |
|-----|-------------|-----------|
| `#1F2937` | Button spinner, icons (15+ files) | `text` / `COLORS.text` |
| `#6B7280` | SearchBar, CaseCard, SectionHeader icons | `muted` |
| `#F9A23B` | `ListRow` default `iconColor`, `CaseCard` heart | `primary` (until migration) |
| `#FFF4EA` | Stack `headerStyle` in 6+ screens | `background` |

### 2.4 Elevation style mismatch

- **Current:** `shadows.ts` uses blurred iOS shadows (`shadowRadius` 12–20) and Android `elevation`.
- **Target (UX-AGENT.md):** solid offset, hard shadow, thick bottom border — neubrutalism-lite.
- Cards already have `border-2 border-border`; shadows add a second visual language.

### 2.5 Badge / chip family overlap

| Element | Component | Visual |
|---------|-----------|--------|
| Case status | `Badge` | Pastel by case type, dot indicator |
| Pet status | Inline `View` in `PetCard` | White card pill, no shared component |
| Species | `SpeciesBadge` | Cream pill, icon + label |
| Filters | `Chip` | Pastel when selected |
| Stats | `InfoChip` | Larger tile, label + value |

Same border radius (`rounded-full` vs `rounded-2xl`) and padding differ across family; no shared `Pill` or size tokens.

### 2.6 Screen layout patterns

| Pattern | Screens using it |
|---------|------------------|
| `SafeAreaView` + `ScrollView` + manual `px-4` / `pb-32` | Home, explore, profile, auth, create |
| `Screen` component | **None** |
| Expo `Stack.Screen` header with hardcoded `#FFF4EA` | create, settings, pet/case detail, map |

`Screen.tsx` line 22 uses dynamic Tailwind class `` `pb-[${theme.spacing.screenBottom}px]` `` — **will not work** with NativeWind (classes must be static at build time). Dead code path.

### 2.7 Auth / brand

- Login/register use emoji 🐾 in a primary circle — **not** `assets/brand/logo-wordmark.svg`.
- Web favicon points to brand SVG; native splash still uses `assets/splash-icon.png` with `#FFF4EA`.

### 2.8 Button API confusion

- `PrimaryButton` is identical to `Button` but create flows import the deprecated name.
- `edit.tsx` imports **both** `PrimaryButton` and `Button`; uses `PrimaryButton` with `variant="secondary"` — naming implies primary styling.

### 2.9 Missing loading UX

- List screens swap entire content for `LoadingSpinner` — no skeleton cards.
- No error boundary UI component beyond `EmptyState` + `InlineError`.

### 2.10 Responsive / web

- `InfoChip` fixed `w-[47%]` — fragile on narrow viewports.
- `QuickActionCard` fixed `w-[108px]`.
- No max-width container for web/tablet (per UX agent responsive rules).

---

## 3. Token gap analysis

### 3.1 Current vs target mapping

| Semantic token | Current (app) | Brand README | UX agent target | Gap |
|----------------|---------------|--------------|-----------------|-----|
| `primary` | `#F9A23B` | — | `#F7B24A` (brand orange) | Hue/saturation shift; rename to `brand.orange`? |
| `primary.dark` | `#E88B1A` (theme only) | — | `#D97B32` (accent orange) | Not in Tailwind |
| `brown` / text brand | — (uses gray `#1F2937`) | `#5e4432` | `#5B3E2D` | **Major:** no brown typography token |
| `brown.dark` | — | — | `#3B2417` | Missing |
| `background` | `#FFF4EA` | — | `#FFF6E5` (cream bg) | Close but not aligned |
| `cream` | `#FFF9F3` (COLORS) / `#fff2d0` (BRAND) | `#fff2d0` | — | **Two creams** in constants |
| `surface` | `#FFFFFF` (`card`) | — | `#FFFDF9` (light surface) | Missing semantic |
| Pastel accents | lavender, pink, sky, mint | — | + sand/beige | `butter` exists; no `sand` |

### 3.2 Typography tokens

| Token | Current | Gap |
|-------|---------|-----|
| Font families | Inter 400/600/700 in Tailwind | No size scale in `theme.ts` |
| Headings | Ad-hoc `text-2xl` / `text-3xl` in screens | No `typography.h1`–`h4` |
| Line height | Some `leading-6` | Inconsistent |

### 3.3 Spacing & radius

| Token | `theme.ts` | Tailwind usage | Gap |
|-------|------------|----------------|-----|
| `screenX` | 16 | `px-4` hardcoded | Not referenced from theme in screens |
| `screenBottom` | 112 | `pb-32` (128) hardcoded | Mismatch 112 vs 128 |
| `radius.sm`–`xl` | 12–24 | `rounded-2xl` / `rounded-3xl` | Partial alignment |
| Border width | — | `border-2` everywhere | No `borderWidth` token |

### 3.4 Case type colors

`CASE_TYPE_COLORS` in constants maps types to pastels; `Badge` uses Tailwind classes (`bg-primary`, `bg-sky`, etc.). `CaseCard` placeholder uses inline `style={{ backgroundColor }}` — dual implementation.

---

## 4. Duplicate / alias components

| Name | Canonical | Status | Action |
|------|-----------|--------|--------|
| `PrimaryButton` | `Button` | `@deprecated` in `Button.tsx`; **7 import sites** | Dev migration when UX approves; remove export after |
| `StatusBadge` | `Badge` | `@deprecated`; **zero imports** | Safe to remove from barrel in cleanup pass |
| `InfoChip` vs `Chip` | Different layouts | Overlapping “tag” metaphor | Keep both; document when to use each |
| `SpeciesBadge` vs `Badge` | Different data | Similar pill chrome | Extract shared `Pill` styles later |
| `ScreenHeader` vs profile hero | Different layouts | Profile builds custom avatar block | Consider `ProfileHeader` variant or extend `ScreenHeader` |
| `pastelClass` in `create/index.tsx` | `theme.pastelBg` / shared util | Screen duplicate | Dev removes when tokens centralized |

---

## 5. Recommended token migration plan

### Phase 0 — Document & freeze (this audit) ✅

- Single audit doc; no production screen changes.

### Phase 1 — Consolidate source of truth (next UX run)

**Files:** `src/constants/index.ts`, `src/components/ui/theme.ts`, `tailwind.config.js`  
**Do not touch:** `app/*` yet.

1. Define semantic token object in `theme.ts`:

   ```ts
   brand: { orange, orangeAccent, brown, brownDark, cream, creamBg, surface }
   semantic: { primary, background, text, textMuted, border, ... }
   pastel: { lavender, pink, sky, mint, butter, sand }
   ```

2. Map `BRAND_COLORS` → semantic tokens (brand README is source for logo colors).
3. Map UX agent targets as **aliases** where they match brand (brown `#5e4432` ≈ `#5B3E2D` — pick one, document delta).
4. Deprecate `COLORS.primary` `#F9A23B`; add `legacyPrimary` comment for gradual migration.
5. Generate Tailwind `theme.extend.colors` from same object (script or shared JSON).
6. Export `pastelClassNames` helper used by all components (one map).

### Phase 2 — Component token adoption

**Files:** `src/components/ui/*` only.

1. Replace hardcoded hex with `theme.colors.*` or Tailwind semantic names.
2. Introduce `elevation` tokens: `offsetSm`, `offsetMd` (replace or complement `shadows.ts`).
3. Add `FormField` wrapper (label + hint + error + children).
4. Add `Skeleton` / `PetCardSkeleton` / `CaseCardSkeleton`.
5. Fix or remove broken `Screen` dynamic class; adopt static `pb-28` or style prop from theme.

### Phase 3 — Visual migration (screen pass)

1. Swap backgrounds to new cream (`#FFF6E5` or brand `#fff2d0` — **decide one**).
2. Introduce brown headings where appropriate (wordmark alignment).
3. Replace auth emoji with `logo-wordmark` (SVG via `react-native-svg` or raster export).
4. Update splash/icon assets to match brand favicon.
5. Migrate `PrimaryButton` imports → `Button` (Dev agent, coordinated).

### Phase 4 — Docs sync

Update `CLAUDE.md`, `PROJECT-HANDOFF.md`, `WOOFI-ARCHITECTURE-ROADMAP.md` §8.1 to reference `docs/design/` tokens.

---

## 6. Component cleanup plan (prioritized)

| Priority | Task | Effort | Owner |
|----------|------|--------|-------|
| **P0** | Unify color tokens in `theme.ts` + Tailwind | M | UX |
| **P0** | Single `pastelClassNames` export; remove duplicates | S | UX |
| **P0** | In-app Design Preview screen | M | UX |
| **P1** | Replace hardcoded hex in `ui/*` | M | UX |
| **P1** | Elevation: hard-offset shadow variant | M | UX |
| **P1** | Fix `Screen` shell or delete | S | UX |
| **P1** | Add `FormField`, `Skeleton` primitives | M | UX |
| **P2** | Remove `StatusBadge` export | S | UX |
| **P2** | Migrate `PrimaryButton` imports (7 files) | S | Dev |
| **P2** | Extract `Pill` base for Badge / SpeciesBadge / pet status | M | UX |
| **P2** | Move `FirebaseSetupBanner` styling to tokens | S | UX |
| **P3** | `PhotoGallery`, `MapMarker`, `BottomSheet` | L | UX + Dev |
| **P3** | Web max-width layout wrapper | M | UX |

---

## 7. Storybook vs in-app preview

### Context

- **Expo Go** runtime; no Storybook dependency today.
- No `eas.json` / dev client — Storybook for RN typically needs extra native setup.
- Team has two agents; preview must work on device without blocking Dev.

### Recommendation: **in-app preview first**, Storybook later

| Approach | Pros | Cons |
|----------|------|------|
| **In-app route** (`app/design-preview.tsx` or dev-only tab) | Works in Expo Go; real RN primitives; fast iteration; no new deps | Not isolated from app bundle; need dev gate |
| **Storybook** | Isolated stories; web-friendly | Heavy setup for Expo 53; poor Expo Go story; maintenance cost |

### Proposed in-app preview (Phase 1 deliverable)

- Route hidden behind `__DEV__` or long-press on profile avatar.
- Sections: Colors, Typography, Buttons (all variants), Chips, Badges, Cards, Inputs, EmptyState, Loading/Skeleton.
- All labels via i18n keys under `designPreview.*`.
- Dev agent does **not** need to open it in production builds (strip with babel or env).

### When to add Storybook

- After EAS dev builds or dedicated web design workflow.
- Useful for documenting component APIs for external contributors.

---

## 8. Screens needing visual pass

Prioritized by user visibility and drift from target brand.

### P0 — High traffic / first impression

| Screen | Path | Issues |
|--------|------|--------|
| Login | `app/(auth)/login.tsx` | Emoji hero, legacy primary, no wordmark |
| Register | `app/(auth)/register.tsx` | Same as login |
| Home | `app/(tabs)/index.tsx` | Good DS usage; colors still legacy; horizontal scroll polish |
| Explore | `app/(tabs)/explore.tsx` | Custom title row (not `ScreenHeader`); otherwise solid |

### P1 — Core flows

| Screen | Path | Issues |
|--------|------|--------|
| Create hub | `app/create/index.tsx` | Local `pastelClass` duplicate; hardcoded header bg |
| Create steps (×5) | `app/create/*/[step].tsx` | `PrimaryButton`; sparse layout; no photo UI |
| Pet detail | `app/pet/[id].tsx` | Inline hero; hardcoded header |
| Pet edit | `app/pet/[id]/edit.tsx` | Long form; mixed Button/PrimaryButton |
| Case detail | `app/case/[id].tsx` | Inline layout; contact buttons styling |
| Profile | `app/(tabs)/profile.tsx` | Custom header vs `ScreenHeader`; minimal empty states |

### P2 — Secondary

| Screen | Path | Issues |
|--------|------|--------|
| Favorites | `app/favorites.tsx` | List only; standard cards |
| Filters | `app/explore/filters.tsx` | Chip province subset |
| Settings | `app/settings/index.tsx` | Minimal cards; no list row pattern |
| Map (native) | `app/explore/map.native.tsx` | Markers not DS components |
| Map (web) | `app/explore/map.tsx` | List fallback styling |
| Forgot password | `app/(auth)/forgot-password.tsx` | Auth pattern consistency |

### P3 — Placeholders / post-MVP

| Screen | Path | Issues |
|--------|------|--------|
| Alerts | `app/(tabs)/alerts.tsx` | EmptyState only — OK for now |
| Sighting | `app/case/[id]/sighting.tsx` | Placeholder |
| App loader | `app/index.tsx` | Hardcoded `#F9A23B` spinner |

### Cross-cutting (all screens)

- Replace `#FFF4EA` header backgrounds with token.
- Adopt `Screen` shell once fixed (consistent bottom padding for tab bar).
- Brown typography on key headings post token migration.

---

## 9. Suggested next UX task (single sprint)

**Task:** Phase 1 — Token consolidation + Design Preview screen

**Deliverables:**

1. Semantic tokens in `theme.ts` aligned to `BRAND_COLORS` + UX agent browns/creams.
2. Tailwind config synced from same source.
3. `pastelClassNames` helper; refactor 6 UI components to use it.
4. `app/design-preview.tsx` (dev-only) showcasing all primitives.
5. i18n keys `designPreview.*` in `es-AR` + `en-US`.

**Out of scope for that sprint:** production screen recolors, Storybook, splash/icon asset regeneration.

**Verification:** `npm run typecheck`, `npm run audit:i18n`.

---

## Appendix A — File reference

```
src/components/ui/
├── Badge.tsx          (+ StatusBadge alias)
├── BottomNavigation.tsx
├── Button.tsx         (+ PrimaryButton alias)
├── Card.tsx
├── CaseCard.tsx
├── Chip.tsx
├── ConfirmDialog.tsx  (+ InlineError)
├── EmptyState.tsx
├── IconButton.tsx
├── InfoChip.tsx
├── Input.tsx
├── ListRow.tsx
├── LoadingSpinner.tsx
├── PetAgeInput.tsx
├── PetCard.tsx
├── QuickActionCard.tsx
├── Screen.tsx         (unused)
├── ScreenHeader.tsx
├── SearchBar.tsx
├── SectionHeader.tsx
├── SpeciesSelector.tsx (+ SpeciesBadge)
├── shadows.ts
└── theme.ts
```

## Appendix B — Deprecated aliases (remove timeline)

| Alias | Replace with | Blocker |
|-------|--------------|---------|
| `PrimaryButton` | `Button` | 7 app imports |
| `StatusBadge` | `Badge` | None — remove when convenient |

---

*Next review: after Phase 1 token work or before any brand-wide screen recolor.*
