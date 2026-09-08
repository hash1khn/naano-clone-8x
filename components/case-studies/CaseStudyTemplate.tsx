export type CaseStudyTemplateProps = {
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export function CaseStudyTemplate({ title, summary, sections }: CaseStudyTemplateProps) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p>{summary}</p>
      </header>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}
    </article>
  );
}
