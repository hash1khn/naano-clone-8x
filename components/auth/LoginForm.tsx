"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthCopy } from "@/lib/i18n/messages";

type Role = "brand" | "creator";

export function LoginForm({
  reauth,
  copy,
  oauthError,
}: {
  reauth: boolean;
  copy: AuthCopy;
  oauthError?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string; user?: { role: Role } };
      if (!res.ok) {
        setError(data.error ?? copy.loginFailed);
        return;
      }
      router.push(data.user?.role === "creator" ? "/creator" : "/brand");
    } catch {
      setError(copy.loginFailed);
    } finally {
      setPending(false);
    }
  }

  const oauthButtonClass =
    "flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white text-[15px] font-semibold text-[#111827] transition-all hover:border-[#D1D5DB] hover:bg-[#F9FAFB]";

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {reauth ? <p className="text-sm text-[#6B7280]">{copy.pleaseSignInAgain}</p> : null}
      {oauthError ? <p className="text-sm text-red-600">{copy.oauthFailed}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-3">
        <a
          href="/api/auth/oauth/start?provider=linkedin_oidc"
          className={oauthButtonClass}
          style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.05)" }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#0A66C2">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
          </svg>
          <span>{copy.continueWithLinkedIn}</span>
        </a>
        <a
          href="/api/auth/oauth/start?provider=google"
          className={oauthButtonClass}
          style={{ boxShadow: "0 2px 6px rgba(15,23,42,0.05)" }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
          </svg>
          <span>{copy.continueWithGoogle}</span>
        </a>
      </div>
      <div className="space-y-4 pt-1">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E9E9E7]" />
          <span className="text-[11px] font-medium tracking-wide text-[#9B9A97] uppercase">{copy.orContinueWithEmail}</span>
          <span className="h-px flex-1 bg-[#E9E9E7]" />
        </div>
        <div>
          <label htmlFor="login-email" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
            {copy.email}
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
            {copy.password}
          </label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 pr-11 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-[#9B9A97] transition-colors hover:bg-[#F7F6F3] hover:text-[#37352F] focus:ring-2 focus:ring-[#1652F0]/20 focus:outline-none"
              aria-label={showPassword ? copy.hidePassword : copy.showPassword}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                  <path d="m2 2 20 20" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
        >
          {pending ? copy.signingIn : copy.submitSignIn}
        </button>
      </div>
    </form>
  );
}
