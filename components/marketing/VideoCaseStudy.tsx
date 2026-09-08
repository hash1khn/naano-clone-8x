import Image from "next/image";
import Link from "next/link";

export type VideoCaseStudyProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  video: {
    posterSrc: string;
    duration: string;
    quote: string;
    author: string;
    role: string;
  };
  caseStudy?: {
    label: string;
    title: string;
    description: string;
    stats: { label: string; value: string }[];
    href: string;
  };
};

export function VideoCaseStudy({ eyebrow, heading, description, video, caseStudy }: VideoCaseStudyProps) {
  return (
    <section className="mx-auto max-w-[1504px] px-6 py-16">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      {heading ? <h2 className="font-heading text-3xl text-ink">{heading}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-copy">{description}</p> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <figure className="relative">
          <Image
            src={video.posterSrc}
            alt={`Video testimonial from ${video.author}`}
            width={720}
            height={480}
            className="w-full rounded-2xl object-cover"
          />
          <figcaption className="mt-4">
            <span className="text-sm text-muted">Video testimonial · {video.duration}</span>
            <blockquote className="mt-2">
              <p className="text-lg text-ink">&ldquo;{video.quote}&rdquo;</p>
              <footer className="mt-2 text-copy">
                <cite>{video.author}</cite> — {video.role}
              </footer>
            </blockquote>
          </figcaption>
        </figure>

        {caseStudy ? (
          <article className="flex flex-col gap-4 rounded-2xl border border-ink/10 p-8">
            <span className="text-sm tracking-wide text-muted uppercase">{caseStudy.label}</span>
            <h3 className="font-heading text-2xl text-ink">{caseStudy.title}</h3>
            <p className="text-copy">{caseStudy.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {caseStudy.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl text-ink">{stat.value}</p>
                  <p className="text-sm text-copy">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link href={caseStudy.href} className="text-blue">
              Read case study →
            </Link>
          </article>
        ) : null}
      </div>
    </section>
  );
}
