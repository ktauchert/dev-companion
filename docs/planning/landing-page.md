# Landing page — content & design

Public marketing surface at `/`. Authenticated app chrome (shell, Ctrl+K) starts at `/app` — see [ui-shell.md](../architecture/ui-shell.md).

**Visual direction:** Dark-first, subtle cyberpunk for coders — cyan/violet accents, faint grid, monospace kickers. Not neon overload; readable and calm like a dev tool, not a game UI.

---

## Meta

| | |
| --- | --- |
| Route | `/` |
| Audience | Solo devs, indie hackers, freelancers |
| Goal | Explain the line, invite sign-up; no fake “live” product claims |
| CTAs | Primary → `/register` · Secondary → `/login` |

---

## Header (sticky)

| Element | Copy |
| --- | --- |
| Logo / wordmark | **Dev-Companion** |
| Nav (optional MVP) | Features · Pricing |
| Secondary | Log in → `/login` |
| Primary button | Get started → `/register` |

---

## Hero

**Kicker (mono, accent):** `// your line from day one`

**Headline:** A companion for solo developers who want a **line to follow** — not another blank repo.

**Subhead:** Dev-Companion gives you structure from the start: documented artifacts, a clear SDLC path, and light recognition for **consistency** — showing up in a coherent style, not shipping volume in one sitting.

**Primary CTA:** Start free → `/register`

**Secondary CTA:** Log in → `/login`

**Trust line (small):** AI assists along the way. You stay the system of record.

---

## Value props (3 columns)

| # | Title | Body |
| --- | --- | --- |
| 1 | **Structure, not chaos** | Vision, specs, ADRs, and plans live in one place — versioned and reviewable, not lost in chat. |
| 2 | **The SDLC as rails** | Ideation → architecture → planning → delivery. A default path you can follow without adopting a religion. |
| 3 | **Consistency over intensity** | Small steps count. No streak guilt, no leaderboard — just acknowledgement that you showed up and moved forward. |

---

## How it works (short strip)

1. **Capture** — Turn a vague idea into `spec.md` and ADRs (wizard, post-MVP).  
2. **Seed** — Push docs and board structure to Git when you are ready (M2/M3).  
3. **Track** — See milestone progress from your repo without leaving the app (M4).  

*MVP note for implementer:* Steps 2–3 are roadmap; label as “coming” or keep copy future-tense — do not imply live Git/board sync on landing until shipped.

---

## Pricing

Two tiers. Pro is **planned** (Phase 4 SaaS); mark Pro as “Coming soon” or waitlist-style on the landing until Stripe ships.

### Free

**For:** Solo developers getting the line in place.

| Included | |
| --- | --- |
| Account & projects | Own your workspace |
| Document core | Persistent markdown artifacts |
| Dashboard basics | Project overview, light consistency hint |
| Local-first dev | Self-hostable stack (Postgres, your data) |

**CTA:** Get started free → `/register`

### Pro

**For:** Power users and small teams when SaaS lands.

| Included | |
| --- | --- |
| Everything in Free | |
| GitHub App & webhooks | Real-time SDLC dashboard |
| Higher AI usage | Generous ideation / spec / ADR prompts |
| Team accounts | Shared projects (Phase 6 direction) |
| Priority support | When offered |

**Price:** TBD — show “Coming soon” · **CTA:** Join waitlist → `/register` (same funnel for now) or mailto placeholder.

---

## Final CTA band

**Headline:** Ready to draw your line?

**Sub:** Create an account in under a minute. No credit card for Free.

**Button:** Create account → `/register`

---

## Footer

| Column | Links |
| --- | --- |
| Product | Features (#features) · Pricing (#pricing) |
| Project | [GitHub](https://github.com/ktauchert/dev-companion) · [Docs](../README.md) |
| Legal (placeholder) | Privacy · Terms — stub `#` until pages exist |

**Copyright:** © {year} Dev-Companion

---

## Design tokens (landing)

Reuse [ui-shell.md](../architecture/ui-shell.md) dark stone base; landing adds:

| Token | Use |
| --- | --- |
| Accent cyan | Kicker, links, primary button glow |
| Accent violet | Secondary glow, gradient mesh |
| `--grid-line` | Hero background grid (~6% opacity) |
| Font display | Space Grotesk or similar (headlines) |
| Font mono | JetBrains Mono (kickers, footer, plan labels) |

Default `<html class="dark">` on landing; theme toggle optional post-MVP.

---

## Out of scope (this page)

- Full auth UI (AP 1.3 `/login`, `/register`)
- App shell / command palette (authenticated routes)
- Blog, changelog, detailed docs mirror

---

## Nachweis

- [ ] `/` renders hero, three value props, pricing, footer CTA
- [ ] All CTAs point to `/register` or `/login`
- [ ] No TanStack Start placeholder copy
- [ ] Copy matches this doc (minor wording tweaks OK)
