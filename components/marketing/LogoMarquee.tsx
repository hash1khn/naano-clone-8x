import Image from "next/image";

export type LogoMarqueeProps = {
  caption?: string;
  logos: { name: string; src?: string }[];
};

export function LogoMarquee({ caption, logos }: LogoMarqueeProps) {
  return (
    <section className="mx-auto max-w-[1504px] px-6 py-10">
      {caption ? <p className="mb-6 text-sm tracking-wide text-muted uppercase">{caption}</p> : null}
      <ul className="flex flex-wrap items-center gap-10">
        {logos.map((logo) => (
          <li key={logo.name} className="flex items-center">
            {logo.src ? (
              <Image src={logo.src} alt={logo.name} width={120} height={32} className="h-8 w-auto object-contain" />
            ) : (
              <span className="text-copy">{logo.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
