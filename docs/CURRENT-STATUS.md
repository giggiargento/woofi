# WUFFI Current Status

**Last updated:** June 2026  
**Repository:** https://github.com/giggiargento/wuffi  
**Firebase project:** `wuffi-d19e9`  
**Runtime:** Expo Go (no development build configured)

---

## Project Overview

### Purpose of the application

**WUFFI** is a mobile app for pet owners and the community around them. It combines:

1. **Personal pet notebook** — Private digital profiles for the user's pets (health notes, photos, status).
2. **Public explorer** — Community posts for lost pets, found pets, adoptions, and temporary transit care.

The product goal is a **warm, friendly, premium pet app** — not a generic emergency tool.

### Main features implemented

| Area | Status |
|------|--------|
| Email/password auth (login, register, forgot password, logout) | ✅ |
| Auth gate + protected tabs | ✅ |
| Home with pets, quick actions, nearby cases, favorites count | ✅ |
| Explore with tabs, search, filters, list + map entry | ✅ |
| Pet CRUD (create, view, edit) | ✅ Basic |
| Public cases (create lost/found/adoption/transit, view detail) | ✅ Basic |
| Favorites (save cases) | ✅ |
| Profile + settings placeholder | ✅ |
| i18n (es-AR default, en-US secondary) | ✅ |
| Design system UI refactor | ✅ |
| Native map (Android/iOS via Expo Go) | ⚠️ Partial |
| Web export with map fallback | ✅ |

### Current stack

| Layer | Technology |
|-------|------------|
| Framework | Expo SDK 53, React Native 0.79, React 19 |
| Navigation | Expo Router (file-based) |
| Styling | NativeWind 4 + Tailwind CSS |
| State | Zustand (auth, explore filters) |
| Data fetching | TanStack React Query |
| Validation | Zod |
| Backend | Firebase JS SDK v11 (Auth, Firestore, Storage) |
| i18n | i18next + react-i18next |
| Maps | react-native-maps (native), list fallback on web |
| Fonts | Inter (@expo-google-fonts/inter) |

---

## Completed Features

### Authentication

- Email/password login and registration
- Password reset flow
- Auth gate redirects unauthenticated users to `(auth)/login`
- User profile document created in Firestore on register
- `FirebaseSetupBanner` when `.env` is missing

**Not done:** Google Sign-In (stub in `src/services/firebase/googleAuth.ts`), Apple Sign-In.

### Firestore integration

- Collections: `users`, `pets`, `cases`, `favorites`
- Service layer: `petService`, `caseService`, `userService`, `favoriteService`
- React Query hooks: `usePets`, `useCases`, `useFavorites`, `useAuth`
- Security rules and indexes in `firebase/` (deploy may still be required per environment)
- Verify script: `npm run verify:firebase`

### Navigation

- **Tabs:** Home, Explore, Add (redirects to `/create`), Alerts, Profile
- **Stack routes:** Pet detail/edit, case detail, create flows, favorites, settings, explore map/filters
- Custom floating bottom tab bar (`BottomNavigation` component)

### Localization

- Default locale: **es-AR** (not device-driven)
- Secondary: **en-US**
- Keys in `src/i18n/locales/es-AR.json` and `en-US.json`
- Province labels via `locations.provinces.*` + `src/i18n/provinces.ts`
- Audit script: `npm run audit:i18n`
- Rules documented in `docs/DEVELOPMENT-RULES.md`

### Current UI system

Located under `src/components/ui/`:

- `Button`, `Card`, `Badge`, `Chip`, `SearchBar`, `EmptyState`
- `PetCard`, `CaseCard`, `BottomNavigation`
- `QuickActionCard`, `InfoChip`, `ScreenHeader`, `SectionHeader`, `ListRow`, `IconButton`, `LoadingSpinner`
- Theme tokens: `theme.ts`, `shadows.ts`
- Primary color `#F9A23B`, pastel accents, neubrutalism-lite borders

Screens refactored to use the design system (tabs, auth, detail, create index, favorites, settings, filters).

### Other completed modules

- **Explore store** — Active tab, search query, filters (province, city, neighborhood, species)
- **Location utils** — `getCurrentLocation`, default CABA coordinates
- **Schemas** — Zod for auth, pets, cases
- **Scripts** — `check-firebase-env.mjs`, `verify-firebase.mjs`, `audit-i18n.mjs`
- **Documentation** — Architecture roadmap, Firebase setup, development rules

---

## Pending Features

### Maps

- [ ] Google Maps API key required for full Android map tiles (`EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`)
- [ ] Map markers UX polish (clustering, selected case card overlay)
- [ ] Geofire-based nearby queries (dependency present, not fully wired in UI)
- [ ] Web map is list-only fallback — by design until native or map web strategy is chosen

### Pet registration

- [ ] Multi-step wizard (currently single step)
- [ ] Vaccination records / structured health timeline
- [ ] Vet contact fields
- [ ] QR profile generation from pet

### Cases

- [ ] **Report sighting** — Screen exists as empty state placeholder only (`app/case/[id]/sighting.tsx`)
- [ ] Case status updates (sighted → found → closed) from UI
- [ ] Reward field on lost cases
- [ ] Rich photo galleries on create flows (photos often empty arrays today)
- [ ] Province picker limited to slice of provinces in some create screens (6–8 chips)

### Adoption flows

- [ ] Full multi-step adoption wizard
- [ ] Organization/refuge publisher type
- [ ] Requirements and health detail fields per architecture spec

### QR system

- [ ] `QRProfile` entity and Firestore collection — not implemented
- [ ] QR generation, scan, emergency contact page

### Notifications

- [ ] Alerts tab is empty state only — no Firestore `notifications` integration
- [ ] Push notifications (FCM) — not configured
- [ ] In-app notification list and read/unread state

### Storage integration

- [ ] Photo upload service exists (`storage.ts`, `uploadFile`) and edit pet has picker — needs end-to-end testing and UI on create flows
- [ ] Storage rules deploy verification
- [ ] Image compression and progress UI

### Other remaining work

- [ ] Google / Apple social login
- [ ] Language switcher in settings (locale field exists on user, no UI to change)
- [ ] Edit user profile (display name, location)
- [ ] Organizations / refuges module
- [ ] EAS Build / development builds (optional, for production)
- [ ] Tests (unit / E2E) — none yet
- [ ] `docs/node_modules` should not live in repo long-term (local PDF tooling)

---

## Firebase Setup

### Services configured

| Service | Client SDK | Rules/Config in repo |
|---------|------------|----------------------|
| Authentication | ✅ Email/password | Firebase Console |
| Cloud Firestore | ✅ | `firebase/firestore.rules`, `firebase/firestore.indexes.json` |
| Cloud Storage | ✅ Client ready | `firebase/storage.rules` |
| Project ID | `wuffi-d19e9` | `.firebaserc` |

### Services pending

| Service | Notes |
|---------|--------|
| Firebase Cloud Messaging | Push notifications |
| Firebase App Check | Recommended before production |
| Rules/index deploy | Run `firebase deploy` per `docs/FIREBASE-SETUP.md` if not done on target project |
| Google Maps API | Optional env var for native maps |

### Required environment variables

Copy `.env.example` → `.env` (never commit `.env`):

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

# Optional
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=
```

Validate:

```bash
npm run check:firebase
npm run verify:firebase
```

Full setup guide: `docs/FIREBASE-SETUP.md`

---

## Known Issues

### Current bugs

- Port **8081** often in use if multiple Expo instances run — use `npx expo start --port 8086` or stop old processes
- Tunnel mode (`--tunnel`) can be slow; prefer LAN when phone and PC share Wi‑Fi
- Contributors list on GitHub may lag after author rewrite (commits now attributed to `giggiargento`)

### UI limitations

- No dark mode
- Tablet layouts not optimized (portrait mobile-first only)
- Some create flows (adoption, transit) lack province picker UI (uses default CABA)
- Profile "my cases" empty state is minimal text, not full `EmptyState` component

### Responsive issues

- Web layout works but bottom tab bar spacing assumes mobile safe areas
- `InfoChipGrid` uses fixed ~47% width — may need flex tweaks on very small screens
- Horizontal quick-action scroll has no snap points

### Technical debt

- `PrimaryButton` alias kept for backward compatibility — migrate imports to `Button`
- `StatusBadge` alias → prefer `Badge`
- Global git config on some machines may still point to wrong author — repo has local override
- `newArchEnabled: true` in `app.config.ts` — watch for Expo Go compatibility on older devices
- Service-layer errors are English strings (not user-facing i18n — acceptable per rules)
- No `eas.json` — production builds not configured

---

## Development Rules

Summary — full detail in `docs/DEVELOPMENT-RULES.md`.

### i18n requirements

- No hardcoded user-facing strings in components
- All UI text via `t('namespace.key')`
- Default locale: **es-AR**
- Add keys to both `es-AR.json` and `en-US.json`
- Run `npm run audit:i18n` before PRs

### UI requirements

- Use components from `src/components/ui/`
- Primary `#F9A23B`, pastel accents, 2px black borders, rounded corners, soft shadows
- Cute, cozy, pet-focused — avoid generic enterprise UI
- Empty states must use `EmptyState` component

### Architecture requirements

- **`pets` ≠ `cases`** — separate entities; a pet can spawn multiple cases over time
- No mock data when Firebase is configured
- Business logic in `src/services/`, hooks in `src/hooks/`, types in `src/types/`, Zod in `src/schemas/`
- Git commits only as **Giggi Argento** / `giggiargento` noreply email

---

## Run Instructions

### Prerequisites

- Node.js 18+
- npm
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on physical device (Android/iOS)
- `.env` with Firebase variables

### Install

```bash
cd WUFFI
npm install
cp .env.example .env   # then fill values
npm run check:firebase
```

### Start dev server

```bash
npm start
```

If port 8081 is busy:

```bash
npx expo start --port 8086
```

If phone cannot reach PC on LAN:

```bash
npx expo start --tunnel
```

### Expo Go on physical Android

1. Install **Expo Go** from Play Store
2. Connect phone and PC to the **same Wi‑Fi**
3. Run `npm start` (or `--tunnel`)
4. Open Expo Go → **Scan QR code**
5. Grant location/photo permissions when prompted

### Other commands

```bash
npm run web          # Browser (map = list fallback)
npm run typecheck    # TypeScript
npm run audit:i18n   # Hardcoded string check
npm run verify       # typecheck + firebase + i18n + live auth test
```

---

## Next Recommended Tasks

Prioritized for upcoming sessions:

1. **Deploy Firebase rules** — Confirm `firestore.rules`, indexes, and `storage.rules` on `wuffi-d19e9`
2. **Photo upload E2E** — Wire create pet/case flows to Storage; show uploaded images in cards
3. **Report sighting flow** — Implement `app/case/[id]/sighting.tsx` with Firestore `sightings` collection
4. **Google Maps API key** — Enable maps on Android device in Expo Go
5. **Notifications MVP** — Read `notifications` collection; populate Alerts tab
6. **Settings language switcher** — Persist `userProfile.locale` and call i18n `changeLanguage`
7. **Case status updates** — Owner actions: mark sighted/found/closed
8. **Province picker component** — Reusable full province list for all create/filter screens
9. **EAS / production build** — When moving beyond Expo Go constraints
10. **Tests** — At minimum smoke tests for auth and pet create hooks

---

## Related documentation

| Document | Purpose |
|----------|---------|
| `docs/PROJECT-HANDOFF.md` | Quick onboarding for new developers / AI |
| `docs/WUFFI-ARCHITECTURE-ROADMAP.md` | Full product & Firestore design |
| `docs/FIREBASE-SETUP.md` | Firebase Console + CLI setup |
| `docs/DEVELOPMENT-RULES.md` | i18n, git author, coding rules |
