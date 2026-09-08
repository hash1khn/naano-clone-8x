"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/locale";

export function ScrapedHydrator({ html, locale }: { html: string; locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-qw]"));
    words.forEach((word, index) => {
      word.style.opacity = "0.14";
      window.setTimeout(() => {
        word.style.opacity = "1";
      }, 80 * index);
    });

    const revealTargets = root.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-self], [data-reveal-kids]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    revealTargets.forEach((el) => {
      el.style.opacity = el.style.opacity || "0";
      el.style.transform = el.style.transform || "translateY(18px)";
      el.style.transition = el.style.transition || "opacity 0.6s ease, transform 0.7s cubic-bezier(.22,.61,.36,1)";
      observer.observe(el);
    });

    const playButtons = Array.from(root.querySelectorAll<HTMLButtonElement>(".lp-proof-video button, .lp-proof-card--video button"));
    const onPlay = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const video = button.parentElement?.querySelector("video");
      if (!video) {
        return;
      }
      if (video.paused) {
        void video.play();
        button.style.display = "none";
      }
    };
    playButtons.forEach((button) => button.addEventListener("click", onPlay));

    const localeButtons = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-locale-toggle], button[aria-label='Switch language'], button[aria-label='Changer de langue']"),
    );
    const nextLocale: Locale = locale === "en" ? "fr" : "en";
    const onLocaleClick = (event: Event) => {
      event.preventDefault();
      const button = event.currentTarget as HTMLButtonElement;
      if (button.disabled) {
        return;
      }
      button.disabled = true;
      void fetch(`/api/locale?locale=${nextLocale}`, { method: "POST" }).then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          button.disabled = false;
        }
      });
    };
    localeButtons.forEach((button) => button.addEventListener("click", onLocaleClick));

    return () => {
      observer.disconnect();
      playButtons.forEach((button) => button.removeEventListener("click", onPlay));
      localeButtons.forEach((button) => button.removeEventListener("click", onLocaleClick));
    };
  }, [html, locale, router]);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
