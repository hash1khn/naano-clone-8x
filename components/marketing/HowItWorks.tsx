export type HowItWorksProps = {
  steps: { title: string; description: string }[];
};

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section>
      <h2>How it works</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <h3>
              {index + 1}. {step.title}
            </h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
