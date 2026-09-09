"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  countryCode,
  flagEmoji,
  formatFollowerCount,
  type OnboardingProfile,
} from "@/lib/creator/onboarding";
import type { CreatorProfileCopy } from "@/lib/i18n/creator";

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

export function CreatorFlipCard({
  copy,
  profile,
  onShare,
}: {
  copy: CreatorProfileCopy;
  profile: OnboardingProfile;
  onShare?: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const name = profile.name.trim() || "Creator";
  const niches = profile.niche_tags.filter(Boolean).slice(0, 3);
  const nichesLabel = niches.length ? niches.join(" · ") : "B2B";
  const headline = profile.bio?.trim() || "";
  const followers = formatFollowerCount(profile.follower_count);
  const price =
    profile.price_per_post > 0 ? `€${Math.round(profile.price_per_post).toLocaleString("en-US")}` : "—";
  const flag = flagEmoji(countryCode(profile.country));
  const avatar = profile.avatar_url;

  return (
    <div className={`cr-flip-scene${flipped ? " is-back" : ""}`}>
      <div className={`cr-flip-card${flipped ? " is-flipped" : ""}`}>
        <section
          className="cr-flip-face cr-flip-front"
          aria-label={copy.cardFrontAria.replace("{name}", name)}
          aria-hidden={flipped}
        >
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
            <button
              type="button"
              className="cr-home-card-share"
              aria-label={copy.shareCard}
              onClick={(event) => {
                event.stopPropagation();
                onShare?.();
              }}
            >
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
            <div className="cr-flip-data-bar" aria-hidden="true">
              <span>{copy.dataLabel}</span>
              <i />
              <span>{copy.dataPending}</span>
            </div>
            <div className="cr-profile-stats">
              <div className="cr-profile-stat">
                <b>{followers}</b>
                <span>{copy.followers}</span>
              </div>
              <div className="cr-profile-stat">
                <b>—</b>
                <span>{copy.impressions}</span>
              </div>
              <div className="cr-profile-stat">
                <b>{price}</b>
                <span>{copy.chosenCost}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="cr-flip-toggle"
            aria-label={copy.flipToBack}
            onClick={() => setFlipped(true)}
          >
            <ChevronDown size={16} />
          </button>
        </section>

        <section
          className="cr-flip-face cr-flip-back"
          aria-label={copy.cardBackAria.replace("{name}", name)}
          aria-hidden={!flipped}
        >
          <div className="cr-flip-back-cover">
            <div className="cr-profile-avatar cr-flip-back-avatar">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" />
              ) : (
                initialsFromName(name)
              )}
            </div>
          </div>
          <div className="cr-flip-back-body">
            <h3>{copy.performanceTitle}</h3>
            <p>{copy.performanceSub}</p>
            <dl className="cr-flip-back-metrics">
              <div>
                <dt>{copy.followers}</dt>
                <dd>{followers}</dd>
              </div>
              <div>
                <dt>{copy.impressions}</dt>
                <dd>—</dd>
              </div>
              <div>
                <dt>{copy.engagement}</dt>
                <dd>—</dd>
              </div>
            </dl>
            <div className="cr-flip-back-note">{copy.publicDataNote}</div>
            <div className="cr-flip-back-panel">
              <h4>{copy.sectionAbout}</h4>
              {niches.length ? (
                <div className="cr-mycard-tags">
                  {niches.map((tag) => (
                    <span key={tag} className="cr-flip-back-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p>{copy.emptySection}</p>
              )}
            </div>
            <div className="cr-flip-back-panel">
              <h4>{copy.sectionAudience}</h4>
              <p>{copy.audiencePending}</p>
            </div>
          </div>
          <button
            type="button"
            className="cr-flip-toggle is-back"
            aria-label={copy.flipToFront}
            onClick={() => setFlipped(false)}
          >
            <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />
          </button>
        </section>
      </div>
    </div>
  );
}
