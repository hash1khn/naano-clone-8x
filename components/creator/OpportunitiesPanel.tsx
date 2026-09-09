"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Clock, FileText } from "lucide-react";
import {
  DEMO_OPPORTUNITIES,
  brandInitials,
  opportunityFitClass,
  opportunityTone,
  type DemoOpportunity,
} from "@/lib/opportunities/demo";
import { fillOpportunities, type CreatorOpportunitiesCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

type Sort = "rel" | "match" | "new";
type Channel = "all" | "li";
type Popover = "industry" | "country" | null;

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function LinkedInChipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function OppLogo({ brand, logo }: { brand: string; logo: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="cr-opp-logo-ring">
      <span className="cr-opp-logo">
        <span aria-hidden="true">{brandInitials(brand)}</span>
        {logo && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" loading="lazy" onError={() => setFailed(true)} />
        ) : null}
      </span>
    </span>
  );
}

function ModalLogo({ brand, logo }: { brand: string; logo: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="cr-opp-modal-logo">
      {logo && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" onError={() => setFailed(true)} />
      ) : (
        brandInitials(brand)
      )}
    </span>
  );
}

export function OpportunitiesPanel({
  locale: _locale,
  copy,
}: {
  locale: Locale;
  copy: CreatorOpportunitiesCopy;
}) {
  const [items, setItems] = useState<DemoOpportunity[]>(() => DEMO_OPPORTUNITIES.map((row) => ({ ...row })));
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("rel");
  const [channel, setChannel] = useState<Channel>("all");
  const [industries, setIndustries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [industryQ, setIndustryQ] = useState("");
  const [countryQ, setCountryQ] = useState("");
  const [openPop, setOpenPop] = useState<Popover>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [mounted, setMounted] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    function onDoc(event: Event) {
      if (!filterRef.current?.contains(event.target as Node)) {
        setOpenPop(null);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const industryOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((o) => o.tags.forEach((tag) => set.add(tag)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((o) => o.geo.forEach((geo) => set.add(geo)));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filteredIndustries = industryOptions.filter((tag) =>
    tag.toLowerCase().includes(industryQ.trim().toLowerCase()),
  );
  const filteredCountries = countryOptions.filter((geo) =>
    geo.toLowerCase().includes(countryQ.trim().toLowerCase()),
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let next = items.slice();
    if (q) {
      next = next.filter((o) => `${o.campaignName} ${o.brand}`.toLowerCase().includes(q));
    }
    if (industries.length) {
      next = next.filter((o) => o.tags.some((tag) => industries.includes(tag)));
    }
    if (countries.length) {
      next = next.filter((o) => o.geo.some((geo) => countries.includes(geo)));
    }
    if (sort === "new") {
      next.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    } else if (sort === "match") {
      next.sort((a, b) => (b.matchPct || 0) - (a.matchPct || 0));
    } else {
      next.sort((a, b) => b.fit - a.fit || (b.matchPct || 0) - (a.matchPct || 0));
    }
    return next;
  }, [items, query, industries, countries, sort]);

  const selected = selectedId ? items.find((o) => o.campaignId === selectedId) || null : null;

  function toggleValue(listValues: string[], value: string, setter: (next: string[]) => void) {
    setter(listValues.includes(value) ? listValues.filter((item) => item !== value) : [...listValues, value]);
  }

  function applyTo(campaignId: string, event?: MouseEvent) {
    event?.stopPropagation();
    setItems((prev) =>
      prev.map((row) => (row.campaignId === campaignId ? { ...row, applied: true } : row)),
    );
    setToast(copy.appliedToast);
  }

  function openCard(campaignId: string) {
    setSelectedId(campaignId);
  }

  function onCardKey(event: KeyboardEvent<HTMLElement>, campaignId: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCard(campaignId);
    }
  }

  const industryLabel =
    industries.length === 0
      ? copy.allIndustries
      : fillOpportunities(copy.industriesSelected, { n: String(industries.length) });
  const countryLabel =
    countries.length === 0
      ? copy.allCountries
      : fillOpportunities(copy.countriesSelected, { n: String(countries.length) });

  return (
    <section className="page visible" id="page-opportunities" data-screen-label={copy.title}>
      <div className="page-head">
        <h1>{copy.title}</h1>
        <div className="page-sub">{copy.sub}</div>
      </div>

      <div className="net-filter" id="opp-net-filter">
        <button
          type="button"
          className={`chip${channel === "all" ? " on" : ""}`}
          onClick={() => setChannel("all")}
        >
          {copy.allChannels} <span className="ct">{items.length}</span>
        </button>
        <button
          type="button"
          className={`chip${channel === "li" ? " on" : ""}`}
          onClick={() => setChannel("li")}
        >
          <LinkedInChipIcon />
          LinkedIn <span className="ct">{items.length}</span>
        </button>
      </div>

      <div className="toolbar" id="opp-toolbar" ref={filterRef}>
        <label className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="opp-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPh}
          />
        </label>

        <div className="cr-opp-filter-wrap">
          <button
            type="button"
            className="select"
            aria-haspopup="listbox"
            aria-expanded={openPop === "industry"}
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => setOpenPop(openPop === "industry" ? null : "industry")}
          >
            {industryLabel}
          </button>
          {openPop === "industry" ? (
            <div className="cr-opp-filter-pop" role="listbox">
              <input
                value={industryQ}
                onChange={(event) => setIndustryQ(event.target.value)}
                placeholder={copy.searchIndustry}
              />
              <div className="cr-opp-filter-list">
                {filteredIndustries.length ? (
                  filteredIndustries.map((tag) => {
                    const on = industries.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`cr-opp-filter-option${on ? " on" : ""}`}
                        onClick={() => toggleValue(industries, tag, setIndustries)}
                      >
                        <i aria-hidden="true" />
                        {tag}
                      </button>
                    );
                  })
                ) : (
                  <div className="muted" style={{ padding: "8px", fontSize: ".84rem" }}>
                    {copy.noIndustryMatch}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="cr-opp-filter-wrap">
          <button
            type="button"
            className="select"
            aria-haspopup="listbox"
            aria-expanded={openPop === "country"}
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => setOpenPop(openPop === "country" ? null : "country")}
          >
            {countryLabel}
          </button>
          {openPop === "country" ? (
            <div className="cr-opp-filter-pop" role="listbox">
              <input
                value={countryQ}
                onChange={(event) => setCountryQ(event.target.value)}
                placeholder={copy.searchCountry}
              />
              <div className="cr-opp-filter-list">
                {filteredCountries.length ? (
                  filteredCountries.map((geo) => {
                    const on = countries.includes(geo);
                    return (
                      <button
                        key={geo}
                        type="button"
                        className={`cr-opp-filter-option${on ? " on" : ""}`}
                        onClick={() => toggleValue(countries, geo, setCountries)}
                      >
                        <i aria-hidden="true" />
                        {geo}
                      </button>
                    );
                  })
                ) : (
                  <div className="muted" style={{ padding: "8px", fontSize: ".84rem" }}>
                    {copy.noCountryMatch}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <select
          className="select"
          id="opp-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as Sort)}
        >
          <option value="rel">{copy.sortRelevance}</option>
          <option value="match">{copy.sortMatch}</option>
          <option value="new">{copy.sortNewest}</option>
        </select>
      </div>

      <div className="creator-grid" id="cr-opps">
        {list.map((o, index) => {
          const match =
            o.matchPct == null ? null : Math.max(0, Math.min(100, Math.round(Number(o.matchPct) || 0)));
          const fitClass = opportunityFitClass(match);
          const target = o.geo.slice(0, 2).join(" · ") || copy.worldwide;
          const titleId = `cr-opp-title-${index}`;
          return (
            <article
              key={o.campaignId}
              className="card cr-opp-card"
              role="button"
              tabIndex={0}
              aria-labelledby={titleId}
              onClick={() => openCard(o.campaignId)}
              onKeyDown={(event) => onCardKey(event, o.campaignId)}
            >
              <div className={`cr-opp-cover cr-opp-sky-${opportunityTone(o)}`}>
                <span className="cr-opp-channel">
                  <span className="cr-opp-linkedin" aria-hidden="true">
                    in
                  </span>
                  LinkedIn
                </span>
                {match == null ? null : (
                  <span className={`cr-opp-fit${fitClass}`}>
                    {match}% {copy.match}
                  </span>
                )}
                <OppLogo brand={o.brand} logo={o.logo} />
              </div>

              <div className="cr-opp-body">
                <span className="cr-opp-brand">{o.brand}</span>
                <h3 className="cr-opp-title" id={titleId}>
                  {o.campaignName}
                </h3>
                <div className="cr-opp-meta">
                  <span className="cr-opp-target">
                    <GlobeIcon />
                    {target}
                  </span>
                </div>
                {match == null ? null : (
                  <div className="cr-opp-match-bar">
                    <div className="cr-opp-match-head">
                      <span>{copy.relevance}</span>
                      <b>{match}/100</b>
                    </div>
                    <span className="cr-opp-match-track">
                      <i className={`cr-opp-match-fill${fitClass}`} style={{ width: `${match}%` }} />
                    </span>
                  </div>
                )}
              </div>

              <div className="cr-opp-stats">
                <div className="cr-opp-stat">
                  <b>{match == null ? "—" : `${match}/100`}</b>
                  <span>{copy.match}</span>
                </div>
                <div className="cr-opp-stat">
                  <b>LinkedIn</b>
                  <span>{copy.channel}</span>
                </div>
                <div className="cr-opp-stat">
                  <b>{copy.tenDays}</b>
                  <span>{copy.postDeadline}</span>
                </div>
              </div>

              <div className="cr-opp-actions">
                {o.briefAvailable ? (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      openCard(o.campaignId);
                    }}
                  >
                    <FileText size={15} strokeWidth={1.8} aria-hidden />
                    {copy.viewBrief}
                  </button>
                ) : (
                  <span className="muted" style={{ fontSize: ".8rem", alignSelf: "center" }}>
                    <Clock size={14} strokeWidth={1.8} aria-hidden /> {copy.briefComingSoon}
                  </span>
                )}
                {o.applied ? (
                  <button type="button" className="btn btn-green" disabled>
                    {copy.applied}
                  </button>
                ) : o.booked ? (
                  <a
                    className="btn btn-ghost"
                    href="#collabs"
                    style={{ border: "1px solid var(--border2)" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {copy.bookingInProgress}
                  </a>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={(event) => applyTo(o.campaignId, event)}>
                    {copy.apply}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className={`empty${list.length ? "" : " on"}`} id="opp-empty">
        {copy.filterEmpty}
      </div>

      {toast ? (
        <p className="cr-earn-notice" role="status" style={{ marginTop: 14 }}>
          {toast}
        </p>
      ) : null}

      {mounted && selected
        ? createPortal(
            <div className="overlay open" onClick={() => setSelectedId(null)}>
              <div
                className="modal cr-opp-modal"
                role="dialog"
                aria-modal="true"
                aria-label={selected.brand}
                onClick={(event) => event.stopPropagation()}
              >
                <button type="button" className="modal-close" aria-label={copy.close} onClick={() => setSelectedId(null)}>
                  ✕
                </button>
                <div className="cr-opp-modal-brand">
                  <ModalLogo brand={selected.brand} logo={selected.logo} />
                  <div style={{ minWidth: 0 }}>
                    <b>{selected.brand}</b>
                    <span>{selected.campaignName}</span>
                  </div>
                </div>
                <p className="cr-opp-modal-excerpt">{selected.excerpt}</p>
                <p className="cr-opp-modal-note">{copy.escrowLine}</p>
                {selected.briefAvailable ? (
                  <button type="button" className="btn btn-ghost btn-block" style={{ border: "1px solid var(--border2)" }}>
                    <FileText size={16} strokeWidth={1.8} aria-hidden /> {copy.seeBrief}
                  </button>
                ) : null}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                  {selected.applied ? (
                    <button type="button" className="btn btn-green btn-block" disabled>
                      {copy.applied}
                    </button>
                  ) : (
                    <button type="button" className="btn btn-primary btn-block" onClick={() => applyTo(selected.campaignId)}>
                      {copy.apply}
                    </button>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
