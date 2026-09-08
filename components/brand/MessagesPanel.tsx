"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CampaignListItem, CreatorListItem, DealListItem, Message } from "@/lib/api/types";
import type { MessagesCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

const LOGO = "/lp/naano-logomark.png";
const EMOJIS = ["👍", "👏", "🙌", "🎉", "🔥", "💡", "✅", "❤️", "😊", "😂", "👀", "🚀"] as const;

type SupportIntent = "performance" | "product_help" | "bug" | "feature_request";
type OpenConv = { kind: "support" } | { kind: "deal"; id: string } | null;
type SupportBubble = { id: string; author: "user" | "assistant"; body: string; created_at: string };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatAgo(iso: string | null, locale: Locale, nowLabel: string) {
  if (!iso) {
    return nowLabel;
  }
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) {
    return nowLabel;
  }
  const delta = Date.now() - then;
  if (delta < 60_000) {
    return nowLabel;
  }
  if (delta < 3_600_000) {
    return `${Math.floor(delta / 60_000)}m`;
  }
  if (delta < 86_400_000) {
    return `${Math.floor(delta / 3_600_000)}h`;
  }
  return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
  });
}

function formatWhen(iso: string, locale: Locale) {
  const date = new Date(iso);
  const loc = locale === "fr" ? "fr-FR" : "en-GB";
  return `${date.toLocaleDateString(loc, { day: "numeric", month: "short" })} ${date.toLocaleTimeString(loc, {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function ArrowIcon() {
  return (
    <svg className="nn-support-action-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function MessagesPanel({
  locale,
  copy,
  userId,
  creators,
  role = "brand",
}: {
  locale: Locale;
  copy: MessagesCopy;
  userId: string;
  creators: CreatorListItem[];
  role?: "brand" | "creator";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const campaignMenuRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const collabHash = role === "creator" ? "collabs" : "collaborations";
  const isBrand = role === "brand";

  const [deals, setDeals] = useState<DealListItem[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignListItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState("");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [campaignMenu, setCampaignMenu] = useState(false);
  const [open, setOpen] = useState<OpenConv>(null);
  const [supportMsgs, setSupportMsgs] = useState<SupportBubble[]>([]);
  const [supportSending, setSupportSending] = useState(false);
  const [orbitOn, setOrbitOn] = useState(false);
  const [draft, setDraft] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [sending, setSending] = useState(false);
  const [previews, setPreviews] = useState<Record<string, { body: string; at: string }>>({});
  const [composePick, setComposePick] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);

  const creatorsById = useMemo(() => new Map(creators.map((c) => [c.id, c])), [creators]);
  const campaignsById = useMemo(() => {
    if (campaigns.length > 0) {
      return new Map(campaigns.map((c) => [c.id, c]));
    }
    const derived = new Map<string, CampaignListItem>();
    for (const deal of deals) {
      if (!derived.has(deal.campaign_id)) {
        derived.set(deal.campaign_id, {
          id: deal.campaign_id,
          objective: deal.campaign_objective || "",
          status: "live",
          created_at: deal.created_at,
        });
      }
    }
    return derived;
  }, [campaigns, deals]);

  function peerForDeal(deal: DealListItem) {
    if (isBrand) {
      const creator = creatorsById.get(deal.creator_id);
      return {
        name: creator?.name || "Creator",
        avatar: creator?.avatar_url || "",
      };
    }
    return {
      name: deal.company_name?.trim() || "Brand",
      avatar: "",
    };
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingList(true);
      try {
        const dealsRes = await fetch(`/api/deals?role=${role}`);
        const dealsJson = dealsRes.ok ? ((await dealsRes.json()) as { deals?: DealListItem[] }) : { deals: [] };
        let nextCampaigns: CampaignListItem[] = [];
        if (isBrand) {
          const campaignsRes = await fetch("/api/campaigns");
          const campaignsJson = campaignsRes.ok
            ? ((await campaignsRes.json()) as { campaigns?: CampaignListItem[] })
            : { campaigns: [] };
          nextCampaigns = Array.isArray(campaignsJson.campaigns) ? campaignsJson.campaigns : [];
        }
        if (!cancelled) {
          setDeals(Array.isArray(dealsJson.deals) ? dealsJson.deals : []);
          setCampaigns(nextCampaigns);
        }
      } catch {
        if (!cancelled) {
          setDeals([]);
          setCampaigns([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingList(false);
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [role, isBrand]);

  useEffect(() => {
    if (loadingList || deals.length === 0) {
      return;
    }
    try {
      const openDealId = sessionStorage.getItem("naano.messages.openDeal");
      if (openDealId && deals.some((d) => d.id === openDealId)) {
        sessionStorage.removeItem("naano.messages.openDeal");
        setOpen({ kind: "deal", id: openDealId });
        setMobileChat(true);
      }
    } catch {
      /* ignore */
    }
  }, [loadingList, deals]);

  const visibleDeals = useMemo(() => {
    const q = search.trim().toLowerCase();
    return deals.filter((deal) => {
      if (campaignFilter !== "all" && deal.campaign_id !== campaignFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      const peer = peerForDeal(deal);
      const hay = `${peer.name} ${previews[deal.id]?.body ?? copy.bookingPreview}`.toLowerCase();
      return hay.includes(q);
    });
  }, [deals, campaignFilter, search, creatorsById, previews, copy.bookingPreview, isBrand]);

  const botVisible = !search.trim() || "naanobot".includes(search.trim().toLowerCase()) || copy.supportPrompt.toLowerCase().includes(search.trim().toLowerCase());

  const selectedDeal = open?.kind === "deal" ? deals.find((d) => d.id === open.id) : null;
  const selectedPeer = selectedDeal ? peerForDeal(selectedDeal) : null;
  const supportOpen = open?.kind === "support";
  const canSend = Boolean(open) && !supportSending && !sending && Boolean(draft.trim());

  useEffect(() => {
    if (open?.kind !== "deal") {
      setMessages([]);
      setLoadingThread(false);
      return;
    }
    const dealId = open.id;
    let cancelled = false;
    setLoadingThread(true);
    fetch(`/api/messages?deal_id=${encodeURIComponent(dealId)}`)
      .then(async (res) => {
        const json = res.ok ? ((await res.json()) as { messages?: Message[] }) : { messages: [] };
        if (cancelled) {
          return;
        }
        const rows = Array.isArray(json.messages) ? json.messages : [];
        setMessages(rows);
        const last = rows[rows.length - 1];
        if (last) {
          setPreviews((prev) => ({ ...prev, [dealId]: { body: last.body, at: last.created_at } }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMessages([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingThread(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }
    if (supportOpen && supportMsgs.length === 0) {
      body.scrollTop = 0;
      return;
    }
    body.scrollTop = body.scrollHeight;
  }, [supportOpen, supportMsgs, messages, loadingThread, open]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (campaignMenu && campaignMenuRef.current && !campaignMenuRef.current.contains(target)) {
        setCampaignMenu(false);
      }
      if (emojiOpen && emojiRef.current && !emojiRef.current.contains(target)) {
        setEmojiOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [campaignMenu, emojiOpen]);

  function openSupport() {
    setOpen({ kind: "support" });
    setComposePick(false);
    setMobileChat(true);
    setEmojiOpen(false);
    setDraft("");
  }

  function openDeal(id: string) {
    setOpen({ kind: "deal", id });
    setComposePick(false);
    setMobileChat(true);
    setEmojiOpen(false);
    setDraft("");
  }

  function fillIntent(intent: SupportIntent) {
    const prompts: Record<SupportIntent, string> = {
      performance: copy.promptPerf,
      product_help: copy.promptHelp,
      bug: copy.promptBug,
      feature_request: copy.promptIdea,
    };
    const value = prompts[intent];
    setDraft(value);
    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) {
        return;
      }
      input.focus();
      input.setSelectionRange(value.length, value.length);
    });
  }

  function insertEmoji(emoji: string) {
    setDraft((value) => `${value}${emoji}`);
    setEmojiOpen(false);
    inputRef.current?.focus();
  }

  async function send() {
    const text = draft.trim();
    if (!text || sending || supportSending) {
      return;
    }
    if (supportOpen) {
      const created = new Date().toISOString();
      const userMsg: SupportBubble = { id: `u-${created}`, author: "user", body: text, created_at: created };
      setDraft("");
      setSupportMsgs((rows) => [...rows, userMsg]);
      setSupportSending(true);
      window.setTimeout(() => {
        setSupportMsgs((rows) => [
          ...rows,
          {
            id: `a-${Date.now()}`,
            author: "assistant",
            body: copy.localReply,
            created_at: new Date().toISOString(),
          },
        ]);
        setSupportSending(false);
      }, 450);
      return;
    }
    if (open?.kind !== "deal" || !selectedDeal) {
      return;
    }
    setSending(true);
    try {
      const recipientId = isBrand ? selectedDeal.creator_id : selectedDeal.company_user_id;
      if (!recipientId) {
        return;
      }
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_id: recipientId,
          deal_id: selectedDeal.id,
          body: text,
        }),
      });
      if (!res.ok) {
        return;
      }
      const saved = (await res.json()) as Message;
      setDraft("");
      setMessages((rows) => [...rows, saved]);
      setPreviews((prev) => ({ ...prev, [selectedDeal.id]: { body: saved.body, at: saved.created_at } }));
    } finally {
      setSending(false);
    }
  }

  function startCompose() {
    if (deals.length === 0) {
      window.location.hash = collabHash;
      return;
    }
    setOpen(null);
    setComposePick(true);
    setMobileChat(false);
    setSearch("");
  }

  const campaignLabel =
    campaignFilter === "all"
      ? copy.campaignFilter
      : campaignsById.get(campaignFilter)?.objective || copy.campaignFilter;

  const placeholder = supportOpen ? copy.composerSupportPh : copy.composerPh;
  const dealCountByCampaign = useMemo(() => {
    const counts = new Map<string, number>();
    for (const deal of deals) {
      counts.set(deal.campaign_id, (counts.get(deal.campaign_id) ?? 0) + 1);
    }
    return counts;
  }, [deals]);

  const campaignOptions = useMemo(() => [...campaignsById.values()], [campaignsById]);

  return (
    <section className="page visible" id="page-messages" data-screen-label={copy.title}>
      <div className={`msg-app card${mobileChat ? " m-chat-open" : ""}`}>
        <div className="msg-list">
          <h3>{copy.conversations}</h3>
          <div className="msg-inbox-head">
            <h1>{copy.title}</h1>
            <button
              className="msg-inbox-compose"
              type="button"
              aria-label={copy.newMessage}
              title={copy.newMessage}
              onClick={startCompose}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </button>
          </div>
          <div className="msg-search-wrap">
            <label className="msg-search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={search}
                placeholder={composePick ? copy.chooseConversation : copy.searchList}
                aria-label={copy.searchList}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>
          <div className="msg-inbox-modes" ref={campaignMenuRef}>
            <div className="msg-mode-switch" aria-label={copy.messageModeAria}>
              <button
                className={`msg-mode-button${campaignFilter === "all" ? " is-active" : ""}`}
                type="button"
                onClick={() => {
                  setCampaignFilter("all");
                  setCampaignMenu(false);
                }}
              >
                {copy.allMessages}
              </button>
              <button
                className={`msg-mode-button${campaignFilter !== "all" ? " is-active" : ""}`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={campaignMenu}
                aria-controls="msg-campaign-menu"
                onClick={() => setCampaignMenu((openMenu) => !openMenu)}
              >
                <span>{campaignLabel}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </button>
            </div>
            <div
              className="msg-campaign-menu"
              id="msg-campaign-menu"
              role="listbox"
              aria-label={copy.chooseCampaign}
              hidden={!campaignMenu}
            >
              <div className="msg-campaign-menu-head">
                <b>{copy.chooseCampaign}</b>
                <span>{copy.chooseCampaignHint}</span>
              </div>
              <div className="msg-campaign-options">
                {campaignOptions.length === 0 ? (
                  <div className="msg-campaign-menu-empty">{copy.noCampaigns}</div>
                ) : (
                  campaignOptions.map((campaign) => {
                    const selected = campaignFilter === campaign.id;
                    const count = dealCountByCampaign.get(campaign.id) ?? 0;
                    return (
                      <button
                        key={campaign.id}
                        className={`msg-campaign-option${selected ? " is-selected" : ""}`}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          setCampaignFilter(campaign.id);
                          setCampaignMenu(false);
                        }}
                      >
                        <span className="msg-campaign-brand-logo">{initials(campaign.objective || "C")}</span>
                        <span className="msg-campaign-option-copy">
                          <span className="msg-campaign-option-name">{campaign.objective || campaign.id}</span>
                          <span className="msg-campaign-option-count">{count}</span>
                        </span>
                        <span className="msg-campaign-option-check">
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12.5 9.5 17 19 7" />
                          </svg>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          {botVisible ? (
            <button
              className={`msg-pin-card${supportOpen ? " is-active" : ""}`}
              type="button"
              aria-pressed={supportOpen}
              onClick={openSupport}
            >
              <span className="msg-pin-logo">
                <img src={LOGO} alt="" />
              </span>
              <span className="msg-pin-copy">
                <span>
                  <b>{copy.botName}</b>
                </span>
                <p>{copy.supportPrompt}</p>
              </span>
              <span className="msg-pin-side">
                <span>{copy.now}</span>
                <span className="msg-pin-count">1</span>
              </span>
            </button>
          ) : null}
          <div className={`conv-list-wrap${composePick ? " is-compose-picking" : ""}`} id="conv-list">
            {loadingList ? (
              <div className="muted" style={{ padding: 18, fontSize: ".88rem" }}>
                {copy.loading}
              </div>
            ) : visibleDeals.length === 0 ? (
              <div className="muted" style={{ padding: 18, fontSize: ".88rem" }}>
                {deals.length && campaignFilter !== "all" ? copy.emptyCampaign : copy.emptyList}
              </div>
            ) : (
              <>
                <div className="msg-section-lbl">{copy.groupCreators}</div>
                {visibleDeals.map((deal) => {
                  const peer = peerForDeal(deal);
                  const name = peer.name;
                  const preview = previews[deal.id]?.body || copy.bookingPreview;
                  const active = open?.kind === "deal" && open.id === deal.id;
                  return (
                    <button
                      key={deal.id}
                      className={`conv${active ? " on" : ""}`}
                      type="button"
                      onClick={() => openDeal(deal.id)}
                    >
                      {peer.avatar ? (
                        <span className="cav">
                          <img src={peer.avatar} alt="" />
                        </span>
                      ) : (
                        <span className="avatar-sm">{initials(name)}</span>
                      )}
                      <span className="msg-conv-body">
                        <b>{name}</b>
                        <span>{preview}</span>
                      </span>
                      <span className="msg-conv-side">{formatAgo(previews[deal.id]?.at ?? deal.created_at, locale, copy.now)}</span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div className="chat">
          <button
            className="m-chat-back"
            type="button"
            onClick={() => {
              setMobileChat(false);
              setOpen(null);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{copy.conversations}</span>
          </button>
          <div className="chat-head">
            {supportOpen ? (
              <div className="nn-support-head">
                <span className="nn-support-head-logo">
                  <img src={LOGO} alt="" />
                </span>
                <span className="nn-support-head-copy">
                  <b>{copy.helpCenter}</b>
                  <span>
                    <i className="nn-support-live" />
                    {copy.helpStatus}
                  </span>
                </span>
              </div>
            ) : selectedPeer || selectedDeal ? (
              <div className="msg-chat-person">
                {selectedPeer?.avatar ? (
                  <span className="cav">
                    <img src={selectedPeer.avatar} alt="" />
                  </span>
                ) : (
                  <span className="avatar-sm">{initials(selectedPeer?.name || "C")}</span>
                )}
                <span className="msg-chat-person-copy">
                  <b>{selectedPeer?.name || (isBrand ? "Creator" : "Brand")}</b>
                  <span>{copy.emptyHeadSub}</span>
                </span>
              </div>
            ) : (
              <div>
                <b>{copy.title}</b>
                <span>{copy.emptyHeadSub}</span>
              </div>
            )}
          </div>
          <div className={`chat-body${supportOpen ? " is-support" : ""}`} ref={bodyRef}>
            {supportOpen ? (
              <div className="nn-support-feed">
                <div className="nn-support-start">
                  <section
                    className="nn-support-welcome"
                    onPointerMove={(event) => {
                      const card = event.currentTarget;
                      const rect = card.getBoundingClientRect();
                      card.style.setProperty("--nn-glow-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
                      card.style.setProperty("--nn-glow-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
                    }}
                    onPointerLeave={(event) => {
                      event.currentTarget.style.removeProperty("--nn-glow-x");
                      event.currentTarget.style.removeProperty("--nn-glow-y");
                    }}
                  >
                    <div className="nn-support-hero">
                      <div className="nn-support-hero-copy">
                        <span className="nn-support-kicker">
                          <svg viewBox="0 0 24 24">
                            <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
                          </svg>
                          {copy.yourSpace}
                        </span>
                        <h2>{copy.howHelp}</h2>
                        <p>{copy.helpBody}</p>
                      </div>
                      <div className="nn-support-hero-mark">
                        <button
                          className={`nn-support-orbit${orbitOn ? " is-active" : ""}`}
                          type="button"
                          aria-pressed={orbitOn}
                          aria-label={copy.orbitAria}
                          onClick={() => setOrbitOn((value) => !value)}
                        >
                          <i className="nn-support-orbit-dot" />
                          <span className="nn-support-logo-orb">
                            <img src={LOGO} alt="" />
                          </span>
                        </button>
                        <span className="nn-support-availability">
                          <i />
                          {copy.availableNow}
                        </span>
                      </div>
                    </div>
                    <div className="nn-support-actions">
                      <button className="nn-support-action" type="button" onClick={() => fillIntent("performance")}>
                        <span className="nn-support-action-icon">
                          <svg className="nn-support-action-glyph" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 3v18h18" />
                            <path d="M8 17v-3" />
                            <path d="M13 17V9" />
                            <path d="M18 17V5" />
                          </svg>
                        </span>
                        <span className="nn-support-action-copy">
                          <b>{copy.actionPerf}</b>
                          <small>{copy.actionPerfSub}</small>
                        </span>
                        <ArrowIcon />
                      </button>
                      <button className="nn-support-action" type="button" onClick={() => fillIntent("product_help")}>
                        <span className="nn-support-action-icon">
                          <svg className="nn-support-action-glyph" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="m5.64 5.64 4.24 4.24M14.12 14.12l4.24 4.24M18.36 5.64l-4.24 4.24M9.88 14.12l-4.24 4.24" />
                          </svg>
                        </span>
                        <span className="nn-support-action-copy">
                          <b>{copy.actionHelp}</b>
                          <small>{copy.actionHelpSub}</small>
                        </span>
                        <ArrowIcon />
                      </button>
                      <button className="nn-support-action" type="button" onClick={() => fillIntent("bug")}>
                        <span className="nn-support-action-icon">
                          <svg className="nn-support-action-glyph" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 8a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V8Z" />
                            <path d="M9.2 5 8 3.5M14.8 5 16 3.5M8 10H4M20 10h-4M8 14H4M20 14h-4M9 18l-1.5 2M15 18l1.5 2M8 9h8" />
                          </svg>
                        </span>
                        <span className="nn-support-action-copy">
                          <b>{copy.actionBug}</b>
                          <small>{copy.actionBugSub}</small>
                        </span>
                        <ArrowIcon />
                      </button>
                      <button className="nn-support-action" type="button" onClick={() => fillIntent("feature_request")}>
                        <span className="nn-support-action-icon">
                          <svg className="nn-support-action-glyph" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z" />
                            <path d="M12 8v6M9 11h6" />
                          </svg>
                        </span>
                        <span className="nn-support-action-copy">
                          <b>{copy.actionIdea}</b>
                          <small>{copy.actionIdeaSub}</small>
                        </span>
                        <ArrowIcon />
                      </button>
                    </div>
                  </section>
                </div>
                <div className="nn-support-thread">
                  {supportMsgs.length === 0 ? (
                    <div className="nn-support-message">
                      <span className="nn-support-avatar">
                        <img src={LOGO} alt="" />
                      </span>
                      <div>
                        <div className="nn-support-message-bubble">{copy.intro}</div>
                        <div className="nn-support-message-meta">{copy.assistantName}</div>
                      </div>
                    </div>
                  ) : null}
                  {supportMsgs.map((message) => (
                    <div
                      key={message.id}
                      className={`nn-support-message${message.author === "user" ? " is-user" : ""}`}
                    >
                      {message.author === "assistant" ? (
                        <span className="nn-support-avatar">
                          <img src={LOGO} alt="" />
                        </span>
                      ) : null}
                      <div>
                        <div className="nn-support-message-bubble">{message.body}</div>
                        <div className="nn-support-message-meta">
                          {message.author === "user" ? copy.you : copy.assistantName} · {formatWhen(message.created_at, locale)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {supportSending ? (
                    <div className="nn-support-loading">
                      <span>{copy.loading}</span>
                      <i />
                      <i />
                      <i />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : open?.kind === "deal" ? (
              loadingThread ? (
                <div className="muted" style={{ margin: "auto", textAlign: "center", fontSize: ".9rem" }}>
                  {copy.loading}
                </div>
              ) : messages.length === 0 ? (
                <div className="muted" style={{ margin: "auto", textAlign: "center", fontSize: ".9rem" }}>
                  {copy.noMessages}
                </div>
              ) : (
                messages.map((message) => {
                  const mine = message.sender_id === userId;
                  const peerName = selectedPeer?.name || (isBrand ? "Creator" : "Brand");
                  return (
                    <div key={message.id} className={`msg${mine ? " me" : ""}`}>
                      {!mine ? <span className="avatar-sm">{initials(peerName)}</span> : null}
                      <div>
                        <div className="bubble">{message.body}</div>
                        <div className={mine ? "msg-own-meta" : "who"}>
                          {mine ? formatWhen(message.created_at, locale) : `${peerName} · ${formatWhen(message.created_at, locale)}`}
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--muted)", fontSize: ".92rem" }}>
                {deals.length ? (
                  copy.pickConv
                ) : (
                  <>
                    {copy.emptyTitle}
                    <br />
                    {copy.emptyHint}
                  </>
                )}
              </div>
            )}
          </div>
          <div className={`chat-compose${supportOpen ? " is-support" : ""}`} id="chat-compose">
            <div className="chat-input">
              <button className="msg-compose-add" type="button" aria-label={copy.addAttachment} title={copy.addAttachment}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <div className="msg-compose-field" ref={emojiRef}>
                <input
                  ref={inputRef}
                  aria-label={supportOpen ? copy.composerSupportPh : copy.composerAria}
                  placeholder={placeholder}
                  value={draft}
                  disabled={supportSending || sending}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void send();
                    } else if (event.key === "Escape") {
                      setEmojiOpen(false);
                    }
                  }}
                />
                <button
                  className="msg-compose-emoji"
                  type="button"
                  aria-label={copy.addEmoji}
                  title={copy.addEmoji}
                  aria-haspopup="dialog"
                  aria-expanded={emojiOpen}
                  onClick={() => setEmojiOpen((value) => !value)}
                >
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 10h.01M15.5 10h.01M8.5 14.5S10 16.5 12 16.5s3.5-2 3.5-2" />
                  </svg>
                </button>
                <div className="msg-emoji-popover" role="dialog" aria-label={copy.chooseEmoji} hidden={!emojiOpen}>
                  <div className="msg-emoji-popover-title">
                    <span>{copy.quickReactions}</span>
                    <span>{copy.emojiCount}</span>
                  </div>
                  <div className="msg-emoji-grid">
                    {EMOJIS.map((emoji) => (
                      <button key={emoji} type="button" onClick={() => insertEmoji(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="send"
                type="button"
                aria-label={copy.sendAria}
                title={copy.sendAria}
                disabled={!canSend}
                onClick={() => void send()}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <aside className="msg-rail" id="msg-rail" />
      </div>
    </section>
  );
}
