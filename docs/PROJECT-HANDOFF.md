# WOOFI — Project Handoff

Use this document to onboard a new developer or AI assistant and continue work without re-discovering the codebase.

---

## What is WOOFI?

Mobile app (Expo / React Native) for:

- **Private pet profiles** (`pets` collection) — digital notebook per owner
- **Public cases** (`cases` collection) — lost, found, adoption, transit posts for the community

**Default language:** Spanish Argentina (`es-AR`).  
**Design:** Warm, pastel, neubrutalism-lite (`#F9A23B` primary).  
**Backend:** Firebase (`wuffi-d19e9`) — Auth + Firestore + Storage (client ready).

---

## Repository layout

```
WOOFI/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/             # login, register, forgot-password
│   ├── (tabs)/             # home, explore, add, alerts, profile
│   ├── pet/[id]/           # pet detail + edit
│   ├── case/[id]/          # case detail + sighting (placeholder)
│   ├── create/             # create index + personal/lost/found/adoption/transit
│   ├── explore/            # map (+ .native.tsx), filters
│   ├── favorites.tsx
│   └── settings/
├── src/
│   ├── components/ui/      # Design system (Button, Card, PetCard, etc.)
│   ├── hooks/              # useAuth, usePets, useCases, useFavorites
│   ├── services/           # Firebase + domain services
│   ├── stores/             # Zustand (auth, explore)
│   ├── i18n/               # locales + config (default es-AR)
│   ├── types/              # TypeScript domain types
│   └── schemas/            # Zod validation
├── firebase/               # firestore.rules, indexes, storage.rules
├── scripts/                # verify-firebase, check-env, audit-i18n
└── docs/                   # Architecture, setup, status, rules
```

---

## Critical rules (read before coding)

1. **i18n** — No hardcoded UI strings. Use `t('key')`. See `docs/DEVELOPMENT-RULES.md`.
2. **pets ≠ cases** — Never merge entities. A `Pet` can link to a `Case` via `petId`.
3. **Git author** — Commits must be `Giggi Argento <46300924+giggiargento@users.noreply.github.com>`. Repo has local git config; verify with `git config --local user.email`.
4. **UI** — Reuse `src/components/ui/*`. Match existing pastel + bordered style.
5. **No mock data** when `.env` Firebase vars are set.

---

## How to run (5 minutes)

```bash
npm install
cp .env.example .env          # fill EXPO_PUBLIC_FIREBASE_* from Firebase Console
npm run check:firebase
npm start                       # or: npx expo start --tunnel
```

Open **Expo Go** on phone → scan QR.  
Project uses **Expo Go**, not dev builds (`expo-dev-client` not installed).

---

## Architecture snapshot

### Navigation flow

```
App launch
  → AuthGate (_layout.tsx)
  → Not logged in → (auth)/login
  → Logged in → (tabs)/
       index      → Home (pets, quick actions)
       explore    → Public cases list + filters + map
       add        → Redirect to /create
       alerts     → Empty state (notifications not wired)
       profile    → User, favorites link, settings, logout
```

### Data flow

```
Screen → hook (React Query) → service → Firestore
                ↓
         Zustand (auth, explore filters)
```

### Key files

| Concern | File(s) |
|---------|---------|
| Firebase init | `src/services/firebase/app.ts`, `src/config/firebase.ts` |
| Auth | `src/hooks/useAuth.ts`, `src/services/firebase/auth.ts` |
| Pets | `src/services/pets/petService.ts`, `src/hooks/usePets.ts` |
| Cases | `src/services/cases/caseService.ts`, `src/hooks/useCases.ts` |
| i18n init | `src/i18n/index.ts`, `src/i18n/config.ts` |
| Tab bar | `src/components/ui/BottomNavigation.tsx`, `app/(tabs)/_layout.tsx` |
| Env validation | `scripts/check-firebase-env.mjs` |

---

## Firebase collections (implemented)

| Collection | Purpose |
|------------|---------|
| `users` | Profile after register (displayName, email, locale, location) |
| `pets` | Private pet profiles (ownerId) |
| `cases` | Public posts (lost/found/adoption/transit) |
| `favorites` | User saved cases |

**Planned but not implemented:** `sightings`, `notifications`, `qrProfiles`, `organizations`

---

## What works today

- Login / register / logout / password reset
- Create & list personal pets; view & edit pet detail
- Create public cases (all 4 types); explore with tabs, search, filters
- View case detail; contact via WhatsApp/call/share
- Save favorites; view favorites list
- Native map screen (needs Google Maps API key on Android)
- Web runs with map list fallback (`app/explore/map.tsx` + metro stub for maps on web)

---

## What does NOT work yet (do not assume)

| Feature | State |
|---------|--------|
| Report sighting | UI placeholder only |
| Push / in-app notifications | Alerts tab empty |
| QR profiles | Not started |
| Google/Apple login | Stub only |
| Language switcher | Settings shows locale, cannot change |
| Full photo upload on create flows | Edit pet has picker; create flows often send `photoUrls: []` |
| Organizations / refuges | Not started |

---

## Verification before PR

```bash
npm run typecheck
npm run audit:i18n
npm run check:firebase
npm run verify:firebase    # needs valid .env + Firebase Auth enabled
```

---

## Common tasks — where to edit

| Task | Start here |
|------|------------|
| New screen | `app/` + register in `_layout.tsx` if needed |
| New UI component | `src/components/ui/` + export from `src/components/index.ts` |
| New translation | `src/i18n/locales/es-AR.json` + `en-US.json` |
| New Firestore field | `src/types/` → `src/schemas/` → service → hook → screen |
| New tab | `app/(tabs)/_layout.tsx` + new file in `(tabs)/` |
| Firebase rules | `firebase/firestore.rules` → deploy |

---

## Environment variables

Required (in `.env`, gitignored):

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Optional:

- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`

See `.env.example` and `docs/FIREBASE-SETUP.md`.

---

## Recommended next work (in order)

1. Implement **report sighting** (`sightings` collection + form)
2. **Photo upload** on create pet/case screens
3. **Notifications** list on Alerts tab
4. **Settings** language switcher (`i18n.changeLanguage` + update user doc)
5. Deploy / verify **Firebase rules** on production project
6. **Google Maps** key for Android map in Expo Go

Full prioritized list: `docs/CURRENT-STATUS.md` → *Next Recommended Tasks*.

---

## Documentation index

| File | When to read |
|------|----------------|
| `docs/CURRENT-STATUS.md` | Current feature matrix, bugs, run instructions |
| `docs/WOOFI-ARCHITECTURE-ROADMAP.md` | Full product vision, Firestore schema, phases |
| `docs/FIREBASE-SETUP.md` | First-time Firebase setup |
| `docs/DEVELOPMENT-RULES.md` | i18n + git + coding constraints |

---

## Contacts & repo

- **GitHub:** https://github.com/giggiargento/woofi
- **Firebase project:** `wuffi-d19e9`
- **Expo slug:** `woofi`
- **Android package / iOS bundle:** `com.woofi.app`

When in doubt: read `docs/CURRENT-STATUS.md`, run `npm run verify`, and follow `docs/DEVELOPMENT-RULES.md`.
