# UI shell — layout, theme, command palette

**Source of truth (prior work):** sibling repos `dev-os_OLD` (implemented) and `dev-os/documents/04-ui-und-ux.md` (spec). Dev-Companion inherits the same interaction model; naming and storage keys use `dev-companion-*` when ported.

## Interaction model

Built for developers who prefer keyboard flow over hunting a permanent sidebar.

| Principle | Meaning |
| --- | --- |
| Canvas-first | Current screen owns the space |
| Palette-first | App-wide navigation via **Ctrl+K** / **⌘K** |
| Thin context strip | Header shows *where am I?* — not a link farm |
| On-demand panels | AI, filters, details: Sheet/Dialog, closable |
| No default sidebar | Global nav lives in the command palette (MVP) |

**Exception:** `/projects` may use a **project rail** (list + “New”) — local to that route, not global nav.

## Shell layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Context strip: project · SDLC phase · focus hint  [theme] ⌘K │
├─────────────────────────────────────────────────────────────┤
│                     Main canvas (route outlet)               │
├─────────────────────────────────────────────────────────────┤
│ Status bar: project · phase · setup · work · next · sync …   │
└─────────────────────────────────────────────────────────────┘

        ┌──────────────────────┐
        │ Command palette      │  ← modal, Ctrl+K / ⌘K
        │ [ Search…          ] │
        └──────────────────────┘
```

### Context strip (header)

- Active project name, SDLC phase, optional “today’s focus”
- Button hint for palette + theme toggle
- Not a sitemap

### Status bar (footer)

VS Code–style **project telemetry**, not navigation. Configurable field slots (order/on-off later).

| Field (MVP examples) | Purpose |
| --- | --- |
| Project | Name; switch via palette |
| SDLC | Current lifecycle phase |
| Setup | e.g. `Setup 2/3` from onboarding checklist |
| Work | Open / in-progress counts (when work mgmt exists) |
| Next | One encouraging next-step hint (no scores/streaks) |
| Sync | `Local` / `Synced` until live API |

**Note:** This is not a breadcrumb bar. Location context lives in the header strip; the footer is operational status.

### Command palette

| Piece | Stack |
| --- | --- |
| Library | [cmdk](https://github.com/pacocoursey/cmdk) |
| UI | shadcn [Command](https://ui.shadcn.com/docs/components/command) |

**MVP groups:**

1. Navigate — Home, Projects, Dashboard (`/app`)
2. Open project — one entry per project
3. Create — New project
4. App — Toggle theme, Sign out

## Theme (shadcn tokens)

shadcn/ui components as-is. Customize **semantic CSS variables only** — no one-off hex in feature code.

| Control | Values | Default |
| --- | --- | --- |
| Mode | `light` · `dark` | `dark` |
| Accent | `stone` · `cyan` · `orange` · `violet` | `stone` |

- **Light:** “Paper” — warm off-white (stone), low glare
- **Dark:** stone surfaces; accent overrides `--primary`, `--ring`, focus/chart via `data-accent` on `<html>`
- Persist: `localStorage` (`dev-companion-theme-mode`, `dev-companion-theme-accent`)
- Apply: class `dark` + `data-accent="cyan"` etc.

Tailwind classes: `bg-background`, `text-foreground`, `bg-primary`, `border-border`, `bg-muted`, `text-muted-foreground`, `ring-ring`.

Reference implementation: `dev-os_OLD/frontend/src/styles.css`, `lib/theme.ts`, `components/theme-provider.tsx`.

## Feature modules (web)

| Module | Role |
| --- | --- |
| `features/shell/` | Context strip, status bar, command palette, shortcuts |
| `features/auth/` | Login, register |
| `features/projects/` | Rail, create, detail, setup (AP 1.5+) |
| `features/work/` | Kanban (later) |
| `features/sdlc/` | Phase map, next step (later) |

Routes stay thin; shell wraps authenticated routes from `__root.tsx` or an `/app` layout route.

## Port checklist (dev-os_OLD → dev-companion)

Reference files under `dev-os_OLD/frontend/src/`:

| File | Role |
| --- | --- |
| `features/shell/app-shell.tsx` | Column layout: header, main, footer, palette |
| `features/shell/context-strip.tsx` | Header |
| `features/shell/status-bar.tsx` | Footer telemetry |
| `features/shell/command-palette.tsx` | Ctrl+K dialog |
| `features/shell/shell-context.tsx` | Project shell state |
| `components/ui/command.tsx` | shadcn Command |
| `styles.css` | Theme tokens (oklch paper + dark accents) |

**Dependencies to add in `apps/web`:** `cmdk`, `lucide-react`, shadcn init + Command, Button, Dialog, etc.

## Public vs authenticated chrome

| Route | Chrome |
| --- | --- |
| `/`, `/login`, `/register` | Marketing/minimal — **no** full shell |
| `/app`, `/projects`, … | Full shell (context strip + status bar + palette) |

## Further reading

- [Tech stack](tech-stack.md) — Tailwind, shadcn
- [AP 1.3](../planning/phases/phase1/ap-1.3-datenbank.md) — auth + first `/app`
- [AP 1.7](../planning/phases/phase1/ap-1.7-dashboard.md) — dashboard content inside shell
- Prior spec: `../dev-os/documents/04-ui-und-ux.md` (sibling repo, absolute path on dev machine)
