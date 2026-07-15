# WOOFI — Guía para Claude Code

Este archivo es el punto de entrada para retomar el proyecto **sin perder contexto**. Léelo completo antes de tocar código.

---

## Qué es WOOFI

Producto **web-first + móvil** (Expo / React Native) para:

1. **Cuaderno digital privado** — perfiles de mascotas del usuario (`pets`: salud, docs, QR futuro)
2. **Explorador / comunidad** — casos públicos lost / found / adoption / transit (`cases`)
3. **Marketing SaaS** — landing pública en web (`MarketingHome`) con CTA a login/registro

- **Idioma default:** Español Argentina (`es-AR`)
- **Estilo UI (dirección):** *Warm Community Organizer* — crema/naranja/marrón, soft-warm, **no** neubrutalism-lite
  - Tokens: `src/design/tokens.js` — primary `#F7B24A`, background `#FFF6E5`
  - Spec: `docs/design/VISUAL-DIRECTION.md`, `docs/design/TOKENS-V2.md`
- **Backend:** Firebase (`wuffi-d19e9`) — Auth + Firestore + Storage (Storage requiere plan Blaze)
- **Runtime actual:** Expo Go / `npm run web` (sin `eas.json`)
- **Repo:** https://github.com/giggiargento/woofi
- **Branch:** `master`

**Último checkpoint (julio 2026):** marketing home en `/` web, BrandLogo, WebShell, link pet→caso perdido, **tokens v2 + shells desktop WIP**. Grilla desktop / proportions **aún no cierran** — próxima prioridad UI.

---

## Arranque rápido (5 minutos)

```bash
npm install
cp .env.example .env   # completar EXPO_PUBLIC_FIREBASE_* (nunca commitear .env)
npm run check:firebase
npm start              # o: npm run web
```

Verificar:

```bash
npm run typecheck
npm run audit:i18n
npm run check:firebase
```

Web: http://localhost:8081 — **guest** ve marketing; **logueado** va a tabs.

---

## Documentación del repo

| Archivo | Cuándo leerlo |
|---------|---------------|
| `docs/CURRENT-STATUS.md` | Estado / bugs / pendientes |
| `docs/design/VISUAL-DIRECTION.md` | **Dirección visual v1** — obligatorio antes de UI |
| `docs/design/TOKENS-V2.md` | Tokens soft-warm |
| `docs/design/WEB-MARKETING-HOME.md` | Landing marketing + handoff |
| `docs/agents/COORDINATION.md` | Roles Dev / UX / Brand |
| `docs/agents/ACTIVE-TASK.md` | Tarea activa (mantener actualizado) |
| `docs/agents/CHATS-SETUP.md` | Cómo abrir chats por agente |
| `docs/brand/BRAND-GUIDELINES.md` | Marca, colores locked, tono |
| `docs/DEVELOPMENT-RULES.md` | i18n, git, coding |
| `docs/FIREBASE-SETUP.md` | Firebase Console |
| `docs/MVP-AUDIT.md` | Gaps funcionales MVP |

---

## Agentes (Cursor / Claude)

Modo recomendado: **1 agente a la vez** (se pisan si van en paralelo).

| Agente | Owns | No tocar |
|--------|------|----------|
| **💻 Dev** | `app/`, services, hooks, firebase, routing, layouts estructurales | Estilos en `ui/*`, tokens, brand assets |
| **🎨 UX** | `src/components/ui/*`, `src/design/`, marketing visuals, docs/design | Firebase, business logic |
| **🎯 Brand** | `assets/brand/`, `docs/brand/` | App code, components |
| **📁 Coord** | Prioridades, commits, prompts | Features grandes (derivar) |

Reglas: `.cursor/rules/woofi-*.mdc`  
Prompts largos: `docs/agents/*-AGENT.md`

**Pendiente UI (julio 2026):** tokens/primitivos soft-warm + `AppSidebar` / `AppDesktopLayout` existen, pero **grilla, tamaños y ubicaciones desktop no convencen**. No seguir metiendo tokens sueltos — cablear sidebar + 1 pantalla de referencia (home o explore).

---

## Reglas que NO se negocian

### 1. i18n — cero strings hardcodeados en UI

```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
<Text>{t('home.myPets')}</Text>
```

- Keys en **ambos** `es-AR.json` y `en-US.json`
- Default: `es-AR`
- Verificar: `npm run audit:i18n`

### 2. `pets` ≠ `cases`

- `pets` = privados (`ownerId`)
- `cases` = públicos (lost / found / adoption / transit)
- Vincular vía `petId`; al publicar lost con pet: `status: 'lost'` + `activeLostCaseId`

### 3. Git — autor

| Campo | Valor |
|-------|--------|
| Nombre | `Giggi Argento` |
| Email | `46300924+giggiargento@users.noreply.github.com` |

```bash
git config --local user.name
git config --local user.email
```

**Nunca** `giggi-whalemate` / `gisela@whalemate.com`.

### 4. UI

- Un solo design system: `src/components/ui/` (+ layout en `src/components/layout/`)
- Marketing **no** debe duplicar estilos — reutilizar primitivos
- Colores desde tokens (`#F7B24A` primary, no legacy `#F9A23B` en UI nueva)
- Soft-warm: pills, radius grande, sombras cálidas — **no** `border-2` negro
- Empty states: `EmptyState`
- Sin mock data si Firebase está en `.env`
- **Desktop-first** para web ≥1024; mobile no estirar a desktop

### 5. Arquitectura

```
Screen → hook (React Query) → service → Firestore
         ↓
  Zustand (auth, explore filters)
```

### 6. Scope mínimo

- Cambios pequeños; sin refactors no pedidos; sin tests salvo pedido

---

## Estructura del repo

```
WOOFI/
├── app/
│   ├── index.tsx           # web guest → MarketingHome; auth → tabs; native → login
│   ├── (auth)/             # login, register, forgot-password
│   ├── (tabs)/             # home, explore, add, alerts, profile
│   ├── pet/, case/, create/, explore/, settings/
│   ├── favorites.tsx
│   └── design-preview.tsx  # __DEV__ only
├── src/
│   ├── components/ui/      # Design system
│   ├── components/layout/  # WebShell, AppSidebar*, PageHeader* (*WIP)
│   ├── components/marketing/  # MarketingHome + secciones
│   ├── design/tokens.js    # Single source of truth
│   ├── hooks/, services/, stores/, i18n/, types/, schemas/
├── assets/brand/
├── firebase/               # rules + indexes (Firestore deployed; Storage needs Blaze)
├── docs/agents/, docs/design/, docs/brand/
└── .cursor/rules/
```

---

## Qué funciona hoy ✅

| Feature | Notas |
|---------|--------|
| Auth email/password + reset | Firebase Auth |
| Marketing home web `/` | Guest only; AuthGate exception |
| BrandLogo en login/register | Web-safe SVG |
| WebShell responsive | max-w-6xl |
| CRUD pets, cases, favorites | Básico |
| Link pet → lost case | `status` + `activeLostCaseId` |
| Explore, filtros, mapa parcial | Web = lista fallback |
| i18n es-AR + en-US | Incl. `marketing.*` |
| Firestore rules | Deployed en `wuffi-d19e9` |
| Tokens v2 + soft primitives | WIP en `master` (`6e74ecc`) |

## Qué NO asumir / pendiente ❌

| Item | Estado |
|------|--------|
| **Grilla / layout desktop app** | No cierra — sidebar shell existe, no cableado bien |
| Storage fotos | Pausado — Firebase pide Blaze |
| Sightings | Placeholder |
| Tab Alertas | Vacío |
| QR profiles | No iniciado |
| Google/Apple login | Stub |
| AppSidebar en tabs web | Scaffold only |
| EAS / producción | Sin `eas.json` |
| Tests | Ninguno |

---

## Tareas prioritarias (retomar)

### 1. Desktop layout que se vea bien (URGENTE UI)
Cablear `AppDesktopLayout` / `AppSidebar` en web ≥1024; **home o explore** como pantalla de referencia. Seguir `VISUAL-DIRECTION.md`. No más tokens sueltos.

### 2. Refinar marketing home
Proportions / grilla según referencias soft (sin copiar colores).

### 3. MVP funcional (después de UI usable)
- Sightings, alertas, case status updates
- Photos cuando haya Blaze / Storage
- Province picker completo

### 4. Storage + fotos (cuando haya plan Blaze)
Ver `docs/FIREBASE-SETUP.md` + `ACTIVE-TASK` históricos.

---

## Colecciones Firestore

| Colección | Estado |
|-----------|--------|
| `users`, `pets`, `cases`, `favorites` | ✅ |
| `sightings`, `notifications`, `qrProfiles`, `organizations` | ❌ |

---

## Variables de entorno

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
# Opcional
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

## Bugs / limitaciones conocidas

- Marketing / app: look aún no unificado; desktop se siente “mobile estirado”
- Storage no habilitado sin Blaze
- Puerto 8081 a veces ocupado → `--port 8086`
- Sin dark mode; tablet no optimizado
- Legacy colors aún en algunos spinners / layouts

---

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | Expo SDK 53, RN 0.79, React 19 |
| Nav | Expo Router |
| Estilos | NativeWind 4 + Tailwind |
| Estado | Zustand |
| Data | TanStack Query + Firebase JS v11 |
| i18n | i18next |
| Mapas | react-native-maps / lista web |
| Fonts | Inter |

---

## Cómo retomar una sesión

1. Leer `CLAUDE.md`
2. Leer `docs/design/VISUAL-DIRECTION.md` + `docs/CURRENT-STATUS.md`
3. Ver `docs/agents/ACTIVE-TASK.md`
4. Un scope a la vez; plan → OK → código
5. `npm run typecheck` + `npm run audit:i18n`
6. Actualizar CURRENT-STATUS / ACTIVE-TASK si el progreso es grande

---

## Mensaje para pegar en Claude Code / Cursor (actualizado)

```
Estoy retomando WOOFI. Leé:
- CLAUDE.md
- docs/design/VISUAL-DIRECTION.md
- docs/design/TOKENS-V2.md
- docs/CURRENT-STATUS.md
- docs/agents/ACTIVE-TASK.md

Contexto julio 2026:
- master en origin al día (último: tokens v2 WIP + marketing en / web)
- Firebase rules Firestore deployed; Storage pausado (Blaze)
- Pet→lost case link ya implementado
- Design system soft-warm parcial: primitivos + AppSidebar scaffold — PERO grilla/tamaños/ubicación desktop NO convencen

Prioridad ahora: layout desktop usable (sidebar cableada + 1 pantalla referencia home o explore).
NO más tokens sueltos. Seguí VISUAL-DIRECTION. Confirmá archivos antes de codear.
```
