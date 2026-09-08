"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppRole } from "@/lib/auth/oauth";
import type { AuthCopy } from "@/lib/i18n/messages";

export function RegisterForm({ role, copy }: { role: AppRole; copy: AuthCopy }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = (await res.json()) as { error?: string; user?: { role: AppRole } };
      if (!res.ok) {
        setError(data.error ?? copy.registrationFailed);
        return;
      }
      router.push(data.user?.role === "creator" ? "/creator" : "/brand");
    } catch {
      setError(copy.registrationFailed);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div>
        <label htmlFor="register-email" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
          {copy.email}
        </label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
          {copy.password}
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
      >
        {pending ? copy.creatingAccount : copy.submitCreateAccount}
      </button>
    </form>
  );
}
