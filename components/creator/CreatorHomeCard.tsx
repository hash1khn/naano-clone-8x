import type { CreatorHomeCopy } from "@/lib/i18n/creator";
import type { OnboardingProfile } from "@/lib/creator/onboarding";
import {
  countryCode,
  flagEmoji,
  formatFollowerCount,
} from "@/lib/creator/onboarding";

function LinkedInMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "Y") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function CreatorHomeCard({
  copy,
  profile,
}: {
  copy: CreatorHomeCopy;
  profile: OnboardingProfile;
}) {
  const name = profile.name.trim() || "Creator";
  const niches = profile.niche_tags.filter(Boolean).slice(0, 3);
  const nichesLabel = niches.length ? niches.join(" · ") : copy.nichesFallback;
  const headline = profile.bio?.trim() || "";
  const followers = formatFollowerCount(profile.follower_count);
  const price =
    profile.price_per_post > 0 ? `€${Math.round(profile.price_per_post).toLocaleString("en-US")}` : "—";
  const flag = flagEmoji(countryCode(profile.country));
  const avatar = profile.avatar_url;

  return (
    <article className="cr-profile-preview" aria-label={copy.cardPreviewTitle}>
      <div className="cr-home-card-cover">
        <span className="cr-home-card-li" aria-hidden="true">
          <LinkedInMark />
        </span>
        <span className="cr-home-card-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lp/naano-logomark.png" alt="" />
          naano
        </span>
        {flag ? <span className="cr-home-card-flag">{flag}</span> : null}
        <button type="button" className="cr-home-card-share" aria-label={copy.shareCard} tabIndex={-1}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
        </button>
      </div>
      <div className="cr-profile-preview-body">
        <div className="cr-profile-avatar" style={{ marginLeft: "auto", marginRight: "auto" }}>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" />
          ) : (
            initialsFromName(name)
          )}
        </div>
        <div className="cr-home-card-identity">
          <h3>{name}</h3>
          <p className="cr-home-card-niches">{nichesLabel}</p>
          {headline ? <p className="cr-profile-headline">{headline}</p> : null}
        </div>
        <div className="cr-home-card-pill">{copy.noPostData}</div>
        <div className="cr-profile-stats">
          <div className="cr-profile-stat">
            <b>{followers}</b>
            <span>{copy.followers}</span>
          </div>
          <div className="cr-profile-stat">
            <b>—</b>
            <span>{copy.estImpressions}</span>
          </div>
          <div className="cr-profile-stat">
            <b>{price}</b>
            <span>{copy.chosenPrice}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
