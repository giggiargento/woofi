# WOOFI — Visual Direction (v1)

**Status:** Proposal — no screen redesign yet  
**Date:** July 2026  
**Inputs:** 4 pet-app UI references (structure only), competitive research, BRAND-GUIDELINES §3.2  
**Audience:** UX (implementation), Dev (layout shells), Brand (review)

---

## 1. What we extract from references (NOT what we copy)

The attached references share a **visual language**, not a brand:

| Principle | What references do | WOOFI application |
|-----------|-------------------|-------------------|
| **One focal point** | Hero pet photo or single CTA dominates | Every screen: 1 primary action + 1 hero element |
| **Generous whitespace** | Sections breathe; cards don’t touch edges | Desktop section padding 80–96px; card gutters 24px |
| **Rounded geometry** | Pills, 16–24px+ radius, organic photo masks | **Deprecate** `border-2 border-black` neubrutalism |
| **Light density** | 3–5 data points per card max | Progressive disclosure for medical/docs |
| **Friendly type** | Bold rounded headings + calm body | Inter 600/700 headlines; never cold gray-on-white only |
| **Photo-forward** | Pets are the emotional anchor | Registry + cases use photos; placeholders warm, not gray boxes |
| **Soft elevation** | Subtle shadow or pastel card fill | Warm shadow `rgba(91, 62, 45, 0.08)` — not hard offset |
| **Playful, not childish** | Rounded UI without cartoon overload | Wordmark is handmade; UI stays clean — no 3D mascots required |
| **Clear hierarchy** | Primary button = filled pill; secondary = ghost/outline | Max 2 button weights per view |
| **Category chips** | Horizontal species/filter pills | Reuse for explore + pet species — one `Chip` primitive |

**Do NOT import from references:** purple/green/yellow palettes, literal layouts, 3D characters, marketplace pricing patterns, “Adopt Now” flows we don’t have.

---

## 2. WOOFI personality

**Codename:** *Warm Community Organizer*

| Communicate | Avoid |
|-------------|-------|
| Trust | Clinical “vet dashboard” teal |
| Warmth | Cold SaaS gray (default shadcn) |
| Care | Gamification / streak guilt |
| Organization | Dense tables without rhythm |
| Community | Alarmist lost-pet emergency UX |

**Product truth:** WOOFI is a **pet registry + health notebook + community board** (lost, found, adoption, foster). Lost cases are **important** but framed as *neighbors helping*, not 911.

---

## 3. Locked brand colors (non-negotiable)

From `src/design/tokens.js` + BRAND-GUIDELINES — **only** these hues; references inform *shape*, not *hue*.

| Role | Token | Hex |
|------|-------|-----|
| Page ground | `background` | `#FFF6E5` |
| Cards / surfaces | `surface` | `#FFFDF9` |
| Brand cream | `cream` | `#fff2d0` |
| Primary CTA | `primary` | `#F7B24A` |
| CTA pressed/hover | `primary-accent` | `#D97B32` |
| Body text | `text` / `brown` | `#5B3E2D` |
| Headings / footer | `text-dark` | `#3B2417` |
| Accents | `pastel.*` | lavender, pink, sky, mint, butter, sand |

**Token changes in v1:** replace `border: #000000` with semantic `border-subtle` (brown at 12% opacity). Remove hard black outlines from default components.

---

## 4. Responsive philosophy — adapt, don’t stretch

WOOFI is **5 surfaces**, one design system:

```
Marketing (web)     → Top nav, full-bleed sections, CTA to auth
Auth (web)          → Centered card, same tokens as app
Desktop app ≥1024   → Sidebar + main canvas (design desktop FIRST)
Tablet 768–1023     → Collapsible sidebar OR top bar + 2-col grids
Mobile <768         → Bottom navigation (keep)
```

**Rule:** Designers and UX spec **desktop layout first**, then compress to tablet/mobile — never upscale mobile wireframes.

### Desktop app shell (≥1024px)

```
┌────────────┬──────────────────────────────────────────┐
│ Sidebar    │  Page header (title, search, actions)   │
│ 240px      ├──────────────────────────────────────────┤
│ Wordmark   │                                          │
│ Nav items  │  Content (max readable width per view)   │
│ · Inicio   │  · Dashboard: 2–3 column grids           │
│ · Explorar │  · Detail: master-detail panels          │
│ · Agregar  │  · Forms: centered column max-w-lg     │
│ · Alertas  │                                          │
│ · Perfil   │                                          │
│ ─────────  │                                          │
│ Favoritos  │                                          │
│ Ajustes    │                                          │
└────────────┴──────────────────────────────────────────┘
```

Inspired by **Notion / Linear / Discord** (structure), not their colors.

### Marketing (all web widths)

Top horizontal nav — see `WEB-MARKETING-HOME.md`. Footer `brown-dark`.

### Mobile

Floating or fixed **bottom tab bar** (5 items). No sidebar.

### Tablet

- Sidebar collapsed to icons (64px) **or** top bar + bottom nav — pick during implementation; default: icon sidebar.

---

## 5. Typography scale (desktop-first)

Font: **Inter** (already loaded). Friendly via **weight + spacing**, not a display font.

| Token | Desktop | Mobile | Use |
|-------|---------|--------|-----|
| `display` | 40px / 1.1 | 32px | Marketing hero, dashboard welcome |
| `h1` | 28px / 1.2 | 24px | Page titles |
| `h2` | 22px / 1.3 | 20px | Section headers |
| `h3` | 18px / 1.35 | 17px | Card titles |
| `body` | 16px / 1.6 | 16px | Default copy |
| `small` | 14px / 1.5 | 14px | Meta, captions |
| `label` | 13px / 1.4 semibold | 13px | Form labels, nav |

**Never** use pure `#000` or cold `#1F2937` (legacy) for body.

---

## 6. Spacing & grid

| Token | Value | Use |
|-------|-------|-----|
| `page-x` | 24px (mobile) → 32px (desktop) | Horizontal padding |
| `section-y` | 64px (mobile) → 96px (desktop) | Marketing sections |
| `stack-sm` | 8px | Tight groups |
| `stack-md` | 16px | Card internal |
| `stack-lg` | 24px | Between cards |
| `stack-xl` | 32px | Section sub-blocks |

**Grid:** 12 columns at ≥1024px; cards span 4 (3-up), 6 (2-up), or 12 (full). Gap 24px.

---

## 7. Component language (design system v2)

Replace current neubrutal-lite with **Soft Warm UI**:

### Button

| Variant | Style |
|---------|-------|
| Primary | Pill (`rounded-full`), `bg-primary`, `text-text-dark`, soft shadow, hover lift 2px |
| Secondary | Pill outline, `border-brown/20`, `bg-surface` |
| Ghost | Text only, hover `bg-sand/50` |
| Destructive | Rare; `primary-accent` not red unless delete confirm |

**Remove:** thick black border on buttons.

### Card

- Radius `rounded-2xl` (16px) or `rounded-3xl` (24px) for featured
- Background `surface` or pastel tint by type
- Shadow: `0 4px 20px rgba(91, 62, 45, 0.08)`
- Padding: 20–24px desktop, 16px mobile
- **Pet card / case card:** photo top 4:3, max 3 metadata lines

### Chip / Badge

- Pill shape, pastel backgrounds (already in tokens)
- Selected: slightly darker pastel + subtle ring `primary/30`

### Input

- Rounded-xl, `bg-surface`, border `brown/15`, focus ring `primary/40`
- No square corners

### Icons

- **Ionicons** — prefer `outline` 24px nav, 20px inline
- Optional: rounded icon container (circle `bg-sand`) like references — not mandatory per icon

### Navigation

| Surface | Pattern |
|---------|---------|
| Marketing | Top nav sticky |
| Desktop app | Sidebar + optional page header |
| Mobile app | Bottom tabs |
| Auth | Minimal — logo + form card |

### Motion (web)

- Duration 200–350ms, `ease-out`
- Hover: translateY(-2px) on cards/buttons
- No bounce; respect `prefers-reduced-motion`
- Lost-case states: gentle pulse on badge, not flashing red

### Imagery

- Photos: rounded-xl masks; optional soft `sand` blob behind (CSS only)
- Placeholders: paw icon on `sand` — not empty gray
- Illustration: wordmark + optional spot illustrations later — no mandatory mascot

---

## 8. Information architecture by domain

| Domain | Desktop pattern | Focal point |
|--------|-----------------|-------------|
| Pet registry | Grid of pet cards + “Agregar” | Your pets |
| Pet detail | Two-column: profile left, tabs (health, docs, QR) right | Pet photo + name |
| Medical / vaccines | Timeline list in panel | Next due date |
| Documents | File cards grid | Upload CTA |
| Explore cases | Filter bar + 3-col case cards | Map or list toggle |
| Case detail | Master-detail: map/info + contact actions | Case photo |
| Lost (from pet) | Wizard steps, one column centered | Clear publish CTA |
| Adoption / foster | Same case card language, mint/lavender pastels | Pet story |
| Community / alerts | Feed list, low density | Latest neighborhood activity |
| Settings | List rows in narrow column | Account |

---

## 9. What to retire from current UI

| Current | Action |
|---------|--------|
| `border-2 border-border` (#000) on cards/buttons | Remove default; optional accent only |
| `shadows.float` hard offset | Replace with soft warm shadow tokens |
| Legacy `#F9A23B`, `#FFF4EA` | Migrate all callers to semantic tokens |
| Duplicate `marketing/*` styling | Refactor to use `ui/*` primitives |
| Mobile-stretched desktop tabs | Replace with sidebar shell on web ≥1024 |
| Dense emoji headers (🐾) | BrandLogo + type hierarchy |

---

## 10. Implementation order (UX — after approval)

**Phase A — Tokens & primitives (no screens)**  
1. Update `tokens.js`: `border-subtle`, `shadow-warm`, radius scale, typography  
2. Refactor `Button`, `Card`, `Chip`, `Input`, `Badge`  
3. Add `AppSidebar`, `AppDesktopLayout`, `PageHeader` in `src/components/layout/`  
4. Deprecate neubrutal classes in `theme.ts`

**Phase B — Shells**  
5. Wire desktop sidebar in `app/(tabs)/_layout.tsx` (web only)  
6. Refactor `marketing/*` to consume updated primitives only

**Phase C — Screens (later, one at a time)**  
7. Home dashboard desktop  
8. Explore grid  
9. Pet detail master-detail  
… per `DESIGN-SYSTEM-AUDIT.md` priority

**Technical base:** [React Native Reusables](https://reactnativereusables.com) as starting skeleton — restyle with §3–§7 tokens; own the code.

---

## 11. Success criteria

- [ ] Marketing + app feel like **one product** (same buttons, cards, type)
- [ ] Desktop ≥1024 never shows bottom tab bar
- [ ] Mobile keeps bottom nav; no horizontal overflow
- [ ] No screen with more than one primary CTA
- [ ] Lost cases feel **serious but calm** (amber/brown, not red siren)
- [ ] `npm run typecheck` + `audit:i18n` pass after primitive refactor

---

## 12. References on file

User-provided pet UI references (July 2026) — **layout inspiration only**, stored in conversation/assets. Colors in refs (purple, sage, yellow) are explicitly rejected.

Related docs: `BRAND-GUIDELINES.md`, `WEB-MARKETING-HOME.md`, `DESIGN-SYSTEM-AUDIT.md`, `TOKENS-V2.md`.

---

## 13. Addendum (July 2026 — v2 implementation)

| Topic | Decision |
|-------|----------|
| Audit §2.4 neubrutalism | **Superseded** by Soft Warm UI — audit is pre-v2 baseline |
| `muted` token | Warm `#8B7355` replaces cold `#6B7280` |
| Auth web | `AuthCard` — max-w-md, surface, shadow-warm-md, 32px padding |
| Bottom nav mobile | Floating pill, shadow-warm-lg, no black borders |
| Product IA | Explicit panels: vaccines, medical history, documents, QR (Phase C screens) |
| Tablet default | Icon sidebar 64px (`768–1023px`) |
| Marketing | Compose from `ui/*` only — `FeatureCard`, `PricingCard`, `PageSection` |

