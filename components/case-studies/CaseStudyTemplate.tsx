import Link from "next/link";

export type CaseStudySection = {
  number: string;
  heading: string;
  body: string[];
  stats?: { label: string; value: string }[];
};

export type CaseStudyTemplateProps = {
  tag: string;
  title: string;
  summary: string;
  client: { name: string; role: string };
  heroStats: { label: string; value: string }[];
  sections: CaseStudySection[];
  testimonial: { quote: string; author: string; role: string };
  cta: { heading: string; description: string; label: string; href: string };
};

export function CaseStudyTemplate({
  tag,
  title,
  summary,
  client,
  heroStats,
  sections,
  testimonial,
  cta,
}: CaseStudyTemplateProps) {
  return (
    <article className="mx-auto max-w-[1504px] px-6 py-16">
      <header>
        <p className="text-sm tracking-wide text-muted uppercase">{tag}</p>
        <h1 className="font-heading text-4xl text-ink">{title}</h1>
        <p className="mt-2 max-w-2xl text-copy">{summary}</p>
        <p className="mt-4 text-sm text-muted">
          {client.name} · {client.role}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading text-2xl text-ink">{stat.value}</p>
            <p className="text-sm text-copy">{stat.label}</p>
          </div>
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <span className="text-sm text-muted">{section.number}</span>
          <h2 className="font-heading text-2xl text-ink">{section.heading}</h2>
          <div className="mt-2 flex flex-col gap-3">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-copy">
                {paragraph}
              </p>
            ))}
          </div>
          {section.stats ? (
            <div className="mt-4 flex flex-wrap gap-6">
              {section.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-xl text-ink">{stat.value}</p>
                  <p className="text-sm text-copy">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <blockquote className="mt-12 border-l-2 border-ink/15 pl-4">
        <p className="text-lg text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
        <footer className="mt-2 text-copy">
          <cite>{testimonial.author}</cite> — {testimonial.role}
        </footer>
      </blockquote>

      <section className="mt-16">
        <h2 className="font-heading text-3xl text-ink">{cta.heading}</h2>
        <p className="mt-2 max-w-2xl text-copy">{cta.description}</p>
        <Link href={cta.href} className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-paper">
          {cta.label}
        </Link>
      </section>
    </article>
  );
}
