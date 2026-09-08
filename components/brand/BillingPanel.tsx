"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  BILLING_MIN,
  BILLING_PRESETS,
  creditDemoTopup,
  formatBillingBalance,
  formatBillingMoney,
  readDemoBilling,
  subscribeDemoBilling,
  type DemoInvoice,
} from "@/lib/billing/demo";
import { fill, type BillingCopy } from "@/lib/i18n/brand";
import type { Locale } from "@/lib/i18n/locale";

type InvoiceTab = "all" | "topup" | "booking";

const QUICK_AMOUNTS = [2500, 10000] as const;

function EuroMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M19 6.5A7.5 7.5 0 1 0 19 17.5" />
      <path d="M4 10h11M4 14h11" />
    </svg>
  );
}

export function BillingPanel({ locale, copy }: { locale: Locale; copy: BillingCopy }) {
  const [balance, setBalance] = useState(0);
  const [invoices, setInvoices] = useState<DemoInvoice[]>([]);
  const [tab, setTab] = useState<InvoiceTab>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [preset, setPreset] = useState<number | null>(10000);
  const [custom, setCustom] = useState("");
  const [notice, setNotice] = useState("");
  const [mounted, setMounted] = useState(false);

  function refresh() {
    const state = readDemoBilling();
    setBalance(state.balance);
    setInvoices(state.invoices);
  }

  useEffect(() => {
    setMounted(true);
    refresh();
    return subscribeDemoBilling(refresh);
  }, []);

  const amount = useMemo(() => {
    if (preset != null) {
      return preset;
    }
    const parsed = Number(custom.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  }, [preset, custom]);
  const valid = amount >= BILLING_MIN;
  const dateLocale = locale === "fr" ? "fr-FR" : "en-GB";

  const rows = invoices.filter((row) => tab === "all" || row.type === tab);
  const emptyCopy = tab === "topup" ? copy.emptyTopups : tab === "booking" ? copy.emptyBookings : copy.emptyAll;

  function openModal(nextAmount?: number) {
    if (nextAmount && (BILLING_PRESETS as readonly number[]).includes(nextAmount)) {
      setPreset(nextAmount);
      setCustom("");
    } else if (nextAmount) {
      setPreset(null);
      setCustom(String(nextAmount));
    } else {
      setPreset(10000);
      setCustom("");
    }
    setModalOpen(true);
  }

  function addBudget() {
    if (!valid) {
      return;
    }
    const next = creditDemoTopup(amount, copy.topupLabel);
    setBalance(next.balance);
    setInvoices(next.invoices);
    setModalOpen(false);
    setNotice(fill(copy.added, { amount: formatBillingMoney(amount, locale) }));
  }

  return (
    <section className="page visible" id="page-billing" data-screen-label={copy.title}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1>{copy.title}</h1>
          <div className="page-sub">{copy.sub}</div>
        </div>
        <a className="ov3-pill" href="mailto:hello@naano.com">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16h.01M9.5 9.5a2.5 2.5 0 1 1 3.4 2.35c-.7.28-1.4.85-1.4 1.65V14" />
          </svg>
          <span>{copy.needHelp}</span>
        </a>
      </div>

      <div className="card bb-balance">
        <span className="bb-coin" aria-hidden="true">
          <EuroMark />
        </span>
        <span className="bb-bal-label">{copy.availableBalance}</span>
        <div className="bb-val">{formatBillingBalance(balance, locale)}</div>
        <div className="bb-bal-sub">
          <span className="muted">{copy.readyToSpend}</span>
        </div>
        <div className="bb-bal-actions">
          <button className="btn btn-primary" type="button" onClick={() => openModal()}>
            {copy.addBudget}
          </button>
          {QUICK_AMOUNTS.map((value) => (
            <button key={value} className="bb-quick" type="button" onClick={() => openModal(value)}>
              + {formatBillingMoney(value, "en")}
            </button>
          ))}
        </div>
        {notice ? (
          <p className="bb-demo-notice" role="status">
            {notice}
          </p>
        ) : null}
      </div>

      <div className="card bl2-inv">
        <b style={{ fontSize: "1.1rem" }}>{copy.invoices}</b>
        <div className="tabs" id="bl2-tabs" style={{ margin: "10px 0 0" }}>
          {(
            [
              ["all", copy.tabAll],
              ["topup", copy.tabTopups],
              ["booking", copy.tabBookings],
            ] as [InvoiceTab, string][]
          ).map(([id, label]) => (
            <button key={id} className={`tab${tab === id ? " on" : ""}`} type="button" onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="st-table">
            <thead>
              <tr>
                <th>{copy.colRef}</th>
                <th>{copy.colDate}</th>
                <th>{copy.colType}</th>
                <th>{copy.colAmount}</th>
                <th>{copy.colStatus}</th>
                <th>{copy.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 18 }}>
                    {emptyCopy}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <b>{row.ref}</b>
                    </td>
                    <td>
                      {new Date(row.at).toLocaleDateString(dateLocale, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>{row.label}</td>
                    <td>
                      <b>{formatBillingMoney(row.amount, locale)}</b>
                    </td>
                    <td>
                      <span className={`bl2-st ${row.status === "paid" ? "bl2-st-paid" : "bl2-st-held"}`}>
                        {row.status === "paid" ? copy.stPaid : row.status}
                      </span>
                    </td>
                    <td>
                      <span className="muted" style={{ fontSize: ".82rem" }}>
                        {copy.demoEntry}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mounted && modalOpen
        ? createPortal(
            <AddBudgetModal
              copy={copy}
              locale={locale}
              balance={balance}
              amount={amount}
              preset={preset}
              custom={custom}
              valid={valid}
              onClose={() => setModalOpen(false)}
              onPick={(value) => {
                setPreset(value);
                setCustom("");
              }}
              onCustom={(value) => {
                setPreset(null);
                setCustom(value);
              }}
              onAdd={addBudget}
            />,
            document.body,
          )
        : null}
    </section>
  );
}

function AddBudgetModal({
  copy,
  locale,
  balance,
  amount,
  preset,
  custom,
  valid,
  onClose,
  onPick,
  onCustom,
  onAdd,
}: {
  copy: BillingCopy;
  locale: Locale;
  balance: number;
  amount: number;
  preset: number | null;
  custom: string;
  valid: boolean;
  onClose: () => void;
  onPick: (value: number) => void;
  onCustom: (value: string) => void;
  onAdd: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const displayAmount = valid ? formatBillingMoney(amount, locale) : formatBillingMoney(0, locale);
  const customOn = preset == null && custom.length > 0;

  return (
    <div className="overlay open" id="modal-money" onClick={onClose}>
      <div
        className="modal bb-money-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bb-money-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bb-money-head">
          <div className="bb-money-head-copy">
            <div className="bb-money-kicker">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{copy.secureBadge}</span>
            </div>
            <h2 id="bb-money-title">{copy.addBudget}</h2>
            <p>{copy.addBudgetSub}</p>
          </div>
          <button type="button" className="bb-money-close" onClick={onClose} aria-label={copy.close}>
            ✕
          </button>
        </div>
        <div className="bb-money-body">
          <div className="bb-money-label">{copy.chooseAmount}</div>
          <div className="bb-chips" role="group" aria-label={copy.chooseAmount}>
            {BILLING_PRESETS.map((value) => (
              <button
                key={value}
                type="button"
                className={`bb-chip${preset === value ? " on" : ""}`}
                onClick={() => onPick(value)}
              >
                {formatBillingMoney(value, "en")}
              </button>
            ))}
          </div>
          <label className={`bb-money-custom${customOn ? " is-on" : ""}`} htmlFor="bb-custom-in">
            <span className="bb-money-custom-cur" aria-hidden="true">
              €
            </span>
            <input
              id="bb-custom-in"
              type="number"
              min={BILLING_MIN}
              step="0.01"
              inputMode="decimal"
              placeholder={copy.customAmount}
              aria-label={copy.customAmount}
              value={custom}
              onChange={(event) => onCustom(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onAdd();
                }
              }}
            />
          </label>
          <div className="bb-money-min">
            {fill(copy.minNote, { min: formatBillingMoney(BILLING_MIN, locale) })}
          </div>
          <div className="bb-money-summary">
            <div>
              <small>{copy.youWillCredit}</small>
              <b>{valid ? displayAmount : "—"}</b>
            </div>
            <div className="bb-money-balance">
              <small>{copy.currentBalance}</small>
              <b>{formatBillingMoney(balance, locale)}</b>
            </div>
          </div>
          <div className="bb-money-trust" aria-label={copy.secureBadge}>
            <div className="bb-money-trust-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              <span>
                <strong>{copy.trustCard}</strong>
                {copy.trustCardBody}
              </span>
            </div>
            <div className="bb-money-trust-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                <strong>{copy.trustNoSub}</strong>
                {copy.trustNoSubBody}
              </span>
            </div>
            <div className="bb-money-trust-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>
                <strong>{copy.trustPay}</strong>
                {copy.trustPayBody}
              </span>
            </div>
          </div>
          <button type="button" className="bb-money-cta" disabled={!valid} onClick={onAdd}>
            {fill(copy.addAmount, { amount: valid ? displayAmount : formatBillingMoney(BILLING_MIN, locale) })}
          </button>
          <div className="bb-money-foot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {copy.foot}
            <div className="bb-demo-foot">{copy.demoNote}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
