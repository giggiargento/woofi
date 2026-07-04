# WOOFI — Brand Guidelines

Documento de referencia para Brand, UX/UI y Dev. Define identidad, assets oficiales, colores y tono de voz. **No reemplaza** tokens de código (`src/constants/`, Tailwind) — esos los implementa el agente UX.

**Última actualización:** julio 2026  
**Assets oficiales:** `assets/brand/README.md`

---

## 1. Resumen de identidad

**WOOFI** es una app de cuidado y comunidad de mascotas: cuaderno digital privado, identificación, adopción, tránsito y casos públicos (perdidos/encontrados). No es una app de emergencia ni un producto clínico frío.

| Atributo | Qué significa |
|----------|----------------|
| **Cálido** | Paleta crema/naranja/marrón, formas redondeadas, sensación acogedora |
| **Confiable** | Clara, directa, sin dramatizar — especialmente en casos sensibles |
| **Cercano** | Voseo rioplatense (`es-AR`), humano, nunca corporativo |
| **Orgánico / handmade** | Wordmark dibujado a mano; líneas suaves, no geométrico rígido |
| **Moderno app-first** | Legible en mobile, favicon reconocible, sin clutter |

**Personalidad en una frase:** *El cuaderno digital y la red de vecinos que te ayudan con tu mascota — con cariño, sin alarmismo.*

**Lo que NO somos:** app de veterinaria clínica, red social genérica, marca infantil/chibi, servicio de emergencia 24/7.

---

## 2. Assets oficiales

Solo usar estos archivos en producto y marketing. Los exports `woofi (1).svg` … `woofi (8).svg` son **referencia de diseño** (incluyen fondo cuadrado); no importarlos en la app.

| Asset | Archivo | Cuándo usar |
|-------|---------|-------------|
| **Wordmark** | `assets/brand/logo-wordmark.svg` | Headers, auth, sidebar web, materiales donde aparece el nombre WOOFI |
| **Favicon / icono app** | `assets/brand/favicon.svg` | Pestaña web, PWA, launcher cuando el espacio es cuadrado y pequeño |

### 2.1 Wordmark (`logo-wordmark.svg`)

- Fondo **transparente** — colocar sobre crema (`#fff2d0` / `#FFF6E5`) o blanco.
- Composición: texto “WOOFI” hand-drawn + huellitas/mascotas integradas + acento naranja en la “O”.
- **No** recortar, estirar, rotar ni cambiar proporción.
- **No** aplicar sombras, gradientes, brillos o contornos extra.
- **No** cambiar colores del SVG salvo variantes monocromáticas aprobadas (ver §4).

**Tamaños mínimos recomendados**

| Contexto | Ancho mínimo |
|----------|--------------|
| Mobile header | 96 px |
| Auth / splash textual | 160 px |
| Web sidebar | 120 px |
| Marketing / print | 40 mm |

**Zona de respeto (clear space):** margen libre equivalente a la altura de la letra “W” en los cuatro lados. Ningún texto, botón ni borde de UI debe invadir esa zona.

### 2.2 Favicon (`favicon.svg`)

- Ilustración del **perrito** sobre fondo crema, con **esquinas redondeadas** (`rx ≈ 22%` del canvas).
- Usar el archivo tal cual — no añadir otro `border-radius` encima en CSS si ya está en el SVG.
- En contextos que exijan PNG (App Store, algunos launchers): exportar desde este SVG manteniendo el clip redondeado.

**Tamaños mínimos:** 16×16 px (favicon browser), 32×32 px (PWA), 48×48 px (Android adaptive base). Por debajo de 16 px preferir silueta simplificada (futura variante `favicon-16.png` si hace falta).

### 2.3 Cuándo usar wordmark vs favicon

```
Espacio horizontal amplio + marca legible  →  logo-wordmark.svg
Espacio cuadrado / ≤48 px / sin texto        →  favicon.svg
```

No usar el wordmark como favicon (ilegible). No usar el favicon como logo principal en pantallas de auth.

---

## 3. Paleta de color

### 3.1 Colores de marca (fuente: logo SVG)

Estos son los valores **canónicos del logo**. Documentados en `assets/brand/README.md`.

| Token marca | Hex | Rol en logo |
|-------------|-----|-------------|
| **Orange** | `#ffb850` | Acentos, highlights, detalle naranja en wordmark |
| **Cream** | `#fff2d0` | Fondos suaves, fondo del favicon |
| **Brown** | `#5e4432` | Trazos del wordmark, contornos del perrito |

### 3.2 Alineación logo ↔ producto UI

El código hoy mezcla legacy (`#F9A23B`) con targets UX. Esta tabla es la **decisión de marca** para converger (implementación: agente UX en `theme.ts` / Tailwind).

| Rol | Logo (marca) | UI target (UX) | Notas |
|-----|--------------|----------------|-------|
| Naranja principal | `#ffb850` | `#F7B24A` | ΔE bajo — **usar `#F7B24A` en UI**, mantener `#ffb850` en SVGs oficiales hasta re-export |
| Naranja acento / CTA fuerte | — | `#D97B32` | Solo UI; no alterar logo |
| Marrón texto / trazos | `#5e4432` | `#5B3E2D` | Casi equivalentes — **UI: `#5B3E2D`**; logo puede quedar en `#5e4432` |
| Marrón oscuro | — | `#3B2417` | Texto emphasis, bordes fuertes en UI |
| Crema fondo | `#fff2d0` | `#FFF6E5` | Logo ligeramente más saturado — **UI: `#FFF6E5`** para pantallas; favicon/bg marketing puede usar `#fff2d0` |
| Superficie clara | — | `#FFFDF9` | Cards, inputs |
| Legacy (deprecar) | — | `#F9A23B` | Migrar a `#F7B24A`; no usar en assets nuevos |

**Regla práctica:** En pantallas, nadie debería notar la diferencia entre logo y UI. Si un bloque lleva wordmark sobre fondo, usar `#FFF6E5` o `#fff2d0` (no gris frío).

### 3.3 Colores de apoyo (UI — no en logo)

Pastels para chips, badges y estados: lavanda, cielo, menta, rosa suave, arena/beige. Definidos por UX; deben convivir con la paleta cálida sin competir con el naranja principal.

### 3.4 Uso de color — do / don't

| ✅ Hacer | ❌ Evitar |
|---------|----------|
| Fondos crema cálidos | Fondos gris `#F3F4F6` o blanco hospital |
| Marrón para texto principal | Negro puro `#000` en párrafos largos |
| Naranja para CTAs y acentos | Naranja en párrafos enteros |
| Bordes 2px oscuros (neubrutalism-lite) | Sombras blur grises pesadas |
| Alto contraste en accesibilidad (texto marrón sobre crema) | Texto crema sobre naranja claro |

---

## 4. Variantes de logo (permitidas)

| Variante | Uso | Especificación |
|----------|-----|----------------|
| **Full color** (default) | App, web, marketing | Archivos oficiales sin modificar |
| **Sobre crema** | Headers, auth | Wordmark transparente sobre `#FFF6E5` o `#fff2d0` |
| **Monocromo marrón** | Impresión una tinta, watermark sutil | Todo `#5e4432` o `#5B3E2D` |
| **Monocromo crema** | Sobre fotos oscuras (con overlay) | Solo con overlay ≥40% oscuro para contraste |

Variantes **no aprobadas** sin revisión Brand: gradientes, outline blanco grueso, animaciones que deformen el wordmark, “WOOFI” en tipografía del sistema reemplazando el SVG.

---

## 5. Tipografía (referencia para UX)

- **UI:** Inter (ya en app) — legible, neutra; contrasta bien con el wordmark handmade.
- **Marca:** El wordmark **es** la tipografía de marca; no hay fuente display separada para el logotipo.
- **Marketing (futuro):** títulos pueden incluir Inter Bold/SemiBold; cuerpo Inter Regular.

---

## 6. Tono de voz

**Idioma default:** Español Argentina (`es-AR`). Voseo natural: “Agregá”, “Mirá”, “Tu mascota”.

### 6.1 Principios

1. **Claro antes que clever** — instrucciones en una idea por oración.
2. **Empático, no paternalista** — especialmente en perdidos/encontrados/adopción.
3. **Concreto** — “Subí una foto” mejor que “Enriquecé el perfil multimedia”.
4. **Positivo sin minimizar** — ayudar sin negar la urgencia real en casos lost.

### 6.2 Ejemplos

| Contexto | ✅ WOOFI | ❌ Evitar |
|----------|---------|----------|
| Empty state mascotas | “Todavía no cargaste mascotas. Empezá con la primera.” | “No hay registros en el sistema.” |
| Caso perdido | “Compartí el caso para que más gente pueda ayudar.” | “¡EMERGENCIA! ¡ACTUÁ YA!” |
| Error genérico | “No pudimos guardar. Probá de nuevo.” | “Error 500 internal server error” |
| Adopción | “Conocé a {nombre} y escribile si querés adoptar.” | “Adquirí un nuevo compañero hoy” |
| Onboarding | “WOOFI es tu cuaderno digital de mascotas.” | “Plataforma integral de gestión animal” |

### 6.3 Microcopy UI

- Botones: verbos en infinitivo o imperativo voseo (“Guardar”, “Publicar”, “Explorar”).
- Títulos de pantalla: cortos, sustantivos o frases nominales (“Mis mascotas”, “Explorar”).
- Evitar anglicismos innecesarios salvo términos ya adoptados (“app”, “email”).

---

## 7. Aplicación en producto (handoff)

| Agente | Acción |
|--------|--------|
| **Brand** | Mantener SVGs en `assets/brand/`; actualizar este doc si cambian colores o assets |
| **UX/UI** | Tokens hacia §3.2; componentes sin hardcode `#F9A23B`; importar logos oficiales en headers/auth |
| **Dev** | Referenciar assets vía imports estáticos; favicon en `app.config.ts` / web meta según spec UX |

**Archivos de referencia cruzada**

- Assets: `assets/brand/README.md`
- Tokens UX target: `docs/agents/UX-AGENT.md`
- Auditoría técnica: `docs/design/DESIGN-SYSTEM-AUDIT.md`
- Coordinación: `docs/agents/COORDINATION.md`

---

## 8. Checklist rápido

Antes de publicar una pantalla o pieza con marca:

- [ ] ¿Usás `logo-wordmark.svg` o `favicon.svg` (no exports `woofi (N).svg`)?
- [ ] ¿Clear space respetado alrededor del wordmark?
- [ ] ¿Fondo crema/cálido, no gris frío?
- [ ] ¿Texto UI en `es-AR` vía i18n, tono §6?
- [ ] ¿Colores UI alineados a §3.2 (no legacy `#F9A23B` en piezas nuevas)?

---

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-07 | Creación inicial — wordmark + favicon oficiales, paleta logo, alineación UX, tono es-AR |
