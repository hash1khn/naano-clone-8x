"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, CheckCircle, Share2, SquareArrowOutUpRight } from "lucide-react";
import { CreatorHomeCard } from "@/components/creator/CreatorHomeCard";
import {
  COMMUNITY_SLACK_URL,
  type CommunityLeaderboard,
  type CommunityLeaderboardRow,
} from "@/lib/community/demo-leaderboard";
import type { OnboardingProfile } from "@/lib/creator/onboarding";
import type { CreatorCommunityCopy, CreatorHomeCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

type Metric = "impressions" | "posts";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "C") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function compactNumber(n: number) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  }
  return String(Math.round(n));
}

function CommunityAvatar({ name, url }: { name: string; url: string | null }) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) {
    return initials(name);
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="" onError={() => setFailed(true)} />
  );
}

function LeaderboardRow({
  row,
  maxValue,
  metric,
  copy,
  locale,
}: {
  row: CommunityLeaderboardRow;
  maxValue: number;
  metric: Metric;
  copy: CreatorCommunityCopy;
  locale: Locale;
}) {
  const rankClass = row.rank <= 3 ? ` top r${row.rank}` : "";
  const width = maxValue > 0 ? Math.max(5, Math.round((Number(row.value) || 0) / maxValue * 100)) : 0;
  const value =
    metric === "posts"
      ? (Number(row.value) || 0).toLocaleString(locale === "fr" ? "fr-FR" : "en-GB")
      : compactNumber(Number(row.value) || 0);
  const metricLabel = metric === "posts" ? copy.postCount : copy.estimatedImpressionCount;
  const creatorLabel = row.slug ? copy.publicCreator : copy.creatorFallback;
  const className = `cr-com-row${row.isCurrent ? " current" : ""}`;

  const body = (
    <>
      <span className={`cr-com-rank${rankClass}`}>{row.rank}</span>
      <span className="cr-com-avatar">
        <CommunityAvatar name={row.name} url={row.avatarUrl} />
      </span>
      <span className="cr-com-person">
        <b>
          {row.name}
          {row.isCurrent ? <em className="cr-com-you">{copy.you}</em> : null}
        </b>
        <span>{creatorLabel}</span>
      </span>
      <span className="cr-com-progress">
        <i style={{ width: `${width}%` }} />
      </span>
      <span className="cr-com-value">
        {value}
        <span>{metricLabel}</span>
      </span>
    </>
  );

  if (row.slug) {
    return (
      <a className={className} href={`/creators/${encodeURIComponent(row.slug)}`} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function CommunityPanel({
  locale,
  copy,
  home,
  profile,
}: {
  locale: Locale;
  copy: CreatorCommunityCopy;
  home: CreatorHomeCopy;
  profile: OnboardingProfile;
}) {
  const [metric, setMetric] = useState<Metric>("impressions");
  const [data, setData] = useState<CommunityLeaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/creator/community-leaderboard", { credentials: "same-origin", cache: "no-store" })
      .then(async (response) => {
        const body = (await response.json().catch(() => ({}))) as CommunityLeaderboard & { error?: string };
        if (!response.ok) {
          throw new Error(body.error || "leaderboard_unavailable");
        }
        return body;
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const faces: CommunityLeaderboardRow[] =
    data && (data.impressions.length ? data.impressions : data.posts).length
      ? (data.impressions.length ? data.impressions : data.posts)
      : profile.avatar_url || profile.name
        ? [{ rank: 0, name: profile.name || "Creator", avatarUrl: profile.avatar_url, slug: profile.slug, value: 0, verified: false, isCurrent: true }]
        : [];

  const rows = data?.[metric] ?? [];
  const current = data?.current?.[metric] ?? null;
  const maxValue = rows.reduce((max, row) => Math.max(max, Number(row.value) || 0), 0);
  const showCurrent = Boolean(current && !rows.some((row) => row.isCurrent));

  function showToast(message: string) {
    setToast(message);
  }

  async function copyText(value: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      /* fall through */
    }
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      area.remove();
      return true;
    } catch {
      area.remove();
      return false;
    }
  }

  async function onLinkedinAction() {
    if (!profile.slug) {
      window.location.hash = "profile";
      return;
    }
    const link = `${window.location.origin}/creators/${profile.slug}`;
    window.open("https://www.linkedin.com/in/me/", "_blank", "noopener,noreferrer");
    const copied = await copyText(link);
    showToast(copied ? copy.cardLinkReadyToast : copy.copyFailed);
  }

  let list: ReactNode;
  if (loading) {
    list = (
      <>
        <div className="cr-com-skeleton" />
        <div className="cr-com-skeleton" />
        <div className="cr-com-skeleton" />
      </>
    );
  } else if (!data) {
    list = <div className="cr-ov-empty">{copy.loadError}</div>;
  } else if (!rows.length) {
    list = <div className="cr-ov-empty">{metric === "posts" ? copy.emptyPosts : copy.emptyEstimated}</div>;
  } else {
    list = (
      <>
        {rows.map((row, index) => (
          <LeaderboardRow
            key={`${row.slug ?? row.name}-${row.rank}-${index}`}
            row={row}
            maxValue={maxValue}
            metric={metric}
            copy={copy}
            locale={locale}
          />
        ))}
        {showCurrent && current ? (
          <>
            <div className="cr-com-current-sep">{copy.yourPosition}</div>
            <LeaderboardRow row={current} maxValue={maxValue} metric={metric} copy={copy} locale={locale} />
          </>
        ) : null}
      </>
    );
  }

  return (
    <section className="page visible" id="page-community" data-screen-label={copy.title}>
      <div className="cr-com">
        <header className="cr-com-head">
          <div>
            <h1>{copy.title}</h1>
            <div className="page-sub">{copy.sub}</div>
          </div>
          <span className="cr-com-live">
            <i />
            <span>{copy.live}</span>
          </span>
        </header>

        <div className="cr-com-grid">
          <section className="cr-com-card cr-com-slack">
            <div className="cr-com-slack-main">
              <div className="cr-com-slack-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/slack-logo.png" alt="Slack" />
                <div className="cr-com-slack-faces" aria-hidden="true">
                  {faces.slice(0, 8).map((row, index) => (
                    <span key={`${row.slug ?? row.name}-${index}`} className="cr-com-slack-face">
                      <CommunityAvatar name={row.name} url={row.avatarUrl} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="cr-com-slack-copy">
                <span className="cr-com-eyebrow">{copy.slackEyebrow}</span>
                <h2>{copy.slackTitle}</h2>
                <p>{copy.slackBody}</p>
              </div>
            </div>
            <div className="cr-com-benefits">
              <span>
                <CheckCircle size={17} strokeWidth={2.2} aria-hidden />
                <span>{copy.slackBenefitFeedback}</span>
              </span>
              <span>
                <CheckCircle size={17} strokeWidth={2.2} aria-hidden />
                <span>{copy.slackBenefitTips}</span>
              </span>
              <span>
                <CheckCircle size={17} strokeWidth={2.2} aria-hidden />
                <span>{copy.slackBenefitTeam}</span>
              </span>
            </div>
            <a
              className="btn btn-primary cr-com-slack-cta"
              href={COMMUNITY_SLACK_URL || "#community"}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!COMMUNITY_SLACK_URL}
              onClick={(event) => {
                if (COMMUNITY_SLACK_URL) {
                  return;
                }
                event.preventDefault();
                showToast(copy.slackUnavailable);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lp/slack-logo.png" alt="" />
              <span>{copy.joinSlack}</span>
              <SquareArrowOutUpRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </section>

          <section className="cr-com-card cr-com-linkedin" tabIndex={-1}>
            <div className="cr-com-li-head">
              <div className="cr-com-li-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/linkedin-official.png" alt="LinkedIn" />
              </div>
              <div>
                <span className="cr-com-eyebrow">{copy.linkedinEyebrow}</span>
                <h2>{copy.linkedinAffiliateTitle}</h2>
              </div>
            </div>
            <p className="cr-com-li-intro">{copy.linkedinAffiliateBody}</p>
            <div className="cr-com-affiliate-benefit">
              <span>
                <b>25%</b>
                <small>{copy.affiliationPeriod}</small>
              </span>
              <p>{copy.affiliationBenefit}</p>
            </div>
            <div className="cr-com-li-experience">
              <span className="cr-com-li-company-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/naano-logomark.png" alt="Naano" />
              </span>
              <span className="cr-com-li-company-copy">
                <b>{copy.experienceRole}</b>
                <span>{copy.experienceCompany}</span>
                <small>{copy.experienceDates}</small>
              </span>
            </div>
            <div className="cr-com-mini-stage">
              <CreatorHomeCard copy={home} profile={profile} />
            </div>
            <button type="button" className="btn btn-primary cr-com-linkedin-cta" onClick={() => void onLinkedinAction()}>
              {profile.slug ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/linkedin-official.png" alt="" />
                  <span>{copy.addCardLinkedin}</span>
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </>
              ) : (
                <>
                  <Share2 size={16} strokeWidth={2} aria-hidden />
                  <span>{copy.publishCard}</span>
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </>
              )}
            </button>
          </section>
        </div>

        <section className="cr-com-card cr-com-board">
          <div className="cr-com-board-head">
            <div>
              <h2>{copy.leaderboardTitle}</h2>
              <p>{metric === "posts" ? copy.leaderboardPostsSub : copy.leaderboardEstimatedSub}</p>
            </div>
            <div className="cr-com-seg" role="group" aria-label={copy.metricAria}>
              <button
                type="button"
                className={metric === "impressions" ? "on" : undefined}
                onClick={() => setMetric("impressions")}
              >
                {copy.estimatedImpressions}
              </button>
              <button type="button" className={metric === "posts" ? "on" : undefined} onClick={() => setMetric("posts")}>
                {copy.posts}
              </button>
            </div>
          </div>
          <div className="cr-com-list" aria-live="polite">
            {list}
          </div>
        </section>
      </div>
      {toast ? (
        <div className="toasts">
          <div className="toast ok">{toast}</div>
        </div>
      ) : null}
    </section>
  );
}
