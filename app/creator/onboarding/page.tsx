import { CreatorOnboardingShell, type OnboardingStep } from "@/components/creator/onboarding/CreatorOnboardingShell";
import { ensureCreatorProfile } from "@/lib/auth/oauth";
import { requireCreatorUser } from "@/lib/auth/session";
import { isCreatorOnboardingComplete, isImportPaused, recommendedPrice } from "@/lib/creator/onboarding";
import { getCreatorProfile } from "@/lib/creator/require-onboarding";
import { creatorOnboardingCopy } from "@/lib/i18n/creator-onboarding";
import { getRequestLocale } from "@/lib/i18n/locale";
import { authCopy, chromeCopy } from "@/lib/i18n/messages";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function parseStep(value: string | undefined): OnboardingStep {
  if (value === "3") {
    return 3;
  }
  if (value === "4") {
    return 4;
  }
  return 2;
}

export default async function CreatorOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string | string[] }>;
}) {
  const user = await requireCreatorUser();
  let profile = await getCreatorProfile(user.id);
  if (!profile) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (authUser) {
      await ensureCreatorProfile(authUser);
      profile = await getCreatorProfile(user.id);
    }
  }
  if (!profile) {
    redirect("/login?reauth=1");
  }
  if (isCreatorOnboardingComplete(profile)) {
    redirect("/creator");
  }

  const query = await searchParams;
  const stepParam = query.step;
  let step = parseStep(typeof stepParam === "string" ? stepParam : undefined);
  if ((step === 3 || step === 4) && !profile.linkedin_url) {
    step = 2;
  }
  if (step === 4 && (!profile.country || profile.niche_tags.length < 1)) {
    step = 3;
  }

  const locale = await getRequestLocale();

  return (
    <CreatorOnboardingShell
      locale={locale}
      switchLanguage={chromeCopy[locale].switchLanguage}
      auth={authCopy[locale]}
      copy={creatorOnboardingCopy[locale]}
      initialStep={step}
      initialProfile={profile}
      initialImportPaused={isImportPaused(profile)}
      recommended={recommendedPrice(profile.follower_count)}
    />
  );
}
