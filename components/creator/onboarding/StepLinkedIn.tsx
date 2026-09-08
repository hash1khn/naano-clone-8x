"use client";

import type { CreatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";

const inputClass =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] transition-all placeholder:text-[#9CA3AF] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none";

export function StepLinkedIn({
  copy,
  url,
  pending,
  error,
  onUrlChange,
  onImport,
}: {
  copy: CreatorOnboardingCopy;
  url: string;
  pending: boolean;
  error: string | null;
  onUrlChange: (value: string) => void;
  onImport: () => void;
}) {
  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        onImport();
      }}
    >
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.step2Of4}</p>
        <h1 className="font-heading mt-3 text-[32px] leading-tight font-bold tracking-tight text-[#111827]">
          {copy.addLinkedInTitle}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[#6B7280]">{copy.addLinkedInBody}</p>
      </div>
      <div>
        <label htmlFor="linkedin-url" className="mb-1.5 block text-[11px] font-semibold tracking-[0.12em] text-[#6B7280] uppercase">
          {copy.linkedInUrlLabel}
        </label>
        <input
          id="linkedin-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder={copy.linkedInUrlPlaceholder}
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          className={inputClass}
        />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3 rounded-xl bg-[#EFF6FF] px-4 py-3 text-[13px] leading-relaxed text-[#1e40af]">
        <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
        <p>{copy.importAuthorize}</p>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
      >
        {pending ? copy.importing : copy.importProfile}
      </button>
    </form>
  );
}
