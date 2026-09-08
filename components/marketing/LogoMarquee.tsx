export type LogoMarqueeProps = {
  logos: { name: string; src?: string }[];
};

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
    <section>
      <h2>Logos</h2>
      <ul className="flex flex-wrap">
        {logos.map((logo) => (
          <li key={logo.name}>
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.src} alt={logo.name} />
            ) : (
              <span>{logo.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
