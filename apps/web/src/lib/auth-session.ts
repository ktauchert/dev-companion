import { authClient } from "#/lib/auth-client";

/** Returns session if API is reachable; null if logged out or API unavailable. */
export async function getSessionOrNull() {
  try {
    const { data } = await authClient.getSession();
    return data ?? null;
  } catch {
    return null;
  }
}
