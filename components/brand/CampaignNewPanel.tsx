"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import type { CampaignsCopy } from "@/lib/i18n/brand";

const LOGO = "/lp/naano-logomark.png";
const TEAM_FACE = "/lp/naano-team-face.jpg";

type Phase = "choice" | "ai";

function CloudSymbol() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
      <defs>
        <symbol id="cg-creator-clouds" viewBox="0 0 360 130">
          <path
            fill="none"
            stroke="rgba(255,255,255,.24)"
            strokeWidth="5"
            strokeLinecap="round"
            d="M24 26c35-14 72-15 105-4M275 24c23-8 45-7 66 2"
          />
          <path
            fill="rgba(255,255,255,.22)"
            d="M-30 91c18-14 39-15 56-5 4-20 25-31 44-24 11-24 45-29 63-9 17-11 40-3 46 17 18-7 40 4 44 21H-30Z"
          />
          <path
            fill="rgba(255,255,255,.22)"
            d="M205 78c11-14 30-18 45-8 7-21 36-28 53-10 15-12 40-5 45 16 13-3 28 3 38 17H205Z"
          />
          <path
            fill="rgba(255,255,255,.5)"
            d="M-28 108c16-19 43-24 64-12 7-25 33-40 56-31 14-26 52-31 73-8 19-12 44-3 50 20 18-5 39 7 44 29v24H-28Z"
          />
          <path
            fill="rgba(255,255,255,.5)"
            d="M190 102c12-16 35-20 52-8 8-25 39-35 61-18 18-14 48-4 54 21 14-3 30 4 40 19v14H190Z"
          />
          <path
            fill="rgba(255,255,255,.82)"
            d="M-26 126c17-22 49-28 72-13 14-25 49-31 72-12 19-17 50-13 64 8 21-10 50-2 60 20H-26Z"
          />
          <path fill="rgba(255,255,255,.82)" d="M237 129c14-18 40-23 59-11 14-23 48-28 68-7 12-5 27-2 38 9v10H237Z" />
        </symbol>
      </defs>
    </svg>
  );
}

export function CampaignNewPanel({ copy }: { copy: CampaignsCopy }) {
  const [phase, setPhase] = useState<Phase>("choice");
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");

  function goBack() {
    if (phase === "ai") {
      setPhase("choice");
      return;
    }
    window.location.hash = "campaigns";
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  }

  function onLinkSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const onChoice = phase === "choice";

  return (
    <section className="page visible" id="page-campaign-new" data-screen-label={copy.howToLaunch}>
      <div className="cg-wrap">
        <div
          id="cg-topbar"
          className={`cg-topbar${phase === "ai" ? " is-on" : ""}`}
          aria-label={copy.launchAria}
        >
          <button type="button" id="cg-back" className="cg-back-ico" onClick={goBack} aria-label={copy.back} title={copy.back}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="cg-title-wrap" />
          <span className="cg-topbar-end" aria-hidden="true" />
        </div>

        <div id="cg-choice" className="cg-launch-choice" style={onChoice ? undefined : { display: "none" }}>
          <CloudSymbol />
          <section className="cg-launch" aria-label={copy.launchAria}>
            <header className="cg-launch-head">
              <div className="cg-launch-title">
                <img className="cg-launch-mark" src={LOGO} alt="" width={36} height={36} aria-hidden="true" />
                <h2>{copy.howToLaunch}</h2>
              </div>
              <p>{copy.howToLaunchSub}</p>
            </header>
            <div className="cg-launch-grid">
              <article className="cg-launch-card featured">
                <div className="lc-visual lc-visual-team">
                  <svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true">
                    <use href="#cg-creator-clouds" />
                  </svg>
                  <div className="lc-team-avatars">
                    <span className="lc-face" style={{ backgroundImage: `url('${TEAM_FACE}')` }} />
                  </div>
                  <div className="lc-slot">
                    <i />
                    <span>{copy.teamSlot}</span>
                  </div>
                </div>
                <div className="lc-body">
                  <h3>{copy.teamTitle}</h3>
                  <p>{copy.teamDesc}</p>
                  <button type="button" className="lc-cta primary" onClick={() => { window.location.href = "/book"; }}>
                    {copy.teamCta}
                  </button>
                </div>
              </article>

              <article className="cg-launch-card">
                <div className="lc-visual lc-visual-ai">
                  <svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true">
                    <use href="#cg-creator-clouds" />
                  </svg>
                  <div className="lc-orb" aria-hidden="true">
                    <img src={LOGO} alt="" width={26} height={26} />
                  </div>
                  <div className="lc-bubble">{copy.aiBubble}</div>
                </div>
                <div className="lc-body">
                  <span className="lc-time">{copy.aiTime}</span>
                  <h3>{copy.aiTitle}</h3>
                  <p>{copy.aiDesc}</p>
                  <button type="button" className="lc-cta" onClick={() => setPhase("ai")}>
                    {copy.aiCta}
                  </button>
                </div>
              </article>

              <article className="cg-launch-card">
                <div className="lc-visual lc-visual-link">
                  <svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true">
                    <use href="#cg-creator-clouds" />
                  </svg>
                  <div className="lc-url">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                    </svg>
                    notion.site/brief…
                  </div>
                  <div className="lc-arrow">↓</div>
                  <div className="lc-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{copy.linkChip}</span>
                  </div>
                </div>
                <div className="lc-body">
                  <span className="lc-time green">{copy.linkTime}</span>
                  <h3>{copy.linkTitle}</h3>
                  <p>{copy.linkDesc}</p>
                  <form
                    className={`link-panel${linkOpen ? " open" : ""}`}
                    id="cg-link-panel"
                    onSubmit={onLinkSubmit}
                  >
                    <input
                      className="url-input"
                      id="cg-link-inline"
                      type="url"
                      inputMode="url"
                      placeholder={copy.linkPlaceholder}
                      value={linkValue}
                      onChange={(event) => setLinkValue(event.target.value)}
                    />
                    <button type="submit" className="url-submit">
                      {copy.linkSubmit}
                    </button>
                  </form>
                  <button type="button" className="lc-cta" id="cg-show-link" onClick={() => setLinkOpen(true)}>
                    {copy.linkCta}
                  </button>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div id="cg-chat" style={onChoice ? { display: "none" } : undefined}>
          <div id="cg-hello" style={onChoice ? { display: "none" } : { display: "block" }}>
            <div className="cg-hero-block">
              <div className="cg-hero">
                <img className="cg-hero-mark" src={LOGO} alt="" width={38} height={38} aria-hidden="true" />
                <h1 className="cg-hero-t">{copy.chatHero}</h1>
              </div>
            </div>
          </div>
          <div className="cg-msgs" id="cg-msgs" />
          <div className="cg-composer">
            <textarea
              id="cg-input"
              rows={2}
              placeholder={copy.chatPlaceholder}
              onKeyDown={onComposerKeyDown}
            />
            <div className="cg-bar">
              <button type="button" className="cg-send" aria-label={copy.send}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 19V5" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div id="cg-hello-foot" style={{ display: "none" }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
