"use client";

import { useEffect, useMemo, useState } from "react";
import type { CampaignListItem, CreatorListItem, DealListItem } from "@/lib/api/types";
import {
  collabChip,
  dealToCollabRow,
  filterCollabRows,
  isApplication,
  needsBrandAction,
  nextDealStatus,
  type CollabRow,
  type CollabTab,
} from "@/lib/collaborations/rows";
import { fill, type CollaborationsCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";
import { initials } from "@/lib/marketplace/format";

const TABS: { id: CollabTab; label: keyof CollaborationsCopy }[] = [
  { id: "all", label: "tabAll" },
  { id: "active", label: "tabActive" },
  { id: "received", label: "tabReceived" },
  { id: "invited", label: "tabInvited" },
  { id: "action", label: "tabAction" },
  { id: "completed", label: "tabCompleted" },
];

function Avatar({ name, src }: { name: string; src: string }) {
  return (
    <span className="cav sm">
      <span className="avatar-sm" style={{ background: "#DBE0EA", color: "#5B6578" }}>
        {initials(name) || "?"}
      </span>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(e) => e.currentTarget.remove()} />
      ) : null}
    </span>
  );
}

function StatusChip({ row, copy }: { row: CollabRow; copy: CollaborationsCopy }) {
  const chip = collabChip(row.statusKey, copy);
  return (
    <span className="cl2-st" style={{ background: chip.bg, color: chip.fg }}>
      {chip.label}
    </span>
  );
}

export function CollaborationsPanel({
  locale,
  copy,
  creators,
}: {
  locale: Locale;
  copy: CollaborationsCopy;
  creators: CreatorListItem[];
}) {
  const [deals, setDeals] = useState<DealListItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<CollabTab>("all");
  const [campaignId, setCampaignId] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<CollabRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const creatorsById = useMemo(() => new Map(creators.map((c) => [c.id, c])), [creators]);
  const campaignsById = useMemo(() => new Map(campaigns.map((c) => [c.id, c])), [campaigns]);

  async function load() {
    setLoading(true);
    try {
      const [dealsRes, campaignsRes] = await Promise.all([
        fetch("/api/deals?role=brand"),
        fetch("/api/campaigns"),
      ]);
      if (dealsRes.ok) {
        const data = (await dealsRes.json()) as { deals?: DealListItem[] };
        setDeals(Array.isArray(data.deals) ? data.deals : []);
      } else {
        setDeals([]);
      }
      if (campaignsRes.ok) {
        const data = (await campaignsRes.json()) as { campaigns?: CampaignListItem[] };
        setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : []);
      } else {
        setCampaigns([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const [first, campaign] = hash.split("/");
    if (first === "collaborations" && campaign) {
      setCampaignId(campaign);
    }
  }, []);

  const rows = useMemo(
    () => deals.map((deal) => dealToCollabRow(deal, creatorsById, campaignsById, copy, locale)),
    [deals, creatorsById, campaignsById, copy, locale],
  );

  const scoped = useMemo(
    () => rows.filter((row) => campaignId === "all" || row.campaignId === campaignId),
    [rows, campaignId],
  );

  const counts = useMemo(() => {
    return {
      all: scoped.length,
      active: filterCollabRows(scoped, "active").length,
      received: filterCollabRows(scoped, "received").length,
      invited: filterCollabRows(scoped, "invited").length,
      action: filterCollabRows(scoped, "action").length,
      completed: filterCollabRows(scoped, "completed").length,
    };
  }, [scoped]);

  const committedCents = useMemo(
    () => scoped.reduce((sum, row) => sum + (row.committed ? Math.max(0, row.priceCents) : 0), 0),
    [scoped],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return filterCollabRows(scoped, tab).filter(
      (row) => !q || row.name.toLowerCase().includes(q) || row.campaign.toLowerCase().includes(q),
    );
  }, [scoped, tab, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  useEffect(() => {
    setPage(1);
  }, [tab, query, campaignId, pageSize]);

  const numberLocale = locale === "fr" ? "fr-FR" : "en-GB";
  const committedLabel = `€${Math.round(committedCents / 100).toLocaleString(numberLocale)}`;

  const showingLabel =
    filtered.length === 0
      ? copy.showingNone
      : fill(copy.showing, {
          from: String((safePage - 1) * pageSize + 1),
          to: String(Math.min(safePage * pageSize, filtered.length)),
          total: String(filtered.length),
        });

  async function advance(row: CollabRow) {
    const next = nextDealStatus(row.dealStatus);
    if (!next) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/deals/${row.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) {
        await load();
        setSelected((prev) => (prev?.id === row.id ? null : prev));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function approve(row: CollabRow) {
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/deals/${row.id}/approve`, { method: "POST" });
      if (res.ok) {
        await load();
        setSelected(null);
      }
    } finally {
      setBusyId(null);
    }
  }

  async function copyTracking(row: CollabRow) {
    if (!row.trackingLink) return;
    const url = row.trackingLink.startsWith("http") ? row.trackingLink : `${window.location.origin}/t/${row.trackingLink}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  function openMessages(row: CollabRow) {
    window.location.hash = "messages";
    try {
      sessionStorage.setItem("naano.messages.openCreator", row.creatorId);
    } catch {
      /* ignore */
    }
  }

  function pageButtons() {
    if (pageCount <= 1) {
      return (
        <button type="button" className="on">
          1
        </button>
      );
    }
    const win: number[] = [];
    let prev = 0;
    for (let i = 1; i <= pageCount; i += 1) {
      if (i === 1 || i === pageCount || Math.abs(i - safePage) <= 1) {
        if (prev && i - prev > 1) win.push(0);
        win.push(i);
        prev = i;
      }
    }
    return (
      <>
        <button type="button" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)} style={safePage <= 1 ? { opacity: 0.4 } : undefined}>
          ‹
        </button>
        {win.map((n, idx) =>
          n === 0 ? (
            <span key={`e-${idx}`} className="pg-ell">
              …
            </span>
          ) : (
            <button key={n} type="button" className={n === safePage ? "on" : undefined} onClick={() => setPage(n)}>
              {n}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={safePage >= pageCount}
          onClick={() => setPage(safePage + 1)}
          style={safePage >= pageCount ? { opacity: 0.4 } : undefined}
        >
          ›
        </button>
      </>
    );
  }

  return (
    <section className="page visible" id="page-collaborations" data-screen-label={copy.title}>
      <section className="cl2-hero nn-campaign-header" aria-labelledby="cl2-title">
        <div className="cl2-hero-main">
          <div className="cl2-hero-copy">
            <h1 id="cl2-title">{copy.title}</h1>
          </div>
          <div className="cl2-hero-stats" aria-label="Collaboration overview">
            <div className="cl2-stat" id="cl2-stat-count">
              <span className="ic" aria-hidden="true" />
              <div>
                <b>{counts.all.toLocaleString(numberLocale)}</b>
                <span>{copy.collaborationsLabel}</span>
              </div>
            </div>
            <div className="cl2-stat" id="cl2-stat-committed">
              <span className="ic" aria-hidden="true" />
              <div>
                <b>{committedLabel}</b>
                <span>{copy.committed}</span>
              </div>
            </div>
            <div className="cl2-stat" id="cl2-stat-action">
              <span className="ic" aria-hidden="true" />
              <div>
                <b>{counts.action.toLocaleString(numberLocale)}</b>
                <span>{copy.toDo}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nn-campaign-toolbar">
          <label className="nn-campaign-picker">
            <span>Campaign</span>
            <select
              className="select"
              id="cl2-campaign"
              value={campaignId}
              onChange={(e) => {
                const value = e.target.value;
                setCampaignId(value);
                setTab("all");
                setSelected(null);
                window.history.replaceState(
                  null,
                  "",
                  value === "all" ? "#collaborations" : `#collaborations/${value}`,
                );
              }}
            >
              <option value="all">{copy.allCampaigns}</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.objective?.trim() || copy.campaignFallback}
                </option>
              ))}
            </select>
          </label>
          <label className="search cl2-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="cl2-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPh}
            />
          </label>
          <div className="nn-campaign-actions">
            {campaignId !== "all" ? (
              <button type="button" className="btn btn-ghost" onClick={() => (window.location.hash = "campaigns")}>
                {copy.openCampaign}
              </button>
            ) : null}
          </div>
        </div>

        <div className="cl2-control-deck">
          <div className="tabs cl2-tabs nn-liquid-segment" id="cl2-tabs" role="tablist" aria-label="Collaboration filters">
            {TABS.map((item) => {
              const on = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`tab${on ? " on" : ""}`}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setTab(item.id);
                    setSelected(null);
                  }}
                >
                  <span>{copy[item.label]}</span> <span className="pill">{counts[item.id]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div id="cl2-review" style={{ marginBottom: 18 }} />

      <div className="cl2-wrap" id="cl2-wrap">
        <div className="card st-table-card" style={{ marginBottom: 0, minWidth: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table className="st-table" id="cl2-table">
              <thead>
                <tr>
                  <th>
                    <label className="cl2-select-all">
                      <input type="checkbox" disabled aria-label={copy.colCreator} />
                      <span>{copy.colCreator}</span>
                    </label>
                  </th>
                  <th>{copy.colCampaign}</th>
                  <th>{copy.colStatus}</th>
                  <th>{copy.colNext}</th>
                  <th>{copy.colDue}</th>
                  <th>{copy.colAmount}</th>
                  <th>{copy.colUpdated}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="muted" style={{ textAlign: "center", padding: 18 }}>
                      …
                    </td>
                  </tr>
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="muted" style={{ textAlign: "center", padding: 18 }}>
                      {tab === "all" ? copy.emptyAll : copy.emptyTab}
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => {
                    const selectedRow = selected?.id === row.id;
                    return (
                      <tr
                        key={row.id}
                        className={`cl2-row${isApplication(row) ? " is-application" : ""}${needsBrandAction(row) ? " needs-review" : ""}${selectedRow ? " sel" : ""}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelected(selectedRow ? null : row)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(selectedRow ? null : row);
                          }
                        }}
                      >
                        <td>
                          <div className="tc">
                            <Avatar name={row.name} src={row.avatar} />
                            <div>
                              <b>{row.name}</b>
                              <span className="muted" style={{ fontSize: "0.78rem" }}>
                                {row.followers} {copy.followers}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{row.campaign}</td>
                        <td>
                          <StatusChip row={row} copy={copy} />
                        </td>
                        <td>
                          {row.next ? <span className="cl2-next">{row.next}</span> : <span className="muted">-</span>}
                        </td>
                        <td>{row.due}</td>
                        <td>
                          <b>{row.amount}</b>
                        </td>
                        <td className="muted">{row.updated}</td>
                        <td>
                          <div className="cl2-acts ci-table-actions">
                            {needsBrandAction(row) && row.dealStatus === "live" ? (
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                disabled={busyId === row.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  void approve(row);
                                }}
                              >
                                {copy.approve}
                              </button>
                            ) : null}
                            {nextDealStatus(row.dealStatus) && row.dealStatus !== "live" ? (
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                disabled={busyId === row.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  void advance(row);
                                }}
                              >
                                {copy.advance}
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="cl2-foot">
            <span className="muted" style={{ fontSize: "0.86rem" }} id="cl2-showing">
              {showingLabel}
            </span>
            <div className="cl2-pages" id="cl2-pages">
              {pageButtons()}
            </div>
            <span className="muted" style={{ fontSize: "0.86rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{copy.rowsPerPage}</span>
              <select
                className="select"
                id="cl2-psize"
                style={{ height: 32, padding: "0 8px" }}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value) || 10)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </span>
          </div>
        </div>
      </div>

      <div className={`cl2-overlay${selected ? " open" : ""}`} id="cl2-overlay" aria-hidden={!selected}>
        <div className="cl2-overlay-backdrop" onClick={() => setSelected(null)} aria-hidden="true" />
        {selected ? (
          <aside className="cl2-detail-card" id="cl2-panel" role="dialog" aria-modal="true" aria-label={copy.detailTitle}>
            <button type="button" className="modal-close" onClick={() => setSelected(null)} aria-label={copy.close}>
              ✕
            </button>
            <div className="tc" style={{ gap: 14, alignItems: "center" }}>
              <Avatar name={selected.name} src={selected.avatar} />
              <div>
                <h2 style={{ margin: 0, fontSize: "1.15rem" }}>{selected.name}</h2>
                <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>
                  {selected.followers} {copy.followers}
                </p>
              </div>
            </div>
            <div className="cl2-detail-meta">
              <div>
                {copy.colCampaign}: <b>{selected.campaign}</b>
              </div>
              <div>
                {copy.colStatus}: <StatusChip row={selected} copy={copy} />
              </div>
              <div>
                {copy.colAmount}: <b>{selected.amount}</b>
              </div>
              {selected.next ? (
                <div>
                  {copy.colNext}: <b>{selected.next}</b>
                </div>
              ) : null}
              {selected.trackingLink ? (
                <div>
                  {copy.trackingLink}: <b>/{selected.trackingLink}</b>
                </div>
              ) : null}
            </div>
            <div className="cl2-detail-actions">
              {selected.dealStatus === "live" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={busyId === selected.id}
                  onClick={() => void approve(selected)}
                >
                  {copy.approve}
                </button>
              ) : null}
              {nextDealStatus(selected.dealStatus) && selected.dealStatus !== "live" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={busyId === selected.id}
                  onClick={() => void advance(selected)}
                >
                  {copy.advance}
                </button>
              ) : null}
              <button type="button" className="btn btn-ghost" onClick={() => openMessages(selected)}>
                {copy.messageCreator}
              </button>
              {selected.trackingLink ? (
                <button type="button" className="btn btn-ghost" onClick={() => void copyTracking(selected)}>
                  {copied ? copy.linkCopied : copy.copyLink}
                </button>
              ) : null}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
