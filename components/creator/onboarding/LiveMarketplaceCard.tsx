import type { AuthCopy } from "@/lib/i18n/messages";
import type { CreatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";
import {
  countryCode,
  flagEmoji,
  formatFollowerCount,
} from "@/lib/creator/onboarding";

export type MarketplaceCardProfile = {
  name: string;
  bio: string | null;
  avatar_url: string | null;
  country: string | null;
  follower_count: number;
  niche_tags: string[];
  price_per_post: number;
};

function LinkedInMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "Y") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase();
}

export function LiveMarketplaceCard({
  copy,
  onboarding,
  profile,
}: {
  copy: Pick<
    AuthCopy,
    | "marketplaceCardLabel"
    | "marketplaceCardTitle"
    | "marketplaceCardBody"
    | "yourName"
    | "headlinePlaceholder"
    | "dataLabel"
    | "pending"
    | "followers"
    | "estImpressions"
    | "costPerPost"
  >;
  onboarding?: Pick<CreatorOnboardingCopy, "potentialCost">;
  profile?: MarketplaceCardProfile | null;
}) {
  const name = profile?.name?.trim() || copy.yourName;
  const headline = profile?.bio?.trim() || copy.headlinePlaceholder;
  const industries = profile?.niche_tags?.length ? profile.niche_tags.join(" · ") : null;
  const followers = formatFollowerCount(profile?.follower_count ?? 0);
  const price = profile?.price_per_post && profile.price_per_post > 0 ? `€${Math.round(profile.price_per_post)}` : "—";
  const costLabel = profile?.price_per_post && profile.price_per_post > 0 ? (onboarding?.potentialCost ?? copy.costPerPost) : copy.costPerPost;
  const flag = flagEmoji(countryCode(profile?.country));
  const avatar = profile?.avatar_url;
  const imported = Boolean(profile?.bio !== null && profile?.bio !== undefined && profile.bio !== "");

  return (
    <div className="hidden flex-1 flex-col items-center justify-center bg-[#F3F6FB] px-10 py-16 lg:flex">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2563eb] uppercase">{copy.marketplaceCardLabel}</p>
        <h2 className="font-heading mt-3 text-[28px] leading-tight font-bold tracking-tight text-[#111827]">
          {copy.marketplaceCardTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{copy.marketplaceCardBody}</p>
        <div
          className="mt-8 overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: "0 18px 50px rgba(15, 23, 42, 0.1)" }}
        >
          <div
            className="relative flex h-[88px] items-start justify-center pt-4"
            style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)" }}
          >
            <span className="absolute top-4 left-4">
              <LinkedInMark />
            </span>
            <span className="text-sm font-bold tracking-tight text-white">naano</span>
            {flag ? <span className="absolute top-3.5 right-4 text-lg leading-none">{flag}</span> : null}
          </div>
          <div className="relative px-5 pt-0 pb-5">
            <div className="-mt-8 flex justify-center">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt=""
                  className="h-16 w-16 rounded-full border-4 border-white object-cover"
                  style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.12)" }}
                />
              ) : (
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#E8EEF9] text-lg font-semibold text-[#2563eb]"
                  style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.12)" }}
                >
                  {initialsFromName(name)}
                </div>
              )}
            </div>
            <div className="mt-3 text-center">
              <p className="font-semibold text-[#111827]">{name}</p>
              {industries ? <p className="mt-1 text-sm text-[#6B7280]">{industries}</p> : null}
              <p className="mt-1 text-sm leading-snug text-[#6B7280]">{headline}</p>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs font-medium text-[#6B7280]">
              <span>{copy.dataLabel}</span>
              <span>{copy.pending}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF2F7]">
              <div className={`h-full rounded-full bg-[#BFDBFE] ${imported ? "w-2/5" : "w-1/5"}`} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#F3F4F6] pt-4">
              {[
                [copy.followers, followers],
                [copy.estImpressions, "—"],
                [costLabel, price],
              ].map(([label, value]) => (
                <div key={label} className="text-center">
                  <p className="text-base font-semibold text-[#111827]">{value}</p>
                  <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
