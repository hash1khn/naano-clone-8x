"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Creator, CreatorListItem } from "@/lib/api/types";
import { fill, type MarketplaceCopy } from "@/lib/i18n/brand";
import {
  compactNumber,
  formatEuro,
  initials,
  mergeCreator,
  parseSamplePosts,
  roleLabel,
  type ParsedSamplePost,
} from "@/lib/marketplace/format";

type ProfileTab = "overview" | "audience" | "content";

export function CreatorProfileModal({
  listItem,
  saved,
  locale,
  copy,
  onClose,
  onBook,
  onToggleSave,
}: {
  listItem: CreatorListItem;
  saved: boolean;
  locale: string;
  copy: MarketplaceCopy;
  onClose: () => void;
  onBook: () => void;
  onToggleSave: () => void;
}) {
  const [tab, setTab] = useState<ProfileTab>("overview");
  const [detail, setDetail] = useState<Creator | null>(null);
  const [postIndex, setPostIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const saveLabel = saved ? copy.unstar : copy.star;
  const creator = mergeCreator(listItem, detail);
  const posts = parseSamplePosts(creator.sample_posts);
  const subtitle = `${roleLabel(listItem, copy.creatorLabel)} · ${copy.linkedinCreator}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/creators/${encodeURIComponent(listItem.slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((payload: Creator | null) => {
        if (!cancelled && payload) {
          setDetail(payload);
        }
      })
      .catch(() => {
        /* keep list item */
      });
    return () => {
      cancelled = true;
    };
  }, [listItem.slug]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="overlay open" id="modal-creator" onClick={onClose}>
      <div
        className="modal"
        id="modal-creator-body"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nn-cm-name"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="nn-profile-stage is-detail">
          <section className="nn-profile-face nn-profile-detail">
            <header className="nn-profile-back-head">
              <span className="nn-profile-avatar">
                <span aria-hidden="true">{initials(creator.name)}</span>
                {creator.avatar_url ? <img src={creator.avatar_url} alt="" /> : null}
              </span>
              <div className="nn-profile-identity">
                <h2 id="nn-cm-name">{creator.name}</h2>
                <p>{subtitle}</p>
              </div>
              <div className="nn-profile-head-actions">
                <button
                  type="button"
                  id="nn-profile-favorite"
                  className={`nn-profile-favorite${saved ? " saved" : ""}`}
                  aria-label={saveLabel}
                  title={saveLabel}
                  aria-pressed={saved}
                  onClick={onToggleSave}
                >
                  <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" />
                  </svg>
                </button>
                <button type="button" className="modal-close nn-profile-close" onClick={onClose} aria-label={copy.close}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </header>
            <div className="nn-decision-workspace">
              <main className="nn-back-stack" id="nn-profile-back-content">
                <section className="nn-decision-tabs">
                  <div className="nn-decision-tablist" role="tablist" aria-label={copy.overview}>
                    {(["overview", "audience", "content"] as const).map((id) => (
                      <button
                        key={id}
                        type="button"
                        className="nn-decision-tab"
                        role="tab"
                        aria-selected={tab === id}
                        onClick={() => setTab(id)}
                      >
                        {copy[id]}
                      </button>
                    ))}
                  </div>
                  <div className="nn-decision-panel" role="tabpanel" hidden={tab !== "overview"}>
                    <OverviewTab creator={creator} posts={posts} locale={locale} copy={copy} />
                  </div>
                  <div className="nn-decision-panel" role="tabpanel" hidden={tab !== "audience"}>
                    <div className="nn-audience-tab-head">
                      <div>
                        <h3>{copy.audienceComposition}</h3>
                        <p>{copy.audienceHelp}</p>
                      </div>
                    </div>
                    <div className="nn-audience-empty">{copy.audienceUnavailable}</div>
                  </div>
                  <div className="nn-decision-panel" role="tabpanel" hidden={tab !== "content"}>
                    <ContentTab
                      creator={creator}
                      posts={posts}
                      postIndex={postIndex}
                      onSelectPost={setPostIndex}
                      locale={locale}
                      copy={copy}
                    />
                  </div>
                </section>
              </main>
              <aside id="nn-booking-rail" className="nn-insight-section nn-offer-selector">
                <div className="nn-booking-head">
                  <h3>{copy.bookThisCreator}</h3>
                </div>
                <div className="nn-bundle-grid">
                  <button type="button" data-bundle="single" className="nn-bundle-choice selected" aria-pressed="true">
                    <span className="nn-choice-content">
                      <span className="nn-choice-top">
                        <span className="nn-choice-icon" aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="14" height="14">
                            <circle cx="8" cy="8" r="6" fill="currentColor" />
                          </svg>
                        </span>
                      </span>
                      <span className="nn-choice-title">{copy.singlePost}</span>
                      <span className="nn-choice-bottom">
                        <span className="nn-choice-price">
                          <strong>{formatEuro(creator.price_per_post, locale)}</strong>
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
                <dl className="nn-booking-facts">
                  <div>
                    <dt>{copy.typicalReach}</dt>
                    <dd>—</dd>
                  </div>
                  <div>
                    <dt>{copy.estimatedCpm}</dt>
                    <dd>—</dd>
                  </div>
                  <div>
                    <dt>{copy.postsAnalyzed}</dt>
                    <dd>{posts.length || "—"}</dd>
                  </div>
                </dl>
                <details className="nn-booking-formula">
                  <summary>
                    {copy.howPricing}
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </summary>
                  <p>{copy.pricingBody}</p>
                </details>
                <div className="nn-canvas-booking">
                  <button type="button" className="nn-canvas-cta" onClick={onBook}>
                    {fill(copy.collaborateWith, { name: creator.name })}
                  </button>
                  <span className="nn-canvas-booking-note">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M12 3 4 7v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
                      <path d="m8.5 12 2.4 2.4 4.6-5" />
                    </svg>
                    {copy.secureBooking}
                  </span>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function OverviewTab({
  creator,
  posts,
  locale,
  copy,
}: {
  creator: Creator;
  posts: ParsedSamplePost[];
  locale: string;
  copy: MarketplaceCopy;
}) {
  const evidence = [`${compactNumber(creator.follower_count, locale)} ${copy.followers.toLowerCase()}`];

  return (
    <div className="nn-overview-panel">
      <section className="nn-overview-match">
        <div className="nn-overview-title">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M12 3l1.4 4.2L18 8.6l-3.6 3.2L15.4 16 12 13.8 8.6 16l1-4.2L6 8.6l4.6-1.4L12 3Z" />
          </svg>
          <h3>{copy.creatorOverview}</h3>
        </div>
        <p>{creator.bio?.trim() || copy.overviewBody}</p>
        <div className="nn-overview-evidence">
          {evidence.map((item) => (
            <span key={item}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="8" cy="8" r="6.2" />
                <path d="m5 8.2 2 2 4-4.2" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className="nn-overview-section">
        <div className="nn-overview-section-head">
          <h3>{copy.audienceSnapshot}</h3>
        </div>
        <div className="nn-audience-empty">{copy.audienceUnavailable}</div>
      </section>
      <section className="nn-overview-section">
        <div className="nn-overview-section-head">
          <h3>{copy.contentPerformance}</h3>
        </div>
        <div className="nn-overview-content">
          <div className="nn-audience-empty">{copy.reachUnavailable}</div>
          {posts[0] ? <PostCard post={posts[0]} name={creator.name} copy={copy} locale={locale} /> : <div className="nn-audience-empty">{copy.contentUnavailable}</div>}
        </div>
      </section>
      <details className="nn-overview-profile">
        <summary>
          {copy.professionalProfile}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </summary>
        <div>
          {creator.bio?.trim() ? (
            <section className="nn-profile-about">
              <h4>{copy.aboutCreator}</h4>
              <p>{creator.bio}</p>
            </section>
          ) : (
            <div className="nn-audience-empty">{copy.audienceUnavailable}</div>
          )}
        </div>
      </details>
    </div>
  );
}

function ContentTab({
  creator,
  posts,
  postIndex,
  onSelectPost,
  locale,
  copy,
}: {
  creator: Creator;
  posts: ParsedSamplePost[];
  postIndex: number;
  onSelectPost: (index: number) => void;
  locale: string;
  copy: MarketplaceCopy;
}) {
  const current = posts[postIndex];
  const lastLabel = current?.postedAt
    ? new Date(current.postedAt).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
    : copy.notAvailable;

  return (
    <div className="nn-content-layout">
      <aside className="nn-content-summary">
        <h3>{copy.contentSignals}</h3>
        <p>{copy.contentSignalsHelp}</p>
        {creator.niche_tags.length ? (
          <div className="nn-content-topics">
            {creator.niche_tags.slice(0, 6).map((tag) => (
              <span className="nn-content-topic" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="nn-content-facts">
          <div className="nn-content-fact">
            <b>{lastLabel}</b>
            <span>{copy.latestPost}</span>
          </div>
          <div className="nn-content-fact">
            <b>{copy.notAvailable}</b>
            <span>{copy.cadence}</span>
          </div>
          <div className="nn-content-fact">
            <b>{copy.notAvailable}</b>
            <span>{copy.typicalRange}</span>
          </div>
          <div className="nn-content-fact">
            <b>{posts.length}</b>
            <span>{copy.postsAnalyzed}</span>
          </div>
        </div>
      </aside>
      <section className="nn-insight-section nn-post-section">
        <div className="nn-insight-title">
          <h3>
            <span className="nn-post-platform">{copy.linkedinPosts}</span>
          </h3>
          {posts.length > 1 ? (
            <div className="nn-post-carousel-controls">
              <button type="button" className="nn-post-carousel-button" onClick={() => onSelectPost((postIndex - 1 + posts.length) % posts.length)} aria-label="Previous">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </button>
              <span className="nn-post-carousel-position">
                {fill(copy.postPosition, { current: String(postIndex + 1), total: String(posts.length) })}
              </span>
              <button type="button" className="nn-post-carousel-button" onClick={() => onSelectPost((postIndex + 1) % posts.length)} aria-label="Next">
                <svg viewBox="0 0 16 16" width="14" height="14">
                  <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        {current ? (
          <div className="nn-post-list nn-post-primary">
            <PostCard post={current} name={creator.name} copy={copy} locale={locale} />
          </div>
        ) : (
          <div className="nn-audience-empty">{copy.contentUnavailable}</div>
        )}
      </section>
    </div>
  );
}

function PostCard({
  post,
  name,
  copy,
  locale,
}: {
  post: ParsedSamplePost;
  name: string;
  copy: MarketplaceCopy;
  locale: string;
}) {
  const dateLabel = post.postedAt
    ? new Date(post.postedAt).toLocaleDateString(locale, { day: "numeric", month: "short" })
    : "";

  return (
    <div className="nn-featured-post">
      <div className="nn-linkedin-post-head">
        <span className="nn-linkedin-post-avatar">{initials(name)}</span>
        <span className="nn-linkedin-post-author">
          <b>{name}</b>
          <span>
            {dateLabel}
            {dateLabel ? " · " : ""}
            {copy.publicPost}
            {post.url ? (
              <a className="nn-post-original-cue" href={post.url} target="_blank" rel="noopener noreferrer">
                {copy.openOriginal}
              </a>
            ) : null}
          </span>
        </span>
      </div>
      <div className="nn-post-copy">
        <p>{post.text}</p>
      </div>
      <div className="nn-post-metrics">
        {post.impressions != null ? <span>{compactNumber(post.impressions, locale)}</span> : null}
        {post.likes != null ? <span>{compactNumber(post.likes, locale)}</span> : null}
        {post.comments != null ? <span>{compactNumber(post.comments, locale)}</span> : null}
        {post.shares != null ? <span>{compactNumber(post.shares, locale)}</span> : null}
      </div>
    </div>
  );
}
