# Cursor Automations — WOOFI dual agents

Set up two automations in **Cursor → Automations → New automation**.

Repo: `giggiargento/woofi` · Branch: `master` (or a dedicated `agent/wip` branch if you prefer review before merge).

## 1. WOOFI Dev Agent

| Field | Value |
|-------|--------|
| **Name** | WOOFI Dev Agent |
| **Trigger** | Schedule — e.g. every weekday 9:00, or manual run now |
| **Repo** | This repo, branch `master` |

**Prompt** (paste full content of `docs/agents/DEV-AGENT.md` plus):

```
Start by reading docs/agents/COORDINATION.md.
Pick ONE priority from the list. Complete it end-to-end.
Before commit: npm run typecheck && npm run audit:i18n.
Git author: Giggi Argento <46300924+giggiargento@users.noreply.github.com>.
Update docs/CURRENT-STATUS.md if you complete a feature.
```

## 2. WOOFI UX/UI Agent

| Field | Value |
|-------|--------|
| **Name** | WOOFI UX Design System |
| **Trigger** | Schedule — e.g. 1 day after Dev, or manual; **do not run both at the exact same minute** |
| **Repo** | Same repo |

**Prompt** (paste full content of `docs/agents/UX-AGENT.md` plus):

```
Start by reading docs/agents/COORDINATION.md.
First run: produce docs/design/DESIGN-SYSTEM-AUDIT.md only — no screen refactors until audit is done.
Before commit: npm run typecheck && npm run audit:i18n.
Git author: Giggi Argento <46300924+giggiargento@users.noreply.github.com>.
```

## Avoiding conflicts

- **Stagger triggers** (Dev Mon/Wed, UX Tue/Thu) or use separate branches
- UX owns `src/components/ui/`, `theme.ts`, `tailwind.config.js`
- Dev owns `app/` logic, `src/services/`, `src/hooks/`
- Neither touches `assets/brand/` without user approval

## Cloud compute

Enable Cloud Agent in [Cursor dashboard → Cloud Agents](https://cursor.com/dashboard?tab=cloud-agents) for unattended runs.

## Quick manual start (no automation)

Open two Agent chats:

1. `@docs/agents/DEV-AGENT.md` — "Lee COORDINATION y arrancá con responsive web shell"
2. `@docs/agents/UX-AGENT.md` — "Lee COORDINATION y hacé solo el audit en docs/design/"
