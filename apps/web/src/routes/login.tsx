import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "#/components/auth/login-form";
import { getSessionOrNull } from "#/lib/auth-session";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/app",
  }),
  beforeLoad: async ({ search }) => {
    const session = await getSessionOrNull();
    if (session) {
      throw redirect({ to: search.redirect ?? "/app" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { redirect: redirectTo } = Route.useSearch();
  return <LoginForm redirectTo={redirectTo ?? "/app"} />;
}
