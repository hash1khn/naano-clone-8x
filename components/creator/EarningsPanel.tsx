"use client";

import { useEffect, useMemo, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Plane, TrendingUp, Wallet } from "lucide-react";
import {
  EARNINGS_MIN_WITHDRAW,
  formatEarningsMoney,
  hasBankDetails,
  lastSixMonthLabels,
  readDemoEarnings,
  saveDemoEarnings,
  subscribeDemoEarnings,
  type DemoEarningsState,
  type PayoutMethod,
} from "@/lib/earnings/demo";
import { fillEarnings, type CreatorEarningsCopy } from "@/lib/i18n/creator";
import type { Locale } from "@/lib/i18n/locale";

function BankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M2 18h20M4 6l8-3 8 3" />
    </svg>
  );
}

function StripeMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#635BFF" />
      <path
        fill="#fff"
        d="M12.4 9.6c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V6.4A11 11 0 0 0 13.8 5c-3.5 0-5.9 1.8-5.9 4.9 0 4.8 6.6 4 6.6 6.1 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.5v3.4c1.6.7 3.3 1.1 4.9 1.1 3.6 0 6.1-1.8 6.1-4.9 0-5.2-6.8-4.3-6.8-6z"
      />
    </svg>
  );
}

export function EarningsPanel({ locale, copy }: { locale: Locale; copy: CreatorEarningsCopy }) {
  const [state, setState] = useState<DemoEarningsState>(() => ({
    totalEarned: 0,
    inTransit: 0,
    available: 0,
    paidCollaborations: 0,
    monthly: [0, 0, 0, 0, 0, 0],
    method: "stripe",
    bank: { accountHolder: "", iban: "" },
    stripeConnected: false,
  }));
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [holderDraft, setHolderDraft] = useState("");
  const [ibanDraft, setIbanDraft] = useState("");
  const [mounted, setMounted] = useState(false);

  function refresh() {
    setState(readDemoEarnings());
  }

  useEffect(() => {
    setMounted(true);
    refresh();
    return subscribeDemoEarnings(refresh);
  }, []);

  const monthLabels = useMemo(() => lastSixMonthLabels(locale), [locale]);
  const avg =
    state.paidCollaborations > 0 ? state.totalEarned / state.paidCollaborations : 0;
  const chartSum = state.monthly.reduce((sum, value) => sum + value, 0);
  const chartMax = Math.max(...state.monthly, 1);
  const bankReady = hasBankDetails(state.bank);
  const methodReady =
    state.method === "stripe" ? state.stripeConnected : bankReady;

  function setMethod(method: PayoutMethod) {
    setState(saveDemoEarnings({ method }));
  }

  function openBankModal(event: MouseEvent) {
    event.stopPropagation();
    setHolderDraft(state.bank.accountHolder);
    setIbanDraft(state.bank.iban);
    setBankOpen(true);
  }

  function saveBank() {
    setState(
      saveDemoEarnings({
        bank: { accountHolder: holderDraft.trim(), iban: ibanDraft.trim() },
        method: "bank",
      }),
    );
    setBankOpen(false);
  }

  function toggleStripe(event: MouseEvent) {
    event.stopPropagation();
    const next = !state.stripeConnected;
    setState(saveDemoEarnings({ stripeConnected: next, method: next ? "stripe" : state.method }));
  }

  function withdrawAll() {
    if (state.available <= 0) {
      return;
    }
    setAmount(String(state.available));
  }

  function confirmWithdraw() {
    const parsed = Number(amount.replace(",", "."));
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setNotice(copy.noticeZero);
      return;
    }
    if (state.available <= 0) {
      setNotice(copy.noticeZero);
      return;
    }
    if (!methodReady) {
      setNotice(copy.noticeNeedMethod);
      return;
    }
    if (parsed < EARNINGS_MIN_WITHDRAW) {
      setNotice(copy.noticeMin);
      return;
    }
    if (parsed > state.available) {
      setNotice(copy.noticeZero);
      return;
    }
    const nextAvailable = Math.round((state.available - parsed) * 100) / 100;
    setState(
      saveDemoEarnings({
        available: nextAvailable,
        inTransit: Math.round((state.inTransit + parsed) * 100) / 100,
      }),
    );
    setAmount("");
    setNotice(fillEarnings(copy.noticeOk, { amount: formatEarningsMoney(parsed, locale) }));
  }

  return (
    <section className="page visible" id="page-earnings" data-screen-label={copy.title}>
      <div className="cr-earn-shell">
      <div className="cr-earn-head">
        <div>
          <h1>{copy.title}</h1>
          <p className="page-sub">{copy.sub}</p>
        </div>
        <button type="button" className="cr-earn-filter on" aria-pressed="true">
          <i />
          <span>{copy.filterPaid}</span>
        </button>
      </div>

      <div className="cr-earn-kpis">
        <article className="cr-earn-kpi cr-earn-kpi-hero">
          <div className="cr-earn-kpi-label">
            <span>{copy.totalEarned}</span>
            <TrendingUp size={18} strokeWidth={2} />
          </div>
          <strong>{formatEarningsMoney(state.totalEarned, locale)}</strong>
          <small>
            {fillEarnings(copy.totalEarnedMeta, {
              count: String(state.paidCollaborations),
              avg: formatEarningsMoney(avg, locale),
            })}
          </small>
        </article>

        <article className="cr-earn-kpi">
          <div className="cr-earn-kpi-label">
            <Plane size={18} strokeWidth={2} />
            <span>{copy.inTransitLabel}</span>
          </div>
          <strong>{formatEarningsMoney(state.inTransit, locale)}</strong>
          <small>{copy.inTransitBody}</small>
        </article>

        <article className="cr-earn-kpi">
          <div className="cr-earn-kpi-label">
            <Wallet size={18} strokeWidth={2} />
            <span>{copy.availableLabel}</span>
          </div>
          <strong>{formatEarningsMoney(state.available, locale)}</strong>
          <small>{copy.availableBody}</small>
        </article>
      </div>

      <div className="cr-earn-grid">
        <article className="card cr-earn-card">
          <div className="cr-earn-card-head">
            <div>
              <b>{copy.chartTitle}</b>
              <p>{copy.chartSub}</p>
            </div>
            <span className="cr-earn-chart-total">
              {fillEarnings(copy.chartTotal, { amount: formatEarningsMoney(chartSum, locale) })}
            </span>
          </div>
          <div className="cr-earn-chart" role="img" aria-label={copy.chartTitle}>
            {state.monthly.map((value, index) => {
              const height = value <= 0 ? 4 : Math.max(8, Math.round((value / chartMax) * 100));
              const isLast = index === state.monthly.length - 1;
              return (
                <div key={monthLabels[index]} className={`cr-earn-bar${isLast ? " on" : ""}`}>
                  <div className="cr-earn-bar-track">
                    <i style={{ height: `${height}%` }} />
                  </div>
                  <span>{monthLabels[index]}</span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="card cr-earn-card cr-earn-withdraw">
          <div className="cr-earn-card-head">
            <div>
              <b>{copy.withdrawTitle}</b>
              <p>{copy.withdrawSub}</p>
            </div>
          </div>

          <div className="cr-earn-methods" id="cr-pay-methods" role="radiogroup" aria-label={copy.payoutMethod}>
            <div
              role="radio"
              tabIndex={0}
              aria-checked={state.method === "bank"}
              className={`cr-earn-method${state.method === "bank" ? " on" : ""}`}
              onClick={() => setMethod("bank")}
              onKeyDown={(event: KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setMethod("bank");
                }
              }}
            >
              <span className="cr-earn-radio" aria-hidden="true" />
              <span className="cr-earn-method-icon">
                <BankIcon />
              </span>
              <span className="cr-earn-method-copy">
                <b>{copy.bankTransfer}</b>
                <small>{bankReady ? state.bank.accountHolder : copy.bankEmptyHolder}</small>
                <small>{bankReady ? state.bank.iban : copy.bankEmptyDetails}</small>
              </span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={openBankModal}>
                {copy.bankEdit}
              </button>
            </div>

            <div
              role="radio"
              tabIndex={0}
              aria-checked={state.method === "stripe"}
              className={`cr-earn-method${state.method === "stripe" ? " on" : ""}`}
              onClick={() => setMethod("stripe")}
              onKeyDown={(event: KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setMethod("stripe");
                }
              }}
            >
              <span className="cr-earn-radio" aria-hidden="true" />
              <span className="cr-earn-method-icon stripe">
                <StripeMark />
              </span>
              <span className="cr-earn-method-copy">
                <b>{copy.stripe}</b>
                <small>
                  {copy.stripeStatus}{" "}
                  {state.stripeConnected ? copy.stripeConnected : copy.stripeNotConnected}. {copy.stripeHint}
                </small>
              </span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={toggleStripe}>
                {state.stripeConnected ? copy.disconnectStripe : copy.connectStripe}
              </button>
            </div>
          </div>

          <label className="cr-earn-amount">
            <span>{copy.amountLabel}</span>
            <div className="cr-earn-amount-row">
              <div className="cr-earn-amount-field">
                <em>€</em>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  placeholder="0"
                  onChange={(event) => setAmount(event.target.value.replace(/[^\d.,]/g, ""))}
                />
              </div>
              <button type="button" className="cr-earn-withdraw-all" onClick={withdrawAll}>
                {copy.withdrawAll}
              </button>
            </div>
          </label>

          <button type="button" className="btn btn-primary btn-block cr-earn-confirm" onClick={confirmWithdraw}>
            {copy.confirmWithdraw}
          </button>
          <p className="cr-earn-note">{copy.minNote}</p>
          {notice ? (
            <p className="cr-earn-notice" role="status">
              {notice}
            </p>
          ) : null}
        </article>
      </div>

      {mounted && bankOpen
        ? createPortal(
            <div className="overlay open" onClick={() => setBankOpen(false)}>
              <div
                className="modal cr-earn-modal"
                role="dialog"
                aria-modal="true"
                aria-label={copy.bankModalTitle}
                onClick={(event) => event.stopPropagation()}
              >
                <b>{copy.bankModalTitle}</b>
                <label>
                  <span>{copy.bankHolderLabel}</span>
                  <input value={holderDraft} onChange={(event) => setHolderDraft(event.target.value)} />
                </label>
                <label>
                  <span>{copy.bankIbanLabel}</span>
                  <input value={ibanDraft} onChange={(event) => setIbanDraft(event.target.value)} />
                </label>
                <div className="cr-earn-modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setBankOpen(false)}>
                    {copy.cancel}
                  </button>
                  <button type="button" className="btn btn-primary" onClick={saveBank}>
                    {copy.bankSave}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
      </div>
    </section>
  );
}
