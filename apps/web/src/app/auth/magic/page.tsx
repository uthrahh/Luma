"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Consumes a magic-link redirect. Supabase's hosted /auth/v1/verify sends
 * the session back as a URL hash fragment (#access_token=...&refresh_token=...),
 * not a ?code= query param, so this needs its own handler distinct from
 * /auth/callback (which only handles the PKCE code-exchange flow used by
 * email/password signup confirmation and OAuth).
 */
export default function MagicLinkPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) {
      setError("This link is missing or expired.");
      return;
    }

    const supabase = createClient();
    supabase.auth.setSession({ access_token, refresh_token }).then(({ error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message);
        return;
      }
      router.replace("/home");
      router.refresh();
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <p className="text-sm text-ink-soft">{error ?? "Signing you in…"}</p>
    </div>
  );
}
