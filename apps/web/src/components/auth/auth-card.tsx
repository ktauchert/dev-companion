import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type AuthCardProps = {
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({
  kicker = "// auth",
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="landing-bg flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="landing-card w-full max-w-md rounded-lg border border-border/80 bg-card/50 p-8 backdrop-blur-sm">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">
          {kicker}
        </p>
        <h1 className="font-display mt-2 text-2xl font-bold">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-6">{children}</div>
        {footer ?? (
          <Link
            to="/"
            className="mt-6 inline-block text-sm text-primary hover:underline"
          >
            ← Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
