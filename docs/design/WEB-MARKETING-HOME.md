# WOOFI — Web Marketing Home

**Status:** UX Phase 1 — components ready; Dev wires route  
**Audience:** Desktop web first (≥1024px); mobile web stacks gracefully  
**Tokens:** `src/design/tokens.js` — no legacy `#FFF4EA` / `#F9A23B`  
**Brand:** `docs/brand/BRAND-GUIDELINES.md` §2.1, §3.2, §6

---

## Route & handoff (Dev)

| Context | Behavior |
|---------|----------|
| Web, guest | Render `<MarketingHome />` at `/` |
| Web, authenticated | `Redirect` → `/(tabs)` |
| Native | Unchanged (auth gate → login) |

```tsx
// app/index.tsx — Dev implementation (not in UX Phase 1)
import { Platform } from 'react-native';
import { Redirect } from 'expo-router';
import { MarketingHome } from '@/components';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { isAuthenticated, isInitialized } = useAuth();
  // ... loading state ...
  if (Platform.OS === 'web') {
    if (isAuthenticated) return <Redirect href="/(tabs)" />;
    return <MarketingHome />;
  }
  // native: existing redirect logic
}
```

Do **not** change AuthGate for marketing until `app/index.tsx` is updated.

---

## Page structure

```
MarketingShell
├── HeroSection
├── ServicesSection        id="servicios"
├── AboutSection           id="nosotros"
├── PlanSection            id="plan"
├── CtaBannerSection
└── (footer inside Shell)
```

No trust strip in v1.

---

## Wireframe (desktop ≥1024px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Wordmark]     Servicios · Quiénes somos · Plan    [Login][Registro]│ sticky
├──────────────────────────────────────────────────────────────────┤
│  [Chip badge]                    ┌─────────────────────┐         │
│  H1 headline                     │   hero placeholder  │         │
│  subtitle                        │   (Card + icon)     │         │
│  [Empezá gratis] [Ver cómo...]   └─────────────────────┘         │
│  proof line                                                      │
├──────────────────────────────────────────────────────────────────┤
│              Servicios — grid 3×2 (FeatureCards)                 │
├──────────────────────────────────────────────────────────────────┤
│  [image Card]  │  Quiénes somos + bullets + [Conocé el plan]    │
├──────────────────────────────────────────────────────────────────┤
│              Plan — single PricingCard ($0)                      │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────── CTA banner (sand) ────────────────────────┐   │
│  │  Empezá con tu primera mascota · [Crear cuenta gratis]    │   │
│  └───────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER (brown-dark) — logo · columns · © 2026                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Visual rules

| Element | Token / class |
|---------|---------------|
| Page bg | `bg-background` `#FFF6E5` |
| Cards / nav | `bg-surface` `#FFFDF9`, `border-2 border-border` |
| Headings / body | `text-text` `#5B3E2D` |
| Footer bg | `bg-brown-dark` `#3B2417` |
| Footer text | `text-surface` / `text-cream` |
| Primary CTA | `Button` variant `primary` |
| Secondary CTA | `Button` variant `outline` or `ghost` |
| Section padding | 96px vertical desktop, 64px mobile (`MarketingSection`) |
| Content width | `max-w-6xl mx-auto px-6` (aligned with `WebShell`) |

Typography (Tailwind ad-hoc until `theme.typography`):

- Hero H1: `text-4xl lg:text-5xl font-bold`
- Section H2: `text-3xl font-bold text-center`
- Body: `text-base leading-6 text-muted`

Elevation: border-first; existing soft shadows optional on hero card only.

---

## Components map

| Marketing component | Built on |
|---------------------|----------|
| `MarketingShell` | `BrandLogo`, `Button`, footer layout |
| `MarketingSection` | layout wrapper + `nativeID` for anchors |
| `MarketingFeatureCard` | `Card`, `Chip`, Ionicons |
| `MarketingPlanCard` | `Card`, `Button`, Ionicons |
| `HeroSection` | above + `Chip` |
| `ServicesSection` | `SectionHeader`, 6× `MarketingFeatureCard` |
| `AboutSection` | `Card`, `Button` |
| `PlanSection` | `MarketingPlanCard` |
| `CtaBannerSection` | `Card`, `Button` |
| `MarketingHome` | composes all |

---

## i18n

All copy under `marketing.*` in `es-AR.json` and `en-US.json`.  
CTA routes: `/login`, `/register` via `expo-router` `Link`.

---

## Service grid (pastel mapping)

| Key | Pastel | Featured |
|-----|--------|----------|
| `cuaderno` | `sand` | yes |
| `explorar` | `sky` | |
| `publicar` | `lavender` | |
| `adopcion` | `mint` | |
| `favoritos` | `pink` | |
| `identificacion` | `butter` | + Chip “Próximamente” |

---

## Pricing copy (locked)

- Label: **Gratis para empezar**
- Price: **$0**
- Period: `/ siempre`
- Note: premium / orgs later

---

## Verification

```bash
npm run typecheck
npm run audit:i18n
```

Preview (after Dev wires route): open `/` on web while logged out.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-07 | Phase 1 — spec + MarketingShell + sections + i18n |
