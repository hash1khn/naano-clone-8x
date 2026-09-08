"use client";

import type { CreatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";
import { COUNTRIES, CREATOR_INDUSTRIES, formatExactFollowers } from "@/lib/creator/onboarding";

export function StepCardDetails({
  copy,
  name,
  bio,
  avatarUrl,
  followerCount,
  country,
  industries,
  importPaused,
  error,
  pending,
  onCountryChange,
  onToggleIndustry,
  onContinue,
  onRetryImport,
}: {
  copy: CreatorOnboardingCopy;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  followerCount: number;
  country: string;
  industries: string[];
  importPaused: boolean;
  error: string | null;
  pending?: boolean;
  onCountryChange: (value: string) => void;
  onToggleIndustry: (tag: string) => void;
  onContinue: () => void;
  onRetryImport: () => void;
}) {
  const followerLine = formatExactFollowers(followerCount);
  const canContinue = Boolean(country) && industries.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.step3Of4}</p>
        <h1 className="font-heading mt-3 text-[32px] leading-tight font-bold tracking-tight text-[#111827]">
          {copy.completeCardTitle}
        </h1>
      </div>
      {importPaused ? (
        <div className="rounded-xl bg-[#FEF9C3] px-4 py-3 text-sm text-[#854D0E]">
          <p>{copy.importPausedTitle}</p>
          <button type="button" className="mt-2 cursor-pointer font-semibold text-[#1d4ed8] hover:underline" onClick={onRetryImport}>
            {copy.importPausedRetry}
          </button>
        </div>
      ) : null}
      {followerLine || bio || avatarUrl ? (
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8EEF9] font-semibold text-[#2563eb]">
              {name.trim()[0]?.toUpperCase() || "Y"}
            </div>
          )}
          <div className="min-w-0">
            {followerLine ? (
              <p className="text-sm font-semibold text-[#111827]">
                {followerLine} {copy.followersLabel}
              </p>
            ) : null}
            {bio ? <p className="truncate text-sm text-[#6B7280]">{bio}</p> : null}
          </div>
        </div>
      ) : null}
      <div>
        <label htmlFor="creator-country" className="mb-1.5 block text-sm font-semibold text-[#111827]">
          {copy.countryLabel}
        </label>
        <p className="mb-2 text-sm text-[#6B7280]">{copy.countryHint}</p>
        <select
          id="creator-country"
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 focus:outline-none"
        >
          <option value="">Select a country</option>
          {country && !COUNTRIES.some((item) => item.name === country) ? <option value={country}>{country}</option> : null}
          {COUNTRIES.map((item) => (
            <option key={item.code} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#111827]">{copy.industriesLabel}</p>
        <p className="mt-1 text-sm text-[#6B7280]">{copy.industriesHint}</p>
        <div className="mt-3 max-h-56 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {CREATOR_INDUSTRIES.map((tag) => {
              const selected = industries.includes(tag);
              const locked = !selected && industries.length >= 3;
              return (
                <button
                  key={tag}
                  type="button"
                  disabled={locked}
                  onClick={() => onToggleIndustry(tag)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    selected
                      ? "border-[#2563eb] bg-[#EFF6FF] text-[#1d4ed8]"
                      : "border-[#E5E7EB] bg-white text-[#37352F] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {selected ? "✓ " : ""}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="button"
        disabled={!canContinue || pending}
        onClick={onContinue}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
      >
        {copy.continue}
      </button>
    </div>
  );
}
