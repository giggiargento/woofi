# WOOFI — Setup de chats por agente

Cursor no permite crear chats desde el agente — **vos abrís cada chat manualmente** en la misma carpeta del proyecto (`D:\giggiland\WOOFI`).

Las reglas en `.cursor/rules/` se aplican solas según los archivos que toques. Los prompts completos viven en `docs/agents/`.

---

## Estructura recomendada

Renombrá cada chat en Cursor para identificarlos:

| Chat | Emoji | Nombre sugerido |
|------|-------|-----------------|
| General / coordinación | 📁 | WOOFI |
| Desarrollo | 💻 | WOOFI · Dev Agent |
| Diseño UI | 🎨 | WOOFI · UX/UI Agent |
| Marca | 🎯 | WOOFI · Brand Agent |

---

## Cómo abrir un chat de agente

1. Abrí el proyecto `D:\giggiland\WOOFI` en Cursor
2. **New Chat** (Agent mode)
3. Renombrá el chat (click en el título)
4. Pegá **solo el mensaje inicial** de abajo — no hace falta pegar el prompt entero

---

## Mensaje inicial — 💻 Dev Agent

```
Sos el WOOFI Dev Agent. Leé @docs/agents/COORDINATION.md y @docs/agents/DEV-AGENT.md.

Resumí el estado actual y proponé el próximo paso (un solo scope). No empieces a codear hasta que apruebe el plan.

Contexto reciente: WebShell ya está en tabs; ver @src/components/layout/WebShell.tsx y @docs/CURRENT-STATUS.md.
```

---

## Mensaje inicial — 🎨 UX/UI Agent

```
Sos el WOOFI UX/UI Design System Agent. Leé @docs/agents/COORDINATION.md y @docs/agents/UX-AGENT.md.

Resumí el audit y proponé Phase 1 (tokens + design preview). No toques Firebase ni lógica de negocio.

Audit: @docs/design/DESIGN-SYSTEM-AUDIT.md
```

---

## Mensaje inicial — 🎯 Brand Agent

```
Sos el WOOFI Brand Agent. Leé @docs/agents/COORDINATION.md y @docs/agents/BRAND-AGENT.md.

Assets actuales: @assets/brand/README.md

Resumí la marca y proponé el próximo entregable (guidelines, variantes de logo, o alineación de colores con UX). No toques componentes UI ni Firebase.
```

---

## Mensaje inicial — 📁 WOOFI (chat general)

```
Chat de coordinación WOOFI. Leé @docs/agents/COORDINATION.md y @docs/CURRENT-STATUS.md.

Acá decidimos prioridades, repartimos tareas entre Dev / UX / Brand, y revisamos PRs o commits. No implementes features grandes acá — derivá al chat del agente correcto.
```

---

## Reglas automáticas (ya en el repo)

| Regla | Cuándo aplica |
|-------|----------------|
| `woofi-coordination.mdc` | Siempre |
| `woofi-dev-agent.mdc` | `app/`, services, hooks, firebase |
| `woofi-ux-agent.mdc` | `components/ui`, theme, tailwind |
| `woofi-brand-agent.mdc` | `assets/brand`, `docs/brand` |

---

## Tips

- **Un agente = un chat** — no mezcles Dev y UX en el mismo hilo largo
- Usá `@archivo` para dar contexto sin pegar prompts enteros
- Si un agente necesita algo del otro, anotá en `docs/CURRENT-STATUS.md` o pedí en el chat 📁
- Commits: solo cuando el flujo funciona; autor `Giggi Argento`
