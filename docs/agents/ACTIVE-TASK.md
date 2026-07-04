# WOOFI — Tarea activa

**Modo:** simple (1 agente a la vez)  
**Última actualización:** julio 2026

---

## Estado de agentes

| Agente | Estado |
|--------|--------|
| 📁 Coordinación | Activo |
| 💻 Dev | **TAREA B** abajo |
| 🎨 UX | **PAUSA** |
| 🎯 Brand | **PAUSA** |

---

## TAREA B — 💻 Dev (activa)

**Objetivo:** Al publicar un caso "perdida" desde una mascota, actualizar el pet en Firestore.

### Hacer

Cuando se publica en `app/create/lost/[step].tsx` (con `petId`):

1. `pet.status` → `'lost'`
2. `pet.activeLostCaseId` → id del caso creado

Usar `petService` / hooks existentes. Sin Storage ni fotos.

### Archivos permitidos

- `app/create/lost/**`
- `src/services/pets/**`, `src/services/cases/**`
- `src/hooks/**`
- `src/i18n/locales/*.json` (si hace falta)

### PROHIBIDO

- `src/components/ui/*`, `docs/brand/`, `theme`, `tailwind`, Storage

### Al terminar

`npm run typecheck && npm run audit:i18n` — listar cambios — **no commitear**.

---

## Cola

| ID | Tarea | Notas |
|----|-------|-------|
| A | Fotos + Storage | **Pausada** — requiere plan Blaze |
| C | Tab Alertas | Después de B |
| D | Pulir UI | UX, después |

---

## Prompt 💻 Dev

```
PAUSA design system / tokens / brand / Storage.

Leé @docs/agents/ACTIVE-TASK.md — TAREA B.

Plan primero. No codees hasta mi OK.
PROHIBIDO: src/components/ui/*, docs/brand/, theme, tailwind.
```
