export const EARNINGS_DEMO_KEY = "naano.earnings.demo";
export const EARNINGS_DEMO_EVENT = "naano:earnings-demo";
export const EARNINGS_MIN_WITHDRAW = 100;

export type PayoutMethod = "bank" | "stripe";

export type DemoBankDetails = {
  accountHolder: string;
  iban: string;
};

export type DemoEarningsState = {
  totalEarned: number;
  inTransit: number;
  available: number;
  paidCollaborations: number;
  monthly: number[];
  method: PayoutMethod;
  bank: DemoBankDetails;
  stripeConnected: boolean;
};

const EMPTY_MONTHS = [0, 0, 0, 0, 0, 0];

const EMPTY: DemoEarningsState = {
  totalEarned: 0,
  inTransit: 0,
  available: 0,
  paidCollaborations: 0,
  monthly: EMPTY_MONTHS,
  method: "stripe",
  bank: { accountHolder: "", iban: "" },
  stripeConnected: false,
};

export function formatEarningsMoney(amount: number, locale: string, fractionDigits?: number): string {
  const digits = fractionDigits ?? (Number.isInteger(amount) ? 0 : 2);
  const number = amount.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return locale === "fr" ? `${number} €` : `€${number}`;
}

export function formatEarningsBalance(amount: number, locale: string): string {
  return formatEarningsMoney(amount, locale, 2);
}

function parseState(raw: string | null): DemoEarningsState {
  if (!raw) {
    return { ...EMPTY, monthly: [...EMPTY_MONTHS], bank: { ...EMPTY.bank } };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DemoEarningsState>;
    const num = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : 0);
    const monthly = Array.isArray(parsed.monthly)
      ? parsed.monthly.map((n) => (typeof n === "number" && Number.isFinite(n) ? n : 0)).slice(0, 6)
      : [...EMPTY_MONTHS];
    while (monthly.length < 6) {
      monthly.push(0);
    }
    const bank =
      parsed.bank && typeof parsed.bank === "object"
        ? {
            accountHolder: typeof parsed.bank.accountHolder === "string" ? parsed.bank.accountHolder : "",
            iban: typeof parsed.bank.iban === "string" ? parsed.bank.iban : "",
          }
        : { ...EMPTY.bank };
    return {
      totalEarned: num(parsed.totalEarned),
      inTransit: num(parsed.inTransit),
      available: num(parsed.available),
      paidCollaborations: num(parsed.paidCollaborations),
      monthly,
      method: parsed.method === "bank" || parsed.method === "stripe" ? parsed.method : "stripe",
      bank,
      stripeConnected: Boolean(parsed.stripeConnected),
    };
  } catch {
    return { ...EMPTY, monthly: [...EMPTY_MONTHS], bank: { ...EMPTY.bank } };
  }
}

export function readDemoEarnings(): DemoEarningsState {
  if (typeof window === "undefined") {
    return { ...EMPTY, monthly: [...EMPTY_MONTHS], bank: { ...EMPTY.bank } };
  }
  try {
    return parseState(localStorage.getItem(EARNINGS_DEMO_KEY));
  } catch {
    return { ...EMPTY, monthly: [...EMPTY_MONTHS], bank: { ...EMPTY.bank } };
  }
}

function writeDemoEarnings(state: DemoEarningsState) {
  try {
    localStorage.setItem(EARNINGS_DEMO_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
  window.dispatchEvent(new CustomEvent(EARNINGS_DEMO_EVENT));
}

export function subscribeDemoEarnings(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === EARNINGS_DEMO_KEY || event.key === null) {
      listener();
    }
  };
  window.addEventListener(EARNINGS_DEMO_EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EARNINGS_DEMO_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveDemoEarnings(patch: Partial<DemoEarningsState>): DemoEarningsState {
  const next = { ...readDemoEarnings(), ...patch };
  if (patch.bank) {
    next.bank = { ...readDemoEarnings().bank, ...patch.bank };
  }
  if (patch.monthly) {
    next.monthly = [...patch.monthly];
  }
  writeDemoEarnings(next);
  return next;
}

export function lastSixMonthLabels(locale: string, now = new Date()): string[] {
  const fmt = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { month: "short" });
  const labels: string[] = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const raw = fmt.format(d);
    labels.push(raw.replace(/\.$/, ""));
  }
  return labels;
}

export function hasBankDetails(bank: DemoBankDetails): boolean {
  return Boolean(bank.accountHolder.trim() && bank.iban.trim());
}
