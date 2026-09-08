import type { Metadata } from "next";
import { GFS_Didot, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Fonts matched to the real naano.com production build (Inter, Plus Jakarta
// Sans, GFS Didot — see compiled CSS chunk 1fxt04qdho09-.css).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const gfsDidot = GFS_Didot({
  variable: "--font-didot",
  weight: "400",
  subsets: ["greek"],
});

export const metadata: Metadata = {
  title: "Naano: B2B LinkedIn Creator Marketplace",
  description:
    "The B2B LinkedIn creator marketplace: companies discover and book vetted LinkedIn creators for sponsored posts at fixed per-post prices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${gfsDidot.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
