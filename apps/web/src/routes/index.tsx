import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Dev-Companion</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Idea-to-Repo &amp; SDLC Orchestrator — seed documentation, sync boards, track progress.
      </p>
    </div>
  )
}
