"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";
import { LiveMarketplaceCard } from "@/components/creator/onboarding/LiveMarketplaceCard";
import { StepCardDetails } from "@/components/creator/onboarding/StepCardDetails";
import { StepLinkedIn } from "@/components/creator/onboarding/StepLinkedIn";
import { StepPricing } from "@/components/creator/onboarding/StepPricing";
import type { AuthCopy } from "@/lib/i18n/messages";
import type { CreatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";
import type { Locale } from "@/lib/i18n/locale";
import { recommendedPrice, type OnboardingProfile } from "@/lib/creator/onboarding";

export type OnboardingStep = 2 | 3 | 4;

type OnboardingResponse = {
  profile?: OnboardingProfile;
  recommended_price?: number;
  import_ok?: boolean;
  import_paused?: boolean;
  error?: string;
  code?: string;
};

export function CreatorOnboardingShell({
  locale,
  switchLanguage,
  auth,
  copy,
  initialStep,
  initialProfile,
  initialImportPaused,
  recommended,
}: {
  locale: Locale;
  switchLanguage: string;
  auth: AuthCopy;
  copy: CreatorOnboardingCopy;
  initialStep: OnboardingStep;
  initialProfile: OnboardingProfile;
  initialImportPaused: boolean;
  recommended: number;
}) {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>(initialStep);
  const [profile, setProfile] = useState<OnboardingProfile>(initialProfile);
  const [linkedinUrl, setLinkedinUrl] = useState(initialProfile.linkedin_url ?? "");
  const [importPaused, setImportPaused] = useState(initialImportPaused);
  const [price, setPrice] = useState(initialProfile.price_per_post > 0 ? initialProfile.price_per_post : recommended);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function goTo(next: OnboardingStep) {
    setStep(next);
    setError(null);
    router.replace(`/creator/onboarding?step=${next}`, { scroll: false });
  }

  function applyPayload(data: OnboardingResponse) {
    if (data.profile) {
      setProfile(data.profile);
      if (data.recommended_price) {
        setPrice(data.profile.price_per_post > 0 ? data.profile.price_per_post : data.recommended_price);
      }
      if (data.profile.linkedin_url) {
        setLinkedinUrl(data.profile.linkedin_url);
      }
    }
    if (typeof data.import_paused === "boolean") {
      setImportPaused(data.import_paused);
    }
  }

  async function onImport() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/creator/onboarding/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedin_url: linkedinUrl }),
      });
      const data = (await res.json()) as OnboardingResponse;
      applyPayload(data);
      if (res.ok) {
        setImportPaused(false);
        goTo(3);
        return;
      }
      if (data.code === "import_paused" || res.status === 502) {
        setImportPaused(true);
        goTo(3);
        return;
      }
      setError(data.error === "linkedin_url is required" || res.status === 400 ? copy.invalidLinkedInUrl : (data.error ?? copy.invalidLinkedInUrl));
    } catch {
      setImportPaused(true);
      goTo(3);
    } finally {
      setPending(false);
    }
  }

  function onToggleIndustry(tag: string) {
    setProfile((current) => {
      const selected = current.niche_tags.includes(tag);
      const nextTags = selected ? current.niche_tags.filter((item) => tag !== item) : current.niche_tags.length >= 3 ? current.niche_tags : [...current.niche_tags, tag];
      return { ...current, niche_tags: nextTags };
    });
  }

  async function onContinueDetails() {
    if (!profile.country || profile.niche_tags.length < 1) {
      setError(copy.completeRequired);
      return;
    }
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/creator/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: profile.country, niche_tags: profile.niche_tags }),
      });
      const data = (await res.json()) as OnboardingResponse;
      if (!res.ok) {
        setError(data.error ?? copy.completeRequired);
        return;
      }
      applyPayload(data);
      const nextPrice = data.recommended_price ?? recommendedPrice(data.profile?.follower_count ?? profile.follower_count);
      setPrice(nextPrice);
      goTo(4);
    } catch {
      setError(copy.completeRequired);
    } finally {
      setPending(false);
    }
  }

  async function onCreate() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/creator/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: profile.country,
          niche_tags: profile.niche_tags,
          price_per_post: price,
          complete: true,
        }),
      });
      const data = (await res.json()) as OnboardingResponse;
      if (!res.ok) {
        setError(data.error ?? copy.completeRequired);
        return;
      }
      router.push("/creator");
      router.refresh();
    } catch {
      setError(copy.completeRequired);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col bg-white px-8 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="naano" width={96} height={28} className="h-7 w-auto" />
          </Link>
          <LocaleToggle locale={locale} label={switchLanguage} />
        </div>
        <div className="flex flex-1 items-start justify-center overflow-y-auto py-10">
          <div className="w-full max-w-md py-2">
            {step > 2 ? (
              <button type="button" className="mb-6 cursor-pointer text-sm font-medium text-[#6B7280] hover:text-[#111827]" onClick={() => goTo(step === 4 ? 3 : 2)}>
                ← {copy.backToAccount}
              </button>
            ) : (
              <Link href="/" className="mb-6 inline-block text-sm font-medium text-[#6B7280] hover:text-[#111827]">
                ← {copy.backToAccount}
              </Link>
            )}
            {step === 2 ? (
              <StepLinkedIn
                copy={copy}
                url={linkedinUrl}
                pending={pending}
                error={error}
                onUrlChange={setLinkedinUrl}
                onImport={() => void onImport()}
              />
            ) : null}
            {step === 3 ? (
              <StepCardDetails
                copy={copy}
                name={profile.name}
                bio={profile.bio}
                avatarUrl={profile.avatar_url}
                followerCount={profile.follower_count}
                country={profile.country ?? ""}
                industries={profile.niche_tags}
                importPaused={importPaused}
                error={error}
                pending={pending}
                onCountryChange={(value) => setProfile((current) => ({ ...current, country: value || null }))}
                onToggleIndustry={onToggleIndustry}
                onContinue={() => void onContinueDetails()}
                onRetryImport={() => goTo(2)}
              />
            ) : null}
            {step === 4 ? (
              <StepPricing
                copy={copy}
                name={profile.name}
                bio={profile.bio}
                avatarUrl={profile.avatar_url}
                followerCount={profile.follower_count}
                price={price}
                pending={pending}
                error={error}
                onCreate={() => void onCreate()}
                onEditIndustries={() => goTo(3)}
              />
            ) : null}
          </div>
        </div>
      </div>
      <LiveMarketplaceCard
        copy={auth}
        onboarding={copy}
        profile={{ ...profile, price_per_post: step >= 4 ? price : profile.price_per_post }}
      />
    </div>
  );
}
