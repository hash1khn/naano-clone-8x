"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "brand" | "creator";

export function LoginForm({ reauth }: { reauth: boolean }) {
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
        setError(data.error ?? "Login failed");
        return;
      }
      router.push(data.user?.role === "creator" ? "/creator" : "/brand");
    } catch {
      setError("Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {reauth ? <p className="text-sm text-[#6B7280]">Please sign in again to continue.</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-4 pt-1">
        <div>
          <label htmlFor="login-email" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="john@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
            Password
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
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-[#9B9A97]"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}
