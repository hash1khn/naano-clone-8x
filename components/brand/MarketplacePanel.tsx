"use client";

import { useEffect, useMemo, useState } from "react";
import { CreatorCard } from "@/components/brand/CreatorCard";
import { CreatorProfileModal } from "@/components/brand/CreatorProfileModal";
import { CreatorSelectionModal } from "@/components/brand/CreatorSelectionModal";
import type { CreatorListItem } from "@/lib/api/types";
import { fill, type MarketplaceCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

type Experience = "ai" | "marketplace";
type CatalogueView = "all" | "saved";
type SortKey = "rel" | "price" | "fol";
type OpenPop = "sort" | "industry" | "country" | "price" | "filters" | null;

const SHORTLIST_KEY = "naano.marketplace.shortlist";
const EXPERIENCE_KEY = "naano.marketplace.experience";
const STOPWORDS = new Set([
  "the",
  "for",
  "and",
  "or",
  "with",
  "your",
  "find",
  "show",
  "creators",
  "creator",
  "prioritize",
  "median",
  "views",
  "efficient",
  "promising",
  "new",
  "company",
  "des",
  "les",
  "pour",
  "une",
  "trouver",
  "montrer",
]);

function readShortlist(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(SHORTLIST_KEY) || "[]") as unknown;
    return new Set(Array.isArray(raw) ? raw.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set();
  }
}

export function MarketplacePanel({
  locale,
  copy,
  creators,
}: {
  locale: Locale;
  copy: MarketplaceCopy;
  creators: CreatorListItem[];
}) {
  const numberLocale = locale === "fr" ? "fr-FR" : "en-US";
  const [experience, setExperience] = useState<Experience>("marketplace");
  const [view, setView] = useState<CatalogueView>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("rel");
  const [openPop, setOpenPop] = useState<OpenPop>(null);
  const [industries, setIndustries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [industryQ, setIndustryQ] = useState("");
  const [countryQ, setCountryQ] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [followersMin, setFollowersMin] = useState("");
  const [followersMax, setFollowersMax] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [profile, setProfile] = useState<CreatorListItem | null>(null);
  const [booking, setBooking] = useState<CreatorListItem | null>(null);
  const [naoQuery, setNaoQuery] = useState("");
  const [naoPrompt, setNaoPrompt] = useState("");
  const [agentClass, setAgentClass] = useState("");

  const industryOptions = useMemo(
    () => Array.from(new Set(creators.flatMap((creator) => creator.niche_tags).filter(Boolean))).sort(),
    [creators],
  );
  const countryOptions = useMemo(
    () => Array.from(new Set(creators.map((creator) => creator.country).filter(Boolean))).sort(),
    [creators],
  );

  useEffect(() => {
    setSaved(readShortlist());
    try {
      const stored = localStorage.getItem(EXPERIENCE_KEY);
      if (stored === "ai" || stored === "marketplace") {
        setExperience(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify([...saved]));
    } catch {
      /* ignore */
    }
  }, [saved]);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".mkt-filter-wrap, .mkt-sort-wrap")) {
        return;
      }
      setOpenPop(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function setExperienceMode(next: Experience) {
    setExperience(next);
    try {
      localStorage.setItem(EXPERIENCE_KEY, next);
    } catch {
      /* ignore */
    }
    if (next === "marketplace") {
      setAgentClass("");
    }
  }

  function toggleSaved(id: string) {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleSelected(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const minPrice = priceMin ? Number(priceMin) : null;
  const maxPrice = priceMax ? Number(priceMax) : null;
  const minFol = followersMin ? Number(followersMin) : null;
  const maxFol = followersMax ? Number(followersMax) : null;
  const filtersActive =
    industries.length + countries.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (followersMin ? 1 : 0) + (followersMax ? 1 : 0);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const ai = naoPrompt.trim().toLowerCase();
    let rows = creators.filter((creator) => {
      if (view === "saved" && !saved.has(creator.id)) {
        return false;
      }
      if (industries.length && !creator.niche_tags.some((tag) => industries.includes(tag))) {
        return false;
      }
      if (countries.length && !countries.includes(creator.country)) {
        return false;
      }
      if (minPrice != null && !Number.isNaN(minPrice) && creator.price_per_post < minPrice) {
        return false;
      }
      if (maxPrice != null && !Number.isNaN(maxPrice) && creator.price_per_post > maxPrice) {
        return false;
      }
      if (minFol != null && !Number.isNaN(minFol) && creator.follower_count < minFol) {
        return false;
      }
      if (maxFol != null && !Number.isNaN(maxFol) && creator.follower_count > maxFol) {
        return false;
      }
      if (search) {
        const haystack = `${creator.name} ${creator.country} ${creator.niche_tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(search)) {
          return false;
        }
      }
      if (experience === "ai" && ai) {
        const tokens = ai.split(/\s+/).filter((token) => token.length > 2 && !STOPWORDS.has(token));
        if (tokens.length) {
          const haystack = `${creator.name} ${creator.country} ${creator.niche_tags.join(" ")}`.toLowerCase();
          if (!tokens.some((token) => haystack.includes(token))) {
            return false;
          }
        }
      }
      return true;
    });

    rows = [...rows];
    if (sort === "price") {
      rows.sort((a, b) => a.price_per_post - b.price_per_post);
    } else if (sort === "fol") {
      rows.sort((a, b) => b.follower_count - a.follower_count);
    }
    return rows;
  }, [
    creators,
    view,
    saved,
    industries,
    countries,
    minPrice,
    maxPrice,
    minFol,
    maxFol,
    query,
    naoPrompt,
    experience,
    sort,
  ]);

  function runNao(raw: string) {
    const value = raw.trim();
    if (!value) {
      return;
    }
    setExperienceMode("ai");
    setNaoPrompt(value);
    setNaoQuery(value);
    setAgentClass("has-result has-history");
  }

  function resetFilters() {
    setIndustries([]);
    setCountries([]);
    setPriceMin("");
    setPriceMax("");
    setFollowersMin("");
    setFollowersMax("");
    setQuery("");
    setSort("rel");
    setView("all");
  }

  const sortLabel = sort === "price" ? copy.sortPrice : sort === "fol" ? copy.sortFol : copy.sortRel;
  const emptyCopy = view === "saved" ? copy.emptyShortlist : filtersActive || query ? copy.emptyFilters : copy.emptyCatalogue;
  const pageTitle = experience === "ai" ? copy.aiTitle : copy.allCreatorsTitle;
  const hasAiResults = experience === "ai" && !!naoPrompt;

  return (
    <section
      className={`page visible${hasAiResults ? " has-ai-results" : ""}`}
      id="page-marketplace"
      data-experience={experience}
      data-screen-label={copy.title}
    >
      <div className="page-head mkt-page-head">
        <div className="mkt-page-heading-copy">
          <h1 id="mkt-page-title">{pageTitle}</h1>
          {experience === "ai" ? (
            <div className="page-sub" id="mkt-page-sub">
              {copy.aiSub}
            </div>
          ) : null}
        </div>
        <div className="mkt-experience-switch" role="tablist" aria-label={copy.experienceMarketplace}>
          <span className="mkt-experience-thumb" aria-hidden="true" />
          <button
            type="button"
            className={experience === "ai" ? "is-active" : ""}
            data-experience="ai"
            role="tab"
            aria-selected={experience === "ai"}
            onClick={() => setExperienceMode("ai")}
          >
            <span className="mkt-experience-nao-mark" aria-hidden="true">
              <img src="/lp/naano-logomark.png" alt="" />
            </span>
            <span>{copy.experienceAi}</span>
          </button>
          <button
            type="button"
            className={experience === "marketplace" ? "is-active" : ""}
            data-experience="marketplace"
            role="tab"
            aria-selected={experience === "marketplace"}
            onClick={() => setExperienceMode("marketplace")}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="8" cy="8" r="3" />
              <circle cx="16" cy="9" r="2.4" />
              <path d="M3.5 19c.7-3 3-4.6 5.5-4.6S13.8 16 14.5 19M14 14.6c1.8-.2 3.7.8 4.5 3.4" />
            </svg>
            <span>{copy.experienceMarketplace}</span>
          </button>
        </div>
      </div>

      <div className="mkt-toolbar" id="mkt-toolbar">
        <div className="mkt-mode" id="mkt-mode" role="tablist">
          <button type="button" className={view === "all" ? "on" : ""} data-m="all" role="tab" aria-selected={view === "all"} onClick={() => setView("all")}>
            <span>{copy.tabAll}</span> <span className="ct">{creators.length}</span>
          </button>
          <button type="button" className={view === "saved" ? "on" : ""} data-m="saved" role="tab" aria-selected={view === "saved"} onClick={() => setView("saved")}>
            <span>{copy.tabSaved}</span> <span className="ct">{saved.size}</span>
          </button>
        </div>
        <div className="mkt-ranking-note" id="mkt-ranking-note">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
          <span>
            <b>{copy.rankedTitle}</b>
            <small>{copy.rankedSub}</small>
          </span>
        </div>
      </div>

      <div className="mkt-sticky-search" id="mkt-sticky-search">
        <section className="mkt-filter-panel" id="mkt-filter-panel" aria-label={copy.filters}>
          <div className="mkt-filter-primary">
            <label className={`mkt-search-premium${query ? " has-value" : ""}`} id="mkt-search-control">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                id="mkt-search"
                type="search"
                autoComplete="off"
                placeholder={copy.searchPh}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" className="mkt-search-clear" onClick={() => setQuery("")} aria-label={copy.clear}>
                <svg viewBox="0 0 16 16" width="12" height="12">
                  <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </button>
            </label>
            <div className="mkt-sort-wrap" id="mkt-sort-wrap">
              <button
                type="button"
                className="mkt-sort-button"
                aria-expanded={openPop === "sort"}
                onClick={() => setOpenPop(openPop === "sort" ? null : "sort")}
              >
                <span className="mkt-sort-copy">
                  <small>{copy.sortBy}</small>
                  <span className="mkt-sort-value">{sortLabel}</span>
                </span>
                <span className="mkt-sort-caret" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="m5 8 5 5 5-5" />
                  </svg>
                </span>
              </button>
              <div className={`mkt-filter-pop mkt-sort-pop align-right${openPop === "sort" ? " is-open" : ""}`} role="listbox">
                {(
                  [
                    ["rel", copy.sortRel],
                    ["price", copy.sortPrice],
                    ["fol", copy.sortFol],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className="mkt-sort-option"
                    role="option"
                    aria-selected={sort === key}
                    onClick={() => {
                      setSort(key);
                      setOpenPop(null);
                    }}
                  >
                    <span>{label}</span>
                    <span className="mkt-sort-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="m3 8 3 3 7-7" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mkt-filter-secondary">
            <FilterMulti
              id="industry"
              label={copy.industry}
              searchPh={copy.searchIndustry}
              query={industryQ}
              onQuery={setIndustryQ}
              options={industryOptions.filter((option) => option.toLowerCase().includes(industryQ.toLowerCase()))}
              selected={industries}
              open={openPop === "industry"}
              onToggle={() => setOpenPop(openPop === "industry" ? null : "industry")}
              onChange={setIndustries}
            />
            <FilterMulti
              id="country"
              label={copy.country}
              searchPh={copy.searchCountry}
              query={countryQ}
              onQuery={setCountryQ}
              options={countryOptions.filter((option) => option.toLowerCase().includes(countryQ.toLowerCase()))}
              selected={countries}
              open={openPop === "country"}
              onToggle={() => setOpenPop(openPop === "country" ? null : "country")}
              onChange={setCountries}
            />
            <div className="mkt-filter-wrap" id="mkt-price-wrap">
              <button
                type="button"
                className={`mkt-filter-trigger${priceMin || priceMax ? " is-active" : ""}`}
                aria-expanded={openPop === "price"}
                onClick={() => setOpenPop(openPop === "price" ? null : "price")}
              >
                <span className="mkt-filter-label">{copy.price}</span>
              </button>
              <div className={`mkt-filter-pop mkt-price-pop align-right${openPop === "price" ? " is-open" : ""}`} role="dialog">
                <div className="mkt-price-head">
                  <div>
                    <b className="mkt-price-title">{copy.priceRange}</b>
                    <span className="mkt-price-subtitle">{copy.priceRangeHint}</span>
                  </div>
                </div>
                <div className="mkt-price-custom">
                  <label className="mkt-price-column">
                    <span>{copy.minPrice}</span>
                    <span className="mkt-price-pill">
                      <span>€</span>
                      <input type="number" min={0} step={10} value={priceMin} onChange={(event) => setPriceMin(event.target.value)} />
                    </span>
                  </label>
                  <span className="mkt-price-dash">—</span>
                  <label className="mkt-price-column">
                    <span>{copy.maxPrice}</span>
                    <span className="mkt-price-pill">
                      <span>€</span>
                      <input type="number" min={0} step={10} value={priceMax} onChange={(event) => setPriceMax(event.target.value)} />
                    </span>
                  </label>
                </div>
                <div className="mkt-price-actions">
                  <button type="button" className="mkt-price-clear" onClick={() => { setPriceMin(""); setPriceMax(""); }}>
                    {copy.clear}
                  </button>
                  <button type="button" className="mkt-price-apply" onClick={() => setOpenPop(null)}>
                    {copy.applyPrice}
                  </button>
                </div>
              </div>
            </div>
            <div className="mkt-filter-wrap" id="mkt-advanced-wrap">
              <button
                type="button"
                className={`mkt-filter-trigger${followersMin || followersMax ? " is-active" : ""}`}
                aria-expanded={openPop === "filters"}
                onClick={() => setOpenPop(openPop === "filters" ? null : "filters")}
              >
                <span className="mkt-filter-label">{copy.filters}</span>
                <span className={`mkt-filter-badge${followersMin || followersMax ? " show" : ""}`}>
                  {(followersMin ? 1 : 0) + (followersMax ? 1 : 0)}
                </span>
              </button>
              <div className={`mkt-filter-pop mkt-advanced-pop align-right${openPop === "filters" ? " is-open" : ""}`} role="dialog">
                <div className="mkt-advanced-head">
                  <b>{copy.performanceFilters}</b>
                  <span>{copy.filtersHint}</span>
                </div>
                <div className="mkt-advanced-grid">
                  <label className="mkt-advanced-field">
                    <span>{copy.minFollowers}</span>
                    <span className="mkt-advanced-input">
                      <input type="number" min={0} value={followersMin} onChange={(event) => setFollowersMin(event.target.value)} />
                    </span>
                  </label>
                  <label className="mkt-advanced-field">
                    <span>{copy.maxFollowers}</span>
                    <span className="mkt-advanced-input">
                      <input type="number" min={0} value={followersMax} onChange={(event) => setFollowersMax(event.target.value)} />
                    </span>
                  </label>
                </div>
                <div className="mkt-price-actions">
                  <button type="button" className="mkt-price-clear" onClick={() => { setFollowersMin(""); setFollowersMax(""); }}>
                    {copy.clearFilters}
                  </button>
                  <button type="button" className="mkt-price-apply" onClick={() => setOpenPop(null)}>
                    {copy.applyFilters}
                  </button>
                </div>
              </div>
            </div>
            <div className="mkt-filter-meta">
              <span>
                <b>{filtered.length}</b> <span>{copy.results}</span>
              </span>
              <button type="button" className={`mkt-filter-reset${filtersActive || query ? " show" : ""}`} onClick={resetFilters}>
                <span>{copy.reset}</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="mkt-workspace" id="mkt-workspace">
        <aside className={`mkt-agent ${agentClass}`} id="mkt-agent" data-enabled="true">
          <div className="mkt-agent-panel">
            <div className="mkt-lya-hero" id="mkt-lya-hero">
              <div className="mkt-lya-orb" aria-hidden="true">
                <span className="mkt-lya-orb-halo" />
                <span className="mkt-lya-orb-ring" />
                <span className="mkt-lya-orb-core">
                  <img src="/lp/naano-logomark.png" alt="" />
                </span>
              </div>
              <small>{copy.naoEyebrow}</small>
              <h2>
                <span>{copy.naoHero}</span> <em>{copy.naoAccent}</em>
              </h2>
              <p>{copy.naoBody}</p>
            </div>
            <div className="mkt-agent-scroll">
              <div className="mkt-agent-welcome">
                <div className="mkt-agent-answer" hidden={!naoPrompt} role="status">
                  <b>{filtered.length ? copy.naoAnswerTitle : copy.naoZeroTitle}</b>
                  <span>{filtered.length ? fill(copy.naoAnswerBody, { query: naoPrompt }) : copy.naoZeroBody}</span>
                </div>
              </div>
            </div>
            <form
              className="mkt-agent-command"
              onSubmit={(event) => {
                event.preventDefault();
                runNao(naoQuery);
              }}
            >
              <div className="mkt-agent-command-main">
                <span className="mkt-agent-logo">
                  <img src="/lp/naano-logomark.png" alt="" aria-hidden="true" />
                </span>
                <textarea
                  id="mkt-agent-input"
                  rows={1}
                  maxLength={500}
                  placeholder={copy.naoPlaceholder}
                  value={naoQuery}
                  onChange={(event) => setNaoQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      runNao(naoQuery);
                    }
                  }}
                />
                <button type="submit" className="mkt-agent-send" aria-label={copy.experienceAi}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 16V4M5.5 8.5 10 4l4.5 4.5" />
                  </svg>
                </button>
              </div>
              <div className="mkt-lya-composer-meta">
                <span>{copy.naoDisclaimer}</span>
              </div>
            </form>
            <div className="mkt-lya-starters">
              <small>{copy.startersLabel}</small>
              <div>
                {[copy.starterCompany, copy.starterNew, copy.starterViews].map((label) => (
                  <button type="button" key={label} onClick={() => runNao(label)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="mkt-results">
          <div className="mkt-lya-results-title">
            <small>{copy.naoSelection}</small>
            <h2>{copy.naoSelectionTitle}</h2>
          </div>
          {experience === "marketplace" ? (
            <div className="mkt-ranked-section-label">
              <b>{copy.topRanked}</b>
              <span>{copy.topRankedBody}</span>
            </div>
          ) : null}
          {filtered.length ? (
            <div className="creator-grid mkt-ranked-card-grid" id="creator-grid">
              {filtered.map((creator, index) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  locale={numberLocale}
                  copy={copy}
                  saved={saved.has(creator.id)}
                  selected={selected.has(creator.id)}
                  index={index}
                  onOpen={() => setProfile(creator)}
                  onBook={() => setBooking(creator)}
                  onToggleSave={() => toggleSaved(creator.id)}
                  onToggleSelect={() => toggleSelected(creator.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty" id="mkt-empty">
              <span>{emptyCopy}</span>
            </div>
          )}
        </main>
      </div>

      {experience === "marketplace" ? (
        <div className="mkt-dock">
          <button type="button" className="mkt-dock-mark" onClick={() => setExperienceMode("ai")} aria-label={copy.experienceAi}>
            <img src="/lp/naano-logomark.png" alt="" />
          </button>
          <input
            type="text"
            placeholder={copy.dockPlaceholder}
            onFocus={() => setExperienceMode("ai")}
            readOnly
          />
        </div>
      ) : null}

      {profile && !booking ? (
        <CreatorProfileModal
          listItem={profile}
          saved={saved.has(profile.id)}
          locale={numberLocale}
          copy={copy}
          onClose={() => setProfile(null)}
          onBook={() => setBooking(profile)}
          onToggleSave={() => toggleSaved(profile.id)}
        />
      ) : null}

      {booking ? (
        <CreatorSelectionModal
          creator={booking}
          locale={numberLocale}
          copy={copy}
          onBack={() => {
            setProfile(booking);
            setBooking(null);
          }}
          onClose={() => {
            setBooking(null);
            setProfile(null);
          }}
        />
      ) : null}
    </section>
  );
}

function FilterMulti({
  id,
  label,
  searchPh,
  query,
  onQuery,
  options,
  selected,
  open,
  onToggle,
  onChange,
}: {
  id: string;
  label: string;
  searchPh: string;
  query: string;
  onQuery: (value: string) => void;
  options: string[];
  selected: string[];
  open: boolean;
  onToggle: () => void;
  onChange: (next: string[]) => void;
}) {
  const triggerLabel = selected.length ? `${label} · ${selected.length}` : label;
  return (
    <div className="mkt-filter-wrap" id={`mkt-${id}-wrap`}>
      <button type="button" className={`mkt-filter-trigger${selected.length ? " is-active" : ""}`} aria-expanded={open} onClick={onToggle}>
        <span className="mkt-filter-label">{triggerLabel}</span>
      </button>
      <div className={`mkt-filter-pop${open ? " is-open" : ""}`}>
        <label className="mkt-filter-pop-search">
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={searchPh} />
        </label>
        <div className="mkt-filter-options" role="listbox">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <label className="mkt-filter-option" key={option}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
