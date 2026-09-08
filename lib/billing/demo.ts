export const BILLING_DEMO_KEY = "naano.billing.demo";
export const BILLING_DEMO_EVENT = "naano:billing-demo";
export const BILLING_MIN = 500;
export const BILLING_PRESETS = [2500, 5000, 10000, 25000] as const;

export type DemoInvoiceType = "topup" | "booking";

export type DemoInvoice = {
  id: string;
  ref: string;
  at: string;
  type: DemoInvoiceType;
  label: string;
  amount: number;
  status: "paid" | "held";
};

export type DemoBillingState = {
  balance: number;
  invoices: DemoInvoice[];
};

const EMPTY: DemoBillingState = { balance: 0, invoices: [] };

export function formatBillingMoney(amount: number, locale: string, fractionDigits?: number): string {
  const digits = fractionDigits ?? (Number.isInteger(amount) ? 0 : 2);
  const number = amount.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return locale === "fr" ? `${number} €` : `€${number}`;
}

export function formatBillingBalance(amount: number, locale: string): string {
  return formatBillingMoney(amount, locale, 2);
}

function parseState(raw: string | null): DemoBillingState {
  if (!raw) {
    return { ...EMPTY, invoices: [] };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DemoBillingState>;
    const balance = typeof parsed.balance === "number" && Number.isFinite(parsed.balance) ? parsed.balance : 0;
    const invoices = Array.isArray(parsed.invoices)
      ? parsed.invoices.filter(
          (row): row is DemoInvoice =>
            Boolean(row) &&
            typeof row === "object" &&
            typeof row.id === "string" &&
            typeof row.ref === "string" &&
            typeof row.at === "string" &&
            (row.type === "topup" || row.type === "booking") &&
            typeof row.label === "string" &&
            typeof row.amount === "number",
        )
      : [];
    return { balance, invoices };
  } catch {
    return { ...EMPTY, invoices: [] };
  }
}

export function readDemoBilling(): DemoBillingState {
  if (typeof window === "undefined") {
    return { ...EMPTY, invoices: [] };
  }
  try {
    return parseState(localStorage.getItem(BILLING_DEMO_KEY));
  } catch {
    return { ...EMPTY, invoices: [] };
  }
}

function writeDemoBilling(state: DemoBillingState) {
  try {
    localStorage.setItem(BILLING_DEMO_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
  window.dispatchEvent(new Event(BILLING_DEMO_EVENT));
}

export function creditDemoTopup(amount: number, label: string): DemoBillingState {
  const nextAmount = Math.max(BILLING_MIN, Math.round(amount * 100) / 100);
  const current = readDemoBilling();
  const stamp = new Date();
  const row: DemoInvoice = {
    id: crypto.randomUUID(),
    ref: `DEMO-${stamp.getFullYear()}-${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${stamp.getTime().toString(36).toUpperCase()}`,
    at: stamp.toISOString(),
    type: "topup",
    label,
    amount: nextAmount,
    status: "paid",
  };
  const next = { balance: current.balance + nextAmount, invoices: [row, ...current.invoices] };
  writeDemoBilling(next);
  return next;
}

export function subscribeDemoBilling(onChange: () => void): () => void {
  function handle() {
    onChange();
  }
  window.addEventListener(BILLING_DEMO_EVENT, handle);
  window.addEventListener("storage", handle);
  return () => {
    window.removeEventListener(BILLING_DEMO_EVENT, handle);
    window.removeEventListener("storage", handle);
  };
}
