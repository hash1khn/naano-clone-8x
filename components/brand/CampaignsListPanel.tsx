"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, FolderOpen, Plus } from "lucide-react";
import type { CampaignListItem } from "@/lib/api/types";
import { fill, type CampaignsCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

type Scope = "all" | "live" | "draft" | "completed";

const LOGO = "/lp/naano-logomark.png";

function matchesScope(status: string, scope: Scope) {
  const value = status.toLowerCase();
  if (scope === "all") {
    return true;
  }
  if (scope === "live") {
    return value === "live" || value === "paused" || value === "active";
  }
  if (scope === "draft") {
    return value === "draft";
  }
  return value === "completed" || value === "done";
}

function statusClass(status: string) {
  const value = status.toLowerCase();
  if (value === "live" || value === "active") {
    return "live";
  }
  if (value === "paused") {
    return "paused";
  }
  if (value === "completed" || value === "done") {
    return "done";
  }
  return "draft";
}

function statusLabel(status: string, copy: CampaignsCopy) {
  const value = status.toLowerCase();
  if (value === "live" || value === "active") {
    return copy.statusLive;
  }
  if (value === "paused") {
    return copy.statusPaused;
  }
  if (value === "completed" || value === "done") {
    return copy.statusCompleted;
  }
  return copy.statusDraft;
}

function formatCreated(iso: string, locale: Locale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CreateCampaignCard({ copy, index }: { copy: CampaignsCopy; index: number }) {
  return (
    <a
      className="ac-campaign-card ac-create-card"
      href="#campaign-new"
      style={{ ["--ac-index" as string]: String(index) }}
    >
      <span className="ac-card-gloss" aria-hidden="true" />
      <span className="ac-create-cover">
        <span className="ac-card-mark ac-brand-mark">
          <img src={LOGO} alt="" />
        </span>
      </span>
      <strong>{copy.createCampaign}</strong>
      <span className="ac-card-context">{copy.createCampaignHelp}</span>
      <span className="ac-card-metrics">
        <span>
          <b>—</b>
          <small>{copy.creatorsLabel}</small>
        </span>
        <span>
          <b>—</b>
          <small>{copy.publishedCount}</small>
        </span>
        <span>
          <b>—</b>
          <small>{copy.budgetCommitted}</small>
        </span>
      </span>
      <span className="ac-create-cta">
        {copy.createCampaignCta} <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
      </span>
    </a>
  );
}

export function CampaignsListPanel({ locale, copy }: { locale: Locale; copy: CampaignsCopy }) {
  const [campaigns, setCampaigns] = useState<CampaignListItem[]>([]);
  const [scope, setScope] = useState<Scope>("all");
  const scopeRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/campaigns");
        const json = response.ok ? ((await response.json()) as { campaigns?: CampaignListItem[] }) : { campaigns: [] };
        if (!cancelled) {
          setCampaigns(Array.isArray(json.campaigns) ? json.campaigns : []);
        }
      } catch {
        if (!cancelled) {
          setCampaigns([]);
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => campaigns.filter((campaign) => matchesScope(campaign.status, scope)),
    [campaigns, scope],
  );
  const showCreate = scope === "all" || scope === "draft";

  useLayoutEffect(() => {
    const root = scopeRef.current;
    const indicator = indicatorRef.current;
    const active = root?.querySelector("button.on") as HTMLButtonElement | null;
    if (!root || !indicator || !active) {
      return;
    }
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translate3d(${active.offsetLeft}px,0,0)`;
  }, [scope]);

  const scopes: { id: Scope; label: string }[] = [
    { id: "all", label: copy.scopeAll },
    { id: "live", label: copy.scopeActive },
    { id: "draft", label: copy.scopeDraft },
    { id: "completed", label: copy.scopeCompleted },
  ];

  return (
    <section className="page visible" id="page-studio" data-screen-label={copy.title}>
      <div id="ci-app" aria-live="polite">
        <section className="nn-campaign-index-header">
          <header className="ac-index-head">
            <div className="nn-heading-with-back">
              <h1>{copy.title}</h1>
            </div>
            <a className="btn btn-primary ac-create" href="#campaign-new">
              <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
              {copy.createCampaign}
            </a>
          </header>
          <div className="ac-index-toolbar">
            <div
              ref={scopeRef}
              className="ac-scope nn-liquid-segment"
              data-liquid-kind="scope"
              role="group"
              aria-label={copy.scopeAria}
            >
              <span ref={indicatorRef} className="nn-liquid-indicator" aria-hidden="true" />
              {scopes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-liquid-value={item.id}
                  className={scope === item.id ? "on" : undefined}
                  onClick={() => setScope(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span>
              {visible.length} {copy.campaignsLabel}
            </span>
          </div>
        </section>
        <div className="ac-campaign-grid">
          {visible.map((campaign, index) => (
            <article
              key={campaign.id}
              className="ac-campaign-card"
              style={{ ["--ac-index" as string]: String(index) }}
            >
              <span className="ac-card-gloss" aria-hidden="true" />
              <span className="ac-card-cover mkt-sky-banner">
                <span className="ac-card-clouds" aria-hidden="true" />
                <span className="ac-card-mark ac-brand-mark">
                  <img src={LOGO} alt="" />
                </span>
                <span className={`ac-status ${statusClass(campaign.status)}`}>
                  <i />
                  {statusLabel(campaign.status, copy)}
                </span>
                <span className="ac-card-date">{fill(copy.createdOn, { date: formatCreated(campaign.created_at, locale) })}</span>
              </span>
              <strong>{campaign.objective || copy.title}</strong>
              <span className="ac-card-context">{copy.noBriefSummary}</span>
              <span className="ac-card-metrics">
                <span>
                  <b>—</b>
                  <small>{copy.creatorsLabel}</small>
                </span>
                <span>
                  <b>—</b>
                  <small>{copy.publishedCount}</small>
                </span>
                <span>
                  <b>—</b>
                  <small>{copy.budgetCommitted}</small>
                </span>
              </span>
            </article>
          ))}
          {showCreate ? <CreateCampaignCard copy={copy} index={visible.length} /> : null}
          {!visible.length && !showCreate ? (
            <div className="ac-empty ac-empty-index">
              <FolderOpen size={25} strokeWidth={1.8} aria-hidden="true" />
              <b>{copy.noCampaignsFilter}</b>
              <span>{copy.noCampaignsFilterHelp}</span>
              <a className="btn btn-primary" href="#campaign-new" style={{ marginTop: 14 }}>
                {copy.createCampaignEmpty}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
