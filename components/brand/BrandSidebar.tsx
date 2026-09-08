import type { BrandCopy } from "@/lib/i18n/brand";
import type { BrandTab } from "@/components/brand/useBrandTab";

const iconClass = "h-[18px] w-[18px]";

function IconOverview() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconStore() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 9 5 4h14l2 5" />
      <path d="M4 9h16v11H4z" />
      <path d="M9 13h6" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4" />
      <path d="m15.4 6.5-6.8 4" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-8" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6h16v10H8l-4 4V6Z" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

const NAV: { hash: BrandTab; icon: typeof IconOverview; label: keyof BrandCopy }[] = [
  { hash: "overview", icon: IconOverview, label: "overview" },
  { hash: "marketplace", icon: IconStore, label: "marketplace" },
  { hash: "campaigns", icon: IconLayers, label: "campaigns" },
  { hash: "collaborations", icon: IconShare, label: "collaborations" },
  { hash: "results", icon: IconChart, label: "results" },
  { hash: "messages", icon: IconMessage, label: "messages" },
  { hash: "billing", icon: IconCard, label: "billing" },
];

export function BrandSidebar({ tab, copy }: { tab: BrandTab; copy: BrandCopy }) {
  return (
    <aside className="flex h-screen w-[72px] shrink-0 flex-col items-center border-r border-[#EEF0F3] bg-white py-4">
      <a href="/" className="flex h-9 w-9 items-center justify-center">
        <img src="/logo.svg" alt="naano" className="h-7 w-7 object-left object-contain" />
      </a>
      <nav className="mt-6 flex flex-1 flex-col items-center gap-1">
        {NAV.map((item) => {
          const active = tab === item.hash || (item.hash === "campaigns" && tab === "campaign-new");
          const Icon = item.icon;
          return (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              title={copy[item.label]}
              aria-label={copy[item.label]}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                active ? "bg-[#E8F0FE] text-[#2563eb]" : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
              }`}
            >
              <Icon />
            </a>
          );
        })}
      </nav>
      <a
        href="#integrations"
        title={copy.integrations}
        aria-label={copy.integrations}
        aria-current={tab === "integrations" ? "page" : undefined}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          tab === "integrations" ? "bg-[#E8F0FE] text-[#2563eb]" : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
        }`}
      >
        <IconGrid />
      </a>
    </aside>
  );
}
