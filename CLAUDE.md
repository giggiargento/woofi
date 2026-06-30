# WOOFI — Guía para Claude Code

Este archivo es el punto de entrada para retomar el proyecto **sin perder contexto**. Léelo completo antes de tocar código.

---

## Qué es WOOFI

App móvil (Expo / React Native) para:

1. **Cuaderno digital privado** — perfiles de mascotas del usuario (`pets`)
2. **Explorador público** — casos de mascotas perdidas, encontradas, adopción y tránsito (`cases`)

- **Idioma default:** Español Argentina (`es-AR`)
- **Estilo UI:** Pastel, cálido, neubrutalism-lite — primary `#F9A23B`
- **Backend:** Firebase (`wuffi-d19e9`) — Auth + Firestore + Storage
- **Runtime actual:** Expo Go (sin dev build / sin `eas.json`)
- **Repo:** https://github.com/giggiargento/woofi
- **Branch principal:** `master` (sincronizado con `origin/master`)

Último checkpoint relevante (junio 2026): rebrand WUFFI → WOOFI, flujo de mascotas estabilizado, MVP limitado a perros y gatos, base Firebase + i18n + design system completos.

---

## Arranque rápido (5 minutos)

```bash
npm install
cp .env.example .env          # completar EXPO_PUBLIC_FIREBASE_* (nunca commitear .env)
npm run check:firebase
npm start                       # o: npx expo start --tunnel si LAN falla
```

Verificar antes de un PR:

```bash
npm run typecheck
npm run audit:i18n
npm run check:firebase
npm run verify:firebase         # requiere .env válido + Auth habilitado en Firebase Console
```

Probar en dispositivo: **Expo Go** → escanear QR. Si el puerto 8081 está ocupado: `npx expo start --port 8086`.

---

## Documentación del repo (leer según necesidad)

| Archivo | Cuándo leerlo |
|---------|---------------|
| `docs/CURRENT-STATUS.md` | Estado actual, bugs conocidos, tareas pendientes |
| `docs/PROJECT-HANDOFF.md` | Onboarding técnico, layout, archivos clave |
| `docs/DEVELOPMENT-RULES.md` | Reglas i18n, git, coding — **obligatorio** |
| `docs/WOOFI-ARCHITECTURE-ROADMAP.md` | Visión completa, esquema Firestore, fases |
| `docs/FIREBASE-SETUP.md` | Setup Firebase Console + CLI |
| `docs/MVP-AUDIT.md` | Auditoría de funcionalidad MVP |

---

## Reglas que NO se negocian

### 1. i18n — cero strings hardcodeados en UI

Todo texto visible al usuario va con `t('namespace.key')`:

```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
<Text>{t('home.myPets')}</Text>
```

- Agregar keys en **ambos** `src/i18n/locales/es-AR.json` y `en-US.json`
- Default locale: `es-AR` (no usar idioma del dispositivo)
- Verificar: `npm run audit:i18n`

### 2. `pets` ≠ `cases`

- `pets` = perfiles privados del dueño
- `cases` = publicaciones públicas (lost / found / adoption / transit)
- Un `Pet` puede vincularse a un `Case` vía `petId`, pero son entidades separadas

### 3. Git — autor de commits

Solo commitear como:

| Campo | Valor |
|-------|--------|
| Nombre | `Giggi Argento` |
| Email | `46300924+giggiargento@users.noreply.github.com` |

Verificar antes de commitear:

```bash
git config --local user.name
git config --local user.email
```

**Nunca** commitear como `giggi-whalemate` ni `gisela@whalemate.com`.

### 4. UI

- Reutilizar componentes de `src/components/ui/`
- Primary `#F9A23B`, bordes 2px negros, esquinas redondeadas, sombras suaves
- Empty states con componente `EmptyState`
- No usar mock data si Firebase está configurado en `.env`

### 5. Arquitectura de código

```
Screen → hook (React Query) → service → Firestore
                ↓
         Zustand (auth, explore filters)
```

- Tipos: `src/types/`
- Validación Zod: `src/schemas/`
- Lógica de negocio: `src/services/`
- Hooks: `src/hooks/`
- Pantallas: `app/` (Expo Router, file-based)

### 6. Scope mínimo

- Cambios pequeños y enfocados
- No refactorizar lo que no pide la tarea
- No agregar tests salvo que se pidan explícitamente

---

## Estructura del repo

```
WOOFI/
├── app/                    # Pantallas Expo Router
│   ├── (auth)/             # login, register, forgot-password
│   ├── (tabs)/             # home, explore, add, alerts, profile
│   ├── pet/[id]/           # detalle + edit
│   ├── case/[id]/          # detalle + sighting (placeholder)
│   ├── create/             # personal/lost/found/adoption/transit
│   ├── explore/            # map (+ .native.tsx), filters
│   ├── favorites.tsx
│   └── settings/
├── src/
│   ├── components/ui/      # Design system
│   ├── hooks/              # useAuth, usePets, useCases, useFavorites
│   ├── services/           # Firebase + dominio
│   ├── stores/             # Zustand (auth, explore)
│   ├── i18n/               # locales + config
│   ├── types/              # TypeScript
│   └── schemas/            # Zod
├── firebase/               # firestore.rules, indexes, storage.rules
├── scripts/                # verify-firebase, check-env, audit-i18n
└── docs/                   # Documentación detallada
```

---

## Qué funciona hoy ✅

| Feature | Archivos clave |
|---------|----------------|
| Auth email/password | `src/hooks/useAuth.ts`, `src/services/firebase/auth.ts` |
| Gate de auth | `app/_layout.tsx` |
| CRUD mascotas (básico) | `src/services/pets/petService.ts`, `app/pet/[id]/` |
| Casos públicos (4 tipos) | `src/services/cases/caseService.ts`, `app/create/` |
| Explorar (tabs, búsqueda, filtros) | `app/(tabs)/explore.tsx`, `src/stores/exploreStore.ts` |
| Favoritos | `src/services/favorites/favoriteService.ts`, `app/favorites.tsx` |
| Mapa nativo (parcial) | `app/explore/map.native.tsx` |
| Web con fallback lista | `app/explore/map.tsx` |
| Design system | `src/components/ui/` |
| i18n es-AR + en-US | `src/i18n/` |

---

## Qué NO funciona / no asumir ❌

| Feature | Estado | Dónde empezar |
|---------|--------|---------------|
| Reportar avistamiento | UI placeholder vacío | `app/case/[id]/sighting.tsx` |
| Push / notificaciones | Tab Alertas vacío | `app/(tabs)/alerts.tsx` |
| QR profiles | No iniciado | Ver roadmap § QRProfile |
| Google/Apple login | Stub | `src/services/firebase/googleAuth.ts` |
| Cambio de idioma en settings | Solo muestra locale | `app/settings/index.tsx` |
| Fotos en flujos de creación | Envían `photoUrls: []` | `app/create/*/` |
| Organizaciones / refugios | No iniciado | — |
| EAS Build / producción | Sin `eas.json` | — |
| Tests | Ninguno | — |

---

## Colecciones Firestore

| Colección | Implementada | Notas |
|-----------|--------------|-------|
| `users` | ✅ | Perfil al registrarse |
| `pets` | ✅ | Privados, `ownerId` |
| `cases` | ✅ | Públicos, tipos lost/found/adoption/transit |
| `favorites` | ✅ | Casos guardados por usuario |
| `sightings` | ❌ | Próxima feature importante |
| `notifications` | ❌ | Tab Alertas pendiente |
| `qrProfiles` | ❌ | Futuro |
| `organizations` | ❌ | Futuro |

Reglas e índices en `firebase/`. **Deploy pendiente de confirmar** en producción (`wuffi-d19e9`).

---

## Tareas prioritarias (retomar en este orden)

Estas son las siguientes tareas acordadas. Elegí una y completala de punta a punta antes de pasar a la siguiente.

### 1. Deploy Firebase rules
Confirmar que `firestore.rules`, `firestore.indexes.json` y `storage.rules` están desplegados en `wuffi-d19e9`.
- Archivos: `firebase/`
- Guía: `docs/FIREBASE-SETUP.md`
- Comando: `firebase deploy --only firestore,storage`

### 2. Photo upload end-to-end
Conectar flujos de creación de mascota/caso con Storage. Mostrar imágenes en cards.
- Servicio existente: `src/services/firebase/storage.ts`
- Referencia (edit ya tiene picker): `app/pet/[id]/edit.tsx`
- Pendiente: `app/create/personal/`, `app/create/lost/`, etc.

### 3. Report sighting flow
Implementar avistamientos con colección `sightings`.
- Pantalla placeholder: `app/case/[id]/sighting.tsx`
- Crear: tipo en `src/types/`, schema en `src/schemas/`, service, hook
- i18n: keys en `case.sighting.*`

### 4. Google Maps API key
Habilitar mapas completos en Android Expo Go.
- Env: `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` en `.env`
- Pantalla: `app/explore/map.native.tsx`

### 5. Notifications MVP
Leer colección `notifications` y poblar tab Alertas.
- Pantalla: `app/(tabs)/alerts.tsx`
- Crear service + hook + tipos

### 6. Language switcher en settings
Persistir `userProfile.locale` y llamar `i18n.changeLanguage`.
- Pantalla: `app/settings/index.tsx`
- User service: `src/services/users/userService.ts`

### 7. Case status updates
Acciones del dueño: marcar sighted / found / closed.
- Detalle: `app/case/[id].tsx`
- Service: `src/services/cases/caseService.ts`
- Utils: `src/utils/caseStatus.ts`

### 8. Province picker reutilizable
Lista completa de provincias para todos los create/filter screens.
- Referencia parcial: `src/i18n/provinces.ts`, `locations.provinces.*`
- Algunos create flows solo tienen 6–8 chips hardcodeados

---

## Archivos clave por tarea común

| Quiero… | Empezar en… |
|---------|-------------|
| Nueva pantalla | `app/` + registrar en `_layout.tsx` si hace falta |
| Nuevo componente UI | `src/components/ui/` + export en `src/components/index.ts` |
| Nueva traducción | `src/i18n/locales/es-AR.json` + `en-US.json` |
| Nuevo campo Firestore | `src/types/` → `src/schemas/` → service → hook → screen |
| Nueva tab | `app/(tabs)/_layout.tsx` + archivo en `(tabs)/` |
| Reglas Firebase | `firebase/firestore.rules` → deploy |

---

## Variables de entorno

Copiar `.env.example` → `.env` (gitignored, nunca commitear):

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

- Puerto **8081** ocupado si hay varias instancias de Expo → usar `--port 8086`
- Tunnel (`--tunnel`) lento; preferir LAN en misma Wi‑Fi
- Sin dark mode
- Layout mobile-first; tablet no optimizado
- Algunos create flows (adoption, transit) usan CABA por default sin picker de provincia
- `newArchEnabled: true` en `app.config.ts` — vigilar compatibilidad Expo Go
- Errores en services en inglés (aceptable, no son user-facing)

---

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | Expo SDK 53, React Native 0.79, React 19 |
| Navegación | Expo Router (file-based) |
| Estilos | NativeWind 4 + Tailwind CSS |
| Estado | Zustand (auth, explore) |
| Data fetching | TanStack React Query |
| Validación | Zod |
| Backend | Firebase JS SDK v11 |
| i18n | i18next + react-i18next |
| Mapas | react-native-maps (native), lista en web |
| Fuentes | Inter (@expo-google-fonts/inter) |

---

## Cómo retomar una sesión

1. Leer este archivo (`CLAUDE.md`)
2. Leer `docs/CURRENT-STATUS.md` para el detalle más reciente
3. Preguntar al usuario qué tarea quiere (o tomar la #1 de la lista priorizada)
4. Antes de commitear: `npm run verify` + verificar autor git
5. Actualizar `docs/CURRENT-STATUS.md` si se completa una feature significativa

---

## Instrucción para el usuario al abrir Claude Code

Pegá esto en el primer mensaje si querés retomar rápido:

```
Estoy retomando WOOFI. Lee CLAUDE.md y docs/CURRENT-STATUS.md.
Quiero continuar con la tarea [N]: [descripción].
Confirmá qué archivos vas a tocar antes de empezar.
```
