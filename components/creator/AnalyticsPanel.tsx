"use client";

import { useState } from "react";
import { Activity, Eye, FileText, ShieldCheck, Users } from "lucide-react";
import type { OnboardingProfile } from "@/lib/creator/onboarding";
import type { CreatorAnalyticsCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

type Range = "30" | "90" | "all";

function formatCount(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB").format(value);
}

export function AnalyticsPanel({
  locale,
  copy,
  profile,
}: {
  locale: Locale;
  copy: CreatorAnalyticsCopy;
  profile: OnboardingProfile;
}) {
  const [range, setRange] = useState<Range>("all");
  const followers = Math.max(0, profile.follower_count || 0);
  const posts = 0;
  const engagements = 0;
  const postsWithReach = 0;
  const coverage = 0;

  const kpis = [
    {
      id: "posts",
      label: copy.postsKpi,
      value: formatCount(posts, locale),
      note: copy.postsKpiHint,
      Icon: FileText,
    },
    {
      id: "reach",
      label: copy.reachKpi,
      value: copy.pendingValue,
      note: copy.reachPending,
      Icon: Eye,
    },
    {
      id: "engagements",
      label: copy.engagementsKpi,
      value: formatCount(engagements, locale),
      note: copy.engagementsKpiHint,
      Icon: Activity,
    },
    {
      id: "followers",
      label: copy.followersKpi,
      value: followers > 0 ? formatCount(followers, locale) : copy.pendingValue,
      note: copy.followersKpiHint,
      Icon: Users,
    },
  ] as const;

  const funnel = [
    { label: copy.followersKpi, value: followers },
    { label: copy.postsKpi, value: posts },
    { label: copy.postsWithReach, value: postsWithReach },
  ];
  const funnelMax = Math.max(...funnel.map((step) => step.value), 1);

  return (
    <section className="page visible" id="page-analytics" data-screen-label={copy.title}>
      <div className="cr-an-shell">
        <div className="page-head cr-an-head">
          <div>
            <h1>{copy.title}</h1>
            <div className="page-sub">{copy.sub}</div>
          </div>
          <select
            className="select cr-an-range"
            aria-label={copy.periodAria}
            value={range}
            onChange={(event) => setRange(event.target.value as Range)}
          >
            <option value="30">{copy.last30}</option>
            <option value="90">{copy.last90}</option>
            <option value="all">{copy.allTime}</option>
          </select>
        </div>

        <div className="cr-an-hero">
          <div>
            <div className="cr-an-eyebrow">
              <i />
              <span>{copy.snapshotEyebrow}</span>
            </div>
            <h2>{copy.heroPending}</h2>
            <p>{copy.heroPendingSub}</p>
          </div>
          <div className="cr-an-hero-side">
            <b>{coverage}%</b>
            <span>{copy.coverageLabel}</span>
            <span className="cr-an-source">
              <i />
              <span>{copy.sourceEmpty}</span>
            </span>
          </div>
        </div>

        <div className="cr-an-kpis">
          {kpis.map(({ id, label, value, note, Icon }) => (
            <div key={id} className="cr-an-kpi">
              <div className="cr-an-kpi-top">
                <span>{label}</span>
                <span className="cr-an-kpi-icon">
                  <Icon size={16} strokeWidth={1.8} aria-hidden />
                </span>
              </div>
              <b>{value}</b>
              <small>{note}</small>
            </div>
          ))}
        </div>

        <div className="cr-an-grid">
          <div className="card cr-an-card">
            <div className="cr-an-card-head">
              <div>
                <b>{copy.collabPerformance}</b>
                <span>{copy.collabPerformanceSub}</span>
              </div>
            </div>
            <div className="cr-an-list">
              <div className="cr-an-empty">
                <b>{copy.emptyTitle}</b>
                {copy.emptyBody}
              </div>
            </div>
          </div>

          <aside className="card cr-an-card">
            <div className="cr-an-card-head">
              <div>
                <b>{copy.funnelTitle}</b>
                <span>{copy.funnelSub}</span>
              </div>
            </div>
            <div className="cr-an-funnel">
              {funnel.map((step) => {
                const width = step.value > 0 ? Math.max(6, Math.round((step.value / funnelMax) * 100)) : 0;
                return (
                  <div key={step.label} className="cr-an-funnel-row">
                    <span>{step.label}</span>
                    <b>{formatCount(step.value, locale)}</b>
                    <span className="cr-an-funnel-track">
                      <i style={{ width: `${width}%` }} />
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="cr-an-quality">
          <div className="cr-an-quality-main">
            <span className="cr-an-quality-icon">
              <ShieldCheck size={18} strokeWidth={1.8} aria-hidden />
            </span>
            <div>
              <b>{copy.qualityPendingTitle}</b>
              <p>{copy.qualityPendingBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
