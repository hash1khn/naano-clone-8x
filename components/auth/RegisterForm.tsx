"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "brand" | "creator";

function roleFromSearch(role: string | undefined): Role {
  if (role === "influencer") {
    return "creator";
  }
  if (role === "saas") {
    return "brand";
  }
  if (role === "creator" || role === "brand") {
    return role;
  }
  return "brand";
}

export function RegisterForm({ presetRole }: { presetRole?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(roleFromSearch(presetRole));
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
      const data = (await res.json()) as { error?: string; user?: { role: Role } };
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }
      router.push(data.user?.role === "creator" ? "/creator" : "/brand");
    } catch {
      setError("Registration failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={onSubmit}>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="sr-only">Account type</legend>
        <label className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold ${role === "brand" ? "border-[#2563eb] bg-[#EFF6FF] text-[#1d4ed8]" : "border-[#E5E7EB] text-[#111827]"}`}>
          <input className="sr-only" type="radio" name="role" value="brand" checked={role === "brand"} onChange={() => setRole("brand")} />
          Brand
        </label>
        <label className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold ${role === "creator" ? "border-[#2563eb] bg-[#EFF6FF] text-[#1d4ed8]" : "border-[#E5E7EB] text-[#111827]"}`}>
          <input className="sr-only" type="radio" name="role" value="creator" checked={role === "creator"} onChange={() => setRole("creator")} />
          Creator
        </label>
      </fieldset>
      <div>
        <label htmlFor="register-email" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
          Email
        </label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" className="mb-1.5 ml-1 block text-xs font-semibold tracking-wide text-[#5C5B57] uppercase">
          Password
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
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
