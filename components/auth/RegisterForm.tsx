"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AppRole } from "@/lib/auth/oauth";
import type { AuthCopy } from "@/lib/i18n/messages";

const HEARD_ABOUT = ["linkedin", "creator", "word_of_mouth", "google", "other"] as const;
type HeardAbout = (typeof HEARD_ABOUT)[number];

const inputClass =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none";

const labelClass = "mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-[#6B7280] uppercase";

export function RegisterForm({ role, copy }: { role: AppRole; copy: AuthCopy }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [heardAbout, setHeardAbout] = useState<HeardAbout | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const heardAboutOptions: { id: HeardAbout; label: string }[] = [
    { id: "linkedin", label: copy.heardAboutLinkedIn },
    { id: "creator", label: copy.heardAboutCreator },
    { id: "word_of_mouth", label: copy.heardAboutWordOfMouth },
    { id: "google", label: copy.heardAboutGoogle },
    { id: "other", label: copy.heardAboutOther },
  ];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!heardAbout) {
      setError(copy.heardAboutRequired);
      return;
    }

    setPending(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          heard_about: heardAbout,
        }),
      });
      const data = (await res.json()) as { error?: string; user?: { role: AppRole } };
      if (!res.ok) {
        setError(data.error ?? copy.registrationFailed);
        return;
      }
      router.push(data.user?.role === "creator" ? "/creator/onboarding?step=2" : "/brand");
    } catch {
      setError(copy.registrationFailed);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="register-first-name" className={labelClass}>
            {copy.firstName}
          </label>
          <input
            id="register-first-name"
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            placeholder={copy.firstName}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="register-last-name" className={labelClass}>
            {copy.lastName}
          </label>
          <input
            id="register-last-name"
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            placeholder={copy.lastName}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="register-email" className={labelClass}>
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
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="register-password" className={labelClass}>
          {copy.password}
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder={copy.passwordPlaceholder}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </div>
      <fieldset>
        <legend className={labelClass}>{copy.heardAbout}</legend>
        <div className="flex flex-wrap gap-2">
          {heardAboutOptions.map((option) => {
            const selected = heardAbout === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setHeardAbout(option.id)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-[#2563eb] bg-[#EFF6FF] text-[#1d4ed8]"
                    : "border-[#E5E7EB] bg-white text-[#37352F] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
      >
        {pending ? copy.creatingAccount : copy.continue}
      </button>
    </form>
  );
}
