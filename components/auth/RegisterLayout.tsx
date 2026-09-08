import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import type { Locale } from "@/lib/i18n/locale";

export function RegisterLayout({
  locale,
  switchLanguage,
  children,
  panel,
}: {
  locale: Locale;
  switchLanguage: string;
  children: ReactNode;
  panel: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col bg-white px-8 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="naano" width={96} height={28} className="h-7 w-auto" />
          </Link>
          <LocaleToggle locale={locale} label={switchLanguage} />
        </div>
        <div className="flex flex-1 items-start justify-center overflow-y-auto py-10 lg:items-center">
          <div className="w-full max-w-md py-2">{children}</div>
        </div>
      </div>
      {panel}
    </div>
  );
}
