"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Check,
  ChevronRight,
  Copy,
  Eye,
  FileText,
  IdCard,
  Share2,
  Users,
} from "lucide-react";
import { CreatorHomeCard } from "@/components/creator/CreatorHomeCard";
import type { OnboardingProfile } from "@/lib/creator/onboarding";
import { formatFollowerCount } from "@/lib/creator/onboarding";
import type { CreatorHomeCopy } from "@/lib/i18n/creator";

type Kpi = {
  id: string;
  label: string;
  value: string;
  note: string;
  href: string;
  Icon: typeof Eye;
};

export function HomePanel({
  copy,
  profile,
}: {
  copy: CreatorHomeCopy;
  profile: OnboardingProfile;
}) {
  const [copied, setCopied] = useState(false);
  const cardUrl = useMemo(() => {
    const path = profile.slug ? `/creators/${profile.slug}` : "/creator#profile";
    if (typeof window === "undefined") {
      return path;
    }
    return `${window.location.origin}${path}`;
  }, [profile.slug]);

  const priceReady = profile.price_per_post > 0 && profile.niche_tags.length > 0;

  const kpis: Kpi[] = [
    {
      id: "reach",
      label: copy.reachKpi,
      value: "—",
      note: copy.reachPending,
      href: "#analytics",
      Icon: Eye,
    },
    {
      id: "posts",
      label: copy.postsKpi,
      value: "0",
      note: copy.postsKpiHint,
      href: "#analytics",
      Icon: FileText,
    },
    {
      id: "engagements",
      label: copy.engagementsKpi,
      value: "0",
      note: copy.engagementsKpiHint,
      href: "#analytics",
      Icon: Activity,
    },
    {
      id: "followers",
      label: copy.followersKpi,
      value: formatFollowerCount(profile.follower_count),
      note: copy.followersKpiHint,
      href: "#analytics",
      Icon: Users,
    },
  ];

  async function copyCardLink() {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  async function shareCard() {
    const url = cardUrl;
    try {
      if (navigator.share) {
        await navigator.share({ title: profile.name, url });
        return;
      }
    } catch {
      /* fall through */
    }
    await copyCardLink();
  }

  return (
    <section className="page visible" id="page-home" data-screen-label={copy.title}>
      <div className="cr-ov">
        <header className="cr-ov-head">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 id="cr-hello">{copy.title}</h1>
            <div className="page-sub">{copy.sub}</div>
          </div>
        </header>

        <div className="cr-ov-kpis" id="cr-ov-kpis">
          {kpis.map(({ id, label, value, note, href, Icon }) => (
            <a key={id} className="cr-ov-kpi" href={href}>
              <span className="cr-ov-kpi-label">
                <Icon size={16} strokeWidth={1.8} aria-hidden />
                {label}
              </span>
              <strong>{value}</strong>
              <small>{note}</small>
            </a>
          ))}
        </div>

        <div className="cr-ov-showcase">
          <section className="card cr-ov-card cr-ov-card-shell">
            <div className="cr-ov-card-head">
              <div>
                <b>{copy.cardPreviewTitle}</b>
                <p>{copy.cardPreviewSub}</p>
              </div>
              <div className="cr-ov-card-actions">
                <a className="btn btn-ghost" href="#profile">
                  <IdCard size={15} strokeWidth={1.8} aria-hidden />
                  <span>{copy.openCard}</span>
                </a>
                <button type="button" className="btn btn-ghost" onClick={() => void copyCardLink()}>
                  <Copy size={15} strokeWidth={1.8} aria-hidden />
                  <span>{copied ? copy.linkCopied : copy.copyCardLink}</span>
                </button>
                <button type="button" className="btn btn-primary" onClick={() => void shareCard()}>
                  <Share2 size={15} strokeWidth={1.8} aria-hidden />
                  <span>{copy.shareCard}</span>
                </button>
              </div>
            </div>
            <div className="cr-ov-card-stage">
              <div id="cr-profile-card">
                <CreatorHomeCard copy={copy} profile={profile} />
              </div>
            </div>
          </section>

          <section className="card cr-ov-card cr-ov-next-card">
            <div className="cr-ov-card-head cr-ov-todo-head">
              <div>
                <b>{copy.nextStepsTitle}</b>
                <p id="cr-guide-progress">{copy.nextStepsSub}</p>
              </div>
              <a className="link-arrow" href="#profile">
                {copy.openCard}
              </a>
            </div>
            <div className="cr-ov-action-body cr-ov-todo-body">
              <div className="cr-ov-todo-stack">
                <div className="cr-ov-growth" id="cr-ov-growth">
                  <a className={`cr-todo-row${priceReady ? " is-complete" : ""}`} href="#profile">
                    <span className="cr-todo-check" aria-hidden="true">
                      {priceReady ? <Check size={16} strokeWidth={2.4} /> : null}
                    </span>
                    <span className="cr-todo-copy">
                      <b>{priceReady ? copy.guideCardReady : copy.guideCardPrice}</b>
                      <span>{priceReady ? copy.guideCardReadySub : copy.guideCardPriceSub}</span>
                    </span>
                    <span className="cr-todo-tag">{priceReady ? copy.guideComplete : copy.guideTodo}</span>
                    <span className="cr-todo-go" aria-hidden="true">
                      <ChevronRight size={17} strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
