import { notFound } from "next/navigation";
import { CalculatorForm } from "@/components/free-tools/CalculatorForm";
import { FREE_TOOLS, isFreeToolSlug } from "@/lib/marketing/placeholder";

export function generateStaticParams() {
  return FREE_TOOLS.map((tool) => ({ tool: tool.slug }));
}

export default async function FreeToolPage({ params }: PageProps<"/free-tools/[tool]">) {
  const { tool } = await params;

  if (!isFreeToolSlug(tool)) {
    notFound();
  }

  const current = FREE_TOOLS.find((item) => item.slug === tool);

  return (
    <section>
      <h1>{current?.name ?? tool}</h1>
      <CalculatorForm />
    </section>
  );
}
