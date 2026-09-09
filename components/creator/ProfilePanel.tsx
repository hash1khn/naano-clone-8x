"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CreatorFlipCard } from "@/components/creator/CreatorFlipCard";
import {
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  Pencil,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
} from "lucide-react";
import {
  COUNTRIES,
  CREATOR_INDUSTRIES,
  formatFollowerCount,
  type OnboardingProfile,
} from "@/lib/creator/onboarding";
import { sectorTone } from "@/lib/creator/sector-tone";
import { fillProfile, type CreatorProfileCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

type Mode = "edit" | "preview";
type SectionKey = "about" | "audience" | "pricing" | `custom:${string}`;

type CustomSection = {
  id: string;
  title: string;
  body: string;
};

type LayoutState = {
  order: SectionKey[];
  hidden: SectionKey[];
  custom: CustomSection[];
};

const DEFAULT_ORDER: SectionKey[] = ["about", "audience", "pricing"];

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "Y") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function countryLabel(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length === 2) {
    return COUNTRIES.find((c) => c.code.toLowerCase() === trimmed.toLowerCase())?.name ?? trimmed;
  }
  return trimmed;
}

function formatSyncedDate(locale: Locale, date = new Date()): string {
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatEuro(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className="cr-mycard-icon-btn" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}

export function ProfilePanel({
  locale,
  copy,
  profile: initialProfile,
}: {
  locale: Locale;
  copy: CreatorProfileCopy;
  profile: OnboardingProfile;
}) {
  const [mode, setMode] = useState<Mode>("edit");
  const [profile, setProfile] = useState(initialProfile);
  const [layout, setLayout] = useState<LayoutState>({
    order: [...DEFAULT_ORDER],
    hidden: [],
    custom: [],
  });
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [aboutDraft, setAboutDraft] = useState(initialProfile.bio ?? "");
  const [tagsDraft, setTagsDraft] = useState<string[]>(initialProfile.niche_tags.slice(0, 3));
  const [priceDraft, setPriceDraft] = useState(
    initialProfile.price_per_post > 0 ? String(Math.round(initialProfile.price_per_post)) : "",
  );
  const [customTitle, setCustomTitle] = useState("");
  const [customBody, setCustomBody] = useState("");
  const dragIndex = useRef<number | null>(null);
  const [draggingKey, setDraggingKey] = useState<SectionKey | null>(null);

  const preview = mode === "preview";
  const followers = formatFollowerCount(profile.follower_count);
  const country = countryLabel(profile.country);
  const synced = formatSyncedDate(locale);
  const priceLabel =
    profile.price_per_post > 0 ? formatEuro(profile.price_per_post, locale) : copy.priceNotSet;

  const customMap = useMemo(() => new Map(layout.custom.map((row) => [row.id, row])), [layout.custom]);

  const visibleKeys = layout.order.filter((key) => {
    if (layout.hidden.includes(key)) return false;
    if (key.startsWith("custom:")) return customMap.has(key.slice(7));
    return true;
  });

  const hiddenKeys = layout.order.filter((key) => layout.hidden.includes(key));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function sectionTitle(key: SectionKey): string {
    if (key === "about") return copy.sectionAbout;
    if (key === "audience") return copy.sectionAudience;
    if (key === "pricing") return copy.sectionPricing;
    return customMap.get(key.slice(7))?.title || "Section";
  }

  function openAboutEditor() {
    setAboutDraft(profile.bio ?? "");
    setTagsDraft(profile.niche_tags.slice(0, 3));
    setAboutOpen(true);
  }

  function openPriceEditor() {
    setPriceDraft(profile.price_per_post > 0 ? String(Math.round(profile.price_per_post)) : "");
    setPriceOpen(true);
  }

  function toggleTag(tag: string) {
    setTagsDraft((current) => {
      if (current.includes(tag)) return current.filter((item) => item !== tag);
      if (current.length >= 3) return current;
      return [...current, tag];
    });
  }

  async function saveAbout() {
    setSaving(true);
    try {
      const res = await fetch("/api/creator/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche_tags: tagsDraft }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.profile) {
        setProfile((current) => ({
          ...current,
          ...data.profile,
          bio: aboutDraft.trim() || data.profile.bio,
          niche_tags: data.profile.niche_tags ?? tagsDraft,
        }));
      } else {
        setProfile((current) => ({
          ...current,
          bio: aboutDraft.trim() || null,
          niche_tags: tagsDraft,
        }));
      }
      setAboutOpen(false);
      setToast(copy.savedToast);
    } finally {
      setSaving(false);
    }
  }

  async function savePrice() {
    const next = Number(priceDraft);
    if (!Number.isFinite(next) || next < 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/creator/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_per_post: next }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.profile) {
        setProfile((current) => ({ ...current, ...data.profile }));
      } else {
        setProfile((current) => ({ ...current, price_per_post: next }));
      }
      setPriceOpen(false);
      setToast(copy.savedToast);
    } finally {
      setSaving(false);
    }
  }

  function hideSection(key: SectionKey) {
    setLayout((current) => ({
      ...current,
      hidden: current.hidden.includes(key) ? current.hidden : [...current.hidden, key],
    }));
  }

  function showSection(key: SectionKey) {
    setLayout((current) => ({
      ...current,
      hidden: current.hidden.filter((item) => item !== key),
    }));
  }

  function addCustomSection() {
    const title = customTitle.trim();
    if (!title) return;
    const id = `s${Date.now().toString(36)}`;
    const key = `custom:${id}` as const;
    setLayout((current) => ({
      order: [...current.order, key],
      hidden: current.hidden,
      custom: [...current.custom, { id, title, body: customBody.trim() }],
    }));
    setCustomTitle("");
    setCustomBody("");
    setAddOpen(false);
  }

  async function refreshPublic() {
    setRefreshing(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setToast(copy.syncPublicQueued);
    } finally {
      setRefreshing(false);
    }
  }

  async function copyDealLink() {
    const url =
      typeof window !== "undefined"
        ? profile.slug
          ? `${window.location.origin}/creators/${profile.slug}`
          : `${window.location.href.split("#")[0]}#profile`
        : "";
    try {
      if (url) await navigator.clipboard.writeText(url);
      setToast(copy.copyDealLinkToast);
    } catch {
      setToast(copy.copyDealLinkToast);
    }
  }

  function onDragStart(index: number, key: SectionKey) {
    if (preview) return;
    dragIndex.current = index;
    setDraggingKey(key);
  }

  function onDragOver(event: DragEvent, index: number) {
    if (preview) return;
    event.preventDefault();
    const from = dragIndex.current;
    if (from === null || from === index) return;
    dragIndex.current = index;
    setLayout((current) => {
      const visible = current.order.filter((key) => !current.hidden.includes(key));
      const hidden = current.order.filter((key) => current.hidden.includes(key));
      const nextVisible = [...visible];
      const [moved] = nextVisible.splice(from, 1);
      nextVisible.splice(index, 0, moved);
      return { ...current, order: [...nextVisible, ...hidden] };
    });
  }

  function onDragEnd() {
    dragIndex.current = null;
    setDraggingKey(null);
  }

  function renderSectionBody(key: SectionKey) {
    if (key === "about") {
      return profile.niche_tags.length > 0 ? (
        <div className="cr-mycard-tags">
          {profile.niche_tags.map((tag) => {
            const tone = sectorTone(tag);
            return (
              <span key={tag} className="cr-mycard-tag" style={{ background: tone.bg, color: tone.fg }}>
                {tag}
              </span>
            );
          })}
        </div>
      ) : (
        <p className="cr-mycard-hidden-empty">{copy.emptySection}</p>
      );
    }

    if (key === "audience") {
      return (
        <>
          <div className="cr-mycard-metrics">
            <div className="cr-mycard-metric">
              <b>{followers}</b>
              <span>{copy.followers}</span>
            </div>
            {country ? (
              <div className="cr-mycard-metric">
                <b>{country}</b>
                <span>{copy.basedIn}</span>
              </div>
            ) : null}
            {audienceOpen ? (
              <>
                <div className="cr-mycard-metric">
                  <b>—</b>
                  <span>Avg impressions/post</span>
                </div>
                <div className="cr-mycard-metric">
                  <b>—</b>
                  <span>{copy.engagement}</span>
                </div>
              </>
            ) : null}
          </div>
          <div className="cr-mycard-expand">
            <button
              type="button"
              aria-expanded={audienceOpen}
              aria-label={audienceOpen ? "Collapse metrics" : "Expand metrics"}
              onClick={() => setAudienceOpen((open) => !open)}
            >
              <ChevronDown size={16} style={{ transform: audienceOpen ? "rotate(180deg)" : undefined }} />
            </button>
          </div>
        </>
      );
    }

    if (key === "pricing") {
      return (
        <div className="cr-mycard-pricing">
          <div className="cr-mycard-pricing-row">
            <div className="cr-mycard-metric">
              <b>{priceLabel}</b>
              <span>{copy.pricePerPost}</span>
            </div>
            <div className="cr-mycard-metric">
              <b>{copy.bundleNoneSet}</b>
              <span>{copy.bundleLabel}</span>
            </div>
          </div>
          <div className="cr-mycard-pricing-actions">
            {preview ? (
              <button type="button" className="cr-mycard-book" onClick={() => setToast(copy.bookToast)}>
                {copy.bookCtaButton}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button type="button" className="cr-mycard-edit-price" onClick={openPriceEditor}>
                {profile.price_per_post > 0 ? copy.editPriceAndBundles : copy.setMyPrice}
              </button>
            )}
          </div>
        </div>
      );
    }

    const custom = customMap.get(key.slice(7));
    if (!custom) return null;
    return custom.body ? (
      <p className="cr-mycard-about-text">{custom.body}</p>
    ) : (
      <p className="cr-mycard-hidden-empty">{copy.emptySection}</p>
    );
  }

  const modal =
    mounted && (aboutOpen || priceOpen || addOpen)
      ? createPortal(
          <div
            className="cr-mycard-modal-backdrop"
            onClick={() => {
              setAboutOpen(false);
              setPriceOpen(false);
              setAddOpen(false);
            }}
          >
            <div className="cr-mycard-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              {aboutOpen ? (
                <>
                  <h3>{copy.modalEditDescriptionTitle}</h3>
                  <label htmlFor="cr-mycard-about">{copy.modalEditDescriptionTitle}</label>
                  <textarea
                    id="cr-mycard-about"
                    rows={4}
                    value={aboutDraft}
                    placeholder={copy.aboutTextareaPlaceholder}
                    onChange={(e) => setAboutDraft(e.target.value)}
                  />
                  <div style={{ marginTop: 14 }}>
                    <label>
                      {copy.yourIndustries}{" "}
                      <span style={{ color: "#94a3b8", fontWeight: 500 }}>({copy.maxThree})</span>
                    </label>
                    <div className="cr-mycard-industries">
                      {CREATOR_INDUSTRIES.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className={`cr-mycard-industry${tagsDraft.includes(tag) ? " is-on" : ""}`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="cr-mycard-modal-actions">
                    <button type="button" className="ghost" onClick={() => setAboutOpen(false)}>
                      {copy.cancel}
                    </button>
                    <button type="button" className="primary" disabled={saving} onClick={saveAbout}>
                      {copy.save}
                    </button>
                  </div>
                </>
              ) : null}
              {priceOpen ? (
                <>
                  <h3>{copy.modalEditPriceTitle}</h3>
                  <label htmlFor="cr-mycard-price">{copy.pricePerPost}</label>
                  <input
                    id="cr-mycard-price"
                    type="number"
                    min={0}
                    step={10}
                    value={priceDraft}
                    onChange={(e) => setPriceDraft(e.target.value)}
                  />
                  <div className="cr-mycard-modal-actions">
                    <button type="button" className="ghost" onClick={() => setPriceOpen(false)}>
                      {copy.cancel}
                    </button>
                    <button type="button" className="primary" disabled={saving} onClick={savePrice}>
                      {copy.save}
                    </button>
                  </div>
                </>
              ) : null}
              {addOpen ? (
                <>
                  <h3>{copy.modalAddSectionTitle}</h3>
                  <label htmlFor="cr-mycard-section-title">{copy.titleLabel}</label>
                  <input
                    id="cr-mycard-section-title"
                    value={customTitle}
                    placeholder={copy.titleInputPlaceholder}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                  <div style={{ marginTop: 12 }}>
                    <label htmlFor="cr-mycard-section-body">{copy.contentLabel}</label>
                    <textarea
                      id="cr-mycard-section-body"
                      rows={4}
                      value={customBody}
                      placeholder={copy.sectionBodyDefaultPlaceholder}
                      onChange={(e) => setCustomBody(e.target.value)}
                    />
                  </div>
                  <div className="cr-mycard-modal-actions">
                    <button type="button" className="ghost" onClick={() => setAddOpen(false)}>
                      {copy.cancel}
                    </button>
                    <button type="button" className="primary" onClick={addCustomSection}>
                      {copy.addSection}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <section className="page visible" id="page-profile" data-screen-label={copy.tabEdit}>
      <div className={`cr-mycard${preview ? " is-preview" : ""}`}>
        <header className="cr-mycard-top">
          <div className="cr-mycard-top-copy">
            <p className="eyebrow">{copy.storefrontEyebrow}</p>
            <h1>{preview ? copy.headingPreview : copy.headingEdit}</h1>
            <p>{preview ? copy.introPreview : copy.introEdit}</p>
          </div>
          <div className="cr-mycard-top-actions">
            <div className="cr-mycard-tabs" role="tablist" aria-label={copy.viewModeAria}>
              <button type="button" role="tab" aria-selected={!preview} onClick={() => setMode("edit")}>
                <Pencil size={14} aria-hidden="true" />
                {copy.tabEdit}
              </button>
              <button type="button" role="tab" aria-selected={preview} onClick={() => setMode("preview")}>
                <Eye size={14} aria-hidden="true" />
                {copy.tabPreview}
              </button>
            </div>
            <button type="button" className="cr-mycard-share-btn" onClick={copyDealLink}>
              <Share2 size={15} />
              {copy.dealLinkShareShort}
            </button>
          </div>
        </header>

        {preview ? (
          <div className="cr-mycard-preview-shell">
            <div className="cr-mycard-stage is-focus">
              <CreatorFlipCard copy={copy} profile={profile} onShare={copyDealLink} />
              <p className="cr-mycard-flip-hint">{copy.flipHint}</p>
            </div>
            <div className="cr-mycard-preview-sections">
              <p className="cr-mycard-preview-label">{copy.companySees}</p>
              {visibleKeys.map((key) => (
                <div key={key} className="cr-mycard-section">
                  <div className="cr-mycard-section-head">
                    <h3>{sectionTitle(key)}</h3>
                  </div>
                  {renderSectionBody(key)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="cr-mycard-workspace">
            <div className="cr-mycard-editor">
              <article className="cr-mycard-hero">
                <div className="cr-mycard-hero-row">
                  <div className="cr-mycard-avatar">
                    {profile.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatar_url} alt={profile.name} />
                    ) : (
                      initialsFromName(profile.name)
                    )}
                  </div>
                  <div className="cr-mycard-hero-copy">
                    <div className="cr-mycard-hero-top">
                      <div>
                        <h2 className="cr-mycard-name">{profile.name}</h2>
                        <button
                          type="button"
                          className="cr-mycard-photo-btn"
                          onClick={() => setToast(copy.photoToast)}
                        >
                          {copy.changePhoto}
                        </button>
                        {profile.bio?.trim() ? <p className="cr-mycard-headline">{profile.bio}</p> : null}
                        <p className="cr-mycard-synced-line">
                          {fillProfile(copy.syncedSuffix, { date: synced }).trim()}
                          <span className="cr-mycard-badge" title={copy.marketplacePrivateHint}>
                            <i aria-hidden="true" />
                            {copy.marketplacePrivate}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="cr-mycard-stats">
                      <div className="cr-mycard-stat">
                        <b>{followers}</b>
                        <span>{copy.followers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <div className="cr-mycard-sections-head">
                <div>
                  <h3>{copy.sectionsHeading}</h3>
                  <p>{copy.sectionsHint}</p>
                </div>
                <button type="button" className="cr-mycard-add-inline" onClick={() => setAddOpen(true)}>
                  <Plus size={15} />
                  {copy.addASection}
                </button>
              </div>

              {visibleKeys.map((key, index) => (
                <div
                  key={key}
                  className={`cr-mycard-section${draggingKey === key ? " is-dragging" : ""}`}
                  draggable
                  onDragStart={() => onDragStart(index, key)}
                  onDragOver={(event) => onDragOver(event, index)}
                  onDragEnd={onDragEnd}
                >
                  <div className="cr-mycard-section-head">
                    <span className="cr-mycard-grab" title={copy.dragToReorderTitle} aria-hidden="true">
                      <GripVertical size={16} />
                    </span>
                    <h3>{sectionTitle(key)}</h3>
                    {key === "about" ? (
                      <IconBtn label={copy.editDescriptionAria} onClick={openAboutEditor}>
                        <Pencil size={14} />
                      </IconBtn>
                    ) : null}
                    {key === "pricing" ? (
                      <IconBtn label={copy.editPriceAndBundles} onClick={openPriceEditor}>
                        <Pencil size={14} />
                      </IconBtn>
                    ) : null}
                    <IconBtn label={copy.hideSectionAria} onClick={() => hideSection(key)}>
                      <EyeOff size={14} />
                    </IconBtn>
                  </div>
                  {renderSectionBody(key)}
                </div>
              ))}

              {hiddenKeys.length ? (
                <div className="cr-mycard-hidden-inline">
                  <span className="cr-mycard-hidden-label">{copy.hiddenSectionsHeading}</span>
                  <div className="cr-mycard-hidden-list is-row">
                    {hiddenKeys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        className="cr-mycard-hidden-item"
                        title={copy.showSectionAgainTitle}
                        onClick={() => showSection(key)}
                      >
                        {sectionTitle(key)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="cr-mycard-side">
              <div className="cr-mycard-side-card">
                <div className="cr-mycard-side-label">{copy.liveCardLabel}</div>
                <CreatorFlipCard copy={copy} profile={profile} onShare={copyDealLink} />
              </div>

              <div className="cr-mycard-side-tools">
                <div className="cr-mycard-tool">
                  <div className="cr-mycard-tool-copy">
                    <ShieldCheck size={16} />
                    <div>
                      <b>{copy.syncCardTitle}</b>
                      <span>{copy.syncStatusPublicProfile}</span>
                    </div>
                  </div>
                  <button type="button" className="cr-mycard-tool-btn" disabled={refreshing} onClick={refreshPublic}>
                    <RefreshCw size={14} className={refreshing ? "flat-profile-spin" : undefined} />
                    {refreshing ? copy.syncRefreshing : copy.syncRefreshShort}
                  </button>
                </div>

                <div className="cr-mycard-tool is-reward">
                  <div>
                    <small>{copy.yourShare}</small>
                    <b>{copy.shareValue}</b>
                  </div>
                  <div>
                    <small>{copy.rewardPeriod}</small>
                    <b>{copy.rewardValue}</b>
                  </div>
                </div>

                <button
                  type="button"
                  className="cr-mycard-verified-cta"
                  onClick={() => setToast(copy.syncExtensionComingSoonBadge)}
                >
                  {copy.syncBecomeVerifiedCta}
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
      {modal}
      {toast ? <div className="cr-mycard-toast">{toast}</div> : null}
      <style>{`
        @keyframes flat-profile-spin { to { transform: rotate(360deg); } }
        .flat-profile-spin { animation: flat-profile-spin .8s linear infinite; }
      `}</style>
    </section>
  );
}
