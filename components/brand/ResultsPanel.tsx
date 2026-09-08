"use client";

import { useMemo, useState } from "react";
import { resultsHash, useResultsRoute } from "@/components/brand/useBrandTab";
import { fill, type ResultsCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

type Period = "7" | "30" | "365";
type LeadView = "people" | "companies";
type PostNet = "all" | "li" | "x";
type PostView = "table" | "feed";

function InfoTip({ text }: { text: string }) {
  return (
    <button className="ov3-info" type="button" aria-label={text}>
      <span className="ov3-info-b">i</span>
      <span className="ov3-tip">{text}</span>
    </button>
  );
}

function ZeroChart({ labels }: { labels: string[] }) {
  const n = Math.max(labels.length, 2);
  const xs = labels.map((_, index) => 48 + (index / Math.max(1, n - 1)) * 650);
  const y = 196;
  const points = xs.map((x) => `${x.toFixed(1)},${y}`).join(" ");
  const mid = Math.floor((n - 1) / 2);
  return (
    <svg className="nn-campaign-chart" viewBox="0 0 720 238" role="img">
      <line x1="48" x2="698" y1="34" y2="34" stroke="var(--ws-line)" />
      <line x1="48" x2="698" y1="115" y2="115" stroke="var(--ws-line)" />
      <line x1="48" x2="698" y1="196" y2="196" stroke="var(--ws-line)" />
      <text x="35" y="38" textAnchor="end">
        1
      </text>
      <text x="35" y="200" textAnchor="end">
        0
      </text>
      <polygon points={`48,196 ${points} 698,196`} fill="var(--blue)" opacity=".06" />
      <polyline points={points} fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="48" y="226">
        {labels[0]}
      </text>
      <text x="373" y="226" textAnchor="middle">
        {labels[mid]}
      </text>
      <text x="698" y="226" textAnchor="end">
        {labels[n - 1]}
      </text>
    </svg>
  );
}

function seriesLabels(period: Period, locale: Locale) {
  const loc = locale === "fr" ? "fr-FR" : "en-GB";
  const count = period === "365" ? 12 : Number(period);
  const now = new Date();
  const labels: string[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    if (period === "365") {
      date.setUTCMonth(date.getUTCMonth() - (count - 1 - i));
    } else {
      date.setUTCDate(date.getUTCDate() - (count - 1 - i));
    }
    labels.push(
      date.toLocaleDateString(loc, {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
    );
  }
  return labels;
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v12M8 7l4-4 4 4" />
      <path d="M5 15v4h14v-4" />
    </svg>
  );
}

function InfoGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 8h.01" />
    </svg>
  );
}

export function ResultsPanel({ locale, copy }: { locale: Locale; copy: ResultsCopy }) {
  const { campaignId, subtab } = useResultsRoute();
  const [period, setPeriod] = useState<Period>("30");
  const [leadView, setLeadView] = useState<LeadView>("people");
  const [leadQuery, setLeadQuery] = useState("");
  const [leadPriority, setLeadPriority] = useState("all");
  const [postView, setPostView] = useState<PostView>("table");
  const [postNet, setPostNet] = useState<PostNet>("all");
  const [pageSize, setPageSize] = useState("25");

  const labels = useMemo(() => seriesLabels(period, locale), [period, locale]);
  const filteredEmpty = Boolean(leadQuery.trim()) || leadPriority !== "all";
  const peopleEmpty = filteredEmpty ? copy.noFilterMatch : copy.emptyPeople;
  const companiesEmpty = filteredEmpty ? copy.noFilterMatch : copy.emptyCompanies;
  const postsEmpty = postNet === "x" ? copy.emptyX : copy.emptyPosts;

  return (
    <section className="page visible" id="page-results" data-screen-label={copy.title}>
      <div className="nn-results-heading">
        <h1>{copy.title}</h1>
      </div>
      <div className="nn-results-nav" id="results-nav">
        <div id="leads-views" role="tablist">
          {(
            [
              ["analytics", copy.tabAnalytics],
              ["leads", copy.tabLeads],
              ["posts", copy.tabPosts],
            ] as const
          ).map(([key, label]) => (
            <a
              key={key}
              className={subtab === key ? "on" : undefined}
              href={resultsHash(campaignId, key)}
              role="tab"
              id={`tab-${key}`}
              aria-controls={`leads-${key}`}
              aria-selected={subtab === key}
            >
              {label}
            </a>
          ))}
        </div>
        {subtab === "leads" ? (
          <button id="results-export" className="ov3-pill" type="button">
            <ExportIcon />
            <span>{copy.exportIcp}</span>
          </button>
        ) : null}
      </div>
      <div className="nn-results-toolbar">
        <label className="nn-campaign-picker">
          <span>{copy.campaignFilter}</span>
          <select className="select" id="results-campaign" defaultValue="all" aria-label={copy.campaignFilter}>
            <option value="all">{copy.allCampaigns}</option>
          </select>
        </label>
      </div>

      {subtab === "analytics" ? (
        <div id="leads-analytics" role="tabpanel" aria-labelledby="tab-analytics">
          <div id="results-summary" className="nn-analytics-summary">
            <div className="ov3-kpi nn-impressions-kpi">
              <div className="lbl">{copy.estReach}</div>
              <div className="val">0</div>
              <div className="foot">{copy.noPublishedPosts}</div>
            </div>
            <div className="ov3-kpi">
              <div className="lbl">
                {copy.qualifiedClicks}
                <InfoTip text={copy.clicksTip} />
              </div>
              <div className="val">0</div>
              <div className="foot">{copy.last30Days}</div>
            </div>
            <div className="ov3-kpi">
              <div className="lbl">
                {copy.committedBudget}
                <InfoTip text={copy.spendTip} />
              </div>
              <div className="val">
                0 <small>€</small>
              </div>
              <div className="foot">{fill(copy.bookingsNote, { n: "0" })}</div>
            </div>
          </div>
          <div id="results-chart-grid" className="nn-analytics-chart-grid">
            <div className="card ov3-chart-card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h2>{copy.perfTitle}</h2>
                <select
                  className="select"
                  id="nn-period"
                  value={period}
                  onChange={(event) => setPeriod(event.target.value as Period)}
                  aria-label={copy.perfTitle}
                  style={{ height: 36, borderRadius: 10 }}
                >
                  <option value="7">{copy.periodWeek}</option>
                  <option value="30">{copy.periodMonth}</option>
                  <option value="365">{copy.periodYear}</option>
                </select>
              </div>
              <div className="ov3-legend">
                <span>
                  <i style={{ background: "#1D5BF5" }} />
                  {copy.qualifiedClicks}
                </span>
                <span className="ov3-legend-hint">{copy.legendHint}</span>
              </div>
              <ZeroChart labels={labels} />
            </div>
            <div className="card nn-post-performance">
              <div className="nn-post-performance-heading">
                <h2>{copy.postPerformance}</h2>
                <span>{copy.withoutPixel}</span>
              </div>
              <p className="nn-funnel-caption">{copy.nativePostMetrics}</p>
              <dl>
                <div>
                  <dt>{copy.postsCount}</dt>
                  <dd>0</dd>
                </div>
                <div>
                  <dt>{copy.reactions}</dt>
                  <dd>0</dd>
                </div>
                <div>
                  <dt>{copy.comments}</dt>
                  <dd>0</dd>
                </div>
              </dl>
              <a className="nn-posts-link" href={resultsHash(campaignId, "posts")}>
                {copy.viewPosts} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="nn-pixel-notice">
            <span className="nn-pixel-icon" aria-hidden="true">
              <InfoGlyph />
            </span>
            <div>
              <strong>{copy.siteConversions}</strong>
              <p>{copy.siteConversionsBody}</p>
            </div>
            <a className="btn" href="#integrations">
              {copy.installPixel}
            </a>
          </div>
        </div>
      ) : null}

      {subtab === "leads" ? (
        <div id="leads-leads" role="tabpanel" aria-labelledby="tab-leads">
          <div className="nn-lead-summary" aria-live="polite">
            <span>
              <b>0</b> {copy.people}
            </span>
            <span>
              <b>0</b> {copy.inIcp}
            </span>
            <span>
              <b>0</b> {copy.companies}
            </span>
            <span>
              <b>0</b> {copy.highPriority}
            </span>
          </div>
          <div className="cl2-wrap" id="ld2-wrap">
            <div className="card nn-lead-card">
              <div className="nn-lead-controls">
                <div className="nn-lead-tabs" role="group" aria-label={copy.peopleTab}>
                  <button
                    type="button"
                    aria-pressed={leadView === "people"}
                    onClick={() => setLeadView("people")}
                  >
                    {copy.peopleTab} <span>0</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={leadView === "companies"}
                    onClick={() => setLeadView("companies")}
                  >
                    {copy.companiesTab} <span>0</span>
                  </button>
                </div>
                <label className="nn-lead-search">
                  <input
                    type="search"
                    value={leadQuery}
                    onChange={(event) => setLeadQuery(event.target.value)}
                    aria-label={copy.searchLeads}
                    placeholder={copy.searchLeads}
                  />
                </label>
                <select
                  className="select"
                  aria-label={copy.colPriority}
                  value={leadPriority}
                  onChange={(event) => setLeadPriority(event.target.value)}
                >
                  <option value="all">{copy.allPriorities}</option>
                  <option value="high">{copy.highPriority}</option>
                  <option value="warm">{copy.prioWarm}</option>
                  <option value="new">{copy.prioNew}</option>
                </select>
              </div>
              {leadView === "people" ? (
                <div className="ld2-tcard" id="nn-lead-people">
                  <div className="ld2-tblwrap">
                    <table className="st-table" id="ld2-people">
                      <thead>
                        <tr>
                          <th>{copy.colPerson}</th>
                          <th>{copy.colCompany}</th>
                          <th>{copy.colEngagement}</th>
                          <th>{copy.colSource}</th>
                          <th>{copy.colPriority}</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 18 }}>
                            {peopleEmpty}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="ld2-tcard" id="nn-lead-companies">
                  <div className="ld2-tblwrap">
                    <table className="st-table" id="ld2-companies">
                      <thead>
                        <tr>
                          <th>{copy.colCompany}</th>
                          <th>{copy.inIcp}</th>
                          <th>{copy.peopleTab}</th>
                          <th>{copy.colEngagement}</th>
                          <th>{copy.colPriority}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="muted" style={{ textAlign: "center", padding: 18 }}>
                            {companiesEmpty}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {subtab === "posts" ? (
        <div id="leads-posts" role="tabpanel" aria-labelledby="tab-posts">
          <div className="cl2-wrap" id="pc-wrap">
            <div className="card" style={{ padding: "20px 22px 0" }}>
              <div className="pc-posts-head">
                <div>
                  <b style={{ fontSize: "1.1rem" }}>{copy.publishedContent}</b>
                  <div className="muted" id="pc-summary" style={{ fontSize: ".88rem", marginTop: 2 }}>
                    0 {copy.postsCount}
                  </div>
                </div>
                <div className="pc-posts-actions">
                  <div className="pc-vtog">
                    <button
                      className={postView === "table" ? "on" : undefined}
                      type="button"
                      id="pcv-table"
                      onClick={() => setPostView("table")}
                    >
                      <ListIcon /> {copy.viewTable}
                    </button>
                    <button
                      className={postView === "feed" ? "on" : undefined}
                      type="button"
                      id="pcv-feed"
                      onClick={() => setPostView("feed")}
                    >
                      <GridIcon /> {copy.viewFeed}
                    </button>
                  </div>
                  <button className="ov3-pill" type="button">
                    <ExportIcon /> {copy.exportLabel}
                  </button>
                </div>
              </div>
              <div className="tabs" id="pc-tabs">
                {(
                  [
                    ["all", copy.tabAllPosts],
                    ["li", copy.tabLinkedin],
                    ["x", copy.tabX],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    className={`tab${postNet === key ? " on" : ""}`}
                    type="button"
                    onClick={() => setPostNet(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {postView === "table" ? (
                <div style={{ overflowX: "auto" }} id="pc-tablewrap">
                  <table className="st-table" id="pc-table">
                    <thead>
                      <tr>
                        <th>{copy.colPost}</th>
                        <th>{copy.colCampaign}</th>
                        <th>{copy.colPublished}</th>
                        <th>{copy.estReach}</th>
                        <th>{copy.colReactions}</th>
                        <th>{copy.colComments}</th>
                        <th>{copy.colStatus}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="muted" style={{ textAlign: "center", padding: 18 }}>
                          {postsEmpty}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div id="pc-feed">
                  <div className="muted" style={{ padding: "18px 0", fontSize: ".9rem" }}>
                    {postsEmpty}
                  </div>
                </div>
              )}
              <div className="cl2-foot" id="pc-foot">
                <span className="muted" id="pc-count" style={{ fontSize: ".86rem" }}>
                  0 {copy.postsCount}
                </span>
                <span className="muted" style={{ fontSize: ".86rem", display: "flex", alignItems: "center", gap: 8 }}>
                  {copy.rowsPerPage}{" "}
                  <select
                    className="select"
                    id="pc-psize"
                    value={pageSize}
                    onChange={(event) => setPageSize(event.target.value)}
                    style={{ height: 32, padding: "0 8px" }}
                  >
                    <option>10</option>
                    <option>25</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}