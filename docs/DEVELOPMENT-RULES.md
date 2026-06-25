# WOOFI — Reglas de desarrollo

## Localización (obligatorio)

### Regla principal

**Ningún texto visible para el usuario puede estar hardcodeado dentro de componentes, pantallas o layouts.**

Todo copy de interfaz debe resolverse con i18n:

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Text>{t('home.myPets')}</Text>
<PrimaryButton title={t('common.save')} onPress={onSave} />
```

### Alcance

Estos elementos **siempre** usan claves i18n:

- Labels de formularios
- Botones y CTAs
- Títulos de pantalla y headers
- Tabs y navegación
- Empty states
- Mensajes de error mostrados al usuario (`Alert`, banners, toasts)
- Placeholders de búsqueda
- Badges de estado
- Textos de onboarding y ayuda

### Locale por defecto

- **Default:** `es-AR` (Español Argentina)
- **Secundario:** `en-US` (solo vía preferencia explícita del usuario en el futuro)
- Configuración: `src/i18n/config.ts`

No usar el idioma del dispositivo como default de la app.

### Archivos de traducción

| Archivo | Rol |
|---------|-----|
| `src/i18n/locales/es-AR.json` | Idioma principal — debe estar completo |
| `src/i18n/locales/en-US.json` | Idioma secundario — mantener paridad de keys |

Al agregar una key nueva:

1. Agregarla primero en `es-AR.json`
2. Agregar la misma key en `en-US.json`
3. Usar `t('namespace.key')` en el componente

### Convención de keys

```
tabs.*          — Bottom tabs
common.*        — Acciones genéricas (guardar, cancelar, error)
auth.*          — Login, registro, logout
home.*          — Pantalla inicio
explore.*       — Explorador
pet.*           — Mascotas personales
case.*          — Casos públicos
create.*        — Flujos de creación
profile.*       — Perfil
errors.*        — Errores de usuario
locations.*     — Provincias, ubicaciones
```

### Excepciones permitidas (no requieren i18n)

- Nombres propios de mascotas, usuarios y contenido generado por el usuario
- Emails, URLs, IDs técnicos
- Emojis decorativos sin significado semántico (`🐾`)
- Mensajes `throw new Error(...)` en servicios (solo desarrollo/logs)
- Configuración nativa en `app.config.ts` (permisos OS) — mantener en español

### Checklist antes de cada PR / pantalla nueva

- [ ] ¿Todos los `Text`, `title`, `label`, `subtitle`, `placeholder` usan `t()`?
- [ ] ¿Las keys existen en `es-AR.json` y `en-US.json`?
- [ ] ¿Los `Alert.alert` usan keys de `errors.*` o `common.*`?
- [ ] ¿Corriste `npm run audit:i18n`?
- [ ] ¿Corriste `npm run typecheck`?

### Verificación automática

```bash
npm run audit:i18n    # Detecta strings hardcodeados en app/ y src/components/
npm run typecheck
```

### Si falta una key

No hardcodear texto temporal. Agregar la key a ambos JSON. Solo si está bloqueado, dejar:

```tsx
// TODO(i18n): add key namespace.missingKey
<Text>{t('namespace.missingKey')}</Text>
```

---

## Git — autor de commits (obligatorio en este repo)

Todos los commits de WOOFI deben usar **solo** la cuenta `giggiargento`:

| Campo | Valor |
|-------|--------|
| Nombre | `Giggi Argento` |
| Email | `46300924+giggiargento@users.noreply.github.com` |

**Nunca** commitear como `giggi-whalemate` ni con `gisela@whalemate.com`.

Este repo ya tiene la config local correcta (`.git/config`). Verificá antes de commitear:

```bash
git config --local user.name
git config --local user.email
```

Si usás Cursor/Agent para commits, confirmá que no herede el `user.name` / `user.email` **global** de otra cuenta.

---

## Otras reglas

- No usar mock data si Firebase está configurado
- `pets` y `cases` son entidades separadas (ver arquitectura)
- Commits con mensajes descriptivos del *por qué*
