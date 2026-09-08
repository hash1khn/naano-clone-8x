"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ContactRound,
  Copy,
  Link2,
  UserRoundPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { fillReferrals, type CreatorReferralsCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

type Tab = "brands" | "creators";

function money(value: number, locale: Locale, digits = 0) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: digits,
  }).format(value);
}

function displayHostPath(url: string, fallback: string) {
  return url.replace(/^https?:\/\//, "") || fallback;
}

export function ReferralsPanel({
  locale,
  copy,
  slug,
}: {
  locale: Locale;
  copy: CreatorReferralsCopy;
  slug: string | null;
}) {
  const [tab, setTab] = useState<Tab>("brands");
  const [budget, setBudget] = useState(5000);
  const [brands, setBrands] = useState(2);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const brandUrl = slug && origin ? `${origin}/invite/${slug}` : "";
  const creatorUrl = slug && origin ? `${origin}/invite/creator/${slug}` : "";
  const brandDisplay = brandUrl ? displayHostPath(brandUrl, copy.linkFallback) : copy.linkFallback;
  const creatorDisplay = creatorUrl
    ? displayHostPath(creatorUrl, copy.creatorLinkFallback)
    : copy.creatorLinkFallback;
  const linkReady = Boolean(brandUrl);

  const monthly = budget * brands * 0.05;
  const threeMonth = monthly * 3;
  const monthlyLabel = useMemo(
    () => fillReferrals(copy.simMonthly, { amount: money(monthly, locale) }),
    [copy.simMonthly, locale, monthly],
  );

  async function copyText(key: string, value: string) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
    } catch {
      /* ignore */
    }
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, current: Tab) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next: Tab = current === "brands" ? "creators" : "brands";
    setTab(next);
    window.requestAnimationFrame(() => {
      document.getElementById(`referral-tab-${next}`)?.focus();
    });
  }

  return (
    <section className="page visible" id="page-referrals" data-screen-label={copy.tabBrands}>
      <div className="cr-ref-shell">
        <div className="cr-ref-tabs-wrap">
          <div className="cr-ref-tabs" role="tablist" aria-label="Affiliate program">
            <button
              id="referral-tab-brands"
              type="button"
              role="tab"
              aria-selected={tab === "brands"}
              aria-controls="referral-panel-brands"
              tabIndex={tab === "brands" ? 0 : -1}
              className={`cr-ref-tab${tab === "brands" ? " on" : ""}`}
              onClick={() => setTab("brands")}
              onKeyDown={(event) => onTabKey(event, "brands")}
            >
              <Building2 aria-hidden />
              {copy.tabBrands}
            </button>
            <button
              id="referral-tab-creators"
              type="button"
              role="tab"
              aria-selected={tab === "creators"}
              aria-controls="referral-panel-creators"
              tabIndex={tab === "creators" ? 0 : -1}
              className={`cr-ref-tab${tab === "creators" ? " on" : ""}`}
              onClick={() => setTab("creators")}
              onKeyDown={(event) => onTabKey(event, "creators")}
            >
              <UsersRound aria-hidden />
              {copy.tabCreators}
            </button>
          </div>
        </div>

        {tab === "brands" ? (
          <div id="referral-panel-brands" role="tabpanel" aria-labelledby="referral-tab-brands">
            <section className="cr-ref-hero">
              <div className="cr-ref-pill">
                <span className="cr-ref-dot" />
                {copy.brandBadge}
              </div>
              <h1>{copy.brandTitle}</h1>
              <p className="cr-ref-hero-sub">{copy.brandSub}</p>
              <div className="cr-ref-hero-actions">
                <button
                  type="button"
                  className="cr-ref-btn-dark"
                  disabled={!linkReady}
                  onClick={() => void copyText("brand-hero", brandUrl)}
                >
                  <Copy aria-hidden />
                  {copiedKey === "brand-hero" ? copy.copied : copy.copyReferral}
                </button>
                <a href="#how-it-works" className="cr-ref-link-cta">
                  {copy.seeHow}
                  <ArrowRight aria-hidden />
                </a>
              </div>
            </section>

            <section className="cr-ref-band">
              <div className="cr-ref-band-grid">
                <div className="cr-ref-tile">
                  <div className="cr-ref-tile-head">
                    <span className="cr-ref-ico dark">
                      <Building2 aria-hidden />
                    </span>
                    <div>
                      <b>{copy.introduceTitle}</b>
                      <small>{copy.introduceSub}</small>
                    </div>
                  </div>
                  <div className="cr-ref-linkbox">
                    <Link2 aria-hidden />
                    <div className="cr-ref-linkbox-copy">
                      <span>{copy.personalLinkLabel}</span>
                      <b>{brandDisplay}</b>
                    </div>
                    {linkReady ? <Check className="ok" aria-hidden /> : null}
                  </div>
                  <button
                    type="button"
                    className="cr-ref-copy-soft"
                    disabled={!linkReady}
                    onClick={() => void copyText("brand-card", brandUrl)}
                  >
                    <Copy aria-hidden />
                    {copiedKey === "brand-card" ? copy.copied : copy.copyLink}
                  </button>
                </div>

                <div className="cr-ref-tracked">
                  <div className="cr-ref-tracked-line">
                    <i />
                    <ArrowRight aria-hidden />
                    <i />
                  </div>
                  <div className="cr-ref-tracked-label">
                    <span className="cr-ref-dot-sm" />
                    {copy.tracked}
                  </div>
                </div>

                <div className="cr-ref-tile">
                  <div className="cr-ref-share-row">
                    <div>
                      <span>{copy.shareLabel}</span>
                      <strong>{copy.shareValue}</strong>
                    </div>
                    <span className="cr-ref-ico sky">
                      <WalletCards aria-hidden />
                    </span>
                  </div>
                  <div className="cr-ref-period">
                    <span>{copy.rewardPeriod}</span>
                    <b>{copy.rewardPeriodValue}</b>
                  </div>
                </div>
              </div>
              <p className="cr-ref-band-note">{copy.rewardPeriodNote}</p>
            </section>

            <dl className="cr-ref-stats">
              <div className="cr-ref-stat">
                <dt>{copy.rewardsEarned}</dt>
                <dd>{money(0, locale, 2)}</dd>
              </div>
              <div className="cr-ref-stat">
                <dt>{copy.brandsIntroduced}</dt>
                <dd>0</dd>
                <p>{copy.brandsIntroducedMeta}</p>
              </div>
              <div className="cr-ref-stat">
                <dt>{copy.earningNow}</dt>
                <dd>0</dd>
                <p>{copy.earningNowMeta}</p>
              </div>
            </dl>

            <section className="cr-ref-section">
              <p className="cr-ref-eyebrow">
                <span className="cr-ref-dot-sm" />
                {copy.twoWaysEyebrow}
              </p>
              <h2>{copy.twoWaysTitle}</h2>
              <p className="lead">{copy.twoWaysSub}</p>
              <div className="cr-ref-two">
                <div className="cr-ref-two-col">
                  <h3>
                    {copy.recommendTitle}
                    <span className="cr-ref-badge">{copy.recommendBadge}</span>
                  </h3>
                  <p>{copy.recommendBody}</p>
                  <button
                    type="button"
                    className="cr-ref-btn-dark"
                    disabled={!linkReady}
                    onClick={() => void copyText("brand-recommend", brandUrl)}
                  >
                    <Copy aria-hidden />
                    {copiedKey === "brand-recommend" ? copy.copied : copy.copyNaanoLink}
                  </button>
                </div>
                <div className="cr-ref-two-col">
                  <h3>{copy.cardTitle}</h3>
                  <p>{copy.cardBody}</p>
                  <a href="#profile" className="cr-ref-btn-light">
                    <ContactRound aria-hidden />
                    {copy.openCard}
                  </a>
                </div>
              </div>
            </section>

            <section id="how-it-works" className="cr-ref-section">
              <p className="cr-ref-eyebrow">
                <span className="cr-ref-dot-sm" />
                {copy.howEyebrow}
              </p>
              <h2>{copy.howTitle}</h2>
              <div className="cr-ref-steps">
                {[
                  { n: "01", title: copy.how1Title, body: copy.how1Body },
                  { n: "02", title: copy.how2Title, body: copy.how2Body },
                  { n: "03", title: copy.how3Title, body: copy.how3Body },
                ].map((step) => (
                  <article key={step.n} className="cr-ref-step">
                    <span className="cr-ref-step-n">{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="cr-ref-section">
              <div className="cr-ref-sim">
                <div className="cr-ref-sim-top">
                  <div>
                    <p className="cr-ref-eyebrow">
                      <span className="cr-ref-dot-sm" />
                      {copy.simEyebrow}
                    </p>
                    <h2>{copy.simTitle}</h2>
                  </div>
                  <div className="cr-ref-sim-card">
                    <span>{copy.simPotential}</span>
                    <strong>{money(threeMonth, locale)}</strong>
                    <small>{monthlyLabel}</small>
                  </div>
                </div>
                <div className="cr-ref-sim-body">
                  <p>{copy.simNote}</p>
                  <div className="cr-ref-sliders">
                    <div className="cr-ref-slider">
                      <label htmlFor="referral-campaign-budget">{copy.simBudget}</label>
                      <strong>{money(budget, locale)}</strong>
                      <input
                        id="referral-campaign-budget"
                        type="range"
                        min={1000}
                        max={25000}
                        step={1000}
                        value={budget}
                        onChange={(event) => setBudget(Number(event.target.value))}
                      />
                      <div className="cr-ref-slider-ends">
                        <span>{money(1000, locale)}</span>
                        <span>{money(25000, locale)}</span>
                      </div>
                    </div>
                    <div className="cr-ref-slider">
                      <label htmlFor="referral-active-brands">{copy.simBrands}</label>
                      <strong>{brands}</strong>
                      <input
                        id="referral-active-brands"
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={brands}
                        onChange={(event) => setBrands(Number(event.target.value))}
                      />
                      <div className="cr-ref-slider-ends">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="cr-ref-section">
              <div className="cr-ref-live-head">
                <div>
                  <p className="cr-ref-eyebrow">
                    <span className="cr-ref-dot-sm" />
                    {copy.liveEyebrow}
                  </p>
                  <h2>{copy.liveBrandsTitle}</h2>
                </div>
                <div className="cr-ref-live-total">
                  <strong>{money(0, locale, 2)}</strong>
                  <span>{copy.totalEarned}</span>
                </div>
              </div>
              <div className="cr-ref-empty">
                <span className="cr-ref-ico muted">
                  <Building2 aria-hidden />
                </span>
                <h3>{copy.emptyBrandTitle}</h3>
                <p>{copy.emptyBrandBody}</p>
                <button
                  type="button"
                  className="cr-ref-copy-soft"
                  disabled={!linkReady}
                  onClick={() => void copyText("brand-empty", brandUrl)}
                >
                  <Copy aria-hidden />
                  {copiedKey === "brand-empty" ? copy.copied : copy.copyReferral}
                </button>
              </div>
            </section>
          </div>
        ) : (
          <div id="referral-panel-creators" role="tabpanel" aria-labelledby="referral-tab-creators">
            <section className="cr-ref-creator-hero">
              <div>
                <div className="cr-ref-pill">
                  <span className="cr-ref-dot" />
                  {copy.creatorBadge}
                </div>
                <h1>{copy.creatorTitle}</h1>
                <p className="lead">{copy.creatorSub}</p>
                <button
                  type="button"
                  className="cr-ref-btn-dark"
                  disabled={!linkReady}
                  onClick={() => void copyText("creator-hero", creatorUrl)}
                >
                  <Copy aria-hidden />
                  {copiedKey === "creator-hero" ? copy.copied : copy.copyCreatorInvite}
                </button>
                {!linkReady ? <p className="cr-ref-unlock">{copy.unlockHint}</p> : null}
              </div>

              <div className="cr-ref-creator-card">
                <div className="cr-ref-creator-link">
                  <span className="cr-ref-ico white">
                    <UserRoundPlus aria-hidden />
                  </span>
                  <div>
                    <span>{copy.creatorLinkLabel}</span>
                    <small>{copy.creatorLinkSub}</small>
                    <b>{creatorDisplay}</b>
                  </div>
                  <button
                    type="button"
                    className="cr-ref-icon-btn"
                    disabled={!linkReady}
                    aria-label={copy.copyLink}
                    onClick={() => void copyText("creator-side", creatorUrl)}
                  >
                    {copiedKey === "creator-side" ? <Check aria-hidden /> : <Copy aria-hidden />}
                  </button>
                </div>
                <div className="cr-ref-creator-meta">
                  <div>
                    <span>{copy.creatorShare}</span>
                    <strong>{copy.shareValue}</strong>
                  </div>
                  <div>
                    <span>{copy.creatorWindow}</span>
                    <strong>{copy.rewardPeriodValue}</strong>
                  </div>
                </div>
                <p className="cr-ref-creator-note">{copy.creatorWindowNote}</p>
                <dl className="cr-ref-stats embedded">
                  <div className="cr-ref-stat">
                    <dt>{copy.rewardsEarned}</dt>
                    <dd>{money(0, locale, 2)}</dd>
                  </div>
                  <div className="cr-ref-stat">
                    <dt>{copy.creatorsInvited}</dt>
                    <dd>0</dd>
                    <p>{copy.creatorsInvitedMeta}</p>
                  </div>
                  <div className="cr-ref-stat">
                    <dt>{copy.earningNow}</dt>
                    <dd>0</dd>
                    <p>{copy.earningNowMeta}</p>
                  </div>
                </dl>
              </div>
            </section>

            <section id="creator-referral-how-it-works" className="cr-ref-section">
              <p className="cr-ref-eyebrow">
                <span className="cr-ref-dot-sm" />
                {copy.creatorHowEyebrow}
              </p>
              <h2>{copy.creatorHowTitle}</h2>
              <div className="cr-ref-steps">
                {[
                  { n: "01", title: copy.creatorHow1Title, body: copy.creatorHow1Body },
                  { n: "02", title: copy.creatorHow2Title, body: copy.creatorHow2Body },
                  { n: "03", title: copy.creatorHow3Title, body: copy.creatorHow3Body },
                ].map((step) => (
                  <article key={step.n} className="cr-ref-step">
                    <span className="cr-ref-step-n">{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="cr-ref-section">
              <div className="cr-ref-live-head">
                <div>
                  <p className="cr-ref-eyebrow">
                    <span className="cr-ref-dot-sm" />
                    {copy.liveEyebrow}
                  </p>
                  <h2>{copy.liveCreatorsTitle}</h2>
                </div>
                <div className="cr-ref-live-total">
                  <strong>{money(0, locale, 2)}</strong>
                  <span>{copy.totalEarned}</span>
                </div>
              </div>
              <div className="cr-ref-empty">
                <span className="cr-ref-ico muted">
                  <UsersRound aria-hidden />
                </span>
                <h3>{copy.emptyCreatorTitle}</h3>
                <p>{copy.emptyCreatorBody}</p>
                <button
                  type="button"
                  className="cr-ref-copy-soft"
                  disabled={!linkReady}
                  onClick={() => void copyText("creator-empty", creatorUrl)}
                >
                  <Copy aria-hidden />
                  {copiedKey === "creator-empty" ? copy.copied : copy.copyCreatorInvite}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
