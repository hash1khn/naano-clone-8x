import type { CreatorCopy } from "@/lib/i18n/creator";

export function CreatorEmptyPanel({ title, copy }: { title: string; copy: CreatorCopy }) {
  return (
    <section className="page visible">
      <div className="page-head">
        <h1>{title}</h1>
      </div>
      <p className="page-lead" style={{ marginTop: 12, opacity: 0.7 }}>
        {copy.comingSoon}
      </p>
    </section>
  );
}
