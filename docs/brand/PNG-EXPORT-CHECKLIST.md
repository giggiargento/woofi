# Checklist — export PNG (Figma / Inkscape)

Usá esto al exportar los 3 PNG nativos. Spec completa: [`APP-ICON-SPLASH.md`](APP-ICON-SPLASH.md). SVG fuente: `assets/brand/favicon.svg`, `assets/brand/logo-wordmark.svg`.

**No uses** `woofi (1–8).svg`.

---

## Antes de exportar

- [ ] Abrís el SVG **oficial** (no un export con fondo cuadrado extra)
- [ ] Colores intactos: naranja `#ffb850`, crema `#fff2d0`, marrón `#5e4432`
- [ ] Export **PNG-24** (no JPEG)
- [ ] Escala **directa** desde vector (sin upscalar un PNG chico)

---

## 1 · `icon.png` ← `favicon.svg`

| Campo | Valor |
|-------|--------|
| Tamaño | 1024 × 1024 px |
| Contenido | SVG completo (perrito + crema + esquinas redondeadas) |
| Fondo | Opaco (crema incluida en el arte) |
| Destino | `assets/icon.png` |

**Figma:** frame 1024×1024 → pegar/importar SVG → Export PNG 1×  
**Inkscape:** Archivo → Exportar PNG → ancho/alto 1024 → Exportar

- [ ] Preview a ~60 px: perrito legible
- [ ] Sin texto “WOOFI” en el icono

---

## 2 · `android-icon-foreground.png` ← `favicon.svg`

| Campo | Valor |
|-------|--------|
| Tamaño | 1024 × 1024 px |
| MVP | Igual que `icon.png` (Opción A) |
| Destino | `assets/android-icon-foreground.png` |

- [ ] Preview con máscara circular: perrito no cortado
- [ ] (Opcional v2) Perrito ~70% centrado + PNG transparente en bordes → Dev pone `backgroundColor: #fff2d0`

---

## 3 · `splash-icon.png` ← `logo-wordmark.svg`

| Campo | Valor |
|-------|--------|
| Tamaño canvas | 512 × 512 px |
| Wordmark | ~80–85% del ancho, centrado |
| Fondo del PNG | **Transparente** (crema la pone Expo) |
| Destino | `assets/splash-icon.png` |

**Figma:** frame 512×512 transparente → wordmark centrado → Export PNG  
**Inkscape:** canvas 512×512 → centrar wordmark → exportar con alpha

- [ ] Márgenes parejos (clear space)
- [ ] No incluir rectángulo crema en el PNG

---

## Después de exportar

- [ ] Nombres exactos: `icon.png`, `android-icon-foreground.png`, `splash-icon.png`
- [ ] Copiar a `assets/` (opcional backup en `assets/brand/exports/`)
- [ ] Avisar a Dev: actualizar `splash.backgroundColor` y `android.adaptiveIcon.backgroundColor` a `#FFF6E5` o `#fff2d0` (no `#FFF4EA`)
- [ ] QA en simulador iOS + Android cuando Dev wiree

---

## Referencia rápida colores fondo (Dev, no en PNG splash)

| Key Expo | Hex marca |
|----------|-----------|
| `splash.backgroundColor` | `#FFF6E5` o `#fff2d0` |
| `android.adaptiveIcon.backgroundColor` | `#fff2d0` |
