import { MarketingShell } from "@/components/layout/MarketingShell";
import { LeadForm } from "@/components/leads/LeadForm";

// Copy cross-referenced from naano.com/llms.txt ("Free LinkedIn creator
// search") and free-tools.html — /selection itself was not in the source
// scrape (client-only route), so the surrounding page chrome is still
// unstyled pending real HTML/CSS for this page specifically.
export default function SelectionPage() {
  return (
    <MarketingShell>
    <section className="mx-auto max-w-[1504px] px-6 py-24">
      <p className="text-sm tracking-wide text-muted uppercase">Free · 48h turnaround · No account needed</p>
      <h1 className="font-heading text-4xl text-ink">Free LinkedIn creator search</h1>
      <p className="mt-2 max-w-2xl text-copy">
        Describe the campaign you want to launch and a real person at Naano finds every LinkedIn creator
        genuinely worth contacting. You get names, pricing, and audience fit within 48 hours. Free, no account
        required, no commitment.
      </p>
      <div className="mt-8 max-w-xl">
        <LeadForm />
      </div>
    </section>
    </MarketingShell>
  );
}
