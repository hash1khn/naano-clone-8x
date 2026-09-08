import type { Locale } from "@/lib/i18n/locale";

export type CreatorOnboardingCopy = {
  step2Of4: string;
  step3Of4: string;
  step4Of4: string;
  addLinkedInTitle: string;
  addLinkedInBody: string;
  linkedInUrlLabel: string;
  linkedInUrlPlaceholder: string;
  importAuthorize: string;
  importProfile: string;
  importing: string;
  invalidLinkedInUrl: string;
  completeCardTitle: string;
  importPausedTitle: string;
  importPausedRetry: string;
  countryLabel: string;
  countryHint: string;
  industriesLabel: string;
  industriesHint: string;
  continue: string;
  editIndustries: string;
  recommendationLabel: string;
  recommendationBody: string;
  perPost: string;
  recommendationNote: string;
  createProfile: string;
  creatingProfile: string;
  addBundle: string;
  backToAccount: string;
  potentialCost: string;
  followersLabel: string;
  completeRequired: string;
};

const en: CreatorOnboardingCopy = {
  step2Of4: "Step 2 of 4",
  step3Of4: "Step 3 of 4",
  step4Of4: "Step 4 of 4",
  addLinkedInTitle: "Add your public LinkedIn profile",
  addLinkedInBody:
    "No extension is needed. We'll retrieve only the minimum public information required to create your Basic card.",
  linkedInUrlLabel: "Public LinkedIn profile URL",
  linkedInUrlPlaceholder: "https://www.linkedin.com/in/you",
  importAuthorize:
    "By clicking below, you authorize Naano to read your public profile once: name, photo, headline, country and follower count. We do not import your posts, engagement or private analytics.",
  importProfile: "Import my public profile",
  importing: "Importing your profile…",
  invalidLinkedInUrl: "Enter a public LinkedIn profile URL (linkedin.com/in/…).",
  completeCardTitle: "Complete your creator card",
  importPausedTitle: "LinkedIn import is temporarily paused. You can continue with a Basic card.",
  importPausedRetry: "Check the URL and try again.",
  countryLabel: "Your country",
  countryHint: "Confirm your country before continuing.",
  industriesLabel: "Your industries (pick up to 3)",
  industriesHint: "Choose up to 3 industries to help relevant brands find your card.",
  continue: "Continue",
  editIndustries: "Edit my industries",
  recommendationLabel: "Our recommendation",
  recommendationBody:
    "Naano recommends this starting price from the public audience and performance information currently available. You can change it now or later.",
  perPost: "/ post",
  recommendationNote: "This is your net price per post. You can change it at any time from your Naano profile.",
  createProfile: "Create my marketplace profile",
  creatingProfile: "Creating your profile…",
  addBundle: "Add a bundle (optional)",
  backToAccount: "Back to my account",
  potentialCost: "Potential cost",
  followersLabel: "followers",
  completeRequired: "Choose a country and at least one industry to continue.",
};

const fr: CreatorOnboardingCopy = {
  step2Of4: "Étape 2 sur 4",
  step3Of4: "Étape 3 sur 4",
  step4Of4: "Étape 4 sur 4",
  addLinkedInTitle: "Ajoutez votre profil LinkedIn public",
  addLinkedInBody:
    "Aucune extension n'est nécessaire. Nous récupérons uniquement les informations publiques minimales pour créer votre carte Basic.",
  linkedInUrlLabel: "URL de profil LinkedIn public",
  linkedInUrlPlaceholder: "https://www.linkedin.com/in/vous",
  importAuthorize:
    "En cliquant ci-dessous, vous autorisez Naano à lire votre profil public une fois : nom, photo, titre, pays et nombre d'abonnés. Nous n'importons pas vos posts, votre engagement ni vos analytics privés.",
  importProfile: "Importer mon profil public",
  importing: "Import du profil…",
  invalidLinkedInUrl: "Entrez une URL de profil LinkedIn public (linkedin.com/in/…).",
  completeCardTitle: "Complétez votre carte créateur",
  importPausedTitle: "L'import LinkedIn est temporairement en pause. Vous pouvez continuer avec une carte Basic.",
  importPausedRetry: "Vérifiez l'URL et réessayez.",
  countryLabel: "Votre pays",
  countryHint: "Confirmez votre pays avant de continuer.",
  industriesLabel: "Vos industries (jusqu'à 3)",
  industriesHint: "Choisissez jusqu'à 3 industries pour aider les marques pertinentes à trouver votre carte.",
  continue: "Continuer",
  editIndustries: "Modifier mes industries",
  recommendationLabel: "Notre recommandation",
  recommendationBody:
    "Naano recommande ce tarif de départ à partir des informations publiques d'audience et de performance disponibles. Vous pouvez le modifier maintenant ou plus tard.",
  perPost: "/ post",
  recommendationNote: "C'est votre tarif net par post. Vous pouvez le modifier à tout moment depuis votre profil Naano.",
  createProfile: "Créer mon profil marketplace",
  creatingProfile: "Création du profil…",
  addBundle: "Ajouter un bundle (optionnel)",
  backToAccount: "Retour à mon compte",
  potentialCost: "Coût potentiel",
  followersLabel: "abonnés",
  completeRequired: "Choisissez un pays et au moins une industrie pour continuer.",
};

export const creatorOnboardingCopy: Record<Locale, CreatorOnboardingCopy> = { en, fr };
