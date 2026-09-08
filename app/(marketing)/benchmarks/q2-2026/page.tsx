import { MarketingShell } from "@/components/layout/MarketingShell";

export default function BenchmarksQ2Page() {
  return (
    <MarketingShell>
    <article className="mx-auto max-w-[1504px] px-6 py-24">
      <p className="text-sm tracking-wide text-muted uppercase">First-party data</p>
      <h1 className="font-heading text-4xl text-ink">Q2 2026 B2B Creator-Led Growth Benchmarks</h1>
      <p className="mt-2 max-w-2xl text-copy">
        CPL, CTR and conversion benchmarks from 312 B2B creator campaigns and 1,847 sponsored posts measured in
        Q1 2026, with per-vertical medians, full methodology, sample sizes and limitations.
      </p>
      {/* Full report content not available in the source scrape — gated/detailed dataset to follow. */}
      <p className="mt-6 text-sm text-muted">n=312 campaigns · 1,847 posts · Q1 2026 data</p>
    </article>
    </MarketingShell>
  );
}
