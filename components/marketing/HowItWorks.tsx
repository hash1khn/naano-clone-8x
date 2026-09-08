export type HowItWorksProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  steps: { title: string; description: string }[];
};

export function HowItWorks({ eyebrow, heading, description, steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1504px] px-6 py-16">
      {eyebrow ? <p className="text-sm tracking-wide text-muted uppercase">{eyebrow}</p> : null}
      {heading ? <h2 className="font-heading text-3xl text-ink">{heading}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-copy">{description}</p> : null}
      <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2">
            <span className="text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-heading text-lg text-ink">{step.title}</h3>
            <p className="text-copy">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
