# WOOFI — Tarea activa

**Modo:** simple (1 agente a la vez)  
**Última actualización:** julio 2026

---

## Estado de agentes

| Agente | Estado |
|--------|--------|
| 📁 Coordinación | Activo — commitea, define tareas, vos probás |
| 💻 Dev | **TAREA A** abajo |
| 🎨 UX | **PAUSA** — esperar tarea de pantalla concreta |
| 🎯 Brand | **PAUSA** — guidelines listas; PNGs cuando se pida |

---

## TAREA A — 💻 Dev (próxima)

**Objetivo:** Subida de fotos de mascotas con Firebase Storage (flujo real, visible en la app).

### Pre-requisito (humano, 2 min)

1. [Firebase Console → Storage](https://console.firebase.google.com/project/wuffi-d19e9/storage) → **Comenzar**
2. Avisar en chat 📁 cuando esté listo (o Dev puede asumir que ya está si deploy de rules pasa)

### Hacer

1. Deploy `firebase/storage.rules` cuando Storage esté habilitado
2. Implementar subida en flujo crear/editar mascota (`app/pet/`, hooks/services existentes)
3. Mostrar foto en `PetCard` / detalle si ya hay URL en Firestore
4. Fallback claro si Storage no está listo (mensaje i18n, no crash)

### Archivos permitidos

- `app/pet/**`
- `app/create/**` (solo si toca flujo de mascota)
- `src/services/**` (storage, pets)
- `src/hooks/**`
- `firebase/storage.rules`
- `src/i18n/locales/*.json` (keys nuevas)
- `docs/CURRENT-STATUS.md` (una línea de estado al terminar)

### PROHIBIDO

- `src/components/ui/*` (estilos)
- `docs/brand/`, `assets/brand/`
- `tailwind.config.js`, `src/design/tokens.js`, `theme.ts`
- Tokens, design-preview, guidelines

### Al terminar

```bash
npm run typecheck && npm run audit:i18n
```

Listar archivos cambiados. **No commitear** — avisar en chat 📁.

---

## Cola (después de A)

| ID | Tarea | Agente |
|----|-------|--------|
| B | Reportar perdida → actualizar `pet.status` + `activeLostCaseId` | Dev |
| C | Tab Alertas — lista básica o empty state útil | Dev |
| D | Pulir pantalla concreta post-A | UX |

---

## Mensaje para pegar en 💻 Dev

```
PAUSA design system / tokens / brand.

Leé @docs/agents/ACTIVE-TASK.md — TAREA A.

Plan primero (archivos + pasos). No codees hasta mi OK.
PROHIBIDO: src/components/ui/*, docs/brand/, theme, tailwind.
```
