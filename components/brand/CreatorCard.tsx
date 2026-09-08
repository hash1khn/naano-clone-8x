import type { CreatorListItem } from "@/lib/api/types";
import type { MarketplaceCopy } from "@/lib/i18n/brand";
import {
  avatarTone,
  compactNumber,
  countryFlag,
  formatEuro,
  initials,
  roleLabel,
  skyTone,
} from "@/lib/marketplace/format";

export function CreatorCard({
  creator,
  locale,
  copy,
  saved,
  selected,
  index,
  onOpen,
  onBook,
  onToggleSave,
  onToggleSelect,
}: {
  creator: CreatorListItem;
  locale: string;
  copy: MarketplaceCopy;
  saved: boolean;
  selected: boolean;
  index: number;
  onOpen: () => void;
  onBook: () => void;
  onToggleSave: () => void;
  onToggleSelect: () => void;
}) {
  const tones = avatarTone(creator.slug || creator.id);
  const flag = countryFlag(creator.country);
  const saveLabel = saved ? copy.unstar : copy.star;

  return (
    <article
      className={`card mkt-creator-card${selected ? " is-bulk-selected" : ""}`}
      data-creator-id={creator.id}
      style={{ ["--mkt-card-index" as string]: Math.min(20, index) }}
      aria-labelledby={`mkt-creator-${creator.id}-name`}
      onClick={onOpen}
    >
      <div className="mkt-card-flipper">
        <section className="mkt-card-face mkt-card-front">
          <div className="mkt-card-cover">
            <div className="mkt-card-cover-media">
              <div className={`mkt-card-naano-banner mkt-sky-banner mkt-sky-${skyTone(creator.slug || creator.id)}`} aria-hidden="true" />
            </div>
            <div className="mkt-card-cover-left">
              <button
                type="button"
                className="mkt-card-bulk-check"
                aria-pressed={selected}
                aria-label={creator.name}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSelect();
                }}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <rect className="mkt-check-box" x="3.2" y="3.2" width="13.6" height="13.6" rx="3.4" />
                  <path className="mkt-check-mark" d="M6.1 10.2l2.5 2.5 5.3-5.5" />
                </svg>
              </button>
              <button type="button" className="mkt-card-top-icon mkt-card-linkedin-top" disabled aria-label="LinkedIn">
                <span className="mkt-linkedin-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                    <path d="M14.2 14.2h-2.5V9.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.7H5.9V6.2h2.4v1.1h.03c.3-.6 1.2-1.3 2.5-1.3 2.7 0 3.2 1.8 3.2 4.1v4.1ZM3.6 5.1a1.5 1.5 0 1 1 0-2.9 1.5 1.5 0 0 1 0 2.9ZM4.9 14.2H2.3V6.2h2.6v8Z" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="mkt-card-cover-actions">
              <button
                type="button"
                className={`mkt-card-top-icon mkt-card-save mkt-card-save-top${saved ? " saved" : ""}`}
                aria-label={saveLabel}
                title={saveLabel}
                aria-pressed={saved}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSave();
                }}
              >
                <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" />
                </svg>
              </button>
              <button
                type="button"
                className="mkt-card-add"
                onClick={(event) => {
                  event.stopPropagation();
                  onBook();
                }}
              >
                {copy.book}
              </button>
            </div>
            <button
              type="button"
              className="mkt-avatar-ring"
              aria-label={`${copy.viewProfile} · ${creator.name}`}
              onClick={(event) => {
                event.stopPropagation();
                onOpen();
              }}
            >
              <span className="mkt-avatar" style={{ background: `linear-gradient(135deg,${tones[0]},${tones[1]})` }}>
                <span aria-hidden="true">{initials(creator.name)}</span>
                {creator.avatar_url ? <img src={creator.avatar_url} alt="" /> : null}
              </span>
            </button>
          </div>
          <div className="mkt-profile-copy">
            <h3 id={`mkt-creator-${creator.id}-name`} title={creator.name}>
              {creator.name}
            </h3>
            <div className="mkt-card-role">
              <span>{roleLabel(creator, copy.creatorLabel)}</span>
              {flag ? (
                <span className="mkt-card-country-flag" role="img" aria-label={creator.country}>
                  {flag}
                </span>
              ) : null}
            </div>
            <div className="mkt-card-bio is-empty">&nbsp;</div>
          </div>
          <div className="mkt-card-stats has-cpm">
            <div className="mkt-card-stat">
              <b>{compactNumber(creator.follower_count, locale)}</b>
              <span>{copy.followers}</span>
            </div>
            <div className="mkt-card-stat">
              <b>—</b>
              <span>{copy.medianViews}</span>
            </div>
            <div className="mkt-card-stat">
              <b>—</b>
              <span>{copy.cpm}</span>
            </div>
            <div className="mkt-card-stat">
              <b>{formatEuro(creator.price_per_post, locale)}</b>
              <span>{copy.postCost}</span>
            </div>
          </div>
          <button
            type="button"
            className="mkt-card-analysis"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 19c.8-3.2 3.4-5 7-5s6.2 1.8 7 5" />
            </svg>
            <span>{copy.viewProfile}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </section>
      </div>
    </article>
  );
}
