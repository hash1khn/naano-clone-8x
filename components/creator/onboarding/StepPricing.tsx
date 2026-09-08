"use client";

import type { CreatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";
import { formatExactFollowers } from "@/lib/creator/onboarding";

export function StepPricing({
  copy,
  name,
  bio,
  avatarUrl,
  followerCount,
  price,
  pending,
  error,
  onCreate,
  onEditIndustries,
}: {
  copy: CreatorOnboardingCopy;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  followerCount: number;
  price: number;
  pending: boolean;
  error: string | null;
  onCreate: () => void;
  onEditIndustries: () => void;
}) {
  const followerLine = formatExactFollowers(followerCount);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.step4Of4}</p>
        <h1 className="font-heading mt-3 text-[32px] leading-tight font-bold tracking-tight text-[#111827]">
          {copy.completeCardTitle}
        </h1>
      </div>
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
      <button type="button" className="cursor-pointer text-sm font-medium text-[#2563eb] hover:underline" onClick={onEditIndustries}>
        ← {copy.editIndustries}
      </button>
      <div className="rounded-2xl border border-[#BFDBFE] bg-white p-5">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563eb] uppercase">{copy.recommendationLabel}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{copy.recommendationBody}</p>
        <div className="mt-4 rounded-xl bg-[#F3F4F6] px-4 py-4 text-center">
          <p className="text-2xl font-bold text-[#111827]">
            € {Math.round(price)} {copy.perPost}
          </p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#6B7280]">{copy.recommendationNote}</p>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={onCreate}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-all hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
        style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.24)" }}
      >
        {pending ? copy.creatingProfile : copy.createProfile}
      </button>
      <button
        type="button"
        disabled
        className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#111827] opacity-70"
      >
        {copy.addBundle}
      </button>
    </div>
  );
}
