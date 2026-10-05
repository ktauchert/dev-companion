import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterPlaceholder,
})

function RegisterPlaceholder() {
  return (
    <div className="landing-bg flex min-h-screen flex-col items-center justify-center px-4">
      <div className="landing-card max-w-md rounded-lg border border-border/80 bg-card/50 p-8 text-center backdrop-blur-sm">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">// auth</p>
        <h1 className="font-display mt-2 text-2xl font-bold">Create account</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Registration UI ships with AP 1.3. This route exists so landing CTAs resolve.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm text-primary hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
