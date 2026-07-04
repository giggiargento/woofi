# WOOFI — App icon & splash (brief Expo)

Especificación para generar PNG nativos desde los SVG oficiales. **Implementación en `app.config.ts`:** agente Dev. **Exportación PNG:** humano o herramienta de diseño (Brand no commitea PNGs hasta que existan).

**Fuentes SVG**

| Rol | Archivo |
|-----|---------|
| Icono launcher / favicon nativo | `assets/brand/favicon.svg` |
| Splash (marca con nombre) | `assets/brand/logo-wordmark.svg` |

**Referencia:** `docs/brand/BRAND-GUIDELINES.md` §2–3

---

## Decisión: ¿exportar PNG?

**Sí — obligatorio para builds nativos Expo/EAS.**

| Formato | Web | iOS / Android launcher | Splash nativo |
|---------|-----|------------------------|---------------|
| SVG | ✅ (`web.favicon` ya usa `favicon.svg`) | ❌ | ❌ |
| PNG | ✅ PWA manifest (opcional) | ✅ requerido | ✅ requerido |

Expo no usa SVG para `icon`, `splash.image` ni `android.adaptiveIcon.foregroundImage`. Los paths actuales en `app.config.ts` apuntan a PNG en `./assets/` que **aún no existen** en el repo — hay que generarlos desde los SVG.

**Herramientas sugeridas (cualquiera):**

- Figma / Illustrator / Inkscape — export raster 1024 px, PNG-24
- CLI: Inkscape `inkscape favicon.svg -w 1024 -h 1024 -o icon.png`, o `resvg`, ImageMagick `convert -background none -density 300`

**Calidad:** exportar desde SVG vectorial (sin reescalar PNG intermedios). Sin compresión JPEG.

---

## Mapa de archivos → Expo

Destino alineado con `app.config.ts` actual (Dev solo actualiza paths si cambian nombres):

| Archivo de salida | Expo key | Fuente SVG | Tamaño |
|-------------------|----------|------------|--------|
| `assets/icon.png` | `icon` | `favicon.svg` | **1024 × 1024** |
| `assets/android-icon-foreground.png` | `android.adaptiveIcon.foregroundImage` | `favicon.svg` (ver § Android) | **1024 × 1024** |
| `assets/splash-icon.png` | `splash.image` | `logo-wordmark.svg` | **512 × 512** (mín. 400; ver § Splash) |

Copias opcionales de archivo en `assets/brand/exports/` para trazabilidad Brand (gitignored o commiteadas cuando existan).

---

## 1. App icon — `assets/icon.png`

**Fuente:** `favicon.svg`  
**Tamaño:** 1024 × 1024 px  
**Formato:** PNG, sin compresión lossy

**Composición**

- Renderizar el SVG completo: perrito + fondo crema `#fff2d0` + esquinas redondeadas (`rx ≈ 240` en viewBox 1080).
- iOS aplica máscara squircle propia; las esquinas del SVG son compatibles con la estética WOOFI.
- **No** añadir texto “WOOFI” en el icono — solo el perrito (marca reconocible en home screen).

**App Store Connect**

- Mismo asset 1024 × 1024 para listing iOS.
- Sin canal alpha obligatorio para store icon (fondo crema opaco incluido en el SVG).

---

## 2. Android adaptive icon — `assets/android-icon-foreground.png`

**Fuente:** `favicon.svg` (misma ilustración del perrito)  
**Tamaño foreground:** 1024 × 1024 px  
**Background (solo color en Expo):** `#fff2d0` — alinear `android.adaptiveIcon.backgroundColor` (hoy legacy `#FFF4EA` en config; migrar a crema marca).

**Zona segura (Google)**

- El sistema recorta a círculo, squircle, etc.
- Contenido crítico dentro del **círculo central ~66%** (~672 px de diámetro en canvas 1024).
- **Recomendación Brand:** escalar el artwork del perrito a **~70–75%** del ancho del viewBox, centrado, manteniendo fondo crema dentro del foreground **o** foreground solo perrito + transparencia en márgenes y `backgroundColor` crema en config.

**Opción A (simple, recomendada para MVP)**

- Export idéntico a `icon.png` (favicon completo a 1024).
- Riesgo menor: esquinas doble-redondeadas en algunos launchers — aceptable para v1.

**Opción B (pulido adaptive)**

- Foreground: perrito centrado, márgenes ~15% por lado, fondo transparente en PNG.
- `backgroundColor: '#fff2d0'` en `app.config.ts`.
- Mejor legibilidad bajo máscara circular.

---

## 3. Splash — `assets/splash-icon.png`

**Fuente:** `logo-wordmark.svg` (fondo transparente)  
**Tamaño imagen:** **512 × 512 px** PNG con **transparencia** alrededor del wordmark  
**Modo Expo:** `resizeMode: 'contain'` (config actual)

**Fondo de pantalla (no va en el PNG):** `#FFF6E5` (UI target) o `#fff2d0` (crema logo). Actualizar `splash.backgroundColor` desde legacy `#FFF4EA` cuando Dev aplique assets.

**Composición**

- Wordmark centrado en canvas cuadrado; ancho del wordmark ≈ **80–85%** del canvas (clear space §2.1 BRAND-GUIDELINES).
- **No** incluir fondo crema en el PNG — solo el wordmark; el color lo pone Expo.
- Orientación portrait: con `contain`, el wordmark queda centrado vertical y horizontalmente sobre crema full-screen.

**Alternativa full-bleed (opcional, no requerida MVP)**

- PNG 1284 × 2778 px, wordmark centrado en tercio superior, fondo `#FFF6E5` plano incrustado.
- Archivo más pesado; solo si se abandona `contain` por imagen fullscreen.

---

## 4. Web (referencia — ya parcialmente configurado)

| Asset | Spec |
|-------|------|
| `web.favicon` | Ya: `assets/brand/favicon.svg` |
| PWA `apple-touch-icon` (futuro) | PNG 180 × 180 desde `favicon.svg` |
| PWA manifest icons (futuro) | 192 × 192, 512 × 512 desde `favicon.svg` |

No bloquean Expo Go; generar cuando haya PWA store listing.

---

## 5. Colores al aplicar en Dev (checklist)

Cuando se wireen los PNG, alinear con marca (no legacy):

| Key | Valor marca | Legacy actual en config |
|-----|-------------|-------------------------|
| `splash.backgroundColor` | `#FFF6E5` o `#fff2d0` | `#FFF4EA` |
| `android.adaptiveIcon.backgroundColor` | `#fff2d0` | `#FFF4EA` |

---

## 6. Proceso de exportación (paso a paso)

1. Abrir `favicon.svg` → exportar `icon.png` 1024 × 1024.
2. Misma fuente → `android-icon-foreground.png` 1024 × 1024 (Opción A o B §2).
3. Abrir `logo-wordmark.svg` → canvas 512 × 512, wordmark centrado ~85% ancho → `splash-icon.png` con alpha.
4. Revisión visual: icono a 60 px, splash en simulador iOS + Android.
5. Dev: colocar en `assets/`, ajustar `backgroundColor` en `app.config.ts`, validar con `npx expo prebuild` o EAS cuando exista build.

**QA rápida**

- [ ] Icono legible a 48 px (home screen)
- [ ] Perrito no cortado bajo máscara circular Android
- [ ] Splash: wordmark no pegado a bordes; fondo crema uniforme
- [ ] Sin usar `woofi (N).svg` con fondo cuadrado de export crudo

---

## 7. Handoff

| Rol | Tarea |
|-----|--------|
| **Brand / diseño** | Generar los 3 PNG según esta spec; opcionalmente guardar en `assets/brand/exports/` |
| **Dev** | Copiar a `assets/`, actualizar colores splash/adaptive; no cambiar SVGs oficiales |
| **UX** | Confirmar splash bg `#FFF6E5` vs `#fff2d0` en tokens |

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-07 | Brief inicial — tamaños Expo, fuentes SVG, recomendación export PNG |
