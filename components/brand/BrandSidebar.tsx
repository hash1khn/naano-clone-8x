import type { BrandCopy } from "@/lib/i18n/brand";
import type { BrandTab } from "@/components/brand/useBrandTab";

function NavIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const NAV: { hash: BrandTab; label: keyof BrandCopy; d: string }[] = [
  { hash: "overview", label: "overview", d: "M4 4h7v9H4zM13 4h7v5h-7zM13 12h7v8h-7zM4 16h7v4H4z" },
  { hash: "marketplace", label: "marketplace", d: "M3 9 5 4h14l2 5M4 9h16v11H4zM9 13h6" },
  { hash: "campaigns", label: "campaigns", d: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" },
  { hash: "collaborations", label: "collaborations", d: "M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 20a6 6 0 0 1 16 0M18 8a3 3 0 1 0 0-6" },
  { hash: "results", label: "results", d: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16V7" },
  { hash: "messages", label: "messages", d: "M4 6h16v10H8l-4 4V6Z" },
  { hash: "billing", label: "billing", d: "M3 6h18v12H3zM3 10h18" },
];

export function BrandSidebar({ tab, copy, workspace }: { tab: BrandTab; copy: BrandCopy; workspace: string }) {
  return (
    <aside className="sidebar" id="platform-sidebar">
      <div className="sb-head">
        <a className="logo" href="/">
          <img src="/lp/naano-logomark.png" alt="" style={{ height: 26, width: "auto", display: "block" }} />
          <span className="logo-word">naano</span>
        </a>
        <button className="ov3-pill" type="button" id="nn-ws-pill">
          <span id="nn-ws-name">{workspace}</span>
        </button>
      </div>
      <nav className="nav">
        {NAV.map((item) => {
          const active = tab === item.hash || (item.hash === "campaigns" && tab === "campaign-new");
          return (
            <a
              key={item.hash}
              className={`nav-item${active ? " active" : ""}`}
              href={`#${item.hash}`}
              data-page={item.hash}
            >
              <NavIcon d={item.d} />
              <span>{copy[item.label]}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
