# WOOFI — Tarea activa

**Modo:** simple (1 agente a la vez)  
**Última actualización:** julio 2026 (post tokens v2 WIP)

---

## Estado de agentes

| Agente | Estado |
|--------|--------|
| 📁 Coordinación | Activo |
| 💻 Dev | En espera de layout desktop / cablear shells |
| 🎨 UX | **Próxima:** grillas + proportions desktop (tokens/parcial hechos) |
| 🎯 Brand | **PAUSA** — guidelines OK |

---

## TAREA ACTIVA — Desktop layout usable

**Problema:** tokens v2 + soft primitives + `AppSidebar`/`AppDesktopLayout` scaffold existen (`6e74ecc`), pero **grilla, tamaños y ubicación de elementos no convencen**. Marketing/app siguen sintiéndose mal en desktop.

### Objetivo

1. Cablear sidebar en web ≥1024 (`app/(tabs)/_layout.tsx` + layout shells)
2. Una pantalla referencia (home **o** explore) con grilla desktop real según `VISUAL-DIRECTION.md`
3. Bottom tabs **solo** mobile; desktop **no** tabs abajo

### Docs a seguir

- `docs/design/VISUAL-DIRECTION.md`
- `docs/design/TOKENS-V2.md`

### PROHIBIDO

- Más tokens sueltos sin pantalla visible
- Storage / Blaze / fotos (pausado)
- Brand assets sin pedido

### Al terminar

`npm run typecheck && npm run audit:i18n` — listar archivos — no commitear sin aviso en coord.

---

## Hecho recientemente

| ID | Qué | Estado |
|----|-----|--------|
| B | Pet → lost case (`status` + `activeLostCaseId`) | ✅ |
| Marketing | `MarketingHome` en `/` web + AuthGate | ✅ (visual WIP) |
| Tokens v2 | Soft-warm primitives + layout scaffolds | ✅ parcial / visual no OK |

## Cola

| ID | Tarea | Notas |
|----|-------|-------|
| A | Fotos + Storage | Pausada — Blaze |
| C | Tab Alertas | Después |
| D | Sightings | Después |
| E | Pulir marketing proportions | Con UX |

---

## Prompt corto (pegar)

```
Leé CLAUDE.md + docs/design/VISUAL-DIRECTION.md + docs/agents/ACTIVE-TASK.md.

Prioridad: desktop layout usable (sidebar + 1 pantalla referencia).
Sin más tokens sueltos. Plan primero, archivos listados, sin código hasta OK.
```
