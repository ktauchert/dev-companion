import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { authClient, signOut, useSession } from "#/lib/auth-client";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }

    return { session };
  },
  component: AppWelcome,
});

function AppWelcome() {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/" });
  };

  if (isPending) {
    return (
      <div className="landing-bg flex min-h-screen items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Loading session…</p>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="landing-bg min-h-screen">
      <header className="border-b border-border/60 bg-card/80 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg font-bold">
            Dev<span className="text-primary">-</span>Companion
          </Link>
          <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
            Log out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">
          // welcome
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold">
          Hello{user?.name ? `, ${user.name}` : ""}.
        </h1>
        <p className="mt-4 text-muted-foreground">
          You are signed in as{" "}
          <span className="font-medium text-foreground">{user?.email}</span>.
          This is your protected home — project overview and the full shell arrive
          in later work packages.
        </p>
        <div className="landing-card mt-10 rounded-lg border border-border/80 bg-card/40 p-6">
          <p className="font-mono text-xs text-muted-foreground">next · AP 1.5+</p>
          <p className="mt-2 text-sm text-foreground">
            Create a project, save documents, and see consistency hints on the
            dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}
