import { createFileRoute, redirect } from "@tanstack/react-router";

import { RegisterForm } from "#/components/auth/register-form";
import { getSessionOrNull } from "#/lib/auth-session";

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    const session = await getSessionOrNull();
    if (session) {
      throw redirect({ to: "/app" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterForm />;
}
