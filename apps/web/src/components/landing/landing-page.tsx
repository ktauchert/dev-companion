import { Link } from '@tanstack/react-router'

const features = [
  {
    title: 'Structure, not chaos',
    body: 'Vision, specs, ADRs, and plans live in one place — versioned and reviewable, not lost in chat.',
  },
  {
    title: 'The SDLC as rails',
    body: 'Ideation → architecture → planning → delivery. A default path without adopting a religion.',
  },
  {
    title: 'Consistency over intensity',
    body: 'Small steps count. No streak guilt, no leaderboard — just acknowledgement that you showed up.',
  },
] as const

const steps = [
  { n: '01', label: 'Capture', detail: 'Turn ideas into spec.md and ADRs.' },
  { n: '02', label: 'Seed', detail: 'Push docs and board structure to Git when ready.' },
  { n: '03', label: 'Track', detail: 'Milestone progress from your repo, in one view.' },
] as const

const freeFeatures = [
  'Account & projects',
  'Document core (markdown artifacts)',
  'Dashboard basics',
  'Local-first, self-hostable stack',
] as const

const proFeatures = [
  'Everything in Free',
  'GitHub App & webhooks',
  'Higher AI usage',
  'Team accounts',
  'Priority support',
] as const

function CtaButton({
  to,
  variant = 'primary',
  children,
}: {
  to: string
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}) {
  const base =
    'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-all'
  const styles = {
    primary:
      'bg-primary text-primary-foreground shadow-[0_0_24px_-4px_var(--glow-cyan)] hover:shadow-[0_0_32px_-2px_var(--glow-cyan)]',
    secondary:
      'border border-border bg-card/60 text-foreground backdrop-blur hover:border-primary/40 hover:bg-card',
    ghost: 'text-muted-foreground hover:text-foreground',
  }
  return (
    <Link to={to} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  )
}

export function LandingPage() {
  const year = new Date().getFullYear()

  return (
    <div className="landing-bg min-h-screen text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            Dev<span className="text-primary">-</span>Companion
          </Link>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <CtaButton to="/login" variant="ghost">
              Log in
            </CtaButton>
            <CtaButton to="/register" variant="primary">
              Get started
            </CtaButton>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="landing-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              // your line from day one
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A companion for solo developers who want a{' '}
              <span className="bg-gradient-to-r from-primary to-[var(--accent-violet)] bg-clip-text text-transparent">
                line to follow
              </span>
              — not another blank repo.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Dev-Companion gives you structure from the start: documented artifacts, a clear SDLC
              path, and light recognition for <strong className="text-foreground">consistency</strong>
              — showing up in a coherent style, not shipping volume in one sitting.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton to="/register" variant="primary">
                Start free
              </CtaButton>
              <CtaButton to="/login" variant="secondary">
                Log in
              </CtaButton>
            </div>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              AI assists along the way. You stay the system of record.
            </p>
          </div>
        </section>

        <section id="features" className="border-t border-border/60 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-2xl font-bold sm:text-3xl">
              Built for the way you actually work
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="landing-card rounded-lg border border-border/80 bg-card/40 p-6 backdrop-blur-sm"
                >
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-center text-xl font-semibold text-muted-foreground">
              How it unfolds
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="rounded-lg border border-dashed border-border/60 px-4 py-5 text-center"
                >
                  <span className="font-mono text-xs text-primary">{s.n}</span>
                  <p className="font-display mt-2 font-semibold">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
              Git seeding &amp; external tracking — on the roadmap (M2–M4).
            </p>
          </div>
        </section>

        <section id="pricing" className="border-t border-border/60 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-center text-2xl font-bold sm:text-3xl">
              Simple plans
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
              Start on Free. Pro unlocks SaaS power when we ship it.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="landing-card flex flex-col rounded-lg border border-primary/30 bg-card/50 p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">Free</p>
                <p className="font-display mt-2 text-3xl font-bold">$0</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  For solo developers getting the line in place.
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {freeFeatures.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CtaButton to="/register" variant="primary">
                    Get started free
                  </CtaButton>
                </div>
              </article>

              <article className="landing-card flex flex-col rounded-lg border border-border/80 bg-card/30 p-8 opacity-95">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent-violet)]">
                    Pro
                  </p>
                  <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                    Coming soon
                  </span>
                </div>
                <p className="font-display mt-2 text-3xl font-bold">TBD</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  GitHub App, teams, and generous AI when SaaS lands.
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {proFeatures.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--accent-violet)]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CtaButton to="/register" variant="secondary">
                    Join waitlist
                  </CtaButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 px-4 py-20 sm:px-6">
          <div className="landing-cta-band mx-auto max-w-3xl rounded-xl border border-primary/20 px-6 py-12 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to draw your line?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Create an account in under a minute. No credit card for Free.
            </p>
            <div className="mt-8">
              <CtaButton to="/register" variant="primary">
                Create account
              </CtaButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} Dev-Companion
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a
              href="https://github.com/ktauchert/dev-companion"
              className="hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
